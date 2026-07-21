/* eslint-disable react-refresh/only-export-components */
import { useRef, useState, type ReactNode } from "react";
import { create } from "zustand";
import { useDraggable } from "@reactuses/core";
import useScreenDimensions from "../utlities/screen_utils";

export function getThemeIcon(path: string, theme: string) {
  if (path.includes("folder.ico") || path.includes("folder_")) {
    return theme === 'xp' ? "images/folder_xp.ico" : theme === 'win98' ? "images/folder_98.ico" : "images/folder_vista.ico";
  }
  if (path.includes("contact.ico") || path.includes("contact_")) {
    return theme === 'xp' ? "images/contact_xp.ico" : theme === 'win98' ? "images/contact_98.ico" : "images/contact_vista.ico";
  }
  return path;
}

interface DesktopWindowInterface {
  id: number;
  width: number;
  height: number;
  zIndex: number;
  title: string;
  iconPath: string;
  active: boolean;
  content: ReactNode;
  startPos: { x: number; y: number };
  folder: boolean;
}

type Theme = 'vista' | 'win98' | 'xp';

interface WindowState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  windows: DesktopWindowInterface[];
  addWindow: (
    title: string,
    iconPath: string,
    content: ReactNode,
    folder: boolean,
    width?: number,
    height?: number,
    startPos?: { x: number; y: number },
  ) => void;
  deleteWindow: (id: number) => void;
  setActiveWindow: (id: number) => void;
  nextId: number;
  highestZ: number;
}

export const useWindowStore = create<WindowState>((set) => ({
  theme: 'win98',
  setTheme: (theme) => set({ theme }),
  windows: [],
  nextId: 1,
  highestZ: 1,

  setActiveWindow: (activeId) =>
    set((state) => {
      return {
        windows: state.windows.map((window) => {
          if (window.id === activeId) {
            return { ...window, zIndex: state.highestZ + 1, active: true };
          }
          return { ...window, active: false };
        }),
        highestZ: state.highestZ + 1,
      };
    }),

  deleteWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    })),

  addWindow: (
    title: string,
    iconPath: string,
    content: ReactNode,
    folder: boolean,
    width: number = 600,
    height: number = 380,
    startPos?: { x: number; y: number },
  ) =>
    set((state) => {
      const existingWindow = state.windows.find(
        (window) => title === window.title,
      );
      if (existingWindow) {
        return {
          windows: state.windows.map((window) => {
            if (window.id === existingWindow.id) {
              return { ...window, zIndex: state.highestZ + 1, active: true };
            }
            return { ...window, active: false };
          }),
          highestZ: state.highestZ + 1,
        };
      }

      const newWindow: DesktopWindowInterface = {
        id: state.nextId,
        width: width,
        height: height,
        zIndex: state.highestZ,
        title,
        iconPath,
        active: false,
        content,
        startPos: startPos || {
          x: window.innerWidth / 2 - width / 2 + state.windows.length * 25,
          y: window.innerHeight / 2 - height / 2 + state.windows.length * 25,
        },
        folder: folder,
      };

      return {
        windows: [...state.windows, newWindow].map((window) => {
          if (window.id === newWindow.id) {
            return { ...window, zIndex: state.highestZ + 1, active: true };
          }
          return { ...window, active: false };
        }),
        highestZ: state.highestZ + 1,
        nextId: state.nextId + 1,
      };
    }),
}));

