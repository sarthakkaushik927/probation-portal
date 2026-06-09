"use server";

import { prisma } from "@/lib/prisma";
import { Domain } from "@prisma/client";

export async function updateTask(
  taskId: string,
  title: string,
  description: string,
  domain: string,
  deadline: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },

    data: {
      title,
      description,
      domain: domain as Domain,
      deadline: new Date(deadline),
    },
  });

  return {
    success: true,
  };
}