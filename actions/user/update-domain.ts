"use server";

import { prisma } from "@/lib/prisma";
import { Domain } from "@prisma/client";

export async function updateDomain(
  userId: string,
  domain: string
) {
  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      domain: domain === "UNASSIGNED" ? null : (domain as Domain),
    },
  });

  return {
    success: true,
  };
}