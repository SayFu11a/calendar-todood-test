// src/contexts/ProfileContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Profile {
  id: number;
  name: string;
}

interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile) => void;
  addProfile: (name: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>([{ id: 1, name: 'Default' }]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(profiles[0]);

  const addProfile = (name: string) => {
    const newProfile: Profile = { id: Date.now(), name };
    setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
  };

  return (
    <ProfileContext.Provider value={{ profiles, currentProfile, setCurrentProfile, addProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
