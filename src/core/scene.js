import * as THREE from 'three';

export function createScene() {
  return new THREE.Scene();
}

export function addObjectToScene(scene, object) {
  scene.add(object);
  return scene;
}

export function getSceneChildren(scene) {
  return scene.children;
}
