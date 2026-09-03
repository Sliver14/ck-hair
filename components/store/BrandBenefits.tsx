import React from "react";
import { Sparkles, Crown, ShieldCheck, Truck } from "lucide-react";

export function BrandBenefits() {
  const benefits = [
    {
      icon: Crown,
      title: "ROYALTY-GRADE HAIR",
      description: "Ethically sourced single-donor Raw Human Hair and heat-resilient Anna Fiber crafted for maximum luster, full ends, and zero tangling.",
    },
    {
      icon: Sparkles,
      title: "EFFORTLESS VERSATILITY",
      description: "Flawless knotless braiding feed-ins, seamless weft sew-ins, bouncy French curls, and custom glueless wigs that hold all-day definition.",
    },
    {
      icon: ShieldCheck,
      title: "ZERO-STRESS CHECKOUT",
      description: "Smooth direct Bank Transfers with instant confirmation through your dedicated personal WhatsApp concierge.",
    },
    {
      icon: Truck,
      title: "NATIONWIDE VIP DISPATCH",
      description: "Dispatched from Lagos across Nigeria in signature satin-lined luxury packaging, fully tracked straight to your doorstep.",
    },
  ];

  return (
    <section className="border-b border-brand-border/60 bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#EAD7C3]/50 flex items-center justify-center text-[#2B2118] group-hover:bg-[#2B2118] group-hover:text-[#B76E79] transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-serif-luxury text-base md:text-lg font-bold tracking-wide text-brand-dark uppercase">
                  {benefit.title}
                </h3>
                <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
