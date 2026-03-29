"use client";

import type { Status } from "@/types";

const STATUS_ORDER: Status[] = [
  "not_started",
  "in_progress",
  "completed",
  "stalled",
  "broken",
];

const COLORS: Record<Status, string> = {
  not_started: "#64748b",
  in_progress: "#0ea5e9",
  completed: "#22c55e",
  stalled: "#f97316",
  broken: "#ef4444",
};

const LABELS: Record<Status, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
  stalled: "Stalled",
  broken: "Broken",
};

type Props = {
  counts: Record<Status, number>;
};

export function StatusPie({ counts }: Props) {
  const total = STATUS_ORDER.reduce((s, k) => s + counts[k], 0);
  if (total === 0) return null;

  let deg = 0;
  const segments: string[] = [];
  for (const s of STATUS_ORDER) {
    const n = counts[s];
    if (n === 0) continue;
    const span = (n / total) * 360;
    segments.push(`${COLORS[s]} ${deg}deg ${deg + span}deg`);
    deg += span;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      <div
        className="relative h-44 w-44 shrink-0 rounded-full border border-(--border) shadow-inner"
        style={{
          background: `conic-gradient(${segments.join(", ")})`,
        }}
        aria-hidden
      />
      <ul className="space-y-2 text-sm">
        {STATUS_ORDER.map((s) => {
          const n = counts[s];
          if (n === 0) return null;
          const pct = Math.round((n / total) * 100);
          return (
            <li key={s} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-sm shrink-0"
                style={{ backgroundColor: COLORS[s] }}
              />
              <span>{LABELS[s]}:</span>
              <span className="font-semibold">
                {n} ({pct}%)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
