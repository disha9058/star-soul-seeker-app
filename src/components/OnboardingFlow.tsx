
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const zodiacSigns = [
  { value: "aries", label: "♈ Aries", dates: "Mar 21 - Apr 19" },
  { value: "taurus", label: "♉ Taurus", dates: "Apr 20 - May 20" },
  { value: "gemini", label: "♊ Gemini", dates: "May 21 - Jun 20" },
  { value: "cancer", label: "♋ Cancer", dates: "Jun 21 - Jul 22" },
  { value: "leo", label: "♌ Leo", dates: "Jul 23 - Aug 22" },
  { value: "virgo", label: "♍ Virgo", dates: "Aug 23 - Sep 22" },
  { value: "libra", label: "♎ Libra", dates: "Sep 23 - Oct 22" },
  { value: "scorpio", label: "♏ Scorpio", dates: "Oct 23 - Nov 21" },
  { value: "sagittarius", label: "♐ Sagittarius", dates: "Nov 22 - Dec 21" },
  { value: "capricorn", label: "♑ Capricorn", dates: "Dec 22 - Jan 19" },
  { value: "aquarius", label: "♒ Aquarius", dates: "Jan 20 - Feb 18" },
  { value: "pisces", label: "♓ Pisces", dates: "Feb 19 - Mar 20" }
];

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
}

interface UserData {
  name: string;
  birthdate: string;
  zodiacSign: string;
  preferences: string[];
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    birthdate: "",
    zodiacSign: "",
    preferences: []
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const togglePreference = (pref: string) => {
    setUserData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Welcome to Cosmic View</CardTitle>
              <p className="text-center text-muted-foreground">Let's start with the basics</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={userData.name}
                  onChange={(e) => updateUserData("name", e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">When were you born?</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={userData.birthdate}
                  onChange={(e) => updateUserData("birthdate", e.target.value)}
                  className="bg-input border-border"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Your Zodiac Sign</CardTitle>
              <p className="text-center text-muted-foreground">Choose your celestial identity</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select value={userData.zodiacSign} onValueChange={(value) => updateUserData("zodiacSign", value)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select your zodiac sign" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.value} value={sign.value}>
                      <div className="flex flex-col">
                        <span>{sign.label}</span>
                        <span className="text-xs text-muted-foreground">{sign.dates}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Your Interests</CardTitle>
              <p className="text-center text-muted-foreground">Help us personalize your recommendations</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {["Books", "Movies", "Music", "Art", "Travel", "Wellness", "Romance", "Mystery"].map((pref) => (
                  <Button
                    key={pref}
                    variant={userData.preferences.includes(pref) ? "default" : "outline"}
                    onClick={() => togglePreference(pref)}
                    className={userData.preferences.includes(pref) 
                      ? "bg-primary text-background" 
                      : "border-border hover:bg-muted"
                    }
                  >
                    {pref}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return userData.name.trim() !== "" && userData.birthdate !== "";
      case 2:
        return userData.zodiacSign !== "";
      case 3:
        return userData.preferences.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Progress indicator */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of 3</span>
          <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step content */}
      <div className="w-full max-w-md mb-8">
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      <div className="w-full max-w-md flex gap-4">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 border-border hover:bg-muted"
          >
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-background"
        >
          {step === 3 ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFlow;
