import { motion } from 'motion/react';
import { Terminal, Download, ArrowRight } from 'lucide-react';
import { cvData } from '../data/certifications';
import cvFile from '../assets/myCV/My-CV.pdf';

/**
 * Hero Section — Elegant Tech Background
 * Minimalist dark navy with subtle cyan ambient glows
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
          BACKGROUND AMBIENCE SYSTEM (CLEAN)
          ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none bg-[#0B0F19]">
        
        {/* Subtle top-right cyan glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[120px] rounded-full mix-blend-screen animate-[glowPulse_8s_infinite]"></div>
        
        {/* Subtle bottom-left deep blue glow */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3B82F6]/5 blur-[100px] rounded-full mix-blend-screen"></div>

        {/* Minimal grid pattern */}
        <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDAuNWg0ME0wIDQwLjVoNDBNMC41IDB2NDBNNDAuNSAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50"></div>

        {/* Edge fade */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0B0F19_100%)]"></div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENT LAYER
          ══════════════════════════════════════════ */}
      
      {/* Terminal tag */}
      <div className="relative z-30 font-mono text-[11px] text-[#06B6D4] flex items-center gap-2 uppercase tracking-widest mb-4">
        <Terminal size={14} />
        Zaky Aulia Qolbi
      </div>

      {/* Heading */}
      <div className="relative z-30 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F9FAFB] leading-[1.1]">
          Building Smart Digital Systems <br className="hidden md:block" />
          with Code & AI.
        </h1>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-[11px] text-[#9CA3AF] uppercase tracking-wider pt-2">
          <span className="text-[#06B6D4] font-bold">Full-Stack Developer</span>
          <span className="text-[#30363D]">•</span>
          <span className="text-[#F9FAFB]">AI Automation Engineer</span>
        </div>
      </div>

      {/* Description */}
      <div className="relative z-30 pt-4">
        <p className="max-w-2xl text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
          Saya membangun aplikasi web, mobile, dashboard, dan sistem automation berbasis AI untuk membantu bisnis bekerja lebih cepat, rapi, dan efisien.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-30 flex flex-wrap items-center gap-4 pt-6">
        <motion.a 
          href="#projects" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 justify-center px-6 py-3 bg-[#F9FAFB] text-[#0B0F19] text-[12px] font-sans font-bold hover:bg-white transition-colors rounded-full shadow-[0_0_20px_rgba(249,250,251,0.1)] hover:shadow-[0_0_25px_rgba(249,250,251,0.25)]"
        >
          View My Projects <ArrowRight size={14} />
        </motion.a>
        <motion.a 
          href="#contact" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-6 py-3 border border-[#30363D] bg-[#0B0F19]/50 backdrop-blur-sm text-[#F9FAFB] text-[12px] font-sans font-medium hover:border-[#9CA3AF] hover:bg-[#111827] transition-colors rounded-full"
        >
          Contact Me
        </motion.a>
        <motion.a 
          href={cvFile}
          download="Zaky_Aulia_Qolbi_CV.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 justify-center px-6 py-3 border border-transparent text-[#9CA3AF] text-[12px] font-sans font-medium hover:text-[#06B6D4] transition-colors rounded-full"
        >
          <Download size={14} /> Download CV
        </motion.a>
      </div>
    </motion.section>
  );
}
