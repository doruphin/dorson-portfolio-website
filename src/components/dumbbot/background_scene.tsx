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
  const [stage, setStage] = useState<"HIDDEN" | "MODEL_ONLY" | "STARTING" | "IDLE" | "INPUT" | "ANSWERING">("HIDDEN");
  const [pose, setPose] = useState('Pose_Idle');
  const [answer, setAnswer] = useState<{text: string}[]>([{text: ""}]);
  const [inputValue, setInputValue] = useState("");

  const { animations } = useGLTF("/models/villager/villager.gltf");
  const poses = useMemo(() => animations.map(a => a.name), [animations]);

  useEffect(() => {
    if (stage === "HIDDEN") {
      const timer = setTimeout(() => setStage("MODEL_ONLY"), 3000);
      return () => clearTimeout(timer);
    }
    if (stage === "MODEL_ONLY") {
      const timer = setTimeout(() => setStage("STARTING"), 700);
      return () => clearTimeout(timer);
    }
  }, [stage]);

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
      <div className="absolute bottom-[45px] right-[-165px] pointer-events-auto z-50">
        {["STARTING", "INPUT", "ANSWERING"].includes(stage) && (
          <div className="scale-[0.50] origin-bottom-right">
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
      <div 
        className={`w-[400px] h-[500px] pointer-events-auto relative bottom-[-33px] z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          stage === "HIDDEN" ? "translate-y-[110%] opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <Canvas camera={{ position: [0, 1.2, 6.0], fov: 55 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedDumbBot currentPose={pose} onClick={handleBotClick} />
        </Canvas>
      </div>
    </div>
  );
}
