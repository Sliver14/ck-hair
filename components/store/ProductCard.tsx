"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Eye, Clock } from "lucide-react";
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
  const primaryImage =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80";
  const secondaryImage = product.images?.[1]?.url || primaryImage;

  const isPreorder = product.availability === "PREORDER" || product.preorderEnabled;
  const isOutOfStock = product.availability === "OUT_OF_STOCK";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

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
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isPreorder && (
            <span className="bg-[#111111] text-white text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-bold shadow-xs">
              Pre-Order
            </span>
          )}
          {product.bestseller && !isPreorder && (
            <span className="bg-white/95 text-brand-dark text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-bold shadow-xs border border-brand-border">
              Bestseller
            </span>
          )}
          {product.isNew && !isPreorder && (
            <span className="bg-brand-sand text-brand-dark text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-bold shadow-xs border border-brand-border">
              New Arrival
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="px-4 py-2 bg-white/95 text-brand-dark rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {product.category && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-medium">
              {product.category.name} {product.texture ? `• ${product.texture}` : ""}
            </p>
          )}

          <Link
            href={`/product/${product.slug}`}
            className="font-serif-luxury text-base md:text-lg font-bold text-brand-dark hover:text-brand-gold transition-colors line-clamp-1 mt-1 block"
          >
            {product.name}
          </Link>

          {isPreorder && (
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#8C6B1C] font-medium">
              <Clock className="w-3 h-3" />
              <span>Fulfillment: {product.preorderDuration || "2–4 weeks"}</span>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-brand-sand flex items-center justify-between gap-2">
          <div>
            <span className="text-sm md:text-base font-bold text-brand-dark">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-brand-lightMuted line-through ml-2">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`p-2.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center ${
              isOutOfStock
                ? "bg-brand-sand text-brand-lightMuted cursor-not-allowed"
                : isPreorder
                ? "bg-brand-dark text-white hover:bg-black active:scale-95 shadow-xs"
                : "bg-brand-sand text-brand-dark hover:bg-brand-dark hover:text-white active:scale-95"
            }`}
            title={isPreorder ? "Pre-order now" : "Add to bag"}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
