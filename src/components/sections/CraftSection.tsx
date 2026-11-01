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
  CheckCircle2,
  Terminal
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
  const isUV = lightingMode === 'uv';

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

        {/* 4 Core Pillars Grid with InteractiveCard 3D Tilt & Cursor Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {craftPillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
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
              >
                <InteractiveCard
                  lightingMode={lightingMode}
                  className={`p-6 sm:p-8 rounded-xl bg-[#0D121D]/90 border transition-all duration-300 h-full flex flex-col justify-between group ${
                    isUV
                      ? 'border-[#271E3D] hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]'
                      : 'border-[#1E293B] hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                  }`}
                >
                  <div>
                    {/* Index tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-lg bg-[#141B2B] border border-[#1E293B] text-white">
                        <Icon className={`w-5 h-5 ${isUV ? 'text-purple-400' : 'text-cyan-400'}`} />
                      </div>
                      <span className="font-mono text-xs text-[#64748B] tracking-wider">
                        {pillar.index} // ARCH
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Capabilities list */}
                    <div className="space-y-2 mb-6 font-mono text-xs">
                      {pillar.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-[#CBD5E1]">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isUV ? 'text-purple-400' : 'text-cyan-400'}`} />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1E293B]/60">
                    {pillar.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#141B2B] text-[#94A3B8] border border-[#1E293B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </InteractiveCard>
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
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0F1420] border border-[#1E293B] rounded-lg">
              <button
                onClick={() => setSelectedTechCategory('all')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer touch-manipulation ${
                  selectedTechCategory === 'all'
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
                  className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer touch-manipulation ${
                    selectedTechCategory === cat.id
                      ? isUV ? 'bg-purple-600 text-white font-semibold' : 'bg-cyan-500 text-black font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack Cards with Layout Animations */}
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
