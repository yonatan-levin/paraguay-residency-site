export const benefitIds = [
  "legal-base",
  "longer-term",
  "tax-planning",
  "life-and-budget",
] as const;
export type BenefitId = (typeof benefitIds)[number];
export const motivationIds = [
  "move",
  "second-base",
  "local-business",
  "financial-planning",
] as const;
export type MotivationId = (typeof motivationIds)[number];

// Anchor destinations are owned by the application, never supplied by query text.
export const routeAnchors = {
  "": ["benefits"],
  home: ["benefits"],
  "paraguay-residency": ["benefits"],
  "why-paraguay": [
    "at-a-glance",
    "residency",
    "second-base",
    "financial-planning",
    "life-and-budget",
    "local-business",
    "considerations",
    "next-step",
  ],
} as const;
export type AnchorId = (typeof routeAnchors)[keyof typeof routeAnchors][number];
export interface EvaluationDestination {
  route: string;
  anchor?: AnchorId;
}
export const benefitDestinations: Record<BenefitId, EvaluationDestination> = {
  "legal-base": { route: "paraguay-residency", anchor: "benefits" },
  "longer-term": { route: "permanent-residency" },
  "tax-planning": { route: "tax-planning" },
  "life-and-budget": { route: "why-paraguay", anchor: "life-and-budget" },
};
export const motivationDestinations: Record<
  MotivationId,
  EvaluationDestination
> = {
  move: { route: "relocation" },
  "second-base": { route: "why-paraguay", anchor: "second-base" },
  "local-business": { route: "company-formation/paraguay" },
  "financial-planning": { route: "why-paraguay", anchor: "financial-planning" },
};
export function resolveMotivation(
  id: unknown,
): (EvaluationDestination & { id: MotivationId }) | undefined {
  const known = motivationIds.find((value) => value === id);
  return known ? { id: known, ...motivationDestinations[known] } : undefined;
}
