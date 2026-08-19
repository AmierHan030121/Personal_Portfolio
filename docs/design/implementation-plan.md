# Accepted Direction A Implementation Plan

This is the second confirmation gate from `prompt.md`. It describes the implementation to build after technical approval.

## Product Surface

The site is an HR-ready data analytics portfolio. The primary job is to make a visitor understand the candidate's positioning, inspect real work quickly, and follow a project from preview to source PDF or image.

## Stack

- React + TypeScript + Vite.
- `react-router-dom` with `HashRouter`.
- Plain CSS tokens and component classes; no UI kit or runtime CDN.
- `lucide-react` for local interface icons.
- `@fontsource/caveat` for the English signature and `@fontsource/ibm-plex-mono` for utility/data labels. Chinese text uses a system font stack to avoid shipping an unnecessarily large CJK font file.
- No backend, database, authentication, runtime API, analytics beacon or external asset request.

## Why HashRouter

EdgeOne static fallback behavior has not been independently configured or verified. A browser URL such as `/project/slug` could therefore return a static 404 after refresh. Hash routes keep the document URL at `index.html` while preserving distinct navigable states:

```text
/#/
/#/dashboards
/#/research
/#/about
/#/project/ai-ecommerce-growth
```

This is a deliberate deployment tradeoff. It avoids rewrite configuration while retaining back/forward navigation and shareable project states.

## Route and Page Inventory

| Route | Page | Main job |
| --- | --- | --- |
| `#/` | Home | Identity, positioning, selected work, methods and next step |
| `#/dashboards` | Dashboards | Filterable list of four business intelligence projects |
| `#/research` | Research | Filterable list of two research/modeling projects |
| `#/about` | About | Capability, tool stack, working approach and contact-safe profile |
| `#/project/:slug` | Project detail | One reusable evidence-led project page |

The existing static HTML files remain untouched until the React replacement is verified. The final build will use a single `index.html`; the old HTML files are retained as historical source until the migration is complete.

## Component Ownership

```text
src/
  app/
    App.tsx                 route composition and shell
    routes.tsx              HashRouter route table
  components/
    SiteHeader.tsx          skip link, navigation and mobile menu
    SiteFooter.tsx
    WorkbenchHero.tsx       accepted Direction A hero
    AnalysisRoute.tsx       question -> method -> decision path
    ProjectCard.tsx         reusable preview card
    ProjectIndex.tsx        indexed project rows
    FilterBar.tsx           accessible capability filter
    MediaFrame.tsx          stable image/gallery/PDF frame
    MediaDialog.tsx         keyboard-safe preview dialog
    EmptyState.tsx
  content/
    projects.ts             typed project records and imported asset URLs
    profile.ts              approved profile copy and tool groups
  pages/
    HomePage.tsx
    DashboardsPage.tsx
    ResearchPage.tsx
    AboutPage.tsx
    ProjectDetailPage.tsx
  styles/
    tokens.css
    globals.css
    layout.css
    components.css
  lib/
    project-filters.ts
    media.ts
```

## Content Model

New projects should be added as data, not copied JSX:

```ts
type ProjectKind = "dashboard" | "research";
type MediaKind = "image" | "gallery" | "pdf";

interface ProjectMedia {
  kind: MediaKind;
  src: string;
  preview?: string;
  alt: string;
  label: string;
}

interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  summary: string;
  question: string;
  capabilities: string[];
  tools: string[];
  media: ProjectMedia[];
  featured?: boolean;
  order: number;
}
```

The initial data contains the six existing projects and no invented year, client, employment claim, award, result or research conclusion. Original files remain in `作品/`; the data module imports them with Vite URL imports so production assets are emitted without renaming or deleting the originals.

The private resume under `其他素材/` is deliberately not imported. A public resume link can be added later only after the sensitive fields are redacted and explicitly approved.

## Interaction Contract

- Header links update the selected route and `aria-current` state.
- Dashboard and research filters update visible rows and a result count derived from the data model.
- Project cards navigate to `#/project/:slug`.
- `MediaDialog` opens image/gallery/PDF previews, traps focus through the native dialog behavior, closes on Escape and backdrop close, and exposes a direct open/download link.
- Broken images show a labeled fallback with the original-file action instead of an empty rectangle.
- Mobile navigation opens and closes locally, restores focus to its trigger, and closes after route selection.
- `prefers-reduced-motion` removes route and reveal motion without hiding content.

## Build and Deployment Contract

```powershell
npm install
npm run dev
npm run typecheck
npm run test
npm run build
npm run preview
```

- Build output: `dist/`.
- EdgeOne build command: `npm run build`.
- EdgeOne output directory: `dist`.
- No environment variables are required.
- No SPA rewrite is required because routes are hash-based.
- The production build must not include the resume, the concept pages, the video, the zip archive or reference screenshots unless explicitly requested.

## Verification Gate Before Coding

After the user confirms this plan, implementation begins in this order:

1. Add package manifest, TypeScript/Vite configuration and imported asset declarations.
2. Build tokens, shell, navigation and media fallback.
3. Implement Home first and compare against `direction-a-desktop-1440.png` and `direction-a-mobile-390.png`.
4. Add data-driven list pages and project detail route.
5. Run typecheck/tests/build, then Browser checks at 1440×1000, 1024×900, 390×844 and 430×932.
