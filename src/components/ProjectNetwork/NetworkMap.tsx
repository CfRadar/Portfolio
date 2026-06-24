import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import type { ProjectData } from './data';

interface NetworkMapProps {
  projects: ProjectData[];
  selectedProject: ProjectData;
  onSelect: (project: ProjectData) => void;
}

// Helper to render a small icon based on tech string
const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react') || t.includes('next')) {
    return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" /></svg>;
  }
  if (t.includes('mongo') || t.includes('redis') || t.includes('db')) {
    return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5C16.4183 5 20 6.34315 20 8C20 9.65685 16.4183 11 12 11C7.58172 11 4 9.65685 4 8C4 6.34315 7.58172 5 12 5Z"/><path d="M4 8V16C4 17.6569 7.58172 19 12 19C16.4183 19 20 17.6569 20 16V8"/></svg>;
  }
  if (t.includes('node') || t.includes('express') || t.includes('fastapi')) {
    return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21H16"/><path d="M12 17V21"/></svg>;
  }
  if (t.includes('api')) {
    return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
  }
  // Generic Code Brackets
  return <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18L22 12L16 6"/><path d="M8 6L2 12L8 18"/></svg>;
};

const NetworkMap: React.FC<NetworkMapProps> = ({ projects, selectedProject, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative w-full max-w-sm" ref={containerRef}>
      <div className="flex flex-col gap-4 relative z-10">
        {projects.map((project) => {
          const isSelected = selectedProject.id === project.id;
          
          return (
            <div key={project.id} className="relative group">
              {/* Node Button */}
              <button
                onClick={() => onSelect(project)}
                className={`w-full text-left relative transition-all duration-200 border ${
                  isSelected 
                    ? 'border-[#00C8FF] bg-[#00C8FF]/5' 
                    : 'border-[#1e293b] hover:border-[#1e293b]/80 bg-transparent'
                } rounded p-4 flex items-center gap-4`}
              >
                {/* Node Label (e.g. //node_01) */}
                <div className={`absolute -top-2 left-4 px-2 text-[10px] font-mono tracking-widest bg-[#03050c] ${
                  isSelected ? 'text-[#00C8FF]' : 'text-gray-600'
                }`}>
                  {project.nodeId}
                </div>

                {/* GitHub Logo Icon replacing emoji */}
                {project.links.github ? (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="View Repository"
                    className={`w-10 h-10 rounded flex items-center justify-center transition-colors hover:bg-[#1e293b] ${
                      isSelected ? 'text-[#00C8FF]' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                ) : (
                  <div className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
                    isSelected ? 'text-[#00C8FF]' : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </div>
                )}

                {/* Info */}
                <div className="flex-1">
                  <h3 className={`font-mono text-sm font-semibold tracking-wider uppercase transition-colors ${
                    isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                  }`}>
                    {project.name}
                  </h3>
                  
                  {/* Tech Stack Icons replacing Impact */}
                  <div className="flex items-center gap-2 mt-2">
                    {project.techStack.slice(0, 5).map((tech, i) => (
                      <div 
                        key={i} 
                        title={tech}
                        className={`p-1 rounded-sm border transition-colors ${
                          isSelected ? 'border-[#00C8FF]/30 text-[#00C8FF]' : 'border-[#1e293b] text-gray-500'
                        }`}
                      >
                        {getTechIcon(tech)}
                      </div>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="text-[10px] text-gray-600 font-mono">+{project.techStack.length - 5}</span>
                    )}
                  </div>
                </div>

                {/* Removed the redundant right-side GitHub link since the main icon is now GitHub */}

                {/* Active Indicator */}
                {isSelected && (
                  <motion.div 
                    layoutId="activeIndicatorMap"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00C8FF]" 
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkMap;
