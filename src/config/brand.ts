import { supportedLocales } from "./locales";
import type { BrandConfig } from "../domain/types";
export const brand: BrandConfig = {
  displayName: "Paraguay Residency Studio",
  contacts: {},
  timezone: "America/Asuncion",
  locales: [...supportedLocales],
  approved: false,
  contactsApproved: false,
};
