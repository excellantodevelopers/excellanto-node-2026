/**
 * Generate scripts/content-map.md from ref-content.json (quoted, no invention).
 */
const fs = require("fs");
const path = require("path");

const raw = JSON.parse(
  fs.readFileSync(path.join(__dirname, "ref-content.json"), "utf8")
);

const FOOTER_PHRASES = [
  "excellanto is at the forefront",
  "all rights reserved",
  "let's turn your social data",
  "let’s turn your social data",
  "partner with excellanto to build intelligent, insight-driven social media",
  "make smarter decisions with social media intelligence",
  "move beyond basic social media management",
  "work with excellanto to unlock the full potential of your social media",
];

function isFooter(text) {
  const t = (text || "").toLowerCase();
  return FOOTER_PHRASES.some((p) => t.includes(p));
}

function isBoilerplatePara(text) {
  const t = (text || "").trim();
  if (!t || t.length < 20) return true;
  if (isFooter(t)) return true;
  if (/^©/.test(t) || /copyright/i.test(t)) return true;
  if (/email:\s*support@/i.test(t)) return true;
  if (/📩/.test(t)) return true;
  return false;
}

const NAV_RE =
  /^(Services |Website Development|AI-Driven|Intelligent Cloud|Smart Home|IT Strategy|Predictive Performance|Social Media Intelligence|SEO Cognition|Staffing Recruitment|Contact Us|Privacy Policy|Terms condition|Sitemap Links|instagram|facebook|linkedin|\+91)/i;

