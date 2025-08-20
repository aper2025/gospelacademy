import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuizLock } from "@/contexts/QuizLockContext";
import { Button } from "@/components/ui/button";
import { Trophy, Play } from "lucide-react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ProgressWidget from "@/components/progress-widget";
import LessonViewer from "@/components/lesson-viewer";
import ReflectionQuestions from "@/components/reflection-questions";

export default function Lesson() {
  const [, params] = useRoute("/lesson/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const { createLock } = useQuizLock();
  const lessonId = parseInt(params?.id || "0");

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

  const { data: lesson, isLoading: lessonLoading } = useQuery<any>({
    queryKey: ["/api/lessons", lessonId.toString()],
    enabled: isAuthenticated && lessonId > 0,
  });

  const { data: reflectionQuestions } = useQuery<any[]>({
    queryKey: ["/api/lessons", lessonId.toString(), "reflection-questions"],
    enabled: isAuthenticated && lessonId > 0,
  });

  const { data: additionalResources } = useQuery<any[]>({
    queryKey: ["/api/lessons", lessonId.toString(), "resources"],
    enabled: isAuthenticated && lessonId > 0,
  });

  const { data: quiz } = useQuery<any>({
    queryKey: ["/api/lessons", lessonId.toString(), "quiz"],
    enabled: isAuthenticated && lessonId > 0,
  });

  const { data: myProgress } = useQuery<any[]>({
    queryKey: ["/api/my-progress"],
    enabled: isAuthenticated,
  });

  const { data: reflectionResponses } = useQuery<any[]>({
    queryKey: ["/api/reflection-responses", lessonId],
    enabled: isAuthenticated && lessonId > 0,
  });

  const progressMutation = useMutation({
    mutationFn: async (data: { isCompleted: boolean; timeSpent: number }) => {
      await apiRequest("POST", `/api/lessons/${lessonId}/progress`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-progress"] });
      toast({
        title: "Progress Updated",
        description: "Your lesson progress has been saved.",
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
        description: "Failed to update progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading || lessonLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div>Loading lesson...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div>Lesson not found</div>
      </div>
    );
  }

  const handleCompleteLesson = () => {
    progressMutation.mutate({
      isCompleted: true,
      timeSpent: 25, // This would be tracked in a real implementation
    });
  };

  const handleStartQuiz = async () => {
    if (!quiz) return;
    
    try {
      await createLock(quiz.id, quiz.timeLimit || 30);
      setLocation(`/quiz/${quiz.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Check if lesson is completed and reflections are answered
  const currentLessonProgress = myProgress?.find(p => p.lessonId === lessonId);
  const isLessonCompleted = currentLessonProgress?.isCompleted;
  const reflectionQuestionCount = reflectionQuestions?.length || 0;
  const reflectionResponseCount = reflectionResponses?.length || 0;
  const areReflectionsCompleted = reflectionQuestionCount > 0 && reflectionResponseCount >= reflectionQuestionCount;
  const canTakeQuiz = isLessonCompleted && areReflectionsCompleted && quiz;

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
            <LessonViewer 
              lesson={lesson}
              additionalResources={additionalResources || []}
              onComplete={handleCompleteLesson}
              isCompleting={progressMutation.isPending}
            />
            
            <ReflectionQuestions
              questions={reflectionQuestions || []}
              lessonId={lessonId}
            />
            
            {/* Quiz Access Section */}
            {canTakeQuiz && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Ready for Quiz!
                      </h3>
                      <p className="text-green-600 dark:text-green-400">
                        You've completed the lesson and reflections. Take the quiz to test your knowledge.
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleStartQuiz}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Take Quiz
                  </Button>
                </div>
              </div>
            )}
            
            {/* Show completion requirements if not ready */}
            {!canTakeQuiz && (
              <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Complete to Access Quiz
                </h3>
                <ul className="space-y-2">
                  <li className={`flex items-center space-x-2 ${isLessonCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${isLessonCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span>Complete the lesson</span>
                  </li>
                  <li className={`flex items-center space-x-2 ${areReflectionsCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${areReflectionsCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span>Answer all reflection questions ({reflectionResponseCount}/{reflectionQuestionCount})</span>
                  </li>
                  {!quiz && (
                    <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                      <span>Quiz not available for this lesson</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
