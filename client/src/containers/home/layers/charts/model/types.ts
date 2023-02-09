import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

export type GLTFResult = GLTF & {
  nodes: {
    agua: Mesh;
    Socioeconomic: Mesh;
    Management: Mesh;
    Physical: Mesh;
  };
  materials: {
    socio: MeshStandardMaterial;
    management: MeshStandardMaterial;
    TERRAIN: MeshStandardMaterial;
  };
};
