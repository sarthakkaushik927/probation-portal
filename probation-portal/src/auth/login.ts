"use server";


import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function handleLogin(
  email:string,
  password:string,
) {
  const User=await prisma.user.findUnique({
    where:{
      
      email,
    },
  });
  if(!User) throw new Error("User not found! kindly signup first");
  const validPassword=await bcrypt.compare(password,User.password);
  if(!validPassword) {
    throw new Error("Incorrect Password");
    
  }
  return {
    id:User.id,
    email: User.email,
    role: User.role,
  }
}