"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/formatters";
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Clock } from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    hasPreorderItems,
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 500000;
  const freeShippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FAFAF8]">
        <div className="w-20 h-20 rounded-full bg-brand-sand flex items-center justify-center text-brand-muted mb-4">
          <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
        </div>
        <h1 className="font-serif-luxury text-3xl md:text-4xl font-bold text-brand-dark mb-2">
          Your shopping bag is empty
        </h1>
        <p className="text-xs md:text-sm text-brand-muted max-w-md font-light mb-8">
          Explore our signature raw hair bundles, high-definition glueless wigs, and skin-melt frontals.
        </p>
        <Link
          href="/shop"
          className="px-8 py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-brand-border/60">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-1">
              Order Review
            </span>
            <h1 className="font-serif-luxury text-3xl md:text-4xl font-bold text-brand-dark">
              SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-brand-muted hover:text-red-600 font-medium transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="p-4 rounded-xl bg-brand-sand/70 border border-brand-border/60 mb-8 max-w-4xl text-xs">
          {freeShippingLeft > 0 ? (
            <p className="text-brand-charcoal mb-2 font-medium">
              Add <span className="font-bold text-brand-dark">{formatPrice(freeShippingLeft)}</span> more for <span className="font-bold">COMPLIMENTARY NATIONWIDE DELIVERY</span>.
            </p>
          ) : (
            <p className="text-green-800 font-semibold mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              You have unlocked Free Nationwide Delivery!
            </p>
          )}
          <div className="w-full bg-brand-border h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-dark h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Pre-order Alert */}
        {hasPreorderItems && (
          <div className="p-4 rounded-xl bg-[#FAF6E8] border border-[#E9DCB5] mb-8 max-w-4xl flex items-start gap-3 text-xs text-[#6F5B23]">
            <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block">Notice Regarding Pre-Order Pieces</span>
              Your shopping bag contains bespoke pre-order pieces that are tailored to order. They will be prepared and delivered according to their stated timeline.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs divide-y divide-brand-sand overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-brand-sand overflow-hidden flex-shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.isPreorder && (
                      <span className="absolute bottom-1 left-1 right-1 text-[8px] uppercase tracking-wider bg-brand-dark text-white text-center py-0.5 rounded font-bold">
                        Pre-Order
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-serif-luxury text-base sm:text-lg font-bold text-brand-dark hover:text-brand-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-brand-lightMuted hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.variantName && (
                      <p className="text-xs text-brand-muted font-light">{item.variantName}</p>
                    )}

                    {item.isPreorder && (
                      <p className="text-[11px] text-[#9A731C] font-medium">
                        Fulfillment: {item.preorderDuration || "2–4 weeks"}
                      </p>
                    )}

                    <p className="text-xs font-semibold text-brand-dark sm:hidden pt-1">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  {/* Quantity and Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-sand">
                    <div className="flex items-center border border-brand-border rounded-full bg-brand-sand/50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-brand-dark hover:bg-brand-sand rounded-l-full"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-brand-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-brand-dark hover:bg-brand-sand rounded-r-full"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <p className="text-base font-bold text-brand-dark">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-[10px] text-brand-muted hidden sm:block">
                        {formatPrice(item.price)} / unit
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-brand-border/60 p-6 shadow-xs space-y-6 sticky top-28">
              <h2 className="font-serif-luxury text-xl font-bold text-brand-dark border-b border-brand-border/60 pb-3">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-dark text-sm">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-brand-muted">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-brand-dark">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-brand-muted">
                  <span>Payment Method</span>
                  <span className="font-medium text-brand-dark">Direct Bank Transfer</span>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-dark">Total</span>
                <span className="font-serif-luxury text-2xl font-bold text-brand-dark">{formatPrice(subtotal)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[11px] text-center text-brand-muted font-light">
                Secure bank transfer details provided upon order submission with instant WhatsApp confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
