import React from "react";
import { getDictionary, Locale } from "@/i18n/dictionaries";
import BreedsClientGridPage from "./ClientPage";
import { Metadata } from "next";
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isKo = lang === 'ko';

  return {
    title: isKo ? "고양이 도감 | nyan" : "Cat Encyclopedia | nyan",
    description: isKo 
      ? "전 세계 50여 종의 고양이 품종을 한눈에 살펴보세요. 성격, 털 빠짐, 지능 등 다양한 필터를 통해 당신에게 맞는 고양이를 찾을 수 있습니다." 
      : "Explore over 50 cat breeds from around the world. Use filters like personality, shedding, and intelligence to find the perfect cat for you.",
    openGraph: {
      title: isKo ? "고양이 도감" : "Cat Encyclopedia",
      description: isKo ? "50여 종의 고양이 품종 데이터베이스" : "Database of over 50 cat breeds",
      url: `https://nyan.lego-sia.com/${lang}/breeds`,
      siteName: "nyan",
      type: "website",
    }
  };
}

// Helper to fetch breeds data on the server
async function getBreeds() {
  const breedsDirectory = path.join(process.cwd(), 'src/data/breeds');
  const fileNames = fs.readdirSync(breedsDirectory);
  const breeds = fileNames
    .filter(f => f.endsWith('.json'))
    .map(fileName => {
      const fullPath = path.join(breedsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents);
      // Ensure slug exists for link integrity
      if (!data.slug) data.slug = data.id || fileName.replace('.json', '');
      return data;
    });
  return breeds;
}

export default async function BreedsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang as Locale;
  const dict = getDictionary(l);
  const breeds = await getBreeds();

  return <BreedsClientGridPage breeds={breeds} lang={lang} dict={dict} />;
}
