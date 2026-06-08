import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import SubmitTaskForm from "@/components/forms/SubmitTaskForm";


export default async function UserTaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    notFound();
  }

  return (
    <main className="p-8">

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
        <SubmitTaskForm taskId={task.id} />
      </div>

    </main>
  );
}