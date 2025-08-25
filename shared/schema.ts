import { sql, relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  password: varchar("password"), // for email/password auth, null for OAuth users
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("student"), // student or teacher
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  duration: varchar("duration", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course Units table
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  orderIndex: integer("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Lessons table
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id").references(() => units.id).notNull(),
  classId: integer("class_id").references(() => teacherClasses.id), // null for global lessons
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  duration: integer("duration"), // in minutes
  orderIndex: integer("order_index").notNull(),
  videoUrl: varchar("video_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Reflection Questions table
export const reflectionQuestions = pgTable("reflection_questions", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  classId: integer("class_id").references(() => teacherClasses.id), // null for global questions
  question: text("question").notNull(),
  correctAnswer: varchar("correct_answer", { length: 1 }),
  explanation: text("explanation"),
  orderIndex: integer("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Additional Resources table
export const additionalResources = pgTable("additional_resources", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  classId: integer("class_id").references(() => teacherClasses.id), // null for global resources
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  url: varchar("url"),
  type: varchar("type", { length: 50 }), // article, video, pdf, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// Quizzes table
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  classId: integer("class_id").references(() => teacherClasses.id), // null for global quizzes
  title: varchar("title", { length: 255 }).notNull(),
  timeLimit: integer("time_limit"), // in minutes
  passingScore: integer("passing_score").default(70),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz Questions table
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // array of options
  correctAnswer: varchar("correct_answer", { length: 10 }).notNull(),
  explanation: text("explanation"),
  orderIndex: integer("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Unit Exams table (separate from regular quizzes)
export const unitExams = pgTable("unit_exams", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id").references(() => units.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  timeLimit: integer("time_limit"), // in minutes
  passingScore: integer("passing_score").default(70),
  createdAt: timestamp("created_at").defaultNow(),
});

// Course Enrollments table
export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  progress: integer("progress").default(0), // percentage 0-100
});

// Lesson Progress table
export const lessonProgress = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent").default(0), // in minutes
});

// Reflection Responses table
export const reflectionResponses = pgTable("reflection_responses", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  questionId: integer("question_id").references(() => reflectionQuestions.id).notNull(),
  response: text("response"),
  isCorrect: boolean("is_correct"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

// Quiz Locks table - to lock the site when taking a quiz
export const quizLocks = pgTable("quiz_locks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  lockedAt: timestamp("locked_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz Attempts table
export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  score: integer("score"), // percentage 0-100
  timeSpent: integer("time_spent"), // in minutes
  isPassed: boolean("is_passed").default(false),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Quiz Responses table
export const quizResponses = pgTable("quiz_responses", {
  id: serial("id").primaryKey(),
  attemptId: integer("attempt_id").references(() => quizAttempts.id).notNull(),
  questionId: integer("question_id").references(() => quizQuestions.id).notNull(),
  selectedAnswer: varchar("selected_answer", { length: 10 }),
  isCorrect: boolean("is_correct").default(false),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  courseEnrollments: many(courseEnrollments),
  coursesCreated: many(courses),
  lessonProgress: many(lessonProgress),
  reflectionResponses: many(reflectionResponses),
  quizAttempts: many(quizAttempts),
  teacherClasses: many(teacherClasses),
  teacherClassStudents: many(teacherClassStudents),
  teacherMaterials: many(teacherMaterials),
  classAnnouncements: many(classAnnouncements),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  creator: one(users, {
    fields: [courses.createdBy],
    references: [users.id],
  }),
  units: many(units),
  enrollments: many(courseEnrollments),
}));

export const unitsRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
  unitExam: many(unitExams),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  reflectionQuestions: many(reflectionQuestions),
  additionalResources: many(additionalResources),
  quizzes: many(quizzes),
  progress: many(lessonProgress),
}));

export const reflectionQuestionsRelations = relations(reflectionQuestions, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [reflectionQuestions.lessonId],
    references: [lessons.id],
  }),
  responses: many(reflectionResponses),
}));

export const additionalResourcesRelations = relations(additionalResources, ({ one }) => ({
  lesson: one(lessons, {
    fields: [additionalResources.lessonId],
    references: [lessons.id],
  }),
}));

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [quizzes.lessonId],
    references: [lessons.id],
  }),
  questions: many(quizQuestions),
  attempts: many(quizAttempts),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one, many }) => ({
  quiz: one(quizzes, {
    fields: [quizQuestions.quizId],
    references: [quizzes.id],
  }),
  responses: many(quizResponses),
}));

