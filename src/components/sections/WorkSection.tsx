import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Projector } from 'lucide-react';
import { Project, LightingMode } from '../../types';
import { allProjects } from '../../data/projects';
import { ProjectorCinema } from '../work/ProjectorCinema';
import { CaseStudyModal } from '../ui/CaseStudyModal';
import { ScrambleText, RevealTitle } from '../motion/RevealText';
import { soundEngine } from '../../audio/soundEngine';
import { smoothScrollTo } from '../motion/SmoothScroll';

interface WorkSectionProps {
  lightingMode: LightingMode;
}

type FilterCategory = 'all' | 'web' | 'ai' | 'mobile';

export function WorkSection({ lightingMode }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollDirection, setScrollDirection] = useState<number>(1);

  const sectionRef = useRef<HTMLElement>(null);
  const lastStepTimeRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

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

  const handleCategoryChange = (catId: FilterCategory) => {
    soundEngine.playClick();
    setActiveCategory(catId);
    setActiveProjectIndex(0);
  };

  const handleSelectProject = (idx: number) => {
    setScrollDirection(idx >= activeProjectIndex ? 1 : -1);
    setActiveProjectIndex(idx);
    soundEngine.playSlide();
  };

  // ═══════════════════════════════════════════════════════════════════
  // DISCRETE STEPPER: 1 SCROLL DI WEB & 1 USAPAN DI MOBILE = 1 SLIDE
  // Mencegah kebablasan dengan cooldown 500ms, transisi tetap halus
  // ═══════════════════════════════════════════════════════════════════
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 1. Desktop Wheel Event Listener
    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      // Pastikan section sedang tampil dominan di viewport (ter-dock)
      const isDocked = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.55;
      if (!isDocked) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 18) return;

      const now = Date.now();
      const timeSinceLast = now - lastStepTimeRef.current;

      if (delta > 0) {
        // SCROLL KE BAWAH (Next Slide)
        if (activeProjectIndex < filteredProjects.length - 1) {
          e.preventDefault();
          e.stopPropagation();

          // Cooldown 500ms menyerap sisa inersia scroll wheel/trackpad
          if (timeSinceLast < 500) return;

          lastStepTimeRef.current = now;
          setScrollDirection(1);
          soundEngine.playSlide();
          setActiveProjectIndex((prev) => prev + 1);
        } else {
          // Di slide terakhir (14/14): scroll berikutnya meluncur mulus ke section Experience
          if (timeSinceLast > 600) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            smoothScrollTo('#experience', -56);
          }
        }
      } else if (delta < 0) {
        // SCROLL KE ATAS (Previous Slide)
        if (activeProjectIndex > 0) {
          e.preventDefault();
          e.stopPropagation();

          if (timeSinceLast < 500) return;

          lastStepTimeRef.current = now;
          setScrollDirection(-1);
          soundEngine.playSlide();
          setActiveProjectIndex((prev) => prev - 1);
        } else {
          // Di slide pertama (01/14): scroll ke atas meluncur kembali ke section Craft
          if (timeSinceLast > 600) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            smoothScrollTo('#craft', -56);
          }
        }
      }
    };

    // 2. Mobile / Tablet Touch Gestures (1x Usapan = 1 Slide)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || touchStartXRef.current === null) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      const deltaX = touchStartXRef.current - e.touches[0].clientX;

      const rect = el.getBoundingClientRect();
      const isDocked = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.55;

      // Kunci scroll halaman saat user mengusap vertikal di dalam slide
      if (isDocked && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        if (deltaY > 0 && activeProjectIndex < filteredProjects.length - 1) {
          if (e.cancelable) e.preventDefault();
        } else if (deltaY < 0 && activeProjectIndex > 0) {
          if (e.cancelable) e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const endY = e.changedTouches[0].clientY;
      const diffY = touchStartYRef.current - endY;
      touchStartYRef.current = null;
      touchStartXRef.current = null;

      const rect = el.getBoundingClientRect();
      const isDocked = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.55;
      if (!isDocked) return;

      const now = Date.now();
      if (now - lastStepTimeRef.current < 450) return;

      // Ambang batas usapan (swipe threshold 35px)
      if (diffY > 35) {
        // 1x Usapan ke atas = Maju 1 slide
        if (activeProjectIndex < filteredProjects.length - 1) {
          lastStepTimeRef.current = now;
          setScrollDirection(1);
          soundEngine.playSlide();
          setActiveProjectIndex((prev) => prev + 1);
        } else {
          lastStepTimeRef.current = now;
          smoothScrollTo('#experience', -56);
        }
      } else if (diffY < -35) {
        // 1x Usapan ke bawah = Mundur 1 slide
        if (activeProjectIndex > 0) {
          lastStepTimeRef.current = now;
          setScrollDirection(-1);
          soundEngine.playSlide();
          setActiveProjectIndex((prev) => prev - 1);
        } else {
          lastStepTimeRef.current = now;
          smoothScrollTo('#craft', -56);
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeProjectIndex, filteredProjects.length]);

  // Persentase kemajuan slide
  const progressRatio = (activeProjectIndex + 1) / Math.max(1, filteredProjects.length);

  return (
    <section
      id="work"
      ref={sectionRef}
      data-lenis-prevent
      className="relative min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] flex flex-col justify-between py-5 sm:py-6 border-b border-[#1E2533] overflow-hidden select-none"
    >
      <div className="w-full max-w-[1480px] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#1E293B]/60 shrink-0">
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

          {/* Filter Tabs with Active Layout Pill */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0F1420] border border-[#1E293B] rounded-xl font-mono text-xs overflow-x-auto no-scrollbar whitespace-nowrap max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-3 py-1.5 rounded-lg transition-all cursor-pointer touch-manipulation shrink-0 ${activeCategory === cat.id
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
                    className={`absolute inset-0 rounded-lg ${isUV
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

        {/* Subbar with Discrete Step Telemetry */}
        <div className="flex items-center justify-between text-xs font-mono text-[#64748B] py-2 shrink-0">
          <div className="flex items-center gap-2">
            <Projector className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">1X SCROLL = 1 SLIDE // CLICK DIRECTORY TO JUMP</span>
            <span className="sm:hidden">1X USAPAN = 1 SLIDE // TOUCH TO CYCLE</span>
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
            onSelectIndex={handleSelectProject}
            onOpenCaseStudy={(proj) => setSelectedProject(proj)}
            lightingMode={lightingMode}
            direction={scrollDirection}
          />
        </div>

        {/* Bottom Discrete Slide Progress Bar */}
        <div className="pt-2 shrink-0">
          <div className="w-full h-1 bg-[#141B2B] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progressRatio * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`h-full ${isUV
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-cyan-400 to-amber-300'
                }`}
            />
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
