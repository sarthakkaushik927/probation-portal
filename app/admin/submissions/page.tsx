import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import SubmissionCard from "@/components/dashboard/SubmissionCard";

export default async function TaskSubmissionPage() {
  const submissions =
    await prisma.submission.findMany({
      include: {
        user: true,
        task: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="p-8">
      <PageHeader
        title="Submissions"
        description="Review user submissions"
      />

      <div className="mt-8 grid gap-6">
        {submissions.map((submission) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
          />
        ))}
      </div>
    </main>
  );
}