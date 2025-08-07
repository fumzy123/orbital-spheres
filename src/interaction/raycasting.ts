import * as THREE from 'three';

// Raycasting logic - Pure functions
export function createRaycaster(): THREE.Raycaster {
  return new THREE.Raycaster();
}

export function getIntersectedObjects(
  raycaster: THREE.Raycaster,
  camera: THREE.Camera,
  mouse: THREE.Vector2,
  objects: THREE.Object3D[]
): THREE.Intersection[] {
  // Set the raycaster from the camera to mouse position
  raycaster.setFromCamera(mouse, camera);

  // ---- Check if ray intersects with any objects in the scene ----
  return raycaster.intersectObjects(objects);
}

export function findClickedObject(
  intersects: THREE.Intersection[]
): THREE.Object3D | null {
  return intersects.length > 0 ? intersects[0].object : null;
}
