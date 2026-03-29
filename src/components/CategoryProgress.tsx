"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { sampleCommitments } from "@/lib/sample-data";
import { categoryMeta } from "@/lib/commitments";
import { ArrowUpRight } from "lucide-react";

export default function CategoryProgress() {
  const { t, language } = useTranslate();

  const grouped = Object.entries(categoryMeta).map(([id, meta]) => {
    const list = sampleCommitments.filter((item) => item.category_id === id);
    const completed = list.filter((item) => item.status === "completed").length;
    const inProgress = list.filter((item) => item.status === "in_progress").length;
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
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" id="categories">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            {language === "ne" ? "क्षेत्रगत प्रगति" : "Sectoral Performance"}
          </h2>
          <p className="text-sm text-(--muted) max-w-xl">
            {language === "ne" 
              ? "१२ वटा मुख्य क्षेत्रहरूमा बाँडिएका सय दिने कार्ययोजनाको प्रगति स्थिति।"
              : "Comprehensive breakdown of the 100-point agenda across 12 strategic sectors. Delivery scores are weighted by task completion."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {grouped.map((item, idx) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="group glass-card rounded-2xl p-6 border border-(--border)/50 hover:bg-(--secondary)/30 hover:border-(--border) transition-all duration-300 relative overflow-hidden flex transform hover:-translate-y-1"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[var(--cat-color)] opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ '--cat-color': item.color } as React.CSSProperties} />
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                    {item.id}
                  </div>
                  <ArrowUpRight size={16} className="text-(--muted) group-hover:text-(--foreground) transition-colors" />
                </div>
                
                <h3 className="font-semibold text-base leading-snug mb-2 group-hover:text-amber-500 transition-colors">
                  {t(`categories.${item.name_en}`)}
                </h3>
              </div>
              
              <div className="flex items-end justify-between mt-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-(--muted) font-semibold">
                    {language === "ne" ? "सम्पन्न / कूल" : "Done / Total"}
                  </p>
                  <p className="text-sm font-medium">
                    <span className="text-(--foreground)">{item.completed}</span>
                    <span className="text-(--muted)"> / {item.total}</span>
                  </p>
                </div>
                
                {/* SVG Radial Progress */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background Circle */}
                    <circle 
                      cx="18" cy="18" r="15.915" 
                      fill="transparent" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      className="text-(--secondary)" 
                    />
                    {/* Progress Circle */}
                    <motion.circle 
                      cx="18" cy="18" r="15.915" 
                      fill="transparent" 
                      stroke={item.color} 
                      strokeWidth="3" 
                      strokeDasharray="100 100"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 100 - item.score }}
                      transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold">
                    {item.score}%
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
