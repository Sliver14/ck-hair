import React from "react";
import { Sparkles, Crown, ShieldCheck, Truck } from "lucide-react";

export function BrandBenefits() {
  const benefits = [
    {
      icon: Crown,
      title: "PREMIUM QUALITY",
      description: "Carefully selected single-donor virgin and raw hair for a long-lasting, natural finish.",
    },
    {
      icon: Sparkles,
      title: "VERSATILE STYLES",
      description: "Crafted for effortless styling, seamless melting, and head-turning everyday luxury.",
    },
    {
      icon: ShieldCheck,
      title: "SECURE ORDERING",
      description: "Convenient bank transfer payments with direct, personalized WhatsApp confirmation.",
    },
    {
      icon: Truck,
      title: "RELIABLE DELIVERY",
      description: "Every unit is hand-inspected, packaged in luxury boxes, and dispatched swiftly.",
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
