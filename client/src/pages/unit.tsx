import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ProgressWidget from "@/components/progress-widget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Award, Video, FileText } from "lucide-react";

export default function Unit() {
  const { id } = useParams();
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const unitId = parseInt(id || "1");

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

  const { data: unit } = useQuery<any>({
    queryKey: ["/api/units", unitId.toString()],
    enabled: isAuthenticated && unitId > 0,
  });

  const { data: lessons, isLoading: lessonsLoading } = useQuery<any[]>({
    queryKey: ["/api/units", unitId.toString(), "lessons"],
    enabled: isAuthenticated && unitId > 0,
  });

  if (isLoading || lessonsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div>Loading unit...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div>Unit not found</div>
      </div>
    );
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
            {/* Unit Header */}
            <Card className="card-shadow overflow-hidden mb-8">
              <div className="h-32 bg-gradient-to-r from-primary to-blue-600 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="relative h-full flex items-center px-8">
                  <div className="text-white">
                    <h1 className="text-2xl font-bold mb-2">{unit.title}</h1>
                    <p className="text-blue-100">{unit.description}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Lessons */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Lessons</h2>
              
              {lessons?.map((lesson: any, index: number) => (
                <Card key={lesson.id} className="card-shadow hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {lesson.description || `Study the content and teachings from ${lesson.title}`}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            60 minutes
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button asChild>
                          <Link href={`/lessons/${lesson.id}`}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Start Lesson
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/lessons/${lesson.id}/quiz`}>
                            <FileText className="h-4 w-4 mr-2" />
                            Take Quiz
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Unit Actions */}
            <Card className="card-shadow mt-8">
              <CardHeader>
                <CardTitle>Unit Resources</CardTitle>
                <CardDescription>
                  Additional materials and assessments for this unit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-center p-4 h-auto" asChild>
                    <Link href={`/lessons/${lessons?.[0]?.id}`}>
                      <div className="text-center">
                        <Video className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Watch Video</div>
                        <div className="text-sm text-muted-foreground">Unit Overview</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center justify-center p-4 h-auto" asChild>
                    <Link href={`/lessons/${lessons?.[0]?.id}`}>
                      <div className="text-center">
                        <FileText className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Reflection Questions</div>
                        <div className="text-sm text-muted-foreground">5 questions</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center justify-center p-4 h-auto" asChild>
                    <Link href={`/lessons/${lessons?.[0]?.id}/quiz`}>
                      <div className="text-center">
                        <Award className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-medium">Unit Assessment</div>
                        <div className="text-sm text-muted-foreground">Chapter Quiz</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}