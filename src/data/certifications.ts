/**
 * Certifications & CV Data
 * File paths point to assets inside src/assets/
 */

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: 'technical' | 'language' | 'database';
  fileName: string;
}

export interface CVData {
  fileName: string;
  label: string;
}

export const certifications: Certification[] = [
  {
    id: 'CERT-001',
    title: 'Pelatihan Pemrograman Web',
    issuer: 'Training Institute',
    category: 'technical',
    fileName: 'Sertifikat Pelatihan Pemograman Web.pdf',
  },
  {
    id: 'CERT-002',
    title: 'Database Design — Oracle Academy',
    issuer: 'Oracle',
    category: 'database',
    fileName: 'Sertifikat Penghargaan Penyelesaian Kursus (Database Design) Oracle.pdf',
  },
  {
    id: 'CERT-003',
    title: 'Database Foundations — Oracle Academy',
    issuer: 'Oracle',
    category: 'database',
    fileName: 'Sertifikat Penghargaan Penyelesaian Kursus (Database Foundations) Oracle.pdf',
  },
  {
    id: 'CERT-004',
    title: 'English B1 Pre-Intermediate',
    issuer: 'Kampung Inggris Pare — Interpiece Course',
    category: 'language',
    fileName: 'Sertifikat-JagoSpeaking-B1_Pre-Intermediate-(Kampung Ingris Pare-Interpiece Course).pdf',
  },
  {
    id: 'CERT-005',
    title: 'Pengurus Himpunan Mahasiswa Teknik Informatika (HIMTI)',
    issuer: 'Universitas',
    category: 'technical',
    fileName: 'Sertifikat_HIMTI.pdf',
  },
  {
    id: 'CERT-006',
    title: 'Internet Of Things (IoT) Training',
    issuer: 'Digital Talent Scholarship',
    category: 'technical',
    fileName: 'Sertifikat_Internet Of Things (IoT).pdf',
  },
];

export const cvData: CVData = {
  fileName: 'My-CV.pdf',
  label: 'Download_CV()',
};
