
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Role } from "@/types/game";
import useGameStore from "@/store/gameStore";
import PageTitle from "@/components/PageTitle";
import RoleCard from "@/components/RoleCard";
import PixelButton from "@/components/PixelButton";
import FireAnimation from "@/components/FireAnimation";
import PixelDino from "@/components/PixelDino";
import { toast } from "sonner";
import { Sparkles, Flame, BookOpen } from "lucide-react";

const usernameSchema = z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, {
  message: "Username can only contain letters, numbers, and underscores",
});

const Registration = () => {
  const navigate = useNavigate();
  const { register } = useGameStore();
  
  const [username, setUsername] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [validationError, setValidationError] = useState("");
  const [showSparks, setShowSparks] = useState(false);
  
  const validateUsername = (value: string) => {
    try {
      usernameSchema.parse(value);
      setValidationError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUsername(username) || !selectedRole) {
      toast.error("Please provide a valid username and select a role");
      return;
    }
    
    setShowSparks(true);
    setTimeout(() => {
      register(username, selectedRole);
      toast.success(`Welcome to the tribe, ${username} the ${selectedRole}!`);
      navigate("/map");
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="flex justify-center mb-6">
          <FireAnimation size="lg" />
        </div>
        
        <PageTitle subtitle="Begin thy prehistoric journey">
          <span className="text-gradient bg-gradient-to-r from-amber-500 via-ember to-red-500">
            Quest For Campus Embers
          </span>
        </PageTitle>
        
        <div className="max-w-xl mx-auto w-full bg-card p-6 rounded-lg shadow-lg border border-amber-200 relative overflow-hidden">
          {showSparks && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Sparkles className="w-32 h-32 text-yellow-400 animate-ping" />
            </div>
          )}
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-300/20 rounded-bl-full"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-0">
            <div className="space-y-2">
              <label className="block font-pixel text-sm flex items-center gap-2 text-amber-800">
                <BookOpen size={16} className="text-ember animate-pulse" />
                Choose Thy Tribal Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
                }}
                className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-pixel text-sm bg-amber-50 shadow-inner"
                placeholder="Enter username (3-20 chars)"
              />
              {validationError && (
                <p className="text-destructive text-xs mt-1">{validationError}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <label className="block font-pixel text-sm flex items-center gap-2 text-amber-800">
                <Flame size={16} className="text-ember animate-fire-pulse" />
                Select Thy Tribal Role
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RoleCard
                  role="Hunter"
                  selected={selectedRole === "Hunter"}
                  onClick={() => setSelectedRole("Hunter")}
                />
                <RoleCard
                  role="Tracker"
                  selected={selectedRole === "Tracker"}
                  onClick={() => setSelectedRole("Tracker")}
                />
                <RoleCard
                  role="Gatherer"
                  selected={selectedRole === "Gatherer"}
                  onClick={() => setSelectedRole("Gatherer")}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <PixelButton
                type="submit"
                disabled={!username || !selectedRole}
                className="relative group"
              >
                <span className="relative z-10">Begin Quest</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-ember opacity-0 group-hover:opacity-20 transition-opacity rounded"></span>
              </PixelButton>
            </div>
          </form>
        </div>
        
        <div className="fixed bottom-4 right-8 animate-walk">
          <PixelDino size="lg" />
        </div>
        <div className="fixed bottom-4 left-8">
          <PixelDino size="md" className="transform scale-x-[-1] animate-float" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
