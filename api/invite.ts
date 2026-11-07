import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isInternalInvite } from "./_invite";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  return res.status(200).json({ internal: isInternalInvite(req.query.code) });
}
