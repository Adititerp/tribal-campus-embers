
import PageTitle from "@/components/PageTitle";
import useGameStore from "@/store/gameStore";
import FireAnimation from "@/components/FireAnimation";
import { Award, Medal, Flame, User, Calendar, Trophy, Camera, Upload } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";

// Mock data for the leaderboard
const mockLeaderboardData = [
  { username: "FireChief", role: "Hunter", emberPoints: 250, streakDays: 12 },
  { username: "CaveDweller", role: "Gatherer", emberPoints: 210, streakDays: 9 },
  { username: "DinoTamer", role: "Tracker", emberPoints: 180, streakDays: 7 },
  { username: "StoneThrower", role: "Hunter", emberPoints: 150, streakDays: 5 },
  { username: "BerryPicker", role: "Gatherer", emberPoints: 130, streakDays: 6 },
];

const Leaderboard = () => {
  const { user, updateProfilePicture } = useGameStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
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
  
  const getBadgeColor = (index: number) => {
    switch(index) {
      case 0: return "text-yellow-500";
      case 1: return "text-gray-400";
      case 2: return "text-amber-700";
      default: return "text-stone-500";
    }
  };
  
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error("Image too large. Maximum size is 5MB.");
      setIsUploading(false);
      return;
    }
    
    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      updateProfilePicture(result);
      toast.success("Profile picture updated!");
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      toast.error("Failed to read image file.");
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleCaptureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Create video element to display the stream
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      // Wait for video to be ready
      await new Promise(resolve => {
        video.onloadedmetadata = resolve;
      });
      
      // Create canvas to capture the image
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame to the canvas
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Stop the video stream
      stream.getTracks().forEach(track => track.stop());
      
      // Get the image data
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Update profile picture
      updateProfilePicture(imageData);
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error('Error capturing image:', error);
      toast.error("Failed to capture image. Please check camera permissions.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <PageTitle subtitle="The mightiest of the tribe" showSparkles={true}>
          <span className="text-gradient bg-gradient-to-r from-amber-500 via-ember to-red-500">
            Lava Leaderboard
          </span>
        </PageTitle>
        
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
          <div className="w-full md:w-2/3">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-amber-200">
              <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-ember" size={20} />
                  <h3 className="font-pixel text-amber-800">Tribe Rankings</h3>
                </div>
                <div className="grid grid-cols-12 gap-4 font-pixel text-sm text-amber-700">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-5">Tribesperson</div>
                  <div className="col-span-3 text-center">Role</div>
                  <div className="col-span-3 text-center">Embers</div>
                </div>
              </div>
              
              <div className="divide-y divide-amber-100">
                {sortedLeaderboard.map((entry, index) => {
                  const isCurrentUser = user && entry.username === user.username;
                  
                  return (
                    <div 
                      key={entry.username} 
                      className={`p-4 transition-colors hover:bg-amber-50 ${isCurrentUser ? 'bg-amber-100/50' : ''}`}
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 text-center font-pixel">
                          {index < 3 ? (
                            <Medal className={`${getBadgeColor(index)}`} size={16} />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <div className="col-span-5 font-medium flex items-center gap-2">
                          {isCurrentUser && (
                            <span className="inline-block w-2 h-2 bg-ember rounded-full animate-pulse"></span>
                          )}
                          <User size={16} className="text-amber-700 opacity-70" />
                          <span className={isCurrentUser ? "text-ember font-bold" : ""}>
                            {entry.username}
                          </span>
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
          
          {user && (
            <div className="w-full md:w-1/3">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-amber-200 h-full">
                <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <User className="text-ember" size={20} />
                    <h3 className="font-pixel text-amber-800">Your Stats</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-200 flex items-center justify-center mb-2 overflow-hidden relative group cursor-pointer"
                      onClick={handleProfilePictureClick}
                    >
                      {user.profilePicture ? (
                        <Avatar className="w-full h-full">
                          <AvatarImage src={user.profilePicture} />
                          <AvatarFallback className="font-pixel text-2xl text-amber-700">
                            {user.username[0]}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <span className="font-pixel text-2xl text-amber-700">{user.role.charAt(0)}</span>
                      )}
                      
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="bg-white/20 text-white p-1 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCaptureImage();
                          }}
                        >
                          <Camera size={18} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="bg-white/20 text-white p-1 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          <Upload size={18} />
                        </Button>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-muted-foreground">Click to update profile</p>
                    <h4 className="font-pixel text-amber-800 mt-2">{user.username}</h4>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="text-ember" size={16} />
                        <span className="text-sm font-medium text-amber-800">Ember Points</span>
                      </div>
                      <p className="font-pixel text-xl text-ember">{user.emberPoints}</p>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="text-blue-500" size={16} />
                        <span className="text-sm font-medium text-amber-800">Current Streak</span>
                      </div>
                      <p className="font-pixel text-xl text-ember">{user.streakDays} days</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-orange-300 via-ember to-red-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min((user.streakDays / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-right mt-1 text-muted-foreground">
                        {user.streakDays >= 100 ? "Max streak!" : `${100 - user.streakDays} days to relic`}
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="text-purple-500" size={16} />
                        <span className="text-sm font-medium text-amber-800">Badges Earned</span>
                      </div>
                      <p className="font-pixel text-xl text-ember">{user.badges.length}</p>
                      {user.badges.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {user.badges.map((badge) => (
                            <span key={badge} className="inline-flex items-center px-2 py-1 rounded-full bg-amber-200 text-xs text-amber-800">
                              {badge}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-2">No badges earned yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
