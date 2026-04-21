#!/usr/bin/env tsx
/**
 * scripts/seed-english-french-courses.ts
 *
 * Creates 4 "English for French Speakers" courses with all units and lesson shells.
 * Lesson content starts minimal — enrichment scripts add full pathway content.
 *
 * Idempotent: skips existing courses/units/lessons.
 *
 * Usage:
 *   npx tsx scripts/seed-english-french-courses.ts
 *   npx tsx scripts/seed-english-french-courses.ts --dry-run
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve('.env.local') })
dotenv.config({ path: path.resolve('.env') })
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry-run')

// ─── Course Definitions ───────────────────────────────────────────────────────

interface LessonDef {
  weekNumber: number
  title: string
  type: 'INSTRUCTION' | 'PROJECT'
  description: string
}

interface UnitDef {
  unitNumber: number
  title: string
  weekStart: number
  weekEnd: number
  lessons: LessonDef[]
}

interface CourseDef {
  title: string
  subject: string
  gradeLevelMin: number
  gradeLevelMax: number
  units: UnitDef[]
}

// ─── Level 1: English Foundations for French Speakers (A1→A2) ─────────────────

const level1: CourseDef = {
  title: 'English Foundations for French Speakers',
  subject: 'English Language',
  gradeLevelMin: 6,
  gradeLevelMax: 12,
  units: [
    {
      unitNumber: 1, title: 'Hello! Who Am I?', weekStart: 1, weekEnd: 4,
      lessons: [
        { weekNumber: 1, title: 'Greetings and Introductions', type: 'INSTRUCTION', description: 'Learn basic English greetings, introductions, and polite expressions. Compare formal/informal registers with French tu/vous. Practice the /th/ sound.' },
        { weekNumber: 2, title: 'The Alphabet and English Sounds', type: 'INSTRUCTION', description: 'Master the English alphabet and key sound differences from French. Focus on /th/, /h/, English /r/, and vowel distinctions like ship vs sheep.' },
        { weekNumber: 3, title: 'Numbers, Days, and Time', type: 'INSTRUCTION', description: 'Count from 1-100, learn days of the week, months, and how to tell time in English. Compare number patterns with French.' },
        { weekNumber: 4, title: 'My First English Conversation', type: 'PROJECT', description: 'Create and perform a self-introduction dialogue incorporating greetings, personal information, and polite expressions learned in Unit 1.' },
      ]
    },
    {
      unitNumber: 2, title: 'My World', weekStart: 5, weekEnd: 8,
      lessons: [
        { weekNumber: 1, title: 'Family and Friends', type: 'INSTRUCTION', description: 'Learn family vocabulary and possessive adjectives (my, your, his, her). Compare English and French family terms. Understand that English nouns have no gender.' },
        { weekNumber: 2, title: 'My Home and Classroom', type: 'INSTRUCTION', description: 'Name rooms, furniture, and classroom objects. Use prepositions of place (in, on, under, next to). Practice there is/there are.' },
        { weekNumber: 3, title: 'Colors, Shapes, and Descriptions', type: 'INSTRUCTION', description: 'Learn adjective placement in English (BEFORE the noun, unlike French). Describe people, places, and objects using basic adjectives.' },
        { weekNumber: 4, title: 'Describing My World', type: 'PROJECT', description: 'Create an illustrated description of your home, family, or classroom using vocabulary and grammar from Unit 2.' },
      ]
    },
    {
      unitNumber: 3, title: 'Daily Life', weekStart: 9, weekEnd: 12,
      lessons: [
        { weekNumber: 1, title: 'Morning to Night: Daily Routines', type: 'INSTRUCTION', description: 'Learn present simple for habitual actions. Compare reflexive verbs (French: je me lave) with English equivalents (I wash myself/I wash).' },
        { weekNumber: 2, title: 'Food and Meals', type: 'INSTRUCTION', description: 'Food vocabulary, ordering at a restaurant, countable/uncountable nouns (some/any). False cognates: entrée, preservatif.' },
        { weekNumber: 3, title: 'Clothing and Weather', type: 'INSTRUCTION', description: 'Describe what you wear and the weather. Learn "it is" for weather (It is raining). Compare weather expressions between French and English.' },
        { weekNumber: 4, title: 'A Day in My Life', type: 'PROJECT', description: 'Write and illustrate a daily routine journal using present simple tense and time expressions.' },
      ]
    },
    {
      unitNumber: 4, title: 'Getting Around', weekStart: 13, weekEnd: 16,
      lessons: [
        { weekNumber: 1, title: 'Places in My Community', type: 'INSTRUCTION', description: 'Learn location vocabulary (school, hospital, market, church). Use there is/there are. False cognates: librairie=bookstore, coin=corner.' },
        { weekNumber: 2, title: 'Directions and Transportation', type: 'INSTRUCTION', description: 'Give and follow directions (turn left, go straight). Learn transportation vocabulary. Use imperative sentences.' },
        { weekNumber: 3, title: 'Shopping and Money', type: 'INSTRUCTION', description: 'Practice how much/how many, prices, and polite shopping dialogues. False cognates: monnaie=change. Compare French and English number systems.' },
        { weekNumber: 4, title: 'My Community Guide', type: 'PROJECT', description: 'Create a visitor guide to your neighborhood or town with directions, descriptions, and recommendations.' },
      ]
    },
    {
      unitNumber: 5, title: 'Actions and Activities', weekStart: 17, weekEnd: 20,
      lessons: [
        { weekNumber: 1, title: 'Present Tense Actions', type: 'INSTRUCTION', description: 'Master present simple vs present continuous. KEY French error: missing -ing form. Subject-verb agreement: he walks (don\'t drop the -s!).' },
        { weekNumber: 2, title: 'Sports, Games, and Hobbies', type: 'INSTRUCTION', description: 'Talk about abilities (can/can\'t) and preferences (like + gerund). Sports and leisure vocabulary.' },
        { weekNumber: 3, title: 'Asking and Answering Questions', type: 'INSTRUCTION', description: 'Form questions with do/does (CRITICAL for French speakers who skip the auxiliary). Practice question words: who, what, where, when, why, how.' },
        { weekNumber: 4, title: 'My Favorite Activities Presentation', type: 'PROJECT', description: 'Create and deliver a short presentation about your hobbies and activities using correct question and answer forms.' },
      ]
    },
    {
      unitNumber: 6, title: 'Health and Body', weekStart: 21, weekEnd: 24,
      lessons: [
        { weekNumber: 1, title: 'Parts of the Body', type: 'INSTRUCTION', description: 'Body vocabulary, describing physical characteristics. False cognate: blessé=injured (not blessed). Pronunciation of body part words.' },
        { weekNumber: 2, title: 'Health and Feelings', type: 'INSTRUCTION', description: 'Express emotions and physical states (I feel + adjective). False cognates: sensible=sensitive, sympathique=nice/friendly.' },
        { weekNumber: 3, title: 'At the Doctor\'s Office', type: 'INSTRUCTION', description: 'Make appointments, describe symptoms, understand basic medical instructions. Use should for advice.' },
        { weekNumber: 4, title: 'My Health and Wellness Guide', type: 'PROJECT', description: 'Design a health advice poster or brochure using vocabulary and grammar from the health unit.' },
      ]
    },
    {
      unitNumber: 7, title: 'School and Learning', weekStart: 25, weekEnd: 28,
      lessons: [
        { weekNumber: 1, title: 'School Subjects and Supplies', type: 'INSTRUCTION', description: 'School vocabulary and expressions. False cognate: collège=middle school (not college/university). Compare school systems.' },
        { weekNumber: 2, title: 'Classroom Instructions and Requests', type: 'INSTRUCTION', description: 'Understand and give classroom instructions. Make polite requests (Can I...? May I...?). Use please, thank you, excuse me.' },
        { weekNumber: 3, title: 'Reading Simple Texts', type: 'INSTRUCTION', description: 'Reading strategies for beginners: finding main ideas, using pictures for context, guessing vocabulary from context. Practice with A1-A2 texts.' },
        { weekNumber: 4, title: 'My School Story', type: 'PROJECT', description: 'Write a short narrative about your school experience, comparing your French-speaking school with what you are learning about English-speaking schools.' },
      ]
    },
    {
      unitNumber: 8, title: 'Past and Future', weekStart: 29, weekEnd: 32,
      lessons: [
        { weekNumber: 1, title: 'Talking About the Past', type: 'INSTRUCTION', description: 'Learn past simple tense (regular and irregular verbs). KEY: French passé composé ≠ English present perfect. "I went" not "I have went".' },
        { weekNumber: 2, title: 'Plans and the Future', type: 'INSTRUCTION', description: 'Express future plans with going to and will. Compare French futur proche (aller + infinitif) with English going to.' },
        { weekNumber: 3, title: 'Telling Simple Stories', type: 'INSTRUCTION', description: 'Sequence events with first, then, next, finally. Use past tense in narratives. Practice telling short stories about personal experiences.' },
        { weekNumber: 4, title: 'My Past, Present, and Future', type: 'PROJECT', description: 'Create a timeline presentation showing your past experiences, current life, and future plans using all three tenses.' },
      ]
    },
    {
      unitNumber: 9, title: 'Review and Assessment', weekStart: 33, weekEnd: 36,
      lessons: [
        { weekNumber: 1, title: 'Grammar and Vocabulary Review', type: 'INSTRUCTION', description: 'Comprehensive review of A1-A2 grammar: present simple/continuous, past simple, future, articles, prepositions. Vocabulary consolidation.' },
        { weekNumber: 2, title: 'Speaking and Listening Review', type: 'INSTRUCTION', description: 'Pronunciation review focusing on French-speaker challenges: /th/, /h/, stress patterns, linking sounds. Listening comprehension practice.' },
        { weekNumber: 3, title: 'Reading and Writing Review', type: 'INSTRUCTION', description: 'Practice reading comprehension with A2-level texts. Write short paragraphs. Review common French-speaker writing errors.' },
        { weekNumber: 4, title: 'Level 1 Final Assessment', type: 'PROJECT', description: 'Comprehensive assessment covering all four skills (reading, writing, listening, speaking) at the A2 level. Self-evaluation and goal-setting for Level 2.' },
      ]
    },
  ]
}

// ─── Level 2: English Fluency Builder (A2→B1) ────────────────────────────────

const level2: CourseDef = {
  title: 'English Fluency Builder for French Speakers',
  subject: 'English Language',
  gradeLevelMin: 6,
  gradeLevelMax: 12,
  units: [
    {
      unitNumber: 1, title: 'Expanding Your World', weekStart: 1, weekEnd: 4,
      lessons: [
        { weekNumber: 1, title: 'Describing People in Detail', type: 'INSTRUCTION', description: 'Use expanded adjective phrases, comparatives and superlatives. Order of adjectives in English vs French. Physical and personality descriptions.' },
        { weekNumber: 2, title: 'Comparing and Contrasting', type: 'INSTRUCTION', description: 'Comparative structures (more than, less than, as...as). Contrast linkers (however, while, on the other hand). Compare cultures and experiences.' },
        { weekNumber: 3, title: 'Expressing Preferences and Opinions', type: 'INSTRUCTION', description: 'I prefer, I would rather, In my opinion. Distinguish fact from opinion. Polite disagreement in English vs French directness.' },
        { weekNumber: 4, title: 'Cultural Comparison Essay', type: 'PROJECT', description: 'Write a structured comparison between French-speaking and English-speaking cultures using comparative language and opinion expressions.' },
      ]
    },
    {
      unitNumber: 2, title: 'Stories and Experiences', weekStart: 5, weekEnd: 8,
      lessons: [
        { weekNumber: 1, title: 'Narrating Past Events', type: 'INSTRUCTION', description: 'Past simple vs past continuous for narratives. Time clauses with when/while. Setting the scene in stories.' },
        { weekNumber: 2, title: 'Present Perfect: Connecting Past to Present', type: 'INSTRUCTION', description: 'Present perfect for experience and recent events. KEY distinction: passé composé ≠ present perfect. Ever/never/already/yet/just.' },
        { weekNumber: 3, title: 'Expressing Emotions in English', type: 'INSTRUCTION', description: 'Emotion vocabulary beyond basic feelings. -ed vs -ing adjectives (bored vs boring). Expressing reactions and surprise.' },
        { weekNumber: 4, title: 'My Personal Narrative', type: 'PROJECT', description: 'Write a personal narrative about a significant experience using past tenses, emotions vocabulary, and narrative techniques.' },
      ]
    },
    {
      unitNumber: 3, title: 'Opinions and Arguments', weekStart: 9, weekEnd: 12,
      lessons: [
        { weekNumber: 1, title: 'Agreeing, Disagreeing, and Persuading', type: 'INSTRUCTION', description: 'Phrases for agreement/disagreement. Making suggestions (should, could, why don\'t we). Polite persuasion techniques.' },
        { weekNumber: 2, title: 'Giving Reasons and Explanations', type: 'INSTRUCTION', description: 'Because, since, as, due to, therefore, as a result. Paragraph structure: topic sentence + supporting details. Cause and effect.' },
        { weekNumber: 3, title: 'Debating and Discussing', type: 'INSTRUCTION', description: 'Discussion phrases for academic settings. Turn-taking in English conversations. Asking for clarification. Summarizing others\' points.' },
        { weekNumber: 4, title: 'Opinion Essay', type: 'PROJECT', description: 'Write a five-paragraph opinion essay on a topic of choice, with clear thesis, supporting arguments, and conclusion.' },
      ]
    },
    {
      unitNumber: 4, title: 'The Working World', weekStart: 13, weekEnd: 16,
      lessons: [
        { weekNumber: 1, title: 'Jobs and Career Vocabulary', type: 'INSTRUCTION', description: 'Workplace vocabulary, job descriptions, skills and qualifications. False cognates: formation=training, stage=internship, résumé=CV.' },
        { weekNumber: 2, title: 'Job Applications and Interviews', type: 'INSTRUCTION', description: 'Write a cover letter and CV in English. Practice interview questions and answers. Formal register for professional communication.' },
        { weekNumber: 3, title: 'Workplace Communication', type: 'INSTRUCTION', description: 'Email etiquette, phone conversations, meetings language. Formal vs informal workplace language. Cross-cultural workplace norms.' },
        { weekNumber: 4, title: 'Career Exploration Portfolio', type: 'PROJECT', description: 'Research a career of interest and create a professional portfolio including a CV, cover letter, and mock interview responses.' },
      ]
    },
    {
      unitNumber: 5, title: 'Media and Communication', weekStart: 17, weekEnd: 20,
      lessons: [
        { weekNumber: 1, title: 'News and Current Events', type: 'INSTRUCTION', description: 'Read simplified news articles. Identify main ideas and supporting details. News vocabulary and reporting language.' },
        { weekNumber: 2, title: 'Social Media and Digital Communication', type: 'INSTRUCTION', description: 'Online communication styles. Abbreviations and informal English. Digital literacy vocabulary. Responsible online communication.' },
        { weekNumber: 3, title: 'Formal vs Informal Register', type: 'INSTRUCTION', description: 'When to use formal/informal English. Register switching. Compare formality levels in French and English. Written vs spoken conventions.' },
        { weekNumber: 4, title: 'News Report Project', type: 'PROJECT', description: 'Write and present a news report about a current event, using appropriate journalistic language and formal register.' },
      ]
    },
    {
      unitNumber: 6, title: 'Nature and Environment', weekStart: 21, weekEnd: 24,
      lessons: [
        { weekNumber: 1, title: 'Weather, Climate, and Geography', type: 'INSTRUCTION', description: 'Extended weather and geography vocabulary. Describing natural phenomena. Conditional sentences for hypothetical situations (If it rains...).' },
        { weekNumber: 2, title: 'Animals and Ecosystems', type: 'INSTRUCTION', description: 'Nature vocabulary, describing habitats and food chains. Passive voice introduction (is found, are eaten). Scientific descriptions.' },
        { weekNumber: 3, title: 'Environmental Issues', type: 'INSTRUCTION', description: 'Discuss pollution, conservation, and sustainability. Modal verbs for obligation and advice (must, should, have to). Problem-solution structure.' },
        { weekNumber: 4, title: 'Environmental Awareness Campaign', type: 'PROJECT', description: 'Design an environmental awareness campaign with posters, slogans, and a persuasive speech about a local environmental issue.' },
      ]
    },
    {
      unitNumber: 7, title: 'Health and Society', weekStart: 25, weekEnd: 28,
      lessons: [
        { weekNumber: 1, title: 'Healthy Living and Nutrition', type: 'INSTRUCTION', description: 'Health and wellness vocabulary. Giving advice (should, ought to, had better). Countable/uncountable nouns with food (much/many/a lot of).' },
        { weekNumber: 2, title: 'Community Services and Helpers', type: 'INSTRUCTION', description: 'Public services vocabulary. Describing systems and processes. Relative clauses introduction (who, which, that).' },
        { weekNumber: 3, title: 'Rights, Responsibilities, and Values', type: 'INSTRUCTION', description: 'Civic vocabulary. Express obligations and permissions. Discuss values and beliefs respectfully. Biblical worldview on community.' },
        { weekNumber: 4, title: 'Community Health Plan', type: 'PROJECT', description: 'Develop a community health improvement plan addressing a real need in your community, with research, analysis, and recommendations.' },
      ]
    },
    {
      unitNumber: 8, title: 'Dreams and Ambitions', weekStart: 29, weekEnd: 32,
      lessons: [
        { weekNumber: 1, title: 'Planning for the Future', type: 'INSTRUCTION', description: 'Will vs going to vs present continuous for future. Making predictions and plans. Life goals vocabulary.' },
        { weekNumber: 2, title: 'Conditional Sentences', type: 'INSTRUCTION', description: 'First and second conditionals. If I study hard, I will pass. If I were rich, I would... Compare with French si clauses.' },
        { weekNumber: 3, title: 'Problem-Solving and Decision-Making', type: 'INSTRUCTION', description: 'Pros and cons language. Decision-making phrases. Expressing certainty/uncertainty. Linking ideas in extended discourse.' },
        { weekNumber: 4, title: 'My Future Plan Presentation', type: 'PROJECT', description: 'Create and deliver a presentation about your life goals, education plans, and career ambitions using future tenses and conditionals.' },
      ]
    },
    {
      unitNumber: 9, title: 'Review and Assessment', weekStart: 33, weekEnd: 36,
      lessons: [
        { weekNumber: 1, title: 'Grammar and Vocabulary Consolidation', type: 'INSTRUCTION', description: 'Review all B1 grammar: tenses, conditionals, passive voice, relative clauses, modals. Vocabulary consolidation across all topics.' },
        { weekNumber: 2, title: 'Integrated Skills Practice', type: 'INSTRUCTION', description: 'Practice combining reading, writing, listening, and speaking in integrated tasks. Simulate real-world communication scenarios.' },
        { weekNumber: 3, title: 'Test Preparation Strategies', type: 'INSTRUCTION', description: 'Introduction to English proficiency test formats (TOEFL, IELTS, Duolingo). Basic test-taking strategies. Time management for exams.' },
        { weekNumber: 4, title: 'Level 2 Final Assessment', type: 'PROJECT', description: 'Comprehensive B1-level assessment testing all four skills. Includes a reading passage, listening exercise, writing task, and oral interview.' },
      ]
    },
  ]
}

// ─── Level 3: Academic English Bridge (B1→B2) ────────────────────────────────

const level3: CourseDef = {
  title: 'Academic English Bridge for French Speakers',
  subject: 'English Language',
  gradeLevelMin: 6,
  gradeLevelMax: 12,
  units: [
    {
      unitNumber: 1, title: 'Academic Reading Skills', weekStart: 1, weekEnd: 4,
      lessons: [
        { weekNumber: 1, title: 'Skimming, Scanning, and Previewing', type: 'INSTRUCTION', description: 'Academic reading strategies: skim for main idea, scan for details, preview headings and structure. Practice with B1-B2 academic texts.' },
        { weekNumber: 2, title: 'Understanding Main Ideas and Supporting Details', type: 'INSTRUCTION', description: 'Identify thesis statements, topic sentences, and supporting evidence. Distinguish main ideas from examples. Annotation techniques.' },
        { weekNumber: 3, title: 'Inferring Meaning and Drawing Conclusions', type: 'INSTRUCTION', description: 'Read between the lines. Infer meaning from context. Identify author\'s purpose and tone. Distinguish fact from opinion in academic texts.' },
        { weekNumber: 4, title: 'Annotated Bibliography', type: 'PROJECT', description: 'Read three academic articles on a chosen topic and create an annotated bibliography with summaries and evaluations of each source.' },
      ]
    },
    {
      unitNumber: 2, title: 'Academic Writing Foundations', weekStart: 5, weekEnd: 8,
      lessons: [
        { weekNumber: 1, title: 'Paragraph Structure and Coherence', type: 'INSTRUCTION', description: 'Academic paragraph structure: topic sentence, supporting sentences, concluding sentence. Coherence and cohesion devices. Transition words.' },
        { weekNumber: 2, title: 'Essay Organization and Thesis Statements', type: 'INSTRUCTION', description: 'Five-paragraph essay structure. Writing strong thesis statements. Introduction hooks and conclusion strategies. Outline creation.' },
        { weekNumber: 3, title: 'Supporting Arguments with Evidence', type: 'INSTRUCTION', description: 'Use evidence to support claims. Paraphrasing and quoting. In-text citations basics. Avoiding plagiarism. Academic integrity.' },
        { weekNumber: 4, title: 'Argumentative Essay', type: 'PROJECT', description: 'Write a 500-word argumentative essay with a clear thesis, at least three supporting arguments with evidence, counterargument, and conclusion.' },
      ]
    },
    {
      unitNumber: 3, title: 'Academic Listening', weekStart: 9, weekEnd: 12,
      lessons: [
        { weekNumber: 1, title: 'Lecture Comprehension Strategies', type: 'INSTRUCTION', description: 'Listen for main ideas in academic lectures. Recognize signal words (First, However, In conclusion). Handle unfamiliar vocabulary during listening.' },
        { weekNumber: 2, title: 'Note-Taking Strategies', type: 'INSTRUCTION', description: 'Cornell method, outline method, and mind mapping for lectures. Abbreviations and symbols for fast notes. Reviewing and organizing notes.' },
        { weekNumber: 3, title: 'Following Complex Arguments', type: 'INSTRUCTION', description: 'Track multi-step arguments in spoken English. Identify examples, counterarguments, and conclusions. Distinguish speaker\'s opinion from reported views.' },
        { weekNumber: 4, title: 'Lecture Summary Report', type: 'PROJECT', description: 'Listen to a TED talk or academic lecture, take structured notes, and write a detailed summary including the speaker\'s main argument and supporting points.' },
      ]
    },
    {
      unitNumber: 4, title: 'Academic Speaking', weekStart: 13, weekEnd: 16,
      lessons: [
        { weekNumber: 1, title: 'Presentation Skills', type: 'INSTRUCTION', description: 'Structure a clear presentation: introduction, body, conclusion. Use signposting language. Manage nerves. Eye contact and body language.' },
        { weekNumber: 2, title: 'Academic Discussions and Seminars', type: 'INSTRUCTION', description: 'Participate in academic discussions. Agree, disagree, and build on others\' ideas. Ask clarifying questions. Summarize and synthesize.' },
        { weekNumber: 3, title: 'Defending a Position', type: 'INSTRUCTION', description: 'Present and defend an argument orally. Handle challenging questions. Use hedging language (might, perhaps, it seems). Acknowledge opposing views.' },
        { weekNumber: 4, title: 'Formal Presentation', type: 'PROJECT', description: 'Prepare and deliver a 5-7 minute academic presentation on a research topic, including visual aids, Q&A, and self-reflection.' },
      ]
    },
    {
      unitNumber: 5, title: 'Research Skills', weekStart: 17, weekEnd: 20,
      lessons: [
        { weekNumber: 1, title: 'Finding and Evaluating Sources', type: 'INSTRUCTION', description: 'Academic databases and search strategies. Evaluate source credibility (CRAAP test). Distinguish primary from secondary sources.' },
        { weekNumber: 2, title: 'Paraphrasing and Summarizing', type: 'INSTRUCTION', description: 'Paraphrase without plagiarizing. Summarize long texts into key points. Use reporting verbs (argues, claims, suggests, demonstrates).' },
        { weekNumber: 3, title: 'Synthesizing Multiple Sources', type: 'INSTRUCTION', description: 'Combine information from multiple sources. Compare and contrast different viewpoints. Build arguments from multiple pieces of evidence.' },
        { weekNumber: 4, title: 'Research Report', type: 'PROJECT', description: 'Write a 750-word research report on a chosen topic using at least four sources, with proper citations, paraphrasing, and synthesis.' },
      ]
    },
    {
      unitNumber: 6, title: 'Critical Thinking in English', weekStart: 21, weekEnd: 24,
      lessons: [
        { weekNumber: 1, title: 'Analyzing Arguments', type: 'INSTRUCTION', description: 'Identify claims, evidence, and reasoning. Recognize logical fallacies. Evaluate argument strength. Critical vocabulary (assert, refute, imply).' },
        { weekNumber: 2, title: 'Identifying Bias and Perspective', type: 'INSTRUCTION', description: 'Recognize bias in texts and media. Understand perspective and point of view. Loaded language and emotional appeals. Objectivity in academic writing.' },
        { weekNumber: 3, title: 'Logical Reasoning and Problem-Solving', type: 'INSTRUCTION', description: 'Cause and effect analysis. Compare/contrast reasoning. Classification and categorization. Hypothetical reasoning with advanced conditionals.' },
        { weekNumber: 4, title: 'Critical Analysis Essay', type: 'PROJECT', description: 'Write a critical analysis of an article or speech, evaluating the author\'s argument, evidence, biases, and effectiveness.' },
      ]
    },
    {
      unitNumber: 7, title: 'Literature and Culture', weekStart: 25, weekEnd: 28,
      lessons: [
        { weekNumber: 1, title: 'Reading Literature in English', type: 'INSTRUCTION', description: 'Elements of fiction: plot, character, setting, theme. Literary devices: metaphor, simile, symbolism. Read short stories at B2 level.' },
        { weekNumber: 2, title: 'Analyzing Texts and Themes', type: 'INSTRUCTION', description: 'Close reading techniques. Identify themes and author\'s message. Support interpretations with textual evidence. Compare literary themes across cultures.' },
        { weekNumber: 3, title: 'Cultural Perspectives in English Literature', type: 'INSTRUCTION', description: 'Explore diverse voices in English literature. Cultural context and its influence on writing. Compare Francophone and Anglophone literary traditions.' },
        { weekNumber: 4, title: 'Literary Analysis Essay', type: 'PROJECT', description: 'Write a literary analysis essay on a short story or poem, examining theme, literary devices, and cultural context.' },
      ]
    },
    {
      unitNumber: 8, title: 'Advanced Grammar and Style', weekStart: 29, weekEnd: 32,
      lessons: [
        { weekNumber: 1, title: 'Complex Sentence Structures', type: 'INSTRUCTION', description: 'Compound-complex sentences. Subordination and coordination. Participial phrases. Avoiding run-ons and fragments. French vs English sentence structure.' },
        { weekNumber: 2, title: 'Academic Vocabulary and Collocations', type: 'INSTRUCTION', description: 'Academic Word List (AWL) vocabulary. Collocations (make a decision, not do a decision). Word families and affixes. Register-appropriate vocabulary.' },
        { weekNumber: 3, title: 'Register, Tone, and Style', type: 'INSTRUCTION', description: 'Adapt writing for different audiences. Academic vs casual tone. Hedging and boosting language. Avoiding common French-influenced style errors.' },
        { weekNumber: 4, title: 'Academic Writing Portfolio', type: 'PROJECT', description: 'Compile a portfolio of revised writing samples demonstrating mastery of academic style, grammar, and vocabulary at the B2 level.' },
      ]
    },
    {
      unitNumber: 9, title: 'Review and Assessment', weekStart: 33, weekEnd: 36,
      lessons: [
        { weekNumber: 1, title: 'Reading and Writing Skills Review', type: 'INSTRUCTION', description: 'Review academic reading strategies, essay writing, research skills, and critical analysis. Practice with B2-level integrated tasks.' },
        { weekNumber: 2, title: 'Speaking and Listening Skills Review', type: 'INSTRUCTION', description: 'Review presentation skills, discussion techniques, lecture comprehension, and pronunciation. Practice academic speaking tasks.' },
        { weekNumber: 3, title: 'Integrated Academic Skills Practice', type: 'INSTRUCTION', description: 'Complete integrated tasks combining multiple skills: read-then-write, listen-then-speak, research-then-present. Timed practice.' },
        { weekNumber: 4, title: 'Level 3 Final Assessment', type: 'PROJECT', description: 'Comprehensive B2-level academic English assessment: academic reading passage with questions, essay writing, lecture listening, and oral presentation.' },
      ]
    },
  ]
}

// ─── Level 4: University-Ready English (B2 Mastery) ──────────────────────────

const level4: CourseDef = {
  title: 'University-Ready English for French Speakers',
  subject: 'English Language',
  gradeLevelMin: 6,
  gradeLevelMax: 12,
  units: [
    {
      unitNumber: 1, title: 'Test Strategies and Foundations', weekStart: 1, weekEnd: 4,
      lessons: [
        { weekNumber: 1, title: 'Understanding Test Formats', type: 'INSTRUCTION', description: 'Overview of TOEFL iBT, IELTS Academic, and Duolingo English Test (DET). Format, timing, scoring, and CEFR alignment for each test.' },
        { weekNumber: 2, title: 'Time Management and Test-Taking Skills', type: 'INSTRUCTION', description: 'Pacing strategies for each test format. Process of elimination. Educated guessing. Managing test anxiety. Practice time allocation.' },
        { weekNumber: 3, title: 'Reading Strategies for Standardized Tests', type: 'INSTRUCTION', description: 'Test-specific reading techniques: TOEFL passage types, IELTS matching/True-False-Not Given, DET interactive reading. Speed reading practice.' },
        { weekNumber: 4, title: 'Practice Test Analysis', type: 'PROJECT', description: 'Complete a full-length practice reading section from TOEFL, IELTS, or DET. Analyze results, identify weaknesses, and create a study plan.' },
      ]
    },
    {
      unitNumber: 2, title: 'Test Reading Mastery', weekStart: 5, weekEnd: 8,
      lessons: [
        { weekNumber: 1, title: 'TOEFL Reading Skills', type: 'INSTRUCTION', description: 'TOEFL reading question types: vocabulary, reference, factual, inference, rhetorical purpose, insert text, summary. Practice with academic passages.' },
        { weekNumber: 2, title: 'IELTS Academic Reading Skills', type: 'INSTRUCTION', description: 'IELTS reading tasks: matching headings, True/False/Not Given, sentence completion, multiple choice, summary completion. Skimming and scanning mastery.' },
        { weekNumber: 3, title: 'DET Reading and Literacy Skills', type: 'INSTRUCTION', description: 'DET question types: Read and Select real words, Read and Complete sentences, Interactive Reading passages. Adaptive test strategies.' },
        { weekNumber: 4, title: 'Reading Test Simulation', type: 'PROJECT', description: 'Complete timed reading sections from two different test formats. Score, analyze errors, and write a reflection on strategies used.' },
      ]
    },
    {
      unitNumber: 3, title: 'Test Listening Mastery', weekStart: 9, weekEnd: 12,
      lessons: [
        { weekNumber: 1, title: 'TOEFL Listening Skills', type: 'INSTRUCTION', description: 'TOEFL listening: academic lectures and conversations. Question types: gist, detail, function, attitude, organization. Note-taking under pressure.' },
        { weekNumber: 2, title: 'IELTS Listening Skills', type: 'INSTRUCTION', description: 'IELTS listening: 4 sections from social to academic. Fill-in-the-blank, multiple choice, map/diagram labeling. Handling different accents.' },
        { weekNumber: 3, title: 'Academic Lecture Comprehension', type: 'INSTRUCTION', description: 'Extended lecture comprehension practice. Following complex academic arguments. Identifying implicit meaning and speaker attitude. DET listening tasks.' },
        { weekNumber: 4, title: 'Listening Test Simulation', type: 'PROJECT', description: 'Complete timed listening sections from TOEFL and IELTS formats. Analyze errors, especially French-speaker-specific listening challenges.' },
      ]
    },
    {
      unitNumber: 4, title: 'Test Speaking Mastery', weekStart: 13, weekEnd: 16,
      lessons: [
        { weekNumber: 1, title: 'TOEFL Speaking Tasks', type: 'INSTRUCTION', description: 'TOEFL speaking: independent and integrated tasks. 15-30 second preparation, 45-60 second responses. Templates and strategies. Pronunciation scoring criteria.' },
        { weekNumber: 2, title: 'IELTS Speaking Interview', type: 'INSTRUCTION', description: 'IELTS speaking: Part 1 (introduction), Part 2 (long turn/cue card), Part 3 (discussion). Fluency, coherence, lexical resource, grammar, pronunciation scoring.' },
        { weekNumber: 3, title: 'DET Speaking and Pronunciation', type: 'INSTRUCTION', description: 'DET speaking tasks: Speak About the Photo, Read Then Speak, Interactive Speaking. Focus on eliminating French-accent pronunciation patterns.' },
        { weekNumber: 4, title: 'Speaking Test Simulation', type: 'PROJECT', description: 'Complete full speaking tests in TOEFL and IELTS format. Record responses, self-evaluate using official scoring criteria, identify areas for improvement.' },
      ]
    },
    {
      unitNumber: 5, title: 'Test Writing Mastery', weekStart: 17, weekEnd: 20,
      lessons: [
        { weekNumber: 1, title: 'TOEFL Writing Tasks', type: 'INSTRUCTION', description: 'TOEFL writing: integrated task (read + listen + write) and academic discussion. Planning, drafting, and revising under time pressure.' },
        { weekNumber: 2, title: 'IELTS Writing Tasks', type: 'INSTRUCTION', description: 'IELTS Writing Task 1 (describe data/diagrams) and Task 2 (essay). Data description language. Essay templates. Meeting word count requirements.' },
        { weekNumber: 3, title: 'Academic Essay Excellence', type: 'INSTRUCTION', description: 'Advanced essay techniques: sophisticated thesis statements, nuanced arguments, effective conclusions. Common French-speaker writing errors to avoid.' },
        { weekNumber: 4, title: 'Writing Test Simulation', type: 'PROJECT', description: 'Complete timed writing tasks from both TOEFL and IELTS. Self-score using official rubrics. Revise one essay to demonstrate improvement.' },
      ]
    },
    {
      unitNumber: 6, title: 'University Academic Skills', weekStart: 21, weekEnd: 24,
      lessons: [
        { weekNumber: 1, title: 'Research Papers and Academic Integrity', type: 'INSTRUCTION', description: 'Write a research paper: abstract, introduction, body, conclusion, references. APA/MLA citation formats. Plagiarism prevention and academic integrity.' },
        { weekNumber: 2, title: 'Academic Discussions and Office Hours', type: 'INSTRUCTION', description: 'Participate in university-level discussions. Visit virtual office hours. Ask questions effectively. Academic email etiquette with professors.' },
        { weekNumber: 3, title: 'Study Strategies for English-Medium Education', type: 'INSTRUCTION', description: 'Strategies for studying in English when it is not your first language. Textbook reading, lecture notes, group projects, exam preparation.' },
        { weekNumber: 4, title: 'Mini Research Paper', type: 'PROJECT', description: 'Write a 1000-word research paper on a topic of choice with at least five sources, proper citations, and academic formatting.' },
      ]
    },
    {
      unitNumber: 7, title: 'Professional English', weekStart: 25, weekEnd: 28,
      lessons: [
        { weekNumber: 1, title: 'Formal Correspondence and Applications', type: 'INSTRUCTION', description: 'University application essays. Scholarship applications. Formal emails and letters. Statement of purpose writing.' },
        { weekNumber: 2, title: 'Professional Presentations and Public Speaking', type: 'INSTRUCTION', description: 'Deliver persuasive presentations. Handle Q&A confidently. Use data and visuals effectively. Professional speaking conventions.' },
        { weekNumber: 3, title: 'Networking and Professional Communication', type: 'INSTRUCTION', description: 'Professional networking language. LinkedIn profiles in English. Elevator pitches. Cross-cultural professional communication.' },
        { weekNumber: 4, title: 'Professional Portfolio', type: 'PROJECT', description: 'Create a complete professional English portfolio: university application essay, professional CV, LinkedIn profile, and a statement of purpose.' },
      ]
    },
    {
      unitNumber: 8, title: 'Advanced Integrated Skills', weekStart: 29, weekEnd: 32,
      lessons: [
        { weekNumber: 1, title: 'Synthesis and Analysis Across Sources', type: 'INSTRUCTION', description: 'Synthesize information from reading and listening sources. Write integrated responses. Compare and evaluate conflicting viewpoints.' },
        { weekNumber: 2, title: 'Advanced Discourse and Rhetoric', type: 'INSTRUCTION', description: 'Rhetorical strategies: ethos, pathos, logos. Persuasive writing and speaking at advanced level. Analyzing rhetoric in speeches and texts.' },
        { weekNumber: 3, title: 'Cross-Cultural Communication', type: 'INSTRUCTION', description: 'Navigate cultural differences in academic and professional settings. American, British, and international English conventions. Cultural sensitivity.' },
        { weekNumber: 4, title: 'Capstone Presentation', type: 'PROJECT', description: 'Design and deliver a 10-minute capstone presentation demonstrating B2+ English proficiency across all four skills with academic rigor.' },
      ]
    },
    {
      unitNumber: 9, title: 'Final Certification', weekStart: 33, weekEnd: 36,
      lessons: [
        { weekNumber: 1, title: 'Comprehensive Review', type: 'INSTRUCTION', description: 'Review all test strategies, academic skills, and professional English. Final grammar and vocabulary consolidation. Self-assessment against CEFR B2 descriptors.' },
        { weekNumber: 2, title: 'Mock Exam: TOEFL Format', type: 'INSTRUCTION', description: 'Complete a full-length TOEFL-format mock exam covering reading, listening, speaking, and writing under timed conditions.' },
        { weekNumber: 3, title: 'Mock Exam: IELTS and DET Format', type: 'INSTRUCTION', description: 'Complete mock exams in IELTS and DET format. Compare scores across formats. Final pronunciation and fluency assessment.' },
        { weekNumber: 4, title: 'Final Certification Assessment', type: 'PROJECT', description: 'Comprehensive final assessment certifying B2 English proficiency. Includes all four skills, generates a CEFR-aligned proficiency report, and provides guidance on next steps for university admission.' },
      ]
    },
  ]
}

// ─── Content Builder ─────────────────────────────────────────────────────────

function buildMinimalContent(
  courseDef: CourseDef,
  unit: UnitDef,
  lesson: LessonDef
): Record<string, unknown> {
  const pathways = ['ADVANCED', 'STANDARD', 'VOCATIONAL'].map(pw => {
    const minutes = pw === 'ADVANCED' ? 60 : pw === 'STANDARD' ? 45 : 35
    const suffix = pw === 'ADVANCED' ? 'Advanced Scholars' : pw === 'STANDARD' ? 'Standard Academic' : 'Vocational Pathway'

    return {
      pathway: pw,
      title: `${lesson.title} — ${suffix}`,
      estimatedMinutes: minutes,
      objectives: [
        `Students will demonstrate understanding of the key concepts in ${lesson.title}.`,
        `Students will apply English language skills relevant to this lesson's focus.`,
        `Students will identify and practice French-to-English transfer skills.`
      ],
      ipo: {
        input: [
          {
            type: 'text',
            heading: lesson.title,
            body: lesson.description
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [`What did you learn in this lesson about ${lesson.title.toLowerCase()}?`]
          }
        ],
        output: [
          lesson.type === 'PROJECT'
            ? { type: 'project', title: lesson.title, summary: lesson.description, description: lesson.description, deliverable: 'written-report', estimatedHours: 2 }
            : { type: 'practice', prompt: `Practice the skills from ${lesson.title}.`, skills: ['English language'] }
        ]
      }
    }
  })

  return {
    schemaVersion: 1,
    subject: courseDef.subject,
    gradeLevel: courseDef.gradeLevelMin,
    unitNumber: unit.unitNumber,
    weekNumber: lesson.weekNumber,
    title: lesson.title,
    description: lesson.description,
    pathways,
    vocabulary: [],
    quiz: [],
    resources: []
  }
}

// ─── Main Seeder ─────────────────────────────────────────────────────────────

async function seedCourse(courseDef: CourseDef) {
  // Find or create course
  let course = await prisma.course.findFirst({
    where: { title: courseDef.title }
  })

  if (course) {
    console.log(`  ⏭  Course "${courseDef.title}" already exists (id: ${course.id})`)
  } else if (!DRY_RUN) {
    course = await prisma.course.create({
      data: {
        title: courseDef.title,
        subject: courseDef.subject,
        gradeLevelMin: courseDef.gradeLevelMin,
        gradeLevelMax: courseDef.gradeLevelMax,
        isActive: true
      }
    })
    console.log(`  ✅  Created course "${courseDef.title}" (id: ${course.id})`)
  } else {
    console.log(`  🔍  [DRY RUN] Would create course "${courseDef.title}"`)
    return
  }

  let unitsCreated = 0, lessonsCreated = 0
  let unitsSkipped = 0, lessonsSkipped = 0

  for (const unitDef of courseDef.units) {
    let unit = await prisma.unit.findFirst({
      where: { courseId: course.id, unitNumber: unitDef.unitNumber }
    })

    if (unit) {
      unitsSkipped++
    } else if (!DRY_RUN) {
      unit = await prisma.unit.create({
        data: {
          courseId: course.id,
          unitNumber: unitDef.unitNumber,
          title: unitDef.title,
          weekStart: unitDef.weekStart,
          weekEnd: unitDef.weekEnd
        }
      })
      unitsCreated++
      console.log(`    ✅  Unit ${unitDef.unitNumber}: "${unitDef.title}"`)
    }

    if (!unit && DRY_RUN) {
      console.log(`    🔍  [DRY RUN] Would create Unit ${unitDef.unitNumber}: "${unitDef.title}" (4 lessons)`)
      continue
    }

    for (const lessonDef of unitDef.lessons) {
      const existing = await prisma.lesson.findFirst({
        where: { unitId: unit!.id, weekNumber: lessonDef.weekNumber }
      })

      if (existing) {
        lessonsSkipped++
      } else if (!DRY_RUN) {
        const content = buildMinimalContent(courseDef, unitDef, lessonDef)
        await prisma.lesson.create({
          data: {
            unitId: unit!.id,
            weekNumber: lessonDef.weekNumber,
            title: lessonDef.title,
            type: lessonDef.type,
            content: content as unknown as Prisma.InputJsonValue
          }
        })
        lessonsCreated++
      }
    }
  }

  console.log(`    → Units: ${unitsCreated} created, ${unitsSkipped} skipped`)
  console.log(`    → Lessons: ${lessonsCreated} created, ${lessonsSkipped} skipped`)
  return course
}

async function main() {
  console.log('\n🌱  Seeding English for French Speakers courses...\n')
  if (DRY_RUN) console.log('   ⚠️  DRY RUN — no database changes\n')

  const courses = [level1, level2, level3, level4]
  const createdCourses: Array<{ title: string; id: string }> = []

  for (const courseDef of courses) {
    const course = await seedCourse(courseDef)
    if (course) {
      createdCourses.push({ title: course.title, id: course.id })
    }
  }

  console.log('\n─────────────────────────────────────────')
  console.log('Course IDs (save these for enrichment scripts):')
  for (const c of createdCourses) {
    console.log(`  ${c.title}: ${c.id}`)
  }
  console.log('─────────────────────────────────────────\n')

  await prisma.$disconnect()
}

main().catch(err => {
  console.error('\n❌  Fatal error:', err)
  process.exit(1)
})
