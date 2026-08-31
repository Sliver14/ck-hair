import React from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

interface PreorderSectionProps {
  preorderProducts: any[];
}

export function PreorderSection({ preorderProducts }: PreorderSectionProps) {
  if (!preorderProducts || preorderProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#141414] text-white overflow-hidden relative border-b border-brand-border/20">
      {/* Background Decorative glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-sand text-[10px] uppercase tracking-[0.2em] font-semibold">
              <Clock className="w-3 h-3 text-brand-gold" />
              <span>Limited Artisan Drops</span>
            </div>
            <h2 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              COMING SOON. WORTH THE WAIT.
            </h2>
            <p className="text-xs md:text-sm text-[#A0A0A0] max-w-xl font-light">
              Secure rare single-donor hair textures and limited handcrafted custom units before public release.
            </p>
          </div>

          <Link
            href="/preorder"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-dark rounded-full text-xs font-semibold uppercase tracking-[0.18em] hover:bg-brand-sand transition-all self-start md:self-auto shadow-md"
          >
            <span>Explore Pre-Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {preorderProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
