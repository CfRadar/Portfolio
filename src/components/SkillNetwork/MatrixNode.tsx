import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { SkillNodeData } from './data';

interface MatrixNodeProps {
  domainId: string;
  allNodes: SkillNodeData[];
  setHoveredNodeId: (id: string | null) => void;
  trunkX: number;
  trunkY: number;
  centerAngle: number;
  color: string;
  isActive: boolean;
}

interface PlacedNode {
  node: SkillNodeData;
  x: number;
  y: number;
  level: number;
  parentId: string | null;
  delay: number;
}

const MatrixNode: React.FC<MatrixNodeProps> = ({ 
  domainId, allNodes, setHoveredNodeId, trunkX, trunkY, centerAngle, color, isActive
}) => {
  
  const { placedNodes, connections } = useMemo(() => {
    const nodes: PlacedNode[] = [];
    const conns: { id: string, startX: number, startY: number, endX: number, endY: number, delay: number }[] = [];

    const placeChildren = (
      parentId: string, 
      level: number, 
      parentX: number, 
      parentY: number, 
      baseAngle: number, 
      availableSpread: number
    ) => {
      const children = allNodes.filter(n => n.parentId === parentId);
      if (children.length === 0) return;

      // Dynamic Spread Calculation to PREVENT MERGING
      // We guarantee every sibling has at least Math.PI / 5 (36 degrees) of separation
      const minSeparation = Math.PI / 5;
      const requiredSpread = (children.length - 1) * minSeparation;
      
      // Use the larger of availableSpread or requiredSpread, capped at 270 degrees to prevent backward wrapping
      const spreadAngle = Math.min(Math.PI * 1.5, Math.max(availableSpread, requiredSpread));

      const angleStep = children.length === 1 ? 0 : spreadAngle / (children.length - 1);
      const startAngle = baseAngle - spreadAngle / 2;
      const baseRadiusDist = 800; 

      children.forEach((child, index) => {
        // Deterministic pseudo-random tilt between -15 and +15 degrees for organic feel
        const seed = child.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomTilt = ((seed % 100) / 100 - 0.5) * (Math.PI / 6);

        const baseAngleForChild = children.length === 1 ? baseAngle : startAngle + angleStep * index;
        let finalAngle = baseAngleForChild + randomTilt;

        // Elliptical Expansion: Branches shooting left/right get up to 60% MORE distance 
        // than branches shooting up/down. This naturally fills the 16:9 widescreen layout!
        const ellipticalMultiplier = 1 + 0.6 * Math.abs(Math.cos(finalAngle));
        const radiusDist = baseRadiusDist * ellipticalMultiplier;

        let x = parentX + Math.cos(finalAngle) * radiusDist;
        let y = parentY + Math.sin(finalAngle) * radiusDist;

        // --- INTELLIGENT BOUNDARY COLLISION STEERING ---
        // SVG ViewBox is [-4500, -3000] to [4500, 3000]. 
        // We enforce a widescreen safe zone of [-4000, 4000] horizontal and [-2600, 2600] vertical.
        let attempt = 0;
        while ((Math.abs(x) > 4000 || Math.abs(y) > 2600) && attempt < 25) {
          // Find the angle pointing straight back to the absolute center (0,0) from the parent
          const angleToOrigin = Math.atan2(-parentY, -parentX);
          
          // Calculate the shortest angular distance to the center
          let diff = angleToOrigin - finalAngle;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          
          // Steer the trajectory 10 degrees closer to the center
          finalAngle += Math.sign(diff) * (Math.PI / 18);
          
          // Recalculate coordinates
          x = parentX + Math.cos(finalAngle) * radiusDist;
          y = parentY + Math.sin(finalAngle) * radiusDist;
          attempt++;
        }
        // -------------------------------------------------

        const delay = level * 0.15; 

        nodes.push({ node: child, x, y, level, parentId, delay });
        
        conns.push({
          id: `${parentId}-${child.id}`,
          startX: parentX,
          startY: parentY,
          endX: x,
          endY: y,
          delay: delay - 0.1
        });

        // Pass down a slightly narrowed available spread for the next level
        const newSpread = spreadAngle * 0.8; 
        placeChildren(child.id, level + 1, x, y, finalAngle, newSpread);
      });
    };

    // Initial spread for Level 1 is 90 degrees
    placeChildren(domainId, 1, trunkX, trunkY, centerAngle, Math.PI / 2);

    return { placedNodes: nodes, connections: conns };
  }, [domainId, allNodes, trunkX, trunkY, centerAngle]);

  return (
    <>
      {/* SVG Connection Lines */}
      {connections.map(conn => (
        <motion.line
          key={conn.id}
          x1={conn.startX}
          y1={conn.startY}
          x2={conn.endX}
          y2={conn.endY}
          stroke={color}
          strokeWidth={isActive ? "12" : "3"}
          strokeOpacity={isActive ? 0.4 : 0.05}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: conn.delay, duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none"
        />
      ))}

      {/* SVG Nodes */}
      {placedNodes.map(p => (
        <motion.g
          key={p.node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isActive ? 1 : 0.6, opacity: isActive ? 1 : 0.15 }}
          transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
          onMouseEnter={() => setHoveredNodeId(p.node.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
          className={`cursor-pointer ${!isActive && 'pointer-events-none'}`}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          whileHover={isActive ? { scale: 1.15, filter: `drop-shadow(0 0 15px ${color})` } : {}}
        >
          {/* Node Circle (Massively increased size) */}
          <circle 
            cx={p.x} cy={p.y} 
            r={140} 
            fill="#03050c" 
            stroke={color} 
            strokeWidth={isActive ? "15" : "5"}
          />
          
          {/* Inner Node Graphic */}
          {p.node.icon && isActive ? (
            <text 
              x={p.x} y={p.y} 
              textAnchor="middle" 
              dominantBaseline="central" 
              fill="white" 
              fontSize="180"
            >
              {p.node.icon}
            </text>
          ) : (
            <circle cx={p.x} cy={p.y} r={25} fill={color} opacity={isActive ? 1 : 0.2} />
          )}

          {/* External Label positioned below the node */}
          {isActive && (
            <text 
              x={p.x} 
              y={p.y + 280} 
            textAnchor="middle" 
            fill="white" 
            fontSize="100" 
            fontWeight="bold" 
            fontFamily="monospace"
            letterSpacing="2"
              className="pointer-events-none drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]"
            >
              {p.node.label.toUpperCase()}
            </text>
          )}
        </motion.g>
      ))}
    </>
  );
};

export default MatrixNode;
