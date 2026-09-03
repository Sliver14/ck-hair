import React from "react";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";
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
    <AdminDashboardShell
      adminName={session.name}
      storeStatus={storeSettings.storeStatus}
    >
      {children}
    </AdminDashboardShell>
  );
}
