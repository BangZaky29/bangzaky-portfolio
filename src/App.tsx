import { useState, useEffect } from 'react';
import { useScroll, useVelocity, useSpring, useMotionValueEvent } from 'motion/react';
import { LightingMode, NavSectionId } from './types';
import { SmoothScroll, smoothScrollTo } from './components/motion/SmoothScroll';
import { HeaderHUD } from './components/layout/HeaderHUD';
import { BottomHUD } from './components/layout/BottomHUD';
import { FluidBackgroundCursor } from './components/layout/FluidBackgroundCursor';
import { LanyardBadgeHUD } from './components/layout/LanyardBadgeHUD';
import { Footer } from './components/layout/Footer';
import { HomeHero } from './components/sections/HomeHero';
import { CraftSection } from './components/sections/CraftSection';
import { WorkSection } from './components/sections/WorkSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificatesFolderSection } from './components/sections/CertificatesFolderSection';
import { ContactSection } from './components/sections/ContactSection';
import { Toast } from './components/ui/Toast';

export default function App() {
  const [lightingMode, setLightingMode] = useState<LightingMode>('warm');
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // Motion scroll progress & kinetic velocity tracking
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 300,
    mass: 0.5,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollPercentage(Math.round(latest * 100));
  });

  useMotionValueEvent(smoothVelocity, 'change', (latest) => {
    setVelocity(Math.round(latest));
  });

  // Always reset view to top Home section on initial open & browser refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force instant reset to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    setActiveSection('home');

    // Clean any stale anchor hash from previous sessions
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Secondary enforcement once Lenis is bound
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      window.__lenis?.scrollTo(0, { immediate: true });
    }, 50);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Active section spy on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections: NavSectionId[] = ['home', 'craft', 'work', 'experience', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: NavSectionId) => {
    setActiveSection(sectionId);
    smoothScrollTo(`#${sectionId}`, -60);
  };

  const handleToggleLighting = () => {
    setLightingMode((prev) => (prev === 'warm' ? 'uv' : 'warm'));
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((current) => (current === msg ? null : current));
    }, 3000);
  };

  const isUV = lightingMode === 'uv';

  return (
    <SmoothScroll>
      <div
        className={`min-h-screen transition-colors duration-500 font-sans selection:bg-cyan-500/30 selection:text-white ${isUV ? 'bg-[#090812] text-[#F3F4F6]' : 'bg-[#08090C] text-[#F8FAFC]'
          }`}
      >
        {/* Interactive UV / Spotlight Lamp Following Cursor */}
        <FluidBackgroundCursor
          lightingMode={lightingMode}
        />

        {/* Top Navbar with 5 Section Navigation, Mobile Drawer & Realtime Velocity Feedback */}
        <HeaderHUD
          lightingMode={lightingMode}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          scrollPercentage={scrollPercentage}
          velocity={velocity}
          onToggleLighting={handleToggleLighting}
        />

        {/* 3D Hanging Lanyard Badge Attached to Navbar on Right (Desktop & Tablet Only) */}
        <LanyardBadgeHUD lightingMode={lightingMode} />

        {/* Main Content Sections */}
        <main className="relative z-10 pb-16 sm:pb-12 w-full max-w-[100vw] overflow-x-clip">
          <HomeHero
            lightingMode={lightingMode}
            onNavigate={handleNavigate}
          />

          <CraftSection
            lightingMode={lightingMode}
          />

          <WorkSection
            lightingMode={lightingMode}
          />

          <ExperienceSection
            lightingMode={lightingMode}
          />

          {/* 3D Interactive Folder with Official PDF Certificates */}
          <CertificatesFolderSection
            lightingMode={lightingMode}
            onShowToast={showToast}
          />

          <ContactSection
            lightingMode={lightingMode}
            onShowToast={showToast}
          />
        </main>

        {/* Minimalist Transparent Floating Bottom HUD (Split Left & Right) */}
        <BottomHUD
          lightingMode={lightingMode}
          onToggleLighting={handleToggleLighting}
          scrollPercentage={scrollPercentage}
          velocity={velocity}
        />

        {/* Minimalist Footer */}
        <Footer lightingMode={lightingMode} />

        {/* Toast Notification Container */}
        <Toast
          message={toastMsg}
          onClose={() => setToastMsg(null)}
        />
      </div>
    </SmoothScroll>
  );
}
