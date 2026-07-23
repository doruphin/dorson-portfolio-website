import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Grid } from "@react-three/drei";

export default function BlenderScene() {
  const [index, setIndex] = useState(0);

  const nextModel = () => setIndex((prev) => (prev + 1) % MODELS.length);
  const prevModel = () => {
    setIndex((prev) => (prev - 1 + MODELS.length) % MODELS.length);
  };

  const MODELS = [{ path: "/models/violence mask.glb" }, { path: "/models/ranger mask.glb" }];

  function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    return (
      <primitive object={scene} position={[0, 0, 0]} rotation={[0, 4, 0]} />
    );
  }

  return (
    <div
      style={{
        background: "#151515",
        height: "100%",
        position: "relative",
      }}
    >
      {/* 1. UI OVERLAY (Arrows) */}
      <div className="absolute top-1/2 w-full z-10 flex justify-between px-8 text-3xl!">
        <i
          className="bi bi-arrow-left-short hover:cursor-pointer"
          onClick={prevModel}
        />
        <i
          className="bi bi-arrow-right-short hover:cursor-pointer"
          onClick={nextModel}
        />
      </div>

      {/* 2. THREE.JS CANVAS */}
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <color attach="background" args={["#151515"]} />

        <Grid
          infiniteGrid
          fadeDistance={50}
          sectionSize={1.5}
          sectionColor="#333"
          cellColor="#222"
        />

        <Suspense fallback={null}>
          {/* Stage will re-center and re-size whenever the model path changes */}
          <Stage environment="city" intensity={0.5}>
            <Model path={MODELS[index].path} />
          </Stage>
        </Suspense>

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
