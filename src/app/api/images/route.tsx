import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const allImages = await prisma.imageType.findMany();

    if (allImages) {
      return NextResponse.json(allImages, { status: 200 });
    }

    return NextResponse.json({ message: "No images found" }, { status: 404 });
  } catch (error) {
    console.error(error);
  }
}
