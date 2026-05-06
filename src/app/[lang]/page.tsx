import React from "react";
import { getDictionary, Locale } from "@/i18n/dictionaries";
import HomeClientPage from "./ClientPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isKo = lang === 'ko';

  return {
    title: isKo ? "nyan | 고양이 품종 아카이브" : "nyan | Feline Breed Archive",
    description: isKo 
      ? "전 세계 50여 종의 고양이 품종을 박물관급 퀄리티로 기록한 디지털 아카이브. nyan에서 당신의 묘연을 찾아보세요." 
      : "A museum-grade feline digital archive documenting over 50 cat breeds from around the world. Find your perfect companion on nyan.",
    openGraph: {
      title: "nyan",
      description: isKo ? "박물관급 고양이 품종 아카이브" : "Museum-grade feline digital archive",
      url: `https://nyan.lego-sia.com/${lang}`,
      siteName: "nyan",
      type: "website",
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang as Locale;
  const dict = getDictionary(l);

  return <HomeClientPage lang={lang} dict={dict} />;
}
