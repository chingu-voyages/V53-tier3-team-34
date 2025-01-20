"use server";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";

export async function RegisterUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    if (!email) {
      return {
        status: 400,
        body: "Email field required",
      };
    }

    if (!password) {
      return {
        status: 400,
        body: "Password field required",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        status: 400,
        body: "User already exists",
      };
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: 500,
      body: "Error creating user",
    };
  }
}
