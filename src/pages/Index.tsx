
import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import Dashboard from "@/components/Dashboard";

type AppState = "welcome" | "onboarding" | "dashboard";

interface UserData {
  name: string;
  birthdate: string;
  zodiacSign: string;
  preferences: string[];
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGetStarted = () => {
    setAppState("onboarding");
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setAppState("dashboard");
    console.log("User onboarded:", data);
  };

  const renderCurrentScreen = () => {
    switch (appState) {
      case "welcome":
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
      case "onboarding":
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case "dashboard":
        return userData ? <Dashboard userData={userData} /> : <WelcomeScreen onGetStarted={handleGetStarted} />;
      default:
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentScreen()}
    </div>
  );
};

export default Index;
