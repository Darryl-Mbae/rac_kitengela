import React, { useEffect, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export const LoadingScreen: React.FC = () => {
  const { isLoading, progress } = useLoading();
  const [shouldRender, setShouldRender] = useState(true);

  // Handle unmount delay for the exit curtain animation
  useEffect(() => {
    if (!isLoading && progress === 100) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1000); // Matches the exit transition duration
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isLoading, progress]);

  if (!shouldRender) {
    return null;
  }

  const isComplete = !isLoading && progress === 100;

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col justify-between p-8 md:p-16 bg-primary text-white transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isComplete ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header info (Awwwards style metadata) */}
      <div className="flex justify-between items-center w-full uppercase tracking-widest text-xs font-mono text-white/70">
        <div>Rotaract Kitengela</div>
        <div className="hidden md:block">Est. Experience</div>
        <div>[Loading System]</div>
      </div>

      {/* Center Cinematic Display with Spinning Wheel Logo */}
      <div className="flex flex-col items-center justify-center relative my-auto gap-8">
        {/* Subtle background white/glow contrast */}
        <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        {/* Spinning Wheel Logo */}
        <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32">
          {/* Outer glowing ring that spins */}
          <div className="absolute inset-0 rounded-full border border-white/30 animate-spin" style={{ animationDuration: '12s' }} />
          
          {/* Main Spinning Wheel Logo */}
          <svg
            className="w-16 h-16 md:w-20 md:h-20 text-white animate-spin"
            style={{ animationDuration: '6s' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Rotaract Wheel Representation */}
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="3" x2="12" y2="9" />
            <line x1="12" y1="15" x2="12" y2="21" />
            <line x1="3" y1="12" x2="9" y2="12" />
            <line x1="15" y1="12" x2="21" y2="12" />
            <line x1="5.64" y1="5.64" x2="9.88" y2="9.88" />
            <line x1="14.12" y1="14.12" x2="18.36" y2="18.36" />
            <line x1="5.64" y1="18.36" x2="9.88" y2="14.12" />
            <line x1="14.12" y1="9.88" x2="18.36" y2="5.64" />
          </svg>
        </div>

        {/* Dynamic Counter / Percentage */}
        <div className="flex items-baseline overflow-hidden py-1">
          <span className="text-[10vw] md:text-[8vw] font-light tracking-tighter leading-none tabular-nums font-mono text-white">
            {Math.floor(progress)}
          </span>
          <span className="text-2xl md:text-3xl font-light text-white/60 ml-2 font-mono">
            %
          </span>
        </div>

        {/* Editorial Status text */}
        <div className="h-6 overflow-hidden relative">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/80 font-medium text-center">
            {progress < 30
              ? 'Initializing assets'
              : progress < 60
              ? 'Curating experience'
              : progress < 90
              ? 'Assembling interface'
              : 'Welcome'}
          </p>
        </div>
      </div>

      {/* Bottom Progress Line & Footer */}
      <div className="w-full flex flex-col gap-4">
        {/* Minimalist hairline progress track with white highlight */}
        <div className="w-full h-[2px] bg-white/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-200 ease-out shadow-[0_0_12px_rgba(255,255,255,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-mono text-white/70">
          <span>ROTARACT KITENGELA // V2.6</span>
          <span className="tracking-widest text-white font-medium">
            {isComplete ? 'READY' : `${Math.round(progress)} COMPLETED`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;