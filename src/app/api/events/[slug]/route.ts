import getTrendingEvents from "@/actions/getTrendingEvents";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  console.log("SLUG", slug);
  switch (slug) {
    case "getTrendingEvents":
      return await getTrendingEvents();
    // break;

    case "getFilteredEvents":
      break;

    default:
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    // break;
  }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;

  switch (slug) {
    default:
      NextResponse.json({ message: "Method not allowed" }, { status: 405 });
      break;
  }
}

export async function PUT(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  switch (slug) {
    default:
      NextResponse.json({ message: "Method not allowed" }, { status: 405 });
      break;
  }
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  switch (slug) {
    default:
      NextResponse.json({ message: "Method not allowed" }, { status: 405 });
      break;
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
