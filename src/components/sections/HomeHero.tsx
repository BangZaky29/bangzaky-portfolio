import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, FileText, Send, Sparkles } from 'lucide-react';
import { LightingMode, NavSectionId } from '../../types';
import { CreativeCanvas } from '../3d/CreativeCanvas';
import { ScrambleText, RevealTitle, FadeUp } from '../motion/RevealText';
import { CountUp } from '../motion/CountUp';
import { InteractiveCard } from '../motion/InteractiveCard';

interface HomeHeroProps {
  lightingMode: LightingMode;
  onNavigate: (sectionId: NavSectionId) => void;
}

export function HomeHero({ lightingMode, onNavigate }: HomeHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parallax Scroll Physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  const isUV = lightingMode === 'uv';

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative pt-6 pb-16 sm:pb-24 border-b border-[#1E2533] overflow-hidden"
    >
      <div className="w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-8">

        {/* Section Index Marker with Terminal Scramble Decode */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E293B]/60 text-xs font-mono text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>01</span>
            <span className="text-[#334155]">/</span>
            <ScrambleText
              text="ARCHITECTURAL STATEMENT"
              triggerOnHover
              className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[#94A3B8] text-[11px] tracking-wide hidden sm:inline">
              AVAILABLE FOR CONTRACT & DEV // 2026
            </span>
            <span className="text-[#94A3B8] text-[10px] tracking-wide sm:hidden">
              AVAILABLE // 2026
            </span>
          </div>
        </div>

        {/* Hero Main Grid: Text on Left (Parallax), 3D Interactive Canvas on Right (Parallax Scale) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 sm:pt-12">

          {/* Left Column: Parallax Typography & Copy */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="lg:col-span-7 space-y-6 will-change-transform"
          >

            {/* 3D Masked Slide-Up Titles (Semantic H1 for SEO) */}
            <div className="space-y-1">
              <h1 className="sr-only">Zaky Aulia Qolbi — Creative Developer & AI Systems Engineer</h1>
              <RevealTitle
                as="h1"
                text="CREATIVE DEVELOPER"
                highlightWords={['DEVELOPER']}
                highlightClassName={
                  isUV
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300'
                }
                className="text-[clamp(2.1rem,7vw,4.5rem)] font-extrabold tracking-tight leading-[1.08] text-[#F8FAFC]"
              />

              <RevealTitle
                as="h2"
                text="& AI SYSTEMS ENGINEER"
                delay={0.15}
                className="text-[clamp(1.2rem,4vw,2.75rem)] font-extrabold tracking-tight text-white/90"
              />
            </div>

            {/* Paragraph Fade Up */}
            <FadeUp delay={0.25}>
              <p className="text-sm sm:text-lg text-[#CBD5E1] max-w-2xl leading-relaxed font-normal">
                Hi, saya <span className="text-white font-bold">Zaky Aulia Qolbi</span>. Saya membangun sistem web modern, visual 3D interaktif, aplikasi mobile lintas platform, dan engine automasi berbasis AI untuk membantu bisnis bekerja lebih cepat, presisi, dan efisien.
              </p>
            </FadeUp>

            {/* Action CTA Buttons */}
            <FadeUp delay={0.35}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={() => onNavigate('work')}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold transition-all duration-200 cursor-pointer touch-manipulation active:scale-95 ${isUV
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-[#090D16] shadow-[0_0_20px_rgba(6,182,212,0.35)]'
                    }`}
                >
                  <span>EXPLORE WORK</span>
                  <ArrowDownRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#111827] hover:bg-[#1A2234] border border-[#1E293B] text-white transition-all duration-200 cursor-pointer touch-manipulation active:scale-95"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>GET IN TOUCH</span>
                </button>

                <a
                  href="/myCV/My-CV.pdf"
                  download="Zaky Aulia Qolbi - Creative Developer & AI Systems Engineer.pdf"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#111827]/60 hover:bg-[#1A2234] border border-[#1E293B] text-[#94A3B8] hover:text-white transition-all duration-200 touch-manipulation active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>RESUME (PDF)</span>
                </a>
              </div>
            </FadeUp>

          </motion.div>

          {/* Right Column: 3D Interactive Canvas with Parallax Scaling */}
          <motion.div
            style={{ y: canvasY, scale: canvasScale }}
            className="lg:col-span-5 relative will-change-transform"
          >
            <div className="relative rounded-2xl border border-[#1E293B] bg-gradient-to-b from-[#0F1420]/80 to-[#08090C]/90 p-2 overflow-hidden shadow-2xl">
              <CreativeCanvas lightingMode={lightingMode} />
            </div>
          </motion.div>

        </div>

        {/* Diallo-Style Metrics Telemetry Bar with Animated CountUp */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-12 mt-8 border-t border-[#1E2533] font-mono text-xs">

          <InteractiveCard
            lightingMode={lightingMode}
            className="p-3.5 bg-[#0D121D] border border-[#1E293B] rounded-lg"
          >
            <div className="text-[#64748B] text-[10px] uppercase">EXPERIENCE</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1">
              <CountUp value={2} suffix="+ YEARS" />
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">Software Engineering</div>
          </InteractiveCard>

          <InteractiveCard
            lightingMode={lightingMode}
            className="p-3.5 bg-[#0D121D] border border-[#1E293B] rounded-lg"
          >
            <div className="text-[#64748B] text-[10px] uppercase">PRODUCTION DELIVERIES</div>
            <div className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1">
              <CountUp value={14} suffix="+ SHIPPED" />
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">AI Bots & Websites</div>
          </InteractiveCard>

          <InteractiveCard
            lightingMode={lightingMode}
            className="p-3.5 bg-[#0D121D] border border-[#1E293B] rounded-lg"
          >
            <div className="text-[#64748B] text-[10px] uppercase">BOT AUTOPILOT</div>
            <div className="text-xl sm:text-2xl font-bold text-purple-400 mt-1">
              <CountUp value={24} suffix="/7 ACTIVE" />
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">MT5 MQL5 Execution</div>
          </InteractiveCard>

          <InteractiveCard
            lightingMode={lightingMode}
            className="p-3.5 bg-[#0D121D] border border-[#1E293B] rounded-lg"
          >
            <div className="text-[#64748B] text-[10px] uppercase">EDGE RUNTIME SPEED</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
              <CountUp value={50} prefix="< " suffix="MS TTFB" />
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">Global Edge Cloud</div>
          </InteractiveCard>

        </div>

      </div>
    </section>
  );
}
