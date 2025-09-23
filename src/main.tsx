import { createRoot } from "react-dom/client";
import "./styles.css";
import { useEffect } from "react";

export function Setup() {
  const slogans = [
    "Now in HD!",
    "As seen on TV!",
    "Top 100 coders! (probably)",
  ];

  useEffect(() => {
    document.title =
      `Dorson Tang: ` + slogans[Math.floor(Math.random() * slogans.length)];
  }, []);

  return <></>;
}

createRoot(document.getElementById("root") as HTMLInputElement).render(
  <>
    {/* <div className="top-1/2 left-16 absolute">
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
    </Canvas> */}

    <Setup />

    <div className="snap-y snap-mandatory overflow-y-scroll h-screen ">
      <div className="snap-always snap-center">
        <div className={`relative min-h-screen flex `}>
          <div className="container max-w-screen-xl mx-auto flex justify-center items-center text-4xl text-white">
            Page 1
          </div>
        </div>
      </div>

      <div className="snap-always snap-center">
        <div className={`relative min-h-screen flex `}>
          <div className="container max-w-screen-xl mx-auto flex justify-center items-center text-4xl text-white">
            Page 2
          </div>
        </div>
      </div>
    </div>
  </>,
);
