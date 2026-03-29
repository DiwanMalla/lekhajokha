"use client";

import { useTranslate } from "@/lib/i18n/useTranslate";
import { useAppStore } from "@/store/useAppStore";
import { Globe, Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { language, toggleTheme, theme } = useAppStore();
  const { t } = useTranslate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const lang = useAppStore.getState().language;
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
    document.cookie = `app-language=${lang}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  const toggleLang = () => {
    const next = language === "en" ? "ne" : "en";
    document.documentElement.lang = next === "ne" ? "ne" : "en";
    document.cookie = `app-language=${next}; path=/; max-age=31536000; samesite=lax`;
    useAppStore.setState({ language: next });
    router.refresh();
  };

  const closeMobileMenu = () => setMobileOpen(false);

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
          <Link href="/cabinet" className="hover:text-(--foreground)">
            {t("nav.cabinet")}
          </Link>
          <Link href="/commitments" className="hover:text-(--foreground)">
            {t("nav.commitments")}
          </Link>
          <Link href="/analytics" className="hover:text-(--foreground)">
            {t("nav.analytics")}
          </Link>
          <Link href="/news" className="hover:text-(--foreground)">
            {t("nav.news")}
          </Link>
          <Link href="/methodology" className="hover:text-(--foreground)">
            {t("nav.methodology")}
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

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full border border-(--border) bg-(--card) hover:shadow-sm transition-all"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-(--border) bg-(--card)/95 backdrop-blur px-4 py-3">
          <div className="flex flex-col gap-1 text-sm">
            <Link
              href="/cabinet"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-(--secondary)"
            >
              {t("nav.cabinet")}
            </Link>
            <Link
              href="/commitments"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-(--secondary)"
            >
              {t("nav.commitments")}
            </Link>
            <Link
              href="/analytics"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-(--secondary)"
            >
              {t("nav.analytics")}
            </Link>
            <Link
              href="/news"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-(--secondary)"
            >
              {t("nav.news")}
            </Link>
            <Link
              href="/methodology"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-(--secondary)"
            >
              {t("nav.methodology")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
