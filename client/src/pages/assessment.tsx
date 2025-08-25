import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trophy, Clock, Users, FileText, PlayCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ProgressWidget from "@/components/progress-widget";

export default function Assessment() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

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

  // Get final tests (lesson 17 quizzes)
  const { data: finalTests, isLoading: testsLoading } = useQuery<any[]>({
    queryKey: ["/api/lessons/17/quizzes"],
    enabled: isAuthenticated,
  });

  // Get lesson 17 details
  const { data: lesson } = useQuery<any>({
    queryKey: ["/api/lessons/17"],
    enabled: isAuthenticated,
  });

  if (isLoading || testsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div>Loading assessment...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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

          <main className="lg:col-span-3">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-full">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Final Assessment
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Complete your study of "The Life of Christ" with these comprehensive final tests
                </p>
              </div>

              {/* Course Overview Card */}
              {lesson && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <span>{lesson.title}</span>
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {lesson.content?.split('\n')[0] || 'Complete your study with these final assessments'}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}

              {/* Final Tests Grid */}
              <div className="grid gap-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Final Tests
                </h2>
                
                {finalTests && finalTests.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {finalTests.map((test, index) => (
                      <Card key={test.id} className="card-shadow hover:shadow-card-hover transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${index === 0 ? 'bg-orange-100 dark:bg-orange-900' : 'bg-purple-100 dark:bg-purple-900'}`}>
                              <Trophy className={`h-6 w-6 ${index === 0 ? 'text-orange-600 dark:text-orange-400' : 'text-purple-600 dark:text-purple-400'}`} />
                            </div>
                            <span className="text-lg">{test.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{test.timeLimit} minutes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{test.passingScore}% to pass</span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <Button asChild className="w-full" size="lg">
                              <Link href={`/quiz/${test.id}`}>
                                <PlayCircle className="h-5 w-5 mr-2" />
                                Start {index === 0 ? 'Day 1' : 'Day 2'} Test
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Final Tests Available
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Final assessments will become available once you complete the course lessons.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Instructions */}
              <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="text-yellow-800 dark:text-yellow-200">
                    Assessment Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-yellow-700 dark:text-yellow-300">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Complete Day 1 test before proceeding to Day 2</li>
                    <li>Each test covers comprehensive material from the entire course</li>
                    <li>You need {finalTests?.[0]?.passingScore || 80}% or higher to pass</li>
                    <li>Tests are timed - manage your time carefully</li>
                    <li>Review your course materials before starting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}