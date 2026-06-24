import { motion } from 'motion/react';
import { timelineEvents } from '../data/timeline';

export function Timeline() {
  return (
    <section className="space-y-6 pt-4">
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#06B6D4]">05 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#F9FAFB] font-mono tracking-widest uppercase">Experience & Journey</h2>
      </div>

      <div className="relative pl-3.5 space-y-7 before:absolute before:inset-0 before:ml-[4px] before:-translate-x-px before:h-full before:w-[1px] before:bg-[#1F2937]">
        {timelineEvents.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.15 }}
            className="relative"
          >
            <div className={`absolute -left-[16px] top-1.5 w-2 h-2 rounded-full border-2 border-[#0F1115] ${idx === 0 ? 'bg-[#10B981]' : 'bg-[#30363D]'}`}></div>
            <div className="font-mono text-[9px] text-[#8B949E] mb-1">{event.year}</div>
            <h3 className="text-[12px] font-bold text-[#E0E2E5] mb-1 leading-snug">{event.role}</h3>
            <p className="text-[11px] text-[#8B949E] leading-relaxed">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
