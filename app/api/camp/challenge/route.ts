import { NextResponse } from "next/server";
import {
  clientIp,
  createCampFormChallenge,
  limitChallengeIssuance,
  publicTurnstileSiteKey,
  RATE_LIMIT_ERROR,
} from "@/lib/camp/form-guard";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ip = clientIp(request);
  if (!limitChallengeIssuance(ip)) {
    return NextResponse.json({ error: RATE_LIMIT_ERROR }, { status: 429 });
  }

  return NextResponse.json(
    {
      challenge: createCampFormChallenge(),
      turnstileSiteKey: publicTurnstileSiteKey(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
