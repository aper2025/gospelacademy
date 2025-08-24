import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Clock, TrendingUp, CheckCircle } from "lucide-react";

export default function ProgressPage() {
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

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/my-detailed-progress"],
    enabled: isAuthenticated,
  });

  const { data: recentActivity } = useQuery({
    queryKey: ["/api/my-recent-activity"],
    enabled: isAuthenticated,
  });

  if (isLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your progress...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Progress</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your learning achievements and course completion
          </p>
        </div>

        {!progressData || progressData.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Progress Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start learning to see your progress here!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Overall Progress Stats */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {progressData.totalCoursesEnrolled || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Courses Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {progressData.totalLessonsCompleted || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {progressData.totalQuizzesPassed || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Quizzes Passed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Progress */}
            {progressData.courses && progressData.courses.map((course: any) => (
              <Card key={course.id} className="card-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>
                        {course.className && `Class: ${course.className}`}
                      </CardDescription>
                    </div>
                    <Badge variant={course.isCompleted ? "default" : "secondary"}>
                      {course.isCompleted ? "Completed" : `${course.progress || 0}% Complete`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Course Progress</span>
                        <span>{course.progress || 0}%</span>
                      </div>
                      <Progress value={course.progress || 0} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span>{course.lessonsCompleted || 0}/{course.totalLessons || 0} Lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span>{course.quizzesPassed || 0}/{course.totalQuizzes || 0} Quizzes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span>{course.timeSpent || 0} min</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Recent Activity */}
            {recentActivity && recentActivity.length > 0 && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 10).map((activity: any, index: number) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <div className="flex items-center gap-3">
                          {activity.type === 'lesson' && <BookOpen className="h-4 w-4 text-blue-500" />}
                          {activity.type === 'quiz' && <Award className="h-4 w-4 text-yellow-500" />}
                          {activity.type === 'reflection' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          <div>
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge variant={activity.status === 'completed' ? "default" : "secondary"}>
                          {activity.status}
                          {activity.score && ` (${activity.score}%)`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}