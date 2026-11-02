import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Projector } from 'lucide-react';
import { Project, LightingMode } from '../../types';
import { allProjects } from '../../data/projects';
import { ProjectorCinema } from '../work/ProjectorCinema';
import { CaseStudyModal } from '../ui/CaseStudyModal';
import { ScrambleText, RevealTitle } from '../motion/RevealText';
import { soundEngine } from '../../audio/soundEngine';
import { useAdaptiveLayout } from '../../hooks/useAdaptiveLayout';

interface WorkSectionProps {
  lightingMode: LightingMode;
}

type FilterCategory = 'all' | 'web' | 'ai' | 'mobile';

export function WorkSection({ lightingMode }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollDirection, setScrollDirection] = useState<number>(1);
  const prevIndexRef = useRef<number>(0);

  const { isMobile } = useAdaptiveLayout();
  const sectionRef = useRef<HTMLElement>(null);

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

  // Pinned scroll-driven track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = filteredProjects.length;
    if (total <= 1) return;
    const clampedProgress = Math.min(0.9999, Math.max(0, latest));
    const targetIdx = Math.min(total - 1, Math.floor(clampedProgress * total));

    if (targetIdx !== activeProjectIndex) {
      setScrollDirection(targetIdx > activeProjectIndex ? 1 : -1);
      setActiveProjectIndex(targetIdx);
      if (Math.abs(targetIdx - prevIndexRef.current) === 1) {
        soundEngine.playSlide();
      }
      prevIndexRef.current = targetIdx;
    }
  });

  const handleCategoryChange = (catId: FilterCategory) => {
    soundEngine.playClick();
    setActiveCategory(catId);
    setActiveProjectIndex(0);
    prevIndexRef.current = 0;
  };

  const handleSelectProjectWithScroll = (idx: number) => {
    setActiveProjectIndex(idx);
    soundEngine.playSlide();
    prevIndexRef.current = idx;

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = rect.top + currentScrollTop;
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0 && filteredProjects.length > 1) {
        const targetScrollY = sectionTop + ((idx + 0.45) / filteredProjects.length) * totalScrollable;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    }
  };

  // Dynamic scroll height based on project count (gives smooth scroll distance)
  const scrollHeightVh = Math.max(filteredProjects.length * (isMobile ? 50 : 65), 160);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ height: `${scrollHeightVh}vh` }}
      className="relative border-b border-[#1E2533]"
    >
      {/* ─── Pinned Sticky Cinema Viewport ─── */}
      <div className="sticky top-[52px] sm:top-[56px] h-[calc(100vh-52px)] sm:h-[calc(100vh-56px)] flex flex-col justify-between py-4 sm:py-6 overflow-hidden bg-[#08090C]">
        
        <div className="w-full max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1E293B]/60">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#64748B] mb-1.5">
                <span className={isUV ? 'text-purple-400 font-bold' : 'text-cyan-400 font-bold'}>03</span>
                <span>/</span>
                <ScrambleText
                  text="PROJECTOR CINEMA SHOWCASE"
                  triggerOnHover
                  className={isUV ? 'text-purple-300' : 'text-[#94A3B8]'}
                />
              </div>
              
              <RevealTitle
                text="WORK — PRODUCTION & CODE"
                className="text-2xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white font-sans"
              />
            </div>

            {/* Filter Tabs with Active Layout Pill (Fluid Horizontally Scrollable on Mobile) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0F1420] border border-[#1E293B] rounded-xl font-mono text-xs overflow-x-auto no-scrollbar whitespace-nowrap max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative px-3 py-1.5 rounded-lg transition-all cursor-pointer touch-manipulation shrink-0 ${
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

          {/* Subbar with Interactive Telemetry & Scroll Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B] py-2">
            <div className="flex items-center gap-2">
              <Projector className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">SCROLL DOWN TO UNVEIL // CLICK DIRECTORY TO JUMP</span>
              <span className="sm:hidden">SCROLL TO UNVEIL // TOUCH TO SWIPE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-bold">
                {String(activeProjectIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
              <span>{filteredProjects.length} CURATED PROJECTS</span>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════
              SINGLE-STAGE PROJECTOR CINEMA COMPONENT (60 FPS, ULTRA LIGHT)
              ═════════════════════════════════════════════════════════════ */}
          <div className="flex-1 flex flex-col justify-center py-2">
            <ProjectorCinema
              projects={filteredProjects}
              activeIndex={activeProjectIndex}
              onSelectIndex={handleSelectProjectWithScroll}
              onOpenCaseStudy={(proj) => setSelectedProject(proj)}
              lightingMode={lightingMode}
              direction={scrollDirection}
            />
          </div>

          {/* Bottom Telemetry Scroll Progress Bar */}
          <div className="pt-2">
            <div className="w-full h-1 bg-[#141B2B] rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className={`h-full origin-left ${
                  isUV
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-cyan-400 to-amber-300'
                }`}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Case Study Modal (Portal Root, Centered & Non-blocking) */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lightingMode={lightingMode}
      />
    </section>
  );
}
