import { motion } from 'motion/react';
import { socialLinks } from '../data/socialLinks';

export function ContactWindow() {
  return (
    <section id="contact" className="pt-8 pb-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border border-[#1F2937] bg-[#161B22] p-6 lg:p-8 rounded-sm"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3 flex-1">
             <div className="font-mono text-[10px] text-[#3B82F6] uppercase tracking-widest">Initialize Connection</div>
             <h2 className="text-xl font-bold text-[#E0E2E5] tracking-tight">Open for System Handshake</h2>
             <p className="text-[13px] text-[#8B949E] max-w-sm leading-relaxed">
               Membutuhkan arsitek aplikasi, kustomisasi automasi skrip, atau dasbor analitik real-time? Terminal ini selalu <span className="text-[#10B981]">ready</span>.
             </p>
          </div>
          <div className="font-mono text-[11px] bg-[#0D1117] border border-[#30363D] p-5 w-full md:w-auto rounded-sm">
             <div className="text-[#8B949E] mb-3">zaky@operator:~$ <span className="text-[#E0E2E5]">social --list</span></div>
             <div className="space-y-1.5 pl-2 leading-relaxed">
               {socialLinks.map(link => (
                 <div key={link.id}>
                   <span className="text-[#3B82F6]">{link.label}:</span>{' '}
                   <a 
                     href={link.url}
                     target={link.type === 'email' ? undefined : '_blank'}
                     rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                     className="hover:text-white transition-colors duration-200 ml-1"
                   >
                     {link.displayText}
                   </a>
                 </div>
               ))}
               <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1F2937]">
                 <span className="w-1.5 h-1.5 bg-[#10B981] animate-pulse"></span>
                 <span className="text-[#10B981]">AWAITING_INPUT...</span>
               </div>
             </div>
          </div>
        </div>
      </motion.div>
      <div className="mt-6 font-mono text-[9px] text-[#30363D] flex justify-between uppercase">
        <span>sys_shutdown --delay 0</span>
        <span>Version 2.4.0</span>
      </div>
    </section>
  );
}
