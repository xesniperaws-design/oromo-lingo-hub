import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle, 
  X,
  Heart,
  Trophy,
  RotateCcw
} from "lucide-react";

const LessonDetail = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXpEarned] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Sample lesson data - in a real app, this would come from an API
  const lessonData: { [key: string]: any } = {
    "1": {
      title: "Letters & Sounds",
      type: "phonics",
      questions: [
        {
          type: "multiple_choice",
          question: "What sound does 'A' make in Oromo?",
          options: ["ah", "ay", "ee", "oh"],
          correct: "ah",
          explanation: "In Oromo, 'A' makes the 'ah' sound, similar to 'a' in 'father'."
        },
        {
          type: "translation",
          question: "How do you write the sound 'sh' in Oromo?",
          options: ["sh", "x", "c", "ch"],
          correct: "sh",
          explanation: "'Sh' sound is written as 'sh' in Oromo orthography."
        }
      ]
    },
    "2": {
      title: "Basic Greetings",
      type: "vocabulary",
      questions: [
        {
          type: "multiple_choice",
          question: "What does 'Akkam' mean?",
          options: ["Goodbye", "Hello", "Thank you", "Please"],
          correct: "Hello",
          explanation: "'Akkam' is the most common greeting in Oromo, meaning 'Hello'."
        },
        {
          type: "translation",
          question: "How do you say 'Good morning' in Oromo?",
          options: ["Akkam", "Galatomaa", "Akkam ganama", "Nagaan buli"],
          correct: "Akkam ganama",
          explanation: "'Akkam ganama' means 'Good morning' in Oromo."
        },
        {
          type: "audio",
          question: "Listen and select the correct greeting:",
          audio: "akkam.mp3",
          options: ["Akkam", "Galatomaa", "Nagaan", "Dhiifama"],
          correct: "Akkam",
          explanation: "You heard 'Akkam' which means 'Hello'."
        }
      ]
    },
    "3": {
      title: "Family",
      type: "vocabulary",
      questions: [
        {
          type: "multiple_choice",
          question: "What does 'Abbaa' mean?",
          options: ["Mother", "Father", "Brother", "Sister"],
          correct: "Father",
          explanation: "'Abbaa' means 'Father' in Oromo."
        },
        {
          type: "translation",
          question: "How do you say 'Mother' in Oromo?",
          options: ["Abbaa", "Haadha", "Obboleessa", "Obboleettii"],
          correct: "Haadha",
          explanation: "'Haadha' means 'Mother' in Oromo."
        }
      ]
    }
  };

  const currentLesson = lessonData[lessonId || "1"];
  const totalQuestions = currentLesson?.questions.length || 0;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === currentLesson.questions[currentQuestion].correct;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setXpEarned(prev => prev + 10);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer("");
      setShowResult(false);
    } else {
      // Lesson completed
      navigate(`/learn/${language}`, { 
        state: { 
          lessonCompleted: lessonId,
          xpEarned,
          correctAnswers 
        }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setHearts(5);
    setXpEarned(0);
    setCorrectAnswers(0);
  };

  const playAudio = () => {
    // In a real app, this would play the audio file
    console.log("Playing audio:", currentLesson.questions[currentQuestion].audio);
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <Button onClick={() => navigate(`/learn/${language}`)}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = currentLesson.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/learn/${language}`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Badge variant="secondary">{currentLesson.title}</Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`h-5 w-5 ${
                      i < hearts ? "fill-red-500 text-red-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xp">
                <Trophy className="h-5 w-5" />
                <span className="font-bold">{xpEarned}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Question {currentQuestion + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            {!showResult ? (
              <>
                {/* Question */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {currentQ.question}
                  </h2>
                  
                  {currentQ.type === "audio" && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={playAudio}
                      className="mb-6"
                    >
                      <Volume2 className="h-5 w-5 mr-2" />
                      Play Audio
                    </Button>
                  )}
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mb-8">
                  {currentQ.options.map((option: string, index: number) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      size="lg"
                      className="w-full p-6 text-lg justify-start"
                      onClick={() => handleAnswerSelect(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    size="lg"
                    className="px-12 py-4 text-lg"
                  >
                    Check Answer
                  </Button>
                </div>
              </>
            ) : (
              /* Result */
              <div className="text-center">
                <div className="mb-6">
                  {selectedAnswer === currentQ.correct ? (
                    <div className="text-success">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Correct!</h3>
                      <p className="text-lg">+10 XP</p>
                    </div>
                  ) : (
                    <div className="text-destructive">
                      <X className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Not quite right</h3>
                      <p className="text-lg">The correct answer is: <strong>{currentQ.correct}</strong></p>
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <p className="text-muted-foreground">{currentQ.explanation}</p>
                </div>

                <div className="flex gap-4 justify-center">
                  {currentQuestion < totalQuestions - 1 ? (
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="px-8 py-4"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="px-8 py-4 bg-success hover:bg-success/90"
                    >
                      Complete Lesson
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    size="lg"
                    className="px-8 py-4"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;