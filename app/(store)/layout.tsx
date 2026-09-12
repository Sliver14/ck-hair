import React from "react";
import { getStoreSettings, getHomepageSettings } from "@/lib/db/settings";
import { getCategories } from "@/lib/db/products";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { StoreMaintenance } from "@/components/store/StoreMaintenance";

export const revalidate = 0; // Dynamic rendering for live updates

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeSettings, homepageSettings, categories] = await Promise.all([
    getStoreSettings(),
    getHomepageSettings(),
    getCategories(),
  ]);

  if (storeSettings.storeStatus === "OFFLINE") {
    return (
      <StoreMaintenance
        message={storeSettings.maintenanceMessage}
        whatsapp={storeSettings.whatsapp}
      />
    );
  }

  // Sanitize categories for Client Component props
  const serializedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image: cat.image,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar
        text={homepageSettings.announcementText}
        enabled={homepageSettings.announcementEnabled}
      />
      <Header
        storeName={storeSettings.storeName}
        whatsapp={storeSettings.whatsapp}
        categories={serializedCategories}
      />
      <main className="flex-1">{children}</main>
      <Footer
        storeName={storeSettings.storeName}
        tagline={storeSettings.tagline}
        phone={storeSettings.phone}
        email={storeSettings.email}
        address={storeSettings.address}
        whatsapp={storeSettings.whatsapp}
        instagram={storeSettings.instagram}
        tiktok={storeSettings.tiktok}
        facebook={storeSettings.facebook}
      />
    </div>
  );
}
