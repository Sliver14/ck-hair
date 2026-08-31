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
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-white border border-brand-border">
              <img
                src={image}
                alt="The CK Hair Experience"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-1 mb-2 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="font-serif-luxury text-xl md:text-2xl font-light italic">
                  “Couture hair pieces designed to help every woman step into effortless confidence.”
                </p>
              </div>
            </div>
          </div>

          {/* Text Story */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <span className="text-[11px] uppercase tracking-[0.22em] text-brand-gold font-bold block">
              Our Philosophy
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
              {title}
            </h2>
            <p className="text-sm md:text-base text-brand-muted leading-relaxed font-light">
              {subtitle}
            </p>
            <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-light">
              At CK Hair, we believe that luxury hair is never just an accessory. It is an expression of confidence, individuality, and personal power. We ethically source raw, healthy donor hair and meticulously construct our wigs with melt-on-contact Swiss HD lace.
            </p>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md active:scale-98"
              >
                <span>Discover CK Hair</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
