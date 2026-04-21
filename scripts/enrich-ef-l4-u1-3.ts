import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DRY_RUN = false;
const COURSE_ID = "cmo78ofbp007lon5t3b44wmbv";

interface VocabWord {
  word: string;
  definition: string;
  example: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface PathwayContent {
  pathway: "ADVANCED" | "STANDARD" | "VOCATIONAL";
  objectives: string[];
  duration: number;
  input: {
    title: string;
    content: string;
    vocabularyWords: VocabWord[];
  };
  processing: {
    title: string;
    activities: string[];
  };
  output: {
    title: string;
    tasks: string[];
  };
}

interface ProjectPathwayContent {
  pathway: "ADVANCED" | "STANDARD" | "VOCATIONAL";
  objectives: string[];
  duration: number;
  input: {
    title: string;
    content: string;
    vocabularyWords: VocabWord[];
  };
  processing: {
    title: string;
    activities: string[];
  };
  output: {
    title: string;
    tasks: string[];
    rubric: { criterion: string; excellent: string; proficient: string; developing: string }[];
  };
}

interface LessonEnrichment {
  unitNumber: number;
  weekNumber: number;
  title: string;
  type: "INSTRUCTION" | "PROJECT";
  pathways: PathwayContent[] | ProjectPathwayContent[];
  quiz: QuizQuestion[];
}

const lessons: LessonEnrichment[] = [
  // ============================================================
  // UNIT 1: Test Strategies and Foundations
  // ============================================================
  {
    unitNumber: 1,
    weekNumber: 1,
    title: "Understanding Test Formats",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Analyze the structural differences among TOEFL iBT, IELTS Academic, and Duolingo English Test (DET) in terms of format, scoring, and strategic demands",
          "Evaluate which test format best aligns with individual academic goals and language profile",
          "Interpret scoring rubrics and subscores to identify targeted areas for improvement",
          "Articulate how each test measures different dimensions of English proficiency"
        ],
        duration: 90,
        input: {
          title: "Comparative Analysis of Major English Proficiency Tests",
          content:
            "As a French-speaking student preparing for university admission, understanding the architecture of each major English proficiency test is essential for strategic preparation. The three dominant assessments — TOEFL iBT, IELTS Academic, and the Duolingo English Test (DET) — differ significantly in format, scoring methodology, and the cognitive demands they place on test-takers.\n\nThe TOEFL iBT (Test of English as a Foreign Language, Internet-Based Test) underwent significant restructuring in 2024-2025. The current format features an adaptive Reading section lasting 30-48 minutes depending on performance, a Listening section of approximately 29 minutes, a Speaking section of about 8 minutes with four tasks, and a Writing section of roughly 23 minutes featuring an integrated task and an academic discussion task. The new scoring system uses a 1.0-6.0 scale per section, replacing the former 0-30 per-section model. For the University of the People (UoPeople), you need a minimum score of 61 on the legacy scale, which corresponds to approximately 3.5 on the new scale. The TOEFL is particularly challenging for French speakers because of its emphasis on academic English delivered at natural speed, requiring familiarity with stress-timed rhythm, reduced vowels (the schwa sound), and connected speech patterns that differ fundamentally from the syllable-timed rhythm of French.\n\nThe IELTS Academic (International English Language Testing System) maintains a four-part structure: Listening (30 minutes, 40 questions), Reading (60 minutes, 40 questions across three passages), Writing (60 minutes, two tasks), and Speaking (11-14 minutes, face-to-face interview). Scores are reported as bands from 0 to 9 in half-band increments, with an overall band score averaging the four components. UoPeople requires a minimum band of 6.0. A distinctive challenge for French speakers on IELTS is the True/False/Not Given question type in Reading. French academic tradition, rooted in Cartesian logic, tends toward binary thinking — something is either true or false. The IELTS distinction between 'False' (the passage contradicts the statement) and 'Not Given' (the passage provides no information) is conceptually foreign to French testing conventions and requires deliberate retraining of analytical habits.\n\nThe Duolingo English Test (DET) offers a fundamentally different experience: a computer-adaptive test lasting approximately 60 minutes, scored on a scale of 10-160, with four subscores — Literacy (reading and writing), Comprehension (reading and listening), Conversation (listening and speaking), and Production (writing and speaking). UoPeople requires a minimum score of 95. The DET's adaptive format adjusts difficulty in real time based on your responses, which can feel disorienting for students accustomed to the linear, predictable structure of the French baccalauréat. However, the DET's shorter duration and accessibility (taken at home on a computer) make it an attractive option.\n\nScripture reminds us, 'Getting wisdom is the wisest thing you can do! And whatever else you do, develop good judgment' (Proverbs 4:7). Strategic test selection is itself an exercise in wisdom — choosing the assessment that best showcases your abilities while addressing your specific growth areas as a French-English bilingual.",
          vocabularyWords: [
            { word: "adaptive", definition: "Adjusting difficulty based on a test-taker's performance in real time", example: "The DET uses an adaptive algorithm that presents harder questions after correct answers." },
            { word: "proficiency", definition: "A high degree of competence or skill in a particular area", example: "English proficiency tests measure your ability to function in academic English environments." },
            { word: "subscore", definition: "A component score within a larger test that measures a specific skill area", example: "The DET reports four subscores: Literacy, Comprehension, Conversation, and Production." },
            { word: "rubric", definition: "A scoring guide that defines criteria and performance levels for evaluation", example: "The TOEFL Speaking rubric evaluates delivery, language use, and topic development." },
            { word: "Cartesian", definition: "Relating to the logical, systematic method of thinking associated with French philosopher Descartes", example: "French students' Cartesian approach to logic can make the IELTS Not Given category confusing." },
            { word: "stress-timed", definition: "A speech rhythm pattern where stressed syllables occur at roughly equal intervals", example: "English is stress-timed, meaning unstressed syllables are compressed between beats, unlike French." },
            { word: "syllable-timed", definition: "A speech rhythm where each syllable takes approximately equal time", example: "French is syllable-timed, giving it a regular, even rhythm that differs from English." },
            { word: "baccalauréat", definition: "The French national secondary school examination taken at the end of lycée", example: "Unlike the baccalauréat's linear format, the DET adjusts difficulty as you answer." }
          ],
        },
        processing: {
          title: "Critical Comparison and Self-Assessment",
          activities: [
            "Create a detailed comparison matrix of TOEFL, IELTS, and DET across six dimensions: duration, cost, scoring, question types, availability, and specific challenges for French speakers",
            "Analyze the scoring requirements for UoPeople across all three tests and calculate which test offers the widest margin above the minimum threshold based on your current skill profile",
            "Write a 200-word analytical paragraph explaining why the True/False/Not Given distinction is particularly challenging for students trained in French academic logic, connecting this to broader differences in Anglophone versus Francophone epistemological traditions",
            "Evaluate sample questions from each test format and identify which question types leverage your bilingual strengths (e.g., cognate recognition) versus which exploit French-specific weaknesses (e.g., schwa perception)"
          ],
        },
        output: {
          title: "Strategic Test Selection Report",
          tasks: [
            "Write a 500-word analytical report recommending which test you should take first, supporting your choice with evidence from your comparison matrix and self-assessment",
            "Include a section analyzing how your French linguistic background creates both advantages and disadvantages for each test format",
            "Create a preliminary 4-week study timeline with specific daily targets for your chosen test"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Compare the structure and scoring of TOEFL iBT, IELTS Academic, and DET",
          "Identify the minimum score requirements for university admission",
          "Recognize test features that pose specific challenges for French speakers",
          "Select an appropriate test format based on personal strengths"
        ],
        duration: 70,
        input: {
          title: "Understanding the Three Major English Tests",
          content:
            "Choosing the right English proficiency test is one of the most important decisions you will make in your university preparation journey. Three tests dominate the landscape: TOEFL iBT, IELTS Academic, and the Duolingo English Test (DET). Each has a different format, scoring system, and set of challenges.\n\nThe TOEFL iBT has four sections. Reading takes 30-48 minutes and is now adaptive, meaning it adjusts to your level. Listening takes about 29 minutes. Speaking has four tasks in roughly 8 minutes. Writing includes two tasks in about 23 minutes. The new scoring uses a 1.0-6.0 scale for each section. For UoPeople, you need a score of at least 61 (on the traditional scale) or about 3.5 on the new scale. TOEFL is especially challenging for French speakers because English is 'stress-timed' — stressed syllables come at regular intervals while unstressed syllables get squeezed together. French is 'syllable-timed,' where every syllable gets equal time. This difference affects how well you understand natural-speed academic English.\n\nThe IELTS Academic has four parts: Listening (30 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11-14 minutes with a real examiner). Scores range from 0 to 9 in half-band steps. UoPeople requires a band of 6.0. One difficult question type for French speakers is 'True/False/Not Given.' In French academic culture, we think in terms of vrai ou faux — true or false. But IELTS adds a third option: 'Not Given' means the passage simply does not address the statement. This is not the same as 'False.' Learning this distinction requires practice.\n\nThe DET is a computer-adaptive test lasting about 60 minutes, scored from 10-160 with four subscores: Literacy, Comprehension, Conversation, and Production. UoPeople requires at least 95. The adaptive format means the test gets harder or easier based on your answers, which can feel very different from the predictable, linear format of the French baccalauréat.\n\nAs Proverbs 4:7 teaches us, 'Getting wisdom is the wisest thing you can do!' Choosing your test wisely is an act of good stewardship over your time and resources.",
          vocabularyWords: [
            { word: "adaptive", definition: "Adjusting difficulty based on how well the test-taker is performing", example: "The DET is adaptive, so it gets harder when you answer correctly." },
            { word: "proficiency", definition: "A high level of skill or ability in something", example: "All three tests measure English proficiency for academic settings." },
            { word: "subscore", definition: "A score for one specific part within a larger test", example: "The DET gives subscores for Literacy, Comprehension, Conversation, and Production." },
            { word: "stress-timed", definition: "A rhythm of speech where stressed syllables occur at regular intervals", example: "English stress-timed rhythm makes unstressed words hard to hear clearly." },
            { word: "band score", definition: "The scoring unit used in IELTS, ranging from 0 to 9", example: "A band score of 6.0 means you are a competent English user." },
            { word: "inference", definition: "A conclusion drawn from evidence rather than direct statement", example: "TOEFL Reading asks inference questions about what the author implies." },
            { word: "elimination", definition: "The process of removing incorrect options to find the correct answer", example: "Use process of elimination when unsure about a multiple-choice answer." },
            { word: "threshold", definition: "The minimum level required to achieve a particular result", example: "The score threshold for UoPeople is 61 on TOEFL." }
          ],
        },
        processing: {
          title: "Comparing Tests and Identifying Challenges",
          activities: [
            "Create a comparison chart listing each test's duration, number of sections, scoring system, and minimum score required for UoPeople",
            "List three specific challenges French speakers face on each test and explain why each challenge exists",
            "Review one sample question from each test and identify which felt most and least comfortable, explaining why"
          ],
        },
        output: {
          title: "My Test Selection Plan",
          tasks: [
            "Write a 300-word explanation of which test you plan to take and why, referencing at least three specific features that influenced your decision",
            "Create a simple study schedule for the next two weeks that addresses your biggest weakness for the chosen test"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Identify the three major English proficiency tests and their basic structures",
          "Understand the minimum scores needed for university admission",
          "Recognize which test challenges are related to being a French speaker"
        ],
        duration: 50,
        input: {
          title: "Getting to Know the English Tests",
          content:
            "Before you can prepare for an English test, you need to understand what each test looks like. There are three main tests you might take: TOEFL, IELTS, and DET (Duolingo English Test).\n\nThe TOEFL has four parts: Reading (30-48 minutes), Listening (about 29 minutes), Speaking (about 8 minutes), and Writing (about 23 minutes). Each section is scored from 1.0 to 6.0. For UoPeople, you need a total score of at least 61 on the old scale. TOEFL uses academic English spoken at normal speed, which can be hard because English rhythm is very different from French. In English, some words are stressed and others are squeezed together. In French, every syllable gets the same time.\n\nThe IELTS has four parts too: Listening (30 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11-14 minutes with a real person). Scores go from 0 to 9. You need at least a 6.0 for UoPeople. One tricky question type is 'True/False/Not Given.' As French speakers, we are used to things being either true or false. But 'Not Given' means the text simply does not talk about it — this is different from 'False,' and it takes practice to learn.\n\nThe DET is shorter — about 60 minutes — and you take it on your computer at home. It is scored from 10 to 160, and you need at least 95 for UoPeople. The test changes difficulty based on your answers, which might feel strange compared to French exams.\n\nProverbs 4:7 says, 'Getting wisdom is the wisest thing you can do!' Understanding these tests is the first step of wisdom in your preparation journey.",
          vocabularyWords: [
            { word: "proficiency", definition: "Being skilled or competent at something", example: "These tests measure your English proficiency for university." },
            { word: "adaptive", definition: "Changes based on how you are doing", example: "The DET is adaptive — it gets harder or easier based on your answers." },
            { word: "band score", definition: "The score unit used in IELTS, from 0 to 9", example: "You need a band score of 6.0 on IELTS for UoPeople." },
            { word: "stress-timed", definition: "A way of speaking where some syllables are louder and longer than others", example: "English is stress-timed, so words like 'the' and 'a' are often hard to hear." },
            { word: "threshold", definition: "The minimum amount needed", example: "The score threshold for UoPeople on DET is 95." },
            { word: "format", definition: "The way something is organized or arranged", example: "Each test has a different format with different types of questions." }
          ],
        },
        processing: {
          title: "Understanding the Basics",
          activities: [
            "Fill in a simple chart with each test's name, total time, number of parts, and the minimum score for UoPeople",
            "Circle or highlight which test feature sounds most challenging and write one sentence explaining why",
            "Match each test to one key fact: which one is taken at home, which one has a face-to-face interview, and which one is adaptive"
          ],
        },
        output: {
          title: "My First Impressions",
          tasks: [
            "Write a short paragraph (100-150 words) describing which test sounds most interesting to you and why",
            "List two things you want to learn more about before choosing a test"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "How long is the TOEFL iBT Reading section?", options: ["15-20 minutes", "30-48 minutes", "60 minutes", "90 minutes"], correctIndex: 1 },
      { question: "What is the IELTS band score range?", options: ["1-10", "0-9", "10-160", "1.0-6.0"], correctIndex: 1 },
      { question: "What minimum DET score does UoPeople require?", options: ["61", "75", "95", "120"], correctIndex: 2 },
      { question: "Why is 'True/False/Not Given' especially difficult for French speakers?", options: ["The vocabulary is too advanced", "French academic culture uses binary true/false thinking", "The passages are about unfamiliar topics", "French speakers cannot read fast enough"], correctIndex: 1 },
      { question: "What does 'adaptive' mean in the context of the DET?", options: ["The test is available in multiple languages", "The difficulty adjusts based on your answers", "You can choose which questions to answer", "The test gives immediate feedback"], correctIndex: 1 },
      { question: "What is the new TOEFL iBT scoring scale per section?", options: ["0-30", "0-120", "1.0-6.0", "0-9"], correctIndex: 2 },
      { question: "English is described as 'stress-timed.' What does this mean?", options: ["Every syllable takes the same time", "Stressed syllables occur at regular intervals", "Words are always pronounced fully", "Speakers pause between every word"], correctIndex: 1 },
      { question: "How long is the IELTS Speaking section?", options: ["5-8 minutes", "11-14 minutes", "20-25 minutes", "30 minutes"], correctIndex: 1 },
      { question: "Which test can be taken at home on a computer?", options: ["TOEFL iBT only", "IELTS Academic only", "Duolingo English Test", "All three tests"], correctIndex: 2 },
      { question: "What are the four DET subscores?", options: ["Reading, Writing, Listening, Speaking", "Literacy, Comprehension, Conversation, Production", "Grammar, Vocabulary, Fluency, Pronunciation", "Input, Processing, Output, Analysis"], correctIndex: 1 },
    ],
  },

  {
    unitNumber: 1,
    weekNumber: 2,
    title: "Time Management and Test-Taking Skills",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Design optimized pacing strategies for each section of TOEFL, IELTS, and DET",
          "Analyze the psychology of test anxiety and develop evidence-based mitigation strategies",
          "Evaluate the mathematical logic behind process of elimination and educated guessing",
          "Create a comprehensive practice allocation plan balancing all skill areas"
        ],
        duration: 90,
        input: {
          title: "Strategic Time Management and Test Psychology",
          content:
            "Mastering English proficiency tests demands more than language knowledge — it requires strategic time management, psychological resilience, and disciplined practice habits. The difference between a student who knows English well and a student who scores well often lies in these meta-cognitive skills.\n\nPacing is the foundation of test success. On the TOEFL Reading section (30-48 minutes, adaptive), you cannot control how many passages you receive, but you can control your approach. Allocate roughly 18-20 minutes per passage, spending no more than 1.5 minutes per question. The key insight is that the adaptive algorithm rewards accuracy over speed — a correct answer on a harder question is worth more than rushing through easy ones. For Listening (29 minutes), you hear each recording only once, so active note-taking is essential. Develop a shorthand system: arrows for cause/effect, stars for main ideas, question marks for speaker attitude. The Speaking section (8 minutes, 4 tasks) demands rapid organization — use the 15-30 second preparation time to sketch a two-point outline, not a script. For Writing (23 minutes), allocate 3 minutes for planning, 17 for writing, and 3 for revision on each task.\n\nIELTS pacing follows different logic because the test is not adaptive. Reading (60 minutes, 3 passages, 40 questions) gives you exactly 20 minutes per passage, or 1.5 minutes per question. However, passages increase in difficulty, so consider spending 15 minutes on Passage 1, 20 on Passage 2, and 25 on Passage 3. For Listening (30 minutes), you have time to read questions before each section begins — use every second of this preview time. The Speaking interview (11-14 minutes) feels conversational but is rigorously scored; practice expanding answers with reasons and examples rather than giving one-word responses.\n\nThe DET's adaptive format (60 minutes) creates a unique pacing challenge. Since difficulty adjusts in real time, you cannot predict how long any section will take. The strategy is to maintain consistent focus and not let a suddenly difficult question shake your confidence. Each question type has a fixed time limit, so work steadily within it.\n\nProcess of elimination is mathematically powerful. On a four-option multiple choice question where you have no idea, random guessing gives you a 25% chance. Eliminating one wrong answer raises it to 33%. Eliminating two raises it to 50%. This is why even partial knowledge has value. For French speakers, cognate awareness is a powerful elimination tool — if an English word resembles a French word, the meaning is often related (though beware false cognates like 'actually' which means 'en fait,' not 'actuellement').\n\nTest anxiety affects performance through a well-documented psychological mechanism. When the brain perceives threat, cortisol floods the prefrontal cortex, impairing working memory and analytical reasoning — precisely the skills tests demand. Philippians 4:6-7 offers both spiritual comfort and, remarkably, a strategy aligned with modern psychology: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds.' Cognitive behavioral research confirms that reframing anxiety as excitement, practicing gratitude, and engaging in intentional breathing exercises all reduce cortisol levels. Build a pre-test routine: 5 minutes of prayer, 3 minutes of deep breathing, and a brief review of your key strategies.\n\nPractice allocation should follow the 40/30/20/10 rule: spend 40% of study time on your weakest skill, 30% on your second weakest, 20% on maintenance of strengths, and 10% on full practice tests. For French speakers, listening typically demands the most practice due to the stress-timing challenge.",
          vocabularyWords: [
            { word: "meta-cognitive", definition: "Relating to awareness and understanding of one's own thought processes", example: "Meta-cognitive skills help you monitor your own test performance in real time." },
            { word: "pacing", definition: "The rate at which you move through tasks or sections of a test", example: "Good pacing ensures you have time for every question without rushing." },
            { word: "cortisol", definition: "A stress hormone that can impair cognitive function when produced in excess", example: "High cortisol levels during a test can reduce your ability to think clearly." },
            { word: "shorthand", definition: "A rapid, abbreviated method of writing used for note-taking", example: "Develop a shorthand system with symbols for common relationships like cause and effect." },
            { word: "reframing", definition: "Changing the way you interpret or think about a situation", example: "Reframing test anxiety as excitement can actually improve performance." },
            { word: "cognate", definition: "A word that has a similar form and meaning in two languages due to shared origin", example: "The English word 'important' and the French word 'important' are cognates." },
            { word: "false cognate", definition: "A word that looks similar in two languages but has a different meaning", example: "'Actually' looks like 'actuellement' but means 'en fait,' not 'currently.'" },
            { word: "allocation", definition: "The distribution of resources (such as time) for specific purposes", example: "Strategic allocation of study time means spending more time on weaker skills." }
          ],
        },
        processing: {
          title: "Strategic Planning and Psychological Preparation",
          activities: [
            "Create a minute-by-minute pacing plan for one complete section of your chosen test, including buffer time for difficult questions",
            "Analyze the mathematical impact of process of elimination: calculate exact probability improvements for 4-option and 5-option questions when eliminating 1, 2, or 3 options",
            "Design a personal pre-test anxiety management routine incorporating both spiritual practices and cognitive behavioral strategies",
            "Develop a 2-week practice schedule using the 40/30/20/10 allocation rule, specifying exact activities for each study session"
          ],
        },
        output: {
          title: "Comprehensive Test Strategy Guide",
          tasks: [
            "Write a 500-word personal test strategy document covering pacing, elimination techniques, anxiety management, and practice scheduling",
            "Include a self-assessment identifying your specific strengths and weaknesses as a French speaker taking English tests",
            "Create a one-page 'test day checklist' covering everything from the night before through the final question"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Apply pacing strategies appropriate to each major test format",
          "Use process of elimination to improve accuracy on multiple-choice questions",
          "Develop techniques for managing test anxiety",
          "Create a balanced practice schedule addressing all skill areas"
        ],
        duration: 70,
        input: {
          title: "Managing Your Time and Confidence on Test Day",
          content:
            "Knowing English well is not enough to score well on a proficiency test. You also need to manage your time wisely, use smart strategies for difficult questions, and keep your confidence steady throughout the test.\n\nTime management varies by test. On the TOEFL Reading section (30-48 minutes), aim for about 1.5 minutes per question. Do not spend too long on any single question — mark it and return if time allows. For Listening (29 minutes), take brief notes using symbols: arrows for cause and effect, stars for main ideas. You only hear each recording once, so stay focused. In Speaking (8 minutes), use your preparation time to organize two main points, not to write a full script. For Writing (23 minutes per task), plan for 3 minutes, write for 17, and revise for 3.\n\nOn IELTS Reading (60 minutes, 40 questions), divide your time as roughly 15, 20, and 25 minutes for the three passages, since difficulty increases. During IELTS Listening (30 minutes), use the preview time before each section to read the questions — this is one of the most valuable strategies available. In the Speaking interview, practice giving extended answers with reasons and examples rather than short responses.\n\nThe DET (60 minutes) has built-in time limits for each question type, so the strategy is to work steadily and not panic when questions suddenly become harder. That means the test is working correctly — it adjusts to your level.\n\nProcess of elimination is a powerful tool. With four choices and no idea, you have a 25% chance of guessing correctly. Eliminate one wrong answer, and you have 33%. Eliminate two, and you have 50%. As a French speaker, use cognate recognition to your advantage — many English academic words resemble French words. But watch out for false cognates like 'eventually' (which means 'finalement,' not 'éventuellement').\n\nTest anxiety is normal, but it can hurt your score by interfering with concentration. Philippians 4:6-7 reminds us: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' Practical techniques include deep breathing (inhale for 4 counts, hold for 4, exhale for 6), positive self-talk, and having a clear plan so you feel prepared.\n\nFor practice, follow the 40/30/20/10 rule: spend 40% of your study time on your weakest skill, 30% on your second weakest, 20% on maintaining strengths, and 10% on full practice tests.",
          vocabularyWords: [
            { word: "pacing", definition: "The speed at which you work through a test or section", example: "Good pacing means you finish all questions with a few minutes to spare." },
            { word: "elimination", definition: "Removing wrong answers to increase the chance of choosing correctly", example: "Process of elimination turned a wild guess into a 50% chance." },
            { word: "cognate", definition: "A word similar in form and meaning across two languages", example: "The English word 'university' and French 'université' are cognates." },
            { word: "false cognate", definition: "A word that looks similar between languages but means something different", example: "'Eventually' looks like 'éventuellement' but means 'finally.'" },
            { word: "buffer", definition: "Extra time set aside for unexpected difficulties", example: "Leave a 2-minute buffer at the end of each section for review." },
            { word: "allocation", definition: "How you divide and distribute your available time or resources", example: "Smart time allocation means spending more time on harder passages." },
            { word: "cortisol", definition: "A stress hormone that can make it harder to think clearly", example: "Deep breathing reduces cortisol and helps you focus during a test." },
            { word: "preview", definition: "To look at questions or material before the main task begins", example: "Previewing IELTS Listening questions gives you a significant advantage." }
          ],
        },
        processing: {
          title: "Practicing Strategies and Building Confidence",
          activities: [
            "Create a pacing plan for one section of your chosen test, showing how many minutes you would spend on each part",
            "Practice process of elimination on five sample multiple-choice questions, writing down your reasoning for each elimination",
            "Write a personal pre-test routine that includes both a calming activity and a review strategy"
          ],
        },
        output: {
          title: "My Test-Day Strategy Plan",
          tasks: [
            "Write a 350-word strategy plan covering how you will manage time, handle difficult questions, and stay calm during your test",
            "Create a weekly practice schedule for the next two weeks using the 40/30/20/10 rule"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Understand basic time management strategies for standardized tests",
          "Learn how to make educated guesses using elimination",
          "Identify simple techniques for reducing test anxiety"
        ],
        duration: 50,
        input: {
          title: "Smart Test-Taking Tips",
          content:
            "When you take an English proficiency test, knowing the language is only part of success. You also need to manage your time, use smart guessing strategies, and stay calm.\n\nTime management means knowing how long you have and dividing your time wisely. On TOEFL Reading, you get about 1.5 minutes per question. On IELTS Reading, you have 20 minutes per passage. On the DET, each question has its own time limit. The most important rule is: never spend too long on one question. If you are stuck, make your best guess and move on. You can often come back later.\n\nProcess of elimination helps when you are not sure of an answer. If there are four choices, removing even one wrong answer improves your chances from 25% to 33%. Look for answers that are clearly wrong — too extreme, off-topic, or contradicting what you read. As a French speaker, use what you know: many English words look like French words and have similar meanings. But be careful with 'false friends' like 'actually' (which means 'en fait,' not 'actuellement').\n\nTest anxiety happens to everyone. When you feel nervous, your body produces stress chemicals that make it harder to think. Simple techniques help: take five slow, deep breaths before starting. Remind yourself that you have prepared. As Philippians 4:6-7 says, 'Do not be anxious about anything' — bring your worries to God and trust His peace.\n\nFor practice, spend the most time on what is hardest for you. If listening is your weakest skill, practice it the most. If reading is strong, maintain it but do not neglect your weak areas.",
          vocabularyWords: [
            { word: "elimination", definition: "Removing wrong answers to find the right one", example: "Use elimination to cross out answers you know are wrong." },
            { word: "pacing", definition: "How fast you move through a test", example: "Good pacing means finishing all questions in time." },
            { word: "anxiety", definition: "A feeling of worry or nervousness", example: "Test anxiety can make it hard to concentrate." },
            { word: "cognate", definition: "A word that looks and means the same thing in two languages", example: "'Important' in English and French are cognates." },
            { word: "false friend", definition: "A word that looks similar in two languages but has a different meaning", example: "'Actually' is a false friend — it does not mean 'actuellement.'" },
            { word: "strategy", definition: "A plan for how to do something successfully", example: "Having a time management strategy helps you finish the test." }
          ],
        },
        processing: {
          title: "Trying Out the Strategies",
          activities: [
            "Practice elimination on three sample questions: cross out wrong answers and explain why they are wrong",
            "Write down three things you will do when you feel anxious during a test",
            "Make a simple time plan showing how you would divide 60 minutes across three reading passages"
          ],
        },
        output: {
          title: "My Test Tips Card",
          tasks: [
            "Create a small 'cheat sheet' (for study, not the test!) with your top 5 test-taking tips",
            "Write 2-3 sentences about which skill you need to practice most and how you plan to practice it"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "How much time should you spend per question on the TOEFL Reading section?", options: ["30 seconds", "1.5 minutes", "3 minutes", "5 minutes"], correctIndex: 1 },
      { question: "What does process of elimination do to your probability on a 4-option question if you remove one wrong answer?", options: ["Raises it to 50%", "Raises it to 33%", "Keeps it at 25%", "Raises it to 75%"], correctIndex: 1 },
      { question: "What is a 'false cognate'?", options: ["A word that has no translation", "A word that looks similar between languages but has a different meaning", "A word borrowed directly from another language", "A word that is spelled the same in every language"], correctIndex: 1 },
      { question: "What is the recommended practice allocation for your weakest skill?", options: ["10% of study time", "20% of study time", "30% of study time", "40% of study time"], correctIndex: 3 },
      { question: "What does the English word 'eventually' actually mean?", options: ["Possibly", "Currently", "Finally", "Occasionally"], correctIndex: 2 },
      { question: "What should you do during IELTS Listening preview time?", options: ["Close your eyes and relax", "Read the questions for the upcoming section", "Review your answers from the previous section", "Practice your note-taking symbols"], correctIndex: 1 },
      { question: "What Bible verse is referenced for managing test anxiety?", options: ["Proverbs 4:7", "Philippians 4:6-7", "Colossians 3:23", "Romans 8:28"], correctIndex: 1 },
      { question: "Why does test anxiety impair performance?", options: ["It makes you read more slowly", "Stress hormones interfere with memory and analytical thinking", "It causes physical illness", "It makes the test questions harder"], correctIndex: 1 },
      { question: "How should you use the TOEFL Speaking preparation time?", options: ["Write a complete script", "Organize two main points in an outline", "Practice pronunciation", "Read the question multiple times"], correctIndex: 1 },
      { question: "On the DET, why might questions suddenly become harder?", options: ["There is a glitch in the system", "You are running out of time", "The adaptive algorithm is adjusting to your correct answers", "The test is trying to trick you"], correctIndex: 2 },
    ],
  },

  {
    unitNumber: 1,
    weekNumber: 3,
    title: "Reading Strategies for Standardized Tests",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Apply advanced reading strategies specific to each test format's question types",
          "Analyze how TOEFL vocabulary-in-context questions differ from traditional vocabulary testing",
          "Master the IELTS True/False/Not Given framework by understanding its epistemological basis",
          "Evaluate DET interactive reading tasks and develop strategies for adaptive difficulty"
        ],
        duration: 90,
        input: {
          title: "Test-Specific Reading Strategies: A Deep Dive",
          content:
            "Reading on standardized English tests is fundamentally different from reading in everyday life or in the French academic tradition. Each test format demands specific strategies that go beyond general reading comprehension. Understanding these differences is critical for maximizing your score.\n\nTOEFL Reading presents academic passages similar to introductory university textbooks. The adaptive format means your experience may vary, but the question types remain consistent. Vocabulary-in-context questions ask you to determine a word's meaning based on surrounding text, not memorized definitions. This is crucial because English academic vocabulary often has multiple meanings depending on context — the word 'address,' for example, can mean a physical location, a speech, or the act of dealing with something. French speakers tend to reach for the most common translation of a word, but TOEFL rewards contextual flexibility. Reference questions ask what a pronoun or phrase refers to — a skill that requires tracking ideas across sentences. Factual information questions test direct comprehension, while inference questions require you to read between the lines. Rhetorical purpose questions ask why the author includes a particular detail — not what it says, but why it is there. Insert text questions require understanding paragraph cohesion and logical flow. Prose summary questions, which appear at the end of passages, test your ability to distinguish main ideas from supporting details.\n\nIELTS Academic Reading is where French speakers face their most distinctive challenge: True/False/Not Given (T/F/NG) and Yes/No/Not Given (Y/N/NG) questions. The key distinction is this: 'False' (or 'No') means the passage directly contradicts the statement. 'Not Given' means the passage simply does not provide enough information to determine whether the statement is true or false. For French speakers trained in the Cartesian tradition of binary logic, the idea that a statement can be neither confirmed nor denied feels intellectually uncomfortable. Consider this example: if a passage states 'The experiment was conducted in 2019,' and the statement reads 'The experiment was conducted in a European laboratory,' the answer is 'Not Given' — we know when but not where. The passage does not contradict the statement; it simply does not address it. Other IELTS question types include matching headings (requiring you to identify the main idea of each paragraph), sentence completion (requiring exact words from the passage), and summary completion (filling gaps in a condensed version of the passage).\n\nDET Reading tasks include Read and Select, where you identify real English words among invented ones — a task that rewards vocabulary breadth. Read and Complete requires filling in blanks in a passage, testing your grammatical intuition and contextual prediction. Interactive Reading presents comprehension questions in an adaptive format where difficulty shifts based on your accuracy. For French speakers, the Read and Select task can be tricky because many French-English cognates follow predictable spelling patterns (e.g., '-tion' endings), and the DET may include plausible-looking but nonexistent words that exploit these patterns.\n\nColossians 3:23 instructs us: 'Whatever you do, work heartily, as for the Lord and not for men.' This mindset transforms test preparation from a burden into an act of worship — doing your very best work as an offering to God.",
          vocabularyWords: [
            { word: "contextual", definition: "Relating to or determined by the surrounding circumstances or text", example: "Contextual vocabulary questions test whether you can determine meaning from surrounding sentences." },
            { word: "cohesion", definition: "The quality of fitting together logically and consistently", example: "Insert text questions test your understanding of paragraph cohesion and logical flow." },
            { word: "epistemological", definition: "Relating to the theory of knowledge and how we determine what is true", example: "The T/F/NG framework reflects a different epistemological approach than French binary logic." },
            { word: "rhetorical", definition: "Relating to the art of effective communication and persuasion", example: "Rhetorical purpose questions ask why the author included a specific detail." },
            { word: "inference", definition: "A conclusion reached by reasoning from evidence rather than explicit statement", example: "Making inferences requires reading between the lines of what is directly stated." },
            { word: "cognate pattern", definition: "A predictable spelling relationship between related words in two languages", example: "The '-tion' ending in English matches '-tion' in French, creating a recognizable cognate pattern." },
            { word: "prose summary", definition: "A condensed version of a passage's main ideas in paragraph form", example: "TOEFL prose summary questions require selecting the three most important ideas." },
            { word: "breadth", definition: "The range or scope of something, especially knowledge or vocabulary", example: "The DET Read and Select task rewards vocabulary breadth across many domains." }
          ],
        },
        processing: {
          title: "Applied Reading Strategy Practice",
          activities: [
            "Analyze three IELTS T/F/NG questions by categorizing each as False or Not Given and writing a detailed explanation of the logical difference in each case",
            "Practice TOEFL vocabulary-in-context strategy on five academic words that have multiple meanings, identifying how context determines which meaning applies",
            "Create a decision flowchart for approaching each IELTS Reading question type, including time allocation per type",
            "Evaluate how DET adaptive reading would challenge a French speaker accustomed to linear exam formats, and develop three specific coping strategies"
          ],
        },
        output: {
          title: "Reading Strategy Playbook",
          tasks: [
            "Write a 500-word reading strategy guide organized by test format, with specific techniques for each question type",
            "Include a special section on T/F/NG mastery with at least three practice examples showing the logical process",
            "Create a vocabulary-in-context practice exercise with five sentences where the same word has different meanings"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Apply reading strategies specific to TOEFL, IELTS, and DET formats",
          "Distinguish between IELTS 'False' and 'Not Given' answers with confidence",
          "Use context clues to determine vocabulary meaning on the TOEFL",
          "Practice DET interactive reading tasks effectively"
        ],
        duration: 70,
        input: {
          title: "Reading Strategies for Each Test",
          content:
            "Each English proficiency test has different types of reading questions, and each requires a different strategy. Let us look at what makes each test's reading section unique and how to approach it.\n\nTOEFL Reading uses academic passages about science, history, or social topics. The most important question types include: vocabulary in context (what does this word mean in this sentence?), reference questions (what does 'they' refer to?), factual questions (what does the passage say?), inference questions (what can we conclude?), and rhetorical purpose questions (why does the author include this detail?). For vocabulary-in-context questions, do not rely on memorized definitions. The word 'address' can mean a street location, a speech, or dealing with a problem — the surrounding sentences tell you which meaning is correct. This is important for French speakers who often translate to the first French meaning that comes to mind.\n\nIELTS Reading has a question type that is uniquely challenging for French speakers: True/False/Not Given. Here is the key: 'False' means the passage says the opposite of the statement. 'Not Given' means the passage does not discuss the topic at all. Example: If the passage says 'The study was published in 2020' and the statement is 'The study was funded by a university,' the answer is 'Not Given' — the passage tells us when it was published but says nothing about funding. In French education, we are trained to decide if something is true or false, but IELTS adds this third possibility that we must learn to recognize.\n\nDET Reading includes Read and Select (choosing real English words from a mix of real and fake words), Read and Complete (filling in missing parts of sentences), and Interactive Reading (answering comprehension questions that get harder or easier). The Read and Select task can trick French speakers because the test may include fake words that look like they could be English based on French spelling patterns.\n\nAs Colossians 3:23 teaches, 'Whatever you do, work heartily, as for the Lord' — approach each practice session with excellence and dedication.",
          vocabularyWords: [
            { word: "contextual", definition: "Based on the surrounding words or situation", example: "Contextual clues in the sentence help you determine the meaning of unfamiliar words." },
            { word: "inference", definition: "A conclusion based on evidence rather than direct statement", example: "Inference questions ask what the passage suggests but does not say directly." },
            { word: "rhetorical", definition: "Related to the techniques of effective communication", example: "Rhetorical purpose questions ask why the author chose to include a specific detail." },
            { word: "cohesion", definition: "How parts of a text fit together logically", example: "Good paragraph cohesion means each sentence connects smoothly to the next." },
            { word: "contradict", definition: "To say or show the opposite of something", example: "An answer is 'False' only when the passage directly contradicts the statement." },
            { word: "distinguish", definition: "To recognize or identify the difference between things", example: "You must distinguish between 'False' and 'Not Given' on IELTS." },
            { word: "adaptive", definition: "Changing difficulty based on performance", example: "DET Interactive Reading is adaptive — questions change based on your answers." },
            { word: "breadth", definition: "The wide range or variety of something", example: "The Read and Select task tests the breadth of your vocabulary knowledge." }
          ],
        },
        processing: {
          title: "Applying Reading Strategies",
          activities: [
            "Practice three IELTS T/F/NG questions and write the reasoning for each answer, focusing on the difference between 'False' and 'Not Given'",
            "Complete five TOEFL-style vocabulary-in-context questions where words have multiple possible meanings",
            "Identify three reading question types where your French background is helpful and three where it creates challenges"
          ],
        },
        output: {
          title: "My Reading Strategy Notes",
          tasks: [
            "Write a 350-word summary of your reading strategies for each test format, including at least one specific technique per test",
            "Create three original T/F/NG practice questions based on a short passage you write yourself"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Understand the main types of reading questions on TOEFL, IELTS, and DET",
          "Learn the difference between 'False' and 'Not Given' on IELTS",
          "Practice using context clues to understand unknown words"
        ],
        duration: 50,
        input: {
          title: "Reading Tips for English Tests",
          content:
            "Each English test asks reading questions in a different way. Knowing what to expect helps you prepare.\n\nOn the TOEFL, you read academic passages and answer questions about vocabulary, main ideas, and what the author means. For vocabulary questions, the test asks what a word means in that specific sentence. Do not just think of the first French translation — read the sentence carefully. For example, 'run' can mean courir, diriger, or fonctionner depending on the sentence.\n\nOn the IELTS, the hardest question type for French speakers is True/False/Not Given. Here is a simple way to understand it: 'True' means the passage says the same thing as the statement. 'False' means the passage says the opposite. 'Not Given' means the passage does not talk about this topic at all. Think of it like this: if someone asks you 'Did Marie eat lunch at school today?' and all you know is 'Marie went to school today,' the answer about lunch is 'Not Given' — you do not have enough information.\n\nOn the DET, one task asks you to pick real English words from a list that includes made-up words. This tests how many English words you recognize. Another task asks you to fill in missing words in sentences, which tests grammar and vocabulary together.\n\nColossians 3:23 says, 'Whatever you do, work heartily, as for the Lord.' Give your best effort in every practice session.",
          vocabularyWords: [
            { word: "context", definition: "The words and sentences around a word that help explain its meaning", example: "Use context to figure out what 'run' means in each sentence." },
            { word: "contradict", definition: "To say the opposite", example: "An IELTS answer is 'False' only when the passage contradicts the statement." },
            { word: "inference", definition: "A smart guess based on clues in the text", example: "If the passage says 'she grabbed an umbrella,' you can infer it was raining." },
            { word: "academic", definition: "Related to school, college, or studying", example: "TOEFL passages are academic — they come from university-level topics." },
            { word: "distinguish", definition: "To tell the difference between two things", example: "Learn to distinguish between 'False' and 'Not Given' on IELTS." },
            { word: "passage", definition: "A section of text that you read and answer questions about", example: "The TOEFL Reading section has several academic passages." }
          ],
        },
        processing: {
          title: "Practice Reading Skills",
          activities: [
            "Look at two True/False/Not Given examples and write the answer with a simple reason for each",
            "Read three sentences where the same word has different meanings and write the correct meaning for each",
            "List three reading strategies you want to remember on test day"
          ],
        },
        output: {
          title: "My Reading Strategies",
          tasks: [
            "Write a short paragraph (100-150 words) about which reading strategy is most helpful for you and why",
            "Create one True/False/Not Given question based on a sentence you write"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "On IELTS, what does a 'Not Given' answer mean?", options: ["The statement is false", "The passage says the opposite", "The passage does not provide enough information", "The question is poorly written"], correctIndex: 2 },
      { question: "What do TOEFL vocabulary-in-context questions ask you to do?", options: ["Memorize word lists", "Determine a word's meaning based on the surrounding text", "Translate words into French", "Choose the most common definition"], correctIndex: 1 },
      { question: "What is the difference between IELTS 'False' and 'Not Given'?", options: ["They mean the same thing", "'False' means the passage contradicts the statement; 'Not Given' means the passage does not address it", "'False' is for easy questions; 'Not Given' is for hard questions", "'False' is for opinions; 'Not Given' is for facts"], correctIndex: 1 },
      { question: "What does a TOEFL rhetorical purpose question ask?", options: ["What did the author say?", "Is the statement true?", "Why did the author include a specific detail?", "What does this word mean?"], correctIndex: 2 },
      { question: "What does the DET 'Read and Select' task test?", options: ["Reading speed", "Grammar knowledge", "Vocabulary breadth — recognizing real English words", "Pronunciation accuracy"], correctIndex: 2 },
      { question: "Why is the T/F/NG format especially challenging for French speakers?", options: ["French speakers read too slowly", "French academic tradition uses binary true/false logic without a 'not given' category", "French speakers do not understand English grammar", "The vocabulary is too advanced"], correctIndex: 1 },
      { question: "What is the best strategy for TOEFL vocabulary questions?", options: ["Always choose the most common meaning", "Look at the context of the surrounding sentences", "Translate the word to French first", "Skip them and come back later"], correctIndex: 1 },
      { question: "What does 'Read and Complete' test on the DET?", options: ["Vocabulary breadth only", "Listening skills", "Grammar and contextual prediction through fill-in-the-blank", "Speaking fluency"], correctIndex: 2 },
      { question: "Which Bible verse encourages us to 'work heartily' in our test preparation?", options: ["Philippians 4:6-7", "Proverbs 4:7", "Colossians 3:23", "Romans 12:2"], correctIndex: 2 },
      { question: "What is a TOEFL prose summary question?", options: ["Write a summary of the passage", "Select the three most important ideas from the passage", "Summarize the passage in your own words", "Find the topic sentence of each paragraph"], correctIndex: 1 },
    ],
  },

  {
    unitNumber: 1,
    weekNumber: 4,
    title: "Practice Test Analysis",
    type: "PROJECT",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Complete a full timed practice reading section from your chosen test format",
          "Conduct a detailed error analysis identifying patterns in mistakes",
          "Create an evidence-based study plan targeting specific weaknesses",
          "Evaluate your performance against UoPeople admission thresholds"
        ],
        duration: 90,
        input: {
          title: "From Practice to Mastery: Analytical Test Review",
          content:
            "Taking a practice test is only half the learning process — the real growth happens in the analysis afterward. A thorough practice test review transforms mistakes into strategic insights and builds the self-awareness necessary for targeted improvement.\n\nBegin by completing one full practice reading section under strict timed conditions. If you are preparing for TOEFL, use the official TOEFL Practice Online or free practice sets from ETS. For IELTS, use Cambridge IELTS practice books (available online). For DET, use the official Duolingo English Test practice at englishtest.duolingo.com. Simulate real test conditions: no phone, no dictionary, timed exactly, one sitting.\n\nAfter completing the section, review every question — not just the ones you got wrong. For correct answers, ask: 'Did I know this confidently, or did I guess?' For incorrect answers, classify each error. Was it a vocabulary gap (you did not know a key word)? A comprehension error (you misunderstood the passage)? A strategy error (you ran out of time or misread the question type)? A French-interference error (your French thinking pattern led you astray, as with T/F/NG)?\n\nThis error classification is essential because different error types require different remedies. Vocabulary gaps need systematic word study. Comprehension errors need more reading practice. Strategy errors need technique refinement. French-interference errors need specific awareness training.\n\nCreate a study plan that addresses your errors in priority order. A student who misses three T/F/NG questions, two vocabulary questions, and one time-management error should prioritize T/F/NG logic training, then vocabulary building, then pacing practice.\n\nProverbs 4:7 reminds us: 'Getting wisdom is the wisest thing you can do! And whatever else you do, develop good judgment.' Analyzing your practice test with honesty and precision is an exercise in the wisdom and good judgment that Scripture calls us to pursue.",
          vocabularyWords: [
            { word: "error analysis", definition: "The systematic study of mistakes to identify patterns and causes", example: "Error analysis revealed that most of her mistakes came from T/F/NG questions." },
            { word: "threshold", definition: "The minimum level needed to pass or achieve a goal", example: "Compare your practice score against the UoPeople admission threshold." },
            { word: "interference", definition: "When knowledge from one language incorrectly influences performance in another", example: "French interference caused him to choose 'False' when the correct answer was 'Not Given.'" },
            { word: "simulate", definition: "To recreate the conditions of a real event for practice", example: "Simulate real test conditions by timing yourself and removing distractions." },
            { word: "systematic", definition: "Done in an organized, methodical way following a plan", example: "Systematic vocabulary study is more effective than random word memorization." }
          ],
        },
        processing: {
          title: "Conducting Your Practice Test and Analysis",
          activities: [
            "Complete one full timed practice reading section under real test conditions, recording your start and end time for each passage",
            "Create an error classification chart categorizing every incorrect answer as vocabulary, comprehension, strategy, or French-interference",
            "Calculate your estimated score and compare it to the UoPeople threshold for your chosen test",
            "Identify the top three error patterns and rank them by frequency and impact on your score"
          ],
        },
        output: {
          title: "Practice Test Analysis and Study Plan",
          tasks: [
            "Write a comprehensive analysis report (500+ words) including your score, error classification breakdown, pattern analysis, and specific French-interference examples",
            "Create a 4-week study plan with daily activities that directly address your top three error patterns in priority order",
            "Design three custom practice exercises targeting your most frequent error type"
          ],
          rubric: [
            { criterion: "Error Analysis Depth", excellent: "Every question classified with detailed reasoning; clear pattern identification across error types", proficient: "Most questions classified; general patterns identified", developing: "Few questions classified; patterns unclear" },
            { criterion: "French-Interference Awareness", excellent: "Specific examples of L1 interference identified with linguistic explanation", proficient: "Some L1 interference noted", developing: "No awareness of L1 interference shown" },
            { criterion: "Study Plan Quality", excellent: "Detailed daily plan directly linked to error analysis with measurable goals", proficient: "General weekly plan with some connection to errors", developing: "Vague plan not connected to analysis" },
            { criterion: "Self-Reflection", excellent: "Honest, specific assessment of strengths and weaknesses with evidence from practice test", proficient: "General reflection on performance", developing: "Minimal reflection" }
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Complete a timed practice reading section from your chosen test",
          "Analyze your errors and identify patterns",
          "Create a focused study plan based on your results"
        ],
        duration: 70,
        input: {
          title: "Analyzing Your Practice Test",
          content:
            "The best way to improve your test score is to practice under real conditions and then carefully study your results. Taking a practice test tells you where you are; analyzing it tells you where to go.\n\nFirst, complete one reading section from your chosen test with a timer. Use official practice materials: ETS for TOEFL, Cambridge for IELTS, or the official DET practice site. No phone, no dictionary, strict time limits.\n\nAfter finishing, check your answers and look at every question — even the ones you got right. For wrong answers, figure out why you made the mistake. There are four main types of errors: vocabulary (you did not know a word), comprehension (you misunderstood the passage), strategy (you ran out of time or misread the question), and French interference (your French thinking led you to the wrong answer, especially on T/F/NG).\n\nOnce you see your patterns, create a study plan that focuses on your biggest weaknesses first. Proverbs 4:7 says, 'Getting wisdom is the wisest thing you can do!' Honest self-assessment is the beginning of wisdom in test preparation.",
          vocabularyWords: [
            { word: "error analysis", definition: "Studying your mistakes to find patterns", example: "Error analysis showed she needed more T/F/NG practice." },
            { word: "interference", definition: "When your first language causes mistakes in your second language", example: "French interference made the T/F/NG distinction harder to learn." },
            { word: "simulate", definition: "To copy real conditions for practice", example: "Simulate the test by timing yourself in a quiet room." },
            { word: "threshold", definition: "The minimum score needed", example: "Check if your practice score meets the UoPeople threshold." },
            { word: "pattern", definition: "A repeated occurrence that you can identify", example: "Finding patterns in your errors helps you study more efficiently." }
          ],
        },
        processing: {
          title: "Taking and Reviewing Your Practice Test",
          activities: [
            "Complete one timed reading section under test conditions",
            "Review all answers and classify each error as vocabulary, comprehension, strategy, or French interference",
            "Identify your two biggest error patterns"
          ],
        },
        output: {
          title: "My Practice Test Results and Plan",
          tasks: [
            "Write a 300-word report analyzing your practice test performance, including your score, main error patterns, and what surprised you",
            "Create a 2-week study plan that focuses on your two biggest weakness areas"
          ],
          rubric: [
            { criterion: "Error Analysis", excellent: "All errors classified with clear explanations", proficient: "Most errors classified", developing: "Few errors analyzed" },
            { criterion: "Self-Awareness", excellent: "Honest assessment of strengths and weaknesses with specific examples", proficient: "General reflection on performance", developing: "Minimal self-reflection" },
            { criterion: "Study Plan", excellent: "Specific daily activities linked to error patterns", proficient: "Weekly goals with some connection to errors", developing: "Vague plan" }
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Complete a short timed reading practice exercise",
          "Identify which questions were hardest and why",
          "Make a simple plan to improve"
        ],
        duration: 50,
        input: {
          title: "Practicing and Learning from Your Mistakes",
          content:
            "The best way to get better at test reading is to practice and then look at what went wrong. Even wrong answers teach you something valuable if you study them.\n\nTry a short reading practice — even 10-15 questions is enough to start. Use official free practice materials online. Time yourself and work without help.\n\nAfter finishing, check your answers. For each wrong answer, ask yourself: Did I not know a word? Did I misunderstand the passage? Did I run out of time? Did my French thinking confuse me? Understanding why you made a mistake is the first step to not making it again.\n\nProverbs 4:7 says wisdom is the most important thing you can get. Being honest about your mistakes is the wise way to study.",
          vocabularyWords: [
            { word: "analyze", definition: "To look at something carefully to understand it", example: "Analyze your wrong answers to find out why you made mistakes." },
            { word: "pattern", definition: "Something that repeats in a recognizable way", example: "If you keep missing vocabulary questions, that is a pattern." },
            { word: "practice", definition: "Doing something again and again to improve", example: "Regular practice with timed exercises builds your reading speed." },
            { word: "improve", definition: "To get better at something", example: "Studying your errors helps you improve faster." }
          ],
        },
        processing: {
          title: "Review Your Practice",
          activities: [
            "Complete a short timed reading exercise (10-15 questions)",
            "Look at your wrong answers and write down why you think you got each one wrong",
            "Circle the type of questions that were hardest for you"
          ],
        },
        output: {
          title: "What I Learned from Practice",
          tasks: [
            "Write a short paragraph (100-150 words) about what you learned from your practice test and what you want to improve",
            "List three specific things you will practice this week"
          ],
          rubric: [
            { criterion: "Self-Reflection", excellent: "Specific examples of what went wrong and what to improve", proficient: "General comments about performance", developing: "Minimal reflection" },
            { criterion: "Improvement Plan", excellent: "Three clear, specific practice activities", proficient: "Some practice ideas mentioned", developing: "Vague or no plan" }
          ],
        },
      },
    ] as ProjectPathwayContent[],
    quiz: [],
  },

  // ============================================================
  // UNIT 2: Test Reading Mastery
  // ============================================================
  {
    unitNumber: 2,
    weekNumber: 1,
    title: "TOEFL Reading Skills",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Master all seven TOEFL Reading question types with targeted strategies for each",
          "Analyze how the adaptive format affects question difficulty and pacing decisions",
          "Evaluate how French academic reading habits can be leveraged or must be adapted for TOEFL",
          "Apply advanced inference and rhetorical purpose analysis to university-level passages"
        ],
        duration: 90,
        input: {
          title: "Mastering TOEFL Reading: Question Types and Advanced Strategies",
          content:
            "The TOEFL Reading section presents a sophisticated assessment of academic reading ability through seven distinct question types, each targeting a different cognitive skill. Understanding the precise demands of each question type — and how your French academic training interacts with those demands — is essential for achieving a high score.\n\nVocabulary-in-context questions present a highlighted word in a passage and ask you to select the closest meaning. The critical insight is that TOEFL deliberately tests secondary or tertiary meanings of common words. The word 'yield,' for example, might mean 'produce' (as in a harvest), 'surrender,' or 'provide' (as in data). French speakers often default to the most common translation they learned first. Strategy: temporarily replace the highlighted word with each answer option and reread the sentence to see which maintains the passage's meaning.\n\nReference questions identify a pronoun, demonstrative, or phrase and ask what it refers to. These questions test your ability to track referential chains across sentences. French is often more explicit about referents through agreement markers (gender and number), while English relies heavily on context. Strategy: identify the referent by reading the preceding sentences carefully and checking that your answer agrees logically and grammatically.\n\nFactual information questions ask what the passage explicitly states. These are straightforward but require precise reading. French speakers sometimes add implicit knowledge from their background, answering what they know to be true rather than what the passage states. Strategy: always find the specific sentence that answers the question; the answer must be in the text.\n\nInference questions ask what can be concluded or implied from the passage. Unlike factual questions, the answer is not directly stated but is logically supported by evidence in the text. The French academic essay tradition (dissertation) trains strong analytical reasoning, which is an advantage here. Strategy: choose the answer that is most directly supported by passage evidence, avoiding extreme or overly broad conclusions.\n\nRhetorical purpose questions ask why the author includes a specific piece of information. This requires understanding the author's argumentative strategy, not just the content. Options typically include purposes like 'to illustrate,' 'to contrast,' 'to challenge,' or 'to provide evidence.' Strategy: identify the relationship between the highlighted detail and the surrounding argument.\n\nInsert text questions provide a new sentence and ask where it fits in a paragraph. This tests understanding of logical flow, cohesive devices (however, furthermore, for example), and paragraph organization. French paragraph structure differs from English — French often builds to the main point, while English typically states it first (topic sentence) and then supports it. Strategy: look for logical connectors in the new sentence and matching ideas in the surrounding text.\n\nProse summary questions appear at the end of a passage and ask you to select three sentences that capture the passage's main ideas from six options. Minor details and information not in the passage are distractors. Strategy: before reviewing options, mentally summarize the passage in three main points, then match your summary to the options.\n\n'Whatever you do, work heartily, as for the Lord and not for men' (Colossians 3:23). Approaching each question type with dedication and strategy is the path to excellence.",
          vocabularyWords: [
            { word: "tertiary", definition: "Third in rank or importance; a less common or less obvious meaning", example: "TOEFL often tests tertiary meanings of familiar words, not their most common usage." },
            { word: "referential", definition: "Relating to what a word or phrase points to or refers to", example: "Tracking referential chains means following what each pronoun refers to across sentences." },
            { word: "demonstrative", definition: "A word that points to something specific (this, that, these, those)", example: "The question asked what the demonstrative 'these' referred to in the third paragraph." },
            { word: "cohesive device", definition: "A word or phrase that connects ideas and creates flow in text", example: "Words like 'however,' 'furthermore,' and 'for example' are cohesive devices." },
            { word: "distractor", definition: "An incorrect answer option designed to appear plausible", example: "Prose summary distractors often contain true details that are too minor to be main ideas." },
            { word: "dissertation", definition: "In French education, a structured analytical essay following thesis-antithesis-synthesis format", example: "The French dissertation tradition develops strong analytical skills useful for TOEFL inference questions." },
            { word: "implicit", definition: "Suggested or understood without being directly stated", example: "Inference questions ask about implicit meaning that is supported by but not stated in the text." },
            { word: "connectors", definition: "Words that show relationships between ideas (cause, contrast, addition, example)", example: "Logical connectors like 'therefore' and 'in contrast' guide you to the correct insert-text location." }
          ],
        },
        processing: {
          title: "Question-Type Mastery Exercises",
          activities: [
            "For each of the seven question types, write a one-paragraph strategy summary explaining the cognitive skill tested, the common French-speaker pitfall, and the recommended approach",
            "Analyze five vocabulary-in-context items by identifying the tested word's multiple meanings and explaining how context determines the correct choice",
            "Practice three insert-text questions by identifying the cohesive devices and logical connections that determine placement",
            "Complete two prose summary exercises, first writing your own three-point summary before looking at the options, then comparing your summary to the available choices"
          ],
        },
        output: {
          title: "TOEFL Reading Mastery Guide",
          tasks: [
            "Write a 500-word TOEFL Reading strategy guide covering all seven question types with specific techniques and French-speaker adaptations",
            "Create five original vocabulary-in-context questions using words with multiple meanings, including answer keys with explanations",
            "Design a one-page quick-reference chart showing each question type, its strategy, and time allocation"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Identify and apply strategies for each TOEFL Reading question type",
          "Use context clues effectively for vocabulary questions",
          "Practice inference and rhetorical purpose questions",
          "Understand how to approach prose summary questions"
        ],
        duration: 70,
        input: {
          title: "TOEFL Reading Question Types and Strategies",
          content:
            "The TOEFL Reading section tests your ability to understand academic English through seven types of questions. Each type requires a slightly different approach.\n\nVocabulary-in-context questions highlight a word and ask what it means in that specific sentence. The trick is that common words often have unusual meanings in academic contexts. The word 'coin' usually means a piece of money, but in academic English it can mean 'to invent a new word or phrase.' Do not pick the first meaning you think of — read the sentence and try each answer option in place of the highlighted word.\n\nReference questions ask what a pronoun like 'it,' 'they,' or 'this' refers to. In French, pronouns often carry gender clues that help, but English pronouns are less specific. Read the sentences before the pronoun to find what it logically points to.\n\nFactual information questions ask what the passage directly states. The answer is always in the text — do not use outside knowledge. Find the specific sentence and match it to an answer option.\n\nInference questions ask what the passage implies or suggests. The answer is not stated directly but is supported by evidence. Your French analytical training (from writing dissertations) helps here — use the same logical reasoning.\n\nRhetorical purpose questions ask why the author includes a detail. Think about the author's goal: to give an example, to contrast ideas, to provide evidence, or to challenge an assumption.\n\nInsert text questions give you a sentence and ask where it fits in a paragraph. Look for connecting words like 'however,' 'furthermore,' or 'for example' — they tell you what comes before and after.\n\nProse summary questions ask you to choose three main ideas from six options. Before looking at the options, try to summarize the passage in your own words. Then match your ideas to the options. Avoid minor details.\n\nColossians 3:23 reminds us to 'work heartily' — apply this dedication to mastering each question type.",
          vocabularyWords: [
            { word: "rhetorical", definition: "Related to how language is used to persuade or communicate effectively", example: "Rhetorical purpose questions focus on why the author chose to include specific information." },
            { word: "inference", definition: "A conclusion drawn from evidence rather than direct statement", example: "Making an inference means reading between the lines of what is directly stated." },
            { word: "distractor", definition: "A wrong answer that is designed to look correct", example: "Prose summary distractors often include true but minor details." },
            { word: "referent", definition: "The thing that a pronoun or word refers to", example: "Finding the referent means identifying what 'it' or 'they' points to." },
            { word: "cohesive", definition: "Connected in a logical and consistent way", example: "Cohesive writing uses transition words to connect ideas smoothly." },
            { word: "imply", definition: "To suggest something without saying it directly", example: "The passage implies that the experiment failed, even though it does not say so directly." },
            { word: "contradict", definition: "To go against or say the opposite of something", example: "If your answer contradicts information in the passage, it is wrong." },
            { word: "tertiary", definition: "Third-level; less common", example: "TOEFL sometimes tests tertiary meanings of familiar words." }
          ],
        },
        processing: {
          title: "Practicing Each Question Type",
          activities: [
            "Practice three vocabulary-in-context questions by substituting each answer option into the sentence and choosing the best fit",
            "Complete two inference questions, writing down the specific evidence from the passage that supports your answer",
            "Try one insert-text question, identifying the connecting words that guide placement"
          ],
        },
        output: {
          title: "My TOEFL Reading Strategy Sheet",
          tasks: [
            "Write a 350-word summary of strategies for the TOEFL Reading question types, focusing on the three types you find most challenging",
            "Create a quick-reference card listing each question type and its key strategy in one sentence"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Recognize the main types of TOEFL Reading questions",
          "Practice using context clues for vocabulary questions",
          "Understand the difference between factual and inference questions"
        ],
        duration: 50,
        input: {
          title: "Understanding TOEFL Reading Questions",
          content:
            "The TOEFL Reading section asks different types of questions. Knowing what each type asks helps you answer more confidently.\n\nVocabulary questions highlight a word and ask what it means. The important thing is to look at the sentence around the word. Many English words have more than one meaning. For example, 'change' can mean money (like coins) or transformation. The sentence tells you which meaning is correct.\n\nFactual questions ask what the passage says. The answer is always written in the text somewhere. Find it and match it to one of the options.\n\nInference questions ask what the passage suggests but does not say directly. You need to use clues in the text to figure out the answer. Think of it like being a detective.\n\nThere are also questions about why the author includes certain information and where a new sentence should go in a paragraph. For these, think about how ideas connect to each other.\n\nColossians 3:23 says to 'work heartily' — give your best effort to each practice question.",
          vocabularyWords: [
            { word: "vocabulary", definition: "The words you know and use in a language", example: "Building vocabulary helps you understand TOEFL reading passages." },
            { word: "inference", definition: "A conclusion based on clues, not directly stated", example: "An inference is like a smart guess based on evidence." },
            { word: "context", definition: "The words and sentences surrounding a word that help explain it", example: "Use context to determine which meaning of a word is correct." },
            { word: "factual", definition: "Based on facts that are clearly stated", example: "Factual questions have answers you can find directly in the passage." },
            { word: "option", definition: "One of the choices in a multiple-choice question", example: "Read all four options before choosing your answer." },
            { word: "summary", definition: "A short version of the main ideas", example: "The last question type asks you to select the main ideas for a summary." }
          ],
        },
        processing: {
          title: "Try Some TOEFL Reading Questions",
          activities: [
            "Practice two vocabulary-in-context questions by reading the sentence carefully and choosing the best meaning",
            "Answer one factual question and one inference question, noting which was easier and why",
            "Write down one tip you want to remember for each question type"
          ],
        },
        output: {
          title: "What I Learned About TOEFL Reading",
          tasks: [
            "Write 100-150 words about which TOEFL question type you find easiest and which is hardest, and why",
            "List your top three strategies for TOEFL Reading in simple words"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "How should you approach TOEFL vocabulary-in-context questions?", options: ["Choose the most common meaning of the word", "Try each answer option in place of the highlighted word in the sentence", "Translate the word to French first", "Look for the word in another paragraph"], correctIndex: 1 },
      { question: "What is a 'rhetorical purpose' question asking?", options: ["What does the word mean?", "What does the passage say?", "Why did the author include this specific detail?", "Where does this sentence belong?"], correctIndex: 2 },
      { question: "In a TOEFL prose summary question, how many main ideas do you select?", options: ["Two", "Three", "Four", "Five"], correctIndex: 1 },
      { question: "What is the best way to answer a TOEFL factual information question?", options: ["Use your general knowledge", "Find the specific sentence in the passage that answers the question", "Make an inference based on the overall tone", "Choose the longest answer option"], correctIndex: 1 },
      { question: "What makes insert text questions challenging?", options: ["They test vocabulary", "They require understanding paragraph organization and cohesive devices", "They are always the last question", "They require memorization"], correctIndex: 1 },
      { question: "Why might a French speaker struggle with TOEFL reference questions?", options: ["French has no pronouns", "French pronouns carry gender and number clues that English pronouns often lack", "French speakers cannot track ideas across sentences", "Reference questions use advanced vocabulary"], correctIndex: 1 },
      { question: "What is a 'distractor' in a prose summary question?", options: ["A minor detail designed to look like a main idea", "A word you do not know", "The correct answer", "A question that is poorly written"], correctIndex: 0 },
      { question: "What is the best inference question strategy?", options: ["Choose the answer with the most extreme language", "Choose the answer most directly supported by evidence in the passage", "Choose the answer that matches your background knowledge", "Always choose the longest answer"], correctIndex: 1 },
      { question: "How does French paragraph structure differ from English?", options: ["French uses shorter paragraphs", "French often builds to the main point while English states it first", "There is no difference", "French does not use paragraphs"], correctIndex: 1 },
      { question: "What does 'cohesive device' mean in the context of reading?", options: ["A type of test question", "A word or phrase that connects ideas and creates logical flow", "A reading speed technique", "A vocabulary memorization method"], correctIndex: 1 },
    ],
  },

  {
    unitNumber: 2,
    weekNumber: 2,
    title: "IELTS Academic Reading Skills",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Master all major IELTS Academic Reading question types with precision strategies",
          "Develop advanced True/False/Not Given decision frameworks that overcome French binary logic",
          "Analyze the cognitive demands of matching headings and summary completion tasks",
          "Evaluate how French reading habits affect performance on time-pressured IELTS passages"
        ],
        duration: 90,
        input: {
          title: "IELTS Academic Reading: Advanced Mastery of Every Question Type",
          content:
            "The IELTS Academic Reading section presents three passages of increasing complexity within 60 minutes, testing a range of reading skills through diverse question types. For French speakers, certain question types align well with Francophone academic strengths, while others directly challenge deeply ingrained cognitive habits.\n\nTrue/False/Not Given (T/F/NG) and Yes/No/Not Given (Y/N/NG) remain the most conceptually challenging question types for French-speaking students. The distinction between these two variants is important: T/F/NG tests factual information (does the passage state this fact?), while Y/N/NG tests the writer's opinions or claims (does the writer believe this?). The critical French-speaker challenge lies in the 'Not Given' category. In the French baccalauréat and university examinations, questions are designed so that all information needed for an answer is present in the text. There is no tradition of 'insufficient information' as a valid answer category. To master this, develop a three-step decision framework: (1) Find the relevant section of the passage. (2) If the passage directly supports the statement, answer True/Yes. (3) If the passage directly contradicts the statement, answer False/No. (4) If the passage discusses the general topic but does not specifically address the claim in the statement, answer Not Given. The key principle: Not Given means the passage is silent on this specific point, not that you cannot determine the truth through reasoning. Resist the urge to use logic to deduce an answer — IELTS tests only what is written.\n\nMatching headings requires you to select the best heading for each paragraph from a list. This task tests your ability to identify the main idea of each paragraph quickly — a skill that aligns with the French tradition of identifying the thèse (thesis) of each section in a commentaire composé. Strategy: read the first and last sentences of each paragraph, form your own heading, then match it to the list. Cross out used headings to narrow options.\n\nSentence completion and summary completion require you to fill gaps with exact words from the passage, respecting a word limit (e.g., 'no more than two words'). French speakers sometimes paraphrase rather than copying exact words, which costs marks. Strategy: locate the relevant section, then copy the exact words that fit grammatically and respect the word limit.\n\nMultiple choice on IELTS may ask for one or more correct answers. Read the instructions carefully — 'Choose TWO answers' is different from 'Choose the best answer.' French speakers accustomed to one-correct-answer formats sometimes overlook multiple-answer questions.\n\nMatching information requires linking specific information to paragraphs. This is time-consuming because you may need to scan the entire passage for each statement. Strategy: do these questions last within a passage, after you have read it fully for other question types.\n\nDiagram/map/plan labeling asks you to label a visual using words from the passage. This is relatively straightforward for French speakers familiar with scientific diagrams, but the time pressure remains challenging.\n\n'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God' (Philippians 4:6-7). The peace that comes from preparation and prayer is your strongest asset on test day.",
          vocabularyWords: [
            { word: "ingrained", definition: "Deeply embedded as a habit or way of thinking through long practice", example: "Binary true/false logic is deeply ingrained in French academic training." },
            { word: "variant", definition: "A slightly different form of something", example: "T/F/NG and Y/N/NG are variants of the same basic question type with different purposes." },
            { word: "deduce", definition: "To reach a conclusion through logical reasoning", example: "On IELTS, do not deduce an answer that is not stated — only use what is written." },
            { word: "commentaire composé", definition: "A French literary analysis exercise requiring structured examination of a text", example: "The commentaire composé tradition builds strong paragraph analysis skills useful for matching headings." },
            { word: "paraphrase", definition: "To express the same meaning using different words", example: "IELTS sentence completion requires exact words, not paraphrases." },
            { word: "scan", definition: "To read quickly looking for specific information", example: "Scan the passage to locate the paragraph containing the matching information." },
            { word: "thèse", definition: "The main argument or thesis of a text or section", example: "Identifying the thèse of each paragraph helps with matching headings questions." },
            { word: "insufficient", definition: "Not enough to meet requirements or answer a question", example: "'Not Given' means the passage provides insufficient information to determine the statement's truth." }
          ],
        },
        processing: {
          title: "IELTS Reading Strategy Development",
          activities: [
            "Practice the four-step T/F/NG decision framework on six statements, writing detailed justification for each answer including why the other two options were eliminated",
            "Complete a matching headings exercise by first writing your own heading for each paragraph before consulting the list, then comparing your instincts to the correct answers",
            "Practice two sentence completion exercises, paying strict attention to word limits and the difference between copying exact text versus paraphrasing",
            "Analyze how French reading speed compares to English reading speed and develop strategies for the 20-minute-per-passage time constraint"
          ],
        },
        output: {
          title: "IELTS Reading Mastery Blueprint",
          tasks: [
            "Write a 500-word IELTS Reading strategy guide organized by question type, with specific French-speaker adaptations for T/F/NG, matching headings, and sentence completion",
            "Create a T/F/NG practice set of six statements based on a passage you write, with full answer explanations",
            "Design a timing strategy showing how to allocate 60 minutes across three passages of increasing difficulty"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Apply strategies for the main IELTS Reading question types",
          "Confidently distinguish between True, False, and Not Given answers",
          "Use effective techniques for matching headings and sentence completion",
          "Manage time effectively across three IELTS passages"
        ],
        duration: 70,
        input: {
          title: "IELTS Reading: Strategies for Every Question Type",
          content:
            "The IELTS Academic Reading section gives you 60 minutes for three passages and 40 questions. Each passage gets harder, so time management is important. Here are the main question types and how to approach them.\n\nTrue/False/Not Given (T/F/NG) is the most important question type to master. Remember the rule: 'True' means the passage says the same thing. 'False' means the passage says the opposite. 'Not Given' means the passage does not discuss this specific point. Here is a helpful test: can you point to a specific sentence that confirms or denies the statement? If you can point to a confirming sentence, the answer is True. If you can point to a contradicting sentence, it is False. If you cannot point to any sentence about this specific topic, it is Not Given. Do not use logic or outside knowledge — only what is in the text.\n\nThere is also Yes/No/Not Given, which is similar but tests the writer's views rather than facts. 'Yes' means the writer agrees with the statement. 'No' means the writer disagrees. 'Not Given' means the writer does not express an opinion on this point.\n\nMatching headings asks you to choose the best title for each paragraph. Strategy: read the first and last sentences of each paragraph to find the main idea. Then match it to a heading on the list.\n\nSentence completion requires you to fill gaps using exact words from the passage. The instructions will say something like 'no more than two words.' Be careful: use the exact words from the passage, and do not go over the word limit.\n\nMultiple choice may ask for one correct answer or sometimes two. Always read the instructions to know how many to select.\n\nFor timing, try spending about 15 minutes on Passage 1, 20 on Passage 2, and 25 on Passage 3, since difficulty increases.\n\nPhilippians 4:6-7 encourages us not to be anxious — with solid strategies and practice, you can approach IELTS Reading with confidence.",
          vocabularyWords: [
            { word: "contradict", definition: "To state the opposite of something", example: "The answer is 'False' when the passage contradicts the statement." },
            { word: "paraphrase", definition: "Saying the same thing in different words", example: "For sentence completion, use the exact words — do not paraphrase." },
            { word: "heading", definition: "A title that summarizes the main idea of a section", example: "Matching headings means choosing the best title for each paragraph." },
            { word: "scan", definition: "To look through text quickly for specific information", example: "Scan the passage to find where specific information is mentioned." },
            { word: "allocate", definition: "To set aside for a specific purpose", example: "Allocate more time to harder passages at the end." },
            { word: "sufficient", definition: "Enough to meet a need", example: "Is there sufficient information in the passage to answer this question?" },
            { word: "confirm", definition: "To verify or prove something is true", example: "Can you find a sentence that confirms the statement?" },
            { word: "implication", definition: "Something suggested but not directly stated", example: "Y/N/NG questions sometimes test the implications of the writer's views." }
          ],
        },
        processing: {
          title: "Practicing IELTS Reading Strategies",
          activities: [
            "Practice four T/F/NG questions using the 'can you point to a sentence?' test, writing your reasoning for each",
            "Complete a matching headings exercise for one passage, first writing your own heading for each paragraph",
            "Practice one sentence completion task, paying close attention to the word limit"
          ],
        },
        output: {
          title: "My IELTS Reading Strategy Notes",
          tasks: [
            "Write a 350-word strategy guide covering T/F/NG, matching headings, and sentence completion, with one tip for French speakers for each",
            "Create two original T/F/NG questions based on a short paragraph you write, with explanations"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Understand the main IELTS Reading question types",
          "Practice the True/False/Not Given distinction with simple examples",
          "Learn basic strategies for matching headings and filling in gaps"
        ],
        duration: 50,
        input: {
          title: "IELTS Reading Basics",
          content:
            "The IELTS Reading test has three reading passages and 40 questions. You have 60 minutes total. Here are the main question types.\n\nTrue/False/Not Given is the most important type to understand. 'True' means the passage says the same thing as the statement. 'False' means the passage says the opposite. 'Not Given' means the passage does not talk about this topic at all. A simple way to check: try to find a sentence in the passage about the statement. If you find one that agrees, it is True. If you find one that disagrees, it is False. If you cannot find any sentence about it, it is Not Given.\n\nMatching headings asks you to pick a title for each paragraph. Read the first sentence of each paragraph — it usually tells you the main idea.\n\nSentence completion asks you to fill in blanks with words from the passage. Use the exact words from the text and follow the word limit.\n\nPhilippians 4:6-7 says, 'Do not be anxious' — with practice, these question types become easier.",
          vocabularyWords: [
            { word: "passage", definition: "A section of text you read and answer questions about", example: "IELTS has three reading passages of increasing difficulty." },
            { word: "heading", definition: "A title that describes the main idea", example: "Choose the best heading for each paragraph." },
            { word: "contradict", definition: "To say the opposite", example: "If the passage contradicts the statement, the answer is False." },
            { word: "exact", definition: "Precisely correct, with no changes", example: "Use the exact words from the passage for sentence completion." },
            { word: "topic", definition: "The subject being discussed", example: "If the passage does not discuss the topic, the answer is Not Given." },
            { word: "limit", definition: "The maximum allowed", example: "Follow the word limit — if it says 'no more than two words,' do not write three." }
          ],
        },
        processing: {
          title: "Practice IELTS Basics",
          activities: [
            "Try three simple True/False/Not Given questions and write why you chose each answer",
            "Read a short paragraph and write your own heading for it in one phrase",
            "Fill in two blanks using exact words from a short passage"
          ],
        },
        output: {
          title: "My IELTS Notes",
          tasks: [
            "Write 100-150 words explaining the T/F/NG rule in your own words, with one example",
            "List two IELTS strategies you want to remember"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "What does 'Not Given' mean on IELTS T/F/NG questions?", options: ["The statement is false", "The passage contradicts the statement", "The passage does not provide information about this specific point", "The question cannot be answered"], correctIndex: 2 },
      { question: "What is the difference between T/F/NG and Y/N/NG on IELTS?", options: ["There is no difference", "T/F/NG tests facts; Y/N/NG tests the writer's opinions", "T/F/NG is harder than Y/N/NG", "T/F/NG is for Listening; Y/N/NG is for Reading"], correctIndex: 1 },
      { question: "For IELTS sentence completion, should you paraphrase?", options: ["Yes, always use your own words", "No, use the exact words from the passage", "It depends on the difficulty", "You can paraphrase if you keep the meaning"], correctIndex: 1 },
      { question: "What is the best strategy for matching headings?", options: ["Read the entire passage word by word first", "Read the first and last sentences of each paragraph to identify main ideas", "Match the shortest heading to the shortest paragraph", "Choose headings randomly and adjust later"], correctIndex: 1 },
      { question: "How should you allocate time across three IELTS Reading passages?", options: ["20 minutes each", "More time on earlier passages", "More time on later, harder passages (e.g., 15/20/25)", "All time on Passage 3"], correctIndex: 2 },
      { question: "Why do French speakers particularly struggle with T/F/NG?", options: ["They read too slowly", "French exams use binary true/false without a 'not given' category", "They do not understand English vocabulary", "French speakers do not practice reading"], correctIndex: 1 },
      { question: "What should you do if IELTS instructions say 'Choose TWO answers'?", options: ["Choose one answer only", "Select exactly two answers as instructed", "Choose three just to be safe", "Choose the first two options"], correctIndex: 1 },
      { question: "What is the 'point to a sentence' test for T/F/NG?", options: ["You must underline every sentence", "Check if you can identify a specific sentence that confirms or denies the statement", "Count the sentences in the passage", "Read only the first sentence of each paragraph"], correctIndex: 1 },
      { question: "How many questions total are in the IELTS Reading section?", options: ["20", "30", "40", "50"], correctIndex: 2 },
      { question: "What does 'matching information' require you to do?", options: ["Match headings to paragraphs", "Link specific information to the paragraphs where it appears", "Match synonyms to vocabulary words", "Connect questions to answers"], correctIndex: 1 },
    ],
  },

  {
    unitNumber: 2,
    weekNumber: 3,
    title: "DET Reading and Literacy Skills",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Master DET Read and Select strategy by understanding English morphological patterns versus French-English cognate traps",
          "Develop advanced Read and Complete techniques using grammatical prediction and contextual inference",
          "Analyze how the DET adaptive algorithm affects reading task difficulty and strategic approach",
          "Evaluate the unique advantages and challenges of the DET format for French-English bilingual test-takers"
        ],
        duration: 90,
        input: {
          title: "DET Reading Mastery: Adaptive Challenges and Bilingual Strategy",
          content:
            "The Duolingo English Test (DET) represents a paradigm shift in English proficiency testing, leveraging computer-adaptive technology to create a personalized assessment experience. For French speakers, the DET presents a unique mixture of advantages (shorter format, at-home convenience) and challenges (adaptive unpredictability, tasks designed to test authentic language knowledge over test-taking strategy).\n\nRead and Select presents a grid of words and asks you to identify which ones are real English words. The task seems simple but is designed with sophisticated linguistic traps. The DET includes invented words that follow plausible English morphological patterns — words like 'emplition' or 'resistful' that look like they could be English but are not. For French speakers, an additional layer of complexity exists: many real English words are French-English cognates ('information,' 'education,' 'revolution'), which makes you confident in selecting them. However, the DET may include fake words that exploit French-English patterns, such as invented words ending in '-tion,' '-ment,' or '-ance' that are not actual English words despite looking familiar. The strategy is twofold: (1) trust genuine recognition — if you have truly encountered the word before in English contexts, select it; (2) be suspicious of words that only look right because of French patterns but that you have never actually seen in English usage.\n\nRead and Complete presents passages with blanks where letters or words are missing, requiring you to fill them in. This task tests two competencies simultaneously: grammatical knowledge (what part of speech fits here?) and contextual prediction (what meaning fits the passage's logic?). The adaptive algorithm adjusts the difficulty of these passages — you may encounter anything from straightforward fill-in-the-blank to passages with multiple consecutive blanks that require strong inferential reading. French speakers have an advantage with academic vocabulary (many academic English words have French cognates), but may struggle with common English collocations and phrasal verbs that have no French equivalent. For example, filling in 'The results turned ___ to be significant' requires knowledge of the phrasal verb 'turn out,' which does not translate directly from French.\n\nInteractive Reading presents comprehension passages with questions that adapt in difficulty based on your performance. Unlike TOEFL or IELTS, where you can see all questions for a passage at once, DET presents them one at a time, adjusting difficulty dynamically. Strong performance on early questions triggers harder subsequent questions — which is actually a positive signal, as higher-difficulty questions contribute more to your score. The key psychological challenge for French students accustomed to the predictable, linear baccalauréat format is managing the emotional response to suddenly harder questions.\n\nThe DET's subscoring system — Literacy (reading + writing), Comprehension (reading + listening), Conversation (listening + speaking), and Production (writing + speaking) — means that reading tasks contribute to both your Literacy and Comprehension subscores. Strong reading performance thus positively impacts half of your overall profile.\n\nColossians 3:23 calls us to 'work heartily, as for the Lord' — approaching even the most challenging adaptive questions with diligence and trust in God's provision transforms test preparation into an act of faithful stewardship.",
          vocabularyWords: [
            { word: "paradigm shift", definition: "A fundamental change in approach or underlying assumptions", example: "The DET represents a paradigm shift from traditional paper-based proficiency tests." },
            { word: "morphological", definition: "Relating to the form and structure of words, including prefixes and suffixes", example: "Morphological patterns like '-tion' and '-ment' can trick French speakers into selecting fake words." },
            { word: "collocation", definition: "A combination of words that frequently occur together in natural usage", example: "English collocations like 'make a decision' (not 'do a decision') can be difficult for French speakers." },
            { word: "phrasal verb", definition: "A verb combined with a preposition or adverb that creates a meaning different from the original verb", example: "'Turn out' is a phrasal verb meaning 'to prove to be' — it cannot be guessed from 'turn' alone." },
            { word: "inferential", definition: "Based on drawing conclusions from evidence and reasoning", example: "Inferential reading skills help you fill in blanks when direct clues are limited." },
            { word: "dynamically", definition: "In a way that changes and adapts in response to conditions", example: "DET adjusts question difficulty dynamically based on your ongoing performance." },
            { word: "stewardship", definition: "The responsible management of resources entrusted to one's care", example: "Diligent test preparation is an act of stewardship over the abilities God has given us." },
            { word: "consecutive", definition: "Following one after another without interruption", example: "Advanced DET passages may have multiple consecutive blanks requiring strong language intuition." }
          ],
        },
        processing: {
          title: "DET-Specific Strategy Development",
          activities: [
            "Create a list of 20 real English words and 10 plausible-sounding fake words (following English morphological rules), then trade with a partner or check against a dictionary to test your Read and Select instincts",
            "Practice Read and Complete on five sentences with increasing difficulty, identifying whether you used grammar knowledge, contextual clues, or vocabulary recognition to fill each blank",
            "Analyze five English phrasal verbs that have no direct French equivalent (turn out, look into, come across, break down, carry out) and write sentences using each one",
            "Reflect on how the adaptive format psychologically affects your confidence compared to linear exams, and develop three mental strategies for maintaining composure when questions become harder"
          ],
        },
        output: {
          title: "DET Reading Strategy Portfolio",
          tasks: [
            "Write a 500-word DET Reading strategy guide covering Read and Select, Read and Complete, and Interactive Reading, with specific advice for French speakers on each task",
            "Create a 'French-English cognate trap' reference sheet listing 10 words that look like cognates but are false friends, and 10 genuine cognates to build confidence",
            "Design a mental preparation routine for the DET's adaptive format, addressing how to interpret increasing difficulty as a positive performance signal"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Understand and practice the three main DET reading task types",
          "Develop strategies for Read and Select that account for French-English cognate patterns",
          "Apply grammar and context skills to Read and Complete tasks",
          "Build confidence with the DET's adaptive question format"
        ],
        duration: 70,
        input: {
          title: "DET Reading Skills: What to Expect and How to Prepare",
          content:
            "The Duolingo English Test (DET) has reading tasks that are different from TOEFL and IELTS. Understanding each task type helps you prepare effectively.\n\nRead and Select shows you a list of words and asks you to click on the real English words. The tricky part is that the list includes fake words that look like they could be English. Some fake words are designed to trick French speakers — they might end in '-tion' or '-ment' like real French-English cognates, but they are actually invented. For example, 'resistful' looks like it could be a real word, but it is not. The strategy: only select words you have genuinely seen and used in English. If a word just 'looks right' because of French patterns but you have never encountered it in English reading, leave it.\n\nRead and Complete shows a passage with missing letters or words. You need to type the correct completions. This tests your grammar (knowing what type of word fits) and your vocabulary (knowing which specific word makes sense). French speakers do well with academic vocabulary but may struggle with common English phrases that do not translate from French. For example, 'She came ___ a great idea' needs 'up with' — a phrasal verb with no French equivalent.\n\nInteractive Reading gives you a passage with comprehension questions. Like the other DET tasks, the difficulty adapts to your level. If questions get harder, it means you are doing well — the test is trying to find your ceiling. Do not let harder questions discourage you.\n\nThe DET scores reading through two subscores: Literacy (reading + writing) and Comprehension (reading + listening). Strong reading helps both.\n\nColossians 3:23 reminds us to 'work heartily' — approach every DET practice session with full effort and trust.",
          vocabularyWords: [
            { word: "adaptive", definition: "Changing difficulty based on your performance", example: "The DET is adaptive — harder questions mean you are performing well." },
            { word: "cognate", definition: "A word that looks and means the same in two languages", example: "'Education' is a French-English cognate — it means the same in both languages." },
            { word: "phrasal verb", definition: "A verb + preposition combination with a special meaning", example: "'Come up with' is a phrasal verb meaning 'to think of or create.'" },
            { word: "morphological", definition: "Related to the structure and form of words", example: "Morphological patterns like '-tion' endings can trick you into thinking fake words are real." },
            { word: "authentic", definition: "Genuine, real, not fake", example: "Only select words you have authentically encountered in English reading." },
            { word: "completion", definition: "The act of filling in what is missing", example: "Read and Complete tasks test your ability to fill missing parts of text." },
            { word: "ceiling", definition: "The upper limit of your ability", example: "The adaptive test tries to find your ceiling by making questions progressively harder." },
            { word: "subscore", definition: "A component score within the overall test score", example: "Your Literacy subscore combines your reading and writing performance." }
          ],
        },
        processing: {
          title: "Practicing DET Reading Tasks",
          activities: [
            "Create a list of 10 real English words and 5 fake words that look plausible, then check your list against a dictionary",
            "Practice filling in five sentences with missing words, noting whether you used grammar or meaning to find the answer",
            "Write down three phrasal verbs you find difficult and create example sentences for each"
          ],
        },
        output: {
          title: "My DET Reading Strategies",
          tasks: [
            "Write a 300-word guide to DET reading tasks with one clear strategy for each task type",
            "Create a list of 5 words that might trick French speakers on Read and Select (fake words that look like cognates) and 5 real cognates you are confident about"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Understand the three DET reading task types",
          "Learn to identify real English words versus fake words",
          "Practice filling in missing words using clues from the sentence"
        ],
        duration: 50,
        input: {
          title: "DET Reading Tasks Explained Simply",
          content:
            "The Duolingo English Test (DET) has three types of reading questions. They are different from other tests, so let us learn about each one.\n\nRead and Select shows you a list of words. Some are real English words and some are fake. You click on the real ones. The trick is that some fake words look real because they follow patterns you recognize from French. For example, a fake word might end in '-tion' like a real word. Only choose words you are sure you have seen before in English.\n\nRead and Complete shows a passage with missing letters or words. You type what is missing. Think about what makes sense in the sentence. Use grammar clues (is it a noun, verb, or adjective?) and meaning clues (what makes sense here?).\n\nInteractive Reading shows a passage with questions. The questions get harder or easier based on your answers. If they get harder, that is good — it means you are doing well!\n\nColossians 3:23 says to 'work heartily' — do your best on every question.",
          vocabularyWords: [
            { word: "adaptive", definition: "Changes based on how you are doing", example: "The DET is adaptive — questions change to match your level." },
            { word: "fake", definition: "Not real; made up", example: "Some words in Read and Select are fake — they are not real English words." },
            { word: "pattern", definition: "A regular, repeated design or structure", example: "Some fake words follow the same patterns as real words to trick you." },
            { word: "clue", definition: "A hint that helps you find the answer", example: "Use grammar clues to figure out what type of word is missing." },
            { word: "interactive", definition: "Involving back-and-forth response between you and the computer", example: "Interactive Reading changes based on your answers." },
            { word: "recognize", definition: "To know something because you have seen it before", example: "Only select words you truly recognize from your English reading." }
          ],
        },
        processing: {
          title: "Try DET-Style Tasks",
          activities: [
            "Look at a list of 10 words (some real, some fake) and circle the real ones, then check your answers",
            "Fill in the missing word in three simple sentences using context clues",
            "Write down one thing that makes DET different from other tests"
          ],
        },
        output: {
          title: "My DET Notes",
          tasks: [
            "Write 100-150 words about which DET task seems easiest and which seems hardest for you",
            "List two things you will practice to prepare for the DET"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "What does the DET 'Read and Select' task ask you to do?", options: ["Read a passage and answer questions", "Identify real English words from a mix of real and fake words", "Select the correct meaning of a highlighted word", "Choose the best summary of a passage"], correctIndex: 1 },
      { question: "Why might fake words on Read and Select trick French speakers?", options: ["They are in French", "They follow French-English cognate patterns like '-tion' endings", "They are too long to read", "They use French grammar"], correctIndex: 1 },
      { question: "What does 'Read and Complete' test?", options: ["Speaking ability", "Grammar knowledge and contextual prediction through fill-in-the-blank", "Listening comprehension", "Handwriting speed"], correctIndex: 1 },
      { question: "What is a 'phrasal verb'?", options: ["A very long verb", "A verb + preposition combination with a special meaning", "A verb from French", "A verb used only in tests"], correctIndex: 1 },
      { question: "What does it mean when DET questions get harder?", options: ["You are failing the test", "The computer has a glitch", "You are performing well and the test is finding your ceiling", "You should stop and restart"], correctIndex: 2 },
      { question: "Which two DET subscores does reading contribute to?", options: ["Production and Conversation", "Literacy and Comprehension", "Speaking and Writing", "Grammar and Vocabulary"], correctIndex: 1 },
      { question: "What is the best strategy for Read and Select?", options: ["Select every word that looks familiar", "Only select words you have genuinely encountered in English", "Select words that end in '-tion'", "Select the longest words"], correctIndex: 1 },
      { question: "Why is 'come up with' challenging for French speakers?", options: ["It is a very long phrase", "It is a phrasal verb with no direct French equivalent", "French does not have verbs", "It uses advanced vocabulary"], correctIndex: 1 },
      { question: "How does the DET differ from the French baccalauréat format?", options: ["It is longer", "It is adaptive and unpredictable rather than linear and fixed", "It is only about literature", "It is handwritten"], correctIndex: 1 },
      { question: "What should you do when you see a word on Read and Select that 'looks right' but you have never actually seen it in English?", options: ["Select it confidently", "Leave it unselected — it may be a fake word exploiting French patterns", "Ask for help", "Skip the entire question"], correctIndex: 1 },
    ],
  },

  {
    unitNumber: 2,
    weekNumber: 4,
    title: "Reading Test Simulation",
    type: "PROJECT",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Complete timed reading sections from two different test formats under authentic conditions",
          "Conduct comparative performance analysis across test formats",
          "Evaluate which format best showcases your reading strengths",
          "Synthesize error patterns into an advanced targeted study plan"
        ],
        duration: 90,
        input: {
          title: "Cross-Format Reading Simulation and Analysis",
          content:
            "Having studied reading strategies for all three major test formats, you are now ready to put your skills to the test through a cross-format simulation. Completing reading sections from two different tests allows you to make an evidence-based comparison of your performance across formats, informing your final test selection.\n\nChoose two of the three tests (TOEFL, IELTS, or DET) and complete one full reading section from each under strictly timed conditions. Use official practice materials — ETS TOEFL Practice Online, Cambridge IELTS books, or the DET practice site. Maintain real test discipline: no phone, no dictionary, no breaks between questions, strict time limits.\n\nAfter completing both sections, conduct a comparative analysis. Compare your estimated scores on each format. Identify which question types you answered most confidently and which caused the most hesitation or error. Pay particular attention to French-interference patterns: Did T/F/NG questions cause errors on IELTS? Did the adaptive difficulty of DET cause anxiety? Did TOEFL vocabulary-in-context questions reveal over-reliance on first-meaning translations?\n\nThis simulation is not merely practice — it is a strategic intelligence-gathering exercise. The test you choose to take officially should be the one where your natural abilities and trained strategies combine for the strongest performance.\n\nRemember: 'Whatever you do, work heartily, as for the Lord and not for men' (Colossians 3:23). Your best effort in this simulation honors God and serves your future.",
          vocabularyWords: [
            { word: "simulation", definition: "A practice exercise that closely imitates real conditions", example: "A timed reading simulation prepares you for the pressure of the actual test." },
            { word: "comparative", definition: "Involving the analysis of similarities and differences", example: "Comparative analysis of two test formats reveals which better suits your abilities." },
            { word: "synthesize", definition: "To combine information from multiple sources into a coherent whole", example: "Synthesize your error patterns from both tests into one comprehensive improvement plan." },
            { word: "evidence-based", definition: "Supported by data and observable results rather than intuition", example: "An evidence-based test selection uses practice scores, not feelings, to choose the right test." },
            { word: "intelligence-gathering", definition: "The systematic collection of information for strategic decision-making", example: "This simulation serves as intelligence-gathering about your performance across formats." }
          ],
        },
        processing: {
          title: "Cross-Format Simulation and Analysis",
          activities: [
            "Complete one timed reading section each from two different tests under authentic conditions, recording exact times and marking confidence levels for each question",
            "Create a comparative performance chart showing estimated scores, strongest question types, weakest question types, and French-interference errors for each format",
            "Write a detailed analysis of how your French linguistic background affected your performance differently on each test",
            "Synthesize error patterns from both tests to identify universal weaknesses versus format-specific challenges"
          ],
        },
        output: {
          title: "Cross-Format Reading Analysis and Final Test Recommendation",
          tasks: [
            "Write a 500-word comparative analysis of your performance on both test formats, including scores, error patterns, and confidence levels",
            "Make a final test recommendation supported by evidence from your simulation results",
            "Create a 4-week intensive reading study plan targeting the specific weaknesses revealed across both test formats"
          ],
          rubric: [
            { criterion: "Simulation Authenticity", excellent: "Both sections completed under strict timed conditions with detailed documentation", proficient: "Both sections completed with timing but limited documentation", developing: "Incomplete simulation or no timing" },
            { criterion: "Comparative Analysis", excellent: "Detailed cross-format comparison with specific examples, scores, and error classification", proficient: "General comparison of performance on both formats", developing: "Minimal comparison" },
            { criterion: "Strategic Decision-Making", excellent: "Test recommendation strongly supported by simulation evidence and French-speaker analysis", proficient: "Recommendation with some supporting evidence", developing: "Recommendation without clear evidence" },
            { criterion: "Study Plan Quality", excellent: "Detailed daily plan targeting specific weaknesses from both simulations", proficient: "Weekly plan with general goals", developing: "Vague or generic plan" }
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Complete timed reading exercises from two test formats",
          "Compare your performance across the two formats",
          "Identify which format better suits your abilities"
        ],
        duration: 70,
        input: {
          title: "Reading Simulation: Testing Two Formats",
          content:
            "Now that you have studied reading strategies for TOEFL, IELTS, and DET, it is time to practice. Completing reading exercises from two different tests helps you compare and decide which format is best for you.\n\nChoose two tests and complete one reading section from each with a timer. Use free official practice materials online. Follow real test rules: no help, no dictionary, strict time limits.\n\nAfter finishing, compare your results. Which test felt easier? Where did you make the most mistakes? Did you notice any French-interference errors (like T/F/NG confusion or over-reliance on cognates)? Use your comparison to decide which test you want to focus on for official preparation.\n\nColossians 3:23 encourages us to 'work heartily' — give your best to this simulation and trust the results to guide your preparation.",
          vocabularyWords: [
            { word: "simulation", definition: "A practice that imitates real test conditions", example: "A reading simulation with strict timing prepares you for the real test." },
            { word: "compare", definition: "To examine similarities and differences", example: "Compare your scores on both tests to find which format suits you better." },
            { word: "format", definition: "The way a test is organized", example: "Each test has a different format with different question types." },
            { word: "interference", definition: "When your first language causes errors in your second language", example: "French interference may cause T/F/NG mistakes on IELTS." },
            { word: "official", definition: "Authorized or approved by the test creators", example: "Use official practice materials for the most accurate preparation." }
          ],
        },
        processing: {
          title: "Complete and Compare Two Reading Sections",
          activities: [
            "Complete one timed reading section from each of your two chosen tests",
            "Write down your estimated score and three observations about each test experience",
            "Compare your error patterns and note which test felt more comfortable"
          ],
        },
        output: {
          title: "My Reading Simulation Results",
          tasks: [
            "Write a 300-word comparison of your experience on both tests, including which felt easier, where you made mistakes, and which you prefer",
            "Create a 2-week reading practice plan focused on the test format you have chosen"
          ],
          rubric: [
            { criterion: "Completion", excellent: "Both sections completed under timed conditions", proficient: "Both attempted but timing was loose", developing: "Only one section completed" },
            { criterion: "Comparison Quality", excellent: "Specific examples of strengths and weaknesses on each format", proficient: "General comparison", developing: "Minimal comparison" },
            { criterion: "Study Plan", excellent: "Specific daily activities targeting identified weaknesses", proficient: "General weekly plan", developing: "Vague plan" }
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Complete a short timed reading exercise from two test formats",
          "Notice which format felt easier or harder",
          "Begin to choose your preferred test format"
        ],
        duration: 50,
        input: {
          title: "Trying Two Tests: Which Is Better for You?",
          content:
            "You have learned about TOEFL, IELTS, and DET reading. Now try short practice exercises from two of them to see which one you prefer.\n\nPick two tests. Do a short reading exercise from each (even 5-10 questions is helpful). Time yourself. No help, no dictionary.\n\nAfter finishing, think about which test felt more comfortable. Did one type of question feel easier? Did you finish on time? Did French confusion happen anywhere? Your answers will help you choose which test to prepare for.\n\nColossians 3:23 says to 'work heartily' — do your best in each practice attempt.",
          vocabularyWords: [
            { word: "practice", definition: "An exercise done to improve skills", example: "Practice reading exercises help you prepare for the real test." },
            { word: "prefer", definition: "To like one thing more than another", example: "Which test format do you prefer based on your practice?" },
            { word: "comfortable", definition: "Feeling at ease and confident", example: "Choose the test where you feel most comfortable." },
            { word: "attempt", definition: "A try at doing something", example: "Your first attempt at each test will show you what to expect." }
          ],
        },
        processing: {
          title: "Try Two Short Reading Exercises",
          activities: [
            "Complete a short timed reading exercise from each of your two chosen tests",
            "Write which test felt easier and why in 2-3 sentences",
            "Circle the question types that were most confusing"
          ],
        },
        output: {
          title: "Which Test Do I Prefer?",
          tasks: [
            "Write 100-150 words about which test you prefer and why",
            "List two things you will practice to prepare for your chosen test"
          ],
          rubric: [
            { criterion: "Completion", excellent: "Both exercises completed with timing", proficient: "Both attempted", developing: "Only one completed" },
            { criterion: "Reflection", excellent: "Clear reasons for test preference with specific examples", proficient: "General preference stated", developing: "Minimal reflection" }
          ],
        },
      },
    ] as ProjectPathwayContent[],
    quiz: [],
  },

  // ============================================================
  // UNIT 3: Test Listening Mastery
  // ============================================================
  {
    unitNumber: 3,
    weekNumber: 1,
    title: "TOEFL Listening Skills",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Master all TOEFL Listening question types including gist, detail, function, attitude, and organization",
          "Develop advanced note-taking systems optimized for academic lectures and conversations",
          "Analyze how stress-timed English rhythm and connected speech patterns challenge French speakers' listening comprehension",
          "Evaluate strategies for maintaining focus and comprehension during extended academic listening"
        ],
        duration: 90,
        input: {
          title: "TOEFL Listening Mastery: Academic Comprehension Under Pressure",
          content:
            "The TOEFL Listening section (approximately 29 minutes) presents academic lectures and campus conversations, testing your ability to comprehend natural-speed English in educational contexts. For French speakers, this section poses distinctive challenges rooted in fundamental differences between French and English phonological systems.\n\nTOEFL Listening includes five question types. Gist-content questions ask about the main topic or purpose of the lecture or conversation ('What is the lecture mainly about?'). Gist-purpose questions ask why a conversation is taking place ('Why does the student visit the professor?'). Detail questions test specific information mentioned in the recording. Function questions ask about the speaker's intent behind a specific statement — not what they said, but why they said it ('Why does the professor say this?'). This is followed by a replay of the specific segment. Attitude questions ask about the speaker's feelings or opinions, often revealed through tone of voice and word choice. Organization questions ask how the lecture is structured or why the professor presents information in a particular order.\n\nNote-taking is essential because you hear each recording only once. The challenge is taking useful notes while continuing to listen — a divided-attention task that requires a practiced system. Develop a personal shorthand: use arrows (→ for cause/effect, ↑ for increase, ↓ for decrease), stars (★ for main ideas), question marks (? for speaker uncertainty or student questions), and abbreviations. Write keywords, not sentences. Your notes should capture the structure of the lecture (main points and their relationship) more than individual facts.\n\nThe fundamental listening challenge for French speakers is that English is stress-timed while French is syllable-timed. In English, stressed syllables are pronounced clearly, but unstressed syllables are reduced to the schwa sound (/ə/) and compressed between stress beats. The sentence 'The PROfessor was TALK-ing a-BOUT the ex-PER-i-ment' has four stress beats with unstressed syllables squeezed between them. French speakers, accustomed to hearing every syllable distinctly, often miss unstressed function words (articles, prepositions, auxiliary verbs) and reduced syllables.\n\nConnected speech compounds this difficulty. In natural English, words blend together: 'going to' becomes 'gonna,' 'want to' becomes 'wanna,' 'did you' becomes 'didja,' and 'would have' becomes 'would've' or even 'woulda.' Word boundaries dissolve in rapid speech, so 'an ice cream' sounds like 'a nice cream.' French, by contrast, has liaison rules that are more predictable and systematic.\n\nAdditionally, English uses pitch and stress to convey meaning in ways French does not. The sentence 'I didn't say HE stole the money' versus 'I didn't SAY he stole the money' versus 'I didn't say he stole THE money' communicates three entirely different meanings through stress alone. Attitude and function questions on TOEFL directly test this prosodic awareness.\n\nThe strategy for improvement is deliberate: (1) Regular exposure to academic English lectures (TED-Ed, Coursera, university lecture recordings). (2) Shadowing exercises where you repeat what you hear immediately, matching the rhythm and stress patterns. (3) Dictation exercises where you write exactly what you hear, revealing which sounds and word boundaries you consistently miss. (4) Focused practice on reduced forms and connected speech.\n\n'Whatever you do, work heartily, as for the Lord' (Colossians 3:23). Listening practice requires patience and persistence, but faithful effort builds genuine comprehension over time.",
          vocabularyWords: [
            { word: "prosodic", definition: "Relating to the patterns of rhythm, stress, and intonation in speech", example: "Prosodic awareness helps you detect attitude and emphasis in TOEFL Listening passages." },
            { word: "schwa", definition: "The most common reduced vowel sound in English, represented as /ə/, found in unstressed syllables", example: "The 'a' in 'about' and the 'o' in 'professor' are both pronounced as schwa sounds." },
            { word: "shadowing", definition: "A language practice technique where you repeat speech immediately after hearing it", example: "Shadowing academic lectures improves your ability to process natural English rhythm." },
            { word: "dictation", definition: "The practice of writing down exactly what you hear", example: "Dictation exercises reveal which sounds and word boundaries you consistently miss." },
            { word: "liaison", definition: "In French phonology, the linking of a normally silent consonant to the next vowel-initial word", example: "French liaison rules are more predictable than English connected speech patterns." },
            { word: "function words", definition: "Small grammatical words (articles, prepositions, auxiliaries) that are typically unstressed in English", example: "Function words like 'the,' 'a,' and 'to' are often reduced to near-inaudible schwa sounds." },
            { word: "divided attention", definition: "The ability to focus on two tasks simultaneously", example: "Note-taking during listening is a divided-attention task requiring practice to master." },
            { word: "shorthand", definition: "A rapid system of abbreviated writing using symbols", example: "Develop a personal shorthand system so you can take notes without falling behind the speaker." }
          ],
        },
        processing: {
          title: "TOEFL Listening Deep Practice",
          activities: [
            "Listen to a 5-minute academic lecture (TED-Ed or similar) and take notes using a structured shorthand system, then review your notes to see if they capture the lecture's main points and structure",
            "Practice identifying function and attitude question scenarios by listening to three short academic exchanges and writing what the speaker's intent or feeling is in each",
            "Complete a connected speech dictation exercise: listen to a 1-minute passage at natural speed, write exactly what you hear, then compare to the transcript to identify missed reductions",
            "Analyze how English contrastive stress changes meaning by writing three versions of the same sentence with different stressed words and explaining each meaning"
          ],
        },
        output: {
          title: "TOEFL Listening Mastery Plan",
          tasks: [
            "Write a 500-word TOEFL Listening strategy guide covering all question types, note-taking systems, and French-specific listening challenges with solutions",
            "Create your personal shorthand key (at least 15 symbols/abbreviations) and demonstrate its use with notes from a practice lecture",
            "Design a 2-week daily listening practice schedule incorporating shadowing, dictation, and practice questions"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Identify and prepare for the main TOEFL Listening question types",
          "Develop an effective note-taking system for academic lectures",
          "Understand how English stress-timing affects listening comprehension",
          "Practice strategies for maintaining focus during extended listening"
        ],
        duration: 70,
        input: {
          title: "TOEFL Listening: Question Types and Note-Taking",
          content:
            "The TOEFL Listening section takes about 29 minutes and includes academic lectures and campus conversations. You hear each recording only once, so note-taking and focus are critical.\n\nThere are five main question types. Gist questions ask about the main topic or purpose ('What is the lecture mainly about?' or 'Why does the student visit the office?'). Detail questions ask about specific information from the recording. Function questions play back a short segment and ask why the speaker said it — not what they said, but their purpose. Attitude questions ask how the speaker feels about something, based on their tone and word choice. Organization questions ask about the structure of the lecture.\n\nNote-taking is essential because you only hear the audio once. Use symbols to write faster: arrows (→) for cause and effect, stars (★) for main ideas, and abbreviations for common words. Write keywords, not full sentences. Your goal is to capture the main ideas and their relationships.\n\nAs a French speaker, listening to natural-speed English is challenging because English has a different rhythm. In French, every syllable gets equal time (syllable-timed). In English, some syllables are stressed and clear while others are squeezed and reduced (stress-timed). The word 'university' is pronounced as something like 'yoo-nuh-VER-suh-tee' — the 'VER' is clear but other syllables are reduced. Small words like 'the,' 'a,' 'to,' and 'of' often become very quiet, almost invisible sounds.\n\nConnected speech makes this harder. In fast English, 'want to' becomes 'wanna,' 'going to' becomes 'gonna,' and words blend together. The good news: practicing with real academic English — TED talks, online courses, lecture recordings — gradually trains your ear.\n\n'Whatever you do, work heartily' (Colossians 3:23). Daily listening practice, even 15 minutes, builds real comprehension over time.",
          vocabularyWords: [
            { word: "gist", definition: "The main point or general meaning of something", example: "Gist questions ask about the overall topic or purpose of the lecture." },
            { word: "function", definition: "The purpose or role of something said", example: "Function questions ask why the speaker made a particular comment." },
            { word: "attitude", definition: "A speaker's feeling or opinion about something", example: "Listen to the speaker's tone of voice to determine their attitude." },
            { word: "stress-timed", definition: "A rhythm where stressed syllables come at regular intervals", example: "English stress-timed rhythm makes unstressed words hard to hear." },
            { word: "reduced", definition: "Made shorter, quieter, or less distinct in pronunciation", example: "Reduced syllables sound like 'uh' and are easy to miss." },
            { word: "shorthand", definition: "A quick way of writing using abbreviations and symbols", example: "Good shorthand lets you take notes without missing the lecture." },
            { word: "connected speech", definition: "How words blend together in natural, fast speaking", example: "In connected speech, 'did you' sounds like 'didja.'" },
            { word: "segment", definition: "A short section of audio replayed for a question", example: "Function questions replay a short segment and ask about the speaker's intent." }
          ],
        },
        processing: {
          title: "Practicing TOEFL Listening Skills",
          activities: [
            "Listen to a 3-4 minute talk (TED-Ed or similar) and take notes using symbols and abbreviations, then check if your notes capture the main points",
            "Practice identifying the purpose behind three statements (function questions) — write what the speaker meant, not just what they said",
            "Listen to a 1-minute clip and write down every word you hear, then compare to the transcript to find what you missed"
          ],
        },
        output: {
          title: "My TOEFL Listening Strategies",
          tasks: [
            "Write a 300-word guide to TOEFL Listening covering question types, note-taking tips, and your personal listening challenges",
            "Create your own shorthand key with at least 10 symbols and show how you would use them in notes"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Understand the basic TOEFL Listening format and question types",
          "Learn simple note-taking techniques for listening exercises",
          "Recognize why English listening is hard for French speakers"
        ],
        duration: 50,
        input: {
          title: "TOEFL Listening Basics",
          content:
            "The TOEFL Listening section is about 29 minutes long. You listen to lectures and conversations and answer questions about what you heard. You only hear each recording once, so paying attention is very important.\n\nThe main question types ask: What was the talk about? (main idea), What specific thing did the speaker say? (detail), Why did the speaker say that? (purpose), and How did the speaker feel? (attitude).\n\nTaking notes helps because you cannot replay the audio. Use simple symbols: a star for important ideas, an arrow for cause and effect, and abbreviations for long words. Write just the key words, not full sentences.\n\nListening is hard for French speakers because English squeezes some words together. In French, every syllable sounds clear. In English, small words like 'the' and 'to' become very quiet. Also, words blend together: 'want to' sounds like 'wanna.' The more you listen to English, the easier it gets.\n\nColossians 3:23 says to 'work heartily' — even 10 minutes of daily listening practice makes a difference.",
          vocabularyWords: [
            { word: "lecture", definition: "A talk given to teach about a subject", example: "TOEFL plays academic lectures for you to listen to." },
            { word: "detail", definition: "A specific piece of information", example: "Detail questions ask about specific facts from the recording." },
            { word: "purpose", definition: "The reason why someone does or says something", example: "Some questions ask the purpose of what the speaker said." },
            { word: "symbol", definition: "A mark or sign that represents something", example: "Use a star symbol to mark important ideas in your notes." },
            { word: "abbreviation", definition: "A shortened form of a word", example: "Write 'prof' as an abbreviation for 'professor' in your notes." },
            { word: "blend", definition: "To mix together so boundaries disappear", example: "In fast English, words blend together and are hard to separate." }
          ],
        },
        processing: {
          title: "Practice Listening and Note-Taking",
          activities: [
            "Listen to a short 2-minute video in English and write down three main ideas using simple notes",
            "Try to write exactly what you hear in a 30-second clip, then check what you missed",
            "Write three symbols you will use for note-taking and what each means"
          ],
        },
        output: {
          title: "My Listening Notes Plan",
          tasks: [
            "Write 100-150 words about what makes English listening hard for you and one thing you will try to improve",
            "Draw your personal note-taking symbol key with at least 5 symbols"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "How many times do you hear each recording in TOEFL Listening?", options: ["Once", "Twice", "Three times", "As many as needed"], correctIndex: 0 },
      { question: "What does a 'gist' question ask about?", options: ["A specific detail", "The main topic or purpose of the recording", "The speaker's attitude", "The structure of the lecture"], correctIndex: 1 },
      { question: "What is the 'schwa' sound in English?", options: ["A loud, clear vowel", "The most common reduced vowel sound in unstressed syllables", "A consonant blend", "A French pronunciation rule"], correctIndex: 1 },
      { question: "What does a TOEFL 'function' question ask?", options: ["What the speaker said", "Why the speaker said something specific", "How many functions the lecture covers", "What job the speaker has"], correctIndex: 1 },
      { question: "Why is English listening especially hard for French speakers?", options: ["English has more words", "English is stress-timed while French is syllable-timed, so unstressed syllables are reduced", "English uses a different alphabet", "French speakers cannot hear consonants"], correctIndex: 1 },
      { question: "What is 'connected speech'?", options: ["Speaking on the telephone", "How words blend together in natural, fast speech", "Speaking in complete sentences", "Reading aloud from a script"], correctIndex: 1 },
      { question: "What is the best note-taking strategy during TOEFL Listening?", options: ["Write every word you hear", "Use symbols and keywords to capture main ideas and structure", "Do not take notes — just listen", "Write in French and translate later"], correctIndex: 1 },
      { question: "What is 'shadowing' as a listening practice technique?", options: ["Following someone around", "Repeating speech immediately after hearing it to match rhythm and stress", "Reading a text silently", "Memorizing a script"], correctIndex: 1 },
      { question: "How does English contrastive stress change meaning?", options: ["It does not change meaning", "Different stressed words in the same sentence convey different meanings", "Louder speech is always more important", "Only the last word matters"], correctIndex: 1 },
      { question: "What do 'attitude' questions test?", options: ["Your attitude toward the test", "The speaker's feelings or opinions as revealed through tone and word choice", "The topic of the lecture", "Specific facts from the recording"], correctIndex: 1 },
    ],
  },

  {
    unitNumber: 3,
    weekNumber: 2,
    title: "IELTS Listening Skills",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Master all four IELTS Listening sections with strategies tailored to each section's increasing complexity",
          "Analyze how exposure to multiple English accents (British, Australian, American) affects comprehension",
          "Develop advanced strategies for fill-in-blank, map labeling, and multiple-answer question types",
          "Evaluate the impact of IELTS preview time and design a systematic approach to maximize its value"
        ],
        duration: 90,
        input: {
          title: "IELTS Listening Mastery: Four Sections, Multiple Accents, Strategic Preview",
          content:
            "The IELTS Listening section (approximately 30 minutes plus 10 minutes transfer time) presents four progressively complex sections with 40 questions total. Unlike TOEFL, IELTS audio plays once, but you receive preview time before each section — a strategic advantage that must be used deliberately.\n\nSection 1 features a social conversation between two speakers (e.g., someone booking a hotel or registering for a course). Questions are typically form-filling and short-answer. Section 2 is a monologue in a social context (e.g., a guide describing local facilities). Questions include matching and map/diagram labeling. Section 3 is an academic conversation between two to four speakers (e.g., students discussing a project). Questions include multiple choice and sentence completion. Section 4 is an academic monologue (a lecture), the most challenging section, with various question types including summary completion and classification.\n\nThe accent variety on IELTS is a significant variable. While TOEFL primarily uses North American English, IELTS features British, Australian, New Zealand, and North American accents. For French speakers who have primarily been exposed to one accent variety (often American through media), this diversity can be disorienting. British pronunciation features include: non-rhoticity in Received Pronunciation (the 'r' in 'car' is not pronounced, unlike American English), the broad 'a' in words like 'bath' (pronounced 'bahth' rather than American 'bæth'), and different vowel qualities in words like 'schedule' (British 'shedule' vs. American 'skedule'). Australian English features rising intonation on statements (which can be mistaken for questions) and distinctive vowel shifts.\n\nPreview time — the seconds before each section plays — is perhaps the most underutilized advantage on IELTS Listening. During preview, you should: (1) Read all questions for the upcoming section. (2) Underline key words that tell you what to listen for. (3) Predict what kind of information is needed (a number, a name, a place, a reason). (4) Note any spelling or grammatical constraints (e.g., 'no more than two words and/or a number'). Research shows that students who use preview time strategically score significantly higher than those who do not.\n\nFill-in-blank questions require exact answers that are grammatically correct and correctly spelled within the word limit. For French speakers, common spelling traps include words with double letters ('accommodation,' 'necessary,' 'professional') and words whose English spelling differs from French cognates ('address' vs. 'adresse,' 'apartment' vs. 'appartement').\n\nMap and diagram labeling questions ask you to match labels to locations on a visual using information from the audio. These require spatial vocabulary ('opposite,' 'adjacent to,' 'at the corner of,' 'between') that may differ from French spatial expressions.\n\nMultiple-answer questions require selecting more than one option. Careful reading is essential — if the question says 'Choose TWO letters,' selecting one or three is automatically wrong, even if your selections are otherwise correct.\n\n'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God' (Philippians 4:6-7). The combination of strategic preparation and trust in God's peace creates the ideal mindset for test-day performance.",
          vocabularyWords: [
            { word: "non-rhoticity", definition: "A pronunciation pattern where the 'r' sound is not pronounced after vowels", example: "In non-rhotic British English, 'car' sounds like 'cah' without the final 'r' sound." },
            { word: "intonation", definition: "The rise and fall of pitch in speech that conveys meaning or attitude", example: "Australian rising intonation on statements can confuse listeners who expect falling pitch." },
            { word: "spatial", definition: "Relating to space, position, and the relationship between objects", example: "Map labeling questions require understanding spatial vocabulary like 'adjacent' and 'opposite.'" },
            { word: "monologue", definition: "A long speech by one person", example: "IELTS Sections 2 and 4 feature monologues rather than conversations." },
            { word: "classification", definition: "Organizing information into categories or groups", example: "Classification questions ask you to match items to categories based on the lecture." },
            { word: "underutilized", definition: "Not used to its full potential", example: "Preview time is the most underutilized advantage — many students waste these precious seconds." },
            { word: "constraint", definition: "A limitation or restriction on what is allowed", example: "Word limit constraints on fill-in-blank questions require careful counting." },
            { word: "disorienting", definition: "Causing confusion about position or direction", example: "Unfamiliar accents can be disorienting if you have only practiced with one accent variety." }
          ],
        },
        processing: {
          title: "IELTS Listening Strategy Mastery",
          activities: [
            "Listen to recordings in British, Australian, and American accents (BBC, ABC Radio, NPR) for 5 minutes each, noting pronunciation differences that affected comprehension",
            "Practice the preview strategy on two IELTS Listening sections: read questions, underline key words, predict answer types, and note constraints before listening",
            "Complete five fill-in-blank questions, paying strict attention to spelling, word limits, and grammar",
            "Practice map labeling by listening to a description of a building layout and labeling a simple diagram using spatial vocabulary"
          ],
        },
        output: {
          title: "IELTS Listening Mastery Guide",
          tasks: [
            "Write a 500-word IELTS Listening strategy guide covering all four sections, accent challenges, preview technique, and French-speaker spelling traps",
            "Create an accent awareness reference noting five pronunciation differences between British and American English that could affect listening comprehension",
            "Design a 2-week listening practice schedule incorporating multi-accent exposure, preview practice, and fill-in-blank spelling drills"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Understand the structure and progression of the four IELTS Listening sections",
          "Develop effective preview strategies for IELTS Listening",
          "Practice fill-in-blank, multiple choice, and map labeling question types",
          "Build familiarity with different English accents"
        ],
        duration: 70,
        input: {
          title: "IELTS Listening: Four Sections and Key Strategies",
          content:
            "The IELTS Listening test has four sections with 10 questions each, for 40 questions total. You have about 30 minutes of audio plus 10 minutes to transfer answers to your answer sheet. Each section gets more difficult.\n\nSection 1 is an everyday conversation (like booking a room or signing up for a class). You fill in forms or answer short questions. Section 2 is a speech by one person about a practical topic (like a tour guide describing a place). You may label a map or match information. Section 3 is an academic conversation with 2-4 speakers (like students planning a project). Questions include multiple choice and sentence completion. Section 4 is an academic lecture — the hardest section — with various question types.\n\nOne key IELTS advantage is preview time: before each section plays, you get time to read the questions. Use this time wisely! Read each question, underline the key words that tell you what to listen for, and predict what type of answer is needed (a name, a number, a place, a reason). This preparation makes a big difference.\n\nIELTS uses different English accents — British, Australian, and sometimes American. This can surprise French speakers who are used to hearing mainly American English in movies and music. British English sounds different in many ways: 'schedule' becomes 'shedule,' and the 'r' in words like 'car' may disappear.\n\nFill-in-blank questions need exact spelling and must follow the word limit (like 'no more than two words'). French speakers should watch for spelling differences between French and English cognates: 'address' (not 'adresse'), 'apartment' (not 'appartement').\n\nPhilippians 4:6-7 reminds us not to be anxious — good preparation and trust in God bring confidence on test day.",
          vocabularyWords: [
            { word: "preview", definition: "To look at material before the main activity begins", example: "Use preview time to read questions before the audio plays." },
            { word: "transfer", definition: "To move something from one place to another", example: "You get 10 minutes to transfer your answers to the answer sheet." },
            { word: "accent", definition: "A distinctive way of pronouncing words associated with a region", example: "British and Australian accents sound different from American English." },
            { word: "spatial", definition: "Related to space and position", example: "Map labeling uses spatial words like 'opposite' and 'next to.'" },
            { word: "underline", definition: "To draw a line under important words", example: "Underline key words in questions during preview time." },
            { word: "predict", definition: "To say what you think will happen or be needed", example: "Predict whether the answer will be a name, number, or description." },
            { word: "progression", definition: "Moving forward through stages, usually increasing in difficulty", example: "IELTS Listening shows a clear progression from Section 1 (easiest) to Section 4 (hardest)." },
            { word: "constraint", definition: "A rule that limits what you can do", example: "Word limit constraints mean you must count your words carefully." }
          ],
        },
        processing: {
          title: "Practicing IELTS Listening Skills",
          activities: [
            "Practice the preview strategy on one IELTS Listening section: read questions, underline key words, and predict answer types before playing the audio",
            "Complete three fill-in-blank questions, checking your spelling carefully against a dictionary",
            "Listen to 3 minutes of British English and 3 minutes of American English, writing down words that sounded different"
          ],
        },
        output: {
          title: "My IELTS Listening Strategy Guide",
          tasks: [
            "Write a 300-word guide covering the four IELTS Listening sections, preview strategy, and accent awareness tips",
            "Create a personal spelling checklist of 10 words that are spelled differently in French and English"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Understand the four parts of the IELTS Listening test",
          "Learn to use preview time to read questions before listening",
          "Practice basic fill-in-blank and multiple choice listening questions"
        ],
        duration: 50,
        input: {
          title: "IELTS Listening: What to Expect",
          content:
            "The IELTS Listening test has four parts. You hear the audio once and answer 40 questions total. Each part gets harder.\n\nPart 1 is a conversation about everyday things (like making a reservation). Part 2 is one person talking about a practical topic (like describing a building). Part 3 is students talking about schoolwork. Part 4 is a lecture — the hardest part.\n\nBefore each part, you get time to read the questions. This is very important! Read each question and think about what kind of answer you need (a name? a number? a place?). This helps you know what to listen for.\n\nIELTS uses British, Australian, and American accents. They sound different from each other. The more you listen to different accents, the easier this becomes.\n\nFor fill-in-blank questions, spell carefully and follow the word limit. Some English words are spelled differently from French: 'address' (one 'd' at the start), 'apartment' (one 'p').\n\nPhilippians 4:6-7 says, 'Do not be anxious' — practice and trust bring confidence.",
          vocabularyWords: [
            { word: "reservation", definition: "An arrangement to have something saved for you (like a hotel room)", example: "Part 1 might have a conversation about making a reservation." },
            { word: "accent", definition: "The way people from a certain place pronounce words", example: "IELTS uses British and Australian accents, not just American." },
            { word: "preview", definition: "Looking at something before it starts", example: "Use preview time to read the questions before the audio plays." },
            { word: "lecture", definition: "A talk about an academic subject", example: "Part 4 is an academic lecture — the most challenging section." },
            { word: "spell", definition: "To write the letters of a word correctly", example: "Check your spelling carefully on fill-in-blank answers." },
            { word: "limit", definition: "The most that is allowed", example: "If the word limit is two, do not write three words." }
          ],
        },
        processing: {
          title: "Practice IELTS Listening Basics",
          activities: [
            "Read three IELTS-style questions and write what kind of answer each needs (name, number, place, reason)",
            "Listen to a 2-minute recording in English and write down five things you heard",
            "Practice spelling five words that are different in French and English (address, apartment, etc.)"
          ],
        },
        output: {
          title: "My IELTS Listening Tips",
          tasks: [
            "Write 100-150 words about what part of IELTS Listening seems hardest and what you will do to prepare",
            "List three things you will do during preview time before each section"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "How many sections does the IELTS Listening test have?", options: ["Two", "Three", "Four", "Five"], correctIndex: 2 },
      { question: "What accents are used in IELTS Listening?", options: ["Only American", "Only British", "British, Australian, and American", "Only French-accented English"], correctIndex: 2 },
      { question: "What should you do during IELTS Listening preview time?", options: ["Close your eyes and relax", "Read questions, underline key words, and predict answer types", "Start writing your answers", "Review the previous section"], correctIndex: 1 },
      { question: "Which IELTS Listening section is the most difficult?", options: ["Section 1", "Section 2", "Section 3", "Section 4"], correctIndex: 3 },
      { question: "What is the total number of IELTS Listening questions?", options: ["20", "30", "40", "50"], correctIndex: 2 },
      { question: "Why might British English be confusing for French speakers used to American English?", options: ["British English uses French words", "Pronunciation differences like non-rhotic 'r' and different vowel sounds", "British English is faster", "British English has different grammar"], correctIndex: 1 },
      { question: "What common spelling trap affects French speakers on fill-in-blank questions?", options: ["English words are shorter", "English uses different letters", "Cognates have different spellings (address vs. adresse)", "English has no accents on letters"], correctIndex: 2 },
      { question: "What does Section 1 of IELTS Listening typically feature?", options: ["An academic lecture", "A social conversation about everyday situations", "A group of students debating", "A formal presentation"], correctIndex: 1 },
      { question: "How many times do you hear each IELTS Listening recording?", options: ["Once", "Twice", "Three times", "Unlimited"], correctIndex: 0 },
      { question: "What is the extra 10 minutes at the end of IELTS Listening for?", options: ["Listening again", "Asking questions", "Transferring answers to the answer sheet", "Taking a break"], correctIndex: 2 },
    ],
  },

  {
    unitNumber: 3,
    weekNumber: 3,
    title: "Academic Lecture Comprehension",
    type: "INSTRUCTION",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Comprehend extended academic lectures with complex arguments and multiple perspectives",
          "Detect implicit meaning, speaker attitude, and hedging language in academic discourse",
          "Analyze how DET listening tasks assess academic comprehension through adaptive technology",
          "Synthesize strategies for processing complex academic audio across test formats"
        ],
        duration: 90,
        input: {
          title: "Advanced Academic Lecture Comprehension: Implicit Meaning and Speaker Attitude",
          content:
            "Academic lectures — whether encountered on the TOEFL, IELTS, or DET, or in actual university classrooms — demand a level of listening comprehension that goes far beyond understanding individual words. At the advanced level, you must simultaneously track complex arguments, detect implied meanings, identify speaker attitudes, and recognize discourse markers that signal the lecture's organizational structure.\n\nExtended lectures present multiple challenges. First, they develop arguments over time, with points made early in the lecture being essential for understanding conclusions drawn later. This demands sustained attention and effective note-taking that captures the argument's progression, not just individual facts. Second, academic speakers frequently use hedging language — expressions that soften claims or indicate uncertainty. Words like 'tend to,' 'might,' 'it appears that,' 'the evidence suggests,' and 'arguably' are ubiquitous in academic English but have no precise equivalents in French academic discourse, which tends toward more definitive statements. Detecting hedging is critical for attitude and function questions.\n\nImplicit meaning in academic lectures often operates through contrast, irony, and understatement. A professor who says 'Well, that is one way to interpret the data' with a particular intonation is implicitly suggesting the interpretation is inadequate. A speaker who says 'To put it mildly, the results were unexpected' is using understatement to convey that the results were shocking. French academic communication tends to be more direct in expressing disagreement or surprise, so French speakers may miss these subtle English academic conventions.\n\nSpeaker attitude in TOEFL is tested through function and attitude questions, often with a replayed segment. In IELTS, attitude is tested implicitly through multiple-choice questions about the speaker's view. On the DET, listening tasks may present academic content and test comprehension through adaptive questions that include attitude-related items.\n\nDET listening tasks are integrated with other skill areas in its subscore system. The Comprehension subscore (reading + listening) and the Conversation subscore (listening + speaking) both depend on listening ability. DET listening may present audio clips of varying length and complexity, with comprehension questions that adapt to your demonstrated ability. The adaptive format means that as you succeed, the lectures become denser, faster, and more nuanced.\n\nDiscourse markers — words and phrases that signal the structure of a lecture — are essential for comprehension. Markers like 'first,' 'on the other hand,' 'in conclusion,' 'what is particularly interesting is,' 'now, turning to,' and 'this brings us to' act as a roadmap for the lecture. French speakers familiar with structured arguments (thesis-antithesis-synthesis) can leverage this structural awareness, but must learn the English markers that signal these transitions.\n\n'Getting wisdom is the wisest thing you can do! And whatever else you do, develop good judgment' (Proverbs 4:7). Academic listening at this level is truly an exercise in wisdom — developing the discernment to hear not just words, but meaning, attitude, and argument.",
          vocabularyWords: [
            { word: "hedging", definition: "Using language that softens claims or expresses uncertainty", example: "Academic hedging words like 'tend to' and 'might suggest' indicate caution rather than certainty." },
            { word: "ubiquitous", definition: "Found everywhere; very common", example: "Hedging language is ubiquitous in English academic lectures but less common in French academic style." },
            { word: "understatement", definition: "Expressing something as less significant than it actually is", example: "'The results were somewhat surprising' is an understatement if the results overturned a major theory." },
            { word: "discourse marker", definition: "A word or phrase that signals how a lecture or text is organized", example: "'On the other hand' is a discourse marker signaling a contrasting point is coming." },
            { word: "nuanced", definition: "Having subtle differences or distinctions in meaning", example: "Advanced lectures require nuanced comprehension that goes beyond literal meaning." },
            { word: "sustained", definition: "Continued for an extended period without interruption", example: "Sustained attention during a 20-minute lecture is essential for catching implicit connections." },
            { word: "discernment", definition: "The ability to judge well and perceive things that are not obvious", example: "Discernment in listening means detecting speaker attitude through tone, word choice, and hedging." },
            { word: "progression", definition: "The development of an argument or idea through successive stages", example: "Track the progression of the lecturer's argument from claim to evidence to conclusion." }
          ],
        },
        processing: {
          title: "Advanced Listening Comprehension Exercises",
          activities: [
            "Listen to a 10-minute academic lecture (TED Talk or university recording) and take structured notes capturing the argument's progression, key evidence, and the speaker's attitude toward different claims",
            "Identify five instances of hedging language in the lecture and explain what each hedge communicates about the speaker's level of certainty",
            "Analyze three examples of implicit meaning or understatement in academic audio clips, writing what was said versus what was meant",
            "List 10 English discourse markers and categorize them by function: sequencing (first, then), contrasting (however, on the other hand), exemplifying (for instance), and concluding (in summary)"
          ],
        },
        output: {
          title: "Academic Listening Comprehension Portfolio",
          tasks: [
            "Write a 500-word guide to advanced academic listening covering sustained attention strategies, hedging detection, implicit meaning, and discourse marker recognition, with French-speaker specific advice",
            "Create a 'hedging language reference' with 15 hedging expressions, their meanings, and French equivalents (or note the lack thereof)",
            "Design a 2-week advanced listening practice schedule incorporating extended lectures, hedging analysis, and implicit meaning exercises"
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Follow extended academic lectures and track their main arguments",
          "Recognize hedging language and what it reveals about speaker certainty",
          "Identify speaker attitude through tone and word choice",
          "Use discourse markers to follow lecture organization"
        ],
        duration: 70,
        input: {
          title: "Understanding Academic Lectures: Arguments, Attitudes, and Organization",
          content:
            "On all three English tests, you may encounter academic lectures that develop complex ideas over several minutes. Understanding these lectures requires going beyond the words to grasp the speaker's argument, attitude, and organizational logic.\n\nExtended lectures build arguments step by step. The speaker introduces an idea, provides evidence, discusses counterarguments, and reaches a conclusion. Your job is to follow this progression. Good note-taking helps: capture the main claim, major evidence, and conclusion rather than every detail.\n\nHedging language is very common in English academic speech. Instead of saying 'This causes cancer,' a professor says 'This may contribute to cancer risk' or 'The evidence suggests a possible link.' These softer words (may, might, could, tend to, suggest, appear) show that the speaker is being cautious. French academic style is often more direct, so recognizing these soft signals takes practice.\n\nSpeaker attitude is tested on both TOEFL and IELTS. Listen for tone of voice (enthusiastic, skeptical, neutral), word choice (positive or negative language), and emphasis (which words are stressed). A speaker who says 'Interestingly enough...' is usually highlighting something they find surprising or important.\n\nDiscourse markers are signposts that tell you where the lecture is going. 'First' means a list is starting. 'However' means a contrast is coming. 'For example' introduces an illustration. 'In conclusion' signals the summary. Learning these markers helps you follow lectures even when the content is difficult.\n\nDET listening tasks also test academic comprehension through adaptive questions. As with DET reading, harder questions mean you are performing well.\n\nProverbs 4:7 says, 'Getting wisdom is the wisest thing you can do!' Developing strong academic listening skills is an investment in wisdom that serves you in tests and in university.",
          vocabularyWords: [
            { word: "hedging", definition: "Using cautious, softened language to express uncertainty", example: "'The data suggests' is hedging compared to the more definite 'The data proves.'" },
            { word: "discourse marker", definition: "A word or phrase that shows how a talk is organized", example: "'On the other hand' signals that a contrasting idea is coming." },
            { word: "skeptical", definition: "Doubtful or questioning about a claim", example: "A skeptical tone suggests the speaker does not fully believe what they are describing." },
            { word: "counterargument", definition: "An argument that opposes the main claim", example: "Academic lectures often present counterarguments before defending their main position." },
            { word: "progression", definition: "The step-by-step development of an idea", example: "Track the progression from introduction to evidence to conclusion." },
            { word: "emphasis", definition: "Extra stress placed on a word to highlight its importance", example: "The speaker's emphasis on 'significant' showed the result was important." },
            { word: "signpost", definition: "A signal that guides you through the structure of a talk", example: "Discourse markers are signposts that tell you what is coming next in a lecture." },
            { word: "cautious", definition: "Careful and avoiding definite claims", example: "English academic speakers are often more cautious in their language than French speakers." }
          ],
        },
        processing: {
          title: "Practicing Academic Listening Skills",
          activities: [
            "Listen to a 5-minute lecture and take notes that capture the main argument, key evidence, and conclusion",
            "Identify three examples of hedging language in the lecture and explain what each one tells you about the speaker's certainty",
            "List five discourse markers you heard and what each one signaled about the lecture's organization"
          ],
        },
        output: {
          title: "My Academic Listening Strategies",
          tasks: [
            "Write a 300-word guide to following academic lectures, covering note-taking for arguments, recognizing hedging, and using discourse markers",
            "Create a personal reference card with 10 discourse markers and their meanings"
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Follow the main idea of an academic lecture",
          "Recognize basic discourse markers that signal lecture organization",
          "Begin to notice when a speaker is uncertain or has a strong opinion"
        ],
        duration: 50,
        input: {
          title: "Following Academic Lectures",
          content:
            "On English tests and in university, you will listen to lectures — long talks about academic topics. Here are some tips to follow them better.\n\nFirst, listen for the main idea. What is the lecture about? What is the speaker trying to explain or prove? Take notes on the big ideas, not every small detail.\n\nSecond, listen for signpost words. 'First' means the speaker is starting a list. 'However' means they are about to say something different. 'For example' means they are giving an illustration. 'In conclusion' means they are finishing. These words help you follow the lecture like a map.\n\nThird, notice the speaker's feelings. If they say 'This is really important,' they are emphasizing something. If they say 'This might be true,' they are not sure. Words like 'might,' 'could,' and 'maybe' show uncertainty.\n\nDET listening tasks also use academic content and get harder as you do well.\n\nProverbs 4:7 says that getting wisdom is the most important thing — listening carefully is a way to gain wisdom.",
          vocabularyWords: [
            { word: "lecture", definition: "A long talk about an academic topic", example: "University professors give lectures to teach their students." },
            { word: "signpost", definition: "A word that tells you where a talk is going", example: "'However' is a signpost that means a different idea is coming." },
            { word: "emphasis", definition: "Giving extra importance to something", example: "When the speaker says 'This is crucial,' they are adding emphasis." },
            { word: "uncertainty", definition: "Not being sure about something", example: "Words like 'might' and 'could' express uncertainty." },
            { word: "conclusion", definition: "The final part of a lecture that summarizes the main points", example: "'In conclusion' signals the speaker is about to finish." },
            { word: "illustration", definition: "An example that helps explain an idea", example: "'For example' introduces an illustration of the main point." }
          ],
        },
        processing: {
          title: "Practice Following a Lecture",
          activities: [
            "Listen to a 3-minute talk and write down the main idea in one sentence",
            "Listen again and write down any signpost words you hear (first, however, for example, etc.)",
            "Write whether the speaker seemed certain or uncertain about their topic, and what clue told you"
          ],
        },
        output: {
          title: "My Lecture Listening Tips",
          tasks: [
            "Write 100-150 words about what helps you understand lectures and what is still difficult",
            "List five signpost words and what each one means"
          ],
        },
      },
    ] as PathwayContent[],
    quiz: [
      { question: "What is 'hedging language' in academic English?", options: ["Very formal vocabulary", "Language that softens claims and expresses uncertainty", "Slang used by professors", "Words that are hard to pronounce"], correctIndex: 1 },
      { question: "Which words are examples of hedging?", options: ["Always, definitely, certainly", "Might, suggest, tend to, appear", "First, second, finally", "However, but, although"], correctIndex: 1 },
      { question: "What is a 'discourse marker'?", options: ["A type of test question", "A word or phrase that signals lecture organization", "A listening technique", "A note-taking symbol"], correctIndex: 1 },
      { question: "What does the discourse marker 'however' signal?", options: ["An example is coming", "The lecture is ending", "A contrasting or different point is coming", "A list is starting"], correctIndex: 2 },
      { question: "Why is hedging language challenging for French speakers?", options: ["French has no soft language", "French academic style tends to be more direct and definitive", "French speakers do not recognize these words", "Hedging words are too advanced"], correctIndex: 1 },
      { question: "What is 'understatement' in academic speech?", options: ["Speaking too quietly", "Expressing something as less significant than it actually is", "Not understanding the topic", "Speaking very slowly"], correctIndex: 1 },
      { question: "How does the DET test listening comprehension?", options: ["With a separate 30-minute listening test", "Through adaptive listening tasks integrated with other skills", "It does not test listening", "With a face-to-face interview"], correctIndex: 1 },
      { question: "What should your notes capture during an extended lecture?", options: ["Every word the speaker says", "The main argument, key evidence, and conclusion", "Only vocabulary words you do not know", "The speaker's name and background"], correctIndex: 1 },
      { question: "If a speaker says 'The evidence suggests a possible link,' what does this mean?", options: ["There is a definite proven connection", "The evidence hints at a connection but is not certain", "There is no connection", "The evidence is wrong"], correctIndex: 1 },
      { question: "What does Proverbs 4:7 say about wisdom?", options: ["Wisdom is not important", "Getting wisdom is the wisest thing you can do", "Wisdom comes without effort", "Only adults need wisdom"], correctIndex: 1 },
    ],
  },

  {
    unitNumber: 3,
    weekNumber: 4,
    title: "Listening Test Simulation",
    type: "PROJECT",
    pathways: [
      {
        pathway: "ADVANCED",
        objectives: [
          "Complete timed listening simulations from TOEFL and IELTS formats under authentic test conditions",
          "Conduct detailed cross-format listening performance analysis",
          "Evaluate how French phonological interference patterns differ across listening task types",
          "Synthesize findings into a comprehensive listening improvement strategy"
        ],
        duration: 90,
        input: {
          title: "Cross-Format Listening Simulation: TOEFL and IELTS Under Test Conditions",
          content:
            "Having studied listening strategies for all three major test formats, you are now ready for a comprehensive listening simulation that will serve as both an assessment of your current abilities and a strategic planning tool.\n\nComplete one full TOEFL Listening section and one full IELTS Listening section under strict timed conditions. For TOEFL, use ETS official practice materials or TOEFL Practice Online. For IELTS, use Cambridge IELTS practice tests. Maintain absolute test discipline: no pausing, no replaying, no external help, strict time limits, and using your note-taking system.\n\nAfter completing both sections, conduct a multidimensional analysis. First, compare raw scores and estimated scaled scores. Second, classify errors by question type: which types of questions did you miss on each test? Third, analyze phonological interference: which listening errors were caused by French phonological patterns (stress-timing confusion, missing reduced forms, connected speech misunderstanding, accent unfamiliarity)? Fourth, evaluate your note-taking effectiveness: did your notes capture the essential information, or did you miss key points because you were writing too much or too little?\n\nThe goal is not just to measure your score but to build a precise map of your listening strengths and vulnerabilities. A student who scores similarly on both tests but misses different question types on each has different strategic options than a student who clearly performs better on one format.\n\n'Whatever you do, work heartily, as for the Lord and not for men' (Colossians 3:23). This simulation is an opportunity to give your absolute best effort and then learn honestly from the results.",
          vocabularyWords: [
            { word: "simulation", definition: "A practice exercise that closely recreates real test conditions", example: "The listening simulation uses strict timing and no-replay rules to mirror the actual test." },
            { word: "multidimensional", definition: "Involving several different aspects or factors", example: "A multidimensional analysis examines scores, error types, phonological patterns, and note-taking effectiveness." },
            { word: "phonological", definition: "Relating to the sound system of a language", example: "Phonological interference from French causes difficulty with English stress-timing and reduced forms." },
            { word: "vulnerability", definition: "A weakness or area susceptible to difficulty", example: "Identifying listening vulnerabilities allows you to target practice effectively." },
            { word: "scaled score", definition: "A raw score converted to a standardized scale for comparison", example: "Your scaled score on TOEFL Listening corresponds to a band on the 1.0-6.0 scale." }
          ],
        },
        processing: {
          title: "Cross-Format Listening Simulation and Analysis",
          activities: [
            "Complete one full TOEFL Listening section and one full IELTS Listening section under strict timed conditions with your note-taking system",
            "Create a cross-format performance comparison showing scores, error types, and question-type breakdowns for each test",
            "Analyze at least five listening errors for phonological interference, identifying the specific French pattern that caused each error",
            "Evaluate your note-taking system: review your notes from both tests and assess whether they captured the information needed to answer questions correctly"
          ],
        },
        output: {
          title: "Comprehensive Listening Analysis and Improvement Strategy",
          tasks: [
            "Write a 500-word comparative listening analysis covering both test formats, with specific error classification, phonological interference patterns, and note-taking evaluation",
            "Make a final test recommendation for the listening section based on your simulation results, with evidence-based justification",
            "Create a 4-week listening improvement plan targeting your top three weakness areas with specific daily activities (shadowing, dictation, accent exposure, practice tests)"
          ],
          rubric: [
            { criterion: "Simulation Authenticity", excellent: "Both sections completed under strict test conditions with detailed documentation", proficient: "Both sections completed with some timing flexibility", developing: "Incomplete simulation" },
            { criterion: "Error Analysis Depth", excellent: "Detailed cross-format comparison with phonological interference analysis and question-type breakdown", proficient: "General comparison of performance", developing: "Minimal analysis" },
            { criterion: "Note-Taking Evaluation", excellent: "Specific assessment of note-taking effectiveness with examples and improvement strategies", proficient: "General comments on note-taking", developing: "No note-taking evaluation" },
            { criterion: "Improvement Plan", excellent: "Detailed daily plan with specific activities targeting identified weaknesses", proficient: "Weekly plan with general goals", developing: "Vague or generic plan" }
          ],
        },
      },
      {
        pathway: "STANDARD",
        objectives: [
          "Complete timed listening exercises from TOEFL and IELTS",
          "Compare performance across the two formats",
          "Identify which listening format better suits your abilities"
        ],
        duration: 70,
        input: {
          title: "Listening Simulation: Comparing TOEFL and IELTS",
          content:
            "Now it is time to test your listening skills on both TOEFL and IELTS. Completing listening exercises from both tests helps you compare your performance and choose the best test for you.\n\nComplete one listening section from each test using official practice materials. Follow real test rules: no pausing, no replaying, strict timing. Use your note-taking system.\n\nAfter finishing, compare your results. Which test did you score better on? Which question types caused the most trouble? Did accent differences affect your IELTS performance? Did connected speech cause problems on TOEFL? Were your notes helpful?\n\nUse your comparison to decide which test's listening section suits you better and create a practice plan.\n\nColossians 3:23 encourages us to 'work heartily' — give your best effort to this simulation and trust the results to guide your preparation.",
          vocabularyWords: [
            { word: "simulation", definition: "A practice exercise under real test conditions", example: "The listening simulation tests your skills under time pressure." },
            { word: "compare", definition: "To look at similarities and differences", example: "Compare your TOEFL and IELTS scores to see which test suits you better." },
            { word: "performance", definition: "How well you do at a task", example: "Your listening performance depends on practice, strategy, and focus." },
            { word: "accent", definition: "The way people from a particular place pronounce words", example: "IELTS uses different accents that can affect your performance." },
            { word: "troublesome", definition: "Causing difficulty or problems", example: "Identify which question types were most troublesome and practice them." }
          ],
        },
        processing: {
          title: "Complete and Compare Listening Sections",
          activities: [
            "Complete one timed listening section from TOEFL and one from IELTS using official practice materials",
            "Write down your score and three observations about each test experience",
            "Note which question types were hardest and whether your notes helped"
          ],
        },
        output: {
          title: "My Listening Simulation Results",
          tasks: [
            "Write a 300-word comparison of your listening performance on both tests, including scores, challenges, and which test felt more manageable",
            "Create a 2-week listening practice plan focused on your weakest areas"
          ],
          rubric: [
            { criterion: "Completion", excellent: "Both listening sections completed under timed conditions", proficient: "Both attempted with some flexibility", developing: "Only one section completed" },
            { criterion: "Analysis Quality", excellent: "Specific examples of strengths and weaknesses on each test", proficient: "General comparison", developing: "Minimal analysis" },
            { criterion: "Practice Plan", excellent: "Specific daily activities targeting identified weaknesses", proficient: "General weekly goals", developing: "Vague plan" }
          ],
        },
      },
      {
        pathway: "VOCATIONAL",
        objectives: [
          "Complete short timed listening exercises from two test formats",
          "Notice which format felt easier or harder",
          "Identify what to practice to improve listening skills"
        ],
        duration: 50,
        input: {
          title: "Testing Your Listening Skills",
          content:
            "You have learned about TOEFL and IELTS listening. Now try short practice exercises from both to see which one works better for you.\n\nDo a short listening exercise from each test (even 10 questions from each is helpful). Follow the rules: do not pause the audio, do not replay, and time yourself. Take simple notes as you listen.\n\nAfter finishing, think about which test felt easier. Could you follow the speakers? Did the accents cause problems? Were your notes useful? Your answers help you decide which test to focus on.\n\nColossians 3:23 says to 'work heartily' — do your best in each practice.",
          vocabularyWords: [
            { word: "practice", definition: "An exercise done to build skills", example: "Listening practice with real test materials builds confidence." },
            { word: "focus", definition: "To concentrate on one thing", example: "Focus on the speaker's main idea, not every single word." },
            { word: "useful", definition: "Helpful for achieving something", example: "Were your notes useful for answering the questions?" },
            { word: "manageable", definition: "Not too difficult; something you can handle", example: "Choose the test whose listening section feels most manageable." }
          ],
        },
        processing: {
          title: "Try Two Listening Exercises",
          activities: [
            "Complete a short timed listening exercise from TOEFL and one from IELTS",
            "Write which test felt easier and why in 2-3 sentences",
            "Note one thing you want to practice more"
          ],
        },
        output: {
          title: "My Listening Practice Results",
          tasks: [
            "Write 100-150 words about which listening test felt more comfortable and what you found challenging",
            "List three things you will do this week to improve your listening"
          ],
          rubric: [
            { criterion: "Completion", excellent: "Both exercises completed with timing", proficient: "Both attempted", developing: "Only one completed" },
            { criterion: "Reflection", excellent: "Clear observations about strengths and challenges with examples", proficient: "General comments", developing: "Minimal reflection" }
          ],
        },
      },
    ] as ProjectPathwayContent[],
    quiz: [],
  },
];

async function main() {
  console.log("Enriching University-Ready English for French Speakers (B2 Mastery) — Units 1-3");
  console.log(`Course ID: ${COURSE_ID}`);
  console.log(`DRY_RUN: ${DRY_RUN}`);
  console.log(`Total lessons to enrich: ${lessons.length}`);
  console.log("");

  for (const unitNum of [1, 2, 3]) {
    const unitLessons = lessons.filter((l) => l.unitNumber === unitNum);
    console.log(`\n=== Unit ${unitNum}: ${unitLessons.length} lessons ===`);

    const unit = await prisma.unit.findFirst({
      where: { courseId: COURSE_ID, unitNumber: unitNum },
    });

    if (!unit) {
      console.error(`Unit ${unitNum} not found for course ${COURSE_ID}`);
      continue;
    }

    console.log(`Found unit: ${unit.title} (${unit.id})`);

    for (const lessonData of unitLessons) {
      const lesson = await prisma.lesson.findFirst({
        where: { unitId: unit.id, weekNumber: lessonData.weekNumber },
      });

      if (!lesson) {
        console.error(`  Lesson W${lessonData.weekNumber} not found in unit ${unitNum}`);
        continue;
      }

      console.log(`  W${lessonData.weekNumber}: ${lessonData.title} (${lessonData.type})`);

      const content = {
        pathways: lessonData.pathways,
        quiz: lessonData.quiz,
      };

      if (DRY_RUN) {
        console.log(`    [DRY RUN] Would update lesson ${lesson.id}`);
        const pathways = lessonData.pathways as PathwayContent[];
        for (const p of pathways) {
          const wordCount = [
            p.input.content,
            ...p.processing.activities,
            ...(("tasks" in p.output) ? (p.output as PathwayContent["output"]).tasks : []),
          ].join(" ").split(/\s+/).length;
          console.log(`    ${p.pathway}: ~${wordCount} words, ${p.input.vocabularyWords.length} vocab`);
        }
        console.log(`    Quiz: ${lessonData.quiz.length} questions`);
      } else {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            title: lessonData.title,
            type: lessonData.type,
            content: content as Record<string, unknown>,
          },
        });
        console.log(`    Updated lesson ${lesson.id}`);
      }
    }
  }

  console.log("\nDone!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
