import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Resume } from '@/types';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ProfileContextType {
  dbProfile: Profile | null;
  resume: Resume | null;
  updateProfile: (profile: Partial<Profile> & { resumeFile?: File | null }) => Promise<void>;
  resetProfile: () => void;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
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
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error loading profile:', profileError);
        }

        // Load resume
        const { data: resumeData, error: resumeError } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (resumeError && resumeError.code !== 'PGRST116') {
          console.error('Error loading resume:', resumeError);
        }

        setDbProfile(profileData || null);
        setResume(resumeData || null);
      } catch (error) {
        console.error('Error loading profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();

    // Subscribe to realtime changes
    const profileSubscription = supabase
      .channel('profile-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles',
      }, (payload) => {
        if (payload.new) {
          setDbProfile(payload.new as Profile);
        }
      })
      .subscribe();

    const resumeSubscription = supabase
      .channel('resume-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'resumes',
      }, (payload) => {
        if (payload.new) {
          setResume(payload.new as Resume);
        }
      })
      .subscribe();

    return () => {
      profileSubscription.unsubscribe();
      resumeSubscription.unsubscribe();
    };
  }, []);

  const updateProfile = async (newProfile: Partial<Profile> & { resumeFile?: File | null }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { resumeFile, ...profileData } = newProfile;

      // Update profile
      const { data: updatedProfile, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Handle resume upload if provided
      if (resumeFile) {
        const timestamp = Date.now();
        const fileExt = resumeFile.name.split('.').pop();
        const filePath = `${user.id}/${timestamp}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, resumeFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);

        const { data: resumeData, error: resumeError } = await supabase
          .from('resumes')
          .upsert({
            user_id: user.id,
            file_url: publicUrl,
          })
          .select()
          .single();

        if (resumeError) throw resumeError;
        setResume(resumeData);
      }

      setDbProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const resetProfile = () => {
    setDbProfile(null);
    setResume(null);
  };

  return (
    <ProfileContext.Provider value={{ 
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