import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Gift, Check, Lock } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";

interface Rebus {
  id: string;
  emoji: string;
  hint: string;
  answer: string;
  gift: string;
  giftEmoji: string;
}

const rebuses: Rebus[] = [
  {
    id: "cocacola",
    emoji: "🥤❤️",
    hint: "La bevanda frizzante che ti piace tanto...",
    answer: "coca cola",
    gift: "Coca Cola",
    giftEmoji: "🥤",
  },
  {
    id: "dolcetti",
    emoji: "🍬🍫🍪",
    hint: "Qualcosa da mangiare insieme...",
    answer: "dolcetti",
    gift: "Dolcetti",
    giftEmoji: "🍫",
  },
  {
    id: "calzini",
    emoji: "🧦👣❄️",
    hint: "Tengono caldi i piedini...",
    answer: "calzini",
    gift: "Calzini",
    giftEmoji: "🧦",
  },
  {
    id: "amore",
    emoji: "💞👩🏼‍🤝‍👨🏻😘",
    hint: "Il sentimento più bello del mondo...",
    answer: "amore",
    gift: "Amore",
    giftEmoji: "💞",
  },
];

const RebusPage = () => {
  const navigate = useNavigate();
  const [unlockedGifts, setUnlockedGifts] = useState<string[]>([]);
  const [currentInputs, setCurrentInputs] = useState<Record<string, string>>({});
  const [shakeId, setShakeId] = useState<string | null>(null);

  const handleInputChange = (id: string, value: string) => {
    setCurrentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const checkAnswer = (rebus: Rebus) => {
    const userAnswer = (currentInputs[rebus.id] || "").toLowerCase().trim();
    if (userAnswer === rebus.answer) {
      setUnlockedGifts((prev) => [...prev, rebus.id]);
      
      if (unlockedGifts.length === rebuses.length - 1) {
        setTimeout(() => {
          navigate("/ti-amo");
        }, 2000);
      }
    } else {
      setShakeId(rebus.id);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const isUnlocked = (id: string) => unlockedGifts.includes(id);

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <FloatingHearts />

      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-8 animate-fade-in">
          <Heart className="w-12 h-12 mx-auto text-primary fill-primary mb-4 pulse-love" />
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Sblocca i tuoi regali!
          </h1>
          <p className="text-muted-foreground">
            Risolvi i rebus per scoprire cosa ti aspetta 🎁
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Gift className="w-5 h-5 text-gold" />
            <span className="text-lg font-semibold text-foreground">
              {unlockedGifts.length} / {rebuses.length} sbloccati
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {rebuses.map((rebus, index) => (
            <div
              key={rebus.id}
              className={`gift-card ${isUnlocked(rebus.id) ? "unlocked" : ""} ${
                shakeId === rebus.id ? "animate-wiggle" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isUnlocked(rebus.id) ? (
                <div className="text-center animate-scale-in">
                  <div className="text-6xl mb-4">{rebus.giftEmoji}</div>
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Check className="w-6 h-6" />
                    <span className="text-xl font-bold">{rebus.gift}</span>
                  </div>
                  <p className="text-white/80 mt-2">Sbloccato! 🎉</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{rebus.emoji}</span>
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    {rebus.hint}
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="La tua risposta..."
                      value={currentInputs[rebus.id] || ""}
                      onChange={(e) => handleInputChange(rebus.id, e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && checkAnswer(rebus)}
                      className="flex-1 px-4 py-2 rounded-full border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={() => checkAnswer(rebus)}
                      className="btn-valentine !px-6 !py-2"
                    >
                      ✓
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RebusPage;
