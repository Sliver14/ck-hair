"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/formatters";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  Check,
  XCircle,
  PhoneCall,
  Mail,
  MapPin,
  Building,
  Save,
  MessageSquare,
} from "lucide-react";

interface OrderDetailViewProps {
  order: any;
}

export function OrderDetailView({ order: initialOrder }: OrderDetailViewProps) {
  const [order, setOrder] = useState(initialOrder);
  const [adminNotes, setAdminNotes] = useState(order.adminNotes || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const updateOrderStatus = async (
    status: string,
    paymentStatus?: string,
    note?: string
  ) => {
    setIsUpdating(true);
    setFeedbackMsg("");
    try {
      const res = await fetch(`/api/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          paymentStatus: paymentStatus || order.paymentStatus,
          note,
          adminNotes,
          changedBy: "CK Admin",
        }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const data = await res.json();
      setOrder(data.order);
      setFeedbackMsg(`Order transitioned to ${status.replace(/_/g, " ")}`);
    } catch (e: any) {
      console.error(e);
      setFeedbackMsg("Error updating order status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes }),
      });
      if (res.ok) {
        setFeedbackMsg("Internal admin notes saved.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const customerWhatsappMessage = `Hello ${order.customerName}, this is CK Hair regarding your order #${order.orderNumber}.`;
  const whatsappUrl = generateWhatsAppUrl(
    order.customerWhatsapp || order.customerPhone,
    customerWhatsappMessage
  );

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 rounded-xl bg-white border border-brand-border text-brand-dark hover:bg-brand-sand transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
                ORDER #{order.orderNumber}
              </h1>
              {order.isPreorder && (
                <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Pre-Order
                </span>
              )}
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact Customer on WhatsApp</span>
          </a>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-700" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Items, Customer, Delivery */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Order Items Table */}
          <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs p-6 space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Purchased Hair Pieces ({order.items?.length || 0})
            </h2>

            <div className="divide-y divide-brand-sand">
              {order.items?.map((item: any) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.productImageSnapshot && (
                      <img
                        src={item.productImageSnapshot}
                        alt={item.productNameSnapshot}
                        className="w-14 h-16 rounded-xl object-cover bg-brand-sand flex-shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-bold text-xs text-brand-dark">{item.productNameSnapshot}</p>
                      {item.variantNameSnapshot && (
                        <p className="text-[11px] text-brand-muted">{item.variantNameSnapshot}</p>
                      )}
                      {item.isPreorder && (
                        <span className="inline-block text-[9px] uppercase tracking-wider bg-purple-50 text-purple-800 px-2 py-0.5 rounded font-semibold mt-0.5">
                          Pre-Order ({item.preorderDuration || "2–4 weeks"})
                        </span>
                      )}
                      <p className="text-[11px] text-brand-muted mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xs text-brand-dark">{formatPrice(item.totalPrice)}</p>
                    <p className="text-[10px] text-brand-muted">{formatPrice(item.unitPrice)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotals */}
            <div className="pt-4 border-t border-brand-border/60 space-y-1.5 text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="font-medium text-brand-dark">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Delivery Fee</span>
                <span className="font-medium text-brand-dark">
                  {order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-brand-dark pt-2 border-t border-brand-border/60">
                <span>Total</span>
                <span className="font-serif-luxury text-xl">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs p-6 space-y-3 text-xs">
              <h3 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
                Customer Information
              </h3>
              <p className="font-bold text-brand-dark text-sm">{order.customerName}</p>
              <p className="flex items-center gap-2 text-brand-muted">
                <Mail className="w-3.5 h-3.5" />
                <span>{order.customerEmail}</span>
              </p>
              <p className="flex items-center gap-2 text-brand-muted">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{order.customerPhone}</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs p-6 space-y-3 text-xs">
              <h3 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
                Delivery Destination
              </h3>
              <p className="text-brand-dark font-medium">{order.deliveryAddress}</p>
              <p className="text-brand-muted">{order.city}, {order.state}, Nigeria</p>
              {order.customerNotes && (
                <div className="p-2.5 rounded-lg bg-brand-sand/50 text-[11px] text-brand-dark">
                  <span className="font-bold block">Customer Note:</span>
                  "{order.customerNotes}"
                </div>
              )}
            </div>
          </div>

          {/* Internal Admin Notes */}
          <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs p-6 space-y-3">
            <h3 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Internal Admin / Workshop Notes
            </h3>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="e.g. Verified GTBank payment on mobile app. Lace bleached and plucked by workshop team on Friday..."
              className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
            />
            <button
              onClick={handleSaveNotes}
              disabled={isUpdating}
              className="px-4 py-2 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Internal Notes</span>
            </button>
          </div>

          {/* Order Lifecycle History Log */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs p-6 space-y-3">
              <h3 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
                Status Transition Audit Log
              </h3>
              <div className="space-y-2">
                {order.statusHistory.map((h: any) => (
                  <div key={h.id} className="text-xs p-2.5 rounded-xl bg-brand-sand/40 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-brand-dark uppercase tracking-wider">
                        {h.newStatus.replace(/_/g, " ")}
                      </span>
                      {h.note && <p className="text-brand-muted text-[11px] mt-0.5">{h.note}</p>}
                    </div>
                    <span className="text-[10px] text-brand-muted font-mono">{formatDate(h.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Workflow Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Payment Status Indicators */}
          <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs p-6 space-y-4">
            <h3 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Status & Payment
            </h3>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">Current Stage</span>
              <p className="text-sm font-bold text-brand-dark">
                {order.status.replace(/_/g, " ")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold block">Payment State</span>
              <span
                className={`inline-block text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${
                  order.paymentStatus === "PAYMENT_CONFIRMED"
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {order.paymentStatus.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          {/* Workflow Transitions */}
          <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs p-6 space-y-3">
            <h3 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Workflow Actions
            </h3>

            {/* Confirm Payment button */}
            {order.paymentStatus !== "PAYMENT_CONFIRMED" && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    order.isPreorder ? "PREORDER_PROCESSING" : "PROCESSING",
                    "PAYMENT_CONFIRMED",
                    "Direct bank transfer confirmed by Admin."
                  )
                }
                disabled={isUpdating}
                className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Bank Payment</span>
              </button>
            )}

            {/* For Preorders: Stock Arrived & Preparing */}
            {order.isPreorder && order.status === "PREORDER_PROCESSING" && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    "STOCK_ARRIVED",
                    undefined,
                    "Pre-order artisan batch arrived at CK Hair workshop."
                  )
                }
                disabled={isUpdating}
                className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
              >
                <Clock className="w-4 h-4" />
                <span>Mark Stock Arrived</span>
              </button>
            )}

            {order.isPreorder && order.status === "STOCK_ARRIVED" && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    "PREPARING_ORDER",
                    undefined,
                    "Unit undergoing hairline customization & packaging."
                  )
                }
                disabled={isUpdating}
                className="w-full py-3 bg-brand-dark hover:bg-black text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Mark Preparing Order</span>
              </button>
            )}

            {/* Ready for Delivery */}
            {(order.status === "PROCESSING" || order.status === "PREPARING_ORDER") && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    "READY_FOR_DELIVERY",
                    undefined,
                    "Order packaged and assigned to courier."
                  )
                }
                disabled={isUpdating}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Truck className="w-4 h-4" />
                <span>Mark Ready for Delivery</span>
              </button>
            )}

            {/* Shipped */}
            {order.status === "READY_FOR_DELIVERY" && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    "SHIPPED",
                    undefined,
                    "Out for delivery with verified rider/courier."
                  )
                }
                disabled={isUpdating}
                className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Truck className="w-4 h-4" />
                <span>Mark Shipped</span>
              </button>
            )}

            {/* Completed */}
            {order.status === "SHIPPED" && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    "COMPLETED",
                    undefined,
                    "Order successfully delivered to customer."
                  )
                }
                disabled={isUpdating}
                className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Order Completed</span>
              </button>
            )}

            {/* Cancel Order */}
            {order.status !== "CANCELLED" && order.status !== "COMPLETED" && (
              <button
                onClick={() =>
                  updateOrderStatus("CANCELLED", undefined, "Order cancelled by Admin.")
                }
                disabled={isUpdating}
                className="w-full py-2.5 border border-red-200 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel Order</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
