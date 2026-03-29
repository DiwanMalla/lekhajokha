"use client";

import { motion } from "framer-motion";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { CheckCircle2, Loader, XCircle, Pause, Circle, ShieldCheck } from "lucide-react";

const statuses = [
  {
    key: "not_started",
    tKey: "notStartedDesc",
    icon: <Circle size={24} />,
    color: "#6b7280",
    bg: "bg-gray-500/10",
  },
  {
    key: "in_progress",
    tKey: "inProgressDesc",
    icon: <Loader size={24} className="animate-spin-slow" />,
    color: "#3b82f6",
    bg: "bg-blue-500/10",
  },
  {
    key: "completed",
    tKey: "completedDesc",
    icon: <CheckCircle2 size={24} />,
    color: "#10b981",
    bg: "bg-emerald-500/10",
  },
  {
    key: "stalled",
    tKey: "stalledDesc",
    icon: <Pause size={24} />,
    color: "#f59e0b",
    bg: "bg-orange-500/10",
  },
  {
    key: "broken",
    tKey: "brokenDesc",
    icon: <XCircle size={24} />,
    color: "#ef4444",
    bg: "bg-red-500/10",
  },
];

export default function Methodology() {
  const { t, language } = useTranslate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 w-full" id="methodology">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-[2rem] p-8 md:p-12 border border-(--border)/60 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <ShieldCheck size={200} />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
          <h2 className="text-3xl font-black mb-4 tracking-tight">
            {language === "ne" ? "हाम्रो मूल्याङ्कन पद्धति" : "Our Assessment Methodology"}
          </h2>
          <p className="text-(--muted) text-sm md:text-base">
            {language === "ne" 
              ? "प्रत्येक वाचालाई तथ्य, सरकारी निर्णय र विश्वसनीय समाचारका आधारमा १०० दिनको कडा समयरेखा भित्र परीक्षण गरिन्छ।"
              : "Every commitment is stringently tested against hard facts, official gazettes, and independent media within the 100-day framework."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
          {statuses.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center text-center p-6 rounded-2xl border border-(--border)/50 backdrop-blur-sm ${s.bg} transition-all duration-300`}
            >
              <div className="mb-4 p-3 rounded-xl bg-(--background)/50 shadow-inner" style={{ color: s.color }}>
                {s.icon}
              </div>
              <h3 className="font-extrabold text-sm mb-2 uppercase tracking-wide" style={{ color: s.color }}>
                {t(`status.${s.key}` as any)}
              </h3>
              <p className="text-xs text-(--foreground) font-medium leading-relaxed opacity-80">
                {t(`methodology.${s.tKey}` as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
