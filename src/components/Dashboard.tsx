
import { useState } from "react";
import Compatibility from "./Compatibility";
import Chatbot from "./Chatbot";
import CosmicView from "./CosmicView";
import MoodTracker from "./MoodTracker";
import Recommendations from "./Recommendations";

interface DashboardProps {
  userData: {
    name: string;
    zodiacSign: string;
    preferences: string[];
  };
}

const Dashboard = ({ userData }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("walks");
  const [currentMood, setCurrentMood] = useState<string>("");

  if (activeTab === "compatibility") {
    return <Compatibility userData={userData} onBack={() => setActiveTab("walks")} />;
  }

  if (activeTab === "chatbot") {
    return <Chatbot userData={userData} onBack={() => setActiveTab("walks")} />;
  }

  if (activeTab === "walks") {
    return <CosmicView userData={userData} onNavigate={setActiveTab} />;
  }

  if (activeTab === "mood") {
    return (
      <MoodTracker
        currentMood={currentMood}
        onMoodChange={setCurrentMood}
        onBack={() => setActiveTab("walks")}
        onNavigate={setActiveTab}
      />
    );
  }

  return (
    <Recommendations
      userData={userData}
      onBack={() => setActiveTab("walks")}
    />
  );
};

export default Dashboard;
