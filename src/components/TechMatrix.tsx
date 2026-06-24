import { motion } from 'motion/react';
import { techCategories } from '../data/techStack';

export function TechMatrix() {
  return (
    <section className="space-y-6 pt-4">
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#06B6D4]">04 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#F9FAFB] font-mono tracking-widest uppercase">Tech Stack</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono pt-2">
        {techCategories.map((cat, idx) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-5 border border-[#1F2937] bg-[#111827]/50 rounded-sm hover:border-[#374151] transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-3 border-b border-[#1F2937]/50 pb-2">
               <span className="text-[12px] font-bold text-[#F9FAFB]">{cat.title}</span>
               <span className="text-[9px] text-[#4B5563]">0{idx + 1}</span>
            </div>
            <div className="flex flex-wrap gap-2">
               {cat.items.map(item => (
                 <span key={item} className="text-[11px] text-[#9CA3AF] bg-[#111827] border border-[#374151] px-2 py-1 rounded-sm">
                   {item}
                 </span>
               ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
