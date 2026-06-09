import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import ReviewSubmissionCard from "@/components/dashboard/ReviewSubmissionCard";



export default async function ReviewSubmissionPage({
  params,
}: {
  params: Promise<{
    submissionId: string;
  }>;
}) {
  const { submissionId } =
    await params;

  const submission =
    await prisma.submission.findUnique({
      where: {
        id: submissionId,
      },

      include: {
        user: true,
        task: true,
      },
    });

  if (!submission) {
    notFound();
  }

  return (
    <ReviewSubmissionCard
      submission={submission}
    />
  );
}