import * as THREE from 'three';
import { CONFIG } from '../config/app.config';

export function createCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    CONFIG.camera.fov,
    CONFIG.canvas.width / CONFIG.canvas.height,
    CONFIG.camera.near,
    CONFIG.camera.far
  );

  camera.position.set(
    CONFIG.camera.position.x,
    CONFIG.camera.position.y,
    CONFIG.camera.position.z
  );

  return camera;
}
