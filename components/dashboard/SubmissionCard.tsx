"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { approveSubmission } from "@/actions/submisssion/approve-submission";
import { rejectSubmission } from "@/actions/submisssion/reject-submission";
import { Link } from "lucide-react";



export default function SubmissionCard({
  submission,
}: {
  submission: any;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  return (
    <Link
  href={`/admin/submissions/${submission.id}`}
>
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {submission.user.name}
        </h2>

        <p className="text-muted-foreground">
          {submission.task.title}
        </p>
      </div>

      <div className="space-y-2">

        <p>
          <strong>Github:</strong>{" "}
          <a
            href={submission.githubLink}
            target="_blank"
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

      <div className="mt-6 flex gap-3">

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
          Approve
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
          Reject
        </Button>

      </div>

    </div>
    </Link>
  );
}