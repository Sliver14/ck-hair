import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      variants: true,
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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
      stock,
      status,
      availability,
      hairType,
      texture,
      lengths,
      colors,
      featured,
      bestseller,
      isNew,
      preorderEnabled,
      preorderDuration,
      preorderLimit,
      images,
    } = body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (compareAtPrice !== undefined)
      updateData.compareAtPrice = compareAtPrice ? parseFloat(compareAtPrice) : null;
    if (sku !== undefined) updateData.sku = sku;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (status !== undefined) updateData.status = status;
    if (availability !== undefined) updateData.availability = availability;
    if (hairType !== undefined) updateData.hairType = hairType;
    if (texture !== undefined) updateData.texture = texture;
    if (lengths !== undefined)
      updateData.lengths = typeof lengths === "string" ? lengths : JSON.stringify(lengths);
    if (colors !== undefined)
      updateData.colors = typeof colors === "string" ? colors : JSON.stringify(colors);
    if (featured !== undefined) updateData.featured = Boolean(featured);
    if (bestseller !== undefined) updateData.bestseller = Boolean(bestseller);
    if (isNew !== undefined) updateData.isNew = Boolean(isNew);
    if (preorderEnabled !== undefined) updateData.preorderEnabled = Boolean(preorderEnabled);
    if (preorderDuration !== undefined) updateData.preorderDuration = preorderDuration;
    if (preorderLimit !== undefined)
      updateData.preorderLimit = preorderLimit ? parseInt(preorderLimit) : null;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true, images: true },
    });

    if (images && Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      for (let i = 0; i < images.length; i++) {
        await prisma.productImage.create({
          data: {
            productId: id,
            url: images[i],
            alt: `${product.name} image ${i + 1}`,
            isPrimary: i === 0,
            order: i,
          },
        });
      }
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // Prefer soft disabling as per product specs to keep order histories intact
    const product = await prisma.product.update({
      where: { id },
      data: { status: "DISABLED" },
    });

    return NextResponse.json({ product, message: "Product disabled successfully" });
  } catch (error: any) {
    console.error("Error disabling product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to disable product" },
      { status: 500 }
    );
  }
}
