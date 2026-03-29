"use client";

import Link from "next/link";
import { CountUp } from "./ui/CountUp";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { sampleCommitments } from "@/lib/sample-data";
import {
  AlertTriangle,
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock,
  ListChecks,
  PauseCircle,
} from "lucide-react";

export default function StatsDashboard() {
  const { t, language } = useTranslate();
  const commitments = sampleCommitments;

  const total = commitments.length;
  const completed = commitments.filter(
    (item) => item.status === "completed",
  ).length;
  const inProgress = commitments.filter(
    (item) => item.status === "in_progress",
  ).length;
  const broken = commitments.filter((item) => item.status === "broken").length;
  const stalled = commitments.filter(
    (item) => item.status === "stalled",
  ).length;
  const notStarted = commitments.filter(
    (item) => item.status === "not_started",
  ).length;

  const now = new Date();
  const getDays = (itemDate: string) =>
    Math.ceil(
      (new Date(itemDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

  const overdue = commitments.filter(
    (item) => getDays(item.deadline_date) < 0,
  ).length;
  const thisWeek = commitments.filter((item) => {
    const d = getDays(item.deadline_date);
    return d >= 0 && d <= 7;
  }).length;
  const thisMonth = commitments.filter((item) => {
    const d = getDays(item.deadline_date);
    return d >= 0 && d <= 30;
  }).length;

  const progressPercentage = Math.round((completed / total) * 100);

  const latestUpdates = commitments
    .slice()
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime(),
    )
    .slice(0, 8);

  const cards = [
    {
      label: t("stats.total"),
      value: total,
      icon: <ListChecks size={18} />,
      color: "text-sky-600",
    },
    {
      label: t("stats.completed"),
      value: completed,
      icon: <CircleCheck size={18} />,
      color: "text-green-600",
    },
    {
      label: t("stats.inProgress"),
      value: inProgress,
      icon: <CircleDashed size={18} />,
      color: "text-blue-600",
    },
    {
      label: t("stats.broken"),
      value: broken,
      icon: <CircleX size={18} />,
      color: "text-red-600",
    },
    {
      label: t("stats.stalled"),
      value: stalled,
      icon: <PauseCircle size={18} />,
      color: "text-orange-600",
    },
    {
      label: t("stats.notStarted"),
      value: notStarted,
      icon: <Clock size={18} />,
      color: "text-(--muted)",
    },
  ];

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
        {cards.map((item) => (
          <div
            key={item.label}
            className="glass-card rounded-xl p-4 transition-all hover:scale-[1.02]"
          >
            <div
              className={`inline-flex p-2 rounded-md bg-(--secondary) mb-2 ${item.color}`}
            >
              {item.icon}
            </div>
            <div className="text-2xl font-bold">
              <CountUp end={item.value} />
            </div>
            <div className="text-xs text-(--muted) mt-1 uppercase tracking-wide">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="glass-card rounded-xl p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{t("stats.progressTitle") || "Overall Progress"}</h3>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full h-3 bg-(--secondary) rounded-full overflow-hidden">
            <div
              className="h-3 bg-linear-to-r from-emerald-500 to-teal-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400" />
            <h3 className="font-semibold">{t("stats.urgencyTitle") || "Deadline Urgency"}</h3>
          </div>
          <div className="text-sm text-(--muted-foreground) space-y-1">
            <p>
              {t("stats.overdue") || "Overdue"}: <strong>{overdue}</strong>
            </p>
            <p>
              {t("stats.dueWeek") || "Due this week"}: <strong>{thisWeek}</strong>
            </p>
            <p>
              {t("stats.dueMonth") || "Due this month"}: <strong>{thisMonth}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 overflow-hidden">
        <h3 className="font-semibold mb-3">{t("stats.latestUpdates") || "Latest Updates"}</h3>
        <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
          {latestUpdates.map((item) => (
            <Link
              key={item.id}
              href={`/commitments/${item.id}`}
              className="min-w-70 rounded-lg border border-(--border) p-3 bg-(--card) hover:bg-(--secondary) transition-colors"
            >
              <p className="text-xs text-(--muted) mb-1">
                #{item.point_number} • {item.deadline_date}
              </p>
              <p className="text-sm font-medium leading-snug">
                {language === "ne" ? item.title_ne : item.title_en}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
