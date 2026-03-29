"use client";

import Link from "next/link";
import { CountUp } from "./ui/CountUp";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { sampleCommitments } from "@/lib/sample-data";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CircleCheck,
  CircleDashed,
  CircleX,
  Clock,
  ListChecks,
  PauseCircle,
  TrendingUp,
  Activity,
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
    (item) => getDays(item.deadline_date) < 0 && item.status !== "completed",
  ).length;
  const thisWeek = commitments.filter((item) => {
    const d = getDays(item.deadline_date);
    return d >= 0 && d <= 7 && item.status !== "completed";
  }).length;

  const progressPercentage = Math.round((completed / total) * 100) || 1; // avoid 0% initially for visual scale
  const activePercentage = Math.round((inProgress / total) * 100);

  const latestUpdates = commitments
    .slice()
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime(),
    )
    .slice(0, 5);

  const metricCards = [
    {
      label: t("stats.total") || "Total Promises",
      value: total,
      icon: <ListChecks size={20} />,
      color: "text-(--foreground)",
      bg: "bg-(--card)",
    },
    {
      label: t("stats.completed") || "Completed",
      value: completed,
      icon: <CircleCheck size={20} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: t("stats.inProgress") || "In Progress",
      value: inProgress,
      icon: <Activity size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: t("stats.broken") || "Broken",
      value: broken,
      icon: <CircleX size={20} />,
      color: "text-red-500",
      bg: "bg-red-500/10 border-red-500/20",
    },
    {
      label: t("stats.stalled") || "Stalled",
      value: stalled,
      icon: <PauseCircle size={20} />,
      color: "text-orange-500",
      bg: "bg-orange-500/10 border-orange-500/20",
    },
    {
      label: t("stats.notStarted") || "Not Started",
      value: notStarted,
      icon: <Clock size={20} />,
      color: "text-(--muted)",
      bg: "bg-(--secondary)",
    },
  ];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Title */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">
          {language === "ne"
            ? "राष्ट्रिय प्रगति ड्यासबोर्ड"
            : "National Progress Dashboard"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Progress Overview (Span 4) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-8 border border-(--border)/50 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-(--muted) uppercase tracking-widest text-sm">
                {t("stats.progressTitle") || "Overall Execution"}
              </h3>
            </div>

            <div className="flex items-end gap-3 mb-2">
              <span className="text-6xl font-black tracking-tighter text-gradient">
                {progressPercentage}%
              </span>
              <span className="text-sm font-medium text-(--muted) mb-2 uppercase tracking-wide">
                {language === "ne" ? "सम्पन्न" : "Delivered"}
              </span>
            </div>
            <p className="text-sm text-(--muted) mb-8">
              {language === "ne"
                ? `हालसम्म ${inProgress}% कार्यन्वयन चरणमा रहेका छन्।`
                : `${activePercentage}% of commitments are currently under active implementation.`}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-emerald-500">
                  {language === "ne" ? "पूरा" : "Completed"}
                </span>
                <span className="text-(--muted)">
                  {completed} / {total}
                </span>
              </div>
              <div className="w-full h-2 bg-(--background) rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-blue-500">
                  {language === "ne" ? "कार्यरत" : "In Progress"}
                </span>
                <span className="text-(--muted)">
                  {inProgress} / {total}
                </span>
              </div>
              <div className="w-full h-2 bg-(--background) rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activePercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Metrics (Span 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {metricCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`glass-card rounded-2xl p-5 border flex flex-col justify-between ${card.bg === "bg-(--card)" ? "border-(--border)" : card.bg}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2 rounded-xl bg-(--background)/50 backdrop-blur-sm shadow-sm ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
              <div>
                <div className="text-3xl font-black tracking-tight mb-1">
                  <CountUp end={card.value} />
                </div>
                <div className="text-xs font-semibold text-(--muted) uppercase tracking-wider">
                  {card.label}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Alert/Urgency Card spanning 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="col-span-1 sm:col-span-2 md:col-span-2 glass-card rounded-2xl p-5 border border-amber-500/30 bg-amber-500/5 relative overflow-hidden flex items-center justify-between"
          >
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <AlertTriangle size={120} />
            </div>
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-amber-500" />
                <h3 className="font-semibold text-amber-600 dark:text-amber-500 text-sm uppercase tracking-wider">
                  {t("stats.urgencyTitle") || "Critical Deadlines"}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    {overdue}
                  </div>
                  <div className="text-[10px] font-semibold text-(--muted) uppercase tracking-widest">
                    {t("stats.overdue") || "Overdue Tasks"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-500">
                    {thisWeek}
                  </div>
                  <div className="text-[10px] font-semibold text-(--muted) uppercase tracking-widest">
                    {t("stats.dueWeek") || "Due This Week"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick link button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-2xl border border-(--border) flex flex-col p-5 hover:bg-(--secondary)/50 transition-colors cursor-pointer justify-center items-center group text-center"
          >
            <div className="w-10 h-10 rounded-full bg-(--foreground) text-(--background) flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Activity size={18} />
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider group-hover:text-blue-500 transition-colors">
              {language === "ne" ? "अपडेट हरू हेर्नुहोस्" : "Live Updates"}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
