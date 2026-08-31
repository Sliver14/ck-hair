import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrderDetailView } from "@/components/admin/OrderDetailView";

export const revalidate = 0;

interface OrderDetailPageProps {
  params: { id: string };
}

export default async function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
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

  return <OrderDetailView order={order} />;
}
