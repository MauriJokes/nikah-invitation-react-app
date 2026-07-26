import { google, Auth } from "googleapis";

/**
 * Appends a single row to the given sheet tab.
 * Returns silently if the required env vars are absent (e.g. local dev without
 * Sheets configured), so the main MongoDB write is never affected.
 */
export async function appendRow(
  tab: string,
  values: (string | number | boolean | null | undefined)[],
): Promise<void> {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!key || !sheetId) {
    // Sheets not configured in this environment — skip silently
    return;
  }

  const { client_email, private_key } = JSON.parse(key) as {
    client_email: string;
    private_key: string;
  };

  // Use JWT directly — avoids GoogleAuth's slow environment auto-detection
  // (metadata server probing, ADC lookup) which causes hangs in serverless.
  const auth = new Auth.JWT({
    email: client_email,
    key: private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tab}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values.map((v) => (v == null ? "" : String(v)))],
    },
  });
}
