import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SimpleMessagesList } from "@/components/SimpleMessagesList";
import { MessageSquare, BookOpen, LogOut, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Message {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  senderFirstName: string;
  senderLastName: string;
}

export default function SimpleStudentDashboard() {
  const { user } = useAuth();

  // Get recent unread messages
  const { data: recentMessages = [] } = useQuery<Message[]>({
    queryKey: ['/api/messages/received'],
    select: (data) => data.filter(msg => !msg.isRead).slice(0, 5), // Get first 5 unread
  });

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  if (!user || user.role !== 'student') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-semibold text-red-600">Access Denied</p>
            <p className="text-gray-600 mt-2">Only students can access this dashboard.</p>
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
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ascent Learning
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Student Dashboard</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Messages */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Messages from Teachers
                  {recentMessages.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {recentMessages.length} new
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentMessages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No new messages from your teachers.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 rounded-lg"
                        data-testid={`message-${message.id}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                            {message.title}
                          </h4>
                          <span className="text-xs text-blue-600 dark:text-blue-300 capitalize">
                            {message.type}
                          </span>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                          From: {message.senderFirstName} {message.senderLastName}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {message.message.length > 150 
                            ? `${message.message.substring(0, 150)}...` 
                            : message.message
                          }
                        </p>
                      </div>
                    ))}
                    
                    <div className="text-center pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          // Navigate to messages tab
                          const messagesTab = document.querySelector('[data-value="messages"]') as HTMLElement;
                          messagesTab?.click();
                        }}
                      >
                        View All Messages
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Unread Messages</span>
                    <span className="font-semibold">{recentMessages.length}</span>
                  </div>
                  <div className="text-center pt-4">
                    <Button 
                      className="w-full" 
                      onClick={() => window.location.href = '/course/1'}
                    >
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Messages Tab */}
        <div className="mt-8">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="messages" data-value="messages">All Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">
                    Use the "All Messages" tab to view and manage all your messages from teachers.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">All Messages from Teachers</h3>
                <SimpleMessagesList type="received" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}