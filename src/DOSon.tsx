import { useEffect } from "react";
import { Desktop } from "./components/desktop";
import { Taskbar } from "./components/taskbar";
import { useWindowStore, Window } from "./components/windows";
import "./styles.css";
import Background from "./components/background";


export function DOSon() {


  useEffect(() => {
    const slogans = [
      "Now in HD!",
      "As seen on TV!",
      "Top 100 coders! (probably)",
      "Vista",
    ];
    document.title =
      `DOSon: ` + slogans[Math.floor(Math.random() * slogans.length)];
  }, []);

  const windows = useWindowStore((state) => state.windows);
  const theme = useWindowStore((state) => state.theme);
  const setTheme = useWindowStore((state) => state.setTheme);

  const cycleTheme = () => {
    if (theme === 'vista') setTheme('xp');
    else if (theme === 'xp') setTheme('win98');
    else setTheme('vista');
  };

  return (
    <div className={`theme-${theme} h-screen w-full overflow-hidden`}>
      <div className="absolute top-4 right-4 z-[9999] hidden md:block">
        <button
          onClick={cycleTheme}
          className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full shadow-lg backdrop-blur-md border border-white/50 transition cursor-pointer flex items-center justify-center w-10 h-10 group"
          title="Switch Theme"
        >
          <i className="bi bi-arrow-repeat text-2xl leading-none group-hover:rotate-180 transition-transform duration-300"></i>
        </button>
      </div>
      <div className="bg-red-500 md:hidden">
        WARNING: This website isn't fully optimized for mobile/smaller screens
        yet. You should still be able to explore though.
      </div>
      {/* <BackgroundScene/> */}
      {windows.map((windowData) => (
        <Window key={windowData.id} data={windowData} />
      ))}
      <Desktop />
      <Taskbar />
      <div className="h-screen fixed inset-0 -z-10 bg-black">
        {theme === 'vista' && <Background waveSpeed={0.005} />}
        {theme === 'xp' && (
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("images/desktop_bg_xp.jpg")' }} />
        )}
        {theme === 'win98' && (
          <div className="w-full h-full bg-[#008080] bg-center bg-no-repeat" style={{ backgroundImage: 'url("images/desktop_bg_98.png")' }} />
        )}
      </div>
    </div>
  );
}
