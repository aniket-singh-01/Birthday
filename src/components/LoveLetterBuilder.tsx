import { useState } from "react";
import { playPop, playChime, playWin } from "@/lib/sounds";
import confetti from "canvas-confetti";

interface Props { onBack: () => void; }

const wordBank = [
  "Tu", "meri", "zindagi", "ka", "sabse", "pyaara", "hissa", "hai",
  "Teri", "smile", "duniya", "ki", "khoobsurat", "cheez",
  "Main", "tujhse", "bohot", "zyada", "pyaar", "karta", "hoon",
  "Hamesha", "tere", "saath", "rahunga", "forever",
  "dil", "se", "duaayein", "khush", "reh", "tu",
  "💛", "🌸", "🫶", "✨", "💕", "🎀", "🤍", "🌻",
];

const shuffleWords = (words: string[]) => {
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    ctx.fillText(line, x, currentY);
  }
};

const LoveLetterBuilder = ({ onBack }: Props) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [shuffledBank, setShuffledBank] = useState<string[]>(() => shuffleWords(wordBank));

  const addWord = (word: string) => {
    playPop();
    setSelectedWords((prev) => [...prev, word]);
  };

  const removeWord = (index: number) => {
    playPop();
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (selectedWords.length === 0) return;
    setSaved(true);
    playWin();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc", "#ff69b4"] });
  };

  const downloadLetter = () => {
    if (selectedWords.length === 0) return;

    const message = selectedWords.join(" ");
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, "#fff5f8");
    gradient.addColorStop(1, "#fdeef3");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(160, 92, 120, 0.2)";
    ctx.shadowBlur = 30;
    ctx.roundRect(90, 120, 900, 780, 28);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#b04f76";
    ctx.font = "bold 56px serif";
    ctx.textAlign = "center";
    ctx.fillText("Love Letter", canvas.width / 2, 240);

    ctx.fillStyle = "#4b3340";
    ctx.font = "34px sans-serif";
    ctx.textAlign = "left";
    wrapText(ctx, message, 160, 340, 760, 54);

    ctx.fillStyle = "#9b6a80";
    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Made with love 💌", canvas.width / 2, 820);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "love-letter.png";
    link.click();
    playChime();
  };

  return (
    <section className="min-h-screen gradient-bg py-20">
      <div className="section-container max-w-2xl mx-auto">
        <button onClick={onBack} className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 block">
          ← Back to games
        </button>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center gradient-text mb-4">
          Love Letter Builder 💌
        </h2>
        <p className="text-center text-muted-foreground font-body text-sm mb-10">
          Words choose kar aur apna message bana! ✨
        </p>

        {!saved ? (
          <>
            {/* Letter area */}
            <div className="glass-card p-6 md:p-8 min-h-[120px] mb-8">
              {selectedWords.length === 0 ? (
                <p className="text-muted-foreground font-body text-sm text-center italic">
                  Neeche se words click karke yahan likho... 💫
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedWords.map((word, i) => (
                    <button
                      key={i}
                      onClick={() => removeWord(i)}
                      className="px-3 py-1.5 rounded-lg bg-primary/15 text-foreground font-body text-sm hover:bg-destructive/15 hover:line-through transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Word bank */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="font-body text-xs text-muted-foreground">Tap to add words:</p>
                <button
                  onClick={() => {
                    playChime();
                    setShuffledBank(shuffleWords(wordBank));
                  }}
                  className="font-body text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mix places
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {shuffledBank.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => addWord(word)}
                    className="px-3 py-1.5 rounded-lg bg-accent/50 text-foreground font-body text-sm hover:bg-primary/20 hover:scale-105 transition-all"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center mt-8 space-x-4">
              <button
                onClick={() => { setSelectedWords([]); playPop(); }}
                className="px-6 py-3 rounded-xl border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors"
              >
                Clear 🗑️
              </button>
              <button
                onClick={downloadLetter}
                disabled={selectedWords.length === 0}
                className="px-6 py-3 rounded-xl border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors disabled:opacity-50"
              >
                Download 📥
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
              >
                Send with Love 💌
              </button>
            </div>
          </>
        ) : (
          <div className="glass-card p-10 md:p-14 text-center" style={{ animation: "fade-up 0.5s ease-out" }}>
            <div className="text-5xl mb-6">💌</div>
            <p className="font-display text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
              "{selectedWords.join(" ")}"
            </p>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Ye message dil se aaya hai, feel karo 🫶
            </p>
            <button
              onClick={downloadLetter}
              className="px-6 py-3 rounded-xl border border-border text-muted-foreground font-body text-sm hover:text-foreground transition-colors mr-3"
            >
              Download 📥
            </button>
            <button
              onClick={() => { setSaved(false); setSelectedWords([]); }}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity"
            >
              Ek aur letter likho 💫
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoveLetterBuilder;
