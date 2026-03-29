"use client";

import { useTranslate } from "@/lib/i18n/useTranslate";

export default function Footer() {
  const { t } = useTranslate();

  return (
    <footer className="py-12 text-center border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-bold mb-1">{t("footer.tagline")}</p>
        <p className="text-xs text-[var(--muted)] mb-4">
          {t("footer.subtitle")}
        </p>
        <div className="flex items-center justify-center gap-2 text-[var(--muted)]">
          <span className="w-4 h-[1px] bg-[var(--border)]" />
          <span className="text-xs">◆</span>
          <span className="w-4 h-[1px] bg-[var(--border)]" />
        </div>
        <p className="text-xs text-[var(--muted)] mt-4">
          © {new Date().getFullYear()} Lekhajokha. Open-source accountability.
        </p>
      </div>
    </footer>
  );
}
