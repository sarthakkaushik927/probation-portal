"use client";

import { useRouter } from "next/navigation";

import TaskForm from "@/components/forms/TaskForm";
import { createTask } from "@/actions/task/create-task";

export default function CreateTaskPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Create Task
      </h1>

      <TaskForm
        onSubmit={async (
          title,
          description,
          domain,
          deadline
        ) => {
          await createTask(
            title,
            description,
            domain,
            deadline
          );

          router.replace("/admin/tasks");
        }}
      />
    </div>
  );
}