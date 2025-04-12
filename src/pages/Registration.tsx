
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

const usernameSchema = z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, {
  message: "Username can only contain letters, numbers, and underscores",
});

const Registration = () => {
  const navigate = useNavigate();
  const { register } = useGameStore();
  
  const [username, setUsername] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [validationError, setValidationError] = useState("");
  
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
    
    register(username, selectedRole);
    toast.success(`Welcome to the tribe, ${username} the ${selectedRole}!`);
    navigate("/map");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="flex justify-center mb-6">
          <FireAnimation size="lg" />
        </div>
        
        <PageTitle subtitle="Begin thy prehistoric journey">
          Quest For Campus Embers
        </PageTitle>
        
        <div className="max-w-xl mx-auto w-full bg-card p-6 rounded-lg shadow-md border border-border">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block font-pixel text-sm">
                Choose Thy Tribal Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
                }}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-pixel text-sm"
                placeholder="Enter username (3-20 chars)"
              />
              {validationError && (
                <p className="text-destructive text-xs mt-1">{validationError}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <label className="block font-pixel text-sm">
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
              >
                Begin Quest
              </PixelButton>
            </div>
          </form>
        </div>
        
        <div className="fixed bottom-4 right-8 animate-walk">
          <PixelDino size="lg" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
