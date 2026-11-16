export type ReportContact = {
  name: string;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  instagram?: string | null;
  twitter?: string | null;
};

export type ReportStep = {
  title: string;
  description: string;
};

export type ReportInfoCell = {
  label: string;
  value: string;
};

export type ReportSection = {
  title: string;
  /** HTML yang sudah di-escape oleh helper di modul ini. */
  html: string;
};

export type ReportSignature = {
  label: string;
  value: string;
  note?: string;
};

export type ReportHero = {
  label: string;
  value: string;
  /** Teks kecil setelah value, mis. "/ 100". */
  valueSuffix?: string;
  caption?: string;
  chips?: ReportInfoCell[];
};

export type ReportDocumentOptions = {
  windowTitle: string;
  documentCode: string;
  kicker: string;
  heading: string;
  subtitle: string;
  hero?: ReportHero;
  info?: ReportInfoCell[];
  leadHtml?: string;
  sections: ReportSection[];
  noticeHtml?: string;
  closing?: string;
  signatureLeft?: ReportSignature;
  signatureRight?: ReportSignature;
  footerLeft?: string;
  footerRight?: string;
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildParagraphHtml(text: string) {
  return `<p class="summary">${escapeHtml(text)}</p>`;
}

const pad = (index: number) => String(index + 1).padStart(2, "0");

export function buildListHtml(items: string[]) {
  return items
    .map(
      (item, index) => `
        <li class="step">
          <span class="step-number">${pad(index)}</span>
          <p class="step-desc">${escapeHtml(item)}</p>
        </li>`,
    )
    .join("");
}

export function buildStepsHtml(steps: ReportStep[]) {
  return steps
    .map(
      (step, index) => `
        <li class="step">
          <span class="step-number">${pad(index)}</span>
          <div class="step-body">
            <p class="step-title">${escapeHtml(step.title)}</p>
            <p class="step-desc">${escapeHtml(step.description)}</p>
          </div>
        </li>`,
    )
    .join("");
}

export function buildContactsHtml(contacts: ReportContact[]) {
  return contacts
    .map((item) => {
      const details: string[] = [];
      if (item.phone) details.push(`Telp. ${escapeHtml(item.phone)}`);
      if (item.whatsapp) details.push(`WhatsApp ${escapeHtml(item.whatsapp)}`);
      if (item.email) details.push(escapeHtml(item.email));
      if (item.instagram) details.push(escapeHtml(item.instagram));
      if (item.twitter) details.push(escapeHtml(item.twitter));

      return `
        <li class="contact">
          <p class="contact-name">${escapeHtml(item.name)}</p>
          <p class="contact-detail">${details.join(" &middot; ")}</p>
        </li>`;
    })
    .join("");
}

/** Ambil daftar kontak dari response API (multi-bank atau satu bank). */
export function resolveContacts(
  primary?: ReportContact | null,
  list?: ReportContact[] | null,
): ReportContact[] {
  const source = list?.length ? list : primary ? [primary] : [];
  return source.filter((item): item is ReportContact =>
    Boolean(item && item.name),
  );
}

/**
 * Gaya editorial minimal: tanpa kartu berwarna, hanya garis rambut dan satu
 * aksen biru yang dipakai tipis-tipis di judul bagian dan nomor langkah.
 */
const REPORT_CSS = `
  @page { size: A4; margin: 15mm 16mm 16mm; }
  :root {
    --blue: #2B5E8C;
    --ink: #1B2A3B;
    --body: #3D4C5C;
    --muted: #5D6E7E;
    --faint: #8C9BAA;
    --line: #DDE6EF;
    --line-soft: #EAF0F6;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    font-size: 10.2pt;
    line-height: 1.6;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .doc { max-width: 780px; margin: 0 auto; }
  .top-rule { height: 3px; background: var(--blue); }

  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-top: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
  .brand { display: flex; align-items: center; gap: 9px; }
  .logo { width: 32px; height: 32px; object-fit: contain; }
  .brand-name { font-size: 13.5pt; font-weight: 800; letter-spacing: -0.3px; color: var(--ink); margin: 0; line-height: 1.1; }
  .brand-name span { color: var(--blue); }
  .brand-tag { font-size: 6.2pt; letter-spacing: 1.5px; text-transform: uppercase; color: var(--faint); margin: 3px 0 0; font-weight: 600; }
  .meta { text-align: right; }
  .meta-label { font-size: 6.2pt; letter-spacing: 1.4px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 600; }
  .meta-code { font-family: "SFMono-Regular", Consolas, "Courier New", monospace; font-size: 8pt; font-weight: 600; color: var(--muted); margin: 3px 0 0; }
  .meta-note { font-size: 6.2pt; letter-spacing: 1.1px; text-transform: uppercase; color: var(--faint); margin: 5px 0 0; }

  .title { margin-top: 24px; }
  .kicker { font-size: 6.8pt; letter-spacing: 2px; text-transform: uppercase; color: var(--blue); margin: 0; font-weight: 700; }
  h1 { font-size: 21pt; line-height: 1.24; letter-spacing: -0.5px; color: var(--ink); margin: 8px 0 6px; font-weight: 700; }
  .sub { font-size: 9.6pt; color: var(--muted); margin: 0; }

  .score { display: flex; align-items: flex-end; gap: 26px; margin-top: 20px; padding: 15px 0 14px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); page-break-inside: avoid; }
  .score-main { min-width: 150px; }
  .score-label { font-size: 6.6pt; letter-spacing: 1.3px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .score-value { font-size: 32pt; line-height: 1; font-weight: 700; letter-spacing: -1.4px; color: var(--ink); margin: 5px 0 0; font-variant-numeric: tabular-nums; }
  .score-value small { font-size: 9.6pt; font-weight: 500; letter-spacing: 0; color: var(--muted); margin-left: 5px; }
  .score-value--text { font-size: 18pt; letter-spacing: -0.3px; }
  .score-caption { font-size: 8.2pt; color: var(--muted); margin: 6px 0 0; }
  .score-meta { display: flex; flex-wrap: wrap; gap: 0 30px; padding-bottom: 2px; }
  .pair { max-width: 220px; }
  .pair + .pair { padding-left: 30px; border-left: 1px solid var(--line-soft); }
  .pair-label { font-size: 6.4pt; letter-spacing: 1.2px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .pair-value { font-size: 8.8pt; font-weight: 600; color: var(--ink); margin: 4px 0 0; }

  .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 26px; margin-top: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
  .fact-label { font-size: 6.4pt; letter-spacing: 1.2px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .fact-value { font-size: 8.8pt; font-weight: 600; color: var(--ink); margin: 4px 0 0; }

  section { margin-top: 22px; page-break-inside: avoid; }
  h2 { font-size: 7.4pt; letter-spacing: 1.6px; text-transform: uppercase; color: var(--blue); margin: 0 0 9px; padding-bottom: 6px; border-bottom: 1px solid var(--line-soft); font-weight: 700; }

  .lead { font-size: 9.8pt; color: var(--muted); margin: 16px 0 0; }
  .summary { margin: 0; font-size: 10pt; color: var(--body); white-space: pre-line; }

  ol.steps, ul.contacts { list-style: none; margin: 0; padding: 0; }
  ol.steps { display: grid; gap: 11px; }
  .step { display: flex; gap: 12px; align-items: flex-start; }
  .step-number { flex: 0 0 17px; font-family: "SFMono-Regular", Consolas, "Courier New", monospace; font-size: 8.4pt; font-weight: 600; color: var(--blue); padding-top: 1px; font-variant-numeric: tabular-nums; }
  .step-body { min-width: 0; }
  .step-title { font-size: 9pt; font-weight: 700; color: var(--ink); margin: 0; }
  .step-desc { font-size: 9.8pt; color: var(--body); margin: 0; }
  .step-title + .step-desc { margin-top: 2px; }

  ul.contacts { display: grid; }
  .contact { padding: 8px 0; border-bottom: 1px solid var(--line-soft); }
  .contact:last-child { border-bottom: none; padding-bottom: 0; }
  .contact-name { font-size: 8.8pt; font-weight: 700; color: var(--ink); margin: 0; }
  .contact-detail { font-size: 8.8pt; color: var(--muted); margin: 2px 0 0; }

  .notice { margin-top: 20px; padding-left: 12px; border-left: 2px solid var(--line); color: var(--muted); font-size: 8.6pt; page-break-inside: avoid; }
  .notice strong { color: var(--ink); font-weight: 600; }

  .closing { margin-top: 20px; font-size: 9.8pt; color: var(--body); }

  .sign { display: flex; justify-content: space-between; gap: 40px; margin-top: 30px; page-break-inside: avoid; }
  .sign-col { width: 46%; }
  .sign-label { font-size: 6.6pt; letter-spacing: 1.2px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .sign-name { display: inline-block; min-width: 160px; margin: 38px 0 0; padding-top: 5px; border-top: 1px solid #C3D1DF; font-size: 9.6pt; font-weight: 600; color: var(--ink); }
  .sign-note { font-size: 6.6pt; color: var(--faint); margin: 4px 0 0; }
  .sign-col--right { text-align: right; }
  .sign-col--right .sign-name { min-width: 144px; }

  .foot { display: flex; justify-content: space-between; gap: 16px; margin-top: 26px; padding-top: 8px; border-top: 1px solid var(--line); font-size: 6.6pt; color: var(--faint); }
  a { color: inherit; text-decoration: none; }

  @media print {
    body { background: #fff; }
    .doc { max-width: none; }
  }
`;

function renderSignature(
  left?: ReportSignature,
  right?: ReportSignature,
): string {
  if (!left && !right) return "";

  const column = (data: ReportSignature | undefined, modifier: string) =>
    data
      ? `<div class="sign-col${modifier}">
        <p class="sign-label">${escapeHtml(data.label)}</p>
        <p class="sign-name">${escapeHtml(data.value)}</p>
        ${data.note ? `<p class="sign-note">${escapeHtml(data.note)}</p>` : ""}
      </div>`
      : "";

  return `<div class="sign">
      ${column(left, "")}
      ${column(right, " sign-col--right")}
    </div>`;
}

function renderHero(hero?: ReportHero): string {
  if (!hero) return "";

  const meta = hero.chips?.length
    ? `<div class="score-meta">${hero.chips
        .map(
          (chip) => `<div class="pair">
            <p class="pair-label">${escapeHtml(chip.label)}</p>
            <p class="pair-value">${escapeHtml(chip.value)}</p>
          </div>`,
        )
        .join("")}</div>`
    : "";

  const valueClass = hero.valueSuffix ? "score-value" : "score-value score-value--text";

  return `<div class="score">
      <div class="score-main">
        <p class="score-label">${escapeHtml(hero.label)}</p>
        <p class="${valueClass}">${escapeHtml(hero.value)}${
          hero.valueSuffix ? `<small>${escapeHtml(hero.valueSuffix)}</small>` : ""
        }</p>
        ${hero.caption ? `<p class="score-caption">${escapeHtml(hero.caption)}</p>` : ""}
      </div>
      ${meta}
    </div>`;
}

function renderFacts(info?: ReportInfoCell[]): string {
  if (!info?.length) return "";

  return `<div class="facts">${info
    .map(
      (cell) => `<div class="fact">
        <p class="fact-label">${escapeHtml(cell.label)}</p>
        <p class="fact-value">${escapeHtml(cell.value)}</p>
      </div>`,
    )
    .join("")}</div>`;
}

export function renderReportDocument(options: ReportDocumentOptions): string {
  const sectionsHtml = options.sections
    .filter((section) => section.html.trim().length > 0)
    .map(
      (section) => `<section>
      <h2>${escapeHtml(section.title)}</h2>
      ${section.html}
    </section>`,
    )
    .join("\n\n    ");

  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(options.windowTitle)}</title>
<style>${REPORT_CSS}</style>
</head>
<body>
  <main class="doc">
    <div class="top-rule"></div>

    <header class="head">
      <div class="brand">
        <img class="logo" src="${escapeHtml(`${window.location.origin}/logo2.png`)}" alt="Logo CegahScam" />
        <div>
          <p class="brand-name">Cegah<span>Scam</span></p>
          <p class="brand-tag">Platform Perlindungan Digital</p>
        </div>
      </div>
      <div class="meta">
        <p class="meta-label">Nomor Dokumen</p>
        <p class="meta-code">${escapeHtml(options.documentCode)}</p>
        <p class="meta-note">Dokumen Pribadi &middot; Terbatas</p>
      </div>
    </header>

    <div class="title">
      <p class="kicker">${escapeHtml(options.kicker)}</p>
      <h1>${escapeHtml(options.heading)}</h1>
      <p class="sub">${escapeHtml(options.subtitle)}</p>
    </div>

    ${renderHero(options.hero)}
    ${renderFacts(options.info)}

    ${options.leadHtml ? `<p class="lead">${options.leadHtml}</p>` : ""}

    ${sectionsHtml}

    ${options.noticeHtml ? `<div class="notice">${options.noticeHtml}</div>` : ""}

    ${options.closing ? `<p class="closing">${escapeHtml(options.closing)}</p>` : ""}

    ${renderSignature(options.signatureLeft, options.signatureRight)}

    <footer class="foot">
      <span>${options.footerLeft ?? "<strong>CegahScam</strong> &middot; Kenali. Pahami. Hadapi."}</span>
      <span>${options.footerRight ?? `Dokumen dibuat otomatis oleh sistem &middot; ${escapeHtml(options.documentCode)}`}</span>
    </footer>
  </main>
</body>
</html>`;
}

/**
 * Buka dokumen di tab baru lalu tampilkan dialog cetak (Save as PDF).
 * Tidak ada data yang dikirim ke server.
 */
export function printReportDocument(options: ReportDocumentOptions): void {
  const html = renderReportDocument(options);
  const printWindow = window.open("", "_blank", "width=900,height=1000");

  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();

  // Pastikan logo selesai dimuat sebelum dialog cetak dibuka.
  let printed = false;
  const triggerPrint = () => {
    if (printed) return;
    printed = true;
    window.setTimeout(() => printWindow.print(), 150);
  };

  const logo = printWindow.document.querySelector("img");
  if (logo && !logo.complete) {
    logo.addEventListener("load", triggerPrint, { once: true });
    logo.addEventListener("error", triggerPrint, { once: true });
    window.setTimeout(triggerPrint, 1500);
  } else {
    triggerPrint();
  }
}
