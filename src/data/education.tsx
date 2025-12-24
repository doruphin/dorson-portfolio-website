import type { DesktopIcon } from "../components/desktop";

export const educationIcons: DesktopIcon[] = [
  {
    iconPath: "images/ubc.ico",
    title: "UBC",
    content: (
      <div className="grid w-full h-full grid-cols-12 ">
        <div className="col-span-7 h-full p-3 py-2">
          <h1 className="text-black! text-2xl">
            University of British Columbia
          </h1>
          <h2 className="text-gray-700! italic!">
            Expected Graduation: May 2028 | GPA: 3.95/4.33
          </h2>
          <p className="text-black! text-[1.15rem]">
            I am currently pursuing a Bachelor of Science with a major in
            Computer Science. During my time at UBC, I have been designated
            Dean's Scholar, and have gotten the opportunity to collaborate on a
            lot of cool clubs and projects, such as the UBC Game Development
            club and UBC Subbots.
          </p>
        </div>
        <div className="col-span-5 h-full text-center flex flex-col justify-center bg-position-[center_right_-8rem] bg-size-[600px] space-y-3 bg-[url(/images/ubc_bg.jpg)]"></div>
      </div>
    ),
  },
];
