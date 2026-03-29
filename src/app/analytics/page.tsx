import Link from "next/link";
import { cookies } from "next/headers";
import { sampleCommitments } from "@/lib/sample-data";
import { categoryMeta } from "@/lib/commitments";
import { formatYmdInNepal, isOverdue } from "@/lib/deadline-date";
import {
  dueDatesByMonth,
  dueDatesByWeekUpcoming,
  hundredDayIndex,
  hundredDaysRemaining,
  HUNDRED_DAY_END,
  HUNDRED_DAY_START,
  ministryScorecard,
  statusCounts,
} from "@/lib/analytics-helpers";
import { monitoringByPoint, UPCOMING_MONITORING_WINDOW_END } from "@/lib/upcoming-monitoring";
import { StatusPie } from "@/components/analytics/StatusPie";

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
  const now = new Date();
  const overdue = sampleCommitments.filter(
    (item) =>
      item.status !== "completed" && isOverdue(item.deadline_date, now),
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

  const counts = statusCounts(sampleCommitments);
  const monthly = dueDatesByMonth(sampleCommitments);
  const weekly = dueDatesByWeekUpcoming(sampleCommitments, now, 12);
  const maxMonth = Math.max(1, ...monthly.map((m) => m.count));
  const maxWeek = Math.max(1, ...weekly.map((w) => w.count));
  const ministries = ministryScorecard(sampleCommitments, now);
  const topAction = ministries[0];
  const topOverdue = [...ministries].sort((a, b) => b.overdue - a.overdue)[0];
  const dayIdx = hundredDayIndex(now);
  const daysLeft = hundredDaysRemaining(now);
  const todayNepal = formatYmdInNepal(now);

  const monitoringRows = [2, 4, 7, 95].map((p) => monitoringByPoint[p]);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="glass-card rounded-xl p-5 border border-amber-500/30 bg-amber-500/5">
          <h2 className="font-semibold mb-2">
            {language === "ne" ? "१०० दिने गणना" : "100-Day Countdown"}
          </h2>
          <p className="text-sm text-(--muted) mb-3">
            {language === "ne" ? "सुरु" : "Cabinet anchor"}: {HUNDRED_DAY_START}{" "}
            → {language === "ne" ? "अन्त" : "End"}: {HUNDRED_DAY_END} (100 days)
          </p>
          <div className="flex flex-wrap gap-6 items-baseline">
            <div>
              <p className="text-xs text-(--muted) uppercase tracking-wide">
                {language === "ne" ? "दिन (क्रम)" : "Day (of 100)"}
              </p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {dayIdx}
              </p>
            </div>
            <div>
              <p className="text-xs text-(--muted) uppercase tracking-wide">
                {language === "ne" ? "बाँकी दिन" : "Days remaining"}
              </p>
              <p className="text-2xl font-black text-(--foreground)">
                {daysLeft}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 border border-(--border)">
          <h2 className="font-semibold mb-2">
            {language === "ne" ? "हप्ता १ स्न्यापसट" : "Week 1 snapshot"}
          </h2>
          <p className="text-sm text-(--muted) mb-2">
            {language === "ne"
              ? "हाल इन प्रोग्रेसमा रहेका प्रतिबद्धता (समग्र ट्र्याकर)।"
              : "Commitments currently marked In Progress (tracker-wide)."}
          </p>
          <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            {inProgress}
          </p>
          <p className="text-xs text-(--muted) mt-1">
            {language === "ne"
              ? "हप्ता १ = २८ मार्च २०२६ पछिको प्रारम्भिक अवधि"
              : "Week 1 = initial window after 28 Mar 2026 cabinet baseline."}
          </p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5 border border-(--border) mb-6">
        <h2 className="font-semibold mb-4">
          {language === "ne" ? "स्थिति वितरण" : "Status distribution"}
        </h2>
        <StatusPie counts={counts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="glass-card rounded-xl p-5 border border-(--border)">
          <h2 className="font-semibold mb-3">
            {language === "ne"
              ? "म्याद (खुला) — महिना अनुसार"
              : "Open due dates — by month"}
          </h2>
          <p className="text-xs text-(--muted) mb-4">
            {language === "ne"
              ? "हरेक महिना बाँकी रहेका समयसीमा संख्या।"
              : "Count of not yet completed commitments with deadlines in each month."}
          </p>
          <div className="space-y-2">
            {monthly.map((m) => (
              <div key={m.label} className="flex items-center gap-2 text-sm">
                <span className="w-24 shrink-0 text-(--muted)">{m.label}</span>
                <div className="flex-1 h-2 rounded bg-(--secondary) overflow-hidden">
                  <div
                    className="h-2 rounded bg-violet-500"
                    style={{ width: `${(m.count / maxMonth) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium">{m.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 border border-(--border)">
          <h2 className="font-semibold mb-3">
            {language === "ne"
              ? "आगामी हप्ताहरू — म्याद क्लस्टर"
              : "Upcoming weeks — deadline cluster"}
          </h2>
          <p className="text-xs text-(--muted) mb-4">
            {language === "ne"
              ? "अर्को १२ हप्तामा परेका खुला म्यादहरू।"
              : "Open commitments due in the next 12 weeks (weekly bins)."}
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {weekly.length === 0 ? (
              <p className="text-sm text-(--muted)">—</p>
            ) : (
              weekly.map((w) => (
                <div key={w.weekStart} className="flex items-center gap-2 text-sm">
                  <span className="w-32 shrink-0 text-(--muted) truncate" title={w.label}>
                    {w.weekStart}
                  </span>
                  <div className="flex-1 h-2 rounded bg-(--secondary) overflow-hidden">
                    <div
                      className="h-2 rounded bg-cyan-500"
                      style={{ width: `${(w.count / maxWeek) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-medium">{w.count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5 border border-(--border) mb-6">
        <h2 className="font-semibold mb-2">
          {language === "ne" ? "मन्त्रालय स्कोरकार्ड" : "Ministry scorecard"}
        </h2>
        <p className="text-sm text-(--muted) mb-4">
          {language === "ne"
            ? "धेरै सक्रियता = सम्पन्न + प्रगतिमा। धेरै म्याद नाघेको = अलग तौल।"
            : "Most action = completed + in progress. Most overdue = separate pressure."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {topAction && (
            <div className="rounded-lg border border-(--border) p-4 bg-emerald-500/5">
              <p className="text-xs text-(--muted) uppercase tracking-wide mb-1">
                {language === "ne" ? "धेरै कार्य" : "Most activity"}
              </p>
              <p className="font-semibold">{topAction.ministry}</p>
              <p className="text-sm text-(--muted)">
                {topAction.completed} done · {topAction.inProgress} in progress
              </p>
            </div>
          )}
          {topOverdue && topOverdue.overdue > 0 && (
            <div className="rounded-lg border border-(--border) p-4 bg-red-500/5">
              <p className="text-xs text-(--muted) uppercase tracking-wide mb-1">
                {language === "ne" ? "धेरै म्याद नाघेको" : "Most overdue"}
              </p>
              <p className="font-semibold">{topOverdue.ministry}</p>
              <p className="text-sm text-(--muted)">
                {topOverdue.overdue} overdue
              </p>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-(--border) text-(--muted)">
                <th className="py-2 pr-4">
                  {language === "ne" ? "मन्त्रालय" : "Ministry"}
                </th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Done</th>
                <th className="py-2 pr-4">Active</th>
                <th className="py-2 pr-4">Overdue</th>
              </tr>
            </thead>
            <tbody>
              {ministries.slice(0, 12).map((m) => (
                <tr key={m.ministry} className="border-b border-(--border)/60">
                  <td className="py-2 pr-4 font-medium max-w-[200px] truncate">
                    {m.ministry}
                  </td>
                  <td className="py-2 pr-4">{m.total}</td>
                  <td className="py-2 pr-4">{m.completed}</td>
                  <td className="py-2 pr-4">{m.inProgress}</td>
                  <td className="py-2 pr-4 text-red-600 dark:text-red-400">
                    {m.overdue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5 border border-blue-500/20 mb-6">
        <h2 className="font-semibold mb-2">
          {language === "ne"
            ? "आगामी ७ दिन — निगरानी"
            : "Upcoming deadlines to monitor (next 7 days)"}
        </h2>
        <p className="text-sm text-(--muted) mb-4">
          {language === "ne"
            ? "समयसीमा अन्त्य: "
            : "Window through "}
          {UPCOMING_MONITORING_WINDOW_END}
          {language === "ne" ? "" : ` (from ${todayNepal} Nepal)`}
        </p>
        <ul className="space-y-4">
          {monitoringRows.map((row) => {
            const c = sampleCommitments.find((x) => x.point_number === row.point);
            if (!c) return null;
            return (
              <li
                key={row.point}
                className="border border-(--border) rounded-lg p-4 bg-(--secondary)/30"
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <Link
                    href={`/commitments/${row.point}`}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    #{String(row.point).padStart(3, "0")}
                  </Link>
                  <span className="text-xs text-(--muted)">
                    {language === "ne" ? "म्याद" : "Due"}: {row.due}
                  </span>
                </div>
                <p className="text-sm text-(--foreground) mb-1">
                  {language === "ne" ? c.title_ne : c.title_en}
                </p>
                <p className="text-sm text-(--muted)">
                  {language === "ne" ? "हेर्ने" : "Watch"}:{" "}
                  {language === "ne" ? row.watch_ne : row.watch_en}
                </p>
              </li>
            );
          })}
        </ul>
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
            .filter(
              (item) =>
                item.status !== "completed" && isOverdue(item.deadline_date, now),
            )
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
                      ? (item.responsible_ministry_ne ??
                        item.responsible_ministry)
                      : (item.responsible_ministry_en ??
                        item.responsible_ministry)}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
