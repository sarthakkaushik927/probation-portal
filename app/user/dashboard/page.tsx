import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default async function UserDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const tasks = await prisma.task.findMany({
    where: {
      domain: user?.domain ?? undefined,
    },
  });

  const submissions =
    await prisma.submission.findMany({
      where: {
        userId: session.user.id,
      },
    });

  return (
    <main className="p-8">

      <PageHeader
        title={`Welcome, ${user?.name ?? "User"} 👋`}
        description="Overview of your probation progress"
      />

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <DashboardCard>
          <h3 className="text-sm text-muted-foreground">
            Assigned Tasks
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {tasks.length}
          </p>
        </DashboardCard>

        <DashboardCard>
          <h3 className="text-sm text-muted-foreground">
            Domain
          </h3>

          <p className="mt-2 text-2xl font-bold">
            {user?.domain ?? "Not Assigned"}
          </p>
        </DashboardCard>

        <DashboardCard>
          <h3 className="text-sm text-muted-foreground">
            Submissions
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {submissions.length}
          </p>
        </DashboardCard>

      </div>

    </main>
  );
}