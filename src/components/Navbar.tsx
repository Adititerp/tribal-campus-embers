
import { LogOut, ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useGameStore from "@/store/gameStore";
import EmberCounter from "./EmberCounter";
import { toast } from "sonner";
import FireAnimation from "./FireAnimation";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useGameStore();
  
  const showBackButton = location.pathname !== "/map";
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleLogout = () => {
    if (confirm("Abandon thy quest?")) {
      logout();
      toast.success("Thy quest has been abandoned... for now.");
      navigate("/");
    }
  };
  
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={handleBack}
            >
              <ChevronLeft size={18} />
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <FireAnimation size="sm" />
            <span className="font-pixel text-sm md:text-base">Quest For Campus Embers</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <EmberCounter />
          
          <button 
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
