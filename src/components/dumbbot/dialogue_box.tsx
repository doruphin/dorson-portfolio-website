import { useEffect, useState } from "react";
import "./styles.css";
import clsx from "clsx";
import talkingSfx from "../public/audio/sans.mp3";
import useSound from "use-sound";

export function DialogueBox({ dialogue }: { dialogue: { text: string }[] }) {
  const [displayedText, setDisplayedText] = useState("");
  const [doneSpeaking, setDoneSpeaking] = useState(false);

  let ind = 0;
  let textIndex = 0;

  function printText() {
    play();
    const refreshIntervalId = setInterval(() => {
      ind++;
      setDisplayedText(dialogue[textIndex].text.substring(0, ind));
      if (ind === dialogue[textIndex].text.length) {
        setDoneSpeaking(true);
        clearInterval(refreshIntervalId);
        stop();
      }
    }, 25);
  }
  useEffect(() => {
    printText();
  }, []);

  const [play, { stop }] = useSound(talkingSfx, { volume: 0.2 });

  return (
    <div
      className={clsx(
        "relative flex max-h-1/2 min-h-[300px] min-w-[1024px] w-[1250px] z-50",
        doneSpeaking && "cursor-pointer",
      )}
      onClick={() => {
        if (doneSpeaking) {
          setDisplayedText("");
          setDoneSpeaking(false);
          printText();
          textIndex++;
        }
      }}
    >
      <div
        className={"relative w-full flex flex-col items-center justify-stretch"}
        style={{
          transform: "scale(0)",
          animation:
            "scale-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1s 1 normal forwards",
          filter: 'url("#fancy-goo")',
        }}
      >
        <div
          className="w-full h-3/4 bg-[#fdf8e3] absolute origin-center top-0"
          style={{
            animation:
              "blob cubic-bezier(0.37, 0, 0.63, 1) 1.5s infinite alternate",
            borderRadius: "40% 40% 30% 30% / 150% 150% 150% 150%",
          }}
        />
        <div
          className="absolute bottom-0 w-[94%] h-[40%] bg-[#fdf8e3] origin-center"
          style={{
            animation:
              "blob 1s infinite alternate cubic-bezier(0.37, 0, 0.63, 1)",
            borderRadius: "5% 5% 20% 20% / 100% 100% 100% 100%",
          }}
        />
        <p
          className="absolute w-full text-[2.75rem] text-[#807256] font-bold"
          style={{ padding: "1em 1em 2em 1.5em", fontFamily: "sans-serif" }}
        >
          {displayedText}
        </p>
      </div>

      <div
        className="absolute"
        style={{
          animation:
            "character 0.6s infinite alternate cubic-bezier(0.37, 0, 0.63, 1)",
        }}
      >
        <div
          className="inline-block mr-auto text-[2rem] text-[#482016] bg-[#dd8530]"
          style={{
            padding: "0.5rem 2rem",
            borderRadius: "30% / 100% 100% 120% 120%",
            transform:
              "perspective(2rem) rotateX(1deg) rotateZ(-9deg) translateX(20%) translateY(-45%) scale(0)",
            animation:
              "fade-character 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 1s 1 normal forwards",
          }}
        >
          Dorson Tang
        </div>
      </div>

      <svg
        className={"absolute bottom-0 left-[512px] origin-center0"}
        style={{
          transform: "scale(0)",
          animation:
            "arrow 0.6s cubic-bezier(0.37, 0, 0.63, 1) 4.5s infinite alternate",
        }}
        width="45"
        height="25"
        viewBox="0 0 45 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.5 25C18.0184 25 7.59473 12.6404 1.55317 4.96431C-0.122281 2.83559 1.72264 -0.179893 4.39835 0.243337C10.2831 1.17415 18.2164 2.28736 22.5 2.28736C26.7836 2.28736 34.7169 1.17415 40.6017 0.243339C43.2774 -0.17989 45.1223 2.83559 43.4468 4.96431C37.4053 12.6404 26.9816 25 22.5 25Z"
          fill="#F1AE04"
        />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="fancy-goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
