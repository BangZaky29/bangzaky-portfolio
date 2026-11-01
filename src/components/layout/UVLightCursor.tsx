import { useEffect, useState } from 'react';
import { LightingMode } from '../../types';

interface UVLightCursorProps {
  lightingMode: LightingMode;
  onCoordinatesChange?: (coords: { x: number; y: number }) => void;
}

export function UVLightCursor({ lightingMode, onCoordinatesChange }: UVLightCursorProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable cursor spotlight on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (onCoordinatesChange) {
        onCoordinatesChange({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, onCoordinatesChange]);

  if (!isVisible) return null;

  const isUV = lightingMode === 'uv';

  return (
    /* Ambient Spotlight Layer */
    <div
      className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
      style={{
        background: isUV
          ? `radial-gradient(circle 380px at ${pos.x}px ${pos.y}px, rgba(168, 85, 247, 0.14), rgba(99, 102, 241, 0.05) 50%, transparent 80%)`
          : `radial-gradient(circle 320px at ${pos.x}px ${pos.y}px, rgba(6, 182, 212, 0.07), rgba(245, 158, 11, 0.03) 45%, transparent 75%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
}

