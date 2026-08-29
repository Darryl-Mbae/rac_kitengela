/**
 * Utility to preload images and prevent loading flicker when navigating between pages
 */

export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const imagePromises = imageUrls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error to prevent blocking
      img.src = url;
    });
  });

  return Promise.all(imagePromises);
};

/**
 * Preload images for a specific page
 */
export const preloadPageImages = (images: string[]): void => {
  preloadImages(images).catch((error) => {
    console.warn('Error preloading images:', error);
  });
};

/**
 * Preload all critical images with progress tracking (for app initialization)
 */
export const preloadAllImages = async (options?: {
  onProgress?: (progress: number) => void;
}): Promise<void> => {
  // List of critical images to preload on app start
  const criticalImages = [
    '/images/IMG3.jpg',
    '/images/IMG3-nobg.png',
    '/images/About.JPEG',
    '/images/board-pic.jpg',
    '/images/board-pic-nobg.png',
    '/images/board-pic-web.jpg',
    '/images/board-pic-web-nobg.png',
    '/images/MEMBERSHIP.jpeg',
    '/images/MEMBERSHIP-nobg.png',
    '/images/logo.png',
    '/images/logo-white.png',
  ];

  const total = criticalImages.length;
  let loaded = 0;

  const imagePromises = criticalImages.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        const progress = Math.round((loaded / total) * 100);
        options?.onProgress?.(progress);
        resolve();
      };
      img.onerror = () => {
        loaded++;
        const progress = Math.round((loaded / total) * 100);
        options?.onProgress?.(progress);
        resolve();
      };
      img.src = url;
    });
  });

  await Promise.all(imagePromises);
};
