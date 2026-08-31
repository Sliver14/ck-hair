import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/formatters";
import { ShoppingBag, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export const revalidate = 0;

interface OrdersPageProps {
  searchParams: { status?: string; type?: string };
}

export default async function AdminOrdersPage({ searchParams }: OrdersPageProps) {
  const { status, type } = searchParams;

  const where: any = {};
  if (status) where.status = status;
  if (type === "preorder") where.isPreorder = true;
  if (type === "regular") where.isPreorder = false;

  const [orders, counts] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "AWAITING_PAYMENT" } }),
      prisma.order.count({
        where: {
          status: { in: ["PROCESSING", "PREORDER_PROCESSING", "PREPARING_ORDER", "READY_FOR_DELIVERY"] },
        },
      }),
      prisma.order.count({ where: { isPreorder: true } }),
      prisma.order.count({ where: { status: "COMPLETED" } }),
    ]),
  ]);

  const [totalAll, totalAwaiting, totalProcessing, totalPreorder, totalCompleted] = counts;

  const filterTabs = [
    { label: "All Orders", count: totalAll, href: "/admin/orders" },
    { label: "Awaiting Payment", count: totalAwaiting, href: "/admin/orders?status=AWAITING_PAYMENT" },
    { label: "Processing", count: totalProcessing, href: "/admin/orders?status=PROCESSING" },
    { label: "Pre-Orders", count: totalPreorder, href: "/admin/orders?type=preorder" },
    { label: "Completed", count: totalCompleted, href: "/admin/orders?status=COMPLETED" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
          ORDER MANAGEMENT ({orders.length})
        </h1>
        <p className="text-xs text-brand-muted mt-0.5">
          Review customer purchases, verify GTBank direct transfers, and manage delivery lifecycles.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab, idx) => (
          <Link
            key={idx}
            href={tab.href}
            className="px-4 py-2 rounded-xl bg-white border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-dark hover:border-brand-dark transition-all whitespace-nowrap flex items-center gap-2 shadow-2xs"
          >
            <span>{tab.label}</span>
            <span className="px-2 py-0.5 rounded-full bg-brand-sand text-[10px] text-brand-muted font-bold">
              {tab.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <ShoppingBag className="w-8 h-8 text-brand-muted mx-auto stroke-[1.2]" />
            <p className="text-sm font-semibold text-brand-dark">No orders found in this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF8] text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border">
                <tr>
                  <th className="py-4 px-6">Order Ref</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Pieces</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Order Status</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sand">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-brand-sand/30 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-brand-dark">
                      <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                        {ord.orderNumber}
                      </Link>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-semibold text-brand-dark">{ord.customerName}</p>
                      <p className="text-[10px] text-brand-muted">{ord.customerPhone}</p>
                      <p className="text-[10px] text-brand-muted">{ord.city}, {ord.state}</p>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-medium text-brand-dark">{ord.items.length} item(s)</p>
                      <p className="text-[10px] text-brand-muted truncate max-w-[140px]">
                        {ord.items[0]?.productNameSnapshot}
                      </p>
                    </td>

                    <td className="py-4 px-6 font-bold text-brand-dark">
                      {formatPrice(ord.total)}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                          ord.paymentStatus === "PAYMENT_CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : ord.paymentStatus === "PAYMENT_SUBMITTED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ord.paymentStatus.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        {ord.isPreorder && (
                          <Clock className="w-3 h-3 text-purple-600 flex-shrink-0" />
                        )}
                        <span className="font-semibold text-brand-dark">
                          {ord.status.replace(/_/g, " ")}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-brand-muted text-[11px]">
                      {formatDate(ord.createdAt)}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/admin/orders/${ord.id}`}
                        className="px-4 py-1.5 rounded-xl bg-brand-sand hover:bg-brand-dark hover:text-white transition-all text-xs font-semibold"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
