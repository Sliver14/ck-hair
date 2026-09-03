import React from "react";
import { getActiveProducts, getCategories } from "@/lib/db/products";
import { getStoreSettings } from "@/lib/db/settings";
import { ShopCatalog } from "@/components/store/ShopCatalog";
import { CustomPreorderForm } from "@/components/store/CustomPreorderForm";
import { Clock, ShieldCheck, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";

export const revalidate = 0;

export default async function PreorderPage() {
  const [products, categories, settings] = await Promise.all([
    getActiveProducts({ preorderOnly: true }),
    getCategories(),
    getStoreSettings(),
  ]);

  return (
    <div className="bg-[#FAF6F2] min-h-screen">
      {/* Dark Luxury Pre-order Hero */}
      <div className="bg-[#2B2118] text-[#FAF6F2] py-14 md:py-20 border-b border-[#3E3025]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EAD7C3] text-xs uppercase tracking-[0.2em] font-semibold border border-white/10">
            <Clock className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>Artisan Custom Reservation</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-[#FAF6F2]">
            PRE-ORDER COLLECTION
          </h1>

          <p className="text-xs md:text-base text-[#D8C7B8] max-w-2xl mx-auto font-light leading-relaxed">
            Can’t find your exact piece in stock? Specify your desired texture, length, color, or bundle count below and send your bespoke reservation directly to our WhatsApp Concierge.
          </p>

          {/* 3 Step Preorder Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider block">1. Select Specifications</span>
              <p className="text-xs text-[#D8C7B8]">Choose your texture, length, and format using the bespoke form.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider block">2. WhatsApp Confirmation</span>
              <p className="text-xs text-[#D8C7B8]">Our concierge validates your reservation, invoice, and artisan schedule.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider block">3. VIP Priority Dispatch</span>
              <p className="text-xs text-[#D8C7B8]">Your custom piece is constructed, inspected, and express delivered.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Custom Request Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <CustomPreorderForm whatsappNumber={settings.whatsapp} />
      </div>

      {/* Optional: Browse Existing Pre-Order Catalog Drops */}
      {products.length > 0 && (
        <div className="border-t border-brand-border/60 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B76E79] font-bold block">
              Pre-Configured Designs
            </span>
            <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-brand-dark mt-1">
              OR EXPLORE PRE-ORDER CATALOG DROPS
            </h2>
          </div>

          <ShopCatalog
            initialProducts={products}
            categories={categories}
            isPreorderPage={true}
          />
        </div>
      )}
    </div>
  );
}
