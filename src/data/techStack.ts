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
  { id: 'backend', title: 'CORE_BACKEND', items: ['Python', 'Node.js', 'Express', 'Flask', 'CodeIgniter'] },
  { id: 'frontend', title: 'CORE_FRONTEND', items: ['React', 'TypeScript', 'Vite', 'Tailwind'] },
  { id: 'mobile', title: 'MOBILE_DEV', items: ['React Native', 'Expo'] },
  { id: 'ai', title: 'AI_DATA', items: ['YOLOv8', 'OpenCV', 'Pandas', 'Automation'] },
  { id: 'database', title: 'DATABASE_SYS', items: ['MySQL', 'MariaDB', 'Supabase'] },
  { id: 'infra', title: 'INFRA_TOOLS', items: ['Git/GitHub', 'Linux', 'LAN Routing', 'MT5'] },
];
