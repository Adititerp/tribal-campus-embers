
import PageTitle from "@/components/PageTitle";
import useGameStore from "@/store/gameStore";
import FireAnimation from "@/components/FireAnimation";

// Mock data for the leaderboard
const mockLeaderboardData = [
  { username: "FireChief", role: "Hunter", emberPoints: 250, streakDays: 12 },
  { username: "CaveDweller", role: "Gatherer", emberPoints: 210, streakDays: 9 },
  { username: "DinoTamer", role: "Tracker", emberPoints: 180, streakDays: 7 },
  { username: "StoneThrower", role: "Hunter", emberPoints: 150, streakDays: 5 },
  { username: "BerryPicker", role: "Gatherer", emberPoints: 130, streakDays: 6 },
];

const Leaderboard = () => {
  const { user } = useGameStore();
  
  // Combine mock data with the current user's data
  const leaderboardData = user 
    ? [...mockLeaderboardData, { 
        username: user.username, 
        role: user.role, 
        emberPoints: user.emberPoints,
        streakDays: user.streakDays
      }]
    : mockLeaderboardData;
  
  // Sort by ember points in descending order
  const sortedLeaderboard = leaderboardData
    .sort((a, b) => b.emberPoints - a.emberPoints);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageTitle subtitle="The mightiest of the tribe">
          Lava Leaderboard
        </PageTitle>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow overflow-hidden border border-border">
            <div className="p-4 bg-primary/10 border-b border-border">
              <div className="grid grid-cols-12 gap-4 font-pixel text-sm">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Tribesperson</div>
                <div className="col-span-3 text-center">Role</div>
                <div className="col-span-3 text-center">Embers</div>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {sortedLeaderboard.map((entry, index) => {
                const isCurrentUser = user && entry.username === user.username;
                
                return (
                  <div 
                    key={entry.username} 
                    className={`p-4 ${isCurrentUser ? 'bg-accent/20' : ''}`}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-center font-pixel">
                        {index + 1}
                      </div>
                      <div className="col-span-5 font-medium flex items-center gap-2">
                        {isCurrentUser && (
                          <span className="inline-block w-2 h-2 bg-ember rounded-full"></span>
                        )}
                        {entry.username}
                        {index === 0 && (
                          <span className="ml-2">👑</span>
                        )}
                      </div>
                      <div className="col-span-3 text-center text-sm text-muted-foreground">
                        {entry.role}
                      </div>
                      <div className="col-span-3 text-center flex items-center justify-center gap-1">
                        <FireAnimation size="sm" />
                        <span className="font-pixel">{entry.emberPoints}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
