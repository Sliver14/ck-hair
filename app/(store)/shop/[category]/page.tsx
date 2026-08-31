import React from "react";
import { notFound } from "next/navigation";
import { getActiveProducts, getCategories } from "@/lib/db/products";
import { ShopCatalog } from "@/components/store/ShopCatalog";

export const revalidate = 0;

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = params;
  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === categorySlug);

  if (!currentCategory) {
    notFound();
  }

  const products = await getActiveProducts({ categorySlug });

  return (
    <div className="bg-[#FAF6F2] min-h-screen">
      {/* Category Hero Banner */}
      <div className="bg-[#EAD7C3]/35 border-b border-brand-border/60 py-12 md:py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B76E79] font-bold block mb-2">
            Collection
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold text-brand-dark tracking-tight uppercase">
            {currentCategory.name}
          </h1>
          {currentCategory.description && (
            <p className="text-xs md:text-sm text-brand-muted max-w-lg mx-auto mt-2 font-light">
              {currentCategory.description}
            </p>
          )}
        </div>
      </div>

      <ShopCatalog
        initialProducts={products}
        categories={categories}
        currentCategorySlug={categorySlug}
      />
    </div>
  );
}
