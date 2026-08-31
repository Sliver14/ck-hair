"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FAFAF8]">
      <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center text-brand-dark mb-4">
        <ShieldAlert className="w-8 h-8 text-brand-gold stroke-[1.5]" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-1">
        Experience Error
      </span>

      <h1 className="font-serif-luxury text-3xl md:text-4xl font-bold text-brand-dark mb-2">
        SOMETHING WENT WRONG
      </h1>

      <p className="text-xs md:text-sm text-brand-muted max-w-md font-light mb-8">
        We encountered an unexpected issue. Please try refreshing the page or return to the main salon collection.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-xs active:scale-98"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="px-6 py-3 bg-white border border-brand-border text-brand-dark rounded-full text-xs font-semibold uppercase tracking-wider hover:border-brand-dark transition-all flex items-center gap-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
