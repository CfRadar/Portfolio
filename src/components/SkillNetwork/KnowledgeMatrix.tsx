import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillNodes } from './data';
import MatrixNode from './MatrixNode';
import IntelligencePanel from './IntelligencePanel';

const DOMAINS = skillNodes.filter(n => n.parentId === 'root');
const RADIUS = 1000; // Scaled up to fit new massive viewBox comfortably
const STROKE_WIDTH = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SEGMENT_SIZE = CIRCUMFERENCE / DOMAINS.length;
const GAP = 12; // Gap in dash array

const KnowledgeMatrix: React.FC = () => {
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const segments = DOMAINS.map((domain, index) => {
    const offset = -(index * SEGMENT_SIZE);
    const centerAngle = (index + 0.5) * (2 * Math.PI / DOMAINS.length);
    const trunkX = Math.cos(centerAngle) * (RADIUS + STROKE_WIDTH / 2);
    const trunkY = Math.sin(centerAngle) * (RADIUS + STROKE_WIDTH / 2);

    return { ...domain, offset, centerAngle, trunkX, trunkY };
  });

  const activeSegment = segments.find(s => s.id === activeDomainId);

  return (
    <section 
      className="relative w-full h-screen bg-transparent text-white font-sans overflow-hidden flex items-center justify-center"
      onMouseLeave={() => setActiveDomainId(null)}
    >
      {/* Central SVG Viewport. Scales perfectly up to screen size, keeping nodes and text perfectly aligned. */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <svg 
          viewBox="-3000 -3000 6000 6000" 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Center Donut Graphic */}
          <g className="drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {segments.map((segment) => {
              const isActive = activeDomainId === segment.id;
              return (
                <motion.circle
                  key={segment.id}
                  cx={0}
                  cy={0}
                  r={RADIUS}
                  fill="none"
                  stroke={segment.color || '#00FFB3'}
                  strokeWidth={isActive ? STROKE_WIDTH + 8 : STROKE_WIDTH}
                  strokeDasharray={`${SEGMENT_SIZE - GAP} ${CIRCUMFERENCE}`}
                  strokeDashoffset={segment.offset}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveDomainId(segment.id)}
                  animate={{
                    strokeWidth: isActive ? STROKE_WIDTH + 8 : STROKE_WIDTH,
                    filter: isActive ? `drop-shadow(0 0 15px ${segment.color})` : 'drop-shadow(0 0 0px transparent)',
                    opacity: activeDomainId && !isActive ? 0.3 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </g>

          {/* Center Title Text */}
          <g className="pointer-events-none" textAnchor="middle" dominantBaseline="central">
            <text x="0" y="-30" fill="white" fontSize="120" fontWeight="bold" fontFamily="monospace" letterSpacing="12">
              SKILLS
            </text>
            <AnimatePresence mode="wait">
              {activeSegment && (
                <motion.text
                  key={activeSegment.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 90 }}
                  exit={{ opacity: 0, y: 60 }}
                  fill={activeSegment.color}
                  fontSize="60"
                  fontFamily="monospace"
                  letterSpacing="8"
                >
                  {activeSegment.label.toUpperCase()}
                </motion.text>
              )}
            </AnimatePresence>
          </g>

          {/* Dynamic Nodes Sub-Tree */}
          <AnimatePresence>
            {activeSegment && (
              <MatrixNode
                key={activeSegment.id}
                domainId={activeSegment.id}
                allNodes={skillNodes}
                setHoveredNodeId={setHoveredNodeId}
                trunkX={activeSegment.trunkX}
                trunkY={activeSegment.trunkY}
                centerAngle={activeSegment.centerAngle}
                color={activeSegment.color || '#00FFB3'}
              />
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Intelligence Panel Overlay */}
      <AnimatePresence>
        {hoveredNodeId && (
          <IntelligencePanel 
            nodeId={hoveredNodeId} 
            allNodes={skillNodes}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default KnowledgeMatrix;
