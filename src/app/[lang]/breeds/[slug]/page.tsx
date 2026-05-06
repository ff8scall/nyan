import { getBreedBySlug, getAllBreedSlugs } from "@/lib/breeds";
import { notFound } from "next/navigation";
import React from "react";
import BreedClientPage from "./ClientPage";

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

  return <BreedClientPage breed={breed} lang={lang} slug={slug} />;
}
