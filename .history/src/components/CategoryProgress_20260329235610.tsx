"use client";

import Link from 'next/link';
import { useTranslate } from '@/lib/i18n/useTranslate';
import { sampleCommitments } from '@/lib/sample-data';
import { categoryMeta } from '@/lib/commitments';

export default function CategoryProgress() {
  const { t } = useTranslate();

  const grouped = Object.entries(categoryMeta).map(([id, meta]) => {
    const list = sampleCommitments.filter((item) => item.category_id === id);
    const completed = list.filter((item) => item.status === 'completed').length;
    const inProgress = list.filter((item) => item.status === 'in_progress').length;
    const score = Math.round(((completed + inProgress * 0.5) / Math.max(list.length, 1)) * 100);

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
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Category Scorecards</h2>
        <p className="text-sm text-slate-600 mt-1">12-category breakdown with weighted delivery scores.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {grouped.map((item) => (
          <Link key={item.id} href={`/category/${item.slug}`} className="glass-card rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="text-xs font-semibold text-slate-500">Category {item.id}</div>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-900 text-white">{item.score}%</span>
            </div>

            <h3 className="font-semibold text-sm leading-snug mb-2">{t(`categories.${item.name_en}`)}</h3>
            <p className="text-xs text-slate-600 mb-3">{item.completed}/{item.total} completed • {item.inProgress} in progress</p>

            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-2" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
