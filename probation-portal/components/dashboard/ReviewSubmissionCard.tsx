"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { approveSubmission } from "@/actions/submisssion/approve-submission";
import { rejectSubmission } from "@/actions/submisssion/reject-submission";



export default function ReviewSubmissionCard({
  submission,
}: {
  submission: any;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  return (
    <main className="mx-auto max-w-4xl p-8">

      <h1 className="mb-8 text-4xl font-bold">
        Submission Review
      </h1>

      <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <div>
          <h3 className="font-semibold">
            User
          </h3>

          <p>{submission.user.name}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Task
          </h3>

          <p>{submission.task.title}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Current Status
          </h3>

          <p>{submission.status}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Github Repository
          </h3>

          <a
            href={submission.githubLink}
            target="_blank"
            className="text-blue-500 underline"
          >
            Open Repository
          </a>
        </div>

        <div>
          <h3 className="font-semibold">
            Demo Link
          </h3>

          <a
            href={submission.demoLink}
            target="_blank"
            className="text-blue-500 underline"
          >
            Open Demo
          </a>
        </div>

        {submission.remarks && (
          <div>
            <h3 className="font-semibold">
              Remarks
            </h3>

            <p>{submission.remarks}</p>
          </div>
        )}

        <div className="flex gap-4">

          <Button
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);

                await approveSubmission(
                  submission.id
                );

                router.refresh();
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading
              ? "Processing..."
              : "Approve"}
          </Button>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);

                await rejectSubmission(
                  submission.id
                );

                router.refresh();
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading
              ? "Processing..."
              : "Reject"}
          </Button>

        </div>

      </div>

    </main>
  );
}