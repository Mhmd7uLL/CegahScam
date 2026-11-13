const PREFIX = "cegahscam:draft:";

export function readDraft<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(`${PREFIX}${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeDraft<T>(key: string, value: T): void {
  try {
    window.sessionStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  } catch {
    return;
  }
}

export function clearDraft(key: string): void {
  try {
    window.sessionStorage.removeItem(`${PREFIX}${key}`);
  } catch {
    return;
  }
}
