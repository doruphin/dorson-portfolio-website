import { useEffect, type ReactNode } from "react";
import { useWindowStore } from "./windows";

interface DesktopIcon {
  title: string;
  iconPath: string;
  content: ReactNode;
}

const folderContentsStyles = "grid grid-cols-7 py-2";

const projectIcons: DesktopIcon[] = [
  {
    title: "FretNot",
    iconPath: "images/fretnot.ico",
    content: "sigma",
  },
];

const desktopFolders: DesktopIcon[] = [
  {
    title: "Projects",
    iconPath: "images/folder.ico",
    content: (
      <div className={folderContentsStyles}>
        <GridLayout icons={projectIcons} />
      </div>
    ),
  },
  {
    title: "Hobbies",
    iconPath: "images/folder.ico",
    content: (
      <div className={folderContentsStyles}>
        <GridLayout icons={undefined} />
      </div>
    ),
  },
  {
    title: "Experience",
    iconPath: "images/folder.ico",
    content: (
      <div className={folderContentsStyles}>
        <GridLayout icons={undefined} />
      </div>
    ),
  },
  {
    title: "Education",
    iconPath: "images/folder.ico",
    content: (
      <div className={folderContentsStyles}>
        <GridLayout icons={undefined} />
      </div>
    ),
  },
];

function GridLayout({
  icons,
  className,
}: {
  icons: DesktopIcon[] | undefined;
  className?: string;
}) {
  const addWindows = useWindowStore((state) => state.addWindow);

  return (
    icons &&
    icons.map((icon) => (
      <div
        className={`flex aspect-square w-20 h-20 flex-col justify-center items-center hover:cursor-pointer ${className}`}
      >
        <img
          src={icon.iconPath}
          className="w-12"
          onClick={() => {
            addWindows(icon.title, icon.iconPath, icon.content);
          }}
        />
        <h2 className="text-[0.9rem]!">{icon.title}</h2>
      </div>
    ))
  );
}

export function Desktop() {
  const addWindows = useWindowStore((state) => state.addWindow);

  useEffect(() => {
    addWindows(
      "dex",
      "sada",
      <div className="grid  w-full h-full grid-cols-10">
        <div className="col-span-7 h-full bg-amber-500"></div>
        <div className="col-span-3 h-full bg-red-500"></div>
      </div>,
    );
  }, []);

  return (
    <div className="w-full h-screen bg-[url(/images/bliss.jpg)] bg-cover grid grid-rows-6 grid-cols-15 p-4">
      <GridLayout icons={desktopFolders} className="col-start-1" />
    </div>
  );
}
