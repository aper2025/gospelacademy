#!/usr/bin/env tsx
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve('.env.local') })
dotenv.config({ path: path.resolve('.env') })
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry-run')
const COURSE_ID = 'cmo78odkj0052on5t8s37l40l'

interface ContentBlock { type: string; [key: string]: unknown }
interface PathwayVariant { pathway: 'ADVANCED' | 'STANDARD' | 'VOCATIONAL'; title: string; estimatedMinutes: number; objectives: string[]; ipo: { input: ContentBlock[]; processing: ContentBlock[]; output: ContentBlock[] } }
interface VocabItem { term: string; definition: string; example: string }
interface QuizQuestion { question: string; options: string[]; correctAnswer: number; explanation: string }
interface EnrichedLesson { weekNumber: number; pathways: PathwayVariant[]; vocabulary: VocabItem[]; quiz: QuizQuestion[] }

// ============================================================
// UNIT 1: Academic Reading Skills
// ============================================================

const unit1Lessons: EnrichedLesson[] = [
  // W1: Skimming, Scanning, and Previewing (INSTRUCTION)
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Skimming, Scanning, and Previewing',
        estimatedMinutes: 80,
        objectives: [
          'Apply skimming techniques to identify the gist of academic texts quickly and accurately',
          'Use scanning strategies to locate specific information within dense academic articles',
          'Preview text structure, headings, and visual aids to build a reading roadmap before deep reading',
          'Compare French and English academic text structures and adapt reading strategies accordingly'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'How do skilled academic readers process hundreds of pages of research efficiently without reading every single word?' },
            { type: 'reading', title: 'Strategic Reading in the Academic World', content: 'Academic reading is fundamentally different from casual reading. University students and researchers routinely face hundreds of pages of dense material each week. To manage this volume, they rely on three core strategies: skimming, scanning, and previewing. These are not shortcuts that sacrifice comprehension but rather sophisticated cognitive tools that allow readers to build mental frameworks before engaging deeply with a text.\n\nSkimming involves reading quickly to grasp the general idea or gist of a passage. When skimming, a reader moves their eyes rapidly over the text, focusing on titles, first sentences of paragraphs, concluding sentences, and any bold or italicized terms. The goal is not to understand every detail but to answer the question: "What is this text generally about?" Skilled skimmers can process a ten-page article in two to three minutes and emerge with a solid understanding of its central argument.\n\nScanning is more targeted. When scanning, the reader has a specific piece of information in mind — a date, a name, a statistic, a definition — and moves through the text looking only for that item. Scanning requires the reader to ignore irrelevant information and zero in on visual cues: numbers, capitalized words, keywords, or distinctive formatting. For example, if you need to find when a particular study was conducted, you would scan for four-digit numbers or date-related phrases.\n\nPreviewing is the strategic step that should precede any serious reading. It involves examining the text\'s structural elements before reading the body: the title, subtitle, abstract (if present), headings and subheadings, figures, tables, captions, bold terms, and the conclusion. Previewing creates a cognitive map that makes subsequent detailed reading faster and more productive. Research in cognitive psychology confirms that readers who preview material comprehend and retain significantly more than those who simply begin reading from the first word.\n\nFor French-speaking students transitioning to English academic texts, an important structural difference must be noted. French academic writing traditionally employs a more elaborate, discursive structure. Paragraphs may build gradually toward the main point, and authors may present extensive background before stating their thesis. English academic writing, by contrast, tends to be more direct: the thesis typically appears in the introduction, each paragraph begins with a clear topic sentence, and the structure follows a linear argument. Understanding this difference is essential because reading strategies must be adapted. When skimming an English text, look for the thesis in the first or second paragraph and the topic sentence at the beginning of each paragraph. In French texts, the main argument may not become clear until the conclusion.' },
            { type: 'text', content: 'Consider how previewing a textbook chapter differs from previewing a journal article. A textbook chapter typically includes learning objectives, section headings, key term boxes, summary sections, and review questions — all of which serve as previewing tools. A journal article, on the other hand, includes an abstract, introduction, methodology, results, and discussion sections. The abstract alone often provides enough information to determine whether the full article is relevant to your research question. Learning to use these structural elements strategically saves enormous amounts of time.' },
            { type: 'text', content: 'Effective readers also adjust their reading speed based on purpose. When skimming for general understanding, speed increases dramatically. When scanning for a specific fact, speed is even faster but attention is highly focused. When reading for deep comprehension — analyzing arguments, evaluating evidence, or preparing for an exam — speed decreases and active annotation begins. The ability to shift between these modes is a hallmark of academic reading proficiency.' },
            { type: 'biblical-worldview', content: 'Scripture calls us to be diligent in our pursuit of knowledge and wisdom. Proverbs 18:15 says, "An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge." Strategic reading is an expression of this diligence — we honor God when we approach learning with discipline and intentionality rather than passivity. Just as the Bereans in Acts 17:11 "examined the Scriptures daily" with careful attention, academic readers examine texts with purpose and discernment. The reading strategies we develop are tools for stewardship of the minds God has given us.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Think about a time you had to read something long and complex — perhaps a textbook chapter or an article in French. What strategies did you naturally use? Did you read every word, or did you look at headings first? How might the skimming, scanning, and previewing strategies described above have helped you? Also consider: how does the structure of French academic texts you have read differ from the English structure described here?' },
            { type: 'practice', activity: 'Take the following simulated article abstract and apply all three strategies. First, preview it by identifying the title, key terms, and structural markers. Then skim it to determine the general topic and main argument. Finally, scan it to find three specific pieces of information: (1) the year the study was conducted, (2) the sample size, and (3) the primary conclusion. Write down your findings and the time each step took.\n\nAbstract: "This study, conducted in 2019 with a sample of 342 university students in Montreal, examined the relationship between previewing strategies and reading comprehension scores in L2 English. Results indicated that students who spent five minutes previewing a text before reading scored 27% higher on comprehension tests than those who began reading immediately. The primary conclusion is that explicit instruction in previewing techniques significantly improves academic reading outcomes for francophone learners of English. Keywords: reading strategies, L2 acquisition, academic literacy, previewing, francophone learners."' }
          ],
          output: [
            { type: 'practice', activity: 'Select an English-language article from an academic source (such as a news analysis or a simplified journal article). Apply the three-step reading process: (1) Preview the article for 2 minutes, writing down all structural elements you notice. (2) Skim the article for 3 minutes, then write a one-sentence summary of the main idea. (3) Scan the article to find 5 specific facts (names, dates, statistics). Record your results and reflect: which strategy was easiest? Which was most challenging? How did the English text structure compare to French texts you have read?' },
            { type: 'practice', activity: 'Create a "Reading Strategy Quick Reference Card" that you can use during future academic reading. For each strategy (skimming, scanning, previewing), write: (1) a one-sentence definition, (2) when to use it, (3) what to focus on, and (4) one tip specific to reading English texts as a French speaker. Your card should be concise enough to fit on one side of an index card.' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Skimming, Scanning, and Previewing',
        estimatedMinutes: 60,
        objectives: [
          'Understand the difference between skimming, scanning, and previewing as academic reading strategies',
          'Practice skimming to identify the main idea of an English academic text',
          'Use scanning to find specific information quickly in a text'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Have you ever felt overwhelmed by a long reading assignment? What if there were strategies to help you read smarter, not just harder?' },
            { type: 'reading', title: 'Three Essential Reading Strategies', content: 'When you face a long academic text in English, you do not need to read every word from start to finish. Experienced readers use three key strategies to work through material efficiently: skimming, scanning, and previewing.\n\nSkimming means reading quickly to get the general idea. When you skim, you read the title, the first sentence of each paragraph, and the conclusion. You do not try to understand every detail — you are simply asking, "What is this text about?" Skimming is useful when you need to decide if a text is relevant or when you need a quick overview before reading in detail.\n\nScanning means looking for specific information. When you scan, you already know what you are looking for — a name, a date, a number, a keyword. Your eyes move quickly over the text until you find the target information. Scanning is useful when you need to answer a specific question or find a particular fact.\n\nPreviewing means looking at the structure of a text before you read it. You examine the title, headings, subheadings, bold words, images, and any summary or conclusion. Previewing gives you a "map" of the text so you know what to expect. Studies show that students who preview a text before reading understand and remember more.\n\nAn important note for French speakers: English academic texts are organized differently from French ones. In English, the main idea usually appears at the beginning — in the introduction and in the first sentence of each paragraph. In French academic writing, the main idea often builds gradually and may not appear until later. When you read in English, look for the main point early in each section.' },
            { type: 'text', content: 'Here is a simple way to remember the three strategies: Preview first (look at the map), Skim second (get the big picture), Scan third (find specific details). Together, these three strategies form the foundation of efficient academic reading. With practice, they become automatic habits that save you time and improve your understanding.' },
            { type: 'biblical-worldview', content: 'Proverbs 18:15 tells us, "An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge." God values our efforts to learn wisely and effectively. Using reading strategies is a way of being a good steward of the time and abilities God has given us. Like the Bereans who carefully examined Scripture (Acts 17:11), we should approach all texts with attention and purpose.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Think about how you usually read a text for school. Do you start at the beginning and read every word? Do you look at headings first? How do you think skimming, scanning, and previewing could help you read your English assignments more efficiently?' },
            { type: 'practice', activity: 'Read the following short passage using the three strategies.\n\nPassage: "The Impact of Sleep on Academic Performance — A 2021 study at the University of Ottawa surveyed 500 students and found that those who slept 7-8 hours per night scored an average of 15% higher on exams than those who slept fewer than 6 hours. The researchers concluded that consistent sleep habits are more important than last-minute studying. Dr. Marie Tremblay, the lead researcher, noted that sleep helps the brain consolidate new information learned during the day."\n\nStep 1 (Preview): What is the title? What do you expect the passage to be about?\nStep 2 (Skim): Read quickly — what is the main idea in one sentence?\nStep 3 (Scan): Find these facts: (a) How many students were surveyed? (b) What was the percentage difference in exam scores? (c) Who was the lead researcher?' }
          ],
          output: [
            { type: 'practice', activity: 'Find a short English article online (a news article or blog post of about 500 words). Apply the three strategies in order: preview, skim, then scan. Write a brief report that includes: (1) What structural elements did you notice during previewing? (2) What is the main idea you got from skimming? (3) List 3 specific facts you found by scanning.' },
            { type: 'practice', activity: 'In your own words, write a short explanation (4-6 sentences) of the difference between skimming and scanning. Include one example of when you would use each strategy. Then write one sentence about how English text structure differs from French text structure.' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Skimming, Scanning, and Previewing',
        estimatedMinutes: 45,
        objectives: [
          'Learn what skimming, scanning, and previewing mean as reading strategies',
          'Practice using each strategy with a short English text',
          'Understand that English texts put the main idea at the beginning'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Do you ever feel lost when reading a long text in English? What if you could find the information you need without reading every single word?' },
            { type: 'reading', title: 'Read Smarter: Three Simple Strategies', content: 'Reading in English does not mean you must read every word. Here are three strategies that help you read faster and understand more.\n\nSkimming: Read quickly to get the general idea. Look at the title, the first sentence of each paragraph, and the last paragraph. Ask yourself: "What is this about?"\n\nScanning: Look for specific information. If you need a date, a name, or a number, move your eyes quickly over the text until you find it. Do not read everything — just search for what you need.\n\nPreviewing: Before you read, look at the title, headings, bold words, and pictures. This gives you a "map" of what the text will cover.\n\nImportant tip for French speakers: In English, the main idea is usually in the first sentence of a paragraph. In French, it sometimes comes later. When reading English, always check the first sentence to find the point.' },
            { type: 'biblical-worldview', content: 'The Bible says, "An intelligent heart acquires knowledge" (Proverbs 18:15). God wants us to learn and grow. Using smart reading strategies helps us make the most of the abilities He has given us.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'When you read something in English, what do you find most difficult? Do you try to understand every word? How do you think these three strategies could make reading easier for you?' },
            { type: 'practice', activity: 'Read this short text and practice the three strategies.\n\n"Healthy Eating for Students — Eating well helps you do better in school. A 2020 study found that students who eat breakfast every day get better grades. Foods like fruits, vegetables, and whole grains give your brain energy. Dr. Jean-Pierre Bouchard says that drinking water is also important for concentration."\n\nPreview: What is the title? What do you think the text is about?\nSkim: What is the main idea?\nScan: (a) What year was the study? (b) What foods give your brain energy? (c) Who is quoted in the text?' }
          ],
          output: [
            { type: 'practice', activity: 'Find a short English text (a news headline and article, about 200 words). Preview it (look at the title and headings), skim it (find the main idea), and scan it (find 2 specific facts). Write down your answers in 3-4 sentences.' },
            { type: 'practice', activity: 'Write a simple definition for each strategy in your own words: (1) Skimming is... (2) Scanning is... (3) Previewing is... Use one sentence for each.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'skimming', definition: 'Reading quickly to get the general idea or gist of a text without focusing on every detail', example: 'I used skimming to find out what the article was about before reading it carefully.' },
      { term: 'scanning', definition: 'Moving your eyes quickly over a text to find specific information such as a name, date, or number', example: 'She scanned the chapter to find the date of the French Revolution.' },
      { term: 'previewing', definition: 'Examining the structure and key features of a text (title, headings, images) before reading it fully', example: 'Previewing the textbook chapter helped me understand the organization before I started reading.' },
      { term: 'gist', definition: 'The main or essential meaning of a text or speech', example: 'Even though I did not understand every word, I got the gist of the professor\'s lecture.' },
      { term: 'topic sentence', definition: 'The sentence in a paragraph, usually the first, that states the main idea of that paragraph', example: 'The topic sentence told me that the paragraph was about the causes of climate change.' },
      { term: 'abstract', definition: 'A short summary at the beginning of a journal article that describes the main findings and conclusions', example: 'I read the abstract to decide whether the research article was relevant to my essay.' },
      { term: 'annotation', definition: 'Notes, comments, or highlights added to a text to aid understanding and recall', example: 'Her annotations in the margins helped her review the key points before the exam.' },
      { term: 'cognitive', definition: 'Relating to the mental processes of thinking, understanding, learning, and remembering', example: 'Previewing activates cognitive processes that make reading comprehension easier.' }
    ],
    quiz: [
      { question: 'What is the primary purpose of skimming a text?', options: ['To memorize every detail', 'To get the general idea quickly', 'To find a specific date or name', 'To write a summary'], correctAnswer: 1, explanation: 'Skimming is used to quickly grasp the general idea or gist of a text, not to find specific details or memorize content.' },
      { question: 'Which reading strategy would you use to find the year a study was published?', options: ['Skimming', 'Previewing', 'Scanning', 'Close reading'], correctAnswer: 2, explanation: 'Scanning is the strategy for finding specific information like dates, names, or numbers within a text.' },
      { question: 'What does previewing a text involve?', options: ['Reading every word carefully', 'Looking at titles, headings, bold words, and images before reading', 'Writing a summary after reading', 'Translating the text into French'], correctAnswer: 1, explanation: 'Previewing means examining the structural elements of a text — title, headings, bold terms, images, abstract — before reading the body.' },
      { question: 'How does English academic paragraph structure typically differ from French academic paragraph structure?', options: ['English paragraphs have no topic sentences', 'English paragraphs state the main idea at the beginning; French paragraphs may build to it', 'French paragraphs are always shorter', 'There is no difference between them'], correctAnswer: 1, explanation: 'English academic writing typically places the main idea (topic sentence) at the beginning of each paragraph, while French writing may build gradually toward the main point.' },
      { question: 'What is the best order to use the three reading strategies?', options: ['Scan, skim, preview', 'Skim, scan, preview', 'Preview, skim, scan', 'Preview, scan, skim'], correctAnswer: 2, explanation: 'The most effective order is: preview first (get the map), skim second (get the big picture), then scan third (find specific details).' },
      { question: 'What is a "gist" in the context of reading?', options: ['A detailed analysis of every paragraph', 'The main or essential meaning of a text', 'A list of vocabulary words', 'The bibliography at the end of an article'], correctAnswer: 1, explanation: 'The gist is the main or essential meaning of a text — the overall point or message without fine details.' },
      { question: 'When skimming, which parts of a text should you focus on?', options: ['Only the middle paragraphs', 'Titles, first sentences of paragraphs, and conclusions', 'Footnotes and references', 'Every adjective and adverb'], correctAnswer: 1, explanation: 'When skimming, focus on titles, first sentences of paragraphs (topic sentences), and concluding sections to quickly grasp the main idea.' },
      { question: 'What is an abstract in an academic article?', options: ['A long introduction to the topic', 'A short summary of the main findings and conclusions', 'A list of references used', 'The author\'s biography'], correctAnswer: 1, explanation: 'An abstract is a concise summary at the beginning of an academic article that describes the study\'s purpose, methods, main findings, and conclusions.' },
      { question: 'Why do studies show that previewing improves reading comprehension?', options: ['Because it replaces the need to read the text', 'Because it creates a mental map that helps organize new information', 'Because it is the same as memorizing', 'Because it only works for French texts'], correctAnswer: 1, explanation: 'Previewing creates a cognitive framework or "mental map" that helps the brain organize and retain information encountered during subsequent detailed reading.' },
      { question: 'Which biblical principle connects to using reading strategies wisely?', options: ['We should avoid reading secular texts', 'Being a good steward of the mind God gave us (Proverbs 18:15)', 'Reading strategies are not mentioned in the Bible', 'Only skimming the Bible is acceptable'], correctAnswer: 1, explanation: 'Proverbs 18:15 says "An intelligent heart acquires knowledge." Using effective reading strategies is a way of being a good steward of the intellectual gifts God has given us.' }
    ]
  },

  // W2: Understanding Main Ideas and Supporting Details (INSTRUCTION)
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Understanding Main Ideas and Supporting Details',
        estimatedMinutes: 80,
        objectives: [
          'Identify thesis statements and topic sentences in English academic texts with precision',
          'Distinguish between main ideas and supporting details across multiple paragraph types',
          'Apply annotation techniques to mark and organize key ideas and evidence during reading',
          'Recognize the structural differences between French and English paragraph development and adapt comprehension strategies'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you read an academic text, how do you decide what the author\'s most important point is — and how do you separate the core argument from the examples and evidence used to support it?' },
            { type: 'reading', title: 'Thesis Statements, Topic Sentences, and the Architecture of Academic Arguments', content: 'Every well-constructed academic text in English is built on a clear hierarchy of ideas. At the top of this hierarchy is the thesis statement — the central claim or argument that the entire text seeks to prove, explain, or explore. In English academic writing, the thesis typically appears in the introduction, often as the last sentence of the first paragraph. This placement is deliberate: it tells the reader immediately what the text will argue, allowing them to evaluate all subsequent paragraphs in light of that central claim.\n\nBelow the thesis in the hierarchy are topic sentences. Each body paragraph in an English academic text ideally begins with a topic sentence — a single sentence that states the main point of that paragraph. The topic sentence serves two functions: it advances the overall thesis by presenting one aspect of the argument, and it tells the reader what the rest of the paragraph will discuss. Every other sentence in the paragraph serves as a supporting detail: an example, a statistic, a quotation, an explanation, or a piece of evidence that strengthens the topic sentence\'s claim.\n\nSupporting details come in several forms. Factual evidence includes statistics, dates, measurements, and verified information. Examples are specific instances that illustrate a general point. Expert testimony involves quotations or paraphrased ideas from authorities in the field. Logical reasoning connects evidence to claims through cause-and-effect relationships, comparisons, or analogies. Recognizing these types of support helps readers evaluate the strength of an argument.\n\nFor French-speaking students, a critical difference must be understood. In the French academic tradition — particularly the dissertation — writing follows a thèse-antithèse-synthèse structure. The argument is presented, then challenged, then resolved. The main point often emerges gradually and may become fully clear only in the synthesis. English academic writing, by contrast, is predominantly deductive: the main point is stated first, and everything that follows supports it. This means that when reading English texts, you should look for the thesis in the introduction and the topic sentence at the start of each paragraph. If you wait for the main point to "build" as in French writing, you may feel confused about the text\'s purpose.\n\nAnnotation is the reader\'s most powerful tool for tracking main ideas and supporting details. Effective annotation includes: underlining or highlighting thesis statements and topic sentences, writing brief margin notes that summarize each paragraph\'s point, marking supporting evidence with symbols (e.g., "E" for example, "S" for statistic, "Q" for quotation), drawing arrows to connect related ideas, and writing questions in the margins when something is unclear. Research consistently shows that students who annotate actively comprehend and retain 30-40% more than passive readers.' },
            { type: 'text', content: 'Consider the difference between explicit and implicit main ideas. In most English academic writing, main ideas are explicit — directly stated in thesis statements and topic sentences. However, some texts, particularly narrative or persuasive pieces, may have implicit main ideas that the reader must infer from the evidence presented. Being able to distinguish between explicit and implicit main ideas is a hallmark of advanced reading comprehension. When the main idea is implicit, the reader must ask: "What is the common thread connecting all these details? What claim would tie everything together?"' },
            { type: 'text', content: 'The relationship between main ideas and supporting details can be visualized as a pyramid. The thesis sits at the top. Below it, topic sentences form the next level — each one supporting the thesis from a different angle. Below each topic sentence, supporting details provide the foundation. This visual model helps readers organize their understanding and identify when an argument has weak support (few details under a topic sentence) or when a detail does not actually support the claim it is supposed to.' },
            { type: 'biblical-worldview', content: 'The ability to discern main ideas from supporting details reflects a biblical value of discernment. In 1 Thessalonians 5:21, Paul instructs believers to "test everything; hold fast what is good." Just as we are called to evaluate ideas and hold onto what is true, academic readers must evaluate arguments by examining whether the evidence truly supports the claims made. This discipline of careful analysis honors God by developing the minds He has given us to pursue truth.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Reflect on the French dissertation structure (thèse-antithèse-synthèse) compared to the English deductive structure. How does each approach organize arguments differently? Which structure do you find more natural to follow when reading? How might your familiarity with the French structure cause confusion when reading English academic texts, and what adjustments can you make?' },
            { type: 'practice', activity: 'Read the following paragraph and identify: (a) the topic sentence, (b) the main idea in your own words, (c) three supporting details with their types (example, statistic, expert testimony, or reasoning).\n\nParagraph: "Social media use among teenagers has been linked to increased rates of anxiety and depression. A 2022 study by researchers at McGill University found that teens who spent more than three hours per day on social media were 60% more likely to report symptoms of anxiety. Dr. Amara Osei, a child psychologist at the University of Toronto, notes that constant comparison to curated online images damages self-esteem during a critical developmental period. Furthermore, the addictive design of social media platforms — with features like infinite scrolling and notification alerts — disrupts sleep patterns, which in turn affects mental health. These findings suggest that parents and educators should monitor and guide teenage social media use."' }
          ],
          output: [
            { type: 'practice', activity: 'Select a multi-paragraph English academic text (an article, essay, or textbook section of at least 5 paragraphs). Read and annotate the text using the strategies discussed: underline the thesis statement, circle each topic sentence, and mark supporting details with appropriate symbols (E for example, S for statistic, Q for quotation, R for reasoning). Then create an outline that shows the hierarchy: thesis at the top, topic sentences indented below, and key supporting details indented further. Write a brief paragraph (3-5 sentences) evaluating whether the supporting details adequately support the thesis.' },
            { type: 'practice', activity: 'Write a well-structured paragraph of your own (6-8 sentences) on the topic: "The importance of reading skills for academic success." Begin with a clear topic sentence, include at least three different types of supporting details (example, statistic or fact, reasoning), and end with a concluding sentence that reinforces the main idea. After writing, label each sentence\'s role in the paragraph (topic sentence, supporting detail, concluding sentence).' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Understanding Main Ideas and Supporting Details',
        estimatedMinutes: 60,
        objectives: [
          'Identify the thesis statement in an English academic text',
          'Find topic sentences and distinguish them from supporting details',
          'Use simple annotation techniques to track main ideas while reading'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you read a long text, how do you figure out what the author\'s main point is? How do you know which sentences are the most important?' },
            { type: 'reading', title: 'Finding the Main Idea and Its Support', content: 'Every academic text has a central point called the thesis statement. In English writing, the thesis usually appears in the introduction — often the last sentence of the first paragraph. It tells you the main argument of the entire text.\n\nEach body paragraph also has a main point called the topic sentence. In English, the topic sentence is usually the first sentence of the paragraph. It tells you what that paragraph is about. All the other sentences in the paragraph are supporting details — they give examples, statistics, facts, or explanations to prove the topic sentence.\n\nThere are different types of supporting details. Examples give specific cases to illustrate a point. Statistics use numbers and data. Expert testimony uses quotes from authorities. Reasoning explains why something is true using logic.\n\nFor French speakers, this is an important difference: in French academic writing (like the dissertation), the main point often builds gradually — thèse, antithèse, synthèse. In English, the main point comes first, and everything after supports it. So when reading English, always check the introduction for the thesis and the first sentence of each paragraph for the topic sentence.\n\nAnnotation helps you track ideas as you read. Simple techniques include: underlining the thesis and topic sentences, writing a one-word summary next to each paragraph, and putting a star next to important evidence. Students who annotate understand and remember much more than those who just read passively.' },
            { type: 'biblical-worldview', content: 'Paul writes in 1 Thessalonians 5:21, "Test everything; hold fast what is good." When we read academic texts, we are practicing this kind of discernment — examining the evidence, evaluating the arguments, and holding onto what is true. This careful thinking honors the God who created our minds for understanding.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Think about a text you recently read in English. Could you find the main idea easily? Was it in the introduction or did you have to search for it? How might annotating — underlining key sentences and writing notes — have helped you understand the text better?' },
            { type: 'practice', activity: 'Read the paragraph below and answer the questions.\n\nParagraph: "Regular exercise improves students\' academic performance in several ways. A study at the University of British Columbia found that students who exercised three times per week had 20% higher grades than inactive students. Exercise increases blood flow to the brain, which improves concentration and memory. Additionally, physical activity reduces stress and anxiety, which can interfere with studying. Schools that have increased physical education time have reported better test scores across all subjects."\n\n(a) What is the topic sentence?\n(b) List three supporting details.\n(c) What type is each detail (example, statistic, reasoning)?' }
          ],
          output: [
            { type: 'practice', activity: 'Find a short English article (3-4 paragraphs). Read it and annotate: underline the thesis (if present) and the topic sentence of each paragraph. Then write a brief outline: list the main idea of the text and the main point of each paragraph in your own words.' },
            { type: 'practice', activity: 'Write a paragraph (5-6 sentences) on the topic: "Why learning English is important for my future." Start with a clear topic sentence. Include at least two supporting details (one example and one reason). End with a concluding sentence.' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Understanding Main Ideas and Supporting Details',
        estimatedMinutes: 45,
        objectives: [
          'Understand what a main idea and supporting details are in a paragraph',
          'Find the topic sentence in English paragraphs',
          'Use highlighting to mark important information while reading'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you read a paragraph, which sentence tells you the most important point? How do you know which details are there to help explain that point?' },
            { type: 'reading', title: 'Main Ideas and Supporting Details', content: 'Every paragraph has a main idea — the most important point the writer wants to make. In English, this is usually in the first sentence of the paragraph. This sentence is called the topic sentence.\n\nThe other sentences in the paragraph are supporting details. They give examples, facts, or explanations to help you understand the main idea.\n\nExample:\n"Dogs make great pets for families. They are loyal and protective of their owners. Many breeds are gentle with children. Dogs also encourage families to exercise by needing daily walks."\n\nThe topic sentence is: "Dogs make great pets for families." The supporting details explain why: loyalty, gentleness, and exercise.\n\nTip for French speakers: In English, look for the main idea at the beginning of a paragraph. In French, the main idea sometimes comes at the end. When reading English, always check the first sentence first.' },
            { type: 'biblical-worldview', content: 'The Bible encourages us to "test everything; hold fast what is good" (1 Thessalonians 5:21). When we learn to find main ideas and evaluate supporting details, we are developing the skill of discernment that God values.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Think about the example paragraph about dogs. How did you know which sentence was the main idea? What clues helped you? Do you usually look at the first sentence when reading English paragraphs?' },
            { type: 'practice', activity: 'Read this paragraph and answer the questions:\n\n"Breakfast is the most important meal of the day. It gives your brain energy to think clearly in class. Studies show that students who eat breakfast get better grades. A healthy breakfast with fruit and whole grains keeps you feeling full until lunch."\n\n(a) What is the topic sentence (main idea)?\n(b) Name two supporting details.' }
          ],
          output: [
            { type: 'practice', activity: 'Read a short English paragraph from a news website or textbook. Highlight or underline the topic sentence. Then list two supporting details in your own words.' },
            { type: 'practice', activity: 'Write 3 sentences about this topic: "Why reading is important." Your first sentence should be the main idea. Your other two sentences should be supporting details (reasons or examples).' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'thesis statement', definition: 'The main argument or central claim of an entire academic text, usually found in the introduction', example: 'The thesis statement of the essay was: "Social media has a negative impact on teenage mental health."' },
      { term: 'topic sentence', definition: 'The sentence in a paragraph that states the main idea of that paragraph, usually the first sentence in English writing', example: 'The topic sentence told me the paragraph would discuss the benefits of exercise.' },
      { term: 'supporting detail', definition: 'A fact, example, statistic, or explanation that helps prove or explain the main idea', example: 'The statistic about 20% higher grades was a supporting detail for the claim about exercise.' },
      { term: 'annotation', definition: 'Notes, highlights, or marks added to a text during reading to track important ideas', example: 'My annotations helped me review the key points before the test.' },
      { term: 'deductive', definition: 'A style of reasoning or writing that begins with a general statement and then provides specific evidence to support it', example: 'English academic writing is deductive: it states the main point first, then gives evidence.' },
      { term: 'evidence', definition: 'Facts, data, examples, or expert opinions used to support an argument or claim', example: 'The author used statistical evidence to support her argument about climate change.' },
      { term: 'hierarchy', definition: 'A system of ranking or organizing things from most important to least important', example: 'The hierarchy of ideas in an essay goes from thesis to topic sentences to supporting details.' },
      { term: 'explicit', definition: 'Stated clearly and directly, leaving no room for doubt about the meaning', example: 'The main idea was explicit — the author stated it clearly in the first paragraph.' }
    ],
    quiz: [
      { question: 'Where does the thesis statement usually appear in an English academic text?', options: ['At the end of the conclusion', 'In the introduction, often as the last sentence of the first paragraph', 'In the middle of the text', 'In the bibliography'], correctAnswer: 1, explanation: 'In English academic writing, the thesis statement typically appears in the introduction, often as the final sentence of the first paragraph, to set up the argument for the reader.' },
      { question: 'What is the function of a topic sentence?', options: ['It summarizes the entire essay', 'It states the main idea of its paragraph', 'It gives a statistic or fact', 'It always asks a question'], correctAnswer: 1, explanation: 'A topic sentence states the main idea of its paragraph and tells the reader what the rest of the paragraph will discuss.' },
      { question: 'Which of the following is a supporting detail?', options: ['The thesis statement of an essay', 'The title of a chapter', 'A statistic that proves the topic sentence', 'The table of contents'], correctAnswer: 2, explanation: 'Supporting details include statistics, examples, quotations, and reasoning that serve to prove or explain the topic sentence.' },
      { question: 'How does the French dissertation structure differ from English academic structure?', options: ['French uses only topic sentences', 'French follows thèse-antithèse-synthèse; English states the thesis first and supports it', 'They are exactly the same', 'English never uses evidence'], correctAnswer: 1, explanation: 'French academic writing traditionally uses a thèse-antithèse-synthèse structure where the argument builds gradually, while English writing is deductive: the thesis is stated first and then supported.' },
      { question: 'What does it mean to annotate a text?', options: ['To rewrite the text in your own words', 'To add notes, highlights, and marks to track important ideas while reading', 'To read the text aloud', 'To translate the text into another language'], correctAnswer: 1, explanation: 'Annotation involves adding notes, underlining, highlighting, and symbols to a text during reading to track main ideas, evidence, and questions.' },
      { question: 'Where should you look for the topic sentence in an English paragraph?', options: ['The last sentence', 'The middle of the paragraph', 'The first sentence', 'It is never stated directly'], correctAnswer: 2, explanation: 'In English academic writing, the topic sentence is typically the first sentence of a paragraph, stating the main point directly.' },
      { question: 'What is the difference between explicit and implicit main ideas?', options: ['Explicit ideas are wrong; implicit ideas are correct', 'Explicit ideas are stated directly; implicit ideas must be inferred', 'They mean the same thing', 'Implicit ideas are only in French texts'], correctAnswer: 1, explanation: 'An explicit main idea is directly stated in the text, while an implicit main idea is not stated outright and must be inferred from the details provided.' },
      { question: 'Which is an example of expert testimony as a supporting detail?', options: ['A chart showing test scores', 'A quotation from a university professor about the topic', 'A personal opinion with no source', 'The date the article was published'], correctAnswer: 1, explanation: 'Expert testimony involves quotations or paraphrased ideas from recognized authorities in a field, used to lend credibility to a claim.' },
      { question: 'Why does annotation improve reading comprehension?', options: ['Because it makes the text look more colorful', 'Because it forces active engagement with the text and helps organize ideas', 'Because it replaces the need to read the text', 'Because teachers require it'], correctAnswer: 1, explanation: 'Annotation forces readers to actively engage with the text — identifying key ideas, noting evidence, and asking questions — which dramatically improves comprehension and retention.' },
      { question: 'According to 1 Thessalonians 5:21, what should believers do with ideas and claims?', options: ['Accept everything without question', 'Test everything and hold fast what is good', 'Ignore academic arguments', 'Only read the Bible'], correctAnswer: 1, explanation: 'Paul instructs believers to "test everything; hold fast what is good," which applies to evaluating academic arguments by examining whether the evidence truly supports the claims.' }
    ]
  },

  // W3: Inferring Meaning and Drawing Conclusions (INSTRUCTION)
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Inferring Meaning and Drawing Conclusions',
        estimatedMinutes: 80,
        objectives: [
          'Infer the author\'s purpose and tone from contextual clues in academic texts',
          'Distinguish between fact and opinion in scholarly and persuasive writing',
          'Draw logical conclusions based on evidence presented in a text',
          'Identify false cognates between French and English that can lead to misinterpretation'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Authors do not always state their meaning directly. How do skilled readers "read between the lines" to understand what a text really means — and how can French-English false cognates lead to serious misunderstandings?' },
            { type: 'reading', title: 'Beyond the Surface: Inference, Tone, and Critical Reading', content: 'Academic reading requires more than understanding the literal meaning of words and sentences. Advanced readers must also engage in inference — the process of drawing conclusions that are not explicitly stated but are supported by the evidence in the text. Inference is the bridge between what the author says and what the author means.\n\nAuthor\'s purpose is a fundamental element of inference. Every text is written for a reason: to inform, to persuade, to analyze, to entertain, or to provoke thought. Academic texts most commonly aim to inform or persuade, but the balance varies. A research article primarily informs by presenting data and findings. An editorial or opinion piece primarily persuades by advocating for a particular position. Recognizing the author\'s purpose helps the reader evaluate the text\'s reliability and potential bias.\n\nTone refers to the author\'s attitude toward the subject, revealed through word choice, sentence structure, and emphasis. An author\'s tone might be objective, critical, enthusiastic, cautious, skeptical, or dismissive. Detecting tone requires attention to specific language choices. For instance, "The study suggests a correlation" (cautious tone) conveys a very different meaning from "The study proves a direct link" (assertive tone), even though both reference the same study. French-speaking students should note that English academic tone tends to be more understated than French academic prose — hedging language like "may," "suggests," "it appears that" is standard and does not indicate weakness but academic precision.\n\nDistinguishing fact from opinion is another critical inference skill. A fact is a statement that can be verified: "The Earth orbits the Sun." An opinion is a judgment or interpretation: "Space exploration is the most important scientific endeavor." In academic writing, opinions are often supported by evidence and presented with academic language that can make them sound like facts. Phrases like "It is clear that..." or "Undoubtedly..." signal strong opinions. The discerning reader asks: "Can this be verified, or is this an interpretation?"\n\nFalse cognates between French and English present a particular challenge for francophone learners. The word "lecture" is a classic example: in French, "une lecture" means a reading or the act of reading, while in English, a "lecture" is a formal talk given to an audience, especially in a university. Misunderstanding this word could lead a student to misinterpret an entire assignment. Other common false cognates include: "actually" (English: in reality; French "actuellement": currently), "library" (English: a place for books; French "librairie": a bookstore), "sympathetic" (English: feeling compassion; French "sympathique": friendly/nice), and "sensible" (English: practical/reasonable; French "sensible": sensitive). Awareness of these traps is essential for accurate comprehension.' },
            { type: 'text', content: 'Drawing conclusions is the culmination of inference skills. When you draw a conclusion, you combine information from the text with your own knowledge and reasoning to arrive at an understanding that goes beyond what is directly stated. For example, if an article describes rising temperatures, melting glaciers, and shifting weather patterns without ever using the phrase "climate change," a reader can draw the conclusion that the article is describing climate change. Strong conclusions are supported by multiple pieces of evidence from the text and do not contradict any information presented.' },
            { type: 'text', content: 'Critical readers also evaluate the quality of inferences made by authors themselves. When an author draws a conclusion from data, ask: "Does the evidence actually support this conclusion? Could there be alternative explanations? Is the author overgeneralizing from limited evidence?" This level of critical engagement transforms passive reading into active intellectual dialogue with the text.' },
            { type: 'biblical-worldview', content: 'The ability to discern meaning beneath the surface connects to biblical wisdom. Proverbs 2:3-5 says, "If you call out for insight and raise your voice for understanding, if you seek it like silver and search for it as for hidden treasures, then you will understand the fear of the Lord and find the knowledge of God." Deep reading — searching for meaning beyond the obvious — mirrors the way we are called to seek wisdom: actively, persistently, and with discernment. The skill of distinguishing fact from opinion also reflects the biblical command to "test everything" (1 Thessalonians 5:21).' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Consider the false cognate "lecture." If a professor says, "Today\'s lecture will focus on the French Revolution," a French speaker might initially think of "reading" rather than "oral presentation." Have you encountered false cognates that caused confusion? How does awareness of the author\'s tone help you avoid misinterpreting a text\'s meaning?' },
            { type: 'practice', activity: 'Read the following passage and answer the inference questions.\n\nPassage: "While the company\'s quarterly report showed a 15% increase in revenue, several analysts expressed reservations. The growth was largely driven by a single product line, and customer retention rates had declined for the third consecutive quarter. Meanwhile, the company\'s main competitor had just secured a major government contract. The CEO remained optimistic in his public statements, describing the quarter as \'a turning point for our organization.\'"\n\n(a) What is the author\'s tone — optimistic, neutral, or skeptical? Cite specific words or phrases that reveal the tone.\n(b) Is the CEO\'s statement a fact or an opinion? Explain.\n(c) What conclusion can you draw about the company\'s overall situation, even though the author does not state it directly?\n(d) Identify one instance of hedging language in the passage.' }
          ],
          output: [
            { type: 'practice', activity: 'Find an English-language editorial or opinion article (from a news website or academic blog). Read it carefully and write an analysis (200-250 words) that addresses: (1) What is the author\'s purpose — to inform, persuade, or both? (2) What is the author\'s tone, and what specific words reveal it? (3) Identify two facts and two opinions in the article. (4) What conclusion does the author want the reader to draw? Do you agree with this conclusion? Why or why not?' },
            { type: 'practice', activity: 'Create a "False Cognate Alert" reference list with at least 8 French-English false cognates. For each, write: (1) the French word and its French meaning, (2) the English word that looks similar and its actual English meaning, (3) a sample sentence using the English word correctly. Include "lecture," "actually," "library," and "sensible" from the lesson, and add at least 4 more that you have encountered or researched.' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Inferring Meaning and Drawing Conclusions',
        estimatedMinutes: 60,
        objectives: [
          'Understand what inference means and practice making inferences from texts',
          'Identify the author\'s purpose and tone in English academic writing',
          'Distinguish between facts and opinions in a text'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Authors do not always say exactly what they mean. How can you figure out the deeper meaning of a text by "reading between the lines"?' },
            { type: 'reading', title: 'Reading Between the Lines: Inference and Critical Reading', content: 'Sometimes, the most important meaning in a text is not directly stated. When you figure out something the author implies but does not say, you are making an inference. Inference means combining what the text says with what you already know to reach a conclusion.\n\nEvery text has a purpose — the reason it was written. The main purposes are: to inform (give facts and information), to persuade (convince you of something), and to entertain (make you enjoy reading). In academic reading, texts usually aim to inform or persuade. Knowing the purpose helps you understand why the author chose certain words and evidence.\n\nTone is the author\'s attitude toward the topic. Tone can be objective (neutral, just presenting facts), critical (pointing out problems), enthusiastic (showing excitement), or cautious (being careful about claims). You can detect tone by looking at word choices. For example, "The study proves that..." sounds very certain, while "The study suggests that..." sounds cautious.\n\nIt is also important to separate facts from opinions. A fact can be checked and verified: "Water boils at 100 degrees Celsius." An opinion is a personal judgment: "Science is the most fascinating subject." In academic writing, opinions are often presented with evidence, which can make them sound like facts. Watch for signal words like "I believe," "It is clear that," or "Undoubtedly."\n\nFalse cognate alert: The French word "lecture" means "reading," but in English, "lecture" means a formal talk or presentation, especially at a university. Other tricky words: "actually" in English means "in reality" (not "currently"), and "library" means a place for books (not a bookstore). These false friends can cause real confusion when reading.' },
            { type: 'biblical-worldview', content: 'Proverbs 2:3-5 encourages us to seek understanding "like silver" and "hidden treasures." Reading deeply — looking beyond surface meaning — is a way of seeking the wisdom God values. The ability to distinguish fact from opinion also reflects the biblical call to "test everything" (1 Thessalonians 5:21).' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Have you ever misunderstood a word in English because it looked like a French word but meant something different? (For example, "lecture" or "library.") How did you realize the mistake? Why is it important to check whether a statement is a fact or an opinion?' },
            { type: 'practice', activity: 'Read the passage below and answer the questions.\n\n"The school cafeteria has started offering salads and fruit alongside its regular menu. Student surveys show that 70% of students prefer pizza and burgers over salads. However, since the new options were introduced, the school nurse has reported fewer complaints of afternoon fatigue. The principal called the new menu \'a great step forward for our school community.\'"\n\n(a) What inference can you make about the effect of healthy food options?\n(b) Is the principal\'s statement a fact or an opinion?\n(c) What is the author\'s tone — supportive, critical, or neutral? What clues tell you?' }
          ],
          output: [
            { type: 'practice', activity: 'Read a short English news article. Write answers to these questions: (1) What is the author\'s purpose (inform, persuade, or both)? (2) Find one fact and one opinion in the article. (3) What is one conclusion you can draw that the author did not state directly?' },
            { type: 'practice', activity: 'Write a list of 5 French-English false cognates. For each one, write the French meaning, the English meaning, and a sentence using the English word correctly. Include "lecture" and at least 4 others.' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Inferring Meaning and Drawing Conclusions',
        estimatedMinutes: 45,
        objectives: [
          'Understand that texts sometimes have hidden or implied meanings',
          'Learn the difference between a fact and an opinion',
          'Watch out for false cognates between French and English'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Sometimes a text does not say everything directly. How can you figure out what the author really means?' },
            { type: 'reading', title: 'What Does the Author Really Mean?', content: 'When you read, sometimes the author does not say everything directly. You have to figure out the meaning from clues in the text. This is called making an inference.\n\nExample: "Maria grabbed her umbrella and raincoat before leaving the house." The author does not say it is raining, but you can infer that it is raining (or will rain) from the clues.\n\nIt is also important to know the difference between facts and opinions. A fact can be proven: "Paris is the capital of France." An opinion is what someone thinks or believes: "Paris is the most beautiful city in the world."\n\nWatch out for false cognates — words that look the same in French and English but have different meanings. The French word "lecture" means "reading." But in English, "lecture" means a talk or presentation by a teacher or professor. Other examples: "actually" in English means "in reality" (not "actuellement" = currently). "Library" means a place for borrowing books (not "librairie" = bookstore).' },
            { type: 'biblical-worldview', content: 'The Bible encourages us to look deeper and seek understanding. Proverbs 2:4-5 says to search for wisdom "like hidden treasures." When we learn to read between the lines, we are developing the discernment God values.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Have you ever been confused by a word that looks the same in French and English but means something different? What happened? Why is it important to know if a sentence is a fact or an opinion?' },
            { type: 'practice', activity: 'Read each sentence and say if it is a fact or an opinion:\n(a) "Canada has ten provinces." (Fact or opinion?)\n(b) "Canadian winters are too cold." (Fact or opinion?)\n(c) "The school has 500 students." (Fact or opinion?)\n(d) "This is the best school in the city." (Fact or opinion?)\n\nNow read this sentence and make an inference: "The students were wearing coats and scarves, and their breath was visible in the air." What can you infer about the weather?' }
          ],
          output: [
            { type: 'practice', activity: 'Write 2 facts and 2 opinions about your school or neighborhood. Label each one clearly.' },
            { type: 'practice', activity: 'Write the correct English meaning for these words (they are false cognates!): (1) "lecture" (2) "actually" (3) "library." Then use each one in a short English sentence.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'inference', definition: 'A conclusion reached based on evidence and reasoning rather than explicit statements in the text', example: 'I made an inference that the character was sad based on the description of her slow walk and downcast eyes.' },
      { term: 'author\'s purpose', definition: 'The reason an author writes a text — to inform, persuade, entertain, or provoke thought', example: 'The author\'s purpose was to persuade readers that recycling should be mandatory.' },
      { term: 'tone', definition: 'The author\'s attitude toward the subject, conveyed through word choice and style', example: 'The tone of the article was cautious — the author used words like "may" and "suggests" instead of "proves."' },
      { term: 'false cognate', definition: 'A word in one language that looks similar to a word in another language but has a different meaning', example: '"Lecture" is a false cognate: in French it means "reading," but in English it means "a formal presentation."' },
      { term: 'objective', definition: 'Based on facts and evidence rather than personal feelings or opinions; unbiased', example: 'The news report tried to be objective by presenting both sides of the argument.' },
      { term: 'hedging', definition: 'Language that softens a claim by using words like "may," "might," "suggests," or "appears to"', example: 'The researcher used hedging language: "The results suggest a possible connection" rather than "The results prove a connection."' }
    ],
    quiz: [
      { question: 'What does it mean to make an inference while reading?', options: ['To copy the text word for word', 'To draw a conclusion based on evidence and reasoning, not just what is directly stated', 'To look up every word in the dictionary', 'To skip difficult paragraphs'], correctAnswer: 1, explanation: 'An inference is a conclusion you draw by combining evidence from the text with your own knowledge and reasoning — it goes beyond what is directly stated.' },
      { question: 'What is the English meaning of "lecture" (a false cognate with French)?', options: ['Reading or the act of reading', 'A formal talk or presentation, especially at a university', 'A type of book', 'A written exam'], correctAnswer: 1, explanation: 'In English, "lecture" means a formal talk or presentation (often at a university). In French, "une lecture" means reading — making this a common false cognate.' },
      { question: 'Which of the following is a FACT?', options: ['Shakespeare is the greatest writer in history', 'Shakespeare was born in 1564 in Stratford-upon-Avon', 'Shakespeare\'s plays are more interesting than modern films', 'Everyone should read Shakespeare'], correctAnswer: 1, explanation: 'Shakespeare\'s birth date and birthplace are verifiable facts. The other options are opinions or value judgments.' },
      { question: 'What does "hedging" language in academic writing indicate?', options: ['The author is lying', 'The author is being cautious and precise, acknowledging uncertainty', 'The author does not understand the topic', 'The text is poorly written'], correctAnswer: 1, explanation: 'Hedging language (may, suggests, appears) is standard in academic writing. It shows the author is being precise and acknowledging the limits of the evidence.' },
      { question: 'If a text describes a city with closed shops, empty streets, and boarded-up windows, what can you infer?', options: ['The city is thriving economically', 'The city is experiencing economic decline or abandonment', 'It is a holiday', 'The shops are being renovated'], correctAnswer: 1, explanation: 'Multiple details — closed shops, empty streets, boarded-up windows — together suggest economic decline, even though the text does not state this directly.' },
      { question: 'What is the author\'s purpose in a persuasive essay?', options: ['To entertain the reader with a story', 'To convince the reader to accept a particular viewpoint', 'To present only neutral facts', 'To confuse the reader'], correctAnswer: 1, explanation: 'A persuasive essay\'s purpose is to convince the reader to agree with the author\'s position on an issue, using evidence and argumentation.' },
      { question: 'The English word "actually" means:', options: ['Currently (at this time)', 'In reality; in fact', 'Usually', 'Finally'], correctAnswer: 1, explanation: '"Actually" is a false cognate: in English it means "in reality/in fact," while the French "actuellement" means "currently." This is a common source of confusion.' },
      { question: 'How can you identify the author\'s tone in a text?', options: ['By counting the number of paragraphs', 'By examining word choices, sentence structure, and emphasis', 'By reading only the title', 'Tone cannot be identified in writing'], correctAnswer: 1, explanation: 'Tone is revealed through the author\'s specific word choices, sentence structure, use of hedging or assertive language, and overall emphasis.' },
      { question: 'What is the difference between an objective and a subjective text?', options: ['Objective texts are longer', 'Objective texts present facts without bias; subjective texts include personal feelings or opinions', 'Subjective texts are always wrong', 'There is no real difference'], correctAnswer: 1, explanation: 'Objective texts aim to present facts and evidence without personal bias, while subjective texts include the author\'s personal feelings, interpretations, or opinions.' },
      { question: 'Which biblical principle relates most directly to critical reading and inference?', options: ['Seek wisdom like hidden treasure (Proverbs 2:3-5)', 'Do not read academic texts', 'Accept everything at face value', 'Only read texts written by Christians'], correctAnswer: 0, explanation: 'Proverbs 2:3-5 encourages seeking understanding "like hidden treasures," which parallels the skill of reading beyond the surface to discover deeper meaning through inference.' }
    ]
  },

  // W4: Annotated Bibliography (PROJECT)
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Annotated Bibliography',
        estimatedMinutes: 80,
        objectives: [
          'Select and evaluate three academic sources on a topic of interest',
          'Write properly formatted annotated bibliography entries using APA or MLA style',
          'Summarize, evaluate, and reflect on each source\'s contribution to the topic',
          'Demonstrate mastery of skimming, scanning, previewing, and inference skills in source selection'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'How do researchers organize and evaluate the sources they find? What tool helps them keep track of what each source says and whether it is reliable?' },
            { type: 'reading', title: 'Creating an Annotated Bibliography', content: 'An annotated bibliography is a list of sources (articles, books, websites) on a topic, where each source is followed by a brief paragraph (the annotation) that summarizes, evaluates, and reflects on the source. It is a foundational academic skill used in research papers, dissertations, and professional reports.\n\nEach annotation typically has three parts:\n1. Summary (3-4 sentences): What is the source about? What are its main arguments or findings?\n2. Evaluation (2-3 sentences): Is the source reliable? Is the evidence strong? Is there any bias?\n3. Reflection (1-2 sentences): How does this source relate to your topic? How might you use it in a research project?\n\nFor this project, you will choose a topic, find three English-language sources, and write an annotated bibliography. Use the reading strategies from this unit — previewing to select sources, skimming to get the main idea, scanning to find key details, and inference to evaluate reliability and tone.' },
            { type: 'biblical-worldview', content: 'Proverbs 15:14 says, "The heart of him who has understanding seeks knowledge." Creating an annotated bibliography is an exercise in seeking knowledge carefully and systematically. By evaluating sources for reliability and truth, we practice the discernment Scripture calls us to.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'What makes a source reliable or unreliable? How can you use the skills of inference and critical reading to evaluate whether a source is trustworthy? What criteria would you use to decide if an article is worth including in your bibliography?' },
            { type: 'practice', activity: 'Choose a topic you are interested in (e.g., "the effects of technology on education," "bilingual education benefits," "climate change solutions"). Use previewing and skimming to find and select three English-language sources (articles, reputable websites, or academic papers). For each, write down: the title, author, publication, and a 2-sentence summary of the main idea.' }
          ],
          output: [
            { type: 'project', title: 'Annotated Bibliography', instructions: 'Create a complete annotated bibliography with the following requirements:\n\n1. Choose a topic relevant to your academic interests\n2. Find 3 English-language sources (articles, academic papers, or reputable websites)\n3. For each source, write:\n   - A proper citation (APA or MLA format)\n   - A summary (3-4 sentences describing the main arguments or findings)\n   - An evaluation (2-3 sentences assessing reliability, evidence quality, and potential bias)\n   - A reflection (1-2 sentences explaining how the source relates to your topic)\n4. Write a brief introduction (3-4 sentences) explaining your topic and why you chose it\n\nTotal length: approximately 500-700 words\nDemonstrate the reading strategies from this unit: mention which strategy (skimming, scanning, previewing, or inference) helped you during your research process.' },
            { type: 'rubric', criteria: [
              { name: 'Source Selection', points: 20, description: 'Three relevant, credible English-language sources selected; variety of source types' },
              { name: 'Citation Format', points: 15, description: 'Proper APA or MLA citation format for all three sources' },
              { name: 'Summary Quality', points: 20, description: 'Clear, accurate summaries that capture the main arguments of each source' },
              { name: 'Evaluation Depth', points: 20, description: 'Thoughtful evaluation of reliability, evidence, and potential bias' },
              { name: 'Reflection and Connection', points: 15, description: 'Clear explanation of how each source relates to the chosen topic' },
              { name: 'Language and Mechanics', points: 10, description: 'Clear academic English with minimal grammatical errors' }
            ]}
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Annotated Bibliography',
        estimatedMinutes: 60,
        objectives: [
          'Find and select three English-language sources on a topic',
          'Write a summary and evaluation for each source',
          'Practice using reading strategies to select and understand sources'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you research a topic, how do you keep track of the articles and sources you find? How do you decide which ones are useful?' },
            { type: 'reading', title: 'What is an Annotated Bibliography?', content: 'An annotated bibliography is a list of sources with a short paragraph about each one. For each source, you write a summary (what it is about) and an evaluation (whether it is reliable and useful).\n\nYour annotation for each source should include:\n1. Summary (2-3 sentences): What is the main idea of the source?\n2. Evaluation (1-2 sentences): Is the source reliable? Why or why not?\n3. Usefulness (1 sentence): How could this source be used in a research project?\n\nFor this project, choose a topic, find 3 English sources, and write an annotated bibliography. Use your reading strategies: preview each source to decide if it is relevant, skim to find the main idea, and scan for key facts.' },
            { type: 'biblical-worldview', content: 'Proverbs 15:14 tells us that the person with understanding seeks knowledge. By carefully selecting and evaluating sources, we practice the discernment that honors God.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'How do you decide if a website or article is reliable? What signs might tell you that a source is biased or untrustworthy?' },
            { type: 'practice', activity: 'Choose a topic and find 3 English-language sources (news articles, educational websites, or short articles). For each one, write the title and a one-sentence summary of the main idea.' }
          ],
          output: [
            { type: 'project', title: 'Annotated Bibliography', instructions: 'Create an annotated bibliography:\n\n1. Choose a topic you find interesting\n2. Find 3 English-language sources\n3. For each source, write:\n   - The title, author (if available), and where you found it (website name or publication)\n   - A summary (2-3 sentences about the main idea)\n   - An evaluation (1-2 sentences: Is it reliable? Is it useful?)\n4. Write 2-3 sentences introducing your topic\n\nTotal length: approximately 300-400 words' },
            { type: 'rubric', criteria: [
              { name: 'Source Selection', points: 25, description: 'Three relevant English-language sources found' },
              { name: 'Summary Quality', points: 25, description: 'Clear summaries that accurately describe each source' },
              { name: 'Evaluation', points: 25, description: 'Basic evaluation of reliability and usefulness' },
              { name: 'Language and Mechanics', points: 25, description: 'Clear English writing with reasonable grammar' }
            ]}
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Annotated Bibliography',
        estimatedMinutes: 45,
        objectives: [
          'Find 3 English-language articles on a topic',
          'Write a short summary for each article',
          'Practice previewing and skimming to choose useful sources'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you need information about a topic, how do you choose which articles to read? How do you know if they are good sources?' },
            { type: 'reading', title: 'Making a Source List with Summaries', content: 'An annotated bibliography is a list of articles or websites you have read, with a short note about each one. The note tells what the source is about and whether it is useful.\n\nFor each source, write:\n1. The title and where you found it\n2. A summary: What is it about? (2 sentences)\n3. Your opinion: Is it useful and reliable? (1 sentence)\n\nUse previewing (look at the title and headings) and skimming (read quickly for the main idea) to choose your sources.' },
            { type: 'biblical-worldview', content: 'Proverbs 15:14 says the person with understanding seeks knowledge. Choosing good sources and summarizing them is a way of seeking knowledge carefully, as God wants us to.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'How do you usually find information when you need to learn about something? Do you use a search engine? How do you decide which results to click on?' },
            { type: 'practice', activity: 'Choose a simple topic (e.g., "healthy eating," "learning a new language," or "teamwork in sports"). Search for and find 3 short English articles or web pages. Write down the title of each one.' }
          ],
          output: [
            { type: 'project', title: 'Annotated Bibliography', instructions: 'Create a simple annotated bibliography:\n\n1. Choose a topic\n2. Find 3 English articles or web pages about your topic\n3. For each one, write:\n   - The title and website name\n   - A summary (2 sentences about what it says)\n   - One sentence: Is this source useful? Why?\n\nTotal length: approximately 150-200 words' },
            { type: 'rubric', criteria: [
              { name: 'Sources Found', points: 30, description: 'Three English-language sources identified with titles' },
              { name: 'Summaries', points: 40, description: 'Clear 2-sentence summaries for each source' },
              { name: 'Usefulness Comment', points: 30, description: 'Brief evaluation of each source\'s usefulness' }
            ]}
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'annotated bibliography', definition: 'A list of sources on a topic where each source is followed by a summary, evaluation, and reflection', example: 'The professor asked us to create an annotated bibliography with five sources for our research paper.' },
      { term: 'citation', definition: 'A reference to a source that includes the author, title, publication, and date, formatted according to a style guide', example: 'Make sure every source in your bibliography has a proper citation in APA format.' },
      { term: 'evaluate', definition: 'To judge the quality, reliability, or importance of something based on careful examination', example: 'We need to evaluate whether this website is a reliable source before using it in our essay.' },
      { term: 'credible', definition: 'Trustworthy and reliable; able to be believed based on evidence or reputation', example: 'Academic journals are generally more credible sources than personal blogs.' },
      { term: 'bias', definition: 'A tendency to favor one perspective over another, which may affect the fairness or accuracy of information', example: 'The article showed bias toward one political party, so I looked for a more objective source.' }
    ],
    quiz: []
  }
]

// ============================================================
// UNIT 2: Academic Writing Foundations
// ============================================================

const unit2Lessons: EnrichedLesson[] = [
  // W1: Paragraph Structure and Coherence (INSTRUCTION)
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Paragraph Structure and Coherence',
        estimatedMinutes: 80,
        objectives: [
          'Construct well-organized English paragraphs with clear topic sentences, supporting details, and concluding sentences',
          'Use a variety of transition words and phrases to create coherence within and between paragraphs',
          'Analyze the differences between the French dissertation structure and the English direct-argument model',
          'Revise paragraphs for unity, coherence, and logical flow'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'What makes one paragraph feel smooth and easy to follow while another feels disjointed and confusing? What invisible threads hold good academic writing together?' },
            { type: 'reading', title: 'The Architecture of Effective Paragraphs', content: 'A well-structured English academic paragraph is not simply a collection of sentences on the same topic. It is a carefully constructed unit of thought with a clear internal architecture: a topic sentence, supporting sentences, and a concluding sentence, all connected by transitions that create coherence.\n\nThe topic sentence is the paragraph\'s foundation. It states the main idea clearly and directly, usually as the first sentence. Everything in the paragraph must relate to this sentence. If a sentence does not support the topic sentence, it does not belong in the paragraph — this is the principle of unity.\n\nSupporting sentences develop the topic sentence through examples, evidence, explanations, and analysis. These sentences should follow a logical order: chronological (time sequence), order of importance (least to most important, or vice versa), cause and effect, or comparison and contrast. The order you choose depends on your purpose and the nature of your evidence.\n\nThe concluding sentence closes the paragraph by reinforcing the main idea, summarizing the key point, or creating a transition to the next paragraph. It should not introduce new information but rather tie the paragraph together.\n\nTransitions are the connective tissue of academic writing. They signal relationships between ideas and guide the reader through your argument. Key categories include:\n- Addition: furthermore, moreover, in addition, also, additionally\n- Contrast: however, nevertheless, on the other hand, in contrast, although\n- Cause/Effect: consequently, therefore, as a result, thus, hence\n- Example: for instance, for example, specifically, to illustrate\n- Sequence: first, second, next, then, finally\n- Summary: in conclusion, in summary, to sum up, overall\n\nFor French-speaking students, a fundamental structural difference must be internalized. The French dissertation tradition follows a thèse-antithèse-synthèse model: present a position, present the counterargument, then synthesize. This dialectical approach builds complexity gradually. English academic writing, however, is predominantly direct and deductive: state your position clearly at the outset, then provide evidence paragraph by paragraph. Each paragraph makes one point that directly supports the thesis. There is no expectation that the writer will argue against their own position within the same essay (though acknowledging counterarguments is common in advanced writing). Understanding this structural difference is essential for writing that English-speaking readers will find clear and persuasive.\n\nCoherence means that the paragraph reads smoothly — each sentence connects logically to the next. Coherence is achieved through transitions, consistent pronoun reference, repetition of key terms, and parallel structure. A paragraph can have unity (all sentences relate to the topic) but still lack coherence if the sentences do not flow into each other logically.' },
            { type: 'text', content: 'Consider the difference between these two versions of the same paragraph:\n\nVersion A (weak coherence): "Exercise improves health. Students who exercise get better grades. Physical activity reduces stress. Schools should have more PE classes."\n\nVersion B (strong coherence): "Regular exercise significantly improves both physical health and academic performance. Students who engage in physical activity at least three times per week consistently earn higher grades than their sedentary peers. Moreover, exercise reduces stress and anxiety, which are common barriers to effective studying. Consequently, schools would benefit from increasing the number of physical education classes in their weekly schedules."\n\nVersion B uses transitions (moreover, consequently), specific language, and logical flow to connect each sentence to the next.' },
            { type: 'biblical-worldview', content: 'Just as coherent writing connects ideas in a logical flow, Scripture reveals a coherent story from Genesis to Revelation. God is a God of order, not confusion (1 Corinthians 14:33). When we write clearly and organize our thoughts with care, we reflect the orderly nature of our Creator. Academic writing is an act of stewardship — using the gift of language to communicate truth effectively.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Compare the French thèse-antithèse-synthèse structure with the English direct-argument model. In what situations might the French approach be more effective? In what situations is the English direct approach clearer? How do you need to adjust your writing habits when writing in English versus French?' },
            { type: 'practice', activity: 'Rewrite the following weak paragraph to improve its coherence. Add transitions, a clear topic sentence, and a concluding sentence. You may also reorder the sentences if needed.\n\nWeak paragraph: "Many students do not eat breakfast. Breakfast helps the brain function better in the morning. Studies show breakfast eaters perform better on tests. Some students say they do not have time. Schools could offer breakfast programs. Eating in the morning gives energy for the whole day."' }
          ],
          output: [
            { type: 'practice', activity: 'Write two well-structured paragraphs on the following topic: "The benefits of learning a second language." Each paragraph should have: a topic sentence, 3-4 supporting sentences with at least two different types of transitions, and a concluding sentence. After writing, underline your topic sentences, circle your transitions, and verify that every sentence relates to the topic sentence (unity). Your total should be approximately 200-250 words.' },
            { type: 'practice', activity: 'Analyze the following paragraph by identifying: (1) the topic sentence, (2) three transitions and what relationship each signals (addition, contrast, cause/effect, etc.), (3) whether the paragraph has unity (do all sentences support the topic sentence?), and (4) the concluding sentence.\n\nParagraph: "Learning to code has become an essential skill in the modern workforce. First, many well-paying jobs now require at least basic programming knowledge, even in fields outside of technology. For example, data analysis in marketing, finance, and healthcare increasingly relies on coding skills. Furthermore, learning to code develops logical thinking and problem-solving abilities that transfer to other areas of life. However, access to coding education remains unequal, with students in lower-income communities often lacking the resources and instruction available in wealthier districts. Therefore, expanding coding education to all schools should be a priority for educational policymakers."' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Paragraph Structure and Coherence',
        estimatedMinutes: 60,
        objectives: [
          'Write English paragraphs with a topic sentence, supporting sentences, and a concluding sentence',
          'Use transition words to connect ideas within a paragraph',
          'Understand the difference between French and English paragraph organization'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'What makes a paragraph easy to read and understand? What happens when a paragraph has no clear structure?' },
            { type: 'reading', title: 'Building Strong Paragraphs', content: 'A good English paragraph has three parts:\n\n1. Topic sentence: The first sentence that states the main idea. It tells the reader what the paragraph is about.\n2. Supporting sentences: The middle sentences that give examples, facts, and explanations to develop the main idea.\n3. Concluding sentence: The last sentence that summarizes or wraps up the paragraph.\n\nTransition words help connect your ideas and make your paragraph flow smoothly. Common transitions include:\n- To add information: also, furthermore, in addition, moreover\n- To show contrast: however, on the other hand, but, although\n- To show cause and effect: therefore, as a result, consequently\n- To give examples: for example, for instance, such as\n\nImportant difference for French speakers: In French essays (the dissertation), you often present an idea, then the opposite idea, then a conclusion that combines both (thèse-antithèse-synthèse). In English, you state your main point first and then give evidence to support it. Each paragraph focuses on one point that supports your thesis. This direct approach may feel different from what you are used to, but it is what English readers expect.' },
            { type: 'biblical-worldview', content: 'God is a God of order, not confusion (1 Corinthians 14:33). When we organize our writing clearly, we reflect God\'s orderly nature. Good writing is a way of honoring God with the communication skills He has given us.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Think about a paragraph you have written recently (in French or English). Did it have a clear topic sentence? Did you use transition words? How might the strategies in this lesson improve your writing?' },
            { type: 'practice', activity: 'Read the paragraph below and identify the topic sentence, two transitions, and the concluding sentence.\n\n"Volunteering benefits both the community and the volunteer. For example, community organizations like food banks rely on volunteers to serve hundreds of families each week. In addition, volunteers gain valuable experience and skills that can help them in future careers. Furthermore, studies show that people who volunteer regularly report higher levels of happiness and life satisfaction. Overall, volunteering is a rewarding activity that makes a positive impact on everyone involved."' }
          ],
          output: [
            { type: 'practice', activity: 'Write a well-structured paragraph (6-8 sentences) on one of these topics: "Why reading is important for students" or "The advantages of learning English." Include a topic sentence, at least 3 supporting sentences with transition words, and a concluding sentence.' },
            { type: 'practice', activity: 'Rewrite this weak paragraph by adding a topic sentence, transitions, and a concluding sentence: "Some people like to study alone. Study groups help students learn from each other. Discussing ideas helps you remember them better. You can quiz each other before exams."' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Paragraph Structure and Coherence',
        estimatedMinutes: 45,
        objectives: [
          'Write a paragraph with a topic sentence, supporting sentences, and a concluding sentence',
          'Use simple transition words (also, however, for example) to connect ideas',
          'Know that English paragraphs start with the main idea'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'What makes a paragraph clear and easy to follow? What happens if you just write sentences without any order?' },
            { type: 'reading', title: 'How to Write a Good Paragraph', content: 'A good paragraph in English has three parts:\n\n1. Topic sentence: The first sentence tells the main idea.\n2. Supporting sentences: The next sentences give examples or details.\n3. Concluding sentence: The last sentence wraps up the paragraph.\n\nTransition words help connect your sentences:\n- Also, in addition = to add more information\n- However, but = to show a difference\n- For example = to give an example\n- Therefore = to show a result\n\nIn English, always put your main idea first. Then give your reasons and examples.\n\nExample:\n"Exercise is important for students. First, it helps the brain work better. Also, it reduces stress before exams. For example, a 20-minute walk can improve concentration. Therefore, students should try to exercise every day."' },
            { type: 'biblical-worldview', content: 'God is a God of order (1 Corinthians 14:33). When we organize our writing clearly, we use our skills in a way that honors Him.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Look at the example paragraph about exercise. Can you find the topic sentence? Can you find the transitions (first, also, for example, therefore)? How do the transitions help you follow the ideas?' },
            { type: 'practice', activity: 'Put these sentences in the right order to make a good paragraph. Then add transition words where needed.\n\n___ It keeps our bodies strong and healthy.\n___ Walking, swimming, and playing sports are great options.\n___ Exercise is good for everyone.\n___ We should all try to move for at least 30 minutes each day.' }
          ],
          output: [
            { type: 'practice', activity: 'Write a paragraph (4-5 sentences) about "My favorite food." Start with a topic sentence. Use at least two transition words (also, for example, because). End with a concluding sentence.' },
            { type: 'practice', activity: 'Write a paragraph (4-5 sentences) about "Why learning English is useful." Start with the main idea. Give 2 reasons with transition words.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'coherence', definition: 'The quality of being logically connected and flowing smoothly, so that ideas are easy to follow', example: 'The paragraph had good coherence because each sentence connected logically to the next.' },
      { term: 'unity', definition: 'The principle that every sentence in a paragraph should relate to and support the topic sentence', example: 'The teacher noted that the paragraph lacked unity because the third sentence was off-topic.' },
      { term: 'transition', definition: 'A word or phrase that connects ideas and shows the relationship between sentences or paragraphs', example: 'The transition word "however" signals that the next idea will contrast with the previous one.' },
      { term: 'topic sentence', definition: 'The sentence that states the main idea of a paragraph, usually placed at the beginning in English writing', example: 'The topic sentence of the paragraph was: "Technology has transformed modern education."' },
      { term: 'concluding sentence', definition: 'The final sentence of a paragraph that summarizes the main point or provides closure', example: 'The concluding sentence tied the paragraph together by restating the importance of exercise.' },
      { term: 'furthermore', definition: 'A transition word meaning "in addition" or "moreover," used to add information that supports the same point', example: 'The climate is warming. Furthermore, sea levels are rising at an unprecedented rate.' },
      { term: 'consequently', definition: 'A transition word meaning "as a result" or "therefore," used to show cause and effect', example: 'The company reduced its workforce. Consequently, production decreased by 30%.' },
      { term: 'dissertation', definition: 'In the French academic tradition, a formal essay following the thèse-antithèse-synthèse structure; in English, a long research document for a doctoral degree', example: 'The French dissertation structure presents the argument, counterargument, and synthesis, which differs from English essay organization.' }
    ],
    quiz: [
      { question: 'What are the three main parts of a well-structured English paragraph?', options: ['Introduction, body, conclusion', 'Topic sentence, supporting sentences, concluding sentence', 'Title, subtitle, paragraph', 'Thesis, antithesis, synthesis'], correctAnswer: 1, explanation: 'A well-structured English paragraph consists of a topic sentence (main idea), supporting sentences (evidence and examples), and a concluding sentence (closure).' },
      { question: 'Where does the topic sentence usually appear in an English academic paragraph?', options: ['At the end', 'In the middle', 'At the beginning (first sentence)', 'It does not appear in the paragraph'], correctAnswer: 2, explanation: 'In English academic writing, the topic sentence is typically the first sentence of the paragraph, stating the main idea directly.' },
      { question: 'Which transition word signals a contrast between ideas?', options: ['Furthermore', 'However', 'In addition', 'For example'], correctAnswer: 1, explanation: '"However" signals a contrast or opposition between the previous idea and the one that follows. "Furthermore" and "In addition" signal addition, while "For example" introduces an illustration.' },
      { question: 'What is the principle of paragraph unity?', options: ['Every paragraph should be the same length', 'Every sentence should relate to and support the topic sentence', 'Every paragraph should have exactly five sentences', 'Every sentence should start with a transition word'], correctAnswer: 1, explanation: 'Unity means every sentence in a paragraph should relate to and support the topic sentence. If a sentence is off-topic, it breaks the paragraph\'s unity.' },
      { question: 'How does French dissertation structure differ from English essay structure?', options: ['French uses thèse-antithèse-synthèse; English states the thesis first and supports it directly', 'They are identical', 'English uses thèse-antithèse-synthèse', 'French essays have no structure'], correctAnswer: 0, explanation: 'French dissertation structure follows thèse-antithèse-synthèse (argument, counterargument, synthesis), while English academic writing states the thesis upfront and supports it with evidence in each paragraph.' },
      { question: 'What does the transition "consequently" signal?', options: ['An additional point', 'A contrasting idea', 'A cause-and-effect relationship', 'An example'], correctAnswer: 2, explanation: '"Consequently" signals a cause-and-effect relationship, meaning the following statement is a result of the previous one.' },
      { question: 'What is coherence in writing?', options: ['Using complex vocabulary', 'The logical connection and smooth flow between sentences', 'Writing very long paragraphs', 'Using only short sentences'], correctAnswer: 1, explanation: 'Coherence means ideas are logically connected and flow smoothly from one sentence to the next, making the text easy to follow.' },
      { question: 'Which sentence would BREAK the unity of a paragraph about the benefits of exercise?', options: ['"Exercise improves cardiovascular health."', '"Regular physical activity reduces stress."', '"My favorite color is blue."', '"Students who exercise perform better academically."'], correctAnswer: 2, explanation: '"My favorite color is blue" has nothing to do with the benefits of exercise and would break the paragraph\'s unity.' },
      { question: 'What is the purpose of a concluding sentence in a paragraph?', options: ['To introduce a completely new topic', 'To summarize or reinforce the main idea and provide closure', 'To ask the reader a question', 'To list all the transition words used'], correctAnswer: 1, explanation: 'The concluding sentence wraps up the paragraph by summarizing the main point, reinforcing the key idea, or creating a smooth transition to the next paragraph.' },
      { question: 'Which biblical principle connects to organizing writing clearly?', options: ['God is a God of order, not confusion (1 Corinthians 14:33)', 'Writing should be as complex as possible', 'Grammar rules are not important', 'Only write about religious topics'], correctAnswer: 0, explanation: 'God is a God of order, not confusion (1 Corinthians 14:33). Organizing writing clearly reflects God\'s orderly nature and is good stewardship of communication skills.' }
    ]
  },

  // W2: Essay Organization and Thesis Statements (INSTRUCTION)
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Essay Organization and Thesis Statements',
        estimatedMinutes: 80,
        objectives: [
          'Craft clear, arguable thesis statements that guide an entire essay',
          'Organize a five-paragraph essay with a logical introduction, body, and conclusion',
          'Develop effective introduction hooks that engage the reader from the first sentence',
          'Create detailed outlines that map the argument structure before drafting'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'What separates a mediocre essay from an excellent one? Often, the difference lies not in the quality of individual sentences but in the strength of the thesis and the logic of the organization. How do you build an argument that holds together from start to finish?' },
            { type: 'reading', title: 'From Thesis to Outline: Building the Essay Blueprint', content: 'The thesis statement is the single most important sentence in any academic essay. It is the claim that the entire essay will prove, and every paragraph must connect back to it. A strong thesis statement has three qualities: it is specific (not vague), arguable (someone could disagree), and significant (it addresses something that matters).\n\nCompare these thesis statements:\n- Weak: "Technology is important." (Too vague — what technology? Important how?)\n- Better: "Technology has changed education." (More specific, but still broad)\n- Strong: "The integration of AI tutoring systems in secondary schools has significantly improved student engagement and test scores, particularly for students who previously struggled in traditional classroom settings." (Specific, arguable, significant)\n\nThe five-paragraph essay is the foundational structure of English academic writing. While advanced writing may deviate from this structure, mastering it first is essential:\n\n1. Introduction paragraph: Hook the reader, provide context, and state the thesis (usually the last sentence).\n2. Body paragraph 1: First main point supporting the thesis.\n3. Body paragraph 2: Second main point supporting the thesis.\n4. Body paragraph 3: Third main point supporting the thesis (or a counterargument and rebuttal).\n5. Conclusion paragraph: Restate the thesis (in different words), summarize key points, and end with a broader implication or call to action.\n\nThe introduction hook is your first opportunity to capture the reader\'s attention. Effective hooks include: a surprising statistic, a thought-provoking question, a relevant quotation, a brief anecdote, or a bold statement. The hook leads into background information that provides context, narrowing toward the thesis statement.\n\nFor French-speaking students, the key adjustment is directness. In the French tradition, essays often build intellectual complexity through dialectical reasoning — presenting, challenging, and synthesizing ideas. In English, the thesis is stated plainly and early. The body paragraphs do not argue against the thesis but rather build evidence for it. If you wish to address a counterargument (which strengthens your essay), do so in one body paragraph and then refute it, returning to support your thesis.\n\nAn outline is your construction blueprint. Before writing a single paragraph, create an outline that includes: the thesis statement, the main point of each body paragraph (which will become topic sentences), the key evidence or examples for each paragraph, and notes for the introduction hook and conclusion. This planning step saves time and produces stronger essays because you can see the logical structure before committing to full sentences.' },
            { type: 'text', content: 'Sample outline structure:\n\nI. Introduction\n   A. Hook: Surprising statistic about student performance\n   B. Context: Brief history of AI in education\n   C. Thesis: AI tutoring systems significantly improve engagement and scores for struggling students\n\nII. Body Paragraph 1: Improved engagement\n   A. Topic sentence about engagement\n   B. Evidence: Study from University X showing 40% increase\n   C. Explanation of how AI personalizes learning\n\nIII. Body Paragraph 2: Higher test scores\n   A. Topic sentence about academic improvement\n   B. Evidence: Data from pilot program in 50 schools\n   C. Comparison with traditional tutoring methods\n\nIV. Body Paragraph 3: Benefits for struggling students specifically\n   A. Topic sentence about equity and access\n   B. Evidence: Testimonials and data from underperforming schools\n   C. Analysis of why AI helps this population\n\nV. Conclusion\n   A. Restated thesis (different words)\n   B. Summary of three key points\n   C. Broader implication: future of personalized education' },
            { type: 'biblical-worldview', content: 'Proverbs 24:27 advises, "Prepare your work outside; get everything ready for yourself in the field, and after that build your house." This principle of preparation before action applies directly to essay writing: plan your outline before you draft. Good planning reflects the wisdom God calls us to cultivate, and clear communication of truth honors Him.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Evaluate these three thesis statements. Which is strongest and why? (a) "Social media is bad." (b) "Social media has both positive and negative effects on teenagers." (c) "Excessive social media use among teenagers correlates with increased anxiety, yet platforms that facilitate community building can provide valuable support networks for isolated youth." How does each one measure up in terms of being specific, arguable, and significant?' },
            { type: 'practice', activity: 'Write three different thesis statements for the topic "The role of technology in education." Make one weak (too vague), one moderate, and one strong. Then create a complete outline for a five-paragraph essay using your strong thesis. Include: a hook idea, the thesis, topic sentences for three body paragraphs, two pieces of evidence per paragraph, and a concluding statement.' }
          ],
          output: [
            { type: 'practice', activity: 'Write a complete introduction paragraph (6-8 sentences) for an essay on one of these topics: "Why bilingualism is an advantage in the modern world" or "The impact of social media on student learning." Your introduction must include: (1) an engaging hook, (2) 2-3 sentences of background context, and (3) a strong thesis statement as the final sentence. After writing, label each part of your introduction.' },
            { type: 'practice', activity: 'Compare the English five-paragraph essay structure with the French dissertation structure in a brief analysis (150-200 words). Address these questions: How is the thesis positioned differently? How do body paragraphs function in each tradition? What is the role of counterarguments? When might each approach be more effective? Use specific examples from this lesson.' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Essay Organization and Thesis Statements',
        estimatedMinutes: 60,
        objectives: [
          'Write a clear thesis statement that states the main argument of an essay',
          'Understand the five-paragraph essay structure',
          'Create an outline before writing an essay'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Before you start building a house, you need a blueprint. How is writing an essay similar to building something — and what is the "blueprint" for a good essay?' },
            { type: 'reading', title: 'Organizing Your Essay', content: 'A thesis statement is the main argument of your essay. It tells the reader exactly what you will prove. A good thesis is specific (not too general) and arguable (someone could disagree with it).\n\nExamples:\n- Too general: "Exercise is good."\n- Good thesis: "Regular exercise improves students\' grades, reduces stress, and builds confidence."\n\nThe five-paragraph essay is the basic structure for English essays:\n1. Introduction: Start with a hook (an interesting fact, question, or statement), give some background, and end with your thesis.\n2. Body Paragraph 1: First reason or point supporting your thesis.\n3. Body Paragraph 2: Second reason or point.\n4. Body Paragraph 3: Third reason or point.\n5. Conclusion: Restate your thesis in different words, summarize your points, and end with a final thought.\n\nFor French speakers: In English, state your thesis clearly in the introduction — do not wait until the end. Each body paragraph makes one clear point that supports your thesis. This is more direct than the French thèse-antithèse-synthèse approach.\n\nBefore writing, create an outline:\n- Write your thesis\n- List your three main points\n- Note 1-2 pieces of evidence for each point\n- Plan your hook and conclusion\n\nAn outline helps you organize your ideas before you start writing and makes the drafting process much easier.' },
            { type: 'biblical-worldview', content: 'Proverbs 24:27 says, "Prepare your work outside; get everything ready for yourself in the field, and after that build your house." Planning before writing — like creating an outline — reflects the wisdom God calls us to practice in all areas of life.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Look at these two thesis statements: (a) "Dogs are nice." (b) "Dogs make excellent therapy animals because they reduce anxiety, provide unconditional companionship, and motivate patients to be more physically active." Which is stronger? Why? What makes the second one better?' },
            { type: 'practice', activity: 'Write a thesis statement for the topic "The importance of learning English as a second language." Then create a simple outline for a five-paragraph essay: list your thesis, three main points (one for each body paragraph), and one piece of evidence or example for each point.' }
          ],
          output: [
            { type: 'practice', activity: 'Write an introduction paragraph (5-6 sentences) for an essay about "Why students should learn a second language." Include: a hook (interesting question or fact), 1-2 sentences of context, and a thesis statement at the end.' },
            { type: 'practice', activity: 'Create a complete outline for a five-paragraph essay on the topic "How technology helps students learn." Include: your thesis, a topic sentence for each of the three body paragraphs, and one piece of evidence for each paragraph.' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Essay Organization and Thesis Statements',
        estimatedMinutes: 45,
        objectives: [
          'Understand what a thesis statement is and why it is important',
          'Know the five parts of a five-paragraph essay',
          'Create a simple outline for an essay'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you write an essay, where do you start? What if there was a simple plan that makes writing easier?' },
            { type: 'reading', title: 'Planning Your Essay', content: 'A thesis statement is the main point of your essay in one sentence. It tells the reader what you will write about and what you believe.\n\nExample:\n- Topic: Homework\n- Thesis: "Homework helps students practice what they learn and improves their grades."\n\nA five-paragraph essay has five parts:\n1. Introduction: Start with something interesting, then state your thesis.\n2. Paragraph 2: Give your first reason.\n3. Paragraph 3: Give your second reason.\n4. Paragraph 4: Give your third reason.\n5. Conclusion: Repeat your main idea and finish with a final thought.\n\nTip: In English, say your main idea at the beginning, not the end. This is different from French essay writing.\n\nBefore you write, make an outline:\n- Thesis: your main point\n- Reason 1\n- Reason 2\n- Reason 3' },
            { type: 'biblical-worldview', content: 'Proverbs 24:27 teaches us to prepare before we build. Making an outline before writing an essay is a way of following this wise advice.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Which thesis is better? (a) "Sports are fun." (b) "Playing team sports helps young people learn teamwork, stay healthy, and build confidence." Why is the second one better?' },
            { type: 'practice', activity: 'Write a thesis statement for the topic "Why breakfast is important for students." Then list 3 reasons that support your thesis.' }
          ],
          output: [
            { type: 'practice', activity: 'Create a simple outline for a five-paragraph essay about "Why reading is important." Write: your thesis statement, reason 1, reason 2, and reason 3.' },
            { type: 'practice', activity: 'Write 2-3 sentences that could be the beginning of an essay about "My favorite subject in school." Start with something interesting (a question, a fun fact, or a short story), then state your main idea.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'thesis statement', definition: 'A sentence that states the main argument or claim of an entire essay, usually found at the end of the introduction', example: 'My thesis statement was: "Regular exercise significantly improves academic performance in high school students."' },
      { term: 'five-paragraph essay', definition: 'The standard English essay structure consisting of an introduction, three body paragraphs, and a conclusion', example: 'The teacher asked us to write a five-paragraph essay on the causes of the American Revolution.' },
      { term: 'hook', definition: 'An opening sentence or sentences designed to grab the reader\'s attention at the beginning of an essay', example: 'The essay began with a surprising statistic as a hook: "Over 50% of students report feeling stressed about exams."' },
      { term: 'outline', definition: 'A structured plan for an essay that lists the thesis, main points, and supporting evidence before writing', example: 'Creating an outline first made it much easier to organize my ideas before I started writing.' },
      { term: 'body paragraph', definition: 'A paragraph in the middle section of an essay that presents one main point and evidence supporting the thesis', example: 'Each body paragraph focused on a different benefit of bilingual education.' },
      { term: 'counterargument', definition: 'An argument that opposes or challenges the main thesis, often addressed and refuted in academic writing', example: 'I included a counterargument to show that I had considered the opposing view before refuting it.' },
      { term: 'rebuttal', definition: 'A response that argues against a counterargument, defending the original thesis', example: 'After presenting the counterargument, I wrote a rebuttal explaining why the evidence still supported my thesis.' }
    ],
    quiz: [
      { question: 'What are the three qualities of a strong thesis statement?', options: ['Short, simple, and general', 'Specific, arguable, and significant', 'Long, complex, and vague', 'Factual, proven, and universal'], correctAnswer: 1, explanation: 'A strong thesis statement is specific (not vague), arguable (someone could disagree), and significant (it addresses something that matters).' },
      { question: 'Where does the thesis statement typically appear in an English essay?', options: ['At the end of the conclusion', 'At the beginning of the first body paragraph', 'At the end of the introduction paragraph', 'In the middle of the essay'], correctAnswer: 2, explanation: 'In English academic writing, the thesis statement typically appears as the last sentence of the introduction paragraph.' },
      { question: 'How many paragraphs does a standard five-paragraph essay have, and what are they?', options: ['Five: introduction, three body paragraphs, conclusion', 'Five: five body paragraphs only', 'Three: introduction, body, conclusion', 'Five: hook, thesis, evidence, counterargument, conclusion'], correctAnswer: 0, explanation: 'A five-paragraph essay consists of an introduction, three body paragraphs (each presenting one main point), and a conclusion.' },
      { question: 'What is the purpose of a "hook" in an introduction?', options: ['To summarize the entire essay', 'To grab the reader\'s attention with an interesting opening', 'To restate the thesis', 'To list all the main points'], correctAnswer: 1, explanation: 'A hook is an opening device — a surprising fact, question, quotation, or anecdote — designed to capture the reader\'s attention and make them want to read more.' },
      { question: 'Which is the strongest thesis statement?', options: ['"Social media is popular."', '"Social media has effects on people."', '"Excessive social media use among teenagers correlates with increased anxiety and decreased face-to-face communication skills."', '"I think social media is bad."'], correctAnswer: 2, explanation: 'The third option is specific (identifies the population and effects), arguable (could be debated), and significant (addresses an important issue).' },
      { question: 'What is the main difference between English essay structure and French dissertation structure?', options: ['English states the thesis first and supports it; French builds through thèse-antithèse-synthèse', 'They are exactly the same', 'French essays are shorter', 'English essays never have conclusions'], correctAnswer: 0, explanation: 'English essays state the thesis directly in the introduction and support it, while French dissertations follow a dialectical thèse-antithèse-synthèse structure.' },
      { question: 'Why should you create an outline before writing an essay?', options: ['Because the teacher requires it', 'Because it helps you organize ideas and see the logical structure before drafting', 'Because outlines replace the need for an introduction', 'Because writing without an outline is faster'], correctAnswer: 1, explanation: 'An outline helps you organize your thesis, main points, and evidence into a logical structure before writing, which saves time and produces stronger essays.' },
      { question: 'What should each body paragraph in a five-paragraph essay focus on?', options: ['All three main points at once', 'One main point that supports the thesis', 'The counterargument only', 'A summary of the introduction'], correctAnswer: 1, explanation: 'Each body paragraph should focus on one main point that supports the thesis, developed with evidence and explanation.' },
      { question: 'What does a conclusion paragraph do?', options: ['Introduces a new argument', 'Restates the thesis, summarizes key points, and provides a final thought', 'Only repeats the introduction word for word', 'Lists all the vocabulary used in the essay'], correctAnswer: 1, explanation: 'The conclusion restates the thesis in different words, summarizes the key points from the body paragraphs, and ends with a broader implication or final thought.' },
      { question: 'Which biblical principle connects to planning before writing?', options: ['"Prepare your work outside... and after that build your house" (Proverbs 24:27)', '"Do not plan, just write freely"', '"The last shall be first"', '"Only write when inspired"'], correctAnswer: 0, explanation: 'Proverbs 24:27 advises preparation before building, which directly applies to creating an outline before writing an essay.' }
    ]
  },

  // W3: Supporting Arguments with Evidence (INSTRUCTION)
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Supporting Arguments with Evidence',
        estimatedMinutes: 80,
        objectives: [
          'Paraphrase and directly quote sources accurately and ethically in academic writing',
          'Use in-text citations in both APA and MLA formats to give proper credit to sources',
          'Understand academic integrity as both an ethical and academic requirement',
          'Analyze the differences between French footnote traditions and English in-text citation practices'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'How do academic writers use the ideas of others to strengthen their own arguments without crossing the line into plagiarism? What is the difference between building on someone\'s work and stealing it?' },
            { type: 'reading', title: 'Evidence, Citations, and Academic Integrity', content: 'Academic writing is built on a foundation of evidence. Every claim you make in an academic essay should be supported by facts, data, examples, or the findings of other researchers. However, using other people\'s ideas requires careful ethical and technical practices: paraphrasing, quoting, and citing.\n\nParaphrasing means restating someone else\'s idea in your own words. A good paraphrase changes both the sentence structure and the vocabulary while keeping the original meaning. Simply replacing a few words with synonyms is not true paraphrasing — it is too close to the original and can constitute plagiarism.\n\nOriginal: "Students who engage in regular physical activity demonstrate significantly higher levels of academic achievement."\nWeak paraphrase: "Students who do regular physical activity show significantly higher levels of academic success." (Too close — only a few words changed)\nStrong paraphrase: "Research indicates that consistent exercise habits among students correlate with improved performance in school." (Different structure, different words, same meaning)\n\nDirect quoting means using the exact words of a source, enclosed in quotation marks. Direct quotes should be used sparingly in academic writing — only when the original wording is particularly powerful, precise, or famous. Most of your essay should be in your own words.\n\nIn-text citations give credit to the source within the body of your text. The two most common formats are:\n- APA (American Psychological Association): Author\'s last name and year in parentheses. Example: (Smith, 2022) or "Smith (2022) found that..."\n- MLA (Modern Language Association): Author\'s last name and page number in parentheses. Example: (Smith 45) or "Smith argues that..." (45)\n\nFor French-speaking students, an important convention difference: French academic writing traditionally uses footnotes (notes de bas de page) for citations. The reader encounters a small superscript number in the text and looks at the bottom of the page for the reference. English academic writing, particularly in the sciences and social sciences, prefers in-text citations — the reference information appears directly in the sentence or in parentheses. Footnotes are used in some English styles (notably Chicago/Turabian), but APA and MLA dominate in most academic settings. Learning to use in-text citations fluently is essential for writing that meets English academic standards.\n\nAcademic integrity means being honest about which ideas are yours and which come from other sources. Plagiarism — presenting someone else\'s words or ideas as your own — is considered a serious offense in English-speaking academic institutions. Even unintentional plagiarism (failing to cite because you forgot) can have serious consequences. The solution is simple: when in doubt, cite the source.\n\nA reference list or works cited page at the end of your essay provides full bibliographic details for every source cited in the text. APA calls it "References" and MLA calls it "Works Cited," but both serve the same purpose: allowing readers to find and verify your sources.' },
            { type: 'text', content: 'Integrating evidence smoothly into your writing is a skill that distinguishes strong academic writers. There are three main ways to introduce source material:\n\n1. Signal phrase + quote: Dr. Tremblay argues, "AI tutoring provides personalized feedback that classroom teachers cannot offer at scale" (2023, p. 45).\n2. Paraphrase + citation: AI-based tutoring systems can deliver individualized feedback to each student, something that is difficult to achieve in large classroom settings (Tremblay, 2023).\n3. Summary + citation: Tremblay\'s (2023) research demonstrates that AI tutoring systems offer scalability advantages over traditional methods.\n\nEach method has its place. Use direct quotes for particularly impactful statements. Use paraphrases when the idea matters more than the exact words. Use summaries when referencing an entire study or argument.' },
            { type: 'biblical-worldview', content: 'Academic integrity reflects God\'s character of truth. Proverbs 12:22 states, "Lying lips are an abomination to the Lord, but those who act faithfully are his delight." Giving proper credit to others\' ideas is not just an academic rule — it is an expression of honesty and fairness that honors God. When we cite our sources, we acknowledge the contributions of others and demonstrate the truthfulness that Scripture calls us to.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Why do you think English academic writing prefers in-text citations while French academic writing traditionally uses footnotes? What are the advantages and disadvantages of each approach? Also consider: why is academic integrity so emphasized in English-speaking universities? How does citing sources actually strengthen your own argument?' },
            { type: 'practice', activity: 'Practice paraphrasing and citing. For each original sentence below, write: (a) a strong paraphrase with an APA in-text citation, and (b) a direct quote with an MLA in-text citation.\n\n1. Original (by Sarah Johnson, 2021, page 78): "Bilingual students consistently outperform monolingual students on tests of cognitive flexibility and creative problem-solving."\n\n2. Original (by Pierre Dubois, 2023, page 142): "The transition from French-medium to English-medium instruction requires not only linguistic adaptation but also a fundamental shift in academic writing conventions."' }
          ],
          output: [
            { type: 'practice', activity: 'Write a body paragraph (8-10 sentences) for an essay with the thesis: "Learning a second language provides cognitive, professional, and cultural benefits." Choose one of the three benefits as your paragraph\'s focus. Your paragraph must include: a topic sentence, at least one direct quote with proper in-text citation (you may create a fictional but realistic source), at least one paraphrase with citation, a transition, and a concluding sentence. Use APA format for citations.' },
            { type: 'practice', activity: 'Create a comparison chart showing the differences between APA and MLA citation styles. Include at least 5 categories: (1) in-text citation format, (2) name of the reference page, (3) how to cite a book, (4) how to cite a website, (5) how to handle sources with no author. Then write 2-3 sentences explaining how these English citation styles differ from the French footnote tradition.' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Supporting Arguments with Evidence',
        estimatedMinutes: 60,
        objectives: [
          'Paraphrase and quote sources correctly in academic writing',
          'Use in-text citations to give credit to sources',
          'Understand why academic integrity and proper citation matter'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you use information from a book or article in your essay, how do you give credit to the original author? What happens if you do not?' },
            { type: 'reading', title: 'Using Evidence and Giving Credit', content: 'In academic writing, you need evidence — facts, data, and expert opinions — to support your arguments. When you use someone else\'s ideas, you must give them credit. There are two main ways to do this:\n\n1. Paraphrasing: Restate the idea in your own words. Change both the words and the sentence structure.\n   - Original: "Students who exercise regularly perform better academically."\n   - Paraphrase: "Research shows that regular physical activity is connected to improved school performance."\n\n2. Direct quoting: Use the exact words from the source, with quotation marks.\n   - Example: Johnson states, "Exercise is the single most underused tool for academic improvement" (2022, p. 15).\n\nUse quotes sparingly — most of your essay should be in your own words.\n\nIn-text citations tell the reader where you found the information:\n- APA style: (Author\'s last name, year) — Example: (Johnson, 2022)\n- MLA style: (Author\'s last name page number) — Example: (Johnson 15)\n\nFor French speakers: In French academic writing, you often use footnotes at the bottom of the page. In English, you put the citation right in the sentence using parentheses. This is called an in-text citation.\n\nAcademic integrity means being honest about your sources. Plagiarism — using someone else\'s words or ideas without giving credit — is a serious offense in English-speaking schools. The rule is simple: if an idea is not yours, cite the source.' },
            { type: 'biblical-worldview', content: 'Proverbs 12:22 says, "Lying lips are an abomination to the Lord, but those who act faithfully are his delight." Giving proper credit to sources is a way of being honest and faithful in our academic work, which honors God.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Why is it important to give credit when you use someone else\'s ideas? What could happen if a student does not cite their sources? Have you used footnotes in French writing — how is that different from in-text citations?' },
            { type: 'practice', activity: 'Practice paraphrasing. Rewrite this sentence in your own words:\n\nOriginal: "Students who read for pleasure at least 20 minutes per day develop larger vocabularies and stronger writing skills than those who do not."\n\nThen write the paraphrase with an APA citation, assuming the author is Maria Lopez (2023).' }
          ],
          output: [
            { type: 'practice', activity: 'Write a short paragraph (5-6 sentences) supporting this claim: "Reading is essential for academic success." Include one paraphrase with an APA citation and one direct quote with a citation. You may create realistic fictional sources.' },
            { type: 'practice', activity: 'Explain in your own words (3-4 sentences): What is the difference between paraphrasing and quoting? When should you use each one? Why is citing your sources important?' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Supporting Arguments with Evidence',
        estimatedMinutes: 45,
        objectives: [
          'Understand the difference between paraphrasing and quoting',
          'Learn why you must give credit when using other people\'s ideas',
          'Practice writing a simple citation'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'If you use an idea from a book or website in your essay, do you need to say where you got it? What happens if you do not?' },
            { type: 'reading', title: 'Giving Credit: Why and How', content: 'When you write an essay, some ideas come from you, and some come from books, articles, or websites. When an idea comes from someone else, you need to give them credit. This is called citing your source.\n\nThere are two ways to use other people\'s ideas:\n1. Paraphrasing: Say the idea in your own words.\n   - Original: "Exercise helps students think more clearly."\n   - Paraphrase: "Physical activity improves students\' ability to concentrate."\n\n2. Quoting: Use the exact words with quotation marks.\n   - Example: Dr. Smith says, "Exercise is key to academic success."\n\nAfter a paraphrase or quote, add a citation in parentheses to show where the information came from:\n   - Example: (Smith, 2022)\n\nThis tells the reader: the author is Smith, and the information was published in 2022.\n\nWhy is this important? Using someone else\'s ideas without giving credit is called plagiarism. It is dishonest and can get you in serious trouble at school. Always give credit!' },
            { type: 'biblical-worldview', content: 'The Bible teaches us to be honest: "Lying lips are an abomination to the Lord" (Proverbs 12:22). Giving credit to our sources is a way of being truthful and fair, which pleases God.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Why do you think it is important to tell your reader where you got your information? What would happen if everyone copied from books and websites without saying where the ideas came from?' },
            { type: 'practice', activity: 'Paraphrase this sentence in your own words:\nOriginal: "Drinking enough water helps students pay attention in class."\n\nNow write your paraphrase with a citation: (Martin, 2023)' }
          ],
          output: [
            { type: 'practice', activity: 'Write 3 sentences about "Why sleep is important for students." In at least one sentence, include a citation like this: (Author, year). You can make up a realistic author name and year.' },
            { type: 'practice', activity: 'In your own words, explain: What is the difference between paraphrasing and quoting? Write 2-3 sentences.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'paraphrase', definition: 'To restate someone else\'s idea in your own words and sentence structure while keeping the original meaning', example: 'Instead of copying the sentence, I wrote a paraphrase in my own words and cited the source.' },
      { term: 'direct quote', definition: 'The exact words from a source, enclosed in quotation marks and attributed to the author', example: 'The author wrote, "Education is the most powerful weapon you can use to change the world" (Mandela, 2003).' },
      { term: 'in-text citation', definition: 'A brief reference within the body of an essay that identifies the source of information, usually in parentheses', example: 'The in-text citation (Johnson, 2022) told me where to find the full reference.' },
      { term: 'plagiarism', definition: 'Presenting someone else\'s words, ideas, or work as your own without giving proper credit', example: 'Copying a paragraph from a website without citation is plagiarism, even if you did not intend to cheat.' },
      { term: 'academic integrity', definition: 'The commitment to honest and ethical behavior in academic work, including proper citation and original thinking', example: 'Academic integrity requires that we always give credit to our sources and do our own work.' },
      { term: 'reference list', definition: 'A list at the end of a paper (in APA style) that provides full details for every source cited in the text', example: 'Every source mentioned in the essay must appear in the reference list at the end.' },
      { term: 'footnote', definition: 'A note at the bottom of a page that provides additional information or a citation for something in the text above', example: 'French academic writing often uses footnotes for citations, while English academic writing prefers in-text citations.' }
    ],
    quiz: [
      { question: 'What is paraphrasing?', options: ['Copying the exact words from a source', 'Restating someone else\'s idea in your own words and sentence structure', 'Deleting someone else\'s idea from your essay', 'Adding quotation marks around any sentence'], correctAnswer: 1, explanation: 'Paraphrasing means expressing someone else\'s idea in your own words and sentence structure while preserving the original meaning. It requires changing both vocabulary and structure.' },
      { question: 'When should you use a direct quote instead of a paraphrase?', options: ['Always — quotes are better than paraphrases', 'When the original wording is particularly powerful, precise, or famous', 'Never — quotes should not be used in academic writing', 'When you do not understand the source'], correctAnswer: 1, explanation: 'Direct quotes should be used sparingly, specifically when the original wording is particularly impactful, precise, or well-known. Most academic writing should be in your own words.' },
      { question: 'What does an APA in-text citation typically include?', options: ['The title of the source and page number', 'The author\'s last name and year of publication', 'The publisher\'s name and city', 'The URL of the source'], correctAnswer: 1, explanation: 'APA in-text citations typically include the author\'s last name and the year of publication in parentheses, e.g., (Smith, 2022).' },
      { question: 'What is plagiarism?', options: ['Using citations in your essay', 'Presenting someone else\'s words or ideas as your own without giving credit', 'Paraphrasing a source correctly', 'Writing an original essay'], correctAnswer: 1, explanation: 'Plagiarism is presenting someone else\'s words, ideas, or work as your own without proper attribution. It is considered a serious academic offense.' },
      { question: 'How does French citation practice traditionally differ from English citation practice?', options: ['French uses in-text citations; English uses footnotes', 'French uses footnotes; English prefers in-text citations (APA/MLA)', 'They are exactly the same', 'Neither uses citations'], correctAnswer: 1, explanation: 'French academic writing traditionally uses footnotes (notes de bas de page) for citations, while English academic writing predominantly uses in-text citations in APA or MLA format.' },
      { question: 'What is the difference between APA "References" and MLA "Works Cited"?', options: ['They are different names for the same thing: a list of all sources cited in the text', 'APA is for books and MLA is for websites', 'References are footnotes and Works Cited is in the text', 'APA is French and MLA is English'], correctAnswer: 0, explanation: 'Both APA "References" and MLA "Works Cited" are lists at the end of a paper that provide full bibliographic details for every source cited. They serve the same purpose but use different formatting rules.' },
      { question: 'Which is a strong paraphrase of "Regular exercise improves students\' academic performance"?', options: ['"Regular exercise improves students\' school performance."', '"Consistent physical activity has been shown to enhance academic outcomes among students."', '"Exercise is good for grades."', '"Students should exercise more."'], correctAnswer: 1, explanation: 'A strong paraphrase changes both the words and the sentence structure while preserving the original meaning. Option B does this effectively, while Option A only changes one word.' },
      { question: 'According to Proverbs 12:22, why is academic honesty important?', options: ['Because teachers require it', 'Because "lying lips are an abomination to the Lord" — honesty honors God', 'Because plagiarism is illegal everywhere', 'The Bible does not address honesty'], correctAnswer: 1, explanation: 'Proverbs 12:22 states that "lying lips are an abomination to the Lord, but those who act faithfully are his delight." Academic honesty — including proper citation — reflects the truthfulness God values.' },
      { question: 'What are the three main ways to integrate evidence from sources into your writing?', options: ['Title, subtitle, and heading', 'Signal phrase + quote, paraphrase + citation, and summary + citation', 'Introduction, body, and conclusion', 'Footnote, endnote, and bibliography'], correctAnswer: 1, explanation: 'The three main methods are: signal phrase + direct quote, paraphrase + citation, and summary + citation. Each method is appropriate in different situations.' },
      { question: 'Why should most of your essay be in your own words rather than direct quotes?', options: ['Because quotes are not allowed in academic writing', 'Because your essay should demonstrate your understanding and analysis, not just repeat others\' words', 'Because paraphrasing is faster than quoting', 'Because readers do not like quotation marks'], correctAnswer: 1, explanation: 'Academic writing should primarily reflect your own thinking and analysis. Over-relying on direct quotes suggests you cannot engage with the ideas independently. Paraphrasing demonstrates comprehension.' }
    ]
  },

  // W4: Argumentative Essay (PROJECT)
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Argumentative Essay',
        estimatedMinutes: 80,
        objectives: [
          'Write a 500-word argumentative essay with a clear thesis, evidence, and logical organization',
          'Integrate paraphrased and quoted evidence with proper in-text citations',
          'Address a counterargument and provide a rebuttal to strengthen the essay',
          'Apply paragraph structure, transitions, and coherence throughout the essay'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'How do writers persuade readers to accept their point of view? What combination of logic, evidence, and structure makes an argument compelling?' },
            { type: 'reading', title: 'Writing the Argumentative Essay', content: 'An argumentative essay takes a clear position on a debatable issue and supports that position with evidence. It is the essay type most commonly assigned in English-speaking academic institutions and the type that best develops critical thinking skills.\n\nYour argumentative essay should follow this structure:\n1. Introduction: Hook, context, thesis statement\n2. Body Paragraph 1: Strongest supporting argument with evidence\n3. Body Paragraph 2: Second supporting argument with evidence\n4. Body Paragraph 3: Counterargument and rebuttal\n5. Conclusion: Restated thesis, summary, broader implication\n\nYour thesis must be arguable — someone could reasonably disagree. Your evidence must come from credible sources. Your counterargument paragraph shows intellectual maturity by acknowledging the opposing view and then explaining why your position is still stronger.\n\nRemember to use transitions between paragraphs, proper in-text citations, and a mix of paraphrases and direct quotes. Your essay should demonstrate the skills from this entire unit: paragraph structure, thesis development, and evidence integration.' },
            { type: 'biblical-worldview', content: 'Proverbs 18:17 reminds us, "The one who states his case first seems right, until the other comes and examines him." Addressing counterarguments in your essay reflects this wisdom — considering opposing views before defending your position shows intellectual honesty and thoroughness.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Choose a topic you feel strongly about and that is debatable. What thesis would you propose? What evidence would support it? What is the strongest counterargument, and how would you respond to it?' },
            { type: 'practice', activity: 'Create a detailed outline for your argumentative essay. Include: your thesis statement, the topic sentence and two pieces of evidence for each body paragraph, the counterargument you will address, your rebuttal, and notes for your introduction hook and conclusion.' }
          ],
          output: [
            { type: 'project', title: 'Argumentative Essay', instructions: 'Write a 500-word argumentative essay on one of the following topics (or propose your own debatable topic):\n\n- "Should schools require students to learn a second language from an early age?"\n- "Is online learning as effective as traditional classroom instruction?"\n- "Should social media platforms be regulated to protect young users?"\n\nRequirements:\n1. A clear, specific, arguable thesis statement in the introduction\n2. An engaging hook at the beginning\n3. Three body paragraphs: two supporting your thesis with evidence, one addressing a counterargument with a rebuttal\n4. At least two in-text citations (APA or MLA) — paraphrases or direct quotes from credible sources (you may use real or realistic fictional sources)\n5. Transition words between and within paragraphs\n6. A conclusion that restates the thesis and offers a broader implication\n7. A reference list or works cited page\n\nTarget length: 500 words (essay body, not including references)\nDemonstrate: paragraph structure, coherence, thesis development, evidence integration, and citation skills from this unit.' },
            { type: 'rubric', criteria: [
              { name: 'Thesis Statement', points: 15, description: 'Clear, specific, arguable thesis in the introduction' },
              { name: 'Organization', points: 15, description: 'Five-paragraph structure with logical flow and effective transitions' },
              { name: 'Evidence and Citations', points: 20, description: 'At least two properly cited sources; effective use of paraphrase and/or quotation' },
              { name: 'Counterargument and Rebuttal', points: 15, description: 'Thoughtful counterargument addressed and effectively refuted' },
              { name: 'Paragraph Quality', points: 15, description: 'Topic sentences, supporting details, coherence, and concluding sentences in each paragraph' },
              { name: 'Language and Mechanics', points: 10, description: 'Clear academic English, varied sentence structure, minimal errors' },
              { name: 'Introduction and Conclusion', points: 10, description: 'Engaging hook; conclusion with restated thesis and broader implication' }
            ]}
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Argumentative Essay',
        estimatedMinutes: 60,
        objectives: [
          'Write a five-paragraph argumentative essay with a clear thesis',
          'Support the thesis with evidence and at least one citation',
          'Include a counterargument paragraph'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'How do you convince someone that your point of view is correct? What makes an argument strong?' },
            { type: 'reading', title: 'Writing an Argumentative Essay', content: 'An argumentative essay states your opinion on a topic and uses evidence to support it. The goal is to convince the reader that your position is correct.\n\nStructure:\n1. Introduction with a hook and thesis\n2. Body Paragraph 1: Your first reason with evidence\n3. Body Paragraph 2: Your second reason with evidence\n4. Body Paragraph 3: A counterargument (the other side) and your response\n5. Conclusion: Restate your thesis and summarize\n\nUse transitions, cite your sources, and make sure each paragraph has a topic sentence. Your thesis should be something people can disagree about — it should be arguable.' },
            { type: 'biblical-worldview', content: 'Proverbs 18:17 says, "The one who states his case first seems right, until the other comes and examines him." Considering the other side of an argument makes your own position stronger and shows intellectual honesty.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Choose a topic you have an opinion about. What is your thesis? What are two reasons that support it? What might someone who disagrees say?' },
            { type: 'practice', activity: 'Create an outline for your essay: thesis statement, three body paragraph topic sentences, one piece of evidence per paragraph, and a note for your counterargument.' }
          ],
          output: [
            { type: 'project', title: 'Argumentative Essay', instructions: 'Write a five-paragraph argumentative essay (approximately 350-400 words) on one of these topics:\n\n- "Should schools require a second language?"\n- "Is online learning effective?"\n- "Should students have less homework?"\n\nRequirements:\n1. A thesis statement in the introduction\n2. Two body paragraphs supporting your thesis\n3. One body paragraph with a counterargument and your response\n4. At least one citation (real or fictional)\n5. Transitions between paragraphs\n6. A conclusion' },
            { type: 'rubric', criteria: [
              { name: 'Thesis Statement', points: 20, description: 'Clear, arguable thesis in the introduction' },
              { name: 'Organization', points: 20, description: 'Five-paragraph structure with transitions' },
              { name: 'Evidence', points: 20, description: 'Supporting evidence with at least one citation' },
              { name: 'Counterargument', points: 20, description: 'Counterargument addressed and responded to' },
              { name: 'Language', points: 20, description: 'Clear English with reasonable grammar and mechanics' }
            ]}
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Argumentative Essay',
        estimatedMinutes: 45,
        objectives: [
          'Write a short essay with a clear opinion and reasons',
          'Include a topic sentence in each paragraph',
          'Give at least two reasons to support your opinion'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'How do you explain to someone why you believe something? What makes your reasons convincing?' },
            { type: 'reading', title: 'Writing Your Opinion Essay', content: 'An argumentative essay tells the reader what you think about a topic and gives reasons for your opinion.\n\nSimple structure:\n1. Introduction: Say what you believe (your thesis).\n2. Paragraph 2: Give your first reason with an example.\n3. Paragraph 3: Give your second reason with an example.\n4. Conclusion: Repeat your main idea.\n\nRemember to use transitions like "First," "Also," and "In conclusion." Start each paragraph with a topic sentence.' },
            { type: 'biblical-worldview', content: 'Proverbs 18:17 reminds us to listen to both sides before making judgments. When we write our opinion, thinking about what the other side might say makes our argument stronger.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Think about something you feel strongly about (for example: "Students should have more recess time" or "Learning English is important"). What are your two best reasons? How would you explain them to someone who disagrees?' },
            { type: 'practice', activity: 'Write your thesis (your opinion in one sentence) and list 2 reasons that support it.' }
          ],
          output: [
            { type: 'project', title: 'Argumentative Essay', instructions: 'Write a short argumentative essay (approximately 200-250 words) on one of these topics:\n\n- "Students should have more time to read in school"\n- "Learning English is important for my future"\n- "Exercise should be part of every school day"\n\nRequirements:\n1. An introduction with your opinion (thesis)\n2. Two paragraphs giving your reasons\n3. A short conclusion\n4. Use at least 2 transition words' },
            { type: 'rubric', criteria: [
              { name: 'Clear Opinion', points: 30, description: 'Thesis/opinion is clearly stated in the introduction' },
              { name: 'Supporting Reasons', points: 30, description: 'At least two reasons with examples given' },
              { name: 'Organization', points: 20, description: 'Paragraphs with topic sentences and transitions' },
              { name: 'Language', points: 20, description: 'Clear sentences with reasonable English grammar' }
            ]}
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'argumentative essay', definition: 'An essay that takes a clear position on a debatable issue and uses evidence to support that position', example: 'The teacher assigned an argumentative essay on whether schools should require uniforms.' },
      { term: 'debatable', definition: 'Able to be argued about; having more than one reasonable perspective', example: '"Should schools start later?" is debatable because people have valid reasons on both sides.' },
      { term: 'counterargument', definition: 'An argument that opposes the writer\'s thesis, often addressed to show intellectual thoroughness', example: 'The counterargument to my thesis was that technology can be distracting, but I explained that proper guidelines can prevent this.' },
      { term: 'rebuttal', definition: 'A response that refutes a counterargument, explaining why the original thesis is still valid', example: 'My rebuttal showed that the benefits of technology in education outweigh the potential distractions.' },
      { term: 'persuade', definition: 'To convince someone to believe or do something through reasoning and evidence', example: 'The goal of the essay was to persuade the reader that bilingual education benefits all students.' }
    ],
    quiz: []
  }
]

// ============================================================
// UNIT 3: Academic Listening
// ============================================================

const unit3Lessons: EnrichedLesson[] = [
  // W1: Lecture Comprehension Strategies (INSTRUCTION)
  {
    weekNumber: 1,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Lecture Comprehension Strategies',
        estimatedMinutes: 80,
        objectives: [
          'Identify main ideas in spoken academic English by recognizing signal words and discourse markers',
          'Apply strategies for maintaining comprehension during extended academic lectures',
          'Develop techniques for handling unfamiliar vocabulary encountered during listening without losing the thread of the argument',
          'Distinguish between essential information and elaborative details in real-time listening'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you attend a lecture entirely in English, how do you follow the main argument while simultaneously processing unfamiliar vocabulary, complex sentence structures, and rapid speech? What cognitive strategies make this possible?' },
            { type: 'reading', title: 'Mastering Lecture Comprehension in Academic English', content: 'Listening to academic lectures in a second language is one of the most cognitively demanding tasks a student faces. Unlike reading, where you can slow down, re-read, or look up words, listening happens in real time. The speaker controls the pace, and the information keeps coming whether you are ready or not. Developing effective lecture comprehension strategies is therefore essential for academic success in English-speaking environments.\n\nThe most powerful tool for lecture comprehension is recognizing signal words — words and phrases that reveal the structure of the speaker\'s argument. Signal words act as verbal signposts, telling you what kind of information is coming next:\n\n- Introduction of main ideas: "Today we\'ll focus on...", "The key point is...", "The main argument is...", "What I want to emphasize is..."\n- Sequence: "First...", "Second...", "Next...", "Then...", "Finally..."\n- Emphasis: "This is important...", "Remember this...", "The crucial thing is...", "Pay attention to..."\n- Examples: "For instance...", "For example...", "To illustrate...", "Consider the case of..."\n- Contrast: "However...", "On the other hand...", "In contrast...", "Nevertheless...", "But..."\n- Cause and effect: "As a result...", "Therefore...", "Consequently...", "This leads to..."\n- Summary and conclusion: "In conclusion...", "To sum up...", "In summary...", "The bottom line is..."\n\nWhen you hear these signal words, your brain should activate: a signal word is like a flashing light telling you that something structurally important is happening in the lecture.\n\nHandling unfamiliar vocabulary during listening is a critical skill. When you encounter a word you do not know, you have several strategies:\n1. Context clues: Use the surrounding words and the overall topic to guess the meaning. You do not need to understand every word to follow the main argument.\n2. Word parts: Break the word into prefix, root, and suffix. Many academic words share Latin or Greek roots with French equivalents.\n3. Let it go: If the word is not essential to the main point, make a mental note (or quick written note) and move on. Do not let one unknown word cause you to miss the next three sentences.\n4. Listen for definitions: Lecturers often define technical terms when they first introduce them, using phrases like "by this I mean...", "that is...", "in other words...", or "which we define as..."\n\nActive listening means engaging with the lecture mentally, not just hearing words. Effective active listeners: predict what the speaker will say next, connect new information to what they already know, mentally summarize each section before the speaker moves on, and formulate questions about unclear points. This mental engagement dramatically improves both comprehension and retention.\n\nA key distinction for advanced listeners is separating essential information from elaborative details. Essential information includes: the main thesis, topic sentences of each section, definitions, and conclusions. Elaborative details include: extended examples, anecdotes, tangential comments, and repetitions. In your notes, capture the essentials; you can always look up the details later.' },
            { type: 'text', content: 'Lecturers also use prosodic cues — changes in volume, speed, pitch, and pausing — to signal importance. When a speaker slows down, speaks more loudly, or pauses before and after a statement, they are usually signaling that the information is particularly important. Conversely, when a speaker speeds up or uses a more conversational tone, they may be giving background information or examples that elaborate on the main point but are not essential to remember. Training yourself to notice these vocal patterns gives you an additional layer of comprehension beyond the words themselves.' },
            { type: 'biblical-worldview', content: 'James 1:19 instructs us to be "quick to listen, slow to speak." This biblical principle is not just about patience in conversation — it describes the posture of a good learner. Active listening requires humility, focus, and the willingness to receive before responding. When we listen carefully and attentively to instruction, we honor both the speaker and the God who gave us the capacity to learn.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Reflect on a time you attended a lecture, presentation, or speech in English (or watched one online). What was most challenging about following the speaker? Did you notice any signal words? How did you handle unfamiliar vocabulary — did you stop to think about it, or did you try to keep following the main argument? What strategies from this lesson would have helped you?' },
            { type: 'practice', activity: 'Listen to a 5-10 minute English-language academic talk (you can find TED-Ed talks, Khan Academy lectures, or university lecture excerpts on YouTube). As you listen, write down every signal word or phrase you hear. After listening, categorize them: which ones introduced main ideas? Which signaled examples? Which indicated conclusions? Then write a 3-sentence summary of the lecture\'s main argument.' }
          ],
          output: [
            { type: 'practice', activity: 'Create a comprehensive "Lecture Comprehension Toolkit" — a reference document for yourself that includes: (1) A categorized list of at least 20 signal words/phrases organized by function (introduction, sequence, emphasis, example, contrast, cause/effect, conclusion). (2) Your personal strategy for handling unfamiliar vocabulary during a lecture (at least 3 steps). (3) A list of 5 prosodic cues and what each typically signals. (4) A brief description (3-4 sentences) of active listening techniques you plan to use.' },
            { type: 'practice', activity: 'Listen to another short academic talk (3-5 minutes). This time, practice distinguishing essential information from elaborative details. Create two columns: "Essential" and "Elaborative." In the Essential column, write the main thesis, key arguments, and conclusions. In the Elaborative column, write examples, anecdotes, and background details. Then write a one-paragraph summary (5-6 sentences) using only the essential information.' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Lecture Comprehension Strategies',
        estimatedMinutes: 60,
        objectives: [
          'Recognize signal words that help you follow the structure of an English lecture',
          'Use strategies to keep listening even when you encounter unfamiliar vocabulary',
          'Identify the main ideas in a spoken presentation'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you listen to someone speak in English, how do you know when they are making an important point? Are there "clue words" that help you follow along?' },
            { type: 'reading', title: 'Following Lectures in English', content: 'Listening to lectures in English can be challenging, especially when the speaker uses words you do not know. The good news is that speakers give you clues — called signal words — that help you follow the structure of their talk.\n\nSignal words tell you what kind of information is coming:\n- Main idea: "The key point is...", "Today we will discuss...", "The most important thing is..."\n- Examples: "For example...", "For instance...", "Such as..."\n- Contrast: "However...", "On the other hand...", "But..."\n- Sequence: "First...", "Second...", "Finally..."\n- Conclusion: "In conclusion...", "To sum up...", "The main takeaway is..."\n\nWhen you hear these words, pay extra attention — the speaker is about to say something important.\n\nWhat to do when you hear a word you do not know:\n1. Do not panic — you do not need to understand every word.\n2. Try to guess from context — what is the topic? What would make sense here?\n3. Keep listening — do not stop to think too long about one word or you will miss the next sentence.\n4. Write the word down to look up later.\n\nActive listening means paying attention on purpose. Try to think about what the speaker is saying, not just hear the words. Ask yourself: "What is the main point? What evidence are they giving?"' },
            { type: 'biblical-worldview', content: 'James 1:19 says we should be "quick to listen, slow to speak." Good listening is a skill that the Bible values. When we listen carefully, we learn better and show respect to the person speaking.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'When you listen to English in real life (lectures, videos, podcasts), what is the hardest part? Is it the speed, the vocabulary, or the organization of ideas? What strategies from this lesson could help you the most?' },
            { type: 'practice', activity: 'Watch a short English video (3-5 minutes — a TED-Ed video or a short educational clip works well). Write down at least 5 signal words you hear. Then write a 2-3 sentence summary of the main idea.' }
          ],
          output: [
            { type: 'practice', activity: 'Create a "Signal Words" reference card with at least 15 signal words organized into categories: Main Idea, Examples, Contrast, Sequence, and Conclusion. Write 3 signal words for each category.' },
            { type: 'practice', activity: 'Listen to a short English talk or video. Write down: (1) the main topic, (2) three important points the speaker made, and (3) one word you did not know and your guess about its meaning from context.' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Lecture Comprehension Strategies',
        estimatedMinutes: 45,
        objectives: [
          'Learn common signal words that speakers use in English',
          'Practice listening for the main idea in a short talk',
          'Know that you do not need to understand every word to follow a lecture'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When someone gives a talk in English, how can you figure out the most important points even if you do not understand every word?' },
            { type: 'reading', title: 'Listening for Key Information', content: 'When you listen to someone speak in English, you do not need to understand every single word. Focus on the main idea. Speakers use special words to tell you when something important is coming:\n\n- "The main point is..." = Listen carefully, this is the key idea\n- "For example..." = An example is coming to explain the idea\n- "However..." = The speaker is about to say something different or opposite\n- "First... Second... Third..." = The speaker is listing important points\n- "In conclusion..." = The speaker is wrapping up and giving the final main idea\n\nWhat if you hear a word you do not know?\n- Do not worry! Keep listening.\n- Try to guess the meaning from the words around it.\n- Write it down and look it up later.\n\nThe most important thing is to keep listening and not give up.' },
            { type: 'biblical-worldview', content: 'James 1:19 tells us to be "quick to listen." God values good listening. When we practice listening carefully, we grow in wisdom and understanding.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'When you listen to English, do you try to understand every word? What happens when you hear a word you do not know — do you stop thinking about it or do you keep listening?' },
            { type: 'practice', activity: 'Watch a 2-3 minute English video (a simple educational video or a news clip). Listen for the main idea. Write down: (1) What was the video about? (2) Did you hear any signal words (like "for example" or "in conclusion")? (3) Was there a word you did not know? What do you think it meant?' }
          ],
          output: [
            { type: 'practice', activity: 'Write a list of 5 signal words from this lesson and what each one tells you. Example: "For example" = an example is coming.' },
            { type: 'practice', activity: 'Listen to a short English video and write 2-3 sentences about the main idea. You do not need to understand every word — just focus on the key point.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'signal words', definition: 'Words or phrases that indicate the structure or direction of a speaker\'s argument (e.g., "however," "for example," "in conclusion")', example: 'The signal word "however" told me the speaker was about to introduce a contrasting idea.' },
      { term: 'discourse markers', definition: 'Words and phrases that organize spoken or written text and show relationships between ideas', example: 'Discourse markers like "first," "next," and "finally" helped me follow the sequence of the lecture.' },
      { term: 'active listening', definition: 'A listening approach that involves focused attention, mental engagement, and purposeful processing of information', example: 'Active listening means I am not just hearing words but thinking about what the speaker means.' },
      { term: 'context clues', definition: 'Information surrounding an unfamiliar word that helps the listener or reader guess its meaning', example: 'I did not know the word "photosynthesis," but the context clues — "plants," "sunlight," "energy" — helped me guess it meant how plants make food.' },
      { term: 'prosodic cues', definition: 'Changes in a speaker\'s volume, speed, pitch, or pausing that signal emphasis or importance', example: 'The lecturer slowed down and spoke louder — a prosodic cue that the information was very important.' },
      { term: 'comprehension', definition: 'The ability to understand the meaning of what is heard or read', example: 'My comprehension of the lecture improved when I started listening for signal words.' },
      { term: 'elaborative', definition: 'Providing additional detail, examples, or explanation that expand on a main idea', example: 'The anecdote about the scientist was elaborative — it illustrated the main point but was not essential to remember.' }
    ],
    quiz: [
      { question: 'What are signal words in the context of listening to lectures?', options: ['Words that the speaker does not know', 'Words and phrases that reveal the structure of the speaker\'s argument', 'Technical vocabulary specific to the subject', 'Words that should be ignored'], correctAnswer: 1, explanation: 'Signal words are verbal signposts that indicate the structure of the argument — such as introducing main ideas, giving examples, showing contrast, or signaling conclusions.' },
      { question: 'Which signal phrase indicates the speaker is about to give an example?', options: ['"In conclusion..."', '"However..."', '"For instance..."', '"The main point is..."'], correctAnswer: 2, explanation: '"For instance" and "for example" signal that the speaker is about to provide an example to illustrate a point.' },
      { question: 'What should you do when you hear an unfamiliar word during a lecture?', options: ['Stop listening and look it up immediately', 'Try to guess from context and keep listening', 'Ask the speaker to repeat the entire lecture', 'Stop taking notes entirely'], correctAnswer: 1, explanation: 'The best strategy is to use context clues to guess the meaning and keep listening. Stopping to think about one word can cause you to miss subsequent important information.' },
      { question: 'What does "active listening" mean?', options: ['Listening while exercising', 'Listening with focused attention and mental engagement', 'Listening to music during a lecture', 'Only listening to the parts you understand'], correctAnswer: 1, explanation: 'Active listening means engaging purposefully with what you hear — predicting, connecting to prior knowledge, mentally summarizing, and formulating questions.' },
      { question: 'Which signal phrase indicates the speaker is about to state a contrasting idea?', options: ['"Furthermore..."', '"In addition..."', '"However..."', '"For example..."'], correctAnswer: 2, explanation: '"However" signals a contrast or opposition to the previous point. "Furthermore" and "In addition" signal continuation of the same idea.' },
      { question: 'What are prosodic cues?', options: ['Written notes from the speaker', 'Changes in volume, speed, pitch, or pausing that signal importance', 'The signal words in a lecture', 'The lecture outline'], correctAnswer: 1, explanation: 'Prosodic cues are vocal features — changes in how loudly, quickly, or at what pitch a speaker talks, plus strategic pausing — that indicate emphasis or importance.' },
      { question: 'When a speaker says "To sum up..." what kind of information is coming next?', options: ['A new topic introduction', 'A detailed example', 'A summary or conclusion of the main points', 'A question for the audience'], correctAnswer: 2, explanation: '"To sum up" is a conclusion signal word indicating the speaker is about to summarize the main points or provide a final conclusion.' },
      { question: 'What is the difference between essential and elaborative information in a lecture?', options: ['Essential is boring, elaborative is interesting', 'Essential includes main ideas and conclusions; elaborative includes examples and anecdotes', 'They are the same thing', 'Essential is spoken loudly; elaborative is whispered'], correctAnswer: 1, explanation: 'Essential information includes the main thesis, key arguments, definitions, and conclusions. Elaborative information includes examples, anecdotes, and background details that support but are not critical to the main argument.' },
      { question: 'According to James 1:19, what should we be quick to do?', options: ['Quick to speak', 'Quick to judge', 'Quick to listen', 'Quick to leave'], correctAnswer: 2, explanation: 'James 1:19 instructs believers to be "quick to listen, slow to speak, slow to anger." Being a good listener is a biblical value that also supports academic success.' },
      { question: 'Why is it okay not to understand every word in a lecture?', options: ['Because the words are not important', 'Because you can follow the main argument through signal words, context clues, and overall structure', 'Because the speaker does not expect you to listen', 'Because lectures are not important'], correctAnswer: 1, explanation: 'Understanding the main argument does not require understanding every word. Signal words, context clues, prosodic cues, and overall structure allow you to follow the essential points even when some vocabulary is unfamiliar.' }
    ]
  },

  // W2: Note-Taking Strategies (INSTRUCTION)
  {
    weekNumber: 2,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Note-Taking Strategies',
        estimatedMinutes: 80,
        objectives: [
          'Apply the Cornell note-taking method to organize lecture information into cues, notes, and summaries',
          'Compare and evaluate multiple note-taking systems (Cornell, outline, mind map) for different contexts',
          'Develop a personal system of abbreviations and symbols to increase note-taking speed',
          'Integrate listening comprehension with effective real-time note-taking in English'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Studies show that students who take effective notes score 34% higher on exams than those who do not. Yet most students have never been taught how to take notes. What makes some note-taking methods dramatically more effective than others?' },
            { type: 'reading', title: 'Note-Taking Systems for Academic Success', content: 'Note-taking is not simply writing down what you hear. Effective note-taking is an active cognitive process that involves listening, processing, selecting important information, and organizing it in a way that supports later review and study. Research consistently shows that the method of note-taking matters as much as whether you take notes at all.\n\nThe Cornell Method is one of the most researched and recommended note-taking systems for academic settings. Developed at Cornell University in the 1950s, it divides the page into three sections:\n\n1. Notes column (right side, largest area): During the lecture, write your notes here. Focus on main ideas, key terms, definitions, and important details. Use short phrases rather than full sentences. Do not try to write everything — capture the essentials.\n\n2. Cue column (left side, narrower): After the lecture (within 24 hours), review your notes and write cues in this column — questions, keywords, or prompts that relate to the notes on the right. These cues become study tools: cover the notes column and use the cues to test yourself.\n\n3. Summary section (bottom of the page): After reviewing, write a 2-3 sentence summary of the entire page\'s content. This forces you to synthesize the information and identify what matters most.\n\nThe Cornell Method\'s power lies in its built-in review cycle. Taking notes is only the first step; the real learning happens when you create cues and write summaries, which forces active processing of the material.\n\nThe Outline Method organizes information hierarchically using indentation:\n- Main topic\n  - Subtopic\n    - Detail or example\n    - Another detail\n  - Another subtopic\n    - Detail\n\nThis method works well when the lecture has a clear, organized structure. It visually shows the relationship between main ideas and supporting details.\n\nMind Mapping is a non-linear method that places the central topic in the middle of the page and branches out with related ideas, sub-topics, and details. Lines and colors show connections between concepts. Mind mapping is particularly effective for visual learners and for topics with complex interconnections.\n\nSpeed strategies are essential for keeping up with a lecture. Common abbreviations include: w/ (with), w/o (without), b/c (because), e.g. (for example), i.e. (that is), vs. (versus), + or & (and), → (leads to/causes), ≈ (approximately), ↑ (increase), ↓ (decrease), = (equals/means), ∴ (therefore), # (number), info (information), govt (government), dev (development). You should also develop personal abbreviations for terms specific to your courses.\n\nSymbols can mark the importance or type of information: ★ (very important), ? (confusing/need to review), ! (surprising/interesting), def (definition), ex (example), T (test material).\n\nThe key to effective note-taking is finding the method that works best for you and the specific context. Many successful students combine methods — for example, using the Cornell format with an outline structure in the notes column and a mind map for review.' },
            { type: 'text', content: 'Digital vs. handwritten notes is an important consideration. Research by Mueller and Oppenheimer (2014) found that students who took handwritten notes performed better on conceptual questions than those who typed notes on laptops. The researchers suggested that handwriting forces selectivity — because you cannot write as fast as you type, you must process the information and decide what is most important. However, typed notes have advantages for speed, searchability, and organization. The best approach depends on the context and your personal learning style.' },
            { type: 'biblical-worldview', content: 'Proverbs 4:13 urges us, "Keep hold of instruction; do not let go; guard her, for she is your life." Note-taking is quite literally the act of "keeping hold" of instruction — capturing knowledge so it is not lost. God values learning and wisdom, and developing effective note-taking skills is a practical way to guard the instruction we receive.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Which note-taking method (Cornell, outline, or mind map) appeals to you most and why? Do you currently have a system for taking notes in lectures or classes? How do you think the Cornell Method\'s review cycle (cues + summary) helps move information from short-term to long-term memory? Would you prefer handwritten or typed notes — and why?' },
            { type: 'practice', activity: 'Set up a Cornell-format page. Then listen to a 5-minute English-language educational video. Take notes in the Notes column using abbreviations and symbols. After listening, fill in the Cue column with questions or keywords for each section. Finally, write a 2-3 sentence summary at the bottom. Bring your completed Cornell notes for review.' }
          ],
          output: [
            { type: 'practice', activity: 'Listen to a 10-minute English academic talk or lecture (TED Talk, Khan Academy, or university lecture excerpt). Take notes using the Cornell Method. Your notes should demonstrate: (1) effective use of the notes column with main ideas and key details, (2) at least 5 abbreviations or symbols, (3) cue questions/keywords in the left column, and (4) a 3-sentence summary at the bottom. After completing your notes, write a brief reflection (3-4 sentences) evaluating how well the Cornell Method worked for you.' },
            { type: 'practice', activity: 'Create a personalized "Note-Taking Reference Sheet" that includes: (1) A comparison of the three methods (Cornell, outline, mind map) with when each is most useful. (2) Your personal abbreviation list with at least 15 abbreviations/symbols you will use regularly. (3) A template for each method that you can photocopy or recreate. (4) A brief description of your preferred method and why it suits your learning style.' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Note-Taking Strategies',
        estimatedMinutes: 60,
        objectives: [
          'Use the Cornell note-taking method to organize notes from a lecture or video',
          'Learn abbreviations and symbols that speed up note-taking',
          'Understand why reviewing notes is as important as taking them'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you take notes, do you try to write everything the speaker says? What if there was a smarter way to organize your notes so they actually help you study later?' },
            { type: 'reading', title: 'How to Take Better Notes', content: 'Good notes help you remember what you learned. Here are three methods:\n\n1. The Cornell Method: Divide your page into three sections:\n   - Right side (big): Write your notes during the lecture. Use short phrases, not full sentences.\n   - Left side (small): After the lecture, write questions or key words here.\n   - Bottom: Write a 2-sentence summary of the page.\n\n2. The Outline Method: Organize with indentation:\n   - Main topic\n     - Subtopic\n       - Detail\n\n3. Mind Mapping: Put the topic in the center and draw branches for related ideas.\n\nTo write faster, use abbreviations:\n- w/ = with, w/o = without, b/c = because, e.g. = for example\n- → = leads to, ↑ = increase, ↓ = decrease, = means\n- ★ = important, ? = confusing, def = definition\n\nImportant: Taking notes is only the first step. Reviewing your notes within 24 hours is what helps you remember. The Cornell Method is especially good because the cue column and summary force you to review actively.' },
            { type: 'biblical-worldview', content: 'Proverbs 4:13 says, "Keep hold of instruction; do not let go." Note-taking helps us hold onto the knowledge we receive. It is a practical way to value and preserve what we learn.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'How do you currently take notes? Do you write full sentences or short phrases? Do you review your notes after class? Which of the three methods (Cornell, outline, mind map) do you think would work best for you?' },
            { type: 'practice', activity: 'Watch a 3-5 minute educational video in English. Take notes using the Cornell Method: write notes on the right side, then add cue questions on the left, and write a 2-sentence summary at the bottom.' }
          ],
          output: [
            { type: 'practice', activity: 'Watch a 5-minute English video and take Cornell-format notes. Show that you used at least 5 abbreviations or symbols. After taking notes, fill in the cue column and write a summary.' },
            { type: 'practice', activity: 'Create a personal abbreviation list with at least 10 abbreviations and symbols you will use when taking notes. For each one, write the abbreviation and what it stands for.' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Note-Taking Strategies',
        estimatedMinutes: 45,
        objectives: [
          'Learn a simple way to organize notes (Cornell Method basics)',
          'Use abbreviations to write notes faster',
          'Practice taking notes from a short English talk'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When someone is talking, how do you write things down fast enough? Is there a way to organize your notes so they are easy to study later?' },
            { type: 'reading', title: 'Taking Good Notes', content: 'Good notes help you remember what you learned. Here is a simple system:\n\nThe Cornell Method:\n- Draw a line down your page. The right side is bigger, the left side is smaller.\n- Right side: Write your notes while listening. Use short phrases, not full sentences.\n- Left side: After listening, write key words or questions.\n- Bottom: Write 1-2 sentences about what you learned.\n\nTo write faster, use abbreviations:\n- w/ = with\n- b/c = because\n- e.g. = for example\n- → = leads to\n- ★ = important\n- ? = I need to review this\n\nTip: You do not need to write every word the speaker says. Focus on the main ideas.' },
            { type: 'biblical-worldview', content: 'Proverbs 4:13 says, "Keep hold of instruction." Taking notes is a way of holding onto what we learn, which is something God values.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Do you take notes in class? Do you write full sentences or just key words? What is hardest about taking notes while someone is talking?' },
            { type: 'practice', activity: 'Watch a 2-3 minute English video. Write down the main idea and 3 important points using short phrases and at least 2 abbreviations.' }
          ],
          output: [
            { type: 'practice', activity: 'Practice the Cornell Method with a short English video. Divide your page into three sections. Take notes on the right, write 2 key words on the left, and write a 1-sentence summary at the bottom.' },
            { type: 'practice', activity: 'Write a list of 5 abbreviations you will use when taking notes. For each one, write what it means.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'Cornell Method', definition: 'A note-taking system that divides the page into three sections: notes, cues, and summary for organized and effective review', example: 'Using the Cornell Method, I wrote my lecture notes on the right and review questions on the left.' },
      { term: 'cue column', definition: 'The narrow left column in Cornell notes where you write questions, keywords, or prompts for self-testing after the lecture', example: 'I filled in the cue column with questions so I could quiz myself before the exam.' },
      { term: 'abbreviation', definition: 'A shortened form of a word or phrase used to save time when writing', example: 'I used the abbreviation "b/c" instead of writing "because" to keep up with the speaker.' },
      { term: 'outline method', definition: 'A note-taking method that uses indentation to show the hierarchy of main ideas, subtopics, and details', example: 'The outline method helped me see which details supported each main point in the lecture.' },
      { term: 'mind mapping', definition: 'A visual note-taking method that places the central topic in the middle and branches out with related ideas and connections', example: 'I used a mind map to show how all the different causes of the revolution were connected.' },
      { term: 'synthesize', definition: 'To combine different pieces of information into a unified understanding or summary', example: 'The summary section of my Cornell notes forced me to synthesize everything I had learned into a few sentences.' },
      { term: 'retention', definition: 'The ability to remember and keep information in memory over time', example: 'Reviewing my notes within 24 hours significantly improved my retention of the material.' }
    ],
    quiz: [
      { question: 'What are the three sections of the Cornell note-taking method?', options: ['Introduction, body, conclusion', 'Title, notes, references', 'Notes column, cue column, summary section', 'Questions, answers, review'], correctAnswer: 2, explanation: 'The Cornell Method divides the page into three sections: a notes column (right, for lecture notes), a cue column (left, for review questions/keywords), and a summary section (bottom, for a brief synthesis).' },
      { question: 'When should you fill in the cue column and summary in Cornell notes?', options: ['During the lecture', 'Within 24 hours after the lecture', 'A week before the exam', 'Never — only the notes column matters'], correctAnswer: 1, explanation: 'The cue column and summary should be completed within 24 hours of the lecture. This review process is what makes the Cornell Method so effective for long-term retention.' },
      { question: 'What does the abbreviation "b/c" stand for?', options: ['Before class', 'Because', 'By comparison', 'Basic concept'], correctAnswer: 1, explanation: '"b/c" is a common abbreviation for "because," used to save time when taking notes.' },
      { question: 'Which note-taking method is best for showing hierarchical relationships between ideas?', options: ['Mind mapping', 'Cornell Method', 'Outline Method', 'Free writing'], correctAnswer: 2, explanation: 'The Outline Method uses indentation to visually show the hierarchy between main ideas, subtopics, and details, making relationships clear at a glance.' },
      { question: 'What is mind mapping most useful for?', options: ['Linear, sequential information', 'Topics with complex interconnections and multiple related ideas', 'Taking dictation word for word', 'Writing formal essays'], correctAnswer: 1, explanation: 'Mind mapping excels at showing connections between ideas, making it ideal for topics with complex relationships and multiple interconnected concepts.' },
      { question: 'Why do researchers suggest handwritten notes may be better than typed notes for learning?', options: ['Because computers are not allowed in lectures', 'Because handwriting forces selectivity — you must process and choose what is important', 'Because typing is slower than writing', 'Because handwriting looks better'], correctAnswer: 1, explanation: 'Research suggests that because handwriting is slower than typing, note-takers must actively process information and decide what is most important, which deepens understanding.' },
      { question: 'What symbol is commonly used to mark something very important in notes?', options: ['?', '★', '↓', '≈'], correctAnswer: 1, explanation: 'A star (★) is commonly used to mark very important information in notes, helping you identify key points during review.' },
      { question: 'Why is reviewing notes within 24 hours important?', options: ['Because the teacher checks notes the next day', 'Because it helps transfer information from short-term to long-term memory', 'Because notes expire after 24 hours', 'It is not important — reviewing before the exam is enough'], correctAnswer: 1, explanation: 'The "forgetting curve" shows that we lose most new information within 24 hours unless we review it. Reviewing notes within this window significantly improves long-term retention.' },
      { question: 'What does the → symbol typically mean in note-taking?', options: ['Is less than', 'Leads to or causes', 'Is the same as', 'Go back'], correctAnswer: 1, explanation: 'The arrow → typically means "leads to" or "causes" in note-taking abbreviations, showing a cause-and-effect relationship.' },
      { question: 'According to Proverbs 4:13, what should we do with instruction?', options: ['Ignore it', 'Keep hold of it and guard it', 'Share it only with friends', 'Write it down but never review it'], correctAnswer: 1, explanation: 'Proverbs 4:13 says, "Keep hold of instruction; do not let go; guard her, for she is your life." Note-taking is a practical way to keep hold of and guard the knowledge we receive.' }
    ]
  },

  // W3: Following Complex Arguments (INSTRUCTION)
  {
    weekNumber: 3,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Following Complex Arguments',
        estimatedMinutes: 80,
        objectives: [
          'Track multi-step arguments through a spoken presentation, identifying premises, evidence, and conclusions',
          'Identify counterarguments and distinguish them from the speaker\'s own position',
          'Distinguish between a speaker\'s personal opinion and views they are reporting from other sources',
          'Evaluate the logical strength of complex arguments encountered during listening'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'Academic lectures often present multi-layered arguments with supporting evidence, counterarguments, and nuanced conclusions. How do skilled listeners keep track of these complex structures in real time — and how do they know when the speaker is stating their own view versus reporting someone else\'s?' },
            { type: 'reading', title: 'Navigating Complex Academic Arguments', content: 'Advanced academic listening requires the ability to follow arguments that are significantly more complex than simple claim-and-evidence structures. Lectures at the university level often present multi-step arguments, engage with opposing views, and draw on multiple sources — all while the listener must track who is saying what and whether the speaker agrees.\n\nA multi-step argument builds its conclusion through a chain of reasoning. For example: "If climate change accelerates at current rates (Premise 1), and coastal cities do not invest in infrastructure adaptation (Premise 2), then we can expect significant population displacement within the next three decades (Conclusion)." Each step depends on the previous one, and the listener must hold all steps in mind to evaluate the final conclusion. Speakers signal these steps with phrases like: "Building on this point...", "If we accept that..., then...", "This brings us to the next consideration...", and "The logical extension of this argument is...".\n\nCounterarguments are a regular feature of academic discourse. Speakers introduce opposing views to demonstrate their awareness of the debate and to strengthen their own position by refuting alternatives. Recognizing when a speaker shifts from presenting their own view to presenting an opposing view is crucial — otherwise you may attribute the wrong position to the speaker. Signal phrases for counterarguments include: "Critics argue that...", "Some scholars contend...", "The opposing view holds that...", "One might object that...", "It could be argued that...". After presenting the counterargument, the speaker typically returns to their own position with phrases like: "However, this view fails to account for...", "Nevertheless, the evidence suggests...", "Despite these objections, I maintain that...".\n\nDistinguishing between the speaker\'s opinion and reported views is another critical skill. Academic speakers frequently reference other researchers, theorists, or schools of thought. They use reporting verbs that carry different levels of agreement or neutrality:\n- Neutral: "states," "notes," "reports," "observes," "describes"\n- Agreeing: "demonstrates," "proves," "confirms," "establishes"\n- Disagreeing: "claims," "alleges," "asserts" (can imply skepticism), "assumes"\n- Tentative: "suggests," "proposes," "hypothesizes," "speculates"\n\nThe choice of reporting verb often reveals what the speaker thinks about the reported view. "Smith demonstrates that..." implies the speaker agrees with Smith. "Smith claims that..." may imply skepticism.\n\nTo evaluate the logical strength of an argument during listening, ask yourself: Are the premises supported by evidence? Does the conclusion follow logically from the premises? Are there unstated assumptions? Does the speaker address the strongest counterarguments or only weak ones (a straw man fallacy)? Is the evidence from credible sources?' },
            { type: 'text', content: 'A particularly challenging aspect of complex arguments is when speakers use concessive language — acknowledging a partial truth in the opposing view while maintaining their own position. Phrases like "While it is true that..., the fact remains that..." or "Although X has some merit, the weight of evidence points to Y..." signal this nuanced reasoning. The listener must recognize that the speaker is not agreeing with the opposing view but rather showing intellectual honesty before reinforcing their own argument.' },
            { type: 'biblical-worldview', content: 'The ability to follow complex arguments and evaluate them critically is a form of the discernment Scripture repeatedly encourages. Proverbs 18:17 warns, "The one who states his case first seems right, until the other comes and examines him." This verse reminds us that hearing only one side of an argument is insufficient — we must listen to all perspectives, examine the evidence, and evaluate honestly before forming conclusions. This is precisely what following complex academic arguments trains us to do.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Think about a debate or argument you have witnessed (in person, on television, or online). Were you able to identify both sides of the argument? Did the speakers acknowledge each other\'s points? How did you decide which side was more convincing? How might recognizing signal phrases for counterarguments and reporting verbs help you evaluate complex arguments more effectively?' },
            { type: 'practice', activity: 'Listen to a 5-8 minute academic talk or debate segment that presents multiple viewpoints (a TED Talk on a controversial topic works well). As you listen, create a three-column chart:\n\nColumn 1: Speaker\'s own position (what do they believe?)\nColumn 2: Counterarguments or opposing views mentioned (what do others believe?)\nColumn 3: How the speaker responds to counterarguments\n\nAlso note any reporting verbs used and whether they seem neutral, agreeing, or skeptical. After listening, write a 3-4 sentence evaluation of whether the speaker\'s argument was logically strong.' }
          ],
          output: [
            { type: 'practice', activity: 'Listen to an academic lecture or debate (8-10 minutes) on a topic with clear opposing viewpoints. Take notes that specifically track: (1) The speaker\'s main thesis and the chain of reasoning (premises leading to conclusion). (2) At least two counterarguments or opposing views mentioned. (3) The speaker\'s response to each counterargument. (4) At least three reporting verbs and what they suggest about the speaker\'s attitude. Write a critical evaluation paragraph (150-200 words) assessing the strength of the overall argument: Was the reasoning logical? Were counterarguments addressed fairly? Were there any logical weaknesses?' },
            { type: 'practice', activity: 'Create a "Complex Argument Tracker" reference sheet that includes: (1) Signal phrases for multi-step arguments (at least 5). (2) Signal phrases for counterarguments (at least 5). (3) Signal phrases for returning to the speaker\'s position after a counterargument (at least 5). (4) A list of reporting verbs categorized by tone (neutral, agreeing, skeptical, tentative — at least 3 per category). (5) A list of 3 questions to ask yourself when evaluating argument strength.' }
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Following Complex Arguments',
        estimatedMinutes: 60,
        objectives: [
          'Follow multi-step arguments by identifying the main claim and supporting reasons',
          'Recognize when a speaker is presenting a counterargument versus their own opinion',
          'Distinguish between what the speaker believes and what others believe'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When a speaker talks about different sides of an issue, how do you know which opinion is theirs and which belongs to someone else? What clue words help you figure this out?' },
            { type: 'reading', title: 'Following Arguments with Multiple Sides', content: 'In academic lectures, speakers often discuss more than one point of view. They present their own argument but also mention what other people think (counterarguments). It is important to know the difference.\n\nHow to recognize the speaker\'s own view:\n- "I believe that...", "I argue that...", "The evidence shows that...", "In my view..."\n\nHow to recognize a counterargument (someone else\'s view):\n- "Critics argue that...", "Some people believe...", "The opposing view is...", "One might say that..."\n\nAfter the counterargument, the speaker usually returns to their own position:\n- "However, I maintain that...", "Nevertheless, the evidence suggests...", "Despite this, the data shows..."\n\nMulti-step arguments build one point on top of another:\n- "First, we know that X. Building on this, we can see that Y. Therefore, Z."\n\nWhen listening, try to follow the chain: What is the first point? How does it lead to the next point? What is the final conclusion?\n\nAlso pay attention to reporting verbs — words speakers use when talking about others\' ideas:\n- Neutral: "says," "states," "notes"\n- Positive: "proves," "demonstrates," "confirms"\n- Skeptical: "claims," "alleges," "assumes"' },
            { type: 'biblical-worldview', content: 'Proverbs 18:17 says, "The one who states his case first seems right, until the other comes and examines him." It is wise to listen to all sides of an argument before deciding what is true.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Have you ever listened to someone present an argument and had trouble figuring out whether they were sharing their own opinion or someone else\'s? What clue words or phrases might have helped you tell the difference?' },
            { type: 'practice', activity: 'Listen to a 3-5 minute English talk on a debatable topic. Write down: (1) The speaker\'s main opinion. (2) One counterargument they mention. (3) How they respond to the counterargument. If possible, note any reporting verbs they use.' }
          ],
          output: [
            { type: 'practice', activity: 'Listen to a 5-minute English talk that presents more than one viewpoint. Create a two-column chart: "Speaker\'s View" and "Other People\'s Views." Fill in each column based on what you hear. Then write 2-3 sentences explaining which view the speaker supports and why.' },
            { type: 'practice', activity: 'Write a list of 10 signal phrases: 5 that introduce counterarguments and 5 that show the speaker returning to their own opinion. Give an example sentence for each one.' }
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Following Complex Arguments',
        estimatedMinutes: 45,
        objectives: [
          'Understand that speakers sometimes present opinions that are not their own',
          'Learn signal phrases that introduce different viewpoints',
          'Practice identifying the speaker\'s main opinion in a short talk'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'When you hear someone say "Some people think..." does that mean they agree? How do you know what the speaker really believes?' },
            { type: 'reading', title: 'Whose Opinion Is It?', content: 'When speakers talk about a topic, they sometimes share ideas that are not their own. They might say what other people think before telling you what they believe.\n\nClue phrases — other people\'s opinions:\n- "Some people think..."\n- "Critics say..."\n- "Others believe..."\n\nClue phrases — the speaker\'s own opinion:\n- "I believe..."\n- "In my opinion..."\n- "The evidence shows..."\n- "However, I think..."\n\nExample:\n"Some people say homework is a waste of time. However, I believe homework helps students practice what they learn in class."\n\nIn this example, "homework is a waste of time" is other people\'s opinion. "Homework helps students practice" is the speaker\'s opinion.\n\nThe word "however" is the clue that the speaker is switching from others\' views to their own.' },
            { type: 'biblical-worldview', content: 'The Bible tells us to listen to all sides before we judge: "The one who states his case first seems right, until the other comes and examines him" (Proverbs 18:17). Listening to different opinions helps us make wise decisions.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'Read this example: "Many students say that online classes are easier. However, research shows that students learn more in person." What is the other people\'s opinion? What is the speaker\'s view? How did you know the difference?' },
            { type: 'practice', activity: 'Listen to a short English video (2-3 minutes). Write down: (1) What is the speaker\'s main opinion? (2) Did they mention what other people think? If yes, what was it?' }
          ],
          output: [
            { type: 'practice', activity: 'Write 5 signal phrases that mean "this is someone else\'s opinion" (e.g., "Some people think..."). Then write 5 signal phrases that mean "this is my opinion" (e.g., "I believe...").' },
            { type: 'practice', activity: 'Write a short paragraph (3-4 sentences) where you share someone else\'s opinion and then your own opinion about a topic you care about. Use signal phrases to make it clear whose opinion is whose.' }
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'counterargument', definition: 'An argument presented in opposition to the speaker\'s or writer\'s main position', example: 'The professor presented a counterargument before explaining why her original thesis was still correct.' },
      { term: 'premise', definition: 'A statement or assumption that serves as the basis for a logical argument or conclusion', example: 'The first premise of the argument was that all students benefit from physical activity.' },
      { term: 'reporting verb', definition: 'A verb used to describe what another person has said or written, such as "states," "claims," "argues," or "suggests"', example: 'The reporting verb "claims" suggested the speaker was skeptical of the other researcher\'s conclusion.' },
      { term: 'concessive language', definition: 'Language that acknowledges a partial truth in an opposing view while maintaining one\'s own position', example: '"While it is true that technology can be distracting, the benefits of digital learning far outweigh the drawbacks."' },
      { term: 'straw man', definition: 'A logical fallacy where someone misrepresents an opponent\'s argument to make it easier to attack', example: 'The speaker committed a straw man fallacy by oversimplifying the opposing view before refuting it.' },
      { term: 'refute', definition: 'To prove that an argument or statement is wrong by presenting counter-evidence or reasoning', example: 'The researcher refuted the earlier study by presenting new data that contradicted its findings.' }
    ],
    quiz: [
      { question: 'What is a multi-step argument?', options: ['An argument with only one point', 'An argument that builds its conclusion through a chain of connected reasoning', 'An argument that repeats the same point many times', 'An argument with no evidence'], correctAnswer: 1, explanation: 'A multi-step argument builds its conclusion through a chain of premises, where each step builds on the previous one to reach a final conclusion.' },
      { question: 'Which phrase signals that a speaker is about to present a counterargument?', options: ['"I believe that..."', '"The evidence shows..."', '"Critics argue that..."', '"In conclusion..."'], correctAnswer: 2, explanation: '"Critics argue that..." signals the speaker is about to present an opposing view (counterargument), not their own position.' },
      { question: 'After presenting a counterargument, speakers typically return to their own position with phrases like:', options: ['"Some people think..."', '"However, the evidence suggests..."', '"Critics say..."', '"Others believe..."'], correctAnswer: 1, explanation: 'Phrases like "However, the evidence suggests..." or "Nevertheless, I maintain..." signal the speaker is returning to their own position after presenting a counterargument.' },
      { question: 'What does the reporting verb "claims" often imply about the speaker\'s attitude?', options: ['Strong agreement', 'Neutral reporting', 'Possible skepticism toward the reported view', 'Complete support'], correctAnswer: 2, explanation: '"Claims" can carry a skeptical tone, suggesting the speaker is not fully convinced by the reported view. Compare this with "demonstrates," which implies the speaker agrees the evidence is strong.' },
      { question: 'What is concessive language?', options: ['Language that completely rejects the opposing view', 'Language that acknowledges partial truth in the opposing view while maintaining one\'s own position', 'Language that agrees with everyone', 'Informal or slang language'], correctAnswer: 1, explanation: 'Concessive language acknowledges that the opposing view has some merit ("While it is true that...") before the speaker reinforces their own position ("the fact remains that...").' },
      { question: 'Which question helps evaluate the logical strength of an argument?', options: ['"Is the speaker a good public speaker?"', '"Does the conclusion follow logically from the premises?"', '"Is the lecture longer than 30 minutes?"', '"Does the speaker use humor?"'], correctAnswer: 1, explanation: 'Evaluating whether the conclusion follows logically from the premises is a fundamental question for assessing argument strength.' },
      { question: 'What is a straw man fallacy?', options: ['An argument made by a farmer', 'Misrepresenting an opponent\'s argument to make it easier to attack', 'Using straw polls in research', 'A very weak argument'], correctAnswer: 1, explanation: 'A straw man fallacy occurs when someone misrepresents or oversimplifies an opposing argument, then refutes the weakened version instead of engaging with the actual argument.' },
      { question: 'Which reporting verb suggests the speaker agrees with the reported finding?', options: ['"claims"', '"alleges"', '"demonstrates"', '"assumes"'], correctAnswer: 2, explanation: '"Demonstrates" implies the speaker views the reported finding as well-supported and proven, suggesting agreement. "Claims" and "alleges" can imply skepticism.' },
      { question: 'According to Proverbs 18:17, why is hearing multiple viewpoints important?', options: ['Because all viewpoints are equally correct', 'Because the first argument may seem right until it is examined by another', 'Because the Bible says to agree with everyone', 'Because listening to one side is always sufficient'], correctAnswer: 1, explanation: 'Proverbs 18:17 warns that "the one who states his case first seems right, until the other comes and examines him," teaching that we must hear multiple perspectives before forming judgments.' },
      { question: 'In the sentence "While it is true that exercise takes time, the health benefits far outweigh the time cost," which part is the concession?', options: ['"the health benefits far outweigh the time cost"', '"While it is true that exercise takes time"', 'The entire sentence', 'Neither part'], correctAnswer: 1, explanation: 'The concession is "While it is true that exercise takes time" — it acknowledges a valid point from the opposing side. The main position follows: "the health benefits far outweigh the time cost."' }
    ]
  },

  // W4: Lecture Summary Report (PROJECT)
  {
    weekNumber: 4,
    pathways: [
      {
        pathway: 'ADVANCED',
        title: 'Lecture Summary Report',
        estimatedMinutes: 80,
        objectives: [
          'Listen to a complete English-language lecture and take organized notes using the Cornell Method',
          'Write a structured summary report that accurately captures the lecture\'s main arguments, evidence, and conclusions',
          'Demonstrate the ability to distinguish the speaker\'s position from reported views and counterarguments',
          'Apply all listening skills from this unit: signal words, note-taking, and argument tracking'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'How do academic professionals summarize complex lectures and presentations they attend at conferences? What goes into a summary that is both accurate and useful?' },
            { type: 'reading', title: 'Writing a Lecture Summary Report', content: 'A lecture summary report is a written document that captures the essential content of an oral presentation. It is a common academic task that combines listening comprehension, note-taking, and writing skills.\n\nYour report should include:\n1. Header: Lecture title, speaker (if known), date, and your name\n2. Introduction (2-3 sentences): What was the lecture about? What was the speaker\'s main thesis or purpose?\n3. Body (3-4 paragraphs): Summarize the main points in the order they were presented. Include key evidence, examples, and any counterarguments the speaker addressed. Use signal phrases to attribute ideas properly.\n4. Conclusion (2-3 sentences): What was the speaker\'s final conclusion? What broader implications did they suggest?\n5. Personal reflection (optional but encouraged): 2-3 sentences on what you learned, what was most interesting, or what you would like to learn more about.\n\nThis project synthesizes all the skills from this unit: using signal words for comprehension, taking organized notes, and following complex arguments. Your notes are your raw material; the summary is the polished product.' },
            { type: 'biblical-worldview', content: 'James 1:19 tells us to be "quick to listen, slow to speak, slow to anger." This project is an exercise in careful listening — truly hearing what someone has to say before responding. Being a faithful listener honors the speaker and develops the wisdom God desires for us.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'What makes a good summary different from just copying your notes? How do you decide what to include and what to leave out? What role does understanding the argument structure play in writing an accurate summary?' },
            { type: 'practice', activity: 'Select a 10-15 minute English-language academic lecture (TED Talk, university lecture, or educational podcast). Listen to it once while taking Cornell-format notes. After listening, review your notes and create an outline for your summary report, identifying: the speaker\'s thesis, 3-4 main points, key evidence, and the conclusion.' }
          ],
          output: [
            { type: 'project', title: 'Lecture Summary Report', instructions: 'Listen to an English-language academic lecture or talk (10-15 minutes). Take notes using the Cornell Method. Then write a Lecture Summary Report with the following structure:\n\n1. Header: Lecture title (or topic), speaker name (if known), date you listened, and your name\n2. Introduction (2-3 sentences): State the lecture topic and the speaker\'s main thesis or purpose\n3. Body (3-4 paragraphs, 300-400 words total):\n   - Summarize the main points in order\n   - Include key evidence and examples\n   - Note any counterarguments the speaker addressed and how they responded\n   - Use signal phrases to attribute ideas (e.g., "The speaker argued that...", "According to the presenter...")\n4. Conclusion (2-3 sentences): State the speaker\'s final conclusion and any broader implications\n5. Personal reflection (2-3 sentences): What did you find most interesting or challenging? What questions remain?\n\nAttach your Cornell notes as an appendix.\n\nDemonstrate: signal word recognition, effective note-taking, argument tracking, and clear academic writing.' },
            { type: 'rubric', criteria: [
              { name: 'Listening Comprehension', points: 20, description: 'Accurate identification of the speaker\'s thesis, main points, and conclusion' },
              { name: 'Note Quality', points: 15, description: 'Cornell-format notes with cues, abbreviations, and summary' },
              { name: 'Summary Structure', points: 20, description: 'Clear introduction, organized body, and conclusion following the required format' },
              { name: 'Argument Tracking', points: 15, description: 'Accurate distinction between speaker\'s views and reported/counter views' },
              { name: 'Writing Quality', points: 15, description: 'Clear academic English, proper signal phrases, logical flow' },
              { name: 'Personal Reflection', points: 15, description: 'Thoughtful reflection showing engagement with the material' }
            ]}
          ]
        }
      },
      {
        pathway: 'STANDARD',
        title: 'Lecture Summary Report',
        estimatedMinutes: 60,
        objectives: [
          'Listen to an English-language talk and take organized notes',
          'Write a summary that captures the main ideas and key details',
          'Practice using signal phrases when reporting what a speaker said'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'After watching a lecture or talk, could you explain to someone else what the speaker said? What would you include in your summary?' },
            { type: 'reading', title: 'Writing a Lecture Summary', content: 'A lecture summary is a written report that tells the reader what a speaker talked about. It should be organized, clear, and accurate.\n\nYour summary should include:\n1. Introduction: What was the talk about? What was the main idea?\n2. Body: What were the main points? What evidence or examples did the speaker give?\n3. Conclusion: What was the speaker\'s final message?\n\nUse signal phrases to show that you are reporting the speaker\'s ideas:\n- "The speaker explained that..."\n- "According to the presenter..."\n- "The main argument was that..."\n\nYour notes are the foundation — take good notes first, then use them to write your summary.' },
            { type: 'biblical-worldview', content: 'James 1:19 reminds us to be "quick to listen." Writing a summary of what we have heard shows that we listened carefully and valued the speaker\'s message.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'When you tell a friend about a video or talk you watched, how do you decide what to include? How is writing a formal summary different from telling a friend casually?' },
            { type: 'practice', activity: 'Watch a 5-8 minute English educational video. Take notes. Then write a simple outline: main topic, 3 key points, and the conclusion.' }
          ],
          output: [
            { type: 'project', title: 'Lecture Summary Report', instructions: 'Watch an English-language educational talk or lecture (5-10 minutes). Take notes while watching. Then write a Lecture Summary Report:\n\n1. Introduction (2 sentences): What was the talk about? What was the main idea?\n2. Body (2-3 paragraphs, 200-250 words): Summarize the main points with key details. Use signal phrases.\n3. Conclusion (2 sentences): What was the speaker\'s final point?\n\nAttach your notes.' },
            { type: 'rubric', criteria: [
              { name: 'Main Idea', points: 25, description: 'Correctly identified the speaker\'s main topic and thesis' },
              { name: 'Key Points', points: 25, description: 'Summarized main points accurately' },
              { name: 'Signal Phrases', points: 25, description: 'Used signal phrases to report the speaker\'s ideas' },
              { name: 'Writing Quality', points: 25, description: 'Clear, organized writing with reasonable grammar' }
            ]}
          ]
        }
      },
      {
        pathway: 'VOCATIONAL',
        title: 'Lecture Summary Report',
        estimatedMinutes: 45,
        objectives: [
          'Watch an English video and take simple notes',
          'Write a short summary of the main ideas',
          'Use phrases like "The speaker said..." to report ideas'
        ],
        ipo: {
          input: [
            { type: 'wonder', content: 'After watching a video, can you write a few sentences about what the speaker talked about? What would you include?' },
            { type: 'reading', title: 'Summarizing What You Heard', content: 'After listening to a talk or watching a video, you can write a summary to show what you understood.\n\nA simple summary includes:\n1. What was the topic?\n2. What were the most important points (2-3)?\n3. What was the speaker\'s main message?\n\nUse these phrases:\n- "The speaker talked about..."\n- "The main idea was..."\n- "One important point was..."' },
            { type: 'biblical-worldview', content: 'The Bible says to be "quick to listen" (James 1:19). When we listen carefully and write about what we heard, we show that we value learning.' }
          ],
          processing: [
            { type: 'discussion', prompt: 'After you watch a video, what do you remember most — the main idea or the small details? When you tell someone about it, what do you say first?' },
            { type: 'practice', activity: 'Watch a 3-5 minute English video. Write down the topic and 2 important points.' }
          ],
          output: [
            { type: 'project', title: 'Lecture Summary Report', instructions: 'Watch a short English educational video (3-5 minutes). Take notes while watching. Then write a summary:\n\n1. What was the topic? (1-2 sentences)\n2. What were 2-3 important points? (3-4 sentences)\n3. What was the speaker\'s main message? (1 sentence)\n\nUse phrases like "The speaker said..." and "The main idea was..."\n\nTotal length: approximately 100-150 words\nAttach your notes.' },
            { type: 'rubric', criteria: [
              { name: 'Topic Identified', points: 30, description: 'Correctly stated what the video was about' },
              { name: 'Key Points', points: 40, description: 'Identified 2-3 important points from the talk' },
              { name: 'Reporting Phrases', points: 30, description: 'Used phrases like "The speaker said..." to report ideas' }
            ]}
          ]
        }
      }
    ],
    vocabulary: [
      { term: 'summary', definition: 'A brief account of the main points of a text, lecture, or presentation, leaving out minor details', example: 'My summary of the lecture captured the three main arguments in just one paragraph.' },
      { term: 'synthesize', definition: 'To combine information from different parts into a coherent whole', example: 'The summary required me to synthesize information from my notes into a clear, organized report.' },
      { term: 'attribute', definition: 'To give credit to a specific source or speaker for an idea, using signal phrases', example: 'I attributed the statistic to the original researcher by writing "According to Dr. Lee..."' },
      { term: 'appendix', definition: 'Additional material added at the end of a document, such as raw notes, charts, or supplementary data', example: 'I attached my Cornell notes as an appendix to the summary report.' }
    ],
    quiz: []
  }
]

// ============================================================
// MAIN FUNCTION
// ============================================================

function countWords(obj: unknown): number { return JSON.stringify(obj).split(/\s+/).length }

async function main() {
  console.log('\n' + '='.repeat(70))
  console.log('  Enrich Academic English Bridge L3 — Units 1-3')
  console.log('  Course ID: ' + COURSE_ID)
  console.log('  Mode: ' + (DRY_RUN ? 'DRY RUN' : 'LIVE'))
  console.log('='.repeat(70) + '\n')

  const allUnits = [
    { num: 1, lessons: unit1Lessons },
    { num: 2, lessons: unit2Lessons },
    { num: 3, lessons: unit3Lessons }
  ]

  let total = 0, skipped = 0

  for (const { num, lessons } of allUnits) {
    const dbLessons = await prisma.lesson.findMany({
      where: { unit: { courseId: COURSE_ID, unitNumber: num } },
      include: { unit: true }
    })
    console.log('  Found ' + dbLessons.length + ' lessons for unit ' + num)

    for (const enriched of lessons) {
      const db = dbLessons.find(l => l.weekNumber === enriched.weekNumber)
      if (!db) { skipped++; continue }

      const content = db.content as Record<string, unknown>
      const updated = { ...content, pathways: enriched.pathways, vocabulary: enriched.vocabulary, quiz: enriched.quiz }

      for (const pw of enriched.pathways) {
        console.log('  [' + pw.pathway + '] W' + enriched.weekNumber + ': ~' + countWords(pw) + ' words')
      }
      console.log('  [DATA] W' + enriched.weekNumber + ': ' + enriched.vocabulary.length + ' vocab, ' + enriched.quiz.length + ' quiz')

      if (!DRY_RUN) {
        await prisma.lesson.update({ where: { id: db.id }, data: { content: updated } })
        console.log('  [UPDATED] ' + db.title + '\n')
      } else {
        console.log('  [DRY] Would update ' + db.title + '\n')
      }
      total++
    }
  }

  console.log('='.repeat(70))
  console.log('  Summary: ' + total + ' enriched, ' + skipped + ' skipped')
  console.log('='.repeat(70) + '\n')

  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
