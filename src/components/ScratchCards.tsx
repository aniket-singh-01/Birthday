import { useState, useRef } from "react";
import { playSparkle, playScratch } from "@/lib/sounds";
import confetti from "canvas-confetti";

interface Props { onBack: () => void; }

const messages = [
  "Tu duniya ki sabse pyaari insaan hai 🌸",
  "Teri hasi ke liye kuch bhi kar sakta hoon 😊",
  "Promise: Ek date sirf tere liye, jab tu bole 🫶",
  "Tu meri sabse favourite person hai, forever 💛",
  "Tere liye ek handwritten letter aa raha hai soon 💌",
  "Main tujhe kabhi udaas nahi hone dunga 🤍",
  "Ek surprise gift tere liye pending hai 🎁",
  "Tu deserve karti hai duniya ki saari khushiyaan 🌻",
  "Next trip hum dono saath chalenge, pakka ✈️",
];

const ScratchCards = ({ onBack }: Props) => {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const scratchProgress = useRef<number[]>(new Array(9).fill(0));

  const initCanvas = (canvas: HTMLCanvasElement | null, index: number) => {
    canvasRefs.current[index] = canvas;
    if (!canvas || revealed.has(index)) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Gradient scratch surface
    const grad = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    grad.addColorStop(0, "hsl(340, 60%, 75%)");
    grad.addColorStop(1, "hsl(270, 40%, 80%)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Sparkle pattern
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "16px serif";
    for (let i = 0; i < 8; i++) {
      ctx.fillText("✨", Math.random() * canvas.offsetWidth, Math.random() * canvas.offsetHeight);
    }
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "bold 14px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch me 💅", canvas.offsetWidth / 2, canvas.offsetHeight / 2);
  };

  const handleScratch = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    const canvas = canvasRefs.current[index];
    if (!canvas || revealed.has(index)) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    playScratch();
    scratchProgress.current[index] += 1;

    if (scratchProgress.current[index] > 15) {
      setRevealed((prev) => new Set(prev).add(index));
      playSparkle();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 }, colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc"] });
    }
  };

  return (
    <section className="min-h-screen gradient-bg py-20">
      <div className="section-container">
        <button onClick={onBack} className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 block">
          ← Back to games
        </button>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center gradient-text mb-4">
          Scratch Cards 🎟️
        </h2>
        <p className="text-center text-muted-foreground font-body text-sm mb-12">
          Har card ke peeche ek surprise hai, scratch karke dekh! 💅
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {messages.map((msg, i) => (
            <div key={i} className="relative glass-card overflow-hidden" style={{ minHeight: "160px" }}>
              {/* Hidden message */}
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <p className="font-display text-sm md:text-base font-medium text-foreground">{msg}</p>
              </div>
              {/* Scratch overlay */}
              {!revealed.has(i) && (
                <canvas
                  ref={(el) => initCanvas(el, i)}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  style={{ touchAction: "none" }}
                  onMouseMove={(e) => { if (e.buttons === 1) handleScratch(e, i); }}
                  onTouchMove={(e) => handleScratch(e, i)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScratchCards;
