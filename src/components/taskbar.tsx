import { useWindowStore, getThemeIcon } from "./windows";

export function Taskbar() {
  const date = new Date();
  const windows = useWindowStore((state) => state.windows);
  const setActiveWindows = useWindowStore((state) => state.setActiveWindow);
  const theme = useWindowStore((state) => state.theme);

  const isVista = theme === 'vista';
  const isXp = theme === 'xp';
  const is98 = theme === 'win98';

  return (
    <div 
      className={`w-full absolute bottom-0 z-[5000] px-2 items-center flex ${
        isVista 
          ? "h-11 bg-linear-to-t from-white/0 via-30% via-white/0 to-white/70 text-white" 
          : isXp
          ? "h-10 bg-linear-to-b from-[#245edb] via-[#3f8cf3] to-[#245edb] text-white shadow-[0_-1px_3px_rgba(0,0,0,0.5)]"
          : "h-10 bg-[#c0c0c0] border-t-2 border-white shadow-[0_-1px_0_gray] text-black select-none"
      }`}
    >
      <div className={`flex items-center cursor-pointer ${isXp ? "bg-linear-to-b from-[#419441] to-[#2b712b] px-3 py-1 -ml-2 rounded-r-lg shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)] hover:brightness-110" : ""}`}>
        <img src="images/favicon.ico" className={`${isXp ? "h-6 mr-1" : "h-8"}`} alt="Start" />
        {isXp && <span className="font-bold text-lg italic text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] pr-1">Start</span>}
      </div>
      
      <ul className="flex w-full mx-3 space-x-1 sm:space-x-2 truncate h-full items-center select-none">
        {windows.map((window) => (
          <li
            key={window.id}
            onClick={() => setActiveWindows(window.id)}
            className={`flex items-center min-w-[80px] max-w-[150px] truncate h-8 transition-colors ${
              isVista
                ? `bg-linear-to-t from-white/0 via-30% via-white/0 to-white/70 m-0.5 pr-3 rounded-sm hover:inset-shadow-xs border-1 border-black/10 inset-shadow-black/70 ${window.active ? "inset-shadow-xs" : "cursor-pointer"}`
                : isXp
                ? `px-2 rounded-sm cursor-pointer shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] ${
                    window.active
                      ? "bg-linear-to-b from-[#1b439e] to-[#122f77] text-white"
                      : "bg-linear-to-b from-[#3b7bed] to-[#245edb] text-white hover:brightness-110"
                  }`
                : `px-1 bg-[#c0c0c0] border-2 cursor-pointer ${
                    window.active 
                      ? "border-t-gray-800 border-l-gray-800 border-b-white border-r-white bg-[#e0e0e0]" 
                      : "border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-[#d0d0d0]"
                  }`
            }`}
          >
            <img src={getThemeIcon(window.iconPath, theme)} className={`object-contain ${isVista ? "w-11 h-9" : "w-5 h-5 mr-1.5"}`} />
            <p className={`truncate text-sm ${isVista ? "[paint-order:stroke_fill] [-webkit-text-stroke:2px_black]" : "font-sans font-bold"} ${is98 && "text-black!"}`}>
              {window.title}
            </p>
          </li>
        ))}
      </ul>

      <div className={`flex items-center space-x-2 shrink-0 ${
        isVista ? "" : 
        isXp ? "bg-linear-to-b from-[#0f86d8] to-[#0c59b3] border-l border-[#1366c4] px-3 h-full shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)] -mr-2 text-white" :
        "border-2 border-t-gray-800 border-l-gray-800 border-b-white border-r-white px-2 py-0.5 h-8 bg-[#c0c0c0]"
      }`}>
        <span className={`text-xs ${isVista ? "[paint-order:stroke_fill] [-webkit-text-stroke:2px_black]" : "font-sans"} ${is98 && "text-black!"}`}>
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
