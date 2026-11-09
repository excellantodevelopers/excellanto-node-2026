import { writeFileSync } from "fs";

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
    .replace(/\s+/g, " ")
    .trim();
}

const urls = [
  "https://excellanto.com/seo-vs-aeo-vs-aio-vs-geo-key-differences.htm",
  "https://excellanto.com/ai-seo-and-digital-marketing-agency-delhi.htm",
  "https://excellanto.com/cyber-security-services-in-new-friends-colony-delhi.htm",
  "https://excellanto.com/wp-sitemap-posts-post-1.xml",
  "https://excellanto.com/blog/page/2/",
];

const out = {};
for (const url of urls) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
  const t = await r.text();
  if (url.includes("sitemap")) {
    const locs = [...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    out[url] = { status: r.status, locs };
    console.log(r.status, url, locs.length);
    continue;
  }
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
      .filter((p) => p.length > 30 && !p.startsWith("Excellanto is at the forefront")),
    images: [
      ...new Set(
        [...t.matchAll(/src=["']([^"']*wp-content\/uploads[^"']+)["']/gi)].map((m) => {
          try {
            return new URL(m[1], url).href;
          } catch {
            return m[1];
          }
        })
      ),
    ]
      .filter((u) => !/-\d+x\d+\./.test(u) && !/logo/i.test(u))
      .slice(0, 10),
  };
  console.log(r.status, out[url].finalUrl, out[url].title);
}

writeFileSync("scripts/ref-blogs.json", JSON.stringify(out, null, 2));
