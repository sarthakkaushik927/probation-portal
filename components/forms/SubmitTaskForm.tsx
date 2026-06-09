"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DashboardCard from "@/components/dashboard/DashboardCard";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import { Button } from "@/components/ui/button";
import { createSubmission } from "@/actions/submisssion/create-submission";



export default function SubmitTaskForm({
  taskId,
}: {
  taskId: string;
}) {
  const router = useRouter();

  const [githubLink, setGithubLink] =
    useState("");

  const [demoLink, setDemoLink] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  return (
    <DashboardCard>

      <h2 className="mb-6 text-2xl font-semibold">
        Submit Task
      </h2>

      <div className="space-y-5">

        <FormInput
          label="Github Link"
          value={githubLink}
          onChange={setGithubLink}
          placeholder="https://github.com/..."
        />

        <FormInput
          label="Demo Link"
          value={demoLink}
          onChange={setDemoLink}
          placeholder="https://..."
        />

        <FormTextarea
          label="Remarks"
          value={remarks}
          onChange={setRemarks}
          placeholder="Anything you'd like to mention..."
        />

        <Button
          disabled={loading}
          className="w-full"
          onClick={async () => {
            setLoading(true);

            try {
              await createSubmission(
                taskId,
                githubLink,
                demoLink,
                remarks
              );

              alert(
                "Submission Successful"
              );

              router.refresh();
            } catch {
              alert(
                "Submission Failed"
              );
            }

            setLoading(false);
          }}
        >
          {loading
            ? "Submitting..."
            : "Submit Task"}
        </Button>

      </div>

    </DashboardCard>
  );
}