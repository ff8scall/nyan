import React from "react";
import { Noto_Serif_KR } from "next/font/google";
import "../globals.css";

const notoSerifKr = Noto_Serif_KR({
  weight: ["300", "500", "700"],
  subsets: ["latin"], // Noto Serif KR은 한글 서브셋을 동적으로 지원함
  variable: "--font-serif",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

import SmoothScroll from "@/components/SmoothScroll";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${notoSerifKr.variable}`}>
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css" />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

