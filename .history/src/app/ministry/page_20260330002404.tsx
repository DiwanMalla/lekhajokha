import Link from "next/link";
import { cookies } from "next/headers";
import { ministryList } from "@/lib/commitments";
import { toSlug } from "@/lib/slug";

export default async function MinistryIndexPage() {
  const cookieStore = await cookies();
  const language = cookieStore.get("app-language")?.value === "ne" ? "ne" : "en";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {language === "ne" ? "मन्त्रालय स्कोरकार्डहरू" : "Ministry Scorecards"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ministryList.map((item) => (
          <Link
            key={item}
            href={`/ministry/${toSlug(item)}`}
            className="glass-card rounded-xl border border-(--border) p-4 hover:shadow-md transition-shadow"
          >
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
}
