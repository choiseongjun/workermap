"use client";

import { useState } from "react";

type Props = {
  productTitle: string;
  workerName: string;
};

export function InquiryButton({ productTitle, workerName }: Props) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 2200);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-7 font-medium text-white transition hover:bg-zinc-800"
      >
        견적 문의하기 →
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => !submitted && setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight">견적 요청 접수 완료</h3>
                <p className="mt-2 text-zinc-600">
                  {workerName} 시공자가 24시간 안에 연락드립니다.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-600">견적 문의</p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight">{productTitle}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{workerName} 시공자</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="-mr-2 -mt-2 flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                    aria-label="닫기"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Field label="이름" required>
                    <input
                      required
                      type="text"
                      placeholder="홍길동"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                    />
                  </Field>
                  <Field label="연락처" required>
                    <input
                      required
                      type="tel"
                      placeholder="010-0000-0000"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                    />
                  </Field>
                  <Field label="시공 지역" required>
                    <input
                      required
                      type="text"
                      placeholder="예: 서울 강남구"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                    />
                  </Field>
                  <Field label="요청 사항" hint="작업 위치·범위·희망 일정 등">
                    <textarea
                      rows={3}
                      placeholder="예: 욕실 5평, 곰팡이 심한 편. 다음 주 토요일 가능하면 좋겠어요."
                      className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                    />
                  </Field>

                  <p className="text-xs leading-relaxed text-zinc-500">
                    제출 시 trustfolio 이용약관 및 개인정보처리방침에 동의하는 것으로
                    간주됩니다. 시공자가 직접 연락드리며, 견적은 무료입니다.
                  </p>

                  <button
                    type="submit"
                    className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 font-medium text-white transition hover:bg-zinc-800"
                  >
                    견적 요청 보내기
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-zinc-700">
          {label}
          {required && <span className="ml-0.5 text-emerald-600">*</span>}
        </span>
        {hint && <span className="text-xs text-zinc-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
