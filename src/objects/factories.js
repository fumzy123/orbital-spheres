import * as THREE from 'three';
import { CONFIG } from '../config/app.config.js';

// Object creation factories - Pure functions
export const createCube = (name = 'myCube') => {
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  cube.name = name;
  cube.position.set(0, 0, 0);

  return cube;
};

export const createSphere = () => {
  const geometry = new THREE.SphereGeometry(
    CONFIG.sphere.geometry.radius,
    CONFIG.sphere.geometry.segments,
    CONFIG.sphere.geometry.segments
  );

  const material = new THREE.MeshBasicMaterial(
    CONFIG.sphere.material
  );
  return new THREE.Mesh(geometry, material);
};

export const createSphereGroup = (centerPosition) => {
  const group = new THREE.Group();
  group.position.copy(centerPosition);
  return group;
};

export function createSphereRing(sphereCount, ringPosition) {
  // Create a Group to group sphere objects
  const sphereGroup = createSphereGroup(ringPosition);

  // Sphere array to hold sphere and angle
  const spheres = [];

  for (let i = 0; i < sphereCount; i++) {
    
    // Create a Sphere
    const sphere = createSphere();

    // Position sphere at the center of the Group
    sphere.position.copy(sphereGroup.position);

    // Add Sphere to group
    sphereGroup.add(sphere);

    // Calculate the angle of the Sphere based on the index
    const angle = (i / sphereCount) * Math.PI * 2; // full circle
    
    // Add Sphere to the array along with its angle
    spheres.push({ sphere, angle });
  }

  return { sphereGroup, spheres };
}
