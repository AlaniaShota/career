# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript app.

- `src/`: application code (entry `src/main.tsx`, root `src/App.tsx`)
- `src/page/`: route-level pages (e.g., `src/page/about/AboutPage.tsx`)
- `src/component/`: shared UI components
- `src/store/`: Zustand state management
- `src/utils/`: shared utilities
- `src/assets/`: local images/icons
- `public/`: static assets served as-is
- `dist/`: production build output (ignored by ESLint)

## Build, Test, and Development Commands
Use npm scripts from `package.json`:

- `npm run dev`: start the Vite dev server for local development.
- `npm run build`: type-check (`tsc -b`) and create a production build.
- `npm run preview`: serve the production build locally for verification.
- `npm run lint`: run ESLint across the codebase.

## Coding Style & Naming Conventions
- Language: TypeScript + React (`.ts`/`.tsx`).
- Formatting: 2-space indentation, double quotes, and semicolons (follow existing files like `src/main.tsx`).
- Components: PascalCase filenames and exports (e.g., `AboutPage.tsx`).
- Directories: lowercase names; group by feature under `src/page/` when relevant.
- Linting: ESLint configured in `eslint.config.js` with React Hooks and React Refresh rules.

## Testing Guidelines
No automated test framework is configured yet (no `*.test.*` or `*.spec.*` files).
For now:

- Use `npm run lint` and manual browser checks for changes.
- If you add tests, document the framework and add a script in `package.json`.

## Commit & Pull Request Guidelines
Recent commits follow a conventional format:

- `type(scope): short summary` (e.g., `feat(FAQ): added new component`)
- Common types: `feat`, `style`, `test`

Pull requests should include:

- A clear summary of changes and motivation.
- Screenshots or short clips for UI changes.
- Notes on how to verify (commands, pages, or routes touched).
