import * as THREE from 'three';
import { CONFIG } from '../config/app.config';

export function createRenderer(
  canvas: HTMLCanvasElement | null
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas || undefined,
  });
  renderer.setSize(CONFIG.canvas.width, CONFIG.canvas.height);
  return renderer;
}

export function loopRenderer(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
): () => void {
  const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  return animate;
}
