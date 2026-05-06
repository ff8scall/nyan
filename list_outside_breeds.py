import os

TOP_30_TARGETS = [
    "munchkin", "ragdoll", "maine-coon", "persian", "exotic-shorthair",
    "devon-rex", "british-shorthair", "abyssinian", "siberian", "sphynx",
    "russian-blue", "bengal", "scottish-fold", "siamese", "norwegian-forest",
    "birman", "oriental-shorthair", "cornish-rex", "burmese", "tonkinese",
    "ocicat", "selkirk-rex", "chartreux", "japanese-bobtail", "korat",
    "somali", "turkish-angora", "havana-brown", "american-shorthair", "manx"
]

# ID 불일치 교정 리스트
MAPPED_TOP_30 = [t if t != "norwegian-forest" else "norwegian-forest-cat" for t in TOP_30_TARGETS]

BREED_DATA_DIR = "src/data/breeds"

def list_outside_breeds():
    all_json_ids = [f.replace(".json", "") for f in os.listdir(BREED_DATA_DIR) if f.endswith(".json")]
    outside_breeds = [bid for bid in all_json_ids if bid not in MAPPED_TOP_30]
    print(outside_breeds)

if __name__ == "__main__":
    list_outside_breeds()
