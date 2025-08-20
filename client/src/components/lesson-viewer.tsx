import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  BookmarkPlus, 
  Play, 
  ArrowLeft, 
  ArrowRight, 
  Vote,
  FileText,
  Video,
  ExternalLink,
  MapPin,
  PlayCircle
} from "lucide-react";
import type { Lesson, AdditionalResource } from "@shared/schema";

interface LessonViewerProps {
  lesson: Lesson;
  additionalResources: AdditionalResource[];
  onComplete: () => void;
  isCompleting: boolean;
}

export default function LessonViewer({ 
  lesson, 
  additionalResources, 
  onComplete, 
  isCompleting 
}: LessonViewerProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-accent" />;
      case 'article':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'map':
        return <MapPin className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-secondary" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'hover:border-accent';
      case 'article':
        return 'hover:border-primary';
      case 'map':
        return 'hover:border-primary';
      default:
        return 'hover:border-secondary';
    }
  };

  return (
    <Card className="card-shadow">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {lesson.title}
            </h2>
            <p className="text-muted mt-1">
              Unit {lesson.unitId}: Life of Christ • {lesson.duration || 25} minutes
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleSave}
              className="text-gray-700 dark:text-gray-300"
            >
              <BookmarkPlus className="h-4 w-4 mr-2" />
              {isSaved ? 'Saved!' : 'Save'}
            </Button>
            <Button
              onClick={onComplete}
              disabled={isCompleting}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="h-4 w-4 mr-2" />
              {isCompleting ? 'Completing...' : 'Continue'}
            </Button>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Understand the significance of Jesus' baptism and temptation</li>
            <li>Explore the calling of the first disciples</li>
            <li>Examine the early miracles and their meanings</li>
            <li>Analyze the Sermon on the Mount and its teachings</li>
          </ul>
        </div>

        {/* Lesson Content */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Lesson Content
          </h3>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-primary p-6 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Jesus' ministry began with His baptism by John the Baptist, marking the start of His public ministry. This event was accompanied by the Holy Spirit descending like a dove and God's voice declaring Jesus as His beloved Son. Immediately following this, Jesus was led into the wilderness where He faced temptation for forty days, emerging victorious and ready to begin His earthly mission.
            </p>
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: lesson.content || `
                  <p>The calling of the first disciples demonstrates Jesus' method of building His ministry team. Rather than choosing religious scholars or influential leaders, Jesus called ordinary fishermen, tax collectors, and other common people. This choice reveals God's preference for humble hearts over worldly credentials.</p>
                  
                  <p>Throughout His early ministry, Jesus performed numerous miracles that served multiple purposes: demonstrating His divine authority, meeting human needs, and providing signs pointing to His identity as the Messiah. These miracles included healing the sick, feeding the hungry, and even raising the dead.</p>
                `
              }}
            />
          </div>

          {/* Video Section */}
          {lesson.videoUrl && (
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center my-6">
              <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Video: The Baptism and Temptation of Jesus
              </p>
              <p className="text-sm text-muted mt-2">Duration: 12:30</p>
              <Button className="mt-4" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Play Video
              </Button>
            </div>
          )}
        </div>

        {/* Additional Resources Section */}
        {additionalResources.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Additional Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalResources.map((resource) => (
                <div
                  key={resource.id}
                  className={`border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors ${getResourceColor(resource.type || 'article')}`}
                >
                  <div className="flex items-start space-x-3">
                    {getResourceIcon(resource.type || 'article')}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-muted mt-1">
                        {resource.description}
                      </p>
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm font-medium hover:underline mt-2 inline-flex items-center"
                        >
                          {resource.type === 'video' ? 'Watch Video' : 
                           resource.type === 'map' ? 'View Map' : 'Read Article'}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Default resources if none provided */}
              {additionalResources.length === 0 && (
                <>
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Historical Context: First Century Palestine
                        </h4>
                        <p className="text-sm text-muted mt-1">
                          Supplementary reading about the political and social environment of Jesus' time
                        </p>
                        <span className="text-primary text-sm font-medium hover:underline mt-2 inline-block cursor-pointer">
                          Read Article
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-accent transition-colors">
                    <div className="flex items-start space-x-3">
                      <Video className="h-5 w-5 text-accent" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Documentary: Archaeology of the Gospels
                        </h4>
                        <p className="text-sm text-muted mt-1">
                          Archaeological evidence supporting Gospel accounts
                        </p>
                        <span className="text-accent text-sm font-medium hover:underline mt-2 inline-block cursor-pointer">
                          Watch Video
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Lesson Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
          <div className="flex justify-between items-center">
            <Button variant="outline" className="text-gray-700 dark:text-gray-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
            <div className="space-x-3">
              <Button 
                variant="outline" 
                className="bg-accent hover:bg-accent/90 text-white border-accent"
                asChild
              >
                <Link href={`/quiz/${lesson.id}`}>
                  <Vote className="h-4 w-4 mr-2" />
                  Take Vote
                </Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowRight className="h-4 w-4 mr-2" />
                Next Lesson
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
