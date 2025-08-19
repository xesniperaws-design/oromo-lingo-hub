import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Globe, Users, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Learn through engaging exercises and real-world conversations"
    },
    {
      icon: Globe,
      title: "Multiple Languages",
      description: "Start with Oromo and explore other languages from around the world"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with native speakers and fellow learners"
    },
    {
      icon: Zap,
      title: "Gamified Experience",
      description: "Earn XP, maintain streaks, and unlock achievements"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-success to-accent bg-clip-text text-transparent mb-6">
            Oromo Lingo Hub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Master languages through interactive lessons, starting with the beautiful 
            <span className="text-primary font-semibold"> Oromo language</span>. 
            Join millions learning with the world's most popular language-learning platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg"
              onClick={() => navigate("/languages")}
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-success hover:from-primary-hover hover:to-success/90 shadow-lg"
            >
              Start Learning
            </Button>
            <Button 
              variant="outline"   
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">35M+</div>
              <div className="text-muted-foreground">Oromo Speakers Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">6</div>
              <div className="text-muted-foreground">Languages Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">100K+</div>
              <div className="text-muted-foreground">Lessons Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Oromo Lingo Hub?
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the most effective way to learn languages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Oromo Language Spotlight */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-8 md:p-12 bg-gradient-to-r from-success/10 via-primary/10 to-accent/10 border-primary/20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🇪🇹</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Discover the Oromo Language
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Oromo (Afaan Oromoo) is the most widely spoken Cushitic language and the most spoken language in Ethiopia. 
              With over 35 million speakers, it's one of the most important languages in the Horn of Africa. 
              Start your journey into this rich linguistic tradition today!
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/languages")}
              className="px-8 py-4 text-lg bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90"
            >
              Start Learning Oromo
            </Button>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of learners mastering Oromo and other languages through our interactive platform.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/languages")}
            className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-primary via-success to-accent hover:shadow-lg"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;