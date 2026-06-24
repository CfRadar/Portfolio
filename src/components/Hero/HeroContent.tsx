import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import InteractiveTerminal from './InteractiveTerminal';

const HeroContent: React.FC = () => {
  const headingText = "Hi, I am Anurag";
  const headingText2 = "Software Engineer";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
  };

  // Generate deterministic scattered positions for each character
  const characters = useMemo(() => {
    return headingText.split('').map((char, index) => {
      const seed = index * 137.5; // Golden angle approximation for pseudo-randomness
      const startX = Math.sin(seed) * 800;
      const startY = Math.cos(seed * 1.2) * 500;
      const startZ = -500 - Math.abs(Math.sin(seed * 2)) * 800; // Deep in the background
      const startRotate = Math.sin(seed * 3) * 360;
      
      return { char, startX, startY, startZ, startRotate };
    });
  }, [headingText]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 px-6 lg:px-12 w-full max-w-7xl mx-auto pt-20 pb-32"
    >
      {/* Left Column: Intro */}
      <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
        {/* Main Headings */}
        <motion.h1 
          className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4 flex flex-wrap justify-center lg:justify-start"
          style={{ perspective: 1500 }}
        >
          {characters.map((item, index) => (
            <motion.span
              key={index}
              initial={{ 
                opacity: 0, 
                x: item.startX, 
                y: item.startY, 
                z: item.startZ, 
                rotateZ: item.startRotate,
                filter: 'blur(8px)' 
              }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: 0, 
                z: 0, 
                rotateZ: 0,
                filter: 'blur(0px)' 
              }}
              transition={{
                duration: 2.0,
                delay: 0.2 + (index * 0.05), // Stagger assembly
                type: "spring",
                damping: 15,
                stiffness: 60
              }}
              className="inline-block"
            >
              {item.char === ' ' ? '\u00A0' : item.char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h2 variants={childVariants} className="text-3xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-8 text-[#00C8FF] leading-normal pb-2">
          {headingText2}
        </motion.h2>

        {/* Subheading */}
        <motion.p variants={childVariants} className="text-[#94a3b8] text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-10">
          <span className="text-[#E6FFF8] font-semibold text-lg tracking-wide block mb-3">
            Full Stack Developer • Graphic Designer • ML & Python • App Development
          </span>
          <span className="block opacity-80">
            Passionate about building intelligent systems, interactive web experiences, and developer-focused tools.
          </span>
        </motion.p>

        {/* Social Links */}
        <motion.div variants={childVariants} className="flex flex-row items-center gap-5 mb-8 lg:mb-0">
          {/* GitHub Link */}
          <a 
            href="https://github.com/CfRadar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(0,255,179,0.2)]"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>

          {/* LinkedIn Link */}
          <a 
            href="https://www.linkedin.com/in/anurag-yadav-142774338/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-4 bg-[#0a66c2]/10 border border-[#0a66c2]/30 rounded-full hover:bg-[#0a66c2]/20 hover:border-[#0a66c2]/50 transition-all hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(10,102,194,0.1)] hover:shadow-[0_0_25px_rgba(10,102,194,0.4)]"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-[#0a66c2] group-hover:text-[#4298ed] transition-colors" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Right Column: Terminal */}
      <motion.div variants={childVariants} className="flex-1 w-full max-w-lg lg:max-w-none">
        <InteractiveTerminal />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
