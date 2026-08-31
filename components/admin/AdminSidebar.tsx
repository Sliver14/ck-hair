"use client";

import React from "react";
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
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

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
        { label: "Pre-Orders Atelier", href: "/admin/preorders", icon: Clock },
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

  return (
    <aside className="w-64 bg-[#141414] text-[#E0E0DC] border-r border-[#262626] flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#262626] flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-serif text-xs font-bold">
            CK
          </div>
          <div>
            <span className="font-serif-luxury text-base font-bold tracking-[0.18em] text-white uppercase block">
              CK HAIR
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#888880] block -mt-0.5">
              Admin Portal
            </span>
          </div>
        </Link>
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
    </aside>
  );
}
