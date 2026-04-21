#!/usr/bin/env tsx
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve('.env.local') })
dotenv.config({ path: path.resolve('.env') })

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry-run')
const COURSE_ID = 'cmo78odkj0052on5t8s37l40l'

interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
}

interface ContentBlock {
  type: string
  content?: string
  text?: string
  items?: string[]
  url?: string
  title?: string
  rubric?: string[]
  prompt?: string
  questions?: string[]
  vocabulary?: string[]
}

interface PathwayContent {
  pathway: string
  duration: string
  objectives: string[]
  input: ContentBlock[]
  processing: ContentBlock[]
  output: ContentBlock[]
}

interface LessonUpdate {
  unitNumber: number
  weekNumber: number
  title: string
  lessonType: string
  pathways: PathwayContent[]
  quiz: QuizQuestion[]
  vocabulary: string[]
}

const lessons: LessonUpdate[] = [
  // ============================
  // UNIT 4: Academic Speaking
  // ============================
  // W1: Presentation Skills
  {
    unitNumber: 4,
    weekNumber: 1,
    title: 'Presentation Skills',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'signposting',
      'rhetorical question',
      'articulation',
      'cadence',
      'visual aid',
      'enunciation',
      'rapport',
      'poise'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Design and deliver a well-structured academic presentation using signposting language',
          'Employ rhetorical strategies including questions, pauses, and emphasis to engage an audience',
          'Manage presentation anxiety through preparation techniques and confident body language',
          'Evaluate presentations using academic criteria including structure, delivery, and content depth'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Have you ever noticed how the best speakers make complex ideas seem simple and compelling? What invisible structure holds their presentations together?'
          },
          {
            type: 'reading',
            title: 'The Architecture of Academic Presentations',
            text: 'Academic presentations in English follow a clear three-part structure that differs significantly from the French oral tradition. While French academic speaking often moves from analysis to thesis (following the dissertation model), English presentations state their main point early and then build supporting evidence around it.\n\nThe introduction serves three purposes: it captures attention (the "hook"), establishes the topic\'s relevance, and previews the presentation\'s structure. A strong hook might be a surprising statistic, a thought-provoking question, or a brief anecdote. For example: "Did you know that 75% of people rank public speaking as their greatest fear — above death itself? Today I will explore why this fear exists and, more importantly, how we can overcome it."\n\nSignposting language acts as the presentation\'s roadmap. These transition phrases guide your audience through your argument: "Firstly, I will examine... Moving on to my second point... To summarize what we have covered... In conclusion..." Without signposting, even brilliant content becomes difficult to follow. Think of signposting as road signs on a highway — without them, drivers get lost even on well-built roads.\n\nThe body of the presentation develops two to four main points, each supported by evidence, examples, or data. Each point should connect logically to the next using transitions: "Having established that X is the case, let us now consider why this matters." Effective presenters also use internal summaries: "So far, we have seen that... Now let us turn to..."\n\nThe conclusion reinforces your message by summarizing key points, restating your thesis in light of the evidence presented, and leaving the audience with a final thought or call to action. Never introduce new information in the conclusion.\n\nDelivery matters as much as content. Maintain eye contact with different sections of your audience (the "lighthouse technique"), vary your vocal pace and volume for emphasis, and use deliberate pauses before key points. Regarding nerves, remember that some anxiety is beneficial — it sharpens focus. Preparation is the greatest antidote to fear: rehearse at least three times, time yourself, and prepare for potential questions. Record yourself practicing and review it critically. Professional speakers do not eliminate nervousness; they channel it into energy and enthusiasm.'
          },
          {
            type: 'text',
            content: 'Key signposting phrases to master:\n\n**Opening:** "Today I will argue that..." / "The purpose of this presentation is to..." / "I have divided my talk into three parts."\n\n**Transitions:** "Firstly... Secondly... Finally..." / "Moving on to..." / "This brings me to my next point." / "Let us now turn to..."\n\n**Emphasizing:** "I would like to draw your attention to..." / "It is important to note that..." / "The key point here is..."\n\n**Summarizing:** "To summarize what we have covered so far..." / "In brief..." / "The main takeaway is..."\n\n**Concluding:** "In conclusion..." / "To sum up..." / "I would like to leave you with this thought..."\n\n**French-English contrast:** In French academic contexts, speakers often build toward their main argument (the "thèse"). In English, state your position clearly at the start and spend the presentation defending it. This directness is not considered rude — it is expected and appreciated.'
          },
          {
            type: 'biblical-worldview',
            content: 'Scripture is filled with powerful speakers who communicated God\'s truth with clarity and courage. Moses worried about his speaking ability (Exodus 4:10), yet God used him to lead a nation. The Apostle Paul adapted his speaking style to his audience — philosophical reasoning in Athens (Acts 17), personal testimony before Agrippa (Acts 26), and pastoral warmth with the Thessalonians. Colossians 4:6 instructs us: "Let your speech always be gracious, seasoned with salt, so that you may know how you ought to answer each person." When we present ideas clearly and respectfully, we honor both our audience and the God-given capacity for communication.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'How does the English presentation structure (thesis first, then evidence) compare to the French dissertation model? What advantages and disadvantages does each approach have?',
              'Why is signposting language particularly important in oral presentations compared to written work?',
              'How can Colossians 4:6 ("Let your speech always be gracious, seasoned with salt") guide our approach to academic presentations?',
              'What strategies can help a speaker manage anxiety without eliminating it entirely?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Signposting Reconstruction\nBelow is a presentation outline with missing signposting. Insert appropriate transition phrases:\n\n"[Opening signal] _____, I will examine the causes of deforestation. [Transition] _____, the primary driver is agricultural expansion. [Internal summary] _____ we have seen that agriculture plays a major role. [Transition] _____ my second point about urbanization. [Emphasis] _____ that urbanization accounts for 30% of forest loss. [Conclusion signal] _____, both agriculture and urbanization must be addressed simultaneously."\n\nExercise 2: Hook Development\nWrite three different hooks for a presentation on "The Impact of Social Media on Academic Performance":\n- A surprising statistic hook\n- A rhetorical question hook\n- A brief anecdote hook\n\nExercise 3: Delivery Self-Assessment\nPlan a 2-minute mini-presentation on any topic. Mark in your notes where you will: (a) pause for emphasis, (b) make eye contact with different audience sections, (c) vary your vocal pace, (d) use a hand gesture.'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Full Presentation Outline\nCreate a detailed outline for a 5-minute academic presentation on "Why Critical Thinking Should Be Taught in Every School." Include:\n- A compelling hook\n- A clear thesis statement\n- Three main points with supporting evidence\n- Signposting language at every transition\n- An internal summary after the second point\n- A conclusion with a call to action\n\nTask 2: Signposting Analysis\nWatch or read the transcript of an academic presentation (TED talk or similar). Identify and list all signposting language used. Then evaluate: Which transitions were most effective? Where could additional signposting have improved clarity? Write a 200-word analysis.'
          },
          {
            type: 'practice',
            content: 'Task 3: Comparative Speaking Styles\nWrite two versions of the same 1-minute opening for a presentation on climate change:\n- Version A: Following French academic convention (building toward the thesis)\n- Version B: Following English academic convention (thesis stated upfront)\n\nExplain in 150 words why the English version is more effective for an anglophone audience and what a French speaker must consciously adjust.'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Structure an academic presentation with a clear introduction, body, and conclusion',
          'Use signposting language to guide the audience through a presentation',
          'Apply techniques for managing nervousness and maintaining audience engagement'
        ],
        input: [
          {
            type: 'wonder',
            content: 'What makes some speakers easy to follow while others lose you after the first minute?'
          },
          {
            type: 'reading',
            title: 'Structuring Academic Presentations',
            text: 'A good academic presentation in English has three clear parts: introduction, body, and conclusion. This structure helps your audience follow your ideas and remember your main points.\n\nThe introduction has three jobs: grab attention, state your topic, and preview your structure. Start with a "hook" — a surprising fact, a question, or a short story. Then tell your audience exactly what you will talk about: "Today I will discuss three reasons why renewable energy is essential for our future."\n\nSignposting language helps your audience follow along. These are phrases that signal where you are in your presentation. Use "Firstly" to start your first point, "Moving on" to change topics, "To summarize" before reviewing your points, and "In conclusion" to signal the end. Without these signals, your audience gets lost.\n\nThe body of your presentation should have two or three main points. Support each point with examples, facts, or explanations. Connect your points with transition phrases: "Now that we have looked at X, let us consider Y."\n\nYour conclusion should briefly repeat your main points and end with a strong final statement. Never add new information in the conclusion.\n\nFor delivery, remember these tips: make eye contact with your audience (do not read from your notes), speak slowly and clearly, and use pauses before important points. If you feel nervous, take three deep breaths before you begin. Practice your presentation at least twice before delivering it. The more you practice, the more confident you will feel.\n\n**Important for French speakers:** In English presentations, state your main idea at the beginning, then give evidence. This is the opposite of the French style, where you build toward your conclusion.'
          },
          {
            type: 'text',
            content: 'Essential signposting phrases:\n\n**Starting:** "Today I will talk about..." / "I have divided my presentation into three parts."\n**First point:** "Firstly..." / "To begin with..." / "Let me start by..."\n**Next points:** "Secondly..." / "Moving on to..." / "My next point is..."\n**Summarizing:** "To summarize..." / "So far we have seen that..."\n**Concluding:** "In conclusion..." / "To sum up..." / "Finally, I would like to say..."\n\n**Tip:** Write your signposting phrases on note cards so you do not forget them during your presentation.'
          },
          {
            type: 'biblical-worldview',
            content: 'Moses told God he was not a good speaker (Exodus 4:10), but God helped him speak to Pharaoh and lead Israel. Colossians 4:6 says: "Let your speech always be gracious, seasoned with salt." When we speak clearly and kindly, we reflect God\'s gift of communication. Good presentation skills help us share ideas — and faith — more effectively.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is it important to state your main point at the beginning of an English presentation?',
              'How does signposting language help your audience follow your ideas?',
              'What are two things you can do to feel less nervous before a presentation?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Fill in the Signposting\nComplete this presentation outline with signposting phrases:\n\n"_____, I will discuss the benefits of reading. _____, reading improves vocabulary. _____, it develops critical thinking. _____, reading reduces stress. _____, reading is one of the most valuable habits you can develop."\n\nExercise 2: Write a Hook\nWrite two different hooks for a presentation about "The Importance of Learning a Second Language":\n- One using a surprising fact\n- One using a question'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Presentation Outline\nCreate an outline for a 3-minute presentation on "Why Students Should Read More Books." Include:\n- A hook to grab attention\n- Your main idea (thesis)\n- Two or three supporting points\n- Signposting language for each transition\n- A conclusion that restates your main idea\n\nTask 2: Practice Plan\nWrite a step-by-step plan for how you would prepare to deliver this presentation, including how many times you would practice and what you would focus on each time.'
          },
          {
            type: 'practice',
            content: 'Task 3: Signposting Match\nMatch each situation to the best signposting phrase:\n1. You are starting your second point → _____\n2. You want to emphasize something important → _____\n3. You are finishing your presentation → _____\n4. You are changing from one topic to another → _____\n\nPhrases: "In conclusion," / "Moving on to," / "Secondly," / "It is important to note that"'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Organize a short presentation with a beginning, middle, and end',
          'Use simple signposting phrases to connect ideas in a presentation',
          'Practice basic delivery skills including eye contact and clear speaking'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Think about a time someone explained something to you really clearly. What made it easy to understand?'
          },
          {
            type: 'reading',
            title: 'Giving a Good Presentation',
            text: 'A presentation is like a journey. Your audience needs to know where they are going, where they are now, and when they have arrived. To do this, follow a simple plan: tell them what you will say, say it, then tell them what you said.\n\nStart with a hook — something interesting to get attention. This can be a question ("Have you ever wondered why...?") or a surprising fact. Then say your main idea: "Today I will talk about..."\n\nIn the middle, share your main points. Use signal words to help your audience follow you: "First... Second... Third..." or "To begin... Next... Finally..." These words are called signposting because they are like signs on a road.\n\nAt the end, summarize your points: "To sum up, I talked about..." Then finish with a strong final sentence.\n\nWhen you speak, look at your audience, not at your paper. Speak slowly and clearly. If you feel nervous, that is normal! Take a deep breath and remember: you know your topic. Practice makes perfect.\n\n**For French speakers:** In English, say your main point first, then explain. Do not wait until the end to share your big idea.'
          },
          {
            type: 'text',
            content: 'Useful signposting words:\n\n**Beginning:** "Today I will talk about..." / "My topic is..."\n**Middle:** "First..." / "Second..." / "Next..." / "Also..."\n**End:** "To sum up..." / "In conclusion..." / "Finally..."\n\n**Remember:** Speak slowly. Look up. Breathe.'
          },
          {
            type: 'biblical-worldview',
            content: 'God gave us the ability to speak and share ideas. Even Moses, who was afraid to speak, was used by God to do great things (Exodus 4:10-12). The Bible tells us to speak with kindness: "Let your speech always be gracious" (Colossians 4:6). When we present well, we use the gifts God gave us.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is it helpful to tell your audience what you will talk about before you start?',
              'What are three signposting words you can use in a presentation?',
              'What can you do if you feel nervous before speaking?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Put the Presentation in Order\nNumber these sentences 1-5 to make a good presentation:\n___ "Second, exercise helps you sleep better."\n___ "In conclusion, exercise is good for your body and mind."\n___ "Today I will talk about why exercise is important."\n___ "First, exercise keeps your body healthy."\n___ "Did you know that just 30 minutes of exercise a day can change your life?"'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Mini-Presentation Plan\nPlan a 1-minute presentation about your favorite hobby. Write:\n- A hook (question or interesting fact)\n- Your main idea: "Today I will talk about..."\n- Two reasons why you like this hobby (use "First..." and "Second...")\n- A conclusion: "To sum up..."\n\nTask 2: Signposting Practice\nFill in the blanks with signposting words:\n"_____ I will talk about my school. _____, my school has great teachers. _____, we have many activities. _____, I really enjoy going to my school."'
          },
          {
            type: 'practice',
            content: 'Task 3: Delivery Checklist\nBefore your next presentation, check these boxes:\n- [ ] I practiced at least two times\n- [ ] I know my main points without reading every word\n- [ ] I planned where to look at my audience\n- [ ] I planned where to pause\n- [ ] I took a deep breath before starting'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the recommended structure for an English academic presentation?',
        options: [
          'Analysis, then thesis, then evidence',
          'Introduction, body, and conclusion',
          'Evidence, conclusion, then introduction',
          'Summary, details, then hook'
        ],
        correctIndex: 1
      },
      {
        question: 'What is "signposting" in a presentation?',
        options: [
          'Using visual aids like slides',
          'Transition phrases that guide the audience through your talk',
          'Writing key words on a whiteboard',
          'Pointing at the audience during your speech'
        ],
        correctIndex: 1
      },
      {
        question: 'Which phrase is an example of signposting language?',
        options: [
          '"That is very interesting."',
          '"Moving on to my next point..."',
          '"I really like this topic."',
          '"Does anyone have questions?"'
        ],
        correctIndex: 1
      },
      {
        question: 'How does the English presentation style differ from the French academic tradition?',
        options: [
          'English uses more formal vocabulary',
          'English states the thesis at the beginning, while French builds toward it',
          'English presentations are always longer',
          'French presentations use more signposting'
        ],
        correctIndex: 1
      },
      {
        question: 'What should the introduction of a presentation include?',
        options: [
          'A summary of all evidence and a final conclusion',
          'A hook, the topic, and a preview of the structure',
          'The bibliography and source list',
          'A detailed analysis of the first main point'
        ],
        correctIndex: 1
      },
      {
        question: 'Which of the following is a good "hook" for a presentation?',
        options: [
          '"My name is Jean and I will present."',
          '"Please turn to page 42."',
          '"Did you know that 93% of communication is nonverbal?"',
          '"In conclusion, this topic is important."'
        ],
        correctIndex: 2
      },
      {
        question: 'What should you NOT do in the conclusion of a presentation?',
        options: [
          'Summarize your main points',
          'Restate your thesis',
          'Introduce new information',
          'Leave the audience with a final thought'
        ],
        correctIndex: 2
      },
      {
        question: 'What is the "lighthouse technique" in presentation delivery?',
        options: [
          'Shining a light on your notes',
          'Making eye contact with different sections of the audience',
          'Standing in one place without moving',
          'Speaking very loudly so everyone can hear'
        ],
        correctIndex: 1
      },
      {
        question: 'Which strategy best helps manage presentation nerves?',
        options: [
          'Avoid preparing so you seem spontaneous',
          'Read directly from your notes without looking up',
          'Practice multiple times and prepare thoroughly',
          'Speak as fast as possible to finish quickly'
        ],
        correctIndex: 2
      },
      {
        question: 'According to Colossians 4:6, how should our speech be characterized?',
        options: [
          'Bold and confrontational',
          'Quiet and hesitant',
          'Gracious, seasoned with salt',
          'Long and detailed'
        ],
        correctIndex: 2
      }
    ]
  },

  // W2: Academic Discussions and Seminars
  {
    unitNumber: 4,
    weekNumber: 2,
    title: 'Academic Discussions and Seminars',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'seminar',
      'consensus',
      'discourse',
      'interlocutor',
      'facilitate',
      'deliberation',
      'corroborate',
      'nuance'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Participate effectively in academic seminars using appropriate discourse markers for agreement, disagreement, and elaboration',
          'Employ strategies for building on others\' contributions, requesting clarification, and summarizing group discussions',
          'Navigate the cultural differences between French and English academic discussion norms',
          'Facilitate a structured academic discussion with balanced turn-taking and productive dialogue'
        ],
        input: [
          {
            type: 'wonder',
            content: 'In a room full of smart people with different opinions, how do the best discussions happen without turning into arguments? What invisible rules keep academic dialogue productive?'
          },
          {
            type: 'reading',
            title: 'The Art of Academic Discussion',
            text: 'Academic discussions and seminars are not simply conversations — they are structured exchanges of ideas governed by specific conventions that differ across cultures. For French-speaking students entering English-medium academic environments, understanding these conventions is essential for full participation.\n\nIn English academic culture, discussions emphasize building on others\' ideas rather than simply stating your own position. The most valued contributors are not those who speak the most forcefully, but those who listen carefully and connect ideas. This represents a significant cultural shift for students trained in the French tradition, where intellectual debate often involves more direct challenge and assertive positioning.\n\nAgreeing in academic discussion goes beyond "I agree." Use phrases that add substance: "I\'d like to build on what Sarah said by adding that..." or "That\'s a compelling point, and it connects to the research showing that..." or "I share that perspective, particularly regarding..." These phrases show you have listened and are extending the conversation.\n\nDisagreeing requires particular care in English academic settings. Direct contradiction ("You are wrong") is considered aggressive. Instead, use softened disagreement: "I see your point, but I wonder if we might also consider..." or "That\'s an interesting perspective, though I would argue that..." or "I take a slightly different view on this because..." The goal is to challenge the idea, not the person — a distinction that is sometimes less emphasized in French academic debate.\n\nBuilding on contributions means connecting your ideas to what others have said: "I\'d like to add to what X said..." or "Following from that point, it seems to me that..." or "That relates to something I read about..." This creates a web of interconnected ideas rather than a series of isolated statements.\n\nClarifying is essential when you do not understand: "Could you elaborate on what you mean by...?" or "I\'m not sure I follow — are you suggesting that...?" or "What do you mean by...?" Asking for clarification is not a sign of weakness; it demonstrates engagement and intellectual honesty.\n\nSummarizing others\' contributions shows active listening and helps the group track the discussion: "So if I understand correctly, you\'re arguing that..." or "To summarize what we\'ve discussed so far..." or "It seems we have two main perspectives: X argues... while Y suggests..." Effective summarizing is one of the most valued skills in English-language seminars.\n\nTurn-taking etiquette in English discussions is generally less formal than in French academic settings, but there are unspoken rules. Wait for a natural pause before speaking. If someone interrupts you, you may say: "If I could just finish my point..." Signal that you want to speak with phrases like "I\'d like to respond to that" rather than simply talking over someone.'
          },
          {
            type: 'text',
            content: 'Discussion language toolkit:\n\n**Agreeing and building:** "I\'d like to build on that..." / "That\'s a strong point, and furthermore..." / "I completely agree, especially regarding..."\n\n**Polite disagreement:** "I see what you mean, but..." / "I\'d respectfully disagree because..." / "That\'s one way to look at it, though I wonder if..." / "I take a different view..."\n\n**Requesting clarification:** "Could you clarify what you mean by...?" / "I\'m not sure I follow — could you give an example?" / "What do you mean by...?"\n\n**Summarizing others:** "So if I understand correctly, you\'re saying..." / "To summarize the discussion so far..." / "It seems we agree on X but differ on Y."\n\n**Adding a new point:** "I\'d like to raise another point..." / "This also connects to..." / "Another way to think about this is..."\n\n**French-English cultural note:** French academic culture values the "joute intellectuelle" (intellectual sparring). English academic culture values collaborative inquiry. Both are valid; the key is adapting to your audience\'s expectations.'
          },
          {
            type: 'biblical-worldview',
            content: 'Proverbs 27:17 tells us that "as iron sharpens iron, so one person sharpens another." Academic discussion, at its best, embodies this principle — we grow intellectually and spiritually through respectful exchange of ideas. James 1:19 provides the perfect discussion protocol: "Let every person be quick to hear, slow to speak, slow to anger." The best seminar participants are those who listen deeply before responding. Isaiah 1:18 shows God Himself inviting dialogue: "Come now, let us reason together." This divine model of reasoning together — with respect, openness, and a commitment to truth — should guide every academic discussion we enter.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'How does the French "joute intellectuelle" (intellectual sparring) style differ from the English collaborative inquiry approach? What are the strengths and weaknesses of each?',
              'Why is it important in English academic culture to "challenge the idea, not the person"? How does this relate to James 1:19?',
              'In what ways does the skill of summarizing others\' contributions demonstrate both intellectual ability and respect for others?',
              'How can Proverbs 27:17 ("iron sharpens iron") help us understand the purpose of academic disagreement?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Respond Appropriately\nFor each statement, write (a) an agreeing response that builds on the idea, (b) a polite disagreement, and (c) a clarification request:\n\nStatement 1: "Social media has fundamentally damaged young people\'s mental health."\nStatement 2: "The best way to reduce poverty is through education."\nStatement 3: "Artificial intelligence will replace most human jobs within 20 years."\n\nExercise 2: Discussion Mapping\nRead this discussion excerpt and identify: (a) who builds on others\' ideas, (b) who introduces new points, (c) where a summary would be helpful.\n\nAmir: "I think climate change is the biggest threat to our generation."\nLucia: "Poverty affects more people right now though."\nKamal: "Both are connected — climate change makes poverty worse."\nSophie: "But what about conflict and war? That displaces millions."\n\nWrite a summary of the discussion and a response that connects all four perspectives.'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Seminar Simulation Script\nWrite a full script for a 5-person academic discussion on the topic: "Should schools prioritize STEM subjects over the humanities?" Include:\n- Opening remarks from the facilitator\n- At least 3 instances of building on others\' ideas\n- At least 2 polite disagreements\n- At least 1 clarification request\n- A final summary from the facilitator\nLabel each discourse move in brackets (e.g., [building], [disagreeing], [clarifying]).\n\nTask 2: Cultural Comparison Essay\nWrite a 250-word comparison of French and English academic discussion styles. Address: tone, directness, turn-taking, and the role of disagreement. Include specific discussion phrases from each tradition.'
          },
          {
            type: 'practice',
            content: 'Task 3: Active Listening Analysis\nReflect on a real discussion you have participated in (in French or English). Write 200 words analyzing:\n- How well did participants listen to each other?\n- Were ideas built upon, or did people simply state their own views?\n- How was disagreement handled?\n- What would you do differently using the strategies from this lesson?'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Use phrases for agreeing, disagreeing, and building on others\' ideas in academic discussions',
          'Ask for clarification and summarize others\' contributions during group discussions',
          'Understand the differences between French and English discussion styles'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Have you ever been in a group discussion where everyone talked but nobody listened? What was missing?'
          },
          {
            type: 'reading',
            title: 'Participating in Academic Discussions',
            text: 'Academic discussions in English are different from everyday conversations. They have rules that help everyone share ideas, listen to each other, and reach a deeper understanding of the topic.\n\nThe most important skill in a discussion is listening. Before you speak, make sure you have heard and understood what others said. The best discussion participants connect their ideas to what others have already said.\n\nTo agree and build on an idea, say: "I agree with Maria, and I would add that..." or "That is a good point. It connects to..." This shows you listened and have something to add.\n\nTo disagree politely, say: "I see your point, but I think..." or "I understand what you mean, however..." In English academic culture, it is important to disagree with the idea, not the person. Never say "You are wrong." Instead, offer a different perspective.\n\nTo ask for clarification, say: "Could you explain what you mean by...?" or "I am not sure I understand. Could you give an example?" This is not rude — it shows you are engaged.\n\nTo summarize, say: "So if I understand correctly, you are saying that..." or "To sum up, we have two different views: one is... and the other is..." Summarizing helps the group see where they agree and disagree.\n\n**For French speakers:** French academic discussions often involve strong, direct debate. English discussions use softer language. This does not mean English speakers disagree less — they just express it differently.'
          },
          {
            type: 'text',
            content: 'Discussion phrase bank:\n\n**Agree:** "I agree..." / "That is a good point..." / "I think so too..."\n**Build:** "I would like to add..." / "That connects to..." / "Building on that idea..."\n**Disagree:** "I see your point, but..." / "I understand, however..." / "I respectfully disagree because..."\n**Clarify:** "What do you mean by...?" / "Could you explain...?" / "Could you give an example?"\n**Summarize:** "So you are saying..." / "To sum up..." / "It seems we agree on... but disagree on..."'
          },
          {
            type: 'biblical-worldview',
            content: 'James 1:19 says: "Let every person be quick to hear, slow to speak, slow to anger." This is the perfect rule for academic discussions. Proverbs 27:17 adds: "As iron sharpens iron, so one person sharpens another." When we discuss ideas respectfully, we help each other grow. God Himself invites us to reason: "Come now, let us reason together" (Isaiah 1:18).'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is listening more important than speaking in a good discussion?',
              'How can you disagree with someone without being rude?',
              'What is the difference between French and English styles of academic debate?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Choose the Best Response\nSomeone says: "I believe homework should be banned."\nWhich response is best for an academic discussion?\na) "That is ridiculous."\nb) "I see your point, but I think some homework helps students practice."\nc) "I do not care about homework."\n\nExercise 2: Write Responses\nFor this statement — "Technology is making students lazy" — write:\n- An agreeing response that adds a new idea\n- A polite disagreement\n- A clarification question'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Discussion Role-Play\nWrite a discussion between three students about "Should students wear school uniforms?" Each student should:\n- State their opinion\n- Build on someone else\'s idea\n- Use at least one clarification question\n- Use polite disagreement at least once\n\nTask 2: Phrase Sorting\nSort these phrases into categories (Agree / Disagree / Clarify / Summarize):\n- "Could you give an example?"\n- "I see your point, but..."\n- "That is a good point, and I would add..."\n- "So you are saying that..."\n- "I respectfully disagree because..."\n- "To sum up our discussion..."'
          },
          {
            type: 'practice',
            content: 'Task 3: Self-Reflection\nThink about discussions in your classes. Write 100 words about:\n- Do you usually agree, disagree, or stay quiet?\n- Which discussion phrases from this lesson will you try next time?\n- How can listening better help you contribute more?'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Use basic phrases to agree, disagree, and ask questions in group discussions',
          'Listen to others and respond to their ideas, not just share your own',
          'Practice polite language for disagreeing in English'
        ],
        input: [
          {
            type: 'wonder',
            content: 'When you are in a group and everyone has a different idea, how do you share your opinion without starting an argument?'
          },
          {
            type: 'reading',
            title: 'Talking in Group Discussions',
            text: 'In English, group discussions have simple rules: listen, respond, and be polite. Here are the most important phrases you need.\n\nTo agree: "I agree with you." / "That is a good point." / "I think so too."\n\nTo disagree: "I see what you mean, but I think..." / "I understand, but..." Do not say "You are wrong." In English, this is too strong for a class discussion.\n\nTo add to someone\'s idea: "I would like to add..." / "Also..." / "And another thing is..."\n\nTo ask a question: "What do you mean?" / "Can you say more about that?" / "Can you give an example?"\n\nTo summarize: "So you are saying..." / "Okay, so the main point is..."\n\nThe most important rule is: listen first, then speak. Do not just wait for your turn to talk. Try to connect your idea to what the other person said.\n\n**For French speakers:** In French class discussions, it is normal to disagree strongly. In English, use softer words. "I disagree" is okay, but add a reason: "I disagree because..."'
          },
          {
            type: 'text',
            content: 'Quick reference — Discussion phrases:\n\nAgree: "I agree." / "Good point." / "I think so too."\nDisagree: "I see your point, but..." / "I understand, but I think..."\nAdd: "I would also like to say..." / "Also..."\nAsk: "What do you mean?" / "Can you explain?"\nSummarize: "So you are saying..."'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible says to be "quick to hear, slow to speak" (James 1:19). In discussions, listening is just as important as talking. When we listen to others and respond with kindness, we show respect — and that is what God asks of us.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why should you say "I see your point, but..." instead of "You are wrong"?',
              'What does "quick to hear, slow to speak" mean for group discussions?',
              'How can you show that you listened to someone before you give your opinion?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Match the Phrase\nMatch each situation to the best phrase:\n1. You agree with someone → _____\n2. You disagree with someone → _____\n3. You do not understand → _____\n4. You want to add an idea → _____\n\nPhrases: "I would also like to say..." / "I think so too." / "What do you mean?" / "I see your point, but..."'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Write a Short Discussion\nTwo students are discussing: "Is it better to study alone or in a group?" Write 4-6 lines of dialogue using at least:\n- One agreement phrase\n- One disagreement phrase\n- One clarification question\n\nTask 2: Fill in the Blanks\nComplete this discussion:\nAnna: "I think dogs are better pets than cats."\nBen: "_____, but I think cats are easier to take care of."\nAnna: "_____? Can you explain why?"\nBen: "Well, cats do not need to be walked. _____, they are more independent."'
          },
          {
            type: 'practice',
            content: 'Task 3: Listening Challenge\nNext time you are in a conversation (in any language), try to:\n- Wait until the other person finishes before you speak\n- Start your response with "So you are saying..." to show you listened\n- Write down how it felt. Was it easy or hard?'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the most important skill in an academic discussion?',
        options: [
          'Speaking loudly',
          'Listening carefully to others',
          'Disagreeing with everyone',
          'Finishing first'
        ],
        correctIndex: 1
      },
      {
        question: 'Which phrase is the best way to politely disagree in English?',
        options: [
          '"You are completely wrong."',
          '"That is a bad idea."',
          '"I see your point, but I think..."',
          '"No, I disagree."'
        ],
        correctIndex: 2
      },
      {
        question: 'What does "building on someone\'s idea" mean?',
        options: [
          'Repeating exactly what they said',
          'Ignoring their point and making your own',
          'Connecting your idea to theirs and adding something new',
          'Disagreeing with everything they said'
        ],
        correctIndex: 2
      },
      {
        question: 'Which phrase is used to ask for clarification?',
        options: [
          '"I agree with you."',
          '"Could you explain what you mean by...?"',
          '"In conclusion..."',
          '"Moving on to my next point..."'
        ],
        correctIndex: 1
      },
      {
        question: 'How does French academic discussion style differ from English?',
        options: [
          'French uses more visual aids',
          'English discussions are always shorter',
          'French style is often more direct and assertive; English uses softer language',
          'There is no difference between them'
        ],
        correctIndex: 2
      },
      {
        question: 'What does summarizing in a discussion show?',
        options: [
          'That you want to end the conversation',
          'That you were not paying attention',
          'That you listened and can restate others\' ideas accurately',
          'That you disagree with everyone'
        ],
        correctIndex: 2
      },
      {
        question: 'Which is the best way to start a summary of a discussion?',
        options: [
          '"I do not care about this topic."',
          '"To sum up, we have discussed..."',
          '"Let me change the subject."',
          '"I want to say something new."'
        ],
        correctIndex: 1
      },
      {
        question: 'According to James 1:19, we should be:',
        options: [
          'Quick to speak and slow to listen',
          'Quick to anger and slow to respond',
          'Quick to hear, slow to speak, slow to anger',
          'Quick to leave and slow to participate'
        ],
        correctIndex: 2
      },
      {
        question: 'What does the phrase "I\'d like to add to what X said" demonstrate?',
        options: [
          'That you want to interrupt',
          'That you are bored',
          'That you listened and want to build on their idea',
          'That you disagree completely'
        ],
        correctIndex: 2
      },
      {
        question: 'What does Proverbs 27:17 ("iron sharpens iron") teach about discussion?',
        options: [
          'Discussions should be avoided because they cause conflict',
          'We grow through respectful exchange of ideas with others',
          'Only one person should speak at a time',
          'Iron is the best metal for tools'
        ],
        correctIndex: 1
      }
    ]
  },

  // W3: Defending a Position
  {
    unitNumber: 4,
    weekNumber: 3,
    title: 'Defending a Position',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'hedging',
      'concession',
      'counterargument',
      'qualify',
      'tentative',
      'caveat',
      'rebut',
      'assertion'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Employ hedging language to present academic arguments with appropriate tentativeness',
          'Acknowledge and address opposing viewpoints while maintaining a clear position',
          'Handle challenging questions during academic discussions and debates with poise',
          'Analyze the cultural shift from French assertive argumentation to English hedged academic discourse'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Why do the strongest academic arguments in English often sound less certain than everyday opinions? What power is there in saying "it seems" instead of "it is"?'
          },
          {
            type: 'reading',
            title: 'The Art of Hedging and Academic Argumentation',
            text: 'One of the most significant adjustments French-speaking students must make in English academic contexts is the use of hedging — language that expresses caution, probability, and appropriate uncertainty. In French academic writing and speaking, assertiveness is valued. A strong thesis stated with conviction is the mark of intellectual confidence. In English academic discourse, however, excessive certainty is viewed as a sign of intellectual immaturity. This difference catches many French speakers off guard.\n\nHedging language includes modal verbs (might, may, could, would), adverbs (perhaps, possibly, arguably, seemingly), and phrases (it appears that, it could be argued that, the evidence suggests that, there is reason to believe that). Compare: "Social media causes depression" (too absolute) with "Research suggests that social media may contribute to increased rates of depression among adolescents" (appropriately hedged). The second version is not weaker — it is more precise and more credible.\n\nWhy hedge? First, academic honesty demands it. Most claims have exceptions, and responsible scholars acknowledge this. Second, hedging invites dialogue rather than shutting it down. A hedged claim says: "Here is what the evidence suggests; let us examine it together." Third, hedging protects your credibility. If you make an absolute claim and a single counterexample exists, your entire argument appears flawed. A hedged claim is resilient.\n\nDefending a position requires three key moves: stating your claim clearly (with appropriate hedging), supporting it with evidence, and addressing counterarguments. The most persuasive arguments do not ignore opposing views — they acknowledge and respond to them. Use concession phrases: "While it is true that... / Although some argue that... / Admittedly..." followed by your rebuttal: "...nevertheless, the evidence indicates... / ...however, this overlooks... / ...this argument fails to account for..."\n\nHandling questions is an essential skill. When challenged, do not become defensive. Instead, use strategies like: "That is an excellent question. The evidence I have seen suggests..." or "I appreciate that perspective. However, if we consider..." or "You raise an important point. Let me clarify my position..."\n\nThe French-English contrast is crucial to understand. In French academic culture (particularly the "dissertation" tradition), a strong thesis defended with logical rigor and rhetorical flourish is the ideal. Direct assertions like "Il est évident que..." or "Il faut reconnaître que..." are standard. In English, these would be considered overconfident. The English equivalent of intellectual strength is precision, nuance, and the willingness to acknowledge complexity. This does not mean English academic writing lacks conviction — it means conviction is expressed through careful reasoning rather than assertive language.\n\nFalse cognate alert: The French word "argument" often means "quarrel" or "dispute." In English, "argument" in academic contexts means a reasoned position supported by evidence — it carries no connotation of conflict.'
          },
          {
            type: 'text',
            content: 'Hedging toolkit:\n\n**Modal verbs:** might, may, could, would, can\n"This might explain..." / "It could be argued that..." / "This would suggest..."\n\n**Hedging adverbs:** perhaps, possibly, arguably, seemingly, apparently, generally, typically\n"Perhaps the most significant factor is..." / "This is arguably the strongest evidence..."\n\n**Hedging phrases:** "It appears that..." / "The evidence suggests..." / "There is reason to believe..." / "It seems likely that..." / "One possible interpretation is..."\n\n**Concession + rebuttal:**\n"While it is true that X, the evidence nevertheless suggests Y."\n"Although some scholars argue X, this perspective overlooks Y."\n"Admittedly, X is a valid concern; however, Y addresses this issue."\n\n**Handling tough questions:**\n"That is an excellent question. Based on the evidence..." \n"I appreciate that challenge. Let me clarify..."\n"You raise a valid point. However, if we consider..."\n\n**French → English shift:**\n"Il est évident que..." → "The evidence appears to suggest that..."\n"Il faut reconnaître que..." → "It might be worth noting that..."\n"Sans aucun doute..." → "It seems quite likely that..."'
          },
          {
            type: 'biblical-worldview',
            content: 'Scripture models both conviction and humility in argumentation. Paul reasoned persuasively in the synagogues (Acts 17:2-3), yet he also wrote: "Now I know in part; then I shall know fully" (1 Corinthians 13:12). This is the essence of academic hedging — holding convictions while acknowledging the limits of human understanding. First Thessalonians 5:21 instructs us to "test everything; hold fast what is good." Defending a position biblically means subjecting our ideas to rigorous examination, being willing to refine our views, and maintaining humility before truth. As Proverbs 18:17 warns: "The one who states his case first seems right, until the other comes and examines him." Good arguments anticipate and address counterarguments.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is the phrase "it could be argued that" actually stronger in English academic writing than "it is obvious that"? How does this relate to Proverbs 18:17?',
              'How does the French "dissertation" tradition of assertive argumentation differ from English academic hedging? What must a French speaker consciously adjust?',
              'Why does acknowledging counterarguments strengthen rather than weaken your position?',
              'How does 1 Corinthians 13:12 ("now I know in part") relate to the academic practice of hedging?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Hedge These Claims\nRewrite each sentence with appropriate hedging language:\n1. "Social media is destroying democracy." →\n2. "Students who study abroad are more successful." →\n3. "Climate change will cause the extinction of 50% of species." →\n4. "Online learning is inferior to classroom learning." →\n\nExercise 2: Concession + Rebuttal\nFor each opposing argument, write a concession and rebuttal:\n1. Claim: "Universities should offer more online courses." Opposition: "Online courses have lower completion rates."\n2. Claim: "Bilingual education improves cognitive abilities." Opposition: "Some studies show mixed results."\n3. Claim: "Arts education should be mandatory." Opposition: "Schools have limited budgets for core subjects."\n\nExercise 3: French-to-English Translation\nConvert these French-style academic assertions into properly hedged English:\n1. "Il est évident que la technologie transforme l\'éducation."\n2. "Sans aucun doute, la mondialisation a des effets négatifs."\n3. "Il faut absolument réformer le système éducatif."'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Position Defense Essay\nWrite a 300-word essay defending this position: "Learning a second language should be required for all students from age 6." Your essay must include:\n- A clearly hedged thesis statement\n- At least 3 pieces of supporting evidence with hedging language\n- At least 2 concession + rebuttal structures\n- No instances of "obvious," "clearly," "without doubt," or other overconfident language\n\nTask 2: Question-Handling Simulation\nYou have just argued that "artificial intelligence will benefit education." Write responses to these challenging questions:\n1. "But what about students who cannot afford AI tools?"\n2. "How do you explain studies showing AI reduces critical thinking?"\n3. "Isn\'t AI just making students lazier?"'
          },
          {
            type: 'practice',
            content: 'Task 3: Hedging Spectrum Analysis\nRank these sentences from most hedged to least hedged, then explain which is most appropriate for an academic essay and why:\na) "Technology will definitely destroy traditional education."\nb) "It could be argued that technology may significantly alter traditional educational models."\nc) "Technology is probably going to change education."\nd) "There is some evidence to suggest that technology might influence certain aspects of educational practice."\ne) "Technology seems to be changing education."'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Use hedging language to make academic arguments sound more careful and precise',
          'Acknowledge opposing views and respond to them in a structured way',
          'Understand why English academic writing uses softer language than French academic writing'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Why do English teachers say "Don\'t write \'obviously\' in your essay"? What is wrong with sounding certain?'
          },
          {
            type: 'reading',
            title: 'Defending Your Position with Hedging Language',
            text: 'When you write or speak about your ideas in English, you need to be careful about sounding too certain. In English academic culture, strong absolute statements like "This is obviously true" or "Everyone knows that..." actually make your argument weaker, not stronger. This is very different from French academic writing, where direct, confident statements are expected.\n\nHedging language helps you sound more precise and credible. Instead of saying "Social media causes depression," say "Research suggests that social media may contribute to depression." Instead of "This proves that...," say "This evidence indicates that..." You are not being weak — you are being accurate, because most claims have exceptions.\n\nCommon hedging words include: might, may, could, perhaps, possibly, it seems, it appears, the evidence suggests. These words show that you understand the complexity of the issue.\n\nA strong argument also addresses the other side. Do not ignore opposing views — acknowledge them and respond. Use this pattern:\n- Concession: "While it is true that..." or "Although some people argue..."\n- Rebuttal: "...however, the evidence shows..." or "...nevertheless, this overlooks..."\n\nFor example: "While some argue that homework is a waste of time, research suggests that regular practice reinforces learning, particularly in subjects like mathematics."\n\nWhen someone challenges your idea, stay calm and respond respectfully: "That is a good question. I would say that..." or "I see your point, but the evidence suggests..."\n\n**For French speakers:** In French, "Il est évident que..." is a strong way to start an argument. In English, "It is obvious that..." sounds arrogant. Instead, say "The evidence suggests that..." This is the biggest adjustment you need to make.'
          },
          {
            type: 'text',
            content: 'Hedging words and phrases:\n\n**Verbs:** might, may, could, seems, appears, suggests, indicates\n**Adverbs:** perhaps, possibly, probably, generally, arguably\n**Phrases:** "The evidence suggests..." / "It could be argued that..." / "It appears that..." / "One possible explanation is..."\n\n**Concession + Rebuttal pattern:**\n"While... / Although... / Admittedly..." + "however... / nevertheless... / this overlooks..."\n\n**Avoid:** obviously, clearly, without doubt, everyone knows, it is certain that'
          },
          {
            type: 'biblical-worldview',
            content: 'Paul wrote: "Now I know in part; then I shall know fully" (1 Corinthians 13:12). This means even wise people do not know everything. Hedging in academic writing reflects this humility. First Thessalonians 5:21 tells us to "test everything" — good arguments welcome testing. We defend our ideas not with arrogance but with careful reasoning and respect for truth.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why does the sentence "Research suggests X may be true" sound stronger in an English essay than "X is obviously true"?',
              'How is defending a position in English different from defending a position in French?',
              'Why is it important to acknowledge the opposing view in your argument?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Add Hedging\nRewrite these sentences to sound more academic:\n1. "Video games are bad for children." →\n2. "Exercise definitely prevents all diseases." →\n3. "It is obvious that reading makes you smarter." →\n\nExercise 2: Concession + Rebuttal\nComplete these sentences:\n1. "While some people argue that school uniforms limit freedom, _____."\n2. "Although technology can be distracting, _____."\n3. "Admittedly, learning a language is difficult; however, _____."'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Hedged Paragraph\nWrite a paragraph (150 words) defending this position: "Students should have longer lunch breaks at school." Use:\n- At least 3 hedging words or phrases\n- One concession + rebuttal\n- No words like "obviously" or "definitely"\n\nTask 2: Before and After\nTake this French-style paragraph and rewrite it with English hedging:\n"It is absolutely certain that technology improves education. Every study proves this. Schools without technology are clearly failing their students. There is no argument against using computers in every classroom."'
          },
          {
            type: 'practice',
            content: 'Task 3: Respond to Challenges\nYou argued: "Schools should start later in the morning." Someone says: "But parents need to drop off kids before work." Write a 50-word response using hedging and a concession + rebuttal.'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Use simple hedging words like "might," "maybe," and "I think" to soften strong statements',
          'Learn the concession pattern: "I understand, but..." to address opposing views',
          'Understand that English academic writing prefers careful language over strong, direct claims'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Have you ever said something was "definitely" true, and then found out it was not? How did that feel?'
          },
          {
            type: 'reading',
            title: 'Making Careful Arguments',
            text: 'In English, when you share your opinion in school, it is better to use careful language than strong language. This might surprise you because in French class, being direct and confident is good. But in English, being too direct can make your argument sound weak.\n\nCompare these:\n- Too strong: "Social media is bad for everyone."\n- Better: "Social media might be harmful for some people."\n\nThe second sentence is better because it is more accurate. Not EVERYONE is harmed by social media. When you use words like "might," "perhaps," or "it seems," you sound smarter because you are being precise.\n\nWhen someone disagrees with you, do not get angry. Instead, use this pattern:\n1. Show you understand: "I see your point..." or "That is true, but..."\n2. Give your response: "...however, I think..." or "...but I still believe... because..."\n\nThis is called a concession. You show respect for the other view, then explain why you still hold your position.\n\nHedging words to remember: might, may, could, perhaps, maybe, I think, it seems, possibly.\n\n**For French speakers:** In French, "c\'est évident" (it is obvious) is a good way to argue. In English, saying "it is obvious" sounds rude. Say "it seems" or "the evidence suggests" instead.'
          },
          {
            type: 'text',
            content: 'Hedging words: might, may, could, perhaps, maybe, possibly, I think, it seems\n\nAvoid: obviously, definitely, always, never, everyone knows\n\nConcession pattern:\n"I see your point, but I think..."\n"That is true, however..."\n"I understand, but..."'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible says "test everything" (1 Thessalonians 5:21). This means we should think carefully before we speak. Using hedging words like "maybe" and "perhaps" shows we have thought about our ideas carefully. It is a sign of wisdom, not weakness.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is "Social media might be harmful" better than "Social media is bad" in an English essay?',
              'What is a concession, and why is it helpful when someone disagrees with you?',
              'What hedging words can you remember from this lesson?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Make It Softer\nRewrite these sentences using hedging words:\n1. "Homework is always boring." → "Homework _____ be boring sometimes."\n2. "Video games definitely make kids violent." → "Video games _____ affect some children\'s behavior."\n3. "Everyone knows that exercise is good." → "_____ exercise is beneficial for most people."'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Write Two Versions\nWrite two versions of this opinion: "School should start later."\n- Version 1: Too strong (use "definitely," "obviously," "always")\n- Version 2: Hedged (use "might," "perhaps," "it seems")\n\nTask 2: Concession Practice\nSomeone says: "Phones should be allowed in class because they are useful."\nWrite a response using the pattern: "I see your point, but I think... because..."'
          },
          {
            type: 'practice',
            content: 'Task 3: Spot the Problem\nWhat is wrong with this sentence? How would you fix it?\n"It is obviously true that all students learn better with technology. Everyone knows this and there is no argument against it."'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is "hedging" in academic English?',
        options: [
          'Using strong, absolute language to sound confident',
          'Using careful, tentative language to express appropriate uncertainty',
          'Avoiding any opinion in your writing',
          'Writing very short sentences'
        ],
        correctIndex: 1
      },
      {
        question: 'Which sentence uses appropriate hedging for an academic essay?',
        options: [
          '"It is obvious that technology improves learning."',
          '"Everyone knows that exercise is important."',
          '"Research suggests that regular exercise may improve academic performance."',
          '"There is absolutely no doubt that social media is harmful."'
        ],
        correctIndex: 2
      },
      {
        question: 'Why does English academic writing use more hedging than French academic writing?',
        options: [
          'English speakers are less intelligent',
          'English has fewer vocabulary words',
          'English academic culture values precision and acknowledging complexity over assertiveness',
          'French professors require stronger arguments'
        ],
        correctIndex: 2
      },
      {
        question: 'What is a "concession" in academic argumentation?',
        options: [
          'Giving up your argument entirely',
          'Acknowledging an opposing view before responding with your own position',
          'Repeating your thesis statement',
          'Refusing to consider other perspectives'
        ],
        correctIndex: 1
      },
      {
        question: 'Which hedging word means "it is possible that"?',
        options: [
          'Definitely',
          'Obviously',
          'Perhaps',
          'Certainly'
        ],
        correctIndex: 2
      },
      {
        question: 'What is the correct concession + rebuttal pattern?',
        options: [
          '"You are wrong because..."',
          '"I do not care about your opinion, but..."',
          '"While it is true that X, the evidence suggests Y."',
          '"It is obvious that my point is better."'
        ],
        correctIndex: 2
      },
      {
        question: 'The French phrase "Il est évident que..." should be translated in academic English as:',
        options: [
          '"It is evident that..."',
          '"It is obvious that..."',
          '"The evidence appears to suggest that..."',
          '"Without doubt..."'
        ],
        correctIndex: 2
      },
      {
        question: 'Why should you address counterarguments in your essay?',
        options: [
          'To show you cannot decide what you think',
          'Because your teacher requires it for the grade',
          'Because acknowledging and responding to opposing views strengthens your position',
          'To fill up space and make your essay longer'
        ],
        correctIndex: 2
      },
      {
        question: 'Which response to a challenging question is most appropriate in an academic setting?',
        options: [
          '"That is a stupid question."',
          '"I do not want to answer that."',
          '"That is an excellent question. The evidence suggests..."',
          '"You obviously do not understand my argument."'
        ],
        correctIndex: 2
      },
      {
        question: 'According to 1 Thessalonians 5:21, how should we approach our own arguments?',
        options: [
          'We should never question our own ideas',
          'We should test everything and hold fast to what is good',
          'We should argue as loudly as possible',
          'We should avoid sharing opinions entirely'
        ],
        correctIndex: 1
      }
    ]
  },

  // W4: Formal Presentation (PROJECT)
  {
    unitNumber: 4,
    weekNumber: 4,
    title: 'Formal Presentation',
    lessonType: 'PROJECT',
    vocabulary: [
      'articulate',
      'rhetoric',
      'persuasion',
      'inflection',
      'extemporaneous'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Design, prepare, and deliver a 5-7 minute academic presentation demonstrating signposting, hedging, and audience engagement techniques',
          'Create effective visual aids that complement rather than duplicate the spoken presentation',
          'Handle audience questions with poise using concession and rebuttal strategies',
          'Conduct self-evaluation using academic presentation rubric criteria'
        ],
        input: [
          {
            type: 'project',
            title: 'Formal Academic Presentation',
            prompt: 'Prepare and deliver a 5-7 minute formal academic presentation on one of the following topics:\n\n1. "Should artificial intelligence be used to grade student work?"\n2. "Is bilingual education beneficial for cognitive development?"\n3. "Should social media platforms be regulated by governments?"\n4. A topic of your choice approved by your teacher.\n\nYour presentation must include:\n- A compelling hook and clear thesis statement\n- At least three main points supported by evidence\n- Signposting language at every transition\n- Hedging language throughout (no absolute claims)\n- At least one concession + rebuttal addressing an opposing view\n- A strong conclusion with a call to action\n- Visual aids (slides, poster, or handout) that complement your speech\n- A 2-minute Q&A period where you handle audience questions\n\nYou will be evaluated on: structure, signposting, hedging, delivery (eye contact, pace, volume), visual aids, and Q&A handling.',
            rubric: [
              'Structure: Clear introduction with hook and thesis, organized body with 3+ points, and strong conclusion (20%)',
              'Signposting: Effective use of transition phrases throughout, guiding the audience smoothly between sections (15%)',
              'Hedging and Argumentation: Appropriate use of hedging language; includes concession + rebuttal; no absolute claims (20%)',
              'Delivery: Strong eye contact, varied pace and volume, confident posture, minimal reliance on notes (20%)',
              'Visual Aids: Clean, professional aids that complement (not duplicate) the spoken content (10%)',
              'Q&A Handling: Poised, respectful, and substantive responses to audience questions (15%)'
            ]
          }
        ],
        processing: [],
        output: []
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Prepare and deliver a 5-minute academic presentation with clear structure and signposting',
          'Include hedging language and address at least one opposing viewpoint',
          'Maintain eye contact and speak at an appropriate pace'
        ],
        input: [
          {
            type: 'project',
            title: 'Academic Presentation Project',
            prompt: 'Prepare and deliver a 5-minute formal presentation on one of the following topics:\n\n1. "Should homework be limited to 30 minutes per night?"\n2. "Is it better to learn a language through immersion or classroom study?"\n3. "Should students be allowed to use AI tools for schoolwork?"\n\nYour presentation must include:\n- A hook and clear thesis statement\n- Two or three main points with examples or evidence\n- Signposting language (Firstly, Moving on, In conclusion, etc.)\n- At least two hedging phrases (might, perhaps, it seems, etc.)\n- One concession + rebuttal (While it is true that... however...)\n- A conclusion that summarizes your points\n\nPractice at least twice before presenting. Time yourself.',
            rubric: [
              'Structure: Clear introduction, organized body, and conclusion (25%)',
              'Signposting: Uses transition phrases to guide the audience (20%)',
              'Hedging: Includes at least two hedging phrases and one concession + rebuttal (20%)',
              'Delivery: Eye contact, clear speech, appropriate pace (20%)',
              'Content: Relevant points with supporting examples (15%)'
            ]
          }
        ],
        processing: [],
        output: []
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Prepare and deliver a 3-minute presentation with a beginning, middle, and end',
          'Use at least three signposting phrases and one hedging word',
          'Practice looking at the audience and speaking clearly'
        ],
        input: [
          {
            type: 'project',
            title: 'My Presentation',
            prompt: 'Prepare and give a 3-minute presentation on one of these topics:\n\n1. "My favorite subject and why"\n2. "Why learning English is important"\n3. "A problem in my school and how to fix it"\n\nYour presentation needs:\n- A hook (a question or interesting fact)\n- "Today I will talk about..."\n- Two main points using "First..." and "Second..."\n- One hedging word (might, maybe, perhaps)\n- A conclusion: "To sum up..."\n\nPractice your presentation two times. Try to look at your audience, not your paper.',
            rubric: [
              'Structure: Has a beginning, middle, and end (25%)',
              'Signposting: Uses at least three signposting phrases (25%)',
              'Hedging: Includes at least one hedging word (15%)',
              'Delivery: Looks at the audience and speaks clearly (20%)',
              'Content: Shares ideas on the topic with examples (15%)'
            ]
          }
        ],
        processing: [],
        output: []
      }
    ],
    quiz: []
  },

  // ============================
  // UNIT 5: Research Skills
  // ============================
  // W1: Finding and Evaluating Sources
  {
    unitNumber: 5,
    weekNumber: 1,
    title: 'Finding and Evaluating Sources',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'credibility',
      'peer-reviewed',
      'primary source',
      'secondary source',
      'database',
      'currency',
      'bias',
      'corroborate'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Apply the CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose) systematically to evaluate academic sources',
          'Distinguish between primary and secondary sources and determine when each is appropriate',
          'Navigate academic databases and search strategies to locate peer-reviewed research',
          'Assess source credibility in the context of an increasingly digital information landscape'
        ],
        input: [
          {
            type: 'wonder',
            content: 'In a world where anyone can publish anything online, how do we determine what is actually true? What separates genuine knowledge from convincing misinformation?'
          },
          {
            type: 'reading',
            title: 'Evaluating Sources: The CRAAP Test and Beyond',
            text: 'The ability to find and evaluate sources is arguably the most important academic skill of the twenty-first century. In an era of information overload, the challenge is not finding information — it is determining which information is reliable, relevant, and credible.\n\nThe CRAAP test provides a systematic framework for evaluating any source:\n\n**Currency:** When was the information published or last updated? Is it recent enough for your topic? A 2005 article on social media trends is outdated, but a 2005 historical analysis of World War II may still be relevant. Ask: "Does the date of this source matter for my topic?"\n\n**Relevance:** Does the source address your specific research question? A source might be excellent but irrelevant to your particular argument. Ask: "Does this source directly support or challenge my thesis?"\n\n**Authority:** Who is the author? What are their credentials? Are they affiliated with a reputable institution? Is the publisher recognized in the field? A blog post by an anonymous writer carries less weight than a peer-reviewed journal article by a university professor. Ask: "Why should I trust this author on this topic?"\n\n**Accuracy:** Can the information be verified through other sources? Does the source cite its own references? Is it free of factual errors? Ask: "Can I corroborate this information elsewhere?"\n\n**Purpose:** Why was this source created? Is it meant to inform, persuade, sell, or entertain? A pharmaceutical company\'s website about their own drug is less objective than an independent clinical study. Ask: "What is the author\'s motivation?"\n\nPrimary sources are original materials from the time period being studied: historical documents, original research data, interviews, literary texts, photographs, and government records. Secondary sources analyze, interpret, or comment on primary sources: textbooks, review articles, biographies, and critical essays. Strong academic research typically uses both.\n\nAcademic databases (Google Scholar, JSTOR, PubMed, ERIC) are essential tools for finding peer-reviewed research. Peer-reviewed means the article was evaluated by other experts before publication — this is the gold standard of academic credibility. Learn to use Boolean operators in searches: AND (narrows results), OR (broadens results), and quotation marks for exact phrases.\n\nIn the digital age, additional evaluation skills are crucial. Check for: the domain (.edu, .gov, and .org are generally more reliable than .com), the presence of citations and references, whether other credible sources link to it, and whether the tone is objective or emotionally charged. Be especially cautious of sources that confirm your existing beliefs — confirmation bias is a powerful distortion of research quality.'
          },
          {
            type: 'text',
            content: 'The CRAAP Test:\n\n**C**urrency — When was it published? Is it up to date for your topic?\n**R**elevance — Does it address your specific research question?\n**A**uthority — Who wrote it? What are their credentials?\n**A**ccuracy — Can the information be verified? Does it cite sources?\n**P**urpose — Why was it created? To inform, persuade, or sell?\n\n**Primary vs. Secondary Sources:**\n- Primary: original documents, data, interviews, literary texts, photographs\n- Secondary: textbooks, review articles, biographies, critical essays\n\n**Search strategies:**\n- Use Boolean operators: AND (narrows), OR (broadens)\n- Use quotation marks for exact phrases: "climate change impact"\n- Use academic databases: Google Scholar, JSTOR, ERIC\n- Filter by date, peer-reviewed status, and subject area\n\n**Red flags for unreliable sources:**\n- No author identified\n- No citations or references\n- Emotionally charged language\n- Published by an organization with a clear financial interest\n- Cannot be corroborated by other sources'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible calls us to pursue truth with diligence. Proverbs 18:15 states: "An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge." Evaluating sources is an act of intellectual stewardship — using the mind God gave us to distinguish truth from falsehood. First John 4:1 warns: "Do not believe every spirit, but test the spirits to see whether they are from God." This principle of testing applies not only to spiritual claims but to all claims of truth. As Christians, we have a special responsibility to be people of truth (Ephesians 4:25), which means being rigorous about the information we accept and share.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'How does the CRAAP test help prevent confirmation bias in research?',
              'When would a secondary source be more useful than a primary source, and vice versa?',
              'How does 1 John 4:1 ("test the spirits") apply to evaluating information sources in the digital age?',
              'Why is peer review considered the "gold standard" of academic credibility? What are its limitations?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: CRAAP Test Application\nApply the full CRAAP test to these three sources about "the effects of social media on teenagers":\n\nSource A: A 2024 peer-reviewed study in the Journal of Adolescent Health by Dr. Sarah Chen (Stanford University) analyzing data from 10,000 participants.\n\nSource B: A 2024 blog post titled "Social Media Is DESTROYING Our Kids!!!" by an anonymous parent on a personal website with no citations.\n\nSource C: A 2019 report by Facebook (now Meta) claiming their platform has "overwhelmingly positive effects on teen wellbeing."\n\nRate each source on all five CRAAP criteria (1-5 scale) and explain your reasoning.\n\nExercise 2: Primary vs. Secondary\nClassify each source as primary or secondary and explain:\n1. A diary entry from a World War II soldier\n2. A textbook chapter about World War II\n3. Raw data from a climate science experiment\n4. A newspaper review of a new novel\n5. The novel itself'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Source Evaluation Report\nChoose a topic you are interested in. Find three sources about that topic: one highly credible, one somewhat credible, and one unreliable. For each source, write a CRAAP analysis (100 words each) explaining its strengths and weaknesses. Conclude with a 100-word reflection on which source you would use in an academic essay and why.\n\nTask 2: Database Search Strategy\nYou need to research: "the impact of bilingual education on academic achievement." Write a detailed search plan including:\n- Three different search queries using Boolean operators\n- Which databases you would search\n- How you would filter results\n- What criteria you would use to select the most relevant articles'
          },
          {
            type: 'practice',
            content: 'Task 3: Bias Detection\nRead this paragraph and identify all indicators of bias:\n"Organic food is clearly superior to conventional food. Every sensible person knows this. Big agriculture corporations are poisoning our children with toxic chemicals, and anyone who buys non-organic produce is putting their family at risk. Studies funded by independent health organizations prove that organic food prevents cancer and extends lifespan."\n\nList every problematic claim, identify the type of bias, and rewrite the paragraph in an objective, academically appropriate tone using hedging language.'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Use the CRAAP test to evaluate whether a source is reliable for academic work',
          'Explain the difference between primary and secondary sources',
          'Apply basic search strategies to find credible sources for research'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If you search for something online, the first result gets millions of clicks. But does "first result" mean "best answer"?'
          },
          {
            type: 'reading',
            title: 'Finding Good Sources for Research',
            text: 'When you write a research paper, you need to use reliable sources. But how do you know if a source is good? The CRAAP test helps you decide.\n\nCRAAP stands for:\n- **Currency:** When was it published? Is it recent enough?\n- **Relevance:** Does it actually relate to your topic?\n- **Authority:** Who wrote it? Are they an expert?\n- **Accuracy:** Can you check the facts in other places?\n- **Purpose:** Why was it written? To inform, persuade, or sell?\n\nThere are two main types of sources. Primary sources are original materials: a scientist\'s lab results, a historical letter, or a novel. Secondary sources explain or analyze primary sources: a textbook, a review article, or a biography.\n\nFor school research, the best sources are:\n- Peer-reviewed journal articles (checked by other experts)\n- Books by experts in the field\n- Government and educational websites (.gov, .edu)\n- Reputable news organizations\n\nSources to be careful with:\n- Wikipedia (good for background, but not for citing)\n- Personal blogs (usually not checked for accuracy)\n- Websites trying to sell you something\n- Sources with no author or date\n\nWhen searching online, use Google Scholar for academic articles. Use specific search terms and put phrases in quotation marks. For example, instead of searching "social media bad," search "social media impact on adolescent mental health."\n\n**For French speakers:** The French word "éventuellement" does NOT mean "eventually" in English. It means "possibly" or "potentially." This false cognate appears often in research discussions.'
          },
          {
            type: 'text',
            content: 'The CRAAP Test:\n**C** = Currency (When?)\n**R** = Relevance (Does it fit my topic?)\n**A** = Authority (Who wrote it?)\n**A** = Accuracy (Can I verify it?)\n**P** = Purpose (Why was it written?)\n\nGood sources: peer-reviewed articles, expert books, .edu and .gov websites\nBe careful with: Wikipedia, personal blogs, company websites\n\nSearch tip: Use Google Scholar and specific search terms in quotation marks.'
          },
          {
            type: 'biblical-worldview',
            content: 'Proverbs 18:15 says: "An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge." Evaluating our sources carefully is part of being wise. The Bible also says to "test everything" (1 Thessalonians 5:21). As Christians, we should be people of truth who check our facts carefully before sharing them.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is a peer-reviewed article more reliable than a blog post?',
              'What is the difference between a primary source and a secondary source? Give one example of each.',
              'Why should you check the "purpose" of a source before using it?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: CRAAP Test Practice\nUse the CRAAP test to evaluate these two sources about "exercise and health":\n\nSource A: A 2023 article from the British Medical Journal by Dr. James Wright, citing 15 studies.\nSource B: A 2024 Instagram post by a fitness influencer selling protein powder: "Exercise cures everything!"\n\nRate each on Currency, Relevance, Authority, Accuracy, and Purpose.\n\nExercise 2: Primary or Secondary?\nLabel each source as primary (P) or secondary (S):\n1. A scientist\'s original experiment data ___\n2. A textbook explaining the experiment ___\n3. A letter from Martin Luther King Jr. ___\n4. A biography about Martin Luther King Jr. ___'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Find and Evaluate\nChoose a topic that interests you. Find two sources about it — one that passes the CRAAP test and one that does not. For each source, write:\n- What it is (title, author, date, where you found it)\n- Your CRAAP test rating and explanation\n- Whether you would use it in a school essay and why\n\nTask 2: Search Strategy\nYou are researching "the effects of music on studying." Write three different search queries you could use on Google Scholar. Explain why each one might give different results.'
          },
          {
            type: 'practice',
            content: 'Task 3: Quick CRAAP Check\nFor each source, identify the weakest CRAAP element:\n1. An article from 1995 about internet safety\n2. A website selling a health supplement with "research" supporting it\n3. A well-cited article by "Anonymous"\n4. A detailed study about cats when your topic is dogs'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Use three simple questions to decide if a source is reliable: Who wrote it? When? Why?',
          'Understand the difference between a trustworthy source and an unreliable one',
          'Use Google Scholar to find better sources than regular Google'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If you read something on the internet, how do you know if it is true?'
          },
          {
            type: 'reading',
            title: 'How to Find Good Sources',
            text: 'Not everything on the internet is true. When you do research for school, you need to find sources you can trust. Here are three simple questions to ask about any source:\n\n1. **Who wrote it?** Is the author an expert? Do they work at a university or a research center? If there is no author name, be careful.\n\n2. **When was it written?** If your topic changes quickly (like technology), you need recent sources. If your topic is history, older sources can still be good.\n\n3. **Why was it written?** Was it written to teach you something, or to sell you something? A company trying to sell a product is not a good source of information about that product.\n\nGood sources include: school textbooks, articles by experts, and websites ending in .edu or .gov. Be careful with: personal blogs, social media posts, and websites that are trying to sell something.\n\nA helpful tool is Google Scholar (scholar.google.com). It shows academic articles that have been checked by other experts. This is much better than regular Google for school research.\n\n**For French speakers:** The English word "evidence" means "proof" or "facts." It does NOT mean "obvious" (which is "évidence" in French). This is an important false cognate!'
          },
          {
            type: 'text',
            content: 'Three questions for any source:\n1. WHO wrote it? (Expert = good. No name = be careful.)\n2. WHEN was it written? (Is it recent enough?)\n3. WHY was it written? (To teach or to sell?)\n\nGood sources: textbooks, .edu websites, .gov websites, expert articles\nBe careful: blogs, social media, company websites\n\nUse Google Scholar (scholar.google.com) for better results!'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible says: "An intelligent heart acquires knowledge" (Proverbs 18:15). Finding good sources is part of being wise. God wants us to seek truth, not just believe everything we read. When we check our sources carefully, we show wisdom and responsibility.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is a textbook more reliable than a random website?',
              'If a company is selling a health product, why should you be careful about their "research"?',
              'What is Google Scholar and why is it helpful?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Good Source or Bad Source?\nDecide if each source is good (G) or bad (B) for a school essay:\n1. An article on WebMD by a doctor about flu symptoms ___\n2. A TikTok video about history by a teenager ___\n3. A government health website about nutrition ___\n4. A blog post with no author name ___\n5. A textbook from your school library ___'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Source Check\nFind one source online about a topic that interests you. Answer these questions:\n- Who wrote it?\n- When was it published?\n- Why was it written (to teach, to sell, or to entertain)?\n- Would you use it for a school project? Why or why not?\n\nTask 2: Google Scholar Try\nGo to scholar.google.com. Search for a topic you are interested in. Write down the title, author, and year of the first three results. Are they better than what you find on regular Google?'
          },
          {
            type: 'practice',
            content: 'Task 3: True or False\n1. Everything on the internet is true. (T/F)\n2. Sources with no author are usually reliable. (T/F)\n3. Google Scholar helps you find academic sources. (T/F)\n4. A company website is always the best source about their product. (T/F)\n5. Checking when a source was written is important. (T/F)'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What does CRAAP stand for in source evaluation?',
        options: [
          'Clarity, Relevance, Accuracy, Authority, Purpose',
          'Currency, Relevance, Authority, Accuracy, Purpose',
          'Credibility, Reliability, Authenticity, Accuracy, Precision',
          'Currency, Reliability, Authority, Analysis, Purpose'
        ],
        correctIndex: 1
      },
      {
        question: 'What is a "peer-reviewed" source?',
        options: [
          'An article reviewed by your classmates',
          'A source reviewed by a teacher before publication',
          'An article evaluated by other experts in the field before publication',
          'A website with many positive reviews from users'
        ],
        correctIndex: 2
      },
      {
        question: 'Which is an example of a primary source?',
        options: [
          'A textbook chapter about the French Revolution',
          'A biography of Napoleon',
          'A letter written by a soldier during the French Revolution',
          'A Wikipedia article about French history'
        ],
        correctIndex: 2
      },
      {
        question: 'What does the "Purpose" element of the CRAAP test ask?',
        options: [
          'When was the source published?',
          'Is the source related to your topic?',
          'Why was the source created — to inform, persuade, or sell?',
          'Who is the author of the source?'
        ],
        correctIndex: 2
      },
      {
        question: 'Why should you be cautious about using a company\'s website as a source about their own product?',
        options: [
          'Companies always lie',
          'Company websites are never updated',
          'The company has a financial interest that may bias the information',
          'Company websites do not use English'
        ],
        correctIndex: 2
      },
      {
        question: 'What is the difference between a primary and secondary source?',
        options: [
          'Primary sources are newer than secondary sources',
          'Primary sources are original materials; secondary sources analyze or interpret them',
          'Primary sources are more reliable than secondary sources',
          'Primary sources are found in libraries; secondary sources are found online'
        ],
        correctIndex: 1
      },
      {
        question: 'Which search strategy is most effective for academic research?',
        options: [
          'Typing one word into Google',
          'Using Google Scholar with specific terms in quotation marks',
          'Searching on social media',
          'Asking friends for their opinions'
        ],
        correctIndex: 1
      },
      {
        question: 'The French word "éventuellement" is a false cognate. What does it actually mean in English?',
        options: [
          'Eventually',
          'Evidently',
          'Possibly or potentially',
          'Ultimately'
        ],
        correctIndex: 2
      },
      {
        question: 'Which website domain is generally most reliable for academic research?',
        options: [
          '.com',
          '.net',
          '.edu',
          '.biz'
        ],
        correctIndex: 2
      },
      {
        question: 'According to Proverbs 18:15, what does "an intelligent heart" do?',
        options: [
          'Avoids all research',
          'Acquires knowledge and seeks knowledge',
          'Believes everything it reads',
          'Only trusts personal experience'
        ],
        correctIndex: 1
      }
    ]
  },

  // W2: Paraphrasing and Summarizing
  {
    unitNumber: 5,
    weekNumber: 2,
    title: 'Paraphrasing and Summarizing',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'paraphrase',
      'plagiarism',
      'attribution',
      'reporting verb',
      'synthesis',
      'citation',
      'intellectual property',
      'verbatim'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Paraphrase academic texts by changing both structure and vocabulary while preserving meaning',
          'Use a range of reporting verbs (argues, claims, suggests, demonstrates, contends) with appropriate precision',
          'Distinguish between paraphrasing and plagiarism, applying ethical standards of academic integrity',
          'Summarize complex multi-paragraph texts into concise, accurate representations'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If you read a brilliant idea in someone else\'s work, how do you include it in your own writing without stealing it? Where is the line between being inspired and plagiarizing?'
          },
          {
            type: 'reading',
            title: 'The Art of Paraphrasing and Academic Integrity',
            text: 'Paraphrasing — restating someone else\'s ideas in your own words — is one of the most essential and most difficult academic skills. It is not simply replacing words with synonyms. True paraphrasing requires understanding the original meaning deeply enough to express it in a completely different way.\n\nConsider this original: "The rapid proliferation of social media platforms has fundamentally transformed how adolescents construct their social identities, creating both unprecedented opportunities for self-expression and significant risks to psychological wellbeing." (Dr. Sarah Chen, 2024)\n\nPoor paraphrase (too close to original): "The quick spread of social media sites has fundamentally changed how teenagers build their social identities, creating both new chances for self-expression and major risks to mental health." This merely swaps synonyms — it is still plagiarism.\n\nGood paraphrase: "According to Chen (2024), teenage identity formation has been profoundly reshaped by social media, which offers new avenues for personal expression while simultaneously posing threats to mental health." This changes both the structure (passive to active, rearranged clauses) and vocabulary, while preserving the original meaning.\n\nThe key technique is the "read, cover, write, check" method: read the original carefully, cover it, write the idea from memory in your own words, then check against the original to ensure accuracy without copying. If any phrase of three or more consecutive words matches the original, you need to revise.\n\nReporting verbs are crucial tools for academic paraphrasing. They signal how the original author presented their ideas and reveal your interpretation of their stance:\n- Neutral: states, notes, observes, reports, describes, explains, identifies\n- Argumentative: argues, claims, contends, asserts, maintains, insists\n- Tentative: suggests, implies, proposes, speculates, hypothesizes\n- Supportive: demonstrates, proves, confirms, establishes, shows, reveals\n- Critical: challenges, questions, disputes, criticizes, refutes, rejects\n\nChoosing the right reporting verb matters. "Smith argues that..." implies an opinion or debatable claim. "Smith demonstrates that..." implies strong evidence. "Smith suggests that..." implies tentativeness. Your choice of reporting verb is itself an act of analysis.\n\nSummarizing differs from paraphrasing in scope. A paraphrase restates a specific passage in your own words and is roughly the same length. A summary condenses a larger text (an article, chapter, or book) into its essential points, significantly reducing the length while capturing the core argument.\n\nPlagiarism — presenting others\' words or ideas as your own — is one of the most serious academic offenses. It is not just about copying words; using someone\'s unique ideas or arguments without attribution is also plagiarism. Always cite your sources, even when paraphrasing. In academic writing, intellectual honesty is non-negotiable.'
          },
          {
            type: 'text',
            content: 'Paraphrasing technique — "Read, Cover, Write, Check":\n1. Read the original carefully until you understand it\n2. Cover the original text\n3. Write the idea in your own words from memory\n4. Check against the original — no phrase of 3+ consecutive words should match\n\n**Reporting verbs by category:**\n- Neutral: states, notes, observes, reports, describes\n- Argumentative: argues, claims, contends, asserts, maintains\n- Tentative: suggests, implies, proposes, speculates\n- Supportive: demonstrates, proves, confirms, establishes\n- Critical: challenges, questions, disputes, criticizes\n\n**Paraphrase vs. Summary:**\n- Paraphrase: restates a specific passage; similar length\n- Summary: condenses a longer text; much shorter\n\n**Plagiarism includes:**\n- Copying words without quotation marks\n- Changing only a few words (patch-writing)\n- Using someone\'s ideas without attribution\n- Self-plagiarism (submitting your own previous work as new)'
          },
          {
            type: 'biblical-worldview',
            content: 'Academic integrity is fundamentally a matter of truthfulness. Exodus 20:15 commands "You shall not steal" — this includes intellectual property. Proverbs 12:22 reminds us: "Lying lips are an abomination to the Lord, but those who act faithfully are his delight." When we properly attribute ideas to their sources, we practice honesty and give honor where honor is due (Romans 13:7). Plagiarism is not just an academic rule — it is a violation of the truthfulness God calls us to. When we paraphrase honestly and cite our sources, we demonstrate integrity that honors both the original thinker and our Creator.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is simply replacing words with synonyms not true paraphrasing? What deeper understanding is required?',
              'How does your choice of reporting verb (e.g., "argues" vs. "demonstrates" vs. "suggests") affect how the reader perceives the original source?',
              'How does Exodus 20:15 ("You shall not steal") apply to intellectual property and plagiarism?',
              'Why is the "read, cover, write, check" method effective for avoiding unintentional plagiarism?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Paraphrase Practice\nParaphrase each passage using the "read, cover, write, check" method:\n\nOriginal A: "Climate change poses an existential threat to island nations, where rising sea levels could displace millions of people within the next few decades." (UN Report, 2023)\n\nOriginal B: "The development of artificial intelligence has created a paradox in education: while it can personalize learning like never before, it also threatens to undermine the critical thinking skills that education is meant to develop." (Prof. Martinez, 2024)\n\nExercise 2: Reporting Verb Selection\nChoose the most appropriate reporting verb for each context:\n1. The author strongly believes X is true but provides limited evidence: _____ (argues/demonstrates/notes)\n2. The researcher has proven X through extensive experimentation: _____ (suggests/demonstrates/claims)\n3. The writer mentions X briefly without taking a position: _____ (contends/insists/observes)\n4. The critic disagrees with a previous study\'s conclusion: _____ (confirms/challenges/proposes)'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Paraphrase and Evaluate\nRead this paragraph, then write three versions: (a) a poor paraphrase that is too close to the original, (b) a good paraphrase that changes both structure and vocabulary, and (c) a one-sentence summary. Label each with the appropriate reporting verb.\n\nOriginal: "Educational researchers have consistently found that students who engage in regular reading outside of school demonstrate significantly higher vocabulary acquisition, improved comprehension skills, and greater academic achievement across all subjects. Furthermore, the benefits of independent reading appear to be cumulative, with even modest daily reading habits producing measurable improvements over time." (Dr. Lisa Park, 2023)\n\nTask 2: Reporting Verb Analysis\nRewrite this sentence five times, each time using a different reporting verb. Then explain how each verb changes the reader\'s perception of the claim:\n"[Reporting verb] that technology has changed the way students learn."'
          },
          {
            type: 'practice',
            content: 'Task 3: Summary Writing\nWrite a 100-word summary of this lesson on paraphrasing and summarizing. Include: the main techniques for paraphrasing, the role of reporting verbs, and the importance of academic integrity. Use at least three different reporting verbs.'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Paraphrase a passage by changing both the words and the sentence structure',
          'Use reporting verbs like "argues," "claims," and "suggests" when referring to sources',
          'Understand the difference between paraphrasing and plagiarism'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If you read a great idea in a book, how can you use it in your essay without copying?'
          },
          {
            type: 'reading',
            title: 'Paraphrasing Without Plagiarizing',
            text: 'Paraphrasing means putting someone else\'s ideas into your own words. It is one of the most important skills in academic writing. But it is not as simple as just changing a few words.\n\nHere is an example:\nOriginal: "Regular exercise significantly improves mental health by reducing stress and anxiety."\n\nBad paraphrase: "Regular physical activity greatly improves mental health by decreasing stress and anxiety." (This just swaps synonyms — it is still too close to the original.)\n\nGood paraphrase: "According to recent research, physical activity has been shown to have positive effects on psychological wellbeing, particularly in lowering levels of stress and anxious feelings."\n\nThe good paraphrase changes both the words AND the sentence structure.\n\nHere is a useful method:\n1. Read the original carefully\n2. Cover it up\n3. Write the idea in your own words\n4. Check — make sure no phrase of 3+ words is the same\n\nWhen you paraphrase, you need to use reporting verbs to show where the idea came from:\n- "Smith argues that..." (the author has a strong opinion)\n- "Smith suggests that..." (the author is not completely sure)\n- "Smith demonstrates that..." (the author proves it with evidence)\n- "Smith claims that..." (the author says it, but you are not sure it is true)\n\nPlagiarism means using someone\'s words or ideas without giving them credit. This includes:\n- Copying sentences directly\n- Changing only a few words\n- Using someone\'s ideas without saying where they came from\n\nAlways give credit to your sources, even when you paraphrase. This is called citation.\n\n**For French speakers:** The French word "argument" often means "quarrel." In English academic writing, "argument" means a reasoned position supported by evidence — it is not negative.'
          },
          {
            type: 'text',
            content: 'Paraphrasing method: Read → Cover → Write → Check\n\nReporting verbs:\n- argues = strong opinion\n- suggests = not certain\n- demonstrates = proves with evidence\n- claims = says, but might not be true\n- states = neutral, just reporting\n\nPlagiarism = using someone\'s words or ideas without credit\nAlways cite your sources!'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible says "You shall not steal" (Exodus 20:15). Plagiarism is a form of stealing — taking someone\'s ideas and pretending they are yours. Proverbs 12:22 says lying is an "abomination to the Lord." When we cite our sources and paraphrase honestly, we show the integrity God calls us to.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is changing only a few words not a real paraphrase?',
              'What is the difference between "argues" and "demonstrates" as reporting verbs?',
              'Why is it important to cite your sources even when you paraphrase?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Paraphrase These\nParaphrase each sentence (change the words AND the structure):\n1. "Students who read for 20 minutes a day perform better on standardized tests."\n2. "Social media has changed the way teenagers communicate with each other."\n\nExercise 2: Choose the Reporting Verb\nPick the best reporting verb for each situation:\n1. A scientist has strong data proving something: _____ (suggests / demonstrates / claims)\n2. An author gives an opinion without much evidence: _____ (demonstrates / argues / confirms)\n3. A researcher offers a possibility but is not sure: _____ (insists / suggests / proves)'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Good Paraphrase vs. Bad Paraphrase\nOriginal: "Technology in the classroom can help students learn at their own pace, but it can also be a distraction if not managed properly."\n\nWrite:\n- A bad paraphrase (too close to the original)\n- A good paraphrase (changes words AND structure)\n- Start your good paraphrase with a reporting verb\n\nTask 2: Summary Practice\nSummarize this lesson in 3-4 sentences. Include what paraphrasing is, why it matters, and one reporting verb.'
          },
          {
            type: 'practice',
            content: 'Task 3: Plagiarism Check\nRead these sentences and decide: Plagiarism (P) or Not Plagiarism (NP)?\n1. Copying a sentence from a book and putting it in quotation marks with a citation. ___\n2. Changing two words in a sentence and not citing the source. ___\n3. Paraphrasing an idea completely and citing the source. ___\n4. Using someone\'s unique idea without mentioning their name. ___'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Rewrite a simple sentence in your own words without copying',
          'Use "According to..." and "X says that..." to show where an idea came from',
          'Understand that copying someone\'s work without credit is wrong (plagiarism)'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If your friend writes a great sentence for homework, can you just copy it and put your name on it? Why not?'
          },
          {
            type: 'reading',
            title: 'Putting Ideas in Your Own Words',
            text: 'When you read something for school and want to use the idea, you need to say it in your own words. This is called paraphrasing.\n\nExample:\nOriginal: "Dogs are the most popular pets in America."\nYour words: "In America, more people have dogs as pets than any other animal."\n\nSee? Same idea, different words and order.\n\nHere is how to do it:\n1. Read the sentence\n2. Close the book or cover the screen\n3. Write the idea in YOUR words\n4. Check that you did not copy\n\nWhen you use someone\'s idea, tell the reader where it came from:\n- "According to Dr. Smith, dogs are very popular pets."\n- "Dr. Smith says that many people prefer dogs."\n\nCopying someone\'s words and saying they are yours is called plagiarism. It is like stealing. Even in school, you must give credit when you use someone else\'s ideas.\n\n**For French speakers:** "Evidence" in English means proof or facts. It does NOT mean "obvious" (that is "évidence" in French). Be careful with this word!'
          },
          {
            type: 'text',
            content: 'How to paraphrase:\n1. Read → 2. Cover → 3. Write in your words → 4. Check\n\nTo give credit:\n"According to [name]..." / "[Name] says that..."\n\nPlagiarism = copying without giving credit = WRONG'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible says "You shall not steal" (Exodus 20:15). Using someone\'s words or ideas without giving them credit is a kind of stealing. God wants us to be honest in everything we do, including our schoolwork.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is it wrong to copy someone\'s work without giving them credit?',
              'What is the difference between copying and paraphrasing?',
              'How do you show where an idea came from?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Rewrite in Your Words\n1. Original: "Cats sleep about 16 hours a day."\n   Your words: _____\n2. Original: "Exercise helps students focus better in class."\n   Your words: _____\n3. Original: "Reading every day improves your vocabulary."\n   Your words: _____'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Paraphrase and Credit\nRewrite this sentence in your own words AND add "According to..."\nOriginal (by Dr. Lee): "Learning a second language helps your brain become stronger."\nYour version: "According to Dr. Lee, _____"\n\nTask 2: Is It Plagiarism?\nWhich of these is plagiarism? Write P (plagiarism) or OK (not plagiarism):\n1. You copy a sentence from a website and add it to your essay without quotation marks. ___\n2. You read an idea, think about it, and write it in completely different words with a citation. ___\n3. Your friend writes a paragraph and you put your name on it. ___'
          },
          {
            type: 'practice',
            content: 'Task 3: Practice Sentence\nRead this fact: "According to scientists, the Earth is about 4.5 billion years old."\nNow write it in your own words without copying. Start with "Scientists say that..."'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is paraphrasing?',
        options: [
          'Copying a text word for word',
          'Restating someone else\'s ideas in your own words',
          'Translating a text from French to English',
          'Writing your own opinion about a topic'
        ],
        correctIndex: 1
      },
      {
        question: 'Which is a GOOD paraphrase of "Exercise reduces stress and improves mood"?',
        options: [
          '"Physical activity decreases stress and betters mood."',
          '"Exercise reduces anxiety and improves feelings."',
          '"Research indicates that physical activity can have positive effects on both stress levels and emotional wellbeing."',
          '"Exercise is good for stress and mood."'
        ],
        correctIndex: 2
      },
      {
        question: 'What is the "read, cover, write, check" method used for?',
        options: [
          'Memorizing vocabulary words',
          'Avoiding plagiarism when paraphrasing',
          'Taking notes in class',
          'Studying for a quiz'
        ],
        correctIndex: 1
      },
      {
        question: 'Which reporting verb suggests the author is expressing a strong opinion?',
        options: [
          'Observes',
          'Notes',
          'Argues',
          'Describes'
        ],
        correctIndex: 2
      },
      {
        question: 'What is plagiarism?',
        options: [
          'Using quotation marks around a direct quote',
          'Presenting someone else\'s words or ideas as your own',
          'Paraphrasing with proper citation',
          'Summarizing a text in your own words'
        ],
        correctIndex: 1
      },
      {
        question: 'Which reporting verb implies the author has proven something with evidence?',
        options: [
          'Claims',
          'Suggests',
          'Demonstrates',
          'Speculates'
        ],
        correctIndex: 2
      },
      {
        question: 'A good paraphrase changes:',
        options: [
          'Only the vocabulary (synonyms)',
          'Only the sentence structure',
          'Both the vocabulary and the sentence structure',
          'Nothing — it keeps the original wording'
        ],
        correctIndex: 2
      },
      {
        question: 'The French word "argument" often means "quarrel." What does "argument" mean in English academic writing?',
        options: [
          'A fight between two people',
          'A loud disagreement',
          'A reasoned position supported by evidence',
          'A criticism of another person'
        ],
        correctIndex: 2
      },
      {
        question: 'Which of the following is an example of plagiarism?',
        options: [
          'Quoting a source with quotation marks and a citation',
          'Paraphrasing an idea and citing the source',
          'Changing two words in a sentence and not citing the source',
          'Writing your own original ideas'
        ],
        correctIndex: 2
      },
      {
        question: 'According to Exodus 20:15, why is plagiarism wrong?',
        options: [
          'It is too time-consuming',
          'It is a form of stealing someone else\'s intellectual work',
          'It makes your essay too long',
          'It is only wrong if you get caught'
        ],
        correctIndex: 1
      }
    ]
  },

  // W3: Synthesizing Multiple Sources
  {
    unitNumber: 5,
    weekNumber: 3,
    title: 'Synthesizing Multiple Sources',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'synthesis',
      'juxtapose',
      'converge',
      'diverge',
      'corroborate',
      'contradict',
      'integrate',
      'triangulate'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Synthesize information from multiple sources to build a cohesive argument rather than simply summarizing each source separately',
          'Use synthesis language to show relationships between sources: agreement, disagreement, and complementary perspectives',
          'Construct evidence-based arguments by integrating and analyzing multiple viewpoints',
          'Distinguish between a literature review (synthesis) and an annotated bibliography (summary)'
        ],
        input: [
          {
            type: 'wonder',
            content: 'When three different experts study the same problem and reach different conclusions, how do you make sense of their disagreement? Is the truth somewhere in between, or is someone simply wrong?'
          },
          {
            type: 'reading',
            title: 'Synthesizing Sources: Building Arguments from Evidence',
            text: 'Synthesis is arguably the highest-order research skill. While paraphrasing restates one source and summarizing condenses it, synthesis combines multiple sources to create something new — an argument, an insight, or a deeper understanding that no single source provides alone.\n\nMany students make the mistake of writing "source-by-source" summaries: "Smith says X. Jones says Y. Brown says Z." This is an annotated bibliography, not a synthesis. True synthesis organizes ideas by theme, not by source, showing how different researchers\' findings relate to each other.\n\nCompare:\n\nSource-by-source (weak): "Smith (2022) found that social media increases anxiety in teenagers. Jones (2023) argued that social media can also provide valuable peer support. Brown (2024) suggested that the impact depends on usage patterns."\n\nSynthesized (strong): "While research has established a link between social media and adolescent anxiety (Smith, 2022), the relationship appears more nuanced than initially suggested. The benefits of online peer support (Jones, 2023) may offset negative effects, particularly when usage patterns are moderate and intentional (Brown, 2024). Together, these findings suggest that the quality of social media engagement, rather than mere quantity, may be the decisive factor."\n\nNotice how the synthesized version weaves sources together around a central argument, showing how each source contributes to a larger understanding.\n\nKey synthesis language patterns:\n\n**Agreement between sources:** "Both Smith and Jones demonstrate that..." / "This finding is corroborated by..." / "Similarly, Brown confirms that..." / "These findings converge on the conclusion that..."\n\n**Disagreement between sources:** "While Smith argues X, Jones contends Y." / "In contrast to Smith\'s findings, Brown demonstrates that..." / "These perspectives diverge significantly, with Smith claiming X and Jones maintaining Y."\n\n**Complementary findings:** "Smith\'s research on X is complemented by Jones\'s findings on Y, which together suggest..." / "Building on Smith\'s analysis, Jones extends the argument by demonstrating that..." / "While Smith examines X from a sociological perspective, Jones approaches it through an economic lens, and together they reveal..."\n\n**Your own synthesis:** "Taken together, these studies suggest..." / "The balance of evidence indicates..." / "When we consider these perspectives collectively, it becomes apparent that..." / "This body of research, viewed as a whole, points toward the conclusion that..."\n\nTriangulation — using multiple sources and methods to verify a finding — strengthens your argument. If three independent studies using different methodologies reach the same conclusion, that conclusion is far more robust than any single study alone.'
          },
          {
            type: 'text',
            content: 'Synthesis vs. Summary:\n- Summary: "Source A says X. Source B says Y."\n- Synthesis: "While Source A and B agree on X, they diverge on Y, suggesting that Z."\n\n**Synthesis language:**\nAgreement: "Both... demonstrate..." / "corroborated by..." / "These findings converge..."\nDisagreement: "While X argues... Y contends..." / "In contrast..." / "These perspectives diverge..."\nComplementary: "X is complemented by..." / "Building on..." / "Together they reveal..."\nYour analysis: "Taken together..." / "The balance of evidence indicates..." / "Viewed as a whole..."\n\n**Organize by THEME, not by SOURCE:**\n- Weak: Paragraph 1 about Smith, Paragraph 2 about Jones\n- Strong: Paragraph 1 about Theme A (citing Smith, Jones, Brown), Paragraph 2 about Theme B (citing Jones, Brown, Lee)'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible itself is a work of synthesis — four Gospels that present the life of Jesus from different perspectives, each contributing unique insights to a unified truth. Luke explicitly describes his research methodology: "I myself have carefully investigated everything from the beginning" (Luke 1:3). He synthesized multiple sources to create a comprehensive account. Proverbs 11:14 teaches: "Where there is no guidance, a people falls, but in an abundance of counselors there is safety." Just as wisdom comes from considering multiple perspectives, strong research comes from synthesizing multiple sources. This is how we approach truth — not through a single lens, but through the integrated insight of many.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is organizing a research paper by themes stronger than organizing it source by source?',
              'How do the four Gospels model the concept of synthesis — multiple perspectives contributing to a unified truth?',
              'When multiple sources disagree, how do you determine which position the evidence best supports?',
              'What does "triangulation" mean in research, and why does it strengthen arguments?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Source-by-Source to Synthesis\nRewrite this source-by-source summary as a synthesized paragraph:\n\n"Adams (2022) found that students who exercise regularly have better grades. Baker (2023) showed that physical activity improves concentration and memory. Clark (2024) argued that schools with daily physical education programs have lower dropout rates."\n\nExercise 2: Synthesis Language Practice\nConnect these sources using appropriate synthesis language:\n- Source A (Kim, 2023): "Online learning increases access to education for rural students."\n- Source B (Lee, 2023): "Online learning reduces student-teacher interaction and social development."\n- Source C (Park, 2024): "Hybrid models combining online and in-person learning show the best outcomes."\n\nWrite a synthesized paragraph that integrates all three sources around a central argument.'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Full Synthesis Paragraph\nUsing these three sources, write a 250-word synthesized paragraph about the impact of homework on student achievement:\n\nSource A: Cooper (2022) — Meta-analysis showing homework has modest positive effects on achievement in secondary school but minimal effects in primary school.\nSource B: Kohn (2023) — Argues that excessive homework increases stress without proportional learning gains.\nSource C: Trautwein (2024) — Demonstrates that homework quality (not quantity) is the strongest predictor of academic improvement.\n\nYour paragraph must: integrate all three sources, use at least three different synthesis phrases, organize by theme (not by source), and end with your own analytical conclusion.\n\nTask 2: Synthesis Map\nCreate a visual synthesis map showing how the three sources above relate to each other. Identify: where they agree, where they disagree, and what new understanding emerges from combining them.'
          },
          {
            type: 'practice',
            content: 'Task 3: Gospel Synthesis Reflection\nThe four Gospels tell the story of Jesus from different perspectives. In 150 words, explain how this is analogous to academic synthesis. How does having multiple accounts enrich understanding compared to having only one? What can academic researchers learn from this model?'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Combine information from two or three sources into a single paragraph organized by theme',
          'Use synthesis phrases like "While X argues... Y contends..." and "Both X and Y demonstrate..."',
          'Understand the difference between listing sources separately and synthesizing them together'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If two experts agree on something but a third expert disagrees, how do you write about all three in one paragraph?'
          },
          {
            type: 'reading',
            title: 'Combining Sources in Your Writing',
            text: 'When you write a research essay, you need to combine information from several sources. This is called synthesis. It means putting different ideas together to create something new.\n\nMany students write about one source at a time: "Smith says this. Jones says that. Brown says something else." This is a list, not synthesis. Instead, organize your paragraph around a topic and show how your sources relate to each other.\n\nHere is the difference:\n\nWeak (source by source): "Smith (2022) says homework helps students learn. Jones (2023) says homework causes too much stress. Brown (2024) says the type of homework matters."\n\nStrong (synthesized): "While Smith (2022) found that homework can support learning, Jones (2023) argues that it often creates unnecessary stress. Brown (2024) helps resolve this disagreement by showing that the type of homework — not the amount — is the key factor in student success."\n\nIn the synthesized version, the sources talk to each other. The paragraph tells a story about the topic, not about the sources.\n\nUseful synthesis phrases:\n- "While Smith argues X, Jones contends Y."\n- "Both Smith and Jones agree that..."\n- "Smith\'s findings are supported by Jones, who also found that..."\n- "In contrast to Smith, Jones suggests that..."\n- "Together, these studies suggest that..."\n\nWhen your sources agree, show it: "Both studies confirm that..." When they disagree, explain: "While X argues A, Y takes a different view, suggesting B." When one adds to another, connect them: "Building on Smith\'s finding, Jones shows that..."'
          },
          {
            type: 'text',
            content: 'Synthesis = combining sources by THEME, not listing them one by one.\n\n**When sources agree:** "Both X and Y demonstrate..." / "X confirms Y\'s finding that..."\n**When sources disagree:** "While X argues... Y contends..." / "In contrast to X, Y suggests..."\n**When one adds to another:** "Building on X, Y shows that..." / "Together, these studies suggest..."\n\nAlways end with YOUR analysis: "Taken together, this evidence indicates..."'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible has four Gospels that tell the story of Jesus from different perspectives. Each one adds something the others do not. Together, they give us a complete picture. This is what synthesis does — it combines different sources to create a fuller understanding. Proverbs 11:14 says: "In an abundance of counselors there is safety." Multiple perspectives lead to better understanding.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'What is the difference between listing sources one by one and synthesizing them?',
              'Why is it important to show how your sources agree or disagree with each other?',
              'How do the four Gospels show us the value of multiple perspectives?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: List to Synthesis\nRewrite this list-style paragraph as a synthesized paragraph:\n"Adams says exercise improves concentration. Baker says exercise reduces stress. Clark says exercise helps students sleep better."\n\nExercise 2: Connect the Sources\nUse a synthesis phrase to combine these two sources:\nSource A: "Reading fiction improves empathy." (Lee, 2023)\nSource B: "Reading fiction develops vocabulary and writing skills." (Park, 2024)\n\nWrite one sentence that connects both sources.'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Synthesis Paragraph\nUsing these three sources, write a synthesized paragraph about technology in education:\n- Source A: "Technology helps students learn at their own pace." (Kim, 2023)\n- Source B: "Too much screen time can hurt students\' attention spans." (Jones, 2023)\n- Source C: "The most effective approach combines technology with teacher guidance." (Lee, 2024)\n\nYour paragraph should: combine all three sources, use at least two synthesis phrases, and end with your own conclusion.\n\nTask 2: Identify the Synthesis\nWhich version is synthesized? Explain why.\nA) "Smith says X. Jones says Y. Brown says Z."\nB) "While Smith and Jones both support X, Brown challenges this view by arguing Y, suggesting that the relationship is more complex than initially thought."'
          },
          {
            type: 'practice',
            content: 'Task 3: Synthesis Phrase Practice\nFill in the blanks with synthesis phrases:\n1. "_____ Smith argues that homework is beneficial, Jones _____ that it creates too much stress."\n2. "_____ studies demonstrate that exercise improves both physical and mental health."\n3. "_____, these findings _____ that a balanced approach is most effective."'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Combine information from two sources into one paragraph about the same topic',
          'Use simple connecting phrases like "Both say..." and "While one says X, the other says Y"',
          'Understand that good research means looking at more than one source'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If two people tell you different things about the same topic, how do you figure out what is true?'
          },
          {
            type: 'reading',
            title: 'Putting Sources Together',
            text: 'When you do research, you should read more than one source. Sometimes sources agree. Sometimes they disagree. Your job is to put them together and explain what they tell you.\n\nIf two sources agree, you can write: "Both Source A and Source B say that exercise is good for health."\n\nIf two sources disagree, you can write: "While Source A says homework helps students, Source B says it causes too much stress."\n\nIf one source adds to another, write: "Source A says exercise is important. Source B adds that even a short walk can make a difference."\n\nThe important thing is to write about the TOPIC, not about each source separately. Do not write: "Source A says this. Source B says that." Instead, put them together in the same sentence or paragraph.\n\nExample:\nWeak: "Smith says reading is good. Jones says reading helps your brain."\nBetter: "Both Smith and Jones agree that reading is good. Jones adds that it specifically helps your brain develop."'
          },
          {
            type: 'text',
            content: 'Combining sources:\n\nAgree: "Both say..." / "They agree that..."\nDisagree: "While A says..., B says..."\nOne adds to another: "A says X. B adds that..."\n\nImportant: Write about the TOPIC, not source by source.'
          },
          {
            type: 'biblical-worldview',
            content: 'The Bible has four books about Jesus (Matthew, Mark, Luke, John). Each one tells the story differently, but together they give us the full picture. When we read more than one source, we get closer to the truth. Proverbs 11:14 says there is safety "in an abundance of counselors."'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why should you read more than one source about a topic?',
              'What is the difference between "Source A says this. Source B says that." and combining them together?',
              'How is reading four Gospels instead of one like reading multiple sources for research?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Combine the Sources\nPut these two sources together in ONE sentence:\n1. Source A: "Dogs are great pets." Source B: "Dogs are loyal and friendly."\n   Combined: _____\n2. Source A: "Phones help students learn." Source B: "Phones can distract students."\n   Combined: _____'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Write a Combined Paragraph\nUse these two sources to write one short paragraph (3-4 sentences):\nSource A: "Playing sports helps children stay healthy."\nSource B: "Playing sports teaches children teamwork and discipline."\n\nStart with: "Both sources agree that playing sports is important for children..."\n\nTask 2: Agree or Disagree?\nDo these sources agree or disagree? Write "agree" or "disagree."\n1. Source A: "Music helps you study." Source B: "Music improves concentration." ___\n2. Source A: "Homework is helpful." Source B: "Homework is stressful." ___'
          },
          {
            type: 'practice',
            content: 'Task 3: Fill in the Blank\nCombine these sources:\nSource A: "Breakfast helps you focus in school."\nSource B: "Students who eat breakfast get better grades."\n\n"_____ Source A and Source B _____ that breakfast is important for students. Source A says it helps focus, _____ Source B adds that it can lead to _____."\n\nWords to use: Both, agree, and, better grades'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is synthesis in academic writing?',
        options: [
          'Copying from multiple sources',
          'Summarizing each source separately',
          'Combining multiple sources to build a new argument or understanding',
          'Choosing the best source and ignoring the rest'
        ],
        correctIndex: 2
      },
      {
        question: 'What is the difference between a list of sources and a synthesis?',
        options: [
          'A list is longer than a synthesis',
          'A synthesis organizes ideas by theme and shows how sources relate to each other',
          'A list uses more academic vocabulary',
          'There is no difference'
        ],
        correctIndex: 1
      },
      {
        question: 'Which phrase best shows that two sources agree?',
        options: [
          '"In contrast to Smith, Jones argues..."',
          '"Both Smith and Jones demonstrate that..."',
          '"While Smith says X, Jones disagrees."',
          '"Smith says X. Jones says Y."'
        ],
        correctIndex: 1
      },
      {
        question: 'Which phrase best shows that two sources disagree?',
        options: [
          '"Both sources confirm that..."',
          '"Smith\'s findings are corroborated by Jones."',
          '"While Smith argues X, Jones contends Y."',
          '"Smith and Jones agree that..."'
        ],
        correctIndex: 2
      },
      {
        question: 'Why should you organize a research paragraph by theme rather than by source?',
        options: [
          'It is a rule that teachers made up',
          'It shows how ideas connect and builds a stronger argument',
          'It makes the paragraph shorter',
          'It is easier to write'
        ],
        correctIndex: 1
      },
      {
        question: 'What does "triangulation" mean in research?',
        options: [
          'Using three sources that say the same thing',
          'Drawing a triangle diagram',
          'Using multiple sources and methods to verify a finding',
          'Citing exactly three sources per paragraph'
        ],
        correctIndex: 2
      },
      {
        question: 'Which is a correctly synthesized sentence?',
        options: [
          '"Smith says exercise is good. Jones says sleep is important."',
          '"Smith (2022) studied exercise. Jones (2023) studied sleep."',
          '"While Smith highlights the role of exercise in academic success, Jones argues that sleep may be an even more significant factor."',
          '"Smith is correct and Jones is wrong."'
        ],
        correctIndex: 2
      },
      {
        question: 'The four Gospels (Matthew, Mark, Luke, John) are an example of:',
        options: [
          'Plagiarism because they tell the same story',
          'Multiple perspectives contributing to a unified understanding',
          'Contradictory accounts that cannot be trusted',
          'Secondary sources about Jesus'
        ],
        correctIndex: 1
      },
      {
        question: 'How should you end a synthesis paragraph?',
        options: [
          'With a direct quote from one source',
          'By introducing a new topic',
          'With your own analytical conclusion based on the combined evidence',
          'By repeating what each source said individually'
        ],
        correctIndex: 2
      },
      {
        question: 'According to Proverbs 11:14, why is considering multiple perspectives valuable?',
        options: [
          'Because one source is never correct',
          'Because "in an abundance of counselors there is safety"',
          'Because teachers require multiple sources',
          'Because single sources are always biased'
        ],
        correctIndex: 1
      }
    ]
  },

  // W4: Research Report (PROJECT)
  {
    unitNumber: 5,
    weekNumber: 4,
    title: 'Research Report',
    lessonType: 'PROJECT',
    vocabulary: [
      'methodology',
      'findings',
      'abstract',
      'bibliography',
      'hypothesis'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Write a 750-word research report that synthesizes at least four credible sources evaluated using the CRAAP test',
          'Structure the report with an introduction, literature review, analysis, and conclusion',
          'Demonstrate proper paraphrasing, citation, and synthesis throughout',
          'Use hedging language and reporting verbs with academic precision'
        ],
        input: [
          {
            type: 'project',
            title: 'Academic Research Report',
            prompt: 'Write a 750-word research report on one of the following topics:\n\n1. "The impact of bilingual education on cognitive development"\n2. "How does social media affect academic performance among teenagers?"\n3. "The effectiveness of technology in the classroom"\n4. A topic of your choice approved by your teacher\n\nYour report must include:\n\n**Introduction (100-150 words):** Hook, background context, and a clear research question or thesis\n\n**Literature Review / Body (400-500 words):**\n- Synthesize at least 4 credible sources (you may use real or simulated sources)\n- Organize by theme, NOT source by source\n- Use at least 5 different reporting verbs\n- Use hedging language throughout\n- Include at least 2 concession + rebuttal structures\n- Show agreement, disagreement, and complementary findings between sources\n\n**Conclusion (100-150 words):** Summarize findings, state your conclusion with appropriate hedging, and suggest areas for further research\n\n**Bibliography:** List all sources in a consistent citation format\n\nYour report will be evaluated on source quality, synthesis, academic language, hedging, structure, and proper citation.',
            rubric: [
              'Source Quality: Uses 4+ credible sources with evidence of CRAAP evaluation (15%)',
              'Synthesis: Organizes by theme, shows relationships between sources, does not list source by source (25%)',
              'Academic Language: Uses 5+ reporting verbs, appropriate hedging, concession + rebuttal (20%)',
              'Structure: Clear introduction with thesis, organized body paragraphs, and analytical conclusion (15%)',
              'Paraphrasing and Citation: All sources properly paraphrased and cited; no plagiarism (15%)',
              'Writing Quality: Clear, coherent prose with correct grammar and academic register (10%)'
            ]
          }
        ],
        processing: [],
        output: []
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Write a 500-word research report using at least three sources',
          'Organize the report with an introduction, body, and conclusion',
          'Use synthesis phrases, reporting verbs, and hedging language'
        ],
        input: [
          {
            type: 'project',
            title: 'Research Report',
            prompt: 'Write a 500-word research report on one of these topics:\n\n1. "Does homework help or hurt student learning?"\n2. "The benefits and challenges of learning a second language"\n3. "How does exercise affect school performance?"\n\nYour report must include:\n\n**Introduction (75-100 words):** Introduce your topic and state your research question\n\n**Body (300-350 words):**\n- Use at least 3 sources (you may use real or simulated sources)\n- Combine your sources using synthesis phrases (do not list them one by one)\n- Use at least 3 reporting verbs (argues, suggests, demonstrates, etc.)\n- Include hedging language (may, might, the evidence suggests, etc.)\n- Include at least 1 concession + rebuttal\n\n**Conclusion (75-100 words):** Summarize what the sources say and give your conclusion\n\n**Sources:** List your sources at the end',
            rubric: [
              'Sources: Uses 3+ sources appropriately (20%)',
              'Synthesis: Combines sources by theme, uses synthesis phrases (25%)',
              'Academic Language: Uses reporting verbs and hedging (20%)',
              'Structure: Clear introduction, body, and conclusion (20%)',
              'Citation: Sources are cited and paraphrased, not copied (15%)'
            ]
          }
        ],
        processing: [],
        output: []
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Write a 300-word report using information from two sources',
          'Organize the report with a beginning, middle, and end',
          'Use "According to..." and at least one synthesis phrase'
        ],
        input: [
          {
            type: 'project',
            title: 'My Research Report',
            prompt: 'Write a 300-word report on one of these topics:\n\n1. "Why is exercise important for students?"\n2. "How does reading help you learn?"\n3. "Why should students learn English?"\n\nYour report needs:\n\n**Beginning (50 words):** Tell the reader what your report is about\n\n**Middle (200 words):**\n- Use information from 2 sources (you may find your own or use ones your teacher gives you)\n- Use "According to..." at least twice\n- Combine your sources in at least one sentence (e.g., "Both sources say that...")\n\n**End (50 words):** Say what you learned from your research\n\n**Sources:** Write the names of your sources at the end',
            rubric: [
              'Sources: Uses 2 sources and credits them with "According to..." (25%)',
              'Combining Sources: Includes at least one sentence combining both sources (25%)',
              'Structure: Has a clear beginning, middle, and end (25%)',
              'Content: Shares relevant information about the topic (25%)'
            ]
          }
        ],
        processing: [],
        output: []
      }
    ],
    quiz: []
  },

  // ============================
  // UNIT 6: Critical Thinking in English
  // ============================
  // W1: Analyzing Arguments
  {
    unitNumber: 6,
    weekNumber: 1,
    title: 'Analyzing Arguments',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'fallacy',
      'premise',
      'claim',
      'reasoning',
      'ad hominem',
      'straw man',
      'refute',
      'contend'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Identify the components of an argument: claims, evidence, reasoning, and assumptions',
          'Recognize common logical fallacies including ad hominem, straw man, false dichotomy, and appeal to authority',
          'Use precise analytical vocabulary (assert, refute, imply, contend) to evaluate arguments',
          'Construct and deconstruct arguments using formal logical structure'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Every day, people try to convince you of something — through ads, social media, news, and conversations. How do you know when an argument is logically sound versus when it just sounds convincing?'
          },
          {
            type: 'reading',
            title: 'The Anatomy of Arguments and Logical Fallacies',
            text: 'An argument, in academic terms, is not a quarrel. It is a structured attempt to convince someone of a position through claims supported by evidence and reasoning. Understanding how arguments work — and how they fail — is one of the most valuable intellectual skills you can develop.\n\nEvery argument has three core components:\n\n**Claims** are the positions being defended. A thesis statement is a claim. "Social media harms teenagers" is a claim. Claims can be factual ("The Earth orbits the Sun"), evaluative ("Shakespeare is the greatest English writer"), or policy-based ("Governments should regulate social media").\n\n**Evidence** supports the claims. Evidence includes data, statistics, expert testimony, research findings, examples, and logical reasoning. Strong evidence is relevant, sufficient, and from credible sources. Weak evidence is anecdotal, outdated, or from biased sources.\n\n**Reasoning** connects the evidence to the claims. This is often the weakest link in arguments. Someone might present valid evidence but draw an unwarranted conclusion from it. For example: "Crime rates dropped after we installed security cameras, so security cameras prevent crime." The evidence (crime dropped) may be true, but the reasoning assumes causation from correlation.\n\nLogical fallacies are errors in reasoning that undermine an argument. Recognizing them is essential for critical thinking:\n\n**Ad hominem** ("against the person"): Attacking the person making the argument rather than the argument itself. "You cannot trust Dr. Smith\'s climate research because she drives a large car." The doctor\'s driving habits are irrelevant to her research quality.\n\n**Straw man:** Misrepresenting someone\'s argument to make it easier to attack. Person A says "We should have more vegetarian options in the cafeteria." Person B responds "Person A wants to force everyone to become vegetarian!" Person B has distorted Person A\'s actual position.\n\n**False dichotomy** (false dilemma): Presenting only two options when more exist. "You either support this policy completely, or you do not care about children." There are many positions between full support and indifference.\n\n**Appeal to authority:** Using an authority figure\'s endorsement as proof, especially when the authority is not an expert in the relevant field. "This famous actor says this diet works, so it must be effective." An actor\'s endorsement does not constitute medical evidence.\n\n**Slippery slope:** Arguing that one action will inevitably lead to extreme consequences without evidence for the chain of events. "If we allow students to use calculators, they will never learn math, and eventually no one will be able to do basic arithmetic."\n\n**False cognate alert:** The French word "argument" often means "quarrel" or "row." In English academic contexts, "argument" means a reasoned position — it is neutral and intellectual, not emotional. Similarly, "critical" in English academic usage means "analytical and evaluative," not "negative" (as "critique" can imply in French).'
          },
          {
            type: 'text',
            content: 'Components of an argument:\n- **Claim:** The position being defended\n- **Evidence:** Data, research, examples supporting the claim\n- **Reasoning:** The logical connection between evidence and claim\n- **Assumptions:** Unstated beliefs underlying the argument\n\nCommon fallacies:\n- **Ad hominem:** Attacking the person, not the argument\n- **Straw man:** Misrepresenting the opposing argument\n- **False dichotomy:** Presenting only two options when more exist\n- **Appeal to authority:** Using unqualified endorsements as proof\n- **Slippery slope:** Claiming extreme consequences without evidence\n\nAnalytical vocabulary:\n- **Assert/Assertion:** State confidently (but not necessarily with proof)\n- **Refute/Refutation:** Disprove with evidence\n- **Imply/Implication:** Suggest indirectly\n- **Contend:** Argue or claim\n- **Premise:** A starting assumption in a logical argument\n- **Fallacy:** An error in reasoning'
          },
          {
            type: 'biblical-worldview',
            content: 'God calls us to think critically and reason well. Isaiah 1:18 says: "Come now, let us reason together, says the LORD." The ability to analyze arguments is part of the intellectual stewardship God expects. First Thessalonians 5:21 commands us to "test everything; hold fast what is good" — this means evaluating claims rather than accepting them uncritically. Acts 17:11 praises the Bereans because "they received the word with all eagerness, examining the Scriptures daily to see if these things were so." They were critical thinkers who verified claims against reliable sources. As Christians, we are called to pursue truth with both faith and reason, rejecting logical fallacies and embracing sound argumentation.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is identifying the reasoning (not just the claim and evidence) the most important part of analyzing an argument?',
              'How does Acts 17:11 (the Bereans "examining the Scriptures daily") model critical thinking for Christians?',
              'Why is the ad hominem fallacy so common in political debates? How can recognizing it improve public discourse?',
              'The French academic tradition values assertive argumentation. How does this relate to the English emphasis on acknowledging fallacies and limitations?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Identify the Fallacy\nName the logical fallacy in each example:\n1. "Professor Jones\'s research on climate change is unreliable because he once made a mistake in a different study." ___\n2. "Either you agree with our approach to education reform, or you want children to fail." ___\n3. "This famous athlete drinks this protein shake, so it must be the best one." ___\n4. "My opponent says we should reduce military spending. So he wants to leave our country completely defenseless!" ___\n5. "If we allow students to retake one test, soon they will want to retake every test, and eventually grades will become meaningless." ___\n\nExercise 2: Argument Anatomy\nFor this argument, identify the claim, evidence, reasoning, and any assumptions:\n"Schools should start later because research shows that teenagers\' brains do not fully wake up until 10 AM. Students who start school at 7:30 AM are essentially being asked to learn while half asleep, which explains why first-period grades are consistently lower than afternoon grades."'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Argument Construction and Deconstruction\nPart A: Construct a logically sound argument (200 words) for or against this claim: "Standardized testing should be eliminated from schools." Include a clear claim, at least three pieces of evidence, explicit reasoning connecting each piece of evidence to your claim, and acknowledgment of one counterargument.\n\nPart B: Then deliberately write a 100-word version of the same argument that contains at least two logical fallacies. Label each fallacy.\n\nTask 2: Fallacy in the Wild\nFind (or create) a social media post, advertisement, or news headline that contains a logical fallacy. Write a 150-word analysis identifying the fallacy, explaining why it is fallacious, and rewriting the claim in a logically sound way.'
          },
          {
            type: 'practice',
            content: 'Task 3: False Cognate Awareness\nExplain the difference between the French and English meanings of these words, and write an English sentence using each correctly:\n1. "argument" (French: quarrel / English: reasoned position)\n2. "critical" (French: negative / English: analytical)\n3. "evidence" (French: obvious / English: proof or data)\n4. "eventually" (French: possibly / English: in the end)'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Identify the claim, evidence, and reasoning in an argument',
          'Recognize three common logical fallacies: ad hominem, straw man, and false dichotomy',
          'Use vocabulary like "claim," "evidence," "fallacy," and "reasoning" to discuss arguments'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Have you ever seen an argument that sounded convincing at first but did not actually make sense when you thought about it?'
          },
          {
            type: 'reading',
            title: 'How Arguments Work (and Fail)',
            text: 'In academic English, an "argument" is not a fight. It means a claim supported by evidence and reasoning. Learning to analyze arguments helps you think more clearly and write better essays.\n\nEvery argument has three parts:\n- **Claim:** What the person is trying to prove ("Schools should start later.")\n- **Evidence:** The facts or data supporting the claim ("Studies show teenagers learn better after 9 AM.")\n- **Reasoning:** The logical connection ("Because their brains are not fully awake earlier, starting later would improve learning.")\n\nSometimes arguments look strong but have hidden problems called fallacies. Here are three common ones:\n\n**Ad hominem** = Attacking the person instead of the argument.\nExample: "You cannot argue for healthy eating — I saw you eating pizza yesterday!" (What someone eats does not affect whether their argument is correct.)\n\n**Straw man** = Changing someone\'s argument to make it easier to attack.\nExample: Maria says "We should have more recycling bins." Tom responds "Maria wants to ban all plastic!" (Maria never said that.)\n\n**False dichotomy** = Pretending there are only two choices.\nExample: "You either love math or you hate school." (There are many positions in between.)\n\nWhen you analyze an argument, ask yourself:\n1. What is the claim?\n2. What evidence is given?\n3. Does the evidence actually support the claim?\n4. Are there any fallacies?\n\n**For French speakers:** "Argument" in English = reasoned position (not a quarrel). "Critical" = analytical (not negative). These are important false cognates!'
          },
          {
            type: 'text',
            content: 'Parts of an argument:\n- Claim = what they are trying to prove\n- Evidence = facts, data, or examples\n- Reasoning = how the evidence connects to the claim\n\nCommon fallacies:\n- Ad hominem = attacking the person, not the argument\n- Straw man = changing someone\'s argument unfairly\n- False dichotomy = pretending there are only 2 choices\n\nFalse cognates: argument ≠ quarrel, critical ≠ negative'
          },
          {
            type: 'biblical-worldview',
            content: 'Isaiah 1:18 says: "Come now, let us reason together." God invites us to think carefully. Acts 17:11 praises the Bereans because they checked everything they heard against Scripture. Being a critical thinker is not being negative — it means testing ideas to find the truth. First Thessalonians 5:21 says: "Test everything; hold fast what is good."'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'What is the difference between an "argument" in English academic writing and an "argument" meaning a fight?',
              'Why is attacking a person (ad hominem) not a valid way to disprove their argument?',
              'What does "test everything" (1 Thessalonians 5:21) look like in everyday life?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Name the Fallacy\n1. "You failed math, so your opinion about the school budget does not count." ___\n2. "Either you support this plan, or you do not care about the environment." ___\n3. "She wants shorter school days. So she wants students to be uneducated!" ___\n\nExercise 2: Find the Parts\nIdentify the claim, evidence, and reasoning:\n"Students should have more recess because research shows that physical activity improves concentration, which means they would learn better in their afternoon classes."'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Write an Argument\nWrite a short argument (100 words) for or against: "Students should be allowed to use phones in class." Include:\n- A clear claim\n- At least 2 pieces of evidence\n- Reasoning that connects the evidence to the claim\n\nTask 2: Fix the Fallacy\nEach of these arguments has a fallacy. Identify it and rewrite the argument correctly:\n1. "My coach says this math method is the best, so it must be." (Fallacy: ___ Fix: ___)\n2. "If we let students choose their own books, they will only read comics, and eventually they will not be able to read at all." (Fallacy: ___ Fix: ___)'
          },
          {
            type: 'practice',
            content: 'Task 3: Analyze a Real Argument\nFind an argument in a news article, advertisement, or social media post. Write 75 words identifying:\n- The claim\n- The evidence (if any)\n- Whether the reasoning is strong or weak\n- Whether it contains a fallacy'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Understand that an argument in English means a reason + evidence, not a fight',
          'Identify the main claim and evidence in a simple argument',
          'Recognize when someone attacks the person instead of the idea (ad hominem)'
        ],
        input: [
          {
            type: 'wonder',
            content: 'When someone says "trust me," how do you decide if you should? What kind of proof would you need?'
          },
          {
            type: 'reading',
            title: 'What Makes a Good Argument?',
            text: 'In English class, an "argument" does not mean a fight. It means giving a reason for what you believe, with proof.\n\nA good argument has:\n- A **claim**: what you believe ("Reading is important.")\n- **Evidence**: proof or reasons ("Studies show readers do better in school.")\n\nA bad argument attacks the person instead of the idea. This is called "ad hominem."\n- Bad: "You are bad at sports, so your idea about homework is wrong." (What does sports have to do with homework?)\n- Good: "I disagree because research shows homework helps students practice."\n\nAnother trick is making someone\'s argument sound extreme (straw man):\n- Real argument: "We need more healthy food at school."\n- Straw man: "She wants to ban all food that tastes good!"\n\nTo check if an argument is good, ask:\n1. What is the claim?\n2. Is there evidence?\n3. Does the evidence make sense?\n\n**For French speakers:** In French, "argument" often means a fight. In English, it means a reason with evidence. They are different!'
          },
          {
            type: 'text',
            content: 'Good argument = Claim + Evidence\n\nBad argument tricks:\n- Ad hominem = attacking the person, not the idea\n- Straw man = making someone\'s idea sound extreme\n\nTo check an argument:\n1. What is the claim?\n2. Is there evidence?\n3. Does the evidence make sense?'
          },
          {
            type: 'biblical-worldview',
            content: 'God wants us to think carefully. The Bible says "test everything" (1 Thessalonians 5:21). This means we should not just believe everything we hear — we should check if it is true. Good thinking is a gift from God.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'In English, what does "argument" mean? How is it different from a fight?',
              'Why is it unfair to attack a person instead of their idea?',
              'What two things does a good argument need?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Good Argument or Bad?\nWrite G (good) or B (bad) for each argument:\n1. "We should have more recess because exercise helps kids focus." ___\n2. "You are too young to have an opinion about this." ___\n3. "Phones should be banned because they distract students. Studies show test scores drop when phones are present." ___\n4. "He wants to change the lunch menu. He probably hates all food!" ___'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Build an Argument\nWrite a simple argument (3-4 sentences) for: "Students should drink more water at school."\n- Start with your claim\n- Give 1-2 reasons (evidence)\n\nTask 2: Find the Problem\nWhat is wrong with this argument? Write your answer:\n"You should not listen to Maria\'s science presentation because she got a C in math last year."'
          },
          {
            type: 'practice',
            content: 'Task 3: Claim or Evidence?\nLabel each sentence C (claim) or E (evidence):\n1. "Students should wear uniforms." ___\n2. "Studies show that uniforms reduce bullying by 30%." ___\n3. "Schools with uniforms have fewer discipline problems." ___\n4. "Uniforms are better for learning." ___'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'In English academic writing, what does "argument" mean?',
        options: [
          'A fight or quarrel between people',
          'A loud disagreement',
          'A reasoned position supported by evidence',
          'A personal opinion without any proof'
        ],
        correctIndex: 2
      },
      {
        question: 'What are the three main components of an argument?',
        options: [
          'Title, body, and conclusion',
          'Claim, evidence, and reasoning',
          'Introduction, examples, and summary',
          'Opinion, feeling, and belief'
        ],
        correctIndex: 1
      },
      {
        question: 'What is an "ad hominem" fallacy?',
        options: [
          'Presenting only two options',
          'Misrepresenting someone\'s argument',
          'Attacking the person instead of their argument',
          'Using false statistics'
        ],
        correctIndex: 2
      },
      {
        question: 'What is a "straw man" fallacy?',
        options: [
          'Building an argument from straw (weak evidence)',
          'Misrepresenting someone\'s argument to make it easier to attack',
          'Using a scarecrow as an example',
          'Refusing to listen to the other side'
        ],
        correctIndex: 1
      },
      {
        question: 'What is a "false dichotomy"?',
        options: [
          'A true statement presented as false',
          'An argument with no evidence',
          'Presenting only two options when more exist',
          'A dictionary with errors'
        ],
        correctIndex: 2
      },
      {
        question: 'Which word means "to disprove with evidence"?',
        options: [
          'Assert',
          'Imply',
          'Contend',
          'Refute'
        ],
        correctIndex: 3
      },
      {
        question: 'The French word "critical" often implies negativity. In English academic contexts, "critical" means:',
        options: [
          'Negative and harsh',
          'Unimportant',
          'Analytical and evaluative',
          'Simple and basic'
        ],
        correctIndex: 2
      },
      {
        question: 'Which Bible verse encourages us to "test everything"?',
        options: [
          'Genesis 1:1',
          'John 3:16',
          '1 Thessalonians 5:21',
          'Psalm 23:1'
        ],
        correctIndex: 2
      },
      {
        question: 'Why were the Bereans in Acts 17:11 praised?',
        options: [
          'They believed everything immediately',
          'They were the richest people in the region',
          'They examined the Scriptures to verify what they were told',
          'They refused to listen to Paul'
        ],
        correctIndex: 2
      },
      {
        question: 'Which is an example of the "appeal to authority" fallacy?',
        options: [
          '"This peer-reviewed study demonstrates that..."',
          '"A famous singer endorses this medicine, so it must work."',
          '"Three independent studies confirm this finding."',
          '"Dr. Chen, a leading expert in the field, argues that..."'
        ],
        correctIndex: 1
      }
    ]
  },

  // W2: Identifying Bias and Perspective
  {
    unitNumber: 6,
    weekNumber: 2,
    title: 'Identifying Bias and Perspective',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'bias',
      'objectivity',
      'loaded language',
      'propaganda',
      'subjectivity',
      'rhetoric',
      'framing',
      'manipulation'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Identify bias in texts and media through analysis of language, framing, and omission',
          'Distinguish between loaded language (emotional manipulation) and evidence-based persuasion',
          'Analyze how the same event can be framed differently depending on perspective and intent',
          'Evaluate claims of objectivity and recognize that all texts have a perspective'
        ],
        input: [
          {
            type: 'wonder',
            content: 'When two news outlets report the same event but you come away with completely different impressions, what is happening? Is one lying, or is something more subtle at work?'
          },
          {
            type: 'reading',
            title: 'Bias, Framing, and the Illusion of Objectivity',
            text: 'Every text has a perspective. This is not necessarily a problem — a medical researcher studying cancer has a perspective (they believe cancer should be cured), and this does not make their research invalid. The problem arises when perspective is hidden, when bias masquerades as objectivity, or when language is used to manipulate rather than inform.\n\nBias in texts can be detected through several indicators:\n\n**Loaded language** uses emotionally charged words to influence the reader\'s response. Compare: "freedom fighters" versus "terrorists" — both may describe the same group, but the word choice frames them entirely differently. "Tax relief" implies taxes are a burden; "tax contribution" implies they are a civic duty. The facts may be identical, but the language shapes interpretation.\n\n**Framing** determines what information is included and excluded, and how it is presented. A news story about immigration might frame it as "a wave of migrants overwhelming services" or "families seeking safety and a better life." Both may contain true facts, but the frame — what is emphasized and what is omitted — shapes the narrative profoundly.\n\n**Selection and omission** is one of the most powerful forms of bias. A chocolate company might truthfully report that "dark chocolate contains antioxidants" while omitting that it is also high in sugar and fat. The information is accurate but incomplete, creating a misleading impression.\n\n**Source bias** considers who benefits from the information. A study on sugar funded by a soft drink company, even if methodologically sound, should be viewed with appropriate skepticism about its conclusions.\n\n**Emotional appeals versus logical evidence:** Propaganda relies heavily on emotional manipulation — fear, anger, patriotism, guilt. Academic writing aims to persuade through evidence and reasoning. Learning to distinguish between these two modes of persuasion is essential.\n\nThe concept of pure objectivity is itself worthy of critical examination. Every writer makes choices about what to include, what to emphasize, and what language to use. These choices inevitably reflect a perspective. The goal is not to find perfectly objective sources (which may not exist) but to be aware of each source\'s perspective and to consult multiple sources with different viewpoints.\n\nMedia literacy in the digital age requires heightened awareness of bias. Social media algorithms create "echo chambers" that reinforce existing beliefs. Headlines are designed to provoke emotional reactions (clickbait). Images can be taken out of context. Being a critical media consumer means actively seeking diverse perspectives and questioning your own emotional reactions to information.'
          },
          {
            type: 'text',
            content: 'Types of bias to watch for:\n\n**Loaded language:** Emotionally charged words ("freedom fighters" vs. "terrorists")\n**Framing:** How information is presented ("wave of migrants" vs. "families seeking safety")\n**Selection and omission:** What is included and what is left out\n**Source bias:** Who benefits from this information?\n**Emotional appeals:** Fear, anger, guilt used instead of evidence\n\nAnalyzing bias:\n1. Who created this text? What is their background/motivation?\n2. What language choices reveal a perspective?\n3. What information is included? What might be missing?\n4. How would someone with an opposing view present the same facts?\n5. What emotional response does this text try to create?\n\n**Key principle:** All texts have a perspective. The goal is not to find "perfectly objective" sources but to be aware of each source\'s perspective and consult multiple viewpoints.'
          },
          {
            type: 'biblical-worldview',
            content: 'Scripture speaks powerfully about the importance of discernment. Proverbs 14:15 warns: "The simple believes everything, but the prudent gives thought to his steps." In an age of information overload and media manipulation, this wisdom is more relevant than ever. Ephesians 4:14 calls us to maturity so "we may no longer be children, tossed to and fro by the waves and carried about by every wind of doctrine, by human cunning, by craftiness in deceitful schemes." Being able to identify bias is a form of the discernment God calls us to practice. Jesus Himself said: "You will know the truth, and the truth will set you free" (John 8:32). Pursuing truth requires the courage to question, the humility to recognize our own biases, and the diligence to seek multiple perspectives.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is the concept of "pure objectivity" considered problematic in modern critical thinking? Does this mean truth is relative?',
              'How does Proverbs 14:15 ("the simple believes everything") apply to how we consume media and information today?',
              'How can loaded language about the same event create completely different impressions? What responsibility do writers have in their word choices?',
              'What is an "echo chamber," and how does it relate to the biblical call to seek wisdom from multiple counselors (Proverbs 11:14)?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Loaded Language Detection\nIdentify the loaded language in each pair and explain how it shapes perception:\n1. "Pro-life activists" vs. "anti-choice activists"\n2. "Enhanced interrogation techniques" vs. "torture"\n3. "Undocumented workers" vs. "illegal aliens"\n4. "Economic migrants" vs. "people fleeing poverty"\n5. "Government spending" vs. "government investment"\n\nExercise 2: Framing Analysis\nThe same event: "City council approves new housing development on green space."\nRewrite this headline from:\n- A real estate developer\'s perspective\n- An environmental organization\'s perspective\n- A family looking for affordable housing\n- A local resident concerned about traffic\n\nExplain how each frame changes the reader\'s emotional response.'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Bias Analysis Essay\nFind two articles or reports about the same current event from different sources. Write a 300-word analysis comparing:\n- What loaded language each source uses\n- What information each includes and omits\n- What perspective or bias each reveals\n- How framing shapes the reader\'s impression\nConclude with your assessment of which source is more balanced and why.\n\nTask 2: Propaganda Technique Identification\nCreate a fictional advertisement for a product (a phone, a school, a food item). Include at least three bias techniques: loaded language, emotional appeal, and selection/omission. Then write a 100-word analysis revealing the techniques you used.'
          },
          {
            type: 'practice',
            content: 'Task 3: Self-Reflection on Bias\nWrite 200 words reflecting on your own potential biases. Consider:\n- What sources do you typically consume?\n- Do you tend to read sources that confirm your existing beliefs?\n- How might your cultural background (Haitian, French-speaking, Christian) shape how you interpret certain topics?\n- What steps can you take to be a more balanced, critical consumer of information?'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Identify loaded language (emotionally charged words) in texts and media',
          'Recognize how the same event can be described differently depending on perspective',
          'Distinguish between emotional persuasion and evidence-based reasoning'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Why do two different news channels sometimes tell completely different stories about the same event?'
          },
          {
            type: 'reading',
            title: 'Spotting Bias in What You Read',
            text: 'Bias means leaning toward one side. Everyone has some bias, and that is natural. But when writers use bias to trick you instead of inform you, you need to be able to spot it.\n\nThe most common way bias appears is through loaded language — words that are chosen to make you feel a certain way. Compare:\n- "The mayor slashed the education budget." (sounds bad — "slashed" is violent)\n- "The mayor reduced the education budget." (sounds neutral)\n- "The mayor streamlined the education budget." (sounds positive)\n\nAll three describe the same action, but the word choice creates a different emotional response.\n\nAnother type of bias is framing — how information is presented. A story about a protest might focus on "violence and destruction" or on "citizens exercising their rights." Both might be true, but each frame tells a different story.\n\nBias also comes from what is NOT said. If a report about a medicine only talks about its benefits and never mentions side effects, that is bias through omission.\n\nTo spot bias, ask:\n1. What emotional words are used? Could neutral words replace them?\n2. What information might be missing?\n3. Who wrote this, and what might their motivation be?\n4. How would the other side describe this?\n\n**For French speakers:** "Critique" in French can mean negative criticism. In English, "critical thinking" means analyzing carefully — it is positive and important, not negative.'
          },
          {
            type: 'text',
            content: 'Types of bias:\n- **Loaded language:** Words chosen to make you feel a certain way\n- **Framing:** How information is presented and emphasized\n- **Omission:** Leaving out important information\n\nSpot bias by asking:\n1. What emotional words are used?\n2. What information might be missing?\n3. Who wrote this and why?\n4. How would the other side describe this?'
          },
          {
            type: 'biblical-worldview',
            content: 'Proverbs 14:15 says: "The simple believes everything, but the prudent gives thought to his steps." God wants us to think carefully about what we read and hear, not just believe everything. Being able to spot bias is part of being wise. Jesus said: "You will know the truth, and the truth will set you free" (John 8:32).'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'How can changing one word in a sentence change the reader\'s emotional response?',
              'Why is it important to ask "What information might be missing?" when reading a text?',
              'What does "The simple believes everything" (Proverbs 14:15) mean for how we read the news?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Spot the Loaded Language\nUnderline the loaded words and rewrite each sentence in neutral language:\n1. "The politician attacked the proposal with outrageous claims."\n2. "Brave volunteers heroically rescued the abandoned animals."\n3. "The company ruthlessly eliminated hundreds of jobs."\n\nExercise 2: Two Perspectives\nWrite two headlines for this event: "School adds 30 minutes to the school day."\n- Headline A (positive framing): ___\n- Headline B (negative framing): ___'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Bias Detective\nRead these two descriptions of the same event and identify the bias in each:\n\nVersion A: "Angry protesters blocked traffic and disrupted businesses, causing chaos across the city."\nVersion B: "Determined citizens peacefully marched through the streets, demanding justice and reform."\n\nWrite 100 words explaining: What loaded language does each use? What might each be omitting? Which is more balanced?\n\nTask 2: Neutral Rewrite\nRewrite the following biased paragraph in neutral, balanced language:\n"The reckless decision to allow students to use phones in class has predictably led to a disaster. Students are addicted to their screens and completely ignore their brilliant teachers. Anyone who supports this policy clearly does not care about education."'
          },
          {
            type: 'practice',
            content: 'Task 3: Emotional vs. Logical\nLabel each sentence as E (emotional appeal) or L (logical/evidence-based):\n1. "Studies show that reading 20 minutes daily improves vocabulary by 30%." ___\n2. "Every loving parent would support this program!" ___\n3. "Research indicates that exercise reduces stress hormones." ___\n4. "Are you going to stand by while children suffer?" ___'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Understand that words can be chosen to make you feel a certain way (loaded language)',
          'Recognize that the same event can be described in positive or negative ways',
          'Ask "Who wrote this and why?" to check for bias'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If someone is trying to sell you something, do they tell you the bad things about the product? Why not?'
          },
          {
            type: 'reading',
            title: 'Words Can Trick You',
            text: 'Did you know that the words people choose can change how you feel about something? This is called loaded language.\n\nCompare these:\n- "The dog is big." (neutral)\n- "The dog is massive and terrifying." (scary!)\n- "The dog is large and gentle." (friendly!)\n\nSame dog, different words, different feelings!\n\nThis happens in the news too. Imagine a new building is being built:\n- "Exciting new development brings jobs to the area!"\n- "Massive construction project destroys local park."\n\nSame event, but the words make you feel differently about it.\n\nBias means leaning toward one side. When someone writes with bias, they want you to think or feel a certain way. To check for bias, ask:\n1. What words make me feel strong emotions?\n2. Who wrote this?\n3. Are they trying to teach me, or sell me something?\n\n**For French speakers:** "Critical" in English academic settings means "thinking carefully." It does NOT mean being negative. Critical thinking is good!'
          },
          {
            type: 'text',
            content: 'Loaded language = words chosen to make you feel a certain way\nBias = leaning toward one side\n\nTo check for bias, ask:\n1. What words make me feel emotions?\n2. Who wrote this?\n3. Are they trying to teach or sell?'
          },
          {
            type: 'biblical-worldview',
            content: 'Proverbs 14:15 says: "The simple believes everything, but the prudent gives thought to his steps." God wants us to think carefully about what we read. We should not just believe everything — we should ask good questions. This is called wisdom.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'How can changing one word make something sound positive or negative?',
              'Why is it important to ask "Who wrote this?" before believing it?',
              'Can you think of a time when words were used to make you feel a strong emotion?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Positive or Negative?\nAre these words positive (P), negative (N), or neutral (O)?\n1. "destroy" ___\n2. "build" ___\n3. "change" ___\n4. "attack" ___\n5. "create" ___\n6. "waste" ___'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Two Descriptions\nDescribe this event in two ways — one positive and one negative:\nEvent: "The school cafeteria changes its menu."\nPositive: _____\nNegative: _____\n\nTask 2: Spot the Bias\nWhat is the bias in this sentence? Why?\n"Only an irresponsible person would disagree with this amazing plan."'
          },
          {
            type: 'practice',
            content: 'Task 3: Three Questions\nRead this sentence and answer the three bias questions:\n"Our incredible new phone is the best ever made! You NEED it!"\n1. What words make you feel emotions? ___\n2. Who probably wrote this? ___\n3. Are they trying to teach you or sell you something? ___'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is "loaded language"?',
        options: [
          'Language that is very long and complicated',
          'Words chosen to create an emotional response in the reader',
          'Words from a foreign language mixed into English',
          'Technical vocabulary used by experts'
        ],
        correctIndex: 1
      },
      {
        question: 'What is "framing" in media?',
        options: [
          'Putting a picture in a frame',
          'How information is presented and emphasized to shape interpretation',
          'The structure of a sentence',
          'The title of an article'
        ],
        correctIndex: 1
      },
      {
        question: 'Which pair shows how loaded language can frame the same person differently?',
        options: [
          '"Teacher" vs. "professor"',
          '"Freedom fighter" vs. "terrorist"',
          '"Doctor" vs. "physician"',
          '"Author" vs. "writer"'
        ],
        correctIndex: 1
      },
      {
        question: 'What is "bias through omission"?',
        options: [
          'Writing a very short article',
          'Leaving out important information that would change the reader\'s understanding',
          'Using too many big words',
          'Forgetting to add your name to your work'
        ],
        correctIndex: 1
      },
      {
        question: 'Which question is most useful for detecting bias?',
        options: [
          '"How long is this article?"',
          '"What emotional words are used, and what information might be missing?"',
          '"Does this article have pictures?"',
          '"Is this article published online or in print?"'
        ],
        correctIndex: 1
      },
      {
        question: 'What is the difference between an emotional appeal and evidence-based persuasion?',
        options: [
          'Emotional appeals are always wrong; evidence is always right',
          'Emotional appeals try to make you feel something; evidence-based persuasion uses facts and data',
          'Evidence is boring; emotions are interesting',
          'There is no difference between them'
        ],
        correctIndex: 1
      },
      {
        question: 'In English, "critical thinking" means:',
        options: [
          'Thinking negatively about everything',
          'Criticizing other people\'s ideas',
          'Analyzing and evaluating information carefully',
          'Finding mistakes in every text'
        ],
        correctIndex: 2
      },
      {
        question: 'Why might a company\'s website about its own product be biased?',
        options: [
          'Company websites are always wrong',
          'The company has a financial motivation to present their product favorably',
          'Companies do not know about their own products',
          'Company websites never contain facts'
        ],
        correctIndex: 1
      },
      {
        question: 'According to Proverbs 14:15, what does "the prudent" person do?',
        options: [
          'Believes everything immediately',
          'Gives thought to their steps and thinks carefully',
          'Avoids reading anything',
          'Only trusts one source'
        ],
        correctIndex: 1
      },
      {
        question: 'What does Jesus mean in John 8:32 when He says "the truth will set you free"?',
        options: [
          'You should believe whatever makes you feel free',
          'Truth does not matter as long as you are happy',
          'Knowing and pursuing truth leads to genuine freedom',
          'Freedom means never questioning anything'
        ],
        correctIndex: 2
      }
    ]
  },

  // W3: Logical Reasoning and Problem-Solving
  {
    unitNumber: 6,
    weekNumber: 3,
    title: 'Logical Reasoning and Problem-Solving',
    lessonType: 'INSTRUCTION',
    vocabulary: [
      'causation',
      'correlation',
      'conditional',
      'hypothesis',
      'inference',
      'deduction',
      'induction',
      'counterfactual'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Distinguish between cause and effect, correlation and causation, and apply these concepts to real-world arguments',
          'Use compare/contrast structures and conditional language (including third conditional) to express complex reasoning',
          'Apply deductive and inductive reasoning to analyze problems and evaluate solutions',
          'Express counterfactual reasoning using third conditional structures accurately'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If ice cream sales and drowning rates both increase in summer, does ice cream cause drowning? How do we untangle what causes what from what merely happens together?'
          },
          {
            type: 'reading',
            title: 'Logical Reasoning: Cause, Correlation, and Conditional Thinking',
            text: 'Logical reasoning is the backbone of critical thinking. It enables us to move from observations to conclusions, to evaluate arguments, and to solve problems systematically. Three key reasoning concepts are essential for academic English.\n\n**Cause and Effect vs. Correlation**\n\nOne of the most common reasoning errors is confusing correlation (two things happen together) with causation (one thing causes the other). Ice cream sales and drowning rates both increase in summer — but ice cream does not cause drowning. A third factor (hot weather) causes both. This is called a confounding variable.\n\nCause-and-effect language requires precision:\n- "X causes Y" / "X leads to Y" / "X results in Y" (direct causation)\n- "X contributes to Y" / "X is associated with Y" (correlation or partial cause)\n- "X correlates with Y, but this does not necessarily imply causation" (acknowledging the distinction)\n\nIn academic writing, always hedge cause-and-effect claims unless the causal mechanism is well-established: "The data suggests that X may contribute to Y" rather than "X causes Y."\n\n**Compare and Contrast Reasoning**\n\nComparing and contrasting allows us to analyze similarities and differences systematically:\n- Comparison: "Similarly... / Likewise... / In the same way... / Both X and Y..."\n- Contrast: "However... / In contrast... / On the other hand... / While X..., Y... / Whereas..."\n- Concession: "Although X shares similarities with Y, they differ fundamentally in..."\n\nStrong compare/contrast reasoning goes beyond listing similarities and differences — it analyzes WHY the similarities or differences matter.\n\n**Conditional and Counterfactual Reasoning**\n\nConditional reasoning expresses "if-then" relationships:\n- First conditional (real possibility): "If we invest in education, employment rates will improve."\n- Second conditional (hypothetical): "If every student had a laptop, learning outcomes would improve."\n- Third conditional (counterfactual — past events that did not happen): "If the government had invested in renewable energy earlier, pollution levels would have been lower today."\n\nThe third conditional is particularly important for academic analysis because it allows us to reason about historical alternatives and missed opportunities. Its structure is: "If + past perfect, ... would have + past participle."\n\n**Deductive vs. Inductive Reasoning**\n\nDeductive reasoning moves from general principles to specific conclusions: "All mammals are warm-blooded. Dolphins are mammals. Therefore, dolphins are warm-blooded." If the premises are true, the conclusion must be true.\n\nInductive reasoning moves from specific observations to general conclusions: "Every swan I have seen is white. Therefore, all swans are probably white." Inductive conclusions are probable, not certain (black swans exist!).\n\nAcademic research typically uses inductive reasoning (gathering evidence to form conclusions), while mathematical and logical proofs use deductive reasoning. Understanding both is essential for evaluating the strength of different types of arguments.'
          },
          {
            type: 'text',
            content: 'Key reasoning concepts:\n\n**Causation vs. Correlation:**\n- Causation: X directly causes Y\n- Correlation: X and Y happen together but one may not cause the other\n- Confounding variable: a hidden third factor causing both\n\n**Conditional structures:**\n- 1st conditional (real): "If + present, will + base form"\n- 2nd conditional (hypothetical): "If + past, would + base form"\n- 3rd conditional (counterfactual): "If + past perfect, would have + past participle"\n\n**Deductive vs. Inductive:**\n- Deductive: general → specific (certain conclusion)\n- Inductive: specific → general (probable conclusion)\n\n**Compare/Contrast language:**\nSimilar: similarly, likewise, both, in the same way\nDifferent: however, in contrast, whereas, while, on the other hand'
          },
          {
            type: 'biblical-worldview',
            content: 'God has created an orderly universe governed by cause and effect (Genesis 8:22: "While the earth remains, seedtime and harvest, cold and heat, summer and winter, day and night, shall not cease"). Logical reasoning is a tool for understanding the order God has placed in creation. Proverbs 25:2 says: "It is the glory of God to conceal things, but the glory of kings is to search things out." Critical thinking and logical reasoning are part of the human calling to "search out" the wisdom embedded in God\'s world. When we reason carefully — distinguishing cause from correlation, testing our assumptions, and considering alternative explanations — we exercise the intellectual stewardship God has entrusted to us.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is the distinction between correlation and causation one of the most important concepts in academic reasoning? Give an example from everyday life.',
              'How does the third conditional help us analyze history? What can counterfactual reasoning teach us about past decisions?',
              'How does Proverbs 25:2 ("the glory of kings is to search things out") relate to the practice of logical reasoning?',
              'When is deductive reasoning more useful than inductive reasoning, and vice versa?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Causation vs. Correlation\nFor each statement, identify whether it describes causation (C) or correlation (CO), and explain your reasoning:\n1. "Countries with more chocolate consumption have more Nobel Prize winners."\n2. "Smoking damages lung tissue, leading to increased cancer risk."\n3. "Students who eat breakfast tend to have higher test scores."\n4. "Lack of sleep impairs cognitive function and reduces concentration."\n\nExercise 2: Third Conditional Practice\nRewrite each scenario using the third conditional:\n1. The company did not invest in training. Employee performance declined.\n→ "If the company had..."\n2. The students did not study the vocabulary. They failed the test.\n→ "If the students had..."\n3. The city did not build flood defenses. The town was destroyed.\n→ "If the city had..."\n\nExercise 3: Deductive or Inductive?\nIdentify each reasoning type:\n1. "All peer-reviewed studies are reviewed by experts. This study is peer-reviewed. Therefore, it was reviewed by experts." ___\n2. "In 100 observed cases, students who studied daily performed well. Therefore, daily study probably improves performance." ___'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Reasoning Analysis Essay\nWrite a 300-word essay analyzing this claim: "Social media causes loneliness among young people." Address:\n- Is this causation or correlation? Why?\n- What confounding variables might exist?\n- Use hedging language to express your conclusion\n- Include at least one third conditional sentence about what might have been different\n- Use compare/contrast language to discuss different perspectives\n\nTask 2: Counterfactual History\nChoose a historical event and write a 200-word counterfactual analysis using the third conditional: "If X had happened differently, then Y would have..." Analyze at least two possible alternative outcomes.'
          },
          {
            type: 'practice',
            content: 'Task 3: Logical Reasoning Test\nFor each argument, identify:\n(a) whether it uses deductive or inductive reasoning\n(b) whether the conclusion is valid\n(c) any potential flaws\n\n1. "Most students in this school speak French. Marie is a student at this school. Therefore, Marie probably speaks French."\n2. "All birds can fly. Penguins are birds. Therefore, penguins can fly."\n3. "Every time it rains, the grass grows. It rained last week. Therefore, the grass grew."'
          }
        ]
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Distinguish between cause and effect and correlation in everyday examples',
          'Use compare/contrast language and conditional sentences in academic writing',
          'Express hypothetical and counterfactual ideas using second and third conditional'
        ],
        input: [
          {
            type: 'wonder',
            content: 'Just because two things happen at the same time, does that mean one caused the other? Can you think of an example?'
          },
          {
            type: 'reading',
            title: 'Thinking Logically: Cause, Comparison, and Conditionals',
            text: 'Logical reasoning helps you analyze problems and make strong arguments. Three important skills are: understanding cause and effect, comparing and contrasting, and using conditional sentences.\n\n**Cause and Effect**\nSometimes two things happen together, but one does not cause the other. For example: "Students who eat breakfast get better grades." Does breakfast CAUSE better grades? Or are families who eat breakfast together also families who value education? When two things happen together, it is called correlation. When one thing directly causes another, it is called causation. Be careful not to confuse them.\n\nTo express cause and effect, use: "X leads to Y" / "X results in Y" / "X contributes to Y" / "As a result of X, Y occurs."\n\n**Compare and Contrast**\nTo compare (show similarities): "Similarly..." / "Likewise..." / "Both X and Y..."\nTo contrast (show differences): "However..." / "In contrast..." / "While X..., Y..." / "On the other hand..."\n\n**Conditional Sentences**\nConditionals express "if-then" ideas:\n- Second conditional (imaginary situation): "If every school had a library, students would read more." (If + past tense, would + verb)\n- Third conditional (imagining the past differently): "If the school had started later, students would have been less tired." (If + had + past participle, would have + past participle)\n\nThe third conditional is very useful for analyzing past events: "If scientists had discovered this sooner, many lives would have been saved."'
          },
          {
            type: 'text',
            content: 'Key terms:\n- Causation = one thing causes another\n- Correlation = two things happen together (but one may not cause the other)\n\nConditionals:\n- 2nd: "If + past, would + verb" (imaginary now)\n- 3rd: "If + had + past participle, would have + past participle" (imaginary past)\n\nCompare: similarly, likewise, both\nContrast: however, in contrast, while, on the other hand'
          },
          {
            type: 'biblical-worldview',
            content: 'God created an orderly world where cause and effect operate consistently (Genesis 8:22). Proverbs 25:2 says: "It is the glory of God to conceal things, but the glory of kings is to search things out." When we reason logically, we are doing what God created us to do — exploring and understanding His world.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'Why is it a mistake to say "Breakfast causes good grades" when we only know they happen together?',
              'When would you use the third conditional? Give an example.',
              'Why are compare/contrast skills important for academic writing?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise 1: Cause or Correlation?\nWrite C (causation) or CO (correlation):\n1. "Drinking water keeps your body hydrated." ___\n2. "People who own more books tend to earn higher salaries." ___\n3. "Lack of sleep reduces your ability to concentrate." ___\n\nExercise 2: Third Conditional\nComplete these sentences:\n1. "If the student had studied harder, she _____." (get a better grade)\n2. "If they had left earlier, they _____." (not miss the bus)\n3. "If the teacher had explained it differently, the students _____." (understand better)'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Cause and Effect Paragraph\nWrite a paragraph (100 words) about one of these topics. Be careful to distinguish cause from correlation:\n- "Does listening to music help you study?"\n- "Does exercise improve school performance?"\nUse at least one hedging phrase and one conditional sentence.\n\nTask 2: Compare and Contrast\nWrite 5 sentences comparing and contrasting studying alone vs. studying in a group. Use at least two compare phrases and two contrast phrases.'
          },
          {
            type: 'practice',
            content: 'Task 3: Third Conditional Practice\nWrite three third conditional sentences about these topics:\n1. A student who did not practice English → ___\n2. A country that did not invest in education → ___\n3. A scientist who did not publish their research → ___'
          }
        ]
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Understand that just because two things happen together does not mean one caused the other',
          'Use simple compare and contrast words: "both," "but," "however"',
          'Write a basic "If... would..." sentence'
        ],
        input: [
          {
            type: 'wonder',
            content: 'If you carry an umbrella and it does not rain, did your umbrella stop the rain? How do you know what really causes what?'
          },
          {
            type: 'reading',
            title: 'Does One Thing Really Cause Another?',
            text: 'Just because two things happen at the same time does not mean one caused the other.\n\nExample: "Students who play sports get better grades." Does playing sports CAUSE better grades? Maybe. But maybe students who play sports are also more disciplined, and discipline causes better grades. We cannot be sure.\n\nWhen two things happen together, it is called correlation. When one thing actually causes another, it is causation.\n\nTo compare things (show how they are similar), use:\n- "Both reading and writing improve your English."\n- "Similarly, math and science both use logic."\n\nTo contrast things (show how they are different), use:\n- "Reading is quiet, but sports are active."\n- "Math uses numbers. However, English uses words."\n\nConditional sentences help you imagine:\n- "If I studied more, I would get better grades." (imagining a different situation)\n- "If I had studied yesterday, I would have done better on the test." (imagining a different past)\n\nThese sentences use "would" to show something imaginary.'
          },
          {
            type: 'text',
            content: 'Correlation = two things happen together\nCausation = one thing causes another\n\nCompare: "Both..." / "Similarly..."\nContrast: "But..." / "However..."\n\nConditional: "If I studied more, I would learn faster."'
          },
          {
            type: 'biblical-worldview',
            content: 'God made the world with order and patterns (Genesis 8:22). Proverbs 25:2 says it is our job to "search things out." When we think about what really causes something, we are exploring the world God created.'
          }
        ],
        processing: [
          {
            type: 'discussion',
            questions: [
              'If students who eat breakfast have better grades, does breakfast cause better grades? Why might it be more complicated?',
              'What is the difference between "Both X and Y" and "X, but Y"?',
              'What does an "If... would..." sentence help you express?'
            ]
          },
          {
            type: 'practice',
            content: 'Exercise: Compare and Contrast\nFill in the blanks:\n1. "_____ math and science require logical thinking." (Both/But)\n2. "Reading is relaxing. _____, sports are energizing." (Both/However)\n3. "English uses an alphabet. _____, Chinese uses characters." (Similarly/However)'
          }
        ],
        output: [
          {
            type: 'practice',
            content: 'Task 1: Cause or Not?\nWrite C (cause) or N (not sure) for each:\n1. "Eating too much sugar causes cavities." ___\n2. "People with red cars get more speeding tickets." ___\n3. "Not drinking water makes you thirsty." ___\n\nTask 2: Write Conditional Sentences\nComplete these:\n1. "If I practiced English every day, I would _____"\n2. "If I had a million dollars, I would _____"\n3. "If I had studied last night, I would have _____"'
          },
          {
            type: 'practice',
            content: 'Task 3: Compare and Contrast\nWrite 3 sentences comparing and contrasting school and home. Use "both," "but," or "however."\nExample: "Both school and home are places where I learn. However, at school I have a teacher, but at home I learn by myself."'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the difference between correlation and causation?',
        options: [
          'They mean the same thing',
          'Correlation means two things happen together; causation means one causes the other',
          'Causation is always wrong; correlation is always right',
          'Correlation is about the past; causation is about the future'
        ],
        correctIndex: 1
      },
      {
        question: 'Which is an example of correlation, NOT causation?',
        options: [
          'Drinking poison causes illness',
          'Countries with more chocolate consumption have more Nobel Prize winners',
          'Dropping a ball causes it to fall',
          'Turning off the light causes darkness'
        ],
        correctIndex: 1
      },
      {
        question: 'What is the third conditional used for?',
        options: [
          'Describing real future events',
          'Giving commands',
          'Imagining how the past could have been different',
          'Making promises'
        ],
        correctIndex: 2
      },
      {
        question: 'Which sentence uses the third conditional correctly?',
        options: [
          '"If I study hard, I will pass."',
          '"If I studied hard, I would pass."',
          '"If I had studied harder, I would have passed."',
          '"I study hard and I pass."'
        ],
        correctIndex: 2
      },
      {
        question: 'What is a "confounding variable"?',
        options: [
          'A variable that is very confusing',
          'A hidden third factor that might explain the relationship between two other things',
          'A variable that cannot be measured',
          'The most important variable in an experiment'
        ],
        correctIndex: 1
      },
      {
        question: 'Which word signals a contrast?',
        options: [
          'Similarly',
          'Likewise',
          'Both',
          'However'
        ],
        correctIndex: 3
      },
      {
        question: 'What is deductive reasoning?',
        options: [
          'Moving from specific observations to general conclusions',
          'Moving from general principles to specific conclusions',
          'Guessing without any evidence',
          'Repeating what someone else said'
        ],
        correctIndex: 1
      },
      {
        question: 'Which is an example of inductive reasoning?',
        options: [
          '"All mammals are warm-blooded. Dogs are mammals. Therefore, dogs are warm-blooded."',
          '"Every student I surveyed said they like lunch break. Therefore, most students probably enjoy lunch break."',
          '"If A = B and B = C, then A = C."',
          '"The rule says no phones. You have a phone. Therefore, you broke the rule."'
        ],
        correctIndex: 1
      },
      {
        question: 'Why does Proverbs 25:2 say it is "the glory of kings to search things out"?',
        options: [
          'Because kings need to collect things',
          'Because investigating and understanding God\'s world is an honorable pursuit',
          'Because kings are the only ones allowed to do research',
          'Because searching for treasure is glorious'
        ],
        correctIndex: 1
      },
      {
        question: 'Which phrase correctly expresses a causal relationship with appropriate hedging?',
        options: [
          '"Social media definitely causes depression."',
          '"Research suggests that social media may contribute to feelings of loneliness."',
          '"Social media and depression are the same thing."',
          '"Everyone knows social media is harmful."'
        ],
        correctIndex: 1
      }
    ]
  },

  // W4: Critical Analysis Essay (PROJECT)
  {
    unitNumber: 6,
    weekNumber: 4,
    title: 'Critical Analysis Essay',
    lessonType: 'PROJECT',
    vocabulary: [
      'analysis',
      'evaluation',
      'thesis',
      'substantiate',
      'coherence'
    ],
    pathways: [
      {
        pathway: 'ADVANCED',
        duration: '80 min',
        objectives: [
          'Write a critical analysis essay (600-750 words) that identifies and evaluates an article\'s argument, evidence, reasoning, and potential biases',
          'Apply all critical thinking skills from the unit: fallacy identification, bias detection, logical reasoning, and conditional analysis',
          'Use precise academic vocabulary and hedging language throughout the analysis',
          'Structure the essay with a clear thesis, organized body paragraphs, and an evaluative conclusion'
        ],
        input: [
          {
            type: 'project',
            title: 'Critical Analysis Essay',
            prompt: 'Write a 600-750 word critical analysis essay. Choose one of the following articles/arguments to analyze (or use an article provided by your teacher):\n\n1. An editorial arguing that "Schools should eliminate homework for all students under age 14"\n2. An article claiming that "Social media does more harm than good for society"\n3. A report arguing that "Artificial intelligence will replace most human jobs within 20 years"\n\nYour critical analysis must include:\n\n**Introduction (100-125 words):**\n- Briefly summarize the article\'s main argument\n- State your thesis: your evaluation of the argument\'s strength\n\n**Body Paragraph 1 — Argument Structure (125-175 words):**\n- Identify the article\'s claims, evidence, and reasoning\n- Evaluate whether the evidence adequately supports the claims\n- Identify any logical fallacies (ad hominem, straw man, false dichotomy, etc.)\n\n**Body Paragraph 2 — Bias and Perspective (125-175 words):**\n- Analyze the article\'s language for loaded words and framing\n- Identify any bias through omission\n- Consider the author\'s perspective and potential motivations\n\n**Body Paragraph 3 — Logical Reasoning (125-175 words):**\n- Evaluate the cause-and-effect claims: are they causation or correlation?\n- Apply counterfactual reasoning: "If the author had considered X, their argument would have been..."\n- Compare the argument with alternative perspectives\n\n**Conclusion (75-100 words):**\n- State your overall evaluation of the argument\'s strength\n- Suggest how the argument could be strengthened\n\nUse hedging language, reporting verbs, and synthesis phrases throughout.',
            rubric: [
              'Argument Analysis: Accurately identifies claims, evidence, reasoning, and fallacies (20%)',
              'Bias Detection: Identifies loaded language, framing, and omission with specific examples (20%)',
              'Logical Reasoning: Evaluates causation vs. correlation; uses counterfactual and conditional reasoning (20%)',
              'Academic Language: Uses hedging, reporting verbs, and analytical vocabulary precisely (15%)',
              'Structure and Coherence: Clear thesis, organized paragraphs, logical flow, strong conclusion (15%)',
              'Writing Quality: Correct grammar, academic register, proper citations (10%)'
            ]
          }
        ],
        processing: [],
        output: []
      },
      {
        pathway: 'STANDARD',
        duration: '60 min',
        objectives: [
          'Write a 400-500 word essay analyzing an article\'s argument, evidence, and potential biases',
          'Identify at least one logical fallacy and one example of bias in the article',
          'Use hedging language and reporting verbs in the analysis'
        ],
        input: [
          {
            type: 'project',
            title: 'Critical Analysis Essay',
            prompt: 'Write a 400-500 word critical analysis of one of these arguments:\n\n1. "Homework should be banned for students under 14"\n2. "Social media is harmful for teenagers"\n3. "Everyone should learn to code"\n\nYour essay must include:\n\n**Introduction (75 words):** Summarize the argument and state whether you think it is strong or weak\n\n**Body Paragraph 1 (150 words):** Identify the claim and evidence. Is the evidence strong? Are there any logical fallacies?\n\n**Body Paragraph 2 (150 words):** Is there bias? Look for loaded language, missing information, and emotional appeals\n\n**Conclusion (75 words):** Give your overall evaluation. How could the argument be improved?\n\nUse:\n- At least 3 hedging phrases\n- At least 2 reporting verbs\n- At least 1 conditional sentence ("If the author had...")',
            rubric: [
              'Argument Analysis: Identifies claims, evidence, and at least one fallacy (25%)',
              'Bias Detection: Identifies loaded language or other bias with examples (25%)',
              'Academic Language: Uses hedging, reporting verbs, and a conditional sentence (20%)',
              'Structure: Clear introduction, body paragraphs, and conclusion (15%)',
              'Writing Quality: Clear and correct writing (15%)'
            ]
          }
        ],
        processing: [],
        output: []
      },
      {
        pathway: 'VOCATIONAL',
        duration: '45 min',
        objectives: [
          'Write a 250-300 word response that identifies the main claim and evidence in a short argument',
          'Find at least one example of loaded language or bias',
          'State whether the argument is strong or weak and explain why'
        ],
        input: [
          {
            type: 'project',
            title: 'Analyzing an Argument',
            prompt: 'Read this argument and write a 250-300 word response:\n\n"Every school should give every student a tablet computer. Technology is the future, and schools without technology are failing their students. Students who use tablets learn faster, get better grades, and are happier. Any teacher who opposes tablets is afraid of progress."\n\nIn your response:\n\n**Part 1 (75 words):** What is the main claim? What evidence does the author give?\n\n**Part 2 (100 words):** Is the argument fair? Look for:\n- Strong words that try to make you feel a certain way (loaded language)\n- Is anything missing that you would want to know?\n- Does the argument attack people instead of ideas?\n\n**Part 3 (75 words):** Do you think this is a strong or weak argument? Explain why.\n\nUse at least 1 hedging word (might, perhaps, seems) and the phrase "According to the author..."',
            rubric: [
              'Claim Identification: Correctly identifies the main claim and evidence (25%)',
              'Bias Detection: Finds at least one example of loaded language or bias (25%)',
              'Evaluation: States whether the argument is strong or weak with a reason (25%)',
              'Language: Uses at least one hedging word and "According to..." (25%)'
            ]
          }
        ],
        processing: [],
        output: []
      }
    ],
    quiz: []
  }
]

