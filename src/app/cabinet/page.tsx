import Link from "next/link";
import {
  cabinetMeta,
  cabinetWeightedScore,
  ministers,
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
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

export default async function CabinetIndexPage() {
  const language = await getLocale();
  const tc = translations[language].cabinet;
  const partyLabel =
    language === "ne" ? cabinetMeta.party_name_ne : cabinetMeta.party_name_en;

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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {tc.indexTitle}
        </h1>
        <p className="text-(--muted) max-w-3xl">{subtitle}</p>
      </div>

      <div className="glass-card rounded-2xl border border-(--border) p-5 mb-10 space-y-3">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ministers.map((m) => {
          const { score, total, completed, inProgress } = cabinetWeightedScore(
            m,
            commitments,
          );
          const name = language === "ne" ? m.name_ne : m.name_en;
          const portfolio =
            language === "ne" ? m.portfolio_ne : m.portfolio_en;
          const alt =
            m.name_en_alt?.length
              ? `${tc.alsoReportedAs} ${m.name_en_alt.join(", ")}`
              : null;

          return (
            <div
              key={m.slug}
              className={`glass-card rounded-2xl border border-(--border) p-5 flex flex-col gap-3 ${
                m.is_prime_minister
                  ? "sm:col-span-2 lg:col-span-3 ring-1 ring-blue-500/30"
                  : ""
              }`}
            >
              <Link
                href={`/cabinet/${m.slug}`}
                className="block rounded-xl -m-1 p-1 hover:bg-(--secondary)/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <CabinetMemberPhoto
                      photo={m.photo}
                      fallbackLetter={name.charAt(0)}
                      alt={name}
                      size="sm"
                      isPrime={m.is_prime_minister}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-(--muted)">
                          #{m.cabinet_rank}
                        </span>
                        {m.is_prime_minister ? (
                          <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                            {tc.primeMinister}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="text-lg font-bold mt-1 leading-snug">
                        {name}
                      </h2>
                      {alt ? (
                        <p className="text-xs text-(--muted) mt-0.5">{alt}</p>
                      ) : null}
                      <p className="text-sm text-(--muted) mt-1 leading-snug">
                        {portfolio}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-2xl font-extrabold tabular-nums">
                      {score}
                    </p>
                    <p className="text-xs text-(--muted)">{tc.trackerScore}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs opacity-80 mt-2">
                  <span>
                    {tc.pointsTracked}: <strong>{total}</strong>
                  </span>
                  <span>
                    {tc.done}: <strong>{completed}</strong>
                  </span>
                  <span>
                    {tc.active}: <strong>{inProgress}</strong>
                  </span>
                </div>
              </Link>
              <div className="flex flex-wrap gap-2">
                {m.tracker_ministries.map((mn) => (
                  <Link
                    key={mn}
                    href={`/ministry/${toSlug(mn)}`}
                    className="text-xs px-2 py-1 rounded-lg border border-(--border) bg-(--secondary) hover:bg-(--muted)/10"
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
    </section>
  );
}
