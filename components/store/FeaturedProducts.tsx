"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsProps {
  products: any[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Featured" },
    { id: "bestseller", label: "Bestsellers" },
    { id: "new", label: "New Drops" },
    { id: "wigs", label: "Wigs" },
    { id: "bundles", label: "Bundles" },
  ];

  const filtered = products.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "bestseller") return p.bestseller;
    if (activeTab === "new") return p.isNew;
    if (activeTab === "wigs") return p.category?.slug === "wigs";
    if (activeTab === "bundles") return p.category?.slug === "bundles";
    return true;
  });

  return (
    <section className="py-16 md:py-24 bg-[#FAF6F2] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B76E79] font-bold block">
            Most Loved Hair
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark">
            SHOP THE COLLECTION
          </h2>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Indulge in 100% pure human hair units and raw bundles engineered for long-lasting luxury and flawless blending.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 md:gap-3 mb-8 md:mb-12 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap flex-shrink-0 transition-all ${
                activeTab === tab.id
                  ? "bg-brand-dark text-white shadow-sm"
                  : "bg-[#EAD7C3]/50 text-brand-muted hover:text-brand-dark hover:bg-[#EAD7C3]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-brand-dark text-brand-dark rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-white transition-all shadow-xs active:scale-98"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
