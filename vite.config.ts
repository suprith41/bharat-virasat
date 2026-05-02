// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      outDir: "dist",
    },
    // Disable HMR/react-refresh for dev to avoid preamble mismatch
    // The project uses a shared config that injects many plugins; disabling
    // HMR here prevents the runtime throw when dynamically importing
    // files that lack the refresh preamble (e.g. ?tsr-split imports).
    server: {
      hmr: false,
    },
  },
});
