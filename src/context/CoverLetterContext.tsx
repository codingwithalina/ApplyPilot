import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CoverLetterContextType {
  coverLetter: string;
  setCoverLetter: (text: string) => void;
  generating: boolean;
  setGenerating: (state: boolean) => void;
}

const CoverLetterContext = createContext<CoverLetterContextType | undefined>(undefined);

export function CoverLetterProvider({ children }: { children: ReactNode }) {
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);

  return (
    <CoverLetterContext.Provider value={{ 
      coverLetter, 
      setCoverLetter, 
      generating, 
      setGenerating 
    }}>
      {children}
    </CoverLetterContext.Provider>
  );
}

export function useCoverLetter() {
  const context = useContext(CoverLetterContext);
  if (context === undefined) {
    throw new Error('useCoverLetter must be used within a CoverLetterProvider');
  }
  return context;
}
