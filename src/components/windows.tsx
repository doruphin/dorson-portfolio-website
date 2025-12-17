import "../styles.css";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { useDraggable } from "@reactuses/core";
import useScreenDimensions from "../screen";

interface Window {
  id: number;
  width: number;
  height: number;
  zIndex: number;
  title: string;
}

interface WindowState {
  windows: Window[];
  addWindow: (title: string) => void;
  deleteWindow: (id: number) => void;
  setActiveWindow: (id: number) => void;
  nextId: number;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  nextId: 1,

  setActiveWindow: (activeId) =>
    set((state) => {
      const maxZIndex =
        state.windows.length > 0
          ? Math.max(...state.windows.map((w) => w.zIndex))
          : 0;

      return {
        windows: state.windows.map((window) => {
          if (window.id === activeId) {
            return { ...window, zIndex: maxZIndex + 1 };
          }
          return window;
        }),
      };
    }),

  deleteWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    })),

  addWindow: (title: string, width: number = 384, height: number = 288) =>
    set((state) => {
      const newWindow: Window = {
        id: state.nextId,
        width: width,
        height: height,
        zIndex: 10,
        title,
      };

      return {
        windows: [...state.windows, newWindow],
        nextId: state.nextId + 1,
      };
    }),
}));

export function Window({ data }: { data: Window }) {
  const { screenHeight, screenWidth } = useScreenDimensions();

  const el = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);

  const [initialPos, setInitialPos] = useState({ x: 200 / 2.2, y: 120 });

  const setActive = useWindowStore((state) => state.setActiveWindow);
  const deleteWindow = useWindowStore((state) => state.deleteWindow);

  useEffect(() => {
    setInitialPos({ x: window.innerWidth / 2.2, y: 120 });
  }, []);

  const [x, y] = useDraggable(el, {
    initialValue: initialPos,
    preventDefault: true,
    //@ts-expect-error
    handle: handle,
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

  return (
    <div
      ref={el}
      className="fixed touch-none border-1 bg-white select-none"
      onClick={(_) => setActive(data.id)}
      style={{
        left: x,
        top: y,
        width: data.width,
        height: data.height,
        zIndex: data.zIndex,
      }}
    >
      <div ref={handle} className="border-b-1 flex justify-between">
        {data.title}
        <div onClick={(_) => deleteWindow(data.id)}>x</div>
      </div>
      <div>
        I am at {Math.round(x)}, {Math.round(y)}
      </div>
    </div>
  );
}
