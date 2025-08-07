import { gsap } from 'gsap';
import { CONFIG } from '../config/app.config';
import * as THREE from 'three';

interface SphereWithAngle {
  sphere: THREE.Mesh;
  angle: number;
}

// Business logic - Visual effects
export const animateSphereExpansion = (
  spheres: SphereWithAngle[],
  centerPosition: THREE.Vector3,
  radius: number
): void => {
  spheres.forEach(({ sphere, angle }, index) => {
    // Calculate Sphere target positions using angles
    const targetX = centerPosition.x + radius * Math.cos(angle);
    const targetY = centerPosition.y + radius * Math.sin(angle);
    const targetZ = centerPosition.z;

    // Animate Sphere Position to Target Position
    gsap.to(sphere.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: CONFIG.sphere.animation.expansion.duration,
      delay: index * CONFIG.sphere.animation.expansion.delay,
      ease: CONFIG.sphere.animation.expansion.ease,
    });

    // Animate Sphere Scale to Target scale
    gsap.fromTo(
      sphere.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: CONFIG.sphere.animation.scale.duration,
        delay: index * CONFIG.sphere.animation.expansion.delay,
        ease: CONFIG.sphere.animation.scale.ease,
      }
    );
  });
};

export const animateSphereGroup = (
  sphereGroup: THREE.Group
): void => {
  gsap.to(sphereGroup.rotation, {
    z: '+=' + Math.PI * 2 * 0.4,
    duration: 3,
    ease: 'power4.Out',
  });
};
