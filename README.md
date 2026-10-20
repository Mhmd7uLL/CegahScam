# CegahScam

Platform pelaporan dan penanganan kondisi Scam serta Phising Online dengan berbagai fitur. Salah satunya yaitu pelaporan darurat

## Teknologi
- Bahasa: TypeScript
- Build / Dev: Vite
- Routing: react-router-dom
- Front-End: React, Tailwind CSS

## Struktur proyek 
```
├─ CegahScam/
│  ├─ public/                    # aset publik (favicon, static images)
|  ├─ src/
|  │  ├─ assets                  # gambar dan icon untuk UI
│  |  ├─ components/             # berbagai komponen untuk navigasi tiap halaman
│  |  ├─ pages/                  # halaman utama web (beranda, darurat, analisis dan edukasi)
|  │  |  ├─ HasilLaporan/        # menampung halaman hasil laporan (darurat)
│  |  |  └─ KasusDarurat/        # menampung 2 halaman kasus darurat (data dan finansial)
│  |  ├─ App.css                 # style utama mengcover semua file tsx (termasuk import Tailwind CSS)
│  |  ├─ App.tsx                 # root app (routing, layout)
│  |  └─ main.tsx                # entry point
|  |
|  ├─ package.json               # skrip dan dependensi
|  ├─ vite.config.ts
|  ├─ vite.config.ts
|  └─ tsconfig*.json
├─ .gitignore
└─ README.md
```

## Cara menjalankan (lokal)
Pastikan Node.js dan npm sudah terpasang. Jalankan perintah berikut dari root project:

```bash
# pasang dependensi
npm install

# jalankan dev server
npm run dev

# build produksi
npm run build

# preview hasil build secara lokal
npm run preview
```

## Kontribusi
1. Clone repo ini.
2. Buat branch fitur: `git switch -C feat/nama-fitur`
3. Commit perubahan dan push.
4. Buka Pull Request pada branch main dengan deskripsi perubahan.

