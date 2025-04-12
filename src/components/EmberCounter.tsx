
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import useGameStore from "@/store/gameStore";

const EmberCounter = () => {
  const { user } = useGameStore();
  const [counter, setCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (user?.emberPoints !== undefined) {
      if (counter !== user.emberPoints) {
        setIsAnimating(true);
        const timeout = setTimeout(() => setIsAnimating(false), 1000);
        return () => clearTimeout(timeout);
      }
      setCounter(user.emberPoints);
    }
  }, [user?.emberPoints, counter]);

  return (
    <div 
      className={`inline-flex items-center gap-1 bg-gradient-to-r from-amber-100 to-red-100 text-ember font-pixel px-3 py-2 rounded-full border border-ember shadow-sm hover:shadow-md transition-shadow ${isAnimating ? 'animate-fire-pulse' : ''}`}
    >
      <Flame size={16} className="text-ember animate-fire-pulse" />
      <span className="text-sm bg-gradient-to-r from-orange-500 to-ember bg-clip-text text-transparent">{counter}</span>
    </div>
  );
};

export default EmberCounter;
