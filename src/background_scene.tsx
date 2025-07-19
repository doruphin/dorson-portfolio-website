import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "./styles.css";

let neck: THREE.Object3D<THREE.Object3DEventMap>;
let waist: THREE.Object3D<THREE.Object3DEventMap>;

export function BackgroundScene() {
  const avatar = useLoader(GLTFLoader, "/models/avatar.glb");
  avatar.scene.traverse((o) => {
    console.log(o.name);
    if (o.name === "Neck") {
      neck = o;
    }
    if (o.name === "Body") {
      waist = o;
    }
    if (o.name === "BicepR") {
      o.rotation.z = 0.5;
    }
    if (o.name === "BicepL") {
      o.rotation.z = -0.5;
    }
  });
  return (
    <primitive
      object={avatar.scene}
      scale={1.5}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function getMousePos(e: any) {
  return { x: e.clientX, y: e.clientY };
}

document.addEventListener("mousemove", function (e) {
  var mousecoords = getMousePos(e);
  if (neck && waist) {
    moveJoint(mousecoords, neck, 50);
    moveJoint(mousecoords, waist, 30);
  }
});

function moveJoint(mouse: any, joint: any, degreeLimit: any) {
  let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
  joint.rotation.y = THREE.MathUtils.degToRad(degrees.x);
  joint.rotation.x = THREE.MathUtils.degToRad(degrees.y);
}

function getMouseDegrees(x: any, y: any, degreeLimit: any) {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)

  // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimit * xPercentage) / 100) * -1;
  }
  // Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    // Note that I cut degreeLimit in half when she looks up
    dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
  }

  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}
