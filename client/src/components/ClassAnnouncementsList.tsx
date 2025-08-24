import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { 
  MessageSquare, 
  FileText, 
  Megaphone, 
  Pin, 
  ExternalLink, 
  Trash2, 
  Edit,
  Calendar,
  User
} from 'lucide-react';

interface ClassAnnouncementsListProps {
  classId: number;
  isTeacher?: boolean;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: 'message' | 'assignment' | 'announcement';
  linkUrl?: string;
  linkTitle?: string;
  isPinned: boolean;
  createdAt: string;
  teacher: {
    firstName: string;
    lastName: string;
  };
}

export function ClassAnnouncementsList({ classId, isTeacher = false }: ClassAnnouncementsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: [`/api/classes/${classId}/announcements`],
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (announcementId: number) => {
      return apiRequest(`/api/announcements/${announcementId}`, 'DELETE');
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/classes/${classId}/announcements`] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete message",
        variant: "destructive",
      });
    },
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'announcement':
        return <Megaphone className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'announcement':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="text-center py-8" data-testid="empty-announcements">
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No Messages Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {isTeacher 
            ? "Post your first message to communicate with your students."
            : "Your teacher hasn't posted any messages yet."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="announcements-list">
      {announcements.map((announcement) => (
        <Card 
          key={announcement.id} 
          className={`${announcement.isPinned ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950' : ''}`}
          data-testid={`announcement-${announcement.id}`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {announcement.isPinned && (
                  <Pin className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                )}
                <div className="flex items-center gap-2">
                  {getTypeIcon(announcement.type)}
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                </div>
                <Badge className={getTypeBadgeColor(announcement.type)}>
                  {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                </Badge>
              </div>
              {isTeacher && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAnnouncementMutation.mutate(announcement.id)}
                  disabled={deleteAnnouncementMutation.isPending}
                  data-testid={`button-delete-${announcement.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="whitespace-pre-wrap">{announcement.message}</p>
              </div>

              {announcement.linkUrl && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  <a
                    href={announcement.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    data-testid={`link-${announcement.id}`}
                  >
                    {announcement.linkTitle || announcement.linkUrl}
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{announcement.teacher.firstName} {announcement.teacher.lastName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}