import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, FileText, CheckCircle2, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { LightingMode, Certification } from '../../types';
import { TimelineMilestone } from '../../data/timeline';
import { soundEngine } from '../../audio/soundEngine';

interface SpotlightRoomProps {
  milestones: TimelineMilestone[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  certifications: Certification[];
  onOpenCert: (certId: string) => void;
  lightingMode: LightingMode;
}

export function SpotlightRoom({
  milestones,
  activeIndex,
  onSelectIndex,
  certifications,
  onOpenCert,
  lightingMode,
}: SpotlightRoomProps) {
  const isUV = lightingMode === 'uv';
  const current = milestones[activeIndex] || milestones[0];
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < milestones.length - 1) {
        soundEngine.playSlide();
        onSelectIndex(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        soundEngine.playSlide();
        onSelectIndex(activeIndex - 1);
      }
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
          DESKTOP SPOTLIGHT ROOM LAYOUT (Image 4 Ref)
          ═════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[520px] relative">
        
        {/* UV Secret Wall Graffiti (Easter egg in 365nm UV Mode - Ref Image 4) */}
        {isUV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none z-0"
          >
            <div className="text-purple-400 font-mono text-sm tracking-widest drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
              ✦ you found the other light ✦
            </div>
            <div className="font-stencil text-5xl font-black text-purple-300/40 uppercase tracking-widest mt-1 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              ENGINEER ZAKY
            </div>
            <div className="text-purple-400/80 font-mono text-xs tracking-wider mt-1">
              remembers // precision code &amp; autonomous AI systems
            </div>
          </motion.div>
        )}

        {/* ─── 1. LEFT COLUMN: ROLE DETAILS & BULLET POINTS ─── */}
        <div className="col-span-8 flex flex-col justify-between py-2 pr-6 z-10">
          <div>
            {/* Section Tag */}
            <div className="font-mono text-xs uppercase text-[#64748B] tracking-widest mb-3">
              Experience
            </div>

            {/* Date Period Badge */}
            <div className="font-mono text-xs text-[#94A3B8] tracking-wider mb-2 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isUV ? 'bg-purple-400' : 'bg-cyan-400'}`} />
              <span>{current.period}</span>
            </div>

