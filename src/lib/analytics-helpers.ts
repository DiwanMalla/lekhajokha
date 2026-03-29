import type { Commitment } from "@/types";
import { isOverdue } from "@/lib/deadline-date";
import { parseISO, startOfWeek, format, addWeeks } from "date-fns";

const DAY_MS = 1000 * 60 * 60 * 24;

/** 100-day window: cabinet anchor 28 Mar 2026 → 6 Jul 2026. */
export const HUNDRED_DAY_START = "2026-03-28";
export const HUNDRED_DAY_END = "2026-07-06";

export function parseNepalDate(ymd: string, endOfDay: boolean): Date {
  const time = endOfDay ? "23:59:59" : "00:00:00";
  return new Date(`${ymd}T${time}+05:45`);
}

/** 1-based day index within the 100-day window (clamped 1–100). */
export function hundredDayIndex(now: Date = new Date()): number {
  const start = parseNepalDate(HUNDRED_DAY_START, false);
  const raw = Math.floor((now.getTime() - start.getTime()) / DAY_MS) + 1;
  return Math.min(100, Math.max(1, raw));
}

/** Whole days remaining until end of last day of window. */
export function hundredDaysRemaining(now: Date = new Date()): number {
  const end = parseNepalDate(HUNDRED_DAY_END, true);
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / DAY_MS));
}

/** Open commitments grouped by calendar month (YYYY-MM) of due date. */
export function dueDatesByMonth(rows: Commitment[]): { label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const c of rows) {
    if (!c.deadline_date || c.status === "completed") continue;
    const month = c.deadline_date.slice(0, 7);
    map.set(month, (map.get(month) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, count]) => ({ label, count }));
}

/** Open commitments with due dates in the next N weeks, binned by ISO week (Monday start). */
export function dueDatesByWeekUpcoming(
  rows: Commitment[],
  now: Date = new Date(),
  horizonWeeks = 12,
): { label: string; count: number; weekStart: string }[] {
  const map = new Map<string, number>();
  const horizonEnd = addWeeks(startOfWeek(now, { weekStartsOn: 1 }), horizonWeeks);

  for (const c of rows) {
    if (!c.deadline_date || c.status === "completed") continue;
    const d = parseISO(c.deadline_date);
    if (d < startOfWeek(now, { weekStartsOn: 1 }) || d > horizonEnd) continue;
    const wk = format(startOfWeek(d, { weekStartsOn: 1 }), "yyyy-MM-dd");
    map.set(wk, (map.get(wk) ?? 0) + 1);
  }

  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekStart, count]) => ({
      label: `Week of ${weekStart}`,
      count,
      weekStart,
    }));
}

export type MinistryScore = {
  ministry: string;
  total: number;
  inProgress: number;
  completed: number;
  overdue: number;
  actionScore: number;
};

export function ministryScorecard(
  rows: Commitment[],
  now: Date = new Date(),
): MinistryScore[] {
  const byMin = new Map<string, MinistryScore>();

  for (const c of rows) {
    const m = c.responsible_ministry;
    if (!byMin.has(m)) {
      byMin.set(m, {
        ministry: m,
        total: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0,
        actionScore: 0,
      });
    }
    const s = byMin.get(m)!;
    s.total += 1;
    if (c.status === "completed") s.completed += 1;
    else if (c.status === "in_progress") s.inProgress += 1;
    if (c.status !== "completed" && isOverdue(c.deadline_date, now)) {
      s.overdue += 1;
    }
    s.actionScore = s.completed + s.inProgress;
  }

  return [...byMin.values()].sort((a, b) => b.actionScore - a.actionScore);
}

export function statusCounts(rows: Commitment[]) {
  const counts = {
    not_started: 0,
    in_progress: 0,
    completed: 0,
    stalled: 0,
    broken: 0,
  };
  for (const c of rows) {
    if (c.status in counts) {
      counts[c.status as keyof typeof counts] += 1;
    }
  }
  return counts;
}

/** Commitments with deadline on or before `untilYmd` and on or after `fromYmd` (inclusive). */
export function commitmentsDueInRange(
  rows: Commitment[],
  fromYmd: string,
  untilYmd: string,
): Commitment[] {
  return rows
    .filter((c) => c.deadline_date >= fromYmd && c.deadline_date <= untilYmd)
    .sort((a, b) => a.deadline_date.localeCompare(b.deadline_date));
}
