import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ProgressWidget from "@/components/progress-widget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Award } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
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
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses"],
    enabled: isAuthenticated,
  });

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["/api/my-enrollments"],
    enabled: isAuthenticated,
  });

  const { data: progress } = useQuery({
    queryKey: ["/api/my-progress"],
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const isTeacher = user?.role === 'teacher';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Sidebar />
            <div className="mt-6">
              <ProgressWidget />
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            {/* Course Header */}
            <Card className="card-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary to-blue-600 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="relative h-full flex items-center px-8">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2">New Testament Survey: The Life of Christ</h1>
                    <p className="text-blue-100 text-lg">Explore the teachings and ministry of Jesus Christ through the New Testament</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">8 weeks</div>
                    <div className="text-sm text-muted">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">4</div>
                    <div className="text-sm text-muted">Assessments</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-shadow hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <BookOpen className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-lg">Continue Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Pick up where you left off in your current lesson
                  </CardDescription>
                  <Button className="w-full" asChild>
                    <Link href="/lesson/1">
                      Start Chapter 1
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-shadow hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Clock className="h-6 w-6 text-secondary mr-3" />
                  <CardTitle className="text-lg">Take Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Test your knowledge with the latest quiz
                  </CardDescription>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/quiz/5">
                      Chapter 1 Quiz
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-shadow hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Award className="h-6 w-6 text-accent mr-3" />
                  <CardTitle className="text-lg">View Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Check your learning progress and achievements
                  </CardDescription>
                  <Button variant="outline" className="w-full">
                    View Progress
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Teacher Actions */}
            {isTeacher && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-6 w-6 mr-3 text-accent" />
                    Teacher Dashboard
                  </CardTitle>
                  <CardDescription>
                    Manage your courses and track student progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-x-3">
                    <Button asChild>
                      <Link href="/teacher">
                        Open Teacher Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline">
                      Create New Lesson
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Completed Lesson 2: The Ministry Begins</div>
                      <div className="text-sm text-muted">2 hours ago</div>
                    </div>
                    <div className="text-sm text-secondary font-medium">Completed</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Quiz 2 Score: 89%</div>
                      <div className="text-sm text-muted">1 day ago</div>
                    </div>
                    <div className="text-sm text-secondary font-medium">Passed</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Reflection Questions Submitted</div>
                      <div className="text-sm text-muted">3 days ago</div>
                    </div>
                    <div className="text-sm text-accent font-medium">Submitted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
