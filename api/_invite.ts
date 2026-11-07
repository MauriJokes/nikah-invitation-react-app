export const MAX_GUESTS_DEFAULT = 2;
export const MAX_GUESTS_INTERNAL = 10;

/** Fails closed: with no INTERNAL_INVITE_CODE configured nobody is internal. */
export function isInternalInvite(code: unknown): boolean {
  const secret = process.env.INTERNAL_INVITE_CODE;
  return Boolean(secret) && typeof code === "string" && code === secret;
}
