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
    { key: 'all', label: 'All Projects', count: technicalProjects.length + websiteProjects.length },
    { key: 'technical', label: 'Systems & AI', count: technicalProjects.length },
    { key: 'website', label: 'Web & Dashboards', count: websiteProjects.length },
  ];

  const filteredProjects: Project[] =
    activeCategory === 'technical'
      ? technicalProjects
      : activeCategory === 'website'
        ? websiteProjects
        : [...technicalProjects, ...websiteProjects];

  return (
    <section id="projects" className="space-y-8 pt-4">
      <div className="flex items-center gap-4 border-b border-[#1F2937] pb-3">
        <span className="font-mono text-[10px] text-[#06B6D4]">03 //</span>
        <h2 className="text-xs sm:text-sm font-bold text-[#F9FAFB] font-mono tracking-widest uppercase">Featured Projects</h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-4 py-2 border rounded-full transition-all duration-200 ${
              activeCategory === cat.key
                ? 'border-[#06B6D4]/50 bg-[#06B6D4]/10 text-[#06B6D4]'
                : 'border-[#1F2937] bg-[#111827] text-[#9CA3AF] hover:border-[#9CA3AF]/50 hover:text-[#F9FAFB]'
            }`}
          >
            {cat.label} <span className="text-[#4B5563] ml-1">[{cat.count}]</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((proj, idx) => (
          <motion.div 
            key={proj.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group relative p-5 rounded-sm border border-[#1F2937] bg-[#111827]/30 hover:border-[#374151] hover:bg-[#111827] transition-all duration-300"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div 
              className="flex flex-col md:flex-row md:items-start justify-between mb-5 gap-4 cursor-pointer relative z-10"
              onClick={() => toggleExpand(proj.id)}
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#F9FAFB] group-hover:text-[#06B6D4] transition-colors flex items-center gap-3 mb-2">
                  {proj.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {proj.stack.map(s => (
                    <span key={s} className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#1F2937]/50 text-[#D1D5DB] border border-[#374151] rounded-full">
                      {s}
                    </span>
                  ))}
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/20 transition-colors rounded-full ml-2"
                    >
                      <ExternalLink size={10} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
              <ChevronDown size={18} className={`text-[#4B5563] mt-1 transition-transform duration-300 ${expandedIds.has(proj.id) ? 'rotate-180' : ''}`} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-[13px] pt-2">
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#9CA3AF]">Problem</div>
                <p className="text-[#D1D5DB] leading-relaxed">{proj.problem}</p>
              </div>
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#06B6D4]">Solution</div>
                <p className="text-[#F9FAFB] leading-relaxed">{proj.solution}</p>
              </div>
            </div>
            
            <div 
              className="mt-6 pt-4 border-t border-[#1F2937]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
              onClick={() => toggleExpand(proj.id)}
            >
              <div className="text-[13px] text-[#F9FAFB] flex items-start sm:items-center gap-2">
                <span className="font-mono text-[10px] text-[#10B981] uppercase tracking-wider whitespace-nowrap">Result:</span>
                <span className="leading-relaxed">{proj.result}</span>
              </div>
              <div className="font-mono text-[10px] text-[#06B6D4] hover:text-white transition-colors flex items-center gap-1.5 uppercase bg-[#06B6D4]/10 px-3 py-1.5 rounded-full border border-[#06B6D4]/20 flex-shrink-0">
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
                  <div className="mt-5 border border-[#1F2937] bg-[#0B0F19] p-5 rounded-sm">
                    <div className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-widest mb-5 border-b border-[#1F2937] pb-3 flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                         Performance Impact
                      </span>
                    </div>
                    <div className="space-y-5">
                      {proj.metrics.map((metric, i) => (
                        <div key={metric.label}>
                          <div className="flex justify-between font-mono text-[11px] mb-2">
                            <span className="text-[#D1D5DB] uppercase">{metric.label}</span>
                            <span className="text-[#10B981] font-bold">{metric.valueLabel}</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#1F2937] rounded-full overflow-hidden relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 0.8, delay: 0.1 + (i * 0.1) }}
                              className="h-full bg-[#06B6D4] relative"
                            >
                               <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] w-full h-full animate-[shimmer_2s_infinite]"></div>
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
