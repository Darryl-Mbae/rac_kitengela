import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to handle smooth scrolling when navigating pages or using anchor links
 * - Scrolls to top smoothly when page changes
 * - Scrolls to element by ID (anchor) if present in URL hash
 * - Works on page refresh with hash
 * - Accounts for navbar offset
 */
export const useSmoothScroll = () => {
  const location = useLocation();
  const lastHashRef = useRef<string>('');
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const hash = location.hash;

    // Only scroll if hash actually changed
    if (hash === lastHashRef.current) {
      return;
    }

    // Clear any pending scroll
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    lastHashRef.current = hash;

    // Delay to ensure content is rendered
    scrollTimeoutRef.current = setTimeout(() => {
      if (hash) {
        // Extract the element ID from the hash
        const elementId = hash.replace('#', '');
        
        // Try multiple times to find element (for lazy-loaded content)
        let attempts = 0;
        const maxAttempts = 10;
        
        const scrollToElement = () => {
          const element = document.getElementById(elementId);
          if (element) {
            // Get navbar height (approximately 90px for fixed navbar)
            const navbarHeight = 90;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(scrollToElement, 150);
          }
        };
        
        scrollToElement();
      } else {
        // No hash, scroll to top smoothly on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [location.pathname, location.hash]);
};
