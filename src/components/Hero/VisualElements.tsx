import React from 'react';
import { motion } from 'framer-motion';

const snippets = [
  { text: "const app = express();", top: "15%", left: "5%", delay: 0.2 },
  { text: "interface Props {}", top: "45%", left: "8%", delay: 1.5 },
  { text: "git rebase -i HEAD~3", top: "75%", left: "4%", delay: 0.8 },
  { text: "import { useState } from 'react';", top: "25%", right: "6%", delay: 1.1 },
  { text: "docker build -t app .", top: "60%", right: "5%", delay: 0.5 },
  { text: "app.listen(PORT, () => {});", top: "85%", right: "8%", delay: 2.0 },
];

const VisualElements: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Code Snippets */}
      {snippets.map((snip, idx) => (
        <motion.div
          key={idx}
          className="absolute font-mono text-[10px] md:text-xs text-[#334155] whitespace-nowrap hidden md:block"
          style={{ top: snip.top, left: snip.left, right: snip.right }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.5, 0.2, 0.8, 0], y: [-5, 5, -5] }}
          transition={{ 
            duration: 8 + Math.random() * 5, 
            repeat: Infinity, 
            delay: snip.delay,
            ease: "easeInOut"
          }}
        >
          {snip.text}
        </motion.div>
      ))}

      {/* Abstract Network Nodes */}
      <motion.div 
        className="absolute top-[20%] left-[10%] w-32 h-32 border border-[#1e293b] rounded-full hidden lg:block"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[30%] right-[15%] w-48 h-48 border border-[#1e293b] rounded-full hidden lg:block"
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      
      {/* Decorative Plus Signs */}
      <div className="absolute top-[10%] right-[20%] text-[#334155] text-xs font-mono">+</div>
      <div className="absolute bottom-[20%] left-[25%] text-[#334155] text-xs font-mono">+</div>
      <div className="absolute top-[50%] left-[5%] text-[#334155] text-xs font-mono">+</div>
      <div className="absolute top-[40%] right-[10%] text-[#334155] text-xs font-mono">+</div>

      {/* Ambient glowing orbs on the edges */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#00FFB3] rounded-full blur-[120px] opacity-[0.03]"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#7B61FF] rounded-full blur-[120px] opacity-[0.03]"></div>
    </div>
  );
};

export default VisualElements;
