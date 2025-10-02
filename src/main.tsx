import { createRoot } from "react-dom/client";
import "./styles.css";
import { useEffect, type ReactNode } from "react";
import { Projects } from "./projects";

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

export const SnapSection: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="snap-always snap-center bg-black">
      <div className={`relative min-h-screen flex `}>
        <div className="container max-w-screen-xl mx-auto flex flex-col justify-center items-center text-4xl text-lighter p-8 ">
          {children}
        </div>
      </div>
    </div>
  );
};

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
      <SnapSection>
        <img
          src="/images/favicon.ico"
          className="w-32 border-2 rounded-full p-2 mb-8"
        />
        <div className="mb-8 bg-yellow-200 w-full flex justify-center text-black">
          UNDER CONSTRUCTION
        </div>
        <div>introduction</div>
        <img src="images/construction.gif" alt="lol" className="mb-8" />
        <div className="w-2/3 h-1/2 border-2 rounded-2xl p-8">
          <div>This is gonna be a really cool website, i promise</div>
        </div>
      </SnapSection>

      <SnapSection>Work Experience</SnapSection>

      <SnapSection>
        <Projects />
      </SnapSection>

      <SnapSection>
        <div>Creativity</div>
        <ul>
          <li>youtube</li>
          <li>3d printing</li>
          {/* <li>cosplay?</li> */}
        </ul>
      </SnapSection>

      <SnapSection>Contact</SnapSection>
    </div>
  </>,
);
