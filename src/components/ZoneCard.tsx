
import { useState } from "react";
import { Utensils, Dumbbell, Camera, Check, Flame } from "lucide-react";
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
  const [hovering, setHovering] = useState(false);
  
  const handleVisit = () => {
    const result = logVisit(zone);
    if (result.success) {
      setVisited(true);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  
  const getZoneColor = () => {
    if (type === "feeding") {
      return "from-green-50 to-emerald-100";
    }
    return "from-blue-50 to-sky-100";
  };

  const getIconColor = () => {
    if (type === "feeding") {
      return "bg-gradient-to-br from-green-400 to-emerald-600 text-white";
    }
    return "bg-gradient-to-br from-blue-400 to-sky-600 text-white";
  };
  
  return (
    <div 
      className={`group bg-gradient-to-br ${getZoneColor()} p-6 rounded-lg border-2 border-stone-dark transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${visited ? 'border-ember' : ''}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 rounded-full ${getIconColor()} flex items-center justify-center shadow-md transition-transform ${hovering ? 'scale-110' : ''}`}>
          {type === "feeding" ? 
            <Utensils size={28} className="text-white" /> : 
            <Dumbbell size={28} className="text-white" />
          }
        </div>
        
        <div className="text-center">
          <h3 className="font-pixel text-lg bg-gradient-to-r from-amber-700 via-ember to-red-700 bg-clip-text text-transparent">
            {zone}
          </h3>
          <p className="text-sm text-muted-foreground text-center mt-1 mb-2">
            {realLocation}
          </p>
        </div>
        
        {visited ? (
          <div className="flex flex-col items-center gap-2 bg-amber-100/50 px-4 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-500" />
              <span className="text-sm text-amber-800 font-pixel">Visited Today!</span>
            </div>
            <FireAnimation size="sm" />
          </div>
        ) : (
          <div className="space-y-2 w-full">
            <PixelButton 
              onClick={handleVisit}
              className="w-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Flame className="w-4 h-4" />
                Visit Cave
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-ember opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </PixelButton>
            
            <button 
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/70 hover:bg-white/90 border border-gray-200 rounded text-sm text-gray-700 transition-colors"
            >
              <Camera size={14} />
              Log Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoneCard;
