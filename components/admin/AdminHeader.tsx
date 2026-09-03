"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Shield, ExternalLink } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  adminName?: string;
  storeStatus?: string;
  onOpenMobileSidebar?: () => void;
}

export function AdminHeader({
  adminName = "CK Hair Admin",
  storeStatus = "ONLINE",
  onOpenMobileSidebar,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <header className="bg-white border-b border-brand-border/60 py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 -ml-1 text-brand-dark hover:bg-brand-sand rounded-xl lg:hidden transition-colors"
            aria-label="Open admin sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            storeStatus === "ONLINE"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              storeStatus === "ONLINE" ? "bg-green-600 animate-pulse" : "bg-red-600"
            }`}
          />
          Store {storeStatus}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1 text-xs text-brand-muted hover:text-brand-dark transition-colors py-1.5 px-3 rounded-lg hover:bg-brand-sand"
        >
          <span>Live Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-3 pl-3 border-l border-brand-border/60">
          <div className="w-8 h-8 rounded-full bg-brand-sand border border-brand-border flex items-center justify-center text-brand-dark font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-brand-dark leading-tight">{adminName}</p>
            <p className="text-[10px] text-brand-muted">Store Manager</p>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-brand-lightMuted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
