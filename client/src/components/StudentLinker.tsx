import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedAt?: string;
}

export function StudentLinker() {
  const [searchEmail, setSearchEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current linked students
  const { data: linkedStudents = [] } = useQuery<Student[]>({
    queryKey: ['/api/teacher/my-students'],
  });

  // Search for students
  const { data: searchResults = [] } = useQuery<Student[]>({
    queryKey: ['/api/teacher/find-students', searchEmail],
    enabled: searchEmail.length > 2,
  });

  const linkStudentMutation = useMutation({
    mutationFn: async (studentId: string) => {
      return apiRequest('POST', '/api/teacher/link-student', { studentId });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Student linked successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/teacher/my-students'] });
      setSearchEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to link student",
        variant: "destructive",
      });
    },
  });

  const isAlreadyLinked = (studentId: string) => {
    return linkedStudents.some(student => student.id === studentId);
  };

  return (
    <div className="space-y-6">
      {/* Current Students */}
      <Card>
        <CardHeader>
          <CardTitle>My Students ({linkedStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {linkedStudents.length === 0 ? (
            <p className="text-gray-500">No students linked yet. Search for students below to get started.</p>
          ) : (
            <div className="space-y-3">
              {linkedStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    {student.linkedAt && (
                      <p className="text-xs text-gray-500">
                        Linked {new Date(student.linkedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Link Students */}
      <Card>
        <CardHeader>
          <CardTitle>Link New Student</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search by Email</label>
            <Input
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter student email to search..."
              data-testid="input-search-student"
            />
            <p className="text-xs text-gray-500 mt-1">Type at least 3 characters to search</p>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Search Results:</h4>
              {searchResults.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => linkStudentMutation.mutate(student.id)}
                    disabled={linkStudentMutation.isPending || isAlreadyLinked(student.id)}
                    data-testid={`button-link-student-${student.id}`}
                  >
                    {isAlreadyLinked(student.id) ? "Already Linked" : "Link Student"}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {searchEmail.length > 2 && searchResults.length === 0 && (
            <p className="text-gray-500">No students found with that email.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}