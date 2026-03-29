import Link from "next/link";

const posts = [
  {
    slug: "week-1-implementation-brief",
    title: "Week 1 Implementation Brief",
    excerpt:
      "What moved in the first week, where momentum started, and which deadlines are now at risk.",
    date: "2026-03-29",
  },
  {
    slug: "digital-governance-first-signals",
    title: "Digital Governance: First Signals",
    excerpt:
      "A closer read of GIOMS, Ask Once policy, and e-signature commitments.",
    date: "2026-03-30",
  },
];

export default function NewsPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">News & Editorial</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/news/${post.slug}`}
            className="glass-card rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-slate-500 mb-2">{post.date}</p>
            <h2 className="font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-slate-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
