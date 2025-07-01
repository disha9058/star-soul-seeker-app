
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

interface HomeScreenProps {
  user: User;
  onNavigate: (screen: string) => void;
  onSignOut: () => void;
}

const HomeScreen = ({ user, onNavigate, onSignOut }: HomeScreenProps) => {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();
    
    setUserProfile(data);
  };

  const getZodiacEmoji = (sign?: string) => {
    const emojiMap: { [key: string]: string } = {
      aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
      leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
      sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓"
    };
    return emojiMap[sign || ''] || "⭐";
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-12">
        <div>
          <h1 className="text-2xl font-light text-white">
            Hello, {userProfile?.name || 'Cosmic Explorer'} {getZodiacEmoji(userProfile?.zodiac)}
          </h1>
          <p className="text-white/60 text-sm">What's calling to your cosmic energy today?</p>
        </div>
        <Button
          variant="ghost"
          onClick={onSignOut}
          className="text-white/60 hover:text-white hover:bg-white/5"
        >
          Sign Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-6 mb-8">
        {/* Recommendation Categories */}
        <div className="grid gap-4">
          <div 
            onClick={() => onNavigate('books')}
            className="cosmic-card p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Books</h3>
                <p className="text-white/60 text-sm">Literary journeys aligned with your stars</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('movies')}
            className="cosmic-card p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 flex items-center justify-center">
                <span className="text-2xl">🎬</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Movies</h3>
                <p className="text-white/60 text-sm">Cinematic experiences for your sign</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('music')}
            className="cosmic-card p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Music</h3>
                <p className="text-white/60 text-sm">Melodies that resonate with your soul</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Section */}
        <div 
          onClick={() => onNavigate('compatibility')}
          className="cosmic-card p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] mt-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center">
                <span className="text-2xl">💫</span>
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Cosmic Connections</h3>
                <p className="text-white/60 text-sm">Find others who share your cosmic energy</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
