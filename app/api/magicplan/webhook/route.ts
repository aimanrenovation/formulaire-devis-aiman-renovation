/**
 * Webhook MagicPlan — reçoit les notifications quand un scan est terminé.
 *
 * Configurer dans le dashboard MagicPlan :
 *   URL : https://<domaine>/api/magicplan/webhook
 *   Events : project.created, project.updated
 *   Secret : MAGICPLAN_WEBHOOK_SECRET
 */

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getProject } from "@/lib/magicplan";
import { genererDevis } from "@/lib/devis-engine";

interface WebhookPayload {
  event: "project.created" | "project.updated";
  project_id: string;
  customer_id: string;
  timestamp: string;
}

function verifySignature(body: string, signature: string | null): boolean {
  const secret = process.env.MAGICPLAN_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-magicplan-signature");

    if (!verifySignature(rawBody, signature)) {
      console.warn("[magicplan/webhook] invalid signature");
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody) as WebhookPayload;
    console.log("[magicplan/webhook] event", payload.event, payload.project_id);

    if (payload.event !== "project.created" && payload.event !== "project.updated") {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const project = await getProject(payload.project_id);
    const devis = genererDevis(project, {});

    // TODO: persister le devis (Netlify Blobs) + envoi email client + copie ProGBat
    return NextResponse.json({ ok: true, project_id: project.id, devis });
  } catch (err) {
    console.error("[magicplan/webhook] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown" },
      { status: 500 },
    );
  }
}
