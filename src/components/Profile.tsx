import { motion } from 'motion/react';

export function Profile() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6 pt-4"
    >
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#3B82F6]">01 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#E0E2E5] font-mono tracking-widest uppercase">Operator_Profile</h2>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8 pt-2">
        <div className="space-y-4 text-[#8B949E] leading-relaxed text-[13px] sm:text-sm">
          <p>
            Perspektif rekayasa saya terbentuk dari lantai pabrik operasional. Beralih dari pendelegasian mesin fisik ke optimasi skrip, saya telah terlatih untuk membangun struktur logika fungsional yang mengeliminasi inefisiensi manual.
          </p>
          <p>
            Membawa fondasi kokoh pada pemrosesan end-to-end (Python/Node.js) serta antarmuka reaktif (React/Native), saya memandang setiap kendala sebagai <span className="text-[#E0E2E5] font-mono bg-[#1F2937] px-1 rounded-sm text-[12px]">variabel yang bisa diselesaikan</span>. Baik itu melatih model YOLO untuk deteksi visual realtime, merajut pipeline backend, maupun mendesain dasbor analitik.
          </p>
        </div>
        
        <div className="font-mono text-[10px] sm:text-[11px] space-y-4 border-l border-[#1F2937] pl-4">
          <div>
            <span className="text-[#F59E0B] block mb-1">SYS_APPROACH</span>
            <span className="text-[#8B949E] leading-relaxed block">Pragmatism over hype. Technology as tactical operational leverage.</span>
          </div>
          <div>
            <span className="text-[#10B981] block mb-1">EXECUTION</span>
            <span className="text-[#8B949E] leading-relaxed block">End-to-End delivery.<br />Data ingestion &rarr; Backend node &rarr; UI Control.</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
