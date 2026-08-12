import type { CampRegistrationPayload } from "@/lib/camp/types";

export type SheetsSubmitSuccess = {
  ok: true;
  mode: "webhook" | "stub";
};

export type SheetsSubmitFailure = {
  ok: false;
  error: string;
};

export type SheetsSubmitResult = SheetsSubmitSuccess | SheetsSubmitFailure;

/**
 * Persist a camp registration row.
 *
 * Connection point: Google Apps Script web app webhook
 * (`GOOGLE_SHEETS_WEBHOOK_URL`). The script receives JSON and appends a row
 * to the staff spreadsheet. No Google credentials are bundled in the client.
 *
 * Future swap: replace this POST with the official Sheets API (service
 * account / OAuth) without changing `/api/camp/register` or the form contract.
 */
export async function submitCampRegistration(
  payload: CampRegistrationPayload
): Promise<SheetsSubmitResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info(
      "[camp/sheets] GOOGLE_SHEETS_WEBHOOK_URL unset — returning stub success.",
      { name: payload.name, email: payload.email }
    );
    return { ok: true, mode: "stub" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        source: "pmr-camp-register",
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        "[camp/sheets] Apps Script webhook failed",
        res.status,
        detail.slice(0, 500)
      );
      return {
        ok: false,
        error: "Could not save registration. Please try again later.",
      };
    }

    return { ok: true, mode: "webhook" };
  } catch (err) {
    console.error("[camp/sheets] Apps Script webhook request error", err);
    return {
      ok: false,
      error: "Could not save registration. Please try again later.",
    };
  }
}
