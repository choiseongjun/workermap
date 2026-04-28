import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products, getWorker, formatPriceRange } from "@/lib/market";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Problem />
        <HowItWorks />
        <Features />
        <Pricing />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  const featured = products.slice(0, 3);
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center md:pt-28 md:pb-32">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          시공자를 위한 영업 도구
        </div>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          당신의 시공이
          <br />
          <span className="text-zinc-400">곧 영업입니다.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
          사진 한 번 올리면 끝. 명함·인스타·블로그 대신
          <br className="hidden md:block" /> 5분 안에 완성되는 내 포트폴리오 사이트.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-7 font-medium text-white transition hover:bg-zinc-800"
          >
            무료로 시작하기 →
          </Link>
          <Link
            href="/market"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-7 font-medium transition hover:bg-zinc-50"
          >
            예시 둘러보기
          </Link>
        </div>

        <div className="mt-20">
          <p className="mb-6 text-sm font-medium text-zinc-500">
            이런 페이지를 5분 안에 만들 수 있습니다
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
            {featured.map((p) => {
              const w = getWorker(p.workerId);
              return (
                <Link
                  href={`/market/${p.id}`}
                  key={p.id}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 text-left transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="relative flex h-full flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/95 px-2 py-0.5 text-xs font-medium text-zinc-700">
                        {p.category}
                      </span>
                      {p.duration && (
                        <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                          {p.duration}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{p.title}</h3>
                      <p className="mt-1 text-sm text-white/80">
                        {w?.name} · {formatPriceRange(p.priceFrom, p.priceTo)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "5분", label: "첫 포트폴리오 완성" },
    { value: "무료", label: "시작 비용" },
    { value: "QR 1장", label: "명함 대신" },
    { value: "24/7", label: "자동 영업" },
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
      title: "인스타에 올려도 검색이 안 돼요",
      body: "구글·네이버에서 \"강남 욕실 코킹\" 검색해도 인스타 게시물은 안 나옵니다. 손님이 못 찾아요.",
    },
    {
      num: "02",
      title: "후기는 카톡 캡처로 흩어집니다",
      body: "잘 받은 후기, 다음 손님한테 보여주려면 매번 캡처 찾아 헤매기. 정리되지도, 검증도 안 돼요.",
    },
    {
      num: "03",
      title: "명함은 다음 주면 잊혀져요",
      body: "현장에서 받은 명함, 손님 책상에서 일주일이면 사라집니다. 다시 찾을 길도 없죠.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          왜 trustfolio 가 필요한가
        </p>
        <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          시공은 잘하는데,
          <br /> 영업은 어려우셨죠?
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600">
          현장에서 시공 잘하는 거랑, 손님이 나를 찾아오게 만드는 건 완전히 다른 일입니다.
          그 영업 부분을 우리가 도와드릴게요.
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
      t: "사진·영상 업로드",
      d: "현장에서 찍은 사진 한 장이면 충분합니다. 영상 있으면 신뢰도 ↑.",
    },
    {
      n: "2",
      t: "내 페이지 자동 생성",
      d: "trustfolio.com/내이름 으로 깔끔한 페이지가 즉시 만들어집니다. QR 코드도 함께.",
    },
    {
      n: "3",
      t: "카톡·인스타·명함에 공유",
      d: "내 페이지 링크 또는 QR을 손님한테 한 번에. 명함 대신, 인스타 게시물 대신.",
    },
    {
      n: "4",
      t: "견적 요청 자동 도착",
      d: "손님이 내 페이지에서 견적 요청하면 카톡 알림으로 바로 옵니다. 응대만 하면 끝.",
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
            4단계로 끝나는 영업.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((it) => (
            <div key={it.n} className="bg-zinc-950 p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-zinc-950">
                {it.n}
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{it.t}</h3>
              <p className="mt-3 leading-relaxed text-zinc-400">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: "내 도메인 사용",
      body: "trustfolio.com/내이름. Pro부터는 직접 도메인(예: kim-coking.com) 연결도 가능.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      title: "검색 노출 (SEO)",
      body: "구글·네이버 검색 결과에 잡히도록 자동 최적화. 인스타로는 절대 못 함.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      title: "견적 폼 자동화",
      body: "손님이 내 페이지에서 견적 요청 → 카톡으로 알림. 사진·연락처 미리 받아 정리.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      title: "후기 한 곳에 모음",
      body: "고객이 직접 남긴 후기만 노출. 카톡 캡처 찾아헤매기 끝.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
        </svg>
      ),
    },
    {
      title: "조회 분석",
      body: "어떤 시공이 많이 봤는지, 견적 전환율은 얼마인지 — 매출 늘리는 데 쓰세요.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      title: "QR 코드",
      body: "현장에서 손님한테 바로 보여줄 수 있는 QR. 명함 안 줘도 됩니다.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <line x1="14" y1="14" x2="14" y2="21" />
          <line x1="18" y1="14" x2="18" y2="18" />
          <line x1="14" y1="18" x2="21" y2="18" />
          <line x1="18" y1="21" x2="21" y2="21" />
        </svg>
      ),
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          기능
        </p>
        <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          시공자를 위한
          <br />
          모든 영업 도구.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600">
          포트폴리오 페이지부터 견적 자동화, 후기 관리, 검색 노출까지. 시공자가 영업
          때문에 시간 쓰지 않게 만듭니다.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border border-zinc-100 p-7 transition hover:border-zinc-200 hover:shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white">
              <div className="h-5 w-5">{it.icon}</div>
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      tag: "이렇게 시작하세요",
      features: [
        "포트폴리오 3개까지",
        "trustfolio.com/내이름 URL",
        "QR 코드 발급",
        "견적 폼 1개",
      ],
      cta: "무료로 시작",
      highlight: false,
    },
    {
      name: "Pro",
      price: "9,900",
      tag: "월 — 가장 인기",
      features: [
        "포트폴리오 무제한",
        "직접 도메인 연결",
        "검색 노출(SEO) 강화",
        "카톡 견적 알림",
        "조회 분석",
        "후기 위젯",
      ],
      cta: "Pro 시작하기",
      highlight: true,
    },
    {
      name: "Biz",
      price: "29,900",
      tag: "월 — 팀/사업자용",
      features: [
        "Pro의 모든 기능",
        "캘린더 예약",
        "결제 연동",
        "견적서 자동 발급",
        "직원 계정 5개",
        "전담 매니저",
      ],
      cta: "Biz 문의",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="border-t border-zinc-100 bg-zinc-50/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            요금제
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            무료부터, 필요한 만큼.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600">
            시작은 무료. 손님이 늘어나면 그때 업그레이드하세요.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl p-7 ${
                p.highlight
                  ? "bg-zinc-950 text-white shadow-xl ring-2 ring-zinc-950"
                  : "bg-white border border-zinc-200"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
                <span
                  className={`text-xs ${p.highlight ? "text-emerald-300" : "text-zinc-500"}`}
                >
                  {p.tag}
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {p.price === "0" ? "₩0" : `₩${p.price}`}
                </span>
                {p.price !== "0" && (
                  <span className={`text-sm ${p.highlight ? "text-zinc-400" : "text-zinc-500"}`}>
                    /월
                  </span>
                )}
              </div>
              <ul className={`mt-6 space-y-2.5 text-sm ${p.highlight ? "text-zinc-200" : "text-zinc-700"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <svg
                      className={`mt-0.5 flex-shrink-0 ${p.highlight ? "text-emerald-400" : "text-emerald-600"}`}
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
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className={`mt-7 inline-flex h-11 items-center justify-center rounded-full font-medium transition ${
                  p.highlight
                    ? "bg-white text-zinc-900 hover:bg-zinc-100"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-3xl bg-zinc-950 px-8 py-16 text-center text-white md:px-16 md:py-24">
        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          오늘 5분 투자하면,
          <br />
          내일부터 손님이 옵니다.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          지금 무료로 시작하세요. 신용카드 등록 없이.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 font-medium text-zinc-950 transition hover:bg-zinc-100"
          >
            무료로 시작하기 →
          </Link>
          <Link
            href="/market"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 font-medium transition hover:bg-white/5"
          >
            예시 둘러보기
          </Link>
        </div>
      </div>
    </section>
  );
}
