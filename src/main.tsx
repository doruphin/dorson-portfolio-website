import { createRoot } from "react-dom/client";
import "./styles.css";
import { useEffect } from "react";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { useWindowStore, Window } from "./components/windows";

export function DOSon() {
  const slogans = [
    "Now in HD!",
    "As seen on TV!",
    "Top 100 coders! (probably)",
    "Vista",
  ];

  useEffect(() => {
    document.title =
      `Dorson Tang: ` + slogans[Math.floor(Math.random() * slogans.length)];
  }, []);

  const windows = useWindowStore((state) => state.windows);

  return (
    <>
      {windows.map((windowData) => (
        <Window key={windowData.id} data={windowData} />
      ))}
      <Desktop />
      <Taskbar />
      {/* <div className="w-full h-screen relative">
        <Background
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.05}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.001}
        />
      </div> */}
    </>
  );
}

createRoot(document.getElementById("root") as HTMLInputElement).render(
  <DOSon />,
);
