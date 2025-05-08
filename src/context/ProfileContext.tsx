import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, Profile, Resume } from '@/types';
import { supabase } from '@/lib/supabase';

interface ProfileContextType {
  profile: UserProfile | null;
  dbProfile: Profile | null;
  resume: Resume | null;
  updateProfile: (profile: UserProfile) => void;
  resetProfile: () => void;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dbProfile, setDbProfile] = useState<Profile | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        // Load profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Load resume
        const { data: resumeData } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileData) {
          setDbProfile(profileData);
          // Convert DB profile to UserProfile format
          setProfile({
            profession: profileData.desired_title || '',
            salary: profileData.salary_min || 0,
            location: profileData.location || '',
            resumeFile: null,
            coverLetterFile: null,
          });
        }

        if (resumeData) {
          setResume(resumeData);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const updateProfile = async (newProfile: UserProfile) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update profiles table
      const { data: updatedProfile, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          desired_title: newProfile.profession,
          salary_min: newProfile.salary,
          location: newProfile.location,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Handle resume upload if provided
      if (newProfile.resumeFile) {
        const timestamp = Date.now();
        const fileExt = newProfile.resumeFile.name.split('.').pop();
        const filePath = `${user.id}/${timestamp}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, newProfile.resumeFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);

        const { data: resumeData, error: resumeError } = await supabase
          .from('resumes')
          .upsert({
            user_id: user.id,
            file_url: publicUrl,
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (resumeError) throw resumeError;
        setResume(resumeData);
      }

      setProfile(newProfile);
      setDbProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const resetProfile = () => {
    setProfile(null);
    setDbProfile(null);
    setResume(null);
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      dbProfile,
      resume, 
      updateProfile, 
      resetProfile,
      loading 
    }}>
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