import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { QuizLockProvider } from "@/contexts/QuizLockContext";
import QuizLockOverlay from "@/components/quiz-lock-overlay";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Unit from "@/pages/unit";
import Lesson from "@/pages/lesson";
import Quiz from "@/pages/quiz";
import TeacherDashboard from "@/pages/teacher-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Debug authentication state
  console.log('Auth state:', { isAuthenticated, isLoading });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route component={() => <Landing />} />
        </>
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/unit/:id" component={Unit} />
          <Route path="/lessons/:id" component={Lesson} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/teacher" component={TeacherDashboard} />
          <Route component={NotFound} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizLockProvider>
        <TooltipProvider>
          <Toaster />
          <QuizLockOverlay />
          <Router />
        </TooltipProvider>
      </QuizLockProvider>
    </QueryClientProvider>
  );
}

export default App;
