import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { playHeartbeat } from "@/lib/sounds";
import FloatingHearts from "./FloatingHearts";

const fullText = `Happy Birthday ❤️
I don't know how you did it…
but somewhere between all the conversations,
you became really important to me.

And I'm not complaining about it at all.

Happy Birthday Meri Jaan 🎂

Pata nahi humari iss cheez ka kya naam doon,
par itna zaroor jaanta hoon ki tu mere liye bohot special hai.

Tujhse mil ke zindagi thodi aur khoobsurat ho gayi hai.

Tu waisi hi rehna jaise hai — bilkul perfect. 💛

Bohot saara pyaar aur duaaein tere liye 🫶`;

const FinalMessage = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          playHeartbeat();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#e8a0bf", "#c8a2c8", "#f5e6cc", "#ff69b4", "#ffffff"],
          });
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative gradient-bg"
    >
      <FloatingHearts />
      <div className="section-container text-center relative z-10">
        <div className="glass-card p-8 md:p-14 max-w-2xl mx-auto">
          <div className="text-5xl mb-6">🎂</div>
          <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground whitespace-pre-line min-h-[200px]">
            {displayedText}
            {started && displayedText.length < fullText.length && (
              <span
                className="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"
                style={{ animation: "typewriter-blink 0.8s infinite" }}
              />
            )}
          </p>
          {done && (
            <button
              onClick={() => navigate("/surprises")}
              className="mt-8 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-display text-lg font-medium hover:opacity-90 transition-all animate-gentle-pulse shadow-lg"
              style={{ animation: "fade-up 0.8s ease-out, gentle-pulse 2s ease-in-out infinite" }}
            >
              Aur bhi surprises hain tere liye 🎁✨
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinalMessage;
