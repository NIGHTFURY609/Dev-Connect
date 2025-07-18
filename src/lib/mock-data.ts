import type { Developer, Project, Complaint } from './types';

export const mockDevelopers: Developer[] = [
  {
    id: 'dev1',
    name: 'Anjali Nair',
    avatar: 'https://i.pravatar.cc/150?u=dev1',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    profileLink: 'https://github.com/anjalinair',
  },
  {
    id: 'dev2',
    name: 'Bipin George',
    avatar: 'https://i.pravatar.cc/150?u=dev2',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    profileLink: 'https://github.com/bipingeorge',
  },
  {
    id: 'dev3',
    name: 'Fathima Beevi',
    avatar: 'https://i.pravatar.cc/150?u=dev3',
    skills: ['Next.js', 'Tailwind CSS', 'Firebase', 'Vercel'],
    profileLink: 'https://github.com/fathimabeevi',
  },
  {
    id: 'dev4',
    name: 'Kiran Kumar',
    avatar: 'https://i.pravatar.cc/150?u=dev4',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
    profileLink: 'https://github.com/kirankumar',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    companyName: 'TechVantage',
    companyLogo: '/logos/techvantage.svg',
    title: 'E-commerce Platform Revamp',
    description: 'Looking for a frontend developer to rebuild our e-commerce platform with Next.js and Tailwind CSS for better performance and user experience.',
    requiredSkills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'proj2',
    companyName: 'InnovateKerala',
    companyLogo: '/logos/innovatekerala.svg',
    title: 'AI-Powered Logistics Dashboard',
    description: 'Seeking a full-stack developer to build a real-time logistics dashboard using Python, Django, and React.',
    requiredSkills: ['Python', 'Django', 'React', 'PostgreSQL'],
  },
  {
    id: 'proj3',
    companyName: 'SaaSify Solutions',
    companyLogo: '/logos/saasify.svg',
    title: 'Cloud-Native SaaS Application',
    description: 'We need a backend developer experienced in microservices architecture to develop our new SaaS product.',
    requiredSkills: ['Java', 'Spring Boot', 'Docker', 'AWS', 'Microservices'],
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: 'comp1',
    category: 'Bug Report',
    description: 'The project matching score calculation seems to be off on the projects page. It shows 100% for developers with only one matching skill.',
    status: 'New',
    submittedBy: 'Anjali Nair',
    createdAt: new Date('2024-07-20T10:00:00Z'),
  },
  {
    id: 'comp2',
    category: 'Feature Request',
    description: 'It would be great to have a dark mode for the entire application. The current light theme is good, but a dark theme would be easier on the eyes at night.',
    status: 'In Progress',
    submittedBy: 'Bipin George',
    createdAt: new Date('2024-07-19T14:30:00Z'),
  },
  {
    id: 'comp3',
    category: 'General Feedback',
    description: 'The platform is very clean and easy to use. I love the AI trust score feature!',
    status: 'Resolved',
    submittedBy: 'Fathima Beevi',
    createdAt: new Date('2024-07-18T09:15:00Z'),
  },
    {
    id: 'comp4',
    category: 'Account Issue',
    description: 'Unable to update my profile link. The save button is disabled even after making changes.',
    status: 'New',
    submittedBy: 'Kiran Kumar',
    createdAt: new Date('2024-07-21T11:00:00Z'),
  },
];

// A mock "current user" for the developer dashboard
export const mockCurrentUser: Developer = mockDevelopers[2];
