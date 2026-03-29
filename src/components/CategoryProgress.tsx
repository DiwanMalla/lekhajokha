"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { sampleCommitments } from "@/lib/sample-data";
import { categoryMeta } from "@/lib/commitments";

export default function CategoryProgress() {
  const { t } = useTranslate();

  const grouped = Object.entries(categoryMeta).map(([id, meta]) => {
    const list = sampleCommitments.filter((item) => item.category_id === id);
    const completed = list.filter((item) => item.status === "completed").length;
    const inProgress = list.filter(
      (item) => item.status === "in_progress",
    ).length;
    const score = Math.round(
      ((completed + inProgress * 0.5) / Math.max(list.length, 1)) * 100,
    );

    return {
      id,
      ...meta,
      total: list.length,
      completed,
      inProgress,
      score,
    };
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Category Scorecards</h2>
        <p className="text-sm text-(--muted) mt-1">
          12-category breakdown with weighted delivery scores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grouped.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="glass-card rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="text-xs font-bold text-(--muted) uppercase tracking-wider">
                Category {item.id}
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-(--foreground) text-(--background)">
                {item.score}%
              </span>
            </div>

            <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-amber-600 transition-colors">
              {t(`categories.${item.name_en}`)}
            </h3>
            <p className="text-xs text-(--muted) mb-4">
              {item.completed}/{item.total} completed • {item.inProgress} in
              progress
            </p>

            <div className="h-2 rounded-full bg-(--secondary) overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-2 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.1)]"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
