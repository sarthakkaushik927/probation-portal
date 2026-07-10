"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import FormSelect from "@/components/forms/FormSelect";

import { Button } from "@/components/ui/button";
import { updateTask } from "@/actions/task/update-task";
import { Task, Domain } from "@prisma/client";

export default function EditTaskForm({
  task,
}: {
  task: Task;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description
  );
  const [domain, setDomain] = useState<Domain>(task.domain);

  const [deadline, setDeadline] = useState(
    task.deadline.toISOString().split("T")[0]
  );

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="space-y-5">

      <FormInput
        label="Title"
        value={title}
        onChange={setTitle}
      />

      <FormTextarea
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <FormSelect
        label="Domain"
        value={domain}
        onChange={(value) => setDomain(value as Domain)}
        options={[
          "FRONTEND",
          "BACKEND",
          "APP",
          "UIUX",
          "CLOUD",
          "ML",
          "COMMON",
        ]}
      />

      <FormInput
        label="Deadline"
        type="date"
        value={deadline}
        onChange={setDeadline}
      />

      <Button
        disabled={loading}
        className="w-full"
        onClick={async () => {
          try {
            setLoading(true);

            await updateTask(
              task.id,
              title,
              description,
              domain,
              deadline
            );

            alert(
              "Task updated successfully"
            );

            router.refresh();
          } catch (error) {
            if (error instanceof Error) {
              alert(error.message);
            } else {
              alert(
                "Something went wrong"
              );
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading
          ? "Saving..."
          : "Save Changes"}
      </Button>

    </div>
  );
}