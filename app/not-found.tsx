import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FAFAF8]">
      <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark mb-4">
        <Sparkles className="w-8 h-8 text-brand-gold stroke-[1.5]" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-1">
        Page Not Found
      </span>

      <h1 className="font-serif-luxury text-4xl md:text-5xl font-bold text-brand-dark mb-2">
        404 — PIECE NOT FOUND
      </h1>

      <p className="text-xs md:text-sm text-brand-muted max-w-md font-light mb-8">
        The luxury hair collection or page you are looking for may have been moved or is no longer available.
      </p>

      <Link
        href="/shop"
        className="px-8 py-3.5 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center gap-2 shadow-xs active:scale-98"
      >
        <span>Explore Collection</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
