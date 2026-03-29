"use client";

import { useTranslate } from "@/lib/i18n/useTranslate";

export default function Footer() {
  const { t } = useTranslate();

  return (
    <footer className="py-12 text-center border-t border-(--border)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-bold mb-1">{t("footer.tagline")}</p>
        <p className="text-xs text-(--muted) mb-4">{t("footer.subtitle")}</p>
        <div className="flex items-center justify-center gap-2 text-(--muted)">
          <span className="w-4 h-px bg-(--border)" />
          <span className="text-xs">◆</span>
          <span className="w-4 h-px bg-(--border)" />
        </div>
        <p className="text-xs text-(--muted) mt-4">
          © {new Date().getFullYear()} Lekhajokha. Open-source accountability.
        </p>
      </div>
    </footer>
  );
}
