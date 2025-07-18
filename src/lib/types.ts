export type Developer = {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  profileLink: string;
  trustScore?: {
    score: number;
    breakdown: {
      sentiment: number;
      professionalism: number;
      technicalExpertise: number;
      collaboration: number;
    }
  };
};

export type Project = {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  requiredSkills: string[];
};

export type Complaint = {
  id: string;
  category: 'Bug Report' | 'Feature Request' | 'Account Issue' | 'General Feedback';
  description: string;
  status: 'New' | 'In Progress' | 'Resolved';
  submittedBy: string;
  createdAt: Date;
};
