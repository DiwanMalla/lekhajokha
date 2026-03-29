import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { commitmentsById, categoryMeta } from "@/lib/commitments";
import { sampleCommitments } from "@/lib/sample-data";
import { toSlug } from "@/lib/slug";
import { ministryLabel } from "@/lib/i18n/ministry-names";

export function generateStaticParams() {
  return sampleCommitments.map((item) => ({ id: item.id }));
}

export default async function CommitmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const language =
    cookieStore.get("app-language")?.value === "ne" ? "ne" : "en";
  const { id } = await params;
  const item = commitmentsById.get(id);

  if (!item) {
    notFound();
  }

  const category = categoryMeta[item.category_id];
  const title = language === "ne" ? item.title_ne : item.title_en;
  const description =
    language === "ne" ? item.description_ne : item.description_en;
  const categoryName =
    language === "ne" ? item.category_name_ne : item.category_name_en;
  const ministryName =
    language === "ne"
      ? (item.responsible_ministry_ne ?? item.responsible_ministry)
      : (item.responsible_ministry_en ?? item.responsible_ministry);
  const ministrySlug = toSlug(
    item.responsible_ministry_en ?? item.responsible_ministry,
  );
  const editorialSummary =
    language === "ne" ? item.editorial_summary_ne : item.editorial_summary_en;
  const related = sampleCommitments
    .filter((row) => row.category_id === item.category_id && row.id !== item.id)
    .slice(0, 6);

  const timeline = [
    {
      date: item.created_at.slice(0, 10),
      title: "Commitment registered on tracker",
      note: "Baseline tracking initialized from official 100-point action plan publication.",
    },
    {
      date: item.last_updated.slice(0, 10),
      title: `Current status: ${item.status}`,
      note: "Latest editorial review completed. Evidence links will be appended during verification workflow.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-5">
        <p className="text-sm text-(--muted) mb-2">
          {language === "ne" ? "बुँदा" : "Point"} #
          {String(item.point_number).padStart(3, "0")}
        </p>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-(--muted) mb-2">{description}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-(--muted)">
          <span className="px-2 py-1 rounded bg-(--secondary)">
            {item.status}
          </span>
          <Link
            href={`/category/${category.slug}`}
            className="px-2 py-1 rounded bg-(--secondary) hover:bg-(--secondary)"
          >
            {categoryName}
          </Link>
          <Link
            href={`/ministry/${ministrySlug}`}
            className="px-2 py-1 rounded bg-(--secondary) hover:bg-(--secondary)"
          >
            {ministryName}
          </Link>
          <span className="px-2 py-1 rounded bg-(--secondary)">
            {language === "ne" ? "समयसीमा" : "Deadline"}: {item.deadline_date}
          </span>
        </div>
        {item.shared_ministries && item.shared_ministries.length > 0 ? (
          <p className="text-sm text-(--muted) mt-3">
            <span className="font-semibold text-(--foreground)">
              {language === "ne"
                ? "समन्वय / सहायक जिम्मेवारी:"
                : "Coordinating accountability:"}{" "}
            </span>
            {item.shared_ministries.map((sm) => (
              <Link
                key={sm}
                href={`/ministry/${toSlug(sm)}`}
                className="inline-block mr-2 underline-offset-2 hover:underline"
              >
                {ministryLabel(sm, language)}
              </Link>
            ))}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-card rounded-xl p-5 border border-(--border)">
            <h2 className="font-semibold mb-3">
              {language === "ne" ? "प्रगति" : "Progress"}
            </h2>
            <div className="h-3 bg-(--secondary) rounded-full overflow-hidden mb-2">
              <div
                className="h-3 bg-sky-600"
                style={{ width: `${item.progress_percentage}%` }}
              />
            </div>
            <p className="text-sm text-(--muted)">
              {item.progress_percentage}%{" "}
              {language === "ne" ? "पूरा" : "complete"} • {item.status}
            </p>
          </div>

          {item.sub_commitments && item.sub_commitments.length > 0 && (
            <div className="glass-card rounded-xl p-5 border border-(--border)">
              <h2 className="font-semibold mb-4">
                {language === "ne" ? "उप-कार्यहरू" : "Sub-Commitments"}
              </h2>
              <div className="space-y-4">
                {item.sub_commitments.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 border border-(--border) rounded-lg bg-(--secondary)/50"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-medium text-sm leading-snug">
                        {language === "ne" ? sub.title_ne : sub.title_en}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-(--border) bg-(--card) shrink-0">
                        {sub.status}
                      </span>
                    </div>
                    {sub.deadline_days !== null && (
                      <p className="text-xs text-(--muted)">
                        {language === "ne" ? "समयसीमा" : "Deadline"}:{" "}
                        {sub.deadline_days} {language === "ne" ? "दिन" : "days"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass-card rounded-xl p-5 border border-(--border)">
            <h2 className="font-semibold mb-3">
              {language === "ne" ? "प्रमाण र स्रोतहरू" : "Evidence & Sources"}
            </h2>
            <ul className="list-disc list-inside text-sm text-(--foreground) space-y-1">
              <li>Official decision documents (to be linked)</li>
              <li>Major Nepali news coverage (to be linked)</li>
              <li>Press conference references (to be linked)</li>
              <li>Citizen-submitted evidence (moderated)</li>
            </ul>
          </div>

          <div className="glass-card rounded-xl p-5 border border-(--border)">
            <h2 className="font-semibold mb-3">
              {language === "ne"
                ? "समयरेखा / गतिविधि लग"
                : "Timeline / Activity Log"}
            </h2>
            <ol className="space-y-3 text-sm">
              {timeline.map((entry, idx) => (
                <li key={idx} className="border-l-2 border-(--border) pl-3">
                  <p className="text-xs text-(--muted)">{entry.date}</p>
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-(--muted)">{entry.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-card rounded-xl p-5 border border-(--border)">
            <h2 className="font-semibold mb-3">
              {language === "ne" ? "सम्पादकीय टिप्पणी" : "Editorial Note"}
            </h2>
            <p className="text-sm text-(--foreground)">{editorialSummary}</p>
          </div>

          <div className="glass-card rounded-xl p-5 border border-(--border)">
            <h2 className="font-semibold mb-3">
              {language === "ne" ? "नागरिक खण्ड" : "Citizen Section"}
            </h2>
            <div className="text-sm text-(--foreground) space-y-2">
              <p>
                {language === "ne" ? "महत्त्व मत" : "Importance votes"}:{" "}
                {item.importance_score}
              </p>
              <Link
                href="/submit-evidence"
                className="inline-block px-3 py-2 rounded bg-(--primary) text-(--primary-foreground) text-xs"
              >
                {language === "ne" ? "प्रमाण पठाउनुहोस्" : "Report Evidence"}
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-(--border)">
            <h2 className="font-semibold mb-3">
              {language === "ne"
                ? "सम्बन्धित प्रतिबद्धताहरू"
                : "Related Commitments"}
            </h2>
            <ul className="space-y-2 text-sm">
              {related.map((row) => (
                <li key={row.id}>
                  <Link
                    href={`/commitments/${row.id}`}
                    className="hover:underline"
                  >
                    #{row.point_number}{" "}
                    {language === "ne" ? row.title_ne : row.title_en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
