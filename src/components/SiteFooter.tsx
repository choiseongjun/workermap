import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-12 text-sm text-zinc-500 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white">
            <Logo size={12} />
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
