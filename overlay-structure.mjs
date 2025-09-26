// overlay-structure.mjs — ADDITIVE overlay for /patient-info + /treatments structure + placeholder pages.
// Safe: only creates files that don't already exist.
console.log("Running overlay-structure.mjs …");


import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const root = process.cwd();
const today = new Date().toISOString().slice(0,10);

function out(p, s) {
  const f = join(root, p);
  mkdirSync(dirname(f), { recursive: true });
  if (!existsSync(f)) writeFileSync(f, s);
}
const page = (title, body="") =>
  `export const metadata={title:${JSON.stringify(title)}};export default function Page(){return(<main style={{padding:'2rem',maxWidth:1000,margin:'0 auto'}}><h1>${title}</h1><p>${body}</p></main>)}`;

//
// ---- PATIENT INFO HUB ----
// /patient-info (Blog, Newsletter, Leaflets, Stories)
//

out("app/patient-info/page.tsx", page("Patient Info","Helpful resources: blog, newsletter, leaflets, and patient stories."));
out("app/patient-info/blog/page.tsx", page("Blog","Articles in UK English. SEO-friendly, non-diagnostic."));
out("app/patient-info/blog/[slug]/page.tsx", page("Blog Article","Replace with MDX reader later."));
out("app/patient-info/newsletter/page.tsx", page("Newsletter","Monthly digest archive."));
out("app/patient-info/leaflets/page.tsx", page("Patient Leaflets","Post-op instructions, sedation info, hygiene guides."));
out("app/patient-info/stories/page.tsx", page("Patient Stories","Videos and testimonials (Review/VideoObject schema)."));

// content scaffolds (safe to add even if you don't have MDX wired yet)
out("content/blog/example.mdx", `---
title: "Welcome to SMH Blog"
slug: "welcome"
excerpt: "News and guides from St Mary’s House Dental Care."
date: "${today}"
updated: "${today}"
schema: { type: "BlogPosting", speakable: true }
---
_Last updated: ${today}_

# Welcome
Draft your first post here (UK English, non-diagnostic).
`);
out("content/leaflets/post-op-extraction.mdx", `---
title: "After a Tooth Extraction"
slug: "post-op-extraction"
excerpt: "Simple aftercare steps."
date: "${today}"
updated: "${today}"
schema: { type: "MedicalWebPage", speakable: true }
---
_Last updated: ${today}_

# After a Tooth Extraction
Short, clear guidance. If worried, call 01273 453109.
`);

//
// ---- TREATMENTS IA (your exact plan) ----
//

function add(p, label){
  out(`app/${p}/page.tsx`, page(label, `Placeholder for /${p}.`));
}

// Top-level
add("treatments","Treatments");

// General
add("treatments/general","General Dentistry");
add("treatments/general/check-ups","Check-ups (incl. oral cancer check)");
add("treatments/general/tooth-coloured-fillings","Tooth-Coloured Fillings");
add("treatments/general/crowns-and-bridges","Crowns & Bridges");
add("treatments/general/extractions","Extractions");
add("treatments/general/root-canal-treatment","Root Canal Treatment");
add("treatments/general/childrens-dentistry","Children’s Dentistry");
add("treatments/general/sedation","Sedation");
add("treatments/general/emergency-dentistry","Emergency Dentistry");

// Cosmetic
add("treatments/cosmetic","Cosmetic Dentistry");
add("treatments/cosmetic/veneers","Veneers");
add("treatments/cosmetic/teeth-whitening","Teeth Whitening");
add("treatments/cosmetic/composite-bonding","Composite Bonding");

// 3D Dentistry (extra tab)
add("treatments/3d-dentistry","3D Dentistry");
add("treatments/3d-dentistry/3d-printed-veneers","3D Printed Veneers");
add("treatments/3d-dentistry/3d-same-day-dentures","3D Same-Day Dentures");
add("treatments/3d-dentistry/3d-restorative-dentistry","3D Restorative Dentistry");
add("treatments/3d-dentistry/3d-implants-overview","3D Implants Overview (Guided + Restorations)");

// Orthodontics
add("treatments/orthodontics","Orthodontics");
add("treatments/orthodontics/spark-aligners","Spark Aligners");
add("treatments/orthodontics/fixed-braces","Fixed Braces");

// Implants
add("treatments/implants","Dental Implants");
add("treatments/implants/3d-surgically-guided-implants","3D Surgically-Guided Implants");
add("treatments/implants/same-day-implants","Same-day Implants");
add("treatments/implants/3d-printed-restorations","3D Printed Restorations");
add("treatments/implants/all-on-4-6-same-day","All-on-4/6 Same Day");

// Technology (as a cluster under Treatments)
add("treatments/technology","Technology");
add("treatments/technology/soft-tissue-laser","Soft Tissue Laser");
add("treatments/technology/3d-scanning-and-printing","3D Scanning and Printing");
add("treatments/technology/the-wand-painless-numbing","The Wand — Painless Numbing");

// Done
console.log("✅ Structure overlay added: /patient-info and full /treatments tree.");