async function main() {
  console.log(`\nEnriching Academic English Bridge (French) Units 4-6`)
  console.log(`Course ID: ${COURSE_ID}`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log(`Total lessons to process: ${lessons.length}\n`)

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const lesson of lessons) {
    const label = `U${lesson.unitNumber}W${lesson.weekNumber}: ${lesson.title}`

    try {
      // Find the lesson in the database
      const existing = await prisma.lesson.findFirst({
        where: {
          unit: { courseId: COURSE_ID, unitNumber: lesson.unitNumber },
          weekNumber: lesson.weekNumber
        },
        include: { unit: true }
      })

      if (!existing) {
        console.log(`  SKIP ${label} — not found in database`)
        skipped++
        continue
      }

      // Build the content object
      const content = {
        pathways: lesson.pathways.map((p) => ({
          pathway: p.pathway,
          duration: p.duration,
          objectives: p.objectives,
          input: p.input,
          processing: p.processing,
          output: p.output
        }))
      }

      if (DRY_RUN) {
        const wordCount = JSON.stringify(content).length
        console.log(`  DRY ${label} — ${wordCount} chars, ${lesson.quiz.length} quiz Qs`)
      } else {
        const existingContent = existing.content as Record<string, unknown>
        const updatedContent = {
          ...existingContent,
          pathways: content.pathways,
          vocabulary: lesson.vocabulary.map((v: any) => ({ term: v.term || v.word || '', definition: v.definition || '', example: v.example || `Used in academic English.` })),
          quiz: lesson.quiz.map((q: any) => ({ question: q.question, options: q.options, correctAnswer: q.correctAnswer ?? q.correctIndex ?? 0, explanation: q.explanation || `The correct answer is "${(q.options || [])[q.correctAnswer ?? q.correctIndex ?? 0]}".` }))
        }
        await prisma.lesson.update({
          where: { id: existing.id },
          data: { content: updatedContent as any }
        })
        console.log(`  OK  ${label} — updated (${lesson.quiz.length} quiz Qs)`)
      }
      updated++
    } catch (err) {
      console.error(`  ERR ${label}:`, err)
      errors++
    }
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`)
  await prisma.$disconnect()
}

main().catch((err) => {
  console.error('Fatal error:', err)
  prisma.$disconnect()
  process.exit(1)
})
