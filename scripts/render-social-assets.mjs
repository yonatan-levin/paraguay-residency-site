import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

// Social-card dimensions are the handoff's required Open Graph size.
const width = 1200;
const height = 630;
const cards = [
  {
    campaign: "residency-cost",
    locale: "he",
    kicker: "תושבות / חבילות ברורות",
    lines: ["להבין את העלויות.", "לתכנן את הפרק הבא."],
    foot: "הצעות זמניות · תצוגה מקדימה",
  },
  {
    campaign: "family-relocation",
    locale: "he",
    kicker: "משפחה / מעבר מתוכנן",
    lines: ["פרק חדש,", "מתכננים יחד."],
    foot: "הצעה למשפחה · תצוגה מקדימה",
  },
  {
    campaign: "residency-cost",
    locale: "en",
    kicker: "RESIDENCY / CLEAR PACKAGES",
    lines: ["Understand the cost.", "Plan your next chapter."],
    foot: "Provisional offers · Website preview",
  },
  {
    campaign: "family-relocation",
    locale: "en",
    kicker: "FAMILY / A CONSIDERED MOVE",
    lines: ["A new chapter,", "planned together."],
    foot: "Family quotes · Website preview",
  },
  {
    campaign: "residency-cost",
    locale: "es",
    kicker: "RESIDENCIA / PAQUETES CLAROS",
    lines: ["Conozca los costes.", "Planifique su futuro."],
    foot: "Ofertas provisionales · Vista previa",
  },
  {
    campaign: "family-relocation",
    locale: "es",
    kicker: "FAMILIA / UN CAMBIO PLANIFICADO",
    lines: ["Una nueva etapa,", "juntos y con claridad."],
    foot: "Presupuesto familiar · Vista previa",
  },
  {
    campaign: "residency-cost",
    locale: "fr",
    kicker: "RÉSIDENCE / FORMULES CLAIRES",
    lines: ["Comprendre les coûts.", "Préparer votre avenir."],
    foot: "Offres provisoires · Aperçu du site",
  },
  {
    campaign: "family-relocation",
    locale: "fr",
    kicker: "FAMILLE / UN PROJET RÉFLÉCHI",
    lines: ["Un nouveau chapitre,", "préparé ensemble."],
    foot: "Devis familial · Aperçu du site",
  },
  {
    campaign: "residency-cost",
    locale: "de",
    kicker: "AUFENTHALT / KLARE PAKETE",
    lines: ["Kosten verstehen.", "Die Zukunft planen."],
    foot: "Vorläufige Angebote · Websitevorschau",
  },
  {
    campaign: "family-relocation",
    locale: "de",
    kicker: "FAMILIE / EIN DURCHDACHTER UMZUG",
    lines: ["Ein neues Kapitel,", "gemeinsam geplant."],
    foot: "Familienangebot · Websitevorschau",
  },
];
for (const card of cards) {
  // Hebrew shares the existing text region without reversing the artwork or brand.
  const textX = card.locale === "he" ? 816 : 72;
  const textDirection =
    card.locale === "he" ? 'direction="rtl" text-anchor="start"' : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="1200" height="630" fill="#F7F8F5"/>
  <rect x="900" width="300" height="630" fill="#E7F0EB"/>
  <circle cx="1090" cy="315" r="230" fill="none" stroke="#12624C" stroke-width="2"/>
  <circle cx="1090" cy="315" r="175" fill="none" stroke="#12624C" stroke-width="2"/>
  <circle cx="1090" cy="315" r="120" fill="none" stroke="#12624C" stroke-width="2"/>
  <path d="M920 490l160-265 120 145v260H920z" fill="#12624C"/>
  <text x="72" y="90" font-family="Arial,sans-serif" font-size="26" fill="#142B3B">Paraguay Residency Studio</text>
  <text x="${textX}" y="187" ${textDirection} font-family="Arial,sans-serif" font-size="18" letter-spacing="${card.locale === "he" ? 0 : 2}" fill="#12624C">${card.kicker}</text>
  <g ${textDirection} font-family="Arial,sans-serif" font-weight="600" font-size="58" fill="#142B3B"><text x="${card.locale === "he" ? textX : 68}" y="288">${card.lines[0]}</text><text x="${card.locale === "he" ? textX : 68}" y="366">${card.lines[1]}</text></g>
  <path d="M72 459H816" stroke="#D8E2DC"/>
  <text x="${textX}" y="535" ${textDirection} font-family="Arial,sans-serif" font-size="23" fill="#52636D">${card.foot}</text>
  </svg>`;
  const file = fileURLToPath(
    new URL(
      `../public/og-${card.campaign}-${card.locale}.png`,
      import.meta.url,
    ),
  );
  await sharp(Buffer.from(svg)).png().toFile(file);
  console.log(file);
}

// Keep the original artwork and translate the text baked into the images.
const sourceCard = await readFile(
  new URL("../public/og-default.svg", import.meta.url),
  "utf8",
);
const sourceHero = await readFile(
  new URL("../public/hero-editorial.svg", import.meta.url),
  "utf8",
);
const artworkCopy = {
  he: [
    "הפרק הבא שלכם,",
    "בתכנון ברור.",
    "ליווי לתושבות. חבילות ברורות.",
    "תיאום מקומי.",
    "תצוגה מקדימה · מותג והצעות זמניים",
    "איור להמחשה · תמונה זמנית",
  ],
  es: [
    "Su próxima etapa,",
    "con un plan claro.",
    "Apoyo de residencia. Paquetes claros.",
    "Coordinación local.",
    "Vista previa · Marca y ofertas provisionales",
    "Ilustración editorial · Imagen provisional",
  ],
  fr: [
    "Votre prochain chapitre,",
    "clairement préparé.",
    "Aide à la résidence. Formules claires.",
    "Coordination locale.",
    "Aperçu du site · Marque et offres provisoires",
    "Illustration éditoriale · Visuel provisoire",
  ],
  de: [
    "Ihr nächstes Kapitel,",
    "klar geplant.",
    "Aufenthaltshilfe. Klare Pakete.",
    "Koordination vor Ort.",
    "Websitevorschau · Vorläufige Marke und Angebote",
    "Redaktionelle Illustration · Vorschaubild",
  ],
};
const sourceLines = [
  "Your next chapter,",
  "clearly planned.",
  "Residency support. Clear packages.",
  "Local coordination.",
  "Website preview · Working brand and provisional offers",
];
const artworkDescriptions = {
  he: "איור מקורי של חצר שטופת שמש, צמחייה טרופית ונהר הנשקף מבעד לקשת פתוחה. זו תמונה זמנית להמחשה ולא תצלום של נכס או משרד.",
  es: "Ilustración original de un patio soleado, plantas tropicales y un río visto a través de un arco. Es una imagen provisional, no una fotografía de una propiedad u oficina.",
  fr: "Illustration originale d’une cour ensoleillée, de plantes tropicales et d’une rivière au delà d’une arche. Ce visuel provisoire ne représente pas la photographie d’un bien ou d’un bureau.",
  de: "Originalillustration eines sonnigen Innenhofs, tropischer Pflanzen und eines Flusses hinter einem offenen Bogen. Dies ist ein vorläufiges Bild, keine Fotografie einer Immobilie oder eines Büros.",
};
for (const [locale, lines] of Object.entries(artworkCopy)) {
  let svg = sourceCard;
  sourceLines.forEach((line, index) => {
    if (!svg.includes(line))
      throw new Error(`Missing source artwork text: ${line}`);
    svg = svg.replaceAll(line, lines[index]);
  });
  if (locale === "he") {
    svg = svg
      .replace('letter-spacing="-2"', 'letter-spacing="0"')
      .replace(
        /<text x="(?:70|72)"/g,
        '<text x="667" direction="rtl" text-anchor="start"',
      )
      .replace(
        /<title id="title">[^<]*<\/title>/,
        '<title id="title">תצוגה מקדימה של Paraguay Residency Studio</title>',
      )
      .replace(
        /<desc id="desc">[^<]*<\/desc>/,
        `<desc id="desc">איור עם קשת פתוחה ונוף. ${lines[0]} ${lines[1]} המותג וההצעות זמניים.</desc>`,
      );
  }
  await sharp(Buffer.from(svg))
    .png()
    .toFile(
      fileURLToPath(
        new URL(`../public/og-default-${locale}.png`, import.meta.url),
      ),
    );
  let hero = sourceHero
    .replaceAll(
      "Editorial illustration · Preview artwork",
      lines[sourceLines.length],
    )
    .replace(
      /<title id="title">[^<]*<\/title>/,
      `<title id="title">${lines[0]} ${lines[1]}</title>`,
    )
    .replace(
      /<desc id="desc">[^<]*<\/desc>/,
      `<desc id="desc">${artworkDescriptions[locale]}</desc>`,
    );
  if (locale === "he")
    hero = hero.replace('<text x="430"', '<text direction="rtl" x="430"');
  if (hero === sourceHero) throw new Error("Missing source hero caption");
  await writeFile(
    new URL(`../public/hero-editorial-${locale}.svg`, import.meta.url),
    hero,
  );
  console.log(`Localized ${locale} default card and editorial artwork`);
}
