import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cabinetMeta,
  cabinetWeightedScore,
  commitmentsForCabinetMember,
  getMinisterBySlug,
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
  const { score, total, completed, inProgress } = cabinetWeightedScore(
    m,
    commitments,
  );
  const rows = commitmentsForCabinetMember(m, commitments).sort(
    (a, b) => a.point_number - b.point_number,
  );

  const statusLabel = (s: Status) => st[s];

  const altLine = m.name_en_alt?.length
    ? `${tc.alsoReportedAs} ${m.name_en_alt.join(", ")}`
    : null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/cabinet"
        className="text-sm text-(--muted) hover:text-(--foreground) mb-6 inline-block"
      >
        {tc.backToCabinet}
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="shrink-0 flex flex-col items-start gap-2">
          <CabinetMemberPhoto
            photo={m.photo}
            fallbackLetter={name.charAt(0)}
            alt={name}
            size="lg"
            isPrime={m.is_prime_minister}
          />
          {m.photo?.credit_short ? (
            <p className="text-xs text-(--muted) max-w-[7rem] leading-snug">
              {tc.photoCredit}: {m.photo.credit_short}
            </p>
          ) : (
            <p className="text-xs text-(--muted) max-w-[7rem] leading-snug">
              {tc.placeholderNoPhoto}
            </p>
          )}
          {m.photo?.commons_page ? (
            <a
              href={m.photo.commons_page}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 underline-offset-2 hover:underline max-w-[8rem]"
            >
              {tc.openCommons}
            </a>
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono text-(--muted)">
              #{m.cabinet_rank} • {cabinetMeta.party_short}
            </span>
            {m.is_prime_minister ? (
              <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                {tc.primeMinister}
              </span>
            ) : null}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {name}
          </h1>
          {altLine ? (
            <p className="text-sm text-(--muted) mt-1">{altLine}</p>
          ) : null}
          <p className="text-lg text-(--muted) mt-3 leading-relaxed">
            {portfolio}
          </p>
          <p className="text-sm text-(--muted) mt-2">
            {tc.swornIn}: {cabinetMeta.sworn_in_iso}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-2xl">
            <div className="glass-card rounded-xl p-4 border border-(--border)">
              <p className="text-xs text-(--muted)">{tc.trackerScore}</p>
              <p className="text-2xl font-bold tabular-nums">{score}</p>
            </div>
            <div className="glass-card rounded-xl p-4 border border-(--border)">
              <p className="text-xs text-(--muted)">{tc.points}</p>
              <p className="text-2xl font-bold tabular-nums">{total}</p>
            </div>
            <div className="glass-card rounded-xl p-4 border border-(--border)">
              <p className="text-xs text-(--muted)">{tc.done}</p>
              <p className="text-2xl font-bold tabular-nums">{completed}</p>
            </div>
            <div className="glass-card rounded-xl p-4 border border-(--border)">
              <p className="text-xs text-(--muted)">{tc.active}</p>
              <p className="text-2xl font-bold tabular-nums">{inProgress}</p>
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

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">{tc.commitmentsTitle}</h2>
        {rows.length === 0 ? (
          <p className="text-(--muted)">{tc.noCommitments}</p>
        ) : (
          <ul className="space-y-2">
            {rows.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/commitments/${item.id}`}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 glass-card rounded-xl border border-(--border) p-4 hover:bg-(--secondary) transition-colors"
                >
                  <span className="font-mono text-sm text-(--muted) shrink-0">
                    #{item.point_number}
                  </span>
                  <span className="font-medium min-w-0 flex-1">
                    {language === "ne" ? item.title_ne : item.title_en}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-(--border) shrink-0">
                    {statusLabel(item.status)}
                  </span>
                  <span className="text-xs text-(--muted) shrink-0 w-full sm:w-auto">
                    {ministryLabel(item.responsible_ministry, language)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
