import { type ReactNode } from "react";
import { useWindowStore } from "./windows";

interface DesktopIcon {
  title: string;
  iconPath: string;
  content: ReactNode;
}

const projectIcons: DesktopIcon[] = [
  {
    title: "FretNot",
    iconPath: "images/folder.ico",
    content: "sigma",
  },
  {
    title: "FretNot",
    iconPath: "images/folder.ico",
    content: "sigma",
  },
];

const desktopFolders: DesktopIcon[] = [
  {
    title: "Projects",
    iconPath: "images/folder.ico",
    content: (
      <div className="p-2">
        <GridLayout icons={projectIcons} />
      </div>
    ),
  },
  {
    title: "Deez",
    iconPath: "images/folder.ico",
    content: <GridLayout icons={projectIcons} />,
  },
];

function GridLayout({ icons }: { icons: DesktopIcon[] }) {
  const addWindows = useWindowStore((state) => state.addWindow);

  return icons.map((icon) => (
    <div className="col-start-1 flex aspect-square w-20 h-20 flex-col justify-center items-center hover:cursor-pointer">
      <img
        src={icon.iconPath}
        className="w-12"
        onClick={() => {
          addWindows(icon.title, icon.iconPath, icon.content);
        }}
      />
      <h2 className="text-[1rem]!">{icon.title}</h2>
    </div>
  ));
}

export function Desktop() {
  return (
    <div className="w-full h-screen bg-[url(images/bliss.jpg)] bg-cover grid grid-rows-6 grid-cols-15 p-4 ">
      <GridLayout icons={desktopFolders} />
    </div>
  );
}
