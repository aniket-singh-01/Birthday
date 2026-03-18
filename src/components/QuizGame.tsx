import { useState } from "react";
import { playChime, playPop, playWin } from "@/lib/sounds";
import confetti from "canvas-confetti";

interface Props { onBack: () => void; }

const questions = [
  {
    q: "Mera favourite color kya hai? 🎨",
    options: ["Black", "Blue", "Red", "Green"],
    correct: 0,
  },
  {
    q: "Main free time mein kya karta hoon? 🎮",
    options: ["Gaming", "Cooking", "Dancing", "Sleeping"],
    correct: 0,
  },
  {
    q: "Meri favourite food kya hai? 🍕",
    options: ["Pizza", "Biryani", "Momos", "Burger"],
    correct: 1,
  },
  {
    q: "Main sabse zyada kisse baat karta hoon? 📱",
    options: ["Best friend", "Tujhse 💕", "Mummy se", "Kisi se nahi"],
    correct: 1,
  },
  {
    q: "Mujhe kya bilkul pasand nahi? 🙅",
    options: ["Late replies", "Jhooth", "Monday", "Sab pasand hai"],
    correct: 1,
  },
  {
    q: "Mere baare mein sabse sahi kya hai? ✨",
    options: ["Overthink karta hoon", "Bohot chill hoon", "Dono", "Kuch nahi"],
    correct: 2,
  },
  {
    q: "Main tere liye kya karta? 🌸",
    options: ["Kuch bhi", "Sab kuch", "Jo tu bole", "Sab options sahi hain 🫶"],
    correct: 3,
  },
];

const results = [
  { min: 0, max: 2, emoji: "🤔", msg: "Thoda aur dhyan de mujh pe! Par it's okay, time hai 💛" },
  { min: 3, max: 4, emoji: "😊", msg: "Bohot achi jaanti hai tu mujhe! Almost perfect 🌸" },
  { min: 5, max: 6, emoji: "💕", msg: "Waah! Tu toh expert hai mere baare mein! 🥰" },
  { min: 7, max: 7, emoji: "👑", msg: "PERFECT SCORE! Tu mujhe mujhse zyada jaanti hai 🫶💛" },
];

const QuizGame = ({ onBack }: Props) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    if (selected !== null) return;
    setSelected(optionIdx);
    const isCorrect = optionIdx === questions[current].correct;
    if (isCorrect) {
      playChime();
      setScore((s) => s + 1);
    } else {
      playPop();
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        playWin();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc", "#ff69b4"] });
      }
    }, 1200);
  };

  const result = results.find((r) => score >= r.min && score <= r.max)!;

  return (
    <section className="min-h-screen gradient-bg py-20">
      <div className="section-container max-w-xl mx-auto">
        <button onClick={onBack} className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 block">
          ← Back to games
        </button>

        {!showResult ? (
          <div className="glass-card p-8 md:p-10 text-center" style={{ animation: "fade-up 0.5s ease-out" }}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-body text-xs text-muted-foreground">
                Question {current + 1}/{questions.length}
              </span>
              <span className="font-body text-xs text-primary font-medium">
                Score: {score} ⭐
              </span>
            </div>

            <div className="w-full bg-muted rounded-full h-1.5 mb-8">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-8">
              {questions[current].q}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {questions[current].options.map((opt, i) => {
                const isCorrect = i === questions[current].correct;
                const isSelected = selected === i;
                let cls = "glass-card p-4 text-left font-body text-sm cursor-pointer transition-all duration-300 hover:scale-[1.02]";
                if (selected !== null) {
                  if (isCorrect) cls += " !border-green-400 !bg-green-50";
                  else if (isSelected && !isCorrect) cls += " !border-red-400 !bg-red-50";
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} className={cls} disabled={selected !== null}>
                    <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {selected !== null && isCorrect && " ✅"}
                    {isSelected && !isCorrect && " ❌"}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="glass-card p-10 md:p-14 text-center" style={{ animation: "fade-up 0.5s ease-out" }}>
            <div className="text-6xl mb-6">{result.emoji}</div>
            <h3 className="font-display text-2xl md:text-3xl font-bold gradient-text mb-4">
              {score}/{questions.length} Correct!
            </h3>
            <p className="font-display text-lg text-foreground mb-8">{result.msg}</p>
            <button
              onClick={() => { setCurrent(0); setScore(0); setSelected(null); setShowResult(false); }}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity"
            >
              Dobara khelo 🔄
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizGame;
