
import { Axe, PawPrint, Leaf } from "lucide-react";
import { Role } from "@/types/game";

interface RoleCardProps {
  role: Role;
  selected: boolean;
  onClick: () => void;
}

const RoleCard = ({ role, selected, onClick }: RoleCardProps) => {
  const getRoleIcon = () => {
    switch (role) {
      case "Hunter":
        return <Axe size={36} className="text-primary" />;
      case "Tracker":
        return <PawPrint size={36} className="text-primary" />;
      case "Gatherer":
        return <Leaf size={36} className="text-primary" />;
    }
  };

  const getRoleDescription = () => {
    switch (role) {
      case "Hunter":
        return "Strong and brave, hunters excel at gathering food for the tribe.";
      case "Tracker":
        return "Keen eyes and sharp senses make trackers the best pathfinders.";
      case "Gatherer":
        return "Wise and resourceful, gatherers collect the bounty of nature.";
    }
  };

  return (
    <div 
      className={`role-card ${selected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
          {getRoleIcon()}
        </div>
        <h3 className="font-pixel text-lg">{role}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {getRoleDescription()}
        </p>
      </div>
    </div>
  );
};

export default RoleCard;
