import { getAllBreedSlugs, getBreedBySlug } from '@/lib/breeds';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nyan.lego-sia.com';
  const slugs = await getAllBreedSlugs();
  
  // RSS feed typically uses one primary language, we'll use English as fallback but can serve both
  const breeds = await Promise.all(slugs.map(slug => getBreedBySlug(slug)));

  const itemsXml = breeds
    .filter(b => b !== null)
    .map((breed) => `
    <item>
      <title><![CDATA[${breed!.name_en} (${breed!.name_ko})]]></title>
      <link>${baseUrl}/ko/breeds/${breed!.id}</link>
      <guid>${baseUrl}/ko/breeds/${breed!.id}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[${breed!.summary_ko || breed!.summary_en}]]></description>
    </item>`)
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>NYAN DIGITAL ARCHIVE</title>
  <link>${baseUrl}</link>
  <description>Museum-grade cat breed encyclopedia</description>
  <language>ko</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${itemsXml}
</channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
