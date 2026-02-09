import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";

const ValentinePage = () => {
  const navigate = useNavigate();
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [showHearts, setShowHearts] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const escapeButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const button = noButtonRef.current.getBoundingClientRect();
    const yesBtn = document.querySelector('.btn-valentine')?.getBoundingClientRect();
    const padding = 20;
    const maxX = window.innerWidth - button.width - padding;
    const maxY = window.innerHeight - button.height - padding;
    let newX: number, newY: number;
    let attempts = 0;
    do {
      newX = Math.random() * maxX + padding;
      newY = Math.random() * maxY + padding;
      attempts++;
    } while (
      attempts < 50 &&
      yesBtn &&
      Math.abs(newX - yesBtn.left) < yesBtn.width + 20 &&
      Math.abs(newY - yesBtn.top) < yesBtn.height + 20
    );
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setShowHearts(true);
    setTimeout(() => {
      navigate("/rebus");
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      <FloatingHearts />
      
      {showHearts && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          {Array.from({ length: 30 }).map((_, i) => (
            <Heart
              key={i}
              className="absolute text-primary fill-primary confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 20 + Math.random() * 30,
                height: 20 + Math.random() * 30,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="card-romantic text-center max-w-lg z-10 animate-fade-in">
        <Heart className="w-20 h-20 mx-auto text-primary fill-primary mb-6 pulse-love" />
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Vuoi essere la mia Valentina?
        </h1>
        
        <p className="text-lg text-muted-foreground mb-10">
          Non provare assolutamente a premere il No! 
                  </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative min-h-[100px]">
          <button
            onClick={handleYesClick}
            className="btn-valentine z-10"
          >
            Sì! 💞
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={escapeButton}
            onTouchStart={escapeButton}
            onClick={escapeButton}
            className="btn-escape"
            style={noButtonPosition ? {
              position: 'fixed',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              zIndex: 40,
            } : {}}
          >
            No 🖕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValentinePage;
