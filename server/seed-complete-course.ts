import { db } from "./db";
import { 
  courses, 
  units, 
  lessons, 
  reflectionQuestions, 
  quizzes, 
  quizQuestions,
  additionalResources,
  quizAttempts,
  reflectionResponses,
  courseEnrollments,
  lessonProgress,
  quizLocks
} from "../shared/schema";

export async function seedCompleteCourse() {
  try {
    console.log("Starting complete course seed...");

    // Clear existing data first in correct order due to foreign key constraints
    await db.delete(quizLocks);
    await db.delete(quizAttempts);
    await db.delete(reflectionResponses);
    await db.delete(lessonProgress);
    await db.delete(courseEnrollments);
    await db.delete(additionalResources);
    await db.delete(quizQuestions);
    await db.delete(quizzes);
    await db.delete(reflectionQuestions);
    await db.delete(lessons);
    await db.delete(units);
    await db.delete(courses);

    // Create the course
    const [course] = await db.insert(courses).values({
      title: "New Testament Survey: The Life of Christ",
      description: "A Reformed Baptist perspective on the New Testament, focusing on the life and ministry of Jesus Christ and the birth of the early church.",
      duration: "18 weeks",
      isActive: true,
    }).returning();

    console.log("Created course:", course.title);

    // Unit 1: Setting the Stage for the King (3 Weeks)
    const [unit1] = await db.insert(units).values({
      courseId: course.id,
      title: "Unit 1: Setting the Stage for the King",
      description: "Understanding the world into which Jesus came, including the intertestamental period and first-century context.",
      orderIndex: 1,
    }).returning();

    // Unit 2: The Early Life and Ministry of Jesus (5 Weeks)
    const [unit2] = await db.insert(units).values({
      courseId: course.id,
      title: "Unit 2: The Early Life and Ministry of Jesus",
      description: "From incarnation to early ministry, exploring Jesus' preparation and first demonstrations of divine authority.",
      orderIndex: 2,
    }).returning();

    // Unit 3: The Teachings of Jesus - Parables and Discourses (6 Weeks)
    const [unit3] = await db.insert(units).values({
      courseId: course.id,
      title: "Unit 3: The Teachings of Jesus - Parables and Discourses",
      description: "Deep dive into Jesus' teaching ministry through parables, sermons, and discourses.",
      orderIndex: 3,
    }).returning();

    // Unit 4: The Climax of the Gospels - Passion Week (4 Weeks)
    const [unit4] = await db.insert(units).values({
      courseId: course.id,
      title: "Unit 4: The Climax of the Gospels - Passion Week",
      description: "The final week of Jesus' earthly ministry, culminating in His death and resurrection.",
      orderIndex: 4,
    }).returning();

    console.log("Created 4 units");

    // UNIT 1 LESSONS (Chapters 1-3)
    const unit1Lessons = [
      {
        title: "Chapter 1: The Intertestamental Period - 400 Years of Silence",
        content: `# Chapter 1: The Intertestamental Period - 400 Years of Silence

## Learning Objectives:
By the end of this chapter, you will be able to:
• Explain the major political and cultural developments during the 400 years between Malachi and Matthew
• Understand how God was preparing the world for the coming of Christ
• Identify the key factors that shaped Jewish expectations of the Messiah
• Appreciate God's sovereignty in orchestrating historical events for His redemptive purposes

## Scripture Foundation:
"But when the fullness of time had come, God sent forth his Son, born of woman, born under the law, to redeem those who were under the law, so that we might receive adoption as sons." (Galatians 4:4-5, ESV)

## Memory Verse: 
"But when the fullness of time had come, God sent forth his Son, born of woman, born under the law" (Galatians 4:4, ESV)

## Introduction - The Silent Years

When the prophet Malachi penned the final words of the Old Testament around 430 BC, the Jewish people could not have imagined that four centuries would pass before God would speak again through inspired Scripture. These 400 years, often called the "silent years" or the "intertestamental period," were anything but silent in terms of historical activity.

From a Reformed Baptist perspective, we understand that God's apparent silence during this period was not evidence of His absence or inactivity. Rather, these centuries demonstrate God's meticulous sovereignty as He orchestrated world events to prepare for the coming of His Son.

## The Persian Period (430-330 BC)

During this period, the Jewish community was led by a succession of high priests and governors, including Ezra and Nehemiah. The Persian Empire's policy of religious tolerance allowed Jews to rebuild their temple and reestablish their religious practices in Jerusalem.

However, exposure to Persian religious ideas, particularly Zoroastrianism with its emphasis on cosmic dualism, began to influence Jewish thought. Concepts such as angels, demons, and detailed eschatological expectations became more prominent.

## The Greek Conquest and Hellenization (330-167 BC)

Alexander the Great's conquests brought Greek culture throughout the Mediterranean world. The translation of Hebrew Scriptures into Greek (the Septuagint) made Scripture accessible to Greek-speaking Jews and would later become the Bible of the early Christian church.

## The Maccabean Revolt and Independence (167-63 BC)

Antiochus IV Epiphanes' persecution led to the Maccabean revolt. His desecration of the temple (the "abomination of desolation") sparked resistance that eventually led to Jewish independence under the Hasmonean dynasty.

## Roman Rule and God's Sovereign Preparation (63 BC-4 BC)

Roman rule provided the infrastructure and stability necessary for the spread of the gospel. The development of distinct Jewish groups (Pharisees, Sadducees, Essenes, Zealots) created the religious landscape Jesus would encounter.

## Theological Reflection

The intertestamental period teaches us that God's timing is perfect. Every political upheaval and cultural shift served His ultimate purpose of redemption. When Jesus was born, the world was perfectly prepared for the spread of the Christian message.`,
        duration: 45,
        orderIndex: 1,
        unitId: unit1.id,
      },
      {
        title: "Chapter 2: The Political and Religious World of the New Testament",
        content: `# Chapter 2: The Political and Religious World of the New Testament

## Learning Objectives:
By the end of this chapter, you will be able to:
• Understand the Roman political system and its impact on Palestine
• Identify the major Jewish religious groups and their beliefs
• Explain the role of the temple and synagogue in first-century Judaism
• Describe the social and economic conditions of Jesus' time

## Scripture Foundation:
"Render to Caesar the things that are Caesar's, and to God the things that are God's." (Mark 12:17, ESV)

## Roman Political Structure

The Roman Empire provided unprecedented peace and stability throughout the Mediterranean world. Palestine was governed through a complex system of client kings, prefects, and provincial governors, all ultimately answerable to Caesar in Rome.

Herod the Great (37-4 BC) ruled as a client king, undertaking massive building projects including the expansion of the Jerusalem temple. After his death, his kingdom was divided among his sons, with Judea eventually coming under direct Roman rule through prefects like Pontius Pilate.

## Jewish Religious Groups

### The Pharisees
The Pharisees were the most influential religious party among the Jewish people. They emphasized strict adherence to the written Law of Moses and the oral traditions that had developed around it. They believed in resurrection, angels, and spirits, and sought to apply the Law to every aspect of daily life.

### The Sadducees
The Sadducees represented the priestly aristocracy and controlled the temple hierarchy. They accepted only the written Torah and rejected beliefs in resurrection and angels. They collaborated closely with Roman authorities to maintain their position and power.

### The Essenes
The Essenes were a separatist group who withdrew from mainstream Jewish society, viewing it as hopelessly corrupt. They established communities in the desert, most famously at Qumran, where they copied and preserved biblical manuscripts.

### The Zealots
The Zealots advocated violent resistance to Roman rule, believing that God would not deliver Israel until they took action against their oppressors. Their revolutionary activities would eventually lead to the Jewish War and the destruction of Jerusalem in AD 70.

## The Temple and Synagogue System

The Jerusalem temple remained the center of Jewish religious life. It was here that sacrifices were offered, festivals celebrated, and God's presence was believed to dwell in a special way. The temple complex was both a religious center and an economic powerhouse.

Synagogues served as local centers of worship and community life throughout Palestine and the Diaspora. Here Jews gathered for prayer, Scripture reading, and religious instruction. The synagogue system would later provide a ready-made network for the spread of the Christian gospel.

## Social and Economic Conditions

First-century Palestine was primarily agricultural, with most people living in small villages. There was a significant gap between the wealthy elite and the common people. Taxation was heavy, with Jews paying taxes to both the Roman government and the temple hierarchy.

## Messianic Expectations

By the time of Jesus' birth, Jewish expectations of a coming Messiah had reached fever pitch. Different groups had varying ideas about what the Messiah would do, but most expected a political deliverer who would overthrow Roman rule and restore Israel's independence and glory.`,
        duration: 40,
        orderIndex: 2,
        unitId: unit1.id,
      },
      {
        title: "Chapter 3: Introduction to the Four Gospels",
        content: `# Chapter 3: Introduction to the Four Gospels

## Learning Objectives:
By the end of this chapter, you will be able to:
• Understand the purpose and unique perspective of each Gospel
• Explain the synoptic problem and its proposed solutions
• Appreciate the historical reliability and theological richness of the Gospel accounts
• Recognize how each Gospel presents Jesus for different audiences

## Scripture Foundation:
"Now Jesus did many other signs in the presence of the disciples, which are not written in this book; but these are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in his name." (John 20:30-31, ESV)

## The Nature of the Gospels

The four Gospels are not merely historical biographies, but theological portraits of Jesus Christ. Each Gospel writer, under the inspiration of the Holy Spirit, selected and arranged material to present Jesus in a particular light for specific audiences.

## The Gospel of Matthew

Matthew, a former tax collector, wrote primarily for Jewish readers. His Gospel emphasizes Jesus as the promised Messiah and King of the Jews. Matthew frequently quotes Old Testament prophecies to demonstrate their fulfillment in Jesus, and he organizes much of Jesus' teaching into five major discourses, perhaps echoing the five books of Moses.

Key themes include:
- Jesus as the Son of David and rightful King
- The Kingdom of Heaven
- Fulfillment of Old Testament prophecy
- The new covenant community

## The Gospel of Mark

Mark, likely recording the preaching of the apostle Peter, wrote for Roman readers. His Gospel is the shortest and most action-packed, emphasizing Jesus as the powerful Son of God who came to serve and suffer. Mark frequently uses the word "immediately" to convey the urgency of Jesus' mission.

Key themes include:
- Jesus as the suffering Servant
- The cost of discipleship
- Jesus' divine power over nature, demons, and disease
- The necessity of the cross

## The Gospel of Luke

Luke, a Gentile physician and companion of Paul, wrote for a Greek audience. His Gospel emphasizes Jesus' compassion for the marginalized and His role as Savior of all people. Luke provides the most detailed account of Jesus' birth and early life, and he pays special attention to Jesus' relationships with women, children, and social outcasts.

Key themes include:
- Jesus as Savior of all people
- God's concern for the poor and marginalized
- The role of the Holy Spirit
- Prayer and worship

## The Gospel of John

John, the beloved disciple, wrote later than the other three Evangelists. His Gospel is highly theological, emphasizing Jesus' divine nature and eternal relationship with the Father. Rather than focusing on parables, John records seven miraculous signs and seven "I AM" statements that reveal Jesus' deity.

Key themes include:
- Jesus as the eternal Word of God
- Eternal life through faith in Christ
- Light versus darkness
- Love as the mark of discipleship

## The Synoptic Problem

The first three Gospels (Matthew, Mark, and Luke) are called "synoptic" because they present a similar overall view of Jesus' life and ministry. They share much material in common, often using nearly identical wording. This raises questions about their literary relationship.

The most widely accepted solution is Markan priority: Mark wrote first, and Matthew and Luke independently used Mark as a source while also drawing from a hypothetical source called "Q" (from the German word Quelle, meaning "source") for material they share but Mark lacks.

## Historical Reliability

From a Reformed Baptist perspective, we affirm the complete historical reliability of the Gospel accounts. The Evangelists were either eyewitnesses or recorded the testimony of eyewitnesses, and they wrote under the inspiration of the Holy Spirit. While each Gospel has its own theological emphasis, they all present accurate historical information about Jesus Christ.

## Theological Unity

Despite their differences in emphasis and audience, the four Gospels present a unified portrait of Jesus Christ as both fully God and fully man, who came to earth to live a perfect life, die for our sins, and rise again for our justification. Together, they provide a rich, multifaceted understanding of who Jesus is and what He accomplished for our salvation.`,
        duration: 35,
        orderIndex: 3,
        unitId: unit1.id,
      }
    ];

    // UNIT 2 LESSONS (Chapters 4-8)
    const unit2Lessons = [
      {
        title: "Chapter 4: The Incarnation - The Birth of Jesus",
        content: `# Chapter 4: The Incarnation - The Birth of Jesus

## Learning Objectives:
By the end of this chapter, you will be able to:
• Explain the theological significance of the virgin birth
• Understand the historical circumstances surrounding Jesus' birth
• Appreciate the fulfillment of Old Testament prophecies in the nativity
• Recognize the incarnation as the central miracle of Christianity

## Scripture Foundation:
"And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth." (John 1:14, ESV)

## The Annunciation

The angel Gabriel's announcement to Mary represents one of the most significant moments in human history. Mary's humble submission ("Let it be unto me according to your word") demonstrates perfect faith and obedience to God's will.

## The Virgin Birth

The virgin birth is not merely a biological miracle but a theological necessity. It demonstrates that Jesus' conception was a divine act, ensuring His sinless nature while maintaining His full humanity. This doctrine is foundational to orthodox Christianity.

## The Journey to Bethlehem

The Roman census that required Joseph and Mary to travel to Bethlehem fulfilled Micah's prophecy about the Messiah's birthplace. God's sovereignty orchestrated even pagan government policies to accomplish His purposes.

## The Birth of Jesus

Jesus' birth in humble circumstances - in a stable, laid in a manger - signals that this King came not in worldly pomp but in humility to identify with the lowly and poor.

## The Shepherds and Angels

God chose to announce the Savior's birth first to shepherds, representing the common people whom Jesus came to save. The angelic announcement proclaims the gospel: "good news of great joy" for all people.

## The Visit of the Magi

The visit of the wise men from the east demonstrates that Jesus came as Savior not only for Jews but for all nations. Their gifts of gold, frankincense, and myrrh symbolically represent Jesus' kingship, deity, and sacrificial death.

## Theological Significance

The incarnation means that the eternal Son of God took on human nature without ceasing to be God. This mystery, while beyond full human comprehension, is essential to our salvation - only one who is both fully God and fully man could serve as mediator between God and humanity.`,
        duration: 40,
        orderIndex: 1,
        unitId: unit2.id,
      },
      {
        title: "Chapter 5: The Preparation of Jesus - Baptism and Temptation", 
        content: `# Chapter 5: The Preparation of Jesus - Baptism and Temptation

## Learning Objectives:
• Understand the significance of Jesus' baptism by John
• Explain why Jesus was tempted and how He overcame temptation
• Recognize the role of the Holy Spirit in Jesus' ministry
• Apply lessons from Jesus' temptation to personal spiritual warfare

## Scripture Foundation:
"Then Jesus was led up by the Spirit into the wilderness to be tempted by the devil." (Matthew 4:1, ESV)

## John the Baptist's Ministry

John the Baptist prepared the way for Jesus through his preaching of repentance and baptism. His ministry fulfilled Isaiah's prophecy of a voice crying in the wilderness, preparing the Lord's way.

## Jesus' Baptism

Though sinless, Jesus submitted to baptism to "fulfill all righteousness." His baptism marks the beginning of His public ministry and demonstrates His complete identification with humanity.

The Trinity is clearly revealed at Jesus' baptism: the Son is baptized, the Holy Spirit descends like a dove, and the Father speaks from heaven declaring His pleasure in His Son.

## The Temptation in the Wilderness

Immediately after His baptism, Jesus was led by the Holy Spirit into the wilderness to be tempted by Satan. This was not an accident but a necessary part of His preparation for ministry.

### The Three Temptations:

1. **Turn stones to bread** - Temptation to use His divine power for personal comfort rather than trusting the Father's provision
2. **Jump from the temple** - Temptation to test God and seek spectacular signs rather than walking by faith  
3. **Worship Satan for worldly kingdoms** - Temptation to achieve His messianic goals through compromise rather than the cross

## Jesus' Victory

Jesus overcame each temptation by quoting Scripture, demonstrating the power of God's Word in spiritual warfare. His victory shows that temptation itself is not sin - yielding to temptation is sin.

## Theological Implications

Jesus' temptation proves His full humanity while His victory demonstrates His sinless perfection. As our High Priest, He can sympathize with our weaknesses because He was tempted in every way as we are, yet without sin.`,
        duration: 35,
        orderIndex: 2,
        unitId: unit2.id,
      },
      {
        title: "Chapter 6: The Calling of the Twelve Disciples",
        content: `# Chapter 6: The Calling of the Twelve Disciples

## Learning Objectives:
• Understand Jesus' method of calling disciples
• Recognize the diverse backgrounds of the twelve apostles
• Explain the difference between disciples and apostles
• Apply principles of discipleship to modern Christian living

## Scripture Foundation:
"And he said to them, 'Follow me, and I will make you fishers of men.'" (Matthew 4:19, ESV)

## Jesus' Strategy

Rather than building an organization, Jesus invested deeply in a small group of men who would carry on His mission after His ascension. This demonstrates the power of multiplication through personal discipleship.

## The Twelve Apostles

The twelve came from diverse backgrounds - fishermen, a tax collector, a political zealot - demonstrating that God can use anyone willing to follow Christ. Their human weaknesses and failures show that God's power is made perfect in weakness.

## The Cost of Discipleship

Jesus made clear that following Him would require sacrifice. True discipleship involves taking up one's cross daily, counting the cost, and being willing to forsake everything for Christ.

## Training for Ministry

Jesus taught His disciples through example, direct instruction, and hands-on experience. He gradually gave them increasing responsibility, culminating in their commission to preach the gospel to all nations.`,
        duration: 30,
        orderIndex: 3,
        unitId: unit2.id,
      },
      {
        title: "Chapter 7: Jesus' Early Miracles - Demonstrating Divine Authority",
        content: `# Chapter 7: Jesus' Early Miracles - Demonstrating Divine Authority

## Learning Objectives:
• Understand the purpose and significance of Jesus' miracles
• Categorize different types of miracles Jesus performed
• Explain how miracles authenticated Jesus' divine authority
• Distinguish between miracles and magic or natural phenomena

## Scripture Foundation:
"This, the first of his signs, Jesus did at Cana in Galilee, and manifested his glory. And his disciples believed in him." (John 2:11, ESV)

## The Purpose of Miracles

Jesus' miracles served multiple purposes: demonstrating His divine authority, authenticating His message, showing compassion for human suffering, and pointing to spiritual truths about His identity and mission.

## Categories of Miracles

1. **Nature miracles** - Calming storms, walking on water, feeding thousands
2. **Healing miracles** - Restoring sight, cleansing lepers, healing paralysis
3. **Resurrection miracles** - Raising the dead to life
4. **Exorcisms** - Casting out demons

## The Wedding at Cana

Jesus' first recorded miracle, turning water into wine, demonstrates His power over the natural order and points to the joy and abundance of God's kingdom. It also shows His concern for ordinary human celebrations and needs.

## Healing the Sick

Jesus' healing ministry demonstrated His compassion and power over disease and disability. These miracles often served as object lessons about spiritual healing and salvation.

## Authority Over Nature

Miracles like calming the storm and walking on water revealed Jesus' divine authority over the natural world, demonstrating that He is the Creator who sustains all things by His powerful word.

## Raising the Dead

The ultimate demonstration of Jesus' power was His ability to raise the dead, foreshadowing His own resurrection and pointing to His victory over death itself.`,
        duration: 35,
        orderIndex: 4,
        unitId: unit2.id,
      },
      {
        title: "Chapter 8: The Growing Opposition",
        content: `# Chapter 8: The Growing Opposition

## Learning Objectives:
• Identify the sources and reasons for opposition to Jesus
• Understand how religious leaders responded to Jesus' teaching and miracles
• Explain the role of opposition in God's plan of salvation
• Recognize similar patterns of opposition to the gospel today

## Scripture Foundation:
"He was in the world, and the world was made through him, yet the world did not know him." (John 1:10, ESV)

## Sources of Opposition

Opposition to Jesus came from various sources: religious leaders who saw Him as a threat to their authority, political figures who feared unrest, and even family members who misunderstood His mission.

## Sabbath Controversies

Many conflicts arose over Jesus' interpretation of Sabbath law. While the religious leaders focused on external rules, Jesus emphasized the Sabbath's true purpose: blessing and healing humanity.

## Accusations of Blasphemy

The religious leaders accused Jesus of blasphemy for claiming divine authority - to forgive sins, to be equal with God, and to be the Son of God. Ironically, their charges were accurate descriptions of who Jesus truly was.

## The Unpardonable Sin

When the Pharisees attributed Jesus' miracles to Satan rather than God, they committed the sin of blasphemy against the Holy Spirit - a willful, persistent rejection of clear evidence of God's work.

## God's Sovereign Plan

Even opposition to Jesus served God's purposes, ultimately leading to the cross where salvation would be accomplished. What enemies meant for evil, God used for the greatest good.`,
        duration: 30,
        orderIndex: 5,
        unitId: unit2.id,
      }
    ];

    // UNIT 3 LESSONS (Chapters 9-14)
    const unit3Lessons = [
      {
        title: "Chapter 9: The Sermon on the Mount - The Kingdom Ethic (Matthew 5-7)",
        content: `# Chapter 9: The Sermon on the Mount - The Kingdom Ethic (Matthew 5-7)

## Learning Objectives:
• Understand the structure and purpose of the Sermon on the Mount
• Explain the Beatitudes and their significance for Christian character
• Analyze Jesus' teaching on the Law, prayer, and discipleship
• Apply kingdom principles to contemporary Christian living

## Scripture Foundation:
"Blessed are the poor in spirit, for theirs is the kingdom of heaven." (Matthew 5:3, ESV)

## The Setting and Structure
The Sermon on the Mount represents the most comprehensive collection of Jesus' ethical teachings. Given from a mountainside to His disciples with crowds listening, this discourse establishes the character and conduct expected of kingdom citizens.

## The Beatitudes (Matthew 5:1-12)
The eight Beatitudes describe the character traits of those who belong to God's kingdom. They are not requirements for entrance but descriptions of those whom God has blessed with spiritual transformation.

## Jesus and the Law (Matthew 5:17-48)
Jesus didn't come to abolish the Law but to fulfill it. His "You have heard... but I say" statements show that He has authority to interpret and deepen the Law's requirements, addressing not just external actions but heart attitudes.

## Kingdom Living (Matthew 6-7)
Jesus teaches about authentic spirituality versus religious hypocrisy, covering prayer, fasting, money, worry, and judging others. The Golden Rule and the narrow gate emphasize the demanding nature of discipleship.`,
        duration: 50,
        orderIndex: 1,
        unitId: unit3.id,
      },
      {
        title: "Chapter 10: The Parables of the Kingdom",
        content: `# Chapter 10: The Parables of the Kingdom

## Learning Objectives:
• Understand why Jesus taught in parables
• Identify key themes in Jesus' kingdom parables
• Interpret parables using proper hermeneutical principles
• Apply parable teachings to modern spiritual life

## Scripture Foundation:
"The kingdom of heaven is like a grain of mustard seed that a man took and sowed in his field." (Matthew 13:31, ESV)

## Why Parables?
Jesus used parables to reveal truth to believers while concealing it from those who hardened their hearts against Him. These earthly stories with heavenly meanings required spiritual discernment to understand.

## Major Kingdom Parables
- The Sower (Matthew 13:3-9)
- The Wheat and Weeds (Matthew 13:24-30)
- The Mustard Seed (Matthew 13:31-32)
- The Hidden Treasure (Matthew 13:44)
- The Pearl of Great Price (Matthew 13:45-46)
- The Net (Matthew 13:47-50)

## Interpreting Parables
Each parable typically has one central truth. We must understand the cultural context and avoid forcing every detail into the interpretation. The focus should be on what Jesus intended to teach His original audience.`,
        duration: 45,
        orderIndex: 2,
        unitId: unit3.id,
      },
      {
        title: "Chapter 11: The 'I AM' Statements of Jesus (John's Gospel)",
        content: `# Chapter 11: The "I AM" Statements of Jesus (John's Gospel)

## Learning Objectives:
• Identify the seven "I AM" statements in John's Gospel
• Understand the Old Testament background of "I AM"
• Explain how these statements reveal Jesus' divine nature
• Apply the truths of who Jesus is to personal faith

## Scripture Foundation:
"Jesus said to them, 'Truly, truly, I say to you, before Abraham was, I am.'" (John 8:58, ESV)

## The Divine Name
When Jesus used "I AM" (Greek: ego eimi), He was claiming the divine name revealed to Moses at the burning bush (Exodus 3:14). This was unmistakable to Jewish listeners and often provoked strong reactions.

## The Seven "I AM" Statements:
1. "I am the bread of life" (John 6:35)
2. "I am the light of the world" (John 8:12)
3. "I am the door" (John 10:7)
4. "I am the good shepherd" (John 10:11)
5. "I am the resurrection and the life" (John 11:25)
6. "I am the way, the truth, and the life" (John 14:6)
7. "I am the true vine" (John 15:1)

Each statement reveals an essential aspect of who Jesus is and what He provides for those who believe in Him.`,
        duration: 40,
        orderIndex: 3,
        unitId: unit3.id,
      },
      {
        title: "Chapter 12: Miracles and Their Meaning",
        content: `# Chapter 12: Miracles and Their Meaning

## Learning Objectives:
• Understand the theological significance of Jesus' miracles
• Categorize different types of miraculous works
• Explain how miracles authenticate Jesus' claims
• Address modern questions about miracles and faith

## Scripture Foundation:
"Now Jesus did many other signs in the presence of the disciples, which are not written in this book; but these are written so that you may believe that Jesus is the Christ, the Son of God." (John 20:30-31, ESV)

## The Purpose of Miracles
John calls Jesus' miracles "signs" because they point beyond themselves to spiritual truths about Jesus' identity and mission. They demonstrate His power over sin, sickness, death, and natural forces.

## Categories of Miraculous Works
1. **Healing miracles** - Restoration of physical wholeness
2. **Nature miracles** - Power over natural forces
3. **Provision miracles** - Supernatural supply of needs
4. **Resurrection miracles** - Power over death itself

## Theological Significance
Miracles reveal Jesus as the Creator who entered His creation to restore what sin had broken. They provide foretastes of the ultimate restoration that will come in the new heavens and new earth.`,
        duration: 35,
        orderIndex: 4,
        unitId: unit3.id,
      },
      {
        title: "Chapter 13: The Upper Room Discourse (John 13-17)",
        content: `# Chapter 13: The Upper Room Discourse (John 13-17)

## Learning Objectives:
• Understand the context and significance of Jesus' final teachings
• Explain Jesus' promises about the Holy Spirit
• Analyze the High Priestly Prayer
• Apply Jesus' farewell instructions to Christian living

## Scripture Foundation:
"A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another." (John 13:34, ESV)

## The Last Supper Setting
In the intimate setting of the upper room, Jesus prepared His disciples for His departure through washing their feet, instituting the Lord's Supper, and giving extended teaching about their future ministry.

## The Promise of the Holy Spirit
Jesus promised that the Holy Spirit would come as another Helper (Parakletos) who would teach, comfort, convict, and guide the disciples after His ascension.

## The High Priestly Prayer (John 17)
Jesus' prayer for His disciples and future believers reveals His heart for the unity, protection, and sanctification of His people. This prayer provides insight into Jesus' intercession for us today.`,
        duration: 45,
        orderIndex: 5,
        unitId: unit3.id,
      },
      {
        title: "Chapter 14: Final Teachings and Warnings",
        content: `# Chapter 14: Final Teachings and Warnings

## Learning Objectives:
• Understand Jesus' warnings about false teachers and end times
• Explain the Olivet Discourse and its significance
• Identify signs of spiritual maturity Jesus emphasized
• Apply Jesus' final teachings to faithful Christian living

## Scripture Foundation:
"Heaven and earth will pass away, but my words will not pass away." (Matthew 24:35, ESV)

## The Olivet Discourse
Jesus' teaching on the Mount of Olives addressed questions about the destruction of Jerusalem and His second coming. He warned of deception, persecution, and the need for readiness.

## Warnings About False Teachers
Jesus warned that false prophets would arise, performing signs and wonders to deceive even the elect if possible. Discernment based on Scripture and spiritual fruit is essential.

## Parables of Readiness
The parables of the ten virgins, talents, and sheep and goats emphasize the need for spiritual preparation and faithful service while awaiting Christ's return.`,
        duration: 40,
        orderIndex: 6,
        unitId: unit3.id,
      }
    ];

    // UNIT 4 LESSONS (Chapters 15-18)
    const unit4Lessons = [
      {
        title: "Chapter 15: The Triumphal Entry and Final Week in Jerusalem",
        content: `# Chapter 15: The Triumphal Entry and Final Week in Jerusalem

## Learning Objectives:
• Understand the significance of Jesus' triumphal entry
• Explain the cleansing of the temple and its meaning
• Analyze Jesus' conflicts with religious leaders
• Recognize the fulfillment of messianic prophecies

## Scripture Foundation:
"Blessed is he who comes in the name of the Lord! Blessed is the coming kingdom of our father David!" (Mark 11:9-10, ESV)

## The Triumphal Entry
Jesus' entry into Jerusalem on a donkey fulfilled Zechariah's prophecy about the coming king. The crowds' hosannas showed their recognition of His messianic claims, though they misunderstood His mission.

## The Cleansing of the Temple
Jesus' cleansing of the temple demonstrated His authority as the Son of God and His zeal for proper worship. This act symbolically judged the corrupt religious system.

## Confrontations with Religious Leaders
During His final week, Jesus engaged in intense debates with Pharisees, Sadducees, and scribes, exposing their hypocrisy and false teaching while affirming His divine authority.

## The Cursing of the Fig Tree
The withered fig tree served as an object lesson about Israel's spiritual barrenness and the judgment that would come upon the unfruitful nation.`,
        duration: 40,
        orderIndex: 1,
        unitId: unit4.id,
      },
      {
        title: "Chapter 16: The Last Supper and Gethsemane",
        content: `# Chapter 16: The Last Supper and Gethsemane

## Learning Objectives:
• Understand the significance of the Last Supper and Lord's Supper
• Explain Jesus' predictions about Peter's denial and Judas' betrayal
• Analyze Jesus' agony in Gethsemane
• Recognize Jesus' submission to the Father's will

## Scripture Foundation:
"And he took bread, and when he had given thanks, he broke it and gave it to them, saying, 'This is my body, which is given for you. Do this in remembrance of me.'" (Luke 22:19, ESV)

## The Institution of the Lord's Supper
During the Passover meal, Jesus transformed the ancient feast into a new covenant meal commemorating His sacrificial death. The bread and cup symbolize His broken body and shed blood.

## Predictions of Betrayal and Denial
Jesus' foreknowledge of Judas' betrayal and Peter's denial demonstrated both His divine omniscience and the fulfillment of Scripture. Even in betrayal, God's plan was accomplished.

## The Agony in Gethsemane
Jesus' intense prayer in the garden revealed both His full humanity (in His emotional agony) and His perfect obedience (in His submission to the Father's will). His wrestling in prayer shows the reality of the spiritual battle.

## The Arrest
When the soldiers came to arrest Jesus, He went willingly, protecting His disciples and fulfilling His mission. His question "Whom do you seek?" and the soldiers' falling backward revealed His divine power even in apparent weakness.`,
        duration: 45,
        orderIndex: 2,
        unitId: unit4.id,
      },
      {
        title: "Chapter 17: The Trials, Crucifixion, and Death of Jesus",
        content: `# Chapter 17: The Trials, Crucifixion, and Death of Jesus

## Learning Objectives:
• Understand the legal proceedings against Jesus
• Explain the theological significance of the crucifixion
• Analyze the seven words from the cross
• Recognize the cosmic implications of Jesus' death

## Scripture Foundation:
"And Jesus cried out again with a loud voice and yielded up his spirit." (Matthew 27:50, ESV)

## The Trials of Jesus
Jesus faced six trials: three religious (before Annas, Caiaphas, and the Sanhedrin) and three civil (before Pilate, Herod, and Pilate again). These trials were marked by false accusations, illegal procedures, and cowardice.

## The Way to the Cross
The path to Golgotha included mockery, scourging, and the bearing of the cross. Simon of Cyrene was compelled to help carry the cross, showing that discipleship involves sharing in Christ's sufferings.

## The Crucifixion
Crucifixion was the most shameful and painful form of execution in the Roman world. That the Son of God would die such a death demonstrates the depth of His love and the seriousness of sin.

## The Seven Words from the Cross
1. "Father, forgive them, for they know not what they do."
2. "Today you will be with me in paradise."
3. "Woman, behold, your son!"
4. "My God, my God, why have you forsaken me?"
5. "I thirst."
6. "It is finished."
7. "Father, into your hands I commit my spirit."

## The Cosmic Significance
The darkness, torn veil, earthquake, and resurrection of saints showed that Jesus' death was no ordinary execution but the cosmic event that dealt with sin and death forever.`,
        duration: 50,
        orderIndex: 3,
        unitId: unit4.id,
      },
      {
        title: "Chapter 18: The Resurrection - The Cornerstone of Faith",
        content: `# Chapter 18: The Resurrection - The Cornerstone of Faith

## Learning Objectives:
• Understand the historical evidence for Jesus' resurrection
• Explain the theological significance of the resurrection
• Analyze the post-resurrection appearances
• Apply resurrection truth to Christian hope and living

## Scripture Foundation:
"He is not here, for he has risen, as he said. Come, see the place where he lay." (Matthew 28:6, ESV)

## The Empty Tomb
The discovery of the empty tomb by the women on Easter morning provides the first evidence of Jesus' resurrection. The grave clothes left behind showed this was no grave robbery.

## The Post-Resurrection Appearances
Jesus appeared to various individuals and groups over 40 days, providing multiple witnesses to His resurrection. These appearances were not hallucinations but objective encounters with the risen Christ.

## The Theological Significance
The resurrection vindicates Jesus' claims, validates His sacrifice for sin, guarantees our justification, and provides the power for Christian living. It is the cornerstone of Christian faith.

## The Great Commission
Jesus' final commission to His disciples to make disciples of all nations provides the mission of the church until His return. The promise of His presence gives confidence for this task.

## The Ascension
Jesus' ascension marks the completion of His earthly ministry and the beginning of His heavenly intercession. He now reigns at the Father's right hand, preparing a place for His people.

## Implications for Christian Living
The resurrection provides hope for the future, power for the present, and purpose for life. It transforms how we view death, suffering, and our ultimate destiny in Christ.`,
        duration: 45,
        orderIndex: 4,
        unitId: unit4.id,
      }
    ];

    // Insert all lessons and create associated content
    const allLessons = [...unit1Lessons, ...unit2Lessons, ...unit3Lessons, ...unit4Lessons];
    
    for (let i = 0; i < allLessons.length; i++) {
      const lessonData = allLessons[i];
      
      const [lesson] = await db.insert(lessons).values(lessonData).returning();
      
      // Create reflection questions for each lesson
      const reflectionQuestionData = [
        {
          lessonId: lesson.id,
          question: `How does this chapter deepen your understanding of God's sovereignty and timing?`,
          orderIndex: 1,
        },
        {
          lessonId: lesson.id,
          question: `What aspects of this lesson challenge your previous understanding of this period/topic?`,
          orderIndex: 2,
        },
        {
          lessonId: lesson.id,
          question: `How can you apply the theological principles from this lesson to your personal faith and daily life?`,
          orderIndex: 3,
        }
      ];
      
      await db.insert(reflectionQuestions).values(reflectionQuestionData);
      
      // Create quiz for each lesson
      const [quiz] = await db.insert(quizzes).values({
        lessonId: lesson.id,
        title: `${lessonData.title} - Quiz`,
        timeLimit: lessonData.title.includes('Chapter 1') ? 45 : 30, // Chapter 1 has more questions
        passingScore: 70,
      }).returning();
      
      // Create basic quiz questions (will be expanded for Chapter 1)
      if (lessonData.title.includes('Chapter 1')) {
        // Use the comprehensive Chapter 1 questions we already created
        continue; // Skip basic questions for Chapter 1 as we already have comprehensive ones
      } else {
        // Create basic quiz questions for other chapters
        const basicQuizQuestions = [
          {
            quizId: quiz.id,
            question: `What is the main theme of ${lessonData.title}?`,
            options: JSON.stringify({
              "A": "Political history",
              "B": "Religious development", 
              "C": "God's sovereign preparation and plan",
              "D": "Cultural changes"
            }),
            correctAnswer: 'C',
            explanation: 'Each chapter demonstrates God\'s sovereign hand in preparing the world for Christ\'s coming.',
            orderIndex: 1,
          },
          {
            quizId: quiz.id,
            question: `What is the key Scripture foundation for this chapter?`,
            options: JSON.stringify({
              "A": "A passage about God's timing and sovereignty",
              "B": "A historical account",
              "C": "A moral teaching",
              "D": "A prophetic vision"
            }),
            correctAnswer: 'A',
            explanation: 'Each chapter is built on Scripture that reveals God\'s perfect timing and sovereign plan.',
            orderIndex: 2,
          },
          {
            quizId: quiz.id,
            question: `How does this chapter contribute to understanding Jesus' ministry?`,
            options: JSON.stringify({
              "A": "It provides background context",
              "B": "It shows God's preparation",
              "C": "It reveals the world Jesus entered",
              "D": "All of the above"
            }),
            correctAnswer: 'D',
            explanation: 'Each chapter provides essential context for understanding Jesus\' life and ministry.',
            orderIndex: 3,
          }
        ];
        
        await db.insert(quizQuestions).values(basicQuizQuestions);
      }
      
      // Create additional resources
      await db.insert(additionalResources).values({
        lessonId: lesson.id,
        title: `Study Guide for ${lessonData.title}`,
        type: 'document',
        url: '#',
        description: `Comprehensive study guide with additional readings and discussion questions.`,
      });
    }

    console.log(`Created ${allLessons.length} lessons with quizzes and resources`);
    console.log("Complete course seed completed successfully!");

    return { course, units: [unit1, unit2, unit3, unit4], lessonCount: allLessons.length };

  } catch (error) {
    console.error("Error seeding complete course:", error);
    throw error;
  }
}