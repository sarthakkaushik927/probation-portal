export default function UserSubmissionCard({
  submission,
}: {
  submission: any;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {submission.task.title}
          </h2>

          <p className="text-sm text-muted-foreground">
            {submission.task.domain}
          </p>
        </div>

        <div>
          {submission.status ===
          "APPROVED" ? (
            <span className="rounded-full border px-3 py-1 text-sm">
              ✅ APPROVED
            </span>
          ) : submission.status ===
            "REJECTED" ? (
            <span className="rounded-full border px-3 py-1 text-sm">
              ❌ REJECTED
            </span>
          ) : (
            <span className="rounded-full border px-3 py-1 text-sm">
              ⏳ PENDING
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Github:</strong>{" "}
          {submission.githubLink}
        </p>

        <p>
          <strong>Demo:</strong>{" "}
          {submission.demoLink}
        </p>

        {submission.remarks && (
          <p>
            <strong>Remarks:</strong>{" "}
            {submission.remarks}
          </p>
        )}
      </div>

    </div>
  );
}