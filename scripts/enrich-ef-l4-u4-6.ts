import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const COURSE_ID = "cmo78ofbp007lon5t3b44wmbv";

interface VocabWord {
  word: string;
  definition: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface PathwayContent {
  objectives: string[];
  input: { text: string; keyConcepts: string[] };
  processing: { activities: string[] };
  output: { tasks: string[] };
}

interface LessonContent {
  title: string;
  lessonType: "INSTRUCTION" | "PROJECT";
  duration: { ADVANCED: string; STANDARD: string; VOCATIONAL: string };
  pathways: {
    ADVANCED: PathwayContent;
    STANDARD: PathwayContent;
    VOCATIONAL: PathwayContent;
  };
  vocabulary: VocabWord[];
  quiz: QuizQuestion[];
  biblicalIntegration: string;
}

const lessons: Record<number, Record<number, LessonContent>> = {
  // ─────────────────────────────────────────────
  // UNIT 4: Test Speaking Mastery
  // ─────────────────────────────────────────────
  4: {
    1: {
      title: "TOEFL Speaking Tasks",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Master all TOEFL iBT speaking task types including independent and integrated formats",
            "Develop sophisticated response templates that showcase advanced vocabulary and grammar",
            "Apply strategic time management across the 15-30 second preparation and 45-60 second response windows",
            "Analyze scoring rubrics to understand what distinguishes a 26-30 score from lower bands"
          ],
          input: {
            text: "The TOEFL iBT speaking section (2026 format) lasts approximately 8 minutes and contains four tasks. Task 1 is an independent speaking task where you express and defend a personal opinion on a familiar topic. Tasks 2-4 are integrated tasks combining reading passages, listening excerpts, and spoken responses. For each task, you receive 15-30 seconds of preparation time and 45-60 seconds to deliver your response. Scoring evaluates delivery (pronunciation, pace, intonation), language use (grammar, vocabulary range), and topic development (coherence, completeness, elaboration). French speakers face particular challenges with English word stress patterns. Unlike French, which distributes stress relatively equally across syllables, English uses contrastive stress to convey meaning. Consider the difference between 'REcord' (noun) and 'reCORD' (verb). This stress-timing pattern is critical for TOEFL pronunciation scores. The independent task requires a clear position statement, two supporting reasons with examples, and a brief conclusion—all within 45 seconds. Integrated tasks demand efficient note-taking during the reading and listening phases, then synthesizing information coherently. High-scoring responses demonstrate not just accuracy but fluidity: natural hedging ('It seems to me that...'), discourse markers ('Furthermore,' 'On the other hand'), and sophisticated connectors ('Notwithstanding,' 'In light of this'). The 2026 format emphasizes academic discussion skills, so responses should sound like contributions to a university seminar rather than rehearsed monologues. Practice the 'hook-position-reason-example-restate' framework until it becomes automatic, then focus on making each response sound natural rather than formulaic. Record yourself and compare your stress patterns against native speaker models, paying special attention to content words versus function words.",
            keyConcepts: [
              "TOEFL iBT 2026 speaking format: 4 tasks in ~8 minutes",
              "Independent task: opinion with supporting reasons in 45 seconds",
              "Integrated tasks: synthesize reading + listening into spoken response",
              "Preparation windows: 15-30 seconds depending on task type",
              "English stress-timing vs French syllable-timing",
              "Scoring criteria: delivery, language use, topic development"
            ]
          },
          processing: {
            activities: [
              "Analyze three sample TOEFL speaking responses scored at 4, 3, and 2 and identify specific differences in delivery, language use, and development",
              "Practice the independent task using the hook-position-reason-example-restate framework on five different prompts with 15-second preparation",
              "Record integrated task responses and self-evaluate using the official ETS scoring rubric, marking stress-timing errors",
              "Create a personal bank of sophisticated transition phrases and hedging language for spontaneous use"
            ]
          },
          output: {
            tasks: [
              "Deliver four complete TOEFL speaking responses (one per task type) under timed conditions, then transcribe and annotate your stress patterns, comparing them against native speaker models"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Understand all four TOEFL speaking task types and their requirements",
            "Apply response templates effectively within the 45-60 second time limit",
            "Practice strategic preparation during the 15-30 second windows",
            "Identify and correct common French-speaker pronunciation patterns that affect TOEFL scores"
          ],
          input: {
            text: "The TOEFL iBT speaking section tests your ability to communicate effectively in English in academic settings. The 2026 format includes four tasks completed in about 8 minutes. Task 1 asks you to state and support a personal opinion (45 seconds to respond after 15 seconds of preparation). Tasks 2-4 are integrated: you read a passage, listen to a lecture or conversation, then speak about what you learned (60 seconds to respond after 30 seconds of preparation). Each response is scored on delivery, language use, and topic development. For French speakers, the biggest pronunciation challenge is English word stress. In French, every syllable gets roughly equal emphasis: 'u-ni-ver-si-TÉ.' In English, stress falls on specific syllables: 'u-ni-VER-si-ty.' This difference affects how natural you sound. Practice stressing content words (nouns, verbs, adjectives) more than function words (articles, prepositions). For the independent task, use this template: state your position, give reason one with an example, give reason two with an example, and briefly restate. For integrated tasks, take quick notes during reading and listening, then organize your response as: 'The reading discusses X, and the lecture explains Y. According to the professor...' Time management is crucial—practice with a timer until you can fill 45-60 seconds comfortably without rushing or running short.",
            keyConcepts: [
              "Four speaking tasks: 1 independent + 3 integrated",
              "Preparation time: 15-30 seconds; response time: 45-60 seconds",
              "Scoring: delivery, language use, topic development",
              "French stress pattern vs English stress-timing",
              "Response templates for consistent structure",
              "Note-taking strategy for integrated tasks"
            ]
          },
          processing: {
            activities: [
              "Practice the independent task template with three different prompts, timing each response at 45 seconds",
              "Listen to a short academic passage and practice summarizing key points within 60 seconds",
              "Record yourself saying ten academic words and check your stress placement against a dictionary"
            ]
          },
          output: {
            tasks: [
              "Complete two full TOEFL speaking tasks (one independent, one integrated) under timed conditions and self-evaluate using the scoring criteria"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Know what to expect on the TOEFL speaking section",
            "Use a simple template to organize speaking responses",
            "Practice speaking clearly within the time limits"
          ],
          input: {
            text: "The TOEFL speaking section has four tasks and takes about 8 minutes. In Task 1, you share your opinion on a topic. You get 15 seconds to prepare and 45 seconds to speak. In Tasks 2-4, you read something, listen to something, then talk about it. You get 30 seconds to prepare and 60 seconds to speak. You are scored on how clearly you speak, how well you use English, and how well you explain your ideas. A big tip for French speakers: English words have stress on certain syllables. In French, you say 'u-ni-ver-si-TÉ' with even stress. In English, it is 'u-ni-VER-si-ty'—the third syllable is louder. Practice this pattern with common academic words. For your opinion task, use this simple plan: 'I think X because of Y. For example, Z. Also, W. That is why I believe X.' For the listening tasks, write down key words while you listen, then use them in your answer: 'The professor said that...' Practice with a timer so you get comfortable speaking for 45-60 seconds.",
            keyConcepts: [
              "4 tasks, about 8 minutes total",
              "Task 1: share your opinion (15s prep, 45s speak)",
              "Tasks 2-4: read + listen + speak (30s prep, 60s speak)",
              "English word stress differs from French",
              "Use a simple template to organize your answer"
            ]
          },
          processing: {
            activities: [
              "Practice the opinion template three times with simple topics (favorite place, best teacher, important skill)",
              "Say ten common academic words aloud and practice putting stress on the correct syllable"
            ]
          },
          output: {
            tasks: [
              "Record one 45-second opinion response using the template and check that you stayed on topic and within the time limit"
            ]
          }
        }
      },
      vocabulary: [
        { word: "integrated task", definition: "A test question that combines reading, listening, and speaking skills together" },
        { word: "independent task", definition: "A test question where you give your own opinion without reading or listening first" },
        { word: "stress-timing", definition: "The rhythm pattern in English where stressed syllables come at regular intervals" },
        { word: "discourse marker", definition: "A word or phrase that organizes speech, such as 'however,' 'for example,' or 'in conclusion'" },
        { word: "hedging", definition: "Using cautious language like 'it seems' or 'perhaps' instead of making absolute statements" },
        { word: "coherence", definition: "The quality of ideas being logically connected and easy to follow in speech or writing" },
        { word: "elaboration", definition: "Adding details, examples, or explanations to develop an idea more fully" },
        { word: "intonation", definition: "The rise and fall of the voice when speaking, which conveys meaning and attitude" }
      ],
      quiz: [
        {
          question: "How many speaking tasks are in the TOEFL iBT 2026 format?",
          options: ["Two", "Three", "Four", "Six"],
          correctIndex: 2
        },
        {
          question: "What is the preparation time for the TOEFL independent speaking task?",
          options: ["5 seconds", "15 seconds", "30 seconds", "60 seconds"],
          correctIndex: 1
        },
        {
          question: "What is 'stress-timing' in English?",
          options: [
            "Speaking quickly when nervous",
            "A rhythm pattern where stressed syllables come at regular intervals",
            "Pausing between every word",
            "Speaking louder at the end of sentences"
          ],
          correctIndex: 1
        },
        {
          question: "How does French syllable stress typically differ from English?",
          options: [
            "French stresses the first syllable; English stresses the last",
            "French distributes stress relatively equally; English uses contrastive stress",
            "French has no stress; English stresses every word",
            "They are identical in stress patterns"
          ],
          correctIndex: 1
        },
        {
          question: "What are the three scoring criteria for TOEFL speaking?",
          options: [
            "Speed, accuracy, creativity",
            "Delivery, language use, topic development",
            "Grammar, vocabulary, spelling",
            "Fluency, accent, confidence"
          ],
          correctIndex: 1
        },
        {
          question: "What is the response time for TOEFL integrated speaking tasks?",
          options: ["30 seconds", "45 seconds", "60 seconds", "90 seconds"],
          correctIndex: 2
        },
        {
          question: "Which is an example of hedging language?",
          options: [
            "'I am absolutely certain that...'",
            "'It seems to me that...'",
            "'Everyone knows that...'",
            "'The fact is that...'"
          ],
          correctIndex: 1
        },
        {
          question: "What does 'coherence' mean in speaking?",
          options: [
            "Speaking very quickly",
            "Using difficult vocabulary",
            "Ideas being logically connected and easy to follow",
            "Speaking with a native accent"
          ],
          correctIndex: 2
        },
        {
          question: "In the independent task template, what comes after stating your position?",
          options: [
            "A conclusion",
            "A question to the examiner",
            "Supporting reasons with examples",
            "A personal story"
          ],
          correctIndex: 2
        },
        {
          question: "Approximately how long is the total TOEFL speaking section?",
          options: ["4 minutes", "8 minutes", "15 minutes", "30 minutes"],
          correctIndex: 1
        }
      ],
      biblicalIntegration: "Scripture calls us to speak truthfully and clearly: 'Let your yes be yes and your no be no' (Matthew 5:37). In test speaking, clarity and honesty in expressing your ideas reflects this biblical principle. We speak not to impress but to communicate truth effectively."
    },

    2: {
      title: "IELTS Speaking Interview",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Master all three parts of the IELTS speaking test with band 8-9 level strategies",
            "Develop sophisticated responses that demonstrate lexical resource and grammatical range",
            "Apply natural discourse management techniques including self-correction and topic extension",
            "Analyze the four scoring criteria at the highest band descriptors to target specific improvements"
          ],
          input: {
            text: "The IELTS speaking test is a face-to-face interview lasting 11-14 minutes, divided into three distinct parts. Part 1 (Introduction and Interview, 4-5 minutes) covers familiar topics: your home, work, studies, and interests. The examiner asks short questions, and you should give extended but natural answers—not one-word responses, but not rehearsed monologues either. Part 2 (Individual Long Turn, 3-4 minutes) presents a cue card with a topic and bullet points. You have one minute to prepare and then must speak for 1-2 minutes. Part 3 (Two-Way Discussion, 4-5 minutes) explores abstract ideas related to the Part 2 topic through deeper analytical questions. Scoring uses four equally weighted criteria: Fluency and Coherence (smooth delivery, logical sequencing, appropriate use of connectors), Lexical Resource (vocabulary range, precision, idiomatic language, collocation), Grammatical Range and Accuracy (complex sentence structures, tense accuracy, error frequency), and Pronunciation (individual sounds, word stress, sentence stress, intonation, connected speech). For band 8-9, examiners look for 'wide and flexible' language use with 'only occasional inaccuracies.' French speakers often struggle with certain pronunciation features that affect band scores. The English /h/ sound (absent in French) must be consistently produced—'happy' not 'appy,' 'hotel' with an audible /h/. The /θ/ and /ð/ sounds ('think,' 'this') are commonly replaced with /s/, /z/, or /t/, /d/. Diphthongs like /əʊ/ in 'go' may be simplified to a single vowel. At band 8-9, you should demonstrate natural self-correction ('Well, actually, what I mean is...'), topic development through personal anecdotes and abstract reflection, and the ability to speculate and hypothesize ('If that were the case, we might see...'). The key difference between band 7 and band 8+ is automaticity—your language should flow naturally without visible effort, even when discussing complex or unfamiliar topics. Record yourself regularly and listen for moments where you hesitate, simplify, or fall back on French patterns.",
            keyConcepts: [
              "Three-part structure: Introduction (4-5 min), Long Turn (3-4 min), Discussion (4-5 min)",
              "Four scoring criteria weighted equally: fluency/coherence, lexical resource, grammar, pronunciation",
              "Part 2 cue card: 1 minute preparation, 1-2 minutes speaking",
              "Band 8-9 requires automatic, flexible language with minimal errors",
              "French pronunciation targets: /h/, /θ/, /ð/, diphthongs, stress patterns",
              "Self-correction and speculation as high-band discourse strategies"
            ]
          },
          processing: {
            activities: [
              "Practice Part 1 by answering ten common questions with extended responses that include reasons and examples, avoiding one-word answers and over-rehearsed scripts",
              "Complete three Part 2 cue card tasks with one-minute preparation and two-minute delivery, focusing on covering all bullet points while maintaining natural flow",
              "Engage in Part 3 discussion practice by developing abstract arguments about education, technology, and society, using speculation and hypothesis",
              "Record a full mock interview and analyze your pronunciation of /h/, /θ/, /ð/, and diphthongs, marking each error"
            ]
          },
          output: {
            tasks: [
              "Complete a full 14-minute simulated IELTS speaking test covering all three parts, record it, and write a detailed self-assessment against each of the four band descriptors at band 8 level"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Understand the structure and expectations of all three IELTS speaking parts",
            "Develop effective strategies for the cue card task including one-minute preparation",
            "Apply the four scoring criteria to self-evaluate practice responses",
            "Address common French-speaker pronunciation issues that affect IELTS scores"
          ],
          input: {
            text: "The IELTS speaking test is an interview with an examiner lasting 11-14 minutes. It has three parts. Part 1 (4-5 minutes): The examiner asks you questions about familiar topics like your home, hobbies, or studies. Give answers that are 2-3 sentences long with reasons or examples. Part 2 (3-4 minutes): You receive a cue card with a topic and four bullet points. You have one minute to prepare (use it!) and must speak for 1-2 minutes. Part 3 (4-5 minutes): The examiner asks deeper questions related to the Part 2 topic. These require you to discuss ideas, give opinions, and explain your thinking. You are scored on four things, each worth 25%: Fluency and Coherence (Do you speak smoothly? Are your ideas connected?), Lexical Resource (Do you use varied vocabulary?), Grammatical Range and Accuracy (Do you use different sentence types correctly?), and Pronunciation (Can you be easily understood?). For French speakers, pay attention to these pronunciation points: always pronounce the /h/ sound ('house,' 'have,' 'happy'—in French, h is silent, but in English it must be heard). Practice the /th/ sounds: 'think' uses /θ/ (tongue between teeth), and 'this' uses /ð/. Also work on English diphthongs—'go' has a gliding vowel /əʊ/, not a flat 'o' as in French. For Part 2 preparation, write down key words (not full sentences) during your one minute. Organize your talk: introduce the topic, cover each bullet point, and add a personal reflection. Use phrases like 'I'd like to talk about...' to begin and 'Looking back, I think...' to conclude.",
            keyConcepts: [
              "Part 1: familiar topics, 2-3 sentence answers (4-5 min)",
              "Part 2: cue card with 1-minute prep and 1-2 minute talk",
              "Part 3: deeper discussion questions (4-5 min)",
              "Four scoring criteria at 25% each",
              "French pronunciation focus: /h/, /θ/, /ð/, diphthongs",
              "Preparation strategy: key words, not full sentences"
            ]
          },
          processing: {
            activities: [
              "Answer six Part 1 questions about familiar topics, giving 2-3 sentence responses with reasons or examples",
              "Complete two Part 2 cue card tasks: prepare for one minute with key words, then speak for 1-2 minutes covering all bullet points",
              "Practice pronouncing ten words with /h/, /θ/, and /ð/ sounds that are challenging for French speakers"
            ]
          },
          output: {
            tasks: [
              "Record a practice Part 2 response using one-minute preparation, then listen back and identify two pronunciation improvements and two content improvements"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Know the three parts of the IELTS speaking test and what each requires",
            "Prepare simple but complete answers for each part",
            "Practice clear pronunciation of sounds that are difficult for French speakers"
          ],
          input: {
            text: "The IELTS speaking test is a conversation with an examiner. It lasts 11-14 minutes and has three parts. Part 1 (4-5 minutes): The examiner asks about you—your name, your home, your hobbies. Answer in 2-3 sentences. For example: 'I live in a small city. I like it because it is quiet and close to nature.' Part 2 (3-4 minutes): You get a card with a topic. You have one minute to think, then you talk for 1-2 minutes. Use the bullet points on the card to organize your talk. Part 3 (4-5 minutes): The examiner asks bigger questions about the same topic. Give your opinion and explain why. You are scored on four things: how smoothly you speak, your vocabulary, your grammar, and your pronunciation. For pronunciation, French speakers should practice three things: (1) Say the /h/ sound—'happy' not 'appy'; (2) Put your tongue between your teeth for 'th' sounds—'think,' 'this'; (3) Practice the gliding vowel in words like 'go' and 'no.' A simple trick for Part 2: during your one minute, write one key word for each bullet point. Then talk about each one for about 20-30 seconds.",
            keyConcepts: [
              "Part 1: answer questions about yourself (4-5 min)",
              "Part 2: talk about a topic for 1-2 minutes after 1 minute of preparation",
              "Part 3: discuss bigger ideas and opinions (4-5 min)",
              "Scored on fluency, vocabulary, grammar, pronunciation",
              "Practice /h/, /th/, and vowel sounds"
            ]
          },
          processing: {
            activities: [
              "Answer four Part 1 questions about your daily life in 2-3 sentences each",
              "Practice one Part 2 topic: write key words in one minute, then speak for one minute"
            ]
          },
          output: {
            tasks: [
              "Record a one-minute Part 2 response about a favorite place, making sure to pronounce /h/ sounds clearly"
            ]
          }
        }
      },
      vocabulary: [
        { word: "cue card", definition: "A card given during IELTS Part 2 with a topic and bullet points to guide your talk" },
        { word: "fluency", definition: "The ability to speak smoothly and continuously without too many pauses or hesitations" },
        { word: "lexical resource", definition: "The range and accuracy of vocabulary you use, including collocations and idiomatic expressions" },
        { word: "band descriptor", definition: "A detailed description of what language ability is expected at each IELTS score level" },
        { word: "diphthong", definition: "A vowel sound that glides from one position to another, like /əʊ/ in 'go' or /aɪ/ in 'my'" },
        { word: "collocation", definition: "Words that naturally go together in English, like 'make a decision' rather than 'do a decision'" },
        { word: "self-correction", definition: "Naturally fixing your own mistakes while speaking, which shows language awareness" },
        { word: "connected speech", definition: "The way sounds link, blend, or change when words are spoken together naturally" }
      ],
      quiz: [
        {
          question: "How long does the IELTS speaking test last?",
          options: ["5-7 minutes", "8-10 minutes", "11-14 minutes", "20-25 minutes"],
          correctIndex: 2
        },
        {
          question: "How much preparation time do you get for the IELTS Part 2 cue card?",
          options: ["30 seconds", "1 minute", "2 minutes", "5 minutes"],
          correctIndex: 1
        },
        {
          question: "What are the four IELTS speaking scoring criteria?",
          options: [
            "Speed, accuracy, creativity, confidence",
            "Fluency/coherence, lexical resource, grammar, pronunciation",
            "Vocabulary, reading, listening, writing",
            "Content, organization, style, mechanics"
          ],
          correctIndex: 1
        },
        {
          question: "Which sound do French speakers often drop in English?",
          options: ["/r/", "/h/", "/s/", "/l/"],
          correctIndex: 1
        },
        {
          question: "What is a diphthong?",
          options: [
            "A double consonant",
            "A silent letter",
            "A vowel sound that glides from one position to another",
            "A type of stress pattern"
          ],
          correctIndex: 2
        },
        {
          question: "In IELTS Part 1, how long should your answers typically be?",
          options: [
            "One word",
            "2-3 sentences with reasons or examples",
            "A full 2-minute speech",
            "As short as possible"
          ],
          correctIndex: 1
        },
        {
          question: "What should you write during your Part 2 preparation time?",
          options: [
            "Full sentences to read aloud",
            "Key words to guide your talk",
            "Nothing—just think silently",
            "A complete essay outline"
          ],
          correctIndex: 1
        },
        {
          question: "How long must you speak during IELTS Part 2?",
          options: ["30 seconds", "1-2 minutes", "5 minutes", "10 minutes"],
          correctIndex: 1
        },
        {
          question: "What does 'self-correction' demonstrate to the examiner?",
          options: [
            "That you make too many mistakes",
            "That you are nervous",
            "Language awareness and monitoring ability",
            "That you prepared a script"
          ],
          correctIndex: 2
        },
        {
          question: "What type of questions does IELTS Part 3 involve?",
          options: [
            "Personal questions about your name and home",
            "Deeper, abstract discussion questions related to the Part 2 topic",
            "Reading comprehension questions",
            "Grammar correction exercises"
          ],
          correctIndex: 1
        }
      ],
      biblicalIntegration: "James 1:19 teaches us to be 'quick to listen, slow to speak.' In the IELTS interview, active listening to the examiner's questions and thoughtful, measured responses reflect this wisdom. Speaking well is not about speed but about clarity and intentionality."
    },

