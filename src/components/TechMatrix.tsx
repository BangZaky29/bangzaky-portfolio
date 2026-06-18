import { motion } from 'motion/react';
import { techCategories } from '../data/techStack';

export function TechMatrix() {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1 border-b border-[#1F2937] pb-2">
        <h2 className="text-[11px] font-bold text-[#8B949E] font-mono tracking-widest uppercase">SYS_DEPENDENCIES</h2>
      </div>

      <div className="space-y-5 font-mono">
        {techCategories.map((cat, idx) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1.5">
               <span className="text-[10px] text-[#3B82F6]">{cat.title}</span>
               <span className="text-[9px] text-[#30363D]">0{idx + 1}</span>
            </div>
            <div className="text-[11px] text-[#E0E2E5] leading-relaxed">
               {cat.items.join(' / ')}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
