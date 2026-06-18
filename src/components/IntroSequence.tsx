import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════════════
   OPERATION DEVLAB AIR COMBAT INTRO
   ───────────────────────────────────────────────────────────────
   Cinematic intro sequence: terminal boot → drone dogfight →
   explosion → glitch wipe → reveal main website.
   
   Architecture:
   - HTML5 Canvas for all animation (drones, projectiles, explosions,
     radar grid, particles, HUD)
   - React DOM overlay for text elements (boot text, center text,
     skip button) — ensures proper font rendering
   - Phase-based state machine: BOOT → ENTER → DOGFIGHT → EXPLOSION → REVEAL
   - requestAnimationFrame loop with delta-time for smooth 60fps
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════

type Phase = 'BOOT' | 'ENTER' | 'DOGFIGHT' | 'CRITICAL_DAMAGE' | 'EXPLOSION' | 'REVEAL' | 'DONE';

interface Vec2 { x: number; y: number }

interface Projectile {
  pos: Vec2;
  vel: Vec2;
  life: number;
  color: string;
}

interface Particle {
  pos: Vec2;
  vel: Vec2;
  life: number;
  size: number;
  color: string;
}

interface Explosion {
  pos: Vec2;
  progress: number;
  maxRadius: number;
}

interface PathKF {
  t: number;  // absolute time in seconds
  x: number;  // normalized 0–1
  y: number;  // normalized 0–1
}

interface ProjEvent {
  time: number;
  from: number;
  to: number;
  hit: boolean;
}

interface AnimState {
  projectiles: Projectile[];
  particles: Particle[];
  explosions: Explosion[];
  firedEvents: Set<number>;
  exploded: boolean;
  explosionTime: number;
  shakeAmount: number;
  shakeDecay: number;
}

// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════

const C = {
  BG:      '#050507',
  BG_BLUE: '#08081a',
  BLUE:    '#3B82F6',
  GREEN:   '#10B981',
  WHITE:   '#E0E2E5',
  MUTED:   '#8B949E',
  RED:     '#EF4444',
  ORANGE:  '#F59E0B',
  DARK:    '#1F2937',
} as const;

const TOTAL_DURATION = 8;

const BOOT_LINES = [
  { text: '> INITIALIZING ZAKY_DEVLAB...', delay: 0.00 },
  { text: '> LOADING COMBAT SYSTEMS...', delay: 0.25 },
  { text: '> RADAR GRID [ONLINE]', delay: 0.50 },
  { text: '> STATUS: OPERATIONAL', delay: 0.72 },
];

// Pre-defined flight paths for each drone (normalized coordinates)
// Adjusted for 8s animation
const DRONE_PATHS: PathKF[][] = [
  // ─── Drone 0: Alpha Leader (Blue) ───
  [
    { t: 0.3, x: -0.08, y: 0.42 },
    { t: 0.5, x: 0.18,  y: 0.38 },
    { t: 0.7, x: 0.32,  y: 0.33 },
    { t: 0.9, x: 0.42,  y: 0.22 },
    { t: 1.1, x: 0.52,  y: 0.38 },
    { t: 1.3, x: 0.40,  y: 0.55 },
    { t: 1.7, x: 0.35,  y: 0.30 },
    { t: 2.1, x: 0.55,  y: 0.15 },
    { t: 2.6, x: 0.75,  y: 0.35 },
    { t: 3.2, x: 0.60,  y: 0.60 },
    { t: 3.8, x: 0.30,  y: 0.75 },
    { t: 4.3, x: 0.15,  y: 0.50 },
    { t: 4.9, x: 0.40,  y: 0.20 },
    { t: 5.6, x: 0.65,  y: 0.30 },
    { t: 6.1, x: 0.50,  y: 0.50 },
    { t: 6.6, x: 0.65,  y: 0.60 },
    { t: 7.0, x: 0.80,  y: 0.40 },
    { t: 7.6, x: 1.15,  y: 0.10 },
  ],
  // ─── Drone 1: Bravo Target (Green) ───
  // Gets hit critically at t=5.3, explodes at t=6.5
  [
    { t: 0.3, x: 1.10,  y: 0.30 },
    { t: 0.5, x: 0.85,  y: 0.28 },
    { t: 0.7, x: 0.68,  y: 0.38 },
    { t: 0.9, x: 0.74,  y: 0.52 },
    { t: 1.1, x: 0.63,  y: 0.33 },
    { t: 1.4, x: 0.75,  y: 0.20 },
    { t: 1.8, x: 0.55,  y: 0.45 },
    { t: 2.4, x: 0.45,  y: 0.65 },
    { t: 3.0, x: 0.25,  y: 0.40 },
    { t: 3.5, x: 0.45,  y: 0.20 },
    { t: 4.1, x: 0.70,  y: 0.45 },
    { t: 4.6, x: 0.85,  y: 0.65 },
    { t: 5.2, x: 0.70,  y: 0.80 },
    { t: 5.3, x: 0.66,  y: 0.78 }, // Critical hit here
    { t: 5.7, x: 0.55,  y: 0.65 }, // Limping
    { t: 6.1, x: 0.65,  y: 0.50 }, // Erratic
    { t: 6.4, x: 0.58,  y: 0.40 }, // Slowing down
    { t: 6.5, x: 0.52,  y: 0.42 }, // FINAL IMPACT POINT
    { t: 8.0, x: 0.52,  y: 0.42 }, // Hold until exploded
  ],
  // ─── Drone 2: Alpha Wingman (Blue) ───
  [
    { t: 0.3, x: -0.06, y: 0.64 },
    { t: 0.6, x: 0.18,  y: 0.58 },
    { t: 0.8, x: 0.40,  y: 0.56 },
    { t: 1.1, x: 0.58,  y: 0.62 },
    { t: 1.5, x: 0.70,  y: 0.50 },
    { t: 2.0, x: 0.85,  y: 0.75 },
    { t: 2.5, x: 0.65,  y: 0.85 },
    { t: 3.0, x: 0.45,  y: 0.75 },
    { t: 3.5, x: 0.20,  y: 0.60 },
    { t: 4.0, x: 0.35,  y: 0.40 },
    { t: 4.5, x: 0.60,  y: 0.25 },
    { t: 5.0, x: 0.85,  y: 0.45 },
    { t: 5.6, x: 0.75,  y: 0.65 },
    { t: 6.2, x: 0.55,  y: 0.80 },
    { t: 6.7, x: 0.35,  y: 0.70 },
    { t: 7.2, x: 0.15,  y: 0.85 },
    { t: 7.8, x: -0.15, y: 0.95 },
  ],
];