    3: {
      title: "DET Speaking and Pronunciation",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Master all DET speaking task types: Speak About Photo, Read Then Speak, and Interactive Speaking",
            "Systematically eliminate French accent features that reduce DET pronunciation subscores",
            "Apply advanced stress-timing, schwa reduction, and diphthong production techniques",
            "Develop strategies for the adaptive difficulty system that characterizes the DET"
          ],
          input: {
            text: "The Duolingo English Test (DET) includes several speaking task types that evaluate your production skills. In 'Speak About Photo,' you view an image and describe it in detail for 90 seconds—covering what you see, what might be happening, and what it suggests. In 'Read Then Speak,' you read a prompt and then respond orally, demonstrating comprehension and spontaneous speech. 'Interactive Speaking' simulates a conversation where you respond to questions or statements in real time. The DET is computer-adaptive: your performance on earlier items determines the difficulty of later ones, so strong early responses unlock higher-scoring opportunities. For French speakers seeking high scores, systematic pronunciation work is essential. Five key areas require focused attention. First, the /θ/ (voiceless 'th' as in 'think') and /ð/ (voiced 'th' as in 'this') sounds: French has no equivalent, so speakers substitute /s/, /z/, /t/, or /d/. Place your tongue lightly between your teeth and push air through. Second, the /h/ sound: French never pronounces initial h, but English requires audible aspiration in words like 'happen,' 'hypothesis,' and 'however.' Third, English stress-timing versus French syllable-timing: English compresses unstressed syllables and elongates stressed ones. The word 'comfortable' is spoken as 'KUMF-ter-bul' (3 syllables in practice), not 'com-for-TAB-le' (4 equal syllables). Fourth, the schwa /ə/: this is the most common vowel in English, appearing in unstressed syllables ('about' = /ə-BAUT/, 'problem' = /PROB-ləm/). French speakers tend to give full vowel quality to every syllable, which sounds unnatural. Fifth, English diphthongs: sounds like /eɪ/ ('say'), /aɪ/ ('my'), /əʊ/ ('go'), and /aʊ/ ('now') involve gliding movement. French vowels are generally 'pure' (monophthongs), so speakers must practice the glide. Additionally, work on connected speech features: linking ('an apple' sounds like 'a-napple'), elision (dropping sounds: 'next day' becomes 'neks day'), and assimilation (sounds changing: 'good boy' sounds like 'goob boy'). These features make your speech sound fluent and natural rather than word-by-word, which is critical for high DET scores.",
            keyConcepts: [
              "DET speaking tasks: Speak About Photo, Read Then Speak, Interactive Speaking",
              "Computer-adaptive format: strong early answers unlock harder (higher-scoring) items",
              "Five French accent areas: /θ/ and /ð/, /h/, stress-timing, schwa /ə/, diphthongs",
              "Schwa is the most common English vowel, appearing in all unstressed syllables",
              "Connected speech: linking, elision, and assimilation for natural fluency",
              "Stress-timing compresses unstressed syllables and elongates stressed ones"
            ]
          },
          processing: {
            activities: [
              "Practice Speak About Photo with five different images, delivering 90-second descriptions that include observation, inference, and speculation",
              "Record yourself reading a 200-word academic paragraph and analyze your stress patterns, marking every schwa and checking diphthong production",
              "Complete an Interactive Speaking simulation by recording responses to five academic discussion questions, focusing on connected speech features",
              "Create a pronunciation drill targeting your three weakest areas among /θ/, /ð/, /h/, stress-timing, schwa, and diphthongs with 20 practice words each"
            ]
          },
          output: {
            tasks: [
              "Record three complete DET speaking responses (one of each type) and produce a detailed pronunciation analysis identifying every instance of French L1 interference, with a specific practice plan for each error pattern"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Understand the three DET speaking task types and what each requires",
            "Identify and practice the key pronunciation differences between French and English",
            "Apply practical techniques for /th/ sounds, /h/ sounds, stress patterns, and diphthongs",
            "Develop confidence in describing images and responding to prompts under time pressure"
          ],
          input: {
            text: "The Duolingo English Test (DET) tests your speaking ability through several task types. In 'Speak About Photo,' you see a picture and describe it for 90 seconds—say what you see, what is happening, and what it might mean. In 'Read Then Speak,' you read a question and give an oral answer. In 'Interactive Speaking,' you respond in a conversation-like format. The test is adaptive, meaning it gets harder or easier based on how you perform. To score well, work on these French accent challenges: (1) The 'th' sounds: for 'think,' place your tongue between your teeth and blow air (voiceless /θ/). For 'this,' do the same but add voice (voiced /ð/). French speakers often say 'sink' instead of 'think' or 'zis' instead of 'this.' (2) The /h/ sound: always pronounce h at the beginning of words like 'help,' 'history,' and 'however.' In French, h is always silent, but in English you must breathe out audibly. (3) Word stress: English emphasizes certain syllables. Say 'com-PU-ter' not 'com-pu-TER.' Unstressed syllables become very short and often use the schwa sound /ə/ (like the 'a' in 'about'). (4) Diphthongs: English vowels often glide. In 'go,' your mouth moves from one position to another (/əʊ/). In French, 'eau' is a pure vowel, but English 'o' is not. Practice by exaggerating the glide at first, then making it natural. For the photo description task, use this structure: start with the overall scene, then describe specific details, then speculate about context or meaning.",
            keyConcepts: [
              "Three DET speaking tasks: Photo description, Read Then Speak, Interactive Speaking",
              "Test is adaptive—difficulty changes based on your performance",
              "French accent focus: /th/ sounds, /h/ sound, word stress, diphthongs",
              "Schwa /ə/ appears in unstressed syllables",
              "Photo description structure: overall scene → details → speculation"
            ]
          },
          processing: {
            activities: [
              "Describe three different photos using the overall-details-speculation structure, timing each at 90 seconds",
              "Practice ten pairs of words that differ by /th/ vs. /s/ or /t/ (think/sink, three/tree, bath/bass)",
              "Read a short paragraph aloud and identify which syllables are stressed and which use the schwa sound"
            ]
          },
          output: {
            tasks: [
              "Record one Speak About Photo response and one Read Then Speak response, then listen back and identify three pronunciation improvements to make"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Know the main DET speaking task types",
            "Practice describing pictures clearly in English",
            "Work on the most important pronunciation differences between French and English"
          ],
          input: {
            text: "The Duolingo English Test (DET) has speaking tasks where you talk into a microphone. In one task, you see a photo and describe it for 90 seconds. In another, you read a question and answer it out loud. In a third, you have a short conversation. To sound better in English, practice these four things: (1) Say the 'th' sound: put your tongue between your teeth for words like 'think' and 'the.' Do not say 'tink' or 'ze.' (2) Say the 'h' sound: breathe out at the start of words like 'happy,' 'have,' and 'how.' In French, h is silent, but in English you must hear it. (3) Stress the right syllables: say 'com-PU-ter' not 'com-pu-ter' with equal stress. (4) Practice vowel glides: in 'go,' your mouth moves during the vowel. It is not a flat 'o' like in French. For the photo task, use this simple plan: 'In this photo, I can see... It looks like... I think...'",
            keyConcepts: [
              "DET has photo description, read-and-speak, and conversation tasks",
              "Practice /th/ sounds, /h/ sounds, word stress, and vowel glides",
              "Photo description: what you see → what it looks like → what you think"
            ]
          },
          processing: {
            activities: [
              "Describe two photos using the simple plan: 'I can see... It looks like... I think...'",
              "Practice saying 'th' words (think, three, this, that, the) with your tongue between your teeth"
            ]
          },
          output: {
            tasks: [
              "Record a 60-second photo description and check that you pronounced 'th' and 'h' sounds correctly"
            ]
          }
        }
      },
      vocabulary: [
        { word: "schwa", definition: "The most common English vowel sound /ə/, heard in unstressed syllables like the 'a' in 'about'" },
        { word: "diphthong", definition: "A vowel sound where the tongue glides from one position to another, as in 'go' /əʊ/ or 'my' /aɪ/" },
        { word: "elision", definition: "Dropping a sound in connected speech, like saying 'neks day' instead of 'next day'" },
        { word: "assimilation", definition: "When a sound changes to become more like a neighboring sound, as in 'good boy' sounding like 'goob boy'" },
        { word: "adaptive test", definition: "A test that adjusts its difficulty based on how well you are performing" },
        { word: "aspiration", definition: "A puff of air released when pronouncing certain consonants, especially /h/ at the start of English words" },
        { word: "monophthong", definition: "A pure vowel sound where the tongue stays in one position, common in French but less so in English" },
        { word: "linking", definition: "Connecting the end of one word to the beginning of the next in natural speech, like 'an apple' sounding like 'a-napple'" }
      ],
      quiz: [
        {
          question: "What happens in the DET 'Speak About Photo' task?",
          options: [
            "You write a description of a photo",
            "You describe a photo aloud for 90 seconds",
            "You choose the correct photo from four options",
            "You listen to a description and identify the photo"
          ],
          correctIndex: 1
        },
        {
          question: "What makes the DET 'adaptive'?",
          options: [
            "You can choose your own topics",
            "The test adjusts difficulty based on your performance",
            "You can take it multiple times in one day",
            "The time limit changes for each question"
          ],
          correctIndex: 1
        },
        {
          question: "What is the schwa sound?",
          options: [
            "A consonant blend like 'str'",
            "The most common English vowel /ə/, found in unstressed syllables",
            "A type of diphthong",
            "The 'th' sound in English"
          ],
          correctIndex: 1
        },
        {
          question: "Why do French speakers often drop the /h/ sound in English?",
          options: [
            "Because English /h/ is very quiet",
            "Because /h/ is always silent in French",
            "Because they speak too quickly",
            "Because /h/ and /f/ sound the same"
          ],
          correctIndex: 1
        },
        {
          question: "What is 'linking' in connected speech?",
          options: [
            "Speaking very slowly between words",
            "Connecting the end of one word to the beginning of the next",
            "Repeating key words for emphasis",
            "Pausing between every sentence"
          ],
          correctIndex: 1
        },
        {
          question: "How does French vowel production differ from English?",
          options: [
            "French vowels are louder",
            "French vowels are generally pure (monophthongs); English has many diphthongs",
            "French has more vowel sounds than English",
            "They are identical"
          ],
          correctIndex: 1
        },
        {
          question: "What is 'elision'?",
          options: [
            "Adding extra sounds between words",
            "Speaking with a rising intonation",
            "Dropping a sound in connected speech",
            "Stressing every syllable equally"
          ],
          correctIndex: 2
        },
        {
          question: "Which word demonstrates a diphthong?",
          options: [
            "'See' (pure vowel /iː/)",
            "'Go' (gliding vowel /əʊ/)",
            "'Bed' (short vowel /e/)",
            "'Cup' (short vowel /ʌ/)"
          ],
          correctIndex: 1
        },
        {
          question: "How should 'comfortable' be pronounced in natural English?",
          options: [
            "'com-for-TAB-le' with 4 equal syllables",
            "'KUMF-ter-bul' with 3 syllables, stress on the first",
            "'com-FORT-able' with stress on the second syllable",
            "'com-for-ta-BLE' with stress on the last syllable"
          ],
          correctIndex: 1
        },
        {
          question: "What structure should you use for the DET photo description task?",
          options: [
            "Thesis, body paragraph, conclusion",
            "Overall scene, specific details, speculation about context",
            "Introduction, three examples, summary",
            "Question, answer, reflection"
          ],
          correctIndex: 1
        }
      ],
      biblicalIntegration: "Psalm 19:14 says, 'Let the words of my mouth and the meditation of my heart be acceptable in your sight, O Lord.' Refining our pronunciation and speaking skills is an act of stewardship over the gift of language God has given us, ensuring our words are clear and edifying."
    },

    4: {
      title: "Speaking Test Simulation",
      lessonType: "PROJECT",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Complete full simulated speaking tests for TOEFL, IELTS, and DET under realistic conditions",
            "Record and transcribe all responses for detailed self-analysis",
            "Evaluate performance against official scoring rubrics for each test",
            "Create a targeted improvement plan based on identified weaknesses across all three test formats"
          ],
          input: {
            text: "This project brings together everything you have learned about TOEFL, IELTS, and DET speaking assessments. You will complete full simulated speaking tests for all three exams under realistic timing conditions, record your responses, and conduct rigorous self-evaluation. For the TOEFL simulation, complete all four tasks with proper preparation and response times. For IELTS, conduct a full three-part mock interview (you may use recorded examiner questions or have a partner ask them). For the DET, complete Speak About Photo, Read Then Speak, and Interactive Speaking tasks. After recording all responses, transcribe at least two responses from each test and annotate them for: pronunciation accuracy (especially /θ/, /ð/, /h/, schwa, diphthongs, and stress-timing), grammatical range and accuracy, lexical resource and vocabulary precision, coherence and discourse management, and fluency (pauses, fillers, self-corrections). Compare your performance across the three tests to identify whether certain task types or conditions cause you more difficulty. For example, you may find that your TOEFL integrated tasks suffer because you struggle to take notes quickly, or that your IELTS Part 3 responses lack depth because you find abstract discussion challenging. Use official scoring rubrics from ETS, British Council, and Duolingo to assign yourself estimated scores, then create a specific four-week improvement plan targeting your three greatest weaknesses.",
            keyConcepts: [
              "Full simulated tests for TOEFL (4 tasks), IELTS (3 parts), and DET (3 task types)",
              "Record all responses and transcribe at least two per test",
              "Annotate transcriptions for pronunciation, grammar, vocabulary, coherence, fluency",
              "Use official scoring rubrics to estimate scores",
              "Compare performance across test formats to identify patterns",
              "Create a targeted four-week improvement plan"
            ]
          },
          processing: {
            activities: [
              "Set up a quiet recording environment and complete each simulated test with strict timing—no pausing or restarting",
              "Transcribe your responses and use color-coding to mark pronunciation errors (red), grammar errors (blue), vocabulary limitations (green), and fluency issues (yellow)",
              "Apply the official TOEFL, IELTS, and DET scoring criteria to assign estimated scores for each response",
              "Identify your three greatest cross-test weaknesses and design specific daily practice activities for each"
            ]
          },
          output: {
            tasks: [
              "Submit your full set of recorded speaking test simulations with annotated transcriptions, self-assigned scores with justification for each score, and a detailed four-week improvement plan with daily activities targeting your identified weaknesses"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Complete simulated speaking tasks for at least two test formats under timed conditions",
            "Record responses and identify areas for improvement",
            "Self-evaluate using simplified scoring criteria",
            "Create a practice plan to improve identified weaknesses"
          ],
          input: {
            text: "In this project, you will simulate real speaking test conditions to practice what you have learned. Choose at least two test formats (TOEFL, IELTS, or DET) and complete a full set of speaking tasks for each. Use realistic timing: set a timer for preparation and response periods and do not pause or restart. Record all of your responses using your phone or computer. After completing the simulations, listen to your recordings and evaluate yourself on: clarity (Can you be easily understood?), completeness (Did you cover all required points?), fluency (Did you speak smoothly without too many pauses?), pronunciation (Did you correctly produce /h/, /th/, schwa, and diphthongs?), and organization (Were your ideas logically structured?). Write down two strengths and three areas for improvement based on your self-evaluation, and create a simple one-week practice plan with specific activities for each area.",
            keyConcepts: [
              "Complete speaking tasks for at least two test formats",
              "Record all responses under timed conditions",
              "Self-evaluate for clarity, completeness, fluency, pronunciation, organization",
              "Identify two strengths and three areas for improvement",
              "Create a one-week practice plan"
            ]
          },
          processing: {
            activities: [
              "Complete all speaking tasks for your chosen tests with strict timing and recording",
              "Listen to each recording and rate yourself on clarity, fluency, and pronunciation",
              "Write down specific moments where you paused, mispronounced, or lost your train of thought"
            ]
          },
          output: {
            tasks: [
              "Submit your recorded speaking test simulations along with a self-evaluation identifying two strengths, three weaknesses, and a one-week practice plan"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Complete at least one full speaking test simulation under timed conditions",
            "Record and listen to your own speaking to identify strengths and weaknesses",
            "Set specific goals for speaking improvement"
          ],
          input: {
            text: "In this project, you will practice taking a real speaking test. Choose one test format (TOEFL, IELTS, or DET) and complete its speaking tasks with a timer. Record yourself so you can listen back. After you finish, listen to your recording and ask yourself: Did I speak for the full time? Did I answer the question? Did I pronounce /h/ and /th/ sounds? Did I organize my ideas clearly? Write down one thing you did well and two things you want to improve. Then plan three specific practice activities for the next week.",
            keyConcepts: [
              "Choose one test format and complete its speaking tasks",
              "Record yourself and listen back",
              "Identify one strength and two areas to improve",
              "Plan three practice activities for the next week"
            ]
          },
          processing: {
            activities: [
              "Complete the speaking tasks for your chosen test with a timer running",
              "Listen to your recording and note one strength and two weaknesses"
            ]
          },
          output: {
            tasks: [
              "Submit your recorded speaking test with a short note explaining one thing you did well, two things to improve, and three practice activities you will do next week"
            ]
          }
        }
      },
      vocabulary: [
        { word: "simulation", definition: "A practice activity that closely imitates real test conditions" },
        { word: "self-evaluation", definition: "The process of assessing your own performance against specific criteria" },
        { word: "transcription", definition: "A written record of spoken words, used for detailed analysis" },
        { word: "rubric", definition: "A set of scoring criteria that defines what different performance levels look like" },
        { word: "annotation", definition: "Notes or marks added to a text to highlight specific features or errors" }
      ],
      quiz: [],
      biblicalIntegration: "Proverbs 27:17 says, 'Iron sharpens iron, and one man sharpens another.' Self-evaluation and practice are forms of self-sharpening. Just as we examine ourselves spiritually (2 Corinthians 13:5), we examine our speaking to grow and improve in the abilities God has given us."
    }
  },

  // ─────────────────────────────────────────────
  // UNIT 5: Test Writing Mastery
  // ─────────────────────────────────────────────
  5: {
    1: {
      title: "TOEFL Writing Tasks",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Master both TOEFL writing tasks: the integrated task and the academic discussion task",
            "Develop efficient planning, drafting, and revising strategies under strict time constraints (~23 minutes total)",
            "Apply advanced argumentation techniques including concession-rebuttal and evidence synthesis",
            "Understand why the French thèse-antithèse-synthèse structure must be adapted for TOEFL"
          ],
          input: {
            text: "The TOEFL iBT writing section consists of two tasks completed in approximately 23 minutes. The Integrated Writing Task (20 minutes) requires you to read a passage (~250 words, 3 minutes), listen to a lecture that challenges or supports the reading, and then write a 150-280 word response synthesizing both sources. The Academic Discussion Task (~10 minutes) simulates an online classroom discussion: you read a professor's question and two student responses, then write a contribution of at least 100 words that adds a new perspective. For the integrated task, the key skill is accurate source attribution and synthesis. Use phrases like 'The reading states that X; however, the lecturer argues that Y because Z.' Never add your own opinion—this task tests your ability to report and connect ideas from two sources. For the academic discussion, you must contribute something new while engaging with what the other students said. Begin by briefly acknowledging an existing point, then introduce your own position with evidence or examples. French speakers face a specific structural challenge: the French essay tradition of thèse-antithèse-synthèse (thesis-antithesis-synthesis) does not translate well to TOEFL writing. The TOEFL rewards a clear position defended throughout the response, not a balanced presentation of both sides followed by reconciliation. While the French approach shows intellectual sophistication, TOEFL graders expect: a clear thesis in the introduction, body paragraphs that consistently support that thesis, counterargument acknowledgment within a paragraph (not as a separate section), and a conclusion that reinforces the thesis. Time management is critical. For the integrated task, spend 1-2 minutes planning your structure, 15-16 minutes writing, and 2-3 minutes revising. For the academic discussion, spend 1-2 minutes reading and planning, 6-7 minutes writing, and 1-2 minutes revising. During revision, check for: subject-verb agreement, article usage (a persistent challenge for French speakers since French articles work differently), verb tense consistency, and clear source attribution in the integrated task. Advanced writers should aim for varied sentence structures including complex sentences with adverbial clauses, reduced relative clauses, and conditional structures, while maintaining clarity throughout.",
            keyConcepts: [
              "Integrated task: read + listen + write 150-280 words in 20 minutes",
              "Academic discussion: read prompt + 2 responses, contribute 100+ words in ~10 minutes",
              "No personal opinion in integrated task—synthesize sources only",
              "French thèse-antithèse-synthèse does not work for TOEFL; maintain a consistent position",
              "Time management: plan (1-2 min) → write (15-16 or 6-7 min) → revise (2-3 min)",
              "Revision focus: subject-verb agreement, articles, tense consistency, source attribution"
            ]
          },
          processing: {
            activities: [
              "Analyze three sample integrated writing responses scored at 5, 3, and 1, identifying specific differences in source synthesis, organization, and language accuracy",
              "Practice the academic discussion task by responding to two different professor prompts, adding unique perspectives while engaging with sample student responses",
              "Write an integrated task response in 20 minutes and a discussion response in 10 minutes under strict timed conditions",
              "Compare a French thèse-antithèse-synthèse essay structure with a TOEFL-style argumentative structure, noting where the French approach would lose points"
            ]
          },
          output: {
            tasks: [
              "Complete both TOEFL writing tasks under realistic time constraints, then revise each response with specific attention to source attribution, article usage, thesis consistency, and sentence variety, annotating each revision you make with an explanation"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Understand what each TOEFL writing task requires and how they are scored",
            "Apply a clear planning-writing-revising process within the time limits",
            "Write effective source synthesis for the integrated task and original contributions for the academic discussion",
            "Recognize and avoid the French essay structure that does not match TOEFL expectations"
          ],
          input: {
            text: "The TOEFL writing section has two tasks. The Integrated Writing Task (20 minutes) works like this: you read a short passage (about 250 words), listen to a lecture related to the passage, and write a response (150-280 words) explaining how the lecture relates to the reading. Important: do not give your own opinion. Just explain what the reading says and what the lecture says, and how they connect. Use phrases like: 'According to the reading...,' 'The lecturer, however, points out that...,' 'This contradicts the reading's claim that...' The Academic Discussion Task (about 10 minutes) gives you a professor's question and two student responses. You write a 100+ word response that adds something new to the discussion. You should briefly connect to what others said, then share your own idea with an example. For French speakers: be careful not to write like a French essay. In France, you learn to present both sides equally (thèse-antithèse-synthèse). On the TOEFL, pick a clear position and defend it throughout. You can mention the other side briefly, but your main message should be consistent. Manage your time: for the integrated task, plan for 2 minutes, write for 15 minutes, revise for 3 minutes. For the discussion, plan for 1-2 minutes, write for 6-7 minutes, revise for 1-2 minutes. When revising, check your articles (a/an/the—French articles work differently), subject-verb agreement, and verb tenses.",
            keyConcepts: [
              "Integrated task: synthesize reading and lecture in 150-280 words (20 min)",
              "Academic discussion: contribute a new perspective in 100+ words (~10 min)",
              "No personal opinion in integrated task",
              "Avoid French thèse-antithèse-synthèse structure—defend one clear position",
              "Time: plan → write → revise",
              "Check articles, subject-verb agreement, and tenses in revision"
            ]
          },
          processing: {
            activities: [
              "Write an integrated task response using source attribution phrases to connect the reading and lecture without adding personal opinion",
              "Complete an academic discussion response that acknowledges other students' points and adds a new perspective with an example",
              "Identify five sentences where a French-style balanced structure should be replaced with a clear position statement"
            ]
          },
          output: {
            tasks: [
              "Complete one integrated writing response (20 minutes) and one academic discussion response (10 minutes) under timed conditions, then check for article errors and thesis consistency"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Know what the two TOEFL writing tasks ask you to do",
            "Use a simple structure to organize each response",
            "Practice writing within the time limits"
          ],
          input: {
            text: "The TOEFL writing section has two tasks. Task 1 (20 minutes): You read a passage, listen to a lecture, and write about how they are connected. Do not give your opinion—just explain what each source says. Use phrases like 'The reading says that...' and 'The lecture says that...' Write 150-280 words. Task 2 (about 10 minutes): You read a professor's question and what two students said. Then you write your own answer (100+ words) that adds a new idea. You can agree or disagree with the students, but say why. A tip for French speakers: on the TOEFL, choose one clear answer and support it. Do not try to show both sides equally. Plan your writing before you start: 1-2 minutes to think, then write, then check your work at the end.",
            keyConcepts: [
              "Task 1: read + listen + write about both sources (20 min, 150-280 words)",
              "Task 2: add a new idea to a class discussion (10 min, 100+ words)",
              "No personal opinion in Task 1",
              "Choose one clear position in Task 2",
              "Plan before writing, check at the end"
            ]
          },
          processing: {
            activities: [
              "Practice writing three sentences that compare a reading and a lecture using 'The reading says... The lecture says...'",
              "Write a short response (100 words) to a discussion prompt with one clear idea and one example"
            ]
          },
          output: {
            tasks: [
              "Write one discussion response (100+ words) in 10 minutes with a clear position and one supporting example"
            ]
          }
        }
      },
      vocabulary: [
        { word: "integrated task", definition: "A writing task that combines information from a reading passage and a listening passage" },
        { word: "source attribution", definition: "Clearly indicating where information comes from, using phrases like 'According to the reading...'" },
        { word: "synthesis", definition: "Combining information from multiple sources into a unified, coherent response" },
        { word: "concession-rebuttal", definition: "Acknowledging an opposing point before arguing against it: 'While some argue X, the evidence shows Y'" },
        { word: "thesis statement", definition: "A clear sentence stating your main argument or position in an essay" },
        { word: "academic discussion", definition: "A structured conversation about an academic topic where participants build on each other's ideas" },
        { word: "counterargument", definition: "An argument that opposes your main position, which you address and refute in your writing" },
        { word: "drafting", definition: "The process of writing a first version of a text before revising and improving it" }
      ],
      quiz: [
        {
          question: "How many writing tasks are in the TOEFL iBT writing section?",
          options: ["One", "Two", "Three", "Four"],
          correctIndex: 1
        },
        {
          question: "What should you NOT do in the TOEFL integrated writing task?",
          options: [
            "Summarize the reading",
            "Reference the lecture",
            "Add your personal opinion",
            "Compare the two sources"
          ],
          correctIndex: 2
        },
        {
          question: "Why is the French thèse-antithèse-synthèse structure problematic for TOEFL?",
          options: [
            "It is too short",
            "TOEFL rewards a clear, consistent position rather than balanced presentation of both sides",
            "It uses too many paragraphs",
            "French grammar is marked incorrect"
          ],
          correctIndex: 1
        },
        {
          question: "What is 'source attribution' in writing?",
          options: [
            "Copying directly from a source",
            "Clearly indicating where information comes from",
            "Adding your own examples",
            "Paraphrasing without citation"
          ],
          correctIndex: 1
        },
        {
          question: "How long is the TOEFL integrated writing task?",
          options: ["10 minutes", "15 minutes", "20 minutes", "30 minutes"],
          correctIndex: 2
        },
        {
          question: "What is the minimum word count for the TOEFL academic discussion response?",
          options: ["50 words", "75 words", "100 words", "200 words"],
          correctIndex: 2
        },
        {
          question: "What should you check during the revision phase?",
          options: [
            "Only spelling",
            "Articles, subject-verb agreement, tense consistency, and source attribution",
            "Only word count",
            "Only punctuation"
          ],
          correctIndex: 1
        },
        {
          question: "Which phrase is appropriate for the integrated task?",
          options: [
            "'I personally believe that...'",
            "'In my experience...'",
            "'The lecturer argues that...'",
            "'Everyone knows that...'"
          ],
          correctIndex: 2
        },
        {
          question: "What is a 'concession-rebuttal'?",
          options: [
            "Giving up on your argument",
            "Acknowledging an opposing point before arguing against it",
            "Agreeing with everything the lecturer says",
            "Ending your essay with a question"
          ],
          correctIndex: 1
        },
        {
          question: "How should you manage time in the integrated writing task?",
          options: [
            "Write for the full 20 minutes with no planning",
            "Plan for 10 minutes, write for 10 minutes",
            "Plan for 1-2 minutes, write for 15-16 minutes, revise for 2-3 minutes",
            "Revise for 10 minutes, write for 10 minutes"
          ],
          correctIndex: 2
        }
      ],
      biblicalIntegration: "2 Timothy 2:15 instructs us to 'study to show yourself approved unto God, a workman who does not need to be ashamed, rightly dividing the word of truth.' Just as we handle Scripture with care and precision, we must handle source material in academic writing with accuracy and integrity—never distorting what a source actually says."
    },

    2: {
      title: "IELTS Writing Tasks",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Master IELTS Writing Task 1 (data description, 150+ words) and Task 2 (essay, 250+ words)",
            "Develop precise data description language including trends, comparisons, and key features",
            "Apply band 8-9 essay structures with sophisticated argumentation and cohesion",
            "Overcome French-speaker tendencies toward over-description and unnecessary literary flourishes"
          ],
          input: {
            text: "IELTS Academic Writing consists of two tasks completed in 60 minutes. Task 1 (20 minutes recommended, 150 words minimum) requires you to describe, summarize, or explain visual information—a graph, table, chart, diagram, or map. Task 2 (40 minutes recommended, 250 words minimum) is a discursive essay responding to a point of view, argument, or problem. Task 2 is worth twice as much as Task 1 in your final score, so allocate your time accordingly. For Task 1, the key skill is selecting and reporting main features while making relevant comparisons. You do not need to describe every data point—examiners reward selectivity and overview. Begin with a paraphrase of the prompt, provide an overview identifying the most significant trends or features, then describe specific data to support your overview. Use precise data description language: 'increased sharply from 20% to 45%,' 'remained relatively stable at around 30%,' 'peaked at 60% in 2015 before declining gradually,' 'fluctuated between 10% and 25% throughout the period.' Avoid vague language like 'went up a lot' or 'changed significantly.' French speakers often over-describe in Task 1, attempting to account for every data point rather than identifying key patterns. This wastes time and reduces coherence. Practice selecting the 3-4 most important features and describing them precisely. For Task 2, you must present a clear, well-developed argument with relevant examples. Band 8-9 essays demonstrate: a clear position throughout, fully extended and well-supported ideas in each paragraph, skillful use of cohesive devices without overuse, and a wide range of vocabulary and grammatical structures used accurately. Common essay types include opinion essays ('To what extent do you agree or disagree?'), discussion essays ('Discuss both views and give your opinion'), problem-solution essays, and advantages-disadvantages essays. Each requires a slightly different structure, but all demand a clear thesis and consistent development. French speakers should be particularly careful about two things: first, avoiding the balanced thèse-antithèse-synthèse approach when the prompt asks for your opinion (state your position clearly and maintain it); second, avoiding overly literary or philosophical language that sounds impressive but lacks precision. IELTS rewards clear, precise, academic English over elegant but vague prose. Use formal register but prioritize clarity: 'This has led to significant environmental consequences' is better than 'This has engendered a plethora of ecological ramifications.'",
            keyConcepts: [
              "Task 1: describe visual data (150+ words, 20 min); Task 2: essay (250+ words, 40 min)",
              "Task 2 is worth twice as much as Task 1",
              "Task 1 structure: paraphrase, overview, specific details with comparisons",
              "Data language: 'increased sharply,' 'remained stable,' 'peaked at,' 'fluctuated between'",
              "French-speaker pitfall: over-describing every data point instead of selecting key features",
              "Band 8-9 essays: clear position, fully developed ideas, cohesion, accurate range"
            ]
          },
          processing: {
            activities: [
              "Analyze a line graph showing population growth in three countries and write a Task 1 response that selects key features and uses precise data language, avoiding over-description",
              "Compare two Task 2 essays—one using a French thèse-antithèse-synthèse structure and one using an IELTS-appropriate structure—and identify scoring implications",
              "Write a complete Task 2 opinion essay (250+ words) in 40 minutes on a current academic topic, maintaining a clear position throughout",
              "Practice converting vague descriptions ('went up a lot') into precise data language ('increased sharply from 12% to 47% between 2010 and 2020')"
            ]
          },
          output: {
            tasks: [
              "Complete a full IELTS Writing practice test (Task 1 and Task 2) in 60 minutes, then self-assess each response against band 8 descriptors, identifying specific areas where your French language background influenced your writing"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Understand the requirements and scoring for IELTS Writing Tasks 1 and 2",
            "Use appropriate data description language for Task 1",
            "Write organized essays with clear positions for Task 2",
            "Manage the 60-minute time allocation effectively"
          ],
          input: {
            text: "IELTS Academic Writing has two tasks in 60 minutes. Task 1 (spend about 20 minutes, write at least 150 words): You describe information from a graph, chart, table, or diagram. Do not give your opinion—just report what you see. Start by paraphrasing the question in your own words, then give an overview of the main trends or features, then describe specific details with numbers. Use precise language: 'increased sharply' (went up a lot fast), 'remained stable' (stayed the same), 'peaked at 60%' (reached its highest point at 60%), 'declined gradually' (went down slowly), 'fluctuated between 20% and 30%' (went up and down between those numbers). Do not describe every single number—choose the most important 3-4 trends. Task 2 (spend about 40 minutes, write at least 250 words): You write an essay in response to a question or statement. You might be asked for your opinion, to discuss both sides, or to suggest solutions to a problem. Whatever the question asks, state your position clearly in the introduction and support it with developed paragraphs. Each body paragraph should have a topic sentence, explanation, and example. For French speakers: avoid trying to describe every data point in Task 1 (select the key features). In Task 2, maintain one clear position rather than trying to present both sides equally.",
            keyConcepts: [
              "Task 1: describe data (150+ words, ~20 min)—no opinion",
              "Task 2: essay (250+ words, ~40 min)—clear position required",
              "Data language: increased sharply, remained stable, peaked at, declined gradually",
              "Select 3-4 key features for Task 1, not every data point",
              "Essay structure: introduction with thesis, body paragraphs with topic sentences, conclusion",
              "Task 2 counts double in scoring—spend more time on it"
            ]
          },
          processing: {
            activities: [
              "Practice describing a bar chart using precise data language, selecting only the most important features",
              "Write an essay introduction with a clear thesis statement for an opinion question",
              "Complete a Task 2 body paragraph with a topic sentence, explanation, and example"
            ]
          },
          output: {
            tasks: [
              "Write a complete Task 1 response (150+ words in 20 minutes) describing a graph, using precise data language and selecting key features"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Know what IELTS Writing Tasks 1 and 2 ask you to do",
            "Use simple but accurate language to describe data",
            "Write a clear essay with an introduction, body, and conclusion"
          ],
          input: {
            text: "IELTS Writing has two tasks. You have 60 minutes total. Task 1 (20 minutes, 150+ words): Look at a graph, chart, or table and describe what you see. Do not give your opinion. Use phrases like: 'The graph shows that...' 'X increased from 20% to 40%.' 'Y remained stable at 30%.' 'Z decreased gradually from 2010 to 2020.' Choose the most important trends—you do not need to describe every number. Task 2 (40 minutes, 250+ words): Write an essay. Read the question carefully and decide your answer. Write an introduction stating your opinion, 2-3 body paragraphs with reasons and examples, and a short conclusion. Task 2 is more important for your score, so spend more time on it. A tip for French speakers: keep your language clear and direct. Simple, correct sentences score better than complex, unclear ones.",
            keyConcepts: [
              "Task 1: describe a graph or chart (150+ words, 20 min)",
              "Task 2: write an essay (250+ words, 40 min)—more important for your score",
              "Data phrases: increased, decreased, remained stable",
              "Essay needs: introduction, body paragraphs, conclusion",
              "Choose the most important trends, not every detail"
            ]
          },
          processing: {
            activities: [
              "Write five sentences describing data using 'increased,' 'decreased,' 'remained stable,' and 'peaked at'",
              "Write a 4-sentence introduction to an essay with a clear opinion"
            ]
          },
          output: {
            tasks: [
              "Describe a simple bar chart in 150 words, using at least three data description phrases"
            ]
          }
        }
      },
      vocabulary: [
        { word: "data description", definition: "Language used to explain trends, comparisons, and patterns shown in graphs, charts, or tables" },
        { word: "paraphrase", definition: "Restating information in your own words while keeping the same meaning" },
        { word: "overview", definition: "A general summary of the main features or trends before going into specific details" },
        { word: "fluctuate", definition: "To go up and down repeatedly within a range, as in 'prices fluctuated between $10 and $20'" },
        { word: "cohesive device", definition: "A word or phrase that connects ideas, such as 'however,' 'moreover,' 'as a result'" },
        { word: "discursive essay", definition: "An essay that explores different aspects of a topic through argument and analysis" },
        { word: "band descriptor", definition: "The criteria used to describe what skills and qualities are expected at each IELTS score level" },
        { word: "register", definition: "The level of formality in language, such as formal academic English versus casual conversational English" }
      ],
      quiz: [
        {
          question: "How much time is recommended for IELTS Writing Task 2?",
          options: ["15 minutes", "20 minutes", "30 minutes", "40 minutes"],
          correctIndex: 3
        },
        {
          question: "What is the minimum word count for IELTS Writing Task 1?",
          options: ["100 words", "150 words", "200 words", "250 words"],
          correctIndex: 1
        },
        {
          question: "Which task counts more toward your IELTS Writing score?",
          options: [
            "Task 1 counts double",
            "They are equal",
            "Task 2 counts double",
            "It depends on the test version"
          ],
          correctIndex: 2
        },
        {
          question: "What does 'peaked at' mean in data description?",
          options: [
            "Started at a certain point",
            "Reached its highest point",
            "Dropped to its lowest point",
            "Stayed the same"
          ],
          correctIndex: 1
        },
        {
          question: "What common mistake do French speakers make in IELTS Task 1?",
          options: [
            "Writing too few words",
            "Over-describing every data point instead of selecting key features",
            "Adding personal opinions",
            "Using informal language"
          ],
          correctIndex: 1
        },
        {
          question: "What does 'fluctuated between' mean?",
          options: [
            "Increased steadily",
            "Went up and down repeatedly within a range",
            "Decreased gradually",
            "Remained constant"
          ],
          correctIndex: 1
        },
        {
          question: "What should the first sentence of a Task 1 response do?",
          options: [
            "State your opinion about the data",
            "Paraphrase the question prompt in your own words",
            "Describe the smallest data point",
            "Give a conclusion"
          ],
          correctIndex: 1
        },
        {
          question: "In an IELTS opinion essay, what should the introduction include?",
          options: [
            "A list of all your examples",
            "A balanced presentation of both sides",
            "A clear thesis stating your position",
            "A question for the reader"
          ],
          correctIndex: 2
        },
        {
          question: "Which data description phrase means 'stayed the same'?",
          options: [
            "Increased sharply",
            "Fluctuated significantly",
            "Remained stable",
            "Peaked at"
          ],
          correctIndex: 2
        },
        {
          question: "What is a 'cohesive device'?",
          options: [
            "A paragraph break",
            "A word or phrase that connects ideas, such as 'however' or 'moreover'",
            "A type of graph",
            "A thesis statement"
          ],
          correctIndex: 1
        }
      ],
      biblicalIntegration: "Proverbs 25:11 says, 'A word fitly spoken is like apples of gold in a setting of silver.' Precise, well-chosen words in writing—especially when describing data—reflect this biblical value of saying exactly what needs to be said, no more and no less."
    },

    3: {
      title: "Academic Essay Excellence",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Craft sophisticated thesis statements that go beyond simple agree/disagree positions",
            "Develop nuanced body paragraphs with layered argumentation, evidence, and analysis",
            "Write effective conclusions that synthesize rather than merely summarize",
            "Transform French academic writing habits into English academic writing strengths"
          ],
          input: {
            text: "Academic essay excellence for standardized tests requires mastering three key elements: the sophisticated thesis, the nuanced argument, and the effective conclusion. A sophisticated thesis does more than state a position—it signals the complexity of your thinking. Compare: 'I agree that technology is helpful in education' (simple) versus 'While technology has undeniably expanded access to educational resources, its effectiveness depends critically on pedagogical integration and equitable infrastructure, without which it risks widening rather than narrowing achievement gaps' (sophisticated). The second thesis acknowledges complexity, introduces conditions, and previews the analytical framework. For body paragraphs, advanced writing uses the PEEL structure expanded: Point (clear topic sentence), Evidence (specific data or examples), Explanation (analysis connecting evidence to your point), and Link (transition to the next paragraph or back to the thesis). But at the highest level, body paragraphs also include concession-rebuttal elements: acknowledging the strongest counterargument and explaining why your position still holds. This is where French academic training can actually help—the French tradition of exploring contradictions develops analytical thinking. The key is integration: weave the counterargument into your paragraph rather than giving it a separate section. For conclusions, avoid the common mistake of simple restatement. An effective conclusion synthesizes: it shows how your argument has built toward a larger insight. It might address implications ('This suggests that future education policy should...'), limitations ('While this argument holds for developed nations...'), or broader significance ('Understanding this relationship between technology and equity illuminates a fundamental tension in modern education'). French speakers must be particularly vigilant about three habits that reduce TOEFL and IELTS scores. First, the 'balanced conclusion' from thèse-antithèse-synthèse: on these tests, your conclusion should reinforce your position, not find a middle ground. Second, overly philosophical openings ('Since the dawn of civilization, mankind has...')—start with your thesis, not a grand pronouncement. Third, excessive use of abstract nouns without concrete examples ('The problematic of educational inequality demands systemic intervention')—ground every abstraction in a specific example.",
            keyConcepts: [
              "Sophisticated thesis: acknowledges complexity, introduces conditions, previews analysis",
              "PEEL+ structure: Point, Evidence, Explanation, Link + concession-rebuttal",
              "Effective conclusions synthesize toward larger insights rather than merely restating",
              "French habit to transform: balanced analysis becomes integrated concession-rebuttal",
              "Avoid: balanced conclusions, philosophical openings, abstract nouns without examples",
              "Ground every abstraction in specific, concrete evidence"
            ]
          },
          processing: {
            activities: [
              "Transform five simple thesis statements into sophisticated ones that acknowledge complexity, introduce conditions, and preview analytical frameworks",
              "Write two PEEL+ body paragraphs with integrated concession-rebuttal elements on an education topic",
              "Compare a 'restating' conclusion with a 'synthesizing' conclusion for the same essay and analyze the score difference each would receive",
              "Identify and rewrite three instances of overly abstract or philosophical writing, grounding each in a specific example"
            ]
          },
          output: {
            tasks: [
              "Write a complete five-paragraph academic essay (350+ words) on an assigned topic with a sophisticated thesis, PEEL+ body paragraphs with concession-rebuttal, and a synthesizing conclusion, then annotate each element to demonstrate your awareness of the techniques used"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Write clear thesis statements that state a position and preview main points",
            "Develop body paragraphs with topic sentences, evidence, and explanation",
            "Write conclusions that do more than repeat the introduction",
            "Avoid French academic writing habits that reduce scores on English tests"
          ],
          input: {
            text: "Writing a strong academic essay for tests like TOEFL and IELTS requires three skills: a clear thesis, developed body paragraphs, and an effective conclusion. Your thesis statement should appear in the introduction and clearly state your main argument. A good thesis does two things: states your position and previews your reasons. Example: 'Technology improves education primarily by increasing access to resources and enabling personalized learning, though its benefits depend on proper implementation.' Body paragraphs should follow the PEEL structure: Point (topic sentence stating the paragraph's main idea), Evidence (a specific example or fact), Explanation (why this evidence supports your point), and Link (connection to the next paragraph or back to the thesis). Each body paragraph should develop one main idea fully rather than touching on multiple ideas briefly. For conclusions, go beyond just restating your thesis. Add one of these: a future implication ('As technology continues to evolve, educators must...'), a broader connection ('This relationship between access and equity applies beyond education to...'), or a call to reflection ('Understanding these factors helps us make better decisions about...'). French speakers should watch out for these habits: (1) Starting with a grand philosophical statement instead of your thesis—get to your point quickly. (2) Trying to balance both sides equally—take a clear position. (3) Using abstract language without concrete examples—always include specific evidence.",
            keyConcepts: [
              "Thesis: position + preview of reasons",
              "PEEL: Point, Evidence, Explanation, Link",
              "Conclusions: add implications, connections, or reflections—not just restatement",
              "Avoid philosophical openings—state your thesis directly",
              "Take a clear position rather than balancing both sides equally",
              "Always ground abstract ideas in concrete examples"
            ]
          },
          processing: {
            activities: [
              "Write three thesis statements that include both a position and a preview of reasons for different essay topics",
              "Write one complete PEEL body paragraph with a clear topic sentence, specific evidence, explanation, and link",
              "Rewrite a summary-only conclusion to include a future implication or broader connection"
            ]
          },
          output: {
            tasks: [
              "Write a complete four-paragraph essay (250+ words) with a clear thesis, two PEEL body paragraphs, and a conclusion that includes a future implication or broader connection"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Write a clear thesis statement that states your opinion",
            "Organize body paragraphs with a main idea, example, and explanation",
            "Write a simple conclusion that restates your idea and adds a final thought"
          ],
          input: {
            text: "A good essay needs three things: a clear thesis, organized body paragraphs, and a conclusion. Your thesis statement tells the reader what you think. Put it at the end of your introduction. Example: 'I believe that technology helps students learn better because it makes information easy to find and lessons more interesting.' Your body paragraphs should each have one main idea. Start with a topic sentence, then give an example, then explain why it matters. Example: Topic sentence: 'Technology makes information easy to find.' Example: 'Students can search any topic online and find articles, videos, and tutorials.' Explanation: 'This means students can learn about things even when a teacher is not available.' Your conclusion restates your main idea in new words and adds a final thought. For example: 'In conclusion, technology is a valuable tool for education. As more schools get better internet, even more students will benefit.' Tip for French speakers: in English essays for tests, state your opinion clearly at the start. Do not wait until the conclusion to reveal what you think.",
            keyConcepts: [
              "Thesis: clearly states your opinion in the introduction",
              "Body paragraphs: topic sentence + example + explanation",
              "Conclusion: restate your idea + add a final thought",
              "State your opinion at the start, not the end",
              "Each paragraph focuses on one main idea"
            ]
          },
          processing: {
            activities: [
              "Write two thesis statements about familiar topics (school, technology, hobbies)",
              "Write one body paragraph with a topic sentence, example, and explanation"
            ]
          },
          output: {
            tasks: [
              "Write a simple three-paragraph essay (150+ words) with a thesis, one body paragraph with an example, and a conclusion with a final thought"
            ]
          }
        }
      },
      vocabulary: [
        { word: "thesis statement", definition: "A sentence in the introduction that clearly states your main argument and previews your reasoning" },
        { word: "nuanced argument", definition: "An argument that acknowledges complexity rather than presenting an issue as simply black and white" },
        { word: "concession", definition: "Acknowledging a valid point made by the opposing side before explaining why your position is stronger" },
        { word: "synthesis", definition: "Combining multiple ideas or arguments into a new, unified insight in your conclusion" },
        { word: "topic sentence", definition: "The first sentence of a body paragraph that states the paragraph's main idea" },
        { word: "PEEL structure", definition: "An essay paragraph framework: Point, Evidence, Explanation, Link" },
        { word: "implication", definition: "A possible consequence or future effect that follows logically from your argument" },
        { word: "register", definition: "The level of formality used in writing, such as academic, professional, or casual" }
      ],
      quiz: [
        {
          question: "What makes a thesis statement 'sophisticated'?",
          options: [
            "Using complex vocabulary",
            "Making it very long",
            "Acknowledging complexity and previewing analytical framework",
            "Including a famous quote"
          ],
          correctIndex: 2
        },
        {
          question: "What does PEEL stand for in essay writing?",
          options: [
            "Purpose, Example, Evidence, Language",
            "Point, Evidence, Explanation, Link",
            "Paragraph, Edit, Evaluate, Learn",
            "Plan, Execute, Examine, Locate"
          ],
          correctIndex: 1
        },
        {
          question: "What should an effective conclusion do?",
          options: [
            "Simply repeat the introduction word-for-word",
            "Introduce a completely new argument",
            "Synthesize ideas toward a larger insight",
            "Ask the reader a question"
          ],
          correctIndex: 2
        },
        {
          question: "What French academic habit should be avoided in TOEFL/IELTS essays?",
          options: [
            "Using formal vocabulary",
            "Starting with a grand philosophical statement instead of your thesis",
            "Including examples in body paragraphs",
            "Writing a conclusion"
          ],
          correctIndex: 1
        },
        {
          question: "What is a 'concession' in essay writing?",
          options: [
            "Giving up your argument entirely",
            "Acknowledging a valid opposing point before reinforcing your position",
            "Writing a summary paragraph",
            "Quoting an expert who disagrees with you"
          ],
          correctIndex: 1
        },
        {
          question: "Where should your thesis statement appear?",
          options: [
            "At the end of the conclusion",
            "In the middle of the essay",
            "In the introduction",
            "In every body paragraph"
          ],
          correctIndex: 2
        },
        {
          question: "Why should abstract ideas be grounded in concrete examples?",
          options: [
            "Because abstract language is always wrong",
            "To increase word count",
            "Because examiners need specific evidence to give high scores",
            "Because French does not have abstract nouns"
          ],
          correctIndex: 2
        },
        {
          question: "What is the difference between a 'restating' conclusion and a 'synthesizing' conclusion?",
          options: [
            "A restating conclusion is longer",
            "A synthesizing conclusion builds toward a new insight; restating just repeats the thesis",
            "They are the same thing",
            "A restating conclusion is more formal"
          ],
          correctIndex: 1
        },
        {
          question: "What type of conclusion adds a 'future implication'?",
          options: [
            "One that discusses what might happen as a result of the argument",
            "One that restates the thesis",
            "One that asks a rhetorical question",
            "One that introduces a new topic"
          ],
          correctIndex: 0
        },
        {
          question: "How should French-trained students handle counterarguments in English essays?",
          options: [
            "Ignore them completely",
            "Give them a separate, equal section (thèse-antithèse-synthèse)",
            "Integrate them into body paragraphs as concession-rebuttal",
            "Only mention them in the conclusion"
          ],
          correctIndex: 2
        }
      ],
      biblicalIntegration: "Colossians 4:6 says, 'Let your speech always be gracious, seasoned with salt, so that you may know how you ought to answer each person.' Academic writing that is clear, thoughtful, and well-reasoned reflects the biblical call to season our words with wisdom and purpose."
    },

    4: {
      title: "Writing Test Simulation",
      lessonType: "PROJECT",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Complete full simulated writing tests for TOEFL and IELTS under realistic timed conditions",
            "Apply scoring rubrics to self-evaluate each response with specific reference to band descriptors",
            "Identify patterns in errors related to French L1 interference in writing",
            "Develop a targeted revision and practice plan based on self-assessment results"
          ],
          input: {
            text: "This project is your comprehensive writing test simulation. You will complete both a full TOEFL writing test and a full IELTS writing test under realistic conditions, then conduct detailed self-assessment. For the TOEFL simulation: complete the Integrated Writing Task (read a passage, review lecture notes provided, write a 150-280 word synthesis in 20 minutes) and the Academic Discussion Task (respond to a professor's prompt with 100+ words in 10 minutes). For the IELTS simulation: complete Task 1 (describe a graph or chart in 150+ words in 20 minutes) and Task 2 (write a discursive essay of 250+ words in 40 minutes). All tasks must be completed with strict timing—use a timer and do not go over. After completing all tasks, conduct a systematic self-assessment. For each response, evaluate: Task Achievement (Did you fully address the prompt? Did you select key features for IELTS Task 1? Did you maintain a consistent position?), Coherence and Cohesion (Is the organization logical? Are cohesive devices used effectively?), Lexical Resource (Is vocabulary precise and varied? Are there French false cognate errors?), and Grammatical Range and Accuracy (Are sentence structures varied? Are articles, tenses, and prepositions accurate?). Pay particular attention to French L1 interference patterns: article errors (French 'le/la/les' vs. English 'the/a/an'), preposition errors (French 'dépendre de' → English 'depend on,' not 'depend of'), false cognates ('actually' does not mean 'actuellement'), and structural transfer (French-style balanced essays where English expects a clear position). Assign yourself estimated scores using the official rubrics, then create a specific two-week improvement plan targeting your three weakest areas.",
            keyConcepts: [
              "Complete TOEFL (integrated + discussion) and IELTS (Task 1 + Task 2) under strict time limits",
              "Self-assess using four criteria: task achievement, coherence/cohesion, lexical resource, grammar",
              "Identify French L1 interference: articles, prepositions, false cognates, structural transfer",
              "Assign estimated scores using official rubrics",
              "Create a two-week improvement plan targeting three weakest areas"
            ]
          },
          processing: {
            activities: [
              "Set up a distraction-free environment with a timer and complete all four writing tasks consecutively without breaks",
              "After completing all tasks, wait at least one hour, then reread each response with fresh eyes and mark errors using a color-coding system",
              "Apply the official TOEFL (0-5) and IELTS (1-9) scoring rubrics to assign estimated scores with justification for each score",
              "Create a revision log documenting every French L1 interference error and categorizing it (article, preposition, false cognate, structural)"
            ]
          },
          output: {
            tasks: [
              "Submit all four completed writing tasks with self-assigned scores and detailed justification, a categorized error log identifying French L1 interference patterns, and a two-week improvement plan with daily practice activities targeting your three weakest areas"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Complete simulated writing tasks for at least one test format under timed conditions",
            "Self-evaluate responses for clarity, organization, grammar, and vocabulary",
            "Identify specific areas for improvement in writing",
            "Create a practice plan to address writing weaknesses"
          ],
          input: {
            text: "In this project, you will simulate a real writing test. Choose TOEFL or IELTS (or both if time allows) and complete all writing tasks with a timer. Do not look anything up during the test—write from what you know, just like on test day. After completing your responses, evaluate them: Did you answer the question fully? Is your writing organized (introduction, body, conclusion)? Did you use varied vocabulary? Are your grammar and spelling accurate? Check especially for article errors ('the' vs 'a' vs no article), preposition errors, and verb tense mistakes—these are common for French speakers. Write down two things you did well and three things to improve, then create a simple one-week practice plan.",
            keyConcepts: [
              "Complete writing tasks under strict timed conditions",
              "Self-evaluate for task completion, organization, vocabulary, and grammar",
              "Check for article, preposition, and verb tense errors",
              "Identify two strengths and three areas for improvement",
              "Create a one-week practice plan"
            ]
          },
          processing: {
            activities: [
              "Complete your chosen writing test tasks with strict timing and no outside resources",
              "Reread each response and underline any grammar errors, circling article and preposition mistakes",
              "Write a brief self-assessment noting two strengths and three weaknesses"
            ]
          },
          output: {
            tasks: [
              "Submit your completed writing test with a self-evaluation noting two strengths, three areas for improvement, and a one-week practice plan"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Complete at least one writing task under timed conditions",
            "Check your writing for basic grammar and organization",
            "Set goals for improving your writing"
          ],
          input: {
            text: "In this project, you will practice writing under test conditions. Choose one task: write an IELTS Task 2 essay (250 words in 40 minutes) or a TOEFL discussion response (100 words in 10 minutes). Set a timer and write without stopping to look things up. When you finish, reread your writing and check: Did you answer the question? Did you have an introduction, body, and conclusion? Did you check for grammar mistakes? Write down one thing you did well and two things to practice more.",
            keyConcepts: [
              "Complete at least one timed writing task",
              "Check for basic organization and grammar",
              "Identify one strength and two areas to improve"
            ]
          },
          processing: {
            activities: [
              "Complete your chosen writing task with a timer running",
              "Reread and check for basic grammar errors and missing parts (introduction, body, conclusion)"
            ]
          },
          output: {
            tasks: [
              "Submit your completed writing task with a note listing one strength and two areas for improvement"
            ]
          }
        }
      },
      vocabulary: [
        { word: "simulation", definition: "A practice activity that closely imitates real test conditions" },
        { word: "self-assessment", definition: "Evaluating your own work against specific criteria to identify strengths and weaknesses" },
        { word: "L1 interference", definition: "When patterns from your first language (like French) cause errors in your second language (English)" },
        { word: "false cognate", definition: "A word that looks similar in two languages but has different meanings, like 'actually' (English) vs 'actuellement' (French, meaning 'currently')" },
        { word: "rubric", definition: "A detailed set of scoring criteria that defines expectations at each performance level" }
      ],
      quiz: [],
      biblicalIntegration: "Ecclesiastes 9:10 teaches, 'Whatever your hand finds to do, do it with your might.' Approaching writing test preparation with full effort and careful self-evaluation honors God by developing the abilities He has given us to their fullest potential."
    }
  },

  // ─────────────────────────────────────────────
  // UNIT 6: University Academic Skills
  // ─────────────────────────────────────────────
  6: {
    1: {
      title: "Research Papers and Academic Integrity",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Master the structure of English-language research papers: abstract, introduction, body, conclusion, references",
            "Apply APA and MLA citation formats accurately, understanding when each is appropriate",
            "Understand academic integrity principles including plagiarism prevention and proper paraphrasing",
            "Navigate the transition from French academic citation conventions (footnotes) to English in-text citations"
          ],
          input: {
            text: "Writing research papers in English follows conventions that differ significantly from French academic writing. Understanding these differences is essential for success at English-medium universities. A standard research paper has five major sections: the Abstract (a 150-250 word summary of the entire paper—purpose, methods, findings, conclusions), the Introduction (background context, literature review, research question or thesis, and a preview of the paper's structure), the Body (organized into sections with headings, presenting arguments or findings with evidence), the Conclusion (summary of key findings, implications, limitations, and suggestions for future research), and References (a complete list of all sources cited in the paper). Two primary citation systems dominate English academic writing: APA (American Psychological Association) style, used in social sciences, education, and psychology, and MLA (Modern Language Association) style, used in humanities, literature, and languages. APA uses author-date in-text citations: (Smith, 2024, p. 45). MLA uses author-page: (Smith 45). Both require a complete reference list at the end, but the formatting differs. For French speakers, the most important transition is from footnotes to in-text citations. In French academic writing, citations typically appear as footnotes at the bottom of the page (following the French bibliographic tradition). In English academic writing, in-text citations are standard—the source information appears in parentheses within the sentence itself. Footnotes in English are reserved for supplementary information, not citations. This is not merely a formatting preference; it reflects a different philosophy of source integration. English academic writing weaves sources into the argument through direct quotation, paraphrasing, and summary, making source attribution visible within the text itself. Academic integrity is fundamental. Plagiarism—presenting someone else's ideas or words as your own—is treated extremely seriously at English-language universities, often more severely than at French institutions where the boundaries of proper citation may be drawn differently. To avoid plagiarism: always cite the source when using someone else's ideas (even when paraphrasing), use quotation marks for direct quotes, paraphrase by genuinely restating ideas in your own words and sentence structure (not just replacing a few synonyms), and maintain a clear distinction between your analysis and reported information. Proper paraphrasing requires understanding the original text deeply enough to explain it in completely different words and sentence patterns. Compare: Original: 'Climate change poses an existential threat to coastal communities worldwide.' Poor paraphrase: 'Climate change is an existential threat to coastal communities around the world.' (Only changed one word.) Effective paraphrase: 'Rising global temperatures increasingly endanger the survival of populations living near coastlines (Smith, 2024).' The effective version uses different vocabulary, different sentence structure, and includes a citation.",
            keyConcepts: [
              "Five sections: abstract, introduction, body, conclusion, references",
              "APA (author-date) for social sciences; MLA (author-page) for humanities",
              "French footnotes → English in-text citations: a fundamental shift",
              "Academic integrity: plagiarism is treated very seriously in English universities",
              "Proper paraphrasing: new words AND new sentence structure, plus citation",
              "Footnotes in English are for supplementary information, not citations"
            ]
          },
          processing: {
            activities: [
              "Write an abstract (150-250 words) for a hypothetical research paper on a topic of your choice, including purpose, method, findings, and conclusions",
              "Convert three French-style footnote citations into proper APA and MLA in-text citations with corresponding reference list entries",
              "Practice paraphrasing three academic passages, ensuring you change both vocabulary and sentence structure while preserving meaning",
              "Analyze a sample research paper introduction and identify its components: background, literature review, research question, and structure preview"
            ]
          },
          output: {
            tasks: [
              "Write a complete research paper introduction (400+ words) on an assigned topic with proper APA in-text citations, a clear thesis, and a literature review section, then create the corresponding reference list with at least five sources formatted correctly"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Understand the standard structure of English research papers",
            "Use basic APA or MLA citation format correctly",
            "Understand what plagiarism is and how to avoid it through proper paraphrasing and citation",
            "Know the key difference between French footnote citations and English in-text citations"
          ],
          input: {
            text: "English research papers follow a standard structure: Abstract (a short summary of the whole paper), Introduction (background information and your research question or thesis), Body (your main arguments with evidence organized under headings), Conclusion (what you found, why it matters, and what questions remain), and References (a list of all sources you cited). Two common citation styles are APA and MLA. APA (used in social sciences) puts the author and year in parentheses: (Smith, 2024). MLA (used in humanities) puts the author and page number: (Smith 45). Both require a full reference list at the end. Important for French speakers: in French academic writing, you typically use footnotes at the bottom of the page for citations. In English, you use in-text citations—the source appears in parentheses right in the sentence. Footnotes in English are only for extra information, not citations. Plagiarism means using someone else's words or ideas without giving credit. It is treated very seriously at English universities. To avoid plagiarism: cite every source, use quotation marks for exact quotes, and paraphrase properly. Good paraphrasing means rewriting an idea in completely different words and sentence structure, not just changing a few words. Always add a citation after a paraphrase.",
            keyConcepts: [
              "Paper structure: abstract, introduction, body, conclusion, references",
              "APA: (Author, Year); MLA: (Author Page)",
              "French footnotes → English in-text citations",
              "Plagiarism: using others' ideas/words without credit",
              "Good paraphrasing: change words AND structure, add citation"
            ]
          },
          processing: {
            activities: [
              "Identify the five sections of a research paper and write one sentence describing the purpose of each",
              "Practice writing three in-text citations in APA format and three in MLA format",
              "Paraphrase two short passages properly, changing both words and sentence structure"
            ]
          },
          output: {
            tasks: [
              "Write a research paper introduction (200+ words) on a topic you choose, including background information, a thesis statement, and at least two in-text citations in APA or MLA format"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Know the main parts of a research paper",
            "Understand what plagiarism is and why it is wrong",
            "Use a simple citation format to give credit to sources"
          ],
          input: {
            text: "A research paper in English has these main parts: Introduction (what your paper is about and why), Body (your main ideas with evidence), Conclusion (what you found and why it matters), and References (a list of where you got your information). When you use information from a book, article, or website, you must give credit. This is called a citation. In English, you put citations right in your sentences: (Smith, 2024). In French, you might put them in footnotes at the bottom of the page, but in English, they go in the text. Plagiarism means using someone else's words or ideas without giving credit. This is very serious in English-speaking schools. Always: put quotes around exact words from a source, rewrite ideas in your own words (paraphrase), and include the source name and year.",
            keyConcepts: [
              "Paper parts: introduction, body, conclusion, references",
              "Citations go in the text, not in footnotes",
              "Plagiarism: using others' work without giving credit",
              "Always cite your sources"
            ]
          },
          processing: {
            activities: [
              "Label the four main parts of a research paper in a sample outline",
              "Practice writing two simple citations: (Author, Year)"
            ]
          },
          output: {
            tasks: [
              "Write a short introduction (100+ words) for a paper about a topic you know, including one citation"
            ]
          }
        }
      },
      vocabulary: [
        { word: "abstract", definition: "A brief summary (150-250 words) at the beginning of a research paper covering purpose, methods, findings, and conclusions" },
        { word: "in-text citation", definition: "A source reference placed within the text of your paper, like (Smith, 2024), rather than in a footnote" },
        { word: "plagiarism", definition: "Presenting someone else's ideas or words as your own without proper attribution" },
        { word: "paraphrase", definition: "Restating an idea from a source in completely different words and sentence structure while preserving the meaning" },
        { word: "APA style", definition: "American Psychological Association citation format using author-date: (Smith, 2024), common in social sciences" },
        { word: "MLA style", definition: "Modern Language Association citation format using author-page: (Smith 45), common in humanities" },
        { word: "literature review", definition: "A section of a research paper that summarizes and analyzes what other researchers have written about the topic" },
        { word: "academic integrity", definition: "The commitment to honesty and ethical behavior in academic work, including proper citation and original thinking" }
      ],
      quiz: [
        {
          question: "What are the five main sections of an English research paper?",
          options: [
            "Thesis, argument, counterargument, rebuttal, conclusion",
            "Abstract, introduction, body, conclusion, references",
            "Title, preface, chapters, appendix, index",
            "Summary, analysis, synthesis, evaluation, bibliography"
          ],
          correctIndex: 1
        },
        {
          question: "How does English academic citation differ from French academic citation?",
          options: [
            "English uses more sources",
            "English uses in-text citations; French traditionally uses footnotes",
            "English does not require citations",
            "French uses more sources"
          ],
          correctIndex: 1
        },
        {
          question: "What is the correct APA in-text citation format?",
          options: [
            "[Smith, p. 45]",
            "(Smith 45)",
            "(Smith, 2024)",
            "Smith (45)"
          ],
          correctIndex: 2
        },
        {
          question: "What is plagiarism?",
          options: [
            "Using a library for research",
            "Writing a long paper",
            "Presenting someone else's ideas or words as your own without proper attribution",
            "Disagreeing with a source"
          ],
          correctIndex: 2
        },
        {
          question: "What makes a paraphrase 'proper'?",
          options: [
            "Changing one or two words in the original",
            "Changing both words and sentence structure while preserving meaning, plus adding a citation",
            "Translating directly from French",
            "Making the sentence longer"
          ],
          correctIndex: 1
        },
        {
          question: "When is MLA citation style typically used?",
          options: [
            "In medical research",
            "In engineering papers",
            "In humanities and literature",
            "In all academic fields"
          ],
          correctIndex: 2
        },
        {
          question: "What are footnotes used for in English academic writing?",
          options: [
            "Primary source citations",
            "Supplementary information, not citations",
            "Page numbers",
            "Author biographies"
          ],
          correctIndex: 1
        },
        {
          question: "What is a literature review?",
          options: [
            "A book review for a magazine",
            "A summary and analysis of what other researchers have written about the topic",
            "A list of novels you have read",
            "A creative writing exercise"
          ],
          correctIndex: 1
        },
        {
          question: "What does an abstract include?",
          options: [
            "Only the thesis statement",
            "The complete paper text",
            "A brief summary covering purpose, methods, findings, and conclusions",
            "A list of references"
          ],
          correctIndex: 2
        },
        {
          question: "Why is academic integrity important?",
          options: [
            "Because it makes papers longer",
            "Because it ensures honesty and gives credit to original thinkers",
            "Because professors require it for extra credit",
            "Because it is only required in English-speaking countries"
          ],
          correctIndex: 1
        }
      ],
      biblicalIntegration: "Exodus 20:15 commands, 'You shall not steal.' Plagiarism is a form of intellectual theft—taking credit for ideas that belong to others. Academic integrity reflects the biblical commitment to honesty and giving proper credit, honoring both the truth and those who labored to discover it."
    },

    2: {
      title: "Academic Discussions and Office Hours",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Master the conventions of English-language university discussions including turn-taking, building on ideas, and respectful disagreement",
            "Navigate office hours effectively, including email etiquette, appointment protocols, and productive question-asking",
            "Understand the cultural differences between French and English academic communication styles",
            "Develop the pragmatic competence needed for nuanced academic interactions at the university level"
          ],
          input: {
            text: "University academic discussions in English-speaking countries follow conventions that differ significantly from French academic culture. Understanding these differences is crucial for international students. In English-language seminars, discussion is expected to be collaborative and participatory. Students are expected to contribute regularly—sitting silently is often interpreted as lack of preparation or engagement. However, contributions should build on what others have said: 'Building on what Sarah mentioned, I would add that...' or 'I see your point about X, but I think we should also consider Y because...' Respectful disagreement is valued: 'I respectfully disagree because...' or 'That is an interesting perspective, though the evidence suggests...' Direct contradiction without softening ('No, that is wrong') is considered rude. Turn-taking is more informal than in French academic settings—you may need to signal that you want to speak ('Could I add something here?') rather than waiting to be called upon. Office hours represent one of the most valuable resources at English-speaking universities, yet many international students underutilize them. Office hours are designated times when professors are available for one-on-one or small-group conversations. They are for clarifying course material, discussing assignments, getting feedback on drafts, exploring research interests, and building professional relationships. Email etiquette for contacting professors differs markedly from French conventions. In French, you might write: 'Monsieur le Professeur, je me permets de vous écrire...' In English, the appropriate format is: 'Dear Professor Smith' (use their last name, not first name, and the title 'Professor,' not 'Mr.' or 'Mrs.' unless they specify otherwise). The email should be concise and specific: state who you are, which class you are in, what you need, and when you are available. End with 'Thank you for your time' or 'I appreciate your help,' not the elaborate French sign-offs. During office hours, come prepared with specific questions—not 'I do not understand the reading' but 'I understood the author's argument about X, but I am struggling to see how it connects to Y. Could you help me understand that relationship?' This demonstrates engagement and respects the professor's time. Academic questions follow a pattern of showing what you know before asking what you do not: 'I understand that [concept A], and I can see how it relates to [concept B], but I am unclear about how [concept C] fits in. Could you explain that connection?' This framing shows preparation and makes it easier for the professor to help you effectively. Other practical conventions: arrive on time (or one minute early), do not extend beyond your allotted time if other students are waiting, follow up with a brief thank-you email if the meeting was particularly helpful, and address any action items promptly.",
            keyConcepts: [
              "Collaborative discussion: build on others' ideas, contribute regularly, disagree respectfully",
              "Turn-taking is informal—signal to speak rather than waiting to be called on",
              "Office hours: prepare specific questions, show what you know before asking what you don't",
              "Email: 'Dear Professor Smith' (not 'Monsieur le Professeur'), concise, specific, polite",
              "French vs English academic register: English is more direct and less formally hierarchical",
              "Show preparation: 'I understand X, but I'm struggling with Y' is better than 'I don't understand'"
            ]
          },
          processing: {
            activities: [
              "Write three discussion contributions that build on a previous speaker's point, using appropriate hedging and discourse markers",
              "Draft two emails to a professor: one requesting an office hours appointment and one asking for feedback on a draft, following English conventions",
              "Practice formulating five academic questions using the 'show what you know, then ask' framework",
              "Compare a French-style formal academic email with an appropriate English version, identifying all the differences in register and convention"
            ]
          },
          output: {
            tasks: [
              "Write a complete set of academic communication pieces: two discussion contributions (one agreeing and extending, one respectfully disagreeing), an email to a professor requesting an office hours meeting, and three prepared questions for that meeting using the show-what-you-know framework"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Participate effectively in English university discussions by building on others' ideas",
            "Understand office hours culture and prepare productive questions",
            "Write appropriate emails to professors following English conventions",
            "Recognize key differences between French and English academic communication"
          ],
          input: {
            text: "At English-speaking universities, class discussions are very important. You are expected to participate—not just listen. When you speak in a discussion, try to connect to what someone else said: 'I agree with Maria's point about X, and I would add that...' or 'That is a good point, but I think we should also consider...' If you disagree, be respectful: 'I see it differently because...' is much better than 'No, that is wrong.' Office hours are times when your professor is available to meet with students. They are very useful! You can ask about assignments, get help with difficult concepts, discuss your progress, or get advice. But come prepared with specific questions. Instead of saying 'I do not understand,' try: 'I understand the main idea of the reading, but I am confused about how X relates to Y. Could you explain?' This shows you tried and makes it easier for the professor to help. For emails, use this format: 'Dear Professor Smith' (always use their last name). State who you are and your class: 'My name is Jean, and I am in your Monday 10 AM Introduction to Psychology class.' Ask your question or make your request clearly. End with: 'Thank you for your time.' Do NOT use French-style formal openings like translating 'Monsieur le Professeur.' English academic emails are more direct and concise. Send your email during business hours and allow 24-48 hours for a reply.",
            keyConcepts: [
              "Participate in discussions by building on what others say",
              "Disagree respectfully: 'I see it differently because...'",
              "Office hours: come with specific, prepared questions",
              "Email: 'Dear Professor Smith'—direct, concise, polite",
              "Do not translate French formal email conventions",
              "Show what you understand before asking what you don't"
            ]
          },
          processing: {
            activities: [
              "Write two discussion responses: one agreeing with and extending a classmate's point, one respectfully disagreeing",
              "Draft an email to a professor asking about an assignment, following English conventions",
              "Prepare three specific questions for office hours using the 'I understand X, but I'm confused about Y' framework"
            ]
          },
          output: {
            tasks: [
              "Write an email to a professor requesting help with an assignment and prepare two specific questions to ask during office hours, demonstrating what you already understand"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Know how to participate in class discussions by sharing ideas respectfully",
            "Understand what office hours are and how to use them",
            "Write a simple, polite email to a professor"
          ],
          input: {
            text: "At English-speaking universities, students are expected to speak in class discussions. You can agree with someone: 'I agree with what John said because...' You can add a new idea: 'I also think that...' If you disagree, be polite: 'I understand your point, but I think...' Office hours are times when your professor is available to help. You can go to ask questions about homework, get help understanding something, or talk about your grades. Come prepared—have your question ready before you go. To email a professor, write: 'Dear Professor Smith,' (use their last name). Then say who you are: 'My name is Pierre and I am in your English class.' Ask your question. End with 'Thank you.' Keep it short and clear. Do not write in a very formal French style—English emails to professors are friendly but respectful.",
            keyConcepts: [
              "Participate in discussions: agree, add ideas, disagree politely",
              "Office hours: go with a question ready",
              "Email format: 'Dear Professor Smith,' + who you are + question + 'Thank you'",
              "Keep emails short and clear"
            ]
          },
          processing: {
            activities: [
              "Write two sentences for a class discussion: one agreeing with someone, one adding a new idea",
              "Write a short email to a professor asking one question about homework"
            ]
          },
          output: {
            tasks: [
              "Write a complete email to a professor (5-8 sentences) asking for help with something you are studying"
            ]
          }
        }
      },
      vocabulary: [
        { word: "office hours", definition: "Designated times when a professor is available for student meetings, usually in their office" },
        { word: "turn-taking", definition: "The practice of alternating who speaks during a discussion so everyone has a chance to contribute" },
        { word: "pragmatic competence", definition: "The ability to use language appropriately in social contexts, including knowing what to say, how, and when" },
        { word: "register", definition: "The level of formality in language, adjusted based on the audience and context" },
        { word: "discourse marker", definition: "A word or phrase used to organize and connect ideas in conversation, like 'however,' 'building on that,' or 'to summarize'" },
        { word: "email etiquette", definition: "The accepted conventions for writing professional emails, including greetings, tone, and sign-offs" }
      ],
      quiz: [
        {
          question: "How should you address a professor in an English academic email?",
          options: [
            "'Hey Professor!'",
            "'Dear Professor Smith'",
            "'Monsieur le Professeur'",
            "'Hi there'"
          ],
          correctIndex: 1
        },
        {
          question: "What are office hours?",
          options: [
            "The time when classes are held",
            "Designated times when professors are available for student meetings",
            "The hours the library is open",
            "Required study periods"
          ],
          correctIndex: 1
        },
        {
          question: "How should you participate in an English university discussion?",
          options: [
            "Wait to be called on before speaking",
            "Speak only if you have the perfect answer",
            "Build on what others have said and contribute regularly",
            "Argue forcefully to show intelligence"
          ],
          correctIndex: 2
        },
        {
          question: "What is the best way to ask a question during office hours?",
          options: [
            "'I don't understand anything'",
            "'I understand X, but I'm struggling with how Y connects. Could you explain?'",
            "'Can you just explain the whole lecture again?'",
            "'My friend said you are a good teacher'"
          ],
          correctIndex: 1
        },
        {
          question: "How should you disagree in an academic discussion?",
          options: [
            "'No, you are completely wrong'",
            "'I see your point, but I think we should also consider...'",
            "Stay silent to avoid conflict",
            "'That is a terrible idea'"
          ],
          correctIndex: 1
        },
        {
          question: "Why should French speakers avoid translating formal French email conventions into English?",
          options: [
            "Because English has no formal register",
            "Because English academic emails are more direct and concise than French formal style",
            "Because professors do not read emails",
            "Because French emails are always wrong"
          ],
          correctIndex: 1
        },
        {
          question: "What should you include in an email to a professor?",
          options: [
            "Your name, class, specific question, and polite closing",
            "Only your question with no greeting",
            "A long personal story and then your question",
            "An apology for bothering them"
          ],
          correctIndex: 0
        },
        {
          question: "What does 'building on what others said' mean in a discussion?",
          options: [
            "Repeating what they said word-for-word",
            "Ignoring their points and starting a new topic",
            "Connecting your contribution to a previous speaker's point",
            "Disagreeing with everything"
          ],
          correctIndex: 2
        },
        {
          question: "What is 'pragmatic competence'?",
          options: [
            "Having a large vocabulary",
            "The ability to use language appropriately in different social contexts",
            "Speaking quickly without pauses",
            "Perfect grammar"
          ],
          correctIndex: 1
        },
        {
          question: "When should you send an email to a professor?",
          options: [
            "At 3 AM on a Sunday",
            "During business hours, allowing 24-48 hours for a reply",
            "Five minutes before the assignment is due",
            "Only after getting a bad grade"
          ],
          correctIndex: 1
        }
      ],
      biblicalIntegration: "Proverbs 15:1 says, 'A soft answer turns away wrath, but a harsh word stirs up anger.' Academic discussions require the same gracious communication—respectful disagreement, careful listening, and humble willingness to learn from others, reflecting Christ's character in every interaction."
    },

    3: {
      title: "Study Strategies for English-Medium Education",
      lessonType: "INSTRUCTION",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Develop comprehensive ESL study strategies for textbook reading, lecture comprehension, and note-taking in English",
            "Apply metacognitive approaches to monitor and improve academic English proficiency over time",
            "Master group project communication skills including negotiation, delegation, and conflict resolution in English",
            "Create personalized exam preparation strategies that account for the additional cognitive load of studying in a second language"
          ],
          input: {
            text: "Studying at an English-medium university as a French speaker involves a unique cognitive challenge: you must simultaneously process new academic content and operate in a second language. This dual processing demand requires specific strategies that go beyond those used by native English-speaking students. For textbook reading, use the SQ3R method adapted for ESL learners: Survey (preview headings, summaries, and visual aids to activate background knowledge), Question (formulate questions in English that the chapter should answer), Read (read actively, noting unfamiliar vocabulary but not stopping to look up every word—mark them and return later), Recite (summarize each section in your own English words, not French—this builds academic English fluency), Review (revisit your summaries and questions periodically). A critical adaptation for French speakers: resist the temptation to translate mentally into French. Conceptual understanding in English develops faster when you process in English from the start, even if it feels slower initially. For lecture comprehension and note-taking, develop a dual-coding system: take notes in English (matching the lecture language) but use French for quick annotations when the lecturer moves too fast. After the lecture, review your notes and convert any French annotations into English. Use abbreviations and symbols to keep up with lecture pace: → (leads to), ≠ (different from), ∴ (therefore), e.g. (for example), cf. (compare). Record lectures when permitted and re-listen to sections you missed. For group projects, which are common at English-medium universities, communication skills are essential. Clarify expectations early: 'Let me make sure I understand—you are suggesting that we...' Negotiate workload fairly: 'I could take responsibility for the literature review section. Would someone else like to handle the data analysis?' Address conflicts diplomatically: 'I think we might have different understandings of the deadline. Can we clarify?' Do not let language barriers prevent you from contributing—your French educational background gives you analytical skills that are valued in international teams. For exam preparation, account for the extra time needed to process questions in English. Practice reading exam questions quickly and identifying exactly what is being asked. Create flashcards with English academic vocabulary from your courses. Form study groups with both native and non-native English speakers—explaining concepts to others is one of the most effective study strategies, and doing it in English builds your academic language. Use active recall rather than passive rereading: close your notes and try to explain concepts from memory. Space your studying over multiple sessions rather than cramming, as second-language processing benefits even more from distributed practice than first-language processing.",
            keyConcepts: [
              "SQ3R adapted for ESL: Survey, Question, Read, Recite (in English), Review",
              "Resist mental translation to French—process content in English from the start",
              "Lecture notes: English primary + French quick annotations, convert to English after class",
              "Group projects: clarify, negotiate, address conflicts diplomatically in English",
              "Exam prep: practice reading questions quickly, use active recall, space your study sessions",
              "Dual processing challenge: content + language simultaneously requires specific strategies"
            ]
          },
          processing: {
            activities: [
              "Apply the SQ3R method to a 10-page English academic text, writing your summaries entirely in English without translating from French",
              "Practice taking notes during a 15-minute recorded academic lecture using abbreviations and symbols, then review and expand the notes within 24 hours",
              "Role-play three group project scenarios: delegating tasks, requesting clarification, and diplomatically addressing a disagreement",
              "Create a study schedule for a hypothetical final exam period that incorporates active recall, spaced repetition, and English vocabulary review"
            ]
          },
          output: {
            tasks: [
              "Create a comprehensive 'ESL University Survival Guide' that includes your personalized reading strategy, note-taking system, group project communication templates, and exam preparation schedule, all designed to manage the dual cognitive load of content learning in a second language"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Apply effective reading strategies for English academic textbooks",
            "Take useful notes during English-language lectures",
            "Communicate effectively in group projects",
            "Prepare for exams when studying in a second language"
          ],
          input: {
            text: "Studying in English when French is your first language requires extra strategies. Here are the most important ones: Reading textbooks: Before reading a chapter, look at the headings, pictures, and summary first. This gives your brain a preview. Then read actively—underline key ideas and write short notes in the margins. Try to summarize each section in English (not French). If you find a word you do not know, try to guess its meaning from context before looking it up. Taking lecture notes: Write your notes in English to match the lecture. If the lecturer speaks too fast, use abbreviations and symbols (→ = leads to, ≠ = not equal, ∴ = therefore). It is okay to write a word in French if you cannot think of the English quickly—just make sure to translate it into English when you review your notes. Review your notes within 24 hours while the lecture is still fresh. Group projects: University often requires group work. Be clear about what you will do: 'I will write the introduction section.' Ask questions if you are unsure: 'Just to clarify, you mean that we should...' If there is a disagreement, stay calm: 'I think we see this differently. Can we talk about it?' Exam preparation: Start studying early—you need more time than native speakers because you are processing both content and language. Use flashcards for key vocabulary. Test yourself by closing your notes and trying to explain concepts out loud in English. Study with classmates and explain concepts to each other.",
            keyConcepts: [
              "Preview textbook chapters before reading (headings, pictures, summary)",
              "Take notes in English; use French only temporarily, then convert",
              "Review notes within 24 hours",
              "Group projects: be clear about tasks, ask questions, resolve disagreements calmly",
              "Start studying early—second-language processing takes more time",
              "Test yourself by explaining concepts from memory in English"
            ]
          },
          processing: {
            activities: [
              "Preview a textbook chapter using the survey strategy, then read and summarize two sections in English",
              "Practice note-taking during a 10-minute recorded lecture using abbreviations and symbols",
              "Write three sentences you could use in a group project: offering to do a task, asking for clarification, and resolving a disagreement"
            ]
          },
          output: {
            tasks: [
              "Create a personal study plan for one week that includes daily reading, note review, vocabulary flashcards, and one active recall session"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Use simple strategies to understand English textbooks and lectures",
            "Know how to work well in a group project",
            "Prepare for tests effectively when studying in English"
          ],
          input: {
            text: "Studying in English takes practice. Here are simple strategies to help: Reading: Before reading, look at the pictures and headings to see what the chapter is about. While reading, underline words you do not know. After reading, try to say in English what the section was about. Lectures: Write notes in English. Use short forms: → means 'leads to,' ≠ means 'different.' If you miss something, leave a blank space and fill it in later. Review your notes the same day. Group work: Tell your group what you can do: 'I can make the slides.' If you do not understand something, ask: 'Could you explain that again?' If there is a problem, talk about it calmly. Tests: Start studying early. Make vocabulary cards for important words. Test yourself by trying to explain ideas without looking at your notes.",
            keyConcepts: [
              "Before reading: look at pictures and headings",
              "Take notes in English with short forms",
              "Review notes the same day",
              "In groups: say what you can do, ask questions",
              "For tests: start early, make vocabulary cards, test yourself"
            ]
          },
          processing: {
            activities: [
              "Preview a short text using headings and pictures, then summarize it in 2-3 sentences",
              "Practice taking notes for 5 minutes using abbreviations and symbols"
            ]
          },
          output: {
            tasks: [
              "Write a simple study plan for one week: what you will read, when you will review notes, and how you will prepare for a test"
            ]
          }
        }
      },
      vocabulary: [
        { word: "metacognitive", definition: "Awareness and understanding of your own thinking and learning processes" },
        { word: "active recall", definition: "A study technique where you test yourself by retrieving information from memory rather than re-reading notes" },
        { word: "spaced repetition", definition: "Reviewing material at increasing intervals over time to strengthen long-term memory" },
        { word: "SQ3R", definition: "A reading strategy: Survey, Question, Read, Recite, Review" },
        { word: "dual coding", definition: "Using two different formats (such as words and images, or two languages) to process and remember information" },
        { word: "cognitive load", definition: "The total amount of mental effort being used in working memory, which increases when processing in a second language" }
      ],
      quiz: [
        {
          question: "What does SQ3R stand for?",
          options: [
            "Study, Quiz, Read, Recite, Review",
            "Survey, Question, Read, Recite, Review",
            "Scan, Query, Read, Repeat, Reflect",
            "Summary, Questions, Reading, Rehearsal, Results"
          ],
          correctIndex: 1
        },
        {
          question: "Why should French speakers avoid mentally translating textbooks into French?",
          options: [
            "Because French is harder than English",
            "Because processing directly in English builds academic English fluency faster",
            "Because translation is always inaccurate",
            "Because professors can tell"
          ],
          correctIndex: 1
        },
        {
          question: "When should you review your lecture notes?",
          options: [
            "The night before the exam",
            "Within 24 hours of the lecture",
            "One week later",
            "Only if you have a test"
          ],
          correctIndex: 1
        },
        {
          question: "What is 'active recall'?",
          options: [
            "Reading your notes many times",
            "Highlighting important text",
            "Testing yourself by retrieving information from memory",
            "Listening to recordings of lectures"
          ],
          correctIndex: 2
        },
        {
          question: "Why do ESL students need more study time than native speakers?",
          options: [
            "They are less intelligent",
            "They are processing both content and language simultaneously",
            "They have fewer textbooks",
            "They attend fewer classes"
          ],
          correctIndex: 1
        },
        {
          question: "What should you do if a group member's idea is unclear?",
          options: [
            "Ignore it and move on",
            "Ask for clarification: 'Just to clarify, you mean that we should...'",
            "Criticize the idea directly",
            "Do their work for them"
          ],
          correctIndex: 1
        },
        {
          question: "What is 'spaced repetition'?",
          options: [
            "Studying everything the night before",
            "Reviewing material at increasing intervals over time",
            "Reading the same page many times in one sitting",
            "Spacing your desk to be comfortable"
          ],
          correctIndex: 1
        },
        {
          question: "What is the best note-taking strategy when a lecturer speaks too fast?",
          options: [
            "Stop writing and just listen",
            "Use abbreviations and symbols, noting French words temporarily if needed",
            "Record the lecture and skip note-taking entirely",
            "Ask the lecturer to slow down every few minutes"
          ],
          correctIndex: 1
        },
        {
          question: "What is 'cognitive load'?",
          options: [
            "The weight of your textbooks",
            "The total amount of mental effort being used in working memory",
            "The number of courses you take",
            "How tired you are after class"
          ],
          correctIndex: 1
        },
        {
          question: "What is the most effective way to prepare for exams in a second language?",
          options: [
            "Translate everything into French and study in French",
            "Use active recall, spaced repetition, and practice explaining concepts in English",
            "Only read the textbook once the night before",
            "Memorize answers word-for-word"
          ],
          correctIndex: 1
        }
      ],
      biblicalIntegration: "2 Timothy 2:15 says, 'Do your best to present yourself to God as one approved, a worker who has no need to be ashamed, rightly handling the word of truth.' Diligent study—especially the extra effort required to learn in a second language—is an act of faithful stewardship. God calls us to develop our minds for His glory."
    },

    4: {
      title: "Mini Research Paper",
      lessonType: "PROJECT",
      duration: { ADVANCED: "90 min", STANDARD: "70 min", VOCATIONAL: "50 min" },
      pathways: {
        ADVANCED: {
          objectives: [
            "Write a complete 1000-word research paper following English academic conventions",
            "Apply proper APA or MLA citation format with at least five sources",
            "Demonstrate academic integrity through proper paraphrasing, quotation, and source attribution",
            "Self-edit for French L1 interference in grammar, structure, and citation style"
          ],
          input: {
            text: "This project is the culmination of your academic skills development: you will write a 1000-word research paper on a topic related to language learning, education, or cross-cultural communication. Your paper must follow standard English academic conventions and demonstrate everything you have learned in this unit. Requirements: The paper must include an introduction with a clear thesis statement and brief literature context, a body with at least three well-developed paragraphs using the PEEL structure, a conclusion that synthesizes your argument and discusses implications, and a references page with at least five properly formatted sources. Choose either APA or MLA citation style and apply it consistently throughout. Use at least two direct quotations (with proper formatting) and at least three paraphrased sources (with citations). Demonstrate academic integrity by clearly distinguishing your analysis from reported information. Before submitting, self-edit specifically for French L1 interference: check article usage (the/a/an), preposition accuracy (depend ON not depend OF, interested IN not interested TO), false cognates, and structural patterns (ensure in-text citations rather than footnotes, maintain a clear thesis throughout rather than a balanced presentation). Suggested topics: the role of motivation in second language acquisition, the impact of technology on language learning, challenges and strategies for multilingual education, cross-cultural communication in professional settings, or the effectiveness of immersion programs. Your paper will be evaluated on: thesis clarity and consistency, argument development and evidence use, proper citation format, academic integrity, language accuracy, and coherence and cohesion.",
            keyConcepts: [
              "1000-word paper with introduction (thesis + context), body (3+ PEEL paragraphs), conclusion (synthesis + implications), references",
              "APA or MLA format with at least 5 sources, applied consistently",
              "At least 2 direct quotations and 3 paraphrased sources",
              "Self-edit for French L1 interference: articles, prepositions, false cognates, structure",
              "Evaluation: thesis, argument, citation, integrity, accuracy, cohesion",
              "Topic related to language learning, education, or cross-cultural communication"
            ]
          },
          processing: {
            activities: [
              "Select a topic and create a detailed outline with thesis statement, topic sentences for each body paragraph, and key evidence to include",
              "Gather and evaluate at least five academic sources, noting key quotes and ideas to paraphrase",
              "Draft the complete paper following your outline, focusing on argument development and proper source integration",
              "Conduct a systematic self-edit checking for French L1 interference in articles, prepositions, citation style, and essay structure"
            ]
          },
          output: {
            tasks: [
              "Submit a complete 1000-word research paper with proper APA or MLA formatting, a reference list with at least five sources, and a self-edit checklist documenting the French L1 interference patterns you checked for and any corrections you made"
            ]
          }
        },
        STANDARD: {
          objectives: [
            "Write a 750-word research paper following basic English academic structure",
            "Use in-text citations and a reference list with at least three sources",
            "Demonstrate proper paraphrasing and source attribution",
            "Check for common French-speaker errors in grammar and citation style"
          ],
          input: {
            text: "For this project, you will write a 750-word research paper. Choose a topic related to language learning or education that interests you. Your paper should have: an introduction with a clear thesis statement, two or three body paragraphs each making a different point with evidence from your sources, a conclusion that summarizes your main ideas and adds a final thought, and a list of references at the end. Use APA or MLA format for your citations. Include at least one direct quotation (with quotation marks and a citation) and at least two paraphrased ideas (with citations). Remember: in-text citations, not footnotes. Before submitting, read through your paper and check for: article errors (the/a/an), preposition errors, and whether your thesis is clear and consistent throughout.",
            keyConcepts: [
              "750-word paper: introduction, body paragraphs, conclusion, references",
              "At least 3 sources with proper in-text citations",
              "Include direct quotation and paraphrased sources",
              "Check for articles, prepositions, and thesis consistency"
            ]
          },
          processing: {
            activities: [
              "Create an outline with your thesis statement and one topic sentence per body paragraph",
              "Find at least three sources and note one quote and two ideas to paraphrase",
              "Draft your paper and check for common French-speaker grammar errors"
            ]
          },
          output: {
            tasks: [
              "Submit a 750-word research paper with in-text citations, a reference list with at least three sources, and a brief self-edit note listing any French-speaker errors you found and corrected"
            ]
          }
        },
        VOCATIONAL: {
          objectives: [
            "Write a 500-word paper with an introduction, body, and conclusion",
            "Include at least two sources with simple citations",
            "Show you understand the difference between your ideas and information from sources"
          ],
          input: {
            text: "For this project, write a 500-word paper about a topic related to learning English or education. Your paper should have three parts: an introduction that explains what your paper is about and gives your opinion (thesis), a body with 2-3 paragraphs that explain your reasons with examples or information from sources, and a conclusion that restates your main idea and adds a final thought. You need at least two sources. When you use information from a source, write the author's name and year: (Smith, 2024). When you use exact words from a source, put them in quotation marks. At the end, list your sources with the author, title, and where you found them.",
            keyConcepts: [
              "500-word paper: introduction, body, conclusion",
              "At least 2 sources with (Author, Year) citations",
              "Use quotation marks for exact words from sources",
              "List sources at the end"
            ]
          },
          processing: {
            activities: [
              "Write your thesis statement and one sentence for each body paragraph",
              "Find two sources and write down one fact or idea from each"
            ]
          },
          output: {
            tasks: [
              "Submit a 500-word paper with an introduction, body, and conclusion, including at least two citations and a source list"
            ]
          }
        }
      },
      vocabulary: [
        { word: "research paper", definition: "An extended piece of academic writing that investigates a topic using evidence from multiple sources" },
        { word: "literature context", definition: "Background information about what other researchers have found on your topic" },
        { word: "self-edit", definition: "The process of reviewing and correcting your own writing before submission" },
        { word: "source integration", definition: "Weaving information from outside sources smoothly into your own writing through quotation, paraphrase, and summary" },
        { word: "false cognate", definition: "A word that looks similar in French and English but has a different meaning, like 'actually' (English: in fact) vs 'actuellement' (French: currently)" }
      ],
      quiz: [],
      biblicalIntegration: "Proverbs 2:3-5 says, 'If you call out for insight and cry aloud for understanding, and if you look for it as for silver and search for it as for hidden treasure, then you will understand the fear of the Lord and find the knowledge of God.' Research is a form of seeking knowledge with diligence and integrity, ultimately reflecting our pursuit of truth that honors the God of all wisdom."
    }
  }
};

