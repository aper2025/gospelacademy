#!/usr/bin/env tsx
/**
 * Enrich English Fluency Builder for French Speakers — Level 2 (A2→B1), Units 7-9
 *
 * Course ID: cmo78obs3002jon5tn4q5trv6
 *
 * Unit 7: "Health and Society" (W25–W28)
 *   W25: Healthy Living and Nutrition (INSTRUCTION)
 *   W26: Community Services and Helpers (INSTRUCTION)
 *   W27: Rights, Responsibilities, and Values (INSTRUCTION)
 *   W28: Community Health Plan (PROJECT)
 *
 * Unit 8: "Dreams and Ambitions" (W29–W32)
 *   W29: Planning for the Future (INSTRUCTION)
 *   W30: Conditional Sentences (INSTRUCTION)
 *   W31: Problem-Solving and Decision-Making (INSTRUCTION)
 *   W32: My Future Plan Presentation (PROJECT)
 *
 * Unit 9: "Review and Assessment" (W33–W36)
 *   W33: Grammar and Vocabulary Consolidation (INSTRUCTION)
 *   W34: Integrated Skills Practice (INSTRUCTION)
 *   W35: Test Preparation Strategies (INSTRUCTION)
 *   W36: Level 2 Final Assessment (PROJECT)
 *
 * Usage:
 *   npx tsx scripts/enrich-ef-l2-u7-9.ts --dry-run
 *   npx tsx scripts/enrich-ef-l2-u7-9.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve('.env.local') })
dotenv.config({ path: path.resolve('.env') })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry-run')
const COURSE_ID = 'cmo78obs3002jon5tn4q5trv6'

// ─── Types ──────────────────────────────────────────────────────────────────

interface ContentBlock { type: string; [key: string]: unknown }
interface PathwayVariant {
  pathway: 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'
  title: string
  estimatedMinutes: number
  objectives: string[]
  ipo: { input: ContentBlock[]; processing: ContentBlock[]; output: ContentBlock[] }
}
interface VocabItem { term: string; definition: string; example: string }
interface QuizQuestion { question: string; options: string[]; correctAnswer: number; explanation: string }
interface EnrichedLesson { weekNumber: number; pathways: PathwayVariant[]; vocabulary: VocabItem[]; quiz: QuizQuestion[] }
interface LessonContent { schemaVersion: number; pathways: PathwayVariant[]; vocabulary?: VocabItem[]; quiz?: QuizQuestion[]; resources?: unknown[]; [key: string]: unknown }

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 7: HEALTH AND SOCIETY (W25–W28)
// ═══════════════════════════════════════════════════════════════════════════════

const unit7Lessons: EnrichedLesson[] = [

  // ── W25: Healthy Living and Nutrition (INSTRUCTION) ───────────────────────
  {
    weekNumber: 1,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Healthy Living and Nutrition',
        estimatedMinutes: 70,
        objectives: [
          'Master health and wellness vocabulary including nutrition, exercise, and mental health terminology.',
          'Use modals of advice accurately: should, ought to, had better, and their negative forms.',
          'Distinguish countable and uncountable nouns with food vocabulary using much, many, a lot of, a few, a little.',
          'Contrast English and French health vocabulary and medical terminology patterns.',
          'Connect physical health stewardship to the biblical principle of honoring God with our bodies.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When a French speaker visits an English-speaking doctor, the conversation can get confusing quickly. In French, you say "J\'ai mal à la tête" (I have pain at the head), but in English we say "I have a headache" — one word, not a phrase. Why do languages describe the same body differently? And why does it matter that we take care of these bodies at all?',
              connection: 'The apostle Paul wrote that our bodies are temples of the Holy Spirit (1 Corinthians 6:19). If our bodies belong to God, then learning to talk about health — in any language — is part of honoring Him. Today we learn the English vocabulary and grammar you need to discuss healthy living with confidence.',
            },
            {
              type: 'text',
              heading: 'Health and Wellness Vocabulary',
              body: 'English organizes health vocabulary differently than French. Let us explore the key categories.\n\n**Body Systems:** In French, many medical terms come directly from Latin or Greek roots that English also uses — but everyday English often prefers simpler words. French says "le système digestif" and English says "the digestive system" (similar), but French says "les poumons" where English says "lungs" (completely different). Pay attention to these unpredictable differences.\n\n**Nutrition Language:** English distinguishes between "healthy" (good for your body) and "healthful" (promoting health), though most speakers use "healthy" for both. French uses "sain" for both meanings. Key nutrition words include: **protein, carbohydrates, fiber, vitamins, minerals, calories, portion, serving size, whole grains, processed food, organic**.\n\n**Common Health Expressions:**\n- "to be in good/bad shape" (être en bonne/mauvaise forme)\n- "to work out" (faire de l\'exercice) — note: "work out" is a phrasal verb\n- "to cut back on" something (réduire) — "I need to cut back on sugar"\n- "to stay hydrated" (rester hydraté — this one transfers directly!)\n\n**Mental Health Vocabulary:** English has become more open about mental health. Key terms: **stress, anxiety, burnout, self-care, mindfulness, well-being, cope with, overwhelmed**. In French, "le bien-être" maps to "well-being," but "cope with" has no single French equivalent — you might say "faire face à" or "gérer."',
            },
            {
              type: 'text',
              heading: 'Modals of Advice and Countable/Uncountable Nouns with Food',
              body: '**Giving Advice in English:**\nEnglish uses modal verbs to give advice, each with a different strength:\n- **should / shouldn\'t** — general advice: "You should eat more vegetables."\n- **ought to** — slightly more formal, same meaning: "You ought to exercise regularly." (French speakers: "ought to" has NO French equivalent — do not try to translate "devoir" directly)\n- **had better / had better not** — strong warning, implies consequences: "You had better stop smoking, or your health will suffer." Note: despite "had," this is about the present/future, not the past. French speakers often confuse this with past tense.\n\n**Countable vs. Uncountable Food Nouns:**\nThis is where French speakers struggle most. French uses "du," "de la," "des" as partitive articles — English has NO partitive articles.\n- **Uncountable** (use much / a little / a lot of): water, rice, bread, sugar, milk, meat, fruit (as a category), cheese\n- **Countable** (use many / a few / a lot of): apples, eggs, carrots, cookies, sandwiches, meals\n- **Both** (depends on meaning): "chicken" (uncountable = the meat) vs. "a chicken / chickens" (countable = the animal)\n\n**Common French Speaker Errors:**\n- WRONG: "I ate a bread" → RIGHT: "I ate some bread" or "I ate a piece of bread"\n- WRONG: "She drinks much water" → RIGHT: "She drinks a lot of water" (much is mainly for questions/negatives)\n- WRONG: "Give me an advice" → RIGHT: "Give me some advice" (advice is ALWAYS uncountable in English!)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honoring God with Our Bodies',
              scriptureRef: '1 Corinthians 6:19-20',
              reflection: 'Paul writes: "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies." This verse transforms how we think about health. Eating well, exercising, resting, and managing stress are not just personal preferences — they are acts of stewardship. When we learn to discuss health in English, we gain the ability to encourage others toward this stewardship across language barriers.',
              applicationQuestion: 'How does viewing your body as a "temple of the Holy Spirit" change the way you think about daily health choices like food, sleep, and exercise?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Compare how French and English express health complaints. In French you say "J\'ai mal au ventre." In English, do we say "I have pain at the stomach"? What is the natural English way? List three more health complaints and their English expressions.',
                'What is the difference between "You should see a doctor," "You ought to see a doctor," and "You had better see a doctor"? When would you use each one?',
                'Why is "advice" uncountable in English but "un conseil" is countable in French? Can you think of other nouns that are countable in French but uncountable in English?',
              ],
            },
            {
              type: 'practice',
              activity: 'Health Advice Column',
              prompt: 'A friend writes to you with these three health problems. Write 3-4 sentences of advice for EACH problem, using should, ought to, and had better at least once each. Include countable/uncountable food nouns with correct quantifiers.\n\n1. "I feel tired all the time and I eat a lot of fast food."\n2. "I get very stressed before exams and I can\'t sleep."\n3. "I want to start exercising but I don\'t know where to begin."\n\nAfter writing your advice, identify two places where a French speaker might make an error and explain why.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word article titled "Five Tips for Healthy Living" aimed at French-speaking teenagers learning English. Your article must:\n- Use at least 8 health/nutrition vocabulary words from today\'s lesson\n- Include advice using should, ought to, and had better\n- Use much/many/a lot of/a few/a little correctly with food nouns\n- Include a paragraph connecting health to 1 Corinthians 6:19\n- Avoid common French-speaker errors (no partitive articles, correct uncountable nouns)\n\nAfter your article, write a "French Speaker Alert" box listing 3 common mistakes French speakers make with health vocabulary and how to fix them.',
            },
            {
              type: 'practice',
              prompt: 'Create a one-day healthy meal plan (breakfast, lunch, dinner, and one snack). For each meal, write 2-3 sentences describing what to eat and why, using correct countable/uncountable grammar. Example: "For breakfast, you should eat a little oatmeal with a few fresh berries. Oatmeal has a lot of fiber, which gives you energy for the morning."',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Healthy Living and Nutrition',
        estimatedMinutes: 55,
        objectives: [
          'Learn key health and wellness vocabulary for nutrition, exercise, and well-being.',
          'Use should, ought to, and had better to give health advice.',
          'Correctly use much, many, and a lot of with food nouns.',
          'Identify common French-English differences in health language.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you went to an English-speaking doctor, could you describe how you feel? In French, you say "J\'ai mal à la gorge," but in English we say "I have a sore throat." Health words work differently in English. Let us learn them today.',
              connection: 'The Bible tells us our bodies are temples of the Holy Spirit (1 Corinthians 6:19). Learning to talk about health in English helps us care for our bodies and help others do the same.',
            },
            {
              type: 'text',
              heading: 'Health Vocabulary and Giving Advice',
              body: '**Key Health Words:**\n- **Nutrition:** protein, vitamins, fiber, calories, whole grains, processed food\n- **Exercise:** work out, stay in shape, stretch, cardio, strength training\n- **Well-being:** stress, self-care, well-being, cope with, overwhelmed\n- **At the doctor:** symptoms, fever, sore throat, headache, prescription\n\n**French vs. English differences:**\n- French: "J\'ai mal à la tête" → English: "I have a headache" (one word!)\n- French: "J\'ai de la fièvre" → English: "I have a fever" (no partitive "de la")\n\n**Giving Advice — Three Levels:**\n1. **Should / shouldn\'t** — normal advice: "You should drink more water."\n2. **Ought to** — same meaning, more formal: "You ought to eat breakfast every day."\n3. **Had better** — strong warning: "You had better stop skipping meals, or you will feel weak."\n\n**Countable vs. Uncountable Food Nouns:**\n- Uncountable (use much / a little / a lot of): water, rice, bread, sugar, cheese, meat\n- Countable (use many / a few / a lot of): apples, eggs, sandwiches, cookies\n- WRONG: "I ate a bread" → RIGHT: "I ate some bread" or "a piece of bread"\n- WRONG: "Give me an advice" → RIGHT: "Give me some advice"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honoring God with Our Bodies',
              scriptureRef: '1 Corinthians 6:19-20',
              reflection: 'Paul says our bodies are temples of the Holy Spirit. That means taking care of our health is a way of honoring God. When we eat well, exercise, and rest, we are being good stewards of the body God gave us.',
              applicationQuestion: 'How does knowing your body is a "temple" change how you think about what you eat and how you take care of yourself?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "You should see a doctor" and "You had better see a doctor"? Which one sounds more urgent?',
                'Why do French speakers often say "I ate a bread" instead of "I ate some bread"? What French grammar habit causes this mistake?',
                'Name three health words that are similar in French and English and three that are completely different.',
              ],
            },
            {
              type: 'practice',
              activity: 'Health Advice Practice',
              prompt: 'A friend tells you about these problems. Write 2-3 sentences of advice for each, using should, ought to, or had better.\n\n1. "I drink a lot of soda every day."\n2. "I never eat breakfast before school."\n3. "I feel stressed and I can\'t sleep at night."\n\nMake sure to use at least one uncountable food noun correctly in your answers.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 200-300 word paragraph giving health advice to a teenager. Include:\n- At least 6 health vocabulary words\n- Advice using should, ought to, and had better (at least one of each)\n- Correct use of much/many/a lot of with food examples\n- A sentence connecting health to 1 Corinthians 6:19',
            },
            {
              type: 'practice',
              prompt: 'Fill in the blanks with much, many, a few, a little, or a lot of:\n1. You should eat ___ vegetables every day. (countable)\n2. Don\'t put too ___ sugar in your tea. (uncountable)\n3. She only drinks ___ water — she should drink more.\n4. There are ___ good exercises you can do at home.\n5. He eats ___ fruit, which is great for his health.',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Healthy Living and Nutrition',
        estimatedMinutes: 40,
        objectives: [
          'Learn basic health and food vocabulary in English.',
          'Use should and had better to give simple health advice.',
          'Know when to use much and many with food words.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French you say "J\'ai mal à la tête" but in English we say "I have a headache." Health words are different in English. Let us learn the most important ones today.',
              connection: 'The Bible says our bodies are temples of God\'s Spirit (1 Corinthians 6:19). Taking care of our health honors God. Learning health words in English helps us and others stay well.',
            },
            {
              type: 'text',
              heading: 'Health Words and Giving Advice',
              body: '**Important Health Words:**\nheadache, stomachache, fever, sore throat, cough, tired, stressed, healthy, exercise, vitamins, protein, calories\n\n**Giving Advice:**\n- **Should:** "You should eat more fruit." (good advice)\n- **Had better:** "You had better see a doctor." (strong — something bad might happen if you don\'t)\n\n**Food Words — Much or Many?**\nSome food words are **countable** (you can count them): an apple, two eggs, three sandwiches → use **many** or **a few**\nSome are **uncountable** (you cannot count them): water, rice, bread, sugar → use **much** or **a little**\n\n**Examples:**\n- "How many apples do you want?" (countable)\n- "How much water do you drink?" (uncountable)\n- "I eat a lot of vegetables." (works for both!)\n\n**French Speaker Tip:** Don\'t say "a bread" or "a rice." Say "some bread" or "a bowl of rice."',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Cares About Your Health',
              scriptureRef: '1 Corinthians 6:19',
              reflection: 'God says your body is a temple. That means He cares about your health. Eating good food, drinking water, and exercising are ways to say "thank you" to God for your body.',
              applicationQuestion: 'What is one healthy thing you can do today to take care of the body God gave you?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "You should rest" and "You had better rest"?',
                'Why can\'t you say "a bread" in English? What should you say instead?',
              ],
            },
            {
              type: 'practice',
              activity: 'Give Health Advice',
              prompt: 'Your friend says these things. Give advice using should or had better.\n\n1. "I have a headache every day."\n2. "I never eat breakfast."\n3. "I drink a lot of soda."\n\nWrite one or two sentences for each.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words about how to stay healthy. Use at least 5 health words from today\'s lesson. Use should or had better at least twice. Use much or many correctly at least once. Include one sentence about why God wants us to be healthy.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'nutrition', definition: 'The process of eating the right kind of food for good health', example: 'Good nutrition includes eating a lot of vegetables and fruit.' },
      { term: 'protein', definition: 'A substance in food (like meat, eggs, beans) that helps your body grow and repair', example: 'You should eat enough protein every day to stay strong.' },
      { term: 'well-being', definition: 'The state of being comfortable, healthy, and happy', example: 'Exercise improves both physical and mental well-being.' },
      { term: 'ought to', definition: 'A modal verb meaning "should" — used to give advice (slightly more formal)', example: 'You ought to drink at least eight glasses of water a day.' },
      { term: 'had better', definition: 'A strong way to give advice, implying bad consequences if not followed', example: 'You had better stop eating so much sugar, or you will have health problems.' },
      { term: 'uncountable noun', definition: 'A noun that cannot be counted individually (no plural form, no "a/an")', example: '"Bread" is uncountable — you say "some bread," not "a bread."' },
      { term: 'cope with', definition: 'To deal with something difficult successfully', example: 'She learned healthy ways to cope with stress, like walking and praying.' },
      { term: 'processed food', definition: 'Food that has been changed from its natural state by adding chemicals or other substances', example: 'You should cut back on processed food and eat more whole grains.' },
    ],
    quiz: [
      { question: 'Which sentence gives advice correctly?', options: ['You should to eat more vegetables.', 'You should eat more vegetables.', 'You should eating more vegetables.', 'You should eats more vegetables.'], correctAnswer: 1, explanation: '"Should" is followed by the base form of the verb: should + eat.' },
      { question: 'Which word is an UNCOUNTABLE food noun?', options: ['apple', 'egg', 'rice', 'carrot'], correctAnswer: 2, explanation: '"Rice" is uncountable — you cannot say "a rice" or "two rices." You say "some rice" or "a bowl of rice."' },
      { question: '"You ___ see a doctor immediately." (strong advice with consequences)', options: ['should', 'ought to', 'had better', 'could'], correctAnswer: 2, explanation: '"Had better" is the strongest form of advice, implying something bad will happen if you don\'t follow it.' },
      { question: 'What is WRONG with this sentence? "I ate a bread for breakfast."', options: ['The verb tense is wrong.', '"Bread" is uncountable — you cannot say "a bread."', '"Breakfast" should have an article.', 'Nothing is wrong.'], correctAnswer: 1, explanation: '"Bread" is uncountable in English. The correct form is "I ate some bread" or "I ate a piece of bread."' },
      { question: 'How much ___ do you drink every day?', options: ['waters', 'a water', 'water', 'the waters'], correctAnswer: 2, explanation: '"Water" is uncountable, so we use it without an article or plural: "How much water..."' },
      { question: 'Which sentence uses "ought to" correctly?', options: ['She ought exercise more.', 'She ought to exercises more.', 'She ought to exercise more.', 'She ought to exercising more.'], correctAnswer: 2, explanation: '"Ought to" is followed by the base form: ought to + exercise.' },
      { question: 'In French, "J\'ai mal à la tête" becomes ___ in English.', options: ['I have pain at the head.', 'I have a headache.', 'My head has pain.', 'I am having the head pain.'], correctAnswer: 1, explanation: 'English uses single compound words for common ailments: "headache," "stomachache," "toothache."' },
      { question: 'How ___ eggs should you eat per week?', options: ['much', 'many', 'a little', 'a lot'], correctAnswer: 1, explanation: '"Eggs" is countable, so we use "many" (not "much") in questions.' },
      { question: 'According to 1 Corinthians 6:19, our bodies are:', options: ['Our own property to use as we wish.', 'Temples of the Holy Spirit.', 'Not important to God.', 'Only physical, not spiritual.'], correctAnswer: 1, explanation: 'Paul teaches that our bodies are temples of the Holy Spirit, which means caring for our health is a way of honoring God.' },
      { question: 'Which is the correct way to say this in English? "Give me an advice about health."', options: ['Give me an advice about health.', 'Give me advices about health.', 'Give me some advice about health.', 'Give me the advices about health.'], correctAnswer: 2, explanation: '"Advice" is ALWAYS uncountable in English (unlike French "un conseil"). Use "some advice" or "a piece of advice."' },
    ],
  },

  // ── W26: Community Services and Helpers (INSTRUCTION) ─────────────────────
  {
    weekNumber: 2,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Community Services and Helpers',
        estimatedMinutes: 70,
        objectives: [
          'Acquire vocabulary for public services, community organizations, and civic roles.',
          'Describe systems and processes using sequential language and passive constructions.',
          'Use relative clauses with who, which, and that to add detail to descriptions.',
          'Contrast French relative pronoun patterns (qui/que/dont/où) with English equivalents.',
          'Reflect on the biblical call to serve others through community involvement.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Every community depends on people who serve: firefighters who risk their lives, nurses who care for the sick, teachers who shape young minds. In French, you would describe them using "qui" and "que" — but English relative clauses work differently. How do you talk about the people and systems that hold a community together?',
              connection: 'Jesus said, "The Son of Man did not come to be served, but to serve" (Mark 10:45). Community service reflects the heart of Christ. Today we learn to describe the people and systems that serve our communities — in English.',
            },
            {
              type: 'text',
              heading: 'Community Services Vocabulary',
              body: 'Every community has systems that keep it running. Let us learn the English words for these.\n\n**Emergency Services:** fire department, police department, ambulance service (note: French "les pompiers" = "firefighters," not "pumpers"), 911 / emergency number, first responders\n\n**Health Services:** hospital, clinic, public health department, mental health services, vaccination program. French "hôpital" transfers easily, but "clinic" in English can mean a small doctor\'s office — not the same as French "clinique" which often means a private hospital.\n\n**Education:** public school, private school, library, adult education, after-school program, tutor, guidance counselor\n\n**Social Services:** food bank, homeless shelter, social worker, welfare, community center, volunteer organization, nonprofit\n\n**Government:** city hall, mayor, town council, public works, sanitation (garbage collection), water treatment\n\n**Describing Processes:**\nWhen explaining how a system works, use sequence words:\n- First... Then... Next... After that... Finally...\n- Passive voice is common: "Applications are reviewed by a committee." "Water is treated before it reaches your home."\n\nFrench speakers often avoid passive voice because French uses it less frequently. In English, passive is very natural when describing processes and systems: "The mail is delivered every morning." "Taxes are collected by the government."',
            },
            {
              type: 'text',
              heading: 'Relative Clauses: Who, Which, That',
              body: '**Relative clauses** add information about a noun. They are essential for describing people and things in detail.\n\n**WHO** — for people:\n- "The firefighter who rescued the family received an award."\n- "I spoke to the nurse who treated my brother."\n\n**WHICH** — for things:\n- "The hospital which serves our area is on Main Street."\n- "The program which provides free meals starts next week."\n\n**THAT** — for people OR things (less formal, very common):\n- "The teacher that helped me is retiring." (people)\n- "The service that I use is excellent." (things)\n\n**French vs. English Relative Pronouns:**\nThis is a major challenge for French speakers:\n- French "qui" (subject) → English "who/which/that": "L\'homme qui parle" = "The man who is speaking"\n- French "que" (object) → English "who(m)/which/that" or NOTHING: "L\'homme que je connais" = "The man (that) I know" — you can DROP the relative pronoun when it is the object!\n- French "dont" → English "whose" or restructure: "L\'homme dont je parle" = "The man I am talking about" (NOT "The man of whom I speak" in everyday English)\n- French "où" → English "where/when": "La ville où j\'habite" = "The city where I live"\n\n**Key Rule:** In English, you can often OMIT the relative pronoun when it is the OBJECT: "The doctor (that) I visited was kind." French NEVER allows dropping "que" — so this feels strange to French speakers, but it is correct and very common.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Called to Serve',
              scriptureRef: 'Mark 10:45; Galatians 5:13',
              reflection: 'Jesus modeled servant leadership: "The Son of Man did not come to be served, but to serve, and to give his life as a ransom for many" (Mark 10:45). Paul echoes this: "Serve one another humbly in love" (Galatians 5:13). Community helpers — doctors, teachers, social workers, volunteers — reflect this principle whether they know it or not. When we describe their work, we are honoring a pattern that comes from Christ himself.',
              applicationQuestion: 'Who are the community helpers you are most grateful for? How does their service reflect the servant-heart of Jesus, even if they do not know Him?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'In French, you cannot drop "que" in a relative clause: "L\'homme que je connais." In English, you CAN drop "that": "The man I know." Why do you think English allows this? Practice saying three sentences with and without "that."',
                'Describe how a food bank works using at least four sequence words (first, then, next, finally) and at least one passive voice sentence.',
                'French "dont" is tricky to translate. How would you say "La femme dont le fils est médecin" in English? What about "Le livre dont je parle"?',
              ],
            },
            {
              type: 'practice',
              activity: 'Community Description Challenge',
              prompt: 'Choose a community service (fire department, library, food bank, hospital, or school). Write a detailed description of how it works using:\n- At least 4 relative clauses with who, which, or that\n- At least 2 passive voice sentences\n- Sequence words to describe a process\n- At least 6 community vocabulary words\n\nExample starter: "The fire department is a service that responds to emergencies. Firefighters, who train for years, are the first people who arrive at a fire..."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word essay: "The Community Helper I Admire Most." Describe a specific type of community helper, explain what they do and why their work matters, and connect their service to the biblical principle of servant leadership. Your essay must include:\n- At least 5 relative clauses (mix of who, which, that)\n- At least 2 passive voice sentences\n- A clear process description with sequence words\n- A paragraph connecting their service to Mark 10:45 or Galatians 5:13\n\nAfter your essay, write a "Grammar Check" listing every relative clause you used and whether the pronoun is functioning as subject or object.',
            },
            {
              type: 'practice',
              prompt: 'Translate these French sentences into natural English, paying careful attention to relative pronouns:\n1. "Le médecin qui travaille à l\'hôpital est très gentil."\n2. "Le programme que le gouvernement a créé aide les familles pauvres."\n3. "La ville où je suis né a un excellent service de pompiers."\n4. "L\'école dont le directeur est mon oncle se trouve dans le centre-ville."\n5. "Les bénévoles qui aident à la banque alimentaire sont généreux."',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Community Services and Helpers',
        estimatedMinutes: 55,
        objectives: [
          'Learn vocabulary for public services and community organizations.',
          'Describe systems and processes using sequence words.',
          'Use relative clauses with who, which, and that to describe people and things.',
          'Understand key differences between French and English relative pronouns.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Think about all the people who help your community: teachers, doctors, police officers, librarians. In English, how do we describe these people and what they do? Today we learn the words and grammar structures you need.',
              connection: 'Jesus said He came "not to be served, but to serve" (Mark 10:45). Community helpers show us what service looks like. Let us learn to describe their important work in English.',
            },
            {
              type: 'text',
              heading: 'Community Services and Relative Clauses',
              body: '**Community Services Vocabulary:**\n- Emergency: fire department, police, ambulance, first responders\n- Health: hospital, clinic, public health, vaccination\n- Education: public school, library, tutor, after-school program\n- Social: food bank, homeless shelter, social worker, volunteer, nonprofit\n- Government: city hall, mayor, public works\n\n**Relative Clauses — Adding Details:**\nA relative clause gives more information about a noun.\n\n**WHO** = for people: "The teacher who helped me is kind."\n**WHICH** = for things: "The hospital which is near my house is new."\n**THAT** = for people or things: "The service that helps families is free."\n\n**French vs. English:**\n- French "qui" (subject) = English who/which/that\n- French "que" (object) = English who/which/that — but in English, you can DROP it!\n  - "L\'homme que je connais" = "The man I know" (no "that" needed!)\n- French "où" = English "where": "La ville où j\'habite" = "The city where I live"\n\n**Describing Processes:** Use sequence words: First, Then, Next, After that, Finally.\nExample: "First, people donate food. Then, volunteers sort the items. Finally, families pick up their bags."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Called to Serve',
              scriptureRef: 'Mark 10:45',
              reflection: 'Jesus said, "The Son of Man did not come to be served, but to serve." Community helpers — doctors, teachers, firefighters, volunteers — show us what service looks like. Their work reflects the heart of Jesus whether they realize it or not.',
              applicationQuestion: 'Which community helper are you most grateful for? How does their work remind you of how Jesus served others?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'In French you must always keep "que": "L\'homme que je connais." In English you can say "The man I know" without "that." Can you make three sentences where you drop the relative pronoun?',
                'Describe how a library works using First, Then, Next, Finally.',
                'What is the difference between "who," "which," and "that"? When can you use "that" for people?',
              ],
            },
            {
              type: 'practice',
              activity: 'Relative Clause Practice',
              prompt: 'Combine each pair of sentences into one sentence using who, which, or that.\n\n1. The firefighter saved the child. The firefighter is my neighbor.\n2. The library has many books. The library is on Oak Street.\n3. The social worker helps families. I met the social worker yesterday.\n4. The food bank is open on Saturdays. The food bank serves 200 families.\n5. The doctor treated my mother. The doctor works at the clinic.\n\nFor sentence 3, write it two ways: with "that" and without any relative pronoun.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words about a community service that is important to you. Describe what it does, who works there, and how it helps people. Use:\n- At least 3 relative clauses with who, which, or that\n- Sequence words to describe how the service works\n- A sentence connecting community service to Mark 10:45',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Community Services and Helpers',
        estimatedMinutes: 40,
        objectives: [
          'Learn basic vocabulary for community services and helpers.',
          'Use who and that to describe people and things.',
          'Describe a simple process using first, then, finally.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Who helps your community? Doctors, teachers, firefighters, police officers. Today we learn English words for these helpers and how to describe what they do.',
              connection: 'Jesus came to serve others, not to be served (Mark 10:45). Community helpers serve others every day. Let us learn to talk about them in English.',
            },
            {
              type: 'text',
              heading: 'Community Helpers and Descriptions',
              body: '**Community Helpers:**\nfirefighter, police officer, doctor, nurse, teacher, librarian, social worker, volunteer\n\n**Community Services:**\nhospital, fire station, police station, library, food bank, school, city hall\n\n**Describing People with WHO and THAT:**\n- "The teacher **who** helps me is kind." (who = for people)\n- "The hospital **that** is near my house is big." (that = for things)\n- "The doctor **who** treated me was friendly."\n\n**French Tip:** In French you use "qui" and "que." In English, "who" and "that" work differently. Don\'t say "the person which" — say "the person who."\n\n**Describing a Process:**\nUse these words: **First... Then... Finally...**\n- "First, you call 911. Then, the firefighters come. Finally, they put out the fire."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Serving Others',
              scriptureRef: 'Mark 10:45',
              reflection: 'Jesus came to serve, not to be served. Community helpers serve others every day. When we help people in our community, we follow Jesus\' example.',
              applicationQuestion: 'How can you serve someone in your community this week?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Name three community helpers. What does each one do?',
                'What is the difference between "who" and "that" when describing people?',
              ],
            },
            {
              type: 'practice',
              activity: 'Describe Community Helpers',
              prompt: 'Complete these sentences with who or that:\n1. The firefighter ___ rescued the cat is brave.\n2. The library ___ is on my street has many books.\n3. The nurse ___ works at the clinic helped my sister.\n4. The food bank ___ opened last year helps many families.\n\nNow write your own: describe a community helper using "who" in a sentence.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words about your favorite community helper. Say who they are, what they do, and why they are important. Use "who" or "that" at least twice. Use First, Then, Finally to describe what they do. Include one sentence about how they follow Jesus\' example of serving others.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'community service', definition: 'Work done by people to help others in their area without being paid', example: 'Volunteers do community service at the food bank every Saturday.' },
      { term: 'first responder', definition: 'A person (like a firefighter, police officer, or paramedic) who is first to arrive at an emergency', example: 'The first responders who arrived at the accident saved three lives.' },
      { term: 'relative clause', definition: 'A group of words that gives more information about a noun, usually starting with who, which, or that', example: '"The teacher who helped me" contains a relative clause.' },
      { term: 'nonprofit', definition: 'An organization that uses its money to help people rather than to make profit', example: 'The nonprofit that runs the shelter serves meals to 100 people daily.' },
      { term: 'volunteer', definition: 'A person who offers to do work without being paid', example: 'The volunteers who work at the clinic are all retired nurses.' },
      { term: 'social worker', definition: 'A professional who helps people with problems in their lives, such as poverty or family issues', example: 'A social worker is someone who helps families that are in difficult situations.' },
      { term: 'passive voice', definition: 'A sentence structure where the action is done TO the subject: "The food was donated" instead of "People donated the food"', example: 'In process descriptions, passive voice is common: "Applications are reviewed by the committee."' },
    ],
    quiz: [
      { question: 'Which relative pronoun is used for PEOPLE?', options: ['which', 'who', 'where', 'whose'], correctAnswer: 1, explanation: '"Who" is used for people: "The doctor who treated me was kind."' },
      { question: '"The hospital ___ is near my house has an emergency room."', options: ['who', 'which', 'whom', 'whose'], correctAnswer: 1, explanation: '"Which" or "that" is used for things. "The hospital which is near my house..."' },
      { question: 'In French you say "L\'homme que je connais." In English you can say:', options: ['The man which I know.', 'The man whom I know.', 'The man I know.', 'Both B and C are correct.'], correctAnswer: 3, explanation: 'In English, you can say "The man whom I know" (formal) or "The man I know" (dropping the pronoun). Both are correct.' },
      { question: 'Which word means a person who helps others without being paid?', options: ['employee', 'volunteer', 'customer', 'resident'], correctAnswer: 1, explanation: 'A volunteer is someone who offers their time and work for free to help others.' },
      { question: '"First, people donate food. ___, volunteers sort it. Finally, families pick it up."', options: ['Then', 'Because', 'Although', 'However'], correctAnswer: 0, explanation: 'Sequence words like "First... Then... Finally..." describe the steps of a process.' },
      { question: 'Which sentence uses a relative clause correctly?', options: ['The teacher who she helped me.', 'The teacher who helped me is kind.', 'The teacher helped me who is kind.', 'Who the teacher helped me is kind.'], correctAnswer: 1, explanation: 'The relative clause "who helped me" comes directly after the noun it describes ("the teacher").' },
      { question: 'French "dont" is often translated into English as:', options: ['who', 'which', 'whose or a restructured sentence', 'where'], correctAnswer: 2, explanation: 'French "dont" can become "whose" (possession) or requires restructuring: "dont je parle" = "I am talking about."' },
      { question: 'Which sentence is in PASSIVE voice?', options: ['The volunteer helped the family.', 'The family was helped by the volunteer.', 'The family needed help.', 'Volunteers always help families.'], correctAnswer: 1, explanation: 'Passive voice: the subject receives the action. "The family was helped by the volunteer."' },
      { question: 'According to Mark 10:45, Jesus came to:', options: ['be served by others', 'serve and give His life', 'build a community center', 'teach relative clauses'], correctAnswer: 1, explanation: 'Jesus said, "The Son of Man did not come to be served, but to serve, and to give his life as a ransom for many."' },
      { question: 'In which sentence can you DROP the relative pronoun?', options: ['The firefighter who saved the child is brave.', 'The doctor that I visited was kind.', 'The hospital which has an ER is nearby.', 'The teacher who teaches math is strict.'], correctAnswer: 1, explanation: 'You can drop the relative pronoun when it is the OBJECT: "The doctor I visited was kind." In the other sentences, the pronoun is the SUBJECT and cannot be dropped.' },
    ],
  },

  // ── W27: Rights, Responsibilities, and Values (INSTRUCTION) ───────────────
  {
    weekNumber: 3,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Rights, Responsibilities, and Values',
        estimatedMinutes: 70,
        objectives: [
          'Acquire civic vocabulary: rights, responsibilities, duties, laws, justice, equality, freedom.',
          'Express obligations and permissions using must, have to, be allowed to, may, and can.',
          'Discuss values and moral questions respectfully in English, using hedging language.',
          'Contrast French civic vocabulary patterns with English equivalents.',
          'Connect civic responsibility to the biblical worldview of community, justice, and service.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What is the difference between a "right" and a "responsibility"? In French, "droit" means both "right" and "law" — but in English, these are separate words with distinct meanings. And when we discuss values like justice and freedom, how do we do it respectfully when people disagree?',
              connection: 'The Bible speaks extensively about justice, responsibility, and caring for others. Micah 6:8 says God requires us "to act justly, to love mercy, and to walk humbly with your God." Understanding civic language in English helps us participate in conversations about justice and responsibility — conversations that matter to God.',
            },
            {
              type: 'text',
              heading: 'Civic Vocabulary and Obligations',
              body: '**Key Civic Terms:**\n- **Right** (noun): something you are legally or morally entitled to: "the right to education," "human rights." In French, "droit" can mean right, law, or straight — in English, these are three different words!\n- **Responsibility / duty**: something you are expected or required to do: "It is our responsibility to vote." "Citizens have a duty to obey the law."\n- **Freedom / liberty**: the state of being free to act or think without restriction\n- **Justice**: fair treatment under the law; doing what is right\n- **Equality**: the state of all people being treated the same way\n- **Law / legislation**: rules made by the government that everyone must follow\n- **Citizen / citizenship**: a person who belongs to a country and has rights and responsibilities there\n\n**Expressing Obligation and Permission:**\n- **Must / must not** — strong obligation or prohibition: "Citizens must pay taxes." "You must not steal."\n- **Have to / don\'t have to** — external obligation or no obligation: "You have to get a visa to travel there." "You don\'t have to vote, but you should." (Note: "don\'t have to" ≠ "must not"! This is a HUGE mistake French speakers make. "You don\'t have to go" means it is not necessary. "You must not go" means it is forbidden.)\n- **Be allowed to / not be allowed to** — permission: "You are allowed to protest peacefully." "Students are not allowed to use phones in class."\n- **May / may not** — formal permission: "You may enter." "You may not park here."\n- **Can / cannot** — ability or informal permission: "You can vote at age 18."\n\n**French Speaker Alert:** French uses "devoir" for both "must" and "have to," and "pouvoir" for both "can" and "may." English makes finer distinctions. "Tu dois" could be "you must" (strong) or "you have to" (external rule) — context matters!',
            },
            {
              type: 'text',
              heading: 'Discussing Values Respectfully',
              body: 'When people discuss values like justice, freedom, and equality, they often disagree. English has special **hedging language** that allows you to express your opinion respectfully while acknowledging that others may think differently.\n\n**Hedging Phrases:**\n- "In my opinion..." / "From my perspective..."\n- "I believe that..." / "I tend to think that..."\n- "It seems to me that..."\n- "Some people argue that... while others believe..."\n- "I understand your point, but I think..."\n- "That is a valid perspective, however..."\n\n**Agreeing Partially:**\n- "I agree to some extent, but..."\n- "You make a good point, although..."\n- "That is partly true, yet..."\n\n**Disagreeing Politely:**\n- "I see it differently because..."\n- "I respectfully disagree because..."\n- "I understand why you think that, but I believe..."\n\nFrench discussion culture tends to be more direct and confrontational (the art of "débat"). English, especially in formal and academic contexts, values showing that you have considered the other side before presenting your own view. This does not mean being weak — it means being intellectually honest and charitable.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Justice, Mercy, and Humility',
              scriptureRef: 'Micah 6:8; Romans 13:1-7',
              reflection: 'Micah 6:8 gives us God\'s summary of civic virtue: "Act justly, love mercy, walk humbly with your God." Romans 13 teaches respect for governing authorities while holding them to God\'s standard of justice. As Christians, we have both civic responsibilities (obeying laws, paying taxes, contributing to society) and a higher calling (advocating for justice, protecting the vulnerable, speaking truth). Learning to discuss these values in English expands our ability to participate in these vital conversations.',
              applicationQuestion: 'How do you balance the command to "act justly" with the command to "walk humbly"? Can you be passionate about justice and humble at the same time? How does hedging language help?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Explain the difference between "You don\'t have to vote" and "You must not vote." Why is this distinction so confusing for French speakers who use "ne pas devoir" for both?',
                'Practice hedging: Restate this opinion three different ways using hedging language: "Everyone should learn English." Make each version more diplomatic than the last.',
                'What is the difference between a "right" and a "privilege"? Is education a right or a privilege? Use civic vocabulary and hedging language in your answer.',
              ],
            },
            {
              type: 'practice',
              activity: 'Civic Discussion Simulation',
              prompt: 'Read this statement: "All citizens should be required to do one year of community service after finishing school."\n\nWrite TWO paragraphs:\n1. An argument IN FAVOR of this idea (using must, have to, obligations vocabulary, and hedging language)\n2. An argument AGAINST this idea (using rights, freedom vocabulary, and respectful disagreement phrases)\n\nEach paragraph should be 80-120 words. Use at least 3 civic vocabulary words and 2 hedging phrases per paragraph. After both paragraphs, write your own opinion in 2-3 sentences, connecting it to Micah 6:8.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word opinion essay: "What responsibilities do citizens have to their community?" Your essay must include:\n- At least 8 civic vocabulary words\n- Correct use of must, have to, be allowed to, and may\n- Hedging language when presenting opinions\n- A paragraph connecting civic responsibility to biblical values (Micah 6:8)\n- An acknowledgment of a different perspective (using respectful disagreement phrases)\n\nAfter your essay, write a "French Speaker Checklist" noting 3 places where a French speaker might confuse obligation/permission modals.',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Rights, Responsibilities, and Values',
        estimatedMinutes: 55,
        objectives: [
          'Learn civic vocabulary: rights, responsibilities, laws, justice, freedom.',
          'Use must, have to, and be allowed to correctly.',
          'Discuss opinions respectfully using hedging language.',
          'Understand the difference between must not and don\'t have to.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What are your rights as a student? What are your responsibilities? In English, "right" and "responsibility" are very different words — but in French, "droit" can mean many things. Let us sort this out today.',
              connection: 'The Bible says to "act justly, love mercy, and walk humbly with your God" (Micah 6:8). God cares about how we treat each other in community. Today we learn to discuss these important ideas in English.',
            },
            {
              type: 'text',
              heading: 'Civic Words and Modals of Obligation',
              body: '**Civic Vocabulary:**\n- **Right**: something you are entitled to ("the right to speak freely")\n- **Responsibility / duty**: something you must do ("the responsibility to follow the law")\n- **Freedom**: being free to act or think ("freedom of speech")\n- **Justice**: fair treatment for all ("justice for everyone")\n- **Law**: a rule everyone must follow\n- **Citizen**: a person who belongs to a country\n\n**Modals of Obligation and Permission:**\n- **Must** = strong obligation: "You must follow the rules."\n- **Have to** = external rule: "We have to wear uniforms at school."\n- **Must not** = forbidden: "You must not cheat on tests."\n- **Don\'t have to** = not necessary: "You don\'t have to run — walking is fine."\n\n**BIG DIFFERENCE:** "Must not" = forbidden. "Don\'t have to" = it is your choice. French speakers often confuse these!\n\n- **Be allowed to** = have permission: "You are allowed to use a calculator."\n- **May** = formal permission: "You may leave early today."\n\n**Discussing Opinions Respectfully:**\n- "In my opinion..." / "I believe that..."\n- "I understand your point, but..."\n- "Some people think... while others believe..."\n- "I respectfully disagree because..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Justice and Mercy',
              scriptureRef: 'Micah 6:8',
              reflection: 'God tells us three things: act justly (do what is fair), love mercy (be kind and forgiving), and walk humbly (don\'t think you are always right). When we discuss rights and responsibilities, these three things should guide us.',
              applicationQuestion: 'How can you "act justly" and "walk humbly" at the same time — especially when you disagree with someone?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "You must not leave" and "You don\'t have to leave"? Give a situation for each.',
                'Name two rights and two responsibilities that students have at school.',
                'Practice being respectful: Restate "You are wrong about that" using hedging language.',
              ],
            },
            {
              type: 'practice',
              activity: 'Must, Have to, or Allowed to?',
              prompt: 'Fill in each blank with must, have to, must not, don\'t have to, or be allowed to:\n\n1. Students ___ cheat on exams. (forbidden)\n2. Citizens ___ pay taxes. (it is the law)\n3. You ___ wear a suit to school — jeans are fine. (not necessary)\n4. In most countries, children ___ go to school until age 16. (required by law)\n5. You ___ use your phone during break time. (you have permission)\n6. Drivers ___ stop at red lights. (strong obligation)\n\nNow write 3 sentences of your own about rights and responsibilities at your school.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words about the rights and responsibilities of students. Include:\n- At least 5 civic vocabulary words\n- Must, have to, must not, and don\'t have to (at least one of each)\n- At least two hedging phrases when sharing opinions\n- A connection to Micah 6:8',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Rights, Responsibilities, and Values',
        estimatedMinutes: 40,
        objectives: [
          'Learn basic civic vocabulary: rights, responsibilities, rules, freedom.',
          'Use must and have to for obligations.',
          'Know the difference between must not (forbidden) and don\'t have to (not necessary).',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What rules do you follow at school? What are you allowed to do? Today we learn how to talk about rules, rights, and responsibilities in English.',
              connection: 'God tells us to act fairly and be kind to others (Micah 6:8). Rules and responsibilities help us live together well. Let us learn these words in English.',
            },
            {
              type: 'text',
              heading: 'Rules, Rights, and Responsibilities',
              body: '**Important Words:**\n- **Right**: something you can do ("You have the right to speak.")\n- **Responsibility**: something you must do ("You have the responsibility to be honest.")\n- **Rule / law**: something everyone must follow\n- **Freedom**: being free to act or choose\n\n**Must and Have to:**\n- **Must** = you are required: "You must be on time for class."\n- **Have to** = there is a rule: "I have to wear a uniform."\n- **Must not** = FORBIDDEN: "You must not hit anyone." (You cannot do this!)\n- **Don\'t have to** = NOT NECESSARY: "You don\'t have to bring lunch — the school provides it." (You can choose.)\n\n**French Speaker Tip:** In French, "ne pas devoir" can mean either "must not" or "don\'t have to." In English, they are VERY different!\n- "You must not leave" = It is FORBIDDEN to leave.\n- "You don\'t have to leave" = You CAN stay if you want.\n\n**Sharing Opinions Politely:**\n- "I think..." / "In my opinion..."\n- "I disagree because..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Doing What Is Right',
              scriptureRef: 'Micah 6:8',
              reflection: 'God wants us to act fairly, be kind, and stay humble. Following rules and respecting others\' rights is part of following God.',
              applicationQuestion: 'What is one responsibility you have at school or at home? How does doing it honor God?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "must not" and "don\'t have to"? Give an example of each.',
                'Name one right and one responsibility you have at school.',
              ],
            },
            {
              type: 'practice',
              activity: 'Must or Don\'t Have To?',
              prompt: 'Choose must, must not, or don\'t have to for each sentence:\n1. You ___ be kind to others. (required)\n2. You ___ steal. (forbidden)\n3. You ___ eat in the cafeteria — you can bring your own lunch. (not necessary)\n4. Students ___ arrive before 8:00 AM. (required)\n5. You ___ run in the hallways. (forbidden)',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words about the rules at your school. What must you do? What must you not do? What don\'t you have to do? Use must, must not, and don\'t have to at least once each. Include one sentence about why rules help us live together, connected to Micah 6:8.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'right', definition: 'Something you are legally or morally allowed to have or do', example: 'Everyone has the right to an education.' },
      { term: 'responsibility', definition: 'Something you are required or expected to do; a duty', example: 'It is our responsibility to help those in need.' },
      { term: 'justice', definition: 'Fair treatment for all people under the law', example: 'The Bible calls us to pursue justice for the poor and vulnerable.' },
      { term: 'must not', definition: 'Used to express that something is forbidden or prohibited', example: 'Students must not use their phones during class — it is against the rules.' },
      { term: 'don\'t have to', definition: 'Used to express that something is NOT necessary (but you can if you want)', example: 'You don\'t have to come to the party, but we would love to see you there.' },
      { term: 'hedging language', definition: 'Phrases that soften your opinion and show respect for other viewpoints', example: 'Using "In my opinion" and "I believe" is hedging — it shows you know others may disagree.' },
      { term: 'citizen', definition: 'A person who legally belongs to a country and has rights and duties there', example: 'Citizens have the right to vote and the responsibility to obey the law.' },
      { term: 'equality', definition: 'The state of everyone being treated fairly and having the same opportunities', example: 'The movement for equality seeks justice for all people regardless of background.' },
    ],
    quiz: [
      { question: '"You ___ not steal." (it is forbidden)', options: ['have', 'must', 'do', 'don\'t'], correctAnswer: 1, explanation: '"Must not" expresses prohibition — something that is forbidden.' },
      { question: '"You ___ bring a gift — it is not necessary."', options: ['must not', 'don\'t have to', 'must', 'are not allowed to'], correctAnswer: 1, explanation: '"Don\'t have to" means it is not necessary, not that it is forbidden.' },
      { question: 'What does "justice" mean?', options: ['being rich', 'fair treatment for all', 'following every rule', 'agreeing with everyone'], correctAnswer: 1, explanation: 'Justice means fair treatment and doing what is right for all people.' },
      { question: 'Which phrase is an example of hedging language?', options: ['You are completely wrong.', 'Obviously this is true.', 'In my opinion, this could be improved.', 'Everyone knows this.'], correctAnswer: 2, explanation: 'Hedging language like "In my opinion" softens a statement and shows respect for other viewpoints.' },
      { question: 'In French, "Tu ne dois pas partir" can mean "must not" or "don\'t have to." In English, these are:', options: ['The same thing', 'Very different — forbidden vs. not necessary', 'Used interchangeably', 'Only different in writing'], correctAnswer: 1, explanation: '"Must not" = forbidden (you cannot do this). "Don\'t have to" = not necessary (your choice). Very different!' },
      { question: '"You ___ use a dictionary during the exam." (you have permission)', options: ['must', 'must not', 'are allowed to', 'have to'], correctAnswer: 2, explanation: '"Be allowed to" expresses permission — you have the right to do this.' },
      { question: 'According to Micah 6:8, God requires us to:', options: ['Be wealthy and successful', 'Act justly, love mercy, walk humbly', 'Always agree with the government', 'Never express our opinion'], correctAnswer: 1, explanation: 'Micah 6:8: "Act justly, love mercy, and walk humbly with your God."' },
      { question: 'What is a "responsibility"?', options: ['Something you want to do', 'Something you are required or expected to do', 'Something that is optional', 'Something only adults have'], correctAnswer: 1, explanation: 'A responsibility is a duty — something you are expected to do.' },
      { question: 'Which sentence expresses DISAGREEMENT politely?', options: ['That is stupid and wrong.', 'I respectfully disagree because the evidence suggests otherwise.', 'No. You are incorrect.', 'Whatever you say.'], correctAnswer: 1, explanation: '"I respectfully disagree because..." is polite hedging that explains your reasoning while showing respect.' },
      { question: '"Citizens ___ pay taxes." (it is the law)', options: ['don\'t have to', 'must not', 'have to', 'are allowed to'], correctAnswer: 2, explanation: '"Have to" expresses an external obligation — it is required by law.' },
    ],
  },

  // ── W28: Community Health Plan (PROJECT) ──────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Community Health Plan',
        estimatedMinutes: 70,
        objectives: [
          'Research and analyze a real community health need using English-language sources.',
          'Develop a structured health plan with research, analysis, and actionable recommendations.',
          'Apply modals of advice and obligation, relative clauses, and civic vocabulary in an extended written project.',
          'Present findings using hedging language and respectful academic tone.',
          'Connect community health to biblical stewardship and the call to serve others.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine your community is facing a health crisis — maybe not enough clean water, or a rising number of people with diabetes, or teenagers struggling with mental health. You have the power to propose a plan that could change things. What would you do? Where would you start?',
              connection: 'Throughout the Bible, God\'s people are called to care for their communities. Jeremiah told the exiles: "Seek the welfare of the city where I have sent you" (Jeremiah 29:7). A community health plan is one practical way to seek the welfare of your city.',
            },
            {
              type: 'text',
              heading: 'Developing a Community Health Plan',
              body: 'A community health plan identifies a real problem and proposes solutions. Here is the structure you will follow:\n\n**1. Problem Identification:** What is the health issue? Who does it affect? Use relative clauses to describe the population: "Families who live in rural areas often lack access to clinics that provide affordable care."\n\n**2. Research and Data:** Find facts and statistics that prove the problem is real and serious. Use hedging language: "Research suggests that..." "According to the WHO..." "It appears that approximately..."\n\n**3. Analysis:** Explain WHY this problem exists. Use modals: "Communities must invest in prevention." "Citizens should have access to basic healthcare." "Governments ought to fund public health programs."\n\n**4. Recommendations:** Propose 3-5 specific, actionable solutions. Use should, ought to, must, and have to: "Schools should provide free breakfast programs." "The government must allocate funding for mental health services."\n\n**5. Biblical Connection:** How does this plan connect to God\'s call to love our neighbors and seek the welfare of our community?\n\n**Language Toolkit for This Project:**\n- Civic vocabulary: rights, responsibilities, justice, equality, public health, legislation\n- Modals: should, ought to, must, have to, had better, be allowed to\n- Relative clauses: who, which, that, where\n- Hedging: "It seems that..." "Evidence suggests..." "In my opinion..."\n- Process description: First... Then... Next... Finally...',
            },
            {
              type: 'biblical-worldview',
              theme: 'Seeking the Welfare of the City',
              scriptureRef: 'Jeremiah 29:7; Matthew 25:35-40',
              reflection: 'Jeremiah told God\'s people to "seek the welfare of the city" even when they were exiles in a foreign land. Jesus said that when we feed the hungry, care for the sick, and welcome the stranger, we are doing it for Him (Matthew 25:35-40). A community health plan is a practical expression of loving your neighbor.',
              applicationQuestion: 'If Jesus calls us to care for the sick and hungry, how should that shape the way we think about community health? Is health a right, a privilege, or both?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What health issues affect your community (or a community you know about)? Brainstorm at least three possibilities.',
                'Why is research important before proposing solutions? What happens when people make recommendations without understanding the problem?',
                'How can you discuss a sensitive health topic (like mental health or nutrition) respectfully using hedging language?',
              ],
            },
            {
              type: 'practice',
              activity: 'Plan Outline Development',
              prompt: 'Choose one community health issue and create a detailed outline for your health plan:\n\n1. **Problem:** Write 2-3 sentences describing the issue, using at least one relative clause.\n2. **Research:** List 3 facts or statistics you would look for (you may create realistic examples for practice).\n3. **Analysis:** Write 2 sentences explaining why this problem exists, using modals.\n4. **Recommendations:** List 3 specific solutions using should, ought to, or must.\n5. **Biblical Connection:** Write 1-2 sentences connecting your plan to Jeremiah 29:7 or Matthew 25.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write your complete Community Health Plan (400-500 words). Follow this structure:\n\n**Section 1 — The Problem (80-100 words):** Describe the health issue, who it affects, and why it matters. Use relative clauses and civic vocabulary.\n\n**Section 2 — Research & Data (80-100 words):** Present facts, statistics, or expert opinions that demonstrate the severity of the problem. Use hedging language.\n\n**Section 3 — Analysis (80-100 words):** Explain the root causes. Why does this problem exist? What systems or circumstances contribute to it?\n\n**Section 4 — Recommendations (80-100 words):** Propose 3-4 specific solutions. Use modals of advice and obligation. Describe implementation using sequence words.\n\n**Section 5 — Biblical Reflection (60-80 words):** Connect your plan to Scripture. How does seeking community health honor God?\n\nYour plan must include: at least 10 vocabulary words from Units 7 W25-W27, at least 4 relative clauses, at least 5 different modals, and at least 3 hedging phrases.',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Community Health Plan',
        estimatedMinutes: 55,
        objectives: [
          'Identify a community health need and propose solutions.',
          'Write a structured plan using modals, relative clauses, and civic vocabulary.',
          'Present ideas using hedging language and respectful tone.',
          'Connect community health to biblical values.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could fix one health problem in your community, what would it be? Maybe more access to healthy food, better mental health support, or cleaner water? Today you will create a plan to address a real community need.',
              connection: 'God tells us to "seek the welfare of the city" (Jeremiah 29:7). Creating a health plan for your community is one way to follow this command.',
            },
            {
              type: 'text',
              heading: 'How to Write a Community Health Plan',
              body: 'A community health plan has four parts:\n\n**1. The Problem:** What is the health issue? Who does it affect?\nExample: "Many families who live in our community don\'t have access to affordable healthcare."\n\n**2. The Facts:** What evidence shows this is a real problem?\nExample: "According to recent data, one in four children in this area does not visit a doctor regularly."\n\n**3. The Solutions:** What should be done?\nExample: "The government should fund a free clinic." "Schools ought to teach nutrition." "Parents must have access to health information."\n\n**4. Biblical Connection:** Why does God care about community health?\nExample: "Jesus said that caring for the sick is like caring for Him (Matthew 25:36)."\n\n**Language Tools:**\n- Relative clauses: "Families who can\'t afford healthcare..." "The clinic that serves our area..."\n- Modals: should, ought to, must, have to, had better\n- Hedging: "Research suggests..." "It seems that..." "In my opinion..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Caring for Our Community',
              scriptureRef: 'Jeremiah 29:7; Matthew 25:35-40',
              reflection: 'God calls us to seek the good of our community and to care for the sick and hungry. When we plan for better community health, we are doing what Jesus asked us to do.',
              applicationQuestion: 'Why do you think God wants us to care about the health of our whole community, not just our own family?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What health problems do you see in your community or school? List at least two.',
                'Why is it important to use facts and research when proposing a plan, instead of just opinions?',
                'How would you describe the people affected by a health problem using a relative clause?',
              ],
            },
            {
              type: 'practice',
              activity: 'Plan Outline',
              prompt: 'Choose a health issue and create an outline:\n1. Problem: Describe it in 2 sentences (use a relative clause).\n2. Facts: List 2 facts or statistics (create realistic ones if needed).\n3. Solutions: Write 2 solutions using should or must.\n4. Biblical Connection: Write 1 sentence connecting your plan to Scripture.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write your Community Health Plan (250-350 words):\n\n**The Problem:** Describe the issue and who it affects. (50-80 words)\n**The Facts:** Give 2-3 facts that prove the problem is serious. (50-80 words)\n**The Solutions:** Propose 2-3 solutions using modals. (50-80 words)\n**Biblical Reflection:** Why does God care about this issue? (40-60 words)\n\nUse at least 6 vocabulary words from Unit 7, at least 2 relative clauses, and at least 3 modals.',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Community Health Plan',
        estimatedMinutes: 40,
        objectives: [
          'Identify a health problem in a community.',
          'Propose simple solutions using should, must, and have to.',
          'Write a basic plan with correct grammar and vocabulary.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What health problem would you like to fix in your community? Not enough healthy food? Not enough exercise? Too much stress? Today you will make a simple plan to help.',
              connection: 'God says to "seek the good of your city" (Jeremiah 29:7). Making a health plan is one way to help your community, just like Jesus helped people who were sick.',
            },
            {
              type: 'text',
              heading: 'Making a Simple Health Plan',
              body: 'A health plan has three parts:\n\n**1. The Problem:** What is wrong?\nExample: "Many students who go to our school skip breakfast."\n\n**2. The Solution:** What should happen?\nExample: "The school should provide free breakfast."\n\n**3. Why It Matters:** Why is this important?\nExample: "Students who eat breakfast do better in school. God wants us to care for others."\n\n**Useful Words:**\n- should, must, have to\n- who, that (for describing people and things)\n- First, Then, Finally (for steps)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Helping Others',
              scriptureRef: 'Jeremiah 29:7; Matthew 25:36',
              reflection: 'God wants us to help make our community healthy. Jesus said that when we help sick people, we are helping Him.',
              applicationQuestion: 'How can you help make your community healthier?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is one health problem you see in your school or community?',
                'What is one thing that should change to fix this problem?',
              ],
            },
            {
              type: 'practice',
              activity: 'Plan Your Ideas',
              prompt: 'Answer these questions to plan your project:\n1. What health problem will you write about?\n2. Who does it affect?\n3. What are two things that should happen to fix it?\n4. Why does God care about this problem?',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write your Community Health Plan (150-200 words):\n- Describe the health problem (2-3 sentences)\n- Give 2 solutions using should or must\n- Explain why this matters (1-2 sentences)\n- Include one sentence about why God cares about community health\n\nUse at least 4 vocabulary words from Unit 7 and at least one relative clause with "who" or "that."',
            },
          ],
        },
      },
    ],
    vocabulary: [],
    quiz: [],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 8: DREAMS AND AMBITIONS (W29–W32)
// ═══════════════════════════════════════════════════════════════════════════════

const unit8Lessons: EnrichedLesson[] = [

  // ── W29: Planning for the Future (INSTRUCTION) ────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Planning for the Future',
        estimatedMinutes: 70,
        objectives: [
          'Distinguish between will, going to, and present continuous for future plans, predictions, and scheduled events.',
          'Use life goals and ambitions vocabulary fluently in extended discourse.',
          'Contrast English and French future tense systems, identifying key transfer errors.',
          'Articulate personal goals and plans using appropriate future forms.',
          'Reflect on how biblical promises about the future inform our planning.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you think about your future, which English sentence feels right: "I will be a doctor," "I am going to be a doctor," or "I am being a doctor next year"? In French, "je serai médecin" covers most future meanings — but English splits the future into three different forms, each with its own meaning. Why?',
              connection: 'Jeremiah 29:11 says, "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." God plans for our future — and He invites us to plan wisely too. Today we learn the English grammar that lets us talk about our plans, predictions, and dreams.',
            },
            {
              type: 'text',
              heading: 'Three Ways to Talk About the Future in English',
              body: 'English has three main ways to express future meaning, and each one carries a different nuance.\n\n**1. WILL + base verb — Predictions, promises, spontaneous decisions:**\n- Prediction: "I think technology will change education completely."\n- Promise: "I will help you with your homework tonight."\n- Spontaneous decision: "It\'s cold — I\'ll close the window." (decided right now)\n- Willingness: "I\'ll carry that for you."\n\n**2. GOING TO + base verb — Plans and intentions decided before now, evidence-based predictions:**\n- Plans: "I\'m going to study medicine after high school." (decided already)\n- Evidence-based prediction: "Look at those clouds — it\'s going to rain." (you can SEE the evidence)\n\n**3. PRESENT CONTINUOUS — Scheduled arrangements:**\n- "I\'m meeting my advisor tomorrow at 2:00." (it is scheduled/arranged)\n- "We\'re flying to New York next Friday." (tickets are bought)\n\n**French vs. English Future:**\nThis is where French speakers get confused. French has:\n- Future simple: "je serai" — maps to BOTH "I will be" and "I am going to be"\n- Future proche: "je vais être" — maps to "I am going to be" but NOT to present continuous\n- No equivalent of the English present continuous for future\n\n**Common French Speaker Errors:**\n- WRONG: "I will go to the doctor tomorrow at 3." (if it is scheduled) → RIGHT: "I\'m going to the doctor tomorrow at 3." (present continuous for arrangements)\n- WRONG: "I go to study medicine." → RIGHT: "I\'m going to study medicine." (don\'t forget "going to")\n- WRONG: "I will be a teacher — I decided last year." → RIGHT: "I\'m going to be a teacher." (already decided = going to)',
            },
            {
              type: 'text',
              heading: 'Life Goals and Ambitions Vocabulary',
              body: '**Career and Education:**\n- ambition, aspiration, goal, dream, plan, career path\n- degree, diploma, scholarship, major (area of study)\n- internship, apprenticeship, gap year, vocational training\n- to pursue (a career), to achieve (a goal), to strive for\n\n**Talking About the Future:**\n- "My long-term goal is to..." / "In the short term, I plan to..."\n- "I aspire to..." / "I dream of (+ -ing)..."\n- "I hope to..." (less certain) / "I intend to..." (more certain)\n- "If everything goes well..." / "God willing..." / "I\'m aiming for..."\n\n**French Transfer Notes:**\n- "Carrière" → "career" (same meaning, but pronunciation is completely different)\n- "Diplôme" → "diploma" or "degree" (a "degree" is from a university; a "diploma" is from high school or a shorter program)\n- "Stage" → "internship" (NOT "stage" — "stage" in English means a platform for performances!)\n- "Formation" → "training" (NOT "formation" — "formation" in English means the act of forming something)',
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plans and Our Plans',
              scriptureRef: 'Jeremiah 29:11; Proverbs 16:9; James 4:13-15',
              reflection: 'The Bible holds two truths in tension: God has plans for us (Jeremiah 29:11), AND we are called to plan wisely (Proverbs 16:9: "A man\'s heart plans his way, but the Lord directs his steps"). James adds a crucial caveat: "If it is the Lord\'s will, we will live and do this or that" (James 4:15). Biblical planning means setting goals with open hands — working hard toward our ambitions while trusting that God may redirect our path. This is not passive fatalism; it is active trust.',
              applicationQuestion: 'How do you balance making ambitious plans with trusting God\'s direction? Have you ever had a plan that God redirected? What did you learn?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "I will study abroad" (spontaneous/prediction) and "I\'m going to study abroad" (planned)? Create a context for each that makes the meaning clear.',
                'French uses "je vais" (futur proche) and "je ferai" (futur simple). Which English future form does each one map to? Are there situations where the mapping breaks down?',
                'Why does English use the present continuous ("I\'m meeting her tomorrow") for future arrangements? This seems strange — the action is in the future, but the verb looks like the present. Can you explain the logic?',
              ],
            },
            {
              type: 'practice',
              activity: 'Future Tense Sorting',
              prompt: 'For each situation, choose the best future form (will, going to, or present continuous) and write the sentence. Then explain your choice.\n\n1. You decided last month to learn programming. (tell someone your plan)\n2. Someone asks what you think the world will look like in 2050. (make a prediction)\n3. Your train leaves at 6:30 PM tomorrow. (state a scheduled event)\n4. You see a student who dropped their books. (offer help spontaneously)\n5. You have an appointment with your teacher at noon. (describe an arrangement)\n6. You believe your country\'s economy will improve. (give an opinion about the future)\n\nNow write 3 sentences about YOUR actual future plans using all three forms.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word personal essay: "My Plans and Dreams for the Future." Include:\n- A paragraph about your education plans (using going to for decided plans)\n- A paragraph about your career ambitions (using will for predictions and hopes)\n- A paragraph about scheduled next steps (using present continuous for arrangements)\n- At least 8 vocabulary words from the Life Goals list\n- A paragraph connecting your plans to Jeremiah 29:11 and James 4:15\n- A "French Speaker Self-Check" section noting 2 future tense errors you corrected',
            },
            {
              type: 'practice',
              prompt: 'Correct these sentences written by French speakers. Identify the error, explain why it is wrong, and provide the correct version:\n1. "I will visit my grandmother tomorrow — I bought the ticket last week."\n2. "I go to study engineering at university."\n3. "The concert starts at 8 PM. I think I go."\n4. "Look at those clouds! It will rain soon."\n5. "I decided — I will become a nurse." (decided last year)',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Planning for the Future',
        estimatedMinutes: 55,
        objectives: [
          'Use will, going to, and present continuous for different future meanings.',
          'Learn life goals and ambitions vocabulary.',
          'Identify common French-speaker errors with future tenses.',
          'Write about personal plans and dreams for the future.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How do you talk about the future in English? "I will be a teacher" or "I am going to be a teacher"? They look similar, but they mean different things! Today we learn when to use each one.',
              connection: 'God says, "I know the plans I have for you — plans for hope and a future" (Jeremiah 29:11). God has plans for us, and He wants us to plan wisely too. Let us learn to talk about our future plans in English.',
            },
            {
              type: 'text',
              heading: 'Future Tenses in English',
              body: '**Three Ways to Talk About the Future:**\n\n**1. WILL** — predictions and spontaneous decisions:\n- "I think robots will do many jobs in the future." (prediction)\n- "That bag looks heavy — I\'ll carry it for you." (decided right now)\n\n**2. GOING TO** — plans you already made:\n- "I\'m going to study biology next year." (you decided this before)\n- "Look — it\'s going to rain!" (you see evidence now)\n\n**3. PRESENT CONTINUOUS** — scheduled arrangements:\n- "I\'m meeting my tutor at 3:00 tomorrow." (it is in my calendar)\n- "We\'re flying to Paris next week." (tickets are booked)\n\n**French Speaker Tips:**\n- French "je vais + verb" ≈ "I am going to + verb"\n- French "je ferai" ≈ "I will" (but not always!)\n- English uses present continuous for scheduled events — French does NOT do this\n\n**Common Mistakes:**\n- WRONG: "I will go to the doctor tomorrow at 10." (if it\'s scheduled)\n- RIGHT: "I\'m going to the doctor tomorrow at 10."\n- WRONG: "I go to be a teacher." → RIGHT: "I\'m going to be a teacher."\n\n**Goals Vocabulary:** ambition, goal, dream, career, degree, scholarship, internship, to pursue, to achieve, to hope',
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plans and Our Dreams',
              scriptureRef: 'Jeremiah 29:11; James 4:15',
              reflection: 'God has good plans for you (Jeremiah 29:11). James says we should plan but always add "if God wills" (James 4:15). This means we can dream big AND trust God to guide our path.',
              applicationQuestion: 'What is a dream you have for your future? How can you pursue it while also trusting God\'s plan?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "I will study abroad" and "I\'m going to study abroad"? When would you use each one?',
                'Why can\'t you say "I will meet my teacher at 3:00 tomorrow" if it is a scheduled appointment? What should you say?',
                'What are your goals for the next five years? Use going to for plans you have already made.',
              ],
            },
            {
              type: 'practice',
              activity: 'Choose the Right Future',
              prompt: 'Fill in each blank with will, going to, or the present continuous form:\n\n1. I ___ (study) medicine — I decided last year.\n2. I think technology ___ (change) everything by 2050.\n3. We ___ (fly) to London next Monday. (tickets bought)\n4. That bag looks heavy! I ___ (help) you.\n5. She ___ (meet) her advisor at 2 PM tomorrow.\n6. I believe I ___ (be) successful if I work hard.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words about your future plans and dreams. Include:\n- At least 2 sentences with will (predictions or promises)\n- At least 2 sentences with going to (plans you have made)\n- At least 1 sentence with present continuous (scheduled arrangements)\n- At least 5 vocabulary words about goals and ambitions\n- A sentence connecting your plans to Jeremiah 29:11',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Planning for the Future',
        estimatedMinutes: 40,
        objectives: [
          'Use will and going to to talk about the future.',
          'Learn basic vocabulary for goals, dreams, and careers.',
          'Write about personal future plans.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What do you want to do in the future? In English, we use "will" and "going to" to talk about the future. Let us learn the difference today.',
              connection: 'God says, "I know the plans I have for you — plans for hope and a future" (Jeremiah 29:11). God has good plans for your life. Let us learn to talk about YOUR plans in English.',
            },
            {
              type: 'text',
              heading: 'Will and Going To',
              body: '**WILL** = predictions and quick decisions:\n- "I think I will be happy." (prediction)\n- "The phone is ringing — I\'ll answer it!" (quick decision)\n\n**GOING TO** = plans you already made:\n- "I\'m going to study English this summer." (you planned this)\n- "She\'s going to be a nurse." (her decision is made)\n\n**Simple Rule:** Already decided? → GOING TO. Predicting or deciding now? → WILL.\n\n**French Tip:** "Je vais étudier" = "I am going to study." Don\'t say "I go to study"!\n\n**Goals Words:** goal, dream, career, job, plan, future, hope, study, university, training',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Has Plans for You',
              scriptureRef: 'Jeremiah 29:11',
              reflection: 'God says He has good plans for you. Even when you are not sure what the future holds, God knows. You can make plans AND trust God.',
              applicationQuestion: 'What is one goal you have for your future?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "I will help you" and "I am going to help you"?',
                'Tell me one plan you have for the future using "going to."',
              ],
            },
            {
              type: 'practice',
              activity: 'Will or Going To?',
              prompt: 'Choose will or going to:\n1. I ___ (be) a teacher. (I decided last year)\n2. I think it ___ (rain) tomorrow. (prediction)\n3. She ___ (study) at university next year. (her plan)\n4. The phone is ringing — I ___ (answer) it! (quick decision)\n5. They ___ (travel) to Canada this summer. (planned trip)',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words about your future plans. Answer these questions:\n- What do you want to be when you grow up? (use going to)\n- What do you think the world will be like in 20 years? (use will)\n- What is one goal you have? Why is it important to you?\n- Include one sentence about Jeremiah 29:11.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'ambition', definition: 'A strong desire and determination to achieve something', example: 'Her ambition is to become a doctor who serves communities in need.' },
      { term: 'going to', definition: 'Used for plans and intentions already decided, or evidence-based predictions', example: 'I\'m going to study engineering — I have already applied to three universities.' },
      { term: 'will', definition: 'Used for predictions, promises, and spontaneous decisions about the future', example: 'I think technology will change education dramatically in the next decade.' },
      { term: 'present continuous (for future)', definition: 'Used for scheduled arrangements and confirmed plans', example: 'I\'m meeting my advisor tomorrow at 2:00 — it\'s already in my calendar.' },
      { term: 'career', definition: 'A job or profession that someone does for a long time', example: 'She is pursuing a career in nursing because she wants to help people.' },
      { term: 'scholarship', definition: 'Money given to a student to help pay for their education', example: 'If I study hard, I\'m going to apply for a scholarship to university.' },
      { term: 'to pursue', definition: 'To follow or work toward a goal or dream', example: 'I plan to pursue my dream of becoming an engineer, God willing.' },
      { term: 'internship', definition: 'A period of work experience, often for students (French: "stage" — NOT "stage" in English!)', example: 'I\'m going to do an internship at a hospital this summer.' },
    ],
    quiz: [
      { question: 'Which sentence expresses a PLAN already decided?', options: ['I will be a doctor.', 'I\'m going to be a doctor.', 'I\'m being a doctor.', 'I am a doctor.'], correctAnswer: 1, explanation: '"Going to" is used for plans and intentions that have already been decided.' },
      { question: '"Look at those dark clouds! It ___ rain."', options: ['will', 'is going to', 'is raining', 'rains'], correctAnswer: 1, explanation: 'When you see evidence that something is about to happen, use "going to": "It\'s going to rain."' },
      { question: 'Which sentence describes a SCHEDULED arrangement?', options: ['I will see the doctor.', 'I\'m going to see the doctor.', 'I\'m seeing the doctor at 3 PM tomorrow.', 'I see the doctor.'], correctAnswer: 2, explanation: 'Present continuous is used for scheduled arrangements with a specific time.' },
      { question: 'A French speaker says: "I go to study medicine." What is the correct English?', options: ['I go to study medicine.', 'I will to study medicine.', 'I\'m going to study medicine.', 'I am study medicine.'], correctAnswer: 2, explanation: 'The correct form is "I\'m going to study medicine." French "je vais étudier" = "I am going to study."' },
      { question: '"The phone is ringing! I ___ answer it." (spontaneous decision)', options: ['am going to', 'will', 'am answering', 'going to'], correctAnswer: 1, explanation: '"Will" is used for spontaneous decisions made in the moment.' },
      { question: 'What does "ambition" mean?', options: ['A school subject', 'A strong desire to achieve something', 'A type of job', 'A French word for "friend"'], correctAnswer: 1, explanation: 'An ambition is a strong desire and determination to achieve a goal.' },
      { question: 'In French, "stage" means internship. In English, "stage" means:', options: ['An internship', 'A platform for performances', 'A type of career', 'A school'], correctAnswer: 1, explanation: '"Stage" in English means a platform (like a theater stage). The French "stage" translates to "internship" in English.' },
      { question: '"I think robots ___ replace many jobs in the future." (prediction)', options: ['are going to', 'will', 'are replacing', 'replace'], correctAnswer: 1, explanation: '"Will" is used for predictions based on opinion or belief: "I think robots will..."' },
      { question: 'According to Jeremiah 29:11, God has plans for us that are:', options: ['Plans for suffering and difficulty', 'Plans for hope and a future', 'Plans to make us rich', 'Plans to keep us in one place'], correctAnswer: 1, explanation: 'Jeremiah 29:11: "Plans to prosper you and not to harm you, plans to give you hope and a future."' },
      { question: 'Which sentence is WRONG?', options: ['I\'m meeting my friend at 5 PM.', 'I will help you carry that.', 'I will visit grandma tomorrow — I bought the ticket last week.', 'I\'m going to study harder this semester.'], correctAnswer: 2, explanation: 'If the visit is already planned (ticket bought), use "going to" or present continuous, not "will": "I\'m going to visit grandma tomorrow."' },
    ],
  },

  // ── W30: Conditional Sentences (INSTRUCTION) ──────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Conditional Sentences',
        estimatedMinutes: 70,
        objectives: [
          'Master zero, first, and second conditional structures with correct verb forms.',
          'Distinguish between real (zero/first) and unreal (second) conditions.',
          'Compare English conditional structures with French si clauses, identifying key transfer errors.',
          'Use conditionals to express facts, predictions, hypothetical situations, and advice.',
          'Reflect on how conditional thinking connects to biblical wisdom and decision-making.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you say "Si j\'étais riche, j\'achèterais une maison" (imparfait + conditionnel). In English, the structure is similar: "If I were rich, I would buy a house." But here is the trap: French speakers often say "If I would be rich" — mixing up the if-clause and the result clause. Why does this happen, and how do we fix it?',
              connection: 'Conditional thinking is at the heart of wisdom. Proverbs is full of conditional logic: "If you seek wisdom, you will find it" (Proverbs 2:4-5). Understanding conditionals helps us reason about consequences, plan wisely, and express our hopes — all things God cares about.',
            },
            {
              type: 'text',
              heading: 'Three Types of Conditionals',
              body: '**ZERO CONDITIONAL — Facts and general truths:**\nStructure: If + present simple, present simple\n- "If you heat water to 100°C, it boils." (always true)\n- "If people don\'t sleep enough, they get sick." (general fact)\nUse: Scientific facts, general truths, things that are always true.\n\n**FIRST CONDITIONAL — Real possibilities in the future:**\nStructure: If + present simple, will + base verb\n- "If I study hard, I will pass the exam." (real possibility)\n- "If it rains tomorrow, we will stay inside." (possible future event)\nUse: Situations that are likely or possible in the real future.\n\n**SECOND CONDITIONAL — Unreal/hypothetical situations:**\nStructure: If + past simple, would + base verb\n- "If I were rich, I would travel the world." (I am NOT rich — this is imaginary)\n- "If I had more time, I would learn Japanese." (I DON\'T have more time)\nUse: Imagining situations that are not true now or are unlikely.\n\n**Special Note:** In formal English, we say "If I **were**" (not "If I was") for all persons: "If I were you..." "If he were here..." This is the **subjunctive mood**.\n\n**French vs. English — The Critical Differences:**\n- French: Si + imparfait → conditionnel: "Si j\'avais de l\'argent, j\'achèterais..."\n- English: If + past simple → would + base verb: "If I had money, I would buy..."\n- **THE #1 ERROR:** French speakers write "If I would have money" because they put "would" (conditionnel) in the if-clause. NEVER put "would" after "if" in conditionals!\n- WRONG: "If I would be rich, I would buy a house."\n- RIGHT: "If I were rich, I would buy a house."\n\n- French: Si + présent → futur: "Si j\'étudie, je réussirai."\n- English: If + present simple → will: "If I study, I will succeed."\n- **ERROR:** French speakers sometimes use future in the if-clause: "If I will study..." → WRONG. Never use "will" after "if" in conditionals.',
            },
            {
              type: 'text',
              heading: 'Using Conditionals for Advice and Reasoning',
              body: 'Conditionals are powerful tools for giving advice and reasoning about consequences.\n\n**Advice with Second Conditional:**\n- "If I were you, I would talk to the teacher." (= my advice)\n- "If I were in your situation, I would apply for a scholarship."\nThis is a very common English structure for giving tactful advice. French has a similar structure ("Si j\'étais toi, je..."), so this transfers well.\n\n**Mixed Conditionals for Complex Reasoning:**\n- "If you don\'t start studying now, you won\'t pass the exam." (first conditional — warning)\n- "If you studied every day, you would see improvement." (second conditional — hypothetical advice)\n- "If we invested in education, poverty would decrease." (second conditional — hypothetical policy)\n\n**Conditional Chain Reasoning:**\nYou can build logical chains: "If we improve nutrition in schools, students will concentrate better. If they concentrate better, their grades will improve. If grades improve, more students will graduate."\n\nThis kind of conditional reasoning is exactly what you need for academic writing, debates, and the TOEFL/IELTS writing section.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Wisdom and Consequences',
              scriptureRef: 'Proverbs 2:4-5; Galatians 6:7',
              reflection: 'The Bible is full of conditional logic. Proverbs 2:4-5 says: "If you look for wisdom as for silver and search for it as for hidden treasure, then you will understand the fear of the Lord." Galatians 6:7 warns: "Whatever a man sows, that he will also reap" — a zero conditional truth about consequences. God wants us to think conditionally: to understand that our choices have consequences, that seeking wisdom leads to understanding, and that our decisions today shape our future.',
              applicationQuestion: 'Can you find another conditional statement in the Bible? What does it teach about the relationship between our choices and their outcomes?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why is "If I would be rich" wrong in English, even though French puts the conditionnel in the si-clause? What is the rule that French speakers must remember?',
                'What is the difference between "If I have enough money, I will buy a car" (first conditional) and "If I had enough money, I would buy a car" (second conditional)? How does reality vs. imagination change the meaning?',
                'Proverbs 2:4-5 is a conditional: "If you seek wisdom... then you will understand." Is this a zero, first, or second conditional? Why?',
              ],
            },
            {
              type: 'practice',
              activity: 'Conditional Transformation Workshop',
              prompt: 'Transform each situation into the correct conditional type. Write the full sentence and identify whether it is zero, first, or second conditional.\n\n1. General fact: heat ice → it melts\n2. Real possibility: study hard → pass the exam\n3. Hypothetical: be president → change the education system\n4. General truth: don\'t water plants → they die\n5. Real possibility: rain tomorrow → cancel the picnic\n6. Hypothetical: have wings → fly to school\n\nNow translate these French sentences into English, being careful NOT to use "would" in the if-clause:\n7. "Si j\'avais plus de temps, j\'apprendrais le japonais."\n8. "Si tu étudies, tu réussiras."\n9. "Si j\'étais toi, je parlerais au professeur."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word essay: "If I Could Change One Thing About Education." Use:\n- At least 2 zero conditionals (general truths about education)\n- At least 3 first conditionals (real proposals and their likely results)\n- At least 3 second conditionals (hypothetical changes and their imagined effects)\n- "If I were in charge..." to introduce your proposals\n- A paragraph connecting your ideas to biblical wisdom (Proverbs 2:4-5)\n- A "French Speaker Self-Audit" identifying 2 places where you avoided the "if + would" error',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Conditional Sentences',
        estimatedMinutes: 55,
        objectives: [
          'Understand zero, first, and second conditional structures.',
          'Use correct verb forms in each conditional type.',
          'Avoid the common French-speaker error of "if + would."',
          'Express facts, real possibilities, and hypothetical situations using conditionals.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you found a million dollars, what would you do? Notice: we say "If you FOUND" (past tense), not "If you WOULD FIND." Why does English use past tense for imaginary situations? Let us find out.',
              connection: 'The Bible often uses conditional logic: "If you seek wisdom, you will find it" (Proverbs 2:4-5). God wants us to understand that our choices lead to consequences. Conditionals help us express this important truth.',
            },
            {
              type: 'text',
              heading: 'Zero, First, and Second Conditionals',
              body: '**ZERO CONDITIONAL — Always true:**\nIf + present, present\n- "If you mix red and blue, you get purple." (fact)\n- "If it rains, the ground gets wet." (always true)\n\n**FIRST CONDITIONAL — Real future possibility:**\nIf + present, will + verb\n- "If I study hard, I will pass." (possible and likely)\n- "If it rains, we will stay home." (real possibility)\n\n**SECOND CONDITIONAL — Imaginary situation:**\nIf + past simple, would + verb\n- "If I were rich, I would travel the world." (not real — imaginary)\n- "If I had wings, I would fly." (impossible but fun to imagine)\n\n**IMPORTANT for French Speakers:**\n- NEVER put "would" after "if"!\n- WRONG: "If I would have money, I would buy a car."\n- RIGHT: "If I had money, I would buy a car."\n\nIn French: "Si j\'avais de l\'argent, j\'achèterais..." The "si" clause uses imparfait (past), and so does English — the if-clause uses past simple.\n\n**Advice:** "If I were you, I would study more." (= my advice to you)\n\n**Remember:** "If I were" (not "If I was") is the correct formal form for all persons.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Choices and Consequences',
              scriptureRef: 'Proverbs 2:4-5; Galatians 6:7',
              reflection: 'Proverbs says: "If you seek wisdom, you will find it." Galatians says: "Whatever you sow, you will reap." God teaches us that choices have consequences — and conditionals are how we express this in English.',
              applicationQuestion: 'What is a conditional truth from your own life? (If you do X, Y happens.) How does this connect to God\'s wisdom?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "If I have money, I will buy it" (first) and "If I had money, I would buy it" (second)?',
                'Why do French speakers often say "If I would be"? What should they say instead?',
                'Give an example of advice using "If I were you, I would..."',
              ],
            },
            {
              type: 'practice',
              activity: 'Conditional Practice',
              prompt: 'Complete each sentence with the correct verb form:\n\n1. If you heat ice, it ___ (melt). [zero]\n2. If she studies, she ___ (pass) the exam. [first]\n3. If I ___ (be) you, I would apologize. [second]\n4. If we ___ (have) more time, we would visit Paris. [second]\n5. If it rains, we ___ (stay) inside. [first]\n6. If you ___ (not sleep) enough, you get tired. [zero]\n\nNow write 3 conditional sentences of your own — one zero, one first, one second.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words using conditionals. Answer these prompts:\n- Write 2 first conditionals about your real plans: "If I ___, I will ___"\n- Write 2 second conditionals about imaginary situations: "If I ___, I would ___"\n- Write 1 piece of advice: "If I were you, I would ___"\n- Include a connection to Proverbs 2:4-5\n\nMake sure you NEVER use "would" in the if-clause!',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Conditional Sentences',
        estimatedMinutes: 40,
        objectives: [
          'Understand first and second conditional structures.',
          'Use correct verb forms in conditional sentences.',
          'Avoid putting "would" in the if-clause.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could have any superpower, what would you choose? Notice: "If you COULD have" — not "If you WOULD have." In English, we never put "would" after "if." Let us learn why.',
              connection: 'The Bible says: "If you seek wisdom, you will find it" (Proverbs 2). Conditionals help us talk about choices and what happens next. God wants us to make wise choices.',
            },
            {
              type: 'text',
              heading: 'If... Then...',
              body: '**FIRST CONDITIONAL — Real possibilities:**\nIf + present, will + verb\n- "If I study, I will pass." (real, possible)\n- "If it rains, we will stay home." (might happen)\n\n**SECOND CONDITIONAL — Imaginary:**\nIf + past, would + verb\n- "If I were rich, I would travel." (not real — just imagining)\n- "If I had a car, I would drive to school." (I don\'t have a car)\n\n**BIG RULE:** NEVER use "would" after "if"!\n- WRONG: "If I would be rich..."\n- RIGHT: "If I were rich..."\n\nFrench: "Si j\'étais riche..." → English: "If I were rich..."\nThe "si" part uses a PAST form, just like English!\n\n**Advice:** "If I were you, I would study harder." (= my suggestion)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Wise Choices',
              scriptureRef: 'Proverbs 2:4-5',
              reflection: 'God says: "If you seek wisdom, you will find it." Our choices have results. Conditionals help us talk about this in English.',
              applicationQuestion: 'What is one wise choice you can make this week?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "If I study, I will pass" and "If I studied, I would pass"?',
                'Why can\'t you say "If I would be rich"? What should you say?',
              ],
            },
            {
              type: 'practice',
              activity: 'Complete the Conditionals',
              prompt: 'Choose the correct word:\n1. If I study hard, I ___ (will / would) pass.\n2. If I ___ (am / were) president, I would help the poor.\n3. If it rains, we ___ (will / would) cancel the game.\n4. If I ___ (have / had) wings, I would fly.\n5. If you heat water, it ___ (boils / would boil).',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words. Answer these questions using conditionals:\n1. If you study English every day, what will happen? (first conditional)\n2. If you were the principal of your school, what would you change? (second conditional)\n3. If you could live anywhere in the world, where would you live? Why? (second conditional)\n\nInclude one sentence connecting choices and consequences to Proverbs 2.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'zero conditional', definition: 'A conditional for facts and general truths: If + present, present', example: 'If you heat water to 100°C, it boils.' },
      { term: 'first conditional', definition: 'A conditional for real future possibilities: If + present, will + verb', example: 'If I study hard, I will pass the exam.' },
      { term: 'second conditional', definition: 'A conditional for unreal or hypothetical situations: If + past, would + verb', example: 'If I were rich, I would donate money to schools.' },
      { term: 'hypothetical', definition: 'Something imagined or supposed, not real', example: 'The second conditional describes hypothetical situations — things that are not true right now.' },
      { term: 'consequence', definition: 'The result or effect of an action or condition', example: 'Every choice has a consequence — conditionals help us express this relationship.' },
      { term: 'subjunctive', definition: 'A verb mood used for unreal conditions; in English, "If I were" instead of "If I was"', example: '"If I were you" uses the subjunctive mood — it sounds more formal and is grammatically correct.' },
    ],
    quiz: [
      { question: 'Which sentence is a FIRST conditional?', options: ['If I were rich, I would travel.', 'If you heat ice, it melts.', 'If I study, I will pass.', 'If I had wings, I would fly.'], correctAnswer: 2, explanation: 'First conditional: If + present, will + verb. "If I study, I will pass" describes a real future possibility.' },
      { question: 'What is WRONG with this sentence? "If I would have money, I would buy a house."', options: ['Nothing is wrong.', '"Would" should not be in the if-clause.', '"Money" should be "moneys."', 'It should use "will" instead of "would."'], correctAnswer: 1, explanation: 'Never put "would" in the if-clause. Correct: "If I had money, I would buy a house."' },
      { question: '"If you mix blue and yellow, you ___ green."', options: ['will get', 'would get', 'get', 'getting'], correctAnswer: 2, explanation: 'Zero conditional (general fact): If + present, present. "If you mix blue and yellow, you get green."' },
      { question: '"If I ___ you, I would apologize."', options: ['am', 'was', 'were', 'would be'], correctAnswer: 2, explanation: 'Second conditional uses "were" for all persons (subjunctive mood): "If I were you..."' },
      { question: 'The second conditional is used for:', options: ['Facts that are always true', 'Real future possibilities', 'Hypothetical/imaginary situations', 'Past events'], correctAnswer: 2, explanation: 'The second conditional describes unreal or hypothetical situations — things that are not true now.' },
      { question: 'French: "Si j\'étudie, je réussirai." English:', options: ['If I would study, I will succeed.', 'If I study, I would succeed.', 'If I study, I will succeed.', 'If I studied, I will succeed.'], correctAnswer: 2, explanation: 'French si + présent → futur = English If + present → will. "If I study, I will succeed."' },
      { question: '"If it rains tomorrow, we ___ stay inside."', options: ['would', 'will', 'are', 'were'], correctAnswer: 1, explanation: 'First conditional (real possibility): If + present, will + verb. "If it rains, we will stay inside."' },
      { question: 'Which Bible verse uses conditional logic?', options: ['In the beginning God created the heavens.', 'If you seek wisdom, you will find it.', 'Jesus wept.', 'God is love.'], correctAnswer: 1, explanation: 'Proverbs 2:4-5 is a conditional: "If you seek wisdom... then you will understand."' },
      { question: '"If I had more time, I ___ learn to play guitar."', options: ['will', 'would', 'am going to', 'can'], correctAnswer: 1, explanation: 'Second conditional: If + past, would + verb. "If I had more time, I would learn."' },
      { question: 'French speakers often make this conditional error because:', options: ['French has no conditionals.', 'French puts the conditionnel in the si-clause sometimes.', 'French si + imparfait maps to English "if + would" in their minds.', 'French and English conditionals are identical.'], correctAnswer: 2, explanation: 'French speakers process "si j\'avais" → "if I would have" because they associate imparfait with conditionnel. The correct English uses past simple in the if-clause.' },
    ],
  },

  // ── W31: Problem-Solving and Decision-Making (INSTRUCTION) ────────────────
  {
    weekNumber: 3,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Problem-Solving and Decision-Making',
        estimatedMinutes: 70,
        objectives: [
          'Use pros/cons language and decision-making phrases fluently.',
          'Express degrees of certainty and uncertainty with appropriate hedging.',
          'Link ideas coherently in extended discourse using transition words and logical connectors.',
          'Analyze problems systematically and present solutions in English.',
          'Connect wise decision-making to biblical principles of seeking counsel and trusting God.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You are offered two opportunities: a scholarship to study abroad or a job that would support your family now. How do you decide? In French, you might "peser le pour et le contre." In English, we "weigh the pros and cons." The language is different, but the skill is the same — and it is one of the most important skills you will ever develop.',
              connection: 'Proverbs 15:22 says, "Plans fail for lack of counsel, but with many advisors they succeed." God designed us to make decisions with wisdom, seeking input from others and weighing our options carefully. Today we learn the English language tools for this critical life skill.',
            },
            {
              type: 'text',
              heading: 'The Language of Pros and Cons',
              body: '**Discussing Advantages and Disadvantages:**\nEnglish has rich vocabulary for weighing options:\n\n**Pros (advantages):**\n- "One advantage of... is that..."\n- "On the positive side..."\n- "A major benefit is..."\n- "This option has the added advantage of..."\n\n**Cons (disadvantages):**\n- "One disadvantage of... is that..."\n- "On the negative side..." / "On the other hand..."\n- "A significant drawback is..."\n- "The main risk is that..."\n\n**Comparing Options:**\n- "Option A is better than Option B because..."\n- "While Option A offers..., Option B provides..."\n- "Compared to..., this option is more..."\n- "Both options have merit, but..."\n\n**Decision-Making Phrases:**\n- "After weighing the pros and cons, I have decided to..."\n- "Taking everything into account..."\n- "On balance, I believe that..."\n- "Having considered all the factors..."\n\n**French Comparison:**\n- French "par contre" ≈ "on the other hand" (but "par contre" is more informal)\n- French "d\'un côté... de l\'autre côté" ≈ "on one hand... on the other hand"\n- French "en revanche" ≈ "however" / "conversely"',
            },
            {
              type: 'text',
              heading: 'Certainty, Uncertainty, and Linking Ideas',
              body: '**Expressing Certainty and Uncertainty:**\nIn English, the words you choose signal how sure you are:\n\n**Certain:** "I am sure that..." / "I am confident that..." / "Without a doubt..." / "It is clear that..." / "Undoubtedly..."\n**Fairly certain:** "I am fairly confident..." / "Most likely..." / "In all probability..."\n**Uncertain:** "I am not sure whether..." / "It is possible that..." / "Perhaps..." / "It might be the case that..."\n**Very uncertain:** "I have no idea whether..." / "It remains to be seen..." / "I cannot say for certain..."\n\n**Linking Ideas in Extended Discourse:**\nAt B1 level, you need to connect ideas smoothly across multiple sentences and paragraphs:\n\n**Adding:** Furthermore, In addition, Moreover, Also, What is more\n**Contrasting:** However, Nevertheless, On the other hand, Although, Despite\n**Cause/Effect:** Therefore, As a result, Consequently, Because of this, Due to\n**Sequence:** First of all, Secondly, Next, Then, Finally, In conclusion\n**Example:** For instance, For example, Such as, In particular\n**Summarizing:** In summary, To sum up, Overall, All things considered\n\nFrench speakers often translate "car" as "because" or "for" — but "for" as a conjunction sounds very formal and archaic in modern English. Use "because" or "since" instead. "D\'ailleurs" ≈ "moreover" or "besides." "Pourtant" ≈ "however" or "yet."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Seeking Wisdom in Decisions',
              scriptureRef: 'Proverbs 15:22; James 1:5',
              reflection: 'Proverbs says, "Plans fail for lack of counsel, but with many advisors they succeed." James adds, "If any of you lacks wisdom, let him ask God, who gives generously to all." Biblical decision-making combines human wisdom (weighing pros and cons, seeking advice) with divine guidance (prayer, Scripture, the Holy Spirit). The best decisions are made when we think carefully AND seek God\'s direction.',
              applicationQuestion: 'When you face a difficult decision, what is your process? How do you combine careful thinking with seeking God\'s guidance?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "I am certain" and "It is possible"? How does your choice of certainty language affect how convincing you sound?',
                'Translate these French connectors into English and use each in a sentence: "cependant," "par conséquent," "de plus," "en conclusion."',
                'Think of a real decision you made recently. Describe the pros and cons using at least three phrases from today\'s lesson.',
              ],
            },
            {
              type: 'practice',
              activity: 'Decision Analysis Paper',
              prompt: 'You are a student deciding between two options:\nOption A: Go to university in your home country (cheaper, closer to family, familiar language)\nOption B: Study abroad in an English-speaking country (expensive, far from family, full immersion in English)\n\nWrite a structured analysis:\n1. **Pros of Option A** (3 points using advantage language)\n2. **Cons of Option A** (2 points using disadvantage language)\n3. **Pros of Option B** (3 points)\n4. **Cons of Option B** (2 points)\n5. **Your recommendation** (using decision phrases and certainty/uncertainty language)\n\nUse at least 4 linking words/phrases and at least 2 certainty/uncertainty expressions.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word essay: "How to Make a Wise Decision." Include:\n- An introduction explaining why decision-making is important\n- A step-by-step process for making decisions (using sequence language)\n- Pros/cons language and decision-making phrases\n- At least 6 different linking words/connectors\n- Expressions of certainty and uncertainty\n- A paragraph connecting wise decisions to Proverbs 15:22 and James 1:5\n- A conclusion using "Taking everything into account..." or "On balance..."',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Problem-Solving and Decision-Making',
        estimatedMinutes: 55,
        objectives: [
          'Use pros/cons language to discuss advantages and disadvantages.',
          'Express certainty and uncertainty with appropriate phrases.',
          'Link ideas using transition words: however, therefore, furthermore, for example.',
          'Connect wise decisions to biblical principles.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How do you make big decisions? Do you list the good and bad points? In English, we call them "pros and cons." Today we learn to discuss decisions, weigh options, and connect ideas smoothly in English.',
              connection: 'The Bible says, "Plans fail for lack of counsel, but with many advisors they succeed" (Proverbs 15:22). God wants us to think carefully before deciding. Let us learn the English words for this process.',
            },
            {
              type: 'text',
              heading: 'Pros, Cons, and Decision Language',
              body: '**Talking About Advantages (Pros):**\n- "One advantage is that..."\n- "On the positive side..."\n- "A benefit of this is..."\n\n**Talking About Disadvantages (Cons):**\n- "One disadvantage is that..."\n- "On the other hand..."\n- "A drawback is..."\n\n**Making a Decision:**\n- "After thinking about it, I have decided to..."\n- "On balance, I think..."\n- "Taking everything into account..."\n\n**How Sure Are You?**\n- Very sure: "I am certain that..." / "I am confident that..."\n- Not sure: "I think..." / "It is possible that..." / "Maybe..."\n- No idea: "I am not sure whether..."\n\n**Linking Words (Connectors):**\n- However = but (more formal): "I like the plan. However, it is expensive."\n- Therefore = so (more formal): "She studied hard. Therefore, she passed."\n- Furthermore = also (more formal): "It is fun. Furthermore, it is educational."\n- For example: "Many fruits are healthy. For example, apples have lots of fiber."\n- In conclusion: "In conclusion, I believe Option A is better."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Asking for Wisdom',
              scriptureRef: 'Proverbs 15:22; James 1:5',
              reflection: 'God says that wise people ask for advice before deciding. James says if you need wisdom, ask God and He will give it generously. The best decisions use both careful thinking and prayer.',
              applicationQuestion: 'When you have a hard decision, do you try to figure it out alone, or do you ask for help? Who do you go to for advice?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "I am certain" and "It is possible"? When would you use each?',
                'Use "however," "therefore," and "furthermore" each in a sentence about school.',
                'What is a decision you are facing right now? What are the pros and cons?',
              ],
            },
            {
              type: 'practice',
              activity: 'Pros and Cons Chart',
              prompt: 'Choose one of these topics:\nA) Getting a part-time job while in school\nB) Studying abroad vs. studying at home\n\nWrite:\n1. Three pros (advantages) using pros language\n2. Three cons (disadvantages) using cons language\n3. Your decision in 2-3 sentences using decision-making phrases\n\nUse at least 2 linking words (however, therefore, furthermore, for example).',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words about a decision you need to make (real or imagined). Include:\n- An introduction to the decision\n- At least 2 pros and 2 cons\n- At least 3 linking words\n- An expression of certainty or uncertainty\n- Your decision with reasons\n- A connection to Proverbs 15:22 or James 1:5',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Problem-Solving and Decision-Making',
        estimatedMinutes: 40,
        objectives: [
          'Use simple pros/cons language to discuss a decision.',
          'Connect ideas with however, because, and for example.',
          'Express simple opinions about what to do.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you have to make a choice, how do you decide? Do you think about the good things and the bad things? In English, we call the good things "pros" and the bad things "cons." Let us learn to talk about decisions today.',
              connection: 'The Bible says to ask for advice before making decisions (Proverbs 15:22). God wants us to think carefully and then trust Him.',
            },
            {
              type: 'text',
              heading: 'Making Decisions in English',
              body: '**Pros = Good Things:**\n- "One good thing about it is..."\n- "An advantage is..."\n\n**Cons = Bad Things:**\n- "One bad thing about it is..."\n- "A disadvantage is..."\n\n**Connecting Ideas:**\n- **However** = but: "I want to go. However, it is expensive."\n- **Because** = the reason: "I chose this because it is closer."\n- **For example**: "There are many benefits. For example, it is cheaper."\n\n**Making Your Choice:**\n- "I think the best choice is... because..."\n- "After thinking about it, I decided to..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Asking for Help',
              scriptureRef: 'Proverbs 15:22',
              reflection: 'God says that plans succeed when you ask for advice. When you have a hard decision, talk to someone you trust — and pray about it too.',
              applicationQuestion: 'Who do you ask for advice when you have a hard decision?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What does "pros and cons" mean?',
                'Use "however" in a sentence about something you like and something you don\'t like.',
              ],
            },
            {
              type: 'practice',
              activity: 'Pros and Cons List',
              prompt: 'Think about this decision: Should you join an after-school club or use that time to study?\n\nWrite:\n1. Two pros (good things about joining a club)\n2. Two cons (bad things about joining a club)\n3. Your choice in 1-2 sentences using "because"',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words about a decision you need to make. Say what the choice is, list 2 good things and 2 bad things, and tell what you decided. Use "however," "because," and "for example" at least once each. Include one sentence about asking God for wisdom.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'pros and cons', definition: 'The good points (advantages) and bad points (disadvantages) of something', example: 'Before making a decision, it helps to list the pros and cons.' },
      { term: 'advantage', definition: 'A good or beneficial quality; something that helps you', example: 'One advantage of studying abroad is full language immersion.' },
      { term: 'drawback', definition: 'A disadvantage or negative quality', example: 'A major drawback of this plan is the high cost.' },
      { term: 'however', definition: 'A linking word that introduces a contrast (like "but" — more formal)', example: 'The plan is good. However, it will take a long time to complete.' },
      { term: 'therefore', definition: 'A linking word that shows result or conclusion (like "so" — more formal)', example: 'She studied very hard. Therefore, she passed with excellent marks.' },
      { term: 'furthermore', definition: 'A linking word that adds more information (like "also" — more formal)', example: 'The program is free. Furthermore, it provides a certificate upon completion.' },
      { term: 'on balance', definition: 'After considering everything; all things considered', example: 'On balance, I believe that the advantages outweigh the disadvantages.' },
      { term: 'counsel', definition: 'Advice, especially from someone wise or experienced', example: 'Proverbs says that plans succeed with good counsel — wise advice from others.' },
    ],
    quiz: [
      { question: 'What does "pros and cons" mean?', options: ['Professional and consulting', 'Good points and bad points', 'Past and present', 'Proof and conclusions'], correctAnswer: 1, explanation: '"Pros" are advantages (good points) and "cons" are disadvantages (bad points).' },
      { question: 'Which word introduces a CONTRAST?', options: ['Therefore', 'Furthermore', 'However', 'For example'], correctAnswer: 2, explanation: '"However" introduces a contrast — an idea that goes against what was just said, like "but" in more formal writing.' },
      { question: '"She worked hard. ___, she got the promotion."', options: ['However', 'Therefore', 'Furthermore', 'Although'], correctAnswer: 1, explanation: '"Therefore" shows a result or conclusion: because she worked hard, she got the promotion.' },
      { question: 'Which phrase expresses UNCERTAINTY?', options: ['I am certain that', 'Without a doubt', 'It is possible that', 'I am confident that'], correctAnswer: 2, explanation: '"It is possible that" expresses uncertainty — you are not sure whether it is true.' },
      { question: '"One ___ of living in the city is that public transport is easy to use."', options: ['drawback', 'disadvantage', 'advantage', 'problem'], correctAnswer: 2, explanation: 'An "advantage" is a positive quality or benefit.' },
      { question: '"The plan is affordable. ___, it has community support."', options: ['However', 'Therefore', 'Furthermore', 'Nevertheless'], correctAnswer: 2, explanation: '"Furthermore" adds additional supporting information — like "also" or "in addition."' },
      { question: 'What does Proverbs 15:22 teach about decision-making?', options: ['Make decisions quickly without thinking.', 'Plans succeed with many advisors.', 'Never ask for advice.', 'Always do what feels right.'], correctAnswer: 1, explanation: 'Proverbs 15:22: "Plans fail for lack of counsel, but with many advisors they succeed."' },
      { question: 'Which phrase would you use to CONCLUDE a decision?', options: ['First of all', 'On the other hand', 'Taking everything into account', 'For example'], correctAnswer: 2, explanation: '"Taking everything into account" is used when summarizing all factors before stating your conclusion.' },
      { question: '"A ___ of this option is that it costs too much money."', options: ['benefit', 'advantage', 'drawback', 'certainty'], correctAnswer: 2, explanation: 'A "drawback" is a disadvantage or negative quality.' },
      { question: 'Which sentence links ideas CORRECTLY?', options: ['The movie was boring, therefore I loved it.', 'The movie was boring. However, the acting was excellent.', 'The movie was boring. Furthermore, I hated it.', 'The movie was boring although I left early.'], correctAnswer: 1, explanation: '"However" correctly contrasts "the movie was boring" with the positive "the acting was excellent."' },
    ],
  },

  // ── W32: My Future Plan Presentation (PROJECT) ────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'My Future Plan Presentation',
        estimatedMinutes: 70,
        objectives: [
          'Synthesize all Unit 8 grammar and vocabulary into a cohesive presentation.',
          'Present life goals, education plans, and career ambitions using future tenses and conditionals.',
          'Structure an extended oral/written presentation with clear introduction, body, and conclusion.',
          'Use decision-making language, linking words, and certainty/uncertainty phrases.',
          'Ground personal ambitions in biblical hope and divine guidance.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have now learned to talk about the future (will/going to/present continuous), reason hypothetically (conditionals), and weigh decisions (pros/cons language). Today you bring it all together in one powerful presentation about YOUR future. What will you say when someone asks, "Where do you see yourself in ten years?"',
              connection: 'Habakkuk 2:2 says, "Write the vision and make it plain." God invites us to articulate our vision for the future. A clear plan, spoken and written, becomes real in a way that vague dreams never do. Today you write and present your vision.',
            },
            {
              type: 'text',
              heading: 'Structuring Your Future Plan Presentation',
              body: 'Your presentation should have five clear sections:\n\n**1. Introduction (Hook + Thesis):**\nOpen with something memorable: a quote, a question, a bold statement.\n"If I could send a message to my future self, it would say: \'You did it.\' Today I am going to share my plan for making that message come true."\n\n**2. Education Plans (Going To + Present Continuous):**\n"I am going to study computer science at university. I am taking my entrance exams next March."\n\n**3. Career Ambitions (Will + Second Conditional):**\n"I believe I will work in healthcare technology. If I could create any app, I would build one that connects rural patients with doctors remotely."\n\n**4. Decision-Making Process (Pros/Cons + Linking Words):**\n"One advantage of this path is job security. However, a drawback is that it requires many years of study. On balance, I believe the investment is worth it because..."\n\n**5. Conclusion (Biblical Reflection + Call to Action):**\n"Jeremiah 29:11 reminds me that God has plans for my future. Therefore, I move forward with both ambition and trust."\n\n**Presentation Tips:**\n- Use all three future forms at least twice each\n- Include at least 2 conditional sentences\n- Use at least 4 linking words\n- Vary your certainty language: some things you are sure about, others uncertain',
            },
            {
              type: 'biblical-worldview',
              theme: 'Writing the Vision',
              scriptureRef: 'Habakkuk 2:2; Jeremiah 29:11; Proverbs 16:3',
              reflection: 'Habakkuk 2:2 says: "Write the vision and make it plain, so that the runner may read it." Proverbs 16:3 adds: "Commit your work to the Lord, and your plans will be established." God does not ask us to drift through life without direction. He asks us to plan with purpose, write our vision clearly, and commit it to Him. Your presentation today is an act of faith — declaring what you believe God is leading you toward.',
              applicationQuestion: 'How does committing your plans to God change the way you feel about uncertainty in the future?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are the five sections of a future plan presentation? Summarize each one in one sentence.',
                'How do you decide which future form to use when talking about your plans? What is the difference between saying "I will be a doctor" and "I am going to be a doctor"?',
                'What role does uncertainty play in your presentation? Is it honest to express some uncertainty, or does it weaken your presentation?',
              ],
            },
            {
              type: 'practice',
              activity: 'Outline Your Presentation',
              prompt: 'Create a detailed outline for your presentation:\n\n1. **Introduction:** Write your hook (question, quote, or bold statement) and your thesis.\n2. **Education Plans:** 3-4 bullet points using going to and present continuous.\n3. **Career Ambitions:** 3-4 bullet points using will and second conditional.\n4. **Decision Process:** List 2 pros and 1 con of your chosen path, with linking words.\n5. **Conclusion:** Write your biblical reflection and closing sentence.\n\nLabel each grammar form you use (will, going to, present continuous, first conditional, second conditional).',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write your complete "My Future Plan" presentation (400-500 words). Follow the five-section structure. Your presentation must include:\n- All three future forms (will, going to, present continuous) — at least 2 of each\n- At least 3 conditional sentences (mix of first and second)\n- Pros/cons language and decision-making phrases\n- At least 6 linking words/connectors\n- Expressions of both certainty and uncertainty\n- Vocabulary from all three Unit 8 lessons\n- A biblical reflection paragraph connecting your plans to Scripture\n- A strong concluding sentence\n\nAfter your presentation, write a "Grammar Inventory" listing every future tense, conditional, and linking word you used.',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'My Future Plan Presentation',
        estimatedMinutes: 55,
        objectives: [
          'Combine future tenses, conditionals, and decision language in one presentation.',
          'Present education and career plans clearly and coherently.',
          'Use linking words to connect ideas smoothly.',
          'Connect personal ambitions to biblical hope.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If someone asked you, "What are you going to do after you finish school?" — what would you say? Today you put together everything you have learned in Unit 8 to create a clear, well-organized presentation about your future.',
              connection: 'The Bible says, "Write the vision and make it plain" (Habakkuk 2:2). God wants us to think about our future and express it clearly. That is exactly what you will do today.',
            },
            {
              type: 'text',
              heading: 'How to Present Your Future Plan',
              body: 'Your presentation has four parts:\n\n**1. Introduction:** Start with something interesting — a question or a bold statement. Then state your main plan.\nExample: "Have you ever wondered what you will be doing in ten years? I have a plan, and today I am going to share it with you."\n\n**2. Education and Career Plans:** Use going to for decided plans, will for predictions, and present continuous for scheduled events.\nExample: "I\'m going to study nursing. I believe I will work in a hospital. I\'m taking my exams next June."\n\n**3. Why This Path:** Use pros/cons language and conditionals.\nExample: "One advantage is good job security. If I become a nurse, I will be able to help people every day."\n\n**4. Conclusion:** Connect to the Bible and end with a strong sentence.\nExample: "Jeremiah 29:11 says God has plans for my future. I trust Him as I work toward my goals."\n\n**Language Checklist:**\n- Will, going to, present continuous\n- First and second conditionals\n- Pros/cons phrases\n- Linking words: however, therefore, furthermore',
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plan and My Plan',
              scriptureRef: 'Habakkuk 2:2; Jeremiah 29:11',
              reflection: 'God says to write your vision clearly. He also says He has good plans for you. When you make plans for the future, you are doing what God asks — and you can trust Him to guide you along the way.',
              applicationQuestion: 'How does knowing that God has a plan for you give you courage to share your own plans?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are the four parts of a future plan presentation?',
                'Which future tense do you use for plans already decided? For predictions? For scheduled events?',
                'Practice: Tell your partner about your future plan using going to, will, and one conditional sentence.',
              ],
            },
            {
              type: 'practice',
              activity: 'Plan Your Presentation',
              prompt: 'Create an outline:\n1. Introduction: Write a hook and state your plan.\n2. Education/Career: Write 3 sentences using going to, will, and present continuous.\n3. Why This Path: Write 1 pro and 1 con. Write 1 conditional sentence.\n4. Conclusion: Write a sentence connecting to Jeremiah 29:11.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write your "My Future Plan" presentation (250-350 words). Include:\n- All three future forms (at least 1 of each)\n- At least 2 conditional sentences\n- Pros/cons language\n- At least 3 linking words\n- Vocabulary from Unit 8\n- A biblical reflection\n- A strong ending sentence',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'My Future Plan Presentation',
        estimatedMinutes: 40,
        objectives: [
          'Present personal future plans using will and going to.',
          'Include at least one conditional sentence.',
          'Organize ideas with a beginning, middle, and end.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What do you want your life to look like in five years? Today you write about your future plans using everything you learned in Unit 8.',
              connection: 'God says to "write the vision" (Habakkuk 2:2). That means write down your plans clearly. God has good plans for you — and He wants you to have plans too.',
            },
            {
              type: 'text',
              heading: 'My Future Plan — Simple Structure',
              body: '**Beginning:** Say what your plan is.\n"I am going to study cooking after school. I want to be a chef."\n\n**Middle:** Say why and give details.\n"If I become a chef, I will be able to feed people and make them happy. I think cooking is a good career because I love food."\n\n**End:** Connect to God.\n"God has plans for my future (Jeremiah 29:11). I will work hard and trust Him."\n\n**Words to Use:**\n- Going to (for your plans)\n- Will (for what you think will happen)\n- If... will / If... would (conditionals)\n- Because, however',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Has a Plan',
              scriptureRef: 'Jeremiah 29:11',
              reflection: 'God says He has good plans for your life. You can make plans AND trust God at the same time.',
              applicationQuestion: 'What is one thing you are going to do this year to work toward your future goals?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What do you want to be when you grow up? Tell your partner using "I am going to..."',
                'Use a conditional: "If I become a ___, I will ___."',
              ],
            },
            {
              type: 'practice',
              activity: 'Plan Your Writing',
              prompt: 'Answer these questions to plan:\n1. What is your future career goal? (use going to)\n2. Why did you choose this? (use because)\n3. If you achieve this, what will you do? (use a conditional)\n4. What does Jeremiah 29:11 mean to you? (1 sentence)',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write your "My Future Plan" (150-250 words). Include:\n- Your plan (use going to)\n- A prediction about the future (use will)\n- One conditional sentence (If I..., I will/would...)\n- A reason for your choice (use because)\n- One sentence about Jeremiah 29:11\n\nHave a clear beginning, middle, and end.',
            },
          ],
        },
      },
    ],
    vocabulary: [],
    quiz: [],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 9: REVIEW AND ASSESSMENT (W33–W36)
// ═══════════════════════════════════════════════════════════════════════════════

const unit9Lessons: EnrichedLesson[] = [

  // ── W33: Grammar and Vocabulary Consolidation (INSTRUCTION) ───────────────
  {
    weekNumber: 1,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Grammar and Vocabulary Consolidation',
        estimatedMinutes: 70,
        objectives: [
          'Review and consolidate ALL B1 grammar: tenses, conditionals, passive voice, relative clauses, modals.',
          'Identify and correct persistent French-speaker errors across all grammar areas.',
          'Demonstrate command of vocabulary from all 8 prior units.',
          'Self-assess grammatical strengths and weaknesses for targeted improvement.',
          'Approach review as a spiritual discipline of self-examination (2 Corinthians 13:5).',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have spent eight units building your English from A2 toward B1. But how much have you really retained? Can you use present perfect AND past simple correctly? Can you form conditionals without putting "would" after "if"? Today is the day we find out — not to judge, but to strengthen.',
              connection: 'Paul wrote, "Examine yourselves to see whether you are in the faith" (2 Corinthians 13:5). Self-examination is a spiritual discipline. Just as Christians regularly examine their spiritual growth, today you examine your grammatical growth — honestly, humbly, and with a plan for improvement.',
            },
            {
              type: 'text',
              heading: 'Complete B1 Grammar Review',
              body: '**TENSES:**\n\n1. **Present Simple** — habits, facts: "She studies every day." "Water boils at 100°C."\n2. **Present Continuous** — happening now / scheduled future: "I am reading." "We are meeting at 3 PM."\n3. **Past Simple** — completed actions: "I visited Paris last year." "She didn\'t go."\n4. **Past Continuous** — ongoing past action, often interrupted: "I was studying when the phone rang."\n5. **Present Perfect** — past action with present relevance: "I have visited Paris." (experience) "I have lived here for 5 years." (still living here)\n   - French speaker alert: "I have visited" ≠ "J\'ai visité" always. Present perfect ≠ passé composé!\n6. **Future (will / going to / present continuous)** — predictions, plans, arrangements\n\n**CONDITIONALS:**\n- Zero: If + present → present (facts)\n- First: If + present → will (real possibility)\n- Second: If + past → would (hypothetical) — NEVER "if + would"!\n\n**PASSIVE VOICE:**\n- "English is spoken worldwide." "The bridge was built in 1990."\n- Formation: be + past participle\n\n**RELATIVE CLAUSES:**\n- Who (people), which (things), that (both)\n- Can drop object relative pronoun: "The book (that) I read"\n\n**MODALS:**\n- Advice: should, ought to, had better\n- Obligation: must, have to\n- No obligation: don\'t have to\n- Prohibition: must not\n- Permission: can, may, be allowed to\n\n**COMMON FRENCH SPEAKER ERRORS (Master List):**\n1. "I am agree" → "I agree" (no "am")\n2. "I have 15 years" → "I am 15 years old" (use "be" for age)\n3. "I am here since 3 years" → "I have been here for 3 years" (present perfect + for)\n4. "If I would be" → "If I were" (no "would" in if-clause)\n5. "Give me an advice" → "Give me some advice" (uncountable)\n6. "The person which" → "The person who" (who for people)\n7. "I must not go" vs. "I don\'t have to go" (forbidden vs. optional)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Self-Examination as Spiritual Discipline',
              scriptureRef: '2 Corinthians 13:5; Psalm 139:23-24',
              reflection: 'Paul says, "Examine yourselves to see whether you are in the faith." David prayed, "Search me, O God, and know my heart; test me and know my anxious thoughts." Self-examination is not about shame — it is about growth. When we honestly assess our English skills, we follow the same principle: we identify weaknesses not to condemn ourselves, but to grow stronger. God meets us in our honesty.',
              applicationQuestion: 'How does honest self-assessment (knowing what you are good at AND what you need to improve) help you grow — both in English and in life?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Without looking at notes, explain the difference between present perfect and past simple. When do you use each one? Why is this so hard for French speakers?',
                'Name the three types of conditionals and give one example of each from memory.',
                'What are your top 3 grammar weaknesses? Be honest. How will you work on them?',
              ],
            },
            {
              type: 'practice',
              activity: 'Comprehensive Grammar Audit',
              prompt: '**Part A — Error Correction:** Find and correct the error in each sentence:\n1. "I am agree with you."\n2. "She lives here since 2020."\n3. "If I would have more time, I would travel."\n4. "Give me an information about the program."\n5. "The doctor which helped me was kind."\n6. "I must not go to the meeting — it is optional."\n7. "I have visited Paris yesterday."\n8. "She is studying when the phone rang."\n9. "You should to eat more vegetables."\n10. "I am 15 years."\n\n**Part B — Sentence Construction:** Write one correct sentence for each:\n1. Present perfect with "for"\n2. Second conditional\n3. Passive voice\n4. Relative clause with "who"\n5. Modal of advice (should/ought to)',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word "Grammar Self-Assessment" essay. For each of the following grammar areas, rate yourself (Strong / Developing / Needs Work) and write 2-3 sentences explaining your rating with an example sentence:\n\n1. Present Simple and Present Continuous\n2. Past Simple and Past Continuous\n3. Present Perfect\n4. Future Tenses (will / going to / present continuous)\n5. Conditionals (zero, first, second)\n6. Passive Voice\n7. Relative Clauses\n8. Modals (should, must, have to, may)\n\nEnd with a paragraph: "My plan for improvement" — identify your 3 weakest areas and describe what you will do to strengthen them. Connect this to 2 Corinthians 13:5.',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Grammar and Vocabulary Consolidation',
        estimatedMinutes: 55,
        objectives: [
          'Review all B1 grammar areas: tenses, conditionals, passive, relative clauses, modals.',
          'Identify and correct common errors.',
          'Self-assess strengths and areas for improvement.',
          'Connect self-examination to biblical values.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How much English grammar have you learned this year? Today we review everything — tenses, conditionals, modals, relative clauses, and more. The goal is not perfection but honest self-assessment.',
              connection: 'The Bible says, "Examine yourselves" (2 Corinthians 13:5). Just as we check our spiritual growth, today we check our grammar growth — honestly and with a plan to improve.',
            },
            {
              type: 'text',
              heading: 'B1 Grammar Review',
              body: '**TENSES:**\n- Present simple (I study), present continuous (I am studying)\n- Past simple (I studied), past continuous (I was studying)\n- Present perfect (I have studied) — NOT the same as French passé composé!\n- Future: will / going to / present continuous\n\n**CONDITIONALS:**\n- Zero: "If you heat water, it boils." (fact)\n- First: "If I study, I will pass." (real)\n- Second: "If I were rich, I would travel." (imaginary)\n- NEVER: "If I would..."\n\n**PASSIVE:** "English is spoken here." (be + past participle)\n\n**RELATIVE CLAUSES:** who (people), which (things), that (both)\n\n**MODALS:** should (advice), must (obligation), must not (forbidden), don\'t have to (optional), may (permission)\n\n**Top French Speaker Errors:**\n1. "I am agree" → "I agree"\n2. "I have 15 years" → "I am 15 years old"\n3. "Since 3 years" → "For 3 years"\n4. "If I would be" → "If I were"\n5. "An advice" → "Some advice"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honest Self-Examination',
              scriptureRef: '2 Corinthians 13:5',
              reflection: 'Paul asks us to examine ourselves honestly. When we check our grammar, we are practicing the same skill — looking honestly at where we are strong and where we need to grow. God meets us in our honesty.',
              applicationQuestion: 'Why is it important to be honest about what you don\'t know yet?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which grammar area do you find the hardest? Why?',
                'Explain the difference between "I visited Paris" and "I have visited Paris." When do you use each?',
                'Give an example of each: should, must, must not, don\'t have to.',
              ],
            },
            {
              type: 'practice',
              activity: 'Error Correction',
              prompt: 'Find and correct the error in each sentence:\n1. "I am agree with you."\n2. "She lives here since 2020."\n3. "If I would have money, I would buy it."\n4. "The person which helped me was kind."\n5. "I must not go — it is my choice." (if it is optional)\n6. "I have visited Rome yesterday."\n7. "Give me an advice."\n8. "I have 20 years old."\n\nNow write 3 correct sentences of your own: one with present perfect, one conditional, one passive.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words assessing your grammar skills. For these areas, say whether you are "strong," "developing," or "need more work":\n1. Tenses (present, past, future)\n2. Conditionals\n3. Modals\n4. Relative clauses\n\nFor each area, write one example sentence showing your skill. End with 2-3 sentences about what you will do to improve, connected to 2 Corinthians 13:5.',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Grammar and Vocabulary Consolidation',
        estimatedMinutes: 40,
        objectives: [
          'Review key B1 grammar: tenses, conditionals, modals.',
          'Correct common French-speaker errors.',
          'Identify personal grammar strengths and weaknesses.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How much grammar do you remember from this year? Today we review the most important rules. Don\'t worry about being perfect — focus on what you know and what you still need to practice.',
              connection: 'The Bible says to "examine yourself" (2 Corinthians 13:5). Checking what you know and what you need to learn is a good habit — in English and in life.',
            },
            {
              type: 'text',
              heading: 'Grammar Quick Review',
              body: '**Tenses:**\n- Present: "I study every day."\n- Past: "I studied yesterday."\n- Present perfect: "I have studied English for 2 years."\n- Future: "I will study" / "I am going to study"\n\n**Conditionals:**\n- Real: "If I study, I will pass."\n- Imaginary: "If I were rich, I would travel."\n- NEVER say "If I would..."\n\n**Modals:**\n- Should (advice), must (required), must not (forbidden), don\'t have to (optional)\n\n**Common Mistakes to Fix:**\n- "I am agree" → "I agree"\n- "I have 15 years" → "I am 15 years old"\n- "Since 3 years" → "For 3 years"\n- "An advice" → "Some advice"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Being Honest About Our Growth',
              scriptureRef: '2 Corinthians 13:5',
              reflection: 'God wants us to be honest about where we are — not to feel bad, but to grow. Checking your English skills is like checking your heart — it helps you get better.',
              applicationQuestion: 'What is one grammar rule you know well? What is one you need to practice more?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which grammar topic do you find easiest? Which is hardest?',
                'Fix this sentence: "If I would be a teacher, I would help students."',
              ],
            },
            {
              type: 'practice',
              activity: 'Quick Grammar Check',
              prompt: 'Fix each mistake:\n1. "I am agree."\n2. "I have 14 years."\n3. "I live here since 2022."\n4. "If I would have money, I buy a car."\n5. "Give me an advice."\n\nNow write 3 correct sentences: one past tense, one future, one conditional.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words about what you have learned in English this year. Say:\n- What grammar topics you feel strong about (give an example sentence)\n- What you still need to practice (give an example of a mistake you make)\n- What you will do to improve\n- One sentence about 2 Corinthians 13:5 and honest self-examination',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'consolidation', definition: 'The process of bringing things together and making them stronger', example: 'Grammar consolidation means reviewing everything you have learned so it sticks.' },
      { term: 'self-assessment', definition: 'The act of judging your own abilities and performance', example: 'Honest self-assessment helps you know where to focus your study time.' },
      { term: 'present perfect', definition: 'A tense formed with have/has + past participle, connecting past to present', example: '"I have studied English for two years" uses present perfect because you are still studying.' },
      { term: 'passive voice', definition: 'A sentence structure where the subject receives the action (be + past participle)', example: '"English is spoken in many countries" is passive — the subject receives the action.' },
      { term: 'persistent error', definition: 'A mistake that keeps happening even after you have been corrected', example: 'Saying "I am agree" is a persistent error for many French speakers.' },
      { term: 'proficiency', definition: 'A high level of skill or ability in something', example: 'B1 proficiency means you can handle most everyday English situations independently.' },
    ],
    quiz: [
      { question: 'Which sentence is correct?', options: ['I am agree with you.', 'I agree with you.', 'I have agree with you.', 'I do agree to you.'], correctAnswer: 1, explanation: 'In English, "agree" does not use "am" — say "I agree," not "I am agree."' },
      { question: '"She ___ here since 2020."', options: ['lives', 'lived', 'has lived', 'is living'], correctAnswer: 2, explanation: 'Present perfect with "since" for actions that started in the past and continue: "She has lived here since 2020."' },
      { question: 'Which sentence uses passive voice correctly?', options: ['English spoken worldwide.', 'English is spoken worldwide.', 'English is speak worldwide.', 'English are spoken worldwide.'], correctAnswer: 1, explanation: 'Passive voice: be + past participle. "English is spoken worldwide."' },
      { question: '"If I ___ you, I would study harder."', options: ['am', 'was', 'were', 'would be'], correctAnswer: 2, explanation: 'Second conditional subjunctive: "If I were you" — not "was" or "would be."' },
      { question: 'Which is correct?', options: ['I have 16 years.', 'I am 16 years old.', 'I have 16 years old.', 'I am having 16 years.'], correctAnswer: 1, explanation: 'In English, use "be" for age: "I am 16 years old." French uses "avoir" (have), but English does not.' },
      { question: '"I visited Paris ___."', options: ['yesterday', 'since yesterday', 'for yesterday', 'already yesterday'], correctAnswer: 0, explanation: 'Past simple with a specific time: "I visited Paris yesterday." (Not present perfect with "yesterday.")' },
      { question: 'Which modal expresses "not necessary"?', options: ['must not', 'should not', 'don\'t have to', 'cannot'], correctAnswer: 2, explanation: '"Don\'t have to" means not necessary. "Must not" means forbidden — very different!' },
      { question: '"The teacher ___ helped me is retiring."', options: ['which', 'who', 'whom', 'whose'], correctAnswer: 1, explanation: 'Use "who" for people: "The teacher who helped me."' },
      { question: 'What does 2 Corinthians 13:5 teach us about self-examination?', options: ['Never look at your mistakes.', 'Examine yourself honestly to grow.', 'Only focus on your strengths.', 'Let others judge you.'], correctAnswer: 1, explanation: 'Paul says, "Examine yourselves" — honest self-assessment leads to growth, not shame.' },
      { question: '"Give me ___." (correct English for advice)', options: ['an advice', 'advices', 'some advice', 'a advice'], correctAnswer: 2, explanation: '"Advice" is uncountable in English — say "some advice," not "an advice."' },
    ],
  },

  // ── W34: Integrated Skills Practice (INSTRUCTION) ─────────────────────────
  {
    weekNumber: 2,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Integrated Skills Practice',
        estimatedMinutes: 70,
        objectives: [
          'Combine reading, writing, listening, and speaking skills in integrated tasks.',
          'Handle real-world communication scenarios: emails, discussions, comprehension exercises.',
          'Apply all B1 grammar and vocabulary in practical, authentic contexts.',
          'Demonstrate ability to read a passage, discuss it, and write a response.',
          'Connect communication skills to the biblical call to use words wisely.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In real life, language skills do not come one at a time. You read an email, discuss it with a colleague, then write a response — all in the same conversation. Today we practice combining ALL your English skills in realistic scenarios that you might encounter in school, work, or daily life.',
              connection: 'Proverbs 25:11 says, "A word fitly spoken is like apples of gold in settings of silver." Using the right words at the right time — in reading, writing, and speaking — is a skill God values. Today we practice putting it all together.',
            },
            {
              type: 'text',
              heading: 'Integrated Skills: Reading + Discussion + Writing',
              body: '**Why Integrated Skills Matter:**\nLanguage tests (TOEFL, IELTS, Duolingo English Test) do not test grammar in isolation. They ask you to read a passage, then write about it, or listen to a lecture, then discuss it. Real life works the same way.\n\n**Task Type 1 — Read and Respond:**\nRead a passage → Identify main ideas → Write a summary or response\nSkills used: reading comprehension, vocabulary, writing, grammar\n\n**Task Type 2 — Email Communication:**\nRead a scenario → Write an appropriate email (formal or informal)\nSkills used: register awareness, grammar, vocabulary, cultural knowledge\nKey difference from French: English formal emails are less formal than French. "Dear Mr. Smith" is sufficient — you do NOT need "Cher Monsieur Smith, je vous prie d\'agréer..."\n\n**Task Type 3 — Discussion and Summary:**\nRead multiple viewpoints → Discuss pros/cons → Write your position\nSkills used: reading, critical thinking, hedging language, connectors\n\n**Email Register in English:**\n- **Formal:** "Dear Mr./Ms. [Name], I am writing to inquire about... I would appreciate... Sincerely, [Your Name]"\n- **Semi-formal:** "Hi [Name], I wanted to ask about... Thanks, [Your Name]"\n- **Informal:** "Hey [Name], Quick question — ... Talk soon!"\n\nFrench emails are typically more formal than English ones. In English, even professional emails can use "Hi" instead of "Dear" — this feels too casual for French speakers, but it is perfectly normal.',
            },
            {
              type: 'text',
              heading: 'Reading Passage — Community Garden Debate',
              body: 'The following passage presents two viewpoints about a community issue. Read it carefully.\n\n**Should Our School Start a Community Garden?**\n\nTwo parents share their views.\n\n**Parent A — Maria Rodriguez:**\n"I strongly believe our school should start a community garden. Research shows that students who participate in gardening programs show improved academic performance, particularly in science. Furthermore, a garden would teach students responsibility and teamwork. Many families in our neighborhood struggle to afford fresh produce, and a garden could provide healthy food to those who need it most. If we invest a small amount now, the benefits will last for years."\n\n**Parent B — James Chen:**\n"While I appreciate the idea, I have concerns about the practical aspects. The school\'s budget is already tight, and maintaining a garden requires ongoing funding for tools, soil, and water. Additionally, who would care for the garden during summer vacation? I believe our limited resources would be better spent on improving the computer lab, which would benefit all students equally. However, if the garden could be funded entirely through donations, I would be open to reconsidering."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Words Fitly Spoken',
              scriptureRef: 'Proverbs 25:11; James 3:2',
              reflection: 'Proverbs says that the right words at the right time are as beautiful as gold apples in silver settings. James says, "If anyone does not stumble in what he says, he is a perfect man." Mastering integrated communication — knowing what to say, how to say it, and when — is a form of wisdom. Whether writing an email, discussing a problem, or responding to a text, every word matters.',
              applicationQuestion: 'Think of a time when the right words at the right time made a difference. How does practicing English communication help you become someone whose words are "fitly spoken"?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Summarize Parent A\'s position in 2-3 sentences. What evidence does she use?',
                'Summarize Parent B\'s position. What is his main concern? Does he completely reject the garden idea?',
                'Which parent uses more hedging language? Give specific examples. Why might hedging make an argument MORE persuasive?',
                'What would YOU say in this debate? Use pros/cons language and at least one conditional.',
              ],
            },
            {
              type: 'practice',
              activity: 'Email Writing Challenge',
              prompt: 'Write TWO emails about the community garden:\n\n**Email 1 (Formal):** Write to the school principal requesting permission to start a community garden. Include at least one fact from the reading passage, one conditional sentence, and formal email structure.\n\n**Email 2 (Semi-formal):** Write to a friend asking them to volunteer for the garden project. Be more casual, but still clear and organized.\n\nAfter writing both emails, note 3 differences in language between the formal and semi-formal versions.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word response essay to the community garden debate. Your essay must:\n- Summarize both parents\' positions (1 paragraph)\n- Present your own opinion with reasons (1 paragraph using hedging + conditionals)\n- Address a counterargument (1 paragraph using "However..." or "Although...")\n- Conclude with a recommendation (using decision language)\n- Use at least 6 linking words, 2 conditionals, and vocabulary from multiple units\n- Include a brief biblical reflection on community stewardship\n\nAfter your essay, write a "Skills Inventory": which of the four skills (reading, writing, speaking/discussion, comprehension) you used in this lesson and how.',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Integrated Skills Practice',
        estimatedMinutes: 55,
        objectives: [
          'Combine reading and writing in practical tasks.',
          'Write formal and informal emails in English.',
          'Discuss a reading passage and express opinions.',
          'Apply grammar from all prior units in real-world scenarios.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In real life, you don\'t just practice grammar — you read, write, talk, and listen all at the same time. Today we practice combining all your English skills in realistic activities.',
              connection: 'The Bible says the right words at the right time are like "apples of gold" (Proverbs 25:11). Knowing how to communicate well — reading, writing, discussing — honors God and helps others.',
            },
            {
              type: 'text',
              heading: 'Reading and Responding',
              body: '**Today\'s Reading — Community Garden Debate:**\n\nParent A (Maria) says the school should start a garden because it helps students learn science, teaches responsibility, and provides food for families who need it.\n\nParent B (James) says the budget is tight, the garden needs care in summer, and the money would be better spent on a computer lab. But he says he would reconsider if the garden were funded by donations.\n\n**Email Writing in English:**\n- **Formal email:** "Dear [Name], I am writing to... I would appreciate... Sincerely, [Name]"\n- **Informal email:** "Hi [Name], I wanted to tell you about... Thanks! [Name]"\n\nFrench emails tend to be very formal. In English, even work emails can start with "Hi" — this is normal and polite.\n\n**Responding to a Reading:**\n1. Summarize what you read (1-2 sentences per viewpoint)\n2. State your opinion: "I agree with... because..." or "In my opinion..."\n3. Use linking words: however, therefore, for example',
            },
            {
              type: 'biblical-worldview',
              theme: 'Using Words Wisely',
              scriptureRef: 'Proverbs 25:11',
              reflection: 'God cares about how we communicate. The right words at the right time can encourage, persuade, and build up. Today\'s practice helps you become someone whose words are wise and well-chosen.',
              applicationQuestion: 'When do you need to communicate carefully in English? How can today\'s practice help you?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is Parent A\'s main argument for the garden? What evidence does she use?',
                'What is Parent B\'s concern? Does he completely reject the idea?',
                'What is YOUR opinion? Use "I believe... because..." and "However..."',
              ],
            },
            {
              type: 'practice',
              activity: 'Email Writing',
              prompt: 'Write a formal email to your school principal asking for permission to start a community garden. Include:\n- A formal greeting (Dear...)\n- Your request and one reason with evidence\n- A closing (Sincerely, ...)\n\nThen write a short informal message to a friend about the same topic.\n\nNote 2 differences between the formal and informal versions.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words responding to the community garden debate. Include:\n- A summary of both parents\' views (3-4 sentences)\n- Your opinion with reasons (use "I believe..." and "In my opinion...")\n- At least 1 conditional sentence\n- At least 3 linking words\n- A sentence connecting community projects to biblical values',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Integrated Skills Practice',
        estimatedMinutes: 40,
        objectives: [
          'Read a short passage and answer questions about it.',
          'Write a short email in English.',
          'Express an opinion about what you read.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In real life, you read things and then you have to write about them or talk about them. Today we practice doing both — reading and writing together.',
              connection: 'God wants us to use our words wisely (Proverbs 25:11). Today we practice reading and writing in English so our words can be clear and helpful.',
            },
            {
              type: 'text',
              heading: 'Read and Respond',
              body: '**Short Reading:**\nTwo parents disagree about a school garden. Maria says a garden would help students learn science and provide food for families. James says the school does not have enough money and should spend it on computers instead.\n\n**Your Job:**\n1. Read the text carefully.\n2. Answer: Who do you agree with? Why?\n3. Write a short email about it.\n\n**Simple Email Format:**\n- Start: "Dear [Name]," or "Hi [Name],"\n- Middle: Say what you want to say.\n- End: "Thank you," or "Thanks!" + your name',
            },
            {
              type: 'biblical-worldview',
              theme: 'Good Communication',
              scriptureRef: 'Proverbs 25:11',
              reflection: 'Good words at the right time are beautiful, like gold and silver. God wants us to communicate well and clearly.',
              applicationQuestion: 'Why is it important to be clear when you write in English?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What does Maria want? What does James want?',
                'Who do you agree with? Why?',
              ],
            },
            {
              type: 'practice',
              activity: 'Write a Simple Email',
              prompt: 'Write a short email to your teacher asking about a school project. Include:\n- A greeting (Dear/Hi...)\n- Your question (1-2 sentences)\n- A closing (Thank you + your name)',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words giving your opinion about the garden debate. Say:\n- What Maria and James think (2-3 sentences)\n- What you think and why (2-3 sentences)\n- Use "I believe... because..." and "however" at least once\n- Include one sentence about why good communication matters (Proverbs 25:11)',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'integrated', definition: 'Combined together into a whole; using multiple skills at once', example: 'An integrated task combines reading, writing, and discussion in one activity.' },
      { term: 'register', definition: 'The level of formality in language (formal, semi-formal, informal)', example: 'A formal register uses "Dear Sir," while an informal register uses "Hey!"' },
      { term: 'comprehension', definition: 'The ability to understand something, especially a text or speech', example: 'Reading comprehension means understanding what you read, not just saying the words.' },
      { term: 'scenario', definition: 'A description of a possible situation; a real-world context', example: 'In today\'s scenario, you are writing an email to your school principal.' },
      { term: 'viewpoint', definition: 'A person\'s opinion or way of thinking about something', example: 'The two parents had different viewpoints about the community garden.' },
      { term: 'formal email', definition: 'An email written in professional language with proper greetings and closings', example: 'A formal email begins with "Dear Mr./Ms. [Name]" and ends with "Sincerely."' },
    ],
    quiz: [
      { question: 'Which is a correct FORMAL email greeting?', options: ['Hey dude,', 'Dear Mr. Johnson,', 'Yo James,', 'What\'s up,'], correctAnswer: 1, explanation: '"Dear Mr./Ms. [Last Name]" is the standard formal email greeting in English.' },
      { question: 'In the community garden debate, what is James\'s main concern?', options: ['He hates gardens.', 'The school budget is tight and resources are limited.', 'He wants a swimming pool instead.', 'He thinks gardens are bad for health.'], correctAnswer: 1, explanation: 'James worries about the budget and maintenance costs, not about gardens in general.' },
      { question: 'Which sentence correctly summarizes a reading passage?', options: ['The article says stuff about gardens.', 'According to the article, school gardens improve academic performance and teach responsibility.', 'Gardens are good I think.', 'Maria and James talked.'], correctAnswer: 1, explanation: 'A good summary is specific, uses "According to..." and identifies key points.' },
      { question: 'In English formal emails, what is an appropriate closing?', options: ['See ya!', 'Sincerely,', 'Bye bye,', 'Later,'], correctAnswer: 1, explanation: '"Sincerely" is the standard closing for formal English emails.' },
      { question: 'Which skill combination makes a task "integrated"?', options: ['Only reading', 'Only writing', 'Reading + writing + discussion combined', 'Only grammar exercises'], correctAnswer: 2, explanation: 'Integrated skills practice combines multiple skills (reading, writing, speaking, listening) in one task.' },
      { question: 'French formal emails are typically ___ than English formal emails.', options: ['shorter', 'more formal', 'less formal', 'exactly the same'], correctAnswer: 1, explanation: 'French business correspondence tends to be much more formal than English, with elaborate closings that English does not use.' },
      { question: 'What does "register" mean in language?', options: ['A cash register', 'The level of formality in language', 'A type of grammar', 'A French word'], correctAnswer: 1, explanation: 'Register refers to formality level: formal, semi-formal, or informal language.' },
      { question: 'Which linking word introduces a CONTRAST in a response essay?', options: ['Furthermore', 'Therefore', 'However', 'In addition'], correctAnswer: 2, explanation: '"However" introduces a contrasting idea — useful when presenting a counterargument.' },
      { question: 'According to Proverbs 25:11, good words at the right time are like:', options: ['Water in a desert', 'Apples of gold in settings of silver', 'Bread for the hungry', 'Stars in the sky'], correctAnswer: 1, explanation: 'Proverbs 25:11: "A word fitly spoken is like apples of gold in settings of silver."' },
      { question: 'When writing a response to a reading, you should FIRST:', options: ['Give your opinion immediately.', 'Summarize what you read.', 'Criticize the author.', 'Copy the text.'], correctAnswer: 1, explanation: 'A good response starts with a summary of what you read before giving your opinion.' },
    ],
  },

  // ── W35: Test Preparation Strategies (INSTRUCTION) ────────────────────────
  {
    weekNumber: 3,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Test Preparation Strategies',
        estimatedMinutes: 70,
        objectives: [
          'Understand the formats and requirements of TOEFL, IELTS, and Duolingo English Test.',
          'Learn test-specific strategies for reading, writing, listening, and speaking sections.',
          'Understand what B1 proficiency means on each standardized test scale.',
          'Practice time management and strategic approaches to test questions.',
          'Connect preparation and diligence to biblical principles of stewardship.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have been building your English skills all year. But when the time comes to prove what you know on a formal test, knowing English is not enough — you also need to know the test. TOEFL, IELTS, and Duolingo English Test all measure the same skills but in very different ways. How do you prepare for something you have never seen before?',
              connection: 'Proverbs 21:5 says, "The plans of the diligent lead to profit." Preparation is not about tricks or shortcuts — it is about diligence, planning, and wise use of the abilities God has given you. Today we prepare strategically.',
            },
            {
              type: 'text',
              heading: 'Major English Proficiency Tests',
              body: '**TOEFL (Test of English as a Foreign Language):**\n- Computer-based, ~3 hours\n- 4 sections: Reading, Listening, Speaking, Writing\n- Score: 0-120 (B1 ≈ 42-71)\n- Academic English focus\n- Speaking: recorded responses to prompts\n- Writing: integrated (read+listen+write) and independent essays\n- Popular for: US and Canadian universities\n\n**IELTS (International English Language Testing System):**\n- 2 versions: Academic and General Training\n- ~2 hours 45 minutes\n- 4 sections: Listening, Reading, Writing, Speaking\n- Score: Band 1-9 (B1 ≈ Band 4-5)\n- Speaking: face-to-face interview with an examiner\n- Writing: 2 tasks (Task 1: describe data/letter; Task 2: essay)\n- Popular for: UK, Australia, EU universities; immigration\n\n**Duolingo English Test (DET):**\n- Online, ~1 hour\n- Adaptive (questions get harder/easier based on your answers)\n- Score: 10-160 (B1 ≈ 85-105)\n- Mix of reading, writing, listening, speaking in integrated format\n- Includes a video interview and writing sample reviewed by humans\n- Popular for: growing acceptance at universities worldwide, often cheaper and faster than TOEFL/IELTS\n\n**B1 on the CEFR means you can:**\n- Understand the main points of clear standard speech on familiar topics\n- Handle most travel situations\n- Write simple connected text on familiar topics\n- Describe experiences, events, dreams, and briefly give reasons and explanations',
            },
            {
              type: 'text',
              heading: 'Test Strategies and Time Management',
              body: '**Universal Strategies:**\n1. **Read the questions first** (for reading sections) — know what you are looking for before you read the passage\n2. **Manage your time** — divide total time by number of questions; do not spend too long on one question\n3. **Eliminate wrong answers** — in multiple choice, cross out obviously wrong options first\n4. **Do not leave blanks** — guess if you must (TOEFL/DET have no penalty for wrong answers; IELTS does not either)\n5. **Practice with real tests** — official practice materials are available free online for all three tests\n\n**Reading Strategies:**\n- Skim first (get the general idea), then scan for specific answers\n- Look for keywords from questions in the text\n- Watch for "traps": answers that are partially correct\n\n**Writing Strategies:**\n- Plan before you write (2-3 minutes outlining)\n- Introduction → body paragraphs → conclusion\n- Use linking words generously (TOEFL and IELTS graders look for cohesion)\n- Aim for accuracy over complexity — a clear B1 essay scores better than a confusing attempt at C1\n\n**Speaking Strategies:**\n- TOEFL: practice recording yourself and listening back\n- IELTS: practice answering questions in 2-minute blocks\n- Both: it is okay to pause briefly to think — say "Let me think about that" rather than "ummm"\n\n**Time Management Formula:**\nTotal time ÷ number of questions = maximum time per question\nExamples: TOEFL reading: 54 minutes ÷ 30 questions ≈ 1.8 minutes per question',
            },
            {
              type: 'biblical-worldview',
              theme: 'Diligence and Preparation',
              scriptureRef: 'Proverbs 21:5; Colossians 3:23',
              reflection: 'Proverbs says, "The plans of the diligent lead to profit, as surely as haste leads to poverty." Colossians adds, "Whatever you do, work at it with all your heart, as working for the Lord." Test preparation is not just about a score — it is about stewardship. God gave you a mind and the opportunity to learn English. Preparing diligently honors that gift. Whether you take TOEFL, IELTS, or the Duolingo test, do it with excellence as an offering to God.',
              applicationQuestion: 'How is diligent preparation for a test similar to diligence in your spiritual life? How does working "as for the Lord" change your motivation?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Compare TOEFL, IELTS, and DET: which test seems best suited for your goals? Why?',
                'What B1 CEFR skills do you feel confident about? Which ones need more work?',
                'Practice the strategy: "Read questions before the passage." Why does this help? When might it NOT help?',
              ],
            },
            {
              type: 'practice',
              activity: 'Timed Test Simulation',
              prompt: '**Mini Reading Comprehension — 8 minutes**\n\nRead this passage and answer the questions:\n\n"Clean water access remains one of the most critical public health challenges worldwide. According to the World Health Organization, approximately 2 billion people use a drinking water source contaminated with bacteria. In developing nations, waterborne diseases cause an estimated 485,000 deaths annually. However, simple solutions exist: water filtration, proper sanitation, and community education programs have reduced waterborne illness by up to 60% in areas where they have been implemented. If governments invested just $1 per citizen in water infrastructure, the return in reduced healthcare costs would be $4-12 for every dollar spent."\n\n1. How many people use contaminated water sources?\n2. What three solutions does the passage mention?\n3. What would happen if governments invested $1 per citizen? (Identify the conditional type.)\n4. Is the overall tone of this passage optimistic, pessimistic, or balanced? Cite evidence.\n5. Write a one-sentence summary of the passage.\n\nAfter answering, note how long it took you. Could you do it in 5 minutes?',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 300-400 word "Test Preparation Action Plan." Include:\n\n**Part 1 — Self-Assessment (100 words):** Rate your skills in reading, writing, speaking, and listening. Which are strongest? Which need work?\n\n**Part 2 — Test Selection (80 words):** Which test (TOEFL, IELTS, or DET) would you choose and why? Use pros/cons language.\n\n**Part 3 — Study Plan (120 words):** Outline a weekly study schedule. What will you practice each day? How will you manage your time?\n\n**Part 4 — Biblical Reflection (80 words):** Connect your preparation plan to Proverbs 21:5 and Colossians 3:23. How does working diligently honor God?',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Test Preparation Strategies',
        estimatedMinutes: 55,
        objectives: [
          'Learn the basic formats of TOEFL, IELTS, and Duolingo English Test.',
          'Understand what B1 proficiency means.',
          'Learn time management and basic test-taking strategies.',
          'Connect preparation to biblical values.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'One day you may need to take an English test for university or work. There are three main tests: TOEFL, IELTS, and Duolingo. Today we learn what they look like and how to prepare.',
              connection: 'Proverbs says, "The plans of the diligent lead to profit" (21:5). Being prepared for a test is not about luck — it is about planning, practice, and diligence. God honors hard work.',
            },
            {
              type: 'text',
              heading: 'English Proficiency Tests and Strategies',
              body: '**Three Main Tests:**\n\n**TOEFL:** Computer-based, ~3 hours. Reading, Listening, Speaking, Writing. Score: 0-120. B1 ≈ 42-71. Popular for US/Canadian universities.\n\n**IELTS:** ~2.5 hours. Listening, Reading, Writing, Speaking (with a real person!). Score: Band 1-9. B1 ≈ Band 4-5. Popular for UK/Australia.\n\n**Duolingo English Test:** Online, ~1 hour. Reading + Writing + Listening + Speaking mixed together. Score: 10-160. B1 ≈ 85-105. Growing acceptance everywhere.\n\n**What B1 Means:** You can understand main ideas, handle everyday situations, write about familiar topics, and describe experiences.\n\n**Key Strategies:**\n1. Read the questions before the passage\n2. Manage your time — don\'t spend too long on one question\n3. Eliminate obviously wrong answers first\n4. Never leave a blank — always guess\n5. Plan your writing before you start (2-3 minutes of outlining)\n6. Use linking words in writing (graders look for these!)\n7. In speaking, say "Let me think about that" instead of "ummm"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Diligent Preparation',
              scriptureRef: 'Proverbs 21:5; Colossians 3:23',
              reflection: 'God values hard work and preparation. Colossians says, "Whatever you do, work at it with all your heart, as working for the Lord." Preparing well for a test is a way of honoring the abilities God gave you.',
              applicationQuestion: 'How does knowing you are working "for the Lord" change how you feel about studying for a test?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which of the three tests sounds most interesting to you? Why?',
                'Which strategy do you think would help you most? Why?',
                'What B1 skills do you feel strong in? What needs more practice?',
              ],
            },
            {
              type: 'practice',
              activity: 'Quick Reading Practice',
              prompt: 'Read this paragraph and answer in 5 minutes:\n\n"Clean water is a basic human right, yet 2 billion people drink contaminated water. Waterborne diseases kill 485,000 people each year. However, simple solutions like water filtration and education have reduced illness by 60% where implemented."\n\n1. How many people drink contaminated water?\n2. What solutions are mentioned?\n3. Has the situation improved where solutions were used?\n4. Write a one-sentence summary.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 200-300 words about your test preparation plan. Include:\n- Which test you might take and why\n- Your strongest skill and your weakest skill\n- Three things you will do to prepare\n- A connection to Proverbs 21:5 about diligent preparation',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Test Preparation Strategies',
        estimatedMinutes: 40,
        objectives: [
          'Know the names and basic formats of TOEFL, IELTS, and Duolingo English Test.',
          'Learn three simple test-taking strategies.',
          'Understand what B1 level means in everyday terms.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Did you know there are special tests that measure how good your English is? They are called TOEFL, IELTS, and the Duolingo English Test. Today we learn what they are and how to do well on them.',
              connection: 'God says that hard work leads to success (Proverbs 21:5). Preparing for a test is a way to use the mind God gave you well.',
            },
            {
              type: 'text',
              heading: 'English Tests You Should Know',
              body: '**TOEFL** — A computer test, about 3 hours. Reading, Listening, Speaking, Writing. Used for universities in the US.\n\n**IELTS** — About 2.5 hours. You talk to a real person for the speaking part! Used for universities in the UK.\n\n**Duolingo English Test** — Online, only 1 hour. Mix of everything. Cheaper and faster.\n\n**B1 Level Means:** You can understand everyday English, have simple conversations, write about things you know, and describe your experiences.\n\n**Three Easy Tips:**\n1. Read the questions BEFORE the text — then look for answers.\n2. Don\'t spend too long on one question — move on and come back.\n3. Never leave a blank — always guess if you are not sure.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Working Hard',
              scriptureRef: 'Proverbs 21:5',
              reflection: 'God says that people who plan and work hard succeed. Studying for a test is a good way to use the talents God gave you.',
              applicationQuestion: 'What can you do this week to prepare your English for the future?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Name the three English tests. Which one is the shortest?',
                'What does B1 level mean in simple words?',
              ],
            },
            {
              type: 'practice',
              activity: 'Simple Reading Practice',
              prompt: 'Read this short paragraph and answer:\n"Clean water is very important. Two billion people drink dirty water. Simple solutions like water filters can help."\n\n1. How many people drink dirty water?\n2. What can help fix this problem?\n3. Write one sentence summarizing the paragraph.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write 150-200 words about preparing for English tests. Answer:\n- Name one test you might take\n- What is your best English skill? What needs improvement?\n- What is one thing you will do to get better at English?\n- Include one sentence about why God values hard work (Proverbs 21:5)',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'TOEFL', definition: 'Test of English as a Foreign Language — a computer-based test used mainly for US/Canadian university admission', example: 'She scored 85 on the TOEFL, which was enough for university admission.' },
      { term: 'IELTS', definition: 'International English Language Testing System — a test used for UK/Australian universities and immigration', example: 'He got Band 5.5 on IELTS, which corresponds to B1-B2 level.' },
      { term: 'proficiency', definition: 'A high level of skill or competence in something', example: 'B1 proficiency means you can handle everyday situations in English independently.' },
      { term: 'CEFR', definition: 'Common European Framework of Reference for Languages — the international scale for language levels (A1 to C2)', example: 'The CEFR defines six levels from A1 (beginner) to C2 (mastery).' },
      { term: 'time management', definition: 'The ability to use your time effectively and productively', example: 'Good time management on a test means not spending too long on any one question.' },
      { term: 'eliminate', definition: 'To remove or rule out; in test-taking, to cross out wrong answer choices', example: 'Before guessing, eliminate the answers you know are wrong — this improves your chances.' },
    ],
    quiz: [
      { question: 'Which test is computer-based and about 3 hours long?', options: ['IELTS', 'TOEFL', 'Duolingo English Test', 'Cambridge'], correctAnswer: 1, explanation: 'TOEFL is computer-based and takes approximately 3 hours.' },
      { question: 'What does B1 on the CEFR mean?', options: ['Complete beginner', 'Can understand main ideas and handle everyday situations', 'Near-native fluency', 'Can only say basic greetings'], correctAnswer: 1, explanation: 'B1 (Intermediate) means you can understand main points of clear speech and handle most everyday situations.' },
      { question: 'Which test includes a face-to-face speaking interview?', options: ['TOEFL', 'Duolingo', 'IELTS', 'None of them'], correctAnswer: 2, explanation: 'IELTS includes a speaking section with a real human examiner, face to face.' },
      { question: 'What is the FIRST thing you should do with a reading passage on a test?', options: ['Read the whole passage slowly.', 'Read the questions first.', 'Guess the answers.', 'Skip it.'], correctAnswer: 1, explanation: 'Reading the questions first helps you know what to look for when you read the passage.' },
      { question: 'The Duolingo English Test takes approximately:', options: ['3 hours', '2.5 hours', '1 hour', '4 hours'], correctAnswer: 2, explanation: 'The Duolingo English Test takes about 1 hour, making it the shortest of the three major tests.' },
      { question: 'What should you do if you do not know the answer to a test question?', options: ['Leave it blank.', 'Ask the teacher.', 'Guess — never leave blanks.', 'Write "I don\'t know."'], correctAnswer: 2, explanation: 'Always guess if unsure — there is usually no penalty for wrong answers, and a guess might be correct.' },
      { question: 'Which Proverbs verse connects diligence to success?', options: ['Proverbs 25:11', 'Proverbs 21:5', 'Proverbs 15:22', 'Proverbs 2:4'], correctAnswer: 1, explanation: 'Proverbs 21:5: "The plans of the diligent lead to profit, as surely as haste leads to poverty."' },
      { question: 'In test writing sections, what should you do BEFORE writing?', options: ['Start writing immediately.', 'Plan and outline for 2-3 minutes.', 'Copy from the passage.', 'Ask for more time.'], correctAnswer: 1, explanation: 'Planning for 2-3 minutes before writing leads to a better-organized, higher-scoring response.' },
      { question: 'Instead of saying "ummm" in a speaking test, you should say:', options: ['"I don\'t know."', '"Let me think about that."', 'Nothing — stay silent.', '"Pass."'], correctAnswer: 1, explanation: '"Let me think about that" sounds natural and professional while giving you time to organize your thoughts.' },
      { question: 'What does "eliminate" mean in test-taking?', options: ['Skip the question', 'Cross out obviously wrong answers', 'Choose the first answer', 'Read faster'], correctAnswer: 1, explanation: 'Eliminating wrong answers means crossing out choices you know are incorrect, improving your chances of choosing correctly.' },
    ],
  },

  // ── W36: Level 2 Final Assessment (PROJECT) ───────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      // ── ADVANCED (70 min) ──
      {
        pathway: 'ADVANCED',
        title: 'Level 2 Final Assessment',
        estimatedMinutes: 70,
        objectives: [
          'Demonstrate B1 reading comprehension through a timed reading passage with questions.',
          'Demonstrate B1 writing ability through a structured opinion paragraph.',
          'Demonstrate B1 listening comprehension through audio-based exercises.',
          'Demonstrate B1 speaking ability through an oral interview structure.',
          'Complete a self-evaluation and readiness checklist for Level 3.',
          'Reflect on growth and preparation as spiritual discipline.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is it — the culmination of your Level 2 journey. When you started, you were at A2. Now you are ready to demonstrate B1 skills. This is not just a test. It is a celebration of how far you have come and an honest assessment of where you stand. Are you ready?',
              connection: 'Paul wrote to Timothy: "I have fought the good fight, I have finished the race, I have kept the faith" (2 Timothy 4:7). Completing Level 2 is a race you have run with diligence. Today, you cross the finish line and look forward to what comes next.',
            },
            {
              type: 'text',
              heading: 'Your Level 2 Final Assessment',
              body: 'Your final assessment has five parts, designed to mirror the B1 "can-do" statements from the CEFR:\n\n**Part 1 — Reading Comprehension (15 minutes):**\nRead a B1-level passage and answer 5 comprehension questions. You should be able to understand the main ideas and specific details of a clear, standard text on a familiar topic.\n\n**Part 2 — Listening Exercise (10 minutes):**\nListen to (or read the transcript of) a short conversation or announcement. Answer 5 questions about main ideas and specific details.\n\n**Part 3 — Writing Task (20 minutes):**\nWrite a 200-250 word opinion paragraph on a given topic. Your writing should be clear, connected, and use appropriate grammar and vocabulary.\n\n**Part 4 — Speaking (Oral Interview) (10 minutes):**\nAnswer 5 questions about yourself, your experiences, your future plans, and your opinions. Aim for responses of 3-5 sentences each.\n\n**Part 5 — Self-Evaluation and Readiness Checklist (15 minutes):**\nRate yourself honestly on each B1 can-do statement. Create an action plan for areas that need improvement before Level 3.\n\n**Assessment Criteria:**\n- Grammar accuracy (tenses, conditionals, modals, relative clauses)\n- Vocabulary range and precision\n- Coherence (logical organization, linking words)\n- Task completion (answering the question fully)\n- Fluency (for speaking — smoothness and confidence)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Finishing the Race',
              scriptureRef: '2 Timothy 4:7; Hebrews 12:1',
              reflection: 'Paul said, "I have fought the good fight, I have finished the race." Hebrews 12:1 urges us to "run with perseverance the race marked out for us." Completing Level 2 is a significant achievement. You have persevered through challenging grammar, unfamiliar vocabulary, and the constant mental effort of learning in a new language. Whether your assessment goes perfectly or reveals areas for growth, you should be proud of your diligence. God sees your effort.',
              applicationQuestion: 'As you complete Level 2, what are you most proud of? What has this journey taught you about perseverance?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Before starting the assessment, what are you most confident about? What are you most nervous about?',
                'Review the B1 can-do statements: (1) understand main ideas of clear speech, (2) handle travel situations, (3) write connected text, (4) describe experiences and give reasons. How would you rate yourself on each?',
                'What strategies from W35 will you apply during this assessment?',
              ],
            },
            {
              type: 'practice',
              activity: 'Assessment Part 1 — Reading Comprehension',
              prompt: '**Read this passage carefully, then answer the questions. Time: 15 minutes.**\n\n"Language learning has changed dramatically in the last two decades. When my parents studied English, they relied on textbooks, cassette tapes, and occasional interactions with native speakers. Today, students have access to apps that use artificial intelligence, online tutors who teach from across the globe, and immersive video content in any language they choose.\n\nHowever, technology alone does not guarantee success. Research from Cambridge University shows that the most successful language learners share three habits: they practice consistently (at least 20 minutes daily), they engage with real-world content (news, podcasts, conversations), and they are not afraid to make mistakes. Students who only use flashcard apps without real communication practice often plateau at an intermediate level.\n\nThe future of language education will likely combine technology with human connection. AI tutors can provide unlimited practice, but human teachers offer something AI cannot: cultural understanding, emotional support, and the ability to inspire. If schools invest in both, the next generation of language learners will be the most proficient in history."\n\n**Questions:**\n1. How did the author\'s parents learn English? Name two methods.\n2. According to Cambridge research, what three habits do successful language learners share?\n3. Why might students who only use flashcard apps reach a plateau?\n4. What does the passage say human teachers offer that AI cannot? Name two things.\n5. Identify the conditional sentence in the last paragraph. What type is it?',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: '**Assessment Part 3 — Writing Task (20 minutes):**\n\nWrite a 200-250 word opinion paragraph on this topic:\n\n"Is technology making language learning better or worse?"\n\nYour paragraph must include:\n- A clear topic sentence stating your opinion\n- At least 2 supporting reasons with evidence or examples\n- At least 1 counterargument ("Some people argue that... However...")\n- At least 3 linking words (however, therefore, furthermore, etc.)\n- At least 1 conditional sentence\n- A concluding sentence\n\n**Assessment Part 4 — Speaking (write your spoken responses):**\n\nAnswer each question in 3-5 sentences:\n1. Tell me about yourself — where you are from, what you study, and what you enjoy.\n2. Describe a person who has influenced your life. What did they do? Why are they important to you?\n3. What are your plans for the future? What are you going to do after you finish this course?\n4. If you could change one thing about your education, what would it be and why?\n5. Do you think English will become more or less important in the future? Why?\n\n**Assessment Part 5 — Self-Evaluation Checklist:**\nRate yourself (Confident / Developing / Not Yet) on each:\n- [ ] I can understand the main ideas of clear, standard speech on familiar topics.\n- [ ] I can handle most situations likely to arise while traveling.\n- [ ] I can write simple connected text on topics that are familiar or of personal interest.\n- [ ] I can describe experiences, events, and ambitions, and briefly give reasons and explanations.\n- [ ] I can use present, past, future, and conditional tenses correctly most of the time.\n- [ ] I can write a formal email and an informal message.\n- [ ] I can express and support my opinions using hedging language.\n\nFor any "Not Yet" items, write one sentence describing your plan to improve before Level 3.',
            },
          ],
        },
      },
      // ── STANDARD (55 min) ──
      {
        pathway: 'STANDARD',
        title: 'Level 2 Final Assessment',
        estimatedMinutes: 55,
        objectives: [
          'Demonstrate B1 reading comprehension through a reading exercise.',
          'Write an opinion paragraph demonstrating B1 writing.',
          'Answer speaking-style questions in writing.',
          'Complete a self-evaluation for Level 3 readiness.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have reached the end of Level 2! Today you show what you have learned. This assessment will test your reading, writing, and speaking skills. Remember — this is about showing your growth, not being perfect.',
              connection: 'Paul said, "I have finished the race" (2 Timothy 4:7). You are finishing YOUR race today. Be proud of how far you have come, and be honest about where you still need to grow.',
            },
            {
              type: 'text',
              heading: 'Your Final Assessment',
              body: 'Your assessment has four parts:\n\n**Part 1 — Reading (10 minutes):** Read a passage and answer 5 questions.\n**Part 2 — Writing (15 minutes):** Write an opinion paragraph (150-200 words).\n**Part 3 — Speaking (write your answers) (10 minutes):** Answer 4 questions in 2-3 sentences each.\n**Part 4 — Self-Evaluation (10 minutes):** Rate yourself on B1 skills.\n\n**Tips:**\n- Read questions before the passage\n- Plan your writing (outline first)\n- Use linking words and grammar from the year\n- Be honest in your self-evaluation',
            },
            {
              type: 'biblical-worldview',
              theme: 'Finishing Well',
              scriptureRef: '2 Timothy 4:7',
              reflection: 'Paul said he fought the good fight and finished the race. You have worked hard this year. Whether you feel ready or not, God sees your effort and is proud of your perseverance.',
              applicationQuestion: 'What are you most proud of learning this year?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What test strategies from W35 will you use today?',
                'What grammar topics do you feel most confident about?',
                'Take a deep breath. You are ready for this. What is your plan for the reading section?',
              ],
            },
            {
              type: 'practice',
              activity: 'Part 1 — Reading Comprehension',
              prompt: '**Read and answer (10 minutes):**\n\n"Language learning has changed a lot. In the past, students used textbooks and cassette tapes. Today, they use apps, online tutors, and videos. However, technology alone is not enough. Research shows that the best language learners practice every day, use real-world content, and are not afraid of mistakes. The future of language learning will combine technology with great teachers."\n\n1. How did people learn languages in the past?\n2. What do successful language learners do? (Name 2 things)\n3. Does technology alone guarantee success? What else is needed?\n4. What does the passage predict about the future?\n5. Write a one-sentence summary of the passage.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: '**Part 2 — Writing (15 minutes):**\nWrite 150-200 words on: "Is technology helpful for learning English?"\nInclude: a clear opinion, 2 reasons, 1 counterargument, 2 linking words, and a concluding sentence.\n\n**Part 3 — Speaking (write answers in 2-3 sentences each):**\n1. Tell me about yourself.\n2. What are your plans for the future?\n3. If you could change one thing about your school, what would it be?\n4. Do you think English is important? Why?\n\n**Part 4 — Self-Evaluation:**\nRate yourself (Confident / Developing / Not Yet):\n- [ ] I can understand the main ideas when people speak clearly.\n- [ ] I can write about familiar topics.\n- [ ] I can describe my experiences and plans.\n- [ ] I can use past, present, future, and conditional correctly.\n- [ ] I can write a simple email.\n\nFor any "Not Yet," write what you will do to improve.',
            },
          ],
        },
      },
      // ── VOCATIONAL (40 min) ──
      {
        pathway: 'VOCATIONAL',
        title: 'Level 2 Final Assessment',
        estimatedMinutes: 40,
        objectives: [
          'Read a short passage and answer basic comprehension questions.',
          'Write a short opinion paragraph.',
          'Answer simple speaking questions in writing.',
          'Self-evaluate strengths and areas for improvement.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have finished Level 2! Today you show what you have learned. Don\'t worry about being perfect. Just do your best and be proud of how much you have grown.',
              connection: 'Paul said, "I have finished the race" (2 Timothy 4:7). You are finishing your race today. God is proud of your hard work.',
            },
            {
              type: 'text',
              heading: 'Your Final Assessment',
              body: 'Today\'s assessment has three parts:\n\n**Part 1 — Reading:** Read a short paragraph and answer 4 questions.\n**Part 2 — Writing:** Write a short paragraph (100-150 words) giving your opinion.\n**Part 3 — Self-Check:** Rate yourself on what you can do in English.\n\n**Remember:**\n- Read the questions first\n- Do your best — nobody is perfect\n- Be honest about what you know and what you need to practice',
            },
            {
              type: 'biblical-worldview',
              theme: 'Finishing the Race',
              scriptureRef: '2 Timothy 4:7',
              reflection: 'You worked hard all year. God sees your effort and is happy with your perseverance. Finishing is something to be proud of.',
              applicationQuestion: 'What is one thing you are proud of learning this year?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is your best English skill? Reading, writing, or speaking?',
                'What do you still want to improve?',
              ],
            },
            {
              type: 'practice',
              activity: 'Part 1 — Reading',
              prompt: 'Read and answer:\n\n"Today, many people learn English with apps and online videos. Technology helps, but the best learners also practice every day and are not afraid to make mistakes."\n\n1. How do many people learn English today?\n2. What do the best learners do? (Name 2 things)\n3. Is technology enough by itself?\n4. Write one sentence about what you think.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: '**Part 2 — Writing:**\nWrite 100-150 words: "What I have learned in English this year." Include:\n- Two things you learned\n- One thing you want to improve\n- One conditional sentence\n- One sentence about why you are proud (connect to 2 Timothy 4:7)\n\n**Part 3 — Self-Check:**\nRate yourself (Yes / A Little / Not Yet):\n- [ ] I can understand simple English conversations.\n- [ ] I can write a short paragraph in English.\n- [ ] I can talk about my life, plans, and opinions.\n- [ ] I can use past, present, and future tenses.\n\nFor any "Not Yet," say what you will do to get better.',
            },
          ],
        },
      },
    ],
    vocabulary: [],
    quiz: [],
  },
]

// ─── Word Count Helper ──────────────────────────────────────────────────────

function countWords(variant: PathwayVariant): number {
  let count = 0
  for (const phase of ['input', 'processing', 'output'] as const) {
    for (const block of variant.ipo[phase]) {
      const b = block as Record<string, unknown>
      for (const key of [
        'body', 'text', 'prompt', 'activity', 'instructions', 'description',
        'summary', 'connection', 'reflection', 'applicationQuestion',
        'heading', 'title', 'framework', 'scriptureRef', 'theme',
      ]) {
        if (typeof b[key] === 'string') {
          count += (b[key] as string).split(/\s+/).filter(Boolean).length
        }
      }
      if (Array.isArray(b.questions)) {
        for (const q of b.questions as string[]) {
          count += q.split(/\s+/).filter(Boolean).length
        }
      }
    }
  }
  return count
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${'='.repeat(70)}`)
  console.log(`  Enrich EF Level 2 (A2→B1): Units 7-9`)
  console.log(`  Course ID: ${COURSE_ID}`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no DB writes)' : 'LIVE (writing to DB)'}`)
  console.log(`${'='.repeat(70)}\n`)

  let totalUpdated = 0
  let totalSkipped = 0

  const unitConfigs: { unitNumber: number; lessons: EnrichedLesson[]; title: string }[] = [
    { unitNumber: 7, lessons: unit7Lessons, title: 'Health and Society' },
    { unitNumber: 8, lessons: unit8Lessons, title: 'Dreams and Ambitions' },
    { unitNumber: 9, lessons: unit9Lessons, title: 'Review and Assessment' },
  ]

  for (const unit of unitConfigs) {
    console.log(`\n── Unit ${unit.unitNumber}: ${unit.title} ──`)

    const dbLessons = await prisma.lesson.findMany({
      where: { unit: { courseId: COURSE_ID, unitNumber: unit.unitNumber } },
      select: { id: true, title: true, weekNumber: true, type: true, content: true },
      orderBy: { weekNumber: 'asc' },
    })

    console.log(`  Found ${dbLessons.length} lessons in DB\n`)

    for (const enriched of unit.lessons) {
      const dbLesson = dbLessons.find(l => l.weekNumber === enriched.weekNumber)
      if (!dbLesson) {
        console.log(`  [SKIP] W${enriched.weekNumber}: not found in DB`)
        totalSkipped++
        continue
      }

      const content = dbLesson.content as unknown as LessonContent
      const updatedContent = {
        ...content,
        pathways: enriched.pathways,
        vocabulary: enriched.vocabulary,
        quiz: enriched.quiz,
      }

      for (const variant of enriched.pathways) {
        const wc = countWords(variant)
        console.log(`  [${variant.pathway}] W${enriched.weekNumber}: ~${wc} words`)
      }

      const vocabCount = enriched.vocabulary.length
      const quizCount = enriched.quiz.length
      console.log(`  [CONTENT] W${enriched.weekNumber}: ${vocabCount} vocab, ${quizCount} quiz Qs`)

      if (!DRY_RUN) {
        await prisma.lesson.update({
          where: { id: dbLesson.id },
          data: { content: updatedContent as unknown as Record<string, unknown> },
        })
        console.log(`  [UPDATED] W${enriched.weekNumber}: ${dbLesson.title}`)
      } else {
        console.log(`  [DRY RUN] W${enriched.weekNumber}: ${dbLesson.title} — would update`)
      }
      totalUpdated++
      console.log()
    }
  }

  console.log(`${'='.repeat(70)}`)
  console.log(`  Summary: ${totalUpdated} lessons enriched, ${totalSkipped} skipped`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN — no changes written' : 'LIVE — changes saved to DB'}`)
  console.log(`${'='.repeat(70)}\n`)

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error('Error:', err)
  prisma.$disconnect()
  process.exit(1)
})
