import "../styles.css";
import { useRef, useState, type ReactNode } from "react";
import { create } from "zustand";
import { useDraggable } from "@reactuses/core";
import useScreenDimensions from "../utlities/screen_utils";

interface DesktopWindowInterface {
  id: number;
  width: number;
  height: number;
  zIndex: number;
  title: string;
  iconPath: string;
  active: boolean;
  content: ReactNode;
}

interface WindowState {
  windows: DesktopWindowInterface[];
  addWindow: (
    title: string,
    iconPath: string,
    content: ReactNode,
    width?: number,
    height?: number,
  ) => void;
  deleteWindow: (id: number) => void;
  setActiveWindow: (id: number) => void;
  nextId: number;
  highestZ: number;
}

export const useWindowStore = create<WindowState>((set) => ({
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
    width: number = 600,
    height: number = 380,
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

  const [initialPos] = useState(() => ({
    x: window.innerWidth / 2.2,
    y: 120,
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

  return (
    <div
      ref={el}
      className="fixed touch-none border-1 bg-radial from-white/30 to-white/50 from-70% backdrop-blur-xs select-none rounded-sm shadow-lg shadow-black/70 flex flex-col border-white/70"
      onPointerDown={() => setActive(data.id)}
      style={{
        left: clampedX,
        top: clampedY,
        width: data.width,
        height: data.height,
        zIndex: data.zIndex,
      }}
    >
      <div ref={handle} className="hover:cursor-move">
        <div className="flex justify-end mx-1.5">
          <div
            onClick={() => deleteWindow(data.id)}
            className="flex items-center justify-center bg-linear-to-t from-red-500 from-50% to-100% to-red-300 w-12 h-4 rounded-b-sm text-white inset-shadow-xs inset-shadow-black hover:cursor-pointer hover:inset-shadow-sm"
          >
            <i className="bi bi-x leading-none" />
          </div>
        </div>
        <div className="h-4 mx-1.5 mt-3 flex justify-between">
          <div className="bg-secondary w-20 rounded-full inset-shadow-sm">
            {" "}
          </div>
          <div className="bg-secondary w-full mx-3 rounded-2xs inset-shadow-sm"></div>
          <div className="bg-secondary w-64 rounded-2xs inset-shadow-sm"></div>
        </div>
      </div>
      <div className="m-1.5 border-1 border-black/30 h-full bg-white">
        {data.content}
      </div>
    </div>
  );
}
