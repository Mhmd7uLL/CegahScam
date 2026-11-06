import { Link } from "react-router-dom";

const quickLinks = [
  {
    to: "/analysis",
    label: "Analisis",
    description: "Periksa pesan, link, nomor, atau tangkapan layar.",
  },
  {
    to: "/emergency",
    label: "Darurat",
    description: "Langkah penanganan kalau kamu sudah jadi korban.",
  },
  {
    to: "/education",
    label: "Edukasi",
    description: "Pelajari modus penipuan dan cara melindungi diri.",
  },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-28 sm:px-6 lg:pt-36">
      <section className="reveal relative w-full max-w-3xl overflow-hidden rounded-[32px] bg-white/60 px-5 py-10 text-center shadow-xl sm:rounded-[44px] sm:px-10 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#A5C6FF]/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#3385FF]/20 blur-3xl"
        />

        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#1E40AF] shadow-lg shadow-[#446685]/10 sm:h-20 sm:w-20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <path d="M12 3 4.5 6v5.2c0 4.4 3 8.1 7.5 9.8 4.5-1.7 7.5-5.4 7.5-9.8V6L12 3Z" />
              <path d="M9.9 9.9a2.2 2.2 0 1 1 3.3 1.9c-.7.4-1.2.9-1.2 1.7" />
              <path d="M12 16.6h.01" />
            </svg>
          </div>

          <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#52789A]">
            Error 404
          </p>

          <h1 className="mt-2 text-[32px] font-bold leading-tight text-[#446685] sm:text-[40px]">
            Halaman tidak ditemukan
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-[#3F4E5E] sm:text-[15px]">
            Tautan yang kamu buka mungkin salah ketik, sudah dipindahkan, atau
            tidak pernah ada. Tenang, kamu masih bisa lanjut memakai fitur
            CegahScam lewat tombol di bawah ini.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="w-full rounded-2xl bg-[#3385FF] px-7 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#1E40AF] hover:shadow-xl sm:w-auto sm:text-base"
            >
              Kembali ke Beranda
            </Link>
            <Link
              to="/analysis"
              className="w-full rounded-2xl bg-[#ADCEFF] px-7 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#85B6FF] hover:shadow-xl sm:w-auto sm:text-base"
            >
              Mulai Analisis
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="group rounded-2xl border border-white/70 bg-white/55 p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#A5C6FF] hover:bg-white hover:shadow-lg"
          >
            <p className="flex items-center gap-2 text-[15px] font-bold text-[#111827]">
              {link.label}
              <span
                aria-hidden="true"
                className="text-[#3385FF] transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#3F4E5E]">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
