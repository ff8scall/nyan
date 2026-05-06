import { MetadataRoute } from 'next';
import { getAllBreedSlugs } from '@/lib/breeds';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nyan.lego-sia.com';
  const slugs = await getAllBreedSlugs();
  const languages = ['en', 'ko'];

  const breedUrls = languages.flatMap((lang) =>
    slugs.map((slug) => ({
      url: `${baseUrl}/${lang}/breeds/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  const mainUrls = languages.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${lang}/breeds`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]);

  return [...mainUrls, ...breedUrls];
}
