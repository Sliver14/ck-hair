import { prisma } from "@/lib/prisma";

export async function getDashboardMetrics() {
  const [
    totalOrders,
    completedOrders,
    awaitingPaymentOrders,
    processingOrders,
    preorders,
    productsCount,
    customersCount,
    allOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "COMPLETED" } }),
    prisma.order.count({ where: { status: "AWAITING_PAYMENT" } }),
    prisma.order.count({
      where: {
        status: { in: ["PROCESSING", "PREORDER_PROCESSING", "PREPARING_ORDER", "READY_FOR_DELIVERY"] },
      },
    }),
    prisma.order.count({ where: { isPreorder: true } }),
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.customer.count(),
    prisma.order.findMany({
      where: {
        paymentStatus: "PAYMENT_CONFIRMED",
      },
      select: { total: true },
    }),
  ]);

  const totalSales = allOrders.reduce((sum, o) => sum + o.total, 0);

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      items: true,
    },
  });

  return {
    totalSales,
    totalOrders,
    completedOrders,
    awaitingPaymentOrders,
    processingOrders,
    preorders,
    productsCount,
    customersCount,
    recentOrders,
  };
}
