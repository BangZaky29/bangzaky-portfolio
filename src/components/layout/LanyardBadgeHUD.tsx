// C:\codingVibes\myPortfolio\bangzaky-portfolio\src\components\layout\LanyardBadgeHUD.tsx
import { useEffect, useState } from 'react';
import Lanyard from '@/components/Lanyard.jsx';
import { LightingMode } from '../../types';
import { generateBadgeTextures } from '../../utils/badgeTextureGenerator';

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
    <aside
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
        gravity={1.15}
        elasticity={0.45}
        damping={0.55}
        breeze={0.35}
        interactive={true}
        intro={true}
        className="w-full h-full"
      />
    </aside>
  );
}
