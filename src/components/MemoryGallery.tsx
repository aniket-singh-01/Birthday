import { useState } from "react";
import photo1 from "@/assets/photo1.PNG";
import photo2 from "@/assets/photo2.PNG";
import photo3 from "@/assets/photo3.PNG";
import photo4 from "@/assets/photo4.PNG";
import photo5 from "@/assets/photo5.PNG";
import photo6 from "@/assets/photo6.PNG";
import photo7 from "@/assets/photo7.PNG";
import photo8 from "@/assets/photo8.PNG";
import photo9 from "@/assets/photo9.PNG";
import photo10 from "@/assets/photo10.PNG";
import photo11 from "@/assets/photo11.PNG";
import photo12 from "@/assets/photo12.PNG";
import photo13 from "@/assets/photo13.PNG";
import photo14 from "@/assets/photo14.PNG";
import photo15 from "@/assets/photo15.PNG";
import photo16 from "@/assets/photo16.PNG";
import photo17 from "@/assets/photo17.PNG";

const memories = [
  { caption: "Pehli baar mili thi, aur lagaa jaise hamesha se jaanti hoon 💫", image: photo1 },
  { caption: "Teri hasi mein kuch toh baat hai yaar ✨", image: photo2 },
  { caption: "Ye wala din bhoolna mushkil hai 🌸", image: photo3 },
  { caption: "Tere saath time kaise nikal jaata hai pata hi nahi chalta ⏳", image: photo4 },
  { caption: "Kuch log special hote hain, tu unmein se ek hai 🤍", image: photo5 },
  { caption: "Simple si moment, par dil ko bohot sukoon mila 🕊️", image: photo6 },
  { caption: "Tu hasi toh lagaa sab theek ho gaya 😂💛", image: photo7 },
  { caption: "Tera saath matlab duniya ki sabse achi feeling 🌻", image: photo8 },
  { caption: "Ye photo dekh ke aaj bhi smile aa jaati hai 😊", image: photo9 },
  { caption: "Tujhse baat karna matlab stress ka end 💬", image: photo10 },
  { caption: "Teri energy hi alag hai yaar ⚡", image: photo11 },
  { caption: "Jab tu paas hoti hai toh sab kuch colorful lagta hai 🌈", image: photo12 },
  { caption: "Bohot kam log hote hain jinke saath itna comfortable feel ho 🫶", image: photo13 },
  { caption: "Tu meri favourite notification hai 📱💕", image: photo14 },
  { caption: "Tere bina ye sab adhoora lagta 🥀", image: photo15 },
  { caption: "Ye moment mere dil ke bohot kareeb hai 💗", image: photo16 },
  { caption: "Tera wo innocent sa expression 🥹", image: photo17 },
];

const MemoryGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="section-container">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-center gradient-text mb-4">
        Humari Yaadein 💫
      </h2>
      <p className="text-center text-muted-foreground font-body text-sm mb-12">
        Har photo mein ek kahaani hai ✨
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {memories.map((memory, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="cursor-pointer group relative overflow-hidden rounded-2xl aspect-square glass-card hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <img
              src={memory.image}
              alt={memory.caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="font-body text-xs text-background text-center">{memory.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-6"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="glass-card p-4 md:p-6 max-w-md w-full text-center animate-fade-up overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={memories[selectedIndex].image}
              alt={memories[selectedIndex].caption}
              className="w-full max-h-[60vh] object-contain rounded-xl mb-4"
            />
            <p className="font-display text-lg text-foreground mb-4">
              {memories[selectedIndex].caption}
            </p>
            <button
              onClick={() => setSelectedIndex(null)}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Band karo ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryGallery;
