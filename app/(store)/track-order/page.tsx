"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice, formatDate } from "@/lib/formatters";
import { OrderTimeline } from "@/components/store/OrderTimeline";
import { Search, Package, Clock, ShieldCheck, AlertCircle } from "lucide-react";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get("orderNumber") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (targetNumber: string) => {
    if (!targetNumber.trim()) return;
    setIsLoading(true);
    setErrorMsg("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?orderNumber=${encodeURIComponent(targetNumber.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.order) {
        setErrorMsg("We could not locate an order with that reference number. Please check and try again.");
      } else {
        setOrder(data.order);
      }
    } catch (err) {
      setErrorMsg("An error occurred while tracking your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      handleTrack(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  return (
    <div className="py-12 md:py-20 bg-[#FAF6F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block">
            Real-Time Concierge
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold text-brand-dark">
            TRACK YOUR ORDER
          </h1>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Enter your unique CK Hair Order Reference Number (e.g. CKH-20260831-001) to check real-time progress.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border/60 shadow-xs max-w-xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack(orderNumber);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="e.g. CKH-20260831-001"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] uppercase font-mono font-semibold"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3.5 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#3E3025] transition-all flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isLoading ? "Tracking..." : "Track"}</span>
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Order Details and Timeline */}
        {order && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-border/60 shadow-xs space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-border/60 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold block">
                  {order.isPreorder ? "Pre-Order Journey" : "Order Journey"}
                </span>
                <h2 className="font-serif-luxury text-2xl font-bold text-brand-dark">
                  {order.orderNumber}
                </h2>
                <p className="text-xs text-brand-muted mt-0.5">
                  Placed on {formatDate(order.createdAt)} • {order.customerName}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-sand text-brand-dark border border-brand-border">
                  {order.status.replace(/_/g, " ")}
                </span>
                <p className="text-sm font-bold text-brand-dark mt-2">
                  {formatPrice(order.total)}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-dark mb-4">
                Lifecycle & Timeline
              </h3>
              <OrderTimeline order={order} />
            </div>

            {/* Items */}
            <div className="pt-6 border-t border-brand-border/60">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-dark mb-4">
                Purchased Pieces
              </h3>
              <div className="divide-y divide-brand-sand">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-brand-dark">{item.productNameSnapshot}</p>
                      {item.variantNameSnapshot && (
                        <p className="text-[11px] text-brand-muted">{item.variantNameSnapshot}</p>
                      )}
                      <p className="text-[11px] text-brand-muted">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-brand-dark">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
