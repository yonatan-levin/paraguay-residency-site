import type { FinderAnswers, FinderQuestion, FinderResult } from "./types";
export function getFinderQuestions(answers: FinderAnswers): FinderQuestion[] {
  return answers.goal === "residency" || !answers.goal
    ? [
        "goal",
        "stage",
        "household",
        "timing",
        ...(answers.stage === "temporary" || answers.stage === "permanent"
          ? []
          : ["support" as const]),
      ]
    : ["goal", "household", "timing"];
}
const allowedAnswers: Record<FinderQuestion, readonly string[]> = {
  goal: [
    "residency",
    "relocation",
    "business",
    "tax",
    "property",
    "investment",
  ],
  stage: ["new", "temporary", "permanent"],
  household: ["individual", "couple", "family"],
  timing: ["soon", "this-year", "exploring"],
  support: ["essential", "guided", "concierge"],
};
export function updateFinderAnswer(
  answers: FinderAnswers,
  key: FinderQuestion,
  value: string,
): FinderAnswers {
  if (!allowedAnswers[key].includes(value)) return answers;
  if (key === "goal" && answers.goal !== value)
    return {
      goal: value as FinderAnswers["goal"],
      ...(answers.household ? { household: answers.household } : {}),
      ...(answers.timing ? { timing: answers.timing } : {}),
    };
  const next = { ...answers, [key]: value };
  if (key === "stage" && value !== "new") delete next.support;
  return next;
}
export function recommendPlan(answers: FinderAnswers): FinderResult {
  let serviceId = "temporary-residency";
  let packageId = `temporary-${answers.support ?? "essential"}`;
  const reasons: string[] = [];
  if (answers.goal === "residency" && answers.stage === "temporary") {
    serviceId = "permanent-residency";
    packageId = "upgrade-basic";
    reasons.push("existing-temporary-resident");
  } else if (answers.goal === "residency" && answers.stage === "permanent") {
    serviceId = "relocation";
    packageId = "relocation-orientation";
    reasons.push("already-permanent-resident");
  } else if (answers.goal && answers.goal !== "residency") {
    const destinations = {
      relocation: ["relocation", "relocation-orientation"],
      business: ["paraguay-company", "paraguay-company-setup"],
      tax: ["tax-planning", "tax-planning"],
      property: ["property-assistance", "property-assistance"],
      investment: ["investor-residency", "investor-support"],
    } as const;
    [serviceId, packageId] = destinations[answers.goal];
    reasons.push(`${answers.goal}-discussion`);
  } else reasons.push(`support-${answers.support ?? "essential"}`);
  const familyQuote =
    answers.household === "family" || answers.household === "couple";
  if (familyQuote) reasons.push("household-quote");
  return {
    serviceId,
    packageId,
    familyQuote,
    reasons,
    unconfirmed: ["professional-review", "external-costs", "delivery-scope"],
  };
}
