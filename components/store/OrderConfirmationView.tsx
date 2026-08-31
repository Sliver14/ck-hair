"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/formatters";
import { generateOrderWhatsAppMessage, generateWhatsAppUrl } from "@/lib/whatsapp";
import {
  CheckCircle2,
  Copy,
  Check,
  Building,
  PhoneCall,
  ArrowRight,
  Clock,
  MapPin,
  ShoppingBag,
} from "lucide-react";

interface OrderConfirmationViewProps {
  order: any;
  paymentSettings: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    paymentInstructions: string;
    whatsappNumber: string;
  };
}

export function OrderConfirmationView({
  order,
  paymentSettings,
}: OrderConfirmationViewProps) {
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(paymentSettings.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = generateOrderWhatsAppMessage({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    deliveryAddress: order.deliveryAddress,
    city: order.city,
    state: order.state,
    total: order.total,
    isPreorder: order.isPreorder,
    items: order.items,
  });

  const whatsappUrl = generateWhatsAppUrl(
    paymentSettings.whatsappNumber,
    whatsappMessage
  );

  return (
    <div className="py-12 md:py-20 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Banner */}
        <div className="text-center space-y-3 bg-white p-8 md:p-12 rounded-3xl border border-brand-border/60 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center mx-auto text-brand-dark">
            <CheckCircle2 className="w-8 h-8 text-green-700 stroke-[1.5]" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold block">
            {order.isPreorder ? "Pre-Order Received" : "Order Received"}
          </span>

          <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold text-brand-dark">
            THANK YOU FOR CHOOSING CK HAIR
          </h1>

          <p className="text-xs md:text-sm text-brand-muted max-w-lg mx-auto font-light">
            Your order has been registered. Please complete payment via direct bank transfer below and notify our concierge on WhatsApp.
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-sand border border-brand-border text-xs font-mono font-bold text-brand-dark">
            <span>ORDER REF:</span>
            <span className="text-brand-gold">{order.orderNumber}</span>
          </div>
        </div>

        {/* Payment Account Details Box */}
        <div className="bg-[#121212] text-white p-8 md:p-10 rounded-3xl border border-brand-border/20 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-brand-gold" />
              <div>
                <h2 className="font-serif-luxury text-xl md:text-2xl font-bold text-white">
                  CK HAIR PAYMENT DETAILS
                </h2>
                <p className="text-[11px] text-[#9E9E96]">
                  Guaranty Trust Bank (GTBank) Direct Transfer
                </p>
              </div>
            </div>

            <span className="text-xs font-mono uppercase tracking-widest bg-white/10 text-brand-sand px-3 py-1 rounded-full">
              Status: Awaiting Payment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-[#888880] uppercase tracking-wider block text-[10px]">Bank Name</span>
              <p className="text-base font-semibold text-white">{paymentSettings.bankName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#888880] uppercase tracking-wider block text-[10px]">Account Name</span>
              <p className="text-base font-semibold text-white">{paymentSettings.accountName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#888880] uppercase tracking-wider block text-[10px]">Account Number</span>
              <div className="flex items-center gap-2">
                <p className="text-lg font-mono font-bold text-brand-gold tracking-wider">
                  {paymentSettings.accountNumber}
                </p>
                <button
                  onClick={copyAccountNumber}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-[10px]"
                  title="Copy Account Number"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#888880] uppercase tracking-wider block">Total Amount to Pay</span>
              <span className="font-serif-luxury text-2xl md:text-3xl font-bold text-white">
                {formatPrice(order.total)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={copyAccountNumber}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Account Number"}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          </div>

          <p className="text-[11px] text-[#9A9A90] font-light leading-relaxed">
            {paymentSettings.paymentInstructions}
          </p>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border/60 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
            <h2 className="font-serif-luxury text-xl font-bold text-brand-dark">
              ORDER RECEIPT
            </h2>
            <span className="text-xs text-brand-muted font-mono">{formatDate(order.createdAt)}</span>
          </div>

          {/* Items */}
          <div className="divide-y divide-brand-sand">
            {order.items.map((item: any) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {item.productImageSnapshot && (
                    <img
                      src={item.productImageSnapshot}
                      alt={item.productNameSnapshot}
                      className="w-14 h-16 rounded-lg object-cover bg-brand-sand"
                    />
                  )}
                  <div>
                    <h3 className="text-xs font-bold text-brand-dark">{item.productNameSnapshot}</h3>
                    {item.variantNameSnapshot && (
                      <p className="text-[11px] text-brand-muted">{item.variantNameSnapshot}</p>
                    )}
                    {item.isPreorder && (
                      <span className="inline-block text-[9px] uppercase tracking-wider bg-brand-sand px-2 py-0.5 rounded font-semibold text-[#8B6A1B] mt-0.5">
                        Pre-Order ({item.preorderDuration || "2–4 weeks"})
                      </span>
                    )}
                    <p className="text-[11px] text-brand-muted mt-0.5">Qty: {item.quantity}</p>
                  </div>
                </div>

                <p className="text-xs font-bold text-brand-dark">
                  {formatPrice(item.totalPrice)}
                </p>
              </div>
            ))}
          </div>

          {/* Customer & Address Details */}
          <div className="pt-4 border-t border-brand-border/60 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-muted">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark block">
                Customer Information
              </span>
              <p className="font-medium text-brand-dark">{order.customerName}</p>
              <p>{order.customerEmail}</p>
              <p>{order.customerPhone}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark block">
                Delivery Address
              </span>
              <p className="font-medium text-brand-dark">{order.deliveryAddress}</p>
              <p>{order.city}, {order.state}, Nigeria</p>
              {order.customerNotes && <p className="italic">Note: "{order.customerNotes}"</p>}
            </div>
          </div>

          {/* Breakdown */}
          <div className="pt-4 border-t border-brand-border/60 space-y-2 text-xs">
            <div className="flex justify-between text-brand-muted">
              <span>Subtotal</span>
              <span className="font-semibold text-brand-dark">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-brand-muted">
              <span>Nationwide Delivery</span>
              <span className="font-semibold text-brand-dark">
                {order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-brand-dark pt-3 border-t border-brand-border/60">
              <span>Total</span>
              <span className="font-serif-luxury text-2xl">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-brand-border text-brand-dark hover:border-brand-dark text-xs font-semibold uppercase tracking-[0.18em] transition-all text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href={`/track-order?orderNumber=${order.orderNumber}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-dark text-white hover:bg-black text-xs font-semibold uppercase tracking-[0.18em] transition-all text-center flex items-center justify-center gap-2"
          >
            <span>Track Order Status</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
