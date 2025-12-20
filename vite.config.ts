import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const forceFullReload: Plugin = {
  name: "force-full-reload",
  enforce: "pre",
  handleHotUpdate({ server }) {
    server.ws.send({
      type: "full-reload",
      path: "*",
    });

    return [];
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [forceFullReload, react(), tailwindcss()],
});
