#!/usr/bin/env tsx
/**
 * Enrich English Foundations for French Speakers — Level 1 (A1→A2) Units 7-9
 *
 * All three pathways (ADVANCED, STANDARD, VOCATIONAL) for W25–W36.
 *
 * Unit 7: School and Learning (W25-W28)
 *   W25: School Subjects and Supplies (INSTRUCTION)
 *   W26: Classroom Instructions and Requests (INSTRUCTION)
 *   W27: Reading Simple Texts (INSTRUCTION)
 *   W28: My School Story (PROJECT)
 *
 * Unit 8: Past and Future (W29-W32)
 *   W29: Talking About the Past (INSTRUCTION)
 *   W30: Plans and the Future (INSTRUCTION)
 *   W31: Telling Simple Stories (INSTRUCTION)
 *   W32: My Past, Present, and Future (PROJECT)
 *
 * Unit 9: Review and Assessment (W33-W36)
 *   W33: Grammar and Vocabulary Review (INSTRUCTION)
 *   W34: Speaking and Listening Review (INSTRUCTION)
 *   W35: Reading and Writing Review (INSTRUCTION)
 *   W36: Level 1 Final Assessment (PROJECT)
 *
 * EFL-specific: French-English contrasts, false cognates, biblical worldview.
 * VOCATIONAL: practical English for work, daily life, church ministry.
 *
 * Usage:
 *   npx tsx scripts/enrich-ef-l1-u7-9.ts --dry-run
 *   npx tsx scripts/enrich-ef-l1-u7-9.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve('.env.local') })
dotenv.config({ path: path.resolve('.env') })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry-run')
const COURSE_ID = 'cmo78o9zo0000on5tlzntk2gx'

// ─── Types ──────────────────────────────────────────────────────────────────

interface ContentBlock { type: string; [key: string]: unknown }
interface PathwayVariant { pathway: 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'; title: string; estimatedMinutes: number; objectives: string[]; ipo: { input: ContentBlock[]; processing: ContentBlock[]; output: ContentBlock[] } }
interface VocabItem { term: string; definition: string; example: string }
interface QuizQuestion { question: string; options: string[]; correctAnswer: number; explanation: string }
interface EnrichedLesson { weekNumber: number; pathways: [PathwayVariant, PathwayVariant, PathwayVariant]; vocabulary: VocabItem[]; quiz: QuizQuestion[] }
interface LessonContent { schemaVersion: number; pathways: PathwayVariant[]; vocabulary?: unknown[]; quiz?: unknown[]; resources?: unknown[]; [key: string]: unknown }

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 7: SCHOOL AND LEARNING (W25–W28)
// ═══════════════════════════════════════════════════════════════════════════════

const unit7Lessons: EnrichedLesson[] = [
  // ── W1: School Subjects and Supplies (INSTRUCTION) ───────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'School Subjects and Supplies',
        estimatedMinutes: 60,
        objectives: [
          'Identify and use vocabulary for common school subjects, rooms, and supplies in English.',
          'Recognize and avoid false cognates related to school (e.g., collège, librairie, professeur).',
          'Compare the French and English school systems, including key structural differences.',
          'Use articles and prepositions correctly when talking about school life.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you go to a "collège" after primary school. But in English, "college" means a university! If a French speaker says "I go to college" in English, people will think they are 18, not 12. One small word — a very big misunderstanding.',
              connection: 'Learning English is like learning a new map. Some roads look the same as French, but they lead to different places. Today we will learn the English map for school life — and avoid the wrong turns that trip up French speakers.'
            },
            {
              type: 'reading',
              title: 'A Day at Greenfield School',
              source: 'Original A1-A2 reading passage',
              text: 'My name is Sarah. I am in Grade 7. I go to Greenfield School. My favorite subject is science because we do experiments. I also like art — we paint and draw every Thursday.\n\nIn the morning, I have math and English. After lunch, I have history and PE (physical education). I need my notebook, my pencil case, and my textbook for every class. My backpack is always heavy!\n\nOur school has a library, a gym, and a computer lab. The library is my favorite place. I borrow books every week. My teacher, Mrs. Johnson, says reading is the best way to learn new words.\n\nSchool starts at 8:30 and finishes at 3:15. After school, I go to soccer practice. I love my school!'
            },
            {
              type: 'text',
              heading: 'School Vocabulary: Subjects, Supplies, and Places',
              body: '**School Subjects:**\nmath (mathematics) — les mathématiques | science — les sciences | English — l\'anglais | history — l\'histoire | geography — la géographie | art — les arts plastiques | music — la musique | PE (physical education) — l\'éducation physique | computer science — l\'informatique\n\n**School Supplies:**\nnotebook — un cahier | textbook — un manuel | pencil — un crayon | pen — un stylo | eraser — une gomme | ruler — une règle | backpack — un sac à dos | pencil case — une trousse | scissors — des ciseaux | glue — de la colle\n\n**School Places:**\nclassroom — une salle de classe | library — une bibliothèque | gym (gymnasium) — un gymnase | cafeteria — une cafétéria | hallway — un couloir | computer lab — une salle informatique | playground — une cour de récréation\n\n**DANGER: False Cognates!**\n- **collège** (French) = middle school. **college** (English) = university-level school. A "collège" student in France is 11-15 years old. A "college" student in the US/UK is 18+.\n- **librairie** (French) = bookstore. **library** (English) = bibliothèque. If you say "I went to the librairie," English speakers think you bought books, not borrowed them.\n- **professeur** (French) = any teacher. **professor** (English) = a university teacher only. Your teacher at school is a "teacher," not a "professor."\n- **classe** (French) = can mean grade level (sixième, cinquième). **class** (English) = one lesson period or a group of students. Your grade level is "Grade 6" or "Year 7," not "class."\n\n**French vs. English School Systems:**\nIn France and French-speaking countries, students go through école primaire, collège, lycée, and may take the baccalauréat exam. In the US, students go through elementary school, middle school, high school, and may earn a GPA (grade point average). In the UK, there are primary school, secondary school, and GCSEs/A-Levels. The structures are different, but the goal is the same: learning and growing.'
            },
            {
              type: 'text',
              heading: 'Grammar Focus: Articles and Prepositions for School',
              body: '**Articles:**\nEnglish uses "a/an" (indefinite) and "the" (definite). French speakers often forget articles or use them incorrectly because French rules are different.\n- "I need a notebook" (NOT "I need notebook").\n- "The library is closed" (NOT "Library is closed").\n- We say "I study math" (no article for subjects!) but "I have a math class."\n\n**Prepositions of Place:**\n- "at school" (NOT "in the school" for the general idea)\n- "in the classroom" / "in the library"\n- "on the desk" / "on the shelf"\n- "next to the gym" / "between the cafeteria and the library"\n\n**Prepositions of Time:**\n- "at 8:30" (specific time)\n- "in the morning / in the afternoon"\n- "on Monday / on Thursdays" (days use "on")\n\nFrench speakers often say "in Monday" or "at the morning" because of direct translation from "le lundi" or "le matin." Practice the correct English prepositions!'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Fear of the Lord Is the Beginning of Knowledge',
              framework: 'Grand Narrative',
              scriptureRef: 'Proverbs 1:7; Colossians 3:23',
              reflection: 'Proverbs 1:7 says, "The fear of the Lord is the beginning of knowledge; fools despise wisdom and instruction." Every subject you study — math, science, history, English — is an opportunity to discover more about God\'s world. God created the order in mathematics, the wonders in science, the stories in history, and the gift of language itself. When you study hard and learn well, you honor the God who made your mind. Colossians 3:23 says, "Whatever you do, work heartily, as for the Lord." That includes learning a new language!',
              applicationQuestion: 'How does knowing that God created your ability to learn change the way you approach studying English?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "collège" in French and "college" in English? Why is this a dangerous false cognate for French speakers?',
                'Compare the French school system (collège, lycée, baccalauréat) with the American system (middle school, high school, GPA). What are two key differences?',
                'Why does Proverbs 1:7 say knowledge begins with "the fear of the Lord"? How does this apply to learning English as a new language?'
              ]
            },
            {
              type: 'practice',
              activity: 'School Vocabulary Matching',
              prompt: 'Complete these exercises:\n\n1. Match the false cognate to its CORRECT English meaning:\n   a) collège → _____ (middle school / university)\n   b) librairie → _____ (library / bookstore)\n   c) professeur → _____ (any teacher / university teacher only)\n\n2. Fill in the correct preposition (at, in, on):\n   a) School starts ___ 8:30.\n   b) I have math ___ Monday.\n   c) The books are ___ the shelf.\n   d) We eat lunch ___ the cafeteria.\n\n3. Write 3 sentences about YOUR school day using at least 3 school vocabulary words and the correct articles.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My School Day Description',
              prompt: 'Write 8-10 sentences describing your typical school day. Include: (1) What time school starts and finishes. (2) At least 4 school subjects. (3) At least 3 school supplies you use. (4) Your favorite place at school and why. Use correct articles (a, an, the) and prepositions (at, in, on). Avoid false cognates!'
            },
            {
              type: 'discussion',
              questions: [
                'Read your description to a partner or family member. Did you avoid false cognates? Did you use the correct articles and prepositions?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'School Subjects and Supplies',
        estimatedMinutes: 45,
        objectives: [
          'Learn vocabulary for school subjects, supplies, and places in English.',
          'Recognize common false cognates related to school (collège, librairie).',
          'Use basic articles and prepositions when talking about school.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Did you know that "collège" in French means middle school, but "college" in English means university? One word, two very different meanings! Today we learn the correct English words for school.',
              connection: 'God gave us the ability to learn new languages. Every new word you learn opens a door to understanding more of God\'s world and connecting with more of God\'s people.'
            },
            {
              type: 'reading',
              title: 'A Day at Greenfield School',
              source: 'Original A1-A2 reading passage',
              text: 'My name is Sarah. I am in Grade 7. I go to Greenfield School. My favorite subject is science. I also like art.\n\nIn the morning, I have math and English. After lunch, I have history and PE. I need my notebook, my pencil case, and my textbook for every class.\n\nOur school has a library, a gym, and a computer lab. The library is my favorite place. School starts at 8:30 and finishes at 3:15. I love my school!'
            },
            {
              type: 'text',
              heading: 'School Vocabulary',
              body: '**Subjects:** math, science, English, history, art, music, PE (physical education), computer science\n\n**Supplies:** notebook, textbook, pencil, pen, eraser, ruler, backpack, pencil case\n\n**Places:** classroom, library, gym, cafeteria, hallway, playground\n\n**False Cognates — Be Careful!**\n- "collège" (French) = middle school. "college" (English) = university.\n- "librairie" (French) = bookstore. "library" (English) = bibliothèque.\n- "professeur" (French) = any teacher. "professor" (English) = university teacher only.\n\n**Articles:** Use "a" or "an" before singular nouns: "a notebook," "an eraser." Use "the" for specific things: "the library."\n\n**Prepositions:** "at school," "in the classroom," "on the desk," "at 8:30," "on Monday."'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Fear of the Lord Is the Beginning of Knowledge',
              framework: 'Grand Narrative',
              scriptureRef: 'Proverbs 1:7',
              reflection: 'Proverbs 1:7 says, "The fear of the Lord is the beginning of knowledge." Every subject you study helps you understand God\'s creation. When you learn English, you can share God\'s love with more people around the world. Studying is a way to honor God!',
              applicationQuestion: 'What is one school subject that helps you learn more about God\'s world?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What does "collège" mean in French? What does "college" mean in English? Why is this confusing?',
                'Name three school supplies in English. Can you use them in a sentence?'
              ]
            },
            {
              type: 'practice',
              activity: 'Fill in the Blanks',
              prompt: 'Complete these sentences with the correct word:\n\n1. I need a ___ (notebook/library) for my math class.\n2. The ___ (library/librairie) has many books I can borrow.\n3. School starts ___ (at/in) 8:30.\n4. I have science ___ (on/at) Wednesday.\n5. My ___ (teacher/professor) is very nice.\n\nThen write 3 sentences about your school using correct vocabulary.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My School Day',
              prompt: 'Write 5-7 sentences about your school day. Include: what subjects you have, what supplies you need, and your favorite place at school. Use correct articles (a, an, the) and avoid false cognates.'
            },
            {
              type: 'discussion',
              questions: [
                'Share your sentences with a partner. Check each other for false cognates!'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'School Subjects and Supplies',
        estimatedMinutes: 35,
        objectives: [
          'Learn basic English words for school subjects and supplies.',
          'Know the difference between "collège" (French) and "college" (English).',
          'Use simple sentences to talk about school.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, "collège" means middle school. In English, "college" means university! Be careful with words that look the same but mean different things.',
              connection: 'God helps us learn. Proverbs 1:7 says knowing God is where all learning starts. Every new English word you learn is a gift from God!'
            },
            {
              type: 'reading',
              title: 'Sarah\'s School Day',
              source: 'Original A1 reading passage',
              text: 'My name is Sarah. I go to Greenfield School. I like science and art. I have math in the morning. I need my notebook and pencil. The library is my favorite place. School starts at 8:30.'
            },
            {
              type: 'text',
              heading: 'School Words',
              body: '**Subjects:** math, science, English, history, art, music, PE\n\n**Supplies:** notebook, pencil, pen, eraser, backpack\n\n**Places:** classroom, library, gym, cafeteria\n\n**Be Careful!**\n- "collège" (French) = middle school. "college" (English) = university!\n- "librairie" (French) = bookstore. "library" (English) = bibliothèque!\n\n**Simple sentences:** "I have math." "I need a pencil." "The library is big."'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Helps Us Learn',
              framework: 'Grand Narrative',
              scriptureRef: 'Proverbs 1:7',
              reflection: 'The Bible says knowing God is the beginning of knowledge. When you learn English, you are using the brain God gave you. He is happy when you work hard!',
              applicationQuestion: 'What is your favorite subject? Why?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What does "college" mean in English? Is it the same as "collège" in French?',
                'Name three things in your backpack in English.'
              ]
            },
            {
              type: 'practice',
              activity: 'Match and Write',
              prompt: 'Match the English word to its meaning:\n1. library → a) where you eat lunch  b) where you borrow books\n2. college → a) middle school  b) university\n3. teacher → a) any teacher  b) only university teacher\n\nThen write 3 simple sentences about your school. Example: "I have math. I need a notebook. The gym is big."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My School',
              prompt: 'Write 3-5 sentences about your school. What subjects do you have? What supplies do you need? What is your favorite place? Use correct English words (not false cognates!).'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences out loud. Practice saying each school word clearly.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'subject', definition: 'A topic you study at school (math, science, history)', example: 'My favorite subject is science.' },
      { term: 'notebook', definition: 'A book with blank pages for writing notes', example: 'I write my homework in my notebook.' },
      { term: 'library', definition: 'A place where you can borrow books (NOT a bookstore)', example: 'I go to the library every Tuesday.' },
      { term: 'college', definition: 'A school for students after high school (university level) — NOT the same as French "collège"', example: 'She wants to go to college after high school.' },
      { term: 'textbook', definition: 'A book used for studying a particular subject', example: 'Open your textbook to page 45.' },
      { term: 'backpack', definition: 'A bag you carry on your back for school supplies', example: 'My backpack is very heavy today.' },
      { term: 'gymnasium (gym)', definition: 'A large room or building for sports and exercise', example: 'We play basketball in the gym.' },
      { term: 'schedule', definition: 'A plan that shows when events or classes happen', example: 'My schedule says I have English at 10:00.' }
    ],
    quiz: [
      { question: 'What does "college" mean in English?', options: ['Middle school', 'Primary school', 'University-level school', 'High school'], correctAnswer: 2, explanation: '"College" in English means a university-level school. The French "collège" (middle school) is a false cognate.' },
      { question: 'What is the English word for the place where you borrow books?', options: ['Librairie', 'Bookstore', 'Library', 'Book shop'], correctAnswer: 2, explanation: '"Library" is where you borrow books. "Librairie" in French means bookstore, not library.' },
      { question: 'Which preposition is correct? "School starts ___ 8:30."', options: ['in', 'on', 'at', 'to'], correctAnswer: 2, explanation: 'We use "at" with specific times: "at 8:30," "at noon," "at 3:15."' },
      { question: 'Which sentence is correct?', options: ['I need notebook.', 'I need a notebook.', 'I need the a notebook.', 'I need an notebook.'], correctAnswer: 1, explanation: 'We use "a" before singular countable nouns: "a notebook," "a pencil," "a textbook."' },
      { question: 'In English, what do you call your teacher at school?', options: ['Professor', 'Doctor', 'Teacher', 'Master'], correctAnswer: 2, explanation: 'In English, "teacher" is for school teachers. "Professor" is only for university teachers.' },
      { question: 'Which preposition is correct? "I have math ___ Monday."', options: ['in', 'at', 'to', 'on'], correctAnswer: 3, explanation: 'We use "on" with days of the week: "on Monday," "on Friday," "on Thursdays."' },
      { question: 'What does "PE" stand for?', options: ['Personal Education', 'Physical Education', 'Primary English', 'Public Exercise'], correctAnswer: 1, explanation: 'PE stands for Physical Education — the class where you do sports and exercise.' },
      { question: 'Which is a FALSE cognate (faux ami)?', options: ['music / musique', 'art / art', 'librairie / library', 'science / science'], correctAnswer: 2, explanation: '"Librairie" (French) means bookstore, but "library" (English) means bibliothèque. They look similar but mean different things.' },
      { question: 'Where do students eat lunch at school?', options: ['The gymnasium', 'The cafeteria', 'The library', 'The hallway'], correctAnswer: 1, explanation: 'Students eat lunch in the cafeteria. The gymnasium is for sports.' },
      { question: 'Complete the sentence: "The books are ___ the shelf."', options: ['at', 'in', 'on', 'to'], correctAnswer: 2, explanation: 'We use "on" for surfaces: "on the shelf," "on the desk," "on the table."' }
    ]
  },

  // ── W2: Classroom Instructions and Requests (INSTRUCTION) ──────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Classroom Instructions and Requests',
        estimatedMinutes: 60,
        objectives: [
          'Understand and use common classroom instructions in English (open, close, write, read, listen, repeat).',
          'Form polite requests using "Can I...?", "May I...?", and "Could you...?"',
          'Use polite expressions (please, thank you, excuse me, sorry) appropriately in school contexts.',
          'Understand and form imperative sentences for giving instructions.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you are in an English class and you need to go to the bathroom. In French, you might say "Est-ce que je peux aller aux toilettes?" In English, the polite way is "May I go to the restroom, please?" Notice: English says "restroom" or "bathroom" — not "toilet" in polite conversation. Small differences in politeness can make a big impression!',
              connection: 'Learning polite English is not just about grammar — it is about showing respect to others. The Bible teaches us to treat others with kindness and honor. Polite language is one way we do this every day.'
            },
            {
              type: 'reading',
              title: 'In the Classroom',
              source: 'Original A1-A2 dialogue',
              text: 'Teacher: Good morning, class. Please open your textbooks to page 12.\nStudent 1: Excuse me, Mrs. Chen. May I borrow a pencil?\nTeacher: Of course. Here you go.\nStudent 1: Thank you very much.\nTeacher: You\'re welcome. Now, everyone, please read the first paragraph silently.\nStudent 2: Sorry, Mrs. Chen. Could you repeat that, please? I didn\'t understand.\nTeacher: Sure! Please read the first paragraph silently. That means read without speaking.\nStudent 2: Oh, I see. Thank you.\nTeacher: Great. When you finish, please close your books and look at the board.\nStudent 3: Can I go to the restroom, please?\nTeacher: Yes, you may. Please be quick.'
            },
            {
              type: 'text',
              heading: 'Classroom Instructions: The Imperative',
              body: '**Common Classroom Instructions:**\n"Open your books." / "Close the door." / "Write your name." / "Read the text." / "Listen carefully." / "Repeat after me." / "Look at the board." / "Sit down." / "Stand up." / "Be quiet, please." / "Work in pairs." / "Hand in your homework."\n\nThe **imperative** is the grammar form for giving instructions. In English, the imperative is simple — use the base form of the verb with no subject:\n- "Open your books." (NOT "You open your books.")\n- "Write your name." (NOT "You write your name.")\n- Add "please" to make it polite: "Please open your books." or "Open your books, please."\n- For negative instructions: "Don\'t talk." "Don\'t run in the hallway."\n\n**French Comparison:** French also uses the imperative (Ouvrez vos livres), but French has three imperative forms (tu, nous, vous). English has only one — the base verb. This makes English imperatives simpler!\n\n**"Can I...?" vs. "May I...?" vs. "Could you...?"**\n- "Can I...?" = informal request (Can I borrow a pen?)\n- "May I...?" = formal/polite request (May I go to the restroom?)\n- "Could you...?" = asking someone else to do something (Could you repeat that, please?)\n\nIn French, "Est-ce que je peux...?" covers most situations. In English, using "May I" shows extra politeness — teachers and bosses appreciate it!\n\n**Polite Expressions:**\n- "Please" — add to any request\n- "Thank you" / "Thanks" — after receiving help\n- "You\'re welcome" — response to "thank you"\n- "Excuse me" — to get attention or apologize for a small interruption\n- "Sorry" / "I\'m sorry" — to apologize\n- "Pardon?" or "Could you repeat that?" — when you don\'t understand (NOT "What?" which sounds rude)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Speaking with Grace',
              framework: 'Grand Narrative',
              scriptureRef: 'Colossians 4:6; Ephesians 4:29',
              reflection: 'Colossians 4:6 says, "Let your speech always be gracious, seasoned with salt." Ephesians 4:29 says our words should build others up. Polite language — saying please, thank you, excuse me — is not just a social rule. It is a way of honoring the people God has placed in our lives. When you say "May I?" instead of demanding, when you say "Thank you" instead of taking things for granted, you are reflecting the character of Christ, who served others with humility and grace.',
              applicationQuestion: 'How does using polite language in English (or any language) reflect what the Bible teaches about how we should treat others?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "Can I...?" and "May I...?" in English? When would you use each one?',
                'Why is it important to say "Could you repeat that, please?" instead of just "What?" in a classroom?',
                'How does Colossians 4:6 ("Let your speech always be gracious") connect to using polite expressions in English?'
              ]
            },
            {
              type: 'practice',
              activity: 'Polite Requests Practice',
              prompt: 'Rewrite each sentence to make it polite:\n\n1. "Give me a pencil." → ___\n2. "I want to go to the bathroom." → ___\n3. "Say that again." → ___\n4. "Help me." → ___\n5. "Move. I can\'t see the board." → ___\n\nThen write a short dialogue (6-8 lines) between a student and a teacher. The student needs to: (1) ask to borrow something, (2) ask the teacher to repeat something, (3) ask to leave the room. Use "please," "thank you," and correct request forms.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Classroom Role-Play Script',
              prompt: 'Write a role-play script (10-12 lines) for a classroom scene. Include a teacher giving at least 4 imperative instructions and 2-3 students making polite requests. Use "Can I...?", "May I...?", "Could you...?", "please," "thank you," and "excuse me." Make it realistic!'
            },
            {
              type: 'discussion',
              questions: [
                'Practice reading your role-play out loud. Pay attention to your intonation — polite requests go up at the end.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Classroom Instructions and Requests',
        estimatedMinutes: 45,
        objectives: [
          'Understand common classroom instructions in English.',
          'Make polite requests using "Can I...?" and "May I...?"',
          'Use polite expressions: please, thank you, excuse me, sorry.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How do you ask to go to the bathroom in English? Not "I want go toilet" — the polite way is "May I go to the restroom, please?" Polite English makes a great impression!',
              connection: 'The Bible tells us to speak with kindness. Learning polite English helps us show respect to teachers, classmates, and everyone we meet.'
            },
            {
              type: 'reading',
              title: 'In the Classroom',
              source: 'Original A1-A2 dialogue',
              text: 'Teacher: Good morning. Please open your textbooks to page 12.\nStudent: Excuse me. May I borrow a pencil?\nTeacher: Of course. Here you go.\nStudent: Thank you.\nTeacher: Please read the first paragraph.\nStudent: Sorry, could you repeat that, please?\nTeacher: Sure! Read the first paragraph.\nStudent: Can I go to the restroom, please?\nTeacher: Yes, you may.'
            },
            {
              type: 'text',
              heading: 'Classroom Language',
              body: '**Instructions (Imperative):**\n"Open your books." / "Close the door." / "Write your name." / "Listen carefully." / "Repeat after me." / "Look at the board." / "Sit down." / "Be quiet, please."\n\nThe imperative = base verb, no subject: "Open your books." (NOT "You open your books.")\n\n**Polite Requests:**\n- "Can I borrow a pencil?" (informal)\n- "May I go to the restroom?" (polite/formal)\n- "Could you repeat that, please?" (asking someone to do something)\n\n**Polite Words:**\n- "Please" — add to requests\n- "Thank you" — after receiving help\n- "Excuse me" — to get attention\n- "Sorry" — to apologize\n- "Pardon?" — when you don\'t understand'
            },
            {
              type: 'biblical-worldview',
              theme: 'Speaking with Grace',
              framework: 'Grand Narrative',
              scriptureRef: 'Colossians 4:6',
              reflection: 'The Bible says, "Let your speech always be gracious" (Colossians 4:6). Saying "please" and "thank you" is a simple way to show kindness and respect. Polite language honors God and the people around you.',
              applicationQuestion: 'Why does the Bible care about HOW we speak, not just WHAT we say?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "Can I...?" and "May I...?"?',
                'Why should you say "Pardon?" instead of "What?" when you don\'t understand?'
              ]
            },
            {
              type: 'practice',
              activity: 'Make It Polite',
              prompt: 'Rewrite each sentence politely:\n1. "Give me a pencil." → ___\n2. "I want to go to the bathroom." → ___\n3. "Say that again." → ___\n\nThen write a 4-6 line dialogue between a student and teacher using polite requests.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Classroom Dialogue',
              prompt: 'Write a dialogue (6-8 lines) between a teacher and a student. The teacher gives 3 instructions. The student makes 2 polite requests. Use "please," "thank you," and "May I...?" or "Can I...?"'
            },
            {
              type: 'discussion',
              questions: [
                'Practice reading your dialogue with correct polite intonation.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Classroom Instructions and Requests',
        estimatedMinutes: 35,
        objectives: [
          'Understand basic classroom instructions (open, close, write, read, listen).',
          'Ask polite questions using "Can I...?" and "please."',
          'Say "thank you," "excuse me," and "sorry" correctly.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you need something in English, say "please." When someone helps you, say "thank you." These two words make everything better!',
              connection: 'God wants us to be kind when we speak. "Please" and "thank you" are small words that show big respect.'
            },
            {
              type: 'reading',
              title: 'In Class',
              source: 'Original A1 dialogue',
              text: 'Teacher: Open your books, please.\nStudent: Can I borrow a pencil, please?\nTeacher: Yes, here you go.\nStudent: Thank you!\nTeacher: You\'re welcome. Now, listen carefully.'
            },
            {
              type: 'text',
              heading: 'Polite English',
              body: '**Instructions:** "Open your books." "Close the door." "Write your name." "Listen." "Repeat."\n\n**Asking politely:** "Can I borrow a pencil, please?" "Can I go to the bathroom, please?"\n\n**Important words:** please, thank you, excuse me, sorry, you\'re welcome\n\n**Remember:** Always add "please" when you ask for something. Always say "thank you" when someone helps you.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Kind Words',
              framework: 'Grand Narrative',
              scriptureRef: 'Colossians 4:6',
              reflection: 'The Bible says to speak with kindness. When you say "please" and "thank you," you are being kind. God loves kind words!',
              applicationQuestion: 'When do you say "thank you" in your day?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you ask to borrow a pencil politely in English?',
                'What do you say when someone helps you?'
              ]
            },
            {
              type: 'practice',
              activity: 'Polite Practice',
              prompt: 'Fill in the missing word:\n1. "Can I borrow a pen, ___?" (please/sorry)\n2. "Here is your book." → "___ ___!" (Thank you)\n3. "___ ___, can I ask a question?" (Excuse me)\n\nThen write 2 sentences asking for something politely.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Polite Sentences',
              prompt: 'Write 3-4 sentences using polite English. Ask to borrow something, ask to go somewhere, and say thank you. Example: "Can I borrow your eraser, please? Thank you!"'
            },
            {
              type: 'discussion',
              questions: [
                'Practice saying "May I go to the restroom, please?" three times with good pronunciation.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'please', definition: 'A polite word added to requests', example: 'Can I have a pencil, please?' },
      { term: 'excuse me', definition: 'A polite way to get someone\'s attention or apologize for a small interruption', example: 'Excuse me, may I ask a question?' },
      { term: 'imperative', definition: 'A grammar form used for giving instructions or commands', example: '"Open your books" is an imperative sentence.' },
      { term: 'request', definition: 'When you politely ask for something or ask to do something', example: '"May I go to the restroom?" is a polite request.' },
      { term: 'repeat', definition: 'To say or do something again', example: 'Could you repeat that, please? I didn\'t hear you.' },
      { term: 'borrow', definition: 'To take something temporarily and return it later (NOT the same as "lend")', example: 'Can I borrow your pen? I will give it back after class.' },
      { term: 'restroom', definition: 'A polite English word for the bathroom/toilet in public places', example: 'May I go to the restroom, please?' },
      { term: 'polite', definition: 'Showing good manners and respect for others', example: 'It is polite to say "thank you" when someone helps you.' }
    ],
    quiz: [
      { question: 'Which is the MOST polite way to ask to leave the room?', options: ['I want go out.', 'May I leave the room, please?', 'I go now.', 'Let me go.'], correctAnswer: 1, explanation: '"May I leave the room, please?" uses the polite "May I" form plus "please."' },
      { question: 'What is the imperative form of the verb "to open"?', options: ['You open.', 'Opening.', 'Open.', 'Opens.'], correctAnswer: 2, explanation: 'The imperative uses the base form of the verb with no subject: "Open your books."' },
      { question: 'What should you say when you don\'t understand the teacher?', options: ['What?', 'Huh?', 'Say again.', 'Could you repeat that, please?'], correctAnswer: 3, explanation: '"Could you repeat that, please?" is the polite way to ask someone to say something again.' },
      { question: '"Can I borrow your pen?" means:', options: ['I want to keep your pen.', 'I want to use your pen and return it.', 'I want to buy your pen.', 'I lost your pen.'], correctAnswer: 1, explanation: '"Borrow" means to take temporarily and return later. "Can I borrow your pen?" means you will give it back.' },
      { question: 'Which word makes a request polite?', options: ['Now', 'Quick', 'Please', 'Hey'], correctAnswer: 2, explanation: '"Please" is the key word that makes any request polite: "Can I have some water, please?"' },
      { question: 'What is the polite response to "Thank you"?', options: ['Okay.', 'Nothing.', 'You\'re welcome.', 'Of course not.'], correctAnswer: 2, explanation: '"You\'re welcome" is the standard polite response to "Thank you" in English.' },
      { question: 'Which is correct?', options: ['Don\'t to run in the hallway.', 'Not run in the hallway.', 'Don\'t run in the hallway.', 'No running the hallway.'], correctAnswer: 2, explanation: 'Negative imperative = "Don\'t" + base verb: "Don\'t run in the hallway."' },
      { question: '"Excuse me" is used when you want to:', options: ['Say goodbye', 'Get someone\'s attention politely', 'Say you are angry', 'Ask for money'], correctAnswer: 1, explanation: '"Excuse me" is a polite way to get someone\'s attention or interrupt respectfully.' },
      { question: 'What is the polite English word for "toilettes"?', options: ['Toilet', 'Water closet', 'Restroom', 'Pipi room'], correctAnswer: 2, explanation: 'In polite English, we say "restroom" or "bathroom" instead of "toilet" when referring to public facilities.' },
      { question: 'Which sentence is an imperative?', options: ['I am reading.', 'She reads every day.', 'Read the first paragraph.', 'He is going to read.'], correctAnswer: 2, explanation: '"Read the first paragraph" is an imperative — it gives an instruction using the base verb with no subject.' }
    ]
  },

  // ── W3: Reading Simple Texts (INSTRUCTION) ───────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Reading Simple Texts',
        estimatedMinutes: 60,
        objectives: [
          'Apply reading strategies for A1-A2 texts: identifying main ideas, using context clues, and scanning for specific information.',
          'Read and comprehend short texts about school life, daily activities, and familiar topics.',
          'Use pictures, titles, and formatting to predict content before reading.',
          'Build reading confidence by working through increasingly complex A2-level passages.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you read in French, you do not look up every single word — you understand the general meaning from context. You can do the same thing in English! Good readers do not know every word. They use strategies: they look at the title, they look at pictures, they read the whole sentence before stopping at a hard word. These strategies work in every language.',
              connection: 'Reading is one of the greatest gifts God has given to humanity. Through reading, we can learn from people we have never met, visit places we have never been, and most importantly, read God\'s Word in the Bible. Building your English reading skills opens the door to reading the Bible, books, and resources in one of the world\'s most widely spoken languages.'
            },
            {
              type: 'reading',
              title: 'Maria\'s New School',
              source: 'Original A2 reading passage',
              text: 'Maria moved from Mexico to Canada last year. Everything was new — the weather, the food, and especially the language. She spoke Spanish at home, but at school everyone spoke English.\n\nAt first, reading in English was very hard. Maria did not understand many words. But her teacher, Mr. Williams, taught her a trick: "Don\'t stop at every word you don\'t know. Read the whole sentence. Look at the words around it. Often, you can guess the meaning."\n\nMaria tried this strategy. When she read "The students gathered in the auditorium for the assembly," she did not know "auditorium" or "assembly." But she knew "students" and "gathered." She guessed it was a big meeting in a big room. She was right!\n\nNow Maria reads English books for fun. She still doesn\'t know every word, but she understands the stories. Her favorite book is about a girl who moves to a new country — just like her.\n\n"Reading changed everything," Maria says. "It gave me confidence."'
            },
            {
              type: 'text',
              heading: 'Reading Strategies for English Learners',
              body: '**Strategy 1: Preview Before Reading**\nBefore you read, look at:\n- The **title** — what is the text about?\n- Any **pictures or images** — what do they show?\n- **Bold words** or headings — what are the key topics?\n- The **first and last sentence** — these often contain the main idea.\n\nPreviewing takes 30 seconds but saves you minutes of confusion.\n\n**Strategy 2: Read for the Main Idea First**\nDon\'t try to understand every word on the first read. Read the whole text quickly and ask: "What is this text about?" This is called **skimming**. You get the big picture first, then the details.\n\n**Strategy 3: Use Context Clues**\nWhen you find a word you don\'t know, look at the words around it:\n- "The teacher was **furious** because the students were very loud and would not listen." You may not know "furious," but "very loud" and "would not listen" tell you it means very angry.\n- Context clues work just like they do in French! You already use this strategy — now use it in English.\n\n**Strategy 4: Scan for Specific Information**\nSometimes you don\'t need to read everything. You need one fact — a name, a date, a number. Move your eyes quickly over the text looking for that specific information. This is called **scanning**.\n\n**Strategy 5: Don\'t Translate Every Word**\nFrench speakers often try to translate word-by-word into French as they read English. This is slow and often inaccurate because word order and expressions differ between languages. Instead, try to understand the English directly. Think in pictures and meanings, not in French translations.\n\n**Common French-Speaker Reading Errors:**\n- Confusing English words that look like French but mean something different (false cognates)\n- Reading too slowly because of word-by-word translation\n- Giving up when encountering one unknown word instead of reading the full sentence'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Gift of Reading',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 119:105; 2 Timothy 3:16-17',
              reflection: 'Psalm 119:105 says, "Your word is a lamp to my feet and a light to my path." God gave us His Word in written form — the Bible. He wants us to read it, understand it, and live by it. The ability to read is a powerful gift. As you improve your English reading skills, you gain access to the Bible in English, to Christian books, to educational resources, and to a global conversation. Every reading strategy you learn today is a tool that will serve you for the rest of your life — in school, in work, and most importantly, in reading God\'s Word.',
              applicationQuestion: 'How can improving your English reading skills help you grow in your faith and serve others?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What strategy did Maria\'s teacher teach her? How did it help her understand "auditorium" and "assembly"?',
                'Why is it a bad idea to translate every English word into French while reading? What should you do instead?',
                'How does reading the Bible connect to the reading strategies we learned today?'
              ]
            },
            {
              type: 'practice',
              activity: 'Context Clue Practice',
              prompt: 'Read each sentence and guess the meaning of the underlined word using context clues:\n\n1. "The classroom was so CRAMPED that students could barely move between the desks."\n   cramped = ___\n\n2. "After the long test, the students were EXHAUSTED and fell asleep on the bus."\n   exhausted = ___\n\n3. "The PRINCIPAL gave a speech to welcome the new students to the school."\n   principal = ___\n\n4. "Maria was SHY at first, but after a few weeks she started talking to her classmates."\n   shy = ___\n\nThen write 2 sentences with a difficult word and context clues so a classmate can guess the meaning.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Reading Reflection',
              prompt: 'Read the passage about Maria again. Answer these questions in complete sentences:\n1. Why was reading in English hard for Maria at first?\n2. What strategy did her teacher teach her?\n3. How did Maria know "auditorium" was a big room?\n4. What is Maria\'s favorite book about? Why do you think she likes it?\n5. Write 3-4 sentences about YOUR experience reading in English. What is hard? What strategy from this lesson will you try?'
            },
            {
              type: 'discussion',
              questions: [
                'Share one reading strategy you want to practice this week. How will it help you read English more confidently?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Reading Simple Texts',
        estimatedMinutes: 45,
        objectives: [
          'Use reading strategies: main ideas, context clues, and previewing.',
          'Read and understand short A1-A2 texts about familiar topics.',
          'Guess the meaning of new words using the words around them.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You do not need to know every word to understand a text! Good readers use clues — the title, the pictures, and the other words in the sentence — to understand new words. You already do this in French. Now try it in English!',
              connection: 'God gave us the Bible in written form because He wants us to read and understand His Word. Every reading skill you build helps you read better — in school and in your Bible.'
            },
            {
              type: 'reading',
              title: 'Maria\'s New School',
              source: 'Original A2 reading passage',
              text: 'Maria moved from Mexico to Canada. At first, reading in English was hard. She did not understand many words. But her teacher said: "Don\'t stop at every word. Read the whole sentence. Guess the meaning from the other words."\n\nMaria tried this. When she read "The students gathered in the auditorium," she guessed "auditorium" was a big room. She was right! Now Maria reads English books for fun.'
            },
            {
              type: 'text',
              heading: 'Reading Strategies',
              body: '**1. Preview:** Look at the title and pictures before reading. Ask: "What is this about?"\n\n**2. Read for the Main Idea:** Don\'t try to understand every word. Ask: "What is the text about?"\n\n**3. Use Context Clues:** If you don\'t know a word, look at the words around it.\n- "She was FURIOUS because the students were loud." → furious = very angry.\n\n**4. Don\'t Translate Word by Word:** Think in English, not French. Word-by-word translation is slow and often wrong.\n\n**5. Keep Reading:** Don\'t stop at one hard word. Finish the sentence first — often the meaning becomes clear.'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Gift of Reading',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 119:105',
              reflection: 'The Bible says God\'s Word is "a lamp to my feet and a light to my path" (Psalm 119:105). Reading skills help you understand the Bible and grow in faith. Every strategy you learn today is a tool for life!',
              applicationQuestion: 'How can better reading skills help you understand the Bible more deeply?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What strategy helped Maria understand "auditorium"?',
                'Why should you NOT stop at every word you don\'t know?'
              ]
            },
            {
              type: 'practice',
              activity: 'Context Clue Practice',
              prompt: 'Guess the meaning of the word in CAPITALS:\n\n1. "The room was CRAMPED — students could barely move." cramped = ___\n2. "After the test, she was EXHAUSTED." exhausted = ___\n3. "Maria was SHY and did not talk much at first." shy = ___\n\nWrite 2 sentences about your experience reading in English.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Reading Answers',
              prompt: 'Answer in complete sentences:\n1. Why was reading hard for Maria at first?\n2. What strategy did her teacher teach her?\n3. What is one reading strategy YOU will try this week?'
            },
            {
              type: 'discussion',
              questions: [
                'Tell a partner about one strategy you learned today.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Reading Simple Texts',
        estimatedMinutes: 35,
        objectives: [
          'Read short English texts and find the main idea.',
          'Use context clues to guess the meaning of new words.',
          'Look at titles and pictures before reading to understand the topic.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You don\'t need to know every word! Look at the title. Look at the pictures. Read the whole sentence. You can guess what new words mean. You already do this in French!',
              connection: 'God gave us the Bible to read. Every time you get better at reading, you can understand more of God\'s Word. That is a wonderful gift!'
            },
            {
              type: 'reading',
              title: 'Maria\'s Story',
              source: 'Original A1 reading passage',
              text: 'Maria moved to a new country. She did not understand English. Her teacher said: "Don\'t stop at every word. Read the whole sentence." Maria tried this. Now she reads English books for fun!'
            },
            {
              type: 'text',
              heading: 'How to Read in English',
              body: '**1. Look at the title.** What is the text about?\n**2. Read the whole sentence.** Don\'t stop at one hard word.\n**3. Guess from clues.** "She was FURIOUS because they were loud." furious = very angry.\n**4. Keep going!** Finish the paragraph, then go back to hard words.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Reading God\'s Word',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 119:105',
              reflection: 'God\'s Word is a light for our life. When you learn to read better, you can understand the Bible more. Keep reading!',
              applicationQuestion: 'What is one thing you like to read?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What does "context clue" mean? Can you give an example?',
                'Why did Maria\'s teacher say "Don\'t stop at every word"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Guess the Word',
              prompt: 'Guess the meaning:\n1. "The room was CRAMPED — no space to move." cramped = ___\n2. "She was very EXHAUSTED after running." exhausted = ___\n\nWrite 1 sentence about reading in English.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Reading',
              prompt: 'Answer these questions:\n1. What helped Maria read English?\n2. What is one strategy you will try?\n\nWrite 2-3 sentences about your experience with reading English.'
            },
            {
              type: 'discussion',
              questions: [
                'Read Maria\'s story out loud. Practice reading smoothly without stopping at every word.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'main idea', definition: 'The most important point or message of a text', example: 'The main idea of the story is that reading gets easier with practice.' },
      { term: 'context clue', definition: 'Words around an unknown word that help you guess its meaning', example: 'I used context clues to guess that "furious" means very angry.' },
      { term: 'skim', definition: 'To read quickly to get the general idea without reading every word', example: 'Skim the article first to see what it is about.' },
      { term: 'scan', definition: 'To look quickly through a text to find specific information', example: 'Scan the schedule to find what time math class starts.' },
      { term: 'preview', definition: 'To look at the title, pictures, and headings before reading the full text', example: 'Preview the chapter before you start reading.' },
      { term: 'paragraph', definition: 'A group of sentences about one topic or idea', example: 'The first paragraph introduces the main character.' },
      { term: 'comprehension', definition: 'Understanding what you read or hear', example: 'Reading comprehension means understanding a text, not just reading the words.' },
      { term: 'confident', definition: 'Feeling sure about your ability to do something', example: 'Maria feels confident reading in English now.' }
    ],
    quiz: [
      { question: 'What should you do FIRST before reading a text?', options: ['Translate every word to French', 'Look at the title and pictures', 'Read the last sentence', 'Close your eyes and guess'], correctAnswer: 1, explanation: 'Previewing — looking at the title and pictures — helps you understand what the text is about before you start reading.' },
      { question: 'What is a "context clue"?', options: ['A word in French', 'A picture in the text', 'Words around an unknown word that help you guess its meaning', 'A dictionary definition'], correctAnswer: 2, explanation: 'Context clues are words surrounding an unknown word that help you figure out what it means.' },
      { question: '"The student was EXHAUSTED after the long test." What does "exhausted" probably mean?', options: ['Excited', 'Very tired', 'Hungry', 'Happy'], correctAnswer: 1, explanation: 'The context "after the long test" suggests exhausted means very tired.' },
      { question: 'What is "skimming"?', options: ['Reading every word carefully', 'Reading quickly for the general idea', 'Reading out loud', 'Translating into French'], correctAnswer: 1, explanation: 'Skimming means reading quickly to get the main idea without focusing on every word.' },
      { question: 'Why should French speakers NOT translate word-by-word when reading English?', options: ['It is too easy', 'It is slow and often inaccurate', 'English has no grammar', 'Teachers do not allow it'], correctAnswer: 1, explanation: 'Word-by-word translation is slow and often wrong because English and French have different word order and expressions.' },
      { question: 'What is the "main idea" of a text?', options: ['The first word', 'The longest sentence', 'The most important point or message', 'The author\'s name'], correctAnswer: 2, explanation: 'The main idea is the most important point the text is trying to communicate.' },
      { question: 'What is "scanning"?', options: ['Reading every word', 'Looking quickly for specific information', 'Writing a summary', 'Listening to the text'], correctAnswer: 1, explanation: 'Scanning means moving your eyes quickly over a text to find one specific piece of information.' },
      { question: 'Maria guessed "auditorium" meant a big room. How?', options: ['She knew the French word', 'She looked at the words "students" and "gathered"', 'She asked her friend', 'She used a dictionary'], correctAnswer: 1, explanation: 'Maria used context clues — she knew "students" and "gathered" suggested a place where people come together.' },
      { question: 'What does "comprehension" mean?', options: ['Speed', 'Understanding', 'Pronunciation', 'Spelling'], correctAnswer: 1, explanation: 'Comprehension means understanding what you read or hear.' },
      { question: 'Which is the BEST reading strategy when you find a hard word?', options: ['Stop reading immediately', 'Close the book', 'Read the whole sentence and use context clues', 'Ask someone to translate it to French'], correctAnswer: 2, explanation: 'The best strategy is to read the full sentence and use the surrounding words as clues to guess the meaning.' }
    ]
  },

  // ── W4: My School Story (PROJECT) ─────────────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'My School Story',
        estimatedMinutes: 60,
        objectives: [
          'Write a narrative comparing your French-speaking school experience with English-speaking school culture.',
          'Use school vocabulary, polite expressions, and reading strategies from Unit 7.',
          'Demonstrate correct use of articles, prepositions, and imperative forms.',
          'Reflect on how learning English connects to God\'s plan for your life.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have been to school in a French-speaking environment. Maybe you are now in an English-speaking school, or maybe you are learning about one. Either way, your school story is unique. Nobody else has YOUR experience of moving between two languages and two cultures. That makes your story worth telling.',
              connection: 'God places each of us in a unique story. Your experience of learning English, navigating two cultures, and growing in knowledge is part of His plan for your life. Jeremiah 29:11 says, "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope."'
            },
            {
              type: 'text',
              heading: 'Project: My School Story',
              body: 'Your project is to write a narrative essay (200-250 words) comparing your French-speaking school experience with English-speaking school culture. This is YOUR story — make it personal, honest, and detailed.\n\n**Your essay should include:**\n1. **Introduction:** Where did you go to school in French? What was it like?\n2. **Comparison:** How is the English-speaking school system different? (Subjects, schedule, vocabulary, culture)\n3. **Challenges:** What was hardest about learning in English? Include at least one false cognate story or mistake you made.\n4. **Growth:** How have you improved? What strategies helped you?\n5. **Conclusion:** How does learning English connect to your future? Include a reflection on Proverbs 1:7 or Jeremiah 29:11.\n\n**Use vocabulary from Unit 7:** school subjects, supplies, polite expressions, reading strategies.\n\n**Rubric:**'
            },
            {
              type: 'text',
              heading: 'Project Rubric',
              body: '**Content (40%):** Essay includes all 5 sections. Personal stories and specific examples are included. At least one false cognate is discussed.\n\n**Vocabulary & Language (30%):** Uses at least 10 school vocabulary words correctly. Uses correct articles (a, an, the) and prepositions (at, in, on). Polite expressions are used where appropriate.\n\n**Organization & Clarity (20%):** Essay has clear paragraphs. Ideas flow logically from introduction to conclusion. Transitions connect ideas.\n\n**Biblical Reflection (10%):** Concluding reflection connects learning to Proverbs 1:7 or Jeremiah 29:11. Shows thoughtful engagement with the verse.'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Planning Your Essay',
              prompt: 'Before writing your full essay, plan each section:\n\n1. My French-speaking school: (3-4 notes about what it was like)\n2. English school differences: (3-4 specific differences)\n3. My biggest challenge: (one story about a mistake or difficulty)\n4. How I improved: (2-3 strategies that helped)\n5. My conclusion: (what does learning English mean for my future?)\n\nWrite your plan, then draft your 200-250 word essay.'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My School Story — Final Draft',
              instructions: 'Write your final 200-250 word essay. Check your work:\n- Did you include all 5 sections?\n- Did you use at least 10 school vocabulary words?\n- Did you avoid false cognates (or explain one you used to get wrong)?\n- Are your articles and prepositions correct?\n- Did you include a biblical reflection?\n\nRead your essay out loud to check for fluency. Submit your final draft.'
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'My School Story',
        estimatedMinutes: 45,
        objectives: [
          'Write a short narrative about your school experience comparing French and English school culture.',
          'Use school vocabulary and polite expressions from Unit 7.',
          'Reflect on learning English as part of God\'s plan.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Your school story is unique! Whether you went to school in Haiti, France, Canada, or another French-speaking place, your experience matters. Now you can tell that story in English.',
              connection: 'God has a plan for your life, including your journey of learning English. Jeremiah 29:11 says He has "plans for welfare and not for evil, to give you a future and a hope."'
            },
            {
              type: 'text',
              heading: 'Project: My School Story',
              body: 'Write a narrative (150-180 words) about your school experience. Include:\n1. **My French school:** What was it like? What subjects did you study?\n2. **English school differences:** What is different about English school? (Vocabulary, schedule, culture)\n3. **A challenge or mistake:** One time English was confusing (maybe a false cognate!)\n4. **My growth:** How have you improved?\n5. **My reflection:** Connect your learning to Proverbs 1:7.\n\n**Rubric:**\n- Content: Includes all 5 parts with personal details (40%)\n- Vocabulary: Uses 8+ school words correctly (30%)\n- Organization: Clear paragraphs, logical order (20%)\n- Biblical reflection: Connects to Proverbs 1:7 (10%)'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Plan Your Story',
              prompt: 'Write notes for each section:\n1. My French school (2-3 details)\n2. English differences (2-3 differences)\n3. A challenge or mistake (one story)\n4. How I improved (1-2 strategies)\n5. My reflection on Proverbs 1:7\n\nThen write your 150-180 word narrative.'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My School Story — Final Draft',
              instructions: 'Write your final 150-180 word narrative. Check: Did you include all 5 parts? Did you use school vocabulary correctly? Did you include a biblical reflection? Read it out loud to check for clarity.'
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'My School Story',
        estimatedMinutes: 35,
        objectives: [
          'Write a short text about your school experience in French and English.',
          'Use school vocabulary from Unit 7.',
          'Connect your learning to God\'s plan for you.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have a unique story! You went to school in French and now you are learning English. Your story matters!',
              connection: 'God has a plan for you. Learning English is part of that plan. He will help you every step of the way!'
            },
            {
              type: 'text',
              heading: 'My School Story',
              body: 'Write a short text (80-120 words) about your school. Include:\n1. What was your French school like?\n2. What is different in English?\n3. What was hard?\n4. How are you getting better?\n5. Thank God for helping you learn.\n\n**Rubric:**\n- Content: Includes personal details (40%)\n- Vocabulary: Uses 5+ school words (30%)\n- Clarity: Easy to understand (20%)\n- Reflection: Thanks God for learning (10%)'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Plan Your Story',
              prompt: 'Write short notes for each part:\n1. My French school (1-2 details)\n2. English differences (1-2 differences)\n3. One challenge\n4. How I am improving\n\nThen write your 80-120 word story.'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My School Story — Final',
              instructions: 'Write your final 80-120 word story. Check that you used school vocabulary. Read it out loud. Share it with someone!'
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'narrative', definition: 'A story or account of events', example: 'I wrote a narrative about my first day at school.' },
      { term: 'compare', definition: 'To look at two things and find similarities and differences', example: 'Compare French school and English school.' },
      { term: 'culture', definition: 'The beliefs, customs, and way of life of a group of people', example: 'French culture and American culture have many differences.' },
      { term: 'challenge', definition: 'Something that is difficult but you try to do it anyway', example: 'Learning English was a big challenge for me.' },
      { term: 'experience', definition: 'Something that happens to you; events you have lived through', example: 'My experience at a French school helped me appreciate other cultures.' }
    ],
    quiz: []
  }
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 8: PAST AND FUTURE (W29–W32)
// ═══════════════════════════════════════════════════════════════════════════════

const unit8Lessons: EnrichedLesson[] = [
  // ── W1: Talking About the Past (INSTRUCTION) ─────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Talking About the Past',
        estimatedMinutes: 60,
        objectives: [
          'Form and use the past simple tense for regular verbs (-ed) and common irregular verbs.',
          'Understand the CRITICAL difference between French passé composé (two words) and English past simple (one word).',
          'Use time expressions for the past (yesterday, last week, ago, when I was young).',
          'Avoid the common French-speaker error of using "have + past participle" instead of simple past.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, to say "I went" you need two words: "Je suis allé(e)." But in English, "I went" is just ONE word. French speakers often say "I have went" or "I am went" because they translate directly from French. This is one of the biggest mistakes French speakers make in English — and today you will learn how to avoid it forever.',
              connection: 'The past matters to God. The Bible is full of stories about what God DID — He created, He called, He delivered, He sent His Son. When we learn to talk about the past in English, we can share our own story and God\'s story with more people.'
            },
            {
              type: 'reading',
              title: 'Samuel\'s Story',
              source: 'Original A2 reading passage',
              text: 'Last summer, Samuel traveled from Haiti to Miami with his family. They arrived on a Monday morning. Samuel looked out the airplane window and saw the ocean. It was beautiful.\n\nOn the first day, they visited a big mall. Samuel bought a new backpack for school. His mother cooked a special dinner that evening.\n\nThe next day, they went to the beach. Samuel played in the water and built a sandcastle. His sister found beautiful shells. They ate ice cream and watched the sunset.\n\n"I loved that trip," Samuel says. "It was the best week of my life. I didn\'t want to leave!"'
            },
            {
              type: 'text',
              heading: 'Past Simple: The #1 Tense for Telling Stories',
              body: '**Regular Verbs: Add -ed**\nwork → worked | play → played | visit → visited | cook → cooked | arrive → arrived | travel → traveled | watch → watched | live → lived\n\n**Spelling Rules:**\n- Verbs ending in -e: add -d only → live → lived, arrive → arrived\n- Short verbs ending in consonant-vowel-consonant: double the last letter → stop → stopped, plan → planned\n- Verbs ending in consonant + y: change y to i, add -ed → study → studied, carry → carried\n\n**Irregular Verbs (you must memorize these!):**\ngo → went | come → came | see → saw | eat → ate | buy → bought | find → found | have → had | make → made | take → took | give → gave | say → said | tell → told | think → thought | know → knew | write → wrote | read → read (same spelling, different pronunciation: /red/) | get → got | do → did | is/are → was/were\n\n**CRITICAL: French vs. English Past Tense**\nFrench passé composé = TWO words: "J\'ai mangé" (I have eaten), "Je suis allé" (I am went).\nEnglish past simple = ONE word: "I ate," "I went."\n\n**Common French-Speaker Errors:**\n- "I have went to school." → WRONG! → "I went to school."\n- "I am arrived yesterday." → WRONG! → "I arrived yesterday."\n- "She has cooked dinner." → This is present perfect (different tense!). For a finished past action, say "She cooked dinner."\n\n**The Rule:** For completed past actions, use ONE word — the past simple form. Do NOT add "have" or "am/is/are" before it.\n\n**Negative:** did + not + base verb → "I did not go" or "I didn\'t go" (NOT "I didn\'t went")\n**Question:** Did + subject + base verb → "Did you go?" (NOT "Did you went?")\n\n**Time Expressions:** yesterday, last week/month/year, ago (two days ago), when I was young, in 2020'
            },
            {
              type: 'text',
              heading: 'Why One Word, Not Two?',
              body: 'English and French handle the past differently because they evolved from different branches of the language family.\n\nFrench builds its past tense with an **auxiliary verb** (avoir or être) plus a past participle: "J\'ai parlé," "Elle est partie." English USED to do something similar in Old English, but over centuries, English simplified. The past simple became just one word.\n\nEnglish DOES have a form that looks like French passé composé — the **present perfect** ("I have eaten," "She has gone"). But in English, the present perfect is used for actions connected to the present, NOT for completed past actions with a specific time.\n\n- "I ate lunch at noon." (Past simple — finished action, specific time)\n- "I have eaten lunch." (Present perfect — I am not hungry now; connected to present)\n\nAt the A1-A2 level, focus on the past simple. It is the tense you need most for telling stories, describing experiences, and talking about your life.'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Acts in History',
              framework: 'Grand Narrative',
              scriptureRef: 'Jeremiah 29:11; Psalm 77:11-12',
              reflection: 'The Bible is a book of past-tense stories: "God created the heavens and the earth." "Moses led the people out of Egypt." "Jesus died and rose again." God is a God who ACTS in history. Psalm 77:11-12 says, "I will remember the deeds of the Lord; yes, I will remember your wonders of old. I will ponder all your work, and meditate on your mighty deeds." When we learn to talk about the past, we can remember what God has done — in history and in our own lives. And Jeremiah 29:11 reminds us that the same God who acted in the past has plans for our future.',
              applicationQuestion: 'What is one thing God has done in YOUR past that you are thankful for? Try to express it in English using the past simple tense.'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the CRITICAL difference between French passé composé and English past simple? Give an example.',
                'Why is "I have went to school yesterday" wrong in English? What is the correct sentence?',
                'How does Psalm 77:11-12 encourage us to remember God\'s past actions? Share one thing God has done for you.'
              ]
            },
            {
              type: 'practice',
              activity: 'Past Simple Practice',
              prompt: 'A. Change these verbs to past simple:\n1. go → ___ 2. eat → ___ 3. play → ___ 4. buy → ___ 5. study → ___ 6. see → ___ 7. arrive → ___ 8. think → ___\n\nB. Fix these French-speaker errors:\n1. "I have went to the store." → ___\n2. "She is arrived yesterday." → ___\n3. "We didn\'t went to school." → ___\n4. "Did you saw the movie?" → ___\n\nC. Write 5 sentences about what you did last weekend using past simple. Use at least 2 irregular verbs.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Past Story',
              prompt: 'Write 8-10 sentences about a trip, event, or special day in your past. Use past simple tense throughout. Include: at least 3 irregular verbs, at least 2 time expressions (yesterday, last year, ago, etc.), and at least 1 negative sentence (I didn\'t...). Check: Did you use ONE word for each past verb (not "have + verb")?'
            },
            {
              type: 'discussion',
              questions: [
                'Read your story out loud. Listen for any places where you accidentally use "have" + verb instead of just the past simple form.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Talking About the Past',
        estimatedMinutes: 45,
        objectives: [
          'Use past simple for regular (-ed) and common irregular verbs.',
          'Understand that English past simple is ONE word, NOT two like French passé composé.',
          'Form negative sentences and questions in the past simple.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, "I went" = "Je suis allé" (two words). In English, "I went" = one word! French speakers often say "I have went" — but that is wrong. Today you learn the correct way.',
              connection: 'The Bible tells us what God DID in the past: He created, He saved, He loved. When you learn the past tense, you can tell YOUR story and God\'s story in English!'
            },
            {
              type: 'reading',
              title: 'Samuel\'s Trip',
              source: 'Original A1-A2 reading passage',
              text: 'Last summer, Samuel traveled to Miami. He arrived on Monday. He visited a mall and bought a backpack. The next day, he went to the beach. He played in the water and ate ice cream. "I loved that trip!" Samuel says.'
            },
            {
              type: 'text',
              heading: 'Past Simple',
              body: '**Regular verbs:** add -ed → walked, played, visited, cooked\n**Irregular verbs (memorize!):** go → went, eat → ate, see → saw, buy → bought, have → had, come → came, make → made\n\n**IMPORTANT: French vs. English!**\nFrench: "J\'ai mangé" (two words). English: "I ate" (ONE word).\n- WRONG: "I have went." RIGHT: "I went."\n- WRONG: "I am arrived." RIGHT: "I arrived."\n\n**Negative:** didn\'t + base verb → "I didn\'t go" (NOT "I didn\'t went")\n**Questions:** Did + subject + base verb → "Did you eat?" (NOT "Did you ate?")\n\n**Time words:** yesterday, last week, ago, when I was young'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Acts in History',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 77:11-12',
              reflection: 'The Bible says to remember what God has done. God created the world. He saved His people. He sent Jesus. When we talk about the past, we can share God\'s story and our own.',
              applicationQuestion: 'What is one thing God did in your life that you are thankful for?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why do French speakers often say "I have went"? What is the correct English?',
                'What is the past simple of: go, eat, see, buy?'
              ]
            },
            {
              type: 'practice',
              activity: 'Fix the Errors',
              prompt: 'Fix these sentences:\n1. "I have went to school." → ___\n2. "She is arrived yesterday." → ___\n3. "We didn\'t went home." → ___\n4. "Did you saw him?" → ___\n\nWrite 4 sentences about what you did yesterday using past simple.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Past Day',
              prompt: 'Write 5-7 sentences about a day in your past. Use past simple. Include at least 2 irregular verbs and 1 negative sentence.'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences out loud. Check that every past verb is ONE word.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Talking About the Past',
        estimatedMinutes: 35,
        objectives: [
          'Use past simple for common verbs (went, ate, saw, played).',
          'Know that English past simple is ONE word (not "have + verb" like French).',
          'Talk about yesterday or last week using simple sentences.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In English, "I went" is ONE word. Not "I have went." Not "I am went." Just: "I went." Remember this and you will avoid a very common mistake!',
              connection: 'The Bible tells us what God DID: He created. He saved. He loved. We can use the past tense to tell about God and about our own lives.'
            },
            {
              type: 'reading',
              title: 'Samuel\'s Day',
              source: 'Original A1 reading passage',
              text: 'Last summer, Samuel went to Miami. He visited a mall. He bought a backpack. He went to the beach. He played in the water. He ate ice cream. It was great!'
            },
            {
              type: 'text',
              heading: 'Past Simple',
              body: '**Regular:** play → played, visit → visited, cook → cooked\n**Irregular (memorize!):** go → went, eat → ate, see → saw, buy → bought, have → had\n\n**IMPORTANT:** In English, past = ONE word.\n- RIGHT: "I went." WRONG: "I have went."\n- RIGHT: "I ate." WRONG: "I have ate."\n\n**Negative:** "I didn\'t go." (NOT "I didn\'t went.")\n**Question:** "Did you go?" (NOT "Did you went?")'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Acted in the Past',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 77:11',
              reflection: 'God created the world. God sent Jesus. We remember what God DID. Past tense helps us tell God\'s story!',
              applicationQuestion: 'What did you do yesterday?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the past of "go"?',
                'Is "I have went" correct? Why or why not?'
              ]
            },
            {
              type: 'practice',
              activity: 'Past Tense Practice',
              prompt: 'Write the past simple:\n1. go → ___ 2. eat → ___ 3. play → ___ 4. see → ___\n\nFix: "I have went to school." → ___\n\nWrite 3 sentences about yesterday.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Yesterday',
              prompt: 'Write 3-5 sentences about what you did yesterday. Use past simple. Example: "I went to school. I ate lunch. I played with my friends."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences. Is every past verb ONE word?'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'past simple', definition: 'A verb tense used for completed actions in the past (ONE word in English)', example: 'I went to school. She cooked dinner.' },
      { term: 'irregular verb', definition: 'A verb that does not follow the regular -ed pattern in the past tense', example: 'Go → went, eat → ate, see → saw are irregular verbs.' },
      { term: 'regular verb', definition: 'A verb that adds -ed to form the past tense', example: 'Play → played, visit → visited are regular verbs.' },
      { term: 'yesterday', definition: 'The day before today', example: 'Yesterday, I went to the library.' },
      { term: 'ago', definition: 'A word used to indicate time in the past (used after the time expression)', example: 'I moved here two years ago.' },
      { term: 'negative', definition: 'A sentence that uses "not" or "didn\'t" to express the opposite', example: 'I didn\'t go to school yesterday.' },
      { term: 'auxiliary verb', definition: 'A helping verb used to form tenses, questions, or negatives (did, have, be)', example: 'In "Did you go?", "did" is the auxiliary verb.' }
    ],
    quiz: [
      { question: 'What is the past simple of "go"?', options: ['goed', 'gone', 'went', 'have went'], correctAnswer: 2, explanation: '"Go" is an irregular verb. Its past simple form is "went" — one word, no auxiliary.' },
      { question: 'Which sentence is CORRECT?', options: ['I have went to school yesterday.', 'I went to school yesterday.', 'I am went to school yesterday.', 'I was went to school yesterday.'], correctAnswer: 1, explanation: 'English past simple uses ONE word: "I went." Adding "have," "am," or "was" before it is a French transfer error.' },
      { question: 'What is the past simple of "eat"?', options: ['eated', 'eaten', 'ate', 'have eaten'], correctAnswer: 2, explanation: '"Eat" is irregular. Past simple = "ate." "Eaten" is the past participle, used with "have" in present perfect.' },
      { question: 'Which negative sentence is correct?', options: ['I didn\'t went home.', 'I not went home.', 'I didn\'t go home.', 'I haven\'t went home.'], correctAnswer: 2, explanation: 'Negative past simple = didn\'t + base verb: "I didn\'t go" (NOT "didn\'t went").' },
      { question: 'Which question form is correct?', options: ['Did you saw the movie?', 'Did you see the movie?', 'Have you saw the movie?', 'You saw the movie?'], correctAnswer: 1, explanation: 'Past simple questions = Did + subject + base verb: "Did you see?" (NOT "Did you saw?").' },
      { question: '"I arrived yesterday." Why is this correct and not "I am arrived"?', options: ['Because English has no auxiliary verbs', 'Because English past simple uses one word, not two like French', 'Because "arrive" is not a real verb', 'Because yesterday is not a past word'], correctAnswer: 1, explanation: 'French uses être + past participle for some verbs ("Je suis arrivé"). English past simple is always one word: "I arrived."' },
      { question: 'What is the past simple of "study"?', options: ['studyed', 'studed', 'studied', 'studies'], correctAnswer: 2, explanation: 'Verbs ending in consonant + y change y to i and add -ed: study → studied.' },
      { question: 'Complete: "She ___ a new book last week."', options: ['buyed', 'bought', 'has bought', 'is bought'], correctAnswer: 1, explanation: '"Buy" is irregular. Past simple = "bought." One word, no auxiliary needed.' },
      { question: 'Which time expression goes with past simple?', options: ['Tomorrow', 'Right now', 'Last summer', 'Next week'], correctAnswer: 2, explanation: '"Last summer" refers to a completed past time, which requires past simple tense.' },
      { question: 'Fix this error: "We didn\'t ate breakfast."', options: ['We didn\'t eat breakfast.', 'We haven\'t ate breakfast.', 'We not ate breakfast.', 'We didn\'t eaten breakfast.'], correctAnswer: 0, explanation: 'After "didn\'t," use the base form: "didn\'t eat" (NOT "didn\'t ate").' }
    ]
  },

  // ── W2: Plans and the Future (INSTRUCTION) ───────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Plans and the Future',
        estimatedMinutes: 60,
        objectives: [
          'Use "going to + verb" for plans and intentions, and "will + verb" for predictions and spontaneous decisions.',
          'Understand the parallel between French "futur proche" (aller + infinitif) and English "going to."',
          'Avoid the common error "I go to + verb" instead of "I am going to + verb."',
          'Express future plans, goals, and predictions using correct grammar.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, "Je vais manger" means "I am going to eat." The structure is almost identical: aller + infinitive = going to + verb. This is great news for French speakers! But there is a trap: many French speakers say "I go to eat" instead of "I am going to eat." That little word "am" (or "is/are") makes all the difference.',
              connection: 'God knows our future even when we do not. Jeremiah 29:11 says, "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope." Learning to talk about the future in English helps us express our plans — and trust God with the ones we cannot see yet.'
            },
            {
              type: 'reading',
              title: 'Plans for the Summer',
              source: 'Original A2 reading passage',
              text: 'Esther is 14 years old. She lives in Montreal. School finishes in June, and she has big plans for the summer.\n\n"I am going to visit my grandmother in Port-au-Prince," she says. "She is going to teach me to cook traditional Haitian food. I am going to practice my Creole too!"\n\nEsther is also going to take an English course online. "I want to improve my English. I think it will help me in the future. I will probably study business at university."\n\nHer brother, Marc, has different plans. "I am going to work at my uncle\'s shop. I will save money for a new laptop."\n\n"We don\'t know what the future holds," their mother says, "but God does. We will trust Him and work hard."'
            },
            {
              type: 'text',
              heading: 'Two Ways to Talk About the Future',
              body: '**1. "Going to" — Plans and Intentions**\nUse "am/is/are + going to + verb" for things you have already planned or decided:\n- "I am going to visit my grandmother." (I have a plan.)\n- "She is going to study English." (She has decided.)\n- "They are going to travel to Haiti." (They have planned it.)\n\n**Structure:** Subject + am/is/are + going to + base verb\n\n**French Parallel:** "Je vais visiter" = "I am going to visit." The structure is almost the same! Aller + infinitif = am/is/are going to + verb.\n\n**COMMON ERROR:** "I go to visit my grandmother." → WRONG!\n"I am going to visit my grandmother." → CORRECT!\nDo NOT forget "am/is/are" — it is essential! "Go to" without "am/is/are going to" sounds like a present-tense action, not a future plan.\n\n**Negative:** "I am not going to work tomorrow." / "She isn\'t going to come."\n**Question:** "Are you going to study tonight?" / "Is he going to play?"\n\n**2. "Will" — Predictions and Spontaneous Decisions**\nUse "will + verb" for:\n- **Predictions:** "It will rain tomorrow." "I think she will pass the test."\n- **Spontaneous decisions:** "The phone is ringing — I will answer it." (You just decided now.)\n- **Promises:** "I will help you with your homework."\n- **Offers:** "I will carry that for you."\n\n**Structure:** Subject + will + base verb (will is the same for all subjects)\n\n**Negative:** "I will not (won\'t) be late."\n**Question:** "Will you come to the party?"\n\n**When to Use Which?**\n- "I am going to study tonight." (I already planned this.)\n- "Oh, the test is tomorrow? I will study tonight!" (I just decided right now.)\n- "I think it will be cold tomorrow." (Prediction, not a plan.)\n- "I am going to wear my warm coat." (Plan based on the prediction.)'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plans for Our Future',
              framework: 'Grand Narrative',
              scriptureRef: 'Jeremiah 29:11; Proverbs 16:9; James 4:13-15',
              reflection: 'Jeremiah 29:11 says, "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope." God holds our future. We make plans — "I am going to study," "I will work hard" — but Proverbs 16:9 reminds us: "The heart of man plans his way, but the Lord establishes his steps." James 4:15 teaches us to say, "If the Lord wills, we will live and do this or that." We plan with diligence and trust God with the results. Learning to talk about the future in English is not just grammar — it is an act of hope, because we serve a God who already knows what is ahead.',
              applicationQuestion: 'What is one plan you have for your future? How does Jeremiah 29:11 give you confidence about what you do not yet know?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "going to" and "will" in English? When do you use each one?',
                'Why do French speakers often say "I go to eat" instead of "I am going to eat"? What is the correct form?',
                'Jeremiah 29:11 says God has plans for us. How does this change the way we think about our future plans?'
              ]
            },
            {
              type: 'practice',
              activity: 'Future Tense Practice',
              prompt: 'A. Choose "going to" or "will":\n1. "I ___ visit my cousin next month." (I already planned it.)\n2. "Oh no, it\'s raining! I ___ take an umbrella." (I just decided.)\n3. "I think she ___ be a great doctor." (prediction)\n4. "They ___ move to a new house in July." (planned)\n5. "The phone is ringing." "I ___ get it!" (spontaneous)\n\nB. Fix these errors:\n1. "I go to study tonight." → ___\n2. "She going to travel." → ___\n3. "They will to come." → ___\n\nC. Write 5 sentences about your future plans using "going to" and 3 predictions using "will."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Future Plans',
              prompt: 'Write 8-10 sentences about your future. Include: 4 sentences with "going to" (your plans), 3 sentences with "will" (predictions or promises), and 1-2 sentences connecting your plans to Jeremiah 29:11. Example: "I am going to study English every day. I will become more confident. I believe God has good plans for my future."'
            },
            {
              type: 'discussion',
              questions: [
                'Share your future plans with a partner. Did you use "going to" for plans and "will" for predictions correctly?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Plans and the Future',
        estimatedMinutes: 45,
        objectives: [
          'Use "going to" for plans and "will" for predictions.',
          'Avoid the error "I go to + verb" (must be "I am going to + verb").',
          'Express plans and predictions about the future.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'French: "Je vais manger" = I am going to eat. The structure is similar! But don\'t say "I go to eat" — you must say "I AM going to eat." That little word "am" is important!',
              connection: 'God knows our future. Jeremiah 29:11 says He has plans for us — plans for hope. We can make plans and trust God with the results!'
            },
            {
              type: 'reading',
              title: 'Esther\'s Plans',
              source: 'Original A1-A2 reading passage',
              text: 'Esther is going to visit her grandmother this summer. She is going to learn to cook Haitian food. She is also going to take an English course. "I think English will help me in the future," she says. Her brother will work at his uncle\'s shop. He will save money for a laptop.'
            },
            {
              type: 'text',
              heading: 'Future Tense: Going To and Will',
              body: '**"Going to" = Plans (things you decided already)**\n- I am going to visit my grandmother.\n- She is going to study English.\n- They are going to travel.\n\n**COMMON ERROR:** "I go to visit." → WRONG! "I AM going to visit." → CORRECT!\n\n**"Will" = Predictions and quick decisions**\n- "It will rain tomorrow." (prediction)\n- "I will help you!" (I just decided)\n\n**Negative:** "I am not going to go." / "I won\'t be late."\n**Question:** "Are you going to study?" / "Will you come?"'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plans',
              framework: 'Grand Narrative',
              scriptureRef: 'Jeremiah 29:11',
              reflection: 'God says, "I know the plans I have for you — plans for hope and a future." We make plans, but God guides our steps. Trust Him with your future!',
              applicationQuestion: 'What is one plan you have? How does God\'s promise give you hope?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "going to" and "will"?',
                'Why is "I go to eat" wrong? What is the correct form?'
              ]
            },
            {
              type: 'practice',
              activity: 'Future Practice',
              prompt: 'Choose "going to" or "will":\n1. "I ___ study tonight." (planned)\n2. "I think it ___ rain." (prediction)\n3. "I ___ help you!" (just decided)\n\nFix: "I go to visit my friend." → ___\n\nWrite 4 sentences about your plans.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Plans',
              prompt: 'Write 5-7 sentences about your future. Use "going to" for 3 plans and "will" for 2 predictions. Example: "I am going to learn English. I think I will travel to America one day."'
            },
            {
              type: 'discussion',
              questions: [
                'Share your plans with a partner. Check each other\'s grammar!'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Plans and the Future',
        estimatedMinutes: 35,
        objectives: [
          'Use "going to" to talk about plans.',
          'Use "will" for simple predictions.',
          'Say "I am going to" NOT "I go to."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French: "Je vais manger" = I am going to eat. Almost the same! But say "I AM going to eat" — NOT "I go to eat."',
              connection: 'God has plans for your future! Jeremiah 29:11 says God\'s plans are good. You can trust Him!'
            },
            {
              type: 'reading',
              title: 'Esther\'s Plans',
              source: 'Original A1 passage',
              text: 'Esther is going to visit her grandmother. She is going to cook Haitian food. She is going to take an English course. "I think English will help me," she says.'
            },
            {
              type: 'text',
              heading: 'Talking About the Future',
              body: '**"Going to" = plans**\n- I am going to visit my grandmother.\n- She is going to study.\n\n**WRONG:** "I go to visit." **RIGHT:** "I AM going to visit."\n\n**"Will" = predictions**\n- It will rain tomorrow.\n- I will help you!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Plans',
              framework: 'Grand Narrative',
              scriptureRef: 'Jeremiah 29:11',
              reflection: 'God knows your future. He has good plans for you. Trust Him!',
              applicationQuestion: 'What are you going to do this weekend?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you say "Je vais manger" in English?',
                'Is "I go to eat" correct? Why not?'
              ]
            },
            {
              type: 'practice',
              activity: 'My Plans',
              prompt: 'Write 3 sentences about your plans using "going to":\nExample: "I am going to study English tonight."\n\n1. ___\n2. ___\n3. ___'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Future',
              prompt: 'Write 3-5 sentences: 2 plans with "going to" and 1 prediction with "will." Example: "I am going to visit my friend. It will be fun."'
            },
            {
              type: 'discussion',
              questions: [
                'Say your plans out loud. Remember: "I AM going to..."'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'plan', definition: 'A decision about what you will do in the future', example: 'My plan is to study English every day.' },
      { term: 'going to', definition: 'Used to talk about future plans and intentions (am/is/are + going to + verb)', example: 'I am going to visit my grandmother next week.' },
      { term: 'will', definition: 'Used for predictions, promises, and spontaneous decisions', example: 'I think it will rain tomorrow.' },
      { term: 'prediction', definition: 'A statement about what you think will happen in the future', example: 'My prediction is that English will be important for my career.' },
      { term: 'promise', definition: 'A statement that you will definitely do something', example: 'I promise I will study hard.' },
      { term: 'future', definition: 'The time that has not happened yet; what comes after now', example: 'In the future, I want to be a teacher.' },
      { term: 'goal', definition: 'Something you want to achieve', example: 'My goal is to speak English fluently by next year.' }
    ],
    quiz: [
      { question: 'Which sentence is CORRECT?', options: ['I go to eat dinner tonight.', 'I am going to eat dinner tonight.', 'I going to eat dinner tonight.', 'I go eat dinner tonight.'], correctAnswer: 1, explanation: '"Going to" requires am/is/are: "I AM going to eat dinner tonight."' },
      { question: '"I think it ___ rain tomorrow." Which word completes the prediction?', options: ['going to', 'goes to', 'will', 'go'], correctAnswer: 2, explanation: '"Will" is used for predictions: "I think it will rain tomorrow."' },
      { question: 'What is "going to" used for?', options: ['Past actions', 'Plans and intentions', 'Present habits', 'Instructions'], correctAnswer: 1, explanation: '"Going to" expresses plans and intentions — things you have already decided to do.' },
      { question: 'Fix the error: "She going to travel."', options: ['She is going to travel.', 'She go to travel.', 'She will going to travel.', 'She goes to travel.'], correctAnswer: 0, explanation: 'You need am/is/are before "going to": "She IS going to travel."' },
      { question: '"The phone is ringing!" "I ___ answer it!" What word fits?', options: ['am going to', 'will', 'go to', 'went'], correctAnswer: 1, explanation: '"Will" is used for spontaneous decisions made in the moment: "I will answer it!"' },
      { question: 'Which is the French equivalent of "going to"?', options: ['Passé composé', 'Futur simple', 'Futur proche (aller + infinitif)', 'Imparfait'], correctAnswer: 2, explanation: 'French "futur proche" (aller + infinitif) is parallel to English "going to": "Je vais manger" = "I am going to eat."' },
      { question: '"I am not going to go." Is this correct?', options: ['Yes, it is correct.', 'No, you cannot say "going to go."', 'No, it should be "I don\'t going to go."', 'No, it should be "I am not go to."'], correctAnswer: 0, explanation: '"I am not going to go" is grammatically correct. "Going to go" is natural in English.' },
      { question: 'Which sentence shows a PLAN (not a prediction)?', options: ['I think she will be happy.', 'It will probably snow.', 'I am going to study medicine at university.', 'The movie will be good.'], correctAnswer: 2, explanation: '"I am going to study medicine" shows a plan — something already decided. The others are predictions.' },
      { question: 'What is the negative of "I will come"?', options: ['I will not come. / I won\'t come.', 'I not will come.', 'I don\'t will come.', 'I willn\'t come.'], correctAnswer: 0, explanation: 'Negative of "will" = "will not" or the contraction "won\'t": "I won\'t come."' },
      { question: 'Jeremiah 29:11 says God has ___ for us.', options: ['problems', 'plans', 'questions', 'tests'], correctAnswer: 1, explanation: 'Jeremiah 29:11: "For I know the PLANS I have for you, declares the Lord, plans for welfare and not for evil."' }
    ]
  },

  // ── W3: Telling Simple Stories (INSTRUCTION) ─────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Telling Simple Stories',
        estimatedMinutes: 60,
        objectives: [
          'Use sequence words (first, then, next, after that, finally) to organize a narrative.',
          'Tell short personal stories using past simple tense consistently.',
          'Structure stories with a clear beginning, middle, and end.',
          'Use time expressions and sequence markers to create coherent narratives.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Everyone loves a good story. But what makes a story good? It is not just what happened — it is HOW you tell it. Sequence words are the glue that holds a story together. Without them, your story sounds like a list of random facts. With them, your story flows naturally and your listener can follow every step.',
              connection: 'God is the greatest storyteller. The Bible is one long, connected story — from Creation to Restoration. God uses sequence: first He created, then humanity fell, next He promised a Redeemer, after that He sent prophets, and finally He sent His Son. Every good story reflects God\'s design for order and purpose.'
            },
            {
              type: 'reading',
              title: 'My First Day at a New School',
              source: 'Original A2 narrative',
              text: 'First, I woke up very early because I was nervous. My mother made me breakfast, but I was too scared to eat. Then, she drove me to the new school. The building was huge!\n\nNext, I went to the office and a woman gave me my schedule. She was very kind. After that, I walked to my first class — English. I didn\'t understand everything the teacher said, but a girl named Chloe sat next to me and helped me.\n\nAt lunch, Chloe introduced me to her friends. They asked me questions about Haiti. They were curious and friendly. I felt a little better.\n\nFinally, the day ended. My mother picked me up and asked, "How was it?" I said, "Scary at first, but good at the end." She smiled and said, "God was with you today."\n\nThat was two years ago. Now Chloe is my best friend. I am so glad I didn\'t give up on that first day.'
            },
            {
              type: 'text',
              heading: 'Sequence Words: The Glue of Storytelling',
              body: '**Sequence words** tell your listener the order of events. They make your story clear and easy to follow.\n\n**Beginning:** First, / In the beginning, / To start, / One day, / It all started when...\n**Middle:** Then, / Next, / After that, / Later, / Meanwhile, / Soon, / The next day,\n**End:** Finally, / In the end, / At last, / Eventually,\n\n**How to Use Them:**\n"First, I woke up early. Then, I ate breakfast. Next, I walked to school. After that, I went to my first class. Finally, the day was over."\n\n**Notice:** Sequence words usually come at the BEGINNING of a sentence, followed by a comma.\n\n**Story Structure: Beginning, Middle, End**\n- **Beginning:** Set the scene. Who? Where? When? How did you feel?\n  "One day last year, I went to a new school. I was very nervous."\n- **Middle:** Tell what happened. Use sequence words to connect events.\n  "First, I went to the office. Then, I found my classroom. Next, a girl helped me."\n- **End:** Wrap up. What was the result? How did you feel? What did you learn?\n  "Finally, the day ended. I was tired but happy. I learned that people are kind."\n\n**Past Simple in Stories:**\nStories about the past use past simple throughout. Keep your tense CONSISTENT:\n- "I woke up, ate breakfast, and walked to school." (All past simple — correct!)\n- "I woke up, eat breakfast, and walk to school." (Mixed tenses — incorrect!)\n\n**French Comparison:** French uses similar sequence words: d\'abord, puis, ensuite, après, enfin. The English equivalents work the same way!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Story Has Order',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:1; Revelation 21:5; 1 Corinthians 14:40',
              reflection: 'The Bible\'s story has perfect order: "In the beginning, God created..." (Genesis 1:1). Then, humanity fell. Next, God called Abraham. After that, He sent Moses, David, and the prophets. Finally, He sent His Son, Jesus. And one day, God will make "all things new" (Revelation 21:5). God is a God of order (1 Corinthians 14:40). When we tell stories with clear structure — beginning, middle, and end — we reflect the God who designed stories to have meaning and purpose.',
              applicationQuestion: 'How does seeing the Bible as one connected story (with a beginning, middle, and end) help you understand God\'s plan?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are five sequence words you can use to tell a story in English? How do they help your listener?',
                'In the reading, what happened on the narrator\'s first day? Retell the story using sequence words.',
                'How does the Bible\'s Grand Narrative (Creation → Fall → Redemption → Restoration) use sequence like a story?'
              ]
            },
            {
              type: 'practice',
              activity: 'Story Ordering',
              prompt: 'A. Put these sentences in order and add sequence words (first, then, next, after that, finally):\n- I ate dinner with my family.\n- I woke up at 7:00.\n- I went to school.\n- I did my homework.\n- I went to bed.\n\nB. Write a 6-8 sentence story about a memorable day. Use at least 4 sequence words, past simple tense throughout, and a clear beginning, middle, and end.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Story',
              prompt: 'Write a short personal story (10-12 sentences) about a real experience — your first day somewhere new, a trip, a celebration, or a challenge you overcame. Include: (1) A beginning that sets the scene (who, where, when, how you felt). (2) A middle with 3-4 events connected by sequence words. (3) An ending with a result, feeling, or lesson. Use past simple throughout. Include at least 5 different sequence words.'
            },
            {
              type: 'discussion',
              questions: [
                'Read your story to a partner. Ask: Can they follow the order of events? Did you use past simple consistently?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Telling Simple Stories',
        estimatedMinutes: 45,
        objectives: [
          'Use sequence words (first, then, next, after that, finally) to tell stories.',
          'Tell a short personal story with beginning, middle, and end.',
          'Use past simple tense consistently in a narrative.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What makes a story easy to follow? Sequence words! "First... then... next... finally..." These words tell your listener the order of events. Without them, a story is just a jumble of facts.',
              connection: 'The Bible is one big story — creation, fall, redemption, restoration. God\'s story has perfect order. When we tell our stories with structure, we reflect God\'s design.'
            },
            {
              type: 'reading',
              title: 'My First Day',
              source: 'Original A2 narrative',
              text: 'First, I woke up early because I was nervous. Then, my mother drove me to the new school. Next, I went to the office and got my schedule. After that, I walked to my first class. A girl named Chloe helped me. Finally, the day ended. I was tired but happy.'
            },
            {
              type: 'text',
              heading: 'Sequence Words for Stories',
              body: '**Beginning:** First, / One day, / It started when...\n**Middle:** Then, / Next, / After that, / Later,\n**End:** Finally, / In the end,\n\n**Example:**\n"First, I woke up. Then, I ate breakfast. Next, I walked to school. After that, I had my first class. Finally, I went home."\n\n**Remember:** Use past simple for all verbs in a story about the past. Keep the tense the same throughout!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Story Has Order',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:1; 1 Corinthians 14:40',
              reflection: 'The Bible starts with "In the beginning..." and ends with God making everything new. God\'s story has perfect order. Our stories should too!',
              applicationQuestion: 'Can you retell a Bible story using sequence words?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Name 4 sequence words. When do you use them in a story?',
                'Retell the reading using your own words and sequence words.'
              ]
            },
            {
              type: 'practice',
              activity: 'Order and Write',
              prompt: 'Put in order and add sequence words:\n- I did my homework. / I went to bed. / I ate dinner. / I woke up. / I went to school.\n\nThen write a 5-6 sentence story about your last weekend using sequence words.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Story',
              prompt: 'Write a story (6-8 sentences) about a memorable day. Use: a beginning (who, where, when), a middle (what happened), and an end (how it ended). Include at least 3 sequence words and past simple tense.'
            },
            {
              type: 'discussion',
              questions: [
                'Read your story to a partner. Can they follow the order?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Telling Simple Stories',
        estimatedMinutes: 35,
        objectives: [
          'Use sequence words: first, then, next, finally.',
          'Tell a simple story with a beginning, middle, and end.',
          'Use past simple in a short narrative.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you tell a story, use these words: FIRST... THEN... NEXT... FINALLY... They help people follow your story!',
              connection: 'God\'s story has order: creation, fall, rescue, new creation. Our stories can have order too!'
            },
            {
              type: 'reading',
              title: 'A New Day',
              source: 'Original A1 narrative',
              text: 'First, I woke up. Then, I ate breakfast. Next, I went to school. After that, I played with my friends. Finally, I went home. It was a good day!'
            },
            {
              type: 'text',
              heading: 'Story Words',
              body: '**First** → the beginning\n**Then** → what happened next\n**Next** → another thing that happened\n**After that** → later\n**Finally** → the end\n\nExample: "First, I woke up. Then, I ate. Next, I went to school. Finally, I came home."'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Story',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:1',
              reflection: 'The Bible starts with "In the beginning, God created." Every story needs a beginning! God is the best storyteller.',
              applicationQuestion: 'Can you tell what you did today using "first, then, finally"?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are 3 sequence words?',
                'Tell me about your morning using "first, then, finally."'
              ]
            },
            {
              type: 'practice',
              activity: 'My Day',
              prompt: 'Fill in the sequence words:\n___, I woke up. ___, I ate breakfast. ___, I went to school. ___, I came home.\n\nWrite 3 sentences about yesterday using "first, then, finally."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Short Story',
              prompt: 'Write 3-5 sentences about something that happened to you. Use "first," "then," and "finally." Use past simple verbs.'
            },
            {
              type: 'discussion',
              questions: [
                'Tell your story out loud. Use the sequence words!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'sequence', definition: 'The order in which things happen', example: 'Tell the story in sequence — from beginning to end.' },
      { term: 'first', definition: 'At the beginning; the thing that happens before everything else', example: 'First, I woke up early.' },
      { term: 'then', definition: 'After that; next in order', example: 'Then, I ate breakfast.' },
      { term: 'next', definition: 'The thing that happens after; following in order', example: 'Next, I walked to school.' },
      { term: 'finally', definition: 'At the end; the last thing that happens', example: 'Finally, I went to bed.' },
      { term: 'meanwhile', definition: 'At the same time as something else', example: 'I was studying. Meanwhile, my sister was cooking.' },
      { term: 'narrative', definition: 'A story or account of connected events', example: 'Write a short narrative about your weekend.' }
    ],
    quiz: [
      { question: 'Which word starts a story?', options: ['Finally', 'Then', 'First', 'After that'], correctAnswer: 2, explanation: '"First" is used at the beginning of a story to introduce the first event.' },
      { question: 'Which word signals the END of a story?', options: ['Next', 'Then', 'After that', 'Finally'], correctAnswer: 3, explanation: '"Finally" signals the last event in a sequence — the end of the story.' },
      { question: 'Put in order: "Then I ate lunch. Finally I went home. First I woke up."', options: ['Then, Finally, First', 'First, Then, Finally', 'Finally, First, Then', 'First, Finally, Then'], correctAnswer: 1, explanation: 'The correct order is: First I woke up. Then I ate lunch. Finally I went home.' },
      { question: 'Where do sequence words usually go in a sentence?', options: ['At the end', 'In the middle', 'At the beginning, followed by a comma', 'They can go anywhere'], correctAnswer: 2, explanation: 'Sequence words usually come at the beginning of a sentence, followed by a comma: "First, I woke up."' },
      { question: 'Which tense do you use to tell a story about the past?', options: ['Present simple', 'Future tense', 'Past simple', 'Present continuous'], correctAnswer: 2, explanation: 'Stories about past events use past simple tense: "I went," "I saw," "I ate."' },
      { question: '"First, I woke up. ___, I ate breakfast." What word fits?', options: ['Finally', 'First', 'Then', 'In the end'], correctAnswer: 2, explanation: '"Then" connects the first event to the next event in sequence.' },
      { question: 'A good story has:', options: ['Only a beginning', 'Only an end', 'A beginning, middle, and end', 'Only a middle'], correctAnswer: 2, explanation: 'Every good story has three parts: a beginning (setting the scene), a middle (events), and an end (result/lesson).' },
      { question: 'What does "meanwhile" mean?', options: ['At the end', 'Before everything', 'At the same time', 'Much later'], correctAnswer: 2, explanation: '"Meanwhile" means something else was happening at the same time.' },
      { question: 'Which sentence uses past simple correctly?', options: ['First, I wake up early.', 'First, I woke up early.', 'First, I am waking up early.', 'First, I have woke up early.'], correctAnswer: 1, explanation: 'In a past story, use past simple: "I woke up" (not present "wake" or present continuous "am waking").' },
      { question: 'What makes a story easy to follow?', options: ['Long sentences', 'Difficult vocabulary', 'Sequence words in order', 'No ending'], correctAnswer: 2, explanation: 'Sequence words (first, then, next, finally) help the listener follow the order of events in a story.' }
    ]
  },

  // ── W4: My Past, Present, and Future (PROJECT) ───────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'My Past, Present, and Future',
        estimatedMinutes: 60,
        objectives: [
          'Create a timeline presentation covering past experiences, current life, and future plans.',
          'Demonstrate correct use of past simple, present simple, and going to/will.',
          'Use sequence words to connect events and create a coherent narrative.',
          'Reflect on God\'s faithfulness in the past and His plans for the future.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Your life is a story that stretches across time — from what you have already experienced, to what you are living right now, to what you hope for in the future. Today, you will bring all three tenses together to tell YOUR complete story.',
              connection: 'Jeremiah 29:11 says God has plans for your future. But He was also faithful in your past, and He is present with you right now. Your timeline reflects God\'s work across your whole life.'
            },
            {
              type: 'text',
              heading: 'Project: My Past, Present, and Future Timeline',
              body: 'Create a timeline presentation that tells your story in three parts. This project brings together all the grammar from Unit 8.\n\n**Part 1: My Past (Past Simple)**\nWrite 6-8 sentences about important events in your past. Use past simple and sequence words.\nExample: "First, I was born in Port-au-Prince. Then, I started school at age 5. Next, my family moved to Montreal when I was 10."\n\n**Part 2: My Present (Present Simple/Continuous)**\nWrite 5-7 sentences about your current life. Use present simple for habits and present continuous for things happening now.\nExample: "I live in Montreal. I study English every day. I am learning to cook Haitian food this year."\n\n**Part 3: My Future (Going to / Will)**\nWrite 5-7 sentences about your future plans and predictions. Use "going to" for plans and "will" for predictions.\nExample: "I am going to finish high school next year. I think I will study business at university. I will work hard and trust God."\n\n**Total:** 16-22 sentences across all three parts.\n\n**Rubric:**\n- Tense Accuracy (40%): Past simple for Part 1, present for Part 2, future for Part 3. No tense mixing within sections.\n- Content & Detail (25%): Specific, personal details in each section. At least 3 events per section.\n- Sequence & Flow (20%): Uses sequence words in Part 1. Transitions between sections are clear.\n- Biblical Reflection (15%): Includes a concluding reflection connecting your timeline to Jeremiah 29:11 or another verse about God\'s faithfulness.'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Planning My Timeline',
              prompt: 'Plan each section before writing:\n\nPAST (3-4 key events): ___\nPRESENT (3-4 current facts): ___\nFUTURE (3-4 plans/goals): ___\nBIBLICAL REFLECTION: ___\n\nDraft your full timeline presentation (16-22 sentences).'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My Past, Present, and Future — Final Presentation',
              instructions: 'Write your final timeline presentation. Check: (1) Past section uses past simple only. (2) Present section uses present simple/continuous. (3) Future section uses "going to" and "will." (4) You used sequence words in the past section. (5) You included a biblical reflection. Read the whole presentation out loud to practice fluency.'
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'My Past, Present, and Future',
        estimatedMinutes: 45,
        objectives: [
          'Create a timeline with past, present, and future sections using correct tenses.',
          'Use past simple, present simple, and going to/will appropriately.',
          'Reflect on God\'s faithfulness across time.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Your life has a past, a present, and a future. Today you will write about all three — using the correct English tenses for each!',
              connection: 'God was with you in the past. He is with you now. He will be with you in the future. Your timeline shows His faithfulness.'
            },
            {
              type: 'text',
              heading: 'My Timeline Project',
              body: 'Write a timeline in three parts:\n\n**Part 1: My Past (Past Simple)** — 4-5 sentences about important events.\n**Part 2: My Present (Present Simple)** — 3-4 sentences about your current life.\n**Part 3: My Future (Going to/Will)** — 3-4 sentences about plans and dreams.\n**Conclusion:** 1-2 sentences about God\'s faithfulness (Jeremiah 29:11).\n\nTotal: 12-15 sentences.\n\n**Rubric:**\n- Tense accuracy: correct tenses in each section (40%)\n- Content: personal and specific details (30%)\n- Flow: sequence words in past section (20%)\n- Reflection: connects to Jeremiah 29:11 (10%)'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Plan My Timeline',
              prompt: 'Write notes for each section:\nPAST (2-3 events): ___\nPRESENT (2-3 facts): ___\nFUTURE (2-3 plans): ___\n\nThen write your 12-15 sentence timeline.'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My Timeline — Final Draft',
              instructions: 'Write your final timeline. Check each section uses the correct tense. Include a reflection on Jeremiah 29:11. Read it out loud!'
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'My Past, Present, and Future',
        estimatedMinutes: 35,
        objectives: [
          'Write about your past, present, and future using correct tenses.',
          'Use past simple, present simple, and "going to."',
          'Connect your story to God\'s plan.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have a past, a present, and a future. Let\'s write about all three!',
              connection: 'God was with you before. He is with you now. He will be with you tomorrow. Trust Him!'
            },
            {
              type: 'text',
              heading: 'My Timeline',
              body: 'Write three parts:\n**Past:** 3 sentences using past simple (I was born..., I went..., I lived...)\n**Present:** 2-3 sentences using present (I live..., I study..., I like...)\n**Future:** 2-3 sentences using "going to" (I am going to..., I am going to...)\n\nTotal: 8-10 sentences.\n\n**Rubric:**\n- Tense: correct tense in each part (40%)\n- Content: personal details (30%)\n- Clarity: easy to understand (20%)\n- God: mention God\'s help (10%)'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'My Notes',
              prompt: 'Past: 2 events → ___\nPresent: 2 facts → ___\nFuture: 2 plans → ___\n\nWrite your 8-10 sentence timeline.'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My Timeline',
              instructions: 'Write your timeline: past, present, and future. Check your tenses. Thank God for His plan. Read it out loud!'
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'timeline', definition: 'A visual or written representation of events in order from past to present to future', example: 'My timeline shows when I was born, where I live now, and my plans.' },
      { term: 'presentation', definition: 'A talk or piece of writing that shares information with an audience', example: 'I prepared a presentation about my life for English class.' },
      { term: 'experience', definition: 'Something that happened to you; an event you lived through', example: 'Moving to a new country was an important experience in my life.' },
      { term: 'faithfulness', definition: 'The quality of being loyal, reliable, and keeping promises', example: 'God\'s faithfulness means He always keeps His promises.' }
    ],
    quiz: []
  }
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 9: REVIEW AND ASSESSMENT (W33–W36)
// ═══════════════════════════════════════════════════════════════════════════════

const unit9Lessons: EnrichedLesson[] = [
  // ── W1: Grammar and Vocabulary Review (INSTRUCTION) ──────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Grammar and Vocabulary Review',
        estimatedMinutes: 60,
        objectives: [
          'Review and consolidate all A1-A2 grammar: present simple, present continuous, past simple, future (going to/will), articles, prepositions, there is/are, can/can\'t, should.',
          'Identify and correct common French-speaker errors across all grammar areas.',
          'Consolidate vocabulary from all 9 units of the course.',
          'Apply grammar and vocabulary knowledge to produce accurate, meaningful sentences.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have traveled a long way since Unit 1! You started with basic greetings and now you can talk about the past, describe your daily life, make future plans, give instructions, read texts, and tell stories. This week, we bring everything together for a comprehensive review.',
              connection: 'Lamentations 3:40 says, "Let us examine our ways and test them, and let us return to the Lord." Reviewing what we have learned is not just good study practice — it is a biblical principle. Self-examination and reflection honor God because they show we take our growth seriously.'
            },
            {
              type: 'text',
              heading: 'Complete Grammar Review: A1-A2 Level',
              body: '**1. Present Simple** — habits, routines, facts\n- "I study English every day." "She lives in Montreal." "Water boils at 100°C."\n- Negative: "I don\'t like spiders." "He doesn\'t eat meat."\n- Question: "Do you speak French?" "Does she work?"\n- French-speaker error: forgetting the "s" on third person → "She speak" → WRONG → "She speaks"\n\n**2. Present Continuous** — actions happening NOW\n- "I am studying right now." "They are playing outside."\n- French-speaker error: using present simple for right-now actions → "I study now" → should be "I am studying now"\n\n**3. Past Simple** — completed past actions\n- Regular: played, visited, cooked. Irregular: went, ate, saw, bought.\n- CRITICAL: ONE word, not two! "I went" NOT "I have went."\n- Negative: "I didn\'t go." Question: "Did you see?"\n\n**4. Future** — plans and predictions\n- "Going to" for plans: "I am going to study." NOT "I go to study."\n- "Will" for predictions: "It will rain." "I will help you."\n\n**5. Articles** — a, an, the\n- "a book" (any book), "the book" (a specific book), "an apple" (before vowel sounds)\n- No article for general plurals: "I like dogs." NOT "I like the dogs" (in general)\n- French-speaker error: using articles like French → "the life is beautiful" → "Life is beautiful"\n\n**6. Prepositions** — at, in, on, to, from, with\n- Time: "at 3:00," "in the morning," "on Monday"\n- Place: "at school," "in the room," "on the table"\n- French-speaker error: "in Monday" (from "le lundi") → "on Monday"\n\n**7. There is / There are**\n- "There is a book on the table." "There are three students."\n- French-speaker error: "It has a book" (from "Il y a") → "There is a book"\n\n**8. Can / Can\'t** — ability and permission\n- "I can swim." "She can\'t drive." "Can I go?"\n\n**9. Should** — advice\n- "You should study more." "She should see a doctor."'
            },
            {
              type: 'text',
              heading: 'Vocabulary Review: Key Topics from Units 1-9',
              body: '**Unit 1: Greetings & Introductions** — hello, goodbye, name, nice to meet you, how are you\n**Unit 2: Family & Home** — mother, father, sister, brother, kitchen, bedroom, living room\n**Unit 3: Daily Life & Time** — morning, afternoon, evening, breakfast, lunch, dinner, clock, schedule\n**Unit 4: Food & Shopping** — fruit, vegetables, restaurant, menu, price, grocery store\n**Unit 5: Directions & Places** — left, right, straight, turn, next to, between, hospital, bank\n**Unit 6: Health & Body** — head, arm, leg, sick, healthy, doctor, medicine, exercise\n**Unit 7: School & Learning** — subject, notebook, library (NOT librairie), college (NOT collège), teacher (NOT professor)\n**Unit 8: Past & Future** — yesterday, ago, last week, going to, will, plan, goal\n**Unit 9: Review** — grammar terms, false cognates, sequence words\n\n**False Cognate Master List:**\n- collège → middle school (NOT college)\n- librairie → bookstore (NOT library)\n- professeur → any teacher in French (professor = university teacher in English)\n- actuellement → currently (NOT actually)\n- assister → to attend (NOT to assist)\n- bras → arm (NOT bra)\n- coin → corner (NOT coin/money)\n- journée → day (NOT journey)\n- monnaie → change/currency (NOT money in general)\n- rester → to stay (NOT to rest)\n- sympathique → nice/friendly (NOT sympathetic)\n- travail → work (NOT travel)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Self-Examination Honors God',
              framework: 'Grand Narrative',
              scriptureRef: 'Lamentations 3:40; 2 Corinthians 13:5',
              reflection: 'Lamentations 3:40 says, "Let us examine our ways and test them, and let us return to the Lord." Reviewing and self-assessment are biblical principles. God does not want us to coast — He wants us to grow. When you review grammar, correct errors, and strengthen your vocabulary, you are doing what the Bible asks: examining yourself, testing your knowledge, and committing to growth. 2 Corinthians 13:5 says, "Examine yourselves, to see whether you are in the faith." Self-examination — in our spiritual lives and in our learning — is how we honor God with our minds.',
              applicationQuestion: 'Why is reviewing what you have learned important — both in English and in your faith? How does Lamentations 3:40 apply to both?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the most common grammar mistake French speakers make in English? How do you avoid it?',
                'Name three false cognates and their correct English meanings.',
                'How does Lamentations 3:40 encourage you to take review and self-assessment seriously?'
              ]
            },
            {
              type: 'practice',
              activity: 'Comprehensive Grammar Check',
              prompt: 'Fix ALL the errors in these sentences:\n\n1. "She speak English very good." → ___\n2. "I have went to the store yesterday." → ___\n3. "I go to study tonight." → ___\n4. "It has a book on the table." → ___\n5. "I like the dogs." (in general) → ___\n6. "I study now." (right now) → ___\n7. "I live in Monday." → ___\n8. "Can I borrow a rubber?" (false cognate alert!) → ___\n9. "I didn\'t went home." → ___\n10. "She is professor at school." → ___\n\nFor each correction, explain WHICH grammar rule applies.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Self-Assessment Writing',
              prompt: 'Write a paragraph (10-12 sentences) using as many different grammar structures as possible. Include: 2 present simple sentences, 1 present continuous, 2 past simple, 2 future (one "going to," one "will"), 1 sentence with "there is/are," 1 with "can," and 1 with "should." Topic: "My English Learning Journey." End with a sentence of thanks to God for the ability to learn.'
            },
            {
              type: 'discussion',
              questions: [
                'What grammar area is HARDEST for you? Make a personal study plan to strengthen it before the final assessment.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Grammar and Vocabulary Review',
        estimatedMinutes: 45,
        objectives: [
          'Review A1-A2 grammar: present simple, past simple, future, articles, prepositions.',
          'Correct common French-speaker errors.',
          'Review key vocabulary and false cognates from the course.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have learned so much since Unit 1! Today we review ALL the grammar and vocabulary from the whole course. This helps you get ready for the final assessment.',
              connection: 'The Bible says to examine ourselves and our ways. Reviewing is a way to honor God — we take our learning seriously and grow!'
            },
            {
              type: 'text',
              heading: 'Grammar Review',
              body: '**Present Simple:** "I study." "She speaks." "Do you like...?"\n**Past Simple:** "I went." "She cooked." "Did you see...?" ONE word!\n**Future:** "I am going to visit." "It will rain." NOT "I go to visit."\n**Articles:** "a book," "the teacher," no article for general things: "I like music."\n**Prepositions:** "at school," "on Monday," "in the morning"\n**There is/are:** "There is a pen." NOT "It has a pen."\n**Can/Should:** "I can swim." "You should study."'
            },
            {
              type: 'text',
              heading: 'False Cognate Review',
              body: '**collège** → middle school (NOT college)\n**librairie** → bookstore (NOT library)\n**actuellement** → currently (NOT actually)\n**assister** → to attend (NOT to assist)\n**rester** → to stay (NOT to rest)\n**sympathique** → nice/friendly (NOT sympathetic)\n**travail** → work (NOT travel)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Review Honors God',
              framework: 'Grand Narrative',
              scriptureRef: 'Lamentations 3:40',
              reflection: '"Let us examine our ways and test them" (Lamentations 3:40). Reviewing what you learned is a way to grow. God wants us to keep learning and getting better!',
              applicationQuestion: 'What grammar topic do you need to review the most?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the biggest grammar mistake you have made? How do you fix it?',
                'Name 3 false cognates.'
              ]
            },
            {
              type: 'practice',
              activity: 'Fix the Errors',
              prompt: 'Fix these sentences:\n1. "She speak English." → ___\n2. "I have went home." → ___\n3. "I go to study." → ___\n4. "It has a cat in the room." → ___\n5. "I live in Monday." → ___\n\nWrite 5 sentences about yourself using 5 different grammar structures.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My English Journey',
              prompt: 'Write 6-8 sentences about your English learning journey. Use: present simple, past simple, and future tense. Mention one thing you found easy and one thing that was hard.'
            },
            {
              type: 'discussion',
              questions: [
                'What is your strongest grammar area? What do you need to practice more?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Grammar and Vocabulary Review',
        estimatedMinutes: 35,
        objectives: [
          'Review basic grammar: present, past, future, articles.',
          'Remember key false cognates.',
          'Practice writing correct English sentences.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have learned a lot! Let\'s review everything so you are ready for the final test.',
              connection: 'The Bible says to examine ourselves. Reviewing helps us grow! God is proud of how far you have come.'
            },
            {
              type: 'text',
              heading: 'Grammar Review',
              body: '**Present:** "I study." "She speaks."\n**Past:** "I went." "I played." (ONE word!)\n**Future:** "I am going to visit." "It will rain."\n**Articles:** "a pen," "the school"\n**Important:** "There is a cat." NOT "It has a cat."'
            },
            {
              type: 'text',
              heading: 'False Cognates',
              body: '**collège** = middle school (NOT college)\n**librairie** = bookstore (NOT library)\n**rester** = to stay (NOT to rest)\n**actuellement** = currently (NOT actually)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Keep Growing',
              framework: 'Grand Narrative',
              scriptureRef: 'Lamentations 3:40',
              reflection: 'Reviewing helps us grow. God wants us to learn and become better every day!',
              applicationQuestion: 'What English word or rule do you want to remember forever?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is one grammar rule you remember well?',
                'What is one false cognate you will never forget?'
              ]
            },
            {
              type: 'practice',
              activity: 'Quick Review',
              prompt: 'Fix these:\n1. "I have went." → ___\n2. "I go to study." → ___\n3. "It has a book." → ___\n\nWrite 3 correct sentences: one past, one present, one future.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Sentences',
              prompt: 'Write 4-5 correct English sentences about yourself. Use past, present, and future tenses. Check for errors!'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences out loud. Are they correct? Great job reviewing!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'review', definition: 'To study or look at something again to remember it better', example: 'Let\'s review the grammar before the test.' },
      { term: 'consolidate', definition: 'To bring things together and make them stronger', example: 'This lesson consolidates all the grammar from the course.' },
      { term: 'false cognate', definition: 'A word that looks the same in two languages but has a different meaning', example: '"Librairie" and "library" are false cognates — they look similar but mean different things.' },
      { term: 'grammar', definition: 'The rules for how words are organized in a language', example: 'English grammar says we add -ed for regular past tense.' },
      { term: 'tense', definition: 'The form of a verb that shows when an action happens (past, present, future)', example: '"I went" is past tense. "I go" is present tense. "I will go" is future tense.' },
      { term: 'error', definition: 'A mistake', example: 'A common French-speaker error is saying "I have went" instead of "I went."' }
    ],
    quiz: [
      { question: 'Which sentence uses present simple correctly?', options: ['She speak English.', 'She speaks English.', 'She is speak English.', 'She speaking English.'], correctAnswer: 1, explanation: 'Present simple third person adds -s: "She speaks English."' },
      { question: 'Which is correct for a past action?', options: ['I have went to school.', 'I went to school.', 'I am went to school.', 'I was went to school.'], correctAnswer: 1, explanation: 'English past simple = one word: "I went." No auxiliary needed for past simple.' },
      { question: '"I ___ study tonight." (I already planned it)', options: ['will', 'am going to', 'go to', 'am go to'], correctAnswer: 1, explanation: '"Am going to" is for planned future actions: "I am going to study tonight."' },
      { question: '"It has a cat in the room." What is the correct English?', options: ['It is a cat in the room.', 'There is a cat in the room.', 'A cat has in the room.', 'Cat is in the room.'], correctAnswer: 1, explanation: 'French "Il y a" = English "There is/are," not "It has."' },
      { question: 'Which is a FALSE cognate?', options: ['science / science', 'art / art', 'actuellement / actually', 'music / musique'], correctAnswer: 2, explanation: '"Actuellement" (French) means "currently," NOT "actually." They look the same but mean different things.' },
      { question: '"I like ___." (dogs in general)', options: ['the dogs', 'a dogs', 'dogs', 'dog'], correctAnswer: 2, explanation: 'For general statements about categories, no article: "I like dogs" (not "the dogs").' },
      { question: 'Which preposition is correct? "I have class ___ Monday."', options: ['in', 'at', 'on', 'to'], correctAnswer: 2, explanation: 'Days of the week use "on": "on Monday," "on Friday."' },
      { question: '"Librairie" in French means ___ in English.', options: ['Library', 'Bookstore', 'Book', 'Librarian'], correctAnswer: 1, explanation: '"Librairie" (French) = bookstore. "Library" (English) = bibliothèque.' },
      { question: 'Which is correct? "I ___ swimming." (ability)', options: ['am', 'can', 'do', 'have'], correctAnswer: 1, explanation: '"Can" expresses ability: "I can swim."' },
      { question: 'Lamentations 3:40 says we should:', options: ['Never study again', 'Examine our ways and test them', 'Forget the past', 'Only look forward'], correctAnswer: 1, explanation: 'Lamentations 3:40: "Let us examine our ways and test them, and let us return to the Lord." Review and self-assessment honor God.' }
    ]
  },

  // ── W2: Speaking and Listening Review (INSTRUCTION) ──────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Speaking and Listening Review',
        estimatedMinutes: 60,
        objectives: [
          'Review pronunciation challenges for French speakers: /th/, /h/, word stress, and linking sounds.',
          'Practice listening comprehension with A2-level dialogues and short texts.',
          'Understand and use the schwa sound (/ə/) in unstressed syllables.',
          'Demonstrate improved speaking confidence through oral practice activities.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Pronunciation is not about sounding "perfect" — it is about being understood. French speakers have specific pronunciation challenges in English that can cause real misunderstandings. "I sink" instead of "I think." "I ate" instead of "I hate." Mastering a few key sounds makes a huge difference in how well people understand you.',
              connection: 'Communication is a gift from God. He created language so we could connect with each other and with Him. When we work on pronunciation, we are honoring the gift of communication — making sure our words are clear, kind, and understood.'
            },
            {
              type: 'text',
              heading: 'French-Speaker Pronunciation Challenges',
              body: '**1. The /th/ Sounds (θ and ð)**\nFrench does not have /th/. French speakers typically replace it with /s/, /z/, /t/, or /d/.\n- "think" → sounds like "sink" or "tink"\n- "this" → sounds like "zis" or "dis"\n- "three" → sounds like "sree" or "tree"\n**How to produce /th/:** Place your tongue between your teeth. Push air over your tongue. For "think" (voiceless θ), no vibration. For "this" (voiced ð), vibrate your vocal cords.\n**Practice words:** think, three, thank, Thursday, the, this, that, they, with, both\n\n**2. The /h/ Sound**\nFrench does not pronounce the letter "h." French speakers often drop it in English.\n- "happy" → sounds like "appy"\n- "house" → sounds like "ouse"\n- "I hate it" → sounds like "I ate it" (completely different meaning!)\n**How to produce /h/:** Push a puff of air from your throat — like breathing on a mirror. English /h/ is always pronounced at the beginning of a word (except in "hour," "honest," "heir").\n**Practice words:** happy, hello, house, how, have, help, his, her, hungry, hope\n\n**3. Word Stress**\nEnglish is a STRESS-TIMED language. French is SYLLABLE-TIMED (each syllable gets equal time). This is why French speakers sound "flat" in English — they give equal weight to every syllable.\n- "BA-na-na" (stress on second syllable) NOT "ba-na-na"\n- "TEACH-er" (stress on first syllable) NOT "teach-ER"\n- "to-MOR-row" (stress on second syllable)\nStressing the wrong syllable can make a word unrecognizable.\n\n**4. Linking and Connected Speech**\nNative English speakers link words together:\n- "turn off" → sounds like "tur-NOFF"\n- "pick it up" → sounds like "pi-ki-TUP"\nFrench speakers tend to pronounce each word separately. Practicing linking makes your English sound more natural.\n\n**5. The Schwa /ə/ — The Most Common Sound in English**\nThe schwa is the "uh" sound in unstressed syllables:\n- "banana" → bə-NA-nə\n- "about" → ə-BOUT\n- "teacher" → TEACH-ər\nFrench does not use the schwa the same way. Learning to "swallow" unstressed syllables makes your English rhythm more natural.'
            },
            {
              type: 'text',
              heading: 'Listening Strategies',
              body: '**1. Listen for Key Words, Not Every Word**\nYou don\'t need to understand 100% of what someone says. Listen for the key words — nouns, verbs, and question words. These carry the main meaning.\n\n**2. Use Context**\nIf someone says, "Can you pass the... uh... thing for cutting?" you can guess they want scissors even if they forgot the word.\n\n**3. Listen for Intonation**\nEnglish uses intonation to signal meaning:\n- Rising intonation → question: "You\'re coming?" ↗\n- Falling intonation → statement: "I\'m coming." ↘\n- Emphasis → importance: "I said TURN, not LEARN."\n\n**4. Ask for Clarification**\n"Could you repeat that, please?" / "Could you speak more slowly?" / "What does ___ mean?"\nAsking for help is NOT a sign of weakness — it is a sign of a smart learner.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Clear Communication Honors God',
              framework: 'Grand Narrative',
              scriptureRef: '1 Corinthians 14:8-9; Proverbs 25:11',
              reflection: '1 Corinthians 14:8-9 says, "If the trumpet does not sound a clear call, who will get ready for battle? So it is with you. Unless you speak intelligible words, how will anyone know what you are saying?" Clear communication matters to God. When we practice pronunciation and listening, we make our speech clear and intelligible. Proverbs 25:11 says, "A word fitly spoken is like apples of gold in a setting of silver." Beautiful, clear communication is a gift — to God and to those who hear us.',
              applicationQuestion: 'How does 1 Corinthians 14:8-9 encourage you to work on clear pronunciation? How is clear speech a way to serve others?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which pronunciation challenge is hardest for you: /th/, /h/, stress, or linking? Why?',
                'Why might saying "I ate it" instead of "I hate it" (dropping the /h/) cause a misunderstanding?',
                'How does 1 Corinthians 14:8-9 apply to learning pronunciation?'
              ]
            },
            {
              type: 'practice',
              activity: 'Pronunciation Drills',
              prompt: 'A. Practice these /th/ pairs out loud (tongue between teeth!):\nthink — sink | three — tree | thin — sin | that — dat | then — den\n\nB. Practice these /h/ words (puff of air!):\nhappy — appy | house — ouse | hate — ate | have — ave | hope — ope\n\nC. Mark the STRESSED syllable in each word:\nba-na-na | teach-er | to-mor-row | com-pu-ter | un-der-stand | beau-ti-ful\n\nD. Write 3 sentences using words with /th/ and /h/ sounds. Practice saying them clearly.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Speaking Self-Assessment',
              prompt: 'Record yourself (or practice out loud) reading this paragraph:\n"Thank you for this Thursday\'s class. I think the three things I learned about speaking are very helpful. I am happy to practice. I hope to improve my pronunciation. This is the thing I have worked hardest on."\n\nThen rate yourself:\n1. Did I pronounce /th/ correctly? (1-5)\n2. Did I pronounce /h/ at the beginning of words? (1-5)\n3. Did I stress the right syllables? (1-5)\n4. What is my biggest area for improvement?'
            },
            {
              type: 'discussion',
              questions: [
                'What is one pronunciation goal you will set for yourself going forward?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Speaking and Listening Review',
        estimatedMinutes: 45,
        objectives: [
          'Review /th/ and /h/ pronunciation.',
          'Practice listening for key words and intonation.',
          'Build speaking confidence through practice activities.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You don\'t need perfect pronunciation — you need clear pronunciation. If people understand you, you are communicating well! Let\'s review the sounds that are hardest for French speakers.',
              connection: 'God cares about communication. The Bible says clear speech is important. When you speak clearly, you help others understand you — and that is a gift.'
            },
            {
              type: 'text',
              heading: 'Pronunciation Review',
              body: '**The /th/ sound:** Put your tongue between your teeth.\n- "think" (NOT "sink"), "three" (NOT "tree"), "this" (NOT "zis")\n\n**The /h/ sound:** Push air from your throat.\n- "happy" (NOT "appy"), "house" (NOT "ouse"), "hate" (NOT "ate")\n\n**Word Stress:** English stresses certain syllables.\n- "BA-na-na," "TEACH-er," "to-MOR-row"\n\n**Listening Tip:** Listen for key words. You don\'t need to understand every single word.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Clear Speech',
              framework: 'Grand Narrative',
              scriptureRef: '1 Corinthians 14:8-9',
              reflection: 'The Bible says to speak clearly so people understand. When you practice pronunciation, you are making your speech a gift to others.',
              applicationQuestion: 'Which sound do you want to improve the most: /th/ or /h/?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What happens if you say "I ate it" instead of "I hate it"?',
                'What does "word stress" mean?'
              ]
            },
            {
              type: 'practice',
              activity: 'Say It Right',
              prompt: 'Practice out loud:\n/th/ words: think, three, this, that, thank\n/h/ words: happy, house, have, hope, help\n\nSay this sentence 3 times: "I think this is the third Thursday of the month."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Pronunciation Goals',
              prompt: 'Write 3 sentences about your pronunciation:\n1. The sound I find hardest is ___.\n2. I am getting better at ___.\n3. My pronunciation goal is ___.\n\nPractice reading all 3 sentences out loud clearly.'
            },
            {
              type: 'discussion',
              questions: [
                'Practice the /th/ tongue position with a partner. Can you feel the difference between "think" and "sink"?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Speaking and Listening Review',
        estimatedMinutes: 35,
        objectives: [
          'Practice the /th/ and /h/ sounds.',
          'Listen for key words in English.',
          'Speak with more confidence.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Two important sounds for French speakers: /th/ (put your tongue between your teeth!) and /h/ (push air out!). Practice makes perfect!',
              connection: 'God gave you a voice! Use it clearly to communicate with others and to praise Him.'
            },
            {
              type: 'text',
              heading: 'Pronunciation Practice',
              body: '**/th/:** Put tongue between teeth. "Think." "Three." "This."\n**/h/:** Push air. "Happy." "House." "Help."\n\n**Listen for key words.** You don\'t need to understand everything — just the important words!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Your Voice Matters',
              framework: 'Grand Narrative',
              scriptureRef: '1 Corinthians 14:9',
              reflection: 'God says to speak clearly. When people understand you, you can help them, serve them, and share God\'s love!',
              applicationQuestion: 'What word is hardest for you to pronounce?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Where do you put your tongue for /th/?',
                'Say "happy." Now say "appy." Can you hear the difference?'
              ]
            },
            {
              type: 'practice',
              activity: 'Practice Sounds',
              prompt: 'Say these words 3 times each:\nthink, three, thank, this, that\nhappy, house, have, help, hope\n\nSay: "Thank you for helping me. I am happy."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Goal',
              prompt: 'Write 2-3 sentences: "The hardest sound for me is ___. I am going to practice ___. I am getting better!"'
            },
            {
              type: 'discussion',
              questions: [
                'Say "I think this is my house" slowly and clearly. Great job!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'pronunciation', definition: 'The way you say a word — the sounds you make', example: 'Good pronunciation helps people understand you.' },
      { term: 'stress', definition: 'In pronunciation, the emphasis or loudness given to a particular syllable', example: 'The stress in "banana" is on the second syllable: ba-NA-na.' },
      { term: 'syllable', definition: 'A unit of sound in a word (each beat)', example: '"Banana" has three syllables: ba-na-na.' },
      { term: 'intonation', definition: 'The rise and fall of your voice when speaking', example: 'Questions usually have rising intonation at the end.' },
      { term: 'schwa', definition: 'The most common vowel sound in English (/ə/), an "uh" sound in unstressed syllables', example: 'The "a" in "about" is a schwa sound: ə-BOUT.' },
      { term: 'linking', definition: 'Connecting the end of one word to the beginning of the next in speech', example: 'In "turn off," native speakers link it: "tur-NOFF."' },
      { term: 'comprehension', definition: 'Understanding what you hear or read', example: 'Listening comprehension means understanding spoken English.' }
    ],
    quiz: [
      { question: 'To produce the /th/ sound, you should:', options: ['Close your lips', 'Place your tongue between your teeth', 'Touch your tongue to the roof of your mouth', 'Open your mouth wide'], correctAnswer: 1, explanation: 'The /th/ sound requires placing your tongue between your teeth and pushing air over it.' },
      { question: 'What happens if you drop the /h/ in "I hate it"?', options: ['Nothing changes', 'It sounds like "I ate it"', 'It sounds like "I late it"', 'It sounds more polite'], correctAnswer: 1, explanation: 'Without /h/, "I hate it" becomes "I ate it" — completely different meaning!' },
      { question: 'Where is the stress in "banana"?', options: ['BA-na-na', 'ba-NA-na', 'ba-na-NA', 'All syllables equal'], correctAnswer: 1, explanation: 'The stress in "banana" is on the second syllable: ba-NA-na.' },
      { question: 'What is the "schwa" sound?', options: ['A loud "ah" sound', 'The "uh" sound in unstressed syllables', 'A French sound', 'The "ee" sound'], correctAnswer: 1, explanation: 'The schwa (/ə/) is the "uh" sound in unstressed syllables, like the "a" in "about."' },
      { question: 'French is ___ timed; English is ___ timed.', options: ['stress / syllable', 'syllable / stress', 'syllable / syllable', 'stress / stress'], correctAnswer: 1, explanation: 'French is syllable-timed (equal time per syllable); English is stress-timed (stressed syllables take longer).' },
      { question: 'What should you do if you don\'t understand someone?', options: ['Say "What?"', 'Ignore them', 'Ask: "Could you repeat that, please?"', 'Walk away'], correctAnswer: 2, explanation: '"Could you repeat that, please?" is the polite way to ask for clarification.' },
      { question: '"Linking" in English means:', options: ['Writing words together', 'Connecting word sounds smoothly in speech', 'Speaking very slowly', 'Spelling words correctly'], correctAnswer: 1, explanation: 'Linking means connecting the end of one word to the beginning of the next for smooth speech.' },
      { question: 'Rising intonation at the end of a sentence usually signals:', options: ['A statement', 'Anger', 'A question', 'A command'], correctAnswer: 2, explanation: 'In English, questions typically end with rising intonation: "You\'re coming?" ↗' },
      { question: 'Which word has the /th/ sound?', options: ['Tree', 'Think', 'Sink', 'Sit'], correctAnswer: 1, explanation: '"Think" contains the /th/ sound. "Tree" has /tr/, "sink" has /s/.' },
      { question: 'Which is the BEST listening strategy for A2 learners?', options: ['Understand every word', 'Listen for key words and use context', 'Only listen to simple words', 'Translate everything to French first'], correctAnswer: 1, explanation: 'At A2 level, listening for key words and using context is the most effective strategy. You don\'t need every word.' }
    ]
  },

  // ── W3: Reading and Writing Review (INSTRUCTION) ─────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Reading and Writing Review',
        estimatedMinutes: 60,
        objectives: [
          'Practice reading comprehension with A2-level texts using context clues, main ideas, and scanning.',
          'Write short paragraphs (5-8 sentences) with correct grammar, vocabulary, and organization.',
          'Identify and correct common French-speaker writing errors: article misuse, adjective placement, missing auxiliary in questions.',
          'Demonstrate readiness for the Level 1 Final Assessment.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Reading and writing are two sides of the same coin. Reading fills your mind with correct English patterns — vocabulary, grammar, sentence structure. Writing forces you to USE those patterns. The more you read, the better you write. The more you write, the more you notice when you read. Today, we bring both skills together for a final review.',
              connection: 'God gave us His Word in written form. He chose reading and writing as the way to preserve His truth across generations. When you improve your English reading and writing, you join a tradition that stretches back to Moses, who wrote the first five books of the Bible.'
            },
            {
              type: 'reading',
              title: 'A New Beginning',
              source: 'Original A2 reading comprehension passage',
              text: 'Jean-Pierre is 15 years old. He moved from Port-au-Prince to Boston six months ago. At first, everything was difficult. He did not understand his teachers. He could not read the signs in the street. He felt lonely and scared.\n\nBut Jean-Pierre did not give up. First, he watched English TV shows with subtitles. Then, he started reading simple books — children\'s books at first, then A2-level stories. Next, he joined an after-school English club. He made friends and practiced speaking every day.\n\nNow, Jean-Pierre can have conversations in English. He reads his textbooks and understands most of the words. He writes short paragraphs for homework. His teacher says his English is improving fast.\n\n"The hardest part was the beginning," Jean-Pierre says. "I wanted to give up many times. But my mother always said, \'God has a plan for you. Keep going.\' So I kept going. And it worked."\n\nJean-Pierre\'s goal is to graduate from high school and go to college. He wants to study computer science. "English opened doors for me," he says. "I am grateful for every word I learned."'
            },
            {
              type: 'text',
              heading: 'Common French-Speaker Writing Errors',
              body: '**1. Article Misuse**\nFrench uses articles more than English, and the rules are different.\n- WRONG: "The life is beautiful." RIGHT: "Life is beautiful." (General statements — no "the")\n- WRONG: "I play the soccer." RIGHT: "I play soccer." (Sports — no article)\n- WRONG: "I go to the school every day." RIGHT: "I go to school every day." (Institutions used in their general purpose — no "the")\nBut: "The school on Main Street is big." (Specific school — use "the")\n\n**2. Adjective Placement**\nIn French, adjectives usually come AFTER the noun: "une maison grande." In English, adjectives come BEFORE the noun: "a big house."\n- WRONG: "a house big" RIGHT: "a big house"\n- WRONG: "a car red" RIGHT: "a red car"\n- WRONG: "eyes blue" RIGHT: "blue eyes"\n\n**3. Missing Auxiliary in Questions**\nFrench can form questions by simply raising intonation: "Tu parles anglais?" English REQUIRES an auxiliary verb:\n- WRONG: "You speak English?" (intonation only) RIGHT: "Do you speak English?"\n- WRONG: "She likes pizza?" RIGHT: "Does she like pizza?"\n- WRONG: "You went to school?" RIGHT: "Did you go to school?"\n(Note: "You speak English?" is understood in casual speech, but grammatically, English needs "Do you...?")\n\n**4. Gender Confusion with Possessives**\nFrench possessives agree with the OBJECT: "sa maison" (his/her house). English possessives agree with the OWNER:\n- "His house" (male owner) "Her house" (female owner)\n- WRONG: "Marie loves his cat." RIGHT: "Marie loves her cat." (Marie is female → "her")\n\n**5. Word Order in Negatives**\nFrench wraps negation around the verb: "ne... pas." English puts "not" or "don\'t/doesn\'t/didn\'t" before the base verb:\n- WRONG: "I not like fish." RIGHT: "I don\'t like fish."\n- WRONG: "She not is happy." RIGHT: "She is not happy." / "She isn\'t happy."'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Power of the Written Word',
              framework: 'Grand Narrative',
              scriptureRef: 'Lamentations 3:40; Deuteronomy 6:6-9',
              reflection: 'God commanded His people to write His words down: "These commandments that I give you today are to be on your hearts. Write them on the doorframes of your houses" (Deuteronomy 6:6-9). Writing preserves truth. When you learn to write clearly in English, you gain the ability to share your thoughts, your faith, and your story with people across the world. Lamentations 3:40 says, "Let us examine our ways and test them." This writing review is your examination — a chance to test your skills, find your weaknesses, and prepare for the final assessment.',
              applicationQuestion: 'Why did God choose the written word as the primary way to preserve His truth? How does this motivate you to improve your writing?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'In the reading, what strategies helped Jean-Pierre improve his English? Name three.',
                'What is the adjective placement rule in English? How is it different from French?',
                'Why does God value the written word? How does improving your writing honor Him?'
              ]
            },
            {
              type: 'practice',
              activity: 'Error Correction',
              prompt: 'Find and fix ALL errors in these sentences:\n\n1. "The life is beautiful and I enjoy the nature."\n2. "She has a dress red and shoes black."\n3. "You like soccer?" (make it grammatically correct)\n4. "Marie loves his dog very much."\n5. "I not understand the question."\n6. "Yesterday, I have went to a restaurant big."\n7. "He is professor at the school."\n8. "It has many students in my class."\n\nFor each, explain which French-speaker error is at play.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Reading Comprehension + Writing',
              prompt: 'Part A — Reading Comprehension: Answer in complete sentences.\n1. How long has Jean-Pierre been in Boston?\n2. What three strategies did he use to improve?\n3. What is his goal for the future?\n4. What advice did his mother give him?\n\nPart B — Writing: Write a paragraph (6-8 sentences) on this topic: "What I have learned in this English course." Include: past simple (what you learned), present (what you know now), and future (what you plan to do next). Check for French-speaker errors: articles, adjective placement, question formation.'
            },
            {
              type: 'discussion',
              questions: [
                'Trade your paragraph with a partner. Check for French-speaker errors. Provide feedback!'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Reading and Writing Review',
        estimatedMinutes: 45,
        objectives: [
          'Practice reading comprehension with A2 texts.',
          'Write short paragraphs (5-6 sentences) with correct grammar.',
          'Identify common French-speaker writing errors and fix them.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Reading and writing go together. The more you read, the better you write. Today we practice both to get ready for the final assessment.',
              connection: 'God wrote His Word so we could read it and know Him. Reading and writing are powerful tools for learning and sharing faith!'
            },
            {
              type: 'reading',
              title: 'Jean-Pierre\'s Story',
              source: 'Original A2 passage',
              text: 'Jean-Pierre moved from Haiti to Boston. At first, English was very hard. But he watched TV with subtitles, read simple books, and joined an English club. Now he can have conversations and read his textbooks. "The hardest part was the beginning," he says. "But God had a plan for me."'
            },
            {
              type: 'text',
              heading: 'Common Writing Mistakes',
              body: '**1. Articles:** "The life is beautiful." → "Life is beautiful." (No "the" for general ideas.)\n**2. Adjective placement:** "a house big" → "a big house" (adjective BEFORE noun in English)\n**3. Questions:** "You like soccer?" → "Do you like soccer?" (Need auxiliary verb)\n**4. Possessives:** "Marie loves his cat." → "Marie loves her cat." (Marie is female)\n**5. Negatives:** "I not like fish." → "I don\'t like fish."'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Power of Writing',
              framework: 'Grand Narrative',
              scriptureRef: 'Lamentations 3:40; Deuteronomy 6:9',
              reflection: 'God told His people to write His words down. Writing preserves truth. When you write in English, you can share your story and your faith with the world!',
              applicationQuestion: 'What would you want to write about in English?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What helped Jean-Pierre improve his English?',
                'What is the adjective rule in English vs. French?'
              ]
            },
            {
              type: 'practice',
              activity: 'Fix the Errors',
              prompt: 'Fix these sentences:\n1. "The life is beautiful." → ___\n2. "She has a dress red." → ___\n3. "You like pizza?" → ___\n4. "Marie loves his cat." → ___\n5. "I not understand." → ___\n\nWrite a paragraph (5-6 sentences) about "My English Learning." Use past, present, and future tenses.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Paragraph',
              prompt: 'Answer these questions about Jean-Pierre:\n1. Where did he move from?\n2. What helped him learn English?\n3. What is his goal?\n\nThen write 5-6 sentences: "What I learned in this English course." Check for French-speaker errors!'
            },
            {
              type: 'discussion',
              questions: [
                'Share your paragraph and ask a partner to check for errors.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Reading and Writing Review',
        estimatedMinutes: 35,
        objectives: [
          'Read a short A2 text and answer questions.',
          'Write 4-5 correct English sentences.',
          'Avoid common French-speaker writing mistakes.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Practice reading and writing today! These skills will help you at school, at work, and in life.',
              connection: 'God gave us His Word in writing. When you read and write in English, you can learn more about God and share His love.'
            },
            {
              type: 'reading',
              title: 'Jean-Pierre',
              source: 'Original A1-A2 passage',
              text: 'Jean-Pierre moved from Haiti to Boston. English was hard at first. He read books and watched TV in English. Now he speaks English well. He wants to go to college.'
            },
            {
              type: 'text',
              heading: 'Writing Tips',
              body: '**Remember:**\n- "a big house" NOT "a house big" (adjective before noun)\n- "Do you like...?" NOT "You like...?" (add "do")\n- "I don\'t understand" NOT "I not understand"\n- "Marie loves her cat" NOT "Marie loves his cat" (Marie = she = her)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Writing for God',
              framework: 'Grand Narrative',
              scriptureRef: 'Deuteronomy 6:9',
              reflection: 'God told people to write His words down. Writing is powerful! When you write in English, you can share important things.',
              applicationQuestion: 'What do you like to write about?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What helped Jean-Pierre learn English?',
                'Where does the adjective go in English — before or after the noun?'
              ]
            },
            {
              type: 'practice',
              activity: 'Fix and Write',
              prompt: 'Fix: "She has a dress red." → ___\nFix: "I not understand." → ___\n\nWrite 3 sentences about what you learned in English class.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Paragraph',
              prompt: 'Write 3-5 sentences about Jean-Pierre\'s story. Then write 2-3 sentences about what you learned in English. Check for mistakes!'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences out loud. Did you put adjectives before nouns?'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'paragraph', definition: 'A group of sentences about one topic, starting on a new line', example: 'Write a paragraph about your school day.' },
      { term: 'comprehension', definition: 'The ability to understand something you read or hear', example: 'Reading comprehension means understanding what you read.' },
      { term: 'adjective', definition: 'A word that describes a noun (big, red, beautiful, happy)', example: 'In English, adjectives come BEFORE the noun: "a big house."' },
      { term: 'auxiliary', definition: 'A helping verb used to form questions, negatives, or tenses (do, does, did, have, be)', example: 'In "Do you like pizza?", "do" is the auxiliary verb.' },
      { term: 'possessive', definition: 'A word that shows ownership (my, your, his, her, our, their)', example: '"Her" book means the book belongs to her.' },
      { term: 'article', definition: 'The words "a," "an," and "the" — used before nouns', example: '"A cat" means any cat. "The cat" means a specific cat.' }
    ],
    quiz: [
      { question: 'Which sentence has correct adjective placement?', options: ['She has eyes blue.', 'She has a car expensive.', 'She has a beautiful dress.', 'She has a house old.'], correctAnswer: 2, explanation: 'In English, adjectives come BEFORE the noun: "a beautiful dress" (not "a dress beautiful").' },
      { question: '"The life is beautiful." What is wrong?', options: ['Nothing — it is correct', '"The" should be removed for a general statement', '"Beautiful" should come after "life"', '"Is" should be "are"'], correctAnswer: 1, explanation: 'For general statements, no article: "Life is beautiful." "The life" would mean a specific life.' },
      { question: '"You speak French?" How should this be written grammatically?', options: ['You speak French.', 'Do you speak French?', 'Are you speak French?', 'You do speak French?'], correctAnswer: 1, explanation: 'English questions need an auxiliary: "Do you speak French?" not just intonation.' },
      { question: '"Marie loves his dog." What is the error?', options: ['The verb is wrong', 'Marie is female, so it should be "her dog"', '"Loves" should be "love"', 'There is no error'], correctAnswer: 1, explanation: 'English possessives match the OWNER, not the object. Marie is female → "her dog."' },
      { question: '"I not like fish." How should this be corrected?', options: ['I not liking fish.', 'I don\'t like fish.', 'I no like fish.', 'I doesn\'t like fish.'], correctAnswer: 1, explanation: 'English negation uses "don\'t" + base verb: "I don\'t like fish."' },
      { question: 'What is the best reading strategy for a word you don\'t know?', options: ['Stop reading immediately', 'Use context clues from surrounding words', 'Skip the entire paragraph', 'Only read the first sentence'], correctAnswer: 1, explanation: 'Using context clues — words around the unknown word — helps you guess its meaning.' },
      { question: 'How many sentences should a basic paragraph have?', options: ['1-2', '5-8', '15-20', '50+'], correctAnswer: 1, explanation: 'A basic paragraph has 5-8 sentences focused on one topic or idea.' },
      { question: 'What did Jean-Pierre do to improve his English?', options: ['He gave up', 'He watched TV, read books, and joined an English club', 'He only spoke French', 'He moved back to Haiti'], correctAnswer: 1, explanation: 'Jean-Pierre used multiple strategies: TV with subtitles, reading, and an English club.' },
      { question: '"I play the soccer." What is wrong?', options: ['Nothing', '"The" should be removed — no article before sports', '"Soccer" should be "football"', '"Play" should be "plays"'], correctAnswer: 1, explanation: 'English does not use articles before sports: "I play soccer" (not "the soccer").' },
      { question: 'Complete: "She is ___ smart ___ ." (word order)', options: ['student a very', 'a very smart student', 'a student very smart', 'very a smart student'], correctAnswer: 1, explanation: 'English adjective order: article + adverb + adjective + noun: "a very smart student."' }
    ]
  },

  // ── W4: Level 1 Final Assessment (PROJECT) ───────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Level 1 Final Assessment',
        estimatedMinutes: 60,
        objectives: [
          'Demonstrate A2-level reading comprehension through a passage with questions.',
          'Produce a well-organized written paragraph (6-8 sentences) with correct grammar and vocabulary.',
          'Demonstrate listening comprehension through A2-level dialogue questions.',
          'Self-evaluate speaking skills and set goals for Level 2.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is it — your Level 1 Final Assessment. You have worked hard through 9 units, learned grammar from present simple to future tense, built vocabulary across dozens of topics, practiced pronunciation, and read many texts. This assessment brings everything together. It is not just a test — it is a celebration of how far you have come.',
              connection: 'Lamentations 3:40 says, "Let us examine our ways and test them, and let us return to the Lord." This assessment is your examination. Be honest about what you know and what you still need to work on. Trust God with the results — He has been with you every step of this journey, and He will continue to guide your learning.'
            },
            {
              type: 'text',
              heading: 'Level 1 Final Assessment — Instructions',
              body: 'The assessment has four sections, covering all four language skills:\n\n**Section 1: Reading Comprehension (25%)**\nRead an A2-level passage and answer 5 questions. Use strategies: previewing, context clues, scanning.\n\n**Section 2: Writing (30%)**\nWrite a paragraph (6-8 sentences) on a given topic. You will be assessed on: grammar accuracy, vocabulary range, organization, and avoidance of French-speaker errors.\n\n**Section 3: Listening Comprehension (20%)**\nRead a dialogue and answer comprehension questions about it. (In a classroom setting, this would be audio-based.)\n\n**Section 4: Speaking Self-Assessment & Goal Setting (25%)**\nRecord yourself reading a passage OR self-assess your pronunciation. Then set 3 specific goals for Level 2.\n\n**Rubric for Each Section:**\n- Section 1: Correct answers with evidence from the text (5 points each, 25 total)\n- Section 2: Grammar (10), Vocabulary (8), Organization (7), French-error avoidance (5) = 30 total\n- Section 3: Correct answers with comprehension (4 points each, 20 total)\n- Section 4: Honest self-assessment (10), Specific goals (15) = 25 total'
            },
            {
              type: 'text',
              heading: 'Section 1: Reading Comprehension',
              body: 'Read this passage and answer the questions that follow:\n\n**Growing Up Bilingual**\n\nAmina is 16 years old. She was born in Senegal, where her family speaks French and Wolof. When she was 12, her family moved to Toronto, Canada. She had to learn English.\n\n"The first year was terrible," Amina remembers. "I sat in class and didn\'t understand anything. The other students were kind, but I felt invisible. I couldn\'t express myself."\n\nAmina\'s teacher suggested she start a journal. "Write one sentence in English every day," the teacher said. "Just one." Amina started with simple sentences: "Today is Monday. I am tired. The lunch was good." Slowly, her sentences got longer and more complex.\n\nBy the end of her second year, Amina could write paragraphs. She joined the school newspaper. She made friends. She discovered that being bilingual — speaking both French and English — was actually an advantage.\n\n"Companies want people who speak multiple languages," Amina says. "My French is not a weakness. It is a superpower." She plans to study international business at university. She is also going to learn Spanish.\n\n"God gave me two languages as a child," Amina says. "Now I am adding more. Every language opens a new world."\n\n**Questions:**\n1. Where was Amina born, and what languages did she speak?\n2. How old was she when she moved to Toronto?\n3. What strategy did her teacher suggest?\n4. How did Amina\'s writing improve over time?\n5. Why does Amina say being bilingual is a "superpower"?'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Sections 2 & 3: Writing and Listening',
              prompt: '**Section 2: Writing**\nWrite a paragraph (6-8 sentences) on this topic: "My English Learning Journey: Where I Started and Where I Am Going."\nInclude: past simple (where you started), present (where you are now), future (your goals). Use correct articles, adjective placement, and question forms if needed. Avoid all French-speaker errors.\n\n**Section 3: Listening Comprehension**\nRead this dialogue and answer the questions:\n\nAlex: "Hi! Are you new here?"\nFatima: "Yes, I moved here from Morocco last month. I don\'t speak English very well yet."\nAlex: "That\'s okay! I can help you. What class do you have next?"\nFatima: "I am going to go to math class, but I can\'t find the room."\nAlex: "It\'s on the second floor, next to the library. I will walk with you."\nFatima: "Thank you so much! You are very kind."\nAlex: "You\'re welcome. See you at lunch?"\nFatima: "Yes! I am going to sit in the cafeteria."\n\nQuestions:\n1. Where is Fatima from?\n2. How long has she been in her new location?\n3. What class is Fatima looking for?\n4. Where is the math classroom?\n5. What future plan does Fatima mention at the end?'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'Section 4: Speaking Self-Assessment & Goal Setting',
              instructions: '**Part A: Speaking Self-Assessment**\nRate yourself honestly (1-5) on each skill:\n1. Pronunciation of /th/ sounds: ___\n2. Pronunciation of /h/ sounds: ___\n3. Word stress accuracy: ___\n4. Speaking confidence: ___\n5. Ability to ask and answer questions: ___\n6. Using polite expressions: ___\n\nOptional: Record yourself reading this sentence clearly:\n"I think I am thankful for this English course. I have learned three things that will help me in the future. I am happy and hopeful."\n\n**Part B: Goal Setting for Level 2**\nWrite 3 specific goals for your continued English learning:\nGoal 1 (Grammar): ___\nGoal 2 (Vocabulary): ___\nGoal 3 (Speaking/Pronunciation): ___\n\n**Part C: Reflection**\nWrite 3-4 sentences reflecting on your Level 1 journey. What are you most proud of? How has God helped you? What are you looking forward to in Level 2?\n\nEnd with Lamentations 3:40: "Let us examine our ways and test them, and let us return to the Lord." You have examined your ways. You have tested yourself. Now go forward with confidence!'
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Level 1 Final Assessment',
        estimatedMinutes: 45,
        objectives: [
          'Demonstrate A2-level reading comprehension.',
          'Write a paragraph (5-6 sentences) with correct grammar.',
          'Answer listening comprehension questions.',
          'Set goals for Level 2.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is your final assessment for Level 1! It covers everything you learned. Do your best and trust God with the results.',
              connection: 'Lamentations 3:40 says to examine and test ourselves. This assessment is your chance to see how far you have come — and to set goals for the future. God is proud of your hard work!'
            },
            {
              type: 'text',
              heading: 'Final Assessment Instructions',
              body: 'Your assessment has four parts:\n\n**Part 1: Reading (25%)** — Read a passage, answer 4 questions.\n**Part 2: Writing (30%)** — Write 5-6 sentences on a topic.\n**Part 3: Listening (20%)** — Read a dialogue, answer 4 questions.\n**Part 4: Self-Assessment & Goals (25%)** — Rate your skills, set 3 goals.\n\n**Reading Passage: Growing Up Bilingual**\nAmina was born in Senegal. She spoke French and Wolof. When she was 12, she moved to Toronto and learned English. Her teacher told her to write one sentence in English every day. Slowly, she improved. She joined the school newspaper. She says being bilingual is a "superpower." She plans to study business and learn Spanish.\n\n**Questions:**\n1. Where is Amina from?\n2. What strategy did her teacher suggest?\n3. How did Amina improve her English?\n4. What are her plans for the future?'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Writing and Listening',
              prompt: '**Part 2: Writing**\nWrite 5-6 sentences: "My English Learning Journey." Use past, present, and future tenses. Check for French-speaker errors.\n\n**Part 3: Listening**\nRead this dialogue:\nAlex: "Are you new here?"\nFatima: "Yes, I moved here from Morocco. I don\'t speak English well yet."\nAlex: "I can help you. What class do you have?"\nFatima: "Math. I can\'t find the room."\nAlex: "It\'s next to the library. I will walk with you."\nFatima: "Thank you!"\n\nQuestions:\n1. Where is Fatima from?\n2. What class is she looking for?\n3. Where is the math room?\n4. How does Alex help Fatima?'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'Self-Assessment & Goals',
              instructions: '**Rate yourself (1-5):**\n1. Grammar accuracy: ___\n2. Vocabulary: ___\n3. Pronunciation: ___\n4. Reading comprehension: ___\n5. Writing: ___\n\n**Set 3 goals for Level 2:**\nGoal 1: ___\nGoal 2: ___\nGoal 3: ___\n\n**Reflect:** Write 2-3 sentences about what you are most proud of and how God helped you. End with: "Let us examine our ways and test them" (Lamentations 3:40).'
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Level 1 Final Assessment',
        estimatedMinutes: 35,
        objectives: [
          'Read a short text and answer questions.',
          'Write 4-5 correct sentences about your English learning.',
          'Rate your skills and set goals for Level 2.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'This is your final test! You have learned so much. Do your best — God is proud of you!',
              connection: 'The Bible says to examine ourselves. This test shows how much you have grown. Keep trusting God!'
            },
            {
              type: 'text',
              heading: 'Final Assessment',
              body: '**Part 1: Reading**\nRead this text:\nAmina moved from Senegal to Toronto. English was hard at first. She wrote one sentence every day. She improved slowly. Now she speaks English well. She says being bilingual is a "superpower."\n\nQuestions:\n1. Where is Amina from?\n2. How did she improve her English?\n3. What does "bilingual" mean?\n\n**Part 2: Writing**\nWrite 4-5 sentences: "What I learned in English class." Use past and present tenses.\n\n**Part 3: My Goals**\nRate yourself (1-5): Grammar ___, Vocabulary ___, Speaking ___\nWrite 2 goals for Level 2.'
            }
          ],
          processing: [
            {
              type: 'practice',
              activity: 'Complete Your Assessment',
              prompt: 'Answer the reading questions.\nWrite your 4-5 sentences about English class.\nRate yourself and write 2 goals.'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My Reflection',
              instructions: 'Write 2-3 sentences: What are you proud of? What do you want to learn next? Thank God for helping you! "Let us examine our ways and test them" (Lamentations 3:40).'
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'assessment', definition: 'A test or evaluation of what you have learned', example: 'The final assessment covers all the material from the course.' },
      { term: 'bilingual', definition: 'Able to speak two languages', example: 'Amina is bilingual — she speaks French and English.' },
      { term: 'self-evaluation', definition: 'Judging your own skills and progress honestly', example: 'Self-evaluation helps you know what to improve.' },
      { term: 'goal', definition: 'Something you want to achieve in the future', example: 'My goal is to read an English book without a dictionary.' },
      { term: 'reflection', definition: 'Thinking carefully about your experiences and what you learned from them', example: 'Writing a reflection helps you understand your learning journey.' }
    ],
    quiz: []
  }
]

