import { apiFetch } from "./api";

/** GET /api/invite — asks the server whether the code is a valid internal invite. */
export async function checkInviteCode(code: string): Promise<boolean> {
  const { internal } = await apiFetch<{ internal: boolean }>(
    `/api/invite?code=${encodeURIComponent(code)}`,
  );
  return internal;
}
