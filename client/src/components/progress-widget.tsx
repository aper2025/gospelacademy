import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProgressWidget() {
  const { isAuthenticated } = useAuth();

  const { data: progressStats } = useQuery<{
    lessonsCompleted: number;
    totalLessons: number;
    quizzesCompleted: number;
    totalQuizzes: number;
    currentUnit: number;
    totalUnits: number;
    overallProgress: number;
    averageScore: number;
  }>({
    queryKey: ["/api/courses/1/my-progress-stats"],
    enabled: isAuthenticated,
  });

  // Use real data or show loading state
  if (!progressStats) {
    return (
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const {
    lessonsCompleted,
    totalLessons,
    quizzesCompleted,
    totalQuizzes,
    currentUnit,
    totalUnits,
    overallProgress,
    averageScore,
  } = progressStats;

  const unitProgress = totalUnits > 0 ? Math.round((currentUnit / totalUnits) * 100) : 0;

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Course Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
            <span>Overall Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
            <span>Current Unit</span>
            <span>{currentUnit}/{totalUnits}</span>
          </div>
          <Progress value={unitProgress} className="h-2" />
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Lessons Completed:</span>
              <span>{lessonsCompleted}/{totalLessons}</span>
            </div>
            <div className="flex justify-between">
              <span>Quizzes Completed:</span>
              <span>{quizzesCompleted}/{totalQuizzes}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Score:</span>
              <span className="text-secondary font-medium">{averageScore > 0 ? `${averageScore}%` : 'No scores yet'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
