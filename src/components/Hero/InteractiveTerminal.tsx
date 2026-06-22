import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
  {
    cmd: "npm run dev",
    lines: [
      { text: "> portfolio@1.0.0 dev", color: "#94a3b8", delay: 0.1 },
      { text: "> vite", color: "#94a3b8", delay: 0.2 },
      { text: "  VITE v5.2.0  ready in 432 ms", color: "#10b981", delay: 0.8 },
      { text: "  ➜  Local:   http://localhost:5173/", color: "#00C8FF", delay: 0.9 },
      { text: "  ➜  Network: use --host to expose", color: "#00C8FF", delay: 1.0 },
    ]
  },
  {
    cmd: "python coordinator.py",
    lines: [
      { text: "INFO:     Loading portfolio context...", color: "#94a3b8", delay: 0.2 },
      { text: "INFO:     Connecting to AI Engine...", color: "#94a3b8", delay: 0.8 },
      { text: "INFO:     Agent network initialized.", color: "#10b981", delay: 1.5 },
      { text: "INFO:     Uvicorn running on http://0.0.0.0:8000", color: "#7B61FF", delay: 1.7 },
    ]
  },
  {
    cmd: "git push origin main",
    lines: [
      { text: "Enumerating objects: 15, done.", color: "#94a3b8", delay: 0.1 },
      { text: "Counting objects: 100% (15/15), done.", color: "#94a3b8", delay: 0.4 },
      { text: "Delta compression using up to 10 threads", color: "#94a3b8", delay: 0.5 },
      { text: "Compressing objects: 100% (8/8), done.", color: "#94a3b8", delay: 1.0 },
      { text: "Writing objects: 100% (8/8), 2.14 KiB | 2.14 MiB/s, done.", color: "#94a3b8", delay: 1.2 },
      { text: "To https://github.com/anurag/portfolio.git", color: "#94a3b8", delay: 1.5 },
      { text: "   d3b0738..a1b2c3d  main -> main", color: "#10b981", delay: 1.6 },
    ]
  }
];

const InteractiveTerminal: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTypingCmd, setIsTypingCmd] = useState(true);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    
    // Reset state for new command
    setIsTypingCmd(true);
    setVisibleLines(0);

    const currentCmd = commands[currentIndex];

    // Finish typing command after 1.2s
    const cmdTimeout = setTimeout(() => {
      setIsTypingCmd(false);
      
      // Schedule each output line
      currentCmd.lines.forEach((line, idx) => {
        const t = setTimeout(() => {
          setVisibleLines(idx + 1);
        }, line.delay * 1000);
        timeouts.push(t);
      });

      // Schedule next cycle after the last line + 3 seconds
      const maxDelay = Math.max(...currentCmd.lines.map(l => l.delay));
      const nextCycleTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % commands.length);
      }, (maxDelay * 1000) + 3000);
      timeouts.push(nextCycleTimeout);

    }, 1200);
    
    timeouts.push(cmdTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [currentIndex]);

  const currentCmd = commands[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="w-full bg-[#0b0e14]/90 backdrop-blur-xl border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl relative flex flex-col h-[350px] md:h-[400px]"
    >
      {/* Terminal Header */}
      <div className="bg-[#121826]/90 px-4 py-3 flex items-center gap-2 border-b border-[#1e293b] shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
        </div>
        <div className="flex-1 text-center font-mono text-[11px] text-gray-500 font-medium tracking-wider">
          anurag@dev-os:~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm md:text-base flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* The Command */}
            <div className="text-gray-300 flex items-center mb-3">
              <span className="text-[#00FFB3] mr-2">λ</span>
              <motion.span
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.8, ease: "linear" }}
              >
                {currentCmd.cmd}
              </motion.span>
              {isTypingCmd && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-5 bg-gray-400 ml-1 translate-y-[2px]"
                />
              )}
            </div>

            {/* The Output Lines */}
            {!isTypingCmd && currentCmd.lines.slice(0, visibleLines).map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-1"
                style={{ color: line.color }}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Final Waiting Cursor */}
            {!isTypingCmd && visibleLines === currentCmd.lines.length && (
              <div className="mt-4 flex items-center">
                <span className="text-[#00FFB3] mr-2">λ</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-5 bg-gray-400 translate-y-[2px]"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
