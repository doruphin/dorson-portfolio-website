import { useState } from "react";
import "../styles.css";
import clsx from "clsx";

type Job = {
  link: string;
  date: string;
  title: string;
  role: string;
  description: string;
};

const jobs: Job[] = [
  {
    link: "sd",
    date: "sept 32",
    title: "Ruboss",
    role: "software dev",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    link: "sd",
    date: "sdd 23 - njfl 23",
    title: "UBC Subbots",
    role: "software lead",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export function Work() {
  const [activeJob, setActiveJob] = useState({} as Job);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={clsx("overview pl-32 flex text-dark")}>
      <div className="bg-dark secondary h-172 w-2 flex flex-col items-center justify-evenly rounded-full text-2xl">
        {jobs.map((job) => (
          <div key={job.title}>
            <div className="relative w-0 h-0">
              <p className="relative whitespace-nowrap right-3 w-1 flex justify-end">
                {job.date}
              </p>
            </div>
            <i
              className="bi bi-circle-fill cursor-pointer text-dark"
              onClick={() => {
                if (job === activeJob && modalOpen) {
                  setModalOpen(false);
                } else {
                  setModalOpen(true);
                  setActiveJob(job);
                }
              }}
            />
            <div
              className={clsx(
                "relative w-0 h-0 duration-100 transition-all",
                modalOpen ? "opacity-0" : "opacity-500",
              )}
            >
              <p className="relative whitespace-nowrap left-8 bottom-8 w-1 flex ">
                {job.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ANCHOR: Animated Job Details Section */}
      <div
        className={clsx(
          // Base styles for the animation
          "border-1 ml-8 my-32 bg-secondary rounded-xl flex flex-col",
          "transition-all duration-500 ease-in-out overflow-hidden origin-left",
          modalOpen ? "scale-x-100 p-4 opacity-100" : "scale-x-0 p-0 opacity-0",
        )}
      >
        <p>{activeJob.title}</p>
        <p className="italic text-2xl text-dark/70">{activeJob.role}</p>
        <p className="text-xl">{activeJob.description}</p>
      </div>
    </div>
  );
}
