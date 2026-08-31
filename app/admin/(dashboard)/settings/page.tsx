import React from "react";
import { prisma } from "@/lib/prisma";
import { getStoreSettings, getPaymentSettings, getHomepageSettings } from "@/lib/db/settings";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const [store, payment, homepage, subscribers] = await Promise.all([
    getStoreSettings(),
    getPaymentSettings(),
    getHomepageSettings(),
    prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <SettingsManager
      storeSettings={JSON.parse(JSON.stringify(store))}
      paymentSettings={JSON.parse(JSON.stringify(payment))}
      homepageSettings={JSON.parse(JSON.stringify(homepage))}
      subscribers={JSON.parse(JSON.stringify(subscribers))}
    />
  );
}
