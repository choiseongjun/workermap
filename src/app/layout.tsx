import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "trustfolio — 보고 맡기는 시공",
  description:
    "영상으로 검증된 시공만 모았습니다. 가격, 후기, 작업 과정까지 보고 결정하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
