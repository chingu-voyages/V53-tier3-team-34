import getTrendingEvents from "@/actions/getTrendingEvents";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  console.log("SLUG", slug);
  switch (slug) {
    case "getTrendingEvents":
      await getTrendingEvents();
      break;
    case "getFilteredEvents":
      break;
    default:
      NextResponse.json({ message: "Method not allowed" }, { status: 405 });
      break;
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;

  switch (slug) {
    default:
      NextResponse.json({ message: "Method not allowed" }, { status: 405 });
      break;
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
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
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  switch (slug) {
    default:
      NextResponse.json({ message: "Method not allowed" }, { status: 405 });
      break;
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
