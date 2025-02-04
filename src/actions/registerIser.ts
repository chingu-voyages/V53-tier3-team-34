// "use server";

// import prisma from "@/../prisma/client";
// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";

// export async function RegisterUser({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   try {
//     if (!email) {
//       return {
//         status: 400,
//         body: "Email field required",
//       };
//     }

//     if (!password) {
//       return {
//         status: 400,
//         body: "Password field required",
//       };
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       return {
//         status: 400,
//         body: "User already exists",
//       };
//     }

//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json(user, {
//       status: 201,
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return {
//       status: 500,
//       body: "Error creating user",
//     };
//   }
// }



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
  try {
    if (!email) {
      return { status: 400, message: "Email field required" };
    }

    if (!password) {
      return { status: 400, message: "Password field required" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { status: 400, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return { status: 201, user }; // ✅ Return plain object
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: 500, message: "Error creating user" };
  }
}
