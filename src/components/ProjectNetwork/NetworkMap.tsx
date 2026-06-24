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
    return <svg className="w-4 h-4 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>;
  }
  if (t.includes('tailwind')) {
    return <svg className="w-4 h-4 text-[#38B2AC]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-8.4 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C4.937 13.382 3.576 12 3.601 12z"/></svg>;
  }
  if (t.includes('node') || t.includes('express')) {
    return <svg className="w-4 h-4 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.874 1.696L1.874 7.424C1.31 7.747 1 8.286 1 8.85v11.451c0 .564.31 1.103.874 1.427l10 5.728c.563.322 1.246.322 1.81 0l10-5.728c.564-.324.874-.863.874-1.427V8.85c0-.564-.31-1.103-.874-1.427l-10-5.728c-.564-.322-1.247-.322-1.81 0zm.905 1.57l8.472 4.85-2.071 1.187-6.401-3.665-6.4 3.665-2.072-1.187 8.472-4.85zm-8.083 6.643l6.4 3.665v7.33L4.696 17.24V9.91zm15.408 0v7.33l-6.401 3.664v-7.33l6.401-3.665zm-7.704 4.545l3.861 2.212-3.861 2.212-3.861-2.212 3.861-2.212z"/></svg>;
  }
  if (t.includes('typescript') || t.includes('ts')) {
    return <svg className="w-4 h-4 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.58 16.551c-.628.784-1.854 1.488-3.568 1.488-2.613 0-4.475-1.503-4.475-4.407s1.954-4.526 4.606-4.526c1.786 0 2.87.546 3.49 1.258l-1.393 1.547c-.496-.484-1.164-.813-2.03-.813-1.328 0-2.217.923-2.217 2.454 0 1.583.91 2.454 2.26 2.454 1.11 0 1.62-.351 2.147-.887l1.18 1.432zm-6.07-7.23H5.852v9.336H3.342V9.321H.57V7.126h11.066v2.195z"/></svg>;
  }
  if (t.includes('youtube')) {
    return <svg className="w-4 h-4 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
  }
  if (t.includes('mongo') || t.includes('redis') || t.includes('db')) {
    return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5C16.4183 5 20 6.34315 20 8C20 9.65685 16.4183 11 12 11C7.58172 11 4 9.65685 4 8C4 6.34315 7.58172 5 12 5Z"/><path d="M4 8V16C4 17.6569 7.58172 19 12 19C16.4183 19 20 17.6569 20 16V8"/></svg>;
  }
  if (t.includes('python')) {
    return <svg className="w-4 h-4 text-blue-400" viewBox="0 0 118 118" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M58.337 4.148c-26.697 0-25.565 11.558-25.565 11.558l.044 11.905H59.23v3.359H25.074S3.612 29.351 3.612 59.208c0 29.856 19.303 28.531 19.303 28.531h8.77v-12.39s-.351-14.195 14.15-14.195h16.275s13.407-.176 13.407-13.623V27.426s1.233-23.278-17.18-23.278zM43.082 14.77a4.015 4.015 0 0 1 4.018 4.014 4.015 4.015 0 0 1-4.018 4.015 4.015 4.015 0 0 1-4.015-4.015A4.015 4.015 0 0 1 43.082 14.77z"/><path d="M59.972 114.275c26.696 0 25.564-11.559 25.564-11.559l-.044-11.904H59.079v-3.359h34.155s21.462 1.619 21.462-28.238c0-29.857-19.302-28.532-19.302-28.532h-8.77v12.39s.35 14.196-14.15 14.196H56.198s-13.406.176-13.406 13.623v20.105s-1.233 23.278 17.18 23.278zM75.228 99.5c2.217 0 4.014 1.796 4.014 4.014a4.015 4.015 0 0 1-4.014 4.014 4.015 4.015 0 0 1-4.014-4.014 4.015 4.015 0 0 1 4.014-4.014z" fill="#FFE873"/></svg>;
  }
  if (t.includes('docker')) {
    return <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.434h2.118a.186.186 0 00.186-.186V3.57a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m2.93 2.718h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.187.187 0 00.184-.186V9.006a.186.186 0 00-.185-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.185M23.961 9.952c-.015-.052-.084-.366-.465-.776-.432-.464-1.077-.732-1.921-.795-.27-.018-.544.02-.806.11-.274-.352-.614-.645-.992-.857a2.53 2.53 0 00-.671-.248v-.002c0-.13-.105-.235-.235-.235h-2.316a.236.236 0 00-.236.235v2.85h-15.54c-.13 0-.235.105-.235.235v.068C.258 12.012.018 13.91.493 15.602c.47 1.674 1.637 2.97 2.871 3.86 1.488 1.07 3.332 1.666 5.251 1.666h.17c3.959 0 7.411-2.261 8.718-5.748l1.496.488.196.064c1.378.45 2.846.544 4.296.262l-.004-.002c.87-.17 1.543-.59 2.05-1.12.507-.532.843-1.168.995-1.614.15-.436.143-.88.125-1.173a3.3 3.3 0 00-.03-.33zM9.598 15.6c-.61 0-1.106-.496-1.106-1.106 0-.61.496-1.106 1.106-1.106.61 0 1.106.496 1.106 1.106 0 .61-.496 1.106-1.106 1.106z"/></svg>;
  }
  if (t.includes('hugging')) {
    return <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
  }
  if (t.includes('gym')) {
    return <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16"/><path d="M4 8v8"/><path d="M20 8v8"/><path d="M8 10v4"/><path d="M16 10v4"/></svg>;
  }
  if (t.includes('webcontainer') || t.includes('sandbox')) {
    return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.01M10 8h.01M14 8h.01"/><path d="M2 12h20"/><path d="M12 12v8"/></svg>;
  }
  if (t.includes('canvas') || t.includes('html5')) {
    return <svg className="w-4 h-4 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.16l-.298-3.35H3.708l.298 3.35h14.584zM5.182 10.86l.266 2.983h8.318l-.295 3.314-3.471.938-3.471-.938-.198-2.221H3.342l.33 3.708 6.328 1.758 6.328-1.758.531-5.965H5.182zm11.378-3.34l.266-2.983H4.654l.266 2.983h11.64z"/></svg>;
  }
  // Generic Code Brackets
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18L22 12L16 6"/><path d="M8 6L2 12L8 18"/></svg>;
};

const NetworkMap: React.FC<NetworkMapProps> = ({ projects, selectedProject, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative w-full max-w-sm h-full" ref={containerRef}>
      <div className="flex flex-col gap-4 relative z-10 h-full">
        {projects.map((project) => {
          const isSelected = selectedProject.id === project.id;
          
          return (
            <div key={project.id} className="relative group flex-1 flex">
              {/* Node Button */}
              <button
                onClick={() => onSelect(project)}
                className={`w-full h-full text-left relative transition-all duration-200 border ${
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
