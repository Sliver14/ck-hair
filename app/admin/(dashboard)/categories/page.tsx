import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FolderTree, Plus, Edit3 } from "lucide-react";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
            CATEGORY MANAGEMENT ({categories.length})
          </h1>
          <p className="text-xs text-brand-muted mt-0.5">
            Organize catalog classifications, cover imagery, and storefront display ordering.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-brand-sand">
              <img
                src={cat.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80"}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                {cat._count.products} Products
              </span>
            </div>

            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-brand-dark">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-brand-muted line-clamp-2 mt-1 font-light">
                  {cat.description || "Luxury curated hair selection."}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-sand flex items-center justify-between text-xs">
                <span className="text-brand-muted font-mono text-[10px]">/{cat.slug}</span>
                <Link
                  href={`/shop/${cat.slug}`}
                  target="_blank"
                  className="text-brand-dark hover:text-brand-gold font-semibold text-xs"
                >
                  View in Store →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
