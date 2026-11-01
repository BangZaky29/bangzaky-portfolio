import React, { useState, useEffect, useMemo, ReactNode } from 'react';

export interface AdaptiveViewport {
  width: number;
  height: number;
  isMobile: boolean;       // < 640px
  isTablet: boolean;       // 640px - 1023px
  isDesktop: boolean;      // >= 1024px
  isTouch: boolean;
  orientation: 'portrait' | 'landscape';
  safeAreaBottom: number;
  stackBaseTop: number;
  stackStep: number;
  maxVisibleStackHeaders: number;
  getStackTop: (index: number) => number;
}

/**
 * Centralized Adaptive Layout Hook
 * Provides reactive breakpoint detection, dynamic container metrics,
 * and calibrated sticky stack offsets for cards across all device viewports.
 */
export function useAdaptiveLayout(): AdaptiveViewport {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      // Small debounce for smooth resize tracking
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 50);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial check
    handleResize();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const layout = useMemo<AdaptiveViewport>(() => {
    const width = windowSize.width;
    const height = windowSize.height;

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const orientation = height >= width ? 'portrait' : 'landscape';

    // Calibrated Sticky Stacking Card Offsets:
    // Mobile (<640px): Compact header strip (top: 64px, step: 32px, max 3 stacked headers)
    // Tablet (640-1024px): Medium header strip (top: 80px, step: 40px, max 4 stacked headers)
    // Desktop (>=1024px): Spacious header strip (top: 105px, step: 48px, max 5 stacked headers)
    const stackBaseTop = isMobile ? 64 : isTablet ? 80 : 105;
    const stackStep = isMobile ? 32 : isTablet ? 40 : 48;
    const maxVisibleStackHeaders = isMobile ? 3 : isTablet ? 4 : 5;

    const getStackTop = (index: number): number => {
      // Cap visible header accumulation to prevent covering the entire card content
      const clampedIndex = Math.min(index, maxVisibleStackHeaders);
      return stackBaseTop + clampedIndex * stackStep;
    };

    // Safe area bottom estimate for modern notch/home indicator devices
    const safeAreaBottom = isMobile ? 24 : 0;

    return {
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      isTouch,
      orientation,
      safeAreaBottom,
      stackBaseTop,
      stackStep,
      maxVisibleStackHeaders,
      getStackTop,
    };
  }, [windowSize.width, windowSize.height]);

  return layout;
}

/**
 * Fluid container styles generator helper
 */
export function getContainerStyles(viewport: Partial<AdaptiveViewport>) {
  return {
    maxWidth: viewport.isDesktop ? '1480px' : '100%',
    paddingLeft: viewport.isMobile ? '1rem' : viewport.isTablet ? '1.5rem' : '2.5rem',
    paddingRight: viewport.isMobile ? '1rem' : viewport.isTablet ? '1.5rem' : '2.5rem',
  };
}

interface AdaptiveContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

/**
 * Standardized Adaptive Container Wrapper
 * Guarantees zero viewport overflow (`overflow-x-clip` & `max-w-[100vw]`),
 * fluid multi-step padding, and centralized layout alignment.
 */
export function AdaptiveContainer({
  children,
  className = '',
  id,
  as: Component = 'div',
}: AdaptiveContainerProps) {
  return (
    <Component
      id={id}
      className={`w-full max-w-[100vw] overflow-x-clip px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 mx-auto ${className}`}
    >
      {children}
    </Component>
  );
}

