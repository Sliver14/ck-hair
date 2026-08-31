import React from "react";
import Link from "next/link";
import { getDashboardMetrics } from "@/lib/db/analytics";
import { formatPrice, formatDate } from "@/lib/formatters";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Package,
  Users,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  const statCards = [
    {
      label: "TOTAL REVENUE",
      value: formatPrice(metrics.totalSales),
      subtitle: "Verified bank payments",
      icon: DollarSign,
      color: "text-brand-dark bg-brand-sand",
    },
    {
      label: "TOTAL ORDERS",
      value: metrics.totalOrders,
      subtitle: `${metrics.completedOrders} completed orders`,
      icon: ShoppingBag,
      color: "text-blue-900 bg-blue-50",
    },
    {
      label: "AWAITING PAYMENT",
      value: metrics.awaitingPaymentOrders,
      subtitle: "Pending transfer verification",
      icon: AlertCircle,
      color: "text-amber-900 bg-amber-50",
    },
    {
      label: "ACTIVE PRE-ORDERS",
      value: metrics.preorders,
      subtitle: "Artisan batch pipeline",
      icon: Clock,
      color: "text-purple-900 bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
            STORE OVERVIEW
          </h1>
          <p className="text-xs text-brand-muted mt-0.5">
            Real-time business performance, order processing, and catalog status.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-white border border-brand-border rounded-xl text-xs font-semibold uppercase tracking-wider text-brand-dark hover:border-brand-dark transition-all"
          >
            Manage Orders
          </Link>
          <Link
            href="/admin/preorders"
            className="px-4 py-2.5 bg-white border border-brand-border rounded-xl text-xs font-semibold uppercase tracking-wider text-brand-dark hover:border-brand-dark transition-all"
          >
            Pre-Orders
          </Link>
        </div>
      </div>

      {/* Metrics 4-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-brand-muted">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
                  {card.value}
                </p>
                <p className="text-[11px] text-brand-muted mt-1 font-light">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-brand-border/60 text-center">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">Processing</span>
          <span className="text-xl font-bold text-brand-dark mt-1 block">{metrics.processingOrders}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-brand-border/60 text-center">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">Delivered</span>
          <span className="text-xl font-bold text-brand-dark mt-1 block">{metrics.completedOrders}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-brand-border/60 text-center">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">Active Products</span>
          <span className="text-xl font-bold text-brand-dark mt-1 block">{metrics.productsCount}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-brand-border/60 text-center">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">Total Customers</span>
          <span className="text-xl font-bold text-brand-dark mt-1 block">{metrics.customersCount}</span>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-brand-border/60 flex items-center justify-between">
          <div>
            <h2 className="font-serif-luxury text-lg font-bold text-brand-dark">
              RECENT STORE ORDERS
            </h2>
            <p className="text-xs text-brand-muted">Latest customer purchases and bank payments</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-wider font-semibold text-brand-dark hover:text-brand-gold flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF8] text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-6">Order Ref</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Payment</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sand">
              {metrics.recentOrders.map((ord: any) => (
                <tr key={ord.id} className="hover:bg-brand-sand/30 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-brand-dark">
                    <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                      {ord.orderNumber}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-brand-dark">{ord.customerName}</p>
                    <p className="text-[10px] text-brand-muted">{ord.city}, {ord.state}</p>
                  </td>
                  <td className="py-4 px-6">
                    {ord.isPreorder ? (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        Pre-Order
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Regular
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 font-bold text-brand-dark">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        ord.paymentStatus === "PAYMENT_CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ord.paymentStatus.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-brand-dark">
                    {ord.status.replace(/_/g, " ")}
                  </td>
                  <td className="py-4 px-6 text-brand-muted text-[11px]">
                    {formatDate(ord.createdAt)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="px-3 py-1 rounded-lg bg-brand-sand hover:bg-brand-dark hover:text-white transition-all text-xs font-semibold"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
