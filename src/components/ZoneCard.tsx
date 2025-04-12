
import { useState } from "react";
import { Utensils, Dumbbell } from "lucide-react";
import { Zone } from "@/types/game";
import useGameStore from "@/store/gameStore";
import FireAnimation from "./FireAnimation";
import { toast } from "sonner";
import PixelButton from "./PixelButton";

interface ZoneCardProps {
  zone: Zone;
  type: "feeding" | "training";
  realLocation: string;
}

const ZoneCard = ({ zone, type, realLocation }: ZoneCardProps) => {
  const { logVisit, hasVisitedToday } = useGameStore();
  const [visited, setVisited] = useState(hasVisitedToday(zone));
  
  const handleVisit = () => {
    const result = logVisit(zone);
    if (result.success) {
      setVisited(true);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  
  return (
    <div className="zone-card">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
          {type === "feeding" ? 
            <Utensils size={28} className="text-primary" /> : 
            <Dumbbell size={28} className="text-primary" />
          }
        </div>
        <h3 className="font-pixel text-lg">{zone}</h3>
        <p className="text-sm text-muted-foreground text-center mb-2">
          {realLocation}
        </p>
        
        {visited ? (
          <div className="flex flex-col items-center gap-2">
            <FireAnimation size="sm" />
            <span className="text-sm text-ember font-pixel">Visited Today!</span>
          </div>
        ) : (
          <PixelButton onClick={handleVisit}>
            Visit Cave
          </PixelButton>
        )}
      </div>
    </div>
  );
};

export default ZoneCard;
