import React from "react";
import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/CategoryManager";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      parent: true,
      children: {
        orderBy: { order: "asc" },
        include: {
          _count: { select: { products: true } },
        },
      },
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <CategoryManager
      initialCategories={JSON.parse(JSON.stringify(categories))}
    />
  );
}

