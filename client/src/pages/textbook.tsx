import { useState } from "react";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, BookOpen, ZoomIn, ZoomOut } from "lucide-react";
import { Link } from "wouter";

export default function Textbook() {
  const [zoom, setZoom] = useState(100);
  const textbookUrl = '/attached_assets/The Life of Christ & The Early Church - semister 1 Textbook_1755979902566.pdf';

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = textbookUrl;
    link.download = 'The Life of Christ & The Early Church - Textbook.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-2">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <Card className="card-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>New Testament Survey Textbook</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full" style={{ height: 'calc(100vh - 250px)' }}>
              <iframe
                src={`${textbookUrl}#zoom=${zoom}`}
                className="w-full h-full border-0 rounded-b-lg"
                title="Course Textbook"
                data-testid="textbook-viewer"
              >
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Your browser doesn't support PDF viewing. 
                  </p>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </iframe>
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