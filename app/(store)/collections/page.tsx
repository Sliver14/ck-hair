import React from "react";
import Link from "next/link";
import { getCategories } from "@/lib/db/products";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 0;

export default async function CollectionsPage() {
  const categories = await getCategories();

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold block">
            Signature Categorization
          </span>
          <h1 className="font-serif-luxury text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark">
            COLLECTIONS
          </h1>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Explore our distinct categories of virgin hair bundles, ready-to-wear glueless wigs, and skin-melt HD closures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-sand border border-brand-border/60 shadow-xs hover:shadow-2xl transition-all duration-500 block"
            >
              <img
                src={cat.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold tracking-wide">
                    {cat.name}
                  </h2>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand-dark transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                {cat.description && (
                  <p className="text-xs text-white/80 mt-2 font-light line-clamp-2">
                    {cat.description}
                  </p>
                )}
                <span className="text-[10px] uppercase tracking-widest text-brand-gold mt-3 font-semibold">
                  {cat._count?.products || 0} Products
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
