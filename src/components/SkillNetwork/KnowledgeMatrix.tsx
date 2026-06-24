import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillNodes } from './data';
import MatrixNode from './MatrixNode';
import IntelligencePanel from './IntelligencePanel';

const DOMAINS = skillNodes.filter(n => n.parentId === 'root');
const RADIUS = 1000; // Scaled up to fit new massive viewBox comfortably
const STROKE_WIDTH = 200; // Massively thickened for much easier hovering
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
          viewBox="-4500 -3000 9000 6000" 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* --- AMBIENT HUD ELEMENTS --- */}
          {/* Faint Background Grid */}
          <defs>
            <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#1e293b" opacity="0.6" />
            </pattern>
          </defs>
          <rect x="-4500" y="-3000" width="9000" height="6000" fill="url(#grid)" />

          {/* Outer Rotating HUD Rings */}
          <motion.circle 
            cx={0} cy={0} r={RADIUS + 250} 
            fill="none" stroke="#1e293b" strokeWidth="10" 
            strokeDasharray="60 120"
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx={0} cy={0} r={RADIUS + 350} 
            fill="none" stroke="#00FFB3" strokeWidth="4" strokeOpacity="0.2"
            strokeDasharray="200 400 100 200"
            animate={{ rotate: -360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Rotating HUD Ring */}
          <motion.circle 
            cx={0} cy={0} r={RADIUS - 150} 
            fill="none" stroke="#1e293b" strokeWidth="10" 
            strokeDasharray="30 60"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />

          {/* Ambient Hex Data Blocks */}
          <g className="pointer-events-none" fill="#1e293b" fontSize="60" fontFamily="monospace" opacity="0.8">
            <text x="-4000" y="-2500">SYS_MEM: 0x8F4C</text>
            <text x="-4000" y="-2400">NET_LNK: ESTABLISHED</text>
            <text x="2800" y="-2500">TRK_ID: 99482.11</text>
            <text x="2800" y="-2400">SYNC_RT: 99.9%</text>
            <text x="-4000" y="2500">SIG_STR: STRONG</text>
            <text x="-4000" y="2600">ENC_KEY: VALID</text>
            <text x="2800" y="2500">OP_MODE: OVERRIDE</text>
          </g>
          {/* ------------------------------ */}

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
                  strokeWidth={isActive ? STROKE_WIDTH + 40 : STROKE_WIDTH}
                  strokeDasharray={`${SEGMENT_SIZE - GAP} ${CIRCUMFERENCE}`}
                  strokeDashoffset={segment.offset}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveDomainId(segment.id)}
                  animate={{
                    strokeWidth: isActive ? STROKE_WIDTH + 40 : STROKE_WIDTH,
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
            <text x="0" y="-40" fill="white" fontSize="160" fontWeight="bold" fontFamily="monospace" letterSpacing="12">
              SKILLS
            </text>
            <AnimatePresence mode="wait">
              {activeSegment && (
                <motion.text
                  key={activeSegment.id}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 120 }}
                  exit={{ opacity: 0, y: 80 }}
                  fill={activeSegment.color}
                  fontSize="80"
                  fontFamily="monospace"
                  letterSpacing="8"
                >
                  {activeSegment.label.toUpperCase()}
                </motion.text>
              )}
            </AnimatePresence>
          </g>

          {/* Render ALL branches permanently to fill the void, but dim inactive ones */}
          {DOMAINS.map((domain, index) => {
            const angle = index * (2 * Math.PI / DOMAINS.length) + (Math.PI / DOMAINS.length);
            const trunkX = Math.cos(angle) * (RADIUS + STROKE_WIDTH / 2);
            const trunkY = Math.sin(angle) * (RADIUS + STROKE_WIDTH / 2);
            const isActive = activeDomainId === domain.id;

            return (
              <MatrixNode
                key={domain.id}
                domainId={domain.id}
                allNodes={skillNodes}
                setHoveredNodeId={setHoveredNodeId}
                trunkX={trunkX}
                trunkY={trunkY}
                centerAngle={angle}
                color={domain.color || '#00FFB3'}
                isActive={isActive}
              />
            );
          })}
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
