import { useState, useEffect } from 'react';
import { Sparkles, Sun } from 'lucide-react';
import { LightingMode } from '../../types';

interface BottomHUDProps {
  lightingMode: LightingMode;
  onToggleLighting: () => void;
  coordinates?: { x: number; y: number };
  scrollPercentage?: number;
  velocity?: number;
}

/**
 * Minimalist, semi-transparent bottom HUD
 * Splits telemetry to Bottom-Left and Lighting/Status to Bottom-Right
 * Completely unobtrusive with pointer-events-none on backdrop
 */
export function BottomHUD({
  lightingMode,
  onToggleLighting,
  scrollPercentage = 0,
  velocity = 0,
}: BottomHUDProps) {
  const [timeStr, setTimeStr] = useState('');
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -1, y: -1 });

  // Local mouse coordinate tracking throttled by requestAnimationFrame
  useEffect(() => {
    let rafId: number;
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Jakarta',
        }) + ' WIB'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isUV = lightingMode === 'uv';

  return (
    <div
      className="fixed bottom-2.5 sm:bottom-4 left-0 right-0 z-30 pointer-events-none px-2.5 sm:px-6 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono"
      aria-label="System Telemetry Bar"
    >
      {/* ═════════════════════════════════════════════════════════════
          POJOK KIRI BAWAH: GEOLOCATION & REALTIME TELEMETRY HUD
          ═════════════════════════════════════════════════════════════ */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md bg-[#08090C]/80 border border-[#1E293B]/80 shadow-lg text-[#94A3B8] transition-colors shrink-0">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isUV ? 'bg-purple-400' : 'bg-cyan-400'} animate-pulse`} />
          <span className="hidden sm:inline text-[#CBD5E1]">LAT -6.2088 LON 106.8456</span>
          <span className="sm:hidden text-[#CBD5E1]">JKT -6.2, 106.8</span>
        </div>

        <span className="text-[#334155] hidden sm:inline">|</span>

        <div className="hidden sm:flex items-center gap-1">
          <span className="text-[#64748B]">HUD:</span>
          <span className={isUV ? 'text-purple-300 font-bold' : 'text-cyan-300 font-bold'}>
            {coords.x >= 0 ? `${coords.x},${coords.y}` : '0,0'}
          </span>
        </div>

        <span className="text-[#334155]">|</span>

        <div className="flex items-center gap-1">
          <span className="text-[#64748B] hidden sm:inline">SCROLL:</span>
          <span className={isUV ? 'text-purple-300 font-bold' : 'text-cyan-300 font-bold'}>
            {Math.round(scrollPercentage)}%
          </span>
        </div>

        <span className="text-[#334155] hidden md:inline">|</span>

        <div className="hidden md:flex items-center gap-1">
          <span className="text-[#64748B]">GLIDE:</span>
          <span
            className={`font-mono font-bold tabular-nums ${
              Math.abs(velocity) > 20
                ? isUV ? 'text-purple-300' : 'text-cyan-300'
                : 'text-[#64748B]'
            }`}
          >
            {Math.abs(velocity)}
          </span>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          POJOK KANAN BAWAH: 2700K/UV TOGGLE + LIVE TIME + STATUS
          ═════════════════════════════════════════════════════════════ */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md bg-[#08090C]/80 border border-[#1E293B]/80 shadow-lg text-[#94A3B8] transition-colors shrink-0">
        
        {/* Minimalist Lighting Toggle Button */}
        <button
          onClick={onToggleLighting}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition-all cursor-pointer touch-manipulation active:scale-95 ${
            isUV
              ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
              : 'bg-amber-950/40 border-amber-600/40 text-amber-300 hover:border-amber-400'
          }`}
          title="Toggle Lighting Mode: 2700K Warm Light vs 365nm UV Light"
        >
          {isUV ? <Sparkles className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {isUV ? '365nm UV' : '2700K'}
          </span>
        </button>

        <span className="text-[#334155] hidden sm:inline">|</span>

        {/* Live Jakarta Time */}
        <span className="text-[10px] text-[#CBD5E1] hidden sm:inline">
          {timeStr}
        </span>

        <span className="text-[#334155]">|</span>

        {/* Live Status Badge */}
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">LIVE</span>
        </div>
      </div>

    </div>
  );
}

