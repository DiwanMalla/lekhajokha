"use client";

import { motion } from "framer-motion";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { useEffect, useState } from "react";

function CountdownTimer() {
  // Agenda announced March 27, 2026. 100 days = July 5, 2026.
  const targetDate = new Date("2026-07-05T00:00:00+05:45").getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const { language } = useTranslate();

  return (
    <div className="flex items-center gap-3 justify-center mt-8">
      {[
        { value: timeLeft.days, label: language === "ne" ? "दिन" : "Days" },
        { value: timeLeft.hours, label: language === "ne" ? "घण्टा" : "Hours" },
        {
          value: timeLeft.minutes,
          label: language === "ne" ? "मिनेट" : "Minutes",
        },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="glass-card rounded-xl px-5 py-3 min-w-[72px] text-center">
            <span className="text-3xl font-extrabold tabular-nums">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs mt-1.5 font-semibold uppercase tracking-widest text-[var(--muted)]">
            {item.label}
          </span>
          {i < 2 && <span className="hidden" />}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const { t, language } = useTranslate();

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 via-amber-50/30 to-transparent dark:from-blue-950/20 dark:via-amber-950/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm font-semibold">{t("hero.badge")}</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 text-gradient leading-tight pb-1"
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base md:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)] mt-8 mb-1">
              {language === "ne" ? "१०० दिने म्याद" : "100-Day Deadline"}
            </p>
            <CountdownTimer />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
