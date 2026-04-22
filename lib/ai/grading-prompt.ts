/**
 * AI Grading prompt builder for The Gospel Academy.
 *
 * Generates system prompts that instruct the AI to evaluate student responses
 * against a rubric and return structured JSON grades.
 */

import type { RubricDimension } from '@/lib/types/curriculum'
import type { FormativeQuestion, AssessmentSubType } from '@/lib/types/assessment'

// ─── Formative / Baseline / Midpoint grading prompt ────────────────────────

export function buildFormativeGradingPrompt(
  questions: FormativeQuestion[],
  studentResponses: { questionId: string; answer: string }[],
  subType: AssessmentSubType
): string {
  const questionsText = questions.map((q, i) => {
    const response = studentResponses.find(r => r.questionId === q.id)
    return `QUESTION ${i + 1} (ID: ${q.id}, ${q.pointsPossible} points):
Prompt: ${q.prompt}
Expected answer/key concepts: ${q.answerKey}
Student's answer: ${response?.answer ?? '(no response)'}
`
  }).join('\n')

  return `You are a fair and encouraging grading assistant for The Gospel Academy, a Christian online school for grades 6–9.

You are grading a ${subType} assessment. Evaluate each student response against the expected answer.

${questionsText}

GRADING RULES:
1. Award points based on conceptual understanding, not exact wording.
2. Partial credit is allowed. Award points proportionally.
3. For ${subType === 'baseline' ? 'baseline assessments, be generous — this measures starting knowledge, not mastery' : subType === 'midpoint' ? 'midpoint checks, look for growth since baseline' : 'formative checks, focus on whether the student grasps the core concept'}.
4. Be encouraging in feedback — these are middle school students.
5. If a student's answer shows understanding but uses different terminology, give full credit.

Respond with ONLY valid JSON in this exact format:
{
  "questionScores": [
    {
      "questionId": "string",
      "score": number,
      "feedback": "brief feedback string",
      "correct": boolean
    }
  ],
  "overallScore": number,
  "feedback": "2-3 sentence overall feedback",
  "strengths": ["strength 1", "strength 2"],
  "growthAreas": ["area 1"]
}

- overallScore is 0–100 (percentage).
- Each questionScore.score is 0 to that question's pointsPossible.
- "correct" means the student earned at least 70% of the question's points.
- Keep feedback warm and constructive.`
}

// ─── Summative grading prompt ──────────────────────────────────────────────

export function buildSummativeGradingPrompt(
  prompt: string,
  rubric: RubricDimension[],
  studentResponse: string,
  pathway: string
): string {
  const rubricText = rubric.map((dim, i) => `
DIMENSION ${i + 1}: ${dim.dimension} (max ${dim.maxPoints} points)
  Exemplary: ${dim.descriptors.exemplary}
  Proficient: ${dim.descriptors.proficient}
  Developing: ${dim.descriptors.developing}
`).join('\n')

  const totalPoints = rubric.reduce((sum, d) => sum + d.maxPoints, 0)

  return `You are a fair and encouraging grading assistant for The Gospel Academy, a Christian online school for grades 6–9.

You are grading a SUMMATIVE assessment (end-of-unit project evaluation).

ASSIGNMENT PROMPT:
${prompt}

PATHWAY: ${pathway}
${pathway === 'ADVANCED' ? 'Expect deeper analysis and original synthesis.' : pathway === 'VOCATIONAL' ? 'Value practical application and real-world connections.' : 'Look for clear understanding and thoughtful engagement.'}

RUBRIC (total ${totalPoints} points):
${rubricText}

STUDENT'S RESPONSE:
${studentResponse}

GRADING RULES:
1. Evaluate each rubric dimension independently.
2. Award points within each dimension based on the descriptors.
3. Be fair but encouraging — these are middle school students.
4. The overall score should be a percentage (0–100) based on total points earned / total points possible.
5. Feedback should be specific and actionable.

Respond with ONLY valid JSON in this exact format:
{
  "dimensionScores": [
    {
      "dimension": "string",
      "score": number,
      "level": "exemplary" | "proficient" | "developing"
    }
  ],
  "overallScore": number,
  "feedback": "2-3 sentence overall feedback",
  "strengths": ["strength 1", "strength 2"],
  "growthAreas": ["area 1"]
}

- overallScore is 0–100 percentage.
- Keep feedback warm, specific, and constructive.`
}

// ─── Robust JSON extraction from AI responses ─────────────────────────────

