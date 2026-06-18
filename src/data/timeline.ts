/**
 * Career Timeline Events
 * Used by Timeline sidebar component
 */

export interface TimelineEvent {
  year: string;
  role: string;
  description: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: 'Phase 03',
    role: 'Full-Stack Software Engineer',
    description: 'Bekerja proaktif merancang arsitektur mandiri. Dari struktur data, injeksi engine AI, hingga deployment automasi untuk metrics optimasi klien.',
  },
  {
    year: 'Phase 02',
    role: 'Tech Evolution & Architecture',
    description: 'Integrasi mobile client, pengembangan model computer vision (YOLO), pengelolaan state server-side frontend, dan administrasi instansi jaringan.',
  },
  {
    year: 'Phase 01',
    role: 'Production Supervisor',
    description: 'Mengendalikan ritme pabrik manual hingga bermanuver menjadi arsitek kodifikasi berkat urgensi atas efisiensi otomasi operasional.',
  },
];
