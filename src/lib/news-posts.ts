/** Editorial news items tied to tracker commitments (Phase 3). */

export type NewsCommitmentLink =
  | { type: "point"; point: number }
  | { type: "all" };

export type NewsPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  link: NewsCommitmentLink;
  body: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "former-pm-oli-lekhak-arrested-mar-28",
    title: "Former PM Oli and Home Minister Lekhak Arrested",
    date: "2026-03-28",
    excerpt:
      "Developments tied to accountability for past unrest; links to implementation of the Karki commission track.",
    link: { type: "point", point: 8 },
    body:
      "This story connects to Point #008 — implementing the Gauri Bahadur Karki commission recommendations. Follow the commitment page for status, evidence, and deadlines.",
  },
  {
    slug: "nta-isp-betting-apps-mar-29",
    title: "NTA Orders ISPs to Block Betting Apps Within 24 Hours",
    date: "2026-03-29",
    excerpt:
      "Regulator direction to service providers on online betting; tracker ties to the digital shutdown commitment.",
    link: { type: "point", point: 42 },
    body:
      "This story connects to Point #042 — shutting down betting apps and websites. See Evidence & Sources on the commitment detail page for published coverage.",
  },
  {
    slug: "finance-minister-repeals-15-laws-mar-28",
    title: "Finance Minister Repeals 15 Obsolete Laws on Day 1",
    date: "2026-03-28",
    excerpt:
      "Legal cleanup signals under the new government; linked to private-sector and governance reform momentum.",
    link: { type: "point", point: 60 },
    body:
      "This story connects to Point #060 — Private Sector Protection and Promotion Strategy and related reform narrative. Track progress on the commitment page.",
  },
  {
    slug: "cabinet-100-point-governance-mar-28",
    title: "Cabinet Approves 100-Point Governance Reform Agenda",
    date: "2026-03-28",
    excerpt:
      "The full agenda baseline for this tracker — all 100 points and sector breakdown.",
    link: { type: "all" },
    body:
      "The cabinet decision anchors every commitment on this site. Browse all 100 points, categories, and deadlines from the master ledger.",
  },
  {
    slug: "government-bans-party-unions-mar-28",
    title: "Government Bans Party-Affiliated Trade Unions for Civil Servants",
    date: "2026-03-28",
    excerpt:
      "Civil service neutrality measures; aligns with the partisan-affiliation ban commitment.",
    link: { type: "point", point: 12 },
    body:
      "This story connects to Point #012 — banning partisan affiliations among civil servants, teachers, and professors, including the Federal Civil Service Bill timeline.",
  },
  {
    slug: "foreign-ministry-100-point-plan-mar-29",
    title: "Foreign Ministry Begins Implementing 100-Point Plan",
    date: "2026-03-29",
    excerpt:
      "MoFA governance reform workstream, including Middle East crisis tasking.",
    link: { type: "point", point: 95 },
    body:
      "This story connects to Point #095 — inter-ministerial task force on Middle East crisis impacts and the 7-day reporting track.",
  },
  {
    slug: "pm-no-delays-directive-mar-28",
    title: "PM Directs Government Employees: No Delays Allowed",
    date: "2026-03-28",
    excerpt:
      "Tone-setting for service delivery; ties to code of conduct enforcement.",
    link: { type: "point", point: 13 },
    body:
      "This story connects to Point #013 — strict implementation of the employee code of conduct.",
  },
];

export const newsPostsBySlug = new Map(newsPosts.map((p) => [p.slug, p]));

export function commitmentHref(link: NewsCommitmentLink): string {
  if (link.type === "all") return "/commitments";
  return `/commitments/${link.point}`;
}

export function commitmentLinkLabel(link: NewsCommitmentLink): string {
  if (link.type === "all") return "All 100 commitments";
  return `Point #${String(link.point).padStart(3, "0")}`;
}
