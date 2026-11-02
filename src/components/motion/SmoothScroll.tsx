import { useEffect, useState, ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Subcomponent to synchronize global Lenis instance on window for external access
 */
function LenisSync() {
  useLenis((lenis) => {
    if (!window.__lenis) {
      window.__lenis = lenis;
      lenis.scrollTo(0, { immediate: true });
    }
    window.__lenis = lenis;
  });
  return null;
}

/**
 * Programmatic smooth scroll utility leveraging Lenis momentum
 */
export function smoothScrollTo(target: string | HTMLElement, offset: number = -60) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      offset,
    });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Natural Balanced Lenis Smooth Scroll Provider
 * Smooth, gentle, and controllable deceleration without hyper-sensitivity
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1, // Smooth, gentle, and natural deceleration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.95, // Normal balanced mouse wheel sensitivity
        touchMultiplier: 1.0, // Natural 1:1 mobile & trackpad response
        syncTouch: false, // Clean native touch momentum on touchscreens
        smoothWheel: true,
        autoResize: true,
      }}
    >
      <LenisSync />
      {children}
    </ReactLenis>
  );
}

export { useLenis } from 'lenis/react';

