import { writeFileSync } from "fs";

async function get(url) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    redirect: "follow",
  });
  const t = await r.text();
  return { status: r.status, url: r.url, html: t };
}

// Discover about / blog post URLs from homepage + blog + sitemap
const seeds = [
  "https://excellanto.com/",
  "https://excellanto.com/blog/",
  "https://excellanto.com/sitemap.xml",
  "https://excellanto.com/sitemap_index.xml",
  "https://excellanto.com/wp-sitemap.xml",
  "https://excellanto.com/page-sitemap.xml",
];

const found = new Set();
for (const s of seeds) {
  try {
    const { status, html } = await get(s);
    console.log(status, s);
    for (const m of html.matchAll(/https?:\/\/excellanto\.com\/[a-z0-9\-\/%]+/gi)) {
      found.add(decodeURIComponent(m[0].replace(/\/$/, "") + "/").replace("/%/", "/"));
    }
    for (const m of html.matchAll(/href=["'](https?:\/\/excellanto\.com[^"']+|\/[^"'#]+)["']/gi)) {
      const u = new URL(m[1], "https://excellanto.com/").href;
      if (u.includes("excellanto.com")) found.add(u);
    }
  } catch (e) {
    console.log("fail", s, e.message);
  }
}

const interesting = [...found]
  .filter(
    (u) =>
      /about|blog|contact|service|privacy|terms|seo|digital|cyber|marketing|staffing|cloud|mobile|website|ai-|home|industr/i.test(
        u
      )
  )
  .sort();

writeFileSync("scripts/ref-urls.json", JSON.stringify(interesting, null, 2));
console.log("urls", interesting.length);
interesting.forEach((u) => console.log(u));
