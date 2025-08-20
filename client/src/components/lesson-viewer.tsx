import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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
  PlayCircle,
  ChevronLeft,
  ChevronRight
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
  const [currentStep, setCurrentStep] = useState(0);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Parse lesson content into steps
  const lessonSteps = useMemo(() => {
    if (!lesson.content) return [];
    
    const content = lesson.content;
    const stepSections = content.split(/STEP \d+:/);
    
    // Remove the first empty element and process each step
    const steps = stepSections.slice(1).map((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0]?.trim() || `Step ${index + 1}`;
      const content = lines.slice(1).join('\n').trim();
      
      return {
        id: index + 1,
        title: title,
        content: content
      };
    });

    // If no steps found, create introduction step
    if (steps.length === 0) {
      const introContent = content.split('STEP 1:')[0] || content;
      return [{
        id: 1,
        title: 'Introduction',
        content: introContent
      }];
    }

    return steps;
  }, [lesson.content]);

  const totalSteps = lessonSteps.length;
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = lessonSteps[currentStep] || { title: 'Loading...', content: '' };

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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {lesson.title}
            </h2>
            <p className="text-muted mt-1">
              Unit {lesson.unitId}: Setting the Stage for the King • {lesson.duration || 60} minutes
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
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-muted">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Step Content */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                {currentStepData.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {lessonSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-primary'
                    : index < currentStep
                    ? 'bg-primary/50'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {currentStep < totalSteps - 1 ? (
            <Button onClick={goToNextStep} className="flex items-center">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={onComplete}
              disabled={isCompleting}
              className="bg-green-600 hover:bg-green-700 flex items-center"
            >
              <Play className="h-4 w-4 mr-2" />
              {isCompleting ? 'Completing...' : 'Complete Lesson'}
            </Button>
          )}
        </div>

        {/* Video Section */}
        {lesson.videoUrl && (
          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 mb-8">
            <CardContent className="p-8 text-center">
              <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Video: Chapter 1 - The Intertestamental Period
              </p>
              <p className="text-sm text-muted mt-2">Duration: {lesson.duration || 60} minutes</p>
              <Button 
                className="mt-4" 
                variant="outline"
                onClick={() => window.open(lesson.videoUrl, '_blank')}
              >
                <Play className="h-4 w-4 mr-2" />
                Play Video
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Additional Resources Section */}
        {additionalResources.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Additional Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalResources.map((resource) => (
                <Card
                  key={resource.id}
                  className={`transition-colors cursor-pointer ${getResourceColor(resource.type || 'article')}`}
                  onClick={() => resource.url && window.open(resource.url, '_blank')}
                >
                  <CardContent className="p-4">
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
                          <span className="text-primary text-sm font-medium hover:underline mt-2 inline-flex items-center">
                            {resource.type === 'video' ? 'Watch Video' : 
                             resource.type === 'map' ? 'View Map' : 'Read Article'}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
