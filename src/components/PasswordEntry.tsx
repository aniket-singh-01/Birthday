import { useState } from "react";

interface PasswordEntryProps {
  onUnlock: () => void;
}

const PasswordEntry = ({ onUnlock }: PasswordEntryProps) => {
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [fading, setFading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept various formats: 22122025, 22/12/2025, 22-12-2025, 22 dec 2025, etc.
    const input = password.trim().toLowerCase();
    const digits = input.replace(/\D/g, "");
    const isValid =
      digits === "22122025" ||
      digits === "221225" ||
      digits === "2212" ||
      input.includes("22") && (input.includes("dec") || input.includes("12")) && input.includes("2025") ||
      /^22[\s\/\-\.]+12[\s\/\-\.]+2025$/.test(input) ||
      /^22[\s\/\-\.]+12[\s\/\-\.]+25$/.test(input);
    if (isValid) {
      setFading(true);
      setTimeout(onUnlock, 800);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center gradient-bg transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`glass-card p-10 md:p-14 max-w-md w-full mx-6 text-center transition-transform ${
          shake ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
        style={
          shake
            ? {
                animation: "shake 0.4s ease-in-out",
              }
            : undefined
        }
      >
        <div className="text-5xl mb-6">💌</div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
          This page is only for someone special.
        </h1>
        <p className="text-muted-foreground font-body text-sm mb-8">
          Enter the password to continue...
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full px-5 py-3 rounded-xl border border-border bg-background/60 text-center font-body text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body font-medium text-base hover:opacity-90 transition-opacity"
          >
            Unlock ✨
          </button>
        </form>
        <p className="text-muted-foreground text-xs mt-5 font-body italic">
          Hint: when we first met 🎂
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default PasswordEntry;
