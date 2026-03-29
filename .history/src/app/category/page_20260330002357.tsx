import Link from "next/link";
import { cookies } from "next/headers";
import { categoryList } from "@/lib/commitments";

export default async function CategoryIndexPage() {
  const cookieStore = await cookies();
  const language =
    cookieStore.get("app-language")?.value === "ne" ? "ne" : "en";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {language === "ne" ? "सबै श्रेणीहरू" : "All Categories"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categoryList.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="glass-card rounded-xl border border-(--border) p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-(--muted) mb-1">
              {language === "ne" ? "श्रेणी" : "Category"} {item.id}
            </p>
            <p className="font-semibold">
              {language === "ne" ? item.name_ne : item.name_en}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
