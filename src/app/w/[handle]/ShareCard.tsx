"use client";

import { useState } from "react";

type Props = {
  handle: string;
  name: string;
  category: string;
};

export function ShareCard({ handle, name, category }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `trustfolio.com/w/${handle}`;
  const fullUrl = `https://${url}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
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
      <p className="text-sm font-semibold text-zinc-700">내 페이지 공유</p>
      <p className="mt-1 text-xs text-zinc-500">
        QR을 명함에 인쇄하거나, 카톡·인스타에 링크를 붙여보세요.
      </p>

      <div className="mt-5 grid grid-cols-[auto_1fr] gap-4">
        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt={`${name} QR 코드`} width={112} height={112} />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-xs text-zinc-500">URL</p>
            <p className="mt-0.5 truncate font-mono text-sm font-semibold text-zinc-900">
              {url}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-8 items-center rounded-full bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-800"
            >
              {copied ? "복사됨 ✓" : "URL 복사"}
            </button>
            <a
              href={qrUrl}
              download={`trustfolio-${handle}-qr.png`}
              className="inline-flex h-8 items-center rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              QR 다운로드
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-zinc-50 p-4">
        <p className="text-xs font-medium text-zinc-500">명함 미리보기</p>
        <div className="mt-3 overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                {category}
              </p>
              <p className="mt-1 text-xl font-bold tracking-tight">{name}</p>
              <p className="mt-0.5 text-xs text-zinc-500">trustfolio.com/w/{handle}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                fullUrl
              )}&margin=4`}
              alt=""
              width={56}
              height={56}
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
