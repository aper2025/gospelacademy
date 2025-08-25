import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  TrendingUp, 
  Award, 
  AlertCircle, 
  GraduationCap, 
  FileText, 
  BookOpen,
  UserPlus,
  CheckCircle,
  Clock,
  MessageSquare,
  MessageCircle
} from "lucide-react";
import { ClassChatForm } from "@/components/ClassChatForm";
import { ClassAnnouncementsList } from "@/components/ClassAnnouncementsList";

interface TeacherClass {
  id: number;
  className: string;
  description: string;
  courseId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  enrolledAt: string;
  isActive: boolean;
}

interface ReflectionResponse {
  id: number;
  userId: string;
  questionId: number;
  response: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  question: {
    question: string;
    lessonId: number;
  };
}

interface QuizQuestion {
  id: number;
  quizId: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
}

export default function TeacherDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [newClassDialogOpen, setNewClassDialogOpen] = useState(false);
  const [addStudentsDialogOpen, setAddStudentsDialogOpen] = useState(false);
  
  // Form states
  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [studentEmails, setStudentEmails] = useState("");

  // Redirect to home if not authenticated or not a teacher
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'teacher')) {
      toast({
        title: "Unauthorized",
        description: "Access restricted to teachers only.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  // Queries
  const { data: courseStats } = useQuery<any>({
    queryKey: ["/api/courses/1/stats"],
    enabled: isAuthenticated && user?.role === 'teacher',
  });

  const { data: teacherClasses } = useQuery<TeacherClass[]>({
    queryKey: ["/api/teacher/classes"],
    enabled: isAuthenticated && user?.role === 'teacher',
  });

  const { data: classStudents } = useQuery<Student[]>({
    queryKey: ["/api/teacher/classes", selectedClassId, "students"],
    enabled: isAuthenticated && user?.role === 'teacher' && selectedClassId !== null,
  });

  const { data: reflectionResponses } = useQuery<ReflectionResponse[]>({
    queryKey: ["/api/teacher/reflection-responses", selectedClassId],
    enabled: isAuthenticated && user?.role === 'teacher' && selectedClassId !== null,
  });

  const { data: quizQuestions } = useQuery<QuizQuestion[]>({
    queryKey: ["/api/teacher/quiz-questions", selectedClassId],
    enabled: isAuthenticated && user?.role === 'teacher' && selectedClassId !== null,
  });

  // Mutations
  const createClassMutation = useMutation({
    mutationFn: async (classData: { className: string; description: string; courseId: number }) => {
      return await apiRequest('POST', '/api/teacher/classes', classData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/classes"] });
      setNewClassDialogOpen(false);
      setNewClassName("");
      setNewClassDescription("");
      toast({
        title: "Success",
        description: "Class created successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create class. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addStudentsMutation = useMutation({
    mutationFn: async ({ classId, emails }: { classId: number; emails: string[] }) => {
      return await apiRequest('POST', `/api/teacher/classes/${classId}/students`, { emails });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/classes", selectedClassId, "students"] });
      setAddStudentsDialogOpen(false);
      setStudentEmails("");
      toast({
        title: "Success",
        description: "Students added successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add students. Please try again.",
        variant: "destructive",
      });
    },
  });

  const gradeReflectionMutation = useMutation({
    mutationFn: async ({ responseId, grade, feedback }: { responseId: number; grade: number; feedback: string }) => {
      return await apiRequest('PUT', `/api/teacher/reflection-responses/${responseId}/grade`, { grade, feedback });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/reflection-responses", selectedClassId] });
      toast({
        title: "Success",
        description: "Reflection graded successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to grade reflection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateQuizAnswerMutation = useMutation({
    mutationFn: async ({ questionId, correctAnswer, explanation }: { questionId: number; correctAnswer: string; explanation: string }) => {
      return await apiRequest('PUT', `/api/teacher/quiz-questions/${questionId}/answer`, { correctAnswer, explanation });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/quiz-questions", selectedClassId] });
      toast({
        title: "Success",
        description: "Quiz answer updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update quiz answer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (classId: number) => {
      return await apiRequest('DELETE', `/api/teacher/classes/${classId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/classes"] });
      setSelectedClassId(null);
      toast({
        title: "Success",
        description: "Class deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete class. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName || !newClassDescription) return;
    
    createClassMutation.mutate({
      className: newClassName,
      description: newClassDescription,
      courseId: 1, // Default to course 1
    });
  };

  const handleAddStudents = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !studentEmails.trim()) {
      toast({
        title: "Error",
        description: "Please select a class and enter student emails",
        variant: "destructive",
      });
      return;
    }
    
    const emails = studentEmails.split('\n').map(email => email.trim()).filter(email => email);
    addStudentsMutation.mutate({ classId: selectedClassId, emails });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your classes, students, and grade assignments
          </p>
        </div>

        {/* Class Selection Banner */}
        {(activeTab === "grading" || activeTab === "quizzes" || activeTab === "chat") && (
          <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-blue-900 dark:text-blue-100">Select a Class</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {selectedClassId 
                        ? `Currently managing: ${teacherClasses?.find(c => c.id === selectedClassId)?.className || 'selected class'}` 
                        : activeTab === "chat" ? "You must select a class to post messages" : "You must select a class to grade assignments"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedClassId?.toString() || ""} onValueChange={(value) => setSelectedClassId(parseInt(value))}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherClasses?.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedClassId && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedClassId(null)}
                    >
                      Clear Selection
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="classes" data-testid="tab-classes">Classes</TabsTrigger>
            <TabsTrigger value="chat" data-testid="tab-chat">Class Chat</TabsTrigger>
            <TabsTrigger value="grading" data-testid="tab-grading">Grade Reflections</TabsTrigger>
            <TabsTrigger value="quizzes" data-testid="tab-quizzes">Quiz Answers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-primary" data-testid="stat-students">
                        {courseStats?.totalEnrollments || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <GraduationCap className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(courseStats?.averageProgress || 0)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {courseStats?.completedQuizzes || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Quizzes Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(courseStats?.averageQuizScore || 0)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Avg Quiz Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Classes</h2>
              <Dialog open={newClassDialogOpen} onOpenChange={setNewClassDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-class">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Create New Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Class</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateClass} className="space-y-4">
                    <div>
                      <Label htmlFor="className">Class Name</Label>
                      <Input
                        id="className"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        placeholder="e.g., Period 1 Bible Study"
                        required
                        data-testid="input-class-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="classDescription">Description</Label>
                      <Textarea
                        id="classDescription"
                        value={newClassDescription}
                        onChange={(e) => setNewClassDescription(e.target.value)}
                        placeholder="Brief description of the class"
                        rows={3}
                        required
                        data-testid="input-class-description"
                      />
                    </div>
                    <Button type="submit" disabled={createClassMutation.isPending} data-testid="button-submit-class">
                      {createClassMutation.isPending ? "Creating..." : "Create Class"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherClasses?.map((cls) => (
                <Card key={cls.id} className="card-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {cls.className}
                      <Badge variant={cls.isActive ? "default" : "secondary"}>
                        {cls.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{cls.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Students: {classStudents && selectedClassId === cls.id ? classStudents.length : "Select to view"}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedClassId(cls.id)}
                          data-testid={`button-select-class-${cls.id}`}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Manage Students
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${cls.className}"? This cannot be undone.`)) {
                              deleteClassMutation.mutate(cls.id);
                            }
                          }}
                          disabled={deleteClassMutation.isPending}
                          data-testid={`button-delete-class-${cls.id}`}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <p className="text-gray-500 col-span-full text-center py-8">
                  No classes created yet. Create your first class to get started.
                </p>
              )}
            </div>

            {/* Student Management Section */}
            {selectedClassId && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Student Management</CardTitle>
                      <CardDescription>
                        Managing students for: {teacherClasses?.find(c => c.id === selectedClassId)?.className}
                      </CardDescription>
                    </div>
                    <Dialog open={addStudentsDialogOpen} onOpenChange={setAddStudentsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button data-testid="button-add-students">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Students
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Students to Class</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddStudents} className="space-y-4">
                          <div>
                            <Label htmlFor="studentEmails">Student Email Addresses</Label>
                            <Textarea
                              id="studentEmails"
                              value={studentEmails}
                              onChange={(e) => setStudentEmails(e.target.value)}
                              placeholder="Enter email addresses, one per line&#10;student1@example.com&#10;student2@example.com"
                              rows={5}
                              required
                              data-testid="input-student-emails"
                            />
                            <p className="text-sm text-gray-600 mt-1">
                              Enter one email address per line
                            </p>
                          </div>
                          <Button type="submit" disabled={addStudentsMutation.isPending} data-testid="button-submit-students">
                            {addStudentsMutation.isPending ? "Adding..." : "Add Students"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classStudents?.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{student.firstName} {student.lastName}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                        </div>
                        <Badge variant={student.isActive ? "default" : "secondary"}>
                          {student.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    )) || (
                      <p className="text-center text-gray-500 py-4">No students enrolled yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            {/* Class Chat Section */}
            {selectedClassId ? (
              <div className="space-y-6">
                {/* Post New Message Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Post New Message
                    </CardTitle>
                    <CardDescription>
                      Send announcements, assignments, or daily messages to your class
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClassChatForm classId={selectedClassId} onSuccess={() => window.location.reload()} />
                  </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Recent Messages
                    </CardTitle>
                    <CardDescription>
                      All announcements and messages for this class
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClassAnnouncementsList classId={selectedClassId} isTeacher={true} />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Class Selected
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Please select a class from the dropdown above to view and post messages.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="grading" className="space-y-6">
            {!selectedClassId ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Class</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Choose a class above to grade reflection questions
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Grade Reflection Questions</h2>
                <div className="space-y-4">
                  {reflectionResponses?.filter(response => !response.grade).map((response) => (
                    <ReflectionGradeCard
                      key={response.id}
                      response={response}
                      onGrade={(grade, feedback) => 
                        gradeReflectionMutation.mutate({ responseId: response.id, grade, feedback })
                      }
                      isGrading={gradeReflectionMutation.isPending}
                    />
                  )) || (
                    <p className="text-center text-gray-500 py-8">No ungraded reflections found.</p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            {!selectedClassId ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Class</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Choose a class above to manage quiz answers
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Manage Quiz Answers</h2>
                <div className="space-y-4">
                  {quizQuestions?.map((question: QuizQuestion) => (
                    <QuizAnswerCard
                      key={question.id}
                      question={question}
                      onUpdateAnswer={(correctAnswer, explanation) => 
                        updateQuizAnswerMutation.mutate({ questionId: question.id, correctAnswer, explanation })
                      }
                      isUpdating={updateQuizAnswerMutation.isPending}
                    />
                  )) || (
                    <p className="text-center text-gray-500 py-8">No quiz questions found.</p>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Reflection Grading Component
function ReflectionGradeCard({ 
  response, 
  onGrade, 
  isGrading 
}: { 
  response: ReflectionResponse; 
  onGrade: (grade: number, feedback: string) => void;
  isGrading: boolean;
}) {
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade) return;
    onGrade(parseInt(grade), feedback);
    setGrade("");
    setFeedback("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{response.user.firstName} {response.user.lastName}</span>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Pending Grade
          </Badge>
        </CardTitle>
        <CardDescription>
          {response.question.question}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Student Response:</Label>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mt-1">
              <p className="whitespace-pre-wrap">{response.response}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`grade-${response.id}`}>Grade (0-100)</Label>
                <Input
                  id={`grade-${response.id}`}
                  type="number"
                  min="0"
                  max="100"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Enter grade"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`feedback-${response.id}`}>Feedback (Optional)</Label>
                <Textarea
                  id={`feedback-${response.id}`}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback..."
                  rows={2}
                />
              </div>
            </div>
            <Button type="submit" disabled={isGrading}>
              {isGrading ? "Grading..." : "Submit Grade"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

// Quiz Answer Management Component
function QuizAnswerCard({ 
  question, 
  onUpdateAnswer, 
  isUpdating 
}: { 
  question: QuizQuestion; 
  onUpdateAnswer: (correctAnswer: string, explanation: string) => void;
  isUpdating: boolean;
}) {
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer || "");
  const [explanation, setExplanation] = useState(question.explanation || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctAnswer) return;
    onUpdateAnswer(correctAnswer, explanation);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Quiz Question</span>
          <Badge variant={question.correctAnswer ? "default" : "secondary"}>
            {question.correctAnswer ? (
              <><CheckCircle className="h-3 w-3 mr-1" />Answer Set</>
            ) : (
              <><Clock className="h-3 w-3 mr-1" />Needs Answer</>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Question:</Label>
            <p className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">{question.question}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>A) {question.optionA}</Label>
            </div>
            <div>
              <Label>B) {question.optionB}</Label>
            </div>
            <div>
              <Label>C) {question.optionC}</Label>
            </div>
            <div>
              <Label>D) {question.optionD}</Label>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor={`correct-${question.id}`}>Correct Answer</Label>
              <Select value={correctAnswer} onValueChange={setCorrectAnswer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A) {question.optionA}</SelectItem>
                  <SelectItem value="b">B) {question.optionB}</SelectItem>
                  <SelectItem value="c">C) {question.optionC}</SelectItem>
                  <SelectItem value="d">D) {question.optionD}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor={`explanation-${question.id}`}>Explanation (Optional)</Label>
              <Textarea
                id={`explanation-${question.id}`}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain why this is the correct answer..."
                rows={3}
              />
            </div>
            
            <Button type="submit" disabled={isUpdating || !correctAnswer}>
              {isUpdating ? "Updating..." : "Update Answer"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}