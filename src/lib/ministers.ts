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
  /** Short attribution for captions (often "Wikimedia Commons" or license holder). */
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

export const cabinetMeta = cabinetSeed.meta as CabinetMeta;

export const ministers: CabinetMember[] = cabinetSeed.ministers as CabinetMember[];

export function getMinisterBySlug(slug: string): CabinetMember | undefined {
  return ministers.find((m) => m.slug === slug);
}

export function commitmentsForCabinetMember(
  minister: CabinetMember,
  rows: Commitment[],
): Commitment[] {
  const set = new Set(minister.tracker_ministries);
  return rows.filter((c) => set.has(c.responsible_ministry));
}

export function cabinetWeightedScore(
  minister: CabinetMember,
  rows: Commitment[],
): { score: number; total: number; completed: number; inProgress: number } {
  const list = commitmentsForCabinetMember(minister, rows);
  const completed = list.filter((c) => c.status === "completed").length;
  const inProgress = list.filter((c) => c.status === "in_progress").length;
  const score = Math.round(
    ((completed + inProgress * 0.5) / Math.max(list.length, 1)) * 100,
  );
  return { score, total: list.length, completed, inProgress };
}
