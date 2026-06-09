"use server";

import { prisma } from "@/lib/prisma";

export async function createTask(
  title: string,
  description: string,
  domain: any,
  deadline: string
) {

  return await prisma.task.create({
    data: {
      title,
      description,
      domain,
      deadline: new Date(deadline),
    },

  });
}