// ─── Word Counter ───────────────────────────────────────────────────────────

function countWords(variant: PathwayVariant): number {
  let count = 0
  for (const phase of ['input', 'processing', 'output'] as const) {
    for (const block of variant.ipo[phase]) {
      const b = block as Record<string, unknown>
      for (const key of ['body', 'text', 'prompt', 'activity', 'instructions', 'description', 'summary', 'connection', 'reflection', 'applicationQuestion', 'heading', 'title', 'framework', 'scriptureRef', 'theme', 'Christ_connection']) {
        if (typeof b[key] === 'string') {
          count += (b[key] as string).split(/\s+/).filter(Boolean).length
        }
      }
      if (Array.isArray(b.questions)) {
        for (const q of b.questions as string[]) {
          count += q.split(/\s+/).filter(Boolean).length
        }
      }
      if (Array.isArray(b.rubric)) {
        for (const r of b.rubric as Array<Record<string, unknown>>) {
          if (typeof r.dimension === 'string') count += r.dimension.split(/\s+/).filter(Boolean).length
          if (r.descriptors && typeof r.descriptors === 'object') {
            for (const d of Object.values(r.descriptors as Record<string, string>)) {
              count += d.split(/\s+/).filter(Boolean).length
            }
          }
        }
      }
    }
  }
  return count
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${'='.repeat(70)}`)
  console.log(`  Enrich English Foundations L1 Units 7-9: School, Past/Future, Review`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no DB writes)' : 'LIVE (writing to DB)'}`)
  console.log(`${'='.repeat(70)}\n`)

  let totalUpdated = 0
  let totalSkipped = 0

  const allEnriched = [
    { unitNumber: 7, lessons: unit7Lessons },
    { unitNumber: 8, lessons: unit8Lessons },
    { unitNumber: 9, lessons: unit9Lessons },
  ]

  for (const { unitNumber, lessons } of allEnriched) {
    console.log(`\n  ── Unit ${unitNumber} ──────────────────────────────────────────`)

    const dbLessons = await prisma.lesson.findMany({
      where: { unit: { courseId: COURSE_ID, unitNumber } },
      select: { id: true, title: true, weekNumber: true, type: true, content: true },
      orderBy: { weekNumber: 'asc' },
    })

    console.log(`  Found ${dbLessons.length} lessons in DB for unit ${unitNumber}\n`)

    for (const enriched of lessons) {
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
