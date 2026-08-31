import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { status: "ACTIVE" },
      create: { email: email.toLowerCase().trim() },
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error: any) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ subscribers });
}
