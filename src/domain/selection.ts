import type { Locale, Selection } from "./types";
import { getPackage, getService } from "../content/catalog";
export const campaignIds = ["residency-cost", "family-relocation"] as const;
export function resolveSelection(input: Record<string, unknown>): Selection {
  const plan =
    typeof input.plan === "string" ? getPackage(input.plan) : undefined;
  const service =
    typeof input.service === "string" ? getService(input.service) : undefined;
  const campaign = campaignIds.find((value) => value === input.campaign);
  return {
    ...(plan
      ? { packageId: plan.id, serviceId: plan.serviceId }
      : service
        ? { serviceId: service.id }
        : {}),
    ...(campaign ? { campaign } : {}),
    invalid: Boolean(
      (input.plan && !plan) ||
      (input.service && !service) ||
      (input.campaign && !campaign),
    ),
  };
}
export function journeyHref(
  locale: Locale,
  route: string,
  selection: Selection = {},
): string {
  // Route keys are application-owned; a query value is never a navigation destination.
  const safeRoute = /^([a-z0-9-]+\/)*[a-z0-9-]*$/.test(route) ? route : "book";
  const safe = resolveSelection({
    service: selection.serviceId,
    plan: selection.packageId,
    campaign: selection.campaign,
  });
  const params = new URLSearchParams();
  if (safe.serviceId) params.set("service", safe.serviceId);
  if (safe.packageId) params.set("plan", safe.packageId);
  if (safe.campaign) params.set("campaign", safe.campaign);
  return `/${locale}${safeRoute ? `/${safeRoute}` : ""}${params.size ? `?${params}` : ""}`;
}
