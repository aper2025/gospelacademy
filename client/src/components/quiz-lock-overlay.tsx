import { useQuizLock } from "@/contexts/QuizLockContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Clock } from "lucide-react";
import { useLocation } from "wouter";

export default function QuizLockOverlay() {
  const { isLocked, activeLock, clearLock } = useQuizLock();
  const [location, setLocation] = useLocation();

  if (!isLocked || !activeLock) return null;

  const isOnQuizPage = location.startsWith("/quiz/");

  // Don't show overlay if already on the quiz page
  if (isOnQuizPage) return null;

  const timeRemaining = activeLock.expiresAt 
    ? Math.max(0, Math.floor((new Date(activeLock.expiresAt).getTime() - Date.now()) / 1000 / 60))
    : 0;

  const handleGoToQuiz = () => {
    setLocation(`/quiz/${activeLock.quizId}`);
  };

  const handleExitQuiz = async () => {
    await clearLock();
    setLocation("/");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-700">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <CardTitle className="text-xl text-yellow-800 dark:text-yellow-200">
            Quiz in Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-yellow-700 dark:text-yellow-300">
            You have an active quiz session. The site is locked to prevent cheating.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              {timeRemaining} minutes remaining
            </span>
          </div>

          <div className="flex flex-col space-y-2 pt-4">
            <Button 
              onClick={handleGoToQuiz}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Continue Quiz
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExitQuiz}
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900/20"
            >
              Exit Quiz (Progress Lost)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}