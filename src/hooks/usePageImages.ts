import { useEffect } from 'react';
import { preloadPageImages } from '../utils/imagePreloader';

/**
 * Hook to preload all images for a page on mount
 * Pass an array of image URLs that will be preloaded
 */
export const usePageImages = (images: string[]) => {
  useEffect(() => {
    preloadPageImages(images);
  }, [images]);
};
