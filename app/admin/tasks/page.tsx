import Link from "next/link";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import TaskCard from "@/components/dashboard/TaskCard";
import { Button } from "@/components/ui/button";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Tasks"
          description="Manage probation tasks"
        />

        <Link href="/admin/tasks/create">
          <Button>
            Create Task
          </Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </main>
  );
}