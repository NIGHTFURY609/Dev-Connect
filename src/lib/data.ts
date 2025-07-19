export type Project = {
  projectId: string;
  company: string;
  title: string;
  requiredSkills: string[];
  details: string;
  logoUrl?: string;
};

export const projectListings: Project[] = [
  {
    projectId: 'proj-001',
    company: 'InnovateX',
    title: 'AI-Powered E-commerce Platform',
    requiredSkills: ['React', 'Node.js', 'Python', 'Machine Learning', 'Firebase'],
    details: 'Develop a next-generation e-commerce platform with personalized recommendations and a chatbot powered by AI.',
    logoUrl: 'https://placehold.co/100x100.png',
  },
  {
    projectId: 'proj-002',
    company: 'Healthify',
    title: 'Telemedicine Mobile App',
    requiredSkills: ['Flutter', 'Dart', 'Firebase', 'WebRTC'],
    details: 'Build a cross-platform mobile app for remote patient consultations and health monitoring.',
    logoUrl: 'https://placehold.co/100x100.png',
  },
  {
    projectId: 'proj-003',
    company: 'FinSecure',
    title: 'Blockchain-Based FinTech Solution',
    requiredSkills: ['Solidity', 'Ethereum', 'Next.js', 'TypeScript', 'GraphQL'],
    details: 'Create a secure and transparent financial transaction system using blockchain technology.',
    logoUrl: 'https://placehold.co/100x100.png',
  },
  {
    projectId: 'proj-004',
    company: 'GoGreen',
    title: 'IoT Environmental Monitoring System',
    requiredSkills: ['Python', 'Raspberry Pi', 'IoT', 'Data Visualization', 'AWS'],
    details: 'Design and implement an IoT system to monitor air and water quality in real-time.',
    logoUrl: 'https://placehold.co/100x100.png',
  },
];

export const developerProfile = {
    name: 'Alex Doe',
    avatarUrl: 'https://placehold.co/100x100.png',
    trustScore: 88,
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase', 'GraphQL'],
    githubProfileUrl: 'https://github.com/example',
    otherProfileUrls: [
        { name: 'LinkedIn', url: 'https://linkedin.com/in/example', icon: 'Linkedin' },
    ]
};
