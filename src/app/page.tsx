import Link from "next/link";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Problem />
        <HowItWorks />
        <ForWorkers />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white">
            <Logo />
          </span>
          <span className="text-lg font-bold tracking-tight">trustfolio</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
          <a href="#how" className="transition hover:text-zinc-900">
            서비스 소개
          </a>
          <a href="#workers" className="transition hover:text-zinc-900">
            시공자
          </a>
          <a href="#cta" className="transition hover:text-zinc-900">
            견적 요청
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="hidden h-9 items-center px-4 text-sm text-zinc-700 transition hover:text-zinc-900 sm:inline-flex"
          >
            로그인
          </Link>
          <Link
            href="#cta"
            className="inline-flex h-9 items-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            견적 받기
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const portfolio = [
    {
      tag: "코킹",
      title: "욕실 실리콘 재시공",
      price: "150,000원",
      duration: "12:34",
      tone: "from-zinc-100 to-zinc-200",
    },
    {
      tag: "에어컨",
      title: "벽걸이 설치 + 배관",
      price: "220,000원",
      duration: "08:12",
      tone: "from-emerald-50 to-zinc-100",
    },
    {
      tag: "도배",
      title: "원룸 합지 도배",
      price: "380,000원",
      duration: "24:50",
      tone: "from-zinc-100 to-zinc-200",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center md:pt-28 md:pb-32">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          영상으로 검증되는 시공 플랫폼
        </div>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          보이지 않는 일,
          <br />
          <span className="text-zinc-400">보고 맡기세요.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
          모든 시공은 영상으로 기록됩니다. 가격, 후기, 작업 과정까지
          <br className="hidden md:block" /> 확인하고 결정하세요.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="#cta"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-7 font-medium text-white transition hover:bg-zinc-800"
          >
            무료 견적 받기 →
          </Link>
          <Link
            href="#workers"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 font-medium transition hover:bg-zinc-50"
          >
            시공자로 참여하기
          </Link>
        </div>

        <div className="mt-20 grid max-w-4xl grid-cols-2 gap-4 mx-auto md:grid-cols-3">
          {portfolio.map((it) => (
            <div
              key={it.title}
              className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${it.tone} p-5 text-left`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-zinc-700">
                  {it.tag}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                  {it.duration}
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5">
                <h3 className="font-semibold text-zinc-900">{it.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{it.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "3.1×", label: "평균 단가 차이" },
    { value: "100%", label: "영상 기록 시공" },
    { value: "4.9", label: "평균 만족도" },
    { value: "24h", label: "견적 응답 시간" },
  ];
  return (
    <section className="border-y border-zinc-100 bg-zinc-50/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold tracking-tight md:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-zinc-600">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    {
      num: "01",
      title: "가격이 들쭉날쭉",
      body: "같은 코킹 한 군데가 어디는 5만원, 어디는 15만원. 기준이 뭔지 알 수 없습니다.",
    },
    {
      num: "02",
      title: "후기를 못 믿어요",
      body: "작업자가 직접 올린 후기, 부탁한 후기. 진짜인지 확인할 방법이 없습니다.",
    },
    {
      num: "03",
      title: "결과만 보고는 몰라요",
      body: "마감만 깔끔하면 끝? 안에서 어떻게 했는지 알아야 진짜 품질이 보입니다.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          왜 trustfolio 인가
        </p>
        <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          시공의 90%는
          <br /> 보이지 않는 곳에서 결정됩니다.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600">
          벽 안의 실리콘, 천장 위의 배관, 도배지 뒤의 마감. 제대로 했는지는 몇 달이
          지나야 알게 됩니다. 그때는 이미 늦죠.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.num}
            className="rounded-2xl border border-zinc-100 p-8 transition hover:border-zinc-200 hover:shadow-sm"
          >
            <div className="font-mono text-sm font-semibold text-zinc-300">{it.num}</div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{it.title}</h3>
            <p className="mt-3 leading-relaxed text-zinc-600">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "1",
      t: "원하는 작업 요청",
      d: "사진 한 장과 한 줄 설명이면 충분합니다. 24시간 안에 검증된 시공자가 매칭됩니다.",
    },
    {
      n: "2",
      t: "영상 포폴로 비교",
      d: "이전 작업의 전 과정을 영상으로 직접 확인하세요. 가격, 후기, 시공자 본인이 한눈에.",
    },
    {
      n: "3",
      t: "결과까지 영상으로",
      d: "내 시공도 영상으로 기록됩니다. 문제 생기면 바로 확인 가능, A/S도 보장.",
    },
  ];
  return (
    <section id="how" className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            3단계로 끝나는 시공.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
          {steps.map((it) => (
            <div key={it.n} className="bg-zinc-950 p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-zinc-950">
                {it.n}
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{it.t}</h3>
              <p className="mt-3 leading-relaxed text-zinc-400">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForWorkers() {
  const benefits = [
    "현장에서 영상만 찍으면 자동으로 포폴 1장 추가",
    "고객 응대 · 견적 · 결제 전부 우리가 처리",
    "작업 영상은 시공자 본인의 자산 — 어디든 들고 갈 수 있어요",
  ];
  return (
    <section id="workers" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            시공자라면
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            영상 한 번 찍고,
            <br />
            단가는 3배 받으세요.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            일반 시공이 50만원이라면, 작업 증거를 영상으로 남기는 시공자는 평균
            150만원을 받습니다. 마케팅 · 응대 · 결제는 우리가 다 합니다.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <svg
                  className="mt-0.5 flex-shrink-0 text-emerald-600"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-zinc-700">{b}</span>
              </li>
            ))}
          </ul>
          <Link
            href="#"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-zinc-900 px-7 font-medium text-white transition hover:bg-zinc-800"
          >
            시공자 신청하기 →
          </Link>
        </div>

        <div className="relative">
          <div className="flex aspect-[4/5] flex-col justify-end rounded-3xl bg-gradient-to-br from-emerald-50 via-zinc-50 to-zinc-100 p-8">
            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>이번 달 수익</span>
                  <span className="font-semibold text-emerald-600">+218%</span>
                </div>
                <p className="mt-2 text-3xl font-bold tracking-tight">₩4,720,000</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                </div>
                <p className="mt-3 text-xs text-zinc-500">이전 평균 대비 3.1배</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-500">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">새 작업 영상 업로드 완료</p>
                    <p className="text-xs text-zinc-500">방금 전 · 포트폴리오에 추가됨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="rounded-3xl bg-zinc-950 px-8 py-16 text-center text-white md:px-16 md:py-24">
        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          시공, 이제 보고 맡기세요.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          견적은 무료, 영상으로 확인. 24시간 안에 검증된 시공자를 매칭해드립니다.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 font-medium text-zinc-950 transition hover:bg-zinc-100"
          >
            지금 견적 요청 →
          </Link>
          <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 font-medium transition hover:bg-white/5"
          >
            상담 문의
          </Link>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-zinc-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-12 text-sm text-zinc-500 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white">
            <Logo className="h-3 w-3" />
          </span>
          <span className="font-semibold text-zinc-900">trustfolio</span>
          <span className="ml-2">© 2026</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="transition hover:text-zinc-900">
            이용약관
          </a>
          <a href="#" className="transition hover:text-zinc-900">
            개인정보처리방침
          </a>
          <a href="#" className="transition hover:text-zinc-900">
            문의
          </a>
        </div>
      </div>
    </footer>
  );
}
