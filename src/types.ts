export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rate: number; // multiplier from USD
}

export type DonationFrequency = 'one-time' | 'monthly';

export interface Cause {
  id: string;
  title: string;
  category: 'water' | 'education' | 'health' | 'disaster' | 'empowerment';
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  location: string;
  impactMetrics: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string;
  amountUSD: number;
  currency: Currency;
  formattedAmount: string;
  frequency: DonationFrequency;
  causeId: string;
  causeTitle: string;
  date: string;
  isAnonymous: boolean;
  honoreeName?: string;
  receiptNumber: string;
  taxDeductibleId: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  category: 'field' | 'digital' | 'medical' | 'event';
  location: string;
  commitment: string;
  description: string;
  requiredSkills: string[];
  spotsLeft: number;
  urgency: 'high' | 'normal';
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  roleTitle: string;
  skills: string[];
  availability: string;
  locationPreference: string;
  motivation: string;
  submittedAt: string;
  status: 'Approved' | 'Under Review' | 'Orientation Pending';
  volunteerIdCode: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Clean Water' | 'Education' | 'Disaster Relief' | 'Healthcare' | 'Field Report';
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  galleryImages?: string[];
  location: string;
  likes: number;
  commentsCount: number;
  featured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  location: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  impactHighlight: string;
}

export interface SchoolProject {
  id: string;
  title: string;
  category: 'Infrastructure' | 'Education' | 'Nutrition & Health' | 'Technology' | 'Sports & Culture';
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Planning Phase';
  description: string;
  location: string;
  estimatedCostINR: number;
  raisedINR: number;
  targetDate: string;
  imageUrl: string;
  highlights: string[];
}

export interface AnandaMargaLink {
  id: string;
  title: string;
  category: 'Secretariat & HQ' | 'Neohumanist Education' | 'Philosophy & Literature' | 'Relief & AMURT' | 'Yoga & Spiritual Practices';
  url: string;
  description: string;
  badge?: string;
}

export interface BeneficiaryStory {
  id: string;
  name: string;
  phone: string;
  location: string;
  quote: string;
  date: string;
}
