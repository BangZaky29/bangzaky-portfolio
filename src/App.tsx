import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { TechMatrix } from './components/TechMatrix';
import { ProjectsLog } from './components/ProjectsLog';
import { Certifications } from './components/Certifications';
import { Timeline } from './components/Timeline';
import { ContactWindow } from './components/ContactWindow';

export default function App() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E0E2E5] font-sans selection:bg-[#3B82F6]/30 selection:text-white">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-4 pb-12 space-y-12 lg:space-y-16">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F2937] pb-4 gap-4">
          <div className="font-mono text-[11px] text-[#8B949E] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#3B82F6]">SYS_AUTH:</span>
              <span className="text-[#E0E2E5] uppercase tracking-wider">ZAKY_AULIA_QOLBI // OPR_v2.4</span>
            </div>
            <div className="hidden sm:block text-[#30363D]">|</div>
            <div className="flex items-center gap-2">
              <span>LAT: -6.2088</span>
              <span>LON: 106.8456</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <div className="text-[#8B949E]">
              {time.toISOString().replace('T', ' ').substring(0, 19)} UTC
            </div>
            <div className="flex items-center gap-2 border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
              </span>
              <span className="text-[#10B981] uppercase tracking-wider">Sys_Online</span>
            </div>
          </div>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
           <main className="flex-1 space-y-20 lg:space-y-24 min-w-0">
             <Hero />
             <Profile />
             <ProjectsLog />
             <Certifications />
             <ContactWindow />
           </main>
           
           <aside className="w-full lg:w-72 lg:flex-shrink-0 space-y-12 lg:sticky lg:top-8">
             <TechMatrix />
             <Timeline />
           </aside>
        </div>
      </div>
    </div>
  );
}
