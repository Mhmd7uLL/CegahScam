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

export function buildListHtml(items: string[]) {
  return items
    .map(
      (item, index) => `
        <li class="step">
          <span class="step-number">${index + 1}</span>
          <div class="step-body">
            <p class="step-desc">${escapeHtml(item)}</p>
          </div>
        </li>`,
    )
    .join("");
}

export function buildStepsHtml(steps: ReportStep[]) {
  return steps
    .map(
      (step, index) => `
        <li class="step">
          <span class="step-number">${index + 1}</span>
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
 * Satu nada warna: biru brand CegahScam (#1E40AF) + turunannya.
 * Tipografi sans-serif supaya terasa modern, bukan dokumen template.
 */
const REPORT_CSS = `
  @page { size: A4; margin: 13mm 13mm 15mm; }
  :root {
    --brand: #1E40AF;
    --brand-ink: #16307E;
    --tint: #EAF1FE;
    --tint-soft: #F6F9FF;
    --line: #E3EBF7;
    --ink: #17263A;
    --muted: #5B6B7C;
    --faint: #93A2B4;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    font-size: 10.4pt;
    line-height: 1.62;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .doc { max-width: 800px; margin: 0 auto; }

  .top-rule { height: 5px; border-radius: 99px; background: var(--brand); }

  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-top: 16px; }
  .brand { display: flex; align-items: center; gap: 10px; }
  .logo { width: 38px; height: 38px; object-fit: contain; }
  .brand-name { font-size: 15pt; font-weight: 800; letter-spacing: -0.3px; color: #0E1B2E; margin: 0; line-height: 1.1; }
  .brand-name span { color: var(--brand); }
  .brand-tag { font-size: 6.4pt; letter-spacing: 1.5px; text-transform: uppercase; color: var(--faint); margin: 4px 0 0; font-weight: 600; }
  .meta { text-align: right; }
  .meta-label { font-size: 6.2pt; letter-spacing: 1.4px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .meta-code { font-family: "SFMono-Regular", Consolas, "Courier New", monospace; font-size: 8.4pt; font-weight: 700; color: var(--brand); margin: 3px 0 0; }
  .meta-pill { display: inline-block; margin-top: 6px; padding: 2px 8px; border-radius: 99px; background: var(--tint); color: var(--brand-ink); font-size: 6pt; letter-spacing: 1px; text-transform: uppercase; font-weight: 800; }

  .title { margin-top: 22px; }
  .kicker { display: inline-block; padding: 4px 10px; border-radius: 99px; background: var(--tint); color: var(--brand); font-size: 6.6pt; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; }
  h1 { font-size: 22.5pt; line-height: 1.22; letter-spacing: -0.7px; color: #0E1B2E; margin: 10px 0 6px; font-weight: 800; }
  .sub { font-size: 9.6pt; color: var(--muted); margin: 0; }

  .hero { margin-top: 18px; border-radius: 16px; background: var(--brand); color: #fff; padding: 17px 20px; display: flex; align-items: center; justify-content: space-between; gap: 18px; page-break-inside: avoid; }
  .hero-label { font-size: 6.6pt; letter-spacing: 1.4px; text-transform: uppercase; color: rgba(255, 255, 255, 0.72); margin: 0; font-weight: 800; }
  .hero-value { font-size: 23pt; font-weight: 800; letter-spacing: -0.8px; margin: 3px 0 0; line-height: 1.05; }
  .hero-value small { font-size: 9.6pt; font-weight: 600; letter-spacing: 0; opacity: 0.72; margin-left: 2px; }
  .hero-caption { font-size: 8.4pt; color: rgba(255, 255, 255, 0.82); margin: 6px 0 0; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; max-width: 54%; }
  .chip { background: rgba(255, 255, 255, 0.15); border-radius: 11px; padding: 7px 11px; min-width: 104px; }
  .chip-label { font-size: 6pt; letter-spacing: 1.1px; text-transform: uppercase; color: rgba(255, 255, 255, 0.72); margin: 0; font-weight: 800; }
  .chip-value { font-size: 8.2pt; font-weight: 700; margin: 3px 0 0; }

  .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 20px; margin-top: 18px; border-top: 1px solid var(--line); }
  .fact { padding: 9px 0 8px; border-bottom: 1px solid var(--line); }
  .fact-label { font-size: 6.4pt; letter-spacing: 1.1px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .fact-value { font-size: 8.8pt; font-weight: 700; color: var(--ink); margin: 3px 0 0; }

  section { margin-top: 22px; page-break-inside: avoid; }
  h2 { display: flex; align-items: center; gap: 8px; font-size: 8.2pt; letter-spacing: 1.2px; text-transform: uppercase; color: var(--brand); margin: 0 0 10px; font-weight: 800; }
  h2::before { content: ""; width: 6px; height: 6px; border-radius: 2px; background: var(--brand); flex: 0 0 auto; }

  .lead { font-size: 10.2pt; margin: 16px 0 0; color: #24303F; }
  .summary { margin: 0; padding: 12px 14px; background: var(--tint-soft); border: 1px solid var(--line); border-radius: 12px; font-size: 10.2pt; color: #24303F; white-space: pre-line; }

  ol.steps, ul.contacts { list-style: none; margin: 0; padding: 0; }
  ol.steps { display: grid; gap: 9px; }
  .step { display: flex; gap: 10px; align-items: flex-start; }
  .step-number { flex: 0 0 20px; width: 20px; height: 20px; border-radius: 7px; background: var(--tint); color: var(--brand); font-size: 7.8pt; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  .step-body { min-width: 0; }
  .step-title { font-size: 9pt; font-weight: 700; color: var(--ink); margin: 0; }
  .step-desc { font-size: 10pt; color: #3D4C5C; margin: 0; }

  ul.contacts { display: grid; gap: 8px; }
  .contact { background: var(--tint-soft); border: 1px solid var(--line); border-radius: 12px; padding: 9px 12px; }
  .contact-name { font-size: 8.9pt; font-weight: 700; color: var(--ink); margin: 0; }
  .contact-detail { font-size: 8.9pt; color: #4A5A6B; margin: 3px 0 0; }

  .notice { margin-top: 20px; padding: 11px 14px; border-radius: 12px; background: var(--tint); border-left: 3px solid var(--brand); color: #1B3A6B; font-size: 8.9pt; page-break-inside: avoid; }
  .notice strong { color: var(--brand-ink); }

  .closing { margin-top: 20px; font-size: 10.2pt; color: #24303F; }

  .sign { display: flex; justify-content: space-between; gap: 40px; margin-top: 26px; page-break-inside: avoid; }
  .sign-col { width: 46%; }
  .sign-label { font-size: 6.8pt; letter-spacing: 1.1px; text-transform: uppercase; color: var(--faint); margin: 0; font-weight: 700; }
  .sign-name { display: inline-block; min-width: 168px; margin: 40px 0 0; padding-top: 5px; border-top: 1.5px solid #C9D6E8; font-size: 10pt; font-weight: 700; color: var(--ink); }
  .sign-note { font-size: 6.8pt; color: var(--faint); margin: 4px 0 0; }
  .sign-col--right { text-align: right; }
  .sign-col--right .sign-name { min-width: 152px; }

  .foot { margin-top: 26px; }
  .foot-bar { height: 4px; border-radius: 99px; background: var(--brand); margin-bottom: 8px; }
  .foot-row { display: flex; justify-content: space-between; gap: 16px; font-size: 6.6pt; color: var(--faint); }
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

  const chips = hero.chips?.length
    ? `<div class="chips">${hero.chips
        .map(
          (chip) => `<div class="chip">
            <p class="chip-label">${escapeHtml(chip.label)}</p>
            <p class="chip-value">${escapeHtml(chip.value)}</p>
          </div>`,
        )
        .join("")}</div>`
    : "";

  return `<div class="hero">
      <div>
        <p class="hero-label">${escapeHtml(hero.label)}</p>
        <p class="hero-value">${escapeHtml(hero.value)}${
          hero.valueSuffix ? `<small>${escapeHtml(hero.valueSuffix)}</small>` : ""
        }</p>
        ${hero.caption ? `<p class="hero-caption">${escapeHtml(hero.caption)}</p>` : ""}
      </div>
      ${chips}
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
        <span class="meta-pill">Dokumen Pribadi</span>
      </div>
    </header>

    <div class="title">
      <span class="kicker">${escapeHtml(options.kicker)}</span>
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
      <div class="foot-bar"></div>
      <div class="foot-row">
        <span>${options.footerLeft ?? "<strong>CegahScam</strong> &middot; Kenali. Pahami. Hadapi."}</span>
        <span>${options.footerRight ?? `Dokumen dibuat otomatis oleh sistem &middot; ${escapeHtml(options.documentCode)}`}</span>
      </div>
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
