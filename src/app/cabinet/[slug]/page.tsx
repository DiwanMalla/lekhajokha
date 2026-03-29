import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cabinetMeta,
  commitmentInvolvementForMinister,
  commitmentsTouchingMinister,
  getMinisterBySlug,
  ministerCabinetStats,
  ministers,
} from "@/lib/ministers";
import { commitments } from "@/lib/commitments";
import { toSlug } from "@/lib/slug";
import type { Status } from "@/types";
import { getLocale } from "@/lib/i18n/server";
import { translations } from "@/lib/i18n/translations";
import { ministryLabel } from "@/lib/i18n/ministry-names";
import CabinetMemberPhoto from "@/components/CabinetMemberPhoto";

export function generateStaticParams() {
  return ministers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMinisterBySlug(slug);
  if (!m) return { title: "Minister" };
  return {
    title: `${m.name_en} | ${m.name_ne} — Lekhajokha`,
    description: m.portfolio_en,
  };
}

export default async function CabinetMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMinisterBySlug(slug);
  if (!m) notFound();

  const language = await getLocale();
  const tc = translations[language].cabinet;
  const st = translations[language].status;

  const name = language === "ne" ? m.name_ne : m.name_en;
  const portfolio =
    language === "ne" ? m.portfolio_ne : m.portfolio_en;
  const now = new Date();
  const stats = ministerCabinetStats(m, commitments, now);
  const rows = commitmentsTouchingMinister(m, commitments).sort(
    (a, b) => a.point_number - b.point_number,
  );

  const statusLabel = (s: Status) => st[s];

  const altLine = m.name_en_alt?.length
    ? `${tc.alsoReportedAs} ${m.name_en_alt.join(", ")}`
    : null;

  const invLine = tc.involvementSummary
    .replace("{{primary}}", String(stats.primaryCount))
    .replace("{{shared}}", String(stats.sharedOnlyCount))
    .replace("{{subs}}", String(stats.subCommitmentCount));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/cabinet"
        className="text-sm text-(--muted) hover:text-(--foreground) mb-6 inline-block"
      >
        {tc.backToCabinet}
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10 glass-card p-6 md:p-10 border border-(--border)/50 rounded-3xl mb-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="shrink-0 flex flex-col items-center lg:items-start gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative ring-4 ring-(--background) rounded-full shadow-xl">
              <CabinetMemberPhoto
                photo={m.photo}
                fallbackLetter={name.charAt(0)}
                alt={name}
                size="lg"
                isPrime={m.is_prime_minister}
              />
              {m.is_prime_minister && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full border-4 border-(--card) shadow-lg" title={tc.primeMinister}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
              )}
            </div>
          </div>

          <div className="text-center lg:text-left space-y-1 mt-2">
            {m.photo?.credit_short ? (
              <p className="text-[10px] text-(--muted) uppercase tracking-wider font-semibold">
                {tc.photoCredit}: {m.photo.credit_short}
              </p>
            ) : (
              <p className="text-[10px] text-(--muted) uppercase tracking-wider font-semibold">
                {tc.placeholderNoPhoto}
              </p>
            )}
            {m.photo?.commons_page && (
              <a
                href={m.photo.commons_page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
              >
                {tc.openCommons} <span className="text-[8px]">↗</span>
              </a>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-(--secondary) border border-(--border) text-(--muted)">
              #{m.cabinet_rank} • {cabinetMeta.party_short}
            </span>
            {m.is_prime_minister ? (
              <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500 text-white shadow-md shadow-blue-500/30">
                {tc.primeMinister}
              </span>
            ) : null}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-center lg:text-left tracking-tight mb-2">
            {name}
          </h1>

          {altLine && (
            <p className="text-xs text-(--muted) text-center lg:text-left font-medium uppercase tracking-widest mb-4">{altLine}</p>
          )}

          <div className="inline-block px-4 py-2 rounded-xl bg-(--background)/50 border border-(--border)/50 backdrop-blur-sm self-center lg:self-start mt-2 mb-4">
            <p className="text-base md:text-lg text-blue-600 dark:text-blue-400 font-bold leading-relaxed">
              {portfolio}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center font-medium gap-x-6 gap-y-2 text-sm text-(--muted) justify-center lg:justify-start">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {tc.swornIn}: <strong className="text-(--foreground)">{cabinetMeta.sworn_in_iso}</strong>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {invLine}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
            <div className="glass-card rounded-2xl p-4 border border-blue-500/30 bg-blue-500/5 col-span-2 sm:col-span-3 lg:col-span-2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded bg-blue-500 animate-pulse" />
                <p className="text-[10px] uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400">{tc.trackerScore}</p>
              </div>
              <p className="text-4xl font-black tabular-nums tracking-tighter text-(--foreground)">{stats.score}</p>
            </div>
            
            <div className="glass-card rounded-2xl p-4 border border-(--border) flex flex-col justify-center">
              <p className="text-[10px] uppercase font-bold tracking-widest text-(--muted) mb-1">{tc.pointsTotal}</p>
              <p className="text-2xl font-black tabular-nums">{stats.primaryCount + stats.sharedOnlyCount}</p>
            </div>
            
            <div className="glass-card rounded-2xl p-4 border border-emerald-500/20 bg-emerald-500/5 flex flex-col justify-center">
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-500 mb-1">{tc.done}</p>
              <p className="text-2xl font-black tabular-nums text-emerald-700 dark:text-emerald-400">{stats.completed}</p>
            </div>
            
            <div className="glass-card rounded-2xl p-4 border border-indigo-500/20 bg-indigo-500/5 flex flex-col justify-center">
              <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">{tc.active}</p>
              <p className="text-2xl font-black tabular-nums text-indigo-700 dark:text-indigo-400">{stats.inProgress}</p>
            </div>
            
            <div className={`glass-card rounded-2xl p-4 border flex flex-col justify-center ${stats.overdue > 0 ? 'border-red-500/30 bg-red-500/10' : 'border-(--border)'}`}>
              <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${stats.overdue > 0 ? 'text-red-600 dark:text-red-500' : 'text-(--muted)'}`}>{tc.overdue}</p>
              <p className={`text-2xl font-black tabular-nums ${stats.overdue > 0 ? 'text-red-700 dark:text-red-400' : 'text-(--foreground)'}`}>
                {stats.overdue}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-(--muted) mt-10 max-w-3xl">{tc.rosterVerifyNote}</p>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">{tc.trackerMinistriesTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {m.tracker_ministries.map((mn) => (
            <Link
              key={mn}
              href={`/ministry/${toSlug(mn)}`}
              className="text-sm px-3 py-1.5 rounded-lg border border-(--border) bg-(--secondary) hover:bg-(--muted)/10"
            >
              {ministryLabel(mn, language)}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{tc.commitmentsTitle}</h2>
          <p className="text-sm text-(--muted) mt-1 max-w-2xl">{language === "ne" ? "यस मन्त्रालयसँग सम्बन्धित सबै प्राथमिक तथा समन्वयकारी प्रतिबद्धताहरू।" : "All primary and coordinating commitments associated with this portfolio."}</p>
        </div>
        
        {rows.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 border border-(--border) text-center">
            <p className="text-(--muted) font-medium">{tc.noCommitments}</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rows.map((item) => {
              const role = commitmentInvolvementForMinister(m, item)!;
              const roleLabel = role === "primary" ? tc.primaryLead : tc.coordinating;
              return (
                <li key={item.id} className="h-full">
                  <Link
                    href={`/commitments/${item.id}`}
                    className="flex flex-col h-full justify-between glass-card rounded-2xl border border-(--border) p-5 hover:border-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                            #{item.point_number}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-(--secondary) border border-(--border) text-(--muted)">
                            {roleLabel}
                          </span>
                        </div>
                        <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${
                          item.status === 'completed' ? 'text-emerald-700 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-900/50 dark:bg-emerald-950/30' :
                          item.status === 'in_progress' ? 'text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-900/50 dark:bg-blue-950/30' :
                          item.status === 'broken' ? 'text-red-700 border-red-200 bg-red-50 dark:text-red-400 dark:border-red-900/50 dark:bg-red-950/30' :
                          item.status === 'stalled' ? 'text-orange-700 border-orange-200 bg-orange-50 dark:text-orange-400 dark:border-orange-900/50 dark:bg-orange-950/30' :
                          'text-(--muted) border-(--border) bg-(--secondary)'
                        }`}>
                          {statusLabel(item.status)}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm leading-snug group-hover:text-blue-600 transition-colors mb-4">
                        {language === "ne" ? item.title_ne : item.title_en}
                      </h3>
                    </div>
                    
                    <div className="pt-3 border-t border-(--border)/50 flex items-center justify-between text-xs text-(--muted)">
                      <span className="truncate flex-1 font-medium">
                        {ministryLabel(item.responsible_ministry, language)}
                        {item.shared_ministries?.length ? ` · +${item.shared_ministries.length}` : ""}
                      </span>
                      <span className="shrink-0 font-medium whitespace-nowrap bg-(--background) px-2 py-1 rounded border border-(--border)/50 shadow-sm ml-2">
                        {item.deadline_date}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
