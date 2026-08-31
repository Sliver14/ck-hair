import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Phone, MapPin, Mail, ShieldCheck } from "lucide-react";

interface FooterProps {
  storeName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
}

export function Footer({
  storeName = "CK HAIR",
  tagline = "Luxury Hair. Effortless Confidence.",
  phone = "+234 902 655 5783",
  email = "ckhair.ng@gmail.com",
  address = "Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  whatsapp = "2349026555783",
  instagram = "https://instagram.com/CK_Hair.Ng",
  tiktok = "https://tiktok.com/@ck.hair0",
  facebook = "https://facebook.com/ckhair",
}: FooterProps) {
  return (
    <footer className="bg-[#2B2118] text-[#FAF6F2] pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 border-t border-[#3E3025]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 pb-10 sm:pb-14 border-b border-[#3E3025]">
          
          {/* Brand Col - Full width on mobile, 4 cols on desktop */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="p-2.5 rounded-2xl bg-[#FAF6F2] inline-block shadow-sm">
                <img
                  src="/logo.png"
                  alt={storeName || "CK Hair"}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-[#D8C7B8] font-light max-w-sm leading-relaxed">
              {tagline} Premium 100% human and single-donor raw hair crafted to elevate your everyday beauty and special moments.
            </p>
            
            <div className="space-y-2 pt-1 text-xs text-[#EAD7C3] font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B76E79] flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#B76E79] flex-shrink-0" />
                <span>{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#B76E79] flex-shrink-0" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {/* Mobile 2-column Nav wrapper (takes 5 cols on desktop) */}
          <div className="sm:col-span-2 lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Shop Categories Col */}
            <div className="space-y-3.5">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-white">
                Shop
              </h4>
              <ul className="space-y-2.5 text-xs text-[#D8C7B8] font-light">
                <li>
                  <Link href="/shop/blend-premium-fiber-hair" className="hover:text-white transition-colors block">
                    Fiber Hair
                  </Link>
                </li>
                <li>
                  <Link href="/shop/human-hair" className="hover:text-white transition-colors block">
                    Human Hair
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors block">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/preorder" className="text-[#B76E79] font-medium hover:text-white transition-colors block">
                    Pre-Order Atelier
                  </Link>
                </li>
              </ul>
            </div>

            {/* Client Care Col */}
            <div className="space-y-3.5">
              <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-white">
                Client Care
              </h4>
              <ul className="space-y-2.5 text-xs text-[#D8C7B8] font-light">
                <li>
                  <Link href="/track-order" className="hover:text-white transition-colors block">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors block">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors block">
                    Shipping & Delivery
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social & WhatsApp Col - 3 cols on desktop */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.18em] font-bold text-white">
              Connect With Us
            </h4>
            
            <div className="flex items-center space-x-3">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3E3025] flex items-center justify-center text-[#FAF6F2] hover:bg-[#FAF6F2] hover:text-[#2B2118] transition-all"
                aria-label="Instagram @CK_Hair.Ng"
                title="Instagram @CK_Hair.Ng"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#3E3025] flex items-center justify-center text-[#FAF6F2] hover:bg-[#FAF6F2] hover:text-[#2B2118] transition-all text-xs font-bold font-mono"
                  aria-label="TikTok @ck.hair0"
                  title="TikTok @ck.hair0"
                >
                  TT
                </a>
              )}
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3E3025] flex items-center justify-center text-[#FAF6F2] hover:bg-[#FAF6F2] hover:text-[#2B2118] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-1">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A39488] gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {storeName} Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[#D8C7B8]">
              <ShieldCheck className="w-4 h-4 text-[#B76E79]" />
              Verified Bank Transfer & Nationwide Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
