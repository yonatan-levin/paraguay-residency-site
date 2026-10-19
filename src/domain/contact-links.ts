import { directContacts } from "../config/brand";
import { getPackage, getService } from "../content/catalog";
import { translate } from "../lib/i18n/common";
import { resolveSelection } from "./selection";
import type { LeadContext } from "./types";

type ContactContext = Pick<
  LeadContext,
  "locale" | "serviceId" | "packageId" | "campaign" | "familyQuote"
>;

export function contactLinks(context: ContactContext) {
  // Revalidate at the outbound boundary and ignore attribution and private drafts.
  const selection = resolveSelection({
    service: context.serviceId,
    plan: context.packageId,
    campaign: context.campaign,
  });
  const locale = context.locale;
  const service = getService(selection.serviceId);
  const plan = getPackage(selection.packageId);
  const message = [
    translate(
      locale,
      "Hello Yonatan, I would like to discuss my plans for Paraguay.",
    ),
  ];
  if (service)
    message.push(
      translate(locale, "Service: {service}.", {
        service: service.name[locale],
      }),
    );
  if (plan)
    message.push(
      translate(locale, "Package: {plan}.", { plan: plan.name[locale] }),
    );
  if (selection.campaign)
    message.push(
      translate(locale, "Campaign: {campaign}.", {
        campaign: selection.campaign,
      }),
    );
  if (context.familyQuote)
    message.push(translate(locale, "I would like to request a family quote."));

  const whatsapp = new URL(directContacts.whatsappUrl);
  whatsapp.searchParams.set("text", message.join(" "));

  const calendly = new URL(directContacts.calendlyUrl);
  calendly.searchParams.set("utm_source", directContacts.calendlySource);
  calendly.searchParams.set(
    "utm_medium",
    context.familyQuote ? "website_family_quote" : "website",
  );
  if (selection.packageId)
    calendly.searchParams.set("utm_content", selection.packageId);
  if (selection.serviceId)
    calendly.searchParams.set("utm_term", selection.serviceId);
  if (selection.campaign)
    calendly.searchParams.set("utm_campaign", selection.campaign);
  return { whatsapp: whatsapp.toString(), calendly: calendly.toString() };
}
