import { useEffect } from "react";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { useWindowStore, Window } from "./components/windows";
import "./styles.css";
import Background from "./components/background";

export function DOSon() {
  const slogans = [
    "Now in HD!",
    "As seen on TV!",
    "Top 100 coders! (probably)",
    "Vista",
  ];

  useEffect(() => {
    document.title =
      `DOSon: ` + slogans[Math.floor(Math.random() * slogans.length)];
  }, []);

  const windows = useWindowStore((state) => state.windows);

  return (
    <>
      <div className="bg-red-500 sm:hidden">
        WARNING: This website isn't fully optimized for mobile/smaller screens
        yet. You should still be able to explore though.
      </div>
      {windows.map((windowData) => (
        <Window key={windowData.id} data={windowData} />
      ))}
      <Desktop />
      <Taskbar />
      <div className="h-screen">
        <Background waveSpeed={0.005} />
      </div>
    </>
  );
}
