import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, ArrowRight, Save, Clock, CheckCircle } from "lucide-react";
import type { Quiz, QuizQuestion } from "@shared/schema";

interface QuizInterfaceProps {
  quiz: Quiz;
  questions: QuizQuestion[];
}

export default function QuizInterface({ quiz, questions }: QuizInterfaceProps) {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState((quiz.timeLimit || 15) * 60); // Convert to seconds
  const [quizAttemptId, setQuizAttemptId] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, isSubmitted]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const createAttemptMutation = useMutation({
    mutationFn: async () => {
      // First try to get existing active attempt
      try {
        const activeAttempt = await apiRequest("GET", `/api/quizzes/${quiz.id}/active-attempt`);
        return activeAttempt;
      } catch (error) {
        // If no active attempt, create a new one
        return await apiRequest("POST", `/api/quizzes/${quiz.id}/attempts`, {});
      }
    },
    onSuccess: (attempt) => {
      setQuizAttemptId(attempt.id);
    },
    onError: (error) => {
      console.error("Create attempt error:", error);
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
      // Check if error is about existing active session
      if (error.message?.includes("already have an active")) {
        toast({
          title: "Quiz Already Started",
          description: "You have an active quiz session. Please refresh the page.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error",
        description: "Failed to start quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  const saveProgressMutation = useMutation({
    mutationFn: async () => {
      if (!quizAttemptId) return;
      await apiRequest("PUT", `/api/quiz-attempts/${quizAttemptId}`, {
        // Save current progress without completing - just update timestamp
        updatedAt: new Date().toISOString()
      });
    },
    onSuccess: () => {
      toast({
        title: "Progress Saved",
        description: "Your quiz progress has been saved.",
      });
    },
  });

  const submitQuizMutation = useMutation({
    mutationFn: async () => {
      console.log("Starting quiz submission, quizAttemptId:", quizAttemptId);
      if (!quizAttemptId) throw new Error("No quiz attempt found");
      
      // Submit all responses
      const responses = questions.map((question, index) => ({
        attemptId: quizAttemptId,
        questionId: question.id,
        selectedAnswer: answers[index] || "",
        isCorrect: answers[index] === question.correctAnswer,
      }));

      console.log("Submitting responses:", responses);

      // Save responses
      try {
        await Promise.all(
          responses.map(response => 
            apiRequest("POST", "/api/quiz-responses", response)
          )
        );
        console.log("All responses saved successfully");
      } catch (error) {
        console.error("Error saving responses:", error);
        throw new Error(`Failed to save responses: ${error.message}`);
      }

      // Calculate score
      const correctAnswers = responses.filter(r => r.isCorrect).length;
      const score = Math.round((correctAnswers / questions.length) * 100);
      const isPassed = score >= (quiz.passingScore || 70);

      console.log("Calculated score:", score, "isPassed:", isPassed);

      // Update attempt with final score
      try {
        await apiRequest("PUT", `/api/quiz-attempts/${quizAttemptId}`, {
          score,
          isPassed,
          completedAt: new Date().toISOString(),
          timeSpent: Math.round(((quiz.timeLimit || 15) * 60 - timeRemaining) / 60),
        });
        console.log("Quiz attempt updated successfully");
      } catch (error) {
        console.error("Error updating quiz attempt:", error);
        throw new Error(`Failed to update quiz attempt: ${error.message}`);
      }

      return { score, isPassed, correctAnswers, totalQuestions: questions.length };
    },
    onSuccess: (result) => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/my-progress"] });
      toast({
        title: result.isPassed ? "Quiz Passed!" : "Quiz Completed",
        description: `You scored ${result.score}% (${result.correctAnswers}/${result.totalQuestions} correct)`,
        variant: result.isPassed ? "default" : "destructive",
      });
    },
    onError: (error) => {
      console.error("Quiz submission error:", error);
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
        description: `Failed to submit quiz: ${error.message || 'Please try again.'}`,
        variant: "destructive",
      });
    },
  });

  // Initialize quiz attempt on component mount
  useEffect(() => {
    if (!quizAttemptId && !createAttemptMutation.isPending) {
      createAttemptMutation.mutate();
    }
  }, [quizAttemptId, createAttemptMutation.isPending]);

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: value
    }));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSaveProgress = () => {
    saveProgressMutation.mutate();
  };

  const handleSubmitQuiz = () => {
    submitQuizMutation.mutate();
  };

  if (questions.length === 0) {
    return (
      <Card className="card-shadow">
        <CardContent className="p-8 text-center">
          <p className="text-muted">No questions available for this quiz.</p>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="card-shadow">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Quiz Completed!
          </h2>
          <p className="text-muted mb-6">
            Thank you for taking the quiz. Your results have been recorded.
          </p>
          <Button onClick={() => window.history.back()}>
            Return to Lesson
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Parse options if they're a JSON string
  let parsedOptions: Record<string, string> = {};
  try {
    if (typeof currentQuestion.options === 'string') {
      parsedOptions = JSON.parse(currentQuestion.options);
    } else if (typeof currentQuestion.options === 'object' && currentQuestion.options !== null) {
      parsedOptions = currentQuestion.options as Record<string, string>;
    }
  } catch (error) {
    console.error('Error parsing question options:', error);
  }

  // Convert options object to array format
  const optionEntries = Object.entries(parsedOptions);

  return (
    <Card className="card-shadow">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {quiz.title}
            </h2>
            <p className="text-muted mt-1">
              Lesson {quiz.lessonId} Quiz • {questions.length} questions • {quiz.timeLimit || 15} minutes
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-muted flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Time Remaining: 
              <span className={`ml-1 font-semibold ${timeRemaining < 300 ? 'text-red-500' : 'text-accent'}`}>
                {formatTime(timeRemaining)}
              </span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1} of {questions.length} questions</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Question */}
        <Card className="border border-gray-200 dark:border-gray-600">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              {currentQuestion.question}
            </p>

            <RadioGroup
              value={answers[currentQuestionIndex] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {optionEntries.map(([optionKey, optionText], optionIndex) => {
                const optionValue = optionKey.toLowerCase(); // a, b, c, d
                return (
                  <div key={optionValue}>
                    <Label 
                      htmlFor={`option-${optionValue}`}
                      className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <RadioGroupItem 
                        value={optionValue} 
                        id={`option-${optionValue}`}
                        className="text-primary"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">
                        {optionKey}. {optionText}
                      </span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="text-gray-700 dark:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="space-x-3">
            <Button
              variant="outline"
              onClick={handleSaveProgress}
              disabled={saveProgressMutation.isPending}
              className="bg-secondary hover:bg-secondary/90 text-white border-secondary"
            >
              <Save className="h-4 w-4 mr-2" />
              {saveProgressMutation.isPending ? 'Saving...' : 'Save Progress'}
            </Button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={submitQuizMutation.isPending}
                className="bg-primary hover:bg-primary/90"
              >
                {submitQuizMutation.isPending ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-primary hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Next Question
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
