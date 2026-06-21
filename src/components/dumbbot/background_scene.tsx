import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useState } from "react";

// let neck: THREE.Object3D<THREE.Object3DEventMap>;
// let waist: THREE.Object3D<THREE.Object3DEventMap>;

let poses: string[];

export function AnimatedDumbBot({ currentPose } : {currentPose: string}) {
  const { nodes, materials, animations } = useGLTF("/models/villager/villager.gltf");
  const { ref, actions, names } = useAnimations(animations);
  poses = names;

  useEffect(() => {
    const action = actions[currentPose];
    if (!action) return;

    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [currentPose, actions]);

  return (
    <group ref={ref} dispose={null}>
      <primitive object={nodes.Scene} />
    </group>
  );
}

useGLTF.preload("/models/villager/villager.gltf");

export function BackgroundScene() {
  const [pose, setPose] = useState('Pose_Idle');

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') {
        setPose(poses[0]);
      }

      if (event.key === '2') {
        setPose(poses[1]);
      }

      if (event.key === '3') {
        setPose(poses[2]);
      }

      if (event.key === '4') {
        setPose(poses[3]);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return (
    <Canvas className="absolute! z-2">
      <ambientLight intensity={1} />
      <AnimatedDumbBot currentPose={pose} />
    </Canvas>
    
  );
}


// function getMousePos(e: MouseEvent) {
//   return { x: e.clientX, y: e.clientY };
// }

// document.addEventListener("mousemove", function (e) {
//   const mousecoords = getMousePos(e);
//   if (neck && waist) {
//     moveJoint(mousecoords, neck, 50);
//     moveJoint(mousecoords, waist, 30);
//   }
// });

// function moveJoint(
//   mouse: { x: number; y: number },
//   joint: THREE.Object3D<THREE.Object3DEventMap>,
//   degreeLimit: number,
// ) {
//   const degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
//   joint.rotation.y = THREE.MathUtils.degToRad(degrees.x);
//   joint.rotation.x = THREE.MathUtils.degToRad(degrees.y);
// }

// function getMouseDegrees(x: number, y: number, degreeLimit: number) {
//   let dx = 0,
//     dy = 0,
//     xdiff,
//     xPercentage,
//     ydiff,
//     yPercentage;

//   const w = { x: window.innerWidth, y: window.innerHeight };

//   // Left (Rotates neck left between 0 and -degreeLimit)

//   // 1. If cursor is in the left half of screen
//   if (x <= w.x / 2) {
//     // 2. Get the difference between middle of screen and cursor position
//     xdiff = w.x / 2 - x;
//     // 3. Find the percentage of that difference (percentage toward edge of screen)
//     xPercentage = (xdiff / (w.x / 2)) * 100;
//     // 4. Convert that to a percentage of the maximum rotation we allow for the neck
//     dx = ((degreeLimit * xPercentage) / 100) * -1;
//   }
//   // Right (Rotates neck right between 0 and degreeLimit)
//   if (x >= w.x / 2) {
//     xdiff = x - w.x / 2;
//     xPercentage = (xdiff / (w.x / 2)) * 100;
//     dx = (degreeLimit * xPercentage) / 100;
//   }
//   // Up (Rotates neck up between 0 and -degreeLimit)
//   if (y <= w.y / 2) {
//     ydiff = w.y / 2 - y;
//     yPercentage = (ydiff / (w.y / 2)) * 100;
//     // Note that I cut degreeLimit in half when she looks up
//     dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
//   }

//   // Down (Rotates neck down between 0 and degreeLimit)
//   if (y >= w.y / 2) {
//     ydiff = y - w.y / 2;
//     yPercentage = (ydiff / (w.y / 2)) * 100;
//     dy = (degreeLimit * yPercentage) / 100;
//   }
//   return { x: dx, y: dy };
// }
