
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
          <div className="space-y-8 fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-light text-white">Notifications</h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                As you walk, you'll get notifications as you reach important events. You'll also see them on your lock screen and Apple watch.
              </p>
            </div>

            <div className="flex justify-center my-12">
              <div className="w-48 h-48 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                  </div>
                </div>
                
                {/* Phone and watch mockup */}
                <div className="absolute top-8 right-4">
                  <div className="w-16 h-28 bg-white/5 rounded-lg border border-white/10 flex flex-col">
                    <div className="h-6 bg-white/10 rounded-t-lg" />
                    <div className="flex-1 p-2 space-y-1">
                      <div className="h-1 bg-white/20 rounded" />
                      <div className="h-1 bg-white/20 rounded w-3/4" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-4">
                  <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80 text-sm">What's your name?</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={userData.name}
                  onChange={(e) => updateUserData("name", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-white/80 text-sm">When were you born?</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={userData.birthdate}
                  onChange={(e) => updateUserData("birthdate", e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-white/20"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-light text-white">Cosmic Walk</h1>
              <div className="flex justify-center my-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 flex items-center justify-center">
                    <div className="text-2xl">🌍</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white/80 text-sm">Choose your zodiac sign</Label>
              <Select value={userData.zodiacSign} onValueChange={(value) => updateUserData("zodiacSign", value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-white/20">
                  <SelectValue placeholder="Select your zodiac sign" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.value} value={sign.value} className="text-white focus:bg-white/10">
                      <div className="flex flex-col">
                        <span>{sign.label}</span>
                        <span className="text-xs text-white/40">{sign.dates}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-light text-white">Cosmic Walk</h1>
              <div className="flex justify-center my-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 flex items-center justify-center">
                  <div className="text-3xl">🌌</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">🚶‍♂️</div>
                    <span className="text-white font-medium">WALKS</span>
                  </div>
                  <div className="text-white/60 text-sm">1 WALK IN PROGRESS</div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">✨</div>
                    <span className="text-white font-medium">MORE</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">ℹ️</div>
                    <span className="text-white font-medium">ABOUT</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80 text-sm">Select your interests</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Books", "Movies", "Music", "Art", "Travel", "Wellness"].map((pref) => (
                    <Button
                      key={pref}
                      variant="outline"
                      onClick={() => togglePreference(pref)}
                      className={`cosmic-button text-white border-white/10 ${
                        userData.preferences.includes(pref) 
                          ? "bg-white/10 border-white/20" 
                          : "hover:bg-white/5"
                      }`}
                    >
                      {pref}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
    <div className="min-h-screen flex flex-col justify-between p-6">
      {/* Status bar area */}
      <div className="h-12" />

      {/* Step content */}
      <div className="flex-1">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === step ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </Button>
          ) : (
            <div />
          )}

          <Button 
            onClick={handleNext}
            disabled={!isStepValid()}
            size="icon"
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-background disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
