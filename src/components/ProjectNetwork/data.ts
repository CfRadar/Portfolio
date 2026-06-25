import N1 from '../../assets/N1.png';
import N2 from '../../assets/N2.png';
import T1 from '../../assets/T1.png';
import T2 from '../../assets/T2.png';
import Y1 from '../../assets/Y1.jpg';
import Y2 from '../../assets/Y2.jpg';
import S1 from '../../assets/S1.png';
import S2 from '../../assets/S2.png';
import S3 from '../../assets/S3.png';

export interface TimelinePhase {
  id: string;
  phaseName: string;
  date: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'api' | 'server' | 'database' | 'ai';
}

export interface ProjectData {
  id: string;
  nodeId: string;
  name: string;
  icon: string;
  status: string;
  impact: 'High' | 'Medium' | 'Very High' | 'Critical';
  description: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  architecture: ArchitectureNode[];
  timeline: TimelinePhase[];
  links: {
    live?: string;
    github?: string;
  };
  screenshots: string[];
}

export const projectsData: ProjectData[] = [
  {
    id: 'nebula-os',
    nodeId: '//os_01',
    name: 'Nebula OS',
    icon: '🌐',
    status: 'ACTIVE_SYSTEM',
    impact: 'Critical',
    description: 'Browser based OS sandbox, giving the ability to make multiple file imports for code. It features a fully functional terminal, basic file structure management, and an integrated code compiler with customizable settings.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WebContainers'],
    features: [
      'Full browser-based OS sandbox environment',
      'Multi-file import support for complex codebases',
      'Integrated command-line terminal',
      'Virtual file system management',
      'In-browser code compilation and execution'
    ],
    challenges: [
      'Maintaining terminal state and process isolation',
      'Handling secure cross-origin file imports',
      'Optimizing performance for in-browser compilation'
    ],
    architecture: [
      { id: 'ui', label: 'Nebula Desktop (React/TS)', type: 'client' },
      { id: 'fs', label: 'Virtual File System', type: 'client' },
      { id: 'term', label: 'Terminal Emulator (xterm.js)', type: 'client' },
      { id: 'compiler', label: 'Execution Sandbox (Node.js)', type: 'server' }
    ],
    timeline: [
      { id: 't1', phaseName: 'INCEPTION', date: '01 Nov 2023', description: 'Defined OS architecture', status: 'completed' },
      { id: 't2', phaseName: 'CORE FS', date: '15 Dec 2023', description: 'Built virtual file system', status: 'completed' },
      { id: 't3', phaseName: 'TERMINAL', date: '10 Jan 2024', description: 'Integrated xterm.js', status: 'completed' },
      { id: 't4', phaseName: 'COMPILER', date: '05 Feb 2024', description: 'Added code execution', status: 'completed' },
      { id: 't5', phaseName: 'BETA', date: 'Current', description: 'Polishing sandbox UI', status: 'current' }
    ],
    links: { github: 'https://github.com/Aarya48/NebulaOS' },
    screenshots: [N1, N2]
  },
  {
    id: "traffic-rl",
    nodeId: "//ml_02",
    name: "Traffic Light RL Environment",
    icon: "🚦",
    status: "TRAINED_MODEL",
    impact: "High",
    description: "An ML Python script for an AI agent to judge which signal to open according to traffic density, maintaining fairness amongst lanes and optimizing vehicle throughput.",
    techStack: ["Python", "OpenAI Gym", "Hugging Face", "Docker"],
    features: [
      "Custom Reinforcement Learning environment",
      "Dynamic state space evaluation of traffic density",
      "Fairness-focused reward function",
      "Containerized deployment architecture"
    ],
    challenges: [
      "Designing a reward function that balances wait times",
      "Simulating realistic continuous traffic flow",
      "Optimizing the state observation arrays"
    ],
    architecture: [],
    timeline: [],
    links: { github: "https://github.com/CfRadar/TrafficLightRLEnvironment" },
    screenshots: [
      T1,
      T2
    ]
  },
  {
    id: "y-melodies",
    nodeId: "//node_03",
    name: "Y-Melodies",
    icon: "🎧",
    status: "DEPLOYED",
    impact: "High",
    description: "An ad-free music streaming platform utilizing the YouTube API for vast music access, replicating premium features found in top-tier apps like Spotify.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "YouTube API"],
    features: [
      "Extensive ad-free music library",
      "Real-time Queue Synchronization",
      "Custom Playlists and Favorites",
      "Seamless playback using YouTube Data"
    ],
    challenges: [
      "Handling YouTube API rate limits efficiently",
      "Maintaining smooth background playback",
      "Optimizing search queries and latency"
    ],
    architecture: [],
    timeline: [],
    links: { github: "https://github.com/CfRadar/Y-Melody" },
    screenshots: [
      Y1,
      Y2
    ]
  },
  {
    id: "soul-duel",
    nodeId: "//node_04",
    name: "Soul Duel",
    icon: "🎮",
    status: "ACTIVE",
    impact: "High",
    description: "A competitive 2-player bullet-hell game inspired by Undertale. Features a robust progression system, powerups, 3 distinct boss fights, 2 playstyles, and a comprehensive rank/rating system. Also includes a fully playable single-player mode.",
    techStack: ["React", "Node.js", "HTML5 Canvas"],
    features: [
      "Competitive 2-player & Single-player modes",
      "3 unique boss encounters with distinct attack patterns",
      "Rankings, ratings, and progression system",
      "Dynamic powerup mechanics and 2 playstyles"
    ],
    challenges: [
      "Optimizing HTML5 Canvas rendering for smooth bullet-hell performance",
      "Synchronizing high-speed gameplay between two players",
      "Balancing boss patterns for fairness in competitive mode"
    ],
    architecture: [],
    timeline: [],
    links: { github: "https://github.com/CfRadar/soul-frontend" },
    screenshots: [
      S1,
      S2,
      S3
    ]
  }
];
