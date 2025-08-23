import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Textbook() {
  const textbookUrl = '/attached_assets/The Life of Christ & The Early Church - semister 1 Textbook_1755979902566.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = textbookUrl;
    link.download = 'The Life of Christ & The Early Church - Textbook.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(textbookUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Course Textbook</h1>
                <p className="text-sm text-muted-foreground">The Life of Christ & The Early Church - Semester 1</p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleOpenInNewTab}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Access */}
        <Card className="card-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>New Testament Survey Textbook</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">The Life of Christ & The Early Church</h3>
                <p className="text-muted-foreground">Semester 1 Textbook - Complete Course Material</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <span className="text-blue-800 dark:text-blue-200 font-medium">Textbook Ready</span>
                </div>
                <p className="text-blue-700 dark:text-blue-300 text-sm mb-6">
                  Access your complete course textbook with all chapters, including the Intertestamental Period, 
                  Political & Religious World of the New Testament, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleOpenInNewTab} className="px-6 py-2" data-testid="button-open-textbook">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Textbook
                  </Button>
                  <Button variant="outline" onClick={handleDownload} className="px-6 py-2">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>💡 <strong>Tip:</strong> The textbook will open in a new tab where you can use your browser's built-in PDF viewer with zoom, search, and navigation controls.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="card-shadow mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Chapter Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase">Unit 1: Setting the Stage</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                    <span className="text-sm">Chapter 1: Intertestamental Period</span>
                    <Link href="/lessons/1">
                      <Button variant="ghost" size="sm">View Lesson</Button>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                    <span className="text-sm">Chapter 2: Political & Religious World</span>
                    <Link href="/lessons/9">
                      <Button variant="ghost" size="sm">View Lesson</Button>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded opacity-50">
                    <span className="text-sm">Chapter 3: Four Gospels</span>
                    <Button variant="ghost" size="sm" disabled>Coming Soon</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase">Unit 2: Early Life & Ministry</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded opacity-50">
                    <span className="text-sm">Chapter 4: The Incarnation</span>
                    <Button variant="ghost" size="sm" disabled>Coming Soon</Button>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded opacity-50">
                    <span className="text-sm">Chapter 5: Preparation of Jesus</span>
                    <Button variant="ghost" size="sm" disabled>Coming Soon</Button>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded opacity-50">
                    <span className="text-sm">Chapter 6: Calling the Disciples</span>
                    <Button variant="ghost" size="sm" disabled>Coming Soon</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase">Unit 3: Teachings of Jesus</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded opacity-50">
                    <span className="text-sm">Chapter 9: Sermon on the Mount</span>
                    <Button variant="ghost" size="sm" disabled>Coming Soon</Button>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded opacity-50">
                    <span className="text-sm">Chapter 10: Parables of Kingdom</span>
                    <Button variant="ghost" size="sm" disabled>Coming Soon</Button>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-muted rounded opacity-50">
                    <span className="text-sm">Chapter 11: "I AM" Statements</span>
                    <Button variant="ghost" size="sm" disabled>Coming Soon</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}