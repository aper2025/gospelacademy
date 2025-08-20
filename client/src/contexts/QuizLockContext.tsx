import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

interface QuizLockContextType {
  isLocked: boolean;
  activeLock: any | null;
  createLock: (quizId: number, timeLimit?: number) => Promise<void>;
  clearLock: () => Promise<void>;
  checkLockStatus: () => void;
}

const QuizLockContext = createContext<QuizLockContextType | undefined>(undefined);

export function QuizLockProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [isLocked, setIsLocked] = useState(false);
  const [activeLock, setActiveLock] = useState<any | null>(null);

  // Query to check lock status
  const { data: lockStatus, refetch: checkLockStatus } = useQuery({
    queryKey: ["/api/quiz-lock-status"],
    enabled: isAuthenticated,
    refetchInterval: 5000, // Check every 5 seconds
  });

  // Update local state when lockStatus changes
  useEffect(() => {
    if (lockStatus && typeof lockStatus === 'object') {
      setIsLocked(!!(lockStatus as any).isLocked);
      setActiveLock((lockStatus as any).activeLock);
    }
  }, [lockStatus]);

  // Create lock mutation
  const createLockMutation = useMutation({
    mutationFn: async ({ quizId, timeLimit }: { quizId: number; timeLimit?: number }) => {
      await apiRequest("POST", "/api/quiz-locks", { quizId, timeLimit });
    },
    onSuccess: () => {
      checkLockStatus();
      queryClient.invalidateQueries({ queryKey: ["/api/quiz-lock-status"] });
    },
  });

  // Clear lock mutation
  const clearLockMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/quiz-locks");
    },
    onSuccess: () => {
      setIsLocked(false);
      setActiveLock(null);
      queryClient.invalidateQueries({ queryKey: ["/api/quiz-lock-status"] });
    },
  });

  const createLock = async (quizId: number, timeLimit = 30) => {
    await createLockMutation.mutateAsync({ quizId, timeLimit });
  };

  const clearLock = async () => {
    await clearLockMutation.mutateAsync();
  };

  return (
    <QuizLockContext.Provider 
      value={{ 
        isLocked, 
        activeLock, 
        createLock, 
        clearLock, 
        checkLockStatus 
      }}
    >
      {children}
    </QuizLockContext.Provider>
  );
}

export function useQuizLock() {
  const context = useContext(QuizLockContext);
  if (context === undefined) {
    throw new Error("useQuizLock must be used within a QuizLockProvider");
  }
  return context;
}