
import * as THREE from 'three';
import { CONFIG } from '../config/app.config';

export function createRenderer (canvas) {
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(CONFIG.canvas.width, CONFIG.canvas.height);
    return renderer;
}