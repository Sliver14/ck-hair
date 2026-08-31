import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrderDetailView } from "@/components/admin/OrderDetailView";

export const revalidate = 0;

interface OrderDetailPageProps {
  params: { id: string };
}

export default async function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { id: params.id },
        { orderNumber: params.id },
      ],
    },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: "desc" } },
      payments: true,
      customer: true,
    },
  });

  if (!order) {
    notFound();
  }

  // Safe JSON serialization for client component boundary
  const serializedOrder = JSON.parse(JSON.stringify(order));

  return <OrderDetailView order={serializedOrder} />;
}
