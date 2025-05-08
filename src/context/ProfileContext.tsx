import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (profile: UserProfile) => void;
  resetProfile: () => void;
}

const initialProfile: UserProfile = {
  profession: '',
  salary: 0,
  location: '',
  resumeFile: null,
  coverLetterFile: null,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const resetProfile = () => {
    setProfile(null);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
