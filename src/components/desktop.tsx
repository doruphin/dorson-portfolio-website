import { useEffect, type ReactNode } from "react";
import { useWindowStore } from "./windows";
import { projectIcons } from "../data/projects";
import { Contact } from "./contact";
import { hobbyIcons } from "../data/hobbies";
import { experienceIcons } from "../data/experience";
import { educationIcons } from "../data/education";

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

  return icons.map((icon) => (
    <div
      className={`flex aspect-square w-20 h-20 flex-col justify-center items-center hover:cursor-pointer ${className}`}
      onClick={() => {
        addWindows(
          icon.title,
          icon.iconPath,
          icon.content,
          folder,
          width,
          height,
          startPos,
        );
      }}
    >
      <img src={icon.iconPath} className="w-12" />
      <h2 className={`text-[0.9rem]! ${iconTextClassName}`}>{icon.title}</h2>
    </div>
  ));
}

export function Desktop() {
  const addWindows = useWindowStore((state) => state.addWindow);

  useEffect(() => {
    addWindows(
      "Welcome!",
      "images/favicon.ico",
      <div className="p-3 space-y-3">
        <h1 className="text-black! text-3xl">Hello there!</h1>
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
            className="text-blue-700!"
          >
            here.
          </a>
        </p>
      </div>,
      false,
      400,
      550,
      { x: window.innerWidth / 2 - 430, y: window.innerHeight / 2 - 270 },
    );

    addWindows(
      "Projects",
      "images/folder.ico",
      desktopFolders[0].content,
      true,
      600,
      220,
      { x: window.innerWidth / 2, y: window.innerHeight / 2 - 270 },
    );

    addWindows(
      "Contact Me",
      "images/contact.ico",
      desktopFolders[desktopFolders.length - 1].content,
      false,
      600,
      300,
      { x: window.innerWidth / 2, y: window.innerHeight / 2 - 20 },
    );

    // addWindows(
    //   "Contadsadct Me",
    //   "images/contact.ico",
    //   educationIcons[0].content,
    //   false,
    //   600,
    //   380,
    //   { x: window.innerWidth / 2, y: window.innerHeight / 2 - 20 },
    // );

    // addWindows(
    //   "UNDERCONSTRUCTION",
    //   "images/construction.gif",
    //   <div>
    //     <img src="images/construction.gif" />
    //     <h1 className="text-black! bg-amber-300">
    //       If you are seeing this, this website is going through some changes and
    //       may not accurately represent a finished product
    //     </h1>
    //   </div>,
    //   200,
    //   450,
    //   {
    //     x: window.innerWidth / 2 - 200 / 2,
    //     y: window.innerHeight / 2 - 450 / 2,
    //   },
    // );
  }, []);

  return (
    <div className="w-full h-screen z-1 grid grid-rows-6 grid-cols-15 p-4 absolute">
      <GridLayout icons={desktopFolders} folder className="col-start-1" />
    </div>
  );
}
