import "server-only";
import type { Locale } from "../domain/types";
import { editorialText } from "../lib/i18n/editorial";

export const taxOpportunityCopy = {
  title: "Keep more of your international income, when the facts fit.",
  intro:
    "The right combination of residence, income and business structure can create a meaningful tax advantage. Explore the opportunities separately, then assess how they could work together for you.",
  dividendTitle:
    "Potential 0% Paraguayan personal income tax on qualifying foreign dividends",
  dividendBody:
    "In nonbinding consultation 380, DNIT concluded that the foreign dividends described in that case were outside Paraguayan national taxes because their source was foreign. This is a concrete opportunity to investigate for people receiving dividends from a company abroad.",
  dividendLimit:
    "The answer depends on the facts and is not a universal 0% tax rate. A US LLC distribution is not automatically a foreign dividend. Your income classification and obligations in every relevant country need separate review.",
  structuresTitle: "Two structures. Different opportunities.",
  usTitle: "A US LLC for an international business",
  usBody:
    "A US LLC can be worth considering for an international business whose owner and activities are outside the United States. Its federal income tax treatment usually follows the owner when it has one member and has not elected corporate taxation.",
  usOpportunity:
    "For owners who are not US citizens or US tax residents, qualifying foreign source income that is not effectively connected with a US trade or business may fall outside US federal income tax. The LLC itself is not a tax exemption.",
  usExample:
    "A case to review: a nonresident owner provides consulting entirely outside the US through a single member LLC, has not elected corporate taxation and has no income effectively connected with a US business. That income may have no US federal income tax, but the countries where the owner lives and works still matter.",
  usObligations:
    "Filing can remain mandatory even when no income tax is due. A foreign owned disregarded LLC may need Form 5472 and a pro forma Form 1120 for reportable related party transactions. State taxes, fees, withholding and other countries’ taxes must also be checked.",
  paraguayTitle: "A Paraguay company for local operations",
  paraguayBody:
    "An EAS or SRL gives a local business a Paraguayan company structure, distinct from a US LLC. Consider it when your plan involves operating in Paraguay and you need to organize company administration alongside your personal residency.",
  paraguayOpportunity:
    "Ordinary company income tax is 10% IRE on net taxable income. That provides a concrete starting point for comparing your operating structure and costs, rather than treating all business revenue as tax free.",
  paraguayObligations:
    "Dividend taxes, VAT and reporting may also apply. Foreign customers do not create a blanket exemption: Article 6 has specific rules for foreign income of IRE taxpayers. Company formation does not guarantee a bank account.",
  counterTitle: "Working from Paraguay changes the question",
  counterBody:
    "If you are working from Paraguay for foreign clients, using a US LLC or receiving payment abroad does not by itself make the income foreign source under Paraguayan rules. Where services are performed matters. The US LLC example does not establish an exemption in Paraguay.",
  residenceTitle: "Residency opens the planning conversation",
  residenceBody:
    "A residence permit, tax residence and company ownership are separate matters. Paraguay has a separate tax residence certification process. Your former country may retain taxing rights, and US citizens or US tax residents can remain taxable on worldwide income.",
  conclusion:
    "Choose the structure around your income, where you work and where you are taxable. A US LLC plus Paraguay residency is a combination to assess, not a promise of zero tax worldwide.",
  taxLink: "Explore my tax options",
  usLink: "Explore US company setup",
  paraguayLink: "Explore Paraguay company setup",
  compareLink: "Compare residency and business tax opportunities",
  inquiry: "Discuss this structure",
  taxInquiry: "Discuss my tax planning options",
  sourceR3: "DNIT: Law 6380/19, income source and business taxes",
  sourceR4: "DNIT: nonbinding consultation 380 on foreign dividends",
  sourceR5: "IRS: single member LLC treatment",
  sourceR6: "IRS: nonresident exclusions from income",
  sourceR7: "IRS: where personal service income is sourced",
  sourceR8: "IRS: effectively connected income",
  sourceR9: "IRS: Form 5472 reporting instructions",
  sourceR10: "IRS: international individual tax questions",
  sourceR11: "MIC: Paraguayan EAS, SA and SRL company forms",
  sourceR12: "DNIT: tax residence certification",
  sourceR13: "DNIT: General Resolution 65/2020",
} as const;

export function taxText(locale: Locale, key: keyof typeof taxOpportunityCopy) {
  return editorialText(locale, taxOpportunityCopy[key]);
}
