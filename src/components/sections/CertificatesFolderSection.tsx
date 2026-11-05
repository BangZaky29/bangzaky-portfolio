// C:\codingVibes\myPortfolio\bangzaky-portfolio\src\components\sections\CertificatesFolderSection.tsx
import React, { useState } from 'react';
import {
  Download,
  Eye,
  Check,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import Folder from '@/components/Folder.jsx';
import { LightingMode } from '../../types';
import { certificatesList, CertificateItem } from '../../data/certificates';
import { ScrambleText, RevealTitle, FadeUp } from '../motion/RevealText';

interface CertificatesFolderSectionProps {
  lightingMode: LightingMode;
  onShowToast: (msg: string) => void;
}

type DownloadStatus = 'idle' | 'loading' | 'success';

export function CertificatesFolderSection({
  lightingMode,
  onShowToast,
}: CertificatesFolderSectionProps) {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadStatus>>({});

  const isUV = lightingMode === 'uv';

  const handleDownload = async (cert: CertificateItem, e?: React.MouseEvent | React.PointerEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (downloadStates[cert.id] === 'loading') return;

    // 1. Tampilkan animasi spin loading
    setDownloadStates((prev) => ({ ...prev, [cert.id]: 'loading' }));

    try {
      // Unduh berkas PDF sebagai blob langsung ke memori browser
      const response = await fetch(cert.fileUrl);
      if (!response.ok) throw new Error('Gagal mengambil file PDF');
      const blob = await response.blob();

      // Jeda visual (~850ms) agar animasi spin terasa natural dan meyakinkan
      await new Promise((resolve) => setTimeout(resolve, 850));

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = cert.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      // 2. Tampilkan animasi check tanda sukses
      setDownloadStates((prev) => ({ ...prev, [cert.id]: 'success' }));
      onShowToast(`✓ Berkas "${cert.title}" berhasil diunduh.`);

      // 3. Reset kembali ke ikon normal setelah 2.5 detik
      setTimeout(() => {
        setDownloadStates((prev) => ({ ...prev, [cert.id]: 'idle' }));
      }, 2500);
    } catch (err) {
      console.warn('Menggunakan fallback unduh langsung:', err);
      const link = document.createElement('a');
      link.href = cert.fileUrl;
      link.download = cert.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadStates((prev) => ({ ...prev, [cert.id]: 'success' }));
      onShowToast(`✓ Berkas "${cert.title}" berhasil diunduh.`);
      setTimeout(() => {
        setDownloadStates((prev) => ({ ...prev, [cert.id]: 'idle' }));
      }, 2500);
    }
  };

  const handleOpenPreview = (cert: CertificateItem, e?: React.MouseEvent | React.PointerEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    window.open(cert.fileUrl, '_blank', 'noopener,noreferrer');
    onShowToast(`Membuka berkas "${cert.title}" di tab baru...`);
  };

  // Format custom item card inside the 3D folder
  const folderItems = certificatesList.map((cert) => {
    const status = downloadStates[cert.id] || 'idle';

    return {
      title: cert.shortTitle,
      description: cert.issuer,
      content: (
        <div className="flex flex-col justify-between h-full w-full select-none text-left p-3 sm:p-3.5 bg-white text-slate-800 box-border rounded-[inherit] overflow-hidden">
          <div className="space-y-1">
            {/* Category Pill & Badge */}
            <div className="flex items-center justify-between gap-1">
              <span
                className={`font-mono text-[8px] font-bold px-1.5 py-0.5 rounded truncate max-w-[100px] leading-tight ${
                  isUV ? 'bg-purple-100 text-purple-700' : 'bg-cyan-100 text-cyan-800'
                }`}
              >
                {cert.shortTitle}
              </span>
              <span className="font-mono text-[7.5px] font-bold text-slate-500 bg-slate-100 px-1 py-0.5 rounded leading-none shrink-0">
                PDF
              </span>
            </div>

            {/* Certificate Title */}
            <h4 className="font-sans font-bold text-[11px] leading-tight text-slate-900 line-clamp-2">
              {cert.title}
            </h4>

            {/* Issuer */}
            <p className="font-sans text-[8.5px] font-medium text-slate-500 line-clamp-1">
              {cert.issuer}
            </p>
          </div>

          {/* Certificate Decorative Ribbon / Seal */}
          <div className="my-auto py-1.5 flex flex-col items-center justify-center gap-1 opacity-70">
            <div className="w-full flex items-center gap-1.5">
              <div className="h-[1px] bg-slate-200 flex-1" />
              <span className="font-mono text-[6.5px] tracking-wider text-slate-400 uppercase font-semibold">
                VERIFIED CREDENTIAL
              </span>
              <div className="h-[1px] bg-slate-200 flex-1" />
            </div>
            <div className="h-[2px] bg-slate-100 rounded-full w-3/4 mx-auto" />
          </div>

          {/* Action Button: Year & Icon-only Buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 mt-auto shrink-0">
            <span className="font-mono text-[8px] font-bold text-slate-400">
              {cert.year}
            </span>

            {/* Action Buttons (Icon Only) */}
            <div className="flex items-center gap-1.5" data-prevent-folder-drag>
              {/* Button Lihat / Buka PDF (Icon Only) */}
              <button
                type="button"
                data-prevent-folder-drag
                onClick={(e) => handleOpenPreview(cert, e)}
                onPointerDown={(e) => e.stopPropagation()}
                className={`p-1.5 rounded-md transition-all cursor-pointer border active:scale-90 ${
                  isUV
                    ? 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200/60'
                    : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border-cyan-200/60'
                }`}
                title={`Buka / Lihat Dokumen PDF (${cert.shortTitle})`}
                aria-label="Lihat PDF"
              >
                <Eye className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* Button Unduh PDF (Icon Only with Spin & Check Animation) */}
              <button
                type="button"
                data-prevent-folder-drag
                disabled={status === 'loading'}
                onClick={(e) => handleDownload(cert, e)}
                onPointerDown={(e) => e.stopPropagation()}
                className={`p-1.5 rounded-md transition-all cursor-pointer shadow-sm active:scale-90 text-white ${
                  status === 'loading'
                    ? 'bg-slate-400 cursor-wait'
                    : status === 'success'
                    ? 'bg-emerald-600 shadow-emerald-500/30'
                    : isUV
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                }`}
                title={
                  status === 'loading'
                    ? 'Sedang mengunduh berkas...'
                    : status === 'success'
                    ? 'Berhasil Diunduh!'
                    : `Unduh Berkas PDF (${cert.shortTitle})`
                }
                aria-label="Unduh PDF"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-3.5 h-3.5 shrink-0 animate-spin" />
                ) : status === 'success' ? (
                  <Check className="w-3.5 h-3.5 shrink-0 animate-pulse text-white" />
                ) : (
                  <Download className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="certificates" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none -z-10 ${
          isUV ? 'bg-purple-600/10' : 'bg-cyan-500/10'
        }`}
      />

      <div className="w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1E293B]/60">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-2">
              <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>04.1</span>
              <span>/</span>
              <ScrambleText
                text="VERIFIED CREDENTIALS & LICENSES"
                triggerOnHover
                className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
              />
            </div>

            <RevealTitle
              text="ACADEMIC & PROFESSIONAL CERTIFICATES"
              highlightWords={['PROFESSIONAL', 'CERTIFICATES']}
              highlightClassName={isUV ? 'text-purple-400' : 'text-cyan-400'}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
            />
          </div>

          <FadeUp delay={0.2}>
            <p className="text-sm font-mono text-[#94A3B8] max-w-md">
              Koleksi sertifikasi resmi PDF di bidang Web Architecture, Oracle Database, IoT, dan Komunikasi Bahasa Inggris. Klik folder 3D di bawah untuk membuka dan mengunduh berkas langsung.
            </p>
          </FadeUp>
        </div>

        {/* 3D Interactive Folder Display Stage */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1E293B] bg-[#0A0D15]/80 text-[#94A3B8] text-xs font-mono">
            <FolderOpen className={`w-3.5 h-3.5 ${isUV ? 'text-purple-400' : 'text-cyan-400'}`} />
            <span>Klik folder untuk membuka / menutup • Klik surat untuk zoom & aksi PDF</span>
          </div>

          {/* 3D Folder Container */}
          <div className="relative py-8 sm:py-12 flex items-center justify-center min-h-[360px] sm:min-h-[420px] w-full max-w-2xl overflow-visible">
            <Folder
              label="Certificates"
              tabPosition="center"
              color={isUV ? '#7C3AED' : '#2563EB'}
              paperColor="#FFFFFF"
              size={1.38}
              layout="spread"
              zoomOnClick={true}
              draggable={true}
              peek={true}
              openOn="click"
              open={isFolderOpen}
              onOpenChange={setIsFolderOpen}
              onItemClick={(item, index) => {
                if (certificatesList[index]) {
                  setSelectedCert(certificatesList[index]);
                }
              }}
              items={folderItems}
              className="mx-auto"
            />
          </div>

          {/* Status Helper */}
          <p className="text-xs font-mono text-[#64748B]">
            {isFolderOpen
              ? '✦ Folder terbuka: Klik salah satu dokumen untuk fokus, lihat preview, atau unduh berkas PDF.'
              : '✦ Klik folder di atas untuk membuka seluruh berkas sertifikat.'}
          </p>
        </div>
      </div>
    </section>
  );
}
