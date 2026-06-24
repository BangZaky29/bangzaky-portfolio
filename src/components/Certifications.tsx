import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText, Award, X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from 'lucide-react';
import { certifications, cvData } from '../data/certifications';

// Import CV and certificate files for Vite bundling
import cvFile from '../assets/myCV/My-CV.pdf';
import cert1 from '../assets/sertifikat/Sertifikat Pelatihan Pemograman Web.pdf';
import cert2 from '../assets/sertifikat/Sertifikat Penghargaan Penyelesaian Kursus (Database Design) Oracle.pdf';
import cert3 from '../assets/sertifikat/Sertifikat Penghargaan Penyelesaian Kursus (Database Foundations) Oracle.pdf';
import cert4 from '../assets/sertifikat/Sertifikat-JagoSpeaking-B1_Pre-Intermediate-(Kampung Ingris Pare-Interpiece Course).pdf';
import cert5 from '../assets/sertifikat/Sertifikat_HIMTI.pdf';
import cert6 from '../assets/sertifikat/Sertifikat_Internet Of Things (IoT).pdf';

const certFiles: Record<string, string> = {
  'CERT-001': cert1,
  'CERT-002': cert2,
  'CERT-003': cert3,
  'CERT-004': cert4,
  'CERT-005': cert5,
  'CERT-006': cert6,
};

/**
 * Certifications & CV Download Section
 * Displays professional certifications with clickable PDF viewer modal
 */
