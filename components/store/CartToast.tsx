"use client";

import React, { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/formatters";
import { Check, ShoppingBag, X, ArrowRight } from "lucide-react";

export function CartToast() {
  const { lastAddedItem, dismissToast, openCart } = useCart();

  useEffect(() => {
    if (!lastAddedItem) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4500);

    return () => clearTimeout(timer);
  }, [lastAddedItem, dismissToast]);

  if (!lastAddedItem) return null;

  return (
    <div className="fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-md animate-fade-in pointer-events-auto">
      <div className="bg-[#2B2118] text-[#FAF6F2] p-4 rounded-2xl shadow-2xl border border-[#3E3025] flex items-center gap-3.5 backdrop-blur-md">
        {/* Item Image */}
        <div className="w-12 h-14 rounded-xl bg-white/10 overflow-hidden flex-shrink-0 relative border border-white/10">
          <img
            src={lastAddedItem.image}
            alt={lastAddedItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5 shadow-xs">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#B76E79]">
            <span>Added to Bag</span>
          </div>
          <p className="text-xs font-semibold text-white truncate mt-0.5">
            {lastAddedItem.name}
          </p>
          <p className="text-[11px] text-[#D8C7B8] truncate">
            {lastAddedItem.variantName ? `${lastAddedItem.variantName} • ` : ""}
            <span className="font-bold text-white">
              {formatPrice(lastAddedItem.price * lastAddedItem.quantity)}
            </span>
          </p>
        </div>

        {/* View Bag Action */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => {
              dismissToast();
              openCart();
            }}
            className="px-3.5 py-2 rounded-full bg-[#FAF6F2] text-[#2B2118] hover:bg-[#EAD7C3] transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-sm active:scale-95"
          >
            <span>View Bag</span>
            <ArrowRight className="w-3 h-3 text-[#B76E79]" />
          </button>

          <button
            onClick={dismissToast}
            className="p-1 text-[#A39488] hover:text-white transition-colors rounded-full"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
