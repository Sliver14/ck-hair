import React from "react";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getStoreSettings } from "@/lib/db/settings";

export const revalidate = 0;

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const storeSettings = await getStoreSettings();

  return (
    <div className="flex min-h-screen bg-[#F8F8F5] text-brand-dark">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          adminName={session.name}
          storeStatus={storeSettings.storeStatus}
        />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
