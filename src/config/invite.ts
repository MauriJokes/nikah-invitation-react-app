export const INVITE_STORAGE_KEY = "nikah_invite_code";
export const INVITE_PARAM = "invite";
export const MAX_GUESTS_DEFAULT = 2;
export const MAX_GUESTS_INTERNAL = 10;

/** Saves `?invite=<code>` so it survives reloads and links without the param. */
export function syncInviteFromUrl(): void {
  try {
    const code = new URLSearchParams(window.location.search).get(INVITE_PARAM);
    if (code) localStorage.setItem(INVITE_STORAGE_KEY, code);
  } catch {
    // Storage unavailable (e.g. private mode) — fall back to the URL param only
  }
}

export function getInviteCode(): string | null {
  try {
    const stored = localStorage.getItem(INVITE_STORAGE_KEY);
    if (stored) return stored;
  } catch {
    // ignore
  }
  return new URLSearchParams(window.location.search).get(INVITE_PARAM);
}

export function clearInviteCode(): void {
  try {
    localStorage.removeItem(INVITE_STORAGE_KEY);
  } catch {
    // ignore
  }
}
