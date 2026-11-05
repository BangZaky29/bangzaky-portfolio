// C:\codingVibes\myPortfolio\bangzaky-portfolio\src\components\layout\FluidBackgroundCursor.tsx
import { useEffect, useState } from 'react';
import SplashCursor from '@/components/SplashCursor.jsx';
import { LightingMode } from '../../types';

interface FluidBackgroundCursorProps {
    lightingMode: LightingMode;
    onCoordinatesChange?: (coords: { x: number; y: number }) => void;
    zIndex?: number;
}

export function FluidBackgroundCursor({
    lightingMode,
    zIndex = 0,
}: FluidBackgroundCursorProps) {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            const isCoarse = window.matchMedia('(pointer: coarse)').matches;
            return isCoarse || window.innerWidth < 768;
        }
        return false;
    });

    // Deteksi perangkat mobile
    useEffect(() => {
        const checkMobile = () => {
            const isCoarse = window.matchMedia('(pointer: coarse)').matches;
            setIsMobile(isCoarse || window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const isUV = lightingMode === 'uv';

    // Palet warna yang diselaraskan dengan estetika portfolio Zaky:
    // - Mode WARM: Cyan neon (#06B6D4), Electric Blue (#3B82F6), Emerald (#10B981), Amber Gold (#F59E0B)
    // - Mode UV: Neon Violet (#A855F7), Cyber Indigo (#6366F1), Electric Pink (#EC4899), Sky Blue (#38BDF8)
    const palette = isUV
        ? ['#A855F7', '#6366F1', '#EC4899', '#38BDF8']
        : ['#06B6D4', '#3B82F6', '#10B981', '#F59E0B'];

    return (
        <div
            className="pointer-events-none fixed inset-0 overflow-hidden"
            style={{ zIndex }}
            aria-hidden="true"
        >
            <SplashCursor
                colors={palette}
                rainbow={false} // Menggunakan palet cyberpunk terkurasi (bukan pelangi mentah)
                colorSpeed={0.8}
                intensity={0.95}
                size={1}
                force={0.9}
                swirl={3.5}
                trail={1.2}
                momentum={1}
                shading={0.65}
                glow={0.3} // Bloom soft khas UI sci-fi React Bits
                quality={isMobile ? 'low' : 'high'} // Optimasi performa di mobile
                clickSplash={!isMobile} // Hilangkan efek ledakan asap saat klik di tampilan mobile
                intro={true}
                contained={false}
                theme="dark"
                zIndex={0}
                className="pointer-events-none"
            />
        </div>
    );
}