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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nyan.lego-sia.com";
  
  // SEO Metadata logic: Priority (lang-specific) > (generic field if matches lang or simple fallback) > (hardcoded fallback)
  const title = isKo 
    ? (breed.meta_tags?.title_ko || breed.meta_tags?.title || `${breed.name_ko} 고양이 정보: 성격, 수명, 특징 | nyan`)
    : (breed.meta_tags?.title_en || (lang === 'en' && breed.meta_tags?.title ? null : breed.meta_tags?.title) || `${breed.name_en} Cat: Personality, Lifespan, Traits | nyan`);
  
  const description = isKo
    ? (breed.meta_tags?.description_ko || breed.meta_tags?.description || `${breed.name_ko}의 모든 것. 박물관급 디테일로 확인하는 품종 가이드.`)
    : (breed.meta_tags?.description_en || (lang === 'en' && breed.meta_tags?.description ? null : breed.meta_tags?.description) || `All about ${breed.name_en}. A museum-grade guide to the breed.`);

  const keywords = isKo
    ? (breed.meta_tags?.keywords_ko || breed.meta_tags?.keywords || [breed.name_ko, "고양이", "도감", "nyan"])
    : (breed.meta_tags?.keywords_en || [breed.name_en, "cat", "encyclopedia", "nyan"]);

  return {
    title,
    description,
    keywords,
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nyan.lego-sia.com";
  
  // JSON-LD Schema: Article & FAQ
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
      "@id": `${baseUrl}/${lang}/breeds/${slug}`
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

  // Breadcrumb Schema
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isKo ? "홈" : "Home",
        "item": `${baseUrl}/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isKo ? "도감" : "Encyclopedia",
        "item": `${baseUrl}/${lang}/breeds`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": isKo ? breed.name_ko : breed.name_en,
        "item": `${baseUrl}/${lang}/breeds/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
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
