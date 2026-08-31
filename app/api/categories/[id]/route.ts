import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, slug, description, image, featured, order, parentId } = body;

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name.trim();
    if (description !== undefined) dataToUpdate.description = description?.trim() || null;
    if (image !== undefined) dataToUpdate.image = image?.trim() || null;
    if (featured !== undefined) dataToUpdate.featured = Boolean(featured);
    if (order !== undefined) dataToUpdate.order = Number(order);
    if (parentId !== undefined) dataToUpdate.parentId = parentId === "" ? null : parentId;

    if (slug !== undefined) {
      const cleanSlug = slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const existing = await prisma.category.findUnique({
        where: { slug: cleanSlug },
      });

      if (existing && existing.id !== params.id) {
        return NextResponse.json(
          { error: "Another category with this URL slug already exists" },
          { status: 409 }
        );
      }
      dataToUpdate.slug = cleanSlug;
    }

    const updated = await prisma.category.update({
      where: { id: params.id },
      data: dataToUpdate,
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } },
      },
    });

    return NextResponse.json({ category: updated });
  } catch (error: any) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if there are linked products
    const productCount = await prisma.product.count({
      where: { categoryId: params.id },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete this category because ${productCount} product(s) are currently assigned to it. Please reassign or delete the products first.`,
        },
        { status: 400 }
      );
    }

    // Unlink children before deleting parent
    await prisma.category.updateMany({
      where: { parentId: params.id },
      data: { parentId: null },
    });

    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
