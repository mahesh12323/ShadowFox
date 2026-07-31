export interface Project {
  id: string;
  title: string;
  category: 'AI / ML' | 'Full Stack' | 'Python / Games';
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  techStack: string[];
  demoType: 'chatbot' | 'dashboard' | 'game';
  date: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; tag: string }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  skillsUsed: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Mahesh Poludasu',
    title: 'B.Tech Computer Science (AI & ML) | Full Stack & GenAI Developer',
    subtitle:
      'Motivated tech student with skills in Machine Learning, Cybersecurity, Generative AI, and Full Stack Development. Strong leadership, teamwork, and problem-solving abilities demonstrated through IEEE CIS activities, technical events, and innovative projects.',
    email: 'maheshpoludasu203@gmail.com',
    phone: '+91 9440674770',
    whatsappNumber: '919440674770',
    location: 'Mallam, Nellore, Andhra Pradesh, India 524403',
    linkedin: 'https://www.linkedin.com/in/mahesh-poludasu',
    github: 'https://github.com/mahesh-poludasu',
    availability: 'Open to Internships & Full-time Roles',
  },
  education: [
    {
      degree: 'B.Tech Computer Science and Engineering (AI & ML)',
      institution: 'NBKR Institute of Science and Technology',
      location: 'Vidyanagar, Nellore, Andhra Pradesh',
      period: 'Expected May 2027',
      cgpa: '8.31 CGPA',
      highlights: [
        'Specialization in Artificial Intelligence and Machine Learning',
        'Active member of IEEE CIS (Computational Intelligence Society) activities',
        'Core focus on Algorithm Design, Data Structures, Neural Networks, and Web Application Architecture',
      ],
    },
  ] as Education[],
  experience: [
    {
      role: 'Machine Learning Intern',
      company: 'Cognifyz IT Solutions',
      period: '10/05/2026 – 10/06/2026',
      location: 'Remote / India',
      type: 'Internship',
      description: [
        'Completed a Machine Learning internship focused on applying data-driven solutions to real-world problems.',
        'Worked on machine learning concepts and gained practical industry experience through project-based tasks.',
        'Enhanced analytical thinking, teamwork, and professional communication skills in a collaborative environment.',
      ],
      skillsUsed: [
        'Python',
        'Machine Learning Models',
        'Data Analysis',
        'Problem Solving',
        'Team Collaboration',
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: 'nlp-chatbot',
      title: 'Chatbot using NLP',
      category: 'AI / ML',
      shortDescription:
        'An intelligent conversational chatbot using Natural Language Processing techniques to understand and accurately respond to user queries.',
      fullDescription:
        'Developed an intelligent chatbot using Natural Language Processing techniques to understand and respond to user queries. Implemented text processing methods including tokenization, intent recognition, and contextual response matching to improve conversation accuracy and response quality.',
      highlights: [
        'Natural Language Understanding & Intent Recognition',
        'Contextual Text Processing methods for higher accuracy',
        'Interactive real-time chat interface with quick suggestion prompts',
      ],
      techStack: ['Python', 'NLP', 'Machine Learning', 'NLTK / SpaCy', 'REST API'],
      demoType: 'chatbot',
      date: '2024',
      githubUrl: 'https://github.com/mahesh-poludasu',
    },
    {
      id: 'ai-dashboard',
      title: 'Dynamic Dashboard Using Full Stack AI Development',
      category: 'Full Stack',
      shortDescription:
        'AI-powered full-stack dashboard for real-time data visualization, telemetry monitoring, and automated analytics.',
      fullDescription:
        'Designed and developed an AI-powered dashboard for real-time data visualization and monitoring. Built responsive frontend interfaces and integrated secure backend services for data processing, elevating user experience through interactive chart features and live metric filters.',
      highlights: [
        'Real-time data visualization and monitoring metrics',
        'Responsive frontend interface built for speed and accessibility',
        'Secure backend services for data processing and aggregation',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'AI Analytics', 'REST API'],
      demoType: 'dashboard',
      date: '2024',
      githubUrl: 'https://github.com/mahesh-poludasu',
    },
    {
      id: 'python-puzzle',
      title: 'Puzzle Game Using Python',
      category: 'Python / Games',
      shortDescription:
        'An interactive graphical puzzle game built with Python featuring smooth gameplay mechanics and logical problem-solving algorithms.',
      fullDescription:
        'Created an interactive puzzle game using Python and logical problem-solving techniques. Developed efficient game mechanics and implemented a user-friendly graphical interface. Focused on delivering smooth gameplay, responsive controls, and debugging skills.',
      highlights: [
        'Custom GUI architecture with smooth interactive gameplay',
        'Logical problem-solving and algorithmic state verification',
        'Optimized event handling and debugging methodology',
      ],
      techStack: ['Python', 'Pygame / Tkinter', 'Game Algorithms', 'Logic Design'],
      demoType: 'game',
      date: '2024',
      githubUrl: 'https://github.com/mahesh-poludasu',
    },
  ] as Project[],
  skillCategories: [
    {
      title: 'Languages & AI / ML',
      iconName: 'Brain',
      skills: [
        { name: 'Python', level: 90, tag: 'Language' },
        { name: 'Machine Learning', level: 85, tag: 'AI & Data' },
        { name: 'Generative AI', level: 85, tag: 'AI' },
        { name: 'Natural Language Processing (NLP)', level: 80, tag: 'AI & ML' },
        { name: 'Data Structures & Algorithms', level: 85, tag: 'Core' },
      ],
    },
    {
      title: 'Full Stack Development',
      iconName: 'Code2',
      skills: [
        { name: 'HTML5', level: 95, tag: 'Frontend' },
        { name: 'CSS3 / Tailwind CSS', level: 70, tag: 'Frontend' },
        { name: 'JavaScript / TypeScript', level: 80, tag: 'Frontend/Backend' },
        { name: 'React.js Architecture', level: 80, tag: 'Frontend' },
        { name: 'Backend API Integration', level: 80, tag: 'Backend' },
      ],
    },
    {
      title: 'CloudOps & Systems',
      iconName: 'Cloud',
      skills: [
        { name: 'CloudOps Fundamentals', level: 70, tag: 'Cloud' },
        { name: 'Data Warehouse Concepts', level: 70, tag: 'Data Engineering' },
        { name: 'Cybersecurity Principles', level: 70, tag: 'Security' },
        { name: 'Git & Version Control', level: 75, tag: 'DevOps' },
        { name: 'Debugging & Testing', level: 75, tag: 'Quality' },
      ],
    },
  ] as SkillCategory[],
  certifications: [
    {
      title: 'Python Certification',
      issuer: 'Verified Industry Credential',
      category: 'Languages',
      year: '2025',
    },
    {
      title: 'Full Stack Web Development (Advanced)',
      issuer: 'Technical Certification Programme',
      category: 'Web Dev',
      year: '2025',
    },
    {
      title: 'Artificial Intelligence (Core)',
      issuer: 'Professional Development Series',
      category: 'Web Dev',
      year: '2025',
    },
     {
      title: 'Prompt Engineering',
      issuer: 'Verified Industry Credential',
      category: 'Languages',
      year: '2026',
    },
    {
      title: 'Data Warehouse',
      issuer: 'Data Engineering Track',
      category: 'Data',
      year: '2026',
    },
    {
      title: 'Cybersecurity Fundamentals',
      issuer: 'Security & Infrastructure',
      category: 'Security',
      year: '2026',
    },
    {
      title: 'CloudOps',
      issuer: 'Cloud Computing Credential',
      category: 'Cloud',
      year: '2026',
    },
  ],
  activities: [
    {
      title: 'IEEE Technical Events & CIS Activities',
      description:
        'Active participant and contributor in IEEE Computational Intelligence Society (CIS) events, workshops, and technical seminars.',
      icon: 'Award',
    },
    {
      title: 'Hackathons & Technical Workshops',
      description:
        'Participated in competitive hackathons and hands-on coding bootcamps to solve real-world engineering challenges.',
      icon: 'Trophy',
    },
    {
      title: 'Collaborative Innovation Programs',
      description:
        'Engaged in team innovation programs, peer mentoring, and open-source learning circles to enhance leadership and problem-solving.',
      icon: 'Users',
    },
  ],
  stats: [
    { label: 'Academic CGPA', value: '8.31', suffix: '/ 10' },
    { label: 'Completed Projects', value: '3+', suffix: ' Core Apps' },
    { label: 'Professional Certifications', value: '6+', suffix: ' Credentials' },
    { label: 'Expected Graduation', value: '2027', suffix: ' B.Tech AI & ML' },
  ],
};
