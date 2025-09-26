// overlay-into-ai24.mjs — FULL SKELETON FRAMEWORK (additive-only)
// Creates previews, emergency page, all skeleton routes, SEO/system stubs, content folders, zero-click packs, and helpers.
// It WILL NOT overwrite existing files.

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";

const today = new Date().toISOString().slice(0,10);
const root = process.cwd();

function out(p, s) {
  const f = join(root, p);
  mkdirSync(dirname(f), { recursive: true });
  if (!existsSync(f)) writeFileSync(f, s);
}
function stub(title, body) {
  return `export const metadata={title:${JSON.stringify(title)}};export default function Page(){return(<main style={{padding:'2rem',maxWidth:1000,margin:'0 auto'}}><h1>${title}</h1><p>${body}</p></main>)}`
}

// ----- Previews -----
out("app/preview/home/ai24/page.tsx", stub("AI24 Home Preview","Working homepage preview."));
out("app/preview/home/lux/page.tsx",  stub("Luxury Home Preview","Targeting screenshots.zip aesthetics."));
out("app/preview/chat/classic/page.tsx", stub("Chat UI — Classic Preview","Same API brain; classic visuals."));
out("app/preview/chat/luxe/page.tsx",    stub("Chat UI — Luxe Preview","Glassy + gold halo + particles + voice button."));
out("app/preview/light/page.tsx", stub("Light Theme Preview","Theme parity check."));
out("app/preview/ink/page.tsx",   stub("Ink Theme Preview","Theme parity check."));
out("app/styleguide/page.tsx",    stub("Styleguide","Tokens / components / micro-FX gallery."));
out("app/health/page.tsx", "export default function Page(){ return <pre>ok</pre>; }");

// ----- Emergency page -----
out("app/emergency-dentist/page.tsx", `export const metadata={title:"Emergency Dentist in Shoreham-by-Sea"};
export default function Page(){
  return (
    <main style={{padding:'2rem',maxWidth:900,margin:'0 auto'}}>
      <h1>Emergency Dentist</h1>
      <p><strong>If you are in pain, swelling, or have trauma:</strong> call <a href="tel:01273453109">01273 453109</a>. For severe issues out of hours, call <strong>NHS 111</strong>.</p>
      <h2>Opening hours</h2>
      <p>Mon–Thu 08:30–17:00 · Fri 08:30–16:00</p>
      <h2>What you can do now (short tips)</h2>
      <ul>
        <li>Toothache: usual pain relief you can tolerate; avoid very hot/cold foods.</li>
        <li>Lost filling: pharmacy temporary filling material can help until seen.</li>
        <li>Swelling: do not apply heat; seek urgent dental assessment.</li>
        <li>Bleeding after extraction: bite firmly on clean gauze for 20–30 minutes.</li>
      </ul>
      <p style={{marginTop:'1rem'}}>This page is general information only. Please contact us for clinical advice.</p>
    </main>
  );
}`);

// ----- Skeleton routes -----
const routes = [
 "about","team","team/[slug]","treatments",
 "treatments/teeth-whitening","treatments/3d-printed-veneers","treatments/3d-same-day-dentures",
 "treatments/spark-aligners","treatments/orthodontics",
 "treatments/implants","treatments/implants/restorations","treatments/implants/same-day-implants",
 "treatments/implants/all-on-4-6-same-day","treatments/implants/3d-printed-implant-restorations",
 "treatments/general-dentistry","treatments/general-dentistry/examinations","treatments/general-dentistry/oral-cancer-check",
 "treatments/general-dentistry/root-canal-treatment","treatments/general-dentistry/extractions",
 "treatments/3d-restorative-dentistry","treatments/sedation","treatments/the-wand",
 "journeys/implants",
 "fees","dental-plan","patient-stories","booking",
 "blog","blog/[slug]","newsletter","faqs","leaflets","contact",
 "privacy","cookies","accessibility","terms",
 "locations/[town]/[service]"
];
for (const r of routes) {
  const seg = r.split("/").slice(-1)[0];
  const title = seg.replace(/-/g," ").replace(/\[(.+?)\]/g, "$1").toUpperCase();
  out(`app/${r}/page.tsx`, stub(title, `Placeholder for /${r}.`));
}

