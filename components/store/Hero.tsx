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
  subtitle = "Premium 100% raw human hair, handcrafted luxury wigs, and high-definition lace tailored for timeless elegance.",
  image = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85",
  primaryCtaText = "SHOP COLLECTION",
  primaryCtaLink = "/shop",
  secondaryCtaText = "PRE-ORDER",
  secondaryCtaLink = "/preorder",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F7F5F0] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 md:py-20 lg:py-24">
          
          {/* Left / Text Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-brand-border/80 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-brand-charcoal shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Couture Hair Collections • Lagos</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-dark leading-[1.08] whitespace-pre-line">
              {title}
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={primaryCtaLink}
                className="w-full sm:w-auto px-8 py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={secondaryCtaLink}
                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-dark border border-brand-dark/20 rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:border-brand-dark hover:bg-brand-sand transition-all flex items-center justify-center active:scale-[0.98]"
              >
                <span>{secondaryCtaText}</span>
              </Link>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 border-t border-brand-border/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="font-serif-luxury text-xl md:text-2xl font-bold text-brand-dark">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-muted mt-0.5">Raw Virgin Hair</p>
              </div>
              <div>
                <p className="font-serif-luxury text-xl md:text-2xl font-bold text-brand-dark">HD Lace</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-muted mt-0.5">Skin Melt Tech</p>
              </div>
              <div>
                <p className="font-serif-luxury text-xl md:text-2xl font-bold text-brand-dark">Direct</p>
                <p className="text-[10px] uppercase tracking-wider text-brand-muted mt-0.5">Bank & WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right / Editorial Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame Elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-sand via-transparent to-[#EFECE6] rounded-3xl -rotate-1 transform -z-10" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-white">
                <img
                  src={image}
                  alt="CK Hair Luxury Model"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted block font-medium">
                      Bestseller Unit
                    </span>
                    <p className="font-serif-luxury text-base md:text-lg font-bold text-brand-dark">
                      CK Signature Body Wave Wig
                    </p>
                  </div>
                  <Link
                    href="/product/ck-signature-body-wave"
                    className="p-2.5 rounded-full bg-brand-dark text-white hover:bg-brand-gold transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
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
