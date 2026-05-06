import os
import shutil

SOURCE_ROOT = "public/images/Nyan"
TARGET_ROOT = "C:/AI/Antigravity/Nyan_originals"

def move_pngs():
    if not os.path.exists(TARGET_ROOT):
        os.makedirs(TARGET_ROOT)
        
    count = 0
    for root, dirs, files in os.walk(SOURCE_ROOT):
        for file in files:
            if file.endswith(".png"):
                # Relative path from SOURCE_ROOT
                rel_path = os.path.relpath(root, SOURCE_ROOT)
                target_dir = os.path.join(TARGET_ROOT, rel_path)
                
                if not os.path.exists(target_dir):
                    os.makedirs(target_dir)
                
                source_file = os.path.join(root, file)
                target_file = os.path.join(target_dir, file)
                
                print(f"Moving: {source_file} -> {target_file}")
                shutil.move(source_file, target_file)
                count += 1
                
    print(f"\nSuccessfully moved {count} PNG files.")

if __name__ == "__main__":
    move_pngs()
