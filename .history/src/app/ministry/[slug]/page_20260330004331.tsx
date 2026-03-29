import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { sampleCommitments } from "@/lib/sample-data";
import { toSlug } from "@/lib/slug";

export function generateStaticParams() {
  return Array.from(
    new Set(sampleCommitments.map((item) => toSlug(item.responsible_ministry))),
  ).map((slug) => ({ slug }));
}

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cookieStore = await cookies();
  const language =
    cookieStore.get("app-language")?.value === "ne" ? "ne" : "en";
  const { slug } = await params;

  const ministryName = Array.from(
    new Set(
      sampleCommitments.map(
        (item) => item.responsible_ministry_en ?? item.responsible_ministry,
      ),
    ),
  ).find((item) => toSlug(item) === slug);

  if (!ministryName) {
    notFound();
  }

  const rows = sampleCommitments.filter(
    (item) =>
      (item.responsible_ministry_en ?? item.responsible_ministry) ===
      ministryName,
  );
  const ministryLabel =
    language === "ne"
      ? rows[0]?.responsible_ministry_ne ?? ministryName
      : rows[0]?.responsible_ministry_en ?? ministryName;
  const completed = rows.filter((item) => item.status === "completed").length;
  const inProgress = rows.filter(
    (item) => item.status === "in_progress",
  ).length;
  const score = Math.round(
    ((completed + inProgress * 0.5) / Math.max(rows.length, 1)) * 100,
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{ministryLabel}</h1>
      <p className="text-(--muted) mb-4">
        {language === "ne" ? "मन्त्रालय स्कोरकार्ड" : "Ministry scorecard"} •{" "}
        {score}% {language === "ne" ? "भारित उपलब्धि" : "weighted delivery"}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6 max-w-xl">
        <div className="glass-card rounded-xl p-4 border border-(--border)">
          <p className="text-xs text-(--muted)">
            {language === "ne" ? "कुल" : "Total"}
          </p>
          <p className="text-xl font-bold">{rows.length}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-(--border)">
          <p className="text-xs text-(--muted)">
            {language === "ne" ? "सम्पन्न" : "Completed"}
          </p>
          <p className="text-xl font-bold">{completed}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-(--border)">
          <p className="text-xs text-(--muted)">
            {language === "ne" ? "प्रगतिमा" : "In Progress"}
          </p>
          <p className="text-xl font-bold">{inProgress}</p>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((item) => (
          <Link
            key={item.id}
            href={`/commitments/${item.id}`}
            className="block glass-card rounded-lg p-3 border border-(--border) hover:bg-(--secondary)"
          >
            <p className="font-medium">
              #{item.point_number}{" "}
              {language === "ne" ? item.title_ne : item.title_en}
            </p>
            <p className="text-sm text-(--muted)">
              {language === "ne" ? item.description_ne : item.description_en}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
