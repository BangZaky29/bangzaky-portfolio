import { CraftPillar } from '../types';

export const craftPillars: CraftPillar[] = [
  {
    id: 'web-creative',
    index: '01',
    title: 'Web & Creative Engineering',
    shortDesc: 'Production web applications, interactive 3D interfaces, and fluid micro-interactions.',
    description: 'Membangun aplikasi web berperforma tinggi dengan fokus pada arsitektur bersih, estetika editorial modern, dan animasi 60 FPS yang memukau tanpa mengorbankan waktu loading dan aksesibilitas.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Canvas/WebGL'],
    capabilities: [
      'Corporate & Creative Web Applications',
      'High-conversion Landing Pages with Rich SEO',
      'Micro-interactions & Smooth Scroll Physics',
      'Progressive Web Apps (PWA) & Offline Caching'
    ]
  },
  {
    id: 'mobile-iot',
    index: '02',
    title: 'Mobile & IoT Systems',
    shortDesc: 'Cross-platform mobile apps, device hardware sensors, and edge synchronization.',
    description: 'Pengembangan aplikasi mobile lintas platform (iOS & Android) yang terhubung ke sensor kamera, geolokasi real-time, dan transmisi data aman ke database terpusat.',
    tags: ['React Native', 'Expo', 'Mobile Camera Ops', 'Geolocation', 'Offline-First'],
    capabilities: [
      'Field Ops & Logistics Tracking Clients',
      'Sensor-validated Data Loggers (GPS/Camera)',
      'Cross-platform iOS & Android Deployment',
      'Real-time Push Notifications & Sync Engine'
    ]
  },
  {
    id: 'ai-automation',
    index: '03',
    title: 'AI & Bot Automation',
    shortDesc: 'Algorithmic market indicators, custom LLM agents, and automated business workflows.',
    description: 'Mengintegrasikan kecerdasan buatan dan bot otomasi untuk memangkas inefisiensi operasional, analisis data berkecepatan tinggi, dan automasi trading 24 jam.',
    tags: ['Python', 'LLM Integration', 'MT5 MQL5', 'YOLOv8 Vision', 'WhatsApp Bots'],
    capabilities: [
      'MetaTrader 5 (MT5) Algorithmic Indicator & EA',
      'AI Chatbot & Intelligent Customer Support',
      'WhatsApp Automation & Marketing Webhook System',
      'Computer Vision Object Recognition (YOLOv8)'
    ]
  },
  {
    id: 'backend-architecture',
    index: '04',
    title: 'Backend & Cloud Systems',
    shortDesc: 'Scalable RESTful microservices, relational databases, and edge runtime workers.',
    description: 'Arsitektur backend tangguh yang menangani integrasi payment gateway, manajemen database relasional, auth tokens, dan deployment serverless global.',
    tags: ['Node.js', 'Express', 'Python Flask', 'Supabase', 'MySQL', 'Cloudflare Workers'],
    capabilities: [
      'RESTful & Webhook Microservices Architecture',
      'Payment Gateway Integration (Midtrans / Xendit)',
      'Database Modeling & Query Optimization',
      'Edge Runtime Functions & Global CDN Caching'
    ]
  }
];

export const whatICanBuildServices = [
  {
    title: 'Corporate & Company Profile Website',
    desc: 'Website representatif dengan visual luxury, SEO terstruktur, dan optimasi konversi klien.',
    icon: 'globe'
  },
  {
    title: 'Operational & Analytics Dashboard',
    desc: 'Sistem observasi data terpusat, visualisasi metrik performa, dan monitoring stasiun kerja.',
    icon: 'layout-dashboard'
  },
  {
    title: 'AI Micro-tools & Automation Engine',
    desc: 'Tool pintar untuk parsing log error, ekstraksi dokumen otomatis, dan asisten AI internal.',
    icon: 'cpu'
  },
  {
    title: 'WhatsApp Automation & Webhooks',
    desc: 'Sistem auto-response interaktif, blast broadcast tervalidasi, dan integrasi notifikasi server.',
    icon: 'message-square'
  },
  {
    title: 'Payment Gateway Integration',
    desc: 'Sistem transaksi seamless dengan Midtrans/Xendit lengkap dengan webhook audit trail.',
    icon: 'credit-card'
  },
  {
    title: 'Mobile App with Camera & Maps',
    desc: 'Aplikasi lapangan dengan verifikasi GPS, capture bukti visual, dan sinkronisasi instan.',
    icon: 'smartphone'
  },
  {
    title: 'MT5 Algorithmic Indicators',
    desc: 'Bot indikator sinyal otomatis berbasis aturan teknikal ketat 24/7 tanpa emosi manusia.',
    icon: 'trending-up'
  },
  {
    title: 'Automated Document & PDF Generator',
    desc: 'PWA template engine untuk membuat ribuan dokumen legal dan bisnis siap cetak dalam hitungan detik.',
    icon: 'file-text'
  }
];

