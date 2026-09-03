"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  ShoppingBag,
  Clock,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Home,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isMobileOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key or outside click
  useEffect(() => {
    if (!isMobileOpen || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMobileOpen, onClose]);

  const sections = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "CATALOG",
      items: [
        { label: "All Products", href: "/admin/products", icon: Package },
        { label: "Add Product", href: "/admin/products/new", icon: PlusCircle },
        { label: "Categories", href: "/admin/categories", icon: FolderTree },
      ],
    },
    {
      title: "ORDERS & PRE-ORDERS",
      items: [
        { label: "All Orders", href: "/admin/orders", icon: ShoppingBag },
        { label: "Pre-Orders", href: "/admin/preorders", icon: Clock },
        { label: "Customers", href: "/admin/customers", icon: Users },
      ],
    },
    {
      title: "STORE SETTINGS",
      items: [
        { label: "General & Store", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  const renderSidebarInner = (isDrawer = false) => (
    <div className="flex flex-col justify-between h-full">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#262626] flex items-center justify-between">
        <Link href="/admin/dashboard" onClick={onClose} className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-[#FAF6F2] shadow-xs">
            <img
              src="/logo.png"
              alt="CK Hair"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div>
            <span className="font-serif-luxury text-base font-bold tracking-[0.18em] text-white uppercase block">
              CK HAIR
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#B76E79] block -mt-0.5 font-semibold">
              Admin Portal
            </span>
          </div>
        </Link>

        {isDrawer && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8A8A80] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6A6A64] px-3 mb-2">
              {sec.title}
            </p>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-brand-dark font-semibold shadow-xs"
                      : "text-[#A5A59E] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand-dark" : "text-[#777770]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Storefront Link */}
      <div className="p-4 border-t border-[#262626] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-[#8A8A80] hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Store</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-green-500" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#141414] text-[#E0E0DC] border-r border-[#262626] flex-col justify-between shrink-0 h-screen sticky top-0">
        {renderSidebarInner(false)}
      </aside>

      {/* Mobile / Tablet Slide-over Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10 pointer-events-none">
            <div
              ref={drawerRef}
              className="w-screen max-w-xs bg-[#141414] text-[#E0E0DC] shadow-2xl animate-slide-in-left h-full pointer-events-auto"
            >
              {renderSidebarInner(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
