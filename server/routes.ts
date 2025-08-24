import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./replitAuth";
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
} from "@shared/schema";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

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

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      let userId;
      
      // Check if user is authenticated via email/password or OAuth
      if (req.session?.user) {
        userId = req.session.user.id;
      } else if (req.user?.claims?.sub) {
        userId = req.user.claims.sub;
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
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

  // Custom auth middleware that handles both OAuth and email/password
  const requireAuth = async (req: any, res: any, next: any) => {
    let userId;
    
    // Check if user is authenticated via email/password or OAuth
    if (req.session?.user) {
      userId = req.session.user.id;
    } else if (req.user?.claims?.sub) {
      userId = req.user.claims.sub;
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
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

  app.put('/api/lessons/:id', requireAuth, async (req: any, res) => {
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
  app.get('/api/my-enrollments', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const enrollments = await storage.getCourseEnrollmentsByUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.post('/api/courses/:courseId/enroll', requireAuth, async (req: any, res) => {
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
  app.post('/api/lessons/:lessonId/progress', requireAuth, async (req: any, res) => {
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

  app.get('/api/my-progress', requireAuth, async (req: any, res) => {
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
  app.post('/api/reflection-responses', requireAuth, async (req: any, res) => {
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
  app.get('/api/quiz-lock-status', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const activeLock = await storage.getActiveQuizLock(userId);
      res.json({ isLocked: !!activeLock, activeLock });
    } catch (error) {
      console.error("Error checking quiz lock status:", error);
      res.status(500).json({ message: "Failed to check quiz lock status" });
    }
  });

  app.post('/api/quiz-locks', requireAuth, async (req: any, res) => {
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

  app.delete('/api/quiz-locks', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await storage.clearQuizLock(userId);
      res.status(200).json({ message: "Quiz lock cleared" });
    } catch (error) {
      console.error("Error clearing quiz lock:", error);
      res.status(500).json({ message: "Failed to clear quiz lock" });
    }
  });

  app.get('/api/reflection-responses/:lessonId', requireAuth, async (req: any, res) => {
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
  app.post('/api/quizzes/:quizId/attempts', requireAuth, async (req: any, res) => {
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

  app.put('/api/quiz-attempts/:id', requireAuth, async (req: any, res) => {
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

  app.get('/api/courses/:courseId/student-activity', requireAuth, async (req: any, res) => {
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

  // Teacher Class Management Routes
  app.get('/api/teacher/classes', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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

  // Student Management Routes
  app.get('/api/teacher/classes/:classId/students', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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

  // Teacher Materials Routes
  app.get('/api/teacher/materials', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
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

  // Content Editing Routes for Teachers
  app.put('/api/teacher/quizzes/:quizId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can edit quiz questions" });
      }

      const questionId = parseInt(req.params.questionId);
      const question = await storage.updateQuizQuestionAsTeacher(questionId, req.body);
      
      if (!question) {
        return res.status(404).json({ message: "Quiz question not found" });
      }

      res.json(question);
    } catch (error) {
      console.error("Error updating quiz question:", error);
      res.status(500).json({ message: "Failed to update quiz question" });
    }
  });

  app.put('/api/teacher/reflection-questions/:questionId', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'teacher') {
        return res.status(403).json({ message: "Only teachers can edit reflection questions" });
      }

      const questionId = parseInt(req.params.questionId);
      const question = await storage.updateReflectionQuestionAsTeacher(questionId, req.body);
      
      if (!question) {
        return res.status(404).json({ message: "Reflection question not found" });
      }

      res.json(question);
    } catch (error) {
      console.error("Error updating reflection question:", error);
      res.status(500).json({ message: "Failed to update reflection question" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
