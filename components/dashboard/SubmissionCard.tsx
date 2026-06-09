"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { approveSubmission } from "@/actions/submisssion/approve-submission";
import { rejectSubmission } from "@/actions/submisssion/reject-submission";

export default function SubmissionCard({
  submission,
}: {
  submission: any;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            {submission.user.name}
          </h2>

          <p className="text-muted-foreground">
            {submission.task.title}
          </p>
        </div>

        <Link
          href={`/admin/submissions/${submission.id}`}
          className="text-sm font-medium text-blue-500 underline"
        >
          Review Submission
        </Link>

      </div>

      <div className="space-y-2">

        <p>
          <strong>Github:</strong>{" "}
          <a
            href={submission.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open Repository
          </a>
        </p>

        <p>
          <strong>Demo:</strong>{" "}
          <a
            href={submission.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open Demo
          </a>
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {submission.status}
        </p>

        {submission.remarks && (
          <p>
            <strong>Remarks:</strong>{" "}
            {submission.remarks}
          </p>
        )}

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

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
  );
}