const PROJ_EVENTS: ProjEvent[] = [
  // Early skirmish
  { time: 1.0, from: 0, to: 1, hit: false },
  { time: 1.2, from: 1, to: 0, hit: false },
  { time: 1.5, from: 2, to: 1, hit: false },
  
  // Dogfight
  { time: 2.0, from: 1, to: 0, hit: false },
  { time: 2.5, from: 0, to: 1, hit: false },
  { time: 3.0, from: 2, to: 1, hit: false },
  { time: 3.5, from: 1, to: 2, hit: false },
  { time: 4.0, from: 0, to: 1, hit: false },
  { time: 4.5, from: 1, to: 0, hit: false },
  { time: 5.0, from: 2, to: 1, hit: false },
  
  // Critical Damage Phase
  { time: 5.3, from: 0, to: 1, hit: true }, // The critical hit
  { time: 5.8, from: 1, to: 0, hit: false }, // Desperate shot
  { time: 6.1, from: 2, to: 1, hit: false },
  
  // Final execution
  { time: 6.3, from: 0, to: 1, hit: true }, // Impact occurs around ~6.5
];

// ═══════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOut(t: number) { return 1 - (1 - t) * (1 - t); }

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

function getPhase(elapsed: number): Phase {
  if (elapsed < 1.0) return 'BOOT';
  if (elapsed < 2.0) return 'ENTER';
  if (elapsed < 5.0) return 'DOGFIGHT';
  if (elapsed < 6.0) return 'CRITICAL_DAMAGE';
  if (elapsed < 7.0) return 'EXPLOSION';
  if (elapsed < TOTAL_DURATION) return 'REVEAL';
  return 'DONE';
}

/** Interpolate position along a keyframed path */
function pathPos(path: PathKF[], time: number, w: number, h: number): Vec2 | null {
  if (time < path[0].t || time > path[path.length - 1].t) return null;
  for (let i = 0; i < path.length - 1; i++) {
    if (time >= path[i].t && time <= path[i + 1].t) {
      const t = easeInOut((time - path[i].t) / (path[i + 1].t - path[i].t));
      return {
        x: lerp(path[i].x * w, path[i + 1].x * w, t),
        y: lerp(path[i].y * h, path[i + 1].y * h, t),
      };
    }
  }
  return null;
}

