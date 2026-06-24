import React from 'react';
import { motion } from 'framer-motion';
import type { TimelinePhase } from './data';

interface ProjectTimelineProps {
  phases: TimelinePhase[];
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ phases }) => {
  const currentIndex = phases.findIndex(p => p.status === 'current');
  const progressIndex = [...phases].reverse().findIndex(p => p.status === 'completed');
  const activeIndex = currentIndex !== -1 ? currentIndex : (progressIndex !== -1 ? phases.length - 1 - progressIndex : 0);

  const progressPercentage = phases.length > 1 ? (activeIndex / (phases.length - 1)) * 100 : 100;

  return (
    <div className="w-full pt-8 pb-4 relative">
      {/* Background Track */}
      <div className="absolute top-10 left-0 w-full h-[1px] bg-[#1e293b] z-0"></div>

      {/* Animated Progress Bar */}
      <div className="absolute top-10 left-0 h-[1px] bg-[#00C8FF] z-0">
        <motion.div 
          className="w-full h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
      </div>

      <div className="flex justify-between relative z-10">
        {phases.map((phase, idx) => {
          const isActive = idx <= activeIndex;
          const isCurrent = phase.status === 'current';

          return (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center group cursor-default"
            >
              {/* Node Point */}
              <div className={`w-2 h-2 rounded-full mb-3 flex items-center justify-center transition-colors duration-500 ${
                isActive ? 'bg-[#00C8FF]' : 'bg-[#1e293b]'
              }`}>
                {isCurrent && (
                  <div className="w-4 h-4 rounded-full border border-[#00C8FF] animate-ping absolute"></div>
                )}
              </div>

              {/* Text Info */}
              <div className="text-center">
                <h5 className={`font-mono text-[10px] uppercase tracking-widest mb-1 ${
                  isActive ? 'text-gray-200' : 'text-gray-600'
                }`}>
                  {phase.phaseName}
                </h5>
                <p className="text-gray-500 text-[10px] hidden md:block max-w-[120px] mx-auto">{phase.description}</p>
                <p className="text-gray-600 text-[9px] font-mono mt-1 hidden lg:block">{phase.date}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTimeline;
