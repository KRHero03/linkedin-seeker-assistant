// Types for Seeker Assistant

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPremiumPlus: boolean;
  credits: number;
  maxCredits: number;
}

export interface OutreachConfig {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetCountries: string[];
  targetCompanies: string[];
  targetRoles: string[];
  targetSkills: string[];
  resume?: File | null;
  resumeName?: string;
  qualifications: string;
  customMessage: string;
  temperature: number; // 0-1, 0 = manual review, 1 = autopilot
  createdAt: Date;
}

export interface Recruiter {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  location: string;
  status: 'pending' | 'connected' | 'responded' | 'lead' | 'cooldown' | 'declined';
  connectionSentAt?: Date;
  lastActivity?: Date;
  matchScore: number; // 0-100
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isAgent: boolean;
}

export interface Conversation {
  id: string;
  recruiterId: string;
  recruiter: Recruiter;
  messages: Message[];
  status: 'active' | 'converted' | 'paused' | 'ended';
  summary?: string;
  keyPoints?: string[];
  nextSteps?: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface Lead {
  id: string;
  recruiter: Recruiter;
  conversation: Conversation;
  convertedAt: Date;
  notes: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
  features: string[];
}

export interface AgentSettings {
  temperature: number;
  autoRespond: boolean;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  maxDailyOutreach: number;
  cooldownPeriodDays: number;
  allowAgentContact: boolean; // For recruiters to opt-out
}

export type ViewType = 'dashboard' | 'outreach' | 'campaigns' | 'conversations' | 'leads' | 'settings' | 'credits';
