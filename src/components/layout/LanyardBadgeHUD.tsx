// C:\codingVibes\myPortfolio\bangzaky-portfolio\src\components\layout\LanyardBadgeHUD.tsx
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Lanyard from '@/components/Lanyard.jsx';
import { LightingMode } from '../../types';
import { generateBadgeTextures } from '../../utils/badgeTextureGenerator';
import { soundEngine } from '../../audio/soundEngine';

interface LanyardBadgeHUDProps {
  lightingMode: LightingMode;
}

export function LanyardBadgeHUD({ lightingMode }: LanyardBadgeHUDProps) {
  const [mounted, setMounted] = useState(false);
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(false);
  const [anchorRatio, setAnchorRatio] = useState(0.82);
  const [textures, setTextures] = useState<{ front: string; back: string } | null>(null);

  // 1. Deteksi breakpoint viewport: Mobile (<768px) NOT AVAILABLE
  useEffect(() => {
    setMounted(true);
    soundEngine.playLanyardBounce();

    const updateDimensions = () => {
      const width = window.innerWidth;
      const isLargeEnough = width >= 768;
      setIsDesktopOrTablet(isLargeEnough);

      if (width >= 1536) {
        setAnchorRatio(0.83);
      } else if (width >= 1280) {
        setAnchorRatio(0.81);
      } else if (width >= 1024) {
        setAnchorRatio(0.79);
      } else {
        setAnchorRatio(0.75);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 2. Generate / update tekstur ID badge depan & belakang sesuai lightingMode
  useEffect(() => {
    if (!isDesktopOrTablet) return;

    let isSubscribed = true;
    generateBadgeTextures(lightingMode).then((res) => {
      if (isSubscribed) {
        setTextures(res);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [lightingMode, isDesktopOrTablet]);

  // Jika belum mount atau berada di layar mobile, jangan render apa pun
  if (!mounted || !isDesktopOrTablet) {
    return null;
  }

  const isUV = lightingMode === 'uv';

  return (
    <motion.aside
      initial={{ y: -480, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 11, // Damping rendah = efek membal kenyal (overshoot bounce)!
        mass: 1.1,
        delay: 0.1,
      }}
      className="fixed inset-0 z-30 pointer-events-none select-none w-screen h-screen overflow-hidden"
      aria-label="Interactive 3D Identity Badge"
    >
      <Lanyard
        frontImage={textures?.front || '/lanyard/zaky_01.png'}
        backImage={textures?.back || '/lanyard/zaky_01.png'}
        imageFit="cover"
        orientation="portrait"
        cardColor={isUV ? '#0B0916' : '#0A0D14'}
        finish={isUV ? 'holographic' : 'glossy'}
        metal={isUV ? 'graphite' : 'silver'}
        strapColor={isUV ? '#18122B' : '#080A0F'}
        size={0.38}
        anchor={anchorRatio}
        strapImage={undefined}
        strapLength={0.32}
        strapWidth={0.58}
        gravity={1.25}
        elasticity={0.65}
        damping={0.42}
        breeze={0.35}
        interactive={true}
        intro="drop"
        className="w-full h-full"
      />
    </motion.aside>
  );
}
