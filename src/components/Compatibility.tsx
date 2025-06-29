
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CompatibilityProps {
  userData: {
    name: string;
    zodiacSign: string;
    preferences: string[];
  };
  onBack: () => void;
}

const compatibilityData = {
  aries: { compatible: ["leo", "sagittarius", "gemini"], score: 85 },
  taurus: { compatible: ["virgo", "capricorn", "cancer"], score: 90 },
  gemini: { compatible: ["libra", "aquarius", "aries"], score: 80 },
  cancer: { compatible: ["scorpio", "pisces", "taurus"], score: 88 },
  leo: { compatible: ["aries", "sagittarius", "libra"], score: 85 },
  virgo: { compatible: ["taurus", "capricorn", "scorpio"], score: 87 },
  libra: { compatible: ["gemini", "aquarius", "leo"], score: 82 },
  scorpio: { compatible: ["cancer", "pisces", "virgo"], score: 90 },
  sagittarius: { compatible: ["aries", "leo", "aquarius"], score: 83 },
  capricorn: { compatible: ["taurus", "virgo", "pisces"], score: 88 },
  aquarius: { compatible: ["gemini", "libra", "sagittarius"], score: 81 },
  pisces: { compatible: ["cancer", "scorpio", "capricorn"], score: 89 }
};

const mockUsers = [
  { name: "Sarah", zodiacSign: "leo", preferences: ["Books", "Music"], mood: "happy", lastSeen: "2 hours ago" },
  { name: "Mike", zodiacSign: "sagittarius", preferences: ["Movies", "Art"], mood: "thoughtful", lastSeen: "1 day ago" },
  { name: "Emma", zodiacSign: "gemini", preferences: ["Music", "Books"], mood: "energetic", lastSeen: "5 minutes ago" },
  { name: "Alex", zodiacSign: "libra", preferences: ["Art", "Movies"], mood: "calm", lastSeen: "3 hours ago" },
];

const Compatibility = ({ userData, onBack }: CompatibilityProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getZodiacEmoji = (sign: string) => {
    const emojiMap: { [key: string]: string } = {
      aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
      leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
      sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓"
    };
    return emojiMap[sign] || "⭐";
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      happy: "😊", calm: "😌", thoughtful: "🤔", magical: "✨", 
      dreamy: "💫", energetic: "🔥"
    };
    return moodMap[mood] || "😊";
  };

  const userCompatibility = compatibilityData[userData.zodiacSign as keyof typeof compatibilityData];
  const compatibleUsers = mockUsers.filter(user => 
    userCompatibility?.compatible.includes(user.zodiacSign)
  );

  if (activeTab === "overview") {
    return (
      <div className="min-h-screen flex flex-col p-6">
        <div className="h-12" />
        
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
          <h1 className="text-xl font-light text-white">Compatibility</h1>
          <div className="w-8" />
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center glow">
              <span className="text-3xl">{getZodiacEmoji(userData.zodiacSign)}</span>
            </div>
            <div>
              <h2 className="text-white font-medium capitalize">{userData.zodiacSign}</h2>
              <p className="text-white/60 text-sm">Your cosmic signature</p>
            </div>
          </div>

          <Card className="cosmic-card">
            <CardContent className="p-6">
              <h3 className="text-white font-medium mb-4">Most Compatible Signs</h3>
              <div className="grid grid-cols-3 gap-4">
                {userCompatibility?.compatible.map((sign, index) => (
                  <div key={sign} className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-xl">{getZodiacEmoji(sign)}</span>
                    </div>
                    <p className="text-white/80 text-xs capitalize">{sign}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm text-center">
                  Average compatibility: {userCompatibility?.score}%
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button
              onClick={() => setActiveTab("discover")}
              className="w-full bg-white/5 hover:bg-white/8 text-white border border-white/10 justify-between p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔍</span>
                <div className="text-left">
                  <p className="font-medium">Discover Compatible Users</p>
                  <p className="text-xs text-white/60">{compatibleUsers.length} matches found</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Button>

            <Button className="w-full bg-primary hover:bg-primary/90 text-background">
              Share Your Cosmic Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="h-12" />
      
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("overview")}
          className="text-white hover:bg-white/5 p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </Button>
        <h1 className="text-xl font-light text-white">Compatible Souls</h1>
        <div className="w-8" />
      </div>

      <div className="space-y-4">
        <p className="text-white/60 text-sm text-center mb-6">
          Users with compatible cosmic energy
        </p>

        {compatibleUsers.map((user, index) => (
          <Card key={index} className="cosmic-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center">
                    <span className="text-lg">{getZodiacEmoji(user.zodiacSign)}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{user.name}</h4>
                    <p className="text-white/60 text-sm capitalize">{user.zodiacSign} • {getMoodEmoji(user.mood)}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {user.preferences.map((pref, idx) => (
                        <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded text-white/80">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-xs">{user.lastSeen}</p>
                  <Button size="sm" className="mt-2 bg-primary/20 hover:bg-primary/30 text-primary">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Compatibility;
