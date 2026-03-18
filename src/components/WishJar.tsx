import { useState } from "react";
import confetti from "canvas-confetti";
import { playChime, playPop } from "@/lib/sounds";

interface Props { onBack: () => void; }

const wishes = [
  "Tera har din aaj jaisa pyara ho 💖",
  "Jo bhi chahe, woh sab tujhe mile ✨",
  "Always smile, because you look cutest that way 😊",
  "Stress ko bye, happiness ko hi hi 👋",
  "Tera saal full of love and peace ho 🌸",
  "Main hamesha tere saath hoon, pakka 🫶",
  "Aaj extra cake aur zero tension allowed 🎂",
  "Tu khush rahe, bas yehi sabse bada wish hai 🌻",
  "Teri life mein sirf good news aaye 📩",
  "You deserve soft days and loud laughter 💫",
];

const WishJar = ({ onBack }: Props) => {
  const [currentWish, setCurrentWish] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const drawWish = () => {
    const available = wishes.filter((wish) => !history.includes(wish));
    if (available.length === 0) {
      setCurrentWish("Sab wishes nikal chuki! Phir se start karo for more magic ✨");
      playPop();
      return;
    }

    const picked = available[Math.floor(Math.random() * available.length)];
    setCurrentWish(picked);
    setHistory((prev) => [...prev, picked]);
    playChime();
    confetti({
      particleCount: 70,
      spread: 55,
      origin: { y: 0.62 },
      colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc", "#ff69b4"],
    });
  };

  const resetJar = () => {
    setCurrentWish(null);
    setHistory([]);
    playPop();
  };

  return (
    <section className="min-h-screen gradient-bg py-20">
      <div className="section-container max-w-2xl mx-auto text-center">
        <button onClick={onBack} className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 block">
          ← Back to games
        </button>

        <h2 className="font-display text-3xl md:text-4xl font-semibold gradient-text mb-4">
          Birthday Wish Jar 🫙
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-10">
          Jar kholo aur ek pyara wish nikalo 💌
        </p>

        <div className="glass-card p-8 md:p-10 mb-8">
          <div className="text-7xl mb-5">🫙</div>
          <p className="font-body text-xs text-muted-foreground mb-4">
            Wishes opened: {history.length}/{wishes.length}
          </p>

          <div className="min-h-[88px] flex items-center justify-center">
            {currentWish ? (
              <p className="font-display text-lg md:text-xl text-foreground leading-relaxed" style={{ animation: "fade-up 0.35s ease-out" }}>
                {currentWish}
              </p>
            ) : (
              <p className="font-body text-sm text-muted-foreground italic">
                Tap below to reveal your first birthday wish ✨
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={drawWish}
            className="px-7 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Pull a Wish 🎉
          </button>
          <button
            onClick={resetJar}
            className="px-6 py-3 rounded-xl border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors"
          >
            Reset Jar 🔄
          </button>
        </div>
      </div>
    </section>
  );
};

export default WishJar;
