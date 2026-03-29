"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { motion } from "framer-motion";
import { LayoutGrid, List, Search } from "lucide-react";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { sampleCommitments } from "@/lib/sample-data";
import { Status } from "@/types";

const statuses: Array<Status | "all"> = [
  "all",
  "not_started",
  "in_progress",
  "completed",
  "stalled",
  "broken",
];
type SortOption = "point" | "deadline" | "updated" | "discussed";

type DeadlineFilter =
  | "all"
  | "overdue"
  | "this_week"
  | "this_month"
  | "d100"
  | "d180"
  | "d1000";

type ViewMode = "grid" | "table";

const getDeadlineBucket = (deadlineDays: number | null): DeadlineFilter => {
  if (deadlineDays === 100) return "d100";
  if (deadlineDays === 180) return "d180";
  if (deadlineDays === 1000) return "d1000";
  return "all";
};

export default function CommitmentList() {
  const { t, language } = useTranslate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [category, setCategory] = useState("all");
  const [deadline, setDeadline] = useState<DeadlineFilter>("all");
  const [ministry, setMinistry] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("point");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const categories = useMemo(
    () => [
      "all",
      ...new Set(sampleCommitments.map((item) => item.category_name_en)),
    ],
    [],
  );

  const ministries = useMemo(
    () => [
      "all",
      ...new Set(sampleCommitments.map((item) => item.responsible_ministry)),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const now = new Date();

    return sampleCommitments
      .filter((item) => {
        const title = language === "ne" ? item.title_ne : item.title_en;
        const description =
          language === "ne" ? item.description_ne : item.description_en;
        const term = search.trim().toLowerCase();
        const matchesSearch =
          term.length === 0 ||
          title.toLowerCase().includes(term) ||
          description.toLowerCase().includes(term) ||
          item.responsible_ministry.toLowerCase().includes(term);

        const matchesStatus = status === "all" || item.status === status;
        const matchesCategory =
          category === "all" || item.category_name_en === category;
        const matchesMinistry =
          ministry === "all" || item.responsible_ministry === ministry;

        const dueDate = new Date(item.deadline_date);
        const daysUntilDue = Math.ceil(
          (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );

        const matchesDeadline =
          deadline === "all" ||
          (deadline === "overdue" && daysUntilDue < 0) ||
          (deadline === "this_week" &&
            daysUntilDue >= 0 &&
            daysUntilDue <= 7) ||
          (deadline === "this_month" &&
            daysUntilDue >= 0 &&
            daysUntilDue <= 30) ||
          (deadline === "d100" &&
            getDeadlineBucket(item.deadline_days) === "d100") ||
          (deadline === "d180" &&
            getDeadlineBucket(item.deadline_days) === "d180") ||
          (deadline === "d1000" &&
            getDeadlineBucket(item.deadline_days) === "d1000");

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCategory &&
          matchesMinistry &&
          matchesDeadline
        );
      })
      .sort((a, b) => {
        if (sortBy === "point") return a.point_number - b.point_number;
        if (sortBy === "deadline")
          return (
            new Date(a.deadline_date).getTime() -
            new Date(b.deadline_date).getTime()
          );
        if (sortBy === "updated")
          return (
            new Date(b.last_updated).getTime() -
            new Date(a.last_updated).getTime()
          );
        return b.importance_score - a.importance_score;
      });
  }, [search, status, category, ministry, deadline, sortBy, language]);

  const statusColor = (itemStatus: Status) => {
    if (itemStatus === "completed")
      return "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900/50";
    if (itemStatus === "in_progress")
      return "text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-400 dark:bg-sky-950/30 dark:border-sky-900/50";
    if (itemStatus === "broken")
      return "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-900/50";
    if (itemStatus === "stalled")
      return "text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/30 dark:border-orange-900/50";
    return "text-(--muted) bg-(--secondary) border-(--border) dark:text-(--muted-foreground) dark:bg-(--primary)/30 dark:border-slate-800/50";
  };

  return (
    <section
      className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      id="commitments"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          {language === "ne" ? "सबै १०० प्रतिबद्धताहरू" : "All 100 Commitments"}
        </h2>
        <div className="flex items-center gap-1 bg-(--secondary) p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-(--card) text-(--foreground) shadow-sm" : "text-(--muted) hover:text-(--foreground)"}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-(--card) text-(--foreground) shadow-sm" : "text-(--muted) hover:text-(--foreground)"}`}
            aria-label="Table view"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <label className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-(--muted)"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-(--border) rounded-xl pl-10 pr-4 py-2.5 bg-(--card) focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            placeholder={t("filters.searchPlaceholder")}
          />
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | "all")}
          className="border border-(--border) rounded-xl px-4 py-2.5 bg-(--card) focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
        >
          {statuses.map((item) => (
            <option key={item} value={item} className="bg-(--card)">
              {item === "all" ? t("filters.allStatuses") : t(`status.${item}`)}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-(--border) rounded-xl px-4 py-2.5 bg-(--card) focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
        >
          {categories.map((item) => (
            <option key={item} value={item} className="bg-(--card)">
              {item === "all"
                ? t("filters.allCategories")
                : t(`categories.${item}`)}
            </option>
          ))}
        </select>

        <select
          value={ministry}
          onChange={(e) => setMinistry(e.target.value)}
          className="border border-(--border) rounded-xl px-4 py-2.5 bg-(--card) focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
        >
          {ministries.map((item) => (
            <option key={item} value={item} className="bg-(--card)">
              {item === "all" ? "All Ministries" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <select
          value={deadline}
          onChange={(e) => setDeadline(e.target.value as DeadlineFilter)}
          className="border border-(--border) rounded-xl px-4 py-2.5 bg-(--card) focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
        >
          <option value="all">All Deadlines</option>
          <option value="overdue">Overdue</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
          <option value="d100">100-Day Commitments</option>
          <option value="d180">180-Day Commitments</option>
          <option value="d1000">1000-Day Commitments</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border border-(--border) rounded-xl px-4 py-2.5 bg-(--card) focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
        >
          <option value="point">Sort by Point Number</option>
          <option value="deadline">Sort by Nearest Deadline</option>
          <option value="updated">Sort by Last Updated</option>
          <option value="discussed">Sort by Most Discussed</option>
        </select>

        <div className="border border-(--border) rounded-xl px-4 py-2.5 bg-(--secondary) text-sm text-(--muted-foreground) flex items-center shadow-sm">
          Showing {filtered.length} / {sampleCommitments.length}
        </div>
      </div>

      {viewMode === "grid" ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item) => {
            const title = language === "ne" ? item.title_ne : item.title_en;
            return (
              <Link
                href={`/commitments/${item.id}`}
                key={item.id}
                className="glass-card rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                    #{String(item.point_number).padStart(3, "0")}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${statusColor(item.status)}`}
                  >
                    {t(`status.${item.status}`)}
                  </span>
                </div>
                <h3 className="font-bold leading-tight mb-4 text-lg group-hover:text-amber-600 transition-colors">
                  {title}
                </h3>
                <div className="text-sm text-(--muted) space-y-2 pt-4 border-t border-(--border)">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {t(`categories.${item.category_name_en}`)}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {item.responsible_ministry}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Due: {item.deadline_date}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      ) : (
        <div className="overflow-hidden border border-(--border) rounded-2xl shadow-sm bg-(--card)">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-(--secondary) text-(--foreground) border-b border-(--border)">
                <tr>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Point</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Commitment</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Category</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Ministry</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Deadline</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border)">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-(--secondary)/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">#{item.point_number}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/commitments/${item.id}`}
                        className="font-semibold hover:text-amber-600 transition-colors"
                      >
                        {language === "ne" ? item.title_ne : item.title_en}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-(--muted)">
                      {t(`categories.${item.category_name_en}`)}
                    </td>
                    <td className="px-4 py-3 text-(--muted)">{item.responsible_ministry}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${statusColor(item.status)}`}>
                        {t(`status.${item.status}`)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-(--muted)">{item.deadline_date}</td>
                    <td className="px-4 py-3 text-(--muted)">
                      {formatDistanceToNowStrict(new Date(item.last_updated), {
                        addSuffix: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
