#!/usr/bin/env tsx
/**
 * Enrich English Foundations for French Speakers — Level 1 Units 1–3
 *
 * Course: "English Foundations for French Speakers" (CEFR A1→A2)
 * Course ID: cmo78o9zo0000on5tlzntk2gx
 *
 * Unit 1: "Hello! Who Am I?" (unitNumber: 1)
 *   W1: Greetings and Introductions (INSTRUCTION)
 *   W2: The Alphabet and English Sounds (INSTRUCTION)
 *   W3: Numbers, Days, and Time (INSTRUCTION)
 *   W4: My First English Conversation (PROJECT)
 *
 * Unit 2: "My World" (unitNumber: 2)
 *   W1: Family and Friends (INSTRUCTION)
 *   W2: My Home and Classroom (INSTRUCTION)
 *   W3: Colors, Shapes, and Descriptions (INSTRUCTION)
 *   W4: Describing My World (PROJECT)
 *
 * Unit 3: "Daily Life" (unitNumber: 3)
 *   W1: Morning to Night: Daily Routines (INSTRUCTION)
 *   W2: Food and Meals (INSTRUCTION)
 *   W3: Clothing and Weather (INSTRUCTION)
 *   W4: A Day in My Life (PROJECT)
 *
 * French-specific: pronunciation (/th/, /h/, English /r/), false cognates,
 * grammar contrasts (adj order, no gender, do/does), Francophone culture.
 * Grand Narrative: Creation → Fall → Redemption → Restoration.
 *
 * Usage:
 *   npx tsx scripts/enrich-ef-l1-u1-3.ts --dry-run
 *   npx tsx scripts/enrich-ef-l1-u1-3.ts
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
// UNIT 1: HELLO! WHO AM I? (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit1Lessons: EnrichedLesson[] = [
  // ── W1: Greetings and Introductions ──────────────────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Greetings and Introductions',
        estimatedMinutes: 60,
        objectives: [
          'Use formal and informal greetings and farewells in English with correct pronunciation.',
          'Introduce yourself using "My name is..." and "Nice to meet you" with proper intonation.',
          'Compare French and English greeting customs, including the tu/vous distinction versus English "you."',
          'Pronounce the English /th/ sound in "the," "this," and "that" correctly.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you must choose between "tu" and "vous" every time you say "you." One wrong choice can be embarrassing! In English, there is only one word: "you." Does that make English simpler — or does it mean something is lost? How do English speakers show respect if they only have one word for "you"?',
              connection: 'English uses tone of voice, word choice, and body language to show respect instead of pronoun changes. Understanding this cultural difference is the first step to communicating well in a new language.'
            },
            {
              type: 'reading',
              title: 'A Day at a New School',
              source: 'Original ESL Passage — A1 Level',
              text: 'It is Monday morning. Marie walks into her new school in America. She is nervous. A girl walks up to her and says, "Hi! My name is Sarah. What is your name?" Marie smiles and says, "Hello. My name is Marie. Nice to meet you." Sarah says, "Nice to meet you too! Where are you from?" Marie answers, "I am from Haiti." Sarah says, "That is so cool! Welcome to our school." Marie feels happy. She has a new friend.\n\nLater, Marie meets her teacher. The teacher says, "Good morning, class. Welcome to English class." Marie raises her hand and says, "Good morning, teacher." The teacher smiles. After class, Sarah says, "See you tomorrow, Marie!" Marie waves and says, "Goodbye! See you tomorrow!"'
            },
            {
              type: 'text',
              heading: 'Greetings in English: Formal and Informal',
              body: '**Informal Greetings** (for friends, classmates, family):\n- "Hi!" / "Hey!" — the most common casual greetings\n- "What\'s up?" — very informal, means "How are you?"\n- "See you later!" / "Bye!" — casual farewells\n\n**Formal Greetings** (for teachers, adults, strangers):\n- "Hello." / "Good morning." / "Good afternoon." / "Good evening."\n- "How do you do?" — very formal, used when meeting someone important\n- "Goodbye." / "Have a nice day." — polite farewells\n\n**Key Introduction Phrases:**\n- "My name is [name]." or "I am [name]."\n- "Nice to meet you." → Response: "Nice to meet you too."\n- "Where are you from?" → "I am from [country/city]."\n\n**French vs. English — The "You" Question:**\nIn French, you choose between *tu* (informal) and *vous* (formal/plural). In English, "you" is always "you" — whether you are talking to your best friend or the president! English speakers show formality through:\n- Word choice: "Hey" (informal) vs. "Good evening" (formal)\n- Titles: "Mr. Smith" vs. "John"\n- Tone of voice: relaxed vs. professional\n\n**Pronunciation Alert — The /th/ Sound:**\nFrench does not have the English /th/ sound. Many French speakers say "ze" instead of "the" or "zis" instead of "this." To make the /th/ sound correctly:\n1. Put your tongue between your teeth (just the tip!)\n2. Blow air gently over your tongue\n3. Practice: "the" — "this" — "that" — "them" — "there"\n\nThis sound appears in almost every English sentence, so practicing it now will help you greatly.'
            },
            {
              type: 'text',
              heading: 'Cultural Note: Greetings Around the Francophone World',
              body: 'In France, people greet with *la bise* (cheek kisses). In Haiti, a handshake or hug is common. In many African Francophone countries, greetings are long and include asking about family. In the United States and Britain, a smile and a handshake are the standard greeting for new people. Close friends may hug, but cheek-kissing is rare. Understanding these cultural differences helps you feel confident in English-speaking environments.\n\n**Faux ami (false cognate) alert:** The French word *salut* means "hi" — but in English, "salute" means a military gesture of respect (hand to forehead). They sound similar but mean very different things!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Communication',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 11:1-9',
              reflection: 'God created language as a gift for connection. At the Tower of Babel, God diversified languages, and people scattered across the earth. But learning a new language is an act of bridge-building — it brings people together across cultural boundaries. This reflects God\'s heart for all nations to know Him (Revelation 7:9): "After this I looked, and there before me was a great multitude that no one could count, from every nation, tribe, people and language, standing before the throne."',
              applicationQuestion: 'How might learning English help you connect with people from different parts of the world and share God\'s love?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are two differences between how French speakers and English speakers greet someone for the first time?',
                'Why do you think English only has one word for "you" while French has two (tu/vous)? Which system do you prefer and why?',
                'Practice saying "the," "this," and "that" out loud. What does your tongue need to do that is different from French?'
              ]
            },
            {
              type: 'practice',
              activity: 'Greeting Role-Play Scenarios',
              instructions: 'For each scenario below, write what you would say in English. Use formal or informal language as appropriate.\n\n1. You meet a new student at school. Introduce yourself.\n2. You see your teacher in the morning. Greet them.\n3. Your friend calls you on the phone. Answer with a greeting.\n4. You are leaving school for the day. Say goodbye to your teacher.\n5. You meet your friend\'s parent for the first time. Introduce yourself politely.\n\nAfter writing, practice saying each response out loud. Pay special attention to the /th/ sound in words like "the," "this," and "that."'
            },
            {
              type: 'practice',
              activity: 'Formal vs. Informal Sorting',
              instructions: 'Sort these greetings into two columns — FORMAL and INFORMAL:\n\n"Hey!" / "Good afternoon, sir." / "What\'s up?" / "How do you do?" / "Hi there!" / "Good evening, Mrs. Johnson." / "Bye!" / "It was a pleasure meeting you." / "See ya!" / "Goodbye, and have a wonderful day."\n\nThen write one original formal greeting and one original informal greeting of your own.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Create Your Introduction Card',
              instructions: 'Write a short introduction about yourself in English (6-8 sentences). Include:\n- Your name\n- Where you are from\n- Your age\n- One thing you like\n- One greeting at the beginning\n- One farewell at the end\n\nExample: "Hello! My name is Jean-Pierre. I am from Port-au-Prince, Haiti. I am 14 years old. I like playing soccer. It is nice to meet you. I hope we can be friends. See you soon!"\n\nAfter writing, practice reading your introduction out loud with a partner or by recording yourself.'
            },
            {
              type: 'discussion',
              questions: [
                'Read your introduction to the class or record yourself. Did you remember to include both a greeting and a farewell?',
                'What English sounds were hardest for you to pronounce? How will you practice them this week?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Greetings and Introductions',
        estimatedMinutes: 45,
        objectives: [
          'Use common greetings and farewells in English.',
          'Introduce yourself using "My name is..." and "Nice to meet you."',
          'Understand the difference between formal and informal greetings.',
          'Practice the English /th/ sound.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you say "tu" to friends and "vous" to teachers. In English, you always say "you." How do English speakers show respect without changing the word "you"?',
              connection: 'English speakers use different words and tone to show respect. Learning these small differences helps you communicate well.'
            },
            {
              type: 'reading',
              title: 'Meeting a New Friend',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie walks into her new school. A girl says, "Hi! My name is Sarah. What is your name?" Marie says, "Hello. My name is Marie. Nice to meet you." Sarah says, "Nice to meet you too! Where are you from?" Marie says, "I am from Haiti." Sarah says, "Welcome!" After school, Sarah says, "Bye, Marie! See you tomorrow!" Marie smiles and says, "Goodbye! See you tomorrow!"'
            },
            {
              type: 'text',
              heading: 'English Greetings: Formal and Informal',
              body: '**Informal** (friends, family):\n- "Hi!" / "Hey!"\n- "What\'s up?" (means "How are you?")\n- "Bye!" / "See you later!"\n\n**Formal** (teachers, adults, strangers):\n- "Hello." / "Good morning." / "Good afternoon."\n- "Goodbye." / "Have a nice day."\n\n**Introducing Yourself:**\n- "My name is [name]."\n- "Nice to meet you." → "Nice to meet you too."\n- "Where are you from?" → "I am from [place]."\n\n**French vs. English:**\nFrench has *tu* and *vous*. English only has "you." English speakers use word choice and tone to be polite: "Hey" is casual, "Good evening" is formal.\n\n**The /th/ Sound:**\nFrench does not have /th/. To say it: put the tip of your tongue between your teeth and blow air gently. Practice: "the" — "this" — "that" — "there."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Communication',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 11:1-9',
              reflection: 'God created language so people can connect with each other. At Babel, languages became different, but learning a new language brings people together. God loves all nations and all languages (Revelation 7:9).',
              applicationQuestion: 'How can learning English help you connect with new people and share kindness?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is one difference between greetings in French and greetings in English?',
                'When would you use "Good morning" instead of "Hey"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Greeting Scenarios',
              instructions: 'Write what you would say in English for each situation:\n\n1. You meet a new classmate. Introduce yourself.\n2. You see your teacher in the morning.\n3. You are leaving school. Say goodbye to a friend.\n4. You meet your friend\'s mother for the first time.\n\nPractice saying each answer out loud. Pay attention to the /th/ sound.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Introduction',
              instructions: 'Write 4-6 sentences introducing yourself in English. Include:\n- A greeting\n- Your name\n- Where you are from\n- One thing you like\n- A farewell\n\nExample: "Hello! My name is Pierre. I am from Senegal. I like music. Nice to meet you! Goodbye!"'
            },
            {
              type: 'discussion',
              questions: [
                'Read your introduction out loud. Which words have the /th/ sound?',
                'What greeting will you use most often in English class?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Greetings and Introductions',
        estimatedMinutes: 35,
        objectives: [
          'Say hello and goodbye in English.',
          'Introduce yourself with "My name is..."',
          'Know when to be formal or informal.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you say "tu" to friends and "vous" to adults. In English, you always say "you." How do you show respect in English?',
              connection: 'You can use polite words like "Good morning" and "sir" or "ma\'am" to show respect in English.'
            },
            {
              type: 'reading',
              title: 'Meeting Someone New',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie goes to a new school. Sarah says, "Hi! My name is Sarah." Marie says, "Hello. My name is Marie." Sarah says, "Nice to meet you!" Marie says, "Nice to meet you too!" After school, Sarah says, "Bye!" Marie says, "Goodbye!"'
            },
            {
              type: 'text',
              heading: 'How to Say Hello and Goodbye',
              body: '**With friends:**\n- "Hi!" / "Hey!"\n- "Bye!" / "See you!"\n\n**With teachers and adults:**\n- "Good morning." / "Hello."\n- "Goodbye." / "Have a nice day."\n\n**Introduce yourself:**\n- "My name is [name]."\n- "Nice to meet you."\n\n**Say the /th/ sound:**\nPut your tongue between your teeth. Blow air. Say: "the" — "this" — "that."\n\nIn French, you say *salut* for "hi." In English, "salute" means a military gesture — not "hello"! Be careful with words that look the same in French and English.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Communication',
              framework: 'Grand Narrative',
              scriptureRef: 'Revelation 7:9',
              reflection: 'God made many languages. Learning English helps you talk to people from many countries. God loves people from every language.',
              applicationQuestion: 'Who can you greet in English this week?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you say hello to a friend in English? How do you say hello to a teacher?',
                'Practice the /th/ sound: say "the," "this," "that" three times.'
              ]
            },
            {
              type: 'practice',
              activity: 'Fill in the Blanks',
              instructions: 'Complete each sentence with the correct word:\n\n1. "___! My name is Paul." (Hi / Goodbye)\n2. "Nice to ___ you." (see / meet)\n3. "Good ___, teacher." (morning / bye)\n4. "___ you tomorrow!" (See / Nice)\n\nNow practice saying each sentence out loud.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Introduction',
              instructions: 'Write 3-4 sentences about yourself:\n- Say hello\n- Say your name\n- Say where you are from\n- Say goodbye\n\nExample: "Hello! My name is Ama. I am from Cameroon. Goodbye!"'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences to a partner. Did you say the /th/ sound correctly?'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'greeting', definition: 'Something you say when you meet someone (like "hello" or "good morning")', example: '"Good morning" is a formal greeting.' },
      { term: 'farewell', definition: 'Something you say when you leave (like "goodbye" or "see you later")', example: 'She waved and said a quick farewell.' },
      { term: 'introduce', definition: 'To tell someone your name for the first time', example: 'Let me introduce myself — my name is Marie.' },
      { term: 'formal', definition: 'Polite and professional language used with teachers, adults, or strangers', example: '"Good afternoon, sir" is a formal greeting.' },
      { term: 'informal', definition: 'Casual, relaxed language used with friends and family', example: '"Hey! What\'s up?" is an informal greeting.' },
      { term: 'pronounce', definition: 'To say a word or sound correctly', example: 'Can you pronounce the /th/ sound in "the"?' },
      { term: 'polite', definition: 'Showing good manners and respect', example: 'It is polite to say "please" and "thank you."' },
      { term: 'welcome', definition: 'A word that shows you are happy someone is here', example: 'Welcome to our school!' }
    ],
    quiz: [
      { question: 'Which greeting is INFORMAL?', options: ['"Good afternoon, Mr. Smith."', '"Hey! What\'s up?"', '"How do you do?"', '"Good evening, ma\'am."'], correctAnswer: 1, explanation: '"Hey! What\'s up?" is an informal greeting used with friends. The other options are formal.' },
      { question: 'How do you respond to "Nice to meet you"?', options: ['"I am fine."', '"Nice to meet you too."', '"Goodbye."', '"See you later."'], correctAnswer: 1, explanation: 'The correct response to "Nice to meet you" is "Nice to meet you too."' },
      { question: 'In French, you choose between "tu" and "vous." In English, you always say...', options: ['"he"', '"they"', '"you"', '"we"'], correctAnswer: 2, explanation: 'English has only one word for "you" — it is the same for everyone.' },
      { question: 'Which sentence is a correct self-introduction?', options: ['"I name is Marie."', '"My name is Marie."', '"Me name is Marie."', '"Name my is Marie."'], correctAnswer: 1, explanation: 'The correct form is "My name is [name]."' },
      { question: 'The French word "salut" means "hi." What does the English word "salute" mean?', options: ['Hello', 'A military gesture of respect', 'Goodbye', 'Thank you'], correctAnswer: 1, explanation: '"Salut" (French) means "hi," but "salute" (English) is a military gesture — a false cognate!' },
      { question: 'To make the English /th/ sound, you should...', options: ['Close your lips tightly', 'Put your tongue between your teeth and blow air', 'Roll your tongue like the French /R/', 'Keep your mouth closed'], correctAnswer: 1, explanation: 'The /th/ sound requires placing the tip of your tongue between your teeth and blowing air gently.' },
      { question: 'Which is a FORMAL farewell?', options: ['"See ya!"', '"Bye!"', '"Later!"', '"Goodbye, and have a wonderful day."'], correctAnswer: 3, explanation: '"Goodbye, and have a wonderful day" is formal. The other options are informal.' },
      { question: '"Where are you from?" — What is a correct answer?', options: ['"I am from Haiti."', '"I from Haiti."', '"My from is Haiti."', '"From I am Haiti."'], correctAnswer: 0, explanation: 'The correct structure is "I am from [place]."' },
      { question: 'What does "informal" mean?', options: ['Polite and professional', 'Casual and relaxed', 'Angry and loud', 'Quiet and shy'], correctAnswer: 1, explanation: 'Informal means casual and relaxed — the way you speak with friends.' },
      { question: 'Which word has the /th/ sound?', options: ['Tree', 'The', 'Free', 'Zebra'], correctAnswer: 1, explanation: '"The" contains the /th/ sound. "Tree," "free," and "zebra" do not.' }
    ]
  },

  // ── W2: The Alphabet and English Sounds ──────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'The Alphabet and English Sounds',
        estimatedMinutes: 60,
        objectives: [
          'Recite all 26 letters of the English alphabet with correct pronunciation.',
          'Identify the five vowels (A, E, I, O, U) and explain why they are important.',
          'Compare French and English letter sounds, especially silent letters and vowel differences.',
          'Pronounce challenging sounds for French speakers: /th/, /h/, and English /r/ vs. French /R/.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'The English word "knight" has a silent K and a silent GH — you only hear three sounds: /n/ /ai/ /t/. French has silent letters too (like the S in "temps"), but English silent letters follow completely different rules. Why do you think some letters in English are written but never spoken?',
              connection: 'English spelling often preserves historical pronunciation. "Knight" used to be pronounced with the K sound hundreds of years ago! Understanding this history helps you remember tricky spellings.'
            },
            {
              type: 'reading',
              title: 'The Alphabet Song — With a Twist',
              source: 'Original ESL Passage — A1 Level',
              text: 'Every English-speaking child learns the alphabet song: "A-B-C-D-E-F-G, H-I-J-K-L-M-N-O-P, Q-R-S-T-U-V, W-X-Y and Z." But here is something surprising: French speakers already know 25 of the 26 letters! The only new letter is W (called "double-u" in English, not "double-v" like in French). The challenge is not the letters themselves — it is the sounds they make. The letter A in English can sound like "ay" (cake), "ah" (father), or "a" (cat). In French, A almost always sounds the same. This is why English pronunciation can feel confusing at first — but with practice, it becomes natural.'
            },
            {
              type: 'text',
              heading: 'The English Alphabet and Its Sounds',
              body: '**The 26 Letters:** A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\n\n**5 Vowels:** A, E, I, O, U — every English word must contain at least one vowel. Y sometimes acts as a vowel too (as in "gym" or "happy").\n\n**21 Consonants:** All the other letters.\n\n**French vs. English Letter Names:**\nMost letters sound similar, but watch out for these differences:\n- **E**: French says /uh/, English says /ee/\n- **G**: French says /zhay/, English says /jee/\n- **H**: In French, H is always silent (*hôpital* = "oh-pee-tal"). In English, H is usually pronounced: "house" = /h-ow-s/, NOT "ouse"!\n- **I**: French says /ee/, English says /ai/ (like "eye")\n- **J**: French says /zhee/, English says /jay/\n- **R**: The French /R/ is made in the throat (a gargling sound). The English /r/ is made by curling the tongue back without touching anything. Practice: "red," "right," "road."\n- **W**: French says "double-v," English says "double-u."\n\n**Vowel Sounds — The Big Challenge:**\nEnglish vowels can make many different sounds. This is the hardest part for French speakers:\n- **A**: "cake" (/ay/), "cat" (/æ/), "father" (/ah/)\n- **E**: "me" (/ee/), "bed" (/eh/), "the" (/uh/)\n- **I**: "bike" (/ai/), "sit" (/ih/)\n- **O**: "go" (/oh/), "hot" (/ah/), "to" (/oo/)\n- **U**: "cute" (/yoo/), "bus" (/uh/), "put" (/oo/)\n\n**Silent Letters in English:**\nJust like French has silent letters, English does too — but the rules are different:\n- Silent K: "know," "knee," "knight," "knife"\n- Silent W: "write," "wrong," "wrist"\n- Silent B: "climb," "thumb," "lamb"\n- Silent GH: "night," "light," "daughter"\n\n**The /h/ Sound:**\nIn French, the letter H is always silent. In English, H is usually pronounced! You must push a small puff of air: "house," "happy," "hello," "how." Practice by putting your hand in front of your mouth — you should feel air when you say the H.'
            },
            {
              type: 'text',
              heading: 'Spelling Tips for French Speakers',
              body: 'Many English words come from French (because of the Norman invasion in 1066!). This helps you — words like "table," "adventure," "important," and "restaurant" exist in both languages. But be careful: the pronunciation is often very different even when the spelling is similar.\n\n**Faux amis alert:** "Actually" in English means "in reality / really." The French word *actuellement* means "currently / right now." They look the same but mean different things!\n\nAnother helpful tip: English uses the same alphabet as French, but English never uses accent marks (é, è, ê, ë, à, ç, etc.). If you are writing in English and you add an accent, that is a sign you are thinking in French!'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Gift of Written Language',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 119:105',
              reflection: 'God gave humanity the ability to read and write so that His Word could be preserved across centuries and languages. The Bible says, "Your word is a lamp to my feet and a light to my path" (Psalm 119:105). The alphabet — whether French, English, Arabic, or Chinese — is a tool that allows God\'s truth to reach every nation. Learning to read and write in a new language opens another door to understanding God\'s Word and sharing it with others.',
              applicationQuestion: 'How does learning to read English give you access to resources, people, and ideas that can strengthen your faith?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Which English letter sounds were most surprising or different from French? Name at least three.',
                'Why is the /h/ sound challenging for French speakers? How can you practice it?',
                'English has many silent letters. Can you think of three English words with silent letters and three French words with silent letters?'
              ]
            },
            {
              type: 'practice',
              activity: 'Sound Comparison Chart',
              instructions: 'For each pair below, write whether the underlined letter sounds the SAME or DIFFERENT in French and English. Then write the English pronunciation.\n\n1. French: "table" — English: "table"\n2. French: "hôtel" — English: "hotel"\n3. French: "rouge" — English: "rouge"\n4. French: "ami" — English: "army"\n5. French: "radio" — English: "radio"\n\nNext, practice these minimal pairs out loud:\n- "red" (English /r/) vs. "rouge" (French /R/)\n- "hello" (/h/ sound) vs. French "allo" (no /h/)\n- "think" (/th/) vs. "sink" (common French-speaker error)'
            },
            {
              type: 'practice',
              activity: 'Spell It Out',
              instructions: 'Practice spelling these words out loud using English letter names:\n1. YOUR NAME (spell it letter by letter)\n2. HELLO (H-E-L-L-O)\n3. SCHOOL (S-C-H-O-O-L)\n4. FRIEND (F-R-I-E-N-D)\n5. KNIGHT (K-N-I-G-H-T — which letters are silent?)\n\nThen write 5 words that are spelled the same in French and English but pronounced differently.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Phonics Challenge',
              instructions: 'Record yourself (or practice out loud) saying the following:\n1. The full English alphabet (A to Z)\n2. The 5 vowels with one example word each: A (cake), E (me), I (bike), O (go), U (cute)\n3. These tricky words: "house" (not "ouse"), "think" (not "sink"), "red" (not French /R/ed)\n4. Spell your full name using English letter names\n\nWrite a short paragraph (3-4 sentences) about which English sounds are hardest for you and how you plan to practice them.'
            },
            {
              type: 'discussion',
              questions: [
                'Which vowel sound do you find most confusing? Why?',
                'What is one silent-letter word in English that surprised you?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'The Alphabet and English Sounds',
        estimatedMinutes: 45,
        objectives: [
          'Say all 26 letters of the English alphabet.',
          'Identify the five vowels and explain what they are.',
          'Compare key differences between French and English letter sounds.',
          'Practice the /h/ sound and the English /r/ sound.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You already know the French alphabet — and it has the same 26 letters as English! But the sounds are different. In English, the letter H is NOT silent. Can you say "hello" with a real /h/ sound? Put your hand in front of your mouth — do you feel the air?',
              connection: 'French and English share the same alphabet but use different sounds. Learning the differences is the key to good English pronunciation.'
            },
            {
              type: 'reading',
              title: 'The Same Letters, Different Sounds',
              source: 'Original ESL Passage — A1 Level',
              text: 'The English alphabet has 26 letters — the same letters as French! But the sounds are different. The letter H is silent in French, but in English you must say it: "house," "happy," "hello." The letter R sounds different too. In French, R is in your throat. In English, R is made with your tongue curled back. And the letter I is called "ee" in French but "ai" (like "eye") in English. The good news? Many English words come from French, so you already know more English than you think!'
            },
            {
              type: 'text',
              heading: 'English Letters and Sounds',
              body: '**The 26 Letters:** A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\n\n**5 Vowels:** A, E, I, O, U — every word needs at least one.\n\n**Key Differences from French:**\n- **H**: In English, H makes a sound! Say "house" — push air out. NOT "ouse."\n- **R**: English /r/ = curl your tongue back. French /R/ = throat sound. Say "red" with your tongue, not your throat.\n- **I**: In French = /ee/. In English = /ai/ (like "eye").\n- **E**: In French = /uh/. In English = /ee/ (like "see").\n- **W**: French says "double-v." English says "double-u."\n\n**Silent Letters:**\nEnglish has silent letters like French:\n- Silent K: "know," "knife"\n- Silent W: "write," "wrong"\n- Silent GH: "night," "light"\n\n**The /th/ Sound (review):** Tongue between teeth, blow air: "the," "this," "think."'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Gift of Written Language',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 119:105',
              reflection: 'God gave us the ability to read and write. The Bible says, "Your word is a lamp to my feet and a light to my path." Learning a new alphabet of sounds helps you read God\'s Word in another language.',
              applicationQuestion: 'What is one Bible verse you would like to be able to read in English?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are three letters that sound different in English and French?',
                'Why is the /h/ sound hard for French speakers?'
              ]
            },
            {
              type: 'practice',
              activity: 'Letter Sounds Practice',
              instructions: 'Say each word out loud. Focus on the sound in bold:\n\n1. **H**ello — **H**appy — **H**ouse (feel the air on your hand!)\n2. **R**ed — **R**ight — **R**oad (curl your tongue, not your throat)\n3. **Th**e — **Th**is — **Th**ink (tongue between teeth)\n\nNow spell your name out loud using English letter names.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Sound Challenge',
              instructions: 'Write 3 English sounds that are hard for you. For each one, write two practice words.\n\nExample:\n- Sound: /h/ → Words: "hello," "house"\n- Sound: /th/ → Words: "the," "this"\n- Sound: English /r/ → Words: "red," "right"'
            },
            {
              type: 'discussion',
              questions: [
                'Say the alphabet out loud. Which letters feel different from French?',
                'What English word surprised you with a silent letter?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'The Alphabet and English Sounds',
        estimatedMinutes: 35,
        objectives: [
          'Say the 26 English letters.',
          'Know the 5 vowels: A, E, I, O, U.',
          'Practice the /h/ sound and the English /r/ sound.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'The English alphabet has the same letters as French. But some sounds are different. In English, the letter H is NOT silent — you must say it! Can you say "hello" and feel the air?',
              connection: 'Learning the new sounds in English will help you be understood when you speak.'
            },
            {
              type: 'reading',
              title: 'Same Letters, New Sounds',
              source: 'Original ESL Passage — A1 Level',
              text: 'English has 26 letters. French has 26 letters too! But some letters sound different. In English, H makes a sound: "hello," "house." In French, H is silent. The letter R is different too. Practice saying "red" by curling your tongue back. Every English word needs a vowel: A, E, I, O, or U.'
            },
            {
              type: 'text',
              heading: 'Letters and Sounds',
              body: '**26 Letters:** A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\n\n**5 Vowels:** A, E, I, O, U\n\n**Important sounds to practice:**\n- **H**: Say "hello." Push air out of your mouth. Not "ello"!\n- **R**: Curl your tongue back. Say "red." Not the French throat sound.\n- **TH**: Tongue between teeth. Say "the," "this."\n\n**Silent letters:** Some letters are written but not spoken:\n- "know" — the K is silent\n- "write" — the W is silent'
            },
            {
              type: 'biblical-worldview',
              theme: 'Reading and Writing',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 119:105',
              reflection: 'God gave people the ability to read and write. The Bible is written in letters and words. Learning English letters helps you read the Bible in English too.',
              applicationQuestion: 'Can you spell your name in English? Try it!'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is one letter that sounds different in English and French?',
                'Say "hello" and "house." Can you feel the /h/ sound?'
              ]
            },
            {
              type: 'practice',
              activity: 'Say and Spell',
              instructions: 'Say each word. Then spell it out loud:\n\n1. HELLO → H-E-L-L-O\n2. NAME → N-A-M-E\n3. SCHOOL → S-C-H-O-O-L\n\nNow spell YOUR name out loud using English letters.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Practice Page',
              instructions: 'Write the 5 vowels: A, E, I, O, U.\nWrite 3 words that start with H: _____, _____, _____\nWrite your name and spell it out loud.'
            },
            {
              type: 'discussion',
              questions: [
                'Sing or say the alphabet from A to Z. You did it!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'alphabet', definition: 'The set of all letters in a language (A to Z)', example: 'The English alphabet has 26 letters.' },
      { term: 'vowel', definition: 'The letters A, E, I, O, U — every word needs at least one', example: 'The word "cat" has one vowel: A.' },
      { term: 'consonant', definition: 'Any letter that is not a vowel (B, C, D, F, G...)', example: 'The word "stop" has three consonants: S, T, P.' },
      { term: 'silent letter', definition: 'A letter that is written but not pronounced', example: 'The K in "know" is a silent letter.' },
      { term: 'pronunciation', definition: 'The way you say a word or sound', example: 'The pronunciation of "house" starts with the /h/ sound.' },
      { term: 'spell', definition: 'To say or write the letters of a word in order', example: 'Can you spell your name? M-A-R-I-E.' },
      { term: 'syllable', definition: 'A part of a word with one vowel sound', example: '"Hello" has two syllables: hel-lo.' },
      { term: 'phonics', definition: 'The relationship between letters and the sounds they make', example: 'Phonics helps you read new words by sounding them out.' }
    ],
    quiz: [
      { question: 'How many letters are in the English alphabet?', options: ['24', '25', '26', '28'], correctAnswer: 2, explanation: 'The English alphabet has 26 letters, just like French.' },
      { question: 'Which are the five vowels?', options: ['A, B, C, D, E', 'A, E, I, O, U', 'B, C, D, F, G', 'A, E, I, O, Y'], correctAnswer: 1, explanation: 'The five vowels are A, E, I, O, U.' },
      { question: 'In French, the letter H is silent. In English, H is usually...', options: ['Also silent', 'Pronounced (you say it)', 'Only used in writing', 'Replaced by F'], correctAnswer: 1, explanation: 'In English, H is usually pronounced. You must push air out: "house," "hello," "happy."' },
      { question: 'Which word has a silent K?', options: ['King', 'Kite', 'Knee', 'Key'], correctAnswer: 2, explanation: '"Knee" has a silent K — you say /nee/, not /k-nee/.' },
      { question: 'The English /r/ sound is made by...', options: ['Gargling in your throat (like French)', 'Curling your tongue back without touching anything', 'Pressing your lips together', 'Putting your tongue between your teeth'], correctAnswer: 1, explanation: 'The English /r/ is made by curling the tongue back, unlike the French /R/ which is made in the throat.' },
      { question: 'The French word "actuellement" means "currently." The English word "actually" means...', options: ['Currently', 'In reality / really', 'Usually', 'Actively'], correctAnswer: 1, explanation: 'This is a false cognate! "Actually" means "in reality," not "currently."' },
      { question: 'In English, the letter I is pronounced like...', options: ['/ee/ (like French)', '/ai/ (like "eye")', '/oh/', '/uh/'], correctAnswer: 1, explanation: 'In English, the letter I is called /ai/ (like "eye"), not /ee/ like in French.' },
      { question: 'What letter does French call "double-v" but English calls "double-u"?', options: ['V', 'W', 'U', 'M'], correctAnswer: 1, explanation: 'The letter W is called "double-v" in French but "double-u" in English.' },
      { question: 'Which word has a silent GH?', options: ['Ghost', 'Night', 'Goat', 'Green'], correctAnswer: 1, explanation: '"Night" has a silent GH — you say /nait/, not /nig-ht/.' },
      { question: 'Why is English pronunciation harder than French for vowels?', options: ['English has more vowels', 'Each English vowel can make many different sounds', 'English vowels are longer', 'English vowels are always silent'], correctAnswer: 1, explanation: 'English vowels can make many different sounds. For example, A can sound like "ay" (cake), "a" (cat), or "ah" (father).' }
    ]
  },

  // ── W3: Numbers, Days, and Time ──────────────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Numbers, Days, and Time',
        estimatedMinutes: 60,
        objectives: [
          'Count from 1 to 100 in English and recognize number patterns.',
          'Say and spell the days of the week and months of the year in English.',
          'Tell time using both "o\'clock" and "half past / quarter to" formats.',
          'Compare French and English number systems, especially the 70-99 difference.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, 70 is "soixante-dix" (sixty-ten), 80 is "quatre-vingts" (four-twenties), and 97 is "quatre-vingt-dix-sept" (four-twenty-ten-seven). In English, 70 is just "seventy," 80 is "eighty," and 97 is "ninety-seven." Which system makes more sense to you? Why do you think French counts so differently above 69?',
              connection: 'The French number system above 69 comes from an old Celtic base-20 counting system. English uses a simpler base-10 system. Understanding these differences helps you avoid confusion when using numbers in English.'
            },
            {
              type: 'reading',
              title: 'Marie\'s Schedule',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie has a busy week. On Monday, she has English class at nine o\'clock in the morning. On Tuesday, she has math class at ten thirty. On Wednesday, she goes to church at six o\'clock in the evening. On Thursday, she has a science test — she needs to study! On Friday, school ends at three fifteen, and she goes to her friend\'s house. On Saturday, she sleeps until eight o\'clock. On Sunday, she goes to church at eleven o\'clock and then has lunch with her family at twelve thirty. Her favorite day is Saturday because she can rest.'
            },
            {
              type: 'text',
              heading: 'Numbers 1-100',
              body: '**Numbers 1-20:** One, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.\n\n**Pattern for 21-99:** In English, you say the tens number first, then the ones number:\n- 21 = twenty-one, 35 = thirty-five, 48 = forty-eight, 99 = ninety-nine\n\n**The tens:** 10=ten, 20=twenty, 30=thirty, 40=forty, 50=fifty, 60=sixty, 70=seventy, 80=eighty, 90=ninety, 100=one hundred.\n\n**French vs. English numbers — the big difference:**\n- 70: French = soixante-dix (60+10). English = seventy. Simple!\n- 71: French = soixante-et-onze (60+11). English = seventy-one.\n- 80: French = quatre-vingts (4×20). English = eighty.\n- 90: French = quatre-vingt-dix (4×20+10). English = ninety.\n- 99: French = quatre-vingt-dix-neuf (4×20+10+9). English = ninety-nine.\n\nEnglish numbers above 20 are much simpler than French! Every number from 21-99 follows the same pattern: [tens]-[ones].\n\n**Spelling traps:** "Forty" does NOT have a U (it is NOT "fourty"). "Thirteen" and "thirty" sound similar — listen carefully! "Thirteen" = thir-TEEN (stress on -teen). "Thirty" = THIR-ty (stress on thir-).\n\n**Ordinal numbers** (for dates and positions): first (1st), second (2nd), third (3rd), fourth (4th), fifth (5th)... Add "-th" to most numbers. We use ordinals for dates: "March fifteenth" not "March fifteen."'
            },
            {
              type: 'text',
              heading: 'Days, Months, and Telling Time',
              body: '**Days of the Week:** Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.\n- In English, days are ALWAYS capitalized (unlike French: lundi, mardi...).\n- "Wednesday" has a silent D — say "WENZ-day," not "Wed-NES-day."\n- "Tuesday" and "Thursday" both start with "T" — be careful not to mix them up.\n\n**Months:** January, February, March, April, May, June, July, August, September, October, November, December.\n- Also always capitalized in English.\n- "February" is hard to pronounce — say "FEB-roo-air-ee." Many native speakers even skip the first R!\n\n**Telling Time:**\n- **On the hour:** "It is three o\'clock." (The word "o\'clock" comes from "of the clock.")\n- **Half past:** "It is half past three." = 3:30\n- **Quarter past:** "It is quarter past three." = 3:15\n- **Quarter to:** "It is quarter to four." = 3:45\n- **Minutes:** "It is three twenty-five." = 3:25\n\n**French vs. English time:**\n- French uses 24-hour time often (*il est quinze heures* = 15:00). English usually uses 12-hour time with AM (morning) and PM (afternoon/evening).\n- "It is 3 PM" = afternoon. "It is 3 AM" = very early morning.\n\n**Faux ami:** "Journée" in French means "daytime." The English word "journey" means "a trip or travel." Not the same!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Order in Time',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:14',
              reflection: 'God created the sun, moon, and stars to mark "seasons, days, and years" (Genesis 1:14). The seven-day week comes directly from God\'s creation pattern — six days of work and one day of rest. When we learn to talk about time in a new language, we are describing the order that God Himself established. Numbers, days, and seasons all reflect His faithful design.',
              applicationQuestion: 'Why do you think God gave us a pattern of seven days? How does the Sabbath (day of rest) help us trust God?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why is the English number system simpler than French above 69? Which system do you find easier to use?',
                'What is the difference between "thirteen" and "thirty"? How can you hear the difference?',
                'In English, you say "March fifteenth." In French, you say "le quinze mars." What are the differences in word order?'
              ]
            },
            {
              type: 'practice',
              activity: 'Number and Time Exercises',
              instructions: 'A. Write these numbers in English words:\n1. 42 → ___\n2. 71 → ___\n3. 85 → ___\n4. 99 → ___\n5. 100 → ___\n\nB. Write the time in English:\n1. 3:00 → ___\n2. 7:30 → ___\n3. 9:15 → ___\n4. 11:45 → ___\n5. 2:10 → ___\n\nC. Write these dates in English (use ordinal numbers):\n1. March 15 → ___\n2. July 4 → ___\n3. December 25 → ___'
            },
            {
              type: 'practice',
              activity: 'Days and Months Spelling',
              instructions: 'Write all 7 days of the week from memory (remember: capitalize them!):\n1. ___ 2. ___ 3. ___ 4. ___ 5. ___ 6. ___ 7. ___\n\nWrite all 12 months from memory:\n1. ___ 2. ___ 3. ___ ... 12. ___\n\nWhich day has a silent letter? Which month is hardest to spell? Practice writing them 3 times each.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Weekly Schedule',
              instructions: 'Create your own weekly schedule in English. For each day, write at least one activity with the time.\n\nExample:\n"Monday: English class at nine o\'clock in the morning. Soccer at half past four in the afternoon."\n\nInclude all 7 days. Use at least 5 different times. Write at least 10 sentences total.'
            },
            {
              type: 'discussion',
              questions: [
                'Read your schedule to a partner or record it. Did you pronounce the numbers and days correctly?',
                'What is your favorite day of the week? Say it in English and explain why in one sentence.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Numbers, Days, and Time',
        estimatedMinutes: 45,
        objectives: [
          'Count from 1 to 100 in English.',
          'Say the days of the week and months of the year.',
          'Tell time using "o\'clock" and "half past."',
          'Understand why English numbers above 69 are simpler than French.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, 80 is "quatre-vingts" (four-twenties). In English, 80 is just "eighty." Which is simpler? English numbers follow easy patterns once you learn them!',
              connection: 'English numbers above 20 follow a simple pattern: tens + ones. Once you know the tens (twenty, thirty, forty...), you can say any number!'
            },
            {
              type: 'reading',
              title: 'Marie\'s Week',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie has English class on Monday at nine o\'clock. On Wednesday, she goes to church at six o\'clock. On Friday, school ends at three fifteen. On Saturday, she rests. On Sunday, she goes to church at eleven o\'clock. Her favorite day is Saturday.'
            },
            {
              type: 'text',
              heading: 'Numbers, Days, and Time',
              body: '**Numbers 1-20:** One, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.\n\n**The tens:** 20=twenty, 30=thirty, 40=forty, 50=fifty, 60=sixty, 70=seventy, 80=eighty, 90=ninety, 100=one hundred.\n\nPattern: 21=twenty-one, 35=thirty-five, 99=ninety-nine.\n\n**English vs. French:** In English, 70=seventy (not 60+10). 80=eighty (not 4×20). Much simpler!\n\n**Days of the Week** (always capitalized):\nMonday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.\n"Wednesday" = say "WENZ-day" (the D is silent).\n\n**Months** (always capitalized):\nJanuary, February, March, April, May, June, July, August, September, October, November, December.\n\n**Telling Time:**\n- 3:00 = "It is three o\'clock."\n- 3:30 = "It is half past three."\n- 3:15 = "It is quarter past three."\n- 3:45 = "It is quarter to four."\n\n**Faux ami:** "Journée" (French) = "daytime." "Journey" (English) = "a trip." Different meanings!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Order in Time',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:14',
              reflection: 'God created days, seasons, and years (Genesis 1:14). The seven-day week comes from God\'s creation — six days of work and one day of rest. Numbers and time reflect God\'s order.',
              applicationQuestion: 'Why did God give us a day of rest each week?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the pattern for English numbers above 20?',
                'Why are days of the week capitalized in English?'
              ]
            },
            {
              type: 'practice',
              activity: 'Numbers and Time Practice',
              instructions: 'A. Write in English words:\n1. 25 → ___\n2. 70 → ___\n3. 83 → ___\n4. 99 → ___\n\nB. Write the time:\n1. 3:00 → ___\n2. 7:30 → ___\n3. 9:15 → ___\n\nC. Write the 7 days of the week from memory.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Schedule',
              instructions: 'Write your schedule for 3 days. Include the day and time for each activity.\n\nExample: "Monday: School at eight o\'clock. Soccer at four thirty."\n\nWrite at least 6 sentences.'
            },
            {
              type: 'discussion',
              questions: [
                'What is your favorite day of the week? Say it in English.',
                'Count from 70 to 80 in English. Was it easier than French?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Numbers, Days, and Time',
        estimatedMinutes: 35,
        objectives: [
          'Count from 1 to 50 in English.',
          'Say the 7 days of the week.',
          'Tell time using "o\'clock."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, 80 is "quatre-vingts." In English, 80 is just "eighty." English numbers are simpler! Can you count to 20 in English?',
              connection: 'Once you know English number words, you can count anything — money, time, days!'
            },
            {
              type: 'reading',
              title: 'My Week',
              source: 'Original ESL Passage — A1 Level',
              text: 'Monday is the first day of school. Tuesday is day two. Wednesday is day three — say "WENZ-day." Thursday is day four. Friday is day five — the weekend is coming! Saturday and Sunday are the weekend. I like Saturday because I can rest.'
            },
            {
              type: 'text',
              heading: 'Numbers and Days',
              body: '**Numbers 1-10:** One, two, three, four, five, six, seven, eight, nine, ten.\n\n**Numbers 11-20:** Eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.\n\n**Tens:** 20=twenty, 30=thirty, 40=forty, 50=fifty.\n\nPattern: twenty-one (21), twenty-two (22), thirty-five (35).\n\n**Days of the Week:**\nMonday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.\nAlways use a capital letter!\n\n**Telling Time:**\n- 3:00 = "It is three o\'clock."\n- 3:30 = "It is three thirty."\n\n**Remember:** "Wednesday" — the D is silent. Say "WENZ-day."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Days of the Week',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:14',
              reflection: 'God made the week — 7 days. He rested on the seventh day. We follow God\'s pattern of work and rest every week.',
              applicationQuestion: 'What day do you rest? What do you do on that day?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Count from 1 to 20 out loud in English.',
                'What are the 7 days of the week? Say them.'
              ]
            },
            {
              type: 'practice',
              activity: 'Number and Day Practice',
              instructions: 'Write the numbers:\n1. 15 → ___\n2. 20 → ___\n3. 30 → ___\n4. 45 → ___\n\nWrite the days in order:\nMonday, ___, ___, ___, ___, ___, ___\n\nWhat time is it? 8:00 → "It is ___ o\'clock."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My 3 Days',
              instructions: 'Write about 3 days of your week:\n"Monday: School at eight o\'clock."\n"Wednesday: Church at six o\'clock."\n"Saturday: Rest."'
            },
            {
              type: 'discussion',
              questions: [
                'What is your favorite day? Say it in English.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'o\'clock', definition: 'Used to say the time when it is exactly on the hour', example: 'It is three o\'clock.' },
      { term: 'half past', definition: 'Thirty minutes after the hour', example: 'It is half past seven (7:30).' },
      { term: 'quarter', definition: 'Fifteen minutes (one-fourth of an hour)', example: 'It is quarter past nine (9:15).' },
      { term: 'schedule', definition: 'A plan that shows what you do and when', example: 'My schedule says I have English class on Monday.' },
      { term: 'weekend', definition: 'Saturday and Sunday', example: 'I play soccer on the weekend.' },
      { term: 'month', definition: 'One of the 12 parts of the year (January, February, etc.)', example: 'My birthday is in the month of March.' },
      { term: 'ordinal number', definition: 'A number that shows position or order (first, second, third)', example: 'Monday is the first day of the school week.' },
      { term: 'capitalize', definition: 'To write with a capital (big) letter', example: 'Always capitalize days and months: Monday, January.' }
    ],
    quiz: [
      { question: 'How do you say 80 in English?', options: ['Sixty-twenty', 'Four-twenties', 'Eighty', 'Eight-ten'], correctAnswer: 2, explanation: 'In English, 80 is simply "eighty." The French "quatre-vingts" (four-twenties) pattern does not exist in English.' },
      { question: 'What time is "half past three"?', options: ['3:00', '3:15', '3:30', '3:45'], correctAnswer: 2, explanation: '"Half past three" means 3:30 — thirty minutes past three.' },
      { question: 'Which day has a silent D?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], correctAnswer: 2, explanation: '"Wednesday" is pronounced "WENZ-day" — the D is silent.' },
      { question: 'In English, days of the week are always...', options: ['Lowercase', 'Capitalized', 'Abbreviated', 'Written as numbers'], correctAnswer: 1, explanation: 'In English, days of the week always start with a capital letter: Monday, Tuesday, etc.' },
      { question: 'How do you say 99 in English?', options: ['Ninety-nine', 'Four-twenty-nineteen', 'Nine-nine', 'Nine-ty-nine'], correctAnswer: 0, explanation: '99 = "ninety-nine." English follows a simple tens-ones pattern.' },
      { question: 'What does "quarter to four" mean?', options: ['4:00', '4:15', '3:45', '3:30'], correctAnswer: 2, explanation: '"Quarter to four" means 15 minutes before 4:00, which is 3:45.' },
      { question: 'The French "journée" means "daytime." The English "journey" means...', options: ['Daytime', 'A trip or travel', 'A newspaper', 'A day off'], correctAnswer: 1, explanation: 'This is a false cognate! "Journey" means a trip, not daytime.' },
      { question: 'How do you spell 40 in English?', options: ['Fourty', 'Forty', 'Fortey', 'Fourthy'], correctAnswer: 1, explanation: '"Forty" does NOT have a U — it is spelled F-O-R-T-Y, not "fourty."' },
      { question: 'What is the difference between "thirteen" and "thirty"?', options: ['They mean the same thing', 'Thirteen = 13, thirty = 30', 'Thirteen = 30, thirty = 13', 'They are both thirty'], correctAnswer: 1, explanation: 'Thirteen = 13 (thir-TEEN). Thirty = 30 (THIR-ty). Listen for the stress!' },
      { question: 'Which month comes after February?', options: ['January', 'March', 'April', 'May'], correctAnswer: 1, explanation: 'The order is: January, February, March, April...' }
    ]
  },

  // ── W4: My First English Conversation (PROJECT) ──────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'My First English Conversation — Project',
        estimatedMinutes: 60,
        objectives: [
          'Write and perform a complete self-introduction dialogue of 15-20 exchanges.',
          'Use greetings, farewells, numbers, days, and time expressions naturally in conversation.',
          'Demonstrate correct pronunciation of /th/, /h/, and English /r/ sounds.',
          'Compare and contrast French and English conversation patterns in a reflection.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Think about your first day at a new school where nobody speaks French. You need to introduce yourself, ask questions, and make friends — all in English. What words and phrases from Units 1-3 would be most important? How would you start?',
              connection: 'This project brings together everything you have learned about greetings, the alphabet, numbers, and time to create a real conversation.'
            },
            {
              type: 'text',
              heading: 'Project Instructions: My First English Conversation',
              body: '**Your task:** Write and perform a conversation between two people meeting for the first time. The conversation should be 15-20 exchanges (an exchange = one person speaks, the other responds).\n\n**Your conversation must include:**\n1. Greetings (formal or informal)\n2. Introductions (names, where you are from)\n3. At least 3 numbers (age, phone number, address, etc.)\n4. At least 2 days of the week\n5. At least 2 time expressions\n6. A farewell\n\n**Bonus challenge:** Include at least one moment where a French speaker makes a common mistake and the other person gently corrects them. Example:\n- Person A: "I have fifteen years old."\n- Person B: "In English, we say \'I am fifteen years old.\' We use \'am,\' not \'have\'!"\n- Person A: "Oh! I am fifteen years old. Thank you!"\n\n(In French, you say *j\'ai quinze ans* — "I have 15 years." In English, you say "I am 15 years old.")\n\n**Performance:** Practice reading your conversation out loud. Pay special attention to /th/ sounds, /h/ sounds, and English /r/ sounds. Record yourself or perform for the class.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Building Connections',
              framework: 'Grand Narrative',
              scriptureRef: 'Proverbs 18:24',
              reflection: 'Proverbs 18:24 says, "A man of many companions may come to ruin, but there is a friend who sticks closer than a brother." Making new friends in a new language takes courage. God gives us that courage. Every conversation is an opportunity to show kindness and reflect Christ\'s love to others.',
              applicationQuestion: 'How can starting a conversation with someone new be an act of kindness and courage?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are the most important phrases for meeting someone new in English? List at least five.',
                'What common mistakes might a French speaker make in English conversation? (Think about "I have 15 years" vs. "I am 15 years old.")',
                'How is a first-meeting conversation in English different from one in French?'
              ]
            },
            {
              type: 'practice',
              activity: 'Conversation Planning',
              instructions: 'Before writing your full conversation, plan it:\n\n1. Who are the two people? (Names, ages, where they are from)\n2. Where do they meet? (School, church, neighborhood)\n3. What do they talk about? (List the topics in order)\n4. How does the conversation end?\n\nWrite a brief outline, then expand it into the full dialogue.'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My First English Conversation',
              instructions: 'Write your full conversation (15-20 exchanges). Then practice performing it out loud. Record yourself or present to the class.\n\nInclude a short written reflection (3-4 sentences) about:\n- What was easy about writing this conversation?\n- What was hard?\n- What French-English difference was most surprising to you?',
              rubric: [
                { dimension: 'Content Completeness', descriptors: { excellent: 'Includes all required elements: greetings, introductions, 3+ numbers, 2+ days, 2+ times, farewell, and French-English correction moment.', proficient: 'Includes most required elements (missing 1-2).', developing: 'Includes some required elements (missing 3+).', beginning: 'Missing most required elements.' } },
                { dimension: 'Language Accuracy', descriptors: { excellent: 'Sentences are grammatically correct with proper word order. Few or no errors.', proficient: 'Most sentences are correct. Minor errors that do not block understanding.', developing: 'Several grammatical errors. Some sentences hard to understand.', beginning: 'Many errors. Meaning is unclear.' } },
                { dimension: 'Pronunciation (Performance)', descriptors: { excellent: 'Clear pronunciation of /th/, /h/, and /r/ sounds. Natural intonation.', proficient: 'Good pronunciation with minor errors. Mostly understandable.', developing: 'Some pronunciation issues that make understanding difficult.', beginning: 'Pronunciation makes it very hard to understand.' } },
                { dimension: 'Reflection', descriptors: { excellent: 'Thoughtful reflection showing awareness of French-English differences and personal learning.', proficient: 'Reflection addresses the prompts with some detail.', developing: 'Brief reflection with limited detail.', beginning: 'No reflection or reflection does not address the prompts.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'After performing your conversation, what would you change or improve?',
                'What was the hardest English sound to say in your conversation?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'My First English Conversation — Project',
        estimatedMinutes: 45,
        objectives: [
          'Write and perform a self-introduction dialogue of 10-15 exchanges.',
          'Use greetings, numbers, days, and time expressions in conversation.',
          'Practice correct pronunciation of key English sounds.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you are at a new school and you meet someone for the first time. What would you say in English? Let us put together everything you have learned!',
              connection: 'This project combines greetings, numbers, days, and time into one real conversation.'
            },
            {
              type: 'text',
              heading: 'Project Instructions',
              body: '**Your task:** Write a conversation between two people meeting for the first time. Write 10-15 exchanges.\n\n**Include:**\n1. A greeting\n2. Introductions (names, where you are from)\n3. At least 2 numbers\n4. At least 1 day of the week\n5. At least 1 time expression\n6. A farewell\n\n**Example start:**\n- A: "Hello! My name is Sarah. What is your name?"\n- B: "Hi! My name is Pierre. Nice to meet you."\n- A: "Nice to meet you too! How old are you?"\n- B: "I am fourteen years old."\n\n**Remember:** In English, say "I am 14 years old" (not "I have 14 years" like in French).\n\nPractice reading your conversation out loud.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Building Connections',
              framework: 'Grand Narrative',
              scriptureRef: 'Proverbs 18:24',
              reflection: 'The Bible says there is "a friend who sticks closer than a brother." Making friends in a new language takes courage, but God helps us be brave.',
              applicationQuestion: 'How can starting a conversation with someone new show God\'s love?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are the five most important phrases for meeting someone new?',
                'What is one mistake a French speaker might make in English? How can you avoid it?'
              ]
            },
            {
              type: 'practice',
              activity: 'Plan Your Conversation',
              instructions: 'Answer these questions before writing:\n1. What are the names of the two people?\n2. Where do they meet?\n3. What topics will they talk about?\n4. How does the conversation end?'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My First English Conversation',
              instructions: 'Write your full conversation (10-15 exchanges). Practice it out loud. Record or present it.\n\nWrite 2 sentences about what was easy and what was hard.',
              rubric: [
                { dimension: 'Content', descriptors: { excellent: 'Includes all required elements: greeting, introduction, 2+ numbers, 1+ day, 1+ time, farewell.', proficient: 'Includes most elements (missing 1).', developing: 'Missing 2-3 elements.', beginning: 'Missing most elements.' } },
                { dimension: 'Language', descriptors: { excellent: 'Correct grammar and word order. Few errors.', proficient: 'Mostly correct. Minor errors.', developing: 'Several errors but meaning is clear.', beginning: 'Many errors. Hard to understand.' } },
                { dimension: 'Pronunciation', descriptors: { excellent: 'Clear pronunciation. Good effort on /th/, /h/, /r/.', proficient: 'Mostly clear with minor issues.', developing: 'Some pronunciation problems.', beginning: 'Hard to understand.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'What was the hardest part of this project?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'My First English Conversation — Project',
        estimatedMinutes: 35,
        objectives: [
          'Write and practice a short self-introduction dialogue of 8-10 exchanges.',
          'Use basic greetings, your name, age, and one time expression.',
          'Practice saying the dialogue out loud.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You meet a new person at school. What do you say? Let us write a conversation using everything you have learned!',
              connection: 'You know enough English now to have a real conversation. Let us try it!'
            },
            {
              type: 'text',
              heading: 'Project Instructions',
              body: '**Your task:** Write a short conversation between two people. Write 8-10 lines.\n\n**Include:**\n1. Say hello\n2. Say your name\n3. Say your age (I am ___ years old)\n4. Say goodbye\n\n**Example:**\n- A: "Hello! My name is Sarah."\n- B: "Hi! My name is Jean."\n- A: "How old are you?"\n- B: "I am thirteen years old."\n- A: "Nice to meet you!"\n- B: "Nice to meet you too! Goodbye!"\n- A: "Bye! See you on Monday!"\n\n**Remember:** Say "I am 13 years old" (not "I have 13 years").\n\nPractice saying your conversation out loud.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Being Brave',
              framework: 'Grand Narrative',
              scriptureRef: 'Joshua 1:9',
              reflection: 'God says, "Be strong and courageous" (Joshua 1:9). Talking in a new language is brave. God is with you!',
              applicationQuestion: 'How does it feel to speak English? Are you getting braver?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What will the two people in your conversation say?',
                'Practice: "I am ___ years old." Say your age in English.'
              ]
            },
            {
              type: 'practice',
              activity: 'Fill in the Conversation',
              instructions: 'Complete this conversation:\n\nA: "Hello! My name is ___."\nB: "Hi! My name is ___."\nA: "How old are you?"\nB: "I am ___ years old."\nA: "Nice to ___ you!"\nB: "Nice to meet you ___!"\nA: "Bye!"\nB: "___!"'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My First Conversation',
              instructions: 'Write your own conversation (8-10 lines). Use the example to help you. Practice saying it out loud.',
              rubric: [
                { dimension: 'Content', descriptors: { excellent: 'Includes greeting, names, age, and farewell.', proficient: 'Includes most elements.', developing: 'Missing some elements.', beginning: 'Very short or missing key parts.' } },
                { dimension: 'Effort', descriptors: { excellent: 'Practiced out loud. Clear effort.', proficient: 'Some practice.', developing: 'Little practice.', beginning: 'Did not practice.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'Say your conversation out loud. Great job!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'conversation', definition: 'A talk between two or more people', example: 'Marie had a conversation with her new friend.' },
      { term: 'exchange', definition: 'When one person speaks and another responds', example: 'Their conversation had 10 exchanges.' },
      { term: 'dialogue', definition: 'A conversation written down, showing who says what', example: 'We wrote a dialogue for our project.' },
      { term: 'perform', definition: 'To act out or present something in front of others', example: 'We will perform our dialogue for the class.' },
      { term: 'reflection', definition: 'Thinking carefully about what you learned', example: 'In my reflection, I wrote about what was hard and what was easy.' }
    ],
    quiz: []
  }
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 2: MY WORLD (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit2Lessons: EnrichedLesson[] = [
  // ── W1: Family and Friends ───────────────────────────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Family and Friends',
        estimatedMinutes: 60,
        objectives: [
          'Use English family vocabulary (mother, father, brother, sister, etc.) correctly in sentences.',
          'Use possessive adjectives (my, your, his, her, our, their) to describe family relationships.',
          'Compare English and French noun gender systems and understand that English nouns have no grammatical gender.',
          'Describe family members and friends using basic adjectives and possessives.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, a table is feminine (*la* table) and a book is masculine (*le* livre). Every single noun has a gender! In English, things like tables and books have NO gender — only people and animals do. How would this change the way you think about language? Is it easier or harder to have no gender for objects?',
              connection: 'English has no grammatical gender for objects. You never need to remember if something is "le" or "la." You simply use "the" for everything! This is a major simplification for French speakers learning English.'
            },
            {
              type: 'reading',
              title: 'Marie\'s Family',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie has a big family. Her mother\'s name is Claudette. Her father\'s name is Jean. She has two brothers and one sister. Her older brother is Pierre — he is seventeen years old. Her younger brother is Luc — he is ten. Her sister is Sophie — she is twelve, just like Marie. Sophie and Marie are twins! Marie loves her family very much. On Sundays, they all go to church together. After church, they eat a big lunch. Marie\'s grandmother makes the best rice and beans. Marie says, "My family is my blessing."'
            },
            {
              type: 'text',
              heading: 'Family Vocabulary and Possessives',
              body: '**Family Members:**\n- mother (mom/mum), father (dad), parents\n- brother, sister, siblings\n- grandmother (grandma), grandfather (grandpa), grandparents\n- aunt, uncle, cousin\n- son, daughter, children\n- husband, wife\n\n**Possessive Adjectives — Showing Who Owns Something:**\n- **my** = belongs to me → "My name is Marie."\n- **your** = belongs to you → "What is your name?"\n- **his** = belongs to a boy/man → "His name is Pierre."\n- **her** = belongs to a girl/woman → "Her name is Sophie."\n- **our** = belongs to us → "Our family is big."\n- **their** = belongs to them → "Their house is blue."\n- **its** = belongs to a thing or animal → "The dog wagged its tail."\n\n**MAJOR French-English Difference — No Gender for Objects!**\nIn French, every noun is masculine or feminine:\n- *le livre* (masculine) = the book\n- *la table* (feminine) = the table\n- *les livres* (plural) = the books\n\nIn English, there is only ONE article for "the": THE.\n- the book, the table, the books — always "the"!\n- There is no "le" or "la" in English.\n\nFor "a/an":\n- "a" before consonant sounds: a book, a table, a dog\n- "an" before vowel sounds: an apple, an egg, an umbrella\n\n**Possessives match the OWNER, not the object:**\nIn French: *sa table* (her table) uses "sa" because "table" is feminine.\nIn English: "her table" uses "her" because the OWNER is female. The table itself has no gender.\n\nThis is a huge simplification! In English, you just need to know: Is the owner male (his) or female (her)?'
            },
            {
              type: 'text',
              heading: 'Describing Family Members',
              body: 'To describe a family member, use: [Possessive] + [family word] + "is" + [adjective].\n\n"My mother is kind." "Her brother is tall." "Our grandmother is funny."\n\n**Useful adjectives for describing people:**\ntall, short, young, old, kind, funny, smart, strong, quiet, loud, happy, friendly, brave, creative, patient\n\n**Faux ami alert:** In French, *parent* means "relative" (any family member). In English, "parent" specifically means mother or father. Your uncle is a "relative" in English, not a "parent."\n\nAnother faux ami: *gentil* in French means "nice/kind." The English word "gentle" means "soft/calm" — similar but not exactly the same!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Family',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 68:6',
              reflection: 'The Bible says, "God sets the lonely in families" (Psalm 68:6). Family is part of God\'s creation design — from the very first family of Adam and Eve, God intended for people to live in loving relationships. In every culture and every language, family is central to human life. When we describe our families, we are celebrating one of God\'s greatest gifts.',
              applicationQuestion: 'What is one thing you are thankful for about your family? How can you express that gratitude in English?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'In French, possessives (sa, son, ses) match the noun\'s gender. In English, possessives (his, her) match the owner\'s gender. Which system seems easier to you? Why?',
                'Describe two members of your family using possessives: "My ___ is ___."',
                'What does the false cognate "parent" mean in English vs. French?'
              ]
            },
            {
              type: 'practice',
              activity: 'Family Description Exercise',
              instructions: 'A. Fill in the correct possessive adjective (my, your, his, her, our, their):\n1. Marie loves ___ mother. (Marie = she)\n2. Pierre plays with ___ friends. (Pierre = he)\n3. ___ family goes to church on Sundays. (we)\n4. The children love ___ grandparents. (the children = they)\n5. What is ___ name? (you)\n\nB. Translate from French to English (watch for gender differences!):\n1. *Sa sœur est grande.* (talking about Pierre\'s sister) → ___\n2. *Son frère est jeune.* (talking about Marie\'s brother) → ___\n3. *Le livre est sur la table.* → ___\n\nC. Write 4 sentences describing your own family using different possessive adjectives.'
            },
            {
              type: 'practice',
              activity: 'No Gender for Things!',
              instructions: 'In French, you must choose le or la. In English, everything is "the." Translate these into English:\n1. *La maison* → ___\n2. *Le chat* → ___\n3. *Les enfants* → ___\n4. *Une pomme* → ___\n5. *Un stylo* → ___\n\nNow write 3 sentences about objects in your house. Remember: no gender needed!'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Family Paragraph',
              instructions: 'Write a paragraph (8-10 sentences) about your family in English. Include:\n- How many people are in your family\n- The names of at least 3 family members\n- A description of each person (using an adjective)\n- At least 4 different possessive adjectives\n\nExample: "My family has six people. My mother\'s name is Claudette. She is kind and patient. My father is strong and funny. His name is Jean. I have two brothers. Their names are Pierre and Luc..."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your paragraph to a partner. Did you use possessives correctly?',
                'Which family member is hardest to describe in English? Why?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Family and Friends',
        estimatedMinutes: 45,
        objectives: [
          'Use family vocabulary in English sentences.',
          'Use possessive adjectives (my, your, his, her) correctly.',
          'Understand that English nouns have no grammatical gender.',
          'Describe family members with basic adjectives.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, every noun is masculine (*le*) or feminine (*la*). In English, things have no gender — you just say "the" for everything! Does this make English easier?',
              connection: 'English does not have "le" or "la." Just "the." This is one way English is simpler than French.'
            },
            {
              type: 'reading',
              title: 'My Family',
              source: 'Original ESL Passage — A1 Level',
              text: 'My name is Marie. I have a big family. My mother is Claudette. My father is Jean. I have two brothers: Pierre and Luc. I have one sister: Sophie. We go to church on Sundays. I love my family.'
            },
            {
              type: 'text',
              heading: 'Family Words and Possessives',
              body: '**Family:** mother, father, brother, sister, grandmother, grandfather, aunt, uncle, cousin.\n\n**Possessive Adjectives:**\n- **my** = I → "My name is Marie."\n- **your** = you → "Your name is Pierre."\n- **his** = he → "His mother is kind."\n- **her** = she → "Her brother is tall."\n- **our** = we → "Our family is big."\n- **their** = they → "Their house is nice."\n\n**No Gender for Things!**\nFrench: *le livre, la table* (masculine/feminine)\nEnglish: the book, the table — just "the"!\n\n**English possessives match the OWNER:**\nFrench: *sa table* (uses "sa" because table is feminine)\nEnglish: "his table" or "her table" (depends on the OWNER, not the table)\n\n**Faux ami:** French *parent* = relative. English "parent" = mother or father only.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Family',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 68:6',
              reflection: 'God says He "sets the lonely in families." Family is one of God\'s greatest gifts. When we talk about our families, we celebrate what God has given us.',
              applicationQuestion: 'What is one thing you are thankful for about your family?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What possessive adjective do you use for a boy? For a girl?',
                'Why does English NOT have "le" or "la"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Possessives Practice',
              instructions: 'Fill in my, your, his, her, our, or their:\n1. Marie loves ___ mother.\n2. Pierre plays with ___ friends.\n3. ___ family is big. (we)\n4. What is ___ name? (you)\n\nWrite 3 sentences about your family using possessives.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'About My Family',
              instructions: 'Write 5-6 sentences about your family:\n- How many people?\n- Names of family members\n- Describe one person with an adjective\n\nExample: "My family has five people. My mother is kind. My brother is funny."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences. Did you use "my," "his," or "her" correctly?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Family and Friends',
        estimatedMinutes: 35,
        objectives: [
          'Say family words in English: mother, father, brother, sister.',
          'Use "my" to talk about your family.',
          'Know that English does not use "le" or "la."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you say "la table" and "le livre." In English, you just say "the table" and "the book." Easier, right?',
              connection: 'English does not use "le" or "la." It just uses "the" for everything!'
            },
            {
              type: 'reading',
              title: 'My Family',
              source: 'Original ESL Passage — A1 Level',
              text: 'My name is Marie. My mother is Claudette. My father is Jean. My brother is Pierre. My sister is Sophie. I love my family.'
            },
            {
              type: 'text',
              heading: 'Family Words',
              body: '**Family:**\n- mother (mom) = *mère*\n- father (dad) = *père*\n- brother = *frère*\n- sister = *sœur*\n- grandmother = *grand-mère*\n- grandfather = *grand-père*\n\n**Use "my":**\n- "My mother is kind."\n- "My brother is tall."\n\n**No "le" or "la"!**\nFrench: *la maison*\nEnglish: the house\nJust use "the" for everything!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Family',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 68:6',
              reflection: 'God gives us families. Family is a gift from God. We can thank God for our mothers, fathers, brothers, and sisters.',
              applicationQuestion: 'Who is in your family? Thank God for them!'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you say "mother" in English?',
                'Say: "My mother is ___." (add a word that describes her)'
              ]
            },
            {
              type: 'practice',
              activity: 'Family Words',
              instructions: 'Match the French and English:\n1. mère → ___\n2. père → ___\n3. frère → ___\n4. sœur → ___\n\nComplete: "My ___ is ___." (family member + description)'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Family',
              instructions: 'Write 3-4 sentences about your family:\n"My mother is ___."\n"My father is ___."\n"My brother/sister is ___."\n"I love my family."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences out loud. Good job!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'family', definition: 'The people who are related to you (mother, father, siblings)', example: 'My family has five people.' },
      { term: 'possessive', definition: 'A word that shows something belongs to someone (my, your, his, her)', example: '"My" is a possessive adjective — it shows something is mine.' },
      { term: 'sibling', definition: 'A brother or sister', example: 'I have two siblings: one brother and one sister.' },
      { term: 'relative', definition: 'Any member of your family (uncle, aunt, cousin, grandparent)', example: 'My uncle is a relative who lives in Canada.' },
      { term: 'describe', definition: 'To tell what someone or something is like', example: 'Can you describe your mother? She is kind and funny.' },
      { term: 'adjective', definition: 'A word that describes a noun (tall, kind, funny, old)', example: '"Tall" is an adjective. My brother is tall.' },
      { term: 'gender (grammar)', definition: 'In French, nouns are masculine or feminine. English nouns have no grammatical gender.', example: 'French: "la table" (feminine). English: "the table" (no gender).' }
    ],
    quiz: [
      { question: 'What is the possessive adjective for "she"?', options: ['His', 'Her', 'My', 'Their'], correctAnswer: 1, explanation: '"Her" is the possessive for "she." Example: "Her name is Marie."' },
      { question: 'In English, how do you say "la table"?', options: ['La table', 'Le table', 'The table', 'A table'], correctAnswer: 2, explanation: 'English uses "the" for all nouns — no "le" or "la."' },
      { question: 'In French, "parent" means any relative. In English, "parent" means...', options: ['Any relative', 'Mother or father only', 'Brother or sister', 'Grandparent'], correctAnswer: 1, explanation: 'In English, "parent" means specifically mother or father.' },
      { question: 'Which sentence is correct?', options: ['"My mother is kind."', '"My mother is kinde."', '"Kind is my mother."', '"Mother my is kind."'], correctAnswer: 0, explanation: 'The correct English order is: possessive + noun + "is" + adjective.' },
      { question: '"His brother is tall." Who is tall?', options: ['A girl\'s brother', 'A boy\'s brother', 'My brother', 'Your brother'], correctAnswer: 1, explanation: '"His" means belonging to a boy/man. So "his brother" is a boy\'s brother.' },
      { question: 'In English, possessive adjectives match...', options: ['The noun\'s gender', 'The owner\'s gender', 'The sentence length', 'Nothing — they are random'], correctAnswer: 1, explanation: 'English possessives match the OWNER. "His" for male owners, "her" for female owners.' },
      { question: 'What is a "sibling"?', options: ['A parent', 'A cousin', 'A brother or sister', 'A grandparent'], correctAnswer: 2, explanation: 'A sibling is a brother or sister.' },
      { question: 'Which word means "grandmother"?', options: ['Grandma', 'Aunt', 'Cousin', 'Sister'], correctAnswer: 0, explanation: '"Grandma" is an informal word for grandmother.' },
      { question: '"Our family is big." What does "our" mean?', options: ['Belonging to me', 'Belonging to you', 'Belonging to us', 'Belonging to them'], correctAnswer: 2, explanation: '"Our" means belonging to us (me and other people).' },
      { question: 'The French word "gentil" means "nice." The English word "gentle" means...', options: ['Nice', 'Soft and calm', 'Angry', 'Fast'], correctAnswer: 1, explanation: '"Gentil" (French) = nice. "Gentle" (English) = soft/calm. They are similar but not exactly the same — a false cognate.' }
    ]
  },

  // ── W2: My Home and Classroom ────────────────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'My Home and Classroom',
        estimatedMinutes: 60,
        objectives: [
          'Name rooms, furniture, and common objects in the home and classroom.',
          'Use prepositions of place (in, on, under, next to, between, behind, in front of) correctly.',
          'Construct sentences with "there is" (singular) and "there are" (plural).',
          'Compare English and French preposition usage and recognize differences in structure.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you say "sur la table" (on the table), "sous la chaise" (under the chair), "devant la porte" (in front of the door). English prepositions are similar — "on," "under," "in front of" — but sometimes they work differently. For example, French says "à la maison" (at the house), but English says "at home" with no "the." Why do some prepositions translate directly and others do not?',
              connection: 'Prepositions are some of the trickiest words in any language because they often do not translate directly. Learning them through practice and examples is more effective than memorizing rules.'
            },
            {
              type: 'reading',
              title: 'Marie\'s New Room',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie has a new room in her house. There is a bed next to the window. There is a desk in the corner. On the desk, there is a lamp and some books. Under the bed, there is a box with her toys. There are two posters on the wall — one of a sunset and one with a Bible verse. There is a chair in front of the desk. Her backpack is behind the door. Marie says, "I love my room. It is small, but it is mine." In her classroom at school, there are twenty desks. There is a whiteboard on the wall. The teacher\'s desk is in front of the class. Marie sits between her friends Sarah and Luc.'
            },
            {
              type: 'text',
              heading: 'Rooms, Furniture, and Objects',
              body: '**Rooms in a House:**\n- bedroom (where you sleep), bathroom (where you wash), kitchen (where you cook)\n- living room / sitting room (where the family gathers), dining room (where you eat)\n- garage (where the car is), yard / garden (outside area)\n\n**Furniture and Objects:**\n- bed, desk, chair, table, couch/sofa, lamp, bookshelf, dresser/wardrobe\n- door, window, wall, floor, ceiling, stairs\n\n**Classroom Objects:**\n- desk, chair, whiteboard/blackboard, book, notebook, pen, pencil, eraser\n- backpack, ruler, calculator, computer\n\n**Prepositions of Place:**\n- **in** = inside something → "The book is in the bag."\n- **on** = touching the surface of something → "The lamp is on the desk."\n- **under** = below something → "The cat is under the table."\n- **next to** = beside something → "The bed is next to the window."\n- **between** = in the middle of two things → "Marie sits between Sarah and Luc."\n- **behind** = at the back of something → "The backpack is behind the door."\n- **in front of** = facing the front of something → "The teacher is in front of the class."\n- **above** = higher than something → "The clock is above the door."\n\n**"There is" and "There are":**\n- "There is" = one thing (singular) → "There is a book on the table."\n- "There are" = more than one (plural) → "There are three chairs in the room."\n\n**French comparison:**\n- French: *Il y a un livre sur la table.* (literally: "it there has a book on the table")\n- English: "There is a book on the table."\n- French uses the same *il y a* for singular and plural. English changes: "there is" (one) / "there are" (many).\n\n**Faux ami:** The French word *librairie* means "bookstore." The English word "library" means a place where you borrow books (not buy them). A bookstore in English is called a "bookstore" or "bookshop."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Home and Belonging',
              framework: 'Grand Narrative',
              scriptureRef: 'John 14:2',
              reflection: 'Jesus said, "In my Father\'s house are many rooms. I am going there to prepare a place for you" (John 14:2). God cares about where we live and promises us an eternal home with Him. Our earthly homes — whether large or small — are gifts from God. Learning to describe our homes in a new language helps us share our lives with others and express gratitude for what God has provided.',
              applicationQuestion: 'What room in your home is most special to you? Why? How does it feel to know that God is preparing an eternal home for you?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "there is" and "there are"? Why does French only use one form (*il y a*)?',
                'Describe where three objects are in your room using prepositions.',
                'What does the French word "librairie" mean? What is the English false cognate?'
              ]
            },
            {
              type: 'practice',
              activity: 'Preposition Practice',
              instructions: 'A. Look at your room (or imagine it). Write 6 sentences using different prepositions:\n1. The ___ is in ___.\n2. The ___ is on ___.\n3. The ___ is under ___.\n4. The ___ is next to ___.\n5. The ___ is behind ___.\n6. The ___ is in front of ___.\n\nB. Fill in "there is" or "there are":\n1. ___ a bed in my room.\n2. ___ three windows in the classroom.\n3. ___ a whiteboard on the wall.\n4. ___ twenty desks in our class.\n5. ___ a lamp on my desk.'
            },
            {
              type: 'practice',
              activity: 'Room Label Challenge',
              instructions: 'Draw a simple picture of a room (bedroom or classroom). Label at least 8 objects in English. Then write 4 sentences describing where things are, using different prepositions each time.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Describe a Room',
              instructions: 'Write a paragraph (8-10 sentences) describing either your bedroom or your classroom. Use:\n- At least 5 different prepositions\n- "There is" and "there are" at least 3 times\n- At least 8 vocabulary words from this lesson\n\nExample: "My bedroom is small but nice. There is a bed next to the window. There are two pillows on the bed..."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your description to a partner. Can they draw the room based on what you said?',
                'What preposition was hardest to use correctly? Why?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'My Home and Classroom',
        estimatedMinutes: 45,
        objectives: [
          'Name rooms and objects in a home and classroom.',
          'Use prepositions of place (in, on, under, next to, behind, in front of).',
          'Use "there is" and "there are" in sentences.',
          'Compare French "il y a" with English "there is/there are."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Look around your room right now. Can you name 5 things in English? Where are they? What is on the desk? What is under the bed?',
              connection: 'Describing where things are is one of the most useful skills in a new language. Prepositions help you give and understand directions.'
            },
            {
              type: 'reading',
              title: 'My Room',
              source: 'Original ESL Passage — A1 Level',
              text: 'There is a bed in my room. There is a desk next to the bed. On the desk, there is a lamp. Under the bed, there is a box. There are two posters on the wall. I like my room.'
            },
            {
              type: 'text',
              heading: 'Home, Classroom, and Prepositions',
              body: '**Rooms:** bedroom, bathroom, kitchen, living room, dining room.\n\n**Objects:** bed, desk, chair, table, lamp, bookshelf, window, door, wall.\n\n**Classroom:** desk, whiteboard, book, notebook, pen, pencil, backpack.\n\n**Prepositions of Place:**\n- **in** = inside → "The book is in the bag."\n- **on** = on top of → "The lamp is on the desk."\n- **under** = below → "The cat is under the table."\n- **next to** = beside → "The bed is next to the window."\n- **behind** = at the back → "The bag is behind the door."\n- **in front of** = at the front → "The teacher is in front of the class."\n\n**"There is" / "There are":**\n- There is = one thing → "There is a book on the table."\n- There are = many things → "There are three chairs."\n\nFrench uses *il y a* for both. English changes!\n\n**Faux ami:** *Librairie* (French) = bookstore. "Library" (English) = place to borrow books.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Home',
              framework: 'Grand Narrative',
              scriptureRef: 'John 14:2',
              reflection: 'Jesus said, "In my Father\'s house are many rooms." God cares about our homes and has prepared an eternal home for us.',
              applicationQuestion: 'What do you like most about your home?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "there is" and "there are"?',
                'Describe 2 things in your room using prepositions.'
              ]
            },
            {
              type: 'practice',
              activity: 'Preposition Sentences',
              instructions: 'Fill in the correct preposition (in, on, under, next to, behind):\n1. The book is ___ the desk.\n2. The cat is ___ the bed.\n3. The chair is ___ the desk.\n4. The bag is ___ the door.\n\nWrite 3 sentences about your room using prepositions.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Room Description',
              instructions: 'Write 5-6 sentences about your room or classroom. Use "there is," "there are," and at least 3 prepositions.\n\nExample: "There is a bed in my room. The lamp is on the desk. My bag is under the chair."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your description. Did you use different prepositions?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'My Home and Classroom',
        estimatedMinutes: 35,
        objectives: [
          'Name 5 rooms and 5 objects in English.',
          'Use "in," "on," and "under" to say where things are.',
          'Say "there is" for one thing and "there are" for many things.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Look at the room you are in. Can you name 3 things in English? Where are they?',
              connection: 'Knowing the names of things around you helps you talk about your world in English.'
            },
            {
              type: 'reading',
              title: 'My Room',
              source: 'Original ESL Passage — A1 Level',
              text: 'There is a bed in my room. The lamp is on the desk. My bag is under the chair. I like my room.'
            },
            {
              type: 'text',
              heading: 'Rooms and Things',
              body: '**Rooms:** bedroom, bathroom, kitchen.\n\n**Things:** bed, desk, chair, table, lamp, door, window.\n\n**Where are things?**\n- **in** = inside → "The book is in the bag."\n- **on** = on top → "The lamp is on the desk."\n- **under** = below → "The cat is under the table."\n\n**There is / There are:**\n- "There is a bed." (one thing)\n- "There are two chairs." (more than one)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Home',
              framework: 'Grand Narrative',
              scriptureRef: 'John 14:2',
              reflection: 'Jesus said He is preparing a home for us in heaven. Our homes on earth are gifts from God too.',
              applicationQuestion: 'What room do you like best in your home?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is on your desk right now? Say it in English.',
                'What is under your bed?'
              ]
            },
            {
              type: 'practice',
              activity: 'Where Is It?',
              instructions: 'Fill in "in," "on," or "under":\n1. The book is ___ the desk.\n2. The cat is ___ the bed.\n3. The pen is ___ the bag.\n\nWrite 2 sentences about your room.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Room',
              instructions: 'Write 3 sentences about your room:\n"There is a ___ in my room."\n"The ___ is on the ___."\n"The ___ is under the ___."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences out loud!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'preposition', definition: 'A word that shows where something is (in, on, under, next to)', example: '"On" is a preposition: "The book is on the table."' },
      { term: 'furniture', definition: 'Things like tables, chairs, beds, and desks in a room', example: 'The furniture in my room includes a bed and a desk.' },
      { term: 'bedroom', definition: 'The room where you sleep', example: 'My bedroom has a big window.' },
      { term: 'classroom', definition: 'The room where you learn at school', example: 'There are twenty desks in our classroom.' },
      { term: 'between', definition: 'In the middle of two things', example: 'I sit between Sarah and Luc.' },
      { term: 'behind', definition: 'At the back of something', example: 'My backpack is behind the door.' },
      { term: 'library', definition: 'A place where you borrow books (not a bookstore!)', example: 'I go to the library every week to borrow books.' },
      { term: 'corner', definition: 'The place where two walls meet', example: 'The desk is in the corner of the room.' }
    ],
    quiz: [
      { question: 'Which sentence is correct?', options: ['"There is three books."', '"There are three books."', '"There are a book."', '"There is books."'], correctAnswer: 1, explanation: 'Use "there are" for plural (more than one): "There are three books."' },
      { question: 'The book is ___ the table (on top of it).', options: ['in', 'on', 'under', 'behind'], correctAnswer: 1, explanation: '"On" means on top of or touching the surface of something.' },
      { question: 'The cat is ___ the bed (below it).', options: ['on', 'in', 'under', 'next to'], correctAnswer: 2, explanation: '"Under" means below something.' },
      { question: 'The French word "librairie" means "bookstore." What does the English word "library" mean?', options: ['Bookstore', 'A place to borrow books', 'A school', 'A bedroom'], correctAnswer: 1, explanation: '"Library" (English) = a place to borrow books. "Librairie" (French) = bookstore. False cognate!' },
      { question: 'Which word means "the room where you cook"?', options: ['Bedroom', 'Bathroom', 'Kitchen', 'Living room'], correctAnswer: 2, explanation: 'The kitchen is the room where you cook.' },
      { question: '"Marie sits ___ Sarah and Luc." (in the middle)', options: ['behind', 'next to', 'between', 'under'], correctAnswer: 2, explanation: '"Between" means in the middle of two things.' },
      { question: 'In French, "il y a" is used for one thing AND many things. In English...', options: ['You also use one form for both', 'You use "there is" for one and "there are" for many', 'You use "here is" and "here are"', 'You do not need "there is" at all'], correctAnswer: 1, explanation: 'English uses "there is" for singular and "there are" for plural, unlike French "il y a."' },
      { question: 'Which is a classroom object?', options: ['Pillow', 'Sofa', 'Whiteboard', 'Bathtub'], correctAnswer: 2, explanation: 'A whiteboard is found in a classroom.' },
      { question: '"The bag is ___ the door." (at the back of the door)', options: ['on', 'in', 'in front of', 'behind'], correctAnswer: 3, explanation: '"Behind" means at the back of something.' },
      { question: 'Which sentence describes something IN FRONT OF?', options: ['"The lamp is on the desk."', '"The teacher stands in front of the class."', '"The box is under the bed."', '"The pen is in the bag."'], correctAnswer: 1, explanation: '"In front of" means facing the front of something. The teacher stands at the front of the class.' }
    ]
  },

  // ── W3: Colors, Shapes, and Descriptions ─────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Colors, Shapes, and Descriptions',
        estimatedMinutes: 60,
        objectives: [
          'Name colors and basic shapes in English.',
          'Use adjectives to describe people, places, and things.',
          'Place adjectives BEFORE the noun (unlike French, which places most adjectives after the noun).',
          'Construct descriptive sentences using multiple adjectives in correct English order.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you say "une maison blanche" (a house white). In English, you say "a white house." The adjective moves from AFTER the noun to BEFORE the noun! Why do you think different languages put the describing word in different places? Does it change the meaning?',
              connection: 'Adjective placement is one of the biggest grammar differences between French and English. In English, adjectives almost always come BEFORE the noun they describe. Mastering this will make your English sound natural.'
            },
            {
              type: 'reading',
              title: 'A Beautiful Day',
              source: 'Original ESL Passage — A1 Level',
              text: 'It is a beautiful day. The sky is bright blue. There are big white clouds. Marie walks to school with her red backpack. She sees a tall tree with green leaves. In her classroom, there is a new brown desk and a round yellow clock on the wall. Her teacher wears a long black dress. Marie looks out the small square window. She thinks, "The world is full of beautiful colors. God made everything so wonderful."'
            },
            {
              type: 'text',
              heading: 'Colors, Shapes, and Adjective Placement',
              body: '**Colors:** red, blue, green, yellow, orange, purple, pink, brown, black, white, gray/grey.\n\n**Shapes:** circle (round), square, triangle, rectangle, oval, star, diamond, heart.\n\n**Basic Adjectives:**\n- Size: big, small, tall, short, long, wide, tiny, huge\n- Appearance: beautiful, ugly, clean, dirty, new, old\n- Feeling: happy, sad, angry, tired, excited, nervous\n- Quality: good, bad, fast, slow, hot, cold, easy, hard\n\n**THE BIG RULE: Adjectives Come BEFORE the Noun in English!**\n\nFrench: *une maison blanche* (a house white)\nEnglish: a white house\n\nFrench: *un livre intéressant* (a book interesting)\nEnglish: an interesting book\n\nFrench: *une grande ville* (a big city) — some French adjectives go before!\nEnglish: a big city\n\nIn English, adjectives ALWAYS go before the noun: a [adjective] [noun].\n- a red car (not "a car red")\n- a tall tree (not "a tree tall")\n- a beautiful day (not "a day beautiful")\n\n**Multiple Adjectives — English has an order!**\nWhen you use more than one adjective, English has a natural order:\nOpinion → Size → Age → Shape → Color → Material\n- "a beautiful big old round brown wooden table"\n- "a nice small new red backpack"\n\nYou do not need to memorize this perfectly — native speakers learn it by hearing. But the most important rule is: opinion words come first, then facts.\n\n**Adjectives do NOT change for plural in English!**\nFrench: *les maisons blanches* (adjective becomes plural too)\nEnglish: "the white houses" — "white" stays the same!\n\nFrench: *les grands arbres* (adjective matches plural)\nEnglish: "the tall trees" — "tall" never changes!'
            },
            {
              type: 'text',
              heading: 'Using Adjectives in Sentences',
              body: 'There are two main ways to use adjectives in English:\n\n**1. Before the noun:** "She has a red backpack." / "It is a beautiful day."\n\n**2. After "is/are":** "The sky is blue." / "The flowers are beautiful."\n\nBoth are correct! But remember: never put an adjective AFTER the noun in the first pattern.\n- CORRECT: "a tall tree"\n- WRONG: "a tree tall" (this is the French pattern!)\n\n**Faux ami alert:** The French word *large* means "wide." The English word "large" means "big." So *une large rue* = "a wide street," but in English "a large street" means "a big street." Close but not exactly the same!'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Beauty of Creation',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:31',
              reflection: 'When God finished creating the world, He looked at everything and said, "It was very good" (Genesis 1:31). The colors of a sunset, the shapes of mountains and leaves, the beauty of flowers — all of these reflect God\'s creative nature. When we learn words to describe the beauty around us, we are learning to praise God\'s artistry. Every red rose, blue sky, and green forest declares the glory of God (Psalm 19:1).',
              applicationQuestion: 'What is the most beautiful thing you have ever seen in nature? How would you describe it in English?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the biggest difference between adjective placement in French and English? Give an example in both languages.',
                'In English, adjectives do not change for plural. Why might this make English easier than French?',
                'What does the French word "large" mean? How is it different from the English "large"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Adjective Placement Practice',
              instructions: 'A. Fix these sentences (they follow French word order — change them to English):\n1. "I have a car blue." → ___\n2. "She lives in a house beautiful." → ___\n3. "He wears a shirt green." → ___\n4. "We have a teacher new." → ___\n5. "There is a book interesting on the table." → ___\n\nB. Describe each item with TWO adjectives (put them before the noun):\n1. A ___ ___ flower (color + size)\n2. A ___ ___ building (size + color)\n3. A ___ ___ book (quality + age)\n\nC. Translate from French to English:\n1. *Les chaises rouges* → ___\n2. *Un petit garçon intelligent* → ___\n3. *Une jolie robe bleue* → ___'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Descriptive Paragraph',
              instructions: 'Write a paragraph (8-10 sentences) describing your classroom, your room, or a place you love. Use:\n- At least 5 colors\n- At least 3 shapes\n- At least 8 different adjectives\n- All adjectives placed BEFORE the noun\n\nExample: "My classroom is a large bright room. There are twenty brown desks and a big white whiteboard. The teacher has a round wooden clock on the wall..."'
            },
            {
              type: 'discussion',
              questions: [
                'Did you accidentally put any adjectives after the noun (the French way)? Check and correct!',
                'What is the most colorful thing in the room you described?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Colors, Shapes, and Descriptions',
        estimatedMinutes: 45,
        objectives: [
          'Name colors and basic shapes in English.',
          'Use adjectives to describe things.',
          'Place adjectives BEFORE the noun (not after, like French).',
          'Know that English adjectives do not change for plural.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you say "une maison blanche" — adjective AFTER the noun. In English, you say "a white house" — adjective BEFORE the noun. Which way feels more natural to you?',
              connection: 'In English, describing words always come before the thing they describe. This is the opposite of French most of the time.'
            },
            {
              type: 'reading',
              title: 'A Colorful Room',
              source: 'Original ESL Passage — A1 Level',
              text: 'My room has many colors. There is a blue bed and a white desk. There is a round yellow clock on the wall. My backpack is red. The floor is brown. I have a small green plant by the window. I love my colorful room!'
            },
            {
              type: 'text',
              heading: 'Colors, Shapes, and Adjectives',
              body: '**Colors:** red, blue, green, yellow, orange, purple, pink, brown, black, white, gray.\n\n**Shapes:** circle/round, square, triangle, rectangle.\n\n**Adjectives (describing words):** big, small, tall, short, new, old, beautiful, happy, sad, fast, slow.\n\n**The Big Rule: Adjective BEFORE Noun!**\nFrench: "une maison blanche" (house white)\nEnglish: "a white house" (white house) ✓\n\n- "a red car" ✓ (NOT "a car red" ✗)\n- "a tall tree" ✓ (NOT "a tree tall" ✗)\n\n**Adjectives don\'t change for plural!**\nFrench: *les maisons blanches* (adjective changes)\nEnglish: "the white houses" ("white" stays the same)\n\n**Faux ami:** French *large* = "wide." English "large" = "big."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Creation\'s Beauty',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:31',
              reflection: 'God looked at everything He made and said, "It was very good." Colors, shapes, and beauty in nature all show God\'s creativity.',
              applicationQuestion: 'What is your favorite color? Where do you see it in God\'s creation?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Where does the adjective go in English — before or after the noun?',
                'In English, do adjectives change for plural? What about French?'
              ]
            },
            {
              type: 'practice',
              activity: 'Fix the Sentences',
              instructions: 'These sentences use French word order. Fix them for English:\n1. "I have a car blue." → ___\n2. "She has a dress beautiful." → ___\n3. "There is a building tall." → ___\n\nNow write 3 sentences describing things in your room. Put the adjective before the noun!'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Describe Your Space',
              instructions: 'Write 5-6 sentences describing your room or classroom. Use at least 3 colors and 3 other adjectives. Remember: adjective BEFORE noun!\n\nExample: "There is a big brown desk. I have a small red chair."'
            },
            {
              type: 'discussion',
              questions: [
                'Check your sentences — did all adjectives come BEFORE the noun?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Colors, Shapes, and Descriptions',
        estimatedMinutes: 35,
        objectives: [
          'Name 8 colors in English.',
          'Use adjectives like big, small, and colors to describe things.',
          'Put describing words BEFORE the thing they describe.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French: "une maison blanche." In English: "a white house." The describing word moves! In English, the color comes first.',
              connection: 'In English, always say the describing word first: "a red car," "a big house," "a small dog."'
            },
            {
              type: 'reading',
              title: 'My Colorful Room',
              source: 'Original ESL Passage — A1 Level',
              text: 'My room has colors. The bed is blue. The desk is brown. I have a red backpack. There is a small green plant. I like colors!'
            },
            {
              type: 'text',
              heading: 'Colors and Describing Words',
              body: '**Colors:** red, blue, green, yellow, orange, purple, pink, brown, black, white.\n\n**Describing words:** big, small, new, old, tall, short, beautiful.\n\n**Remember:** Adjective BEFORE noun!\n- "a red car" ✓\n- "a car red" ✗ (French way — not English!)\n- "a big house" ✓\n- "a house big" ✗'
            },
            {
              type: 'biblical-worldview',
              theme: 'Colors in Creation',
              framework: 'Grand Narrative',
              scriptureRef: 'Genesis 1:31',
              reflection: 'God made everything beautiful. Red flowers, blue sky, green trees — God loves colors!',
              applicationQuestion: 'What is your favorite color? Where do you see it in nature?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Name 5 colors in English.',
                'Say: "a big ___ house." What color?'
              ]
            },
            {
              type: 'practice',
              activity: 'Color and Describe',
              instructions: 'Complete:\n1. I have a ___ backpack. (color)\n2. There is a ___ desk. (size)\n3. The ___ tree is outside. (size)\n\nDraw something and label it with a color and a describing word.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Describe 3 Things',
              instructions: 'Write 3 sentences. Use a color or describing word BEFORE the noun:\n1. "I have a ___ ___."\n2. "There is a ___ ___."\n3. "My ___ is ___."\n\nExample: "I have a red backpack."'
            },
            {
              type: 'discussion',
              questions: [
                'Point to something and say its color in English.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'adjective', definition: 'A word that describes a noun (red, big, beautiful)', example: '"Tall" is an adjective: "a tall tree."' },
      { term: 'describe', definition: 'To tell what something looks like or is like', example: 'Can you describe the picture? It is a big blue circle.' },
      { term: 'shape', definition: 'The form of something: circle, square, triangle, rectangle', example: 'The clock has a round shape — it is a circle.' },
      { term: 'bright', definition: 'Very strong or vivid (for colors or light)', example: 'The sun is bright yellow.' },
      { term: 'huge', definition: 'Very, very big', example: 'The building is huge — it has 50 floors!' },
      { term: 'tiny', definition: 'Very, very small', example: 'An ant is a tiny insect.' },
      { term: 'colorful', definition: 'Having many colors', example: 'The garden is colorful — it has red, yellow, and purple flowers.' }
    ],
    quiz: [
      { question: 'In English, adjectives go...', options: ['After the noun', 'Before the noun', 'At the end of the sentence', 'Nowhere specific'], correctAnswer: 1, explanation: 'In English, adjectives go BEFORE the noun: "a red car," not "a car red."' },
      { question: 'Which sentence is correct in English?', options: ['"I have a car blue."', '"I have a blue car."', '"Blue a car I have."', '"Car blue a I have."'], correctAnswer: 1, explanation: 'In English, the adjective (blue) comes before the noun (car).' },
      { question: 'In English, adjectives for plural nouns...', options: ['Add -s', 'Add -es', 'Do not change', 'Get removed'], correctAnswer: 2, explanation: 'English adjectives never change for plural: "the red cars" not "the reds cars."' },
      { question: 'What color is the sky on a clear day?', options: ['Red', 'Green', 'Blue', 'Brown'], correctAnswer: 2, explanation: 'The sky is usually blue on a clear day.' },
      { question: 'The French word "large" means...', options: ['Big', 'Wide', 'Long', 'Small'], correctAnswer: 1, explanation: 'French "large" means "wide." English "large" means "big." They are false cognates!' },
      { question: 'Which is a shape?', options: ['Red', 'Happy', 'Triangle', 'Tall'], correctAnswer: 2, explanation: 'A triangle is a shape with three sides. The other options are adjectives describing color, feeling, or size.' },
      { question: 'Choose the correct translation of "une grande maison blanche":', options: ['"A house big white"', '"A white big house"', '"A big white house"', '"A big house white"'], correctAnswer: 2, explanation: 'In English: adjectives before the noun, size before color: "a big white house."' },
      { question: 'What does "tiny" mean?', options: ['Very big', 'Very small', 'Very fast', 'Very old'], correctAnswer: 1, explanation: '"Tiny" means very, very small.' },
      { question: 'Which sentence correctly uses an adjective with "is"?', options: ['"The sky blue is."', '"Blue is the sky."', '"Is blue the sky."', '"The sky is blue."'], correctAnswer: 3, explanation: 'The correct structure is: noun + "is" + adjective: "The sky is blue."' },
      { question: 'How many sides does a rectangle have?', options: ['3', '4', '5', '6'], correctAnswer: 1, explanation: 'A rectangle has 4 sides.' }
    ]
  },

  // ── W4: Describing My World (PROJECT) ────────────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Describing My World — Project',
        estimatedMinutes: 60,
        objectives: [
          'Create an illustrated description of your home, school, or neighborhood in English.',
          'Use family vocabulary, possessives, prepositions, colors, shapes, and adjectives from Units 1-2.',
          'Demonstrate correct English adjective placement (before the noun).',
          'Present your description clearly with correct pronunciation.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you are writing to a pen pal in another country who has never seen your home, school, or neighborhood. How would you describe your world using the English you have learned? What details would help them picture it?',
              connection: 'This project uses everything from Unit 2: family words, possessives, prepositions, colors, shapes, and adjectives. You are ready to describe your world in English!'
            },
            {
              type: 'text',
              heading: 'Project: Describing My World',
              body: '**Your task:** Create an illustrated description of one of these:\n- Your home (rooms, furniture, family members)\n- Your school (classrooms, teachers, friends)\n- Your neighborhood (buildings, places, people)\n\n**Requirements:**\n1. Write at least 12-15 sentences.\n2. Include a drawing, photo, or labeled diagram.\n3. Use at least 5 prepositions (in, on, under, next to, between, behind, in front of).\n4. Use at least 5 colors.\n5. Use at least 3 possessives (my, his, her, our, their).\n6. Use "there is" and "there are" at least 3 times each.\n7. Place ALL adjectives before the noun.\n8. Include at least 3 family members (if describing home).\n\n**Organization:** Describe your space room by room or area by area. Start with a general sentence, then add details.\n\nExample start: "My house is small but beautiful. It has four rooms. There is a big kitchen with a round brown table. My mother cooks delicious food in the kitchen. Next to the kitchen, there is a small living room..."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Gratitude for Our World',
              framework: 'Grand Narrative',
              scriptureRef: '1 Thessalonians 5:18',
              reflection: 'The Bible says, "Give thanks in all circumstances" (1 Thessalonians 5:18). When we describe our homes and communities, we see how much God has given us — even if our homes are simple. Describing our world in English is an act of gratitude, recognizing God\'s provision in every room, every relationship, and every corner of our lives.',
              applicationQuestion: 'As you describe your home or school, what blessings do you notice that you might normally take for granted?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What will you describe — your home, school, or neighborhood? Why?',
                'What are the most important details to include so someone can picture your world?',
                'What grammar rules from Unit 2 do you need to remember? (Think: adjective placement, there is/are, prepositions)'
              ]
            },
            {
              type: 'practice',
              activity: 'Planning Your Description',
              instructions: '1. Choose your topic (home, school, or neighborhood).\n2. List 5-6 areas or rooms you will describe.\n3. For each area, list 3-4 details (objects, colors, people).\n4. Write a rough draft of your opening sentence.\n5. Plan your illustration — what will you draw or photograph?'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'Describing My World',
              instructions: 'Create your final illustrated description:\n1. Write your full description (12-15 sentences).\n2. Create your illustration (drawing, photo, or diagram with labels).\n3. Read your description out loud and record it or present it.\n4. Write a 2-3 sentence reflection: What was challenging? What are you proud of?',
              rubric: [
                { dimension: 'Content & Detail', descriptors: { excellent: 'Rich description with 12-15+ sentences. Vivid details that paint a clear picture. All required elements included.', proficient: '10-12 sentences with good details. Most elements included.', developing: '7-9 sentences with basic details. Several elements missing.', beginning: 'Fewer than 7 sentences or very minimal detail.' } },
                { dimension: 'Grammar Accuracy', descriptors: { excellent: 'Correct adjective placement, prepositions, possessives, and there is/are throughout.', proficient: 'Mostly correct with 1-2 errors.', developing: 'Several grammar errors, especially adjective placement.', beginning: 'Frequent errors that block understanding.' } },
                { dimension: 'Illustration', descriptors: { excellent: 'Clear, labeled illustration that matches the written description.', proficient: 'Good illustration with some labels.', developing: 'Basic illustration with few labels.', beginning: 'No illustration or unrelated to description.' } },
                { dimension: 'Presentation', descriptors: { excellent: 'Clear pronunciation. Confident delivery. Good effort on /th/, /h/, /r/ sounds.', proficient: 'Mostly clear with minor pronunciation issues.', developing: 'Some pronunciation problems that affect understanding.', beginning: 'Hard to understand or did not present.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'What is one thing you described that you are grateful for?',
                'What English grammar rule was hardest to follow? How did you fix your mistakes?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Describing My World — Project',
        estimatedMinutes: 45,
        objectives: [
          'Create a description of your home or school with a drawing or photo.',
          'Use possessives, prepositions, colors, and adjectives correctly.',
          'Demonstrate correct adjective placement (before the noun).'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine showing your home or school to a friend who has never been there. What would you tell them?',
              connection: 'This project brings together family words, prepositions, colors, and adjectives to describe your world.'
            },
            {
              type: 'text',
              heading: 'Project Instructions',
              body: '**Your task:** Describe your home or school in English with a drawing.\n\n**Include:**\n- 8-10 sentences\n- A drawing or labeled diagram\n- At least 3 prepositions\n- At least 3 colors\n- At least 2 possessives\n- "There is" and "there are"\n- Adjectives BEFORE nouns\n\nExample: "My house has three rooms. There is a small kitchen. My mother cooks in the kitchen. The living room has a big brown couch..."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Gratitude',
              framework: 'Grand Narrative',
              scriptureRef: '1 Thessalonians 5:18',
              reflection: 'The Bible says, "Give thanks in all circumstances." Describing our world helps us see God\'s blessings.',
              applicationQuestion: 'What is one thing in your home you are thankful for?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Will you describe your home or school?',
                'What rooms or areas will you include?'
              ]
            },
            {
              type: 'practice',
              activity: 'Plan Your Project',
              instructions: 'List 4 areas you will describe. For each, write one detail (color, object, or person).\n1. ___: ___\n2. ___: ___\n3. ___: ___\n4. ___: ___'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'Describing My World',
              instructions: 'Write 8-10 sentences and create a drawing. Read your description out loud.\n\nWrite 1 sentence about what was challenging.',
              rubric: [
                { dimension: 'Content', descriptors: { excellent: '8-10 sentences with good details and all required elements.', proficient: '6-8 sentences with most elements.', developing: '4-6 sentences with some elements.', beginning: 'Fewer than 4 sentences.' } },
                { dimension: 'Grammar', descriptors: { excellent: 'Correct adjective placement and preposition use throughout.', proficient: 'Mostly correct with minor errors.', developing: 'Several errors.', beginning: 'Many errors.' } },
                { dimension: 'Drawing', descriptors: { excellent: 'Clear drawing with labels that matches description.', proficient: 'Good drawing with some labels.', developing: 'Basic drawing.', beginning: 'No drawing.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'What is your favorite part of your description?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Describing My World — Project',
        estimatedMinutes: 35,
        objectives: [
          'Write a short description of your home or school.',
          'Draw and label a picture with colors and objects.',
          'Use adjectives before nouns.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What does your room look like? Can you describe it in English?',
              connection: 'You know colors, objects, and prepositions. Now describe your world!'
            },
            {
              type: 'text',
              heading: 'Project: My World',
              body: '**Your task:** Describe your room or home and draw a picture.\n\n**Include:**\n- 5-6 sentences\n- A drawing with labels\n- At least 2 colors\n- At least 1 preposition (in, on, under)\n\nExample: "My room has a blue bed. There is a lamp on the desk. My backpack is red."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Thankfulness',
              framework: 'Grand Narrative',
              scriptureRef: '1 Thessalonians 5:18',
              reflection: 'God gives us our homes. We can be thankful for everything He gives us.',
              applicationQuestion: 'What in your room are you thankful for?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is in your room? Name 3 things in English.'
              ]
            },
            {
              type: 'practice',
              activity: 'List Your Items',
              instructions: 'List 4 things in your room and their color:\n1. ___ — color: ___\n2. ___ — color: ___\n3. ___ — color: ___\n4. ___ — color: ___'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'My World',
              instructions: 'Write 5-6 sentences about your room. Draw a picture and label things. Read your sentences out loud.',
              rubric: [
                { dimension: 'Content', descriptors: { excellent: '5-6 sentences with colors and prepositions.', proficient: '4-5 sentences with some detail.', developing: '2-3 sentences.', beginning: '1 sentence or none.' } },
                { dimension: 'Drawing', descriptors: { excellent: 'Clear drawing with labels.', proficient: 'Drawing with some labels.', developing: 'Basic drawing.', beginning: 'No drawing.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'Show your drawing and read your sentences!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'illustrate', definition: 'To draw a picture to explain something', example: 'I will illustrate my home by drawing the rooms.' },
      { term: 'label', definition: 'To write the name of something on or next to it', example: 'Label each room in your drawing: "kitchen," "bedroom."' },
      { term: 'diagram', definition: 'A simple drawing that shows how something is organized', example: 'Draw a diagram of your home showing each room.' },
      { term: 'neighborhood', definition: 'The area where you live and the people nearby', example: 'My neighborhood has a park and a church.' },
      { term: 'description', definition: 'Words that tell what something looks like or is like', example: 'My description of the room included colors and shapes.' }
    ],
    quiz: []
  }
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 3: DAILY LIFE (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit3Lessons: EnrichedLesson[] = [
  // ── W1: Morning to Night: Daily Routines ─────────────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Morning to Night: Daily Routines',
        estimatedMinutes: 60,
        objectives: [
          'Describe daily routines using the present simple tense (I wake up, I eat, I go...).',
          'Conjugate verbs in present simple for I/you/we/they vs. he/she/it (adding -s/-es).',
          'Compare French reflexive verbs with English equivalents (je me lave → I wash myself).',
          'Use time expressions (in the morning, at night, every day, usually, always, never) correctly.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, many daily actions use reflexive verbs: "Je me réveille" (I wake myself), "Je me lave" (I wash myself), "Je me brosse les dents" (I brush myself the teeth). In English, most of these are NOT reflexive — you just say "I wake up," "I wash," "I brush my teeth." Why do you think English drops the "myself" in most cases?',
              connection: 'English uses far fewer reflexive verbs than French. Where French adds "me/te/se," English usually just uses the simple verb. This is a major simplification, but it means you need to unlearn the French reflexive habit!'
            },
            {
              type: 'reading',
              title: 'Marie\'s Daily Routine',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie wakes up at six thirty every morning. She gets out of bed and goes to the bathroom. She brushes her teeth and washes her face. Then she gets dressed. She eats breakfast with her family at seven o\'clock. Her mother makes eggs and toast. Marie walks to school at seven forty-five. School starts at eight o\'clock. She has English class in the morning and math in the afternoon. School ends at three o\'clock. She goes home and does her homework. In the evening, she eats dinner with her family. After dinner, she reads her Bible. She goes to bed at nine o\'clock. Marie prays before she falls asleep. She thanks God for another good day.'
            },
            {
              type: 'text',
              heading: 'Present Simple for Daily Routines',
              body: '**The Present Simple Tense** is used for things you do regularly — habits, routines, and facts.\n\n**Formation:**\n- I/you/we/they + base verb → "I wake up," "They eat breakfast."\n- He/she/it + verb + **-s** or **-es** → "She wakes up," "He eats breakfast."\n\n**Spelling rules for -s/-es:**\n- Most verbs: add -s → eat**s**, walk**s**, read**s**\n- Verbs ending in -sh, -ch, -x, -ss, -o: add -es → wash**es**, watch**es**, go**es**\n- Verbs ending in consonant + y: change y to i and add -es → study → stud**ies**, carry → carr**ies**\n\n**Common Routine Verbs:**\nwake up, get up, brush (my teeth), wash (my face), get dressed, eat (breakfast/lunch/dinner), go (to school/home/to bed), start, finish, study, do (homework), read, pray, sleep\n\n**French Reflexive Verbs vs. English:**\nMany French daily routine verbs are reflexive, but English does NOT use reflexive forms for most of these:\n- *Je me réveille* → "I wake up" (NOT "I wake myself up")\n- *Je me lave* → "I wash" or "I wash my face" (NOT "I wash myself")\n- *Je me brosse les dents* → "I brush my teeth" (NOT "I brush myself the teeth")\n- *Je me couche* → "I go to bed" (NOT "I lay myself down")\n- *Je m\'habille* → "I get dressed" (NOT "I dress myself")\n\nEnglish CAN use "myself/yourself" for emphasis: "I wash myself" is grammatically correct, but in daily speech, people usually just say "I wash" or "I wash my face."\n\n**Time Expressions:**\n- in the morning, in the afternoon, in the evening, at night\n- every day, every morning, every week\n- always, usually, sometimes, never\n- at + specific time: "at seven o\'clock," "at noon," "at midnight"'
            },
            {
              type: 'text',
              heading: 'Adverbs of Frequency',
              body: '**How often do you do something?**\n- **always** (100%) → "I always brush my teeth."\n- **usually** (90%) → "I usually eat breakfast at seven."\n- **often** (70%) → "I often walk to school."\n- **sometimes** (50%) → "I sometimes read before bed."\n- **rarely / seldom** (10%) → "I rarely watch TV."\n- **never** (0%) → "I never skip breakfast."\n\n**Position:** Adverbs of frequency go BEFORE the main verb but AFTER "am/is/are":\n- "I **always** eat breakfast." (before "eat")\n- "She **never** watches TV." (before "watches")\n- "I **am** always tired." (after "am")\n\n**Faux ami:** The French word *assister* means "to attend" (a meeting, a class). The English word "assist" means "to help." If you want to say you attended class, say "I attended class," NOT "I assisted class."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Stewardship of Time',
              framework: 'Grand Narrative',
              scriptureRef: 'Ephesians 5:15-16',
              reflection: 'The Bible says, "Be very careful how you live — not as unwise but as wise, making the most of every opportunity" (Ephesians 5:15-16). Our daily routines shape who we become. When we include prayer, Bible reading, kindness, and hard work in our daily habits, we honor God with the time He has given us. Every morning is a new gift from God — a fresh opportunity to live wisely.',
              applicationQuestion: 'What is one good habit you do every day that honors God? What is one new habit you could start?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are three French reflexive verbs that become non-reflexive in English? Give the French and English forms.',
                'When do you add -s to a verb in English? When do you add -es?',
                'Where do adverbs of frequency go in an English sentence? Give an example.'
              ]
            },
            {
              type: 'practice',
              activity: 'Verb Conjugation Practice',
              instructions: 'A. Write the correct form of the verb:\n1. I (wake up) ___ at seven o\'clock.\n2. She (brush) ___ her teeth every morning.\n3. He (go) ___ to school at eight.\n4. They (eat) ___ lunch at noon.\n5. Marie (study) ___ English every day.\n6. We (watch) ___ TV sometimes.\n\nB. Translate from French to English (watch for reflexive verbs!):\n1. *Je me réveille à six heures.* → ___\n2. *Il se lave le visage.* → ___\n3. *Elle se brosse les dents.* → ___\n4. *Nous nous habillons.* → ___\n\nC. Add an adverb of frequency to each sentence:\n1. I ___ eat breakfast. (always/usually/sometimes)\n2. She ___ goes to bed late. (never/rarely/sometimes)\n3. They ___ walk to school. (always/often/never)'
            },
            {
              type: 'practice',
              activity: 'Daily Routine Sequencing',
              instructions: 'Put these activities in a logical order for a typical day. Number them 1-10:\n___ eat dinner\n___ wake up\n___ go to bed\n___ eat breakfast\n___ go to school\n___ do homework\n___ brush teeth (morning)\n___ get dressed\n___ eat lunch\n___ come home from school'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Daily Routine',
              instructions: 'Write a detailed paragraph about your daily routine (10-12 sentences). Include:\n- At least 8 different routine verbs\n- At least 4 time expressions (at 7 o\'clock, in the morning, etc.)\n- At least 3 adverbs of frequency (always, usually, sometimes, never)\n- At least 2 sentences about someone else (He/She + verb-s)\n\nExample: "I usually wake up at six thirty in the morning. I always brush my teeth first. Then I wash my face and get dressed. My mother usually makes breakfast at seven o\'clock. She always makes eggs..."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your routine to a partner. What do you have in common? What is different?',
                'What part of your routine do you do to honor God?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Morning to Night: Daily Routines',
        estimatedMinutes: 45,
        objectives: [
          'Describe daily routines using the present simple tense.',
          'Add -s/-es for he/she/it verbs.',
          'Know that French reflexive verbs are usually non-reflexive in English.',
          'Use time expressions like "in the morning" and "at night."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, "Je me brosse les dents" has "me" (myself). In English, you just say "I brush my teeth." English drops the "myself"! Can you think of other examples?',
              connection: 'Most French reflexive verbs become simple verbs in English. This makes English routines easier to say!'
            },
            {
              type: 'reading',
              title: 'Marie\'s Day',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie wakes up at six thirty. She brushes her teeth and gets dressed. She eats breakfast at seven. She goes to school at eight. School ends at three. She does homework and eats dinner. She goes to bed at nine o\'clock.'
            },
            {
              type: 'text',
              heading: 'Present Simple for Routines',
              body: '**Present Simple = things you do regularly.**\n\n**I/you/we/they** + verb → "I wake up."\n**He/she/it** + verb + **-s** → "She wakes up."\n\n**-es** for verbs ending in -sh, -ch, -ss, -x, -o: washes, watches, goes.\n\n**Routine Verbs:** wake up, brush (teeth), wash, get dressed, eat, go, study, sleep, pray.\n\n**French vs. English:**\n- *Je me réveille* → "I wake up"\n- *Je me lave* → "I wash (my face)"\n- *Je me brosse les dents* → "I brush my teeth"\nNo "myself" needed in English!\n\n**Time Words:** in the morning, in the afternoon, at night, every day, always, usually, sometimes, never.\n\n**Faux ami:** French *assister* = "to attend." English "assist" = "to help."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Using Time Wisely',
              framework: 'Grand Narrative',
              scriptureRef: 'Ephesians 5:15-16',
              reflection: 'The Bible says to use time wisely. Good daily habits — like prayer and studying — help us honor God every day.',
              applicationQuestion: 'What good habit do you do every day?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'When do you add -s to a verb in English?',
                'How do you say "Je me brosse les dents" in English?'
              ]
            },
            {
              type: 'practice',
              activity: 'Routine Verbs',
              instructions: 'Write the correct form:\n1. I (eat) ___ breakfast at seven.\n2. She (brush) ___ her teeth.\n3. He (go) ___ to school.\n4. They (watch) ___ TV.\n\nTranslate:\n1. *Je me réveille* → ___\n2. *Elle se couche* → ___\n\nWrite 3 sentences about your morning routine.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Routine',
              instructions: 'Write 6-8 sentences about your daily routine. Use time words and at least one sentence about someone else (he/she + verb-s).\n\nExample: "I wake up at seven. I brush my teeth. My sister eats breakfast at seven thirty."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your routine. Did you remember to add -s for he/she?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Morning to Night: Daily Routines',
        estimatedMinutes: 35,
        objectives: [
          'Say 5 daily routine activities in English.',
          'Use present simple: "I wake up," "I eat."',
          'Know that English does not use "myself" for most daily actions.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What do you do every morning? In French, "Je me lève." In English: "I get up." Simpler! No "me" needed.',
              connection: 'English daily routine words are simpler than French because you do not need "myself."'
            },
            {
              type: 'reading',
              title: 'My Day',
              source: 'Original ESL Passage — A1 Level',
              text: 'I wake up. I brush my teeth. I eat breakfast. I go to school. I come home. I eat dinner. I go to bed.'
            },
            {
              type: 'text',
              heading: 'Daily Routine Words',
              body: '**My Day:**\n- wake up = get out of bed\n- brush my teeth\n- eat breakfast / lunch / dinner\n- go to school\n- come home\n- do homework\n- go to bed\n\n**In French, you say "Je me lave." In English: "I wash." No "myself"!**\n\n**He/She adds -s:** "She wakes up." "He eats breakfast."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Each Day',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 118:24',
              reflection: '"This is the day the Lord has made. Let us rejoice and be glad in it." Every day is a gift from God.',
              applicationQuestion: 'What do you thank God for each morning?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What do you do first in the morning?',
                'Say: "I wake up. I brush my teeth."'
              ]
            },
            {
              type: 'practice',
              activity: 'My Morning',
              instructions: 'Put in order (1-5):\n___ eat breakfast\n___ wake up\n___ brush my teeth\n___ go to school\n___ get dressed\n\nSay each one out loud: "I wake up. I brush my teeth..."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Day',
              instructions: 'Write 4-5 sentences about your day:\n"I wake up at ___."\n"I eat ___."\n"I go to ___."\n"I go to bed at ___."'
            },
            {
              type: 'discussion',
              questions: [
                'Read your sentences. Well done!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'routine', definition: 'Something you do regularly, the same way, every day or every week', example: 'My morning routine includes brushing my teeth and eating breakfast.' },
      { term: 'wake up', definition: 'To stop sleeping and open your eyes', example: 'I wake up at six thirty every morning.' },
      { term: 'present simple', definition: 'A verb tense used for habits, routines, and facts', example: '"I eat breakfast every day" uses the present simple tense.' },
      { term: 'reflexive verb', definition: 'In French, a verb where the action is done to yourself (je me lave). Most are not reflexive in English.', example: 'French: "Je me lave." English: "I wash." (not reflexive in English)' },
      { term: 'frequency', definition: 'How often something happens', example: '"Always" and "never" are words that show frequency.' },
      { term: 'habit', definition: 'Something you do regularly without thinking about it', example: 'Brushing your teeth is a good habit.' },
      { term: 'attend', definition: 'To go to an event or class (NOT "assist"!)', example: 'I attend English class every Monday.' },
      { term: 'homework', definition: 'School work you do at home', example: 'I do my homework after school every day.' }
    ],
    quiz: [
      { question: 'How do you say "Je me réveille" in English?', options: ['"I wake myself up."', '"I wake up."', '"I myself wake."', '"Me wake up."'], correctAnswer: 1, explanation: 'English does not use reflexive forms for most daily routines: "I wake up" (not "I wake myself up").' },
      { question: 'Which sentence is correct?', options: ['"She wake up at seven."', '"She wakes up at seven."', '"She waking up at seven."', '"She wake ups at seven."'], correctAnswer: 1, explanation: 'For he/she/it, add -s to the verb: "She wakes up."' },
      { question: 'What ending do you add to "watch" for he/she/it?', options: ['-s', '-es', '-ing', 'nothing'], correctAnswer: 1, explanation: 'Verbs ending in -ch add -es: "He watches TV."' },
      { question: 'The French "assister" means "to attend." The English "assist" means...', options: ['To attend', 'To help', 'To watch', 'To sit'], correctAnswer: 1, explanation: '"Assist" = "to help" in English. "Assister" = "to attend" in French. A false cognate!' },
      { question: 'Where do adverbs of frequency go?', options: ['At the end of the sentence', 'Before the main verb', 'After the noun', 'At the beginning only'], correctAnswer: 1, explanation: 'Adverbs of frequency go BEFORE the main verb: "I always eat breakfast."' },
      { question: 'Which sentence is correct?', options: ['"I brush myself the teeth."', '"I brush my teeth."', '"I me brush the teeth."', '"My teeth I brush."'], correctAnswer: 1, explanation: 'In English, say "I brush my teeth" — no "myself" and use "my" (not "the").' },
      { question: 'What does "usually" mean?', options: ['100% of the time', 'About 90% of the time', '50% of the time', '0% of the time'], correctAnswer: 1, explanation: '"Usually" means about 90% of the time — almost always, but not every single time.' },
      { question: '"She ___ to school every day." Choose the correct verb.', options: ['go', 'goes', 'going', 'goed'], correctAnswer: 1, explanation: 'For she/he/it + verbs ending in -o, add -es: "She goes."' },
      { question: 'Which is NOT a daily routine verb?', options: ['Wake up', 'Brush teeth', 'Fly an airplane', 'Eat breakfast'], correctAnswer: 2, explanation: '"Fly an airplane" is not a typical daily routine activity.' },
      { question: '"I eat breakfast ___ the morning."', options: ['on', 'at', 'in', 'by'], correctAnswer: 2, explanation: 'Use "in" with parts of the day: "in the morning," "in the afternoon," "in the evening." But "at night."' }
    ]
  },

  // ── W2: Food and Meals ───────────────────────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Food and Meals',
        estimatedMinutes: 60,
        objectives: [
          'Name common foods and drinks in English and use them in sentences.',
          'Understand and use countable vs. uncountable nouns (an apple vs. some water).',
          'Order food politely using "Can I have..." and "I would like..."',
          'Identify French-English false cognates related to food (entrée, préservatif).'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In a French restaurant, the "entrée" is the starter or appetizer. In an American restaurant, the "entrée" is the main course! Imagine ordering in an American restaurant and expecting a small starter, but getting a huge main dish instead. Why do the same word mean different things in French and English?',
              connection: 'When French words were borrowed into English, their meanings sometimes changed over time. This makes "faux amis" (false friends) one of the trickiest parts of learning English for French speakers!'
            },
            {
              type: 'reading',
              title: 'Lunch at School',
              source: 'Original ESL Passage — A1 Level',
              text: 'It is lunchtime at school. Marie goes to the cafeteria. She looks at the menu. Today there is chicken with rice, a salad, an apple, and milk. Marie says to the lunch lady, "Can I have the chicken with rice, please?" The lunch lady says, "Of course! Would you like some salad too?" Marie says, "Yes, please!" She sits with her friends. Luc has a sandwich and some juice. Sarah has pasta and some water. Marie says, "This chicken is delicious!" After lunch, she eats her apple. She is full and happy.'
            },
            {
              type: 'text',
              heading: 'Food Vocabulary and Ordering',
              body: '**Meals:** breakfast (morning), lunch (midday), dinner/supper (evening), snack (between meals).\n\n**Common Foods:**\n- Fruits: apple, banana, orange, grape, strawberry, mango\n- Vegetables: carrot, tomato, potato, lettuce, onion, corn\n- Proteins: chicken, fish, beef, egg, beans, rice\n- Grains: bread, rice, pasta, cereal, toast\n- Dairy: milk, cheese, butter, yogurt\n- Drinks: water, juice, tea, coffee, soda/pop\n\n**Countable vs. Uncountable Nouns:**\nThis is a concept that does not exist in French in the same way!\n\n**Countable** = you can count them: an apple, two apples, three eggs\n- Use "a/an" for singular: "an apple," "a banana"\n- Use "some" or a number for plural: "some apples," "three eggs"\n- Use "How many?": "How many apples do you want?"\n\n**Uncountable** = you cannot count them: water, rice, bread, milk, sugar\n- Do NOT use "a/an": NOT "a water" or "a rice"\n- Use "some": "some water," "some rice," "some bread"\n- Use "How much?": "How much water do you want?"\n- Use measure words: "a glass of water," "a bowl of rice," "a slice of bread"\n\n**Ordering Food Politely:**\n- "Can I have the chicken, please?" (casual)\n- "I would like some water, please." (polite)\n- "Could I have a sandwich, please?" (very polite)\n- Response: "Yes, of course!" / "Here you go!" / "Would you like anything else?"\n\n**DANGEROUS False Cognates — Food Edition:**\n- **entrée**: French = starter/appetizer. English (American) = main course! A HUGE difference.\n- **préservatif**: French = condom. English "preservative" = a chemical added to food to keep it fresh. NEVER confuse these!\n- **biscuit**: French = cookie/cracker. English (American) "biscuit" = a soft bread roll. English (British) "biscuit" = cookie.\n- **raisin**: French = grape. English "raisin" = a dried grape. Fresh ones are just "grapes" in English.'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Provision',
              framework: 'Grand Narrative',
              scriptureRef: 'Matthew 6:11',
              reflection: 'Jesus taught His disciples to pray, "Give us today our daily bread" (Matthew 6:11). Food is a daily gift from God. In every culture, meals are a time for family, fellowship, and gratitude. When we sit down to eat — whether rice in Haiti, baguettes in France, or burgers in America — we can thank God for providing our daily needs. The variety of foods across cultures reflects the abundance and creativity of our Creator.',
              applicationQuestion: 'What is your favorite food? Have you ever thanked God specifically for that food? Why is gratitude before meals important?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between countable and uncountable nouns? Give two examples of each.',
                'What does "entrée" mean in French? What does it mean in American English? Why is this dangerous?',
                'How would you politely order food in English? Give two different phrases.'
              ]
            },
            {
              type: 'practice',
              activity: 'Countable or Uncountable?',
              instructions: 'A. Sort these foods into COUNTABLE or UNCOUNTABLE:\napple, water, egg, rice, banana, milk, carrot, bread, orange, cheese, sandwich, sugar\n\nCountable: ___\nUncountable: ___\n\nB. Fill in "a/an," "some," or a measure word:\n1. I would like ___ apple.\n2. Can I have ___ water?\n3. She eats ___ rice every day.\n4. He wants ___ sandwich.\n5. We need ___ milk.\n\nC. Write a short dialogue: order food at a restaurant (4-6 exchanges).'
            },
            {
              type: 'practice',
              activity: 'False Cognate Alert',
              instructions: 'Match the French word with its TRUE English meaning:\n1. entrée (French) → ___ (a. main course  b. appetizer  c. entrance)\n2. raisin (French) → ___ (a. raisin  b. grape  c. bread)\n3. préservatif (French) → ___ (NOT preservative! This word means ___)\n\nNow use the ENGLISH word correctly in a sentence:\n1. "The entrée at this restaurant is..." (American meaning)\n2. "I bought some raisins at..." (English meaning)\n3. "This food has no preservatives..." (English meaning)'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Meals',
              instructions: 'Write a paragraph (8-10 sentences) about what you eat in a typical day. Include:\n- All three meals (breakfast, lunch, dinner)\n- At least 3 countable foods with a/an or numbers\n- At least 3 uncountable foods with "some" or measure words\n- At least one polite ordering phrase\n\nExample: "For breakfast, I usually eat two eggs and some toast. I drink a glass of orange juice..."'
            },
            {
              type: 'discussion',
              questions: [
                'What is one food you eat that is popular in Francophone countries? How do you say it in English?',
                'Name one false cognate from this lesson that you want to remember.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Food and Meals',
        estimatedMinutes: 45,
        objectives: [
          'Name common foods and drinks in English.',
          'Understand countable vs. uncountable food nouns.',
          'Order food politely: "Can I have..., please?"',
          'Know key food-related false cognates.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, "entrée" means appetizer. In American English, "entrée" means the main course! Imagine the confusion at a restaurant. What other food words might be different?',
              connection: 'Some French food words have different meanings in English. Learning these differences helps you avoid confusion.'
            },
            {
              type: 'reading',
              title: 'At the Cafeteria',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie goes to the cafeteria for lunch. She says, "Can I have some chicken and rice, please?" The lunch lady says, "Here you go! Would you like an apple?" Marie says, "Yes, please!" She eats her lunch with her friends.'
            },
            {
              type: 'text',
              heading: 'Food and Ordering',
              body: '**Meals:** breakfast, lunch, dinner, snack.\n\n**Foods:** apple, banana, chicken, rice, bread, egg, sandwich, pasta, salad, cheese.\n\n**Drinks:** water, juice, milk, tea.\n\n**Countable vs. Uncountable:**\n- Countable (you can count them): an apple, two eggs, three bananas.\n- Uncountable (you cannot count them): water, rice, bread, milk.\n- Use "some" for uncountable: "some water," "some rice."\n- Use "a/an" for countable: "an apple," "a sandwich."\n\n**Ordering Food:**\n- "Can I have some rice, please?"\n- "I would like a sandwich, please."\n\n**False Cognates:**\n- *entrée* (French) = appetizer. "Entrée" (English/American) = main course!\n- *raisin* (French) = grape. "Raisin" (English) = dried grape.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Daily Bread',
              framework: 'Grand Narrative',
              scriptureRef: 'Matthew 6:11',
              reflection: 'Jesus taught us to pray, "Give us today our daily bread." Food is a gift from God. We can thank Him every time we eat.',
              applicationQuestion: 'Do you thank God before meals? Why is this important?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Is "rice" countable or uncountable? What about "apple"?',
                'What does "entrée" mean in French? In American English?'
              ]
            },
            {
              type: 'practice',
              activity: 'Food Practice',
              instructions: 'Fill in "a," "an," or "some":\n1. ___ apple\n2. ___ water\n3. ___ sandwich\n4. ___ rice\n5. ___ egg\n\nWrite a short order at a restaurant (3-4 lines):\n"Can I have ___, please?"'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Meals Today',
              instructions: 'Write about what you eat today (5-6 sentences):\n"For breakfast, I eat ___. I drink ___."\n"For lunch, I have ___."\n"For dinner, I eat ___."\n\nUse "a/an" for countable and "some" for uncountable.'
            },
            {
              type: 'discussion',
              questions: [
                'What is your favorite food? Say it in English!',
                'Name one food false cognate you learned.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Food and Meals',
        estimatedMinutes: 35,
        objectives: [
          'Name 10 foods and 3 drinks in English.',
          'Say "Can I have ___, please?" to order food.',
          'Know that "some" goes with food you cannot count (water, rice).'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What is your favorite food? Can you say it in English? Let us learn food words!',
              connection: 'Knowing food words in English helps you order food, shop, and cook.'
            },
            {
              type: 'reading',
              title: 'Lunchtime',
              source: 'Original ESL Passage — A1 Level',
              text: 'It is lunchtime. Marie says, "Can I have some chicken, please?" She also gets an apple and some water. The food is good. Marie says, "Thank you!"'
            },
            {
              type: 'text',
              heading: 'Food Words',
              body: '**Foods:** apple, banana, chicken, rice, bread, egg, cheese, fish.\n\n**Drinks:** water, juice, milk.\n\n**Ordering food:** "Can I have ___, please?"\n- "Can I have an apple, please?"\n- "Can I have some rice, please?"\n\n**Use "a/an"** for things you can count: a banana, an egg.\n**Use "some"** for things you cannot count: some water, some rice.\n\n**Be careful:** French *raisin* = grape. English "raisin" = dried grape!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Food from God',
              framework: 'Grand Narrative',
              scriptureRef: 'Matthew 6:11',
              reflection: 'Jesus said to pray for "daily bread." God gives us food every day. We should thank Him.',
              applicationQuestion: 'What food are you thankful for today?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Name 5 foods in English.',
                'Say: "Can I have some ___, please?"'
              ]
            },
            {
              type: 'practice',
              activity: 'Order Food',
              instructions: 'Complete:\n1. "Can I have ___ apple, please?" (a/some)\n2. "Can I have ___ water, please?" (a/some)\n3. "Can I have ___ sandwich, please?" (a/some)\n\nWrite your own order: "Can I have ___, please?"'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Meals',
              instructions: 'Write what you eat:\n"For breakfast, I eat ___."\n"For lunch, I eat ___."\n"For dinner, I eat ___."'
            },
            {
              type: 'discussion',
              questions: [
                'What is your favorite food? Say it in English!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'meal', definition: 'A time when you eat: breakfast, lunch, or dinner', example: 'Dinner is my favorite meal of the day.' },
      { term: 'countable noun', definition: 'A noun you can count: one apple, two apples', example: '"Egg" is countable: one egg, two eggs.' },
      { term: 'uncountable noun', definition: 'A noun you cannot count with numbers: water, rice, bread', example: '"Water" is uncountable — you say "some water," not "two waters."' },
      { term: 'delicious', definition: 'Very good tasting', example: 'This chicken is delicious!' },
      { term: 'menu', definition: 'A list of food you can order at a restaurant', example: 'She looked at the menu and chose a sandwich.' },
      { term: 'cafeteria', definition: 'A room in a school or workplace where you buy and eat food', example: 'We eat lunch in the school cafeteria.' },
      { term: 'order', definition: 'To ask for food at a restaurant', example: 'I would like to order some chicken, please.' },
      { term: 'preservative', definition: 'A chemical added to food to keep it fresh (NOT the French "préservatif"!)', example: 'This juice has no preservatives — it is all natural.' }
    ],
    quiz: [
      { question: 'Which is an uncountable noun?', options: ['Apple', 'Egg', 'Water', 'Banana'], correctAnswer: 2, explanation: '"Water" is uncountable — you cannot say "one water, two waters." You say "some water" or "a glass of water."' },
      { question: 'How do you politely order food?', options: ['"Give me chicken."', '"I want chicken now."', '"Can I have some chicken, please?"', '"Chicken for me."'], correctAnswer: 2, explanation: '"Can I have some chicken, please?" is polite. It uses "Can I have" and "please."' },
      { question: 'In French, "entrée" means appetizer. In American English, "entrée" means...', options: ['Appetizer', 'Dessert', 'Main course', 'Drink'], correctAnswer: 2, explanation: 'In American English, "entrée" means the main course — not the appetizer!' },
      { question: 'Which is correct?', options: ['"I eat a rice."', '"I eat some rice."', '"I eat two rice."', '"I eat an rice."'], correctAnswer: 1, explanation: 'Rice is uncountable. Use "some rice," not "a rice" or "two rice."' },
      { question: 'French "raisin" means grape. English "raisin" means...', options: ['Grape', 'Dried grape', 'Wine', 'Bread'], correctAnswer: 1, explanation: 'In English, "raisin" = dried grape. Fresh ones are just called "grapes."' },
      { question: 'Which is a countable noun?', options: ['Milk', 'Bread', 'Rice', 'Egg'], correctAnswer: 3, explanation: '"Egg" is countable: one egg, two eggs. Milk, bread, and rice are uncountable.' },
      { question: '"___ I have a sandwich, please?"', options: ['Do', 'Can', 'Am', 'Is'], correctAnswer: 1, explanation: '"Can I have a sandwich, please?" is the correct way to order.' },
      { question: 'What do you say before a meal to show thanks?', options: ['"Bon appétit"', '"Thank you, God, for this food"', '"I am hungry"', '"Give me food"'], correctAnswer: 1, explanation: 'Christians often pray before meals: "Thank you, God, for this food." This follows Jesus\' teaching in Matthew 6:11.' },
      { question: 'English "preservative" means a chemical in food. French "préservatif" means...', options: ['The same thing', 'Something completely different (condom)', 'A type of food', 'A restaurant'], correctAnswer: 1, explanation: 'This is a very important false cognate! "Préservatif" (French) and "preservative" (English) have completely different meanings.' },
      { question: 'Which sentence correctly uses "a" and "some"?', options: ['"I want a water and some egg."', '"I want some water and an egg."', '"I want an water and a egg."', '"I want a some water."'], correctAnswer: 1, explanation: 'Water is uncountable (some water). Egg is countable (an egg — "an" before a vowel).' }
    ]
  },

  // ── W3: Clothing and Weather ─────────────────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Clothing and Weather',
        estimatedMinutes: 60,
        objectives: [
          'Name common clothing items and weather conditions in English.',
          'Use the present continuous (is/are + -ing) for weather happening right now.',
          'Understand why English says "It is raining" (with "it") and compare with French "Il pleut."',
          'Connect clothing choices to weather using "When it is cold, I wear..."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you can say "Il pleut" (it rains) for a fact OR for right now. In English, there is a difference: "It rains a lot in London" (fact/habit) vs. "It is raining right now" (happening now). Why does English need two different forms for the same situation? Is this more precise or just more complicated?',
              connection: 'English distinguishes between habits (present simple: "it rains") and actions happening now (present continuous: "it is raining"). French does not make this distinction as clearly. Learning this difference is key to sounding natural in English.'
            },
            {
              type: 'reading',
              title: 'What to Wear Today?',
              source: 'Original ESL Passage — A1 Level',
              text: 'Marie looks out the window. It is raining today! The sky is gray and the wind is blowing. Marie puts on her warm jacket, her boots, and her red umbrella. She walks to school carefully. At school, her friend Luc is wearing a T-shirt and shorts! Marie says, "Luc! It is cold and rainy. Why are you wearing shorts?" Luc laughs and says, "I forgot to check the weather this morning!" After school, the sun comes out. The sky turns blue. Marie takes off her jacket. She says, "The weather changes so fast!"'
            },
            {
              type: 'text',
              heading: 'Weather and Clothing Vocabulary',
              body: '**Weather Words:**\n- sunny (the sun is shining), cloudy (many clouds), rainy (it is raining)\n- windy (the wind is blowing), snowy (it is snowing), foggy (you cannot see well)\n- hot, warm, cool, cold, freezing\n- storm, thunder, lightning\n\n**Weather Expressions with "It":**\nEnglish uses "it" as a dummy subject for weather — similar to French "il":\n- "It is raining." (*Il pleut.*) — Note: English says "it IS raining" (present continuous) for right now.\n- "It is sunny." / "It is hot." / "It is cold."\n- "It is snowing." / "It is windy."\n\n**Present Simple vs. Present Continuous for Weather:**\n- "It rains a lot in Seattle." → general fact, habit\n- "It is raining right now." → happening at this moment\n- "It snows in winter." → general fact\n- "It is snowing outside." → happening now\n\nFrench does not clearly distinguish: *Il pleut* can mean both. In English, you MUST choose the correct tense.\n\n**Clothing Vocabulary:**\n- T-shirt, shirt, blouse, sweater, jacket, coat\n- pants/trousers, jeans, shorts, skirt, dress\n- shoes, boots, sandals, sneakers/trainers\n- hat, cap, scarf, gloves, socks\n- umbrella\n\n**Connecting Weather and Clothing:**\n- "When it is cold, I wear a jacket and boots."\n- "When it is hot, I wear shorts and sandals."\n- "When it is raining, I take my umbrella."\n\n**Faux ami:** The French word *veste* means "jacket." The English word "vest" means a sleeveless garment (like what you wear under a suit). If you want a jacket in English, say "jacket"!\n\nAnother one: *tennis* (French) can mean "sneakers." In English, "tennis" is only the sport. Sneakers are called "sneakers" or "trainers."'
            },
            {
              type: 'text',
              heading: 'Present Continuous: "is/are + verb-ing"',
              body: 'The **present continuous** describes things happening RIGHT NOW:\n- I am wearing a blue shirt.\n- She is eating lunch.\n- They are playing outside.\n- It is raining.\n\n**Formation:** subject + am/is/are + verb + -ing\n- I **am** study**ing**.\n- He/She/It **is** rain**ing**.\n- You/We/They **are** play**ing**.\n\n**Spelling rules for -ing:**\n- Most verbs: add -ing → eat**ing**, rain**ing**, study**ing**\n- Verbs ending in -e: drop the e, add -ing → come → com**ing**, write → writ**ing**\n- Short verbs (CVC): double the last consonant → run → runn**ing**, sit → sitt**ing**\n\nYou will learn more about this tense later, but for now, use it for weather and what you are wearing right now!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Controls the Weather',
              framework: 'Grand Narrative',
              scriptureRef: 'Matthew 5:45',
              reflection: 'Jesus said, "He causes his sun to rise on the evil and the good, and sends rain on the righteous and the unrighteous" (Matthew 5:45). God controls the weather — the sunshine and the storms. Both are part of His provision for the world. Rain waters crops and fills rivers. Sunshine gives light and warmth. When we learn to talk about weather in English, we are describing God\'s ongoing work in creation.',
              applicationQuestion: 'What is your favorite type of weather? How does it remind you of God\'s care for the world?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "It rains a lot" and "It is raining right now"? Which tense is each?',
                'In French, "veste" means jacket. What does "vest" mean in English? Why is this confusing?',
                'What are you wearing right now? Describe your clothes in English using present continuous: "I am wearing..."'
              ]
            },
            {
              type: 'practice',
              activity: 'Weather and Clothing Match',
              instructions: 'A. Choose Present Simple or Present Continuous:\n1. Look outside! It ___ (rain) right now. → ___\n2. It ___ (rain) a lot in London. → ___\n3. It ___ (snow) every winter in Canada. → ___\n4. Put on your coat! It ___ (snow) outside! → ___\n\nB. Match the weather to the clothing:\n1. It is very cold. → I wear ___\n2. It is hot and sunny. → I wear ___\n3. It is raining. → I take my ___\n4. It is snowing. → I wear ___\n\nC. Translate from French, choosing the correct English tense:\n1. *Il pleut.* (right now) → ___\n2. *Il pleut souvent à Paris.* → ___\n3. *Il fait chaud.* → ___'
            },
            {
              type: 'practice',
              activity: 'What Am I Wearing?',
              instructions: 'Describe what you are wearing right now using present continuous. Write 5 sentences.\n\nExample:\n"I am wearing a blue T-shirt."\n"I am wearing black pants."\n"I am wearing white socks and brown shoes."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Weather Report and Outfit',
              instructions: 'Write a short weather report and outfit description (8-10 sentences):\n1. Describe today\'s weather (or imagine a weather day).\n2. Describe what you are wearing because of the weather.\n3. Describe what someone else is wearing.\n4. Use both present simple (facts) and present continuous (happening now).\n\nExample: "Today is a cold winter day. It is snowing outside. The temperature is very low. I am wearing a warm coat and boots. My mother is wearing a red scarf..."'
            },
            {
              type: 'discussion',
              questions: [
                'What is the weather like today? Describe it in English.',
                'If you could live in any climate, which would you choose? Why? Answer in English.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Clothing and Weather',
        estimatedMinutes: 45,
        objectives: [
          'Name clothing items and weather conditions.',
          'Say "It is raining" and "It is sunny" for weather happening now.',
          'Connect weather to clothing: "When it is cold, I wear..."',
          'Know key clothing false cognates.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, "Il pleut" means "it rains." In English, you say "It is raining" when it is happening right now. Why does English add "is" and "-ing"?',
              connection: 'English uses "is + verb-ing" for things happening right now. This is called present continuous.'
            },
            {
              type: 'reading',
              title: 'Rainy Day',
              source: 'Original ESL Passage — A1 Level',
              text: 'It is raining today. Marie wears her jacket and boots. She takes her umbrella. At school, the sun comes out. Marie takes off her jacket. The weather changes fast!'
            },
            {
              type: 'text',
              heading: 'Weather and Clothing',
              body: '**Weather:** sunny, cloudy, rainy, windy, snowy, hot, cold, warm, cool.\n\n**Say "It is...":**\n- "It is sunny." / "It is raining." / "It is cold."\n\n**For right now:** "It IS raining" (not just "It rains").\n\n**Clothing:** T-shirt, jacket, coat, pants, shorts, dress, shoes, boots, sandals, hat, scarf, gloves, umbrella.\n\n**Connect weather + clothing:**\n- "When it is cold, I wear a jacket."\n- "When it is raining, I take my umbrella."\n- "When it is hot, I wear shorts."\n\n**False Cognate:** French *veste* = jacket. English "vest" = sleeveless garment. Say "jacket" in English!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God and Weather',
              framework: 'Grand Narrative',
              scriptureRef: 'Matthew 5:45',
              reflection: 'Jesus said God "sends rain on the righteous and the unrighteous." God controls the weather. Rain and sunshine are both gifts from Him.',
              applicationQuestion: 'What is your favorite weather? How does it show God\'s care?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What do you wear when it is cold?',
                'What is the weather like right now? Use English!'
              ]
            },
            {
              type: 'practice',
              activity: 'Weather and Clothes',
              instructions: 'Match the weather to clothing:\n1. Cold → I wear ___\n2. Rainy → I take ___\n3. Hot → I wear ___\n\nDescribe today\'s weather in 2 sentences. What are you wearing?'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Today\'s Weather',
              instructions: 'Write 5-6 sentences:\n- What is the weather today?\n- What are you wearing?\n- What does someone else in your family wear?\n\nExample: "It is sunny today. I am wearing a T-shirt and shorts."'
            },
            {
              type: 'discussion',
              questions: [
                'What weather do you like best? Answer in English.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Clothing and Weather',
        estimatedMinutes: 35,
        objectives: [
          'Name 5 clothing items and 4 weather words.',
          'Say "It is raining" or "It is sunny."',
          'Connect weather to clothes: "I wear a jacket."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What is the weather today? Is it sunny? Rainy? Cold? What are you wearing?',
              connection: 'Knowing weather and clothing words helps you dress right and talk about each day.'
            },
            {
              type: 'reading',
              title: 'What is the Weather?',
              source: 'Original ESL Passage — A1 Level',
              text: 'It is cold today. Marie wears a jacket. It is raining too. She takes her umbrella. At school, it is warm inside. Marie takes off her jacket.'
            },
            {
              type: 'text',
              heading: 'Weather and Clothes',
              body: '**Weather:** sunny, rainy, cold, hot, windy, snowy.\n\n**Say:** "It is sunny." / "It is raining." / "It is cold."\n\n**Clothing:** T-shirt, jacket, pants, shorts, shoes, boots, hat, umbrella.\n\n**Cold → jacket, boots.** **Hot → T-shirt, shorts.** **Rainy → umbrella.**\n\n**Remember:** French *veste* = jacket. English "vest" is different!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Weather',
              framework: 'Grand Narrative',
              scriptureRef: 'Matthew 5:45',
              reflection: 'God controls the weather. Sun and rain are both gifts from God.',
              applicationQuestion: 'Do you like rain or sun better? Why?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the weather today? Say it in English.',
                'What are you wearing? Name 2 items.'
              ]
            },
            {
              type: 'practice',
              activity: 'Match',
              instructions: 'Match:\n1. Cold → ___ (jacket / shorts)\n2. Hot → ___ (jacket / shorts)\n3. Rainy → ___ (hat / umbrella)\n\nSay: "It is ___ today. I am wearing ___."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Today',
              instructions: 'Write 3 sentences:\n"It is ___ today."\n"I am wearing ___."\n"When it is cold, I wear ___."'
            },
            {
              type: 'discussion',
              questions: [
                'Look outside and describe the weather in English!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'weather', definition: 'What the sky and air are like outside (sunny, rainy, cold, hot)', example: 'The weather is cold and rainy today.' },
      { term: 'temperature', definition: 'How hot or cold something is', example: 'The temperature today is 15 degrees.' },
      { term: 'umbrella', definition: 'An object you hold over your head to stay dry in the rain', example: 'I always take my umbrella when it is raining.' },
      { term: 'boots', definition: 'Strong shoes that cover your feet and ankles, good for rain or snow', example: 'I wear boots when it is snowing.' },
      { term: 'present continuous', definition: 'A verb tense for things happening right now: "is/are + verb-ing"', example: '"It is raining" uses the present continuous tense.' },
      { term: 'forecast', definition: 'A prediction about what the weather will be like', example: 'The weather forecast says it will rain tomorrow.' },
      { term: 'jacket', definition: 'A piece of clothing you wear over your shirt for warmth (NOT "vest"!)', example: 'I wear a warm jacket in winter.' }
    ],
    quiz: [
      { question: '"It ___ right now." Which is correct for rain happening NOW?', options: ['"It rains"', '"It is raining"', '"It rained"', '"It rain"'], correctAnswer: 1, explanation: 'For something happening right now, use present continuous: "It is raining."' },
      { question: 'French "veste" means "jacket." English "vest" means...', options: ['Jacket', 'A sleeveless garment', 'Pants', 'A hat'], correctAnswer: 1, explanation: 'In English, a "vest" is a sleeveless garment, NOT a jacket. This is a false cognate!' },
      { question: 'When it is raining, you should take your...', options: ['Sunglasses', 'Umbrella', 'Shorts', 'Sandals'], correctAnswer: 1, explanation: 'An umbrella keeps you dry in the rain.' },
      { question: 'Which describes weather happening right now?', options: ['"It snows in winter."', '"It is snowing outside."', '"It snowed yesterday."', '"It will snow tomorrow."'], correctAnswer: 1, explanation: '"It is snowing outside" uses present continuous — it is happening right now.' },
      { question: 'What do you wear when it is very cold?', options: ['Shorts and sandals', 'A coat, boots, and gloves', 'A T-shirt and shorts', 'Just a hat'], correctAnswer: 1, explanation: 'In very cold weather, you wear warm clothes: a coat, boots, and gloves.' },
      { question: 'How do you form the present continuous?', options: ['verb + -ed', 'am/is/are + verb + -ing', 'will + verb', 'do/does + verb'], correctAnswer: 1, explanation: 'Present continuous = am/is/are + verb + -ing: "I am wearing," "It is raining."' },
      { question: '"It ___ a lot in Seattle." (general fact about rain)', options: ['"is raining"', '"rains"', '"rained"', '"raining"'], correctAnswer: 1, explanation: 'For general facts and habits, use present simple: "It rains a lot in Seattle."' },
      { question: 'What is the weather word for "you cannot see well because of water in the air"?', options: ['Sunny', 'Windy', 'Foggy', 'Snowy'], correctAnswer: 2, explanation: '"Foggy" means there is fog (water droplets in the air) and you cannot see well.' },
      { question: 'Which spelling is correct for the -ing form of "come"?', options: ['Comeing', 'Coming', 'Comming', 'Comeing'], correctAnswer: 1, explanation: 'Drop the final -e before adding -ing: come → coming.' },
      { question: 'Which sentence correctly connects weather and clothing?', options: ['"When it is hot, I wear a coat."', '"When it is cold, I wear shorts."', '"When it is raining, I take my umbrella."', '"When it is sunny, I wear boots."'], correctAnswer: 2, explanation: '"When it is raining, I take my umbrella" correctly matches weather to appropriate clothing.' }
    ]
  },

  // ── W4: A Day in My Life (PROJECT) ───────────────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'A Day in My Life — Project',
        estimatedMinutes: 60,
        objectives: [
          'Write a detailed daily routine journal entry (15-20 sentences) in English.',
          'Use present simple for habits, present continuous for current actions, and time expressions.',
          'Include food, clothing, and weather vocabulary from Unit 3.',
          'Demonstrate correct grammar including verb conjugation, adjective placement, and article usage.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine writing a journal entry about one perfect day in your life — from the moment you wake up to the moment you fall asleep. What would that day look like? What would you eat, wear, do, and who would you spend time with? This project is your chance to put ALL your English skills together.',
              connection: 'This project combines everything from Unit 3: daily routines (present simple), weather and clothing (present continuous), food (countable/uncountable), and all the vocabulary and grammar from Units 1-2.'
            },
            {
              type: 'text',
              heading: 'Project: A Day in My Life — Daily Routine Journal',
              body: '**Your task:** Write a journal entry about one day in your life (real or imagined). Write 15-20 sentences covering your entire day from morning to night.\n\n**Your journal must include:**\n1. **Morning routine** — waking up, getting ready (at least 4 sentences)\n2. **What you eat** — at least 2 meals with specific foods, using a/an and some correctly (at least 3 sentences)\n3. **Weather description** — what the weather is like, using present continuous (at least 2 sentences)\n4. **What you wear** — clothing choices connected to weather (at least 2 sentences)\n5. **School or activities** — what you do during the day (at least 3 sentences)\n6. **Evening routine** — dinner, homework, bedtime (at least 3 sentences)\n7. **At least 3 adverbs of frequency** (always, usually, sometimes, never)\n8. **At least 2 sentences about someone else** using he/she + verb-s\n9. **A closing reflection** connecting to your faith\n\n**Grammar checklist:**\n- Present simple for routines (I wake up, she eats...)\n- Present continuous for weather (it is raining, I am wearing...)\n- Adjectives BEFORE nouns\n- Correct use of a/an/some\n- Time expressions (at 7 o\'clock, in the morning, every day)\n\n**Example opening:** "Today is Wednesday. I wake up at six thirty in the morning. It is cold and cloudy outside. I brush my teeth and wash my face. I am wearing my warm blue jacket today because it is raining..."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Living Each Day for God',
              framework: 'Grand Narrative',
              scriptureRef: 'Colossians 3:17',
              reflection: 'The Bible says, "Whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him" (Colossians 3:17). Every part of our day — eating, studying, working, resting — can be done to honor God. When we write about our daily lives, we can see how God is present in every ordinary moment. Nothing is too small for God\'s attention.',
              applicationQuestion: 'How can ordinary daily activities — like eating breakfast or walking to school — become acts of worship?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What day will you write about — a school day, a weekend day, or an imagined perfect day?',
                'What grammar rules do you need to remember? List at least four.',
                'How will you include your faith or gratitude in your journal entry?'
              ]
            },
            {
              type: 'practice',
              activity: 'Journal Planning',
              instructions: 'Plan your journal by listing activities for each part of the day:\n\n**Morning (6:00-8:00):**\n1. ___\n2. ___\n3. ___\n\n**School/Day (8:00-3:00):**\n1. ___\n2. ___\n3. ___\n\n**Afternoon (3:00-6:00):**\n1. ___\n2. ___\n\n**Evening (6:00-9:00):**\n1. ___\n2. ___\n3. ___\n\nFor each activity, note: What tense? What vocabulary?'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'A Day in My Life — Daily Routine Journal',
              instructions: 'Write your complete journal entry (15-20 sentences). Read it out loud and record yourself or present to the class.\n\nWrite a short reflection (3-4 sentences):\n- What English skills are you most proud of from this unit?\n- What is still challenging?\n- What French-English difference was most important to learn?',
              rubric: [
                { dimension: 'Content Completeness', descriptors: { excellent: '15-20 sentences covering all required elements: morning routine, food, weather, clothing, activities, evening, frequency adverbs, third-person sentences, faith reflection.', proficient: '12-15 sentences covering most required elements (missing 1-2).', developing: '8-12 sentences with several missing elements.', beginning: 'Fewer than 8 sentences or missing most elements.' } },
                { dimension: 'Grammar & Vocabulary', descriptors: { excellent: 'Correct present simple and present continuous usage. Adjectives before nouns. Correct a/an/some. Rich vocabulary from all Unit 3 lessons.', proficient: 'Mostly correct grammar with minor errors. Good vocabulary range.', developing: 'Several grammar errors. Limited vocabulary.', beginning: 'Frequent errors that block understanding.' } },
                { dimension: 'French-English Awareness', descriptors: { excellent: 'Avoids common French-speaker errors (reflexive verbs, adjective order, false cognates). Shows awareness of differences.', proficient: 'Mostly avoids French-speaker errors. Some awareness shown.', developing: 'Several French-influenced errors.', beginning: 'Many French-influenced errors throughout.' } },
                { dimension: 'Presentation & Reflection', descriptors: { excellent: 'Clear pronunciation. Thoughtful reflection on learning. Confident delivery.', proficient: 'Good pronunciation. Reflection addresses prompts.', developing: 'Some pronunciation issues. Brief reflection.', beginning: 'Hard to understand. No reflection.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'After writing your journal, what daily English word or phrase do you feel most confident using now?',
                'What part of this project was the most fun? What was most challenging?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'A Day in My Life — Project',
        estimatedMinutes: 45,
        objectives: [
          'Write a daily routine journal entry (10-12 sentences).',
          'Use present simple for routines and present continuous for weather.',
          'Include food, clothing, and weather vocabulary.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What does a typical day look like for you? From breakfast to bedtime, let us write about it in English!',
              connection: 'This project puts together everything you have learned: routines, food, weather, clothing, and descriptions.'
            },
            {
              type: 'text',
              heading: 'Project: My Day',
              body: '**Write a journal entry about one day. Include:**\n- Morning routine (3+ sentences)\n- What you eat for 2 meals\n- Today\'s weather (1-2 sentences)\n- What you are wearing (1-2 sentences)\n- Activities at school or home (2+ sentences)\n- Evening and bedtime (2+ sentences)\n\n**Use:**\n- Present simple for routines: "I wake up at seven."\n- Present continuous for weather: "It is raining today."\n- Adjectives before nouns: "a warm jacket" (not "a jacket warm")\n- a/an for countable, some for uncountable\n\nExample: "Today is Monday. I wake up at six thirty. It is cold and rainy. I am wearing my warm jacket. For breakfast, I eat some toast and an egg..."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Daily Life for God',
              framework: 'Grand Narrative',
              scriptureRef: 'Colossians 3:17',
              reflection: 'The Bible says to do everything in the name of Jesus. Every part of our day — even eating and studying — can honor God.',
              applicationQuestion: 'What part of your day makes you thankful?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What day will you write about?',
                'What grammar rules do you need to remember?'
              ]
            },
            {
              type: 'practice',
              activity: 'Plan Your Day',
              instructions: 'List your activities:\nMorning: 1.___ 2.___ 3.___\nSchool: 1.___ 2.___\nEvening: 1.___ 2.___ 3.___'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'A Day in My Life',
              instructions: 'Write 10-12 sentences about your day. Include food, weather, clothing, and routines. Read it out loud.\n\nWrite 1-2 sentences: What was challenging? What are you proud of?',
              rubric: [
                { dimension: 'Content', descriptors: { excellent: '10-12 sentences covering routines, food, weather, clothing. All elements present.', proficient: '8-10 sentences with most elements.', developing: '5-8 sentences with some elements.', beginning: 'Fewer than 5 sentences.' } },
                { dimension: 'Grammar', descriptors: { excellent: 'Correct tenses, adjective placement, and article use.', proficient: 'Mostly correct with minor errors.', developing: 'Several errors but meaning is clear.', beginning: 'Many errors.' } },
                { dimension: 'Presentation', descriptors: { excellent: 'Clear pronunciation and confident reading.', proficient: 'Good effort with minor issues.', developing: 'Some difficulty.', beginning: 'Did not present or very hard to understand.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'What is one thing you wrote about that you are thankful for?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'A Day in My Life — Project',
        estimatedMinutes: 35,
        objectives: [
          'Write 8-10 sentences about your daily routine.',
          'Include what you eat, wear, and do.',
          'Describe the weather using "It is..."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What do you do every day? Let us write about it in English!',
              connection: 'You know enough English to write about your whole day. This is your chance to show what you have learned!'
            },
            {
              type: 'text',
              heading: 'My Day — Project',
              body: '**Write about your day. Include:**\n- What time you wake up\n- What you eat\n- What the weather is like\n- What you wear\n- What you do at school or home\n- When you go to bed\n\nExample:\n"I wake up at seven. It is sunny today. I wear a T-shirt. For breakfast, I eat some bread. I go to school. I come home. I eat dinner. I go to bed at nine."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Every Day',
              framework: 'Grand Narrative',
              scriptureRef: 'Psalm 118:24',
              reflection: '"This is the day the Lord has made." Every day is a gift. We can thank God for each day.',
              applicationQuestion: 'What part of today made you happy?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What do you do in the morning?',
                'What is the weather today?'
              ]
            },
            {
              type: 'practice',
              activity: 'Fill in My Day',
              instructions: 'Complete:\n"I wake up at ___."\n"It is ___ today." (weather)\n"I wear ___."\n"For breakfast, I eat ___."\n"I go to ___."\n"I go to bed at ___."'
            }
          ],
          output: [
            {
              type: 'project',
              title: 'A Day in My Life',
              instructions: 'Write 8-10 sentences about your day. Include food, weather, clothing, and your routine. Read your sentences out loud.',
              rubric: [
                { dimension: 'Content', descriptors: { excellent: '8-10 sentences with food, weather, clothing, and routine.', proficient: '6-8 sentences with most topics.', developing: '4-6 sentences.', beginning: 'Fewer than 4 sentences.' } },
                { dimension: 'Effort', descriptors: { excellent: 'Read out loud. Clear effort on pronunciation.', proficient: 'Some practice.', developing: 'Little practice.', beginning: 'Did not read aloud.' } }
              ]
            },
            {
              type: 'discussion',
              questions: [
                'Great job! Read your journal to someone today!'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'journal', definition: 'A book or document where you write about your day or your thoughts', example: 'I write in my journal every evening before bed.' },
      { term: 'entry', definition: 'One piece of writing in a journal or diary', example: 'Today\'s journal entry is about my trip to the market.' },
      { term: 'reflection', definition: 'Thinking deeply about something and writing or talking about it', example: 'In my reflection, I wrote about what I learned this week.' },
      { term: 'typical', definition: 'Normal, usual, what happens most days', example: 'A typical day for me starts at six thirty in the morning.' },
      { term: 'ordinary', definition: 'Normal, not special or unusual', example: 'Even ordinary days are gifts from God.' }
    ],
    quiz: []
  }
]

// ─── Word Count Helper ──────────────────────────────────────────────────────

function countWords(variant: PathwayVariant): number {
  let count = 0
  for (const phase of ['input', 'processing', 'output'] as const) {
    for (const block of variant.ipo[phase]) {
      const b = block as Record<string, unknown>
      for (const key of [
        'body', 'text', 'prompt', 'activity', 'instructions', 'description',
        'summary', 'connection', 'reflection', 'applicationQuestion', 'heading',
        'title', 'framework', 'scriptureRef', 'theme', 'Christ_connection',
        'source'
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
  console.log(`  Enrich English Foundations for French Speakers — Level 1 Units 1–3`)
  console.log(`  Course ID: ${COURSE_ID}`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no DB writes)' : 'LIVE (writing to DB)'}`)
  console.log(`${'='.repeat(70)}\n`)

  let totalUpdated = 0
  let totalSkipped = 0

  for (const unitNum of [1, 2, 3]) {
    const lessons = await prisma.lesson.findMany({
      where: { unit: { courseId: COURSE_ID, unitNumber: unitNum } },
      select: { id: true, title: true, weekNumber: true, type: true, content: true },
      orderBy: { weekNumber: 'asc' },
    })

    console.log(`\n  ── Unit ${unitNum}: Found ${lessons.length} lessons in DB ──\n`)

    const enrichedLessons = unitNum === 1 ? unit1Lessons : unitNum === 2 ? unit2Lessons : unit3Lessons

    for (const enriched of enrichedLessons) {
      const dbLesson = lessons.find(l => l.weekNumber === enriched.weekNumber)
      if (!dbLesson) {
        console.log(`  ⚠️ No lesson found for Unit ${unitNum} Week ${enriched.weekNumber}`)
        totalSkipped++
        continue
      }

      const content = dbLesson.content as Record<string, unknown>

      // Replace pathways, vocabulary, and quiz while preserving everything else
      const updated = {
        ...content,
        pathways: enriched.pathways,
        vocabulary: enriched.vocabulary,
        quiz: enriched.quiz,
      }

      // Report word counts
      for (const variant of enriched.pathways) {
        const wc = countWords(variant)
        console.log(`  [${variant.pathway}] U${unitNum}-W${enriched.weekNumber}: ~${wc} words`)
      }

      // Report vocab and quiz counts
      console.log(`  [CONTENT] U${unitNum}-W${enriched.weekNumber}: ${enriched.vocabulary.length} vocab, ${enriched.quiz.length} quiz Qs`)

      if (!DRY_RUN) {
        await prisma.lesson.update({
          where: { id: dbLesson.id },
          data: { content: updated },
        })
        console.log(`  ✅ Updated Unit ${unitNum} Week ${enriched.weekNumber}: ${dbLesson.title}`)
      } else {
        console.log(`  🔍 [DRY RUN] Would update Unit ${unitNum} Week ${enriched.weekNumber}: ${dbLesson.title}`)
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
