import React from "react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export const revalidate = 0;

export default async function AddProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { parent: true },
  });

  return (
    <ProductForm
      categories={categories}
      isEditing={false}
    />
  );
}
