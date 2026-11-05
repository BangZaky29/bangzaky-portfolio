// C:\codingVibes\myPortfolio\bangzaky-portfolio\src\utils\badgeTextureGenerator.ts
import { LightingMode } from '../types';

interface BadgeTextures {
  front: string;
  back: string;
}

// Cache agar tidak render ulang canvas setiap saat
const textureCache = new Map<LightingMode, BadgeTextures>();

/**
 * Membuat rounded rectangle path pada 2D canvas context
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Meload foto zaky_02.jpg
 */
function loadPhoto(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Menggambar kartu depan (Front ID Badge) beresolusi tinggi 2048 x 2880 (2K Retina Sharp)
 */
function drawFrontBadge(
  photo: HTMLImageElement | null,
  lightingMode: LightingMode
): string {
  const width = 2048;
  const height = 2880;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const isUV = lightingMode === 'uv';
  const primaryAccent = isUV ? '#C084FC' : '#00F0FF'; // Bright Neon Purple vs Bright Cyan
  const secondaryAccent = isUV ? '#F472B6' : '#10B981'; // Electric Pink vs Emerald Green

  // 1. Background Card Body Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (isUV) {
    bgGrad.addColorStop(0, '#120F26');
    bgGrad.addColorStop(0.5, '#0B0918');
    bgGrad.addColorStop(1, '#05040D');
  } else {
    bgGrad.addColorStop(0, '#0F1420');
    bgGrad.addColorStop(0.5, '#0A0D15');
    bgGrad.addColorStop(1, '#04060A');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Crisp Tech Grid Pattern
  ctx.strokeStyle = isUV ? 'rgba(192, 132, 252, 0.09)' : 'rgba(0, 240, 255, 0.09)';
  ctx.lineWidth = 2;
  const gridSize = 80;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 3. Ambient Corner Glow
  const glow = ctx.createRadialGradient(width * 0.85, 400, 40, width * 0.85, 400, 900);
  glow.addColorStop(0, isUV ? 'rgba(192, 132, 252, 0.28)' : 'rgba(0, 240, 255, 0.28)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // 4. Outer Border Accent Line (Bold & Crisp)
  ctx.save();
  ctx.strokeStyle = isUV ? 'rgba(192, 132, 252, 0.5)' : 'rgba(0, 240, 255, 0.5)';
  ctx.lineWidth = 8;
  roundRect(ctx, 48, 48, width - 96, height - 96, 96);
  ctx.stroke();
  ctx.restore();

  // 5. Header Area (Safe area di bawah lubang klip punch hole)
  // Status indicator
  ctx.fillStyle = secondaryAccent;
  ctx.beginPath();
  ctx.arc(160, 390, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px "Geist Variable", monospace, sans-serif';
  ctx.fillText('ONLINE // SYS.ACTIVE', 205, 404);

  // Level Pill Tag
  const pillW = 420;
  const pillH = 84;
  const pillX = width - pillW - 160;
  const pillY = 348;
  ctx.fillStyle = isUV ? 'rgba(192, 132, 252, 0.25)' : 'rgba(0, 240, 255, 0.22)';
  roundRect(ctx, pillX, pillY, pillW, pillH, 20);
  ctx.fill();
  ctx.strokeStyle = primaryAccent;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = primaryAccent;
  ctx.font = '900 38px "Geist Variable", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ARCHITECT // L-01', pillX + pillW / 2, pillY + 56);
  ctx.textAlign = 'left';

  // Divider line
  ctx.strokeStyle = isUV ? 'rgba(192, 132, 252, 0.4)' : 'rgba(0, 240, 255, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(160, 470);
  ctx.lineTo(width - 160, 470);
  ctx.stroke();

  // 6. Photo Container & Photo zaky_02.jpg
  const photoW = 1140;
  const photoH = 1280;
  const photoX = (width - photoW) / 2;
  const photoY = 530;

  // Background frame
  ctx.fillStyle = '#030508';
  roundRect(ctx, photoX, photoY, photoW, photoH, 44);
  ctx.fill();

  if (photo) {
    ctx.save();
    roundRect(ctx, photoX, photoY, photoW, photoH, 44);
    ctx.clip();

    // Scale & fit photo portrait
    const scale = Math.max(photoW / photo.width, photoH / photo.height);
    const sw = photo.width * scale;
    const sh = photo.height * scale;
    const sx = photoX + (photoW - sw) / 2;
    const sy = photoY + (photoH - sh) / 2;
    ctx.drawImage(photo, sx, sy, sw, sh);

    // Subtle dark gradient at bottom of photo
    const photoGrad = ctx.createLinearGradient(0, photoY + photoH - 260, 0, photoY + photoH);
    photoGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    photoGrad.addColorStop(1, 'rgba(4, 6, 10, 0.9)');
    ctx.fillStyle = photoGrad;
    ctx.fillRect(photoX, photoY + photoH - 260, photoW, 260);

    ctx.restore();
  }

  // Photo Frame Border
  ctx.strokeStyle = isUV ? 'rgba(192, 132, 252, 0.9)' : 'rgba(0, 240, 255, 0.9)';
  ctx.lineWidth = 6;
  roundRect(ctx, photoX, photoY, photoW, photoH, 44);
  ctx.stroke();

  // Corner HUD Brackets on photo (High-tech accent)
  const bSize = 48;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(photoX - 12, photoY - 12 + bSize);
  ctx.lineTo(photoX - 12, photoY - 12);
  ctx.lineTo(photoX - 12 + bSize, photoY - 12);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(photoX + photoW + 12 - bSize, photoY - 12);
  ctx.lineTo(photoX + photoW + 12, photoY - 12);
  ctx.lineTo(photoX + photoW + 12, photoY - 12 + bSize);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(photoX - 12, photoY + photoH + 12 - bSize);
  ctx.lineTo(photoX - 12, photoY + photoH + 12);
  ctx.lineTo(photoX - 12 + bSize, photoY + photoH + 12);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(photoX + photoW + 12 - bSize, photoY + photoH + 12);
  ctx.lineTo(photoX + photoW + 12, photoY + photoH + 12);
  ctx.lineTo(photoX + photoW + 12, photoY + photoH + 12 - bSize);
  ctx.stroke();

  // 7. Identity Typography (Extra Bold, Crisp, High Contrast)
  const textStartY = 1950;

  // Nama Lengkap (Sangat Tebal & Jelas)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 96px "Geist Variable", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ZAKY AULIA QOLBI', width / 2, textStartY);

  // Subtitle / Title Role (Cyan / Purple Terang)
  ctx.fillStyle = primaryAccent;
  ctx.font = 'bold 50px "Geist Variable", monospace, sans-serif';
  ctx.fillText('CREATIVE DEVELOPER & AI SYSTEMS', width / 2, textStartY + 82);

  // Telemetry tags row (High Contrast White-Slate)
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 38px "Geist Variable", monospace, sans-serif';
  ctx.fillText('ID: ZAQ-2026-DEV  •  FULL-STACK & 3D WEB', width / 2, textStartY + 154);

  // 8. Chip & Barcode Section
  const bottomY = 2270;

  // Chip Smartcard IC
  const chipX = 180;
  const chipY = bottomY;
  const chipW = 200;
  const chipH = 150;
  const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
  chipGrad.addColorStop(0, '#F59E0B');
  chipGrad.addColorStop(0.5, '#FDE047');
  chipGrad.addColorStop(1, '#D97706');
  ctx.fillStyle = chipGrad;
  roundRect(ctx, chipX, chipY, chipW, chipH, 24);
  ctx.fill();
  ctx.strokeStyle = '#92400E';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Chip circuits
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(chipX + 70, chipY);
  ctx.lineTo(chipX + 70, chipY + chipH);
  ctx.moveTo(chipX + 130, chipY);
  ctx.lineTo(chipX + 130, chipY + chipH);
  ctx.moveTo(chipX, chipY + 75);
  ctx.lineTo(chipX + chipW, chipY + 75);
  ctx.stroke();

  // Barcode Generator
  const barcodeX = 440;
  const barcodeY = bottomY;
  const barcodeW = width - 440 - 180;
  const barcodeH = 120;

  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, barcodeX, barcodeY, barcodeW, barcodeH, 12);
  ctx.fill();

  // Generate realistis vertical bars
  ctx.fillStyle = '#05070B';
  let currX = barcodeX + 32;
  const endX = barcodeX + barcodeW - 32;
  const barWidths = [4, 8, 3, 10, 4, 6, 12, 4, 8, 3, 6, 10, 4, 8, 6, 4, 12, 3, 6, 8, 4, 10, 4, 6];
  let bIdx = 0;
  while (currX < endX) {
    const bw = barWidths[bIdx % barWidths.length];
    ctx.fillRect(currX, barcodeY + 8, bw, barcodeH - 16);
    currX += bw + (bIdx % 3 === 0 ? 8 : 4);
    bIdx++;
  }

  // Barcode label (Teks Jelas Kontras)
  ctx.fillStyle = '#E2E8F0';
  ctx.font = 'bold 34px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SECURITY CLEARANCE: 8820-ZAQ-2026 // LIVE PROTOCOL', width / 2, bottomY + 200);

  // Footer URL & Branding
  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 32px monospace';
  ctx.fillText('BANGZAKY.MY.ID  •  ARCHITECTED WITH NEXT-GEN AI & THREE.JS', width / 2, height - 130);

  return canvas.toDataURL('image/png');
}

