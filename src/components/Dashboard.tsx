
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardProps {
  userData: {
    name: string;
    zodiacSign: string;
    preferences: string[];
  };
}

// Mock recommendations data
const mockRecommendations = {
  books: [
    { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", reason: "Perfect for your romantic Leo energy" },
    { title: "Circe", author: "Madeline Miller", reason: "Mystical themes align with your cosmic nature" }
  ],
  movies: [
    { title: "Everything Everywhere All at Once", year: "2022", reason: "Mind-bending adventure for your curious spirit" },
    { title: "The Grand Budapest Hotel", year: "2014", reason: "Artistic and whimsical, matching your aesthetic sense" }
  ],
  music: [
    { title: "Cosmic Love", artist: "Florence + The Machine", reason: "Celestial vibes that resonate with your sign" },
    { title: "Space Oddity", artist: "David Bowie", reason: "A cosmic classic for your astral journey" }
  ]
};

const Dashboard = ({ userData }: DashboardProps) => {
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

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Welcome back, {userData.name}! {getZodiacEmoji(userData.zodiacSign)}
        </h1>
        <p className="text-muted-foreground">Your cosmic recommendations for today</p>
      </div>

      {/* Mood Tracker */}
      <Card className="cosmic-card">
        <CardHeader>
          <CardTitle className="text-center">How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant={currentMood === mood.value ? "default" : "outline"}
                onClick={() => setCurrentMood(mood.value)}
                className={`flex flex-col space-y-1 h-16 ${
                  currentMood === mood.value 
                    ? "bg-primary text-background" 
                    : "border-border hover:bg-muted"
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Tabs defaultValue="books" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="books">📚 Books</TabsTrigger>
          <TabsTrigger value="movies">🎬 Movies</TabsTrigger>
          <TabsTrigger value="music">🎵 Music</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          {mockRecommendations.books.map((book, index) => (
            <Card key={index} className="cosmic-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-muted-foreground mb-2">by {book.author}</p>
                <p className="text-sm text-secondary">{book.reason}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="movies" className="space-y-4">
          {mockRecommendations.movies.map((movie, index) => (
            <Card key={index} className="cosmic-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{movie.title}</h3>
                <p className="text-muted-foreground mb-2">{movie.year}</p>
                <p className="text-sm text-secondary">{movie.reason}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="music" className="space-y-4">
          {mockRecommendations.music.map((song, index) => (
            <Card key={index} className="cosmic-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{song.title}</h3>
                <p className="text-muted-foreground mb-2">by {song.artist}</p>
                <p className="text-sm text-secondary">{song.reason}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Compatibility teaser */}
      <Card className="cosmic-card">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">✨ Cosmic Connections</h3>
          <p className="text-muted-foreground mb-4">
            Discover your zodiac compatibility and connect with like-minded souls
          </p>
          <Button variant="outline" className="border-border hover:bg-muted">
            Explore Compatibility
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
