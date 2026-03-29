"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { motion } from "framer-motion";
import { LayoutGrid, List, Search } from "lucide-react";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { sampleCommitments } from "@/lib/sample-data";
import { daysUntilDeadline, isOverdue } from "@/lib/deadline-date";
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

        const daysUntilDue = daysUntilDeadline(item.deadline_date, now);

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

  const nowForOverdue = new Date();
  const showOverdueBadge = (item: (typeof sampleCommitments)[number]) =>
    item.status !== "completed" && isOverdue(item.deadline_date, nowForOverdue);

  return (
    <section
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      id="commitments"
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            {language === "ne"
              ? "विस्तृत ट्र्याकिङ: सबै १०० वाचा"
              : "Master Tracking Ledger"}
          </h2>
          <p className="text-sm text-(--muted) max-w-xl">
            {language === "ne"
              ? "प्रत्येक प्रतिबद्धताको विस्तृत अध्ययन, फिल्टर र ट्र्याकिङ गर्नुहोस्।"
              : "Filter, search, and monitor every distinct commitment inside our comprehensive 100-point database."}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-(--card) border border-(--border) p-1.5 rounded-xl shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg font-medium text-xs transition-all ${viewMode === "grid" ? "bg-(--foreground) text-(--background) shadow-lg" : "text-(--muted) hover:text-(--foreground)"}`}
            aria-label="Grid view"
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-lg font-medium text-xs transition-all ${viewMode === "table" ? "bg-(--foreground) text-(--background) shadow-lg" : "text-(--muted) hover:text-(--foreground)"}`}
            aria-label="Table view"
          >
            Table
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 sm:p-6 mb-10 border border-(--border)/50 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <label className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-(--muted)"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-(--border) rounded-xl pl-11 pr-4 py-3 bg-(--background)/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm placeholder-(--muted)"
              placeholder={t("filters.searchPlaceholder")}
            />
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status | "all")}
            className="border border-(--border) rounded-xl px-4 py-3 bg-(--background)/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-(--foreground) appearance-none"
          >
            {statuses.map((item) => (
              <option key={item} value={item} className="bg-(--card)">
                {item === "all"
                  ? t("filters.allStatuses")
                  : t(`status.${item}`)}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-(--border) rounded-xl px-4 py-3 bg-(--background)/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-(--foreground) appearance-none"
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
            className="border border-(--border) rounded-xl px-4 py-3 bg-(--background)/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-(--foreground) appearance-none"
          >
            {ministries.map((item) => (
              <option key={item} value={item} className="bg-(--card)">
                {item === "all" ? "All Ministries" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value as DeadlineFilter)}
            className="border border-(--border) rounded-xl px-4 py-3 bg-(--background)/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-(--foreground) appearance-none"
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
            className="border border-(--border) rounded-xl px-4 py-3 bg-(--background)/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-(--foreground) appearance-none"
          >
            <option value="point">Sort by Point Number</option>
            <option value="deadline">Sort by Nearest Deadline</option>
            <option value="updated">Sort by Last Updated</option>
            <option value="discussed">Sort by Most Discussed</option>
          </select>

          <div className="border border-(--border)/50 rounded-xl px-4 py-3 bg-blue-500/5 text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between shadow-inner">
            <span>{language === "ne" ? "नतिजा" : "Results Found"}</span>
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs">
              {filtered.length}
            </span>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item) => {
            const title = language === "ne" ? item.title_ne : item.title_en;
            const overdue = showOverdueBadge(item);
            return (
              <Link
                href={`/commitments/${item.id}`}
                key={item.id}
                className="group glass-card rounded-2xl p-6 border border-(--border)/50 hover:shadow-2xl hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                    <div className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 px-2 py-1 rounded shadow-sm">
                      #{String(item.point_number).padStart(3, "0")}
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {overdue ? (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950/40 dark:border-red-900/50">
                          {t("stats.overdue")}
                        </span>
                      ) : null}
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${statusColor(item.status)}`}
                      >
                        {t(`status.${item.status}`)}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold leading-snug mb-4 text-base group-hover:text-blue-600 transition-colors">
                    {title}
                  </h3>
                </div>

                <div className="text-xs text-(--muted) space-y-2.5 pt-4 border-t border-(--border)/60 mt-2">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-amber-500 shadow-sm" />
                    <span className="truncate">
                      {t(`categories.${item.category_name_en}`)}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-indigo-500 shadow-sm" />
                    <span className="truncate">
                      {item.responsible_ministry}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded bg-emerald-500 shadow-sm" />
                    <span className="font-medium text-(--foreground)">
                      Due: {item.deadline_date}
                    </span>
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
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
                    Point
                  </th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
                    Commitment
                  </th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
                    Ministry
                  </th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
                    Deadline
                  </th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-[10px]">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border)">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-(--secondary)/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      #{item.point_number}
                    </td>
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
                    <td className="px-4 py-3 text-(--muted)">
                      {item.responsible_ministry}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {showOverdueBadge(item) ? (
                          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950/40 dark:border-red-900/50">
                            {t("stats.overdue")}
                          </span>
                        ) : null}
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${statusColor(item.status)}`}
                        >
                          {t(`status.${item.status}`)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-(--muted)">
                      {item.deadline_date}
                    </td>
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
