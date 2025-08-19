import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Star, 
  Trophy, 
  Flame, 
  Target,
  Play,
  Lock,
  CheckCircle
} from "lucide-react";

const LearnDashboard = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(1250);
  const [dailyGoal] = useState(50);
  const [todayXp, setTodayXp] = useState(30);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  // Handle lesson completion from navigation state
  useEffect(() => {
    if (location.state?.lessonCompleted) {
      const lessonId = parseInt(location.state.lessonCompleted);
      const earnedXp = location.state.xpEarned || 0;
      const correctAnswers = location.state.correctAnswers || 0;
      
      setCompletedLessons(prev => [...new Set([...prev, lessonId])]);
      setXp(prev => prev + earnedXp);
      setTodayXp(prev => prev + earnedXp);
      
      toast({
        title: "Lesson Completed! 🎉",
        description: `You earned ${earnedXp} XP and got ${correctAnswers} questions correct!`,
      });
      
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const languageNames: { [key: string]: string } = {
    oromo: "Oromo",
    spanish: "Spanish",
    french: "French",
    german: "German",
    italian: "Italian",
    portuguese: "Portuguese"
  };

  const units = [
    {
      id: 1,
      title: "Basics 1",
      description: "Form basic sentences, greet people",
      lessons: [
        { id: 1, title: "Letters & Sounds", completed: true, current: false },
        { id: 2, title: "Basic Greetings", completed: true, current: false },
        { id: 3, title: "Family", completed: false, current: true },
        { id: 4, title: "Food", completed: false, current: false },
        { id: 5, title: "Colors", completed: false, current: false },
      ]
    },
    {
      id: 2,
      title: "Basics 2",
      description: "Learn about daily activities",
      lessons: [
        { id: 6, title: "Time", completed: false, current: false },
        { id: 7, title: "Numbers", completed: false, current: false },
        { id: 8, title: "Animals", completed: false, current: false },
        { id: 9, title: "Body Parts", completed: false, current: false },
        { id: 10, title: "Weather", completed: false, current: false },
      ]
    },
    {
      id: 3,
      title: "Phrases",
      description: "Common expressions and phrases",
      lessons: [
        { id: 11, title: "Questions", completed: false, current: false },
        { id: 12, title: "Directions", completed: false, current: false },
        { id: 13, title: "Shopping", completed: false, current: false },
        { id: 14, title: "Travel", completed: false, current: false },
        { id: 15, title: "Emotions", completed: false, current: false },
      ]
    }
  ];

  const oromoSampleWords = [
    { oromo: "Akkam", english: "Hello", pronunciation: "AH-kam" },
    { oromo: "Galatomaa", english: "Thank you", pronunciation: "gah-lah-TOH-mah" },
    { oromo: "Maqaan koo", english: "My name is", pronunciation: "mah-KAHN koh" },
    { oromo: "Bishaan", english: "Water", pronunciation: "bee-SHAHN" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">
                Oromo Lingo Hub
              </h1>
              <Badge variant="secondary" className="text-sm">
                {languageNames[language || "oromo"]}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-streak">
                <Flame className="h-5 w-5" />
                <span className="font-bold">{streak}</span>
              </div>
              <div className="flex items-center gap-2 text-xp">
                <Trophy className="h-5 w-5" />
                <span className="font-bold">{xp}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Learning Path */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {units.map((unit) => (
                <Card key={unit.id} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">
                        Unit {unit.id}
                      </h2>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent mb-2">
                        {unit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {unit.description}
                      </p>
                    </div>
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {unit.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isCurrent = !isCompleted && (lesson.id === 3 || completedLessons.includes(lesson.id - 1));
                      const isLocked = !isCompleted && !isCurrent;
                      
                      return (
                        <Button
                          key={lesson.id}
                          variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}
                          size="lg"
                          className={`relative ${
                            isCompleted 
                              ? "bg-success hover:bg-success/90" 
                              : isCurrent 
                              ? "bg-lesson-active hover:bg-lesson-active/90 text-white" 
                              : "opacity-60"
                          }`}
                          disabled={isLocked}
                          onClick={() => {
                            if (!isLocked) {
                              navigate(`/learn/${language}/lesson/${lesson.id}`);
                            }
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          ) : isCurrent ? (
                            <Play className="h-4 w-4 mr-2" />
                          ) : (
                            <Lock className="h-4 w-4 mr-2" />
                          )}
                          {lesson.title}
                        </Button>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Progress */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Daily Goal</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>{todayXp} XP earned</span>
                  <span>{dailyGoal} XP goal</span>
                </div>
                <Progress value={(todayXp / dailyGoal) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {dailyGoal - todayXp} XP to reach your daily goal
                </p>
              </div>
            </Card>

            {/* Language Sample */}
            {language === "oromo" && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-xp" />
                  <h3 className="font-semibold">Sample Words</h3>
                </div>
                <div className="space-y-3">
                  {oromoSampleWords.map((word, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-primary">{word.oromo}</div>
                      <div className="text-sm text-muted-foreground">{word.english}</div>
                      <div className="text-xs text-muted-foreground italic">
                        {word.pronunciation}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Achievement */}
            <Card className="p-6 bg-gradient-to-br from-xp/10 to-warning/10">
              <div className="text-center">
                <Trophy className="h-12 w-12 text-xp mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">
                  Great Progress!
                </h3>
                <p className="text-sm text-muted-foreground">
                  You've completed 2 lessons this week. Keep it up!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnDashboard;