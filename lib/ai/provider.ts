/**
 * AI Model Provider Abstraction
 *
 * Switch providers by changing AI_MODEL_PROVIDER (or AI_PROVIDER) in .env.local:
 *   AI_MODEL_PROVIDER=gemini   → Google Gemini (default)
 *   AI_MODEL_PROVIDER=anthropic → Anthropic Claude
 *   AI_MODEL_PROVIDER=openai    → OpenAI GPT
 *
 * Each provider reads its own API key and model from env vars.
 */

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  systemPrompt: string
  messages: ChatMessage[]
  /** The new user message (not yet in messages array) */
  userMessage: string
}

export interface AIProvider {
  chat(request: ChatRequest): Promise<string>
  chatStream(request: ChatRequest): ReadableStream<string>
}

// ─── Gemini ──────────────────────────────────────────────────────────────────

async function geminiChat(request: ChatRequest): Promise<string> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai')

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

  const model = process.env.AI_MODEL || 'gemini-2.5-flash'
  const genAI = new GoogleGenerativeAI(apiKey)
  const gemini = genAI.getGenerativeModel({
    model,
    systemInstruction: request.systemPrompt,
  })

  const history = request.messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' as const : 'user' as const,
    parts: [{ text: m.content }],
  }))

  const chat = gemini.startChat({ history })
  const result = await chat.sendMessage(request.userMessage)
  const text = result.response.text()

  if (!text) throw new Error('Empty response from Gemini')
  return text
}

function geminiChatStream(request: ChatRequest): ReadableStream<string> {
  return new ReadableStream<string>({
    async start(controller) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

        const model = process.env.AI_MODEL || 'gemini-2.5-flash'
        const genAI = new GoogleGenerativeAI(apiKey)
        const gemini = genAI.getGenerativeModel({
          model,
          systemInstruction: request.systemPrompt,
        })

        const history = request.messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' as const : 'user' as const,
          parts: [{ text: m.content }],
        }))

        const chat = gemini.startChat({ history })
        const result = await chat.sendMessageStream(request.userMessage)

        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) controller.enqueue(text)
        }
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })
}

// ─── Anthropic ───────────────────────────────────────────────────────────────

async function anthropicChat(request: ChatRequest): Promise<string> {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')

  const model = process.env.AI_MODEL || 'claude-haiku-4-5-20251001'
  const client = new Anthropic({ apiKey })

  const messages = [
    ...request.messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user' as const, content: request.userMessage },
  ]

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system: request.systemPrompt,
    messages,
  })

  const block = response.content[0]
  if (block.type !== 'text' || !block.text) {
    throw new Error('Empty response from Anthropic')
  }
  return block.text
}

// ─── OpenAI ──────────────────────────────────────────────────────────────────

async function openaiChat(request: ChatRequest): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set')

  const model = process.env.AI_MODEL || 'gpt-4o-mini'

  const messages = [
    { role: 'system' as const, content: request.systemPrompt },
    ...request.messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user' as const, content: request.userMessage },
  ]

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: 1024 }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenAI API error: ${res.status} ${err}`)
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[]
  }
  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('Empty response from OpenAI')
  return text
}

// ─── Non-streaming wrapper ──────────────────────────────────────────────────

/** Wraps a non-streaming chat function as a ReadableStream (single chunk). */
function wrapNonStreaming(
  chatFn: (req: ChatRequest) => Promise<string>
): (req: ChatRequest) => ReadableStream<string> {
  return (request: ChatRequest) =>
    new ReadableStream<string>({
      async start(controller) {
        try {
          const text = await chatFn(request)
          controller.enqueue(text)
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })
}

// ─── Provider Registry ───────────────────────────────────────────────────────

const providers: Record<string, {
  chat: (req: ChatRequest) => Promise<string>
  chatStream: (req: ChatRequest) => ReadableStream<string>
}> = {
  gemini: { chat: geminiChat, chatStream: geminiChatStream },
  anthropic: { chat: anthropicChat, chatStream: wrapNonStreaming(anthropicChat) },
  openai: { chat: openaiChat, chatStream: wrapNonStreaming(openaiChat) },
}

export function getProvider(): AIProvider {
  const name = (process.env.AI_MODEL_PROVIDER || process.env.AI_PROVIDER || 'gemini').toLowerCase()
  const provider = providers[name]
  if (!provider) {
    throw new Error(
      `Unknown AI_MODEL_PROVIDER "${name}". Supported: ${Object.keys(providers).join(', ')}`
    )
  }
  return provider
}
