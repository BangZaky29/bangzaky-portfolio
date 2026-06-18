import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import darkLabBg from '../assets/images/dark_lab_interior_1781777423739.jpg';

/**
 * Hero Section — Dark Cinematic Background
 * 
 * Multi-layer architecture (bottom → top):
 * L0: Pitch-black base (#050507)
 * L1: Static room image — ultra-low opacity, blurred, desaturated
 * L2: Flickering light reveal — animated opacity with localized glow
 * L3: Atmospheric haze — radial gradient fog
 * L4: Vignette — heavy edge darkening
 * L5: Text protection overlay — gradient from solid dark to transparent
 * L6: Dust particles — CSS floating specks
 * L7: Scanlines — subtle CRT texture
 * L8: Film grain noise — animated texture overlay
 */
export function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6 relative rounded-sm overflow-hidden p-6 sm:p-10 -mx-6 sm:-mx-10 border border-[#1F2937]/30"
    >
      {/* ══════════════════════════════════════════
          BACKGROUND AMBIENCE SYSTEM
          ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none bg-[#050507]">
        
        {/* L1: Static Base Room — nearly invisible, sets depth */}
        <img 
          src={darkLabBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover blur-[6px] opacity-[0.07] grayscale" 
          referrerPolicy="no-referrer"
          loading="eager"
        />
        
        {/* L2: Flickering Light Reveal — lamp short-circuit effect */}
        <div className="absolute inset-0 z-10 animate-[slowFlicker_12s_infinite] mix-blend-screen">
          {/* Light source glow point — positioned at upper-right matching the lamp in image */}
          <div className="absolute top-[15%] right-[25%] w-[350px] h-[350px] bg-gradient-to-br from-transparent via-[#C8E0FF]/8 to-transparent blur-[80px] animate-[glowPulse_8s_infinite]"></div>
          
          {/* Room reveal during flash — the image becomes briefly visible */}
          <img 
            src={darkLabBg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover blur-[3px] opacity-[0.18] mix-blend-plus-lighter" 
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </div>

        {/* L3: Atmospheric Haze — breathing fog layer */}
        <div className="absolute inset-0 z-15 animate-[hazePulse_15s_ease-in-out_infinite]">
          <div className="absolute top-[10%] right-[20%] w-[500px] h-[300px] bg-gradient-to-b from-[#2A3A4A]/10 via-[#1A2535]/5 to-transparent blur-[60px] rounded-full"></div>
        </div>

        {/* L4: Vignette — deep edge darkening, creates depth */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,7,0.4)_50%,#050507_90%)]"></div>

        {/* L5: Text Protection Overlay — strong left-side darkening for readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/92 sm:via-[#0F1115]/80 to-[#0F1115]/50"></div>
        
        {/* Additional top/bottom shadow falloff */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507]/70"></div>
        
        {/* L6: Dust Particles — floating atmospheric detail */}
        <div className="absolute inset-0 z-25 overflow-hidden">
          <div className="absolute top-[60%] right-[35%] w-[2px] h-[2px] bg-white/20 rounded-full animate-[dustFloat_8s_infinite_1s]"></div>
          <div className="absolute top-[40%] right-[50%] w-[1.5px] h-[1.5px] bg-white/15 rounded-full animate-[dustFloat_12s_infinite_3s]"></div>
          <div className="absolute top-[70%] right-[20%] w-[1px] h-[1px] bg-white/25 rounded-full animate-[dustFloat_10s_infinite_5s]"></div>
          <div className="absolute top-[55%] right-[65%] w-[1.5px] h-[1.5px] bg-white/10 rounded-full animate-[dustFloat_14s_infinite_7s]"></div>
        </div>

        {/* L7: Scanlines — subtle CRT texture for projected text feel */}
        <div className="absolute inset-0 z-25 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+Cjwvc3ZnPg==')] opacity-40"></div>

        {/* L8: Film Grain Noise — animated fine texture */}
        <div 
          className="absolute inset-0 z-25 opacity-[0.04] mix-blend-overlay animate-[noiseShift_0.5s_steps(3)_infinite]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        ></div>

        {/* Inset shadow for room depth feeling */}
        <div className="absolute inset-0 z-25 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]"></div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENT LAYER
          ══════════════════════════════════════════ */}
      
      {/* Terminal tag */}
      <div className="relative z-30 font-mono text-[11px] text-[#8B949E] flex items-center gap-2 uppercase tracking-widest mb-4">
        <Terminal size={14} />
        Initialize Profile
      </div>

      {/* Heading */}
      <div className="relative z-30 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#E0E2E5] leading-snug">
          Engineering digital solutions <br className="hidden md:block" />
          with code-driven automation.
        </h1>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-[11px] text-[#8B949E] uppercase tracking-wider pt-2">
          <span className="text-[#10B981]">&gt; role:</span> Python Developer
          <span className="text-[#30363D]">/</span>
          AI Automation
          <span className="text-[#30363D]">/</span>
          System Architect
        </div>
      </div>

      {/* Description */}
      <div className="relative z-30 pl-4 border-l-2 border-[#3B82F6]/30">
        <p className="max-w-xl text-sm sm:text-[15px] text-[#8B949E] leading-relaxed">
          Spesialis dalam otomasi tangguh dengan Python, integrasi cerdas, dan kontrol antarmuka. 
          Saya merancang infrastruktur digital dari penulisan skrip backend, model machine learning, 
          hingga penggelaran node deployment modern yang menjembatani operasi teknis dengan antarmuka presisi.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-30 flex flex-wrap items-center gap-4 pt-4">
        <a href="#projects" className="inline-flex items-center justify-center px-6 py-2.5 bg-[#E0E2E5] text-[#0F1115] text-[11px] font-mono uppercase font-bold hover:bg-white transition-colors rounded-sm shadow-[0_0_15px_rgba(224,226,229,0.1)] hover:shadow-[0_0_20px_rgba(224,226,229,0.2)]">
          Deploy_Projects()
        </a>
        <a href="#contact" className="inline-flex items-center justify-center px-6 py-2.5 border border-[#30363D] bg-[#0F1115]/50 backdrop-blur-sm text-[#E0E2E5] text-[11px] font-mono uppercase font-bold hover:border-[#8B949E] hover:bg-[#161B22]/80 transition-colors rounded-sm">
          Init_Contact
        </a>
      </div>
    </motion.section>
  );
}
