import { Link, useLocation, useNavigate } from "react-router-dom";
import RiskGauge from "../../components/RiskGauge";
import Robot from "../../components/Robot";
import robot from "../../assets/Emergency/robot1.webp";

type RiskLevel = "low" | "medium" | "high";

type RiskInfo = {
  label: string;
  summary: string;
  reasons: string[];
  gaugeColors: [string, string];
  iconBg: string;
  iconColor: string;
};

const RISK_LEVELS: Record<RiskLevel, RiskInfo> = {
  low: {
    label: "Risiko Rendah",
    summary:
      "Nomor yang kamu masukkan memiliki sedikit indikasi mencurigakan, tetapi belum menunjukkan tanda-tanda yang kuat.",
    reasons: [
      "Tidak ditemukan pola kata seperti “menang undian”, “OTP”, atau permintaan data pribadi.",
      "Nomor bukan merupakan kontak kantor resmi yang sering dipakai penipu.",
      "Tidak terdapat indikasi link aneh, atau nomor yang mengarah ke situs mencurigakan atau modus penipuan.",
    ],
    gaugeColors: ["#A5C6FF", "#3385FF"],
    iconBg: "bg-[#FFF7E8]",
    iconColor: "text-[#F0A63A]",
  },
  medium: {
    label: "Risiko Sedang",
    summary:
      "Pesan yang kamu masukkan menunjukkan beberapa ciri khas penipuan. Verifikasi dulu ke pihak resmi sebelum membalas atau mengklik apa pun.",
    reasons: [
      "Ada permintaan data pribadi, kode OTP, atau informasi rekening.",
      "Pesan terasa mendesak dan meminta kamu segera bertindak.",
      "Terdapat tautan yang perlu diperiksa keasliannya sebelum dibuka.",
    ],
    gaugeColors: ["#FBD38D", "#F59E0B"],
    iconBg: "bg-[#FFF3E0]",
    iconColor: "text-[#F08C00]",
  },
  high: {
    label: "Risiko Tinggi",
    summary:
      "Pesan ini sangat mirip dengan modus penipuan. Jangan membalas, jangan klik tautan, dan jangan kirim data atau uang.",
    reasons: [
      "Terdapat permintaan OTP, PIN, password, atau data pribadi yang sensitif.",
      "Pelaku memakai tautan atau nomor tidak resmi untuk mengambil data kamu.",
      "Pesan menggunakan tekanan, ancaman, atau iming-iming hadiah.",
    ],
    gaugeColors: ["#FCA5A5", "#EF4444"],
    iconBg: "bg-[#FEF2F2]",
    iconColor: "text-[#EF4444]",
  },
};
const levelByCategory: Record<string, RiskLevel> = {
  "Tidak Ada Indikasi": "low",
  "Rendah": "low",
  "Sedang": "medium",
  "Tinggi": "high",
  "Sangat Tinggi": "high",
};

const KONTAK = {
  nomor: "0851 2345 6789",
  jam: "Senin – Jumat, 09.00 – 17.00",
};

const CHECKLIST = [
  {
    teks: "Pelajari cara melindungi data pribadi",
    icon: "shield",
  },
  {
    teks: "Gunakan kanal resmi saat menghubungi bank",
    icon: "bank",
  },
  {
    teks: "Ikuti panduan keamanan dari sumber terpercaya",
    icon: "book",
  },
] as const;



type AnalysisResult = {
  risk_score: number;
  risk_category: string;
  scam_type?: string | null;
  reasons: string[];
  recommendations: string[];
  official_contact?: {
    name: string;
    phone?: string;
    whatsapp?: string | null;
  } | null;
  bank?: string | null;
  bank_name?: string | null;
};

