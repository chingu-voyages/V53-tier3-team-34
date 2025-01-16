import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Logged in sucessfully" },
    { status: 200 },
  );
}
