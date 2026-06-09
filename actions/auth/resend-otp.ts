"use server";

import { sendOTP } from "./send-otp";

export async function resendOTP(
  email: string
) {
  await sendOTP(email);

  return {
    success: true,
  };
}   