import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData } from './data';
import ScreenshotCarousel from './ScreenshotCarousel';
import ArchitectureGraph from './ArchitectureGraph';

interface IntelligencePanelProps {
  project: ProjectData;
}

const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ project }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={project.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col bg-[#050816]/60 backdrop-blur-md border border-[#1e293b] rounded p-6 relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-[#1e293b] pb-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-gray-500 font-mono text-xs mb-1 uppercase">Intel / {project.id}</p>
              <h1 className="text-2xl font-bold tracking-wide text-white uppercase leading-tight">{project.name}</h1>
            </div>
            <div className="flex items-center gap-2 text-[#00C8FF] font-mono text-xs bg-[#00C8FF]/10 px-3 py-1.5 rounded border border-[#00C8FF]/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]"></span>
              {project.status}
            </div>
          </div>
          
          {/* Moved Description here so it's not in the scrollable window */}
          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Content Layout (Strictly scrolls) */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-col xl:flex-row gap-6">
            
            {/* Left Column: Carousel & Tech Stack */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              <ScreenshotCarousel images={project.screenshots} />

              {/* Tech Stack */}
              <div>
                <h4 className="text-gray-400 font-mono text-xs mb-2 tracking-wider">TECH STACK</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 bg-[#0a0f1e] border border-[#1e293b] rounded text-gray-300 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Features, Architecture, Links */}
            <div className="w-full xl:w-72 flex flex-col gap-6 shrink-0">
              
              <div>
                <h4 className="text-gray-400 font-mono text-xs mb-2 tracking-wider">KEY FEATURES</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-[#00C8FF] opacity-50 mt-0.5">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-400 font-mono text-xs mb-2 tracking-wider">CHALLENGES</h4>
                <ul className="space-y-1">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-gray-600 mt-0.5">!</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <ArchitectureGraph nodes={project.architecture} />

              <div>
                <h4 className="text-gray-400 font-mono text-xs mb-2 tracking-wider">EXTERNAL LINKS</h4>
                <div className="flex flex-col gap-2">
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-2 border border-[#1e293b] text-[#00C8FF] hover:border-[#00C8FF]/50 hover:bg-[#00C8FF]/5 transition-colors font-mono text-xs rounded">
                      LIVE DEMO
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-2 border border-[#1e293b] text-gray-300 hover:bg-[#1e293b]/50 transition-colors font-mono text-xs rounded">
                      GITHUB REPO
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntelligencePanel;
