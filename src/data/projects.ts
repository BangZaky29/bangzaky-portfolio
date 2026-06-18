import { Project } from '../types';

/**
 * Internal/Technical Projects — engineering & AI automation work
 * These represent personal technical projects and system engineering
 */
export const technicalProjects: Project[] = [
  {
    id: 'PRJ-001',
    name: 'AI Chatbot Assistant Engine',
    problem: 'Sistem mengalami bottle-neck dalam merespons query operasional dasar secara realtime karena limitasi agen manusia.',
    solution: 'Membangun chatbot controller backend menggunakan framework Flask terintegrasi dengan RESTful LLM API untuk parsing bahasa natural.',
    stack: ['Python', 'Flask', 'LLM API', 'JSON REST'],
    result: 'Pengurangan drastis waktu tunggu tanggapan, menghemat jam kerja eskalasi secara terukur.',
    metrics: [
      { label: 'Response Latency', value: 85, valueLabel: '-85% (120ms)' },
      { label: 'Accuracy Score', value: 94, valueLabel: '94.2%' },
      { label: 'Uptime', value: 99, valueLabel: '99.9%' },
    ],
  },
  {
    id: 'PRJ-002',
    name: 'YOLO Computer Vision Tracker',
    problem: 'Inspeksi logistik dan visual monitoring masih bersifat manual, subjektif, dan lambat didokumentasikan.',
    solution: 'Menyatukan model training YOLOv8 pada feed kamera lokal untuk mengeksekusi pengenalan objek aktual tanpa interupsi.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Pandas'],
    result: 'Skrip vision berjalan stabil >= 30 FPS dengan persentase false-positive yang minimal.',
    metrics: [
      { label: 'Processing FPS', value: 100, valueLabel: '32 FPS' },
      { label: 'False Positives', value: 5, valueLabel: '< 5%' },
      { label: 'CPU Usage', value: 65, valueLabel: '65%' },
    ],
  },
  {
    id: 'PRJ-003',
    name: 'MT5 Algorithmic Indicator',
    problem: 'Keterlambatan input pasar manual akibat bias psikologis yang berujung pada inefisiensi eksekusi peluang.',
    solution: 'Menginjeksi strategi pasar ke dalam kernel algoritma MQL sebagai auto-indicator & Expert Advisor.',
    stack: ['MQL5', 'Data Analytics', 'MetaTrader'],
    result: 'Sistem autopilot yang berjalan 24 jam dengan adherence murni pada parameter teknikal statis.',
    metrics: [
      { label: 'Execution Delay', value: 90, valueLabel: '-90% (<50ms)' },
      { label: 'System Adherence', value: 100, valueLabel: '100%' },
      { label: 'Alpha Gen (Sim)', value: 45, valueLabel: '+12.4%' },
    ],
  },
  {
    id: 'PRJ-004',
    name: 'Field Ops Mobile Client',
    problem: 'Ketidaksesuaian input petugas lapangan karena absennya portal log yang tervalidasi sensor perangkat (GPS/Camera).',
    solution: 'Penyusunan arsitektur seluler modular menggunakan React Native yang terhubung sinkron ke remote database.',
    stack: ['React Native', 'Expo', 'Supabase', 'Geolocation'],
    result: 'Log lapangan terpusat, divalidasi dengan checksum koordinat otentik dalam satu bundel APK mandiri.',
    metrics: [
      { label: 'Data Integrity', value: 98, valueLabel: '98.5%' },
      { label: 'Sync Latency', value: 20, valueLabel: '<2s' },
      { label: 'Adoption Rate', value: 100, valueLabel: '100% Ops' },
    ],
  },
  {
    id: 'PRJ-005',
    name: 'Prod-Monitor Dashboard',
    problem: 'Manajemen memantau status stasiun secara tersekat, tanpa aliran data terpusat (blind-spot metrik).',
    solution: 'Menciptakan Single Page Application (SPA) reaktif yang melakukan polling stateful pada REST endpoints dari seluruh sensor pabrik.',
    stack: ['React', 'Vite', 'Tailwind', 'Node.js'],
    result: 'Pusat observasi data komprehensif, mengurai state downtime secara instan di layar wall-monitor.',
    metrics: [
      { label: 'Update Freq.', value: 100, valueLabel: '1000ms' },
      { label: 'Downtime Detection', value: 80, valueLabel: '-80% TTd' },
      { label: 'Payload Size', value: 15, valueLabel: '<10kb/req' },
    ],
  },
];

