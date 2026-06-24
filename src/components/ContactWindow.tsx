import { motion } from 'motion/react';
import { socialLinks } from '../data/socialLinks';
import { ArrowUpRight } from 'lucide-react';

export function ContactWindow() {
  return (
    <section id="contact" className="pt-8 pb-4 space-y-6">
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#06B6D4]">07 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#F9FAFB] font-mono tracking-widest uppercase">Contact</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-8 lg:p-12 border border-[#1F2937] bg-[#111827]/30 rounded-sm relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#06B6D4]/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10">
          <div className="space-y-4 max-w-md">
             <h2 className="text-3xl sm:text-4xl font-bold text-[#F9FAFB] tracking-tight">Let's Build Something Useful.</h2>
             <p className="text-[14px] text-[#9CA3AF] leading-relaxed">
               Membutuhkan arsitek aplikasi, kustomisasi automasi AI, atau dasbor analitik operasional? Saya terbuka untuk proyek baru dan kolaborasi teknis.
             </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3">
             {socialLinks.map(link => (
               <motion.a 
                 key={link.id}
                 href={link.url}
                 target={link.type === 'email' ? undefined : '_blank'}
                 rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                 whileHover={{ x: 4 }}
                 className="flex items-center justify-between gap-8 px-6 py-4 border border-[#1F2937] bg-[#0B0F19] hover:bg-[#111827] hover:border-[#06B6D4]/50 transition-all duration-300 rounded-sm group"
               >
                 <div className="flex items-center gap-3">
                   <span className="text-[#06B6D4]">{/* You can map actual lucide icons here if you prefer, leaving as text or keeping simple */}</span>
                   <div>
                     <div className="text-[11px] font-mono text-[#9CA3AF] uppercase mb-0.5">{link.label}</div>
                     <div className="text-[13px] font-medium text-[#F9FAFB] group-hover:text-white">{link.displayText}</div>
                   </div>
                 </div>
                 <ArrowUpRight size={16} className="text-[#4B5563] group-hover:text-[#06B6D4] transition-colors" />
               </motion.a>
             ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
