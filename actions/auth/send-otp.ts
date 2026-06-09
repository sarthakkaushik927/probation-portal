"use server";

import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mail";
import { generateOTP } from "@/lib/otp";

export async function sendOTP(
  email: string
) {
  const otp = generateOTP();

  await prisma.oTP.deleteMany({
    where: {
      email,
    },
  });

  await prisma.oTP.create({
    data: {
      email,
      code: otp,
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Probation Portal OTP",

    html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `,
  });
}