/** Compute heading angle from path derivative */
function pathAngle(path: PathKF[], time: number, w: number, h: number): number {
  const dt = 0.06;
  const p1 = pathPos(path, time, w, h);
  const p2 = pathPos(path, Math.min(time + dt, path[path.length - 1].t), w, h);
  if (!p1 || !p2) return 0;
  if (Math.abs(p2.x - p1.x) < 0.01 && Math.abs(p2.y - p1.y) < 0.01) {
    // Use backward difference
    const p0 = pathPos(path, Math.max(time - dt, path[0].t), w, h);
    if (!p0) return 0;
    return Math.atan2(p1.y - p0.y, p1.x - p0.x);
  }
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

// ═══════════════════════════════════════════════
// CANVAS DRAWING FUNCTIONS
// ═══════════════════════════════════════════════

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const g = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
  g.addColorStop(0, C.BG_BLUE);
  g.addColorStop(1, C.BG);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawRadarGrid(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  elapsed: number, alpha: number,
) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;

  const cx = w * 0.5;
  const cy = h * 0.5;
  const maxR = Math.max(w, h) * 0.85;

  // Concentric circles
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(59,130,246,0.055)';
  for (let r = 80; r < maxR; r += 110) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Crosshairs
  ctx.strokeStyle = 'rgba(59,130,246,0.035)';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, cy); ctx.lineTo(w, cy);
  ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
  ctx.stroke();

  // Diagonal crosshairs
  ctx.strokeStyle = 'rgba(59,130,246,0.02)';
  ctx.beginPath();
  ctx.moveTo(cx - maxR, cy - maxR); ctx.lineTo(cx + maxR, cy + maxR);
  ctx.moveTo(cx + maxR, cy - maxR); ctx.lineTo(cx - maxR, cy + maxR);
  ctx.stroke();

  // Rotating sweep line
  const sweepAngle = elapsed * Math.PI * 2 / 3.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
  ctx.strokeStyle = 'rgba(16,185,129,0.22)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Sweep glow trail (arc wedge)
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, maxR * 0.55, sweepAngle - 0.4, sweepAngle);
  ctx.closePath();
  const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.55);
  sg.addColorStop(0, 'rgba(16,185,129,0.0)');
  sg.addColorStop(1, 'rgba(16,185,129,0.06)');
  ctx.fillStyle = sg;
  ctx.fill();

  ctx.restore();
}

function drawBootGlow(
  ctx: CanvasRenderingContext2D, w: number, h: number, elapsed: number,
) {
  const pulse = Math.sin(elapsed * Math.PI * 3) * 0.025 + 0.02;
  const g = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, 220);
  g.addColorStop(0, `rgba(59,130,246,${pulse})`);
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(w * 0.5 - 220, h * 0.5 - 220, 440, 440);
}

function drawGlitchLines(
  ctx: CanvasRenderingContext2D, w: number, h: number, elapsed: number,
) {
  // Brief horizontal glitch flickers during BOOT
  if (elapsed > 0.38 && elapsed < 0.42) {
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, h * 0.32, w, 2);
    ctx.restore();
  }
  if (elapsed > 0.68 && elapsed < 0.71) {
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = C.BLUE;
    ctx.fillRect(0, h * 0.58, w, 2);
    ctx.restore();
  }
}

