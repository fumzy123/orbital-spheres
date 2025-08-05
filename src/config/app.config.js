// Configuration Constant single source of truth

export const CONFIG = {
  canvas: {
    selector: 'canvas.webgl',
    width: 800,
    height: 600,
  },
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0, z: 2 },
  },
  sphere: {
    geometry: { radius: 0.2, segments: 32 },
    material: { color: 0xffff00 },
    animation: {
      expansion: { duration: 1, delay: 0.1, ease: 'back.out(1.7)' },
      scale: { duration: 0.8, ease: 'back.out(1.7)' },
      rotation: { duration: 3, ease: 'power4.Out' },
    },
  },
};
