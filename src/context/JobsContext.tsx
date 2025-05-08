import React, { createContext, useContext, useState, ReactNode } from 'react';
import { JobListing } from '@/types';
import { dummyJobs } from '@/data/dummyJobs';

interface JobsContextType {
  jobs: JobListing[];
  selectedJob: JobListing | null;
  selectJob: (jobId: string) => void;
  clearSelectedJob: () => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs] = useState<JobListing[]>(dummyJobs);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  const selectJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId) || null;
    setSelectedJob(job);
  };

  const clearSelectedJob = () => {
    setSelectedJob(null);
  };

  return (
    <JobsContext.Provider value={{ jobs, selectedJob, selectJob, clearSelectedJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
}
