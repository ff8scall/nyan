import fs from 'fs';
import path from 'path';

export interface BreedData {
  id: string;
  name_en: string;
  name_ko: string;
  aliases_ko: string[];
  origin_country: string;
  slug: string;
  rank?: number;
  
  // Physical
  size_category: string;
  body_type: string;
  coat_length: string;
  coat_texture: string;
  common_patterns: string[];
  common_colors: string[];
  
  // Vital Stats
  weight_min_kg?: number;
  weight_max_kg?: number;
  lifespan_min_years?: number;
  lifespan_max_years?: number;
  
  // Metrics
  grooming_level: number;
  shedding_level: number;
  activity_level: number;
  playfulness_level: number;
  affection_level: number;
  independence_level: number;
  vocal_level: number;
  beginner_friendly_score: number;
  apartment_fit_score: number;
  family_fit_score: number;
  multi_pet_fit_score: number;
  
  // Social Compatibility
  social_compatibility?: {
    kids_score: number;
    cats_score: number;
    dogs_score: number;
    strangers_score: number;
  };
  
  // SEO & Editorial
  pros: string[];
  cons: string[];
  visual_comparison_tip?: string;
  meta_tags?: {
    title: string;
    description: string;
    keywords: string[];
  };
  
  // Economics
  economics?: {
    price_range_ko: string;
    monthly_care_cost: string;
  };
  
  // Content
  summary_en: string;
  summary_ko: string;
  appearance_en?: string;
  appearance_ko?: string;
  personality_en?: string;
  personality_ko?: string;
  care_en?: string;
  care_ko?: string;
  local_rarity_ko?: string;
  
  // Multimedia
  image_master_path?: string;
  image_macro_path?: string;
  image_fullbody_path?: string;
  image_fullbody_side_path?: string;
  image_frontal_path?: string;
  image_strict_profile_path?: string;
  image_eye_macro_path?: string;
  image_coat_texture_path?: string;
  image_variant_path?: string;
  color_variants?: Array<{
    name_ko: string;
    path: string;
    prompt: string;
  }>;
  
  // Health
  health_notes_ko?: string;
  known_risks?: Array<{ name_en: string; name_ko: string; severity_note: string }>;
  
  // Misc
  similar_breed_ids?: string[];
  faq?: Array<{ question_ko: string; answer_ko: string }>;

  // Compatibility layer for old UI
  name?: { en: string; ko: string };
  museum_plaque?: {
    catchphrase: { en: string; ko: string };
  };
}

const breedsDirectory = path.join(process.cwd(), 'src/data/breeds');

export async function getBreedBySlug(slug: string): Promise<BreedData | null> {
  try {
    const fullPath = path.join(breedsDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Auto-generate slug if missing
    if (!data.slug) data.slug = data.id || slug;
    
    // Compatibility: Map name_en/ko to name object
    if (!data.name && data.name_en) {
      data.name = { en: data.name_en, ko: data.name_ko };
    }
    
    // Compatibility: Map summary to museum_plaque
    if (!data.museum_plaque && data.summary_ko) {
      data.museum_plaque = {
        catchphrase: { en: data.summary_en || "", ko: data.summary_ko }
      };
    }

    return data;
  } catch (error) {
    console.error(`Error loading breed ${slug}:`, error);
    return null;
  }
}

export async function getAllBreedSlugs() {
  if (!fs.existsSync(breedsDirectory)) return [];
  const fileNames = fs.readdirSync(breedsDirectory);
  return fileNames
    .filter(f => f.endsWith('.json'))
    .map((fileName) => fileName.replace(/\.json$/, ''));
}
