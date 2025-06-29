
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatbotProps {
  userData: {
    name: string;
    zodiacSign: string;
    preferences: string[];
  };
  onBack: () => void;
}

const affirmations = {
  aries: [
    "Your fiery spirit lights up every room you enter, {name}. Trust your bold instincts today.",
    "Channel your natural leadership, {name}. The universe supports your ambitious dreams.",
    "Your courage inspires others. Take that leap of faith you've been considering."
  ],
  taurus: [
    "Your steady presence brings comfort to those around you, {name}. Embrace your grounding energy.",
    "Trust in your natural wisdom and patience. Good things are manifesting for you.",
    "Your determination is your superpower. Keep nurturing your beautiful dreams."
  ],
  gemini: [
    "Your curious mind opens doors to endless possibilities, {name}. Let your creativity flow.",
    "Your gift for connection brings joy to others. Share your brilliant ideas today.",
    "Embrace your versatility. You have the power to adapt and thrive in any situation."
  ],
  cancer: [
    "Your intuitive heart guides you perfectly, {name}. Trust those gentle inner whispers.",
    "Your caring nature creates ripples of healing in the world. You matter more than you know.",
    "Honor your emotions today. They are your compass to authentic living."
  ],
  leo: [
    "Your radiant energy brightens the world, {name}. Shine your light without apology.",
    "Your generous heart creates magic wherever you go. You are truly magnificent.",
    "Step into your power today. The universe celebrates your unique brilliance."
  ],
  virgo: [
    "Your attention to detail creates beauty in the world, {name}. Your efforts are deeply valued.",
    "Trust in your analytical gifts. You have the wisdom to solve any challenge.",
    "Your service to others comes from pure love. You are making a real difference."
  ],
  libra: [
    "Your quest for harmony brings peace to turbulent waters, {name}. You are a natural healer.",
    "Your aesthetic sense creates beauty everywhere you go. Trust your artistic instincts.",
    "Balance is your gift to the world. Your diplomatic heart bridges all divides."
  ],
  scorpio: [
    "Your transformative power helps others heal and grow, {name}. Your depth is a treasure.",
    "Trust your intuitive insights. You see truth where others see only surface.",
    "Your passionate nature ignites positive change. Embrace your emotional intensity."
  ],
  sagittarius: [
    "Your adventurous spirit inspires others to dream bigger, {name}. Keep exploring new horizons.",
    "Your optimism is a beacon of hope. Share your philosophical wisdom with the world.",
    "Trust your wanderlust. The universe has amazing experiences waiting for you."
  ],
  capricorn: [
    "Your disciplined approach creates lasting success, {name}. Your hard work is paying off.",
    "Trust in your practical wisdom. You have the strength to climb any mountain.",
    "Your responsible nature builds foundations that support others. You are deeply appreciated."
  ],
  aquarius: [
    "Your innovative thinking creates solutions for tomorrow, {name}. Your vision matters.",
    "Trust your humanitarian instincts. You have the power to change the world.",
    "Your unique perspective is exactly what the world needs right now. Keep being different."
  ],
  pisces: [
    "Your compassionate heart heals wounds others can't even see, {name}. Your empathy is a gift.",
    "Trust your creative visions. Your imagination holds keys to beautiful possibilities.",
    "Your spiritual connection guides you perfectly. Listen to your inner mystic."
  ]
};

const Chatbot = ({ userData, onBack }: ChatbotProps) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: `Hello ${userData.name}! ✨ I'm Luna, your cosmic companion. I'm here to provide daily affirmations and help you discover content that resonates with your ${userData.zodiacSign} energy. How are you feeling today?`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");

  const userAffirmations = affirmations[userData.zodiacSign as keyof typeof affirmations] || affirmations.aries;

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      type: "user",
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      if (inputText.toLowerCase().includes("affirmation") || inputText.toLowerCase().includes("affirm")) {
        const randomAffirmation = userAffirmations[Math.floor(Math.random() * userAffirmations.length)];
        botResponse = randomAffirmation.replace("{name}", userData.name);
      } else if (inputText.toLowerCase().includes("book") || inputText.toLowerCase().includes("read")) {
        botResponse = `Based on your ${userData.zodiacSign} energy, I recommend exploring mystical fiction or philosophical texts. Books that explore transformation and cosmic themes would resonate beautifully with you! 📚✨`;
      } else if (inputText.toLowerCase().includes("music") || inputText.toLowerCase().includes("song")) {
        botResponse = `Your ${userData.zodiacSign} soul would love ethereal, ambient music or anything that connects you to cosmic energies. Try searching for celestial soundscapes or music that matches your current mood! 🎵🌙`;
      } else if (inputText.toLowerCase().includes("movie") || inputText.toLowerCase().includes("film")) {
        botResponse = `For your ${userData.zodiacSign} spirit, I suggest films about personal transformation, cosmic journeys, or stories that explore the mysteries of the universe. Visual storytelling that touches the soul! 🎬⭐`;
      } else {
        botResponse = `I sense your ${userData.zodiacSign} energy seeking guidance. Remember, you have the cosmic wisdom within you to navigate any situation. Trust your intuition, ${userData.name}. ✨`;
      }

      const botMessage = {
        type: "bot",
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText("");
  };

  const getDailyAffirmation = () => {
    const randomAffirmation = userAffirmations[Math.floor(Math.random() * userAffirmations.length)];
    const affirmationMessage = {
      type: "bot",
      text: `🌟 Daily Affirmation: ${randomAffirmation.replace("{name}", userData.name)}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, affirmationMessage]);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="h-12" />
      
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/5 p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </Button>
        <h1 className="text-xl font-light text-white">Luna - Cosmic Guide</h1>
        <Button
          onClick={getDailyAffirmation}
          size="sm"
          className="bg-primary/20 hover:bg-primary/30 text-primary text-xs"
        >
          Daily ✨
        </Button>
      </div>

      <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-96">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-xs ${
              message.type === 'user' 
                ? 'bg-primary/20 border-primary/30' 
                : 'cosmic-card'
            }`}>
              <CardContent className="p-3">
                <p className={`text-sm ${
                  message.type === 'user' ? 'text-primary' : 'text-white'
                }`}>
                  {message.text}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask Luna about affirmations, books, music..."
          className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40"
        />
        <Button
          onClick={handleSendMessage}
          size="icon"
          className="bg-primary hover:bg-primary/90 text-background"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
