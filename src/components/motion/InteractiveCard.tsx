import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { LightingMode } from '../../types';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  lightingMode?: LightingMode;
  maxTilt?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

/**
 * Reusable card wrapper with dynamic cursor-tracking radial spotlight & 3D perspective tilt
 */
export function InteractiveCard({
  children,
  className = '',
  contentClassName = '',
  lightingMode = 'warm',
  maxTilt = 4,
  onClick,
  onMouseEnter,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rawY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Direct CSS variable updates bypass React re-rendering for optimal 60fps performance
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Calculate normalized coordinates (-1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    rawX.set(tiltX);
    rawY.set(tiltY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  const isUV = lightingMode === 'uv';

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden transition-shadow duration-300 will-change-transform ${className}`}
    >
      {/* Dynamic Cursor-Following Radial Spotlight */}
      {!isTouchDevice && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: isUV
              ? 'radial-gradient(350px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(168, 85, 247, 0.15), transparent 70%)'
              : 'radial-gradient(350px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(6, 182, 212, 0.12), transparent 70%)',
          }}
        />
      )}

      {/* Card Content with Flexible Content Layout */}
      <div className={`relative z-10 w-full h-full ${contentClassName}`}>
        {children}
      </div>
    </motion.div>
  );
}
