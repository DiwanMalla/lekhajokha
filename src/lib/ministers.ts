import cabinetSeed from "@/data/cabinet-seed.json";
import type { Commitment } from "@/types";

export interface CabinetVerificationSource {
  title_en: string;
  publisher_en: string;
  url: string;
  date_iso: string;
  contribution_en: string;
  contribution_ne?: string;
}

export interface CabinetPhoto {
  url: string;
  commons_page?: string;
  credit_short?: string;
}

export interface CabinetMeta {
  sworn_in_iso: string;
  sworn_in_venue_en: string;
  sworn_in_venue_ne: string;
  party_short: string;
  party_name_en: string;
  party_name_ne: string;
  member_count: number;
  prime_minister_rank_note_en: string;
  prime_minister_rank_note_ne?: string;
  data_refreshed_iso?: string;
  verification: {
    sources: CabinetVerificationSource[];
    discrepancies_en: string;
    discrepancies_ne?: string;
  };
}

export interface CabinetMember {
  slug: string;
  sort_order: number;
  is_prime_minister: boolean;
  cabinet_rank: number;
  name_en: string;
  name_ne: string;
  name_en_alt?: string[];
  portfolio_en: string;
  portfolio_ne: string;
  party: string;
  tracker_ministries: string[];
  photo?: CabinetPhoto;
}

export type MinisterInvolvement = "primary" | "shared";

export const cabinetMeta = cabinetSeed.meta as CabinetMeta;

export const ministers: CabinetMember[] = cabinetSeed.ministers as CabinetMember[];

export function getMinisterBySlug(slug: string): CabinetMember | undefined {
  return ministers.find((m) => m.slug === slug);
}

export function ministriesSetForMember(m: CabinetMember): Set<string> {
  return new Set(m.tracker_ministries);
}

export function commitmentInvolvementForMinister(
  m: CabinetMember,
  c: Commitment,
): MinisterInvolvement | null {
  const T = ministriesSetForMember(m);
  if (T.has(c.responsible_ministry)) return "primary";
  if (c.shared_ministries?.some((s) => T.has(s))) return "shared";
  return null;
}

/** All commitments where the minister is lead (primary) or coordinating (shared). */
export function commitmentsTouchingMinister(
  m: CabinetMember,
  rows: Commitment[],
): Commitment[] {
  return rows.filter((c) => commitmentInvolvementForMinister(m, c) !== null);
}

/** @deprecated Use commitmentsTouchingMinister */
export function commitmentsForCabinetMember(
  m: CabinetMember,
  rows: Commitment[],
): Commitment[] {
  return commitmentsTouchingMinister(m, rows);
}

export function commitmentIsOverdue(c: Commitment, now: Date): boolean {
  if (c.status === "completed") return false;
  if (!c.deadline_date) return false;
  const end = new Date(`${c.deadline_date}T23:59:59+05:45`);
  return end < now;
}

export function nextOpenDeadline(
  rows: Commitment[],
  now: Date,
): string | null {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const open = rows.filter(
    (c) => c.status !== "completed" && c.status !== "broken",
  );
  const dated = open
    .filter((c) => c.deadline_date)
    .map((c) => ({
      c,
      t: new Date(`${c.deadline_date}T00:00:00+05:45`).getTime(),
    }))
    .filter(({ t }) => !Number.isNaN(t))
    .sort((a, b) => a.t - b.t);
  const next = dated.find(({ t }) => t >= start.getTime());
  return next?.c.deadline_date ?? null;
}

export interface MinisterCabinetStats {
  primaryCount: number;
  sharedOnlyCount: number;
  subCommitmentCount: number;
  score: number;
  completed: number;
  inProgress: number;
  overdue: number;
  nextDeadline: string | null;
  lastDataRefresh: string | null;
}

