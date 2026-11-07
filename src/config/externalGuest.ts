export const EXTERNAL_GUEST_STORAGE_KEY = "nikah_external_guest";
export const EXTERNAL_GUEST_PARAM = "externalGuest";
export const DEFAULT_MAX_GUESTS = 10;
export const EXTERNAL_MAX_GUESTS = 2;

/**
 * Persists the `?externalGuest=true|false` URL param so the restriction
 * survives reloads and links without the param. `false` clears it.
 */
export function syncExternalGuestFromUrl(): void {
  try {
    const value = new URLSearchParams(window.location.search).get(
      EXTERNAL_GUEST_PARAM,
    );
    if (value === "true") localStorage.setItem(EXTERNAL_GUEST_STORAGE_KEY, "1");
    else if (value === "false")
      localStorage.removeItem(EXTERNAL_GUEST_STORAGE_KEY);
  } catch {
    // Storage unavailable (e.g. private mode) — fall back to the URL param only
  }
}

export function isExternalGuest(): boolean {
  try {
    if (localStorage.getItem(EXTERNAL_GUEST_STORAGE_KEY) === "1") return true;
  } catch {
    // ignore
  }
  return (
    new URLSearchParams(window.location.search).get(EXTERNAL_GUEST_PARAM) ===
    "true"
  );
}

export function getMaxGuests(external: boolean): number {
  return external ? EXTERNAL_MAX_GUESTS : DEFAULT_MAX_GUESTS;
}
