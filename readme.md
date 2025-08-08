# Description
The purpose of this project was to make a visually appealing 3D animation that uses trigonometric functions.
It's a simple animation.
Click the link in the about section to go to the web page
Click the cube to see the animation in action


## How to trigger the trigonometric animation
Click the green cube to see the trigonometric animation

<img width="1132" height="942" alt="image" src="https://github.com/user-attachments/assets/3c9ffb98-bc27-4116-b8c5-68452eb135ac" />



## The Math behind the placement of the circles
How are the target positions of the circles calculated ?

It's quite simple actually. Its just trigonometric math
The (X,Y) positions of the circles are placed at angle relative to the center of the sphere group which is an empty 3d object.
The angle is calculated then it is used to calculate what the x and y positions will be.

#### Calculate the angle
2π radians is the total angle round a circle — It's the same as 360°.
I wanted to place the spheres evenly round the circle. so I divided the total angle around the circle into equal parts.
```js
const angle = (index / spherecount) * 2 * Math.PI 
```

#### Calculate target (X, Y) position using the angle
The reason these formula works is based on the understanding of the 
- Unit circle and 
- SOH/CAH/TOH
```js
const targetX = radius * Math.cos(angle);
const targetY = radius * Math.sin(angle);
const targetZ = centerPosition.z;
```

## The Animation
This code uses GSAP library for its animation. There are 3 animations at play
- Animation of the circles position from the center of the cube to their respective targeted (X,Y) positions based on the angle.
- Animation of the circles from 0 to 1.
- Animation of the sphere group's rotation.

Tip: Layering the animation of different properties is a simple but yet powerful way to achieve visually appealing motion.

## Other important problems tackled in this codebase
- How do you select a 3D object using a mouse ? It is not an HTML element. It's a ThreeJS object.
  - The Browser viewport and the 3D world rendered by WebGL unto the canvas exist in different spaces and use different coordinate system. 
  - As far as the mouse knows it only clicked the canvas.
- How do you architect the codebase to make sure its clean and scalable if necessary
