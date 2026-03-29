import Link from 'next/link';

export default function AdminPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Admin Console</h1>
      <p className="text-slate-600 mb-5">Protected area (authentication integration pending).</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/commitments" className="glass-card rounded-xl border border-slate-200 p-4">Manage Commitments</Link>
        <Link href="/admin/evidence" className="glass-card rounded-xl border border-slate-200 p-4">Manage Evidence</Link>
        <Link href="/admin/comments" className="glass-card rounded-xl border border-slate-200 p-4">Moderate Comments</Link>
      </div>
    </section>
  );
}
