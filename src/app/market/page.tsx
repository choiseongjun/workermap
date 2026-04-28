import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, products, type Category } from "@/lib/market";

export const metadata: Metadata = {
  title: "마켓 — trustfolio",
  description: "영상으로 검증된 시공만 모았습니다. 카테고리별로 둘러보세요.",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function MarketPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const isValidCategory = (CATEGORIES as readonly string[]).includes(category ?? "");
  const activeCategory = isValidCategory ? (category as Category) : null;
  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50/80 to-white">
          <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              Market
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              영상으로 둘러보고
              <br className="md:hidden" /> 결정하세요.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-zinc-600">
              {activeCategory
                ? `${activeCategory} 분야의 검증된 시공자들입니다.`
                : "각 카테고리의 검증된 시공자들이 영상으로 작업을 공개합니다."}
            </p>

            <nav className="mt-8 flex flex-wrap gap-2">
              <CategoryPill href="/market" label="전체" active={!activeCategory} />
              {CATEGORIES.map((c) => (
                <CategoryPill
                  key={c}
                  href={`/market?category=${encodeURIComponent(c)}`}
                  label={c}
                  active={activeCategory === c}
                />
              ))}
            </nav>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-zinc-600">
              총 <span className="font-semibold text-zinc-900">{filtered.length}</span>개의
              시공
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 py-24 text-center">
              <p className="text-zinc-600">아직 등록된 시공이 없습니다.</p>
              <Link
                href="/market"
                className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                전체 보기 →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50/60">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              찾는 시공이 없으신가요?
            </h2>
            <p className="mt-3 text-zinc-600">
              요청 사항을 남겨주시면 24시간 안에 매칭해드립니다.
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              맞춤 견적 요청하기 →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function CategoryPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition ${
        active
          ? "bg-zinc-900 text-white"
          : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
      }`}
    >
      {label}
    </Link>
  );
}
