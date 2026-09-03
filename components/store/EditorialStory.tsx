import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

interface EditorialStoryProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

export function EditorialStory({
  title = "THE CK HAIR EXPERIENCE",
  subtitle = "Hair that moves with grace, radiates natural sheen, and feels as pure and unforgettable as it looks.",
  image = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
}: EditorialStoryProps) {
  return (
    <section className="py-10 sm:py-12 md:py-14 bg-[#FAF6F2] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Editorial Image */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative h-[250px] sm:h-[290px] lg:h-[320px] w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-brand-border group">
              <img
                src={image}
                alt="The CK Hair Experience"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 rounded-xl bg-black/35 backdrop-blur-xs border border-white/10 text-white">
                <div className="flex items-center gap-1 mb-1 text-[#B76E79]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#B76E79] text-[#B76E79]" />
                  ))}
                </div>
                <p className="font-serif-luxury text-xs sm:text-sm font-light italic text-white/95 leading-snug">
                  “Couture hair pieces designed to help every woman step into effortless confidence.”
                </p>
              </div>
            </div>
          </div>

          {/* Text Story */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3 sm:space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#B76E79] font-bold block">
              Our Philosophy
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-brand-dark leading-snug">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#8C7A6B] leading-relaxed font-light">
              {subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#8C7A6B] leading-relaxed font-light hidden sm:block">
              At CK Hair, we believe that luxury hair is never just an accessory. It is an expression of confidence, individuality, and personal power. We ethically source raw, healthy donor hair and meticulously construct our wigs with melt-on-contact Swiss HD lace.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-brand-dark text-white rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#3E3025] transition-all shadow-sm active:scale-98"
              >
                <span>Discover CK Hair</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B76E79]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
