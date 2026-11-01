import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Award, FileText, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { LightingMode } from '../../types';
import { timelineEvents } from '../../data/timeline';
import { certifications } from '../../data/certifications';
import { ScrambleText, RevealTitle, FadeUp } from '../motion/RevealText';
import { InteractiveCard } from '../motion/InteractiveCard';

interface ExperienceSectionProps {
  lightingMode: LightingMode;
}

export function ExperienceSection({ lightingMode }: ExperienceSectionProps) {
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll-drawn dynamic timeline line
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ['start 75%', 'end 60%'],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const isUV = lightingMode === 'uv';
  const selectedCertObj = certifications.find((c) => c.id === activeCert);

  return (
    <section id="experience" className="py-20 border-b border-[#1E2533] overflow-hidden">
      <div className="w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-8 space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1E293B]/60">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-2">
              <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>04</span>
              <span>/</span>
              <ScrambleText
                text="CAREER EVOLUTION & CERTIFICATIONS"
                triggerOnHover
                className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
              />
            </div>

            <RevealTitle
              text="EXPERIENCE — TRAJECTORY"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            />
          </div>

          <FadeUp delay={0.2}>
            <p className="text-sm font-mono text-[#94A3B8] max-w-md">
              Evolusi dari supervisi lini manufaktur industri menuju arsitektur software otonom, rekayasa data relasional, dan otomasi AI.
            </p>
          </FadeUp>
        </div>

        {/* 2 Column Layout: Timeline on Left, Certifications on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Timeline Milestones with Scroll-Drawn Dynamic Line (Col 7) */}
          <div ref={timelineContainerRef} className="lg:col-span-7 space-y-6">
            <h3 className="font-mono text-xs text-[#64748B] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <ScrambleText text="CHRONOLOGICAL PHASES" triggerOnHover />
            </h3>

            <div className="relative pl-10 space-y-8">
              {/* Background Guide Line (Centered at 16px) */}
              <div className="absolute left-4 -translate-x-1/2 top-3 bottom-3 w-[2px] bg-[#1E293B]" />

              {/* Dynamic Scroll-Drawn Line (Centered at 16px) */}
              <motion.div
                style={{ scaleY }}
                className={`absolute left-4 -translate-x-1/2 top-3 bottom-3 w-[2px] origin-top ${isUV
                    ? 'bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                    : 'bg-gradient-to-b from-cyan-400 via-sky-400 to-amber-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                  }`}
              />

              {timelineEvents.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 90,
                    damping: 18,
                    delay: idx * 0.12,
                  }}
                  className="relative p-5 rounded-xl bg-[#0D121D] border border-[#1E293B] space-y-2 group hover:border-[#334155] transition-colors"
                >
                  {/* Timeline Indicator Dot (Centered at 16px: 40px - 24px = 16px) */}
                  <span
                    className={`absolute -left-6 top-7 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#08090C] z-10 transition-all duration-300 ${idx === 0
                        ? isUV
                          ? 'bg-purple-400 ring-4 ring-purple-400/30 shadow-[0_0_12px_rgba(168,85,247,0.8)]'
                          : 'bg-cyan-400 ring-4 ring-cyan-400/30 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                        : 'bg-[#475569] group-hover:bg-cyan-400 group-hover:ring-4 group-hover:ring-cyan-400/20'
                      }`}
                  >
                    {idx === 0 && (
                      <span className="absolute inset-1 rounded-full bg-white opacity-90 animate-pulse" />
                    )}
                  </span>

                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={`font-bold ${idx === 0 ? (isUV ? 'text-purple-400' : 'text-cyan-400') : 'text-[#94A3B8]'}`}>
                      {event.year}
                    </span>
                    <span className="text-[#64748B]">VERIFIED PHASE</span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {event.role}
                  </h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Verified Certifications Drawer (Col 5) with Staggered Entrance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs text-[#64748B] uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <ScrambleText text="OFFICIAL CREDENTIALS (6)" triggerOnHover />
              </h3>
              <span className="text-[11px] font-mono text-[#64748B]">CLICK TO PREVIEW</span>
            </div>

            <div className="space-y-2.5">
              {certifications.map((cert, cIdx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 18,
                    delay: cIdx * 0.06,
                  }}
                >
                  <InteractiveCard
                    lightingMode={lightingMode}
                    onClick={() => {
                      setActiveCert(cert.id);
                    }}
                    className={`rounded-lg bg-[#0D121D] border transition-all cursor-pointer group touch-manipulation ${activeCert === cert.id
                        ? isUV ? 'border-purple-500 bg-[#161228]' : 'border-cyan-400 bg-[#111726]'
                        : 'border-[#1E293B] hover:border-[#334155]'
                      }`}
                    contentClassName="p-3.5 flex items-center justify-between w-full gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="p-2 rounded bg-[#141B2B] text-[#94A3B8] group-hover:text-cyan-400 transition-colors shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {cert.title}
                        </div>
                        <div className="text-[11px] font-mono text-[#64748B]">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-auto" />
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCertObj && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-xl bg-[#0B0F19] border border-[#1E293B] p-6 space-y-4 z-10"
            >
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs text-white font-bold">{selectedCertObj.id} // VERIFIED CERTIFICATE</span>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded hover:bg-[#1E293B] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">{selectedCertObj.title}</h4>
                <p className="text-xs font-mono text-cyan-400">Issued by: {selectedCertObj.issuer}</p>
              </div>

              <div className="p-4 rounded-lg bg-[#0F1420] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="truncate text-[#94A3B8]">
                  <span>File: </span>
                  <span className="text-white">{selectedCertObj.fileName}</span>
                </div>
                <a
                  href={`/src/assets/sertifikat/${encodeURIComponent(selectedCertObj.fileName)}`}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="w-full sm:w-auto text-center px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold shrink-0 transition-colors touch-manipulation"
                >
                  Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
