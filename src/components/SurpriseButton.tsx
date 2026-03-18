import confetti from "canvas-confetti";
import { playWin } from "@/lib/sounds";

const SurpriseButton = () => {
  const handleClick = () => {
    playWin();
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc", "#ff69b4"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc", "#ff69b4"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section className="section-container text-center">
      <button
        onClick={handleClick}
        className="px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-display text-xl md:text-2xl font-medium hover:opacity-90 transition-all duration-300 animate-gentle-pulse shadow-lg hover:shadow-xl"
      >
        Click only if you are smiling right now 😊
      </button>
    </section>
  );
};

export default SurpriseButton;
