import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const sequence = [
    "> Initializing Portfolio...",
    "> Loading Projects...",
    "> Loading Skills...",
    "> Loading Experience...",
    "> System Ready"
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < sequence.length) {
        setLines(prev => [...prev, sequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(onComplete, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="bg-[#0b0e14]/90 backdrop-blur-md border border-[#1e293b] p-8 rounded-lg w-full max-w-lg shadow-[0_0_50px_rgba(0,255,179,0.1)] font-mono text-[#00FFB3] text-sm md:text-base">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2"
          >
            {line}
          </motion.div>
        ))}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2.5 h-4 bg-[#00FFB3] ml-1 align-middle"
          />
        )}
      </div>
    </motion.div>
  );
};

export default BootSequence;
