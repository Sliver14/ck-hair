import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export const revalidate = 0;

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: { images: true, variants: true, category: true },
    }),
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: { parent: true },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ProductForm
      initialData={JSON.parse(JSON.stringify(product))}
      categories={JSON.parse(JSON.stringify(categories))}
      isEditing={true}
    />
  );
}
