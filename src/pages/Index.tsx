
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CodeEditor } from '@/components/CodeEditor';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Preloader } from '@/components/Preloader';

const Index = () => {
  const [loading, setLoading] = useState(true);
  
  const handleLoadComplete = () => {
    setLoading(false);
  };
  
  return (
    <>
      {loading && <Preloader onLoadComplete={handleLoadComplete} />}
      
      <div className="min-h-screen flex flex-col">
        <ParticleBackground />
        
        <Header />
        
        <main className="flex-grow py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-blue to-cyberpunk-cyan">
                Universal Programming Language Converter
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Convert code between different programming languages with ease. RuX translates any code from one language to another, 
                including high-level to low-level and vice versa.
              </p>
            </div>
            
            <CodeEditor />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
