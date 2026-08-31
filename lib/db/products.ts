import { prisma } from "@/lib/prisma";

export async function getActiveProducts(options?: {
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  preorderOnly?: boolean;
  categorySlug?: string;
  search?: string;
  sortBy?: "featured" | "newest" | "price-asc" | "price-desc" | "bestseller";
  limit?: number;
}) {
  const where: any = {
    status: "ACTIVE",
  };

  if (options?.featured) where.featured = true;
  if (options?.bestseller) where.bestseller = true;
  if (options?.isNew) where.isNew = true;
  if (options?.preorderOnly) where.availability = "PREORDER";

  if (options?.categorySlug) {
    where.category = {
      slug: options.categorySlug,
    };
  }

  if (options?.search) {
    const q = options.search;
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { texture: { contains: q } },
      { hairType: { contains: q } },
    ];
  }

  let orderBy: any = { createdAt: "desc" };
  if (options?.sortBy === "price-asc") orderBy = { price: "asc" };
  else if (options?.sortBy === "price-desc") orderBy = { price: "desc" };
  else if (options?.sortBy === "bestseller") orderBy = { bestseller: "desc" };

  return prisma.product.findMany({
    where,
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { price: "asc" } },
    },
    orderBy,
    take: options?.limit,
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { price: "asc" } },
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: {
        select: {
          products: {
            where: { status: "ACTIVE" },
          },
        },
      },
    },
  });
}
