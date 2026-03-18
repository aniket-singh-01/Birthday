import { useState } from "react";
import ScratchCards from "@/components/ScratchCards";
import QuizGame from "@/components/QuizGame";
import SpinWheel from "@/components/SpinWheel";
import LoveLetterBuilder from "@/components/LoveLetterBuilder";
import WishJar from "@/components/WishJar";
import FloatingHearts from "@/components/FloatingHearts";
import { useNavigate } from "react-router-dom";

const Surprises = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    { id: "scratch", emoji: "🎟️", title: "Scratch Cards", subtitle: "Scratch karke dekh kya likha hai 💌" },
    { id: "quiz", emoji: "🧠", title: "How Well You Know Me?", subtitle: "Dekh kitna jaanti hai tu mujhe 💕" },
    { id: "spin", emoji: "🎡", title: "Spin the Wheel", subtitle: "Spin kar aur surprise dekh 🎀" },
    { id: "letter", emoji: "💌", title: "Love Letter Builder", subtitle: "Words jod ke message bana 💫" },
    { id: "jar", emoji: "🫙", title: "Wish Jar", subtitle: "Random birthday wishes nikalo ✨" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingHearts />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-40 glass-card px-4 py-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Wapas jaao
      </button>

      {!activeGame && (
        <section className="min-h-screen flex items-center justify-center gradient-bg">
          <div className="section-container text-center">
            <div className="text-6xl mb-6" style={{ animation: "fade-up 0.6s ease-out" }}>🎁</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4" style={{ animation: "fade-up 0.8s ease-out" }}>
              Surprises Tere Liye! 🎀
            </h1>
            <p className="font-body text-muted-foreground mb-12" style={{ animation: "fade-up 1s ease-out" }}>
              Koi bhi game choose kar aur enjoy kar ✨
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {games.map((game, i) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="glass-card p-8 text-center hover:scale-[1.03] transition-all duration-300 hover:shadow-xl group"
                  style={{ animation: `fade-up ${1 + i * 0.15}s ease-out` }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{game.emoji}</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{game.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{game.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeGame === "scratch" && <ScratchCards onBack={() => setActiveGame(null)} />}
      {activeGame === "quiz" && <QuizGame onBack={() => setActiveGame(null)} />}
      {activeGame === "spin" && <SpinWheel onBack={() => setActiveGame(null)} />}
      {activeGame === "letter" && <LoveLetterBuilder onBack={() => setActiveGame(null)} />}
      {activeGame === "jar" && <WishJar onBack={() => setActiveGame(null)} />}
    </div>
  );
};

export default Surprises;
