import { NextResponse } from "next/server";
import { createOrder, getOrderByNumber } from "@/lib/db/orders";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");

  if (orderNumber) {
    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  }

  // Admin list
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, statusHistory: true, payments: true },
  });

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await createOrder(body);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
