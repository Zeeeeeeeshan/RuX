
import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onLoadComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        onLoadComplete();
      }, 1000);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [onLoadComplete]);
  
  return (
    <div className={`fixed inset-0 bg-cyberpunk-darker flex items-center justify-center z-50 transition-opacity duration-1000 ${loading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-blue to-cyberpunk-cyan relative inline-block animate-glitch">
          LOWKEY-LANG
        </h1>
        <div className="w-64 h-2 bg-cyberpunk-darker rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-blue rounded-full animate-pulse"
               style={{ 
                 width: loading ? '0%' : '100%', 
                 transition: 'width 2s cubic-bezier(0.45, 0, 0.55, 1)' 
               }}
          />
        </div>
        <p className="text-cyberpunk-purple mt-4 animate-pulse">Universal Language Converter</p>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-cyberpunk-green text-opacity-20 animate-code-rain text-xs"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `-${Math.random() * 100}px`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j}>{Math.round(Math.random())}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
