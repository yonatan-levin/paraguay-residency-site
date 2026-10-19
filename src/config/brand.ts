import { supportedLocales } from "./locales";
import type { BrandConfig } from "../domain/types";
export const brand: BrandConfig = {
  displayName: "Paraguay Next",
  contacts: {},
  timezone: "America/Asuncion",
  locales: [...supportedLocales],
  approved: false,
  contactsApproved: false,
};

// Owner approved public destinations; this does not approve the business launch.
export const directContacts = {
  name: "Yonatan Levin",
  whatsappNumber: "+972544941176",
  whatsappUrl: "https://wa.me/972544941176",
  calendlyUrl: "https://calendly.com/yonatanlevin-esteaoeste/30min",
  calendlySource: "paraguay-next",
} as const;
