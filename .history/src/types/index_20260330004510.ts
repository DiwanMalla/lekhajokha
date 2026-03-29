export type Status =
  | "not_started"
  | "in_progress"
  | "completed"
  | "broken"
  | "stalled";
export type DeadlineType =
  | "immediate"
  | "days"
  | "months"
  | "fiscal_year"
  | "ongoing";
export type DifficultyRating = "easy" | "medium" | "hard" | "very_hard";

export interface SubCommitment {
  id: string; // e.g. "49-a", "85-c"
  title_en: string;
  title_ne: string;
  deadline_days: number | null;
  status: Status;
}

export interface Commitment {
  id: string;
  point_number: number;
  title_en: string;
  title_ne: string;
  description_en: string;
  description_ne: string;
  category_id: string;
  category_name_en: string;
  category_name_ne: string;
  category: string;
  ministry: string;
  responsible_ministry: string;
  responsible_ministry_en?: string;
  responsible_ministry_ne?: string;
  status: Status;
  progress_percentage: number;
  deadline_type: DeadlineType;
  deadline_days: number | null;
  deadline: string;
  deadline_date: string;
  difficulty_rating: DifficultyRating;
  importance_score: number;
  last_updated: string;
  editorial_summary_en: string;
  editorial_summary_ne: string;
  evidence_url?: string | null;
  created_at: string;
  updated_at: string;
  sub_commitments?: SubCommitment[];
}

export interface StatusHistory {
  id: string;
  commitment_id: string;
  old_status: string;
  new_status: string;
  changed_at: string;
  note?: string | null;
  changed_by?: string;
}

export interface Category {
  id: string;
  name_en: string;
  name_ne: string;
  icon?: string | null;
}

export type Language = "en" | "ne";
export type Theme = "dark" | "light";
