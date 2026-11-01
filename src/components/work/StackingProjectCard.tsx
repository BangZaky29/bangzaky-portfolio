import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Globe, 
  Smartphone, 
  Activity,
  Eye
} from 'lucide-react';
import { Project, LightingMode } from '../../types';
import { smoothScrollTo } from '../motion/SmoothScroll';
import { useAdaptiveLayout } from '../../hooks/useAdaptiveLayout';

interface StackingProjectCardProps {
  key?: string;
  project: Project;
  index: number;
  total: number;
  lightingMode: LightingMode;
  onOpenCaseStudy: (project: Project) => void;
}

export function StackingProjectCard({
  project,
  index,
  total,
  lightingMode,
  onOpenCaseStudy,
}: StackingProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { getStackTop, isMobile } = useAdaptiveLayout();
  const isUV = lightingMode === 'uv';

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    smoothScrollTo(`#project-${project.id}`, isMobile ? -70 : -110);
  };


  // Determine category icon & color theme
  const getCategoryMeta = () => {
    switch (project.category) {
      case 'ai':
        return {
          icon: <Cpu className="w-3.5 h-3.5" />,
          colorText: isUV ? 'text-purple-400' : 'text-amber-400',
          badgeBg: isUV ? 'bg-purple-950/60 border-purple-800' : 'bg-amber-950/60 border-amber-800',
          blueprintType: 'ALGORITHMIC_TELEMETRY',
        };
      case 'mobile':
        return {
          icon: <Smartphone className="w-3.5 h-3.5" />,
          colorText: isUV ? 'text-pink-400' : 'text-emerald-400',
          badgeBg: isUV ? 'bg-pink-950/60 border-pink-800' : 'bg-emerald-950/60 border-emerald-800',
          blueprintType: 'MOBILE_CLIENT_RADAR',
        };
      case 'system':
        return {
          icon: <Activity className="w-3.5 h-3.5" />,
          colorText: isUV ? 'text-purple-400' : 'text-sky-400',
          badgeBg: isUV ? 'bg-purple-950/60 border-purple-800' : 'bg-sky-950/60 border-sky-800',
          blueprintType: 'SYSTEM_OPS_TELEMETRY',
        };
      default:
        return {
          icon: <Globe className="w-3.5 h-3.5" />,
          colorText: isUV ? 'text-purple-300' : 'text-cyan-400',
          badgeBg: isUV ? 'bg-purple-950/60 border-purple-800' : 'bg-cyan-950/60 border-cyan-800',
          blueprintType: 'INTERACTIVE_WEB_SYS',
        };
    }
  };

  const meta = getCategoryMeta();

  return (
    <div
      id={`project-${project.id}`}
      style={{
        zIndex: 10 + index,
        top: `${getStackTop(index)}px`,
      }}
      className="sticky w-full max-w-[1480px] 2xl:max-w-[1640px] mx-auto pb-16 sm:pb-28 lg:pb-36 will-change-transform flex justify-center"
    >
      {/* ═════════════════════════════════════════════════════════════
          LARGE RECTANGULAR FOLDER / PAPER STACK CARD (HORIZONTALLY CENTERED)
          ═════════════════════════════════════════════════════════════ */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
          isUV
            ? 'bg-[#0B0A17] border-[#221B3A] shadow-[0_-20px_50px_rgba(0,0,0,0.92)] hover:border-purple-500/70 hover:shadow-[0_0_40px_rgba(168,85,247,0.22)]'
            : 'bg-[#0A0E17] border-[#1A2333] shadow-[0_-20px_50px_rgba(0,0,0,0.92)] hover:border-cyan-500/70 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]'
        }`}
      >
        {/* Subtle Ambient Scanline Shimmer */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* ═════════════════════════════════════════════════════════════
            1. TOP HEADER STRIP
            ═════════════════════════════════════════════════════════════ */}
        <div
          onClick={handleHeaderClick}
          className={`relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 border-b cursor-pointer transition-colors ${
            isUV
              ? 'bg-[#0E0C1F]/95 border-purple-500/20 hover:bg-[#15122F]'
              : 'bg-[#0D121F]/95 border-white/10 hover:bg-[#12192B]'
          }`}
          title="Click to focus this card"
        >
          {/* Top Left: Index + Project Title + Featured Pill */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 pr-3">
            <span
              className={`font-mono text-xs sm:text-sm font-extrabold shrink-0 px-2 py-0.5 rounded border ${
                isUV
                  ? 'text-purple-300 bg-purple-950/60 border-purple-500/40'
                  : 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40'
              }`}
            >
              #{project.index}
            </span>

            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide truncate group-hover:text-cyan-300 transition-colors">
              {project.name}
            </h3>

            {project.highlight && (
              <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-950/60 text-amber-300 border border-amber-800/80 shrink-0">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Featured</span>
              </span>
            )}
          </div>

          {/* Top Right: Category, Year, Quick Jump Indicator */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 font-mono text-[11px] sm:text-xs">
            <span className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border ${meta.badgeBg} ${meta.colorText}`}>
              {meta.icon}
              <span>{project.categoryLabel}</span>
            </span>

            <span className="text-[#64748B] hidden sm:inline">{project.year}</span>

            <div className="flex items-center gap-1 text-[10px] text-[#64748B] hover:text-white transition-colors">
              <span className="hidden lg:inline">STACK #{index + 1}/{total}</span>
              <span className="text-[#475569]">●</span>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            2. MAIN CARD BODY (2-Column Asymmetric Layout)
            ═════════════════════════════════════════════════════════════ */}
        <div className="p-4 sm:p-6 lg:p-7 xl:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
          
          {/* Left Column (60%): Storytelling, Metrics, Tech Stack, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Storytelling: Problem & Engineered Solution */}
            <div className="space-y-3">
              
              {/* Problem Brief */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#64748B] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>01 // THE CHALLENGE</span>
                </div>
                <p className="text-xs sm:text-[13px] xl:text-sm text-[#94A3B8] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution Architecture */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#64748B] uppercase tracking-wider">
                  <span className={`w-1.5 h-1.5 rounded-full ${isUV ? 'bg-purple-400' : 'bg-cyan-400'}`} />
                  <span>02 // ARCHITECTURE & SOLUTION</span>
                </div>
                <p className="text-xs sm:text-[13px] xl:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>

            </div>

            {/* Metrics Telemetry Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-2.5 border-y border-[#1E293B]/60 font-mono text-xs">
                {project.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-2 sm:p-2.5 rounded-lg bg-[#0E1422] border border-[#1E293B]/60">
                    <div className="text-[10px] sm:text-[11px] text-[#64748B] truncate uppercase">{metric.label}</div>
                    <div className={`text-xs sm:text-sm md:text-base font-extrabold mt-0.5 ${isUV ? 'text-purple-300' : 'text-cyan-300'}`}>
                      {metric.valueLabel}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Pills & Action CTAs */}
            <div className="space-y-3 pt-0.5">
              
              {/* Stack Pills */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] sm:text-[11px]">
                <span className="text-[#64748B] mr-1 text-[10px] uppercase">STACK:</span>
                {project.stack.map((item, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded bg-[#131B2B] text-[#94A3B8] border border-[#1E293B] hover:border-cyan-500/50 hover:text-white transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={() => onOpenCaseStudy(project)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 ${
                    isUV
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-[#090D16] shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  <span>CASE STUDY & SPECS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-mono text-xs border border-[#1E293B] hover:border-cyan-400 text-[#94A3B8] hover:text-white transition-all bg-[#0E1422] touch-manipulation"
                    title="Open Live Website in New Tab"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                )}
              </div>

            </div>

          </div>

          {/* Right Column (40%): Dedicated Visual Preview / HUD Blueprint Frame */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative h-full min-h-[220px] sm:min-h-[240px] xl:min-h-[260px] rounded-xl bg-[#090D17] border border-[#1E293B] p-4 sm:p-5 flex flex-col justify-between overflow-hidden group">
              
              {/* Corner Reticle Accents */}
              <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#475569]">+</span>
              <span className="absolute top-1.5 right-2 font-mono text-[9px] text-[#475569]">+</span>
              <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#475569]">+</span>
              <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#475569]">+</span>

              {/* Blueprint Frame Topbar */}
              <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]/70 font-mono text-[10px] text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[#94A3B8] uppercase">{meta.blueprintType}</span>
                </div>
                <span>REV. 2025</span>
              </div>

              {/* Central Blueprint Wireframe Visual */}
              <div className="my-auto py-3 flex flex-col items-center justify-center text-center space-y-2 relative">
                
                {/* Visual Wireframe Device / Architecture Schematic */}
                <div className={`relative w-44 h-22 sm:w-52 sm:h-26 md:w-60 md:h-28 rounded-lg border flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                  isUV
                    ? 'border-purple-500/40 bg-purple-950/20 shadow-[inset_0_0_20px_rgba(168,85,247,0.15)]'
                    : 'border-cyan-500/40 bg-cyan-950/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]'
                }`}>
                  {/* Subtle Grid Inside */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:10px_10px]" />

                  {/* Wireframe Elements */}
                  <div className="relative z-10 space-y-1.5 w-3/4 text-left">
                    <div className="h-1.5 w-1/2 rounded bg-white/40" />
                    <div className="h-1 w-full rounded bg-white/20" />
                    <div className="h-1 w-3/4 rounded bg-white/20" />
                    <div className="flex gap-1 pt-1">
                      <div className="h-2.5 w-7 rounded bg-cyan-400/40" />
                      <div className="h-2.5 w-7 rounded bg-purple-400/30" />
                    </div>
                  </div>

                  <div className="absolute bottom-1 right-2 font-mono text-[8px] text-[#64748B]">
                    60 FPS RENDER
                  </div>
                </div>

                <div className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8] px-2">
                  {project.result}
                </div>
              </div>

              {/* Blueprint Frame Footer */}
              <div className="pt-2 border-t border-[#1E293B]/70 flex items-center justify-between font-mono text-[10px] text-[#64748B]">
                <div className="truncate max-w-[220px] sm:max-w-[280px] text-[#94A3B8]">
                  {project.url ? project.url.replace('https://', '') : `INTERNAL // ${project.id}`}
                </div>
                <button
                  onClick={() => onOpenCaseStudy(project)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>INSPECT</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
