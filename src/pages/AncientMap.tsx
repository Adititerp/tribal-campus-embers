
import { useNavigate } from "react-router-dom";
import { Utensils, Dumbbell, Trophy, Flame } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import useGameStore from "@/store/gameStore";
import FireAnimation from "@/components/FireAnimation";
import PixelDino from "@/components/PixelDino";

const AncientMap = () => {
  const navigate = useNavigate();
  const { user } = useGameStore();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageTitle subtitle={`Welcome, ${user?.username || 'Adventurer'}`}>
          Ancient Lands Map
        </PageTitle>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feeding Zones */}
          <div 
            className="bg-card relative overflow-hidden rounded-lg shadow-md border border-border hover:shadow-ember-glow transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/feeding-zones')}
          >
            <div className="p-6 flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
                <Utensils size={28} className="text-leaf-dark" />
              </div>
              <h3 className="font-pixel text-lg">Feeding Zones</h3>
              <p className="text-sm text-muted-foreground text-center">
                Find food and gather sustenance for thy tribe
              </p>
            </div>
          </div>
          
          {/* Training Grounds */}
          <div 
            className="bg-card relative overflow-hidden rounded-lg shadow-md border border-border hover:shadow-ember-glow transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/training-grounds')}
          >
            <div className="p-6 flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
                <Dumbbell size={28} className="text-blue-500" />
              </div>
              <h3 className="font-pixel text-lg">Training Grounds</h3>
              <p className="text-sm text-muted-foreground text-center">
                Build strength and agility for hunting
              </p>
            </div>
          </div>
          
          {/* Lava Leaderboard */}
          <div 
            className="bg-card relative overflow-hidden rounded-lg shadow-md border border-border hover:shadow-ember-glow transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate('/leaderboard')}
          >
            <div className="p-6 flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
                <Trophy size={28} className="text-amber-500" />
              </div>
              <h3 className="font-pixel text-lg">Lava Leaderboard</h3>
              <p className="text-sm text-muted-foreground text-center">
                See how thy tribe compares to others
              </p>
            </div>
          </div>
        </div>
        
        {/* Streak Display */}
        <div className="mt-12 max-w-md mx-auto bg-card p-6 rounded-lg shadow-md border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-pixel text-lg">Fire Streak</h3>
              <p className="text-sm text-muted-foreground">
                {user?.streakDays} day{user?.streakDays !== 1 ? 's' : ''} of activity
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {user && user.streakDays < 100 ? 
                  `${100 - user.streakDays} more days until Frozen Ember Relic!` : 
                  "Maximum streak achieved!"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {Array.from({ length: Math.min(user?.streakDays || 0, 5) }).map((_, i) => (
                <FireAnimation key={i} size="sm" />
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div 
              className="bg-gradient-to-r from-orange-300 via-ember to-red-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((user?.streakDays || 0) / 100 * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Badges */}
        {user?.badges && user.badges.length > 0 && (
          <div className="mt-8 max-w-md mx-auto bg-card p-6 rounded-lg shadow-md border border-border">
            <h3 className="font-pixel text-lg mb-4">Stone Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {user.badges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 bg-secondary/50 p-3 rounded-md">
                  <Flame size={16} className="text-purple-500" />
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Frozen Ember Relic */}
        {user?.frozenEmberRelicEarned && (
          <div className="mt-8 max-w-md mx-auto bg-card p-6 rounded-lg shadow-md border border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300 opacity-30"></div>
            <div className="relative z-10">
              <h3 className="font-pixel text-lg mb-2">Frozen Ember Relic Earned!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Take this sacred relic to the ice cream shop for a free treat!
              </p>
              <div className="bg-secondary/50 p-4 rounded-md text-center">
                <p className="font-pixel text-primary">QR-CODE-PLACEHOLDER</p>
                <img 
                  src="/lovable-uploads/722d40a5-4fa3-4b10-a3ad-4f63cbd729a4.png" 
                  alt="Frozen Ember Relic" 
                  className="max-w-[180px] mx-auto my-4"
                />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-20 h-20">
              <FireAnimation size="lg" />
            </div>
          </div>
        )}
        
        <div className="fixed bottom-4 right-8">
          <PixelDino type="caveman" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default AncientMap;
