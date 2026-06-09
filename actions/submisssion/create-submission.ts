"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createSubmission(
  taskId: string,
  githubLink: string,
  demoLink: string,
  remarks: string
) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const existing =
  await prisma.submission.findFirst({
    where: {
      taskId,
      userId: session.user.id,
    },
  });

if (existing) {
  throw new Error(
    "Already submitted"
  );
}

await prisma.submission.create({
  data: {
    taskId,
    userId: session.user.id,
    githubLink,
    demoLink,
    remarks,
  },
});

  return {
    success: true,
  };
}