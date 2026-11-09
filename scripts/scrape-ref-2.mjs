import { writeFileSync } from "fs";

const urls = [
  "https://excellanto.com/about/",
  "https://excellanto.com/services/",
  "https://excellanto.com/seo-vs-aeo-vs-aio-vs-geo-key-differences/",
  "https://excellanto.com/ai-seo-and-digital-marketing-agency-delhi/",
  "https://excellanto.com/cyber-security-services-in-new-friends-colony-delhi/",
  "https://excellanto.com/website-development/",
  "https://excellanto.com/smart-home-automation-powered-by-ai-llm-home-assistant/",
  "https://excellanto.com/intelligent-cloud-management/",
  "https://excellanto.com/it-strategy-innovation-consulting/",
  "https://excellanto.com/predictive-performance-marketing/",
  "https://excellanto.com/social-media-intelligence/",
  "https://excellanto.com/seo-cognition/",
  "https://excellanto.com/privacy-policy/",
  "https://excellanto.com/terms-condition/",
];

function clean(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const out = {};
for (const url of urls) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
  const t = await r.text();
  const imgs = [...t.matchAll(/src=["']([^"']+)["']/gi)]
    .map((m) => {
      try {
        return new URL(m[1], url).href;
      } catch {
        return m[1];
      }
    })
    .filter((u) => /wp-content\/uploads/i.test(u) && !/-\d+x\d+\./.test(u));
  out[url] = {
    status: r.status,
    finalUrl: r.url,
    title: clean((t.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || ""),
    headings: [...t.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
      tag: m[1].toLowerCase(),
      text: clean(m[2]),
    })),
    paragraphs: [...t.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((m) => clean(m[1]))
      .filter((p) => p.length > 20),
    listItems: [...t.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => clean(m[1]))
      .filter((p) => p.length > 5 && p.length < 400),
    images: [...new Set(imgs)].slice(0, 40),
  };
  console.log(r.status, url, "h", out[url].headings.length, "p", out[url].paragraphs.length);
}

writeFileSync("scripts/ref-content-2.json", JSON.stringify(out, null, 2));
console.log("done");
