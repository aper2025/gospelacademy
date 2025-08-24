import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/layout/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Users, 
  TrendingUp, 
  Award, 
  AlertCircle, 
  GraduationCap, 
  FileText, 
  Trash2,
  BookOpen,
  UserPlus,
  Upload,
  Link as LinkIcon
} from "lucide-react";

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

interface TeacherMaterial {
  id: number;
  title: string;
  type: 'link' | 'file' | 'url';
  content: string;
  description?: string;
  classId?: number;
  lessonId?: number;
  createdAt: string;
}

export default function TeacherDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [newClassDialogOpen, setNewClassDialogOpen] = useState(false);
  const [addStudentsDialogOpen, setAddStudentsDialogOpen] = useState(false);
  const [newMaterialDialogOpen, setNewMaterialDialogOpen] = useState(false);
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [editLessonsDialogOpen, setEditLessonsDialogOpen] = useState(false);
  const [editQuizzesDialogOpen, setEditQuizzesDialogOpen] = useState(false);
  const [editReflectionsDialogOpen, setEditReflectionsDialogOpen] = useState(false);
  
  // Form states
  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [newClassCourseId, setNewClassCourseId] = useState<string>("");
  const [selectedCourseForClass, setSelectedCourseForClass] = useState<string>("");
  const [studentEmails, setStudentEmails] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialType, setMaterialType] = useState<'link' | 'file' | 'url'>('link');
  const [materialContent, setMaterialContent] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");

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

  const { data: studentActivity } = useQuery<any[]>({
    queryKey: ["/api/courses/1/student-activity"],
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

  const { data: teacherMaterials } = useQuery<TeacherMaterial[]>({
    queryKey: ["/api/teacher/materials"],
    enabled: isAuthenticated && user?.role === 'teacher',
  });

  const { data: courses } = useQuery<any[]>({
    queryKey: ["/api/courses"],
    enabled: isAuthenticated && user?.role === 'teacher',
  });

  // Mutations
  const createClassMutation = useMutation({
    mutationFn: async (classData: { className: string; description: string; courseId?: number }) => {
      const response = await apiRequest('POST', '/api/teacher/classes', classData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/classes"] });
      setNewClassDialogOpen(false);
      setNewClassName("");
      setNewClassDescription("");
      setNewClassCourseId("");
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
        description: "Failed to create class",
        variant: "destructive",
      });
    },
  });

  const addStudentsMutation = useMutation({
    mutationFn: async ({ classId, emails }: { classId: number; emails: string[] }) => {
      const response = await apiRequest('POST', `/api/teacher/classes/${classId}/students`, { emails });
      return await response.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/classes", selectedClassId, "students"] });
      setAddStudentsDialogOpen(false);
      setStudentEmails("");
      toast({
        title: "Success",
        description: data.message,
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
        description: "Failed to add students",
        variant: "destructive",
      });
    },
  });

  const createMaterialMutation = useMutation({
    mutationFn: async (materialData: {
      title: string;
      type: string;
      content: string;
      description?: string;
      classId?: number;
    }) => {
      const response = await apiRequest('POST', '/api/teacher/materials', materialData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/materials"] });
      setNewMaterialDialogOpen(false);
      setMaterialTitle("");
      setMaterialContent("");
      setMaterialDescription("");
      toast({
        title: "Success",
        description: "Material added successfully",
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
        description: "Failed to add material",
        variant: "destructive",
      });
    },
  });

  const assignCourseMutation = useMutation({
    mutationFn: async ({ classId, courseId }: { classId: number; courseId: number }) => {
      const response = await apiRequest('PUT', `/api/teacher/classes/${classId}/course`, { courseId });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/classes"] });
      setSelectedCourseForClass("");
      toast({
        title: "Success",
        description: "Course assigned to class successfully",
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
        description: "Failed to assign course to class",
        variant: "destructive",
      });
    },
  });

  const removeStudentMutation = useMutation({
    mutationFn: async ({ classId, studentId }: { classId: number; studentId: string }) => {
      const response = await apiRequest('DELETE', `/api/teacher/classes/${classId}/students/${studentId}`);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/classes", selectedClassId, "students"] });
      toast({
        title: "Success",
        description: "Student removed from class",
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
        description: "Failed to remove student",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== 'teacher') {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Track':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>;
      case 'Behind':
        return <Badge variant="destructive">Behind</Badge>;
      case 'Ahead':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Ahead</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName) return;
    
    createClassMutation.mutate({
      className: newClassName,
      description: newClassDescription,
      courseId: newClassCourseId ? parseInt(newClassCourseId) : undefined,
    });
  };

  const handleAssignCourse = (classId: number) => {
    if (!selectedCourseForClass) return;
    
    assignCourseMutation.mutate({
      classId,
      courseId: parseInt(selectedCourseForClass),
    });
  };

  const handleAddStudents = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !studentEmails.trim()) return;
    
    const emails = studentEmails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));
    
    if (emails.length === 0) {
      toast({
        title: "Error",
        description: "Please enter valid email addresses",
        variant: "destructive",
      });
      return;
    }
    
    addStudentsMutation.mutate({ classId: selectedClassId, emails });
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialTitle || !materialContent || !selectedClassId) {
      toast({
        title: "Error",
        description: "Please select a class before adding materials",
        variant: "destructive",
      });
      return;
    }
    
    createMaterialMutation.mutate({
      title: materialTitle,
      type: materialType,
      content: materialContent,
      description: materialDescription,
      classId: selectedClassId,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your classes, students, and course content
          </p>
        </div>

        {/* Class Selection Banner for Content Management */}
        {(activeTab === "materials" || activeTab === "content") && (
          <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-blue-900 dark:text-blue-100">Select a Class</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {selectedClassId 
                        ? `Currently editing content for: ${teacherClasses?.data?.find(c => c.id === selectedClassId)?.className || 'selected class'}` 
                        : "You must select a class before making content changes"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedClassId?.toString() || ""} onValueChange={(value) => setSelectedClassId(parseInt(value))}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choose a class to modify" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherClasses?.data?.map((cls) => (
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
            <TabsTrigger value="students" data-testid="tab-students">Students</TabsTrigger>
            <TabsTrigger value="materials" data-testid="tab-materials">Materials</TabsTrigger>
            <TabsTrigger value="content" data-testid="tab-content">Content</TabsTrigger>
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
                      <div className="text-sm text-muted">Enrolled Students</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <GraduationCap className="h-8 w-8 text-secondary" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-secondary" data-testid="stat-classes">
                        {teacherClasses?.length || 0}
                      </div>
                      <div className="text-sm text-muted">Active Classes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-accent" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-accent" data-testid="stat-score">
                        {courseStats?.averageScore || 0}%
                      </div>
                      <div className="text-sm text-muted">Avg Quiz Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="stat-materials">
                        {teacherMaterials?.length || 0}
                      </div>
                      <div className="text-sm text-muted">Materials</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student Activity Table */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Recent Student Activity</CardTitle>
                <CardDescription>
                  Monitor your students' learning progress and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium">Student</th>
                        <th className="text-left py-3 px-4 font-medium">Last Activity</th>
                        <th className="text-left py-3 px-4 font-medium">Progress</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {studentActivity?.map((student: any) => (
                        <tr key={student.userId} data-testid={`student-row-${student.userId}`}>
                          <td className="py-4 px-4 font-medium">{student.userName}</td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{student.lastActivity}</td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{student.progress}%</td>
                          <td className="py-4 px-4">{getStatusBadge(student.status)}</td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-500">
                            No student activity data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Classes</h2>
              <Dialog open={newClassDialogOpen} onOpenChange={setNewClassDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-class">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Class
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
                        placeholder="e.g., New Testament Survey - Period 1"
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
                        data-testid="input-class-description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="classCourse">Course (Optional)</Label>
                      <Select 
                        value={newClassCourseId} 
                        onValueChange={setNewClassCourseId}
                        data-testid="select-class-course"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course (can be set later)" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses?.map((course: any) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        You can assign a course now or later from the class management page.
                      </p>
                    </div>
                    <Button type="submit" disabled={createClassMutation.isPending} data-testid="button-submit-class">
                      {createClassMutation.isPending ? "Creating..." : "Create Class"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherClasses?.map((teacherClass) => (
                <Card key={teacherClass.id} className="card-shadow" data-testid={`class-card-${teacherClass.id}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {teacherClass.className}
                      <Badge variant="outline">Active</Badge>
                    </CardTitle>
                    <CardDescription>{teacherClass.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Created: {new Date(teacherClass.createdAt).toLocaleDateString()}
                        </p>
                        {teacherClass.courseId ? (
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">
                              Course Assigned
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-orange-500" />
                              <span className="text-sm text-orange-600">
                                No course assigned
                              </span>
                            </div>
                            <div className="space-y-2">
                              <Select 
                                value={selectedCourseForClass} 
                                onValueChange={setSelectedCourseForClass}
                                data-testid={`select-course-for-class-${teacherClass.id}`}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select course to assign" />
                                </SelectTrigger>
                                <SelectContent>
                                  {courses?.map((course: any) => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                      {course.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleAssignCourse(teacherClass.id)}
                                disabled={!selectedCourseForClass || assignCourseMutation.isPending}
                                data-testid={`button-assign-course-${teacherClass.id}`}
                              >
                                {assignCourseMutation.isPending ? "Assigning..." : "Assign Course"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedClassId(teacherClass.id);
                            setActiveTab("students");
                          }}
                          data-testid={`button-manage-students-${teacherClass.id}`}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Manage Students
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
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Student Management</h2>
                {selectedClassId && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Managing students for: {teacherClasses?.find(c => c.id === selectedClassId)?.className}
                  </p>
                )}
              </div>
              {selectedClassId && (
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
              )}
            </div>

            {!selectedClassId ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Class</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Choose a class from the Classes tab to manage its students
                  </p>
                  <Button onClick={() => setActiveTab("classes")} data-testid="button-go-to-classes">
                    Go to Classes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Class Students</CardTitle>
                  <CardDescription>
                    Students enrolled in {teacherClasses?.find(c => c.id === selectedClassId)?.className}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {classStudents?.length ? (
                    <div className="space-y-4">
                      {classStudents.map((student) => (
                        <div 
                          key={student.id} 
                          className="flex items-center justify-between p-4 border rounded-lg"
                          data-testid={`student-item-${student.id}`}
                        >
                          <div>
                            <h4 className="font-medium">{student.firstName} {student.lastName}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                            <p className="text-xs text-gray-500">
                              Enrolled: {new Date(student.enrolledAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeStudentMutation.mutate({ 
                              classId: selectedClassId, 
                              studentId: student.id 
                            })}
                            disabled={removeStudentMutation.isPending}
                            data-testid={`button-remove-student-${student.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No students enrolled in this class yet. Add some students to get started.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Teaching Materials</h2>
                {selectedClassId && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Managing materials for: {teacherClasses?.data?.find(c => c.id === selectedClassId)?.className || 'selected class'}
                  </p>
                )}
              </div>
              <Dialog open={newMaterialDialogOpen} onOpenChange={setNewMaterialDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    data-testid="button-add-material"
                    disabled={!selectedClassId}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Material</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateMaterial} className="space-y-4">
                    <div>
                      <Label htmlFor="materialTitle">Title</Label>
                      <Input
                        id="materialTitle"
                        value={materialTitle}
                        onChange={(e) => setMaterialTitle(e.target.value)}
                        placeholder="Material title"
                        required
                        data-testid="input-material-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="materialType">Type</Label>
                      <Select value={materialType} onValueChange={(value: 'link' | 'file' | 'url') => setMaterialType(value)}>
                        <SelectTrigger data-testid="select-material-type">
                          <SelectValue placeholder="Select material type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="link">External Link</SelectItem>
                          <SelectItem value="file">File Upload</SelectItem>
                          <SelectItem value="url">Resource URL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="materialContent">Content</Label>
                      <Input
                        id="materialContent"
                        value={materialContent}
                        onChange={(e) => setMaterialContent(e.target.value)}
                        placeholder={materialType === 'link' ? 'https://example.com' : 'Content or file path'}
                        required
                        data-testid="input-material-content"
                      />
                    </div>
                    <div>
                      <Label htmlFor="materialDescription">Description</Label>
                      <Textarea
                        id="materialDescription"
                        value={materialDescription}
                        onChange={(e) => setMaterialDescription(e.target.value)}
                        placeholder="Brief description of the material"
                        data-testid="input-material-description"
                      />
                    </div>
                    <Button type="submit" disabled={createMaterialMutation.isPending} data-testid="button-submit-material">
                      {createMaterialMutation.isPending ? "Adding..." : "Add Material"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {!selectedClassId ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Class</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Choose a class above to add and manage teaching materials specifically for that class
                  </p>
                  <Button onClick={() => setActiveTab("classes")} data-testid="button-go-to-classes-materials">
                    Go to Classes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacherMaterials?.filter(material => material.classId === selectedClassId)?.map((material) => (
                  <Card key={material.id} className="card-shadow" data-testid={`material-card-${material.id}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {material.type === 'link' && <LinkIcon className="h-4 w-4" />}
                        {material.type === 'file' && <Upload className="h-4 w-4" />}
                        {material.type === 'url' && <BookOpen className="h-4 w-4" />}
                        {material.title}
                      </CardTitle>
                      <CardDescription>{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {material.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          Added: {new Date(material.createdAt).toLocaleDateString()}
                        </p>
                        <Badge variant="outline" className="capitalize">
                          {material.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <p className="text-gray-500 col-span-full text-center py-8">
                    No materials added yet for this class. Add your first teaching material to get started.
                  </p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Content Management</h2>
                {selectedClassId && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Editing content for: {teacherClasses?.data?.find(c => c.id === selectedClassId)?.className || 'selected class'}
                  </p>
                )}
              </div>
            </div>

            {!selectedClassId ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Class</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Choose a class above to modify lessons, quizzes, and reflection questions specifically for that class
                  </p>
                  <Button onClick={() => setActiveTab("classes")} data-testid="button-go-to-classes-content">
                    Go to Classes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="card-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5" />
                      Edit Course Content
                    </CardTitle>
                    <CardDescription>
                      Modify lessons, quizzes, and reflection questions for the selected class
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline" 
                        data-testid="button-edit-lessons"
                        onClick={() => setEditLessonsDialogOpen(true)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Edit Lessons
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline" 
                        data-testid="button-edit-quizzes"
                        onClick={() => setEditQuizzesDialogOpen(true)}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Edit Quizzes
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline" 
                        data-testid="button-edit-reflections"
                        onClick={() => setEditReflectionsDialogOpen(true)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Edit Reflection Questions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Analytics & Reports
                    </CardTitle>
                    <CardDescription>
                      View detailed student progress and performance for this class
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline" data-testid="button-view-analytics">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button className="w-full justify-start" variant="outline" data-testid="button-export-grades">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Grades
                      </Button>
                      <Button className="w-full justify-start" variant="outline" data-testid="button-progress-reports">
                        <Users className="h-4 w-4 mr-2" />
                        Progress Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Lessons Dialog */}
        <Dialog open={editLessonsDialogOpen} onOpenChange={setEditLessonsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Lessons</DialogTitle>
              <DialogDescription>
                Modify lesson content for {teacherClasses?.data?.find(c => c.id === selectedClassId)?.className || 'selected class'}
              </DialogDescription>
            </DialogHeader>
            <LessonEditor classId={selectedClassId} onClose={() => setEditLessonsDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Edit Quizzes Dialog */}
        <Dialog open={editQuizzesDialogOpen} onOpenChange={setEditQuizzesDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Quizzes</DialogTitle>
              <DialogDescription>
                Modify quiz questions and settings for {teacherClasses?.data?.find(c => c.id === selectedClassId)?.className || 'selected class'}
              </DialogDescription>
            </DialogHeader>
            <QuizEditor classId={selectedClassId} onClose={() => setEditQuizzesDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Edit Reflection Questions Dialog */}
        <Dialog open={editReflectionsDialogOpen} onOpenChange={setEditReflectionsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Reflection Questions</DialogTitle>
              <DialogDescription>
                Modify reflection questions for {teacherClasses?.data?.find(c => c.id === selectedClassId)?.className || 'selected class'}
              </DialogDescription>
            </DialogHeader>
            <ReflectionEditor classId={selectedClassId} onClose={() => setEditReflectionsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Lesson Editor Component
function LessonEditor({ classId, onClose }: { classId: number | null; onClose: () => void }) {
  const { data: lessons, isLoading } = useQuery({
    queryKey: ["/api/lessons", classId],
    enabled: !!classId,
  });

  const queryClient = useQueryClient();
  
  const updateLessonMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest('PUT', `/api/teacher/lessons/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/lessons", classId] });
    },
  });

  if (!classId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please select a class to edit lessons.</p>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading lessons...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="max-h-96 overflow-y-auto space-y-4">
        {lessons?.map((lesson: any) => (
          <LessonEditForm 
            key={lesson.id} 
            lesson={lesson} 
            onUpdate={(data) => updateLessonMutation.mutate({ id: lesson.id, data })}
            isUpdating={updateLessonMutation.isPending}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

// Lesson Edit Form
function LessonEditForm({ lesson, onUpdate, isUpdating }: { lesson: any; onUpdate: (data: any) => void; isUpdating: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const lessonSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    learningObjectives: z.string(),
    keyTerms: z.string(),
    videoUrl: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson.title || "",
      content: lesson.content || "",
      learningObjectives: lesson.learningObjectives || "",
      keyTerms: lesson.keyTerms || "",
      videoUrl: lesson.videoUrl || "",
    },
  });

  const handleSubmit = (data: any) => {
    onUpdate(data);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{lesson.title}</CardTitle>
          <Button size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {lesson.content}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Edit Lesson</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="learningObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Objectives</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Terms</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://youtube.com/..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Quiz Editor Component
function QuizEditor({ classId, onClose }: { classId: number | null; onClose: () => void }) {
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ["/api/quizzes", classId],
    enabled: !!classId,
  });

  if (!classId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please select a class to edit quizzes.</p>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading quizzes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="max-h-96 overflow-y-auto space-y-4">
        {quizzes?.map((quiz: any) => (
          <QuizEditForm key={quiz.id} quiz={quiz} classId={classId} />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

// Quiz Edit Form
function QuizEditForm({ quiz, classId }: { quiz: any; classId: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: questions } = useQuery({
    queryKey: ["/api/quiz-questions", quiz.id],
    enabled: isEditing,
  });

  const updateQuizMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('PUT', `/api/teacher/quizzes/${quiz.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes", classId] });
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest('PUT', `/api/teacher/quiz-questions/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quiz-questions", quiz.id] });
    },
  });

  if (!isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{quiz.title}</CardTitle>
          <Button size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Questions: {quiz.questionCount || "Loading..."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Edit Quiz: {quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {questions?.map((question: any) => (
            <QuestionEditForm 
              key={question.id} 
              question={question} 
              onUpdate={(data) => updateQuestionMutation.mutate({ id: question.id, data })}
              isUpdating={updateQuestionMutation.isPending}
            />
          ))}
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)}>
              Done Editing
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Question Edit Form
function QuestionEditForm({ question, onUpdate, isUpdating }: { question: any; onUpdate: (data: any) => void; isUpdating: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const questionSchema = z.object({
    questionText: z.string().min(1, "Question text is required"),
    option1: z.string().min(1, "Option 1 is required"),
    option2: z.string().min(1, "Option 2 is required"),
    option3: z.string().min(1, "Option 3 is required"),
    option4: z.string().min(1, "Option 4 is required"),
    correctAnswer: z.string().min(1, "Correct answer is required"),
    explanation: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: question.questionText || "",
      option1: question.option1 || "",
      option2: question.option2 || "",
      option3: question.option3 || "",
      option4: question.option4 || "",
      correctAnswer: question.correctAnswer || "",
      explanation: question.explanation || "",
    },
  });

  const handleSubmit = (data: any) => {
    onUpdate(data);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="border rounded p-4 space-y-2">
        <div className="flex justify-between items-start">
          <p className="font-medium">{question.questionText}</p>
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Correct: {question.correctAnswer}
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="option1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option A</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option B</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option C</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option D</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Explanation</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save"}
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// Reflection Editor Component
function ReflectionEditor({ classId, onClose }: { classId: number | null; onClose: () => void }) {
  const { data: reflectionQuestions, isLoading } = useQuery({
    queryKey: ["/api/reflection-questions", classId],
    enabled: !!classId,
  });

  const queryClient = useQueryClient();
  
  const updateReflectionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest('PUT', `/api/teacher/reflection-questions/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reflection-questions", classId] });
    },
  });

  if (!classId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please select a class to edit reflection questions.</p>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading reflection questions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="max-h-96 overflow-y-auto space-y-4">
        {reflectionQuestions?.map((question: any) => (
          <ReflectionEditForm 
            key={question.id} 
            question={question} 
            onUpdate={(data) => updateReflectionMutation.mutate({ id: question.id, data })}
            isUpdating={updateReflectionMutation.isPending}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

// Reflection Edit Form
function ReflectionEditForm({ question, onUpdate, isUpdating }: { question: any; onUpdate: (data: any) => void; isUpdating: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const reflectionSchema = z.object({
    questionText: z.string().min(1, "Question text is required"),
    promptText: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(reflectionSchema),
    defaultValues: {
      questionText: question.questionText || "",
      promptText: question.promptText || "",
    },
  });

  const handleSubmit = (data: any) => {
    onUpdate(data);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{question.questionText}</CardTitle>
          <Button size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {question.promptText}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Edit Reflection Question</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="questionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="promptText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt/Instructions</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}