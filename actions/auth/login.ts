"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function handleLogin(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found! kindly signup first");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Incorrect Password");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}