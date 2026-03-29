# MRE — Minimal Reproducible Example: TUI Input Box

A minimal reproduction of the main chat input box used in OpenCode's TUI,
isolated from all application logic (SDK, sessions, themes, keybinds, etc.).

## What it does

Renders a full-terminal TUI with a single `textarea` input box powered by `@opentui/core` + `@opentui/solid`.
- Type text into the box
- Press **Enter** to "submit" (clears the box and shows what was submitted)
- Press **Ctrl+C** to exit

## Dependencies

| Package | Version |
|---|---|
| `@opentui/core` | `0.1.92` |
| `@opentui/solid` | `0.1.92` |
| `solid-js` | `1.9.10` |

## Run

```bash
bun install
bun run index.tsx
```

## Run with Docker

```bash
docker build -t opentui-mre .
docker run -it --rm opentui-mre
```

> **Note:** The `-it` flag is required — the TUI needs an interactive terminal (TTY). Without it the process will exit immediately.

## Files

- `index.tsx` — the entire MRE: renderer bootstrap + minimal `App` component with a `<textarea>`
- `tsconfig.json` — sets `jsxImportSource` to `@opentui/solid` (required for JSX to work with opentui)
- `bunfig.toml` — preloads `@opentui/solid/preload` so Bun uses the correct Solid JSX transform at runtime
- `package.json` — minimal deps
- `Dockerfile` — builds and runs the MRE in a container using `oven/bun:latest`
