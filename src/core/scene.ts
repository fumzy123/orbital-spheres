import * as THREE from 'three';

export function createScene(): THREE.Scene {
  return new THREE.Scene();
}

export function addObjectToScene(
  scene: THREE.Scene,
  object: THREE.Object3D
): THREE.Scene {
  scene.add(object);
  return scene;
}

export function getSceneChildren(
  scene: THREE.Scene
): THREE.Object3D[] {
  return scene.children;
}
