import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronUp, 
  ChevronDown, 
  ExternalLink, 
  FileText, 
  ArrowRight,
  Terminal,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { Project, LightingMode } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface ProjectorCinemaProps {
  projects: Project[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenCaseStudy: (project: Project) => void;
  lightingMode: LightingMode;
}

export function ProjectorCinema({
  projects,
  activeIndex,
  onSelectIndex,
  onOpenCaseStudy,
  lightingMode,
}: ProjectorCinemaProps) {
  const isUV = lightingMode === 'uv';
  const currentProject = projects[activeIndex] || projects[0];
  const touchStartX = useRef<number | null>(null);

  const handlePrev = () => {
    soundEngine.playSlide();
    onSelectIndex(activeIndex > 0 ? activeIndex - 1 : projects.length - 1);
  };

  const handleNext = () => {
    soundEngine.playSlide();
    onSelectIndex(activeIndex < projects.length - 1 ? activeIndex + 1 : 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ═════════════════════════════════════════════════════════════
          DESKTOP PANORAMIC 3-COLUMN LAYOUT (Image 1 Ref)
          ═════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid grid-cols-12 gap-6 xl:gap-8 items-stretch min-h-[580px] xl:min-h-[620px]">
        
        {/* ─── 1. LEFT COLUMN: EDITORIAL NARRATIVE & TELEMETRY ─── */}
        <div className="col-span-4 flex flex-col justify-between py-2 pr-4 z-10">
          <div>
            {/* Section Tag & Giant Stencil Counter */}
            <div className="flex items-center justify-between pb-3">
              <span className="font-mono text-xs uppercase text-[#64748B] tracking-widest">
                Work
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded bg-[#0F1420] border border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                  title="Previous Project (↑)"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded bg-[#0F1420] border border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                  title="Next Project (↓)"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-2 pb-4">
              <span className="font-stencil text-6xl xl:text-7xl font-extrabold text-white tracking-wider leading-none">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-sm text-[#475569]">
                / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Category Subhead */}
            <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isUV ? 'bg-purple-400' : 'bg-cyan-400'} animate-pulse`} />
              <span>{currentProject.categoryLabel}</span>
            </div>

            {/* Giant Stencil Display Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h3 className="font-stencil text-4xl xl:text-5xl 2xl:text-6xl font-black text-white uppercase tracking-wide leading-[0.95] drop-shadow-lg">
                  {currentProject.name.split('—')[0].trim()}
                </h3>

                <p className="text-xs xl:text-sm text-[#94A3B8] leading-relaxed font-sans line-clamp-3">
                  {currentProject.problem}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
                  {currentProject.stack.map((st, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#101625] text-cyan-300 border border-[#1E293B]"
                    >
                      #{st}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action CTAs Bottom */}
          <div className="pt-6 border-t border-[#1E293B]/70 flex items-center gap-3 font-mono text-xs">
            {currentProject.url && (
              <a
                href={currentProject.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick()}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold transition-all ${
                  isUV
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-[#08090C] shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                }`}
              >
                <span>Visit site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenCaseStudy(currentProject);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#1E293B] hover:border-cyan-400 bg-[#0F1420] text-[#CBD5E1] hover:text-white transition-all cursor-pointer"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* ─── 2. CENTER COLUMN: PROJECTOR SCREEN & RETRO CRT MONITOR ─── */}
        <div className="col-span-5 relative flex flex-col items-center justify-between p-2">
          {/* Overhead Spotlight Cone Effect */}
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-44 rounded-full blur-3xl pointer-events-none opacity-40 ${
              isUV ? 'bg-purple-500/25' : 'bg-cyan-400/20'
            }`}
          />

          {/* Hanging Projector Screen */}
          <div className="relative w-full my-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`relative w-full aspect-[16/10] rounded-xl border overflow-hidden flex flex-col justify-between p-5 sm:p-6 transition-all ${
                  isUV
                    ? 'border-purple-500/40 bg-gradient-to-b from-[#120F26] to-[#0A0817] shadow-[0_0_60px_rgba(168,85,247,0.22)]'
                    : 'border-cyan-500/40 bg-gradient-to-b from-[#0F172A] to-[#080C16] shadow-[0_0_60px_rgba(6,182,212,0.18)]'
                }`}
              >
                {/* Subtle Scanline Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%_4px]" />

                {/* Projector Screen Topbar */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#64748B] border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-bold uppercase tracking-wider">PROJECTOR OUTPUT</span>
                  </div>
                  <span>{currentProject.year} // REV.2026</span>
                </div>

                {/* Central Brand Stencil Display on Screen */}
                <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center space-y-2">
                  <span className="text-4xl xl:text-5xl 2xl:text-6xl font-stencil font-black text-white uppercase tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                    {currentProject.name.split('—')[0].trim()}
                  </span>
                  <p className="text-xs text-[#94A3B8] font-mono max-w-xs truncate">
                    {currentProject.name.split('—')[1]?.trim() || currentProject.categoryLabel}
                  </p>
                </div>

                {/* Projector Screen Bottom Telemetry Strip */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono pt-2 border-t border-white/10 text-[#64748B]">
                  <span className="truncate max-w-[200px] text-[#94A3B8]">
                    {currentProject.url ? currentProject.url.replace('https://', '') : `PRJ-${currentProject.index}`}
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onOpenCaseStudy(currentProject);
                    }}
                    className="flex items-center gap-1 text-cyan-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>EXPAND</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Retro CRT Monitor on the Desk */}
          <div
            onClick={() => {
              soundEngine.playClick();
              onOpenCaseStudy(currentProject);
            }}
            className="w-full max-w-sm rounded-lg bg-[#070A10] border border-[#1E293B] p-2.5 font-mono text-[10px] text-emerald-400/90 shadow-lg cursor-pointer hover:border-emerald-500/50 transition-colors shrink-0"
            title="Click retro terminal to open case study"
          >
            <div className="flex items-center justify-between pb-1 border-b border-[#1E293B] text-[9px] text-[#64748B]">
              <div className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>TERMINAL_OUTPUT // CRT-60FPS</span>
              </div>
              <span className="text-emerald-400 animate-pulse">● LIVE</span>
            </div>
            <div className="pt-1.5 space-y-0.5">
              <div className="truncate">
                &gt; FOCUS: <span className="text-white font-bold">{currentProject.name}</span>
              </div>
              {currentProject.metrics?.[0] && (
                <div className="text-cyan-300">
                  &gt; METRIC: {currentProject.metrics[0].label} = {currentProject.metrics[0].valueLabel}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── 3. RIGHT COLUMN: QUICK-JUMP DIRECTORY LIST ─── */}
        <div className="col-span-3 border-l border-[#1E293B]/70 pl-6 flex flex-col justify-between py-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]/60 font-mono text-xs text-[#64748B]">
            <span>DIRECTORY INDEX</span>
            <span>{projects.length} ITEMS</span>
          </div>

          {/* Scrollable Project Titles List */}
          <div className="my-auto py-3 space-y-1 max-h-[460px] overflow-y-auto no-scrollbar font-mono text-xs">
            {projects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    soundEngine.playSlide();
                    onSelectIndex(idx);
                  }}
                  className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded text-left transition-all cursor-pointer ${
                    isActive
                      ? isUV
                        ? 'bg-purple-950/50 text-white font-bold border-l-2 border-purple-400 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-cyan-950/40 text-white font-bold border-l-2 border-cyan-400 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]'
                      : 'text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#0E1422]/60'
                  }`}
                >
                  <span className="truncate pr-2">
                    <span className={`mr-2 ${isActive ? (isUV ? 'text-purple-300' : 'text-cyan-400') : 'text-[#475569]'}`}>
                      {proj.index}
                    </span>
                    {proj.name.split('—')[0].trim()}
                  </span>
                  {isActive && (
                    <span className={`text-[10px] shrink-0 ${isUV ? 'text-purple-300' : 'text-cyan-400'}`}>
                      ▶
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Telemetry Note */}
          <div className="pt-3 border-t border-[#1E293B]/60 font-mono text-[10px] text-[#64748B] flex items-center justify-between">
            <span>{isUV ? 'UV • 365NM' : '2700K • WARM'}</span>
            <span className="text-cyan-400">PROJECTING</span>
          </div>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════
          MOBILE VERTICAL CINEMA LAYOUT (Image 2 Ref - PEGALIV)
          ═════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden space-y-4">
        {/* Top Header Row with Counter & Navigation */}
        <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#1E293B]">
          <span className="uppercase text-[#64748B] tracking-wider">Work</span>
          <div className="flex items-center gap-2">
            <span className="font-stencil text-2xl font-bold text-white">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[#475569]">/</span>
            <span className="text-[#64748B]">{String(projects.length).padStart(2, '0')}</span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={handlePrev}
                className="p-1 rounded bg-[#0F1420] border border-[#1E293B] text-[#94A3B8] active:scale-95"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded bg-[#0F1420] border border-[#1E293B] text-[#94A3B8] active:scale-95"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Central Illuminated Projector Screen */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`w-full aspect-[16/10] rounded-xl border p-4 flex flex-col justify-between overflow-hidden relative ${
                isUV
                  ? 'border-purple-500/40 bg-gradient-to-b from-[#120F26] to-[#0A0817] shadow-[0_0_40px_rgba(168,85,247,0.25)]'
                  : 'border-cyan-500/40 bg-gradient-to-b from-[#0F172A] to-[#080C16] shadow-[0_0_40px_rgba(6,182,212,0.2)]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] z-10">
                <span className="text-white font-bold uppercase">{currentProject.categoryLabel}</span>
                <span>{currentProject.year}</span>
              </div>

              <div className="my-auto text-center z-10 space-y-1">
                <span className="font-stencil text-3xl sm:text-4xl font-black text-white uppercase tracking-wider block">
                  {currentProject.name.split('—')[0].trim()}
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] block truncate px-2">
                  {currentProject.result}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] z-10 pt-1 border-t border-white/10">
                <span className="truncate max-w-[180px] text-[#94A3B8]">
                  {currentProject.url ? currentProject.url.replace('https://', '') : `INTERNAL // PRJ-${currentProject.index}`}
                </span>
                <span className="text-cyan-400">● 60 FPS</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Compact Retro CRT Terminal Bar on Mobile */}
          <div
            onClick={() => {
              soundEngine.playClick();
              onOpenCaseStudy(currentProject);
            }}
            className="mt-2 p-2 rounded-lg bg-[#070A10] border border-[#1E293B] font-mono text-[10px] text-emerald-400 flex items-center justify-between cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">&gt; TAP TO INSPECT ARCHITECTURAL SPECS</span>
            </div>
            <span className="text-white shrink-0 ml-1">↗</span>
          </div>
        </div>

        {/* Narrative & Stencil Title */}
        <div className="space-y-2 pt-1 text-left">
          <div className="font-mono text-[11px] text-[#94A3B8] uppercase">
            {currentProject.categoryLabel}
          </div>

          <h3 className="font-stencil text-3xl sm:text-4xl font-black text-white uppercase tracking-wider leading-none">
            {currentProject.name.split('—')[0].trim()}
          </h3>

          <p className="text-xs text-[#94A3B8] leading-relaxed font-sans">
            {currentProject.problem}
          </p>

          <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
            {currentProject.stack.map((st, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-[#101625] text-cyan-300 border border-[#1E293B]"
              >
                #{st}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            {currentProject.url && (
              <a
                href={currentProject.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick()}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-mono text-xs font-bold ${
                  isUV
                    ? 'bg-purple-600 text-white'
                    : 'bg-cyan-400 text-[#08090C]'
                }`}
              >
                <span>Visit site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenCaseStudy(currentProject);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#1E293B] bg-[#0F1420] text-white font-mono text-xs font-bold cursor-pointer"
            >
              <span>Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Mobile Bottom Status Bar Track (Ref Image 2: "03 Work 08 / 18 PROJECTING") */}
        <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between font-mono text-[11px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className={isUV ? 'text-purple-300 font-bold' : 'text-cyan-400 font-bold'}>03 Work</span>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="w-24 h-1 rounded-full bg-[#1A2234] overflow-hidden mx-2">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isUV ? 'bg-purple-400' : 'bg-cyan-400'}`}
              style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
            />
          </div>

          <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">
            PROJECTING
          </span>
        </div>
      </div>
    </div>
  );
}

