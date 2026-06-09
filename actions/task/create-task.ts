"use server";

import { prisma } from "@/lib/prisma";
import { Domain } from "@prisma/client";

export async function createTask(
  title: string,
  description: string,
  domain: Domain,
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