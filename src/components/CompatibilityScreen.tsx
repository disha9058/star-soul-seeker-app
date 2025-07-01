
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CompatibilityScreenProps {
  onBack: () => void;
  onOpenChat: (userId: string, userName: string) => void;
  currentUserId: string;
}

const CompatibilityScreen = ({ onBack, onOpenChat, currentUserId }: CompatibilityScreenProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .neq('auth_user_id', currentUserId)
      .limit(10);
    
    setUsers(data || []);
    setLoading(false);
  };

  const getZodiacEmoji = (sign?: string) => {
    const emojiMap: { [key: string]: string } = {
      aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
      leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
      sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓"
    };
    return emojiMap[sign || ''] || "⭐";
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-purple-400 to-pink-400',
      'from-blue-400 to-purple-400',
      'from-pink-400 to-red-400',
      'from-green-400 to-blue-400',
      'from-yellow-400 to-orange-400',
      'from-indigo-400 to-purple-400'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white">Finding cosmic connections...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-12">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/5 p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </Button>
        <h1 className="text-xl font-light text-white">Cosmic Connections</h1>
        <div className="w-8" />
      </div>

      {/* Users Grid */}
      <div className="space-y-4">
        <p className="text-white/60 text-sm text-center mb-6">
          Connect with others who share your cosmic interests
        </p>

        {users.map((user) => (
          <Card key={user.id} className="cosmic-card fade-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(user.name)} flex items-center justify-center`}>
                    <span className="text-white font-medium text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium">{user.name}</h3>
                    <p className="text-white/60 text-sm">
                      {getZodiacEmoji(user.zodiac)} {user.zodiac} 
                      {user.mood && ` • ${user.mood}`}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {user.zodiac} who loves cosmic discoveries
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => onOpenChat(user.auth_user_id, user.name)}
                  size="sm"
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/30"
                >
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-2xl">🌌</span>
            </div>
            <p className="text-white/60">No cosmic connections found yet</p>
            <p className="text-white/40 text-sm mt-2">Check back soon for more users to connect with</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibilityScreen;