/**
 * Extracts and parses JSON from AI text that may contain:
 * - Markdown code fences (```json ... ```)
 * - Trailing commas before } or ]
 * - Garbage text injected mid-JSON (hallucinated content)
 * - Text before/after the JSON object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function robustJsonParse(raw: string): Record<string, any> {
  // Step 1: Strip markdown code fences
  let text = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()

  // Step 2: Try direct parse first (fast path)
  try {
    return JSON.parse(text)
  } catch {
    // continue to cleanup
  }

  // Step 3: Extract the outermost { ... } block
  const firstBrace = text.indexOf('{')
  if (firstBrace === -1) throw new Error('No JSON object found in AI response')

  // Find the matching closing brace by counting depth
  let depth = 0
  let inString = false
  let escape = false
  let lastBrace = -1
  for (let i = firstBrace; i < text.length; i++) {
    const ch = text[i]
    if (escape) { escape = false; continue }
    if (ch === '\\' && inString) { escape = true; continue }
    if (ch === '"' && !escape) { inString = !inString; continue }
    if (inString) continue
    if (ch === '{') depth++
    if (ch === '}') { depth--; if (depth === 0) { lastBrace = i; break } }
  }

  if (lastBrace === -1) throw new Error('No complete JSON object found in AI response')
  text = text.slice(firstBrace, lastBrace + 1)

  // Step 4: Fix trailing commas before } or ]
  text = text.replace(/,\s*([\]}])/g, '$1')

  // Step 5: Try parse after cleanup
  try {
    return JSON.parse(text)
  } catch {
    // continue to aggressive cleanup
  }

  // Step 6: Remove lines that aren't valid JSON tokens
  // (handles garbage text injected mid-object like "immunotherapy...")
  const lines = text.split('\n')
  const cleanedLines: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    // Keep lines that look like JSON: start with {, }, [, ], ", a digit, or common keywords
    if (
      trimmed === '' ||
      /^[{}\[\]",:\d\-]/.test(trimmed) ||
      /^(true|false|null)/.test(trimmed) ||
      /^\}/.test(trimmed) ||
      /^\]/.test(trimmed)
    ) {
      cleanedLines.push(line)
    }
    // else: skip garbage line
  }
  text = cleanedLines.join('\n')
  // Fix trailing commas again after removing lines
  text = text.replace(/,\s*([\]}])/g, '$1')

  try {
    return JSON.parse(text)
  } catch (e) {
    // Step 7: Last resort — try to extract key fields with regex
    const overallScore = text.match(/"overallScore"\s*:\s*(\d+)/)?.[1]
    const feedback = text.match(/"feedback"\s*:\s*"([^"]*?)"/)?.[1]
    if (overallScore) {
      return {
        questionScores: [],
        dimensionScores: [],
        overallScore: parseInt(overallScore, 10),
        feedback: feedback ?? 'Your assessment has been graded.',
        strengths: [],
        growthAreas: [],
      }
    }
    throw new Error(`Failed to parse AI grading response: ${(e as Error).message}`)
  }
}

// ─── Parse AI grading response ─────────────────────────────────────────────

export interface ParsedFormativeResult {
  questionScores: { questionId: string; score: number; feedback: string; correct: boolean }[]
  overallScore: number
  feedback: string
  strengths: string[]
  growthAreas: string[]
}

export interface ParsedSummativeResult {
  dimensionScores: { dimension: string; score: number; level: string }[]
  overallScore: number
  feedback: string
  strengths: string[]
  growthAreas: string[]
}

export function parseGradingResponse(text: string): ParsedFormativeResult | ParsedSummativeResult {
  const parsed = robustJsonParse(text)

  // Validate and clamp overallScore to 0-100
  if (typeof parsed.overallScore !== 'number' || isNaN(parsed.overallScore)) {
    parsed.overallScore = 0
  }
  parsed.overallScore = Math.max(0, Math.min(100, Math.round(parsed.overallScore)))

  // Validate required fields with safe defaults
  if (typeof parsed.feedback !== 'string') parsed.feedback = ''
  if (!Array.isArray(parsed.strengths)) parsed.strengths = []
  if (!Array.isArray(parsed.growthAreas)) parsed.growthAreas = []

  // Validate questionScores if present (formative)
  if (Array.isArray(parsed.questionScores)) {
    for (const qs of parsed.questionScores) {
      if (typeof qs.score !== 'number' || isNaN(qs.score)) qs.score = 0
      qs.score = Math.max(0, qs.score)
      if (typeof qs.feedback !== 'string') qs.feedback = ''
      if (typeof qs.correct !== 'boolean') qs.correct = qs.score > 0
    }
  }

  // Validate dimensionScores if present (summative)
  if (Array.isArray(parsed.dimensionScores)) {
    for (const ds of parsed.dimensionScores) {
      if (typeof ds.score !== 'number' || isNaN(ds.score)) ds.score = 0
      ds.score = Math.max(0, ds.score)
      if (typeof ds.level !== 'string') ds.level = 'developing'
    }
  }

  return parsed as ParsedFormativeResult | ParsedSummativeResult
}
