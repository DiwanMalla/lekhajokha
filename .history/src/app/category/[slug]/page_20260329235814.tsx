import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sampleCommitments } from '@/lib/sample-data';
import { categoryMeta } from '@/lib/commitments';

export function generateStaticParams() {
  return Object.values(categoryMeta).map((item) => ({ slug: item.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const categoryEntry = Object.entries(categoryMeta).find(([, value]) => value.slug === slug);

  if (!categoryEntry) {
    notFound();
  }

  const [categoryId, meta] = categoryEntry;
  const rows = sampleCommitments.filter((item) => item.category_id === categoryId);
  const completed = rows.filter((item) => item.status === 'completed').length;
  const inProgress = rows.filter((item) => item.status === 'in_progress').length;
  const score = Math.round(((completed + inProgress * 0.5) / Math.max(rows.length, 1)) * 100);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Category {categoryId}: {meta.name_en}</h1>
      <p className="text-slate-600 mb-4">{rows.length} commitments • weighted score {score}%</p>

      <div className="h-3 bg-slate-200 rounded-full overflow-hidden mb-6 max-w-2xl">
        <div className="h-3" style={{ width: `${score}%`, backgroundColor: meta.color }} />
      </div>

      <div className="space-y-2">
        {rows.map((item) => (
          <Link key={item.id} href={`/commitments/${item.id}`} className="block glass-card rounded-lg p-3 border border-slate-200 hover:bg-slate-50">
            #{item.point_number} {item.title_en}
          </Link>
        ))}
      </div>
    </section>
  );
}
