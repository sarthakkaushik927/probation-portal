import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

import EditTaskForm from "@/components/forms/EditTaskForm";

export default async function TaskDetailsPage({
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
        description="Edit task"
      />

      <DashboardCard>
        <EditTaskForm task={task} />
      </DashboardCard>

    </main>
  );
}