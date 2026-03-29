export default function MethodologyPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Methodology</h1>
      <p className="text-slate-600 mb-4">
        Lekhajokha tracks all 100 commitments using source-backed editorial
        rules and transparent status criteria.
      </p>
      <div className="glass-card rounded-xl p-6 border border-slate-200 space-y-3 text-sm text-slate-700">
        <p>
          <strong>Not Started:</strong> No formal step, directive, or budget
          signal identified.
        </p>
        <p>
          <strong>In Progress:</strong> Government has initiated work, announced
          implementation structure, or issued partial execution orders.
        </p>
        <p>
          <strong>Completed:</strong> Commitment delivered and verifiable from
          official records and credible reporting.
        </p>
        <p>
          <strong>Broken:</strong> Deadline passed and commitment is abandoned,
          reversed, or contradicted.
        </p>
        <p>
          <strong>Stalled:</strong> Work was initiated but no material progress
          for an extended period.
        </p>
      </div>
    </section>
  );
}
