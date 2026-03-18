import { useState } from "react";
import PasswordEntry from "@/components/PasswordEntry";
import StoryTimeline from "@/components/StoryTimeline";
import ThingsILike from "@/components/ThingsILike";
import MemoryGallery from "@/components/MemoryGallery";
import SurpriseButton from "@/components/SurpriseButton";
import FinalMessage from "@/components/FinalMessage";
import EasterEgg from "@/components/EasterEgg";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasswordEntry onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <EasterEgg />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
        <div className="text-center z-10 px-6" style={{ animation: "fade-up 1s ease-out" }}>
          <div className="text-6xl md:text-7xl mb-6">🎀</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold gradient-text mb-4">
            Happy Birthday
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            I made this little corner of the internet just for you.
          </p>
          <div className="mt-10 animate-bounce text-2xl text-primary/50">↓</div>
        </div>
      </section>

      <StoryTimeline />

      <div className="h-px bg-border max-w-xs mx-auto" />

      <ThingsILike />

      <div className="h-px bg-border max-w-xs mx-auto" />

      <MemoryGallery />

      <div className="h-px bg-border max-w-xs mx-auto" />

      <SurpriseButton />

      <FinalMessage />
    </div>
  );
};

export default Index;
