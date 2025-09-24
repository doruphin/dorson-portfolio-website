import { useState } from "react";
import "./styles.css";

type Project = {
  icon: string;
  title: string;
  description: string;
  personal: string;
  technologies: string[];
};

const projects: Project[] = [
  {
    icon: "images/favicon.ico",
    title: "lol",
    description: "make some stuff yup",
    personal: "rly like this one",
    technologies: ["bananan", "gaga"],
  },
  {
    icon: "images/favicon.ico",
    title: "forsakeb bund",
    description: "masff yup",
    personal: "rly like this one",
    technologies: ["bananan"],
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <div className="w-3/4 h-2/5 flex flex-col">
      <div className="w-full h-full border-2 rounded-2xl p-8 grid grid-cols-4">
        <div className="col-span-3">
          <div>{activeProject.title}</div>
          <div className="text-3xl">{activeProject.description}</div>
        </div>
        <div>{activeProject.technologies}</div>
      </div>

      <div className="w-full mt-3 flex text-2xl space-x-3">
        {projects.map((proj, ind) => {
          return (
            <div
              className="flex border-2 rounded-2xl p-2 w-full justify-center hover:bg-white transition-all hover:text-black cursor-pointer"
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
