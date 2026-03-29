import Link from "next/link";
import {
  OTHER_LEAD_BODIES,
  cabinetMeta,
  ministerCabinetStats,
  ministers,
  otherBodyStats,
} from "@/lib/ministers";
import { commitments } from "@/lib/commitments";
import { toSlug } from "@/lib/slug";
import { getLocale } from "@/lib/i18n/server";
import { translations } from "@/lib/i18n/translations";
import { ministryLabel } from "@/lib/i18n/ministry-names";
import CabinetMemberPhoto from "@/components/CabinetMemberPhoto";

function fillTemplate(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (_, key: string) => vars[key] ?? "",
  );
}

type SortKey = "rank" | "score" | "points" | "overdue" | "name";

export default async function CabinetIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort: sortRaw } = await searchParams;
  const sort = (["rank", "score", "points", "overdue", "name"].includes(
    sortRaw ?? "",
  )
    ? sortRaw
    : "rank") as SortKey;

  const language = await getLocale();
  const tc = translations[language].cabinet;
  const partyLabel =
    language === "ne" ? cabinetMeta.party_name_ne : cabinetMeta.party_name_en;
  const now = new Date();

  const subtitle = fillTemplate(tc.indexSubtitle, {
    party: partyLabel,
    count: String(cabinetMeta.member_count),
    date: cabinetMeta.sworn_in_iso,
  });

  const notePm =
    language === "ne" && cabinetMeta.prime_minister_rank_note_ne
      ? cabinetMeta.prime_minister_rank_note_ne
      : cabinetMeta.prime_minister_rank_note_en;

  const discrepancies =
    language === "ne" && cabinetMeta.verification.discrepancies_ne
      ? cabinetMeta.verification.discrepancies_ne
      : cabinetMeta.verification.discrepancies_en;

  const dataRefresh =
    cabinetMeta.data_refreshed_iso ?? cabinetMeta.sworn_in_iso;

  const withStats = ministers.map((m) => ({
    m,
    s: ministerCabinetStats(m, commitments, now),
  }));

  withStats.sort((a, b) => {
    switch (sort) {
      case "score":
        return b.s.score - a.s.score;
      case "points": {
        const ta = a.s.primaryCount + a.s.sharedOnlyCount;
        const tb = b.s.primaryCount + b.s.sharedOnlyCount;
        return tb - ta;
      }
      case "overdue":
        return b.s.overdue - a.s.overdue;
      case "name": {
        const na = language === "ne" ? a.m.name_ne : a.m.name_en;
        const nb = language === "ne" ? b.m.name_ne : b.m.name_en;
        return na.localeCompare(nb, language === "ne" ? "ne" : "en");
      }
      default:
        return a.m.cabinet_rank - b.m.cabinet_rank;
    }
  });

  const sortHref = (key: SortKey) =>
    key === "rank" ? "/cabinet" : `/cabinet?sort=${key}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--border) bg-(--card)/50 backdrop-blur-sm mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-(--foreground)">
              {tc.lastUpdated}: {dataRefresh}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
            {tc.indexTitle}
          </h1>
          <p className="text-(--muted) text-lg font-medium leading-relaxed">{subtitle}</p>
        </div>
        
        <div className="flex flex-col gap-2 min-w-[200px]">
          <span className="text-(--muted) font-semibold text-xs uppercase tracking-widest">{tc.sortLabel}</span>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["rank", tc.sortRank],
                ["score", tc.sortScore],
                ["points", tc.sortPoints],
                ["overdue", tc.sortOverdue],
                ["name", tc.sortName],
              ] as const
            ).map(([key, label]) => (
              <Link
                key={key}
                href={sortHref(key)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  sort === key
                    ? "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20"
                    : "border-(--border) hover:bg-(--secondary) text-(--muted) hover:text-(--foreground)"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-(--border) p-5 mb-8 space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-(--muted)">
          {tc.verifyTitle}
        </h2>
        <p className="text-sm leading-relaxed">{notePm}</p>
        <ul className="text-sm space-y-2 list-disc pl-5">
          {cabinetMeta.verification.sources.map((s) => {
            const contribution =
              language === "ne" && s.contribution_ne
                ? s.contribution_ne
                : s.contribution_en;
            return (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline-offset-2 hover:underline"
                >
                  {s.publisher_en}: {s.title_en}
                </a>
                <span className="text-(--muted)"> — {contribution}</span>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-(--muted) leading-relaxed border-t border-(--border) pt-3">
          {discrepancies}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {withStats.map(({ m, s }) => {
          const total = s.primaryCount + s.sharedOnlyCount;
          const name = language === "ne" ? m.name_ne : m.name_en;
          const portfolio =
            language === "ne" ? m.portfolio_ne : m.portfolio_en;
          const alt =
            m.name_en_alt?.length
              ? `${tc.alsoReportedAs} ${m.name_en_alt.join(", ")}`
              : null;
          const invLine = fillTemplate(tc.involvementSummary, {
            primary: String(s.primaryCount),
            shared: String(s.sharedOnlyCount),
            subs: String(s.subCommitmentCount),
          });

          return (
            <div
              key={m.slug}
              className={`group glass-card rounded-3xl border ${
                m.is_prime_minister ? "border-blue-500/40 shadow-xl shadow-blue-500/10" : "border-(--border)/50 hover:border-amber-500/30 hover:shadow-2xl"
              } p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${
                m.is_prime_minister
                  ? "sm:col-span-2 lg:col-span-3 bg-linear-to-br from-blue-500/5 to-transparent"
                  : ""
              }`}
            >
              <Link
                href={`/cabinet/${m.slug}`}
                className="block relative z-10"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="relative">
                      <CabinetMemberPhoto
                        photo={m.photo}
                        fallbackLetter={name.charAt(0)}
                        alt={name}
                        size={m.is_prime_minister ? "lg" : "sm"}
                        isPrime={m.is_prime_minister}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-(--card) border border-(--border) rounded-md px-1.5 py-0.5 text-[9px] font-black text-(--foreground) shadow-sm">
                        #{m.cabinet_rank}
                      </div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      {m.is_prime_minister && (
                        <div className="mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-blue-500 text-white shadow-sm">
                            {tc.primeMinister}
                          </span>
                        </div>
                      )}
                      <h2 className={`font-extrabold leading-tight text-(--foreground) group-hover:text-blue-500 transition-colors ${m.is_prime_minister ? 'text-2xl' : 'text-lg'}`}>
                        {name}
                      </h2>
                      {alt && (
                        <p className="text-[10px] text-(--muted) mt-0.5 uppercase tracking-wider">{alt}</p>
                      )}
                      <p className={`text-(--muted) mt-1.5 font-medium leading-snug ${m.is_prime_minister ? 'text-base' : 'text-sm'}`}>
                        {portfolio}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl bg-(--background)/50 border border-(--border) backdrop-blur-md shadow-inner min-w-20">
                    <p className="text-3xl font-black text-gradient tracking-tighter" title={tc.scoreFootnote}>
                      {s.score}
                    </p>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-(--muted) mt-1">{tc.trackerScore}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 mb-4">
                  <div className="bg-(--background)/40 border border-(--border)/50 rounded-lg p-2 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase font-bold text-(--muted) mb-1">{tc.pointsTotal}</span>
                    <span className="text-lg font-black text-(--foreground)">{total}</span>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-500 mb-1">{tc.done}</span>
                    <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">{s.completed}</span>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-500 mb-1">{tc.active}</span>
                    <span className="text-lg font-black text-blue-700 dark:text-blue-400">{s.inProgress}</span>
                  </div>
                  <div className={`border rounded-lg p-2 flex flex-col items-center justify-center ${s.overdue > 0 ? "bg-red-500/10 border-red-500/20" : "bg-(--background)/40 border-(--border)/50"}`}>
                    <span className={`text-[10px] uppercase font-bold mb-1 ${s.overdue > 0 ? "text-red-600 dark:text-red-500" : "text-(--muted)"}`}>{tc.overdue}</span>
                    <span className={`text-lg font-black ${s.overdue > 0 ? "text-red-700 dark:text-red-400" : "text-(--foreground)"}`}>{s.overdue}</span>
                  </div>
                </div>
              </Link>
              
              <div className="pt-4 border-t border-(--border)/60 flex flex-wrap gap-2 items-center">
                {m.tracker_ministries.map((mn) => (
                  <Link
                    key={mn}
                    href={`/ministry/${toSlug(mn)}`}
                    className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-lg border border-(--border) bg-(--card) hover:bg-(--foreground) hover:text-(--background) transition-colors shadow-sm"
                    title={tc.scorecardLink}
                  >
                    {ministryLabel(mn, language)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-(--muted) mt-10 max-w-3xl leading-relaxed border-t border-(--border) pt-6">
        {tc.scoreFootnote}{" "}
        <Link href="/methodology" className="underline underline-offset-2">
          {language === "ne" ? "विधि पृष्ठ" : "Methodology"}
        </Link>
      </p>

      <div className="mt-14 space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{tc.otherBodiesTitle}</h2>
          <p className="text-(--muted) text-sm max-w-3xl mt-2">
            {tc.otherBodiesIntro}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OTHER_LEAD_BODIES.map((body) => {
            const os = otherBodyStats(body, commitments, now);
            const label =
              language === "ne" ? body.primaryLabelNe : body.primaryLabelEn;
            const touched = commitments.filter(body.predicate);
            return (
              <div
                key={body.id}
                className="glass-card rounded-2xl border border-(--border) p-5"
              >
                <h3 className="font-bold mb-2">{label}</h3>
                <p className="text-xs text-(--muted) mb-3">
                  {fillTemplate(tc.involvementSummary, {
                    primary: String(os.primaryCount),
                    shared: "0",
                    subs: String(os.subCommitmentCount),
                  })}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span>
                    {tc.trackerScore}: <strong>{os.score}</strong>
                  </span>
                  <span>
                    {tc.overdue}: <strong>{os.overdue}</strong>
                  </span>
                </div>
                <ul className="mt-3 text-xs text-(--muted) space-y-1 font-mono">
                  {touched.slice(0, 8).map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/commitments/${c.id}`}
                        className="hover:text-(--foreground) underline-offset-2 hover:underline"
                      >
                        #{c.point_number}
                      </Link>
                    </li>
                  ))}
                  {touched.length > 8 ? (
                    <li>+{touched.length - 8} …</li>
                  ) : null}
                </ul>
                <Link
                  href="/commitments"
                  className="inline-block mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400"
                >
                  {tc.viewAllCommitments} →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
