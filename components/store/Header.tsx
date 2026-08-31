"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, Shield, PhoneCall } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { SearchModal } from "./SearchModal";

interface HeaderProps {
  storeName?: string;
  whatsapp?: string;
}

export function Header({ storeName = "CK HAIR", whatsapp = "2349026555783" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalCount, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Pre-Order", href: "/preorder" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-brand-border/60 py-3.5"
            : "bg-[#FAF6F2]/90 backdrop-blur-xs border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle & Brand Left */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-brand-dark hover:text-brand-muted"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-brand-dark hover:text-brand-muted"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt={storeName || "CK Hair"}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-brand-dark font-semibold"
                      : "text-brand-muted hover:text-brand-dark"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B76E79] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center text-brand-dark hover:text-brand-gold transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/admin/dashboard"
              className="hidden lg:flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-colors py-1 px-2.5 rounded-full border border-brand-border/60 hover:border-brand-dark"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>

            <button
              onClick={openCart}
              className="flex items-center gap-2 p-1.5 text-brand-dark hover:text-brand-gold transition-colors relative"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#B76E79] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                    {totalCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-12">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6 animate-slide-in-right">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-brand-border">
                  <div className="flex items-center gap-2">
                    <img
                      src="/logo.png"
                      alt={storeName || "CK Hair"}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-brand-muted hover:text-brand-dark"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-sm uppercase tracking-widest font-medium py-2 ${
                        pathname === link.href
                          ? "text-brand-dark font-bold pl-2 border-l-2 border-brand-dark"
                          : "text-brand-muted hover:text-brand-dark"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-brand-border space-y-3">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-brand-muted hover:text-brand-dark border border-brand-border rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
