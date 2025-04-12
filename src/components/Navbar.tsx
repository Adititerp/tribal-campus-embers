
import { LogOut, ChevronLeft, Award, Map, HomeIcon } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useGameStore from "@/store/gameStore";
import EmberCounter from "./EmberCounter";
import { toast } from "sonner";
import FireAnimation from "./FireAnimation";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useGameStore();
  
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
    <nav className="bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button 
              className="p-2 rounded-full hover:bg-amber-200 transition-colors text-amber-700"
              onClick={handleBack}
            >
              <ChevronLeft size={18} />
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <FireAnimation size="sm" />
            <span className="font-pixel text-sm md:text-base bg-gradient-to-r from-amber-700 via-ember to-red-700 text-transparent bg-clip-text">
              Quest For Campus Embers
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/map" 
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${location.pathname === '/map' ? 'bg-amber-200 text-amber-800' : 'hover:bg-amber-100 text-amber-700'}`}
          >
            <Map size={16} />
            <span className="text-sm font-medium">Map</span>
          </Link>
          
          <Link 
            to="/leaderboard" 
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors ${location.pathname === '/leaderboard' ? 'bg-amber-200 text-amber-800' : 'hover:bg-amber-100 text-amber-700'}`}
          >
            <Award size={16} />
            <span className="text-sm font-medium">Leaderboard</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-xs text-amber-700 hidden md:block">
              <span className="font-pixel">{user.username}</span>
              <span className="mx-1">•</span>
              <span>{user.role}</span>
            </div>
          )}
          
          <EmberCounter />
          
          <button 
            className="p-2 rounded-full hover:bg-amber-200 transition-colors text-amber-700"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
