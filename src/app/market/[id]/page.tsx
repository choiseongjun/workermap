import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, getWorker, formatPriceRange, products } from "@/lib/market";
import { InquiryButton } from "./InquiryButton";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "상품을 찾을 수 없습니다 — trustfolio" };
  const worker = getWorker(product.workerId);
  return {
    title: `${product.title} — ${worker?.name} 시공자 | trustfolio`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const worker = getWorker(product.workerId);
  if (!worker) notFound();

  const others = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pt-8 text-sm text-zinc-500">
          <Link href="/market" className="transition hover:text-zinc-900">
            마켓
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link
            href={`/market?category=${encodeURIComponent(product.category)}`}
            className="transition hover:text-zinc-900"
          >
            {product.category}
          </Link>
        </div>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div
              className={`relative aspect-video overflow-hidden rounded-3xl bg-gradient-to-br ${product.thumbnailTone}`}
            >
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
                  {product.category}
                </span>
              </div>
              <div className="absolute right-4 top-4">
                <span className="flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                  {product.duration}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl transition hover:scale-105">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-900">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </button>
              </div>
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl">
              {product.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                  <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
                </svg>
                <span className="font-semibold text-zinc-900">{worker.rating.toFixed(1)}</span>
                <span className="text-zinc-400">({product.reviews.length})</span>
              </span>
              <span className="text-zinc-300">·</span>
              <span>시공 {worker.totalJobs}건</span>
              <span className="text-zinc-300">·</span>
              <span>{worker.region}</span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {product.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-2xl bg-zinc-50 p-4 text-sm"
                >
                  <svg
                    className="mt-0.5 flex-shrink-0 text-emerald-600"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-zinc-700">{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold tracking-tight">시공 소개</h2>
              <p className="mt-3 leading-relaxed text-zinc-700">{product.description}</p>
            </div>

            {product.galleryTones.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold tracking-tight">이전 작업 갤러리</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {product.galleryTones.map((tone, i) => (
                    <div
                      key={i}
                      className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${tone}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition hover:opacity-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-900">
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold tracking-tight">고객 후기</h2>
                <p className="text-sm text-zinc-500">
                  {product.reviews.length}개 · 평균{" "}
                  <span className="font-semibold text-zinc-900">
                    {(
                      product.reviews.reduce((s, r) => s + r.rating, 0) /
                      product.reviews.length
                    ).toFixed(1)}
                  </span>
                </p>
              </div>
              <div className="mt-4 space-y-4">
                {product.reviews.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-zinc-100 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-900">{r.author}</span>
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className={i < r.rating ? "text-amber-400" : "text-zinc-200"}
                            >
                              <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
                            </svg>
                          ))}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400">{r.date}</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-zinc-700">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-medium text-zinc-500">참고 견적가</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">
                {formatPriceRange(product.priceFrom, product.priceTo)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">현장 조건에 따라 달라질 수 있습니다.</p>

              <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 text-base font-bold text-zinc-700">
                    {worker.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold tracking-tight">{worker.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-600">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                        <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
                      </svg>
                      {worker.rating.toFixed(1)} · 시공 {worker.totalJobs}건
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{worker.bio}</p>
              </div>

              <div className="mt-6">
                <InquiryButton productTitle={product.title} workerName={worker.name} />
              </div>

              <ul className="mt-5 space-y-2 text-xs text-zinc-500">
                <li className="flex items-center gap-2">
                  <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  견적 요청은 무료입니다
                </li>
                <li className="flex items-center gap-2">
                  <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  24시간 안에 시공자가 직접 연락
                </li>
                <li className="flex items-center gap-2">
                  <svg className="text-emerald-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  모든 시공은 영상으로 기록
                </li>
              </ul>
            </div>
          </aside>
        </section>

        {others.length > 0 && (
          <section className="border-t border-zinc-100 bg-zinc-50/60">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <h2 className="text-2xl font-bold tracking-tight">같은 카테고리 추천</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
