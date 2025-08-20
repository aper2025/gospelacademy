import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Users, TrendingUp, Award, AlertCircle } from "lucide-react";

export default function TeacherDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to home if not authenticated or not a teacher
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'teacher')) {
      toast({
        title: "Unauthorized",
        description: "Access restricted to teachers only.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: courseStats } = useQuery<any>({
    queryKey: ["/api/courses/1/stats"],
    enabled: isAuthenticated && user?.role === 'teacher',
  });

  const { data: studentActivity } = useQuery<any[]>({
    queryKey: ["/api/courses/1/student-activity"],
    enabled: isAuthenticated && user?.role === 'teacher',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== 'teacher') {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Track':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>;
      case 'Behind':
        return <Badge variant="destructive">Behind</Badge>;
      case 'Ahead':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Ahead</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your courses and track student progress
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Lesson
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Course
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-primary">
                    {courseStats?.totalEnrollments || 24}
                  </div>
                  <div className="text-sm text-muted">Enrolled Students</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-secondary">
                    {courseStats?.averageProgress || 73}%
                  </div>
                  <div className="text-sm text-muted">Avg Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-accent" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-accent">
                    {courseStats?.averageScore || 87}%
                  </div>
                  <div className="text-sm text-muted">Avg Quiz Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {courseStats?.studentsNeedingAttention || 3}
                  </div>
                  <div className="text-sm text-muted">Need Attention</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Activity Table */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Recent Student Activity</CardTitle>
            <CardDescription>
              Monitor your students' learning progress and engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Student
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Last Activity
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Progress
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {studentActivity?.map((student: any, index: number) => (
                    <tr key={student.userId}>
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-gray-100">
                        {student.userName}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {student.lastActivity}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {student.progress}%
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(student.status)}
                      </td>
                    </tr>
                  )) || (
                    // Fallback sample data
                    <>
                      <tr>
                        <td className="py-4 px-4 font-medium text-gray-900 dark:text-gray-100">
                          Sarah Johnson
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          Lesson 3 Quiz - 2 hours ago
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          67%
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge('On Track')}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-medium text-gray-900 dark:text-gray-100">
                          Michael Chen
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          Lesson 2 - 1 day ago
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          45%
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge('Behind')}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-medium text-gray-900 dark:text-gray-100">
                          Emily Davis
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          Unit 2 Exam - 3 hours ago
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          84%
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge('Ahead')}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
