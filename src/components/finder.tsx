"use client";
import { translate } from "../lib/i18n/common";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FinderQuestion, Locale } from "../domain/types";
import {
  getFinderQuestions,
  recommendPlan,
  updateFinderAnswer,
} from "../domain/finder";
import { getPackage, getService } from "../content/catalog";
import { formatPrice, priceBasisLabel } from "../domain/pricing";
import { localeDirections } from "../config/locales";
import { journeyHref } from "../domain/selection";
import { text, ui } from "../content/ui";
import { JourneyLink, useJourney, useSelection } from "./journey-provider";
import { PageIntro, Section } from "./primitives";

export function PlanFinder({ locale }: { locale: Locale }) {
  const journey = useJourney();
  const router = useRouter();
  const { answers, setAnswers } = journey;
  const selection = useSelection();
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (
      selection.campaign === "family-relocation" &&
      !Object.keys(answers).length
    )
      setAnswers({ goal: "residency", household: "family" });
  }, [selection.campaign, answers, setAnswers]);
  const questions = getFinderQuestions(journey.answers);
  const current = questions[Math.min(step, questions.length - 1)];
  const content: Record<
    FinderQuestion,
    { title: string; options: [string, string, string][] }
  > = {
    goal: {
      title: text(locale, "What would you like help with?"),
      options: [
        [
          "residency",
          text(locale, "Residency assistance"),
          text(locale, "My first application or my next residency stage."),
        ],
        [
          "relocation",
          text(locale, "Settling into Paraguay"),
          text(locale, "Arrival planning and practical local coordination."),
        ],
        [
          "business",
          text(locale, "Business setup"),
          text(locale, "Discuss a business and its professional requirements."),
        ],
        [
          "tax",
          text(locale, "Tax consultation"),
          text(locale, "Questions for a qualified tax professional."),
        ],
        [
          "property",
          text(locale, "Property support"),
          text(locale, "Coordinate a carefully scoped property discussion."),
        ],
        [
          "investment",
          text(locale, "Investment or business residency route"),
          text(locale, "A specialist discussion, not an eligibility decision."),
        ],
      ],
    },
    stage: {
      title: text(locale, "Where are you in your residency journey?"),
      options: [
        [
          "new",
          text(locale, "This would be my first residency"),
          text(locale, "I am exploring or preparing an initial application."),
        ],
        [
          "temporary",
          text(locale, "I am a temporary resident"),
          text(
            locale,
            "I would like to discuss a permanent residency upgrade.",
          ),
        ],
        [
          "permanent",
          text(locale, "I am already a permanent resident"),
          text(locale, "I need practical support for what comes next."),
        ],
      ],
    },
    household: {
      title: text(locale, "Who are you planning for?"),
      options: [
        [
          "individual",
          text(locale, "Just me"),
          text(locale, "An individual starting point."),
        ],
        [
          "couple",
          text(locale, "My partner and me"),
          text(locale, "We will need a tailored household quote."),
        ],
        [
          "family",
          text(locale, "My family"),
          text(
            locale,
            "A family quote, with shared costs and individual needs confirmed.",
          ),
        ],
      ],
    },
    timing: {
      title: text(locale, "When are you thinking of taking the next step?"),
      options: [
        [
          "soon",
          text(locale, "Soon"),
          text(locale, "I would like to discuss preparation now."),
        ],
        [
          "this-year",
          text(locale, "Later this year"),
          text(locale, "I have time to organize the details."),
        ],
        [
          "exploring",
          text(locale, "I am just exploring"),
          text(locale, "I am comparing options without a fixed date."),
        ],
      ],
    },
    support: {
      title: text(locale, "How much practical support would feel right?"),
      options: [
        [
          "essential",
          text(locale, "Essential: a clear framework"),
          text(locale, "I prefer to organize most practical details myself."),
        ],
        [
          "guided",
          text(locale, "Guided: help connecting the steps"),
          text(locale, "I value more coordination and preparation support."),
        ],
        [
          "concierge",
          text(locale, "Concierge: closer logistical support"),
          text(locale, "I would like a more personal coordination scope."),
        ],
      ],
    },
  };
  const reasonCopy: Record<string, string> = {
    "support-essential": text(
      locale,
      "You prefer independent preparation with a clear framework.",
    ),
    "support-guided": text(
      locale,
      "You value more coordination between the required steps.",
    ),
    "support-concierge": text(
      locale,
      "You would like to discuss closer logistical assistance.",
    ),
    "existing-temporary-resident": text(
      locale,
      "You already hold temporary residency, so an upgrade discussion is the relevant starting point.",
    ),
    "already-permanent-resident": text(
      locale,
      "You already hold permanent residency, so practical relocation support is a better starting point.",
    ),
    "household-quote": text(
      locale,
      "Your household needs a tailored quote. No family total is calculated.",
    ),
    "relocation-discussion": text(
      locale,
      "Your priority is support for arrival and settling in.",
    ),
    "business-discussion": text(
      locale,
      "Your goal is business setup; professional scope needs review.",
    ),
    "tax-discussion": text(
      locale,
      "Your tax questions need a qualified professional review.",
    ),
    "property-discussion": text(
      locale,
      "Your property plans need a scoped assistance discussion.",
    ),
    "investment-discussion": text(
      locale,
      "An investment route requires specialist review, including capital and obligations.",
    ),
  };
  function focusStep() {
    requestAnimationFrame(() => heading.current?.focus());
  }
  function choose(value: string) {
    if (!started.current) {
      journey.analytics.emit({
        eventId: "finder_started",
        routeKey: "find-my-plan",
        locale,
        is_demo: true,
      });
      started.current = true;
    }
    journey.setAnswers(updateFinderAnswer(journey.answers, current, value));
    journey.setFinderResult(undefined);
    journey.setSelection({ campaign: selection.campaign });
    router.replace(
      journeyHref(locale, "find-my-plan", { campaign: selection.campaign }),
      { scroll: false },
    );
  }
  function next() {
    if (step < questions.length - 1) setStep(step + 1);
    else {
      const result = recommendPlan(journey.answers);
      journey.setFinderResult(result);
      journey.setSelection({
        serviceId: result.serviceId,
        packageId: result.packageId,
        campaign: selection.campaign,
      });
      journey.analytics.emit({
        eventId: "finder_completed",
        routeKey: "find-my-plan",
        locale,
        planId: result.packageId,
        serviceId: result.serviceId,
        is_demo: true,
      });
      setComplete(true);
    }
    focusStep();
  }
  const result = complete ? recommendPlan(journey.answers) : undefined;
  const item = getPackage(result?.packageId);
  const service = getService(result?.serviceId);
  return (
    <>
      <PageIntro title={text(locale, "Find your starting point")}>
        <p>
          {text(
            locale,
            "A short guide to the support that may suit you. This is not a legal eligibility decision.",
          )}
        </p>
      </PageIntro>
      <Section className="finder-section">
        <div className="finder-container">
          <div className="finder-skip">
            <JourneyLink locale={locale} route="book">
              {ui[locale].skip}
            </JourneyLink>
            <JourneyLink locale={locale} route="pricing">
              {ui[locale].compare}
            </JourneyLink>
          </div>
          {selection.campaign === "family-relocation" && (
            <p className="notice">
              {text(
                locale,
                "Family planning is prefilled. You can change who is moving at the household question.",
              )}
            </p>
          )}
          {result ? (
            <div
              data-testid="finder-result"
              className="finder-result"
              aria-live="polite"
            >
              <p className="eyebrow">
                {text(locale, "A possible starting point")}
              </p>
              <h2 ref={heading} tabIndex={-1}>
                {item?.name[locale] ?? service?.name[locale]}
              </h2>
              <p className="lead">{service?.name[locale]}</p>
              {item && (
                <>
                  <p className="price">
                    <bdi dir={localeDirections[locale]}>
                      {result.familyQuote
                        ? ui[locale].family
                        : formatPrice(item.price, locale)}
                    </bdi>
                  </p>
                  <p className="small">
                    {!result.familyQuote && priceBasisLabel(item.price, locale)}
                  </p>
                  <p className="price-notice">{ui[locale].provisional}</p>
                </>
              )}
              <h3>{text(locale, "Why this may fit")}</h3>
              <ul className="check-list">
                {result.reasons.map((reason) => (
                  <li key={reason}>{reasonCopy[reason]}</li>
                ))}
              </ul>
              <div className="notice">
                <strong>{text(locale, "Still to be confirmed")}</strong>
                <p>
                  {text(
                    locale,
                    "Professional review, your exact delivery scope, required visits and external costs. Timing preferences never imply faster approval.",
                  )}
                </p>
              </div>
              <div className="button-row">
                <JourneyLink
                  locale={locale}
                  route="book"
                  selection={{
                    serviceId: result.serviceId,
                    packageId: result.packageId,
                    campaign: selection.campaign,
                  }}
                  className="button"
                >
                  {ui[locale].discuss}
                </JourneyLink>
                <JourneyLink
                  locale={locale}
                  route="pricing"
                  className="button button-outline"
                >
                  {text(locale, "Compare alternatives")}
                </JourneyLink>
              </div>
              <button
                className="text-button"
                onClick={() => {
                  setComplete(false);
                  setStep(0);
                  focusStep();
                }}
              >
                {text(locale, "Edit my answers")}
              </button>
            </div>
          ) : (
            <div className="question-panel">
              <p className="eyebrow">
                {translate(locale, "Step {step} of {total}", {
                  step: step + 1,
                  total: questions.length,
                })}
              </p>
              <div className="progress-track" aria-hidden="true">
                <span
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
              <fieldset>
                <legend>
                  <h2 ref={heading} tabIndex={-1}>
                    {content[current].title}
                  </h2>
                </legend>
                <div className="finder-options">
                  {content[current].options.map(
                    ([value, label, description]) => (
                      <label key={value}>
                        <input
                          type="radio"
                          name={current}
                          value={value}
                          checked={journey.answers[current] === value}
                          onChange={() => choose(value)}
                        />
                        <span>
                          <strong>{label}</strong>
                          <small>{description}</small>
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </fieldset>
              <div className="finder-actions">
                <button
                  type="button"
                  className="button button-outline"
                  data-testid="finder-back"
                  disabled={step === 0}
                  onClick={() => {
                    setStep(step - 1);
                    focusStep();
                  }}
                >
                  {text(locale, "Back")}
                </button>
                <button
                  type="button"
                  className="button"
                  data-testid="finder-next"
                  disabled={!journey.answers[current]}
                  onClick={next}
                >
                  {step === questions.length - 1
                    ? text(locale, "See my starting point")
                    : text(locale, "Continue")}
                </button>
              </div>
              <p className="small muted">
                {text(locale, "No contact details needed to see your result.")}
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
