import sys

file_path = "/Users/nguyenthanhtuyen/Downloads/PORTPOLIO/index.html"
with open(file_path, "r") as f:
    lines = f.readlines()

bom_car_idx = -1
tree_marvel_idx = -1
for i, line in enumerate(lines):
    if "<!-- Bờm Car -->" in line:
        bom_car_idx = i
    if "<!-- Tree Marvel -->" in line:
        tree_marvel_idx = i

if bom_car_idx == -1 or tree_marvel_idx == -1:
    print("Could not find blocks")
    sys.exit(1)

# Find the end of Tree Marvel
end_idx = tree_marvel_idx
while end_idx < len(lines):
    if "    </div>" in lines[end_idx] and "  </div>" in lines[end_idx+1] and "</section>" in lines[end_idx+2]:
        break
    end_idx += 1

bom_car_block = lines[bom_car_idx:tree_marvel_idx]
tree_marvel_block = lines[tree_marvel_idx:end_idx]

# swap them
new_lines = lines[:bom_car_idx] + tree_marvel_block + bom_car_block + lines[end_idx:]

with open(file_path, "w") as f:
    f.writelines(new_lines)

print("Swapped successfully")
