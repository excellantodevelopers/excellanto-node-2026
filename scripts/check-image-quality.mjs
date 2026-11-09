import { writeFileSync } from "fs";

const candidates = [
  "2026/02/AI-meeting_50.png",
  "2024/05/ch4-img-1.webp",
  "2024/05/ch4-img-2.webp",
  "2024/05/ch4-img-3.webp",
  "2024/05/80-Photoroom-1.webp",
  "2024/05/80-Photoroom-1-1.webp",
  "2024/05/80-Photoroom-1-2.webp",
  "2026/03/young-employees-sitting-office-table-using-laptop-2.jpg",
  "2026/03/medium-shot-men-working-together-office.jpg",
  "2026/03/medium-shot-men-working-together-office-2.jpg",
  "2026/03/adult-woman-presenting-business-plan.jpg",
  "2026/05/strategy-business-brainstorming-graphic-concept.jpg",
  "2026/03/standard-quality-control-concept-m-1.jpg",
  "2026/03/standard-quality-control-concept-m-2.jpg",
  "2026/06/Digital-and-web.jpeg",
  "2026/03/person-using-ar-technology-perform-their-occupation.jpg",
  "2024/05/s4-img-1.webp",
  "2024/05/c4-img-1.webp",
  "2026/02/m07tejm07tejm07t.png",
  "2026/02/lvvknmlvvknmlvvk.png",
  "2026/03/57830.jpg",
  "2026/05/Digital-Marketing.jpeg",
];

const results = [];
for (const path of candidates) {
  const url = `https://excellanto.com/wp-content/uploads/${path}`;
  try {
    const r = await fetch(url, { method: "HEAD", headers: { "User-Agent": "Mozilla/5.0" } });
    results.push({
      path,
      status: r.status,
      type: r.headers.get("content-type"),
      size: Number(r.headers.get("content-length") || 0),
      kb: Math.round(Number(r.headers.get("content-length") || 0) / 1024),
    });
  } catch (e) {
    results.push({ path, error: String(e) });
  }
}

results.sort((a, b) => (b.kb || 0) - (a.kb || 0));
writeFileSync("scripts/image-quality-check.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
