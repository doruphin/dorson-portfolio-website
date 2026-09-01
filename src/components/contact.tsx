import clsx from "clsx";
import "../styles.css";

function LinkLine({
  icon,
  link,
  tag,
  label,
}: {
  icon: string;
  link: string;
  tag: string;
  label: string;
}) {
  return (
    <div className="flex items-center mb-1">
      <div className="w-16 text-right pr-2 text-black! text-xs font-bold">
        {label}:
      </div>
      <a
        href={link}
        target="_blank"
        className="flex-1 flex items-center bg-white border-2 border-t-gray-800 border-l-gray-800 border-b-white border-r-white px-2 py-0.5 cursor-pointer group hover:bg-[#000080]"
      >
        <i
          className={clsx(
            "bi text-black! mr-2 group-hover:text-white!",
            icon
          )}
        />
        <span className="text-black! group-hover:text-white! text-xs truncate">
          {tag}
        </span>
      </a>
    </div>
  );
}

export function Contact() {
  return (
    <div className="w-full h-full bg-[#c0c0c0] p-2 select-none overflow-hidden font-sans border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800">
      <div className="flex items-start space-x-3">
        <div className="flex flex-col items-center space-y-2 mt-2 ml-1">
          <div className="border-2 border-t-gray-800 border-l-gray-800 border-b-white border-r-white bg-white shadow-sm">
            <img src="images/id.ico" alt="pfp" className="w-20 h-20 pixelated" />
          </div>
          <img src="images/dancin_cat.gif" alt="A dancing cat gif" className="w-12" />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="relative border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white p-2 pt-4 mt-1 shadow-sm">
            <span className="absolute -top-3 left-2 px-1 bg-[#c0c0c0] text-black! text-xs">
              Contact Information
            </span>

            <div className="flex flex-col">
              <LinkLine
                label="LinkedIn"
                icon="bi-person-fill"
                link="https://www.linkedin.com/in/dorson-tang/"
                tag="Dorson Tang"
              />
              <LinkLine
                label="E-mail"
                icon="bi-envelope-fill"
                link="mailto:dorsontang123@gmail.com"
                tag="dorsontang123@gmail.com"
              />
              <LinkLine
                label="GitHub"
                icon="bi-github"
                link="https://github.com/doruphin"
                tag="doruphin"
              />
              <LinkLine
                label="Resume"
                icon="bi-file-earmark-pdf-fill"
                link="/documents/TangDorsonResume.pdf"
                tag="As of 2026-08-31"
              />
            </div>
          </div>

          <div className="flex justify-end mt-2 space-x-2 mr-1">
            <button className="px-4 py-0.5 text-gray-500! bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 text-xs shadow-sm" disabled>
              OK
            </button>
            <button className="px-4 py-0.5 text-gray-500! bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 text-xs shadow-sm" disabled>
              Cancel
            </button>
            <button className="px-4 py-0.5 text-gray-500! bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 text-xs shadow-sm" disabled>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
