import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertCourseSchema,
  insertUnitSchema,
  insertLessonSchema,
  insertReflectionQuestionSchema,
  insertAdditionalResourceSchema,
  insertQuizSchema,
  insertQuizQuestionSchema,
  insertReflectionResponseSchema,
  insertQuizAttemptSchema,
  insertQuizResponseSchema,
  quizLocks,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Course routes
  app.get('/api/courses', isAuthenticated, async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get('/api/courses/:id', isAuthenticated, async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post('/api/courses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can create courses" });
      }

      const courseData = insertCourseSchema.parse({
        ...req.body,
        createdBy: userId,
      });
      
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  // Unit routes
  app.get('/api/courses/:courseId/units', isAuthenticated, async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const units = await storage.getUnitsByCourse(courseId);
      res.json(units);
    } catch (error) {
      console.error("Error fetching units:", error);
      res.status(500).json({ message: "Failed to fetch units" });
    }
  });

  // Get single unit
  app.get('/api/units/:id', isAuthenticated, async (req, res) => {
    try {
      const unitId = parseInt(req.params.id);
      const unit = await storage.getUnit(unitId);
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }
      res.json(unit);
    } catch (error) {
      console.error("Error fetching unit:", error);
      res.status(500).json({ message: "Failed to fetch unit" });
    }
  });

  app.post('/api/units', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can create units" });
      }

      const unitData = insertUnitSchema.parse(req.body);
      const unit = await storage.createUnit(unitData);
      res.status(201).json(unit);
    } catch (error) {
      console.error("Error creating unit:", error);
      res.status(500).json({ message: "Failed to create unit" });
    }
  });

  // Lesson routes
  app.get('/api/units/:unitId/lessons', isAuthenticated, async (req, res) => {
    try {
      const unitId = parseInt(req.params.unitId);
      const lessons = await storage.getLessonsByUnit(unitId);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  app.get('/api/lessons/:id', isAuthenticated, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  app.post('/api/lessons', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can create lessons" });
      }

      const lessonData = insertLessonSchema.parse(req.body);
      const lesson = await storage.createLesson(lessonData);
      res.status(201).json(lesson);
    } catch (error) {
      console.error("Error creating lesson:", error);
      res.status(500).json({ message: "Failed to create lesson" });
    }
  });

  app.put('/api/lessons/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can update lessons" });
      }

      const lessonId = parseInt(req.params.id);
      const lessonData = insertLessonSchema.partial().parse(req.body);
      const lesson = await storage.updateLesson(lessonId, lessonData);
      
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      res.json(lesson);
    } catch (error) {
      console.error("Error updating lesson:", error);
      res.status(500).json({ message: "Failed to update lesson" });
    }
  });

  // Reflection questions
  app.get('/api/lessons/:lessonId/reflection-questions', isAuthenticated, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const questions = await storage.getReflectionQuestionsByLesson(lessonId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching reflection questions:", error);
      res.status(500).json({ message: "Failed to fetch reflection questions" });
    }
  });

  app.post('/api/reflection-questions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can create reflection questions" });
      }

      const questionData = insertReflectionQuestionSchema.parse(req.body);
      const question = await storage.createReflectionQuestion(questionData);
      res.status(201).json(question);
    } catch (error) {
      console.error("Error creating reflection question:", error);
      res.status(500).json({ message: "Failed to create reflection question" });
    }
  });

  // Additional resources
  app.get('/api/lessons/:lessonId/resources', isAuthenticated, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const resources = await storage.getAdditionalResourcesByLesson(lessonId);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.post('/api/resources', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can create resources" });
      }

      const resourceData = insertAdditionalResourceSchema.parse(req.body);
      const resource = await storage.createAdditionalResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating resource:", error);
      res.status(500).json({ message: "Failed to create resource" });
    }
  });

  // Quiz routes
  app.get('/api/lessons/:lessonId/quizzes', isAuthenticated, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const quizzes = await storage.getQuizzesByLesson(lessonId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.get('/api/quizzes/:id', isAuthenticated, async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await storage.getQuiz(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  app.get('/api/quizzes/:id/questions', isAuthenticated, async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const questions = await storage.getQuizQuestionsByQuiz(quizId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  app.post('/api/quizzes', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can create quizzes" });
      }

      const quizData = insertQuizSchema.parse(req.body);
      const quiz = await storage.createQuiz(quizData);
      res.status(201).json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Failed to create quiz" });
    }
  });

  // Course enrollment
  app.get('/api/my-enrollments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const enrollments = await storage.getCourseEnrollmentsByUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.post('/api/courses/:courseId/enroll', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const courseId = parseInt(req.params.courseId);
      
      // Check if already enrolled
      const existing = await storage.getCourseEnrollment(userId, courseId);
      if (existing) {
        return res.status(400).json({ message: "Already enrolled in this course" });
      }

      const enrollment = await storage.createCourseEnrollment({
        userId,
        courseId,
      });
      
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      res.status(500).json({ message: "Failed to enroll in course" });
    }
  });

  // Progress tracking
  app.post('/api/lessons/:lessonId/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lessonId = parseInt(req.params.lessonId);
      
      const progress = await storage.createOrUpdateLessonProgress({
        userId,
        lessonId,
        isCompleted: req.body.isCompleted || false,
        completedAt: req.body.isCompleted ? new Date() : undefined,
        timeSpent: req.body.timeSpent || 0,
      });
      
      res.json(progress);
    } catch (error) {
      console.error("Error updating lesson progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  app.get('/api/my-progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getLessonProgressByUser(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Reflection responses
  app.post('/api/reflection-responses', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const responseData = insertReflectionResponseSchema.parse({
        ...req.body,
        userId,
      });
      
      const response = await storage.createOrUpdateReflectionResponse(responseData);
      res.json(response);
    } catch (error) {
      console.error("Error saving reflection response:", error);
      res.status(500).json({ message: "Failed to save reflection response" });
    }
  });

  // Quiz lock routes - to implement site locking during quizzes
  app.get('/api/quiz-lock-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const activeLock = await storage.getActiveQuizLock(userId);
      res.json({ isLocked: !!activeLock, activeLock });
    } catch (error) {
      console.error("Error checking quiz lock status:", error);
      res.status(500).json({ message: "Failed to check quiz lock status" });
    }
  });

  app.post('/api/quiz-locks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { quizId, timeLimit = 30 } = req.body; // Default 30 minutes

      // Check if user already has an active lock
      const existingLock = await storage.getActiveQuizLock(userId);
      if (existingLock) {
        return res.status(400).json({ message: "Quiz already in progress" });
      }

      const expiresAt = new Date(Date.now() + timeLimit * 60 * 1000);
      const lock = await storage.createQuizLock({
        userId,
        quizId,
        expiresAt,
      });
      
      res.status(201).json(lock);
    } catch (error) {
      console.error("Error creating quiz lock:", error);
      res.status(500).json({ message: "Failed to create quiz lock" });
    }
  });

  app.delete('/api/quiz-locks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.clearQuizLock(userId);
      res.status(200).json({ message: "Quiz lock cleared" });
    } catch (error) {
      console.error("Error clearing quiz lock:", error);
      res.status(500).json({ message: "Failed to clear quiz lock" });
    }
  });

  app.get('/api/reflection-responses/:lessonId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lessonId = parseInt(req.params.lessonId);
      
      const responses = await storage.getReflectionResponses(userId, lessonId);
      res.json(responses);
    } catch (error) {
      console.error("Error fetching reflection responses:", error);
      res.status(500).json({ message: "Failed to fetch reflection responses" });
    }
  });

  // Get quiz for a lesson
  app.get('/api/lessons/:id/quiz', isAuthenticated, async (req: any, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const quiz = await storage.getQuizByLessonId(lessonId);
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching lesson quiz:", error);
      res.status(500).json({ message: "Failed to fetch lesson quiz" });
    }
  });

  // Quiz attempts
  app.post('/api/quizzes/:quizId/attempts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const quizId = parseInt(req.params.quizId);
      
      // Get the quiz to find its lesson
      const quiz = await storage.getQuiz(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      
      // Check if the lesson is completed before allowing quiz access
      const lessonProgress = await storage.getLessonProgress(userId, quiz.lessonId);
      if (!lessonProgress || !lessonProgress.isCompleted) {
        return res.status(403).json({ message: "You must complete the lesson before taking the quiz" });
      }
      
      // Check if there's already an active quiz session
      const existingLock = await storage.getActiveQuizLock(userId);
      if (existingLock) {
        return res.status(400).json({ message: "You already have an active quiz session" });
      }
      
      const attempt = await storage.createQuizAttempt({
        userId,
        quizId,
      });
      
      // Create quiz lock
      await storage.createQuizLock({
        userId,
        quizId,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      });
      
      res.status(201).json(attempt);
    } catch (error) {
      console.error("Error creating quiz attempt:", error);
      res.status(500).json({ message: "Failed to create quiz attempt" });
    }
  });

  app.put('/api/quiz-attempts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const attemptId = parseInt(req.params.id);
      const attempt = await storage.updateQuizAttempt(attemptId, req.body);
      
      if (!attempt) {
        return res.status(404).json({ message: "Quiz attempt not found" });
      }
      
      res.json(attempt);
    } catch (error) {
      console.error("Error updating quiz attempt:", error);
      res.status(500).json({ message: "Failed to update quiz attempt" });
    }
  });

  app.post('/api/quiz-responses', isAuthenticated, async (req, res) => {
    try {
      const responseData = insertQuizResponseSchema.parse(req.body);
      const response = await storage.createQuizResponse(responseData);
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating quiz response:", error);
      res.status(500).json({ message: "Failed to create quiz response" });
    }
  });

  // Teacher dashboard stats
  app.get('/api/courses/:courseId/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can view course stats" });
      }

      const courseId = parseInt(req.params.courseId);
      const stats = await storage.getCourseStats(courseId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching course stats:", error);
      res.status(500).json({ message: "Failed to fetch course stats" });
    }
  });

  app.get('/api/courses/:courseId/student-activity', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can view student activity" });
      }

      const courseId = parseInt(req.params.courseId);
      const activity = await storage.getStudentActivity(courseId);
      res.json(activity);
    } catch (error) {
      console.error("Error fetching student activity:", error);
      res.status(500).json({ message: "Failed to fetch student activity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
