
import { CSSProperties } from "react";

interface PixelDinoProps {
  type?: "dino" | "caveman";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  style?: CSSProperties;
  className?: string; // Added className prop
}

const PixelDino = ({ 
  type = "dino", 
  size = "md", 
  animated = true,
  style,
  className = "" // Default to empty string
}: PixelDinoProps) => {
  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  
  // We're using ASCII art here, but in a real app you'd use actual pixel art sprites
  const dinoArt = `
    ████████
    ██░░████
    ██░░░░██
    ██████████
    ████░░████
    ██░░░░░░██
    ██░░░░████
    ██████████
  `;
  
  const cavemanArt = `
    ██████
    ██░░██
    ██░░██
    ██████████
    ██░░░░░░██
    ██████████
    ██░░██░░██
    ██░░██░░██
  `;
  
  return (
    <div 
      className={`font-mono leading-none ${sizeClass[size]} ${animated ? 'animate-walk' : ''} ${className}`}
      style={{ 
        ...style,
        fontFamily: 'monospace'
      }}
    >
      <pre className="text-[4px] md:text-[6px] whitespace-pre text-stone-dark">
        {type === "dino" ? dinoArt : cavemanArt}
      </pre>
    </div>
  );
};

export default PixelDino;
