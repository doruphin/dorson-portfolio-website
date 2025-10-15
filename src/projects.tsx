import { useState } from "react";
import "./styles.css";
import clsx from "clsx";

type Project = {
  link: string;
  icon: string;
  bg: string;
  title: string;
  description: string;
  technologies: string[];
};

// inspirations:
// https://poolsuite.net/
// https://devils.neocities.org/

// in the future: SNES cartirdges with the banner being the image

const projects: Project[] = [
  {
    link: "https://github.com/doruphin/fretnot",
    icon: "images/fretnot.ico",
    bg: "bg-[url(images/fretnot_bg.png)]",
    title: "FretNot",
    description:
      "FretNot was a project my team and I created for Stormhacks 2025, a 24 hour hackathon. It was an attachment on to your guitar that would use lasers to display the proper frets and strings of certain chords, tuned for Creep by Radiohead. We ended up winning the IEEE award for engineering, so I'm pretty proud of this one.",
    technologies: ["C++", "Typescript", "React", "Tailwind"],
  },
  {
    link: "https://github.com/TightGrapes/GMTK-2025",
    icon: "images/execution.ico",
    bg: "bg-[url(images/execution_bg.png)]",
    title: "Execution Order",
    description:
      "Execution Order was a project created for GMTK 2025, the largest game jam in Itch.io history. We created a puzzle game in under 72 hours, and I mainly worked on implementing the visuals and obstacles of the game. We placed in the top 5% amongst 37,000 participants, which is pretty impressive conidering there were full on game companies in the competition.",
    technologies: ["C#", "Unity"],
  },
  {
    link: "https://github.com/doruphin/bublstore",
    icon: "images/bublstore.ico",
    bg: "bg-[url(images/bublstore_bg.png)]",
    title: "bublstore",
    description:
      "bublstore was the first personal project I created just to learn the basics of web development and more specifically, the backend element of it. It was created using React + Tailwind, and featured an AI chatbot using a local Ollama LLM. Please do not enter in your credit card information though, as I'm pretty sure I stored it in plain text :).",
    technologies: ["Python", "JavaScript", "Django", "Tailwind"],
  },
  {
    link: "https://github.com/TightGrapes/Pikspace",
    icon: "images/pikspace.ico",
    bg: "bg-[url(images/pikspace_bg.png)]",
    title: "Pikspace",
    description:
      "Pikspace was a project created for nwHacks 2025, the premiere hackathon at UBC. It was intended to be a fully fledged DSLR simulator in VR, mainly used as practice for exotic locations. I worked on the VR interactions with the camera adapting the various options such as ISO and aperture speed.",
    technologies: ["C#", "Unity"],
  },
  {
    link: "https://github.com/Andrewyx/Flicker",
    icon: "images/flicker.ico",
    bg: "bg-[url(images/flicker_bg.png)]",
    title: "Flicker",
    description:
      'Flicker was a game created for Dungeon Crawler Jam 2023, and was the first "coding" competition I created. I mainly worked on the art and implementation of the game. While the game isnt particularly "good" or even "playable", it holds a special place in my heart for being my entry point into my love of game development.',
    technologies: ["C#", "Unity"],
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <div className="w-3/4 h-3/5 flex flex-col">
      {/* tabs */}
      <div className="w-full mt-3 flex text-2xl bg-secondary rounded-t-lg border-t-1 border-x-1">
        {projects.map((proj, ind) => {
          return (
            <div
              className={clsx(
                "flex border-r-1 pl-3 pr-1 w-full justify-start text-sm ",
                ind === 0 && "rounded-tl-lg",
                ind === projects.length - 1 &&
                  proj == activeProject &&
                  "border-r-0!",
                proj == activeProject
                  ? ""
                  : "border-b-1 hover:bg-tertiary cursor-pointer",
              )}
              onClick={() => setActiveProject(projects[ind])}
            >
              <div className="flex space-x-1 items-center ">
                <img
                  src={proj.icon}
                  className="w-5"
                  alt={`icon for ${proj.title}`}
                />
                <p className="text-xl truncate">{proj.title}</p>
              </div>
            </div>
          );
        })}
        <div className="mx-4 text-3xl mt-1">x</div>
      </div>

      {/* body */}
      <div className="w-full h-full border-1 rounded-b-lg p-4 border-t-0 flex flex-col bg-secondary">
        <div className="w-full h-full ">
          <div
            className={clsx(
              "w-full h-full bg-cover rounded-lg border-1",
              activeProject.bg,
            )}
          >
            <div className="h-full w-1/2 p-4">
              <div className="bg-quaterniary rounded-lg h-full p-4 border-1 flex flex-col">
                <p className="text-xl italic text-gray-600">
                  {activeProject.technologies.map((tech, ind) => (
                    <span>
                      {tech}
                      {ind !== activeProject.technologies.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                <p className="text-2xl">{activeProject.description}</p>

                <a
                  className="mt-auto text-xl italic text-link/70"
                  href={activeProject.link}
                >
                  Check It Out!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
