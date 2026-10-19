# Product Requirements Document (PRD) — Revised
## Coral Coffee Space — Simple Editorial Mobile Menu

**Version:** 1.1.0  
**Date:** 2026-10-20  
**Design Reference:** Editorial Minimalist Cafe Menu (Inspirasi layout Kopi Nako style)  
**Target Platform:** Web (Mobile-First responsive, smartphone viewport 360px – 430px & tablet/desktop responsive)  
**Repository:** [github.com/Bismaajih/Coral-Coffe-Space](https://github.com/Bismaajih/Coral-Coffe-Space.git)

---

## 1. Konsep & Visi Utama (Sesuai Referensi Pengguna)

Pengguna menginginkan tampilan yang **bersih, simpel, dan menyatu alami dengan halaman web**, terinspirasi dari gaya buku menu kafe modern minimalis (seperti referensi visual Kopi Nako):
1. **Tanpa Bounding Box Kartu yang Kaku:** Gambar produk merupakan *cut-out* berkualitas tinggi yang berpadu langsung di atas latar belakang kanvas bersih, memberikan kesan lapang dan elegan.
2. **Layout Zig-Zag / Alternating yang Dinamis:**
   - Baris 1: Foto produk di sebelah kiri, Judul Menu + Daftar Varian & Harga di sebelah kanan.
   - Baris 2: Judul Menu + Deskripsi di sebelah kiri, Foto produk di sebelah kanan.
3. **Efek Scroll Halus (Fade In & Fade Out):**
   - Saat pengunjung melakukan *scrolling*, foto produk muncul secara lembut (*smooth fade in & slight scale/float*) ketika memasuki layar, dan menghilang secara halus (*smooth fade out*) saat melewati pandangan.
4. **Palet Warna Biru & Pink (Soft Coral & Ocean Breeze):**
   - Deep Navy / Ocean Blue (`#162A45`) untuk tipografi judul tegas, garis pemisah minimalis, dan teks menu.
   - Coral Pink (`#E06D75` / `#FF7582`) untuk aksen rekomendasi jempol (*thumbs-up* / *chef's pick*), badge *signature*, dan aksen interaktif.
   - Latar belakang kanvas *clean warm off-white* (`#FBF9F8`) dengan tekstur lembut, nyaman dipandang di layar HP.

---

## 2. Struktur Elemen Menu (Berdasarkan Referensi Gambar)

Setiap grup menu mengadopsi anatomi editorial:

### A. Judul Kategori (Category Heading)
- Huruf kapital tebal (*Uppercase Bold*): contoh `SERI BOTOLAN`, `ES KRIM`, `WARUNG CORAL`.
- Garis bawah aksen tipis (*minimalist divider underline*) berwarna Ocean Navy atau Coral Pink.

### B. Foto Produk (Cut-Out Visual)
- Foto minuman atau makanan dengan bayangan alami lembut (*soft natural contact shadow*).
- Menghadirkan efek animasi:
  - Masuk: `opacity: 0 -> 1`, `transform: translateY(20px) -> translateY(0) scale(1)`.
  - Keluar saat lewat viewport: `opacity: 1 -> 0`, `transform: translateY(0) -> translateY(-20px)`.

### C. Daftar Varian & Harga (Tabular Pricing)
- Nama varian / ukuran di sebelah kiri (misal: `Jumbo`, `Medium`, `Mini` atau `Nasi Merem Melek Kekinian`).
- Catatan kecil / sub-teks deskripsi di bawah judul (misal: *1 scoop / 2 scoops*, atau deskripsi racikan kopi).
- Ikon rekomendasi jempol (*thumbs up* SVG) berwarna Coral Pink untuk menu favorit.
- Harga ringkas di sebelah kanan dalam format angka ribuan yang rapi (contoh: `17`, `32`, `89`, `28`, `35`).

### D. Footer Catatan Transparan
- Teks info kecil di bagian bawah seksi:
  `*harga dihitung dalam ribuan rupiah • harga belum termasuk pajak • Coral Coffee Space`

---

## 3. Spesifikasi Animasi Scroll (Scroll-Driven Appearance)

Menggunakan **Intersection Observer API** dengan *threshold* dan *rootMargin* terkalibrasi:
- **Status Hidden:** `opacity: 0; transform: translateY(25px) scale(0.96); filter: blur(4px); transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);`
- **Status Visible:** `opacity: 1; transform: translateY(0) scale(1); filter: blur(0px);`
- **Status Scrolled Past (Fade Out):** Ketika elemen mulai keluar dari viewport atas, opacity meredup lembut (`opacity: 0.15; filter: blur(2px)`), sehingga fokus mata pengguna selalu tertuju pada menu yang sedang tepat berada di tengah layar HP.

---

## 4. Rencana Implementasi File

1. **`index.html`:** Struktur semantik menu bersih dengan kategori Kopi Botolan, Signature Coffee, Ice Cream & Dessert, serta Makanan / Snack ala Coral Coffee Space.
2. **`style.css`:** Desain editorial tanpa kotak kaku, tipografi modern (*Plus Jakarta Sans* & *Inter*), CSS scroll utilities, dan palet warna Biru-Pink.
3. **`app.js`:** Logika Intersection Observer untuk transisi muncul/menghilang halus pada gambar dan sticky indicator kategori.
4. **Aset Gambar:** Foto berlatar transparan/clean cutout beresolusi tajam untuk kopi botolan, cangkir kopi, es krim, dan makanan.
