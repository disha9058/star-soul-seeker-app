
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating cosmic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full twinkle-animation"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full twinkle-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-primary rounded-full twinkle-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-secondary rounded-full twinkle-animation" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-60 left-16 w-1 h-1 bg-primary rounded-full twinkle-animation" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="text-center space-y-8 max-w-md mx-auto float-animation">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <div className="text-6xl mb-4">🌌</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cosmic View
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Discover your vibe. Match your stars.
          </p>
        </div>

        {/* Feature highlights */}
        <Card className="cosmic-card p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl">✨</div>
              <p className="text-sm text-muted-foreground">Zodiac Insights</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🎭</div>
              <p className="text-sm text-muted-foreground">Mood Tracking</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🎨</div>
              <p className="text-sm text-muted-foreground">Personal Recs</p>
            </div>
          </div>
        </Card>

        {/* CTA Button */}
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="w-full cosmic-pulse bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-background font-semibold py-4 text-lg"
        >
          Begin Your Cosmic Journey
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
