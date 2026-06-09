"use server";

import { prisma } from "@/lib/prisma";

export async function saveAttendance(
  date: string,
  records: {
    userId: string;
    status:
      | "PRESENT"
      | "ABSENT"
      | "LEAVE";
  }[]
) {
  for (const record of records) {
    await prisma.attendance.upsert({
      where: {
        userId_date: {
          userId: record.userId,
          date: new Date(date),
        },
      },

      update: {
        status: record.status,
      },

      create: {
        userId: record.userId,
        date: new Date(date),
        status: record.status,
      },
    });
  }

  return {
    success: true,
  };
}