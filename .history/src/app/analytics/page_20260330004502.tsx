import Link from "next/link";
import { cookies } from "next/headers";
import { sampleCommitments } from "@/lib/sample-data";
import { categoryMeta } from "@/lib/commitments";

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const language =
    cookieStore.get("app-language")?.value === "ne" ? "ne" : "en";
  const total = sampleCommitments.length;
  const completed = sampleCommitments.filter(
    (item) => item.status === "completed",
  ).length;
  const inProgress = sampleCommitments.filter(
    (item) => item.status === "in_progress",
  ).length;
  const overdue = sampleCommitments.filter(
    (item) => new Date(item.deadline_date) < new Date(),
  ).length;

  const categoryScores = Object.entries(categoryMeta).map(([id, meta]) => {
    const list = sampleCommitments.filter((item) => item.category_id === id);
    const done = list.filter((item) => item.status === "completed").length;
    const progress = list.filter(
      (item) => item.status === "in_progress",
    ).length;
    const score = Math.round(
      ((done + progress * 0.5) / Math.max(list.length, 1)) * 100,
    );
    return { ...meta, id, score, total: list.length };
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {language === "ne" ? "विश्लेषण र अन्तर्दृष्टि" : "Analytics & Insights"}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="glass-card rounded-xl p-4 border border-(--border)">
          <p className="text-xs text-(--muted)">
            {language === "ne" ? "कुल" : "Total"}
          </p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-(--border)">
          <p className="text-xs text-(--muted)">
            {language === "ne" ? "सम्पन्न" : "Completed"}
          </p>
          <p className="text-2xl font-bold">{completed}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-(--border)">
          <p className="text-xs text-(--muted)">
            {language === "ne" ? "प्रगतिमा" : "In Progress"}
          </p>
          <p className="text-2xl font-bold">{inProgress}</p>
        </div>
        <div className="glass-card rounded-xl p-4 border border-(--border)">
          <p className="text-xs text-(--muted)">
            {language === "ne" ? "म्याद नाघेको" : "Overdue"}
          </p>
          <p className="text-2xl font-bold">{overdue}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5 border border-(--border) mb-6">
        <h2 className="font-semibold mb-3">
          {language === "ne" ? "श्रेणी तुलना" : "Category Comparison"}
        </h2>
        <div className="space-y-2">
          {categoryScores.map((item) => (
            <Link
              href={`/category/${item.slug}`}
              key={item.id}
              className="block hover:bg-(--secondary) rounded p-2"
            >
              <div className="flex justify-between text-sm mb-1">
                <span>{language === "ne" ? item.name_ne : item.name_en}</span>
                <span>{item.score}%</span>
              </div>
              <div className="h-2 rounded bg-(--secondary) overflow-hidden">
                <div
                  className="h-2"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-5 border border-(--border)">
        <h2 className="font-semibold mb-3">
          {language === "ne" ? "म्याद नाघेको ट्र्याकर" : "Overdue Tracker"}
        </h2>
        <ul className="space-y-2 text-sm">
          {sampleCommitments
            .filter((item) => new Date(item.deadline_date) < new Date())
            .slice(0, 15)
            .map((item) => (
              <li key={item.id}>
                <Link
                  href={`/commitments/${item.id}`}
                  className="hover:underline"
                >
                  <p>
                    #{item.point_number}{" "}
                    {language === "ne" ? item.title_ne : item.title_en}
                  </p>
                  <p className="text-(--muted)">
                    {language === "ne"
                      ? item.responsible_ministry_ne ?? item.responsible_ministry
                      : item.responsible_ministry_en ?? item.responsible_ministry}
                  </p>
                  <p className="text-(--muted)">
                    {language === "ne"
                      ? item.description_ne
                      : item.description_en}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
