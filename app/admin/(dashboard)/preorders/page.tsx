import React from "react";
import { prisma } from "@/lib/prisma";
import { PreorderManager } from "@/components/admin/PreorderManager";

export const revalidate = 0;

export default async function AdminPreordersPage() {
  const [orders, preorderProducts] = await Promise.all([
    prisma.order.findMany({
      where: { isPreorder: true },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: {
        OR: [{ availability: "PREORDER" }, { preorderEnabled: true }],
      },
      include: { images: true },
    }),
  ]);

  return (
    <PreorderManager
      orders={JSON.parse(JSON.stringify(orders))}
      preorderProducts={JSON.parse(JSON.stringify(preorderProducts))}
    />
  );
}
