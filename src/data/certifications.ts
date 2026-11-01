/**
 * Certifications & CV Data
 * File paths point to assets inside public/sertifikat/ and public/myCV/
 */

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: 'technical' | 'language' | 'database';
  fileName: string;
  downloadName?: string;
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
    fileName: 'sertifikat-pelatihan-pemrograman-web.pdf',
    downloadName: 'Sertifikat Pelatihan Pemrograman Web - Zaky Aulia Qolbi.pdf',
  },
  {
    id: 'CERT-002',
    title: 'Database Design — Oracle Academy',
    issuer: 'Oracle',
    category: 'database',
    fileName: 'sertifikat-database-design-oracle.pdf',
    downloadName: 'Sertifikat Database Design Oracle - Zaky Aulia Qolbi.pdf',
  },
  {
    id: 'CERT-003',
    title: 'Database Foundations — Oracle Academy',
    issuer: 'Oracle',
    category: 'database',
    fileName: 'sertifikat-database-foundations-oracle.pdf',
    downloadName: 'Sertifikat Database Foundations Oracle - Zaky Aulia Qolbi.pdf',
  },
  {
    id: 'CERT-004',
    title: 'English B1 Pre-Intermediate',
    issuer: 'Kampung Inggris Pare — Interpiece Course',
    category: 'language',
    fileName: 'sertifikat-english-b1-kampung-inggris.pdf',
    downloadName: 'Sertifikat English B1 Kampung Inggris - Zaky Aulia Qolbi.pdf',
  },
  {
    id: 'CERT-005',
    title: 'Pengurus Himpunan Mahasiswa Teknik Informatika (HIMTI)',
    issuer: 'Universitas',
    category: 'technical',
    fileName: 'sertifikat-himti.pdf',
    downloadName: 'Sertifikat Pengurus HIMTI - Zaky Aulia Qolbi.pdf',
  },
  {
    id: 'CERT-006',
    title: 'Internet Of Things (IoT) Training',
    issuer: 'Digital Talent Scholarship',
    category: 'technical',
    fileName: 'sertifikat-iot-dts.pdf',
    downloadName: 'Sertifikat IoT Digital Talent Scholarship - Zaky Aulia Qolbi.pdf',
  },
];

export const cvData: CVData = {
  fileName: 'Zaky-Aulia-Qolbi-CV.pdf',
  label: 'Download_CV()',
};
