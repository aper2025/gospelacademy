import { useEffect } from "react";
import { useRoute } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ProgressWidget from "@/components/progress-widget";
import LessonViewer from "@/components/lesson-viewer";
import ReflectionQuestions from "@/components/reflection-questions";

export default function Lesson() {
  const [, params] = useRoute("/lesson/:id");
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
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

  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: ["/api/lessons", lessonId.toString()],
    enabled: isAuthenticated && lessonId > 0,
  });

  const { data: reflectionQuestions } = useQuery({
    queryKey: ["/api/lessons", lessonId.toString(), "reflection-questions"],
    enabled: isAuthenticated && lessonId > 0,
  });

  const { data: additionalResources } = useQuery({
    queryKey: ["/api/lessons", lessonId.toString(), "resources"],
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
          </main>
        </div>
      </div>
    </div>
  );
}
