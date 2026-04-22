/**
 * Example lesson record: Bible & Theology — Grade 9, Unit 1, Week 1
 * "In the Beginning: The Nature and Revelation of God"
 *
 * This file demonstrates the full LessonContent schema. Content bodies are
 * realistic placeholders — replace with final curriculum copy before seeding.
 *
 * To seed this lesson:
 *   1. Upsert the Course and Unit records.
 *   2. Call prisma.lesson.create({ data: { ...lessonMeta, content: exampleLesson } })
 */

import type { LessonContent } from '@/lib/types/curriculum'

export const exampleLesson: LessonContent = {
  schemaVersion: 1,

  // ── Metadata ──────────────────────────────────────────────────────────────
  subject:     'Bible & Theology',
  gradeLevel:  9,
  unitNumber:  1,
  weekNumber:  1,
  title:       'In the Beginning: The Nature and Revelation of God',
  description: 'Students explore how God reveals Himself through creation, Scripture, and the person of Christ, establishing a biblical foundation for all learning.',

  // ── Shared vocabulary ─────────────────────────────────────────────────────
  vocabulary: [
    {
      term:       'General Revelation',
      definition: 'God\'s self-disclosure through creation, conscience, and the natural order — available to all people everywhere.',
      example:    'The vastness of the cosmos points to the power and eternal nature of its Creator (Romans 1:20).',
    },
    {
      term:       'Special Revelation',
      definition: 'God\'s direct communication through Scripture and ultimately through Jesus Christ, His incarnate Word.',
      example:    'The Bible is special revelation because it conveys specific truths about salvation that nature alone cannot communicate.',
    },
    {
      term:       'Aseity',
      definition: 'The attribute of God by which He exists entirely of and from Himself, depending on nothing outside Himself for His being.',
    },
    {
      term:       'Imago Dei',
      definition: 'Latin for "image of God"; the teaching that human beings uniquely bear a likeness to God, grounding human dignity and vocation.',
      example:    'Because humans are made in the imago Dei, every student has inherent worth regardless of academic performance.',
    },
    {
      term:       'Theology Proper',
      definition: 'The branch of systematic theology that studies the nature, attributes, and works of God the Father.',
    },
  ],

  // ── Shared memory work ────────────────────────────────────────────────────
  memoryWork: [
    {
      text:      'In the beginning, God created the heavens and the earth.',
      reference: 'Genesis 1:1 (ESV)',
      type:      'scripture',
    },
    {
      text:      'What is the chief end of man? Man\'s chief end is to glorify God, and to enjoy him forever.',
      reference: 'Westminster Shorter Catechism, Q1',
      type:      'catechism',
    },
  ],

  // ── Per-pathway content ───────────────────────────────────────────────────
  pathways: [

    // ── ADVANCED ─────────────────────────────────────────────────────────────
    {
      pathway:          'ADVANCED',
      title:            'The God Who Is: Divine Attributes and the Two-Book Doctrine',
      estimatedMinutes: 90,
      objectives: [
        'Articulate the distinction between general and special revelation with primary-source support.',
        'Analyse the communicable and incommunicable attributes of God and their significance for Christian epistemology.',
        'Evaluate how the Two-Book Doctrine (nature and Scripture) shaped early modern science.',
        'Construct a written argument connecting Romans 1:18–20 to an area of academic inquiry.',
      ],
      ipo: {
        input: [
          {
            type:   'wonder',
            prompt: 'If God had never spoken a single written word, what could you know about Him just by studying the world around you — and what would remain completely hidden?',
            connection: 'This tension between general and special revelation sits at the foundation of all Christian intellectual life.',
          },
          {
            type:    'reading',
            title:   'Romans 1:18–25 — The Witness of Creation',
            source:  'Romans 1:18–25 (ESV)',
            text:    'For the wrath of God is revealed from heaven against all ungodliness and unrighteousness of men… For what can be known about God is plain to them, because God has shown it to them. For his invisible attributes, namely, his eternal power and divine nature, have been clearly perceived, ever since the creation of the world, in the things that have been made. So they are without excuse…',
            readingLevel: 'moderate',
          },
          {
            type:    'reading',
            title:   'Calvin on the Two Books of Revelation (excerpt)',
            source:  'John Calvin, Institutes of the Christian Religion, I.vi.1 (adapted)',
            text:    'Since the perfection of blessedness consists in the knowledge of God, He has been pleased to instruct us by two books: the book of nature and the book of Scripture. The former speaks to all, but without the corrective lens of the latter its testimony is misread by sinful minds…',
            readingLevel: 'challenging',
          },
          {
            type:    'text',
            heading: 'The Communicable and Incommunicable Attributes',
            body:    'Theologians distinguish between **incommunicable attributes** — those God does not share with creatures (aseity, omnipotence, omniscience, omnipresence, immutability) — and **communicable attributes** — those He shares in finite measure with humans (love, wisdom, holiness, justice). This distinction matters for how we understand both God\'s transcendence and our being made in His image.\n\nThis week you will survey five incommunicable and five communicable attributes, tracing each through Scripture and reflecting on its implications for everyday life.',
          },
          {
            type:  'biblical-worldview',
            theme: 'Truth and Revelation',
            scriptureRef: 'Psalm 19:1–4; John 1:1–3, 14',
            reflection: 'The heavens declare God\'s glory (general revelation), but the Word became flesh to declare the Father fully (special revelation). For the Christian scholar, every academic discipline — from astronomy to literature — is ultimately a study of what God has made or said. All truth is God\'s truth.',
            applicationQuestion: 'In what subject area have you most clearly seen evidence of God\'s design this year? How does studying that subject become an act of worship?',
          },
        ],
        processing: [
          {
            type:     'discussion',
            question: 'Paul argues in Romans 1 that the created order renders all people "without excuse." Does this mean general revelation is sufficient for salvation? Defend your answer with at least two Scripture references.',
            hint:     'Consider Romans 10:14–17 and Hebrews 1:1–2 as part of your response.',
            isGraded: true,
          },
          {
            type:     'discussion',
            question: 'How did Calvin\'s Two-Book Doctrine influence early-modern scientists like Kepler and Galileo? What does this suggest about the relationship between faith and science today?',
          },
          {
            type:    'practice',
            prompt:  'Match each attribute to its correct category (communicable / incommunicable) and write one Scripture reference for each: Omnipresence, Love, Holiness, Aseity, Wisdom, Immutability, Justice, Omniscience, Mercy, Omnipotence.',
            answerKey: 'Incommunicable: Omnipresence (Ps 139:7–10), Aseity (Ex 3:14), Immutability (Mal 3:6), Omniscience (Ps 147:5), Omnipotence (Rev 19:6). Communicable: Love (1 Jn 4:8), Holiness (1 Pet 1:15–16), Wisdom (Prov 3:19), Justice (Deut 32:4), Mercy (Lam 3:22–23).',
            skills:  ['theology-proper', 'scripture-reference', 'classification'],
          },
        ],
        output: [
          {
            type:         'project',
            title:        'Two-Books Reflection Essay',
            summary:      'A 600-word argumentative essay connecting Romans 1:18–20 to a chosen academic discipline.',
            description:  'Choose one discipline you study this year (mathematics, science, history, language arts). Write a 600-word essay in which you:\n1. Define both general and special revelation in your own words.\n2. Identify at least two specific examples of general revelation in your chosen discipline.\n3. Explain what special revelation (Scripture) adds to or corrects about what that discipline reveals on its own.\n4. Conclude with a statement of how this understanding changes the way you approach that subject.\n\nFormat: 12pt, double-spaced, MLA citations.',
            deliverable:  'written-report',
            estimatedHours: 1.5,
            rubric: [
              {
                dimension: 'Theological Accuracy',
                maxPoints: 30,
                descriptors: {
                  exemplary:  'Definitions are precise and fully grounded in Scripture; attributes of general and special revelation are correctly distinguished.',
                  proficient: 'Definitions are mostly accurate with minor gaps; Scripture is referenced but not always cited correctly.',
                  developing: 'Definitions are vague or conflated; Scripture is largely absent.',
                },
              },
              {
                dimension: 'Argumentation',
                maxPoints: 30,
                descriptors: {
                  exemplary:  'Thesis is clear and original; all three body sections build logically toward a compelling conclusion.',
                  proficient: 'Thesis is present; argument is mostly logical with some underdeveloped sections.',
                  developing: 'Thesis is missing or unclear; essay reads as a list rather than an argument.',
                },
              },
              {
                dimension: 'Integration of Discipline',
                maxPoints: 25,
                descriptors: {
                  exemplary:  'Examples are specific, accurate, and draw genuine insight from the chosen discipline.',
                  proficient: 'Examples are present but somewhat generic; connection to the discipline is surface-level.',
                  developing: 'Examples are missing or unrelated to the chosen discipline.',
                },
              },
              {
                dimension: 'Writing Mechanics',
                maxPoints: 15,
                descriptors: {
                  exemplary:  'No grammatical or citation errors; prose is clear and appropriately formal.',
                  proficient: 'Fewer than five minor errors; citations are mostly correct.',
                  developing: 'Frequent errors impede readability; citation format not followed.',
                },
              },
            ],
          },
        ],
      },
    },

    // ── STANDARD ─────────────────────────────────────────────────────────────
    {
      pathway:          'STANDARD',
      title:            'How Does God Reveal Himself? Creation, Scripture, and Christ',
      estimatedMinutes: 60,
      objectives: [
        'Define general revelation and special revelation and give one example of each.',
        'Recall at least five attributes of God and locate a supporting Scripture verse for each.',
        'Explain the meaning of Imago Dei and describe one practical implication for daily life.',
        'Write a personal reflection connecting one attribute of God to their own experience.',
      ],
      ipo: {
        input: [
          {
            type:   'wonder',
            prompt: 'Look outside or recall a time in nature that left you speechless. What did that moment make you think or feel about the universe — and its Maker?',
          },
          {
            type:    'reading',
            title:   'Psalm 19:1–6 — Creation as Witness',
            source:  'Psalm 19:1–6 (ESV)',
            text:    'The heavens declare the glory of God, and the sky above proclaims his handiwork. Day to day pours out speech, and night to night reveals knowledge. There is no speech, nor are there words, whose voice is not heard. Their voice goes out through all the earth, and their words to the end of the world…',
            readingLevel: 'easy',
          },
          {
            type:    'text',
            heading: 'Two Ways God Speaks',
            body:    'God reveals Himself in two primary ways:\n\n**General Revelation** is what everyone can learn about God by observing the world He made — the stars, the seasons, the human conscience. It shows that God is powerful, orderly, and good.\n\n**Special Revelation** is what God chose to communicate directly: through the Bible and ultimately through His Son, Jesus Christ. Special revelation tells us things about God\'s character, His plan of salvation, and how we are to live — things creation alone could never teach us.',
          },
          {
            type:  'biblical-worldview',
            theme: 'Imago Dei — Made to Reflect God',
            scriptureRef: 'Genesis 1:26–27',
            reflection: 'When God said "Let us make man in our image," He set humanity apart from everything else in creation. To bear the image of God means we are rational, relational, creative, and moral beings — designed to reflect His character in the world. This is the most important fact about any person you will ever meet.',
            applicationQuestion: 'Name one way you can reflect the image of God at school or at home this week.',
          },
        ],
        processing: [
          {
            type:     'discussion',
            question: 'What are two things you can learn about God just from looking at creation? What is something you could only know about God from the Bible?',
            hint:     'Think about Psalm 19:1 for the first question and John 3:16 for the second.',
          },
          {
            type:    'practice',
            prompt:  'Fill in the chart: For each attribute listed, write its meaning in your own words and one verse that teaches it.\n\nAttributes: Holy, Loving, All-Knowing, Eternal, Just.',
            answerKey: 'Holy — set apart from sin (Isa 6:3). Loving — perfectly desires our good (1 Jn 4:8). All-Knowing — knows all things past, present, future (Ps 147:5). Eternal — has no beginning or end (Ps 90:2). Just — always acts rightly and fairly (Deut 32:4).',
            skills:  ['theology-proper', 'scripture-memory'],
          },
          {
            type:     'discussion',
            question: 'Why does it matter that humans are made "in the image of God"? How should that change the way we treat other people?',
            isGraded: false,
          },
        ],
        output: [
          {
            type:         'project',
            title:        'Attribute of God Personal Reflection',
            summary:      'A one-page reflection on one attribute of God and how it connects to real life.',
            description:  'Choose ONE attribute of God from the list above. Write a one-page (250–350 word) reflection that answers these questions:\n1. What does this attribute mean?\n2. Find and write out one Bible verse that teaches this attribute.\n3. Describe a real-life situation (your own or someone else\'s) where this attribute of God is comforting, challenging, or important.\n4. How does knowing God has this attribute change the way you think or act?\n\nHandwritten or typed, neat and complete.',
            deliverable:  'written-report',
            estimatedHours: 0.75,
            rubric: [
              {
                dimension: 'Understanding of the Attribute',
                maxPoints: 35,
                descriptors: {
                  exemplary:  'Clear, accurate definition in student\'s own words with a well-chosen verse.',
                  proficient: 'Generally correct with minor inaccuracies; verse is present.',
                  developing: 'Definition is vague or incorrect; verse is missing.',
                },
              },
              {
                dimension: 'Personal Connection',
                maxPoints: 40,
                descriptors: {
                  exemplary:  'Specific, genuine life example; clearly explains how the attribute matters personally.',
                  proficient: 'Example is present but somewhat generic; connection is stated but not fully developed.',
                  developing: 'No personal example; reflection stays abstract.',
                },
              },
              {
                dimension: 'Writing Quality',
                maxPoints: 25,
                descriptors: {
                  exemplary:  'Organised, readable, minimal errors.',
                  proficient: 'Mostly readable with a few errors.',
                  developing: 'Difficult to follow; many errors.',
                },
              },
            ],
          },
        ],
      },
    },

    // ── VOCATIONAL ────────────────────────────────────────────────────────────
    {
      pathway:          'VOCATIONAL',
      title:            'God at Work: Seeing His Character in Your Vocation',
      estimatedMinutes: 55,
      objectives: [
        'Identify two ways God reveals Himself (general and special revelation).',
        'Describe three attributes of God relevant to a chosen vocational field.',
        'Connect the concept of Imago Dei to dignity and ethics in the workplace.',
        'Create a "Vocational Theology" card for their intended career area.',
      ],
      ipo: {
        input: [
          {
            type:   'wonder',
            prompt: 'Think about a job or skill you admire — a craftsman, a nurse, a farmer, a builder. What does the quality and care in that work tell you about the kind of God who designed humans to do it?',
          },
          {
            type:    'reading',
            title:   'Proverbs 22:29 & Colossians 3:23–24 — Faithful Work as Worship',
            source:  'Proverbs 22:29; Colossians 3:23–24 (ESV)',
            text:    '"Do you see a man skilful in his work? He will stand before kings; he will not stand before obscure men." (Prov 22:29)\n\n"Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward." (Col 3:23–24)',
            readingLevel: 'easy',
          },
          {
            type:    'text',
            heading: 'Why Your Work Reflects Who God Is',
            body:    'When God made humanity in His image (Genesis 1:26–27), He made us creators, builders, carers, and problem-solvers — just like Him. Every honest vocation is a participation in God\'s ongoing care for His world.\n\nThis week we look at three attributes of God that are especially visible in skilled work:\n- **Creativity** — God brought order from chaos; great craftspeople do the same.\n- **Care/Love** — God sustains what He makes; nurses, teachers, and tradespeople do this too.\n- **Justice/Integrity** — God always does what is right; ethical workers reflect this every day.',
          },
          {
            type:  'biblical-worldview',
            theme: 'Work as Worship — the Doctrine of Vocation',
            scriptureRef: 'Genesis 2:15; Colossians 3:23',
            reflection: 'God placed Adam in the garden "to work it and keep it" before the Fall — meaning work itself is good, not a curse. Martin Luther recovered the truth that every legitimate vocation, from carpentry to accounting, can be an act of worship when done for God\'s glory and the neighbour\'s good. Your career choice is a theological choice.',
            applicationQuestion: 'What vocational area interests you most? How might the attributes of God you studied this week show up in someone who does that job with excellence and integrity?',
          },
        ],
        processing: [
          {
            type:     'discussion',
            question: 'A contractor builds a house for a client on a tight budget. List three ways they could reflect God\'s attribute of justice or integrity in how they do the job. List two ways they could violate it.',
            hint:     'Think about honesty with materials, fair pricing, safety, and honouring the client\'s trust.',
          },
          {
            type:    'practice',
            prompt:  'Match each vocational scenario to the attribute of God it reflects:\n\nScenarios: A chef who carefully sources ingredients to feed customers well | An engineer who triple-checks their safety calculations | A teacher who stays late to help a struggling student | A business owner who pays workers fairly even when profits are low\n\nAttributes: Love/Care | Creativity/Order | Justice/Integrity | Faithfulness',
            answerKey: 'Chef → Love/Care; Engineer → Faithfulness or Justice; Teacher → Love/Care; Business owner → Justice/Integrity.',
            skills:  ['theology-applied', 'vocational-ethics'],
          },
        ],
        output: [
          {
            type:         'project',
            title:        'Vocational Theology Card',
            summary:      'A one-page visual card connecting three attributes of God to a chosen career.',
            description:  'Create a "Vocational Theology Card" for a career area you are interested in. The card should include:\n\n1. **Job title / Career area** — named clearly at the top.\n2. **Three attributes of God** — list three attributes and write 1–2 sentences for each explaining how that attribute shows up in excellent, ethical work in that career.\n3. **Scripture anchor** — one verse that connects faith to this kind of work.\n4. **"This is worship because…"** — finish this sentence in 2–3 sentences.\n\nFormat: One page, can be hand-drawn/designed or typed. Visuals encouraged. This card goes in your vocational portfolio.',
            deliverable:  'portfolio-artifact',
            estimatedHours: 0.75,
            rubric: [
              {
                dimension: 'Theological Connection',
                maxPoints: 40,
                descriptors: {
                  exemplary:  'Three attributes are correctly named, clearly explained, and genuinely connected to the chosen vocation.',
                  proficient: 'At least two attributes are correct; connections are present but surface-level.',
                  developing: 'Attributes are vague or unconnected to the vocation.',
                },
              },
              {
                dimension: 'Scripture Use',
                maxPoints: 25,
                descriptors: {
                  exemplary:  'Verse is well-chosen and the connection to the vocation is explained.',
                  proficient: 'Verse is present; connection is implied but not stated.',
                  developing: 'No verse, or verse is unrelated.',
                },
              },
              {
                dimension: 'Completion and Effort',
                maxPoints: 35,
                descriptors: {
                  exemplary:  'All sections complete; card is neat, clear, and shows care.',
                  proficient: 'Most sections complete; presentation is acceptable.',
                  developing: 'Sections missing; card is incomplete or illegible.',
                },
              },
            ],
          },
        ],
      },
    },

  ],
}

/**
 * Convenience: the Prisma-ready `data` object for `prisma.lesson.create()`.
 * Assumes the Unit record for Grade 9, Bible & Theology, Unit 1 already exists.
 *
 * Usage:
 *   const lesson = await prisma.lesson.create({ data: lessonSeedData(unitId) })
 */
export function lessonSeedData(unitId: string) {
  return {
    unitId,
    weekNumber: exampleLesson.weekNumber,
    title:      exampleLesson.title,
    type:       'INSTRUCTION' as const,
    content:    exampleLesson as unknown as import('@prisma/client').Prisma.InputJsonValue,
  }
}
