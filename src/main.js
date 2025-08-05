import { CONFIG } from './config/app.config';
import { createScene } from './core/scene';
import { createCamera } from './core/camera';
import { createRenderer, loopRenderer } from './core/renderer';
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

function init() {
  // Create Core components
  const scene = createScene();
  const camera = createCamera();
  const canvas = document.querySelector(CONFIG.canvas.selector);
  const renderer = createRenderer(canvas);

  // Create a Cube Mesh
  const cubeMesh = createCube();

  // Add Objects to the Scene
  scene.add(cubeMesh);
  scene.add(camera);

  // Setup interaction
  const raycaster = createRaycaster();

  //
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

  // Handle Event clicked
  const handleCanvasClicked = (event) => {
    // Get Mouse Position
    const mousePos = calculateMousePosition(event, canvas);

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
  };

  canvas.addEventListener('click', handleCanvasClicked);

  // Start Animation Loop
  const animate = loopRenderer(renderer, scene, camera);
  animate();
}

init();
