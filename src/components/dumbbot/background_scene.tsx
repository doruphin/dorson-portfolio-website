import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, useTexture } from '@react-three/drei';
import { useEffect, useState, useMemo, useCallback } from "react";
import * as THREE from "three";
import { DialogueBox } from "./dialogue_box";
import startingDialogue from "./starting_dialogue.json";
import eightBallDialogue from "./8ball_dialogue.json";

export function AnimatedDumbBot({ currentPose, isTalking, onClick } : {currentPose: string, isTalking?: boolean, onClick?: () => void}) {
  const { nodes, materials, animations } = useGLTF("/models/villager/villager.gltf");
  const { ref, actions } = useAnimations(animations);
  
  const faceTalkTexture = useTexture("/models/villager/face_talk.png");
  
  useEffect(() => {
    faceTalkTexture.flipY = false;
    faceTalkTexture.colorSpace = THREE.SRGBColorSpace;
    faceTalkTexture.needsUpdate = true;
  }, [faceTalkTexture]);

  useEffect(() => {
    const faceMaterial = (materials as any).face;
    if (faceMaterial) {
      if (!faceMaterial.userData.originalMap) {
        faceMaterial.userData.originalMap = faceMaterial.map;
      }
      faceMaterial.map = isTalking ? faceTalkTexture : faceMaterial.userData.originalMap;
      faceMaterial.needsUpdate = true;
    }
  }, [isTalking, materials, faceTalkTexture]);

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

const INPUT_DIALOGUE = [{text: "Ask me a yes or no question!"}];

export function BackgroundScene() {
  const [isClosed, setIsClosed] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [stage, setStage] = useState<"HIDDEN" | "MODEL_ONLY" | "STARTING" | "IDLE" | "INPUT" | "ANSWERING">("HIDDEN");
  const [pose, setPose] = useState('IdleStill');
  const [answer, setAnswer] = useState<{text: string}[]>([{text: ""}]);
  const [inputValue, setInputValue] = useState("");
  const [isMouthOpen, setIsMouthOpen] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => setShowClose(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = useCallback(() => setStage("IDLE"), []);

  const handleBotClick = () => {
    if (stage === "IDLE") {
      setStage("INPUT");
    }
  };

  const closeBot = () => {
    setStage("HIDDEN");
    setIsClosed(true);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const randomAnswer = eightBallDialogue[Math.floor(Math.random() * eightBallDialogue.length)];
      setAnswer([randomAnswer]);
      
      cycleNextPose();
      setStage("ANSWERING");
      setInputValue("");
    }
  };

  const cycleNextPose = useCallback(() => {
    if (poses.length > 0) {
      setPose(currentPose => {
        const currentIndex = poses.indexOf(currentPose);
        const nextIndex = (currentIndex + 1) % poses.length;
        return poses[nextIndex];
      });
    }
  }, [poses]);

  if (isClosed) return null;

  return (
    <div className="fixed bottom-6 right-12 z-0 flex items-end pointer-events-none hidden xl:block">
      {/* Dialogue / Input Overlay */}
      <div className="absolute bottom-[45px] right-[-165px] pointer-events-auto z-50">
        {["STARTING", "INPUT", "ANSWERING"].includes(stage) && (
          <div className="scale-[0.50] origin-bottom-right">
            <DialogueBox 
              dialogue={stage === "STARTING" ? startingDialogue : stage === "INPUT" ? INPUT_DIALOGUE : answer} 
              isInput={stage === "INPUT"}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onInputSubmit={handleInputSubmit}
              onComplete={handleComplete}
              onDialogChange={cycleNextPose}
              onMouthToggle={setIsMouthOpen}
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
        <button 
          onClick={closeBot}
          className={`absolute top-3 right-[-25px] text-black! rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 z-[60] border-white/30 backdrop-blur-sm cursor-pointer transition-all duration-1000 ease-in-out ${
            showClose ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          title="Dismiss DumbBot"
        >
          <i className="bi bi-x text-xl leading-none font-bold" />
        </button>

        <Canvas camera={{ position: [0, 1.2, 6.0], fov: 55 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedDumbBot 
            currentPose={pose} 
            isTalking={isMouthOpen} 
            onClick={handleBotClick} 
          />
        </Canvas>
      </div>
    </div>
  );
}
