import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryGridProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    _count?: { products: number };
  }>;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[#FAF6F2] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#C48A90] font-bold block mb-2">
              Signature Categories
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-[#756558]">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#756558] hover:text-brand-dark transition-colors pb-1 border-b border-[#756558]/40 hover:border-brand-dark"
          >
            <span>Explore All Hair</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-brand-sand border border-brand-border/60 shadow-sm hover:shadow-2xl transition-all duration-500 block"
            >
              <img
                src={
                  cat.image ||
                  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
                }
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity" />

              {/* Text overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold tracking-wide group-hover:translate-x-1 transition-transform text-white/80">
                    {cat.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand-dark transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                {cat.description && (
                  <p className="text-xs md:text-sm text-white/80 line-clamp-2 mt-2 font-light max-w-xl">
                    {cat.description}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
                    {cat._count?.products || 0} Products Available
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
