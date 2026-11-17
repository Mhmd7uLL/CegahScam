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

export type ReportDetailRow = {
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

/** Daftar rincian dua kolom (label nilai) untuk identitas kejadian. */
export function buildDetailsHtml(rows: ReportDetailRow[]) {
  return `<dl class="details">${rows
    .filter((row) => row.value.trim().length > 0)
    .map(
      (row) => `
        <div class="detail">
          <dt class="detail-label">${escapeHtml(row.label)}</dt>
          <dd class="detail-value">${escapeHtml(row.value)}</dd>
        </div>`,
    )
    .join("")}</dl>`;
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
 * Tipografi saja: hanya dua garis di seluruh dokumen (bawah kop dan atas
 * footer). Pemisah antar bagian memakai ruang kosong, bukan kotak atau garis.
 */
const REPORT_CSS = `
  @page { size: A4; margin: 17mm 18mm 16mm; }
  :root {
    --blue: #2B5E8C;
    --ink: #1B2A3B;
    --body: #35424F;
    --muted: #66727E;
    --faint: #93A0AC;
    --line: #E4E9EF;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Plus Jakarta Sans", -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: var(--body);
    font-size: 9.9pt;
    line-height: 1.65;
    background: #fff;
    -webkit-font-smoothing: antialiased;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .doc { max-width: 760px; margin: 0 auto; }

  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 26px; padding-bottom: 13px; border-bottom: 1px solid var(--line); }
  .brand { display: flex; align-items: center; gap: 8px; }
  .logo { width: 30px; height: 30px; object-fit: contain; }
  .brand-name { font-size: 12.8pt; font-weight: 800; letter-spacing: -0.35px; color: var(--ink); margin: 0; line-height: 1.1; }
  .brand-name span { color: var(--blue); }
  .brand-tag { font-size: 6pt; letter-spacing: 1.6px; text-transform: uppercase; color: var(--faint); margin: 3px 0 0; font-weight: 600; }
  .meta { text-align: right; }
  .meta-label { font-size: 6pt; letter-spacing: 1.5px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 600; }
  .meta-code { font-family: "SFMono-Regular", Consolas, "Courier New", monospace; font-size: 8pt; font-weight: 600; color: var(--muted); margin: 4px 0 0; }
  .meta-note { font-size: 6pt; letter-spacing: 1.2px; text-transform: uppercase; color: var(--faint); margin: 6px 0 0; }

  .title { margin-top: 30px; }
  .kicker { font-size: 6.8pt; letter-spacing: 2.2px; text-transform: uppercase; color: var(--blue); margin: 0; font-weight: 700; }
  h1 { font-size: 22pt; line-height: 1.24; letter-spacing: -0.7px; color: var(--ink); margin: 10px 0 8px; font-weight: 700; text-wrap: balance; }
  .sub { font-size: 9.4pt; color: var(--muted); margin: 0; max-width: 620px; }

  .score { display: flex; align-items: flex-end; gap: 44px; margin-top: 28px; page-break-inside: avoid; }
  .score-main { min-width: 118px; }
  .score-label { font-size: 6.4pt; letter-spacing: 1.4px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .score-value { font-size: 38pt; line-height: 1; font-weight: 600; letter-spacing: -2px; color: var(--ink); margin: 6px 0 0; font-variant-numeric: tabular-nums; }
  .score-value small { font-size: 9pt; font-weight: 400; letter-spacing: 0; color: var(--muted); margin-left: 6px; }
  .score-value--text { font-size: 17pt; letter-spacing: -0.2px; font-weight: 700; }
  .score-caption { font-size: 8pt; color: var(--muted); margin: 8px 0 0; }
  .score-meta { display: flex; flex-wrap: wrap; gap: 28px; padding-bottom: 7px; }
  .pair { max-width: 210px; }
  .pair-label { font-size: 6.4pt; letter-spacing: 1.3px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .pair-value { font-size: 8.9pt; font-weight: 600; color: var(--ink); margin: 6px 0 0; }

  .facts { display: flex; flex-wrap: wrap; gap: 24px 34px; margin-top: 22px; }
  .fact-label { font-size: 6.4pt; letter-spacing: 1.3px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .fact-value { font-size: 8.8pt; font-weight: 600; color: var(--ink); margin: 5px 0 0; }

  dl.details { margin: 0; }
  .detail { display: flex; gap: 18px; padding: 5px 0; border-bottom: 1px solid #F1F4F8; }
  .detail:last-child { border-bottom: 0; padding-bottom: 0; }
  .detail-label { flex: 0 0 128px; font-size: 7.2pt; letter-spacing: 0.7px; text-transform: uppercase; color: var(--faint); font-weight: 700; margin: 0; padding-top: 2px; }
  .detail-value { flex: 1 1 auto; min-width: 0; margin: 0; font-size: 9.2pt; line-height: 1.5; color: var(--ink); font-weight: 600; }

  section { margin-top: 26px; page-break-inside: avoid; }
  h2 { font-size: 6.9pt; letter-spacing: 1.8px; text-transform: uppercase; color: var(--blue); margin: 0 0 9px; font-weight: 700; }

  .lead { font-size: 9.4pt; color: var(--muted); margin: 18px 0 0; }
  .summary { margin: 0; font-size: 9.9pt; color: var(--body); white-space: pre-line; }

  ol.steps, ul.contacts { list-style: none; margin: 0; padding: 0; }
  ol.steps { display: grid; gap: 10px; }
  .step { display: flex; gap: 14px; align-items: flex-start; }
  .step-number { flex: 0 0 15px; font-family: "SFMono-Regular", Consolas, "Courier New", monospace; font-size: 8pt; font-weight: 600; color: #8FA6BB; padding-top: 1px; font-variant-numeric: tabular-nums; }
  .step-body { min-width: 0; }
  .step-title { font-size: 8.9pt; font-weight: 700; color: var(--ink); margin: 0; }
  .step-desc { font-size: 9.7pt; color: var(--body); margin: 0; }
  .step-title + .step-desc { margin-top: 1px; }

  ul.contacts { display: grid; gap: 12px; }
  .contact-name { font-size: 8.8pt; font-weight: 700; color: var(--ink); margin: 0; }
  .contact-detail { font-size: 8.8pt; color: var(--muted); margin: 2px 0 0; }

  .notice { margin-top: 22px; font-size: 8.4pt; color: var(--muted); page-break-inside: avoid; }
  .notice strong { color: var(--muted); font-weight: 700; }

  .closing { margin-top: 20px; font-size: 9.6pt; color: var(--body); }

  .sign { display: flex; justify-content: space-between; gap: 40px; margin-top: 34px; page-break-inside: avoid; }
  .sign-col { width: 46%; }
  .sign-label { font-size: 6.4pt; letter-spacing: 1.3px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .sign-name { display: inline-block; min-width: 156px; margin: 40px 0 0; padding-top: 5px; border-top: 1px solid #C7D1DB; font-size: 9.4pt; font-weight: 600; color: var(--ink); }
  .sign-note { font-size: 6.4pt; color: var(--faint); margin: 4px 0 0; }
  .sign-col--right { text-align: right; }
  .sign-col--right .sign-name { min-width: 140px; }

  .foot { display: flex; justify-content: space-between; gap: 16px; margin-top: 30px; padding-top: 9px; border-top: 1px solid var(--line); font-size: 6.4pt; color: var(--faint); }
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

  const valueClass = hero.valueSuffix
    ? "score-value"
    : "score-value score-value--text";

  return `<div class="score">
      <div class="score-main">
        <p class="score-label">${escapeHtml(hero.label)}</p>
        <p class="${valueClass}">${escapeHtml(hero.value)}${
          hero.valueSuffix
            ? `<small>${escapeHtml(hero.valueSuffix)}</small>`
            : ""
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
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>${REPORT_CSS}</style>
</head>
<body>
  <main class="doc">
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
        <p class="meta-note">Dokumen Pribadi</p>
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

  // Pastikan font dan logo selesai dimuat sebelum dialog cetak dibuka.
  let printed = false;
  const triggerPrint = () => {
    if (printed) return;
    printed = true;
    window.setTimeout(() => printWindow.print(), 150);
  };

  const waitForLogo = () => {
    const logo = printWindow.document.querySelector("img");
    if (logo && !logo.complete) {
      logo.addEventListener("load", triggerPrint, { once: true });
      logo.addEventListener("error", triggerPrint, { once: true });
      window.setTimeout(triggerPrint, 1500);
    } else {
      triggerPrint();
    }
  };

  const fonts = printWindow.document.fonts;
  if (fonts?.ready) {
    let settled = false;
    const proceed = () => {
      if (settled) return;
      settled = true;
      waitForLogo();
    };
    fonts.ready.then(proceed).catch(proceed);
    window.setTimeout(proceed, 2500);
  } else {
    waitForLogo();
  }
}
