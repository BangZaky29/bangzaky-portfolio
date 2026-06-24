import { useState, useEffect } from 'react';
import { IntroSequence } from './components/IntroSequence';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { WhatICanBuild } from './components/WhatICanBuild';
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
    <IntroSequence>
      <div className="min-h-screen bg-[#0B0F19] text-[#F9FAFB] font-sans selection:bg-[#06B6D4]/30 selection:text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-4 pb-20 space-y-16 lg:space-y-24">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F2937] pb-4 gap-4">
          <div className="font-mono text-[11px] text-[#9CA3AF] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#06B6D4]">SYS_AUTH:</span>
              <span className="text-[#F9FAFB] uppercase tracking-wider">ZAKY_AULIA_QOLBI // OPR_v3.0</span>
            </div>
            <div className="hidden sm:block text-[#30363D]">|</div>
            <div className="flex items-center gap-2">
              <span>LAT: -6.2088</span>
              <span>LON: 106.8456</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <div className="text-[#9CA3AF]">
              {time.toISOString().replace('T', ' ').substring(0, 19)} UTC
            </div>
            <div className="flex items-center gap-2 border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-1 rounded-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
              </span>
              <span className="text-[#10B981] uppercase tracking-wider">Sys_Online</span>
            </div>
          </div>
        </header>
        
        <main className="space-y-20 lg:space-y-28">
          <Hero />
          <Profile />
          <WhatICanBuild />
          <ProjectsLog />
          <TechMatrix />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            <Timeline />
            <Certifications />
          </div>

          <ContactWindow />
        </main>
      </div>
    </div>
    </IntroSequence>
  );
}
