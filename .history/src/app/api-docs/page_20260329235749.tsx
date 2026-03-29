export default function ApiDocsPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Open API</h1>
      <p className="text-slate-700 mb-4">
        Public JSON endpoints planned for journalists and researchers.
      </p>
      <div className="glass-card rounded-xl p-5 border border-slate-200 text-sm space-y-2">
        <p>
          <code>GET /api/commitments</code> → all commitments
        </p>
        <p>
          <code>GET /api/commitments/:id</code> → single commitment detail
        </p>
        <p>
          <code>GET /api/categories</code> → category metadata and scores
        </p>
        <p>
          <code>GET /api/ministry-scorecards</code> → ministry rankings
        </p>
      </div>
    </section>
  );
}
