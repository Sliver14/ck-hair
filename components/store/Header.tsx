"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, PhoneCall, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { SearchModal } from "./SearchModal";

export interface HeaderCategory {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

interface HeaderProps {
  storeName?: string;
  whatsapp?: string;
  categories?: HeaderCategory[];
}

const DEFAULT_CATEGORIES: HeaderCategory[] = [
  { id: "blend", name: "Blend / Premium Fiber Hair", slug: "blend-premium-fiber-hair" },
  { id: "human", name: "Human Hair", slug: "human-hair" },
];

export function Header({
  storeName = "CK HAIR",
  whatsapp = "2349026555783",
  categories = [],
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();

  const isShopActive = pathname === "/shop" || pathname.startsWith("/shop/");
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(isShopActive);

  const categoriesList = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/shop")) {
      setIsMobileShopOpen(true);
    }
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop", hasSubmenu: true },
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

          {/* Logo (Hidden on mobile view) */}
          <div className="hidden md:flex items-center">
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
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = link.hasSubmenu
                ? pathname === link.href || pathname.startsWith(`${link.href}/`)
                : pathname === link.href;

              if (link.hasSubmenu) {
                return (
                  <div key={link.href} className="relative group py-1">
                    <Link
                      href={link.href}
                      className={`text-[11px] lg:text-xs uppercase tracking-[0.15em] lg:tracking-[0.18em] font-medium transition-colors flex items-center gap-1 ${
                        isActive
                          ? "text-brand-dark font-semibold"
                          : "text-brand-muted hover:text-brand-dark"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
                    </Link>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B76E79] rounded-full" />
                    )}

                    {/* Desktop Hover Submenu */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-xl border border-brand-border/70 py-2 min-w-[220px] animate-fade-in">
                        <Link
                          href="/shop"
                          className={`block px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                            pathname === "/shop"
                              ? "text-[#B76E79] font-bold bg-[#FAF6F2]"
                              : "text-brand-dark hover:bg-brand-sand/50 font-semibold"
                          }`}
                        >
                          All Hair Collection
                        </Link>
                        <div className="h-px bg-brand-border/40 my-1 mx-3" />
                        {categoriesList.map((cat) => {
                          const isCatActive = pathname === `/shop/${cat.slug}`;
                          return (
                            <Link
                              key={cat.id || cat.slug}
                              href={`/shop/${cat.slug}`}
                              className={`block px-4 py-2 text-xs tracking-wider transition-colors ${
                                isCatActive
                                  ? "text-[#B76E79] font-bold bg-[#FAF6F2]"
                                  : "text-brand-muted hover:text-brand-dark hover:bg-brand-sand/30"
                              }`}
                            >
                              {cat.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] lg:text-xs uppercase tracking-[0.15em] lg:tracking-[0.18em] font-medium transition-colors relative py-1 ${
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

      {/* Mobile Sidebar Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-12">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6 animate-slide-in-right">
              <div className="overflow-y-auto">
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
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 space-y-3">
                  {navLinks.map((link) => {
                    if (link.label === "Shop") {
                      return (
                        <div key={link.href} className="space-y-1">
                          {/* Shop Main Row with Accordion Toggle */}
                          <div
                            className={`flex items-center justify-between rounded-lg transition-colors ${
                              isShopActive ? "bg-[#FAF6F2]/80" : ""
                            }`}
                          >
                            <Link
                              href="/shop"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex-1 text-sm uppercase tracking-widest font-medium py-2.5 ${
                                pathname === "/shop"
                                  ? "text-brand-dark font-bold pl-2 border-l-2 border-[#B76E79]"
                                  : isShopActive
                                  ? "text-brand-dark font-bold pl-2 border-l-2 border-brand-dark"
                                  : "text-brand-muted hover:text-brand-dark"
                              }`}
                            >
                              {link.label}
                            </Link>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMobileShopOpen((prev) => !prev);
                              }}
                              className="p-2 text-brand-muted hover:text-brand-dark focus:outline-hidden"
                              aria-label={isMobileShopOpen ? "Collapse Shop categories" : "Expand Shop categories"}
                              aria-expanded={isMobileShopOpen}
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isMobileShopOpen ? "rotate-180 text-brand-dark" : "text-brand-muted"
                                }`}
                              />
                            </button>
                          </div>

                          {/* Submenu Categories List */}
                          {isMobileShopOpen && (
                            <div className="ml-3 pl-3 border-l-2 border-[#EAD7C3] space-y-1 py-1 animate-fade-in">
                              <Link
                                href="/shop"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block text-xs uppercase tracking-wider py-1.5 transition-colors ${
                                  pathname === "/shop"
                                    ? "text-[#B76E79] font-bold pl-1 border-l-2 border-[#B76E79]"
                                    : "text-brand-muted hover:text-brand-dark"
                                }`}
                              >
                                All Hair Collection
                              </Link>
                              {categoriesList.map((cat) => {
                                const isCatActive = pathname === `/shop/${cat.slug}`;
                                return (
                                  <Link
                                    key={cat.id || cat.slug}
                                    href={`/shop/${cat.slug}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block text-xs tracking-wider py-1.5 transition-colors ${
                                      isCatActive
                                        ? "text-[#B76E79] font-bold pl-1 border-l-2 border-[#B76E79]"
                                        : "text-brand-muted hover:text-brand-dark"
                                    }`}
                                  >
                                    {cat.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-sm uppercase tracking-widest font-medium py-2 ${
                          isActive
                            ? "text-brand-dark font-bold pl-2 border-l-2 border-brand-dark"
                            : "text-brand-muted hover:text-brand-dark"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-brand-border space-y-3">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
