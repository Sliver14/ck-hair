"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Eye, Clock, Check } from "lucide-react";
import { formatPrice } from "@/lib/formatters";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    category?: { name: string; slug: string } | null;
    images?: Array<{ url: string; alt?: string | null }>;
    bestseller?: boolean;
    isNew?: boolean;
    availability: string; // IN_STOCK, PREORDER, OUT_OF_STOCK
    preorderEnabled?: boolean;
    preorderDuration?: string | null;
    texture?: string | null;
    hairType?: string | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const primaryImage =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80";

  const isPreorder =
    product.availability === "PREORDER" ||
    product.preorderEnabled ||
    (typeof (product as any).stock === "number" && (product as any).stock <= 0);
  const isOutOfStock = product.availability === "OUT_OF_STOCK";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock || isAdded) return;

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: primaryImage,
      quantity: 1,
      isPreorder: !!isPreorder,
      preorderDuration: product.preorderDuration || "2–4 weeks",
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-brand-border/60 hover:border-brand-dark/40 hover:shadow-xl transition-all duration-500">
      {/* Product Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[3/4] bg-brand-sand overflow-hidden block"
      >
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {isPreorder && (
            <span className="bg-[#2B2118] text-white text-[8px] sm:text-[9px] uppercase tracking-[0.18em] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold shadow-xs">
              Pre-Order
            </span>
          )}
          {product.bestseller && !isPreorder && (
            <span className="bg-white/95 text-brand-dark text-[8px] sm:text-[9px] uppercase tracking-[0.18em] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold shadow-xs border border-brand-border">
              Bestseller
            </span>
          )}
          {product.isNew && !isPreorder && (
            <span className="bg-brand-sand text-brand-dark text-[8px] sm:text-[9px] uppercase tracking-[0.18em] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold shadow-xs border border-brand-border">
              New
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center p-4">
          <span className="px-4 py-2 bg-white/95 text-brand-dark rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          {product.category && (
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-brand-muted font-medium truncate">
              {product.category.name} {product.texture ? `• ${product.texture}` : ""}
            </p>
          )}

          <Link
            href={`/product/${product.slug}`}
            className="font-serif-luxury text-sm sm:text-base md:text-lg font-bold text-brand-dark hover:text-brand-gold transition-colors line-clamp-1 mt-0.5 sm:mt-1 block"
          >
            {product.name}
          </Link>

          {isPreorder && (
            <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] text-[#8C6B1C] font-medium">
              <Clock className="w-3 h-3 text-[#B76E79] flex-shrink-0" />
              <span className="truncate">Fulfillment: {product.preorderDuration || "2–4 wks"}</span>
            </div>
          )}
        </div>

        {/* Responsive Price and Action Row */}
        <div className="pt-2 border-t border-brand-sand flex items-center justify-between gap-1.5">
          <div className="min-w-0 flex-1">
            <span className="text-xs sm:text-sm md:text-base font-bold text-brand-dark block truncate">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-brand-lightMuted line-through block truncate">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-semibold transition-all flex items-center justify-center flex-shrink-0 ${
              isOutOfStock
                ? "bg-brand-sand text-brand-lightMuted cursor-not-allowed"
                : isAdded
                ? "bg-green-700 text-white scale-105 shadow-xs"
                : isPreorder
                ? "bg-brand-dark text-white hover:bg-[#3E3025] active:scale-95 shadow-xs"
                : "bg-brand-sand text-brand-dark hover:bg-brand-dark hover:text-white active:scale-95"
            }`}
            title={isAdded ? "Added to Bag" : isPreorder ? "Pre-order now" : "Add to bag"}
            aria-label={isAdded ? "Added to Bag" : isPreorder ? "Pre-order now" : "Add to bag"}
          >
            {isAdded ? (
              <Check className="w-3.5 h-3.5 stroke-[2.5] animate-fade-in" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

