# 3D Model Instructions

Place your denture GLB files in this directory:

- `top-model.glb` - Upper denture model
- `base-model.glb` - Middle denture base  
- `teeth-model.glb` - Lower denture teeth

## Model Sources
The user has provided these models:
- "C:\Users\josh\Desktop\3d objects\Top-Model - Vladyslav Pereverzyev.stl"
- "C:\Users\josh\Desktop\3d objects\bottom-Denture Teeth - Vladyslav Pereverzyev.glb"  
- "C:\Users\josh\Desktop\3d objects\Top-Model - Vladyslav Pereverzyev.glb"

## Instructions
1. Copy the GLB files from the desktop to this directory
2. Rename them to match the expected names:
   - `Top-Model - Vladyslav Pereverzyev.glb` → `top-model.glb`
   - `bottom-Denture Teeth - Vladyslav Pereverzyev.glb` → `teeth-model.glb`
   - Create or convert the STL to GLB for the base model → `base-model.glb`

## Fallback Behavior
If models are not found, the component will use fallback geometries:
- Top: Torus geometry (arch shape)
- Base: Cylinder geometry (base plate)
- Teeth: Sphere geometry (teeth cluster)

## Optimization Checklist
- [ ] File size under 2MB each
- [ ] Compressed with Draco if possible
- [ ] Single mesh preferred per file
- [ ] Low poly count (<50k vertices each)
