import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import { DialogueBox } from "./dialogue_box";
import { BackgroundScene } from "./background_scene";
import dialogue from "./dialogue.json";

createRoot(document.getElementById("root") as HTMLInputElement).render(
  <>
    <div className="top-1/2 left-16 absolute">
      <DialogueBox dialogue={dialogue} />
    </div>

    <Canvas className="bg-black fixed h-[100vh]">
      <ambientLight intensity={3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <BackgroundScene />
    </Canvas>
  </>,
);
