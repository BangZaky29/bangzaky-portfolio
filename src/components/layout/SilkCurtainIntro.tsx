// C:\codingVibes\myPortfolio\bangzaky-portfolio\src\components\layout\SilkCurtainIntro.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, KeyRound } from 'lucide-react';
import Lanyard from '@/components/Lanyard.jsx';
import SplashCursor from '@/components/SplashCursor.jsx';
import { LightingMode } from '../../types';
import { generateBadgeTextures } from '../../utils/badgeTextureGenerator';
import { soundEngine } from '../../audio/soundEngine';

interface SilkCurtainIntroProps {
  lightingMode: LightingMode;
  onCurtainOpened: () => void;
}

export function SilkCurtainIntro({
  lightingMode,
  onCurtainOpened,
}: SilkCurtainIntroProps) {
  const [textures, setTextures] = useState<{ front: string; back: string } | null>(null);
  const [isUnveiling, setIsUnveiling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [screenCategory, setScreenCategory] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const isUV = lightingMode === 'uv';

  // Responsive device detector & scaling
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setScreenCategory('mobile');
      } else if (w < 1024) {
        setScreenCategory('tablet');
      } else {
        setScreenCategory('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-generate 2K high-res identity badge texture
  useEffect(() => {
    let active = true;
    generateBadgeTextures(lightingMode).then((res) => {
      if (active) setTextures(res);
    });
    return () => {
      active = false;
    };
  }, [lightingMode]);

  const handlePullProgress = (deltaY: number) => {
    if (isUnveiling) return;
    setPullY(Math.max(0, deltaY));
  };

  const handlePullTrigger = () => {
    if (isUnveiling) return;
    setIsUnveiling(true);
    soundEngine.playCurtainOpen();
  };

  // Sizing parameter adaptif
  const lanyardSize = screenCategory === 'mobile' ? 0.25 : screenCategory === 'tablet' ? 0.32 : 0.38;
  const strapLength = screenCategory === 'mobile' ? 0.20 : screenCategory === 'tablet' ? 0.26 : 0.30;
  const strapWidth = screenCategory === 'mobile' ? 0.44 : screenCategory === 'tablet' ? 0.50 : 0.56;

  // Sedikit lendutan tirai saat lanyard ditarik ke bawah (maksimal 24px)
  const curtainTensionY = Math.min(24, pullY * 0.18);
  const isThresholdReached = pullY > 60;

  // Palet warna asap selaras dengan tema pencahayaan
  const palette = isUV
    ? ['#A855F7', '#6366F1', '#EC4899', '#38BDF8']
    : ['#06B6D4', '#3B82F6', '#10B981', '#F59E0B'];

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isUnveiling ? '-103%' : curtainTensionY }}
      transition={{
        duration: isUnveiling ? 1.15 : 0.15,
        ease: isUnveiling ? [0.76, 0, 0.24, 1] : 'easeOut',
      }}
      onAnimationComplete={() => {
        if (isUnveiling) {
          onCurtainOpened();
        }
      }}
      className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-auto touch-none"
      style={{
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9)',
      }}
    >
      {/* ═════════════════════════════════════════════════════════════
          1. LAPISAN KAIN SUTRA MEWAH (SILK DRAPE & SPECULAR TEXTURE) - z-0
          ═════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 z-0 transition-colors duration-700 ${isUV
          ? 'bg-gradient-to-b from-[#090714] via-[#0E0B1F] to-[#07050F]'
          : 'bg-gradient-to-b from-[#08090C] via-[#0C0F17] to-[#06070A]'
          }`}
      >
        {/* Lipatan kain sutra vertikal dinamis (Simulated Silk Pleats) */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 45px,
              rgba(255, 255, 255, 0.03) 48px,
              rgba(0, 0, 0, 0.25) 75px,
              transparent 95px
            )`,
          }}
        />

        {/* Specular Sheen (Kilauan sutra halus di bagian atas & tengah) */}
        <div
          className={`absolute top-0 left-0 right-0 h-[480px] pointer-events-none blur-[90px] opacity-25 ${isUV
            ? 'bg-gradient-to-b from-purple-500/20 via-pink-500/10 to-transparent'
            : 'bg-gradient-to-b from-cyan-400/20 via-blue-500/10 to-transparent'
            }`}
        />

        {/* Shadow lipatan bawah (Weighted silk curtain hem) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none border-b border-white/5" />
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. LAPISAN ANIMASI ASAP FLUIDA (DI BELAKANG LANYARD) - z-10
          ═════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <SplashCursor
          colors={palette}
          rainbow={false}
          colorSpeed={0.8}
          intensity={0.95}
          size={1}
          force={0.9}
          swirl={3.5}
          trail={1.2}
          momentum={1}
          shading={0.65}
          glow={0.3}
          quality={screenCategory === 'mobile' ? 'low' : 'high'}
          clickSplash={screenCategory !== 'mobile'}
          intro={true}
          contained={false}
          theme="dark"
          zIndex={10}
          className="pointer-events-none"
        />
      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. 3D LANYARD KUNCI AKSES (DEAD CENTER - PALING DEPAN!) - z-20
          ═════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <Lanyard
          frontImage={textures?.front || '/lanyard/zaky_01.png'}
          backImage={textures?.back || '/lanyard/zaky_01.png'}
          imageFit="cover"
          orientation="portrait"
          cardColor={isUV ? '#0B0916' : '#0A0D14'}
          finish={isUV ? 'holographic' : 'glossy'}
          metal={isUV ? 'graphite' : 'silver'}
          strapColor={isUV ? '#18122B' : '#080A0F'}
          size={lanyardSize}
          anchor="center" // TEPAT DI TENGAH LAYAR
          strapImage={undefined}
          strapLength={strapLength}
          strapWidth={strapWidth}
          gravity={1.2}
          elasticity={0.48}
          damping={0.52}
          breeze={0.3}
          interactive={!isUnveiling}
          intro={true}
          pointerEventsAuto={true}
          onPullProgress={handlePullProgress}
          onPullTrigger={handlePullTrigger}
          className="w-full h-full"
        />
      </div>

      {/* ═════════════════════════════════════════════════════════════
          4. HINT / CUE INTERAKTIF (PULL TO UNVEIL) - z-30
          ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isUnveiling && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-8 sm:bottom-12 left-0 right-0 flex flex-col items-center justify-center gap-2 pointer-events-auto px-4 text-center z-30"
          >

            {/* Subtle Helper Subtitle */}
            <p className="font-mono text-[10px] sm:text-[11px] text-[#64748B] tracking-wide">
              ✦ Tarik kartu ID di tengah untuk menyingkap tirai ✦
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