export default function ResultChat() {
  const location = useLocation();
  const data = location.state?.result as AnalysisResult | undefined;
  const navigate = useNavigate();

  const skor = data?.risk_score ?? 0;
  const risk = RISK_LEVELS[levelByCategory[data?.risk_category ?? "Tidak Ada Indikasi"] || RISK_LEVELS.low] ?? 'low';
  const ringkasan = data?.reasons?.length ? data.reasons : risk.reasons;
  const alasan = data?.reasons?.length ? data.reasons : risk.reasons;
  const levelName = risk.label.replace("Risiko ", "");
  const rekomendasi = data?.recommendations ?? [];
  const recommendedBank = data?.official_contact?.name ?? data?.bank_name ?? data?.bank;

  return (
    <div className="mx-auto w-full max-w-300 px-4 pb-20 pt-24 sm:px-6 lg:pt-36">
      <div className="reveal grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex items-center justify-center py-3">
            <RiskGauge value={skor} size={290} colors={risk.gaugeColors} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg shadow-[#8FA9C4]/20">
              <p className="text-[13px] font-semibold text-[#446685]">
                Hubungi Kami
              </p>

              <a
                href={`tel:${KONTAK.nomor.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-[13px] font-semibold text-[#26384A] hover:text-[#1E40AF]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FDECEC] text-[#E5484D]">
                  <PhoneIcon className="h-3.5 w-3.5" />
                </span>
                <span className="wrap-break-words">{KONTAK.nomor}</span>
              </a>

              <p className="text-[10px] leading-tight text-[#98A2B3]">
                {KONTAK.jam}
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl bg-[#5A87B8] p-5 text-white shadow-lg shadow-[#5A87B8]/30">
              <p className="text-[13px] font-semibold">Rekomendasi Bank</p>

              <ul className="flex flex-col gap-2.5">
                {recommendedBank ? (
                  <li>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group flex items-center gap-2 text-[12px] font-medium"
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[7px] font-bold text-[#52789A]"
                      >
                        {recommendedBank.slice(0, 3).toUpperCase()}
                      </span>
                      <span className="whitespace-nowrap group-hover:underline">
                        {recommendedBank}
                      </span>
                      <ChevronRightIcon className="ml-auto h-3 w-3 shrink-0 opacity-80" />
                    </a>
                  </li>
                ) : (
                  <li className="text-[12px] leading-relaxed text-white/80">
                    Belum ada rekomendasi bank dari hasil analisis.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <section className="rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
            <div className="flex items-start gap-4">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${risk.iconBg} ${risk.iconColor}`}
              >
                <WarningIcon className="h-6 w-6" />
              </span>

              <div className="flex flex-col gap-2">
                <h2 className="text-[22px] font-bold leading-tight text-[#26384A]">
                  {risk.label}
                </h2>
                <p className="max-w-130 text-[14px] leading-relaxed text-[#5B6B7C]">
                  {ringkasan}
                </p>
              </div>
            </div>
          </section>

          <section className="flex-1 rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
            <h2 className="text-[22px] font-bold leading-tight text-[#26384A]">
              Kenapa Risikonya {levelName}?
            </h2>

            <ul className="mt-6 flex flex-col gap-5">
              {alasan.map((item: string, index: number) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#FFF7E8] text-[11px] font-bold text-[#F0A63A]">
                    {index + 1}
                  </span>
                  <p className="text-[14px] leading-relaxed text-[#5B6B7C]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          
          <section className="flex-1 rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
            <h2 className="text-[22px] font-bold leading-tight text-[#26384A]">
              Rekomendasi
            </h2>

            <ul className="mt-6 flex flex-col gap-5">
              {rekomendasi.map((item: string, index: number) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#FFF7E8] text-[11px] font-bold text-[#F0A63A]">
                    {index + 1}
                  </span>
                  <p className="text-[14px] leading-relaxed text-[#5B6B7C]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-7 rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[20px] font-bold leading-tight text-[#26384A] sm:text-[22px]">
              Apakah kamu sudah menjadi korban?
            </h2>
            <p className="mt-1 text-[14px] leading-relaxed text-[#5B6B7C]">
              Jangan panik. Laporkan sekarang agar bisa segera ditangani.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/emergency/data")}
              className="rounded-full bg-[#5E83A5] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#4D7090]"
            >
              Data saya bocor
            </button>
            <button
              type="button"
              onClick={() => navigate("/emergency/financial")}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#5E83A5] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#5E83A5] hover:text-white"
            >
              Saya kehilangan uang
            </button>
          </div>
        </div>
      </section>

      <div className="mt-7 grid items-center gap-8 rounded-[36px] px-2 py-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="relative flex flex-col items-center sm:flex-row sm:items-start sm:justify-center">
          <Robot
            src={robot}
            alt="Maskot CegahScam"
            motion="sway"
            interactive
            className="order-2 w-45 object-contain drop-shadow-xl sm:order-1 sm:w-52"
          />

          <div className="relative order-1 mb-1 rounded-[26px] bg-linear-to-br from-[#5BA7F2] to-[#3D8FE0] px-5 py-2.5 text-center shadow-lg shadow-[#5BA7F2]/30 sm:order-2 sm:mb-0 sm:mt-6 sm:text-left">
            <p className="whitespace-nowrap text-[17px] font-bold text-white">
              Tetap Waspada, Yo!
            </p>
            <span className="absolute -bottom-1 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-xs bg-[#4B9BE8] sm:-left-1.5 sm:bottom-3 sm:translate-x-0" />
          </div>
        </div>

        <div className="relative rounded-4xl bg-white p-6 shadow-xl shadow-[#8FA9C4]/20">
          <Link
            to="/education"
            aria-label="Pelajari lebih lanjut"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3FF] text-[#3385FF] transition hover:bg-[#3385FF] hover:text-white"
          >
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>

          <ul className="flex flex-col gap-3 pr-10">
            {CHECKLIST.map((item) => (
              <li key={item.teks} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#3385FF]">
                  {item.icon === "shield" && <ShieldIcon className="h-4 w-4" />}
                  {item.icon === "bank" && <BankIcon className="h-4 w-4" />}
                  {item.icon === "book" && <BookIcon className="h-4 w-4" />}
                </span>
                <p className="text-[14px] leading-snug text-[#344054]">
                  {item.teks}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function WarningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function BankIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M5 21V10M9.5 21V10M14.5 21V10M19 21V10" />
      <path d="m12 2 9 5H3l9-5Z" />
    </svg>
  );
}

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
      <path d="M8 7h8M8 11h5" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}
