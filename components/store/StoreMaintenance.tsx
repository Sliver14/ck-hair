import React from "react";
import Link from "next/link";
import { Sparkles, PhoneCall, Shield } from "lucide-react";

interface StoreMaintenanceProps {
  message?: string;
  whatsapp?: string;
}

export function StoreMaintenance({
  message = "CK Hair is currently preparing something beautiful. Please check back shortly.",
  whatsapp = "2349026555783",
}: StoreMaintenanceProps) {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center font-serif text-sm font-bold text-white">
            CK
          </div>
          <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-white uppercase">
            CK HAIR
          </span>
        </div>

        <Link
          href="/admin/login"
          className="text-xs uppercase tracking-widest text-[#888880] hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-white/10"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin Access</span>
        </Link>
      </div>

      {/* Center Message */}
      <div className="max-w-2xl mx-auto text-center space-y-6 my-auto py-12 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-sand text-xs uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Exclusive Maintenance Mode</span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          WE’LL BE BACK SOON.
        </h1>

        <p className="text-sm md:text-lg text-[#B0B0A8] font-light leading-relaxed">
          {message}
        </p>

        <div className="pt-6">
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-brand-dark rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-brand-sand transition-all shadow-xl"
          >
            <PhoneCall className="w-4 h-4 text-[#25D366]" />
            <span>Chat via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-xs text-[#666660] z-10">
        <p>© {new Date().getFullYear()} CK Hair Limited. Elevating Everyday Luxury.</p>
      </div>
    </div>
  );
}
