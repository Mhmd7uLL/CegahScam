const PREFIX = "cegahscam:draft:";
const SAVED_AT_SUFFIX = ":saved-at";

function draftKey(key: string) {
  return `${PREFIX}${key}`;
}

function savedAtKey(key: string) {
  return `${PREFIX}${key}${SAVED_AT_SUFFIX}`;
}

/**
 * Membaca draf yang tersimpan. Draf disimpan di localStorage supaya tetap ada
 * walau tab ditutup atau browser di-refresh (mirip autosave Google Docs).
 */
export function readDraft<T>(key: string): T | null {
  const storageKey = draftKey(key);

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      return JSON.parse(raw) as T;
    }
  } catch {
    /* localStorage tidak tersedia atau isi rusak */
  }

  // Migrasi draf lama yang masih memakai sessionStorage.
  try {
    const legacy = window.sessionStorage.getItem(storageKey);
    if (legacy) {
      window.localStorage.setItem(storageKey, legacy);
      window.sessionStorage.removeItem(storageKey);
      return JSON.parse(legacy) as T;
    }
  } catch {
    /* abaikan */
  }

  return null;
}

export function writeDraft<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(draftKey(key), JSON.stringify(value));
    window.localStorage.setItem(savedAtKey(key), String(Date.now()));
  } catch {
    /* kuota penuh atau localStorage diblokir */
  }
}

export function clearDraft(key: string): void {
  try {
    window.localStorage.removeItem(draftKey(key));
    window.localStorage.removeItem(savedAtKey(key));
    window.sessionStorage.removeItem(draftKey(key));
  } catch {
    /* abaikan */
  }
}

/** Waktu (epoch ms) saat draf terakhir disimpan. */
export function getDraftSavedAt(key: string): number | null {
  try {
    const raw =
      window.localStorage.getItem(savedAtKey(key)) ??
      window.sessionStorage.getItem(savedAtKey(key));
    if (!raw) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/** Apakah draf benar-benar berisi data (bukan objek kosong). */
export function draftHasContent(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;

  return Object.values(value as Record<string, unknown>).some((item) => {
    if (Array.isArray(item)) return item.length > 0;
    if (typeof item === "string") return item.trim().length > 0;
    if (typeof item === "boolean") return item;
    if (typeof item === "number") return Number.isFinite(item);
    return item != null;
  });
}

/** Hapus draf lalu muat ulang halaman supaya formulir kembali kosong. */
export function discardDraftAndReload(key: string): void {
  clearDraft(key);
  window.location.reload();
}

/** Format waktu simpan draf menjadi teks singkat Bahasa Indonesia. */
export function formatDraftTime(savedAt: number | null): string {
  if (!savedAt) return "baru saja";

  const diff = Date.now() - savedAt;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "baru saja";
  if (diff < hour) return `${Math.floor(diff / minute)} menit lalu`;
  if (diff < day) return `${Math.floor(diff / hour)} jam lalu`;
  if (diff < 7 * day) return `${Math.floor(diff / day)} hari lalu`;

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(savedAt));
}
