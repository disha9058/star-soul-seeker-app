
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Status bar area */}
      <div className="h-12" />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 fade-in">
        {/* App title */}
        <div className="space-y-4">
          <h1 className="text-2xl font-light tracking-wide text-white">
            Welcome
          </h1>
          <div className="space-y-2">
            <h2 className="text-lg font-light text-white/80 leading-relaxed max-w-xs">
              Cosmic view takes hard-to-imagine timescales and distances and maps them on to long walks.
            </h2>
          </div>
        </div>

        {/* Cosmic diagram placeholder */}
        <div className="w-64 h-64 relative my-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center glow">
              <div className="text-4xl">🌌</div>
            </div>
          </div>
          
          {/* Connection lines and elements */}
          <div className="absolute top-16 left-8 w-2 h-2 bg-white/40 rounded-full glow" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-32 right-8 w-1.5 h-1.5 bg-white/40 rounded-full glow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-12 w-2 h-2 bg-white/40 rounded-full glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-24 right-16 w-1.5 h-1.5 bg-white/40 rounded-full glow" style={{ animationDelay: '2s' }} />
          
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="white" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="white" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="white" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
        </div>
      </div>

      {/* Navigation dots and button */}
      <div className="space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-8 h-1 bg-white rounded-full" />
          <div className="w-2 h-1 bg-white/30 rounded-full" />
          <div className="w-2 h-1 bg-white/30 rounded-full" />
        </div>

        {/* CTA Button */}
        <div className="flex justify-end">
          <Button 
            onClick={onGetStarted}
            size="icon"
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-background"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
