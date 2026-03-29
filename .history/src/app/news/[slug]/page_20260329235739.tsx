import { notFound } from 'next/navigation';

const posts = new Map([
  [
    'week-1-implementation-brief',
    {
      title: 'Week 1 Implementation Brief',
      body: 'Initial implementation signals are concentrated in administrative restructuring and digital governance. Most commitments still remain not started, with urgency increasing around 7-day and 15-day targets.',
    },
  ],
  [
    'digital-governance-first-signals',
    {
      title: 'Digital Governance: First Signals',
      body: 'Early policy narrative emphasizes integrated platforms and interoperability. Delivery quality will depend on legal follow-through, interoperability standards, and citizen-facing service design.',
    },
  ],
]);

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.get(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-slate-700 leading-relaxed">{post.body}</p>
    </article>
  );
}
