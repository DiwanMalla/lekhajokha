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
      return "text-green-600 bg-green-50 border-green-200";
    if (itemStatus === "in_progress")
      return "text-sky-700 bg-sky-50 border-sky-200";
    if (itemStatus === "broken") return "text-red-700 bg-red-50 border-red-200";
    if (itemStatus === "stalled")
      return "text-orange-700 bg-orange-50 border-orange-200";
    return "text-slate-600 bg-slate-50 border-slate-200";
  };

  return (
    <section
      className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      id="commitments"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">All 100 Commitments</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded border ${viewMode === "grid" ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-300"}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded border ${viewMode === "table" ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-300"}`}
            aria-label="Table view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <label className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-9 pr-3 py-2.5 bg-white"
            placeholder={t("filters.searchPlaceholder")}
          />
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | "all")}
          className="border rounded-lg px-3 py-2.5 bg-white"
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? t("filters.allStatuses") : t(`status.${item}`)}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2.5 bg-white"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all"
                ? t("filters.allCategories")
                : t(`categories.${item}`)}
            </option>
          ))}
        </select>

        <select
          value={ministry}
          onChange={(e) => setMinistry(e.target.value)}
          className="border rounded-lg px-3 py-2.5 bg-white"
        >
          {ministries.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Ministries" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <select
          value={deadline}
          onChange={(e) => setDeadline(e.target.value as DeadlineFilter)}
          className="border rounded-lg px-3 py-2.5 bg-white"
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
          className="border rounded-lg px-3 py-2.5 bg-white"
        >
          <option value="point">Sort by Point Number</option>
          <option value="deadline">Sort by Nearest Deadline</option>
          <option value="updated">Sort by Last Updated</option>
          <option value="discussed">Sort by Most Discussed</option>
        </select>

        <div className="border rounded-lg px-3 py-2.5 bg-slate-50 text-sm text-slate-700 flex items-center">
          Showing {filtered.length} / {sampleCommitments.length}
        </div>
      </div>

      {viewMode === "grid" ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((item) => {
            const title = language === "ne" ? item.title_ne : item.title_en;
            return (
              <Link
                href={`/commitments/${item.id}`}
                key={item.id}
                className="glass-card rounded-xl p-4 hover:shadow-md transition-shadow border border-slate-200"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="text-xs font-semibold text-slate-500">
                    #{String(item.point_number).padStart(3, "0")}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${statusColor(item.status)}`}
                  >
                    {t(`status.${item.status}`)}
                  </span>
                </div>
                <h3 className="font-semibold leading-snug mb-3">{title}</h3>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>{t(`categories.${item.category_name_en}`)}</p>
                  <p>{item.responsible_ministry}</p>
                  <p>Due: {item.deadline_date}</p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      ) : (
        <div className="overflow-auto border rounded-xl">
          <table className="w-full text-sm bg-white">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="text-left px-3 py-2">Point</th>
                <th className="text-left px-3 py-2">Commitment</th>
                <th className="text-left px-3 py-2">Category</th>
                <th className="text-left px-3 py-2">Ministry</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Deadline</th>
                <th className="text-left px-3 py-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t hover:bg-slate-50">
                  <td className="px-3 py-2">#{item.point_number}</td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/commitments/${item.id}`}
                      className="font-medium hover:underline"
                    >
                      {language === "ne" ? item.title_ne : item.title_en}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    {t(`categories.${item.category_name_en}`)}
                  </td>
                  <td className="px-3 py-2">{item.responsible_ministry}</td>
                  <td className="px-3 py-2">{t(`status.${item.status}`)}</td>
                  <td className="px-3 py-2">{item.deadline_date}</td>
                  <td className="px-3 py-2">
                    {formatDistanceToNowStrict(new Date(item.last_updated), {
                      addSuffix: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
