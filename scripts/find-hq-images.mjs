import { writeFileSync } from "fs";

const candidates = [
  "2026/03/medium-shot-men-working-together-office.jpg",
  "2026/03/medium-shot-men-working-together-office-2.jpg",
  "2026/03/young-employees-sitting-office-table-using-laptop-2.jpg",
  "2026/03/young-employees-sitting-office-table-using-laptop-2-1.jpg",
  "2026/03/adult-woman-presenting-business-plan.jpg",
  "2026/05/strategy-business-brainstorming-graphic-concept.jpg",
  "2026/03/person-using-ar-technology-perform-their-occupation.jpg",
  "2026/03/57830.jpg",
  "2026/03/apps-workplace-social-media-holding-profession.jpg",
  "2026/03/social-media-marketing-concept-marketing-with-applications-1.jpg",
  "2026/03/cheerful-team-engineers-using-laptop-server-farm-analyzing-data-1.jpg",
  "2026/03/group-industry-experts-engineers-analyzing-solar-panel-systems-1-1.jpg",
  "2026/03/futuristic-time-machine-1.jpg",
  "2026/03/woman-interacting-with-futuristic-holographic-interface-1.jpg",
  "2026/02/m07tejm07tejm07t.png",
  "2026/02/lvvknmlvvknmlvvk.png",
  "2026/06/03e9f018-0b9a-4653-afc1-224bee02976b.jpg",
  "2026/03/gHTQKKoosjK5crf_RyXzH7yvSAB6XUsz2SmGn_RECriO-kAXpt1tMtJjc2qUKIyDmRlY-tq2tqx7emdSCucueyMuPyQHPy-reIgiD6u-GZhJrgYEx15hZOgaPW5NwwFaPM2mJgtv0X2XC-U50ZZ_J-amINUAK3XZGmUBcBh4JgENz0Um80YH5w9MhCWEt7VJ.jpg",
];

const results = [];
for (const path of candidates) {
  const url = `https://excellanto.com/wp-content/uploads/${path}`;
  const r = await fetch(url, { method: "HEAD", headers: { "User-Agent": "Mozilla/5.0" } });
  results.push({
    path,
    status: r.status,
    kb: Math.round(Number(r.headers.get("content-length") || 0) / 1024),
  });
}
results.sort((a, b) => b.kb - a.kb);
writeFileSync("scripts/hq-images.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
