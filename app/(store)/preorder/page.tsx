import React from "react";
import { getActiveProducts, getCategories } from "@/lib/db/products";
import { ShopCatalog } from "@/components/store/ShopCatalog";
import { Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function PreorderPage() {
  const [products, categories] = await Promise.all([
    getActiveProducts({ preorderOnly: true }),
    getCategories(),
  ]);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Dark Luxury Pre-order Hero */}
      <div className="bg-[#121212] text-white py-16 md:py-24 border-b border-brand-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-sand text-xs uppercase tracking-[0.2em] font-semibold">
            <Clock className="w-3.5 h-3.5 text-brand-gold" />
            <span>Exclusive Artisan Drops</span>
          </div>

          <h1 className="font-serif-luxury text-4xl md:text-6xl font-bold tracking-tight">
            PRE-ORDER ATELIER
          </h1>

          <p className="text-xs md:text-base text-[#A8A8A0] max-w-xl mx-auto font-light leading-relaxed">
            Reserve rare, single-donor raw hair and bespoke handcrafted units before stock arrives. Handcrafted with supreme precision and dispatched directly to your doorstep.
          </p>

          {/* 3 Step Preorder Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8 text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">1. Reserve Your Unit</span>
              <p className="text-xs text-[#8E8E86]">Select your custom length and secure your order with bank transfer.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">2. Artisan Preparation</span>
              <p className="text-xs text-[#8E8E86]">Hair is ethically sourced and tailored within 2–4 weeks.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">3. VIP Express Delivery</span>
              <p className="text-xs text-[#8E8E86]">Your custom box is inspected, sealed, and priority shipped.</p>
            </div>
          </div>
        </div>
      </div>

      <ShopCatalog
        initialProducts={products}
        categories={categories}
        isPreorderPage={true}
      />
    </div>
  );
}
