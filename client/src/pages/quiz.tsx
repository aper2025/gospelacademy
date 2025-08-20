import { useEffect } from "react";
import { useRoute } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ProgressWidget from "@/components/progress-widget";
import QuizInterface from "@/components/quiz-interface";

export default function Quiz() {
  const [, params] = useRoute("/quiz/:id");
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const quizId = parseInt(params?.id || "0");

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

  const { data: quiz, isLoading: quizLoading } = useQuery({
    queryKey: ["/api/quizzes", quizId.toString()],
    enabled: isAuthenticated && quizId > 0,
  });

  const { data: questions } = useQuery({
    queryKey: ["/api/quizzes", quizId.toString(), "questions"],
    enabled: isAuthenticated && quizId > 0,
  });

  if (isLoading || quizLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div>Loading quiz...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div>Quiz not found</div>
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
            <QuizInterface
              quiz={quiz}
              questions={questions || []}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
