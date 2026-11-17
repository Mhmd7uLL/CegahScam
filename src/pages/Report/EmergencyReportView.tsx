import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BackLink from "../../components/BackLink";
import EmergencyHook from "../../components/EmergencyHook";
import Robot from "../../components/Robot";
import robotChat from "../../assets/Emergency/robot1.webp";
import robotMagnifier from "../../assets/Emergency/robot2.webp";
import {
  buildDetailsHtml,
  buildParagraphHtml,
  escapeHtml,
  printReportDocument,
} from "../../lib/reportDocument";
import type { ReportDetailRow } from "../../lib/reportDocument";

type ActionStep = {
  title: string;
  description: string;
};

type OfficialContact = {
  name: string;
  phone?: string;
  whatsapp?: string | null;
  email?: string | null;
  instagram?: string | null;
  twitter?: string | null;
};

type BankContact = {
  name: string;
  phone?: string;
  whatsapp?: string | null;
};

type EmergencyResult = {
  ai_kronologi?: string;
  langkah_penanganan?: ActionStep[];
  official_contact?: OfficialContact | null;
  official_contacts?: OfficialContact[] | null;
  bank?: BankContact | string | null;
  bank_analysis?: BankContact | null;
  bank_contact?: BankContact | null;
  nama_bank?: string;
  bank_korban?: string;
  bank_name?: string;
  bank_phone?: string;
  bank_whatsapp?: string | null;
  emergencyResponse?: string;
  result?: EmergencyResult;
  data?: EmergencyResult;
};

type ReportKind = "data" | "financial";

/** Isian formulir yang ikut dikirim bersama hasil analisis. */
type EmergencyReportForm = {
  jenisData?: string[];
  tanggalKejadian?: string;
  kanalMedia?: string;
  tindakanPelaku?: string[];
  statusAkses?: string;
  jenisBank?: string;
  tujuanTransaksi?: string[];
  namaInstitusi?: string;
  nomorRekening?: string;
  namaPemilikRekening?: string;
  nominalKerugian?: string;
  bukti?: string;
};

const KANAL_LABEL: Record<string, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
};

const JENIS_DATA_LABEL: Record<string, string> = {
  "data-pribadi": "Data pribadi (nama, email, nomor telepon)",
  "media-sosial": "Akun media sosial",
  perbankan: "Akun perbankan / finansial",
  kartu: "Data kartu kredit / debit",
  email: "Akun email",
};

const TINDAKAN_PELAKU_LABEL: Record<string, string> = {
  link: "Mengirim tautan mencurigakan",
  "data-pribadi": "Meminta data pribadi",
  otp: "Meminta OTP / PIN / kata sandi",
  menyamar: "Mengaku sebagai pihak tertentu",
};

const STATUS_AKSES_LABEL: Record<string, string> = {
  bisaAkses: "Masih bisa diakses",
  tidakBisaAkses: "Tidak bisa diakses",
  diketahuiLain: "Diketahui pihak lain",
  tidakTahu: "Tidak tahu",
};

const BANK_LABEL: Record<string, string> = {
  bca: "BCA",
  bri: "BRI",
  bni: "BNI",
  mandiri: "Mandiri",
  dana: "DANA",
  ovo: "OVO",
  gopay: "GoPay",
};

const TUJUAN_TRANSAKSI_LABEL: Record<string, string> = {
  link: "Pembelian barang/jasa",
  "data-pribadi": "Biaya administrasi",
  otp: "Hadiah/promo",
  menyamar: "Pinjaman",
};

function formatReportDate(value?: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
    new Date(year, month - 1, day),
  );
}

