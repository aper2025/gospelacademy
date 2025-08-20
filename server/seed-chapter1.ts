import { db } from "./db";
import { 
  courses, 
  units, 
  lessons, 
  reflectionQuestions, 
  quizzes, 
  quizQuestions,
  additionalResources 
} from "../shared/schema";

export async function seedChapter1() {
  try {
    console.log("Starting Chapter 1 seed...");

    // Create the course
    const [course] = await db.insert(courses).values({
      title: "New Testament Survey: The Life of Christ",
      description: "A Reformed Baptist perspective on the New Testament, focusing on the life and ministry of Jesus Christ and the birth of the early church.",
      duration: "18 weeks",
      isActive: true,
    }).returning();

    console.log("Created course:", course.title);

    // Create Unit 1
    const [unit1] = await db.insert(units).values({
      courseId: course.id,
      title: "Unit 1: Setting the Stage for the King",
      description: "Understanding the world into which Jesus came, including the intertestamental period and first-century context.",
      orderIndex: 1,
    }).returning();

    console.log("Created unit:", unit1.title);

    // Chapter 1 broken into 4 lessons
    const lessonsData = [
      {
        title: "Lesson 1: The Silent Years - Introduction and Persian Period",
        content: `
# The Silent Years - Introduction and Persian Period

## Learning Objectives
By the end of this lesson, you will be able to:
- Explain why the 400 years between Malachi and Matthew are called the "silent years"
- Understand God's sovereignty during periods of apparent silence
- Describe the Persian Empire's influence on Jewish life and faith
- Identify how Persian religious ideas influenced Jewish thought

## Scripture Foundation
"But when the fullness of time had come, God sent forth his Son, born of woman, born under the law, to redeem those who were under the law, so that we might receive adoption as sons." (Galatians 4:4-5, ESV)

## Introduction: The Silent Years
When the prophet Malachi penned the final words of the Old Testament around 430 BC, the Jewish people could not have imagined that four centuries would pass before God would speak again through inspired Scripture. These 400 years, often called the "silent years" or the "intertestamental period," were anything but silent in terms of historical activity.

From a Reformed Baptist perspective, we understand that God's apparent silence during this period was not evidence of His absence or inactivity. Rather, these centuries demonstrate God's meticulous sovereignty as He orchestrated world events to prepare for the coming of His Son.

## The Persian Period (430-330 BC)
When Malachi concluded his prophetic ministry, the Jewish people were living under Persian rule, having returned from Babylonian exile under the decrees of Cyrus the Great. The Persian Empire, which had shown remarkable tolerance toward local religions and customs, allowed the Jews to rebuild their temple and reestablish their religious practices in Jerusalem.

During this period, the Jewish community was led by a succession of high priests and governors, including Ezra and Nehemiah, who had worked to restore not only the physical structures of Jerusalem but also the spiritual life of the people. The Law of Moses was read publicly and explained to the people, and there was a renewed commitment to covenant faithfulness.

However, the Persian period also saw the beginning of significant challenges that would shape Jewish identity for centuries to come. The Jewish community was small and vulnerable, surrounded by hostile neighbors and dependent on the goodwill of foreign rulers. This experience of vulnerability would contribute to the development of intense messianic expectations, as the people longed for a deliverer who would restore Israel's independence and glory.

The Persian Empire's policy of religious tolerance also had unintended consequences for Jewish faith. Exposure to Persian religious ideas, particularly Zoroastrianism with its emphasis on cosmic dualism and the struggle between good and evil, began to influence Jewish thought. While the Jews remained firmly monotheistic, concepts such as angels, demons, and detailed eschatological expectations became more prominent during this period.

## Key Terms
- **Intertestamental Period**: The approximately 400 years between the completion of the Old Testament and the beginning of the New Testament
- **Zoroastrianism**: Persian religion that emphasized cosmic dualism between good and evil
- **Messianic Expectations**: Jewish hopes for a coming deliverer who would restore Israel's independence and glory
        `,
        duration: 30,
        orderIndex: 1,
        unitId: unit1.id,
      },
      {
        title: "Lesson 2: The Greek Conquest and Hellenization", 
        content: `
# The Greek Conquest and Hellenization

## Learning Objectives
By the end of this lesson, you will be able to:
- Describe Alexander the Great's impact on the ancient world
- Explain the process of Hellenization and its effects on Jewish culture
- Understand the significance of the Septuagint translation
- Analyze how Greek philosophy began to influence Jewish thought

## The Greek Conquest (334-323 BC)
In 334 BC, a young Macedonian king named Alexander the Great began a military campaign that would change the course of world history. Within a decade, Alexander had conquered the Persian Empire and established Greek rule from Egypt to India. When Alexander died suddenly in 323 BC at the age of 33, his vast empire was divided among his generals, but the cultural impact of his conquests continued for centuries.

## The Process of Hellenization (330-167 BC)
The process of Hellenization—the spread of Greek language, culture, and ideas—profoundly affected the Jewish people. Greek became the common language of trade and diplomacy throughout the Mediterranean world, and many Jews, particularly those living outside Palestine, adopted Greek customs and ways of thinking.

### The Septuagint Translation
One of the most significant developments during this period was the translation of the Hebrew Scriptures into Greek, known as the Septuagint (LXX). According to tradition, this translation was completed in Alexandria, Egypt, around 250 BC by seventy Jewish scholars. The Septuagint made the Hebrew Scriptures accessible to Greek-speaking Jews throughout the Mediterranean world and would later become the Bible of the early Christian church.

### Greek Philosophy and Jewish Thought
The influence of Greek philosophy also began to affect Jewish thought during this period. Some Jewish thinkers, particularly in Alexandria, attempted to synthesize biblical faith with Greek philosophical concepts. This intellectual movement would later influence both Jewish and Christian theology, though it also created tensions between those who embraced Hellenistic ideas and those who sought to maintain traditional Jewish practices.

### Political Changes
Palestine itself was ruled first by the Ptolemies of Egypt (323-198 BC) and then by the Seleucids of Syria (198-167 BC). Under Ptolemaic rule, the Jews enjoyed relative freedom to practice their religion, but the situation changed dramatically when the Seleucids gained control of Palestine.

## Key Terms
- **Hellenization**: The spread of Greek language, culture, and ideas throughout the Mediterranean world
- **Septuagint (LXX)**: The Greek translation of the Hebrew Scriptures, completed around 250 BC
- **Ptolemies**: Greek rulers of Egypt who controlled Palestine from 323-198 BC
- **Seleucids**: Greek rulers of Syria who controlled Palestine from 198-167 BC
        `,
        duration: 35,
        orderIndex: 2,
        unitId: unit1.id,
      },
      {
        title: "Lesson 3: The Maccabean Revolt and Jewish Independence",
        content: `
# The Maccabean Revolt and Jewish Independence

## Learning Objectives
By the end of this lesson, you will be able to:
- Explain the crisis that led to the Maccabean revolt
- Describe Antiochus IV Epiphanes' persecution of the Jews
- Understand the significance of the "abomination of desolation"
- Analyze the successes and failures of the Hasmonean dynasty

## The Crisis Under Antiochus IV Epiphanes (175-164 BC)
The crisis that would define Jewish identity for generations came during the reign of the Seleucid king Antiochus IV Epiphanes (175-164 BC). Antiochus was determined to unify his empire through forced Hellenization, and he viewed Jewish religious practices as obstacles to his political goals.

### The Persecution Begins (167 BC)
In 167 BC, Antiochus issued decrees that struck at the heart of Jewish faith and practice. He forbade the observance of the Sabbath, the practice of circumcision, and the study of the Torah. He ordered the destruction of copies of Scripture and commanded Jews to participate in pagan sacrifices. Most shocking of all, he desecrated the Jerusalem temple by erecting an altar to Zeus and sacrificing pigs on the altar of burnt offering.

### The Abomination of Desolation
This "abomination of desolation" sparked a revolt led by a priest named Mattathias and his five sons, the most famous of whom was Judas Maccabeus. The Maccabean revolt began as a guerrilla war but eventually succeeded in driving the Seleucids out of Jerusalem and redededicating the temple in 164 BC (an event still commemorated in the Jewish festival of Hanukkah).

## The Hasmonean Dynasty (142-63 BC)
The success of the Maccabean revolt led to a period of Jewish independence under the Hasmonean dynasty (142-63 BC). For the first time since the Babylonian exile, the Jewish people were ruled by their own kings. However, this period of independence was marked by internal strife, political corruption, and the gradual abandonment of the religious principles that had motivated the original revolt.

### Problems with Hasmonean Rule
The Hasmonean rulers increasingly adopted Hellenistic practices and became more concerned with political power than religious faithfulness. They expanded Jewish territory through military conquest but also forced conversion on conquered peoples, creating resentment and instability. By the end of the Hasmonean period, the Jewish people were deeply divided along political, religious, and social lines.

## Key Terms
- **Antiochus IV Epiphanes**: Seleucid king who persecuted the Jews and desecrated the temple
- **Abomination of Desolation**: The desecration of the Jerusalem temple by Antiochus IV
- **Maccabean Revolt**: The Jewish rebellion against Seleucid rule led by Mattathias and his sons
- **Hasmonean Dynasty**: The Jewish ruling family during the period of independence (142-63 BC)
- **Hanukkah**: Jewish festival commemorating the rededication of the temple
        `,
        duration: 40,
        orderIndex: 3,
        unitId: unit1.id,
      },
      {
        title: "Lesson 4: Roman Rule and God's Sovereign Preparation",
        content: `
# Roman Rule and God's Sovereign Preparation

## Learning Objectives
By the end of this lesson, you will be able to:
- Describe the Roman conquest of Palestine
- Understand Herod the Great's role and character
- Identify key religious and cultural developments during this period
- Appreciate God's sovereignty in preparing the world for Christ's coming

## The Roman Conquest (63 BC-4 BC)
In 63 BC, the Roman general Pompey captured Jerusalem and brought Palestine under Roman rule. The Romans initially allowed the Hasmonean dynasty to continue as client rulers, but political instability and civil war eventually led to the appointment of Herod the Great as king of Judea in 37 BC.

### Herod the Great
Herod, an Idumean by birth who had converted to Judaism, was a skilled politician and builder who managed to maintain Roman favor while attempting to appease his Jewish subjects. He undertook massive building projects, including the expansion and beautification of the Jerusalem temple, which became one of the architectural wonders of the ancient world.

However, Herod was also a paranoid and ruthless ruler who eliminated anyone he perceived as a threat to his power, including members of his own family. His massacre of the infants in Bethlehem, recorded in Matthew 2:16-18, was entirely consistent with his character and methods.

### Religious Groups in the Roman Period
The Roman period also saw the development of the religious and political groups that would play important roles in the New Testament: the Pharisees, Sadducees, Essenes, and Zealots. Each of these groups represented different responses to the challenges of living under foreign rule while maintaining Jewish identity and faith.

## Religious and Cultural Developments

### Synagogue Worship
During the Babylonian exile and the subsequent periods of foreign rule, Jews developed the institution of the synagogue as a center for prayer, Scripture reading, and religious instruction. By the first century AD, synagogues could be found throughout the Mediterranean world wherever Jewish communities existed.

### Scribal Tradition
The traumatic experience of the exile and the threat of cultural assimilation led to an increased emphasis on the careful preservation and interpretation of Scripture. The scribes became the guardians of the biblical text, developing elaborate rules for copying manuscripts and interpreting the Law.

### Apocalyptic Literature
The suffering and oppression experienced during the intertestamental period gave rise to a new genre of religious literature known as apocalyptic writing. Books such as 1 Enoch and 4 Ezra offered hope to suffering believers by revealing God's secret plan to vindicate His people and establish His kingdom on earth.

### Messianic Expectations
The combination of political oppression, religious persecution, and prophetic promises led to intense speculation about the coming Messiah. Different groups developed different expectations: some looked for a political deliverer who would restore the Davidic kingdom, others expected a priestly figure who would purify the temple worship, and still others anticipated a heavenly figure who would establish God's eternal kingdom.

### The Diaspora
By the first century AD, more Jews lived outside Palestine than within it. These diaspora communities, scattered throughout the Roman Empire, had developed their own forms of Jewish life and worship adapted to their Gentile environments. The existence of these communities would prove crucial for the spread of the Christian gospel.

## God's Sovereignty in the Silent Years
From a Reformed Baptist perspective, the intertestamental period demonstrates God's meticulous providence in preparing the world for the coming of Christ. Every development during these 400 years served God's redemptive purposes:

**Political Preparation**: The rise and fall of empires created a unified Mediterranean world under Roman rule, with excellent roads and communication systems that would facilitate the spread of the gospel.

**Cultural Preparation**: The spread of Greek language and culture created a common means of communication that would allow the New Testament to be written and understood throughout the known world.

**Religious Preparation**: The development of synagogues provided ready-made centers for Christian evangelism, while the translation of the Hebrew Scriptures into Greek made the Old Testament accessible to Gentile converts.

**Spiritual Preparation**: The suffering and disappointment of the intertestamental period created a deep longing for redemption that would make many hearts receptive to the gospel message.

The apostle Paul's declaration that Christ came "when the fullness of time had come" (Galatians 4:4) reminds us that God's timing is always perfect. The 400 years of apparent silence were actually years of divine preparation, as God orchestrated world events to create the perfect conditions for the incarnation of His Son.

## Key Terms
- **Diaspora**: The Jewish communities scattered throughout the Mediterranean world outside of Palestine
- **Apocalyptic Literature**: A genre of religious writing that reveals God's secret plan for the end times
- **Synagogue**: Jewish centers for prayer, Scripture reading, and religious instruction
- **Scribes**: Guardians of the biblical text who developed rules for copying and interpreting Scripture
        `,
        duration: 45,
        orderIndex: 4,
        unitId: unit1.id,
      }
    ];

    // Insert lessons
    const insertedLessons = await db.insert(lessons).values(lessonsData).returning();
    console.log(`Created ${insertedLessons.length} lessons`);

    // Create reflection questions for each lesson
    const reflectionQuestionsData = [];
    
    // Lesson 1 reflection questions
    reflectionQuestionsData.push(
      { lessonId: insertedLessons[0].id, question: "How does understanding the intertestamental period help you appreciate God's sovereignty in your own life, even during times when He seems silent?", orderIndex: 1 },
      { lessonId: insertedLessons[0].id, question: "What parallels do you see between the challenges faced by Jews during the Persian period and the challenges faced by Christians today?", orderIndex: 2 },
      { lessonId: insertedLessons[0].id, question: "How did Persian religious ideas influence Jewish thought while the Jews remained faithful to monotheism?", orderIndex: 3 }
    );

    // Lesson 2 reflection questions
    reflectionQuestionsData.push(
      { lessonId: insertedLessons[1].id, question: "How did the Greek conquest and Hellenization prepare the world for the coming of Christ and the spread of the gospel?", orderIndex: 1 },
      { lessonId: insertedLessons[1].id, question: "What was the significance of the Septuagint translation for both Jewish and early Christian communities?", orderIndex: 2 },
      { lessonId: insertedLessons[1].id, question: "How do you balance engaging with culture while maintaining your biblical convictions, as Jews had to do during Hellenization?", orderIndex: 3 }
    );

    // Lesson 3 reflection questions
    reflectionQuestionsData.push(
      { lessonId: insertedLessons[2].id, question: "What can we learn from the Maccabean revolt about the importance of standing firm in our faith when faced with pressure to compromise?", orderIndex: 1 },
      { lessonId: insertedLessons[2].id, question: "How did the successes and failures of the Hasmonean dynasty demonstrate the corrupting influence of political power?", orderIndex: 2 },
      { lessonId: insertedLessons[2].id, question: "What does the 'abomination of desolation' teach us about the seriousness of religious persecution and faithfulness?", orderIndex: 3 }
    );

    // Lesson 4 reflection questions
    reflectionQuestionsData.push(
      { lessonId: insertedLessons[3].id, question: "How do the messianic expectations that developed during this period help us understand both the acceptance and rejection of Jesus by different groups of Jews?", orderIndex: 1 },
      { lessonId: insertedLessons[3].id, question: "What evidence do you see of God's sovereignty in orchestrating world events to prepare for Christ's coming?", orderIndex: 2 },
      { lessonId: insertedLessons[3].id, question: "How can times of apparent silence or waiting in your life actually be periods of God's preparation for future blessings?", orderIndex: 3 }
    );

    await db.insert(reflectionQuestions).values(reflectionQuestionsData);
    console.log(`Created ${reflectionQuestionsData.length} reflection questions`);

    // Create quizzes for each lesson
    const quizzesData = insertedLessons.map((lesson, index) => ({
      lessonId: lesson.id,
      title: `${lesson.title} - Quiz`,
      timeLimit: 15,
      passingScore: 70,
    }));

    const insertedQuizzes = await db.insert(quizzes).values(quizzesData).returning();
    console.log(`Created ${insertedQuizzes.length} quizzes`);

    // Create quiz questions
    const quizQuestionsData = [];

    // Quiz 1 questions (Lesson 1)
    quizQuestionsData.push(
      {
        quizId: insertedQuizzes[0].id,
        question: "How long was the intertestamental period?",
        options: ["200 years", "300 years", "400 years", "500 years"],
        correctAnswer: "C",
        explanation: "The intertestamental period lasted approximately 400 years, from Malachi (430 BC) to the birth of Christ.",
        orderIndex: 1
      },
      {
        quizId: insertedQuizzes[0].id,
        question: "Which Persian religious idea influenced Jewish thought during this period?",
        options: ["Polytheism", "Cosmic dualism", "Atheism", "Pantheism"],
        correctAnswer: "B",
        explanation: "Zoroastrianism's emphasis on cosmic dualism between good and evil began to influence Jewish concepts of angels, demons, and eschatology.",
        orderIndex: 2
      },
      {
        quizId: insertedQuizzes[0].id,
        question: "What does 'when the fullness of time had come' (Galatians 4:4) teach us about God's timing?",
        options: ["God was late", "God's timing is perfect", "God was early", "Time doesn't matter to God"],
        correctAnswer: "B",
        explanation: "This verse demonstrates that God's timing is always perfect, and He orchestrated world events to create ideal conditions for Christ's coming.",
        orderIndex: 3
      }
    );

    // Quiz 2 questions (Lesson 2) 
    quizQuestionsData.push(
      {
        quizId: insertedQuizzes[1].id,
        question: "Who was Alexander the Great?",
        options: ["A Persian king", "A Roman general", "A Macedonian king", "An Egyptian pharaoh"],
        correctAnswer: "C",
        explanation: "Alexander the Great was a young Macedonian king who conquered the Persian Empire and spread Greek culture throughout the known world.",
        orderIndex: 1
      },
      {
        quizId: insertedQuizzes[1].id,
        question: "What is the Septuagint?",
        options: ["A Roman law code", "The Greek translation of Hebrew Scriptures", "A Greek philosophical work", "A Jewish temple"],
        correctAnswer: "B",
        explanation: "The Septuagint (LXX) was the Greek translation of the Hebrew Scriptures, completed around 250 BC in Alexandria, Egypt.",
        orderIndex: 2
      },
      {
        quizId: insertedQuizzes[1].id,
        question: "Who controlled Palestine from 323-198 BC?",
        options: ["The Seleucids", "The Romans", "The Ptolemies", "The Persians"],
        correctAnswer: "C",
        explanation: "The Ptolemies of Egypt controlled Palestine from 323-198 BC, after which the Seleucids took control.",
        orderIndex: 3
      }
    );

    // Quiz 3 questions (Lesson 3)
    quizQuestionsData.push(
      {
        quizId: insertedQuizzes[2].id,
        question: "What was the 'abomination of desolation'?",
        options: ["A Greek philosophical teaching", "The destruction of Jerusalem", "Antiochus IV's desecration of the temple", "A Roman tax policy"],
        correctAnswer: "C",
        explanation: "The 'abomination of desolation' refers to Antiochus IV Epiphanes' desecration of the Jerusalem temple by erecting an altar to Zeus and sacrificing pigs.",
        orderIndex: 1
      },
      {
        quizId: insertedQuizzes[2].id,
        question: "Who led the revolt against Antiochus IV?",
        options: ["Ezra and Nehemiah", "Mattathias and his sons", "The Pharisees", "The Roman army"],
        correctAnswer: "B",
        explanation: "The revolt was led by a priest named Mattathias and his five sons, the most famous of whom was Judas Maccabeus.",
        orderIndex: 2
      },
      {
        quizId: insertedQuizzes[2].id,
        question: "Which Jewish festival commemorates the rededication of the temple?",
        options: ["Passover", "Yom Kippur", "Hanukkah", "Purim"],
        correctAnswer: "C",
        explanation: "Hanukkah commemorates the rededication of the temple in 164 BC after the Maccabean victory over the Seleucids.",
        orderIndex: 3
      }
    );

    // Quiz 4 questions (Lesson 4)
    quizQuestionsData.push(
      {
        quizId: insertedQuizzes[3].id,
        question: "When did the Romans conquer Palestine?",
        options: ["167 BC", "142 BC", "63 BC", "37 BC"],
        correctAnswer: "C",
        explanation: "The Roman general Pompey captured Jerusalem and brought Palestine under Roman rule in 63 BC.",
        orderIndex: 1
      },
      {
        quizId: insertedQuizzes[3].id,
        question: "Who was Herod the Great?",
        options: ["A Roman emperor", "A Jewish high priest", "An Idumean king appointed by Rome", "A Pharisee leader"],
        correctAnswer: "C",
        explanation: "Herod the Great was an Idumean by birth who converted to Judaism and was appointed king of Judea by the Romans in 37 BC.",
        orderIndex: 2
      },
      {
        quizId: insertedQuizzes[3].id,
        question: "What were synagogues used for?",
        options: ["Animal sacrifices", "Political meetings", "Prayer, Scripture reading, and religious instruction", "Trade and commerce"],
        correctAnswer: "C",
        explanation: "Synagogues served as centers for prayer, Scripture reading, and religious instruction throughout the Mediterranean world.",
        orderIndex: 3
      }
    );

    await db.insert(quizQuestions).values(quizQuestionsData);
    console.log(`Created ${quizQuestionsData.length} quiz questions`);

    // Add some additional resources
    const resourcesData = [
      {
        lessonId: insertedLessons[0].id,
        title: "Map of the Persian Empire",
        description: "Visual representation of the Persian Empire's extent during the intertestamental period",
        type: "image",
        url: "https://example.com/persian-empire-map"
      },
      {
        lessonId: insertedLessons[1].id,
        title: "Alexander's Conquests Documentary",
        description: "Historical documentary about Alexander the Great's military campaigns",
        type: "video",
        url: "https://example.com/alexander-documentary"
      },
      {
        lessonId: insertedLessons[2].id,
        title: "The Maccabean Revolt Timeline",
        description: "Detailed timeline of events during the Maccabean revolt",
        type: "pdf",
        url: "https://example.com/maccabean-timeline"
      },
      {
        lessonId: insertedLessons[3].id,
        title: "First-Century Palestine Map",
        description: "Map showing political divisions of Palestine during Jesus' time",
        type: "image", 
        url: "https://example.com/palestine-map"
      }
    ];

    await db.insert(additionalResources).values(resourcesData);
    console.log(`Created ${resourcesData.length} additional resources`);

    console.log("Chapter 1 seed completed successfully!");
    return { course, unit: unit1, lessons: insertedLessons };

  } catch (error) {
    console.error("Error seeding Chapter 1:", error);
    throw error;
  }
}