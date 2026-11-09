import { writeFileSync } from "fs";

const urls = [
  "https://excellanto.com/",
  "https://excellanto.com/about-us/",
  "https://excellanto.com/contact-us/",
  "https://excellanto.com/blog/",
  "https://excellanto.com/mobile-app-development/",
  "https://excellanto.com/website-development/",
  "https://excellanto.com/ai-driven-operations-automation/",
  "https://excellanto.com/intelligent-cloud-management/",
  "https://excellanto.com/smart-home-automation-powered-by-ai-llm-home-assistant/",
  "https://excellanto.com/it-strategy-innovation-consulting/",
  "https://excellanto.com/predictive-performance-marketing/",
  "https://excellanto.com/social-media-intelligence/",
  "https://excellanto.com/seo-cognition/",
  "https://excellanto.com/staffing-recruitment-service/",
  "https://excellanto.com/privacy-policy/",
  "https://excellanto.com/terms-condition/",
  "https://excellanto.com/seo-vs-aeo-vs-aio-vs-geo-key-differences-in-modern-search-optimization/",
];

function abs(base, src) {
  try {
    return new URL(src, base).href;
  } catch {
    return src;
  }
}

function clean(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const out = {};

for (const url of urls) {
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ExcellantoContentAudit/1.0)" },
      redirect: "follow",
    });
    const t = await r.text();
    const imgs = [...t.matchAll(/src=["']([^"']+\.(?:jpg|jpeg|png|webp|svg|gif)[^"']*)["']/gi)].map(
      (m) => abs(url, m[1])
    );
    const srcsets = [...t.matchAll(/srcset=["']([^"']+)["']/gi)].flatMap((m) =>
      m[1]
        .split(",")
        .map((p) => p.trim().split(/\s+/)[0])
        .filter(Boolean)
        .map((s) => abs(url, s))
    );
    const bg = [...t.matchAll(/url\((['"]?)([^)'"]+)\1\)/gi)]
      .map((m) => abs(url, m[2]))
      .filter((u) => /\.(jpg|jpeg|png|webp|svg|gif)/i.test(u));

    const uniqueImgs = [...new Set([...imgs, ...srcsets, ...bg])].filter(
      (u) =>
        !u.includes("data:") &&
        !u.includes("gravatar") &&
        !u.includes("facebook.com") &&
        !u.includes("google")
    );

    const title = (t.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || "";
    const headings = [...t.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
      tag: m[1].toLowerCase(),
      text: clean(m[2]),
    }));
    const paragraphs = [...t.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((m) => clean(m[1]))
      .filter((p) => p.length > 15);

    const listItems = [...t.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => clean(m[1]))
      .filter((p) => p.length > 8 && p.length < 300);

    out[url] = {
      status: r.status,
      finalUrl: r.url,
      title: clean(title),
      headings,
      paragraphs: paragraphs.slice(0, 80),
      listItems: listItems.slice(0, 80),
      images: uniqueImgs.slice(0, 80),
    };
    console.log(r.status, url, "imgs", uniqueImgs.length, "paras", paragraphs.length);
  } catch (e) {
    out[url] = { error: String(e) };
    console.log("FAIL", url, e);
  }
}

writeFileSync("scripts/ref-content.json", JSON.stringify(out, null, 2));
console.log("Wrote scripts/ref-content.json");
