import { useState, type ReactNode } from "react";
import "./styles.css";
import clsx from "clsx";

export function Contact() {
  return (
    <div className="w-3/4 h-3/5 flex flex-col text-white">
      <div className="w-full h-full border-1 rounded-3xl p-4 flex flex-col bg-black">
        <div className="w-full h-full ">Drivers ID</div>
      </div>
    </div>
  );
}
