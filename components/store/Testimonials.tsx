import React from "react";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Amaka Eze",
      location: "Lekki, Lagos",
      comment: "Absolutely beautiful hair. The quality, fullness, and natural luster exceeded my expectations. Minimal shedding and it curled effortlessly!",
      unit: "CK Signature Body Wave",
    },
    {
      name: "Sarah Kalu",
      location: "Victoria Island",
      comment: "I loved how easy the ordering process was with direct WhatsApp confirmation. The HD lace melted into my skin completely seamlessly.",
      unit: "HD Lace 13x4 Frontal",
    },
    {
      name: "Tolu Adeleke",
      location: "Abuja",
      comment: "CK Hair has officially become my only go-to for luxury raw hair and ready-to-wear wigs. The pre-order arrived right on the promised schedule.",
      unit: "Raw Burmese Curly Pre-Order",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-brand-gold font-bold block">
            Client Experiences
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark">
            TESTED & ADORED
          </h2>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Real feedback from women who trust CK Hair for life's most unforgettable moments.
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
