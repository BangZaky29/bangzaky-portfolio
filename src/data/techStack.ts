/**
 * Technology Stack Categories
 * Used by TechMatrix sidebar component
 */

export interface TechCategory {
  id: string;
  title: string;
  items: string[];
}

export const techCategories: TechCategory[] = [
  { id: 'frontend', title: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'] },
  { id: 'backend', title: 'Backend', items: ['Python', 'Node.js', 'Express', 'Flask', 'REST APIs'] },
  { id: 'database', title: 'Database', items: ['MySQL', 'MariaDB', 'Supabase', 'PostgreSQL'] },
  { id: 'ai', title: 'AI & Automation', items: ['LLM Integration', 'YOLOv8', 'OpenCV', 'Pandas'] },
  { id: 'tools', title: 'Tools & Infra', items: ['Git/GitHub', 'Linux', 'MetaTrader 5', 'Cloudflare Workers'] },
];
