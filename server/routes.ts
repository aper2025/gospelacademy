import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import connectPg from "connect-pg-simple";
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
  insertTeacherClassSchema,
  insertTeacherMaterialSchema,
  signupSchema,
  loginSchema,
  quizLocks,
  courses,
  teacherClasses,
  teacherClassStudents,
  courseEnrollments,
  lessonProgress,
  quizAttempts,
  lessons,
  quizzes,
} from "@shared/schema";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { eq, and, desc, isNotNull, sql } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up email/password session management
  app.set("trust proxy", 1);
  
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  app.use(session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: sessionTtl,
    },
  }));

  // Email/Password Authentication Routes
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const userData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const user = await storage.createEmailPasswordUser({
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      });
      
      // Set up session
      req.session.user = { 
        id: user.id, 
        email: user.email,
        authType: 'email' 
      };
      
      res.status(201).json({ 
        id: user.id, 
        email: user.email, 
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role 
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Set up session
      req.session.user = { 
        id: user.id, 
        email: user.email,
        authType: 'email' 
      };
      
      res.json({ 
        id: user.id, 
        email: user.email, 
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Logout routes - both GET and POST for different use cases
  app.get('/api/logout', (req, res) => {
    // First clear the user from session
    if (req.session) {
      req.session.user = null;
    }
    
    // Then destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      
      // Clear the session cookie with all possible options
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: true,
      });
      
      res.json({ message: "Logged out successfully" });
    });
  });

  app.post('/api/auth/logout', (req, res) => {
    // First clear the user from session
    if (req.session) {
      req.session.user = null;
    }
    
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      
      // Clear the session cookie
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: true,
      });
      
      res.json({ message: "Logged out successfully" });
    });
  });

  // Auth routes - email/password only
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check if user is authenticated via email/password session
      if (!req.session?.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = req.session.user.id;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Auth middleware for email/password only
  const requireAuth = async (req: any, res: any, next: any) => {
    // Check if user is authenticated via email/password session
    if (!req.session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const userId = req.session.user.id;
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    req.currentUser = user;
    next();
  };

  // Course routes
  app.get('/api/courses', requireAuth, async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get course overview stats
  app.get('/api/courses/:courseId/overview', requireAuth, async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const overview = await storage.getCourseOverview(courseId);
      res.json(overview);
    } catch (error) {
      console.error("Error fetching course overview:", error);
      res.status(500).json({ message: "Failed to fetch course overview" });
    }
  });

  // Get user progress stats
  app.get('/api/courses/:courseId/my-progress-stats', requireAuth, async (req: any, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const userId = req.currentUser.id;
      
      const progressStats = await storage.getUserProgressStats(userId, courseId);
      res.json(progressStats);
    } catch (error) {
      console.error("Error fetching user progress stats:", error);
      res.status(500).json({ message: "Failed to fetch progress stats" });
    }
  });

  // Get user recent activity
  app.get('/api/courses/:courseId/my-recent-activity', requireAuth, async (req: any, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const userId = req.currentUser.id;
      
      const recentActivity = await storage.getUserRecentActivity(userId, courseId);
      res.json(recentActivity);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      res.status(500).json({ message: "Failed to fetch recent activity" });
    }
  });

  app.get('/api/courses/:id', requireAuth, async (req, res) => {
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

  app.post('/api/courses', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.get('/api/courses/:courseId/units', requireAuth, async (req, res) => {
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
  app.get('/api/units/:id', requireAuth, async (req, res) => {
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

  app.post('/api/units', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.get('/api/units/:unitId/lessons', requireAuth, async (req, res) => {
    try {
      const unitId = parseInt(req.params.unitId);
      const lessons = await storage.getLessonsByUnit(unitId);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  app.get('/api/lessons/:id', requireAuth, async (req, res) => {
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

  app.post('/api/lessons', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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

  app.put('/api/lessons/:id', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.get('/api/lessons/:lessonId/reflection-questions', requireAuth, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const questions = await storage.getReflectionQuestionsByLesson(lessonId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching reflection questions:", error);
      res.status(500).json({ message: "Failed to fetch reflection questions" });
    }
  });

  app.post('/api/reflection-questions', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.get('/api/lessons/:lessonId/resources', requireAuth, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const resources = await storage.getAdditionalResourcesByLesson(lessonId);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.post('/api/resources', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.get('/api/lessons/:lessonId/quizzes', requireAuth, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const quizzes = await storage.getQuizzesByLesson(lessonId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.get('/api/quizzes/:id', requireAuth, async (req, res) => {
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

  app.get('/api/quizzes/:id/questions', requireAuth, async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const questions = await storage.getQuizQuestionsByQuiz(quizId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  app.post('/api/quizzes', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.get('/api/my-enrollments', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const enrollments = await storage.getCourseEnrollmentsByUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.post('/api/courses/:courseId/enroll', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.post('/api/lessons/:lessonId/progress', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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

  app.get('/api/my-progress', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const progress = await storage.getLessonProgressByUser(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Reflection responses
  app.post('/api/reflection-responses', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
  app.get('/api/quiz-lock-status', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const activeLock = await storage.getActiveQuizLock(userId);
      res.json({ isLocked: !!activeLock, activeLock });
    } catch (error) {
      console.error("Error checking quiz lock status:", error);
      res.status(500).json({ message: "Failed to check quiz lock status" });
    }
  });

  app.post('/api/quiz-locks', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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

  app.delete('/api/quiz-locks', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      await storage.clearQuizLock(userId);
      res.status(200).json({ message: "Quiz lock cleared" });
    } catch (error) {
      console.error("Error clearing quiz lock:", error);
      res.status(500).json({ message: "Failed to clear quiz lock" });
    }
  });

  app.get('/api/reflection-responses/:lessonId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const lessonId = parseInt(req.params.lessonId);
      
      const responses = await storage.getReflectionResponses(userId, lessonId);
      res.json(responses);
    } catch (error) {
      console.error("Error fetching reflection responses:", error);
      res.status(500).json({ message: "Failed to fetch reflection responses" });
    }
  });

  // Get quiz for a lesson
  app.get('/api/lessons/:id/quiz', requireAuth, async (req: any, res) => {
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
  app.get('/api/quizzes/:quizId/active-attempt', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const quizId = parseInt(req.params.quizId);
      
      // Check if there's an active quiz lock for this user and quiz
      const activeLock = await storage.getActiveQuizLock(userId);
      if (activeLock && activeLock.quizId === quizId) {
        // Get the most recent attempt for this quiz
        const attempts = await storage.getQuizAttemptsByUser(userId, quizId);
        const activeAttempt = attempts.find(attempt => !attempt.completedAt);
        if (activeAttempt) {
          return res.json(activeAttempt);
        }
      }
      
      res.status(404).json({ message: "No active attempt found" });
    } catch (error) {
      console.error("Error getting active attempt:", error);
      res.status(500).json({ message: "Failed to get active attempt" });
    }
  });

  app.post('/api/quizzes/:quizId/attempts', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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
        // If it's for the same quiz, return the existing attempt
        if (existingLock.quizId === quizId) {
          const attempts = await storage.getQuizAttemptsByUser(userId, quizId);
          const activeAttempt = attempts.find(attempt => !attempt.completedAt);
          if (activeAttempt) {
            return res.json(activeAttempt);
          }
        }
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

  app.put('/api/quiz-attempts/:id', requireAuth, async (req: any, res) => {
    try {
      const attemptId = parseInt(req.params.id);
      
      // Only allow updating specific fields (excluding completedAt for now)
      const allowedFields = ['score', 'timeSpent', 'isPassed'];
      const updateData: any = {};
      
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }
      
      // If this is a completion (has score), add completedAt timestamp
      if (updateData.score !== undefined) {
        updateData.completedAt = new Date();
      }
      
      
      const attempt = await storage.updateQuizAttempt(attemptId, updateData);
      
      if (!attempt) {
        return res.status(404).json({ message: "Quiz attempt not found" });
      }
      
      res.json(attempt);
    } catch (error) {
      console.error("Error updating quiz attempt:", error);
      res.status(500).json({ message: "Failed to update quiz attempt" });
    }
  });

  app.post('/api/quiz-responses', requireAuth, async (req, res) => {
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
  app.get('/api/courses/:courseId/stats', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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

  app.get('/api/courses/:courseId/student-activity', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
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

  // Teacher Class Management Routes
  app.get('/api/teacher/classes', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access this endpoint" });
      }

      const classes = await storage.getTeacherClasses(userId);
      res.json(classes);
    } catch (error) {
      console.error("Error fetching teacher classes:", error);
      res.status(500).json({ message: "Failed to fetch teacher classes" });
    }
  });

  app.post('/api/teacher/classes', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can create classes" });
      }

      const classData = insertTeacherClassSchema.parse({
        ...req.body,
        teacherId: userId,
      });
      
      const teacherClass = await storage.createTeacherClass(classData);
      res.status(201).json(teacherClass);
    } catch (error) {
      console.error("Error creating teacher class:", error);
      res.status(500).json({ message: "Failed to create teacher class" });
    }
  });

  app.get('/api/teacher/classes/:classId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access this endpoint" });
      }

      const classId = parseInt(req.params.classId);
      const teacherClass = await storage.getTeacherClass(classId);
      
      if (!teacherClass || teacherClass.teacherId !== userId) {
        return res.status(404).json({ message: "Class not found" });
      }

      res.json(teacherClass);
    } catch (error) {
      console.error("Error fetching teacher class:", error);
      res.status(500).json({ message: "Failed to fetch teacher class" });
    }
  });

  app.put('/api/teacher/classes/:classId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can update classes" });
      }

      const classId = parseInt(req.params.classId);
      const existingClass = await storage.getTeacherClass(classId);
      
      if (!existingClass || existingClass.teacherId !== userId) {
        return res.status(404).json({ message: "Class not found" });
      }

      const updatedClass = await storage.updateTeacherClass(classId, req.body);
      res.json(updatedClass);
    } catch (error) {
      console.error("Error updating teacher class:", error);
      res.status(500).json({ message: "Failed to update teacher class" });
    }
  });

  app.delete('/api/teacher/classes/:classId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can delete classes" });
      }

      const classId = parseInt(req.params.classId);
      const existingClass = await storage.getTeacherClass(classId);
      
      if (!existingClass || existingClass.teacherId !== userId) {
        return res.status(404).json({ message: "Class not found" });
      }

      await storage.deleteTeacherClass(classId);
      res.json({ message: "Class deleted successfully" });
    } catch (error) {
      console.error("Error deleting teacher class:", error);
      res.status(500).json({ message: "Failed to delete teacher class" });
    }
  });

  // Update class course assignment
  app.put('/api/teacher/classes/:classId/course', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can assign courses" });
      }

      const classId = parseInt(req.params.classId);
      const { courseId } = req.body;

      const existingClass = await storage.getTeacherClass(classId);
      if (!existingClass || existingClass.teacherId !== userId) {
        return res.status(404).json({ message: "Class not found" });
      }

      // Update the class with the course
      const [updatedClass] = await db.update(teacherClasses)
        .set({ courseId: parseInt(courseId) })
        .where(eq(teacherClasses.id, classId))
        .returning();

      // Enroll all students in the class to the course
      const classStudents = await db.select()
        .from(teacherClassStudents)
        .where(eq(teacherClassStudents.classId, classId));

      for (const student of classStudents) {
        // Check if already enrolled
        const [existingEnrollment] = await db.select()
          .from(courseEnrollments)
          .where(and(
            eq(courseEnrollments.userId, student.studentId),
            eq(courseEnrollments.courseId, parseInt(courseId))
          ));

        if (!existingEnrollment) {
          await db.insert(courseEnrollments).values({
            userId: student.studentId,
            courseId: parseInt(courseId),
          });
        }
      }

      res.json(updatedClass);
    } catch (error) {
      console.error("Error updating class course:", error);
      res.status(500).json({ message: "Failed to update class course" });
    }
  });

  // Student Management Routes
  app.get('/api/teacher/classes/:classId/students', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access this endpoint" });
      }

      const classId = parseInt(req.params.classId);
      const teacherClass = await storage.getTeacherClass(classId);
      
      if (!teacherClass || teacherClass.teacherId !== userId) {
        return res.status(404).json({ message: "Class not found" });
      }

      const students = await storage.getClassStudents(classId);
      res.json(students);
    } catch (error) {
      console.error("Error fetching class students:", error);
      res.status(500).json({ message: "Failed to fetch class students" });
    }
  });

  app.post('/api/teacher/classes/:classId/students', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can add students" });
      }

      const classId = parseInt(req.params.classId);
      const { emails } = req.body;
      
      if (!Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({ message: "Please provide an array of student emails" });
      }

      const teacherClass = await storage.getTeacherClass(classId);
      if (!teacherClass || teacherClass.teacherId !== userId) {
        return res.status(404).json({ message: "Class not found" });
      }

      // Find students by email
      const students = await storage.getStudentsByEmail(emails);
      const foundEmails = students.map(s => s.email);
      const notFoundEmails = emails.filter(email => !foundEmails.includes(email));

      // Add found students to class
      const addedStudents = [];
      for (const student of students) {
        try {
          const classStudent = await storage.addStudentToClass(classId, student.id);
          addedStudents.push({ student, classStudent });
        } catch (error) {
          // Student might already be in class, continue with others
          console.log(`Student ${student.email} might already be in class`);
        }
      }

      res.json({
        added: addedStudents,
        notFound: notFoundEmails,
        message: `Added ${addedStudents.length} students. ${notFoundEmails.length} emails not found.`
      });
    } catch (error) {
      console.error("Error adding students to class:", error);
      res.status(500).json({ message: "Failed to add students to class" });
    }
  });

  app.delete('/api/teacher/classes/:classId/students/:studentId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can remove students" });
      }

      const classId = parseInt(req.params.classId);
      const studentId = req.params.studentId;
      
      const teacherClass = await storage.getTeacherClass(classId);
      if (!teacherClass || teacherClass.teacherId !== userId) {
        return res.status(404).json({ message: "Class not found" });
      }

      await storage.removeStudentFromClass(classId, studentId);
      res.json({ message: "Student removed from class successfully" });
    } catch (error) {
      console.error("Error removing student from class:", error);
      res.status(500).json({ message: "Failed to remove student from class" });
    }
  });

  // Student enrollment and progress routes
  app.get('/api/my-enrolled-courses', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);

      if (user?.role === 'student') {
        // For students: only show courses they're enrolled in through classes
        const enrolledCourses = await db.select({
          id: courses.id,
          title: courses.title,
          description: courses.description,
          totalLessons: courses.totalLessons,
          totalQuizzes: courses.totalQuizzes,
          estimatedDuration: courses.estimatedDuration,
          className: teacherClasses.className,
        })
        .from(courseEnrollments)
        .innerJoin(courses, eq(courseEnrollments.courseId, courses.id))
        .leftJoin(teacherClassStudents, eq(teacherClassStudents.studentId, userId))
        .leftJoin(teacherClasses, and(
          eq(teacherClassStudents.classId, teacherClasses.id),
          eq(teacherClasses.courseId, courses.id)
        ))
        .where(eq(courseEnrollments.userId, userId));

        res.json(enrolledCourses);
      } else if (user?.role === 'teacher') {
        // For teachers: show courses they're teaching
        const teachingCourses = await db.select({
          id: courses.id,
          title: courses.title,
          description: courses.description,
          totalLessons: courses.totalLessons,
          totalQuizzes: courses.totalQuizzes,
          estimatedDuration: courses.estimatedDuration,
        })
        .from(teacherClasses)
        .innerJoin(courses, eq(teacherClasses.courseId, courses.id))
        .where(eq(teacherClasses.teacherId, userId));

        res.json(teachingCourses);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      res.status(500).json({ message: "Failed to fetch enrolled courses" });
    }
  });

  app.get('/api/my-detailed-progress', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;

      // Get enrolled courses with progress
      const enrolledCourses = await db.select({
        id: courses.id,
        title: courses.title,
        progress: courseEnrollments.progress,
        isCompleted: courseEnrollments.completedAt,
        className: teacherClasses.className,
      })
      .from(courseEnrollments)
      .innerJoin(courses, eq(courseEnrollments.courseId, courses.id))
      .leftJoin(teacherClassStudents, eq(teacherClassStudents.studentId, userId))
      .leftJoin(teacherClasses, and(
        eq(teacherClassStudents.classId, teacherClasses.id),
        eq(teacherClasses.courseId, courses.id)
      ))
      .where(eq(courseEnrollments.userId, userId));

      // Get totals
      const totalLessonsCompleted = await db.select({ count: sql<number>`count(*)` })
        .from(lessonProgress)
        .where(and(
          eq(lessonProgress.userId, userId),
          eq(lessonProgress.isCompleted, true)
        ));

      const totalQuizzesPassed = await db.select({ count: sql<number>`count(*)` })
        .from(quizAttempts)
        .where(and(
          eq(quizAttempts.userId, userId),
          eq(quizAttempts.isPassed, true)
        ));

      res.json({
        totalCoursesEnrolled: enrolledCourses.length,
        totalLessonsCompleted: totalLessonsCompleted[0]?.count || 0,
        totalQuizzesPassed: totalQuizzesPassed[0]?.count || 0,
        courses: enrolledCourses,
      });
    } catch (error) {
      console.error("Error fetching detailed progress:", error);
      res.status(500).json({ message: "Failed to fetch detailed progress" });
    }
  });

  app.get('/api/my-recent-activity', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;

      // Get recent lesson completions
      const recentLessons = await db.select({
        type: sql<string>`'lesson'`,
        title: lessons.title,
        timestamp: lessonProgress.completedAt,
        status: sql<string>`'completed'`,
      })
      .from(lessonProgress)
      .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
      .where(and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.isCompleted, true),
        isNotNull(lessonProgress.completedAt)
      ))
      .orderBy(desc(lessonProgress.completedAt))
      .limit(10);

      // Get recent quiz attempts
      const recentQuizzes = await db.select({
        type: sql<string>`'quiz'`,
        title: quizzes.title,
        timestamp: quizAttempts.completedAt,
        status: sql<string>`CASE WHEN ${quizAttempts.isPassed} THEN 'passed' ELSE 'failed' END`,
        score: quizAttempts.score,
      })
      .from(quizAttempts)
      .innerJoin(quizzes, eq(quizAttempts.quizId, quizzes.id))
      .where(and(
        eq(quizAttempts.userId, userId),
        isNotNull(quizAttempts.completedAt)
      ))
      .orderBy(desc(quizAttempts.completedAt))
      .limit(10);

      // Combine and sort all activities
      const allActivity = [...recentLessons, ...recentQuizzes]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 15);

      res.json(allActivity);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      res.status(500).json({ message: "Failed to fetch recent activity" });
    }
  });

  // Teacher Materials Routes
  app.get('/api/teacher/materials', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access this endpoint" });
      }

      const { classId, lessonId } = req.query;
      const materials = await storage.getTeacherMaterials(
        userId,
        classId ? parseInt(classId as string) : undefined,
        lessonId ? parseInt(lessonId as string) : undefined
      );
      
      res.json(materials);
    } catch (error) {
      console.error("Error fetching teacher materials:", error);
      res.status(500).json({ message: "Failed to fetch teacher materials" });
    }
  });

  app.post('/api/teacher/materials', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can add materials" });
      }

      const materialData = insertTeacherMaterialSchema.parse({
        ...req.body,
        teacherId: userId,
      });
      
      const material = await storage.createTeacherMaterial(materialData);
      res.status(201).json(material);
    } catch (error) {
      console.error("Error creating teacher material:", error);
      res.status(500).json({ message: "Failed to create teacher material" });
    }
  });

  app.put('/api/teacher/materials/:materialId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can update materials" });
      }

      const materialId = parseInt(req.params.materialId);
      const material = await storage.updateTeacherMaterial(materialId, req.body);
      
      if (!material) {
        return res.status(404).json({ message: "Material not found" });
      }

      res.json(material);
    } catch (error) {
      console.error("Error updating teacher material:", error);
      res.status(500).json({ message: "Failed to update teacher material" });
    }
  });

  app.delete('/api/teacher/materials/:materialId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can delete materials" });
      }

      const materialId = parseInt(req.params.materialId);
      await storage.deleteTeacherMaterial(materialId);
      res.json({ message: "Material deleted successfully" });
    } catch (error) {
      console.error("Error deleting teacher material:", error);
      res.status(500).json({ message: "Failed to delete teacher material" });
    }
  });

  // Get lessons for content editing (class-specific)
  app.get('/api/lessons', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access lesson editing" });
      }

      const classId = req.query.classId;
      if (!classId) {
        return res.status(400).json({ message: "Class ID is required" });
      }

      // Get lessons for the course assigned to this class
      const teacherClass = await db
        .select()
        .from(teacherClasses)
        .where(and(
          eq(teacherClasses.id, parseInt(classId)),
          eq(teacherClasses.teacherId, userId)
        ))
        .limit(1);

      if (!teacherClass.length) {
        return res.status(404).json({ message: "Class not found" });
      }

      if (!teacherClass[0].courseId) {
        return res.json([]);
      }

      const lessons = await db
        .select()
        .from(lessonsTable)
        .leftJoin(unitsTable, eq(lessonsTable.unitId, unitsTable.id))
        .where(eq(unitsTable.courseId, teacherClass[0].courseId))
        .orderBy(unitsTable.order, lessonsTable.order);

      res.json(lessons.map(result => result.lessons));
    } catch (error) {
      console.error("Error fetching lessons for editing:", error);
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  // Get quizzes for content editing (class-specific)
  app.get('/api/quizzes', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access quiz editing" });
      }

      const classId = req.query.classId;
      if (!classId) {
        return res.status(400).json({ message: "Class ID is required" });
      }

      // Get quizzes for the course assigned to this class
      const teacherClass = await db
        .select()
        .from(teacherClasses)
        .where(and(
          eq(teacherClasses.id, parseInt(classId)),
          eq(teacherClasses.teacherId, userId)
        ))
        .limit(1);

      if (!teacherClass.length) {
        return res.status(404).json({ message: "Class not found" });
      }

      if (!teacherClass[0].courseId) {
        return res.json([]);
      }

      const quizzes = await db
        .select()
        .from(quizzesTable)
        .leftJoin(lessonsTable, eq(quizzesTable.lessonId, lessonsTable.id))
        .leftJoin(unitsTable, eq(lessonsTable.unitId, unitsTable.id))
        .where(eq(unitsTable.courseId, teacherClass[0].courseId))
        .orderBy(unitsTable.order, lessonsTable.order);

      res.json(quizzes.map(result => result.quizzes));
    } catch (error) {
      console.error("Error fetching quizzes for editing:", error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  // Get quiz questions for editing
  app.get('/api/quiz-questions', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access quiz questions" });
      }

      const quizId = req.query.quiz_id || req.query.quizId;
      if (!quizId) {
        return res.status(400).json({ message: "Quiz ID is required" });
      }

      const questions = await db
        .select()
        .from(quizQuestionsTable)
        .where(eq(quizQuestionsTable.quizId, parseInt(quizId)))
        .orderBy(quizQuestionsTable.order);

      res.json(questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  // Get reflection questions for content editing (class-specific)
  app.get('/api/reflection-questions', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access reflection questions" });
      }

      const classId = req.query.classId;
      if (!classId) {
        return res.status(400).json({ message: "Class ID is required" });
      }

      // Get reflection questions for the course assigned to this class
      const teacherClass = await db
        .select()
        .from(teacherClasses)
        .where(and(
          eq(teacherClasses.id, parseInt(classId)),
          eq(teacherClasses.teacherId, userId)
        ))
        .limit(1);

      if (!teacherClass.length) {
        return res.status(404).json({ message: "Class not found" });
      }

      if (!teacherClass[0].courseId) {
        return res.json([]);
      }

      const reflectionQuestions = await db
        .select()
        .from(reflectionQuestionsTable)
        .leftJoin(lessonsTable, eq(reflectionQuestionsTable.lessonId, lessonsTable.id))
        .leftJoin(unitsTable, eq(lessonsTable.unitId, unitsTable.id))
        .where(eq(unitsTable.courseId, teacherClass[0].courseId))
        .orderBy(unitsTable.order, lessonsTable.order);

      res.json(reflectionQuestions.map(result => result.reflection_questions));
    } catch (error) {
      console.error("Error fetching reflection questions for editing:", error);
      res.status(500).json({ message: "Failed to fetch reflection questions" });
    }
  });

  // Update lesson content
  app.put('/api/teacher/lessons/:lessonId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can edit lessons" });
      }

      const lessonId = parseInt(req.params.lessonId);
      
      // Update lesson
      const [updatedLesson] = await db
        .update(lessonsTable)
        .set({
          title: req.body.title,
          content: req.body.content,
          learningObjectives: req.body.learningObjectives,
          keyTerms: req.body.keyTerms,
          videoUrl: req.body.videoUrl,
        })
        .where(eq(lessonsTable.id, lessonId))
        .returning();

      if (!updatedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.json(updatedLesson);
    } catch (error) {
      console.error("Error updating lesson:", error);
      res.status(500).json({ message: "Failed to update lesson" });
    }
  });

  // Content Editing Routes for Teachers
  app.put('/api/teacher/quizzes/:quizId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can edit quizzes" });
      }

      const quizId = parseInt(req.params.quizId);
      const quiz = await storage.updateQuizAsTeacher(quizId, req.body);
      
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: "Failed to update quiz" });
    }
  });

  app.put('/api/teacher/quiz-questions/:questionId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can edit quiz questions" });
      }

      const questionId = parseInt(req.params.questionId);
      
      // Update quiz question
      const [updatedQuestion] = await db
        .update(quizQuestionsTable)
        .set({
          questionText: req.body.questionText,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          correctAnswer: req.body.correctAnswer,
          explanation: req.body.explanation,
        })
        .where(eq(quizQuestionsTable.id, questionId))
        .returning();

      if (!updatedQuestion) {
        return res.status(404).json({ message: "Quiz question not found" });
      }

      res.json(updatedQuestion);
    } catch (error) {
      console.error("Error updating quiz question:", error);
      res.status(500).json({ message: "Failed to update quiz question" });
    }
  });

  app.put('/api/teacher/reflection-questions/:questionId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can edit reflection questions" });
      }

      const questionId = parseInt(req.params.questionId);
      
      // Update reflection question
      const [updatedQuestion] = await db
        .update(reflectionQuestionsTable)
        .set({
          questionText: req.body.questionText,
          promptText: req.body.promptText,
        })
        .where(eq(reflectionQuestionsTable.id, questionId))
        .returning();

      if (!updatedQuestion) {
        return res.status(404).json({ message: "Reflection question not found" });
      }

      res.json(updatedQuestion);
    } catch (error) {
      console.error("Error updating reflection question:", error);
      res.status(500).json({ message: "Failed to update reflection question" });
    }
  });

  // Get reflection responses by class (for grading)
  app.get('/api/teacher/reflection-responses/:classId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access reflection responses" });
      }

      const classId = parseInt(req.params.classId);

      // Verify teacher owns this class
      const teacherClass = await db
        .select()
        .from(teacherClasses)
        .where(and(
          eq(teacherClasses.id, classId),
          eq(teacherClasses.teacherId, userId)
        ))
        .limit(1);

      if (!teacherClass.length) {
        return res.status(404).json({ message: "Class not found" });
      }

      // Get students in this class
      const classStudents = await db
        .select({
          userId: classEnrollments.userId,
        })
        .from(classEnrollments)
        .where(eq(classEnrollments.classId, classId));

      if (!classStudents.length) {
        return res.json([]);
      }

      const studentIds = classStudents.map(s => s.userId);

      // Get all reflection responses from students in this class
      const responses = await db
        .select({
          id: reflectionResponsesTable.id,
          userId: reflectionResponsesTable.userId,
          questionId: reflectionResponsesTable.questionId,
          response: reflectionResponsesTable.response,
          grade: reflectionResponsesTable.grade,
          feedback: reflectionResponsesTable.feedback,
          gradedAt: reflectionResponsesTable.gradedAt,
          createdAt: reflectionResponsesTable.createdAt,
          userFirstName: usersTable.firstName,
          userLastName: usersTable.lastName,
          userEmail: usersTable.email,
          question: reflectionQuestionsTable.questionText,
          lessonId: reflectionQuestionsTable.lessonId,
        })
        .from(reflectionResponsesTable)
        .leftJoin(usersTable, eq(reflectionResponsesTable.userId, usersTable.id))
        .leftJoin(reflectionQuestionsTable, eq(reflectionResponsesTable.questionId, reflectionQuestionsTable.id))
        .where(inArray(reflectionResponsesTable.userId, studentIds))
        .orderBy(desc(reflectionResponsesTable.createdAt));

      // Transform the data to match the expected interface
      const formattedResponses = responses.map(r => ({
        id: r.id,
        userId: r.userId,
        questionId: r.questionId,
        response: r.response,
        grade: r.grade,
        feedback: r.feedback,
        gradedAt: r.gradedAt,
        createdAt: r.createdAt,
        user: {
          firstName: r.userFirstName || '',
          lastName: r.userLastName || '',
          email: r.userEmail || '',
        },
        question: {
          question: r.question || '',
          lessonId: r.lessonId || 0,
        },
      }));

      res.json(formattedResponses);
    } catch (error) {
      console.error("Error fetching reflection responses for class:", error);
      res.status(500).json({ message: "Failed to fetch reflection responses" });
    }
  });

  // Get quiz questions by class (for setting answers)
  app.get('/api/teacher/quiz-questions/:classId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can access quiz questions" });
      }

      const classId = parseInt(req.params.classId);

      // Verify teacher owns this class
      const teacherClass = await db
        .select()
        .from(teacherClasses)
        .where(and(
          eq(teacherClasses.id, classId),
          eq(teacherClasses.teacherId, userId)
        ))
        .limit(1);

      if (!teacherClass.length) {
        return res.status(404).json({ message: "Class not found" });
      }

      if (!teacherClass[0].courseId) {
        return res.json([]);
      }

      // Get all quiz questions for this class's course
      const questions = await db
        .select({
          id: quizQuestionsTable.id,
          quizId: quizQuestionsTable.quizId,
          question: quizQuestionsTable.questionText,
          optionA: quizQuestionsTable.option1,
          optionB: quizQuestionsTable.option2,
          optionC: quizQuestionsTable.option3,
          optionD: quizQuestionsTable.option4,
          correctAnswer: quizQuestionsTable.correctAnswer,
          explanation: quizQuestionsTable.explanation,
        })
        .from(quizQuestionsTable)
        .leftJoin(quizzesTable, eq(quizQuestionsTable.quizId, quizzesTable.id))
        .leftJoin(lessonsTable, eq(quizzesTable.lessonId, lessonsTable.id))
        .leftJoin(unitsTable, eq(lessonsTable.unitId, unitsTable.id))
        .where(eq(unitsTable.courseId, teacherClass[0].courseId))
        .orderBy(quizQuestionsTable.order);

      res.json(questions);
    } catch (error) {
      console.error("Error fetching quiz questions for class:", error);
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  // Grade reflection response
  app.put('/api/teacher/reflection-responses/:responseId/grade', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can grade responses" });
      }

      const responseId = parseInt(req.params.responseId);
      const { grade, feedback } = req.body;

      // Update the reflection response with grade and feedback
      const [updatedResponse] = await db
        .update(reflectionResponsesTable)
        .set({
          grade: parseInt(grade),
          feedback: feedback || null,
          gradedAt: new Date(),
        })
        .where(eq(reflectionResponsesTable.id, responseId))
        .returning();

      if (!updatedResponse) {
        return res.status(404).json({ message: "Reflection response not found" });
      }

      res.json(updatedResponse);
    } catch (error) {
      console.error("Error grading reflection response:", error);
      res.status(500).json({ message: "Failed to grade reflection response" });
    }
  });

  // Update quiz question answer
  app.put('/api/teacher/quiz-questions/:questionId/answer', requireAuth, async (req: any, res) => {
    try {
      const userId = req.currentUser.id;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can update quiz answers" });
      }

      const questionId = parseInt(req.params.questionId);
      const { correctAnswer, explanation } = req.body;

      // Update the quiz question with correct answer and explanation
      const [updatedQuestion] = await db
        .update(quizQuestionsTable)
        .set({
          correctAnswer: correctAnswer,
          explanation: explanation || null,
        })
        .where(eq(quizQuestionsTable.id, questionId))
        .returning();

      if (!updatedQuestion) {
        return res.status(404).json({ message: "Quiz question not found" });
      }

      res.json(updatedQuestion);
    } catch (error) {
      console.error("Error updating quiz answer:", error);
      res.status(500).json({ message: "Failed to update quiz answer" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
