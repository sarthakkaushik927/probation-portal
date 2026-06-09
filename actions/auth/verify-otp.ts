"use server";

import { prisma } from "@/lib/prisma";

export async function verifyOTP(
  email: string,
  code: string
) {
  const otp =
    await prisma.oTP.findFirst({
      where: {
        email,
        code,
      },
    });

  if (!otp) {
    throw new Error("Invalid OTP");
  }

  if (
    otp.expiresAt < new Date()
  ) {
    throw new Error("OTP Expired");
  }

  await prisma.user.update({
    where: {
      email,
    },

    data: {
      isVerified: true,
    },
  });

  await prisma.oTP.delete({
    where: {
      id: otp.id,
    },
  });

  return true;
}