
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecommendationsScreenProps {
  type: 'books' | 'movies' | 'music';
  onBack: () => void;
  userId: string;
}

const RecommendationsScreen = ({ type, onBack, userId }: RecommendationsScreenProps) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecommendations();
    fetchLikedItems();
  }, [type]);

  const fetchRecommendations = async () => {
    const { data } = await supabase
      .from('content')
      .select('*')
      .eq('type', type)
      .limit(5);
    
    setRecommendations(data || []);
    setLoading(false);
  };

  const fetchLikedItems = async () => {
    const { data } = await supabase
      .from('likes')
      .select('content_id')
      .eq('user_id', userId);
    
    const liked = new Set(data?.map(item => item.content_id) || []);
    setLikedItems(liked);
  };

  const handleLike = async (contentId: string) => {
    const isLiked = likedItems.has(contentId);
    
    if (isLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('content_id', contentId);
      
      setLikedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(contentId);
        return newSet;
      });
      toast({ title: "Removed from favorites" });
    } else {
      await supabase
        .from('likes')
        .insert({ user_id: userId, content_id: contentId });
      
      setLikedItems(prev => new Set([...prev, contentId]));
      toast({ title: "Added to favorites ✨" });
    }
  };

  const getTypeEmoji = () => {
    switch (type) {
      case 'books': return '📚';
      case 'movies': return '🎬';
      case 'music': return '🎵';
    }
  };

  const getZodiacEmoji = (sign: string) => {
    const emojiMap: { [key: string]: string } = {
      aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
      leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
      sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓"
    };
    return emojiMap[sign] || "⭐";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white">Loading cosmic recommendations...</div>
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
        <h1 className="text-xl font-light text-white flex items-center gap-2">
          {getTypeEmoji()} {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <div className="w-8" />
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <p className="text-white/60 text-sm text-center mb-6">
          Curated for your cosmic energy
        </p>

        {recommendations.map((item) => (
          <Card key={item.id} className="cosmic-card fade-in">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-lg mb-1">{item.title}</h3>
                  {item.author_artist && (
                    <p className="text-white/60 text-sm mb-2">by {item.author_artist}</p>
                  )}
                  <p className="text-white/70 text-sm mb-3 leading-relaxed">{item.description}</p>
                  
                  {/* Zodiac Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.zodiac_tags?.map((sign: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-xs text-white/80"
                      >
                        {getZodiacEmoji(sign)} {sign}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLike(item.id)}
                  className={`ml-4 ${
                    likedItems.has(item.id)
                      ? 'text-pink-400 hover:text-pink-300'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 ${likedItems.has(item.id) ? 'fill-current' : ''}`} 
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsScreen;
