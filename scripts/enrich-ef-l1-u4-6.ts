#!/usr/bin/env tsx
/**
 * Enrich English Foundations for French Speakers Level 1 (A1->A2), Units 4-6
 *
 * Course: English Foundations for French Speakers
 * Units:
 *   Unit 4: "Getting Around" (W1-W4)
 *   Unit 5: "Actions and Activities" (W1-W4)
 *   Unit 6: "Health and Body" (W1-W4)
 *
 * All three pathways (ADVANCED, STANDARD, VOCATIONAL) for each lesson.
 * French-English contrastive approach with false cognates, pronunciation,
 * and structural interference corrections at A1-A2 level.
 * Biblical worldview woven into every lesson via the Grand Narrative.
 *
 * Usage:
 *   npx tsx scripts/enrich-ef-l1-u4-6.ts --dry-run
 *   npx tsx scripts/enrich-ef-l1-u4-6.ts
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
// UNIT 4: GETTING AROUND (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit4Lessons: EnrichedLesson[] = [
  // ── W1: Places in My Community ────────────────────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Places in My Community',
        estimatedMinutes: 60,
        objectives: [
          'Identify and use vocabulary for common community places in English.',
          'Use "there is" and "there are" correctly in sentences about locations.',
          'Recognize and avoid false cognates related to places (librairie, coin, magasin).',
          'Describe your community using English location vocabulary and sentence patterns.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Think about the places you visit in your neighborhood or town. You probably know the French words: l\'ecole, l\'hopital, le marche, l\'eglise. But do you know their English names? And did you know that some French words that LOOK like English words actually mean something completely different?',
              connection: 'God created us for community (Genesis 2:18). Every place in our neighborhood reflects His design for human flourishing. The school helps us grow in wisdom, the hospital provides healing, the church gathers us for worship, and the market provides for our needs. Learning to talk about these places in English helps us serve others in new communities.'
            },
            {
              type: 'reading',
              title: 'My Community: A Walking Tour',
              source: 'A1-A2 English Reading',
              text: 'My name is Jean-Pierre. I live in a small town. Let me show you the places in my community.\n\nFirst, there is a **school** near my house. Every morning, I walk to school. Next to the school, there is a **church**. On Sundays, my family goes to church to worship God.\n\nOn the main street, there is a **hospital**. The doctors and nurses there help sick people. Across from the hospital, there is a **market**. My mother buys fruits and vegetables at the market.\n\nThere is also a **library** in my town. Be careful! In French, "librairie" means a bookstore where you BUY books. But in English, a "library" is where you BORROW books for free. This is a false cognate — a word that looks the same but means something different!\n\nThere are two **stores** on my street. In French, you might say "magasin," and in English, we say "store" or "shop." There is a bakery and a pharmacy.\n\nAt the **corner** of the street, there is a park. In French, "coin" can mean corner, but in English, a "coin" is a piece of money! Another false cognate to remember.\n\nI love my community. There are many good places and good people here.'
            },
            {
              type: 'text',
              heading: 'There Is / There Are — Building Sentences About Places',
              body: 'In English, we use **"there is"** for ONE thing and **"there are"** for MORE THAN ONE thing.\n\n**Examples:**\n- **There is** a school in my town. (one school)\n- **There are** two hospitals in my city. (two hospitals)\n- **There is** a church on Main Street. (one church)\n- **There are** many stores in the market. (many stores)\n\n**French comparison:** In French, you use "il y a" for both singular and plural. You say "il y a une ecole" AND "il y a deux ecoles" — the verb does not change. But in English, you MUST change "is" to "are" when the noun is plural.\n\n**Common mistakes by French speakers:**\n- WRONG: "There is two hospitals." (using "is" with a plural noun)\n- CORRECT: "There are two hospitals."\n- WRONG: "It has a school near my house." (translating "il y a" as "it has")\n- CORRECT: "There is a school near my house."\n\n**Negative forms:**\n- There is **not** a library. / There **isn\'t** a library.\n- There are **not** any parks. / There **aren\'t** any parks.\n\n**Questions:**\n- **Is there** a hospital near here?\n- **Are there** any stores on this street?'
            },
            {
              type: 'text',
              heading: 'Watch Out! False Cognates for Places',
              body: '**False cognates** (faux amis) are words that look similar in French and English but have different meanings. Here are important ones for community places:\n\n| French Word | What It LOOKS Like | What It ACTUALLY Means in English |\n|---|---|---|\n| **librairie** | library | bookstore (a store where you buy books) |\n| **coin** | coin (money) | corner (in French, "le coin de la rue") |\n| **magasin** | magazine | store / shop |\n| **college** | college (university) | middle school (in French education) |\n\n**The correct English words:**\n- Bookstore = a store that sells books (French: librairie)\n- Library = a place to borrow books for free (French: bibliotheque)\n- Corner = where two streets meet (French: coin)\n- Coin = a round piece of metal money (French: piece de monnaie)\n- Store / Shop = a place to buy things (French: magasin)\n- Magazine = a publication you read (French: revue)\n\n**Pronunciation tips:**\n- "Library" = LY-breh-ree (3 syllables, stress on first)\n- "Hospital" = HOS-pih-tuhl (3 syllables, stress on first)\n- "Church" = the "ch" sounds like "tch" — NOT like French "ch" which sounds like "sh"'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Designed Us for Community',
              scriptureRef: 'Genesis 2:18; Hebrews 10:24-25',
              reflection: 'God said, "It is not good for man to be alone" (Genesis 2:18). God designed human beings to live together in communities. Every place in our community serves a purpose in God\'s plan. Schools help us grow in wisdom (Proverbs 4:7). Hospitals bring healing — and remind us that God is the ultimate Healer. Churches are where we gather to worship together, as Hebrews 10:25 tells us: "not giving up meeting together." Even the market reflects God\'s provision for our daily needs. When we learn to describe our community in English, we are better equipped to serve God\'s people wherever He sends us.',
              applicationQuestion: 'Which place in your community do you think best shows God\'s love for people? Why?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between a "library" and a "librairie"? How could confusing these words cause a problem?',
                'Why do you think English uses "there is" for singular and "there are" for plural, while French uses "il y a" for both? Which system seems easier to you?',
                'Read Genesis 2:18. How does your community reflect God\'s design for people to live together?'
              ]
            },
            {
              type: 'practice',
              activity: 'Community Description Practice',
              prompt: 'Write 8-10 sentences describing your town or neighborhood using "there is" and "there are." Include at least 6 different community places (school, hospital, church, market, library, store, park, etc.). Make sure to use the correct form: "there is" for singular, "there are" for plural. Then write 2 questions using "Is there...?" or "Are there...?" about places that might or might not exist in your community.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'False Cognate Challenge',
              prompt: 'Write a short paragraph (5-6 sentences) where you correctly use at least 3 of the English words that are false cognates with French: library, corner, store, coin, magazine. Then write a "Warning Guide for French Speakers" — a list of 4 false cognates with the French word, what it looks like in English, and what it actually means.'
            },
            {
              type: 'discussion',
              questions: [
                'Teach a classmate about one false cognate. Explain why it is tricky and how to remember the correct English word.',
                'Describe a place in your community that you are thankful for. Use "there is/there are" in your description and explain how this place helps people.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Places in My Community',
        estimatedMinutes: 45,
        objectives: [
          'Learn vocabulary for common community places in English.',
          'Use "there is" and "there are" in sentences about your community.',
          'Identify common false cognates between French and English for places.',
          'Write simple sentences describing places in your neighborhood.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You know your neighborhood well in French. But can you describe it in English? Today we will learn the English words for the places around you — and discover some tricky words that look like French but mean something different!',
              connection: 'God created us for community (Genesis 2:18). Every place in our neighborhood — the school, the hospital, the church, the market — shows God\'s care for people. Learning English words for these places helps us connect with more people around the world.'
            },
            {
              type: 'reading',
              title: 'Places Around Town',
              source: 'A1 English Reading',
              text: 'Look at the places in my town:\n\nThere is a **school**. Children learn there.\nThere is a **church**. People worship God there.\nThere is a **hospital**. Doctors help sick people there.\nThere is a **market**. People buy food there.\nThere is a **library**. People borrow books there.\n\nCareful! In French, "librairie" means bookstore. In English, "library" means a place to borrow books for FREE. They are not the same!\n\nThere are **stores** on Main Street. In French, "magasin" sounds like "magazine" in English, but "magasin" means "store."\n\nAt the **corner** of the street, there is a park. In French, "coin" means corner. In English, "coin" means a piece of money. Be careful!\n\nThere are many places in my community. I am thankful for all of them.'
            },
            {
              type: 'text',
              heading: 'There Is / There Are',
              body: 'Use **"there is"** for ONE thing. Use **"there are"** for MORE THAN ONE thing.\n\n**Examples:**\n- There **is** a school. (one school)\n- There **are** two stores. (two stores)\n- There **is** a park near my house.\n- There **are** many people at the market.\n\n**In French:** You say "il y a" for everything. In English, you must choose: "is" or "are."\n\n**Common mistake:**\n- WRONG: "There is two hospitals."\n- CORRECT: "There **are** two hospitals."\n\n**Questions:**\n- **Is there** a library near here?\n- **Are there** any stores?'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Design for Community',
              scriptureRef: 'Genesis 2:18; Hebrews 10:25',
              reflection: 'God said, "It is not good for man to be alone" (Genesis 2:18). God designed us to live with other people. Our communities have schools for learning, hospitals for healing, churches for worship, and markets for daily needs. Each place shows God\'s love and care for people.',
              applicationQuestion: 'What is your favorite place in your community? How does it help people?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "library" (English) and "librairie" (French)?',
                'Why is it important to use "there is" for one thing and "there are" for many things?'
              ]
            },
            {
              type: 'practice',
              activity: 'Describe Your Town',
              prompt: 'Write 6 sentences about your town or neighborhood. Use "there is" for singular places and "there are" for plural places. Include at least 4 different community places. Example: "There is a big church on my street. There are three stores near the market."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'False Cognate Matching',
              prompt: 'Match the French word with its TRUE English meaning:\n1. librairie → _____ (bookstore / library)\n2. coin → _____ (corner / money)\n3. magasin → _____ (store / magazine)\n\nThen write 3 sentences using the correct English word for each.'
            },
            {
              type: 'discussion',
              questions: [
                'Tell a partner about 3 places in your community using "there is" or "there are."',
                'Which false cognate do you think is the trickiest? Why?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Places in My Community',
        estimatedMinutes: 35,
        objectives: [
          'Learn English words for places in the community.',
          'Use "there is" and "there are" in simple sentences.',
          'Know 3 false cognates for community places.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Where do you go every day? School? The market? Church? Let\'s learn how to say these places in English!',
              connection: 'God made us to live together. Every place in our neighborhood — school, church, hospital, market — shows God\'s love for people (Genesis 2:18).'
            },
            {
              type: 'reading',
              title: 'My Neighborhood',
              source: 'A1 English Reading',
              text: 'There is a **school** in my town. I go to school every day.\nThere is a **church**. My family goes on Sunday.\nThere is a **hospital**. Doctors help people there.\nThere is a **market**. We buy food there.\nThere are **stores** on the street.\n\n**Be careful!**\n- French "librairie" = English "bookstore" (NOT library!)\n- French "coin" = English "corner" (NOT coin/money!)\n- French "magasin" = English "store" (NOT magazine!)'
            },
            {
              type: 'text',
              heading: 'There Is / There Are',
              body: '**There is** = ONE thing\n**There are** = MORE THAN ONE thing\n\n- There **is** a school. (1 school)\n- There **are** two stores. (2 stores)\n\n**At work:** You need these words to give directions.\n- "There is a pharmacy on the corner."\n- "There are two restaurants near the office."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Community and God\'s Care',
              scriptureRef: 'Genesis 2:18',
              reflection: 'God said people should not be alone. Every place in our community helps us live together. Schools teach us. Hospitals heal us. Churches help us worship. Markets feed us. God provides through our community.',
              applicationQuestion: 'What place in your community helps you the most?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the English word for the place where you borrow books? (library, NOT librairie!)',
                'When do you use "there is" and when do you use "there are"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Fill in the Blanks',
              prompt: 'Complete these sentences with "there is" or "there are":\n1. _____ a school near my house.\n2. _____ three stores on Main Street.\n3. _____ a hospital in my town.\n4. _____ many people at the market.\n5. _____ a church on the corner.\n\nThen write 3 of your own sentences about places near your home.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Draw and Label',
              prompt: 'Draw a simple map of your neighborhood (or describe it in words). Label at least 5 places in English: school, church, hospital, market, store, library, park, etc. Write one sentence about each place using "there is" or "there are."'
            },
            {
              type: 'discussion',
              questions: [
                'Point to a place on your map and say a sentence about it in English.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'school', definition: 'A place where children learn (French: ecole)', example: 'There is a school near my house.' },
      { term: 'hospital', definition: 'A place where doctors help sick people (French: hopital)', example: 'There is a hospital in my town.' },
      { term: 'market', definition: 'A place where people buy and sell food (French: marche)', example: 'My mother buys vegetables at the market.' },
      { term: 'church', definition: 'A place where people worship God (French: eglise)', example: 'There is a church on Main Street.' },
      { term: 'library', definition: 'A place where you borrow books for free — NOT a bookstore! (False cognate: French "librairie" = bookstore)', example: 'I borrow books from the library every week.' },
      { term: 'store', definition: 'A place where you buy things (False cognate: French "magasin" looks like "magazine")', example: 'There are two stores on my street.' },
      { term: 'corner', definition: 'The point where two streets meet (False cognate: French "coin" = corner, but English "coin" = money)', example: 'The pharmacy is on the corner.' },
      { term: 'there is / there are', definition: '"There is" for one thing, "there are" for more than one. In French, "il y a" is used for both.', example: 'There is a park. There are three schools.' }
    ],
    quiz: [
      { question: 'What does the English word "library" mean?', options: ['A bookstore where you buy books', 'A place where you borrow books for free', 'A magazine shop', 'A reading room in a school'], correctAnswer: 1, explanation: 'A library is where you borrow books for free. The French "librairie" means bookstore — this is a false cognate!' },
      { question: 'Choose the correct sentence:', options: ['There is two hospitals in my city.', 'There are two hospitals in my city.', 'It has two hospitals in my city.', 'There have two hospitals in my city.'], correctAnswer: 1, explanation: '"There are" is used with plural nouns. "Two hospitals" is plural, so we say "there are."' },
      { question: 'The French word "coin" means _____ in English.', options: ['coin (money)', 'corner', 'store', 'community'], correctAnswer: 1, explanation: 'French "coin" means "corner" in English. The English word "coin" means a piece of money — this is a false cognate.' },
      { question: 'Which sentence is correct?', options: ['There is a church on my street.', 'There are a church on my street.', 'It has a church on my street.', 'There is churches on my street.'], correctAnswer: 0, explanation: '"A church" is singular (one church), so we use "there is."' },
      { question: 'The French word "magasin" means _____ in English.', options: ['magazine', 'market', 'store', 'corner'], correctAnswer: 2, explanation: 'French "magasin" means "store" or "shop" in English. The English word "magazine" is a publication you read.' },
      { question: 'How do you ask if a place exists nearby?', options: ['Has there a hospital?', 'There is a hospital?', 'Is there a hospital near here?', 'It has a hospital near here?'], correctAnswer: 2, explanation: 'To ask a question, invert the word order: "Is there a hospital near here?"' },
      { question: 'Choose the correct negative sentence:', options: ['There not is a library.', 'There isn\'t a library in my town.', 'There no is a library.', 'It doesn\'t have a library.'], correctAnswer: 1, explanation: 'The correct negative form is "there isn\'t" (there is not) for singular nouns.' },
      { question: 'What does Genesis 2:18 teach us about community?', options: ['People should live alone.', 'It is not good for man to be alone.', 'Communities are not important.', 'God wants people to stay in one place.'], correctAnswer: 1, explanation: 'God said, "It is not good for man to be alone." God designed us to live in community with others.' },
      { question: '_____ any parks in your neighborhood?', options: ['Is there', 'Are there', 'Has there', 'Does there'], correctAnswer: 1, explanation: '"Parks" is plural, so we use "Are there" to form the question.' },
      { question: 'A French speaker says "I went to the librairie to borrow a book." What is wrong?', options: ['Nothing — the sentence is correct.', '"Librairie" means bookstore in French; they should say "library" in English.', '"Librairie" means school in French.', 'You cannot borrow books in English.'], correctAnswer: 1, explanation: '"Librairie" in French means bookstore. To borrow books, you go to a "library" in English. This is a common false cognate error.' }
    ]
  },

  // ── W2: Directions and Transportation ─────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Directions and Transportation',
        estimatedMinutes: 60,
        objectives: [
          'Give and follow directions using English prepositions and imperatives.',
          'Use transportation vocabulary correctly in context.',
          'Understand prepositions of movement (through, along, across, past).',
          'Write clear directions from one place to another.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine a visitor comes to your town and asks, "How do I get to the hospital?" Could you explain the way in English? Giving directions requires special words — imperatives (commands) and prepositions of movement. Today you will learn to guide people through your community in English.',
              connection: 'In the Bible, God often gives His people directions — where to go and how to get there. He told Abraham, "Go to the land I will show you" (Genesis 12:1). Learning to give clear directions in English allows us to serve others by helping them find their way, just as God guides us on our path.'
            },
            {
              type: 'reading',
              title: 'Getting to the Market',
              source: 'A1-A2 English Reading',
              text: 'Tourist: Excuse me, how do I get to the market?\n\nJean: Sure! **Go straight** on this road for two blocks. Then **turn left** at the church. **Walk past** the school. The market is **on your right**, **across from** the hospital.\n\nTourist: Is it far? Can I walk?\n\nJean: Yes, it is about a 10-minute **walk**. Or you can take a **bus**. The **bus stop** is right there, **on the corner**.\n\nTourist: Which bus do I take?\n\nJean: Take **bus number 5**. It goes **along** Main Street and stops **in front of** the market.\n\nTourist: Thank you so much!\n\nJean: You\'re welcome! You can also take a **taxi** if you prefer. There is a **taxi stand** **across** the street.\n\n**Key direction words:**\n- Go straight, turn left, turn right\n- Walk past (= go beyond something)\n- On your left / on your right\n- Across from (= on the other side)\n- In front of / behind / next to / between'
            },
            {
              type: 'text',
              heading: 'Imperative Sentences for Directions',
              body: 'When giving directions, we use **imperative sentences** — commands that tell someone what to do. In English, imperatives start with the base verb (no subject needed).\n\n**Examples:**\n- **Go** straight for two blocks.\n- **Turn** left at the corner.\n- **Walk** past the school.\n- **Take** the bus to the market.\n- **Cross** the street at the light.\n\n**French comparison:** Imperatives work similarly in French ("Tournez a gauche," "Allez tout droit"), so this structure should feel familiar. However, in English, we do NOT use "you" at the beginning of a polite command. We just start with the verb.\n\n- WRONG: "You turn left." (This sounds like a statement, not a direction.)\n- CORRECT: "Turn left."\n\n**Prepositions of movement** describe HOW you move:\n- **through** = moving in one side and out the other ("Walk through the park.")\n- **along** = following beside something ("Walk along the river.")\n- **across** = from one side to the other ("Walk across the bridge.")\n- **past** = going beyond something ("Walk past the church.")\n- **around** = circling something ("Go around the building.")\n\n**French interference alert:** French speakers sometimes confuse "in" and "on" for transportation:\n- You ride **on** a bus (NOT "in" a bus)\n- You ride **in** a car or taxi\n- You ride **on** a bicycle or motorcycle'
            },
            {
              type: 'text',
              heading: 'Transportation Vocabulary',
              body: '**Common transportation words:**\n- **walk** (marcher) — "I walk to school every day."\n- **bus** (autobus) — "Take the bus to the market."\n- **taxi** (taxi) — "The taxi is expensive."\n- **car** (voiture) — "My father drives a car."\n- **bicycle / bike** (velo) — "I ride my bicycle to the park."\n- **motorcycle** (moto) — "There are many motorcycles in the city."\n- **boat** (bateau) — "We take a boat across the river."\n\n**Useful phrases:**\n- "How do I get to...?" (Comment est-ce que je vais a...?)\n- "Is it far?" (C\'est loin?)\n- "How long does it take?" (Combien de temps ca prend?)\n- "Where is the bus stop?" (Ou est l\'arret de bus?)\n\n**Pronunciation tip:** "Walk" is pronounced /wawk/ — the "l" is SILENT. French speakers often pronounce the "l" because in French, most letters are pronounced. Remember: walk, talk, half, calm — the "l" is silent in all of these!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Guides Our Path',
              scriptureRef: 'Genesis 12:1; Proverbs 3:5-6; Psalm 119:105',
              reflection: 'The Bible is full of direction language. God told Abraham, "Go to the land I will show you" (Genesis 12:1). Psalm 119:105 says, "Your word is a lamp to my feet and a light to my path." Proverbs 3:5-6 promises, "Trust in the Lord... and He will direct your paths." Just as we learn to give directions to help others find physical places, God gives us His Word to guide us through life. When we help someone find their way, we reflect God\'s character as the ultimate Guide.',
              applicationQuestion: 'How is giving someone directions similar to how God guides us through His Word?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "through," "along," and "across"? Can you give an example for each using places in your community?',
                'Why do English imperative sentences NOT start with "you"? How is this different from or similar to French imperatives?',
                'Read Proverbs 3:5-6. How does God "direct our paths"? What kind of directions does He give us?'
              ]
            },
            {
              type: 'practice',
              activity: 'Direction Writing Challenge',
              prompt: 'Write directions from your home (or school) to three different places in your community. For each set of directions:\n1. Use at least 3 imperative sentences (Go, Turn, Walk, Cross, Take).\n2. Use at least 2 prepositions of movement (through, along, across, past, around).\n3. Include at least 1 transportation option.\n\nExample: "To get to the hospital from my house, go straight on Rue Principale for three blocks. Turn right at the church. Walk past the school. The hospital is on your left, across from the park. You can also take bus number 3 — the bus stop is on the corner near the church."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Tourist Dialogue',
              prompt: 'Write a dialogue (10-14 lines) between a tourist and a local person. The tourist asks for directions to TWO different places. The local person gives clear directions using imperative sentences, prepositions of movement, and transportation vocabulary. Include at least one polite phrase ("Excuse me," "Thank you," "You\'re welcome").'
            },
            {
              type: 'discussion',
              questions: [
                'Practice giving directions out loud: How do you get from the school to the nearest store? Use at least 3 direction words.',
                'Which preposition of movement is hardest for you to remember? Create a sentence using it.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Directions and Transportation',
        estimatedMinutes: 45,
        objectives: [
          'Give simple directions using imperative sentences.',
          'Use basic prepositions of place and movement.',
          'Learn transportation vocabulary in English.',
          'Follow and write simple directions to a place.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'If someone asked you, "How do I get to the school?" could you explain in English? Today we learn direction words so you can help people find their way!',
              connection: 'God guides us through life, just as we guide others with directions. Proverbs 3:6 says, "He will direct your paths." Learning to give directions helps us serve others.'
            },
            {
              type: 'reading',
              title: 'Asking for Directions',
              source: 'A1 English Reading',
              text: 'Marie: Excuse me, how do I get to the school?\n\nPaul: **Go straight** on this road. **Turn left** at the church. The school is **on your right**.\n\nMarie: Is it far?\n\nPaul: No, it is a 5-minute **walk**. You can also take a **bus**. The **bus stop** is over there.\n\nMarie: Thank you!\n\nPaul: You\'re welcome!\n\n**Direction words:** go straight, turn left, turn right, walk past, on your left, on your right, across from, next to'
            },
            {
              type: 'text',
              heading: 'Giving Directions in English',
              body: '**Imperative sentences** start with the verb — they are commands.\n- **Go** straight.\n- **Turn** left. / **Turn** right.\n- **Walk** past the school.\n- **Cross** the street.\n- **Take** the bus.\n\n**Prepositions of place:**\n- **on** the corner, **on** your left/right\n- **next to** the school\n- **across from** the hospital\n- **between** the store and the church\n- **in front of** the market\n\n**Transportation:**\n- walk, bus, taxi, car, bicycle, motorcycle, boat\n\n**Remember:** "Walk" — the "l" is silent! Say /wawk/.'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Directs Our Path',
              scriptureRef: 'Proverbs 3:5-6',
              reflection: 'Proverbs 3:5-6 says, "Trust in the Lord with all your heart... and He will direct your paths." God gives us direction in life through His Word. When we help someone find a place, we show kindness — just as God shows us the way.',
              applicationQuestion: 'How can you help someone who is lost, either physically or spiritually?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "on your left" and "on your right"?',
                'How do you say "go straight" and "turn left" in English? Practice saying them.'
              ]
            },
            {
              type: 'practice',
              activity: 'Write Directions',
              prompt: 'Write directions from your school to 2 places in your town. Use these words: go straight, turn left/right, walk past, on your left/right. Include at least one form of transportation.\n\nExample: "Go straight on Main Street. Turn right at the church. Walk past the park. The hospital is on your left."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Short Dialogue',
              prompt: 'Write a short dialogue (6-8 lines) where someone asks for directions and another person gives them. Use at least 3 direction words and 1 transportation word.'
            },
            {
              type: 'discussion',
              questions: [
                'Give directions from your desk to the door using English direction words.',
                'What transportation do you use most? Say a sentence about it in English.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Directions and Transportation',
        estimatedMinutes: 35,
        objectives: [
          'Learn basic direction words in English.',
          'Give simple directions to one place.',
          'Know English words for common transportation.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Someone asks you, "Where is the market?" Can you help them? Let\'s learn how to give directions in English!',
              connection: 'God helps us find our way in life. Proverbs 3:6 says He "will direct your paths." We can help others find their way too.'
            },
            {
              type: 'reading',
              title: 'Simple Directions',
              source: 'A1 English Reading',
              text: 'A: Where is the market?\nB: **Go straight**. **Turn left**. The market is **on your right**.\n\nA: Thank you!\nB: You\'re welcome!\n\n**Direction words:**\n- Go straight\n- Turn left / Turn right\n- On your left / On your right\n- Next to / Across from'
            },
            {
              type: 'text',
              heading: 'Directions and Transportation',
              body: '**How to give directions:**\n- **Go straight** = walk forward\n- **Turn left** = go to the left side\n- **Turn right** = go to the right side\n\n**Transportation words:**\n- walk, bus, taxi, car, bicycle, boat\n\n**At work:** Giving directions is important. Customers, visitors, or coworkers may ask you: "Where is the office?" or "How do I get to the store?"'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Shows Us the Way',
              scriptureRef: 'Proverbs 3:6',
              reflection: 'God directs our paths. When we help someone find a place, we show love — just like God shows us where to go in life.',
              applicationQuestion: 'How can you help someone who is lost?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What does "go straight" mean? What does "turn left" mean?',
                'What transportation do you use every day?'
              ]
            },
            {
              type: 'practice',
              activity: 'Give Directions',
              prompt: 'Give directions from your home to the nearest store. Use "go straight," "turn left," or "turn right." Write 3-4 sentences.\n\nExample: "Go straight on my street. Turn right. The store is on your left."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Match and Practice',
              prompt: 'Match the English word to its meaning:\n1. Go straight → _____\n2. Turn left → _____\n3. Bus stop → _____\n4. Across from → _____\n\nChoices: a place to wait for the bus / walk forward / go to the left / on the other side\n\nThen say directions from your desk to the classroom door.'
            },
            {
              type: 'discussion',
              questions: [
                'Give directions from the classroom to one place in the school. Use 2-3 direction words.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'go straight', definition: 'Walk forward without turning (French: allez tout droit)', example: 'Go straight on Main Street for two blocks.' },
      { term: 'turn left / turn right', definition: 'Change direction to the left or right side (French: tournez a gauche / a droite)', example: 'Turn left at the church.' },
      { term: 'across from', definition: 'On the other side of the street or space (French: en face de)', example: 'The market is across from the hospital.' },
      { term: 'bus stop', definition: 'The place where you wait for a bus (French: arret de bus)', example: 'The bus stop is on the corner.' },
      { term: 'walk', definition: 'To move on foot (French: marcher). Note: the "l" is SILENT — say /wawk/', example: 'I walk to school every day.' },
      { term: 'past', definition: 'Going beyond something (French: devant / en passant devant)', example: 'Walk past the school and the market is on your right.' },
      { term: 'through', definition: 'Moving in one side and out the other (French: a travers)', example: 'Walk through the park to get to the church.' },
      { term: 'next to', definition: 'Beside, very close to (French: a cote de)', example: 'The pharmacy is next to the hospital.' }
    ],
    quiz: [
      { question: 'What does "go straight" mean?', options: ['Turn around', 'Walk forward without turning', 'Stop walking', 'Go to the right'], correctAnswer: 1, explanation: '"Go straight" means to walk forward in the same direction without turning.' },
      { question: 'Choose the correct imperative sentence for giving directions:', options: ['You turn left at the corner.', 'Turn left at the corner.', 'Turning left at the corner.', 'Left turn at the corner.'], correctAnswer: 1, explanation: 'Imperative sentences start with the base verb — no subject needed. "Turn left at the corner."' },
      { question: '"The hospital is _____ the school." (They are on opposite sides of the street.)', options: ['next to', 'behind', 'across from', 'between'], correctAnswer: 2, explanation: '"Across from" means on the other side of the street, facing each other.' },
      { question: 'How is the "l" pronounced in the word "walk"?', options: ['It is pronounced clearly, like in French', 'It is silent — say /wawk/', 'It sounds like "r"', 'It is pronounced like "w"'], correctAnswer: 1, explanation: 'In "walk," the "l" is silent. English has many silent letters that French speakers need to learn.' },
      { question: 'Which preposition means "moving in one side and out the other"?', options: ['along', 'past', 'through', 'around'], correctAnswer: 2, explanation: '"Through" means going in one side and coming out the other side, like "walk through the park."' },
      { question: 'You ride _____ a bus. (Choose the correct preposition.)', options: ['in', 'on', 'at', 'by'], correctAnswer: 1, explanation: 'In English, you ride "on" a bus (and "on" a train), but "in" a car or taxi.' },
      { question: '"Excuse me, _____ do I get to the market?"', options: ['what', 'where', 'how', 'when'], correctAnswer: 2, explanation: '"How do I get to...?" is the standard way to ask for directions in English.' },
      { question: 'What did God tell Abraham in Genesis 12:1?', options: ['Stay where you are.', 'Go to the land I will show you.', 'Build a hospital.', 'Do not travel.'], correctAnswer: 1, explanation: 'God directed Abraham to go to a new land, showing that God guides His people\'s paths.' },
      { question: '"Walk _____ the school" means go beyond the school without stopping.', options: ['through', 'along', 'past', 'across'], correctAnswer: 2, explanation: '"Walk past" means to go beyond something — the school is behind you after you pass it.' },
      { question: 'Which sentence gives a direction correctly?', options: ['The market you go straight and left turn.', 'Go straight and turn left. The market is on your right.', 'Straight go and left is market.', 'You must to go straight for the market.'], correctAnswer: 1, explanation: 'Correct directions use imperative verbs in order: "Go straight and turn left. The market is on your right."' }
    ]
  },

  // ── W3: Shopping and Money ────────────────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Shopping and Money',
        estimatedMinutes: 60,
        objectives: [
          'Use "how much" and "how many" correctly with countable and uncountable nouns.',
          'Conduct polite shopping dialogues in English with correct pricing language.',
          'Identify and avoid the false cognate "monnaie" (change, not money).',
          'Compare English and French number systems in the context of prices.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you are at a market and you want to buy some fruit. In French, you might ask "Combien ca coute?" But in English, do you say "How much?" or "How many?" The answer depends on what you are counting! And be careful — "monnaie" in French does NOT mean "money" in English. Let\'s learn the language of shopping.',
              connection: 'God cares about how we handle money. Proverbs 11:1 says, "A false balance is an abomination to the Lord, but a just weight is His delight." Honest transactions — whether buying bread at the market or negotiating a business deal — reflect God\'s character. Learning to shop politely and honestly in English is a way to honor God in everyday life.'
            },
            {
              type: 'reading',
              title: 'At the Market',
              source: 'A1-A2 English Reading',
              text: 'Customer: Good morning! **How much** is this bread?\n\nVendor: It is **two dollars and fifty cents** ($2.50).\n\nCustomer: And **how much** are the tomatoes?\n\nVendor: They are **one dollar** per pound.\n\nCustomer: I\'d like **three pounds** of tomatoes, please.\n\nVendor: That will be **three dollars** for the tomatoes and **two fifty** for the bread. The **total** is **five dollars and fifty cents**.\n\nCustomer: Here is **ten dollars**.\n\nVendor: And here is your **change** — **four dollars and fifty cents**.\n\nCustomer: Thank you!\n\nVendor: You\'re welcome! Have a nice day.\n\n**Key vocabulary:**\n- How much (for price or uncountable nouns)\n- How many (for countable nouns)\n- Total, change, dollars, cents\n- "I\'d like..." = polite way to say "I want"'
            },
            {
              type: 'text',
              heading: 'How Much vs. How Many — A Critical Distinction',
              body: 'English divides nouns into **countable** and **uncountable**. This changes which question word you use:\n\n**HOW MANY** = countable nouns (things you can count one by one)\n- How many **apples** do you want? (1 apple, 2 apples, 3 apples...)\n- How many **eggs** do we need?\n- How many **students** are in the class?\n\n**HOW MUCH** = uncountable nouns (things you cannot count individually)\n- How much **water** do you want? (NOT "how many waters")\n- How much **rice** do we need?\n- How much **money** do you have?\n\n**HOW MUCH** is ALSO used for prices:\n- How much **is** this shirt? (What is the price?)\n- How much **are** these shoes?\n\n**French comparison:** French does not have this distinction in the same way. You use "combien" for both. But in English, you MUST choose.\n\n**Common mistakes by French speakers:**\n- WRONG: "How many money do you have?" (money is uncountable)\n- CORRECT: "How much money do you have?"\n- WRONG: "How much apples do you want?" (apples are countable)\n- CORRECT: "How many apples do you want?"\n\n**Polite shopping phrases:**\n- "I\'d like..." (NOT "I want" — too direct)\n- "Could I have...?" (very polite)\n- "How much does this cost?"\n- "Here you go." (when handing over money)\n- "Do you have change for a twenty?"'
            },
            {
              type: 'text',
              heading: 'False Cognate Alert: Monnaie ≠ Money',
              body: '**The biggest false cognate in shopping:**\n\n| French | English Translation |\n|---|---|\n| **monnaie** | **change** (the coins you get back after paying) |\n| **argent** | **money** (the general word for cash, funds) |\n\nIn French, "monnaie" means the small coins or the change you receive. But in English, "money" means ALL forms of payment — cash, coins, bills, bank funds.\n\n- French: "Vous avez de la monnaie?" = "Do you have **change**?" (small coins)\n- English: "Do you have **money**?" = Do you have funds to pay?\n\n**Number system comparison:**\n\nFrench numbers above 70 are structured differently from English:\n- 70 in French = soixante-dix (sixty-ten) → English: seventy\n- 80 in French = quatre-vingts (four-twenties) → English: eighty\n- 90 in French = quatre-vingt-dix (four-twenty-ten) → English: ninety\n\nEnglish numbers are more regular: seventy, eighty, ninety follow a clear pattern.\n\n**Saying prices in English:**\n- $2.50 = "two dollars and fifty cents" OR "two fifty"\n- $10.99 = "ten ninety-nine" OR "ten dollars and ninety-nine cents"\n- $0.75 = "seventy-five cents"'
            },
            {
              type: 'biblical-worldview',
              theme: 'Honesty in Business',
              scriptureRef: 'Proverbs 11:1; Proverbs 22:7; Luke 16:10-11',
              reflection: 'God cares deeply about how we handle money. Proverbs 11:1 says, "A false balance is an abomination to the Lord, but a just weight is His delight." This means God hates cheating in business but loves honest transactions. Luke 16:10 teaches, "Whoever is faithful in a very little is faithful also in much." Even small purchases at the market are opportunities to practice honesty, generosity, and fairness. As Christians, our shopping behavior should reflect God\'s character — paying fairly, speaking politely, and treating vendors and customers with respect.',
              applicationQuestion: 'How can being honest and polite when shopping reflect your faith in God?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why is the distinction between "how much" and "how many" important? What happens if you mix them up?',
                'Explain the difference between French "monnaie" and English "money." Give an example of when confusing them could cause a misunderstanding.',
                'Read Proverbs 11:1. What does "a just weight" look like in modern shopping? How can we be honest in our buying and selling?'
              ]
            },
            {
              type: 'practice',
              activity: 'Shopping Dialogue Practice',
              prompt: 'Write a complete shopping dialogue (12-16 lines) between a customer and a vendor at a market or store. Your dialogue must include:\n1. At least 2 uses of "how much" and 1 use of "how many"\n2. Specific prices with correct English number format\n3. The words "change" and "total"\n4. At least 2 polite phrases ("I\'d like," "Could I have," "please," "thank you")\n5. At least 5 different items being discussed or purchased\n\nAfter your dialogue, write 2 sentences explaining why "monnaie" and "money" are false cognates.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'How Much or How Many?',
              prompt: 'Complete each sentence with "how much" or "how many," then write your own example for each:\n1. _____ oranges do we need?\n2. _____ does this shirt cost?\n3. _____ water is in the bottle?\n4. _____ students are in your class?\n5. _____ sugar do we need for the recipe?\n6. _____ books did you buy?\n\nThen write a "Shopping Tips for French Speakers" guide with 5 tips about avoiding common mistakes when shopping in English (false cognates, how much/how many, polite phrases, numbers, etc.).'
            },
            {
              type: 'discussion',
              questions: [
                'Role-play: You are at a store. Ask the price of 3 items, buy 2 of them, and count your change. Use correct English.',
                'How does Proverbs 22:7 ("The borrower is slave to the lender") relate to wise money management? How can learning about money in English help you in life?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Shopping and Money',
        estimatedMinutes: 45,
        objectives: [
          'Use "how much" and "how many" in shopping situations.',
          'Learn polite shopping phrases in English.',
          'Understand the false cognate "monnaie" (change, not money).',
          'Practice saying prices in English.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you go shopping, you need to ask about prices and count your money. In English, do you say "how much" or "how many"? It depends on what you are talking about! Let\'s learn the language of shopping.',
              connection: 'God wants us to be honest with money (Proverbs 11:1). When we shop politely and pay fairly, we honor God in our everyday life.'
            },
            {
              type: 'reading',
              title: 'A Simple Shopping Trip',
              source: 'A1 English Reading',
              text: 'Customer: **How much** is this bread?\nVendor: It is **two dollars**.\n\nCustomer: And **how many** bananas can I get for one dollar?\nVendor: You can get **three** bananas.\n\nCustomer: I\'d like the bread and three bananas, please.\nVendor: That is **three dollars** total.\n\nCustomer: Here is **five dollars**.\nVendor: Here is your **change** — **two dollars**.\n\n**Remember:**\n- "How much" = price or things you can\'t count (water, rice, money)\n- "How many" = things you can count (bananas, eggs, books)\n- "Change" = the money you get back (French "monnaie" = change, NOT money!)'
            },
            {
              type: 'text',
              heading: 'How Much vs. How Many',
              body: '**How much** = for prices and uncountable things\n- How much is this? (price)\n- How much water do you want? (uncountable)\n- How much money do you have? (uncountable)\n\n**How many** = for things you can count\n- How many apples? (1, 2, 3...)\n- How many eggs? (countable)\n\n**Polite phrases for shopping:**\n- "I\'d like..." (polite way to say "I want")\n- "Could I have...?"\n- "How much does this cost?"\n- "Thank you. Have a nice day!"\n\n**False cognate:** French "monnaie" = English "change" (NOT money!)\n- "Here is your change" = "Voici votre monnaie"\n- "Money" in English = "argent" in French'
            },
            {
              type: 'biblical-worldview',
              theme: 'Honesty with Money',
              scriptureRef: 'Proverbs 11:1; Luke 16:10',
              reflection: 'God says a "just weight" is His delight (Proverbs 11:1). This means He loves honest buying and selling. Luke 16:10 says, "Whoever is faithful in little is faithful in much." Even paying the right price at the market shows our faith in God.',
              applicationQuestion: 'Why does God care about how we use money?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'When do you use "how much" and when do you use "how many"? Give one example of each.',
                'What is the difference between English "money" and French "monnaie"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Shopping Dialogue',
              prompt: 'Write a shopping dialogue (8-10 lines) between a customer and a vendor. Include:\n1. At least 1 "how much" and 1 "how many"\n2. At least 2 prices in English\n3. The word "change"\n4. At least 1 polite phrase\n\nExample start: "Customer: Good morning! How much are the oranges?"'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Fill in How Much / How Many',
              prompt: 'Complete with "how much" or "how many":\n1. _____ is this book?\n2. _____ apples do you want?\n3. _____ water do we have?\n4. _____ students are here?\n5. _____ does a bus ticket cost?\n\nThen write 3 shopping sentences using prices in English.'
            },
            {
              type: 'discussion',
              questions: [
                'Role-play: Buy 2 items at a store. Ask the price, pay, and get your change. Use English.',
                'What polite phrase should you use instead of "I want"?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Shopping and Money',
        estimatedMinutes: 35,
        objectives: [
          'Ask "how much" for prices in English.',
          'Use polite shopping phrases.',
          'Know that French "monnaie" means "change" in English.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You are at a store. You want to know the price. In English, you ask: "How much is this?" Let\'s learn to shop in English!',
              connection: 'God wants us to be honest with money. Proverbs 11:1 says honest business makes God happy.'
            },
            {
              type: 'reading',
              title: 'At the Store',
              source: 'A1 English Reading',
              text: 'Customer: **How much** is this bread?\nVendor: It is **two dollars**.\nCustomer: I\'d like one, please.\nVendor: Here you go. That is two dollars.\nCustomer: Here is five dollars.\nVendor: Here is your **change**: three dollars.\n\n**Remember:** "Change" = the money you get back. French "monnaie" = English "change" (NOT "money"!)'
            },
            {
              type: 'text',
              heading: 'Shopping Words',
              body: '**Asking the price:**\n- "How much is this?" = What is the price?\n- "How much are these?" = Price for plural items\n\n**Polite words:**\n- "I\'d like..." = I want (polite)\n- "Please" and "Thank you"\n\n**Money words:**\n- dollars, cents, total, change\n- $1.50 = "one dollar and fifty cents" or "one fifty"\n\n**At work:** If you work in a store, you need these words every day!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Be Honest with Money',
              scriptureRef: 'Proverbs 11:1',
              reflection: 'God loves honesty in business. When we pay the right price and give correct change, we honor God.',
              applicationQuestion: 'Why is it important to be honest when buying and selling?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you ask the price of something in English?',
                'What is the polite way to say "I want bread" in English?'
              ]
            },
            {
              type: 'practice',
              activity: 'Simple Shopping Practice',
              prompt: 'Complete the dialogue:\nCustomer: How much is this _____?\nVendor: It is _____ dollars.\nCustomer: I\'d like one, _____.\nVendor: Here you go. Your _____ is _____ dollars.\n\nThen write your own 4-line shopping dialogue.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Price Practice',
              prompt: 'Write these prices in English words:\n1. $3.00 = _____\n2. $5.50 = _____\n3. $10.25 = _____\n4. $0.75 = _____\n\nThen practice: Ask "How much is this?" for 3 items in the classroom.'
            },
            {
              type: 'discussion',
              questions: [
                'Practice: Buy something from a classmate. Ask the price, pay, and get change.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'how much', definition: 'Used to ask about price or uncountable things (French: combien — for price or quantity of uncountable nouns)', example: 'How much is this bread? How much water do you want?' },
      { term: 'how many', definition: 'Used to ask about countable things (French: combien — for countable nouns)', example: 'How many apples do you want?' },
      { term: 'change', definition: 'The money you get back after paying (False cognate: French "monnaie" = change, NOT money)', example: 'Here is your change — three dollars.' },
      { term: 'total', definition: 'The full amount to pay (French: total)', example: 'The total is five dollars and fifty cents.' },
      { term: 'I\'d like', definition: 'A polite way to say "I want" (French: je voudrais)', example: 'I\'d like two pounds of tomatoes, please.' },
      { term: 'dollars and cents', definition: 'American money units — dollars are like euros, cents are like centimes', example: 'This book costs twelve dollars and ninety-nine cents ($12.99).' },
      { term: 'price', definition: 'How much something costs (French: prix)', example: 'What is the price of this shirt?' },
      { term: 'customer', definition: 'A person who buys things (French: client)', example: 'The customer asked for the price.' }
    ],
    quiz: [
      { question: 'Which question is correct for asking about the price?', options: ['How many is this bread?', 'How much is this bread?', 'How much are this bread?', 'How many does this bread cost?'], correctAnswer: 1, explanation: 'Use "how much" for prices. "Bread" is singular, so we say "how much IS this bread."' },
      { question: '"How _____ apples do you want?"', options: ['much', 'many', 'more', 'price'], correctAnswer: 1, explanation: 'Apples are countable (1, 2, 3...), so we use "how many."' },
      { question: 'What does French "monnaie" mean in English?', options: ['Money', 'Change (coins you get back)', 'Coin', 'Price'], correctAnswer: 1, explanation: 'French "monnaie" = English "change" (the money returned after payment). "Money" in English = "argent" in French.' },
      { question: 'What is the polite way to say "I want bread" in English?', options: ['Give me bread.', 'I want bread now.', 'I\'d like some bread, please.', 'Bread I want.'], correctAnswer: 2, explanation: '"I\'d like" is the polite way to say "I want" in English, especially when shopping.' },
      { question: '"How _____ water do you need?"', options: ['many', 'much', 'more', 'numbers'], correctAnswer: 1, explanation: 'Water is uncountable — you cannot say "one water, two waters." Use "how much."' },
      { question: 'How do you say $7.50 in English?', options: ['Seven and fifty dollars', 'Seven dollars and fifty cents', 'Seventy-five dollars', 'Seven point fifty dollars'], correctAnswer: 1, explanation: '$7.50 is "seven dollars and fifty cents" or informally "seven fifty."' },
      { question: 'Which is the correct way to say 80 in English?', options: ['Four-twenties (like French quatre-vingts)', 'Sixty-twenty', 'Eighty', 'Eight-ten'], correctAnswer: 2, explanation: 'English numbers are more regular than French. 80 = eighty (not "four-twenties" like French).' },
      { question: 'Proverbs 11:1 teaches us that God loves _____:', options: ['People who are rich', 'Honest business and fair weights', 'People who never spend money', 'People who buy expensive things'], correctAnswer: 1, explanation: 'Proverbs 11:1 says "a just weight is His delight" — God values honest, fair transactions.' },
      { question: '"How much _____ these shoes?"', options: ['is', 'are', 'does', 'do'], correctAnswer: 1, explanation: '"These shoes" is plural, so we use "are": "How much are these shoes?"' },
      { question: 'A customer buys items for $8.00 and pays with $10.00. The change is:', options: ['$8.00', '$10.00', '$2.00', '$18.00'], correctAnswer: 2, explanation: 'Change = amount paid - total cost. $10.00 - $8.00 = $2.00 in change.' }
    ]
  },

  // ── W4: My Community Guide (PROJECT) ──────────────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'My Community Guide',
        estimatedMinutes: 60,
        objectives: [
          'Create a detailed visitor guide to your neighborhood in English.',
          'Incorporate location vocabulary, directions, and shopping language.',
          'Use "there is/there are," imperative directions, and polite phrases.',
          'Connect community service to the biblical call to love your neighbor.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine a visitor from an English-speaking country is coming to your neighborhood. They don\'t know where anything is! Your job is to create a guide that helps them find important places, get around, and shop — all in English.',
              connection: 'Jesus said, "Love your neighbor as yourself" (Mark 12:31). Creating a guide that helps visitors navigate your community is an act of love and hospitality. In the Bible, Abraham welcomed strangers (Genesis 18), and Hebrews 13:2 says, "Do not forget to show hospitality to strangers." When we help others feel welcome, we reflect God\'s heart.'
            },
            {
              type: 'text',
              heading: 'Project Instructions: My Community Guide',
              body: '**Your task:** Create a **Community Visitor Guide** for your neighborhood or town. This guide should help an English-speaking visitor find important places, get directions, and know where to shop.\n\n**Your guide must include:**\n\n1. **Welcome Section** (3-4 sentences) — Introduce your community. Where is it? What makes it special?\n\n2. **Important Places** (at least 6 places) — For each place, write:\n   - The name and what it is (school, hospital, church, market, etc.)\n   - A sentence using "there is" or "there are"\n   - Why a visitor might want to go there\n\n3. **Directions Section** (at least 2 sets of directions) — Write step-by-step directions from a central location to 2 different places using imperative sentences and prepositions of movement.\n\n4. **Shopping Tips** (4-5 tips) — Include:\n   - Where to buy food, supplies, or souvenirs\n   - Typical prices for 3 items\n   - Polite shopping phrases to use\n   - A note about the "monnaie/change" false cognate\n\n5. **Cultural & Spiritual Note** (2-3 sentences) — Share something about your community\'s faith or values.\n\n**Requirements:**\n- 400-500 words total\n- Use correct English grammar (there is/are, imperatives, how much/how many)\n- Include at least 2 false cognate warnings for French-speaking visitors\n- Include a Bible verse that connects to community or hospitality'
            },
            {
              type: 'biblical-worldview',
              theme: 'Hospitality and Loving Your Neighbor',
              scriptureRef: 'Mark 12:31; Hebrews 13:2; Genesis 18:1-8',
              reflection: 'Hospitality is a core biblical value. Abraham welcomed three strangers and served them a meal (Genesis 18). Jesus said the second greatest commandment is to "love your neighbor as yourself" (Mark 12:31). When we create resources that help visitors feel welcome in our community, we practice the biblical virtue of hospitality. Your community guide is not just an English project — it is an act of love.',
              applicationQuestion: 'How can welcoming visitors to your community be a way to show God\'s love?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are the most important places a visitor would need to know about in your community?',
                'What shopping tips would be most helpful for someone who doesn\'t know your area?',
                'How can your guide show hospitality, as described in Hebrews 13:2?'
              ]
            },
            {
              type: 'practice',
              activity: 'Guide Planning',
              prompt: 'Before writing your full guide, create an outline:\n1. List 6-8 important places in your community.\n2. Choose 2 places to write directions to.\n3. List 3 items with typical prices.\n4. Write down 2 false cognate warnings.\n5. Choose a Bible verse about community or hospitality.\n\nThis outline will be the skeleton of your guide.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Community Visitor Guide',
              prompt: 'Write your complete Community Visitor Guide (400-500 words) following the instructions above. Include all 5 sections: Welcome, Important Places, Directions, Shopping Tips, and Cultural/Spiritual Note. Make it practical, clear, and welcoming. Use correct English grammar throughout.'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content Completeness', excellent: 'All 5 sections included with rich detail, 6+ places described, 2+ direction sets, shopping tips with prices', proficient: 'All 5 sections included, 4-5 places, 1-2 direction sets, basic shopping tips', developing: 'Missing 1-2 sections, fewer than 4 places, incomplete directions or tips' },
                { name: 'English Accuracy', excellent: 'Correct use of there is/are, imperatives, how much/many, polite phrases with minimal errors', proficient: 'Mostly correct grammar with occasional errors that do not impede understanding', developing: 'Frequent grammar errors, incorrect use of key structures' },
                { name: 'False Cognate Awareness', excellent: '2+ false cognates identified and explained clearly with correct English alternatives', proficient: '1-2 false cognates mentioned with partial explanation', developing: 'No false cognates addressed or incorrect explanations' },
                { name: 'Biblical Connection', excellent: 'Meaningful connection to hospitality, community, or biblical values with relevant scripture', proficient: 'Basic connection to biblical values with a verse included', developing: 'Minimal or no biblical connection' }
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'My Community Guide',
        estimatedMinutes: 45,
        objectives: [
          'Create a visitor guide to your neighborhood in English.',
          'Use location vocabulary, directions, and polite shopping phrases.',
          'Include false cognate warnings for French speakers.',
          'Connect your project to biblical hospitality.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'A visitor is coming to your town and needs your help. Can you make a guide in English that shows them important places, gives directions, and shares shopping tips?',
              connection: 'Jesus said, "Love your neighbor as yourself" (Mark 12:31). Helping visitors feel welcome in our community is an act of love.'
            },
            {
              type: 'text',
              heading: 'Project: My Community Guide',
              body: '**Create a Community Visitor Guide** with these sections:\n\n1. **Welcome** (2-3 sentences) — Introduce your community.\n2. **Important Places** (at least 4 places) — Use "there is" and "there are" to describe each.\n3. **Directions** (1 set) — Give directions from one place to another using imperatives.\n4. **Shopping Tips** (3 tips) — Include a polite phrase, a price, and a false cognate warning.\n5. **Bible Verse** — Include a verse about community or helping others.\n\n**Total: 250-350 words**\n\nUse correct English: there is/are, imperatives (go, turn, walk), how much/how many, polite phrases.'
            },
            {
              type: 'biblical-worldview',
              theme: 'Welcoming Others',
              scriptureRef: 'Mark 12:31; Hebrews 13:2',
              reflection: 'The Bible tells us to love our neighbor and show hospitality to strangers. Your community guide helps visitors feel welcome — that is showing God\'s love in action.',
              applicationQuestion: 'How does helping a visitor show God\'s love?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What places would a visitor most need to know about?',
                'What false cognates should you warn French speakers about?'
              ]
            },
            {
              type: 'practice',
              activity: 'Guide Outline',
              prompt: 'Plan your guide:\n1. List 4-5 important places.\n2. Choose 1 place to write directions to.\n3. Write 1 shopping tip with a price.\n4. Choose a Bible verse.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Community Visitor Guide',
              prompt: 'Write your Community Visitor Guide (250-350 words) with all 5 sections. Use correct English grammar: there is/are, imperatives, polite phrases. Include at least 1 false cognate warning.'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content', excellent: 'All 5 sections with clear detail', proficient: '4 sections with some detail', developing: 'Missing sections or very little detail' },
                { name: 'English Grammar', excellent: 'Correct use of there is/are, imperatives, polite phrases', proficient: 'Mostly correct with some errors', developing: 'Many errors that make it hard to understand' },
                { name: 'Biblical Connection', excellent: 'Clear connection to hospitality with a relevant Bible verse', proficient: 'A Bible verse included with brief connection', developing: 'No Bible verse or connection' }
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'My Community Guide',
        estimatedMinutes: 35,
        objectives: [
          'Create a simple visitor guide with places, directions, and tips.',
          'Use basic English vocabulary for community places.',
          'Include a Bible verse about community.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'A visitor needs help finding places in your town. Can you make a simple guide in English?',
              connection: 'Jesus said to love your neighbor (Mark 12:31). Helping visitors is showing love.'
            },
            {
              type: 'text',
              heading: 'Project: Simple Community Guide',
              body: '**Make a guide with:**\n1. **3-4 places** in your community — write 1 sentence about each using "there is" or "there are."\n2. **Simple directions** from one place to another (3-4 sentences using go straight, turn left/right).\n3. **1 shopping tip** — tell visitors where to buy something and how much it costs.\n4. **1 Bible verse** about helping others.\n\n**Total: 100-150 words**'
            },
            {
              type: 'biblical-worldview',
              theme: 'Helping Others',
              scriptureRef: 'Mark 12:31',
              reflection: 'When we help a visitor, we show God\'s love. Jesus said to love your neighbor as yourself.',
              applicationQuestion: 'How can you help someone new in your community?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are the 3 most important places in your community?',
                'How do you get from your home to the nearest store?'
              ]
            },
            {
              type: 'practice',
              activity: 'List Your Places',
              prompt: 'Write the names of 4 places in your community in English. Write 1 sentence about each: "There is a _____ in my town."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Community Guide',
              prompt: 'Write your simple guide (100-150 words):\n1. Describe 3-4 places using "there is/there are."\n2. Give directions from one place to another.\n3. Write 1 shopping tip.\n4. Include Mark 12:31 or another Bible verse about helping people.'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content', excellent: 'All 4 parts included', proficient: '3 parts included', developing: 'Fewer than 3 parts' },
                { name: 'English', excellent: 'Correct sentences that are easy to read', proficient: 'Some errors but understandable', developing: 'Hard to understand' },
                { name: 'Bible Verse', excellent: 'Verse included and connected to helping others', proficient: 'Verse included', developing: 'No verse' }
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'visitor guide', definition: 'A document that helps visitors learn about a place', example: 'I wrote a visitor guide for my town.' },
      { term: 'recommend', definition: 'To suggest something good (French: recommander)', example: 'I recommend the bakery on Main Street.' },
      { term: 'hospitality', definition: 'Being warm and welcoming to guests and strangers', example: 'Abraham showed hospitality to three visitors (Genesis 18).' },
      { term: 'neighborhood', definition: 'The area around your home (French: quartier)', example: 'My neighborhood has a school, a church, and a market.' },
      { term: 'welcome', definition: 'To greet someone warmly; to make them feel at home', example: 'Welcome to our community!' }
    ],
    quiz: []
  }
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 5: ACTIONS AND ACTIVITIES (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit5Lessons: EnrichedLesson[] = [
  // ── W1: Present Tense Actions ─────────────────────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Present Tense Actions',
        estimatedMinutes: 60,
        objectives: [
          'Distinguish between present simple and present continuous tenses.',
          'Apply correct subject-verb agreement with third-person -s endings.',
          'Identify and correct common French interference errors in present tense usage.',
          'Write sentences describing habitual actions and actions happening right now.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, there is ONE present tense: "je marche" can mean "I walk" (in general) OR "I am walking" (right now). But English has TWO present tenses! "I walk to school every day" is different from "I am walking to school right now." When do you use each one? And why do French speakers keep forgetting the -s in "he walks"?',
              connection: 'Whatever you do, do it all for the glory of God (1 Corinthians 10:31). Every action — whether habitual or happening right now — is an opportunity to honor God. Learning to describe our actions correctly in English helps us communicate about the lives God has given us.'
            },
            {
              type: 'reading',
              title: 'A Day in Two Tenses',
              source: 'A1-A2 English Reading',
              text: '**Marie\'s daily routine (present simple — things she does regularly):**\nMarie **wakes up** at 6:00 every morning. She **brushes** her teeth and **eats** breakfast. She **walks** to school. She **studies** hard. After school, she **plays** with her friends. She **reads** her Bible before bed. She **goes** to church on Sundays.\n\n**What Marie is doing right now (present continuous — happening at this moment):**\nRight now, Marie **is sitting** in class. She **is listening** to the teacher. Her friend **is writing** in his notebook. The teacher **is explaining** the lesson. Outside, the birds **are singing**. It **is raining** a little.\n\n**See the difference?**\n- "Marie walks to school" = she does this every day (habit)\n- "Marie is walking to school" = she is doing it RIGHT NOW\n\n**CRITICAL for French speakers:** Notice that "she walks" has an -s at the end. In French, the final -s in "il marche" is SILENT. But in English, "he/she/it" verbs MUST have the -s, and you must HEAR it: walks /wawks/, eats /eets/, plays /playz/.'
            },
            {
              type: 'text',
              heading: 'Present Simple vs. Present Continuous',
              body: '**PRESENT SIMPLE — Habits and routines**\nUse for things that happen regularly, always, or as general facts.\n\n**Structure:** Subject + base verb (add -s for he/she/it)\n- I **walk** to school.\n- You **walk** to school.\n- He/She/It **walks** to school. (Add -s!)\n- We/They **walk** to school.\n\n**Signal words:** every day, always, usually, sometimes, never, on Mondays\n\n**PRESENT CONTINUOUS — Actions happening right now**\nUse for things happening at this exact moment.\n\n**Structure:** Subject + am/is/are + verb-ING\n- I **am walking** to school (right now).\n- He/She **is walking** to school.\n- We/They **are walking** to school.\n\n**Signal words:** right now, at the moment, currently, look!, listen!\n\n**CRITICAL FRENCH ERROR #1 — No progressive in French:**\nFrench does NOT have a continuous/progressive tense. French speakers often use present simple when they should use present continuous:\n- WRONG: "Look! It rains!" (French logic: "Regarde! Il pleut!")\n- CORRECT: "Look! It **is raining**!"\n\n**CRITICAL FRENCH ERROR #2 — Dropping the third-person -s:**\nIn French, final consonants are often silent ("il marche" — the -e is silent). French speakers transfer this habit to English and drop the -s:\n- WRONG: "He walk to school every day."\n- CORRECT: "He **walks** to school every day."\n\n**Remember the rule:** He/She/It + verb-S (present simple). ALWAYS.'
            },
            {
              type: 'text',
              heading: 'Spelling Rules for -ING and Third-Person -S',
              body: '**Adding -ING (for present continuous):**\n- Most verbs: add -ing → walk → walking, eat → eating\n- Verbs ending in -e: drop the -e, add -ing → write → writing, make → making\n- Short verbs (CVC pattern): double the final consonant → run → running, sit → sitting, swim → swimming\n\n**Adding -S (for third-person present simple):**\n- Most verbs: add -s → walk → walks, play → plays\n- Verbs ending in -s, -sh, -ch, -x, -o: add -es → wash → washes, watch → watches, go → goes\n- Verbs ending in consonant + -y: change -y to -ies → study → studies, carry → carries\n\n**Pronunciation of the -s ending:**\n- /s/ after voiceless sounds: walks, eats, helps\n- /z/ after voiced sounds: plays, runs, lives\n- /ɪz/ after -s, -sh, -ch, -x: watches, washes, fixes\n\nFrench speakers: Practice saying the -s ending OUT LOUD. In French, final consonants are usually silent, but in English, they MUST be pronounced!'
            },
            {
              type: 'biblical-worldview',
              theme: 'Every Action for God\'s Glory',
              scriptureRef: '1 Corinthians 10:31; Colossians 3:23',
              reflection: '1 Corinthians 10:31 says, "Whether you eat or drink or whatever you do, do it all for the glory of God." Colossians 3:23 adds, "Whatever you do, work at it with all your heart, as working for the Lord." Our daily actions — the routines we follow (present simple) and the things we are doing right now (present continuous) — are all opportunities to glorify God. When we describe our actions in English, we are describing the life God has given us to steward.',
              applicationQuestion: 'How can your everyday routine (waking up, studying, eating) be done "for the glory of God"?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why does English need TWO present tenses when French only has one? When would confusing them cause a misunderstanding?',
                'Why do French speakers tend to forget the -s in "he walks"? What can you do to remember it?',
                'Read 1 Corinthians 10:31. How does this verse change the way you think about ordinary daily actions?'
              ]
            },
            {
              type: 'practice',
              activity: 'Two-Tense Writing Challenge',
              prompt: 'Write TWO paragraphs about a person you know (or yourself):\n\n**Paragraph 1 — Daily Routine (Present Simple, 6-8 sentences):** Describe what this person does every day. Use signal words (every day, always, usually, sometimes). Make sure to add -s for he/she/it verbs.\n\n**Paragraph 2 — Right Now (Present Continuous, 6-8 sentences):** Describe what this person is doing at this exact moment. Use signal words (right now, at the moment, currently). Make sure to use am/is/are + verb-ING.\n\nThen, find and correct 3 errors in these sentences:\n1. "She walk to school every day."\n2. "Look! It rain outside."\n3. "He is study English right now."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Error Correction and Free Writing',
              prompt: 'Part 1: Correct the French interference errors in these sentences:\n1. "My brother play football every Saturday." (missing -s)\n2. "Right now I read a book." (should be continuous)\n3. "She is go to school every morning." (wrong tense form)\n4. "The children plays in the park." (wrong subject-verb agreement)\n5. "Look! The baby cry!" (should be continuous)\n\nPart 2: Write 10 original sentences — 5 in present simple (with correct -s) and 5 in present continuous (with correct -ING). Label each sentence with its tense and the signal word.'
            },
            {
              type: 'discussion',
              questions: [
                'Explain the difference between "I eat breakfast at 7:00" and "I am eating breakfast right now" to a French speaker who is confused.',
                'What do you think is the hardest part of English present tense for French speakers? How can you practice it?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Present Tense Actions',
        estimatedMinutes: 45,
        objectives: [
          'Understand the difference between present simple and present continuous.',
          'Add -s to verbs for he/she/it in present simple.',
          'Form present continuous sentences with am/is/are + verb-ING.',
          'Identify common mistakes French speakers make with present tense.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, "je mange" can mean "I eat" (in general) or "I am eating" (right now). But in English, these are different! Let\'s learn when to use "I eat" and when to use "I am eating."',
              connection: '1 Corinthians 10:31 says, "Whatever you do, do it all for the glory of God." Our daily actions — big and small — matter to God.'
            },
            {
              type: 'reading',
              title: 'Two Kinds of Present',
              source: 'A1-A2 English Reading',
              text: '**Every day (present simple):**\nPaul **walks** to school. He **eats** lunch at noon. He **plays** soccer after school. He **reads** his Bible at night.\n\n**Right now (present continuous):**\nPaul **is sitting** in class. He **is listening** to the teacher. His friends **are writing** in their notebooks.\n\n**The difference:**\n- "Paul walks to school" = every day (habit)\n- "Paul is walking to school" = right now\n\n**Important!** "He walk**s**" — don\'t forget the -s! In French, the final letter is often silent, but in English you must say it.'
            },
            {
              type: 'text',
              heading: 'Present Simple and Present Continuous',
              body: '**Present Simple** = habits, routines, facts\n- I walk. You walk. **He/She walks.** (add -s!)\n- Signal words: every day, always, usually, sometimes\n\n**Present Continuous** = happening right now\n- I **am** walking. He **is** walking. They **are** walking.\n- Signal words: right now, at the moment, look!\n\n**Common French speaker mistakes:**\n1. Forgetting the -s: "He walk" → "He **walks**"\n2. Using simple instead of continuous: "Look, it rain!" → "Look, it **is raining**!"'
            },
            {
              type: 'biblical-worldview',
              theme: 'Everything for God\'s Glory',
              scriptureRef: '1 Corinthians 10:31',
              reflection: '"Whatever you do, do it all for the glory of God." Every action — eating, studying, playing — can honor God when done with the right heart.',
              applicationQuestion: 'How can you do your daily activities for God\'s glory?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "She reads" and "She is reading"?',
                'Why do French speakers forget the -s in "he walks"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Write in Two Tenses',
              prompt: 'Write 4 sentences in present simple about your daily routine (use signal words: every day, always).\nWrite 4 sentences in present continuous about what you are doing right now (use: right now, at the moment).\n\nMake sure to add -s for he/she/it in present simple!'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Fix the Mistakes',
              prompt: 'Find and correct the errors:\n1. "She walk to school." →\n2. "Look! It rain!" →\n3. "He is eat breakfast." →\n4. "They walks to the park." →\n\nThen write 4 of your own sentences — 2 present simple, 2 present continuous.'
            },
            {
              type: 'discussion',
              questions: [
                'Tell a partner: What do you do every day? (use present simple) What are you doing right now? (use present continuous)',
                'Which tense is harder for you — present simple or present continuous? Why?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Present Tense Actions',
        estimatedMinutes: 35,
        objectives: [
          'Use present simple for daily habits.',
          'Use present continuous for things happening now.',
          'Remember to add -s for he/she/it verbs.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: '"I eat breakfast every morning" — that is a habit. "I am eating breakfast now" — that is happening right now. English uses two different forms! Let\'s learn them.',
              connection: 'God cares about everything we do (1 Corinthians 10:31). Every action can be done for His glory.'
            },
            {
              type: 'reading',
              title: 'Every Day vs. Right Now',
              source: 'A1 English Reading',
              text: '**Every day:** I **walk** to school. She **eats** lunch. He **plays** soccer.\n**Right now:** I **am walking**. She **is eating**. He **is playing**.\n\n**Remember:** He walk**s** — add the -s!'
            },
            {
              type: 'text',
              heading: 'Two Present Tenses',
              body: '**Present Simple** = every day, always, usually\n- I walk. He walk**s**. (add -s for he/she/it)\n\n**Present Continuous** = right now\n- I **am** walking. He **is** walking. They **are** walking.\n\n**At work:** You use both tenses:\n- "I work from 8 to 5." (present simple — routine)\n- "I am helping a customer right now." (present continuous — now)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Do Everything for God',
              scriptureRef: '1 Corinthians 10:31',
              reflection: 'Whatever you do — eating, working, playing — do it for God\'s glory.',
              applicationQuestion: 'What are you doing right now? Can you do it for God?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "I eat" and "I am eating"?',
                'What letter do you add to the verb for "he" or "she"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Simple Sentences',
              prompt: 'Write 3 sentences about what you do every day (present simple).\nWrite 3 sentences about what you are doing now (present continuous).\n\nExample: "I walk to school every day." / "I am sitting in class right now."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Fix the Verb',
              prompt: 'Add -s or change to -ING:\n1. "She walk__ to school every day." → She _____\n2. "He is eat__ lunch right now." → He is _____\n3. "They play__ soccer every Saturday." → They _____\n\nThen write 2 sentences about your job or a job you want to have.'
            },
            {
              type: 'discussion',
              questions: [
                'Tell a partner one thing you do every day and one thing you are doing right now.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'present simple', definition: 'The tense used for habits, routines, and general facts (French: present — but French uses one form for both!)', example: 'I walk to school every day. She reads before bed.' },
      { term: 'present continuous', definition: 'The tense used for actions happening right now: am/is/are + verb-ING', example: 'I am walking to school right now. She is reading a book.' },
      { term: 'subject-verb agreement', definition: 'He/she/it verbs need -s in present simple (walks, eats, plays)', example: 'He walks. She eats. It rains. (Always add -s!)' },
      { term: 'routine', definition: 'Something you do regularly, the same way, as a habit (French: routine)', example: 'My morning routine: I wake up, eat breakfast, and walk to school.' },
      { term: 'right now', definition: 'At this moment — signals present continuous tense', example: 'I am studying English right now.' },
      { term: 'every day', definition: 'Each day, daily — signals present simple tense', example: 'I eat breakfast every day.' }
    ],
    quiz: [
      { question: 'Which sentence is present simple?', options: ['I am walking to school.', 'I walk to school every day.', 'I was walking to school.', 'I will walk to school.'], correctAnswer: 1, explanation: '"I walk to school every day" is present simple — it describes a habit/routine with the signal word "every day."' },
      { question: 'Choose the correct sentence:', options: ['He walk to school.', 'He walks to school.', 'He walking to school.', 'He is walk to school.'], correctAnswer: 1, explanation: 'For he/she/it in present simple, add -s to the verb: "He walks."' },
      { question: '"Look! It _____!" (rain — happening right now)', options: ['rains', 'rain', 'is raining', 'rained'], correctAnswer: 2, explanation: '"Look!" tells us it is happening RIGHT NOW, so use present continuous: "is raining."' },
      { question: 'Why do French speakers often forget the -s in "he walks"?', options: ['French does not have verbs.', 'In French, final consonants are often silent, so the habit transfers to English.', 'French speakers cannot hear the -s sound.', 'English is too difficult.'], correctAnswer: 1, explanation: 'In French, final consonants are typically silent (e.g., "il marche" — the -e is silent). French speakers transfer this habit to English and drop the -s.' },
      { question: '"She _____ her Bible every night." (read)', options: ['read', 'reads', 'is reading', 'reading'], correctAnswer: 1, explanation: '"Every night" signals present simple. She + reads (add -s for he/she/it).' },
      { question: 'What is the -ING form of "write"?', options: ['writeing', 'writing', 'writting', 'writng'], correctAnswer: 1, explanation: 'For verbs ending in -e, drop the -e and add -ING: write → writing.' },
      { question: '"They _____ soccer in the park right now."', options: ['play', 'plays', 'are playing', 'is playing'], correctAnswer: 2, explanation: '"Right now" signals present continuous. They + are playing.' },
      { question: 'What does 1 Corinthians 10:31 say?', options: ['Do not work on Sundays.', 'Whatever you do, do it all for the glory of God.', 'Only pray in the morning.', 'Do not play sports.'], correctAnswer: 1, explanation: '1 Corinthians 10:31 teaches us that EVERY action — eating, drinking, working, playing — can be done for God\'s glory.' },
      { question: '"He _____ lunch at the cafeteria right now."', options: ['eats', 'eat', 'is eating', 'eating'], correctAnswer: 2, explanation: '"Right now" = present continuous. He + is eating.' },
      { question: 'What is the -ING form of "run"?', options: ['runing', 'running', 'runing', 'runeing'], correctAnswer: 1, explanation: '"Run" ends in consonant-vowel-consonant (CVC), so double the final consonant: run → running.' }
    ]
  },

  // ── W2: Sports, Games, and Hobbies ────────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Sports, Games, and Hobbies',
        estimatedMinutes: 60,
        objectives: [
          'Use "like + gerund" and "like + infinitive" to express preferences.',
          'Express abilities with "can" and "can\'t" in English.',
          'Use sports and leisure vocabulary correctly, avoiding French interference.',
          'Write paragraphs about hobbies using correct verb patterns.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What do you like to do in your free time? Play soccer? Read books? Draw? In English, you can say "I like playing soccer" OR "I like to play soccer" — both are correct! But be careful: French speakers often make a tricky mistake, saying "I am go to play" instead of "I am going to play." Let\'s master the language of hobbies!',
              connection: 'God gives us talents and interests as gifts. Whether you love sports, music, art, or games, these are reflections of God\'s creativity in you. 1 Corinthians 10:31 reminds us that whatever we do — even our hobbies — can be done for the glory of God.'
            },
            {
              type: 'reading',
              title: 'Our Favorite Activities',
              source: 'A1-A2 English Reading',
              text: 'Meet three students and their hobbies:\n\n**Samuel** likes **playing** soccer. He **can** run very fast and **can** kick the ball hard. He plays on a team every Saturday. He says, "I like **to practice** every day because it makes me better."\n\n**Esther** likes **reading** books and **drawing** pictures. She **can** draw beautiful flowers. She **can\'t** play any instruments, but she wants to learn piano. She says, "I like **to read** before bed. It helps me relax."\n\n**Jacques** likes **playing** video games and **watching** movies. He **can** also cook very well! He **can\'t** swim yet, but he is learning. He says, "I\'m **going to** learn to swim this summer."\n\n**Notice:** "I like playing" and "I like to play" — both are correct in English!\n\n**French interference alert:** Jacques said "I\'m going to learn," NOT "I\'m go to learn." In French, "je vais apprendre" uses the verb "aller" (to go). In English, you must use the -ING form: "I am **going** to learn" — not "I am go to learn."'
            },
            {
              type: 'text',
              heading: 'Like + Gerund/Infinitive and Can/Can\'t',
              body: '**Expressing what you enjoy:**\n\nIn English, after "like," you can use either a **gerund** (-ING form) or an **infinitive** (to + verb). Both are correct:\n- I like **playing** soccer. = I like **to play** soccer.\n- She likes **reading** books. = She likes **to read** books.\n- They like **swimming** in the sea. = They like **to swim** in the sea.\n\n**Expressing ability with CAN/CAN\'T:**\n- I **can** swim. (I have the ability.)\n- She **can\'t** play piano. (She doesn\'t have the ability.)\n- **Can** you ride a bicycle? (Asking about ability.)\n\n**Important:** "Can" is followed by the BASE VERB — no "to"!\n- CORRECT: I can **swim**.\n- WRONG: I can **to swim**.\n- WRONG: I can **swimming**.\n\n**CRITICAL FRENCH INTERFERENCE:**\n\nFrench speakers often make this error with "going to":\n- French: "Je vais jouer" (I go + infinitive)\n- WRONG English: "I am **go** to play."\n- CORRECT English: "I am **going** to play."\n\nIn English, "going to" for future plans requires the -ING form: am/is/are + **going** + to + base verb.\n\n**Sports vocabulary notes:**\n- Play + team/ball sports: play soccer, play basketball, play tennis\n- Do + individual activities: do karate, do gymnastics, do yoga\n- Go + -ING activities: go swimming, go fishing, go hiking'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Gifts and Talents',
              scriptureRef: '1 Corinthians 10:31; 1 Peter 4:10',
              reflection: 'Your hobbies and talents are gifts from God! 1 Peter 4:10 says, "Each of you should use whatever gift you have received to serve others, as faithful stewards of God\'s grace." Whether you can play soccer, draw, cook, or sing — these abilities come from God. When we enjoy our hobbies and develop our skills, we are stewarding the gifts God has given us. And when we use our talents to serve others and bring joy, we reflect God\'s generosity.',
              applicationQuestion: 'What talent or hobby has God given you? How can you use it to serve others?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "play soccer," "do karate," and "go swimming"? Why does English use different verbs?',
                'Why do French speakers say "I am go to play" instead of "I am going to play"? How can you remember the correct form?',
                'How can your hobbies and talents be used to serve others, as 1 Peter 4:10 teaches?'
              ]
            },
            {
              type: 'practice',
              activity: 'Hobby Profile Writing',
              prompt: 'Write a detailed "Hobby Profile" for yourself (10-12 sentences). Include:\n1. 3 things you LIKE doing (use both "like + gerund" and "like + infinitive")\n2. 3 things you CAN do well\n3. 2 things you CAN\'T do but want to learn\n4. 1 thing you are GOING TO do in the future (use the correct "going to" form)\n5. Use at least 3 different sport/hobby verbs (play, do, go + -ING)\n\nExample: "I like playing soccer and I like to read adventure books. I can run fast, but I can\'t swim. I am going to learn to swim next summer."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Interview and Report',
              prompt: 'Interview a classmate about their hobbies (write the questions and answers):\n1. What do you like doing in your free time?\n2. What sports can you play?\n3. What can\'t you do yet?\n4. What are you going to learn?\n\nThen write a 150-200 word report about your classmate\'s hobbies using correct verb patterns. Use third-person (he/she likes, he/she can). Watch your -s endings!'
            },
            {
              type: 'discussion',
              questions: [
                'Tell the class about one hobby you are passionate about. Use "I like," "I can," and "I am going to" in your description.',
                'How does 1 Corinthians 10:31 apply to the way you spend your free time?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Sports, Games, and Hobbies',
        estimatedMinutes: 45,
        objectives: [
          'Express preferences using "like + verb-ING" and "like + to + verb."',
          'Use "can" and "can\'t" to talk about abilities.',
          'Learn sports and hobby vocabulary.',
          'Avoid the French interference error "I am go to play."'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What sports and hobbies do you enjoy? In English, you can say "I like playing soccer" or "I like to play soccer." Let\'s learn to talk about our favorite activities!',
              connection: 'God gives us different talents and interests. 1 Corinthians 10:31 says we can do everything for God\'s glory — even our hobbies!'
            },
            {
              type: 'reading',
              title: 'My Hobbies',
              source: 'A1-A2 English Reading',
              text: 'I like **playing** soccer. I **can** run fast.\nMy sister likes **reading**. She **can** read very quickly.\nMy brother likes **drawing**. He **can\'t** paint yet, but he is learning.\n\n**Going to (future):**\nI am **going** to learn to swim. (NOT: "I am go to learn"!)\n\n**Remember:**\n- Like + playing / like + to play — both OK!\n- Can + base verb (can swim, can play — NO "to")\n- Going to = am/is/are + going + to + verb'
            },
            {
              type: 'text',
              heading: 'Hobbies, Can, and Going To',
              body: '**I like + verb-ING / I like + to + verb:**\n- I like playing soccer. = I like to play soccer.\n\n**Can / Can\'t (ability):**\n- I can swim. She can\'t cook.\n- Can you ride a bike?\n\n**Going to (future plans):**\n- I am going to learn piano.\n- WRONG: "I am go to learn piano." (French interference!)\n- CORRECT: "I am **going** to learn piano."\n\n**Sports verbs:**\n- Play: soccer, basketball, tennis\n- Do: karate, gymnastics\n- Go: swimming, fishing, hiking'
            },
            {
              type: 'biblical-worldview',
              theme: 'Using Our Talents for God',
              scriptureRef: '1 Peter 4:10; 1 Corinthians 10:31',
              reflection: 'God gives each person different talents. 1 Peter 4:10 says to use your gifts to serve others. Your hobbies and abilities are gifts from God!',
              applicationQuestion: 'What hobby or talent do you have that could help others?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the correct way to say future plans: "I am go to" or "I am going to"?',
                'After "can," do you use "to" or just the base verb?'
              ]
            },
            {
              type: 'practice',
              activity: 'My Hobbies',
              prompt: 'Write about your hobbies (6-8 sentences):\n1. 2 things you like doing (use "like + -ING" or "like + to")\n2. 2 things you can do\n3. 1 thing you can\'t do\n4. 1 thing you are going to learn\n\nExample: "I like playing soccer. I can run fast. I can\'t swim. I am going to learn to swim."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Correct the Errors',
              prompt: 'Fix these sentences:\n1. "I am go to play soccer." → \n2. "She can to swim." → \n3. "He like play basketball." → \n4. "I can\'t to cook." →\n\nThen write 4 correct sentences about a friend\'s hobbies.'
            },
            {
              type: 'discussion',
              questions: [
                'Tell a partner 3 things you like doing and 2 things you can do.',
                'What are you going to learn this year? Say it in a correct English sentence.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Sports, Games, and Hobbies',
        estimatedMinutes: 35,
        objectives: [
          'Say what you like doing using "I like + verb-ING."',
          'Use "can" and "can\'t" for abilities.',
          'Avoid the error "I am go to" (should be "I am going to").'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'What do you like doing? Playing soccer? Drawing? Cooking? Let\'s learn to talk about hobbies in English!',
              connection: 'God gives us all different talents. Everything we do can be for His glory (1 Corinthians 10:31).'
            },
            {
              type: 'reading',
              title: 'What I Like',
              source: 'A1 English Reading',
              text: 'I like **playing** soccer.\nI like **cooking** food.\nI **can** run fast.\nI **can\'t** swim.\nI am **going to** learn to swim.\n\n**NOT:** "I am go to learn." Always say "I am **going** to..."'
            },
            {
              type: 'text',
              heading: 'Hobbies and Abilities',
              body: '**What you like:**\n- I like playing soccer.\n- I like cooking.\n\n**What you can do:**\n- I can cook. I can\'t swim.\n\n**Future plans:**\n- I am **going to** learn to swim.\n- NOT: "I am go to learn"\n\n**At work:** "I can speak English." "I can use a computer." These sentences help you in job interviews!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God\'s Gifts',
              scriptureRef: '1 Corinthians 10:31',
              reflection: 'Your talents are gifts from God. Use them to help others and honor Him.',
              applicationQuestion: 'What can you do well? How can you use it to help someone?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What do you like doing?',
                'What can you do well?'
              ]
            },
            {
              type: 'practice',
              activity: 'My Abilities',
              prompt: 'Complete:\n1. I like _____ (add -ING to a hobby).\n2. I can _____.\n3. I can\'t _____.\n4. I am going to _____ (learn something new).\n\nWrite your own 4 sentences.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Right or Wrong?',
              prompt: 'Which sentences are correct? Fix the wrong ones.\n1. "I like play soccer." → \n2. "I can swim." → \n3. "I am go to learn." → \n4. "She can to cook." →\n\nThen tell a partner 2 things you can do at work or at home.'
            },
            {
              type: 'discussion',
              questions: [
                'What are you going to learn this year? Say it correctly in English.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'like + verb-ING', definition: 'Used to express enjoyment: I like playing, I like reading (also: like + to + verb)', example: 'I like playing soccer. = I like to play soccer.' },
      { term: 'can / can\'t', definition: 'Express ability or inability. Followed by the base verb (no "to"!)', example: 'I can swim. She can\'t cook. Can you ride a bike?' },
      { term: 'going to', definition: 'Used for future plans: am/is/are + going + to + verb. NOT "am go to"!', example: 'I am going to learn to swim this summer.' },
      { term: 'hobby', definition: 'An activity you do for fun in your free time (French: passe-temps, hobby)', example: 'My hobbies are reading, soccer, and drawing.' },
      { term: 'play', definition: 'Used with team/ball sports: play soccer, play basketball, play tennis', example: 'I play soccer every Saturday.' },
      { term: 'practice', definition: 'To do something repeatedly to improve (French: pratiquer/s\'entrainer)', example: 'I practice piano every day.' },
      { term: 'team', definition: 'A group of people who play a sport together (French: equipe)', example: 'I play on a soccer team.' }
    ],
    quiz: [
      { question: 'Which sentence is correct?', options: ['I like play soccer.', 'I like playing soccer.', 'I like to playing soccer.', 'I liking play soccer.'], correctAnswer: 1, explanation: 'After "like," use either the gerund (playing) or infinitive (to play): "I like playing soccer."' },
      { question: '"She _____ swim very well."', options: ['can to', 'cans', 'can', 'is can'], correctAnswer: 2, explanation: '"Can" is followed by the base verb — no "to": "She can swim."' },
      { question: 'What is the French interference error with "going to"?', options: ['Saying "I am going to"', 'Saying "I am go to"', 'Saying "I go to"', 'Saying "I can to"'], correctAnswer: 1, explanation: 'French speakers often say "I am go to play" instead of "I am going to play" because French uses "je vais" (I go) + infinitive.' },
      { question: 'Which verb is used with team sports?', options: ['Do', 'Go', 'Play', 'Make'], correctAnswer: 2, explanation: 'Use "play" with team and ball sports: play soccer, play basketball, play tennis.' },
      { question: '"I _____ cook, but I am going to learn."', options: ['can\'t', 'can not to', 'don\'t can', 'am not can'], correctAnswer: 0, explanation: '"Can\'t" is the negative of "can." It is followed by the base verb: "I can\'t cook."' },
      { question: '"We _____ hiking every weekend." (go + -ING activity)', options: ['play', 'do', 'go', 'make'], correctAnswer: 2, explanation: 'Use "go" with -ING activities: go hiking, go swimming, go fishing.' },
      { question: 'Which sentence uses "going to" correctly?', options: ['I am go to learn piano.', 'I going to learn piano.', 'I am going to learn piano.', 'I go to learning piano.'], correctAnswer: 2, explanation: 'The correct form is: am/is/are + going + to + base verb: "I am going to learn piano."' },
      { question: 'What does 1 Peter 4:10 teach about our talents?', options: ['Hide your talents from others.', 'Use your gifts to serve others.', 'Only God has talents.', 'Talents are not important.'], correctAnswer: 1, explanation: '1 Peter 4:10 says, "Use whatever gift you have received to serve others, as faithful stewards of God\'s grace."' },
      { question: '"He likes _____ books before bed."', options: ['read', 'reads', 'reading', 'to reading'], correctAnswer: 2, explanation: 'After "likes," use the gerund (reading) or infinitive (to read): "He likes reading books."' },
      { question: '"_____ you ride a bicycle?"', options: ['Do', 'Are', 'Can', 'Is'], correctAnswer: 2, explanation: 'Use "Can" to ask about ability: "Can you ride a bicycle?"' }
    ]
  },

  // ── W3: Asking and Answering Questions ────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Asking and Answering Questions',
        estimatedMinutes: 60,
        objectives: [
          'Form yes/no questions using do/does correctly as auxiliaries.',
          'Use all question words (who, what, where, when, why, how) in well-formed questions.',
          'Identify and correct the French speaker error of omitting the auxiliary verb in questions.',
          'Write interview-style questions and answers using correct English question formation.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you can make a question just by raising your voice: "Tu aimes le cafe?" In English, this does NOT work the same way! You cannot just say "You like coffee?" — you MUST add a helper word: "DO you like coffee?" Forgetting the "do/does" is one of the biggest mistakes French speakers make. Let\'s fix it today!',
              connection: 'Questions are powerful. Jesus asked His disciples, "Who do you say I am?" (Matthew 16:15). He could have simply told them — but He asked a question because questions make us think deeply. Learning to ask good questions in English helps us connect with others and grow in understanding.'
            },
            {
              type: 'reading',
              title: 'The Question Interview',
              source: 'A1-A2 English Reading',
              text: 'Reporter: Good morning! I have some questions for you. **What** is your name?\nMarie: My name is Marie.\n\nReporter: **Where** do you live?\nMarie: I live in Port-au-Prince.\n\nReporter: **Do** you like your school?\nMarie: Yes, I do. I love my school!\n\nReporter: **Does** your brother play sports?\nMarie: Yes, he does. He plays soccer.\n\nReporter: **When** does he practice?\nMarie: He practices every Saturday morning.\n\nReporter: **Why** do you study English?\nMarie: Because I want to help people from other countries.\n\nReporter: **How** do you practice English at home?\nMarie: I read English books and listen to English songs.\n\nReporter: **Who** is your favorite teacher?\nMarie: My favorite teacher is Mr. Jean. He teaches science.\n\n**Notice:** Every yes/no question uses DO or DOES. Every WH-question uses a question word + do/does (except with "be" and "who" as subject).'
            },
            {
              type: 'text',
              heading: 'Yes/No Questions with Do/Does — THE Critical Rule',
              body: '**The #1 question error by French speakers:** Skipping the auxiliary verb.\n\nIn French, you can form a question by:\n1. Raising your voice: "Tu aimes le cafe?" ✓ (in informal French)\n2. Adding "est-ce que": "Est-ce que tu aimes le cafe?" ✓\n\nIn English, you MUST use an auxiliary verb:\n- WRONG: "You like coffee?" (This is understood but grammatically incorrect in standard English.)\n- CORRECT: "**Do** you like coffee?"\n\n**YES/NO Questions:**\n- **Do** + I/you/we/they + base verb?\n  - **Do** you like soccer? → Yes, I **do**. / No, I **don\'t**.\n  - **Do** they play tennis? → Yes, they **do**.\n\n- **Does** + he/she/it + base verb? (NO -s on the main verb!)\n  - **Does** she speak English? → Yes, she **does**.\n  - **Does** he like coffee? → Yes, he **does**.\n  - WRONG: "Does he likes coffee?" (double -s error)\n  - CORRECT: "Does he like coffee?" (does already carries the -s meaning)\n\n**WH-Questions (Who, What, Where, When, Why, How):**\n- **What** do you study? I study English.\n- **Where** does she live? She lives in Haiti.\n- **When** do they play? They play on Saturdays.\n- **Why** do you learn English? Because I want to travel.\n- **How** does he get to school? He walks.\n- **Who** is your teacher? Mr. Jean is my teacher. (No do/does needed when "who" is the subject!)\n\n**Special case — "Who" as subject:**\nWhen "who" IS the subject, you do NOT use do/does:\n- **Who** teaches English? (= Someone teaches English. Who?)\n- **Who** plays soccer? (= Someone plays soccer. Who?)\nBut when "who" is the object, you DO use do/does:\n- **Who** do you like? (= You like someone. Who?)'
            },
            {
              type: 'text',
              heading: 'Question Words: The Complete Set',
              body: '**WHO** — asks about a person\n"Who is your best friend?" "Who teaches math?"\n\n**WHAT** — asks about a thing, action, or idea\n"What do you study?" "What is your favorite food?"\n\n**WHERE** — asks about a place\n"Where do you live?" "Where is the hospital?"\n\n**WHEN** — asks about a time\n"When do you eat lunch?" "When is the test?"\n\n**WHY** — asks about a reason\n"Why do you study English?" "Why does she like reading?"\n\n**HOW** — asks about a method or manner\n"How do you get to school?" "How does he cook rice?"\n\n**HOW + adjective/adverb:**\n- **How many** students are in your class? (countable)\n- **How much** does this cost? (uncountable/price)\n- **How old** are you?\n- **How often** do you exercise?\n- **How long** does the trip take?\n\n**French comparison:** French uses similar question words (qui, que/quoi, ou, quand, pourquoi, comment), so the MEANINGS are not hard. The hard part for French speakers is remembering to add do/does in the question structure.'
            },
            {
              type: 'biblical-worldview',
              theme: 'The Power of Questions',
              scriptureRef: 'Matthew 16:15; Genesis 3:9; Luke 2:46',
              reflection: 'Jesus frequently asked questions — not because He didn\'t know the answers, but because questions invite deep thinking. "Who do you say I am?" (Matthew 16:15) is perhaps the most important question ever asked. God asked Adam, "Where are you?" (Genesis 3:9) — not because He had lost Adam, but to make Adam confront his sin. Even as a 12-year-old boy, Jesus was "in the temple courts, sitting among the teachers, listening to them and asking them questions" (Luke 2:46). Questions are tools for learning, relationship, and spiritual growth. When you learn to ask good questions in English, you are following Jesus\'s own teaching method.',
              applicationQuestion: 'Why do you think Jesus asked questions instead of just giving answers? How can asking good questions help you learn and grow?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why do French speakers tend to skip "do/does" in English questions? What is different about how French and English form questions?',
                'Explain the difference between "Who teaches English?" (no do) and "Who do you teach?" (with do). When do you use do/does with "who"?',
                'Jesus asked, "Who do you say I am?" Why is this question so powerful? How would you answer it?'
              ]
            },
            {
              type: 'practice',
              activity: 'Question Formation Workshop',
              prompt: 'Part 1: Form correct questions using do/does:\n1. (she / like / chocolate) → Does she like chocolate?\n2. (you / speak / French) → ?\n3. (they / play / soccer / on Saturdays) → ?\n4. (he / study / English / every day) → ?\n5. (your mother / cook / dinner) → ?\n\nPart 2: Form WH-questions for these answers:\n1. Answer: "I live in Port-au-Prince." → Question: Where _____?\n2. Answer: "She studies because she wants to be a doctor." → Question: Why _____?\n3. Answer: "He walks to school." → Question: How _____?\n4. Answer: "They play on Saturdays." → Question: When _____?\n5. Answer: "Marie is my best friend." → Question: Who _____?'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Interview Project',
              prompt: 'Write a complete interview (14-18 lines) where a reporter asks someone 8 different questions. Include:\n- At least 2 yes/no questions with do/does\n- At least 1 question with each question word: who, what, where, when, why, how\n- Correct answers for each question\n- No instances of the "missing do/does" error\n\nThen write a brief paragraph (3-4 sentences) explaining why French speakers find English questions difficult and how to remember the do/does rule.'
            },
            {
              type: 'discussion',
              questions: [
                'Ask a classmate 5 questions using 5 different question words. Make sure every question uses correct English structure.',
                'What is one important question you would like to ask someone? Form it correctly in English.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Asking and Answering Questions',
        estimatedMinutes: 45,
        objectives: [
          'Form yes/no questions using do/does.',
          'Use question words: who, what, where, when, why, how.',
          'Avoid the French speaker error of skipping do/does in questions.',
          'Practice asking and answering questions about daily life.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'In French, you can ask "Tu aimes le cafe?" just by raising your voice. In English, you need a helper word: "DO you like coffee?" Let\'s learn how to ask questions correctly!',
              connection: 'Jesus asked powerful questions — like "Who do you say I am?" (Matthew 16:15). Good questions help us learn and grow.'
            },
            {
              type: 'reading',
              title: 'Asking Questions',
              source: 'A1 English Reading',
              text: '**Do** you like soccer? Yes, I **do**.\n**Does** she speak English? Yes, she **does**.\n\n**Where** do you live? I live in Haiti.\n**What** do you study? I study English.\n**When** do you play? I play on Saturdays.\n**Why** do you study? Because I want to learn.\n**Who** is your teacher? Mr. Jean.\n**How** do you get to school? I walk.\n\n**Important!** In English, you MUST use do/does to make a question.\nWRONG: "You like coffee?"\nCORRECT: "**Do** you like coffee?"'
            },
            {
              type: 'text',
              heading: 'Questions with Do/Does',
              body: '**Yes/No questions:**\n- **Do** + I/you/we/they + base verb?\n  "Do you like soccer?" → "Yes, I do."\n- **Does** + he/she/it + base verb?\n  "Does she play tennis?" → "Yes, she does."\n  (NO -s on the main verb after does!)\n\n**WH-questions:**\n- What do you study?\n- Where does she live?\n- When do they play?\n- Why do you learn English?\n- Who is your friend?\n- How does he get to school?\n\n**French speaker mistake:** Forgetting do/does\n- WRONG: "You like coffee?"\n- CORRECT: "**Do** you like coffee?"'
            },
            {
              type: 'biblical-worldview',
              theme: 'Jesus Asked Questions',
              scriptureRef: 'Matthew 16:15',
              reflection: 'Jesus asked, "Who do you say I am?" He used questions to make people think deeply. Good questions help us learn and grow closer to God.',
              applicationQuestion: 'What question would you like to ask Jesus?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why can\'t you just say "You like coffee?" in English? What do you need to add?',
                'What is the difference between "Do you play?" and "Does she play?"'
              ]
            },
            {
              type: 'practice',
              activity: 'Form the Questions',
              prompt: 'Make yes/no questions:\n1. (you / like / soccer) → Do you like soccer?\n2. (she / speak / English) → ?\n3. (they / live / in Haiti) → ?\n\nMake WH-questions:\n4. Where / she / live → ?\n5. What / you / study → ?\n6. When / they / play → ?'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Question and Answer',
              prompt: 'Write 6 questions and answers about yourself:\n1. A "Do you...?" question + answer\n2. A "Does he/she...?" question about someone + answer\n3. A "Where...?" question + answer\n4. A "What...?" question + answer\n5. A "When...?" question + answer\n6. A "Why...?" question + answer'
            },
            {
              type: 'discussion',
              questions: [
                'Ask a partner 4 questions using different question words. Write down their answers.',
                'Why is it important to use do/does in English questions?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Asking and Answering Questions',
        estimatedMinutes: 35,
        objectives: [
          'Ask yes/no questions with do/does.',
          'Use basic question words: what, where, when.',
          'Understand why you need do/does in English questions.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How do you ask a question in English? You can\'t just say "You like coffee?" You need to add "Do": "Do you like coffee?" Let\'s learn!',
              connection: 'Jesus asked good questions to help people learn (Matthew 16:15). Questions help us understand each other.'
            },
            {
              type: 'reading',
              title: 'Simple Questions',
              source: 'A1 English Reading',
              text: '**Do** you like soccer? → Yes, I do.\n**Does** she speak English? → Yes, she does.\n**What** is your name? → My name is Pierre.\n**Where** do you live? → I live in Haiti.\n**When** do you eat lunch? → I eat lunch at noon.'
            },
            {
              type: 'text',
              heading: 'How to Ask Questions',
              body: '**Yes/No Questions:**\n- **Do** you like coffee? → Yes, I do. / No, I don\'t.\n- **Does** he play soccer? → Yes, he does.\n\n**WH-Questions:**\n- **What** is your name?\n- **Where** do you live?\n- **When** do you eat lunch?\n\n**At work:** Questions are important!\n- "Do you need help?"\n- "Where is the office?"\n- "When does the meeting start?"'
            },
            {
              type: 'biblical-worldview',
              theme: 'Questions Help Us Learn',
              scriptureRef: 'Matthew 16:15',
              reflection: 'Jesus asked, "Who do you say I am?" Good questions help us learn and think.',
              applicationQuestion: 'What is one question you want to ask in English?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What word do you add to make a question? (Do or Does)',
                'What is the English question word for asking about a place? (Where)'
              ]
            },
            {
              type: 'practice',
              activity: 'Make Questions',
              prompt: 'Add "Do" or "Does" to make a question:\n1. _____ you like soccer?\n2. _____ she speak English?\n3. _____ they live in Haiti?\n4. _____ he play basketball?\n\nThen answer each question: Yes, I do. / No, she doesn\'t. etc.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Ask 3 Questions',
              prompt: 'Write 3 questions you can ask a new friend:\n1. A "Do you...?" question\n2. A "What...?" question\n3. A "Where...?" question\n\nThen write the answers.'
            },
            {
              type: 'discussion',
              questions: [
                'Ask a partner: "Do you like...?" and "Where do you live?"'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'do / does', definition: 'Auxiliary verbs needed to form questions and negatives in present simple. Do = I/you/we/they. Does = he/she/it.', example: 'Do you like soccer? Does she speak English?' },
      { term: 'question word', definition: 'Words that begin WH-questions: who, what, where, when, why, how', example: 'Where do you live? What do you study?' },
      { term: 'who', definition: 'Question word asking about a person', example: 'Who is your best friend?' },
      { term: 'what', definition: 'Question word asking about a thing, action, or idea', example: 'What do you like to eat?' },
      { term: 'where', definition: 'Question word asking about a place', example: 'Where do you live?' },
      { term: 'when', definition: 'Question word asking about a time', example: 'When does school start?' },
      { term: 'why', definition: 'Question word asking about a reason', example: 'Why do you study English? Because I want to travel.' },
      { term: 'how', definition: 'Question word asking about a method or manner', example: 'How do you get to school? I walk.' }
    ],
    quiz: [
      { question: 'Which is the correct question form?', options: ['You like coffee?', 'Do you like coffee?', 'Like you coffee?', 'You do like coffee?'], correctAnswer: 1, explanation: 'In English, you must use the auxiliary "do" to form a question: "Do you like coffee?"' },
      { question: '"_____ she speak French?"', options: ['Do', 'Does', 'Is', 'Are'], correctAnswer: 1, explanation: 'For he/she/it, use "Does" as the auxiliary: "Does she speak French?"' },
      { question: 'What is wrong with "Does he likes soccer?"', options: ['Nothing — it is correct.', '"Does" should be "Do."', 'The main verb should not have -s after "does."', '"Likes" should be "liking."'], correctAnswer: 2, explanation: 'When using "does," the main verb stays in base form (no -s): "Does he like soccer?"' },
      { question: '"_____ do you live?" "I live in Haiti."', options: ['What', 'When', 'Where', 'Who'], correctAnswer: 2, explanation: '"Where" asks about a place. "Where do you live?" asks about your location.' },
      { question: 'Why do French speakers often forget "do/does" in English questions?', options: ['French has no question words.', 'In French, you can form questions just by raising your voice, without an auxiliary verb.', 'French speakers do not ask questions.', 'English is harder than French.'], correctAnswer: 1, explanation: 'In informal French, you can make a question by intonation alone ("Tu aimes?"). English requires the auxiliary do/does.' },
      { question: '"_____ teaches your class?" (asking about the teacher)', options: ['Who does', 'Who', 'What does', 'Does who'], correctAnswer: 1, explanation: 'When "who" is the subject (who is doing the action), you do NOT need do/does: "Who teaches your class?"' },
      { question: '"_____ do you study English?" "Because I want to travel."', options: ['What', 'Where', 'When', 'Why'], correctAnswer: 3, explanation: '"Why" asks for a reason. The answer begins with "because."' },
      { question: 'What question did Jesus ask in Matthew 16:15?', options: ['Where do you live?', 'Who do you say I am?', 'Do you like fishing?', 'When will you follow me?'], correctAnswer: 1, explanation: 'Jesus asked His disciples, "Who do you say I am?" — one of the most important questions in the Bible.' },
      { question: '"_____ does the bus arrive?" "At 8:00 in the morning."', options: ['What', 'Where', 'When', 'Why'], correctAnswer: 2, explanation: '"When" asks about time. "When does the bus arrive?" — "At 8:00."' },
      { question: '"How _____ you get to school?"', options: ['are', 'does', 'do', 'is'], correctAnswer: 2, explanation: '"You" takes "do" as the auxiliary: "How do you get to school?"' }
    ]
  },

  // ── W4: My Favorite Activities Presentation (PROJECT) ─────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'My Favorite Activities Presentation',
        estimatedMinutes: 60,
        objectives: [
          'Create a presentation about personal hobbies using correct question and answer forms.',
          'Demonstrate mastery of present simple, present continuous, can/can\'t, and like + gerund.',
          'Include interview questions using proper do/does structure.',
          'Connect hobbies and talents to God-given purpose and stewardship.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have learned to talk about your hobbies, abilities, and daily actions in English. Now it is time to put it all together! You will create a presentation that introduces YOU — your favorite activities, your talents, and your goals — all in correct English.',
              connection: 'God has given each of us unique interests and abilities. Ephesians 2:10 says, "We are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." Your hobbies and talents are part of God\'s design for your life.'
            },
            {
              type: 'text',
              heading: 'Project: My Favorite Activities Presentation',
              body: '**Create a presentation (written, poster, or slides) that includes:**\n\n1. **Introduction** (3-4 sentences): Who are you? Where do you live? What is one interesting fact about you?\n\n2. **My Hobbies** (5-6 sentences): What do you like doing? Use "like + gerund/infinitive" and the correct sport verbs (play/do/go).\n\n3. **My Abilities** (4-5 sentences): What can you do well? What can\'t you do yet? What are you going to learn?\n\n4. **My Daily Routine** (4-5 sentences): What do you do every day? (present simple) What are you doing this week? (present continuous)\n\n5. **Interview Section** (6 questions + answers): Write 6 questions about activities — at least 2 yes/no (do/does) and 4 WH-questions. Provide answers.\n\n6. **Reflection** (2-3 sentences): How do your activities connect to God\'s purpose for your life? Use Ephesians 2:10 or 1 Corinthians 10:31.\n\n**Total: 350-450 words**\n\n**Grammar checklist:**\n- ✓ Third-person -s (he walks, she plays)\n- ✓ Like + gerund or infinitive\n- ✓ Can/can\'t + base verb\n- ✓ Present continuous (am/is/are + -ING)\n- ✓ Do/does in questions\n- ✓ No "I am go to" errors'
            },
            {
              type: 'biblical-worldview',
              theme: 'Created for Good Works',
              scriptureRef: 'Ephesians 2:10; 1 Corinthians 10:31',
              reflection: 'Ephesians 2:10 teaches that we are God\'s masterpiece, created for good works. Your hobbies, abilities, and daily activities are not random — they are part of God\'s plan for you. When you present who you are and what you do, you are sharing the story of how God made you.',
              applicationQuestion: 'How do your favorite activities connect to the way God designed you?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What grammar points from this unit do you need to include in your presentation?',
                'How can you make your presentation interesting and personal while using correct English?',
                'How does Ephesians 2:10 change the way you think about your hobbies?'
              ]
            },
            {
              type: 'practice',
              activity: 'Presentation Draft',
              prompt: 'Draft each section of your presentation. Focus on correct grammar:\n1. Write your Introduction (3-4 sentences).\n2. List 3 hobbies using "I like + -ING" or "I like + to...".\n3. Write 3 "I can" and 1 "I can\'t" sentence.\n4. Write your 6 interview questions with do/does and WH-words.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Favorite Activities Presentation',
              prompt: 'Write your complete presentation (350-450 words) including all 6 sections. Use correct English grammar throughout. Your presentation should demonstrate everything you learned in this unit: present simple, present continuous, like + gerund, can/can\'t, do/does questions, and correct question words.'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content & Completeness', excellent: 'All 6 sections included with rich personal detail and 350+ words', proficient: 'All sections present with adequate detail, 250-349 words', developing: 'Missing sections or minimal detail, under 250 words' },
                { name: 'Grammar Accuracy', excellent: 'Correct use of all target structures with minimal errors: -s endings, like + gerund, can, continuous, do/does questions', proficient: 'Mostly correct with occasional errors in 1-2 structures', developing: 'Frequent errors in multiple structures; French interference evident' },
                { name: 'Question Formation', excellent: '6+ well-formed questions with proper do/does usage and varied question words', proficient: '4-5 questions, mostly correct structure', developing: 'Fewer than 4 questions or missing do/does auxiliary' },
                { name: 'Biblical Reflection', excellent: 'Thoughtful connection between activities and God\'s purpose with scripture reference', proficient: 'Basic connection to biblical theme with a verse', developing: 'No biblical reflection or connection' }
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'My Favorite Activities Presentation',
        estimatedMinutes: 45,
        objectives: [
          'Present hobbies and abilities using correct English grammar.',
          'Write interview questions with do/does.',
          'Use present simple, present continuous, and can/can\'t correctly.',
          'Connect activities to a Bible verse about God\'s purpose.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Time to show what you have learned! Create a presentation about your favorite activities using all the English grammar from this unit.',
              connection: 'Ephesians 2:10 says we are God\'s masterpiece. Your hobbies and talents are part of how God made you special!'
            },
            {
              type: 'text',
              heading: 'Project: My Activities Presentation',
              body: '**Include these sections:**\n1. **About Me** (2-3 sentences): Your name, where you live\n2. **My Hobbies** (3-4 sentences): Use "I like + -ING" or "I like + to..."\n3. **My Abilities** (3 sentences): I can / I can\'t / I am going to...\n4. **Interview Questions** (4 questions + answers): Use do/does and question words\n5. **Bible Verse** (1-2 sentences): Connect to 1 Corinthians 10:31 or Ephesians 2:10\n\n**Total: 200-300 words**'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Made You Special',
              scriptureRef: 'Ephesians 2:10',
              reflection: 'You are God\'s creation, made for good works. Your hobbies and abilities are gifts from Him!',
              applicationQuestion: 'How do your activities show who God made you to be?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What hobbies will you include in your presentation?',
                'What 4 questions will you write? Make sure to use do/does!'
              ]
            },
            {
              type: 'practice',
              activity: 'Draft Your Sections',
              prompt: 'Write a draft of each section. Check: Did you add -s for he/she/it? Did you use do/does in your questions? Did you use "going to" (not "go to")?'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Activities Presentation',
              prompt: 'Write your complete presentation (200-300 words) with all 5 sections. Check your grammar carefully!'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content', excellent: 'All 5 sections included with personal detail', proficient: '4 sections included', developing: 'Missing multiple sections' },
                { name: 'Grammar', excellent: 'Correct -s endings, like + gerund, can, do/does questions', proficient: 'Mostly correct with some errors', developing: 'Many grammar errors' },
                { name: 'Bible Connection', excellent: 'Bible verse with personal connection', proficient: 'Bible verse included', developing: 'No Bible verse' }
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'My Favorite Activities Presentation',
        estimatedMinutes: 35,
        objectives: [
          'Write about hobbies and abilities in simple English.',
          'Ask 2-3 questions using do/does.',
          'Include a Bible verse.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Let\'s show what you have learned! Write about your hobbies and ask some questions in English.',
              connection: 'God made you special with your own talents. Everything you do can honor Him (1 Corinthians 10:31).'
            },
            {
              type: 'text',
              heading: 'Project: My Activities',
              body: '**Write about yourself:**\n1. **My name and where I live** (2 sentences)\n2. **My hobbies**: I like ___ING. I like ___ING. (2-3 sentences)\n3. **My abilities**: I can ___. I can\'t ___. (2 sentences)\n4. **2 questions**: Do you like...? What do you...? (2 questions + answers)\n5. **Bible verse** about God and our activities\n\n**Total: 80-120 words**'
            },
            {
              type: 'biblical-worldview',
              theme: 'Honoring God with Our Activities',
              scriptureRef: '1 Corinthians 10:31',
              reflection: 'Whatever you do, do it for God\'s glory. Your hobbies matter to God!',
              applicationQuestion: 'What is one thing you like doing that can make God happy?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What 2 hobbies will you write about?',
                'What question will you ask using "Do you...?"'
              ]
            },
            {
              type: 'practice',
              activity: 'Write Your Sentences',
              prompt: 'Write:\n1. My name is ___. I live in ___.\n2. I like ___ING.\n3. I can ___.\n4. Do you like ___?'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Activities Page',
              prompt: 'Write your complete mini-presentation (80-120 words) with all 5 parts: name, hobbies, abilities, questions, Bible verse.'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content', excellent: 'All 5 parts included', proficient: '3-4 parts included', developing: 'Fewer than 3 parts' },
                { name: 'English', excellent: 'Clear, correct sentences', proficient: 'Some errors but understandable', developing: 'Hard to understand' },
                { name: 'Bible Verse', excellent: 'Verse included', proficient: 'Verse attempted', developing: 'No verse' }
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'presentation', definition: 'A talk or written piece where you share information with others (French: presentation)', example: 'I am giving a presentation about my hobbies.' },
      { term: 'interview', definition: 'A conversation where one person asks questions and another answers', example: 'I wrote interview questions about hobbies for my project.' },
      { term: 'ability', definition: 'Something you can do; a skill (French: capacite)', example: 'Swimming is one of my abilities.' },
      { term: 'goal', definition: 'Something you want to achieve in the future (French: but, objectif)', example: 'My goal is to learn to play guitar this year.' },
      { term: 'talent', definition: 'A natural ability or skill that God has given you (French: talent)', example: 'Everyone has different talents from God.' }
    ],
    quiz: []
  }
]

// ═══════════════════════════════════════════════════════════════════════════════
// UNIT 6: HEALTH AND BODY (W1–W4)
// ═══════════════════════════════════════════════════════════════════════════════

const unit6Lessons: EnrichedLesson[] = [
  // ── W1: Parts of the Body ─────────────────────────────────────────────────
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Parts of the Body',
        estimatedMinutes: 60,
        objectives: [
          'Identify and use English vocabulary for body parts in spoken and written context.',
          'Describe physical characteristics of people using correct English structures.',
          'Recognize and avoid the false cognate "blesse" (injured, NOT blessed).',
          'Pronounce body part vocabulary correctly, paying attention to silent letters and sounds not found in French.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You use your body every day — your head to think, your hands to work, your legs to walk. But can you name all the body parts in English? And be careful with one tricky word: in French, "blesse" means "injured." In English, "blessed" means something completely different! Let\'s learn about the body God gave you.',
              connection: 'Your body is a temple of the Holy Spirit (1 Corinthians 6:19-20). God designed every part of your body with purpose. Learning to describe the body in English helps you appreciate God\'s amazing creation and communicate about health in new languages.'
            },
            {
              type: 'reading',
              title: 'My Body: A Guided Tour',
              source: 'A1-A2 English Reading',
              text: 'Let\'s take a tour of the human body — from top to bottom!\n\nOn top of your body is your **head**. On your head, you have **hair**. Your **face** has many parts: your **eyes** for seeing, your **ears** for hearing, your **nose** for smelling, and your **mouth** for talking and eating. Inside your mouth are your **teeth** and your **tongue**.\n\nBelow your head is your **neck**, which connects your head to your body. Your **shoulders** are at the top of your body. Your **arms** hang from your shoulders. At the end of each arm is a **hand** with five **fingers**.\n\nIn the middle of your body is your **chest** (in the front) and your **back** (behind). Below that is your **stomach**.\n\nYour **legs** help you walk and run. Each leg has a **knee** in the middle. At the bottom of each leg is a **foot** with five **toes**.\n\n**Pronunciation alerts for French speakers:**\n- **knee** = /nee/ — the K is SILENT! (French speakers want to say "kuh-nee")\n- **tongue** = /tung/ — only one syllable, not "tong-oo"\n- **stomach** = /STUM-uk/ — the "ch" sounds like /k/, not like French "ch" (/sh/)\n- **muscle** = /MUS-ul/ — the "c" is silent!\n\n**FALSE COGNATE ALERT:**\n"Blesse" in French means **injured/hurt**. But "blessed" in English means **happy, fortunate, or favored by God**! They sound similar but mean very different things.'
            },
            {
              type: 'text',
              heading: 'Describing Physical Characteristics',
              body: 'In English, we describe people\'s physical appearance using these patterns:\n\n**Height:**\n- He is **tall**. She is **short**. I am **average height**.\n- "How tall are you?" "I am five feet, four inches tall."\n\n**Build:**\n- He is **thin/slim**. She is **strong/muscular**. He is **heavy/large**.\n\n**Hair:**\n- She has **long**, **black** hair. (Order: length + color)\n- He has **short**, **curly**, **brown** hair. (length + texture + color)\n- She has **straight** hair. He has **wavy** hair.\n\n**Eyes:**\n- She has **brown** eyes. He has **green** eyes.\n\n**Skin:**\n- He has **dark** skin. She has **light** skin.\n\n**Structure:** Subject + **has/have** + adjective + body part\n- She **has** long, black hair.\n- They **have** brown eyes.\n\n**Structure:** Subject + **is** + adjective\n- He **is** tall. She **is** thin.\n\n**French comparison:** In French, you might say "Il a les yeux marron" (He has the brown eyes — with the article "les"). In English, we do NOT use "the" in this pattern:\n- WRONG: "He has the brown eyes."\n- CORRECT: "He has brown eyes." (no article!)'
            },
            {
              type: 'biblical-worldview',
              theme: 'Your Body Is a Temple',
              scriptureRef: '1 Corinthians 6:19-20; Psalm 139:13-14',
              reflection: 'Psalm 139:14 says, "I praise you because I am fearfully and wonderfully made." Every body part — from your eyes to your toes — was designed by God with purpose and care. 1 Corinthians 6:19-20 teaches that your body is a "temple of the Holy Spirit." This means your body belongs to God, not just to you. When we learn about our bodies and care for them, we honor the Creator who made us. Every person\'s body — tall or short, strong or gentle — is a masterpiece of God\'s design.',
              applicationQuestion: 'What does it mean to treat your body as a "temple of the Holy Spirit"? How does Psalm 139:14 change the way you think about your body?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Why is "blesse" (French for injured) a dangerous false cognate with "blessed" (English for happy/favored)? What confusion could it cause?',
                'Why does English have so many silent letters in body words (knee, muscle, tongue)? How can you practice the correct pronunciation?',
                'Read Psalm 139:14. How does knowing that you are "fearfully and wonderfully made" affect how you think about your body?'
              ]
            },
            {
              type: 'practice',
              activity: 'Body Vocabulary and Description',
              prompt: 'Part 1: Label a body diagram with 15+ body parts in English.\n\nPart 2: Describe 3 people using the patterns learned:\n- Person 1: Describe yourself (5-6 sentences including height, build, hair, eyes)\n- Person 2: Describe a family member (5-6 sentences)\n- Person 3: Describe a famous person (5-6 sentences)\n\nRemember: use "has/have" for features and "is" for adjectives. Do not use "the" before body part descriptions.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Pronunciation and False Cognate Guide',
              prompt: 'Create a "Pronunciation Guide for French Speakers" for body vocabulary. Include:\n1. 6 body part words with their pronunciation written out (e.g., "knee = /nee/ — K is silent")\n2. 3 false cognates related to the body (blesse/blessed, plus 2 more from your knowledge)\n3. For each false cognate, explain: the French meaning, the English meaning, and a sentence using the correct English word.\n\nThen write a paragraph (5-6 sentences) explaining how Psalm 139:13-14 connects to learning about the body.'
            },
            {
              type: 'discussion',
              questions: [
                'Describe a classmate using 4-5 sentences in English (height, hair, eyes). Use "has" and "is."',
                'Which body vocabulary pronunciation is hardest for you? Practice saying it 3 times.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Parts of the Body',
        estimatedMinutes: 45,
        objectives: [
          'Learn English words for major body parts.',
          'Describe people using "has/have" and "is" structures.',
          'Know the false cognate "blesse" (injured) vs. "blessed" (happy/favored).',
          'Practice pronouncing body part words with silent letters.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Can you name all the parts of your body in English? Head, eyes, nose, mouth... what about knee, elbow, and shoulder? And be careful: French "blesse" (injured) is NOT the same as English "blessed" (happy)!',
              connection: 'Psalm 139:14 says, "I am fearfully and wonderfully made." God made every part of your body with care. Learning these words in English helps us care for God\'s creation — our bodies!'
            },
            {
              type: 'reading',
              title: 'Body Parts',
              source: 'A1 English Reading',
              text: '**Head:** head, hair, face, eyes, ears, nose, mouth, teeth, tongue\n**Upper body:** neck, shoulders, arms, hands, fingers, chest, back\n**Lower body:** stomach, legs, knees, feet, toes\n\n**Pronunciation tips:**\n- knee = /nee/ (K is silent!)\n- muscle = /MUS-ul/ (C is silent!)\n- stomach = /STUM-uk/ ("ch" = /k/ sound)\n\n**False cognate:** French "blesse" = **injured**. English "blessed" = **happy, favored by God**. Very different!'
            },
            {
              type: 'text',
              heading: 'Describing People',
              body: '**Use "is" for general description:**\n- She is tall. He is short. I am thin.\n\n**Use "has/have" for features:**\n- She has brown eyes. He has short hair.\n- They have dark skin.\n\n**Hair description order:** length + texture + color\n- She has long, straight, black hair.\n\n**Remember:** NO "the" before body descriptions!\n- WRONG: "She has the brown eyes."\n- CORRECT: "She has brown eyes."'
            },
            {
              type: 'biblical-worldview',
              theme: 'Wonderfully Made',
              scriptureRef: 'Psalm 139:14; 1 Corinthians 6:19',
              reflection: 'God made your body with love and purpose. Psalm 139:14 says you are "wonderfully made." Your body is a temple of the Holy Spirit (1 Corinthians 6:19). Taking care of your body honors God.',
              applicationQuestion: 'How can you take care of the body God gave you?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What body parts have silent letters in English? Practice saying: knee, muscle, tongue.',
                'What is the difference between French "blesse" and English "blessed"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Describe People',
              prompt: 'Describe yourself and one friend or family member (4-5 sentences each). Use "is" for adjectives and "has/have" for features.\n\nExample: "I am tall. I have short, black hair. I have brown eyes. My sister is short. She has long, curly hair."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Body Part Challenge',
              prompt: 'Write 10 body parts in English without looking at your notes. Then use 5 of them in sentences about someone you know.\n\nExample: "My brother has strong arms. He has big hands."'
            },
            {
              type: 'discussion',
              questions: [
                'Describe a classmate in 3 sentences without saying their name. Can others guess who it is?',
                'Why does Psalm 139:14 say we are "wonderfully made"?'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Parts of the Body',
        estimatedMinutes: 35,
        objectives: [
          'Learn English words for 10+ body parts.',
          'Describe people using simple sentences.',
          'Know that French "blesse" means "injured" (not "blessed").'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Can you name your body parts in English? Let\'s learn: head, eyes, nose, mouth, arms, hands, legs, feet!',
              connection: 'God made your body and it is wonderful! Psalm 139:14 says you are "fearfully and wonderfully made."'
            },
            {
              type: 'reading',
              title: 'My Body',
              source: 'A1 English Reading',
              text: '**My head:** eyes, ears, nose, mouth, teeth, hair\n**My body:** neck, arms, hands, fingers, stomach, back\n**My legs:** legs, knees, feet, toes\n\n**Be careful:** French "blesse" = injured. English "blessed" = happy!'
            },
            {
              type: 'text',
              heading: 'Body Words',
              body: '**Body parts to know:**\nhead, hair, eyes, ears, nose, mouth, teeth, neck, shoulders, arms, hands, fingers, stomach, back, legs, knees, feet, toes\n\n**Describe people:**\n- She is tall. He is short.\n- I have brown eyes. She has long hair.\n\n**At work:** If you get hurt, you need these words: "My arm hurts." "I hurt my back."'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Made You',
              scriptureRef: 'Psalm 139:14',
              reflection: 'God made every part of you — head, hands, feet — and it is all wonderful!',
              applicationQuestion: 'What part of your body are you most thankful for?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Can you point to your knee, elbow, and shoulder? Say each word in English.',
                'How do you say "I have brown eyes" in English?'
              ]
            },
            {
              type: 'practice',
              activity: 'Label the Body',
              prompt: 'Write 10 body parts in English. Then write 3 sentences about yourself:\n1. I have _____ hair.\n2. I have _____ eyes.\n3. I am _____ (tall/short).'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Body Part Quiz Yourself',
              prompt: 'Match:\n1. You use these to see → _____\n2. You use these to walk → _____\n3. You use this to think → _____\n4. You use these to hold things → _____\n5. This is between your head and shoulders → _____\n\n(eyes, legs, head, hands, neck)\n\nThen describe a family member in 3 sentences.'
            },
            {
              type: 'discussion',
              questions: [
                'Point to 5 body parts and say their English names.'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'head', definition: 'The top part of your body, containing your brain, eyes, ears, nose, and mouth (French: tete)', example: 'My head hurts. I have a headache.' },
      { term: 'knee', definition: 'The joint in the middle of your leg (French: genou). SILENT K — say /nee/, not /k-nee/!', example: 'I hurt my knee playing soccer.' },
      { term: 'stomach', definition: 'The front middle part of your body; also the organ that digests food (French: estomac/ventre). Say /STUM-uk/', example: 'My stomach is full after lunch.' },
      { term: 'shoulder', definition: 'The joint connecting your arm to your body (French: epaule)', example: 'She has strong shoulders from swimming.' },
      { term: 'muscle', definition: 'Body tissue that helps you move and lift things (French: muscle). SILENT C — say /MUS-ul/!', example: 'Exercise makes your muscles stronger.' },
      { term: 'blessed', definition: 'Happy, fortunate, or favored by God (NOT "injured"! False cognate: French "blesse" = injured)', example: 'We are blessed to have good health.' },
      { term: 'injured', definition: 'Hurt, wounded (THIS is the correct English word for French "blesse")', example: 'He was injured during the soccer game.' },
      { term: 'tongue', definition: 'The muscle inside your mouth used for tasting and speaking (French: langue). Say /tung/ — one syllable!', example: 'You use your tongue to taste food.' }
    ],
    quiz: [
      { question: 'What does the French word "blesse" mean in English?', options: ['Blessed (happy)', 'Injured (hurt)', 'Body', 'Blood'], correctAnswer: 1, explanation: 'French "blesse" = English "injured/hurt." This is a false cognate! English "blessed" means happy or favored by God.' },
      { question: 'How do you pronounce "knee" in English?', options: ['/k-nee/ (pronounce the K)', '/nee/ (the K is silent)', '/nay/', '/kin/'], correctAnswer: 1, explanation: 'The K in "knee" is silent. Pronounce it as /nee/.' },
      { question: 'Which sentence correctly describes someone?', options: ['She has the brown eyes.', 'She has brown eyes.', 'She have brown eyes.', 'She is brown eyes.'], correctAnswer: 1, explanation: 'In English, we say "She has brown eyes" — no article "the" before the description.' },
      { question: '"He is tall. He _____ short, curly hair."', options: ['is', 'are', 'has', 'have'], correctAnswer: 2, explanation: 'Use "is" for adjectives (tall, short) and "has" for features (hair, eyes): "He has short, curly hair."' },
      { question: 'How is "stomach" pronounced in English?', options: ['/sto-MASH/ (like French ch)', '/STUM-uk/ (ch = /k/ sound)', '/sto-MATCH/', '/STOM-ach/'], correctAnswer: 1, explanation: 'In "stomach," the "ch" makes a /k/ sound, not the French "sh" sound. Say /STUM-uk/.' },
      { question: 'Which is the correct order for describing hair?', options: ['Color + length + texture', 'Texture + color + length', 'Length + texture + color', 'Color + texture + length'], correctAnswer: 2, explanation: 'In English, describe hair in this order: length + texture + color. Example: "long, straight, black hair."' },
      { question: 'What does Psalm 139:14 say about your body?', options: ['Your body is not important.', 'You are fearfully and wonderfully made.', 'Only your soul matters to God.', 'Bodies are temporary.'], correctAnswer: 1, explanation: 'Psalm 139:14 says, "I praise you because I am fearfully and wonderfully made." God designed your body with purpose and care.' },
      { question: 'How is "muscle" pronounced?', options: ['/MUS-kle/', '/MUS-ul/ (C is silent)', '/MUK-sel/', '/MUSK-le/'], correctAnswer: 1, explanation: 'The C in "muscle" is silent. Say /MUS-ul/.' },
      { question: '"She has _____ hair." (long, black, straight — put in correct order)', options: ['black, long, straight', 'long, straight, black', 'straight, black, long', 'long, black, straight'], correctAnswer: 1, explanation: 'The correct order is length + texture + color: "long, straight, black hair."' },
      { question: 'What does 1 Corinthians 6:19 say about your body?', options: ['Your body belongs to you only.', 'Your body is a temple of the Holy Spirit.', 'Your body is not important.', 'God does not care about bodies.'], correctAnswer: 1, explanation: '1 Corinthians 6:19 teaches that "your body is a temple of the Holy Spirit." We should honor God with our bodies.' }
    ]
  },

  // ── W2: Health and Feelings ───────────────────────────────────────────────
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Health and Feelings',
        estimatedMinutes: 60,
        objectives: [
          'Use "I feel + adjective" to express emotions and physical states.',
          'Learn a wide range of emotion vocabulary in English.',
          'Identify and avoid false cognates related to feelings (sensible, sympathique, excite).',
          'Describe emotions and health conditions in complete, grammatically correct sentences.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How are you feeling today? In English, we say "I feel happy" or "I feel sick." But be very careful with some feeling words! In French, "sensible" means sensitive, not sensible. "Sympathique" means nice or friendly, not sympathetic. And "excite" in French has a very different connotation from "excited" in English! Let\'s learn to talk about feelings and health without making embarrassing mistakes.',
              connection: 'God cares deeply about our emotions. Psalm 34:18 says, "The Lord is close to the brokenhearted." Jesus Himself experienced every human emotion — joy, sadness, anger, compassion. Learning to express our feelings in English helps us connect with others and bring our emotions to God in prayer.'
            },
            {
              type: 'reading',
              title: 'How Are You Feeling?',
              source: 'A1-A2 English Reading',
              text: 'Teacher: Good morning, everyone! How are you feeling today?\n\nSamuel: I feel **happy** today! I got a good grade on my test.\n\nEsther: I feel a little **tired**. I didn\'t sleep well last night.\n\nJacques: I feel **nervous**. We have a big presentation today.\n\nMarie: I feel **sick**. I have a **headache** and my **stomach hurts**.\n\nTeacher: I\'m sorry to hear that, Marie. You should go to the nurse.\n\n**Common feelings:**\n- Positive: happy, excited, proud, grateful, calm, confident\n- Negative: sad, angry, tired, nervous, scared, worried, sick\n- Neutral: surprised, confused, bored, hungry, thirsty\n\n**Express feelings with "I feel + adjective":**\n- I feel happy. She feels tired. They feel nervous.\n- NOT "I feel me happy" (French interference: "Je me sens heureux")\n\n**Asking about feelings:**\n- "How are you?" (general greeting)\n- "How are you feeling?" (genuine question about health/emotions)\n- "What\'s wrong?" (when someone looks upset or sick)\n- "Are you okay?" (showing concern)'
            },
            {
              type: 'text',
              heading: 'False Cognates for Feelings — Critical Warnings!',
              body: 'These false cognates can cause serious misunderstandings:\n\n**1. SENSIBLE ≠ sensible**\n- French "sensible" = English **"sensitive"** (easily affected emotionally)\n- English "sensible" = **"reasonable, practical, wise"**\n- French: "Elle est tres sensible" → English: "She is very **sensitive**" (NOT sensible!)\n- English: "That\'s a sensible decision" = a wise, practical decision\n\n**2. SYMPATHIQUE ≠ sympathetic**\n- French "sympathique" = English **"nice, friendly, likeable"**\n- English "sympathetic" = **"feeling sorry for someone\'s pain"**\n- French: "Il est sympathique" → English: "He is **nice/friendly**" (NOT sympathetic!)\n- English: "She was sympathetic about my problem" = she understood my pain\n\n**3. EXCITE — Different Connotation!**\n- French "excite" can have a sexual/agitated connotation\n- English "excited" = **"enthusiastic, eager, happy about something"**\n- English: "I am excited about the trip!" = I am very happy and eager!\n- This is perfectly normal to say in English — it does NOT have the French connotation\n\n**4. MISERABLE ≠ miserable (degree)**\n- French "miserable" can mean "very poor" (poverty)\n- English "miserable" = **"very unhappy, wretched"**\n- They overlap somewhat, but the primary English meaning is about unhappiness, not poverty\n\n**Remember:** When in doubt about a feeling word, check if it is a false cognate!'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Cares About Our Feelings',
              scriptureRef: 'Psalm 34:18; John 11:35; Philippians 4:6-7',
              reflection: 'God is not distant from our emotions. Psalm 34:18 says, "The Lord is close to the brokenhearted and saves those who are crushed in spirit." Jesus Himself wept (John 11:35) — the shortest verse in the Bible, but one of the most powerful. He felt compassion, anger at injustice, joy, and sorrow. Philippians 4:6-7 invites us to bring our worries to God: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God... will guard your hearts and your minds." Learning to express our feelings — even in a new language — helps us bring those feelings to God.',
              applicationQuestion: 'What emotions are hardest for you to express? How does knowing that Jesus experienced human emotions change how you talk to God about your feelings?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'Explain the three biggest false cognates for feelings: sensible, sympathique, and excite. What does each word ACTUALLY mean in English?',
                'Why is it important to correctly express emotions in a second language? What could go wrong with a false cognate mistake?',
                'Read John 11:35. Why do you think Jesus wept? What does this tell us about God\'s relationship with our emotions?'
              ]
            },
            {
              type: 'practice',
              activity: 'Emotion Writing and False Cognate Correction',
              prompt: 'Part 1: Write a sentence using "I feel + adjective" for each of these situations:\n1. You got a good grade on a test.\n2. You didn\'t sleep well last night.\n3. You have a big presentation tomorrow.\n4. Someone said something unkind to you.\n5. You are going on a trip next week.\n\nPart 2: Correct the false cognate errors:\n1. "She is very sensible — she cries easily." (Fix the false cognate.)\n2. "My teacher is very sympathique." (Translate correctly to English.)\n3. "Don\'t say \'excite\' in English — it means something bad." (Explain why this is wrong.)'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Feelings Journal and Guide',
              prompt: 'Write a "Feelings Journal" entry (150-200 words) describing a day in your life. Include:\n- At least 6 different emotion words\n- 3 uses of "I feel + adjective"\n- A description of what caused each feeling\n- A prayer or reflection connecting your feelings to God (using Psalm 34:18 or Philippians 4:6-7)\n\nThen create a "False Cognate Warning Card" for feelings with the 3 main false cognates, their French meaning, their true English meaning, and a correct English sentence for each.'
            },
            {
              type: 'discussion',
              questions: [
                'How are you feeling right now? Use 3 different emotion words to describe your state.',
                'Share one time when you felt a strong emotion. Describe it in English using "I felt + adjective."'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Health and Feelings',
        estimatedMinutes: 45,
        objectives: [
          'Use "I feel + adjective" to describe emotions and health.',
          'Learn 10+ emotion words in English.',
          'Avoid false cognates: sensible, sympathique, excite.',
          'Express concern and ask about others\' feelings.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How are you feeling today? Happy? Tired? Nervous? In English, we say "I feel + adjective." Let\'s learn how to talk about our feelings — and avoid some tricky false cognates!',
              connection: 'God cares about how you feel. Psalm 34:18 says He is "close to the brokenhearted." You can always tell God how you feel.'
            },
            {
              type: 'reading',
              title: 'Feelings Vocabulary',
              source: 'A1-A2 English Reading',
              text: '**Positive feelings:** happy, excited, proud, grateful, calm\n**Negative feelings:** sad, angry, tired, nervous, scared, worried, sick\n**Neutral feelings:** surprised, confused, bored, hungry, thirsty\n\n**How to say it:** I feel happy. She feels tired.\n\n**False cognates!**\n- French "sensible" = English "sensitive" (NOT sensible)\n- French "sympathique" = English "nice/friendly" (NOT sympathetic)\n- English "excited" = happy and eager (it is OK to say "I am excited"!)'
            },
            {
              type: 'text',
              heading: 'I Feel + Adjective',
              body: '**Structure:** I feel + adjective\n- I feel happy. I feel sick. I feel tired.\n- She feels nervous. He feels excited.\n\n**NOT:** "I feel me happy" (French: "je me sens" — but English does not use "me")\n\n**Asking about feelings:**\n- "How are you feeling?"\n- "What\'s wrong?"\n- "Are you okay?"\n\n**Responding:**\n- "I feel great, thank you!"\n- "I don\'t feel well. I have a headache."\n- "I\'m a little nervous about the test."'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Understands Our Feelings',
              scriptureRef: 'Psalm 34:18; John 11:35',
              reflection: 'Jesus wept (John 11:35). God understands every emotion you feel — happiness, sadness, fear, anger. You can always bring your feelings to God in prayer.',
              applicationQuestion: 'What feeling do you most want to tell God about today?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What does "I feel + adjective" look like? Give 3 examples.',
                'What is the difference between French "sensible" and English "sensible"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Express Your Feelings',
              prompt: 'Write a sentence using "I feel..." for each situation:\n1. You passed a test. → I feel _____.\n2. You are very tired. → I feel _____.\n3. You are going to a new school. → I feel _____.\n4. Someone was kind to you. → I feel _____.\n5. You have a headache. → I feel _____.\n\nThen correct: "She is very sensible — she cries often." (What is the correct English word?)'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Feelings Conversation',
              prompt: 'Write a conversation (8-10 lines) where two friends ask about each other\'s feelings. Use at least 4 different emotion words and the patterns "How are you feeling?" and "I feel + adjective."'
            },
            {
              type: 'discussion',
              questions: [
                'Tell a partner how you are feeling using 2 different emotion words.',
                'What is one feeling you want to tell God about? (based on Psalm 34:18)'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Health and Feelings',
        estimatedMinutes: 35,
        objectives: [
          'Use "I feel + adjective" for common emotions.',
          'Learn 8 basic emotion words in English.',
          'Know that French "sensible" means "sensitive" in English.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'How do you feel today? Happy? Tired? Sick? In English, we say "I feel happy" or "I feel sick." Let\'s learn feeling words!',
              connection: 'God cares about your feelings. Psalm 34:18 says He is close when you are sad.'
            },
            {
              type: 'reading',
              title: 'How Do You Feel?',
              source: 'A1 English Reading',
              text: 'I feel **happy**. I feel **sad**. I feel **tired**.\nI feel **sick**. I feel **hungry**. I feel **scared**.\n\nShe feels **nervous**. He feels **angry**.\n\n**Be careful:** French "sensible" = English "sensitive" (NOT sensible!)'
            },
            {
              type: 'text',
              heading: 'Feeling Words',
              body: '**I feel + adjective:**\n- happy, sad, tired, sick, hungry, thirsty, scared, angry, nervous\n\n**At work:**\n- "I don\'t feel well today." (when you are sick)\n- "I feel better now, thank you." (when you feel OK again)\n\n**Asking someone:** "How are you feeling?" / "Are you okay?"'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Cares About You',
              scriptureRef: 'Psalm 34:18',
              reflection: 'When you feel sad or scared, God is close to you. You can always tell Him how you feel.',
              applicationQuestion: 'How are you feeling today? Can you tell God?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you say "I am happy" using "I feel..."? (I feel happy.)',
                'How do you tell someone you are sick? (I don\'t feel well.)'
              ]
            },
            {
              type: 'practice',
              activity: 'Name Your Feelings',
              prompt: 'Complete:\n1. When I get a good grade, I feel _____.\n2. When I am tired, I feel _____.\n3. When I have a test, I feel _____.\n4. When my stomach hurts, I feel _____.\n\nThen tell a partner: "Today I feel _____."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Feelings Match',
              prompt: 'Match the situation to the feeling:\n1. You got a present → _____ (happy / angry)\n2. You didn\'t sleep → _____ (tired / hungry)\n3. You have a test tomorrow → _____ (nervous / bored)\n4. Your head hurts → _____ (sick / excited)\n\nWrite 3 sentences: "I feel _____ because _____."'
            },
            {
              type: 'discussion',
              questions: [
                'How do you feel right now? Say it in English: "I feel _____."'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'happy', definition: 'Feeling good, joyful (French: heureux/content)', example: 'I feel happy when I am with my friends.' },
      { term: 'tired', definition: 'Needing rest or sleep (French: fatigue)', example: 'I feel tired after a long day at school.' },
      { term: 'nervous', definition: 'Feeling worried or anxious about something (French: nerveux)', example: 'I feel nervous before a big test.' },
      { term: 'sick', definition: 'Not feeling well; having an illness (French: malade)', example: 'I feel sick. I have a headache.' },
      { term: 'sensitive', definition: 'Easily affected emotionally (False cognate: French "sensible" = English "sensitive," NOT "sensible"!)', example: 'She is very sensitive — she cries when she watches sad movies.' },
      { term: 'excited', definition: 'Very happy and eager about something (Safe to use in English! Different connotation than French "excite")', example: 'I am excited about the school trip next week!' },
      { term: 'friendly', definition: 'Kind, warm, easy to talk to (This is the correct translation for French "sympathique")', example: 'My new teacher is very friendly.' },
      { term: 'worried', definition: 'Feeling anxious or concerned about something (French: inquiet)', example: 'I am worried about my friend who is sick.' }
    ],
    quiz: [
      { question: 'What does the French word "sensible" mean in English?', options: ['Sensible (reasonable)', 'Sensitive (easily affected emotionally)', 'Silly', 'Serious'], correctAnswer: 1, explanation: 'French "sensible" = English "sensitive." English "sensible" means reasonable/practical. This is a false cognate!' },
      { question: 'Which sentence is correct?', options: ['I feel me happy.', 'I feel happy.', 'I am feel happy.', 'I feeling happy.'], correctAnswer: 1, explanation: 'In English, say "I feel happy" — no reflexive pronoun "me" like in French ("je me sens").' },
      { question: 'What does French "sympathique" mean in English?', options: ['Sympathetic (feeling sorry)', 'Nice / Friendly', 'Pathetic', 'Simple'], correctAnswer: 1, explanation: 'French "sympathique" = English "nice" or "friendly." English "sympathetic" means feeling sorry for someone\'s pain.' },
      { question: 'Is it okay to say "I am excited about the trip" in English?', options: ['No — "excited" has a bad meaning in English.', 'Yes — "excited" means enthusiastic and happy in English.', 'Only adults can say this.', 'Only in formal situations.'], correctAnswer: 1, explanation: '"Excited" in English simply means enthusiastic, eager, and happy. It does NOT have the connotation that "excite" sometimes has in French.' },
      { question: '"How are you _____?" (asking about someone\'s health or emotions)', options: ['feel', 'feeling', 'felt', 'feels'], correctAnswer: 1, explanation: '"How are you feeling?" is the correct question using present continuous to ask about current emotions or health.' },
      { question: 'Which word means "needing rest or sleep"?', options: ['Nervous', 'Tired', 'Worried', 'Angry'], correctAnswer: 1, explanation: '"Tired" means needing rest or sleep. "I feel tired" means you need to rest.' },
      { question: 'What does Psalm 34:18 say about God and our feelings?', options: ['God ignores our feelings.', 'God is close to the brokenhearted.', 'God only likes happy people.', 'We should never feel sad.'], correctAnswer: 1, explanation: 'Psalm 34:18 says, "The Lord is close to the brokenhearted and saves those who are crushed in spirit." God is near us in our pain.' },
      { question: '"I don\'t feel _____." (saying you are sick)', options: ['good', 'well', 'nice', 'fine'], correctAnswer: 1, explanation: '"I don\'t feel well" is the standard way to say you are sick in English.' },
      { question: '"She _____ nervous about the presentation."', options: ['feel', 'feels', 'is feel', 'feeling'], correctAnswer: 1, explanation: 'For she/he/it in present simple, add -s: "She feels nervous."' },
      { question: 'Which verse says "Jesus wept"?', options: ['Genesis 1:1', 'John 11:35', 'Psalm 23:1', 'Matthew 1:1'], correctAnswer: 1, explanation: 'John 11:35 — "Jesus wept" — the shortest verse in the Bible, showing that Jesus experienced human emotions.' }
    ]
  },

  // ── W3: At the Doctor's Office ────────────────────────────────────────────
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'At the Doctor\'s Office',
        estimatedMinutes: 60,
        objectives: [
          'Communicate symptoms, pain, and health conditions using correct English vocabulary.',
          'Use "should" for health advice and recommendations.',
          'Conduct polite medical dialogues with appointments, descriptions of symptoms, and doctor\'s instructions.',
          'Write medical-context sentences using appropriate formality and politeness.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Imagine you are visiting a doctor in an English-speaking country. You need to explain what hurts, describe your symptoms, and understand the doctor\'s instructions. Can you do all of that in English? Today we learn the language of health — from making an appointment to following medical advice.',
              connection: 'God is the ultimate Healer. Psalm 103:2-3 says, "Praise the Lord, my soul... who heals all your diseases." While doctors and medicine are gifts from God, healing ultimately comes from Him. Learning to communicate about health in English allows us to care for ourselves and serve others in medical contexts.'
            },
            {
              type: 'reading',
              title: 'A Visit to the Doctor',
              source: 'A1-A2 English Reading',
              text: '**Making an appointment:**\nPatient: Good morning. I\'d like to **make an appointment**, please.\nReceptionist: Of course. What\'s the problem?\nPatient: I have a bad **cough** and a **sore throat**.\nReceptionist: Can you come in at 2:00 this afternoon?\nPatient: Yes, that works. Thank you.\n\n**At the doctor\'s office:**\nDoctor: Hello, Marie. How are you feeling today?\nPatient: I don\'t feel well. I have a **headache**, a **sore throat**, and a **cough**. I also have a **fever**.\n\nDoctor: How long have you had these symptoms?\nPatient: **For three days**.\n\nDoctor: Let me check your **temperature**. You have a temperature of 38.5 degrees. Let me look at your throat. It\'s red and swollen. I think you have the **flu**.\n\nPatient: What **should** I do?\n\nDoctor: You **should** rest at home for a few days. You **should** drink lots of water and hot tea. You **should** take this medicine twice a day. You **shouldn\'t** go to school until your fever is gone.\n\nPatient: How long will it take to get better?\nDoctor: You **should** feel better in about a week. If you don\'t improve, come back and see me.\n\nPatient: Thank you, Doctor.\nDoctor: You\'re welcome. Take care!'
            },
            {
              type: 'text',
              heading: 'Describing Symptoms and Using "Should" for Advice',
              body: '**Common symptoms:**\n- I have a **headache** (my head hurts)\n- I have a **stomachache** (my stomach hurts)\n- I have a **toothache** (my tooth hurts)\n- I have a **sore throat** (my throat hurts)\n- I have a **cough** (I keep coughing)\n- I have a **cold** / the **flu**\n- I have a **fever** (high temperature)\n- I feel **dizzy** (the room is spinning)\n- I feel **nauseous** (I want to vomit)\n\n**Pattern:** "I have a + symptom" OR "My + body part + hurts"\n- I have a headache. = My head hurts.\n- I have a stomachache. = My stomach hurts.\n\n**SHOULD for health advice:**\n"Should" is used to give advice or recommendations — what is a good idea to do.\n\n- You **should** rest. (It is a good idea to rest.)\n- You **should** drink water. (I recommend drinking water.)\n- You **shouldn\'t** eat junk food. (It is not a good idea.)\n- **Should** I take medicine? (Asking for advice.)\n\n**Polite medical phrases:**\n- "I\'d like to make an appointment." (polite request)\n- "Could you check my temperature?" (polite request)\n- "How long should I take the medicine?" (asking for instructions)\n- "Thank you, Doctor. I appreciate your help."'
            },
            {
              type: 'biblical-worldview',
              theme: 'God the Healer',
              scriptureRef: 'Psalm 103:2-3; James 5:14-15; 3 John 1:2',
              reflection: 'The Bible presents God as the ultimate source of healing. Psalm 103:3 says God "heals all your diseases." James 5:14-15 encourages asking for prayer when sick. 3 John 1:2 says, "Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well." God cares about our physical health just as He cares about our spiritual health. Doctors, medicine, and hospitals are gifts from God — tools He uses to bring healing. When we communicate clearly about our health, we steward our bodies well.',
              applicationQuestion: 'How does trusting God as Healer change the way you approach illness? Can you trust God AND go to a doctor?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What is the difference between "I have a headache" and "My head hurts"? Can you say both for a stomachache?',
                'When should you use "should" vs. "must" for medical advice? Which one is stronger?',
                'Read James 5:14-15. How do prayer and medical care work together when we are sick?'
              ]
            },
            {
              type: 'practice',
              activity: 'Doctor Visit Dialogue',
              prompt: 'Write a complete doctor\'s visit dialogue (14-18 lines) including:\n1. Making an appointment (patient calls and describes symptoms)\n2. The doctor\'s examination (doctor asks about symptoms, how long, checks temperature)\n3. Diagnosis and advice (doctor uses "should" and "shouldn\'t" for at least 4 recommendations)\n\nInclude at least 4 different symptoms and 4 uses of "should/shouldn\'t."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Health Advice Column',
              prompt: 'Write a "Health Advice Column" where you respond to 3 different people\'s health problems. For each problem:\n1. The person describes their symptoms (2-3 sentences)\n2. You give advice using "should/shouldn\'t" (3-4 sentences)\n3. Include a polite, encouraging closing statement\n\nProblems: (a) headache and tired for 2 days, (b) cough and sore throat, (c) stomachache after eating\n\nEnd with a brief paragraph connecting health care to 1 Corinthians 6:19 (your body is a temple).'
            },
            {
              type: 'discussion',
              questions: [
                'Role-play: You are sick. Tell a partner your symptoms. They play the doctor and give advice using "should."',
                'What should you do to stay healthy? List 5 pieces of advice using "You should..."'
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'At the Doctor\'s Office',
        estimatedMinutes: 45,
        objectives: [
          'Describe common symptoms in English.',
          'Use "should" and "shouldn\'t" for health advice.',
          'Practice a simple doctor visit dialogue.',
          'Make polite requests in medical contexts.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you are sick, you need to tell the doctor what hurts. In English, we say "I have a headache" or "My stomach hurts." The doctor will give advice using "should" — "You should rest." Let\'s practice!',
              connection: 'God cares about our health. Psalm 103:3 says God "heals all your diseases." Doctors and medicine are gifts from God to help us get better.'
            },
            {
              type: 'reading',
              title: 'At the Doctor',
              source: 'A1 English Reading',
              text: 'Doctor: How are you feeling?\nPatient: I don\'t feel well. I have a **headache** and a **sore throat**.\nDoctor: Do you have a **fever**?\nPatient: Yes, I think so.\nDoctor: You **should** rest at home. You **should** drink lots of water. You **shouldn\'t** go to school until you feel better.\nPatient: Thank you, Doctor.'
            },
            {
              type: 'text',
              heading: 'Symptoms and "Should" for Advice',
              body: '**Common symptoms:**\n- I have a headache / stomachache / toothache / sore throat / cough / fever / cold\n- My head / stomach / back hurts.\n\n**"Should" for advice:**\n- You **should** rest. (good idea)\n- You **should** drink water.\n- You **shouldn\'t** eat junk food. (bad idea)\n\n**Polite phrases:**\n- "I\'d like to make an appointment."\n- "Could you help me, please?"\n- "Thank you, Doctor."'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Heals',
              scriptureRef: 'Psalm 103:3',
              reflection: 'God heals our diseases. Doctors are a gift from God. We should take care of our health because our bodies belong to God.',
              applicationQuestion: 'What do you do when you feel sick? Do you pray?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you say "my head hurts" two different ways in English?',
                'What is the difference between "should" and "must"?'
              ]
            },
            {
              type: 'practice',
              activity: 'Write a Dialogue',
              prompt: 'Write a doctor visit dialogue (8-10 lines):\n1. Doctor asks how the patient is feeling.\n2. Patient describes 2-3 symptoms.\n3. Doctor gives 3 pieces of advice using "should/shouldn\'t."\n4. Patient says thank you.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Give Health Advice',
              prompt: 'Your friend has these problems. Give advice using "should" or "shouldn\'t":\n1. "I have a headache." → You should...\n2. "I have a cough." → You should...\n3. "I eat junk food every day." → You shouldn\'t...\n4. "I never exercise." → You should...\n\nThen write 2 more health tips using "should."'
            },
            {
              type: 'discussion',
              questions: [
                'Role-play: Tell a partner your symptoms. They give advice using "should."',
                'What should you do to stay healthy? Give 3 tips.'
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'At the Doctor\'s Office',
        estimatedMinutes: 35,
        objectives: [
          'Tell a doctor your symptoms in simple English.',
          'Understand advice with "should" and "shouldn\'t."',
          'Make an appointment using polite English.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'When you are sick, you need to tell the doctor: "I have a headache" or "My stomach hurts." The doctor will say, "You should rest." Let\'s learn these important words!',
              connection: 'God cares about your health. Psalm 103:3 says God heals us. Doctors help us too.'
            },
            {
              type: 'reading',
              title: 'Telling the Doctor',
              source: 'A1 English Reading',
              text: 'Patient: I don\'t feel well.\nDoctor: What\'s wrong?\nPatient: I have a **headache**.\nDoctor: You **should** rest. You **should** take medicine.\nPatient: Thank you, Doctor.'
            },
            {
              type: 'text',
              heading: 'Health Words',
              body: '**Symptoms:**\n- headache, stomachache, sore throat, cough, fever\n- My head hurts. My stomach hurts.\n\n**Doctor\'s advice:**\n- You should rest.\n- You should drink water.\n- You shouldn\'t go to work.\n\n**At work:** "I don\'t feel well. I need to see a doctor." These phrases are important for any job.'
            },
            {
              type: 'biblical-worldview',
              theme: 'God Our Healer',
              scriptureRef: 'Psalm 103:3',
              reflection: 'God heals us. When you are sick, pray and go to a doctor. Both are important.',
              applicationQuestion: 'What do you say when you are sick?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'How do you say "my head hurts" in English?',
                'What does "You should rest" mean?'
              ]
            },
            {
              type: 'practice',
              activity: 'Describe Your Symptoms',
              prompt: 'Complete:\n1. I have a _____ (head hurts).\n2. My _____ hurts (stomach).\n3. I have a _____ (high temperature).\n\nThen write what the doctor should say: "You should _____."'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'Simple Doctor Dialogue',
              prompt: 'Write a 4-6 line dialogue:\nDoctor: What\'s wrong?\nPatient: I have a _____.\nDoctor: You should _____.\nPatient: Thank you.\n\nWrite it for 2 different symptoms.'
            },
            {
              type: 'discussion',
              questions: [
                'Tell a partner: "I have a _____ " and they give advice: "You should _____."'
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'headache', definition: 'Pain in your head (French: mal de tete)', example: 'I have a headache. = My head hurts.' },
      { term: 'sore throat', definition: 'Pain in your throat, often from a cold (French: mal de gorge)', example: 'I have a sore throat and I can\'t swallow easily.' },
      { term: 'fever', definition: 'A high body temperature, a sign of illness (French: fievre)', example: 'She has a fever of 39 degrees.' },
      { term: 'cough', definition: 'Forcing air from your lungs with a sharp sound (French: toux)', example: 'He has had a bad cough for three days.' },
      { term: 'should', definition: 'Used to give advice — "it is a good idea to..." (French: devrait)', example: 'You should rest when you are sick. You shouldn\'t go to school with a fever.' },
      { term: 'appointment', definition: 'A scheduled meeting with a doctor or professional (French: rendez-vous)', example: 'I\'d like to make an appointment with the doctor, please.' },
      { term: 'symptom', definition: 'A sign of illness — headache, fever, cough, etc. (French: symptome)', example: 'What are your symptoms? I have a cough and a fever.' },
      { term: 'medicine', definition: 'Something you take to get better when sick (French: medicament)', example: 'The doctor said I should take medicine twice a day.' }
    ],
    quiz: [
      { question: '"I have a _____" means "my head hurts."', options: ['stomachache', 'headache', 'toothache', 'backache'], correctAnswer: 1, explanation: 'A "headache" is pain in your head. "I have a headache" = "My head hurts."' },
      { question: 'Which sentence gives correct health advice?', options: ['You should to rest.', 'You should rest.', 'You should resting.', 'You should rests.'], correctAnswer: 1, explanation: '"Should" is followed by the base verb — no "to," no -ING, no -s: "You should rest."' },
      { question: '"I\'d like to make an _____" (schedule a doctor visit)', options: ['assignment', 'appointment', 'agreement', 'apartment'], correctAnswer: 1, explanation: 'An "appointment" is a scheduled meeting with a doctor. "I\'d like to make an appointment."' },
      { question: 'What is a "sore throat"?', options: ['Pain in your stomach', 'Pain in your throat', 'Pain in your ear', 'Pain in your chest'], correctAnswer: 1, explanation: 'A "sore throat" is pain in your throat, often caused by a cold or infection.' },
      { question: '"You _____ go to school when you have a fever."', options: ['should', 'shouldn\'t', 'must to', 'can to'], correctAnswer: 1, explanation: '"You shouldn\'t go to school when you have a fever" — it is not a good idea because you could make others sick.' },
      { question: 'What does "symptom" mean?', options: ['A type of medicine', 'A sign of illness (like cough, fever, pain)', 'A doctor\'s tool', 'A hospital room'], correctAnswer: 1, explanation: 'A "symptom" is a sign that you are sick — like a cough, fever, headache, or sore throat.' },
      { question: '"My stomach _____." (expressing pain)', options: ['sore', 'aches', 'hurts', 'pains'], correctAnswer: 2, explanation: '"My stomach hurts" is the most natural way to express stomach pain in English.' },
      { question: 'What does Psalm 103:3 say about God?', options: ['God makes people sick.', 'God heals all your diseases.', 'Only doctors can heal.', 'God does not care about health.'], correctAnswer: 1, explanation: 'Psalm 103:3 says God "heals all your diseases." God is the ultimate source of healing.' },
      { question: 'Which is a polite way to ask for help at a doctor\'s office?', options: ['Help me now!', 'I need you to help me.', 'Could you help me, please?', 'You must help me.'], correctAnswer: 2, explanation: '"Could you help me, please?" is polite and appropriate in a medical setting.' },
      { question: '"You should drink lots of _____ when you have the flu."', options: ['soda', 'coffee', 'water', 'juice'], correctAnswer: 2, explanation: 'Doctors recommend drinking lots of water when you are sick to stay hydrated and help your body recover.' }
    ]
  },

  // ── W4: My Health and Wellness Guide (PROJECT) ────────────────────────────
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'My Health and Wellness Guide',
        estimatedMinutes: 60,
        objectives: [
          'Design a comprehensive health advice poster or brochure in English.',
          'Use body vocabulary, symptom descriptions, and "should/shouldn\'t" for advice.',
          'Incorporate false cognate awareness and correct pronunciation guidance.',
          'Connect physical wellness to biblical stewardship of the body.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'You have learned about the body, feelings, symptoms, and doctor visits. Now put it all together! Design a Health and Wellness Guide that helps French-speaking students take care of their bodies and communicate about health in English.',
              connection: 'Caring for our health is an act of stewardship. 1 Corinthians 6:19-20 says, "Your body is a temple of the Holy Spirit... Therefore honor God with your bodies." A health guide that helps others care for their bodies is a way to honor God and serve your community.'
            },
            {
              type: 'text',
              heading: 'Project: My Health and Wellness Guide',
              body: '**Create a Health and Wellness Guide** (poster, brochure, or written guide) that includes:\n\n1. **Body Basics** (5-6 sentences): Label and describe important body parts with correct pronunciation notes for French speakers.\n\n2. **Common Health Problems** (6-8 sentences): Describe 4 common health problems with their symptoms. Use "I have a..." and "My... hurts."\n\n3. **Health Advice** (8-10 sentences): Give advice for staying healthy using "should/shouldn\'t." Cover: exercise, sleep, food, water, hygiene, and stress.\n\n4. **At the Doctor\'s** (6-8 sentences): Key phrases for making an appointment, describing symptoms, and understanding the doctor.\n\n5. **Feelings and Emotions** (4-5 sentences): How to express how you feel, with false cognate warnings (sensible, sympathique, excite).\n\n6. **False Cognate Alert Section**: List 4+ false cognates from this unit with the French meaning and correct English meaning.\n\n7. **Biblical Health Verse**: Include 1 Corinthians 6:19-20 and a personal reflection on caring for your body as a temple.\n\n**Total: 400-500 words**\n\n**Make it practical, clear, and useful for French-speaking students learning English!**'
            },
            {
              type: 'biblical-worldview',
              theme: 'Honor God with Your Body',
              scriptureRef: '1 Corinthians 6:19-20; 3 John 1:2',
              reflection: '1 Corinthians 6:19-20 says, "Do you not know that your bodies are temples of the Holy Spirit...? Therefore honor God with your bodies." 3 John 1:2 says, "Dear friend, I pray that you may enjoy good health." God cares about your physical well-being. Creating a health guide is an act of love — helping others steward the bodies God gave them.',
              applicationQuestion: 'How is creating a health guide an act of loving your neighbor?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What are the most important health tips to include in your guide?',
                'Which false cognates from this unit should French speakers absolutely know?',
                'How does caring for your health connect to honoring God?'
              ]
            },
            {
              type: 'practice',
              activity: 'Guide Planning',
              prompt: 'Plan your guide:\n1. List the 4 health problems you will describe.\n2. Write 6 "should/shouldn\'t" health tips.\n3. List all false cognates you will include (at least 4).\n4. Write your biblical reflection connecting health to 1 Corinthians 6:19-20.\n5. Draft the "At the Doctor\'s" key phrases section.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Health and Wellness Guide',
              prompt: 'Write your complete Health and Wellness Guide (400-500 words) including all 7 sections. Make it practical, accurate, and helpful for French-speaking students. Use correct English grammar throughout and include pronunciation tips where relevant.'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content Completeness', excellent: 'All 7 sections with detailed, helpful content and 400+ words', proficient: '5-6 sections with adequate detail', developing: 'Missing multiple sections or under 250 words' },
                { name: 'Medical Vocabulary', excellent: 'Correct use of 8+ health terms, symptoms, and "should/shouldn\'t" with no errors', proficient: '5-7 health terms with minor errors', developing: 'Fewer than 5 terms or significant errors' },
                { name: 'False Cognate Awareness', excellent: '4+ false cognates explained clearly with French meaning, English meaning, and example sentences', proficient: '2-3 false cognates with explanations', developing: '0-1 false cognates or incorrect explanations' },
                { name: 'Biblical Connection', excellent: 'Meaningful reflection on body as temple with scripture and personal application', proficient: 'Scripture included with brief connection', developing: 'No biblical content or minimal connection' }
              ]
            }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'My Health and Wellness Guide',
        estimatedMinutes: 45,
        objectives: [
          'Create a health guide with body vocabulary, symptoms, and advice.',
          'Use "should/shouldn\'t" for health recommendations.',
          'Include false cognate warnings.',
          'Connect health to biblical teaching.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Time to create a health guide! Use everything you learned about the body, symptoms, feelings, and doctor visits to help other students stay healthy.',
              connection: '1 Corinthians 6:19-20 says your body is a temple. Helping others care for their health is a way to honor God.'
            },
            {
              type: 'text',
              heading: 'Project: Health and Wellness Guide',
              body: '**Include these sections:**\n1. **Body Parts** (4-5 sentences): Important body vocabulary with pronunciation tips.\n2. **Common Problems** (4-5 sentences): Describe 3 health problems with symptoms.\n3. **Health Tips** (5-6 sentences): Use "should/shouldn\'t" for advice.\n4. **At the Doctor** (3-4 sentences): Key phrases for a doctor visit.\n5. **False Cognates** (3 items): blesse, sensible, sympathique/excite.\n6. **Bible Verse**: 1 Corinthians 6:19-20 with a short reflection.\n\n**Total: 250-350 words**'
            },
            {
              type: 'biblical-worldview',
              theme: 'Your Body Is God\'s Temple',
              scriptureRef: '1 Corinthians 6:19-20',
              reflection: 'Your body is a temple of the Holy Spirit. Taking care of your health and helping others do the same honors God.',
              applicationQuestion: 'How can your health guide help others honor God with their bodies?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What 3 health problems will you include?',
                'What false cognates should French speakers know about?'
              ]
            },
            {
              type: 'practice',
              activity: 'Plan Your Guide',
              prompt: 'Draft each section:\n1. List 5 body parts with pronunciation notes.\n2. Describe 3 health problems.\n3. Write 4 "should/shouldn\'t" tips.\n4. Write 3 false cognates with explanations.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Health Guide',
              prompt: 'Write your Health and Wellness Guide (250-350 words) with all 6 sections. Use correct English grammar and include helpful tips for French-speaking students.'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content', excellent: 'All 6 sections with clear detail', proficient: '4-5 sections included', developing: 'Missing sections or very little detail' },
                { name: 'Grammar', excellent: 'Correct use of should/shouldn\'t, symptoms, body vocabulary', proficient: 'Mostly correct with some errors', developing: 'Many errors' },
                { name: 'False Cognates', excellent: '3 false cognates clearly explained', proficient: '1-2 false cognates mentioned', developing: 'No false cognates' },
                { name: 'Bible Connection', excellent: 'Verse and reflection included', proficient: 'Verse included', developing: 'No verse' }
              ]
            }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'My Health and Wellness Guide',
        estimatedMinutes: 35,
        objectives: [
          'Create a simple health poster with body parts, symptoms, and advice.',
          'Use "should" for health tips.',
          'Include a Bible verse about health.'
        ],
        ipo: {
          input: [
            {
              type: 'wonder',
              prompt: 'Let\'s make a health poster! Show people how to describe their symptoms and give good health advice — all in English.',
              connection: 'God wants us to take care of our bodies. 1 Corinthians 6:19 says our body is a temple. Your health poster can help others!'
            },
            {
              type: 'text',
              heading: 'Project: My Health Poster',
              body: '**Make a simple health guide:**\n1. **Body parts** — label 5 body parts in English.\n2. **Symptoms** — write 3 "I have a ___" sentences.\n3. **Health tips** — write 3 "You should ___" sentences.\n4. **Bible verse** — 1 Corinthians 6:19.\n\n**Total: 80-120 words**'
            },
            {
              type: 'biblical-worldview',
              theme: 'Take Care of Your Body',
              scriptureRef: '1 Corinthians 6:19',
              reflection: 'Your body is a temple. Take care of it — eat well, rest, and exercise. This honors God.',
              applicationQuestion: 'What is one healthy thing you should do every day?'
            }
          ],
          processing: [
            {
              type: 'discussion',
              questions: [
                'What 5 body parts will you include?',
                'What 3 health tips will you give?'
              ]
            },
            {
              type: 'practice',
              activity: 'Draft Your Poster',
              prompt: 'Write:\n1. 5 body parts in English.\n2. 3 symptoms: "I have a _____"\n3. 3 health tips: "You should _____"\n4. Copy 1 Corinthians 6:19.'
            }
          ],
          output: [
            {
              type: 'practice',
              activity: 'My Health Poster',
              prompt: 'Create your health poster (80-120 words) with body parts, symptoms, health tips, and a Bible verse. Make it clear and helpful!'
            },
            {
              type: 'rubric',
              dimensions: [
                { name: 'Content', excellent: 'All 4 parts included', proficient: '3 parts included', developing: 'Fewer than 3 parts' },
                { name: 'English', excellent: 'Clear, correct sentences', proficient: 'Some errors but understandable', developing: 'Hard to understand' },
                { name: 'Bible Verse', excellent: 'Verse included and connected to health', proficient: 'Verse included', developing: 'No verse' }
              ]
            }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'wellness', definition: 'The state of being healthy in body and mind (French: bien-etre)', example: 'Wellness means taking care of your body, mind, and spirit.' },
      { term: 'brochure', definition: 'A small booklet or pamphlet with information (French: brochure)', example: 'I made a health brochure for my school.' },
      { term: 'hygiene', definition: 'Practices that keep you clean and healthy — washing hands, brushing teeth (French: hygiene)', example: 'Good hygiene helps prevent illness.' },
      { term: 'temple', definition: 'A place of worship; in the Bible, our body is called a temple of the Holy Spirit', example: '1 Corinthians 6:19 says your body is a temple of the Holy Spirit.' },
      { term: 'stewardship', definition: 'Taking care of something God has given you responsibility for', example: 'Taking care of your health is good stewardship of the body God gave you.' }
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
  console.log(`  Enrich English Foundations L1 Units 4-6`)
  console.log(`  Course ID: ${COURSE_ID}`)
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no DB writes)' : 'LIVE (writing to DB)'}`)
  console.log(`${'='.repeat(70)}\n`)

  let totalUpdated = 0
  let totalSkipped = 0

  const units: { unitNumber: number; name: string; lessons: EnrichedLesson[] }[] = [
    { unitNumber: 4, name: 'Getting Around', lessons: unit4Lessons },
    { unitNumber: 5, name: 'Actions and Activities', lessons: unit5Lessons },
    { unitNumber: 6, name: 'Health and Body', lessons: unit6Lessons },
  ]

  for (const unit of units) {
    console.log(`\n  ── Unit ${unit.unitNumber}: ${unit.name} ──\n`)

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

      // Replace pathways, vocabulary, and quiz while preserving everything else
      const updatedContent = {
        ...content,
        pathways: enriched.pathways,
        vocabulary: enriched.vocabulary,
        quiz: enriched.quiz,
      }

      // Report word counts
      for (const variant of enriched.pathways) {
        const wc = countWords(variant)
        console.log(`  [${variant.pathway}] W${enriched.weekNumber}: ~${wc} words`)
      }

      // Report quiz/vocab counts
      console.log(`  [ENRICHED] W${enriched.weekNumber}: ${enriched.quiz.length} quiz Qs, ${enriched.vocabulary.length} vocab items`)

      // Preserve resources if they exist
      const resourceCount = (content.resources || []).length
      if (resourceCount > 0) {
        console.log(`  [PRESERVED] W${enriched.weekNumber}: ${resourceCount} resources`)
      }

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
