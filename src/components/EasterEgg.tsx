import { useState } from "react";

const EasterEgg = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="fixed bottom-6 right-6 z-40 text-primary/40 hover:text-primary hover:scale-125 transition-all duration-300 text-2xl"
        aria-label="Easter egg"
      >
        💗
      </button>

      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-6"
          onClick={() => setShow(false)}
        >
          <div
            className="glass-card p-8 md:p-10 max-w-sm text-center"
            style={{ animation: "fade-up 0.3s ease-out" }}
          >
            <div className="text-5xl mb-4">💝</div>
            <p className="font-display text-lg text-foreground">
              You are more special to me than you realize.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EasterEgg;
