# Product Requirements Document (PRD)
## Coral Coffee Space — Digital Mobile Menu Web

**Version:** 1.0.0  
**Date:** 2026-10-20  
**Status:** Approved via Collaborative Alignment  
**Target Platform:** Web (Mobile-First responsive, optimized for smartphones 360px – 430px)  
**Repository:** [github.com/Bismaajih/Coral-Coffe-Space](https://github.com/Bismaajih/Coral-Coffe-Space.git)

---

## 1. Executive Summary & Vision

**Coral Coffee Space** adalah web katalog menu digital yang dirancang khusus untuk pengunjung kafe yang mengakses menu melalui ponsel pintar mereka (misalnya saat scan QR code di meja atau membuka tautan Instagram).

Web ini berfokus pada **pengalaman visual yang estetik, ringan, dan selaras**:
- Menghadirkan perpaduan visual foto menu dan daftar hidangan yang menyatu mulus dengan latar belakang.
- Mengusung palet warna **Soft Coral & Ocean Breeze** (Biru & Pink bernuansa hangat dan elegan).
- Menggunakan efek transisi masuk bergaya **App-like Smooth Slide & Snap** layaknya aplikasi mobile native (iOS / Android).
- Dirancang murni sebagai **katalog visual interaktif yang cepat & intuitif**, tanpa proses checkout/keranjang yang rumit, dan tanpa popup modal yang menghalangi kenyamanan scrolling.

---

## 2. User Persona & Target Audience

- **Target Pengguna:** Pengunjung cafe (dine-in & take-away), pecinta kopi, pekerja remote/freelancer, dan anak muda yang mencari suasana *cozy coffee space*.
- **Kebutuhan Pengguna:**
  - Melihat daftar menu, varian minuman/makanan, dan harga dengan cepat dan jelas.
  - Mengetahui rekomendasi *Signature* / *Best Seller*.
  - Menikmati tampilan visual foto kopi yang menggugah selera tanpa lag saat di-scroll di handphone.
  - Mengetahui informasi fasilitas (jam buka, Wi-Fi, dan lokasi).

---

## 3. Design System & Aesthetics (Anti-AI-Slop & UI/UX Pro Max)

### 3.1 Color Palette: Soft Coral & Ocean Breeze
*Tema didesain dengan harmoni hangat, mencegah kontras neon yang menyilaukan dan menjaga rasio kontras WCAG AAA/AA (4.5:1+).*

| Peran Token | Warna | Hex Code | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Ocean Navy (Primary)** | Biru Laut Dalam | `#162A45` | Heading utama, nama menu, teks tebal, status aktif |
| **Coral Pink (Accent)** | Coral Warm Pink | `#E06D75` | Badge signature, aksen harga, tombol aktif, active pill |
| **Soft Blush Pink** | Pink Lembut Halus | `#F7E4E6` | Background badge, hover state, soft border |
| **Muted Ocean Blue** | Biru Laut Muted | `#527494` | Teks sekunder, deskripsi rasa, informasi pendukung |
| **Warm Canvas (BG)** | Off-White Pastel | `#FAF7F5` | Latar belakang utama (hangat di mata layar OLED/AMOLED) |
| **Card Surface** | Pure White w/ Tint | `#FFFFFF` | Permukaan kartu menu dengan bayangan halus bernuansa lembut |
| **Border & Divider** | Soft Edge Line | `#ECE4E0` | Garis pembatas kartu & pemisah kategori |

### 3.2 Tipografi
- **Display / Heading:** *Plus Jakarta Sans* / *Outfit* (Modern, bersih, premium, geometric sans).
- **Body & Harga:** *Inter* / *DM Sans* (Sangat mudah dibaca pada ukuran 13px - 16px di layar kecil).

### 3.3 Anti-Slop Design Principles
- **No Generic Emoji:** Semua ikon menggunakan SVG murni (Lucide/Heroicons: cangkir kopi, pin lokasi, jam, wifi, instagram).
- **No Cluttered Popups:** Semua informasi penting langsung tampak di kartu.
- **Harmonious Imagery:** Foto menu dipadukan dengan radius sudut lembut (*smooth rounded mask*), gradasi latar belakang terintegrasi, dan *drop shadow* bernuansa biru/pink tipis.

---

## 4. Fitur & Struktur Halaman

Halaman dirancang sebagai *Single Page Application (SPA)* mobile-first yang sangat responsif:

### 4.1 Warm Hero Header (Bagian Atas)
- **Branding:** Logo & Nama **"Coral Coffee Space"** dengan tipografi estetik.
- **Tagline:** Slogan singkat yang ramah dan mengundang.
- **Info Bar:**
  - 🕒 Jam Operasional (e.g. *Open Daily: 08.00 – 22.00*).
  - 📶 Info Fasilitas (*Free High-Speed Wi-Fi & Cozy Workspace*).
  - 📍 Lokasi & Tautan Sosial Media (Instagram & Google Maps).

### 4.2 Sticky Category Navigation (Navigasi Kategori)
- Tab bar horizontal berbentuk *pills* yang menempel di bagian atas saat di-scroll (*sticky header*).
- Kategori utama:
  1. **Signature & Specials** (Minuman racikan khas Coral Coffee Space)
  2. **Espresso & Classic** (Espresso, Americano, Latte, Cappuccino, Flat White)
  3. **Manual Brew** (Single Origin V60, Japanese Drip, Aeropress)
  4. **Non-Coffee & Tea** (Matcha Latte, Artisan Tea, Chocolate, Red Velvet)
  5. **Pastry & Bites** (Croissant, Pain au Chocolat, Toast, Fries)
- Interaksi: Ketika ditekan, layar melakukan *smooth scroll* langsung ke bagian kategori terkait.

### 4.3 Menu List & Card Presentation
- Format tampilan kartu dibuat modular dan dapat disesuaikan dengan aset foto yang akan dikirimkan oleh user.
- Komponen di setiap kartu:
  - **Foto Menu:** Gambar berkualitas tajam dengan efek *image blending*.
  - **Badge Status:** *Signature*, *Best Seller*, atau *New*.
  - **Nama Menu:** Tegas dan mudah dibaca.
  - **Deskripsi / Tasting Notes:** Catatan rasa (misal: *Floral, Citrus, Caramel finish*).
  - **Indikator Varian:** Ikon kecil Hot / Iced.
  - **Harga:** Ditampilkan rapi dan konsisten (e.g. `Rp 28.000`).

### 4.4 Animasi & Motion: App-like Smooth Slide & Snap
- **Entrance Animation:** Kartu menu meluncur lembut dari samping dengan kurva *cubic-bezier* halus (`translate3d` & `opacity`), memberikan *feel* aplikasi mobile native.
- **Snap Interaction:** Kategori pills memiliki efek *snap-align* horizontal yang mulus saat digeser dengan jari.
- **Micro-interactions:** Sentuhan tombol dan kartu memiliki respons *active tap* (scale 0.98) yang instan dan taktis.

---

## 5. Non-Functional Requirements & Standar Teknis

1. **Kecepatan & Performa:** Load time < 1 detik pada jaringan 4G mobile, format gambar modern (WebP/SVG), tanpa dependensi library berat yang memperlambat.
2. **Responsivitas:**
   - Di layar Mobile (< 640px): Tampilan penuh native mobile view.
   - Di layar Desktop (> 640px): Ditampilkan dalam layout mobile frame yang elegan di tengah layar (preview bergaya mockup smartphone) atau reflow 2 kolom rapi.
3. **Aksesibilitas (A11y):**
   - Tap targets minimum 44px x 44px sesuai standar ergonomi sentuhan jari.
   - Dukungan `prefers-reduced-motion` untuk pengunjung yang sensitif terhadap animasi.

---

## 6. Rencana Tahapan Implementasi

1. **Fase 1 — Fondasi & PRD:** Pembuatan PRD (dokumen ini) & inisialisasi arsitektur styling/design tokens (`index.html`, `style.css`, `app.js`).
2. **Fase 2 — Integrasi Aset Gambar & Layout:** Penerapan struktur kartu modular dan perpaduan gambar dari user saat materi siap.
3. **Fase 3 — Animasi Masuk (Slide & Snap):** Implementasi transisi mobile-app masuk yang halus dan sticky category scroll.
4. **Fase 4 — Review & Sinkronisasi Git:** Uji coba di berbagai resolusi layar, pre-emit check (Hallmark/Anti-Slop), dan push ke repositori GitHub.
