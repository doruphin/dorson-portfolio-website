import type { DesktopIcon } from "../components/desktop";

export type Experience = {
  link: string;
  icon: string;
  bg: string;
  title: string;
  description: string;
  subtitle: string;
};

export const experiences: Experience[] = [
  {
    icon: "images/leanpub.ico",
    title: "Ruboss",
    subtitle: "Software Developer",
    description:
      "My very first internship was with Ruboss, working on their virtual e-book platform, Leanpub. I worked on the major website overhaul, which you can check out for yourself on the right. I worked on many different aspects of website, but most notably, I was resposible for the course reader. I gained a lot of real world experience here, mostly with agile development.",
    bg: "images/leanpub_bg.png",
    link: "https://leanpub.com/",
  },
  {
    icon: "images/subbots.ico",
    title: "Subbots",
    subtitle: "Software Lead",
    description:
      "I am currently the software lead for UBC Subbots. We aim to create autonomous underwater vehicles for the annual international RoboSub competition. I work mostly with the controls system of the robot, and in our most recent competition, I led the team to the semi-finals.",
    bg: "images/subbots_bg.webp",
    link: "https://github.com/ubc-subbots/steelhead",
  },
];

export const experienceIcons: DesktopIcon[] = experiences.map((experience) => ({
  title: experience.title,
  iconPath: experience.icon,
  content: (
    <div className="grid w-full h-full grid-cols-10">
      <div className="col-span-5 h-full p-3 py-2">
        <h1 className="text-black! text-3xl">{experience.title}</h1>
        <h2 className="text-gray-700! italic!">{experience.subtitle}</h2>
        <p className="text-black! text-[1rem]">{experience.description}</p>
      </div>
      <div className="absolute w-1/4 h-[321px] left-1/2 bg-linear-to-r from-white to-white/0"></div>
      <div
        className="col-span-5 h-full text-center flex flex-col justify-center bg-position-[center_right_-4rem] bg-size-[600px] space-y-3 items-center"
        style={{ backgroundImage: `url(${experience.bg})` }}
      >
        <a
          href={experience.link}
          target="_blank"
          className="rounded-full bg-black/40 hover:cursor-pointer hover:bg-black/70 items-center p-2 z-50 w-10 h-10 "
        >
          <i className="bi bi-box-arrow-up-right" />
        </a>
      </div>
    </div>
  ),
}));
