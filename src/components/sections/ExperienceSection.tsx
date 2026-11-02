import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Compass } from 'lucide-react';
import { LightingMode } from '../../types';
import { timelineMilestones } from '../../data/timeline';
import { certifications } from '../../data/certifications';
import { ScrambleText, RevealTitle } from '../motion/RevealText';
import { SpotlightRoom } from '../experience/SpotlightRoom';
import { soundEngine } from '../../audio/soundEngine';
import { smoothScrollTo } from '../motion/SmoothScroll';

interface ExperienceSectionProps {
  lightingMode: LightingMode;
}

export function ExperienceSection({ lightingMode }: ExperienceSectionProps) {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const lastStepTimeRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isUV = lightingMode === 'uv';
  const selectedCertObj = certifications.find((c) => c.id === activeCert);

  const handleSelectMilestone = (idx: number) => {
    setActiveMilestoneIndex(idx);
    soundEngine.playSlide();
  };

  // ═══════════════════════════════════════════════════════════════════
  // DISCRETE STEPPER: 1 SCROLL DI WEB & 1 USAPAN DI MOBILE = 1 TAHUN KARIER
  // Mencegah kebablasan dengan cooldown 500ms, transisi tetap halus
  // ═══════════════════════════════════════════════════════════════════
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 1. Desktop Wheel Event Listener
    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const isDocked = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.55;
      if (!isDocked) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 18) return;

      const now = Date.now();
      const timeSinceLast = now - lastStepTimeRef.current;

      if (delta > 0) {
        // SCROLL KE BAWAH (Next Milestone)
        if (activeMilestoneIndex < timelineMilestones.length - 1) {
          e.preventDefault();
          e.stopPropagation();

          if (timeSinceLast < 500) return;

          lastStepTimeRef.current = now;
          soundEngine.playSlide();
          setActiveMilestoneIndex((prev) => prev + 1);
        } else {
          // Di tahun terakhir (2026): scroll berikutnya meluncur mulus ke section Contact
          if (timeSinceLast > 600) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            smoothScrollTo('#contact', -56);
          }
        }
      } else if (delta < 0) {
        // SCROLL KE ATAS (Previous Milestone)
        if (activeMilestoneIndex > 0) {
          e.preventDefault();
          e.stopPropagation();

          if (timeSinceLast < 500) return;

          lastStepTimeRef.current = now;
          soundEngine.playSlide();
          setActiveMilestoneIndex((prev) => prev - 1);
        } else {
          // Di tahun awal (2022): scroll ke atas meluncur kembali ke section Work
          if (timeSinceLast > 600) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            smoothScrollTo('#work', -56);
          }
        }
      }
    };

    // 2. Mobile / Tablet Touch Gestures (1x Usapan = 1 Tahun)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || touchStartXRef.current === null) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      const deltaX = touchStartXRef.current - e.touches[0].clientX;

      const rect = el.getBoundingClientRect();
      const isDocked = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.55;

      if (isDocked && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        if (deltaY > 0 && activeMilestoneIndex < timelineMilestones.length - 1) {
          if (e.cancelable) e.preventDefault();
        } else if (deltaY < 0 && activeMilestoneIndex > 0) {
          if (e.cancelable) e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const endY = e.changedTouches[0].clientY;
      const diffY = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      touchStartXRef.current = null;

      const rect = el.getBoundingClientRect();
      const isDocked = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.55;
      if (!isDocked) return;

      const now = Date.now();
      if (now - lastStepTimeRef.current < 450) return;

      // Ambang batas usapan (swipe threshold 35px)
      if (diffY > 35) {
        // 1x Usapan ke atas = Maju 1 tahun
        if (activeMilestoneIndex < timelineMilestones.length - 1) {
          lastStepTimeRef.current = now;
          soundEngine.playSlide();
          setActiveMilestoneIndex((prev) => prev + 1);
        } else {
          lastStepTimeRef.current = now;
          smoothScrollTo('#contact', -56);
        }
      } else if (diffY < -35) {
        // 1x Usapan ke bawah = Mundur 1 tahun
        if (activeMilestoneIndex > 0) {
          lastStepTimeRef.current = now;
          soundEngine.playSlide();
          setActiveMilestoneIndex((prev) => prev - 1);
        } else {
          lastStepTimeRef.current = now;
          smoothScrollTo('#work', -56);
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeMilestoneIndex, timelineMilestones.length]);

  // Persentase kemajuan timeline
  const progressRatio = (activeMilestoneIndex + 1) / Math.max(1, timelineMilestones.length);

  return (
    <section
      id="experience"
      ref={sectionRef}
      data-lenis-prevent
      className="relative min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] flex flex-col justify-between py-5 sm:py-6 border-b border-[#1E2533] overflow-hidden bg-[#08090C] select-none"
    >
      <div className="w-full max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1E293B]/60 shrink-0">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-1.5">
              <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>04</span>
              <span>/</span>
              <ScrambleText
                text="CHRONOLOGICAL SPOTLIGHT ROOM"
                triggerOnHover
                className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
              />
            </div>

            <RevealTitle
              text="EXPERIENCE — TRAJECTORY"
              className="text-2xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white font-sans"
            />
          </div>

          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] max-w-md">
            Evolusi dari supervisi lini manufaktur industri menuju arsitektur software otonom, rekayasa data relasional, dan otomasi AI.
          </p>
        </div>

        {/* Subbar with Discrete Step Telemetry */}
        <div className="flex items-center justify-between text-xs font-mono text-[#64748B] py-2 shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">1X SCROLL = 1 YEAR // CLICK RAIL TO JUMP</span>
            <span className="sm:hidden">1X USAPAN = 1 YEAR // TOUCH TO CYCLE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold">
              {timelineMilestones[activeMilestoneIndex]?.year} ({activeMilestoneIndex + 1}/{timelineMilestones.length})
            </span>
            <span>CHRONOLOGICAL TRACK</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            SPOTLIGHT ROOM STAGE COMPONENT (Image 3 & 4 Ref)
            ═════════════════════════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col justify-center py-2">
          <SpotlightRoom
            milestones={timelineMilestones}
            activeIndex={activeMilestoneIndex}
            onSelectIndex={handleSelectMilestone}
            certifications={certifications}
            onOpenCert={(certId) => setActiveCert(certId)}
            lightingMode={lightingMode}
          />
        </div>

        {/* Bottom Discrete Slide Progress Bar */}
        <div className="pt-2 shrink-0">
          <div className="w-full h-1 bg-[#141B2B] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progressRatio * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`h-full ${
                isUV
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-purple-500 to-cyan-400'
              }`}
            />
          </div>
        </div>

      </div>

      {/* Certificate Preview Modal (Portal Root, Centered & High Z-Index) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedCertObj && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveCert(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.22 }}
                  className="relative w-full max-w-2xl rounded-2xl bg-[#0B0F19] border border-[#1E293B] p-5 sm:p-6 space-y-4 z-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs text-white font-bold">{selectedCertObj.id} // VERIFIED CREDENTIAL</span>
                    </div>
                    <button
                      onClick={() => setActiveCert(null)}
                      className="p-1.5 rounded-lg bg-[#141B2B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-white border border-[#1E293B] transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">{selectedCertObj.title}</h4>
                    <p className="text-xs font-mono text-cyan-400">Issued by: {selectedCertObj.issuer}</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#0F1420] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                    <div className="truncate text-[#94A3B8] text-[11px] sm:text-xs">
                      <span className="text-[#64748B]">Document: </span>
                      <span className="text-white">{selectedCertObj.downloadName || selectedCertObj.fileName}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                      <a
                        href={`/sertifikat/${selectedCertObj.fileName}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-1/2 sm:w-auto text-center px-3.5 py-2 rounded-lg border border-[#1E293B] hover:border-cyan-400 text-[#CBD5E1] hover:text-white transition-colors touch-manipulation cursor-pointer"
                      >
                        Preview ↗
                      </a>
                      <a
                        href={`/sertifikat/${selectedCertObj.fileName}`}
                        target="_blank"
                        rel="noreferrer"
                        download={selectedCertObj.downloadName || selectedCertObj.fileName}
                        className="w-1/2 sm:w-auto text-center px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] touch-manipulation cursor-pointer"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
