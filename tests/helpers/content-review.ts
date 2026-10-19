import {
  claimReviews,
  type ClaimReviews,
} from "../../src/content/content-review";
import { supportedLocales } from "../../src/config/locales";

// Test identities are deliberately isolated from the unapproved production records.
export function approvedClaimReviews(): ClaimReviews {
  return Object.fromEntries(
    Object.entries(claimReviews).map(([id, record]) => [
      id,
      {
        ...record,
        content: {
          ...record.content,
          author: "Test author",
          reviewer: "Test professional",
          status: "reviewed",
          approvedAt: "2026-09-26",
        },
        operator: {
          status: "approved",
          reviewer: "Test operator",
          approvedAt: "2026-09-26",
        },
        translations: Object.fromEntries(
          supportedLocales.map((locale) => [
            locale,
            {
              status: "approved",
              reviewer: "Test translator",
              approvedAt: "2026-09-26",
            },
          ]),
        ),
      },
    ]),
  );
}
