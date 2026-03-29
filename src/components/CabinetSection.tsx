"use client";

import CabinetMemberPhoto from "@/components/CabinetMemberPhoto";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { ministers } from "@/lib/ministers";
import { motion } from "framer-motion";
import { Users, Briefcase } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

export default function CabinetSection() {
  const { t, language } = useTranslate();

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--border)] border border-[var(--border)] mb-4">
          <Users size={16} />
          <span className="text-sm font-semibold uppercase tracking-widest">
            {t("nav.cabinet")}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          {t("cabinet.homeSectionTitle")}
        </h2>
        <p className="text-[var(--color-brand-gray)] opacity-80 max-w-2xl mx-auto">
          {t("cabinet.homeSectionSubtitle")}
        </p>
        <div className="mt-6">
          <Link
            href="/cabinet"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-semibold hover:shadow-sm transition-shadow"
          >
            {t("cabinet.fullCabinetCta")}
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ministers.map((minister, i) => {
          const name =
            language === "ne" ? minister.name_ne : minister.name_en;
          return (
            <MotionLink
              key={minister.slug}
              href={`/cabinet/${minister.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`glass-card rounded-2xl p-5 flex items-start gap-4 hover:-translate-y-1 transition-transform no-underline text-inherit ${
                i === 0
                  ? "sm:col-span-2 lg:col-span-3 border-2 border-blue-500/30"
                  : ""
              }`}
            >
              <CabinetMemberPhoto
                photo={minister.photo}
                fallbackLetter={name.charAt(0)}
                alt={name}
                size="sm"
                isPrime={minister.is_prime_minister}
              />
              <div className="grow min-w-0">
                <h3
                  className={`font-bold leading-snug ${i === 0 ? "text-xl" : "text-base"}`}
                >
                  {name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-[var(--color-brand-gray)] opacity-80">
                  <Briefcase size={14} className="shrink-0" />
                  <span className="truncate">
                    {language === "ne"
                      ? minister.portfolio_ne
                      : minister.portfolio_en}
                  </span>
                </div>
                {i === 0 && (
                  <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider">
                    {t("cabinet.primeMinister")}
                  </span>
                )}
              </div>
            </MotionLink>
          );
        })}
      </div>
    </section>
  );
}
