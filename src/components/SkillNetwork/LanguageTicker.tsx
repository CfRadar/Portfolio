import React from 'react';
import { motion } from 'framer-motion';

const languages = [
  "JAVASCRIPT", "TYPESCRIPT", "HTML5", "CSS3", "TAILWIND CSS", 
  "REACT", "NODE.JS", "EXPRESS.JS", "DART", "FLUTTER", "REACT NATIVE",
  "JAVA", "C#", "C++", "PYTHON", "UNITY", "UNREAL ENGINE 5", "FIGMA"
];

const LanguageTicker: React.FC = () => {
  // Duplicate the array to create a seamless infinite scroll
  // We duplicate it multiple times to ensure it fills widescreen monitors
  const marqueeItems = [...languages, ...languages, ...languages];

  return (
    <div className="w-full bg-[#040712] border-t border-[#1e293b]/50 py-3 overflow-hidden relative select-none">
      {/* Gradient Fades for edges to make it look like it's emerging from the void */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#040712] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#040712] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {marqueeItems.map((lang, index) => (
          <div key={index} className="flex items-center">
            <span className="text-gray-500 font-mono tracking-[0.2em] text-sm opacity-80 hover:text-[#00C8FF] hover:opacity-100 transition-colors duration-300 px-8">
              {lang}
            </span>
            <span className="text-[#00FFB3]/20 text-xs">/</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LanguageTicker;
