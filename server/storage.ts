import {
  users,
  courses,
  units,
  lessons,
  reflectionQuestions,
  additionalResources,
  quizzes,
  quizQuestions,
  unitExams,
  courseEnrollments,
  lessonProgress,
  reflectionResponses,
  quizAttempts,
  quizResponses,
  quizLocks,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Unit,
  type InsertUnit,
  type Lesson,
  type InsertLesson,
  type ReflectionQuestion,
  type InsertReflectionQuestion,
  type AdditionalResource,
  type InsertAdditionalResource,
  type Quiz,
  type InsertQuiz,
  type QuizQuestion,
  type InsertQuizQuestion,
  type UnitExam,
  type InsertUnitExam,
  type CourseEnrollment,
  type InsertCourseEnrollment,
  type LessonProgress,
  type InsertLessonProgress,
  type ReflectionResponse,
  type InsertReflectionResponse,
  type QuizAttempt,
  type InsertQuizAttempt,
  type QuizResponse,
  type InsertQuizResponse,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql, count } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Course operations
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course | undefined>;
  
  // Unit operations
  getUnitsByCourse(courseId: number): Promise<Unit[]>;
  getUnit(id: number): Promise<Unit | undefined>;
  createUnit(unit: InsertUnit): Promise<Unit>;
  updateUnit(id: number, unit: Partial<InsertUnit>): Promise<Unit | undefined>;
  
  // Lesson operations
  getLessonsByUnit(unitId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: number, lesson: Partial<InsertLesson>): Promise<Lesson | undefined>;
  
  // Reflection questions
  getReflectionQuestionsByLesson(lessonId: number): Promise<ReflectionQuestion[]>;
  createReflectionQuestion(question: InsertReflectionQuestion): Promise<ReflectionQuestion>;
  
  // Additional resources
  getAdditionalResourcesByLesson(lessonId: number): Promise<AdditionalResource[]>;
  createAdditionalResource(resource: InsertAdditionalResource): Promise<AdditionalResource>;
  
  // Quiz operations
  getQuizzesByLesson(lessonId: number): Promise<Quiz[]>;
  getQuiz(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Quiz questions
  getQuizQuestionsByQuiz(quizId: number): Promise<QuizQuestion[]>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  
  // Unit exams
  getUnitExamsByUnit(unitId: number): Promise<UnitExam[]>;
  getUnitExam(id: number): Promise<UnitExam | undefined>;
  createUnitExam(exam: InsertUnitExam): Promise<UnitExam>;
  
  // Course enrollments
  getCourseEnrollmentsByUser(userId: string): Promise<CourseEnrollment[]>;
  getCourseEnrollment(userId: string, courseId: number): Promise<CourseEnrollment | undefined>;
  createCourseEnrollment(enrollment: InsertCourseEnrollment): Promise<CourseEnrollment>;
  updateCourseEnrollment(userId: string, courseId: number, data: Partial<CourseEnrollment>): Promise<CourseEnrollment | undefined>;
  
  // Lesson progress
  getLessonProgress(userId: string, lessonId: number): Promise<LessonProgress | undefined>;
  createOrUpdateLessonProgress(progress: InsertLessonProgress): Promise<LessonProgress>;
  getLessonProgressByUser(userId: string): Promise<LessonProgress[]>;
  
  // Reflection responses
  getReflectionResponse(userId: string, questionId: number): Promise<ReflectionResponse | undefined>;
  createOrUpdateReflectionResponse(response: InsertReflectionResponse): Promise<ReflectionResponse>;
  
  // Quiz attempts
  getQuizAttemptsByUser(userId: string, quizId: number): Promise<QuizAttempt[]>;
  getQuizAttempt(id: number): Promise<QuizAttempt | undefined>;
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  updateQuizAttempt(id: number, attempt: Partial<QuizAttempt>): Promise<QuizAttempt | undefined>;
  
  // Quiz responses
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponsesByAttempt(attemptId: number): Promise<QuizResponse[]>;
  
  // Quiz locks
  getActiveQuizLock(userId: string): Promise<any>;
  createQuizLock(lock: { userId: string; quizId: number; expiresAt: Date }): Promise<any>;
  clearQuizLock(userId: string): Promise<void>;
  
  // Statistics and reporting
  getCourseStats(courseId: number): Promise<{
    totalEnrollments: number;
    averageProgress: number;
    averageScore: number;
    studentsNeedingAttention: number;
  }>;
  
  getStudentActivity(courseId: number): Promise<Array<{
    userId: string;
    userName: string;
    lastActivity: string;
    progress: number;
    status: string;
  }>>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(asc(courses.title));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(courseData: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(courseData).returning();
    return course;
  }

  async updateCourse(id: number, courseData: Partial<InsertCourse>): Promise<Course | undefined> {
    const [course] = await db
      .update(courses)
      .set({ ...courseData, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  // Unit operations
  async getUnitsByCourse(courseId: number): Promise<Unit[]> {
    return await db.select().from(units).where(eq(units.courseId, courseId)).orderBy(asc(units.orderIndex));
  }

  async getUnit(id: number): Promise<Unit | undefined> {
    const [unit] = await db.select().from(units).where(eq(units.id, id));
    return unit;
  }

  async createUnit(unitData: InsertUnit): Promise<Unit> {
    const [unit] = await db.insert(units).values(unitData).returning();
    return unit;
  }

  async updateUnit(id: number, unitData: Partial<InsertUnit>): Promise<Unit | undefined> {
    const [unit] = await db
      .update(units)
      .set(unitData)
      .where(eq(units.id, id))
      .returning();
    return unit;
  }

  // Lesson operations
  async getLessonsByUnit(unitId: number): Promise<Lesson[]> {
    return await db.select().from(lessons).where(eq(lessons.unitId, unitId)).orderBy(asc(lessons.orderIndex));
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async createLesson(lessonData: InsertLesson): Promise<Lesson> {
    const [lesson] = await db.insert(lessons).values(lessonData).returning();
    return lesson;
  }

  async updateLesson(id: number, lessonData: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const [lesson] = await db
      .update(lessons)
      .set({ ...lessonData, updatedAt: new Date() })
      .where(eq(lessons.id, id))
      .returning();
    return lesson;
  }

  // Reflection questions
  async getReflectionQuestionsByLesson(lessonId: number): Promise<ReflectionQuestion[]> {
    return await db.select().from(reflectionQuestions).where(eq(reflectionQuestions.lessonId, lessonId)).orderBy(asc(reflectionQuestions.orderIndex));
  }

  async createReflectionQuestion(questionData: InsertReflectionQuestion): Promise<ReflectionQuestion> {
    const [question] = await db.insert(reflectionQuestions).values(questionData).returning();
    return question;
  }

  // Additional resources
  async getAdditionalResourcesByLesson(lessonId: number): Promise<AdditionalResource[]> {
    return await db.select().from(additionalResources).where(eq(additionalResources.lessonId, lessonId));
  }

  async createAdditionalResource(resourceData: InsertAdditionalResource): Promise<AdditionalResource> {
    const [resource] = await db.insert(additionalResources).values(resourceData).returning();
    return resource;
  }

  // Quiz operations
  async getQuizzesByLesson(lessonId: number): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.lessonId, lessonId));
  }

  async getQuiz(id: number): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz;
  }

  async createQuiz(quizData: InsertQuiz): Promise<Quiz> {
    const [quiz] = await db.insert(quizzes).values(quizData).returning();
    return quiz;
  }

  // Quiz questions
  async getQuizQuestionsByQuiz(quizId: number): Promise<QuizQuestion[]> {
    return await db.select().from(quizQuestions).where(eq(quizQuestions.quizId, quizId)).orderBy(asc(quizQuestions.orderIndex));
  }

  async createQuizQuestion(questionData: InsertQuizQuestion): Promise<QuizQuestion> {
    const [question] = await db.insert(quizQuestions).values(questionData).returning();
    return question;
  }

  // Unit exams
  async getUnitExamsByUnit(unitId: number): Promise<UnitExam[]> {
    return await db.select().from(unitExams).where(eq(unitExams.unitId, unitId));
  }

  async getUnitExam(id: number): Promise<UnitExam | undefined> {
    const [exam] = await db.select().from(unitExams).where(eq(unitExams.id, id));
    return exam;
  }

  async createUnitExam(examData: InsertUnitExam): Promise<UnitExam> {
    const [exam] = await db.insert(unitExams).values(examData).returning();
    return exam;
  }

  // Course enrollments
  async getCourseEnrollmentsByUser(userId: string): Promise<CourseEnrollment[]> {
    return await db.select().from(courseEnrollments).where(eq(courseEnrollments.userId, userId));
  }

  async getCourseEnrollment(userId: string, courseId: number): Promise<CourseEnrollment | undefined> {
    const [enrollment] = await db.select().from(courseEnrollments).where(
      and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId))
    );
    return enrollment;
  }

  async createCourseEnrollment(enrollmentData: InsertCourseEnrollment): Promise<CourseEnrollment> {
    const [enrollment] = await db.insert(courseEnrollments).values(enrollmentData).returning();
    return enrollment;
  }

  async updateCourseEnrollment(userId: string, courseId: number, data: Partial<CourseEnrollment>): Promise<CourseEnrollment | undefined> {
    const [enrollment] = await db
      .update(courseEnrollments)
      .set(data)
      .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
      .returning();
    return enrollment;
  }

  // Lesson progress
  async getLessonProgress(userId: string, lessonId: number): Promise<LessonProgress | undefined> {
    const [progress] = await db.select().from(lessonProgress).where(
      and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, lessonId))
    );
    return progress;
  }

  async createOrUpdateLessonProgress(progressData: InsertLessonProgress): Promise<LessonProgress> {
    // First try to find existing progress
    const [existing] = await db
      .select()
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.userId, progressData.userId),
          eq(lessonProgress.lessonId, progressData.lessonId)
        )
      );

    if (existing) {
      // Update existing record
      const [progress] = await db
        .update(lessonProgress)
        .set(progressData)
        .where(eq(lessonProgress.id, existing.id))
        .returning();
      
      return progress;
    } else {
      // Create new record
      const [progress] = await db
        .insert(lessonProgress)
        .values(progressData)
        .returning();
      
      return progress;
    }
  }

  async getLessonProgressByUser(userId: string): Promise<LessonProgress[]> {
    return await db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId));
  }

  // Reflection responses
  async getReflectionResponse(userId: string, questionId: number): Promise<ReflectionResponse | undefined> {
    const [response] = await db.select().from(reflectionResponses).where(
      and(eq(reflectionResponses.userId, userId), eq(reflectionResponses.questionId, questionId))
    );
    return response;
  }

  async createOrUpdateReflectionResponse(responseData: InsertReflectionResponse): Promise<ReflectionResponse> {
    // Check if response already exists
    const existing = await this.getReflectionResponse(responseData.userId, responseData.questionId);
    
    if (existing) {
      // Update existing response
      const [response] = await db
        .update(reflectionResponses)
        .set(responseData)
        .where(and(
          eq(reflectionResponses.userId, responseData.userId),
          eq(reflectionResponses.questionId, responseData.questionId)
        ))
        .returning();
      return response;
    } else {
      // Create new response
      const [response] = await db
        .insert(reflectionResponses)
        .values(responseData)
        .returning();
      return response;
    }
  }

  // Quiz attempts
  async getQuizAttemptsByUser(userId: string, quizId: number): Promise<QuizAttempt[]> {
    return await db.select().from(quizAttempts).where(
      and(eq(quizAttempts.userId, userId), eq(quizAttempts.quizId, quizId))
    ).orderBy(desc(quizAttempts.startedAt));
  }

  async getQuizAttempt(id: number): Promise<QuizAttempt | undefined> {
    const [attempt] = await db.select().from(quizAttempts).where(eq(quizAttempts.id, id));
    return attempt;
  }

  async createQuizAttempt(attemptData: InsertQuizAttempt): Promise<QuizAttempt> {
    const [attempt] = await db.insert(quizAttempts).values(attemptData).returning();
    return attempt;
  }

  async updateQuizAttempt(id: number, attemptData: Partial<QuizAttempt>): Promise<QuizAttempt | undefined> {
    const [attempt] = await db
      .update(quizAttempts)
      .set(attemptData)
      .where(eq(quizAttempts.id, id))
      .returning();
    return attempt;
  }

  // Quiz responses
  async createQuizResponse(responseData: InsertQuizResponse): Promise<QuizResponse> {
    const [response] = await db.insert(quizResponses).values(responseData).returning();
    return response;
  }

  async getQuizResponsesByAttempt(attemptId: number): Promise<QuizResponse[]> {
    return await db.select().from(quizResponses).where(eq(quizResponses.attemptId, attemptId));
  }

  // Statistics and reporting
  async getCourseStats(courseId: number): Promise<{
    totalEnrollments: number;
    averageProgress: number;
    averageScore: number;
    studentsNeedingAttention: number;
  }> {
    const enrollments = await db.select().from(courseEnrollments).where(eq(courseEnrollments.courseId, courseId));
    const totalEnrollments = enrollments.length;
    
    if (totalEnrollments === 0) {
      return { totalEnrollments: 0, averageProgress: 0, averageScore: 0, studentsNeedingAttention: 0 };
    }

    const averageProgress = Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / totalEnrollments);
    
    // Get average quiz scores for this course
    const quizResults = await db
      .select({
        avgScore: sql<number>`avg(${quizAttempts.score})`,
      })
      .from(quizAttempts)
      .innerJoin(quizzes, eq(quizzes.id, quizAttempts.quizId))
      .innerJoin(lessons, eq(lessons.id, quizzes.lessonId))
      .innerJoin(units, eq(units.id, lessons.unitId))
      .where(eq(units.courseId, courseId));

    const averageScore = Math.round(quizResults[0]?.avgScore || 0);
    const studentsNeedingAttention = enrollments.filter(e => (e.progress || 0) < 50).length;

    return {
      totalEnrollments,
      averageProgress,
      averageScore,
      studentsNeedingAttention,
    };
  }

  async getStudentActivity(courseId: number): Promise<Array<{
    userId: string;
    userName: string;
    lastActivity: string;
    progress: number;
    status: string;
  }>> {
    const enrollments = await db
      .select({
        userId: courseEnrollments.userId,
        progress: courseEnrollments.progress,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(courseEnrollments)
      .innerJoin(users, eq(users.id, courseEnrollments.userId))
      .where(eq(courseEnrollments.courseId, courseId));

    return enrollments.map(enrollment => {
      const progress = enrollment.progress || 0;
      let status = 'On Track';
      if (progress < 30) status = 'Behind';
      else if (progress > 80) status = 'Ahead';

      return {
        userId: enrollment.userId,
        userName: `${enrollment.firstName || ''} ${enrollment.lastName || ''}`.trim() || 'Unknown',
        lastActivity: 'Recent activity', // This would need more complex querying
        progress,
        status,
      };
    });
  }

  // Quiz lock operations
  async getActiveQuizLock(userId: string): Promise<any> {
    const [lock] = await db
      .select()
      .from(quizLocks)
      .where(
        and(
          eq(quizLocks.userId, userId),
          sql`${quizLocks.expiresAt} > NOW()`
        )
      )
      .orderBy(desc(quizLocks.createdAt))
      .limit(1);
    
    return lock;
  }

  async createQuizLock(lockData: { userId: string; quizId: number; expiresAt: Date }): Promise<any> {
    const [lock] = await db
      .insert(quizLocks)
      .values(lockData)
      .returning();
    
    return lock;
  }

  async clearQuizLock(userId: string): Promise<void> {
    await db
      .delete(quizLocks)
      .where(eq(quizLocks.userId, userId));
  }

  async getQuizByLessonId(lessonId: number): Promise<any> {
    const [quiz] = await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.lessonId, lessonId));
    
    return quiz;
  }

  async getReflectionResponses(userId: string, lessonId: number): Promise<any[]> {
    const responses = await db
      .select()
      .from(reflectionResponses)
      .innerJoin(reflectionQuestions, eq(reflectionResponses.questionId, reflectionQuestions.id))
      .where(
        and(
          eq(reflectionResponses.userId, userId),
          eq(reflectionQuestions.lessonId, lessonId)
        )
      );
    
    return responses;
  }
}

export const storage = new DatabaseStorage();
