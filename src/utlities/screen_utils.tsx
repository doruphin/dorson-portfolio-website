import { useState, useEffect } from "react";

function getScreenDimensions() {
  const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
  return {
    screenWidth,
    screenHeight,
  };
}

export default function useScreenDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getScreenDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getScreenDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
