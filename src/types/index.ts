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

export interface Profile {
  id: string;
  full_name: string;
  desired_title: string;
  location: string;
  salary_min: number;
  salary_max: number;
  skills: string;
  parsed_cv: any;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}