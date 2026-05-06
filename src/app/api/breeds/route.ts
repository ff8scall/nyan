import { getAllBreedSlugs, getBreedBySlug } from "@/lib/breeds";
import { NextResponse } from "next/server";

export async function GET() {
  const slugs = await getAllBreedSlugs();
  const breeds = await Promise.all(slugs.map(slug => getBreedBySlug(slug)));
  return NextResponse.json(breeds.filter(b => b !== null));
}