export const unitExamsRelations = relations(unitExams, ({ one }) => ({
  unit: one(units, {
    fields: [unitExams.unitId],
    references: [units.id],
  }),
}));

export const courseEnrollmentsRelations = relations(courseEnrollments, ({ one }) => ({
  user: one(users, {
    fields: [courseEnrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [courseEnrollments.courseId],
    references: [courses.id],
  }),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const reflectionResponsesRelations = relations(reflectionResponses, ({ one }) => ({
  user: one(users, {
    fields: [reflectionResponses.userId],
    references: [users.id],
  }),
  question: one(reflectionQuestions, {
    fields: [reflectionResponses.questionId],
    references: [reflectionQuestions.id],
  }),
}));

export const quizAttemptsRelations = relations(quizAttempts, ({ one, many }) => ({
  user: one(users, {
    fields: [quizAttempts.userId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [quizAttempts.quizId],
    references: [quizzes.id],
  }),
  responses: many(quizResponses),
}));

export const quizResponsesRelations = relations(quizResponses, ({ one }) => ({
  attempt: one(quizAttempts, {
    fields: [quizResponses.attemptId],
    references: [quizAttempts.id],
  }),
  question: one(quizQuestions, {
    fields: [quizResponses.questionId],
    references: [quizQuestions.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUnitSchema = createInsertSchema(units).omit({
  id: true,
  createdAt: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReflectionQuestionSchema = createInsertSchema(reflectionQuestions).omit({
  id: true,
  createdAt: true,
});

export const insertAdditionalResourceSchema = createInsertSchema(additionalResources).omit({
  id: true,
  createdAt: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true,
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({
  id: true,
  createdAt: true,
});

export const insertUnitExamSchema = createInsertSchema(unitExams).omit({
  id: true,
  createdAt: true,
});

export const insertCourseEnrollmentSchema = createInsertSchema(courseEnrollments).omit({
  id: true,
  enrolledAt: true,
});

export const insertLessonProgressSchema = createInsertSchema(lessonProgress).omit({
  id: true,
});

export const insertReflectionResponseSchema = createInsertSchema(reflectionResponses).omit({
  id: true,
  submittedAt: true,
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({
  id: true,
  startedAt: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
});


// Teacher Classes table - for teacher-student relationships
export const teacherClasses = pgTable("teacher_classes", {
  id: serial("id").primaryKey(),
  teacherId: varchar("teacher_id").references(() => users.id).notNull(),
  className: varchar("class_name", { length: 255 }).notNull(),
  description: text("description"),
  courseId: integer("course_id").references(() => courses.id), // Can be null initially
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Teacher Class Students table - many-to-many relationship
export const teacherClassStudents = pgTable("teacher_class_students", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => teacherClasses.id).notNull(),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Class Announcements table for teacher chat/messages
export const classAnnouncements = pgTable("class_announcements", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => teacherClasses.id).notNull(),
  teacherId: varchar("teacher_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).default("message"), // "message", "assignment", "announcement"
  attachmentUrl: varchar("attachment_url", { length: 500 }),
  attachmentName: varchar("attachment_name", { length: 255 }),
  linkUrl: varchar("link_url", { length: 500 }),
  linkTitle: varchar("link_title", { length: 255 }),
  isPinned: boolean("is_pinned").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Teacher Materials table - for additional materials added by teachers
export const teacherMaterials = pgTable("teacher_materials", {
  id: serial("id").primaryKey(),
  teacherId: varchar("teacher_id").references(() => users.id).notNull(),
  classId: integer("class_id").references(() => teacherClasses.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }).notNull(), // 'link', 'url', 'pdf'
  content: text("content"), // URL for links, file path for PDFs
  fileName: varchar("file_name"), // original file name for PDFs
  isPublic: boolean("is_public").default(false), // visible to all students in class
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations for new tables
export const teacherClassesRelations = relations(teacherClasses, ({ one, many }) => ({
  teacher: one(users, {
    fields: [teacherClasses.teacherId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [teacherClasses.courseId],
    references: [courses.id],
  }),
  students: many(teacherClassStudents),
  announcements: many(classAnnouncements),
  materials: many(teacherMaterials),
}));

export const teacherClassStudentsRelations = relations(teacherClassStudents, ({ one }) => ({
  class: one(teacherClasses, {
    fields: [teacherClassStudents.classId],
    references: [teacherClasses.id],
  }),
  student: one(users, {
    fields: [teacherClassStudents.studentId],
    references: [users.id],
  }),
}));

export const classAnnouncementsRelations = relations(classAnnouncements, ({ one }) => ({
  class: one(teacherClasses, {
    fields: [classAnnouncements.classId],
    references: [teacherClasses.id],
  }),
  teacher: one(users, {
    fields: [classAnnouncements.teacherId],
    references: [users.id],
  }),
}));

export const teacherMaterialsRelations = relations(teacherMaterials, ({ one }) => ({
  teacher: one(users, {
    fields: [teacherMaterials.teacherId],
    references: [users.id],
  }),
  class: one(teacherClasses, {
    fields: [teacherMaterials.classId],
    references: [teacherClasses.id],
  }),
  lesson: one(lessons, {
    fields: [teacherMaterials.lessonId],
    references: [lessons.id],
  }),
}));

// Insert schemas for new tables
export const insertTeacherClassSchema = createInsertSchema(teacherClasses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTeacherClassStudentSchema = createInsertSchema(teacherClassStudents).omit({
  id: true,
  enrolledAt: true,
});

export const insertTeacherMaterialSchema = createInsertSchema(teacherMaterials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertUnit = z.infer<typeof insertUnitSchema>;
export type Unit = typeof units.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertReflectionQuestion = z.infer<typeof insertReflectionQuestionSchema>;
export type ReflectionQuestion = typeof reflectionQuestions.$inferSelect;
export type InsertAdditionalResource = z.infer<typeof insertAdditionalResourceSchema>;
export type AdditionalResource = typeof additionalResources.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertUnitExam = z.infer<typeof insertUnitExamSchema>;
export type UnitExam = typeof unitExams.$inferSelect;
export type InsertCourseEnrollment = z.infer<typeof insertCourseEnrollmentSchema>;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InsertLessonProgress = z.infer<typeof insertLessonProgressSchema>;
export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertReflectionResponse = z.infer<typeof insertReflectionResponseSchema>;
export type ReflectionResponse = typeof reflectionResponses.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;

export const insertClassAnnouncementSchema = createInsertSchema(classAnnouncements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ClassAnnouncement = typeof classAnnouncements.$inferSelect;
export type InsertClassAnnouncement = z.infer<typeof insertClassAnnouncementSchema>;
export type InsertTeacherClass = z.infer<typeof insertTeacherClassSchema>;
export type TeacherClass = typeof teacherClasses.$inferSelect;
export type InsertTeacherClassStudent = z.infer<typeof insertTeacherClassStudentSchema>;
export type TeacherClassStudent = typeof teacherClassStudents.$inferSelect;
export type InsertTeacherMaterial = z.infer<typeof insertTeacherMaterialSchema>;
export type TeacherMaterial = typeof teacherMaterials.$inferSelect;

// Authentication schemas
export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["student", "teacher"]).default("student"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;

// ========= NEW SIMPLE TEACHER-STUDENT SYSTEM =========

// Simple Teacher-Student Links 
export const teacherStudentLinks = pgTable("teacher_student_links", {
  id: serial("id").primaryKey(),
  teacherId: varchar("teacher_id").references(() => users.id).notNull(),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  linkedAt: timestamp("linked_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Simple Messages 
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: varchar("sender_id").references(() => users.id).notNull(),
  recipientId: varchar("recipient_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).default("general"), // general, announcement, assignment
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// New Relations
export const teacherStudentLinksRelations = relations(teacherStudentLinks, ({ one }) => ({
  teacher: one(users, {
    fields: [teacherStudentLinks.teacherId],
    references: [users.id],
  }),
  student: one(users, {
    fields: [teacherStudentLinks.studentId],
    references: [users.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  recipient: one(users, {
    fields: [messages.recipientId],
    references: [users.id],
  }),
}));

// New Insert Schemas
export const insertTeacherStudentLinkSchema = createInsertSchema(teacherStudentLinks).omit({
  id: true,
  linkedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

// New Type exports
export type TeacherStudentLink = typeof teacherStudentLinks.$inferSelect;
export type InsertTeacherStudentLink = z.infer<typeof insertTeacherStudentLinkSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
