import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function SimpleMessageForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("general");
  const [selectedStudent, setSelectedStudent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get teacher's students
  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ['/api/teacher/my-students'],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('POST', '/api/messages/send', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
      setTitle("");
      setMessage("");
      setSelectedStudent("");
      queryClient.invalidateQueries({ queryKey: ['/api/messages/sent'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !message.trim()) {
      toast({
        title: "Error",
        description: "Please select a student and enter a message",
        variant: "destructive",
      });
      return;
    }

    sendMessageMutation.mutate({
      recipientId: selectedStudent,
      title: title.trim() || "Message from Teacher",
      message: message.trim(),
      type: type,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Message to Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Student</label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a student..." />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.firstName} {student.lastName} ({student.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Message</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title (Optional)</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Message title..."
              data-testid="input-message-title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-24"
              required
              data-testid="textarea-message-content"
            />
          </div>

          <Button 
            type="submit" 
            disabled={sendMessageMutation.isPending}
            data-testid="button-send-message"
          >
            {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}