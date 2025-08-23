import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { BookOpen, BarChart3, FileText, Library } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [location] = useLocation();

  const navigation = [
    {
      name: "Course Overview",
      href: "/",
      icon: BarChart3,
      current: location === "/",
    },
    {
      name: "Course Textbook",
      href: "/textbook",
      icon: Library,
      current: location === "/textbook",
    },
    {
      name: "Unit 1: Setting the Stage for the King",
      href: "/unit/1",
      icon: BookOpen,
      current: location.startsWith("/unit/1"),
    },
    {
      name: "Unit 2: Life of Christ",
      href: "/unit/2",
      icon: BookOpen,
      current: location.startsWith("/unit/2"),
    },
    {
      name: "Unit 3: Teachings",
      href: "/unit/3",
      icon: BookOpen,
      current: location.startsWith("/unit/3"),
    },
    {
      name: "Final Assessment",
      href: "/assessment",
      icon: FileText,
      current: location === "/assessment",
    },
  ];

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Course Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  item.current
                    ? "text-primary bg-blue-50 dark:bg-blue-950/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
