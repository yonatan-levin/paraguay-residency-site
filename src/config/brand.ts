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
