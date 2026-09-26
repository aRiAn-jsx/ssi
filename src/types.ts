export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
  features?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  returnRate: string;
  assetValue: string;
  description: string;
}

export interface SubsidiaryNode {
  id: string;
  name: string;
  role: string;
  equity: string;
  color: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  metrics: { label: string; value: string }[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix: string;
  subtext: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  alt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  category?: 'board' | 'investment' | 'governance' | 'fintech';
  bio: string;
  image: string;
  expertise: string;
  education?: string;
  achievements?: string[];
  linkedin?: string;
  email?: string;
}

export interface ChartDataPoint {
  period: string;
  portfolioValue: number;
  benchmarkIndex: number;
  growth: number;
}

export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  callout?: string;
  bulletPoints?: string[];
}

export interface ArticleComment {
  id: string;
  name: string;
  role: string;
  date: string;
  content: string;
  likes: number;
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
    education?: string;
  };
  date: string;
  readTime: string;
  image: string;
  alt: string;
  featured?: boolean;
  tags: string[];
  keyTakeaways?: string[];
  sections?: ArticleSection[];
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  statsHighlight?: {
    label: string;
    value: string;
    change?: string;
    note?: string;
  };
  initialLikes?: number;
  comments?: ArticleComment[];
}

export interface ConsultationFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  companyName?: string;
  consultationType: string;
  meetingFormat: 'in-person' | 'online';
  preferredDate: string;
  preferredTime: string;
  portfolioRange?: string;
  notes?: string;
}
