import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";

const TiAmoPage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 500);
    setTimeout(() => setShowSubtext(true), 1500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <FloatingHearts />

      {/* Background sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-gold/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 16 + Math.random() * 20,
              height: 16 + Math.random() * 20,
              animation: `heartFloat ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <div className="relative inline-block mb-8">
          <Heart 
            className={`w-32 h-32 md:w-48 md:h-48 text-primary fill-primary transition-all duration-1000 ${
              showMessage ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
            style={{ filter: "drop-shadow(0 0 40px hsl(350 80% 55% / 0.5))" }}
          />
          <Sparkles 
            className="absolute -top-4 -right-4 w-12 h-12 text-gold animate-bounce-soft" 
          />
          <Sparkles 
            className="absolute -bottom-2 -left-6 w-10 h-10 text-gold animate-bounce-soft" 
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <h1 
          className={`text-6xl md:text-8xl font-display font-bold text-gradient-romantic mb-6 transition-all duration-1000 ${
            showMessage ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Ti Amo
        </h1>

        <p 
          className={`text-xl md:text-2xl text-muted-foreground max-w-md mx-auto transition-all duration-1000 delay-500 ${
            showSubtext ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Grazie per aver accettato di essere la mia Valentina. 
          <br />
          <span className="text-primary font-semibold">Sei il mio tutto 💕</span>
        </p>

        <div 
          className={`mt-12 flex justify-center gap-4 text-4xl transition-all duration-1000 ${
            showSubtext ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "1s" }}
        >
          <span className="animate-bounce-soft">🥤</span>
          <span className="animate-bounce-soft" style={{ animationDelay: "0.2s" }}>🍫</span>
          <span className="animate-bounce-soft" style={{ animationDelay: "0.4s" }}>🧦</span>
          <span className="animate-bounce-soft" style={{ animationDelay: "0.6s" }}>💕</span>
        </div>
      </div>
    </div>
  );
};

export default TiAmoPage;
