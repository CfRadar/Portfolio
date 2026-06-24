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
  impact: 'High' | 'Medium' | 'Very High';
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
    id: "food-redistribution",
    nodeId: "//node_01",
    name: "FOOD REDISTRIBUTION AI",
    icon: "🍔",
    status: "DEPLOYED",
    impact: "High",
    description: "A community platform connecting local restaurants with food banks to reduce waste, powered by real-time logistics and predictive routing.",
    techStack: ["Next.js", "MongoDB", "Express", "Google Maps API", "Redis"],
    features: [
      "Real-time Inventory Sync",
      "Volunteer Matching Engine",
      "Route Optimization Algorithm",
      "Predictive Waste Analytics"
    ],
    challenges: [
      "Handling real-time geolocation of drivers",
      "Scaling the websocket connections for live updates",
      "Optimizing complex geospatial database queries"
    ],
    architecture: [
      { id: 'app', label: 'Next.js Frontend', type: 'client' },
      { id: 'gateway', label: 'API Gateway', type: 'api' },
      { id: 'engine', label: 'Matching Engine', type: 'server' },
      { id: 'db', label: 'Geo MongoDB', type: 'database' }
    ],
    timeline: [
      { id: 't1', phaseName: 'INCEPTION', date: '12 May 2024', description: 'Idea & Research', status: 'completed' },
      { id: 't2', phaseName: 'PLANNING', date: '18 May 2024', description: 'Tech Stack & Design', status: 'completed' },
      { id: 't3', phaseName: 'DEVELOPMENT', date: '25 May 2024', description: 'Building Core Features', status: 'completed' },
      { id: 't4', phaseName: 'TESTING', date: '02 Jun 2024', description: 'Testing & Optimization', status: 'completed' },
      { id: 't5', phaseName: 'DEPLOYED', date: '08 Jun 2024', description: 'Live & Iterating', status: 'completed' }
    ],
    links: { live: "https://example.com", github: "https://github.com/CfRadar" },
    screenshots: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "ai-agent-builder",
    nodeId: "//node_02",
    name: "AI AGENT BUILDER",
    icon: "🤖",
    status: "BETA",
    impact: "Very High",
    description: "A node-based orchestration tool for designing, testing, and deploying specialized multi-agent LLM systems with shared memory.",
    techStack: ["React Flow", "Python", "FastAPI", "OpenAI API", "LangChain"],
    features: [
      "Visual Node Editor",
      "Real-time Agent Memory Inspector",
      "Custom Tool Creation",
      "Streaming Response Viewer"
    ],
    challenges: [
      "Managing infinite loops in agent reasoning",
      "Syncing complex node states with the backend engine",
      "Handling rate limits gracefully"
    ],
    architecture: [
      { id: 'ui', label: 'React Flow Canvas', type: 'client' },
      { id: 'ws', label: 'WebSocket Server', type: 'api' },
      { id: 'orchestrator', label: 'Agent Orchestrator', type: 'ai' },
      { id: 'vector', label: 'Vector DB', type: 'database' }
    ],
    timeline: [
      { id: 't1', phaseName: 'INCEPTION', date: '01 Jul 2024', description: 'Agent Theory', status: 'completed' },
      { id: 't2', phaseName: 'PROTOTYPE', date: '15 Jul 2024', description: 'CLI Version', status: 'completed' },
      { id: 't3', phaseName: 'UI DESIGN', date: '01 Aug 2024', description: 'Canvas Setup', status: 'completed' },
      { id: 't4', phaseName: 'INTEGRATION', date: '10 Aug 2024', description: 'Connecting LLMs', status: 'completed' },
      { id: 't5', phaseName: 'BETA RELEASE', date: 'Current', description: 'User Testing', status: 'current' }
    ],
    links: { github: "https://github.com/CfRadar" },
    screenshots: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "music-streaming",
    nodeId: "//node_03",
    name: "MUSIC STREAMING PLATFORM",
    icon: "🎧",
    status: "DEPLOYED",
    impact: "Medium",
    description: "A full-stack music streaming platform with YouTube API integration, real-time queue management, and personalized recommendations.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Node.js", "MongoDB", "YouTube API"],
    features: [
      "YouTube API Integration",
      "Real-time Queue Synchronization",
      "Personalized Recommendations",
      "User Authentication (JWT)"
    ],
    challenges: [
      "Handling YouTube API rate limits",
      "Real-time queue synchronization",
      "Recommendation system accuracy",
      "Optimizing performance for smooth streaming"
    ],
    architecture: [
      { id: 'ui', label: 'React Client', type: 'client' },
      { id: 'api', label: 'Express API', type: 'api' },
      { id: 'yt', label: 'YouTube Service', type: 'server' },
      { id: 'db', label: 'User Data DB', type: 'database' }
    ],
    timeline: [
      { id: 't1', phaseName: 'INCEPTION', date: '12 May 2024', description: 'Idea & Research', status: 'completed' },
      { id: 't2', phaseName: 'PLANNING', date: '18 May 2024', description: 'Tech Stack & Design', status: 'completed' },
      { id: 't3', phaseName: 'DEVELOPMENT', date: '25 May 2024', description: 'Building Core Features', status: 'completed' },
      { id: 't4', phaseName: 'TESTING', date: '02 Jun 2024', description: 'Testing & Optimization', status: 'completed' },
      { id: 't5', phaseName: 'DEPLOYED', date: '08 Jun 2024', description: 'Live & Iterating', status: 'completed' }
    ],
    links: { live: "https://example.com", github: "https://github.com/CfRadar" },
    screenshots: [
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "hostel-delivery",
    nodeId: "//node_04",
    name: "HOSTEL DELIVERY SYSTEM",
    icon: "📦",
    status: "MAINTENANCE",
    impact: "Medium",
    description: "An internal campus app for ordering late-night snacks directly to dorm rooms, featuring driver tracking and split payments.",
    techStack: ["React Native", "Firebase", "Stripe", "Node.js"],
    features: [
      "Live Order Tracking",
      "Dorm-specific Routing",
      "Split Payments",
      "Vendor Dashboard"
    ],
    challenges: [
      "Handling highly concurrent order spikes at midnight",
      "Ensuring accurate dorm-room mapping where standard GPS fails"
    ],
    architecture: [
      { id: 'app', label: 'Mobile App', type: 'client' },
      { id: 'auth', label: 'Firebase Auth', type: 'api' },
      { id: 'db', label: 'Realtime DB', type: 'database' },
      { id: 'pay', label: 'Stripe Webhooks', type: 'server' }
    ],
    timeline: [
      { id: 't1', phaseName: 'INCEPTION', date: '10 Jan 2024', description: 'Problem Scope', status: 'completed' },
      { id: 't2', phaseName: 'DESIGN', date: '20 Jan 2024', description: 'Figma Mockups', status: 'completed' },
      { id: 't3', phaseName: 'DEV', date: '15 Feb 2024', description: 'React Native Build', status: 'completed' },
      { id: 't4', phaseName: 'LAUNCH', date: '01 Mar 2024', description: 'Campus Beta', status: 'completed' },
      { id: 't5', phaseName: 'STABLE', date: 'Current', description: 'Maintenance Mode', status: 'completed' }
    ],
    links: { github: "https://github.com/CfRadar" },
    screenshots: [
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
