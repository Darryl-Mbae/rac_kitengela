import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to handle smooth scrolling when navigating pages or using anchor links
 * - Scrolls to top smoothly when page changes (pathname changes)
 * - Scrolls to element by ID (anchor) if present in URL hash
 * - Works on page refresh with hash
 * - Accounts for navbar offset
 */
export const useSmoothScroll = () => {
  const location = useLocation();
  const lastPathnameRef = useRef<string>(location.pathname);

  useEffect(() => {
    const pathChanged = location.pathname !== lastPathnameRef.current;
    lastPathnameRef.current = location.pathname;

    // Clear any pending scroll
    const timeout = setTimeout(() => {
      if (pathChanged) {
        // Page changed - scroll to top (unless there's a hash for an anchor)
        if (location.hash) {
          // Has anchor - scroll to the anchor element
          const elementId = location.hash.replace('#', '');
          let attempts = 0;
          const maxAttempts = 10;
          
          const scrollToElement = () => {
            const element = document.getElementById(elementId);
            if (element) {
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
          // No anchor - scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (location.hash) {
        // Same page, hash changed - scroll to anchor
        const elementId = location.hash.replace('#', '');
        let attempts = 0;
        const maxAttempts = 10;
        
        const scrollToElement = () => {
          const element = document.getElementById(elementId);
          if (element) {
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
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [location.pathname, location.hash]);
};
