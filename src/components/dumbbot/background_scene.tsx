import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useState, useMemo } from "react";
import { DialogueBox } from "./dialogue_box";
import startingDialogue from "./starting_dialogue.json";
import eightBallDialogue from "./8ball_dialogue.json";

export function AnimatedDumbBot({ currentPose, onClick } : {currentPose: string, onClick?: () => void}) {
  const { nodes, animations } = useGLTF("/models/villager/villager.gltf");
  const { ref, actions } = useAnimations(animations);

  useEffect(() => {
    const action = actions[currentPose];
    if (!action) return;
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [currentPose, actions]);

  return (
    <group 
      ref={ref} 
      dispose={null} 
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }} 
      onPointerOver={(e) => { document.body.style.cursor = 'pointer'; e.stopPropagation(); }} 
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      <primitive object={nodes.Scene} />
    </group>
  );
}

useGLTF.preload("/models/villager/villager.gltf");

export function BackgroundScene() {
  const [stage, setStage] = useState<"STARTING" | "IDLE" | "INPUT" | "ANSWERING">("STARTING");
  const [pose, setPose] = useState('Pose_Idle');
  const [answer, setAnswer] = useState<{text: string}[]>([{text: ""}]);
  const [inputValue, setInputValue] = useState("");

  const { animations } = useGLTF("/models/villager/villager.gltf");
  const poses = useMemo(() => animations.map(a => a.name), [animations]);

  const handleBotClick = () => {
    if (stage === "IDLE") {
      setStage("INPUT");
    }
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const randomAnswer = eightBallDialogue[Math.floor(Math.random() * eightBallDialogue.length)];
      setAnswer([randomAnswer]);
      
      cycleRandomPose();
      setStage("ANSWERING");
      setInputValue("");
    }
  };

  const cycleRandomPose = () => {
    if (poses.length > 0) {
      const randomPose = poses[Math.floor(Math.random() * poses.length)];
      setPose(randomPose);
    }
  };

  return (
    <div className="fixed bottom-6 right-12 z-[4900] flex items-end pointer-events-none">
      {/* Dialogue / Input Overlay */}
      <div className="absolute bottom-[10px] right-[50px] pointer-events-auto z-50">
        {stage !== "IDLE" && (
          <div className="scale-[0.35] origin-bottom-right">
            <DialogueBox 
              dialogue={stage === "STARTING" ? startingDialogue : stage === "INPUT" ? [{text: "Ask me a yes or no question!"}] : answer} 
              isInput={stage === "INPUT"}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onInputSubmit={handleInputSubmit}
              onComplete={() => setStage("IDLE")}
              onDialogChange={cycleRandomPose}
            />
          </div>
        )}
      </div>

      {/* Bot Canvas */}
      <div className="w-[300px] h-[400px] pointer-events-auto relative z-10">
        <Canvas camera={{ position: [0, 2, 6.5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedDumbBot currentPose={pose} onClick={handleBotClick} />
        </Canvas>
      </div>
    </div>
  );
}
