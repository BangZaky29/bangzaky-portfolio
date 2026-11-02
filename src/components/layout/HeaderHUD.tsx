import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Compass, Sparkles, Sun } from 'lucide-react';
import { LightingMode, NavSectionId } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface HeaderHUDProps {
  lightingMode: LightingMode;
  activeSection: NavSectionId;
  onNavigate: (sectionId: NavSectionId) => void;
  scrollPercentage?: number;
  velocity?: number;
  onToggleLighting?: () => void;
}

const navItems: { id: NavSectionId; index: string; label: string; desc: string }[] = [
  { id: 'home', index: '01', label: 'Home', desc: 'Hero & Statement' },
  { id: 'craft', index: '02', label: 'Craft', desc: 'Disciplines & Stack' },
  { id: 'work', index: '03', label: 'Work', desc: 'Production Case Studies' },
  { id: 'experience', index: '04', label: 'Experience', desc: 'Career Trajectory & Certs' },
  { id: 'contact', index: '05', label: 'Contact', desc: 'Initiate Project' },
];

export function HeaderHUD({
  lightingMode,
  activeSection,
  onNavigate,
  scrollPercentage = 0,
  velocity = 0,
  onToggleLighting,
}: HeaderHUDProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(soundEngine.isEnabled());

  const handleToggleSound = () => {
    const next = soundEngine.toggle();
    setIsSoundOn(next);
  };

  // Keyboard shortcut listener for 1-5 and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'Escape' && isOpenMobile) {
        setIsOpenMobile(false);
        return;
      }

      const key = e.key;
      const targetMap: Record<string, NavSectionId> = {
        '1': 'home',
        '2': 'craft',
        '3': 'work',
        '4': 'experience',
        '5': 'contact',
      };

      if (targetMap[key]) {
        onNavigate(targetMap[key]);
        if (isOpenMobile) setIsOpenMobile(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, isOpenMobile]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpenMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpenMobile]);

  const handleMobileNavClick = (sectionId: NavSectionId) => {
    onNavigate(sectionId);
    setIsOpenMobile(false);
  };

  const isUV = lightingMode === 'uv';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#08090C]/85 border-b border-[#1E2533] px-4 sm:px-8 py-2.5 sm:py-3 transition-colors duration-300">

      {/* Top Scroll Progress Glow Bar with Kinetic Velocity Response */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent overflow-hidden">
        <div
          className={`h-full transition-all duration-100 ease-out ${isUV
            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400'
            : 'bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300'
            }`}
          style={{
            width: `${Math.min(100, Math.max(0, scrollPercentage))}%`,
            boxShadow:
              Math.abs(velocity) > 30
                ? isUV
                  ? '0 0 14px rgba(168,85,247,0.95)'
                  : '0 0 14px rgba(6,182,212,0.95)'
                : isUV
                  ? '0 0 6px rgba(168,85,247,0.5)'
                  : '0 0 6px rgba(6,182,212,0.5)',
          }}
        />
      </div>

      <div className="w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1640px] mx-auto flex items-center justify-between gap-4 text-xs font-mono">

        {/* Left: Brand Identity with Official Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center justify-center shrink-0">
            <img
              src="/logo/mylogo_BG_01.png"
              alt="Zaky Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-[#08090C] ${isUV ? 'bg-purple-400' : 'bg-cyan-400'}`} />
          </div>
          <span className="text-[#F1F5F9] font-bold tracking-wider uppercase text-xs sm:text-sm group-hover:text-cyan-300 transition-colors">
            Zaky Aulia Qolbi
          </span>
          <span className="text-[#475569] hidden sm:inline">/</span>
          <span className="text-[#64748B] hidden sm:inline">CREATIVE_ENGINEER</span>
        </div>

        {/* Center: Realtime Kinetic Momentum Feedback Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F1420]/80 border border-[#1E293B] text-[11px] text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all ${Math.abs(velocity) > 25
                ? isUV ? 'bg-purple-400 animate-ping' : 'bg-cyan-400 animate-ping'
                : 'bg-[#475569]'
                }`}
            />
            <span>MOMENTUM:</span>
          </span>
          <span
            className={`font-mono font-bold tabular-nums min-w-[55px] text-right transition-colors ${Math.abs(velocity) > 25
              ? isUV ? 'text-purple-300' : 'text-cyan-300'
              : 'text-[#64748B]'
              }`}
          >
            {Math.abs(velocity)} px/s
          </span>
          <span className="text-[#334155]">|</span>
          <span className={isUV ? 'text-purple-300 font-bold' : 'text-cyan-300 font-bold'}>
            {Math.round(scrollPercentage)}%
          </span>
        </div>

        {/* Center / Right: Desktop 5 Section Navigation Bar & Audio / UV Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Sound Toggle (diallo.digital style "... Sound on") */}
          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-all cursor-pointer ${
              isSoundOn
                ? 'bg-cyan-950/40 border-cyan-400/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                : 'bg-[#0F1420]/80 border-[#1E293B] text-[#64748B] hover:text-[#CBD5E1]'
            }`}
            title="Toggle Web Audio Synthesizer"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span className={`w-0.5 rounded-full transition-all ${isSoundOn ? 'h-2 bg-cyan-400 animate-pulse' : 'h-1 bg-[#475569]'}`} />
              <span className={`w-0.5 rounded-full transition-all ${isSoundOn ? 'h-3 bg-cyan-400 animate-pulse' : 'h-2 bg-[#475569]'}`} />
              <span className={`w-0.5 rounded-full transition-all ${isSoundOn ? 'h-1.5 bg-cyan-400 animate-pulse' : 'h-1 bg-[#475569]'}`} />
            </span>
            <span>{isSoundOn ? 'Sound on' : 'Sound off'}</span>
          </button>

          {/* UV Light Toggle Pill */}
          {onToggleLighting && (
            <button
              onClick={() => {
                soundEngine.playSwitch();
                onToggleLighting();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-all cursor-pointer ${
                isUV
                  ? 'bg-purple-950/60 border-purple-400 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                  : 'bg-[#0F1420]/80 border-[#1E293B] text-[#94A3B8] hover:text-white'
              }`}
              title="Toggle 2700K / 365nm UV Light"
            >
              {isUV ? <Sparkles className="w-3 h-3 text-purple-300" /> : <Sun className="w-3 h-3 text-amber-400" />}
              <span className="font-bold">{isUV ? 'UV 365nm' : '2700K'}</span>
            </button>
          )}

          {/* Desktop Navigation Menu */}
          <nav
            className="flex items-center gap-1 p-1 rounded-full bg-[#0F1420]/80 border border-[#1E293B]"
            aria-label="Main Navigation Menu"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onNavigate(item.id);
                  }}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 cursor-pointer ${isActive
                    ? isUV ? 'text-purple-200 font-bold' : 'text-cyan-200 font-bold'
                    : 'text-[#94A3B8] hover:text-white'
                    }`}
                >
                  {/* Animated Horizontal Morphing Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTopNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-full border ${isUV
                        ? 'bg-purple-600/30 border-purple-400/60 shadow-[0_0_15px_rgba(192,132,252,0.3)]'
                        : 'bg-cyan-500/20 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                        }`}
                    />
                  )}

                  <span
                    className={`relative z-10 text-[10px] opacity-75 ${isActive ? (isUV ? 'text-purple-300' : 'text-cyan-400') : 'text-[#64748B]'
                      }`}
                  >
                    {item.index}
                  </span>

                  <span className="relative z-10 font-medium tracking-wide">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile View: Audio + UV + Menu Button (Exact Image 2 & 3 Ref) */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-full border text-[10px] font-mono transition-all ${
              isSoundOn
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                : 'bg-[#0F1420] border-[#1E293B] text-[#64748B]'
            }`}
            title="Sound"
          >
            <span className="flex items-end gap-0.5 h-2.5 px-1">
              <span className={`w-0.5 rounded-full ${isSoundOn ? 'h-2 bg-cyan-400 animate-pulse' : 'h-1 bg-[#475569]'}`} />
              <span className={`w-0.5 rounded-full ${isSoundOn ? 'h-2.5 bg-cyan-400 animate-pulse' : 'h-1.5 bg-[#475569]'}`} />
            </span>
          </button>

          {/* UV Pill */}
          {onToggleLighting && (
            <button
              onClick={() => {
                soundEngine.playSwitch();
                onToggleLighting();
              }}
              className={`px-2 py-1 rounded-full border text-[10px] font-mono font-bold transition-all ${
                isUV
                  ? 'bg-purple-950/60 border-purple-400 text-purple-300'
                  : 'bg-[#0F1420] border-[#1E293B] text-[#94A3B8]'
              }`}
            >
              {isUV ? 'UV' : '2700K'}
            </button>
          )}

          {/* Menu Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsOpenMobile(!isOpenMobile);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer touch-manipulation active:scale-95 ${isOpenMobile
              ? 'bg-[#141B2B] border-cyan-400 text-white'
              : isUV
                ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
                : 'bg-[#0F1420] border-[#1E293B] text-cyan-400 hover:border-cyan-400'
              }`}
            aria-label="Toggle Navigation Menu"
          >
            {isOpenMobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {isOpenMobile ? 'CLOSE' : 'MENU'}
            </span>
          </button>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════
          MOBILE SLIDE-OVER / DRAWER MENU
          ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpenMobile && (
          <div className="fixed inset-0 top-[52px] z-50 md:hidden flex flex-col justify-start">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenMobile(false)}
              className="fixed inset-0 top-[52px] bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Slide Down Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`relative z-10 w-full border-b p-5 space-y-4 ${isUV
                ? 'bg-[#0D0B1A]/95 border-purple-500/40 shadow-2xl'
                : 'bg-[#080B12]/95 border-[#1E293B] shadow-2xl'
                }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#1E293B] font-mono text-xs text-[#64748B]">
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold uppercase">NAVIGATION INDEX</span>
                </span>
                <span>5 STATIONS</span>
              </div>

              <div className="space-y-2">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMobileNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left font-mono transition-all touch-manipulation cursor-pointer ${isActive
                        ? isUV
                          ? 'bg-purple-600/30 border border-purple-400/60 text-white'
                          : 'bg-cyan-500/20 border border-cyan-400/60 text-white'
                        : 'bg-[#0E1422] border border-[#1E293B] text-[#94A3B8] hover:text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${isActive ? (isUV ? 'text-purple-300' : 'text-cyan-400') : 'text-[#64748B]'}`}>
                          {item.index}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-white capitalize">{item.label}</div>
                          <div className="text-[11px] text-[#64748B]">{item.desc}</div>
                        </div>
                      </div>

                      <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-[#475569]'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>JAKARTA GMT+7</span>
                <span className="text-emerald-400 font-bold">● SYSTEM ONLINE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
