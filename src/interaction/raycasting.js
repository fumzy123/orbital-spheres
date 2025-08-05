import * as THREE from 'three';

// Raycasting logic - Pure functions
export function createRaycaster() {
  return new THREE.Raycaster();
}

export function getIntersectedObjects(
  raycaster,
  camera,
  mouse,
  objects
) {
  // Set the raycaster from the camera to mouse position
  raycaster.setFromCamera(mouse, camera);

  // ---- Check if ray intersects with any objects in the scene ----
  return raycaster.intersectObjects(objects);
}

export function findClickedObject(intersects) {
  return intersects.length > 0 ? intersects[0].object : null;
}
