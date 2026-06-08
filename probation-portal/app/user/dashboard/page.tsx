import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import UserTaskCard from "@/components/dashboard/UserTaskCard";
import UserSubmissionCard from "@/components/dashboard/UserSubmissionCard";

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

    orderBy: {
      createdAt: "desc",
    },
  });

  const submissions =
    await prisma.submission.findMany({
      where: {
        userId: session.user.id,
      },

      include: {
        task: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="p-8">

      <PageHeader
        title={`Welcome, ${user?.name ?? "User"} 👋`}
        description="Track your assigned tasks"
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

      <div className="mt-10">

        <h2 className="mb-6 text-2xl font-semibold">
          Your Tasks
        </h2>

        {tasks.length === 0 ? (
          <DashboardCard>
            <p className="text-muted-foreground">
              No tasks available for your domain yet.
            </p>
          </DashboardCard>
        ) : (
          <div className="grid gap-6">
            {tasks.map((task) => (
              <UserTaskCard
                key={task.id}
                task={task}
              />
            ))}
          </div>
        )}

      </div>

      <div className="mt-10">

        <h2 className="mb-6 text-2xl font-semibold">
          My Submissions
        </h2>

        {submissions.length === 0 ? (
          <DashboardCard>
            <p className="text-muted-foreground">
              No submissions yet.
            </p>
          </DashboardCard>
        ) : (
          <div className="grid gap-6">
            {submissions.map(
              (submission) => (
                <UserSubmissionCard
                  key={submission.id}
                  submission={submission}
                />
              )
            )}
          </div>
        )}

      </div>

    </main>
  );
}