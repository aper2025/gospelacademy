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
import { BookOpen, Clock, Award, FileText } from "lucide-react";
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

  const { data: courseOverview } = useQuery<{
    totalLessons: number;
    totalUnits: number;
    totalQuizzes: number;
    estimatedDuration: string;
  }>({
    queryKey: ["/api/courses/1/overview"],
    enabled: isAuthenticated,
  });

  const { data: recentActivity } = useQuery<Array<{
    type: 'lesson' | 'quiz' | 'reflection';
    title: string;
    timestamp: string;
    status: string;
    score?: number;
  }>>({
    queryKey: ["/api/courses/1/my-recent-activity"],
    enabled: isAuthenticated,
  });

  // Type guard for progress data
  const progressArray = Array.isArray(progress) ? progress : [];

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
                    <div className="text-2xl font-bold text-primary">{courseOverview?.totalLessons || 0}</div>
                    <div className="text-sm text-muted">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{courseOverview?.estimatedDuration || 'Loading...'}</div>
                    <div className="text-sm text-muted">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{courseOverview?.totalQuizzes || 0}</div>
                    <div className="text-sm text-muted">Assessments</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <Link href="/lessons/1">
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
                  {(() => {
                    // Check if lesson 1 is completed
                    const lesson1Progress = progressArray.find((p: any) => p.lessonId === 1);
                    const isLessonCompleted = lesson1Progress?.isCompleted;
                    
                    if (!isLessonCompleted) {
                      return (
                        <Button variant="secondary" className="w-full" disabled>
                          Complete Lesson First
                        </Button>
                      );
                    }
                    
                    return (
                      <Button variant="secondary" className="w-full" asChild>
                        <Link href="/quiz/5">
                          Chapter 1 Quiz
                        </Link>
                      </Button>
                    );
                  })()}
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

              <Card className="card-shadow hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <FileText className="h-6 w-6 text-orange-500 mr-3" />
                  <CardTitle className="text-lg">Course Textbook</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Read the full textbook: "The Life of Christ & The Early Church"
                  </CardDescription>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/textbook">
                      Open Textbook
                    </Link>
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
                  {recentActivity && recentActivity.length > 0 ? (
                    recentActivity.map((activity: any, index: number) => {
                      const activityTypeColors = {
                        lesson: 'bg-blue-50 dark:bg-blue-950/20',
                        quiz: 'bg-green-50 dark:bg-green-950/20',
                        reflection: 'bg-orange-50 dark:bg-orange-950/20',
                      };
                      
                      const formatTimestamp = (timestamp: string) => {
                        const date = new Date(timestamp);
                        const now = new Date();
                        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                        
                        if (diffHours < 1) return 'Less than an hour ago';
                        if (diffHours < 24) return `${diffHours} hours ago`;
                        const diffDays = Math.floor(diffHours / 24);
                        if (diffDays === 1) return '1 day ago';
                        if (diffDays < 7) return `${diffDays} days ago`;
                        return date.toLocaleDateString();
                      };

                      return (
                        <div 
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg ${activityTypeColors[activity.type] || 'bg-gray-50 dark:bg-gray-800'}`}
                        >
                          <div>
                            <div className="font-medium">
                              {activity.title}
                              {activity.score !== undefined && ` (${activity.score}%)`}
                            </div>
                            <div className="text-sm text-muted">
                              {formatTimestamp(activity.timestamp)}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            <span className={
                              activity.status === 'Completed' ? 'text-secondary' :
                              activity.status === 'Passed' ? 'text-green-600' :
                              activity.status === 'Needs Review' ? 'text-red-600' :
                              'text-accent'
                            }>
                              {activity.status}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted">
                      <div className="font-medium">No recent activity</div>
                      <div className="text-sm">Start learning to see your progress here!</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
