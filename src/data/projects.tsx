import type { ReactNode } from "react";
import type { DesktopIcon } from "../components/desktop";
import { useWindowStore } from "../components/windows";

export type Project = {
  link: string;
  icon: string;
  bg: string;
  title: string;
  description: string;
  technologies: string[];
  executable?: ReactNode;
};

export const projects: Project[] = [
  {
    link: "https://github.com/doruphin/fretnot",
    icon: "images/fretnot.ico",
    bg: "images/fretnot_bg.png",
    title: "FretNot",
    description:
      "FretNot was a project my team and I created for Stormhacks 2025, a 24 hour hackathon. It was an attachment on to your guitar that would use lasers to display the proper frets and strings of certain chords, tuned for Creep by Radiohead. We ended up winning the IEEE award for engineering, so I'm pretty proud of this one.",
    technologies: ["C++", "Typescript", "React", "Tailwind"],
  },
  {
    link: "https://github.com/TightGrapes/GMTK-2025",
    icon: "images/execution.ico",
    bg: "images/execution_bg.png",
    title: "Execution Order",
    description:
      "Execution Order was a project created for GMTK 2025, the largest game jam in Itch.io history. We created a puzzle game in under 72 hours, and I mainly worked on implementing the visuals and obstacles of the game. We placed in the top 5% amongst 37,000 participants, which is pretty impressive considering there were full on game companies in the competition.",
    technologies: ["C#", "Unity"],
    executable: (
      <iframe
        src="https://itch.io/embed-upload/14524368?color=000000"
        width="960"
        height="640"
      >
        <a href="https://andrewyx.itch.io/execution-order">
          Play Execution Order on itch.io
        </a>
      </iframe>
    ),
  },
  {
    link: "https://github.com/doruphin/bublstore",
    icon: "images/bublstore.ico",
    bg: "images/bublstore_bg.png",
    title: "bublstore",
    description:
      "bublstore was the first personal project I created just to learn the basics of web development and more specifically, the backend element of it. It was created using React + Tailwind, and featured an AI chatbot using a local Ollama LLM. Please do not enter in your credit card information though, as I'm pretty sure I stored it in plain text :).",
    technologies: ["Python", "JavaScript", "Django", "Tailwind"],
  },
  {
    link: "https://github.com/TightGrapes/Pikspace",
    icon: "images/pikspace.ico",
    bg: "images/pikspace_bg.png",
    title: "Pikspace",
    description:
      "Pikspace was a project created for nwHacks 2025, the premiere hackathon at UBC. It was intended to be a fully fledged DSLR simulator in VR, mainly used as practice for exotic locations. I worked on the VR interactions with the camera adapting the various options such as ISO and aperture speed.",
    technologies: ["C#", "Unity"],
  },
  {
    link: "https://github.com/Andrewyx/Flicker",
    icon: "images/flicker.ico",
    bg: "images/flicker_bg.png",
    title: "Flicker",
    description:
      'Flicker was a game created for Dungeon Crawler Jam 2023, and was the first "coding" competition I competed in. I mainly worked on the art and implementation of the game. While the game isnt particularly "good" or even "playable", it holds a special place in my heart for being my entry point into my love of game development.',
    technologies: ["C#", "Unity"],
    executable: (
      <iframe
        src="https://itch.io/embed-upload/7667393?color=000000"
        width="960"
        height="640"
      >
        <a href="https://andrewyx.itch.io/flicker">Play Flicker on itch.io</a>
      </iframe>
    ),
  },
];

function ProjectWindow({ project }: { project: Project }) {
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

export const projectIcons: DesktopIcon[] = projects.map((proj) => ({
  title: proj.title,
  iconPath: proj.icon,
  content: <ProjectWindow project={proj} />,
}));