function formatRupiah(value?: string) {
  const clean = value?.trim() ?? "";
  const amount = Number(clean);
  if (!clean || Number.isNaN(amount)) return clean;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function joinLabels(
  values: string[] | undefined,
  labels: Record<string, string>,
) {
  return (values ?? [])
    .map((value) => labels[value] ?? value)
    .filter((value) => Boolean(value?.trim()))
    .join(", ");
}

/**
 * Hanya memuat data yang relevan untuk penerima laporan (instansi/bank),
 * bukan seluruh isian formulir.
 */
function buildDetailRows(
  form: EmergencyReportForm | undefined,
  kind: ReportKind,
): ReportDetailRow[] {
  if (!form) return [];

  const rows: ReportDetailRow[] = [];
  const add = (label: string, value?: string) => {
    const clean = value?.trim();
    if (clean) rows.push({ label, value: clean });
  };

  add("Tanggal Kejadian", formatReportDate(form.tanggalKejadian));
  add(
    "Kanal Media",
    form.kanalMedia ? KANAL_LABEL[form.kanalMedia] ?? form.kanalMedia : "",
  );

  if (kind === "data") {
    add("Jenis Data Bocor", joinLabels(form.jenisData, JENIS_DATA_LABEL));
    add("Tindakan Pelaku", joinLabels(form.tindakanPelaku, TINDAKAN_PELAKU_LABEL));
    add(
      "Status Akses Akun",
      form.statusAkses
        ? STATUS_AKSES_LABEL[form.statusAkses] ?? form.statusAkses
        : "",
    );
  } else {
    add("Nominal Kerugian", formatRupiah(form.nominalKerugian));
    add(
      "Bank / Dompet Korban",
      form.jenisBank ? BANK_LABEL[form.jenisBank] ?? form.jenisBank : "",
    );
    add(
      "Tujuan Transaksi",
      joinLabels(form.tujuanTransaksi, TUJUAN_TRANSAKSI_LABEL),
    );
    add("Institusi yang Mengaku", form.namaInstitusi);
    add("No. Rekening Tujuan", form.nomorRekening);
    add("Nama Pemilik Rekening", form.namaPemilikRekening);
  }

  add("Lampiran Bukti", form.bukti);
  return rows;
}

type ReportCopy = {
  label: string;
  intro: string;
  summary: string;
  steps: ActionStep[];
  contact: OfficialContact;
  contactNote: string;
  formPath: string;
  mascot: string;
  speech: string;
};

const REPORT_COPY: Record<ReportKind, ReportCopy> = {
  data: {
    label: "Kebocoran Data",
    intro:
      "Ringkasan, langkah penanganan, dan kontak rujukan telah disusun berdasarkan bukti yang disampaikan pelapor. Panduan penanganan dan kontak rujukan tersedia di halaman ini, sedangkan berkas PDF berisi surat laporan yang siap dikirimkan kepada pihak berwenang.",
    summary:
      "Pelapor menyampaikan dugaan kebocoran data pribadi. Kronologi dirangkum berdasarkan bukti percakapan yang diunggah tanpa mengubah urutan kejadian. Pelapor disarankan segera mengamankan akun yang terdampak dan menghubungi kanal resmi terkait.",
    steps: [
      {
        title: "Keluar dari Semua Perangkat",
        description:
          'Buka pengaturan keamanan di aplikasi yang terdampak (WhatsApp/Instagram/Email), lalu pilih opsi "Keluar dari semua perangkat" atau "Logout dari semua sesi".',
      },
      {
        title: "Ganti Password Utama & Aktifkan 2FA",
        description:
          "Ubah password email utama, lalu aktifkan autentikasi dua faktor (2FA) memakai aplikasi authenticator, bukan hanya SMS.",
      },
      {
        title: "Beri Peringatan ke Kerabat & Laporkan Akun",
        description:
          "Informasikan ke keluarga dan kontak terdekat bahwa akunmu diretas, supaya tidak ada yang tertipu pinjaman atau permintaan uang atas namamu.",
      },
    ],
    contact: {
      name: "Kementerian Komunikasi dan Digital (Komdigi)",
      phone: "159",
    },
    contactNote:
      "Pastikan hanya menghubungi kanal resmi. Jangan pernah mengirimkan OTP atau kata sandi kepada pihak mana pun.",
    formPath: "/emergency/data",
    mascot: robotMagnifier,
    speech: "Aku sudah periksa laporanmu!",
  },
  financial: {
    label: "Penipuan Finansial",
    intro:
      "Ringkasan, langkah penanganan, dan kontak rujukan telah disusun berdasarkan bukti yang disampaikan pelapor. Panduan penanganan dan kontak rujukan tersedia di halaman ini, sedangkan berkas PDF berisi surat laporan yang siap dikirimkan kepada pihak berwenang.",
    summary:
      "Pelapor menyampaikan dugaan penipuan finansial. Kronologi dirangkum berdasarkan bukti transaksi dan percakapan yang diunggah tanpa mengubah urutan kejadian. Pelapor disarankan segera mengamankan rekening dan menghubungi bank atau kanal resmi terkait.",
    steps: [
      {
        title: "Hubungi Call Center Bank Pengirim",
        description:
          "Telepon customer service resmi bank kamu sekarang untuk meminta penguncian sementara rekening penipu dan mengamankan akun pribadimu.",
      },
      {
        title: "Amankan Akses M-Banking & PIN",
        description:
          "Ganti PIN M-Banking, password internet banking, dan PIN ATM dari perangkat yang aman. Jangan memakai password yang sama dengan akun lain.",
      },
      {
        title: "Bawa Draf Laporan ke Kepolisian & Portal Resmi",
        description:
          "Simpan laporan ini sebagai PDF, lalu lampirkan saat membuat Laporan Polisi (STPL) di Polsek/Polres atau saat melapor ke CekRekening.id.",
      },
    ],
    contact: {
      name: "Kontak bank belum tersedia dari hasil analisis",
    },
    contactNote:
      "Gunakan kanal resmi bank yang dianalisis. Jangan pernah mengirimkan OTP atau PIN kepada pihak mana pun.",
    formPath: "/emergency/financial",
    mascot: robotChat,
    speech: "Tenang, aku bantu rapikan!",
  },
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function toWaNumber(value: string) {
  const digits = onlyDigits(value);
  return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
}

function instagramUrl(value: string) {
  const handle = value.trim().replace(/^@/, "").replace(/\s+/g, "");
  return handle ? `https://instagram.com/${handle}` : undefined;
}

function twitterHandles(value: string) {
  return value
    .split("/")
    .map((item) => item.trim().replace(/^@/, "").replace(/\s+/g, ""))
    .filter(Boolean);
}

function formalizeReportText(value: string) {
  return value
    .replace(/\bpelapor\b/gi, "saya")
    .replace(/\bkamu\b/gi, "saya")
    .replace(/\bAnda\b/g, "saya");
}

function getReportSummary(
  value: string | undefined,
  fallback: string,
) {
  if (!value || /\[mock mode\]/i.test(value)) {
    return formalizeReportText(fallback);
  }

  return formalizeReportText(value);
}

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

type EmergencyReportViewProps = {
  kind: ReportKind;
};

export default function EmergencyReportView({ kind }: EmergencyReportViewProps) {
  const copy = REPORT_COPY[kind];
  const location = useLocation();
  const response = location.state?.result as EmergencyResult | undefined;
  const form = location.state?.form as EmergencyReportForm | undefined;
  const data = response?.result ?? response?.data ?? response;
  const detailRows = buildDetailRows(form, kind);

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  useEffect(() => {
    document.title = `Laporan ${copy.label} - CegahScam`;
  }, [copy.label]);

  const summary = getReportSummary(
    data?.ai_kronologi || data?.emergencyResponse,
    copy.summary,
  );
  const steps = data?.langkah_penanganan?.length
    ? data.langkah_penanganan
    : copy.steps;
  const analyzedBankContact =
    data?.bank_analysis ??
    data?.bank_contact ??
    (typeof data?.bank === "object" ? data.bank : null) ??
    (data?.bank_name
      ? {
          name: data.bank_name,
          phone: data.bank_phone,
          whatsapp: data.bank_whatsapp,
        }
      : data?.nama_bank || data?.bank_korban
        ? { name: data.nama_bank ?? data.bank_korban! }
        : typeof data?.bank === "string"
          ? { name: data.bank }
          : null) ??
    data?.official_contact;
  const contact =
    kind === "financial"
      ? analyzedBankContact ?? copy.contact
      : data?.official_contact ?? copy.contact;
  const contactPhone = contact.phone?.trim() ?? "";
  const contactList = (
    data?.official_contacts?.length ? data.official_contacts : [contact]
  ).filter((item): item is OfficialContact => Boolean(item && item.name));

  /**
   * Isi surat dipakai bersama oleh template chat dan PDF supaya keduanya
   * identik. Bagian ini hanya memuat hal yang memang ditujukan kepada
   * penerima laporan (rincian, kronologi, permohonan), bukan panduan untuk
   * pelapor.
   */
  const letter = {
    recipient:
      kind === "financial" && analyzedBankContact?.name
        ? `Kepada Yth. ${analyzedBankContact.name},`
        : "Kepada Yth. Pihak yang Berwenang,",
    opening: `melalui pesan ini saya menyampaikan laporan terkait dugaan ${copy.label.toLowerCase()}. Laporan ini saya susun berdasarkan informasi dan bukti yang saya sampaikan melalui CegahScam.`,
    chronologyLabel: "Berikut kronologi yang saya alami:",
    request:
      "Saya memohon agar laporan ini dapat ditindaklanjuti sesuai prosedur yang berlaku, termasuk pemeriksaan terhadap pihak yang diduga melakukan tindakan tersebut. Bukti pendukung siap saya serahkan apabila diperlukan.",
    closing:
      "Demikian laporan ini saya sampaikan. Atas perhatian dan tindak lanjutnya, saya mengucapkan terima kasih.",
    signOff: "Hormat saya,",
    signer: "Pelapor",
  };

  const message = [
    `*LAPORAN ${copy.label.toUpperCase()}*`,
    "",
    letter.recipient,
    "",
    "Dengan hormat,",
    letter.opening,
    "",
    ...(detailRows.length
      ? [
          "Rincian kejadian:",
          ...detailRows.map((row) => `- ${row.label}: ${row.value}`),
          "",
        ]
      : []),
    letter.chronologyLabel,
    summary,
    "",
    letter.request,
    "",
    letter.closing,
    "",
    letter.signOff,
    letter.signer,
  ].join("\n");

  const contactDigits = onlyDigits(contact.whatsapp || contactPhone);
  const contactIsChat = contactDigits.length >= 8;
  const contactLink = contactDigits
    ? contactIsChat
      ? `https://wa.me/${toWaNumber(contactDigits)}?text=${encodeURIComponent(message)}`
      : `tel:${contactDigits}`
    : undefined;
  const shareLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

  async function handleCopy() {
    setCopyError("");
    try {
      await writeToClipboard(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError("Teks gagal disalin. Blok teks di bawah lalu salin manual.");
    }
  }

  function handleDownloadPdf() {
    const now = new Date();
    const generatedDate = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
    }).format(now);
    const reportCode = `CS-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${kind.toUpperCase()}`;

    printReportDocument({
      windowTitle: `Laporan ${copy.label} - CegahScam`,
      documentCode: reportCode,
      kicker: "Laporan Darurat",
      heading: `Laporan Dugaan ${copy.label}`,
      subtitle:
        "Disusun berdasarkan informasi dan bukti digital yang disampaikan pelapor melalui platform CegahScam.",
      hero: {
        label: "Jenis Laporan",
        value: copy.label,
        caption: "Siap disampaikan kepada pihak berwenang",
        chips: [
          { label: "Dibuat", value: generatedDate },
          { label: "Status", value: "Diajukan" },
        ],
      },
      leadHtml: `${escapeHtml(letter.recipient)}<br />Dengan hormat,<br /><br />${escapeHtml(
        letter.opening,
      )}`,
      sections: [
        ...(detailRows.length
          ? [
              {
                title: "Identitas Kejadian",
                html: buildDetailsHtml(detailRows),
              },
            ]
          : []),
        {
          title: "Kronologi Kejadian",
          html: buildParagraphHtml(summary),
        },
        {
          title: "Permohonan Tindak Lanjut",
          html: buildParagraphHtml(letter.request),
        },
      ],
      noticeHtml: `<strong>Catatan:</strong> Dokumen ini dihasilkan otomatis oleh CegahScam berdasarkan keterangan pelapor dan belum diverifikasi oleh pihak berwenang.`,
      closing: letter.closing,
      signatureLeft: {
        label: "Disusun oleh",
        value: letter.signer,
        note: "Nama & tanda tangan",
      },
      signatureRight: {
        label: "Tanggal",
        value: generatedDate,
        note: reportCode,
      },
      footerLeft: `<strong>CegahScam</strong> &middot; Kenali. Pahami. Hadapi.`,
      footerRight: `Dokumen dibuat otomatis oleh sistem &middot; ${escapeHtml(
        reportCode,
      )}`,
    });
  }

  return (
    <div className="mx-auto w-full pb-20 pt-[88px] sm:pt-24 lg:pt-32">
      <div
        id="hero-section"
        className="relative mx-auto flex w-full max-w-[1160px] flex-col justify-center px-4"
      >
        <div className="z-10 mb-4 sm:absolute sm:left-4 sm:top-0 sm:mb-0">
          <BackLink
            to="/emergency"
            label="Darurat"
            confirmTitle="Tinggalkan laporan ini?"
            confirmMessage={
              data
                ? "Laporan ini tidak disimpan di server dan akan hilang. Demi keamanan data, Anda perlu mengisi ulang laporan dari awal. Unduh PDF terlebih dahulu bila ingin menyimpan hasilnya."
                : undefined
            }
            confirmAction="Ya, tinggalkan"
            cancelAction="Tetap di sini"
          />
        </div>
        <EmergencyHook />
        <div className="mx-auto my-6 flex w-full max-w-[800px] items-center justify-between gap-2 rounded-[24px] bg-white/30 px-3 py-4 shadow-xl sm:gap-4 sm:rounded-[50px] sm:px-8">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#667085] text-[12px] text-white">
              1
            </p>
            <p className="text-[11px] text-[#667085] sm:text-sm">Pilih Kasus</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50" />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#667085] text-[12px] text-white">
              2
            </p>
            <p className="text-[11px] text-[#667085] sm:text-sm">Isi Data</p>
          </div>
          <div className="h-px flex-1 bg-[#667085]/50" />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5E83A5] text-[12px] text-white">
              3
            </p>
            <p className="text-[11px] font-bold text-[#5E83A5] sm:text-sm">
              Hasil Laporan
            </p>
          </div>
        </div>
      </div>

      <div className="reveal mx-auto mt-8 flex w-full max-w-[900px] flex-col gap-5 px-4 lg:mt-10">
        <section className="relative overflow-hidden rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#EAF2FA]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-10 left-52 h-2.5 w-2.5 rounded-full bg-[#F7C873]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-44 top-12 h-2 w-2 rounded-full bg-[#85B6FF] robot-float"
          />

          <div className="relative grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
            <div className="relative mx-auto flex w-full max-w-[260px] flex-col items-center">
              <div
                aria-hidden
                className="absolute bottom-12 h-44 w-44 rounded-full bg-linear-to-br from-[#DCEAF8] to-[#F7FAFD] sm:h-52 sm:w-52"
              />
              <div
                aria-hidden
                className="absolute bottom-8 h-48 w-48 rounded-full border border-dashed border-[#BBD4E9] sm:h-56 sm:w-56"
              />

              <Robot
                src={copy.mascot}
                alt="Maskot CegahScam"
                motion="bob"
                interactive
                className="relative h-44 w-auto object-contain drop-shadow-[0_18px_25px_rgba(82,120,154,0.25)] sm:h-56 lg:h-60"
              />

              <div className="relative -mt-3 rounded-2xl bg-white px-4 py-2 text-center text-[12px] font-semibold text-[#52789A] shadow-lg shadow-[#8FA9C4]/30">
                <span
                  aria-hidden
                  className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white"
                />
                {copy.speech}
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#52789A]">
                {copy.label}
              </p>
              <h1 className="mt-1 text-[22px] font-bold leading-tight text-[#26384A] sm:text-[26px]">
                Laporan {copy.label} sudah siap
              </h1>
              <p className="mt-2 max-w-130 text-[13px] leading-relaxed text-[#5B6B7C] sm:text-[14px]">
                {copy.intro}
              </p>

              <div className="mt-5 rounded-2xl border border-[#E1EAF2] bg-[#F7FAFD] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#52789A]">
                    Ringkasan Laporan
                  </p>
                  <a
                    href={shareLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#25D366] px-3 py-1.5 text-[12px] font-bold text-white shadow-sm transition hover:bg-[#1FB855]"
                  >
                    WhatsApp
                  </a>
                </div>
                <p className="mt-2 max-h-36 overflow-y-auto whitespace-pre-line pr-2 text-[13px] leading-relaxed text-[#5B6B7C] sm:text-sm">
                  {summary}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="rounded-full bg-[#ADCEFF] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#85B6FF]"
                >
                  Unduh PDF
                </button>
              </div>

              {copyError && (
                <p className="mt-3 text-sm text-[#B91C1C]">{copyError}</p>
              )}
            </div>
          </div>
        </section>


        <div className="grid gap-5 lg:grid-cols-2">
          <section className="flex flex-col rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[18px] font-bold text-[#26384A] sm:text-[20px]">
                Template Pesan
              </h2>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-full border border-[#C8D6E3] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#52789A] transition hover:bg-[#EAF2FA]"
              >
                {copied ? "Tersalin!" : "Salin"}
              </button>
            </div>
            <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-2xl bg-[#F3F7FB] p-4 font-sans text-[12px] leading-relaxed text-[#3F4E5E]">
              {message}
            </pre>
          </section>

          <section className="flex flex-col rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
            <h2 className="text-[18px] font-bold text-[#26384A] sm:text-[20px]">
              Kontak Rujukan
            </h2>

            <div className="mt-4 flex flex-1 flex-col gap-4 rounded-2xl border border-[#D7E1EA] p-4">
              <ul className="flex flex-col gap-4">
                {contactList.map((item, index) => {
                  const phone = item.phone?.trim() ?? "";
                  const wa = item.whatsapp?.trim() ?? "";
                  const igUrl = item.instagram ? instagramUrl(item.instagram) : undefined;
                  const handles = item.twitter ? twitterHandles(item.twitter) : [];

                  return (
                    <li
                      key={`${item.name}-${index}`}
                      className="flex flex-col gap-2 border-t border-[#E7EEF6] pt-3 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF2FA] text-sm font-bold text-[#52789A]">
                          {item.name.charAt(0)}
                        </span>
                        <div className="flex min-w-0 flex-col gap-1">
                          <p className="font-bold text-[#26384A]">{item.name}</p>
                          {phone && (
                            <a
                              href={`tel:${onlyDigits(phone)}`}
                              className="text-[13px] font-semibold text-[#52789A] hover:underline"
                            >
                              {phone}
                            </a>
                          )}
                          {wa && (
                            <a
                              href={`https://wa.me/${toWaNumber(wa)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[13px] font-semibold text-[#1F7A53] hover:underline"
                            >
                              WhatsApp: {wa}
                            </a>
                          )}
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              className="break-words text-[13px] text-[#52789A] hover:underline"
                            >
                              {item.email}
                            </a>
                          )}
                          {igUrl && (
                            <a
                              href={igUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[13px] text-[#52789A] hover:underline"
                            >
                              {item.instagram}
                            </a>
                          )}
                          {handles.length > 0 && (
                            <span className="flex flex-wrap gap-x-2 gap-y-1 text-[13px] text-[#52789A]">
                              {handles.map((handle) => (
                                <a
                                  key={handle}
                                  href={`https://x.com/${handle}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:underline"
                                >
                                  @{handle}
                                </a>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {contactLink && (
                <a
                  href={contactLink}
                  target={contactIsChat ? "_blank" : undefined}
                  rel="noreferrer"
                  className="mt-auto rounded-full bg-[#5E83A5] px-4 py-2 text-center text-[13px] font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#4D7090]"
                >
                  Hubungi
                </a>
              )}
            </div>

            <p className="mt-3 text-[12px] leading-relaxed text-[#98A2B3]">
              {copy.contactNote}
            </p>
          </section>
        </div>

        <section className="rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
          <h2 className="text-[18px] font-bold text-[#26384A] sm:text-[20px]">
            Langkah Penanganan
          </h2>

          <ol className="mt-4 flex flex-col gap-5">
            {steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#52789A] text-[12px] font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-bold text-[#26384A]">{step.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#5B6B7C]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="flex flex-col items-start justify-between gap-3 rounded-4xl bg-white/60 p-5 text-[13px] text-[#5B6B7C] sm:flex-row sm:items-center">
          <p>Data laporan tidak cocok? Kamu bisa memperbaiki isian dari awal.</p>
          <Link
            to={copy.formPath}
            className="rounded-full bg-white px-4 py-2 font-bold text-[#5E83A5] shadow-md transition hover:-translate-y-0.5 hover:bg-[#5E83A5] hover:text-white"
          >
            Perbaiki Laporan
          </Link>
        </div>
      </div>
    </div>
  );
}
