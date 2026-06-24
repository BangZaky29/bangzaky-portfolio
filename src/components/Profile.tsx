import { motion } from 'motion/react';

export function Profile() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6 pt-4"
    >
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#06B6D4]">01 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#F9FAFB] font-mono tracking-widest uppercase">About Me</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 pt-2 items-center">
        <div className="space-y-4 text-[#9CA3AF] leading-relaxed text-[13px] sm:text-[15px] max-w-3xl">
          <p>
            Saya terbiasa membangun solusi digital dari tahap ide, UI, backend, database, hingga deployment. Fokus utama saya adalah menciptakan sistem yang rapi, scalable, dan benar-benar berguna untuk user maupun operasional bisnis.
          </p>
          <p>
            Dengan fondasi kokoh pada pemrosesan backend (Python/Node.js) serta antarmuka reaktif (React/Tailwind), saya memastikan setiap arsitektur yang dibangun bukan hanya <span className="text-[#F9FAFB] font-mono border-b border-[#06B6D4]/50">terlihat modern</span>, tapi juga berfungsi menyelesaikan masalah riil di lapangan.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-[#1F2937] bg-[#111827]/50 rounded-sm">
            <div className="text-2xl font-bold text-[#F9FAFB] mb-1">2+</div>
            <div className="text-[10px] font-mono text-[#9CA3AF] uppercase">Years Exp</div>
          </div>
          <div className="p-4 border border-[#1F2937] bg-[#111827]/50 rounded-sm">
            <div className="text-2xl font-bold text-[#F9FAFB] mb-1">10+</div>
            <div className="text-[10px] font-mono text-[#9CA3AF] uppercase">Projects</div>
          </div>
          <div className="col-span-2 p-4 border border-[#06B6D4]/30 bg-[#06B6D4]/5 rounded-sm">
            <div className="text-[12px] font-bold text-[#06B6D4] mb-1 uppercase tracking-wider">Focus</div>
            <div className="text-[11px] font-mono text-[#F9FAFB]">AI & Automation System</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
