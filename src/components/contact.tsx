import clsx from "clsx";
import "../styles.css";

function LinkLine({
  icon,
  link,
  tag,
}: {
  icon: string;
  link: string;
  tag: string;
}) {
  return (
    <div className="flex space-x-3">
      <a href={link}>
        <i
          className={clsx("bi hover:text-black/70! text-black! text-xl", icon)}
        />
      </a>
      <span className="cursor-pointer text-[1rem]/6.5 underline text-blue-500!">{tag}</span>
    </div>
  );
}

export function Contact() {
  return (
    <div className="w-full text-dark">
      <div className="w-full p-8 grid grid-cols-6 ">
        <div className="col-span-2">
          <img src="images/id.ico" alt="pfp" className="w-32 rounded-full" />
        </div>
        <div className="col-span-4 pl-2">
          <div className="flex flex-col space-y-1 pl-1 mt-2">
            <LinkLine
              icon="bi-linkedin"
              link="https://www.linkedin.com/in/dorson-tang/"
              tag="Dorson Tang"
            />
            <LinkLine
              icon="bi-envelope-fill"
              link="mailto:dorsontang123@gmail.com"
              tag="dorsontang123@gmail.com"
            />
            <LinkLine
              icon="bi-github"
              link="https://github.com/doruphin"
              tag="doruphin"
            />
            <LinkLine
              icon="bi-youtube"
              link="https://www.youtube.com/@ZenBubbleYT"
              tag="ZenBubble"
            />
            <LinkLine
              icon="bi-file-earmark-pdf-fill"
              link="/documents/TangDorsonResume.pdf"
              tag="Resume as of 2026-01-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
