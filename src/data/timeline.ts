/**
 * Career Milestones & Experience Timeline
 * Reflects Zaky Aulia Qolbi's trajectory from Industrial Operations
 * into Advanced AI Systems & Creative Web Architecture.
 */

export interface TimelineMilestone {
  id: string;
  year: string;
  companyShort: string;
  period: string;
  role: string;
  company: string;
  description: string;
  bulletPoints: string[];
  skills: string[];
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'EXP-2022',
    year: '2022',
    companyShort: 'Industrial / Ops',
    period: 'Jan 2022 - Des 2022',
    role: 'PRODUCTION SUPERVISOR',
    company: 'Manufacturing Plant & Industrial Operations',
    description: 'Mengawasi alur lini manufaktur dan stasiun kerja pabrik sebelum bertransformasi membangun sistem monitoring digital otomatis.',
    bulletPoints: [
      'Memimpin supervisi lini produksi manufaktur dengan target ketat OEE (Overall Equipment Effectiveness).',
      'Mengidentifikasi bottleneck pencatatan manual antar workstation pabrik dan merancang solusi digitalisasi awal.',
      'Membangun fondasi logika sistem pabrik yang menjadi bekal kuat dalam rekayasa software automasi industri.',
    ],
    skills: ['Operations Control', 'Workflow Automation', 'Production Telemetry', 'Quality Assurance'],
  },
  {
    id: 'EXP-2023',
    year: '2023',
    companyShort: 'Nuansa Solution',
    period: 'Jan 2023 - Des 2023',
    role: 'FULL-STACK WEB DEVELOPER',
    company: 'Nuansa Solution & Enterprise Client Projects',
    description: 'Merancang arsitektur aplikasi web modern, sistem manajemen dokumen otomatis (APTO PWA), dan web komersial B2B.',
    bulletPoints: [
      'Membangun sistem APTO Document Generator PWA yang memotong waktu perakitan dokumen resmi dari 40 menit menjadi hitungan detik.',
      'Mengembangkan web komersial berarsitektur React dan Tailwind CSS untuk klien tender B2B skala besar (PT Sanita Akses).',
      'Mengintegrasikan relational database MySQL & Supabase dengan row-level security (RLS) dan rest stateful API.',
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MySQL', 'Supabase'],
  },
  {
    id: 'EXP-2024',
    year: '2024',
    companyShort: 'Algo & Vision',
    period: 'Jan 2024 - Des 2024',
    role: 'AI & ALGORITHMIC SYSTEMS ENGINEER',
    company: 'Fintech Bot & Computer Vision Lab',
    description: 'Rekayasa indikator trading otonom MetaTrader 5 (MQL5) dan deployment pipeline deteksi visual objek real-time.',
    bulletPoints: [
      'Merancang engine autopilot MT5 MQL5 dengan momentum calculation berlatensi <50ms yang beroperasi 24/7 di VPS Cloud.',
      'Melatih dan men-deploy model YOLOv8 Computer Vision untuk tracking dan kalkulasi densitas objek pada video stream.',
      'Membangun automation micro-tools dan WhatsApp bot engine untuk validasi transaksi instan.',
    ],
    skills: ['MQL5', 'Python', 'YOLOv8', 'Computer Vision', 'WhatsApp Automation', 'MetaTrader 5'],
  },
  {
    id: 'EXP-2025',
    year: '2025',
    companyShort: 'Creative Agency',
    period: 'Jan 2025 - Des 2025',
    role: 'CREATIVE DEVELOPER & ARCHITECT',
    company: 'Digital Agencies & Interactive Platforms',
    description: 'Membangun platform undangan digital interaktif (MBell Invitations) dan digital showroom agensi (Ruang Imaji).',
    bulletPoints: [
      'Merancang platform MBell Invitations dengan micro-interactions, background audio otomatis, dan konversi RSVP online >95%.',
      'Mengembangkan showroom sinematik Ruang Imaji dengan visual gold palette, Three.js canvas, dan Framer Motion berkinerja 60 FPS.',
      'Menerapkan SEO teknis standar internasional (JSON-LD ProfilePage schema, OpenGraph, sitemap dinamis).',
    ],
    skills: ['React', 'Three.js / WebGL', 'Framer Motion', 'Vite', 'Edge Cloud', 'Technical SEO'],
  },
  {
    id: 'EXP-2026',
    year: '2026',
    companyShort: 'Freelance / Lead',
    period: '2026 - Present',
    role: 'CREATIVE DEVELOPER & AI SYSTEMS ENGINEER',
    company: 'Independent Systems Architect (Contract & Global Hire)',
    description: 'Membantu bisnis, agensi, dan perusahaan teknologi membangun sistem web berestetika tinggi dan engine otomasi AI otonom.',
    bulletPoints: [
      'Tersedia untuk proyek kontrak, rekayasa web 3D/creative interfaces, dan otomasi bot kecerdasan buatan.',
      'Spesialisasi penggabungan estetika visual berkaliber Awwwards dengan ketangguhan backend industri dan kecerdasan AI.',
      'Komitmen deployment zero-downtime dengan TTFB <50ms pada infrastruktur cloud modern.',
    ],
    skills: ['Autonomous AI Agents', 'Creative WebGL', 'High-Frequency Bot', 'Full-Stack Architecture'],
  },
];

// Alias for backwards compatibility
export const timelineEvents = timelineMilestones;
