import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, getActiveProducts } from "@/lib/db/products";
import { getStoreSettings } from "@/lib/db/settings";
import { ProductDetailView } from "@/components/store/ProductDetailView";
import type { Metadata } from "next";

export const revalidate = 0;

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found — CK Hair" };

  return {
    title: `${product.name} — CK Hair Luxury Atelier`,
    description: product.shortDescription || product.description.substring(0, 160),
    openGraph: {
      title: `${product.name} — CK Hair`,
      description: product.shortDescription || product.description.substring(0, 160),
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const [product, storeSettings] = await Promise.all([
    getProductBySlug(params.slug),
    getStoreSettings(),
  ]);

  if (!product || product.status === "DISABLED") {
    notFound();
  }

  const relatedProducts = await getActiveProducts({
    categorySlug: product.category?.slug,
    limit: 4,
  });

  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <ProductDetailView
      product={JSON.parse(JSON.stringify(product))}
      relatedProducts={JSON.parse(JSON.stringify(filteredRelated))}
      whatsappNumber={storeSettings.whatsapp}
    />
  );
}
