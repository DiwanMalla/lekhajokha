import Link from "next/link";
import { categoryList } from "@/lib/commitments";

export default function CategoryIndexPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categoryList.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="glass-card rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-slate-500 mb-1">Category {item.id}</p>
            <p className="font-semibold">{item.name_en}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
