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
    <div>
      <a href={link} className="mr-3">
        <i className={clsx("bi hover:text-black hover:scale-110", icon)} />
      </a>
      {tag}
    </div>
  );
}

export function Contact() {
  return (
    <div className="w-3/4 h-128 contact text-dark">
      <div className="w-full h-full rounded-3xl p-8 bg-quaterniary grid grid-cols-6 shadow-2xl">
        <div className="col-span-2">
          <img src="images/id.ico" alt="pfp" className="w-72 rounded-full" />
        </div>
        <div className="col-span-4 pl-2">
          <p className="text-7xl">Contact Me!</p>
          <div className="flex flex-col space-y-3 pl-4 mt-2">
            <LinkLine
              icon="bi-github"
              link="https://github.com/doruphin"
              tag="doruphin"
            />
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
              icon="bi-youtube"
              link="https://www.youtube.com/@ZenBubbleYT"
              tag="ZenBubble"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-black h-18 relative bottom-32" />
    </div>
  );
}
