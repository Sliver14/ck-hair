import React from "react";
import Link from "next/link";
import { Sparkles, Crown, ShieldCheck, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6F2] min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block">
            The CK Hair Story & Heritage
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-brand-dark tracking-tight leading-tight">
            WHERE NIGERIAN LUXURY MEETS UNRIVALED CRAFTSMANSHIP
          </h1>
          <p className="text-sm md:text-base text-brand-muted font-light leading-relaxed">
            At CK Hair, we believe immaculate hair is never an afterthought. It is your signature, your authority, and the ultimate expression of effortless confidence.
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-brand-sand border border-brand-border">
          <img
            src="/ck-hair/ck-hair-05.jpeg"
            alt="CK Hair Premium Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-brand-dark">
              The CK Hair Standard
            </h2>
            <p className="text-xs md:text-sm text-brand-muted font-light leading-relaxed">
              We began with a clear purpose: to give Nigerian and global women access to truly authentic, unprocessed single-donor hair and groundbreaking heat-resilient Anna Fiber without the disappointment of shedding, chemical odor, or hollow ends.
            </p>
            <p className="text-xs md:text-sm text-brand-muted font-light leading-relaxed">
              From our signature bulk braiding fiber engineered for featherlight knotless and goddess braids, to our custom-bleached 13x6 HD skin-melt lace frontals that blend seamlessly on African skin tones, every piece in our collection is a masterpiece of precision and longevity.
            </p>
          </div>

          <div className="space-y-6 bg-white p-8 rounded-2xl border border-brand-border/60 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark flex-shrink-0">
                <Crown className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">100% Single-Donor Purity</h3>
                <p className="text-xs text-brand-muted mt-1 font-light">Direct sourcing from single donors with aligned cuticles. Bleaches effortlessly to 613 blonde with full bounce intact.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark flex-shrink-0">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">Signature Anna Fiber Innovation</h3>
                <p className="text-xs text-brand-muted mt-1 font-light">Proprietary luxury fiber that mimics the flow, sheen, and heat response of human hair for lightweight, all-day protective styles.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">Nigerian Concierge & Worldwide Dispatch</h3>
                <p className="text-xs text-brand-muted mt-1 font-light">Effortless bank transfers, direct WhatsApp order verification, and rapid door-to-door delivery across all 36 Nigerian states and the diaspora.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md active:scale-98"
          >
            <span>Explore The Full Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
