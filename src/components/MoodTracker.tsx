
import { Button } from "@/components/ui/button";

interface MoodTrackerProps {
  currentMood: string;
  onMoodChange: (mood: string) => void;
  onBack: () => void;
  onNavigate: (tab: string) => void;
}

const MoodTracker = ({ currentMood, onMoodChange, onBack, onNavigate }: MoodTrackerProps) => {
  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
    { emoji: "✨", label: "Magical", value: "magical" },
    { emoji: "💫", label: "Dreamy", value: "dreamy" },
    { emoji: "🔥", label: "Energetic", value: "energetic" }
  ];

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Status bar area */}
      <div className="h-12" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/5 p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </Button>
        <h1 className="text-xl font-light text-white">Mood Tracker</h1>
        <div className="w-8" />
      </div>

      {/* Mood selection */}
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-white/80 mb-6">How are you feeling today?</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant="outline"
              onClick={() => onMoodChange(mood.value)}
              className={`cosmic-button flex flex-col space-y-2 h-20 ${
                currentMood === mood.value 
                  ? "bg-white/10 border-white/20" 
                  : "border-white/10 hover:bg-white/5"
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs text-white/80">{mood.label}</span>
            </Button>
          ))}
        </div>

        {currentMood && (
          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10 fade-in">
            <p className="text-white/80 text-center text-sm">
              Your {currentMood} energy is noted. This will influence your cosmic recommendations.
            </p>
          </div>
        )}

        <Button
          onClick={() => onNavigate("recommendations")}
          className="w-full bg-primary hover:bg-primary/90 text-background mt-8"
        >
          Get My Recommendations
        </Button>
      </div>
    </div>
  );
};

export default MoodTracker;
