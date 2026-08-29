import { useRef, useEffect, useState } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  margin?: string;
}

export const useInView = (options: UseInViewOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Optional: Stop observing after it comes into view
        // observer.unobserve(entry.target);
      } else {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold ?? 0.3,
      rootMargin: options.margin ?? '0px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.margin]);

  return { ref, isInView };
};
