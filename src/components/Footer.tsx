
import React from 'react';
import { Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-auto border-t border-cyberpunk-purple/20 glassmorphism">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-muted-foreground">Made with 💻 by Zeeshan</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-cyberpunk-purple/20"
            onClick={() => window.open('https://www.linkedin.com/in/md-zeeshan-shahid/', '_blank')}
          >
            <Linkedin className="h-4 w-4 text-cyberpunk-blue" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
