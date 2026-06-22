import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './BootSequence';
import HeroContent from './HeroContent';
import VisualElements from './VisualElements';

const HeroSection: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden font-sans pt-16">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootSequence key="boot" onComplete={() => setIsBooted(true)} />
        ) : (
          <React.Fragment key="hero">
            <VisualElements />
            <HeroContent />
          </React.Fragment>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
