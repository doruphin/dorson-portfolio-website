import { useEffect, type ReactNode } from "react";
import { useWindowStore } from "./windows";
import { projects, type Project } from "../data/projects";

interface DesktopIcon {
  title: string;
  iconPath: string;
  content?: ReactNode;
}

const projectIcons: DesktopIcon[] = projects.map((proj) => ({
  title: proj.title,
  iconPath: proj.icon,
  content: <ProjectFolder project={proj} />,
}));

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
    icons: undefined,
  },
  {
    title: "Experience",
    icons: undefined,
  },
  {
    title: "Education",
    icons: undefined,
  },
];

const desktopFolders: DesktopIcon[] = folders.map((folder) => ({
  title: folder.title,
  iconPath: "images/folder.ico",
  content: (
    <div className={"grid grid-cols-7 py-2 items-baseline"}>
      <GridLayout icons={folder.icons} iconTextClassName="text-black!" />
    </div>
  ),
}));

function ProjectFolder({ project }: { project: Project }) {
  const addWindows = useWindowStore((state) => state.addWindow);

  return (
    <div className="grid w-full h-full grid-cols-12">
      <div className="col-span-8 h-full p-3 py-2">
        <h1 className="text-black! text-3xl">{project.title}</h1>
        <h2 className="text-gray-700! italic!">
          {project.technologies.join(", ")}
        </h2>
        <p className="text-black! text-[1.15rem]">{project.description}</p>
      </div>
      <div
        className="col-span-4 h-full text-center flex flex-col justify-center bg-position-[center_right_-4rem] bg-size-[600px] space-y-3"
        style={{ backgroundImage: `url(${project.bg})` }}
      >
        <a
          href={project.link}
          target="_blank"
          className="rounded-full bg-black/40 hover:cursor-pointer hover:bg-black/70 items-center p-2"
        >
          <i className="bi bi-box-arrow-up-right mr-2" />
          <span>View the Project!</span>
        </a>
        {project.executable && (
          <div
            onClick={() =>
              addWindows(
                project.title.toLowerCase() + ".exe",
                project.icon,
                project.executable,
                980,
                700,
              )
            }
            className="rounded-full bg-black/40 hover:cursor-pointer hover:bg-black/70 items-center p-2"
          >
            <i className="bi bi-play-fill" /> <span>Play a demo!</span>
          </div>
        )}
      </div>
    </div>
  );
}

function GridLayout({
  icons,
  className,
  iconTextClassName,
}: {
  icons: DesktopIcon[];
  className?: string;
  iconTextClassName?: string;
}) {
  const addWindows = useWindowStore((state) => state.addWindow);

  return icons.map((icon) => (
    <div
      className={`flex aspect-square w-20 h-20 flex-col justify-center items-center hover:cursor-pointer ${className}`}
      onClick={() => {
        addWindows(icon.title, icon.iconPath, icon.content);
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
        <h1 className="text-black! text-3xl">Welcome, Traveller!</h1>
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
          like an OS of my life, my accomplishments, and generally who I am as a
          person.
        </p>
        <p className="text-black!">
          I've pulled up some of my projects as that's most likely what you are
          interested in. Feel free to click into them and read what I have to
          say about them, some of them even have demos!
        </p>
        <p className="text-black!">
          Lastly, no matter who you are, remember to have a good day!
        </p>
      </div>,
      400,
      550,
      { x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 270 },
    );

    addWindows(
      "Projects",
      "images/folder.ico",
      desktopFolders[0].content,
      600,
      450,
      { x: window.innerWidth / 2 + 30, y: window.innerHeight / 2 - 270 },
    );

    addWindows(
      "UNDERCONSTRUCTION",
      "images/construction.gif",
      <div>
        <img src="images/construction.gif" />
        <h1 className="text-black! bg-amber-300">
          If you are seeing this, this website is going through some changes and
          may not accurately represent a finished product
        </h1>
      </div>,
      200,
      450,
      {
        x: window.innerWidth / 2 - 200 / 2,
        y: window.innerHeight / 2 - 450 / 2,
      },
    );
  }, []);

  return (
    <div className="w-full h-screen z-1 grid grid-rows-6 grid-cols-15 p-4 absolute">
      <GridLayout icons={desktopFolders} className="col-start-1" />
    </div>
  );
}
