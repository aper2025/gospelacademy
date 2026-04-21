/**
 * Enrichment Script: Academic English Bridge for French Speakers — Level 3 (B1→B2), Units 7-9
 * Course ID: cmo78odkj0052on5t8s37l40l
 *
 * Unit 7: Literature and Culture
 * Unit 8: Advanced Grammar and Style
 * Unit 9: Review and Assessment
 *
 * 12 lessons total (8 INSTRUCTION + 4 PROJECT)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DRY_RUN = process.argv.includes("--dry-run");
const COURSE_ID = "cmo78odkj0052on5t8s37l40l";

// ── Interfaces ──────────────────────────────────────────────────────────────

interface VocabItem {
  term: string;
  definition: string;
  example: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ContentBlock {
  type: "text" | "vocab" | "activity" | "reflection" | "quiz" | "rubric";
  content: string;
  items?: VocabItem[];
  questions?: QuizQuestion[];
}

interface PathwayContent {
  objectives: string[];
  duration: string;
  input: ContentBlock[];
  processing: ContentBlock[];
  output: ContentBlock[];
}

interface LessonContent {
  ADVANCED: PathwayContent;
  STANDARD: PathwayContent;
  VOCATIONAL: PathwayContent;
}

// ── Lesson Data ─────────────────────────────────────────────────────────────

function getLessonContent(unitNumber: number, weekNumber: number): LessonContent {
  // ── UNIT 7: Literature and Culture ──────────────────────────────────────
  if (unitNumber === 7 && weekNumber === 1) {
    // W1: "Reading Literature in English" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Analyze literary elements including plot structure, characterization, and thematic development in B2-level short stories",
          "Identify and interpret literary devices such as metaphor, simile, symbolism, irony, and foreshadowing",
          "Compare narrative techniques across Anglophone literary traditions",
          "Evaluate how literary devices contribute to meaning and reader experience"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "Reading literature in English requires a different set of skills than reading informational texts. While you may be familiar with French literary analysis through the tradition of explication de texte — a careful, structured unpacking of a passage — English literary analysis tends to emphasize thematic interpretation and the reader's engagement with the text. Both traditions value close attention to language, but the emphasis differs in important ways.\n\nEvery story is built on foundational elements. Plot refers to the sequence of events, typically following an arc: exposition introduces the setting and characters, rising action builds tension through conflict, the climax represents the turning point, falling action shows consequences, and the resolution brings closure. Character development reveals how individuals change through the story — a flat character remains the same, while a round character grows and transforms. Setting grounds the story in time and place, and often carries symbolic weight. Theme is the underlying message or central idea the author explores — not merely the topic, but the insight the story offers about human experience.\n\nBeyond these structural elements, skilled authors employ literary devices to deepen meaning. A metaphor states that one thing is another ('Her words were daggers'), while a simile uses 'like' or 'as' to draw comparison ('His voice was like thunder'). Symbolism uses concrete objects to represent abstract ideas — a broken mirror might symbolize fractured identity. Irony creates a gap between expectation and reality: verbal irony says one thing but means another, situational irony presents outcomes opposite to what was expected, and dramatic irony occurs when the reader knows something a character does not. Foreshadowing plants clues about future events, building suspense and coherence.\n\nAs you read B2-level short stories in English, pay attention to how these elements work together. The best literature does not merely tell a story — it reveals something true about the human condition. As Scripture reminds us, 'In the beginning was the Word, and the Word was with God, and the Word was God' (John 1:1). Language itself has profound power to illuminate truth, and great literature participates in that illumination."
          },
          {
            type: "vocab",
            content: "Key Literary Terms",
            items: [
              { term: "metaphor", definition: "a figure of speech that states one thing is another, without using 'like' or 'as'", example: "Time is a thief that steals our youth." },
              { term: "simile", definition: "a comparison using 'like' or 'as'", example: "The classroom was as quiet as a graveyard." },
              { term: "symbolism", definition: "the use of a concrete object to represent an abstract idea", example: "The dove in the story symbolized peace and hope." },
              { term: "irony", definition: "a contrast between expectation and reality, often used for emphasis or humor", example: "The fire station burned down — a perfect example of situational irony." },
              { term: "foreshadowing", definition: "hints or clues about events that will occur later in the story", example: "The dark clouds gathering in Chapter 1 foreshadowed the tragedy to come." },
              { term: "exposition", definition: "the introductory section of a story that establishes setting, characters, and background", example: "The exposition introduced the small fishing village and its reclusive protagonist." },
              { term: "climax", definition: "the turning point or moment of highest tension in a narrative", example: "The climax came when the protagonist finally confronted her father." },
              { term: "theme", definition: "the central insight or underlying message of a literary work", example: "A major theme of the novel is the conflict between duty and personal desire." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read the following short passage and identify at least three literary devices used. For each device, explain the effect it creates:\n\n'The old house watched them arrive, its windows like hollow eyes staring across the overgrown garden. Sarah felt a chill — not from the autumn wind, but from something deeper, something the house seemed to exhale. Her brother laughed. \"Home sweet home,\" he said, kicking open the rusted gate. But Sarah noticed the single raven perched on the chimney, and she knew that nothing sweet waited inside.'\n\nIdentify: (1) What literary devices are present? (2) What mood do they create? (3) What might the raven foreshadow? (4) How does the brother's comment function as irony?"
          },
          {
            type: "activity",
            content: "Compare the French literary tradition of explication de texte with English close reading. In explication de texte, you typically move systematically through a passage analyzing form, style, and meaning. English close reading often begins with a thematic question and uses textual evidence to build an argument. Write a paragraph explaining which approach you find more natural, and why. Use at least two literary terms from the vocabulary list in your response."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "John 1:1 tells us that 'the Word' was present at the very beginning of creation. How does this biblical truth shape your understanding of the power of language and storytelling? In what ways can literature — even secular literature — point to deeper truths about human nature and God's design? Write a reflective paragraph (100-150 words) connecting this verse to the literary concepts you have studied today."
          },
          {
            type: "quiz",
            content: "Reading Literature in English — Comprehension Check",
            questions: [
              { question: "What is the difference between a metaphor and a simile?", options: ["A metaphor uses 'like' or 'as'; a simile does not", "A metaphor states one thing IS another; a simile uses 'like' or 'as'", "A metaphor is always longer than a simile", "A simile is only used in poetry"], correctIndex: 1 },
              { question: "Which literary device involves hints about future events in a story?", options: ["Irony", "Symbolism", "Foreshadowing", "Exposition"], correctIndex: 2 },
              { question: "What is the climax of a story?", options: ["The introduction of the main characters", "The final paragraph of the narrative", "The turning point or moment of highest tension", "The author's personal opinion about the theme"], correctIndex: 2 },
              { question: "In the sentence 'The wind howled through the empty streets,' what literary device is used?", options: ["Simile", "Personification", "Irony", "Foreshadowing"], correctIndex: 1 },
              { question: "What does 'theme' refer to in literary analysis?", options: ["The setting of the story", "The main character's name", "The underlying message or central insight", "The sequence of events"], correctIndex: 2 },
              { question: "Which type of irony occurs when the reader knows something a character does not?", options: ["Verbal irony", "Situational irony", "Dramatic irony", "Cosmic irony"], correctIndex: 2 },
              { question: "In French literary tradition, what is the structured method of analyzing a passage called?", options: ["Close reading", "Explication de texte", "Literary criticism", "Thematic analysis"], correctIndex: 1 },
              { question: "A broken mirror in a story representing a fractured identity is an example of:", options: ["Metaphor", "Simile", "Symbolism", "Foreshadowing"], correctIndex: 2 },
              { question: "What is the purpose of exposition in a narrative?", options: ["To create suspense", "To reveal the theme", "To introduce setting, characters, and background", "To resolve the conflict"], correctIndex: 2 },
              { question: "Why is the statement 'The fire station burned down' considered ironic?", options: ["Because fire stations are usually large buildings", "Because the outcome is opposite to what one would expect", "Because it uses a metaphor", "Because it contains foreshadowing"], correctIndex: 1 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Identify key literary elements: plot, character, setting, and theme",
          "Recognize common literary devices including metaphor, simile, symbolism, and irony",
          "Read and understand B2-level short stories in English"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "Reading literature in English uses a different approach than reading for information. In French, you may have practiced explication de texte, where you carefully analyze a passage step by step. In English, literary analysis focuses more on themes and the reader's personal response to the text.\n\nEvery story has basic building blocks. Plot is the sequence of events — the beginning (exposition), the middle where tension builds (rising action), the most exciting moment (climax), and the ending (resolution). Characters are the people in the story. A flat character stays the same, while a round character changes and grows. Setting tells us where and when the story takes place. Theme is the deeper message — not just what happens, but what the story means.\n\nAuthors also use special techniques called literary devices. A metaphor says one thing IS another: 'Her words were daggers.' A simile compares using 'like' or 'as': 'He ran like the wind.' Symbolism uses objects to represent ideas — a dove might represent peace. Irony is when something is different from what you expect, like a fire station catching fire.\n\nAs John 1:1 reminds us, 'In the beginning was the Word.' Language has deep power to reveal truth, and reading literature helps us understand the human experience more fully."
          },
          {
            type: "vocab",
            content: "Key Literary Terms",
            items: [
              { term: "metaphor", definition: "saying one thing IS another without using 'like' or 'as'", example: "Time is a thief." },
              { term: "simile", definition: "a comparison using 'like' or 'as'", example: "She sang like a bird." },
              { term: "symbolism", definition: "using an object to represent a bigger idea", example: "The storm symbolized the character's inner conflict." },
              { term: "irony", definition: "when something is the opposite of what you expect", example: "The police station was robbed." },
              { term: "foreshadowing", definition: "clues about what will happen later in the story", example: "The dark sky hinted at the troubles ahead." },
              { term: "theme", definition: "the deeper message or lesson of a story", example: "The theme of the story is that honesty is more important than success." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read this short passage and answer the questions below:\n\n'The old house watched them arrive, its windows like hollow eyes. Sarah felt a chill. Her brother laughed. \"Home sweet home,\" he said. But Sarah noticed a raven on the chimney, and she knew nothing sweet waited inside.'\n\n1. Find one simile in the passage.\n2. What might the raven symbolize?\n3. Why is the brother's comment 'Home sweet home' ironic?\n4. What mood does the author create?"
          },
          {
            type: "activity",
            content: "Think of a story you have read in French. Identify its main theme, one literary device used, and explain whether the same story would work differently in English. Write 4-5 sentences."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "John 1:1 says 'In the beginning was the Word.' Why do you think stories and language are so important? How can reading literature help us understand truth? Write 3-4 sentences sharing your thoughts."
          },
          {
            type: "quiz",
            content: "Reading Literature in English — Comprehension Check",
            questions: [
              { question: "What is a simile?", options: ["Saying one thing IS another", "A comparison using 'like' or 'as'", "A hint about the future", "An object representing an idea"], correctIndex: 1 },
              { question: "Which literary device gives hints about future events?", options: ["Irony", "Symbolism", "Foreshadowing", "Metaphor"], correctIndex: 2 },
              { question: "What is the climax of a story?", options: ["The introduction", "The most exciting or important moment", "The ending", "The setting description"], correctIndex: 1 },
              { question: "'Her smile was sunshine' is an example of:", options: ["Simile", "Irony", "Metaphor", "Foreshadowing"], correctIndex: 2 },
              { question: "What does 'theme' mean in literature?", options: ["The place where the story happens", "The main character", "The deeper message of the story", "The title of the book"], correctIndex: 2 },
              { question: "Which is an example of irony?", options: ["A bird flying south in winter", "A dentist with terrible teeth", "A child playing in a park", "A teacher reading a book"], correctIndex: 1 },
              { question: "In French literary study, explication de texte is similar to:", options: ["Writing a story", "Close reading and analysis", "Memorizing vocabulary", "Translating a passage"], correctIndex: 1 },
              { question: "A dove representing peace is an example of:", options: ["Metaphor", "Simile", "Symbolism", "Irony"], correctIndex: 2 },
              { question: "What is exposition?", options: ["The most exciting part", "The introduction that sets up the story", "The ending", "A type of literary device"], correctIndex: 1 },
              { question: "What does a 'round' character do in a story?", options: ["Stays exactly the same", "Changes and grows", "Only appears once", "Is always the villain"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Identify the main parts of a story: beginning, middle, and end",
          "Recognize basic literary devices: metaphor, simile, and symbolism",
          "Understand the theme of a short story"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "When you read a story in English, you look for the main parts. Every story has a beginning (we meet the characters and learn where they are), a middle (problems happen and things get exciting), and an end (the problems get solved).\n\nAuthors use special tools to make their writing interesting. A metaphor says one thing IS another: 'Life is a journey.' A simile compares things using 'like' or 'as': 'She was as fast as a cheetah.' Symbolism is when an object represents something bigger — a red rose can mean love.\n\nThe theme is the big message of the story. It is not just what happens — it is what the story teaches us. For example, a story about a boy who keeps trying after failing might have the theme: 'Never give up.'\n\nThe Bible says, 'In the beginning was the Word' (John 1:1). Words and stories have great power. Reading stories in English helps you learn the language and understand new ideas."
          },
          {
            type: "vocab",
            content: "Key Literary Terms",
            items: [
              { term: "metaphor", definition: "saying something IS something else", example: "Life is a roller coaster." },
              { term: "simile", definition: "comparing with 'like' or 'as'", example: "He was as strong as an ox." },
              { term: "symbolism", definition: "an object that stands for a bigger idea", example: "A heart shape stands for love." },
              { term: "theme", definition: "the main message or lesson of a story", example: "The theme is: friends help each other." },
              { term: "character", definition: "a person in a story", example: "The main character is a young girl named Ana." },
              { term: "setting", definition: "where and when a story takes place", example: "The setting is a small village in winter." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read this short passage:\n\n'The old house had windows like hollow eyes. Sarah felt cold. Her brother said, \"Home sweet home.\" But Sarah saw a black bird on the roof and felt afraid.'\n\n1. Find the simile (comparison using 'like').\n2. What do you think the black bird means?\n3. Is the brother's comment happy or scary? Why?"
          },
          {
            type: "activity",
            content: "Think of your favorite story (in French or English). In 3 sentences, tell us: What is the story about? Who is the main character? What is the theme (the big message)?"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "The Bible says words are powerful. Why do you think reading stories can help us learn? Write 2-3 sentences."
          },
          {
            type: "quiz",
            content: "Reading Literature in English — Comprehension Check",
            questions: [
              { question: "What is a simile?", options: ["Saying something IS something else", "Comparing with 'like' or 'as'", "A hint about the future", "The main message"], correctIndex: 1 },
              { question: "'Life is a journey' is a:", options: ["Simile", "Metaphor", "Symbol", "Theme"], correctIndex: 1 },
              { question: "What is the theme of a story?", options: ["Where the story happens", "The main message or lesson", "The title", "The last sentence"], correctIndex: 1 },
              { question: "A red rose meaning love is an example of:", options: ["Metaphor", "Simile", "Symbolism", "Setting"], correctIndex: 2 },
              { question: "What is a character?", options: ["The place in a story", "A person in a story", "The ending", "A comparison"], correctIndex: 1 },
              { question: "What is the setting of a story?", options: ["The main lesson", "The most exciting part", "Where and when it happens", "The main person"], correctIndex: 2 },
              { question: "'She was as fast as a cheetah' is a:", options: ["Metaphor", "Simile", "Theme", "Character"], correctIndex: 1 },
              { question: "What happens in the middle of a story?", options: ["We meet the characters", "Problems happen and things get exciting", "Everything is solved", "The setting is described"], correctIndex: 1 },
              { question: "Why are stories important according to John 1:1?", options: ["They are fun to read", "Words have great power", "They help us sleep", "They are always true"], correctIndex: 1 },
              { question: "What does a 'flat' character do?", options: ["Changes a lot", "Stays the same throughout the story", "Disappears", "Only speaks once"], correctIndex: 1 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 7 && weekNumber === 2) {
    // W2: "Analyzing Texts and Themes" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Apply close reading strategies to identify explicit and implicit themes in literary texts",
          "Support analytical claims with precise textual evidence and quotations",
          "Use academic language for literary analysis: 'The author suggests that...', 'This passage implies...'",
          "Compare thematic development across multiple texts"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "Close reading is the foundation of literary analysis in English. Unlike the French explication de texte, which often moves linearly through a passage, English close reading typically begins with a question or thesis and gathers evidence from throughout the text to build an argument. Both approaches demand careful attention to language, but the organizational logic differs.\n\nWhen analyzing a text, begin by reading it at least twice. On the first reading, absorb the general meaning and emotional impact. On the second reading, annotate — mark striking phrases, recurring images, shifts in tone, and moments of tension or resolution. Ask yourself: What is the author really saying here? What lies beneath the surface?\n\nIdentifying themes requires distinguishing between topic and theme. A topic is a broad subject — 'love,' 'war,' 'identity.' A theme is a specific claim or insight about that topic — 'Love demands sacrifice,' 'War reveals both the worst and best of human nature,' 'Identity is shaped more by choices than by circumstances.' Strong literary analysis moves beyond naming a topic to articulating the nuanced position the text takes on that topic.\n\nSupporting your analysis with textual evidence is essential. In academic English, you introduce quotations with signal phrases: 'The author suggests that...' 'This passage implies...' 'The narrator's choice of words reveals...' 'Through the metaphor of X, the writer conveys...' Avoid simply dropping quotations into your writing without context. Instead, integrate them smoothly: 'When the protagonist admits that \"the silence was louder than any argument,\" the author suggests that what remains unsaid can be more powerful than spoken words.'\n\nProverbs 25:11 tells us that 'a word fitly spoken is like apples of gold in a setting of silver.' Precise, well-chosen evidence — like a fitly spoken word — transforms analysis from opinion into argument. Your goal is not merely to state what you think, but to demonstrate how the text supports that interpretation."
          },
          {
            type: "vocab",
            content: "Key Analysis Terms",
            items: [
              { term: "close reading", definition: "careful, detailed analysis of a text's language, structure, and meaning", example: "Through close reading, we discovered that the repeated image of water symbolized renewal." },
              { term: "textual evidence", definition: "specific words, phrases, or passages from a text used to support an interpretation", example: "She supported her claim with textual evidence from the third paragraph." },
              { term: "implicit", definition: "suggested or implied rather than directly stated", example: "The theme of loneliness is implicit in the protagonist's repeated isolation." },
              { term: "explicit", definition: "clearly and directly stated", example: "The moral of the fable is explicit: 'Slow and steady wins the race.'" },
              { term: "signal phrase", definition: "an introductory phrase that attributes a quotation or idea to its source", example: "The author suggests that freedom comes with responsibility." },
              { term: "thesis", definition: "the central argument or claim of an analytical essay", example: "Her thesis was that the novel critiques materialism through its portrayal of the upper class." },
              { term: "annotate", definition: "to add notes and marks to a text while reading to aid analysis", example: "Students annotated the poem, circling metaphors and underlining key phrases." },
              { term: "nuanced", definition: "showing subtle differences or distinctions in meaning", example: "His analysis was nuanced, acknowledging both the strengths and weaknesses of the argument." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read the following passage and practice close reading:\n\n'She stood at the edge of the bridge, watching the river carry everything downstream — leaves, branches, forgotten things. She had always believed the river would wait for her. But rivers never wait. They move forward, careless and relentless, like time itself.'\n\n1. What is the topic of this passage? What specific theme does the author develop about that topic?\n2. Identify two literary devices and explain their effect.\n3. Write a sentence using a signal phrase: 'The author suggests that...'\n4. What is implied but not explicitly stated about the character's emotional state?"
          },
          {
            type: "activity",
            content: "Practice integrating textual evidence. Using the passage above, write a short analytical paragraph (5-7 sentences) that:\n- States a clear theme\n- Includes at least two direct quotations from the passage\n- Uses signal phrases to introduce each quotation\n- Explains how the evidence supports your interpretation\n\nAvoid the common French-influenced error of writing overly long sentences. In English academic writing, aim for clarity and directness."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Proverbs 25:11 says 'A word fitly spoken is like apples of gold in a setting of silver.' How does this principle apply to choosing textual evidence in your writing? How does selecting the right quotation strengthen your argument? Write a reflective paragraph (100-150 words)."
          },
          {
            type: "quiz",
            content: "Analyzing Texts and Themes — Comprehension Check",
            questions: [
              { question: "What is the difference between a topic and a theme?", options: ["A topic is longer than a theme", "A topic is a broad subject; a theme is a specific insight about that subject", "A theme is always stated directly in the text", "A topic only applies to nonfiction"], correctIndex: 1 },
              { question: "What is textual evidence?", options: ["The author's biography", "Specific words or passages used to support an interpretation", "The title of the book", "A summary of the plot"], correctIndex: 1 },
              { question: "Which is an appropriate signal phrase for introducing a quotation?", options: ["In my opinion...", "The author suggests that...", "I think that...", "Obviously..."], correctIndex: 1 },
              { question: "What does 'implicit' mean?", options: ["Clearly stated", "Suggested but not directly stated", "Written in formal language", "Found in the title"], correctIndex: 1 },
              { question: "What should you do on a second reading of a text?", options: ["Read it faster", "Skip the difficult parts", "Annotate and mark key features", "Summarize each paragraph aloud"], correctIndex: 2 },
              { question: "In English close reading, you typically begin with:", options: ["A line-by-line translation", "A question or thesis to investigate", "The author's biography", "A list of vocabulary"], correctIndex: 1 },
              { question: "What is a thesis in literary analysis?", options: ["A question about the text", "The central argument or claim", "A summary of the plot", "The last sentence of an essay"], correctIndex: 1 },
              { question: "Which of the following correctly integrates a quotation?", options: ["\"The silence was louder than any argument.\"", "She said silence was louder.", "The narrator reveals that 'the silence was louder than any argument.'", "Silence. Loud. Argument."], correctIndex: 2 },
              { question: "What common French-influenced writing error should you avoid in English?", options: ["Using too many paragraphs", "Writing overly long, elaborate sentences", "Using quotation marks", "Starting with a thesis"], correctIndex: 1 },
              { question: "According to Proverbs 25:11, what is 'a word fitly spoken' compared to?", options: ["A sharp sword", "Apples of gold in a setting of silver", "A gentle breeze", "A bright star"], correctIndex: 1 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Use close reading to find the main themes in a text",
          "Support ideas with evidence from the text using quotations",
          "Use signal phrases like 'The author suggests that...' and 'This passage implies...'"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "When you analyze a text in English, you look carefully at the words the author uses and think about what they really mean. This is called close reading. It is similar to explication de texte in French, but English analysis usually starts with a question and looks for answers throughout the text.\n\nFirst, know the difference between a topic and a theme. A topic is a general subject like 'friendship' or 'courage.' A theme is a specific message about that topic — for example, 'True friendship requires sacrifice.' The theme is what the author wants you to understand.\n\nWhen you write about a text, you need to use textual evidence — actual words or sentences from the story — to support your ideas. Do not just state your opinion. Show the reader where you found your idea. Use signal phrases to introduce quotations:\n- 'The author suggests that...'\n- 'This passage implies...'\n- 'The narrator reveals that...'\n\nFor example: The narrator reveals that 'the silence was louder than any argument,' suggesting that unspoken feelings can be more powerful than words.\n\nProverbs 25:11 says, 'A word fitly spoken is like apples of gold in a setting of silver.' Choosing the right evidence makes your writing shine."
          },
          {
            type: "vocab",
            content: "Key Analysis Terms",
            items: [
              { term: "close reading", definition: "reading carefully to understand the deeper meaning of a text", example: "Close reading helped us find hidden themes in the poem." },
              { term: "textual evidence", definition: "words or sentences from the text used to prove your point", example: "Use textual evidence to support your answer." },
              { term: "implicit", definition: "suggested but not directly said", example: "The character's sadness was implicit in her actions." },
              { term: "signal phrase", definition: "words that introduce a quotation or idea", example: "The author suggests that change is necessary." },
              { term: "thesis", definition: "the main argument or point of your essay", example: "My thesis is that the story teaches us about forgiveness." },
              { term: "annotate", definition: "to write notes on a text while reading", example: "I annotated the passage by underlining key phrases." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read the passage and answer the questions:\n\n'She stood at the edge of the bridge, watching the river carry everything downstream. She had always believed the river would wait for her. But rivers never wait.'\n\n1. What is the topic of this passage? (one word)\n2. What is the theme? (Write a full sentence.)\n3. Write a sentence using a signal phrase: 'The author suggests that...'\n4. Find one example of a literary device."
          },
          {
            type: "activity",
            content: "Write a short paragraph (4-5 sentences) analyzing the passage above. Include:\n- A sentence stating the theme\n- At least one quotation from the passage\n- A signal phrase to introduce the quotation\n- An explanation of what the quotation means"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Proverbs 25:11 compares good words to 'apples of gold.' Why is it important to choose the right quotation when writing about a text? Write 3-4 sentences."
          },
          {
            type: "quiz",
            content: "Analyzing Texts and Themes — Comprehension Check",
            questions: [
              { question: "What is the difference between a topic and a theme?", options: ["They mean the same thing", "A topic is general; a theme is a specific message", "A theme is a character's name", "A topic is always one word"], correctIndex: 1 },
              { question: "What is textual evidence?", options: ["Your personal opinion", "Words from the text that support your idea", "The title of the book", "A picture in the story"], correctIndex: 1 },
              { question: "Which is a good signal phrase?", options: ["I think that...", "The author suggests that...", "Maybe...", "In conclusion..."], correctIndex: 1 },
              { question: "What does 'implicit' mean?", options: ["Clearly stated", "Suggested but not said directly", "Written in bold", "Found in the title"], correctIndex: 1 },
              { question: "What is close reading?", options: ["Reading fast", "Reading carefully to find deeper meaning", "Reading with your eyes closed", "Reading only the first page"], correctIndex: 1 },
              { question: "What is a thesis?", options: ["A question", "The main argument of your essay", "A vocabulary word", "The last paragraph"], correctIndex: 1 },
              { question: "How should you include a quotation in your writing?", options: ["Drop it in without explanation", "Use a signal phrase and explain it", "Translate it into French", "Put it at the end of the essay"], correctIndex: 1 },
              { question: "What does 'annotate' mean?", options: ["To rewrite the text", "To add notes while reading", "To read aloud", "To memorize"], correctIndex: 1 },
              { question: "In English analysis, you usually start with:", options: ["A summary", "A question or thesis", "A translation", "A list of characters"], correctIndex: 1 },
              { question: "What does Proverbs 25:11 compare good words to?", options: ["A bright star", "A gentle rain", "Apples of gold in silver", "A flowing river"], correctIndex: 2 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Find the main theme (message) of a short text",
          "Use words from the text to support your ideas",
          "Practice using 'The author suggests that...' to talk about a text"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "When you read a story or passage in English, you need to understand the big message. This is called the theme. The theme is not just what happens — it is the lesson or idea behind the story.\n\nFor example, if a story is about a boy who keeps trying after failing many times, the theme might be: 'Never give up.' The topic is 'trying hard,' but the theme is the full message.\n\nWhen you talk or write about a text, use words from the story to support your ideas. This is called textual evidence. Do not just say 'I think...' Instead, show where you found your idea. Use this pattern:\n- 'The author suggests that...'\n- 'This shows us that...'\n\nExample: The author suggests that 'rivers never wait,' meaning that time moves forward and we must act now.\n\nThe Bible says that good words are like 'apples of gold in a setting of silver' (Proverbs 25:11). When you choose the right words from a text, your ideas become stronger and clearer."
          },
          {
            type: "vocab",
            content: "Key Analysis Terms",
            items: [
              { term: "theme", definition: "the main message or lesson of a text", example: "The theme is: honesty is always the best choice." },
              { term: "evidence", definition: "words from the text that prove your point", example: "The evidence shows the character was afraid." },
              { term: "signal phrase", definition: "words you use before a quotation", example: "The author suggests that time is precious." },
              { term: "topic", definition: "the general subject of a text", example: "The topic of the story is friendship." },
              { term: "support", definition: "to prove or back up your idea with facts", example: "I can support my answer with a quote from the story." },
              { term: "quotation", definition: "the exact words from a text, shown in quotation marks", example: "The quotation 'rivers never wait' shows the theme." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read this short passage:\n\n'She watched the river carry everything away. She had believed the river would wait. But rivers never wait.'\n\n1. What is the topic? (Choose: time / water / animals)\n2. What is the theme? (Write one sentence.)\n3. Complete: 'The author suggests that _____.'"
          },
          {
            type: "activity",
            content: "Think of a story or movie you know. In 3 sentences, tell us: What is the topic? What is the theme (message)? Use the phrase 'The story suggests that...' in your answer."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "The Bible says good words are like 'apples of gold.' Why is it important to choose the right words when explaining your ideas? Write 2 sentences."
          },
          {
            type: "quiz",
            content: "Analyzing Texts and Themes — Comprehension Check",
            questions: [
              { question: "What is the theme of a text?", options: ["The title", "The main message or lesson", "The first sentence", "The author's name"], correctIndex: 1 },
              { question: "What is textual evidence?", options: ["Your opinion", "Words from the text that support your idea", "The cover of the book", "A drawing"], correctIndex: 1 },
              { question: "Which phrase should you use before a quotation?", options: ["I think...", "Maybe...", "The author suggests that...", "In my country..."], correctIndex: 2 },
              { question: "The topic of a text is:", options: ["The specific message", "The general subject", "The ending", "A character's name"], correctIndex: 1 },
              { question: "If a story is about a boy who keeps trying, the theme might be:", options: ["Boys are strong", "Never give up", "School is hard", "Rivers flow"], correctIndex: 1 },
              { question: "What does 'support' mean in writing?", options: ["To help someone walk", "To prove your idea with evidence", "To write quickly", "To read aloud"], correctIndex: 1 },
              { question: "A quotation uses:", options: ["Bold text", "Quotation marks", "Underlines", "Capital letters"], correctIndex: 1 },
              { question: "'The author suggests that rivers never wait' is a:", options: ["Question", "Signal phrase with evidence", "Vocabulary word", "Theme statement"], correctIndex: 1 },
              { question: "Why should you use evidence in your writing?", options: ["It makes your paper longer", "It proves your ideas are based on the text", "The teacher requires it", "It looks nice"], correctIndex: 1 },
              { question: "In Proverbs 25:11, good words are compared to:", options: ["A loud trumpet", "Apples of gold in silver", "A tall mountain", "A deep ocean"], correctIndex: 1 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 7 && weekNumber === 3) {
    // W3: "Cultural Perspectives in English Literature" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Analyze how cultural context shapes literary meaning and interpretation",
          "Compare Francophone and Anglophone literary traditions and their distinct approaches",
          "Evaluate the works and perspectives of diverse voices including Aimé Césaire and Chinua Achebe",
          "Articulate how cultural background influences both writers and readers"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "Literature does not exist in a vacuum. Every text is shaped by the cultural, historical, and linguistic context in which it was written. Understanding these contexts is essential for meaningful literary analysis — particularly when reading across cultural boundaries, as you do when moving between Francophone and Anglophone literary traditions.\n\nFrancophone literature has its own rich traditions and movements. The Négritude movement, founded by Aimé Césaire (Martinique), Léopold Sédar Senghor (Senegal), and Léon-Gontran Damas (French Guiana) in the 1930s, was a literary and intellectual revolution that celebrated Black identity and rejected French colonial assimilation. Césaire's long poem 'Cahier d'un retour au pays natal' (Notebook of a Return to the Native Land) is a masterpiece of this tradition — dense, lyrical, and politically charged. Reading Césaire in English translation, you gain the ideas but may lose the rhythmic intensity of his French.\n\nAnglophone African literature developed somewhat differently. Chinua Achebe's 'Things Fall Apart' (1958) deliberately used English — the colonizer's language — to tell an African story, arguing that the language could be reshaped to carry African experiences. Achebe famously challenged Joseph Conrad's 'Heart of Darkness' for its dehumanizing portrayal of Africans, arguing that literature carries responsibility toward the people it represents.\n\nThese two traditions — Francophone and Anglophone — emerged from similar colonial experiences but made different choices about language, form, and audience. Understanding these choices enriches your reading in both languages. When you encounter a text from a culture different from your own, ask: What historical context shaped this work? What values does it reflect or challenge? How might my own cultural lens affect my interpretation?\n\nScripture models this cross-cultural awareness. The Gospel writers — Matthew, Mark, Luke, and John — each wrote for different audiences with different cultural backgrounds, yet each conveyed the same truth about Christ. Cultural context matters, but truth transcends culture. As we read diverse voices, we seek to understand their perspectives while holding fast to the universal truths revealed in God's Word."
          },
          {
            type: "vocab",
            content: "Key Cultural and Literary Terms",
            items: [
              { term: "Négritude", definition: "a literary and intellectual movement celebrating Black identity and culture, founded by Francophone writers in the 1930s", example: "Césaire's poetry is a foundational text of the Négritude movement." },
              { term: "Francophone", definition: "relating to French-speaking peoples, countries, or literary traditions", example: "Francophone African literature includes works from Senegal, Côte d'Ivoire, and Haiti." },
              { term: "Anglophone", definition: "relating to English-speaking peoples, countries, or literary traditions", example: "Chinua Achebe is one of the most celebrated Anglophone African writers." },
              { term: "colonial", definition: "relating to the political and cultural control of one country by another", example: "Many postcolonial writers explore the lasting effects of colonial rule." },
              { term: "postcolonial", definition: "relating to the period after colonial rule, or the study of its cultural effects", example: "Postcolonial literary criticism examines how literature responds to colonial power." },
              { term: "cultural context", definition: "the social, historical, and cultural circumstances that shape a text's creation and meaning", example: "Understanding the cultural context of the novel helped us interpret its themes." },
              { term: "literary tradition", definition: "the body of literature and shared conventions within a culture or language", example: "The French literary tradition values precision and elegance of style." },
              { term: "cross-cultural", definition: "involving or bridging two or more different cultures", example: "Reading literature in both French and English gives you valuable cross-cultural perspective." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Compare the following two approaches to writing about identity:\n\n1. Aimé Césaire (Francophone/Négritude) wrote in French to reclaim Black identity within and against the colonizer's language, using dense, poetic imagery.\n2. Chinua Achebe (Anglophone) chose to write in English, reshaping it to carry African stories and challenge Western literary traditions from within.\n\nIn a paragraph of 6-8 sentences, analyze: What are the strengths and limitations of each approach? Why might a writer choose one strategy over the other? How does language choice itself become a form of literary and political expression?"
          },
          {
            type: "activity",
            content: "Consider a Haitian literary perspective. Haiti has a unique position — it was colonized by France, achieved independence in 1804, and has rich traditions in both Haitian Creole and French. How might a Haitian writer's cultural context differ from that of a Senegalese Francophone writer or a Nigerian Anglophone writer? Write a paragraph (5-7 sentences) exploring how Haiti's specific history shapes its literary voice."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "The four Gospels present the same truth about Jesus Christ, yet each was written for a different cultural audience — Matthew for Jews, Luke for Greeks, and so on. How does this biblical model of cross-cultural communication apply to the way we read and appreciate literature from different traditions? Write a reflective paragraph (100-150 words)."
          },
          {
            type: "quiz",
            content: "Cultural Perspectives in English Literature — Comprehension Check",
            questions: [
              { question: "What was the Négritude movement?", options: ["A French political party", "A literary movement celebrating Black identity", "An English poetry style", "A colonial government policy"], correctIndex: 1 },
              { question: "Who was one of the founders of the Négritude movement?", options: ["Chinua Achebe", "William Shakespeare", "Aimé Césaire", "Charles Dickens"], correctIndex: 2 },
              { question: "Why did Chinua Achebe choose to write in English?", options: ["He could not write in Igbo", "He wanted to tell African stories in the colonizer's language, reshaping it", "English was the only option available", "He lived in England"], correctIndex: 1 },
              { question: "What novel did Achebe write that is considered a masterpiece of African literature?", options: ["Heart of Darkness", "Things Fall Apart", "Cahier d'un retour au pays natal", "The Stranger"], correctIndex: 1 },
              { question: "What does 'postcolonial' refer to?", options: ["The period before colonization", "The study of ancient literature", "The period and effects after colonial rule", "Modern English grammar"], correctIndex: 2 },
              { question: "How do Francophone and Anglophone literary traditions differ?", options: ["They are identical", "They emerged from similar colonial contexts but made different choices about language and form", "Francophone literature is always in poetry; Anglophone is always prose", "They have no connection to each other"], correctIndex: 1 },
              { question: "Why is cultural context important when reading literature?", options: ["It helps you memorize the text", "It reveals how historical and social circumstances shape meaning", "It makes reading faster", "It is only important for nonfiction"], correctIndex: 1 },
              { question: "What is unique about Haiti's literary position?", options: ["Haiti has no literary tradition", "Haiti bridges Francophone traditions with its own unique colonial and independence history", "Haiti only produces oral literature", "Haiti writes exclusively in English"], correctIndex: 1 },
              { question: "How do the four Gospels model cross-cultural communication?", options: ["They all use the same language", "Each was written for a different cultural audience while conveying the same truth", "They were all written for the same audience", "They contradict each other"], correctIndex: 1 },
              { question: "What did Achebe criticize about Conrad's 'Heart of Darkness'?", options: ["Its grammar was poor", "It was too short", "It dehumanized African people", "It was written in French"], correctIndex: 2 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Understand how cultural background shapes a writer's perspective",
          "Compare Francophone and Anglophone literary traditions",
          "Learn about diverse voices in world literature including Aimé Césaire and Chinua Achebe"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "Every author writes from a specific cultural background, and that background shapes their stories. When you read literature from different cultures, understanding the context helps you understand the meaning.\n\nFrancophone literature (literature in French) includes a famous movement called Négritude. Writers like Aimé Césaire from Martinique celebrated Black identity and culture through poetry and prose. They wrote in French — the language of the colonizer — but they used it to express their own identity and fight against colonial ideas.\n\nAnglophone literature (literature in English) has its own traditions. Chinua Achebe, from Nigeria, wrote his famous novel 'Things Fall Apart' in English. He wanted to show the world that African stories deserved to be told. He also criticized Western writers who described Africa in negative or inaccurate ways.\n\nThese two traditions — Francophone and Anglophone — grew from similar experiences of colonialism but took different paths. As a French speaker learning English, you can bridge both worlds.\n\nThe Bible shows us that truth can be shared across cultures. The four Gospels were written for different audiences — Jewish, Greek, Roman — but they all told the same story of Jesus. Cultural context matters, but truth is universal."
          },
          {
            type: "vocab",
            content: "Key Cultural and Literary Terms",
            items: [
              { term: "Négritude", definition: "a literary movement celebrating Black identity, started by French-speaking writers", example: "Aimé Césaire was a leader of the Négritude movement." },
              { term: "Francophone", definition: "French-speaking", example: "Haiti is a Francophone country." },
              { term: "Anglophone", definition: "English-speaking", example: "Nigeria has a strong Anglophone literary tradition." },
              { term: "colonial", definition: "relating to one country controlling another", example: "Colonial rule affected the cultures of many African nations." },
              { term: "postcolonial", definition: "after colonial rule; studying its effects", example: "Postcolonial writers explore themes of identity and freedom." },
              { term: "cultural context", definition: "the historical and social background that shapes a text", example: "Knowing the cultural context helped me understand the poem better." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Compare the two writers:\n\n1. Aimé Césaire — wrote in French, celebrated Black identity through poetry\n2. Chinua Achebe — wrote in English, told African stories to a global audience\n\nAnswer these questions:\n- What do these two writers have in common?\n- How are their approaches different?\n- Why might a writer from a colonized country choose to write in the colonizer's language?"
          },
          {
            type: "activity",
            content: "Think about Haiti's unique position. Haiti was colonized by France, became independent in 1804, and has traditions in both Haitian Creole and French. Write 3-4 sentences explaining how Haiti's history makes its literature special and different from other Francophone countries."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "The Gospels were written for different cultural audiences but share the same message. How does this show that truth can be communicated across cultures? Write 3-4 sentences."
          },
          {
            type: "quiz",
            content: "Cultural Perspectives in English Literature — Comprehension Check",
            questions: [
              { question: "What is the Négritude movement?", options: ["An English poetry style", "A movement celebrating Black identity by Francophone writers", "A French grammar rule", "A type of novel"], correctIndex: 1 },
              { question: "Who wrote 'Things Fall Apart'?", options: ["Aimé Césaire", "Chinua Achebe", "William Shakespeare", "Victor Hugo"], correctIndex: 1 },
              { question: "What does 'Francophone' mean?", options: ["English-speaking", "French-speaking", "Spanish-speaking", "Portuguese-speaking"], correctIndex: 1 },
              { question: "Why did Achebe write in English?", options: ["He did not know Igbo", "He wanted to tell African stories to the world", "English was easier", "He lived in England"], correctIndex: 1 },
              { question: "What does 'cultural context' mean?", options: ["The grammar of a language", "The historical and social background of a text", "The price of a book", "The number of pages"], correctIndex: 1 },
              { question: "What is special about Haiti's literary position?", options: ["It has no literature", "It bridges French traditions with its unique independence history", "It only writes in English", "It follows British traditions"], correctIndex: 1 },
              { question: "What does 'postcolonial' mean?", options: ["Before colonization", "After colonial rule and studying its effects", "During colonization", "Against all literature"], correctIndex: 1 },
              { question: "How are the four Gospels an example of cross-cultural writing?", options: ["They use different languages", "Each was written for a different audience but shares the same truth", "They were all written in Hebrew", "They were written for the same audience"], correctIndex: 1 },
              { question: "What did Césaire celebrate in his writing?", options: ["French colonial rule", "Black identity and culture", "English grammar", "European traditions"], correctIndex: 1 },
              { question: "What can you gain by reading literature from different cultures?", options: ["Better spelling", "Understanding of diverse perspectives and experiences", "Faster reading speed", "Better handwriting"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Understand that writers from different cultures have different perspectives",
          "Learn about two important writers: Aimé Césaire and Chinua Achebe",
          "See how your French-speaking background connects to world literature"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "Every writer comes from a different place and culture, and this affects their stories. When you read stories from different countries, you learn new ways of seeing the world.\n\nAimé Césaire was a writer from Martinique (a French-speaking island in the Caribbean). He wrote beautiful poetry in French that celebrated being Black and proud. His movement was called Négritude.\n\nChinua Achebe was a writer from Nigeria (an English-speaking country in Africa). He wrote a famous book called 'Things Fall Apart' in English. He wanted the whole world to hear African stories.\n\nBoth writers experienced colonialism — when a powerful country controls another country. They both used writing to share their culture and fight for respect.\n\nAs a French speaker learning English, you can understand both of these worlds. This is a special gift. The Bible tells us that the good news about Jesus was shared with people from every culture — Jewish, Greek, Roman. Truth can cross all cultural boundaries."
          },
          {
            type: "vocab",
            content: "Key Cultural Terms",
            items: [
              { term: "culture", definition: "the beliefs, traditions, and way of life of a group of people", example: "Haitian culture includes music, food, and Creole language." },
              { term: "Francophone", definition: "French-speaking", example: "Haiti and Senegal are Francophone countries." },
              { term: "Anglophone", definition: "English-speaking", example: "Nigeria is an Anglophone country." },
              { term: "colonialism", definition: "when one country controls another country", example: "Colonialism changed many countries in Africa and the Caribbean." },
              { term: "perspective", definition: "a way of seeing things based on your experience", example: "Her perspective as a Haitian gave her a unique voice." },
              { term: "diverse", definition: "including many different types of people or things", example: "Our class has diverse backgrounds — we come from many countries." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Match the writer to the description:\n\n1. Aimé Césaire\n2. Chinua Achebe\n\nA. Wrote in English about African village life\nB. Wrote in French and celebrated Black identity\nC. From Nigeria\nD. From Martinique\n\nThen answer: What do both writers have in common?"
          },
          {
            type: "activity",
            content: "Think about your own culture. In 3 sentences, answer: Where does your family come from? What language(s) do you speak at home? How does your culture shape the way you see the world?"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "The Bible says that Jesus's message is for people of every culture. Why is it important to read stories from different countries? Write 2 sentences."
          },
          {
            type: "quiz",
            content: "Cultural Perspectives in English Literature — Comprehension Check",
            questions: [
              { question: "What does 'Francophone' mean?", options: ["English-speaking", "French-speaking", "Spanish-speaking", "African"], correctIndex: 1 },
              { question: "Who was Aimé Césaire?", options: ["A Nigerian novelist", "A French president", "A Martinican poet who celebrated Black identity", "An English teacher"], correctIndex: 2 },
              { question: "Who wrote 'Things Fall Apart'?", options: ["Aimé Césaire", "Chinua Achebe", "Victor Hugo", "Mark Twain"], correctIndex: 1 },
              { question: "What is colonialism?", options: ["A type of story", "When one country controls another", "A way of reading", "A language rule"], correctIndex: 1 },
              { question: "What does 'diverse' mean?", options: ["All the same", "Including many different types", "Very old", "Very new"], correctIndex: 1 },
              { question: "What is a perspective?", options: ["A type of book", "A way of seeing things", "A grammar rule", "A vocabulary word"], correctIndex: 1 },
              { question: "What did Césaire and Achebe both use to fight for respect?", options: ["Weapons", "Money", "Writing", "Technology"], correctIndex: 2 },
              { question: "What makes your French-speaking background special when learning English?", options: ["Nothing", "You can understand both Francophone and Anglophone worlds", "You can only read French books", "English is easier for you"], correctIndex: 1 },
              { question: "What is the Négritude movement?", options: ["A dance style", "A celebration of Black identity through writing", "A school subject", "A sport"], correctIndex: 1 },
              { question: "According to the Bible, who should hear the good news?", options: ["Only one culture", "People from every culture", "Only rich people", "Only French speakers"], correctIndex: 1 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 7 && weekNumber === 4) {
    // W4: "Literary Analysis Essay" (PROJECT)
    return {
      ADVANCED: {
        objectives: [
          "Write a 600+ word literary analysis essay with a clear thesis, textual evidence, and organized argument",
          "Demonstrate mastery of close reading, thematic analysis, and literary device identification",
          "Use proper academic English with signal phrases and integrated quotations",
          "Revise for clarity, coherence, and style appropriate to B2 academic writing"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "Your literary analysis essay is the culmination of the skills you have developed throughout this unit. A strong literary analysis does not simply summarize a text — it presents an original argument about the text's meaning, supported by carefully selected evidence.\n\nYour essay should follow this structure:\n\n1. Introduction (approximately 80-100 words): Open with a hook that engages the reader — a provocative question, a striking quotation, or a bold statement about the text. Introduce the author and title. End with a clear thesis statement that presents your central argument.\n\n2. Body Paragraphs (approximately 150-200 words each, 2-3 paragraphs): Each paragraph should focus on one main point that supports your thesis. Begin with a topic sentence, present textual evidence using signal phrases, analyze how the evidence supports your argument, and connect back to the thesis.\n\n3. Conclusion (approximately 80-100 words): Restate your thesis in new words. Reflect on the broader significance of your analysis. End with a final thought that leaves the reader thinking.\n\nRemember to avoid common French-influenced style errors: overly long sentences, excessive use of passive voice, and abstract introductions that delay the thesis. In English academic writing, state your argument early and clearly. As Proverbs 25:11 reminds us, 'A word fitly spoken is like apples of gold in a setting of silver.' Precision and clarity are the marks of excellent academic writing.\n\nYou may write about any short story, poem, or passage you have studied in this course, or choose a new B2-level text approved by your teacher."
          },
          {
            type: "rubric",
            content: "Literary Analysis Essay Rubric:\n\n**Thesis & Argument (25%):** Clear, specific thesis that presents an original analytical claim. Argument is logical and well-organized throughout.\n\n**Textual Evidence (25%):** At least 3-4 quotations from the text, smoothly integrated with signal phrases. Evidence directly supports the thesis.\n\n**Analysis & Interpretation (25%):** Each piece of evidence is followed by thoughtful analysis explaining how it supports the argument. Literary devices are identified and their effects explained.\n\n**Language & Style (25%):** Academic register maintained throughout. Sentences are clear and varied. Grammar is accurate at B2 level. Vocabulary is precise and appropriate. Avoids common French-influenced errors (run-on sentences, passive overuse, excessive length).\n\n**Length:** 600+ words."
          },
          {
            type: "vocab",
            content: "Essay Writing Terms",
            items: [
              { term: "hook", definition: "an opening sentence designed to capture the reader's attention", example: "She began her essay with a provocative hook: 'What if the hero is the real villain?'" },
              { term: "thesis statement", definition: "a single sentence that presents the central argument of an essay", example: "Her thesis stated that the novel critiques materialism through its portrayal of wealth." },
              { term: "topic sentence", definition: "the first sentence of a body paragraph, stating its main point", example: "Each body paragraph began with a clear topic sentence." },
              { term: "coherence", definition: "the logical flow and connection between ideas in writing", example: "Transition words improved the coherence of his essay." },
              { term: "revision", definition: "the process of reviewing and improving a piece of writing", example: "After revision, her essay was much clearer and more persuasive." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Before writing your full essay, complete this planning exercise:\n\n1. Choose your text (title and author).\n2. Write your thesis statement in one sentence.\n3. List 3 pieces of textual evidence (quotations) you plan to use.\n4. For each quotation, write 1-2 sentences of analysis explaining what it reveals.\n5. Write your hook — the opening sentence of your introduction.\n\nReview your plan: Does each piece of evidence clearly support your thesis? Is your thesis specific enough to be argued (not just a statement of fact)?"
          },
          {
            type: "activity",
            content: "Write your complete 600+ word literary analysis essay. Use the structure outlined in the lesson:\n- Introduction with hook, context, and thesis\n- 2-3 body paragraphs with topic sentences, evidence, and analysis\n- Conclusion with restated thesis and broader significance\n\nAfter writing, revise for:\n- Clarity: Can every sentence be understood on first reading?\n- Evidence: Is every claim supported by the text?\n- Style: Have you avoided overly long sentences and passive voice?\n- Grammar: Check verb tenses, articles, and prepositions"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Reflect on your growth as a writer throughout this unit. How has your ability to analyze literature in English improved? What aspects of academic writing do you still find challenging? What strategies have helped you most? Write a brief self-assessment (80-100 words)."
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      },
      STANDARD: {
        objectives: [
          "Write a literary analysis essay (400-500 words) with a thesis, evidence, and conclusion",
          "Use signal phrases and textual evidence to support your argument",
          "Follow the introduction-body-conclusion essay structure"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "For your project, you will write a literary analysis essay about a text you have studied in this unit. Your essay should have three main parts:\n\n1. Introduction: Introduce the text (title and author). Write a thesis statement — one sentence that gives your main argument about the text's meaning.\n\n2. Body (2 paragraphs): Each paragraph should make one point that supports your thesis. Include a quotation from the text and explain what it means.\n\n3. Conclusion: Restate your thesis in different words. Share a final thought about why the text matters.\n\nRemember: Use signal phrases ('The author suggests that...'), keep your sentences clear and not too long, and always explain your quotations — do not just drop them in.\n\nAs Proverbs 25:11 says, 'A word fitly spoken is like apples of gold.' Choose your words and evidence carefully to make your essay strong."
          },
          {
            type: "rubric",
            content: "Literary Analysis Essay Rubric:\n\n**Thesis (25%):** Clear thesis that states your argument about the text.\n\n**Evidence (25%):** At least 2 quotations from the text, introduced with signal phrases.\n\n**Analysis (25%):** Each quotation is explained — you tell the reader what it means and why it matters.\n\n**Language (25%):** Clear, academic English. Correct grammar. Sentences are not too long.\n\n**Length:** 400-500 words."
          },
          {
            type: "vocab",
            content: "Essay Writing Terms",
            items: [
              { term: "thesis statement", definition: "one sentence that tells the reader your main argument", example: "My thesis is that the story shows how fear can control people." },
              { term: "topic sentence", definition: "the first sentence of a paragraph that tells the main point", example: "My topic sentence introduces the idea of the character's loneliness." },
              { term: "conclusion", definition: "the final paragraph that restates your argument and shares a final thought", example: "In my conclusion, I explained why the theme is still important today." },
              { term: "revision", definition: "reading and improving your writing", example: "After revision, my essay was much clearer." },
              { term: "hook", definition: "an interesting first sentence that grabs the reader's attention", example: "I started with a question as my hook." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Plan your essay before writing:\n\n1. What text will you write about?\n2. Write your thesis statement (one sentence).\n3. Choose 2 quotations from the text.\n4. For each quotation, write one sentence explaining what it means.\n5. Write your hook (opening sentence)."
          },
          {
            type: "activity",
            content: "Write your complete 400-500 word essay following the structure: introduction, two body paragraphs, conclusion. After writing, check:\n- Does my thesis clearly state my argument?\n- Did I use signal phrases for my quotations?\n- Did I explain each quotation?\n- Are my sentences clear and not too long?"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "What was the hardest part of writing this essay? What would you do differently next time? Write 3-4 sentences."
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Write a short literary analysis (200-300 words) about a text you have read",
          "Include a main idea, a quotation from the text, and an explanation",
          "Follow a simple structure: introduction, body, conclusion"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "For your project, you will write a short essay about a story or passage you have read. Your essay has three parts:\n\n1. Introduction (2-3 sentences): Tell the reader what text you are writing about. Say your main idea — what do you think the text means?\n\n2. Body (4-6 sentences): Give one or two examples from the text. Use the exact words from the story (in quotation marks). Explain what they mean.\n\n3. Conclusion (2-3 sentences): Say your main idea again in different words. Share one final thought.\n\nRemember to use: 'The author suggests that...' when you talk about the text. Keep your sentences short and clear. The Bible says good words are like 'apples of gold' (Proverbs 25:11) — choose your words carefully."
          },
          {
            type: "rubric",
            content: "Literary Analysis Rubric:\n\n**Main Idea (30%):** You clearly state what you think the text means.\n\n**Evidence (30%):** You include at least 1 quotation from the text and explain it.\n\n**Structure (20%):** Your essay has an introduction, body, and conclusion.\n\n**Language (20%):** Your English is clear. Sentences are short and correct.\n\n**Length:** 200-300 words."
          },
          {
            type: "vocab",
            content: "Essay Writing Terms",
            items: [
              { term: "main idea", definition: "the most important point of your essay", example: "My main idea is that the story teaches us about kindness." },
              { term: "quotation", definition: "exact words from the text in quotation marks", example: "I used the quotation 'rivers never wait' in my essay." },
              { term: "introduction", definition: "the first part of your essay that tells the reader what you will write about", example: "In my introduction, I named the story and my main idea." },
              { term: "conclusion", definition: "the last part where you repeat your idea and share a final thought", example: "My conclusion said the story's message is still important." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Plan your essay:\n1. What text will you write about?\n2. What is your main idea? (one sentence)\n3. Choose 1 quotation from the text.\n4. What does this quotation mean? (one sentence)"
          },
          {
            type: "activity",
            content: "Write your 200-300 word essay. Use this checklist:\n- Did I name the text and author?\n- Did I state my main idea?\n- Did I include a quotation?\n- Did I explain what it means?\n- Did I write a short conclusion?"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Was it easier or harder to write about a text in English compared to French? Why? Write 2 sentences."
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      }
    };
  }

  // ── UNIT 8: Advanced Grammar and Style ──────────────────────────────────

  if (unitNumber === 8 && weekNumber === 1) {
    // W1: "Complex Sentence Structures" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Construct compound-complex sentences using subordination and coordination",
          "Use participial phrases correctly to add detail and variety",
          "Identify and correct run-on sentences and sentence fragments",
          "Understand differences between French and English sentence length preferences"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "As your English moves toward B2 proficiency, your sentences must become more sophisticated. This means mastering compound-complex structures — sentences that combine independent and dependent clauses — and understanding how English sentence construction differs from French.\n\nA simple sentence has one independent clause: 'She studied hard.' A compound sentence joins two independent clauses with a coordinating conjunction (for, and, nor, but, or, yet, so — remembered as FANBOYS): 'She studied hard, and she passed the exam.' A complex sentence has one independent clause and at least one dependent clause: 'Because she studied hard, she passed the exam.' A compound-complex sentence combines both: 'Because she studied hard, she passed the exam, and her parents were proud.'\n\nSubordination connects a less important idea to a more important one using subordinating conjunctions: because, although, when, while, if, since, unless, after, before. Coordination connects ideas of equal importance using FANBOYS. Knowing when to subordinate and when to coordinate is key to clear, mature writing.\n\nParticipial phrases add elegance and variety. A present participle (-ing) or past participle (-ed) can begin a phrase that modifies a noun: 'Walking through the park, she noticed the flowers' (present participle). 'Exhausted by the journey, the travelers rested' (past participle). Be careful with dangling modifiers — the subject of the participial phrase must match the subject of the main clause. INCORRECT: 'Walking through the park, the flowers were beautiful' (the flowers were not walking).\n\nA critical difference between French and English: French often tolerates longer, more elaborate sentences with multiple embedded clauses. English academic writing generally prefers shorter, clearer sentences. A French writer might compose a single sentence of 40-50 words that flows naturally in French but feels unwieldy in English. The rule in English: if a sentence is getting long, consider breaking it into two.\n\nRun-on sentences occur when two independent clauses are joined without proper punctuation: 'She studied hard she passed the exam.' This is incorrect. Fix it with a period, semicolon, or conjunction. Fragments are incomplete sentences missing a subject or verb: 'Because she studied hard.' This is a dependent clause that cannot stand alone.\n\nAs Proverbs 25:11 reminds us, 'A word fitly spoken is like apples of gold in a setting of silver.' Well-constructed sentences are the golden apples of academic writing — beautiful, precise, and perfectly placed."
          },
          {
            type: "vocab",
            content: "Key Grammar Terms",
            items: [
              { term: "compound-complex sentence", definition: "a sentence with at least two independent clauses and one dependent clause", example: "Although it rained, we went outside, and we enjoyed the fresh air." },
              { term: "subordination", definition: "connecting a less important idea to a main idea using conjunctions like because, although, when", example: "Because the library was closed, she studied at home." },
              { term: "coordination", definition: "connecting ideas of equal importance using conjunctions like and, but, or", example: "He read the book, and she wrote the report." },
              { term: "participial phrase", definition: "a phrase beginning with a present or past participle that modifies a noun", example: "Walking through the park, she noticed the flowers." },
              { term: "run-on sentence", definition: "an error where two independent clauses are joined without proper punctuation or conjunction", example: "INCORRECT: She studied hard she passed the exam." },
              { term: "fragment", definition: "an incomplete sentence missing a subject, verb, or complete thought", example: "INCORRECT: Because she studied hard. (no main clause)" },
              { term: "dangling modifier", definition: "a modifier that does not clearly refer to the correct subject", example: "INCORRECT: Walking to school, the rain started. (the rain was not walking)" },
              { term: "subordinating conjunction", definition: "a word that introduces a dependent clause: because, although, when, while, if", example: "Although he was tired, he finished the assignment." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Identify and correct the errors in each sentence:\n\n1. She was tired she went to bed early. (run-on)\n2. Because the exam was difficult. (fragment)\n3. Running down the street, the bus left without him. (dangling modifier)\n4. He studied all night and he passed the test but he was exhausted and he slept all day. (over-coordination)\n5. Although he worked hard and because his teacher encouraged him, he improved his grades, and he was happy, but he knew there was more to learn. (overly long — French-influenced)\n\nFor each, explain the error and write the corrected version."
          },
          {
            type: "activity",
            content: "Combine the following simple sentences into compound, complex, or compound-complex sentences. Use a variety of techniques (subordination, coordination, participial phrases):\n\n1. The students were nervous. They had studied well. They passed the exam.\n2. The rain was heavy. She walked to school. She arrived wet.\n3. He opened the book. He found a letter inside. It was from his grandmother.\n4. The concert was cancelled. The weather was bad. Everyone went home disappointed.\n\nAim for variety — do not use the same structure for every combination."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "French often uses longer, more flowing sentences than English. How have you noticed this difference in your own writing? What strategies help you write clearer, more direct sentences in English without losing sophistication? Write a reflective paragraph (100-150 words)."
          },
          {
            type: "quiz",
            content: "Complex Sentence Structures — Comprehension Check",
            questions: [
              { question: "What is a compound-complex sentence?", options: ["A sentence with one clause", "A sentence with two independent clauses and at least one dependent clause", "A sentence with no conjunctions", "A very short sentence"], correctIndex: 1 },
              { question: "Which of the following is a subordinating conjunction?", options: ["And", "But", "Although", "So"], correctIndex: 2 },
              { question: "'Walking through the park, she noticed the flowers' contains a:", options: ["Run-on sentence", "Fragment", "Participial phrase", "Dangling modifier"], correctIndex: 2 },
              { question: "What is a run-on sentence?", options: ["A very long sentence", "Two independent clauses joined without proper punctuation", "A sentence with too many adjectives", "A sentence that starts with 'and'"], correctIndex: 1 },
              { question: "'Because she studied hard.' is a:", options: ["Complete sentence", "Fragment", "Run-on", "Compound sentence"], correctIndex: 1 },
              { question: "FANBOYS stands for:", options: ["Five types of verbs", "For, And, Nor, But, Or, Yet, So", "Fragment And Noun Before Object Yet Subject", "French And Noun British Or Yiddish Spanish"], correctIndex: 1 },
              { question: "What is a dangling modifier?", options: ["A modifier placed at the end of a sentence", "A modifier that does not clearly refer to the correct subject", "A modifier that uses too many words", "A modifier in passive voice"], correctIndex: 1 },
              { question: "How does English sentence preference differ from French?", options: ["English prefers longer sentences", "English prefers shorter, clearer sentences", "There is no difference", "English uses more passive voice"], correctIndex: 1 },
              { question: "Which sentence correctly uses a participial phrase?", options: ["Exhausted by the journey, the travelers rested.", "Exhausted by the journey, the hotel was nearby.", "The journey was exhausting, traveled far.", "Exhausted, the journey continued."], correctIndex: 0 },
              { question: "What is subordination?", options: ["Connecting equal ideas", "Connecting a less important idea to a main idea", "Removing unnecessary words", "Adding adjectives to a sentence"], correctIndex: 1 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Build compound and complex sentences using conjunctions",
          "Use participial phrases to add detail to sentences",
          "Identify and fix run-on sentences and fragments",
          "Understand that English prefers shorter sentences than French"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "Now that your English is getting stronger, you need to write more interesting sentences. Let us look at different sentence types.\n\nA simple sentence has one complete idea: 'She studied hard.' A compound sentence joins two ideas with and, but, or, so: 'She studied hard, and she passed.' A complex sentence adds a less important idea with words like because, although, when: 'Because she studied hard, she passed.' A compound-complex sentence combines both: 'Because she studied hard, she passed, and her parents were proud.'\n\nParticipial phrases start with an -ing or -ed word and add detail: 'Walking through the park, she noticed the flowers.' Be careful — the person doing the action must be the subject. WRONG: 'Walking through the park, the flowers were beautiful.' (The flowers were not walking!)\n\nImportant for French speakers: French sentences are often longer and more complex. In English, shorter and clearer is usually better. If your sentence is getting very long, break it into two sentences.\n\nCommon errors to avoid:\n- Run-on: 'She studied she passed.' (Missing a conjunction or period)\n- Fragment: 'Because she studied hard.' (Not a complete thought)\n\nAs the Bible says, 'A word fitly spoken is like apples of gold' (Proverbs 25:11). Clear, well-built sentences are beautiful."
          },
          {
            type: "vocab",
            content: "Key Grammar Terms",
            items: [
              { term: "compound sentence", definition: "two complete ideas joined with and, but, or, so", example: "I was tired, but I finished my homework." },
              { term: "complex sentence", definition: "a main idea with a less important idea added by because, although, when", example: "Although it rained, we went outside." },
              { term: "participial phrase", definition: "a phrase starting with -ing or -ed that adds detail", example: "Exhausted by the long day, she fell asleep." },
              { term: "run-on sentence", definition: "two ideas joined without proper punctuation", example: "WRONG: She ran fast she won the race." },
              { term: "fragment", definition: "an incomplete sentence", example: "WRONG: Because she tried. (needs more)" },
              { term: "conjunction", definition: "a word that connects ideas: and, but, because, although", example: "I wanted to go, but it was raining." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Fix these sentences:\n\n1. She was tired she went to bed. (run-on — add a conjunction or period)\n2. Because the test was hard. (fragment — add a main clause)\n3. Running to school, the bell rang. (dangling modifier — fix the subject)\n4. He studied and he ate and he watched TV and he went to bed. (too many 'ands' — rewrite)\n\nWrite the corrected version of each."
          },
          {
            type: "activity",
            content: "Combine these simple sentences into better sentences. Use compound, complex, or participial phrases:\n\n1. The dog was hungry. It ate quickly.\n2. She finished her homework. She went to the park. It was sunny.\n3. He opened the door. He saw his friend. His friend was smiling."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Do you find it hard to write shorter sentences in English after writing in French? What helps you keep your English sentences clear? Write 3-4 sentences."
          },
          {
            type: "quiz",
            content: "Complex Sentence Structures — Comprehension Check",
            questions: [
              { question: "What is a compound sentence?", options: ["One complete idea", "Two ideas joined with and, but, or, so", "An incomplete idea", "A very long sentence"], correctIndex: 1 },
              { question: "Which word starts a complex sentence?", options: ["And", "But", "Because", "So"], correctIndex: 2 },
              { question: "'Walking through the park, she saw a bird' has a:", options: ["Run-on", "Fragment", "Participial phrase", "Dangling modifier"], correctIndex: 2 },
              { question: "What is a run-on sentence?", options: ["A sentence that is too short", "Two ideas without proper punctuation between them", "A sentence with too many adjectives", "A question"], correctIndex: 1 },
              { question: "'Because the store was closed.' is a:", options: ["Complete sentence", "Fragment", "Run-on", "Compound sentence"], correctIndex: 1 },
              { question: "How are French and English sentences different?", options: ["French prefers shorter sentences", "English usually prefers shorter, clearer sentences", "They are the same", "English prefers longer sentences"], correctIndex: 1 },
              { question: "What is a conjunction?", options: ["A type of noun", "A word that connects ideas", "A verb tense", "A punctuation mark"], correctIndex: 1 },
              { question: "Which sentence is correct?", options: ["She ran fast she won.", "She ran fast, and she won.", "She ran fast and.", "Fast she ran won."], correctIndex: 1 },
              { question: "'Exhausted by the journey, the travelers rested' — who was exhausted?", options: ["The journey", "The travelers", "The road", "Nobody"], correctIndex: 1 },
              { question: "What should you do if your English sentence is getting too long?", options: ["Add more adjectives", "Break it into two shorter sentences", "Remove all conjunctions", "Translate it from French"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Join sentences using and, but, because, and although",
          "Use -ing phrases to add detail to sentences",
          "Fix sentences that are too long or incomplete"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "You already know how to write simple sentences. Now let us make them more interesting by joining them together.\n\nUse these connecting words:\n- AND: adds another idea ('She read, and he wrote.')\n- BUT: shows a contrast ('She was tired, but she kept working.')\n- BECAUSE: gives a reason ('She passed because she studied.')\n- ALTHOUGH: shows surprise ('Although it rained, they played outside.')\n\nYou can also start sentences with -ing words: 'Walking to school, she saw a cat.' This means: She was walking to school, and she saw a cat.\n\nCommon mistakes:\n- Too long: 'She went to the store and she bought bread and she came home and she made dinner.' Break it into shorter sentences.\n- Not complete: 'Because I was tired.' This needs more: 'Because I was tired, I went to bed.'\n\nRemember: English sentences are usually shorter than French sentences. Keep it clear and simple."
          },
          {
            type: "vocab",
            content: "Key Grammar Terms",
            items: [
              { term: "and", definition: "connects two similar ideas", example: "She read the book, and she enjoyed it." },
              { term: "but", definition: "shows a difference or contrast", example: "It was cold, but they went swimming." },
              { term: "because", definition: "gives a reason", example: "He was late because the bus broke down." },
              { term: "although", definition: "shows something surprising", example: "Although she was young, she was very wise." },
              { term: "run-on", definition: "two sentences stuck together without a connecting word", example: "WRONG: She ran she won." },
              { term: "fragment", definition: "a sentence that is not complete", example: "WRONG: Because I was tired. (needs more)" }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Fix these sentences:\n1. She was hungry she ate lunch. (Add a connecting word)\n2. Because it was raining. (Add more to finish the sentence)\n3. He went to school and he studied math and he played football and he came home. (Break into shorter sentences)\n\nWrite the corrected version."
          },
          {
            type: "activity",
            content: "Join these sentences using and, but, because, or although:\n1. She studied hard. She passed the test.\n2. It was raining. They went outside.\n3. He was tired. He finished his homework."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which connecting word (and, but, because, although) do you use most often? Why? Write 2 sentences."
          },
          {
            type: "quiz",
            content: "Complex Sentence Structures — Comprehension Check",
            questions: [
              { question: "Which word adds a reason to a sentence?", options: ["And", "But", "Because", "Or"], correctIndex: 2 },
              { question: "'She was tired, but she kept going' — 'but' shows:", options: ["A reason", "A contrast", "An addition", "A question"], correctIndex: 1 },
              { question: "'Because I was tired.' is:", options: ["A complete sentence", "An incomplete sentence (fragment)", "A run-on", "A question"], correctIndex: 1 },
              { question: "What is a run-on sentence?", options: ["A short sentence", "Two sentences stuck together without a connecting word", "A sentence with a question mark", "A sentence with 'and'"], correctIndex: 1 },
              { question: "How do you fix: 'She ate she left'?", options: ["Remove 'she'", "Add 'and' or a period", "Add 'the'", "Make it longer"], correctIndex: 1 },
              { question: "'Walking to school, she saw a dog.' — who was walking?", options: ["The dog", "She was", "The school", "Nobody"], correctIndex: 1 },
              { question: "English sentences are usually:", options: ["Longer than French", "Shorter and clearer than French", "The same as French", "Always very short"], correctIndex: 1 },
              { question: "Which word shows something surprising?", options: ["And", "Because", "Although", "So"], correctIndex: 2 },
              { question: "What should you do if your sentence has too many 'ands'?", options: ["Add more 'ands'", "Break it into shorter sentences", "Remove all words", "Start over in French"], correctIndex: 1 },
              { question: "'She read, and he wrote' is joined by:", options: ["But", "Because", "And", "Although"], correctIndex: 2 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 8 && weekNumber === 2) {
    // W2: "Academic Vocabulary and Collocations" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Master high-frequency academic vocabulary from the Academic Word List",
          "Use English collocations correctly, avoiding French-influenced errors (faire/make-do confusion)",
          "Build word families to expand vocabulary systematically (analyze/analysis/analytical)",
          "Apply academic vocabulary accurately in B2-level writing"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "At the B2 level, your vocabulary must extend beyond everyday words into the academic register. The Academic Word List (AWL), developed by Averil Coxhead, contains 570 word families that appear frequently across academic disciplines. Mastering these words is essential for reading textbooks, writing essays, and participating in academic discussions in English.\n\nHowever, knowing individual words is not enough. You must also learn collocations — words that naturally go together in English. Collocations are one of the biggest challenges for French speakers because direct translation often fails. Consider these common errors:\n\n- 'make a decision' (NOT 'do a decision' — French: prendre une décision)\n- 'take notes' (NOT 'make notes' or 'take notes' — this one works, but 'make notes' is less common in American English)\n- 'pay attention' (NOT 'give attention' — French: faire attention, but NOT 'do attention')\n- 'do research' (NOT 'make research' — French: faire de la recherche, but English uses 'do')\n- 'make a mistake' (NOT 'do a mistake' — English uses 'make' for errors)\n- 'do homework' (NOT 'make homework')\n- 'make progress' (NOT 'do progress')\n- 'take an exam' (NOT 'pass an exam' — in French, 'passer un examen' means to take it, not to succeed)\n\nThe make/do distinction is particularly tricky. General pattern: 'do' is for tasks and work (do homework, do research, do the dishes, do your best). 'Make' is for creating or producing something (make a decision, make a mistake, make progress, make an effort, make a plan).\n\nWord families are another powerful tool. When you learn one academic word, learn its related forms:\n- analyze (verb) → analysis (noun) → analytical (adjective) → analytically (adverb)\n- create (verb) → creation (noun) → creative (adjective) → creatively (adverb)\n- signify (verb) → significance (noun) → significant (adjective) → significantly (adverb)\n- interpret (verb) → interpretation (noun) → interpretive (adjective)\n\nJohn 1:1 tells us, 'In the beginning was the Word.' Words are the building blocks of thought, communication, and understanding. The richer your vocabulary, the more precisely you can express your ideas and engage with the academic world."
          },
          {
            type: "vocab",
            content: "Academic Vocabulary and Collocations",
            items: [
              { term: "collocation", definition: "words that naturally go together in a language", example: "'Make a decision' is a collocation; 'do a decision' is not." },
              { term: "analyze / analysis / analytical", definition: "to examine in detail / the process of examining / describing the approach of examination", example: "She wrote an analytical essay that included a careful analysis of the text." },
              { term: "significant / significance", definition: "important, meaningful / the quality of being important", example: "The significance of his discovery was not immediately recognized." },
              { term: "interpret / interpretation", definition: "to explain the meaning of / an explanation of meaning", example: "Her interpretation of the poem differed from the professor's." },
              { term: "contribute / contribution", definition: "to give or add to / something given or added", example: "Each student made a valuable contribution to the discussion." },
              { term: "establish / establishment", definition: "to set up or create / something that has been set up", example: "The researchers established a clear connection between the variables." },
              { term: "Academic Word List", definition: "a list of 570 word families frequently used in academic texts across disciplines", example: "Studying the Academic Word List helped her understand university-level readings." },
              { term: "register", definition: "the level of formality in language use", example: "Academic writing requires a formal register." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Choose the correct collocation. Circle MAKE or DO:\n\n1. ___ a decision (make)\n2. ___ research (do)\n3. ___ a mistake (make)\n4. ___ homework (do)\n5. ___ progress (make)\n6. ___ an effort (make)\n7. ___ the dishes (do)\n8. ___ a plan (make)\n9. ___ your best (do)\n10. ___ an appointment (make)\n\nNow write 3 sentences using 3 different collocations from the list above. Each sentence should be in an academic context."
          },
          {
            type: "activity",
            content: "Complete the word family chart and use each form in a sentence:\n\n1. create → cre_____ (noun) → cre_____ (adjective) → cre_____ (adverb)\n2. signify → signific_____ (noun) → signific_____ (adjective) → signific_____ (adverb)\n3. vary → vari_____ (noun) → vari_____ (adjective)\n4. define → defin_____ (noun) → defin_____ (adjective)\n\nThen write a short paragraph (5-6 sentences) about an academic topic of your choice, using at least 4 words from the Academic Word List."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which collocations cause you the most confusion because of French influence? Make a personal list of 5 collocations you need to remember, with the French equivalent that leads you to the error. For example: 'faire attention → pay attention (NOT do attention).' How will you practice remembering the correct English forms?"
          },
          {
            type: "quiz",
            content: "Academic Vocabulary and Collocations — Comprehension Check",
            questions: [
              { question: "Which is correct?", options: ["Do a decision", "Make a decision", "Take a decision", "Give a decision"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Make research", "Do research", "Take research", "Give research"], correctIndex: 1 },
              { question: "What is a collocation?", options: ["A grammar rule", "Words that naturally go together", "A type of verb", "A French word"], correctIndex: 1 },
              { question: "The noun form of 'analyze' is:", options: ["Analytical", "Analytically", "Analysis", "Analyzer"], correctIndex: 2 },
              { question: "Which is correct?", options: ["Make homework", "Do homework", "Take homework", "Give homework"], correctIndex: 1 },
              { question: "In French, 'passer un examen' means to take an exam. In English, 'pass an exam' means:", options: ["To take an exam", "To succeed on an exam", "To skip an exam", "To study for an exam"], correctIndex: 1 },
              { question: "The adjective form of 'significance' is:", options: ["Signify", "Significantly", "Significant", "Significate"], correctIndex: 2 },
              { question: "Which is correct?", options: ["Do a mistake", "Make a mistake", "Take a mistake", "Give a mistake"], correctIndex: 1 },
              { question: "What is the Academic Word List?", options: ["A list of easy words", "570 word families common in academic texts", "A French vocabulary list", "A list of slang words"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Do progress", "Give progress", "Take progress", "Make progress"], correctIndex: 3 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Learn important academic vocabulary words",
          "Use correct English collocations (make/do, take/pay, etc.)",
          "Build word families to learn more vocabulary faster"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "As your English improves, you need to learn academic words — words used in school, textbooks, and essays. You also need to learn collocations — words that go together naturally in English.\n\nCollocations are tricky for French speakers because you cannot just translate from French. Here are common ones:\n\n- MAKE a decision (NOT 'do a decision')\n- DO research (NOT 'make research')\n- PAY attention (NOT 'give attention')\n- MAKE a mistake (NOT 'do a mistake')\n- DO homework (NOT 'make homework')\n- MAKE progress (NOT 'do progress')\n- TAKE an exam (NOT 'pass an exam' — in French, 'passer' means to take, but in English, 'pass' means to succeed!)\n\nGeneral rule: Use DO for tasks and work. Use MAKE for creating or producing.\n\nWord families help you learn faster. If you know 'analyze,' you can learn:\n- analyze (verb): to look at something carefully\n- analysis (noun): the result of analyzing\n- analytical (adjective): describing careful examination\n\nThe Bible says, 'In the beginning was the Word' (John 1:1). Words are powerful tools — the more you know, the better you can express yourself."
          },
          {
            type: "vocab",
            content: "Academic Vocabulary and Collocations",
            items: [
              { term: "collocation", definition: "words that naturally go together in English", example: "'Make a decision' is correct; 'do a decision' is wrong." },
              { term: "analyze / analysis", definition: "to examine carefully / the result of examining", example: "The analysis showed that the experiment was successful." },
              { term: "significant", definition: "important, meaningful", example: "There was a significant improvement in her grades." },
              { term: "interpret", definition: "to explain the meaning of something", example: "How do you interpret this poem?" },
              { term: "contribute", definition: "to give or add something", example: "Everyone contributed ideas to the project." },
              { term: "establish", definition: "to set up or create", example: "They established a new rule for the class." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Choose MAKE or DO:\n\n1. ___ a decision\n2. ___ homework\n3. ___ research\n4. ___ a mistake\n5. ___ progress\n6. ___ your best\n7. ___ an effort\n8. ___ the dishes\n\nThen write 3 sentences using 3 different collocations."
          },
          {
            type: "activity",
            content: "Complete the word families:\n\n1. create → cre_____ (noun) → cre_____ (adjective)\n2. analyze → ana_____ (noun) → ana_____ (adjective)\n3. interpret → interpret_____ (noun)\n\nUse each noun form in a sentence."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which make/do collocations are hardest for you? Write 3 collocations you often get wrong and the correct English version."
          },
          {
            type: "quiz",
            content: "Academic Vocabulary and Collocations — Comprehension Check",
            questions: [
              { question: "Which is correct?", options: ["Do a decision", "Make a decision", "Take a decision", "Put a decision"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Make research", "Do research", "Take research", "Have research"], correctIndex: 1 },
              { question: "What is a collocation?", options: ["A grammar rule", "Words that go together naturally", "A verb tense", "A type of essay"], correctIndex: 1 },
              { question: "The noun form of 'analyze' is:", options: ["Analytical", "Analysis", "Analyzing", "Analyzed"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Make homework", "Do homework", "Take homework", "Have homework"], correctIndex: 1 },
              { question: "In English, 'pass an exam' means:", options: ["To take an exam", "To succeed on an exam", "To study for an exam", "To skip an exam"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Do a mistake", "Make a mistake", "Take a mistake", "Have a mistake"], correctIndex: 1 },
              { question: "'Significant' means:", options: ["Very small", "Important and meaningful", "Funny", "Quick"], correctIndex: 1 },
              { question: "Use DO for:", options: ["Creating things", "Tasks and work", "Making plans", "Having fun"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Do progress", "Make progress", "Take progress", "Have progress"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Learn the difference between MAKE and DO in English",
          "Practice common English word combinations (collocations)",
          "Build vocabulary by learning word families"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "In English, some words always go together. These are called collocations. French speakers often mix them up because French uses different words.\n\nThe most important rule: MAKE vs DO\n\nUse MAKE when you create something:\n- make a decision\n- make a mistake\n- make a plan\n- make progress\n\nUse DO for tasks and work:\n- do homework\n- do research\n- do your best\n- do the dishes\n\nCareful! In French, 'faire' can mean both make and do. But in English, they are different!\n\nAlso careful: 'passer un examen' in French means to TAKE an exam. In English, 'pass an exam' means to SUCCEED. They are not the same!\n\nWord families help you learn more words from one root:\n- create (verb) → creation (noun) → creative (adjective)\n- analyze (verb) → analysis (noun)\n\nThe Bible says, 'In the beginning was the Word' (John 1:1). Learning the right words helps you communicate clearly."
          },
          {
            type: "vocab",
            content: "Key Collocations",
            items: [
              { term: "make a decision", definition: "to choose something", example: "I need to make a decision about my classes." },
              { term: "do homework", definition: "to complete school work at home", example: "I do my homework after dinner." },
              { term: "make a mistake", definition: "to do something wrong", example: "Everyone makes mistakes when learning." },
              { term: "do research", definition: "to study and find information", example: "She did research about animals for her project." },
              { term: "pay attention", definition: "to listen and focus carefully", example: "Please pay attention to the teacher." },
              { term: "make progress", definition: "to improve or move forward", example: "You are making great progress in English!" }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Fill in MAKE or DO:\n\n1. ___ a decision\n2. ___ homework\n3. ___ a mistake\n4. ___ research\n5. ___ your best\n6. ___ progress"
          },
          {
            type: "activity",
            content: "Fix the mistakes in these sentences:\n\n1. I need to do a decision about my project.\n2. She made her homework last night.\n3. He did a big mistake on the test.\n4. They made research about the topic.\n\nWrite the correct sentence for each."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which is harder: remembering to use MAKE or DO? Give one example that you find confusing and explain why. Write 2 sentences."
          },
          {
            type: "quiz",
            content: "Academic Vocabulary and Collocations — Comprehension Check",
            questions: [
              { question: "Which is correct?", options: ["Do a decision", "Make a decision", "Take a decision", "Put a decision"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Make homework", "Do homework", "Take homework", "Give homework"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Do a mistake", "Make a mistake", "Take a mistake", "Have a mistake"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Make research", "Do research", "Give research", "Take research"], correctIndex: 1 },
              { question: "In French, 'passer un examen' means:", options: ["To pass the exam", "To take the exam", "To fail the exam", "To study for the exam"], correctIndex: 1 },
              { question: "Use MAKE when you:", options: ["Do tasks", "Create something", "Clean something", "Read something"], correctIndex: 1 },
              { question: "Use DO for:", options: ["Creating things", "Tasks and work", "Making food", "Building things"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Do progress", "Make progress", "Take progress", "Give progress"], correctIndex: 1 },
              { question: "'Pay attention' means:", options: ["Give money", "Listen and focus carefully", "Look away", "Speak loudly"], correctIndex: 1 },
              { question: "'Create' is a verb. The noun form is:", options: ["Creative", "Creating", "Creation", "Created"], correctIndex: 2 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 8 && weekNumber === 3) {
    // W3: "Register, Tone, and Style" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Distinguish between academic, professional, and casual registers in English",
          "Use hedging language appropriately (may, might, could, it appears) and boosting language strategically (clearly, certainly)",
          "Identify and correct common French-influenced style errors: over-elaborate sentences, excessive passive voice, and run-on structures",
          "Adapt writing style to match audience and purpose"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "Register, tone, and style are the invisible architecture of effective writing. At the B2 level, you must not only write grammatically correct English — you must write appropriately for your audience and purpose.\n\nRegister refers to the level of formality in your language. English has several registers:\n- Formal/Academic: 'The data indicate a significant correlation between the variables.' (essays, research papers)\n- Professional: 'I would like to schedule a meeting to discuss the project timeline.' (business emails)\n- Informal: 'Hey, want to meet up later to talk about the project?' (texts, casual emails)\n- Colloquial/Slang: 'That test was a total nightmare, dude.' (speech among friends)\n\nIn academic writing, two important tools shape your authority: hedging and boosting. Hedging softens claims, showing intellectual caution: 'The evidence may suggest...', 'It appears that...', 'This could indicate...', 'It is possible that...', 'The results seem to imply...' Boosting strengthens claims with confidence: 'The evidence clearly demonstrates...', 'This undoubtedly proves...', 'It is certain that...'\n\nGood academic writers use more hedging than boosting. Why? Because intellectual honesty requires acknowledging uncertainty. Overly strong claims without sufficient evidence weaken your credibility. However, when your evidence is strong, strategic boosting can be powerful.\n\nFrench-influenced style errors are particularly important for you to recognize:\n\n1. Over-elaborate sentences: French academic style often values long, complex sentences with multiple subordinate clauses. English academic writing prefers clarity and directness. Compare:\n   - French-influenced: 'It is important to note that, in consideration of the various factors that have been previously discussed, one might reasonably conclude that the evidence, while not entirely conclusive, nevertheless suggests a pattern.'\n   - Better English: 'The evidence suggests a pattern, though it is not conclusive.'\n\n2. Excessive passive voice: French uses passive constructions frequently. English academic writing uses passive voice selectively — when the agent is unknown, unimportant, or when you want to emphasize the action rather than the actor. But overuse makes writing feel distant and unclear.\n   - Passive: 'It was decided that the project would be completed by the team.'\n   - Active: 'The team decided to complete the project.'\n\n3. Run-on structures: French tolerates longer sentence chains. English prefers to break these into separate sentences.\n\nScripture offers a model for effective communication across registers. Jesus spoke differently to scholars, crowds, and individuals. His Sermon on the Mount is elevated yet accessible. His parables are simple yet profound. Matching your style to your audience is not about deception — it is about effective communication."
          },
          {
            type: "vocab",
            content: "Key Style and Register Terms",
            items: [
              { term: "register", definition: "the level of formality in language, adapted to audience and context", example: "Academic writing requires a formal register." },
              { term: "hedging", definition: "language that softens claims to show caution or uncertainty", example: "'The data may suggest a trend' uses hedging." },
              { term: "boosting", definition: "language that strengthens claims to show confidence", example: "'The evidence clearly demonstrates' uses boosting." },
              { term: "passive voice", definition: "a sentence structure where the subject receives the action rather than performing it", example: "'The report was written by the student' is passive; 'The student wrote the report' is active." },
              { term: "active voice", definition: "a sentence structure where the subject performs the action", example: "'The researcher conducted the experiment' uses active voice." },
              { term: "tone", definition: "the attitude or feeling conveyed through word choice and style", example: "The tone of the letter was formal but friendly." },
              { term: "concise", definition: "expressing much in few words; brief and clear", example: "Academic English values concise writing over elaborate phrasing." },
              { term: "colloquial", definition: "informal, conversational language used in everyday speech", example: "'Gonna' and 'wanna' are colloquial forms not used in academic writing." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Rewrite each sentence in the register indicated:\n\n1. CASUAL → ACADEMIC: 'This book is really cool and makes you think a lot about life.'\n2. ACADEMIC → CASUAL: 'The proliferation of digital communication technologies has fundamentally altered interpersonal dynamics.'\n3. Add hedging: 'Social media causes depression in teenagers.'\n4. Add boosting: 'There might be a connection between exercise and academic performance.'\n5. Fix French-influenced over-elaboration: 'It is necessary to understand that, taking into account all of the different elements that have been previously mentioned in the earlier sections of this essay, the conclusion that one might arrive at is that the author was attempting to convey a message about society.'"
          },
          {
            type: "activity",
            content: "Rewrite these passive sentences in active voice where appropriate. For each, explain whether active or passive is better and why:\n\n1. 'It was observed by the researchers that the rats showed increased activity.'\n2. 'The Mona Lisa was painted by Leonardo da Vinci.' (consider: is passive appropriate here?)\n3. 'It has been suggested by several scholars that the text was written in the 15th century.'\n4. 'Mistakes were made.' (a famous example of evasive passive — who made them?)\n5. 'The experiment was conducted under controlled conditions.' (consider: does the agent matter?)"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Jesus adapted his communication style to his audience — parables for crowds, direct challenges for Pharisees, gentle instruction for his disciples. How does this biblical model apply to the concept of register in writing? Write a reflective paragraph (100-150 words) connecting Jesus's communication wisdom to your own development as a writer in English."
          },
          {
            type: "quiz",
            content: "Register, Tone, and Style — Comprehension Check",
            questions: [
              { question: "What is register in writing?", options: ["The topic of the text", "The level of formality adapted to audience", "The number of paragraphs", "The font size"], correctIndex: 1 },
              { question: "Which is an example of hedging?", options: ["This clearly proves...", "The evidence may suggest...", "It is certain that...", "Without a doubt..."], correctIndex: 1 },
              { question: "Which is an example of boosting?", options: ["It might be possible...", "Perhaps...", "The results undoubtedly demonstrate...", "It seems that..."], correctIndex: 2 },
              { question: "Why do academic writers use more hedging than boosting?", options: ["It sounds more impressive", "It shows intellectual honesty about uncertainty", "It makes essays longer", "It is a French tradition"], correctIndex: 1 },
              { question: "Which is a common French-influenced style error?", options: ["Using too many short sentences", "Over-elaborate, overly long sentences", "Using too many questions", "Starting with a thesis"], correctIndex: 1 },
              { question: "What is passive voice?", options: ["Speaking quietly", "The subject performs the action", "The subject receives the action", "Using past tense"], correctIndex: 2 },
              { question: "When is passive voice appropriate?", options: ["Always", "Never", "When the agent is unknown or unimportant", "Only in French"], correctIndex: 2 },
              { question: "'Gonna' and 'wanna' belong to which register?", options: ["Academic", "Professional", "Colloquial/informal", "Legal"], correctIndex: 2 },
              { question: "What does 'concise' mean?", options: ["Very long and detailed", "Brief and clear", "Translated from French", "Written in passive voice"], correctIndex: 1 },
              { question: "How did Jesus model effective register use?", options: ["He always spoke the same way", "He adapted his style to his audience", "He only spoke formally", "He only used parables"], correctIndex: 1 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Understand the difference between formal and informal English",
          "Use hedging words (may, might, could) and boosting words (clearly, certainly)",
          "Avoid common French-influenced writing mistakes"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "The way you write depends on who you are writing for. This is called register — the level of formality in your language.\n\nFormal (academic): 'The research indicates that regular exercise improves concentration.'\nInformal (casual): 'Working out helps you focus better.'\n\nIn academic writing, you need special tools:\n\nHedging words soften your claims — they show you are being careful:\n- may, might, could: 'This may explain the results.'\n- it appears, it seems: 'It appears that students learn better in small groups.'\n- possibly, perhaps: 'Perhaps the author intended a different meaning.'\n\nBoosting words make your claims stronger:\n- clearly, certainly, undoubtedly: 'The evidence clearly shows a connection.'\n- definitely, without a doubt: 'This is undoubtedly the main theme.'\n\nUse hedging more than boosting in academic writing. It shows you are thoughtful and honest.\n\nCommon mistakes from French influence:\n1. Sentences too long — break them into shorter ones\n2. Too much passive voice — 'The book was read by me' → 'I read the book'\n3. Run-on sentences — too many ideas in one sentence\n\nJesus changed how he spoke depending on his audience. He used simple parables for crowds and direct words for scholars. Good writers adapt their style too."
          },
          {
            type: "vocab",
            content: "Key Style Terms",
            items: [
              { term: "register", definition: "the level of formality in your language", example: "Use a formal register for essays." },
              { term: "hedging", definition: "language that softens a claim", example: "'The data may suggest...' uses hedging." },
              { term: "boosting", definition: "language that makes a claim stronger", example: "'This clearly shows...' uses boosting." },
              { term: "passive voice", definition: "when the subject receives the action", example: "'The cake was eaten by the children' is passive." },
              { term: "active voice", definition: "when the subject does the action", example: "'The children ate the cake' is active." },
              { term: "tone", definition: "the attitude in your writing (formal, friendly, serious)", example: "The tone of the email was professional and polite." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Rewrite each sentence:\n\n1. CASUAL → FORMAL: 'That movie was super boring and nobody liked it.'\n2. FORMAL → CASUAL: 'The accumulation of empirical evidence suggests a positive correlation.'\n3. Add hedging: 'Social media is bad for teenagers.'\n4. Change to active voice: 'The homework was completed by all students.'"
          },
          {
            type: "activity",
            content: "Find and fix the French-influenced errors:\n\n1. 'It is important to note that, in taking into account all factors, the conclusion is that exercise is good.' (too long)\n2. 'The project was completed by the students and the presentation was given by them and the results were discussed by the class.' (too much passive)\n\nRewrite each in clear, direct English."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Jesus used different styles for different audiences. When do you use formal English vs informal English in your life? Write 3-4 sentences with examples."
          },
          {
            type: "quiz",
            content: "Register, Tone, and Style — Comprehension Check",
            questions: [
              { question: "What is register?", options: ["A type of essay", "The level of formality in language", "A grammar rule", "A vocabulary word"], correctIndex: 1 },
              { question: "Which is a hedging word?", options: ["Clearly", "Definitely", "May", "Undoubtedly"], correctIndex: 2 },
              { question: "Which is a boosting word?", options: ["Perhaps", "Maybe", "Possibly", "Certainly"], correctIndex: 3 },
              { question: "Why use hedging in academic writing?", options: ["To sound unsure", "To show intellectual honesty", "To make your essay longer", "Because the teacher said so"], correctIndex: 1 },
              { question: "'The cake was eaten by the children' is:", options: ["Active voice", "Passive voice", "A fragment", "A run-on"], correctIndex: 1 },
              { question: "Which is better in English academic writing?", options: ["Very long sentences", "Shorter, clearer sentences", "Sentences with many 'ands'", "Sentences in French"], correctIndex: 1 },
              { question: "What is a common French-influenced error?", options: ["Too many short sentences", "Over-elaborate, long sentences", "Too many questions", "Using simple words"], correctIndex: 1 },
              { question: "'The children ate the cake' is:", options: ["Passive voice", "Active voice", "A fragment", "Informal slang"], correctIndex: 1 },
              { question: "When should you use formal English?", options: ["With friends", "In text messages", "In academic essays", "At a party"], correctIndex: 2 },
              { question: "How did Jesus adapt his communication?", options: ["He always spoke the same way", "He changed his style for different audiences", "He only spoke formally", "He never used stories"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Know when to use formal vs informal English",
          "Learn words that make your writing sound more careful (may, might, could)",
          "Fix sentences that are too long or use too much passive voice"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "The way you write changes depending on who you are writing to.\n\nFormal English (for school and work):\n- 'I would like to request more information about the program.'\n- 'The evidence suggests that exercise is beneficial.'\n\nInformal English (for friends):\n- 'Hey, can you tell me more about it?'\n- 'Working out is good for you.'\n\nIn school essays, use formal English. Here are helpful words:\n\nTo be careful: may, might, could, perhaps\n- 'This may be the reason.' (not 'This IS the reason' — unless you are sure)\n\nTo be strong: clearly, certainly, definitely\n- 'This clearly shows the answer.'\n\nCommon mistakes from French:\n1. Sentences too long — make them shorter\n2. Too much 'was...by': 'The book was read by me' → 'I read the book'\n\nJesus spoke differently to different people. He used simple stories for crowds. He used direct words for leaders. You can do the same — change your style for your audience."
          },
          {
            type: "vocab",
            content: "Key Style Terms",
            items: [
              { term: "formal", definition: "polite, serious language for school and work", example: "Please submit your assignment by Friday." },
              { term: "informal", definition: "relaxed, friendly language for friends", example: "Hey, when's the homework due?" },
              { term: "may / might / could", definition: "words that show you are being careful about a claim", example: "This could be the answer." },
              { term: "clearly / certainly", definition: "words that show you are confident", example: "This clearly shows the main idea." },
              { term: "passive voice", definition: "when the action happens to the subject", example: "'The ball was kicked by the boy' — change to 'The boy kicked the ball.'" },
              { term: "active voice", definition: "when the subject does the action", example: "'She wrote the essay' is active voice." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Is this formal or informal? Write F or I:\n\n1. 'Hey, what's up?'\n2. 'I would like to schedule a meeting.'\n3. 'That test was so hard, dude.'\n4. 'The research indicates a positive trend.'\n5. 'Wanna grab lunch?'\n\nNow rewrite sentence 3 in formal English."
          },
          {
            type: "activity",
            content: "Change these passive sentences to active:\n1. 'The food was cooked by my mother.' → \n2. 'The game was won by our team.' → \n3. 'The book was written by the author.' → "
          }
        ],
        output: [
          {
            type: "reflection",
            content: "When do you use formal English? When do you use informal English? Give one example of each. Write 2-3 sentences."
          },
          {
            type: "quiz",
            content: "Register, Tone, and Style — Comprehension Check",
            questions: [
              { question: "When should you use formal English?", options: ["With friends", "In school essays", "In text messages", "At a party"], correctIndex: 1 },
              { question: "'May' and 'might' are used to:", options: ["Sound angry", "Be careful about a claim", "Give orders", "Ask questions"], correctIndex: 1 },
              { question: "'The ball was kicked by the boy' is:", options: ["Active voice", "Passive voice", "A question", "Informal"], correctIndex: 1 },
              { question: "'The boy kicked the ball' is:", options: ["Passive voice", "Active voice", "Formal only", "A fragment"], correctIndex: 1 },
              { question: "Which is formal?", options: ["Hey, what's up?", "I would like to request information.", "Wanna go?", "That's cool!"], correctIndex: 1 },
              { question: "Which is informal?", options: ["Please submit your work.", "The data suggests a trend.", "Hey, got a minute?", "I would appreciate your help."], correctIndex: 2 },
              { question: "What is a common French mistake in English writing?", options: ["Too many short sentences", "Sentences that are too long", "Using too many questions", "Writing in capitals"], correctIndex: 1 },
              { question: "'Clearly' makes a claim:", options: ["Weaker", "Stronger", "Shorter", "Longer"], correctIndex: 1 },
              { question: "'Perhaps' makes a claim:", options: ["Stronger", "Softer/more careful", "Longer", "Funnier"], correctIndex: 1 },
              { question: "Jesus changed how he spoke for:", options: ["Different audiences", "Only one group", "No reason", "Only formal settings"], correctIndex: 0 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 8 && weekNumber === 4) {
    // W4: "Academic Writing Portfolio" (PROJECT)
    return {
      ADVANCED: {
        objectives: [
          "Compile and revise a portfolio of B2-level academic writing samples demonstrating mastery of grammar, vocabulary, and style",
          "Apply self-editing strategies targeting sentence structure, collocations, register, and French-influenced errors",
          "Demonstrate growth through comparison of early and revised drafts",
          "Produce polished academic writing suitable for a B2 proficiency portfolio"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "Your Academic Writing Portfolio is the capstone of Unit 8. It demonstrates your mastery of advanced grammar, academic vocabulary, and stylistic awareness. A portfolio is not just a collection of work — it is a curated presentation of your best writing, showing growth and self-awareness.\n\nYour portfolio should include three revised writing samples:\n\n1. An academic paragraph demonstrating compound-complex sentences and participial phrases (from Week 1 skills)\n2. An academic paragraph demonstrating correct use of collocations and academic vocabulary (from Week 2 skills)\n3. An academic paragraph or short essay demonstrating appropriate register, hedging/boosting, and concise style (from Week 3 skills)\n\nFor each piece, include:\n- The original draft (or a description of what you changed)\n- The revised, polished version\n- A brief self-reflection (3-4 sentences) explaining what you improved and why\n\nRevision checklist:\n- Have you eliminated run-on sentences and fragments?\n- Are your sentences appropriately concise (not French-influenced over-elaboration)?\n- Have you used active voice where appropriate?\n- Are all collocations correct (make/do, take/pay)?\n- Is your register consistently academic?\n- Have you used hedging and boosting appropriately?\n\nPhilippians 3:14 says, 'I press on toward the goal for the prize of the upward call of God in Christ Jesus.' Academic excellence is a form of stewardship — using the gifts God has given you to their fullest potential. This portfolio represents your pressing on toward the goal of B2 mastery."
          },
          {
            type: "rubric",
            content: "Academic Writing Portfolio Rubric:\n\n**Content & Completeness (25%):** Three revised writing samples included, each targeting the specified skill area. Self-reflections accompany each piece.\n\n**Grammar & Sentence Structure (25%):** Compound-complex sentences used correctly. No run-ons or fragments. Participial phrases used appropriately. Sentences are concise and clear.\n\n**Vocabulary & Collocations (25%):** Academic vocabulary used accurately. Collocations are correct. Word families demonstrate range.\n\n**Style & Register (25%):** Consistently academic register. Hedging and boosting used appropriately. Active voice preferred. French-influenced errors eliminated. Writing is clear and direct."
          },
          {
            type: "vocab",
            content: "Portfolio Terms",
            items: [
              { term: "portfolio", definition: "a curated collection of work demonstrating skills and growth", example: "Her writing portfolio showcased significant improvement over the semester." },
              { term: "revision", definition: "the process of reviewing and improving written work", example: "Through revision, the essay became clearer and more persuasive." },
              { term: "self-reflection", definition: "thoughtful evaluation of one's own work and learning process", example: "His self-reflection identified passive voice as his biggest area for improvement." },
              { term: "draft", definition: "a preliminary version of a piece of writing", example: "The first draft was rough, but the final version was polished." },
              { term: "polish", definition: "to refine and perfect a piece of writing", example: "She polished her essay by correcting collocations and tightening sentences." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Prepare your three writing samples. For each one:\n\n1. Academic Paragraph — Complex Sentences: Write or revise a paragraph (80-100 words) on any academic topic. Include at least one compound-complex sentence, one participial phrase, and varied subordination/coordination.\n\n2. Academic Paragraph — Vocabulary & Collocations: Write or revise a paragraph (80-100 words) using at least 5 academic words and 3 correct collocations.\n\n3. Academic Paragraph — Register & Style: Write or revise a paragraph (80-100 words) using formal register, appropriate hedging, and concise style. Eliminate any passive voice unless justified."
          },
          {
            type: "activity",
            content: "For each writing sample, write a self-reflection (3-4 sentences) addressing:\n- What skill did this piece target?\n- What specific changes did you make during revision?\n- What French-influenced errors did you correct?\n- What aspect of English academic writing do you still find challenging?\n\nCompile all three samples and reflections into your final portfolio."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Philippians 3:14 says, 'I press on toward the goal.' Reflect on your growth in academic English throughout this unit. What are you most proud of? What goals remain? Write a concluding portfolio reflection (100-150 words)."
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      },
      STANDARD: {
        objectives: [
          "Revise and improve two academic writing samples",
          "Apply grammar, vocabulary, and style skills from the unit",
          "Write self-reflections on your improvement"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "For your project, you will create a mini writing portfolio with two revised pieces of academic writing.\n\nYour portfolio should include:\n\n1. A revised paragraph showing good sentence structure (no run-ons, no fragments, variety of sentence types)\n2. A revised paragraph showing correct collocations and academic vocabulary\n\nFor each piece:\n- Write or revise the paragraph (60-80 words each)\n- Write a self-reflection (2-3 sentences) explaining what you improved\n\nRevision checklist:\n- Are sentences clear and not too long?\n- Are collocations correct (make/do)?\n- Is the writing formal and academic?\n- Is active voice used where possible?\n\nPhilippians 3:14 says, 'I press on toward the goal.' Revising your writing is pressing on — getting better and better."
          },
          {
            type: "rubric",
            content: "Academic Writing Portfolio Rubric:\n\n**Content (25%):** Two revised writing samples with self-reflections.\n\n**Grammar (25%):** Clear sentence structure. No run-ons or fragments. Some sentence variety.\n\n**Vocabulary (25%):** Academic words used correctly. Collocations are correct.\n\n**Style (25%):** Formal register. Sentences are clear and not too long. Active voice preferred."
          },
          {
            type: "vocab",
            content: "Portfolio Terms",
            items: [
              { term: "portfolio", definition: "a collection of your best work", example: "My portfolio shows how my writing has improved." },
              { term: "revision", definition: "improving your writing by making changes", example: "After revision, my paragraph was much clearer." },
              { term: "self-reflection", definition: "thinking about what you learned and how you improved", example: "In my self-reflection, I explained what I changed." },
              { term: "draft", definition: "a first version of your writing", example: "My first draft had many errors." },
              { term: "polish", definition: "to make your writing better and cleaner", example: "I polished my essay by fixing grammar mistakes." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Write or revise your two paragraphs:\n\n1. Sentence Structure paragraph (60-80 words): Use at least one compound sentence and one complex sentence. No run-ons or fragments.\n2. Vocabulary paragraph (60-80 words): Use at least 3 academic words and 2 correct collocations.\n\nUse the revision checklist to improve each paragraph."
          },
          {
            type: "activity",
            content: "Write a self-reflection for each paragraph (2-3 sentences each):\n- What did you improve?\n- What was the hardest part?\n\nPut both paragraphs and reflections together as your portfolio."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "What is the most important thing you learned about academic English writing in this unit? How will you continue to improve? Write 3-4 sentences."
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Revise one piece of academic writing to make it better",
          "Check for common mistakes (run-ons, wrong collocations, passive voice)",
          "Write a short reflection on what you learned"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "For your project, you will revise one paragraph to show what you have learned about English grammar and style.\n\nSteps:\n1. Write a paragraph (40-60 words) about something you learned this unit\n2. Check for mistakes using this list:\n   - Are sentences clear and not too long?\n   - Did I use make/do correctly?\n   - Did I use active voice? ('I wrote the essay' not 'The essay was written by me')\n3. Write 2-3 sentences about what you changed and why\n\nPhilippians 3:14 says, 'I press on toward the goal.' Every time you revise, you are getting better!"
          },
          {
            type: "rubric",
            content: "Academic Writing Portfolio Rubric:\n\n**Content (30%):** One revised paragraph with self-reflection.\n\n**Grammar (30%):** Clear sentences. No major errors.\n\n**Vocabulary (20%):** At least 2 academic words or correct collocations.\n\n**Reflection (20%):** 2-3 sentences explaining what you improved."
          },
          {
            type: "vocab",
            content: "Portfolio Terms",
            items: [
              { term: "revise", definition: "to read your work again and make it better", example: "I revised my paragraph to fix the long sentences." },
              { term: "improve", definition: "to make better", example: "I want to improve my English writing." },
              { term: "checklist", definition: "a list of things to check", example: "I used a checklist to find my mistakes." },
              { term: "draft", definition: "a first version of your writing", example: "My first draft had some errors." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Write a paragraph (40-60 words) about one thing you learned in this unit. Then use the checklist to find and fix any mistakes. Write the improved version."
          },
          {
            type: "activity",
            content: "Write 2-3 sentences answering:\n- What did you change in your paragraph?\n- Why did you make those changes?"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "The Bible says 'I press on toward the goal.' What is your goal for English writing? Write 2 sentences."
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      }
    };
  }

  // ── UNIT 9: Review and Assessment ───────────────────────────────────────

  if (unitNumber === 9 && weekNumber === 1) {
    // W1: "Reading and Writing Skills Review" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Demonstrate comprehensive mastery of all reading skills developed in Level 3: close reading, thematic analysis, textual evidence, literary device identification",
          "Demonstrate comprehensive mastery of all writing skills: essay structure, academic register, complex sentences, collocations, hedging/boosting",
          "Apply integrated reading-writing skills in timed academic contexts",
          "Self-assess strengths and areas for continued growth"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "This lesson is a comprehensive review of every reading and writing skill you have developed throughout Level 3. As you prepare for the final assessment, this is your opportunity to consolidate your learning and identify any areas that need additional practice.\n\nReading Skills Review:\n- Close reading: Annotating texts, identifying patterns, and asking analytical questions\n- Theme identification: Distinguishing topic from theme, articulating nuanced thematic claims\n- Textual evidence: Selecting quotations, integrating them with signal phrases, analyzing their significance\n- Literary devices: Identifying and interpreting metaphor, simile, symbolism, irony, foreshadowing, and their effects\n- Cultural context: Understanding how historical, social, and linguistic contexts shape literary meaning\n- Cross-cultural comparison: Evaluating texts from Francophone and Anglophone traditions\n\nWriting Skills Review:\n- Essay structure: Introduction with hook and thesis, body paragraphs with topic sentences and evidence, conclusion with significance\n- Sentence structure: Simple, compound, complex, and compound-complex sentences; participial phrases; avoiding run-ons and fragments\n- Academic vocabulary: Academic Word List, word families, correct collocations (make/do, take/pay)\n- Register and style: Academic register, hedging and boosting, concise expression, avoiding French-influenced errors (over-elaboration, excessive passive, run-ons)\n\nAs you review, remember Philippians 3:14: 'I press on toward the goal for the prize of the upward call of God in Christ Jesus.' You have made remarkable progress. This review is not about perfection — it is about pressing on, consolidating what you know, and preparing for the next level of excellence."
          },
          {
            type: "vocab",
            content: "Review Vocabulary",
            items: [
              { term: "consolidate", definition: "to bring together and strengthen knowledge or skills", example: "This review helps you consolidate everything you have learned." },
              { term: "comprehensive", definition: "including all or nearly all elements; thorough", example: "The review covers a comprehensive range of skills." },
              { term: "mastery", definition: "thorough knowledge or skill in a subject", example: "She demonstrated mastery of academic vocabulary." },
              { term: "self-assess", definition: "to evaluate your own abilities and performance", example: "Self-assessment helps you identify strengths and weaknesses." },
              { term: "integrate", definition: "to combine different elements into a unified whole", example: "Integrate reading and writing skills in your academic work." },
              { term: "proficiency", definition: "a high degree of competence or skill", example: "B2 proficiency means you can handle most academic tasks independently." },
              { term: "nuanced", definition: "showing subtle differences in meaning", example: "Her analysis was nuanced, considering multiple perspectives." },
              { term: "articulate", definition: "to express ideas clearly and effectively", example: "He was able to articulate his thesis with precision." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Reading Skills Practice: Read the following passage and complete all tasks:\n\n'The marketplace hummed with voices — sellers calling out prices, children darting between stalls, the smell of spices thick in the air. Amara stood at the edge, clutching the letter she could not bring herself to open. It had arrived three days ago, bearing her mother's handwriting — elegant, deliberate, each letter formed with the precision of someone who believed that words, once written, could not be taken back. Amara feared those words. She feared them more than silence.'\n\n1. Identify the setting and explain how it contrasts with the protagonist's emotional state.\n2. What literary device is used in 'words, once written, could not be taken back'? What does it reveal about the mother?\n3. What is implied about the relationship between Amara and her mother?\n4. Write a thematic statement for this passage.\n5. Write an analytical sentence using a signal phrase and a quotation from the passage."
          },
          {
            type: "activity",
            content: "Writing Skills Practice: Write an academic paragraph (100-120 words) analyzing the passage above. Your paragraph must include:\n- A clear topic sentence stating a thematic claim\n- At least two pieces of textual evidence with signal phrases\n- At least one compound-complex sentence\n- At least two academic vocabulary words\n- Hedging language where appropriate\n- Concise, direct style (no French-influenced over-elaboration)\n\nAfter writing, self-edit using the revision checklist from Unit 8."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Complete a self-assessment: On a scale of 1-5, rate your confidence in each skill area (close reading, essay writing, sentence structure, vocabulary, register/style). For your lowest-rated area, write 3-4 sentences explaining what specifically you find challenging and what strategies you will use to improve before the final assessment."
          },
          {
            type: "quiz",
            content: "Reading and Writing Skills Review — Comprehension Check",
            questions: [
              { question: "What is the difference between a topic and a theme?", options: ["They are the same thing", "A topic is general; a theme is a specific insight about that topic", "A theme is always one word", "A topic is found in the conclusion"], correctIndex: 1 },
              { question: "Which signal phrase is appropriate for academic writing?", options: ["I think...", "The author suggests that...", "Obviously...", "Everyone knows..."], correctIndex: 1 },
              { question: "What is a compound-complex sentence?", options: ["A very short sentence", "A sentence with two independent clauses and at least one dependent clause", "A sentence with no verbs", "A passive sentence"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Make research", "Do research", "Take research", "Give research"], correctIndex: 1 },
              { question: "What is hedging?", options: ["Making claims stronger", "Softening claims to show caution", "Using slang", "Writing in French"], correctIndex: 1 },
              { question: "What is a common French-influenced writing error?", options: ["Too many short sentences", "Over-elaborate, overly long sentences", "Too many paragraphs", "Using first person"], correctIndex: 1 },
              { question: "What does 'close reading' involve?", options: ["Reading quickly", "Careful analysis of language, structure, and meaning", "Reading with eyes closed", "Reading only the introduction"], correctIndex: 1 },
              { question: "When is passive voice appropriate?", options: ["Always", "Never", "When the agent is unknown or unimportant", "Only in French"], correctIndex: 2 },
              { question: "What is a thesis statement?", options: ["A question", "The central argument of an essay", "A summary of the plot", "The title"], correctIndex: 1 },
              { question: "Philippians 3:14 encourages us to:", options: ["Give up", "Press on toward the goal", "Stay where we are", "Avoid challenges"], correctIndex: 1 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Review all reading skills: finding themes, using textual evidence, identifying literary devices",
          "Review all writing skills: essay structure, sentence types, collocations, formal register",
          "Practice combining reading and writing skills"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "This lesson reviews everything you have learned about reading and writing in Level 3.\n\nReading Skills:\n- Find the theme of a text (the deeper message)\n- Use textual evidence (quotations) to support your ideas\n- Identify literary devices (metaphor, simile, symbolism, irony)\n- Understand how culture affects a text\n\nWriting Skills:\n- Write essays with introduction, body, and conclusion\n- Use compound and complex sentences\n- Use correct collocations (make/do, take/pay)\n- Write in a formal, academic register\n- Use hedging words (may, might, could)\n- Keep sentences clear and not too long\n\nThis is your chance to practice before the final assessment. Philippians 3:14 says, 'I press on toward the goal.' You have come so far — keep pressing on!"
          },
          {
            type: "vocab",
            content: "Review Vocabulary",
            items: [
              { term: "review", definition: "to look at something again to remember and practice", example: "Let us review the main skills before the test." },
              { term: "consolidate", definition: "to bring together and make stronger", example: "This lesson consolidates all your skills." },
              { term: "self-assess", definition: "to judge your own abilities", example: "Self-assessment helps you know what to study more." },
              { term: "proficiency", definition: "a high level of skill", example: "B2 proficiency means you can handle academic English well." },
              { term: "integrate", definition: "to combine different things together", example: "Integrate reading and writing skills in your essay." },
              { term: "mastery", definition: "being very good at something through practice", example: "Mastery comes from practice and revision." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read this passage and answer the questions:\n\n'Amara stood at the edge of the marketplace, clutching a letter she could not open. It had arrived three days ago in her mother's handwriting. She feared those words more than silence.'\n\n1. What is the theme of this passage?\n2. Find one literary device and explain it.\n3. Write a sentence using 'The author suggests that...' and a quotation.\n4. What is implied about Amara's feelings?"
          },
          {
            type: "activity",
            content: "Write a paragraph (60-80 words) analyzing the passage. Include:\n- A topic sentence with your main point\n- One quotation with a signal phrase\n- At least one compound or complex sentence\n- Formal, academic language"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which reading or writing skill do you feel strongest in? Which do you need to practice more? Write 3-4 sentences with your self-assessment."
          },
          {
            type: "quiz",
            content: "Reading and Writing Skills Review — Comprehension Check",
            questions: [
              { question: "A theme is:", options: ["The title of a story", "A specific message about a topic", "A character's name", "The first sentence"], correctIndex: 1 },
              { question: "Textual evidence is:", options: ["Your opinion", "Words from the text that support your idea", "A picture", "The author's biography"], correctIndex: 1 },
              { question: "'The author suggests that...' is a:", options: ["Signal phrase", "Question", "Fragment", "Run-on"], correctIndex: 0 },
              { question: "Which is correct?", options: ["Do a decision", "Make a decision", "Take a decision", "Have a decision"], correctIndex: 1 },
              { question: "A compound sentence uses:", options: ["Because, although", "And, but, or, so", "Only one idea", "No conjunctions"], correctIndex: 1 },
              { question: "Hedging words include:", options: ["Clearly, definitely", "May, might, could", "Always, never", "Must, shall"], correctIndex: 1 },
              { question: "What should you avoid in English academic writing?", options: ["Short sentences", "Overly long sentences", "Topic sentences", "Conclusions"], correctIndex: 1 },
              { question: "A metaphor says:", options: ["One thing is LIKE another", "One thing IS another", "One thing SOUNDS like another", "One thing LOOKS like another"], correctIndex: 1 },
              { question: "Active voice means:", options: ["The subject receives the action", "The subject does the action", "The sentence is very long", "The sentence is a question"], correctIndex: 1 },
              { question: "Philippians 3:14 encourages us to:", options: ["Give up", "Press on toward the goal", "Wait patiently", "Work alone"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Review finding the theme of a text and using evidence",
          "Review writing clear sentences and using correct word combinations",
          "Practice the skills you need for the final test"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "Let us review what you have learned in Level 3!\n\nReading:\n- The theme is the big message of a text\n- Use words from the text to prove your ideas\n- Know literary devices: metaphor (IS), simile (like/as), symbolism (object = idea)\n\nWriting:\n- Use connecting words: and, but, because, although\n- Use correct word combinations: make a decision, do homework\n- Write in formal English for school\n- Keep sentences short and clear\n\nThe Bible says, 'I press on toward the goal' (Philippians 3:14). You have learned a lot. Now practice and get ready!"
          },
          {
            type: "vocab",
            content: "Review Vocabulary",
            items: [
              { term: "theme", definition: "the big message of a text", example: "The theme is: never give up." },
              { term: "evidence", definition: "words from the text that prove your point", example: "Use evidence to support your answer." },
              { term: "metaphor", definition: "saying something IS something else", example: "'Life is a journey' is a metaphor." },
              { term: "collocation", definition: "words that go together in English", example: "'Make a decision' is a collocation." },
              { term: "formal", definition: "polite, serious language for school", example: "Use formal English in your essays." },
              { term: "review", definition: "to practice again before a test", example: "Let us review the vocabulary." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Quick review practice:\n\n1. What is the theme? 'A boy kept trying after failing. He finally succeeded.' Theme: ___\n2. 'Life is a roller coaster' is a: (metaphor / simile / symbolism)\n3. Fill in MAKE or DO: ___ homework, ___ a mistake, ___ progress\n4. Fix this sentence: 'She was tired she went home.'"
          },
          {
            type: "activity",
            content: "Write 3 sentences about what you learned in Level 3. Use:\n- One connecting word (and, but, because, or although)\n- One correct collocation (make or do)\n- Formal English"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "What are you most proud of learning in Level 3? What do you want to practice more? Write 2-3 sentences."
          },
          {
            type: "quiz",
            content: "Reading and Writing Skills Review — Comprehension Check",
            questions: [
              { question: "The theme is:", options: ["The title", "The big message", "The first word", "The author"], correctIndex: 1 },
              { question: "Evidence is:", options: ["Your opinion", "Words from the text", "A picture", "The title"], correctIndex: 1 },
              { question: "'Life is a journey' is a:", options: ["Simile", "Metaphor", "Symbol", "Theme"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Make homework", "Do homework", "Take homework", "Give homework"], correctIndex: 1 },
              { question: "Which is correct?", options: ["Do a mistake", "Make a mistake", "Take a mistake", "Have a mistake"], correctIndex: 1 },
              { question: "Formal English is for:", options: ["Friends", "School and work", "Text messages", "Parties"], correctIndex: 1 },
              { question: "'She was tired she went home' needs:", options: ["A period or connecting word between the ideas", "More adjectives", "A question mark", "Capital letters"], correctIndex: 0 },
              { question: "A simile uses:", options: ["IS", "'Like' or 'as'", "No comparison", "Only nouns"], correctIndex: 1 },
              { question: "Philippians 3:14 says:", options: ["Give up", "Press on toward the goal", "Stay home", "Be quiet"], correctIndex: 1 },
              { question: "Why do we review?", options: ["Because it is fun", "To practice and get ready", "Because the teacher says so", "To waste time"], correctIndex: 1 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 9 && weekNumber === 2) {
    // W2: "Speaking and Listening Skills Review" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Demonstrate B2-level presentation skills: clear structure, academic register, effective delivery",
          "Demonstrate B2-level discussion skills: contributing ideas, responding to others, using academic discourse markers",
          "Demonstrate B2-level listening comprehension: following academic lectures, taking notes, identifying main arguments",
          "Apply pronunciation strategies for clarity and natural rhythm in academic contexts"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "Speaking and listening are the oral counterparts of writing and reading — and at the B2 level, they require the same sophistication. This review consolidates all the speaking and listening skills you have developed throughout Level 3.\n\nPresentation Skills Review:\nA B2-level academic presentation should have clear structure (introduction, body, conclusion), use academic register, incorporate evidence, and engage the audience. Key techniques:\n- Signal your structure: 'I will discuss three main points...', 'First...', 'Moving on to...', 'In conclusion...'\n- Use hedging when appropriate: 'The evidence suggests...', 'It appears that...'\n- Maintain eye contact and speak at a measured pace\n- Pronunciation: Focus on word stress (aNAlysis, not anALysis), sentence stress (emphasize content words), and intonation (voice rises for questions, falls for statements)\n\nDiscussion Skills Review:\nAcademic discussions require both contributing your own ideas and engaging with others':\n- Agreeing: 'I agree with that point, and I would add...'\n- Disagreeing politely: 'I see your perspective, but I would argue that...'\n- Building on ideas: 'That is an interesting point. To extend that further...'\n- Asking for clarification: 'Could you elaborate on what you mean by...?'\n\nListening Skills Review:\nAt B2, you should be able to follow the main arguments of academic lectures, even on unfamiliar topics. Key strategies:\n- Listen for discourse markers that signal structure: 'The main point is...', 'In contrast...', 'To summarize...'\n- Take notes on key points, not every word\n- Listen for hedging vs boosting to gauge the speaker's confidence level\n- Identify the speaker's main thesis and supporting evidence\n\nFrench speakers should be aware of pronunciation differences that can cause misunderstanding: the /h/ sound (which does not exist in French — 'eat' vs 'heat'), the /θ/ and /ð/ sounds (English 'th' — 'think' vs 'sink'), and word stress patterns that differ from French's even stress.\n\nProverbs 25:11 reminds us: 'A word fitly spoken is like apples of gold in a setting of silver.' Speaking well is as important as writing well."
          },
          {
            type: "vocab",
            content: "Speaking and Listening Terms",
            items: [
              { term: "discourse marker", definition: "a word or phrase that organizes speech: 'first,' 'however,' 'in conclusion'", example: "Use discourse markers to help your audience follow your presentation." },
              { term: "word stress", definition: "the emphasis placed on a particular syllable in a word", example: "In 'analysis,' the stress falls on the second syllable: aNAlysis." },
              { term: "intonation", definition: "the rise and fall of the voice in speech", example: "In English, intonation rises at the end of yes/no questions." },
              { term: "elaborate", definition: "to explain in more detail", example: "Could you elaborate on your main argument?" },
              { term: "paraphrase", definition: "to express the same idea in different words", example: "Let me paraphrase your point to make sure I understand." },
              { term: "measured pace", definition: "speaking at a steady, controlled speed", example: "A measured pace helps your audience understand academic content." },
              { term: "comprehension", definition: "the ability to understand what you hear or read", example: "Listening comprehension improves with regular practice." },
              { term: "academic discourse", definition: "the specialized language and conventions used in academic settings", example: "Academic discourse includes hedging, evidence, and formal register." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Presentation Practice: Prepare a 3-minute mini-presentation on one of the following topics:\n\n1. How Francophone and Anglophone literary traditions differ\n2. The importance of collocations for French speakers learning English\n3. How cultural context shapes the meaning of literature\n\nYour presentation must include:\n- A clear introduction with your main argument\n- At least 2 supporting points with evidence\n- Discourse markers ('First...', 'Furthermore...', 'In conclusion...')\n- Hedging language where appropriate\n- A conclusion\n\nPractice aloud. Focus on word stress, measured pace, and clear pronunciation of /h/ and /θ/ sounds."
          },
          {
            type: "activity",
            content: "Discussion Simulation: With a partner or individually (writing your responses), practice the following discussion scenario:\n\nTopic: 'Should literature always be read in the original language, or are translations acceptable?'\n\n1. State your position (3-4 sentences)\n2. Write a response agreeing with the opposing view but adding a nuance: 'I see your point, but...'\n3. Write a response building on your partner's idea: 'That is an excellent point. To extend that...'\n4. Write a clarification question: 'Could you elaborate on...?'\n\nUse academic register throughout."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which is more challenging for you: speaking academic English or understanding spoken academic English? What specific strategies have helped you most? How does the French pronunciation system affect your English speaking? Write a reflective paragraph (100-150 words)."
          },
          {
            type: "quiz",
            content: "Speaking and Listening Skills Review — Comprehension Check",
            questions: [
              { question: "What is a discourse marker?", options: ["A grammar error", "A word that organizes speech, like 'first' or 'however'", "A type of punctuation", "A vocabulary test"], correctIndex: 1 },
              { question: "Where does the stress fall in 'analysis'?", options: ["First syllable", "Second syllable", "Third syllable", "Last syllable"], correctIndex: 1 },
              { question: "How should you disagree politely in an academic discussion?", options: ["'You are wrong.'", "'I see your perspective, but I would argue that...'", "'No way!'", "'That makes no sense.'"], correctIndex: 1 },
              { question: "What should you listen for in an academic lecture?", options: ["Every single word", "Background music", "Discourse markers and main arguments", "The speaker's accent"], correctIndex: 2 },
              { question: "The /h/ sound in 'heat' is difficult for French speakers because:", options: ["It is very loud", "French does not have this sound", "It is always silent", "It is the same as French /h/"], correctIndex: 1 },
              { question: "What does 'elaborate' mean?", options: ["To repeat exactly", "To explain in more detail", "To speak quietly", "To disagree"], correctIndex: 1 },
              { question: "In a presentation, 'In conclusion...' is a:", options: ["Hedging phrase", "Boosting phrase", "Discourse marker", "Collocation"], correctIndex: 2 },
              { question: "What is paraphrasing?", options: ["Copying exact words", "Expressing the same idea in different words", "Translating from French", "Speaking louder"], correctIndex: 1 },
              { question: "A measured pace means:", options: ["Speaking very fast", "Speaking at a steady, controlled speed", "Speaking in a whisper", "Speaking without pauses"], correctIndex: 1 },
              { question: "Proverbs 25:11 says a word fitly spoken is like:", options: ["A sharp sword", "Apples of gold in silver", "A rushing river", "A tall mountain"], correctIndex: 1 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Review presentation skills: clear structure and formal language",
          "Review discussion skills: agreeing, disagreeing politely, asking questions",
          "Review listening skills: understanding main ideas and taking notes"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "Let us review your speaking and listening skills from Level 3.\n\nPresentation Skills:\n- Start with an introduction: 'Today I will talk about...'\n- Use connecting words: 'First...', 'Next...', 'Finally...', 'In conclusion...'\n- Speak clearly and not too fast\n- Use formal, academic language\n\nDiscussion Skills:\n- Agree: 'I agree with that point.'\n- Disagree politely: 'I see your point, but I think...'\n- Ask for more information: 'Could you explain that more?'\n- Build on ideas: 'That is a good point. I would also add...'\n\nListening Skills:\n- Listen for main ideas, not every word\n- Listen for words like 'the main point is...' and 'in conclusion...'\n- Take short notes on key points\n\nFor French speakers: Remember to pronounce the /h/ sound ('eat' and 'heat' are different!). Also practice the 'th' sound in words like 'think' and 'the.'\n\nThe Bible says, 'A word fitly spoken is like apples of gold' (Proverbs 25:11). Speaking well is a valuable skill."
          },
          {
            type: "vocab",
            content: "Speaking and Listening Terms",
            items: [
              { term: "discourse marker", definition: "a word that helps organize your speech", example: "'First,' 'next,' and 'in conclusion' are discourse markers." },
              { term: "word stress", definition: "saying one part of a word louder", example: "'ANalysis' has the stress on the second syllable." },
              { term: "elaborate", definition: "to explain in more detail", example: "Could you elaborate on that idea?" },
              { term: "paraphrase", definition: "to say the same thing in different words", example: "Let me paraphrase: you mean that reading is important for learning." },
              { term: "comprehension", definition: "understanding what you hear", example: "My listening comprehension is improving." },
              { term: "pace", definition: "the speed at which you speak", example: "Speak at a steady pace so everyone can follow." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Prepare a 2-minute presentation about: 'What I learned in Level 3 English.'\n\nInclude:\n- Introduction: 'Today I will talk about...'\n- Two main points with examples\n- Discourse markers: 'First...', 'Second...', 'In conclusion...'\n- Formal language\n\nPractice saying it aloud. Focus on clear pronunciation."
          },
          {
            type: "activity",
            content: "Practice discussion phrases. Write your response to each:\n\n1. Someone says: 'I think reading in English is harder than writing.'\n   Agree: 'I agree because...'\n   OR Disagree: 'I see your point, but...'\n\n2. Someone says: 'Collocations are the hardest part of English.'\n   Build on it: 'That is a good point. I would also add...'\n\n3. You do not understand something. Ask: 'Could you explain...?'"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Is speaking English harder or easier for you than writing English? Why? Write 3-4 sentences."
          },
          {
            type: "quiz",
            content: "Speaking and Listening Skills Review — Comprehension Check",
            questions: [
              { question: "'First,' 'next,' and 'in conclusion' are:", options: ["Collocations", "Discourse markers", "Literary devices", "Hedging words"], correctIndex: 1 },
              { question: "How do you disagree politely?", options: ["'You are wrong!'", "'I see your point, but...'", "'No!'", "'That is stupid.'"], correctIndex: 1 },
              { question: "When listening to a lecture, you should:", options: ["Write every word", "Listen for main ideas and key points", "Close your eyes", "Only listen to the beginning"], correctIndex: 1 },
              { question: "The /h/ sound is hard for French speakers because:", options: ["It is very common in French", "French does not have this sound", "It is always silent in English", "It sounds like /r/"], correctIndex: 1 },
              { question: "'Could you explain that more?' asks for:", options: ["Permission", "Elaboration", "Agreement", "A translation"], correctIndex: 1 },
              { question: "What is paraphrasing?", options: ["Translating from French", "Saying the same idea in different words", "Copying exactly", "Speaking louder"], correctIndex: 1 },
              { question: "Good presentation pace means:", options: ["Very fast", "Steady and clear", "Very slow", "Whispering"], correctIndex: 1 },
              { question: "'I agree, and I would add...' is:", options: ["Disagreeing", "Building on an idea", "Asking a question", "Changing the topic"], correctIndex: 1 },
              { question: "Word stress means:", options: ["Saying every syllable the same", "Saying one syllable louder than others", "Speaking quietly", "Spelling correctly"], correctIndex: 1 },
              { question: "A word fitly spoken is like:", options: ["A sharp knife", "Apples of gold in silver", "A heavy rock", "A dark cloud"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Practice speaking clearly in English",
          "Practice listening for the main idea",
          "Use polite phrases for discussions"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "Let us review your speaking and listening skills!\n\nSpeaking Tips:\n- Start by saying what you will talk about: 'Today I want to talk about...'\n- Use simple connecting words: 'First...', 'Then...', 'Finally...'\n- Speak slowly and clearly\n- Practice the /h/ sound: 'hello,' 'happy,' 'house' (French does not have this sound)\n\nListening Tips:\n- Listen for the main idea — you do not need every word\n- Listen for words like 'the main point is...' or 'in conclusion...'\n\nDiscussion Phrases:\n- 'I agree because...'\n- 'I think differently because...'\n- 'Could you say that again?'\n\nThe Bible says that good words are like 'apples of gold' (Proverbs 25:11). When you speak clearly and kindly, your words have power."
          },
          {
            type: "vocab",
            content: "Speaking and Listening Terms",
            items: [
              { term: "pronounce", definition: "to say a word correctly", example: "I need to practice how to pronounce 'the' and 'think.'" },
              { term: "main idea", definition: "the most important point", example: "The main idea of the talk was about healthy eating." },
              { term: "agree", definition: "to have the same opinion", example: "I agree with your idea about studying." },
              { term: "disagree", definition: "to have a different opinion", example: "I disagree, but I respect your view." },
              { term: "clearly", definition: "in a way that is easy to understand", example: "Please speak clearly so I can understand." },
              { term: "pace", definition: "how fast or slow you speak", example: "Speak at a steady pace." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Practice speaking: Tell someone (or practice alone) about your favorite thing you learned in English class. Use this structure:\n\n'Today I want to talk about ___. First, ___. Also, ___. In conclusion, ___.'\n\nSpeak slowly and clearly. Practice the /h/ sound in any words that need it."
          },
          {
            type: "activity",
            content: "Practice these discussion phrases. Write a response for each:\n\n1. Someone says: 'English is hard to learn.' Do you agree or disagree? Use: 'I agree because...' or 'I think differently because...'\n\n2. You do not understand something. Write: 'Could you say that again?' or 'What does ___ mean?'"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Do you prefer speaking English or listening to English? Why? Write 2 sentences."
          },
          {
            type: "quiz",
            content: "Speaking and Listening Skills Review — Comprehension Check",
            questions: [
              { question: "'First,' 'then,' and 'finally' help you:", options: ["Write an essay", "Organize your speech", "Read faster", "Spell better"], correctIndex: 1 },
              { question: "The /h/ sound is in:", options: ["'eat'", "'house'", "'ice'", "'apple'"], correctIndex: 1 },
              { question: "'I agree because...' is used when you:", options: ["Disagree", "Have the same opinion", "Do not understand", "Want to leave"], correctIndex: 1 },
              { question: "When listening, focus on:", options: ["Every single word", "The main idea", "The speaker's clothes", "Background noise"], correctIndex: 1 },
              { question: "'Could you say that again?' is used when you:", options: ["Agree", "Disagree", "Do not understand", "Want to leave"], correctIndex: 2 },
              { question: "Speaking clearly means:", options: ["Speaking very fast", "Speaking so people can understand", "Speaking very quietly", "Speaking in French"], correctIndex: 1 },
              { question: "Good pace means:", options: ["Very fast", "Steady and not too fast or slow", "Very slow", "Changing speed all the time"], correctIndex: 1 },
              { question: "'I think differently because...' is a way to:", options: ["Agree", "Disagree politely", "Ask a question", "Change the topic"], correctIndex: 1 },
              { question: "'Today I want to talk about...' is good for:", options: ["Ending a speech", "Starting a speech", "Asking a question", "Writing an essay"], correctIndex: 1 },
              { question: "Good words are like 'apples of gold' means:", options: ["Gold is expensive", "Words that are well-spoken are valuable", "Apples are healthy", "You should eat gold"], correctIndex: 1 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 9 && weekNumber === 3) {
    // W3: "Integrated Academic Skills Practice" (INSTRUCTION)
    return {
      ADVANCED: {
        objectives: [
          "Perform read-then-write tasks demonstrating B2-level integration of comprehension and composition",
          "Perform listen-then-speak tasks demonstrating B2-level integration of comprehension and oral production",
          "Work under timed conditions to simulate academic assessment environments",
          "Apply all Level 3 skills (reading, writing, speaking, listening) in integrated, realistic academic tasks"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "In real academic life, skills do not exist in isolation. You read a text and then write about it. You listen to a lecture and then discuss it. You combine reading, writing, speaking, and listening in every class, every assignment, every exam. This lesson prepares you for the final assessment by practicing integrated skills under timed conditions.\n\nIntegrated Task Type 1: Read-Then-Write\nYou will read a passage and then write a response within a set time. This tests your ability to:\n- Comprehend the text quickly and accurately\n- Identify the main argument and key evidence\n- Formulate your own response with a clear thesis\n- Support your response with textual evidence\n- Write in academic register with correct grammar and vocabulary\n\nIntegrated Task Type 2: Listen-Then-Speak\nYou will listen to (or read a transcript of) an academic talk and then give an oral response. This tests your ability to:\n- Identify the speaker's main argument and supporting points\n- Take effective notes\n- Formulate a clear, organized oral response\n- Use discourse markers and academic language\n- Speak with clear pronunciation and appropriate pace\n\nTimed Practice Tips:\n- Read the task instructions first, before reading the passage\n- Budget your time: approximately 40% reading/planning, 60% writing/speaking\n- For writing: outline before you write — even 2 minutes of planning saves time\n- For speaking: take 30 seconds to organize your thoughts before beginning\n- Do not try to be perfect — aim for clear, well-organized, and accurate\n\nPhilippians 3:14 reminds us: 'I press on toward the goal.' The goal is not perfection but faithful, excellent effort. Trust the skills you have built throughout this course and press on with confidence."
          },
          {
            type: "vocab",
            content: "Integrated Skills Terms",
            items: [
              { term: "integrated", definition: "combining multiple skills or elements into one task", example: "The integrated task required both reading comprehension and academic writing." },
              { term: "timed practice", definition: "completing a task within a set time limit", example: "Timed practice builds confidence for exam conditions." },
              { term: "formulate", definition: "to create or develop an idea or plan", example: "She formulated her thesis after reading the passage twice." },
              { term: "outline", definition: "a brief plan showing the main points of a piece of writing", example: "A quick outline helps organize your essay before writing." },
              { term: "transcript", definition: "a written version of spoken words", example: "She read the lecture transcript and took notes." },
              { term: "simulate", definition: "to create conditions that are similar to a real situation", example: "This timed exercise simulates real exam conditions." },
              { term: "budget (time)", definition: "to plan how to use available time effectively", example: "Budget 10 minutes for planning and 20 for writing." },
              { term: "synthesize", definition: "to combine information from different sources into a coherent whole", example: "The essay synthesized ideas from three different texts." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "TIMED TASK 1: Read-Then-Write (25 minutes total)\n\nRead the following passage (5 minutes), then write a response (20 minutes):\n\n'Translation is often described as an act of betrayal. The Italian proverb \"traduttore, traditore\" — translator, traitor — captures the belief that no translation can fully convey the original. Yet translation is also an act of profound generosity: it opens doors between cultures, allowing ideas to travel across linguistic boundaries. Without translation, the works of Homer, Cervantes, and Tolstoy would remain locked within their original languages, accessible only to those who happened to be born into the right linguistic tradition.'\n\nWrite a response (150-200 words) that:\n- States whether you agree or disagree with the claim that translation is 'an act of betrayal'\n- Supports your position with at least one piece of textual evidence\n- Draws on your own experience as a French speaker reading/learning in English\n- Uses academic register with hedging where appropriate"
          },
          {
            type: "activity",
            content: "TIMED TASK 2: Listen-Then-Speak (15 minutes total)\n\nRead this lecture transcript (5 minutes), then prepare and deliver a 2-minute oral response (10 minutes):\n\n'Today I want to discuss why academic writing in English values directness. In many cultures — including French academic culture — a more elaborate, indirect style is preferred. The French dissertation, for example, often builds slowly toward a thesis, exploring multiple perspectives before arriving at a conclusion. English academic writing, by contrast, states its thesis upfront and then provides evidence. Neither approach is superior — they simply reflect different intellectual traditions. However, as international academic communication increasingly uses English, understanding the direct approach becomes essential.'\n\nYour oral response should:\n- Summarize the lecturer's main argument in 2-3 sentences\n- Share your own perspective as someone who bridges French and English academic traditions\n- Use discourse markers ('First...', 'Furthermore...', 'In conclusion...')\n- Speak at a measured pace with clear pronunciation"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "After completing both timed tasks, reflect: Which was more challenging — the read-then-write task or the listen-then-speak task? Why? What time management strategies worked well? What would you do differently? Write a self-assessment paragraph (100-150 words)."
          },
          {
            type: "quiz",
            content: "Integrated Academic Skills Practice — Comprehension Check",
            questions: [
              { question: "What does 'integrated skills' mean?", options: ["Using one skill at a time", "Combining multiple skills in one task", "Translating between languages", "Reading very fast"], correctIndex: 1 },
              { question: "In a read-then-write task, how should you budget your time?", options: ["100% writing", "100% reading", "About 40% reading/planning, 60% writing", "50% translating, 50% writing"], correctIndex: 2 },
              { question: "What should you do before starting a timed writing task?", options: ["Start writing immediately", "Read the instructions and make an outline", "Translate everything to French first", "Skip the passage"], correctIndex: 1 },
              { question: "What does 'synthesize' mean?", options: ["To translate", "To combine information into a coherent whole", "To speak loudly", "To memorize"], correctIndex: 1 },
              { question: "What does the Italian proverb 'traduttore, traditore' mean?", options: ["Translation is easy", "Translator, traitor", "Travel is educational", "Tradition is important"], correctIndex: 1 },
              { question: "English academic writing typically:", options: ["Builds slowly toward the thesis", "States the thesis upfront and provides evidence", "Avoids having a thesis", "Uses only questions"], correctIndex: 1 },
              { question: "French academic writing typically:", options: ["States the thesis immediately", "Avoids all evidence", "Builds toward the thesis more gradually", "Uses only passive voice"], correctIndex: 2 },
              { question: "Before giving an oral response, you should:", options: ["Start talking immediately", "Take 30 seconds to organize your thoughts", "Write the full response first", "Translate from French"], correctIndex: 1 },
              { question: "What does 'formulate' mean?", options: ["To forget", "To create or develop an idea", "To copy exactly", "To speak very fast"], correctIndex: 1 },
              { question: "In timed conditions, the goal is:", options: ["Perfection", "Speed over quality", "Clear, well-organized, and accurate work", "Finishing first"], correctIndex: 2 }
            ]
          }
        ]
      },
      STANDARD: {
        objectives: [
          "Practice read-then-write tasks combining reading and writing skills",
          "Practice listen-then-speak tasks combining listening and speaking skills",
          "Work under timed conditions to prepare for the final assessment"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "In real school and work, you use many skills together. You read something, then write about it. You listen to someone, then discuss it. This lesson helps you practice combining skills.\n\nRead-Then-Write Tips:\n1. Read the instructions first\n2. Read the passage carefully\n3. Plan your response (make a short outline)\n4. Write your response\n5. Check your work\n\nListen-Then-Speak Tips:\n1. Listen for the main idea\n2. Take short notes\n3. Think about what you want to say\n4. Speak clearly using 'First...', 'Also...', 'In conclusion...'\n\nTime Management:\n- Do not spend all your time reading — save time for writing\n- Do not try to be perfect — be clear and organized\n- A simple, clear answer is better than a long, confusing one\n\nPhilippians 3:14: 'I press on toward the goal.' You have practiced all these skills. Now combine them with confidence!"
          },
          {
            type: "vocab",
            content: "Integrated Skills Terms",
            items: [
              { term: "integrated", definition: "combining different skills together", example: "The test had an integrated task: read, then write." },
              { term: "outline", definition: "a short plan for your writing", example: "Make an outline before you start writing." },
              { term: "timed", definition: "done within a set amount of time", example: "The timed task gave us 20 minutes to write." },
              { term: "summarize", definition: "to explain the main points briefly", example: "Summarize the passage in 2-3 sentences." },
              { term: "budget time", definition: "to plan how to use your time wisely", example: "Budget 5 minutes for reading and 15 for writing." },
              { term: "formulate", definition: "to create or organize your ideas", example: "Formulate your response before speaking." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "TIMED TASK: Read-Then-Write (20 minutes)\n\nRead this passage (5 minutes):\n\n'Translation opens doors between cultures. Without it, great books would be locked in their original languages. But translation is also difficult — some meaning is always lost. The Italian saying \"translator, traitor\" shows how hard it is to be faithful to the original while making it understandable in a new language.'\n\nWrite a response (15 minutes, 80-100 words):\n- Do you think translation is more helpful or harmful? Why?\n- Use one quotation from the passage\n- Use a signal phrase\n- Write in formal English"
          },
          {
            type: "activity",
            content: "PRACTICE TASK: Listen-Then-Speak (or write your response)\n\nRead this short lecture transcript:\n\n'English academic writing is direct — you state your point first, then give evidence. French writing is often more gradual — you explore ideas before stating your conclusion. Both are good approaches, but when writing in English, use the direct style.'\n\nPrepare a 1-minute response:\n- Summarize the main idea in 2 sentences\n- Share your experience: Which style do you find easier?\n- Use 'First...' and 'In conclusion...'"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which is harder for you: read-then-write or listen-then-speak? What strategy helps you most under timed conditions? Write 3-4 sentences."
          },
          {
            type: "quiz",
            content: "Integrated Academic Skills Practice — Comprehension Check",
            questions: [
              { question: "What does 'integrated' mean?", options: ["Using one skill alone", "Combining different skills", "Translating from French", "Speaking loudly"], correctIndex: 1 },
              { question: "What should you do first in a timed writing task?", options: ["Start writing immediately", "Read the instructions", "Ask for more time", "Translate to French"], correctIndex: 1 },
              { question: "Why make an outline before writing?", options: ["To waste time", "To organize your ideas", "Because the teacher said so", "To practice spelling"], correctIndex: 1 },
              { question: "When listening, focus on:", options: ["Every word", "The main idea", "The speaker's voice", "Background sounds"], correctIndex: 1 },
              { question: "What does 'budget time' mean?", options: ["Save money", "Plan how to use your time", "Work faster", "Skip steps"], correctIndex: 1 },
              { question: "English academic writing is usually:", options: ["Indirect and gradual", "Direct — thesis first, then evidence", "Always very long", "Always in passive voice"], correctIndex: 1 },
              { question: "A simple, clear answer is:", options: ["Worse than a long one", "Better than a confusing long one", "Never good enough", "Only for beginners"], correctIndex: 1 },
              { question: "'Summarize' means:", options: ["Copy every word", "Explain the main points briefly", "Translate", "Delete"], correctIndex: 1 },
              { question: "Before speaking, you should:", options: ["Start immediately", "Organize your thoughts first", "Write the full response", "Speak very fast"], correctIndex: 1 },
              { question: "Philippians 3:14 says:", options: ["Give up", "Press on toward the goal", "Wait for help", "Do nothing"], correctIndex: 1 }
            ]
          }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Practice reading a text and then writing about it",
          "Practice listening to information and then talking about it",
          "Learn to use time wisely during tasks"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "In real life, you often need to read something and then write about it, or hear something and then talk about it. Let us practice!\n\nRead-Then-Write Steps:\n1. Read the text\n2. Think: What is the main idea?\n3. Write your response\n\nListen-Then-Speak Steps:\n1. Listen carefully\n2. Think: What was the main point?\n3. Say your response clearly\n\nTips for Timed Tasks:\n- Do not panic — take a breath\n- Read the instructions first\n- Keep your answer simple and clear\n- It is okay if it is not perfect\n\nPhilippians 3:14 says, 'I press on toward the goal.' You can do this!"
          },
          {
            type: "vocab",
            content: "Integrated Skills Terms",
            items: [
              { term: "main idea", definition: "the most important point", example: "The main idea is that practice helps you improve." },
              { term: "response", definition: "your answer or reply", example: "Write your response in 3-4 sentences." },
              { term: "timed", definition: "done within a certain amount of time", example: "The timed task was 15 minutes." },
              { term: "instructions", definition: "directions that tell you what to do", example: "Read the instructions before starting." },
              { term: "summarize", definition: "to explain the main point in a few words", example: "Summarize the story in one sentence." },
              { term: "organize", definition: "to put things in order", example: "Organize your ideas before writing." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "Read-Then-Write (15 minutes):\n\nRead this: 'Translation helps people from different countries understand each other. But sometimes when you translate, some meaning is lost. That is why learning other languages is important — you can understand more.'\n\n1. What is the main idea? (one sentence)\n2. Do you agree? Write 3-4 sentences explaining why or why not."
          },
          {
            type: "activity",
            content: "Listen-Then-Speak Practice:\n\nRead this (imagine you are listening):\n'English puts the main idea first. French often puts it at the end. When writing in English, say your point first.'\n\n1. What was the main idea? (one sentence)\n2. Practice saying: 'The speaker said that ___. I think ___ because ___.'"
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Which is easier for you: reading then writing, or listening then speaking? Why? Write 2 sentences."
          },
          {
            type: "quiz",
            content: "Integrated Academic Skills Practice — Comprehension Check",
            questions: [
              { question: "What should you do first in a timed task?", options: ["Start writing", "Read the instructions", "Ask for help", "Close your eyes"], correctIndex: 1 },
              { question: "What does 'summarize' mean?", options: ["Copy everything", "Explain the main point briefly", "Translate to French", "Write a long paragraph"], correctIndex: 1 },
              { question: "'Response' means:", options: ["Question", "Your answer or reply", "A mistake", "A vocabulary word"], correctIndex: 1 },
              { question: "In a timed task, keep your answer:", options: ["Very long", "Simple and clear", "In French", "Perfect"], correctIndex: 1 },
              { question: "What does 'organize' mean?", options: ["To mess up", "To put things in order", "To forget", "To copy"], correctIndex: 1 },
              { question: "What is the main idea?", options: ["Every detail", "The most important point", "The last sentence", "The title"], correctIndex: 1 },
              { question: "English puts the main idea:", options: ["At the end", "First", "In the middle", "Nowhere"], correctIndex: 1 },
              { question: "If you do not understand, you can:", options: ["Give up", "Ask 'Could you say that again?'", "Stay silent", "Leave"], correctIndex: 1 },
              { question: "It is okay if your answer is not:", options: ["Clear", "Organized", "Perfect", "Written"], correctIndex: 2 },
              { question: "Philippians 3:14 tells us to:", options: ["Stop trying", "Press on toward the goal", "Wait for someone else", "Do nothing"], correctIndex: 1 }
            ]
          }
        ]
      }
    };
  }

  if (unitNumber === 9 && weekNumber === 4) {
    // W4: "Level 3 Final Assessment" (PROJECT)
    return {
      ADVANCED: {
        objectives: [
          "Demonstrate B2-level proficiency across all four language skills: reading, writing, speaking, and listening",
          "Complete a comprehensive assessment aligned to CEFR B2 can-do statements",
          "Apply integrated skills in timed, exam-like conditions",
          "Self-evaluate using the CEFR B2 can-do checklist"
        ],
        duration: "80 minutes",
        input: [
          {
            type: "text",
            content: "This is your Level 3 Final Assessment. It is designed to measure your growth across all four language skills — reading, writing, speaking, and listening — at the CEFR B2 level. The assessment has four sections, each targeting a different skill area.\n\nSection 1: Reading Comprehension (20 minutes)\nYou will read an academic passage and answer questions testing your ability to identify the main argument, analyze supporting evidence, interpret literary devices, and draw inferences.\n\nSection 2: Writing (25 minutes)\nYou will write an academic essay or analytical response demonstrating thesis development, textual evidence integration, complex sentence structures, academic vocabulary, and appropriate register.\n\nSection 3: Listening Comprehension (15 minutes)\nYou will listen to (or read a transcript of) an academic talk and answer questions about the main argument, supporting details, and speaker's perspective.\n\nSection 4: Speaking (10 minutes)\nYou will prepare and deliver a brief academic response demonstrating clear organization, academic register, and effective pronunciation.\n\nAfter completing all four sections, you will use the CEFR B2 Can-Do Checklist to self-assess your proficiency level.\n\nCEFR B2 Can-Do Statements:\n- Reading: I can read articles and reports on contemporary issues and understand the writer's stance.\n- Writing: I can write clear, detailed text on a wide range of subjects related to my interests. I can write an essay presenting arguments for and against.\n- Listening: I can understand extended speech and lectures and follow complex lines of argument on familiar topics.\n- Speaking: I can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers possible. I can present clear, detailed descriptions on a range of subjects.\n\nRemember Philippians 3:14: 'I press on toward the goal for the prize of the upward call of God in Christ Jesus.' You have worked diligently throughout Level 3. This assessment is your opportunity to demonstrate that growth."
          },
          {
            type: "rubric",
            content: "Level 3 Final Assessment Rubric:\n\n**Reading Comprehension (25%):** Accurately identifies main arguments. Interprets evidence and literary devices correctly. Draws valid inferences. Demonstrates close reading skills.\n\n**Writing (25%):** Clear thesis with supporting evidence. Academic register and vocabulary. Complex sentence structures (compound-complex, participial phrases). Correct collocations. Hedging/boosting used appropriately. Concise style without French-influenced errors.\n\n**Listening Comprehension (25%):** Identifies main argument accurately. Notes supporting details. Recognizes speaker's perspective and tone.\n\n**Speaking (25%):** Clear organization with discourse markers. Academic register. Accurate pronunciation and natural rhythm. Effective communication of ideas.\n\n**CEFR B2 Threshold:** To demonstrate B2 proficiency, you should score at least 70% overall and at least 60% in each individual section."
          },
          {
            type: "vocab",
            content: "Assessment Terms",
            items: [
              { term: "CEFR", definition: "Common European Framework of Reference for Languages — the international standard for describing language proficiency", example: "B2 on the CEFR means you can handle most academic communication independently." },
              { term: "proficiency", definition: "a high level of competence in a skill", example: "Her English proficiency reached B2 by the end of Level 3." },
              { term: "can-do statement", definition: "a description of what a learner at a given level is able to do", example: "The B2 can-do statement for writing says: 'I can write clear, detailed text on a range of subjects.'" },
              { term: "assessment", definition: "a formal evaluation of skills or knowledge", example: "The final assessment covers all four language skills." },
              { term: "threshold", definition: "the minimum level required to achieve a classification", example: "The B2 threshold requires at least 70% overall." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "SECTION 1: Reading Comprehension (20 minutes)\n\nRead the following passage and answer all questions:\n\n'The debate over whether technology enhances or diminishes human connection is not new, but it has intensified in the digital age. Proponents argue that social media, video calls, and messaging apps have made it possible to maintain relationships across vast distances — a grandparent in Port-au-Prince can watch her grandchild take first steps in Montreal via video call. Critics counter that digital communication is shallow compared to face-to-face interaction, that it creates an illusion of connection while actually increasing isolation. The truth, as with most complex questions, likely lies somewhere between these positions. Technology is a tool, and like all tools, its value depends on how we use it.'\n\n1. What is the author's main argument? State it in one sentence.\n2. What textual evidence supports the proponents' position? Quote directly.\n3. What textual evidence supports the critics' position? Quote directly.\n4. What literary or rhetorical device does the author use in the final sentence? What effect does it create?\n5. Write a thematic statement that captures the passage's central insight.\n6. The author uses hedging ('likely lies somewhere'). Why is this effective?"
          },
          {
            type: "activity",
            content: "SECTION 2: Writing (25 minutes)\n\nWrite an academic essay (200-250 words) responding to the reading passage. Take a position: Does technology enhance or diminish human connection? Your essay must include:\n- An introduction with a hook and clear thesis\n- At least one body paragraph with textual evidence and analysis\n- A conclusion with broader significance\n- Academic register with hedging where appropriate\n- At least one compound-complex sentence\n- At least two correct academic collocations\n- Concise, clear style\n\nSECTION 3: Listening (read the transcript and answer):\n'The key finding of our research is that technology use is neither inherently positive nor negative for social connection. What matters is intentionality. People who use technology to supplement — not replace — face-to-face interaction report higher levels of social satisfaction.'\n\n1. What is the speaker's main finding?\n2. What does the speaker say matters most?\n3. Paraphrase the speaker's conclusion in your own words.\n\nSECTION 4: Speaking (prepare and deliver 2 minutes):\nGive a brief academic response: 'Based on the reading and listening, what is your view on technology and human connection?' Use discourse markers, academic register, and speak at a measured pace."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "CEFR B2 Self-Assessment Checklist — Rate yourself honestly (Yes / Mostly / Not Yet):\n\nReading:\n- I can understand articles about current issues and identify the writer's position.\n- I can identify themes, literary devices, and implicit meaning in texts.\n\nWriting:\n- I can write clear, well-organized essays with a thesis and supporting evidence.\n- I can use academic vocabulary, correct collocations, and complex sentences.\n\nListening:\n- I can follow extended academic talks and identify main arguments.\n- I can take notes on key points and speaker's perspective.\n\nSpeaking:\n- I can give organized academic presentations with clear structure.\n- I can participate in discussions, agreeing, disagreeing, and building on ideas.\n\nWrite a final reflection (100-150 words) on your overall Level 3 journey. What are you most proud of? What will you focus on in Level 4?"
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      },
      STANDARD: {
        objectives: [
          "Complete a final assessment covering reading, writing, speaking, and listening skills",
          "Demonstrate B2-level skills in each area",
          "Self-assess using the CEFR B2 can-do checklist"
        ],
        duration: "60 minutes",
        input: [
          {
            type: "text",
            content: "This is your Level 3 Final Assessment! It has four parts:\n\n1. Reading (15 minutes): Read a passage and answer questions\n2. Writing (20 minutes): Write a short essay\n3. Listening (10 minutes): Read a transcript and answer questions\n4. Speaking (10 minutes): Give a short spoken response\n\nAfter the assessment, you will check your skills against the CEFR B2 can-do list:\n- Reading: I can understand articles about current topics and know the writer's opinion\n- Writing: I can write clear essays with reasons and evidence\n- Listening: I can understand lectures and talks on familiar topics\n- Speaking: I can talk about many topics clearly and in detail\n\nPhilippians 3:14 says, 'I press on toward the goal.' You have worked hard all through Level 3. Show what you have learned!"
          },
          {
            type: "rubric",
            content: "Final Assessment Rubric:\n\n**Reading (25%):** You can find the main idea. You can answer questions about the text.\n\n**Writing (25%):** You write a clear response with a main idea and evidence. You use formal language and correct grammar.\n\n**Listening (25%):** You understand the main point of the talk. You can answer questions about it.\n\n**Speaking (25%):** You speak clearly and organize your ideas. You use formal language."
          },
          {
            type: "vocab",
            content: "Assessment Terms",
            items: [
              { term: "assessment", definition: "a test to see what you have learned", example: "The final assessment covers all four skills." },
              { term: "CEFR", definition: "the European system for measuring language levels", example: "B2 means you can handle most academic English." },
              { term: "proficiency", definition: "a high level of skill", example: "Your proficiency has improved greatly this year." },
              { term: "can-do statement", definition: "a description of what you can do at your level", example: "A B2 can-do: 'I can write clear essays with arguments.'" },
              { term: "demonstrate", definition: "to show that you can do something", example: "The test lets you demonstrate your skills." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "SECTION 1: Reading (15 minutes)\n\nRead the passage:\n'Technology can bring people together or push them apart. A grandmother in Haiti can see her grandchild in Canada through a video call — that is wonderful. But some people spend so much time online that they forget to talk to the person sitting next to them. Technology is a tool, and its value depends on how we use it.'\n\n1. What is the main idea of this passage?\n2. Give one example of technology helping people.\n3. Give one example of technology causing a problem.\n4. What does the author mean by 'Technology is a tool'?\n\nSECTION 2: Writing (20 minutes)\nWrite a short essay (100-150 words): Does technology help or hurt human connection? Include:\n- Your main idea (thesis)\n- At least one example or piece of evidence\n- Formal language\n- A conclusion"
          },
          {
            type: "activity",
            content: "SECTION 3: Listening (10 minutes)\nRead this transcript:\n'Our research shows that technology is not good or bad by itself. What matters is how you use it. People who use technology to add to their real-life relationships are happier than those who use it to replace them.'\n\n1. What is the main finding?\n2. What matters most according to the speaker?\n3. Who is happier: people who add technology to relationships, or people who replace relationships with technology?\n\nSECTION 4: Speaking (10 minutes)\nPrepare a 1-minute response: 'How has technology affected your life?' Use: 'First...', 'Also...', 'In conclusion...' Speak clearly and use formal English."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "B2 Self-Assessment — Can you do these? (Yes / Mostly / Not Yet)\n\n1. I can understand articles and know the writer's opinion.\n2. I can write essays with a main idea and evidence.\n3. I can understand talks on familiar topics.\n4. I can speak clearly about many topics.\n\nWrite 3-4 sentences about your Level 3 experience. What are you most proud of?"
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      },
      VOCATIONAL: {
        objectives: [
          "Complete a final test covering reading, writing, speaking, and listening",
          "Show what you have learned in Level 3",
          "Check your progress using a simple skills checklist"
        ],
        duration: "45 minutes",
        input: [
          {
            type: "text",
            content: "This is your final test for Level 3! It has four parts:\n\n1. Reading: Read a short text and answer questions\n2. Writing: Write a short response\n3. Listening: Read what someone said and answer questions\n4. Speaking: Talk about what you learned\n\nDo not worry — just do your best! You have learned a lot.\n\nPhilippians 3:14: 'I press on toward the goal.' You are pressing on, and that is something to be proud of!"
          },
          {
            type: "rubric",
            content: "Final Assessment Rubric:\n\n**Reading (25%):** You understand the main idea of the text.\n\n**Writing (25%):** You write a clear answer with your opinion.\n\n**Listening (25%):** You understand the main point.\n\n**Speaking (25%):** You speak clearly and share your ideas."
          },
          {
            type: "vocab",
            content: "Assessment Terms",
            items: [
              { term: "assessment", definition: "a test to show what you know", example: "The final assessment has four parts." },
              { term: "demonstrate", definition: "to show what you can do", example: "Demonstrate your skills on the test." },
              { term: "progress", definition: "how much you have improved", example: "You have made great progress!" },
              { term: "checklist", definition: "a list of things to check", example: "Use the checklist to see your strengths." }
            ]
          }
        ],
        processing: [
          {
            type: "activity",
            content: "SECTION 1: Reading (10 minutes)\n\n'Technology can help people. A grandmother can see her grandchild through a video call. But too much screen time can be a problem. Technology is a tool — it depends on how we use it.'\n\n1. What is the main idea?\n2. How can technology help? Give one example.\n3. What is one problem with technology?\n\nSECTION 2: Writing (15 minutes)\nWrite 5-8 sentences: Do you think technology is mostly good or mostly bad? Why? Use formal English."
          },
          {
            type: "activity",
            content: "SECTION 3: Listening (10 minutes)\nRead this:\n'Technology is not good or bad by itself. It depends on how you use it. Use it to help your relationships, not replace them.'\n\n1. What is the main point?\n2. What should you use technology for?\n\nSECTION 4: Speaking (10 minutes)\nPractice saying: 'In Level 3, I learned ___. The most useful thing was ___. I want to keep improving ___.'\n\nSay it clearly and slowly."
          }
        ],
        output: [
          {
            type: "reflection",
            content: "Skills Checklist — Can you do these? (Yes / A Little / Not Yet)\n\n1. I can understand a short text in English.\n2. I can write sentences in formal English.\n3. I can understand when someone speaks English.\n4. I can speak about topics in English.\n\nWrite 2-3 sentences: What are you most proud of learning in Level 3?"
          },
          { type: "quiz", content: "No quiz for project lessons.", questions: [] }
        ]
      }
    };
  }

  // Fallback — should never reach here
  return {
    ADVANCED: { objectives: [], duration: "80 minutes", input: [], processing: [], output: [] },
    STANDARD: { objectives: [], duration: "60 minutes", input: [], processing: [], output: [] },
    VOCATIONAL: { objectives: [], duration: "45 minutes", input: [], processing: [], output: [] }
  };
}

// ── Main Function ───────────────────────────────────────────────────────────

async function main() {
  console.log("=== Enriching Academic English Bridge L3 — Units 7-9 ===");
  console.log(`DRY_RUN: ${DRY_RUN}`);
  console.log(`COURSE_ID: ${COURSE_ID}\n`);

  let totalUpdated = 0;
  let totalSkipped = 0;

  for (const unitNumber of [7, 8, 9]) {
    console.log(`\n── Unit ${unitNumber} ──`);

    const lessons = await prisma.lesson.findMany({
      where: {
        unit: {
          courseId: COURSE_ID,
          unitNumber: unitNumber,
        },
      },
      include: { unit: true },
      orderBy: { weekNumber: "asc" },
    });

    if (lessons.length === 0) {
      console.log(`  ⚠ No lessons found for Unit ${unitNumber}`);
      totalSkipped += 4;
      continue;
    }

    console.log(`  Found ${lessons.length} lessons`);

    for (const lesson of lessons) {
      const content = getLessonContent(unitNumber, lesson.weekNumber);

      // Check if content is empty (fallback)
      if (content.ADVANCED.objectives.length === 0) {
        console.log(`  ⚠ No content for U${unitNumber}W${lesson.weekNumber}: ${lesson.title} — SKIPPED`);
        totalSkipped++;
        continue;
      }

      console.log(`  U${unitNumber}W${lesson.weekNumber}: ${lesson.title}`);

      if (!DRY_RUN) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            content: content as unknown as Record<string, unknown>,
          },
        });
        console.log(`    ✓ Updated`);
      } else {
        const advObjCount = content.ADVANCED.objectives.length;
        const stdObjCount = content.STANDARD.objectives.length;
        const vocObjCount = content.VOCATIONAL.objectives.length;
        const hasQuiz = content.ADVANCED.output.some(
          (b) => b.type === "quiz" && b.questions && b.questions.length > 0
        );
        console.log(
          `    [DRY RUN] Objectives: ADV=${advObjCount} STD=${stdObjCount} VOC=${vocObjCount} | Quiz: ${hasQuiz ? "YES" : "NO (project)"}`
        );
      }
      totalUpdated++;
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Updated: ${totalUpdated} | Skipped: ${totalSkipped}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
