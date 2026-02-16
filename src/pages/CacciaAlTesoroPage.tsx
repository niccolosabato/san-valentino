import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Gift, Check, Eye, EyeOff } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
interface TreasureItem {
  id: string;
  gift: string;
  giftEmoji: string;
  clue: string;
}
const treasures: TreasureItem[] = [
  {
    id: "cocacola",
    gift: "Coca Cola",
    giftEmoji: "🥤",
    clue: "Da bere davanti alla PlayStation! 🛋️",
  },
  {
    id: "dolcetti",
    gift: "Dolcetti",
    giftEmoji: "🍫",
    clue: "Stanno in compagnia degli altri dolci! 🍩",
  },
  {
    id: "calzini",
    gift: "Calzini",
    giftEmoji: "🧦",
    clue: "Forse sono da lavare! 👕",
  },
  {
    id: "amore",
    gift: "Amore",
    giftEmoji: "💞",
    clue: "Controlla nel tuo posto preferito della casa! 🛏️",
  },
];
const CacciaAlTesoroPage = () => {
  const navigate = useNavigate();
  const [foundGifts, setFoundGifts] = useState<string[]>([]);
  const [revealedClues, setRevealedClues] = useState<string[]>([]);
  const toggleClue = (id: string) => {
    setRevealedClues((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const markFound = (id: string) => {
    if (!foundGifts.includes(id)) {
      const newFound = [...foundGifts, id];
      setFoundGifts(newFound);
      if (newFound.length === treasures.length) {
        setTimeout(() => navigate("/ti-amo"), 2000);
      }
    }
  };
  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <FloatingHearts />
      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-8 animate-fade-in">
          <MapPin className="w-12 h-12 mx-auto text-primary fill-primary mb-4 pulse-love" />
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            Caccia al Tesoro! 🗺️
          </h1>
          <p className="text-muted-foreground">
            I tuoi regali sono nascosti per casa... trovali o usa l'indizio!
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Gift className="w-5 h-5 text-gold" />
            <span className="text-lg font-semibold text-foreground">
              {foundGifts.length} / {treasures.length} trovati
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {treasures.map((item, index) => {
            const isFound = foundGifts.includes(item.id);
            const isRevealed = revealedClues.includes(item.id);
            return (
              <div
                key={item.id}
                className={`gift-card ${isFound ? "unlocked" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isFound ? (
                  <div className="text-center animate-scale-in">
                    <div className="text-6xl mb-4">{item.giftEmoji}</div>
                    <div className="flex items-center justify-center gap-2 text-white">
                      <Check className="w-6 h-6" />
                      <span className="text-xl font-bold">{item.gift}</span>
                    </div>
                    <p className="text-white/80 mt-2">Trovato! 🎉</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl">{item.giftEmoji}</span>
                        <span className="text-lg font-semibold text-foreground">
                          {item.gift}
                        </span>
                      </div>
                      <MapPin className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <button
                      onClick={() => toggleClue(item.id)}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-4"
                    >
                      {isRevealed ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      {isRevealed ? "Nascondi indizio" : "Mostra indizio"}
                    </button>
                    {isRevealed && (
                      <p className="text-sm text-muted-foreground mb-4 italic bg-secondary/50 rounded-xl p-3 animate-fade-in">
                        {item.clue}
                      </p>
                    )}
                    <button
                      onClick={() => markFound(item.id)}
                      className="btn-valentine !px-6 !py-2 w-full text-center"
                    >
                      L'ho trovato! 🎁
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CacciaAlTesoroPage;