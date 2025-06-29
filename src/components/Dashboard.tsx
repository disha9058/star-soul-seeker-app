import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Compatibility from "./Compatibility";
import Chatbot from "./Chatbot";

interface DashboardProps {
  userData: {
    name: string;
    zodiacSign: string;
    preferences: string[];
  };
}

const mockRecommendations = {
  books: [
    { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", reason: "Perfect for your romantic energy", link: "https://www.goodreads.com/book/show/32620332" },
    { title: "Circe", author: "Madeline Miller", reason: "Mystical themes align with your cosmic nature", link: "https://www.goodreads.com/book/show/35959740" }
  ],
  movies: [
    { title: "Everything Everywhere All at Once", year: "2022", reason: "Mind-bending adventure for your curious spirit", link: "https://www.imdb.com/title/tt6710474/" },
    { title: "The Grand Budapest Hotel", year: "2014", reason: "Artistic and whimsical, perfect for you", link: "https://www.imdb.com/title/tt2278388/" }
  ],
  music: [
    { title: "Cosmic Love", artist: "Florence + The Machine", reason: "Celestial vibes that resonate with your sign", link: "https://open.spotify.com/track/6oAgGNxgwGUuNbpFhhKlh7" },
    { title: "Space Oddity", artist: "David Bowie", reason: "A cosmic classic for your journey", link: "https://open.spotify.com/track/5uFJgP9WYNBDwLthIcEsAY" }
  ]
};

const Dashboard = ({ userData }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("walks");
  const [currentMood, setCurrentMood] = useState<string>("");

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
    { emoji: "✨", label: "Magical", value: "magical" },
    { emoji: "💫", label: "Dreamy", value: "dreamy" },
    { emoji: "🔥", label: "Energetic", value: "energetic" }
  ];

  const getZodiacEmoji = (sign: string) => {
    const emojiMap: { [key: string]: string } = {
      aries: "♈", taurus: "♉", gemini: "♊", cancer: "♋",
      leo: "♌", virgo: "♍", libra: "♎", scorpio: "♏",
      sagittarius: "♐", capricorn: "♑", aquarius: "♒", pisces: "♓"
    };
    return emojiMap[sign] || "⭐";
  };

  if (activeTab === "compatibility") {
    return <Compatibility userData={userData} onBack={() => setActiveTab("walks")} />;
  }

  if (activeTab === "chatbot") {
    return <Chatbot userData={userData} onBack={() => setActiveTab("walks")} />;
  }

  if (activeTab === "walks") {
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
              onClick={() => setActiveTab("recommendations")}
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
              onClick={() => setActiveTab("compatibility")}
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
              onClick={() => setActiveTab("chatbot")}
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
              onClick={() => setActiveTab("mood")}
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
  }

  if (activeTab === "mood") {
    return (
      <div className="min-h-screen flex flex-col p-6">
        {/* Status bar area */}
        <div className="h-12" />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("walks")}
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
                onClick={() => setCurrentMood(mood.value)}
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
            onClick={() => setActiveTab("recommendations")}
            className="w-full bg-primary hover:bg-primary/90 text-background mt-8"
          >
            Get My Recommendations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Status bar area */}
      <div className="h-12" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("walks")}
          className="text-white hover:bg-white/5 p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </Button>
        <h1 className="text-xl font-light text-white">Your Cosmos</h1>
        <div className="w-8" />
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        <div className="text-center mb-6">
          <p className="text-white/60 text-sm">
            Curated for {userData.name} {getZodiacEmoji(userData.zodiacSign)}
          </p>
        </div>

        {/* Books */}
        <div className="space-y-3">
          <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide">Books</h3>
          {mockRecommendations.books.map((book, index) => (
            <Card key={index} className="cosmic-card">
              <CardContent className="p-4">
                <h4 className="font-medium text-white mb-1">{book.title}</h4>
                <p className="text-white/60 text-sm mb-2">by {book.author}</p>
                <p className="text-white/40 text-xs mb-3">{book.reason}</p>
                <Button 
                  size="sm" 
                  className="bg-primary/20 hover:bg-primary/30 text-primary text-xs"
                  onClick={() => window.open(book.link, '_blank')}
                >
                  View Book ↗
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Movies */}
        <div className="space-y-3">
          <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide">Movies</h3>
          {mockRecommendations.movies.map((movie, index) => (
            <Card key={index} className="cosmic-card">
              <CardContent className="p-4">
                <h4 className="font-medium text-white mb-1">{movie.title}</h4>
                <p className="text-white/60 text-sm mb-2">{movie.year}</p>
                <p className="text-white/40 text-xs mb-3">{movie.reason}</p>
                <Button 
                  size="sm" 
                  className="bg-primary/20 hover:bg-primary/30 text-primary text-xs"
                  onClick={() => window.open(movie.link, '_blank')}
                >
                  Watch Trailer ↗
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Music */}
        <div className="space-y-3">
          <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide">Music</h3>
          {mockRecommendations.music.map((song, index) => (
            <Card key={index} className="cosmic-card">
              <CardContent className="p-4">
                <h4 className="font-medium text-white mb-1">{song.title}</h4>
                <p className="text-white/60 text-sm mb-2">by {song.artist}</p>
                <p className="text-white/40 text-xs mb-3">{song.reason}</p>
                <Button 
                  size="sm" 
                  className="bg-primary/20 hover:bg-primary/30 text-primary text-xs"
                  onClick={() => window.open(song.link, '_blank')}
                >
                  Listen ↗
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
