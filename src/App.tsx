import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/Hero/HeroSection';

function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10 w-full min-h-screen text-white">
        <HeroSection />
      </div>
    </>
  );
}

export default App;
