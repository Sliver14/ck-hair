import React from "react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/formatters";
import { TrendingUp, BarChart3, PieChart, DollarSign, ShoppingBag, Clock } from "lucide-react";

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  const [allOrders, products, categories] = await Promise.all([
    prisma.order.findMany({
      include: { items: true },
    }),
    prisma.product.findMany(),
    prisma.category.findMany(),
  ]);

  const paidOrders = allOrders.filter((o) => o.paymentStatus === "PAYMENT_CONFIRMED");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  const regularCount = allOrders.filter((o) => !o.isPreorder).length;
  const preorderCount = allOrders.filter((o) => o.isPreorder).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
          SALES & REVENUE ANALYTICS
        </h1>
        <p className="text-xs text-brand-muted mt-0.5">
          Performance metrics across regular hair collections and artisan pre-orders.
        </p>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">
            Gross Verified Revenue
          </span>
          <p className="font-serif-luxury text-3xl font-bold text-brand-dark">
            {formatPrice(totalRevenue)}
          </p>
          <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Direct Bank Verified
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">
            Average Order Value (AOV)
          </span>
          <p className="font-serif-luxury text-3xl font-bold text-brand-dark">
            {formatPrice(avgOrderValue)}
          </p>
          <span className="text-xs text-brand-muted font-light">Per customer checkout</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">
            Pre-Order vs In-Stock Ratio
          </span>
          <p className="font-serif-luxury text-3xl font-bold text-brand-dark">
            {preorderCount} : {regularCount}
          </p>
          <span className="text-xs text-brand-gold font-medium">
            {Math.round((preorderCount / Math.max(1, allOrders.length)) * 100)}% Pre-Orders
          </span>
        </div>
      </div>

      {/* Revenue Breakdown by Months Bar Mockup */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
          <h2 className="font-serif-luxury text-lg font-bold text-brand-dark">
            Monthly Performance Trends
          </h2>
          <span className="text-xs text-brand-muted font-medium">CY 2026</span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-4 items-end h-48 pt-6">
          {[
            { month: "Jan", val: 450000, h: "40%" },
            { month: "Feb", val: 620000, h: "55%" },
            { month: "Mar", val: 780000, h: "68%" },
            { month: "Apr", val: 510000, h: "45%" },
            { month: "May", val: 890000, h: "75%" },
            { month: "Jun", val: 950000, h: "82%" },
            { month: "Jul", val: 1100000, h: "90%" },
            { month: "Aug", val: 1250000, h: "100%" },
            { month: "Sep", val: 0, h: "0%" },
            { month: "Oct", val: 0, h: "0%" },
            { month: "Nov", val: 0, h: "0%" },
            { month: "Dec", val: 0, h: "0%" },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
              <div className="w-full max-w-[28px] bg-brand-sand group-hover:bg-brand-dark rounded-t-lg transition-all relative flex flex-col justify-end" style={{ height: bar.h }}>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap font-mono">
                  {bar.val > 0 ? `₦${(bar.val/1000).toFixed(0)}k` : "—"}
                </span>
              </div>
              <span className="text-[10px] text-brand-muted uppercase font-bold">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
