import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import UserTaskCard from "@/components/dashboard/UserTaskCard";

export default async function UserTasksPage() {
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
      OR: [
        ...(user?.domain ? [{ domain: user.domain }] : []),
        { domain: "COMMON" }
      ]
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-4 md:p-8">

      <PageHeader
        title="My Tasks"
        description="Tasks assigned to your domain"
      />

      {tasks.length === 0 ? (
        <DashboardCard>
          <p className="text-muted-foreground">
            No tasks available.
          </p>
        </DashboardCard>
      ) : (
        <div className="mt-8 grid gap-6">
          {tasks.map((task) => (
            <UserTaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      )}

    </main>
  );
}