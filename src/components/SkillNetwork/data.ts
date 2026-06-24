export type NodeSize = 'large' | 'medium' | 'small';

export interface SkillNodeData {
  id: string;
  parentId: string | null;
  label: string;
  size: NodeSize;
  description: string;
  category: string;
  technologies: string[];
  projects: string[];
  learningStatus: 'Expert' | 'Proficient' | 'Learning' | 'Exploring';
  experience: string;
  icon?: string;
  color?: string;
}

export const skillNodes: SkillNodeData[] = [
  // ROOT
  {
    id: 'root',
    parentId: null,
    label: 'Software Developer',
    size: 'large',
    description: 'Core identity focusing on scalable architectures, intelligent systems, and immersive web experiences.',
    category: 'Core Identity',
    technologies: [],
    projects: ['Nebula OS', 'AI Agent Builder', 'Y-Melodies', 'Soul Duel'],
    learningStatus: 'Expert',
    experience: '3+ Years',
    icon: '💻'
  },
  
  // ================= WEB DEV BRANCH =================
  {
    id: 'web-dev',
    parentId: 'root',
    label: 'Web Developer',
    size: 'large',
    description: 'Building responsive, high-performance web applications and rich interactive user interfaces.',
    category: 'Domain',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    projects: ['Nebula OS', 'Y-Melodies'],
    learningStatus: 'Expert',
    experience: '2 Years',
    color: '#00FFB3'
  },
  {
    id: 'react',
    parentId: 'web-dev',
    label: 'React',
    size: 'medium',
    description: 'Developing highly interactive component-based UIs with complex state management and custom hooks.',
    category: 'Frontend Library',
    technologies: ['Hooks', 'Context API', 'React Router'],
    projects: ['Nebula OS', 'AI Agent Builder', 'Y-Melodies'],
    learningStatus: 'Expert',
    experience: '3 Years'
  },
  {
    id: 'javascript',
    parentId: 'react',
    label: 'JavaScript',
    size: 'small',
    description: 'Deep understanding of ES6+, event loop, async/await, and prototypical inheritance.',
    category: 'Language',
    technologies: ['ES6+', 'DOM Manipulation'],
    projects: ['Soul Duel'],
    learningStatus: 'Expert',
    experience: '3+ Years'
  },
  {
    id: 'typescript',
    parentId: 'react',
    label: 'TypeScript',
    size: 'small',
    description: 'Leveraging static typing to build robust, bug-free, and highly maintainable large-scale applications.',
    category: 'Language',
    technologies: ['Interfaces', 'Generics', 'Utility Types'],
    projects: ['Nebula OS', 'AI Agent Builder'],
    learningStatus: 'Proficient',
    experience: '2 Years'
  },
  {
    id: 'hooks',
    parentId: 'react',
    label: 'Hooks & Context',
    size: 'small',
    description: 'Managing complex application state and side effects organically without third-party state managers.',
    category: 'React Architecture',
    technologies: ['useEffect', 'useMemo', 'useContext'],
    projects: ['Nebula OS'],
    learningStatus: 'Expert',
    experience: '2+ Years'
  },
  {
    id: 'html',
    parentId: 'web-dev',
    label: 'HTML5',
    size: 'small',
    description: 'Semantic HTML ensuring accessibility and SEO optimization.',
    category: 'Markup',
    technologies: ['Canvas', 'Semantic Tags', 'WebSockets'],
    projects: ['Soul Duel'],
    learningStatus: 'Expert',
    experience: '3+ Years'
  },
  {
    id: 'css',
    parentId: 'web-dev',
    label: 'CSS3',
    size: 'small',
    description: 'Modern styling architectures, grid/flexbox layouts, and hardware-accelerated animations.',
    category: 'Styling',
    technologies: ['Flexbox', 'Grid', 'Keyframes'],
    projects: [],
    learningStatus: 'Expert',
    experience: '3+ Years'
  },
  {
    id: 'tailwind',
    parentId: 'css',
    label: 'Tailwind CSS',
    size: 'small',
    description: 'Utility-first CSS framework for rapid UI development and consistent design tokens.',
    category: 'CSS Framework',
    technologies: ['Tailwind Config', 'Plugins'],
    projects: ['Y-Melodies', 'AI Agent Builder'],
    learningStatus: 'Expert',
    experience: '2 Years'
  },
  {
    id: 'node',
    parentId: 'web-dev',
    label: 'Node.js',
    size: 'medium',
    description: 'Building fast, scalable network applications and backend APIs using event-driven architectures.',
    category: 'Backend Runtime',
    technologies: ['Streams', 'FileSystem API', 'EventEmitters'],
    projects: ['Y-Melodies', 'Nebula OS'],
    learningStatus: 'Proficient',
    experience: '2 Years'
  },
  {
    id: 'express',
    parentId: 'node',
    label: 'Express.js',
    size: 'small',
    description: 'Creating robust RESTful APIs and middleware pipelines.',
    category: 'Web Framework',
    technologies: ['Routing', 'Middleware'],
    projects: ['Y-Melodies'],
    learningStatus: 'Proficient',
    experience: '2 Years'
  },
  {
    id: 'jwt',
    parentId: 'express',
    label: 'JWT & Auth',
    size: 'small',
    description: 'Implementing secure, stateless user authentication and role-based access control.',
    category: 'Security',
    technologies: ['JSON Web Tokens', 'Bcrypt'],
    projects: ['Y-Melodies'],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },
  {
    id: 'rest',
    parentId: 'express',
    label: 'REST APIs',
    size: 'small',
    description: 'Designing clean, predictable, resource-oriented API endpoints.',
    category: 'Architecture',
    technologies: ['HTTP/1.1', 'JSON'],
    projects: ['AI Agent Builder'],
    learningStatus: 'Expert',
    experience: '2 Years'
  },

  // ================= APP DEV BRANCH =================
  {
    id: 'app-dev',
    parentId: 'root',
    label: 'App Developer',
    size: 'medium',
    description: 'Cross-platform mobile application development.',
    category: 'Domain',
    technologies: ['Flutter', 'React Native'],
    projects: ['Hostel Delivery System'],
    learningStatus: 'Proficient',
    experience: '1 Year',
    color: '#00C8FF'
  },
  {
    id: 'flutter',
    parentId: 'app-dev',
    label: 'Flutter',
    size: 'small',
    description: 'Building natively compiled applications for mobile from a single codebase.',
    category: 'Framework',
    technologies: ['Dart', 'Provider'],
    projects: [],
    learningStatus: 'Learning',
    experience: '6 Months'
  },
  {
    id: 'dart',
    parentId: 'flutter',
    label: 'Dart',
    size: 'small',
    description: 'Object-oriented language optimized for UI creation.',
    category: 'Language',
    technologies: [],
    projects: [],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },
  {
    id: 'react-native',
    parentId: 'app-dev',
    label: 'React Native',
    size: 'small',
    description: 'Building native mobile applications using React.',
    category: 'Framework',
    technologies: ['Expo', 'Redux'],
    projects: [],
    learningStatus: 'Learning',
    experience: '6 Months'
  },
  {
    id: 'firebase',
    parentId: 'app-dev',
    label: 'Firebase',
    size: 'small',
    description: 'Backend-as-a-Service for realtime databases and auth.',
    category: 'Backend',
    technologies: ['Firestore', 'Auth'],
    projects: ['Hostel Delivery System'],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },

  // ================= GRAPHIC DESIGN BRANCH =================
  {
    id: 'graphic',
    parentId: 'root',
    label: 'Graphic Design',
    size: 'medium',
    description: 'Crafting visually stunning, user-centric interfaces and brand identities.',
    category: 'Domain',
    technologies: ['Figma', 'Photoshop'],
    projects: ['Portfolio', 'Soul Duel'],
    learningStatus: 'Proficient',
    experience: '2 Years',
    color: '#FF00FF'
  },
  {
    id: 'figma',
    parentId: 'graphic',
    label: 'Figma',
    size: 'small',
    description: 'Rapid prototyping, wireframing, and creating comprehensive design systems.',
    category: 'Tool',
    technologies: ['Auto Layout', 'Components'],
    projects: ['Portfolio'],
    learningStatus: 'Expert',
    experience: '2 Years'
  },
  {
    id: 'ui-design',
    parentId: 'graphic',
    label: 'UI Design',
    size: 'small',
    description: 'Designing premium layouts with emphasis on typography, spacing, and modern aesthetics.',
    category: 'Concept',
    technologies: [],
    projects: ['Nebula OS'],
    learningStatus: 'Expert',
    experience: '2 Years'
  },
  {
    id: 'ux',
    parentId: 'graphic',
    label: 'UX Thinking',
    size: 'small',
    description: 'Mapping user journeys, optimizing friction points, and structuring intuitive interactions.',
    category: 'Concept',
    technologies: [],
    projects: ['AI Agent Builder'],
    learningStatus: 'Proficient',
    experience: '1.5 Years'
  },

  // ================= SOFTWARE ENGINEERING BRANCH =================
  {
    id: 'se',
    parentId: 'root',
    label: 'Software Engineering',
    size: 'large',
    description: 'Enterprise-grade architectural design, scaling principles, and robust code structuring.',
    category: 'Domain',
    technologies: ['Java', 'Design Patterns', 'System Design'],
    projects: ['Nebula OS'],
    learningStatus: 'Proficient',
    experience: '2 Years',
    color: '#FFA500'
  },
  {
    id: 'java',
    parentId: 'se',
    label: 'Java',
    size: 'medium',
    description: 'Building strongly-typed, object-oriented enterprise applications.',
    category: 'Language',
    technologies: ['JVM', 'Spring Boot'],
    projects: [],
    learningStatus: 'Proficient',
    experience: '2 Years'
  },
  {
    id: 'oop',
    parentId: 'java',
    label: 'OOP',
    size: 'small',
    description: 'Encapsulation, Inheritance, Polymorphism, and Abstraction principles.',
    category: 'Paradigm',
    technologies: [],
    projects: [],
    learningStatus: 'Expert',
    experience: '3 Years'
  },
  {
    id: 'design-patterns',
    parentId: 'se',
    label: 'Design Patterns',
    size: 'small',
    description: 'Implementing Singleton, Factory, Observer, and Strategy patterns for maintainable codebases.',
    category: 'Architecture',
    technologies: [],
    projects: ['AI Agent Builder'],
    learningStatus: 'Proficient',
    experience: '1.5 Years'
  },
  {
    id: 'sys-design',
    parentId: 'se',
    label: 'System Design',
    size: 'small',
    description: 'Architecting distributed systems, microservices, load balancing, and database scaling.',
    category: 'Architecture',
    technologies: ['Docker', 'Message Queues'],
    projects: ['Nebula OS'],
    learningStatus: 'Learning',
    experience: '1 Year'
  },

  // ================= GAME DEV BRANCH =================
  {
    id: 'game-dev',
    parentId: 'root',
    label: 'Game Development',
    size: 'medium',
    description: 'Creating interactive entertainment and game logic systems.',
    category: 'Domain',
    technologies: ['Unity', 'Canvas API'],
    projects: ['Soul Duel'],
    learningStatus: 'Proficient',
    experience: '1.5 Years',
    color: '#FF0055'
  },
  {
    id: 'unity',
    parentId: 'game-dev',
    label: 'Unity',
    size: 'small',
    description: '3D/2D game engine development and physics handling.',
    category: 'Engine',
    technologies: ['MonoBehaviour', 'Physics2D'],
    projects: [],
    learningStatus: 'Learning',
    experience: '6 Months'
  },
  {
    id: 'csharp',
    parentId: 'game-dev',
    label: 'C#',
    size: 'small',
    description: 'Scripting game logic, state machines, and AI behaviors.',
    category: 'Language',
    technologies: [],
    projects: [],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },
  {
    id: 'unreal-engine-5',
    parentId: 'game-dev',
    label: 'Unreal Engine 5',
    size: 'small',
    description: 'Next-gen game development with Nanite and Lumen systems.',
    category: 'Engine',
    technologies: ['Blueprints', 'C++'],
    projects: [],
    learningStatus: 'Learning',
    experience: '<1 Year'
  },
  {
    id: 'physics',
    parentId: 'unity',
    label: 'Game Physics',
    size: 'small',
    description: 'Implementing custom collisions, rigidbodies, and kinematics.',
    category: 'Concept',
    technologies: [],
    projects: ['Soul Duel'],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },
  {
    id: 'shaders',
    parentId: 'unity',
    label: 'Shaders & VFX',
    size: 'small',
    description: 'Creating custom visual effects and post-processing materials.',
    category: 'Graphics',
    technologies: ['Shader Graph', 'HLSL'],
    projects: [],
    learningStatus: 'Exploring',
    experience: '<1 Year'
  },

  // ================= AI & ML BRANCH =================
  {
    id: 'ai-ml',
    parentId: 'root',
    label: 'AI & Machine Learning',
    size: 'large',
    description: 'Developing intelligent systems, reinforcement learning agents, and orchestrating Large Language Models.',
    category: 'Domain',
    technologies: ['Python', 'OpenAI API', 'Hugging Face'],
    projects: ['Traffic Light RL Environment', 'AI Agent Builder'],
    learningStatus: 'Proficient',
    experience: '1 Year',
    color: '#A020F0'
  },
  {
    id: 'python',
    parentId: 'ai-ml',
    label: 'Python',
    size: 'medium',
    description: 'Extensive use of Python for data manipulation, backend logic, and machine learning scripts.',
    category: 'Language',
    technologies: ['Pandas', 'NumPy', 'FastAPI'],
    projects: ['Traffic Light RL Environment'],
    learningStatus: 'Proficient',
    experience: '2 Years'
  },
  {
    id: 'ml',
    parentId: 'python',
    label: 'Machine Learning',
    size: 'small',
    description: 'Building predictive models and reinforcement learning agents.',
    category: 'Concept',
    technologies: ['OpenAI Gym', 'Scikit-Learn'],
    projects: ['Traffic Light RL Environment'],
    learningStatus: 'Learning',
    experience: '1 Year'
  },
  {
    id: 'dl',
    parentId: 'ml',
    label: 'Deep Learning',
    size: 'small',
    description: 'Exploring neural networks, tensor operations, and backpropagation.',
    category: 'Concept',
    technologies: ['PyTorch', 'TensorFlow'],
    projects: [],
    learningStatus: 'Exploring',
    experience: '<1 Year'
  },
  {
    id: 'llms',
    parentId: 'ai-ml',
    label: 'LLMs',
    size: 'medium',
    description: 'Integrating Large Language Models to power natural language generation and agentic behaviors.',
    category: 'Technology',
    technologies: ['GPT-4', 'Claude 3', 'Llama'],
    projects: ['AI Agent Builder'],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },
  {
    id: 'openai',
    parentId: 'llms',
    label: 'OpenAI SDK',
    size: 'small',
    description: 'Direct interaction with OpenAI models, fine-tuning, and streaming responses.',
    category: 'API/Tooling',
    technologies: ['OpenAI Python SDK'],
    projects: ['AI Agent Builder'],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },
  {
    id: 'ai-agents',
    parentId: 'llms',
    label: 'AI Agents',
    size: 'small',
    description: 'Designing multi-agent systems that autonomously reason and execute tool-calls.',
    category: 'Architecture',
    technologies: ['LangChain', 'Custom Orchestration'],
    projects: ['AI Agent Builder'],
    learningStatus: 'Proficient',
    experience: '1 Year'
  },
  {
    id: 'prompt-eng',
    parentId: 'llms',
    label: 'Prompt Engineering',
    size: 'small',
    description: 'Crafting robust prompts to reliably steer LLM behavior and format outputs.',
    category: 'Skill',
    technologies: ['Few-shot prompting', 'Chain of Thought'],
    projects: ['AI Agent Builder'],
    learningStatus: 'Expert',
    experience: '1.5 Years'
  },

  // ================= LOGICAL PROBLEM SOLVING BRANCH =================
  {
    id: 'logic',
    parentId: 'root',
    label: 'Logical Problem Solving',
    size: 'large',
    description: 'Strong foundation in computational logic, algorithmic efficiency, and memory management.',
    category: 'Domain',
    technologies: ['C++', 'Data Structures', 'Algorithms'],
    projects: [],
    learningStatus: 'Expert',
    experience: '4 Years',
    color: '#FFFF00'
  },
  {
    id: 'cpp',
    parentId: 'logic',
    label: 'C++',
    size: 'medium',
    description: 'High-performance computing and low-level memory manipulation.',
    category: 'Language',
    technologies: ['STL', 'Pointers', 'Memory Allocation'],
    projects: [],
    learningStatus: 'Expert',
    experience: '4 Years'
  },
  {
    id: 'dsa',
    parentId: 'cpp',
    label: 'Data Structures',
    size: 'small',
    description: 'Mastery of Trees, Graphs, Hash Maps, and advanced structures like Segment Trees.',
    category: 'Computer Science',
    technologies: [],
    projects: [],
    learningStatus: 'Expert',
    experience: '3+ Years'
  },
  {
    id: 'algos',
    parentId: 'cpp',
    label: 'Algorithms',
    size: 'small',
    description: 'Dynamic Programming, Graph Traversal, Greedy Strategies, and Search Optimization.',
    category: 'Computer Science',
    technologies: [],
    projects: [],
    learningStatus: 'Expert',
    experience: '3+ Years'
  },
  {
    id: 'cp',
    parentId: 'logic',
    label: 'Competitive Programming',
    size: 'small',
    description: 'Solving complex computational problems under tight time and memory constraints.',
    category: 'Skill',
    technologies: ['Codeforces', 'LeetCode'],
    projects: [],
    learningStatus: 'Proficient',
    experience: '2 Years'
  }
];
