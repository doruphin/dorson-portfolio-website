import React from "react";
import { createRoot } from "react-dom/client";
import { DOSon } from "./DOSon.tsx";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <DOSon />
  </React.StrictMode>,
);
