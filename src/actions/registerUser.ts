"use server";

import prisma from "@/../prisma/client";
import bcrypt from "bcrypt";

export async function RegisterUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already esists");
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}