function cleanList(items) {
  return (items || [])
    .map((t) =>
      String(t)
        .replace(/&#038;/g, "&")
        .replace(/^•\s*/, "")
        .trim()
    )
    .filter((t) => t && t.length >= 8)
    .filter((t) => !NAV_RE.test(t) || t.length > 70)
    .filter((t) => !isFooter(t))
    .filter(
      (t, i, a) => a.findIndex((x) => x.toLowerCase() === t.toLowerCase()) === i
    );
}

function pickImages(images) {
  return (images || [])
    .filter((u) => typeof u === "string")
    .filter((u) => u.includes("wp-content/uploads"))
    .filter((u) => !/-\d+x\d+\./.test(u))
    .filter((u) => !/logo/i.test(u))
    .filter((u) => !/favicon/i.test(u))
    .filter((u) => !/placeholder/i.test(u))
    .filter((u) => !/c4-br-/i.test(u))
    .filter((u, i, a) => a.indexOf(u) === i);
}

function scoreImage(url) {
  let s = 0;
  if (
    /person|adult|men|woman|office|business|technology|home|smart|cloud|marketing|seo|staff|team|quality|plan|ar-technology|social-media|holographic|solar|strategy|brainstorm/i.test(
      url
    )
  )
    s += 6;
  if (/c4-img|ch4-img|ch1-img|s4-img|h2-item|cap-img|feh-n3|cta-2/i.test(url))
    s += 3;
  if (/c4-phone|circle|cirlce|curcle|shape|bg-il/i.test(url)) s -= 1;
  if (/\/\d{2}\.png$/i.test(url)) s -= 2; // numbered icon tiles
  return s;
}

function findKey(slug) {
  return Object.keys(raw).find(
    (k) => k.includes("/" + slug + "/") || k.endsWith("/" + slug)
  );
}

function quote(s) {
  return s.replace(/\r\n/g, "\n").trim();
}

function mdQuoteBlock(lines) {
  return lines.map((l) => `> ${quote(l)}`).join("\n");
}

function mdBullets(items) {
  return items.map((i) => `- ${quote(i)}`).join("\n");
}

const servicesSpec = [
  {
    slug: "mobile-app-development",
    notes: null,
  },
  {
    slug: "website-development",
    notes: null,
  },
  {
    slug: "ai-driven-operations-automation",
    notes:
      "Footer CTA H1s about social media appear in scrape; excluded from Main H1s below.",
  },
  {
    slug: "intelligent-cloud-management",
    notes:
      "Footer CTA H1s about social media appear in scrape; excluded from Main H1s below.",
  },
  {
    slug: "smart-home-automation-powered-by-ai-llm-home-assistant",
    notes: null,
  },
  {
    slug: "it-strategy-innovation-consulting",
    notes:
      "WARNING: Scraped body text heavily overlaps Intelligent Cloud Management (cloud paragraphs/headings). Service-specific bullets still present in listItems. Footer social CTA H1s excluded.",
  },
  {
    slug: "predictive-performance-marketing",
    notes: "Footer social CTA H1s excluded.",
  },
  {
    slug: "social-media-intelligence",
    notes:
      "Scrape includes H1 \"Turning everyday operations into intelligent, automated systems\" (also on AI automation page) — likely template bleed; listed under Other H1s.",
  },
  {
    slug: "seo-cognition",
    notes:
      "First H1 is a long paragraph used as heading in the source. Footer social CTA excluded.",
  },
  {
    slug: "staffing-recruitment-service",
    notes: "Footer social CTA H1s excluded. Tech-domain detail is in paragraphs, not listItems.",
  },
];

let md = "";
md += `# Excellanto reference content map\n\n`;
md += `Source: \`scripts/ref-content.json\` (scraped from excellanto.com).\n`;
md += `Rule: text below is **quoted from the reference** only - nothing invented.\n`;
md += `Excluded globally: footer boilerplate starting with "Excellanto is at the forefront...", copyright lines, and shared footer CTAs about Social Media Intelligence.\n\n`;
md += `---\n\n`;

// HOMEPAGE
const home = raw["https://excellanto.com/"];
md += `# Homepage section map\n\n`;
md += `**URL:** https://excellanto.com/\n`;
md += `**Page title:** ${home.title}\n\n`;

md += `## Exact headings (in scrape order)\n\n`;
for (const h of home.headings || []) {
  if (!(h.text || "").trim()) continue;
  md += `- \`<${h.tag}>\` ${quote(h.text)}\n`;
}

md += `\n## Homepage section grouping (from headings + paragraphs)\n\n`;
md += `| Section (inferred) | Reference headings / signals |\n`;
md += `|---|---|\n`;
md += `| Hero | \`Digital Transformation\`; H1 \`AI Powered IT Solutions & Staffing\` |\n`;
md += `| Capabilities intro | \`Streamlining Operations Accelerating Outcomes\` + four pillars: \`Workflow & Process Automation\`, \`Data Analytics & Business Intelligence\`, \`Next Gen Digital Marketing\`, \`HR Recruitment Employee Engagement\` |\n`;
md += `| Why / value prop | \`why choose us\`; H2 \`Why Your Business Needs AI Powered IT Solution\` |\n`;
md += `| Featured services | \`our capabilities\` / \`our responsible\`; service titles: AI-Driven Operations Automation, Intelligent Cloud Management, IT Strategy & Innovation Consulting, Predictive Performance Marketing, Social Media Intelligence, SEO Cognition |\n`;
md += `| Process | \`our process\`; \`Our Work Process\`; steps: Project Definition, Project Analysis, Planning & Execution, Results Delivery |\n`;
md += `| Brands strip | \`We Build Modern Experience with Brands\` |\n`;
md += `| Why choose us (cards) | \`chy choose us\` / \`We Want to Work The Best!\`; cards: dedicated team, Award-Winning Expertise, 24/7 Hours Support, Clean & Structured Setup |\n`;
md += `| Blog | \`Our Blog\`; \`Latest News & Articles From the Blog\` |\n`;
md += `| CTA | \`contact us\`; \`Get AI Automation Solutions for Your Business\` |\n`;
md += `| Footer | \`Quick Links\`, \`say hello\`, \`support@excellanto.com\` |\n`;

md += `\n## Key homepage paragraphs (first meaningful, boilerplate excluded)\n\n`;
const homeParas = (home.paragraphs || [])
  .map((p) => quote(p))
  .filter((p) => !isBoilerplatePara(p));
homeParas.slice(0, 12).forEach((p, i) => {
  md += `${i + 1}. ${p}\n\n`;
});

md += `## Best homepage content images (full-size wp-content/uploads, logos/resized excluded)\n\n`;
const homeImgs = pickImages(home.images).sort(
  (a, b) => scoreImage(b) - scoreImage(a)
);
homeImgs.slice(0, 12).forEach((u) => {
  md += `- ${u}\n`;
});

md += `\n## Invented content on OUR current site that is NOT on the reference homepage\n\n`;
md += `Compared against homepage scrape in \`ref-content.json\` and our \`src/app/page.tsx\` + \`src/lib/data.ts\` + section components.\n\n`;
md += `### Entire sections present on our homepage but absent from reference homepage\n\n`;
md += `1. **Statistics strip** (\`Statistics\` / \`stats\`): values/labels such as “150+ Projects Delivered”, “50+ Enterprise Clients”, “98% Client Satisfaction”, “24/7 Support Availability” — **not** in homepage headings/paragraphs.\n`;
md += `2. **Technology Stack** (\`Technologies\`): eyebrow “Technology Stack”, title “Modern tools for resilient digital platforms”, and tech names (Python, Node.js, React, Angular, Next.js, TypeScript, MySQL, PostgreSQL, AWS, Azure, Docker, Kubernetes, TensorFlow, OpenAI, SAP SuccessFactors, WordPress) — **not** on homepage.\n`;
md += `3. **Industries** (\`Industries\`): eyebrow “Industries”, title “Supporting businesses across sectors with tailored solutions”, and industry cards (E-Commerce, Healthcare, Finance, Education, Travel, Real Estate, Technology & SaaS, Manufacturing) — **not** on homepage (industries appear on some *service* pages, e.g. mobile).\n`;
md += `4. **Testimonials** (\`Testimonials\`): title “Trusted by forward-thinking organizations” and invented quotes/authors (Priya Sharma / Horizon Tech, James Okonkwo / Meridian Retail, Ananya Mehta / Finora) — **not** on homepage.\n\n`;

md += `### Invented copy / UI chrome inside sections that *do* map to the homepage\n\n`;
md += `| Our site element | Invented text (not in homepage scrape) |\n`;
md += `|---|---|\n`;
md += `| Hero badge | “Digital Transformation · AI-First Delivery” (reference has “Digital Transformation” only as heading; “AI-First Delivery” not on homepage) |\n`;
md += `| Hero CTAs | “Start a Conversation”, “Explore Services” |\n`;
md += `| Hero visual | “AI / Core Engine” center label; floating cards “Automation / Workflow intelligence”, “Cloud Ops / Hybrid & multi-cloud”, “Security / Predictive monitoring”, “AI Insights / Decision intelligence” |\n`;
md += `| Hero trust badges | “ISO-Aligned Delivery”, “Global IT Services”, “Enterprise Ready”, “AI-First Approach” |\n`;
md += `| Hero mini-stats | Same invented \`stats\` numbers as Statistics section |\n`;
md += `| Capabilities section title | We use “Streamlining Operations. Accelerating Outcomes.” (close to reference “Streamlining Operations Accelerating Outcomes”) — OK-ish; capability *card body blurbs* in \`capabilities\` are paraphrased, not verbatim homepage |\n`;
md += `| Services section | Title “Enterprise services engineered for measurable outcomes”; description “From AI automation and cloud intelligence…” — **not** on homepage (reference uses “our capabilities” + service name headings) |\n`;
md += `| Why Choose Us overlay | “Built for enterprises that demand excellence”; chips “AI-First Delivery”, “Secure by Design”, “Measurable ROI”, “Global Reach”; “98% Satisfaction / Across enterprise engagements” |\n`;
md += `| Process section title | “A structured path from discovery to measurable results” — reference uses “Our Work Process” |\n`;
md += `| Process intro paraphrase | Shortened vs reference process intro paragraph |\n`;
md += `| CTA supporting line | “Ready to streamline operations, strengthen security, and accelerate growth? Let's design an intelligent technology roadmap…” — reference CTA heading is “Get AI Automation Solutions for Your Business” without this invented sentence in homepage headings |\n`;
md += `| Blog titles in our data | Our \`blogs\` slugs/titles (East of Kailash / Govindpuri posts) — homepage scrape only shows placeholder blog titles “x” with date “January 1, 2020”, plus one paragraph title “SEO vs AEO vs AIO vs GEO…” |\n\n`;

md += `### Note: content that *is* grounded in homepage reference\n\n`;
md += `- H1 “AI Powered IT Solutions & Staffing”\n`;
md += `- Capability pillars and featured service names listed above\n`;
md += `- Why-choose card titles and matching body paragraphs from homepage\n`;
md += `- Process step titles and matching step paragraphs\n`;
md += `- CTA heading “Get AI Automation Solutions for Your Business”\n`;
md += `- Opening hero/capabilities paragraphs that match homepage paragraphs 1–2 and service blurbs 3–8\n\n`;

md += `---\n\n`;
md += `# Service pages\n\n`;

for (const spec of servicesSpec) {
  const key = findKey(spec.slug);
  const page = raw[key];
  const headings = (page.headings || []).filter((h) => (h.text || "").trim());

  const h1All = headings.filter((h) => h.tag === "h1").map((h) => quote(h.text));
  const h1Main = h1All.filter((t) => !isFooter(t));
  const h1Other = h1All.filter((t) => isFooter(t));

  const paragraphs = (page.paragraphs || [])
    .map((p) => quote(p))
    .filter((p) => !isBoilerplatePara(p))
    .slice(0, 8);

  // Feature headings: h3/h4/h5 that look like offerings (exclude footer/quick links)
  const featureHeadings = headings
    .filter((h) => ["h2", "h3", "h4", "h5"].includes(h.tag))
    .map((h) => quote(h.text))
    .filter((t) => !isFooter(t))
    .filter((t) => !/^(Quick Links|say hello|support@)/i.test(t))
    .filter((t) => t.length < 120);

  let bullets = cleanList(page.listItems).filter((t) => t.length < 220);

  // Prefer capability-looking bullets; keep industries if present
  // For pages with few bullets, keep all cleaned

  // Industry extraction
  const industries = [];
  const indH1Idx = headings.findIndex(
    (h) => h.tag === "h1" && /industr/i.test(h.text || "")
  );
  if (indH1Idx >= 0) {
    for (let i = indH1Idx + 1; i < headings.length; i++) {
      const h = headings[i];
      if (h.tag === "h1" || h.tag === "h2") break;
      if (h.tag === "h4" && h.text?.trim()) industries.push(quote(h.text));
    }
  }
  // From list items
  const industryFromLists = bullets.filter((t) =>
    /^(IT and technology|E-commerce|Healthcare|Financial|Manufacturing|Real estate|Technology and SaaS|SaaS and technology|Service-based|Startups|B2B|Retail)/i.test(
      t
    ) || /companies$|businesses$|organizations$|firms$|platforms$|brands$/i.test(t)
  );

  const imgs = pickImages(page.images).sort(
    (a, b) => scoreImage(b) - scoreImage(a)
  );

  md += `## \`${spec.slug}\`\n\n`;
  md += `**URL:** ${key}\n`;
  md += `**Page title:** ${page.title}\n`;
  if (spec.notes) md += `\n> Note: ${spec.notes}\n`;

  md += `\n### Main H1 titles\n\n`;
  if (h1Main.length === 0) md += `_None (empty or only footer H1s in scrape)_\n`;
  else h1Main.forEach((t) => (md += `- ${t}\n`));
  if (h1Other.length) {
    md += `\n_Footer/pollution H1s excluded from main list:_\n`;
    h1Other.forEach((t) => (md += `- ~~${t}~~\n`));
  }

  md += `\n### Key paragraphs (first ~8 meaningful)\n\n`;
  paragraphs.forEach((p, i) => {
    md += `${i + 1}. ${p}\n\n`;
  });

  md += `### Feature / capability headings & bullets\n\n`;
  md += `**Headings (quoted):**\n\n`;
  // Deduplicate feature headings
  const featH = [...new Set(featureHeadings)];
  if (featH.length === 0) md += `_No non-footer h2–h5 feature headings._\n`;
  else featH.forEach((t) => (md += `- ${t}\n`));

  md += `\n**List items that look like real service features** (nav/footer removed):\n\n`;
  if (bullets.length === 0) md += `_No feature list items beyond navigation/footer in scrape._\n`;
  else {
    // Cap very long lists but keep substance
    const show = bullets.slice(0, 40);
    show.forEach((t) => (md += `- ${t}\n`));
    if (bullets.length > 40)
      md += `\n_… ${bullets.length - 40} additional cleaned list items omitted for length; see JSON._\n`;
  }

  md += `\n### Industry names\n\n`;
  if (industries.length) {
    md += `From “Industries We Serve” headings:\n\n`;
    industries.forEach((t) => (md += `- ${t}\n`));
  }
  if (industryFromLists.length) {
    md += `\nFrom list items:\n\n`;
    [...new Set(industryFromLists)].forEach((t) => (md += `- ${t}\n`));
  }
  if (!industries.length && !industryFromLists.length) {
    md += `_None explicitly listed as industry names on this page scrape._\n`;
  }

  md += `\n### Best hero / content image URLs\n\n`;
  if (!imgs.length) md += `_No qualifying wp-content/uploads images._\n`;
  else {
    imgs.slice(0, 8).forEach((u) => (md += `- ${u}\n`));
  }

  md += `\n---\n\n`;
}

// Extra: staffing domain paragraphs (beyond first 8) — user asked for key content
md += `# Appendix: Staffing tech-domain paragraphs (beyond first 8)\n\n`;
md += `Quoted from staffing page (meaningful body after the first 8; still excluding footer):\n\n`;
const staffing = raw[findKey("staffing-recruitment-service")];
staffing.paragraphs
  .map((p) => quote(p))
  .filter((p) => !isBoilerplatePara(p))
  .slice(8, 21)
  .forEach((p, i) => {
    md += `${i + 9}. ${p}\n\n`;
  });

md += `---\n\n_Generated from \`ref-content.json\` for content alignment work. Do not treat footer CTA duplicates as service-specific copy._\n`;

fs.writeFileSync(path.join(__dirname, "content-map.md"), md, "utf8");
console.log("Wrote content-map.md (", md.length, "chars)");
