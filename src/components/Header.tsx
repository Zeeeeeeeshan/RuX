
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Github, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(true);

  // Check if there's a saved preference in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'light') {
      setDarkMode(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return <header className="w-full py-4 px-6 glassmorphism border-b border-cyberpunk-purple/20 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-blue">
            {isMobile ? 'RuX' : 'RuX'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-cyberpunk-darker border-cyberpunk-purple/30 hover:bg-cyberpunk-purple/20"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="outline" size="icon" className="bg-cyberpunk-darker border-cyberpunk-purple/30 hover:bg-cyberpunk-purple/20" onClick={() => window.open('https://github.com/Zeeeeeeeshan', '_blank')}>
            <Github className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>;
};
