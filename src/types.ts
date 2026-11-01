/**
 * Comprehensive TypeScript Interfaces for Creative Portfolio
 */

export type LightingMode = 'warm' | 'uv';

export type NavSectionId = 'home' | 'craft' | 'work' | 'experience' | 'contact';

export interface NavSection {
  id: NavSectionId;
  index: string;
  label: string;
  title: string;
}

export interface ProjectMetric {
  label: string;
  value: number;
  valueLabel: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  category: 'web' | 'ai' | 'mobile' | 'system';
  categoryLabel: string;
  year: string;
  problem: string;
  solution: string;
  stack: string[];
  result: string;
  url?: string;
  githubUrl?: string;
  metrics?: ProjectMetric[];
  highlight?: boolean;
}

export interface CraftPillar {
  id: string;
  index: string;
  title: string;
  shortDesc: string;
  description: string;
  tags: string[];
  capabilities: string[];
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'tools';
  level: number; // 1-100
  note?: string;
}

export interface TimelineEvent {
  year: string;
  role: string;
  company?: string;
  description: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  category: 'technical' | 'language' | 'database';
  fileName: string;
}

export interface SocialLink {
  id: string;
  label: string;
  displayText: string;
  url: string;
  type: 'link' | 'phone' | 'email';
}
