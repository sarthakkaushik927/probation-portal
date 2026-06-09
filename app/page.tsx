import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin/dashboard");
    }

    redirect("/user/dashboard");
  }

  return (
    <main className="flex min-h-[90vh] items-center justify-center px-6">
      <div className="mx-auto max-w-5xl text-center">

        <div className="inline-flex rounded-full border px-4 py-2 text-sm backdrop-blur">
          🚀 Probation Management System
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Manage Tasks.
          <br />
          Track Progress.
          <br />
          Review Submissions.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          A modern portal for assigning probation tasks,
          tracking progress, reviewing submissions,
          and managing trainees efficiently.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/auth/signup">
            <Button size="lg">
              Get Started
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button
              variant="outline"
              size="lg"
            >
              Login
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border p-6">
            <h3 className="text-xl font-semibold">
              Task Assignment
            </h3>

            <p className="mt-3 text-muted-foreground">
              Admins can assign tasks to users
              across multiple domains.
            </p>
          </div>

          <div className="rounded-3xl border p-6">
            <h3 className="text-xl font-semibold">
              Submission Tracking
            </h3>

            <p className="mt-3 text-muted-foreground">
              Monitor Github and Demo submissions
              in one place.
            </p>
          </div>

          <div className="rounded-3xl border p-6">
            <h3 className="text-xl font-semibold">
              Progress Analytics
            </h3>

            <p className="mt-3 text-muted-foreground">
              Track completion rates and
              probation performance.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}