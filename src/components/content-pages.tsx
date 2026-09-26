import { editorialText } from "../lib/i18n/editorial";
import Link from "next/link";
import type { Locale } from "../domain/types";
import { packages, services } from "../content/catalog";
import { getServiceDetail } from "../content/service-details";
import { getGuide } from "../content/guide";
import { brand } from "../config/brand";
import { formatPrice } from "../domain/pricing";
import { text, ui } from "../content/ui";
import { JourneyLink } from "./journey-provider";
import { WhatsAppButton } from "./shell";
import { FAQAccordion, PackageCard, PageIntro, Section } from "./primitives";

export function ServicePage({
  locale,
  route,
}: {
  locale: Locale;
  route: string;
}) {
  const service = services.find((item) => item.routeKey === route);
  const detail = getServiceDetail(route, locale);
  if (!service || !detail) return null;
  const relevant = packages.filter(
    (item) =>
      item.serviceId === service.id ||
      (route === "investor-residency" && item.serviceId === "business-route"),
  );
  return (
    <>
      <PageIntro
        title={service.name[locale]}
        eyebrow={text(locale, "Practical support, clearly scoped")}
      >
        <p>{detail.intro}</p>
      </PageIntro>
      <Section className="service-intro">
        <div className="two-column">
          <div>
            <h2>{text(locale, "Is this the right conversation for you?")}</h2>
            <p>{detail.audience}</p>
            <JourneyLink
              locale={locale}
              route="book"
              selection={{ serviceId: service.id }}
              className="button"
              cta="service-inquiry"
            >
              {text(locale, "Discuss this service")}
            </JourneyLink>
          </div>
          <div className="service-note">
            <p className="eyebrow">{text(locale, "Preview scope")}</p>
            <h3>
              {text(locale, "Agree the responsibilities before you begin.")}
            </h3>
            <p>
              {text(
                locale,
                "Service scope, fees and professional responsibilities are not approved for sale. This page supports an informed initial discussion; it does not determine legal eligibility.",
              )}
            </p>
          </div>
        </div>
      </Section>
      <Section className="soft-section">
        <div className="two-column">
          <div>
            <h2>{text(locale, "Assistance to discuss")}</h2>
            <ul className="check-list service-list">
              {detail.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{text(locale, "Dependencies and exclusions")}</h2>
            <ul className="plain-list">
              {detail.dependencies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section>
        <h2>{text(locale, "A considered way forward.")}</h2>
        <ol className="service-steps">
          {detail.steps.map((step, index) => (
            <li key={step}>
              <span className="step-number" aria-hidden="true">
                0{index + 1}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </Section>
      {relevant.length > 0 && (
        <Section className="soft-section">
          <div className="section-heading">
            <div>
              <h2>{text(locale, "A starting point for your scope.")}</h2>
            </div>
            <p>{ui[locale].provisional}</p>
          </div>
          <div
            className={`package-grid ${relevant.length === 2 ? "two-packages" : relevant.length === 1 ? "one-package" : ""}`}
          >
            {relevant.map((item) => (
              <PackageCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </Section>
      )}
      <Section>
        <div className="two-column">
          <div>
            <h2>{text(locale, "Questions to resolve together.")}</h2>
            {route === "paraguay-residency" && (
              <div className="resource-links">
                <JourneyLink locale={locale} route="pricing">
                  {text(locale, "Compare all residency packages")}
                </JourneyLink>
                <Link href={`/${locale}/guides/residency-requirements`}>
                  {text(locale, "Read the preparation guide")}
                </Link>
              </div>
            )}
          </div>
          <FAQAccordion locale={locale} items={detail.faqs} />
        </div>
      </Section>
      <Section className="review-section">
        <h2>{text(locale, "Content and source notes")}</h2>
        <p>
          {text(
            locale,
            "Editorial draft. Qualified reviewer, review date and commercial approval are pending. Nothing on this page is individual legal, tax or investment advice.",
          )}
        </p>
        {service.review.sourceUrls.length > 0 && (
          <ul>
            {service.review.sourceUrls.map((url) => (
              <li key={url}>
                <a href={url}>
                  {text(locale, "Source reference")}: {new URL(url).hostname}
                </a>
              </li>
            ))}
          </ul>
        )}
        <JourneyLink
          locale={locale}
          route="book"
          selection={{ serviceId: service.id }}
          className="button"
        >
          {text(locale, "Discuss this service")}
        </JourneyLink>
      </Section>
    </>
  );
}

export function ServicesIndex({ locale }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        title={editorialText(
          locale,
          "Practical support for the life you are planning.",
        )}
        eyebrow={editorialText(locale, "Residency, relocation & business")}
      >
        <p>
          {editorialText(
            locale,
            "Start with the goal that matters now. Each service has its own scope, dependencies and questions to resolve before a real engagement.",
          )}
        </p>
      </PageIntro>
      <Section className="service-intro">
        <div className="services-grid">
          {services
            .filter((item) => item.id !== "business-route")
            .map((item) => (
              <article key={item.id}>
                <p className="eyebrow">
                  {item.category === "residency"
                    ? editorialText(locale, "Residency")
                    : item.category === "relocation"
                      ? editorialText(locale, "Relocation")
                      : item.category === "business"
                        ? editorialText(locale, "Business & professional")
                        : editorialText(locale, "Practical support")}
                </p>
                <h2>
                  <Link href={`/${locale}/${item.routeKey}`}>
                    {item.name[locale]}
                  </Link>
                </h2>
                <p>
                  {getServiceDetail(item.routeKey, locale)?.intro ??
                    item.scope[locale].join(" ")}
                </p>
                <Link href={`/${locale}/${item.routeKey}`}>
                  {editorialText(locale, "Explore the scope")}
                </Link>
              </article>
            ))}
        </div>
      </Section>
    </>
  );
}

export function GuidesIndex({ locale }: { locale: Locale }) {
  const guide = getGuide(locale);
  return (
    <>
      <PageIntro
        title={editorialText(
          locale,
          "Prepare better questions. Make more considered decisions.",
        )}
        eyebrow={editorialText(locale, "Practical guides")}
      >
        <p>
          {editorialText(
            locale,
            "Useful preparation starts with knowing what needs confirming. Read our first guide before ordering documents or making travel commitments.",
          )}
        </p>
      </PageIntro>
      <Section className="service-intro">
        <article className="guide-card">
          <p className="eyebrow">
            {editorialText(locale, "Document preparation · Editorial draft")}
          </p>
          <h2>
            <Link href={`/${locale}/guides/residency-requirements`}>
              {guide.title}
            </Link>
          </h2>
          <p>{guide.summary}</p>
          <Link
            className="button button-outline"
            href={`/${locale}/guides/residency-requirements`}
          >
            {editorialText(locale, "Read the preparation guide")}
          </Link>
        </article>
      </Section>
    </>
  );
}

export function ResidencyGuide({ locale }: { locale: Locale }) {
  const guide = getGuide(locale);
  return (
    <>
      <div className="container breadcrumbs">
        <nav aria-label={editorialText(locale, "Breadcrumbs")}>
          <Link href={`/${locale}`}>{editorialText(locale, "Home")}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${locale}/guides`}>
            {editorialText(locale, "Guides")}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{editorialText(locale, "Residency preparation")}</span>
        </nav>
      </div>
      <PageIntro
        title={guide.title}
        eyebrow={editorialText(locale, "Preparation guide · Editorial draft")}
      >
        <p>{guide.summary}</p>
      </PageIntro>
      <Section className="guide-body">
        <div className="article-layout">
          <aside className="contents">
            <h2>{editorialText(locale, "In this guide")}</h2>
            <nav aria-label={editorialText(locale, "Guide contents")}>
              {guide.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>
          <article className="article-content">
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <section id="sources">
              <h2>{editorialText(locale, "Sources and review boundary")}</h2>
              <p>{guide.reviewNote}</p>
              <ul>
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url}>{source.label}</a>
                  </li>
                ))}
              </ul>
              <dl className="review-fields">
                <div>
                  <dt>{editorialText(locale, "Editorial status")}</dt>
                  <dd>
                    {editorialText(locale, "Draft for professional review")}
                  </dd>
                </div>
                <div>
                  <dt>{editorialText(locale, "Qualified reviewer")}</dt>
                  <dd>{editorialText(locale, "Not yet assigned")}</dd>
                </div>
                <div>
                  <dt>{editorialText(locale, "Professional review date")}</dt>
                  <dd>
                    {editorialText(
                      locale,
                      "Pending; no approved legal checklist is implied",
                    )}
                  </dd>
                </div>
              </dl>
            </section>
            <section className="notice">
              <h2>
                {editorialText(
                  locale,
                  "Turn your questions into a starting point.",
                )}
              </h2>
              <p>
                {editorialText(
                  locale,
                  "Explore residency support and compare what each provisional package covers.",
                )}
              </p>
              <div className="button-row">
                <JourneyLink
                  locale={locale}
                  route="paraguay-residency"
                  className="button"
                >
                  {editorialText(locale, "Explore residency assistance")}
                </JourneyLink>
                <JourneyLink locale={locale} route="pricing">
                  {editorialText(locale, "Compare packages")}
                </JourneyLink>
              </div>
            </section>
            <section>
              <h2>{editorialText(locale, "Related reading")}</h2>
              <p>
                {editorialText(
                  locale,
                  "This is the first guide in the preview. Additional guides will appear when their content and routes are ready.",
                )}
              </p>
              <Link href={`/${locale}/guides`}>
                {editorialText(locale, "Back to the guide hub")}
              </Link>
            </section>
          </article>
        </div>
      </Section>
    </>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        title={editorialText(
          locale,
          "A clear plan starts with clear responsibilities.",
        )}
        eyebrow={editorialText(locale, "About the working studio")}
      >
        <p>
          {editorialText(
            locale,
            "Paraguay Residency Studio is a working brand for this website prototype. The business story, operating entity and people will be published once supplied and approved.",
          )}
        </p>
      </PageIntro>
      <Section className="service-intro">
        <div className="two-column">
          <div>
            <h2>
              {editorialText(
                locale,
                "A service built around understandable scope.",
              )}
            </h2>
            <p>
              {editorialText(
                locale,
                "The proposed approach brings document organization, practical coordination and specialist questions into a plan a customer can follow. The service operator’s responsibility must be explicit before any real engagement.",
              )}
            </p>
            <p>
              {editorialText(
                locale,
                "Coordination is distinct from legal representation, tax advice, bank decisions and government processing. The relevant qualified professionals and institutions remain responsible for their own work and decisions.",
              )}
            </p>
          </div>
          <div className="service-note">
            <h2>{editorialText(locale, "People details are pending.")}</h2>
            <p>
              {editorialText(
                locale,
                "No stock person is presented as a team member. No office, credentials, language capacity or results are claimed.",
              )}
            </p>
            <ul className="plain-list">
              <li>
                {editorialText(
                  locale,
                  "Business owner and legal operator: to be approved.",
                )}
              </li>
              <li>
                {editorialText(
                  locale,
                  "Coordination contact and support hours: to be confirmed.",
                )}
              </li>
              <li>
                {editorialText(
                  locale,
                  "External professional roles and credentials: to be verified.",
                )}
              </li>
              <li>
                {editorialText(
                  locale,
                  "The relationship to any other business: not assumed.",
                )}
              </li>
            </ul>
          </div>
        </div>
      </Section>
      <Section className="soft-section">
        <h2>{editorialText(locale, "What transparency means here.")}</h2>
        <div className="process-grid about-principles">
          <article>
            <h3>{editorialText(locale, "Scope before commitment")}</h3>
            <p>
              {editorialText(
                locale,
                "Understand who does what and which costs remain external.",
              )}
            </p>
          </article>
          <article>
            <h3>{editorialText(locale, "Preparation over promises")}</h3>
            <p>
              {editorialText(
                locale,
                "No government approval, bank account or tax result is guaranteed.",
              )}
            </p>
          </article>
          <article>
            <h3>{editorialText(locale, "Individual questions matter")}</h3>
            <p>
              {editorialText(
                locale,
                "Family needs and professional obligations deserve proper review.",
              )}
            </p>
          </article>
          <article>
            <h3>{editorialText(locale, "Honest boundaries")}</h3>
            <p>
              {editorialText(
                locale,
                "This is a local demonstration. It does not accept real engagements.",
              )}
            </p>
          </article>
        </div>
      </Section>
      <Section>
        <JourneyLink locale={locale} route="contact" className="button">
          {editorialText(locale, "Explore the contact options")}
        </JourneyLink>
      </Section>
    </>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        title={text(locale, "Let’s make your next step clearer.")}
        eyebrow={ui[locale].contact}
      >
        <p>
          {text(
            locale,
            "Choose a way to explore the conversation. All contact actions in this preview are simulated.",
          )}
        </p>
      </PageIntro>
      <Section className="service-intro">
        <div className="contact-grid">
          <article>
            <span className="goal-icon" aria-hidden="true">
              ☷
            </span>
            <h2>{text(locale, "Start with your plans")}</h2>
            <p>
              {text(
                locale,
                "Request a conversation or choose a demo time. Your selected service and package stay with you.",
              )}
            </p>
            <JourneyLink locale={locale} route="book" className="button">
              {ui[locale].book}
            </JourneyLink>
          </article>
          <article>
            <span className="goal-icon" aria-hidden="true">
              ☏
            </span>
            <h2>{text(locale, "Preview a WhatsApp message")}</h2>
            <p>
              {text(
                locale,
                "See a conversation starter with your selected package. Sending is disabled.",
              )}
            </p>
            <WhatsAppButton locale={locale} className="button button-outline" />
          </article>
        </div>
        <div className="contact-details">
          <h2>{text(locale, "Business contact details")}</h2>
          <p>
            {text(
              locale,
              "Direct email, telephone, address and support hours have not been supplied or approved. They are unavailable in this preview.",
            )}
          </p>
          <p>
            {text(locale, "Team planning time zone")}:{" "}
            <strong>
              <bdi dir="ltr">{brand.timezone}</bdi>
            </strong>
            .{" "}
            {text(
              locale,
              "Demo appointments use your chosen viewer time zone.",
            )}
          </p>
        </div>
      </Section>
    </>
  );
}

export function PolicyPage({
  route,
  locale,
}: {
  route: string;
  locale: Locale;
}) {
  const content =
    route === "privacy"
      ? {
          title: "Privacy notice",
          sections: [
            [
              "How this preview handles test details",
              "The inquiry form asks for a first name, preferred contact channel and the detail needed for that channel. Notes and a separate marketing preference are optional. Use test details only. Contact drafts and demo receipts stay in browser memory, disappear on refresh, and are not sent to external providers or stored in local or session storage.",
            ],
            [
              "Measurement in the prototype",
              "Mock events use allowlisted route, locale, service, package and campaign categories. They do not include names, contact details, free text, raw URLs or questionnaire answers. No external analytics, advertising cookies or session replay runs in this preview.",
            ],
            [
              "What must be decided before launch",
              "The legal operator, applicable jurisdictions, processing purposes and lawful basis, processor list, retention and deletion periods, rights contact and security controls must be approved before real personal data is collected. The draft does not assert compliance with a particular law.",
            ],
            [
              "Your control in this demonstration",
              "Refreshing the page clears the form stored in browser memory and receipt. Marketing consent is separate, optional and unchecked by default; selecting it does not subscribe you to a real list. Do not enter passport details or sensitive documents.",
            ],
          ],
        }
      : route === "terms"
        ? {
            title: "Terms of use",
            sections: [
              [
                "A demonstration that does not create a contract",
                "This site demonstrates a proposed customer journey. The working brand, packages, prices and delivery scope are unapproved. A demo inquiry does not create a service contract, payment obligation, appointment or real message.",
              ],
              [
                "Scope and external dependencies",
                "Any future engagement will need a written scope identifying the legal operator, responsible professionals, deliverables, support boundaries, exclusions, external costs and customer responsibilities. No support level changes government processing priority or approval.",
              ],
              [
                "Commercial terms still to approve",
                "Payment schedules, taxes, cancellation and refund terms, withdrawal rights where applicable, recurring obligations, dispute terms and governing law require owner and qualified professional review. None is established by this draft.",
              ],
              [
                "Use of the preview",
                "Use fictional test details, review the proposed journey, and do not rely on the page as individual professional advice. No passport upload, payment collection or live service integration is available.",
              ],
            ],
          }
        : {
            title: "Service disclaimer",
            sections: [
              [
                "General information only",
                "Information on this website helps organize questions for an initial conversation. It is not individual legal, tax, immigration, investment or financial advice and is not a definitive eligibility assessment.",
              ],
              [
                "Independent decisions and responsibilities",
                "Government authorities, financial institutions and external professionals make their own decisions. Residency approval, banking access, investment returns, tax treatment, citizenship and processing dates are never guaranteed here.",
              ],
              [
                "Illustrative prices and unapproved scope",
                "All displayed USD values are provisional benchmark fixtures. Service fees must be distinguished from government charges, professional fees, qualifying capital, travel and continuing obligations. Family totals and package commitments require a confirmed written quote.",
              ],
              [
                "Review before reliance",
                "Content, professional responsibilities, brand details and commercial offers require approval before public launch. Confirm current requirements with a qualified provider before ordering documents, booking travel that cannot be refunded or making financial commitments.",
              ],
            ],
          };
  return (
    <>
      <PageIntro
        title={editorialText(locale, "{title}: preview draft", {
          title: editorialText(locale, content.title),
        })}
        eyebrow={editorialText(locale, "Unapproved policy draft")}
      >
        <p>
          {editorialText(
            locale,
            "This is a review draft for the prototype. The business owner and qualified advisers must approve the actual policy before public launch.",
          )}
        </p>
      </PageIntro>
      <Section className="service-intro">
        <article className="policy-content">
          {content.sections.map(([title, paragraph]) => (
            <section key={title}>
              <h2>{editorialText(locale, title)}</h2>
              <p>{editorialText(locale, paragraph)}</p>
            </section>
          ))}
          <p className="notice">
            {editorialText(
              locale,
              "Legal operator and policy contact: not supplied. Approval status: pending.",
            )}
          </p>
          <Link href={`/${locale}/contact`}>
            {editorialText(locale, "Contact options in this preview")}
          </Link>
        </article>
      </Section>
    </>
  );
}

export function RtlFixture() {
  return (
    <Section>
      <div className="rtl-fixture" dir="rtl" lang="he">
        <h1>בדיקת תצוגה מימין לשמאל</h1>
        <p>זוהי בדיקה פנימית בלבד. האתר בעברית זמין דרך תפריט השפות.</p>
        <article>
          <h2>תכנון מעבר לפרגוואי</h2>
          <p>בחרו תוכנית ובדקו את השלבים. המחירים להמחשה בלבד.</p>
          <p>
            <bdi>USD {formatPrice(packages[0].price, "en")}</bdi>. מחיר בדיקה;
            אינו הצעת מחיר.
          </p>
          <label htmlFor="rtl-email">דואר אלקטרוני לדוגמה</label>
          <input id="rtl-email" dir="ltr" readOnly value="test@example.test" />
          <label htmlFor="rtl-phone">מספר טלפון לדוגמה</label>
          <input id="rtl-phone" dir="ltr" readOnly value="+595 000 000 000" />
          <Link className="button" href="/en/pricing">
            לצפייה בחבילות באנגלית
          </Link>
        </article>
      </div>
    </Section>
  );
}
