#!/usr/bin/env tsx
/**
 * Enrich Level 2 "English Fluency Builder for French Speakers" (A2→B1) — Units 4-6
 *
 * Unit 4: "The Working World" (unitNumber: 4, W1-W4)
 *   W1: Jobs and Career Vocabulary (INSTRUCTION)
 *   W2: Job Applications and Interviews (INSTRUCTION)
 *   W3: Workplace Communication (INSTRUCTION)
 *   W4: Career Exploration Portfolio (PROJECT)
 *
 * Unit 5: "Media and Communication" (unitNumber: 5, W1-W4)
 *   W1: News and Current Events (INSTRUCTION)
 *   W2: Social Media and Digital Communication (INSTRUCTION)
 *   W3: Formal vs Informal Register (INSTRUCTION)
 *   W4: News Report Project (PROJECT)
 *
 * Unit 6: "Nature and Environment" (unitNumber: 6, W1-W4)
 *   W1: Weather, Climate, and Geography (INSTRUCTION)
 *   W2: Animals and Ecosystems (INSTRUCTION)
 *   W3: Environmental Issues (INSTRUCTION)
 *   W4: Environmental Awareness Campaign (PROJECT)
 *
 * 3 pathways: ADVANCED (70 min), STANDARD (55 min), VOCATIONAL (40 min)
 * French-specific: false cognates, passive voice confusion, register differences
 * Biblical worldview woven throughout.
 *
 * Usage:
 *   npx tsx scripts/enrich-ef-l2-u4-6.ts --dry-run
 *   npx tsx scripts/enrich-ef-l2-u4-6.ts
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

interface ContentBlock {
  type: string
  [key: string]: unknown
}

interface PathwayVariant {
  pathway: 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'
  title: string
  estimatedMinutes: number
  objectives: string[]
  ipo: {
    input: ContentBlock[]
    processing: ContentBlock[]
    output: ContentBlock[]
  }
}

interface VocabItem {
  term: string
  definition: string
  example: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface EnrichedLesson {
  weekNumber: number
  pathways: PathwayVariant[]
  vocabulary: VocabItem[]
  quiz: QuizQuestion[]
}

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 4: THE WORKING WORLD (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit4Lessons: EnrichedLesson[] = [
  // ── W1: Jobs and Career Vocabulary (INSTRUCTION) ────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Jobs and Career Vocabulary',
        estimatedMinutes: 70,
        objectives: [
          'Use a wide range of workplace vocabulary to describe jobs, responsibilities, and qualifications.',
          'Identify and correct common false cognates related to work and careers (formation, stage, résumé).',
          'Construct detailed job descriptions using appropriate English vocabulary and sentence structures.',
          'Reflect on the biblical view of work as a calling from God.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you think about the future, what kind of work do you see yourself doing? Have you ever noticed that some French words for work-related things mean something completely different in English?',
              connection: 'In this lesson, we will explore the vocabulary of work and careers in English. You will discover that many French words that look like English words actually have very different meanings in the workplace. Mastering these differences will help you communicate professionally in English.',
            },
            {
              type: 'text',
              heading: 'The World of Work in English',
              body: 'The English-speaking workplace has its own rich vocabulary. Let us explore the key terms you need to know.\n\n**Job Titles and Roles:**\nIn English, job titles often describe what a person does: a *manager* manages people, a *developer* develops software, an *accountant* keeps accounts. Some titles use the suffix *-er* (teacher, driver, engineer) or *-ist* (scientist, journalist, therapist). French speakers sometimes struggle with titles because in French, the article matters (un professeur), but in English we often drop it: "She is **a** teacher" (not "She is teacher").\n\n**Responsibilities and Duties:**\nWhen describing what someone does at work, English uses phrases like: "She is responsible for..." "He is in charge of..." "Her duties include..." "The role involves..." These phrases help you move beyond simple sentences like "He works" into professional descriptions.\n\n**Qualifications and Skills:**\nEnglish distinguishes between *qualifications* (degrees, certificates, diplomas), *skills* (abilities you have developed), and *experience* (what you have done in previous jobs). A job posting might say: "Requires a bachelor\'s degree, three years of experience, and strong communication skills."\n\n**DANGER ZONE — False Cognates:**\nHere is where French speakers get into trouble:\n- **Formation** in French means *training* in English (NOT "formation" which means a shape or arrangement)\n- **Stage** in French means *internship* or *training period* in English (NOT "stage" which means a platform or a phase)\n- **Résumé** in French means *summary* in English. In American English, a *résumé* does refer to a CV, but in British English, *résumé* means summary and *CV* (curriculum vitae) is used for the job document\n- **Patron** in French means *boss* in English (NOT "patron" which means a customer or supporter)\n- **Société** in French means *company* in English (NOT "society" which means a community of people)\n\nThese false cognates can cause embarrassing mistakes in professional settings. Imagine telling your English-speaking boss, "I did a stage at a big society" when you mean "I did an internship at a large company"!',
            },
            {
              type: 'text',
              heading: 'Describing Jobs — Building Professional Sentences',
              body: 'To describe a job well in English, you need more than a title. Compare these two descriptions:\n\n**Basic:** "She is a nurse. She works at a hospital."\n**Professional:** "She is a registered nurse at City General Hospital. She is responsible for monitoring patients, administering medication, and coordinating with the medical team. The role requires a nursing degree and strong interpersonal skills."\n\nNotice the difference? Professional job descriptions use:\n- **Specific titles** (registered nurse, not just nurse)\n- **Action verbs** (monitoring, administering, coordinating)\n- **Professional phrases** (is responsible for, the role requires)\n- **Qualifications language** (requires a degree, strong skills)\n\nPractice building your descriptions using this formula:\n**[Person] is a [specific title] at [workplace]. [He/She] is responsible for [duty 1], [duty 2], and [duty 3]. The role requires [qualification] and [skill].**',
            },
            {
              type: 'biblical-worldview',
              theme: 'Work as Worship',
              scriptureRef: 'Colossians 3:23-24',
              reflection: 'The Bible says, "Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward. You are serving the Lord Christ" (Colossians 3:23-24). In God\'s eyes, every honest job — from cleaning floors to leading a company — has dignity and purpose. When we work well, we worship God through our effort and excellence.',
              applicationQuestion: 'How does knowing that all work is service to God change the way you think about different careers — especially jobs that the world might consider "less important"?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Look at the false cognates listed in this lesson (formation, stage, résumé, patron, société). Can you think of a situation where using the French meaning in English could cause a misunderstanding? Describe the scenario.',
                'Why do you think English uses so many specific job titles (software developer, marketing coordinator, dental hygienist) rather than broader categories? What does this tell us about how English-speaking cultures think about work?',
                'Read Colossians 3:23-24 again. How might this verse change the way a Christian approaches a job they do not particularly enjoy?',
              ],
            },
            {
              type: 'practice',
              activity: 'Job Description Builder',
              prompt: 'For each job below, write a professional description using at least two of these phrases: "is responsible for," "is in charge of," "duties include," "the role requires," "the position involves."\n\n1. Teacher at a primary school\n2. Chef at a restaurant\n3. Doctor at a clinic\n4. Journalist at a newspaper\n5. Farmer\n\nThen choose ONE of the false cognates from this lesson and write two sentences: one showing the WRONG way a French speaker might use the word, and one showing the CORRECT English usage.',
            },
            {
              type: 'practice',
              activity: 'Career Vocabulary Matching',
              prompt: 'Match each French workplace word with its correct English translation. Be careful — they are NOT the same word!\n\n1. formation → _____ (a. training  b. formation  c. education)\n2. stage → _____ (a. stage  b. internship  c. floor)\n3. patron → _____ (a. patron  b. boss  c. father)\n4. société → _____ (a. society  b. social  c. company)\n5. comptable → _____ (a. countable  b. accountant  c. compatible)\n6. bureau → _____ (a. bureau  b. office  c. desk — TRICK: both b and c can be correct!)\n\nFor each answer, write a sentence using the word correctly in English.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Choose a job that interests you. Write a **300-400 word professional job description** for that role. Your description must include:\n- The official job title and workplace\n- At least 4 specific responsibilities (using professional phrases like "responsible for," "in charge of")\n- Required qualifications and skills\n- A brief paragraph explaining why this job matters to society\n- A reflection (2-3 sentences) connecting the job to Colossians 3:23 — how could someone in this role "work heartily, as for the Lord"?\n\nAvoid all false cognates — use the correct English words throughout.',
            },
            {
              type: 'practice',
              prompt: 'Create a "False Cognate Alert Card" for French-speaking friends entering the English-speaking workplace. List at least 5 workplace false cognates, show the French meaning vs the English meaning, and write an example sentence for each showing the correct English usage.',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Jobs and Career Vocabulary',
        estimatedMinutes: 55,
        objectives: [
          'Learn key English vocabulary for jobs, responsibilities, and qualifications.',
          'Identify common false cognates related to work (formation, stage, résumé).',
          'Write simple job descriptions using professional phrases.',
          'Understand the biblical view that all work has dignity.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What job would you like to have in the future? Do you know how to describe that job in English — not just the title, but what the person actually does?',
              connection: 'In this lesson, you will learn how to talk about jobs and careers in English. You will also learn about tricky French words that do NOT mean the same thing in English!',
            },
            {
              type: 'text',
              heading: 'Talking About Jobs in English',
              body: 'When we talk about work in English, we need three types of vocabulary:\n\n**Job Titles:** These describe what a person does — teacher, doctor, engineer, mechanic, journalist, accountant, chef, nurse, farmer, lawyer.\n\nIn English, we say: "She is **a** teacher." Do not forget the article "a" — this is a common mistake for French speakers who might say "She is teacher."\n\n**Responsibilities:** To describe what someone does at work, use these phrases:\n- "She is responsible for teaching students."\n- "He is in charge of the kitchen."\n- "Her duties include writing reports."\n\n**Skills and Qualifications:** A *qualification* is a degree or certificate. A *skill* is something you can do well. *Experience* is what you have done before.\n\nExample: "This job requires a university degree, two years of experience, and good computer skills."',
            },
            {
              type: 'text',
              heading: 'Watch Out! False Cognates',
              body: 'Some French words LOOK like English words but mean something different. These are called **false cognates** (faux amis):\n\n- **Formation** (French) = **Training** (English). "Formation" in English means a shape or arrangement, not training!\n- **Stage** (French) = **Internship** (English). "Stage" in English means a platform where actors perform.\n- **Résumé** (French) = **Summary** (English). In American English, "résumé" can mean a CV, but be careful — in British English it only means summary.\n- **Patron** (French) = **Boss** (English). "Patron" in English means a customer or supporter.\n\nImagine this mistake: A French speaker says, "I did a stage at the society." An English speaker hears, "I performed on a stage at some kind of social club." The correct sentence is: "I did an internship at the company."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Work as Worship',
              scriptureRef: 'Colossians 3:23',
              reflection: 'The Bible tells us, "Whatever you do, work heartily, as for the Lord" (Colossians 3:23). God values all honest work. Whether you become a doctor or a farmer, a teacher or a mechanic, your work matters to God when you do it with effort and integrity.',
              applicationQuestion: 'Why do you think God cares about how we work, not just what job we have?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which false cognate from this lesson do you think would cause the most confusion? Why?',
                'Think about a job you admire. What responsibilities does that person have? What skills do they need?',
              ],
            },
            {
              type: 'practice',
              activity: 'Fix the False Cognates',
              prompt: 'Each sentence below contains a false cognate mistake. Rewrite the sentence with the correct English word.\n\n1. "I completed a formation in computer science." → _____\n2. "She did a stage at the hospital last summer." → _____\n3. "My patron is very strict about deadlines." → _____\n4. "He works for a big société in Paris." → _____\n5. "Can you give me a résumé of what happened?" → _____ (This one is tricky — is it wrong in American English? In British English?)\n\nThen write 3 sentences about a job using the phrases "responsible for," "in charge of," or "requires."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Choose a job and write a **200-300 word job description** in English. Include:\n- The job title and where the person works\n- At least 3 responsibilities (use professional phrases)\n- The qualifications and skills needed\n- Why this job is important\n\nMake sure you do NOT use any false cognates incorrectly!',
            },
            {
              type: 'practice',
              prompt: 'Write 3 sentences connecting Colossians 3:23 to the job you described. How could someone in that role work "as for the Lord"?',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Jobs and Career Vocabulary',
        estimatedMinutes: 40,
        objectives: [
          'Learn basic English vocabulary for common jobs and responsibilities.',
          'Recognize important false cognates related to work.',
          'Describe a job using simple English sentences.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What job does someone in your family do? Can you describe it in English?',
              connection: 'Today we will learn how to talk about jobs in English. We will also learn about some French words that can trick you because they mean something different in English!',
            },
            {
              type: 'text',
              heading: 'Job Words in English',
              body: 'Here are common job titles in English:\n- **Teacher** — teaches students\n- **Doctor** — helps sick people\n- **Nurse** — cares for patients\n- **Mechanic** — fixes cars and machines\n- **Chef** — cooks food in a restaurant\n- **Farmer** — grows food and raises animals\n- **Driver** — drives vehicles\n- **Builder** — constructs buildings\n\nTo talk about what someone does, say:\n- "She is **a** teacher." (Do not forget "a"!)\n- "He works **at** a hospital."\n- "She is responsible **for** cooking meals."\n\n**Tricky Words (False Cognates):**\n- French *formation* = English **training** (not "formation")\n- French *stage* = English **internship** (not "stage")\n- French *patron* = English **boss** (not "patron")',
            },
            {
              type: 'biblical-worldview',
              theme: 'Work as Worship',
              scriptureRef: 'Colossians 3:23',
              reflection: 'The Bible says, "Whatever you do, work heartily, as for the Lord" (Colossians 3:23). Every job matters to God. When we do our best, we honor Him.',
              applicationQuestion: 'What is one job you respect? Why is that work important?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which false cognate surprised you the most? Why?',
                'Name three jobs you see in your community. What does each person do?',
              ],
            },
            {
              type: 'practice',
              activity: 'Job Sentences',
              prompt: 'Complete each sentence with the correct word:\n\n1. My uncle is _____ mechanic. (a / an / the)\n2. She works _____ a school. (at / in / on)\n3. He is responsible _____ cleaning the office. (for / to / of)\n4. I completed my _____ at the company. (stage / internship / formation)\n5. My _____ told me to arrive early. (patron / boss / society)\n\nThen write 3 sentences about a job someone in your family does.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **150-200 words** describing a job you would like to have. Include:\n- The job title\n- Where you would work\n- What you would do each day (at least 2 responsibilities)\n- Why you like this job\n\nUse the correct English words — no false cognates!',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'qualification', definition: 'A degree, certificate, or diploma that proves you completed training or education.', example: 'This job requires a university qualification in business.' },
      { term: 'internship', definition: 'A period of work experience, often temporary, to gain practical skills. (French: stage)', example: 'She completed a six-month internship at a marketing company.' },
      { term: 'responsibilities', definition: 'The duties or tasks that are part of a job.', example: 'His responsibilities include managing the team and writing reports.' },
      { term: 'false cognate', definition: 'A word that looks similar in two languages but has a different meaning.', example: '"Formation" is a false cognate — in French it means training, but in English it means a shape.' },
      { term: 'résumé / CV', definition: 'A document listing your education, skills, and work experience for job applications.', example: 'Please send your CV with your application.' },
      { term: 'salary', definition: 'The money you earn from your job, usually paid monthly.', example: 'The position offers an annual salary of $45,000.' },
      { term: 'colleague', definition: 'A person you work with at your job.', example: 'My colleague helped me prepare for the presentation.' },
      { term: 'promotion', definition: 'An advancement to a higher position at work.', example: 'After three years of hard work, she received a promotion to manager.' },
    ],
    quiz: [
      { question: 'What does the French word "formation" mean in English?', options: ['Formation', 'Training', 'Education', 'Information'], correctAnswer: 1, explanation: '"Formation" is a false cognate. In French it means training, but in English "formation" means a shape or arrangement.' },
      { question: 'Which phrase is correct for describing job duties?', options: ['She is responsible to teach', 'She is responsible for teaching', 'She is responsible of teaching', 'She is responsible at teaching'], correctAnswer: 1, explanation: 'The correct phrase is "responsible for" + gerund (-ing form). This is a fixed expression in English.' },
      { question: 'What does "stage" (French) mean in English?', options: ['A platform for performances', 'An internship or training period', 'A floor of a building', 'A step in a process'], correctAnswer: 1, explanation: 'French "stage" means internship or training period. English "stage" usually means a platform or a phase.' },
      { question: 'Which sentence correctly introduces a job?', options: ['She is teacher.', 'She is a teacher.', 'She is the teacher.', 'She teacher is.'], correctAnswer: 1, explanation: 'In English, we use the article "a" before a job title: "She is a teacher." French speakers often forget this article.' },
      { question: 'What is a "colleague"?', options: ['A person you went to school with', 'A person you work with', 'A person who lives near you', 'A person in your family'], correctAnswer: 1, explanation: 'A colleague is someone you work with. A person you went to school with is a classmate or schoolmate.' },
      { question: 'What does French "patron" mean in English?', options: ['A customer', 'A pattern', 'A boss', 'A father figure'], correctAnswer: 2, explanation: 'French "patron" means boss. English "patron" means a customer or supporter.' },
      { question: 'Which word describes the money you earn from a job?', options: ['Salary', 'Celery', 'Solary', 'Gallery'], correctAnswer: 0, explanation: 'A salary is the money earned from employment, usually paid monthly. Do not confuse "salary" with "celery" (a vegetable)!' },
      { question: '"The role requires three years of _____."', options: ['experience', 'experiment', 'expertise', 'expectation'], correctAnswer: 0, explanation: 'Experience refers to knowledge gained through doing something. French speakers sometimes confuse "experience" (vécu) with "experiment" (expérience scientifique).' },
      { question: 'What does "promotion" mean in a workplace?', options: ['An advertisement for a product', 'Moving to a higher job position', 'A sale or discount', 'A ceremony at school'], correctAnswer: 1, explanation: 'In the workplace, a promotion means advancing to a higher position. It can also mean advertising, but in a work context it refers to career advancement.' },
      { question: 'According to Colossians 3:23, how should Christians approach their work?', options: ['Work only when the boss is watching', 'Work heartily, as for the Lord', 'Work only for the highest salary', 'Work as little as possible'], correctAnswer: 1, explanation: 'Colossians 3:23 says "Whatever you do, work heartily, as for the Lord and not for men." God values diligent, honest work in every profession.' },
    ],
  },

  // ── W2: Job Applications and Interviews (INSTRUCTION) ──────────────────────
  {
    weekNumber: 2,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Job Applications and Interviews',
        estimatedMinutes: 70,
        objectives: [
          'Write a professional cover letter and CV in English using appropriate formal register.',
          'Prepare confident responses to common interview questions.',
          'Distinguish between formal and informal register in professional contexts.',
          'Identify French transfer errors that commonly appear in English job applications.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you are applying for your dream job — but the entire application must be in English. Could you write a cover letter that would impress an employer? What would you say in an interview?',
              connection: 'Job applications and interviews are high-stakes communication. Every word matters. In this lesson, you will learn the English conventions for CVs, cover letters, and interview responses — and discover how French writing habits can sometimes hurt your English applications.',
            },
            {
              type: 'text',
              heading: 'The English CV (Curriculum Vitae)',
              body: 'An English-language CV is structured differently from a French one. Here are the key differences:\n\n**Format Differences:**\n- English CVs do NOT include a photo (in most English-speaking countries, this is considered inappropriate because of anti-discrimination laws)\n- English CVs do NOT include personal information like age, marital status, or nationality\n- English CVs use bullet points, not paragraphs\n- English CVs put the most recent experience FIRST (reverse chronological order)\n\n**Standard Sections:**\n1. **Contact Information** — Name, phone, email, city (no full address needed)\n2. **Professional Summary** — 2-3 sentences describing your key strengths\n3. **Experience** — Job title, company, dates, and bullet-point responsibilities\n4. **Education** — Degree, institution, dates\n5. **Skills** — Languages, technical skills, certifications\n\n**Action Verbs:** English CVs begin each bullet point with a strong action verb:\n- "Managed a team of 12 employees"\n- "Developed new training materials"\n- "Increased sales by 15%"\n- "Coordinated events for 200+ participants"\n\n**French Transfer Errors to Avoid:**\n- Do NOT translate "formation" as "formation" — use "education" or "training"\n- Do NOT write "société" — write "company" or the company name\n- Do NOT begin with "I" in bullet points — use action verbs directly\n- Do NOT include your age, photo, or "situation familiale"',
            },
            {
              type: 'text',
              heading: 'Cover Letters and Interview Language',
              body: 'A **cover letter** accompanies your CV. It explains WHY you are the right person for the job. In English, cover letters follow a clear structure:\n\n**Paragraph 1:** State the job you are applying for and where you found it.\n"I am writing to apply for the position of Marketing Assistant, as advertised on your website."\n\n**Paragraph 2:** Explain why you are qualified. Connect your skills and experience to the job requirements.\n"During my internship at Global Media, I developed strong skills in social media management and content creation."\n\n**Paragraph 3:** Express enthusiasm and request an interview.\n"I would welcome the opportunity to discuss how my skills could contribute to your team. I am available for an interview at your convenience."\n\n**Interview Preparation:**\nCommon English interview questions include:\n- "Tell me about yourself." (Give a professional summary, NOT your life story)\n- "What are your strengths?" (Give specific examples)\n- "Why do you want this job?" (Show you researched the company)\n- "Where do you see yourself in five years?" (Show ambition and commitment)\n\n**Register Alert:** Job applications require FORMAL English. Avoid contractions (write "I am," not "I\'m"), slang, and overly casual language. French speakers should also avoid translating French formal expressions directly — "I have the honor to submit" sounds archaic in English. Instead, use "I am pleased to submit."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Integrity in Self-Presentation',
              scriptureRef: 'Proverbs 12:22; Ephesians 4:25',
              reflection: '"The Lord detests lying lips, but he delights in people who are trustworthy" (Proverbs 12:22). When writing a CV or answering interview questions, it is tempting to exaggerate or embellish. But God calls us to honesty. Paul writes, "Each of you must put off falsehood and speak truthfully to your neighbor" (Ephesians 4:25). A Christian\'s application should be accurate, honest, and still compelling — because the truth about who God made you to be is enough.',
              applicationQuestion: 'How can you present yourself confidently in a job application or interview while still being completely honest? Where is the line between "marketing yourself" and exaggeration?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why do you think English-speaking countries generally do not include photos or personal details on CVs? How does this compare to French CV conventions?',
                'Look at the interview question "Tell me about yourself." Why do you think the advice says to give a professional summary, not your life story? What does this tell us about English-speaking workplace culture?',
                'How can a Christian balance presenting themselves in the best light with the biblical command to be truthful?',
              ],
            },
            {
              type: 'practice',
              activity: 'CV and Cover Letter Workshop',
              prompt: 'Part A — Rewrite these French-style CV lines into proper English CV format:\n\n1. "Société Nationale des Télécommunications — j\'ai travaillé comme assistant marketing"\n   → English CV bullet point: _____\n\n2. "Formation: Licence en Commerce International, Université de Port-au-Prince"\n   → English CV education line: _____\n\n3. "Je suis une personne dynamique et motivée"\n   → English professional summary: _____\n\nPart B — Write the opening paragraph of a cover letter applying for a "Junior Marketing Coordinator" position at "Bright Future Education." Include where you saw the advertisement and why you are interested.',
            },
            {
              type: 'practice',
              activity: 'Mock Interview Responses',
              prompt: 'Write professional responses to each of these common interview questions. Each response should be 3-5 sentences long and use formal English.\n\n1. "Tell me about yourself."\n2. "What is your greatest strength?"\n3. "Why do you want to work for our company?"\n4. "Can you describe a challenge you have faced and how you handled it?"\n\nRemember: use formal register (no contractions), give specific examples, and keep your answers focused and professional.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a complete **cover letter (300-400 words)** applying for a job that interests you. Follow the three-paragraph structure taught in this lesson. Use formal English throughout — no contractions, no slang, and no French transfer errors. Your cover letter should demonstrate your understanding of English professional conventions.',
            },
            {
              type: 'practice',
              prompt: 'Create a one-page CV outline for yourself (or an imagined professional version of yourself in 10 years). Include all five standard sections: Contact Information, Professional Summary, Experience (at least 2 positions), Education, and Skills. Use action verbs for your experience bullet points.',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Job Applications and Interviews',
        estimatedMinutes: 55,
        objectives: [
          'Understand the structure of an English CV and cover letter.',
          'Practice answering common interview questions in formal English.',
          'Avoid French transfer errors in professional writing.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Have you ever imagined applying for a job in English? What would you need to write, and what would you need to say?',
              connection: 'Today you will learn how to write a CV and cover letter in English, and how to answer common interview questions. These are skills that will serve you for the rest of your life.',
            },
            {
              type: 'text',
              heading: 'Writing a CV in English',
              body: 'A **CV** (curriculum vitae) lists your education, experience, and skills. English CVs are different from French ones:\n\n**Do NOT include:** a photo, your age, your marital status, or your nationality.\n\n**Do include:**\n- **Contact information:** your name, phone number, and email\n- **Professional summary:** 2-3 sentences about your strengths\n- **Experience:** your jobs, with bullet points about what you did\n- **Education:** your degrees and where you studied\n- **Skills:** languages, computer skills, certifications\n\nStart each bullet point with an **action verb**:\n- "Managed customer accounts"\n- "Organized weekly meetings"\n- "Created social media content"\n\n**Watch out for false cognates:**\n- Write "training" not "formation"\n- Write "company" not "société"\n- Write "education" for the section about your degrees',
            },
            {
              type: 'text',
              heading: 'Cover Letters and Interviews',
              body: 'A **cover letter** goes with your CV. It explains why you want the job.\n\nStructure:\n1. Say what job you are applying for: "I am writing to apply for the position of..."\n2. Explain why you are a good fit: "I have experience in..."\n3. Ask for an interview: "I would welcome the opportunity to discuss..."\n\n**Common interview questions:**\n- "Tell me about yourself." → Give a short professional summary.\n- "What are your strengths?" → Give an example.\n- "Why do you want this job?" → Show you know about the company.\n\n**Important:** Use formal language. Say "I am" not "I\'m." Say "I would like" not "I wanna." Do not translate French formal phrases directly — "I have the honor to..." sounds strange in English. Instead say "I am pleased to..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honesty in Self-Presentation',
              scriptureRef: 'Proverbs 12:22',
              reflection: 'The Bible says, "The Lord detests lying lips, but he delights in people who are trustworthy" (Proverbs 12:22). When writing a CV or answering interview questions, always be honest. You can present yourself in the best light without exaggerating or lying.',
              applicationQuestion: 'How can you be both honest and impressive in a job application?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why do you think English CVs do not include photos or personal information like age?',
                'Which interview question from this lesson seems hardest to answer? Why?',
              ],
            },
            {
              type: 'practice',
              activity: 'Fix the Application',
              prompt: 'This cover letter has mistakes. Find and fix them:\n\n"Dear Mr. Manager,\n\nI have the honor to apply for the post of assistant. I did a formation in business and I completed a stage at a big société. I\'m really good at stuff and I wanna work for you guys. My patron at my last job said I was great.\n\nPlease call me anytime.\n\nBye!"\n\nRewrite this letter using proper English, formal register, and correct vocabulary (no false cognates, no slang).',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **200-300 word cover letter** applying for a job that interests you. Use the three-paragraph structure and formal English. Avoid false cognates and slang.',
            },
            {
              type: 'practice',
              prompt: 'Write a response to this interview question: "Tell me about yourself." Your answer should be 4-6 sentences, use formal English, and give a professional summary — not your life story.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Job Applications and Interviews',
        estimatedMinutes: 40,
        objectives: [
          'Know the basic parts of an English CV.',
          'Practice answering a simple interview question in English.',
          'Use formal language in professional settings.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If someone asked you "Tell me about yourself" in a job interview, what would you say?',
              connection: 'Today we will learn the basics of job applications in English — what to write on your CV and how to answer interview questions.',
            },
            {
              type: 'text',
              heading: 'Your English CV',
              body: 'A **CV** tells an employer about you. Here is what to include:\n\n1. **Your name and contact information** (phone, email)\n2. **Education** — where you went to school\n3. **Experience** — jobs you have done\n4. **Skills** — things you are good at\n\n**Important rules:**\n- Do NOT include a photo\n- Do NOT write your age\n- Use action words: "Helped customers," "Organized supplies," "Cleaned the workspace"\n- Write "training" not "formation"\n- Write "company" not "société"\n\n**In an interview:**\n- Use formal language: "I am" not "I\'m"\n- When they ask "Tell me about yourself," say something like: "I am a hard-working student. I have experience helping in my family\'s business. I enjoy working with people."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honesty',
              scriptureRef: 'Proverbs 12:22',
              reflection: 'God loves honesty. When you apply for a job, always tell the truth about your skills and experience. You do not need to lie — God made you with real talents!',
              applicationQuestion: 'Why is honesty important when applying for a job?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What would you include on your CV right now?',
                'Why is it important to use formal language in a job interview?',
              ],
            },
            {
              type: 'practice',
              activity: 'Interview Practice',
              prompt: 'Write an answer to each question using formal English (2-3 sentences each):\n\n1. "Tell me about yourself."\n2. "What are you good at?"\n3. "Why do you want this job?"\n\nRemember: use "I am" not "I\'m" and keep it professional!',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Fill out a simple CV template with your information (or imagine you are 5 years older). Include:\n- Your name and email\n- Education\n- One work experience (real or imagined) with 2 bullet points starting with action verbs\n- 3 skills\n\nWrite **150-200 words** total.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'cover letter', definition: 'A letter that accompanies your CV explaining why you are a good fit for a job.', example: 'Her cover letter explained her passion for education and her relevant experience.' },
      { term: 'CV (curriculum vitae)', definition: 'A document that lists your education, work experience, and skills for job applications.', example: 'Please submit your CV and cover letter by Friday.' },
      { term: 'formal register', definition: 'A style of language used in professional or official situations, avoiding slang and contractions.', example: 'In a job interview, you should use formal register: say "I am" instead of "I\'m."' },
      { term: 'action verb', definition: 'A strong verb used to begin bullet points on a CV (managed, created, organized, developed).', example: '"Managed a team of five volunteers" uses the action verb "managed."' },
      { term: 'interview', definition: 'A formal meeting where an employer asks questions to determine if you are right for a job.', example: 'She practiced common interview questions before her appointment.' },
      { term: 'qualification', definition: 'A degree, certificate, or credential that proves your competence.', example: 'The job listing requires a qualification in nursing or a related field.' },
      { term: 'reference', definition: 'A person who can speak about your character and work abilities to a potential employer.', example: 'My former teacher agreed to be a reference for my job application.' },
      { term: 'position', definition: 'A formal word for a job opening or role in a company.', example: 'I am applying for the position of assistant manager.' },
    ],
    quiz: [
      { question: 'What should you NOT include on an English CV?', options: ['Your education', 'Your photo', 'Your work experience', 'Your contact information'], correctAnswer: 1, explanation: 'In most English-speaking countries, CVs should not include a photo. This differs from French CV conventions.' },
      { question: 'What is a cover letter?', options: ['A blank page that covers your CV', 'A letter explaining why you are right for a job', 'A list of your skills', 'A thank-you note after an interview'], correctAnswer: 1, explanation: 'A cover letter accompanies your CV and explains your interest in the position and your qualifications.' },
      { question: 'Which opening is best for a formal cover letter?', options: ['Hey there!', 'I am writing to apply for the position of...', 'I have the honor to submit...', 'Yo, I want this job.'], correctAnswer: 1, explanation: '"I am writing to apply for the position of..." is the standard professional opening for English cover letters.' },
      { question: 'When an interviewer says "Tell me about yourself," you should:', options: ['Tell them your entire life story', 'Give a short professional summary', 'Ask them a question instead', 'Talk about your hobbies'], correctAnswer: 1, explanation: 'This question asks for a brief professional summary — your experience, skills, and career goals.' },
      { question: 'Which CV bullet point uses the best action verb?', options: ['I was responsible for sales', 'Increased sales by 20%', 'Sales were my job', 'I did sales stuff'], correctAnswer: 1, explanation: '"Increased sales by 20%" uses the strong action verb "increased" and includes a specific result.' },
      { question: 'What register should you use in a job application?', options: ['Informal — it shows personality', 'Formal — it shows professionalism', 'Slang — it sounds cool', 'Texting language — it saves time'], correctAnswer: 1, explanation: 'Job applications require formal register. Avoid contractions, slang, and overly casual language.' },
      { question: 'How do you say French "formation" correctly in English on a CV?', options: ['Formation', 'Training / Education', 'Forming', 'Formatic'], correctAnswer: 1, explanation: 'French "formation" translates to "training" or "education" in English, depending on context.' },
      { question: 'What is a "reference" in a job application?', options: ['A book you read', 'A person who can speak about your abilities', 'A list of your grades', 'A copy of your diploma'], correctAnswer: 1, explanation: 'A reference is someone (often a former employer or teacher) who can recommend you to a new employer.' },
      { question: 'Which phrase is TOO informal for a cover letter?', options: ['I am writing to apply', 'I would welcome the opportunity', 'I wanna work for you guys', 'I am pleased to submit'], correctAnswer: 2, explanation: '"I wanna work for you guys" uses slang ("wanna," "you guys") and is far too informal for professional writing.' },
      { question: 'According to Proverbs 12:22, what does God value in communication?', options: ['Impressive language', 'Trustworthiness and honesty', 'Long speeches', 'Fancy vocabulary'], correctAnswer: 1, explanation: 'Proverbs 12:22 says "The Lord detests lying lips, but he delights in people who are trustworthy." Honesty matters to God.' },
    ],
  },

  // ── W3: Workplace Communication (INSTRUCTION) ──────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Workplace Communication',
        estimatedMinutes: 70,
        objectives: [
          'Write professional emails following English conventions for tone, structure, and formality.',
          'Use appropriate language for phone conversations and meetings in a professional setting.',
          'Distinguish between formal and informal workplace language and select the right register for each situation.',
          'Navigate cross-cultural differences in workplace communication between French and English contexts.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Have you ever received an email or message that felt rude — even though the person probably did not mean it that way? Tone is everything in workplace communication. How do you sound professional, friendly, and clear all at the same time?',
              connection: 'Workplace communication is where your English skills are tested every day. Emails, phone calls, and meetings all require different language skills. In this lesson, you will master the conventions that make English-speaking workplaces tick.',
            },
            {
              type: 'text',
              heading: 'Professional Email Etiquette',
              body: 'Email is the backbone of professional communication in English-speaking workplaces. Here are the conventions you must know:\n\n**Subject Line:** Be specific and brief.\n- GOOD: "Meeting rescheduled to Thursday 3pm"\n- BAD: "Hello" or "Question" or (worst) no subject at all\n\n**Greeting:** Match formality to the relationship.\n- Formal: "Dear Mr. Thompson," or "Dear Dr. Chen,"\n- Semi-formal: "Hello Sarah," or "Good morning, Team,"\n- Informal (close colleagues): "Hi James,"\n\n**Body:** Get to the point quickly. English business culture values brevity.\n- Open with purpose: "I am writing to confirm..." or "I wanted to follow up on..."\n- Provide necessary details in short paragraphs or bullet points\n- Close with a clear action: "Could you please send the report by Friday?" or "Please let me know if you have any questions."\n\n**Closing:** Match the greeting\'s formality.\n- Formal: "Kind regards," or "Sincerely,"\n- Semi-formal: "Best regards," or "Best,"\n- Informal: "Thanks," or "Cheers," (British)\n\n**FRENCH vs. ENGLISH Differences:**\nFrench business emails tend to be longer and more formal. The classic French closing "Veuillez agréer, Madame/Monsieur, l\'expression de mes sentiments distingués" has NO English equivalent. Never translate it literally! In English, "Kind regards" or "Sincerely" is sufficient.\n\nAlso, French speakers often write overly polite emails that sound strange in English:\n- French style: "I would be most grateful if you could perhaps consider..." \n- English style: "Could you please send me the file?"\n\nEnglish workplace emails are more direct. This is not rude — it is efficient.',
            },
            {
              type: 'text',
              heading: 'Phone Calls and Meetings',
              body: '**Phone Conversations:**\nMany people find phone calls in a second language stressful because you cannot see the other person\'s face. Here are key phrases:\n\n- Answering: "Good morning, [Company name], [Your name] speaking. How can I help you?"\n- Identifying yourself: "This is [Your name] from [Company]."\n- Asking to speak to someone: "Could I speak to Mr. Johnson, please?"\n- Taking a message: "I\'m afraid he\'s not available. Can I take a message?"\n- Ending: "Thank you for your call. Have a good day."\n\n**Meetings:**\n- Starting: "Shall we begin?" or "Let\'s get started."\n- Giving opinions: "I think..." "In my view..." "From my perspective..."\n- Agreeing: "I agree with that point." "That\'s a good idea."\n- Disagreeing politely: "I see your point, but..." "I\'m not sure I agree because..."\n- Asking for clarification: "Could you elaborate on that?" "What do you mean by...?"\n- Summarizing: "So to summarize..." "In conclusion..."\n\n**Cultural Note:** In English-speaking workplaces, meetings often begin with a minute or two of "small talk" — casual conversation about the weather, the weekend, or general topics. This is not wasting time; it is building relationships. French speakers may find this surprising, as French business culture sometimes moves to the agenda more quickly.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Gracious Communication',
              scriptureRef: 'Colossians 4:6; Ephesians 4:29',
              reflection: 'Paul writes, "Let your speech always be gracious, seasoned with salt, so that you may know how you ought to answer each person" (Colossians 4:6). In the workplace, our communication reflects our character. Ephesians 4:29 adds, "Let no corrupting talk come out of your mouths, but only such as is good for building up." Professional communication is not just about sounding competent — it is about treating others with dignity and respect.',
              applicationQuestion: 'How can a Christian\'s workplace emails and conversations be different from everyone else\'s — not just in avoiding gossip, but in actively building others up?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why do English business emails tend to be shorter and more direct than French ones? Is directness always better, or are there situations where the French approach might be more appropriate?',
                'Role-play: A colleague sends you an email that sounds abrupt and rude. Before you react, what should you consider? How might cultural differences explain the tone?',
                'Read Colossians 4:6. What does it mean for speech to be "seasoned with salt"? How might this apply to workplace emails and meetings?',
              ],
            },
            {
              type: 'practice',
              activity: 'Email Makeover',
              prompt: 'Rewrite each poorly written email into a professional version:\n\n**Email 1 (too informal):**\n"hey boss, gonna be late 2morrow, had some stuff come up, cool?"\n\n**Email 2 (too French-formal):**\n"Most Esteemed Director, I have the distinguished honor of writing to you in order to humbly request that you would perhaps be so kind as to grant me permission to arrive at a slightly delayed hour tomorrow morning. I remain at your most devoted service."\n\n**Email 3 (unclear purpose):**\n"Hi, so about that thing we talked about... I was thinking maybe we could do something about it? Let me know."\n\nFor each rewrite, include: a clear subject line, appropriate greeting, concise body, and professional closing.',
            },
            {
              type: 'practice',
              activity: 'Phone Call Script',
              prompt: 'Write a complete phone conversation script for this scenario:\n\nYou call a company to inquire about a job opening. The receptionist answers. You need to:\n1. Identify yourself\n2. Ask to speak to the hiring manager (Mrs. Williams)\n3. Learn she is not available\n4. Leave a message with your name and phone number\n5. Thank the receptionist and end the call\n\nWrite both sides of the conversation (You and the Receptionist).',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **three professional emails** (250-350 words total across all three):\n\n1. **A formal email** to a potential employer following up after an interview. Thank them, reiterate your interest, and mention one thing you discussed.\n\n2. **A semi-formal email** to your team at work announcing that the weekly meeting has been moved to a new time. Include all necessary details.\n\n3. **An informal email** to a close colleague asking if they want to have lunch together to discuss a project.\n\nFor each email, include the subject line, appropriate greeting, body, and closing.',
            },
            {
              type: 'practice',
              prompt: 'Write a short reflection (100 words) on how French and English workplace communication differ. Which differences surprised you the most? How will you adjust your communication style when writing in English?',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Workplace Communication',
        estimatedMinutes: 55,
        objectives: [
          'Write a professional email with correct structure and tone.',
          'Use appropriate phrases for phone calls and meetings.',
          'Understand the difference between formal and informal workplace language.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Have you ever written an email and wondered, "Does this sound too formal? Too casual? Could this be misunderstood?" Getting the right tone in English workplace communication is a real skill.',
              connection: 'In this lesson, you will learn how to write professional emails, handle phone calls, and participate in meetings — all in English. These are skills you will use every day in your career.',
            },
            {
              type: 'text',
              heading: 'Writing Professional Emails',
              body: 'A professional email has five parts:\n\n1. **Subject line:** Short and clear. "Meeting on Friday" is good. "Hi" is not.\n\n2. **Greeting:** Match the formality:\n   - Formal: "Dear Mr. Brown,"\n   - Semi-formal: "Hello Sarah,"\n   - Informal: "Hi James,"\n\n3. **Body:** Get to the point. Start with your purpose:\n   - "I am writing to ask about..."\n   - "I wanted to confirm that..."\n   - "Could you please send me..."\n\n4. **Closing sentence:** "Please let me know if you have any questions." or "I look forward to hearing from you."\n\n5. **Sign-off:** "Kind regards," (formal) or "Best," (semi-formal) or "Thanks," (informal)\n\n**French speakers — watch out:**\n- Do NOT translate "Veuillez agréer..." — just write "Kind regards"\n- English emails are shorter and more direct than French ones\n- Being direct is not rude — it is efficient',
            },
            {
              type: 'text',
              heading: 'Phone Calls and Meetings',
              body: '**On the phone:**\n- "Good morning, this is [your name] from [company]."\n- "Could I speak to Mrs. Williams, please?"\n- "I\'m afraid she is not available. Can I take a message?"\n- "Thank you for your call. Goodbye."\n\n**In a meeting:**\n- Give your opinion: "I think..." or "In my opinion..."\n- Agree: "I agree." or "That\'s a good point."\n- Disagree politely: "I see your point, but..." or "I understand, however..."\n- Ask for help: "Could you explain that again, please?"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Gracious Speech',
              scriptureRef: 'Colossians 4:6',
              reflection: 'Paul says, "Let your speech always be gracious, seasoned with salt" (Colossians 4:6). In the workplace, how we communicate matters as much as what we say. Kind, clear, and respectful communication reflects Christ.',
              applicationQuestion: 'How can you be both professional and genuinely kind in your workplace emails?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the biggest difference between French and English professional emails?',
                'Why is it important to match your greeting and closing to the level of formality?',
              ],
            },
            {
              type: 'practice',
              activity: 'Email Correction',
              prompt: 'This email has several problems. Find and fix them:\n\n"hey, so I need that report by tmrw. thx. PS — I have the distinguished honor of wishing you a pleasant evening."\n\nRewrite it as a proper professional email with a subject line, greeting, clear body, and closing.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **two professional emails** (200-300 words total):\n\n1. A formal email to a potential employer asking about a job opening.\n2. A semi-formal email to a colleague asking to reschedule a meeting.\n\nInclude subject lines, greetings, bodies, and closings for both.',
            },
            {
              type: 'practice',
              prompt: 'Write a short phone conversation (8-10 lines) where you call a company and ask to speak with someone who is not available, then leave a message.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Workplace Communication',
        estimatedMinutes: 40,
        objectives: [
          'Write a simple professional email with correct structure.',
          'Use basic phrases for phone calls at work.',
          'Understand the difference between formal and informal language at work.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you needed to write an email to your boss, would you write it the same way you text a friend? Why not?',
              connection: 'Today you will learn how to write professional emails and speak on the phone at work. These simple skills will help you in any job.',
            },
            {
              type: 'text',
              heading: 'Writing Work Emails',
              body: 'A work email needs:\n\n1. **Subject line:** What the email is about. Example: "Meeting Tomorrow"\n2. **Greeting:** "Dear Mr. Smith," or "Hello Sarah,"\n3. **Message:** Say what you need in 2-3 sentences.\n4. **Closing:** "Thank you," or "Kind regards,"\n5. **Your name**\n\n**Example:**\nSubject: Absent Tomorrow\n\nDear Mrs. Johnson,\n\nI will not be able to come to work tomorrow due to a medical appointment. I will return on Wednesday.\n\nThank you,\nJean-Pierre\n\n**Phone phrases:**\n- "Hello, this is [your name]."\n- "Could I speak to [name], please?"\n- "Thank you. Goodbye."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Kind Words',
              scriptureRef: 'Colossians 4:6',
              reflection: 'The Bible says to let our speech be "gracious, seasoned with salt" (Colossians 4:6). This means being polite and kind — even in emails and phone calls at work.',
              applicationQuestion: 'Why is it important to be polite in work messages?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between how you text a friend and how you email your boss?',
                'Why do we need a subject line in an email?',
              ],
            },
            {
              type: 'practice',
              activity: 'Write an Email',
              prompt: 'Write a short email to your boss telling them you will be 30 minutes late tomorrow. Include:\n- Subject line\n- Greeting\n- Your reason (1-2 sentences)\n- Closing and your name\n\nUse formal language (say "I will" not "I\'ll").',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **two short emails** (150-200 words total):\n\n1. Email your boss to say you are sick and cannot come to work today.\n2. Email a colleague to ask if they can help you with a task.\n\nInclude subject lines, greetings, short messages, and closings.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'email etiquette', definition: 'The rules and conventions for writing polite and professional emails.', example: 'Good email etiquette includes using a clear subject line and proper greeting.' },
      { term: 'subject line', definition: 'The short description at the top of an email that tells the reader what the message is about.', example: 'A good subject line is specific: "Meeting Rescheduled to Thursday 3pm."' },
      { term: 'formal register', definition: 'Professional language used in official or business communication, avoiding contractions and slang.', example: 'In formal register, write "I would like" instead of "I\'d like."' },
      { term: 'sign-off', definition: 'The closing phrase at the end of an email before your name.', example: '"Kind regards" and "Sincerely" are common professional sign-offs.' },
      { term: 'small talk', definition: 'Light, casual conversation about everyday topics, often used at the start of meetings.', example: 'In English-speaking workplaces, small talk about the weather is common before meetings begin.' },
      { term: 'follow up', definition: 'To contact someone again about something you previously discussed.', example: 'I am writing to follow up on our conversation about the marketing project.' },
      { term: 'elaborate', definition: 'To explain something in more detail.', example: 'Could you elaborate on that point? I am not sure I understand.' },
      { term: 'agenda', definition: 'A list of topics to be discussed at a meeting.', example: 'The first item on the agenda is the budget review.' },
    ],
    quiz: [
      { question: 'What is the best subject line for an email about a moved meeting?', options: ['Hi', 'Question', 'Meeting rescheduled to Thursday 3pm', 'Important'], correctAnswer: 2, explanation: 'A good subject line is specific and tells the reader exactly what the email is about.' },
      { question: 'How should you translate the French email closing "Veuillez agréer..." into English?', options: ['Please accept my distinguished greetings', 'Kind regards', 'I remain at your service', 'With my most respectful sentiments'], correctAnswer: 1, explanation: 'The elaborate French closing has no English equivalent. Simply write "Kind regards" or "Sincerely."' },
      { question: 'Which greeting is appropriate for a formal email to someone you have not met?', options: ['Hey!', 'Yo,', 'Dear Mr. Thompson,', 'Sup,'], correctAnswer: 2, explanation: '"Dear Mr./Mrs. [Last Name]," is the standard formal greeting in professional English emails.' },
      { question: 'What is "small talk" in English-speaking workplaces?', options: ['Whispering so the boss cannot hear', 'Light casual conversation before getting to business', 'Talking about confidential information', 'Speaking in a small voice'], correctAnswer: 1, explanation: 'Small talk is casual conversation about everyday topics that helps build relationships in the workplace.' },
      { question: 'Which phrase is used to politely disagree in a meeting?', options: ['You are wrong.', 'That is stupid.', 'I see your point, but...', 'No way!'], correctAnswer: 2, explanation: '"I see your point, but..." acknowledges the other person\'s idea while introducing a different perspective.' },
      { question: 'How should you answer the phone professionally?', options: ['"Yeah?"', '"Who is this?"', '"Good morning, [Company], [Name] speaking."', '"Talk to me."'], correctAnswer: 2, explanation: 'The professional phone greeting identifies the company and yourself clearly and politely.' },
      { question: 'What does "follow up" mean?', options: ['To walk behind someone', 'To contact someone again about a previous topic', 'To copy someone else', 'To finish a task quickly'], correctAnswer: 1, explanation: '"Follow up" means to revisit or continue a conversation or action from before.' },
      { question: 'Which is the best closing for a formal email?', options: ['Later!', 'Cheers mate', 'Kind regards,', 'XOXO'], correctAnswer: 2, explanation: '"Kind regards" is a professional and widely accepted closing for formal emails.' },
      { question: 'What is an "agenda"?', options: ['A type of calendar', 'A list of topics for a meeting', 'A personal diary', 'A work schedule'], correctAnswer: 1, explanation: 'An agenda is a list of items to be discussed at a meeting. Note: in French, "agenda" can mean a diary/planner, but in English it specifically means a meeting plan.' },
      { question: 'According to Colossians 4:6, how should Christians communicate?', options: ['With complicated vocabulary', 'With anger when necessary', 'Graciously, seasoned with salt', 'Only when spoken to'], correctAnswer: 2, explanation: 'Paul instructs believers to let their speech be "gracious, seasoned with salt" — kind, wise, and respectful in every context.' },
    ],
  },

  // ── W4: Career Exploration Portfolio (PROJECT) ──────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Career Exploration Portfolio',
        estimatedMinutes: 70,
        objectives: [
          'Research a career of interest and present findings using professional English.',
          'Create a complete professional portfolio including a CV, cover letter, and mock interview responses.',
          'Demonstrate mastery of formal register in all written components.',
          'Reflect on how work serves as a calling from God.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could work anywhere in the world, doing anything you love, what would you choose? Now — can you convince an employer to hire you for that job, entirely in English?',
              connection: 'This project brings together everything you have learned about workplace vocabulary, applications, and communication. You will create a professional portfolio that could actually be used in a real job application.',
            },
            {
              type: 'text',
              heading: 'Your Career Exploration Portfolio',
              body: 'For this project, you will research a career that interests you and create a professional portfolio in English. This portfolio will demonstrate your ability to use workplace vocabulary, write in formal register, and present yourself professionally.\n\nYour portfolio will include four parts:\n\n1. **Career Research Report** — A 200-word summary of a career, including job responsibilities, required qualifications, typical salary, and growth opportunities.\n\n2. **Professional CV** — A one-page CV written as if you were applying for a position in this career (you may project yourself 5-10 years into the future).\n\n3. **Cover Letter** — A formal cover letter applying for a specific position in this field.\n\n4. **Mock Interview Responses** — Written answers to five common interview questions, tailored to this specific career.\n\nEvery component must use correct formal English, proper workplace vocabulary, and avoid all false cognates.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Work as Calling',
              scriptureRef: 'Colossians 3:23-24; Ephesians 2:10',
              reflection: 'Paul writes in Ephesians 2:10, "We are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." Your career is not just a way to earn money — it is part of God\'s purpose for your life. As you explore this career, consider how God might use your gifts, passions, and skills to serve others and glorify Him.',
              applicationQuestion: 'How might the career you are researching be used to serve God and serve others?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What career have you chosen to research? What interests you about it?',
                'What qualifications and skills does this career require? Which ones do you already have or are developing?',
                'How could someone in this career "work heartily, as for the Lord" (Colossians 3:23)?',
              ],
            },
            {
              type: 'practice',
              activity: 'Portfolio Planning',
              prompt: 'Before you begin writing, answer these planning questions:\n\n1. What career will you research?\n2. What are 3-4 key responsibilities of this job?\n3. What qualifications and skills are needed?\n4. What company will you "apply" to in your cover letter?\n5. What action verbs will you use in your CV?\n6. What makes you a good candidate (real or projected) for this role?\n\nUse these answers as a roadmap for your portfolio.',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'Career Exploration Portfolio',
              summary: 'Create a professional portfolio including a career research report, CV, cover letter, and mock interview responses.',
              description: 'Produce a four-part professional portfolio in English:\n\n**Part 1: Career Research Report (200 words)**\nResearch a career and summarize: What does this job involve? What qualifications are needed? What is the typical salary? What are the growth opportunities?\n\n**Part 2: Professional CV (one page)**\nCreate a CV for this career, projecting yourself 5-10 years in the future. Include: contact information, professional summary, experience (at least 2 positions with action verb bullet points), education, and skills.\n\n**Part 3: Cover Letter (200-250 words)**\nWrite a formal cover letter applying for a specific position. Follow the three-paragraph structure: state the position, explain your qualifications, and request an interview.\n\n**Part 4: Mock Interview Responses**\nWrite 3-5 sentence answers to five interview questions:\n- "Tell me about yourself."\n- "What are your greatest strengths?"\n- "Why do you want to work here?"\n- "Describe a challenge you have overcome."\n- "Where do you see yourself in five years?"\n\n**Requirements:**\n- Formal register throughout (no contractions, no slang)\n- No false cognate errors\n- Professional vocabulary from this unit\n- A concluding paragraph (50-75 words) reflecting on how this career could serve God\'s purposes',
              deliverable: 'written-report',
              estimatedHours: 3,
              rubric: [
                { dimension: 'Career Research', maxPoints: 20, descriptors: { exemplary: 'Thorough research with specific details about responsibilities, qualifications, salary, and growth. Well-organized and clearly written.', proficient: 'Adequate research covering main aspects of the career. Generally clear writing.', developing: 'Superficial research missing key details. Writing is unclear or disorganized.' } },
                { dimension: 'CV Quality', maxPoints: 25, descriptors: { exemplary: 'Professional format with strong action verbs, specific details, and all required sections. Reads like a real CV.', proficient: 'Includes all sections with appropriate vocabulary. Some action verbs used.', developing: 'Missing sections or uses weak language. Does not follow English CV conventions.' } },
                { dimension: 'Cover Letter', maxPoints: 25, descriptors: { exemplary: 'Follows three-paragraph structure perfectly. Formal register maintained throughout. Compelling and specific.', proficient: 'Follows basic structure with mostly formal language. Some specificity.', developing: 'Structure is unclear, register slips to informal, or content is too generic.' } },
                { dimension: 'Interview Responses and Language', maxPoints: 20, descriptors: { exemplary: 'Thoughtful, specific responses in polished formal English. No false cognates or register errors.', proficient: 'Adequate responses with mostly correct formal English. Minor errors.', developing: 'Responses are too brief or generic. Multiple language errors or false cognates.' } },
                { dimension: 'Biblical Reflection', maxPoints: 10, descriptors: { exemplary: 'Genuine, thoughtful reflection connecting this career to God\'s purposes and biblical principles about work.', proficient: 'Includes a reflection that connects work to faith, though it could be deeper.', developing: 'Reflection is superficial or missing.' } },
              ],
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Career Exploration Portfolio',
        estimatedMinutes: 55,
        objectives: [
          'Research a career and describe it in English.',
          'Create a CV and cover letter using professional English.',
          'Write mock interview answers in formal register.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What career interests you the most? Could you describe it, apply for it, and interview for it — all in English?',
              connection: 'In this project, you will put together a professional portfolio showing that you can communicate about careers in English.',
            },
            {
              type: 'text',
              heading: 'Your Career Portfolio',
              body: 'For this project, you will create a portfolio with three parts:\n\n1. **Career Description** — Write 150 words about a job that interests you. What does the person do? What skills do they need?\n\n2. **CV and Cover Letter** — Create a simple CV and a short cover letter applying for a position in this career.\n\n3. **Interview Answers** — Write answers to three common interview questions.\n\nUse formal English throughout. Remember: no false cognates, no slang, and no contractions.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Work as Calling',
              scriptureRef: 'Colossians 3:23',
              reflection: 'Remember that every career can be used to serve God. As you create your portfolio, think about how the career you chose could help others and honor the Lord.',
              applicationQuestion: 'How could someone in your chosen career serve God through their work?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What career did you choose? Why does it interest you?',
                'What is the hardest part of writing in formal English? What tips have helped you?',
              ],
            },
            {
              type: 'practice',
              activity: 'Portfolio Draft',
              prompt: 'Draft your career description (150 words) and the opening paragraph of your cover letter. Share with a partner and give each other feedback on formal register and false cognates.',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'Career Exploration Portfolio',
              summary: 'Create a career research report, CV, cover letter, and mock interview answers.',
              description: '**Part 1: Career Description (150 words)** — Describe the career, responsibilities, and required skills.\n\n**Part 2: CV** — Include contact info, education, experience (with action verbs), and skills.\n\n**Part 3: Cover Letter (150-200 words)** — Follow the three-paragraph structure.\n\n**Part 4: Interview Answers** — Answer three questions in 2-4 sentences each:\n- "Tell me about yourself."\n- "What are your strengths?"\n- "Why do you want this job?"\n\nUse formal English. Avoid all false cognates.',
              deliverable: 'written-report',
              estimatedHours: 2,
              rubric: [
                { dimension: 'Career Research', maxPoints: 25, descriptors: { exemplary: 'Clear, detailed description of the career with specific responsibilities and skills.', proficient: 'Adequate description covering the basics of the career.', developing: 'Description is too brief or vague.' } },
                { dimension: 'CV and Cover Letter', maxPoints: 40, descriptors: { exemplary: 'Professional format, formal register, strong vocabulary, and correct structure.', proficient: 'Includes required elements with mostly correct formal language.', developing: 'Missing elements, informal language, or false cognate errors.' } },
                { dimension: 'Interview Responses', maxPoints: 25, descriptors: { exemplary: 'Thoughtful, specific answers in formal English.', proficient: 'Adequate answers with mostly correct language.', developing: 'Answers are too short or use informal language.' } },
                { dimension: 'Language Accuracy', maxPoints: 10, descriptors: { exemplary: 'No false cognates, correct register throughout.', proficient: 'Minor errors that do not impede understanding.', developing: 'Multiple false cognates or register errors.' } },
              ],
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Career Exploration Portfolio',
        estimatedMinutes: 40,
        objectives: [
          'Describe a job in English.',
          'Write a simple CV with basic sections.',
          'Answer one interview question in formal English.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What job would you like to have someday? Can you talk about it in English?',
              connection: 'In this project, you will describe a job, write a simple CV, and answer an interview question — all in English!',
            },
            {
              type: 'text',
              heading: 'Your Mini Portfolio',
              body: 'You will create a simple career portfolio with three parts:\n\n1. **Job Description** — Write 5-8 sentences about a job you like.\n2. **Simple CV** — Your name, education, one experience, and 3 skills.\n3. **Interview Answer** — Answer "Tell me about yourself" in 3-4 sentences.\n\nUse formal language: say "I am" not "I\'m."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Work for the Lord',
              scriptureRef: 'Colossians 3:23',
              reflection: 'Whatever job you choose, you can do it for God. Work hard and be honest — that honors Him.',
              applicationQuestion: 'How can you honor God in your future job?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What job did you choose? What does that person do every day?',
                'What is one skill you have that would help you in that job?',
              ],
            },
            {
              type: 'practice',
              activity: 'Draft Your Portfolio',
              prompt: 'Write a first draft of your job description (5-8 sentences). Then fill in your CV sections:\n- Name and email\n- Education\n- One experience with 2 bullet points\n- 3 skills',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'Career Exploration Portfolio',
              summary: 'Create a simple job description, CV, and interview answer.',
              description: '**Part 1:** Write 5-8 sentences about a job you would like to have. Include what the person does and what skills they need.\n\n**Part 2:** Create a simple CV with your name, education, one experience (2 bullet points with action verbs), and 3 skills.\n\n**Part 3:** Write 3-4 sentences answering "Tell me about yourself" in formal English.\n\n**Total: 150-200 words.** Use formal language throughout.',
              deliverable: 'written-report',
              estimatedHours: 1.5,
              rubric: [
                { dimension: 'Job Description', maxPoints: 30, descriptors: { exemplary: 'Clear description with specific responsibilities and skills mentioned.', proficient: 'Basic description with some details.', developing: 'Too brief or unclear.' } },
                { dimension: 'CV', maxPoints: 40, descriptors: { exemplary: 'All sections present with action verbs and correct vocabulary.', proficient: 'Most sections present with some professional language.', developing: 'Missing sections or informal language.' } },
                { dimension: 'Interview Answer', maxPoints: 30, descriptors: { exemplary: 'Professional answer using formal English.', proficient: 'Adequate answer with mostly formal language.', developing: 'Too brief or uses informal language.' } },
              ],
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'portfolio', definition: 'A collection of work samples and documents that demonstrate your skills and experience.', example: 'She presented her portfolio to the interviewer, including writing samples and project reports.' },
      { term: 'career research', definition: 'The process of investigating a profession to understand its requirements, responsibilities, and opportunities.', example: 'Career research helped him decide between nursing and teaching.' },
      { term: 'professional summary', definition: 'A brief paragraph at the top of a CV that highlights your key strengths and experience.', example: 'Her professional summary described her as a dedicated educator with five years of experience.' },
      { term: 'growth opportunities', definition: 'The chances for advancement, promotion, or skill development within a career.', example: 'This company offers excellent growth opportunities, including leadership training and promotions.' },
      { term: 'formal register', definition: 'Professional language used in official settings, avoiding contractions and slang.', example: 'All parts of the portfolio must be written in formal register.' },
    ],
    quiz: [],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 5: MEDIA AND COMMUNICATION (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit5Lessons: EnrichedLesson[] = [
  // ── W1: News and Current Events (INSTRUCTION) ──────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'News and Current Events',
        estimatedMinutes: 70,
        objectives: [
          'Read and comprehend simplified English-language news articles, identifying main ideas and supporting details.',
          'Use key journalism and news vocabulary accurately in context.',
          'Distinguish between facts and opinions in news reporting.',
          'Reflect on the biblical call to discern truth in media consumption.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How do you get your news? Do you read it in French, in English, or both? Have you ever noticed that the same event can be reported very differently depending on the source?',
              connection: 'In today\'s connected world, being able to read and understand English-language news is an essential skill. In this lesson, you will learn how to read news articles in English, identify the most important information, and tell the difference between facts and opinions.',
            },
            {
              type: 'text',
              heading: 'How English-Language News Is Structured',
              body: 'English-language news articles follow a specific structure called the **inverted pyramid**. The most important information comes first, and the details follow in order of decreasing importance.\n\n**The Lead (or Lede):** The first paragraph answers the key questions: **Who? What? When? Where? Why? How?** This is the most important paragraph. If you only read the lead, you should understand the basic story.\n\nExample: "The Ministry of Education announced on Monday that all public schools in the capital will receive new textbooks by September, following a $2 million government investment in education reform."\n\nNotice how this single sentence tells you WHO (Ministry of Education), WHAT (new textbooks), WHEN (by September), WHERE (schools in the capital), and WHY ($2 million government investment).\n\n**The Body:** Provides additional details, quotes from experts or officials, background information, and statistics.\n\n**Key News Vocabulary:**\n- **Headline** — the title of a news article (often uses present tense: "Mayor Announces New Plan")\n- **Reporter / Journalist** — the person who writes the article\n- **Source** — where the information comes from\n- **Quote** — the exact words someone said, in quotation marks\n- **Breaking news** — very recent, important news\n- **Editorial / Opinion piece** — an article expressing the writer\'s personal view\n\n**FACT vs. OPINION:**\nA **fact** can be verified: "The temperature reached 35 degrees yesterday."\nAn **opinion** is a personal judgment: "Yesterday was the worst day of the summer."\n\nGood journalists keep facts and opinions separate. Readers must learn to spot the difference — especially because in English and French media, the line between reporting and opinion is sometimes blurred.',
            },
            {
              type: 'text',
              heading: 'Reading Strategies for News in English',
              body: 'Reading news in a second language can be challenging. Here are strategies to help:\n\n**1. Read the headline first.** Headlines give you the topic before you start the article. English headlines often drop articles (a, the) and use present tense for past events: "President Visits School" (meaning the president visited yesterday).\n\n**2. Focus on the lead.** The first paragraph gives you the essential facts. If the vocabulary is difficult, this paragraph alone will tell you the story.\n\n**3. Look for signal words.** Words like "according to," "officials said," and "sources report" indicate factual reporting. Words like "should," "best," "worst," and "in my opinion" indicate opinion.\n\n**4. Use context clues.** You do not need to understand every word. Look at the words around an unknown word to guess its meaning.\n\n**5. Check multiple sources.** Responsible readers compare how different news outlets report the same story. This helps you identify bias and get a more complete picture.\n\n**French/English News Differences:**\nFrench news writing tends to use longer sentences and more literary language. English news writing is typically shorter, more direct, and prefers active voice ("The mayor announced..." rather than "It was announced by the mayor...").',
            },
            {
              type: 'biblical-worldview',
              theme: 'Discernment and Truth',
              scriptureRef: 'Philippians 4:8; 1 Thessalonians 5:21',
              reflection: 'Paul writes, "Finally, brothers, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable — if anything is excellent or praiseworthy — think about such things" (Philippians 4:8). He also says, "Test everything; hold fast to what is good" (1 Thessalonians 5:21). In a world flooded with information, Christians are called to be careful, discerning consumers of news — not believing everything we read, but testing it against truth.',
              applicationQuestion: 'How can you apply Philippians 4:8 when deciding what news to read and share? What responsibility do Christians have when consuming and sharing information?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why is the "inverted pyramid" structure useful for news readers? How does it help someone who is reading in a second language?',
                'Look at this headline: "Schools Face Budget Crisis as Government Cuts Spending." Is this purely factual, or does the word "crisis" suggest an opinion? Discuss how word choice in headlines can influence readers.',
                'How does Philippians 4:8 guide us in choosing what news to consume and share? Should Christians avoid all negative news, or is there a difference between being informed and being overwhelmed?',
              ],
            },
            {
              type: 'practice',
              activity: 'News Article Analysis',
              prompt: 'Read this simplified news article and answer the questions below:\n\n**HEADLINE: Local Students Raise $5,000 for Clean Water Project**\n\n"Students at Riverside Academy raised over $5,000 last week through a charity walk to support clean water projects in rural Haiti. More than 200 students participated in the 5-kilometer walk, which was organized by the school\'s service club. \'We wanted to do something that would really make a difference,\' said club president Maria Santos, 15. The funds will be donated to WaterAid, an international organization that builds wells in communities without access to safe drinking water. Principal David Thompson called the event \'an inspiring example of young people taking action.\' The school plans to make the charity walk an annual tradition."\n\n1. Identify the WHO, WHAT, WHEN, WHERE, and WHY from the lead.\n2. Find two FACTS and one OPINION in this article.\n3. Identify one QUOTE and explain who said it.\n4. Rewrite the headline in a different style (but keep it accurate).\n5. Is there any information this article does NOT tell you that you would want to know?',
            },
            {
              type: 'practice',
              activity: 'Fact or Opinion?',
              prompt: 'Label each sentence as FACT or OPINION and explain your reasoning:\n\n1. "The election results were announced at 9pm."\n2. "The new policy is a disaster for small businesses."\n3. "According to the World Health Organization, 2 billion people lack safe drinking water."\n4. "The president\'s speech was the most inspiring address of the decade."\n5. "The school will close for two weeks during the holiday."\n6. "Education is the most important issue facing our country."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **300-400 word news article** about a real or imagined event at your school or in your community. Follow the inverted pyramid structure:\n- Lead paragraph answering Who, What, When, Where, Why\n- Body with additional details and at least one quote\n- Background information\n\nWrite objectively — keep your opinions out of the article. Use news vocabulary (headline, source, according to, etc.).',
            },
            {
              type: 'practice',
              prompt: 'Write a short reflection (100 words) on how Philippians 4:8 and 1 Thessalonians 5:21 apply to reading news. How can you be both informed and discerning?',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'News and Current Events',
        estimatedMinutes: 55,
        objectives: [
          'Read simplified English news articles and identify main ideas.',
          'Learn key news vocabulary (headline, lead, source, quote).',
          'Distinguish between facts and opinions in news articles.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you see a news story online, how do you decide if it is true? How do you find the most important information quickly?',
              connection: 'Being able to read news in English is an important life skill. Today you will learn how English news articles are organized and how to find the key information.',
            },
            {
              type: 'text',
              heading: 'Reading English News',
              body: 'English news articles put the **most important information first**. This is called the "inverted pyramid."\n\n**The Lead:** The first paragraph answers the big questions: Who? What? When? Where? Why?\n\nExample: "The city council voted on Tuesday to build a new public library in the downtown area."\n- WHO: the city council\n- WHAT: voted to build a new library\n- WHEN: Tuesday\n- WHERE: downtown\n\n**Key Words:**\n- **Headline** — the title of the article\n- **Source** — where the information comes from\n- **Quote** — someone\'s exact words: "I am excited about this project," said the mayor.\n\n**Fact vs. Opinion:**\n- FACT: "The library will cost $3 million." (Can be checked)\n- OPINION: "This is the best decision the council has ever made." (Personal judgment)',
            },
            {
              type: 'text',
              heading: 'Tips for Reading News in English',
              body: 'Reading news in English can be hard if it is not your first language. Here are some tips:\n\n1. **Read the headline** — it gives you the topic.\n2. **Read the first paragraph carefully** — it has the most important facts.\n3. **Do not try to understand every word** — look at the words around it to guess the meaning.\n4. **Look for signal words:** "According to..." and "officials said..." mean FACTS. Words like "best," "worst," and "should" often mean OPINIONS.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Testing What We Hear',
              scriptureRef: 'Philippians 4:8; 1 Thessalonians 5:21',
              reflection: 'The Bible tells us to "test everything; hold fast to what is good" (1 Thessalonians 5:21). God wants us to be wise about what we read and believe. Not everything in the news is accurate, and not everything is helpful. Philippians 4:8 encourages us to focus on what is true, noble, and right.',
              applicationQuestion: 'How can you be a more careful and wise consumer of news?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why do you think news articles put the most important information first?',
                'Can you think of a headline you have seen that used opinion words instead of just facts?',
              ],
            },
            {
              type: 'practice',
              activity: 'News Article Questions',
              prompt: 'Read this article and answer the questions:\n\n"More than 500 people attended the annual community festival on Saturday at Central Park. The event featured live music, food stalls, and activities for children. \'This is our best turnout yet,\' said organizer James Lee. Proceeds from the event will support the local food bank."\n\n1. WHO organized the event?\n2. WHAT happened?\n3. WHEN did it happen?\n4. WHERE was it?\n5. Find one FACT and one OPINION in the article.\n6. Who is quoted? What did they say?',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **200-300 word news article** about something that happened (or could happen) at your school or in your community. Include:\n- A headline\n- A lead paragraph with Who, What, When, Where\n- At least one quote\n- Only facts — no opinions\n\nFollow the inverted pyramid: most important information first!',
            },
            {
              type: 'practice',
              prompt: 'Write 3-4 sentences explaining the difference between a fact and an opinion, with one example of each from a news context.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'News and Current Events',
        estimatedMinutes: 40,
        objectives: [
          'Read a simple English news article and find the main idea.',
          'Learn basic news words (headline, article, fact, opinion).',
          'Tell the difference between a fact and an opinion.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Do you ever read news in English? What makes it easy or hard to understand?',
              connection: 'Today we will learn how to read news articles in English. You will learn a simple trick: the most important information is always at the beginning!',
            },
            {
              type: 'text',
              heading: 'Reading the News',
              body: 'News articles in English put the **most important information first**.\n\nThe first paragraph (called the "lead") tells you:\n- **Who** — who is the story about?\n- **What** — what happened?\n- **When** — when did it happen?\n- **Where** — where did it happen?\n\n**Example:**\n"Students at Hill School raised $500 for charity on Friday."\n- Who? Students at Hill School\n- What? Raised $500 for charity\n- When? Friday\n\n**Fact or Opinion?**\n- FACT: "The school has 300 students." (You can check this.)\n- OPINION: "It is the best school in town." (Someone\'s personal view.)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Truth',
              scriptureRef: 'Philippians 4:8',
              reflection: 'The Bible tells us to think about things that are TRUE (Philippians 4:8). When we read the news, we should look for the truth and be careful about believing everything we see.',
              applicationQuestion: 'How can you tell if something you read is true?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Where do you usually get your news? Do you check if it is true?',
                'What is the difference between a fact and an opinion?',
              ],
            },
            {
              type: 'practice',
              activity: 'Find the Facts',
              prompt: 'Read this short article:\n\n"The city opened a new park on Saturday. About 100 people came to the opening. Mayor Williams cut the ribbon. \'This park is wonderful,\' she said."\n\n1. WHO is this about?\n2. WHAT happened?\n3. WHEN?\n4. Find one FACT.\n5. Find one OPINION.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **150-200 words** about something that happened in your school or neighborhood. Write it like a news article:\n- Start with the most important information\n- Answer Who, What, When, Where\n- Include one quote (real or made up)\n- Stick to facts!',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'headline', definition: 'The title of a news article, usually in large text at the top.', example: 'The headline read: "Students Raise $5,000 for Clean Water."' },
      { term: 'lead (lede)', definition: 'The first paragraph of a news article that contains the most important information.', example: 'The lead answered who, what, when, and where in just one sentence.' },
      { term: 'source', definition: 'The person or organization that provides information for a news story.', example: 'According to government sources, the new law will take effect in January.' },
      { term: 'quote', definition: 'The exact words someone said, written in quotation marks.', example: '"I am proud of our students," the principal said.' },
      { term: 'editorial', definition: 'A newspaper article that expresses the writer\'s personal opinion rather than reporting facts.', example: 'The editorial argued that the city should invest more in public transportation.' },
      { term: 'breaking news', definition: 'Very recent and important news that is being reported as it happens.', example: 'Breaking news: a major storm is heading toward the coast.' },
      { term: 'inverted pyramid', definition: 'The structure of a news article where the most important information comes first.', example: 'English news articles follow the inverted pyramid — key facts first, details later.' },
      { term: 'bias', definition: 'A tendency to favor one side or perspective over another in reporting.', example: 'Careful readers look for bias by comparing how different news outlets report the same story.' },
    ],
    quiz: [
      { question: 'In English news writing, where is the most important information?', options: ['At the end of the article', 'In the middle', 'In the first paragraph (the lead)', 'In the headline only'], correctAnswer: 2, explanation: 'English news articles follow the inverted pyramid structure, placing the most important information in the lead paragraph.' },
      { question: 'What is a "headline"?', options: ['The first sentence of an article', 'The title of a news article', 'A line at the bottom of the page', 'The author\'s name'], correctAnswer: 1, explanation: 'A headline is the title of a news article, usually displayed in large text to attract readers.' },
      { question: 'Which of the following is a FACT?', options: ['This is the worst storm in history.', 'The storm caused $1 million in damage.', 'The government should have been better prepared.', 'Everyone was terrified by the storm.'], correctAnswer: 1, explanation: '"The storm caused $1 million in damage" can be verified with evidence. The other options express opinions or generalizations.' },
      { question: 'What does a news "source" provide?', options: ['The headline for the article', 'The information reported in the story', 'The photos in the article', 'The advertisements beside the article'], correctAnswer: 1, explanation: 'A source is the person or organization providing the information that the journalist reports.' },
      { question: 'The lead paragraph should answer which questions?', options: ['Why and How only', 'Who, What, When, Where, Why, How', 'Just What and When', 'Only Who and Where'], correctAnswer: 1, explanation: 'The lead paragraph answers the five W\'s and H: Who, What, When, Where, Why, and How.' },
      { question: 'What is an "editorial"?', options: ['A factual news report', 'An article expressing the writer\'s opinion', 'A news article about education', 'A correction to a previous article'], correctAnswer: 1, explanation: 'An editorial is an opinion piece where the writer shares their personal views, unlike factual news reporting.' },
      { question: 'Which word signals that a news article is reporting a fact from an official source?', options: ['Obviously', 'Unfortunately', 'According to', 'Clearly'], correctAnswer: 2, explanation: '"According to" signals that information comes from a specific source, indicating factual reporting.' },
      { question: 'What is "bias" in news?', options: ['Writing that is too long', 'A tendency to favor one side over another', 'Using difficult vocabulary', 'Reporting breaking news'], correctAnswer: 1, explanation: 'Bias means favoring one perspective or side in reporting. Readers should check multiple sources to identify bias.' },
      { question: 'English news headlines often use present tense for past events. Which headline follows this convention?', options: ['The President Has Visited the School', 'President Visited School Yesterday', 'President Visits School', 'The President Is Going to Visit School'], correctAnswer: 2, explanation: 'English headlines frequently use simple present tense for past events: "President Visits School" (even though the visit already happened).' },
      { question: 'According to 1 Thessalonians 5:21, what should we do with information we receive?', options: ['Believe everything immediately', 'Ignore all news', 'Test everything and hold fast to what is good', 'Only read news from one source'], correctAnswer: 2, explanation: 'Paul instructs us to "test everything; hold fast to what is good" — meaning we should evaluate information carefully and keep what is true.' },
    ],
  },

  // ── W2: Social Media and Digital Communication (INSTRUCTION) ───────────────
  {
    weekNumber: 2,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Social Media and Digital Communication',
        estimatedMinutes: 70,
        objectives: [
          'Analyze the distinctive features of online English communication, including abbreviations and informal conventions.',
          'Evaluate the differences between digital and formal English and determine when each is appropriate.',
          'Discuss digital literacy and responsible online communication from a Christian perspective.',
          'Identify how social media language differs from standard English and from French online conventions.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If someone from 100 years ago read your text messages, would they understand anything? Language online has its own rules — abbreviated, informal, constantly evolving. But is this a good thing or a bad thing?',
              connection: 'Social media and digital communication have created entirely new ways of using English. In this lesson, you will learn the conventions of online English, discuss when informal language is appropriate, and think about what it means to communicate responsibly online.',
            },
            {
              type: 'text',
              heading: 'The Language of the Internet',
              body: 'Online English has developed its own vocabulary and conventions. Understanding them is important — even if you do not use them all yourself.\n\n**Common Abbreviations:**\n- **LOL** — laughing out loud\n- **OMG** — oh my God/goodness\n- **BTW** — by the way\n- **TBH** — to be honest\n- **IMO / IMHO** — in my opinion / in my humble opinion\n- **DM** — direct message\n- **TL;DR** — too long; didn\'t read (a summary)\n- **FYI** — for your information\n\n**Social Media Conventions:**\n- **Hashtags (#):** Used to tag topics: #education #BreakingNews\n- **@ mentions:** Used to tag a person: @username\n- **Threads:** A series of connected posts telling a longer story\n- **Caption:** The text that accompanies a photo or video\n- **Going viral:** When content spreads rapidly to millions of people\n\n**Tone in Digital Communication:**\nOnline, tone is difficult to convey because you cannot hear someone\'s voice or see their face. This is why:\n- ALL CAPS means shouting: "I NEED THIS NOW" sounds angry\n- Periods at the end of short messages can seem cold: "Fine." sounds annoyed, while "Fine!" sounds enthusiastic\n- Emojis help convey tone in informal messages\n- Exclamation marks show enthusiasm: "Great job!"\n\n**French vs. English online differences:**\n- French uses "mdr" (mort de rire) where English uses "LOL"\n- French "stp" (s\'il te plaît) = English "pls" (please)\n- French "cc" (coucou) has no direct English equivalent — English might use "hey" or "hi"\n- French texting often drops accents; English texting drops vowels: "txt" for "text," "msg" for "message"',
            },
            {
              type: 'text',
              heading: 'Digital Literacy and Responsible Communication',
              body: 'Being digitally literate means more than knowing how to use technology. It means understanding:\n\n**Permanence:** Everything you post online can be screenshotted, shared, and stored forever. Even "disappearing" messages on some platforms can be captured.\n\n**Audience:** A post meant for your friends might be seen by a future employer, a teacher, or a stranger. Ask yourself: "Would I be comfortable if everyone in the world saw this?"\n\n**Misinformation:** Social media spreads false information rapidly. Before sharing, ask:\n- Who is the source?\n- Can I verify this with a reliable news outlet?\n- Am I sharing this because it is true, or because it triggered an emotional reaction?\n\n**Cyberbullying:** Hiding behind a screen does not make cruel words less harmful. Digital communication should follow the same standards of kindness and respect as face-to-face communication.\n\n**Register Awareness:** The biggest skill in digital communication is knowing WHEN to be informal and when to switch to formal English. Texting a friend? Abbreviations are fine. Emailing a professor? Full sentences, proper grammar, no emojis.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Guarding Our Words Online',
              scriptureRef: 'Philippians 4:8; Ephesians 4:29',
              reflection: 'Paul\'s words in Philippians 4:8 apply powerfully to social media: "Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable — if anything is excellent or praiseworthy — think about such things." And Ephesians 4:29 adds: "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up." Our online presence is an extension of our character. What we post, share, like, and comment on reflects who we are — and Whose we are.',
              applicationQuestion: 'If someone scrolled through everything you have ever posted, commented, or shared online, what picture of you would emerge? How can Christians use social media to "build others up" (Ephesians 4:29)?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Compare French and English online abbreviations. Which ones are similar? Which are completely different? Why do you think each language developed its own online shorthand?',
                'Discuss: Is the informal language of social media "ruining" English, or is it a natural evolution of language? Can both be true?',
                'Read Ephesians 4:29. How does this verse apply to comments, posts, and messages on social media? What would it look like to follow this verse online?',
              ],
            },
            {
              type: 'practice',
              activity: 'Register Switching',
              prompt: 'Translate each informal message into formal English, and each formal message into appropriate informal/social media English:\n\n**Informal → Formal:**\n1. "hey prof, gonna be late to class tmrw, sry"\n2. "tbh the presentation was kinda boring lol"\n3. "can u send me the hw pls??"\n\n**Formal → Informal (appropriate for texting a friend):**\n4. "I would like to inform you that I will be arriving at approximately 3:00 PM."\n5. "Thank you for your assistance with the project. I truly appreciate your support."\n6. "I regret to inform you that I will be unable to attend the event on Saturday."',
            },
            {
              type: 'practice',
              activity: 'Evaluate Online Communication',
              prompt: 'Read each social media post and evaluate it. Is it responsible? Is it kind? Is it true? What would you change?\n\n1. "Just heard that the school is closing next week!!! Share before they delete this!!!" (No source given)\n2. "Shoutout to @MrsJohnson for being the best teacher ever! She always makes class interesting. #grateful"\n3. "Some people in this school are SO STUPID. I can\'t even. 🙄"\n4. "New study says chocolate is healthier than vegetables! Link: [suspicious website]"\n\nFor each post, explain: Is this responsible? Would you share it? What would you say to the person who posted it?',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **300-400 word essay** on this topic: "Should social media have stricter rules about what people can post?" Take a clear position and support it with at least three arguments. Use formal academic English (not social media language). Include a consideration of Philippians 4:8 or Ephesians 4:29 in your argument.',
            },
            {
              type: 'practice',
              prompt: 'Create a "Digital Communication Guide" for French-speaking students learning English. In 150 words, explain: (1) The most important English abbreviations to know, (2) The differences between French and English online conventions, and (3) When to use informal vs. formal English online.',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Social Media and Digital Communication',
        estimatedMinutes: 55,
        objectives: [
          'Understand common English abbreviations and conventions used online.',
          'Know when to use informal language and when to use formal English.',
          'Discuss responsible online communication.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Do you text differently than you write an essay? Why do we use different language online than in formal writing?',
              connection: 'Today you will learn about English online communication — abbreviations, social media language, and when it is okay to be informal versus when you need to be formal.',
            },
            {
              type: 'text',
              heading: 'Online English',
              body: 'English on the internet has its own style:\n\n**Common abbreviations:**\n- LOL = laughing out loud\n- BTW = by the way\n- TBH = to be honest\n- IMO = in my opinion\n- DM = direct message\n- FYI = for your information\n\n**Social media words:**\n- **Hashtag (#):** tags a topic — #education\n- **Caption:** text under a photo\n- **Going viral:** spreading to millions of people\n- **Thread:** a series of connected posts\n\n**Tone online:**\n- ALL CAPS = shouting (DON\'T DO THIS in emails!)\n- A period at the end of a short text can sound cold: "Ok." sounds annoyed\n- Emojis help show tone in casual messages\n\n**French vs English online:**\n- French "mdr" = English "LOL"\n- French "stp" = English "pls"\n- French "cc" (coucou) = English "hey"',
            },
            {
              type: 'text',
              heading: 'Being Responsible Online',
              body: 'Everything you post online can last forever. Before posting, ask yourself:\n\n1. **Is it true?** Do not share information you have not verified.\n2. **Is it kind?** Would you say this to the person\'s face?\n3. **Is it necessary?** Does this help or hurt?\n4. **Who might see it?** Your post might reach people you never intended — including future employers.\n\nThe biggest skill is **register switching** — knowing when to be casual (texting friends) and when to be formal (emailing a teacher).',
            },
            {
              type: 'biblical-worldview',
              theme: 'Words That Build Up',
              scriptureRef: 'Ephesians 4:29',
              reflection: 'The Bible says, "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up" (Ephesians 4:29). This applies to our online words too. What we post, share, and comment on reflects our character.',
              applicationQuestion: 'How can you use social media to encourage others rather than tear them down?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are some differences between French and English online abbreviations?',
                'When is it okay to use informal language, and when should you switch to formal English?',
              ],
            },
            {
              type: 'practice',
              activity: 'Formal or Informal?',
              prompt: 'Decide if each message is appropriate for its context. If not, rewrite it:\n\n1. Text to a friend: "Dear Friend, I would like to formally invite you to lunch at noon."\n2. Email to a teacher: "hey can u give me my grade pls thx"\n3. Social media post: "Excited to start my new project! #learning"\n4. Job application email: "yo I want this job lol"\n\nRewrite messages 1, 2, and 4 in the appropriate register.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **200-300 words** about responsible social media use. Include:\n- Why it is important to think before you post\n- The difference between online language and formal English\n- A reference to Ephesians 4:29 and what it means for our online behavior',
            },
            {
              type: 'practice',
              prompt: 'Create a list of 8 English online abbreviations with their meanings and an example of when you might use each one.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Social Media and Digital Communication',
        estimatedMinutes: 40,
        objectives: [
          'Learn common English abbreviations used online.',
          'Understand why online language is different from formal English.',
          'Think about being responsible on social media.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Do you know what "LOL" and "BTW" mean? English online has its own special language!',
              connection: 'Today you will learn common English abbreviations used online and think about how to use social media wisely.',
            },
            {
              type: 'text',
              heading: 'English Online',
              body: '**Common online abbreviations:**\n- **LOL** = laughing out loud\n- **BTW** = by the way\n- **OMG** = oh my goodness\n- **FYI** = for your information\n- **DM** = direct message\n- **TBH** = to be honest\n\n**Social media words:**\n- **Hashtag (#)** = a tag for a topic\n- **Caption** = words under a photo\n- **Going viral** = spreading to many people\n\n**Important:** Online language is INFORMAL. Do not use it in:\n- Emails to teachers\n- Job applications\n- School assignments\n\n**Online vs. French:**\nFrench "mdr" = English "LOL"\nFrench "stp" = English "pls"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Kind Words Online',
              scriptureRef: 'Ephesians 4:29',
              reflection: 'God cares about what we say online too. "Only say what is helpful for building others up" (Ephesians 4:29). Be kind in your posts and messages.',
              applicationQuestion: 'How can you be kind online today?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which English abbreviation was new to you?',
                'Why should you NOT use LOL and BTW in a school essay?',
              ],
            },
            {
              type: 'practice',
              activity: 'Decode the Messages',
              prompt: 'What do these messages mean in regular English?\n\n1. "Hey! BTW the meeting is at 3. FYI the boss wants us all there."\n2. "OMG I just saw the news! TBH I\'m not surprised."\n3. "DM me if you want to talk about the project."\n\nNow rewrite message 1 as a formal email to your boss.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **150-200 words** about being responsible on social media. Answer these questions:\n- Why should you think before you post?\n- What is the difference between online language and formal English?\n- How does Ephesians 4:29 apply to social media?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'abbreviation', definition: 'A shortened form of a word or phrase, commonly used in texting and social media.', example: '"LOL" is an abbreviation for "laughing out loud."' },
      { term: 'digital literacy', definition: 'The ability to use technology effectively and evaluate online information critically.', example: 'Digital literacy includes knowing how to spot fake news online.' },
      { term: 'caption', definition: 'The text that accompanies a photo or video on social media.', example: 'She wrote a thoughtful caption under her graduation photo.' },
      { term: 'going viral', definition: 'When online content spreads rapidly to a very large number of people.', example: 'The video of the singing dog went viral and was seen by millions.' },
      { term: 'cyberbullying', definition: 'Using digital communication to intimidate, threaten, or harass someone.', example: 'Cyberbullying can be just as harmful as bullying in person.' },
      { term: 'misinformation', definition: 'False or inaccurate information that is spread, sometimes unintentionally.', example: 'Checking multiple sources helps you avoid spreading misinformation.' },
      { term: 'register', definition: 'The level of formality in language, ranging from casual to formal.', example: 'Texting a friend uses an informal register, while emailing a professor uses a formal register.' },
      { term: 'hashtag', definition: 'A word or phrase preceded by # used on social media to tag a topic.', example: 'The charity used the hashtag #CleanWaterForAll to promote their campaign.' },
    ],
    quiz: [
      { question: 'What does "LOL" stand for?', options: ['Lots of love', 'Laughing out loud', 'Look out loud', 'Love our life'], correctAnswer: 1, explanation: 'LOL stands for "laughing out loud." Note: some people mistakenly think it means "lots of love," which can cause confusion!' },
      { question: 'What does it mean when content "goes viral"?', options: ['It contains a computer virus', 'It spreads rapidly to millions of people', 'It is deleted from the internet', 'It is only seen by friends'], correctAnswer: 1, explanation: 'When content goes viral, it is shared rapidly and reaches a very large audience.' },
      { question: 'When should you NOT use online abbreviations like LOL and BTW?', options: ['In texts to friends', 'In social media posts', 'In formal emails and job applications', 'In online chats'], correctAnswer: 2, explanation: 'Online abbreviations are informal and should not be used in formal contexts like emails to teachers, job applications, or academic writing.' },
      { question: 'What is "cyberbullying"?', options: ['A type of computer game', 'Using technology to harass or intimidate someone', 'Sending too many messages', 'Posting photos online'], correctAnswer: 1, explanation: 'Cyberbullying is using digital communication to intentionally hurt, threaten, or harass someone.' },
      { question: 'What does "misinformation" mean?', options: ['Missing information', 'False or inaccurate information that is spread', 'Private information', 'Information about missions'], correctAnswer: 1, explanation: 'Misinformation is false or inaccurate information. It may be spread unintentionally, unlike "disinformation" which is spread deliberately.' },
      { question: 'In English texting, typing in ALL CAPS means:', options: ['You are being formal', 'You are whispering', 'You are shouting or being aggressive', 'Your keyboard is broken'], correctAnswer: 2, explanation: 'In online communication, ALL CAPS is interpreted as SHOUTING and can come across as aggressive or rude.' },
      { question: 'What is the French equivalent of "LOL"?', options: ['MDR (mort de rire)', 'STP (s\'il te plaît)', 'CC (coucou)', 'PK (pourquoi)'], correctAnswer: 0, explanation: 'French speakers use "MDR" (mort de rire, meaning "dying of laughter") in the same way English speakers use "LOL."' },
      { question: 'What is a "hashtag"?', options: ['A type of password', 'A word preceded by # used to tag a topic on social media', 'A special type of email', 'A phone number'], correctAnswer: 1, explanation: 'A hashtag (#) is used on social media platforms to categorize content and make it discoverable by topic.' },
      { question: 'What should you ask yourself before sharing news on social media?', options: ['Is it entertaining enough to get likes?', 'Is it from a verified, reliable source?', 'Does it have a good headline?', 'Is it about a celebrity?'], correctAnswer: 1, explanation: 'Before sharing news, verify the source. Sharing unverified information contributes to the spread of misinformation.' },
      { question: 'According to Ephesians 4:29, our words (including online) should:', options: ['Be clever and witty', 'Be helpful for building others up', 'Always be funny', 'Show how smart we are'], correctAnswer: 1, explanation: 'Ephesians 4:29 tells us to use words that are "helpful for building others up" — this applies to everything we post and comment online.' },
    ],
  },

  // ── W3: Formal vs Informal Register (INSTRUCTION) ──────────────────────────
  {
    weekNumber: 3,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Formal vs Informal Register',
        estimatedMinutes: 70,
        objectives: [
          'Identify the features of formal, semi-formal, and informal registers in English.',
          'Switch fluently between registers depending on audience and context.',
          'Compare formality conventions in French and English, identifying key differences.',
          'Apply register awareness to written and spoken English across professional and social contexts.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Would you speak to the president of a country the same way you speak to your best friend? Of course not. But what exactly changes — the words? The grammar? The tone? All three?',
              connection: 'Register — the level of formality in language — is one of the most important skills in communication. Getting it wrong can make you sound rude, pretentious, or out of place. In this lesson, you will master the art of switching between formal, semi-formal, and informal English.',
            },
            {
              type: 'text',
              heading: 'Understanding Register in English',
              body: 'Register is the level of formality you use in your language. English has three main registers:\n\n**Formal Register:**\nUsed in: academic writing, business correspondence, official documents, speeches.\nFeatures:\n- No contractions (write "do not" instead of "don\'t")\n- Complex sentence structures\n- Passive voice common ("The decision was made" rather than "We decided")\n- Precise vocabulary ("assist" instead of "help," "inquire" instead of "ask")\n- No slang, no abbreviations, no emojis\n\nExample: "I am writing to inquire about the availability of the conference room on Thursday afternoon."\n\n**Semi-formal Register:**\nUsed in: workplace emails to colleagues, classroom discussions, professional conversations.\nFeatures:\n- Some contractions acceptable ("I\'m," "we\'ll")\n- Clear, direct sentences\n- Professional but friendly tone\n- No slang, but everyday vocabulary is fine\n\nExample: "Hi Sarah, I\'m checking to see if the conference room is free on Thursday. Let me know!"\n\n**Informal Register:**\nUsed in: texting friends, casual conversations, social media.\nFeatures:\n- Contractions normal\n- Simple, short sentences\n- Slang and abbreviations acceptable\n- Emojis and exclamation marks\n- Sentence fragments okay\n\nExample: "Hey! Is the room free Thursday? Lmk!"',
            },
            {
              type: 'text',
              heading: 'French vs English Formality: Key Differences',
              body: 'French and English handle formality differently in several important ways:\n\n**1. Tu/Vous vs. "You":**\nFrench has two words for "you" — *tu* (informal) and *vous* (formal). English has only "you." This means English speakers show formality through OTHER means: vocabulary choice, sentence structure, and tone — not pronouns.\n\n**2. Formality Level in Business:**\nFrench business communication tends to be MORE formal than English. The elaborate French closing formulas ("Veuillez agréer l\'expression de mes sentiments distingués") have no English equivalent. English business language is generally more direct and less ceremonious.\n\n**3. Academic Writing:**\nFrench academic writing often values elegant, complex prose. English academic writing values CLARITY above all. A simple, clear sentence is better than a complex, impressive-sounding one.\n\n**4. Titles and Address:**\nFrench uses "Monsieur/Madame" frequently in formal settings. English uses "Mr./Mrs./Ms." mainly in initial greetings and letters. Once a relationship is established, first names are common — even in some workplaces. This does NOT mean disrespect; it is cultural.\n\n**5. The Conditional for Politeness:**\nBoth languages use conditional forms for politeness, but differently:\n- French: "Je voudrais..." (I would like)\n- English: "Could you..." "Would you mind..." "I was wondering if..."\n\nThe English conditional questions ("Could you possibly help me?") are often MORE polite than direct statements ("I would like help").',
            },
            {
              type: 'biblical-worldview',
              theme: 'Speaking Wisely to Every Audience',
              scriptureRef: 'Colossians 4:6; 1 Corinthians 9:22',
              reflection: 'Paul wrote, "I have become all things to all people so that by all possible means I might save some" (1 Corinthians 9:22). Paul adapted his communication style to his audience — speaking one way to Jews, another way to Greeks, another way to Roman officials. This is not being fake; it is being wise. Register switching is a form of wisdom: speaking in a way that your audience can best receive your message.',
              applicationQuestion: 'How does Paul\'s example of adapting to his audience connect to the skill of register switching? When might a Christian need to adjust their communication style without compromising their message?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'French uses tu/vous to mark formality, but English has only "you." What other tools does English use to show respect and formality? Give specific examples.',
                'Why do you think English business communication is generally less formal than French? Is one approach better, or are they just culturally different?',
                'Read 1 Corinthians 9:22. Paul adapted to his audience. How is register switching similar to what Paul describes? Can you adapt your language without being dishonest?',
              ],
            },
            {
              type: 'practice',
              activity: 'Triple Register Translation',
              prompt: 'Rewrite each message in all three registers: formal, semi-formal, and informal.\n\n1. You want to ask your boss for a day off.\n   - Formal: _____\n   - Semi-formal: _____\n   - Informal (texting a friend about it): _____\n\n2. You are disappointed that an event was cancelled.\n   - Formal (letter to the organizer): _____\n   - Semi-formal (email to a colleague): _____\n   - Informal (text to a friend): _____\n\n3. You want someone to help you move to a new apartment.\n   - Formal (posting on a community board): _____\n   - Semi-formal (emailing a coworker): _____\n   - Informal (texting your best friend): _____',
            },
            {
              type: 'practice',
              activity: 'French-to-English Register Adjustment',
              prompt: 'Each sentence below is a direct translation from French that sounds wrong in English. Rewrite it in natural English at the appropriate register level.\n\n1. "I have the honor of soliciting your benevolence regarding my request for employment." (Too formal even for English formal register)\n2. "It makes nothing." (Il ne fait rien — attempting informal register)\n3. "I demand you to pass me the salt." (Je vous demande — false cognate + register mismatch)\n4. "How do you call yourself?" (Comment tu t\'appelles — direct translation)\n\nFor each correction, explain what went wrong and what register the corrected version belongs to.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write the **same message** in three versions (300-400 words total across all three):\n\nScenario: You visited a restaurant and had a terrible experience — cold food, rude service, and a long wait. Now you want to communicate about it.\n\n1. **Formal:** A complaint letter to the restaurant manager.\n2. **Semi-formal:** An email to a friend who recommended the restaurant.\n3. **Informal:** A text to your best friend about what happened.\n\nMake the content similar, but adjust vocabulary, tone, sentence structure, and formality for each version.',
            },
            {
              type: 'practice',
              prompt: 'Write a **150-word comparison** of formality in French and English. What is the biggest difference that French speakers should know about when communicating in English? Give at least two specific examples.',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Formal vs Informal Register',
        estimatedMinutes: 55,
        objectives: [
          'Identify formal and informal language features in English.',
          'Choose the right register for different situations.',
          'Understand key differences between French and English formality.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Would you speak to your teacher the same way you speak to your best friend? What changes?',
              connection: 'Today you will learn about register — the level of formality in your language. Choosing the right register is one of the most important communication skills you can develop.',
            },
            {
              type: 'text',
              heading: 'What Is Register?',
              body: '**Register** is how formal or informal your language is. English has three main levels:\n\n**Formal** (for school papers, job applications, official letters):\n- No contractions: "I am" not "I\'m"\n- Professional words: "inquire" instead of "ask"\n- No slang or emojis\n- Example: "I am writing to request information about the program."\n\n**Semi-formal** (for emails to colleagues, classroom talk):\n- Some contractions okay: "I\'m," "we\'ll"\n- Friendly but professional\n- Example: "Hi Mr. Lee, I\'m wondering if you could send me the schedule."\n\n**Informal** (for texting friends, casual conversation):\n- Contractions, slang, abbreviations are fine\n- Short sentences and fragments\n- Example: "Hey can u send me the schedule? Thx!"',
            },
            {
              type: 'text',
              heading: 'French vs English Formality',
              body: '**Key differences to know:**\n\n1. French has tu/vous. English only has "you." So English shows formality through WORD CHOICE and TONE, not pronouns.\n\n2. French business letters are VERY formal. English business letters are direct and simpler. Do not translate "Veuillez agréer..." — just write "Kind regards."\n\n3. In English workplaces, first names are often used even with bosses. This is normal and respectful — it is not rude.\n\n4. Both languages use polite forms:\n   - French: "Je voudrais..." (I would like)\n   - English: "Could you..." or "Would you mind..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Adapting to Your Audience',
              scriptureRef: '1 Corinthians 9:22',
              reflection: 'Paul said, "I have become all things to all people so that by all possible means I might save some" (1 Corinthians 9:22). He adapted his communication to his audience. Register switching is a form of wisdom — speaking in a way others can best understand.',
              applicationQuestion: 'When might you need to adjust how you speak without changing what you believe?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What happens if you use informal language in a formal situation? Or formal language in a casual situation?',
                'What is the biggest difference between French and English formality that surprised you?',
              ],
            },
            {
              type: 'practice',
              activity: 'Register Match',
              prompt: 'Match each sentence to its register (formal, semi-formal, or informal). Then rewrite the informal ones in formal English and the formal ones in informal English.\n\n1. "I am writing to express my concern regarding the recent changes to the policy."\n2. "Hey! Did u hear about the new rule? So annoying lol"\n3. "Hi team, just a quick reminder that reports are due by Friday."\n4. "I respectfully request an extension on the deadline for the assignment."\n5. "yo the deadline is Friday, right?"',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write the **same message** in two versions (200-300 words total):\n\nScenario: Your school canceled a field trip and you are disappointed.\n\n1. **Formal:** A letter to the principal asking why it was canceled.\n2. **Informal:** A text to your friend about your disappointment.\n\nMake sure the vocabulary, tone, and structure match each register.',
            },
            {
              type: 'practice',
              prompt: 'Write 3-4 sentences explaining why register switching is an important skill. Use an example from this lesson.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Formal vs Informal Register',
        estimatedMinutes: 40,
        objectives: [
          'Know the difference between formal and informal English.',
          'Choose the right language style for different situations.',
          'Write simple formal and informal messages.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Do you talk to your teacher the same way you talk to your friends? What is different?',
              connection: 'Today you will learn when to use formal English (for school and work) and when informal English (for friends) is okay.',
            },
            {
              type: 'text',
              heading: 'Formal and Informal English',
              body: '**Formal English** is for school, work, and official situations:\n- Say "I am" not "I\'m"\n- Say "I would like" not "I wanna"\n- No slang, no abbreviations\n- Example: "Dear Mrs. Brown, I am writing to ask about the homework."\n\n**Informal English** is for friends and family:\n- Contractions are fine: "I\'m," "don\'t," "can\'t"\n- Abbreviations okay: "btw," "lol"\n- Example: "Hey! Did u do the hw?"\n\n**When to use which:**\n- Email to teacher → FORMAL\n- Text to friend → INFORMAL\n- Job interview → FORMAL\n- Chat with classmate → INFORMAL',
            },
            {
              type: 'biblical-worldview',
              theme: 'Wise Communication',
              scriptureRef: 'Colossians 4:6',
              reflection: 'The Bible says to let our speech be "gracious, seasoned with salt" (Colossians 4:6). This means choosing our words wisely — and that includes choosing the right style for each situation.',
              applicationQuestion: 'When do you need to be extra careful about how you speak or write?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What could go wrong if you text your teacher like you text your friend?',
                'Can you think of a time when someone spoke too formally or too informally for the situation?',
              ],
            },
            {
              type: 'practice',
              activity: 'Formal or Informal?',
              prompt: 'Label each message as FORMAL or INFORMAL:\n\n1. "Dear Sir, I am writing to request information."\n2. "hey what\'s up?"\n3. "I would like to schedule a meeting."\n4. "lol that\'s so funny"\n5. "Thank you for your assistance."\n\nNow rewrite #2 in formal English and #5 in informal English.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **two short messages** (150-200 words total):\n\n1. **Formal:** Write to your teacher asking for help with an assignment.\n2. **Informal:** Text a friend asking if they want to study together.\n\nMake sure each message uses the right style!',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'register', definition: 'The level of formality in language, determined by the audience and situation.', example: 'She switched from an informal register with friends to a formal register in her essay.' },
      { term: 'contraction', definition: 'A shortened form of a word or words, using an apostrophe (I\'m, don\'t, we\'ll).', example: 'Contractions like "don\'t" are acceptable in informal English but should be avoided in formal writing.' },
      { term: 'formal', definition: 'A style of language that is professional, polished, and follows strict conventions.', example: 'Formal language is used in academic papers, business letters, and official speeches.' },
      { term: 'informal', definition: 'A casual style of language used with friends, family, and in relaxed settings.', example: 'Informal language includes contractions, slang, and abbreviations.' },
      { term: 'semi-formal', definition: 'A middle level of formality — professional but friendly, used in everyday workplace communication.', example: 'Semi-formal language is perfect for emails to colleagues you know well.' },
      { term: 'tu/vous distinction', definition: 'The French system of using "tu" for informal address and "vous" for formal address, which English does not have.', example: 'Since English has no tu/vous distinction, formality is shown through vocabulary and tone instead.' },
      { term: 'polite conditional', definition: 'Using conditional forms (could, would, might) to make requests more polite.', example: '"Could you help me?" is more polite than "Help me."' },
      { term: 'register switching', definition: 'The ability to change your level of formality depending on the audience and situation.', example: 'Good communicators practice register switching — formal at work, informal with friends.' },
    ],
    quiz: [
      { question: 'What is "register" in language?', options: ['A machine for counting money', 'The level of formality in language', 'A type of grammar rule', 'A way of signing your name'], correctAnswer: 1, explanation: 'Register refers to the level of formality in language, which changes based on the audience and context.' },
      { question: 'Which feature belongs to FORMAL English?', options: ['Contractions like "don\'t"', 'Slang and abbreviations', 'No contractions, precise vocabulary', 'Emojis and exclamation marks'], correctAnswer: 2, explanation: 'Formal English avoids contractions, slang, and abbreviations, using precise vocabulary and complete sentences instead.' },
      { question: 'How does English show formality without tu/vous?', options: ['By speaking louder', 'Through vocabulary choice, tone, and sentence structure', 'By using different pronouns', 'By writing in cursive'], correctAnswer: 1, explanation: 'Since English has only "you," formality is conveyed through word choice, tone, and how sentences are structured.' },
      { question: 'Which greeting is SEMI-FORMAL?', options: ['Dear Sir or Madam,', 'Hello Sarah,', 'Yo!', 'To Whom It May Concern,'], correctAnswer: 1, explanation: '"Hello Sarah," strikes a balance between formal (Dear Sir) and informal (Yo!) — it is professional but friendly.' },
      { question: 'What should you write instead of translating "Veuillez agréer..." into English?', options: ['Please accept my distinguished sentiments', 'Kind regards / Sincerely', 'I have the honor to greet you', 'With deepest respect'], correctAnswer: 1, explanation: 'The elaborate French closing formula has no English equivalent. Simply write "Kind regards" or "Sincerely."' },
      { question: 'In English workplaces, using first names with your boss is:', options: ['Always rude', 'Often normal and acceptable', 'Only for close friends', 'A sign of disrespect'], correctAnswer: 1, explanation: 'In many English-speaking workplaces, first names are used even with managers. This is cultural, not disrespectful.' },
      { question: 'Which is a "polite conditional" request?', options: ['"Give me the file."', '"I want the file."', '"Could you please send me the file?"', '"File. Now."'], correctAnswer: 2, explanation: '"Could you please send me the file?" uses the conditional form "could" to make the request polite and professional.' },
      { question: 'What is "register switching"?', options: ['Changing the channel on TV', 'Adapting your formality level for different situations', 'Translating from French to English', 'Speaking in a different accent'], correctAnswer: 1, explanation: 'Register switching is the skill of adjusting your formality level depending on who you are speaking to and the context.' },
      { question: 'Which sentence is appropriate for a formal letter?', options: ['Hey, just wondering about the meeting.', 'I am writing to inquire about the upcoming meeting.', 'So like, when\'s the meeting?', 'Wanna know about the meeting lol'], correctAnswer: 1, explanation: '"I am writing to inquire about the upcoming meeting" uses formal vocabulary, no contractions, and proper structure.' },
      { question: 'Paul says in 1 Corinthians 9:22 that he "became all things to all people." How does this relate to register?', options: ['It means you should lie to fit in', 'It means adapting your communication style to connect with your audience', 'It means always being formal', 'It means only speaking to people like you'], correctAnswer: 1, explanation: 'Paul adapted his communication style to different audiences, which parallels the wisdom of register switching — adjusting how you speak without compromising your message.' },
    ],
  },

  // ── W4: News Report Project (PROJECT) ──────────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'News Report Project',
        estimatedMinutes: 70,
        objectives: [
          'Write and present a news report using professional journalistic conventions.',
          'Apply the inverted pyramid structure and use appropriate news vocabulary.',
          'Maintain formal register throughout the report while keeping language clear and accessible.',
          'Demonstrate discernment in selecting and presenting information responsibly.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you were a journalist reporting on a story that mattered to you, what would you report on? How would you make sure your report was fair, accurate, and compelling?',
              connection: 'This project brings together everything you have learned about news writing, digital communication, and register. You will write and present a news report that demonstrates your ability to communicate information clearly and professionally in English.',
            },
            {
              type: 'text',
              heading: 'Your News Report Project',
              body: 'For this project, you will write a complete news report and present it as if you were a television or radio journalist.\n\nYour report should include:\n\n1. **A compelling headline** that captures the story accurately.\n2. **A strong lead paragraph** answering Who, What, When, Where, Why, and How.\n3. **A detailed body** with supporting facts, background information, and at least two quotes from sources (these can be imagined but must be realistic).\n4. **A conclusion** that wraps up the story or looks ahead.\n5. **A broadcast script** — a version written as if you were reading it on camera (slightly different from written news — shorter sentences, more conversational but still formal).\n\nYou may choose a real current event, a local community event, or an imagined but realistic news story.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Truthful Reporting',
              scriptureRef: 'Philippians 4:8; Proverbs 12:17',
              reflection: 'Proverbs 12:17 says, "An honest witness tells the truth, but a false witness tells lies." Journalism carries a sacred responsibility: reporting the truth accurately and fairly. Whether you become a journalist or simply a citizen who shares information, commit to being an "honest witness" — reporting what is true, not what is sensational.',
              applicationQuestion: 'What responsibility does a reporter have to present information fairly? How does this connect to the Christian value of truthfulness?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What story will you report on? Why is it important or interesting?',
                'What sources would a journalist consult for your story? Who would they interview?',
                'How will you ensure your report is factual and fair, not biased toward one perspective?',
              ],
            },
            {
              type: 'practice',
              activity: 'Report Planning',
              prompt: 'Answer these planning questions before you begin:\n\n1. What is your story about? (One sentence summary)\n2. Who are your sources? (At least 2 people you would interview)\n3. What are the key facts?\n4. What background does the reader need?\n5. What is your headline?\n6. Write your lead paragraph (answering Who, What, When, Where, Why).',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'News Report Project',
              summary: 'Write and present a complete news report with headline, lead, body, quotes, and broadcast script.',
              description: '**Part 1: Written News Report (350-450 words)**\n- Headline\n- Lead paragraph (Who, What, When, Where, Why, How)\n- Body with facts, background, and at least 2 quotes from sources\n- Concluding paragraph\n- Formal register throughout; factual, not opinion-based\n\n**Part 2: Broadcast Script (150-200 words)**\nAdapt your report for television/radio. Shorter sentences, slightly more conversational, but still professional. Begin with: "Good evening. I am [your name] reporting from [location]."\n\n**Part 3: Reflection (75-100 words)**\nReflect on how Philippians 4:8 or Proverbs 12:17 guided your approach to reporting. How did you ensure your report was truthful and fair?\n\n**Requirements:**\n- Inverted pyramid structure\n- Formal register (no contractions in written version)\n- News vocabulary used correctly (headline, source, lead, quote)\n- No opinions presented as facts',
              deliverable: 'written-report',
              estimatedHours: 3,
              rubric: [
                { dimension: 'News Structure and Content', maxPoints: 30, descriptors: { exemplary: 'Perfect inverted pyramid structure. Strong lead with all key questions answered. Detailed body with quotes and background.', proficient: 'Good structure with most key elements present. Lead answers main questions.', developing: 'Structure is unclear or does not follow inverted pyramid. Lead is weak or missing.' } },
                { dimension: 'Language and Register', maxPoints: 25, descriptors: { exemplary: 'Consistent formal register. Precise news vocabulary. No grammar errors or false cognates.', proficient: 'Mostly formal register with minor slips. Good vocabulary use.', developing: 'Register is inconsistent. Informal language or false cognates present.' } },
                { dimension: 'Broadcast Script', maxPoints: 25, descriptors: { exemplary: 'Natural broadcast style — professional but conversational. Appropriate length and pacing.', proficient: 'Adequate broadcast adaptation with mostly appropriate style.', developing: 'Script reads like written text, not broadcast language.' } },
                { dimension: 'Truthfulness and Reflection', maxPoints: 20, descriptors: { exemplary: 'Report is factual and fair. Reflection shows genuine engagement with biblical principles of truth-telling.', proficient: 'Report is factual. Reflection connects to biblical principles.', developing: 'Report contains opinions as facts. Reflection is superficial.' } },
              ],
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'News Report Project',
        estimatedMinutes: 55,
        objectives: [
          'Write a news report with a headline, lead, and body.',
          'Use the inverted pyramid structure and include quotes.',
          'Maintain formal register in journalistic writing.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could be a journalist for a day, what story would you want to report on?',
              connection: 'In this project, you will write a news report as if you were a real journalist. You will use everything you learned about news structure, register, and digital communication.',
            },
            {
              type: 'text',
              heading: 'Your News Report',
              body: 'Write a news report about a real or imagined event. Your report needs:\n\n1. **A headline** — short and clear\n2. **A lead** — the first paragraph answering Who, What, When, Where\n3. **A body** — more details, background, and at least one quote\n4. **Formal language** — no slang, no contractions\n\nPick a story that interests you: a school event, a community project, a local issue, or an imagined event.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honest Reporting',
              scriptureRef: 'Proverbs 12:17',
              reflection: 'Proverbs 12:17 says, "An honest witness tells the truth." Good journalism means reporting facts, not making things up or exaggerating. As Christians, we are called to be truthful in everything we communicate.',
              applicationQuestion: 'How can you make sure your news report is fair and truthful?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What story will you write about? What are the key facts?',
                'Who would you interview for your story? What would you ask them?',
              ],
            },
            {
              type: 'practice',
              activity: 'Draft Your Lead',
              prompt: 'Write the headline and lead paragraph for your news report. Make sure the lead answers: Who? What? When? Where? Share with a partner for feedback.',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'News Report Project',
              summary: 'Write a complete news report with headline, lead, body, and quotes.',
              description: '**Write a news report (250-350 words)** about a real or imagined event:\n- Headline\n- Lead paragraph (Who, What, When, Where)\n- Body with details and at least one quote\n- Formal register throughout\n- Inverted pyramid: most important information first\n\n**Then write 3-4 sentences** reflecting on how you made sure your report was truthful and fair.',
              deliverable: 'written-report',
              estimatedHours: 2,
              rubric: [
                { dimension: 'Structure', maxPoints: 30, descriptors: { exemplary: 'Clear inverted pyramid with strong lead answering key questions.', proficient: 'Good structure with most elements present.', developing: 'Structure unclear or lead is weak.' } },
                { dimension: 'Content and Quotes', maxPoints: 30, descriptors: { exemplary: 'Detailed body with relevant background and realistic quotes.', proficient: 'Adequate details with at least one quote.', developing: 'Lacks detail or missing quotes.' } },
                { dimension: 'Language and Register', maxPoints: 30, descriptors: { exemplary: 'Consistent formal register. Correct news vocabulary.', proficient: 'Mostly formal with minor slips.', developing: 'Informal language present. Vocabulary errors.' } },
                { dimension: 'Reflection', maxPoints: 10, descriptors: { exemplary: 'Thoughtful reflection on truthfulness.', proficient: 'Basic reflection present.', developing: 'Reflection is missing or superficial.' } },
              ],
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'News Report Project',
        estimatedMinutes: 40,
        objectives: [
          'Write a simple news report with a headline and lead.',
          'Answer Who, What, When, Where in the first paragraph.',
          'Use formal language in the report.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could tell the world about something that happened in your community, what would it be?',
              connection: 'In this project, you will write a short news report about something that happened (or could happen) in your community.',
            },
            {
              type: 'text',
              heading: 'Your News Report',
              body: 'Write a short news report. Include:\n\n1. **Headline** — a short title for your story\n2. **Lead** — the first paragraph that answers: Who? What? When? Where?\n3. **Details** — 2-3 more sentences with extra information\n4. **A quote** — what someone said about the event\n\nUse formal language: "I am" not "I\'m," "do not" not "don\'t."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Telling the Truth',
              scriptureRef: 'Proverbs 12:17',
              reflection: 'Good journalists tell the truth. God wants us to be honest in everything we say and write.',
              applicationQuestion: 'Why is it important to be honest when reporting news?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What event will you write about?',
                'Who is the story about? What happened?',
              ],
            },
            {
              type: 'practice',
              activity: 'Write Your Headline and Lead',
              prompt: 'Write a headline (5-8 words) and a lead paragraph (2-3 sentences) for your news report. Make sure the lead answers Who, What, When, and Where.',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'News Report Project',
              summary: 'Write a short news report with headline, lead, and details.',
              description: 'Write a **150-200 word news report** about an event:\n- Headline\n- Lead paragraph (Who, What, When, Where)\n- 2-3 sentences with extra details\n- One quote from someone involved\n- Formal language throughout',
              deliverable: 'written-report',
              estimatedHours: 1.5,
              rubric: [
                { dimension: 'Headline and Lead', maxPoints: 40, descriptors: { exemplary: 'Clear headline and lead that answers key questions.', proficient: 'Headline and lead present with most questions answered.', developing: 'Headline or lead is missing or unclear.' } },
                { dimension: 'Content', maxPoints: 30, descriptors: { exemplary: 'Good details and a realistic quote included.', proficient: 'Some details present. Quote attempted.', developing: 'Lacks detail. No quote.' } },
                { dimension: 'Language', maxPoints: 30, descriptors: { exemplary: 'Formal register maintained throughout.', proficient: 'Mostly formal with minor slips.', developing: 'Informal language used.' } },
              ],
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'broadcast', definition: 'A program or report transmitted by television or radio.', example: 'The evening broadcast included a report on the new school being built.' },
      { term: 'journalist', definition: 'A person who writes news articles or reports for media outlets.', example: 'The journalist interviewed the mayor about the city\'s new education plan.' },
      { term: 'inverted pyramid', definition: 'A news writing structure where the most important information comes first.', example: 'Using the inverted pyramid, the reporter put the key facts in the first sentence.' },
      { term: 'reporting', definition: 'The process of researching and communicating news events.', example: 'Accurate reporting requires checking facts with multiple sources.' },
      { term: 'newsworthiness', definition: 'The quality that makes an event interesting or important enough to report as news.', example: 'The teacher asked students to evaluate the newsworthiness of different local events.' },
    ],
    quiz: [],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 6: NATURE AND ENVIRONMENT (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit6Lessons: EnrichedLesson[] = [
  // ── W1: Weather, Climate, and Geography (INSTRUCTION) ─────────────────────
  {
    weekNumber: 1,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Weather, Climate, and Geography',
        estimatedMinutes: 70,
        objectives: [
          'Use extended vocabulary to describe weather phenomena, climate patterns, and geographical features in English.',
          'Construct first conditional sentences (If + present, will + base verb) to discuss cause and effect in nature.',
          'Compare French and English approaches to weather expressions and conditional clauses.',
          'Reflect on the biblical call to stewardship of God\'s creation.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Why do hurricanes form in the Caribbean but not in the Mediterranean? Why does it snow in Canada but rarely in Haiti? The weather is not random — it follows patterns that scientists can study and even predict. How well can you describe these patterns in English?',
              connection: 'In this lesson, you will expand your English vocabulary for weather, climate, and geography. You will also learn to use conditional sentences — "If it rains, the river will flood" — which are essential for discussing cause and effect in nature.',
            },
            {
              type: 'text',
              heading: 'Weather, Climate, and Geography Vocabulary',
              body: 'Understanding the natural world requires precise vocabulary. Let us build yours.\n\n**Weather Vocabulary:**\n- **Drizzle** — very light rain\n- **Downpour** — extremely heavy rain\n- **Thunderstorm** — a storm with thunder and lightning\n- **Hurricane / Typhoon / Cyclone** — the same phenomenon with different names depending on location (hurricane in the Atlantic, typhoon in the Pacific, cyclone in the Indian Ocean)\n- **Drought** — a long period without rain\n- **Flood** — when water covers land that is normally dry\n- **Forecast** — a prediction of future weather\n- **Humidity** — the amount of moisture in the air\n\n**Climate Vocabulary:**\n- **Tropical** — hot and humid year-round (Haiti, Brazil)\n- **Temperate** — moderate temperatures with four seasons (France, eastern USA)\n- **Arid** — very dry, little rainfall (Sahara Desert)\n- **Polar** — extremely cold year-round (Antarctica, Arctic)\n\n**Geography Vocabulary:**\n- **Peninsula** — land surrounded by water on three sides\n- **Archipelago** — a chain of islands\n- **Plateau** — a flat, elevated area of land\n- **Valley** — low land between mountains\n- **Basin** — a large area of land drained by a river\n\n**FRENCH vs. ENGLISH Weather Expressions:**\nFrench and English describe weather differently:\n- French: "Il fait chaud" (It makes hot) → English: "It **is** hot" (uses "is," not "makes")\n- French: "Il pleut" (It rains) → English: "It **is raining**" (uses progressive tense for current weather)\n- French: "Il y a du vent" (There is wind) → English: "It **is** windy" (uses "it is" + adjective)',
            },
            {
              type: 'text',
              heading: 'First Conditional: If + Present, Will + Base Verb',
              body: 'The **first conditional** is used to talk about real, possible situations in the future. It is essential for discussing cause and effect in nature.\n\n**Structure:** If + present simple, subject + will + base verb.\n\n**Examples:**\n- "If it rains tomorrow, the roads **will** flood."\n- "If the temperature drops below zero, the water **will** freeze."\n- "If deforestation continues, many species **will** become extinct."\n\n**Important for French speakers:**\nIn French, the conditional clause uses the present tense just like English: "Si il pleut, les routes seront inondées." So the structure is similar! However, a key difference:\n\n- English: "If it **rains**..." (present simple — NO will in the if-clause)\n- Common mistake: "If it **will rain**..." ← WRONG!\n\nThe rule is simple: **never use "will" in the if-clause.** "Will" goes in the result clause only.\n\n**More examples for nature:**\n- "If the glacier melts, sea levels will rise."\n- "If we plant more trees, the air quality will improve."\n- "If the drought continues, the harvest will fail."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Stewardship of Creation',
              scriptureRef: 'Psalm 24:1; Genesis 1:28',
              reflection: '"The earth is the Lord\'s, and everything in it" (Psalm 24:1). God created the heavens, the earth, the weather, the seasons, and every ecosystem — and He called it "very good" (Genesis 1:31). In Genesis 1:28, God gave humanity the responsibility to "rule over" creation — not to exploit it, but to care for it as stewards. Understanding weather, climate, and geography helps us appreciate and protect what God has made.',
              applicationQuestion: 'If the earth belongs to God (Psalm 24:1), what responsibility do humans have toward the natural world? How does this change how we think about environmental issues?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Compare how French and English describe weather. Which approach makes more sense to you? Why might languages describe the same phenomenon differently?',
                'Write three first conditional sentences about the environment. Then check: did you accidentally put "will" in the if-clause? This is the most common mistake!',
                'Read Psalm 24:1. If the earth belongs to God, how should that affect how we treat the environment? Does Christian stewardship mean the same thing as modern environmentalism?',
              ],
            },
            {
              type: 'practice',
              activity: 'Weather Description Challenge',
              prompt: 'Describe each of these weather scenarios in 3-4 sentences using precise vocabulary from this lesson. Avoid simple words like "hot" or "rainy" — use specific terms.\n\n1. A tropical storm approaching a Caribbean island\n2. A winter morning in a temperate climate\n3. A drought affecting farmland in a rural area\n4. A flood caused by heavy rain in a valley\n\nThen write one first conditional sentence for each scenario describing a possible consequence.',
            },
            {
              type: 'practice',
              activity: 'Fix the Conditionals',
              prompt: 'Each sentence has an error. Find and fix it.\n\n1. "If it will rain, the match will be cancelled."\n2. "If the temperature drop below zero, the pipes will freeze."\n3. "If we will not reduce pollution, the climate will change."\n4. "If the hurricane hits, the roads will flooding."\n5. "If it is very hot tomorrow, we going to stay inside."\n\nThen write 3 original first conditional sentences about weather or the environment.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **300-400 word description** of the climate and geography of a place you know well (your hometown, your country, or a place you have visited). Include:\n- At least 8 vocabulary words from this lesson\n- At least 3 first conditional sentences about how weather affects daily life\n- A comparison of how this place\'s climate differs from another region\n- A reflection (2-3 sentences) on how Psalm 24:1 applies to caring for this particular place',
            },
            {
              type: 'practice',
              prompt: 'Create a "Weather Vocabulary Guide" comparing French and English weather expressions. List at least 6 French weather expressions and their correct English equivalents, with a note about what mistake a French speaker might make.',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Weather, Climate, and Geography',
        estimatedMinutes: 55,
        objectives: [
          'Use expanded vocabulary to describe weather, climate, and geography.',
          'Form first conditional sentences correctly.',
          'Understand the difference between French and English weather expressions.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Can you describe today\'s weather in detail — not just "hot" or "cold," but with words like "humid," "overcast," or "breezy"?',
              connection: 'In this lesson, you will learn rich vocabulary for weather and geography, and practice using "if" sentences to talk about what could happen in nature.',
            },
            {
              type: 'text',
              heading: 'Weather and Geography Words',
              body: '**Weather:**\n- **Drizzle** — light rain\n- **Downpour** — heavy rain\n- **Thunderstorm** — storm with thunder and lightning\n- **Hurricane** — a powerful tropical storm\n- **Drought** — a long time with no rain\n- **Flood** — when water covers dry land\n- **Humidity** — moisture in the air\n- **Forecast** — a weather prediction\n\n**Climate types:** tropical (hot/humid), temperate (four seasons), arid (very dry), polar (freezing cold)\n\n**Geography:** peninsula, island, valley, plateau, coast, basin\n\n**French vs English:**\n- "Il fait chaud" → "It **is** hot" (NOT "It makes hot")\n- "Il pleut" → "It **is raining**" (use -ing for current weather)\n- "Il y a du vent" → "It **is** windy"',
            },
            {
              type: 'text',
              heading: 'First Conditional: If... will...',
              body: 'Use the **first conditional** to talk about real possibilities:\n\n**Structure:** If + present simple, ... will + verb.\n\nExamples:\n- "If it rains, the river **will** rise."\n- "If the drought continues, the crops **will** die."\n- "If we plant trees, the air **will** be cleaner."\n\n**Important rule:** Do NOT use "will" in the if-clause!\n- WRONG: "If it **will** rain..."\n- RIGHT: "If it **rains**..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Caring for Creation',
              scriptureRef: 'Psalm 24:1',
              reflection: '"The earth is the Lord\'s, and everything in it" (Psalm 24:1). God made the world and trusts us to take care of it. Learning about weather and geography helps us understand and protect His creation.',
              applicationQuestion: 'What is one way you can take care of God\'s creation in your daily life?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the most common weather mistake French speakers make in English?',
                'Write two first conditional sentences about weather. Did you avoid "will" in the if-clause?',
              ],
            },
            {
              type: 'practice',
              activity: 'Weather Description',
              prompt: 'Describe each scene using at least 3 vocabulary words from this lesson:\n\n1. A rainy day in a tropical climate\n2. A cold winter morning\n3. A hot, dry summer day\n\nThen write one first conditional sentence for each.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **200-300 words** describing the weather and geography of your home region. Include:\n- At least 6 vocabulary words from this lesson\n- At least 2 first conditional sentences\n- A comparison with another climate\n- 1-2 sentences connecting Psalm 24:1 to caring for your environment',
            },
            {
              type: 'practice',
              prompt: 'Write 4 French weather expressions and their correct English translations. Explain why direct translation would be wrong.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Weather, Climate, and Geography',
        estimatedMinutes: 40,
        objectives: [
          'Learn key English words for weather and geography.',
          'Use simple "if...will" sentences correctly.',
          'Describe weather in English (not by translating from French).',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How is the weather today? Can you describe it in English using more than just "hot" or "cold"?',
              connection: 'Today you will learn better words for weather in English and practice "if" sentences for talking about what might happen.',
            },
            {
              type: 'text',
              heading: 'Weather Words',
              body: '**Learn these words:**\n- **Sunny** — the sun is shining\n- **Cloudy** — lots of clouds\n- **Rainy** — it is raining\n- **Windy** — lots of wind\n- **Humid** — the air feels wet and sticky\n- **Storm** — heavy rain, wind, thunder\n- **Flood** — water covers the ground\n- **Drought** — no rain for a long time\n\n**Say it right:**\n- "It **is** hot." (NOT "It makes hot" — that is French!)\n- "It **is raining**." (NOT "It rains" for right now)\n\n**If sentences:**\n- "If it rains, we **will** stay inside."\n- "If it is sunny, we **will** go outside."\n- Do NOT say: "If it **will** rain..." ← WRONG!',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Made the World',
              scriptureRef: 'Psalm 24:1',
              reflection: '"The earth is the Lord\'s" (Psalm 24:1). God made the weather, the land, and the sea. We should take care of His beautiful world.',
              applicationQuestion: 'What is one thing you can do to take care of the earth?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the weather like where you live? Describe it in English.',
                'Why do we say "It is hot" in English and not "It makes hot"?',
              ],
            },
            {
              type: 'practice',
              activity: 'Weather and If Sentences',
              prompt: 'Complete each sentence:\n\n1. If it rains, we _____ (stay / will stay / staying) inside.\n2. It _____ (is / makes / has) very hot today.\n3. If the storm comes, the roads _____ (will flood / flooding / floods).\n4. It _____ (rains / is raining / rain) right now.\n\nThen write 2 sentences describing today\'s weather.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **150-200 words** about the weather where you live. Include:\n- At least 4 weather words from this lesson\n- 2 "if" sentences about weather\n- Say "It is..." not "It makes..." (avoid French translation!)',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'drought', definition: 'A long period of time with very little or no rainfall.', example: 'The drought lasted three months and destroyed many crops.' },
      { term: 'flood', definition: 'When water covers land that is normally dry, often caused by heavy rain.', example: 'After the heavy rains, a flood covered the streets of the town.' },
      { term: 'humidity', definition: 'The amount of water vapor (moisture) in the air.', example: 'The humidity in the tropics can make even warm days feel uncomfortable.' },
      { term: 'forecast', definition: 'A prediction of what the weather will be like in the future.', example: 'The weather forecast says it will rain all week.' },
      { term: 'tropical', definition: 'Relating to the hot and humid regions near the equator.', example: 'Haiti has a tropical climate with warm temperatures year-round.' },
      { term: 'temperate', definition: 'Having mild temperatures, usually with four distinct seasons.', example: 'France has a temperate climate with warm summers and cool winters.' },
      { term: 'first conditional', definition: 'A grammar structure (If + present, will + verb) used to describe real possibilities in the future.', example: '"If it rains tomorrow, we will cancel the picnic" is a first conditional sentence.' },
      { term: 'peninsula', definition: 'A piece of land that is almost entirely surrounded by water but connected to the mainland.', example: 'Florida is a peninsula — it has ocean on three sides.' },
    ],
    quiz: [
      { question: 'How do you correctly say "Il fait chaud" in English?', options: ['It makes hot.', 'It does hot.', 'It is hot.', 'It has hot.'], correctAnswer: 2, explanation: 'In English, we say "It IS hot" — not "It makes hot," which is a direct translation from French.' },
      { question: 'Which sentence uses the first conditional correctly?', options: ['If it will rain, we stay inside.', 'If it rains, we will stay inside.', 'If it rained, we will stay inside.', 'If it rains, we staying inside.'], correctAnswer: 1, explanation: 'The first conditional uses: If + present simple, will + base verb. Never use "will" in the if-clause.' },
      { question: 'What is a "drought"?', options: ['A heavy rainstorm', 'A long period with no rain', 'A type of wind', 'A flood'], correctAnswer: 1, explanation: 'A drought is a prolonged period with very little or no rainfall, which can cause crop failure and water shortages.' },
      { question: 'What climate type does Haiti have?', options: ['Polar', 'Temperate', 'Tropical', 'Arid'], correctAnswer: 2, explanation: 'Haiti has a tropical climate — hot and humid year-round, located near the equator.' },
      { question: 'What is a "peninsula"?', options: ['A group of islands', 'Land surrounded by water on three sides', 'A flat elevated area', 'A deep valley'], correctAnswer: 1, explanation: 'A peninsula is land connected to the mainland but surrounded by water on three sides, like Florida.' },
      { question: 'What is wrong with this sentence: "If it will rain tomorrow, the match will be cancelled"?', options: ['Nothing is wrong.', '"Will" should not be in the if-clause.', '"Rain" should be "raining."', '"Match" should be "game."'], correctAnswer: 1, explanation: 'In first conditional sentences, the if-clause uses present simple (not "will"). Correct: "If it rains tomorrow..."' },
      { question: 'What is "humidity"?', options: ['The temperature of the air', 'The amount of moisture in the air', 'The speed of the wind', 'The amount of sunlight'], correctAnswer: 1, explanation: 'Humidity measures how much water vapor (moisture) is in the air. High humidity makes warm days feel even hotter.' },
      { question: 'What is the difference between a "hurricane" and a "typhoon"?', options: ['They are completely different storms.', 'They are the same storm named differently by region.', 'A typhoon is always stronger.', 'A hurricane happens on land, a typhoon at sea.'], correctAnswer: 1, explanation: 'Hurricane, typhoon, and cyclone all refer to the same type of storm — they just have different names depending on the region of the world.' },
      { question: 'How do you describe rain happening right now in English?', options: ['"It rains."', '"It is raining."', '"It makes rain."', '"It has rain."'], correctAnswer: 1, explanation: 'For weather happening NOW, use the present continuous: "It is raining." The present simple ("It rains") describes habitual weather.' },
      { question: 'According to Psalm 24:1, who does the earth belong to?', options: ['Governments', 'Scientists', 'The Lord', 'Whoever lives on it'], correctAnswer: 2, explanation: '"The earth is the Lord\'s, and everything in it" (Psalm 24:1). God owns creation and entrusts it to our care as stewards.' },
    ],
  },

  // ── W2: Animals and Ecosystems (INSTRUCTION) ──────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Animals and Ecosystems',
        estimatedMinutes: 70,
        objectives: [
          'Use precise vocabulary to describe animals, habitats, food chains, and ecosystems.',
          'Construct passive voice sentences (is found, are eaten, was discovered) for scientific descriptions.',
          'Compare passive voice usage in French and English, identifying common errors for French speakers.',
          'Connect the study of ecosystems to the biblical concept of God as Creator and Designer.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Did you know that a single tree can be home to hundreds of different species — insects, birds, fungi, and more — all depending on each other? How would you describe this incredible design in English?',
              connection: 'Describing the natural world requires precise scientific vocabulary and a special grammar structure called the passive voice. In this lesson, you will learn both — and discover why scientists and nature writers love the passive voice for describing how ecosystems work.',
            },
            {
              type: 'text',
              heading: 'Animals, Habitats, and Ecosystems',
              body: 'An **ecosystem** is a community of living things interacting with each other and with their environment. Let us build the vocabulary you need to describe them.\n\n**Animal Classification:**\n- **Mammals** — warm-blooded animals that feed their young with milk (dolphins, elephants, humans)\n- **Reptiles** — cold-blooded animals with scales (snakes, lizards, crocodiles)\n- **Amphibians** — animals that live in water and on land (frogs, salamanders)\n- **Birds** — warm-blooded animals with feathers and wings\n- **Insects** — small animals with six legs and usually wings (bees, ants, butterflies)\n- **Fish** — cold-blooded animals that live in water and breathe through gills\n\n**Habitats:**\n- **Rainforest** — hot, wet forest with enormous biodiversity\n- **Desert** — hot or cold area with very little rainfall\n- **Ocean** — saltwater that covers 71% of the earth\n- **Wetland** — area where land is saturated with water (marshes, swamps)\n- **Grassland / Savanna** — open areas covered with grass, few trees\n\n**Food Chains:**\n- **Producer** — an organism that makes its own food (plants, algae)\n- **Consumer** — an organism that eats other organisms\n  - **Herbivore** — eats only plants\n  - **Carnivore** — eats only animals\n  - **Omnivore** — eats both plants and animals\n- **Predator** — an animal that hunts other animals\n- **Prey** — an animal that is hunted by predators\n- **Decomposer** — an organism that breaks down dead matter (fungi, bacteria)\n\n**Key Term:** **Biodiversity** — the variety of different species in an ecosystem. More biodiversity usually means a healthier ecosystem.',
            },
            {
              type: 'text',
              heading: 'The Passive Voice: Essential for Science',
              body: 'The **passive voice** focuses on what happens to the subject, rather than who does the action.\n\n**Active:** "Lions eat zebras."\n**Passive:** "Zebras **are eaten** by lions."\n\n**Structure:** Subject + be (am/is/are/was/were) + past participle\n\n**More examples:**\n- "The Galápagos tortoise **is found** only on the Galápagos Islands."\n- "Many species **are threatened** by habitat destruction."\n- "The first dinosaur fossil **was discovered** in 1824."\n- "These birds **are not seen** in cold climates."\n\n**Why scientists love passive voice:**\nIn scientific writing, the focus is on the animal or phenomenon, not the person observing it. "The species was observed in three habitats" focuses on the species, not the researcher.\n\n**FRENCH SPEAKERS — Watch Out:**\nFrench uses passive voice too, but there are tricky differences:\n- French sometimes uses "on" where English uses passive: "On trouve cette espèce en Afrique" → "This species **is found** in Africa" (NOT "One finds this species...")\n- French reflexive constructions sometimes become passive in English: "Ça se mange" → "It **is eaten**" (NOT "It eats itself")\n- English passive requires a past participle: "is found," "are eaten," "was discovered" — make sure you know your irregular past participles!',
            },
            {
              type: 'biblical-worldview',
              theme: 'God the Designer of Ecosystems',
              scriptureRef: 'Psalm 104:24-25; Genesis 1:20-25',
              reflection: '"How many are your works, Lord! In wisdom you made them all; the earth is full of your creatures. There is the sea, vast and spacious, teeming with creatures beyond number — living things both large and small" (Psalm 104:24-25). When we study ecosystems — how every creature has a role, how food chains connect, how habitats provide exactly what each species needs — we see the fingerprints of an intelligent Designer. Evolution or creation debates aside, the sheer complexity and beauty of ecosystems points to a Creator who cares deeply about His world.',
              applicationQuestion: 'When you learn about the intricate connections in an ecosystem — how every species depends on others — what does this reveal about God as a Designer? How should this affect how we treat the natural world?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Describe a food chain from an ecosystem you know. Use the vocabulary from this lesson (producer, consumer, herbivore, carnivore, predator, prey, decomposer).',
                'Rewrite these active sentences in passive voice: (a) "Sharks eat fish." (b) "Scientists discovered a new species." (c) "Deforestation destroys habitats."',
                'Read Psalm 104:24-25. The psalmist says God made all creatures "in wisdom." What does it mean that God used wisdom in creating ecosystems?',
              ],
            },
            {
              type: 'practice',
              activity: 'Ecosystem Description',
              prompt: 'Choose an ecosystem (rainforest, ocean, desert, wetland, or savanna) and write a **150-word scientific description** using:\n- At least 5 vocabulary words from this lesson\n- At least 3 passive voice sentences\n- A description of one food chain within that ecosystem\n\nExample start: "The Amazon Rainforest is found in South America. It is home to more than 10% of all species on Earth..."',
            },
            {
              type: 'practice',
              activity: 'Active to Passive Conversion',
              prompt: 'Convert each sentence from active to passive voice:\n\n1. "Bees pollinate flowers."\n2. "The cheetah hunts the gazelle."\n3. "Scientists classified the new species in 2020."\n4. "Pollution threatens coral reefs."\n5. "Many countries protect endangered animals."\n\nThen write 3 original passive voice sentences about animals or ecosystems.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **300-400 word "Nature Encyclopedia Entry"** about an animal of your choice. Include:\n- Where the animal is found (use passive voice)\n- What it eats and what eats it (food chain vocabulary)\n- Its habitat and ecosystem\n- Whether it is endangered or threatened (use passive voice)\n- At least 6 vocabulary words from this lesson\n- At least 4 passive voice sentences\n- A concluding sentence connecting to Psalm 104:24 about God\'s wise design',
            },
            {
              type: 'practice',
              prompt: 'Write a comparison (100 words) of how French and English handle passive voice differently. Include at least 2 examples where a French speaker might make a mistake when using English passive voice.',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Animals and Ecosystems',
        estimatedMinutes: 55,
        objectives: [
          'Use vocabulary for animals, habitats, and food chains.',
          'Form basic passive voice sentences (is found, are eaten).',
          'Describe an ecosystem using scientific vocabulary.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Think about an animal you like. Where does it live? What does it eat? What eats it? Can you describe all of this in English?',
              connection: 'Today you will learn vocabulary for animals and ecosystems, and a new grammar structure called the passive voice — a way of saying things like "Zebras are eaten by lions" instead of "Lions eat zebras."',
            },
            {
              type: 'text',
              heading: 'Animals and Ecosystems',
              body: '**Animals:**\n- **Mammals** — warm-blooded, feed babies milk (dogs, whales, humans)\n- **Reptiles** — cold-blooded, scales (snakes, lizards)\n- **Birds** — feathers, wings\n- **Insects** — six legs (bees, ants)\n- **Fish** — live in water, gills\n\n**Habitats:** rainforest, desert, ocean, wetland, grassland\n\n**Food chain words:**\n- **Producer** — makes its own food (plants)\n- **Herbivore** — eats plants\n- **Carnivore** — eats animals\n- **Omnivore** — eats both\n- **Predator** — hunts other animals\n- **Prey** — is hunted\n- **Decomposer** — breaks down dead things',
            },
            {
              type: 'text',
              heading: 'Passive Voice Basics',
              body: 'The **passive voice** focuses on WHAT happens, not WHO does it.\n\n**Active:** "Lions eat zebras."\n**Passive:** "Zebras **are eaten** by lions."\n\n**How to form it:** Subject + is/are/was/were + past participle\n\n**Examples:**\n- "This bird **is found** in Africa."\n- "Fish **are eaten** by sharks."\n- "The species **was discovered** in 1900."\n\n**French speakers:** When French uses "on" (On trouve...), English uses passive: "On trouve cette espèce..." → "This species **is found**..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Amazing Design',
              scriptureRef: 'Psalm 104:24',
              reflection: '"How many are your works, Lord! In wisdom you made them all" (Psalm 104:24). Every animal and every ecosystem shows God\'s incredible design. Each creature has a role — nothing is wasted.',
              applicationQuestion: 'What does the complexity of ecosystems tell us about God as Creator?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Describe a food chain you know. Use the words producer, consumer, predator, prey.',
                'Why do scientists use passive voice? (Hint: what is the focus — the scientist or the animal?)',
              ],
            },
            {
              type: 'practice',
              activity: 'Active to Passive',
              prompt: 'Change each sentence to passive voice:\n\n1. "Sharks eat fish." → "Fish _____"\n2. "Scientists discovered a new species." → "A new species _____"\n3. "Deforestation destroys habitats." → "Habitats _____"\n\nThen write 3 passive voice sentences about animals.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **200-300 word description** of an animal and its ecosystem. Include:\n- Where the animal is found (use passive voice)\n- What it eats and its role in the food chain\n- Its habitat\n- At least 4 vocabulary words from this lesson\n- At least 3 passive voice sentences',
            },
            {
              type: 'practice',
              prompt: 'Draw or describe a food chain with at least 4 organisms. Label each one as producer, herbivore, carnivore, or decomposer.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Animals and Ecosystems',
        estimatedMinutes: 40,
        objectives: [
          'Learn basic English vocabulary for animals and habitats.',
          'Understand simple passive voice sentences.',
          'Describe where an animal lives and what it eats.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What is your favorite animal? Where does it live? What does it eat?',
              connection: 'Today you will learn English words for animals, where they live, and what they eat. You will also learn a new way to make sentences: "Fish are eaten by sharks" instead of "Sharks eat fish."',
            },
            {
              type: 'text',
              heading: 'Animals and Where They Live',
              body: '**Types of animals:**\n- **Mammals** — dogs, cats, elephants, whales\n- **Birds** — eagles, parrots, chickens\n- **Reptiles** — snakes, lizards, crocodiles\n- **Fish** — salmon, shark, goldfish\n- **Insects** — bees, ants, butterflies\n\n**Where they live (habitats):**\n- **Rainforest** — hot, rainy forest (parrots, monkeys)\n- **Ocean** — the sea (fish, whales, sharks)\n- **Desert** — very dry, sandy (lizards, camels)\n\n**Passive voice (simple):**\n- "Lions eat zebras." → "Zebras **are eaten** by lions."\n- "You can find parrots in the rainforest." → "Parrots **are found** in the rainforest."',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Made the Animals',
              scriptureRef: 'Psalm 104:24',
              reflection: 'God made every animal — from the biggest whale to the smallest ant. Each one has a special role in the world He created.',
              applicationQuestion: 'What animal do you think shows God\'s amazing creativity?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Name three animals and their habitats in English.',
                'Can you say "Cats eat mice" in a different way using "are eaten"?',
              ],
            },
            {
              type: 'practice',
              activity: 'Animal Sentences',
              prompt: 'Complete each sentence:\n\n1. Parrots _____ (is found / are found) in the rainforest.\n2. Fish _____ (are eaten / is eaten) by sharks.\n3. Elephants _____ (is found / are found) in Africa.\n4. Mice _____ (are eaten / is eaten) by cats.\n\nThen write 2 sentences about an animal you like, using "is found" or "are found."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **150-200 words** about an animal. Include:\n- What kind of animal it is (mammal, bird, reptile...)\n- Where it is found (use "is found" or "are found")\n- What it eats\n- Why you think it is interesting',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'ecosystem', definition: 'A community of living things interacting with each other and their environment.', example: 'The coral reef is a complex ecosystem with thousands of species depending on each other.' },
      { term: 'habitat', definition: 'The natural home or environment of an animal, plant, or organism.', example: 'The polar bear\'s natural habitat is the Arctic sea ice.' },
      { term: 'biodiversity', definition: 'The variety of different species living in an area.', example: 'Tropical rainforests have the highest biodiversity of any ecosystem on Earth.' },
      { term: 'predator', definition: 'An animal that hunts and eats other animals.', example: 'The hawk is a predator that hunts mice and small birds.' },
      { term: 'prey', definition: 'An animal that is hunted and eaten by a predator.', example: 'Rabbits are common prey for foxes and eagles.' },
      { term: 'passive voice', definition: 'A grammar structure where the subject receives the action (is found, are eaten, was discovered).', example: '"The species was discovered in 1995" uses passive voice.' },
      { term: 'endangered', definition: 'At serious risk of extinction (dying out completely).', example: 'The mountain gorilla is an endangered species with fewer than 1,000 individuals remaining.' },
      { term: 'decomposer', definition: 'An organism that breaks down dead plants and animals, returning nutrients to the soil.', example: 'Mushrooms and bacteria are important decomposers in forest ecosystems.' },
    ],
    quiz: [
      { question: 'What is an "ecosystem"?', options: ['A type of animal', 'A community of living things interacting with their environment', 'A weather pattern', 'A geographical feature'], correctAnswer: 1, explanation: 'An ecosystem is a community of living organisms interacting with each other and with their physical environment.' },
      { question: 'Which sentence is in passive voice?', options: ['Lions eat zebras.', 'Zebras are eaten by lions.', 'Lions are hunting.', 'The zebra ran away.'], correctAnswer: 1, explanation: '"Zebras are eaten by lions" is passive voice — the subject (zebras) receives the action instead of performing it.' },
      { question: 'What is a "predator"?', options: ['An animal that eats only plants', 'An animal that hunts other animals', 'An animal that is very large', 'An animal that lives in the ocean'], correctAnswer: 1, explanation: 'A predator is an animal that hunts and eats other animals. The animal it hunts is called prey.' },
      { question: 'How do you correctly say "On trouve cette espèce en Afrique" in English?', options: ['One finds this species in Africa.', 'This species is found in Africa.', 'They find this species in Africa.', 'Someone finds this species in Africa.'], correctAnswer: 1, explanation: 'French "on" constructions typically become passive voice in English: "This species is found in Africa."' },
      { question: 'What is "biodiversity"?', options: ['The study of living things', 'The variety of species in an area', 'A type of habitat', 'The food chain'], correctAnswer: 1, explanation: 'Biodiversity refers to the variety and number of different species living in a particular area or ecosystem.' },
      { question: 'What is a "decomposer"?', options: ['An animal that hunts prey', 'An organism that breaks down dead matter', 'A plant that produces food', 'An animal that eats plants'], correctAnswer: 1, explanation: 'Decomposers like fungi and bacteria break down dead organisms, returning nutrients to the soil and completing the cycle.' },
      { question: 'Which is the correct passive voice form?', options: ['The bird is find in Asia.', 'The bird is found in Asia.', 'The bird is founding in Asia.', 'The bird is finded in Asia.'], correctAnswer: 1, explanation: '"Is found" uses the correct past participle of "find." Remember: find → found (irregular verb).' },
      { question: 'What is the difference between a herbivore and a carnivore?', options: ['Size — herbivores are bigger', 'Diet — herbivores eat plants, carnivores eat animals', 'Habitat — herbivores live in forests, carnivores in deserts', 'Speed — carnivores are faster'], correctAnswer: 1, explanation: 'A herbivore eats only plants, while a carnivore eats only other animals. An omnivore eats both.' },
      { question: 'Why do scientists prefer passive voice in writing?', options: ['It sounds more impressive.', 'It focuses on the subject being studied rather than the researcher.', 'Active voice is grammatically wrong.', 'Passive voice is shorter.'], correctAnswer: 1, explanation: 'Scientists use passive voice to keep the focus on the subject of study, not on themselves: "The species was observed" rather than "I observed the species."' },
      { question: 'According to Psalm 104:24, how did God make the creatures of the earth?', options: ['Randomly', 'In wisdom', 'Quickly', 'Reluctantly'], correctAnswer: 1, explanation: '"In wisdom you made them all" (Psalm 104:24). The psalmist recognizes that God created all living things with purposeful design and wisdom.' },
    ],
  },

  // ── W3: Environmental Issues (INSTRUCTION) ────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Environmental Issues',
        estimatedMinutes: 70,
        objectives: [
          'Discuss pollution, conservation, and sustainability using precise environmental vocabulary.',
          'Use modal verbs of obligation and advice (must, should, have to, ought to) correctly in context.',
          'Organize ideas using problem-solution structure for environmental topics.',
          'Connect environmental stewardship to biblical principles of caring for God\'s creation.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If the earth is warming, the oceans are filling with plastic, and forests are disappearing — what should we do about it? And more importantly, what CAN we do? These questions require not just passion, but precise language.',
              connection: 'In this lesson, you will learn the vocabulary of environmental issues and the grammar structures that express obligation (must, have to) and advice (should, ought to). You will also practice the problem-solution structure — a powerful way to organize your ideas about environmental challenges.',
            },
            {
              type: 'text',
              heading: 'Environmental Issues: Vocabulary and Concepts',
              body: 'Let us build a strong vocabulary for discussing environmental issues in English.\n\n**Types of Pollution:**\n- **Air pollution** — harmful gases and particles in the atmosphere (from factories, cars, burning waste)\n- **Water pollution** — contamination of rivers, lakes, and oceans (from chemicals, sewage, plastic)\n- **Soil pollution** — harmful substances in the ground (from pesticides, industrial waste)\n- **Noise pollution** — excessive noise that disrupts life (from traffic, construction, airports)\n\n**Environmental Concepts:**\n- **Conservation** — protecting natural resources and ecosystems from destruction\n- **Sustainability** — meeting our needs today without harming the ability of future generations to meet theirs\n- **Renewable energy** — energy from sources that do not run out (solar, wind, hydroelectric)\n- **Non-renewable energy** — energy from sources that will eventually be exhausted (oil, coal, natural gas)\n- **Deforestation** — cutting down forests on a large scale\n- **Carbon footprint** — the total amount of greenhouse gases produced by a person, organization, or activity\n- **Endangered species** — animals or plants at risk of becoming extinct\n- **Recycling** — processing used materials into new products\n\n**Problem-Solution Structure:**\nWhen writing about environmental issues, organize your ideas clearly:\n1. **State the problem:** What is happening? Where? How serious is it?\n2. **Explain the causes:** Why is this happening?\n3. **Describe the effects:** What are the consequences?\n4. **Propose solutions:** What should/must/can we do?\n\nThis structure works for essays, speeches, and reports.',
            },
            {
              type: 'text',
              heading: 'Modal Verbs: Must, Should, Have To',
              body: 'When discussing environmental issues, you need modal verbs to express different levels of obligation and advice.\n\n**Must** — strong obligation or necessity (often from the speaker\'s authority or moral conviction)\n- "We **must** protect endangered species before it is too late."\n- "Governments **must** invest in renewable energy."\n\n**Have to** — obligation from external rules or circumstances\n- "Factories **have to** follow pollution regulations."\n- "We **have to** reduce our carbon footprint — there is no alternative."\n\n**Should / Ought to** — advice or recommendation (less strong than must)\n- "People **should** recycle more."\n- "We **ought to** use public transportation when possible."\n\n**Must not vs. Do not have to:**\nThis is a critical distinction:\n- "You **must not** dump chemicals in the river." (= It is forbidden!)\n- "You **do not have to** drive to work — you can take the bus." (= It is not necessary, but you can if you want.)\n\n**French speakers — common confusion:**\nFrench "devoir" covers both "must" and "have to," but in English these have different nuances. Also, "il faut" does not translate directly — use "we must," "we need to," or "it is necessary to" depending on context.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Stewardship, Not Exploitation',
              scriptureRef: 'Psalm 24:1; Genesis 2:15',
              reflection: 'Genesis 2:15 says God placed Adam in the garden "to work it and take care of it." This is the first job description in the Bible — and it is a stewardship role. "The earth is the Lord\'s" (Psalm 24:1) — we do not own it. We are caretakers. Biblical stewardship means using resources wisely, not wastefully; protecting what God has made, not exploiting it for short-term gain. Christians should be at the forefront of environmental care — not because the earth is god, but because it belongs to God.',
              applicationQuestion: 'How does the biblical concept of stewardship (Genesis 2:15) differ from both exploitation AND nature-worship? What is the balanced Christian approach to environmental issues?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the biggest environmental issue in your community? Use the problem-solution structure to outline how you would address it.',
                'What is the difference between "must not" and "do not have to"? Create a sentence for each that relates to the environment.',
                'Some people say Christians should not worry about the environment because God is in control. Others say Christians should care the most because God told us to care for creation. What do you think? Use Genesis 2:15 and Psalm 24:1 in your answer.',
              ],
            },
            {
              type: 'practice',
              activity: 'Modal Verb Practice',
              prompt: 'Complete each sentence with the correct modal verb (must, have to, should, must not, do not have to):\n\n1. We _____ stop using plastic bags — they are destroying the oceans. (strong moral obligation)\n2. Factories _____ meet environmental standards set by the government. (external rule)\n3. People _____ consider using public transportation more often. (advice)\n4. You _____ throw batteries in the regular trash — they contain toxic chemicals! (forbidden)\n5. You _____ buy an electric car to help the environment — even walking more helps. (not necessary)\n\nThen write 4 original sentences about environmental issues using must, should, have to, and must not.',
            },
            {
              type: 'practice',
              activity: 'Problem-Solution Outline',
              prompt: 'Choose ONE environmental issue from this lesson (air pollution, water pollution, deforestation, or endangered species). Create a detailed outline using the problem-solution structure:\n\n1. **Problem:** Describe the issue in 3-4 sentences.\n2. **Causes:** List 2-3 causes.\n3. **Effects:** Describe 2-3 consequences.\n4. **Solutions:** Propose 3 solutions using modal verbs (must, should, have to).\n\nThis outline will prepare you for the output task.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a **300-400 word problem-solution essay** about an environmental issue. Follow this structure:\n\n**Paragraph 1: Problem** — Describe the environmental issue clearly.\n**Paragraph 2: Causes and Effects** — Explain why it happens and what the consequences are.\n**Paragraph 3: Solutions** — Propose at least 3 solutions using must, should, and have to.\n**Paragraph 4: Conclusion** — Summarize and include a reflection on Genesis 2:15 or Psalm 24:1.\n\nUse at least 8 environmental vocabulary words and at least 4 modal verbs.',
            },
            {
              type: 'practice',
              prompt: 'Write 5 sentences comparing "must" vs "should" vs "have to" in the context of environmental rules. For each modal, explain when it is appropriate and give an environmental example.',
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Environmental Issues',
        estimatedMinutes: 55,
        objectives: [
          'Use vocabulary for pollution, conservation, and sustainability.',
          'Use must, should, and have to to give advice and express obligation.',
          'Organize ideas about environmental problems and solutions.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What environmental problem worries you the most? Pollution? Climate change? Deforestation? How would you talk about it in English?',
              connection: 'Today you will learn environmental vocabulary and practice using "must," "should," and "have to" — words you need when talking about what people should do to protect the planet.',
            },
            {
              type: 'text',
              heading: 'Environmental Words',
              body: '**Types of pollution:**\n- **Air pollution** — dirty air from factories and cars\n- **Water pollution** — chemicals and trash in rivers and oceans\n- **Soil pollution** — harmful chemicals in the ground\n\n**Key words:**\n- **Conservation** — protecting nature\n- **Sustainability** — using resources without running out\n- **Deforestation** — cutting down forests\n- **Recycling** — making new things from old materials\n- **Renewable energy** — energy from wind, sun, or water\n- **Carbon footprint** — how much pollution a person causes\n- **Endangered** — at risk of disappearing forever',
            },
            {
              type: 'text',
              heading: 'Must, Should, Have To',
              body: 'Use these words to talk about what people need to do:\n\n**Must** — very strong, important obligation:\n- "We **must** protect endangered animals."\n\n**Have to** — obligation from rules:\n- "Factories **have to** follow pollution laws."\n\n**Should** — advice, recommendation:\n- "People **should** recycle more."\n\n**Must not** vs **Do not have to:**\n- "You **must not** dump trash in the river." (It is forbidden!)\n- "You **do not have to** buy an electric car." (It is not necessary.)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Stewardship of Creation',
              scriptureRef: 'Psalm 24:1; Genesis 2:15',
              reflection: 'God put humans in the garden "to work it and take care of it" (Genesis 2:15). The earth belongs to God (Psalm 24:1), and we are responsible for caring for it — not wasting or destroying it.',
              applicationQuestion: 'What is one way you can be a better steward of God\'s creation?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the biggest environmental problem in your area? What should people do about it?',
                'What is the difference between "must" and "should"? Give an example for each.',
              ],
            },
            {
              type: 'practice',
              activity: 'Modal Verb Fill-In',
              prompt: 'Choose the correct word (must, should, have to, must not, do not have to):\n\n1. We _____ stop polluting the oceans. (strong obligation)\n2. You _____ throw batteries in the trash! (forbidden)\n3. People _____ try to use less plastic. (advice)\n4. By law, companies _____ report their pollution levels. (legal requirement)\n5. You _____ be a scientist to help the environment. (not necessary)\n\nThen write 3 sentences about the environment using must, should, and have to.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **200-300 words** about an environmental problem and its solutions.\n\n**Paragraph 1:** Describe the problem. What is happening? Why is it serious?\n**Paragraph 2:** Propose 2-3 solutions. Use must, should, and have to.\n**Paragraph 3:** Conclude with a sentence about Genesis 2:15 or Psalm 24:1.\n\nUse at least 5 environmental vocabulary words.',
            },
            {
              type: 'practice',
              prompt: 'Create a poster concept: Write the text for a poster encouraging people to protect the environment. Include a slogan and 3 action items using must, should, or have to.',
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Environmental Issues',
        estimatedMinutes: 40,
        objectives: [
          'Learn basic English words about pollution and the environment.',
          'Use "must," "should," and "have to" in simple sentences.',
          'Talk about how to help the environment.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What happens to the trash you throw away? Where does it go? How does it affect the earth?',
              connection: 'Today you will learn English words about environmental problems and practice saying what people must, should, and have to do to help the planet.',
            },
            {
              type: 'text',
              heading: 'Taking Care of the Earth',
              body: '**Environmental problems:**\n- **Pollution** — making air, water, or land dirty\n- **Deforestation** — cutting down too many trees\n- **Trash / Litter** — garbage left on the ground or in water\n- **Recycling** — turning old things into new things\n\n**What should we do?**\n- "We **must** stop throwing trash in the ocean." (very important)\n- "We **should** recycle more." (good advice)\n- "We **have to** follow the rules about trash." (it is a rule)\n\n**Must not = FORBIDDEN:**\n- "You **must not** burn plastic — it is toxic!"\n\n**Do not have to = NOT NECESSARY:**\n- "You **do not have to** buy expensive things to help — even small actions count!"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Taking Care of God\'s World',
              scriptureRef: 'Genesis 2:15',
              reflection: 'God gave us the earth to take care of, not to destroy (Genesis 2:15). We can honor God by keeping His world clean and beautiful.',
              applicationQuestion: 'What is one thing you can do today to take care of the earth?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is one environmental problem you see in your community?',
                'What is the difference between "must" and "should"?',
              ],
            },
            {
              type: 'practice',
              activity: 'Fill in the Modal',
              prompt: 'Choose the right word (must, should, have to, must not):\n\n1. We _____ throw trash on the ground. (forbidden)\n2. People _____ recycle when they can. (good advice)\n3. We _____ protect the animals. (very important)\n4. By law, you _____ separate your recycling. (it is a rule)\n\nThen write 2 sentences about what YOU should do to help the environment.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write **150-200 words** about how to help the environment. Include:\n- One environmental problem\n- 3 things people must or should do about it\n- Use must, should, and have to at least once each\n- Connect to Genesis 2:15 in one sentence',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'pollution', definition: 'The introduction of harmful substances into the environment (air, water, or soil).', example: 'Air pollution from factories is a major problem in many cities.' },
      { term: 'conservation', definition: 'The protection and preservation of natural resources and the environment.', example: 'Conservation efforts have helped the bald eagle recover from near-extinction.' },
      { term: 'sustainability', definition: 'Using resources in a way that meets current needs without harming future generations.', example: 'Sustainability means finding ways to live well today without destroying the planet for tomorrow.' },
      { term: 'deforestation', definition: 'The large-scale cutting down of forests.', example: 'Deforestation in the Amazon rainforest threatens thousands of species.' },
      { term: 'renewable energy', definition: 'Energy from sources that naturally replenish (sun, wind, water).', example: 'Solar panels and wind turbines produce renewable energy without pollution.' },
      { term: 'carbon footprint', definition: 'The total amount of greenhouse gases produced by a person or activity.', example: 'Flying on an airplane has a much larger carbon footprint than taking the train.' },
      { term: 'must / should / have to', definition: 'Modal verbs expressing obligation (must, have to) and advice (should). "Must not" means forbidden; "do not have to" means not necessary.', example: '"We must protect the oceans" (strong obligation). "You should recycle" (advice).' },
      { term: 'recycling', definition: 'The process of converting used materials into new products.', example: 'Recycling one aluminum can saves enough energy to power a TV for three hours.' },
    ],
    quiz: [
      { question: 'What is "sustainability"?', options: ['Throwing things away quickly', 'Using resources without harming future generations', 'Building more factories', 'Cutting down forests'], correctAnswer: 1, explanation: 'Sustainability means meeting our needs today in a way that does not prevent future generations from meeting theirs.' },
      { question: 'Which modal verb expresses the STRONGEST obligation?', options: ['Should', 'Could', 'Must', 'Might'], correctAnswer: 2, explanation: '"Must" expresses the strongest sense of obligation or necessity — stronger than "should" (advice) or "could" (possibility).' },
      { question: 'What does "must not" mean?', options: ['It is not necessary.', 'It is forbidden.', 'It is recommended.', 'It is possible.'], correctAnswer: 1, explanation: '"Must not" means something is forbidden or prohibited. "Do not have to" means it is not necessary.' },
      { question: 'What is "deforestation"?', options: ['Planting new trees', 'The large-scale cutting down of forests', 'A type of pollution', 'A conservation method'], correctAnswer: 1, explanation: 'Deforestation is the clearing of forests on a large scale, which destroys habitats and contributes to climate change.' },
      { question: 'Which sentence correctly uses "have to"?', options: ['Factories have to follow pollution laws.', 'Factories have to following pollution laws.', 'Factories has to follow pollution laws.', 'Factories having to follow pollution laws.'], correctAnswer: 0, explanation: 'The correct form is "have to + base verb": "Factories have to follow pollution laws."' },
      { question: 'What is a "carbon footprint"?', options: ['A footprint made of carbon', 'The total greenhouse gases produced by a person or activity', 'A fossil fuel', 'A type of shoe'], correctAnswer: 1, explanation: 'A carbon footprint measures the total greenhouse gases produced by our activities — driving, flying, heating, etc.' },
      { question: 'What is "renewable energy"?', options: ['Energy from coal and oil', 'Energy from sources that replenish naturally (sun, wind, water)', 'Energy that is very expensive', 'Energy used only in factories'], correctAnswer: 1, explanation: 'Renewable energy comes from natural sources that replenish over time: solar, wind, hydroelectric, and geothermal.' },
      { question: '"You _____ buy organic food to help the environment — even reducing waste helps." Which modal completes this correctly?', options: ['must', 'must not', 'do not have to', 'should not'], correctAnswer: 2, explanation: '"Do not have to" means it is not necessary — you do not NEED to buy organic food specifically; there are other ways to help.' },
      { question: 'What is the problem-solution structure?', options: ['A grammar rule', 'A way to organize writing: state the problem, then propose solutions', 'A type of essay about problems only', 'A science experiment'], correctAnswer: 1, explanation: 'Problem-solution is a writing structure: describe the problem, explain its causes and effects, then propose solutions.' },
      { question: 'According to Genesis 2:15, what did God tell humans to do with the earth?', options: ['Use it however they want', 'Ignore it', 'Work it and take care of it', 'Leave it untouched'], correctAnswer: 2, explanation: 'God placed Adam in the garden "to work it and take care of it" (Genesis 2:15) — humanity\'s first role was environmental stewardship.' },
    ],
  },

  // ── W4: Environmental Awareness Campaign (PROJECT) ─────────────────────────
  {
    weekNumber: 4,
    pathways: [
      // ── ADVANCED ──
      {
        pathway: 'ADVANCED',
        title: 'Environmental Awareness Campaign',
        estimatedMinutes: 70,
        objectives: [
          'Design a complete environmental awareness campaign including posters, slogans, and a persuasive speech.',
          'Use modal verbs, conditional sentences, passive voice, and environmental vocabulary in integrated communication.',
          'Apply problem-solution structure and persuasive techniques to motivate action.',
          'Ground environmental advocacy in biblical stewardship principles.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could launch a campaign to change one thing about how your community treats the environment, what would it be? What words would convince people to act?',
              connection: 'This project brings together everything you have learned in this unit — environmental vocabulary, modal verbs, conditional sentences, passive voice, and problem-solution structure. You will design a campaign that could actually make a difference in your community.',
            },
            {
              type: 'text',
              heading: 'Your Environmental Awareness Campaign',
              body: 'An effective awareness campaign uses multiple communication tools to reach people. Your campaign will include:\n\n1. **Campaign Name and Slogan** — A short, memorable phrase that captures your message.\n   Examples: "Reduce, Reuse, Recycle" / "Every Drop Counts" / "Plant a Tree, Plant a Future"\n\n2. **Campaign Poster Text** — The words for a poster: a headline, a short explanation, a call to action, and a statistic or fact.\n\n3. **Persuasive Speech (300-400 words)** — A speech you could deliver at a school assembly to motivate action. Use problem-solution structure, modal verbs, and at least one conditional sentence.\n\n4. **Social Media Post** — A short post (under 200 characters) with a hashtag.\n\n5. **Biblical Reflection** — A paragraph connecting your campaign to Genesis 2:15 or Psalm 24:1.\n\nUse persuasive language throughout: strong verbs, emotional appeals, facts, and calls to action.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Speaking Up for Creation',
              scriptureRef: 'Psalm 24:1; Proverbs 31:8-9',
              reflection: 'Proverbs 31:8-9 says, "Speak up for those who cannot speak for themselves." The natural world — the forests, the oceans, the animals — cannot speak. But we can speak on their behalf. As stewards of God\'s creation (Genesis 2:15), Christians have a unique motivation to protect the environment: we are not just saving "nature" — we are caring for what belongs to our Father.',
              applicationQuestion: 'How can your campaign reflect both environmental concern AND biblical stewardship?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What environmental issue will your campaign focus on? Why did you choose it?',
                'What is the most effective slogan you can think of? What makes a slogan memorable?',
                'How will you use facts (logos), emotions (pathos), and credibility (ethos) in your speech?',
              ],
            },
            {
              type: 'practice',
              activity: 'Campaign Planning',
              prompt: 'Plan your campaign by answering these questions:\n\n1. What environmental issue will you address?\n2. Who is your target audience (students? parents? community members?)?\n3. What is your campaign name?\n4. Write 3 possible slogans. Choose the best one.\n5. What key fact or statistic will you use?\n6. What action do you want people to take?\n7. Write one conditional sentence for your speech ("If we..., we will...")\n8. Write one sentence using "must" and one using "should."',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'Environmental Awareness Campaign',
              summary: 'Design a complete environmental campaign with posters, slogans, a speech, and a social media post.',
              description: '**Create a five-part environmental awareness campaign:**\n\n**Part 1: Campaign Name and Slogan**\nCreate a campaign name and a memorable slogan (max 10 words).\n\n**Part 2: Poster Text**\nWrite the text for a campaign poster: headline, 2-3 sentence explanation, one fact/statistic, and a call to action.\n\n**Part 3: Persuasive Speech (300-400 words)**\nWrite a speech for a school assembly. Follow problem-solution structure:\n- Describe the environmental problem\n- Explain causes and effects\n- Propose solutions using must, should, have to\n- Include at least one conditional sentence ("If we..., will...")\n- Include at least one passive voice sentence\n- End with a powerful call to action\n\n**Part 4: Social Media Post**\nWrite a social media post (under 200 characters) with a hashtag promoting your campaign.\n\n**Part 5: Biblical Reflection (75-100 words)**\nConnect your campaign to Genesis 2:15 or Psalm 24:1. Explain how biblical stewardship motivates your environmental advocacy.\n\n**Requirements:**\n- At least 10 environmental vocabulary words across all parts\n- Modal verbs (must, should, have to) used correctly\n- At least 2 conditional sentences\n- At least 2 passive voice sentences\n- Problem-solution structure in the speech',
              deliverable: 'written-report',
              estimatedHours: 3,
              rubric: [
                { dimension: 'Campaign Concept', maxPoints: 20, descriptors: { exemplary: 'Creative, focused campaign with memorable slogan and clear message. Poster text is compelling.', proficient: 'Good campaign concept with adequate slogan and poster.', developing: 'Concept is unclear or slogan is weak.' } },
                { dimension: 'Persuasive Speech', maxPoints: 30, descriptors: { exemplary: 'Powerful speech with clear problem-solution structure, effective use of modals and conditionals, and a compelling call to action.', proficient: 'Good speech with adequate structure and language use.', developing: 'Speech lacks structure, modals, or persuasive force.' } },
                { dimension: 'Grammar and Vocabulary', maxPoints: 25, descriptors: { exemplary: 'Rich environmental vocabulary. Modal verbs, conditionals, and passive voice all used correctly and naturally.', proficient: 'Good vocabulary and mostly correct grammar structures.', developing: 'Limited vocabulary or multiple grammar errors.' } },
                { dimension: 'Biblical Reflection and Social Media', maxPoints: 25, descriptors: { exemplary: 'Thoughtful reflection connecting stewardship to the campaign. Creative social media post.', proficient: 'Adequate reflection and social media post.', developing: 'Reflection is superficial. Social media post is missing or weak.' } },
              ],
            },
          ],
        },
      },
      // ── STANDARD ──
      {
        pathway: 'STANDARD',
        title: 'Environmental Awareness Campaign',
        estimatedMinutes: 55,
        objectives: [
          'Create a campaign with a slogan, poster text, and a short speech.',
          'Use environmental vocabulary and modal verbs correctly.',
          'Apply problem-solution structure to environmental advocacy.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could convince your whole school to do one thing for the environment, what would it be?',
              connection: 'In this project, you will create an environmental awareness campaign — a slogan, a poster, and a short speech to convince people to take action.',
            },
            {
              type: 'text',
              heading: 'Design Your Campaign',
              body: 'Your campaign needs:\n\n1. **A slogan** — a short, catchy phrase (like "Every Drop Counts" or "Go Green, Stay Clean")\n2. **Poster text** — a headline, a fact, and a call to action\n3. **A short speech** — using problem-solution structure:\n   - What is the problem?\n   - Why does it matter?\n   - What should we do? (Use must, should, have to)\n\nUse environmental vocabulary from this unit and make your campaign convincing!',
            },
            {
              type: 'biblical-worldview',
              theme: 'Caring for God\'s World',
              scriptureRef: 'Genesis 2:15; Psalm 24:1',
              reflection: 'God gave us the earth to care for (Genesis 2:15). Our campaign is not just about the environment — it is about honoring God by protecting what He made.',
              applicationQuestion: 'How does knowing the earth belongs to God change the way we talk about environmental issues?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What issue will your campaign focus on? Why?',
                'What makes a slogan effective? Brainstorm 3 options and choose the best.',
              ],
            },
            {
              type: 'practice',
              activity: 'Campaign Draft',
              prompt: 'Write your slogan and poster text. Then write the first paragraph of your speech (describe the problem). Share with a partner for feedback.',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'Environmental Awareness Campaign',
              summary: 'Create a campaign with slogan, poster text, and a persuasive speech.',
              description: '**Part 1: Slogan** — Create a memorable slogan (max 10 words).\n\n**Part 2: Poster Text** — Write a headline, one fact, and a call to action.\n\n**Part 3: Speech (200-300 words)** — Use problem-solution structure:\n- Describe the problem\n- Propose solutions using must, should, have to\n- Include one conditional sentence\n- End with a call to action\n\n**Part 4: Reflection (3-4 sentences)** — Connect your campaign to Genesis 2:15.\n\nUse at least 6 environmental vocabulary words and 3 modal verbs.',
              deliverable: 'written-report',
              estimatedHours: 2,
              rubric: [
                { dimension: 'Slogan and Poster', maxPoints: 25, descriptors: { exemplary: 'Creative slogan and compelling poster text.', proficient: 'Adequate slogan and poster.', developing: 'Slogan or poster is weak.' } },
                { dimension: 'Speech', maxPoints: 40, descriptors: { exemplary: 'Clear problem-solution structure with modals and a strong call to action.', proficient: 'Good structure with most elements present.', developing: 'Lacking structure or persuasive elements.' } },
                { dimension: 'Vocabulary and Grammar', maxPoints: 25, descriptors: { exemplary: 'Rich vocabulary. Modals and conditionals used correctly.', proficient: 'Adequate vocabulary with minor errors.', developing: 'Limited vocabulary or multiple errors.' } },
                { dimension: 'Reflection', maxPoints: 10, descriptors: { exemplary: 'Thoughtful biblical connection.', proficient: 'Basic connection made.', developing: 'Reflection is missing or superficial.' } },
              ],
            },
          ],
        },
      },
      // ── VOCATIONAL ──
      {
        pathway: 'VOCATIONAL',
        title: 'Environmental Awareness Campaign',
        estimatedMinutes: 40,
        objectives: [
          'Create a simple campaign slogan and poster.',
          'Write a short paragraph about an environmental problem and solution.',
          'Use must, should, and have to in the campaign.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you could put one message on a poster about the environment, what would it say?',
              connection: 'In this project, you will create a simple environmental campaign — a slogan, a poster, and a short paragraph about what people should do.',
            },
            {
              type: 'text',
              heading: 'Your Campaign',
              body: 'Create a campaign to help the environment:\n\n1. **Slogan** — a short, catchy phrase (example: "Save Water, Save Life")\n2. **Poster words** — a headline and 2-3 sentences telling people what to do\n3. **Short paragraph** — explain the problem and tell people what they must or should do\n\nUse words like must, should, and have to.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Caring for God\'s Creation',
              scriptureRef: 'Genesis 2:15',
              reflection: 'God told us to take care of the earth (Genesis 2:15). Your campaign can help remind people to do that!',
              applicationQuestion: 'How can your campaign honor God?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What environmental problem will your campaign be about?',
                'What is a good slogan? Think of one and share it.',
              ],
            },
            {
              type: 'practice',
              activity: 'Draft Your Slogan',
              prompt: 'Write 3 slogans about the environment. Choose your favorite. Then write 2 sentences for your poster telling people what they should do.',
            },
          ],
          output: [
            {
              type: 'project',
              title: 'Environmental Awareness Campaign',
              summary: 'Create a slogan, poster text, and short paragraph about an environmental issue.',
              description: '**Part 1:** Write a campaign slogan (max 8 words).\n\n**Part 2:** Write poster text: a headline and 2-3 sentences.\n\n**Part 3:** Write a **150-200 word paragraph** about the problem and what people must, should, and have to do.\n\nUse at least 4 environmental vocabulary words.',
              deliverable: 'written-report',
              estimatedHours: 1.5,
              rubric: [
                { dimension: 'Slogan and Poster', maxPoints: 40, descriptors: { exemplary: 'Creative slogan with clear poster text.', proficient: 'Adequate slogan and poster.', developing: 'Slogan or poster is unclear.' } },
                { dimension: 'Paragraph', maxPoints: 40, descriptors: { exemplary: 'Clear problem and solutions. Modal verbs used correctly.', proficient: 'Basic problem-solution with some modals.', developing: 'Unclear or missing modals.' } },
                { dimension: 'Vocabulary', maxPoints: 20, descriptors: { exemplary: 'Good use of environmental words.', proficient: 'Some environmental words used.', developing: 'Very limited vocabulary.' } },
              ],
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'campaign', definition: 'An organized effort to achieve a goal, often through communication and persuasion.', example: 'The school launched a campaign to reduce plastic waste.' },
      { term: 'slogan', definition: 'A short, memorable phrase used in advertising or campaigns.', example: '"Reduce, Reuse, Recycle" is one of the most famous environmental slogans.' },
      { term: 'call to action', definition: 'A statement that encourages the audience to take a specific action.', example: 'The poster ended with a call to action: "Sign up to volunteer today!"' },
      { term: 'advocacy', definition: 'Public support for or recommendation of a particular cause.', example: 'Environmental advocacy includes speaking up for policies that protect nature.' },
      { term: 'stewardship', definition: 'The responsible care and management of something entrusted to you.', example: 'Biblical stewardship means caring for the earth because it belongs to God.' },
    ],
    quiz: [],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN — Update lessons in the database
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('='.repeat(70))
  console.log('  Enrich English Fluency Builder L2 — Units 4-6')
  console.log('  Course ID:', COURSE_ID)
  console.log('  Mode:', DRY_RUN ? 'DRY RUN' : 'LIVE')
  console.log('='.repeat(70))
  console.log()

  const course = await prisma.course.findUnique({
    where: { id: COURSE_ID },
    select: { id: true, title: true },
  })

  if (!course) {
    console.error('ERROR: Could not find course with ID', COURSE_ID)
    process.exit(1)
  }
  console.log(`Found course: ${course.title} (${course.id})\n`)

  const unitConfigs: { unitNumber: number; lessons: EnrichedLesson[] }[] = [
    { unitNumber: 4, lessons: unit4Lessons },
    { unitNumber: 5, lessons: unit5Lessons },
    { unitNumber: 6, lessons: unit6Lessons },
  ]

  let totalUpdated = 0
  let totalSkipped = 0

  for (const unitConfig of unitConfigs) {
    console.log(`${'─'.repeat(70)}`)
    console.log(`  Unit ${unitConfig.unitNumber}`)
    console.log(`${'─'.repeat(70)}`)

    const unit = await prisma.unit.findFirst({
      where: { courseId: COURSE_ID, unitNumber: unitConfig.unitNumber },
      select: { id: true, title: true, unitNumber: true },
    })

    if (!unit) {
      console.error(`  ERROR: Could not find Unit ${unitConfig.unitNumber}`)
      totalSkipped += unitConfig.lessons.length
      continue
    }
    console.log(`  Found: ${unit.title} (Unit ${unit.unitNumber})\n`)

    const dbLessons = await prisma.lesson.findMany({
      where: { unitId: unit.id },
      select: { id: true, title: true, weekNumber: true, type: true, content: true },
      orderBy: { weekNumber: 'asc' },
    })

    console.log(`  Found ${dbLessons.length} lessons in DB\n`)

    for (const enriched of unitConfig.lessons) {
      const dbLesson = dbLessons.find(l => l.weekNumber === enriched.weekNumber)
      if (!dbLesson) {
        console.log(`  [SKIP] W${enriched.weekNumber}: not found in DB`)
        totalSkipped++
        continue
      }

      const existingContent = (dbLesson.content as Record<string, unknown>) || {}
      const updatedContent = {
        ...existingContent,
        pathways: enriched.pathways,
        vocabulary: enriched.vocabulary,
        quiz: enriched.quiz,
      }

      // Log word counts per pathway
      for (const pw of enriched.pathways) {
        const wc = JSON.stringify(pw.ipo).split(/\s+/).length
        console.log(`  [${pw.pathway}] W${enriched.weekNumber}: ~${wc} words`)
      }
      console.log(`  [DATA] W${enriched.weekNumber}: ${enriched.vocabulary.length} vocab, ${enriched.quiz.length} quiz Qs`)

      if (DRY_RUN) {
        console.log(`  [DRY RUN] W${enriched.weekNumber}: "${dbLesson.title}" — would update`)
      } else {
        await prisma.lesson.update({
          where: { id: dbLesson.id },
          data: { content: updatedContent as Record<string, unknown> },
        })
        console.log(`  [UPDATED] W${enriched.weekNumber}: "${dbLesson.title}"`)
      }
      totalUpdated++
      console.log()
    }
  }

  console.log('='.repeat(70))
  console.log(`  Summary: ${totalUpdated} lessons enriched, ${totalSkipped} skipped`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN — no changes written' : 'LIVE — changes saved to DB'}`)
  console.log('='.repeat(70))
  console.log()

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error('Fatal error:', err)
  prisma.$disconnect()
  process.exit(1)
})
