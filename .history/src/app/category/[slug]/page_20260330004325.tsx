import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { sampleCommitments } from "@/lib/sample-data";
import { categoryMeta } from "@/lib/commitments";

export function generateStaticParams() {
  return Object.values(categoryMeta).map((item) => ({ slug: item.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cookieStore = await cookies();
  const language =
    cookieStore.get("app-language")?.value === "ne" ? "ne" : "en";
  const { slug } = await params;

  const categoryEntry = Object.entries(categoryMeta).find(
    ([, value]) => value.slug === slug,
  );

  if (!categoryEntry) {
    notFound();
  }

  const [categoryId, meta] = categoryEntry;
  const rows = sampleCommitments.filter(
    (item) => item.category_id === categoryId,
  );
  const completed = rows.filter((item) => item.status === "completed").length;
  const inProgress = rows.filter(
    (item) => item.status === "in_progress",
  ).length;
  const score = Math.round(
    ((completed + inProgress * 0.5) / Math.max(rows.length, 1)) * 100,
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">
        {language === "ne" ? "श्रेणी" : "Category"} {categoryId}:{" "}
        {language === "ne" ? meta.name_ne : meta.name_en}
      </h1>
      <p className="text-(--muted) mb-4">
        {rows.length} {language === "ne" ? "प्रतिबद्धताहरू" : "commitments"} •{" "}
        {language === "ne" ? "भारित स्कोर" : "weighted score"} {score}%
      </p>

      <div className="h-3 bg-(--secondary) rounded-full overflow-hidden mb-6 max-w-2xl">
        <div
          className="h-3"
          style={{ width: `${score}%`, backgroundColor: meta.color }}
        />
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
            <p className="text-xs text-(--muted)">
              {language === "ne"
                ? item.responsible_ministry_ne ?? item.responsible_ministry
                : item.responsible_ministry_en ?? item.responsible_ministry}
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
