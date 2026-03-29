import Link from "next/link";
import { notFound } from "next/navigation";
import {
  newsPosts,
  newsPostsBySlug,
  commitmentHref,
  commitmentLinkLabel,
} from "@/lib/news-posts";

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = newsPostsBySlug.get(slug);

  if (!post) {
    notFound();
  }

  const trackerHref = commitmentHref(post.link);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-sm text-(--muted) mb-2">{post.date}</p>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-(--foreground) leading-relaxed mb-6">{post.body}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={trackerHref}
          className="inline-flex items-center rounded-lg bg-(--foreground) text-(--background) px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          Open {commitmentLinkLabel(post.link)}
        </Link>
        <Link
          href="/news"
          className="inline-flex items-center rounded-lg border border-(--border) px-4 py-2 text-sm font-medium hover:bg-(--secondary)"
        >
          ← All news
        </Link>
      </div>
    </article>
  );
}
