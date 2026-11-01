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
      duration: 1.6,
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
 * Continuous Kinetic Momentum Lenis Smooth Scroll Provider
 * Glides smoothly across all components with natural physical inertia
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
        duration: 1.6, // Continuous silky gliding scroll across all components
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1.35, // Generous impulse on flick
        touchMultiplier: 2.0, // Natural responsive swipe inertia on trackpad/mobile
        syncTouch: true,
        syncTouchLerp: 0.08,
        touchInertiaExponent: 1.8,
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

