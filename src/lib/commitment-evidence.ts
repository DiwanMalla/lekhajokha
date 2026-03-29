/** Verified news sources attached to specific commitment points (English outlets). */

import type { EvidenceSource } from "@/types";

const BY_POINT: Partial<Record<number, EvidenceSource[]>> = {
  2: [
    {
      title:
        "Communications Minister directs staff to carry out works so that people feel it",
      outlet: "Nepal News",
      published: "29 Mar 2026",
      url: "https://english.nepalnews.com/s/nation/communications-minister-directs-staff-to-carry-out-works-so-that-people-feel-it/",
    },
  ],
  8: [
    {
      title:
        "Nepal's former leader arrested over deaths during Gen Z protests",
      outlet: "CNN",
      published: "28 Mar 2026",
      url: "https://www.cnn.com/2026/03/28/asia/nepal-kp-sharma-oli-arrested-protests-intl-hnk",
    },
    {
      title:
        "Govt decides to implement recommendations of Karki-led probe commission",
      outlet: "MyRepublica",
      published: "27 Mar 2026",
      url: "https://www.myrepublica.nagariknetwork.com/news/govt-decides-to-implement-recommendations-of-karki-led-probe-commission-98-95.html",
    },
    {
      title:
        "Balen's first cabinet decides to implement Karki commission's recommendations",
      outlet: "HimalPress",
      published: "27 Mar 2026",
      url: "https://en.himalpress.com/balens-first-cabinet-decides-to-implement-karki-commissions-recommendations/",
    },
    {
      title: "Cabinet decides to implement Karki Commission's report immediately",
      outlet: "Setopati",
      published: "27 Mar 2026",
      url: "https://en.setopati.com/political/166142",
    },
  ],
  12: [
    {
      title:
        "Govt to scrap party-affiliated unions of public servants, teachers",
      outlet: "MyRepublica",
      published: "28 Mar 2026",
      url: "https://myrepublica.nagariknetwork.com/news/govt-to-scrap-party-affiliated-unions-of-public-servants-teachers-24-60.html",
    },
  ],
  13: [
    {
      title: "PM Balen directs govt employees to avoid delays",
      outlet: "MyRepublica",
      published: "28 Mar 2026",
      url: "https://myrepublica.nagariknetwork.com/news/pm-balen-directs-govt-employees-to-avoid-delays-embrace-spirit-of-new-govt-99-64.html",
    },
  ],
  42: [
    {
      title:
        "Nepal Telecommunications Authority Directs Service Providers to Block Betting Apps",
      outlet: "Ratopati",
      published: "29 Mar 2026",
      url: "https://english.ratopati.com/story/56181/mobile-and-internet-service-providers-instructed-to-shut-down-betting-apps",
    },
    {
      title: "NTA asked to block online betting apps",
      outlet: "Rising Nepal",
      published: "29 Mar 2026",
      url: "https://risingnepaldaily.com/news/77936",
    },
    {
      title: "Betting apps, websites ordered shut in 24 hours",
      outlet: "Makalu Khabar",
      published: "29 Mar 2026",
      url: "https://english.makalukhabar.com/betting-apps-websites-ordered-shut-in-24-hours/",
    },
  ],
  60: [
    {
      title: "Finance Minister Wagle repeals 15 obsolete laws",
      outlet: "Peoples' Review",
      published: "28 Mar 2026",
      url: "https://mypeoplesreview.com/2026/03/28/finance-minister-wagle-repeals-15-obsolete-laws/",
    },
    {
      title:
        "Finance Minister Wagle decides to scrap Department of Revenue Investigation",
      outlet: "KhabarHub",
      published: "27 Mar 2026",
      url: "https://english.khabarhub.com/2026/27/541253/",
    },
  ],
  95: [
    {
      title:
        "Foreign Ministry Begins Implementing Governance Reforms",
      outlet: "Ratopati",
      published: "29 Mar 2026",
      url: "https://english.ratopati.com/story/56193/ministry-of-foreign-affairs-begins-work-as-per-announced-action-plan-for-governance-reform",
    },
  ],
};

export function evidenceForPoint(point: number): EvidenceSource[] {
  return BY_POINT[point] ?? [];
}
