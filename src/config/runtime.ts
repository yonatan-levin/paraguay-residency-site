// Explicit extension also supports the native Node launch-check command.
import { supportedLocales } from "./locales.ts";
import type { Locale } from "../domain/types";
export interface RuntimeEnvironment {
  mode: "demo" | "live";
  siteUrl: string;
  productionOrigin?: string;
  productionOriginApproved: boolean;
  completeLocales: Locale[];
  approvals: {
    brand: boolean;
    legalOperator: boolean;
    contacts: boolean;
    commercial: boolean;
    content: boolean;
    privacy: boolean;
    providers: boolean;
    translation: boolean;
  };
  integrations: { analytics: boolean; messaging: boolean; booking: boolean };
}
export const runtime: RuntimeEnvironment = {
  mode: "demo",
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  productionOriginApproved: false,
  completeLocales: [...supportedLocales],
  approvals: {
    brand: false,
    legalOperator: false,
    contacts: false,
    commercial: false,
    content: false,
    privacy: false,
    providers: false,
    translation: false,
  },
  integrations: { analytics: false, messaging: false, booking: false },
};
export function validateLiveConfiguration(
  environment: RuntimeEnvironment,
): string[] {
  const errors: string[] = [];
  if (environment.mode !== "live")
    errors.push(
      "SITE_MODE is demo; this build cannot send messages or book appointments.",
    );
  let validOrigin = false;
  try {
    const production = new URL(environment.productionOrigin ?? "");
    validOrigin =
      production.protocol === "https:" &&
      production.pathname === "/" &&
      !production.search &&
      !production.hash &&
      !production.username &&
      !production.password &&
      production.hostname !== "localhost" &&
      !production.hostname.endsWith(".invalid") &&
      production.origin === new URL(environment.siteUrl).origin;
  } catch {
    /* Missing or malformed origins remain an explicit launch error. */
  }
  if (!validOrigin || !environment.productionOriginApproved)
    errors.push("Set and approve an HTTPS production origin.");
  const requirements: Record<keyof RuntimeEnvironment["approvals"], string> = {
    brand: "Approve the brand and domain.",
    legalOperator: "Approve the legal operator.",
    contacts: "Approve contact details and lead ownership.",
    commercial:
      "Approve prices, delivery scope, external costs, and cancellation terms.",
    content: "Obtain qualified review of regulated service content.",
    privacy: "Approve privacy, retention, and processing arrangements.",
    providers:
      "Approve and test provider configuration before enabling integrations.",
    translation: "Approve complete translations for published locales.",
  };
  for (const [key, message] of Object.entries(requirements))
    if (!environment.approvals[key as keyof typeof requirements])
      errors.push(message);
  if (!environment.completeLocales.includes("en"))
    errors.push("Complete the English launch locale.");
  return errors;
}
