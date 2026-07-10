# Probation Portal - Project Context & PRD

## Overview
The **Probation Portal** is a role-based assessment and task-tracking platform designed to manage users (probationers) across various technical domains. It features a highly modular architecture, a robust backend, and a dynamic, domain-specific user interface.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16.2 (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon) via Prisma ORM
- **Authentication:** NextAuth v5 (Auth.js)
- **Styling:** Tailwind CSS v4 (with OKLCH color space for themes)
- **UI Components:** Shadcn UI, Radix UI Primitives, `tw-animate-css` (for micro-animations)

---

## 📁 Folder Structure & Architecture
The codebase adheres to solid principles, emphasizing reusable UI components, strict separation of concerns (using Next.js Server Actions), and an uncluttered structure.

```text
probation-portal/
├── actions/                  # Next.js Server Actions (Database mutations)
│   ├── task/                 # e.g., create-task, update-task
│   └── user/                 # e.g., update-domain
├── app/                      # App Router definitions
│   ├── admin/                # Admin routes (Dashboard, Users, Tasks, Submissions, Attendance)
│   ├── api/                  # API routes (Auth handlers)
│   ├── auth/                 # Login / Registration pages
│   ├── user/                 # User routes (Dashboard, Tasks, Submissions)
│   └── globals.css           # Global Tailwind & OKLCH Theme variables
├── components/               # Highly reusable, decoupled UI components
│   ├── dashboard/            # Core dashboard cards and headers
│   │   └── domains/          # DYNAMIC DOMAIN DASHBOARDS (Frontend, Backend, etc.)
│   ├── forms/                # Reusable form elements (Select, Input, TaskForm, DomainForm)
│   ├── sidebar/              # Navigation layout
│   └── ui/                   # Shadcn base components (Buttons, Dialogs, etc.)
├── lib/                      # Utilities (Prisma client singleton, cn utility)
└── prisma/                   # Prisma Schema (schema.prisma) & Migrations
```

---

## 🎭 Domain System & Dynamic Dashboards
The application groups users and tasks into specific technical domains. 
**Available Domains:** `FRONTEND`, `BACKEND`, `APP`, `UIUX`, `CLOUD`, `ML`, `COMMON` (For universal tasks).

### The Dynamic Dashboard Feature
When a user logs in, `app/user/dashboard/page.tsx` dynamically renders an entirely different dashboard component based on their assigned domain. 

**Design Aesthetics per Domain:**
- **FrontendDashboard:** Vibrant OKLCH gradients (pinks/violets), glassmorphism, fluid animations.
- **BackendDashboard:** Terminal-inspired, dark mode dominant (`zinc-950`), matrix green accents, monospace typography.
- **UiuxDashboard:** High-contrast minimalist monochrome (black/white), stark borders, focus on typography and whitespace.
- **AppDashboard:** Mobile-inspired rounded cards (`rounded-[2.5rem]`), vibrant blues/indigos, iOS-style fluid UI.
- **CloudDashboard:** Airy, expansive layouts, light/dark sky blues, soft shadows, floating elements.
- **MlDashboard:** Futuristic, sci-fi aesthetic, grid backgrounds, deep fuchsia/purple accents, data-heavy layout.
- **DefaultDashboard:** Clean, standard layout for users who are currently `UNASSIGNED`.

---

## ⚙️ Core Features & Capabilities

### Admin Capabilities (`/admin/*`)
1. **User Management:** View all users, assign/remove domains (`UNASSIGNED` defaults to `null`).
2. **Task Management:** Create, edit, and assign tasks to specific domains or the `COMMON` domain (mandatory for all).
3. **Submissions:** Review student submissions, view Github/Demo links, update status (`PENDING`, `APPROVED`, `REJECTED`), and leave remarks.
4. **Attendance Management:** Mark user attendance (`PRESENT`, `ABSENT`, `LEAVE`).

### User Capabilities (`/user/*`)
1. **Dashboard:** View progress, domain status, and pending tasks via their domain-specific aesthetic UI.
2. **Tasks View:** Fetches tasks strictly where `domain === user.domain OR domain === 'COMMON'`.
3. **Submissions:** Submit task solutions.
4. **Attendance View:** Check personal attendance history.

---

## 🗄️ Database Schema Summary (Prisma)
- **User:** Contains role (`ADMIN`/`USER`), `Domain?`, authentication details, and relations to Submissions/Attendance.
- **Task:** Contains title, description, `Domain`, deadline.
- **Submission:** Links `User` and `Task`. Contains `githubLink`, `demoLink`, `remarks`, and `status`.
- **Attendance:** Links `User` and `date` with `status`.
- **OTP:** For email verification handling.

---

## 🧠 AI Prompting Guidelines (For Future Agents)
When editing this project, adhere to the following rules:
1. **No Comments:** Do not write inline comments in the code. Keep the codebase clean.
2. **Server Actions:** Use Server Actions in the `actions/` folder for DB writes, not API routes.
3. **Reusable Components:** If creating a new UI piece, isolate it in `components/` and import it. Do not bloat page files.
4. **Theming:** Rely on Tailwind v4 and the existing `oklch` CSS variables in `globals.css` rather than hardcoding hex colors.
