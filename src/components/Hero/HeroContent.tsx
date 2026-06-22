import React from 'react';
import { motion } from 'framer-motion';
import InteractiveTerminal from './InteractiveTerminal';

const HeroContent: React.FC = () => {
  const headingText = "Hi, I am Anurag";
  const headingText2 = "Software Engineer";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
  };

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
        <motion.h1 variants={childVariants} className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4">
          {headingText}
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

        {/* Action Buttons */}
        <motion.div variants={childVariants} className="flex flex-col sm:flex-row items-center gap-5 mb-8 lg:mb-0">
          <button className="group relative px-8 py-3.5 bg-white text-[#050816] font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FFB3] to-[#00C8FF] opacity-0 group-hover:opacity-20 transition-opacity"></div>
            View Projects
          </button>
          <button className="px-8 py-3.5 border border-[#1e293b] text-gray-300 font-semibold rounded-lg bg-[#0b0e14]/50 hover:bg-[#1e293b]/50 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(123,97,255,0.0)] hover:shadow-[0_0_20px_rgba(123,97,255,0.2)] w-full sm:w-auto">
            Get In Touch
          </button>
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
