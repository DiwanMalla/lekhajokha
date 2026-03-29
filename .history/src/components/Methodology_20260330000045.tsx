"use client";

import { motion } from "framer-motion";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { CheckCircle2, Loader, XCircle, Pause, Circle } from "lucide-react";

const statuses = [
  {
    key: "not_started",
    tKey: "notStartedDesc",
    icon: <Circle size={18} />,
    color: "#6b7280",
  },
  {
    key: "in_progress",
    tKey: "inProgressDesc",
    icon: <Loader size={18} />,
    color: "#3b82f6",
  },
  {
    key: "completed",
    tKey: "completedDesc",
    icon: <CheckCircle2 size={18} />,
    color: "#10b981",
  },
  {
    key: "broken",
    tKey: "brokenDesc",
    icon: <XCircle size={18} />,
    color: "#ef4444",
  },
  {
    key: "stalled",
    tKey: "stalledDesc",
    icon: <Pause size={18} />,
    color: "#f59e0b",
  },
];

export default function Methodology() {
  const { t, language } = useTranslate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center">
          {language === "ne" ? "हाम्रो पद्धति" : "Our Methodology"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statuses.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center text-center p-4 rounded-xl"
              style={{ backgroundColor: `${s.color}08` }}
            >
              <div className="mb-2" style={{ color: s.color }}>
                {s.icon}
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: s.color }}>
                {t(`status.${s.key}` as any)}
              </h3>
              <p className="text-xs text-(--muted) leading-relaxed">
                {t(`methodology.${s.tKey}` as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
