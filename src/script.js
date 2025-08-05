import * as THREE from 'three';

import { CONFIG } from './config/app.config';
import { createScene } from './core/scene';
import { createCamera } from './core/camera';
import { createRenderer } from './core/renderer';
import { createCube, createSphereRing } from './objects/factories';
import { calculateMousePosition } from './interaction/input';
import {
  createRaycaster,
  getIntersectedObjects,
  findClickedObject,
} from './interaction/raycasting';
import {
  animateSphereExpansion,
  animateSphereGroup,
} from './objects/animation';

// Create Core components
const scene = createScene();
const camera = createCamera();
const canvas = document.querySelector(CONFIG.canvas.selector);
const renderer = createRenderer(canvas);

// Add Camera to Scene
scene.add(camera);

// Create a Cube Mesh
const cubeMesh = createCube();
scene.add(cubeMesh);

// Create Renderer

// Impure Functions
// function createSphereRing(sphereCount, clickedObject, scene) {
//   // Create a Group to hold sphere objects
//   const sphereGroup = new THREE.Group();
//   sphereGroup.position.copy(clickedObject.position);
//   scene.add(sphereGroup);

//   // Sphere array to hold sphere and angle
//   const spheres = [];

//   for (let i = 0; i < sphereCount; i++) {
//     // Calculate the angle of the Sphere based on the index
//     const angle = (i / sphereCount) * Math.PI * 2; // full circle

//     // Create a Sphere
//     const sphere = new THREE.Mesh(
//       new THREE.SphereGeometry(0.2, 32, 32),
//       new THREE.MeshBasicMaterial({ color: 0xffff00 })
//     );

//     // Position all spheres at the center of the Group
//     sphere.position.set(
//       sphereGroup.position.x,
//       sphereGroup.position.y,
//       sphereGroup.position.z
//     );

//     // Add Sphere to group
//     sphereGroup.add(sphere);

//     // Add Sphere to the array along with its angle
//     spheres.push({ sphere, angle });
//   }

//   return { sphereGroup, spheres };
// }

function addSpheresAroundObject(
  clickedObject,
  sphereCount = 4,
  radius = 1
) {
  // Create Sphere ring at the centre of clicked object
  const { sphereGroup, spheres } = createSphereRing(
    sphereCount,
    clickedObject.position
  );

  // Add Group to scene
  scene.add(sphereGroup);

  // Animate spheres expanding outward
  animateSphereExpansion(spheres, clickedObject.position, radius);

  // Animate the Sphere Group
  animateSphereGroup(sphereGroup);
}

// Interactivity
function handleCanvasClicked(event) {
  // Get Mouse Position
  const mousePos = calculateMousePosition(event, canvas);

  // Cast ray from Camera to Mouse position and
  // Get all the Objects the ray intersected with
  const raycaster = createRaycaster();
  const intersects = getIntersectedObjects(
    raycaster,
    camera,
    mousePos,
    scene.children
  );

  // Get the Object that the Mouse clicked on
  const clickedObject = findClickedObject(intersects);

  // Check if the clicked object is our named cube
  if (clickedObject?.name === 'myCube') {
    // Add three spheres around the cube
    addSpheresAroundObject(clickedObject);
  }
}

canvas.addEventListener('click', (event) => {
  handleCanvasClicked(event);
});

// Animation
function animate() {
  // Time
  // Calculate the delta time because you want your animation to go at the same speed
  // regardless of the frame rate
  // This is done by calculating the time difference between the current frame and the last frame
  // and using that to scale the rotation speed
  // This is important for smooth animations
  // and to avoid animations being too fast on high frame rates or too slow on low frame rates
  // This is a common technique in game development and animation
  // It ensures that the animation speed is consistent across different devices and frame rates
  // It is also known as delta time or frame time
  // It is calculated by subtracting the time of the last frame from the current time
  // and using that to scale the rotation speed of the object
  // This is a common technique in game development and animation
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time
  // time = currentTime;

  // console.log(deltaTime);

  //   const elapsedTime = clock.getElapsedTime();
  //   console.log(elapsedTime);

  //   // Update Object
  //   cubeMesh.position.x = Math.cos(elapsedTime);
  //   cubeMesh.position.y = Math.sin(elapsedTime);

  // Render new frame using scene and camera
  renderer.render(scene, camera);

  // Call animate again on the next frame
  requestAnimationFrame(animate);
}

animate();
