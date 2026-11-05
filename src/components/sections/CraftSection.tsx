import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Smartphone,
  Cpu,
  Server,
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  TrendingUp,
  FileText,
  Terminal,
  Play,
  RotateCcw
} from 'lucide-react';
import { LightingMode } from '../../types';
import { craftPillars, whatICanBuildServices } from '../../data/craft';
import { techCategories } from '../../data/techStack';
import { ScrambleText, RevealTitle, FadeUp } from '../motion/RevealText';
import { InteractiveCard } from '../motion/InteractiveCard';

interface CraftSectionProps {
  lightingMode: LightingMode;
}

const serviceIcons: Record<string, typeof Globe> = {
  globe: Globe,
  'layout-dashboard': LayoutDashboard,
  cpu: Cpu,
  'message-square': MessageSquare,
  'credit-card': CreditCard,
  smartphone: Smartphone,
  'trending-up': TrendingUp,
  'file-text': FileText,
};

const pillarIcons = [Globe, Smartphone, Cpu, Server];

export function CraftSection({ lightingMode }: CraftSectionProps) {
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const isUV = lightingMode === 'uv';

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="craft" className="py-20 border-b border-[#1E2533] overflow-hidden">
      <div className="w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-8 space-y-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1E293B]/60">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-2">
              <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>02</span>
              <span>/</span>
              <ScrambleText
                text="DISCIPLINES & CAPABILITIES"
                triggerOnHover
                className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
              />
            </div>

            <RevealTitle
              text="CRAFT — WHAT I DO"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            />
          </div>

          <FadeUp delay={0.2}>
            <p className="text-sm font-mono text-[#94A3B8] max-w-md">
              Membangun sistem terukur dari nol: mulai dari UI interaktif mutakhir, mobile client terhubung sensor, hingga backend otomasi cerdas.
            </p>
          </FadeUp>
        </div>

        {/* 4 Core Pillars Grid (3D Card Flip Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {craftPillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            const isFlipped = !!flippedCards[pillar.id];

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 90,
                  damping: 18,
                  delay: idx * 0.08,
                }}
                className="w-full [perspective:1200px]"
              >
                {/* 3D Flipping Card Container */}
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ scale: isFlipped ? 1 : 1.015 }}
                  onClick={() => toggleFlip(pillar.id)}
                  className="relative w-full h-[460px] sm:h-[440px] select-none cursor-pointer rounded-2xl"
                >
                  {/* ========================================================
                      SISI DEPAN (FRONT FACE - SEPERTI SCREENSHOT 2)
                     ======================================================== */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    className={`absolute inset-0 w-full h-full rounded-2xl bg-[#0D121D]/95 border p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 group ${isUV
                        ? 'border-[#271E3D] hover:border-purple-500/60 hover:shadow-[0_0_35px_rgba(168,85,247,0.2)]'
                        : 'border-[#1E293B] hover:border-cyan-500/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]'
                      }`}
                  >
                    {/* Ambient Radial Gradient Glow */}
                    <div
                      className={`absolute inset-0 opacity-15 pointer-events-none transition-opacity duration-300 group-hover:opacity-30 ${isUV
                          ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.45),transparent_70%)]'
                          : 'bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.4),transparent_70%)]'
                        }`}
                    />

                    {/* Top Bar: Icon + Index */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="p-3 rounded-xl bg-[#141B2B] border border-[#1E293B] text-white shadow-inner group-hover:border-cyan-400/40 transition-colors">
                        <Icon className={`w-6 h-6 ${isUV ? 'text-purple-400' : 'text-cyan-400'}`} />
                      </div>
                      <span className="font-mono text-xs text-[#64748B] tracking-widest uppercase">
                        {pillar.index} // ARCH
                      </span>
                    </div>

                    {/* Watermark Icon Besar di Latar Belakang */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-52 h-52 text-white" />
                    </div>

                    {/* Bottom: Judul, Subtitle & Tombol Putih Khas Player */}
                    <div className="relative z-10">
                      <div className="flex items-end justify-between gap-4">
                        <div className="space-y-1.5 max-w-[70%]">
                          <h3 className={`text-xl sm:text-2xl font-bold text-white transition-colors tracking-tight ${isUV ? 'group-hover:text-purple-300' : 'group-hover:text-cyan-300'
                            }`}>
                            {pillar.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#94A3B8] font-mono line-clamp-2">
                            {pillar.shortDesc}
                          </p>
                        </div>

                        {/* Floating Pill Label + Tombol Bulat Putih */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="hidden sm:inline-block px-3 py-1 rounded-md bg-white text-black font-semibold text-[11px] font-mono shadow-md whitespace-nowrap">
                            {pillar.title.split(' ')[0]} — Details
                          </span>
                          <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-cyan-400 transition-all duration-200">
                            <Play className="w-4 h-4 fill-black translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================
                      SISI BELAKANG (BACK FACE - SEPERTI SCREENSHOT 3)
                     ======================================================== */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                    className={`absolute inset-0 w-full h-full rounded-2xl bg-[#0D121D]/98 border p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-300 ${isUV
                        ? 'border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.22)]'
                        : 'border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.2)]'
                      }`}
                  >
                    {/* Header Mini: Thumbnail Icon + Judul + Tombol Flip Balik */}
                    <div>
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1E293B]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#141B2B] border border-[#1E293B] flex items-center justify-center shrink-0 shadow-inner">
                            <Icon className={`w-5 h-5 ${isUV ? 'text-purple-400' : 'text-cyan-400'}`} />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                              {pillar.title}
                            </h3>
                            <p className="font-mono text-[11px] text-[#64748B]">
                              {pillar.index} // ARCH · {pillar.capabilities.length} capabilities
                            </p>
                          </div>
                        </div>

                        {/* Tombol Flip Kembali */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip(pillar.id);
                          }}
                          className="p-1.5 rounded-lg bg-[#141B2B] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Balik ke depan"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Paragraf Deskripsi */}
                      <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed pt-2.5 pb-2 line-clamp-3">
                        {pillar.description}
                      </p>

                      {/* Tracklist Bernomor 1, 2, 3, 4 (Persis Screenshot 3) */}
                      <div className="space-y-1">
                        {pillar.capabilities.map((cap, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#141B2B]/80 transition-colors group/item"
                          >
                            <div className="flex items-center gap-3 text-xs text-[#CBD5E1]">
                              <span className="font-mono text-xs text-[#64748B] w-4 text-right">
                                {cIdx + 1}
                              </span>
                              <span className="group-hover/item:text-white transition-colors font-medium line-clamp-1">
                                {cap}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider shrink-0 ml-2">
                              ARCH
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: Tags Tech Stack & Floating Pill */}
                    <div className="pt-2 border-t border-[#1E293B]/60 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {pillar.tags.slice(0, 5).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141B2B] text-[#94A3B8] border border-[#1E293B]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-end pt-1">
                        <span className="px-3 py-1 rounded-md bg-white text-black font-semibold text-[11px] font-mono shadow-md inline-flex items-center gap-1.5">
                          <RotateCcw className="w-3 h-3" />
                          <span>{pillar.title.split(' ')[0]} — Flip Back</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Section: What I Can Build (Real-World Client Solutions) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <ScrambleText
              text="WHAT I CAN BUILD FOR YOUR BUSINESS"
              triggerOnHover
              className="text-[#94A3B8]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatICanBuildServices.map((service, sIdx) => {
              const ServiceIcon = serviceIcons[service.icon] || Globe;
              return (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: sIdx * 0.05 }}
                >
                  <InteractiveCard
                    lightingMode={lightingMode}
                    className="p-4 rounded-lg bg-[#0F1420]/80 border border-[#1E293B] hover:bg-[#131B2B] transition-all duration-200 h-full"
                  >
                    <ServiceIcon className={`w-4 h-4 mb-3 ${isUV ? 'text-purple-400' : 'text-cyan-400'}`} />
                    <h4 className="text-sm font-semibold text-white mb-1.5">{service.title}</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{service.desc}</p>
                  </InteractiveCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section: Interactive Toolbox with Layout Transitions */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#64748B] uppercase tracking-widest mb-1">
                <ScrambleText text="ENGINEERING TOOLBOX" triggerOnHover />
              </div>
              <h3 className="text-2xl font-bold text-white">Verified Stack & Proficiencies</h3>
            </div>

            {/* Filter Categories */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0F1420] border border-[#1E293B] rounded-lg overflow-x-auto no-scrollbar whitespace-nowrap max-w-full">
              <button
                onClick={() => setSelectedTechCategory('all')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer touch-manipulation shrink-0 ${selectedTechCategory === 'all'
                    ? isUV ? 'bg-purple-600 text-white font-semibold' : 'bg-cyan-500 text-black font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                  }`}
              >
                All
              </button>
              {techCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTechCategory(cat.id)}
                  className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer touch-manipulation shrink-0 ${selectedTechCategory === cat.id
                      ? isUV ? 'bg-purple-600 text-white font-semibold' : 'bg-cyan-500 text-black font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                    }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {techCategories
                .filter((cat) => selectedTechCategory === 'all' || selectedTechCategory === cat.id)
                .map((cat) => (
                  <motion.div
                    key={cat.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <InteractiveCard
                      lightingMode={lightingMode}
                      className="p-5 rounded-lg bg-[#0D121D] border border-[#1E293B] space-y-3 h-full"
                    >
                      <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 font-mono text-xs">
                        <span className="font-bold text-white uppercase">{cat.title}</span>
                        <span className="text-[#64748B]">{cat.items.length} Techs</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, iIdx) => (
                          <motion.span
                            key={iIdx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: iIdx * 0.03 }}
                            className="px-2.5 py-1 rounded text-xs font-mono bg-[#141B2B] text-[#CBD5E1] border border-[#1E293B] hover:border-cyan-400/50 hover:text-white transition-colors cursor-default"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </InteractiveCard>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}