export function ministerCabinetStats(
  m: CabinetMember,
  rows: Commitment[],
  now: Date,
): MinisterCabinetStats {
  const touched = commitmentsTouchingMinister(m, rows);
  let primaryCount = 0;
  let sharedOnlyCount = 0;
  for (const c of touched) {
    if (commitmentInvolvementForMinister(m, c) === "primary") primaryCount += 1;
    else sharedOnlyCount += 1;
  }

  const subCommitmentCount = touched.reduce(
    (acc, c) => acc + (c.sub_commitments?.length ?? 0),
    0,
  );

  const completed = touched.filter((c) => c.status === "completed").length;
  const inProgress = touched.filter((c) => c.status === "in_progress").length;
  const overdue = touched.filter((c) => commitmentIsOverdue(c, now)).length;

  const denom = Math.max(touched.length, 1);
  const score = Math.round(((completed + inProgress * 0.5) / denom) * 100);

  const lastDataRefresh =
    touched.length === 0
      ? null
      : touched
          .map((c) => c.updated_at)
          .sort()
          .at(-1) ?? null;

  const nextDeadline = nextOpenDeadline(touched, now);

  return {
    primaryCount,
    sharedOnlyCount,
    subCommitmentCount,
    score,
    completed,
    inProgress,
    overdue,
    nextDeadline,
    lastDataRefresh,
  };
}

/** @deprecated Use ministerCabinetStats */
export function cabinetWeightedScore(
  m: CabinetMember,
  rows: Commitment[],
): { score: number; total: number; completed: number; inProgress: number } {
  const s = ministerCabinetStats(m, rows, new Date());
  const touched = commitmentsTouchingMinister(m, rows);
  return {
    score: s.score,
    total: touched.length,
    completed: s.completed,
    inProgress: s.inProgress,
  };
}

export interface OtherLeadBodyConfig {
  id: string;
  primaryLabelEn: string;
  primaryLabelNe: string;
  predicate: (c: Commitment) => boolean;
}

export const OTHER_LEAD_BODIES: OtherLeadBodyConfig[] = [
  {
    id: "nrb",
    primaryLabelEn: "Nepal Rastra Bank (NRB)",
    primaryLabelNe: "नेपाल राष्ट्र बैंक (NRB)",
    predicate: (c) => c.responsible_ministry.includes("Nepal Rastra Bank"),
  },
  {
    id: "npc",
    primaryLabelEn: "National Planning Commission (NPC)",
    primaryLabelNe: "राष्ट्रिय योजना आयोग (NPC)",
    predicate: (c) => c.responsible_ministry === "National Planning Commission",
  },
  {
    id: "ibn",
    primaryLabelEn: "Investment Board Nepal",
    primaryLabelNe: "लगानी बोर्ड नेपाल",
    predicate: (c) => c.responsible_ministry === "Investment Board Nepal",
  },
];

export function otherBodyStats(
  cfg: OtherLeadBodyConfig,
  rows: Commitment[],
  now: Date,
): MinisterCabinetStats {
  const touched = rows.filter(cfg.predicate);
  const completed = touched.filter((c) => c.status === "completed").length;
  const inProgress = touched.filter((c) => c.status === "in_progress").length;
  const overdue = touched.filter((c) => commitmentIsOverdue(c, now)).length;
  const denom = Math.max(touched.length, 1);
  const score = Math.round(((completed + inProgress * 0.5) / denom) * 100);
  const subCommitmentCount = touched.reduce(
    (acc, c) => acc + (c.sub_commitments?.length ?? 0),
    0,
  );
  const lastDataRefresh =
    touched.length === 0
      ? null
      : (touched.map((c) => c.updated_at).sort().at(-1) ?? null);
  return {
    primaryCount: touched.length,
    sharedOnlyCount: 0,
    subCommitmentCount,
    score,
    completed,
    inProgress,
    overdue,
    nextDeadline: nextOpenDeadline(touched, now),
    lastDataRefresh,
  };
}
