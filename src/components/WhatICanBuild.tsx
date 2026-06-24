import { motion } from 'motion/react';
import { MonitorPlay, Database, Activity, Cpu, LineChart, Globe } from 'lucide-react';

const services = [
  {
    icon: <Globe size={20} />,
    title: 'Company Profile Website',
    desc: 'Website representatif dengan SEO, performa tinggi, dan desain premium.',
  },
  {
    icon: <Activity size={20} />,
    title: 'Admin & Business Dashboard',
    desc: 'Sistem monitoring operasional dan data analitik real-time.',
  },
  {
    icon: <Cpu size={20} />,
    title: 'AI Automation Tools',
    desc: 'Automasi tugas repetitif dan integrasi API AI untuk efisiensi.',
  },
  {
    icon: <MonitorPlay size={20} />,
    title: 'Mobile App Development',
    desc: 'Aplikasi lintas platform dengan fitur khusus dan sinkronisasi data.',
  },
  {
    icon: <LineChart size={20} />,
    title: 'Trading Signal Dashboard',
    desc: 'Integrasi sistem algoritmik MT5 dengan dashboard monitoring.',
  },
  {
    icon: <Database size={20} />,
    title: 'Backend & API Integration',
    desc: 'Arsitektur database scalable, payment gateway, dan penyediaan API.',
  },
];

export function WhatICanBuild() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6 pt-4"
    >
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#06B6D4]">02 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#F9FAFB] font-mono tracking-widest uppercase">What I Can Build</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {services.map((svc, idx) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group p-5 border border-[#1F2937] bg-[#111827]/50 rounded-sm hover:border-[#06B6D4]/40 hover:bg-[#111827] transition-all duration-300"
          >
            <div className="text-[#06B6D4] mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
              {svc.icon}
            </div>
            <h3 className="text-sm font-bold text-[#F9FAFB] mb-2">{svc.title}</h3>
            <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
              {svc.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
