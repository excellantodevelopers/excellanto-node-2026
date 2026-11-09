import { writeFileSync } from "fs";

const url = "https://excellanto.com/mobile-app-development/";

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
  .filter((u) => /wp-content\/uploads/i.test(u) && !/-\d+x\d+\./.test(u) && !/logo/i.test(u));

const out = {
  status: r.status,
  title: clean((t.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || ""),
  headings: [...t.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
    tag: m[1].toLowerCase(),
    text: clean(m[2]),
  })),
  paragraphs: [...t.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => clean(m[1]))
    .filter((p) => p.length > 20 && !p.startsWith("Excellanto is at the forefront")),
  images: [...new Set(imgs)].slice(0, 30),
};

writeFileSync("scripts/mobile-app-ref.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
