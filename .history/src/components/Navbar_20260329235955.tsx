"use client";

import { useTranslate } from "@/lib/i18n/useTranslate";
import { useAppStore } from "@/store/useAppStore";
import { Globe, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { language, toggleTheme, theme } = useAppStore();
  const { t } = useTranslate();

  const toggleLang = () => {
    useAppStore.setState({ language: language === "en" ? "ne" : "en" });
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-(--border)"
      style={{
        backgroundColor: "var(--nav-blur)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" className="text-lg font-extrabold text-gradient">
            {t("nav.brand")}
          </Link>
          <span className="hidden sm:inline text-xs font-medium text-(--muted) border-l border-(--border) pl-2 ml-1 uppercase tracking-widest">
            {t("nav.brandSub")}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm text-(--muted)">
          <Link href="/commitments" className="hover:text-(--foreground)">
            Commitments
          </Link>
          <Link href="/analytics" className="hover:text-(--foreground)">
            Analytics
          </Link>
          <Link href="/news" className="hover:text-(--foreground)">
            News
          </Link>
          <Link href="/methodology" className="hover:text-(--foreground)">
            Methodology
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-(--border) bg-(--card) text-xs font-semibold hover:shadow-sm transition-all"
          >
            <Globe size={14} />
            {language === "en" ? "नेपाली" : "English"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-(--border) bg-(--card) hover:shadow-sm transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
