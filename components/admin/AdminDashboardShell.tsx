"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminDashboardShellProps {
  adminName: string;
  storeStatus: string;
  children: React.ReactNode;
}

export function AdminDashboardShell({
  adminName,
  storeStatus,
  children,
}: AdminDashboardShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F8F5] text-brand-dark">
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          adminName={adminName}
          storeStatus={storeStatus}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
