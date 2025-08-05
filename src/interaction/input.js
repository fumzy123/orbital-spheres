import * as THREE from 'three';
import { CONFIG } from '../config/app.config.js';

export function calculateMousePosition(event, canvas) {
  // Get the mouse position on viewport coordinates
  const { clientX: mousePositionX, clientY: mousePositionY } = event;

  // Get the canvas position
  const { left: canvasLeft, top: canvasTop } =
    canvas.getBoundingClientRect();

  // Get the mouse position on normalized device coordinates
  const mouseNormalizedDeviceCoordinates = new THREE.Vector2();

  // Convert mouse viewport coordinates to normalized device coordinates
  mouseNormalizedDeviceCoordinates.x =
    ((mousePositionX - canvasLeft) / CONFIG.canvas.width) * 2 - 1;
  mouseNormalizedDeviceCoordinates.y =
    -((mousePositionY - canvasTop) / CONFIG.canvas.height) * 2 + 1;

  return mouseNormalizedDeviceCoordinates;
}
