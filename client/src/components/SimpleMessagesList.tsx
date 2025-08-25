import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  senderFirstName?: string;
  senderLastName?: string;
  senderEmail?: string;
  recipientFirstName?: string;
  recipientLastName?: string;
  recipientEmail?: string;
}

interface SimpleMessagesListProps {
  type: 'received' | 'sent';
}

export function SimpleMessagesList({ type }: SimpleMessagesListProps) {
  const queryClient = useQueryClient();
  
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: [`/api/messages/${type}`],
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: number) => {
      return apiRequest('PUT', `/api/messages/${messageId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/messages/${type}`] });
    },
  });

  const getTypeColor = (messageType: string) => {
    switch (messageType) {
      case 'announcement': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'assignment': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading messages...</p>
        </CardContent>
      </Card>
    );
  }

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">No {type} messages yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className={`${!message.isRead && type === 'received' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">
                  {message.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {type === 'received' ? (
                    <span>From: {message.senderFirstName} {message.senderLastName}</span>
                  ) : (
                    <span>To: {message.recipientFirstName} {message.recipientLastName}</span>
                  )}
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(message.type)}>
                  {message.type}
                </Badge>
                {type === 'received' && !message.isRead && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markAsReadMutation.mutate(message.id)}
                    disabled={markAsReadMutation.isPending}
                    data-testid={`button-mark-read-${message.id}`}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {message.message}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}