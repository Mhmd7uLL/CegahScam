# CegahScam

CegahScam adalah platform web untuk **mencegah, memeriksa, dan menangani penipuan online (scam/phishing)**. Pengguna bisa menganalisis nomor telepon, pesan chat, atau tangkapan layar yang mencurigakan, lalu mendapat skor risiko dan rekomendasi. Kalau sudah terlanjur jadi korban, tersedia alur darurat untuk kebocoran data dan kehilangan uang, lengkap dengan laporan yang bisa disalin atau diunduh.

> Dokumen ini khusus untuk aplikasi **CegahScam (frontend + backend Express)**. Layanan AI (FastAPI) berada di repository terpisah dan hanya diakses lewat backend.

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Alur Pengguna](#alur-pengguna)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Menjalankan di Lokal](#menjalankan-di-lokal)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Endpoint API](#endpoint-api)
- [Halaman & Routing](#halaman--routing)
- [Komponen Reusable](#komponen-reusable)
- [Panduan Edit Cepat](#panduan-edit-cepat)
- [Aturan Gaya & Palet Warna](#aturan-gaya--palet-warna)
- [Troubleshooting](#troubleshooting)
- [Kontribusi](#kontribusi)
- [Catatan Penting](#catatan-penting)

---

## Fitur Utama

### 1. Beranda (`/`)
Landing page berisi pengenalan singkat, tombol aksi cepat ke **Analisis**, **Edukasi**, dan **Darurat**, section "Apakah kamu terkena penipuan?", FAQ, dan maskot interaktif.

### 2. Analisis (`/analysis`)
Pengguna memilih salah satu dari tiga jenis pemeriksaan, mengisi data, lalu melihat hasil analisis berbentuk **skor risiko** (rendah / sedang / tinggi).

| Jenis | Halaman form | Input |
| --- | --- | --- |
| Nomor telepon | `/analysis/phone` | `nomorTelepon` (10–15 digit, boleh diawali `+`) |
| Pesan chat | `/analysis/chat` | `pesan` + gambar bukti (`fileBukti`) |
| Tangkapan layar | `/analysis/screenshot` | pilihan platform (`whatsapp` / `instagram`) + gambar bukti (`fileBukti`) |

Hasil analisis ditampilkan di:
- `/analysis/resultphone`
- `/analysis/resultchat`
- `/analysis/resultscreenshot`

Isi halaman hasil: `RiskGauge` (skor), kategori risiko, alasan, rekomendasi, rekomendasi bank, kontak bantuan, dan tombol lanjut ke alur darurat.

### 3. Darurat (`/emergency`)
Untuk pengguna yang sudah menjadi korban. Ada dua kasus:

| Kasus | Form | Halaman laporan |
| --- | --- | --- |
| Kebocoran data / akun | `/emergency/data` | `/report/data` |
| Kehilangan uang / transfer penipuan | `/emergency/financial` | `/report/financial` |

Data yang dikirim:
- **Kebocoran data:** `jenisData`, `tanggalKejadian`, `kanalMedia`, `tindakanPelaku`, `detailKronologi`, `statusAkses`, `fileBukti`.
- **Finansial:** `jenisBank`, `kanalMedia`, `tanggalKejadian`, `tujuanTransaksi`, `namaInstitusi`, `nomorRekening`, `namaPemilikRekening`, `nominalKerugian`, `detailKronologi`, dan file bukti dengan nama field **`file`**.

Halaman laporan menampilkan ringkasan kronologi, langkah penanganan, dan kontak resmi. Ada tombol **Salin laporan** dan **Unduh PDF** (membuka print window browser).

### 4. Edukasi (`/education`)
Materi edukasi berisi penjelasan modus penipuan (impersonation, urgency, phishing, fake investment, dll.), contoh pola chat scam dalam carousel, dan glosarium istilah keamanan (OTP, phishing, deepfake, SIM swap, dan lainnya).

### 5. Halaman hasil & komponen pendukung
- `RiskGauge` menampilkan skor risiko dengan warna sesuai level.
- `LoadingOverlay` tampil saat proses analisis berjalan.
- `Robot` menampilkan maskot dengan animasi dan interaksi.
- `Navbar` + `Footer` dipakai di semua halaman.

---

## Alur Pengguna

```
Analisis
/analysis
  ├─ Nomor telepon  → /analysis/phone       → /analysis/resultphone
  ├─ Pesan chat     → /analysis/chat        → /analysis/resultchat
  └─ Screenshot     → /analysis/screenshot  → /analysis/resultscreenshot
        │
        └─ tombol "Data saya bocor" / "Saya kehilangan uang"
              → /emergency/data atau /emergency/financial
                    → /report/data atau /report/financial

Darurat
/emergency
  ├─ Data bocor     → /emergency/data       → /report/data
  └─ Kehilangan uang→ /emergency/financial  → /report/financial
```

Hasil dari API diteruskan ke halaman hasil lewat `navigate(..., { state: { result } })`. Artinya **kalau halaman hasil di-refresh, datanya hilang** dan kembali ke tampilan default. Ini perilaku yang disengaja (tidak menyimpan hasil di server).

---

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Bahasa | TypeScript |
| Frontend | React 19, React Router 7 |
| Build tool | Vite 8 (dengan React Compiler) |
| Styling | Tailwind CSS 4 |
| Backend | Node.js, Express 5, Multer (upload file), CORS |
| AI | Service FastAPI terpisah (diakses lewat backend, bukan dari browser) |
| Linting | ESLint + typescript-eslint |

---

## Struktur Proyek

```
CegahScam/
├─ public/                        # aset publik (logo, favicon)
├─ src/
│  ├─ assets/                     # gambar & ikon, dikelompokkan per fitur
│  │  ├─ Analysis/                # ikon nomor telepon, chat, screenshot
│  │  ├─ Education/               # gambar edukasi + carousel
│  │  ├─ Emergency/               # maskot & ilustrasi darurat
│  │  ├─ Home/                    # ilustrasi beranda
│  │  └─ Icon/                    # ikon SVG
│  ├─ components/                 # komponen reusable
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Robot.tsx
│  │  ├─ RiskGauge.tsx
│  │  ├─ LoadingOverlay.tsx
│  │  ├─ AnalysisHook.tsx         # hero + stepper halaman analisis
│  │  ├─ EmergencyHook.tsx        # hero + stepper halaman darurat
│  │  └─ CarouselEdu.tsx
│  ├─ lib/
│  │  └─ api.ts                   # helper apiUrl() untuk base URL backend
│  ├─ pages/                      # halaman utama
│  │  ├─ Home.tsx
│  │  ├─ Analysis.tsx             # pilih jenis analisis
│  │  ├─ Analysis/
│  │  │  ├─ Phone.tsx
│  │  │  ├─ Chat.tsx
│  │  │  └─ Screenshot.tsx
│  │  ├─ ResultAnalysis/
│  │  │  ├─ ResultPhone.tsx
│  │  │  ├─ ResultChat.tsx
│  │  │  └─ ResultScreenshot.tsx
│  │  ├─ Emergency.tsx            # pilih kasus darurat
│  │  ├─ EmergencyCase/
│  │  │  ├─ DataBreach.tsx
│  │  │  └─ Financial.tsx
│  │  ├─ Report/
│  │  │  └─ EmergencyReportView.tsx   # laporan data & finansial
│  │  ├─ Education.tsx
│  │  └─ NotFound.tsx
│  ├─ App.tsx                     # routing + layout
│  ├─ App.css                     # import Tailwind + style global & utility form
│  ├─ index.css                   # style global tambahan (saat ini kosong)
│  └─ main.tsx                    # entry point + BrowserRouter
├─ server/                        # backend Express (proxy ke AI service)
│  ├─ src/
│  │  ├─ app.ts                   # setup middleware & route
│  │  ├─ server.ts                # entry point server
│  │  ├─ controllers/
│  │  │  ├─ analysis.controller.ts
│  │  │  └─ emergency.controller.ts
│  │  └─ routes/
│  │     ├─ analysis.routes.ts
│  │     └─ emergency.router.ts
│  ├─ .env.example
│  └─ package.json
├─ .env.example                   # contoh env frontend
├─ vite.config.ts                 # proxy /api → localhost:3000
└─ package.json
```

---

## Menjalankan di Lokal

**Prasyarat:** Node.js 20+ dan npm.

### 1. Clone & install frontend

```bash
git clone https://github.com/njhbil/CegahScam.git
cd CegahScam
npm install
```

### 2. (Opsional) install backend

```bash
cd server
npm install
```

### 3. Siapkan environment

Frontend:

```bash
# dari folder root CegahScam
cp .env.example .env
# biarkan VITE_API_URL kosong untuk development lokal
```

Backend:

```bash
# dari folder server
cp .env.example .env
# lalu isi AI_SERVICE_URL dan AI_API_TOKEN
```

### 4. Jalankan

Buka dua terminal.

```bash
# terminal 1 — backend (port 3000)
cd server
npm run dev

# terminal 2 — frontend (port 5173)
npm run dev
```

Buka `http://localhost:5173`.

Selama `VITE_API_URL` kosong, request ke `/api/...` otomatis diproxy Vite ke `http://localhost:3000` (lihat `vite.config.ts`).

### 5. Script yang tersedia

| Perintah | Lokasi | Kegunaan |
| --- | --- | --- |
| `npm run dev` | root | Jalankan dev server Vite |
| `npm run build` | root | Type-check (`tsc -b`) + build produksi |
| `npm run preview` | root | Preview hasil build |
| `npm run lint` | root | Jalankan ESLint |
| `npm run dev` | `server/` | Jalankan backend dengan `tsx watch` |
| `npm run build` | `server/` | Compile backend dengan `tsc` (atur `outDir` di `server/tsconfig.json` bila perlu) |
| `npm start` | `server/` | Jalankan `dist/server.js` (pastikan `outDir` sudah diarahkan ke `dist`) |

> Untuk pengembangan sehari-hari, cukup `npm run dev` di `server/`. `npm run build` + `npm start` dipakai kalau mau menjalankan versi ter-compile.

---

## Konfigurasi Environment

### Frontend (`CegahScam/.env`)

| Variabel | Contoh | Keterangan |
| --- | --- | --- |
| `VITE_API_URL` | `https://api.cegah-scam.njhbil.my.id` | Base URL backend. **Kosongkan** saat development lokal agar memakai proxy Vite. |

### Backend (`CegahScam/server/.env`)

| Variabel | Contoh | Keterangan |
| --- | --- | --- |
| `PORT` | `3000` | Port backend Express. |
| `CORS_ORIGIN` | `http://localhost:5173` | Origin frontend yang diizinkan. |
| `AI_SERVICE_URL` | `http://127.0.0.1:8000` | Alamat AI service (FastAPI). |
| `AI_API_TOKEN` | `token-rahasia` | Token yang sama dengan `CEGAHSCAM_API_TOKEN` di AI service. **Jangan ditaruh di frontend.** |

> Jangan pernah commit file `.env`. Yang boleh masuk repo hanya `.env.example`.

---

## Endpoint API

Semua endpoint menerima `multipart/form-data` (kecuali nomor telepon yang memakai JSON).

### Analisis — `/api/analysis`

| Method | Path | Body | Keterangan |
| --- | --- | --- | --- |
| `POST` | `/api/analysis/phone` | JSON `{ "nomorTelepon": "0812..." }` | Validasi 10–15 digit. |
| `POST` | `/api/analysis/chat` | `pesan`, `fileBukti` | File JPG/PNG/WEBP, maks 15 MB. |
| `POST` | `/api/analysis/screenshot` | `platform`, `fileBukti` | File JPG/PNG/WEBP, maks 15 MB. |

Contoh respons analisis (dipakai halaman hasil):

```json
{
  "risk_score": 82,
  "risk_category": "Tinggi",
  "scam_type": "phishing",
  "reasons": ["..."],
  "recommendations": ["..."],
  "official_contact": { "name": "Bank ...", "phone": "..." }
}
```

### Darurat — `/api/emergency`

| Method | Path | Body | Keterangan |
| --- | --- | --- | --- |
| `POST` | `/api/emergency/data` | `jenisData`, `tanggalKejadian`, `kanalMedia`, `tindakanPelaku`, `detailKronologi`, `statusAkses`, `fileBukti` | Laporan kebocoran data. |
| `POST` | `/api/emergency/financial` | `jenisBank`, `kanalMedia`, `tanggalKejadian`, `tujuanTransaksi`, `namaInstitusi`, `nomorRekening`, `namaPemilikRekening`, `nominalKerugian`, `detailKronologi`, `file` | Laporan kehilangan uang. **Nama field file: `file`.** |

> Semua endpoint hanya meneruskan request ke AI service. Backend tidak menyimpan data pengguna.

---

## Halaman & Routing

Routing ada di `src/App.tsx` dan memakai `react-router-dom`.

| Route | Komponen | Fungsi |
| --- | --- | --- |
| `/` | `pages/Home.tsx` | Beranda |
| `/analysis` | `pages/Analysis.tsx` | Pilih jenis analisis |
| `/analysis/phone` | `pages/Analysis/Phone.tsx` | Form nomor telepon |
| `/analysis/chat` | `pages/Analysis/Chat.tsx` | Form pesan chat |
| `/analysis/screenshot` | `pages/Analysis/Screenshot.tsx` | Form tangkapan layar |
| `/analysis/resultphone` | `pages/ResultAnalysis/ResultPhone.tsx` | Hasil analisis nomor |
| `/analysis/resultchat` | `pages/ResultAnalysis/ResultChat.tsx` | Hasil analisis chat |
| `/analysis/resultscreenshot` | `pages/ResultAnalysis/ResultScreenshot.tsx` | Hasil analisis screenshot |
| `/emergency` | `pages/Emergency.tsx` | Pilih kasus darurat |
| `/emergency/data` | `pages/EmergencyCase/DataBreach.tsx` | Form kebocoran data |
| `/emergency/financial` | `pages/EmergencyCase/Financial.tsx` | Form kehilangan uang |
| `/report/data` | `pages/Report/EmergencyReportView.tsx` | Laporan kebocoran data |
| `/report/financial` | `pages/Report/EmergencyReportView.tsx` | Laporan kehilangan uang |
| `/education` | `pages/Education.tsx` | Materi edukasi |
| `*` | `pages/NotFound.tsx` | Halaman 404 |

`ScrollToTop` di `App.tsx` otomatis mengembalikan posisi scroll ke atas setiap pindah halaman.

---

## Komponen Reusable

| Komponen | Fungsi | Props penting |
| --- | --- | --- |
| `Navbar` | Navigasi responsif (desktop & mobile) | — |
| `Footer` | Footer global | — |
| `Robot` | Maskot dengan animasi `float`/`bob`/`sway` dan interaksi | `src`, `alt`, `motion`, `interactive`, `className` |
| `RiskGauge` | Gauge skor risiko | `value`, `size`, `colors` |
| `LoadingOverlay` | Overlay loading saat request AI | `message` |
| `AnalysisHook` | Hero + stepper 3 langkah halaman analisis | — |
| `EmergencyHook` | Hero + stepper 3 langkah halaman darurat | — |
| `CarouselEdu` | Carousel contoh chat scam | — |

Styling form (`.form-card`, `.form-input`, `.form-upload`, `.form-submit`, dll.) ada di `src/App.css`, jadi kalau mengubah tampilan form, cek file itu juga.

---

## Panduan Edit Cepat

### Mengubah teks atau konten
Teks hampir semuanya ditulis langsung di file halaman (`src/pages/...`). Cari kalimat yang ingin diganti, lalu edit. Tidak ada file terjemahan terpisah.

### Menambah halaman baru
1. Buat file di `src/pages/`, misalnya `src/pages/Faq.tsx`.
2. Daftarkan route di `src/App.tsx`:
   ```tsx
   <Route path="/faq" element={<Faq />} />
   ```
3. Kalau perlu muncul di navigasi, tambahkan ke array `links` di `src/components/Navbar.tsx`.

### Mengubah warna atau ukuran teks
Ikuti palet warna di bagian [Aturan Gaya & Palet Warna](#aturan-gaya--palet-warna). Warna dipakai lewat utility Tailwind arbitrer, misalnya `text-[#446685]` atau `bg-[#47a8e4]`.

| Warna | Hex | Pemakaian umum |
| --- | --- | --- |
| Biru tua | `#446685` | Judul, teks utama |
| Biru terang | `#3385FF` | Aksen, ikon aktif |
| Biru medium | `#52789A` | Tombol/ikon sekunder |
| Biru muda | `#A5C6FF` | Highlight, tombol upload |
| Hitam | `#111827` | Teks netral |
| Biru aksi | `#47a8e4` | Kartu & tombol utama (banyak dipakai di halaman) |

Ukuran teks acuan: judul `text-[40px]`, subtitle/tambahan `text-[15px]`, shadow `shadow-lg`–`shadow-xl`.

### Mengganti gambar
Taruh file baru di folder yang sesuai (`src/assets/<Fitur>/`), lalu ganti import di halaman terkait. Format yang sudah dipakai: `.webp`, `.png`, `.svg`.

### Menambah atau mengubah field form
Field form tersebar di tiga tempat — ubah ketiganya agar konsisten:
1. **UI form** di `src/pages/...` (input/textarea/radio).
2. **Pengiriman data** lewat `FormData` di halaman yang sama (`fd.append(...)`).
3. **Validasi & penerusan** di `server/src/controllers/...`.

Nama field harus sama persis antara frontend dan backend. Contoh yang mudah tertukar: laporan finansial memakai `file`, sedangkan laporan data memakai `fileBukti`.

### Batasan upload
- Format: **JPG, PNG, WEBP**
- Ukuran maksimal: **15 MB**
- Divalidasi di frontend (sebelum kirim) dan di backend (Multer).

---

## Aturan Gaya & Palet Warna

Acuan desain proyek:

**Palet warna**

| Warna | Hex | Pemakaian umum |
| --- | --- | --- |
| Biru tua | `#446685` | Judul, teks utama |
| Biru terang | `#3385FF` | Aksen, ikon aktif |
| Biru medium | `#52789A` | Tombol/ikon sekunder |
| Biru muda | `#A5C6FF` | Highlight, tombol upload |
| Hitam | `#111827` | Teks netral |
| Biru aksi | `#47a8e4` | Kartu & tombol utama (banyak dipakai di halaman) |

**Ukuran teks**

- Title / segment title: `text-[40px]`
- Subtitle / title tambahan: `text-[15px]`

**Shadow**

- Gunakan `shadow-lg` sampai `shadow-xl`.

Halaman-halaman juga memakai Tailwind responsif (`sm:`, `md:`, `lg:`, `xl:`) dan utility seperti `reveal`, `flex`, `grid`. Cek contoh di `src/pages/Home.tsx` untuk pola layout yang dipakai.

---

## Troubleshooting

| Masalah | Penyebab umum | Solusi |
| --- | --- | --- |
| Request API gagal / CORS error | `CORS_ORIGIN` backend tidak cocok dengan origin frontend | Samakan dengan `http://localhost:5173` atau domain frontend. |
| `fetch failed` / 500 dari backend | Backend atau AI service belum jalan | Jalankan `server` dan pastikan `AI_SERVICE_URL` benar. |
| Analisis lama / timeout | AI service lambat (timeout 90 detik) | Cek log AI service, coba lagi. |
| Halaman hasil kosong setelah refresh | Hasil dikirim lewat `location.state` | Kembali ke form dan ulangi analisis. |
| `npm run build` gagal | Error TypeScript | Jalankan `npm run build` dan baca error pertama yang muncul. |
| Upload ditolak | Format bukan JPG/PNG/WEBP atau > 15 MB | Kompres/ganti file. |

---

## Kontribusi

1. Clone repo dan buat branch baru:
   ```bash
   git switch -c feat/nama-fitur
   ```
2. Kerjakan perubahan. Sebelum commit, pastikan build bersih:
   ```bash
   npm run build
   npm run lint
   ```
3. Commit dengan pesan yang jelas (contoh: `feat(analysis): tambah validasi nomor telepon`).
4. Push branch, lalu buka **Pull Request** ke `main` dengan deskripsi perubahan.

Branch `main` dilindungi — perubahan sebaiknya masuk lewat Pull Request, bukan push langsung.

---

## Catatan Penting

- **Jangan commit `.env`** atau token AI. Simpan token hanya di backend.
- Backend **tidak menyimpan** data pengguna; semua hanya diteruskan ke AI service.
- Hasil analisis/laporan tidak dipersist. Refresh halaman hasil akan mengosongkannya.
- Semua gambar/ilustrasi ada di `src/assets/`. Sebelum menambah gambar besar, kompres dulu agar build tetap ringan.
- `vite.config.ts` mengizinkan host `cegah-scam.njhbil.my.id`. Kalau deploy ke domain lain, tambahkan domain itu ke `server.allowedHosts`.
