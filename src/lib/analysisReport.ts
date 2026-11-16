import {
  buildContactsHtml,
  buildListHtml,
  buildParagraphHtml,
  escapeHtml,
  printReportDocument,
  resolveContacts,
} from "./reportDocument";
import type { ReportContact } from "./reportDocument";

export { resolveContacts };
export type { ReportContact };

export type AnalysisReportKind = "telepon" | "chat" | "screenshot";

export type AnalysisReportInput = {
  kind: AnalysisReportKind;
  /** Contoh: "Nomor Telepon", "Pesan Chat", "Screenshot". */
  label: string;
  score: number;
  /** Contoh: "Risiko Sangat Tinggi". */
  levelLabel: string;
  scamType?: string | null;
  /** Ringkasan singkat (opsional). */
  summary?: string;
  reasons: string[];
  recommendations: string[];
  subjectLabel?: string;
  subject?: string;
  contacts: ReportContact[];
};

const DOCUMENT_CODE: Record<AnalysisReportKind, string> = {
  telepon: "TELEPON",
  chat: "CHAT",
  screenshot: "SCREENSHOT",
};

function truncate(value: string, max = 1600) {
  const clean = value.trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

/**
 * Unduh hasil analisis sebagai PDF (dibuat di browser, tanpa menyimpan ke
 * database) supaya pengguna punya arsip dan tidak perlu mengulang analisis.
 */
export function downloadAnalysisReport(input: AnalysisReportInput): void {
  const now = new Date();
  const generatedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(now);
  const documentCode = `CS-${now
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "")}-${DOCUMENT_CODE[input.kind]}`;

  const contactsHtml = buildContactsHtml(input.contacts);
  const subject = input.subject?.trim();

  const sections: { title: string; html: string }[] = [];

  if (subject) {
    sections.push({
      title: input.subjectLabel ?? "Konteks yang Dianalisis",
      html: buildParagraphHtml(truncate(subject)),
    });
  }

  if (input.summary?.trim()) {
    sections.push({
      title: "Ringkasan Penilaian",
      html: buildParagraphHtml(input.summary),
    });
  }

  if (input.reasons.length > 0) {
    sections.push({
      title: "Alasan Penilaian",
      html: `<ol class="steps">${buildListHtml(input.reasons)}</ol>`,
    });
  }

  if (input.recommendations.length > 0) {
    sections.push({
      title: "Rekomendasi Tindakan",
      html: `<ol class="steps">${buildListHtml(input.recommendations)}</ol>`,
    });
  }

  if (contactsHtml) {
    sections.push({
      title: "Kontak Rujukan Resmi",
      html: `<ul class="contacts">${contactsHtml}</ul>`,
    });
  }

  printReportDocument({
    windowTitle: `Hasil Analisis ${input.label} - CegahScam`,
    documentCode,
    kicker: "Hasil Analisis",
    heading: `Hasil Analisis ${input.label}`,
    subtitle:
      "Ringkasan penilaian otomatis CegahScam berdasarkan bukti yang Anda kirimkan melalui platform.",
    hero: {
      label: "Skor Risiko",
      value: String(input.score),
      valueSuffix: "/ 100",
      chips: [
        { label: "Kategori", value: input.levelLabel },
        {
          label: "Jenis Penipuan",
          value: input.scamType?.trim() || "Tidak teridentifikasi",
        },
      ],
    },
    info: [
      { label: "Jenis Analisis", value: input.label },
      { label: "Tanggal Analisis", value: generatedDate },
      { label: "Metode", value: "Analisis otomatis" },
    ],
    leadHtml: `Arsip hasil analisis CegahScam. Simpan dokumen ini agar Anda tidak perlu mengulang analisis dan tetap punya catatan detailnya.`,
    sections,
    noticeHtml: `<strong>Catatan:</strong> Hasil analisis bersifat indikatif dan bukan keputusan hukum. Jangan pernah membagikan kode OTP, PIN, atau kata sandi kepada pihak mana pun, termasuk yang mengaku petugas resmi.`,
    footerLeft: `<strong>CegahScam</strong> &middot; Kenali. Pahami. Hadapi.`,
    footerRight: `Dokumen dibuat otomatis oleh sistem &middot; ${escapeHtml(documentCode)}`,
  });
}
