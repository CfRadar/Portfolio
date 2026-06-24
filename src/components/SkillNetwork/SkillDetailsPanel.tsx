import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillNodeData } from './data';

interface SkillDetailsPanelProps {
  node: SkillNodeData;
}

const SkillDetailsPanel: React.FC<SkillDetailsPanelProps> = ({ node }) => {
  return (
    <div className="w-full h-full bg-[#050816]/60 backdrop-blur-md border border-[#1e293b] rounded flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="p-6 flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex-shrink-0 border-b border-[#1e293b] pb-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-gray-500 font-mono text-[10px] mb-1 uppercase">Node / {node.id}</p>
                <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white uppercase leading-tight">
                  {node.icon && <span className="mr-2">{node.icon}</span>}
                  {node.label}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-[#00FFB3] font-mono text-[10px] bg-[#00FFB3]/10 px-2 py-1 rounded border border-[#00FFB3]/20 shrink-0 mt-1 md:mt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB3]"></span>
                {node.learningStatus}
              </div>
            </div>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-wider">{node.category}</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-gray-500 font-mono text-[10px] mb-1.5 tracking-wider">DESCRIPTION</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {node.description}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h4 className="text-gray-500 font-mono text-[10px] mb-1.5 tracking-wider">EXPERIENCE</h4>
            <div className="text-[#00C8FF] font-mono text-xs">
              {node.experience}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {/* Technologies */}
            {node.technologies.length > 0 && (
              <div>
                <h4 className="text-gray-500 font-mono text-[10px] mb-2 tracking-wider">TECHNOLOGIES / CONCEPTS</h4>
                <div className="flex flex-wrap gap-2">
                  {node.technologies.map(tech => (
                    <span key={tech} className="px-2.5 py-1 bg-[#0a0f1e] border border-[#1e293b] rounded text-gray-300 text-[10px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Associated Projects */}
            {node.projects.length > 0 && (
              <div>
                <h4 className="text-gray-500 font-mono text-[10px] mb-2 tracking-wider">ASSOCIATED PROJECTS</h4>
                <ul className="space-y-1.5">
                  {node.projects.map((project, idx) => (
                    <li key={idx} className="text-gray-300 text-xs flex items-center gap-2">
                      <span className="text-[#00C8FF] opacity-50 text-[10px]">▸</span>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillDetailsPanel;
