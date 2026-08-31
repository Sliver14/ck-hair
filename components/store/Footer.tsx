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
    <footer className="bg-[#0D0D0D] text-[#ECECE8] pt-16 md:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#222222]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center font-serif text-xs font-bold text-white">
                CK
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white uppercase">
                {storeName}
              </span>
            </Link>
            <p className="text-xs text-[#9E9E96] font-light max-w-sm leading-relaxed">
              {tagline} Premium 100% human and single-donor raw hair crafted to elevate your everyday beauty and special moments.
            </p>
            
            <div className="space-y-2 pt-2 text-xs text-[#B5B5AD] font-light">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>{phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>{email}</span>
              </p>
            </div>
          </div>

          {/* Shop Col */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9E96] font-light">
              <li>
                <Link href="/shop/wigs" className="hover:text-white transition-colors">
                  Luxury Wigs
                </Link>
              </li>
              <li>
                <Link href="/shop/bundles" className="hover:text-white transition-colors">
                  Raw & Virgin Bundles
                </Link>
              </li>
              <li>
                <Link href="/shop/frontals" className="hover:text-white transition-colors">
                  HD Lace Frontals
                </Link>
              </li>
              <li>
                <Link href="/shop/closures" className="hover:text-white transition-colors">
                  Swiss Lace Closures
                </Link>
              </li>
              <li>
                <Link href="/shop/extensions" className="hover:text-white transition-colors">
                  Clip-ins & Ponytails
                </Link>
              </li>
              <li>
                <Link href="/preorder" className="text-brand-gold font-medium hover:text-white transition-colors">
                  Pre-Order Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Help / Client Care */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E9E96] font-light">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Concierge
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Delivery & Shipping
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Hair Care Rituals
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & WhatsApp */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Connect With Us
            </h4>
            <div className="flex items-center space-x-3">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#ECECE8] hover:bg-white hover:text-brand-dark transition-all"
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
                  className="w-9 h-9 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#ECECE8] hover:bg-white hover:text-brand-dark transition-all text-xs font-bold font-mono"
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
                className="w-9 h-9 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#ECECE8] hover:bg-white hover:text-brand-dark transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider"
              >
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#7A7A72] gap-4">
          <p>© {new Date().getFullYear()} {storeName} Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[#A0A096]">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              Verified Bank Transfer & Nationwide Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
