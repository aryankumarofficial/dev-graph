# DevGraph

> A graph-powered developer intelligence platform for exploring relationships between developers, skills, technologies, projects, and companies.

DevGraph is an interactive knowledge graph application built with **Next.js** and **CognoDB**. It transforms developer information into connected graph data, allowing users to explore how developers relate to their skills, technologies, projects, and companies.

---

## ✨ Features

- 👨‍💻 **Developer Profiles**
  - Browse developer profiles
  - View developer skills and associated projects
  - Explore individual developer connections

- 🕸️ **Interactive Knowledge Graph**
  - Visualize relationships between graph entities
  - Interactive node-based exploration
  - Zoom, pan, fit-to-view, and minimap support
  - Filter graph relationships

- 🔗 **Graph Relationships**
  - `HAS_SKILL`
  - `RELATED_TO`
  - `BUILT`
  - `USES`
  - `BELONGS_TO`

- 📊 **Graph Overview**
  - Total developers
  - Total skills
  - Total technologies
  - Total projects
  - Total companies

- 🌓 **Dark / Light Theme**
  - System theme detection
  - Manual theme switching
  - Theme-aware graph controls

- 🔎 **SEO Optimized**
  - Metadata configuration
  - Open Graph metadata
  - Twitter metadata
  - Canonical URLs
  - Search engine robots configuration

- 🚫 **Custom Error Pages**
  - Global 404 page
  - Developer-specific 404 page
  - Graph-specific 404 page

- 📱 **Responsive UI**
  - Responsive layouts
  - Mobile-friendly components
  - Adaptive navigation

---

## 🖥️ Screenshots

### Homepage

The homepage provides an overview of the DevGraph platform along with graph statistics and developer profiles.

### Developer Graph

The graph view visualizes relationships around a selected developer.

Example relationship flow:

```text
Developer
    │
    ├── HAS_SKILL ──> Skill
    │                    │
    │                    └── RELATED_TO ──> Technology
    │
    └── BUILT ──> Project
                       │
                       ├── USES ──> Technology
                       │
                       └── BELONGS_TO ──> Company
````

---

## 🧱 Tech Stack

### Frontend

* [Next.js](https://nextjs.org/)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* React Flow

### Backend / Data

* CognoDB
* Graph queries
* Next.js server-side data fetching

### Development

* ESLint
* Turbopack
* Git
* npm / pnpm / Bun

---

## 📂 Project Structure

```text
dev-graph/
├── public/
│
├── src/
│   ├── app/
│   │   ├── developers/
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── not-found.tsx
│   │   │
│   │   ├── graph/
│   │   │   ├── page.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── graph-view.tsx
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   │
│   ├── lib/
│   │   ├── cognodb.ts
│   │   └── utils.ts
│   │
│   └── types/
│       └── ...
│
├── .env.local
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AryanKumarOfficial/dev-graph.git
cd dev-graph
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

Using Bun:

```bash
bun install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
# app settings
NEXT_PUBLIC_APP_URL=http://localhost:3000

# cognodb
COGNODB_URI=bolt+s://INSTANCE.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=PASSWORD
```

> Use the environment variable names required by your CognoDB connection implementation in `src/lib/cognodb.ts`.

### 4. Start the development server

```bash
npm run dev
```

or:

```bash
pnpm dev
```

or:

```bash
bun dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🧭 Application Routes

| Route                   | Description                            |
| ----------------------- | -------------------------------------- |
| `/`                     | DevGraph overview and statistics       |
| `/developers`           | Browse all developers                  |
| `/developers/[id]`      | View an individual developer           |
| `/graph?developer=[id]` | Explore a developer's connection graph |

### Examples

```text
/
```

```text
/developers
```

```text
/developers/dev-001
```

```text
/graph?developer=dev-001
```

---

## 🕸️ Graph Architecture

DevGraph represents information as connected entities rather than isolated records.

### Entity Types

```text
Developer
Skill
Technology
Project
Company
```

### Relationships

```text
Developer ──HAS_SKILL──> Skill

Skill ──RELATED_TO──> Technology

Developer ──BUILT──> Project

Project ──USES──> Technology

Project ──BELONGS_TO──> Company
```

This structure makes it possible to traverse the graph from a developer to their technical skills, technologies, projects, and associated companies.

---

## 📊 Graph Overview

The dashboard displays aggregate counts from the graph:

```text
Developers       Skills       Technologies       Projects       Companies
    5              8               7                5              3
```

These values are retrieved dynamically from CognoDB rather than being hard-coded in the UI.

---

## 🎨 Theme System

DevGraph supports:

* Light theme
* Dark theme
* System theme detection

The application uses `next-themes` for theme management.

Theme-aware React Flow components use CSS variables so graph controls, minimaps, backgrounds, borders, and text adapt automatically when the theme changes.

---

## 🚫 Error Handling

DevGraph provides route-specific error experiences.

### Global 404

```text
src/app/not-found.tsx
```

Used for routes that don't exist anywhere in the application.

### Developer 404

```text
src/app/developers/[id]/not-found.tsx
```

Used when a requested developer does not exist.

For example:

```text
/developers/invalid-id
```

### Graph 404

```text
src/app/graph/not-found.tsx
```

Used when a requested developer graph cannot be found.

For example:

```text
/graph?developer=invalid-id
```

---

## 🔍 SEO

DevGraph includes application-level metadata through Next.js Metadata API.

Configured metadata includes:

* Page title
* Description
* Keywords
* Author
* Creator
* Canonical URL
* Open Graph metadata
* Twitter card metadata
* Robots directives
* Application name

The default title is:

```text
DevGraph — Developer Knowledge Graph
```

Individual routes can define their own metadata using Next.js route-level metadata.

---

## 🧩 UI Architecture

The application uses reusable components for common interface elements.

### Navigation

The global navbar provides access to:

```text
Overview
Developers
Graph
```

It also contains:

* Theme toggle
* Explore Graph action
* Sticky navigation

### Footer

The global footer provides:

* DevGraph branding
* Application description
* Navigation links
* Technology attribution
* Copyright information

---

## 🔄 Data Flow

The application follows a server-driven data flow:

```text
CognoDB
   │
   ▼
Graph Query
   │
   ▼
Server-side Data Function
   │
   ▼
Next.js Page
   │
   ▼
React Components
   │
   ▼
Interactive UI
```

For graph visualization:

```text
CognoDB
   │
   ▼
Developer + Relationships
   │
   ▼
Graph Nodes / Edges
   │
   ▼
React Flow
   │
   ▼
Interactive Knowledge Graph
```

---

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## 📌 Future Improvements

Potential improvements include:

* 🔎 Developer and technology search
* 🧠 Graph-based recommendations
* 📈 Graph analytics and relationship statistics
* 🔍 Advanced relationship filtering
* 🧑‍💻 More detailed developer profiles
* 🏢 Company profiles
* 🛠️ Technology detail pages
* 📊 Interactive graph analytics
* 🔗 Multi-hop relationship exploration
* 📱 Improved mobile graph interaction
* ⚡ Graph query caching
* 🔐 Authentication and personalized graph exploration

---

## 👨‍💻 Author

**Aryan Kumar**

Full-Stack Developer | B.Tech CSE

GitHub:
[https://github.com/AryanKumarOfficial](https://github.com/AryanKumarOfficial)

---

## 📄 License

This project is developed as part of a technical assignment/project and is intended for educational and demonstration purposes.
