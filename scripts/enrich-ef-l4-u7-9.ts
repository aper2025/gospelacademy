#!/usr/bin/env tsx
/**
 * Enrich Level 4 "University-Ready English for French Speakers" (B2 Mastery) — Units 7–9
 *
 * Course ID: cmo78ofbp007lon5t3b44wmbv
 *
 * Unit 7: Professional English (W1–W4)
 *   W1: Formal Correspondence and Applications (INSTRUCTION)
 *   W2: Professional Presentations and Public Speaking (INSTRUCTION)
 *   W3: Networking and Professional Communication (INSTRUCTION)
 *   W4: Professional Portfolio (PROJECT)
 *
 * Unit 8: Advanced Integrated Skills (W1–W4)
 *   W1: Synthesis and Analysis Across Sources (INSTRUCTION)
 *   W2: Advanced Discourse and Rhetoric (INSTRUCTION)
 *   W3: Cross-Cultural Communication (INSTRUCTION)
 *   W4: Capstone Presentation (PROJECT)
 *
 * Unit 9: Final Certification (W1–W4)
 *   W1: Comprehensive Review (INSTRUCTION)
 *   W2: Mock Exam: TOEFL Format (INSTRUCTION)
 *   W3: Mock Exam: IELTS and DET Format (INSTRUCTION)
 *   W4: Final Certification Assessment (PROJECT)
 *
 * This is the FINAL unit of the entire 4-level EF program.
 *
 * Usage:
 *   npx tsx scripts/enrich-ef-l4-u7-9.ts --dry-run
 *   npx tsx scripts/enrich-ef-l4-u7-9.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve('.env.local') })
dotenv.config({ path: path.resolve('.env') })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry-run')
const COURSE_ID = 'cmo78ofbp007lon5t3b44wmbv'

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
// UNIT 7: PROFESSIONAL ENGLISH
// ═══════════════════════════════════════════════════════════════════════════════

const unit7Lessons: EnrichedLesson[] = [

  // ── W1: Formal Correspondence and Applications ──────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Formal Correspondence and Applications',
        estimatedMinutes: 90,
        objectives: [
          'Write a compelling university application essay with a clear narrative arc.',
          'Draft a formal scholarship application letter following English conventions.',
          'Compose professional emails and formal letters appropriate for academic settings.',
          'Craft a statement of purpose that articulates academic goals with precision.',
          'Identify and avoid common French-to-English transfer errors in formal writing.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You are applying to a university in an English-speaking country. The admissions committee will read thousands of essays this year. What makes one essay rise above the rest? How do you communicate who you truly are in 500 words?',
              connection: 'Proverbs 16:3 tells us, "Commit to the Lord whatever you do, and he will establish your plans." As you prepare to write about your future, remember that God has a purpose for your education and career. Your application is not just a document — it is a step of faith toward the calling He has placed on your life.',
            },
            {
              type: 'text',
              heading: 'The University Application Essay: Your Story in English',
              body: 'The university application essay (also called a "personal statement") is your opportunity to show admissions committees who you are beyond your grades and test scores. Unlike the French dissertation format — which values structured argumentation with thesis, antithesis, and synthesis — the American personal essay prizes **authentic storytelling**, **specific detail**, and **personal voice**.\n\n**Structure of a Strong Application Essay:**\n\n1. **The Hook (Opening):** Begin with a vivid scene, a surprising detail, or a compelling question. Avoid cliches like "Ever since I was a child..." or "Webster\'s dictionary defines..." Instead, drop the reader into a moment: "The power went out during my chemistry exam, and in the darkness, I realized something about resilience."\n\n2. **The Development (Body):** Expand on your opening with specific examples. Show, don\'t tell. Rather than writing "I am a hard worker," describe the 4 a.m. mornings studying by candlelight in Port-au-Prince. Each paragraph should deepen the reader\'s understanding of who you are.\n\n3. **The Reflection (Turning Point):** This is where you demonstrate maturity. What did you learn? How did you grow? Universities want to see self-awareness and intellectual curiosity.\n\n4. **The Forward Look (Conclusion):** Connect your past experiences to your future goals. Why this university? Why this program? How will you contribute to the campus community?\n\n**Common French-Speaker Pitfalls:**\n- Avoid the overly formal tone of French academic writing. American essays value warmth and personality.\n- Do not begin with abstract philosophical statements. Start concrete, get personal.\n- Watch for false cognates: "actuellement" means "currently," not "actually"; "formation" means "training," not "formation."\n- The French "je" can feel presumptuous, but in English, "I" is expected and necessary in personal writing.\n\n**Word Count:** Most application essays are 500-650 words. Every word must earn its place.',
            },
            {
              type: 'text',
              heading: 'Formal Letters and Emails: English vs. French Conventions',
              body: 'French formal correspondence is famously elaborate. The closing formula "Veuillez agreer, Monsieur/Madame, l\'expression de mes sentiments distingues" has no English equivalent. English formal writing is **direct, concise, and professional** without being cold.\n\n**Email Structure:**\n- **Subject line:** Specific and informative ("Application for Fall 2027 Scholarship — Arun Pereira")\n- **Salutation:** "Dear Professor Smith," or "Dear Admissions Committee,"\n- **Opening:** State your purpose immediately. "I am writing to inquire about..." or "I am submitting my application for..."\n- **Body:** 2-3 short paragraphs maximum. One idea per paragraph.\n- **Closing:** "Thank you for your time and consideration." or "I look forward to hearing from you."\n- **Sign-off:** "Sincerely," or "Best regards," (NOT "Cordially yours" or anything longer)\n\n**Statement of Purpose vs. Personal Essay:**\nThe statement of purpose (SOP) is more academic than the personal essay. It focuses on:\n- Your academic background and research interests\n- Why you chose this specific program\n- Your career goals and how this program fits\n- What you will contribute to the academic community\n\nThe SOP should be 1-2 pages, formal but not stiff, and demonstrate clear thinking about your academic trajectory.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Committing Your Plans to the Lord',
              scriptureRef: 'Proverbs 16:3',
              reflection: '"Commit to the Lord whatever you do, and he will establish your plans." Writing a university application is an act of stewardship. God has given you talents, experiences, and a unique story. When you write honestly about who you are and where you want to go, you honor the One who created you with purpose. Do not write to impress — write to be truthful. Let your application reflect the character God is building in you.',
              applicationQuestion: 'How can you write authentically about your goals and experiences while trusting God with the outcome of your application?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Compare a French formal letter closing ("Veuillez agreer l\'expression de mes sentiments les plus distingues") with the English "Sincerely." What does this difference reveal about the two cultures\' approach to formality?',
                'Why do American universities value personal stories over abstract arguments in application essays? How is this different from what you might write for a French university?',
                'Read Proverbs 16:3. How does committing your plans to God change the way you approach something as stressful as a university application?',
              ],
            },
            {
              type: 'practice',
              activity: 'Application Essay Outline',
              prompt: 'Choose one of these common application prompts and create a detailed outline:\n\n1. "Describe a challenge you have overcome and what you learned from it."\n2. "Tell us about a person who has influenced your academic journey."\n3. "Why have you chosen to pursue higher education in English?"\n\nYour outline should include: (a) Your hook — a specific scene or moment, (b) 2-3 body paragraph topics with specific details you will include, (c) Your reflection/turning point, (d) Your forward-looking conclusion. Then write the opening paragraph (100-150 words) using vivid, concrete language.',
            },
            {
              type: 'practice',
              activity: 'Formal Email Drafting',
              prompt: 'Write a formal email to a university admissions office requesting information about their scholarship program. Include: proper subject line, professional greeting, clear statement of purpose, relevant background about yourself, a specific question, and appropriate closing. Then write the same request as it might appear in a French formal letter — and note the key differences in tone, length, and structure.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a complete 500-word university application essay responding to the prompt: "Describe an experience that shaped your desire to pursue higher education." Use the structure taught in this lesson: hook, development with specific details, reflection, and forward look. Avoid French formal conventions — write with authentic personal voice. Time limit: 45 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-evaluation: Review your essay against these criteria. Rate yourself 1-5 on each:\n1. Does my opening hook grab attention with a specific detail or scene?\n2. Do I show rather than tell — using concrete examples instead of abstract claims?\n3. Is my reflection genuine and does it demonstrate growth?\n4. Does my conclusion connect my past to my future goals?\n5. Have I avoided French formal conventions and used natural English voice?\nWrite 2-3 sentences explaining your lowest-rated area and how you would revise it.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Formal Correspondence and Applications',
        estimatedMinutes: 70,
        objectives: [
          'Write a university application essay with a clear structure.',
          'Draft formal emails following English conventions.',
          'Understand the differences between French and English formal writing.',
          'Create a basic statement of purpose for university admission.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you are writing to a university to ask about their program. How would you write this email in French? Now think about how it might be different in English. What changes?',
              connection: 'Proverbs 16:3 reminds us to commit our plans to the Lord. Applying to university is exciting and sometimes scary — but God is with you in every step, including the writing.',
            },
            {
              type: 'text',
              heading: 'Writing for University Applications',
              body: 'When you apply to an English-speaking university, you usually need to write a personal essay. This is very different from French academic writing. In English, admissions committees want to hear **your personal story** — not a formal argument.\n\n**A good application essay has four parts:**\n\n1. **Hook:** Start with something interesting — a moment, a scene, a question. Not "I have always wanted to study..."\n2. **Body:** Share specific examples from your life. Show who you are through details, not general statements.\n3. **Reflection:** What did you learn? How did you change?\n4. **Conclusion:** Connect your experience to your future goals.\n\n**Important differences from French writing:**\n- English is more direct. Get to the point quickly.\n- Use "I" freely — it is expected in personal writing.\n- Skip the long philosophical introductions.\n- End with "Sincerely," not the long French formal closings.\n\n**Watch for these common mistakes:**\n- "Actually" does NOT mean "actuellement" (currently).\n- "Formation" in English means the act of forming something, not "training/education."\n- "Resume" (CV) in American English is 1 page maximum, no photo, no age, no marital status — very different from a French CV!',
            },
            {
              type: 'text',
              heading: 'Formal Emails in English',
              body: 'English formal emails are shorter and more direct than French ones.\n\n**Template:**\n- Subject: Clear and specific ("Inquiry About Fall 2027 Admission")\n- "Dear [Name/Title],"\n- First sentence: State your purpose. "I am writing to ask about..."\n- Middle: 1-2 short paragraphs with details.\n- Closing: "Thank you for your time." or "I look forward to your response."\n- Sign-off: "Sincerely," or "Best regards,"\n\nCompare this to French, where you might write several paragraphs of polite formulas before reaching your point. In English, politeness comes through **clarity and respect for the reader\'s time**.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Committing Your Plans to the Lord',
              scriptureRef: 'Proverbs 16:3',
              reflection: 'God cares about your future. When you write about your goals and dreams in an application, you are sharing the story God is writing in your life. Be honest, be yourself, and trust Him with the results.',
              applicationQuestion: 'How can trusting God help you write more honestly and confidently about yourself?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why do you think English formal writing is shorter and more direct than French formal writing?',
                'What parts of your personal story would be most interesting to a university admissions committee?',
                'How is an American CV/resume different from a French CV? Why do these differences matter?',
              ],
            },
            {
              type: 'practice',
              activity: 'Email Practice',
              prompt: 'Write a formal email to a university admissions office. You want to ask about: (1) application deadlines, (2) scholarship opportunities, and (3) English proficiency requirements. Keep it under 150 words. Use proper email format with subject line, greeting, body, and closing.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 350-word application essay responding to: "Why do you want to pursue higher education?" Include a personal hook, specific details from your life, a moment of reflection, and a connection to your future goals. Time: 35 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-check: Does your essay (1) start with something specific and interesting? (2) Include details from YOUR life? (3) Show what you learned? (4) End with your goals? Write one sentence about what you would improve.',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Formal Correspondence and Applications',
        estimatedMinutes: 50,
        objectives: [
          'Write a basic application essay for university or program admission.',
          'Send a professional email in English.',
          'Know the main differences between French and English formal writing.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Have you ever had to write a formal email or letter in English? What was difficult about it? Today we learn the rules so you can write with confidence.',
              connection: 'Proverbs 16:3 says to commit your plans to God. He is with you as you take this step toward your future.',
            },
            {
              type: 'text',
              heading: 'How to Write for University Applications',
              body: 'When you apply to an English-speaking university, you write a **personal essay**. This is your chance to tell your story.\n\n**Four parts of a good essay:**\n1. **Hook:** Start with something interesting from your life.\n2. **Body:** Share real examples. Be specific.\n3. **Lesson:** What did you learn from this experience?\n4. **Goals:** What do you want to do next?\n\n**Key differences from French:**\n- English is direct. Say what you mean quickly.\n- Use "I" — it is normal in English personal writing.\n- No long formal closings. Just write "Sincerely," at the end.\n- American resumes: 1 page, no photo, no age.\n\n**Common mistakes for French speakers:**\n- "Actually" = "en fait" (NOT "actuellement")\n- Keep emails short — 3-4 sentences is often enough.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Trusting God with Your Future',
              scriptureRef: 'Proverbs 16:3',
              reflection: 'God has a plan for you. When you write about your goals, you are stepping forward in faith. Be honest about who you are.',
              applicationQuestion: 'How does knowing God has a plan for you help when writing about your future?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the biggest difference between writing formally in French and in English?',
                'What story from your life would you tell a university about yourself?',
              ],
            },
            {
              type: 'practice',
              activity: 'Simple Formal Email',
              prompt: 'Write a short email (5-8 sentences) to a university. Ask about their program and how to apply. Use proper format: subject line, greeting, body, closing.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a 250-word essay about yourself for a university application. Answer: "Who are you and what do you want to study?" Include one personal story and your goals. Time: 25 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Check your work: Did you (1) start with something personal? (2) Include real details? (3) Mention your goals? Fix one thing that could be better.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'personal statement', definition: 'An essay written as part of a university application that tells your personal story and explains your goals.', example: 'Her personal statement about growing up bilingual impressed the admissions committee.' },
      { term: 'statement of purpose', definition: 'A formal document explaining your academic interests, research goals, and reasons for applying to a specific program.', example: 'The statement of purpose should clearly explain why you chose this graduate program.' },
      { term: 'admissions committee', definition: 'A group of people at a university who review and make decisions about student applications.', example: 'The admissions committee reads thousands of essays every year.' },
      { term: 'scholarship', definition: 'Financial aid given to a student based on academic achievement, need, or other criteria, which does not need to be repaid.', example: 'She received a full scholarship covering tuition and living expenses.' },
      { term: 'salutation', definition: 'The greeting at the beginning of a letter or email, such as "Dear Professor Smith."', example: 'Always use a formal salutation when emailing someone you have not met.' },
      { term: 'sign-off', definition: 'The closing phrase of a letter or email before your name, such as "Sincerely" or "Best regards."', example: 'In English, "Sincerely" is the most common formal sign-off.' },
      { term: 'false cognate', definition: 'A word that looks similar in two languages but has a different meaning (also called a "false friend" or "faux ami").', example: '"Actually" and "actuellement" are false cognates — "actually" means "en fait," not "currently."' },
      { term: 'narrative arc', definition: 'The structure of a story from beginning through conflict to resolution, used in personal essays to create a compelling flow.', example: 'A strong application essay follows a narrative arc from challenge to growth.' },
    ],
    quiz: [
      { question: 'What is the main purpose of a university application essay?', options: ['To demonstrate formal academic writing skills', 'To share your personal story and show who you are beyond grades', 'To summarize your transcript and test scores', 'To write a five-paragraph argumentative essay'], correctAnswer: 1, explanation: 'American university application essays are personal — they let admissions committees see who you are as a person, not just your academic record.' },
      { question: 'Which opening would be BEST for an application essay?', options: ['"Since the beginning of time, education has been important."', '"Webster\'s dictionary defines success as..."', '"The morning the earthquake hit Port-au-Prince, I was halfway through a math problem."', '"I have always been a hard worker and a good student."'], correctAnswer: 2, explanation: 'The best hooks are specific, vivid, and drop the reader into a real moment. Abstract or cliche openings are weak.' },
      { question: 'What is a "false cognate" (faux ami)?', options: ['A word that is spelled the same in French and English with the same meaning', 'A word that looks similar in two languages but means something different', 'A grammatical rule that works in French but not in English', 'A formal phrase used only in French correspondence'], correctAnswer: 1, explanation: 'False cognates (faux amis) look similar across languages but differ in meaning. "Actually" does not mean "actuellement."' },
      { question: 'How does a typical English formal email differ from a French formal letter?', options: ['English emails are longer and more elaborate', 'English emails use the same formal closings as French', 'English emails are more direct and concise', 'English emails never use greetings'], correctAnswer: 2, explanation: 'English formal correspondence values directness and brevity, unlike the elaborate formulas common in French formal writing.' },
      { question: 'What is the difference between a personal statement and a statement of purpose?', options: ['They are exactly the same thing', 'A personal statement tells your story; a statement of purpose focuses on academic and research goals', 'A statement of purpose is informal; a personal statement is formal', 'A personal statement is for undergraduate; a statement of purpose is only for jobs'], correctAnswer: 1, explanation: 'The personal statement emphasizes your life story and character, while the statement of purpose focuses on your academic interests, research goals, and fit for a specific program.' },
      { question: 'Which sign-off is most appropriate for a formal English email to a professor?', options: ['"Veuillez agreer l\'expression de mes sentiments distingues"', '"XOXO"', '"Sincerely,"', '"Later!"'], correctAnswer: 2, explanation: '"Sincerely," is the standard formal English sign-off. French formal closings are not used in English, and the other options are too informal.' },
      { question: 'What should an American-style resume (CV) NOT include?', options: ['Work experience', 'Education history', 'A photograph and date of birth', 'Contact information'], correctAnswer: 2, explanation: 'American resumes do not include photos, age, date of birth, or marital status — unlike French CVs, which traditionally include these.' },
      { question: 'In an application essay, what does "show, don\'t tell" mean?', options: ['Include photographs with your essay', 'Use specific details and scenes instead of general statements', 'Write in the present tense only', 'Use as many adjectives as possible'], correctAnswer: 1, explanation: '"Show, don\'t tell" means using concrete examples and vivid details rather than making general claims. Instead of "I am determined," describe a specific moment that demonstrates your determination.' },
      { question: 'Which element is essential in the conclusion of an application essay?', options: ['A dictionary definition of your main topic', 'A connection between your past experiences and future goals', 'A list of all your achievements', 'An apology for any weaknesses in your application'], correctAnswer: 1, explanation: 'The conclusion should look forward, connecting what you have experienced to what you want to achieve, showing the admissions committee your direction and purpose.' },
      { question: 'Why is it important for French speakers to adjust their writing style for English applications?', options: ['English universities do not accept essays written in a French style', 'French and English have different expectations for formality, directness, and personal voice', 'English grammar is harder than French grammar', 'French speakers cannot write well in English'], correctAnswer: 1, explanation: 'The two languages have different cultural conventions for formal and personal writing. Adjusting your style shows cultural competence and helps your writing resonate with English-speaking readers.' },
    ],
  },

  // ── W2: Professional Presentations and Public Speaking ──────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Professional Presentations and Public Speaking',
        estimatedMinutes: 90,
        objectives: [
          'Design and deliver a persuasive presentation using data and visual evidence.',
          'Handle audience questions confidently with appropriate hedging and clarification strategies.',
          'Apply professional speaking conventions including pacing, intonation, and signposting.',
          'Analyze the differences between French and English presentation styles.',
          'Use rhetorical techniques to engage and persuade an audience.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Think of the best presentation you have ever seen — in any language. What made it powerful? Was it the speaker\'s confidence? The visuals? The story they told? Now imagine giving that presentation in English to a room of university professors. What skills would you need?',
              connection: 'Moses told God, "I am not eloquent... I am slow of speech" (Exodus 4:10). God responded, "Who gave human beings their mouths? ... Now go; I will help you speak." Public speaking is a gift that God equips us for when we step forward in faith.',
            },
            {
              type: 'text',
              heading: 'The Art of the English-Language Presentation',
              body: 'Professional presentations in English follow different conventions than in French. French academic presentations (exposes) tend to be **text-heavy, reading-based, and formally structured** with a clear plan announced at the start ("Dans un premier temps... dans un second temps..."). English presentations are more **visual, conversational, and audience-centered**.\n\n**Key Principles of English Presentations:**\n\n1. **The 10-20-30 Rule** (Guy Kawasaki): Maximum 10 slides, 20 minutes, 30-point minimum font size. This forces clarity and prevents information overload.\n\n2. **Signposting:** Guide your audience with verbal markers.\n- "Let me start by outlining three key points..."\n- "Moving on to my second argument..."\n- "To summarize what we have covered..."\n- "This brings me to my final point..."\n\n3. **The Problem-Solution Structure:** Present a problem your audience cares about, then offer your solution with evidence. This is more engaging than simply reporting information.\n\n4. **Visual Evidence:** Use graphs, charts, and images — NOT walls of text. Each slide should have ONE main idea. The audience should listen to you, not read your slides.\n\n5. **The Power of Pause:** In English speaking, strategic pauses communicate confidence. French speakers often feel uncomfortable with silence, but a 2-3 second pause after a key point gives your audience time to absorb your message.\n\n**Handling Q&A:**\nThe question-and-answer session is where many French speakers struggle. Strategies:\n- "That\'s an excellent question. Let me address that..." (buys thinking time)\n- "If I understand correctly, you\'re asking about..." (clarifies before answering)\n- "I don\'t have exact figures on that, but I can follow up with you." (honest, professional)\n- Never say "I don\'t know" alone — always add what you DO know or how you will find out.',
            },
            {
              type: 'text',
              heading: 'Using Data and Visuals Effectively',
              body: 'Data makes your argument credible, but only if you present it clearly.\n\n**Rules for Data Presentation:**\n- **One chart, one message.** Do not overload a single visual with multiple data sets.\n- **Label everything.** Axes, units, sources — never make the audience guess.\n- **Tell the story of the data.** Do not just show a graph — explain what it means: "As you can see, enrollment in online education has increased by 300% since 2020, which suggests..."\n- **Cite your sources verbally.** "According to UNESCO\'s 2025 report..." builds credibility.\n\n**Persuasive Speaking Techniques:**\n- **Rhetorical questions:** "Can we really afford to ignore this trend?"\n- **The rule of three:** Group ideas in threes for memorability: "It\'s affordable, accessible, and effective."\n- **Personal connection:** Share a brief relevant anecdote. English-speaking audiences respond to authenticity.\n- **Call to action:** End with a clear statement of what you want your audience to do or believe.\n\n**Voice and Delivery:**\n- Vary your pace. Slow down for important points.\n- Make eye contact (or camera contact in virtual settings).\n- Use hand gestures naturally — avoid the French habit of keeping hands at your sides or behind your back.\n- Project confidence even when nervous. Your audience wants you to succeed.',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Equips Those He Calls',
              scriptureRef: 'Exodus 4:10-12',
              reflection: 'Moses felt inadequate for public speaking, but God promised to be with his mouth. When you stand before an audience — whether in a classroom, a boardroom, or a church — God is with you. Speaking well in English is not just a professional skill; it is a tool for sharing truth, advocating for justice, and proclaiming the gospel to the nations.',
              applicationQuestion: 'When you feel nervous about speaking in English, how can remembering God\'s promise to Moses encourage you?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Compare a typical French expose with an English-style presentation. What are the biggest differences in structure, visual aids, and delivery?',
                'Why is the Q&A session often the hardest part for non-native speakers? What strategies can help you handle unexpected questions?',
                'How does the "rule of three" make a presentation more memorable? Can you think of famous examples?',
                'Read Exodus 4:10-12. How does this passage apply to the challenge of public speaking in a second language?',
              ],
            },
            {
              type: 'practice',
              activity: 'Presentation Outline and Signposting',
              prompt: 'Choose one of these topics and create a 5-slide presentation outline:\n\n1. "Why online education is the future of learning in developing countries"\n2. "The importance of bilingualism in the global economy"\n3. "How technology can improve healthcare access in rural areas"\n\nFor each slide, write: (a) The main point (one sentence), (b) The visual you would include, (c) The signposting phrase you would use to transition to this slide. Then write your opening 60 seconds (approximately 150 words) and your closing call to action.',
            },
            {
              type: 'practice',
              activity: 'Q&A Response Practice',
              prompt: 'Practice responding to these challenging audience questions. Write out your response using appropriate hedging and clarification strategies:\n\n1. "Your data only covers two years. Isn\'t that too small a sample?"\n2. "How does your proposal address the concerns of people who disagree?"\n3. "Can you give a specific example of where this has worked?"\n4. "I\'m not sure I follow your second point. Could you clarify?"\n\nFor each, identify which strategy you used (buying time, clarifying, acknowledging limits, redirecting).',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Prepare a complete 5-minute persuasive presentation on a topic of your choice related to education, technology, or community development. Include: (1) A hook that grabs attention in the first 15 seconds, (2) Three main points with evidence, (3) At least one data reference with a described visual, (4) Signposting language throughout, (5) A memorable conclusion with a call to action. Write out the full script (approximately 500-600 words) with stage directions [PAUSE], [GESTURE TO SLIDE], [MAKE EYE CONTACT] noted in brackets. Time yourself reading it aloud.',
            },
            {
              type: 'practice',
              prompt: 'Self-evaluation: Record yourself (or practice aloud) delivering your presentation. Rate yourself 1-5 on: (1) Clear signposting, (2) Varied pace and intonation, (3) Effective use of described visuals, (4) Confident delivery, (5) Strong conclusion. Write a brief reflection on your biggest strength and one area for improvement.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Professional Presentations and Public Speaking',
        estimatedMinutes: 70,
        objectives: [
          'Plan and deliver a structured presentation in English.',
          'Use signposting language to guide the audience through your talk.',
          'Handle basic audience questions with confidence.',
          'Understand English presentation conventions and how they differ from French.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Have you ever watched a TED Talk or YouTube presentation in English? What made the speaker easy to follow? Today you will learn the skills to give clear, professional presentations.',
              connection: 'Even Moses felt he could not speak well, but God promised to help him (Exodus 4:10-12). God will help you too as you develop your English speaking skills.',
            },
            {
              type: 'text',
              heading: 'Giving Presentations in English',
              body: 'English presentations are different from French ones. In French, you might read from detailed notes with a clear "plan" announced at the beginning. In English, the best presentations are **visual, conversational, and audience-focused**.\n\n**Structure your presentation:**\n1. **Opening:** Grab attention with a question, fact, or short story.\n2. **Main points:** Usually 3 key ideas, each with evidence.\n3. **Conclusion:** Summarize and tell the audience what to do or think.\n\n**Signposting language** helps your audience follow you:\n- "First, I\'d like to talk about..."\n- "Now, let\'s move on to..."\n- "To wrap up, the key takeaway is..."\n\n**Tips for French speakers:**\n- Do not read your slides word-for-word. Slides are visual aids, not scripts.\n- Speak to the audience, not to the screen.\n- Use pauses — silence shows confidence in English.\n- During Q&A: "That\'s a great question..." gives you time to think.',
            },
            {
              type: 'text',
              heading: 'Using Data and Finishing Strong',
              body: 'When you use data in a presentation:\n- **Explain what it means.** Do not just show a graph — say "This chart shows that online learning grew by 300%, which means..."\n- **Keep it simple.** One chart = one message.\n- **Always cite your source.** "According to UNESCO..." sounds professional.\n\n**Strong endings:**\n- Summarize your 3 main points in one sentence each.\n- End with a call to action: "I encourage you to..."\n- Or end with a powerful question: "So the question is: can we afford NOT to act?"',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Helps Us Speak',
              scriptureRef: 'Exodus 4:10-12',
              reflection: 'Moses did not feel ready to speak, but God said, "I will help you speak and teach you what to say." The same God is with you when you present in English.',
              applicationQuestion: 'How can trusting God help you feel more confident when presenting in English?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are two big differences between French and English presentation styles?',
                'Why is signposting language important for the audience?',
                'What should you do if someone asks a question and you do not know the answer?',
              ],
            },
            {
              type: 'practice',
              activity: 'Presentation Planning',
              prompt: 'Choose a topic you care about and plan a 3-minute presentation. Write: (1) Your opening hook (2 sentences), (2) Three main points with one piece of evidence each, (3) Your closing with a call to action. Include signposting phrases between each section.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write the full script for a 3-minute presentation (approximately 350-400 words) on your chosen topic. Include signposting language, at least one reference to data or evidence, and a strong conclusion. Practice reading it aloud and time yourself.',
            },
            {
              type: 'practice',
              prompt: 'Self-check: Did you (1) start with a hook? (2) Use signposting? (3) Include evidence? (4) End with a call to action? Which part was hardest for you, and why?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Professional Presentations and Public Speaking',
        estimatedMinutes: 50,
        objectives: [
          'Give a short, organized presentation in English.',
          'Use basic signposting language.',
          'Answer simple audience questions.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you need to explain an idea to a group in English. How would you organize your thoughts? Today you learn a simple method for speaking clearly.',
              connection: 'God helped Moses speak even though Moses was afraid. He will help you too (Exodus 4:12).',
            },
            {
              type: 'text',
              heading: 'How to Give a Short Presentation',
              body: 'A good English presentation is simple and clear:\n\n1. **Start:** Tell the audience what you will talk about. "Today I want to share three reasons why..."\n2. **Middle:** Share your 3 points. Use "First... Second... Third..."\n3. **End:** Repeat your main idea. "So remember..."\n\n**Helpful phrases:**\n- "Let me start with..."\n- "My next point is..."\n- "To finish, I want to say..."\n\n**Tips:**\n- Speak slowly and clearly.\n- Look at your audience.\n- If someone asks a question, say "Good question!" to give yourself time to think.\n- It is OK to say "I\'m not sure, but I think..."',
            },
            {
              type: 'biblical-worldview',
              theme: 'God Gives Us Words',
              scriptureRef: 'Exodus 4:12',
              reflection: 'God told Moses, "I will help you speak." He gives us the words we need when we trust Him.',
              applicationQuestion: 'When do you need God\'s help most when speaking English?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are three signposting words you can use in a presentation?',
                'What should you do if you forget what to say?',
              ],
            },
            {
              type: 'practice',
              activity: 'Mini Presentation Plan',
              prompt: 'Plan a 2-minute presentation about something you know well (your hometown, a hobby, or a book you like). Write: (1) Your opening sentence, (2) Three points with "First... Second... Third...", (3) Your closing sentence.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write out your 2-minute presentation (about 250 words). Use signposting words. Practice saying it aloud. Time yourself.',
            },
            {
              type: 'practice',
              prompt: 'Did you use "First, Second, Third"? Did you speak for about 2 minutes? What was the hardest part?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'signposting', definition: 'Words and phrases used in a presentation to guide the audience through the structure, like "First," "Moving on to," "To summarize."', example: 'Good signposting helps your audience follow your presentation without getting lost.' },
      { term: 'call to action', definition: 'A statement at the end of a presentation that tells the audience what you want them to do, think, or believe.', example: 'Her call to action was clear: "Sign the petition before you leave today."' },
      { term: 'Q&A (Question and Answer)', definition: 'A session after a presentation where the audience can ask questions and the speaker responds.', example: 'The Q&A session lasted ten minutes and included challenging questions about the data.' },
      { term: 'hedging', definition: 'Using cautious language to soften statements or express uncertainty politely, such as "It seems that..." or "This might suggest..."', example: 'When you are not 100% sure, hedging shows intellectual honesty: "The data seems to suggest..."' },
      { term: 'eye contact', definition: 'Looking directly at your audience while speaking, which communicates confidence and engagement in English-speaking cultures.', example: 'Making eye contact with different sections of the audience keeps everyone engaged.' },
      { term: 'rhetorical question', definition: 'A question asked for effect, not expecting an actual answer, used to make the audience think.', example: '"Can we really afford to do nothing?" is a rhetorical question designed to persuade.' },
      { term: 'pace', definition: 'The speed at which you speak, which should be varied for emphasis — slower for important points, faster for less critical information.', example: 'He slowed his pace when delivering the most important statistic, letting it sink in.' },
      { term: 'visual aid', definition: 'Any image, chart, graph, or object used during a presentation to help the audience understand information.', example: 'The bar chart was an effective visual aid that made the growth trend immediately clear.' },
    ],
    quiz: [
      { question: 'What is the main difference between French and English presentation styles?', options: ['English presentations are always longer', 'English presentations are more visual and conversational; French are more text-heavy and formal', 'French presentations never use slides', 'English presentations do not have conclusions'], correctAnswer: 1, explanation: 'English presentations emphasize visual slides, audience engagement, and conversational delivery, while French presentations tend to be more text-based and formally structured.' },
      { question: 'What is "signposting" in a presentation?', options: ['Holding up signs during your talk', 'Using verbal cues to guide the audience through the structure of your presentation', 'Writing your main points on a whiteboard', 'Passing out a printed outline'], correctAnswer: 1, explanation: 'Signposting means using phrases like "First," "Moving on to," and "To summarize" to help the audience follow the flow of your presentation.' },
      { question: 'What should you do if an audience member asks a question you cannot fully answer?', options: ['Ignore the question and move on', 'Make up an answer to seem knowledgeable', 'Acknowledge the question, share what you do know, and offer to follow up', 'Tell the person their question is not relevant'], correctAnswer: 2, explanation: 'Honest, professional responses build credibility. Saying "I don\'t have exact figures, but I can follow up" is much better than guessing or avoiding.' },
      { question: 'What is a "call to action"?', options: ['The first sentence of your presentation', 'A request for the audience to be quiet', 'A closing statement that tells the audience what to do or think', 'A list of your sources'], correctAnswer: 2, explanation: 'A call to action gives your presentation purpose by telling the audience what you want them to do, think, or believe as a result of your talk.' },
      { question: 'Why is strategic pausing effective in English presentations?', options: ['It shows you forgot what to say', 'It gives the audience time to absorb key points and signals confidence', 'It is required by formal English grammar rules', 'It makes the presentation shorter'], correctAnswer: 1, explanation: 'Pauses after key points allow the audience to process information and signal that the speaker is confident and in control.' },
      { question: 'What does "hedging" mean in professional communication?', options: ['Speaking very loudly to show confidence', 'Using cautious language to soften statements or express uncertainty politely', 'Avoiding the topic entirely', 'Repeating the same point multiple times'], correctAnswer: 1, explanation: 'Hedging uses phrases like "It seems that..." or "The evidence suggests..." to express ideas without overstating certainty, which is valued in academic and professional English.' },
      { question: 'How should data be presented on a slide?', options: ['Include as much data as possible on each slide', 'One chart with one clear message per slide, properly labeled', 'Use only text to describe the data', 'Never include the data source'], correctAnswer: 1, explanation: 'Effective data presentation follows the "one chart, one message" rule with clear labels and cited sources.' },
      { question: 'What is the "rule of three" in presentations?', options: ['Always use exactly three slides', 'Present three presentations per day', 'Group ideas in sets of three for memorability', 'Speak for exactly three minutes'], correctAnswer: 2, explanation: 'The rule of three is a rhetorical technique where ideas grouped in threes are more memorable and impactful: "It\'s affordable, accessible, and effective."' },
      { question: 'Which phrase is BEST for transitioning between main points?', options: ['"OK, um, so next..."', '"Moving on to my second point, let\'s examine..."', '"Whatever, here\'s the next thing"', '"And also..."'], correctAnswer: 1, explanation: '"Moving on to my second point" is clear, professional signposting that helps the audience follow the structure.' },
      { question: 'Why might French speakers need to adjust their presentation delivery for English audiences?', options: ['English audiences prefer less organized presentations', 'French speakers tend to be more formal and text-dependent; English audiences prefer visual, conversational delivery', 'English has fewer words than French', 'French speakers always talk too fast'], correctAnswer: 1, explanation: 'French presentation conventions are typically more formal and text-heavy. Adapting to English conventions means using more visuals, making eye contact, and adopting a more conversational tone.' },
    ],
  },

  // ── W3: Networking and Professional Communication ───────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Networking and Professional Communication',
        estimatedMinutes: 90,
        objectives: [
          'Use professional networking language appropriate for English-speaking contexts.',
          'Create a compelling LinkedIn profile in English with culturally appropriate conventions.',
          'Deliver a polished elevator pitch in under 60 seconds.',
          'Navigate cross-cultural professional communication differences between French and English contexts.',
          'Build and maintain professional relationships through follow-up communication.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You are at an international education conference. A university dean approaches you and says, "Tell me about yourself." You have 60 seconds. What do you say? How do you make an impression that leads to a real connection?',
              connection: '"Commit to the Lord whatever you do, and he will establish your plans" (Proverbs 16:3). Professional networking is not just self-promotion — it is building relationships that God can use for His purposes. Every connection you make could open a door He has prepared.',
            },
            {
              type: 'text',
              heading: 'Professional Networking in English: A Cultural Guide',
              body: 'Professional networking in English-speaking countries — especially the United States — operates under different cultural norms than in France or francophone countries.\n\n**French vs. American Networking Culture:**\n\n| Aspect | French Style | American Style |\n|--------|-------------|----------------|\n| Introductions | Formal, title-focused | First-name basis quickly |\n| Small talk | Limited, seen as superficial | Essential, builds rapport |\n| Business cards | Exchanged formally | Less common now; LinkedIn instead |\n| Follow-up | Through formal channels | Casual email or LinkedIn message |\n| Self-promotion | Seen as inappropriate | Expected and valued |\n\nThe biggest adjustment for French speakers is **self-promotion**. In French culture, talking about your achievements can seem "vantard" (boastful). In American professional culture, it is **expected**. Not talking about your accomplishments is often interpreted as lacking confidence or not having achievements to share.\n\n**The Elevator Pitch:**\nAn elevator pitch is a 30-60 second introduction that communicates who you are, what you do, and what you are looking for. Structure:\n\n1. **Hook:** Start with your name and a compelling statement. "Hi, I\'m [Name]. I\'m passionate about making quality education accessible through technology."\n2. **Background:** One sentence about your experience. "I\'ve spent the last two years studying bilingual education and its impact on student outcomes."\n3. **Value:** What you offer or what makes you unique. "I bring a unique perspective as a bilingual French-English speaker with experience in both educational systems."\n4. **Ask:** What you want. "I\'d love to learn more about your program and how I might contribute."\n\n**Small Talk Strategies:**\nAmerican networking always begins with small talk. Safe topics: the event itself, recent news in the field, travel, shared professional interests. Avoid: politics, religion (in professional contexts), salary, personal problems.\n\nUseful phrases:\n- "What brings you to this conference?"\n- "How did you get into this field?"\n- "That\'s really interesting — tell me more about that."\n- "It was great meeting you. Would you mind if I connected with you on LinkedIn?"',
            },
            {
              type: 'text',
              heading: 'LinkedIn and Digital Professional Presence',
              body: 'LinkedIn is the primary professional networking platform in English-speaking countries. Your profile is essentially a digital first impression.\n\n**LinkedIn Profile in English (vs. French conventions):**\n\n- **Headline:** NOT just your job title. Use a value statement: "Bilingual Educator | Passionate About Educational Technology | B2 English Certified"\n- **About section:** Written in first person ("I am..."), 3-5 short paragraphs. Tell your professional story with personality. This is NOT a formal French CV introduction.\n- **Experience:** Use action verbs and quantify results. "Tutored 15 students, improving average test scores by 20%" NOT "Responsible for tutoring students."\n- **Photo:** Professional but approachable. No formal studio portraits with arms crossed (common in French LinkedIn profiles). A natural, smiling headshot works best.\n- **Connections:** In American LinkedIn culture, it is acceptable to connect with people you have met briefly. Always include a personalized note: "Hi Dr. Smith, I enjoyed your presentation at the conference. I\'d love to stay in touch."\n\n**Follow-Up Communication:**\nThe real networking happens AFTER the initial meeting. Within 24-48 hours:\n- Send a LinkedIn connection request with a personalized note.\n- Or send a brief email: "Dear Professor Smith, It was a pleasure meeting you at [event]. I was particularly interested in your comments about [topic]. I would love to continue our conversation. Best regards, [Name]"\n\nThis follow-up culture is stronger in American professional contexts than in French ones, where relationships develop more slowly through institutional channels.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Building Relationships for God\'s Purposes',
              scriptureRef: 'Proverbs 16:3; Proverbs 27:17',
              reflection: '"As iron sharpens iron, so one person sharpens another" (Proverbs 27:17). Professional networking is not worldly self-promotion when done with integrity. Every person God brings into your path is there for a reason. Your English skills are a tool to connect with people across cultures and nations — potentially opening doors for the gospel, for service, and for the fulfillment of God\'s purposes in your life.',
              applicationQuestion: 'How can you approach networking with genuine interest in others rather than just self-promotion? How does Proverbs 27:17 change your view of professional relationships?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why is self-promotion considered positive in American professional culture but often seen negatively in French culture? How do you navigate this difference?',
                'Compare a French-style LinkedIn profile with the American style described. What changes would you make to your profile?',
                'Why is follow-up communication so important in American networking? How is this different from how professional relationships develop in francophone contexts?',
                'How does Proverbs 27:17 ("as iron sharpens iron") apply to professional networking?',
              ],
            },
            {
              type: 'practice',
              activity: 'Elevator Pitch Workshop',
              prompt: 'Write three versions of your elevator pitch:\n\n1. **Academic version** (for a university admissions event): Who are you as a student? What do you want to study? Why?\n2. **Professional version** (for a career fair): What skills do you have? What value do you offer?\n3. **Casual version** (for a social networking event): Who are you as a person? What are you passionate about?\n\nEach should be 60-90 words (about 30-45 seconds when spoken). Include your hook, background, value, and ask.',
            },
            {
              type: 'practice',
              activity: 'LinkedIn Profile Draft',
              prompt: 'Write a complete LinkedIn "About" section in English (150-200 words). Include:\n- A compelling opening sentence about who you are professionally\n- Your educational background and key achievements\n- Your skills and what makes you unique (emphasize bilingual abilities)\n- Your goals and what you are looking for\n- A closing line that invites connection\n\nAlso write a LinkedIn headline (under 120 characters) that goes beyond a simple job title.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Networking simulation: Write out a complete networking conversation at a university open day. Include: (1) Your approach and small talk opening, (2) Your elevator pitch delivered naturally in conversation, (3) Two thoughtful questions you ask the other person, (4) Your closing and follow-up proposal. Then write the follow-up email you would send within 24 hours. Total writing: approximately 400-500 words.',
            },
            {
              type: 'practice',
              prompt: 'Self-evaluation: Rate yourself 1-5 on each networking skill: (1) Small talk comfort, (2) Elevator pitch clarity, (3) Asking good questions, (4) Cultural awareness (French vs. English norms), (5) Follow-up communication. For your lowest-rated skill, write a specific plan for improvement.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Networking and Professional Communication',
        estimatedMinutes: 70,
        objectives: [
          'Introduce yourself professionally in English in various contexts.',
          'Create a basic LinkedIn profile following English-language conventions.',
          'Deliver a clear elevator pitch.',
          'Understand key differences between French and American professional communication.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If you had 30 seconds to tell an important person about yourself, what would you say? Today you learn how to make a great first impression in English.',
              connection: 'Proverbs 16:3 tells us to commit our plans to God. Every professional connection is part of His plan for your life.',
            },
            {
              type: 'text',
              heading: 'Professional Networking in English',
              body: 'Networking means building professional relationships. In English-speaking countries, especially the US, networking is different from French culture.\n\n**Key differences:**\n- Americans use **first names** quickly — even with professors and bosses.\n- **Small talk** is important. Ask about the event, their work, or their interests before talking business.\n- **Self-promotion is OK.** In French culture, it can seem boastful. In American culture, it shows confidence.\n- **LinkedIn** has replaced business cards. Connect with people you meet and send a personalized message.\n\n**The Elevator Pitch** (30-60 seconds):\n1. Your name and what you do: "Hi, I\'m Marie. I\'m studying international education."\n2. Your background: "I grew up bilingual in Haiti and speak both French and English."\n3. What makes you special: "I want to combine technology and education to help students in developing countries."\n4. What you want: "I\'d love to hear about your program."',
            },
            {
              type: 'text',
              heading: 'Your LinkedIn Profile in English',
              body: 'Your LinkedIn profile is your online professional identity.\n\n**Headline:** More than just a title. Example: "Bilingual Student | Education Enthusiast | Future Teacher"\n\n**About section:** Write 3-4 sentences about yourself in first person. Be warm and professional.\n\n**Experience:** Use action verbs: "Tutored 10 students" NOT "Was responsible for tutoring."\n\n**Photo:** Smile! American LinkedIn photos are friendly and approachable — not the formal studio photos common on French profiles.\n\n**Connecting:** After meeting someone, send a connection request within 24 hours with a short note: "Hi, it was great meeting you at the conference!"',
            },
            {
              type: 'biblical-worldview',
              theme: 'Relationships Have Purpose',
              scriptureRef: 'Proverbs 27:17',
              reflection: '"As iron sharpens iron, so one person sharpens another." God brings people into our lives for a reason. Professional relationships can become opportunities to serve others and share your faith.',
              applicationQuestion: 'How can you build professional relationships that honor God?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the biggest cultural difference between French and American networking?',
                'Why is small talk important in English-speaking professional settings?',
                'How would you adjust your LinkedIn profile from a French style to an American style?',
              ],
            },
            {
              type: 'practice',
              activity: 'Elevator Pitch',
              prompt: 'Write an elevator pitch (60-80 words) introducing yourself for a university open day. Include: your name, your background, what you want to study, and why you are interesting. Practice saying it in under 45 seconds.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write: (1) A LinkedIn "About" section (100-150 words), (2) A LinkedIn headline (under 120 characters), and (3) A follow-up email to someone you met at a university event (50-75 words). Make sure all three follow English conventions, not French ones.',
            },
            {
              type: 'practice',
              prompt: 'Self-check: Is your LinkedIn "About" section in first person? Does your headline go beyond a simple title? Is your follow-up email brief and specific? What would you change?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Networking and Professional Communication',
        estimatedMinutes: 50,
        objectives: [
          'Introduce yourself in a professional setting in English.',
          'Write a basic LinkedIn profile.',
          'Understand why American networking is different from French.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How would you introduce yourself to an important person in English? Today you will learn a simple way to make a good impression.',
              connection: 'God brings people into your life for a reason. Trust Him as you build new connections (Proverbs 27:17).',
            },
            {
              type: 'text',
              heading: 'Introducing Yourself Professionally',
              body: 'When you meet someone professionally in English, follow this pattern:\n\n1. **Say your name:** "Hi, I\'m [Name]."\n2. **Say what you do:** "I\'m studying [subject] at [school]."\n3. **Say something interesting:** "I speak French and English, and I want to work in education."\n4. **Ask about them:** "What do you do?"\n\n**American style is different from French:**\n- Use first names, not titles.\n- Small talk is normal — ask about their work or the event.\n- It is OK to talk about your achievements.\n\n**LinkedIn:** Make a profile with a friendly photo, a headline about what you do, and a short description of yourself. Connect with people after meeting them.',
            },
            {
              type: 'biblical-worldview',
              theme: 'People Matter to God',
              scriptureRef: 'Proverbs 27:17',
              reflection: 'Every person you meet matters to God. Professional connections can become friendships and opportunities to serve.',
              applicationQuestion: 'How can you show genuine interest in the people you meet?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are two things you say when introducing yourself professionally?',
                'Why is it OK to talk about your achievements in American culture?',
              ],
            },
            {
              type: 'practice',
              activity: 'Self-Introduction',
              prompt: 'Write a 30-second introduction (40-50 words) for meeting someone at a school event. Include your name, what you study, one interesting fact, and a question for them.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a short LinkedIn "About" section (60-80 words) and a headline (under 120 characters). Keep it simple and friendly.',
            },
            {
              type: 'practice',
              prompt: 'Practice: Say your self-introduction out loud 3 times. Does it feel natural? What would you change?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'elevator pitch', definition: 'A brief, persuasive introduction of yourself lasting 30-60 seconds, named because it should be short enough for an elevator ride.', example: 'She delivered her elevator pitch perfectly: in 45 seconds, the dean knew exactly who she was and what she wanted.' },
      { term: 'networking', definition: 'The process of building and maintaining professional relationships that can lead to opportunities, advice, and collaboration.', example: 'Networking at the conference led to an internship opportunity she never expected.' },
      { term: 'small talk', definition: 'Light, informal conversation about neutral topics used to build rapport before discussing business or serious matters.', example: 'They started with small talk about the weather before discussing the project details.' },
      { term: 'LinkedIn', definition: 'A professional social media platform used for networking, job searching, and sharing professional achievements.', example: 'His LinkedIn profile showcased his bilingual skills and volunteer experience.' },
      { term: 'follow-up', definition: 'Communication sent after an initial meeting to maintain the connection and express continued interest.', example: 'She sent a follow-up email within 24 hours, thanking the professor for their time.' },
      { term: 'rapport', definition: 'A positive, trusting relationship between people, often built through shared interests or good communication.', example: 'Building rapport with the interviewer helped her feel relaxed during the conversation.' },
      { term: 'cross-cultural communication', definition: 'The exchange of information between people from different cultural backgrounds, requiring awareness of different norms and expectations.', example: 'Cross-cultural communication skills are essential when networking in international settings.' },
      { term: 'professional presence', definition: 'The overall impression you create through your appearance, behavior, communication style, and online profiles.', example: 'Her professional presence — from her LinkedIn profile to her confident handshake — impressed the hiring manager.' },
    ],
    quiz: [
      { question: 'What is an "elevator pitch"?', options: ['A presentation given in an elevator', 'A brief 30-60 second professional self-introduction', 'A sales technique for selling products', 'A type of formal letter'], correctAnswer: 1, explanation: 'An elevator pitch is a concise, prepared introduction that communicates who you are and what you want in about 30-60 seconds.' },
      { question: 'How does American professional networking differ from French networking?', options: ['Americans never network', 'Americans are more formal than the French', 'Americans use first names quickly, value small talk, and accept self-promotion', 'Americans only network online'], correctAnswer: 2, explanation: 'American networking culture emphasizes informality (first names), small talk, self-promotion, and quick relationship-building compared to the more formal French approach.' },
      { question: 'What should a LinkedIn headline include?', options: ['Only your job title and company', 'A value statement about who you are and what you offer', 'Your home address and phone number', 'Your GPA and test scores'], correctAnswer: 1, explanation: 'A strong LinkedIn headline goes beyond a simple job title to communicate your value and professional identity.' },
      { question: 'Why is small talk important in English-speaking professional settings?', options: ['It wastes time intentionally', 'It builds rapport and creates comfort before discussing serious topics', 'It is required by law', 'It replaces actual work'], correctAnswer: 1, explanation: 'Small talk builds rapport and trust, making subsequent professional conversations more productive and comfortable.' },
      { question: 'What should you do within 24-48 hours of meeting a professional contact?', options: ['Wait for them to contact you first', 'Send a follow-up message or LinkedIn connection request', 'Send a formal French-style letter', 'Post about them on social media without permission'], correctAnswer: 1, explanation: 'Prompt follow-up is essential in American networking culture. A brief, personalized message within 24-48 hours keeps the connection alive.' },
      { question: 'What is the biggest adjustment French speakers must make for American networking?', options: ['Learning to speak faster', 'Becoming comfortable with self-promotion, which is valued rather than seen as boastful', 'Wearing different clothes', 'Using more formal language'], correctAnswer: 1, explanation: 'In French culture, self-promotion can seem boastful, but in American professional culture, talking about your achievements is expected and shows confidence.' },
      { question: 'Which follow-up email opening is most appropriate?', options: ['"Remember me? We talked yesterday."', '"Dear Sir or Madam, I am writing to inform you..."', '"It was a pleasure meeting you at the conference yesterday."', '"Hey! What\'s up?"'], correctAnswer: 2, explanation: 'A warm but professional opening that references your meeting is the most appropriate way to begin a follow-up email.' },
      { question: 'How should LinkedIn photos differ between French and American conventions?', options: ['American photos should be formal studio portraits', 'American photos should be friendly and approachable rather than formal', 'Both cultures use the same style', 'Americans do not use photos on LinkedIn'], correctAnswer: 1, explanation: 'American LinkedIn conventions favor approachable, natural-looking photos rather than the formal studio portraits more common in French professional culture.' },
      { question: 'What are the four elements of a good elevator pitch?', options: ['Name, age, address, phone number', 'Hook/name, background, value/uniqueness, ask/goal', 'Thesis, antithesis, synthesis, conclusion', 'Introduction, body, conclusion, bibliography'], correctAnswer: 1, explanation: 'A strong elevator pitch includes your name/hook, relevant background, what makes you unique/valuable, and what you are looking for.' },
      { question: 'According to Proverbs 27:17, how should we view professional relationships?', options: ['As purely transactional exchanges', 'As iron sharpening iron — mutual growth and development', 'As something to avoid', 'As a necessary evil'], correctAnswer: 1, explanation: 'Proverbs 27:17 teaches that good relationships involve mutual sharpening and growth, which gives networking a higher purpose than mere self-interest.' },
    ],
  },

  // ── W4: Professional Portfolio (PROJECT) ───────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Professional Portfolio',
        estimatedMinutes: 90,
        objectives: [
          'Compile a complete professional portfolio including a university application essay, professional CV, LinkedIn profile, and statement of purpose.',
          'Demonstrate mastery of English formal writing conventions across multiple document types.',
          'Apply cross-cultural awareness by creating documents appropriate for English-speaking audiences.',
          'Reflect on personal and academic growth throughout the course.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Over the past three weeks, you have learned to write application essays, give presentations, and network professionally. Now you will bring it all together in a portfolio that represents your professional identity in English. This portfolio could be the foundation of your actual university application.',
              connection: '"Commit to the Lord whatever you do, and he will establish your plans" (Proverbs 16:3). This portfolio is not just an assignment — it is a practical step toward the future God has for you. Each document represents your stewardship of the skills He has given you.',
            },
            {
              type: 'text',
              heading: 'The Professional Portfolio: Putting It All Together',
              body: 'Your professional portfolio contains four documents that work together to present a complete picture of who you are:\n\n**1. University Application Essay (500-650 words)**\nRevise and polish the essay you drafted in Week 1. Ensure it follows the hook-development-reflection-forward look structure. Remove any lingering French conventions. Read it aloud to check for natural voice.\n\n**2. Professional CV/Resume (1 page)**\nAmerican format: no photo, no date of birth, no marital status. Include: contact information, education, relevant experience, skills (including bilingual French-English), and any awards or volunteer work. Use action verbs and quantify achievements.\n\n**3. LinkedIn Profile (headline + About section + experience)**\nFinalize the profile you drafted in Week 3. Ensure it is written in first person with a compelling headline and warm but professional tone.\n\n**4. Statement of Purpose (400-500 words)**\nWrite a statement of purpose for a specific program you are interested in. Focus on academic interests, relevant experience, why this program, and your career goals. More formal than the personal essay but still in your own voice.\n\n**Portfolio Review Criteria:**\n- Cultural appropriateness (English conventions, not French)\n- Consistency across documents (same story told from different angles)\n- Professional quality (no grammar errors, proper formatting)\n- Authentic voice (your personality comes through)\n- Biblical values (integrity, honesty, purpose)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Faithful Stewardship of Talents',
              scriptureRef: 'Proverbs 16:3; Matthew 25:21',
              reflection: '"Well done, good and faithful servant!" (Matthew 25:21). Your portfolio represents months of hard work developing English proficiency. God honors faithful effort. This portfolio is your way of saying, "Lord, I have used what you gave me." Whether it leads to university admission, a scholarship, or a professional opportunity, trust that God will use your faithfulness for His glory.',
              applicationQuestion: 'How does the parable of the talents (Matthew 25:14-30) relate to your investment in learning English and building this portfolio?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do your four portfolio documents work together to tell a consistent story about who you are?',
                'What was the most challenging cultural adjustment in writing these documents for an English-speaking audience?',
                'How does your portfolio reflect your values as a Christian? Can you see God\'s fingerprints in the story you are telling?',
              ],
            },
            {
              type: 'practice',
              activity: 'Portfolio Peer Review',
              prompt: 'Exchange portfolios with a partner (or review your own with fresh eyes). For each document, evaluate:\n1. Does it follow English conventions (not French)?\n2. Is the tone appropriate for the document type?\n3. Are there any grammar, spelling, or formatting errors?\n4. Does it sound like a real person (authentic voice)?\n5. Is it consistent with the other documents?\n\nProvide at least two specific compliments and two specific suggestions for each document.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Complete your professional portfolio with all four polished documents:\n\n1. **University Application Essay** (500-650 words): Revised and polished, following hook-development-reflection-forward look structure.\n2. **Professional CV/Resume** (1 page): American format with action verbs and quantified achievements.\n3. **LinkedIn Profile** (headline + About section of 150-200 words + one experience entry).\n4. **Statement of Purpose** (400-500 words): For a specific program, explaining your academic interests and goals.\n\nInclude a brief reflection (100 words) on how completing this portfolio has prepared you for the next step in your academic or professional journey.',
            },
            {
              type: 'practice',
              prompt: 'Final self-assessment: Rate your portfolio on a scale of 1-5 for each criterion: (1) Professional quality, (2) Cultural appropriateness, (3) Authentic voice, (4) Consistency across documents, (5) Readiness for actual use. What is the single most important revision you would make before submitting these documents to a real university?',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Professional Portfolio',
        estimatedMinutes: 70,
        objectives: [
          'Create a portfolio with a university essay, CV, LinkedIn profile, and statement of purpose.',
          'Apply English writing conventions across different document types.',
          'Demonstrate cross-cultural awareness in professional writing.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This week you put together everything you have learned into a portfolio — a collection of professional documents that could help you get into university or start your career.',
              connection: '"Commit to the Lord whatever you do" (Proverbs 16:3). This portfolio represents your hard work and God\'s faithfulness in helping you grow.',
            },
            {
              type: 'text',
              heading: 'Building Your Portfolio',
              body: 'Your portfolio includes four documents:\n\n**1. Application Essay** (350-450 words): Use the hook-body-reflection-conclusion structure from Week 1. Revise what you already wrote.\n\n**2. CV/Resume** (1 page): American style — no photo, no age. Include education, experience, skills (bilingual!), and achievements.\n\n**3. LinkedIn Profile**: Headline + About section + one experience entry. First person, warm, professional.\n\n**4. Statement of Purpose** (300-400 words): Explain what you want to study and why. More academic than the personal essay.\n\n**Remember:** All documents should follow English conventions, not French. Read everything aloud to check for natural flow.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Using Your Talents',
              scriptureRef: 'Matthew 25:21',
              reflection: 'God is pleased when we use the abilities He gives us. Your portfolio shows how you have grown in English — that is faithful stewardship.',
              applicationQuestion: 'How has building English skills been an act of faithful stewardship?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which document in your portfolio was hardest to write? Why?',
                'What French conventions did you have to change for English?',
              ],
            },
            {
              type: 'practice',
              activity: 'Self-Review',
              prompt: 'Read through each of your four documents. For each one, check: (1) Does it follow English style? (2) Is the tone right? (3) Are there errors to fix? Write one specific improvement for each document.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Submit your complete portfolio: (1) Application essay (350-450 words), (2) One-page CV, (3) LinkedIn headline + About section (100-150 words), (4) Statement of purpose (300-400 words). Include a 50-word reflection on what you learned this unit.',
            },
            {
              type: 'practice',
              prompt: 'Rate your portfolio 1-5 on: professional quality, English conventions, authentic voice, completeness. What would you revise first?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Professional Portfolio',
        estimatedMinutes: 50,
        objectives: [
          'Create a basic portfolio with an essay, CV, and LinkedIn profile.',
          'Follow English writing conventions for professional documents.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This week you create your professional documents in English. These are real tools you can use for university or job applications.',
              connection: 'God is proud when you use your gifts. Your growing English skills are a gift He has given you (Matthew 25:21).',
            },
            {
              type: 'text',
              heading: 'Your Portfolio',
              body: 'Create three documents:\n\n**1. Application Essay** (250-300 words): Tell a personal story, share what you learned, mention your goals.\n\n**2. CV/Resume** (1 page): Name, contact info, education, skills (include "Bilingual: French and English"), any experience.\n\n**3. LinkedIn Profile**: A headline and short "About" section (60-80 words).\n\nRemember: American style. No photo on CV. Keep everything simple and clear.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Faithful With What God Gives',
              scriptureRef: 'Matthew 25:21',
              reflection: 'God says "Well done!" when we use what He gives us. Your English skills are growing, and that matters.',
              applicationQuestion: 'What skills has God given you that this portfolio showcases?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which document was easiest for you? Which was hardest?',
                'What is one thing you would change about your documents?',
              ],
            },
            {
              type: 'practice',
              activity: 'Document Check',
              prompt: 'Read your essay and CV. Fix any errors you find. Make sure they follow English style (no photo on CV, direct language in essay).',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Submit: (1) Your application essay (250-300 words), (2) Your one-page CV, (3) Your LinkedIn headline and About section. Write one sentence about what you are most proud of in your portfolio.',
            },
            {
              type: 'practice',
              prompt: 'Look at your portfolio one more time. Is it ready to use for a real application? What is the one thing you would improve?',
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
// UNIT 8: ADVANCED INTEGRATED SKILLS
// ═══════════════════════════════════════════════════════════════════════════════

const unit8Lessons: EnrichedLesson[] = [

  // ── W1: Synthesis and Analysis Across Sources ──────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Synthesis and Analysis Across Sources',
        estimatedMinutes: 90,
        objectives: [
          'Synthesize information from multiple reading and listening sources into a coherent response.',
          'Write integrated responses that combine evidence from diverse sources.',
          'Compare and evaluate conflicting viewpoints with nuanced analysis.',
          'Master the TOEFL integrated writing task format and scoring criteria.',
          'Apply critical thinking frameworks to evaluate source reliability and bias.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You read an article that says social media helps students learn. Then you listen to a lecture that says social media harms academic performance. Both cite research. Both sound convincing. How do you decide what to believe? How do you write about both perspectives without simply picking a side?',
              connection: 'Proverbs 18:17 warns, "In a lawsuit the first to speak seems right, until someone comes forward and cross-examines." Truth requires hearing multiple perspectives and weighing evidence carefully. This is the heart of synthesis — and it honors the God who IS truth.',
            },
            {
              type: 'text',
              heading: 'The Art of Synthesis: Beyond Summary',
              body: 'Synthesis is the most advanced academic skill in English. It goes beyond simply summarizing sources — it requires you to **combine, compare, and create new understanding** from multiple texts.\n\n**Summary vs. Synthesis:**\n- **Summary:** "Article A says X. Article B says Y." (Two separate reports)\n- **Synthesis:** "While Article A argues X based on laboratory data, Article B complicates this view by showing Y in real-world conditions, suggesting that the relationship between X and Y depends on context." (One integrated analysis)\n\n**The TOEFL Integrated Writing Task:**\nThis is the most direct test of synthesis skills. You will:\n1. Read a passage (3 minutes, approximately 250-300 words)\n2. Listen to a lecture that challenges or supports the reading (2 minutes)\n3. Write a response explaining how the lecture relates to the reading (20 minutes, 150-225 words)\n\nThe key is **showing relationships** between sources:\n- "The lecturer contradicts the reading by arguing that..."\n- "While the passage claims..., the professor provides evidence that..."\n- "The lecture supports the reading\'s point about... but adds the qualification that..."\n\n**Evaluating Conflicting Sources:**\nWhen sources disagree, analyze:\n1. **Evidence quality:** Which source has stronger evidence? Peer-reviewed research vs. anecdotal claims?\n2. **Scope:** Does one source generalize too broadly from limited data?\n3. **Bias:** Does either source have a vested interest in a particular conclusion?\n4. **Recency:** Is one source using more current data?\n5. **Methodology:** How was the research conducted? Are there flaws?\n\n**French vs. English Synthesis Conventions:**\nIn French academic writing (the commentaire compose or dissertation), you present thesis and antithesis in separate sections before synthesis. In English, integration happens throughout — you weave sources together paragraph by paragraph, showing their relationships continuously rather than in distinct blocks.',
            },
            {
              type: 'text',
              heading: 'Integrated Response Strategies',
              body: '**Template for TOEFL Integrated Response:**\n\nParagraph 1: "The reading passage discusses [topic] and argues that [main claim]. However, the lecture challenges this view by presenting [counter-evidence/alternative perspective]."\n\nParagraph 2: "First, the reading states that [point 1]. The lecturer counters this by explaining that [counter-point 1], citing [evidence]."\n\nParagraph 3: "Second, the passage claims [point 2]. In contrast, the professor argues [counter-point 2], noting that [evidence]."\n\nParagraph 4: "Finally, the reading suggests [point 3]. The lecturer disputes this, pointing out that [counter-point 3]."\n\n**Key Vocabulary for Synthesis:**\n- Contrast: "however," "in contrast," "on the other hand," "conversely," "nevertheless"\n- Agreement: "similarly," "in line with," "consistent with," "corroborates"\n- Qualification: "while this may be true," "to some extent," "with the caveat that"\n- Evaluation: "more convincingly argues," "provides stronger evidence," "fails to account for"\n\n**Common Mistakes:**\n- Do not give your own opinion in the TOEFL integrated task — only report the relationship between sources.\n- Do not simply list what each source says separately — show how they interact.\n- Do not ignore contradictions — address them directly.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Seeking Truth Through Multiple Witnesses',
              scriptureRef: 'Proverbs 18:17; Deuteronomy 19:15',
              reflection: 'Scripture establishes the principle of multiple witnesses: "One witness is not enough to convict anyone... A matter must be established by the testimony of two or three witnesses" (Deuteronomy 19:15). Synthesis follows this same principle — we do not accept a single source uncritically, but examine multiple perspectives to arrive at truth. This is not relativism but careful discernment, which God commands His people to practice.',
              applicationQuestion: 'How does the biblical principle of multiple witnesses apply to evaluating academic sources? Why is it important to hear more than one perspective before forming a conclusion?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between summary and synthesis? Why is synthesis considered a higher-level skill?',
                'How does the French dissertation structure (thesis-antithesis-synthesis) differ from English integrated writing, where synthesis happens throughout?',
                'In the TOEFL integrated task, why are you asked NOT to give your own opinion? What skill is being tested instead?',
                'How does Proverbs 18:17 ("the first to speak seems right, until cross-examined") apply to academic research?',
              ],
            },
            {
              type: 'practice',
              activity: 'Synthesis Practice with Conflicting Sources',
              prompt: 'Read these two positions and write a synthesis paragraph:\n\n**Source A (Reading):** "Studies show that homework improves academic performance. Students who complete regular homework score 10-15% higher on standardized tests. Homework reinforces classroom learning and builds self-discipline."\n\n**Source B (Lecture):** "Recent meta-analyses challenge the homework assumption. While homework may benefit high school students, research shows minimal impact for middle school students and potentially negative effects for elementary students, including increased stress and reduced family time."\n\nWrite a synthesis paragraph (120-150 words) that shows how these sources relate to each other WITHOUT giving your own opinion. Use appropriate contrast and qualification vocabulary.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'TOEFL Integrated Writing Simulation:\n\n**Reading Passage:** "Online education offers significant advantages over traditional classroom learning. First, it provides flexibility, allowing students to learn at their own pace. Second, it increases access for students in remote areas. Third, research from MIT and Stanford shows that well-designed online courses can match or exceed outcomes of in-person instruction."\n\n**Lecture Notes:** "The lecturer argues that online education faces serious challenges. First, completion rates for online courses are only 5-15%, compared to 80%+ for in-person courses. Second, students in remote areas often lack reliable internet access, making online learning inaccessible. Third, the MIT and Stanford research only measured short-term knowledge retention, not long-term learning outcomes."\n\nWrite a complete integrated response (200-250 words) explaining how the lecture challenges the reading. Use the template structure and synthesis vocabulary from this lesson. Time: 20 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-assessment: Review your integrated response against the TOEFL scoring criteria: (1) Accurate representation of both sources, (2) Clear organization showing relationships between sources, (3) Appropriate use of synthesis vocabulary, (4) No personal opinion inserted. Rate yourself 1-5 on each criterion and identify one specific area for improvement.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Synthesis and Analysis Across Sources',
        estimatedMinutes: 70,
        objectives: [
          'Combine information from two sources into a single coherent response.',
          'Use contrast and comparison language to show relationships between sources.',
          'Practice the TOEFL integrated writing format.',
          'Evaluate sources for strengths and weaknesses.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What do you do when two sources disagree? Today you learn to write about different perspectives without just picking one side.',
              connection: 'Proverbs 18:17 says the first person to speak seems right until someone asks questions. God wants us to listen carefully to all sides before deciding.',
            },
            {
              type: 'text',
              heading: 'Combining Sources: Synthesis',
              body: 'Synthesis means putting information from different sources together to show how they relate.\n\n**Summary vs. Synthesis:**\n- Summary: "Source A says this. Source B says that." (separate)\n- Synthesis: "Source A says this, BUT Source B shows that it is more complicated because..." (connected)\n\n**TOEFL Integrated Task:**\nYou read a passage, listen to a lecture, and write about how they connect. The lecture usually challenges or adds to the reading.\n\n**Useful phrases:**\n- "While the reading argues..., the lecture suggests..."\n- "The passage claims..., but the professor points out that..."\n- "Although the reading states..., the lecture provides evidence that..."\n\n**Important:** In this task, do NOT give your own opinion. Just explain how the sources relate.',
            },
            {
              type: 'text',
              heading: 'Evaluating Sources',
              body: 'When sources disagree, ask:\n1. **Which has better evidence?** Research studies are stronger than personal stories.\n2. **Is the information current?** Newer studies may be more reliable.\n3. **Is there bias?** Does the author benefit from a certain conclusion?\n4. **How large is the study?** A study of 10,000 people is more reliable than one of 10 people.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Multiple Witnesses',
              scriptureRef: 'Proverbs 18:17',
              reflection: 'The Bible teaches us to listen to multiple perspectives before making judgments. This is what synthesis is about — hearing all sides carefully.',
              applicationQuestion: 'Why is it important to consider multiple sources before forming an opinion?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between summary and synthesis?',
                'In the TOEFL integrated task, why should you NOT give your opinion?',
                'What questions help you evaluate whether a source is reliable?',
              ],
            },
            {
              type: 'practice',
              activity: 'Synthesis Practice',
              prompt: 'Source A: "Homework helps students learn. Students who do homework score higher on tests." Source B: "Too much homework causes stress. For younger students, homework does not improve learning."\n\nWrite a paragraph (80-100 words) that connects these two sources WITHOUT giving your opinion. Use phrases like "While Source A argues..., Source B suggests..."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Practice TOEFL integrated response:\n\nReading: "Online education is flexible and accessible for all students."\nLecture: "Online education has low completion rates and many students lack internet access."\n\nWrite a response (150-180 words) explaining how the lecture challenges the reading. Use contrast vocabulary. Time: 20 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Check your response: Did you (1) accurately represent both sources? (2) Show how they relate? (3) Avoid giving your own opinion? (4) Use contrast words? What would you improve?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Synthesis and Analysis Across Sources',
        estimatedMinutes: 50,
        objectives: [
          'Understand what synthesis means and how it differs from summary.',
          'Write a short response combining information from two sources.',
          'Practice basic TOEFL integrated writing skills.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What if two people tell you different things about the same topic? How do you figure out what is true? Today you learn to write about different viewpoints.',
              connection: 'The Bible says to listen to both sides before judging (Proverbs 18:17). This is wise advice for reading and writing too.',
            },
            {
              type: 'text',
              heading: 'What Is Synthesis?',
              body: '**Synthesis** means combining information from different sources.\n\n**Not synthesis:** "Article 1 says homework is good. Article 2 says homework is bad."\n**Synthesis:** "Article 1 says homework is good, BUT Article 2 shows it depends on the student\'s age."\n\nThe key is connecting the ideas with words like:\n- "but"\n- "however"\n- "while... also..."\n- "on the other hand"\n\n**For tests like TOEFL:** You read something, then hear a lecture about the same topic. You write about how they are similar or different. Do NOT give your own opinion — just explain the connection.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Listen to Both Sides',
              scriptureRef: 'Proverbs 18:17',
              reflection: 'God wants us to be fair and listen to all perspectives. This makes us wiser.',
              applicationQuestion: 'Can you think of a time when hearing a second opinion changed your mind?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between summary and synthesis?',
                'What words help you connect two different viewpoints?',
              ],
            },
            {
              type: 'practice',
              activity: 'Simple Synthesis',
              prompt: 'Source A: "Exercise is good for your health." Source B: "Too much exercise can cause injuries."\n\nWrite 3-4 sentences connecting these two ideas. Use "while" or "however."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Reading: "Technology helps students learn faster." Lecture: "Technology can be distracting in class."\n\nWrite a short response (80-100 words) explaining how these two sources relate. Use contrast words. Time: 15 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Did you connect the two sources (not just list them separately)? Did you use words like "however" or "while"? What could you improve?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'synthesis', definition: 'The process of combining information from multiple sources to create a new, integrated understanding rather than simply summarizing each source separately.', example: 'Good academic writing requires synthesis — connecting sources rather than listing them.' },
      { term: 'integrated response', definition: 'A piece of writing that combines information from multiple sources (such as a reading and a lecture) to show their relationship.', example: 'The TOEFL integrated response asks you to explain how a lecture relates to a reading passage.' },
      { term: 'conflicting viewpoints', definition: 'Perspectives or arguments that disagree with each other on the same topic.', example: 'The two studies presented conflicting viewpoints on whether homework improves learning.' },
      { term: 'corroborate', definition: 'To confirm or support a statement or finding with additional evidence from another source.', example: 'The lecture corroborated the reading\'s claim that exercise improves academic performance.' },
      { term: 'counter-argument', definition: 'An argument made to oppose or challenge another argument.', example: 'The professor\'s counter-argument about low completion rates weakened the case for online education.' },
      { term: 'meta-analysis', definition: 'A research method that combines results from multiple studies on the same topic to find overall patterns.', example: 'The meta-analysis of 50 studies found that the effect of homework varies significantly by age group.' },
      { term: 'bias', definition: 'A tendency to favor one perspective over another, often based on personal interest rather than objective evidence.', example: 'When evaluating sources, always check for potential bias — does the author benefit from a particular conclusion?' },
      { term: 'qualification', definition: 'A statement that limits or modifies a claim, making it more precise or less absolute.', example: 'Adding the qualification "for high school students" made the claim about homework more accurate.' },
    ],
    quiz: [
      { question: 'What is the key difference between summary and synthesis?', options: ['Summary is shorter than synthesis', 'Summary reports sources separately; synthesis shows how sources relate to each other', 'Synthesis always agrees with one source', 'Summary requires more sources than synthesis'], correctAnswer: 1, explanation: 'Summary reports each source independently, while synthesis integrates sources by showing their relationships — how they agree, disagree, or complicate each other.' },
      { question: 'In the TOEFL integrated writing task, what should you NOT do?', options: ['Mention the reading passage', 'Mention the lecture', 'Give your own personal opinion', 'Use contrast vocabulary'], correctAnswer: 2, explanation: 'The TOEFL integrated task tests your ability to report the relationship between sources, NOT to express your own opinion.' },
      { question: 'Which phrase best shows synthesis rather than summary?', options: ['"The article says homework is important."', '"The lecture discusses online education."', '"While the reading argues that homework helps, the lecture provides evidence that the effect depends on student age."', '"Source A is about homework. Source B is about stress."'], correctAnswer: 2, explanation: 'This phrase shows synthesis because it connects two sources and shows their relationship using contrast and qualification.' },
      { question: 'What does "corroborate" mean?', options: ['To disagree with a source', 'To confirm or support with additional evidence', 'To ignore a source', 'To summarize a source'], correctAnswer: 1, explanation: 'To corroborate means to support or confirm a claim by providing additional evidence from another source.' },
      { question: 'When evaluating conflicting sources, which question is MOST important?', options: ['Which source is longer?', 'Which source was published first?', 'Which source has stronger evidence and methodology?', 'Which source agrees with my opinion?'], correctAnswer: 2, explanation: 'Evidence quality and methodology are the most important factors when evaluating conflicting sources. Length, publication date, and personal agreement are less reliable indicators.' },
      { question: 'How does French academic synthesis differ from English synthesis?', options: ['French does not use synthesis', 'French separates thesis and antithesis into distinct sections; English integrates throughout', 'English never uses thesis and antithesis', 'They are identical'], correctAnswer: 1, explanation: 'French dissertation structure presents thesis and antithesis in separate sections before synthesis, while English academic writing integrates sources throughout the text.' },
      { question: 'What is a "meta-analysis"?', options: ['A personal opinion about a study', 'A research method that combines results from multiple studies to find patterns', 'A summary of one article', 'A type of grammar exercise'], correctAnswer: 1, explanation: 'A meta-analysis combines results from many studies on the same topic to identify overall trends, making it one of the strongest forms of evidence.' },
      { question: 'Which word signals a contrast between two sources?', options: ['"Similarly"', '"However"', '"Also"', '"Furthermore"'], correctAnswer: 1, explanation: '"However" signals contrast — a shift from one perspective to an opposing or different one. "Similarly," "also," and "furthermore" signal agreement or addition.' },
      { question: 'What does "qualification" mean in academic writing?', options: ['Getting a degree or certificate', 'Adding limits or conditions to make a claim more precise', 'Removing evidence from an argument', 'Making a claim stronger and more absolute'], correctAnswer: 1, explanation: 'A qualification limits or modifies a claim to make it more accurate. For example, changing "homework helps all students" to "homework helps high school students" adds a qualification.' },
      { question: 'According to Proverbs 18:17, why is synthesis important?', options: ['Because the first source you read is always wrong', 'Because we should hear multiple perspectives before forming conclusions', 'Because God prefers long essays', 'Because synthesis is easier than summary'], correctAnswer: 1, explanation: 'Proverbs 18:17 teaches that the first to speak seems right until cross-examined — the biblical principle that truth requires hearing and weighing multiple perspectives.' },
    ],
  },

  // ── W2: Advanced Discourse and Rhetoric ────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Advanced Discourse and Rhetoric',
        estimatedMinutes: 90,
        objectives: [
          'Analyze and apply the rhetorical strategies of ethos, pathos, and logos.',
          'Write persuasive text at an advanced academic level using sophisticated rhetorical techniques.',
          'Deliver persuasive spoken arguments with confidence and clarity.',
          'Analyze rhetoric in famous speeches and texts, identifying techniques and their effects.',
          'Compare French rhetorical traditions with English rhetoric.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Martin Luther King Jr.\'s "I Have a Dream" speech moved a nation. What made his words so powerful? Was it his logic? His emotion? His moral authority? The answer is: all three, woven together masterfully. That is rhetoric — and today you learn to use it.',
              connection: 'Ephesians 4:15 calls us to "speak the truth in love." Rhetoric is the art of persuasion — and as Christians, we must use it with integrity. Our goal is not manipulation but truthful, loving, compelling communication.',
            },
            {
              type: 'text',
              heading: 'The Three Pillars of Rhetoric: Ethos, Pathos, Logos',
              body: 'Aristotle identified three means of persuasion that remain the foundation of rhetoric in English:\n\n**Ethos (Credibility):** Why should the audience trust you?\n- Establish your qualifications, experience, or authority.\n- Demonstrate fairness by acknowledging opposing views.\n- Use credible sources and cite them properly.\n- Example: "As someone who has taught in both French and English educational systems for fifteen years, I can tell you that..."\n\n**Pathos (Emotion):** How do you make the audience FEEL?\n- Use vivid stories and concrete details.\n- Appeal to shared values (justice, family, freedom, faith).\n- Use figurative language: metaphor, imagery, rhetorical questions.\n- Example: "Imagine a child sitting alone in a classroom with no teacher, no textbook, and no hope. That is the reality for 260 million children worldwide."\n\n**Logos (Logic):** How do you prove your case?\n- Present evidence: statistics, studies, expert testimony.\n- Use logical structures: if-then, cause-effect, comparison.\n- Anticipate and address counter-arguments.\n- Example: "According to UNESCO, every dollar invested in education yields $10-15 in economic growth over a person\'s lifetime. The data is clear: education is not a cost — it is an investment."\n\n**The Power of Combining All Three:**\nThe strongest rhetoric weaves ethos, pathos, and logos together. King\'s "I Have a Dream" speech used moral authority (ethos as a pastor and leader), vivid imagery and repetition (pathos), and references to the Constitution and Declaration of Independence (logos).\n\n**French vs. English Rhetoric:**\nFrench rhetorical tradition (la rhetorique) emphasizes **logical structure** — the cartesian approach of thesis-antithesis-synthesis. English rhetoric gives **equal weight to emotion and credibility** alongside logic. This means French speakers may need to develop their comfort with emotional appeals and personal credibility statements, which can feel uncomfortably informal.',
            },
            {
              type: 'text',
              heading: 'Analyzing Rhetoric in Speeches and Texts',
              body: '**Framework for Rhetorical Analysis:**\n\n1. **Identify the rhetorical situation:** Who is the speaker? Who is the audience? What is the context?\n2. **Find examples of ethos, pathos, and logos.** Quote specific phrases.\n3. **Analyze effectiveness:** Which strategy is dominant? Why did the speaker choose this approach for this audience?\n4. **Evaluate the argument:** Is the rhetoric honest and well-supported, or does it rely on manipulation?\n\n**Rhetorical Devices to Recognize:**\n- **Anaphora:** Repetition of a phrase at the beginning of successive sentences. "I have a dream that... I have a dream that..."\n- **Antithesis:** Placing contrasting ideas side by side. "Ask not what your country can do for you — ask what you can do for your country."\n- **Tricolon:** A series of three parallel elements. "Government of the people, by the people, for the people."\n- **Rhetorical question:** A question not meant to be answered. "Can we really afford to do nothing?"\n- **Allusion:** Reference to a well-known text, event, or person. "Like David facing Goliath..."\n\n**Writing Persuasively at an Advanced Level:**\n- Open with a hook that combines pathos and logos.\n- Establish ethos early — why should the reader trust you?\n- Build your argument with evidence (logos) interspersed with human stories (pathos).\n- Acknowledge and refute counter-arguments (strengthens ethos).\n- End with a call to action that appeals to shared values.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Speaking the Truth in Love',
              scriptureRef: 'Ephesians 4:15',
              reflection: '"Speaking the truth in love" is the Christian standard for rhetoric. We are called to be persuasive, but never manipulative. Our ethos comes from integrity. Our pathos comes from genuine compassion. Our logos comes from truth. The Apostle Paul was a master rhetorician — his letters to the churches combined logical argument, emotional appeal, and personal credibility in ways that changed the world.',
              applicationQuestion: 'How can you tell the difference between persuasion and manipulation? What guardrails does "speaking the truth in love" provide?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Analyze this excerpt from King\'s "I Have a Dream" speech: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character." Identify the ethos, pathos, and logos at work.',
                'How does French rhetorical tradition differ from English? Why might French speakers find emotional appeals uncomfortable in English persuasive writing?',
                'Read Paul\'s defense before King Agrippa (Acts 26). What rhetorical strategies does Paul use? How does he combine ethos, pathos, and logos?',
                'What is the difference between persuasion and manipulation? How does Ephesians 4:15 help us draw the line?',
              ],
            },
            {
              type: 'practice',
              activity: 'Rhetorical Analysis',
              prompt: 'Choose ONE of these excerpts and write a rhetorical analysis (200-250 words):\n\n1. "The only thing we have to fear is fear itself." — FDR\n2. "That\'s one small step for man, one giant leap for mankind." — Neil Armstrong\n3. "Education is the most powerful weapon which you can use to change the world." — Nelson Mandela\n\nIdentify: (a) The rhetorical situation (who, audience, context), (b) Which strategy dominates (ethos, pathos, or logos), (c) Specific rhetorical devices used, (d) Why this rhetoric was effective for its audience.',
            },
            {
              type: 'practice',
              activity: 'Persuasive Writing with All Three Appeals',
              prompt: 'Write a persuasive paragraph (150-200 words) arguing that bilingual education should be expanded globally. Include at least one element of ethos (your credibility as a bilingual person), pathos (an emotional appeal), and logos (a statistic or logical argument). Label each element in brackets after the relevant sentence.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a complete persuasive essay (450-550 words) on ONE of these topics:\n\n1. "Every student should learn at least two languages."\n2. "Online education can transform developing nations."\n3. "Christian education should include critical thinking, not just memorization."\n\nYour essay must include: (a) An opening that combines pathos and logos, (b) At least three body paragraphs with evidence (logos), (c) At least one paragraph addressing a counter-argument, (d) A conclusion with a call to action, (e) Clear use of ethos, pathos, and logos throughout. Time: 40 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-assessment: Highlight or label instances of ethos (E), pathos (P), and logos (L) in your essay. Are all three present? Is one dominant? Write a brief note (3-4 sentences) explaining which appeal was hardest for you to use and why.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Advanced Discourse and Rhetoric',
        estimatedMinutes: 70,
        objectives: [
          'Understand and identify ethos, pathos, and logos in persuasive writing and speaking.',
          'Write persuasive text using all three rhetorical strategies.',
          'Analyze rhetoric in a famous speech or text.',
          'Compare French and English approaches to persuasive writing.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What makes some arguments more convincing than others? Today you learn three powerful strategies that speakers and writers use to persuade.',
              connection: 'Ephesians 4:15 tells us to "speak the truth in love." Good persuasion is honest and caring, not manipulative.',
            },
            {
              type: 'text',
              heading: 'Three Ways to Persuade: Ethos, Pathos, Logos',
              body: '**Ethos** = Credibility. Why should people trust you?\n- Show your experience: "As a bilingual student, I know firsthand that..."\n- Use good sources: "According to UNESCO..."\n\n**Pathos** = Emotion. How do you make people feel?\n- Tell stories: "Imagine a student with no books, no teacher, and no hope."\n- Use vivid details that make people care.\n\n**Logos** = Logic. What is your evidence?\n- Statistics: "85% of students say..."\n- Logical reasoning: "If we invest in education, the economy grows."\n\n**The best arguments use ALL THREE.**\n\nExample: "As a teacher for 15 years (ethos), I have seen children light up when they finally understand a concept (pathos). Research shows that quality teaching improves outcomes by 30% (logos)."\n\n**French vs. English:** French persuasion focuses heavily on logic (the Cartesian approach). English persuasion uses emotion and personal credibility equally alongside logic.',
            },
            {
              type: 'text',
              heading: 'Rhetorical Devices',
              body: 'Powerful speakers use specific techniques:\n\n- **Repetition:** "I have a dream... I have a dream..." — makes ideas memorable.\n- **Rhetorical question:** "Can we really ignore this problem?" — makes the audience think.\n- **Rule of three:** "Life, liberty, and the pursuit of happiness" — groups of three are powerful.\n- **Contrast:** "Ask not what your country can do for you — ask what you can do for your country."',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honest Persuasion',
              scriptureRef: 'Ephesians 4:15',
              reflection: 'God calls us to be persuasive but honest. Use rhetoric to share truth, not to manipulate. The Apostle Paul was a great speaker — he used logic, emotion, and credibility to share the gospel.',
              applicationQuestion: 'What is the difference between persuasion and manipulation?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Can you identify ethos, pathos, and logos in a speech or advertisement you know?',
                'Why might French speakers need to use more emotional appeals in English writing?',
                'How did the Apostle Paul use rhetoric in his letters and speeches?',
              ],
            },
            {
              type: 'practice',
              activity: 'Identify and Write',
              prompt: 'Read this statement: "Education is the most powerful weapon which you can use to change the world." — Nelson Mandela.\n\nIs this primarily ethos, pathos, or logos? Explain why.\n\nThen write your own persuasive paragraph (100-130 words) about the importance of learning English. Include at least one element of ethos, pathos, and logos. Label each one.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a persuasive essay (300-400 words) arguing that bilingual education should be available to all students. Include: an attention-grabbing opening, at least one use of ethos, pathos, and logos, one counter-argument you address, and a strong conclusion. Time: 30 minutes.',
            },
            {
              type: 'practice',
              prompt: 'After writing, label your uses of ethos (E), pathos (P), and logos (L). Which was easiest? Which was hardest? Why?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Advanced Discourse and Rhetoric',
        estimatedMinutes: 50,
        objectives: [
          'Understand the basics of ethos, pathos, and logos.',
          'Identify persuasive techniques in simple examples.',
          'Write a short persuasive text using at least two strategies.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Why do some ads make you want to buy something? Why do some speeches make you feel inspired? Today you learn three tricks speakers and writers use.',
              connection: 'God wants us to be honest when we try to convince others. "Speak the truth in love" (Ephesians 4:15).',
            },
            {
              type: 'text',
              heading: 'Three Ways to Convince People',
              body: '**Ethos** = Trust. People believe you because you are credible.\nExample: "As a student who speaks two languages, I know that..."\n\n**Pathos** = Feelings. You make people feel something.\nExample: "Imagine not being able to read a single word."\n\n**Logos** = Facts. You give evidence and reasons.\nExample: "Studies show that bilingual people earn 15% more."\n\nThe best arguments use at least two of these. Advertisements use all three!',
            },
            {
              type: 'biblical-worldview',
              theme: 'Honest Words',
              scriptureRef: 'Ephesians 4:15',
              reflection: 'God wants us to be persuasive AND honest. Never use tricks to make people believe something false.',
              applicationQuestion: 'Can you think of an ad that was persuasive but dishonest? What made it wrong?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between ethos, pathos, and logos?',
                'Can you think of an example of each from a TV ad, movie, or speech?',
              ],
            },
            {
              type: 'practice',
              activity: 'Spot the Strategy',
              prompt: 'Read these sentences. Label each one as ethos, pathos, or logos:\n\n1. "According to research, 70% of students prefer online learning."\n2. "As a doctor with 20 years of experience, I recommend this treatment."\n3. "Think about the children who go to bed hungry every night."\n4. "If we reduce waste by 10%, we save $1 million per year."\n5. "I have personally tested this product and can guarantee its quality."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a short paragraph (100-120 words) trying to convince someone that learning English is important. Use at least TWO of the three strategies (ethos, pathos, logos). Label which ones you used.',
            },
            {
              type: 'practice',
              prompt: 'Did you use at least two strategies? Which one was easiest for you? Can you add the third one in one more sentence?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'rhetoric', definition: 'The art of effective or persuasive speaking or writing, using specific techniques to influence an audience.', example: 'Studying rhetoric helps you both create and analyze persuasive arguments.' },
      { term: 'ethos', definition: 'A rhetorical appeal based on the credibility, authority, or character of the speaker or writer.', example: 'The professor established ethos by citing her 20 years of research experience.' },
      { term: 'pathos', definition: 'A rhetorical appeal to the audience\'s emotions, using stories, vivid imagery, or shared values to create an emotional response.', example: 'The charity used pathos by showing images of children who needed help.' },
      { term: 'logos', definition: 'A rhetorical appeal to logic and reason, using evidence, data, and logical arguments to prove a point.', example: 'The report relied on logos, presenting statistics from three independent studies.' },
      { term: 'anaphora', definition: 'The deliberate repetition of a word or phrase at the beginning of successive sentences or clauses for rhetorical effect.', example: 'King\'s repeated "I have a dream" is the most famous example of anaphora in English.' },
      { term: 'antithesis', definition: 'A rhetorical device that places two contrasting ideas side by side in a balanced structure.', example: '"It was the best of times, it was the worst of times" is an example of antithesis.' },
      { term: 'counter-argument', definition: 'An argument made in opposition to your main claim, which you then refute to strengthen your position.', example: 'Addressing the counter-argument that online education lacks social interaction made her essay more convincing.' },
      { term: 'call to action', definition: 'A direct appeal to the audience to take a specific action, typically placed at the end of a persuasive text or speech.', example: 'He ended his speech with a powerful call to action: "Join us. Volunteer. Make a difference."' },
    ],
    quiz: [
      { question: 'Which rhetorical appeal is based on the speaker\'s credibility?', options: ['Logos', 'Pathos', 'Ethos', 'Antithesis'], correctAnswer: 2, explanation: 'Ethos is the appeal to credibility and character — it establishes why the audience should trust the speaker.' },
      { question: 'Which is the best example of pathos?', options: ['"Studies show that 80% of students benefit from tutoring."', '"As a certified teacher with ten years of experience..."', '"Imagine a child who has never held a book in her hands."', '"If enrollment increases by 20%, revenue will cover costs."'], correctAnswer: 2, explanation: 'Pathos appeals to emotion. The image of a child who has never held a book creates an emotional response.' },
      { question: 'What is anaphora?', options: ['Using statistics to support an argument', 'Repeating a word or phrase at the beginning of successive sentences', 'Placing contrasting ideas side by side', 'Asking a question you do not expect answered'], correctAnswer: 1, explanation: 'Anaphora is the deliberate repetition of words at the start of successive sentences, like "I have a dream... I have a dream..."' },
      { question: 'How does French rhetorical tradition differ from English?', options: ['French uses no rhetoric at all', 'French emphasizes logical structure (Cartesian approach); English gives equal weight to emotion and credibility', 'English only uses logic; French uses emotion', 'They are identical'], correctAnswer: 1, explanation: 'French rhetoric emphasizes logical, structured argumentation (thesis-antithesis-synthesis), while English rhetoric balances logos with ethos and pathos.' },
      { question: 'Why should a persuasive essay address counter-arguments?', options: ['To confuse the reader', 'To make the essay longer', 'To demonstrate fairness and strengthen your position by showing you considered other views', 'Counter-arguments are never used in English'], correctAnswer: 2, explanation: 'Addressing counter-arguments strengthens ethos (showing fairness) and logos (demonstrating thoroughness), making your overall argument more convincing.' },
      { question: 'What is antithesis?', options: ['The opposite of a thesis statement', 'Placing two contrasting ideas side by side in a balanced structure', 'The conclusion of an essay', 'A type of evidence'], correctAnswer: 1, explanation: 'Antithesis is a rhetorical device that creates impact by juxtaposing contrasting ideas, like "Ask not what your country can do for you — ask what you can do for your country."' },
      { question: '"Can we really afford to ignore climate change?" is an example of:', options: ['A thesis statement', 'A rhetorical question', 'An anaphora', 'A counter-argument'], correctAnswer: 1, explanation: 'A rhetorical question is asked for effect, not expecting an answer. It makes the audience reflect and typically implies its own answer.' },
      { question: 'What does Ephesians 4:15 teach about rhetoric?', options: ['Christians should not try to persuade anyone', 'We should speak the truth in love — persuading with integrity', 'Logic is more important than emotion', 'Only pastors should use rhetoric'], correctAnswer: 1, explanation: 'Ephesians 4:15 calls believers to "speak the truth in love," providing a framework for ethical rhetoric — persuasion grounded in truth and genuine care.' },
      { question: 'Which sentence uses the "rule of three" (tricolon)?', options: ['"Education matters."', '"Education is affordable and accessible."', '"Education is affordable, accessible, and transformative."', '"Education has been studied by many researchers over many years."'], correctAnswer: 2, explanation: 'The tricolon (rule of three) presents three parallel elements: "affordable, accessible, and transformative" — making the phrase more memorable and rhythmic.' },
      { question: 'Why is combining ethos, pathos, and logos more effective than using just one?', options: ['It makes the essay longer', 'Different audience members respond to different types of appeal, so combining them reaches more people', 'Using one appeal is actually more effective', 'Teachers require all three for a passing grade'], correctAnswer: 1, explanation: 'Different people are persuaded by different appeals. Combining all three ensures your argument reaches a wider audience and appears more balanced and credible.' },
    ],
  },

  // ── W3: Cross-Cultural Communication ───────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Cross-Cultural Communication',
        estimatedMinutes: 90,
        objectives: [
          'Navigate cultural differences in academic and professional English-speaking settings.',
          'Distinguish between American, British, and international English conventions.',
          'Apply cultural sensitivity and pragmatics in written and spoken English.',
          'Analyze how French communication norms differ from Anglo-American norms and adapt accordingly.',
          'Develop intercultural competence as a foundation for global engagement.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'A French student emails an American professor: "Dear Professor, I need you to change my grade. It is not fair." The professor is offended. A Haitian student emails a British professor: "Dear Sir, I hope this finds you well. I was wondering whether it might be possible to discuss my grade at your convenience." The British professor is delighted. Same request, very different outcomes. What happened?',
              connection: '"Go therefore and make disciples of all nations" (Matthew 28:19). The Great Commission sends us into a world of diverse cultures. Learning to communicate across cultures is not just a professional skill — it is preparation for the mission God has given every believer.',
            },
            {
              type: 'text',
              heading: 'Cultural Dimensions in Communication',
              body: 'Cross-cultural communication goes far beyond language. Every culture has invisible rules about politeness, directness, hierarchy, and social distance. Understanding these rules is essential for success in English-speaking environments.\n\n**High-Context vs. Low-Context Communication:**\n- **High-context cultures** (France, Haiti, Japan): Much meaning is implied, not stated. Relationships and context matter more than explicit words. A French person might say "C\'est interessant" to politely express disagreement.\n- **Low-context cultures** (USA, UK, Australia): Meaning is stated explicitly. Direct communication is valued. An American might say "I disagree because..." without offense.\n\n**French Communication in English Contexts:**\n\n| French Norm | English (American) Norm | Potential Misunderstanding |\n|-------------|------------------------|---------------------------|\n| Direct criticism is intellectual honesty | Direct criticism can seem aggressive | French directness may offend Americans |\n| Formality shows respect | Informality shows friendliness | French formality may seem cold to Americans |\n| Debate is stimulating | Disagreement can feel personal | French debate style may seem confrontational |\n| Hierarchy is respected | Egalitarianism is valued | French deference may seem passive; American informality may seem disrespectful |\n| "Non" is acceptable | "That\'s an interesting perspective, but..." | French "non" may seem blunt to Americans |\n\n**American vs. British English Conventions:**\n- **American:** More informal, first-name basis, positive/enthusiastic tone ("Great job!" "Awesome!")\n- **British:** More reserved, indirect ("Not bad" = quite good), understatement as politeness ("That\'s quite ambitious" = that is probably impossible)\n- **International English:** Simplified, avoids idioms and slang, accommodates non-native speakers\n\n**Pragmatics — The Hidden Rules:**\nPragmatics is how language is used in context. The same words can mean different things in different cultures:\n- "That\'s interesting" (American) = genuine interest\n- "That\'s interesting" (British) = possibly polite disagreement\n- "I\'ll try" (American) = genuine effort expected\n- "I\'ll try" (British) = probably will not happen',
            },
            {
              type: 'text',
              heading: 'Adapting Your Communication Style',
              body: '**Strategies for Cross-Cultural Success:**\n\n1. **Mirror the register.** If your professor uses first names, use first names. If they maintain formality, match it.\n2. **Soften requests.** "Could you possibly..." and "I was wondering if..." are softer than "I need you to..."\n3. **Use hedging in disagreement.** "I see your point, and I wonder if we might also consider..." is more effective than "No, you\'re wrong."\n4. **Be explicit about intentions.** What is obvious in your culture may not be obvious in another. State your purpose clearly.\n5. **Ask about norms.** "Is it OK to call you by your first name?" shows cultural awareness.\n\n**Email Tone Across Cultures:**\nThe same request, adapted:\n- **French style (too direct for American):** "I need to change my exam date."\n- **American style:** "Hi Professor, I hope you\'re having a good week. I have a scheduling conflict on the exam date. Would it be possible to discuss alternative arrangements? Thank you so much for your understanding."\n- **British style:** "Dear Professor Smith, I hope this message finds you well. I wonder whether I might discuss the possibility of sitting the exam on a different date, as I have a prior commitment. I would be most grateful for your consideration."\n\nNotice how the American version is warm and direct, while the British version is more formal and indirect. Both are culturally appropriate in their contexts.\n\n**Cultural Intelligence (CQ):**\nCQ is the ability to function effectively across cultures. It involves:\n1. **CQ Drive:** Your motivation to learn about other cultures.\n2. **CQ Knowledge:** Understanding cultural norms and differences.\n3. **CQ Strategy:** Planning for cross-cultural interactions.\n4. **CQ Action:** Adapting your behavior in real time.',
            },
            {
              type: 'biblical-worldview',
              theme: 'The Great Commission and Cultural Competence',
              scriptureRef: 'Matthew 28:19; 1 Corinthians 9:22',
              reflection: 'Paul wrote, "I have become all things to all people so that by all possible means I might save some" (1 Corinthians 9:22). This is not dishonesty — it is cultural intelligence. Paul adapted his communication style for Jews, Greeks, Romans, and barbarians while keeping his message the same. Cross-cultural communication is a missions skill. When you learn to navigate American, British, and international English, you are equipping yourself for global ministry and witness.',
              applicationQuestion: 'How did Paul adapt his communication style for different audiences (compare Acts 17 in Athens with Acts 22 in Jerusalem)? How can you apply this principle in your own cross-cultural interactions?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Describe a time when a cultural misunderstanding happened because of different communication norms. What went wrong? How could it have been avoided?',
                'Why might French directness be misinterpreted in American contexts? How can French speakers soften their communication without being dishonest?',
                'Compare the American, British, and French email examples. What does each style reveal about the culture?',
                'How does 1 Corinthians 9:22 ("all things to all people") apply to cross-cultural professional communication?',
              ],
            },
            {
              type: 'practice',
              activity: 'Cultural Adaptation Exercise',
              prompt: 'Rewrite this email for THREE different audiences:\n\nOriginal (too direct): "Professor, I did not receive my grade. Send it to me."\n\n1. **American professor** (warm, direct, polite)\n2. **British professor** (formal, indirect, deferential)\n3. **International academic context** (clear, simple, no idioms)\n\nFor each version, explain why you made the choices you did.',
            },
            {
              type: 'practice',
              activity: 'Pragmatics Analysis',
              prompt: 'For each of these phrases, explain what it literally means vs. what it likely means in context:\n\n1. British professor: "That\'s quite ambitious." (Literal vs. implied meaning)\n2. American colleague: "Let\'s circle back on that." (What they actually mean)\n3. French person in English: "I completely disagree." (How this is perceived)\n4. American: "Sure, no problem!" (Is there really no problem?)\n5. British: "With the greatest respect..." (What comes next?)\n\nFor each, suggest how a French speaker should interpret and respond.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write an essay (400-500 words) analyzing the cross-cultural communication challenges a French-speaking student faces when entering an English-speaking university. Discuss at least three specific areas of difference (e.g., classroom interaction, email communication, social norms), provide concrete examples, and propose strategies for adaptation. Include at least one reference to how biblical principles guide cross-cultural engagement. Time: 35 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-assessment: Rate your cross-cultural communication skills 1-5 in these areas: (1) Adjusting formality level, (2) Softening requests, (3) Understanding implied meaning, (4) Adapting to American vs. British norms, (5) Cultural empathy. For your lowest score, write a specific action plan for improvement.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Cross-Cultural Communication',
        estimatedMinutes: 70,
        objectives: [
          'Understand key cultural differences between French and English communication styles.',
          'Adjust formality and directness for English-speaking audiences.',
          'Recognize differences between American and British English.',
          'Communicate respectfully across cultural contexts.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Have you ever said something perfectly normal in French that sounded strange or rude in English? Cultural rules about politeness are different in every language. Today you learn the hidden rules.',
              connection: 'Paul said, "I have become all things to all people" (1 Corinthians 9:22). Adapting to different cultures is a biblical skill.',
            },
            {
              type: 'text',
              heading: 'French vs. English Communication Styles',
              body: 'French and English speakers communicate differently:\n\n**Directness:** French speakers are often more direct. "Non, ce n\'est pas correct" is normal in French. In American English, you might say "I see your point, but have you considered...?"\n\n**Formality:** French is more hierarchical. Americans use first names with professors and bosses. British English is more formal than American but less than French.\n\n**Softening requests:**\n- Too direct: "I need you to change my grade."\n- American: "Would it be possible to discuss my grade?"\n- British: "I wonder whether I might discuss my grade with you."\n\n**Key phrases for politeness:**\n- "Could you possibly..."\n- "I was wondering if..."\n- "Would you mind..."\n- "I appreciate your help with..."',
            },
            {
              type: 'text',
              heading: 'American vs. British English',
              body: '**American English:** Informal, enthusiastic, direct.\n- "Great job!" "Awesome!" "Let\'s do it!"\n- First names are standard.\n\n**British English:** More reserved, indirect, understated.\n- "Not bad" often means "quite good."\n- "That\'s quite ambitious" might mean "that\'s unrealistic."\n- More formal in writing.\n\n**For French speakers:** Your natural formality is closer to British English, but most online universities and international settings use American English.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Adapting for Others',
              scriptureRef: '1 Corinthians 9:22',
              reflection: 'Paul adapted how he communicated for different cultures — not to be fake, but to connect better. We can do the same in English.',
              applicationQuestion: 'Is changing your communication style for different audiences dishonest, or is it wise? Why?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is one thing that is polite in French but might seem rude in English?',
                'What is the difference between American and British politeness?',
                'How can you soften a request in English without losing your meaning?',
              ],
            },
            {
              type: 'practice',
              activity: 'Rewrite for Culture',
              prompt: 'Rewrite this message for an American professor and a British professor:\n\nOriginal: "Professor, you made an error in my grade. Fix it."\n\nAmerican version: ___\nBritish version: ___\n\nExplain what you changed and why.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a short essay (300-350 words) about the challenges French speakers face when communicating in English-speaking cultures. Give at least two specific examples and suggest strategies. Time: 25 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-check: Could you be more direct? More indirect? Do you use softening phrases? What communication habit do you need to change?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Cross-Cultural Communication',
        estimatedMinutes: 50,
        objectives: [
          'Know the basic differences between French and English communication styles.',
          'Use polite language when making requests in English.',
          'Understand that cultural rules about politeness differ between languages.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What is considered polite in French might not be polite in English! Today you learn the simple rules for being polite in English.',
              connection: 'Paul adapted his communication for different people (1 Corinthians 9:22). We can learn to do the same.',
            },
            {
              type: 'text',
              heading: 'Being Polite in English',
              body: 'English politeness is different from French:\n\n**In French,** being direct is normal: "Donnez-moi le livre."\n**In English,** soften requests: "Could I have the book, please?"\n\n**Polite phrases to use:**\n- "Could you please..."\n- "Would it be possible to..."\n- "I was wondering if..."\n- "Thank you so much for..."\n\n**Important:**\n- Americans use first names, even with teachers.\n- "How are you?" is a greeting, not a real question. Just say "Good, thanks!"\n- "I\'m sorry" does not always mean apologizing — it can mean "excuse me" or show sympathy.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Kindness in Communication',
              scriptureRef: '1 Corinthians 9:22',
              reflection: 'Being polite in another culture shows love and respect for others.',
              applicationQuestion: 'Why is it important to learn the politeness rules of another culture?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are two polite phrases you can use in English?',
                'What does "How are you?" mean in American English?',
              ],
            },
            {
              type: 'practice',
              activity: 'Make It Polite',
              prompt: 'Rewrite these direct sentences to be more polite in English:\n1. "Give me the homework."\n2. "I need to talk to you now."\n3. "That answer is wrong."\n4. "Send me the information."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a polite email (5-8 sentences) to a teacher asking for help with an assignment. Use at least three polite phrases from the lesson.',
            },
            {
              type: 'practice',
              prompt: 'Check your email: Did you use polite phrases? Did you avoid being too direct? What would you change?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'cross-cultural communication', definition: 'The exchange of information between people from different cultural backgrounds, requiring awareness of different norms, values, and communication styles.', example: 'Cross-cultural communication skills are essential for working in international teams.' },
      { term: 'pragmatics', definition: 'The study of how context and culture affect the meaning of language — understanding what people really mean, not just what they literally say.', example: 'Pragmatics explains why "That\'s interesting" can mean different things in different cultures.' },
      { term: 'high-context culture', definition: 'A culture where much communication is implicit, relying on context, relationships, and shared understanding rather than explicit statements.', example: 'France is considered a relatively high-context culture, where what is NOT said can be as important as what IS said.' },
      { term: 'low-context culture', definition: 'A culture where communication is explicit and direct, with meaning conveyed primarily through words rather than context or implication.', example: 'The United States is a low-context culture, where people tend to say exactly what they mean.' },
      { term: 'hedging', definition: 'Using cautious or indirect language to soften statements, express politeness, or avoid sounding too direct or confrontational.', example: '"I was wondering whether it might be possible..." is a heavily hedged request.' },
      { term: 'cultural intelligence (CQ)', definition: 'The ability to function effectively across different cultural contexts by understanding and adapting to cultural differences.', example: 'High cultural intelligence helps you adapt your communication style whether you are in Paris, London, or New York.' },
      { term: 'register', definition: 'The level of formality in language, which varies depending on the audience, situation, and cultural context.', example: 'A text message uses an informal register; a scholarship application uses a formal register.' },
      { term: 'understatement', definition: 'A figure of speech where something is presented as less important or dramatic than it really is, commonly used in British English as a form of politeness.', example: 'When a British person says "Not bad," they often mean "quite good" — this is classic British understatement.' },
    ],
    quiz: [
      { question: 'What is the main difference between high-context and low-context communication?', options: ['High-context uses long sentences; low-context uses short ones', 'High-context relies on implied meaning; low-context states meaning explicitly', 'High-context is only used in Asia; low-context is only used in Europe', 'There is no real difference'], correctAnswer: 1, explanation: 'High-context cultures communicate much through implication and context, while low-context cultures state meaning directly and explicitly.' },
      { question: 'A British professor says "That\'s quite ambitious." This most likely means:', options: ['They are impressed and supportive', 'They think it is unrealistic or overly optimistic', 'They want more details', 'They did not understand you'], correctAnswer: 1, explanation: 'British understatement often inverts meaning. "Quite ambitious" typically signals that the professor thinks the plan may be unrealistic.' },
      { question: 'Which request is appropriately softened for an American professor?', options: ['"Change my grade. It is wrong."', '"I need you to fix my grade immediately."', '"Would it be possible to discuss my grade? I believe there may have been an error."', '"Sir, I humbly request that you reconsider my evaluation."'], correctAnswer: 2, explanation: 'American academic communication values politeness with directness. The third option is warm, polite, and clear without being overly formal or overly blunt.' },
      { question: 'Why might French directness be misunderstood in American English contexts?', options: ['Because Americans cannot understand French grammar', 'Because American culture values indirect politeness, so French directness can seem rude or aggressive', 'Because French speakers always use slang', 'Because Americans prefer silence to conversation'], correctAnswer: 1, explanation: 'French communication culture values directness as intellectual honesty, but American culture often interprets direct statements (especially criticism) as aggressive or rude.' },
      { question: 'What does "pragmatics" mean in linguistics?', options: ['The study of grammar rules', 'The study of how context and culture affect what language really means', 'The study of spelling and pronunciation', 'The study of vocabulary'], correctAnswer: 1, explanation: 'Pragmatics examines how the same words can mean different things depending on who says them, to whom, and in what cultural context.' },
      { question: 'In American culture, "How are you?" is typically:', options: ['A genuine question requiring a detailed answer', 'A greeting that expects a brief, positive response', 'An insult', 'Only used between close friends'], correctAnswer: 1, explanation: '"How are you?" in American English is primarily a greeting. The expected response is brief and positive ("Good, thanks! How about you?"), not a detailed description of your health.' },
      { question: 'What is Cultural Intelligence (CQ)?', options: ['The ability to speak many languages', 'The ability to function effectively across different cultural contexts', 'A type of IQ test', 'Knowledge of world history'], correctAnswer: 1, explanation: 'Cultural Intelligence (CQ) is the capacity to adapt effectively across cultural contexts, involving motivation, knowledge, strategy, and behavioral adaptation.' },
      { question: 'According to 1 Corinthians 9:22, how should Christians approach cross-cultural communication?', options: ['By refusing to change for any reason', 'By becoming "all things to all people" — adapting communication style while keeping core values', 'By only speaking their native language', 'By avoiding people from other cultures'], correctAnswer: 1, explanation: 'Paul adapted his communication approach for different audiences while maintaining his core message — a model for cross-cultural competence grounded in love and mission.' },
      { question: 'What is "hedging" in English communication?', options: ['Planting bushes around your house', 'Using cautious or indirect language to soften statements', 'Speaking very loudly', 'Using only simple vocabulary'], correctAnswer: 1, explanation: 'Hedging uses indirect, cautious language to soften requests, disagreements, or claims: "I was wondering if perhaps..." instead of "I want..."' },
      { question: 'Which cultural adaptation is most important for French speakers in American academic settings?', options: ['Learning American slang', 'Adjusting from formal, direct communication to warmer, more hedged communication', 'Changing their accent', 'Using British spelling'], correctAnswer: 1, explanation: 'The most significant adjustment for French speakers is learning to soften directness with warmth and hedging phrases, as American academic culture values politeness expressed through indirect, friendly communication.' },
    ],
  },

  // ── W4: Capstone Presentation (PROJECT) ────────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Capstone Presentation',
        estimatedMinutes: 90,
        objectives: [
          'Deliver a 10-minute capstone presentation demonstrating B2+ proficiency across all four language skills.',
          'Integrate reading, writing, listening, and speaking skills in a coherent academic performance.',
          'Apply rhetorical strategies, cross-cultural awareness, and synthesis skills from the unit.',
          'Self-assess performance using CEFR-aligned criteria.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is your moment. Everything you have learned in this unit — synthesis, rhetoric, cross-cultural communication — comes together in one 10-minute presentation. You will choose a topic, research it, structure an argument, and deliver it with academic rigor and professional polish.',
              connection: '"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters" (Colossians 3:23). This capstone is your offering of excellence — a demonstration of the skills God has helped you develop.',
            },
            {
              type: 'text',
              heading: 'Capstone Presentation: Requirements and Rubric',
              body: '**Your capstone must demonstrate ALL four skills:**\n\n1. **Reading:** Reference at least 2 academic sources in your presentation.\n2. **Writing:** Submit a written outline or script (500-650 words) with proper citations.\n3. **Listening:** Include a section where you respond to a question or integrate information from a listened source.\n4. **Speaking:** Deliver the presentation with clear pronunciation, varied intonation, effective signposting, and confident delivery.\n\n**Topic choices (choose ONE):**\n- "The role of education in breaking the cycle of poverty"\n- "How bilingualism shapes identity in a globalized world"\n- "The ethics of artificial intelligence in education"\n- "A topic of your choice approved by your instructor"\n\n**Rubric (CEFR B2+ aligned):**\n\n| Criterion | Excellent (5) | Good (4) | Adequate (3) | Developing (2) |\n|-----------|--------------|----------|--------------|----------------|\n| Content & Research | Multiple quality sources, strong synthesis | Good sources, clear synthesis | Adequate sources, basic connections | Few sources, limited synthesis |\n| Organization | Clear signposting, logical flow, strong intro/conclusion | Good structure with transitions | Basic structure, some transitions | Disorganized, unclear flow |\n| Language | Varied vocabulary, complex grammar, minimal errors | Good range, minor errors | Adequate vocabulary, some errors | Limited range, frequent errors |\n| Delivery | Confident, varied pace/intonation, excellent eye contact | Clear delivery, good engagement | Understandable, some engagement | Difficult to follow, minimal engagement |\n| Rhetoric | Skillful use of ethos, pathos, logos | Good use of 2-3 strategies | Basic persuasion present | Limited persuasive techniques |\n\n**Time:** 8-10 minutes speaking + 2-3 minutes Q&A',
            },
            {
              type: 'biblical-worldview',
              theme: 'Working for the Lord',
              scriptureRef: 'Colossians 3:23',
              reflection: 'This capstone is an opportunity to glorify God through excellence. Your hard work in learning English has prepared you for this moment. Give it your best, not for grades, but for the One who has given you every ability.',
              applicationQuestion: 'How does viewing your presentation as "work done for the Lord" change your motivation and preparation?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which topic interests you most and why? How will you bring a unique perspective as a bilingual French-English speaker?',
                'How will you balance ethos, pathos, and logos in your presentation?',
                'What cross-cultural considerations should you keep in mind for your audience?',
              ],
            },
            {
              type: 'practice',
              activity: 'Capstone Planning',
              prompt: 'Create a detailed plan for your capstone:\n1. Topic and thesis statement\n2. Three main points with sources\n3. Opening hook (write it out)\n4. Closing call to action (write it out)\n5. Two potential Q&A questions and your prepared responses\n6. List of rhetorical strategies you will use\n7. How you will demonstrate reading, writing, listening, and speaking',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Prepare and deliver your complete capstone presentation:\n\n1. Written component: Full script or detailed outline (500-650 words) with at least 2 cited sources.\n2. Speaking component: 8-10 minute presentation with signposting, rhetorical strategies, and confident delivery.\n3. Q&A component: Respond to 2-3 questions (from peers, instructor, or self-generated).\n\nRecord yourself or practice with a partner. Submit the written script/outline and a self-evaluation.',
            },
            {
              type: 'practice',
              prompt: 'Self-evaluation using the CEFR B2+ rubric: Rate yourself 1-5 on each criterion (Content & Research, Organization, Language, Delivery, Rhetoric). Calculate your total score out of 25. Write a 100-word reflection on your strengths and areas for growth. What would you do differently next time?',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Capstone Presentation',
        estimatedMinutes: 70,
        objectives: [
          'Deliver a 5-7 minute presentation demonstrating B2 proficiency.',
          'Integrate research, structure, and delivery skills from the unit.',
          'Self-assess using simplified CEFR criteria.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is your big presentation! You will show everything you have learned about synthesis, rhetoric, and communication in one polished talk.',
              connection: '"Whatever you do, work at it with all your heart" (Colossians 3:23). Do your best — for God, not just for a grade.',
            },
            {
              type: 'text',
              heading: 'Your Capstone Presentation',
              body: '**Requirements:**\n- 5-7 minutes speaking time\n- Reference at least 1 source\n- Use signposting language\n- Include at least one use of ethos, pathos, or logos\n- End with a call to action or strong conclusion\n\n**Topics (choose one):**\n- "Why bilingualism is an advantage in today\'s world"\n- "How technology can improve education"\n- "The importance of cross-cultural understanding"\n\n**You will be evaluated on:**\n1. Content: Is your information accurate and well-organized?\n2. Language: Do you use good vocabulary and grammar?\n3. Delivery: Are you clear, confident, and engaging?\n4. Structure: Do you have a clear beginning, middle, and end?',
            },
            {
              type: 'biblical-worldview',
              theme: 'Excellence for God',
              scriptureRef: 'Colossians 3:23',
              reflection: 'Do your best work as an offering to God. He sees your effort and is proud of how far you have come.',
              applicationQuestion: 'How does doing your best honor God?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which topic will you choose? What is your main message?',
                'What is the most important thing to remember about delivery?',
              ],
            },
            {
              type: 'practice',
              activity: 'Presentation Plan',
              prompt: 'Plan your capstone: (1) Topic and main idea, (2) Three key points, (3) Your opening hook (write it), (4) Your conclusion (write it), (5) One source you will reference.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write and deliver your capstone presentation (350-450 word script). Include signposting, at least one source reference, and a strong ending. Practice delivering it in 5-7 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-assessment: Rate yourself 1-5 on content, language, delivery, and structure. What is your total score out of 20? What was your biggest strength?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Capstone Presentation',
        estimatedMinutes: 50,
        objectives: [
          'Deliver a 3-5 minute presentation showing clear communication skills.',
          'Use basic structure (beginning, middle, end) and signposting.',
          'Reflect on learning progress.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is your chance to show what you can do! You will give a short presentation on a topic you care about.',
              connection: 'God is proud of your hard work. Give your best effort (Colossians 3:23).',
            },
            {
              type: 'text',
              heading: 'Your Final Presentation',
              body: '**What to do:**\n- Give a 3-5 minute talk on one of these topics:\n  - "Why I am learning English"\n  - "Something I am passionate about"\n  - "What I want to do in the future"\n\n**Structure:**\n1. Start: Tell the audience your topic.\n2. Middle: Share 2-3 points.\n3. End: Say what you want them to remember.\n\n**Use:** "First... Second... Finally..." and speak slowly and clearly.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Your Best Effort',
              scriptureRef: 'Colossians 3:23',
              reflection: 'God loves it when you try your best. This presentation shows your growth.',
              applicationQuestion: 'What are you most proud of about your English learning journey?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What topic will you choose?',
                'What are your 2-3 main points?',
              ],
            },
            {
              type: 'practice',
              activity: 'Quick Plan',
              prompt: 'Write: (1) Your opening sentence, (2) Your 2-3 points using "First... Second... Finally...", (3) Your closing sentence.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write out your 3-5 minute presentation (about 250-300 words). Use signposting words. Practice saying it aloud.',
            },
            {
              type: 'practice',
              prompt: 'How did it go? Rate yourself 1-5 on: clear ideas, good structure, confident delivery. What is one thing you are proud of?',
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
// UNIT 9: FINAL CERTIFICATION
// ═══════════════════════════════════════════════════════════════════════════════

const unit9Lessons: EnrichedLesson[] = [

  // ── W1: Comprehensive Review ───────────────────────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Comprehensive Review',
        estimatedMinutes: 90,
        objectives: [
          'Review and consolidate all test-taking strategies from Levels 1-4.',
          'Conduct a thorough self-assessment against CEFR B2 can-do descriptors.',
          'Identify remaining grammar and vocabulary gaps and target them for final study.',
          'Create a personalized study plan for the final two weeks of mock exams.',
          'Reflect on the entire language-learning journey with gratitude and purpose.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have come an incredible distance. Think back to Level 1, when you were building foundational English skills. Now you are synthesizing academic sources, analyzing rhetoric, and communicating across cultures. Before you face your final exams, let us take stock of everything you have learned — and prepare strategically for what comes next.',
              connection: '"I have fought the good fight, I have finished the race, I have kept the faith" (2 Timothy 4:7). Paul wrote these words near the end of his life, looking back on years of faithful service. You are nearing the end of a different kind of race — your English proficiency journey. Take a moment to thank God for how far He has brought you.',
            },
            {
              type: 'text',
              heading: 'Level 1-4 Review: The Complete Test Strategy Toolkit',
              body: '**READING Strategies:**\n- Skim for main idea FIRST (30 seconds per passage).\n- Read questions BEFORE re-reading the passage in detail.\n- For vocabulary-in-context questions: cover the word and predict from context.\n- For inference questions: look for what is IMPLIED, not stated directly.\n- For summary questions: eliminate minor details and focus on main points.\n- Time management: 18-20 minutes per passage (TOEFL), 20 minutes per passage (IELTS).\n\n**LISTENING Strategies:**\n- Take notes on MAIN IDEAS, not every word.\n- Listen for signposting: "The main point is..." "However..." "In conclusion..."\n- For TOEFL: focus on the lecture\'s structure and the speaker\'s attitude.\n- For IELTS: read ahead — look at the next questions while you listen.\n- For DET: the adaptive format means questions get harder as you succeed — stay focused.\n\n**SPEAKING Strategies:**\n- TOEFL: Use the 15-30 second prep time to jot 2-3 key words.\n- IELTS: Expand answers — never give one-word responses. "What do you like about your city?" requires 3-4 sentences minimum.\n- DET: Speak clearly for the AI — pronunciation matters.\n- All tests: Signpost your answers ("There are two main reasons..." / "First... Second...").\n\n**WRITING Strategies:**\n- TOEFL Integrated: Report the relationship between sources. NO personal opinion.\n- TOEFL Independent: 4-5 paragraph essay with clear thesis. 300+ words.\n- IELTS Task 1: Describe data objectively. Task 2: Argue a position with examples.\n- DET: Write clearly and accurately. Shorter, correct sentences beat long, error-filled ones.\n\n**GRAMMAR Consolidation — Top B2 Structures:**\n- Conditionals (all types): "If I had studied harder, I would have passed."\n- Passive voice: "The results were analyzed by the researchers."\n- Relative clauses: "The professor who teaches linguistics is also a translator."\n- Reported speech: "She said that the deadline had been extended."\n- Subjunctive/formal: "It is essential that students submit their work on time."',
            },
            {
              type: 'text',
              heading: 'CEFR B2 Self-Assessment: Can-Do Descriptors',
              body: '**At B2, you CAN:**\n\n**Reading:**\n- Read articles about current issues and understand the writer\'s perspective.\n- Understand detailed instructions and academic texts in your field.\n- Read literary prose with some dictionary support.\n\n**Listening:**\n- Follow extended lectures and complex arguments on familiar topics.\n- Understand most TV news and current affairs programs.\n- Understand the main points of radio programs and other audio on topics of personal interest.\n\n**Speaking:**\n- Present clear, detailed descriptions on subjects related to your interests.\n- Explain a viewpoint on a topic, giving advantages and disadvantages.\n- Participate actively in discussions on familiar topics.\n\n**Writing:**\n- Write clear, detailed text on subjects related to your interests.\n- Write an essay or report synthesizing information from different sources.\n- Write letters highlighting the personal significance of events and experiences.\n\n**Self-Assessment Exercise:**\nFor each skill, rate yourself honestly: CONFIDENT (I can do this consistently), DEVELOPING (I can do this sometimes with effort), NEEDS WORK (I struggle with this).\n\nFocus your final study on your "NEEDS WORK" areas. Your mock exams next week will test everything.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Finishing the Race',
              scriptureRef: '2 Timothy 4:7',
              reflection: '"I have fought the good fight, I have finished the race, I have kept the faith." Learning a language is one of the hardest things a person can do. You have persevered through frustration, confusion, and self-doubt. God has been with you every step. As you prepare for your final exams, remember that your worth is not defined by a test score — it is defined by the God who created you, loves you, and has plans for you that extend far beyond any exam.',
              applicationQuestion: 'How has God sustained you through difficult moments in your English learning journey? What would you say to encourage a fellow student who is just beginning?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Looking back at all four levels, which skill (reading, listening, speaking, writing) has improved the most? Which still needs the most work?',
                'Review the CEFR B2 can-do descriptors. Which ones are you most confident about? Which ones concern you?',
                'What test-taking strategies from this review were most helpful to revisit?',
                'How does 2 Timothy 4:7 encourage you as you prepare for final exams?',
              ],
            },
            {
              type: 'practice',
              activity: 'Personalized Study Plan',
              prompt: 'Complete this self-assessment and study plan:\n\n1. **My strongest skill:** _____ (evidence: _____)\n2. **My weakest skill:** _____ (evidence: _____)\n3. **Grammar I still struggle with:** _____\n4. **Vocabulary areas I need to review:** _____\n5. **Test format I am least familiar with:** TOEFL / IELTS / DET (circle one)\n6. **My study plan for the next two weeks:**\n   - Day 1-3: Focus on _____\n   - Day 4-6: Focus on _____\n   - Day 7-9: Focus on _____\n   - Day 10-14: Full mock practice\n\nFor each focus area, list 2-3 specific activities you will do (e.g., "Practice TOEFL reading passages for 30 minutes daily").',
            },
            {
              type: 'practice',
              activity: 'Grammar Quick Review',
              prompt: 'Complete these B2 grammar exercises:\n\n1. Rewrite using passive voice: "Researchers conducted the study in 2025."\n2. Complete the conditional: "If she _____ (study) abroad, she _____ (improve) her English faster."\n3. Add a relative clause: "The university _____ has an excellent online program."\n4. Convert to reported speech: "The professor said, \'The exam will be on Friday.\'"\n5. Use the subjunctive: "The committee recommends that every student _____ (take) the placement test."',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a reflective essay (400-500 words) titled "My English Learning Journey: From Level 1 to B2." Discuss: (a) Where you started and where you are now, (b) Your biggest challenges and how you overcame them, (c) How your faith supported you through the process, (d) Your goals for the future — which test will you take, what score are you aiming for, and how will you use English in your life? Use advanced grammar structures (conditionals, passive voice, relative clauses) to demonstrate your B2 proficiency. Time: 35 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Final self-assessment: Rate each CEFR B2 can-do descriptor as CONFIDENT, DEVELOPING, or NEEDS WORK. Count your totals. What percentage of descriptors are you CONFIDENT in? Set a target: by the end of mock exams, how many do you want to move from DEVELOPING to CONFIDENT?',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Comprehensive Review',
        estimatedMinutes: 70,
        objectives: [
          'Review key test-taking strategies from the entire Level 4 course.',
          'Self-assess against CEFR B2 descriptors.',
          'Identify strengths and areas for improvement.',
          'Create a study plan for mock exams.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have learned so much! Before the final exams, let us review the most important strategies and see how ready you are.',
              connection: '"I have fought the good fight, I have finished the race" (2 Timothy 4:7). You are almost at the finish line. God has been with you every step of the way.',
            },
            {
              type: 'text',
              heading: 'Review: Key Test Strategies',
              body: '**Reading:** Skim first, read questions, then find answers in the text. Manage your time — do not spend too long on one question.\n\n**Listening:** Take notes on main ideas. Listen for signposting words like "however" and "the main point is." Read ahead when possible.\n\n**Speaking:** Always give full answers (3+ sentences). Use signposting: "First... Second... Finally..." Take a breath before answering.\n\n**Writing:** Plan before you write (2-3 minutes). Write a clear thesis. Use paragraphs. Check your grammar at the end.\n\n**Grammar to review:**\n- Conditionals: "If I studied more, I would improve."\n- Passive: "The book was written by a famous author."\n- Relative clauses: "The teacher who helped me was very kind."\n- Reported speech: "He said that the class was canceled."',
            },
            {
              type: 'text',
              heading: 'Am I B2? Self-Check',
              body: 'At B2, you can:\n- Read articles and understand opinions\n- Follow lectures on familiar topics\n- Give presentations with clear details\n- Write essays synthesizing information\n\nRate yourself for each skill: STRONG, OK, or NEEDS WORK. Focus your study on "NEEDS WORK" areas.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Finishing Strong',
              scriptureRef: '2 Timothy 4:7',
              reflection: 'You have worked hard. God sees your effort and is proud of you. Finish strong!',
              applicationQuestion: 'What part of your English journey are you most thankful for?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which skill is your strongest? Which needs the most work?',
                'What grammar do you still find difficult?',
                'What is your strategy for the mock exams next week?',
              ],
            },
            {
              type: 'practice',
              activity: 'Study Plan',
              prompt: 'Create your study plan:\n1. My strongest skill: _____\n2. My weakest skill: _____\n3. Grammar I need to review: _____\n4. My plan for the next 2 weeks: _____\n\nList 3 specific things you will do each day to prepare.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a reflection (300-350 words) about your English learning journey. What did you find hardest? What are you most proud of? What is your goal for the mock exams? Use at least three B2 grammar structures (conditional, passive, relative clause). Time: 25 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Self-assessment: Rate yourself STRONG, OK, or NEEDS WORK for reading, listening, speaking, and writing. What is your priority for study this week?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Comprehensive Review',
        estimatedMinutes: 50,
        objectives: [
          'Review the most important test strategies.',
          'Know your strengths and weaknesses in English.',
          'Make a simple study plan for mock exams.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have learned so much English! Let us review the most important things before your practice exams.',
              connection: '"I have fought the good fight, I have finished the race" (2 Timothy 4:7). You are almost there! God is proud of your hard work.',
            },
            {
              type: 'text',
              heading: 'Key Review',
              body: '**Reading tips:** Read the questions first, then find answers in the text.\n**Listening tips:** Listen for main ideas. Take simple notes.\n**Speaking tips:** Always answer with 2-3 sentences. Use "First... Second..."\n**Writing tips:** Plan first. Write a topic sentence. Check your work.\n\n**Important grammar:**\n- "If I study, I will pass." (future condition)\n- "The test was given by the teacher." (passive)\n- "The student who studied hard passed." (relative clause)',
            },
            {
              type: 'biblical-worldview',
              theme: 'Almost There!',
              scriptureRef: '2 Timothy 4:7',
              reflection: 'You have worked hard. God has helped you learn. Keep going!',
              applicationQuestion: 'What are you most proud of in your English learning?',
            },
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is your best English skill? What is your weakest?',
                'What do you want to practice most before the exams?',
              ],
            },
            {
              type: 'practice',
              activity: 'Simple Study Plan',
              prompt: 'Answer these questions:\n1. My best skill: _____\n2. My weakest skill: _____\n3. This week I will practice: _____\n4. Each day I will spend _____ minutes on English.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Write a short paragraph (150-200 words) about what you have learned in English class. What was hardest? What are you proud of? What is your goal? Time: 20 minutes.',
            },
            {
              type: 'practice',
              prompt: 'Rate yourself GOOD, OK, or NEEDS HELP for: reading, listening, speaking, writing. What will you practice most?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'consolidation', definition: 'The process of reviewing and strengthening knowledge or skills that you have already learned, making them more permanent.', example: 'Grammar consolidation before the exam helped her feel confident about structures she had learned months ago.' },
      { term: 'self-assessment', definition: 'The process of honestly evaluating your own skills, knowledge, or performance against specific criteria.', example: 'Self-assessment using CEFR descriptors showed him exactly where he needed to improve.' },
      { term: 'can-do descriptor', definition: 'A statement from the CEFR framework describing what a language learner at a specific level is able to do.', example: 'A B2 can-do descriptor states that learners "can write clear, detailed text on subjects related to their interests."' },
      { term: 'proficiency', definition: 'A high degree of skill or competence in a particular area, often measured by standardized tests.', example: 'Her English proficiency reached B2 level after two years of dedicated study.' },
      { term: 'mock exam', definition: 'A practice test that simulates the conditions and format of the real exam to help students prepare.', example: 'Taking mock exams under timed conditions reduced her anxiety about the real test.' },
      { term: 'conditional', definition: 'A grammar structure expressing a condition and its result, such as "If + condition, result" (e.g., "If I study, I will pass").', example: 'Mastering all types of conditionals is essential for B2 proficiency.' },
      { term: 'passive voice', definition: 'A grammar structure where the subject receives the action rather than performing it (e.g., "The book was written by the author").', example: 'Academic writing frequently uses passive voice to emphasize results over researchers.' },
      { term: 'reported speech', definition: 'A grammar structure used to tell someone what another person said without quoting their exact words (e.g., "She said that she was leaving").', example: 'In the listening section, you often need to convert dialogue into reported speech.' },
    ],
    quiz: [
      { question: 'What is the FIRST thing you should do when reading a TOEFL passage?', options: ['Read every word carefully from start to finish', 'Look up unknown vocabulary', 'Skim for the main idea in 30 seconds', 'Start answering questions immediately'], correctAnswer: 2, explanation: 'Skimming for the main idea first gives you a mental framework for understanding the passage, making it easier to find specific answers later.' },
      { question: 'In the TOEFL integrated writing task, you should:', options: ['Give your personal opinion about the topic', 'Explain how the lecture relates to the reading passage', 'Summarize only the reading passage', 'Ignore the lecture and focus on the reading'], correctAnswer: 1, explanation: 'The integrated task tests your ability to show the relationship between the reading and the lecture — not your personal opinion.' },
      { question: 'What is a CEFR "can-do descriptor"?', options: ['A test score', 'A grammar rule', 'A statement describing what a learner at a specific level can do', 'A vocabulary list'], correctAnswer: 2, explanation: 'Can-do descriptors are practical statements describing real-world language abilities at each CEFR level.' },
      { question: 'Which is correct reported speech? Original: "The exam is tomorrow."', options: ['He said the exam is tomorrow', 'He said that the exam was the next day', 'He said that the exam will be tomorrow', 'He says the exam was tomorrow'], correctAnswer: 1, explanation: 'Reported speech shifts tenses back ("is" becomes "was") and adjusts time references ("tomorrow" becomes "the next day").' },
      { question: 'Convert to passive voice: "The committee will review the applications."', options: ['"The applications will be reviewed by the committee."', '"The committee reviewed the applications."', '"The applications review the committee."', '"The applications reviewed will be committee."'], correctAnswer: 0, explanation: 'Passive voice with future tense: subject + will be + past participle + by agent. "The applications will be reviewed by the committee."' },
      { question: 'What is the best IELTS speaking strategy?', options: ['Give one-word answers', 'Always give expanded answers of 3-4 sentences', 'Speak as fast as possible', 'Only repeat the question back'], correctAnswer: 1, explanation: 'IELTS speaking rewards expanded, detailed answers. One-word or very short responses lower your fluency and coherence scores.' },
      { question: 'What does "consolidation" mean in language learning?', options: ['Learning brand new material', 'Reviewing and strengthening previously learned skills', 'Taking a test', 'Starting over from the beginning'], correctAnswer: 1, explanation: 'Consolidation means reviewing and reinforcing material you have already learned to make it more permanent and automatic.' },
      { question: 'Which conditional type is this: "If I had studied harder, I would have passed"?', options: ['Zero conditional (general truth)', 'First conditional (real future)', 'Second conditional (unreal present)', 'Third conditional (unreal past)'], correctAnswer: 3, explanation: 'The third conditional (If + past perfect, would have + past participle) expresses regret about an unreal past situation.' },
      { question: 'Why is self-assessment important before mock exams?', options: ['It is not important', 'It helps you identify specific areas to focus your limited study time on', 'It replaces the need to take the actual test', 'It guarantees a perfect score'], correctAnswer: 1, explanation: 'Self-assessment reveals your specific strengths and weaknesses, allowing you to use your study time strategically rather than reviewing everything equally.' },
      { question: 'What does 2 Timothy 4:7 teach about perseverance?', options: ['We should quit when things get hard', 'Fighting the good fight and finishing the race honors God', 'Races are more important than faith', 'Only athletic people should persevere'], correctAnswer: 1, explanation: 'Paul celebrates having persevered to the end — fighting the fight, finishing the race, keeping the faith. This encourages us to persevere through challenges like language learning.' },
    ],
  },

  // ── W2: Mock Exam: TOEFL Format ────────────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Mock Exam: TOEFL Format',
        estimatedMinutes: 90,
        objectives: [
          'Complete a full TOEFL-format mock exam covering reading, listening, speaking, and writing.',
          'Apply all test-taking strategies under timed conditions.',
          'Score performance using the new TOEFL 1.0-6.0 scale and identify areas for improvement.',
          'Aim for a minimum Band 4.0 (equivalent to legacy score of approximately 80+).',
          'Develop stamina and focus for a multi-hour standardized test.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is your TOEFL mock exam. Treat it exactly as you would the real test: timed sections, no notes for some parts, full concentration. The goal is not perfection — it is to identify where you stand and what to focus on before the real exam. Remember, you need a minimum TOEFL score of 61 (new scale: approximately 4.0) for UoPeople admission.',
              connection: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future" (Jeremiah 29:11). This test is a step toward the future God has planned. Do your best and trust Him with the results.',
            },
            {
              type: 'text',
              heading: 'TOEFL iBT Mock Exam: Format and Instructions',
              body: '**TOEFL iBT Format (Updated 2024):**\n\n**Reading Section (35 minutes):**\n- 2 passages, approximately 700 words each\n- 10 questions per passage (20 total)\n- Question types: main idea, detail, vocabulary in context, inference, summary\n- New feature: adaptive difficulty — second passage adjusts based on first-passage performance\n\n**Listening Section (36 minutes):**\n- 3 lectures (6 questions each) + 2 conversations (5 questions each)\n- Total: 28 questions\n- Note-taking allowed\n- Questions appear AFTER the audio\n\n**Speaking Section (16 minutes):**\n- 4 tasks total\n- Task 1: Independent — express and support an opinion (15 sec prep, 45 sec response)\n- Tasks 2-4: Integrated — combine reading/listening with speaking (30 sec prep, 60 sec response)\n\n**Writing Section (29 minutes):**\n- Task 1: Integrated — read passage + listen to lecture, write response (20 min, 150-225 words)\n- Task 2: Academic Discussion — contribute to an online academic discussion (10 min)\n\n**Scoring:** Each section scored 0-30, total 0-120\n- Band 4.0 (new scale) ≈ legacy 80+ (our target)\n- UoPeople minimum: 61 (legacy scale)\n\n**Important for French speakers:**\n- TOEFL uses American English spelling and pronunciation.\n- The listening section includes American, British, Australian, and New Zealand accents.\n- Academic vocabulary is critical — review your vocabulary from all units.',
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plans for Your Future',
              scriptureRef: 'Jeremiah 29:11',
              reflection: 'This exam is not the end — it is a beginning. God has plans for you that extend far beyond any test score. Do your best, learn from the experience, and trust that He will open the right doors at the right time.',
              applicationQuestion: 'How can you approach this exam with confidence rather than fear, trusting in God\'s plans?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'TOEFL Reading Mock (Timed: 18 minutes)',
              prompt: '**Passage: The Impact of Urbanization on Biodiversity**\n\nUrbanization is one of the most significant drivers of biodiversity loss worldwide. As cities expand, natural habitats are destroyed, fragmented, or degraded, forcing wildlife to adapt, relocate, or perish. According to the United Nations, 68% of the world\'s population will live in urban areas by 2050, up from 55% in 2018. This unprecedented growth places enormous pressure on ecosystems.\n\nHowever, recent research complicates this narrative. Studies from universities in Berlin, Singapore, and Melbourne have shown that well-designed urban green spaces — parks, green roofs, wildlife corridors, and community gardens — can support surprising levels of biodiversity. A 2023 study published in Nature Ecology found that cities with connected green corridors maintained 40% more bird species than cities without them. Furthermore, some species thrive in urban environments, with urban foxes, peregrine falcons, and certain butterfly species showing population increases in cities.\n\nCritics argue that urban biodiversity is a poor substitute for natural ecosystems. Urban species tend to be generalists — adaptable species that can survive in many environments — rather than specialists that depend on specific habitats. The loss of specialist species represents an irreversible decline in genetic diversity. Moreover, green spaces in cities are often small and isolated, creating "island" populations vulnerable to disease and inbreeding.\n\nThe debate has practical implications for urban planning. "Biophilic city" advocates argue that incorporating nature into urban design is not just an amenity but a necessity for human and ecological health. Others contend that the most effective strategy is to limit urban sprawl and protect undeveloped land through strict zoning and conservation easements.\n\n**Answer these questions:**\n1. What is the main idea of the passage? (a) Cities always destroy biodiversity (b) Urban planning must balance growth with conservation (c) Green spaces are unnecessary in cities (d) All species thrive in urban environments\n2. According to the passage, what percentage of the world\'s population will be urban by 2050? (a) 40% (b) 55% (c) 68% (d) 80%\n3. The word "complicates" in paragraph 2 is closest in meaning to: (a) simplifies (b) makes more complex (c) contradicts entirely (d) confirms\n4. What did the 2023 Nature Ecology study find? (a) Cities have no biodiversity (b) Green corridors increased bird species by 40% (c) All urban species are generalists (d) Urban sprawl cannot be controlled\n5. What is the main criticism of urban biodiversity? (a) It is too expensive (b) Urban species tend to be generalists, not specialists (c) Birds do not live in cities (d) Green roofs do not work',
            },
            {
              type: 'practice',
              activity: 'TOEFL Speaking Mock (Timed)',
              prompt: '**Task 1 (Independent):** Do you agree or disagree with the following statement: "Online education will eventually replace traditional classroom learning." Give specific reasons and examples to support your answer.\n- Preparation time: 15 seconds\n- Speaking time: 45 seconds\n- Write out your response as you would speak it.\n\n**Task 2 (Integrated):** Based on the reading passage about urbanization and biodiversity, explain how urban planning can address biodiversity loss. Use specific information from the passage.\n- Preparation time: 30 seconds\n- Speaking time: 60 seconds\n- Write out your response as you would speak it.',
            },
            {
              type: 'practice',
              activity: 'TOEFL Writing Mock (Timed: 20 minutes)',
              prompt: '**Integrated Writing Task:**\n\nReading: "Online education democratizes access to learning. Students in remote areas can access world-class courses. Flexible scheduling allows working adults to earn degrees. Research shows that well-designed online programs achieve learning outcomes comparable to in-person instruction."\n\nLecture (notes): "The professor challenges this view. First, completion rates for online courses average only 10%, suggesting that access alone does not guarantee success. Second, students in remote areas often lack reliable internet — a 2024 ITU report found that 2.6 billion people remain offline. Third, the research comparing online and in-person outcomes was conducted with motivated, self-selected students, not typical learners."\n\nWrite your integrated response (150-225 words) explaining how the lecture challenges the points in the reading. Do NOT give your opinion. Time: 20 minutes.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: '**TOEFL Score Estimation and Analysis:**\n\nUsing the answer key and scoring criteria, estimate your performance:\n- Reading: ___/5 questions correct (approximate section score: ___/30)\n- Speaking Task 1: Rate yourself 1-4 on delivery, language use, and topic development\n- Speaking Task 2: Rate yourself 1-4 on accuracy, completeness, and coherence\n- Writing: Rate yourself 1-5 on accurate reporting, organization, and language\n\nEstimated total: ___/120 (approximate)\nTarget for UoPeople: 61+ (legacy scale)\n\nWrite a detailed analysis (200-250 words): What went well? What was challenging? What specific areas need the most improvement before the real exam? Which section should you prioritize in your remaining study time?',
            },
            {
              type: 'practice',
              prompt: 'Create an action plan based on your mock exam results. For each section where you scored below your target, list: (1) The specific problem, (2) A strategy to address it, (3) How many hours you will dedicate to practice this week.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Mock Exam: TOEFL Format',
        estimatedMinutes: 70,
        objectives: [
          'Complete key sections of a TOEFL-format mock exam.',
          'Practice test-taking strategies under timed conditions.',
          'Score performance and identify areas for improvement.',
          'Build confidence for the actual exam.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Today is your TOEFL practice test. This is just practice — it helps you see what the real test is like and where you need to improve. Relax, do your best, and learn from it.',
              connection: 'God has plans for your future (Jeremiah 29:11). This practice test is one step toward those plans.',
            },
            {
              type: 'text',
              heading: 'TOEFL Mock Exam: What to Expect',
              body: '**TOEFL has 4 sections:**\n1. **Reading** (35 min): 2 passages with questions about main ideas, details, and vocabulary\n2. **Listening** (36 min): Lectures and conversations with comprehension questions\n3. **Speaking** (16 min): 4 tasks — opinion + integrated tasks\n4. **Writing** (29 min): Integrated response + academic discussion\n\n**Tips for today:**\n- Time yourself for each section\n- Do not look at answers until you finish\n- If you do not know an answer, make your best guess and move on\n- TOEFL uses American English',
            },
            {
              type: 'biblical-worldview',
              theme: 'Trust God with the Results',
              scriptureRef: 'Jeremiah 29:11',
              reflection: 'Do your best on this practice test. God knows your future and He will guide you.',
              applicationQuestion: 'How does trusting God help reduce test anxiety?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Reading Practice (Timed: 15 minutes)',
              prompt: '**Read this passage and answer the questions:**\n\nUrbanization is one of the biggest causes of biodiversity loss. As cities grow, animal habitats are destroyed. By 2050, 68% of people will live in cities. However, some research shows that well-designed parks and green spaces can help. A study found that cities with green corridors had 40% more bird species. Some animals, like urban foxes, actually thrive in cities. Critics say this urban biodiversity is limited because only adaptable "generalist" species survive in cities.\n\n1. What is the main topic? (a) Why cities are bad (b) How urbanization affects biodiversity (c) Why birds live in parks (d) How to build cities\n2. What will happen by 2050? (a) All animals will move to cities (b) 68% of people will be urban (c) Green spaces will disappear (d) Biodiversity will increase\n3. What did the study about green corridors find? (a) 40% more bird species in cities with them (b) Birds prefer suburbs (c) Corridors hurt wildlife (d) Parks are unnecessary',
            },
            {
              type: 'practice',
              activity: 'Writing Practice (Timed: 15 minutes)',
              prompt: 'Reading: "Online education is accessible and flexible for all students."\nLecture: "But online courses have very low completion rates (10%), many students lack internet access, and research used only highly motivated students."\n\nWrite 120-150 words explaining how the lecture challenges the reading. Do NOT give your opinion.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Score yourself:\n- Reading: ___/3 correct\n- Writing: Rate yourself 1-5 on accuracy and organization\n\nWrite 100-150 words analyzing your performance: What went well? What was hard? What will you study more?',
            },
            {
              type: 'practice',
              prompt: 'Make a study plan for the rest of the week. Which TOEFL section needs the most practice?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Mock Exam: TOEFL Format',
        estimatedMinutes: 50,
        objectives: [
          'Practice key TOEFL question types.',
          'Experience timed test conditions.',
          'Identify areas for improvement.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Today you will try some practice test questions. This helps you know what to expect on the real test. There are no wrong answers in practice — just learning!',
              connection: 'God has good plans for you (Jeremiah 29:11). This practice brings you closer to your goals.',
            },
            {
              type: 'text',
              heading: 'TOEFL Practice: What Is It?',
              body: 'The TOEFL test checks your English in 4 areas: reading, listening, speaking, and writing.\n\nToday you will practice:\n- **Reading:** Read a short passage and answer questions\n- **Writing:** Read two different viewpoints and write about how they connect\n\n**Tips:** Read questions carefully. If you are not sure, guess and move on. Time yourself.',
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plans for You',
              scriptureRef: 'Jeremiah 29:11',
              reflection: 'God has plans for your future. This practice test is one step toward them.',
              applicationQuestion: 'What future goal motivates you to practice English?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Reading Practice (10 minutes)',
              prompt: 'Read this paragraph:\n\n"Cities are growing fast. By 2050, 68% of people will live in cities. This hurts animals because their homes are destroyed. But parks and green spaces can help. One study found that cities with parks had 40% more birds."\n\n1. What happens to animals when cities grow? (a) They get more food (b) Their homes are destroyed (c) They move to other cities\n2. What helped increase bird species? (a) More roads (b) More buildings (c) Parks and green spaces',
            },
            {
              type: 'practice',
              activity: 'Simple Writing Practice (10 minutes)',
              prompt: 'Article says: "Online learning is good for all students."\nProfessor says: "Many online students do not finish their courses, and some do not have internet."\n\nWrite 60-80 words about how these two views are different.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'How did you do? Reading: ___/2 correct. Writing: Did you connect the two views? What was hardest?',
            },
            {
              type: 'practice',
              prompt: 'What will you practice more this week? Choose one area: reading, writing, speaking, or listening.',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'mock exam', definition: 'A practice test that copies the format and timing of the real exam to help you prepare.', example: 'The mock exam showed her that she needed to work on time management in the reading section.' },
      { term: 'integrated task', definition: 'A test task that combines two or more skills (e.g., reading + listening + writing) in a single question.', example: 'The TOEFL integrated task requires you to read a passage, listen to a lecture, and then write a response.' },
      { term: 'adaptive', definition: 'Describes a test that adjusts difficulty based on your answers — getting harder when you answer correctly and easier when you answer incorrectly.', example: 'The TOEFL reading section is now adaptive, meaning the second passage difficulty depends on how you performed on the first.' },
      { term: 'inference', definition: 'A conclusion drawn from evidence in the text that is not directly stated, requiring you to read between the lines.', example: 'The question asked you to make an inference about the author\'s attitude based on word choice.' },
      { term: 'urbanization', definition: 'The process of population shifting from rural areas to cities, resulting in the growth of urban areas.', example: 'Urbanization has accelerated globally, with over half the world\'s population now living in cities.' },
      { term: 'biodiversity', definition: 'The variety of plant and animal life in a particular habitat or ecosystem.', example: 'Urban parks help maintain biodiversity by providing habitats for birds, insects, and small mammals.' },
    ],
    quiz: [
      { question: 'What is the total TOEFL iBT score range?', options: ['0-30', '0-120', '1-9', '0-300'], correctAnswer: 1, explanation: 'The TOEFL iBT is scored 0-120, with each of the four sections (Reading, Listening, Speaking, Writing) scored 0-30.' },
      { question: 'What is the minimum TOEFL score for UoPeople admission?', options: ['40', '61', '80', '100'], correctAnswer: 1, explanation: 'UoPeople requires a minimum TOEFL score of 61 for undergraduate admission.' },
      { question: 'In the TOEFL integrated writing task, you should:', options: ['Give your personal opinion', 'Only summarize the reading', 'Explain how the lecture relates to the reading', 'Write about a different topic'], correctAnswer: 2, explanation: 'The integrated task requires you to show the relationship between the lecture and the reading — not your own opinion.' },
      { question: 'What does "adaptive" mean in the context of a test?', options: ['The test is easy for everyone', 'The test adjusts difficulty based on your answers', 'The test has no time limit', 'The test only has listening questions'], correctAnswer: 1, explanation: 'An adaptive test changes difficulty based on performance — harder questions follow correct answers, easier ones follow incorrect answers.' },
      { question: 'How long is TOEFL speaking Task 1 preparation time?', options: ['5 seconds', '15 seconds', '60 seconds', '5 minutes'], correctAnswer: 1, explanation: 'TOEFL speaking Task 1 gives you only 15 seconds to prepare and 45 seconds to speak, so quick planning is essential.' },
      { question: 'What is an "inference" question?', options: ['A question about a word\'s definition', 'A question that asks what is directly stated in the text', 'A question requiring you to draw a conclusion from evidence not explicitly stated', 'A question about the author\'s name'], correctAnswer: 2, explanation: 'Inference questions ask you to figure out what is implied by the text, not what is directly stated — reading between the lines.' },
    ],
    quiz: [
      { question: 'What is the total TOEFL iBT score range?', options: ['0-30', '0-120', '1-9', '0-300'], correctAnswer: 1, explanation: 'The TOEFL iBT is scored 0-120, with each of the four sections (Reading, Listening, Speaking, Writing) scored 0-30.' },
      { question: 'What is the minimum TOEFL score for UoPeople admission?', options: ['40', '61', '80', '100'], correctAnswer: 1, explanation: 'UoPeople requires a minimum TOEFL score of 61 for undergraduate admission.' },
      { question: 'In the TOEFL integrated writing task, you should:', options: ['Give your personal opinion', 'Only summarize the reading', 'Explain how the lecture relates to the reading', 'Write about a different topic'], correctAnswer: 2, explanation: 'The integrated task requires you to show the relationship between the lecture and the reading — not your own opinion.' },
      { question: 'What does "adaptive" mean in the context of a test?', options: ['The test is easy for everyone', 'The test adjusts difficulty based on your answers', 'The test has no time limit', 'The test only has listening questions'], correctAnswer: 1, explanation: 'An adaptive test changes difficulty based on performance — harder questions follow correct answers, easier ones follow incorrect answers.' },
      { question: 'How long is TOEFL speaking Task 1 preparation time?', options: ['5 seconds', '15 seconds', '60 seconds', '5 minutes'], correctAnswer: 1, explanation: 'TOEFL speaking Task 1 gives you only 15 seconds to prepare and 45 seconds to speak, so quick planning is essential.' },
      { question: 'What is an "inference" question?', options: ['A question about a word\'s definition', 'A question that asks what is directly stated in the text', 'A question requiring you to draw a conclusion from evidence not explicitly stated', 'A question about the author\'s name'], correctAnswer: 2, explanation: 'Inference questions ask you to figure out what is implied by the text, not what is directly stated — reading between the lines.' },
    ],
  },

  // ── W3: Mock Exam: IELTS and DET Format ────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Mock Exam: IELTS and DET Format',
        estimatedMinutes: 90,
        objectives: [
          'Complete IELTS-format mock sections covering all four skills.',
          'Practice DET-format adaptive questions.',
          'Compare TOEFL, IELTS, and DET formats to determine which test best suits your strengths.',
          'Target scores: IELTS Band 6.0+, DET 95+.',
          'Make an informed decision about which test to take.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Yesterday you practiced the TOEFL format. Today you will experience IELTS and the Duolingo English Test. Each test has a different style: TOEFL is academic and American, IELTS is more international and includes a face-to-face speaking test, and DET is adaptive, short, and taken from home. By the end of today, you will know which test plays to YOUR strengths.',
              connection: '"For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do" (Ephesians 2:10). God made you with specific strengths. Choosing the right test is about knowing yourself — the unique person God designed you to be.',
            },
            {
              type: 'text',
              heading: 'IELTS Academic: Format and Key Differences from TOEFL',
              body: '**IELTS Academic Format:**\n\n**Listening (30 minutes + 10 min transfer time):**\n- 4 sections, 40 questions total\n- Section 1: Conversation (everyday context)\n- Section 2: Monologue (everyday context)\n- Section 3: Conversation (academic context)\n- Section 4: Lecture (academic context)\n- IELTS plays audio ONCE — no replay\n- You write answers while listening and transfer them after\n\n**Reading (60 minutes):**\n- 3 passages, 40 questions total\n- Passages come from academic journals, magazines, and books\n- Question types: matching, true/false/not given, sentence completion, multiple choice\n- Key difference from TOEFL: "Not Given" is an answer option — the information is neither confirmed nor denied\n\n**Writing (60 minutes):**\n- Task 1 (20 min): Describe a graph, chart, table, or diagram (150+ words)\n- Task 2 (40 min): Write an essay arguing a position (250+ words)\n- Key difference from TOEFL: Task 1 requires data description, not source synthesis\n\n**Speaking (11-14 minutes):**\n- Part 1: Introduction questions (4-5 min)\n- Part 2: Long turn — speak for 1-2 minutes on a topic card (3-4 min)\n- Part 3: Discussion — deeper questions related to Part 2 (4-5 min)\n- KEY DIFFERENCE: IELTS speaking is with a human examiner, not a computer!\n\n**Scoring:** Band 1-9 (half bands possible: 6.5, 7.0, etc.)\n- Target: Band 6.0 for UoPeople\n- Each skill scored separately; overall band is the average\n\n**IELTS uses British AND American spelling** — both are accepted.',
            },
            {
              type: 'text',
              heading: 'Duolingo English Test (DET): The Flexible Alternative',
              body: '**DET Format:**\n- **Duration:** Approximately 60 minutes\n- **Cost:** $65 (significantly cheaper than TOEFL or IELTS)\n- **Where:** Take it from HOME on your computer\n- **When:** Results available within 48 hours\n\n**Question Types:**\n- Read and complete (fill in missing letters in words)\n- Listen and type (transcribe audio)\n- Read aloud (pronunciation)\n- Write about the photo (describe an image)\n- Read, then write (respond to a prompt)\n- Listen, then speak (verbal response to audio)\n- Interactive reading (complete passages)\n- Interactive listening (match audio to text)\n\n**Scoring:** 10-160 scale\n- Target: 95+ for UoPeople\n- Results include subscores: Literacy, Comprehension, Conversation, Production\n\n**Key Advantages of DET:**\n- Take it from home (no test center needed)\n- Cheaper than TOEFL ($215+) or IELTS ($230+)\n- Quick results (2 days vs. 6-10 days)\n- Can retake every 21 days\n\n**Key Challenges for French speakers:**\n- The adaptive format means questions get harder as you succeed\n- Read-and-complete questions test spelling precision\n- You cannot skip questions or go back\n\n**Which Test Should You Take?**\n\n| Strength | Best Test |\n|----------|----------|\n| Strong reading/writing, prefer computer | TOEFL |\n| Strong speaking, prefer human interaction | IELTS |\n| Strong all-around, want convenience | DET |\n| Budget-conscious | DET ($65) |\n| Need quick results | DET (48 hours) |',
            },
            {
              type: 'biblical-worldview',
              theme: 'Knowing How God Made You',
              scriptureRef: 'Ephesians 2:10',
              reflection: 'God made you with specific strengths and abilities. Choosing the right test is not about which is "easiest" — it is about which best allows you to demonstrate the abilities God has given you. Some people are stronger readers; others are stronger speakers. Know yourself, and choose wisely.',
              applicationQuestion: 'Based on your strengths, which test format do you think would best showcase your abilities? Why?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'IELTS Reading Mock (Timed: 20 minutes)',
              prompt: '**Read this passage and answer the questions:**\n\nThe concept of "digital literacy" has evolved significantly since the term was first coined by Paul Gilster in 1997. Originally referring to the ability to find, evaluate, and use information from digital sources, digital literacy now encompasses a broader set of skills including critical thinking, online safety, data privacy awareness, and the ability to create digital content. UNESCO estimates that by 2030, 90% of jobs will require some level of digital literacy.\n\nHowever, a persistent "digital divide" separates those with access to technology and digital skills training from those without. This divide disproportionately affects developing nations, rural communities, and older adults. In sub-Saharan Africa, for example, only 33% of the population has internet access, compared to 90% in Europe.\n\n**Questions (True / False / Not Given):**\n1. Paul Gilster coined the term "digital literacy" in 1997.\n2. Digital literacy originally included online safety.\n3. UNESCO predicts that 90% of jobs will require digital literacy by 2030.\n4. The digital divide affects all countries equally.\n5. Europe has the highest internet penetration rate in the world.\n\n**Multiple Choice:**\n6. The passage suggests that digital literacy has: (a) stayed the same since 1997 (b) narrowed in scope (c) expanded to include many more skills (d) become less important',
            },
            {
              type: 'practice',
              activity: 'IELTS Writing Task 2 Mock (Timed: 40 minutes)',
              prompt: '**IELTS Writing Task 2:**\n\n"Some people believe that technology has made education more accessible and effective. Others argue that it has created new problems and inequalities."\n\nDiscuss both views and give your own opinion.\n\nWrite at least 250 words. Structure your essay with: introduction (paraphrase the question + thesis), body paragraph 1 (first view with examples), body paragraph 2 (second view with examples), conclusion (your opinion + summary).',
            },
            {
              type: 'practice',
              activity: 'DET-Style Questions',
              prompt: '**Read and Complete (fill in the missing letters):**\n1. Educ__ion is the most pow__ful tool for ch__ging the w__ld.\n2. Bil__gual spe__ers have cogn__ive adv__tages over mon__ingual le__ners.\n3. The uni__rsity req__res a min__um TOEFL sc__e of s__ty-one.\n\n**Write About the Photo (imagine this scene):**\nDescribe this scene in 50-80 words: A diverse group of university students studying together in a modern library, some using laptops, others reading textbooks, with large windows showing a campus green.\n\n**Read, Then Write:**\nPrompt: "What are the advantages and disadvantages of studying abroad?"\nWrite a response in 100-120 words.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: '**Score Analysis and Test Selection:**\n\n1. Score your IELTS reading mock: ___/6 correct (approximate band: ___)\n2. Rate your IELTS writing: Band 5 / 5.5 / 6 / 6.5 / 7 (based on task response, coherence, vocabulary, grammar)\n3. Rate your DET comfort level: 1-5\n\n**Test Comparison for YOUR Profile:**\nBased on both mock exams (TOEFL yesterday, IELTS/DET today), write a 200-250 word analysis:\n- Which test format felt most natural to you?\n- Where did you perform best?\n- Which test\'s question types match your strengths?\n- What is your recommended test choice and why?\n- What is your target score and when will you register?\n\nInclude practical details: TOEFL registration at ets.org/toefl, IELTS at ielts.org, DET at englishtest.duolingo.com ($65).',
            },
            {
              type: 'practice',
              prompt: 'Final preparation plan: Based on your test choice, list: (1) Your target score, (2) Three specific areas to focus on this week, (3) Practice resources you will use, (4) Your planned test date. Share your plan with a study partner or instructor for accountability.',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Mock Exam: IELTS and DET Format',
        estimatedMinutes: 70,
        objectives: [
          'Practice key IELTS and DET question types.',
          'Compare the three major test formats.',
          'Decide which test best matches your strengths.',
          'Target: IELTS Band 6.0 or DET 95.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Yesterday you practiced TOEFL. Today you will try IELTS and Duolingo English Test questions. Each test is different — by the end, you will know which one is best for YOU.',
              connection: 'God made you with unique strengths (Ephesians 2:10). The right test lets you show those strengths.',
            },
            {
              type: 'text',
              heading: 'IELTS and DET: Key Differences',
              body: '**IELTS:**\n- 4 sections: Listening (30 min), Reading (60 min), Writing (60 min), Speaking (11-14 min)\n- Speaking is with a REAL PERSON (not a computer)\n- Uses "True / False / Not Given" questions (tricky!)\n- Scoring: Band 1-9. Target: Band 6.0\n- Cost: about $230\n\n**Duolingo English Test (DET):**\n- About 60 minutes, taken from HOME\n- Fill-in-the-blank, listen and type, read aloud, write responses\n- Scoring: 10-160. Target: 95\n- Cost: only $65!\n- Results in 48 hours\n\n**Which test should you take?**\n- Good at reading/writing + prefer computers → TOEFL\n- Good at speaking + prefer human interaction → IELTS\n- Want convenience + lower cost → DET',
            },
            {
              type: 'biblical-worldview',
              theme: 'Using Your Strengths',
              scriptureRef: 'Ephesians 2:10',
              reflection: 'God gave you specific abilities. Choose the test that lets you show them best.',
              applicationQuestion: 'What are your strongest English skills? Which test matches them?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'IELTS Reading Practice (15 minutes)',
              prompt: 'Read the passage about digital literacy and answer:\n\n"Digital literacy has expanded from basic computer skills to include critical thinking, online safety, and content creation. UNESCO says 90% of jobs will need digital skills by 2030. But a digital divide exists — only 33% of people in sub-Saharan Africa have internet, compared to 90% in Europe."\n\n1. True/False/Not Given: Digital literacy only means knowing how to use a computer.\n2. True/False/Not Given: 90% of jobs will require digital literacy by 2030.\n3. True/False/Not Given: Sub-Saharan Africa has 33% internet access.\n4. What is the "digital divide"? Write 1-2 sentences.',
            },
            {
              type: 'practice',
              activity: 'DET-Style Practice',
              prompt: 'Fill in the missing letters:\n1. Educ__ion helps people build a b__ter f__ure.\n2. The un__ersity ac__pts TOEFL, IELTS, and Du__ingo sc__es.\n\nWrite about this scene (50 words): Students studying together in a library.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Test comparison: Write 150-200 words about which test (TOEFL, IELTS, or DET) you think is best for you. Explain your reasons based on your strengths. Include: your target score and where to register.',
            },
            {
              type: 'practice',
              prompt: 'What will you practice this week? Which test will you take? When will you register?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Mock Exam: IELTS and DET Format',
        estimatedMinutes: 50,
        objectives: [
          'Try basic IELTS and DET question types.',
          'Understand the differences between the three tests.',
          'Start thinking about which test to take.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'There are three main English tests: TOEFL, IELTS, and Duolingo. Today you will try some IELTS and Duolingo questions. This helps you choose the right test for you.',
              connection: 'God made you with strengths. The right test lets you show them (Ephesians 2:10).',
            },
            {
              type: 'text',
              heading: 'Three English Tests',
              body: '**TOEFL:** Computer test. Strong in reading and writing. Costs about $215.\n\n**IELTS:** Reading, writing, listening, and speaking with a real person. Costs about $230.\n\n**Duolingo (DET):** Short test (60 min). Take it from home. Only $65! Results in 2 days.\n\n**For UoPeople, you need:**\n- TOEFL: 61\n- IELTS: 6.0\n- DET: 95',
            },
            {
              type: 'biblical-worldview',
              theme: 'Know Your Strengths',
              scriptureRef: 'Ephesians 2:10',
              reflection: 'God made you special. Choose the test that fits YOU best.',
              applicationQuestion: 'What is your best English skill? Reading? Listening? Speaking? Writing?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Simple Practice',
              prompt: 'IELTS: Read this and answer True or False:\n"By 2030, most jobs will need digital skills. Only 33% of people in Africa have internet."\n\n1. Most jobs will need digital skills. (True / False)\n2. 50% of people in Africa have internet. (True / False)\n\nDuolingo: Fill in the missing letters:\n1. Ed_c_tion is imp_rt_nt.\n2. I want to st_dy at a un_v_rs_ty.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'Which test do you want to take? Write 3-4 sentences explaining your choice. Remember:\n- TOEFL: good for reading/writing\n- IELTS: good for speaking\n- DET: cheapest, take from home',
            },
            {
              type: 'practice',
              prompt: 'What is your target score? What will you practice most this week?',
            },
          ],
        },
      },
    ],
    vocabulary: [
      { term: 'IELTS', definition: 'International English Language Testing System — a widely accepted English proficiency test with reading, listening, writing, and speaking sections, scored on a 1-9 band scale.', example: 'She scored IELTS Band 6.5, which exceeded the minimum requirement for her university.' },
      { term: 'DET (Duolingo English Test)', definition: 'An adaptive, online English proficiency test that can be taken from home in about 60 minutes, scored on a 10-160 scale.', example: 'The DET was the most convenient option because he could take it from home for only $65.' },
      { term: 'True/False/Not Given', definition: 'A unique IELTS question type where you must decide if a statement is confirmed (True), contradicted (False), or neither confirmed nor denied (Not Given) by the passage.', example: 'The "Not Given" option is the trickiest — the information is simply not mentioned in the passage.' },
      { term: 'band score', definition: 'The scoring system used by IELTS, ranging from 1 (non-user) to 9 (expert user), with half-band increments possible.', example: 'A band score of 6.0 indicates a competent user who can handle complex language in familiar situations.' },
      { term: 'digital literacy', definition: 'The ability to find, evaluate, use, and create information using digital technology, including critical thinking about online content.', example: 'Digital literacy is now considered as essential as traditional reading and writing skills.' },
      { term: 'digital divide', definition: 'The gap between people who have access to digital technology and those who do not, often along economic, geographic, or demographic lines.', example: 'The digital divide between rural and urban areas means many students cannot access online learning.' },
    ],
    quiz: [
      { question: 'What is unique about the IELTS speaking section compared to TOEFL?', options: ['IELTS speaking is multiple choice', 'IELTS speaking is with a human examiner face-to-face', 'IELTS has no speaking section', 'IELTS speaking is only 2 minutes long'], correctAnswer: 1, explanation: 'The IELTS speaking test is conducted face-to-face with a human examiner, lasting 11-14 minutes, unlike TOEFL where you speak into a computer.' },
      { question: 'What score do you need on the DET for UoPeople admission?', options: ['65', '80', '95', '120'], correctAnswer: 2, explanation: 'UoPeople requires a minimum DET score of 95 for undergraduate admission.' },
      { question: 'What is a "Not Given" answer in IELTS reading?', options: ['The statement is clearly true', 'The statement is clearly false', 'The passage does not contain enough information to determine if the statement is true or false', 'You do not need to answer the question'], correctAnswer: 2, explanation: '"Not Given" means the passage neither confirms nor denies the statement — the information simply is not there.' },
      { question: 'What is the main advantage of the Duolingo English Test?', options: ['It is the hardest test', 'It is taken at a test center', 'It is affordable ($65), taken from home, with quick results (48 hours)', 'It only tests reading'], correctAnswer: 2, explanation: 'The DET is significantly cheaper, can be taken from home, and delivers results in about 48 hours, making it the most accessible option.' },
      { question: 'For IELTS Writing Task 1, you must:', options: ['Write an opinion essay', 'Describe a graph, chart, or diagram', 'Summarize a lecture', 'Write a letter to a friend'], correctAnswer: 1, explanation: 'IELTS Academic Writing Task 1 requires you to describe, summarize, or explain visual information (graphs, charts, tables, or diagrams) in at least 150 words.' },
      { question: 'Which test would be best for someone who is a strong speaker but weak reader?', options: ['TOEFL', 'IELTS', 'DET', 'All tests are equally good'], correctAnswer: 1, explanation: 'IELTS has a face-to-face speaking test that allows strong speakers to demonstrate their skills more naturally, and the speaking section is scored independently.' },
    ],
  },

  // ── W4: Final Certification Assessment (PROJECT) ───────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Final Certification Assessment',
        estimatedMinutes: 90,
        objectives: [
          'Demonstrate comprehensive B2 proficiency across all four language skills in a final assessment.',
          'Receive a CEFR-aligned proficiency report certifying readiness for university-level study.',
          'Create a personalized university readiness action plan with specific next steps.',
          'Reflect on the entire 4-level journey and articulate future goals.',
          'Understand the practical steps for test registration, score-sending, and university application.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is the final assessment of the entire 4-level program. Everything you have learned — from foundational grammar in Level 1 to advanced rhetoric and synthesis in Level 4 — has led to this moment. This assessment is not just about proving what you know. It is about launching you into the next chapter: university admission, career advancement, and a life of global impact through English.',
              connection: '"I have fought the good fight, I have finished the race, I have kept the faith" (2 Timothy 4:7). You have fought through grammar, vocabulary, writing, speaking, listening, reading, cultural challenges, and self-doubt. You have finished the race. And through it all, God has been faithful. Now He sends you forward: "Go therefore and make disciples of all nations" (Matthew 28:19). Your English is a tool for the Great Commission.',
            },
            {
              type: 'text',
              heading: 'Final Assessment: Comprehensive B2 Proficiency Evaluation',
              body: '**This assessment evaluates all four skills against CEFR B2 descriptors:**\n\n**Section 1: Reading Comprehension (20 minutes)**\n- Read an academic text and answer analytical questions.\n- Demonstrate ability to understand complex arguments and identify writer\'s purpose.\n\n**Section 2: Writing (40 minutes)**\n- Task A: Integrated writing — synthesize two sources (200 words)\n- Task B: Independent essay — argue a position with evidence (300 words)\n\n**Section 3: Speaking (Prepared + Spontaneous)**\n- Deliver a 3-minute prepared response on a topic.\n- Answer 2-3 spontaneous follow-up questions.\n\n**Section 4: Listening (Self-assessed)**\n- Reflect on your listening skills based on mock exam performance and daily practice.\n\n**Grading Criteria (CEFR B2 Aligned):**\n- Content & Comprehension: Understanding of complex texts and lectures\n- Organization & Coherence: Logical structure with clear transitions\n- Vocabulary Range: Academic and professional vocabulary used accurately\n- Grammar Accuracy: Complex structures (conditionals, passive, relative clauses) used correctly\n- Fluency & Pronunciation: Clear, natural delivery with appropriate pace\n- Pragmatic Competence: Cultural awareness and appropriate register\n\n**Certification Levels:**\n- 85-100%: B2+ (Upper Intermediate Plus) — University Ready\n- 70-84%: B2 (Upper Intermediate) — University Ready with Support\n- 55-69%: B1+ (Strong Intermediate) — Additional Preparation Recommended\n- Below 55%: Continue Level 4 Review',
            },
            {
              type: 'text',
              heading: 'Your Next Steps: University Admission Guide',
              body: '**University of the People (UoPeople):**\n- Apply at: uopeople.edu\n- Application fee: $60 (one-time)\n- English requirement: TOEFL 61 / IELTS 6.0 / DET 95\n- Conditional admission: If your score is slightly below, you may be admitted conditionally through ENGL 0101 (English Composition 1)\n- Tuition: FREE (exam fees of $120 per course apply)\n- Programs: Business, Computer Science, Health Science, Education\n\n**Test Registration:**\n- TOEFL: Register at ets.org/toefl (cost: $200-215, results in 6-10 days)\n- IELTS: Register at ielts.org (cost: $230+, results in 13 days)\n- DET: Register at englishtest.duolingo.com (cost: $65, results in 48 hours)\n\n**Score-Sending Process:**\n- TOEFL: Send scores directly to universities through your ETS account (free for up to 4 universities if selected before test day)\n- IELTS: Request additional test reports through your test center or British Council account\n- DET: Send scores for free to unlimited institutions through your Duolingo account\n\n**Recommended Timeline:**\n1. Week 1-2: Register for your chosen test\n2. Week 3-4: Intensive preparation using official practice materials\n3. Week 5-6: Take the test\n4. Week 7-8: Receive scores and send to universities\n5. Week 9-12: Complete university application\n\n**Official Practice Resources:**\n- TOEFL: ETS TOEFL Practice Online (toeflresources.com)\n- IELTS: British Council free practice (takeielts.britishcouncil.org)\n- DET: Duolingo English Test practice (englishtest.duolingo.com/practice)\n\n**Remember:** Your Level 4 certificate from The Gospel Academy, combined with an official test score, demonstrates serious commitment to English proficiency.',
            },
            {
              type: 'biblical-worldview',
              theme: 'The Great Commission and Your English',
              scriptureRef: '2 Timothy 4:7; Matthew 28:19',
              reflection: 'You have fought the good fight. You have finished the race of this program. But this is not the end — it is a beginning. "Go therefore and make disciples of all nations" (Matthew 28:19). Your English proficiency is not just for university or career. It is a tool God has given you to communicate across borders, to serve people of all languages, and to share the hope of the gospel with the world. Whether you become a doctor, teacher, engineer, or pastor, your bilingual abilities are a gift for God\'s kingdom. Go forth with confidence, knowing that the same God who helped you learn English will be with you in everything that comes next.',
              applicationQuestion: 'How will you use your English proficiency to serve God and others? What is your vision for the next five years?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Section 1: Reading Comprehension (Timed: 20 minutes)',
              prompt: '**Read the following passage and answer the questions:**\n\nThe debate over artificial intelligence in education illustrates a fundamental tension in modern pedagogy: the desire for personalized learning versus the fear of dehumanized education. Proponents argue that AI tutors can provide individualized instruction at scale, adapting to each student\'s pace and learning style in ways no human teacher can match for a class of thirty. A 2024 Stanford study found that students using AI-assisted learning showed 27% greater improvement in standardized test scores compared to control groups.\n\nCritics counter that education is fundamentally a human endeavor. The teacher-student relationship, they argue, provides motivation, mentorship, and moral formation that no algorithm can replicate. Furthermore, AI systems risk encoding biases present in their training data, potentially reinforcing rather than addressing educational inequalities. The philosopher Maxine Greene warned against reducing education to measurable outcomes, arguing that its deepest purpose is to help students "see big" — to imagine possibilities beyond their current circumstances.\n\nA middle path is emerging. "Augmented intelligence" models position AI as a tool that enhances rather than replaces human teaching. In these models, AI handles routine tasks — grading, progress tracking, content delivery — while human teachers focus on relationships, critical discussion, and character development.\n\n**Questions:**\n1. What is the main tension described in the passage?\n2. What did the Stanford study find?\n3. Explain in your own words what Maxine Greene meant by helping students "see big."\n4. What is the "middle path" the author describes?\n5. In 3-4 sentences, evaluate the argument: Do you think AI tutors can truly personalize learning, or is the human element irreplaceable? Use evidence from the passage AND your own experience.',
            },
            {
              type: 'practice',
              activity: 'Section 2: Writing Assessment',
              prompt: '**Task A: Integrated Writing (15 minutes, 200 words)**\n\nSource 1: "Bilingual individuals demonstrate greater cognitive flexibility, enhanced problem-solving abilities, and delayed onset of dementia symptoms by an average of 4.5 years compared to monolinguals." (Journal of Neurolinguistics, 2024)\n\nSource 2: "The cognitive advantages of bilingualism have been overstated. Recent meta-analyses show that the bilingual advantage in executive function is small and inconsistent, and may be explained by other factors such as socioeconomic status." (Psychological Science, 2023)\n\nSynthesize these two sources. Show how they relate to each other. Do NOT give your personal opinion.\n\n**Task B: Independent Essay (25 minutes, 300 words)**\n\n"Education should focus on developing character and wisdom, not just academic knowledge and test scores."\n\nDo you agree or disagree? Write a well-organized essay with a clear thesis, supporting arguments with evidence, at least one counter-argument, and a conclusion. You may draw on your personal experience, your faith, and your studies.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: '**Section 3: Speaking Assessment**\n\n**Prepared Response (3 minutes):**\nSpeak for 3 minutes on the following topic: "What I have learned about myself, my language, and my faith during this English proficiency program." Structure your response with an introduction, 2-3 main points, and a conclusion. Write out your response or detailed notes.\n\n**Spontaneous Questions (write your responses):**\n1. "What was the most challenging part of learning English, and how did you overcome it?"\n2. "How do you plan to use your English proficiency in your career or ministry?"\n3. "If you could give one piece of advice to a student just starting Level 1, what would it be?"\n\nWrite your responses as you would speak them (approximately 100 words each).',
            },
            {
              type: 'practice',
              prompt: '**University Readiness Action Plan:**\n\nComplete this comprehensive plan:\n\n1. **Test Selection:** I will take the _____ (TOEFL / IELTS / DET)\n2. **Target Score:** _____\n3. **Registration:** I will register at _____ (website) by _____ (date)\n4. **Cost:** $_____ (how will I pay for it?)\n5. **Preparation Plan:** Between now and my test date, I will:\n   - Daily: _____\n   - Weekly: _____\n   - Practice resources: _____\n6. **University Application:** I plan to apply to _____ (UoPeople / other)\n   - Application website: _____\n   - Application deadline: _____\n   - Application fee: _____\n   - Required documents: _____\n7. **Score Sending:** I will send my scores to _____ using _____\n8. **Long-term Vision:** In 5 years, I see myself _____\n9. **Prayer:** "Lord, I commit this journey to You. Help me to _____"\n\n**Final Reflection (200 words):**\nLooking back on the entire program — from Level 1 to this final assessment — write about your transformation. How have you grown in English proficiency, in confidence, and in faith? How has God been present in this journey? What are you most grateful for?',
            },
          ],
        },
      },
      {
        pathway: 'STANDARD',
        title: 'Final Certification Assessment',
        estimatedMinutes: 70,
        objectives: [
          'Demonstrate B2 proficiency through a final reading and writing assessment.',
          'Create a university readiness plan with practical next steps.',
          'Reflect on your learning journey and set future goals.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is it — your final assessment! You have worked so hard, and now it is time to show what you can do. After this, you will have a clear plan for taking your test and applying to university.',
              connection: '"I have fought the good fight, I have finished the race" (2 Timothy 4:7). You have finished this program. God is proud of you. Now He sends you forward: "Go and make disciples of all nations" (Matthew 28:19). Your English is a gift for serving God\'s kingdom.',
            },
            {
              type: 'text',
              heading: 'Final Assessment and Next Steps',
              body: '**Today\'s assessment:**\n1. Reading: Read a passage and answer questions (15 minutes)\n2. Writing: Write a short essay (25 minutes)\n3. Speaking: Prepare a short talk about your journey\n\n**Your next steps for university:**\n- **UoPeople:** Apply at uopeople.edu ($60 fee). Free tuition!\n- **Choose your test:**\n  - TOEFL (ets.org/toefl) — score needed: 61\n  - IELTS (ielts.org) — score needed: 6.0\n  - DET (englishtest.duolingo.com) — score needed: 95 (only $65!)\n- **Timeline:** Register in 1-2 weeks, prepare for 2-4 weeks, take the test, send scores, apply.',
            },
            {
              type: 'biblical-worldview',
              theme: 'Go Into All the World',
              scriptureRef: '2 Timothy 4:7; Matthew 28:19',
              reflection: 'You finished the race! Now God sends you into the world with English as a tool for His purposes. Whether you become a doctor, teacher, or business leader, use your skills to serve Him.',
              applicationQuestion: 'How will you use your English to serve God and others?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Reading Assessment (15 minutes)',
              prompt: 'Read this passage:\n\n"Artificial intelligence in education can personalize learning for each student. A Stanford study found 27% better test scores with AI tutoring. But critics say education needs human relationships, mentorship, and character building that AI cannot provide. A middle approach uses AI for routine tasks while teachers focus on relationships and discussion."\n\nAnswer:\n1. What is the main argument FOR AI in education?\n2. What is the main argument AGAINST AI in education?\n3. What is the "middle approach"?\n4. In 2-3 sentences, share your opinion with a reason.',
            },
            {
              type: 'practice',
              activity: 'Writing Assessment (25 minutes)',
              prompt: 'Write an essay (250-350 words): "What I have learned in this English program and how I will use it in the future." Include: what was most challenging, what you are proud of, your plans for university, and how your faith has supported you. Use good paragraph structure.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'University Readiness Plan:\n1. Test I will take: _____\n2. Target score: _____\n3. Registration website: _____\n4. University I want to apply to: _____\n5. My preparation plan for the next month: _____\n6. My long-term goal: _____\n\nWrite 2-3 sentences about what you are most grateful for in this program.',
            },
            {
              type: 'practice',
              prompt: 'Final reflection: In 100-150 words, describe how you have grown since Level 1. What would you tell a new student who is just starting? How has God helped you on this journey?',
            },
          ],
        },
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Final Certification Assessment',
        estimatedMinutes: 50,
        objectives: [
          'Show your English skills in a final reading and writing task.',
          'Know the next steps for taking an English test and applying to university.',
          'Celebrate your accomplishment and plan your future.',
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You did it! This is your last lesson. You have learned SO much English. Today you show what you can do, and then you plan your next steps.',
              connection: '"I have fought the good fight, I have finished the race" (2 Timothy 4:7). You finished! God is so proud of you. Now use your English to serve Him (Matthew 28:19).',
            },
            {
              type: 'text',
              heading: 'Your Final Assessment and Next Steps',
              body: '**Today:**\n1. Read a short text and answer questions\n2. Write about your journey\n\n**After this program, here is what to do:**\n1. **Choose a test:**\n   - TOEFL (ets.org/toefl) — need 61 points\n   - IELTS (ielts.org) — need 6.0\n   - Duolingo (englishtest.duolingo.com) — need 95 — only $65 and you take it from home!\n2. **Study for 2-4 weeks** using free practice tests online\n3. **Take the test**\n4. **Apply to university** (UoPeople at uopeople.edu — $60 fee, free tuition!)\n\n**You can do this!**',
            },
            {
              type: 'biblical-worldview',
              theme: 'You Finished the Race!',
              scriptureRef: '2 Timothy 4:7; Matthew 28:19',
              reflection: 'You finished something amazing. God helped you every step of the way. Now He will continue to guide you.',
              applicationQuestion: 'What are you most proud of? What will you do next?',
            },
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Reading Task (10 minutes)',
              prompt: 'Read this:\n\n"AI can help students learn by giving them lessons that fit their level. But some people say that teachers are still very important because they build relationships with students and help them grow as people. The best idea is to use AI AND teachers together."\n\n1. What can AI do for students?\n2. Why are teachers still important?\n3. What is the best idea according to the text?',
            },
            {
              type: 'practice',
              activity: 'Writing Task (15 minutes)',
              prompt: 'Write 150-200 words about: "My English Learning Journey." Include: How you felt when you started. What was hardest. What you are proud of. What you want to do next.',
            },
          ],
          output: [
            {
              type: 'practice',
              prompt: 'My Plan:\n1. The test I will take: _____\n2. The score I need: _____\n3. I will register at: _____ (website)\n4. I want to study at: _____\n5. My goal: _____\n\nWrite one sentence about what you are most grateful for.',
            },
            {
              type: 'practice',
              prompt: 'Congratulations! You finished the entire English for French Speakers program! Write 2-3 sentences: What advice would you give to a student starting Level 1?',
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
// MAIN FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

function countWords(obj: unknown): number {
  return JSON.stringify(obj).split(/\s+/).length
}

async function main() {
  console.log('═'.repeat(70))
  console.log('  Enrich Level 4 "University-Ready English for French Speakers" — Units 7–9')
  console.log('  Course ID: ' + COURSE_ID)
  console.log('  Mode: ' + (DRY_RUN ? 'DRY RUN' : 'LIVE'))
  console.log('═'.repeat(70))
  console.log()

  // Verify course exists
  const course = await prisma.course.findUnique({
    where: { id: COURSE_ID },
    select: { id: true, title: true },
  })

  if (!course) {
    console.error('ERROR: Could not find course with ID ' + COURSE_ID)
    process.exit(1)
  }
  console.log(`Found course: ${course.title} (${course.id})\n`)

  const unitConfigs: { unitNumber: number; lessons: EnrichedLesson[]; label: string }[] = [
    { unitNumber: 7, lessons: unit7Lessons, label: 'Unit 7: Professional English' },
    { unitNumber: 8, lessons: unit8Lessons, label: 'Unit 8: Advanced Integrated Skills' },
    { unitNumber: 9, lessons: unit9Lessons, label: 'Unit 9: Final Certification' },
  ]

  let totalUpdated = 0
  let totalSkipped = 0

  for (const unitConfig of unitConfigs) {
    console.log(`\n${'─'.repeat(70)}`)
    console.log(`  ${unitConfig.label} (unitNumber: ${unitConfig.unitNumber})`)
    console.log(`${'─'.repeat(70)}\n`)

    const unit = await prisma.unit.findFirst({
      where: { courseId: COURSE_ID, unitNumber: unitConfig.unitNumber },
      select: { id: true, title: true, unitNumber: true },
    })

    if (!unit) {
      console.error(`  ERROR: Could not find unit ${unitConfig.unitNumber} for course ${COURSE_ID}`)
      totalSkipped += unitConfig.lessons.length
      continue
    }
    console.log(`  Found unit: ${unit.title} (Unit ${unit.unitNumber})`)

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

      const content = dbLesson.content as Record<string, unknown> | null

      const updatedContent = {
        ...(content || {}),
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
      console.log(`  [CONTENT] W${enriched.weekNumber}: ${vocabCount} vocab items, ${quizCount} quiz questions`)

      if (!DRY_RUN) {
        await prisma.lesson.update({
          where: { id: dbLesson.id },
          data: { content: updatedContent as Record<string, unknown> },
        })
        console.log(`  [UPDATED] W${enriched.weekNumber}: ${dbLesson.title}`)
      } else {
        console.log(`  [DRY RUN] W${enriched.weekNumber}: ${dbLesson.title} — would update`)
      }
      totalUpdated++
      console.log()
    }
  }

  console.log(`${'═'.repeat(70)}`)
  console.log(`  Summary: ${totalUpdated} lessons enriched, ${totalSkipped} skipped`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN — no changes written' : 'LIVE — changes saved to DB'}`)
  console.log(`${'═'.repeat(70)}\n`)

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error('Error:', err)
  prisma.$disconnect()
  process.exit(1)
})
