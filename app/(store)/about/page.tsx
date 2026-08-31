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
            Our Heritage & Vision
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-brand-dark tracking-tight leading-tight">
            LUXURY HAIR CRAFTED FOR TIMELESS CONFIDENCE
          </h1>
          <p className="text-sm md:text-base text-brand-muted font-light leading-relaxed">
            At CK Hair, we believe beautiful hair is more than an accessory. It is confidence, expression, and identity.
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-brand-sand border border-brand-border">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85"
            alt="CK Hair Atelier Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-brand-dark">
              The CK Standard
            </h2>
            <p className="text-xs md:text-sm text-brand-muted font-light leading-relaxed">
              We curate premium hair pieces designed to help every woman feel beautiful, confident, and effortlessly herself. Every bundle and wig in our collection is crafted with single-donor raw hair, ensuring all cuticles remain aligned from root to tip.
            </p>
            <p className="text-xs md:text-sm text-brand-muted font-light leading-relaxed">
              Our high-definition lace pieces feature hand-tied single knots and pre-plucked hairlines that disappear invisibly into the skin without harsh glues or heavy chemicals.
            </p>
          </div>

          <div className="space-y-6 bg-white p-8 rounded-2xl border border-brand-border/60 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark flex-shrink-0">
                <Crown className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">Ethically Sourced</h3>
                <p className="text-xs text-brand-muted mt-1 font-light">Direct relationships with temple and single-donor artisans worldwide.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark flex-shrink-0">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">Bespoke Customization</h3>
                <p className="text-xs text-brand-muted mt-1 font-light">Custom hairline plucking, bleaching, and elastic band installations.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">Lifetime Durability</h3>
                <p className="text-xs text-brand-muted mt-1 font-light">Handles repeat washing, bleaching up to Blonde 613, and daily thermal styling.</p>
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
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
