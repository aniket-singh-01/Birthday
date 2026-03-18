import { useState, useRef } from "react";
import { playChime, playWin } from "@/lib/sounds";
import confetti from "canvas-confetti";

interface Props { onBack: () => void; }

const prizes = [
  { text: "Ek hug 🤗", color: "hsl(340, 60%, 80%)" },
  { text: "Ice cream date 🍦", color: "hsl(270, 40%, 82%)" },
  { text: "Movie night 🎬", color: "hsl(30, 40%, 88%)" },
  { text: "Tera favourite khana 🍕", color: "hsl(340, 60%, 75%)" },
  { text: "Long drive 🚗", color: "hsl(270, 40%, 78%)" },
  { text: "Handwritten letter 💌", color: "hsl(30, 40%, 84%)" },
  { text: "Star gazing 🌙", color: "hsl(340, 60%, 85%)" },
  { text: "Surprise gift 🎁", color: "hsl(270, 40%, 85%)" },
];

const SpinWheel = ({ onBack }: Props) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    playChime();

    const extraSpins = 5 + Math.random() * 3;
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const sliceAngle = 360 / prizes.length;
    const targetAngle = 360 * extraSpins + (360 - prizeIndex * sliceAngle - sliceAngle / 2);

    setRotation(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[prizeIndex].text);
      playWin();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 }, colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc", "#ff69b4"] });
    }, 4000);
  };

  return (
    <section className="min-h-screen gradient-bg py-20">
      <div className="section-container text-center">
        <button onClick={onBack} className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 block">
          ← Back to games
        </button>
        <h2 className="font-display text-3xl md:text-4xl font-semibold gradient-text mb-4">
          Spin the Wheel 🎡
        </h2>
        <p className="text-muted-foreground font-body text-sm mb-10">
          Dekh tera surprise kya hai! Spin kar! ✨
        </p>

        <div className="relative inline-block mb-8">
          {/* Pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 text-3xl" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>
            🔻
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-72 h-72 md:w-80 md:h-80 rounded-full relative overflow-hidden shadow-2xl border-4 border-primary/30"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            {prizes.map((prize, i) => {
              const angle = (360 / prizes.length) * i;
              return (
                <div
                  key={i}
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom h-1/2 flex items-start justify-center pt-6"
                    style={{
                      width: "100%",
                      clipPath: `polygon(50% 100%, ${50 - 25}% 0%, ${50 + 25}% 0%)`,
                      backgroundColor: prize.color,
                    }}
                  >
                    <span className="text-xs font-body font-medium text-foreground/80 text-center px-1 max-w-[60px] leading-tight">
                      {prize.text.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                </div>
              );
            })}
            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-lg">
                🎀
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={spin}
            disabled={spinning}
            className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-display text-lg font-medium hover:opacity-90 transition-all disabled:opacity-60 shadow-lg"
          >
            {spinning ? "Ruko... 🎡" : "SPIN! 🎉"}
          </button>
        </div>

        {result && (
          <div className="mt-8 glass-card p-6 max-w-sm mx-auto" style={{ animation: "fade-up 0.5s ease-out" }}>
            <p className="font-display text-xl font-semibold text-foreground mb-2">
              Tere liye: {result}
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Ye promise hai, pakka milega! 🫶
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpinWheel;
