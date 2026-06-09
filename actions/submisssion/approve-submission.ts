"use server";

import { prisma } from "@/lib/prisma";

export async function approveSubmission(
  submissionId: string
) {
  await prisma.submission.update({
    where: {
      id: submissionId,
    },

    data: {
      status: "APPROVED",
    },
  });
}