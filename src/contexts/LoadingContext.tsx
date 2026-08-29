import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  startLoading: () => void;
  updateProgress: (newProgress: number) => void;
  completeLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
  }, []);

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(Math.min(newProgress, 99));
  }, []);

  const completeLoading = useCallback(() => {
    setProgress(100);
    // Fade out after completion
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, progress, startLoading, updateProgress, completeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
