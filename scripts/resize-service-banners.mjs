import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsDirs = [
  path.join(root, ".cursor", "projects", "c-Users-lenovo-Desktop-Excellanto", "assets"),
  path.join(process.env.USERPROFILE || "", ".cursor", "projects", "c-Users-lenovo-Desktop-Excellanto", "assets"),
  path.join(root, "assets"),
];
const outDir = path.join(root, "public", "images", "services", "banners");

const WIDTH = 1920;
const HEIGHT = 800;

/** slug -> generated source filename (without path) */
const bannerSources = {
  "mobile-app-development": "hero-mobile-app-development-v2.png",
  "website-development": "hero-website-development-v2.png",
  "ai-driven-operations-automation": "hero-ai-driven-operations-automation-v2.png",
  "intelligent-cloud-management": "hero-intelligent-cloud-management-v2.png",
  "smart-home-automation-powered-by-ai-llm-home-assistant": "hero-smart-home-automation-v2.png",
  "it-strategy-innovation-consulting": "hero-it-strategy-innovation-consulting-v2.png",
  "predictive-performance-marketing": "hero-predictive-performance-marketing-v2.png",
  "social-media-intelligence": "hero-social-media-intelligence-v2.png",
  "seo-cognition": "hero-seo-cognition-v2.png",
  "staffing-recruitment-service": "hero-staffing-recruitment-service-v2.png",
};

async function resolveSource(filename) {
  for (const dir of assetsDirs) {
    const candidate = path.join(dir, filename);
    try {
      await access(candidate);
      return candidate;
    } catch {
      // try next
    }
  }

  throw new Error(`Missing source image: ${filename}`);
}

await mkdir(outDir, { recursive: true });

for (const [slug, filename] of Object.entries(bannerSources)) {
  const source = await resolveSource(filename);
  const output = path.join(outDir, `${slug}.jpg`);

  await sharp(source)
    .resize(WIDTH, HEIGHT, {
      fit: "cover",
      position: "right",
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`✓ ${slug} -> ${output} (${meta.width}x${meta.height})`);
}
