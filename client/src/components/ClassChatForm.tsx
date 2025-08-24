import React from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Link2, Pin } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ClassChatFormProps {
  classId: number;
  onSuccess?: () => void;
}

export function ClassChatForm({ classId, onSuccess }: ClassChatFormProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'message' | 'assignment' | 'announcement'>('message');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createAnnouncementMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest(`/api/classes/${classId}/announcements`, 'POST', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message posted successfully!",
      });
      
      // Reset form
      setTitle('');
      setMessage('');
      setType('message');
      setLinkUrl('');
      setLinkTitle('');
      setIsPinned(false);
      
      // Invalidate cache and call success callback
      queryClient.invalidateQueries({ queryKey: [`/api/classes/${classId}/announcements`] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to post message",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Title and message are required",
        variant: "destructive",
      });
      return;
    }

    const data: any = {
      title: title.trim(),
      message: message.trim(),
      type,
      isPinned,
    };

    if (linkUrl.trim()) {
      data.linkUrl = linkUrl.trim();
      data.linkTitle = linkTitle.trim() || linkUrl.trim();
    }

    createAnnouncementMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-class-chat">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Message title..."
            required
            data-testid="input-title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(value: any) => setType(value)} data-testid="select-type">
            <SelectTrigger>
              <SelectValue placeholder="Select message type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="message">Daily Message</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message to the class..."
          rows={4}
          required
          data-testid="textarea-message"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkUrl" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            Link URL (optional)
          </Label>
          <Input
            id="linkUrl"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            type="url"
            data-testid="input-link-url"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkTitle">Link Title (optional)</Label>
          <Input
            id="linkTitle"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
            placeholder="Descriptive title for the link"
            data-testid="input-link-title"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPinned"
          checked={isPinned}
          onCheckedChange={setIsPinned}
          data-testid="switch-pinned"
        />
        <Label htmlFor="isPinned" className="flex items-center gap-2">
          <Pin className="h-4 w-4" />
          Pin this message (appears at top)
        </Label>
      </div>

      <Button 
        type="submit" 
        disabled={createAnnouncementMutation.isPending}
        className="w-full"
        data-testid="button-submit"
      >
        {createAnnouncementMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Posting...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Post Message
          </>
        )}
      </Button>
    </form>
  );
}