
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecommendationsProps {
  userData: {
    name: string;
    zodiacSign: string;
    preferences: string[];
  };
  onBack: () => void;
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

const Recommendations = ({ userData, onBack }: RecommendationsProps) => {
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

export default Recommendations;
