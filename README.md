# 🚀 Probation Management Portal

A modern, responsive, and robust **Probation Management Portal** built using **Next.js 16 (App Router)**, **TypeScript**, **Prisma ORM**, and **Tailwind CSS v4**. This system is designed to streamline the onboarding and tracking process for trainees and probationers across various domains (Frontend, Backend, Cloud, AI/ML).

---

## 📋 Table of Contents
1. [Features](#-features)
2. [Tech Stack](#%EF%B8%8F-tech-stack)
3. [Project Directory Structure](#-project-directory-structure)
4. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Local Configuration](#local-configuration)
   - [Environment Variables](#environment-variables)
   - [Database Setup & Migrations](#database-setup--migrations)
   - [Running Locally](#running-locally)
5. [Deployment Guide (Vercel)](#-deployment-guide-vercel)
6. [Database Schema Overview](#-database-schema-overview)

---

## 🌟 Features

### 👤 User / Trainee Dashboard
* **Domain Selection**: Trainees can select/update their technical domain (`FRONTEND`, `BACKEND`, `CLOUD`, or `AIML`).
* **Task Management**: View assigned tasks specific to their selected domain along with details like title, description, and strict deadlines.
* **Task Submissions**: Submit completed tasks directly from the dashboard by providing:
  * GitHub Repository URL
  * Hosted Live Demo URL
  * Remarks/Notes
* **Attendance System**: Check-in daily and log attendance status (`PRESENT`, `ABSENT`, `LEAVE`).
* **Visual Progress Tracking**: Monitor tasks completed, pending tasks, and attendance logs.

### 🛡️ Admin Dashboard
* **Metrics & Analytics Overview**: View high-level statistics like total registered trainees, pending submissions, active tasks, and average attendance.
* **User Management**: View all registered users, filter them, inspect domain assignments, track individual progress, and update user domains.
* **Task Creation & Assignment**: 
  * Create tasks specifying domain categories, detailed descriptions, and deadlines.
  * Update tasks dynamically as requirements change.
* **Submission Moderation**: Review all submissions, view codebases (GitHub links) and live previews (Demo links), and approve or reject submissions.
* **Attendance Tracking**: Monitor the attendance records of all trainees.

### 🔒 Authentication & Verification
* **Credentials Sign-in**: Secure login using credentials (email and password).
* **Self Registration**: Users can sign up, hashing passwords using `bcryptjs`.
* **OTP Verification**: Email verification powered by `nodemailer` and Gmail SMTP, sending a secure 6-digit OTP code to trainees upon signing up.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16.2 (App Router)
* **Language**: TypeScript
* **Database Client**: Prisma Client (v6.19.3)
* **Database**: PostgreSQL (e.g. Neon Serverless Postgres)
* **Authentication**: NextAuth.js v5 (Beta)
* **Styling**: Tailwind CSS v4, PostCSS, Radix UI (via shadcn)
* **Email Service**: Nodemailer (via SMTP)
* **Icons**: Lucide React

---

## 📁 Project Directory Structure

```text
probation-portal/
├── actions/              # Server Actions for mutations/logic
│   ├── attendance/       # Attendance logging (save-attendance.ts)
│   ├── auth/             # Authentication logic (signup, login, OTP sending/verification)
│   ├── submisssion/      # Task submissions (create, approve, reject)
│   ├── task/             # Tasks management (create, update)
│   └── user/             # User domain configuration
├── app/                  # Next.js App Router routes & layouts
│   ├── admin/            # Admin route pages (attendance, dashboard, submissions, tasks, users)
│   ├── api/              # API handlers (auth endpoints)
│   ├── auth/             # Auth pages (login, signup, verify-otp)
│   ├── user/             # Trainee route pages (attendance, dashboard, submissions, tasks)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage / Landing page
├── components/           # Reusable UI components
│   ├── attendance/       # Attendance calendar and check-in components
│   ├── auth/             # Signup, login, and verification form components
│   ├── dashboard/        # Metrics, statistics cards, and charts
│   ├── ui/               # Base layout elements (shadcn components)
│   └── sidebar/          # Layout sidebars for Admin/User roles
├── lib/                  # Helper utilities and shared configurations
│   ├── mail.ts           # Nodemailer transport configurations
│   ├── otp.ts            # OTP generation helper
│   ├── prisma.ts         # Singleton Prisma client setup
│   └── utils.ts          # Conditional className merger
├── prisma/               # Prisma schema & migrations
│   ├── schema.prisma     # Main PostgreSQL schema models
│   └── migrations/       # Database migration logs
├── package.json          # Node dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your local environment:
* **Node.js** (v20+ recommended)
* **npm** or **pnpm**
* A running **PostgreSQL** database (or a Neon DB project)

### Local Configuration
1. Clone this repository to your local directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the project.

### Environment Variables
Configure the following environment variables in your `.env` file:

```env
# NextAuth settings
AUTH_URL=http://localhost:3000
AUTH_SECRET=your_next_auth_secret_key # Can generate with `openssl rand -base64 32`

# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?sslmode=require"

# Nodemailer / Gmail SMTP Configurations for OTPs
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password # Must be a 16-character App Password, NOT your regular password
```

> [!NOTE]
> For the `EMAIL_PASS`, you need to set up two-factor authentication on your Gmail account and create an **App Password** from your Google Account settings.

### Database Setup & Migrations
Sync the database schema with your PostgreSQL instance and generate the Prisma Client:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations to apply the schema
npx prisma migrate dev --name init
```

### Running Locally
To launch the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portal.

---

## 🌐 Deployment Guide (Vercel)

When deploying this project to Vercel, some additional configurations must be in place for database client compilation.

### Build Step Optimization
Prisma client must be compiled inside Vercel's build environment before Next.js initiates the static page compilation. The project's build command has been adjusted to run:

```bash
prisma generate && next build
```

This guarantees that the generated Prisma client is always present in `node_modules` during the static pre-rendering phase, preventing compilation errors.

### Vercel Deployment Settings
1. Go to your **Vercel Dashboard** and click **Add New Project**.
2. Link your Git repository.
3. In **Environment Variables**, configure the same keys as the local `.env` file:
   * `DATABASE_URL`
   * `AUTH_SECRET`
   * `AUTH_URL` (Set this to your custom Vercel domain, e.g. `https://your-app.vercel.app`)
   * `EMAIL_USER`
   * `EMAIL_PASS`
4. Deploy the project. The build logs should show:
   * Loaded Prisma config
   * Generated Prisma Client
   * Compiling and optimizing production build successfully.

---

## 🗄️ Database Schema Overview

The system uses five main tables in PostgreSQL, managed via Prisma:

1. **User**: Stores trainee and administrator accounts. Contains field role (`ADMIN` or `USER`), active technical domain (`FRONTEND`, `BACKEND`, `CLOUD`, `AIML`), and verification status.
2. **Task**: Represents domain-specific tasks created by administrators.
3. **Submission**: Links tasks to user submissions. Stores status (`PENDING`, `APPROVED`, `REJECTED`) and submission references (GitHub and Live Demo links).
4. **Attendance**: Tracks day-to-day user attendance status (`PRESENT`, `ABSENT`, `LEAVE`).
5. **OTP**: Stores temporary 6-digit codes generated during user signup along with their expiration timestamp to verify emails securely.
