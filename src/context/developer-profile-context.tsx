'use client';

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { developerProfile as initialDeveloperProfile } from '@/lib/data';
import { TrustScoreAnalysisOutput } from '@/ai/flows/trust-score-analysis';

type DeveloperProfile = {
    name: string;
    avatarUrl: string;
    trustScore: number;
    skills: string[];
    githubProfileUrl: string;
    otherProfileUrls: { name: string; url: string; icon: string; }[];
};

interface DeveloperProfileContextType {
  developerProfile: DeveloperProfile | null;
  setDeveloperProfile: Dispatch<SetStateAction<DeveloperProfile | null>>;
  analysisResult: TrustScoreAnalysisOutput | null;
  setAnalysisResult: Dispatch<SetStateAction<TrustScoreAnalysisOutput | null>>;
}

const DeveloperProfileContext = createContext<DeveloperProfileContextType | undefined>(undefined);

export const DeveloperProfileProvider = ({ children }: { children: ReactNode }) => {
  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile | null>(initialDeveloperProfile);
  const [analysisResult, setAnalysisResult] = useState<TrustScoreAnalysisOutput | null>(null);

  return (
    <DeveloperProfileContext.Provider value={{ developerProfile, setDeveloperProfile, analysisResult, setAnalysisResult }}>
      {children}
    </DeveloperProfileContext.Provider>
  );
};

export const useDeveloperProfile = () => {
  const context = useContext(DeveloperProfileContext);
  if (context === undefined) {
    throw new Error('useDeveloperProfile must be used within a DeveloperProfileProvider');
  }
  return context;
};
