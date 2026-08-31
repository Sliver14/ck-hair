import React from "react";
import { getActiveProducts, getCategories } from "@/lib/db/products";
import { ShopCatalog } from "@/components/store/ShopCatalog";

export const revalidate = 0;

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getActiveProducts(),
    getCategories(),
  ]);

  return (
    <div className="bg-[#FAF6F2] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#EAD7C3]/35 border-b border-brand-border/60 py-12 md:py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block mb-2">
            The Complete Atelier
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold text-brand-dark tracking-tight">
            SHOP CK HAIR
          </h1>
          <p className="text-xs md:text-sm text-brand-muted max-w-md mx-auto mt-2 font-light">
            Explore 100% human and raw hair pieces, handcrafted wigs, HD lace frontals, and luxury bundles.
          </p>
        </div>
      </div>

      <ShopCatalog
        initialProducts={products}
        categories={categories}
      />
    </div>
  );
}
