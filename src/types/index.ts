export interface UserProfile {
  profession: string;
  salary: number;
  location: string;
  resumeFile: File | null;
  coverLetterFile: File | null;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
}

export type WorkLocationType = 'On-site' | 'Remote' | 'Hybrid';
