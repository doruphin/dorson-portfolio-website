import { useEffect } from "react";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { useWindowStore, Window } from "./components/windows";
import "./styles.css";

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
    </>
  );
}
