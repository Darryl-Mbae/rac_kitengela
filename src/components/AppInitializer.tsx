import React, { useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { preloadAllImages } from '../utils/imagePreloader';

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { updateProgress, completeLoading } = useLoading();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Preload all images with progress tracking
        await preloadAllImages({
          onProgress: (progress: number) => {
            updateProgress(progress);
          },
        });

        // Complete loading
        completeLoading();
      } catch (error) {
        console.error('Error preloading images:', error);
        // Complete loading even if there's an error
        completeLoading();
      }
    };

    initializeApp();
  }, [updateProgress, completeLoading]);

  return <>{children}</>;
};

export default AppInitializer;
