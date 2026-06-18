# Extended Intro Sequence (30s)

Akan memperbarui animasi intro dari 10 detik menjadi 30 detik dengan penambahan efek visual baru, perbaikan tombol skip, dan optimasi mobile.

## Proposed Changes

### 1. Update Durasi dan Fase Animasi (`IntroSequence.tsx`)
- Ubah `TOTAL_DURATION` menjadi `30`.
- Perbarui fase waktu (`getPhase`):
  - `BOOT` (0–2s): Terminal booting, grid radar aktif.
  - `ENTER` (2–5s): Drones memasuki area.
  - `DOGFIGHT` (5–20s): Pertempuran sengit, manuver saling menghindar.
  - `CRITICAL_DAMAGE` (20–25s): [BARU] Salah satu drone terkena hit ringan dan mengeluarkan efek *smoke trail* (asap) tapi masih bermanuver.
  - `EXPLOSION` (25–28s): Final hit, ledakan besar.
  - `REVEAL` (28–30s): Transisi *glitch wipe* ke website utama.

### 2. Efek Visual Tambahan ("Ciamik")
- **Lebih Banyak Jalur (Paths):** Menambahkan array titik manuver untuk drone selama fase 5–25s.
- **Flares & Smoke Trails:** Tambahkan partikel asap abu-abu/hitam yang mengekor di belakang drone yang rusak (selama fase `CRITICAL_DAMAGE`).
- **Laser / Projectiles Lebih Banyak:** Jadwal tembakan (`PROJ_EVENTS`) diperbanyak untuk mengisi durasi 30 detik.

### 3. Pembaruan UI (Tombol Skip & HUD)
- **Tombol Skip Diperbesar:** Memperbesar ukuran tombol, font lebih besar, area klik lebih luas untuk mobile.
- **Countdown Timer:** Menambahkan angka hitung mundur pada tombol skip (misal: `SKIP INTRO (28s) ▸`). Ini akan di-update secara real-time via loop `requestAnimationFrame`.
- **HUD Update:** Mengatur teks HUD agar seirama dengan timing 30 detik.

### 4. Optimasi Mobile Layout
- Pastikan rasio grid dan ukuran drone (`droneScale`) proporsional pada layar HP (portrait).
- Menyesuaikan posisi teks terminal (`BOOT_LINES`) dan pesan "SYSTEM BREACH" agar tidak terpotong.
- Tombol Skip diletakkan di posisi bawah yang mudah dijangkau jempol (Bottom-Right atau Center-Bottom).

## User Review Required

> [!IMPORTANT]
> **Silakan direview:** 
> 1. Apakah penambahan efek *smoke trail* (asap tebal) saat rusak sudah sesuai dengan tema?
> 2. Posisi tombol SKIP yang diperbesar apakah tetap di pojok kanan bawah, atau ingin di tengah bawah khusus untuk versi mobile?

Jika rencana ini sudah mantap, silakan infokan dan saya akan langsung mengubah kodenya!
