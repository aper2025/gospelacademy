import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Save, MessageCircle } from "lucide-react";
import type { ReflectionQuestion } from "@shared/schema";

interface ReflectionQuestionsProps {
  questions: ReflectionQuestion[];
  lessonId: number;
}

export default function ReflectionQuestions({ questions, lessonId }: ReflectionQuestionsProps) {
  const { toast } = useToast();
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Load existing responses
  const { data: existingResponses } = useQuery({
    queryKey: ["/api/reflection-responses", lessonId],
    enabled: questions.length > 0,
  });

  // Load existing responses into state
  useEffect(() => {
    if (existingResponses) {
      const responseMap: Record<number, string> = {};
      (existingResponses as any[]).forEach((response: any) => {
        responseMap[response.questionId] = response.response || "";
      });
      setResponses(responseMap);
    }
  }, [existingResponses]);

  const saveResponsesMutation = useMutation({
    mutationFn: async (responsesToSave: Record<number, string>) => {
      const savePromises = Object.entries(responsesToSave).map(([questionId, response]) => 
        apiRequest("POST", "/api/reflection-responses", {
          questionId: parseInt(questionId),
          response,
        })
      );
      
      await Promise.all(savePromises);
    },
    onSuccess: () => {
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ["/api/reflection-responses", lessonId] });
      toast({
        title: "Reflections Saved",
        description: "Your reflection responses have been saved successfully.",
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
        description: "Failed to save reflections. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleResponseChange = (questionId: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    setHasChanges(true);
  };

  const handleSaveReflections = () => {
    // Only save responses that have content
    const responsesToSave = Object.fromEntries(
      Object.entries(responses).filter(([_, response]) => response.trim().length > 0)
    );
    
    if (Object.keys(responsesToSave).length === 0) {
      toast({
        title: "No Responses",
        description: "Please provide at least one reflection response before saving.",
        variant: "destructive",
      });
      return;
    }

    saveResponsesMutation.mutate(responsesToSave);
  };

  if (questions.length === 0) {
    return (
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-6 w-6 mr-3 text-primary" />
            Reflection Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted">No reflection questions are available for this lesson.</p>
        </CardContent>
      </Card>
    );
  }

  // Default questions if none provided
  const displayQuestions = questions.length > 0 ? questions : [
    {
      id: 1,
      lessonId,
      question: "What do you think the significance of Jesus' baptism was, and why did He choose to be baptized despite being sinless?",
      orderIndex: 1,
      createdAt: new Date(),
    },
    {
      id: 2,
      lessonId,
      question: "How do you think the disciples felt when Jesus called them to follow Him? What would your response have been?",
      orderIndex: 2,
      createdAt: new Date(),
    },
    {
      id: 3,
      lessonId,
      question: "What can we learn from Jesus' response to temptation that applies to our lives today?",
      orderIndex: 3,
      createdAt: new Date(),
    },
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <MessageCircle className="h-6 w-6 mr-3 text-primary" />
        Reflection Questions
      </h3>
      
      <div className="space-y-6">
        {displayQuestions.map((question, index) => (
          <Card 
            key={question.id} 
            className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
          >
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Question {index + 1}:
              </h4>
              <div className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                {question.question}
              </div>
              
              {/* Check if the question is multiple choice (contains A), B), C), D)) */}
              {question.question.includes('A)') && question.question.includes('B)') ? (
                <div className="space-y-2">
                  {question.question.split('\n').filter(line => line.match(/^[A-D]\)/)).map((option, optIndex) => {
                    const optionLetter = option.charAt(0);
                    const optionText = option.substring(3);
                    return (
                      <label key={optIndex} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={optionLetter}
                          checked={responses[question.id] === optionLetter}
                          onChange={(e) => handleResponseChange(question.id, e.target.value)}
                          className="mt-1 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300 flex-1">
                          <span className="font-medium">{optionLetter})</span> {optionText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <Textarea
                  value={responses[question.id] || ""}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className="w-full resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                  placeholder="Type your reflection here..."
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          {hasChanges && (
            <span className="text-sm text-muted">
              You have unsaved changes
            </span>
          )}
        </div>
        <Button
          onClick={handleSaveReflections}
          disabled={saveResponsesMutation.isPending || !hasChanges}
          className="bg-secondary hover:bg-secondary/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {saveResponsesMutation.isPending ? 'Saving...' : 'Save Reflections'}
        </Button>
      </div>
    </div>
  );
}
