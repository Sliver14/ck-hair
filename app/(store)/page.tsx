import React from "react";
import { getHomepageSettings, getStoreSettings } from "@/lib/db/settings";
import { getActiveProducts, getCategories } from "@/lib/db/products";
import { Hero } from "@/components/store/Hero";
import { BrandBenefits } from "@/components/store/BrandBenefits";
import { FeaturedProducts } from "@/components/store/FeaturedProducts";
import { CategoryGrid } from "@/components/store/CategoryGrid";
import { EditorialStory } from "@/components/store/EditorialStory";
import { PreorderSection } from "@/components/store/PreorderSection";
import { Testimonials } from "@/components/store/Testimonials";
import { InstagramGrid } from "@/components/store/InstagramGrid";
import { Newsletter } from "@/components/store/Newsletter";

export const revalidate = 0;

export default async function HomePage() {
  const [homepageSettings, storeSettings, featuredProducts, preorderProducts, categories] =
    await Promise.all([
      getHomepageSettings(),
      getStoreSettings(),
      getActiveProducts({ limit: 12 }),
      getActiveProducts({ preorderOnly: true, limit: 4 }),
      getCategories(),
    ]);

  return (
    <div className="space-y-0">
      <Hero
        title={homepageSettings.heroTitle}
        subtitle={homepageSettings.heroSubtitle}
        image={homepageSettings.heroImage}
        primaryCtaText={homepageSettings.primaryCtaText}
        primaryCtaLink={homepageSettings.primaryCtaLink}
        secondaryCtaText={homepageSettings.secondaryCtaText}
        secondaryCtaLink={homepageSettings.secondaryCtaLink}
      />

      <BrandBenefits />

      <FeaturedProducts products={featuredProducts} />

      <CategoryGrid categories={categories} />

      <EditorialStory
        title={homepageSettings.editorialTitle}
        subtitle={homepageSettings.editorialSubtitle}
        image={homepageSettings.editorialImage}
      />

      <PreorderSection preorderProducts={preorderProducts} />

      <Testimonials />

      <InstagramGrid
        instagramUrl={storeSettings.instagram}
        tiktokUrl={storeSettings.tiktok}
      />

      <Newsletter />
    </div>
  );
}
