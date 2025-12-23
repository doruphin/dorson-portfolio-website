import type { ReactNode } from "react";

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
      'Flicker was a game created for Dungeon Crawler Jam 2023, and was the first "coding" competition I created. I mainly worked on the art and implementation of the game. While the game isnt particularly "good" or even "playable", it holds a special place in my heart for being my entry point into my love of game development.',
    technologies: ["C#", "Unity"],
    executable: (
      <iframe width="640" height="380">
        <a href="https://andrewyx.itch.io/flicker">Play Flicker on itch.io</a>
      </iframe>
    ),
  },
];
