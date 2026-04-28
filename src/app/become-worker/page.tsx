"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CATEGORIES, type Category } from "@/lib/market";

type Step = 1 | 2 | 3;

type FormState = {
  name: string;
  handle: string;
  phone: string;
  region: string;
  category: Category;
  yearsActive: string;
  bio: string;
  workTitle: string;
  workPriceFrom: string;
  workPriceTo: string;
  workDescription: string;
};

const initial: FormState = {
  name: "",
  handle: "",
  phone: "",
  region: "",
  category: "코킹",
  yearsActive: "",
  bio: "",
  workTitle: "",
  workPriceFrom: "",
  workPriceTo: "",
  workDescription: "",
};

function suggestHandle(name: string) {
  if (!name) return "";
  const map: Record<string, string> = {
    김재훈: "jaehoon",
    박민석: "minseok",
    이지연: "jiyeon",
    정성호: "seongho",
    최은영: "eunyoung",
  };
  if (map[name]) return map[name];
  return name
    .replace(/[^A-Za-z0-9가-힣]/g, "")
    .toLowerCase()
    .slice(0, 16);
}

export default function BecomeWorkerPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initial);

  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const handlePreview = useMemo(() => form.handle || suggestHandle(form.name) || "내이름", [form.name, form.handle]);

  const step1Valid = form.name && form.phone && form.region && form.yearsActive;
  const step2Valid = form.workTitle && form.workPriceFrom && form.workPriceTo;

  function next() {
    if (step === 1 && !step1Valid) return;
    if (step === 2 && !step2Valid) return;
    setStep((s) => Math.min(3, (s + 1) as Step));
  }
  function back() {
    setStep((s) => Math.max(1, (s - 1) as Step));
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-zinc-100 bg-zinc-50/60">
          <div className="mx-auto max-w-3xl px-6 pt-12 pb-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              시공자 등록
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              5분이면 끝나요.
            </h1>
            <p className="mt-3 text-zinc-600">
              아래 정보만 입력하시면 본인 영업 페이지와 QR 코드가 즉시 발급됩니다.
            </p>

            <Stepper step={step} />
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-12">
          {step === 1 && (
            <Step1 form={form} update={update} valid={Boolean(step1Valid)} onNext={next} handlePreview={handlePreview} />
          )}
          {step === 2 && (
            <Step2 form={form} update={update} valid={Boolean(step2Valid)} onBack={back} onNext={next} />
          )}
          {step === 3 && <Step3 form={form} handle={handlePreview} />}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Stepper({ step }: { step: Step }) {
  const labels = ["기본 정보", "첫 작업", "발급 완료"];
  return (
    <ol className="mt-8 flex items-center gap-3">
      {labels.map((label, i) => {
        const n = (i + 1) as Step;
        const active = step === n;
        const done = step > n;
        return (
          <li key={label} className="flex flex-1 items-center gap-3">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                done
                  ? "bg-emerald-500 text-white"
                  : active
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-200 text-zinc-500"
              }`}
            >
              {done ? "✓" : n}
            </span>
            <span
              className={`hidden text-sm font-medium md:inline ${
                active ? "text-zinc-900" : done ? "text-zinc-700" : "text-zinc-400"
              }`}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <div
                className={`hidden h-px flex-1 md:block ${done ? "bg-emerald-500" : "bg-zinc-200"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Step1({
  form,
  update,
  valid,
  onNext,
  handlePreview,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
  valid: boolean;
  onNext: () => void;
  handlePreview: string;
}) {
  return (
    <div className="space-y-6">
      <SectionTitle title="기본 정보" desc="페이지에 노출됩니다." />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="이름" required>
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              update({
                name: e.target.value,
                handle: form.handle || suggestHandle(e.target.value),
              })
            }
            placeholder="예: 김재훈"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          />
        </Field>

        <Field label="페이지 주소 (handle)" required hint="trustfolio.com/w/...">
          <input
            type="text"
            value={form.handle}
            onChange={(e) => update({ handle: e.target.value.toLowerCase() })}
            placeholder="예: jaehoon"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 font-mono text-sm outline-none transition focus:border-zinc-900"
          />
          <p className="mt-1 text-xs text-zinc-500">
            발급될 주소: <span className="font-mono text-zinc-900">trustfolio.com/w/{handlePreview}</span>
          </p>
        </Field>

        <Field label="연락처 (카톡 알림용)" required>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="010-0000-0000"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          />
        </Field>

        <Field label="활동 지역" required>
          <input
            type="text"
            value={form.region}
            onChange={(e) => update({ region: e.target.value })}
            placeholder="예: 서울 강남·송파"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          />
        </Field>

        <Field label="주력 분야" required>
          <select
            value={form.category}
            onChange={(e) => update({ category: e.target.value as Category })}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="경력" required>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={form.yearsActive}
              onChange={(e) => update({ yearsActive: e.target.value })}
              placeholder="예: 10"
              min="0"
              max="60"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            <span className="text-sm text-zinc-500">년차</span>
          </div>
        </Field>
      </div>

      <Field label="자기 소개" hint="짧게 1~2줄. 손님이 가장 먼저 보는 문장">
        <textarea
          rows={3}
          value={form.bio}
          onChange={(e) => update({ bio: e.target.value })}
          placeholder="예: 10년차 코킹·실리콘 전문. 매 작업 영상 기록으로 신뢰드립니다."
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
        />
      </Field>

      <FormFooter>
        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="inline-flex h-12 items-center rounded-full bg-zinc-900 px-7 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          다음 →
        </button>
      </FormFooter>
    </div>
  );
}

function Step2({
  form,
  update,
  valid,
  onBack,
  onNext,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
  valid: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <SectionTitle title="첫 작업 등록" desc="포트폴리오 1개로 시작하세요. 나중에 더 추가할 수 있어요." />

      <Field label="작업 제목" required>
        <input
          type="text"
          value={form.workTitle}
          onChange={(e) => update({ workTitle: e.target.value })}
          placeholder="예: 욕실 실리콘 풀 재시공"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="참고가 (최저)" required>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={form.workPriceFrom}
              onChange={(e) => update({ workPriceFrom: e.target.value })}
              placeholder="120000"
              min="0"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            <span className="text-sm text-zinc-500">원</span>
          </div>
        </Field>

        <Field label="참고가 (최고)" required>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={form.workPriceTo}
              onChange={(e) => update({ workPriceTo: e.target.value })}
              placeholder="180000"
              min="0"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            <span className="text-sm text-zinc-500">원</span>
          </div>
        </Field>
      </div>

      <Field label="작업 설명" hint="짧게 어떤 시공인지">
        <textarea
          rows={4}
          value={form.workDescription}
          onChange={(e) => update({ workDescription: e.target.value })}
          placeholder="예: 기존 실리콘 100% 제거 후 곰팡이 처리, 프리미엄 실리콘으로 재시공. 욕조·세면대·바닥 코너 전부 포함."
          className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
        />
      </Field>

      <Field label="사진·영상 업로드" hint="3장 이상 권장">
        <button
          type="button"
          className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-10 text-center transition hover:border-zinc-300 hover:bg-zinc-100"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-400"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm font-medium text-zinc-700">사진·영상을 끌어 놓거나 클릭하세요</p>
          <p className="text-xs text-zinc-500">JPG / PNG / MP4 — 사진 한 장만 있어도 OK</p>
          <p className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            데모 — 실제 업로드는 베타에서 활성화됩니다
          </p>
        </button>
      </Field>

      <FormFooter>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center rounded-full border border-zinc-200 bg-white px-7 font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          ← 이전
        </button>
        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="inline-flex h-12 items-center rounded-full bg-zinc-900 px-7 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          내 페이지 발급하기 →
        </button>
      </FormFooter>
    </div>
  );
}

function Step3({ form, handle }: { form: FormState; handle: string }) {
  const url = `trustfolio.com/w/${handle}`;
  const fullUrl = `https://${url}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
    fullUrl
  )}&margin=10`;

  // 데모용으로 기존 시공자 페이지 중 첫 번째로 이동
  const previewHref = `/w/jaehoon`;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-zinc-50 p-8 ring-1 ring-emerald-100 md:p-12">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            {form.name} 시공자님,
            <br />
            페이지가 만들어졌습니다.
          </h2>
          <p className="mt-4 text-zinc-600">
            아래 주소를 명함·인스타·카톡에 뿌리시면 손님이 직접 옵니다.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt={`${form.name} QR`} width={180} height={180} />
            <a
              href={qrUrl}
              download={`trustfolio-${handle}-qr.png`}
              className="text-xs font-medium text-zinc-700 underline-offset-2 hover:underline"
            >
              QR 다운로드
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                내 페이지 주소
              </p>
              <p className="mt-1 break-all font-mono text-lg font-bold text-zinc-900">
                {url}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                명함 미리보기
              </p>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-5 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                    {form.category}
                  </p>
                  <p className="mt-1.5 text-2xl font-bold tracking-tight">{form.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-300">{form.region}</p>
                  <p className="mt-3 font-mono text-xs text-zinc-400">{url}</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    fullUrl
                  )}&margin=4`}
                  alt=""
                  width={80}
                  height={80}
                  className="rounded bg-white p-1.5"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={previewHref}
                className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                내 페이지 보러가기 →
              </Link>
              <Link
                href="/"
                className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-semibold text-amber-900">⚠ 데모입니다</p>
        <p className="mt-1 text-sm leading-relaxed text-amber-800">
          현재는 데모 단계예요. 실제 페이지 발급은 정식 베타에서 활성화됩니다.
          위 "내 페이지 보러가기" 버튼은 예시 시공자(김재훈) 페이지로 연결됩니다.
        </p>
      </div>

      <div className="rounded-2xl bg-zinc-50 p-6">
        <h3 className="text-base font-semibold tracking-tight">다음 단계</h3>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2">
            <span className="text-emerald-600">1.</span>
            QR 다운로드해서 명함에 인쇄, 또는 인스타 프로필에 링크 박기
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">2.</span>
            현장에서 작업 사진 1~2장씩 더 올려서 포트폴리오 채우기
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">3.</span>
            손님 견적 문의 들어오면 카톡으로 알림 받고 응대
          </li>
        </ul>
      </div>
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-zinc-500">{desc}</p>
    </div>
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

function FormFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 flex items-center justify-between gap-3 border-t border-zinc-100 pt-6">
      {children}
    </div>
  );
}
