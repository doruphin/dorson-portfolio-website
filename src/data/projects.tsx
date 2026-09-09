/* eslint-disable react-refresh/only-export-components */
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
      "Execution Order was a project created for GMTK 2025, the largest game jam in Itch.io history. We created a puzzle game in under 72 hours, and I worked on implementing the visuals and obstacles of the game. We placed in the top 5% amongst 37,000 participants, which is impressive considering there were full on game companies in attendence.",
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
      "bublstore was the first personal project I created just to learn the basics of web development and more specifically, the backend element of it. It was created using React + Tailwind, and featured an AI chatbot using a local Ollama LLM. Please do not enter in your credit card information though.",
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
  {
    link: "https://invent.kde.org/doruphin",
    icon: "images/kdenlive.ico",
    bg: "images/kdenlive_bg.png",
    title: "Kdenlive/ MLT",
    description:
      "I've been trying to do more open source development lately, so Kdenlive was a natural place to start given that I actively use it for my YouTube channel. So far, I've had a staggering combined total of 2 (two) (II) contributions accepted into Kdenlive and MLT (which is Kdenlive's underlying engine), so I think that means I'm legally allowed to call myself a contributer.",
    technologies: ["C++", "OpenCV"],
  },
];

function ProjectWindow({ project }: { project: Project }) {
  const addWindows = useWindowStore((state) => state.addWindow);

  return (
    <div className="flex w-full h-full font-sans bg-white">
      <div className="w-2/3 h-full p-3 flex flex-col overflow-y-auto">
        <h1 className="text-black! text-4xl font-extrabold tracking-tight drop-shadow-sm mb-1">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-2.5 py-0.5 bg-gray-200 text-gray-800 text-xs font-semibold rounded-md border border-gray-300 shadow-sm text-black!">
              {tech}
            </span>
          ))}
        </div>

        <hr className="border-gray-300 mb-2 shadow-xs" />
        
        <p className="text-gray-900! text-base leading-relaxed flex-1">
          {project.description}
        </p>
      </div>

      <div
        className="w-1/2 h-full flex flex-col justify-end p-4 bg-cover bg-center border-l-2 border-gray-300/50 shadow-[inset_4px_0_10px_rgba(0,0,0,0.1)] relative"
        style={{ backgroundImage: `url(${project.bg})` }}
      >
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0"></div>

        <div className="relative z-10 flex flex-col space-y-3 pb-2">
          <a
            href={project.link}
            target="_blank"
            className="group flex items-center justify-center w-full h-10 px-4 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            <i className="bi bi-box-arrow-up-right mr-2" />
            <span>View Project</span>
          </a>
          
          {project.executable && (
            <div
              onClick={() =>
                addWindows(
                  project.title.toLowerCase() + ".exe",
                  project.icon,
                  project.executable,
                  false,
                  970,
                  650,
                )
              }
              className="group flex items-center justify-center w-full h-10 px-4 bg-blue-600/80 backdrop-blur-md hover:bg-blue-500/90 border border-blue-400/50 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-900/50 cursor-pointer"
            >
              <i className="bi bi-play-fill mr-1.5 text-lg" />
              <span>Play Demo</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const projectIcons: DesktopIcon[] = projects.map((proj) => ({
  title: proj.title,
  iconPath: proj.icon,
  content: <ProjectWindow project={proj} />,
}));
