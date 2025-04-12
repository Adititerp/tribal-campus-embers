
import { create } from 'zustand';
import { Role, UserData, Zone, GameState, VisitImage } from '../types/game';

const useGameStore = create<GameState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  loadUser: () => {
    const userData = localStorage.getItem('emberQuestUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData) as UserData;
        
        // Check for streak
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = parsedUser.lastLoginDate || '';
        
        // Convert dates to Date objects for comparison
        const todayDate = new Date(today);
        const lastLoginDate = new Date(lastLogin);
        
        // Set the hours, minutes, seconds, and milliseconds to 0 for comparison
        todayDate.setHours(0, 0, 0, 0);
        lastLoginDate.setHours(0, 0, 0, 0);
        
        // Calculate the difference in days
        const diffTime = Math.abs(todayDate.getTime() - lastLoginDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Update streak if necessary
        let updatedUser = { ...parsedUser };
        
        if (diffDays > 1) {
          // Reset streak if more than 1 day has passed
          updatedUser.streakDays = 1;
        } else if (diffDays === 1) {
          // Increment streak if exactly 1 day has passed
          updatedUser.streakDays += 1;
          
          // Check if user has reached 100 days streak to unlock Frozen Ember Relic
          if (updatedUser.streakDays >= 100 && !updatedUser.frozenEmberRelicEarned) {
            updatedUser.frozenEmberRelicEarned = true;
          }
        }
        
        // Update last login date
        updatedUser.lastLoginDate = today;
        
        // Save updated user back to localStorage
        localStorage.setItem('emberQuestUser', JSON.stringify(updatedUser));
        
        set({ user: updatedUser, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        set({ user: null, isAuthenticated: false });
      }
    }
  },

  register: (username: string, role: Role) => {
    const today = new Date().toISOString().split('T')[0];
    
    const newUser: UserData = {
      username,
      role,
      emberPoints: 0,
      streakDays: 1,
      lastLoginDate: today,
      badges: [],
      visits: {},
      visitImages: {},
      frozenEmberRelicEarned: false
    };
    
    localStorage.setItem('emberQuestUser', JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    // We're not deleting user data on logout anymore, just clearing the authentication
    set({ isAuthenticated: false });
    // Preserve the user data in sessionStorage as a backup
    const userData = localStorage.getItem('emberQuestUser');
    if (userData) {
      sessionStorage.setItem('userDataBackup', userData);
    }
  },

  logVisit: (zone: Zone) => {
    const { user } = get();
    
    if (!user) {
      return { success: false, message: 'Thou art not logged in!' };
    }
    
    const today = new Date().toISOString().split('T')[0];
    const zoneVisit = user.visits[zone];
    
    if (zoneVisit && zoneVisit.date === today && zoneVisit.rewarded) {
      return { success: false, message: 'Thou hast already visited this zone today.' };
    }
    
    // Update user data
    const updatedUser = { ...user };
    updatedUser.visits[zone] = { date: today, rewarded: true };
    updatedUser.emberPoints += 10;
    
    // Check if user earned all feeding zones badge
    if (
      updatedUser.visits['Mosspit'] && 
      updatedUser.visits['Riverfang'] && 
      updatedUser.visits['Stonegrill'] &&
      !updatedUser.badges.includes('Hungry Hunter')
    ) {
      updatedUser.badges.push('Hungry Hunter');
    }
    
    // Check if user earned all training grounds badge
    if (
      updatedUser.visits['Clawstone Crater'] && 
      updatedUser.visits['Bone Spear Range'] &&
      !updatedUser.badges.includes('Mighty Hunter')
    ) {
      updatedUser.badges.push('Mighty Hunter');
    }
    
    // Save updated user data
    localStorage.setItem('emberQuestUser', JSON.stringify(updatedUser));
    set({ user: updatedUser });
    
    return { success: true, message: `+10 Embers earned at ${zone}!` };
  },
  
  logVisitWithImage: (zone: Zone, imageData: string) => {
    const { user } = get();
    
    if (!user) {
      return { success: false, message: 'Thou art not logged in!' };
    }
    
    const today = new Date().toISOString().split('T')[0];
    const timestamp = new Date().toISOString();
    
    // Update user data
    const updatedUser = { ...user };
    
    // Add image to visit history (even if already visited today)
    if (!updatedUser.visitImages) {
      updatedUser.visitImages = {};
    }
    
    if (!updatedUser.visitImages[zone]) {
      updatedUser.visitImages[zone] = [];
    }
    
    // Add image with timestamp
    updatedUser.visitImages[zone]?.push({
      imageData,
      timestamp,
      date: today
    });
    
    // Save updated user data
    localStorage.setItem('emberQuestUser', JSON.stringify(updatedUser));
    set({ user: updatedUser });
    
    return { success: true, message: `Visit to ${zone} documented!` };
  },
  
  hasVisitedToday: (zone: Zone) => {
    const { user } = get();
    if (!user) return false;
    
    const today = new Date().toISOString().split('T')[0];
    const zoneVisit = user.visits[zone];
    
    return zoneVisit?.date === today && zoneVisit.rewarded;
  },
  
  getVisitImages: (zone: Zone) => {
    const { user } = get();
    if (!user || !user.visitImages) return [];
    
    return user.visitImages[zone] || [];
  },
  
  updateProfilePicture: (imageData: string) => {
    const { user } = get();
    
    if (!user) return;
    
    const updatedUser = { ...user, profilePicture: imageData };
    
    // Save updated user data
    localStorage.setItem('emberQuestUser', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  }
}));

export default useGameStore;
