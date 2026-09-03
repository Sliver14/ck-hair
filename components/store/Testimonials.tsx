import React from "react";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Dr. Chioma Nwachukwu",
      location: "Ikoyi, Lagos",
      comment: "The Anna Bodywave is beyond compare. I used it for knotless boho braids for my wedding week, and 6 weeks later the curls are still bouncy, soft, and tangle-free. Truly couture quality.",
      unit: "Anna Bodywave Braiding Fiber",
    },
    {
      name: "Zainab Al-Hassan",
      location: "Maitama, Abuja",
      comment: "Ordering via Bank Transfer with instant WhatsApp receipt verification made the whole process seamless. The HD lace frontal literally disappeared on my skin without glue.",
      unit: "13x6 HD Skin-Melt Frontal",
    },
    {
      name: "Blessing Douglas",
      location: "GRA Phase 2, Port Harcourt",
      comment: "CK Hair's Raw Vietnamese bundles are 100% thick from root to tip. Bleached them to honey blonde with zero shedding. My stylist was so impressed she ordered for her salon!",
      unit: "100% Raw Hair Bundles (30\")",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B76E79] font-bold block">
            Client Experiences & Proof
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark">
            TESTED & ADORED ACROSS NIGERIA
          </h2>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Read real verified experiences from women who trust CK Hair for life's most unforgettable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-brand-sand/50 border border-brand-border/60 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-lightMuted stroke-[1.2]" />
                </div>
                <p className="text-sm text-brand-dark font-light leading-relaxed">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/60">
                <p className="font-serif-luxury text-base font-bold text-brand-dark">
                  {rev.name}
                </p>
                <p className="text-[11px] text-brand-muted">
                  {rev.location} • <span className="text-brand-dark font-medium">{rev.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
