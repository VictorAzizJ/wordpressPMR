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

const WEBHOOK_TIMEOUT_MS = 20_000;

function isRedirectStatus(status: number): boolean {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

/**
 * Persist a camp registration row and trigger confirmation email.
 *
 * Connection point: Google Apps Script web app webhook
 * (`GOOGLE_SHEETS_WEBHOOK_URL`). The script receives JSON, appends a row
 * to the staff spreadsheet, and sends a confirmation via MailApp.
 * Copy the script from `scripts/camp-registration-apps-script.js`.
 * No Google credentials are bundled in the client.
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
      { firstName: payload.firstName, lastName: payload.lastName, email: payload.email }
    );
    return { ok: true, mode: "stub" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      // text/plain avoids a JSON POST 404 after Google's 302 to googleusercontent.
      // redirect: "manual" returns that 302 immediately — the script already ran.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        source: "pmr-camp-register",
        ...(process.env.CAMP_WEBHOOK_SECRET && {
          webhookSecret: process.env.CAMP_WEBHOOK_SECRET,
        }),
      }),
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (isRedirectStatus(res.status)) {
      return { ok: true, mode: "webhook" };
    }

    const detail = await res.text().catch(() => "");
    if (!res.ok) {
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

    try {
      const parsed = JSON.parse(detail) as { ok?: boolean; error?: string };
      if (parsed.ok === false) {
        console.error("[camp/sheets] Apps Script webhook error", parsed.error);
        return {
          ok: false,
          error: "Could not save registration. Please try again later.",
        };
      }
    } catch {
      // Non-JSON 200 still counts as delivered.
    }

    return { ok: true, mode: "webhook" };
  } catch (err) {
    const timedOut =
      (err instanceof Error && err.name === "TimeoutError") ||
      (err instanceof Error && err.name === "AbortError");
    console.error("[camp/sheets] Apps Script webhook request error", err);
    return {
      ok: false,
      error: timedOut
        ? "Google took too long to respond. Check the sheet or try again."
        : "Could not save registration. Please try again later.",
    };
  }
}
