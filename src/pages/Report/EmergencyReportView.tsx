import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EmergencyHook from "../../components/EmergencyHook";
import Robot from "../../components/Robot";
import checklist from "../../assets/Icon/Checkboxes.svg";
import robotInfo from "../../assets/Emergency/robotInfo.webp";

type ActionStep = {
  title: string;
  description: string;
};

type OfficialContact = {
  name: string;
  phone?: string;
  whatsapp?: string | null;
};

type EmergencyResult = {
  ai_kronologi?: string;
  langkah_penanganan?: ActionStep[];
  official_contact?: OfficialContact | null;
  emergencyResponse?: string;
};

type ReportKind = "data" | "financial";

type ReportCopy = {
  label: string;
  intro: string;
  summary: string;
  steps: ActionStep[];
  contact: OfficialContact;
  contactNote: string;
  formPath: string;
};

const REPORT_COPY: Record<ReportKind, ReportCopy> = {
  data: {
    label: "Kebocoran Data",
    intro:
      "Ringkasan, langkah penanganan, dan kontak rujukan sudah disusun AI berdasarkan bukti yang kamu kirim. Gunakan tombol di bawah untuk menyalin, menyimpan, atau meneruskan laporan ini.",
    summary:
      "Kamu melaporkan dugaan kebocoran data pribadi. AI sudah menyusun kronologi berdasarkan bukti percakapan yang kamu unggah tanpa mengubah urutan kejadian aslinya. Segera amankan akun yang terdampak dan hubungi kanal resmi yang disarankan.",
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
      "Kontak rujukan ini disarankan AI. Pastikan kamu hanya menghubungi kanal resmi, dan jangan pernah mengirim OTP atau password.",
    formPath: "/emergency/data",
  },
  financial: {
    label: "Penipuan Finansial",
    intro:
      "Ringkasan, langkah penanganan, dan kontak rujukan sudah disusun AI berdasarkan bukti yang kamu kirim. Gunakan tombol di bawah untuk menyalin, menyimpan, atau meneruskan laporan ini.",
    summary:
      "Kamu melaporkan dugaan penipuan finansial. AI sudah menyusun kronologi berdasarkan bukti transaksi dan percakapan yang kamu unggah tanpa mengubah urutan kejadian aslinya. Segera amankan rekening dan hubungi bank atau kanal resmi yang disarankan.",
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
      name: "Otoritas Jasa Keuangan (OJK)",
      phone: "157",
    },
    contactNote:
      "Kontak rujukan ini disarankan AI. Pastikan kamu hanya menghubungi kanal resmi bank atau OJK, dan jangan pernah mengirim OTP atau PIN.",
    formPath: "/emergency/financial",
  },
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
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
  const data = location.state?.result as EmergencyResult | undefined;

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  const summary = data?.ai_kronologi || data?.emergencyResponse || copy.summary;
  const steps = data?.langkah_penanganan?.length
    ? data.langkah_penanganan
    : copy.steps;
  const contact = data?.official_contact || copy.contact;
  const contactPhone = contact.phone?.trim() ?? "";
  const whatsappNumber = onlyDigits(contact.whatsapp || contactPhone);

  const message = [
    `*Laporan Darurat ${copy.label} - CegahScam*`,
    "",
    "Ringkasan:",
    summary,
    "",
    "Langkah penanganan:",
    ...steps.map((step, index) => `${index + 1}. ${step.title} - ${step.description}`),
    "",
    "Kontak rujukan:",
    `${contact.name}${contactPhone ? ` - ${contactPhone}` : ""}`,
    "",
    "Mohon bantuan untuk menindaklanjuti laporan ini. Terima kasih.",
  ].join("\n");

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

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
    const stepsHtml = steps
      .map(
        (step, index) =>
          `<li><strong>${index + 1}. ${escapeHtml(step.title)}</strong><p>${escapeHtml(step.description)}</p></li>`,
      )
      .join("");

    const html = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<title>Laporan Darurat ${escapeHtml(copy.label)} - CegahScam</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #26384A; margin: 40px; line-height: 1.6; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  .muted { color: #667085; font-size: 12px; margin: 0 0 24px; }
  h2 { font-size: 15px; margin: 24px 0 8px; }
  p { margin: 6px 0; font-size: 13px; }
  ol { padding-left: 20px; margin: 0; }
  li { margin-bottom: 12px; font-size: 13px; }
  li p { margin: 2px 0 0; }
  .contact { border: 1px solid #D7E1EA; border-radius: 12px; padding: 12px 16px; }
  .footer { margin-top: 32px; font-size: 11px; color: #98A2B3; border-top: 1px solid #E4EAF0; padding-top: 12px; }
</style>
</head>
<body>
  <h1>Laporan Darurat ${escapeHtml(copy.label)}</h1>
  <p class="muted">Disusun dengan bantuan AI CegahScam</p>

  <h2>Ringkasan</h2>
  <p>${escapeHtml(summary).replaceAll("\n", "<br />")}</p>

  <h2>Langkah Penanganan</h2>
  <ol>${stepsHtml}</ol>

  <h2>Kontak Rujukan</h2>
  <div class="contact">
    <p><strong>${escapeHtml(contact.name)}</strong></p>
    ${contactPhone ? `<p>Telepon: ${escapeHtml(contactPhone)}</p>` : ""}
  </div>
  <p style="font-size: 11px; color: #667085;">${escapeHtml(copy.contactNote)}</p>

  <div class="footer">Dokumen ini dibuat otomatis oleh CegahScam. Simpan sebagai PDF atau cetak untuk dilampirkan saat melapor.</div>
</body>
</html>`;

    const printWindow = window.open("", "_blank", "width=900,height=1000");
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    window.setTimeout(() => printWindow.print(), 300);
  }

  return (
    <div className="mx-auto w-full pb-20 pt-24 lg:pt-36">
      <div
        id="hero-section"
        className="mx-auto flex w-full max-w-[1160px] flex-col justify-center px-4"
      >
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
        <section className="rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2FA]">
              <img src={checklist} alt="" className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center rounded-full bg-[#EAF2FA] px-3 py-1 text-[11px] font-semibold text-[#52789A]">
                Laporan berhasil disusun AI
              </span>
              <h1 className="mt-2 text-[22px] font-bold leading-tight text-[#26384A] sm:text-[26px]">
                Laporan daruratmu sudah siap
              </h1>
              <p className="mt-2 max-w-130 text-[14px] leading-relaxed text-[#5B6B7C]">
                {copy.intro}
              </p>
            </div>

            <Robot
              src={robotInfo}
              alt="Maskot CegahScam"
              motion="bob"
              interactive
              className="hidden h-16 w-auto shrink-0 object-contain sm:block lg:h-20"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full bg-[#5E83A5] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#4D7090]"
            >
              {copied ? "Tersalin!" : "Salin Teks"}
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="rounded-full bg-[#ADCEFF] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#85B6FF]"
            >
              Unduh PDF
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-5 py-2.5 text-center text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#1FB855]"
            >
              Hubungi via WhatsApp
            </a>
          </div>

          {copyError && (
            <p className="mt-3 text-sm text-[#B91C1C]">{copyError}</p>
          )}
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
            <h2 className="text-[18px] font-bold text-[#26384A] sm:text-[20px]">
              Ringkasan Laporan
            </h2>
            <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-[#5B6B7C]">
              {summary}
            </p>
          </section>

          <section className="flex flex-col rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[18px] font-bold text-[#26384A] sm:text-[20px]">
                Template Pesan
              </h2>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-full border border-[#C8D6E3] px-3 py-1.5 text-[12px] font-semibold text-[#52789A] transition hover:bg-[#EAF2FA]"
              >
                {copied ? "Tersalin!" : "Salin"}
              </button>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-[#98A2B3]">
              Kata-kata ini sudah disiapkan. Tinggal salin lalu kirim ke instansi
              atau orang yang kamu percaya.
            </p>
            <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-2xl bg-[#F3F7FB] p-4 font-sans text-[12px] leading-relaxed text-[#3F4E5E]">
              {message}
            </pre>
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

        <section className="rounded-4xl bg-white p-5 shadow-xl shadow-[#8FA9C4]/20 sm:p-7">
          <h2 className="text-[18px] font-bold text-[#26384A] sm:text-[20px]">
            Kontak Rujukan
          </h2>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#D7E1EA] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF2FA] text-sm font-bold text-[#52789A]">
                {contact.name.charAt(0)}
              </span>
              <div>
                <p className="font-bold text-[#26384A]">{contact.name}</p>
                {contactPhone && (
                  <a
                    href={`tel:${onlyDigits(contactPhone)}`}
                    className="text-[13px] font-semibold text-[#52789A] hover:underline"
                  >
                    {contactPhone}
                  </a>
                )}
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-4 py-2 text-center text-[13px] font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#1FB855]"
            >
              Hubungi via WhatsApp
            </a>
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-[#98A2B3]">
            {copy.contactNote}
          </p>
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
