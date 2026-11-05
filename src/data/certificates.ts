// C:\codingVibes\myPortfolio\bangzaky-portfolio\src\data\certificates.ts

export interface CertificateItem {
  id: string;
  title: string;
  shortTitle: string;
  issuer: string;
  category: string;
  year: string;
  fileUrl: string;
  fileName: string;
  credentialId?: string;
}

export const certificatesList: CertificateItem[] = [
  {
    id: 'cert-web',
    title: 'Pelatihan Pemrograman Web',
    shortTitle: 'Web Programming',
    issuer: 'Digitalent Scholarship (DTS) / Kominfo RI',
    category: 'Frontend & Web Architecture',
    year: '2023',
    fileUrl: '/sertifikat/sertifikat-pelatihan-pemrograman-web.pdf',
    fileName: 'Sertifikat_Pelatihan_Pemrograman_Web_Zaky.pdf',
    credentialId: 'DTS-WEB-2023',
  },
  {
    id: 'cert-db-design',
    title: 'Database Design',
    shortTitle: 'Oracle DB Design',
    issuer: 'Oracle Academy',
    category: 'Database Architecture',
    year: '2023',
    fileUrl: '/sertifikat/sertifikat-database-design-oracle.pdf',
    fileName: 'Sertifikat_Database_Design_Oracle_Zaky.pdf',
    credentialId: 'ORCL-DBD-8820',
  },
  {
    id: 'cert-db-foundations',
    title: 'Database Foundations',
    shortTitle: 'Oracle DB Foundations',
    issuer: 'Oracle Academy',
    category: 'Database Foundations',
    year: '2023',
    fileUrl: '/sertifikat/sertifikat-database-foundations-oracle.pdf',
    fileName: 'Sertifikat_Database_Foundations_Oracle_Zaky.pdf',
    credentialId: 'ORCL-DBF-4412',
  },
  {
    id: 'cert-iot',
    title: 'Internet of Things (IoT)',
    shortTitle: 'IoT & Systems',
    issuer: 'Digital Talent Scholarship & BDI',
    category: 'Hardware & Microcontrollers',
    year: '2023',
    fileUrl: '/sertifikat/sertifikat-iot-dts.pdf',
    fileName: 'Sertifikat_Internet_Of_Things_Zaky.pdf',
    credentialId: 'DTS-IOT-6091',
  },
  {
    id: 'cert-english',
    title: 'English B1 Pre-Intermediate',
    shortTitle: 'English B1 Course',
    issuer: 'Interpiece Course, Kampung Inggris Pare',
    category: 'Global Communication',
    year: '2023',
    fileUrl: '/sertifikat/sertifikat-english-b1-kampung-inggris.pdf',
    fileName: 'Sertifikat_English_B1_Zaky.pdf',
    credentialId: 'PAR-ENG-B1',
  },
  {
    id: 'cert-himti',
    title: 'Pengurus Himpunan Mahasiswa TI',
    shortTitle: 'HIMTI Leadership',
    issuer: 'HIMTI Universitas Dian Nusantara',
    category: 'Leadership & Teamwork',
    year: '2022 - 2023',
    fileUrl: '/sertifikat/sertifikat-himti.pdf',
    fileName: 'Sertifikat_HIMTI_Zaky.pdf',
    credentialId: 'HIMTI-UNPAM-2223',
  },
];

