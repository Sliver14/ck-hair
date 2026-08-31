"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/formatters";
import { Clock, CheckCircle2, PackageCheck, AlertCircle, ArrowRight } from "lucide-react";

interface PreorderManagerProps {
  orders: any[];
  preorderProducts: any[];
}

export function PreorderManager({
  orders: initialOrders,
  preorderProducts,
}: PreorderManagerProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [isUpdating, setIsUpdating] = useState(false);
  const [msg, setMsg] = useState("");

  const handleMarkBatchArrived = async (productName: string) => {
    setIsUpdating(true);
    setMsg("");
    try {
      // Find all eligible preorders for this product that are in PREORDER_PROCESSING
      const matching = orders.filter(
        (o) =>
          o.isPreorder &&
          (o.status === "PREORDER_PROCESSING" || o.status === "AWAITING_PAYMENT") &&
          o.items.some((i: any) => i.productNameSnapshot === productName)
      );

      for (const ord of matching) {
        await fetch(`/api/orders/${ord.id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "STOCK_ARRIVED",
            note: `Supplier batch stock arrived for ${productName}`,
            changedBy: "CK Atelier Admin",
          }),
        });
      }

      setMsg(`Updated ${matching.length} pre-order(s) for "${productName}" to STOCK ARRIVED.`);
      // Reload updated orders
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders.filter((o: any) => o.isPreorder));
    } catch (e) {
      console.error(e);
      setMsg("Failed to process batch stock arrival.");
    } finally {
      setIsUpdating(false);
    }
  };

  const totalPreorderRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
          PRE-ORDERS ATELIER MANAGEMENT
        </h1>
        <p className="text-xs text-brand-muted mt-0.5">
          Track bespoke customer reservations, supplier manufacturing batches, and stock arrival triggers.
        </p>
      </div>

      {msg && (
        <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">
            Total Pre-Orders
          </span>
          <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
            {orders.length} Units
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">
            Pre-Order Value
          </span>
          <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
            {formatPrice(totalPreorderRevenue)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">
            Active Atelier Pieces
          </span>
          <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
            {preorderProducts.length} Models
          </p>
        </div>
      </div>

      {/* Pre-Order Product Batches */}
      <div className="space-y-4">
        <h2 className="font-serif-luxury text-lg font-bold text-brand-dark">
          Artisan Product Batches
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preorderProducts.map((prod) => {
            const productOrders = orders.filter((o) =>
              o.items.some((i: any) => i.productNameSnapshot === prod.name)
            );
            const processingCount = productOrders.filter(
              (o) => o.status === "PREORDER_PROCESSING"
            ).length;

            return (
              <div
                key={prod.id}
                className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={prod.images?.[0]?.url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80"}
                    alt={prod.name}
                    className="w-16 h-20 rounded-xl object-cover bg-brand-sand flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-serif-luxury text-base font-bold text-brand-dark">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-brand-muted">
                      Fulfillment: <span className="font-semibold text-brand-dark">{prod.preorderDuration || "2–4 weeks"}</span>
                    </p>
                    <p className="text-xs text-brand-muted">
                      Total Orders: <span className="font-bold text-brand-dark">{productOrders.length}</span> ({processingCount} in production)
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-sand flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-brand-dark">
                    {formatPrice(prod.price)} / unit
                  </span>

                  <button
                    onClick={() => handleMarkBatchArrived(prod.name)}
                    disabled={isUpdating || productOrders.length === 0}
                    className="px-4 py-2 bg-brand-dark hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all disabled:opacity-40"
                  >
                    <span>Trigger: Stock Arrived</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pre-Orders Table */}
      <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-brand-border/60">
          <h2 className="font-serif-luxury text-lg font-bold text-brand-dark">
            All Pre-Order Customer Inquiries & Purchases
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF8] text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border">
              <tr>
                <th className="py-4 px-6">Order Ref</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Unit</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Atelier Status</th>
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
                  </td>
                  <td className="py-4 px-6 font-medium text-brand-dark">
                    {ord.items[0]?.productNameSnapshot}
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
                  <td className="py-4 px-6 font-semibold text-brand-dark">
                    {ord.status.replace(/_/g, " ")}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="px-3 py-1 bg-brand-sand hover:bg-brand-dark hover:text-white rounded-lg transition-all text-xs font-semibold"
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
