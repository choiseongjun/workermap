"use client";

import { useState } from "react";
import { BusinessCard } from "@/components/BusinessCard";

type Props = {
  handle: string;
  name: string;
  category: string;
  region: string;
  phone?: string;
  yearsActive: number;
  rating: number;
  totalJobs: number;
  verified: boolean;
  bio: string;
  thumbnails: string[];
};

export function ShareCard(props: Props) {
  const [copied, setCopied] = useState(false);
  const [side, setSide] = useState<"front" | "back">("front");
  const url = `trustfolio.com/w/${props.handle}`;
  const fullUrl = `https://${url}`;
  const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
    fullUrl
  )}&margin=10`;

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-700">내 페이지 공유</p>
        <div className="flex gap-1 rounded-full bg-zinc-100 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setSide("front")}
            className={`rounded-full px-2.5 py-1 font-medium transition ${
              side === "front" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
            }`}
          >
            앞면
          </button>
          <button
            type="button"
            onClick={() => setSide("back")}
            className={`rounded-full px-2.5 py-1 font-medium transition ${
              side === "back" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
            }`}
          >
            뒷면
          </button>
        </div>
      </div>
      <p className="mt-1 text-xs text-zinc-500">
        명함에 인쇄하거나, 카톡·인스타에 링크를 공유하세요.
      </p>

      <div className="mt-4">
        <BusinessCard
          side={side}
          name={props.name}
          category={props.category}
          region={props.region}
          phone={props.phone}
          handle={props.handle}
          yearsActive={props.yearsActive}
          verified={props.verified}
          rating={props.rating}
          totalJobs={props.totalJobs}
          bio={props.bio}
          thumbnails={props.thumbnails}
        />
      </div>

      <div className="mt-5 space-y-2">
        <div className="rounded-xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">URL</p>
          <p className="mt-0.5 truncate font-mono text-sm font-semibold text-zinc-900">
            {url}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800"
          >
            {copied ? "복사됨 ✓" : "URL 복사"}
          </button>
          <a
            href={qrDownloadUrl}
            download={`trustfolio-${props.handle}-qr.png`}
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            QR 다운로드
          </a>
        </div>
      </div>
    </div>
  );
}