export function Certifications() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categoryIcons: Record<string, string> = {
    technical: '⚙️',
    database: '🗄️',
    language: '🌐',
  };

  const categoryColors: Record<string, string> = {
    technical: '#3B82F6',
    database: '#F59E0B',
    language: '#10B981',
  };

  const selectedCert = selectedIdx !== null ? certifications[selectedIdx] : null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') setSelectedIdx(i => i !== null ? (i + 1) % certifications.length : 0);
      if (e.key === 'ArrowLeft') setSelectedIdx(i => i !== null ? (i - 1 + certifications.length) % certifications.length : 0);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIdx]);

  const handleCardClick = (idx: number) => {
    setIsLoading(true);
    setSelectedIdx(idx);
    setTimeout(() => setIsLoading(false), 600);
  };

  const goNext = () => {
    setIsLoading(true);
    setSelectedIdx(i => i !== null ? (i + 1) % certifications.length : 0);
    setTimeout(() => setIsLoading(false), 400);
  };

  const goPrev = () => {
    setIsLoading(true);
    setSelectedIdx(i => i !== null ? (i - 1 + certifications.length) % certifications.length : 0);
    setTimeout(() => setIsLoading(false), 400);
  };

  return (
    <>
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
          <span className="font-mono text-[10px] text-[#06B6D4]">06 //</span>
          <h2 className="text-xs sm:text-sm font-bold text-[#F9FAFB] font-mono tracking-widest uppercase">Certifications</h2>
        </div>

        {/* CV Download — Primary Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-5 rounded-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border border-[#3B82F6]/30 bg-[#3B82F6]/10 rounded-sm">
                <FileText size={18} className="text-[#3B82F6]" />
              </div>
              <div>
                <div className="font-mono text-[9px] text-[#3B82F6] uppercase tracking-wider mb-0.5">Primary Document</div>
                <div className="text-sm font-bold text-[#E0E2E5]">Curriculum Vitae — Zaky Aulia Qolbi</div>
              </div>
            </div>
            <a
              href={cvFile}
              download="Zaky_Aulia_Qolbi_CV.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E0E2E5] text-[#0F1115] text-[11px] font-mono uppercase font-bold hover:bg-white transition-colors rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
            >
              <Download size={13} />
              {cvData.label}
            </a>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4, boxShadow: `0 10px 30px -10px ${categoryColors[cert.category]}40` }}
              onClick={() => handleCardClick(idx)}
              className="group relative border border-[#1F2937] bg-[#161B22]/50 p-4 rounded-sm hover:border-transparent transition-all duration-300 cursor-pointer hover:bg-[#161B22]/80"
              style={{
                '--hover-color': categoryColors[cert.category]
              } as React.CSSProperties}
            >
              {/* Dynamic border gradient on hover */}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[var(--hover-color)]/0 via-[var(--hover-color)]/0 to-[var(--hover-color)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-[-1px] rounded-sm bg-gradient-to-b from-[var(--hover-color)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              {/* Click hint */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-1 font-mono text-[8px] text-[#3B82F6]/60 uppercase tracking-wider">
                  <ZoomIn size={9} />
                  <span>view</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center border rounded-sm flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: `${categoryColors[cert.category]}30`,
                    backgroundColor: `${categoryColors[cert.category]}10`,
                  }}
                >
                  <Award size={14} style={{ color: categoryColors[cert.category] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: categoryColors[cert.category] }}>
                    {categoryIcons[cert.category]} {cert.category}
                  </div>
                  <div className="text-[12px] font-bold text-[#E0E2E5] leading-snug mb-1 group-hover:text-white transition-colors">
                    {cert.title}
                  </div>
                  <div className="text-[10px] text-[#8B949E] font-mono">
                    {cert.issuer}
                  </div>
                </div>
              </div>

              {/* Bottom shimmer line on hover - dynamically colored */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--hover-color)] to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', originX: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Status Footer */}
        <div className="font-mono text-[9px] text-[#30363D] flex items-center gap-2 pt-2">
          <span className="w-1 h-1 bg-[#10B981] rounded-full"></span>
          <span>{certifications.length} certificates verified // archive integrity: OK</span>
        </div>
      </section>

      {/* ── Certificate Viewer Modal ── */}
      <AnimatePresence>
        {selectedCert !== null && selectedIdx !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedIdx(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Panel — slides up from bottom */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 0.8 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col"
              style={{ height: '92dvh' }}
            >
              <div className="relative flex flex-col h-full bg-[#0D1117] border-t border-[#1F2937] rounded-t-xl overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.6)]">

                {/* Drag handle indicator */}
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 bg-[#30363D] rounded-full" />
                </div>

                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F2937] flex-shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-7 h-7 flex items-center justify-center border rounded-sm flex-shrink-0"
                      style={{
                        borderColor: `${categoryColors[selectedCert.category]}30`,
                        backgroundColor: `${categoryColors[selectedCert.category]}10`,
                      }}
                    >
                      <Award size={12} style={{ color: categoryColors[selectedCert.category] }} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[8px] uppercase tracking-wider mb-0.5" style={{ color: categoryColors[selectedCert.category] }}>
                        {categoryIcons[selectedCert.category]} {selectedCert.category} · {selectedIdx + 1}/{certifications.length}
                      </div>
                      <div className="text-[11px] font-bold text-[#E0E2E5] truncate">{selectedCert.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    {/* Prev / Next */}
                    <button
                      onClick={goPrev}
                      className="w-7 h-7 flex items-center justify-center border border-[#1F2937] hover:border-[#30363D] hover:bg-[#161B22] rounded-sm transition-all text-[#8B949E] hover:text-[#E0E2E5]"
                      title="Previous certificate"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={goNext}
                      className="w-7 h-7 flex items-center justify-center border border-[#1F2937] hover:border-[#30363D] hover:bg-[#161B22] rounded-sm transition-all text-[#8B949E] hover:text-[#E0E2E5]"
                      title="Next certificate"
                    >
                      <ChevronRight size={14} />
                    </button>

                    {/* Open in new tab */}
                    <a
                      href={certFiles[selectedCert.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center border border-[#1F2937] hover:border-[#30363D] hover:bg-[#161B22] rounded-sm transition-all text-[#8B949E] hover:text-[#3B82F6]"
                      title="Open in new tab"
                    >
                      <ExternalLink size={13} />
                    </a>

                    {/* Download */}
                    <a
                      href={certFiles[selectedCert.id]}
                      download={selectedCert.fileName}
                      className="w-7 h-7 flex items-center justify-center border border-[#1F2937] hover:border-[#30363D] hover:bg-[#161B22] rounded-sm transition-all text-[#8B949E] hover:text-[#10B981]"
                      title="Download certificate"
                    >
                      <Download size={13} />
                    </a>

                    {/* Close */}
                    <button
                      onClick={() => setSelectedIdx(null)}
                      className="w-7 h-7 flex items-center justify-center border border-[#1F2937] hover:border-[#FF4444]/40 hover:bg-[#FF4444]/10 rounded-sm transition-all text-[#8B949E] hover:text-[#FF6666]"
                      title="Close (Esc)"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer — animates on cert change */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCert.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="flex-1 relative overflow-hidden"
                  >
                    {isLoading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0D1117]">
                        <div className="flex flex-col items-center gap-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 border-2 border-[#1F2937] border-t-[#3B82F6] rounded-full"
                          />
                          <span className="font-mono text-[9px] text-[#30363D] uppercase tracking-wider">loading certificate...</span>
                        </div>
                      </div>
                    )}
                    <iframe
                      src={`${certFiles[selectedCert.id]}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                      className="w-full h-full border-0"
                      title={selectedCert.title}
                      onLoad={() => setIsLoading(false)}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Footer navigation dots */}
                <div className="flex items-center justify-center gap-2 py-3 border-t border-[#0F1419] flex-shrink-0">
                  {certifications.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleCardClick(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === selectedIdx
                          ? 'w-4 h-1.5 bg-[#3B82F6]'
                          : 'w-1.5 h-1.5 bg-[#30363D] hover:bg-[#8B949E]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
