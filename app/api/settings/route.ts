import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // store, payment, homepage, or all

  if (type === "payment") {
    const settings = await prisma.paymentSettings.findUnique({ where: { id: "default" } });
    return NextResponse.json({ settings });
  }

  if (type === "homepage") {
    const settings = await prisma.homepageSettings.findUnique({ where: { id: "default" } });
    return NextResponse.json({ settings });
  }

  if (type === "store") {
    const settings = await prisma.storeSettings.findUnique({ where: { id: "default" } });
    return NextResponse.json({ settings });
  }

  const [store, payment, homepage] = await Promise.all([
    prisma.storeSettings.findUnique({ where: { id: "default" } }),
    prisma.paymentSettings.findUnique({ where: { id: "default" } }),
    prisma.homepageSettings.findUnique({ where: { id: "default" } }),
  ]);

  return NextResponse.json({ store, payment, homepage });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === "store") {
      const updated = await prisma.storeSettings.upsert({
        where: { id: "default" },
        update: data,
        create: { id: "default", ...data },
      });
      return NextResponse.json({ success: true, settings: updated });
    }

    if (type === "payment") {
      const updated = await prisma.paymentSettings.upsert({
        where: { id: "default" },
        update: data,
        create: { id: "default", ...data },
      });
      return NextResponse.json({ success: true, settings: updated });
    }

    if (type === "homepage") {
      const updated = await prisma.homepageSettings.upsert({
        where: { id: "default" },
        update: data,
        create: { id: "default", ...data },
      });
      return NextResponse.json({ success: true, settings: updated });
    }

    return NextResponse.json({ error: "Invalid settings type" }, { status: 400 });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
