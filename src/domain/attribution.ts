import type { Attribution } from "./types";
export const attributionValues = {
  source: [
    "google",
    "bing",
    "instagram",
    "facebook",
    "linkedin",
    "direct",
    "unknown",
  ],
  medium: ["organic", "social", "paid-social", "referral", "direct", "unknown"],
  campaign: ["residency-cost", "family-relocation", "unknown"],
  content: ["cost", "family", "bio", "unknown"],
} as const;
export function sanitizeAttribution(
  input: Record<string, unknown>,
): Attribution {
  const allowed = (
    key: keyof typeof attributionValues,
    value: unknown,
  ): string =>
    typeof value === "string" &&
    (attributionValues[key] as readonly string[]).includes(value)
      ? value
      : "unknown";
  const result: Attribution = {
    source: allowed("source", input.utm_source),
    medium: allowed("medium", input.utm_medium),
    campaign: allowed("campaign", input.utm_campaign ?? input.campaign),
    content: allowed("content", input.utm_content),
  };
  if (typeof input.referrer === "string") {
    try {
      const url = new URL(input.referrer);
      if (url.protocol === "https:" || url.protocol === "http:")
        result.referrer = `${url.origin}${url.pathname}`;
    } catch {
      /* Invalid referrers are deliberately discarded. */
    }
  }
  return result;
}
export function captureAttribution(
  current: Attribution | undefined,
  input: Record<string, unknown>,
): Attribution {
  return current ?? sanitizeAttribution(input);
}
