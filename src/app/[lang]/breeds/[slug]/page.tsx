import { getBreedBySlug, getAllBreedSlugs } from "@/lib/breeds";
import { notFound } from "next/navigation";
import React from "react";
import BreedClientPage from "./ClientPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const breed = await getBreedBySlug(slug);
  
  if (!breed) return { title: "Breed Not Found" };

  const isKo = lang === "ko";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  // JSON에 meta_tags가 있으면 사용, 없으면 기본값 생성
  const title = breed.meta_tags?.title || 
    (isKo ? `${breed.name_ko} 고양이 정보: 성격, 수명, 특징 | nyan` : `${breed.name_en} Cat: Personality, Lifespan, Traits | nyan`);
  const description = breed.meta_tags?.description || 
    (isKo ? `${breed.name_ko}의 모든 것. 박물관급 디테일로 확인하는 품종 가이드.` : `All about ${breed.name_en}. A museum-grade guide to the breed.`);

  return {
    title,
    description,
    keywords: breed.meta_tags?.keywords || [breed.name_en, breed.name_ko, "cat", "nyan"],
    alternates: {
      canonical: `${baseUrl}/${lang}/breeds/${slug}`,
      languages: {
        "en-US": `${baseUrl}/en/breeds/${slug}`,
        "ko-KR": `${baseUrl}/ko/breeds/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/${lang}/breeds/${slug}`,
      images: breed.image_master_path ? [{ url: breed.image_master_path }] : [],
    }
  };
}

export async function generateStaticParams() {
  const slugs = await getAllBreedSlugs();
  const params: Array<{ lang: string; slug: string }> = [];
  
  for (const slug of slugs) {
    params.push({ lang: "en", slug });
    params.push({ lang: "ko", slug });
  }
  
  return params;
}

export default async function BreedPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const breed = await getBreedBySlug(slug);

  if (!breed) {
    notFound();
  }

  const isKo = lang === "ko";
  
  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": isKo ? breed.name_ko : breed.name_en,
    "description": isKo ? breed.summary_ko : breed.summary_en,
    "image": breed.image_master_path,
    "author": {
      "@type": "Organization",
      "name": "nyan"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nyan.archive/${lang}/breeds/${slug}`
    }
  };

  const faqLd = breed.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": breed.faq.map(f => ({
      "@type": "Question",
      "name": isKo ? f.question_ko : (f.question_en || f.question_ko),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isKo ? f.answer_ko : (f.answer_en || f.answer_ko)
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <BreedClientPage breed={breed} lang={lang} slug={slug} />
    </>
  );
}
