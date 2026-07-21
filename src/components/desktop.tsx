import { useEffect, type ReactNode } from "react";
import { useWindowStore, getThemeIcon } from "./windows";
import { projectIcons } from "../data/projects";
import { Contact } from "./contact";
import { hobbyIcons } from "../data/hobbies";
import { experienceIcons } from "../data/experience";
import { educationIcons } from "../data/education";

import { VisitCounter } from "./funtime/counter";
import { GuestBook } from "./funtime/guestbook";

export interface DesktopIcon {
  title: string;
  iconPath: string;
  content?: ReactNode;
}

interface DesktopFolder {
  title: string;
  icons: DesktopIcon[];
}

const folders: DesktopFolder[] = [
  {
    title: "Projects",
    icons: projectIcons,
  },
  {
    title: "Hobbies",
    icons: hobbyIcons,
  },
  {
    title: "Experience",
    icons: experienceIcons,
  },
  {
    title: "Education",
    icons: educationIcons,
  },
];

const desktopFolders: DesktopIcon[] = [
  ...folders.map((folder) => ({
    title: folder.title,
    iconPath: "images/folder.ico",
    content: (
      <div className={"grid grid-cols-7 py-2 items-baseline"}>
        <GridLayout
          icons={folder.icons}
          folder={false}
          iconTextClassName="text-black!"
          width={folder.title === "Hobbies" ? 720 : undefined}
          height={folder.title === "Hobbies" ? 600 : undefined}
          startPos={folder.title === "Hobbies" ? { x: 10, y: 10 } : undefined}
        />
      </div>
    ),
  })),
  {
    title: "Contact Me",
    iconPath: "images/contact.ico",
    content: <Contact />,
  },
];

function GridLayout({
  icons,
  folder,
  className,
  iconTextClassName,
  width,
  height,
  startPos,
}: {
  icons: DesktopIcon[];
  folder: boolean;
  className?: string;
  iconTextClassName?: string;
  width?: number;
  height?: number;
  startPos?: { x: number; y: number };
}) {
  const addWindows = useWindowStore((state) => state.addWindow);
  const theme = useWindowStore((state) => state.theme);

  return icons.map((icon, index) => {
    const iconPath = getThemeIcon(icon.iconPath, theme);
    return (
      <div
        key={icon.title || index}
        className={`flex aspect-square w-20 h-18 flex-col justify-center items-center hover:cursor-pointer ${className ? className : ""}`}
        onClick={() => {
          addWindows(
            icon.title,
            iconPath,
            icon.content,
            folder,
            width,
            height,
            startPos
          );
        }}
      >
        <img src={iconPath} className="w-12" />
        <h2 className={`text-[0.9rem]! ${iconTextClassName ? iconTextClassName : ""}`}>{icon.title}</h2>
      </div>
    );
  });
}

export function Desktop() {
  const addWindows = useWindowStore((state) => state.addWindow);

  useEffect(() => {
    const bentoWidth = 1190;
    const bentoHeight = 550;
    const startX = window.innerWidth / 2 - bentoWidth / 2;
    const startY = window.innerHeight / 2 - bentoHeight / 2 - 20;

    addWindows(
      "Welcome!",
      "images/favicon.ico",
      <div className="p-3 space-y-3">
        <img src="images/3d_hello.png" alt="3D word art that says: Hello There!" />
        <p className="text-black!">
          My name is Dorson Tang, and I'd like to formally extend to you an
          invitation to my website!
        </p>
        <p className="text-black!">
          If you are viewing this, you are most likely a recruiter looking at my
          resume. No biases, but I think you should 100% hire me :{")"}.
        </p>
        <p className="text-black!">
          As you can see, this isn't your standard portfolio website. Treat it
          like a directory representing my accomplishments, projects, and
          generally who I am as a person.
        </p>
        <p className="text-black!">
          On the right are some open folders of my technical projects and
          contact information. Feel free to click into the projects and read
          what I have to say about them, some of them even have demos!
        </p>
        <p className="text-black!">
          By the way, this website is fully open source and can be found{" "}
          <a
            href="https://github.com/doruphin/dorson-portfolio-website"
            className="text-blue-500!"
          >
            here.
          </a>
        </p>
      </div>,
      false,
      350,
      550,
      { x: startX, y: startY },
    );

    addWindows(
      "Projects",
      "images/folder.ico",
      desktopFolders[0].content,
      true,
      500,
      250,
      { x: startX + 370, y: startY },
    );

    addWindows(
      "Contact Me",
      "images/contact.ico",
      desktopFolders[desktopFolders.length - 1].content,
      false,
      500,
      280,
      { x: startX + 370, y: startY + 270 },
    );

    addWindows(
      "Counter",
      "images/construction.gif",
       <VisitCounter/>,
      false,
      300,
      130,
      { x: startX + 890, y: startY },
    );

    addWindows(
      "Guestbook",
      "images/construction.gif",
       <GuestBook/>,
      false,
      300,
      400,
      { x: startX + 890, y: startY + 150 },
    );
  }, [addWindows]);

  return (
  <div className="w-full h-screen z-1 flex flex-col flex-wrap content-start gap-8 p-4 absolute">
    <GridLayout icons={desktopFolders} folder />
  </div>
);
}
