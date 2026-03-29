"use client";

import { motion } from "framer-motion";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Activity, Clock, Target } from "lucide-react";

function TrackingHud() {
  // Agenda announced March 27, 2026. 100 days = July 5, 2026.
  const targetDate = new Date("2026-07-05T00:00:00+05:45").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const { language } = useTranslate();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;

  const totalDays = 100;
  const daysPassed = totalDays - timeLeft.days;
  const progressPercent = Math.max(0, Math.min(100, (daysPassed / totalDays) * 100));

  return (
    <div className="relative w-full max-w-sm mx-auto lg:ml-auto perspective-1000">
      <motion.div 
        initial={{ opacity: 0, rotateY: 10, x: 20 }}
        animate={{ opacity: 1, rotateY: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        className="glass-card rounded-2xl border border-(--border)/50 p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-(--card)/60"
      >
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                {language === "ne" ? "प्रत्यक्ष अनुगमन" : "Live Tracking"}
              </span>
            </div>
            <Activity className="w-4 h-4 text-(--muted)" />
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-(--muted) uppercase tracking-widest mb-2">
              {language === "ne" ? "१००-दिने समयसीमा" : "100-Day Deadline"}
            </h3>
            <div className="flex gap-3 justify-between">
              {[
                { value: timeLeft.days, label: language === "ne" ? "दिन" : "Days" },
                { value: timeLeft.hours, label: language === "ne" ? "घण्टा" : "Hours" },
                { value: timeLeft.minutes, label: language === "ne" ? "मिनेट" : "Mins" },
                { value: timeLeft.seconds, label: language === "ne" ? "सेकेन्ड" : "Secs" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-(--background)/50 border border-(--border) rounded-lg py-2 flex justify-center items-center shadow-inner">
                    <span className="text-xl md:text-2xl font-black font-mono tracking-tighter text-gradient">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[10px] mt-1.5 font-semibold uppercase tracking-wider text-(--muted)">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar styled as a radar line */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-(--muted)">{language === "ne" ? "समय बित्यो" : "Time Elapsed"}</span>
              <span className="text-(--foreground)">{progressPercent.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 w-full bg-(--background)/50 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-500 to-amber-500 rounded-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-(--muted) mt-1">
              <span>Mar 27</span>
              <span>Jul 5</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { t, language } = useTranslate();

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden min-h-[85vh] flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-(--background) -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/20 blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--border) bg-(--card)/50 backdrop-blur-sm mb-6 shadow-sm"
            >
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-(--foreground)">
                {language === "ne" ? "लेखाजोखा: शासकीय सुधार ट्र्याकर" : "Lekhajokha: Governance Reform Tracker"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight pb-2"
            >
              <span className="text-(--foreground)">{language === "ne" ? "सरकारको" : "Tracking The"}</span>
              <br />
              <span className="text-gradient">
                {language === "ne" ? "१००-दिने वाचा" : "100-Point Agenda"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-(--muted) mb-8 leading-relaxed font-medium max-w-xl"
            >
              {language === "ne" 
                ? "हामी सरकारको हरेक निर्णय र घोषणाको स्वतन्त्र रूपमा ट्र्याक गर्छौं। तथ्यमा आधारित, पारदर्शी र पूर्ण निष्पक्ष।" 
                : "Real-time, independent monitoring of the government's governance reform commitments. Data-driven, transparent, and completely impartial."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link 
                href="#commitments" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-(--foreground) text-(--background) font-semibold hover:scale-105 transition-transform duration-200 shadow-md"
              >
                {language === "ne" ? "सम्पूर्ण प्रतिरेखाहरू हेर्नुहोस्" : "Explore Commitments"}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#methodology" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-(--card)/80 backdrop-blur-sm border border-(--border) text-(--foreground) font-semibold hover:bg-(--secondary) transition-colors duration-200"
              >
                <Clock className="w-5 h-5 text-(--muted)" />
                {language === "ne" ? "हाम्रो विधि" : "Our Methodology"}
              </Link>
            </motion.div>
          </div>

          <TrackingHud />

        </div>
      </div>
    </section>
  );
}

