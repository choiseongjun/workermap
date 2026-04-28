import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getWorkerByHandle,
  getProductsByWorker,
  getReviewsByWorker,
  formatPriceRange,
} from "@/lib/market";
import { ShareCard } from "./ShareCard";
import { InquiryButton } from "./InquiryButton";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const worker = getWorkerByHandle(handle);
  if (!worker) return { title: "시공자를 찾을 수 없습니다 — trustfolio" };
  return {
    title: `${worker.name} — ${worker.category} 전문 ${worker.yearsActive}년차 | trustfolio`,
    description: worker.bio,
  };
}

export default async function WorkerPage({ params }: Props) {
  const { handle } = await params;
  const worker = getWorkerByHandle(handle);
  if (!worker) notFound();

  const items = getProductsByWorker(worker.id);
  const reviews = getReviewsByWorker(worker.id).slice(0, 6);
  const heroImage = items[0]?.imageUrl;
  const totalReviews = getReviewsByWorker(worker.id).length;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-zinc-100">
          {heroImage && (
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-20 blur-sm"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white" />
            </div>
          )}
          <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 text-3xl font-bold text-zinc-700 shadow-sm">
                {worker.name.slice(0, 1)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white">
                    {worker.category}
                  </span>
                  {worker.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.5 5L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z" />
                      </svg>
                      Verified
                    </span>
                  )}
                  <span className="text-xs text-zinc-500">trustfolio.com/w/{worker.handle}</span>
                </div>
                <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                  {worker.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600">
                  <span className="flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                      <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
                    </svg>
                    <span className="font-semibold text-zinc-900">{worker.rating.toFixed(1)}</span>
                    <span>({totalReviews})</span>
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span>시공 {worker.totalJobs}건</span>
                  <span className="text-zinc-300">·</span>
                  <span>{worker.yearsActive}년차</span>
                  <span className="text-zinc-300">·</span>
                  <span>{worker.region}</span>
                </div>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700">
                  {worker.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold tracking-tight">포트폴리오</h2>
              <p className="text-sm text-zinc-500">{items.length}건</p>
            </div>

            {items.length === 0 ? (
              <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 py-20 text-center">
                <p className="text-zinc-500">아직 등록된 작업이 없습니다.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {items.map((p) => (
                  <Link
                    key={p.id}
                    href={`/market/${p.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-white/95 px-2 py-0.5 text-xs font-medium text-zinc-700 shadow-sm">
                          {p.category}
                        </span>
                      </div>
                      {p.duration && (
                        <div className="absolute right-3 top-3">
                          <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="6,4 20,12 6,20" />
                            </svg>
                            {p.duration}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-semibold tracking-tight">{p.title}</h3>
                      <div className="mt-auto flex items-end justify-between pt-4">
                        <div>
                          <p className="text-xs text-zinc-500">참고가</p>
                          <p className="mt-0.5 text-base font-semibold tracking-tight">
                            {formatPriceRange(p.priceFrom, p.priceTo)}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-zinc-700 transition group-hover:text-zinc-900">
                          상세 →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {reviews.length > 0 && (
              <div className="mt-14">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">고객 후기</h2>
                  <p className="text-sm text-zinc-500">
                    총 {totalReviews}개 · 평균{" "}
                    <span className="font-semibold text-zinc-900">
                      {worker.rating.toFixed(1)}
                    </span>
                  </p>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {reviews.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-zinc-100 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-900">{r.author}</span>
                          <span className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                width="11"
                                height="11"
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
                      <p className="mt-3 text-sm leading-relaxed text-zinc-700">{r.text}</p>
                      <p className="mt-3 text-xs text-zinc-500">{r.productTitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-zinc-700">{worker.name} 시공자에게</p>
              <p className="mt-1 text-xs text-zinc-500">
                견적은 무료. 카톡으로 24시간 안에 연락드립니다.
              </p>
              <div className="mt-5">
                <InquiryButton workerName={worker.name} category={worker.category} />
              </div>
              <ul className="mt-5 space-y-2 text-xs text-zinc-500">
                <li className="flex items-center gap-2">
                  <Check />
                  사업자등록 확인 완료
                </li>
                {worker.verified && (
                  <li className="flex items-center gap-2">
                    <Check />
                    trustfolio Verified 배지
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <Check />
                  영상 인증 시공 {items.filter((i) => i.duration).length}건
                </li>
              </ul>
            </div>

            <ShareCard
              handle={worker.handle}
              name={worker.name}
              category={worker.category}
              region={worker.region}
              yearsActive={worker.yearsActive}
              rating={worker.rating}
              totalJobs={worker.totalJobs}
              verified={worker.verified}
              bio={worker.bio}
              thumbnails={items.slice(0, 3).map((p) => p.imageUrl)}
            />
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Check() {
  return (
    <svg
      className="text-emerald-500"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
