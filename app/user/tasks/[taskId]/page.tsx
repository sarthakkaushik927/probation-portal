import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import SubmitTaskForm from "@/components/forms/SubmitTaskForm";
import TaskSubmitted from "@/components/dashboard/TaskSubmitted";


export default async function UserTaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    notFound();
  }

  const submission = await prisma.submission.findFirst({
    where: {
      taskId: task.id,
      userId: session.user.id,
    },
  });

  return (
    <main className="p-4 md:p-8">

      <PageHeader
        title={task.title}
        description="Task Details"
      />

      <DashboardCard>
        <div className="space-y-5">

          <div>
            <p className="text-sm text-muted-foreground">
              Description
            </p>

            <p>{task.description}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Domain
            </p>

            <p>{task.domain}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Deadline
            </p>

            <p>
              {task.deadline.toLocaleDateString()}
            </p>
          </div>

        </div>
      </DashboardCard>

      <div className="mt-8">
        {submission ? (
          <TaskSubmitted status={submission.status} />
        ) : (
          <SubmitTaskForm taskId={task.id} />
        )}
      </div>

    </main>
  );
}