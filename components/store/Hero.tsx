import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function Hero({
  title = "LUXURY HAIR.\nEFFORTLESS CONFIDENCE.",
  subtitle = "Premium raw human hair and signature blend fiber hair crafted for natural bounce, fluid movement, and timeless elegance.",
  image = "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=85",
  primaryCtaText = "SHOP ALL HAIR",
  primaryCtaLink = "/shop",
  secondaryCtaText = "PRE-ORDER",
  secondaryCtaLink = "/preorder",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F2] border-b border-brand-border/60 min-h-[calc(100vh-105px)] lg:max-h-[calc(100vh-105px)] flex items-center py-8 sm:py-10 lg:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-border text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-charcoal shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#B76E79]" />
              <span>Couture Wigs & Hair • Lagos</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight text-brand-dark leading-[1.08] whitespace-pre-line">
              {title}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-brand-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href={primaryCtaLink}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#3E3025] transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#B76E79]" />
              </Link>

              <Link
                href={secondaryCtaLink}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F5F5F5] text-brand-dark border border-brand-border rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:border-[#B76E79] hover:bg-[#EAD7C3]/30 transition-all flex items-center justify-center active:scale-[0.98]"
              >
                <span>{secondaryCtaText}</span>
              </Link>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 border-t border-brand-border/60 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="font-serif-luxury text-base sm:text-lg md:text-xl font-bold text-brand-dark">100%</p>
                <p className="text-[9px] uppercase tracking-wider text-brand-muted mt-0.5">Raw & Blend Hair</p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-lg md:text-xl font-bold text-brand-dark">HD Lace</p>
                <p className="text-[9px] uppercase tracking-wider text-brand-muted mt-0.5">Skin Melt Tech</p>
              </div>
              <div>
                <p className="font-serif-luxury text-base sm:text-lg md:text-xl font-bold text-brand-dark">Direct</p>
                <p className="text-[9px] uppercase tracking-wider text-brand-muted mt-0.5">Bank & WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Decorative Frame */}
              <div className="absolute -inset-3.5 bg-gradient-to-tr from-[#EAD7C3] via-transparent to-[#FAF6F2] rounded-3xl -rotate-1 transform -z-10" />
              
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] max-h-[min(540px,62vh)] rounded-2xl overflow-hidden shadow-2xl border border-white/80 bg-white">
                <img
                  src={image || "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=85"}
                  alt="CK Hair Luxury Wig Model"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Glassmorphic Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/80 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#B76E79] block font-bold">
                      Featured Ready-To-Wear
                    </span>
                    <p className="font-serif-luxury text-xs sm:text-sm font-bold text-brand-dark">
                      HD Glueless Luxury Unit
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    className="p-2.5 rounded-full bg-brand-dark text-white hover:bg-[#B76E79] transition-colors shadow-xs"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