async function main() {
  console.log("Starting enrichment for University-Ready English for French Speakers (B2 Mastery), Units 4-6...");
  console.log(`Course ID: ${COURSE_ID}`);

  for (const unitNumber of [4, 5, 6]) {
    const unitLessons = lessons[unitNumber];
    console.log(`\n--- Unit ${unitNumber} ---`);

    const unit = await prisma.unit.findFirst({
      where: { courseId: COURSE_ID, unitNumber },
    });

    if (!unit) {
      console.error(`Unit ${unitNumber} not found for course ${COURSE_ID}`);
      continue;
    }

    console.log(`Found unit: ${unit.title} (${unit.id})`);

    const dbLessons = await prisma.lesson.findMany({
      where: { unitId: unit.id },
      orderBy: { weekNumber: "asc" },
    });

    console.log(`Found ${dbLessons.length} lessons in unit ${unitNumber}`);

    for (const dbLesson of dbLessons) {
      const lessonData = unitLessons[dbLesson.weekNumber];
      if (!lessonData) {
        console.warn(`No enrichment data for unit ${unitNumber}, week ${dbLesson.weekNumber}`);
        continue;
      }

      console.log(`  Enriching W${dbLesson.weekNumber}: ${lessonData.title}`);

      // Transform to expected DB schema
      const pathways = (['ADVANCED', 'STANDARD', 'VOCATIONAL'] as const).map(pw => {
        const p = lessonData.pathways[pw];
        const mins = pw === 'ADVANCED' ? 90 : pw === 'STANDARD' ? 70 : 50;
        const suffix = pw === 'ADVANCED' ? 'Advanced Scholars' : pw === 'STANDARD' ? 'Standard Academic' : 'Vocational Pathway';
        return {
          pathway: pw,
          title: `${lessonData.title} — ${suffix}`,
          estimatedMinutes: mins,
          objectives: p.objectives,
          ipo: {
            input: [
              { type: 'text', heading: lessonData.title, body: p.input.text },
              ...(p.input.keyConcepts.length > 0 ? [{ type: 'text', heading: 'Key Concepts', body: p.input.keyConcepts.map((c: string) => `- ${c}`).join('\n') }] : []),
              { type: 'biblical-worldview', theme: 'Academic Excellence', reflection: lessonData.biblicalIntegration, applicationQuestion: 'How does this biblical principle apply to your English learning journey?' }
            ],
            processing: [
              { type: 'practice', prompt: p.processing.activities.join('\n\n'), skills: ['English proficiency'] }
            ],
            output: [
              { type: 'practice', prompt: p.output.tasks.join('\n\n'), skills: ['test preparation'] }
            ]
          }
        };
      });

      const vocabulary = lessonData.vocabulary.map((v: VocabWord) => ({
        term: v.word,
        definition: v.definition,
        example: `The word "${v.word}" is commonly used in academic and test contexts.`
      }));

      const quiz = lessonData.quiz.map((q: QuizQuestion) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctIndex,
        explanation: `The correct answer is "${q.options[q.correctIndex]}".`
      }));

      const existingContent = dbLesson.content as Record<string, unknown>;
      const updatedContent = { ...existingContent, pathways, vocabulary, quiz };

      await prisma.lesson.update({
        where: { id: dbLesson.id },
        data: { content: updatedContent as any },
      });

      console.log(`    ✓ Updated — quiz: ${quiz.length} questions, vocab: ${vocabulary.length} words`);
    }
  }

  console.log("\nEnrichment complete for Units 4-6.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
