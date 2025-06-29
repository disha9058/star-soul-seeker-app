
import { Button } from "@/components/ui/button";

interface CosmicViewProps {
  userData: {
    name: string;
    zodiacSign: string;
    preferences: string[];
  };
  onNavigate: (tab: string) => void;
}

const CosmicView = ({ userData, onNavigate }: CosmicViewProps) => {
  const getZodiacEmoji = (sign: string) => {
    const emojiMap: { [key: string]: string } = {
      aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
      leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
      sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓"
    };
    return emojiMap[sign] || "⭐";
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Status bar area */}
      <div className="h-12" />

      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-light text-white">Cosmic Walk</h1>
      </div>

      {/* Main cosmic view */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-64 h-64 relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center glow">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                <div className="text-4xl">🌍</div>
              </div>
            </div>
          </div>
          
          {/* Orbital elements */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/60 rounded-full glow" />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/40 rounded-full glow" style={{ animationDelay: '1s' }} />
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full glow" style={{ animationDelay: '2s' }} />
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/40 rounded-full glow" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="text-center space-y-2 mb-8">
          <p className="text-white/60 text-sm">
            Welcome back, {userData.name} {getZodiacEmoji(userData.zodiacSign)}
          </p>
          <p className="text-white/40 text-xs">
            Your cosmic journey continues
          </p>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div 
            onClick={() => onNavigate("recommendations")}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="text-lg">🚶‍♂️</div>
              <span className="text-white font-medium">WALKS</span>
            </div>
            <div className="text-white/60 text-sm">1 WALK IN PROGRESS</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <div 
            onClick={() => onNavigate("compatibility")}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="text-lg">💫</div>
              <span className="text-white font-medium">COMPATIBILITY</span>
            </div>
            <div className="text-white/60 text-sm">FIND YOUR COSMIC MATCH</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <div 
            onClick={() => onNavigate("chatbot")}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="text-lg">🌙</div>
              <span className="text-white font-medium">LUNA GUIDE</span>
            </div>
            <div className="text-white/60 text-sm">DAILY AFFIRMATIONS</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <div 
            onClick={() => onNavigate("mood")}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="text-lg">✨</div>
              <span className="text-white font-medium">MORE</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicView;