/**
 * Client/Website Projects — deployed web solutions for clients
 * These are live website projects built for real businesses
 */
export const websiteProjects: Project[] = [
  {
    id: 'WEB-001',
    name: 'Nuansa Solution — Digital Consulting Platform',
    problem: 'Klien membutuhkan kehadiran digital profesional untuk layanan konsultasi mediasi dan solusi hukum, namun tidak memiliki platform web yang representatif.',
    solution: 'Merancang dan membangun platform corporate SPA dengan arsitektur React + Vite, dilengkapi SEO terstruktur, schema markup, dan desain premium responsif.',
    stack: ['React', 'Vite', 'Tailwind', 'SEO'],
    result: 'Platform live di nuansasolution.id dengan performa lighthouse tinggi dan konversi lead organik yang meningkat.',
    url: 'https://nuansasolution.id',
    metrics: [
      { label: 'Lighthouse Score', value: 92, valueLabel: '92/100' },
      { label: 'Load Time', value: 85, valueLabel: '<1.5s' },
      { label: 'Mobile UX', value: 95, valueLabel: '95%' },
    ],
  },
  {
    id: 'WEB-002',
    name: 'Nuansa Legal — Corporate Legal Services',
    problem: 'Firma legal membutuhkan identitas digital yang kredibel untuk menjangkau klien potensial secara online tanpa kehilangan kesan formal dan terpercaya.',
    solution: 'Membangun website korporat dengan tone profesional, navigasi intuitif, dan integrasi kontak langsung untuk konsultasi legal.',
    stack: ['React', 'Vite', 'Tailwind', 'Responsive'],
    result: 'Website berhasil menjadi kanal digital utama perusahaan untuk akuisisi klien baru.',
    url: 'https://nuansalegal.id',
    metrics: [
      { label: 'Client Reach', value: 78, valueLabel: '+78%' },
      { label: 'Bounce Rate', value: 25, valueLabel: '25%' },
      { label: 'SEO Index', value: 88, valueLabel: 'Indexed' },
    ],
  },
  {
    id: 'WEB-003',
    name: 'APTO Document Generator — Automated Legal Docs',
    problem: 'Proses pembuatan surat resmi dan dokumen legal masih manual, memakan waktu, dan rawan inkonsistensi format.',
    solution: 'Mengembangkan web app PWA dengan React yang mengotomasi pembuatan surat legal & bisnis melalui template engine dan export PDF real-time.',
    stack: ['React', 'html2pdf.js', 'PWA', 'Template Engine'],
    result: 'Ribuan dokumen tergenerate otomatis, mengurangi waktu pembuatan surat dari menit ke detik.',
    url: 'https://generator.nuansasolution.id',
    metrics: [
      { label: 'Generation Speed', value: 95, valueLabel: '<3 detik' },
      { label: 'Template Count', value: 70, valueLabel: '15+ Types' },
      { label: 'User Rating', value: 98, valueLabel: '4.9/5.0' },
    ],
  },
  {
    id: 'WEB-004',
    name: 'PT Anugerah Senantiasa Bersyukur — Industrial Solutions',
    problem: 'Perusahaan penyedia solusi industri multi-sektor (mining, healthcare, manufacturing) tidak memiliki katalog digital yang mempresentasikan kapabilitas secara terstruktur.',
    solution: 'Membangun website korporat premium dengan showcase produk lintas sektor, desain dark-industrial, dan arsitektur React modern dengan optimasi OG metadata.',
    stack: ['React', 'Vite', 'Tailwind', 'Inter/Outfit'],
    result: 'Kehadiran digital profesional yang memperkuat positioning perusahaan di sektor B2B industrial.',
    url: 'https://anugerahsenantiasabersyukur.com',
    metrics: [
      { label: 'Product Catalog', value: 90, valueLabel: '5 Sectors' },
      { label: 'Brand Authority', value: 85, valueLabel: '+85%' },
      { label: 'Load Performance', value: 88, valueLabel: '88/100' },
    ],
  },
  {
    id: 'WEB-005',
    name: 'PT Sanita Akses Nusantara — Kitchen Industrial',
    problem: 'Perusahaan procurement kitchen industrial & general trading di Bogor kesulitan menampilkan portofolio layanan secara digital kepada klien korporat.',
    solution: 'Mengembangkan website perusahaan dengan structured data (JSON-LD LocalBusiness), Google Search verification, dan desain responsif yang menonjolkan sertifikasi HACCP.',
    stack: ['React', 'Vite', 'JSON-LD', 'Google SEO'],
    result: 'Website terindeks Google dengan rich snippets, meningkatkan visibilitas perusahaan di pencarian lokal Bogor.',
    url: 'https://sanitaaksesnusantara.com',
    metrics: [
      { label: 'Google Index', value: 100, valueLabel: 'Verified' },
      { label: 'Local SEO', value: 82, valueLabel: 'Top 5' },
      { label: 'Inquiry Rate', value: 65, valueLabel: '+65%' },
    ],
  },
  {
    id: 'WEB-006',
    name: 'LapanLapan Dimsum — F&B Product Catalog',
    problem: 'Brand kuliner frozen dimsum premium memerlukan katalog digital yang menarik untuk distribusi agen dan pemesanan langsung.',
    solution: 'Membangun landing page ringan di Cloudflare Workers edge runtime, dengan katalog produk interaktif dan integrasi WhatsApp order.',
    stack: ['Cloudflare Workers', 'React', 'Edge Runtime', 'WhatsApp API'],
    result: 'Katalog produk yang ringan dan cepat diakses dari mana saja, mendukung konversi pemesanan via WhatsApp.',
    url: 'https://dimsum.bangzaky0029.workers.dev',
    metrics: [
      { label: 'TTFB', value: 95, valueLabel: '<50ms' },
      { label: 'Edge Locations', value: 100, valueLabel: 'Global CDN' },
      { label: 'Order Conversion', value: 45, valueLabel: '+45%' },
    ],
  },
  {
    id: 'WEB-007',
    name: 'MBell MakeUp — Professional MUA Portfolio',
    problem: 'Makeup artist profesional membutuhkan portfolio digital yang menampilkan karya dengan estetika tinggi dan nuansa luxury branding.',
    solution: 'Merancang website portfolio dengan tipografi Cormorant Garamond & Lato, galeri visual high-end, dan desain yang memancarkan kesan eksklusif dan elegan.',
    stack: ['React', 'Vite', 'Vercel', 'Custom Typography'],
    result: 'Portfolio digital premium yang menjadi referensi utama klien untuk booking layanan MUA.',
    url: 'https://mbellmakeup.vercel.app',
    metrics: [
      { label: 'Visual Appeal', value: 96, valueLabel: '96/100' },
      { label: 'Client Booking', value: 70, valueLabel: '+70%' },
      { label: 'Mobile Score', value: 92, valueLabel: '92/100' },
    ],
  },
  {
    id: 'WEB-008',
    name: 'Ruang Imaji — Premium Creative Agency',
    problem: 'Creative agency di Jakarta membutuhkan website yang mencerminkan identitas brand sinematik, eksklusif, dan visioner.',
    solution: 'Mengembangkan website agency premium dengan Playfair Display typography, cinematic gold palette (#c5a059), preloader animasi, dan narasi visual immersive menggunakan Framer Motion.',
    stack: ['React', 'Framer Motion', 'Supabase', 'Vercel'],
    result: 'Platform digital yang menjadi showroom virtual agency, memperkuat brand positioning premium di industri kreatif Jakarta.',
    url: 'https://ruangimaji.vercel.app',
    metrics: [
      { label: 'Brand Impression', value: 98, valueLabel: '98/100' },
      { label: 'Avg. Session', value: 75, valueLabel: '4.2 min' },
      { label: 'Lead Quality', value: 88, valueLabel: '+88%' },
    ],
  },
];

/** All projects combined */
export const allProjects: Project[] = [...technicalProjects, ...websiteProjects];
