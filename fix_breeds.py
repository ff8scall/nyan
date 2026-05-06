import os
import json
import glob

BREEDS_DIR = "src/data/breeds"

STYLE_100P_MASTER = (
    "An unretouched, hyper-realistic professional studio photograph of a {breed_traits} feline cat sitting with a slight asymmetrical posture, looking curiously off-camera, on a grey concrete pedestal. "
    "Absolute pitch-black minimalist background. Soft directional studio light creates subtle micro-contrast and deep, realistic contact shadows under the cat's paws. "
    "Stray messy flyaway hairs catch the light naturally. The cat has natural {eye_color} eyes with sharp catchlights reflecting the studio environment. "
    "Shot on Sony A7R V, 35mm lens, f/16 aperture and hyper-focal distance. ABSOLUTELY NO BOKEH, every single hair from head to tail is completely in sharp focus. "
    "ISO 400, subtle film grain, raw unedited photograph, masterpiece --ar 1:1 --v 6.1"
)

STYLE_100P_MACRO = (
    "Extreme unretouched macro photography of a {breed_name} feline cat's {eye_color} eye. Sharp focus on the intricate iris patterns and the fine texture of the surrounding {coat_desc} fur. "
    "Realistic catchlights reflecting a studio window. No artificial glow, raw texture, macro-contrast, f/22, 8k --ar 1:1 --v 6.1"
)

STYLE_100P_FULLBODY = (
    "An unretouched full-body side profile of a {breed_traits} feline cat standing on a minimalist grey concrete floor. {coat_desc} fur texture. Slight asymmetrical standing posture. "
    "Absolute pitch-black background. Sharp focus across the entire length of the cat, f/16, no bokeh. Realistic directional lighting with deep contact shadows. ISO 400, raw photograph, 8k --ar 16:9 --v 6.1"
)

STYLE_100P_FRONTAL = (
    "An unretouched, hyper-realistic front-facing portrait of a {breed_traits} feline cat with an intelligent expression. Looking slightly off-camera to avoid artificiality. "
    "Absolute black background, sharp focus head to tail, f/16. Raw unedited photograph, subtle grain --ar 1:1 --v 6.1"
)

COMMON_NEGATIVE = (
    "(worst quality, low quality:1.4), text, watermark, blurry, deformed paws, extra toes, "
    "cartoon, painting, asymmetric ears, (human, person, woman, man:1.5), (flower, plant:1.5), "
    "(dog, canine, bird:1.5), furniture, house, background objects"
)

def fix_breeds():
    breed_files = glob.glob(os.path.join(BREEDS_DIR, "*.json"))
    fixed_count = 0

    for file_path in breed_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        breed_id = data.get("id", "unknown")
        if breed_id in ["ragdoll", "siamese"]: # 이미 완료된 파일은 스킵
            continue

        # 1. Extract traits for prompt engineering
        breed_name = data.get("name_en", breed_id)
        eye_color = "natural"
        if "blue" in data.get("common_colors", []): eye_color = "blue"
        
        # 품종별 특징 조합
        body_type = data.get("body_type", "average")
        coat_len = data.get("coat_length", "short")
        breed_traits = f"{body_type}, {coat_len}-haired {breed_name}"
        coat_desc = f"{coat_len} {data.get('coat_texture', 'soft')}"

        # 2. Update Prompts
        data["image_master_prompt"] = STYLE_100P_MASTER.format(breed_traits=breed_traits, eye_color=eye_color)
        data["image_macro_prompt"] = STYLE_100P_MACRO.format(breed_name=breed_name, eye_color=eye_color, coat_desc=coat_desc)
        data["image_fullbody_prompt"] = STYLE_100P_FULLBODY.format(breed_traits=breed_traits, coat_desc=coat_desc)
        data["image_frontal_prompt"] = STYLE_100P_FRONTAL.format(breed_traits=breed_traits)
        data["negative_prompt"] = COMMON_NEGATIVE

        # 3. Update Image Paths (WEBP -> PNG)
        for key in data:
            if key.endswith("_path") and isinstance(data[key], str):
                data[key] = data[key].replace(".webp", ".png")
        
        # Color Variants paths
        if "color_variants" in data:
            for variant in data["color_variants"]:
                if "path" in variant:
                    variant["path"] = variant["path"].replace(".webp", ".png")
                
                # 컬러 변종 프롬프트도 고도화 (반드시 feline cat 키워드 포함)
                if "prompt" in variant:
                    variant_name = variant['name_ko']
                    if "(" in variant_name and ")" in variant_name:
                        variant_name = variant_name.split("(")[1].split(")")[0]
                    
                    variant["prompt"] = f"Unretouched studio portrait of a {variant_name} {breed_name} feline cat. Sharp focus, absolute black background, f/16 --ar 4:5 --v 6.1"

        # 4. Save back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        fixed_count += 1

    print(f"Successfully fixed {fixed_count} breed JSON files with mandatory 'feline cat' keywords.")

if __name__ == "__main__":
    fix_breeds()
