import { useEffect, useRef } from 'react';
import { LightingMode } from '../../types';

interface CreativeCanvasProps {
  lightingMode: LightingMode;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

export function CreativeCanvas({ lightingMode }: CreativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });
  const shockwaveRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; active: boolean }>({
    x: 0,
    y: 0,
    radius: 0,
    maxRadius: 180,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 450;
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D sphere particles
    const particleCount = 140;
    const radius = Math.min(width, height) * 0.38;
    const particles: Particle3D[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere surface
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 1.8 + 1.2,
        color: i % 3 === 0 ? 'accent' : 'muted',
      });
    }

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      rotY += 0.004 + mouseRef.current.x * 0.00003;
      rotX += 0.002 + mouseRef.current.y * 0.00002;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 420;
      const centerX = width / 2;
      const centerY = height / 2;

      // Handle shockwave ripple
      if (shockwaveRef.current.active) {
        shockwaveRef.current.radius += 5;
        if (shockwaveRef.current.radius > shockwaveRef.current.maxRadius) {
          shockwaveRef.current.active = false;
        }
      }

      // Projected points container for constellation lines
      const projected: { px: number; py: number; pz: number; alpha: number; p: Particle3D }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply spring restoration to base position
        p.vx += (p.baseX - p.x) * 0.04;
        p.vy += (p.baseY - p.y) * 0.04;
        p.vz += (p.baseZ - p.z) * 0.04;

        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.vz *= 0.88;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // 3D Rotation
        // Rotate around Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // 3D Perspective Projection
        const scale = fov / (fov + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;
        const alpha = Math.max(0.12, Math.min(1, (z2 + radius) / (2 * radius) + 0.2));

        projected.push({ px, py, pz: z2, alpha, p });
      }

      // Draw constellation connections
      const maxDistance = 58;
      ctx.lineWidth = 0.6;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.25 * ((p1.alpha + p2.alpha) / 2);
            if (lightingMode === 'uv') {
              ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            }
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      for (let i = 0; i < projected.length; i++) {
        const { px, py, alpha, p } = projected[i];
        const isAccent = p.color === 'accent';

        ctx.beginPath();
        ctx.arc(px, py, p.size * (alpha + 0.3), 0, Math.PI * 2);

        if (lightingMode === 'uv') {
          ctx.fillStyle = isAccent ? `rgba(192, 132, 252, ${alpha})` : `rgba(147, 51, 234, ${alpha * 0.7})`;
          ctx.shadowColor = '#C084FC';
          ctx.shadowBlur = isAccent ? 8 : 4;
        } else {
          ctx.fillStyle = isAccent ? `rgba(6, 182, 212, ${alpha})` : `rgba(245, 158, 11, ${alpha * 0.8})`;
          ctx.shadowColor = isAccent ? '#06B6D4' : '#F59E0B';
          ctx.shadowBlur = isAccent ? 6 : 3;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Center subtle glowing core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 0.75);
      if (lightingMode === 'uv') {
        coreGradient.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
        coreGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        coreGradient.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
        coreGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.03)');
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.75, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      shockwaveRef.current = {
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 220,
        active: true,
      };

      // Scatter nearby particles outward
      const centerX = width / 2;
      const centerY = height / 2;
      particles.forEach((p) => {
        const distFromCenter = Math.sqrt(p.baseX * p.baseX + p.baseY * p.baseY);
        const impulse = (Math.random() - 0.5) * 45;
        p.vx += impulse;
        p.vy += impulse;
        p.vz += (Math.random() - 0.5) * 45;
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left - width / 2;
        const y = touch.clientY - rect.top - height / 2;
        mouseRef.current.targetX = x;
        mouseRef.current.targetY = y;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const clickX = touch.clientX - rect.left;
        const clickY = touch.clientY - rect.top;

        shockwaveRef.current = {
          x: clickX,
          y: clickY,
          radius: 0,
          maxRadius: 200,
          active: true,
        };

        particles.forEach((p) => {
          const impulse = (Math.random() - 0.5) * 45;
          p.vx += impulse;
          p.vy += impulse;
          p.vz += (Math.random() - 0.5) * 45;
        });
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lightingMode]);

  return (
    <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[480px] flex items-center justify-center pointer-events-auto touch-manipulation">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />
      {/* Dynamic 3D canvas watermark & guide */}
      <div className="absolute bottom-2 left-3 sm:left-4 pointer-events-none font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#94A3B8]/60 flex items-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
        <span className="hidden sm:inline">INTERACTIVE 3D MESH // TOUCH / CLICK TO PULSE</span>
        <span className="sm:hidden">TAP TO PULSE // DRAG TO ROTATE</span>
      </div>
    </div>
  );
}

