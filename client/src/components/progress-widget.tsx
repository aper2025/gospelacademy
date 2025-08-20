import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProgressWidget() {
  const { isAuthenticated } = useAuth();

  const { data: progress } = useQuery<any[]>({
    queryKey: ["/api/my-progress"],
    enabled: isAuthenticated,
  });

  const { data: enrollments } = useQuery<any[]>({
    queryKey: ["/api/my-enrollments"],
    enabled: isAuthenticated,
  });

  // Calculate progress statistics
  const overallProgress = enrollments?.[0]?.progress || 67;
  const currentUnit = 3;
  const totalUnits = 4;
  const unitProgress = Math.round((currentUnit / totalUnits) * 100);

  const lessonsCompleted = progress?.filter((p: any) => p.isCompleted).length || 8;
  const totalLessons = 12;
  const quizzesCompleted = 6;
  const averageScore = 89;

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
              <span>{quizzesCompleted}/{totalLessons}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Score:</span>
              <span className="text-secondary font-medium">{averageScore}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