// ----- System stubs -----
out("app/not-found.tsx", "export default function NotFound(){return <main style={{padding:'2rem'}}><h1>Not found</h1><p>Sorry, we couldn’t find that page.</p></main>;}");
out("app/sitemap.ts", `export default function sitemap(){return [{ url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000" }] }`);
out("app/robots.ts", `export default function robots(){return { rules:[{ userAgent:'*', allow:'/' }], sitemap: (process.env.NEXT_PUBLIC_SITE_URL||'') + '/sitemap.xml' } }`);
out("app/rss.xml/route.ts", `export async function GET(){return new Response('<rss version="2.0"><channel><title>SMH Dental</title></channel></rss>',{headers:{'Content-Type':'application/rss+xml'}})}`);

// ----- Helpers -----
out("lib/smh/flags.ts","export const smhFlags={CHATDOCK:process.env.NEXT_PUBLIC_FEATURE_CHATDOCK==='true',LUX_HOMEPAGE:process.env.NEXT_PUBLIC_FEATURE_LUX_HOMEPAGE==='true'} as const;");
out("lib/smh/env.ts",  "export const smhEnv={SITE_NAME:process.env.NEXT_PUBLIC_SITE_NAME||\"St Mary's House Dental Care\",SITE_URL:process.env.NEXT_PUBLIC_SITE_URL||\"\",CHAT_API_BASE:process.env.NEXT_PUBLIC_CHAT_API_BASE||\"\"} as const;");
out("lib/smh/jsonld.ts", `export type QA={q:string;a:string}; export const faqPage=(faq:QA[])=>({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(({q,a})=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))});`);

// ----- Content scaffolds -----
out("content/blog/example.mdx", `---
title: "Welcome to St Mary's House Dental Care"
slug: "welcome"
excerpt: "Our calm, technology-led approach to private dentistry in Shoreham-by-Sea."
date: "${today}"
updated: "${today}"
schema: { type: "BlogPosting", speakable: true }
---

_Last updated: ${today}_

# Welcome
Intro copy goes here (UK English, non-diagnostic).
`);
out("content/leaflets/example.mdx", `---
title: "After a tooth extraction"
slug: "leaflet-after-extraction"
excerpt: "Simple aftercare steps after a routine extraction."
date: "${today}"
updated: "${today}"
schema: { type: "MedicalWebPage", speakable: true }
---

_Last updated: ${today}_

# After a tooth extraction
Short aftercare advice. If worried, call 01273 453109.
`);

// ----- Zero-click packs -----
out("data/zero-click/home.json", JSON.stringify([
  {"q":"Do you offer same-day emergency appointments?","a":"We aim to see urgent cases the same day. Call 01273 453109."},
  {"q":"Do you provide Spark Aligners?","a":"Yes—planned and monitored in-house with digital scans."},
  {"q":"Is there parking?","a":"Yes, parking is available nearby our practice on St Mary’s Road."}
], null, 2));
out("data/zero-click/emergency.json", JSON.stringify([
  {"q":"What counts as a dental emergency?","a":"Severe pain, swelling, trauma, uncontrolled bleeding, or fever with facial swelling. Call for urgent assessment."},
  {"q":"What should I do for a knocked-out tooth?","a":"Handle by the crown only, rinse gently, try to reinsert, or store in milk. Seek urgent care within 60 minutes."},
  {"q":"Are you open evenings or weekends?","a":"Mon–Thu 08:30–17:00; Fri 08:30–16:00. Out of hours, call NHS 111."}
], null, 2));

// ----- Readme note -----
out("README.SMH-OVERLAY.md", `# SMH Overlay
This overlay added previews, emergency page, skeleton routes, SEO stubs, content scaffolds, and zero-click packs.
Run:
  pnpm dev   # or npm run dev
Preview:
  /preview/home/ai24, /preview/home/lux, /preview/chat/classic, /preview/chat/luxe, /emergency-dentist
`);

// done
console.log("✅ SMH skeleton overlay complete (additive-only).");
