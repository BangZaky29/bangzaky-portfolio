import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers } from 'lucide-react';
import { Project, LightingMode } from '../../types';
import { allProjects } from '../../data/projects';
import { StackingProjectCard } from '../work/StackingProjectCard';
import { CaseStudyModal } from '../ui/CaseStudyModal';
import { ScrambleText, RevealTitle, FadeUp } from '../motion/RevealText';

interface WorkSectionProps {
  lightingMode: LightingMode;
}

type FilterCategory = 'all' | 'web' | 'ai' | 'mobile';

export function WorkSection({ lightingMode }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isUV = lightingMode === 'uv';

  const filteredProjects = allProjects.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'mobile') return p.category === 'mobile' || p.category === 'system';
    return p.category === activeCategory;
  });

  const categories: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: allProjects.length },
    { id: 'web', label: 'Web & Client', count: allProjects.filter((p) => p.category === 'web').length },
    { id: 'ai', label: 'AI & Bot Systems', count: allProjects.filter((p) => p.category === 'ai').length },
    { id: 'mobile', label: 'Mobile & Ops', count: allProjects.filter((p) => p.category === 'mobile' || p.category === 'system').length },
  ];

  return (
    <section id="work" className="py-20 border-b border-[#1E2533] overflow-visible">
      <div className="w-full max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E293B]/60">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-2">
              <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>03</span>
              <span>/</span>
              <ScrambleText
                text="SELECTED CASE STUDIES"
                triggerOnHover
                className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
              />
            </div>
            
            <RevealTitle
              text="WORK — PRODUCTION & CODE"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            />
          </div>

          {/* Filter Tabs with Active Layout Pill (Fluid Horizontally Scrollable on Mobile) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0F1420] border border-[#1E293B] rounded-xl font-mono text-xs overflow-x-auto no-scrollbar whitespace-nowrap max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-lg transition-all cursor-pointer touch-manipulation shrink-0 ${
                  activeCategory === cat.id
                    ? isUV
                      ? 'text-white font-bold'
                      : 'text-black font-bold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeWorkCategoryPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-lg ${
                      isUV
                        ? 'bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                        : 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    }`}
                  />
                )}
                <span className="relative z-10">{cat.label} ({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stack Overview Caption */}
        <FadeUp delay={0.1}>
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTERACTIVE STACKING SHOWCASE // CLICK ANY HEADER TO JUMP</span>
            </div>
            <span>{filteredProjects.length} CASE STUDIES</span>
          </div>
        </FadeUp>

        {/* Interactive Sticky Stacking Cards (Paper-Stack Scroll Effect) */}
        <div className="relative pt-2 pb-16 w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {filteredProjects.map((project, idx) => (
                <StackingProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  total={filteredProjects.length}
                  lightingMode={lightingMode}
                  onOpenCaseStudy={(proj) => setSelectedProject(proj)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lightingMode={lightingMode}
      />
    </section>
  );
}
