"use client";

import React from "react";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/formatters";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    hasPreorderItems,
  } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500000;
  const freeShippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="p-5 md:p-6 border-b border-brand-border flex items-center justify-between bg-brand-sand/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-dark" />
              <h2 className="text-lg font-serif-luxury tracking-wide font-semibold text-brand-dark">
                YOUR SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-brand-muted hover:text-brand-dark rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-brand-sand/60 border-b border-brand-border text-xs">
            {freeShippingLeft > 0 ? (
              <p className="text-brand-charcoal mb-2 font-medium">
                Add <span className="font-bold text-brand-dark">{formatPrice(freeShippingLeft)}</span> more for <span className="text-brand-dark font-bold">FREE DELIVERY</span> across Nigeria.
              </p>
            ) : (
              <p className="text-green-800 font-semibold mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                You have unlocked FREE nationwide delivery!
              </p>
            )}
            <div className="w-full bg-brand-border h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#B76E79] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Pre-order Alert in Cart */}
          {hasPreorderItems && (
            <div className="p-3.5 mx-4 mt-4 rounded-xl bg-[#EAD7C3]/30 border border-[#EAD7C3] flex items-start gap-2.5 text-xs text-[#2B2118]">
              <Clock className="w-4 h-4 text-[#B76E79] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider block text-[#B76E79]">Pre-Order Notice</span>
                Your bag includes custom pre-order item(s). Fulfillment timeline follows artisan preparation schedule.
              </div>
            </div>
          )}

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 divide-y divide-brand-sand">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAD7C3]/50 flex items-center justify-center text-brand-muted">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-luxury text-brand-dark">Your bag is empty</h3>
                  <p className="text-xs text-brand-muted mt-1 max-w-[240px]">
                    Explore our luxury wigs, raw bundles, and invisible lace collections.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-4 px-6 py-2.5 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#3E3025] transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="w-20 h-24 rounded-lg bg-[#EAD7C3]/40 overflow-hidden flex-shrink-0 relative">
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

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-brand-dark hover:text-[#B76E79] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-brand-lightMuted hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variantName && (
                        <p className="text-xs text-brand-muted mt-0.5 font-light">
                          {item.variantName}
                        </p>
                      )}

                      {item.isPreorder && (
                        <p className="text-[11px] text-[#B76E79] mt-0.5 font-medium">
                          Fulfillment: {item.preorderDuration || "2–4 weeks"}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-brand-border rounded-full bg-[#FAF6F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs font-bold text-brand-dark hover:bg-brand-sand rounded-l-full"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-brand-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs font-bold text-brand-dark hover:bg-brand-sand rounded-r-full"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-bold text-brand-dark">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 md:p-6 border-t border-brand-border bg-[#FAF6F2] space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="text-xs uppercase tracking-widest text-brand-muted font-medium">Subtotal</span>
                <span className="font-serif-luxury text-xl font-bold text-brand-dark">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-brand-muted">
                Taxes calculated at checkout. Direct Bank Transfer & WhatsApp confirmation supported.
              </p>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 bg-brand-dark text-white rounded-full font-medium text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 hover:bg-[#3E3025] transition-all shadow-md active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full py-2.5 text-brand-muted hover:text-brand-dark text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
