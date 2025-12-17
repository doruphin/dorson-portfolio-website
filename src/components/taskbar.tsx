import { useEffect } from "react";
import { useWindowStore } from "./windows";

export function Taskbar() {
  const date = new Date();
  const windows = useWindowStore((state) => state.windows);
  const setActiveWindows = useWindowStore((state) => state.setActiveWindow);

  const addWindows = useWindowStore((state) => state.addWindow);

  useEffect(() => {
    addWindows("buhnana");
    addWindows("2buhnana");
    addWindows("3buhnana");
  }, []);

  return (
    <div className="w-full h-14 bg-blue-600 absolute bottom-0 z-50 px-2 items-center flex justify-between">
      <img src="images/favicon.ico" className="h-10" />
      <ul className="flex">
        {windows.map((window) => (
          <li key={window.id} onClick={() => setActiveWindows(window.id)}>
            {window.title}
          </li>
        ))}
      </ul>
      {date.toLocaleDateString()}
    </div>
  );
}