export function Window({ data }: { data: DesktopWindowInterface }) {
  const { screenHeight, screenWidth } = useScreenDimensions();

  const el = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);

  const setActive = useWindowStore((state) => state.setActiveWindow);
  const deleteWindow = useWindowStore((state) => state.deleteWindow);
  const theme = useWindowStore((state) => state.theme);

  const [initialPos] = useState(() => ({
    x: data.startPos.x,
    y: data.startPos.y,
  }));

  const [x, y] = useDraggable(el, {
    initialValue: initialPos,
    preventDefault: true,
    handle: handle as React.RefObject<HTMLDivElement>,
    onEnd: (pos) => {
      pos.y = Math.min(
        Math.max(0, pos.y),
        screenHeight - (56 + data.height / 2),
      );
      pos.x = Math.min(
        Math.max(-data.width / 2, pos.x),
        screenWidth - data.width / 2,
      );
    },
  });

  const clampedX = Math.min(
    Math.max(-data.width / 2, x),
    screenWidth - data.width / 2,
  );
  const clampedY = Math.min(
    Math.max(0, y),
    screenHeight - (56 + data.height / 2),
  );

  const isVista = theme === 'vista';
  const isXp = theme === 'xp';

  return (
    <div
      ref={el}
      className={`fixed touch-none select-none flex flex-col ${
        isVista ? "border-1 bg-radial from-white/30 to-white/50 from-70% backdrop-blur-xs rounded-sm shadow-lg shadow-black/70 border-white/70" :
        isXp ? "bg-[#ece9d8] border border-[#0055ea] rounded-t-lg rounded-b-sm shadow-xl flex flex-col overflow-hidden" :
        "bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-[2px] shadow-sm"
      }`}
      onPointerDown={() => setActive(data.id)}
      style={{
        left: clampedX,
        top: clampedY,
        width: data.width,
        height: data.height,
        zIndex: data.zIndex,
      }}
    >
      <div ref={handle} className={`hover:cursor-move ${
        isVista ? "" : 
        isXp ? "bg-linear-to-b from-[#0058e6] to-[#003edd] text-white flex justify-between items-center px-2 py-1 h-[30px]" :
        "bg-[#000080] text-white flex justify-between items-center px-1 mb-[2px] h-[22px] overflow-hidden"
      }`}>
        {isVista ? (
          <>
            <h1 className={`absolute pl-2 text-sm text-black! ${data.folder ? 'pt-1' : 'pt-0.5'}`}>
               {data.title}
            </h1>
            <div className="flex justify-end mx-1.5">
              <div
                onClick={() => deleteWindow(data.id)}
                className="flex items-center justify-center bg-linear-to-t from-red-500 from-50% to-100% to-red-300 w-12 h-4 rounded-b-sm text-white inset-shadow-xs inset-shadow-black hover:cursor-pointer hover:inset-shadow-sm"
              >
                <i className="bi bi-x leading-none" />
              </div>
            </div>
          </>
        ) : isXp ? (
          <>
            <h1 className="text-sm font-bold font-sans tracking-wide truncate pr-2 text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
               {data.title}
            </h1>
            <div
              onClick={() => deleteWindow(data.id)}
              className="flex items-center justify-center bg-linear-to-b from-[#e76338] to-[#c73e10] border border-white/50 rounded-sm text-white w-5 h-5 hover:cursor-pointer hover:brightness-110 shrink-0 shadow-sm"
            >
              <i className="bi bi-x text-[18px] leading-[0] font-bold" />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xs font-bold font-sans tracking-wide truncate pr-2">
               {data.title}
            </h1>
            <div
              onClick={() => deleteWindow(data.id)}
              className="flex items-center justify-center bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 w-4 h-4 hover:cursor-pointer hover:active:border-t-gray-800 hover:active:border-l-gray-800 hover:active:border-b-white hover:active:border-r-white shrink-0"
            >
              <i className="bi bi-x text-[16px] leading-[0] font-bold" />
            </div>
          </>
        )}
        
        {isVista && data.folder && (
          <div className="h-4 mx-1.5 mt-3 flex justify-between">
            <div className="bg-secondary w-20 rounded-full inset-shadow-sm" />
            <div className="bg-secondary w-full mx-3 rounded-2xs inset-shadow-sm" />
            <div className="bg-secondary w-64 rounded-2xs inset-shadow-sm" />
          </div>
        )}
      </div>

      {!isVista && data.folder && (
        <div className={`flex gap-2 px-2 py-0.5 text-xs text-black border-b border-gray-400 ${isXp ? "bg-[#ece9d8]" : "bg-[#c0c0c0]"}`}>
          <span className={`px-1 cursor-pointer text-black! ${isXp ? "hover:bg-[#316ac5] hover:text-white" : "hover:bg-[#000080] hover:text-white"}`}>File</span>
          <span className={`px-1 cursor-pointer text-black! ${isXp ? "hover:bg-[#316ac5] hover:text-white" : "hover:bg-[#000080] hover:text-white"}`}>Edit</span>
          <span className={`px-1 cursor-pointer text-black! ${isXp ? "hover:bg-[#316ac5] hover:text-white" : "hover:bg-[#000080] hover:text-white"}`}>View</span>
          <span className={`px-1 cursor-pointer text-black! ${isXp ? "hover:bg-[#316ac5] hover:text-white" : "hover:bg-[#000080] hover:text-white"}`}>Help</span>
        </div>
      )}

      <div className={`h-full bg-white overflow-hidden flex flex-col ${
        isVista ? "m-1.5 border-1 border-black/30" : 
        isXp ? "border border-[#7f9db9] mx-0 mb-0 mt-0" :
        "border-2 border-t-gray-800 border-l-gray-800 border-b-white border-r-white mx-[2px] mb-[2px] mt-0"
      }`}>
        {data.content}
      </div>
    </div>
  );
}
