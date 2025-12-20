import { useWindowStore } from "./windows";

export function Taskbar() {
  const date = new Date();
  const windows = useWindowStore((state) => state.windows);
  const setActiveWindows = useWindowStore((state) => state.setActiveWindow);

  return (
    <div className="w-full h-11 bg-linear-to-t from-white/0 via-30% via-white/0 to-white/70 absolute bottom-0 z-5000 px-2 items-center flex">
      <img src="images/favicon.ico" className="h-10" />
      <ul className="flex w-full mx-3 space-x-3 truncate  h-full select-none">
        {windows.map((window) => (
          <li
            key={window.id}
            onClick={() => setActiveWindows(window.id)}
            className={`flex inset-shadow-black/70 items-center bg-linear-to-t from-white/0 via-30% via-white/0 to-white/70  m-0.5 pr-3 rounded-sm hover:inset-shadow-xs border-1 border-black/10 ${window.active ? "inset-shadow-xs" : "cursor-pointer"}`}
          >
            <img src={window.iconPath} className="w-11 h-9 object-contain" />
            <p>{window.title}</p>
          </li>
        ))}
      </ul>
      {date.toLocaleDateString()}
    </div>
  );
}
