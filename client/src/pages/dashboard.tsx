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
                    <div className="text-2xl font-bold text-primary">18</div>
                    <div className="text-sm text-muted">Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">18 weeks</div>
                    <div className="text-sm text-muted">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">18</div>
                    <div className="text-sm text-muted">Quizzes</div>
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
                    <Link href="/lessons/17">
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
                    // Check if lesson 17 is completed (Chapter 1)
                    const lesson1Progress = progressArray.find((p: any) => p.lessonId === 17);
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
                        <Link href="/quiz/18">
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

            {/* Course Units */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Course Structure</CardTitle>
                <CardDescription>All 18 chapters organized into 4 units</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Unit 1 */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-primary">Unit 1: Setting the Stage for the King</h3>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/17">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 1: The Intertestamental Period
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/18">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 2: Political and Religious World
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/19">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 3: Introduction to the Four Gospels
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Unit 2 */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-primary">Unit 2: The Early Life and Ministry of Jesus</h3>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/20">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 4: The Incarnation - Birth of Jesus
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/21">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 5: Baptism and Temptation
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/22">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 6: Calling of the Twelve Disciples
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/23">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 7: Jesus' Early Miracles
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/24">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 8: The Growing Opposition
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Unit 3 */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-primary">Unit 3: The Teachings of Jesus</h3>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/25">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 9: The Sermon on the Mount
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/26">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 10: The Parables of the Kingdom
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/27">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 11: The 'I AM' Statements
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/28">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 12: Miracles and Their Meaning
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/29">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 13: The Upper Room Discourse
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/30">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 14: Final Teachings and Warnings
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Unit 4 */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-primary">Unit 4: The Climax of the Gospels</h3>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/31">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 15: Triumphal Entry and Final Week
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/32">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 16: The Last Supper and Gethsemane
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/33">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 17: The Trials, Crucifixion, and Death
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/lessons/34">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Chapter 18: The Resurrection
                        </Link>
                      </Button>
                    </div>
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
