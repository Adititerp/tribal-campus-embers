
export type Role = 'Hunter' | 'Tracker' | 'Gatherer';

export type Zone = 'Mosspit' | 'Riverfang' | 'Stonegrill' | 'Clawstone Crater' | 'Bone Spear Range';

export interface Visit {
  date: string; // ISO date
  rewarded: boolean;
  image?: string; // Base64 encoded
}

export interface UserData {
  username: string;
  role: Role;
  emberPoints: number;
  streakDays: number;
  lastLoginDate?: string;
  badges: string[];
  visits: {
    [zone in Zone]?: Visit;
  };
  frozenEmberRelicEarned: boolean;
}

export interface GameState {
  user: UserData | null;
  isAuthenticated: boolean;
  register: (username: string, role: Role) => void;
  logout: () => void;
  loadUser: () => void;
  logVisit: (zone: Zone) => { success: boolean; message: string };
  hasVisitedToday: (zone: Zone) => boolean;
}
