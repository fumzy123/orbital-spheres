import * as THREE from 'three';
import { gsap } from 'gsap';

// ============================================================================
// CONFIGURATION
// ============================================================================
const CONFIG = {
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
};

// Canvas
const getCanvas = () =>
  document.querySelector(CONFIG.canvas.selector);

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

// Create Camera
const camera = new THREE.PerspectiveCamera(
  75,
  CONFIG.canvas.width / CONFIG.canvas.height
);
camera.position.z = 2;
scene.add(camera);

// Create Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: getCanvas(),
});
renderer.setSize(CONFIG.canvas.width, CONFIG.canvas.height);

// Impure Functions
function createSphereRing(sphereCount, clickedObject, scene) {
  // Create a Group to hold sphere objects
  const sphereGroup = new THREE.Group();
  sphereGroup.position.copy(clickedObject.position);
  scene.add(sphereGroup);

  // Sphere array to hold sphere and angle
  const spheres = [];

  for (let i = 0; i < sphereCount; i++) {
    // Calculate the angle of the Sphere based on the index
    const angle = (i / sphereCount) * Math.PI * 2; // full circle

    // Create a Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );

    // Position all spheres at the center of the Group
    sphere.position.set(
      sphereGroup.position.x,
      sphereGroup.position.y,
      sphereGroup.position.z
    );

    // Add Sphere to group
    sphereGroup.add(sphere);

    // Add Sphere to the array along with its angle
    spheres.push({ sphere, angle });
  }

  return { sphereGroup, spheres };
}

function addSpheresAroundObject(
  clickedObject,
  radius = 1,
  sphereCount = 4
) {
  // Create Sphere ring
  const { sphereGroup, spheres } = createSphereRing(
    sphereCount,
    clickedObject,
    scene
  );

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

// Utility Functions
function calculateMousePosition(event, canvas) {
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

function getIntersectedObjects(raycaster, camera, mouse, objects) {
  // Set the raycaster from the camera to mouse position
  raycaster.setFromCamera(mouse, camera);

  // ---- Check if ray intersects with any objects in the scene ----
  return raycaster.intersectObjects(objects);
}

function findClickedObject(intersects) {
  return intersects.length > 0 ? intersects[0].object : null;
}

// Interactivity
function handleCanvasClicked(event) {
  // Get Mouse Position
  const mousePos = calculateMousePosition(event, getCanvas());

  // Cast ray from Camera to Mouse position and
  // Get all the Objects the ray intersected with
  const raycaster = new THREE.Raycaster();
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

getCanvas().addEventListener('click', (event) => {
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
