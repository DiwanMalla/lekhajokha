import Link from "next/link";
import { notFound } from "next/navigation";
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
  const { slug } = await params;

  const ministryName = Array.from(
    new Set(sampleCommitments.map((item) => item.responsible_ministry)),
  ).find((item) => toSlug(item) === slug);

  if (!ministryName) {
    notFound();
  }

  const rows = sampleCommitments.filter(
    (item) => item.responsible_ministry === ministryName,
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
      <h1 className="text-3xl font-bold mb-2">{ministryName}</h1>
      <p className="text-slate-600 mb-4">
        Ministry scorecard • {score}% weighted delivery
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6 max-w-xl">
        <div className="glass-card rounded-xl p-4 border border-slate-200">
          <p className="text-xs text-slate-500">Total</p>
          <p className="text-xl font-bold">{rows.length}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-200">
          <p className="text-xs text-slate-500">Completed</p>
          <p className="text-xl font-bold">{completed}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-200">
          <p className="text-xs text-slate-500">In Progress</p>
          <p className="text-xl font-bold">{inProgress}</p>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((item) => (
          <Link
            key={item.id}
            href={`/commitments/${item.id}`}
            className="block glass-card rounded-lg p-3 border border-slate-200 hover:bg-slate-50"
          >
            #{item.point_number} {item.title_en}
          </Link>
        ))}
      </div>
    </section>
  );
}
