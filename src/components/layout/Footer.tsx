import { ArrowUp } from 'lucide-react';
import { LightingMode } from '../../types';

interface FooterProps {
  lightingMode: LightingMode;
}

export function Footer({ lightingMode }: FooterProps) {
  const isUV = lightingMode === 'uv';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#1E2533] bg-[#07090E] py-12 px-4 sm:px-8 font-mono text-xs text-[#64748B]">
      <div className="w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1640px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <img
              src="/logo/mylogo_BG_01.png"
              alt="Logo"
              className="w-5 h-5 rounded object-contain opacity-85 hover:opacity-100 transition-opacity"
            />
            <span className="text-white font-bold tracking-wider uppercase">
              ZAKY AULIA QOLBI
            </span>
          </div>
          <span className="hidden sm:inline text-[#334155]">/</span>
          <span>© 2026 CREATIVE SYSTEMS ARCHITECT</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all cursor-pointer ${isUV
            ? 'border-purple-500/40 text-purple-300 hover:bg-purple-950/40'
            : 'border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-cyan-400/50'
            }`}
          title="Back to top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}

