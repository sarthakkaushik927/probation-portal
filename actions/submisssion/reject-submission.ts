"use server";

import { prisma } from "@/lib/prisma";

export async function rejectSubmission(
  submissionId: string
) {
  await prisma.submission.update({
    where: {
      id: submissionId,
    },

    data: {
      status: "REJECTED",
    },
  });
}