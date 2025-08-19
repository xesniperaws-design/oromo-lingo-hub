import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const languages = [
  {
    id: "oromo",
    name: "Oromo",
    nativeName: "Afaan Oromoo",
    flag: "🇪🇹",
    speakers: "35M speakers",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    speakers: "500M speakers",
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    speakers: "280M speakers",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "german",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    speakers: "100M speakers",
    gradient: "from-yellow-500 to-amber-600"
  },
  {
    id: "italian",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    speakers: "65M speakers",
    gradient: "from-green-500 to-red-500"
  },
  {
    id: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    speakers: "260M speakers",
    gradient: "from-green-600 to-red-600"
  }
];

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedLanguage) {
      navigate(`/learn/${selectedLanguage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Oromo Lingo Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose a language to start your learning journey
          </p>
        </div>

        {/* Language Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {languages.map((language) => (
              <Card
                key={language.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedLanguage === language.id
                    ? "ring-2 ring-primary shadow-lg scale-105"
                    : ""
                }`}
                onClick={() => setSelectedLanguage(language.id)}
              >
                <div className="p-6 text-center">
                  <div className="text-6xl mb-4">{language.flag}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {language.name}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {language.nativeName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language.speakers}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedLanguage}
              size="lg"
              className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success/90 shadow-lg"
            >
              Continue
            </Button>
          </div>
        </div>

        {/* Featured Language Spotlight */}
        {selectedLanguage === "oromo" && (
          <div className="max-w-2xl mx-auto mt-12 p-6 bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl border border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                🌟 Featured: Oromo Language
              </h3>
              <p className="text-muted-foreground">
                Oromo is the most widely spoken language in Ethiopia and one of the most spoken languages in Africa. 
                Learn this beautiful Cushitic language and connect with millions of speakers worldwide!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelection;