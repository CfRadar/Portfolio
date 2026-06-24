import React, { useState } from 'react';
import { projectsData } from './data';
import type { ProjectData } from './data';
import NetworkMap from './NetworkMap';
import IntelligencePanel from './IntelligencePanel';

const ProjectNetwork: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData>(projectsData[0]);

  return (
    <section className="relative w-full h-screen bg-[#040712] border-y border-[#1e293b]/50 text-white font-sans overflow-hidden flex flex-col pt-16">
      {/* Header */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex-shrink-0 mb-4">
        <h2 className="text-2xl font-mono font-semibold tracking-widest text-white mb-1 flex items-center gap-3">
          <span className="text-[#00C8FF] text-lg">/</span> PROJECTS
        </h2>
        <p className="text-gray-400 text-xs max-w-sm font-mono">System topology and intelligence feeds.</p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-6 pb-6 h-full min-h-0">
        
        {/* Left Column: Network Map */}
        <div className="w-full lg:w-1/3 flex-shrink-0 flex items-start justify-center lg:justify-start h-full">
          <NetworkMap 
            projects={projectsData} 
            selectedProject={selectedProject} 
            onSelect={setSelectedProject} 
          />
        </div>

        {/* Right Column: Intelligence Panel */}
        <div className="w-full lg:w-2/3 h-full min-h-0 flex flex-col">
          <IntelligencePanel project={selectedProject} />
        </div>
      </div>

    </section>
  );
};

export default ProjectNetwork;