/**
 * Menggambar kartu belakang (Back ID Badge) beresolusi tinggi 2048 x 2880
 */
function drawBackBadge(lightingMode: LightingMode): string {
  const width = 2048;
  const height = 2880;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const isUV = lightingMode === 'uv';
  const primaryAccent = isUV ? '#C084FC' : '#00F0FF';
  const secondaryAccent = isUV ? '#F472B6' : '#10B981';

  // 1. Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (isUV) {
    bgGrad.addColorStop(0, '#120F26');
    bgGrad.addColorStop(0.5, '#0B0918');
    bgGrad.addColorStop(1, '#05040D');
  } else {
    bgGrad.addColorStop(0, '#0F1420');
    bgGrad.addColorStop(0.5, '#0A0D15');
    bgGrad.addColorStop(1, '#04060A');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Magnetic Stripe across the top (below slot hole)
  const magY = 360;
  const magH = 220;
  const magGrad = ctx.createLinearGradient(0, magY, 0, magY + magH);
  magGrad.addColorStop(0, '#020305');
  magGrad.addColorStop(0.5, '#1E2530');
  magGrad.addColorStop(1, '#040608');
  ctx.fillStyle = magGrad;
  ctx.fillRect(0, magY, width, magH);

  // Holographic rainbow strip inside magnetic band
  const holoGrad = ctx.createLinearGradient(0, magY + magH - 24, width, magY + magH - 24);
  holoGrad.addColorStop(0, '#EF4444');
  holoGrad.addColorStop(0.2, '#F59E0B');
  holoGrad.addColorStop(0.4, '#10B981');
  holoGrad.addColorStop(0.6, '#06B6D4');
  holoGrad.addColorStop(0.8, '#8B5CF6');
  holoGrad.addColorStop(1, '#EC4899');
  ctx.fillStyle = holoGrad;
  ctx.fillRect(0, magY + magH - 16, width, 16);

  // 3. Card Border
  ctx.strokeStyle = isUV ? 'rgba(192, 132, 252, 0.45)' : 'rgba(0, 240, 255, 0.45)';
  ctx.lineWidth = 8;
  roundRect(ctx, 48, 48, width - 96, height - 96, 96);
  ctx.stroke();

  // 4. Center Hologram Shield / Monogram
  const centerX = width / 2;
  const centerY = 1000;

  // Outer Glowing Rings
  ctx.strokeStyle = isUV ? 'rgba(192, 132, 252, 0.5)' : 'rgba(0, 240, 255, 0.5)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 300, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = isUV ? 'rgba(244, 114, 182, 0.35)' : 'rgba(16, 185, 129, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 350, 0, Math.PI * 2);
  ctx.stroke();

  // Monogram [ Z ] (Besar & Terang)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 240px "Geist Variable", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Z', centerX, centerY + 84);

  ctx.fillStyle = primaryAccent;
  ctx.font = 'bold 48px monospace';
  ctx.fillText('BANGZAKY VERIFIED BADGE', centerX, centerY + 260);

  // 5. Tech Stack Matrix Grid (Teks Jelas & Mudah Dibaca)
  const stackY = 1480;
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '900 44px monospace';
  ctx.fillText('// CORE ARCHITECTURE STACK', centerX, stackY);

  const skills = [
    'REACT 19 / VITE',
    'TYPESCRIPT',
    'TAILWIND CSS',
    'NODE.JS / REST',
    'PYTHON / FASTAPI',
    'SUPABASE / SQL',
    'THREE.JS / WEBGL',
    'METATRADER 5',
  ];

  const pillW = 420;
  const pillH = 96;
  const gapX = 48;
  const gapY = 36;
  const startX = (width - (pillW * 2 + gapX)) / 2;

  skills.forEach((skill, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = startX + col * (pillW + gapX);
    const py = stackY + 70 + row * (pillH + gapY);

    ctx.fillStyle = isUV ? 'rgba(192, 132, 252, 0.2)' : 'rgba(0, 240, 255, 0.18)';
    roundRect(ctx, px, py, pillW, pillH, 16);
    ctx.fill();

    ctx.strokeStyle = isUV ? 'rgba(192, 132, 252, 0.6)' : 'rgba(0, 240, 255, 0.6)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Geist Variable", monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(skill, px + pillW / 2, py + 62);
  });

  // 6. Signature & Auth Note
  const authY = 2200;
  ctx.fillStyle = '#E2E8F0';
  ctx.font = 'bold 40px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED DEVELOPER SIGNATURE', centerX, authY);

  ctx.strokeStyle = primaryAccent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - 320, authY + 32);
  ctx.lineTo(centerX + 320, authY + 32);
  ctx.stroke();

  // Mission Statement
  ctx.fillStyle = '#F1F5F9';
  ctx.font = 'italic 40px "Geist Variable", sans-serif';
  ctx.fillText('"Crafting resilient full-stack systems & immersive 3D experiences."', centerX, authY + 120);

  // Footer URL (Besar & Sangat Jelas)
  ctx.fillStyle = secondaryAccent;
  ctx.font = '900 44px monospace';
  ctx.fillText('HTTPS://BANGZAKY.MY.ID', centerX, height - 160);

  return canvas.toDataURL('image/png');
}

/**
 * Main generator function untuk mendapatkan tekstur front & back
 */
export async function generateBadgeTextures(
  lightingMode: LightingMode
): Promise<BadgeTextures> {
  const cached = textureCache.get(lightingMode);
  if (cached) return cached;

  const photo = await loadPhoto('/lanyard/zaky_01.png');
  const front = drawFrontBadge(photo, lightingMode);
  const back = drawBackBadge(lightingMode);

  const result: BadgeTextures = { front, back };
  textureCache.set(lightingMode, result);
  return result;
}
