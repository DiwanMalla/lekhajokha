import Link from "next/link";
import { newsPosts, commitmentLinkLabel } from "@/lib/news-posts";

export default function NewsPage() {
  const sorted = [...newsPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">News & Editorial</h1>
      <p className="text-sm text-(--muted) mb-8 max-w-2xl">
        Short briefs linking published coverage to specific tracker commitments.
        Dates reflect reporting windows referenced on this site.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/news/${post.slug}`}
            className="glass-card rounded-xl p-5 border border-(--border) hover:shadow-md transition-shadow flex flex-col"
          >
            <p className="text-xs text-(--muted) mb-2">
              {post.date}
            </p>
            <h2 className="font-semibold mb-2 leading-snug">{post.title}</h2>
            <p className="text-sm text-(--muted) mb-4 flex-1">{post.excerpt}</p>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Tracker: {commitmentLinkLabel(post.link)} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
