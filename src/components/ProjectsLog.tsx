import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, BarChart2, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { technicalProjects, websiteProjects } from '../data/projects';

type ProjectCategory = 'all' | 'technical' | 'website';

export function ProjectsLog() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const categories: { key: ProjectCategory; label: string; count: number }[] = [
    { key: 'all', label: 'ALL_LOGS', count: technicalProjects.length + websiteProjects.length },
    { key: 'technical', label: 'SYSTEM_ENG', count: technicalProjects.length },
    { key: 'website', label: 'WEB_DEPLOY', count: websiteProjects.length },
  ];

  const filteredProjects: Project[] =
    activeCategory === 'technical'
      ? technicalProjects
      : activeCategory === 'website'
        ? websiteProjects
        : [...technicalProjects, ...websiteProjects];

  return (
    <section id="projects" className="space-y-8">
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#3B82F6]">02 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#E0E2E5] font-mono tracking-widest uppercase">Case_Logs</h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-3 py-1.5 border rounded-sm transition-all duration-200 ${
              activeCategory === cat.key
                ? 'border-[#3B82F6]/50 bg-[#3B82F6]/10 text-[#3B82F6]'
                : 'border-[#30363D] bg-[#0F1115] text-[#8B949E] hover:border-[#8B949E]/50 hover:text-[#E0E2E5]'
            }`}
          >
            {cat.label} <span className="text-[#30363D] ml-1">[{cat.count}]</span>
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {filteredProjects.map((proj, idx) => (
          <motion.div 
            key={proj.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group"
          >
            <div 
              className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-3 cursor-pointer"
              onClick={() => toggleExpand(proj.id)}
            >
              <h3 className="text-base font-bold text-[#E0E2E5] group-hover:text-[#3B82F6] transition-colors flex items-center gap-3">
                <span className="font-mono text-xs text-[#8B949E] font-normal">{proj.id}</span>
                {proj.name}
                <ChevronDown size={16} className={`text-[#30363D] transition-transform duration-300 ${expandedIds.has(proj.id) ? 'rotate-180' : ''}`} />
              </h3>
              <div className="flex flex-wrap gap-1.5 items-center">
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[9px] uppercase font-mono px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/20 transition-colors rounded-sm mr-1"
                  >
                    <ExternalLink size={9} />
                    Live
                  </a>
                )}
                {proj.stack.map(s => (
                  <span key={s} className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-[#161B22] text-[#8B949E] border border-[#30363D] transition-colors group-hover:border-[#3B82F6]/30 rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-[13px] pt-1">
              <div className="border-l-2 border-[#F59E0B]/40 pl-3">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#F59E0B] mb-1.5">Issue_Detected</div>
                <p className="text-[#8B949E] leading-relaxed">{proj.problem}</p>
              </div>
              <div className="border-l-2 border-[#10B981]/40 pl-3">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#10B981] mb-1.5">Solution_Deployed</div>
                <p className="text-[#E0E2E5] leading-relaxed">{proj.solution}</p>
              </div>
            </div>
            
            <div 
              className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              onClick={() => toggleExpand(proj.id)}
            >
              <div className="font-mono text-[10px] text-[#10B981] flex items-center gap-2">
                <span className="text-[#30363D]">&gt;</span> <span className="uppercase font-bold tracking-wider">Result:</span> <span className="text-[#8B949E] normal-case tracking-normal">{proj.result}</span>
              </div>
              <div className="font-mono text-[9px] text-[#3B82F6] hover:text-white transition-colors flex items-center gap-1.5 uppercase bg-[#3B82F6]/10 px-2.5 py-1 rounded-sm border border-[#3B82F6]/20">
                <BarChart2 size={12} />
                {expandedIds.has(proj.id) ? 'Hide Metrics' : 'View Metrics'}
              </div>
            </div>

            <AnimatePresence>
              {expandedIds.has(proj.id) && proj.metrics && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 border border-[#30363D] bg-[#0D1117] p-5 rounded-sm">
                    <div className="font-mono text-[10px] text-[#8B949E] uppercase tracking-widest mb-5 border-b border-[#1F2937] pb-2 flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                         Diagnostic_Metrics
                      </span>
                      <span className="text-[#30363D] hidden sm:block">DATA_STREAM :: ACTIVE</span>
                    </div>
                    <div className="space-y-4">
                      {proj.metrics.map((metric, i) => (
                        <div key={metric.label}>
                          <div className="flex justify-between font-mono text-[10px] mb-1.5">
                            <span className="text-[#E0E2E5] uppercase">{metric.label}</span>
                            <span className="text-[#10B981]">{metric.valueLabel}</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#1F2937] rounded-full overflow-hidden relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 0.8, delay: 0.1 + (i * 0.1) }}
                              className="h-full bg-[#3B82F6] relative"
                            >
                               <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] w-full h-full animate-[shimmer_2s_infinite]"></div>
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
