import { createRoot } from "react-dom/client";
import "./styles.css";
import { useEffect, type ReactNode } from "react";
import { Projects } from "./components/projects";
// import { Canvas } from "@react-three/fiber";
import { Contact } from "./components/contact";
import { Overview } from "./components/overview";
import { Work } from "./components/work";
import clsx from "clsx";

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

export const SnapSection: React.FC<{
  children: ReactNode;
  className?: string | undefined;
}> = ({ children, className }) => {
  return (
    <div className="snap-always snap-center bg-primary">
      <div className={`relative min-h-screen flex `}>
        <div
          className={clsx(
            className,
            "container max-w-screen-xl mx-auto flex flex-col justify-center items-center text-4xl text-lighter p-8 ",
          )}
        >
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
*/}
    <Setup />
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen no-scrollbar">
      <SnapSection>
        <Overview />
      </SnapSection>

      <SnapSection>
        <Work />
      </SnapSection>

      <SnapSection>
        <Projects />
      </SnapSection>

      <SnapSection>
        <div>
          Creativity individual windows for each one with my labeling and
          desctiptions all over it
        </div>
        <ul>
          <li>youtube front page</li>
          <li>3d printing/ modeeling blender donut</li>
          <li>cosplay? </li>
        </ul>
      </SnapSection>

      <SnapSection>
        <Contact />
      </SnapSection>
    </div>
    */
  </>,
);
