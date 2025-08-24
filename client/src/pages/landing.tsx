import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Trophy, Clock } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-90" />
        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Learning Portal
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Discover the teachings and ministry of Jesus Christ through comprehensive biblical study
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                onClick={() => window.location.href = "/auth"}
              >
                Sign In / Sign Up
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 text-lg"
                onClick={() => window.location.href = "/api/login"}
              >
                Sign in with Replit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Biblical Education
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Experience engaging lessons, interactive quizzes, and track your spiritual journey
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center card-shadow hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Dive deep into scripture with comprehensive lessons, videos, and additional resources
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center card-shadow hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Interactive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Engage with reflection questions and participate in meaningful discussions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center card-shadow hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your learning journey with detailed progress tracking and achievements
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center card-shadow hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Self-Paced</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn at your own pace with flexible scheduling and personalized study plans
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Highlight */}
      <div className="py-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                New Testament Survey: The Life of Christ
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore the teachings and ministry of Jesus Christ through the New Testament. 
                This comprehensive course covers His life, teachings, miracles, and the impact 
                of His ministry on the world.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">8 weeks</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">4</div>
                  <div className="text-sm text-gray-600">Assessments</div>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">Course Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3" />
                    Interactive lessons with rich multimedia content
                  </li>
                  <li className="flex items-center">
                    <Users className="h-5 w-5 mr-3" />
                    Reflection questions for deeper understanding
                  </li>
                  <li className="flex items-center">
                    <Trophy className="h-5 w-5 mr-3" />
                    Quizzes and assessments to test knowledge
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-5 w-5 mr-3" />
                    Additional resources for extended study
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Begin Your Journey?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join our learning community and deepen your understanding of God's word
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                onClick={() => window.location.href = "/auth"}
              >
                Sign In / Sign Up
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 text-lg"
                onClick={() => window.location.href = "/api/login"}
              >
                Sign in with Replit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