            {/* Giant Stencil Role Title (Ref: Image 4 "MOBILE DEVELOPER") */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h3 className="font-stencil text-4xl xl:text-5xl 2xl:text-6xl font-black text-white uppercase tracking-wider leading-[0.95]">
                  {current.role}
                </h3>

                <div className="font-mono text-sm text-cyan-400 font-bold">
                  at {current.company}
                </div>

                <p className="text-xs xl:text-sm text-[#94A3B8] leading-relaxed font-sans max-w-2xl">
                  {current.description}
                </p>

                {/* Clean Bullet Points (Ref: Image 4) */}
                <div className="space-y-2.5 pt-2 font-mono text-xs text-[#CBD5E1] max-w-2xl">
                  {current.bulletPoints.map((bp, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-[#64748B] select-none">-</span>
                      <span className="leading-relaxed">{bp}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 font-mono text-[11px]">
                  {current.skills.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#101625] text-[#94A3B8] border border-[#1E293B]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Link to Verified Credentials & Certifications */}
          <div className="pt-6 border-t border-[#1E293B]/70 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>OFFICIAL CREDENTIALS ({certifications.length})</span>
            </div>

            <div className="flex items-center gap-2">
              {certifications.slice(0, 3).map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onOpenCert(cert.id);
                  }}
                  className="px-3 py-1 rounded bg-[#0F1420] border border-[#1E293B] hover:border-cyan-400 text-xs text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
                >
                  {cert.title.split('—')[0].trim()} ↗
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── 2. RIGHT COLUMN: VERTICAL YEAR TIMELINE RAIL ─── */}
        <div className="col-span-4 border-l border-[#1E293B]/70 pl-8 flex flex-col justify-between py-2 z-10">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]/60 font-mono text-xs text-[#64748B]">
            <span>CAREER RAIL</span>
            <span>PHASE {activeIndex + 1} / {milestones.length}</span>
          </div>

          {/* Vertical Year Milestones List (Ref: Image 4) */}
          <div className="my-auto py-4 space-y-3 font-mono">
            {milestones.map((m, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    soundEngine.playSlide();
                    onSelectIndex(idx);
                  }}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-left transition-all cursor-pointer ${
                    isActive
                      ? isUV
                        ? 'bg-purple-950/50 text-white font-bold border-l-2 border-purple-400'
                        : 'bg-cyan-950/40 text-white font-bold border-l-2 border-cyan-400'
                      : 'text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#0E1422]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs">{isActive ? '■' : '□'}</span>
                    <span className={`text-base font-bold ${isActive ? 'text-white' : 'text-[#64748B]'}`}>
                      {m.year}
                    </span>
                  </div>
                  <span className="text-xs text-[#94A3B8] truncate max-w-[140px]">
                    {m.companyShort}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Telemetry Note (Ref Image 4) */}
          <div className="pt-3 border-t border-[#1E293B]/60 font-mono text-[10px] text-[#64748B] flex items-center justify-between">
            <span>{isUV ? 'UV • 365NM' : '2700K • WARM'}</span>
            <span className="text-emerald-400">FOCUS 100%</span>
          </div>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════
          MOBILE TIMELINE SLIDER LAYOUT (Image 3 Ref)
          ═════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden space-y-4">
        {/* Top Label */}
        <div className="font-mono text-xs uppercase text-[#64748B] tracking-wider">
          Experience
        </div>

        {/* Top Horizontal Year Slider Tabs (Ref: Image 3) */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-[#1E293B] pb-2 font-mono">
          {milestones.map((m, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={m.id}
                onClick={() => {
                  soundEngine.playSlide();
                  onSelectIndex(idx);
                }}
                className={`flex-1 min-w-[72px] py-1.5 px-2 text-center rounded transition-all cursor-pointer ${
                  isActive
                    ? 'border-t-2 border-cyan-400 bg-cyan-950/30 text-white font-bold'
                    : 'text-[#64748B] hover:text-[#CBD5E1]'
                }`}
              >
                <div className="text-sm font-bold">{m.year}</div>
                <div className="text-[9px] text-[#94A3B8] truncate">{m.companyShort}</div>
              </button>
            );
          })}
        </div>

        {/* Illuminated Role Card (Ref: Image 3) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-5 rounded-xl border border-[#1E293B] bg-[#0A0E17] space-y-3 text-left relative overflow-hidden"
          >
            {/* Subtle Overhead Spotlight Ambient */}
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-28 rounded-full blur-2xl pointer-events-none opacity-30 ${
                isUV ? 'bg-purple-500/25' : 'bg-cyan-400/20'
              }`}
            />

            <div className="font-mono text-[11px] text-[#94A3B8]">
              {current.period}
            </div>

            <h3 className="font-stencil text-3xl sm:text-4xl font-black text-white uppercase tracking-wider leading-none">
              {current.role}
            </h3>

            <div className="font-mono text-xs text-cyan-400 font-bold">
              at {current.company}
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 pt-1 font-mono text-xs text-[#CBD5E1]">
              {current.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#64748B] select-none">-</span>
                  <span className="leading-relaxed">{bp}</span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 pt-2 font-mono text-[10px]">
              {current.skills.map((sk, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-[#101625] text-[#94A3B8] border border-[#1E293B]"
                >
                  {sk}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Credentials Quick List */}
        <div className="p-3.5 rounded-xl bg-[#0D121D] border border-[#1E293B] space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#94A3B8] pb-1 border-b border-[#1E293B]">
            <span>VERIFIED CREDENTIALS</span>
            <span className="text-cyan-400">{certifications.length} CERTS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {certifications.map((cert) => (
              <button
                key={cert.id}
                onClick={() => {
                  soundEngine.playClick();
                  onOpenCert(cert.id);
                }}
                className="flex items-center justify-between p-2 rounded bg-[#101625] border border-[#1E293B] hover:border-cyan-400 text-left text-[11px] text-[#CBD5E1] active:scale-98"
              >
                <span className="truncate pr-2">{cert.title}</span>
                <span className="text-cyan-400 shrink-0">↗</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Bottom Status Bar Track (Ref Image 3: "04 Experience 03 / 05 FOCUS 100%") */}
        <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between font-mono text-[11px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className={isUV ? 'text-purple-300 font-bold' : 'text-cyan-400 font-bold'}>04 Experience</span>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}</span>
          </div>

          <div className="w-24 h-1 rounded-full bg-[#1A2234] overflow-hidden mx-2">
            <div
              className={`h-full rounded-full transition-all duration-300 ${isUV ? 'bg-purple-400' : 'bg-cyan-400'}`}
              style={{ width: `${((activeIndex + 1) / milestones.length) * 100}%` }}
            />
          </div>

          <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider">
            FOCUS 100%
          </span>
        </div>
      </div>
    </div>
  );
}