function drawDrone(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, angle: number,
  color: string, scale: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const s = scale;

  // Engine exhaust glow
  ctx.beginPath();
  ctx.ellipse(-14 * s, 0, 16 * s, 3.5 * s, 0, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.1;
  ctx.shadowBlur = 22;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Main body — delta-wing silhouette
  ctx.beginPath();
  ctx.moveTo(18 * s, 0);
  ctx.lineTo(-2 * s, -11 * s);
  ctx.lineTo(-9 * s, -13 * s);
  ctx.lineTo(-12 * s, -4 * s);
  ctx.lineTo(-10 * s, 0);
  ctx.lineTo(-12 * s, 4 * s);
  ctx.lineTo(-9 * s, 13 * s);
  ctx.lineTo(-2 * s, 11 * s);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.globalAlpha = 0.72;
  ctx.shadowBlur = 16;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Cockpit canopy
  ctx.beginPath();
  ctx.moveTo(14 * s, 0);
  ctx.lineTo(3 * s, -2.5 * s);
  ctx.lineTo(3 * s, 2.5 * s);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.4;
  ctx.fill();

  // Center spine
  ctx.beginPath();
  ctx.moveTo(15 * s, 0);
  ctx.lineTo(-10 * s, 0);
  ctx.strokeStyle = '#ffffff';
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 0.7;
  ctx.stroke();

  ctx.restore();
}

function drawTrail(ctx: CanvasRenderingContext2D, trail: Vec2[], color: string) {
  if (trail.length < 2) return;
  ctx.save();
  for (let i = 1; i < trail.length; i++) {
    const a = (i / trail.length) * 0.28;
    ctx.beginPath();
    ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
    ctx.lineTo(trail[i].x, trail[i].y);
    ctx.strokeStyle = color;
    ctx.globalAlpha = a;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  ctx.restore();
}

function drawProjectileFx(ctx: CanvasRenderingContext2D, p: Projectile) {
  const speed = Math.sqrt(p.vel.x ** 2 + p.vel.y ** 2);
  if (speed < 1) return;
  const angle = Math.atan2(p.vel.y, p.vel.x);
  const alpha = clamp01(p.life * 2.5);

  ctx.save();
  ctx.translate(p.pos.x, p.pos.y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  // Trail gradient
  const len = 30;
  const grad = ctx.createLinearGradient(-len, 0, 5, 0);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.35, p.color);
  grad.addColorStop(1, '#ffffff');

  ctx.beginPath();
  ctx.moveTo(-len, 0);
  ctx.lineTo(5, 0);
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = p.color;
  ctx.stroke();

  // Bright tip
  ctx.beginPath();
  ctx.arc(5, 0, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.shadowBlur = 14;
  ctx.shadowColor = p.color;
  ctx.fill();

  ctx.restore();
}

function drawExplosionFx(ctx: CanvasRenderingContext2D, exp: Explosion) {
  const { pos, progress, maxRadius } = exp;
  const r = easeOut(progress) * maxRadius;
  const alpha = 1 - easeOut(progress);

  ctx.save();

  // Hot white core (early phase)
  if (progress < 0.45) {
    const coreA = (1 - progress / 0.45) * 0.85;
    const coreR = r * 0.28;
    const cg = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, coreR);
    cg.addColorStop(0, `rgba(255,255,255,${coreA})`);
    cg.addColorStop(0.5, `rgba(59,130,246,${coreA * 0.55})`);
    cg.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, coreR, 0, Math.PI * 2);
    ctx.fillStyle = cg;
    ctx.fill();
  }

  // Expanding outer glow
  const og = ctx.createRadialGradient(pos.x, pos.y, r * 0.15, pos.x, pos.y, r);
  og.addColorStop(0, `rgba(59,130,246,${alpha * 0.28})`);
  og.addColorStop(0.55, `rgba(16,185,129,${alpha * 0.12})`);
  og.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
  ctx.fillStyle = og;
  ctx.fill();

  // Primary shockwave ring
  if (progress > 0.08 && progress < 0.65) {
    const ringA = (1 - (progress - 0.08) / 0.57) * 0.5;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r * 1.7, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${ringA})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Secondary shockwave ring (delayed)
  if (progress > 0.22 && progress < 0.78) {
    const ring2A = (1 - (progress - 0.22) / 0.56) * 0.28;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r * 2.2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(59,130,246,${ring2A})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.restore();
}

function drawParticleFx(ctx: CanvasRenderingContext2D, p: Particle) {
  const alpha = clamp01(p.life) * 0.75;
  if (alpha < 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.shadowBlur = 5;
  ctx.shadowColor = p.color;
  ctx.fill();
  ctx.restore();
}

function drawTargeting(
  ctx: CanvasRenderingContext2D,
  fromPos: Vec2, targetPos: Vec2, scale: number,
) {
  ctx.save();

  // Dashed targeting line
  ctx.beginPath();
  ctx.setLineDash([4, 8]);
  ctx.moveTo(fromPos.x, fromPos.y);
  ctx.lineTo(targetPos.x, targetPos.y);
  ctx.strokeStyle = 'rgba(239,68,68,0.18)';
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.setLineDash([]);

  // Target circle
  const rs = 18 * scale;
  ctx.beginPath();
  ctx.arc(targetPos.x, targetPos.y, rs, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(239,68,68,0.25)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Diamond reticle
  const ds = 13 * scale;
  ctx.beginPath();
  ctx.moveTo(targetPos.x, targetPos.y - ds);
  ctx.lineTo(targetPos.x + ds, targetPos.y);
  ctx.lineTo(targetPos.x, targetPos.y + ds);
  ctx.lineTo(targetPos.x - ds, targetPos.y);
  ctx.closePath();
  ctx.strokeStyle = 'rgba(239,68,68,0.22)';
  ctx.stroke();

  ctx.restore();
}

function drawHUD(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  elapsed: number, phase: Phase, alpha: number,
) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = '10px "JetBrains Mono", monospace';

  const pad = 18;

  // Top-left system info
  ctx.textAlign = 'left';
  ctx.fillStyle = C.MUTED;
  ctx.fillText('DEVLAB_SYS // COMBAT_v2.4', pad, pad + 10);
  ctx.fillStyle = phase === 'DOGFIGHT' || phase === 'EXPLOSION' ? C.RED : C.GREEN;
  ctx.fillText(`PHASE: ${phase}`, pad, pad + 24);

  // Top-right elapsed timer
  ctx.textAlign = 'right';
  ctx.fillStyle = C.MUTED;
  ctx.fillText(`T+${elapsed.toFixed(2).padStart(7, '0')}s`, w - pad, pad + 10);
  ctx.fillText(`RES: ${w}x${h}`, w - pad, pad + 24);

  // Bottom-left coordinates
  ctx.textAlign = 'left';
  ctx.fillStyle = C.MUTED;
  ctx.fillText('GRID: 04-28-A7', pad, h - pad - 10);
  ctx.fillText('LAT: -6.2088  LON: 106.8456', pad, h - pad + 4);

  // Bottom-right status
  ctx.textAlign = 'right';
  const targets = elapsed >= 6.5 ? 0 : elapsed >= 1 ? 1 : 0;
  ctx.fillStyle = C.MUTED;
  ctx.fillText(`ALPHA_UNITS: 2  TARGETS: ${targets}`, w - pad, h - pad - 10);

  ctx.restore();
}

function drawDroneLabel(
  ctx: CanvasRenderingContext2D,
  pos: Vec2, index: number, color: string,
) {
  ctx.save();
  ctx.font = '8px "JetBrains Mono", monospace';
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.35;
  ctx.textAlign = 'left';
  const label = index === 1 ? 'BRV-01' : `ALF-0${index === 0 ? 1 : 2}`;
  ctx.fillText(label, pos.x + 22, pos.y - 14);
  ctx.restore();
}

function drawScreenFlash(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  elapsed: number, explosionTime: number,
) {
  const dt = elapsed - explosionTime;
  if (dt >= 0 && dt < 0.15) {
    const flashA = (1 - dt / 0.15) * 0.14;
    ctx.save();
    ctx.globalAlpha = flashA;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}

// ═══════════════════════════════════════════════
// MAIN RENDER ORCHESTRATOR
// ═══════════════════════════════════════════════

function renderFrame(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  elapsed: number, dt: number,
  phase: Phase,
  state: AnimState,
  trails: Vec2[][],
  scanPat: CanvasPattern | null,
  isMobile: boolean,
) {
  // ── Screen shake ──
  ctx.save();
  if (state.shakeAmount > 0.3) {
    const sx = (Math.random() - 0.5) * state.shakeAmount * 2;
    const sy = (Math.random() - 0.5) * state.shakeAmount * 2;
    ctx.translate(sx, sy);
    state.shakeAmount *= state.shakeDecay;
  } else {
    state.shakeAmount = 0;
  }

  // ── Background ──
  drawBackground(ctx, w, h);

  // ── Boot-phase glow ──
  if (phase === 'BOOT') {
    drawBootGlow(ctx, w, h, elapsed);
    drawGlitchLines(ctx, w, h, elapsed);
  }

  // ── Radar grid ──
  const radarAlpha =
    phase === 'BOOT' ? clamp01(elapsed * 1.8) :
    phase === 'REVEAL' ? clamp01(1 - (elapsed - 7.0) / 1.0) : 1;
  drawRadarGrid(ctx, w, h, elapsed, radarAlpha * 0.65);

  // ── Scanline pattern ──
  if (scanPat) {
    ctx.save();
    ctx.globalAlpha = 0.035;
    ctx.fillStyle = scanPat;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  // ── HUD ──
  const hudAlpha =
    elapsed < 0.3 ? 0 :
    elapsed < 0.8 ? (elapsed - 0.3) * 2 :
    phase === 'REVEAL' ? clamp01(1 - (elapsed - 7.0) / 1.0) : 1;
  drawHUD(ctx, w, h, elapsed, phase, hudAlpha * 0.55);

  // ═══════════════════════
  // DRONES
  // ═══════════════════════
  const droneScale = Math.min(w, h) / 650;
  const maxDrones = isMobile ? 2 : 3;

  for (let i = 0; i < Math.min(DRONE_PATHS.length, maxDrones); i++) {
    const path = DRONE_PATHS[i];
    const pos = pathPos(path, elapsed, w, h);
    if (!pos) continue;

    // Don't draw drone 1 after explosion
    if (i === 1 && state.exploded) continue;

    const angle = pathAngle(path, elapsed, w, h);
    const color = i === 1 ? C.GREEN : C.BLUE;

    // Update motion trail
    if (!trails[i]) trails[i] = [];
    trails[i].push({ x: pos.x, y: pos.y });
    const maxTrail = isMobile ? 14 : 22;
    while (trails[i].length > maxTrail) trails[i].shift();

    drawTrail(ctx, trails[i], color);
    drawDrone(ctx, pos.x, pos.y, angle, color, droneScale);
    drawDroneLabel(ctx, pos, i, color);

    // Smoke trail for damaged drone (CRITICAL_DAMAGE phase)
    if (i === 1 && phase === 'CRITICAL_DAMAGE' && Math.random() > 0.4) {
      state.particles.push({
        pos: { x: pos.x + (Math.random() - 0.5) * 10, y: pos.y + (Math.random() - 0.5) * 10 },
        vel: { x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 },
        life: 1.0 + Math.random(),
        size: 2 + Math.random() * 4,
        color: `rgba(40, 40, 40, 0.7)` // Dark smoke
      });
    }

    // Targeting overlay during DOGFIGHT
    if ((phase === 'DOGFIGHT') && i === 0) {
      const tgt = pathPos(DRONE_PATHS[1], elapsed, w, h);
      if (tgt) drawTargeting(ctx, pos, tgt, droneScale);
    }
  }

  // ═══════════════════════
  // PROJECTILE SPAWNING
  // ═══════════════════════
  for (let i = 0; i < PROJ_EVENTS.length; i++) {
    const evt = PROJ_EVENTS[i];
    if (elapsed >= evt.time && !state.firedEvents.has(i)) {
      state.firedEvents.add(i);

      const fromPos = pathPos(DRONE_PATHS[evt.from], evt.time, w, h);
      const aimT = evt.time >= 6.0 ? 6.5 : 5.3;
      const toPos = evt.hit
        ? pathPos(DRONE_PATHS[evt.to], aimT, w, h)      // aim at future impact position
        : pathPos(DRONE_PATHS[evt.to], evt.time, w, h); // aim at current position (will miss)

      if (fromPos && toPos) {
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0) {
          const speed = evt.hit ? d / 0.42 : 580;
          state.projectiles.push({
            pos: { x: fromPos.x, y: fromPos.y },
            vel: { x: (dx / d) * speed, y: (dy / d) * speed },
            life: 1.6,
            color: evt.from === 1 ? C.GREEN : C.BLUE,
          });
        }
      }
    }
  }

  // ═══════════════════════
  // PROJECTILE UPDATE & DRAW
  // ═══════════════════════
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const p = state.projectiles[i];
    p.pos.x += p.vel.x * dt;
    p.pos.y += p.vel.y * dt;
    p.life -= dt;

    // Impact check (for hit projectiles)
    if (!state.exploded && elapsed >= 5.0 && p.life > 0) {
      const tgt = pathPos(DRONE_PATHS[1], elapsed, w, h);
      if (tgt && p.color === C.BLUE) {
        const dx = p.pos.x - tgt.x;
        const dy = p.pos.y - tgt.y;
        if (Math.sqrt(dx * dx + dy * dy) < 28) {
          if (elapsed < 6.0) {
            // ──── CRITICAL HIT (MINI EXPLOSION) ────
            state.shakeAmount = 6;
            state.shakeDecay = 0.9;
            for (let j = 0; j < 15; j++) {
              const a = Math.random() * Math.PI * 2;
              const spd = 20 + Math.random() * 100;
              state.particles.push({
                pos: { x: tgt.x, y: tgt.y },
                vel: { x: Math.cos(a) * spd, y: Math.sin(a) * spd },
                life: 0.4 + Math.random() * 0.8,
                size: 1 + Math.random() * 2,
                color: C.ORANGE,
              });
            }
            state.projectiles.splice(i, 1);
            continue;
          } else {
            // ──── FINAL IMPACT! ────
            state.exploded = true;
            state.explosionTime = elapsed;
            state.shakeAmount = 14;
            state.shakeDecay = 0.91;

            state.explosions.push({
              pos: { x: tgt.x, y: tgt.y },
              progress: 0,
              maxRadius: Math.min(w, h) * 0.22,
            });

            const pCount = isMobile ? 22 : 42;
            for (let j = 0; j < pCount; j++) {
              const a = Math.random() * Math.PI * 2;
              const spd = 40 + Math.random() * 220;
              state.particles.push({
                pos: { x: tgt.x, y: tgt.y },
                vel: { x: Math.cos(a) * spd, y: Math.sin(a) * spd },
                life: 0.4 + Math.random() * 1.6,
                size: 0.8 + Math.random() * 3,
                color: [C.BLUE, C.WHITE, C.GREEN, '#ffffff'][Math.floor(Math.random() * 4)],
              });
            }

            state.projectiles.splice(i, 1);
            continue;
          }
        }
      }
    }

    // Remove offscreen / expired
    if (p.life <= 0 || p.pos.x < -60 || p.pos.x > w + 60 || p.pos.y < -60 || p.pos.y > h + 60) {
      state.projectiles.splice(i, 1);
      continue;
    }

    drawProjectileFx(ctx, p);
  }

  // ═══════════════════════
  // EXPLOSIONS
  // ═══════════════════════
  for (let i = state.explosions.length - 1; i >= 0; i--) {
    const e = state.explosions[i];
    e.progress += dt * 0.55;
    if (e.progress >= 1) {
      state.explosions.splice(i, 1);
      continue;
    }
    drawExplosionFx(ctx, e);
  }

  // Screen flash on explosion
  if (state.exploded) {
    drawScreenFlash(ctx, w, h, elapsed, state.explosionTime);
  }

  // ═══════════════════════
  // PARTICLES
  // ═══════════════════════
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p = state.particles[i];
    p.pos.x += p.vel.x * dt;
    p.pos.y += p.vel.y * dt;
    p.vel.x *= 0.97;
    p.vel.y *= 0.97;
    p.life -= dt;
    if (p.life <= 0) {
      state.particles.splice(i, 1);
      continue;
    }
    drawParticleFx(ctx, p);
  }

  // ── Restore screen shake transform ──
  ctx.restore();
}

// ═══════════════════════════════════════════════
// DOM OVERLAY UPDATERS
// (Direct DOM manipulation to avoid React re-renders)
// ═══════════════════════════════════════════════

function updateBootText(el: HTMLPreElement | null, elapsed: number, phase: Phase) {
  if (!el) return;
  if (phase !== 'BOOT') {
    el.style.opacity = '0';
    return;
  }
  el.style.opacity = '1';
  const lines = BOOT_LINES.map(line => {
    const t = elapsed - line.delay;
    if (t <= 0) return '';
    const n = Math.floor(t * 85);
    return line.text.substring(0, Math.min(n, line.text.length));
  }).filter(Boolean);
  const cursor = Math.floor(elapsed * 4) % 2 === 0 ? '█' : '';
  el.textContent = lines.join('\n') + (cursor ? '\n' + cursor : '');
}

function updateCenterText(el: HTMLDivElement | null, elapsed: number) {
  if (!el) return;
  if (elapsed >= 7.0 && elapsed < 7.4) {
    el.textContent = 'SYSTEM BREACH COMPLETE';
    el.style.opacity = String(clamp01((elapsed - 7.0) * 2.5));
  } else if (elapsed >= 7.4 && elapsed < 8.0) {
    el.textContent = 'WELCOME TO ZAKY DEVLAB';
    const fadeOut = elapsed >= 7.7 ? clamp01(1 - (elapsed - 7.7) * 3) : 1;
    el.style.opacity = String(fadeOut);
  } else {
    el.style.opacity = '0';
  }
}

function updateOverlayOpacity(el: HTMLDivElement | null, elapsed: number, phase: Phase) {
  if (!el || phase !== 'REVEAL') return;
  const p = clamp01((elapsed - 7.0) / 1.0);
  el.style.opacity = String(1 - p * p);
}

// ═══════════════════════════════════════════════
// REACT COMPONENT
// ═══════════════════════════════════════════════

interface IntroSequenceProps {
  children: ReactNode;
}

export function IntroSequence({ children }: IntroSequenceProps) {
  // ── Determine initial state synchronously ──
  // INFO: session storage dinonaktifkan sementara agar animasi selalu muncul saat refresh
  const alreadyShown = useRef(false); // useRef(!!sessionStorage.getItem('zaky_intro_shown'));
  // INFO: Dimatikan sementara agar animasi penuh (pesawat dll) selalu berjalan
  // meskipun OS user memiliki setting "Reduce Motion" menyala.
  const prefersReduced = useRef(false);

  const [introComplete, setIntroComplete] = useState(alreadyShown.current);
  const [childrenVisible, setChildrenVisible] = useState(alreadyShown.current);
  const [phase, setPhase] = useState<Phase>('BOOT');

  // ── Refs ──
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bootTextRef = useRef<HTMLPreElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  const rafRef = useRef(0);
  const completedRef = useRef(false);
  const timeoutRef = useRef(0);
  const phaseRef = useRef<Phase>('BOOT');
  const dimsRef = useRef({ w: 0, h: 0 });

  const stateRef = useRef<AnimState>({
    projectiles: [],
    particles: [],
    explosions: [],
    firedEvents: new Set(),
    exploded: false,
    explosionTime: 0,
    shakeAmount: 0,
    shakeDecay: 0.91,
  });
  const trailsRef = useRef<Vec2[][]>([[], [], []]);
  const scanPatRef = useRef<CanvasPattern | null>(null);
  const prevTsRef = useRef(0);

  // ── Complete handler ──
  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    cancelAnimationFrame(rafRef.current);
    sessionStorage.setItem('zaky_intro_shown', 'true');
    setChildrenVisible(true);

    if (overlayRef.current) {
      overlayRef.current.style.transition = 'opacity 0.5s ease-out';
      overlayRef.current.style.opacity = '0';
    }

    timeoutRef.current = window.setTimeout(() => setIntroComplete(true), 550);
  }, []);

  // ── Main animation effect ──
  useEffect(() => {
    if (alreadyShown.current) return;

    // Reduced motion → simple 2-second version
    if (prefersReduced.current) {
      const t = setTimeout(handleComplete, 2000);
      return () => clearTimeout(t);
    }

    // ── Full canvas animation ──
    const canvas = canvasRef.current;
    if (!canvas) { handleComplete(); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { handleComplete(); return; }

    // Resize handler
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h };
    };
    resize();
    window.addEventListener('resize', resize);

    // Create scanline tile pattern
    const patC = document.createElement('canvas');
    patC.width = 4; patC.height = 4;
    const patCtx = patC.getContext('2d');
    if (patCtx) {
      patCtx.fillStyle = 'rgba(255,255,255,0.5)';
      patCtx.fillRect(0, 0, 4, 1);
      scanPatRef.current = ctx.createPattern(patC, 'repeat');
    }

    const isMobile = window.innerWidth < 768;
    let startTime = 0;

    const animate = (ts: number) => {
      if (!startTime) { startTime = ts; prevTsRef.current = ts; }

      const elapsed = (ts - startTime) / 1000;
      const dt = Math.min((ts - prevTsRef.current) / 1000, 0.05);
      prevTsRef.current = ts;

      const { w, h } = dimsRef.current;
      const curPhase = getPhase(elapsed);

      // Update React phase (only on change)
      if (curPhase !== phaseRef.current) {
        phaseRef.current = curPhase;
        setPhase(curPhase);
        if (curPhase === 'REVEAL') setChildrenVisible(true);
      }

      // Direct DOM updates (no re-render)
      updateBootText(bootTextRef.current, elapsed, curPhase);
      updateCenterText(centerTextRef.current, elapsed);
      updateOverlayOpacity(overlayRef.current, elapsed, curPhase);
      if (skipBtnRef.current) {
         const remaining = Math.max(0, Math.ceil(TOTAL_DURATION - elapsed));
         skipBtnRef.current.textContent = `SKIP INTRO (${remaining}s) ▸`;
      }

      // Canvas render
      renderFrame(
        ctx, w, h, elapsed, dt, curPhase,
        stateRef.current, trailsRef.current, scanPatRef.current, isMobile,
      );

      // Auto-complete
      if (elapsed >= TOTAL_DURATION) {
        handleComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timeoutRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [handleComplete]);

  // ── Short-circuit: already shown ──
  if (introComplete && childrenVisible) {
    return <>{children}</>;
  }

  // ── Render ──
  return (
    <>
      {childrenVisible && children}

      {!introComplete && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999]"
          style={{ background: C.BG, willChange: 'opacity' }}
        >
          {prefersReduced.current ? (
            /* ─── Reduced motion: simple text reveal ─── */
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="font-mono text-lg sm:text-2xl tracking-[0.3em] text-[#E0E2E5]"
                style={{
                  animation: 'introFadeIn 0.8s ease-out forwards',
                  textShadow: '0 0 20px rgba(59,130,246,0.4)',
                }}
              >
                ZAKY DEVLAB
              </div>
            </div>
          ) : (
            <>
              {/* ─── Canvas ─── */}
              <canvas ref={canvasRef} className="absolute inset-0" />

              {/* ─── Boot terminal text ─── */}
              <pre
                ref={bootTextRef}
                className="absolute left-5 sm:left-10 top-[42%] sm:top-[38%] font-mono text-[10px] sm:text-xs text-[#10B981] leading-relaxed z-10 pointer-events-none transition-opacity duration-300"
                style={{ textShadow: '0 0 8px rgba(16,185,129,0.35)' }}
              />

              {/* ─── Center text (SYSTEM BREACH / WELCOME) ─── */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div
                  ref={centerTextRef}
                  className="font-mono text-sm sm:text-xl md:text-2xl font-bold tracking-[0.15em] sm:tracking-[0.25em] text-[#E0E2E5] text-center px-4"
                  style={{
                    opacity: 0,
                    textShadow: '0 0 18px rgba(59,130,246,0.45), 0 0 36px rgba(59,130,246,0.18)',
                    transition: 'opacity 0.15s',
                  }}
                />
              </div>

              {/* ─── Glitch transition bars (REVEAL phase) ─── */}
              {phase === 'REVEAL' && (
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  {[8, 22, 38, 55, 70, 84, 93].map((top, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0"
                      style={{
                        top: `${top}%`,
                        height: '2px',
                        background: `rgba(59,130,246,${0.1 + (i % 3) * 0.05})`,
                        animation: `introGlitchBar 0.25s ${i * 0.055}s ease-out both`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* ─── CSS scanline overlay ─── */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
                }}
              />
            </>
          )}

          {/* ─── Skip button ─── */}
          <button
            ref={skipBtnRef}
            onClick={handleComplete}
            id="intro-skip-btn"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:-translate-x-0 sm:bottom-8 sm:right-8 z-30 font-mono text-xs sm:text-sm tracking-widest uppercase px-6 py-3 border transition-colors duration-300 cursor-pointer bg-black/40 backdrop-blur-sm"
            style={{
              color: 'rgba(224,226,229,0.85)',
              borderColor: 'rgba(59,130,246,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,1)';
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.8)';
              e.currentTarget.style.background = 'rgba(59,130,246,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(224,226,229,0.85)';
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
              e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
            }}
          >
            SKIP INTRO (30s) ▸
          </button>
        </div>
      )}
    </>
  );
}
