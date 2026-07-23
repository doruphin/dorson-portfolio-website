/* eslint-disable react-refresh/only-export-components */
import type { DesktopIcon } from "../components/desktop";
import YouTube from "react-youtube";
import { lazy, Suspense } from "react";

const BlenderScene = lazy(() => import("../components/BlenderScene"));

export const hobbyIcons: DesktopIcon[] = [
  {
    iconPath: "images/youtube.ico",
    title: "YouTube",
    content: (
      <div className="w-full h-full flex flex-col p-3 space-y-3">
        <div className="flex items-center justify-between">
          <img src="/images/youtube.ico" className="w-8 h-8" />
          <div className="w-96 h-full rounded-full border-1 border-black/30" />
          <a
            href="https://www.youtube.com/@ZenBubbleYT
          "
          >
            <img src="/images/pfp.ico" className="w-8 h-8 rounded-full" />
          </a>
        </div>
        <div className="grid grid-cols-10">
          <div className="col-span-7">
            <YouTube
              iframeClassName="rounded-xl mb-3"
              videoId="ayKe4pW-E84"
              opts={{ width: "470", height: "240" }}
            />
            <h1 className="text-black! text-2xl/5 font-bold! mb-1">
              I'm a YouTuber!
            </h1>
            <p className="text-black! bg-gray-200/70 rounded-xl mt-3 p-2">
              I love creating YouTube videos in my free time! Mostly it's
              related to video games, but I have second channels pertaining to
              coding and other hobbies. My most popular video has around ~85k
              views (this one), which isn't a crazy amount, but it represents my
              dedication towards making videos I love, and how I was able to get
              that many people to listen to my crazed ramblings. You can check
              out my channel through the top right link or through the video!
            </p>
          </div>
          <div className="col-span-3 text-black! ml-3 flex flex-col space-y-1">
            <div className="w-full h-16">
              <div className="w-24 h-full bg-gray-200/70 rounded-xl" />
            </div>
            <div className="w-full h-16">
              <div className="w-24 h-full bg-gray-200/70 rounded-xl" />
            </div>
            <div className="w-full h-16">
              <div className="w-24 h-full bg-gray-200/70 rounded-xl" />
            </div>
            <div className="w-full h-16">
              <div className="w-24 h-full bg-gray-200/70 rounded-xl" />
            </div>
            <div className="w-full h-16">
              <div className="w-24 h-full bg-gray-200/70 rounded-xl" />
            </div>
            <div className="w-full h-16">
              <div className="w-24 h-full bg-gray-200/70 rounded-xl" />
            </div>
            <div className="w-full h-16">
              <div className="w-24 h-full bg-gray-200/70 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    iconPath: "images/blender.ico",
    title: "3D Modelling",
    content: (
      <>
        <img src="images/blender.ico" className="absolute w-4 h-4 ml-3 mt-1" />
        <div className="grid grid-cols-11 p-3 pt-6 h-full bg-black/80 gap-x-1">
          <div className="col-span-7 h-full bg-white/20 w-full rounded-lg">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Loading 3D...</div>}>
              <BlenderScene />
            </Suspense>
          </div>
          <div className="col-span-4 h-full w-full rounded-lg flex flex-col space-y-1">
            <div className="h-30 w-full rounded-lg bg-white/20 flex flex-col">
              <div className="h-6 w-full rounded-t-lg bg-white/3"></div>
              <div className="h-6 w-full  "></div>
              <div className="h-6 w-full  bg-white/3"></div>
              <div className="h-6 w-full  "></div>
              <div className="h-6 w-full rounded-b-lg bg-white/3"></div>
            </div>
            <p className="h-full w-full rounded-lg bg-white/20 p-2">
              In my free time, I enjoy creating 3D models and printing them out
              on my Ender 3, which is on it's last legs by now. In fact,
              everything on the left panel was created using either Blender or
              Inventor. Feel free to play with and scroll through them with the
              power of ThreeJS! I think 3D printing has so many applications
              beyond fidget toys and souvenir trinkets, and I want to explore
              all of the possibilities it can offer.
            </p>
          </div>
        </div>
      </>
    ),
  },
  // {
  //   iconPath: "images/cosplay.ico",
  //   title: "Cosplay",
  //   content: <></>,
  // },
];
