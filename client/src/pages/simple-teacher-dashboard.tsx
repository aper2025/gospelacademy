import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StudentLinker } from "@/components/StudentLinker";
import { SimpleMessageForm } from "@/components/SimpleMessageForm";
import { SimpleMessagesList } from "@/components/SimpleMessagesList";
import { MessageSquare, Users, BookOpen, LogOut } from "lucide-react";

export default function SimpleTeacherDashboard() {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold text-red-600">Access Denied</p>
            <p className="text-gray-600 mt-2">Only teachers can access this dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ascent Learning
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Teacher Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              My Students
            </TabsTrigger>
            <TabsTrigger value="send" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Send Message
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Manage Students</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Link students to your account to send them messages and manage their learning.
              </p>
              <StudentLinker />
            </div>
          </TabsContent>

          <TabsContent value="send" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Send Message</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Send announcements, assignments, or general messages to your students.
              </p>
              <SimpleMessageForm />
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Message History</h2>
              
              <Tabs defaultValue="sent" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="sent">Sent Messages</TabsTrigger>
                  <TabsTrigger value="received">Received Messages</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sent">
                  <SimpleMessagesList type="sent" />
                </TabsContent>
                
                <TabsContent value="received">
                  <SimpleMessagesList type="received" />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}