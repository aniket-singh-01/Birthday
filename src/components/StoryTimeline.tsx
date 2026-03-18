import { useEffect, useRef, useState } from "react";
import photo1 from "@/assets/photo1.PNG";
import photo2 from "@/assets/photo2.PNG";
import photo3 from "@/assets/photo3.PNG";
import photo4 from "@/assets/photo4.PNG";
import photo5 from "@/assets/photo5.PNG";
import photo6 from "@/assets/photo6.PNG";

const timelineItems = [
  {
    text: "Jab pehli baar mili thi tu...",
    caption: "Pata nahi tha ki zindagi itni khoobsurat hone wali hai 🌸",
    image: photo1,
  },
  {
    text: "Jab realize hua ki tu alag hai.",
    caption: "Baaki sab se hatke, bilkul apni duniya mein 💫",
    image: photo2,
  },
  {
    text: "Jab tu dheere dheere important hoti gayi.",
    caption: "Bina koshish ke, tu mere har khayal mein aa gayi 🤍",
    image: photo3,
  },
  {
    text: "Jab samjha ki teri jagah koi nahi le sakta.",
    caption: "Kuch log replace nahi hote, tu unmein se hai 🌻",
    image: photo4,
  },
  {
    text: "Jab tere saath waqt bitaana zaroori laga.",
    caption: "Tera saath matlab sukoon, aur kuch nahi chahiye tha 🕊️",
    image: photo5,
  },
  {
    text: "Aur aaj, tu meri zindagi ka sabse pyaara hissa hai.",
    caption: "Bas yehi dua hai ki tu hamesha khush rahe 🎀",
    image: photo6,
  },
];

const StoryTimeline = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-container">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-center gradient-text mb-16">
        Humari Kahaani 💕
      </h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-12 md:space-y-16">
          {timelineItems.map((item, index) => {
            const isVisible = visibleItems.has(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                ref={(el) => { refs.current[index] = el; }}
                data-index={index}
                className={`flex flex-col md:flex-row items-center gap-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-card p-6 md:p-8 inline-block">
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full max-w-[200px] h-auto rounded-xl mb-4 mx-auto object-cover aspect-[3/4]"
                      loading="lazy"
                    />
                    <h3 className="font-display text-xl font-medium text-foreground mb-2">
                      {item.text}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md z-10 flex-shrink-0" />

                <div className="flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;
