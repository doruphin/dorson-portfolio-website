import { useState, type ReactNode } from "react";
import "./styles.css";

type Project = {
  date: string;
  icon: string;
  title: string;
  description: string;
  embed: ReactNode;
  personal: string;
  technologies: string[];
};

// this website
// bublstore
// scip net

// execution order
// flicker

const projects: Project[] = [
  {
    date: "Sept 31",
    icon: "images/favicon.ico",
    title: "Execution Order",
    description: "make some stuff yup",
    embed: (
      // <iframe
      //   frameBorder="0"
      //   src="https://itch.io/embed-upload/14524368?color=000000"
      //   allowFullScreen={true}
      //   width="960"
      //   height="640"
      // >
      //   <a href="https://andrewyx.itch.io/execution-order">
      //     Play Execution Order on itch.io
      //   </a>
      // </iframe>
      <></>
    ),
    personal: "rly like this one",
    technologies: ["bananan", "gaga"],
  },
  {
    date: "setp 31",
    icon: "images/favicon.ico",
    title: "This Website",
    description: "masff yup",

    embed: <></>,
    personal: "rly like this one",
    technologies: ["bananan"],
  },
  {
    date: "setp 31",
    icon: "images/favicon.ico",
    title: "bublstore",
    description: "masff yup",

    embed: <></>,
    personal: "rly like this one",
    technologies: ["bananan"],
  },
  {
    date: "setp 31",
    icon: "images/favicon.ico",
    title: "SCiPNet",
    description: "masff yup",

    embed: <></>,
    personal: "rly like this one",
    technologies: ["bananan"],
  },
  {
    date: "setp 31",
    icon: "images/favicon.ico",
    title: "Flicker",
    description: "masff yup",

    embed: <></>,
    personal: "rly like this one",
    technologies: ["bananan"],
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <div className="w-3/4 h-2/5 flex flex-col">
      <div className="w-full h-full border-2 p-8 grid grid-cols-4">
        <div className="col-span-3">
          <p className="italic text-2xl text-middle">{activeProject.date}</p>
          <div>{activeProject.title}</div>
          <div className="text-3xl">{activeProject.description}</div>
          {activeProject.embed}
        </div>
        <div>
          {activeProject.technologies.map((tech) => (
            <div>{tech}</div>
          ))}
        </div>
      </div>

      <div className="w-full mt-3 flex text-2xl space-x-3">
        {projects.map((proj, ind) => {
          return (
            <div
              className="flex border-r-2 border-l-2 p-2 w-full justify-center hover:bg-light/70 transition-all hover:border-white hover:text-black cursor-pointer text-sm "
              onClick={() => setActiveProject(projects[ind])}
            >
              <div className="flex space-x-1 items-center">
                <img
                  src={proj.icon}
                  className="w-6"
                  alt={`icon for ${proj.title}`}
                />
                <p>{proj.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
