import Link from 'next/link';
import { notFound } from 'next/navigation';
import { commitmentsById, categoryMeta } from '@/lib/commitments';
import { sampleCommitments } from '@/lib/sample-data';
import { toSlug } from '@/lib/slug';

export function generateStaticParams() {
  return sampleCommitments.map((item) => ({ id: item.id }));
}

export default async function CommitmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = commitmentsById.get(id);

  if (!item) {
    notFound();
  }

  const category = categoryMeta[item.category_id];
  const related = sampleCommitments
    .filter((row) => row.category_id === item.category_id && row.id !== item.id)
    .slice(0, 6);

  const timeline = [
    {
      date: item.created_at.slice(0, 10),
      title: 'Commitment registered on tracker',
      note: 'Baseline tracking initialized from official 100-point action plan publication.',
    },
    {
      date: item.last_updated.slice(0, 10),
      title: `Current status: ${item.status}`,
      note: 'Latest editorial review completed. Evidence links will be appended during verification workflow.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-5">
        <p className="text-sm text-slate-500 mb-2">Point #{String(item.point_number).padStart(3, '0')}</p>
        <h1 className="text-3xl font-bold mb-2">{item.title_en}</h1>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="px-2 py-1 rounded bg-slate-100">{item.status}</span>
          <Link href={`/category/${category.slug}`} className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">{item.category_name_en}</Link>
          <Link href={`/ministry/${toSlug(item.responsible_ministry)}`} className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">{item.responsible_ministry}</Link>
          <span className="px-2 py-1 rounded bg-slate-100">Deadline: {item.deadline_date}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-card rounded-xl p-5 border border-slate-200">
            <h2 className="font-semibold mb-3">Progress</h2>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden mb-2">
              <div className="h-3 bg-sky-600" style={{ width: `${item.progress_percentage}%` }} />
            </div>
            <p className="text-sm text-slate-600">{item.progress_percentage}% complete • {item.status}</p>
          </div>

          <div className="glass-card rounded-xl p-5 border border-slate-200">
            <h2 className="font-semibold mb-3">Evidence & Sources</h2>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              <li>Official decision documents (to be linked)</li>
              <li>Major Nepali news coverage (to be linked)</li>
              <li>Press conference references (to be linked)</li>
              <li>Citizen-submitted evidence (moderated)</li>
            </ul>
          </div>

          <div className="glass-card rounded-xl p-5 border border-slate-200">
            <h2 className="font-semibold mb-3">Timeline / Activity Log</h2>
            <ol className="space-y-3 text-sm">
              {timeline.map((entry, idx) => (
                <li key={idx} className="border-l-2 border-slate-200 pl-3">
                  <p className="text-xs text-slate-500">{entry.date}</p>
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-slate-600">{entry.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-card rounded-xl p-5 border border-slate-200">
            <h2 className="font-semibold mb-3">Editorial Note</h2>
            <p className="text-sm text-slate-700">{item.editorial_summary_en}</p>
          </div>

          <div className="glass-card rounded-xl p-5 border border-slate-200">
            <h2 className="font-semibold mb-3">Citizen Section</h2>
            <div className="text-sm text-slate-700 space-y-2">
              <p>Importance votes: {item.importance_score}</p>
              <Link href="/submit-evidence" className="inline-block px-3 py-2 rounded bg-slate-900 text-white text-xs">Report Evidence</Link>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-slate-200">
            <h2 className="font-semibold mb-3">Related Commitments</h2>
            <ul className="space-y-2 text-sm">
              {related.map((row) => (
                <li key={row.id}>
                  <Link href={`/commitments/${row.id}`} className="hover:underline">#{row.point_number} {row.title_en}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
