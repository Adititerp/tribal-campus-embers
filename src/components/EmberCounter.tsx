
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
    <div className={`ember-counter ${isAnimating ? 'animate-fire-pulse' : ''}`}>
      <Flame size={16} className="text-ember animate-fire-pulse" />
      <span className="text-sm">{counter}</span>
    </div>
  );
};

export default EmberCounter;
