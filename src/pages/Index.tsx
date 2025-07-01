
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import AuthPage from "@/components/AuthPage";
import HomeScreen from "@/components/HomeScreen";
import RecommendationsScreen from "@/components/RecommendationsScreen";
import CompatibilityScreen from "@/components/CompatibilityScreen";
import ChatScreen from "@/components/ChatScreen";

type Screen = 'home' | 'books' | 'movies' | 'music' | 'compatibility' | 'chat';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [chatUserId, setChatUserId] = useState<string>('');
  const [chatUserName, setChatUserName] = useState<string>('');

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleOpenChat = (userId: string, userName: string) => {
    setChatUserId(userId);
    setChatUserName(userName);
    setCurrentScreen('chat');
  };

  const handleBack = () => {
    if (currentScreen === 'chat') {
      setCurrentScreen('compatibility');
    } else {
      setCurrentScreen('home');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={() => setLoading(false)} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            user={user}
            onNavigate={handleNavigate}
            onSignOut={handleSignOut}
          />
        );
      case 'books':
      case 'movies':
      case 'music':
        return (
          <RecommendationsScreen
            type={currentScreen}
            onBack={handleBack}
            userId={user.id}
          />
        );
      case 'compatibility':
        return (
          <CompatibilityScreen
            onBack={handleBack}
            onOpenChat={handleOpenChat}
            currentUserId={user.id}
          />
        );
      case 'chat':
        return (
          <ChatScreen
            onBack={handleBack}
            currentUserId={user.id}
            otherUserId={chatUserId}
            otherUserName={chatUserName}
          />
        );
      default:
        return (
          <HomeScreen
            user={user}
            onNavigate={handleNavigate}
            onSignOut={handleSignOut}
          />
        );
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default Index;
