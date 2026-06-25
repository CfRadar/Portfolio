import { motion } from 'framer-motion';
import type { SkillNodeData } from './data';

interface IntelligencePanelProps {
  nodeId: string;
  allNodes: SkillNodeData[];
}

const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ nodeId, allNodes }) => {
  const node = allNodes.find(n => n.id === nodeId);
  
  if (!node) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute right-8 top-1/4 w-80 bg-[#050816]/80 backdrop-blur-md border border-[#1e293b] rounded-md p-6 shadow-2xl z-50 pointer-events-none"
    >
      {/* Decorative HUD Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFB3] to-transparent opacity-50" />
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#00FFB3]" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#00FFB3]" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#00FFB3]" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#00FFB3]" />

      <h4 className="text-gray-500 font-mono text-[10px] mb-2 uppercase tracking-widest">
        Intel / {node.category}
      </h4>
      <h2 className="text-2xl font-bold font-mono text-white mb-2 flex items-center gap-2">
        {node.icon && <span>{node.icon}</span>}
        {node.label}
      </h2>
      
      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
        {node.description}
      </p>

      <div className="space-y-4">
        <div>
          <h5 className="text-[#00C8FF] font-mono text-xs mb-1">EXPERIENCE</h5>
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 bg-[#1e293b] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: node.learningStatus === 'Expert' ? '90%' : node.learningStatus === 'Proficient' ? '70%' : '40%' }}
                className="h-full bg-gradient-to-r from-[#00C8FF] to-[#00FFB3]"
              />
            </div>
            <span className="text-xs font-mono text-white">{node.experience}</span>
          </div>
        </div>

        {node.technologies.length > 0 && (
          <div>
            <h5 className="text-[#00C8FF] font-mono text-xs mb-1.5">TECHNOLOGIES</h5>
            <div className="flex flex-wrap gap-1.5">
              {node.technologies.map(tech => (
                <span key={tech} className="px-2 py-0.5 bg-[#0a0f1e] border border-[#1e293b] rounded text-gray-300 text-[10px] font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {node.projects.length > 0 && (
          <div>
            <h5 className="text-[#00FFB3] font-mono text-xs mb-1.5">RELATED PROJECTS</h5>
            <ul className="space-y-1">
              {node.projects.map(project => (
                <li key={project} className="text-gray-300 text-xs flex items-center gap-2 font-mono">
                  <span className="text-[#00FFB3]/50 text-[10px]">▸</span>
                  {project}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default IntelligencePanel;
