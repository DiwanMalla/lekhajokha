export default function SubmitEvidencePage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Submit Evidence</h1>
      <p className="text-slate-600 mb-6">
        Citizen submissions are reviewed before publication.
      </p>

      <form className="glass-card rounded-xl p-6 border border-slate-200 grid gap-4">
        <input
          className="border rounded-lg px-3 py-2.5"
          placeholder="Commitment number (1-100)"
        />
        <input
          className="border rounded-lg px-3 py-2.5"
          placeholder="Source URL"
        />
        <textarea
          className="border rounded-lg px-3 py-2.5 min-h-28"
          placeholder="What does this evidence show?"
        />
        <button
          type="button"
          className="rounded-lg bg-slate-900 text-white py-2.5 px-4 w-fit"
        >
          Submit for Review
        </button>
      </form>
    </section>
  );
}
