import { useState } from "react";
import { playSparkle } from "@/lib/sounds";

const things = [
  { front: "💛", back: "Teri smile dekh ke din ban jaata hai" },
  { front: "💬", back: "Teri baatein sunne mein maza aata hai" },
  { front: "🤍", back: "Teri sweetness sabse alag hai" },
  { front: "🌤️", back: "Tu bure din bhi ache bana deti hai" },
  { front: "⚡", back: "Teri energy hi alag vibe deti hai" },
  { front: "😂", back: "Teri hasi sunn ke sab bhool jaata hoon" },
  { front: "🌻", back: "Tere saath ek alag sa sukoon milta hai" },
  { front: "🎵", back: "Teri awaaz mein kuch toh jaadu hai" },
  { front: "🫶", back: "Tu care karti hai bina bole" },
  { front: "🌙", back: "Raat ko teri yaad aati hai sabse zyada" },
  { front: "🦋", back: "Tere paas aake butterflies feel hoti hain" },
  { front: "🔥", back: "Tera attitude bhi cute lagta hai" },
];

const ThingsILike = () => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    playSparkle();
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="section-container">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-center gradient-text mb-4">
        Jo Mujhe Tujhme Pasand Hai 💕
      </h2>
      <p className="text-center text-muted-foreground font-body text-sm mb-12">
        Card pe click kariye aur dekhiye ✨
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {things.map((item, index) => {
          const isFlipped = flipped.has(index);
          return (
            <div
              key={index}
              onClick={() => toggleFlip(index)}
              className="cursor-pointer perspective-[600px] h-36 md:h-44"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass-card flex items-center justify-center text-4xl md:text-5xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {item.front}
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 glass-card flex items-center justify-center p-4 text-center bg-primary/10 border-primary/20"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="font-display text-sm md:text-base font-medium text-foreground">
                    {item.back}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ThingsILike;
