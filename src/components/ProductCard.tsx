import Image from "next/image";
import Link from "next/link";
import { type Product, getWorker, formatPriceRange } from "@/lib/market";

export function ProductCard({ product }: { product: Product }) {
  const worker = getWorker(product.workerId);
  return (
    <Link
      href={`/market/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white/95 px-2 py-0.5 text-xs font-medium text-zinc-700 shadow-sm">
            {product.category}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6,4 20,12 6,20" />
            </svg>
            {product.duration}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/10 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-900">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold tracking-tight text-zinc-900">{product.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
          <span>{worker?.name}</span>
          <span className="text-zinc-300">·</span>
          <span className="flex items-center gap-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
              <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
            </svg>
            {worker?.rating.toFixed(1)}
          </span>
          <span className="text-zinc-300">·</span>
          <span>시공 {worker?.totalJobs}건</span>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-zinc-100 pt-4">
          <div>
            <p className="text-xs text-zinc-500">참고가</p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight">
              {formatPriceRange(product.priceFrom, product.priceTo)}
            </p>
          </div>
          <span className="text-sm font-medium text-zinc-700 transition group-hover:text-zinc-900">
            상세보기 →
          </span>
        </div>
      </div>
    </Link>
  );
}
