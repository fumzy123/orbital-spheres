import * as THREE from 'three';
import { gsap } from 'gsap';

// ============================================================================
// CONFIGURATION
// ============================================================================
// const CONFIG = {
//   canvas: {
//     selector: 'canvas.webgl',
//     width: 800,
//     height: 600
//   },
//   camera: {
//     fov: 75,
//     near: 0.1,
//     far: 1000,
//     position: { x: 0, y: 0, z: 2 }
//   },
// };

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Create a Cube Mesh
const cubeMesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cubeMesh.name = 'myCube'; // Give the cube a name
cubeMesh.position.set(0, 0, 0);
scene.add(cubeMesh);

// Camera Aspect Ratio
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
camera.position.z = 2;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Utility Functions
function addSpheresAroundObject(
  clickedObject,
  radius = 1,
  sphereCount = 4
) {
  // Create a Group for spheres
  const sphereGroup = new THREE.Group();
  sphereGroup.position.copy(clickedObject.position);
  scene.add(sphereGroup);

  // Create spheres at the center first
  const spheres = [];

  for (let i = 0; i < sphereCount; i++) {
    // Calculate the angle of the Sphere
    const angle = (i / sphereCount) * Math.PI * 2; // full circle

    // Create a Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );

    // Start all spheres at the center (clicked object position)
    sphere.position.set(
      sphereGroup.position.x,
      sphereGroup.position.y,
      sphereGroup.position.z
    );
    sphereGroup.add(sphere);
    spheres.push({ sphere, angle });
  }

  // Animate spheres expanding outward
  spheres.forEach(({ sphere, angle }, index) => {
    const targetX = sphereGroup.position.x + radius * Math.cos(angle);
    const targetY = sphereGroup.position.y + radius * Math.sin(angle);
    const targetZ = sphereGroup.position.z;

    gsap.to(sphere.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 1,
      delay: index * 0.1, // Stagger the animation
      ease: 'back.out(1.7)',
    });

    // Animate the scale animation for extra effect
    gsap.fromTo(
      sphere.scale,
      { x: 0, y: 0, z: 0 }, // Start from zero scale
      {
        x: 1,
        y: 1,
        z: 1, // Scale to normal size
        duration: 0.8,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
      }
    );
  });

  // Animate the Sphere Group
  gsap.to(sphereGroup.rotation, {
    z: '+=' + Math.PI * 2 * 0.4,
    duration: 3,
    ease: 'power4.Out',
  });
}

// Interactivity
function handleCanvasClicked(event) {
  console.log('Canvas clicked');

  // ---- Convert mouse position to normalized device coordinates ----
  // Get the mouse position on viewport coordinates
  const { clientX: mousePositionX, clientY: mousePositionY } = event;

  // Get the canvas position
  const { left: canvasLeft, top: canvasTop } =
    canvas.getBoundingClientRect();

  // Get the mouse position on normalized device coordinates
  // Convert mouse viewport coordinates to normalized device coordinates
  const mouseNormalizedDeviceCoordinates = new THREE.Vector2();
  mouseNormalizedDeviceCoordinates.x =
    ((mousePositionX - canvasLeft) / sizes.width) * 2 - 1;
  mouseNormalizedDeviceCoordinates.y =
    -((mousePositionY - canvasTop) / sizes.height) * 2 + 1;

  // ---- Cast ray to mouse position ----
  // Create a raycaster
  const raycaster = new THREE.Raycaster();
  // Set the raycaster from the camera to mouse position
  raycaster.setFromCamera(mouseNormalizedDeviceCoordinates, camera);

  // ---- Check if ray intersects with the cube ----
  const intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;

    // Check if the clicked object is our named cube
    if (clickedObject.name === 'myCube') {
      console.log('My cube was clicked!');

      // Add three spheres around the cube
      addSpheresAroundObject(clickedObject);
    }
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
