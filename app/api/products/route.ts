import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const includeDisabled = searchParams.get("includeDisabled") === "true";

  const where: any = {};
  if (!includeDisabled) {
    where.status = "ACTIVE";
  }

  if (category) {
    where.category = { slug: category };
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { texture: { contains: search } },
      { hairType: { contains: search } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      variants: { orderBy: { price: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      compareAtPrice,
      sku,
      categoryId,
      stock = 10,
      status = "ACTIVE",
      availability = "IN_STOCK",
      hairType,
      texture,
      formats,
      lengths,
      colors,
      featured = false,
      bestseller = false,
      isNew = false,
      preorderEnabled = false,
      preorderDuration = "2–4 weeks",
      preorderLimit,
      images = [],
      variants = [],
    } = body;

    const generatedSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const product = await prisma.product.create({
      data: {
        name,
        slug: generatedSlug,
        description,
        shortDescription,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        sku:
          sku && sku.trim() !== ""
            ? sku.trim()
            : `CKH-${(name || "ITEM").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`,
        categoryId,
        stock: parseInt(stock),
        status,
        availability,
        hairType,
        texture,
        formats: formats
          ? typeof formats === "string"
            ? formats
            : JSON.stringify(formats)
          : null,
        lengths: typeof lengths === "string" ? lengths : JSON.stringify(lengths),
        colors: typeof colors === "string" ? colors : JSON.stringify(colors),
        featured: Boolean(featured),
        bestseller: Boolean(bestseller),
        isNew: Boolean(isNew),
        preorderEnabled: Boolean(preorderEnabled),
        preorderDuration,
        preorderLimit: preorderLimit ? parseInt(preorderLimit) : null,
        images: {
          create: images.map((img: string, idx: number) => ({
            url: img,
            alt: `${name} image ${idx + 1}`,
            isPrimary: idx === 0,
            order: idx,
          })),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
