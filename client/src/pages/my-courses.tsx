import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Award, Users } from "lucide-react";
import { Link } from "wouter";

export default function MyCoursesPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/auth";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Fetch enrolled courses based on user role
  const { data: enrolledCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/my-enrolled-courses"],
    enabled: isAuthenticated,
  });

  if (isLoading || coursesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your courses...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {user.role === 'student' 
              ? "Courses you're enrolled in through your classes" 
              : "Courses you're teaching"
            }
          </p>
        </div>

        {!enrolledCourses || enrolledCourses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Courses Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {user.role === 'student' 
                  ? "You're not enrolled in any courses yet. Contact your teacher to get enrolled in a class."
                  : "You haven't assigned any courses to your classes yet. Go to your teacher dashboard to assign courses to your classes."
                }
              </p>
              <Link href={user.role === 'teacher' ? "/teacher" : "/"}>
                <Button>
                  {user.role === 'teacher' ? "Go to Teacher Dashboard" : "Go to Dashboard"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course: any) => (
              <Card key={course.id} className="card-shadow hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {course.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {user.role === 'student' ? 'Enrolled' : 'Teaching'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {course.totalLessons || 0} lessons
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Award className="h-4 w-4 mr-2" />
                      {course.totalQuizzes || 0} quizzes
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      {course.estimatedDuration || "Self-paced"}
                    </div>
                    {user.role === 'student' && course.className && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        Class: {course.className}
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <Link href={`/courses/${course.id}`}>
                      <Button className="w-full" data-testid={`button-enter-course-${course.id}`}>
                        {user.role === 'student' ? 'Continue Learning' : 'Manage Course'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}