/**
 * Client MagicPlan API — AIMAN RENOVATION
 *
 * Doc: https://api.magicplan.app/docs (REST)
 * Auth: header `X-API-Key` + `X-Customer-ID`
 *
 * Variables d'environnement requises (à ajouter dans .env.local + Netlify):
 *   - MAGICPLAN_API_KEY
 *   - MAGICPLAN_CUSTOMER_ID
 *   - MAGICPLAN_WEBHOOK_SECRET (signature HMAC des webhooks)
 */

const BASE_URL = "https://api.magicplan.app/v2";

export interface MagicPlanRoom {
  id: string;
  name: string;
  area_m2: number;
  perimeter_m: number;
  height_m: number;
  wall_area_m2: number;
  floor_type?: string;
}

export interface MagicPlanProject {
  id: string;
  name: string;
  created_at: string;
  total_area_m2: number;
  rooms: MagicPlanRoom[];
}

function getCredentials() {
  const apiKey = process.env.MAGICPLAN_API_KEY;
  const customerId = process.env.MAGICPLAN_CUSTOMER_ID;
  if (!apiKey || !customerId) {
    throw new Error(
      "MagicPlan credentials missing. Set MAGICPLAN_API_KEY and MAGICPLAN_CUSTOMER_ID.",
    );
  }
  return { apiKey, customerId };
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { apiKey, customerId } = getCredentials();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "X-API-Key": apiKey,
      "X-Customer-ID": customerId,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`MagicPlan API ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export async function getProject(projectId: string): Promise<MagicPlanProject> {
  return request<MagicPlanProject>(`/projects/${projectId}`);
}

export async function listProjects(): Promise<MagicPlanProject[]> {
  const data = await request<{ projects: MagicPlanProject[] }>("/projects");
  return data.projects;
}

/**
 * Deep link pour ouvrir l'app MagicPlan en création de projet,
 * avec callback vers notre site une fois le scan terminé.
 */
export function buildDeepLink(opts: { callbackUrl: string; projectName?: string }): string {
  const params = new URLSearchParams({
    action: "new_project",
    callback: opts.callbackUrl,
    ...(opts.projectName && { name: opts.projectName }),
  });
  return `magicplan://create?${params.toString()}`;
}
