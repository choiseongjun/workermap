import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeader() {
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
          <Link href="/#features" className="transition hover:text-zinc-900">
            기능
          </Link>
          <Link href="/#pricing" className="transition hover:text-zinc-900">
            요금제
          </Link>
          <Link href="/market" className="transition hover:text-zinc-900">
            둘러보기
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="hidden h-9 items-center px-4 text-sm text-zinc-700 transition hover:text-zinc-900 sm:inline-flex"
          >
            로그인
          </Link>
          <Link
            href="#"
            className="inline-flex h-9 items-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            무료로 시작
          </Link>
        </div>
      </div>
    </header>
  );
}
