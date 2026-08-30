import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import AppInitializer from './components/AppInitializer';
import { LoadingProvider } from './contexts/LoadingContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Import pages
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Leadership from './pages/Leadership.tsx';
import Projects from './pages/Projects.tsx';
import Events from './pages/Events.tsx';
import Membership from './pages/Membership.tsx';
import Join from './pages/Join.tsx';
import Footer from './components/Footer.tsx';

function AppContent() {
  const location = useLocation();
  
  // Use smooth scrolling for page navigation and anchor links
  useSmoothScroll();

  // Handle hash on initial page load (e.g., when user directly visits URL with hash)
  useEffect(() => {
    if (location.hash) {
      // Wait for page to fully render
      const timer = setTimeout(() => {
        const elementId = location.hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Longer delay for initial load to allow data fetching
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className='relative flex flex-col min-h-screen p-0 '>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LoadingProvider>
        {/* <LoadingScreen /> */}
        <AppInitializer>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AppInitializer>
      </LoadingProvider>
    </HelmetProvider>
  );
}

export default App;