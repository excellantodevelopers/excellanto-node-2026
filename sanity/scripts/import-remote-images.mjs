/**
 * Downloads external image URLs already stored in Sanity and uploads them
 * as assets so they can be managed in the Media tool.
 *
 * Run from sanity/: npm run import-images
 */
import { createClient } from "@sanity/client";
import { createRequire } from "module";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const { LexoRank } = require("lexorank");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..", "..");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(__dirname, "..", ".env"));
loadEnvFile(path.join(__dirname, "..", "..", ".env"));
loadEnvFile(path.join(__dirname, "..", "..", ".env.local"));

function readCliAuthToken() {
  const candidates = [
    path.join(os.homedir(), ".config", "sanity", "config.json"),
    path.join(os.homedir(), "AppData", "Roaming", "sanity", "config.json"),
  ];
  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) continue;
    try {
      const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (parsed.authToken) return parsed.authToken;
    } catch {
      // ignore unreadable config
    }
  }
  return undefined;
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const token = process.env.SANITY_AUTH_TOKEN || readCliAuthToken();

if (!projectId) throw new Error("Missing SANITY_STUDIO_PROJECT_ID in sanity/.env");
if (!token) {
  throw new Error("Missing Sanity auth token. Run `npx sanity login` in sanity/, then try again.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const blogImageUrls = {
  "seo-vs-aeo-vs-aio-vs-geo-key-differences": [
    "https://excellanto.com/wp-content/uploads/2026/05/SEO-services.jpeg",
  ],
  "ai-seo-and-digital-marketing-agency-delhi": [
    "https://excellanto.com/wp-content/uploads/2026/05/Digital-Marketing.jpeg",
  ],
  "cyber-security-services-in-new-friends-colony-delhi": [
    "https://excellanto.com/wp-content/uploads/2026/03/medium-shot-men-working-together-office-2.jpg",
  ],
  "digital-marketing-company-in-east-of-kailash-delhi": [
    "https://excellanto.com/wp-content/uploads/2026/05/Digital-Marketing.jpeg",
  ],
  "seo-services-provider-near-govindpuri-delhi": [
    "https://excellanto.com/wp-content/uploads/2026/05/SEO-services.jpeg",
  ],
};

const refBlogsPath = path.join(repoRoot, "scripts", "ref-blogs.json");
if (fs.existsSync(refBlogsPath)) {
  const scraped = JSON.parse(fs.readFileSync(refBlogsPath, "utf8"));
  for (const [pageUrl, entry] of Object.entries(scraped)) {
    const slug = Object.keys(blogImageUrls).find((item) => pageUrl.includes(item));
    if (!slug || !Array.isArray(entry?.images)) continue;
    blogImageUrls[slug].push(...entry.images);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function looksLikeImage(buffer, contentType = "") {
  if (!buffer || buffer.length < 12) return false;
  if (contentType.startsWith("text/html")) return false;
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return true;
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;
  if (buffer.slice(0, 4).toString("ascii") === "GIF8") return true;
  if (buffer.slice(0, 4).toString("ascii") === "RIFF" && buffer.slice(8, 12).toString("ascii") === "WEBP") return true;
  const head = buffer.slice(0, 200).toString("utf8").trimStart().toLowerCase();
  if (head.startsWith("<svg") || (head.startsWith("<?xml") && head.includes("<svg"))) return true;
  return contentType.startsWith("image/") && !head.startsWith("<!doctype") && !head.startsWith("<html");
}

function filenameFromUrl(url) {
  try {
    const name = decodeURIComponent(new URL(url).pathname.split("/").pop() || "image");
    return name.replace(/[^a-zA-Z0-9._-]/g, "-") || "image.jpg";
  } catch {
    return "image.jpg";
  }
}

function readLocalFile(url) {
  let pathname = "";
  try {
    pathname = new URL(url, "https://excellanto.com").pathname;
  } catch {
    return null;
  }
  const relative = decodeURIComponent(pathname).replace(/^\/+/, "");
  const filePath = path.join(repoRoot, "public", relative);
  if (!filePath.startsWith(path.join(repoRoot, "public"))) return null;
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return null;
  return fs.readFileSync(filePath);
}

async function fetchBuffer(url) {
  if (!/^https?:/i.test(url)) return null;
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*,*/*" },
    redirect: "follow",
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) return null;
  const buffer = Buffer.from(await response.arrayBuffer());
  const type = response.headers.get("content-type") || "";
  return looksLikeImage(buffer, type) ? buffer : null;
}

async function downloadFromWayback(url) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const lookup = await fetch(
      `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`,
      { headers: { "User-Agent": "excellanto-cms-import" }, signal: AbortSignal.timeout(25000) }
    );
    if (lookup.status === 429) {
      await sleep(4000 * (attempt + 1));
      continue;
    }
    if (!lookup.ok) return null;
    const data = await lookup.json();
    const snap = data?.archived_snapshots?.closest;
    if (!snap?.available || !snap.url) return null;
    const rawUrl = snap.url.includes("id_/")
      ? snap.url
      : snap.url.replace(/\/web\/(\d+)\//, "/web/$1id_/");
    return fetchBuffer(rawUrl);
  }
  return null;
}

const assetByUrl = new Map();
const failedUrls = [];

async function uploadUrl(url) {
  if (assetByUrl.has(url)) return assetByUrl.get(url);
  const local = readLocalFile(url);
  let buffer = local;
  let source = local ? "local" : "";
  if (!buffer) {
    buffer = await fetchBuffer(url);
    source = buffer ? "origin" : "";
  }
  if (!buffer) {
    buffer = await downloadFromWayback(url);
    source = buffer ? "archive" : "";
  }
  if (!buffer) {
    assetByUrl.set(url, null);
    if (url.startsWith("http") && !failedUrls.includes(url)) {
      failedUrls.push(url);
      console.warn(`Could not download ${url}`);
    }
    return null;
  }
  const asset = await client.assets.upload("image", buffer, { filename: filenameFromUrl(url) });
  assetByUrl.set(url, asset._id);
  console.log(`Uploaded ${filenameFromUrl(url)} (${source}) -> ${asset._id}`);
  return asset._id;
}

function walk(node, visit) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) walk(item, visit);
    return;
  }
  visit(node);
  for (const value of Object.values(node)) walk(value, visit);
}

function attachImage(node, assetId) {
  node.image = {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

async function assignServiceOrder() {
  const services = await client.fetch(
    `*[_type == "service" && !(_id in path("drafts.**"))] | order(sortOrder asc, title asc) { _id, orderRank }`
  );
  let rank = LexoRank.min();
  const tx = client.transaction();
  let count = 0;
  for (const service of services) {
    rank = rank.genNext().genNext();
    if (service.orderRank) continue;
    tx.patch(service._id, { set: { orderRank: rank.toString() } });
    count += 1;
  }
  if (count) await tx.commit();
  console.log(`Service order ranks added: ${count}. Already ranked: ${services.length - count}.`);
}

async function main() {
  const docs = await client.fetch(
    `*[!(_id in path("drafts.**")) && _type in [
      "siteSettings", "homepage", "aboutPage", "contactPage", "servicesPage", "blogPage",
      "service", "testimonial", "blog", "legalPage"
    ]]`
  );

  let documentsUpdated = 0;
  let imagesAttached = 0;

  for (const doc of docs) {
    let changed = false;
    const pending = [];
    walk(doc, (node) => {
      if (node._type !== "siteImage" || typeof node.url !== "string") return;
      if (!node.url.startsWith("http") && !node.url.startsWith("/")) return;
      if (node.image?.asset?._ref) return;
      pending.push(node);
    });

    if (doc._type === "blog" && !doc.featuredImage?.asset?._ref) {
      const urls = blogImageUrls[doc.slug?.current] || [];
      for (const url of [...new Set(urls)]) {
        const assetId = await uploadUrl(url);
        if (!assetId) continue;
        doc.featuredImage = {
          _type: "image",
          alt: doc.title,
          asset: { _type: "reference", _ref: assetId },
        };
        changed = true;
        imagesAttached += 1;
        break;
      }
    }

    for (const node of pending) {
      const assetId = await uploadUrl(node.url);
      if (!assetId) continue;
      attachImage(node, assetId);
      changed = true;
      imagesAttached += 1;
    }

    if (doc._type === "service" && doc.image && !doc.image.image?.asset?._ref && doc.slug?.current) {
      const slug = doc.slug.current;
      const candidates = [
        `/images/services/${slug}.png`,
        `/images/services/${slug}.jpg`,
        `/images/services/${slug}.jpeg`,
        `/images/services/banners/${slug}.jpg`,
      ];
      for (const url of candidates) {
        const assetId = await uploadUrl(url);
        if (!assetId) continue;
        attachImage(doc.image, assetId);
        if (!doc.image.url) doc.image.url = url;
        changed = true;
        imagesAttached += 1;
        break;
      }
    }

    if (!changed) continue;
    await client.createOrReplace(doc);
    documentsUpdated += 1;
    console.log(`Updated ${doc._id}`);
  }

  const publicImages = path.join(repoRoot, "public", "images");
  const localFiles = [];
  const collectFiles = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) collectFiles(full);
      else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(entry.name)) localFiles.push(full);
    }
  };
  collectFiles(publicImages);
  for (const filePath of localFiles) {
    const url = `/${path.relative(path.join(repoRoot, "public"), filePath).replace(/\\/g, "/")}`;
    await uploadUrl(url);
  }

  await assignServiceOrder();

  const uploaded = [...assetByUrl.values()].filter(Boolean).length;
  console.log(
    `Done. Unique assets uploaded: ${uploaded}. Image fields attached: ${imagesAttached}. Documents updated: ${documentsUpdated}. Failed URLs: ${failedUrls.length}.`
  );
  if (failedUrls.length) {
    console.log("These URLs are no longer available:");
    for (const url of failedUrls) console.log(`- ${url}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
