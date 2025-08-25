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
import Textbook from "@/pages/textbook";
import AuthPage from "@/pages/auth";
import NotFound from "@/pages/not-found";
import MyCoursesPage from "@/pages/my-courses";
import Assessment from "@/pages/assessment";
import ProgressPage from "@/pages/progress";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/auth" component={AuthPage} />
        </>
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/courses" component={MyCoursesPage} />
          <Route path="/progress" component={ProgressPage} />
          <Route path="/unit/:id" component={Unit} />
          <Route path="/lessons/:id" component={Lesson} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/teacher" component={TeacherDashboard} />
          <Route path="/textbook" component={Textbook} />
          <Route path="/assessment" component={Assessment} />
        </>
      )}
      <Route component={NotFound} />
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
