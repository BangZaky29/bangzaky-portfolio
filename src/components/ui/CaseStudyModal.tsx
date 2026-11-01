import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Activity, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Project, LightingMode } from '../../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  lightingMode: LightingMode;
}

export function CaseStudyModal({ project, onClose, lightingMode }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || typeof document === 'undefined') return null;

  const isUV = lightingMode === 'uv';

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* Full-screen Dark Backdrop with strong blur and dimming */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window: Centered vertically and horizontally on mobile & desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-[94vw] sm:max-w-2xl lg:max-w-3xl rounded-2xl sm:rounded-3xl border ${
            isUV
              ? 'border-purple-500/40 bg-[#0C0B1B] shadow-[0_0_60px_rgba(168,85,247,0.3)]'
              : 'border-[#1E293B] bg-[#0A0E17] shadow-[0_0_60px_rgba(0,0,0,0.95)]'
          } backdrop-blur-2xl flex flex-col overflow-hidden z-10 max-h-[84vh] sm:max-h-[88vh] my-auto`}
        >
          {/* Mobile Top Drag Handle Bar */}
          <div className="w-10 h-1 bg-[#334155] rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

          {/* Sticky Header Strip */}
          <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-[#1E293B]/80 flex items-start justify-between gap-3 bg-[#0A0E17]">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs mb-1">
                <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>
                  PROJ #{project.index}
                </span>
                <span className="text-[#475569]">/</span>
                <span className="text-[#94A3B8] uppercase truncate">{project.categoryLabel}</span>
                <span className="text-[#475569]">/</span>
                <span className="text-[#64748B]">{project.year}</span>
              </div>
              <h3
                id="case-study-title"
                className="text-base sm:text-2xl font-extrabold text-white leading-snug line-clamp-2"
              >
                {project.name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-[#141B2B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-white border border-[#1E293B] transition-colors cursor-pointer shrink-0 touch-manipulation active:scale-95"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Scrollable Body (data-lenis-prevent ensures modal scroll never fights background page) */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 sm:py-4 space-y-3 sm:space-y-3.5 text-left"
          >
            {/* 1. The Problem / Bottleneck */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl border space-y-1.5 ${
                isUV
                  ? 'bg-purple-950/20 border-purple-500/30'
                  : 'bg-[#0F1420] border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-amber-400 font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>THE PROBLEM / BOTTLENECK</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* 2. Architectural Solution */}
            <div
              className={`p-3.5 sm:p-4 rounded-xl border space-y-1.5 ${
                isUV
                  ? 'bg-purple-950/20 border-purple-500/30'
                  : 'bg-[#0F1420] border-cyan-500/30'
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* 3. Verified Impact Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D121D] border border-[#1E293B] space-y-2.5">
                <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>VERIFIED IMPACT METRICS</span>
                </div>

                <div className="space-y-2 pt-0.5">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="space-y-1 font-mono">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#94A3B8]">{metric.label}</span>
                        <span className={isUV ? 'text-purple-300 font-bold' : 'text-cyan-400 font-bold'}>
                          {metric.valueLabel}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#1A2234] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUV
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                              : 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(15, metric.value))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Implementation Stack */}
            <div className="space-y-1.5 pt-0.5">
              <div className="font-mono text-[10px] sm:text-xs text-[#64748B] uppercase tracking-wider">
                IMPLEMENTATION STACK
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.stack.map((st, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono bg-[#141B2B] text-cyan-300 border border-[#1E293B]"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Result Quote */}
            {project.result && (
              <p className="text-xs sm:text-[13px] text-[#94A3B8] italic leading-relaxed pt-1 border-t border-[#1E293B]/50">
                "{project.result}"
              </p>
            )}
          </div>

          {/* Sticky Bottom Action Button */}
          <div className="shrink-0 px-4 py-3 sm:px-6 sm:py-3.5 border-t border-[#1E293B]/80 bg-[#0A0E17]">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all touch-manipulation cursor-pointer active:scale-[0.98] ${
                  isUV
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.45)]'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-[#08090C] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                }`}
              >
                <span>OPEN LIVE WEBSITE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs text-[#94A3B8] bg-[#141B2B] border border-[#1E293B]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CONFIDENTIAL / INTERNAL ENTERPRISE CODEBASE</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
