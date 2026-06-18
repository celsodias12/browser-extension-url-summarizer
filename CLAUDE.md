# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server with HMR. Load `dist/` as an unpacked extension at `chrome://extensions/` (Developer mode on).
- `npm run build` — Wipes `dist/` and `release/`, runs `tsc -b`, then `vite build`. Produces `dist/` and a packaged `release/release.zip` (via `vite-plugin-zip-pack`).
- `npm run lint` — ESLint over the repo.
- `npm run preview` — Serve the production build.

No test runner is configured.

## Architecture

Chrome Manifest V3 extension. React 19 + TypeScript + Vite, packaged by `@crxjs/vite-plugin`.

- **`manifest.config.ts`** is the source of truth for the extension manifest (typed via `defineManifest`); there is no static `manifest.json`. `@crxjs/vite-plugin` reads it in `vite.config.ts` to generate the build. Keep `version` here in sync with `package.json` (see commit history). Permissions: `tabs`, `storage`.
- **`src/main.tsx`** mounts the popup; **`src/app.tsx`** (lowercase filename, exports the named `App` — not a default export) is the entire UI. `index.html` is the popup's `default_popup`.
- The popup queries the active tab via `chrome.tabs.query`, lets the user edit a prompt template containing the `{url}` placeholder, and opens ChatGPT (`chat.openai.com/?q=...`) in a new tab with the substituted prompt. A "temporary chat" toggle appends `temporary-chat=true`.
- Settings (`customPrompt`, `useTemporaryChat`) persist through `chrome.storage.sync`. `DEFAULT_PROMPT` is defined at the top of `app.tsx`.
- **React Compiler** is enabled (`babel-plugin-react-compiler` in `vite.config.ts`) — do not hand-add `useMemo`/`useCallback`/`memo`; the compiler handles memoization.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (no `tailwind.config.js`); imported in `src/main.css`.

## Assets

- Extension icon sourced from https://www.svgrepo.com/svg/406827/page-facing-up?edit=true
