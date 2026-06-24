import React from 'react';
import { motion } from 'framer-motion';
import type { ArchitectureNode } from './data';

interface ArchitectureGraphProps {
  nodes: ArchitectureNode[];
}

const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({ nodes }) => {
  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      <h4 className="text-gray-400 font-mono text-xs mb-2 tracking-wider">ARCHITECTURE FLOW</h4>
      
      <div className="flex flex-col items-center w-full py-6 bg-[#0a0f1e]/50 border border-[#1e293b] rounded relative overflow-hidden">
        {/* Subtle background connecting line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#1e293b] z-0"></div>

        {nodes.map((node, idx) => (
          <React.Fragment key={node.id}>
            {/* The Node */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative z-10 px-4 py-2 bg-[#03050c] border rounded font-mono text-xs tracking-wide shadow-sm ${
                node.type === 'client' ? 'border-[#00C8FF]/50 text-white' :
                node.type === 'ai' ? 'border-[#00FFB3]/50 text-white' :
                'border-[#1e293b] text-gray-300'
              }`}
            >
              {node.label}
            </motion.div>

            {/* Connecting Gap (visual only, since line is in background) */}
            {idx < nodes.length - 1 && (
              <div className="relative z-10 w-4 h-6 flex items-center justify-center">
                 <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                  <path d="M6 0L6 24M6 24L3 20M6 24L9 20" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureGraph;
