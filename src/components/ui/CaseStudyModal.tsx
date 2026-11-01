import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
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

  if (!project) return null;

  const isUV = lightingMode === 'uv';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          data-lenis-prevent
          className={`relative w-full max-w-3xl rounded-2xl bg-[#0B0F19] border ${
            isUV ? 'border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25)]' : 'border-[#1E293B] shadow-[0_0_50px_rgba(0,0,0,0.8)]'
          } p-5 sm:p-8 space-y-5 sm:space-y-6 z-10 max-h-[92vh] overflow-y-auto`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-[#1E293B] pb-4">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-[#64748B] mb-1">
                <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>
                  PROJ #{project.index}
                </span>
                <span>/</span>
                <span className="text-[#94A3B8] uppercase truncate">{project.categoryLabel}</span>
                <span>/</span>
                <span>{project.year}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">{project.name}</h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-lg bg-[#141B2B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0 touch-manipulation"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Problem & Solution Storytelling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Problem */}
            <div className="p-4 rounded-xl bg-[#101524] border border-[#1E293B] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>THE PROBLEM / BOTTLENECK</span>
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-4 rounded-xl bg-[#101524] border border-[#1E293B] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-semibold">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {project.solution}
              </p>
            </div>

          </div>

          {/* Impact Metrics Progress */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="p-4 rounded-xl bg-[#0D121D] border border-[#1E293B] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] uppercase">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>VERIFIED IMPACT METRICS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {project.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#94A3B8]">{metric.label}</span>
                      <span className="text-emerald-400 font-bold">{metric.valueLabel}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#1A2234] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                        style={{ width: `${Math.min(100, metric.value)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#64748B] uppercase">IMPLEMENTATION STACK</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((st, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1 rounded text-xs font-mono bg-[#141B2B] text-cyan-300 border border-[#1E293B]"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Result / Outcome & External Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
            <p className="text-xs text-[#94A3B8] italic max-w-md">
              "{project.result}"
            </p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-md font-mono text-xs font-bold transition-all touch-manipulation ${
                  isUV
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-[#090D16] shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                }`}
              >
                <span>OPEN LIVE WEBSITE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

