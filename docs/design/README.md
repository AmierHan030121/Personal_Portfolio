# AmierHan Portfolio Redesign Directions

This folder is the local design-spec fallback for the portfolio redesign. It exists because the current session can read the Figma-related skill files, but does not expose a callable `use_figma` tool or a target Figma file.

No production page imports these files. The concepts read the repository's existing avatar and project images directly.

## Preview

Start the existing static server from the repository root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

- Direction A: `http://127.0.0.1:4173/docs/design/direction-a.html`
- Direction B: `http://127.0.0.1:4173/docs/design/direction-b.html`

Recommended review viewports:

- Desktop: 1440 x 1000
- Mobile: 390 x 844

## Direction A: Data Observatory

Status: **selected for implementation**.

Audience: HR and interviewers who need to understand the candidate's positioning and strongest work quickly.

### Tokens

| Token | Value | Role |
| --- | --- | --- |
| Canvas | `#f4f7fa` | Cool neutral page background |
| Grid | `#dce5ec` | Coordinate-paper structure |
| Ink | `#17202a` | Primary text and outlines |
| Data blue | `#2e6bff` | Navigation and analytical path |
| Analysis teal | `#0f8f83` | Methods and confirmed states |
| Annotation coral | `#ff6b57` | Sparse human annotations |

Typography:

- English signature: `Segoe Print` system fallback; intended production replacement is locally bundled `Caveat`.
- Chinese and body copy: `PingFang SC`, `Microsoft YaHei`, sans-serif.
- Data and utility labels: `Cascadia Mono`, `Consolas`, monospace; intended production replacement is locally bundled `IBM Plex Mono`.

Signature element: the blue analysis route connects identity, method and selected work. It becomes a project-position rail on detail pages.

### Structure

```text
Desktop
+--------------------------------------------------------------+
| brand                         navigation        view projects |
+----------+---------------------------+-----------------------+
| portrait | identity + positioning    | selected dashboard    |
|          | method route              | real project image    |
+----------+---------------------------+-----------------------+
| methods / tools       | project index / next-section preview |
+--------------------------------------------------------------+

Mobile
+------------------------------+
| brand                  menu   |
| portrait + identity           |
| positioning + actions        |
| selected dashboard image     |
| method route                 |
| next project preview         |
+------------------------------+
```

## Direction B: Research Evidence Desk

Audience: interviewers who place more weight on modeling, research structure and evidence-based reasoning.

### Tokens

| Token | Value | Role |
| --- | --- | --- |
| Canvas | `#f7f9fb` | Archive workspace background |
| Grid | `#d8e2ea` | Evidence alignment system |
| Ink | `#1b2630` | Primary text and rules |
| Research blue | `#315e7a` | Navigation and research hierarchy |
| Method green | `#477d68` | Method labels and verified steps |
| Annotation red | `#b84e45` | Evidence marks and emphasis |

Typography:

- English signature: `Segoe Print` system fallback; intended production replacement is locally bundled `Kalam`.
- Chinese display: `STSong`, `SimSun`, serif.
- Body copy: `PingFang SC`, `Microsoft YaHei`, sans-serif.
- Data labels: `Cascadia Mono`, `Consolas`, monospace; intended production replacement is locally bundled `JetBrains Mono`.

Signature element: an evidence ruler tracks the sequence from question to data, method and output without turning the page into a newspaper layout.

### Structure

```text
Desktop
+--------------------------------------------------------------+
| brand                         navigation             profile |
+---------+-------------------------+--------------------------+
| evidence| identity + thesis       | research/project index   |
| ruler   | featured paper preview | supporting dashboard     |
+---------+-------------------------+--------------------------+
| question -> data -> method -> output / next project preview  |
+--------------------------------------------------------------+

Mobile
+------------------------------+
| brand                  menu   |
| identity + thesis             |
| featured paper preview       |
| evidence sequence            |
| supporting dashboard        |
| project index               |
+------------------------------+
```

## Shared Production Rules

- All counts and project labels must come from the future TypeScript content model; no hard-coded decorative metrics.
- Correct the confirmed K12 label to Power BI and use six as the current project count.
- The resume is excluded from the public build by default because it contains a phone number and email address.
- Use the existing project screenshots and PDF previews as the primary media.
- Mobile is a reordered single-column flow, not a scaled desktop collage.
- Images receive stable aspect ratios, loading states and error fallbacks.
- Motion is limited to page entrance, selection changes and route context, with a complete reduced-motion path.
- Production icons are locally bundled. No runtime CDN is allowed.
- The concept pages are approval artifacts, not production implementation.

## Figma Import Checklist

When a Figma file and callable tool become available, create these in order:

1. Variables: color, spacing, radius, border, shadow and motion duration.
2. Text styles: display signature, Chinese display, body, utility and data labels.
3. Components: site header, icon button, text button, project media frame, method row, project index row, media fallback and mobile navigation.
4. Screens: desktop home, mobile home, dashboard list, research list, About and project detail.
5. Validate each major component and screen with a screenshot before moving to the next group.

The accepted direction and implementation decision log are in `DECISION.md`. The React/Vite implementation proposal is in `implementation-plan.md`.
