import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const srcDirectory = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    ...tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    nitro(),
    viteReact(),
  ],
  resolve: {
    alias: { "@": srcDirectory },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
      "@tanstack/react-start",
      "@tanstack/react-router",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },
});
